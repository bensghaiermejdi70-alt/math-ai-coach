// src/lib/llm/providers.ts
// Adaptateurs fournisseurs pour /api/llm.
//  - OpenAI (Responses API) : accepte le format de requête ANTHROPIC du front et renvoie le format de
//    réponse ANTHROPIC (JSON et SSE) => aucune modification des pages front.
//  - Anthropic : appel direct + "tap" du flux SSE pour mesurer la consommation sans altérer un octet.
import { fetchAnthropicWithRetry } from '@/lib/anthropic/fetchWithRetry'
import { EMPTY_USAGE, Effort, ModelSpec, REASONING_HEADROOM, Usage } from './config'

const OPENAI_URL = 'https://api.openai.com/v1/responses'
const ANTHROPIC_URL = 'https://api.anthropic.com/v1/messages'

// ═════════════════════════════════════════════════════════════════════════════
// Utilitaires SSE
// ═════════════════════════════════════════════════════════════════════════════
export function createSSEParser() {
  let buf = ''
  return function feed(text: string): any[] {
    buf += text.replace(/\r\n/g, '\n')
    const events: any[] = []
    let idx: number
    while ((idx = buf.indexOf('\n\n')) !== -1) {
      const block = buf.slice(0, idx)
      buf = buf.slice(idx + 2)
      const data = block
        .split('\n')
        .filter((l) => l.startsWith('data:'))
        .map((l) => l.slice(5).trim())
        .join('\n')
      if (!data || data === '[DONE]') continue
      try {
        events.push(JSON.parse(data))
      } catch {
        /* bloc partiel/illisible : ignoré */
      }
    }
    return events
  }
}

const enc = new TextEncoder()
const sse = (event: string, data: any) => enc.encode(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`)

// ═════════════════════════════════════════════════════════════════════════════
// Résultat commun (mode non-streaming)
// ═════════════════════════════════════════════════════════════════════════════
export interface RunResult {
  ok: boolean
  status: number
  error?: string
  text: string
  usage: Usage
  stopReason: string | null
  latencyMs: number
  raw?: any // réponse JSON brute Anthropic (pour le renvoyer telle quelle au client)
}

// "fetch failed" seul ne dit rien : on ajoute la cause réseau (ECONNRESET, ETIMEDOUT, ENOTFOUND...)
const errMsg = (e: unknown) => {
  if (!(e instanceof Error)) return String(e)
  const c: any = (e as any).cause
  const extra = c ? ` (${[c.code || c.name, c.message].filter(Boolean).join(': ')})` : ''
  return e.message + extra
}

// ═════════════════════════════════════════════════════════════════════════════
// Anthropic
// ═════════════════════════════════════════════════════════════════════════════
function anthropicUsage(u: any): Usage {
  const cached = u?.cache_read_input_tokens || 0
  const cacheWrite = u?.cache_creation_input_tokens || 0
  return {
    input: (u?.input_tokens || 0) + cached + cacheWrite,
    output: u?.output_tokens || 0,
    cached,
    cacheWrite,
    reasoning: 0,
  }
}

export async function anthropicOnce(body: any, apiKey: string, retries = 2, timeoutMs = 115000): Promise<RunResult> {
  const t0 = Date.now()
  try {
    const res = await fetchAnthropicWithRetry(
      ANTHROPIC_URL,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey, 'anthropic-version': '2023-06-01' },
        body: JSON.stringify({ ...body, stream: false }),
      },
      { maxRetries: retries, overallTimeoutMs: timeoutMs }
    )
    const data = await res.json().catch(() => ({} as any))
    const latencyMs = Date.now() - t0
    if (!res.ok) {
      return {
        ok: false, status: res.status, error: data?.error?.message || 'Erreur API Anthropic',
        text: '', usage: EMPTY_USAGE, stopReason: null, latencyMs,
      }
    }
    const text = (data.content || []).map((b: any) => (b.type === 'text' ? b.text : '')).join('')
    return {
      ok: true, status: 200, text, usage: anthropicUsage(data.usage),
      stopReason: data.stop_reason ?? null, latencyMs, raw: data,
    }
  } catch (e) {
    return { ok: false, status: 0, error: errMsg(e), text: '', usage: EMPTY_USAGE, stopReason: null, latencyMs: Date.now() - t0 }
  }
}

// Appel Anthropic en STREAMING, texte collecté côté serveur (mode comparaison).
// Pourquoi : en non-streaming, Anthropic n'envoie AUCUN octet avant la fin de la génération ; sur certains
// réseaux (box, NAT, VPN) une connexion muette > ~15-30 s est coupée => "fetch failed". En streaming, les octets
// arrivent en continu et la connexion tient.
export async function anthropicCollect(body: any, apiKey: string, timeoutMs = 115000): Promise<RunResult> {
  const t0 = Date.now()
  try {
    const res = await fetchAnthropicWithRetry(
      ANTHROPIC_URL,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey, 'anthropic-version': '2023-06-01' },
        body: JSON.stringify({ ...body, stream: true }),
      },
      { maxRetries: 1, overallTimeoutMs: timeoutMs }
    )
    if (!res.ok || !res.body) {
      const data = await res.json().catch(() => ({} as any))
      return { ok: false, status: res.status, error: data?.error?.message || 'Erreur API Anthropic', text: '', usage: EMPTY_USAGE, stopReason: null, latencyMs: Date.now() - t0 }
    }
    const reader = res.body.getReader()
    const decoder = new TextDecoder()
    const feed = createSSEParser()
    let text = ''
    let usage: Usage = { ...EMPTY_USAGE }
    let stopReason: string | null = null
    let error: string | undefined
    for (;;) {
      const { value, done } = await reader.read()
      if (done) break
      for (const ev of feed(decoder.decode(value, { stream: true }))) {
        if (ev.type === 'message_start') usage = anthropicUsage(ev.message?.usage)
        else if (ev.type === 'content_block_delta' && ev.delta?.type === 'text_delta') text += ev.delta.text || ''
        else if (ev.type === 'message_delta') {
          if (ev.usage?.output_tokens != null) usage = { ...usage, output: ev.usage.output_tokens }
          if (ev.delta?.stop_reason) stopReason = ev.delta.stop_reason
        } else if (ev.type === 'error') error = ev.error?.message || 'erreur flux Anthropic'
      }
    }
    const latencyMs = Date.now() - t0
    if (error) return { ok: false, status: 502, error, text, usage, stopReason, latencyMs }
    return { ok: true, status: 200, text, usage, stopReason, latencyMs }
  } catch (e) {
    return { ok: false, status: 0, error: errMsg(e), text: '', usage: EMPTY_USAGE, stopReason: null, latencyMs: Date.now() - t0 }
  }
}

export interface StreamMeta {
  usage: Usage
  outChars: number
  ttfbMs: number | null
  stopReason: string | null
  error?: string
}

// Relaie le flux Anthropic OCTET POUR OCTET et observe les événements au passage (usage, longueur).
export function tapAnthropicSSE(
  body: ReadableStream<Uint8Array>,
  onDone: (m: StreamMeta) => void
): ReadableStream<Uint8Array> {
  const t0 = Date.now()
  const decoder = new TextDecoder()
  const feed = createSSEParser()
  let usage: Usage = { ...EMPTY_USAGE }
  let outChars = 0
  let ttfbMs: number | null = null
  let stopReason: string | null = null
  let error: string | undefined
  let done = false
  const finish = () => {
    if (done) return
    done = true
    onDone({ usage, outChars, ttfbMs, stopReason, error })
  }

  const ts = new TransformStream<Uint8Array, Uint8Array>({
    transform(chunk, controller) {
      controller.enqueue(chunk) // priorité absolue : le client reçoit le chunk tel quel
      try {
        for (const ev of feed(decoder.decode(chunk, { stream: true }))) {
          if (ev.type === 'message_start') usage = anthropicUsage(ev.message?.usage)
          else if (ev.type === 'content_block_delta' && ev.delta?.type === 'text_delta') {
            if (ttfbMs === null) ttfbMs = Date.now() - t0
            outChars += ev.delta.text?.length || 0
          } else if (ev.type === 'message_delta') {
            if (ev.usage?.output_tokens != null) usage = { ...usage, output: ev.usage.output_tokens }
            if (ev.delta?.stop_reason) stopReason = ev.delta.stop_reason
          } else if (ev.type === 'error') error = ev.error?.message || 'erreur flux Anthropic'
        }
      } catch {
        /* l'observation ne doit JAMAIS casser le flux */
      }
    },
    flush() {
      finish()
    },
  })
  // Note : si le client coupe avant la fin du flux, flush() n'est pas appelé => pas de ligne de log
  // pour cet appel (les tokens déjà générés restent facturés par Anthropic mais non journalisés ici).
  return body.pipeThrough(ts)
}

// ═════════════════════════════════════════════════════════════════════════════
// OpenAI — conversion de la requête (format Anthropic -> Responses API)
// ═════════════════════════════════════════════════════════════════════════════
// Luna : entrée texte + image uniquement. Pas de PDF (document), pas de tools => on reste sur Claude.
export function canUseOpenAI(body: any): boolean {
  if (body?.tools || body?.tool_choice) return false
  const okBlock = (b: any) => b && (b.type === 'text' || (b.type === 'image' && ['base64', 'url'].includes(b.source?.type)))
  if (Array.isArray(body?.system) && !body.system.every((b: any) => b?.type === 'text')) return false
  for (const m of body?.messages || []) {
    if (typeof m.content === 'string') continue
    if (!Array.isArray(m.content) || !m.content.every(okBlock)) return false
  }
  return true
}

function systemToText(system: any): string {
  if (typeof system === 'string') return system
  if (Array.isArray(system)) return system.map((b: any) => b?.text || '').filter(Boolean).join('\n\n')
  return ''
}

function convertMessages(messages: any[]): any[] {
  return messages.map((m) => {
    const role = m.role === 'assistant' ? 'assistant' : 'user'
    if (typeof m.content === 'string') return { role, content: m.content }
    if (role === 'assistant') {
      // historique assistant : texte seul
      return { role, content: m.content.map((b: any) => (b.type === 'text' ? b.text : '')).join('') }
    }
    const parts = m.content.map((b: any) => {
      if (b.type === 'text') return { type: 'input_text', text: b.text }
      const src = b.source
      return {
        type: 'input_image',
        image_url: src.type === 'base64' ? `data:${src.media_type};base64,${src.data}` : src.url,
      }
    })
    return { role, content: parts }
  })
}

function buildOpenAIRequest(body: any, spec: ModelSpec, stream: boolean, extraInstructions = '') {
  const effort: Effort = spec.effort || 'low'
  const maxTokens = Number(body?.max_tokens) || 4000
  const instructions = systemToText(body?.system) + extraInstructions
  return {
    model: spec.model,
    ...(instructions ? { instructions } : {}),
    input: convertMessages(body.messages),
    reasoning: { effort },
    ...(spec.verbosity ? { text: { verbosity: spec.verbosity } } : {}),
    // max_output_tokens inclut le raisonnement : marge ajoutée pour ne pas amputer la réponse visible
    max_output_tokens: Math.min(128000, maxTokens + REASONING_HEADROOM[effort]),
    store: false, // ne pas conserver les échanges des élèves côté OpenAI
    stream,
  }
}

function openaiUsage(u: any): Usage {
  return {
    input: u?.input_tokens || 0,
    output: u?.output_tokens || 0, // inclut le raisonnement
    cached: u?.input_tokens_details?.cached_tokens || 0,
    cacheWrite: 0,
    reasoning: u?.output_tokens_details?.reasoning_tokens || 0,
  }
}

function openaiText(data: any): string {
  return (data?.output || [])
    .filter((i: any) => i?.type === 'message')
    .flatMap((i: any) => i.content || [])
    .filter((c: any) => c?.type === 'output_text')
    .map((c: any) => c.text || '')
    .join('')
}

const openaiHeaders = (apiKey: string) => ({ 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` })

// ═════════════════════════════════════════════════════════════════════════════
// Correction des schémas ```graph de type "geometry" (constaté sur Luna, jamais sur Claude) :
// le rendu du chat calcule le cadrage ENTIER du schéma (xrange/yrange) à partir d'une forme
// "axes" ; si ce modèle l'omet, le cadrage retombe par défaut sur [-5,5]×[-5,5] et une partie
// du circuit dessiné hors de cette zone est rognée à l'écran ("le schéma affiche la moitié").
// On calcule ici le cadre réel occupé par les formes et on injecte la forme "axes" manquante,
// avant que le bloc n'atteigne le client — jamais sur les réponses Claude, qui ne présentent pas
// ce défaut dans nos tests.
// ═════════════════════════════════════════════════════════════════════════════
function computeGeometryBBox(shapes: any[]): { minX: number; maxX: number; minY: number; maxY: number } | null {
  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity
  const add = (x: unknown, y: unknown) => {
    if (typeof x === 'number' && typeof y === 'number' && Number.isFinite(x) && Number.isFinite(y)) {
      if (x < minX) minX = x; if (x > maxX) maxX = x
      if (y < minY) minY = y; if (y > maxY) maxY = y
    }
  }
  for (const s of shapes || []) {
    if (!s || typeof s !== 'object') continue
    switch (s.type) {
      case 'point': case 'label': add(s.x, s.y); break
      case 'vector': case 'line': add(s.x1, s.y1); add(s.x2, s.y2); break
      case 'segment': case 'median': case 'altitude': case 'bisector': {
        const [x1, y1] = s.from || [s.x1, s.y1]
        const [x2, y2] = s.to || [s.x2, s.y2]
        add(x1, y1); add(x2, y2)
        break
      }
      case 'circle': case 'arc': case 'angle':
        if (typeof s.r === 'number') { add(s.cx - s.r, s.cy - s.r); add(s.cx + s.r, s.cy + s.r) }
        break
      case 'rightangle': { const sz = typeof s.size === 'number' ? s.size : 0.3; add(s.cx, s.cy - sz); add(s.cx + sz, s.cy); break }
      case 'rect': if (typeof s.w === 'number' && typeof s.h === 'number') { add(s.x, s.y); add(s.x + s.w, s.y + s.h) }; break
      case 'triangle': case 'polygon': (s.points || []).forEach((p: any) => Array.isArray(p) && add(p[0], p[1])); break
      default: break
    }
  }
  return Number.isFinite(minX) ? { minX, maxX, minY, maxY } : null
}

const round2 = (n: number) => Math.round(n * 100) / 100

// Corrige le contenu JSON d'UN bloc geometry (déjà parsé) si besoin. Retourne null si rien à changer.
function normalizeGeometryJSON(json: any): any | null {
  if (!json || json.type !== 'geometry' || !Array.isArray(json.shapes)) return null
  if (json.shapes.some((s: any) => s?.type === 'axes')) return null // déjà cadré, rien à faire
  const box = computeGeometryBBox(json.shapes)
  if (!box) return null
  const padX = Math.max(0.5, (box.maxX - box.minX) * 0.12)
  const padY = Math.max(0.5, (box.maxY - box.minY) * 0.12)
  return {
    ...json,
    shapes: [
      { type: 'axes', xrange: [round2(box.minX - padX), round2(box.maxX + padX)], yrange: [round2(box.minY - padY), round2(box.maxY + padY)] },
      ...json.shapes,
    ],
  }
}

// Corrige le texte COMPLET d'un bloc ```graph fermé (marqueurs inclus). Retourne le texte d'origine
// si le JSON est invalide ou ne nécessite aucune correction — jamais d'exception remontée.
function normalizeGraphFence(fullFence: string): string {
  const m = fullFence.match(/^```graph[ \t]*\r?\n?([\s\S]*?)```\s*$/)
  if (!m) return fullFence
  let json: any
  try { json = JSON.parse(m[1]) } catch { return fullFence }
  const fixed = normalizeGeometryJSON(json)
  if (!fixed) return fullFence
  try { return '```graph\n' + JSON.stringify(fixed) + '\n```' } catch { return fullFence }
}

// Version "texte entier" (non-streaming) : corrige chaque bloc ```graph rencontré.
function normalizeGraphBlocksInText(text: string): string {
  return text.replace(/```graph[ \t]*\r?\n?[\s\S]*?```/g, (block) => normalizeGraphFence(block))
}

// Version "flux" : les deltas de texte hors bloc ```graph partent vers emit() immédiatement ; dès
// qu'une fence ```graph s'ouvre, ses deltas sont retenus (jamais renvoyés partiellement) jusqu'à sa
// fermeture, puis le bloc corrigé est émis d'un bloc. Insensible au découpage des deltas, y compris
// si un marqueur ``` est coupé en deux entre deux appels à push().
function createGraphFenceBuffer(emit: (text: string) => void) {
  const OPEN = '```graph'
  const CLOSE = '```'
  let buf = ''
  let inFence = false
  function push(delta: string) {
    buf += delta
    for (;;) {
      if (!inFence) {
        const i = buf.indexOf(OPEN)
        if (i === -1) {
          const keep = OPEN.length - 1 // garde une queue assez longue pour un marqueur coupé entre deux deltas
          if (buf.length > keep) { emit(buf.slice(0, buf.length - keep)); buf = buf.slice(buf.length - keep) }
          return
        }
        emit(buf.slice(0, i))
        buf = buf.slice(i)
        inFence = true
        continue
      } else {
        const j = buf.indexOf(CLOSE, OPEN.length)
        if (j === -1) return // fence pas encore fermée : on attend, rien n'est émis
        const full = buf.slice(0, j + CLOSE.length)
        emit(normalizeGraphFence(full))
        buf = buf.slice(j + CLOSE.length)
        inFence = false
        continue
      }
    }
  }
  // Fin de flux avec une fence jamais refermée (cas anormal) : on renvoie le texte brut plutôt que de le perdre.
  function flush() { if (buf) { emit(buf); buf = '' } }
  return { push, flush }
}

// ── OpenAI : mode non-streaming ──────────────────────────────────────────────
export async function openaiOnce(body: any, spec: ModelSpec, apiKey: string, timeoutMs: number, extraInstructions = ''): Promise<RunResult> {
  const t0 = Date.now()
  try {
    const res = await fetch(OPENAI_URL, {
      method: 'POST',
      headers: openaiHeaders(apiKey),
      body: JSON.stringify(buildOpenAIRequest(body, spec, false, extraInstructions)),
      signal: AbortSignal.timeout(timeoutMs),
    })
    const data = await res.json().catch(() => ({} as any))
    const latencyMs = Date.now() - t0
    if (!res.ok) {
      return { ok: false, status: res.status, error: data?.error?.message || 'Erreur API OpenAI', text: '', usage: EMPTY_USAGE, stopReason: null, latencyMs }
    }
    const usage = openaiUsage(data.usage)
    if (data.status === 'failed') {
      return { ok: false, status: 502, error: data?.error?.message || 'Réponse OpenAI en échec', text: '', usage, stopReason: null, latencyMs }
    }
    const text = normalizeGraphBlocksInText(openaiText(data))
    const truncated = data.status === 'incomplete'
    if (!text.trim()) {
      return {
        ok: false, status: 502, usage, stopReason: truncated ? 'max_tokens' : null, latencyMs, text: '',
        error: truncated ? 'Réponse vide : budget épuisé par le raisonnement' : 'Réponse vide',
      }
    }
    return { ok: true, status: 200, text, usage, stopReason: truncated ? 'max_tokens' : 'end_turn', latencyMs }
  } catch (e) {
    return { ok: false, status: 0, error: errMsg(e), text: '', usage: EMPTY_USAGE, stopReason: null, latencyMs: Date.now() - t0 }
  }
}

// Réponse au format Anthropic (ce que les pages front lisent : d.content[].text)
export function toAnthropicMessage(r: RunResult, model: string) {
  return {
    id: `msg_oa_${Date.now().toString(36)}`,
    type: 'message',
    role: 'assistant',
    model,
    content: [{ type: 'text', text: r.text }],
    stop_reason: r.stopReason || 'end_turn',
    stop_sequence: null,
    usage: { input_tokens: r.usage.input, output_tokens: r.usage.output },
  }
}

// ── OpenAI : mode streaming, traduit en événements SSE Anthropic ─────────────
export type OpenAIStreamStart =
  | { ok: true; stream: ReadableStream<Uint8Array>; done: Promise<StreamMeta> }
  | { ok: false; status: number; error: string }

export async function openaiStream(
  body: any,
  spec: ModelSpec,
  apiKey: string,
  opts: { ttftMs: number; totalMs: number },
  extraInstructions = ''
): Promise<OpenAIStreamStart> {
  const ac = new AbortController()
  const t0 = Date.now()
  const totalTimer = setTimeout(() => ac.abort(), opts.totalMs)
  let ttftTimer: ReturnType<typeof setTimeout> | null = setTimeout(() => ac.abort(), opts.ttftMs)
  const clearAll = () => {
    clearTimeout(totalTimer)
    if (ttftTimer) { clearTimeout(ttftTimer); ttftTimer = null }
  }

  let res: Response
  try {
    res = await fetch(OPENAI_URL, {
      method: 'POST',
      headers: openaiHeaders(apiKey),
      body: JSON.stringify(buildOpenAIRequest(body, spec, true, extraInstructions)),
      signal: ac.signal,
    })
  } catch (e) {
    clearAll()
    return { ok: false, status: 0, error: errMsg(e) }
  }
  if (!res.ok || !res.body) {
    clearAll()
    const err = await res.json().catch(() => ({} as any))
    return { ok: false, status: res.status, error: err?.error?.message || 'Erreur API OpenAI' }
  }

  const reader = res.body.getReader()
  const decoder = new TextDecoder()
  const feed = createSSEParser()

  let started = false
  let finished = false
  let failed: string | null = null
  let stop = 'end_turn'
  let usage: Usage = { ...EMPTY_USAGE }
  let outChars = 0
  let ttfbMs: number | null = null

  // Émet un morceau de texte déjà "propre" (jamais un fragment de fence ```graph en cours) vers le client.
  const emitText = (out: Uint8Array[], text: string) => {
    if (!text) return
    if (!started) {
      started = true
      ttfbMs = Date.now() - t0
      if (ttftTimer) { clearTimeout(ttftTimer); ttftTimer = null }
      out.push(
        sse('message_start', {
          type: 'message_start',
          message: { id: `msg_oa_${t0.toString(36)}`, type: 'message', role: 'assistant', model: spec.model, content: [], usage: { input_tokens: 0, output_tokens: 0 } },
        }),
        sse('content_block_start', { type: 'content_block_start', index: 0, content_block: { type: 'text', text: '' } })
      )
    }
    outChars += text.length
    out.push(sse('content_block_delta', { type: 'content_block_delta', index: 0, delta: { type: 'text_delta', text } }))
  }

  // Corrige les blocs ```graph avant qu'ils n'atteignent le client (voir normalizeGraphFence plus bas) :
  // les deltas d'un bloc en cours sont retenus jusqu'à sa fermeture, le reste du texte s'affiche en direct.
  let pendingOut: Uint8Array[] = []
  const graphBuf = createGraphFenceBuffer((t) => emitText(pendingOut, t))

  // Traduit un événement OpenAI en 0..n chunks SSE Anthropic
  const translate = (evt: any): Uint8Array[] => {
    pendingOut = []
    switch (evt?.type) {
      case 'response.output_text.delta': {
        if (!evt.delta) break
        graphBuf.push(evt.delta)
        break
      }
      case 'response.completed':
      case 'response.incomplete':
        graphBuf.flush()
        usage = openaiUsage(evt.response?.usage)
        if (evt.type === 'response.incomplete') stop = 'max_tokens'
        finished = true
        break
      case 'response.failed':
      case 'error':
        graphBuf.flush()
        failed = evt.response?.error?.message || evt.message || 'Erreur flux OpenAI'
        finished = true
        break
    }
    return pendingOut
  }

  // ── Phase d'amorçage : on attend le 1er texte AVANT de répondre au client ──
  // Si la variante échoue/reste vide/expire ici, la route peut se replier proprement sur Claude.
  const pre: Uint8Array[] = []
  try {
    while (!started && !finished) {
      const { value, done } = await reader.read()
      if (done) break
      for (const evt of feed(decoder.decode(value, { stream: true }))) pre.push(...translate(evt))
    }
  } catch (e) {
    failed = failed || errMsg(e)
  }
  if (!started) {
    clearAll()
    try { await reader.cancel() } catch { /* ignore */ }
    return {
      ok: false,
      status: failed ? 502 : 200,
      error: failed || (stop === 'max_tokens' ? 'Réponse vide : budget épuisé par le raisonnement' : 'Réponse vide'),
    }
  }

  let resolveMeta!: (m: StreamMeta) => void
  const done = new Promise<StreamMeta>((r) => { resolveMeta = r })
  let closed = false

  const finishUp = (controller: ReadableStreamDefaultController<Uint8Array>) => {
    if (closed) return
    closed = true
    clearAll()
    if (failed) {
      controller.enqueue(sse('error', { type: 'error', error: { type: 'api_error', message: failed } }))
    } else {
      controller.enqueue(sse('content_block_stop', { type: 'content_block_stop', index: 0 }))
      controller.enqueue(sse('message_delta', { type: 'message_delta', delta: { stop_reason: stop, stop_sequence: null }, usage: { output_tokens: usage.output } }))
      controller.enqueue(sse('message_stop', { type: 'message_stop' }))
    }
    try { controller.close() } catch { /* déjà fermé */ }
    resolveMeta({ usage, outChars, ttfbMs, stopReason: stop, error: failed || undefined })
  }

  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      for (const c of pre) controller.enqueue(c)
      if (finished) finishUp(controller)
    },
    async pull(controller) {
      // Boucle : un chunk réseau peut ne contenir aucun événement complet (ou aucun texte). Si pull()
      // se terminait sans rien mettre en file, le flux resterait bloqué (pull n'est plus rappelé).
      while (!closed) {
        try {
          const { value, done: d } = await reader.read()
          if (d) { finishUp(controller); return }
          let n = 0
          for (const evt of feed(decoder.decode(value, { stream: true }))) {
            for (const c of translate(evt)) { controller.enqueue(c); n++ }
          }
          if (finished) { finishUp(controller); return }
          if (n > 0) return
        } catch (e) {
          failed = failed || errMsg(e)
          finishUp(controller)
          return
        }
      }
    },
    cancel() {
      if (!closed) {
        closed = true
        clearAll()
        resolveMeta({ usage, outChars, ttfbMs, stopReason: 'client_cancel', error: undefined })
      }
      return reader.cancel().catch(() => undefined)
    },
  })

  return { ok: true, stream, done }
}

// OpenAI en STREAMING, texte collecté côté serveur (mode comparaison) : même raison que anthropicCollect —
// en non-streaming OpenAI n'envoie aucun octet avant la fin, et certains réseaux coupent une connexion muette
// au bout de ~30 s ("fetch failed"), ce qui arrive sur les longues réponses (cours, physique + schémas).
export async function openaiCollect(body: any, spec: ModelSpec, apiKey: string, timeoutMs: number, extraInstructions = ''): Promise<RunResult> {
  const t0 = Date.now()
  const r = await openaiStream(body, spec, apiKey, { ttftMs: timeoutMs, totalMs: timeoutMs }, extraInstructions)
  if (!r.ok) {
    return { ok: false, status: r.status, error: r.error, text: '', usage: EMPTY_USAGE, stopReason: null, latencyMs: Date.now() - t0 }
  }
  const reader = r.stream.getReader()
  const decoder = new TextDecoder()
  const feed = createSSEParser()
  let text = ''
  let streamError: string | undefined
  try {
    for (;;) {
      const { value, done } = await reader.read()
      if (done) break
      for (const ev of feed(decoder.decode(value, { stream: true }))) {
        if (ev.type === 'content_block_delta' && ev.delta?.type === 'text_delta') text += ev.delta.text || ''
        else if (ev.type === 'error') streamError = ev.error?.message || 'erreur flux OpenAI'
      }
    }
  } catch (e) {
    streamError = errMsg(e)
  }
  const meta = await r.done
  const latencyMs = Date.now() - t0
  const error = streamError || meta.error
  if (error || !text.trim()) {
    return { ok: false, status: 502, error: error || 'Réponse vide', text, usage: meta.usage, stopReason: meta.stopReason, latencyMs }
  }
  return { ok: true, status: 200, text, usage: meta.usage, stopReason: meta.stopReason, latencyMs }
}
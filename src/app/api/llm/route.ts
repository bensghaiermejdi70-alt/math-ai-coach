// src/app/api/llm/route.ts
// Route de routage multi-modèles + test A/B. MÊME contrat que /api/anthropic (requête ET réponse au
// format Anthropic, JSON ou SSE) : pour tester une page, il suffit de remplacer '/api/anthropic' par '/api/llm'.
// /api/anthropic n'est PAS modifiée.
//
//  • Par défaut : 0 % de trafic vers la variante => 100 % Claude (comportement identique).
//  • A/B : attribution stable par utilisateur (LLM_AB_PERCENT), repli automatique sur Claude si la variante échoue.
//  • Admin uniquement : body.llm_arm = 'control'|'variant' (forcer un bras) ; body.llm_compare = true
//    (même requête sur les 2 bras en parallèle, réponse JSON comparative, sans consommer de quota) ;
//    body.llm_reminder = false désactive le rappel de longueur (chat) pour comparer avec/sans ;
//    body.llm_variant = 'openai:gpt-6-luna:medium:high' (avec llm_compare ou llm_arm:'variant') teste une autre variante sans toucher aux variables d'env.
//  • Chaque appel est journalisé dans llm_ab_logs (tokens, latence, coût estimé, repli, erreurs).
import { NextRequest, NextResponse } from 'next/server'
import { randomUUID } from 'crypto'
import { createServerSupabaseClient, createAdminClient } from '@/lib/supabase/server'
import { ADMIN_EMAIL, getQuotaLimits, MatiereType } from '@/lib/types/monetisation'
import { fetchAnthropicWithRetry } from '@/lib/anthropic/fetchWithRetry'
import {
  abSettings, Arm, CONTROL_MODELS_ALLOWED, estimateCostUsd, extraInstructionsFor, getVariantSpec, MAX_TOKENS_CAP,
  ModelSpec, parseSpec, pickArm, QuotaType, Usage, EMPTY_USAGE,
} from '@/lib/llm/config'
import {
  anthropicCollect, anthropicOnce, canUseOpenAI, openaiCollect, openaiOnce, openaiStream, RunResult, StreamMeta,
  tapAnthropicSSE, toAnthropicMessage,
} from '@/lib/llm/providers'

export const maxDuration = 120
export const dynamic = 'force-dynamic'

// ── Rate limiting anti-rafale : MÊME store que /api/anthropic (budget partagé entre les 2 routes) ──
const RL_WINDOW_MS = 60_000
const RL_MAX = 25
const _rlStore: Map<string, number[]> =
  (globalThis as any).__mb_rl || ((globalThis as any).__mb_rl = new Map())

function rateLimitOk(userId: string): boolean {
  const now = Date.now()
  const recent = (_rlStore.get(userId) || []).filter((t) => now - t < RL_WINDOW_MS)
  if (recent.length >= RL_MAX) {
    _rlStore.set(userId, recent)
    return false
  }
  recent.push(now)
  _rlStore.set(userId, recent)
  return true
}

// Type de requête pour le quota ET pour le routage (copie fidèle de /api/anthropic)
function getQuotaType(body: any): QuotaType {
  const explicitType = body?.type
  if (explicitType === 'chat' || explicitType === 'solver' || explicitType === 'simulations') return explicitType

  const systemPrompt = typeof body?.system === 'string' ? body.system : JSON.stringify(body?.system || '')
  const messageContent = Array.isArray(body?.messages) ? body.messages[body.messages.length - 1]?.content : undefined
  const userContent =
    typeof messageContent === 'string'
      ? messageContent
      : typeof messageContent === 'object' && messageContent !== null
        ? JSON.stringify(messageContent)
        : String(body?.prompt || '')

  const normalized = `${systemPrompt} ${userContent}`.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()

  const isSimulation = [
    'simulation', 'examen simul', 'sujet de bac', 'crée un sujet', 'cree un sujet', 'sujet original',
    'génère un examen', 'genere un examen', 'génère un sujet', 'genere un sujet', 'examen variante',
    'variante', 'sujet bac',
  ].some((t) => normalized.includes(t))
  if (isSimulation) return 'simulations'

  const isSolver = [
    'solveur', 'résous', 'resous', 'résoudre', 'resoudre', 'corrige', 'corriger', 'vérifie', 'verifie',
    'solution', 'solution de l eleve', 'corrige la solution', 'vérifie et corrige', 'verifie et corrige',
  ].some((t) => normalized.includes(t))
  if (isSolver) return 'solver'

  return 'chat'
}

function getWeekStart(): string {
  const now = new Date()
  const day = now.getDay()
  const diff = now.getDate() - day + (day === 0 ? -6 : 1)
  const monday = new Date(now)
  monday.setDate(diff)
  return monday.toISOString().split('T')[0]
}

// Prompt caching Anthropic (identique à /api/anthropic : TTL 1 h sur le system prompt)
function withSystemCache(b: any): any {
  const _CACHE: any = { type: 'ephemeral', ttl: '1h' }
  const out = { ...b }
  if (typeof out.system === 'string' && out.system.trim().length > 0) {
    out.system = [{ type: 'text', text: out.system, cache_control: _CACHE }]
  } else if (Array.isArray(out.system) && out.system.length > 0) {
    const blocks = out.system.map((x: any) => ({ ...x }))
    const last = blocks[blocks.length - 1]
    if (last && typeof last === 'object' && !last.cache_control) last.cache_control = _CACHE
    out.system = blocks
  }
  return out
}

// ── Journalisation (fire-and-forget : ne bloque et ne casse JAMAIS la réponse) ──
interface LogCtx {
  userId: string
  quotaType: QuotaType
  matiere: string
  arm: Arm
  fallback: boolean
  note: string | null
  compareId: string | null
  stream: boolean
}
function logCall(
  c: LogCtx,
  spec: ModelSpec,
  r: { ok: boolean; status?: number; error?: string; usage?: Usage; latencyMs?: number; ttfbMs?: number | null; outChars?: number; stopReason?: string | null },
  attempt: number
) {
  try {
    const usage = r.usage || EMPTY_USAGE
    void Promise.resolve(
      createAdminClient().from('llm_ab_logs').insert({
        user_id: c.userId, compare_id: c.compareId, arm: c.arm, attempt, fallback: c.fallback, note: c.note,
        provider: spec.provider, model: spec.model,
        effort: spec.effort ? spec.effort + (spec.verbosity ? `+verb:${spec.verbosity}` : '') : null,
        quota_type: c.quotaType, matiere: c.matiere, stream: c.stream,
        ok: r.ok, status: r.status ?? null, error: r.error ? r.error.slice(0, 500) : null,
        latency_ms: r.latencyMs ?? null, ttfb_ms: r.ttfbMs ?? null,
        input_tokens: usage.input, output_tokens: usage.output, cached_tokens: usage.cached,
        cache_write_tokens: usage.cacheWrite, reasoning_tokens: usage.reasoning,
        cost_usd: r.ok ? estimateCostUsd(spec, usage) : null,
        output_chars: r.outChars ?? null, stop_reason: r.stopReason ?? null,
      })
    ).catch(() => undefined)
  } catch {
    /* silencieux */
  }
}

const sseHeaders = (extra: Record<string, string>) => ({
  'Content-Type': 'text/event-stream; charset=utf-8',
  'Cache-Control': 'no-cache, no-transform',
  Connection: 'keep-alive',
  'X-Accel-Buffering': 'no',
  ...extra,
})

interface Ctx {
  log: LogCtx
  anthropicBody: any // corps Anthropic "propre" (sans champs custom), model = modèle demandé par le client
  stream: boolean
  isAdmin: boolean
  countUsage: () => Promise<void>
  cfg: ReturnType<typeof abSettings>
}

const debugHeaders = (ctx: Ctx, spec: ModelSpec): Record<string, string> =>
  ctx.isAdmin
    ? { 'X-LLM-Arm': ctx.log.arm, 'X-LLM-Model': `${spec.provider}:${spec.model}${spec.effort ? ':' + spec.effort : ''}${spec.effort && spec.verbosity ? ':' + spec.verbosity : ''}`, 'X-LLM-Fallback': String(ctx.log.fallback) }
    : {}

// ═════════════════════════════════════════════════════════════════════════════
// Service Anthropic (bras contrôle, ou variante Claude, ou repli)
// ═════════════════════════════════════════════════════════════════════════════
async function serveAnthropic(ctx: Ctx, model: string): Promise<Response> {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    console.error('ANTHROPIC_API_KEY manquante ❌')
    return NextResponse.json({ error: 'Configuration serveur manquante (API key)' }, { status: 500 })
  }
  const spec: ModelSpec = { provider: 'anthropic', model }
  const body = withSystemCache({ ...ctx.anthropicBody, model })
  const attempt = ctx.log.fallback ? 2 : 1

  if (ctx.stream) {
    const t0 = Date.now()
    const res = await fetchAnthropicWithRetry(
      'https://api.anthropic.com/v1/messages',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey, 'anthropic-version': '2023-06-01' },
        body: JSON.stringify(body),
      },
      { maxRetries: 0, overallTimeoutMs: 240000 }
    )
    if (!res.ok || !res.body) {
      const err = await res.json().catch(() => ({} as any))
      const msg = err?.error?.message || 'Erreur API Anthropic'
      logCall(ctx.log, spec, { ok: false, status: res.status, error: msg, latencyMs: Date.now() - t0 }, attempt)
      return NextResponse.json({ error: msg }, { status: res.status || 502 })
    }
    await ctx.countUsage()
    const tapped = tapAnthropicSSE(res.body, (m: StreamMeta) =>
      logCall(ctx.log, spec, { ok: !m.error, error: m.error, usage: m.usage, latencyMs: Date.now() - t0, ttfbMs: m.ttfbMs, outChars: m.outChars, stopReason: m.stopReason }, attempt)
    )
    return new Response(tapped, { status: 200, headers: sseHeaders(debugHeaders(ctx, spec)) })
  }

  const r = await anthropicOnce(body, apiKey, 2, 115000)
  logCall(ctx.log, spec, { ok: r.ok, status: r.status, error: r.error, usage: r.usage, latencyMs: r.latencyMs, outChars: r.text.length, stopReason: r.stopReason }, attempt)
  if (!r.ok) return NextResponse.json({ error: r.error || 'Erreur API Anthropic' }, { status: r.status || 504 })
  await ctx.countUsage()
  return NextResponse.json(r.raw, { headers: debugHeaders(ctx, spec) })
}

// ═════════════════════════════════════════════════════════════════════════════
// Service OpenAI (variante). Renvoie { response } si OK, sinon { error } => repli possible.
// ═════════════════════════════════════════════════════════════════════════════
async function tryOpenAI(ctx: Ctx, spec: ModelSpec): Promise<{ response?: Response; error?: string }> {
  const apiKey = process.env.OPENAI_API_KEY as string

  if (ctx.stream) {
    const t0 = Date.now()
    const r = await openaiStream(ctx.anthropicBody, spec, apiKey, { ttftMs: ctx.cfg.ttftMs, totalMs: 240000 }, extraInstructionsFor(ctx.log.quotaType, spec))
    if (!r.ok) {
      logCall(ctx.log, spec, { ok: false, status: r.status, error: r.error, latencyMs: Date.now() - t0 }, 1)
      return { error: r.error }
    }
    await ctx.countUsage()
    void r.done.then((m) =>
      logCall(ctx.log, spec, { ok: !m.error, error: m.error, usage: m.usage, latencyMs: Date.now() - t0, ttfbMs: m.ttfbMs, outChars: m.outChars, stopReason: m.stopReason }, 1)
    )
    return { response: new Response(r.stream, { status: 200, headers: sseHeaders(debugHeaders(ctx, spec)) }) }
  }

  const r = await openaiOnce(ctx.anthropicBody, spec, apiKey, ctx.cfg.totalMs, extraInstructionsFor(ctx.log.quotaType, spec))
  logCall(ctx.log, spec, { ok: r.ok, status: r.status, error: r.error, usage: r.usage, latencyMs: r.latencyMs, outChars: r.text.length, stopReason: r.stopReason }, 1)
  if (!r.ok) return { error: r.error }
  await ctx.countUsage()
  return { response: NextResponse.json(toAnthropicMessage(r, spec.model), { headers: debugHeaders(ctx, spec) }) }
}

// Pourquoi la variante ne peut pas servir CETTE requête (null = OK)
function variantBlockReason(spec: ModelSpec | null, anthropicBody: any): string | null {
  if (!spec) return 'no_variant'
  if (spec.provider === 'openai') {
    if (!process.env.OPENAI_API_KEY) return 'no_openai_key'
    if (!canUseOpenAI(anthropicBody)) return 'unsupported_input' // PDF/tools => Claude obligatoire
  } else if (!CONTROL_MODELS_ALLOWED.has(spec.model)) return 'model_not_allowed'
  return null
}

// ═════════════════════════════════════════════════════════════════════════════
// Mode comparaison (admin) : même requête, les 2 bras en parallèle, non-streaming
// ═════════════════════════════════════════════════════════════════════════════
async function handleCompare(ctx: Ctx, controlModel: string, variant: ModelSpec | null, reminderOff = false): Promise<Response> {
  if (!variant) return NextResponse.json({ error: 'Aucune variante configurée' }, { status: 400 })
  const reason = variantBlockReason(variant, ctx.anthropicBody)
  if (reason) return NextResponse.json({ error: `Variante inutilisable pour cette requête : ${reason}` }, { status: 400 })

  const compareId = randomUUID()
  const controlSpec: ModelSpec = { provider: 'anthropic', model: controlModel }
  const anthropicKey = process.env.ANTHROPIC_API_KEY
  if (!anthropicKey) return NextResponse.json({ error: 'ANTHROPIC_API_KEY manquante' }, { status: 500 })

  const runVariant = (): Promise<RunResult> =>
    variant.provider === 'openai'
      ? openaiCollect(ctx.anthropicBody, variant, process.env.OPENAI_API_KEY as string, 100000, extraInstructionsFor(ctx.log.quotaType, variant, reminderOff))
      : anthropicCollect(withSystemCache({ ...ctx.anthropicBody, model: variant.model }), anthropicKey, 100000)

  const [c, v] = await Promise.all([
    anthropicCollect(withSystemCache({ ...ctx.anthropicBody, model: controlModel }), anthropicKey, 100000),
    runVariant(),
  ])

  const shape = (spec: ModelSpec, r: RunResult, arm: Arm) => {
    logCall({ ...ctx.log, arm, compareId, stream: false, note: 'compare' }, spec, { ok: r.ok, status: r.status, error: r.error, usage: r.usage, latencyMs: r.latencyMs, outChars: r.text.length, stopReason: r.stopReason }, 1)
    return {
      provider: spec.provider, model: spec.model, effort: spec.effort ?? null, verbosity: spec.verbosity ?? null,
      ok: r.ok, error: r.error ?? null, latency_ms: r.latencyMs, stop_reason: r.stopReason,
      usage: r.usage, cost_usd: r.ok ? estimateCostUsd(spec, r.usage) : null,
      chars: r.text.length, text: r.text,
    }
  }
  return NextResponse.json({ compare_id: compareId, control: shape(controlSpec, c, 'control'), variant: shape(variant, v, 'variant') })
}

// ═════════════════════════════════════════════════════════════════════════════
// Handler
// ═════════════════════════════════════════════════════════════════════════════
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    // ── Auth ──
    const supabase = createServerSupabaseClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Connexion requise' }, { status: 401 })
    const isAdmin = user.email === ADMIN_EMAIL

    // ── Anti-rafale (admin exempté) ──
    if (!isAdmin && !rateLimitOk(user.id)) {
      return NextResponse.json(
        { error: 'Trop de requêtes en peu de temps. Réessaie dans une minute.', rate_limited: true },
        { status: 429, headers: { 'Retry-After': '60' } }
      )
    }

    // ── Validation (absente de /api/anthropic) : modèle autorisé, messages présents, max_tokens plafonné ──
    const model = String(body?.model || '')
    if (!CONTROL_MODELS_ALLOWED.has(model)) {
      return NextResponse.json({ error: `Modèle non autorisé : ${model || '(vide)'}` }, { status: 400 })
    }
    if (!Array.isArray(body?.messages) || body.messages.length === 0) {
      return NextResponse.json({ error: 'messages requis' }, { status: 400 })
    }
    const maxTokens = Math.min(Number(body?.max_tokens) || 4000, MAX_TOKENS_CAP)

    const quotaType = getQuotaType(body)
    const matiere = ((body?.matiere as MatiereType) || 'mathematiques') as string

    // ── Quota hebdo (logique identique à /api/anthropic) ──
    if (!isAdmin) {
      const { data: subscriptions } = await supabase
        .from('subscriptions')
        .select('plan_type, ends_at, subscription_end')
        .eq('user_id', user.id)
        .eq('is_active', true)
        .eq('status', 'active')
        .order('ends_at', { ascending: false })
        .order('subscription_end', { ascending: false })
        .limit(10)

      const activePlanTypes = (subscriptions || [])
        .filter((sub: any) => {
          const endsAt = sub?.ends_at || sub?.subscription_end
          return endsAt && new Date(endsAt) > new Date()
        })
        .map((sub: any) => sub.plan_type)

      const limits = getQuotaLimits(activePlanTypes, false)
      const limit = limits[`${quotaType}_per_week` as keyof typeof limits] as number

      if (limit !== -1) {
        const { data: quotas } = await supabase
          .from('user_quotas')
          .select('*')
          .eq('user_id', user.id)
          .eq('week_start', getWeekStart())

        const colMap: Record<string, string> = { chat: 'chat_used', solver: 'solver_used', simulations: 'simulations_used' }
        const used = (Array.isArray(quotas) ? quotas : []).reduce(
          (sum, row) => sum + (((row as any)?.[colMap[quotaType]] as number) || 0), 0
        )
        if (used >= limit) {
          return NextResponse.json(
            { error: `Quota ${quotaType} dépassé (${used}/${limit} cette semaine). Renouvellement lundi.`, quota_exceeded: true, quota_type: quotaType, used, limit },
            { status: 429 }
          )
        }
      }
    }

    // Comptage serveur après succès (identique : RPC increment_quota, admin non compté)
    const countUsage = async () => {
      if (isAdmin) return
      try {
        await supabase.rpc('increment_quota', { p_user_id: user.id, p_matiere: matiere, p_type: quotaType })
      } catch (e) {
        console.error('increment_quota (serveur) échec:', e)
      }
    }

    // ── Corps Anthropic propre (champs custom retirés) ──
    const { type: _t, matiere: _m, llm_arm, llm_compare, llm_variant, llm_reminder, ...rest } = body
    const anthropicBody = { ...rest, model, max_tokens: maxTokens }

    const cfg = abSettings()
    let variantSpec = getVariantSpec(quotaType)
    // Admin : llm_variant ("fournisseur:modèle[:effort[:verbosité]]") remplace la variante configurée
    // (comparaison ET bras forcé), pour tester plusieurs modèles sans toucher aux variables d'env.
    if (isAdmin && typeof llm_variant === 'string' && llm_variant.trim()) {
      const override = parseSpec(llm_variant.trim())
      if (!override) return NextResponse.json({ error: `llm_variant invalide : ${llm_variant}` }, { status: 400 })
      variantSpec = override
    }
    const ctx: Ctx = {
      log: { userId: user.id, quotaType, matiere, arm: 'control', fallback: false, note: null, compareId: null, stream: !!anthropicBody.stream },
      anthropicBody, stream: !!anthropicBody.stream, isAdmin, countUsage, cfg,
    }

    // ── Mode comparaison (admin) ──
    if (isAdmin && llm_compare) return await handleCompare(ctx, model, variantSpec, llm_reminder === false)

    // ── Choix du bras ──
    let arm: Arm = 'control'
    if (isAdmin && (llm_arm === 'control' || llm_arm === 'variant')) arm = llm_arm
    else if (!isAdmin && variantSpec) arm = pickArm(user.id, quotaType, matiere) // admin hors stats sauf bras forcé

    if (arm === 'variant') {
      const reason = variantBlockReason(variantSpec, anthropicBody)
      if (reason) { arm = 'control'; ctx.log.note = reason } // ex. PDF => Claude ; exclure ces lignes de l'analyse
    }
    ctx.log.arm = arm

    // ── Variante ──
    if (arm === 'variant' && variantSpec) {
      if (variantSpec.provider === 'anthropic') return await serveAnthropic(ctx, variantSpec.model)
      const r = await tryOpenAI(ctx, variantSpec)
      if (r.response) return r.response
      if (!cfg.fallback) return NextResponse.json({ error: r.error || 'Erreur modèle (variante)' }, { status: 502 })
      ctx.log.fallback = true // échec variante => on sert Claude, tracé dans les logs
    }

    // ── Contrôle (ou repli) : le modèle demandé par le client, comme /api/anthropic ──
    return await serveAnthropic(ctx, model)
  } catch (error) {
    console.error('Erreur route /api/llm:', error)
    return NextResponse.json({ error: 'Erreur serveur interne' }, { status: 500 })
  }
}
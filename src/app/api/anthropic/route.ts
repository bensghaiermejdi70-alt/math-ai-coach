// src/app/api/anthropic/route.ts — avec vérification quota abonnement
import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import { ADMIN_EMAIL, getQuotaLimits, extractMatiere, MatiereType } from '@/lib/types/monetisation'
import { fetchAnthropicWithRetry } from '@/lib/anthropic/fetchWithRetry'

export const maxDuration = 120

// ── Rate limiting anti-rafale (en mémoire, par utilisateur) ──
//    Le quota hebdo limite le VOLUME total ; ceci limite le DÉBIT (req/minute)
//    pour bloquer les rafales abusives (scripts) qui exploseraient coûts & charge.
//    Stocké sur globalThis pour survivre aux hot-reloads / rester partagé dans l'instance.
const RL_WINDOW_MS = 60_000   // fenêtre glissante : 60 secondes
const RL_MAX = 25             // max 25 requêtes / 60 s / utilisateur
const _rlStore: Map<string, number[]> =
  (globalThis as any).__mb_rl || ((globalThis as any).__mb_rl = new Map())

function rateLimitOk(userId: string): boolean {
  const now = Date.now()
  const recent = (_rlStore.get(userId) || []).filter((t) => now - t < RL_WINDOW_MS)
  if (recent.length >= RL_MAX) {
    _rlStore.set(userId, recent)   // on garde la fenêtre à jour sans ajouter
    return false
  }
  recent.push(now)
  _rlStore.set(userId, recent)
  return true
}

// Détecter le type de requête pour comptabiliser le bon quota
function getQuotaType(body: any): 'chat' | 'solver' | 'simulations' | null {
  // Priorité au paramètre explicite 'type' passé par le client
  const explicitType = body?.type
  if (explicitType === 'chat' || explicitType === 'solver' || explicitType === 'simulations') {
    return explicitType
  }

  // Fallback à la détection basée sur le contenu (pour compatibilité)
  const systemPrompt = String(body?.system || '')
  const messageContent = Array.isArray(body?.messages)
    ? body.messages[body.messages.length - 1]?.content
    : undefined
  const userContent = typeof messageContent === 'string'
    ? messageContent
    : typeof messageContent === 'object' && messageContent !== null
      ? JSON.stringify(messageContent)
      : String(body?.prompt || '')

  const text = `${systemPrompt} ${userContent}`
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
  const normalized = text.toLowerCase()

  const isSimulation = [
    'simulation', 'examen simul', 'sujet de bac', 'crée un sujet', 'cree un sujet',
    'sujet original', 'génère un examen', 'genere un examen', 'génère un sujet',
    'genere un sujet', 'examen variante', 'variante', 'sujet bac', 'sujet original'
  ].some(token => normalized.includes(token))

  if (isSimulation) return 'simulations'

  const isSolver = [
    'solveur', 'résous', 'resous', 'résoudre', 'resoudre',
    'corrige', 'corriger', 'vérifie', 'verifie', 'solution', 'solution de l eleve',
    'corrige la solution', 'vérifie et corrige', 'verifie et corrige'
  ].some(token => normalized.includes(token))

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

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    // ── Vérification auth & quota ──
    const supabase = createServerSupabaseClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Connexion requise' }, { status: 401 })
    }

    // ── Rate limiting (anti-rafale) — admin exempté ──
    if (user.email !== ADMIN_EMAIL && !rateLimitOk(user.id)) {
      return NextResponse.json(
        { error: 'Trop de requêtes en peu de temps. Réessaie dans une minute.', rate_limited: true },
        { status: 429, headers: { 'Retry-After': '60' } }
      )
    }

    // ── Comptage du quota CÔTÉ SERVEUR (non contournable) ──
    // L'incrément n'est plus déclenché par le client. Il est fait ici, APRÈS un
    // appel Anthropic réussi, via la RPC SECURITY DEFINER increment_quota.
    const _userId = user.id
    const _userEmail = user.email
    const countUsage = async () => {
      if (_userEmail === ADMIN_EMAIL) return          // admin = illimité, non compté
      const qt = getQuotaType(body)
      if (!qt) return
      const mt = ((body?.matiere as MatiereType) || 'mathematiques')
      try {
        await supabase.rpc('increment_quota', { p_user_id: _userId, p_matiere: mt, p_type: qt })
      } catch (e) {
        console.error('increment_quota (serveur) échec:', e)
      }
    }


    if (user && user.email !== ADMIN_EMAIL) {
      const quotaType = getQuotaType(body)

      if (quotaType) {
        // Récupérer abonnements actifs
        const { data: subscriptions } = await supabase
          .from('subscriptions')
          .select('plan_type, ends_at, subscription_end')
          .eq('user_id', user.id)
          .eq('is_active', true)
          .eq('status', 'active')
          .order('ends_at', { ascending: false })
          .order('subscription_end', { ascending: false })
          .limit(10)

        const activePlanTypes = (subscriptions || []).filter((sub: any) => {
          const endsAt = sub?.ends_at || sub?.subscription_end
          return endsAt && new Date(endsAt) > new Date()
        }).map((sub: any) => sub.plan_type)

        const matiere = (body.matiere as MatiereType) || 'mathematiques'
        const relevantPlans = activePlanTypes
        const limits = getQuotaLimits(relevantPlans, false)
        const limitKey = `${quotaType}_per_week` as keyof typeof limits
        const limit = limits[limitKey] as number

        if (limit !== -1) {
          const weekStart = getWeekStart()
          const { data: quotas } = await supabase
            .from('user_quotas')
            .select('*')
            .eq('user_id', user.id)
            .eq('week_start', weekStart)

          const colMap: Record<string, string> = {
            chat: 'chat_used', solver: 'solver_used', simulations: 'simulations_used',
          }
          const used = (Array.isArray(quotas) ? quotas : []).reduce(
            (sum, row) => sum + (((row as any)?.[colMap[quotaType]] as number) || 0),
            0
          )

          if (used >= limit) {
            return NextResponse.json({
              error: `Quota ${quotaType} dépassé (${used}/${limit} cette semaine). Renouvellement lundi.`,
              quota_exceeded: true,
              quota_type: quotaType,
              used,
              limit,
            }, { status: 429 })
          }

          // L'incrément est géré par la RPC increment_quota côté composant
        }
      }
    }

    // ── Appel Anthropic ──
    const apiKey = process.env.ANTHROPIC_API_KEY

if (!apiKey) {
  console.error('ANTHROPIC_API_KEY manquante ❌')
  return NextResponse.json(
    { error: 'Configuration serveur manquante (API key)' },
    { status: 500 }
  )
}

// Construire le payload pour Anthropic en excluant les champs custom
const { type, matiere, ...anthropicBody } = body

// ── Prompt caching : met en cache le system prompt (réutilisé à chaque appel).
//    AUCUN impact sur la réponse : même contenu, même modèle, même max_tokens, même détail.
//    Seule la facturation de la portion répétée baisse (lecture du cache ≈ -90 %).
//    TTL 1 h (au lieu de 5 min par défaut) : l'élève lit/réfléchit souvent plus de
//    5 min entre deux requêtes (lecture d'une correction, génération de la variante
//    suivante) ; avec 5 min le cache expirait AVANT la requête suivante. Le 1 h garde
//    le système chaud sur toute la session → bien plus de lectures à -90 %.
//    (Sur le bac blanc, tous les élèves d'une même section/jour partagent le même
//    system : cache partagé entre utilisateurs pendant 1 h.)
const _CACHE: any = { type: 'ephemeral', ttl: '1h' }
if (typeof anthropicBody.system === 'string' && anthropicBody.system.trim().length > 0) {
  anthropicBody.system = [
    { type: 'text', text: anthropicBody.system, cache_control: _CACHE },
  ]
} else if (Array.isArray(anthropicBody.system) && anthropicBody.system.length > 0) {
  // system déjà sous forme de blocs : on marque le dernier bloc comme cacheable (sans double-emballage)
  const _last = anthropicBody.system[anthropicBody.system.length - 1]
  if (_last && typeof _last === 'object' && !_last.cache_control) {
    _last.cache_control = _CACHE
  }
}

const response = await fetchAnthropicWithRetry('https://api.anthropic.com/v1/messages', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': apiKey,
    'anthropic-version': '2023-06-01',
  },
  body: JSON.stringify(anthropicBody),
}, anthropicBody.stream
    ? { maxRetries: 0, overallTimeoutMs: 240000 } // streaming : pas de retry, délai large (240s) — la connexion reste active, pour les générations lourdes (bac blanc maths/physique/svt)
    : { maxRetries: 2, overallTimeoutMs: 115000 })

    // ── Mode streaming (SSE) : on relaie le flux Anthropic tel quel au client ──
    if (anthropicBody.stream) {
      if (!response.ok) {
        const errData = await response.json().catch(() => ({} as any))
        return NextResponse.json(
          { error: errData?.error?.message || 'Erreur API Anthropic' },
          { status: response.status }
        )
      }
      await countUsage()
      return new Response(response.body, {
        status: 200,
        headers: {
          'Content-Type': 'text/event-stream; charset=utf-8',
          'Cache-Control': 'no-cache, no-transform',
          'Connection': 'keep-alive',
          'X-Accel-Buffering': 'no',
        },
      })
    }

    const data = await response.json()

    if (!response.ok) {
      return NextResponse.json(
        { error: data.error?.message || 'Erreur API Anthropic' },
        { status: response.status }
      )
    }

    // Quota compté côté serveur (countUsage) — plus aucun incrément côté client
    await countUsage()

    return NextResponse.json(data)

  } catch (error) {
    console.error('Erreur route /api/anthropic:', error)
    return NextResponse.json({ error: 'Erreur serveur interne' }, { status: 500 })
  }
}
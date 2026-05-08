// src/app/api/anthropic/route.ts — avec vérification quota abonnement
import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import { ADMIN_EMAIL, getQuotaLimits, extractMatiere, hasMatiereAccess, MatiereType } from '@/lib/types/monetisation'

export const maxDuration = 120

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

    let shouldIncrementQuota = false
    let incrementQuotaData: any = null

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

        if (!hasMatiereAccess(activePlanTypes, matiere)) {
          return NextResponse.json({ error: 'Accès non autorisé à cette matière' }, { status: 403 })
        }

        const relevantPlans = activePlanTypes.filter(pt => extractMatiere(pt) === matiere)
        const limits = getQuotaLimits(relevantPlans, false) // TODO: check if sprint
        const limitKey = `${quotaType}_per_week` as keyof typeof limits
        const limit = limits[limitKey] as number

        if (limit !== -1) { // -1 = illimité
          // Récupérer quotas semaine pour cette matière
          const weekStart = getWeekStart()
          const { data: quota } = await supabase
            .from('user_quotas')
            .select('*')
            .eq('user_id', user.id)
            .eq('week_start', weekStart)
            .eq('matiere', matiere)
            .single()

          const colMap: Record<string, string> = {
            chat: 'chat_used', solver: 'solver_used', simulations: 'simulations_used',
          }
          const used = (quota as any)?.[colMap[quotaType]] || 0

          if (used >= limit) {
            return NextResponse.json({
              error: `Quota ${quotaType} dépassé (${used}/${limit} cette semaine). Renouvellement lundi.`,
              quota_exceeded: true,
              quota_type: quotaType,
              used,
              limit,
            }, { status: 429 })
          }

          // Préparer l'incrémentation après succès
          shouldIncrementQuota = true
          incrementQuotaData = {
            user_id: user.id,
            week_start: weekStart,
            matiere,
            [colMap[quotaType]]: used + 1,
          }
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
const response = await fetch('https://api.anthropic.com/v1/messages', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': apiKey,
    'anthropic-version': '2023-06-01',
  },
  body: JSON.stringify(anthropicBody),
  signal: AbortSignal.timeout(115000),
})

    const data = await response.json()

    if (!response.ok) {
      return NextResponse.json(
        { error: data.error?.message || 'Erreur API Anthropic' },
        { status: response.status }
      )
    }

    // Incrémenter quota après succès
    if (shouldIncrementQuota && incrementQuotaData) {
      await supabase.from('user_quotas').upsert(incrementQuotaData, { onConflict: 'user_id,week_start,matiere' })
    }

    return NextResponse.json(data)

  } catch (error) {
    console.error('Erreur route /api/anthropic:', error)
    return NextResponse.json({ error: 'Erreur serveur interne' }, { status: 500 })
  }
}

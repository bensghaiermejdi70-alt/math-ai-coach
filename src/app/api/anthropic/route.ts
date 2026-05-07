// src/app/api/anthropic/route.ts — avec vérification quota abonnement
import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import { ADMIN_EMAIL, getQuotaLimits } from '@/lib/types/monetisation'

export const maxDuration = 120

// Détecter le type de requête pour comptabiliser le bon quota
function detectQuotaType(body: any): 'chat' | 'solver' | 'simulations' | null {
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

    // TODO prod: décommenter pour activer la vérification en production
    // if (!user) {
    //   return NextResponse.json({ error: 'Connexion requise' }, { status: 401 })
    // }

    if (user && user.email !== ADMIN_EMAIL) {
      // Récupérer tous les abonnements actifs
      const { data: subs } = await supabase
        .from('subscriptions')
        .select('plan_type')
        .eq('user_id', user.id)
        .eq('is_active', true)
        .gt('subscription_end', new Date().toISOString())

      const planTypes = subs?.map(s => s.plan_type) || []
      const isSprint = planTypes.some(p => p?.startsWith('sprint_bac'))
      const limits = getQuotaLimits(planTypes, isSprint)

      const quotaType = detectQuotaType(body)

      if (quotaType) {
        const limitKey = `${quotaType}_per_week` as keyof typeof limits
        const limit = limits[limitKey] as number

        if (limit !== -1) { // -1 = illimité
          // Récupérer quotas semaine
          const weekStart = getWeekStart()
          const { data: quotas } = await supabase
            .from('user_quotas')
            .select('*')
            .eq('user_id', user.id)
            .eq('week_start', weekStart)
            .single()

          const colMap: Record<string, string> = {
            chat:'chat_used', solver:'solver_used', simulations:'simulations_used',
          }
          const used = (quotas as any)?.[colMap[quotaType]] || 0

          if (used >= limit) {
            return NextResponse.json({
              error: `Quota ${quotaType} dépassé (${used}/${limit} cette semaine). Renouvellement lundi.`,
              quota_exceeded: true,
              quota_type: quotaType,
              used,
              limit,
            }, { status: 429 })
          }

          // Incrémenter quota
          const col = colMap[quotaType]
          await supabase.from('user_quotas').upsert({
            user_id: user.id,
            week_start: weekStart,
            [col]: used + 1,
          }, { onConflict: 'user_id,week_start' })
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

const response = await fetch('https://api.anthropic.com/v1/messages', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': apiKey,
    'anthropic-version': '2023-06-01',
  },
  body: JSON.stringify({
    model: 'claude-3-haiku-20240307',
    max_tokens: 1000,
    ...body,
  }),
  signal: AbortSignal.timeout(115000),
})

    const data = await response.json()

    if (!response.ok) {
      return NextResponse.json(
        { error: data.error?.message || 'Erreur API Anthropic' },
        { status: response.status }
      )
    }

    return NextResponse.json(data)

  } catch (error) {
    console.error('Erreur route /api/anthropic:', error)
    return NextResponse.json({ error: 'Erreur serveur interne' }, { status: 500 })
  }
}

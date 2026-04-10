// src/app/api/anthropic/route.ts — avec vérification quota abonnement
import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import { ADMIN_EMAIL, getQuotaLimits } from '@/lib/types/monetisation'

export const maxDuration = 120

// Détecter le type de requête pour comptabiliser le bon quota
function detectQuotaType(body: any): 'chat' | 'solver' | 'simulations' | null {
  const systemPrompt = body?.system || ''
  const userContent  = body?.messages?.[body.messages.length - 1]?.content || ''

  if (typeof systemPrompt === 'string') {
    if (systemPrompt.includes('simulation') || systemPrompt.includes('examen simulé')) return 'simulations'
    if (systemPrompt.includes('solveur') || systemPrompt.includes('étape par étape') || systemPrompt.includes('résoudre')) return 'solver'
  }
  // Par défaut : chat
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
      const quotaType = detectQuotaType(body)

      if (quotaType) {
        // Récupérer abonnement actif
        const { data: sub } = await supabase
          .from('subscriptions')
          .select('plan_type')
          .eq('user_id', user.id)
          .eq('is_active', true)
          .eq('status', 'active')
          .gt('subscription_end', new Date().toISOString())
          .single()

        const planType = sub?.plan_type || null
        const limits   = getQuotaLimits(planType as any, planType === 'sprint_bac')
        const limitKey = `${quotaType}_per_week` as keyof typeof limits
        const limit    = limits[limitKey] as number

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

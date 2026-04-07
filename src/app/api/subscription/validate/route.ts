// src/app/api/subscription/validate/route.ts
// API pour vérifier abonnement et quotas côté serveur

import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient, createAdminClient } from '@/lib/supabase/server'
import { ADMIN_EMAIL, getQuotaLimits } from '@/lib/types/monetisation'

export async function GET(request: NextRequest) {
  const supabase = createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })
  }

  // Admin → accès illimité
  if (user.email === ADMIN_EMAIL) {
    return NextResponse.json({
      isAdmin: true,
      hasSubscription: true,
      subscription: null,
      quotas: null,
      limits: { unlimited: true },
    })
  }

  // Récupérer abonnement actif
  const { data: subscription } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('user_id', user.id)
    .eq('is_active', true)
    .eq('status', 'active')
    .gt('subscription_end', new Date().toISOString())
    .order('subscription_end', { ascending: false })
    .limit(1)
    .single()

  // Récupérer quotas semaine
  const weekStart = getWeekStart()
  const { data: quotas } = await supabase
    .from('user_quotas')
    .select('*')
    .eq('user_id', user.id)
    .eq('week_start', weekStart)
    .single()

  const planType = subscription?.plan_type || null
  const isSprint = planType === 'sprint_bac'
  const limits = getQuotaLimits(planType as any, isSprint)

  return NextResponse.json({
    isAdmin: false,
    hasSubscription: !!subscription,
    subscription,
    quotas: quotas || null,
    limits,
    daysRemaining: subscription?.subscription_end
      ? Math.ceil((new Date(subscription.subscription_end).getTime() - Date.now()) / 86400000)
      : null,
  })
}

// Incrémenter un quota côté serveur
export async function POST(request: NextRequest) {
  const supabase = createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })
  }

  // Admin → pas de comptage
  if (user.email === ADMIN_EMAIL) {
    return NextResponse.json({ success: true, unlimited: true })
  }

  const { type } = await request.json()
  const validTypes = ['simulations', 'chat', 'solver', 'remediation', 'analyses']
  if (!validTypes.includes(type)) {
    return NextResponse.json({ error: 'Type invalide' }, { status: 400 })
  }

  const columnMap: Record<string, string> = {
    simulations: 'simulations_used',
    chat: 'chat_used',
    solver: 'solver_used',
    remediation: 'remediation_used',
    analyses: 'analyses_used',
  }

  const weekStart = getWeekStart()
  const col = columnMap[type]

  // Vérifier quota actuel
  const { data: currentQuota } = await supabase
    .from('user_quotas')
    .select(`${col}`)
    .eq('user_id', user.id)
    .eq('week_start', weekStart)
    .single()

  // Vérifier abonnement
  const { data: subscription } = await supabase
    .from('subscriptions')
    .select('plan_type')
    .eq('user_id', user.id)
    .eq('is_active', true)
    .eq('status', 'active')
    .gt('subscription_end', new Date().toISOString())
    .single()

  const planType = subscription?.plan_type || null
  const limits = getQuotaLimits(planType as any, planType === 'sprint_bac')
  const limit = limits[`${type}_per_week` as keyof typeof limits] as number
  const current = (currentQuota as any)?.[col] || 0

  // Vérifier si quota dépassé
  if (limit !== -1 && current >= limit) {
    return NextResponse.json({
      error: 'Quota dépassé',
      used: current,
      limit,
      resetDate: getNextMonday(),
    }, { status: 429 })
  }

  // Incrémenter
  const adminClient = createAdminClient()
  await adminClient
    .from('user_quotas')
    .upsert({
      user_id: user.id,
      week_start: weekStart,
      [col]: current + 1,
    }, { onConflict: 'user_id,week_start' })

  return NextResponse.json({ success: true, used: current + 1, limit })
}

function getWeekStart(): string {
  const now = new Date()
  const day = now.getDay()
  const diff = now.getDate() - day + (day === 0 ? -6 : 1)
  const monday = new Date(now)
  monday.setDate(diff)
  return monday.toISOString().split('T')[0]
}

function getNextMonday(): string {
  const now = new Date()
  const day = now.getDay()
  const daysUntil = day === 0 ? 1 : 8 - day
  const monday = new Date(now)
  monday.setDate(now.getDate() + daysUntil)
  monday.setHours(0, 0, 0, 0)
  return monday.toISOString()
}

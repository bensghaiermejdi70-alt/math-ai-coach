// src/app/api/emails/cron/route.ts
// Cron job : vérifie abonnements expirant dans 3 jours + expirés
// Appeler 1x/jour → GET /api/emails/cron?secret=TON_SECRET

import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'
import { sendEmailExpirationBientot, sendEmailRenouvellement } from '@/lib/emails'

export async function GET(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret')
  if (secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }

  const supabase = createAdminClient()
  const now = new Date()

  // Expire dans 3 jours
  const in3 = new Date(now.getTime() + 3 * 86400000)
  const in4 = new Date(now.getTime() + 4 * 86400000)
  const { data: soon } = await supabase
    .from('subscriptions')
    .select('*, profiles(email, full_name)')
    .eq('is_active', true).eq('status', 'active')
    .gte('subscription_end', in3.toISOString())
    .lt('subscription_end', in4.toISOString())

  let sent3 = 0
  for (const sub of soon || []) {
    const p = sub.profiles as any
    if (!p?.email) continue
    const dateExp = new Date(sub.subscription_end).toLocaleDateString('fr-TN', { day:'numeric', month:'long', year:'numeric' })
    await sendEmailExpirationBientot(p.email, p.full_name || 'Étudiant', dateExp, sub.plan_type)
    sent3++
  }

  // Expirés hier → désactiver + email renouvellement
  const hier = new Date(now.getTime() - 86400000)
  const avanthier = new Date(now.getTime() - 2 * 86400000)
  const { data: expired } = await supabase
    .from('subscriptions')
    .select('*, profiles(email, full_name)')
    .eq('status', 'active')
    .gte('subscription_end', avanthier.toISOString())
    .lt('subscription_end', hier.toISOString())

  let sentExp = 0
  for (const sub of expired || []) {
    await supabase.from('subscriptions').update({ is_active:false, status:'expired' }).eq('id', sub.id)
    const p = sub.profiles as any
    if (!p?.email) continue
    await sendEmailRenouvellement(p.email, p.full_name || 'Étudiant')
    sentExp++
  }

  return NextResponse.json({ success:true, sent_soon:sent3, sent_expired:sentExp, at:now.toISOString() })
}

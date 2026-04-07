// src/app/api/payment/konnect/route.ts
// Intégration Konnect pour paiement par carte bancaire

import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/server'

const KONNECT_API = process.env.KONNECT_GATEWAY_URL || 'https://api.preprod.konnect.network/api/v2'
const KONNECT_API_KEY = process.env.KONNECT_API_KEY || ''
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

const PLAN_AMOUNTS: Record<string, number> = {
  mensuel: 8000,        // 80 DT en millimes
  annuel: 75000,        // 750 DT en millimes
  mensuel_sprint: 20000, // 200 DT en millimes
  annuel_sprint: 95000,  // 950 DT en millimes
}

// Créer un lien de paiement Konnect
export async function POST(request: NextRequest) {
  const supabase = createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })
  }

  const { plan, sprint } = await request.json()
  const planKey = `${plan}${sprint ? '_sprint' : ''}`
  const amount = PLAN_AMOUNTS[planKey]

  if (!amount) {
    return NextResponse.json({ error: 'Plan invalide' }, { status: 400 })
  }

  const planLabel = plan === 'mensuel' ? 'Mensuel' : 'Annuel'
  const sprintLabel = sprint ? ' + Sprint Bac' : ''

  try {
    // Créer la demande de paiement Konnect
    const konnectResponse = await fetch(`${KONNECT_API}/payments/init-payment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': KONNECT_API_KEY,
      },
      body: JSON.stringify({
        receiverWalletId: process.env.KONNECT_WALLET_ID,
        token: 'TND',
        amount,
        type: 'immediate',
        description: `MathBac.AI - Abonnement ${planLabel}${sprintLabel}`,
        acceptedPaymentMethods: ['wallet', 'bank_card', 'e-DINAR', 'flouci'],
        lifespan: 10, // 10 minutes
        checkoutForm: true,
        addPaymentFeesToAmount: false,
        firstName: user.user_metadata?.full_name?.split(' ')[0] || '',
        lastName: user.user_metadata?.full_name?.split(' ').slice(1).join(' ') || '',
        email: user.email,
        orderId: `BACAI-${user.id.slice(0, 8)}-${Date.now()}`,
        webhook: `${APP_URL}/api/payment/konnect/webhook`,
        silentWebhook: true,
        successUrl: `${APP_URL}/activation/success?method=konnect`,
        failUrl: `${APP_URL}/activation/fail`,
        theme: 'dark',
      }),
    })

    if (!konnectResponse.ok) {
      const err = await konnectResponse.json()
      throw new Error(err.message || 'Konnect error')
    }

    const konnectData = await konnectResponse.json()

    // Créer une demande d'abonnement en attente
    const adminClient = createAdminClient()
    await adminClient.from('subscriptions').insert({
      user_id: user.id,
      plan_type: sprint ? 'sprint_bac' : plan,
      status: 'pending',
      price_paid: amount / 1000,
      payment_method: 'konnect',
      payment_reference: konnectData.paymentRef,
    })

    return NextResponse.json({
      payUrl: konnectData.payUrl,
      paymentRef: konnectData.paymentRef,
    })

  } catch (error: any) {
    console.error('Konnect error:', error)
    return NextResponse.json(
      { error: error.message || 'Erreur de paiement' },
      { status: 500 }
    )
  }
}

// Webhook Konnect (réception confirmation paiement)
export async function PUT(request: NextRequest) {
  // Vérifier signature webhook
  const signature = request.headers.get('x-konnect-signature')
  // TODO: vérifier signature HMAC si Konnect le supporte

  const body = await request.json()
  const { paymentRef, payment } = body

  if (payment?.status !== 'paid') {
    return NextResponse.json({ received: true })
  }

  try {
    const adminClient = createAdminClient()

    // Trouver la demande correspondante
    const { data: sub } = await adminClient
      .from('subscriptions')
      .select('*')
      .eq('payment_reference', paymentRef)
      .single()

    if (!sub) {
      return NextResponse.json({ error: 'Abonnement non trouvé' }, { status: 404 })
    }

    // Activer l'abonnement
    const days = sub.plan_type === 'annuel' || sub.plan_type === 'annuel_sprint' ? 365 : 30
    const now = new Date()
    const end = new Date(now.getTime() + days * 24 * 60 * 60 * 1000)

    await adminClient
      .from('subscriptions')
      .update({
        status: 'active',
        is_active: true,
        subscription_start: now.toISOString(),
        subscription_end: end.toISOString(),
        activated_at: now.toISOString(),
        notes: `Paiement Konnect automatique - ${paymentRef}`,
      })
      .eq('id', sub.id)

    return NextResponse.json({ success: true })

  } catch (error: any) {
    console.error('Webhook error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// src/app/api/stripe/webhook/route.ts
// Webhook Stripe — active automatiquement l'abonnement dans Supabase
// après paiement confirmé

import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'

// ── Clients ───────────────────────────────────────────────────────
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
})

// Supabase avec clé SERVICE_ROLE (pas la clé publique)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
)

// ── Map priceId → plan_type ───────────────────────────────────────
const PRICE_TO_PLAN: Record<string, string> = {
  // Production France
  'price_1TJSBJCwS8UwOtxy1Byt0mZx': 'mensuel',
  'price_1TJSCMCwS8UwOtxyvocQR82P': 'sprint',
  'price_1TJSD9CwS8UwOtxyqSxqxmna': 'annuel',
  // Sandbox test
  'price_1TLNKLERX5ozBo4IelzRW5rG': 'mensuel',
}

// ── Handler principal ─────────────────────────────────────────────
export async function POST(req: NextRequest) {
  const body      = await req.text()
  const signature = req.headers.get('stripe-signature')!

  // Vérifier la signature Stripe
  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    )
  } catch (err: any) {
    console.error('Webhook signature invalide:', err.message)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  console.log(`Webhook reçu: ${event.type}`)

  try {
    switch (event.type) {

      // ── Paiement réussi (abonnement) ──────────────────────────
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        await handleCheckoutCompleted(session)
        break
      }

      // ── Renouvellement abonnement ──────────────────────────────
      case 'invoice.paid': {
        const invoice = event.data.object as Stripe.Invoice
        await handleInvoicePaid(invoice)
        break
      }

      // ── Echec paiement ─────────────────────────────────────────
      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice
        await handlePaymentFailed(invoice)
        break
      }

      // ── Abonnement annulé ──────────────────────────────────────
      case 'customer.subscription.deleted': {
        const sub = event.data.object as Stripe.Subscription
        await handleSubscriptionCanceled(sub)
        break
      }

      default:
        console.log(`Event ignoré: ${event.type}`)
    }
  } catch (err: any) {
    console.error('Webhook handler error:', err.message)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }

  return NextResponse.json({ received: true })
}

// ── Checkout complété → activer abonnement ────────────────────────
async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const customerEmail = session.customer_details?.email
  const customerId    = session.customer as string
  const subscriptionId = session.subscription as string

  if (!customerEmail) {
    console.error('Pas d\'email dans la session')
    return
  }

  // Récupérer les détails de l'abonnement Stripe
  const stripeSub = subscriptionId
    ? await stripe.subscriptions.retrieve(subscriptionId)
    : null

  const priceId  = stripeSub?.items.data[0]?.price.id || ''
  const planType = PRICE_TO_PLAN[priceId] || 'mensuel'

  // Calculer la date de fin
  const endDate = new Date()
  if (planType === 'annuel') endDate.setFullYear(endDate.getFullYear() + 1)
  else endDate.setMonth(endDate.getMonth() + 1)

  // Trouver l'utilisateur dans Supabase par email
  const { data: profile } = await supabase
    .from('profiles')
    .select('id')
    .eq('email', customerEmail.toLowerCase())
    .single()

  if (!profile) {
    console.log(`User non trouvé pour ${customerEmail} — création entrée sans user_id`)
  }

  // Insérer dans subscriptions
  const { error: subErr } = await supabase
    .from('subscriptions')
    .insert({
      user_id:             profile?.id || null,
      plan_type:           planType,
      status:              'active',
      price_paid:          (session.amount_total || 0) / 100,
      payment_method:      'stripe',
      payment_reference:   session.id,
      stripe_customer_id:  customerId,
      stripe_subscription_id: subscriptionId || null,
      stripe_price_id:     priceId,
      starts_at:           new Date().toISOString(),
      ends_at:             endDate.toISOString(),
    })

  if (subErr) console.error('Erreur insert subscription:', subErr)

  // Mettre à jour le profil utilisateur
  if (profile?.id) {
    const { error: profErr } = await supabase
      .from('profiles')
      .update({
        plan_type:        planType,
        is_active:        true,
        subscription_end: endDate.toISOString(),
        stripe_customer_id: customerId,
      })
      .eq('id', profile.id)

    if (profErr) console.error('Erreur update profile:', profErr)
    else console.log(`✅ Abonnement ${planType} activé pour ${customerEmail}`)
  }

  // Notification email admin
  await notifyAdmin({
    type:  'nouveau_paiement',
    email: customerEmail,
    plan:  planType,
    amount: `${(session.amount_total || 0) / 100} €`,
  })
}

// ── Renouvellement → prolonger abonnement ─────────────────────────
async function handleInvoicePaid(invoice: Stripe.Invoice) {
  if (invoice.billing_reason === 'subscription_create') return // géré par checkout

  const customerId = invoice.customer as string
  const priceId    = invoice.lines.data[0]?.price?.id || ''
  const planType   = PRICE_TO_PLAN[priceId] || 'mensuel'

  const endDate = new Date()
  endDate.setMonth(endDate.getMonth() + 1)

  // Trouver le profil via stripe_customer_id
  const { data: profile } = await supabase
    .from('profiles')
    .select('id, email')
    .eq('stripe_customer_id', customerId)
    .single()

  if (profile) {
    await supabase
      .from('profiles')
      .update({ is_active: true, subscription_end: endDate.toISOString() })
      .eq('id', profile.id)

    console.log(`✅ Renouvellement ${planType} pour ${profile.email}`)
  }
}

// ── Echec paiement → désactiver ───────────────────────────────────
async function handlePaymentFailed(invoice: Stripe.Invoice) {
  const customerId = invoice.customer as string

  const { data: profile } = await supabase
    .from('profiles')
    .select('id, email')
    .eq('stripe_customer_id', customerId)
    .single()

  if (profile) {
    await supabase
      .from('profiles')
      .update({ is_active: false })
      .eq('id', profile.id)

    console.log(`❌ Paiement échoué pour ${profile.email}`)
  }
}

// ── Annulation abonnement ─────────────────────────────────────────
async function handleSubscriptionCanceled(sub: Stripe.Subscription) {
  const customerId = sub.customer as string

  const { data: profile } = await supabase
    .from('profiles')
    .select('id, email')
    .eq('stripe_customer_id', customerId)
    .single()

  if (profile) {
    await supabase
      .from('profiles')
      .update({ is_active: false, plan_type: null })
      .eq('id', profile.id)

    await supabase
      .from('subscriptions')
      .update({ status: 'cancelled' })
      .eq('stripe_customer_id', customerId)
      .eq('status', 'active')

    console.log(`🚫 Abonnement annulé pour ${profile.email}`)
  }
}

// ── Notification admin ────────────────────────────────────────────
async function notifyAdmin({ type, email, plan, amount }: {
  type: string; email: string; plan: string; amount: string
}) {
  const RESEND_KEY = process.env.RESEND_API_KEY
  if (!RESEND_KEY) return

  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${RESEND_KEY}`,
    },
    body: JSON.stringify({
      from: 'MathBac.AI <noreply@mathsbac.com>',
      to:   ['bensghaiermejdi70@gmail.com'],
      subject: `💰 Stripe — Nouveau paiement ${plan} · ${amount}`,
      html: `
        <h2>💰 Paiement Stripe confirmé</h2>
        <p><strong>Email :</strong> ${email}</p>
        <p><strong>Plan :</strong> ${plan}</p>
        <p><strong>Montant :</strong> ${amount}</p>
        <p><strong>Type :</strong> ${type}</p>
        <hr/>
        <p>L'abonnement a été activé automatiquement dans Supabase.</p>
      `,
    }),
  }).catch(console.error)
}
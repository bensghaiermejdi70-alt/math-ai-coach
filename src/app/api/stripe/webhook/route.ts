// src/app/api/stripe/webhook/route.ts
// Version finale — compatible API Stripe 2025-11-17

import Stripe from "stripe"
import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

// ── Map priceId → plan_type ───────────────────────────────────────
const PRICE_TO_PLAN: Record<string, string> = {
  // Production France
  "price_1TJSBJCwS8UwOtxy1Byt0mZx": "mensuel",
  "price_1TJSCMCwS8UwOtxyvocQR82P": "sprint",
  "price_1TJSD9CwS8UwOtxyqSxqxmna": "annuel",
  // Sandbox test
  "price_1TLNKLERX5ozBo4IelzRW5rG": "mensuel",
}


// ── Notification email client + admin via Resend ─────────────────
async function sendConfirmationEmails(email: string, planType: string, amount: number) {
  const RESEND_KEY = process.env.RESEND_API_KEY
  if (!RESEND_KEY) return

  const planLabels: Record<string,string> = {
    mensuel: 'MathBac Mensuel — 15h/semaine',
    sprint:  'Sprint Bac — 30h/semaine · Bac Blanc inclus',
    annuel:  'MathBac Annuel — tout inclus',
  }

  // Email au client
  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${RESEND_KEY}` },
    body: JSON.stringify({
      from: 'MathBac.AI <noreply@mathsbac.com>',
      to:   [email],
      subject: '✅ Votre abonnement MathBac.AI est activé !',
      html: `
        <div style="font-family:system-ui;max-width:480px;margin:0 auto;padding:24px;background:#0a0a1a;color:white;border-radius:12px">
          <h2 style="color:#4f6ef7;margin-bottom:8px">✅ Abonnement activé !</h2>
          <p>Bonjour,</p>
          <p>Votre abonnement <strong>${planLabels[planType] || planType}</strong> est maintenant actif.</p>
          <p style="font-size:20px;color:#10b981;font-weight:bold">${amount} €</p>
          <a href="https://app.mathsbac.com" style="display:inline-block;background:#4f6ef7;color:white;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:bold;margin:16px 0">
            → Accéder à MathBac.AI
          </a>
          <p style="color:#666;font-size:12px;margin-top:24px">
            Pour toute question : WhatsApp 99 268 970<br/>
            app.mathsbac.com
          </p>
        </div>
      `,
    }),
  }).catch(e => console.error('Email client error:', e))

  // Email à l'admin
  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${RESEND_KEY}` },
    body: JSON.stringify({
      from: 'MathBac.AI <noreply@mathsbac.com>',
      to:   ['bensghaiermejdi70@gmail.com'],
      subject: `💰 Nouveau paiement Stripe — ${planType} · ${amount}€`,
      html: `
        <h2>💰 Paiement confirmé</h2>
        <p><strong>Email :</strong> ${email}</p>
        <p><strong>Plan :</strong> ${planLabels[planType] || planType}</p>
        <p><strong>Montant :</strong> ${amount} €</p>
        <p>L'abonnement a été activé automatiquement.</p>
        <a href="https://app.mathsbac.com/admin/payments" style="background:#4f6ef7;color:white;padding:10px 20px;border-radius:8px;text-decoration:none">
          Panel admin →
        </a>
      `,
    }),
  }).catch(e => console.error('Email admin error:', e))
}

export async function POST(req: Request) {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    const sig  = req.headers.get("stripe-signature")!
    const body = await req.text()

    const event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    )

    console.log(`Webhook: ${event.type}`)

    // ── checkout.session.completed ────────────────────────────────
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session

      // API 2025 : email dans customer_details
      const email =
        session.customer_details?.email ||
        (session as any).customer_email ||
        (session as any).metadata?.email

      if (!email) {
        console.error("Pas d'email dans la session checkout")
        return NextResponse.json({ error: "No email" }, { status: 400 })
      }

      if (email === process.env.ADMIN_EMAIL) {
        return NextResponse.json({ received: true })
      }

      const customerId     = session.customer as string
      const subscriptionId = session.subscription as string

      // Récupérer le plan depuis l'abonnement Stripe
      let planType = "mensuel"
      let priceId  = ""
      if (subscriptionId) {
        try {
          const stripeSub = await stripe.subscriptions.retrieve(subscriptionId)
          priceId  = stripeSub.items.data[0]?.price?.id || ""
          planType = PRICE_TO_PLAN[priceId] || "mensuel"
        } catch (e) {
          console.error("Erreur retrieve subscription:", e)
        }
      }

      // Date de fin
      const endDate = new Date()
      if (planType === "annuel") endDate.setFullYear(endDate.getFullYear() + 1)
      else endDate.setMonth(endDate.getMonth() + 1)

      // Trouver le profil Supabase par email
      const { data: profile } = await supabase
        .from("profiles")
        .select("id")
        .eq("email", email.toLowerCase())
        .single()

      // Mettre à jour profiles
      if (profile?.id) {
        const { error: profErr } = await supabase
          .from("profiles")
          .update({
            is_active:          true,
            plan_type:          planType,
            subscription_end:   endDate.toISOString(),
            stripe_customer_id: customerId,
          })
          .eq("id", profile.id)

        if (profErr) console.error("Erreur update profiles:", profErr)
        else console.log(`✅ Profile activé: ${email} → ${planType}`)
      } else {
        console.log(`⚠️ Profil non trouvé pour ${email} — abonnement enregistré sans user_id`)
      }

      // Insérer dans subscriptions
      const { error: subErr } = await supabase
        .from("subscriptions")
        .insert({
          user_id:                profile?.id || null,
          plan_type:              planType,
          status:                 "active",
          price_paid:             (session.amount_total || 1500) / 100,
          payment_method:         "stripe",
          payment_reference:      session.id,
          stripe_customer_id:     customerId,
          stripe_subscription_id: subscriptionId || null,
          stripe_price_id:        priceId,
          starts_at:              new Date().toISOString(),
          ends_at:                endDate.toISOString(),
        })

      if (subErr) console.error("Erreur insert subscriptions:", subErr)

      // Envoyer emails de confirmation
      await sendConfirmationEmails(email, planType, (session.amount_total || 1500) / 100)
    }

    // ── invoice.payment_succeeded (nouveau nom API 2025) ──────────
    // ── invoice.paid (ancien nom) ─────────────────────────────────
    if (
      event.type === "invoice.payment_succeeded" ||
      event.type === "invoice.paid"
    ) {
      const invoice = event.data.object as any

      // Ne pas traiter la première facture (gérée par checkout.session.completed)
      if (invoice.billing_reason === "subscription_create") {
        return NextResponse.json({ received: true })
      }

      const customerId = invoice.customer as string
      const endDate    = new Date()
      endDate.setMonth(endDate.getMonth() + 1)

      const { error } = await supabase
        .from("profiles")
        .update({ is_active: true, subscription_end: endDate.toISOString() })
        .eq("stripe_customer_id", customerId)

      if (!error) console.log(`🔄 Renouvellement pour ${customerId}`)
    }

    // ── invoice.payment_failed ────────────────────────────────────
    if (event.type === "invoice.payment_failed") {
      const invoice    = event.data.object as Stripe.Invoice
      const customerId = invoice.customer as string

      await supabase
        .from("profiles")
        .update({ is_active: false })
        .eq("stripe_customer_id", customerId)

      console.log(`❌ Paiement échoué: ${customerId}`)
    }

    // ── customer.subscription.deleted ────────────────────────────
    if (event.type === "customer.subscription.deleted") {
      const sub        = event.data.object as Stripe.Subscription
      const customerId = sub.customer as string

      await supabase
        .from("profiles")
        .update({ is_active: false, plan_type: null })
        .eq("stripe_customer_id", customerId)

      await supabase
        .from("subscriptions")
        .update({ status: "cancelled" })
        .eq("stripe_customer_id", customerId)
        .eq("status", "active")

      console.log(`🚫 Annulation: ${customerId}`)
    }

    return NextResponse.json({ received: true })

  } catch (err: any) {
    console.error("Webhook error:", err.message)
    return NextResponse.json({ error: "Webhook error" }, { status: 400 })
  }
}
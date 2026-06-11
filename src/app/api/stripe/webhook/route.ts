// src/app/api/stripe/webhook/route.ts
// Version corrigée — fix triple paiement sur abonnement annulé
// Corrections :
//   1. Vérifier cancel_at_period_end AVANT de traiter invoice.payment_succeeded
//   2. Vérifier status cancelled dans Supabase avant de prolonger
//   3. Déduplication invoice par invoice.id (pas seulement session.id)
//   4. Ne pas traiter invoice si subscription Stripe est cancelled/incomplete

import Stripe from "stripe"
import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import { extractMatiere } from "@/lib/types/monetisation"

// ── Map priceId → plan_type ───────────────────────────────────────
const PRICE_TO_PLAN: Record<string, string> = {
  // ── Mathématiques France (production) ─────────────────────────────
  "price_1TJSBJCwS8UwOtxy1Byt0mZx": "mensuel_mathematiques",
  "price_1TJSCMCwS8UwOtxyvocQR82P": "sprint_bac_mathematiques",
  "price_1TJSD9CwS8UwOtxyqSxqxmna": "annuel_mathematiques",
  // ── Physique-Chimie France (production) ───────────────────────────
  "price_1TSIX6CwS8UwOtxyutjyxEK3": "mensuel_physique",
  "price_1TSIldCwS8UwOtxyDKYX2AbD": "sprint_bac_physique",
  "price_1TSIosCwS8UwOtxyxXOQZr6l": "annuel_physique",
  // ── SVT France (production) ───────────────────────────────────────
  "price_1TcsROCwS8UwOtxyf8QZUnHm": "mensuel_svt",
  "price_1TcsV2CwS8UwOtxybMN7xgAL": "sprint_bac_svt",
  "price_1TcsXbCwS8UwOtxyYnju6CRi": "annuel_svt",
  // ── Anglais France (production) ───────────────────────────────────
  "price_1TXlslCwS8UwOtxyBCXK1ntw": "mensuel_anglais",
  "price_1TXly1CwS8UwOtxy2GPUFyQP": "sprint_bac_anglais",
  "price_1TXm0rCwS8UwOtxyvSBkE7Vd": "annuel_anglais",
  // ── Informatique France (production) ─────────────────────────────
  "price_1TaUuVCwS8UwOtxyTxKreHFc": "mensuel_informatique",
  "price_1TaUx5CwS8UwOtxyEQPrsBXR": "sprint_bac_informatique",
  "price_1TaV0GCwS8UwOtxy2XO459vo": "annuel_informatique",
  // ── Français · Philosophie France (production) ──────────────────
  "price_1TdyBiCwS8UwOtxylDeBXcrH": "mensuel_francais",
  "price_1TdyEuCwS8UwOtxyZS86m22l": "sprint_bac_francais",
  "price_1TdyHeCwS8UwOtxyevGTRFCs": "annuel_francais",
  // ── Économie & Gestion France (production) ───────────────────────
  "price_1Tgr8tCwS8UwOtxya4xZcWFR": "mensuel_eco-gestion",
  "price_1TgrBPCwS8UwOtxyiuM00lEG": "sprint_bac_eco-gestion",
  "price_1TgrE6CwS8UwOtxy5isKiv38": "annuel_eco-gestion",
  // ── Sandbox / Test ────────────────────────────────────────────────
  "price_1TLNKLERX5ozBo4IelzRW5rG": "mensuel_mathematiques",
}

// ── Notification email client + admin via Resend ─────────────────
async function sendConfirmationEmails(email: string, planType: string, amount: number) {
  const RESEND_KEY = process.env.RESEND_API_KEY
  if (!RESEND_KEY) return

  const MATIERE_ICONS: Record<string, string> = {
    mathematiques: "📐", physique: "⚗️", svt: "🌱", anglais: "🇬🇧", informatique: "💻", francais: "📚", "eco-gestion": "📊",
  }
  const planLabels: Record<string, string> = {
    // Mathématiques
    "mensuel_mathematiques":       "📐 Maths Mensuel — 19€/mois",
    "sprint_bac_mathematiques":    "📐 Sprint Bac Maths — 29€/mois",
    "annuel_mathematiques":        "📐 Maths Annuel — 199€/an",
    // Physique-Chimie
    "mensuel_physique":            "⚗️ Physique Mensuel — 19€/mois",
    "sprint_bac_physique":         "⚗️ Sprint Bac Physique — 29€/mois",
    "annuel_physique":             "⚗️ Physique Annuel — 199€/an",
    // SVT
    "mensuel_svt":                 "🌱 SVT Mensuel — 19€/mois",
    "sprint_bac_svt":              "🌱 Sprint Bac SVT — 29€/mois",
    "annuel_svt":                  "🌱 SVT Annuel — 199€/an",
    // Anglais
    "mensuel_anglais":             "🇬🇧 Anglais Mensuel — 19€/mois",
    "sprint_bac_anglais":          "🇬🇧 Sprint Bac Anglais — 29€/mois",
    "annuel_anglais":              "🇬🇧 Anglais Annuel — 199€/an",
    // Informatique
    "mensuel_informatique":        "💻 Informatique Mensuel — 19€/mois",
    "sprint_bac_informatique":     "💻 Sprint Bac Informatique — 29€/mois",
    "annuel_informatique":         "💻 Informatique Annuel — 199€/an",
    // Français · Philosophie
    "mensuel_francais":        "📚 Français Mensuel — 19€/mois",
    "sprint_bac_francais":     "📚 Sprint Bac Français — 29€/mois",
    "annuel_francais":         "📚 Français Annuel — 199€/an",
    // Économie & Gestion
    "mensuel_eco-gestion":     "📊 Éco-Gestion Mensuel — 19€/mois",
    "sprint_bac_eco-gestion":  "📊 Sprint Bac Éco-Gestion — 29€/mois",
    "annuel_eco-gestion":      "📊 Éco-Gestion Annuel — 199€/an",
    // Legacy (sans matière) — compatibilité anciens abonnements
    mensuel:    "📐 MathBac Mensuel — 19€/mois",
    sprint:     "📐 Sprint Bac — 29€/mois",
    sprint_bac: "📐 Sprint Bac — 29€/mois",
    annuel:     "📐 MathBac Annuel — 199€/an",
  }

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${RESEND_KEY}`,
    },
    body: JSON.stringify({
      from: "MathBac.AI <noreply@mathsbac.com>",
      to: [email],
      subject: "✅ Votre abonnement MathBac.AI est activé !",
      html: `
        <div style="font-family:system-ui;max-width:480px;margin:0 auto;padding:24px;background:#0a0a1a;color:white;border-radius:12px">
          <h2 style="color:#4f6ef7;margin-bottom:8px">✅ Abonnement activé !</h2>
          <p>Bonjour,</p>
          <p>Votre abonnement <strong>${planLabels[planType] || planType}</strong> est maintenant actif.</p>
          <div style="background:#1a1a2e;border-radius:8px;padding:16px;margin:16px 0;border:1px solid #4f6ef7">
            <p style="margin:0 0 8px;color:#aaa;font-size:14px">Récapitulatif :</p>
            <p style="margin:0;color:#4f6ef7;font-weight:bold">${planLabels[planType] || planType}</p>
            <p style="margin:4px 0 0;color:#10b981;font-size:20px;font-weight:bold">${amount} €/mois</p>
          </div>
          <a href="https://app.mathsbac.com/profile"
            style="display:inline-block;background:#4f6ef7;color:white;padding:14px 28px;border-radius:8px;text-decoration:none;font-weight:bold;margin:8px 0;font-size:16px">
            ✅ Voir mon abonnement actif →
          </a>
          <p style="color:#aaa;font-size:13px;margin-top:8px">
            Connectez-vous avec l'email : <strong style="color:white">${email}</strong>
          </p>
          <p style="color:#666;font-size:12px;margin-top:24px">
            Pour toute question : WhatsApp 99 268 970<br/>app.mathsbac.com
          </p>
        </div>
      `,
    }),
  }).catch((e) => console.error("Email client error:", e))

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${RESEND_KEY}`,
    },
    body: JSON.stringify({
      from: "MathBac.AI <noreply@mathsbac.com>",
      to: ["bensghaiermejdi70@gmail.com"],
      subject: `💰 Nouveau paiement Stripe — ${planType} · ${amount}€`,
      html: `
        <h2>💰 Paiement confirmé</h2>
        <p><strong>Email :</strong> ${email}</p>
        <p><strong>Plan :</strong> ${planLabels[planType] || planType}</p>
        <p><strong>Montant :</strong> ${amount} €</p>
        <p>L'abonnement a été activé automatiquement.</p>
        <a href="https://app.mathsbac.com/admin/payments"
          style="background:#4f6ef7;color:white;padding:10px 20px;border-radius:8px;text-decoration:none">
          Panel admin →
        </a>
      `,
    }),
  }).catch((e) => console.error("Email admin error:", e))
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
      process.env.STRIPE_WEBHOOK_SECRET!.trim()
    )

    console.log(`Webhook reçu: ${event.type}`)

    // ══════════════════════════════════════════════════════════════
    // checkout.session.completed — Premier paiement
    // ══════════════════════════════════════════════════════════════
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session

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

      // Trouver le profil Supabase
      const { data: profile } = await supabase
        .from("profiles")
        .select("id")
        .eq("email", email.toLowerCase())
        .single()

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
        const { data: { users } } = await supabase.auth.admin.listUsers()
        const authUser = users?.find(
          (u) => u.email?.toLowerCase() === email.toLowerCase()
        )
        if (authUser) {
          await supabase.from("profiles").upsert(
            {
              id:                 authUser.id,
              email:              email.toLowerCase(),
              is_active:          true,
              plan_type:          planType,
              subscription_end:   endDate.toISOString(),
              stripe_customer_id: customerId,
            },
            { onConflict: "id" }
          )
          console.log(`✅ Profil créé/mis à jour via auth.users: ${email}`)
        }
      }

      // Déduplication : vérifier si cet invoice/session déjà traité
      const { data: existingSub } = await supabase
        .from("subscriptions")
        .select("id")
        .eq("payment_reference", session.id)
        .single()

      if (existingSub) {
        console.log(`⚠️ Session ${session.id} déjà traitée — skip`)
        return NextResponse.json({ received: true })
      }

      // Vérifier doublon actif par matière
      if (profile?.id) {
        const matiere = extractMatiere(planType)
        const now     = new Date().toISOString()
        const { data: existingByMatiere } = await supabase
          .from("subscriptions")
          .select("id, plan_type, ends_at, status")
          .eq("user_id", profile.id)
          .eq("status", "active")

        const duplicateActive = existingByMatiere?.some((sub) => {
          const subMatiere = extractMatiere(sub.plan_type)
          const isExpired  = !sub.ends_at || new Date(sub.ends_at) <= new Date(now)
          return subMatiere === matiere && !isExpired
        })

        if (duplicateActive) {
          console.log(`⚠️ Abonnement actif déjà existant pour matière ${matiere} — skip`)
          return NextResponse.json({ received: true })
        }
      }

      // Insérer dans subscriptions
      const { error: subErr } = await supabase.from("subscriptions").insert({
        user_id:                profile?.id || null,
        plan_type:              planType,
        status:                 "active",
        is_active:              true,
        price_paid:             (session.amount_total || 1500) / 100,
        payment_method:         "stripe",
        payment_reference:      session.id,
        stripe_customer_id:     customerId,
        stripe_subscription_id: subscriptionId || null,
        stripe_price_id:        priceId,
        starts_at:              new Date().toISOString(),
        ends_at:                endDate.toISOString(),
        subscription_start:     new Date().toISOString(),
        subscription_end:       endDate.toISOString(),
      })

      if (subErr) console.error("Erreur insert subscriptions:", subErr)

      await sendConfirmationEmails(
        email,
        planType,
        (session.amount_total || 1500) / 100
      )
    }

    // ══════════════════════════════════════════════════════════════
    // invoice.payment_succeeded / invoice.paid — Renouvellements
    // FIX : vérifier cancel_at_period_end + status Supabase
    // ══════════════════════════════════════════════════════════════
    if (
      event.type === "invoice.payment_succeeded" ||
      event.type === "invoice.paid"
    ) {
      const invoice = event.data.object as any

      // FIX 1 : ne pas traiter la première facture (gérée par checkout.session.completed)
      if (invoice.billing_reason === "subscription_create") {
        console.log("⏭️ Premier paiement — géré par checkout.session.completed")
        return NextResponse.json({ received: true })
      }

      const customerId     = invoice.customer as string
      const subscriptionId = invoice.subscription as string

      // FIX 2 : VÉRIFIER LE STATUT DE L'ABONNEMENT STRIPE ────────
      // Si cancel_at_period_end=true → l'abonnement est en cours d'annulation
      // Si status !== 'active' → ne pas renouveler
      if (subscriptionId) {
        try {
          const stripeSub = await stripe.subscriptions.retrieve(subscriptionId)

          // BLOQUÉ si cancel_at_period_end = true
          if (stripeSub.cancel_at_period_end) {
            console.log(
              `🚫 Abonnement ${subscriptionId} en cours d'annulation (cancel_at_period_end=true) — renouvellement BLOQUÉ`
            )
            return NextResponse.json({ received: true })
          }

          // BLOQUÉ si statut pas 'active'
          if (stripeSub.status !== "active") {
            console.log(
              `🚫 Abonnement ${subscriptionId} non actif (status=${stripeSub.status}) — renouvellement BLOQUÉ`
            )
            return NextResponse.json({ received: true })
          }
        } catch (e) {
          console.error("Erreur vérification subscription Stripe:", e)
          // En cas d'erreur API Stripe, bloquer par sécurité
          return NextResponse.json({ received: true })
        }
      }

      // FIX 3 : VÉRIFIER LE STATUT SUPABASE ─────────────────────
      // Si l'abonnement est cancelled dans Supabase → ne pas renouveler
      const { data: supabaseSub } = await supabase
        .from("subscriptions")
        .select("id, status")
        .eq("stripe_customer_id", customerId)
        .eq("status", "active")
        .single()

      if (!supabaseSub) {
        console.log(
          `🚫 Aucun abonnement actif dans Supabase pour ${customerId} — renouvellement BLOQUÉ`
        )
        return NextResponse.json({ received: true })
      }

      // FIX 4 : DÉDUPLICATION PAR INVOICE ID ────────────────────
      // Evite de traiter le même invoice plusieurs fois (retry Stripe)
      const invoiceId = invoice.id as string
      const { data: existingInvoice } = await supabase
        .from("subscriptions")
        .select("id")
        .eq("payment_reference", invoiceId)
        .single()

      if (existingInvoice) {
        console.log(`⚠️ Invoice ${invoiceId} déjà traité — skip`)
        return NextResponse.json({ received: true })
      }

      // ✅ Tous les checks passés → renouveler
      const endDate = new Date()
      endDate.setMonth(endDate.getMonth() + 1)

      const { error } = await supabase
        .from("profiles")
        .update({
          is_active:        true,
          subscription_end: endDate.toISOString(),
        })
        .eq("stripe_customer_id", customerId)

      if (!error) {
        console.log(`🔄 Renouvellement validé pour ${customerId} → fin: ${endDate.toISOString()}`)

        // Marquer l'invoice comme traitée dans subscriptions
        await supabase
          .from("subscriptions")
          .update({
            payment_reference: invoiceId,
            ends_at:           endDate.toISOString(),
            subscription_end:  endDate.toISOString(),
          })
          .eq("stripe_customer_id", customerId)
          .eq("status", "active")
      } else {
        console.error("Erreur renouvellement:", error)
      }
    }

    // ══════════════════════════════════════════════════════════════
    // invoice.payment_failed — Échec de paiement
    // ══════════════════════════════════════════════════════════════
    if (event.type === "invoice.payment_failed") {
      const invoice    = event.data.object as Stripe.Invoice
      const customerId = invoice.customer as string

      await supabase
        .from("profiles")
        .update({ is_active: false })
        .eq("stripe_customer_id", customerId)

      console.log(`❌ Paiement échoué: ${customerId}`)
    }

    // ══════════════════════════════════════════════════════════════
    // customer.subscription.deleted — Annulation finale
    // ══════════════════════════════════════════════════════════════
    if (event.type === "customer.subscription.deleted") {
      const sub        = event.data.object as Stripe.Subscription
      const customerId = sub.customer as string

      await supabase
        .from("profiles")
        .update({ is_active: false, plan_type: null })
        .eq("stripe_customer_id", customerId)

      await supabase
        .from("subscriptions")
        .update({ status: "cancelled", is_active: false })
        .eq("stripe_customer_id", customerId)
        .eq("status", "active")

      console.log(`🚫 Annulation définitive: ${customerId}`)
    }

    // ══════════════════════════════════════════════════════════════
    // customer.subscription.updated — Mise à jour (cancel_at_period_end)
    // FIX : détecter cancel_at_period_end=true et marquer en Supabase
    // ══════════════════════════════════════════════════════════════
    if (event.type === "customer.subscription.updated") {
      const sub        = event.data.object as Stripe.Subscription
      const customerId = sub.customer as string

      // Si l'utilisateur vient d'annuler (cancel_at_period_end devient true)
      if (sub.cancel_at_period_end) {
        const cancelAt = sub.cancel_at
          ? new Date(sub.cancel_at * 1000).toISOString()
          : null

        console.log(`⚠️ Abonnement ${sub.id} marqué cancel_at_period_end — fin: ${cancelAt}`)

        // Marquer dans Supabase comme "cancelling" (pas encore cancelled)
        await supabase
          .from("subscriptions")
          .update({
            status:    "cancelling",
            // Conserver ends_at jusqu'à la vraie fin de période
            ...(cancelAt ? { ends_at: cancelAt, subscription_end: cancelAt } : {}),
          })
          .eq("stripe_customer_id", customerId)
          .eq("status", "active")
      }
    }

    return NextResponse.json({ received: true })

  } catch (err: any) {
    console.error("Webhook error:", err.message)
    return NextResponse.json({ error: "Webhook error" }, { status: 400 })
  }
}
import Stripe from "stripe"
import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const ADMIN_EMAIL = process.env.ADMIN_EMAIL

// Statuts Stripe qui facturent encore (un abonnement dans un de ces etats genere des prelevements)
const BILLING_STATUSES = ["active", "trialing", "past_due", "unpaid"]

export async function POST(req: Request) {
  try {
    // CHECK ENV (important pour Render)
    if (!process.env.STRIPE_SECRET_KEY) {
      console.error("Missing STRIPE_SECRET_KEY")
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 })
    }
    if (!process.env.NEXT_PUBLIC_APP_URL) {
      console.error("Missing NEXT_PUBLIC_APP_URL")
      return NextResponse.json({ error: "Missing app URL" }, { status: 500 })
    }

    // INIT STRIPE (dans la fonction = safe build)
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

    const { email, priceId } = await req.json()

    // VALIDATION
    if (!email || !priceId) {
      return NextResponse.json({ error: "Missing email or priceId" }, { status: 400 })
    }

    // ADMIN BYPASS
    if (email === ADMIN_EMAIL) {
      return NextResponse.json({ url: "/app" })
    }

    const emailLc = String(email).toLowerCase().trim()

    // Supabase service-role (optionnel) — pour reutiliser le client deja lie au profil
    let supabase: ReturnType<typeof createClient> | null = null
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
      supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.SUPABASE_SERVICE_ROLE_KEY
      )
    }

    // ────────────────────────────────────────────────────────────────
    // FIX CRITIQUE — UN SEUL client Stripe par personne
    // Avant: `customer_email` => Stripe creait un NOUVEAU client a chaque
    // checkout => abonnements multiples => le portail n'en annule qu'un,
    // les autres continuent de facturer.
    // Ordre de resolution du client (du plus fiable au moins fiable) :
    //   1. stripe_customer_id deja enregistre dans le profil Supabase
    //   2. client Stripe existant trouve par email
    //   3. creation d'un nouveau client
    // ────────────────────────────────────────────────────────────────
    let customerId: string | null = null

    // 1) Client deja lie au profil
    if (supabase) {
      try {
        const { data: profile } = await supabase
          .from("profiles")
          .select("stripe_customer_id")
          .eq("email", emailLc)
          .single()

        const pid = (profile as any)?.stripe_customer_id as string | undefined
        if (pid) {
          const c = await stripe.customers.retrieve(pid)
          if (c && !(c as any).deleted) customerId = pid
        }
      } catch (e) {
        console.error("Lookup profil/customer (non bloquant):", (e as any)?.message)
      }
    }

    // Liste de tous les clients Stripe lies a cet email (pour fallback + anti-doublon)
    const byEmail = await stripe.customers.list({ email: emailLc, limit: 100 })

    // 2) Fallback : premier client trouve par email
    if (!customerId && byEmail.data.length > 0) {
      customerId = byEmail.data[0].id
    }

    // 3) Sinon : creer un nouveau client
    if (!customerId) {
      const created = await stripe.customers.create({ email: emailLc })
      customerId = created.id
    }

    // ────────────────────────────────────────────────────────────────
    // GARDE ANTI-DOUBLON — verifier sur TOUS les clients lies a cet email
    // (en prod il peut deja exister plusieurs fiches client en double).
    // Si un abonnement facturant existe deja pour ce price => on bloque.
    // ────────────────────────────────────────────────────────────────
    const customerIds = new Set<string>([customerId, ...byEmail.data.map((c) => c.id)])
    for (const cid of customerIds) {
      const subs = await stripe.subscriptions.list({ customer: cid, status: "all", limit: 100 })
      const dejaActif = subs.data.find(
        (s) =>
          BILLING_STATUSES.includes(s.status) &&
          !s.cancel_at_period_end &&
          s.items.data.some((it) => it.price?.id === priceId)
      )
      if (dejaActif) {
        console.log(
          `Doublon bloque: ${emailLc} a deja un abonnement actif (${dejaActif.id}) pour le price ${priceId}`
        )
        return NextResponse.json(
          {
            error:
              "Vous avez deja un abonnement actif pour cette offre. Gerez-le depuis votre espace abonnement.",
            alreadySubscribed: true,
          },
          { status: 409 }
        )
      }
    }

    // CREATE CHECKOUT SESSION (avec `customer`, plus jamais `customer_email`)
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      customer: customerId,
      line_items: [{ price: priceId, quantity: 1 }],
      metadata: { email: emailLc },
      subscription_data: { metadata: { email: emailLc } },
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/abonnement`,
    })

    if (!session.url) {
      return NextResponse.json({ error: "Stripe session creation failed" }, { status: 500 })
    }

    return NextResponse.json({ url: session.url })

  } catch (err: any) {
    console.error("Stripe error:", err)
    return NextResponse.json({ error: "Stripe checkout error" }, { status: 500 })
  }
}
import Stripe from "stripe"
import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
})

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // ⚠️ IMPORTANT
)

const ADMIN_EMAIL = process.env.ADMIN_EMAIL

export async function POST(req: Request) {
  const sig = req.headers.get("stripe-signature")!
  const body = await req.text()

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err: any) {
    return NextResponse.json(
      { error: "Invalid webhook signature" },
      { status: 400 }
    )
  }

  // 💰 PAYMENT SUCCESS
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session

    const email =
      session.metadata?.email || session.customer_email

    if (!email) {
      return NextResponse.json(
        { error: "No email found" },
        { status: 400 }
      )
    }

    // 🔥 ADMIN BYPASS
    if (email === ADMIN_EMAIL) {
      return NextResponse.json({ ok: true })
    }

    const subscriptionEnd = new Date()
    subscriptionEnd.setDate(subscriptionEnd.getDate() + 30)

    // 🔥 DB UPDATE REAL (IMPORTANT)
    const { error } = await supabase
      .from("users")
      .upsert({
        email,
        is_active: true,
        subscription_end: subscriptionEnd.toISOString(),
        stripe_customer_id: session.customer as string,
      })

    if (error) {
      console.error("DB ERROR:", error)
      return NextResponse.json(
        { error: "DB update failed" },
        { status: 500 }
      )
    }

    console.log("✅ USER ACTIVATED:", email)
  }

  return NextResponse.json({ received: true })
}
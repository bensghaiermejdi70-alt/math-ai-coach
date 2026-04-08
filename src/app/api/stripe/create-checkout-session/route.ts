import Stripe from "stripe"
import { NextResponse } from "next/server"

const ADMIN_EMAIL = process.env.ADMIN_EMAIL

export async function POST(req: Request) {
  try {
    // 🔐 CHECK ENV (IMPORTANT POUR RENDER)
    if (!process.env.STRIPE_SECRET_KEY) {
      console.error("❌ Missing STRIPE_SECRET_KEY")
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      )
    }

    if (!process.env.NEXT_PUBLIC_APP_URL) {
      console.error("❌ Missing NEXT_PUBLIC_APP_URL")
      return NextResponse.json(
        { error: "Missing app URL" },
        { status: 500 }
      )
    }

    // 🔥 INIT STRIPE (DANS LA FONCTION = SAFE BUILD)
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

    const { email, priceId } = await req.json()

    // 🔐 VALIDATION
    if (!email || !priceId) {
      return NextResponse.json(
        { error: "Missing email or priceId" },
        { status: 400 }
      )
    }

    // 🔥 ADMIN BYPASS
    if (email === ADMIN_EMAIL) {
      return NextResponse.json({ url: "/app" })
    }

    // 💳 CREATE CHECKOUT SESSION
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",

      payment_method_types: ["card"],

      customer_email: email,

      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],

      metadata: {
        email,
      },

      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/abonnement`,
    })

    if (!session.url) {
      return NextResponse.json(
        { error: "Stripe session creation failed" },
        { status: 500 }
      )
    }

    return NextResponse.json({ url: session.url })

  } catch (err: any) {
    console.error("❌ Stripe error:", err)

    return NextResponse.json(
      { error: "Stripe checkout error" },
      { status: 500 }
    )
  }
}
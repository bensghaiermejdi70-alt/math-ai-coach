// src/app/api/stripe/portal/route.ts
// Génère un lien vers le Stripe Customer Portal pour gérer l'abonnement

import Stripe from 'stripe'
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: NextRequest) {
  try {
    const { userId } = await req.json()
    if (!userId) return NextResponse.json({ error: 'userId requis' }, { status: 400 })

    // Récupérer le stripe_customer_id depuis Supabase
    const { data: profile } = await supabase
      .from('profiles')
      .select('stripe_customer_id, email')
      .eq('id', userId)
      .single()

    if (!profile?.stripe_customer_id) {
      return NextResponse.json({ error: 'Aucun abonnement Stripe trouvé' }, { status: 404 })
    }

    // Créer la session du portail Stripe
    const session = await stripe.billingPortal.sessions.create({
      customer:   profile.stripe_customer_id,
      return_url: 'https://app.mathsbac.com/abonnement-france',
    })

    return NextResponse.json({ url: session.url })

  } catch (err: any) {
    console.error('Portal error:', err.message)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
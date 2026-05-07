// src/app/api/activate/route.ts
// Route serveur pour insérer dans subscriptions sans RLS

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { extractMatiere } from '@/lib/types/monetisation'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      user_id, plan_type, status, price_paid,
      payment_method, payment_reference,
      payment_phone, payment_screenshot_url
    } = body

    if (!user_id || !plan_type) {
      return NextResponse.json(
        { error: 'user_id et plan_type requis' },
        { status: 400 }
      )
    }

    // Vérifier s'il existe déjà un abonnement actif pour la même matière
    const matiere = extractMatiere(plan_type)
    const now = new Date().toISOString()

    const { data: existingSubscriptions } = await supabase
      .from('subscriptions')
      .select('id, plan_type, ends_at, status')
      .eq('user_id', user_id)
      .eq('status', 'active')

    const duplicateActive = existingSubscriptions?.some(sub => {
      const subMatiere = extractMatiere(sub.plan_type)
      const isExpired = !sub.ends_at || new Date(sub.ends_at) <= new Date(now)
      return subMatiere === matiere && !isExpired
    })

    if (duplicateActive) {
      return NextResponse.json(
        { 
          error: `Un abonnement actif existe déjà pour la matière ${matiere}. Veuillez le renouveler ou le désactiver.`,
          code: 'DUPLICATE_ACTIVE_SUBSCRIPTION'
        },
        { status: 409 }
      )
    }

    const { error } = await supabase.from('subscriptions').insert({
      user_id,
      plan_type,
      status,
      price_paid,
      payment_method,
      payment_reference,
      payment_phone:         payment_phone || null,
      payment_screenshot_url: payment_screenshot_url || null,
    })

    if (error) {
      console.error('Insert error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ ok: true })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
// src/app/api/activate/route.ts
// Route serveur pour insérer dans subscriptions sans RLS

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

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

    const { error } = await supabase.from('subscriptions').insert({
      user_id:               user_id || null,
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
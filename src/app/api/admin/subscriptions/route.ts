// src/app/api/admin/subscriptions/route.ts
// Lecture des subscriptions avec service_role (contourne RLS)

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(req: NextRequest) {
  try {
    const { data: subs, error } = await supabase
      .from('subscriptions')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })

    // Enrichir avec les emails des profiles
    const enriched = await Promise.all((subs || []).map(async (s) => {
      if (s.user_id) {
        const { data: p } = await supabase
          .from('profiles')
          .select('email, full_name')
          .eq('id', s.user_id)
          .single()
        return { ...s, email: p?.email, full_name: p?.full_name }
      }
      return s
    }))

    return NextResponse.json({ data: enriched })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { id, status, user_id, plan_type, ends_at } = await req.json()

    // Mettre à jour subscription
    const { error } = await supabase
      .from('subscriptions')
      .update({ status, ends_at })
      .eq('id', id)

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })

    // Mettre à jour profile si user_id fourni
    if (user_id) {
      await supabase.from('profiles').update({
        is_active:        status === 'active',
        plan_type:        status === 'active' ? plan_type : null,
        subscription_end: status === 'active' ? ends_at : null,
      }).eq('id', user_id)
    }

    return NextResponse.json({ ok: true })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
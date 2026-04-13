// src/app/api/admin/subscriptions/route.ts

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// ── GET : lire toutes les subscriptions ──────────────────────────
export async function GET() {
  const { data: subs, error } = await supabase
    .from('subscriptions')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  const enriched = await Promise.all((subs || []).map(async (s) => {
    if (s.user_id) {
      const { data: p } = await supabase
        .from('profiles').select('email, full_name').eq('id', s.user_id).single()
      return { ...s, email: p?.email, full_name: p?.full_name }
    }
    return s
  }))

  return NextResponse.json({ data: enriched })
}

// ── PATCH : activer / désactiver ─────────────────────────────────
export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json()
    const { id, status, user_id, plan_type, ends_at, email_target, action } = body

    // ── Activation par email (panel admin manuel) ────────────────
    if (action === 'activate_by_email' && email_target) {
      // Trouver le user par email
      const { data: profile } = await supabase
        .from('profiles').select('id').eq('email', email_target).single()

      if (!profile?.id) {
        return NextResponse.json({ error: `Aucun compte trouvé pour ${email_target}` }, { status: 404 })
      }

      const endDate = new Date()
      if (plan_type === 'annuel') endDate.setFullYear(endDate.getFullYear() + 1)
      else endDate.setMonth(endDate.getMonth() + 1)

      // Insérer subscription active
      await supabase.from('subscriptions').insert({
        user_id:        profile.id,
        plan_type:      plan_type || 'mensuel',
        status:         'active',
        price_paid:     0,
        payment_method: 'especes',
        payment_reference: 'ADMIN_MANUAL',
        starts_at:      new Date().toISOString(),
        ends_at:        endDate.toISOString(),
      })

      // Mettre à jour le profil
      await supabase.from('profiles').update({
        is_active:        true,
        plan_type:        plan_type || 'mensuel',
        subscription_end: endDate.toISOString(),
      }).eq('id', profile.id)

      return NextResponse.json({ ok: true })
    }

    // ── Activation / désactivation par ID subscription ───────────
    if (!id) return NextResponse.json({ error: 'id requis' }, { status: 400 })

    const endDate = ends_at || (() => {
      const d = new Date()
      if (plan_type === 'annuel') d.setFullYear(d.getFullYear() + 1)
      else d.setMonth(d.getMonth() + 1)
      return d.toISOString()
    })()

    // Update subscription
    const { error: subErr } = await supabase
      .from('subscriptions')
      .update({
        status,
        ends_at: status === 'active' ? endDate : null,
      })
      .eq('id', id)

    if (subErr) return NextResponse.json({ error: subErr.message }, { status: 500 })

    // Si user_id non fourni, le chercher depuis la subscription
    let resolvedUserId = user_id
    if (!resolvedUserId) {
      const { data: sub } = await supabase
        .from('subscriptions').select('user_id, payment_reference').eq('id', id).single()
      resolvedUserId = sub?.user_id || null
      // Pour espèces : payment_reference = email
      if (!resolvedUserId && sub?.payment_reference?.includes('@')) {
        const { data: prof } = await supabase
          .from('profiles').select('id').eq('email', sub.payment_reference.toLowerCase()).single()
        resolvedUserId = prof?.id || null
        // Lier le user_id à la subscription
        if (resolvedUserId) {
          await supabase.from('subscriptions').update({ user_id: resolvedUserId }).eq('id', id)
        }
      }
    }

    // Update profile
    if (resolvedUserId) {
      await supabase.from('profiles').update({
        is_active:        status === 'active',
        plan_type:        status === 'active' ? (plan_type || null) : null,
        subscription_end: status === 'active' ? endDate : null,
      }).eq('id', resolvedUserId)
    }

    return NextResponse.json({ ok: true })

  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
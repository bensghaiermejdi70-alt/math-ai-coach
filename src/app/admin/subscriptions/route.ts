// src/app/api/admin/subscriptions/route.ts
// Lecture/écriture des subscriptions avec service_role (contourne RLS)
// 🔒 SÉCURITÉ : chaque requête est désormais vérifiée — seul un admin peut appeler ces routes.

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import { ADMIN_EMAIL } from '@/lib/types/monetisation'

// Client privilégié (service_role) — contourne RLS pour les opérations admin
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// ── 🔒 Garde-fou : vérifie côté serveur que l'appelant est bien admin ──
// Lit l'identité réelle depuis le cookie de session Supabase (pas de confiance au client).
async function requireAdmin(): Promise<boolean> {
  try {
    const supabase = createServerSupabaseClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return false
    if (user.email === ADMIN_EMAIL) return true
    // Sinon, vérifier le rôle en base (cohérent avec isAdmin de l'app)
    const { data: prof } = await supabaseAdmin
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()
    return prof?.role === 'admin'
  } catch {
    return false
  }
}

const FORBIDDEN = () =>
  NextResponse.json({ error: 'Accès refusé — réservé à l’administrateur.' }, { status: 403 })

export async function GET(req: NextRequest) {
  if (!(await requireAdmin())) return FORBIDDEN()
  try {
    const { data: subs, error } = await supabaseAdmin
      .from('subscriptions')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })

    // Enrichir avec les emails des profiles
    const enriched = await Promise.all((subs || []).map(async (s) => {
      if (s.user_id) {
        const { data: p } = await supabaseAdmin
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
  if (!(await requireAdmin())) return FORBIDDEN()
  try {
    const { id, status, user_id, plan_type, ends_at } = await req.json()

    if (!id) return NextResponse.json({ error: 'id manquant' }, { status: 400 })

    // Mettre à jour subscription (inclure plan_type pour persister le changement de matière)
    const { error } = await supabaseAdmin
      .from('subscriptions')
      .update({ status, ends_at, ...(plan_type ? { plan_type } : {}) })
      .eq('id', id)

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })

    // Mettre à jour profile si user_id fourni
    if (user_id) {
      await supabaseAdmin.from('profiles').update({
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
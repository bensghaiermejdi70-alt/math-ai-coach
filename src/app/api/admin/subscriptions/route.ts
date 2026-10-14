// src/app/api/admin/subscriptions/route.ts

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import { ADMIN_EMAIL } from '@/lib/types/monetisation'
import { emailConfirmationAbonnement } from '@/lib/emails/templates'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// ── 🔒 Garde-fou : seul un admin peut appeler ces routes ──────────
// Lit l'identité réelle depuis le cookie de session (aucune confiance au client).
async function requireAdmin(): Promise<string | null> {
  try {
    const authClient = createServerSupabaseClient()
    const { data: { user } } = await authClient.auth.getUser()
    if (!user) return null
    if (user.email === ADMIN_EMAIL) return user.id
    // Sinon, vérifier le rôle en base (cohérent avec isAdmin de l'app)
    const { data: prof } = await supabase
      .from('profiles').select('role').eq('id', user.id).single()
    return prof?.role === 'admin' ? user.id : null
  } catch {
    return null
  }
}

const FORBIDDEN = () =>
  NextResponse.json({ error: 'Accès refusé — réservé à l’administrateur.' }, { status: 403 })

// ── Email de confirmation (côté serveur : le secret ne quitte jamais le serveur) ──
async function sendConfirmationEmail(
  origin: string,
  userId: string,
  plan: string,
  endIso: string,
  pricePaid: number
) {
  try {
    const { data: prof, error: profileError } = await supabase
      .from('profiles')
      .select('email, full_name')
      .eq('id', userId)
      .single()

    if (profileError || !prof?.email) {
      console.error(
        '[CONFIRMATION EMAIL] Profil ou email introuvable:',
        profileError?.message || 'Email absent'
      )
      return
    }

    const apiKey = process.env.RESEND_API_KEY

    if (!apiKey) {
      console.error('[CONFIRMATION EMAIL] RESEND_API_KEY absente.')
      return
    }

    const dateExp = new Date(endIso).toLocaleDateString('fr-TN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })

    const resend = new Resend(apiKey)

    const result = await resend.emails.send({
      from: 'MathBacAI <noreply@mathbacai.com>',
      to: [prof.email],
      subject: '✅ Abonnement Bac.AI confirmé',
      html: emailConfirmationAbonnement(
        prof.full_name || prof.email.split('@')[0],
        plan,
        dateExp,
        pricePaid || 0
      ),
    })

    if (result.error) {
      console.error(
        '[CONFIRMATION EMAIL] Erreur Resend:',
        result.error.message
      )
      return
    }

    console.log(
      '[CONFIRMATION EMAIL] Envoi accepté par Resend. ID:',
      result.data?.id
    )
  } catch (error) {
    console.error('[CONFIRMATION EMAIL] Erreur:', error)
  }
}

async function logAdmin(adminId: string, action: string, targetUserId: string | null, details: any) {
  const { error } = await supabase.from('admin_logs')
    .insert({ admin_id: adminId, action, target_user_id: targetUserId, details })
  if (error) console.error('admin_logs err:', error.message)
}

// ── GET : lire toutes les subscriptions ──────────────────────────
export async function GET() {
  if (!(await requireAdmin())) return FORBIDDEN()

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
  const adminId = await requireAdmin()
  if (!adminId) return FORBIDDEN()

  try {
    const body = await req.json()
    const { id, status, user_id, plan_type, ends_at, email_target, action, matiere } = body

    // ── Activation par email (panel admin manuel) ────────────────
    if (action === 'activate_by_email' && email_target) {
      // Trouver le user par email
      const { data: profile } = await supabase
        .from('profiles').select('id').eq('email', email_target).single()

      if (!profile?.id) {
        return NextResponse.json({ error: `Aucun compte trouvé pour ${email_target}` }, { status: 404 })
      }

      const endDate = new Date()
      if (plan_type === 'annuel' || plan_type?.startsWith('annuel_'))
        endDate.setFullYear(endDate.getFullYear() + 1)
      else
        endDate.setMonth(endDate.getMonth() + 1)

      // Construire le plan_type final avec matière
      // body.matiere est passé depuis le panel admin (ex: 'mathematiques')
      const matiereKey = body.matiere || 'mathematiques'
      const basePlan = plan_type?.split('_')[0] === 'sprint'
        ? 'sprint_bac'
        : (plan_type?.split('_')[0] || 'mensuel')
      const finalPlanType = `${basePlan}_${matiereKey}`

      // Insérer subscription active
      const { error: insErr } = await supabase.from('subscriptions').insert({
        user_id:              profile.id,
        plan_type:            finalPlanType,
        status:               'active',
        is_active:            true,
        price_paid:           0,
        payment_method:       'especes',
        payment_reference:    'ADMIN_MANUAL',
        starts_at:            new Date().toISOString(),
        ends_at:              endDate.toISOString(),
        subscription_start:   new Date().toISOString(),
        subscription_end:     endDate.toISOString(),
      })
      if (insErr) return NextResponse.json({ error: 'subscriptions: ' + insErr.message }, { status: 500 })

      // Mettre à jour le profil (le verrou d'appareils est géré par les RPC claim/verify_device_session)
      const { error: profErr } = await supabase.from('profiles').update({
        is_active:          true,
        plan_type:          finalPlanType,
        subscription_end:   endDate.toISOString(),
      }).eq('id', profile.id)
      if (profErr) return NextResponse.json({ error: 'profiles: ' + profErr.message }, { status: 500 })

      await logAdmin(adminId, 'activate_by_email', profile.id, { email: email_target, plan: finalPlanType })
      await sendConfirmationEmail(req.nextUrl.origin, profile.id, finalPlanType, endDate.toISOString(), 0)

      return NextResponse.json({ ok: true, plan_type: finalPlanType })
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
        is_active:        status === 'active',
        ends_at:          status === 'active' ? endDate : null,
        subscription_end: status === 'active' ? endDate : null,
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

    // Update profile — avec matière + reset session_id à l'activation
    if (resolvedUserId) {
      const matiere2 = body.matiere || 'mathematiques'
      const basePlan2 = plan_type?.split('_')[0] === 'sprint'
        ? 'sprint_bac'
        : (plan_type?.split('_')[0] || 'mensuel')
      const finalPlan2 = status === 'active'
        ? `${basePlan2}_${matiere2}`
        : null

      const { error: profErr2 } = await supabase.from('profiles').update({
        is_active:          status === 'active',
        plan_type:          finalPlan2,
        subscription_end:   status === 'active' ? endDate : null,
      }).eq('id', resolvedUserId)
      if (profErr2) return NextResponse.json({ error: 'profiles: ' + profErr2.message }, { status: 500 })

      await logAdmin(adminId, status === 'active' ? 'activate_subscription' : 'update_subscription',
        resolvedUserId, { subscription_id: id, status, plan: finalPlan2, ends_at: endDate })

      if (status === 'active') {
        const { data: subRow } = await supabase
          .from('subscriptions').select('price_paid').eq('id', id).single()
        await sendConfirmationEmail(req.nextUrl.origin, resolvedUserId, finalPlan2 || '', endDate, subRow?.price_paid || 0)
      }
    }

    return NextResponse.json({ ok: true })

  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
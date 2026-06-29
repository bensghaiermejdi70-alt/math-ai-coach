// src/app/api/activate/route.ts
// Enregistre une demande de paiement EN ATTENTE (pending) pour revue admin.
// SÉCURITÉ :
//   - Le statut est TOUJOURS forcé à une valeur "en attente" (jamais "active").
//     L'activation réelle se fait UNIQUEMENT via le webhook de paiement (Stripe/Konnect)
//     ou via le panel admin protégé (/api/admin/subscriptions). Sinon n'importe qui
//     pourrait s'octroyer un abonnement gratuit en appelant cette route.
//   - Le user_id est lié à la SESSION authentifiée (jamais celui fourni par le client),
//     pour empêcher d'attacher une demande au compte d'un autre.

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import { extractMatiere } from '@/lib/types/monetisation'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// Seuls ces statuts "en attente" sont autorisés depuis le client.
const ALLOWED_PENDING_STATUS = new Set(['pending', 'pending_cash'])

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      plan_type, status, price_paid,
      payment_method, payment_reference,
      payment_phone, payment_screenshot_url
    } = body

    // ── Identité réelle depuis la session (cookie) ───────────────────
    // On ne fait JAMAIS confiance au user_id envoyé par le client.
    const authClient = createServerSupabaseClient()
    const { data: { user } } = await authClient.auth.getUser()
    const user_id = user?.id || null

    if (!plan_type) {
      return NextResponse.json(
        { error: 'plan_type requis' },
        { status: 400 }
      )
    }

    // ── Statut FORCÉ en attente (jamais "active") ────────────────────
    const safeStatus = ALLOWED_PENDING_STATUS.has(status) ? status : 'pending'

    // Vérifier s'il existe déjà un abonnement actif pour la même matière
    const matiere = extractMatiere(plan_type)
    const now = new Date().toISOString()

    if (user_id) {
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
    }

    const { error } = await supabase.from('subscriptions').insert({
      user_id,
      plan_type,
      status:                safeStatus,
      is_active:             false,           // jamais actif via cette route
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

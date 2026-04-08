// src/app/api/emails/route.ts

// Système d'emails automatiques avec Resend

// Installer : npm install resend

import { NextRequest, NextResponse } from 'next/server'

import { Resend } from 'resend'

import {
  emailBienvenue,
  emailConfirmationAbonnement,
  emailExpirationBientot,
  emailRenouvellement,
} from '@/lib/emails/templates'

const FROM = 'MathBac.AI <noreply@bacai.tn>'
const SITE = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

function getResend() {
  const key = process.env.RESEND_API_KEY

  if (!key) {
    throw new Error('Missing RESEND_API_KEY environment variable')
  }

  return new Resend(key)
}

// ── Handler API ───────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    const { type, to, data } = await req.json()

    // ── Sécurité interne ─────────────────────────────
    const authHeader = req.headers.get('x-internal-secret')

    if (!process.env.INTERNAL_API_SECRET || authHeader !== process.env.INTERNAL_API_SECRET) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
    }

    // ── Génération email ─────────────────────────────
    let html = ''
    let subject = ''

    switch (type) {
      case 'bienvenue':
        html = emailBienvenue(data.nom)
        subject = '🎓 Bienvenue sur MathBac.AI !'
        break

      case 'confirmation_abonnement':
        html = emailConfirmationAbonnement(
          data.nom,
          data.plan,
          data.dateExpiration,
          data.montant
        )
        subject = '✅ Abonnement Bac.AI confirmé'
        break

      case 'expiration_bientot':
        html = emailExpirationBientot(
          data.nom,
          data.dateExpiration,
          data.plan
        )
        subject = '⏰ Ton abonnement Bac.AI expire dans 3 jours'
        break

      case 'renouvellement':
        html = emailRenouvellement(data.nom)
        subject = '🔴 Ton abonnement Bac.AI a expiré — Renouvelle maintenant'
        break

      default:
        return NextResponse.json(
          { error: 'Type email inconnu' },
          { status: 400 }
        )
    }

    // ── Resend SAFE (runtime only) ───────────────────
    const resend = getResend()

    const result = await resend.emails.send({
      from: FROM,
      to: [to],
      subject,
      html,
    })

    return NextResponse.json({
      success: true,
      id: result?.data?.id,
    })

  } catch (error: any) {
    console.error('Email error:', error)

    return NextResponse.json(
      { error: error.message || 'Erreur serveur' },
      { status: 500 }
    )
  }
}

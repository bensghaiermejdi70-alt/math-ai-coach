// src/app/api/notify-payment/route.ts
// Notifie l'admin par email quand un élève soumet un paiement

import { NextRequest, NextResponse } from 'next/server'

const ADMIN_EMAIL   = 'bensghaiermejdi70@gmail.com'
const ADMIN_WHATSAPP = '21699268970'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { plan, price, method, reference, phone, email, screenshot } = body

    const now = new Date().toLocaleString('fr-TN', {
      timeZone: 'Africa/Tunis',
      day:'2-digit', month:'2-digit', year:'numeric',
      hour:'2-digit', minute:'2-digit'
    })

    // ── Envoi email via Resend (si configuré) ─────────────────────
    const RESEND_KEY = process.env.RESEND_API_KEY
    if (RESEND_KEY) {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${RESEND_KEY}`,
        },
        body: JSON.stringify({
          from: 'MathBac.AI <noreply@mathsbac.com>',
          to:   [ADMIN_EMAIL],
          subject: `💰 Nouveau paiement — ${plan} · ${price}`,
          html: `
            <div style="font-family:system-ui;max-width:480px;margin:0 auto;padding:24px">
              <h2 style="color:#4f6ef7;margin-bottom:8px">💰 Nouveau paiement reçu</h2>
              <p style="color:#666;font-size:13px;margin-bottom:20px">${now}</p>
              <table style="width:100%;border-collapse:collapse;font-size:14px">
                ${[
                  ['Plan',       plan],
                  ['Montant',    `<strong style="color:#10b981">${price}</strong>`],
                  ['Méthode',    method],
                  ['Référence',  `<code>${reference}</code>`],
                  ['Téléphone',  phone],
                  ['Email',      `<a href="mailto:${email}">${email}</a>`],
                ].map(([k,v]) => `
                  <tr>
                    <td style="padding:8px 0;color:#888;border-bottom:1px solid #eee;width:110px">${k}</td>
                    <td style="padding:8px 0;border-bottom:1px solid #eee">${v}</td>
                  </tr>
                `).join('')}
              </table>
              ${screenshot !== 'aucune' ? `
                <div style="margin-top:16px">
                  <a href="${screenshot}" style="color:#4f6ef7">📎 Voir la capture d'écran</a>
                </div>
              ` : ''}
              <div style="margin-top:24px;padding:16px;background:#f0fdf4;border-radius:8px;border:1px solid #bbf7d0">
                <strong>Action requise :</strong><br/>
                Vérifier le paiement puis activer l'abonnement depuis le panel admin.
              </div>
              <div style="margin-top:16px;text-align:center">
                <a href="https://app.mathsbac.com/activation" 
                   style="background:#4f6ef7;color:white;padding:10px 20px;border-radius:8px;text-decoration:none;font-weight:bold">
                  → Ouvrir le panel admin
                </a>
              </div>
            </div>
          `,
        }),
      })
    }

    // ── Fallback : log Supabase (toujours) ───────────────────────
    // Le paiement est déjà dans la table subscriptions
    // L'admin peut voir tous les pending dans Supabase Dashboard

    return NextResponse.json({ ok: true })

  } catch (err) {
    console.error('notify-payment error:', err)
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
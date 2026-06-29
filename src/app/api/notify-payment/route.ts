// src/app/api/notify-payment/route.ts
// Notifie l'admin par email quand un élève soumet un paiement.
//
// SÉCURITÉ :
//   - Tous les champs sont ÉCHAPPÉS avant insertion dans le HTML de l'email
//     (sinon injection HTML / liens de phishing dans TON email admin).
//   - L'URL de capture n'est rendue que si c'est une vraie URL http(s).
//   - Rate-limit par IP (anti-spam / anti-email-bombing de ta clé Resend).

import { NextRequest, NextResponse } from 'next/server'

const ADMIN_EMAIL   = 'bensghaiermejdi70@gmail.com'

// ── Rate limiting par IP ──
const RL_WINDOW_MS = 60_000
const RL_MAX = 5            // max 5 notifications / 60 s / IP
const _rlStore: Map<string, number[]> =
  (globalThis as any).__mb_notify_rl || ((globalThis as any).__mb_notify_rl = new Map())

function rateLimitOk(key: string): boolean {
  const now = Date.now()
  const recent = (_rlStore.get(key) || []).filter((t) => now - t < RL_WINDOW_MS)
  if (recent.length >= RL_MAX) { _rlStore.set(key, recent); return false }
  recent.push(now); _rlStore.set(key, recent)
  return true
}

function clientIp(req: NextRequest): string {
  const xff = req.headers.get('x-forwarded-for')
  if (xff) return xff.split(',')[0].trim()
  return req.headers.get('x-real-ip') || 'unknown'
}

// Échappe le HTML pour neutraliser toute injection venant du client.
function esc(v: unknown): string {
  return String(v ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

// N'accepte que des URL http(s) ; sinon chaîne vide.
function safeUrl(v: unknown): string {
  const s = String(v ?? '')
  return /^https?:\/\//i.test(s) ? s : ''
}

export async function POST(req: NextRequest) {
  try {
    if (!rateLimitOk(clientIp(req))) {
      return NextResponse.json({ ok: false }, { status: 429 })
    }

    const body = await req.json()
    const { plan, price, method, reference, phone, email, screenshot } = body

    const now = new Date().toLocaleString('fr-TN', {
      timeZone: 'Africa/Tunis',
      day:'2-digit', month:'2-digit', year:'numeric',
      hour:'2-digit', minute:'2-digit'
    })

    const screenshotUrl = safeUrl(screenshot)
    const emailEsc = esc(email)

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
          subject: `💰 Nouveau paiement — ${esc(plan)} · ${esc(price)}`,
          html: `
            <div style="font-family:system-ui;max-width:480px;margin:0 auto;padding:24px">
              <h2 style="color:#4f6ef7;margin-bottom:8px">💰 Nouveau paiement reçu</h2>
              <p style="color:#666;font-size:13px;margin-bottom:20px">${esc(now)}</p>
              <table style="width:100%;border-collapse:collapse;font-size:14px">
                ${[
                  ['Plan',       esc(plan)],
                  ['Montant',    `<strong style="color:#10b981">${esc(price)}</strong>`],
                  ['Méthode',    esc(method)],
                  ['Référence',  `<code>${esc(reference)}</code>`],
                  ['Téléphone',  esc(phone)],
                  ['Email',      emailEsc ? `<a href="mailto:${emailEsc}">${emailEsc}</a>` : ''],
                ].map(([k,v]) => `
                  <tr>
                    <td style="padding:8px 0;color:#888;border-bottom:1px solid #eee;width:110px">${k}</td>
                    <td style="padding:8px 0;border-bottom:1px solid #eee">${v}</td>
                  </tr>
                `).join('')}
              </table>
              ${screenshotUrl ? `
                <div style="margin-top:16px">
                  <a href="${esc(screenshotUrl)}" style="color:#4f6ef7">📎 Voir la capture d'écran</a>
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

    return NextResponse.json({ ok: true })

  } catch (err) {
    console.error('notify-payment error:', err)
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}

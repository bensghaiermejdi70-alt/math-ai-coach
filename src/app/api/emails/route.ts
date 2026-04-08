// src/app/api/emails/route.ts
// Système d'emails automatiques avec Resend
// Installer : npm install resend
import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { createAdminClient } from '@/lib/supabase/server'

const FROM = 'MathBac.AI <noreply@bacai.tn>'
const SITE = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

function getResend() {
  const key = process.env.RESEND_API_KEY

  if (!key) {
    throw new Error('Missing RESEND_API_KEY environment variable')
  }

  return new Resend(key)
}

// ── Templates emails ──────────────────────────────────────────────

function templateBase(content: string, title: string) {
  return `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title}</title>
<style>
  body { margin:0; padding:0; background:#07080f; font-family:'Segoe UI',Arial,sans-serif; color:#e8eaf6; }
  .wrap { max-width:560px; margin:0 auto; padding:40px 20px; }
  .logo { display:flex; align-items:center; gap:12px; margin-bottom:32px; }
  .logo-icon { width:44px; height:44px; background:linear-gradient(135deg,#4f6ef7,#7c3aed); border-radius:12px; display:flex; align-items:center; justify-content:center; font-size:22px; color:white; font-weight:800; }
  .logo-text { font-size:22px; font-weight:800; color:#e8eaf6; }
  .logo-text span { color:#4f6ef7; }
  .card { background:#11142b; border:1px solid rgba(79,110,247,0.15); border-radius:16px; padding:32px; margin-bottom:24px; }
  h1 { font-size:24px; font-weight:800; margin:0 0 12px; color:#e8eaf6; }
  p { font-size:14px; line-height:1.7; color:#a0a8c0; margin:0 0 16px; }
  .btn { display:inline-block; padding:14px 28px; background:linear-gradient(135deg,#4f6ef7,#7c3aed); color:white !important; text-decoration:none; border-radius:12px; font-weight:700; font-size:15px; margin:8px 0; }
  .btn-gold { background:linear-gradient(135deg,#f5c842,#f97316); }
  .info-row { display:flex; justify-content:space-between; padding:10px 0; border-bottom:1px solid rgba(255,255,255,0.06); font-size:13px; }
  .info-label { color:#6b7280; }
  .info-val { color:#e8eaf6; font-weight:600; }
  .highlight { color:#4f6ef7; font-weight:700; }
  .gold { color:#f5c842; font-weight:700; }
  .teal { color:#06d6a0; font-weight:700; }
  .footer { text-align:center; font-size:11px; color:#6b7280; margin-top:32px; line-height:1.8; }
  .footer a { color:#4f6ef7; text-decoration:none; }
</style>
</head>
<body>
<div class="wrap">
  <div class="logo">
    <div class="logo-icon">B</div>
    <div class="logo-text">Bac<span>.AI</span> Tunisie 🇹🇳</div>
  </div>
  ${content}
  <div class="footer">
    © ${new Date().getFullYear()} MathBac.AI · Coach IA pour le Bac Tunisien<br>
    <a href="${SITE}">bacai.tn</a> · 
    <a href="${SITE}/abonnement">Plans & Tarifs</a> · 
    <a href="mailto:support@bacai.tn">Support</a>
  </div>
</div>
</body>
</html>`
}

// 1️⃣ Email de bienvenue à l'inscription
function emailBienvenue(nom: string) {
  return templateBase(`
  <div class="card">
    <h1>🎓 Bienvenue sur MathBac.AI !</h1>
    <p>Bonjour <strong style="color:#e8eaf6">${nom}</strong>,</p>
    <p>Ton compte est activé. Tu as maintenant accès à ton coach IA pour le Bac Tunisie.</p>
    <div style="margin:20px 0">
      <div class="info-row"><span class="info-label">✅ Chat IA Professeur</span><span class="info-val">3 messages/sem gratuits</span></div>
      <div class="info-row"><span class="info-label">📐 Solveur IA</span><span class="info-val">5 résolutions/sem gratuits</span></div>
      <div class="info-row"><span class="info-label">📝 Examens Bac corrigés</span><span class="info-val">✅ Accès illimité</span></div>
      <div class="info-row"><span class="info-label">🏆 Bac Blanc National</span><span class="info-val">✅ Accès gratuit</span></div>
    </div>
    <a href="${SITE}" class="btn">Commencer à réviser →</a>
    <p style="margin-top:20px;font-size:13px">Pour accéder à tous les quotas illimités, <a href="${SITE}/abonnement" class="highlight">découvre nos plans à partir de 80 DT/mois</a>.</p>
  </div>`, 'Bienvenue sur MathBac.AI')
}

// 2️⃣ Email de confirmation d'abonnement
function emailConfirmationAbonnement(nom: string, plan: string, dateExpiration: string, montant: number) {
  const planLabel = plan === 'mensuel' ? 'Mensuel' : plan === 'annuel' ? 'Annuel' : 'Sprint Bac'
  return templateBase(`
  <div class="card">
    <h1>✅ Abonnement activé !</h1>
    <p>Bonjour <strong style="color:#e8eaf6">${nom}</strong>,</p>
    <p>Ton abonnement <span class="teal">${planLabel}</span> est maintenant actif. Tu as accès à tous les quotas premium.</p>
    <div style="margin:20px 0">
      <div class="info-row"><span class="info-label">Plan</span><span class="info-val teal">${planLabel}</span></div>
      <div class="info-row"><span class="info-label">Montant</span><span class="info-val">${montant} DT</span></div>
      <div class="info-row"><span class="info-label">Valable jusqu'au</span><span class="info-val">${dateExpiration}</span></div>
      <div class="info-row"><span class="info-label">Simulation Bac</span><span class="info-val">2/sem</span></div>
      <div class="info-row"><span class="info-label">Chat IA</span><span class="info-val">35/sem</span></div>
      <div class="info-row"><span class="info-label">Solveur IA</span><span class="info-val">30/sem</span></div>
    </div>
    <a href="${SITE}/profile" class="btn">Voir mon profil →</a>
    <a href="${SITE}/simulation" class="btn" style="margin-left:10px;background:linear-gradient(135deg,#06d6a0,#059669)">Commencer une simulation →</a>
  </div>`, 'Abonnement Bac.AI confirmé')
}

// 3️⃣ Email 3 jours avant expiration
function emailExpirationBientot(nom: string, dateExpiration: string, plan: string) {
  return templateBase(`
  <div class="card" style="border-color:rgba(249,115,22,0.4)">
    <h1>⏰ Ton abonnement expire dans 3 jours</h1>
    <p>Bonjour <strong style="color:#e8eaf6">${nom}</strong>,</p>
    <p>Ton abonnement <span class="gold">${plan}</span> expire le <strong style="color:#f97316">${dateExpiration}</strong>.</p>
    <p>Renouvelle maintenant pour continuer à préparer ton Bac sans interruption !</p>
    <div style="background:rgba(249,115,22,0.08);border:1px solid rgba(249,115,22,0.2);border-radius:10px;padding:16px;margin:20px 0">
      <p style="margin:0;color:#fed7aa;font-size:13px">
        ⚠️ Après expiration, tu perdras l'accès aux fonctionnalités premium :<br>
        simulations, chat illimité, solveur avancé, remédiation IA.
      </p>
    </div>
    <a href="${SITE}/abonnement" class="btn btn-gold">Renouveler mon abonnement →</a>
    <p style="margin-top:16px;font-size:12px;color:#6b7280">
      Paiement : D17 · Flouci · Konnect · Recharge mobile · Numéro : <strong style="color:#e8eaf6">25 268 970</strong>
    </p>
  </div>`, 'Ton abonnement Bac.AI expire bientôt')
}

// 4️⃣ Email de renouvellement (après expiration)
function emailRenouvellement(nom: string) {
  return templateBase(`
  <div class="card" style="border-color:rgba(239,68,68,0.3)">
    <h1>🔴 Ton abonnement a expiré</h1>
    <p>Bonjour <strong style="color:#e8eaf6">${nom}</strong>,</p>
    <p>Ton abonnement MathBac.AI est expiré. Tu es repassé en mode gratuit avec des quotas limités.</p>
    <div style="margin:20px 0">
      <div class="info-row"><span class="info-label">Chat IA</span><span class="info-val" style="color:#ef4444">3 messages/sem</span></div>
      <div class="info-row"><span class="info-label">Solveur</span><span class="info-val" style="color:#ef4444">5 résolutions/sem</span></div>
      <div class="info-row"><span class="info-label">Simulation Bac</span><span class="info-val" style="color:#ef4444">Non disponible</span></div>
    </div>
    <p>Le Bac approche — reprends ta préparation maintenant avec un accès illimité !</p>
    <a href="${SITE}/abonnement" class="btn">Renouveler maintenant →</a>
    <p style="margin-top:16px;font-size:12px;color:#6b7280">
      Plan Mensuel : <strong style="color:#e8eaf6">80 DT</strong> · Plan Annuel : <strong style="color:#e8eaf6">750 DT</strong>
    </p>
  </div>`, 'Renouvelle ton abonnement Bac.AI')
}

// ── Handler API ───────────────────────────────────────────────────

import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

import {
  emailBienvenue,
  emailConfirmationAbonnement,
  emailExpirationBientot,
  emailRenouvellement,
} from '@/lib/emails/templates'

const FROM = 'MathBac.AI <noreply@bacai.tn>'

function getResend() {
  const key = process.env.RESEND_API_KEY

  if (!key) {
    throw new Error('Missing RESEND_API_KEY')
  }

  return new Resend(key)
}

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
// src/lib/emails/templates.ts

const SITE = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

// ─────────────────────────────────────────────
// BASE HTML EMAIL
// ─────────────────────────────────────────────

function templateBase(content: string, title: string) {
  return `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${title}</title>
<style>
  body { margin:0; padding:0; background:#07080f; font-family:Arial,sans-serif; color:#e8eaf6; }
  .wrap { max-width:560px; margin:0 auto; padding:40px 20px; }
  .logo { font-size:20px; font-weight:bold; margin-bottom:20px; }
  .card { background:#11142b; padding:24px; border-radius:12px; }
  h1 { font-size:20px; margin-bottom:10px; }
  p { font-size:14px; color:#a0a8c0; }
  .btn {
    display:inline-block;
    margin-top:15px;
    padding:12px 20px;
    background:#4f6ef7;
    color:white;
    text-decoration:none;
    border-radius:8px;
    font-weight:bold;
  }
  .footer {
    margin-top:30px;
    font-size:11px;
    color:#6b7280;
    text-align:center;
  }
</style>
</head>
<body>
  <div class="wrap">
    <div class="logo">📘 MathBac.AI</div>
    ${content}
    <div class="footer">
      © ${new Date().getFullYear()} MathBac.AI - Bac Tunisien<br>
      <a href="${SITE}">${SITE}</a>
    </div>
  </div>
</body>
</html>`
}

// ─────────────────────────────────────────────
// 1. BIENVENUE
// ─────────────────────────────────────────────

export function emailBienvenue(nom: string) {
  return templateBase(`
    <div class="card">
      <h1>🎓 Bienvenue ${nom}</h1>
      <p>Ton compte MathBac.AI est maintenant actif.</p>
      <p>Tu peux commencer à utiliser ton coach IA pour réviser le Bac.</p>
      <a href="${SITE}" class="btn">Commencer</a>
    </div>
  `, "Bienvenue")
}

// ─────────────────────────────────────────────
// 2. CONFIRMATION ABONNEMENT
// ─────────────────────────────────────────────

export function emailConfirmationAbonnement(
  nom: string,
  plan: string,
  dateExpiration: string,
  montant: number
) {
  return templateBase(`
    <div class="card">
      <h1>✅ Abonnement activé</h1>
      <p>Bonjour ${nom}</p>
      <p>Plan: <b>${plan}</b></p>
      <p>Montant: <b>${montant} DT</b></p>
      <p>Expire le: <b>${dateExpiration}</b></p>
      <a href="${SITE}/profile" class="btn">Voir mon compte</a>
    </div>
  `, "Abonnement confirmé")
}

// ─────────────────────────────────────────────
// 3. EXPIRATION BIENTÔT
// ─────────────────────────────────────────────

export function emailExpirationBientot(
  nom: string,
  dateExpiration: string,
  plan: string
) {
  return templateBase(`
    <div class="card">
      <h1>⏰ Expiration bientôt</h1>
      <p>Bonjour ${nom}</p>
      <p>Ton abonnement <b>${plan}</b> expire le ${dateExpiration}</p>
      <a href="${SITE}/abonnement" class="btn">Renouveler</a>
    </div>
  `, "Expiration abonnement")
}

// ─────────────────────────────────────────────
// 4. RENOUVELLEMENT
// ─────────────────────────────────────────────

export function emailRenouvellement(nom: string) {
  return templateBase(`
    <div class="card">
      <h1>🔴 Abonnement expiré</h1>
      <p>Bonjour ${nom}</p>
      <p>Ton abonnement est expiré.</p>
      <a href="${SITE}/abonnement" class="btn">Réactiver</a>
    </div>
  `, "Renouvellement")
}
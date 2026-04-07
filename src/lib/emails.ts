// src/lib/emails.ts
// Fonctions utilitaires pour envoyer les emails depuis le serveur

const SITE = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
const SECRET = process.env.INTERNAL_API_SECRET || 'dev-secret'

async function sendEmail(type: string, to: string, data: Record<string, any>) {
  try {
    const res = await fetch(`${SITE}/api/emails`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-internal-secret': SECRET,
      },
      body: JSON.stringify({ type, to, data }),
    })
    const result = await res.json()
    if (!res.ok) console.error('Email error:', result.error)
    return result
  } catch (e) {
    console.error('sendEmail error:', e)
  }
}

// ── Fonctions d'envoi ─────────────────────────────────────────────

export async function sendEmailBienvenue(to: string, nom: string) {
  return sendEmail('bienvenue', to, { nom })
}

export async function sendEmailConfirmationAbonnement(
  to: string, nom: string, plan: string,
  dateExpiration: string, montant: number
) {
  return sendEmail('confirmation_abonnement', to, { nom, plan, dateExpiration, montant })
}

export async function sendEmailExpirationBientot(
  to: string, nom: string, dateExpiration: string, plan: string
) {
  return sendEmail('expiration_bientot', to, { nom, dateExpiration, plan })
}

export async function sendEmailRenouvellement(to: string, nom: string) {
  return sendEmail('renouvellement', to, { nom })
}

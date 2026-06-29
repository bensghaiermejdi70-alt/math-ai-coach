// src/app/api/solve/route.ts
// Proxy Anthropic utilisé pour l'OCR / transcription d'exercices (PDF, image)
// depuis la page publique /solve.
//
// SÉCURITÉ — cette route était un proxy Anthropic OUVERT (aucune limite) :
// n'importe qui pouvait l'appeler en boucle et utiliser TA clé ANTHROPIC_API_KEY
// gratuitement → facture illimitée. Garde-fous ajoutés (sans exiger de login,
// pour conserver l'OCR sur la page publique) :
//   1. Rate-limit par IP (anti-rafale / anti-script).
//   2. Modèle restreint à une liste blanche.
//   3. max_tokens plafonné.
//   4. Streaming interdit (empêche l'usage comme API Claude générale).

import { NextRequest, NextResponse } from 'next/server'

// ── Rate limiting par IP (en mémoire, par instance) ──
const RL_WINDOW_MS = 60_000   // fenêtre : 60 s
const RL_MAX = 15             // max 15 requêtes / 60 s / IP
const _rlStore: Map<string, number[]> =
  (globalThis as any).__mb_solve_rl || ((globalThis as any).__mb_solve_rl = new Map())

function rateLimitOk(key: string): boolean {
  const now = Date.now()
  const recent = (_rlStore.get(key) || []).filter((t) => now - t < RL_WINDOW_MS)
  if (recent.length >= RL_MAX) {
    _rlStore.set(key, recent)
    return false
  }
  recent.push(now)
  _rlStore.set(key, recent)
  return true
}

function clientIp(req: NextRequest): string {
  const xff = req.headers.get('x-forwarded-for')
  if (xff) return xff.split(',')[0].trim()
  return req.headers.get('x-real-ip') || 'unknown'
}

// Modèles autorisés pour cette route (OCR/transcription uniquement)
const ALLOWED_MODELS = new Set([
  'claude-sonnet-4-6',
  'claude-haiku-4-5-20251001',
])
const MAX_TOKENS_CAP = 8000

export async function POST(req: NextRequest) {
  try {
    // 1. Rate-limit par IP
    const ip = clientIp(req)
    if (!rateLimitOk(ip)) {
      return NextResponse.json(
        { error: 'Trop de requêtes. Réessaie dans une minute.' },
        { status: 429, headers: { 'Retry-After': '60' } }
      )
    }

    const body = await req.json()

    // 2. Streaming interdit sur cette route
    if (body?.stream) {
      return NextResponse.json({ error: 'Streaming non autorisé ici.' }, { status: 400 })
    }

    // 3. Modèle en liste blanche
    if (!ALLOWED_MODELS.has(body?.model)) {
      return NextResponse.json({ error: 'Modèle non autorisé.' }, { status: 400 })
    }

    // 4. Plafond max_tokens
    const max_tokens = Math.min(Number(body?.max_tokens) || 4000, MAX_TOKENS_CAP)

    const apiKey = process.env.ANTHROPIC_API_KEY
    if (!apiKey) {
      return NextResponse.json({ error: 'Configuration serveur manquante' }, { status: 500 })
    }

    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({ ...body, max_tokens, stream: false }),
    })

    const data = await res.json()
    return NextResponse.json(data, { status: res.ok ? 200 : res.status })
  } catch (err) {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

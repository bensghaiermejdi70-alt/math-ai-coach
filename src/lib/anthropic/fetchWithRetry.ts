// src/lib/anthropic/fetchWithRetry.ts
// Appel à l'API Anthropic avec réessais + backoff exponentiel.
// Ne réessaie QUE les erreurs transitoires d'Anthropic (429 rate-limit, 529 overloaded, 5xx).
// Respecte l'en-tête Retry-After si présent. Borne chaque essai sur le budget de temps restant.
// Compatible streaming : fetch() résout dès les en-têtes reçus, donc le corps (SSE) n'est pas réessayé.

export interface RetryOptions {
  maxRetries?: number        // nombre de réessais après le 1er essai (défaut 2)
  baseDelayMs?: number       // délai de base du backoff (défaut 600 ms)
  overallTimeoutMs?: number  // budget total connexion + corps (défaut 115000 ms)
}

// Statuts considérés comme transitoires → réessayables
const RETRYABLE = new Set([429, 500, 502, 503, 529])

const sleep = (ms: number) => new Promise<void>(r => setTimeout(r, Math.max(0, ms)))

// Backoff exponentiel + jitter, plafonné par le temps restant
function backoff(base: number, attempt: number, capMs: number): number {
  const exp = base * Math.pow(2, attempt) + Math.random() * 250
  return Math.min(exp, Math.max(0, capMs - 500))
}

export async function fetchAnthropicWithRetry(
  url: string,
  init: RequestInit,
  opts: RetryOptions = {}
): Promise<Response> {
  const maxRetries = opts.maxRetries ?? 2
  const baseDelay = opts.baseDelayMs ?? 600
  const deadline = Date.now() + (opts.overallTimeoutMs ?? 115000)

  let attempt = 0
  let lastError: unknown = null

  while (true) {
    const remaining = deadline - Date.now()
    if (remaining <= 1000) {
      if (lastError) throw lastError
      throw new Error('Anthropic: budget de temps dépassé avant réponse')
    }

    // Borne cet essai (connexion + lecture du corps) sur le temps restant.
    // Si l'appelant fournit déjà un signal, on le respecte.
    const signal = init.signal ?? AbortSignal.timeout(remaining)

    let res: Response
    try {
      res = await fetch(url, { ...init, signal })
    } catch (e) {
      // Erreur réseau / timeout d'essai
      lastError = e
      if (attempt >= maxRetries) throw e
      await sleep(backoff(baseDelay, attempt, deadline - Date.now()))
      attempt++
      continue
    }

    // Succès, erreur NON transitoire (ex. 400/401), ou plus de réessais → on renvoie tel quel
    if (res.ok || !RETRYABLE.has(res.status) || attempt >= maxRetries) {
      return res
    }

    // Erreur transitoire → attendre (Retry-After prioritaire) puis réessayer
    const retryAfter = parseFloat(res.headers.get('retry-after') || '')
    const waitMs = !isNaN(retryAfter)
      ? Math.min(retryAfter * 1000, Math.max(0, deadline - Date.now() - 500))
      : backoff(baseDelay, attempt, deadline - Date.now())

    if (waitMs <= 0) return res // plus le temps d'attendre : on renvoie l'erreur
    await sleep(waitMs)
    attempt++
  }
}
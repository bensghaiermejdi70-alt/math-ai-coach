import { createBrowserClient } from '@supabase/ssr'
import { clearAllSupabaseStorage, markAsKicked, verifyStillValid } from '@/lib/auth/deviceSession'

// Singleton global — survit aux re-renders et hot reloads de Next.js
declare global {
  // eslint-disable-next-line no-var
  var __supabase_client: ReturnType<typeof createBrowserClient> | undefined
}

export function createClient() {
  if (typeof window === 'undefined') {
    // SSR : toujours créer une nouvelle instance
    return createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
  }

  // Browser : utiliser le singleton global
  if (!globalThis.__supabase_client) {
    globalThis.__supabase_client = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        auth: {
          detectSessionInUrl: true,        // CRITIQUE : detecte le code OAuth dans l'URL
          autoRefreshToken: true,
          persistSession: true,
          flowType: 'pkce',               // Recommande pour OAuth securise
          lock: async (_name: string, _acquireTimeout: number, fn: () => Promise<any>) => {
            // Desactiver le Web Lock API — evite les conflits entre instances
            return fn()
          },
        }
      }
    )
  }

  return globalThis.__supabase_client
}

/**
 * Deconnexion propre — nettoie TOUT le stockage local + marque comme kicke.
 * A utiliser pour la deconnexion manuelle ou le kick de session.
 */
export async function forceSignOut() {
  const client = createClient()

  // 1. Nettoyer le stockage Supabase complet
  clearAllSupabaseStorage()

  // 2. Marquer comme kicke (empeche reconnexion auto)
  markAsKicked()

  // 3. Deconnexion Supabase
  await client.auth.signOut().catch(() => {})

  // 4. Redirection
  if (typeof window !== 'undefined') {
    window.location.href = '/login'
  }
}

/**
 * Verifie si la session locale est valide.
 * Delegue entierement a verifyStillValid() (deviceSession.ts) qui appelle la
 * fonction RPC `verify_device_session` — c'est la SEULE source de verite
 * pour cette logique, pour ne pas la dupliquer a 2 ou 3 endroits differents
 * (c'etait une des causes de divergence/bug dans l'ancienne version).
 */
export async function validateLocalSession(): Promise<boolean> {
  const client = createClient()

  const { data: { session } } = await client.auth.getSession()
  if (!session?.user) return false

  const result = await verifyStillValid(client, session.user.id, session.user.email)
  return !result.shouldSignOut
}
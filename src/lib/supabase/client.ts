// src/lib/supabase/client.ts
import { createBrowserClient } from '@supabase/ssr'

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
          detectSessionInUrl: true,
          autoRefreshToken: true,
          persistSession: true,
        }
      }
    )
  }

  return globalThis.__supabase_client
}

// 🔒 Fonction utilitaire pour forcer la déconnexion propre
export async function forceSignOut() {
  const client = createClient()
  
  // Nettoyer le localStorage de notre système de session
  localStorage.removeItem('mathbac_session_id')
  
  // Déconnexion Supabase
  await client.auth.signOut()
  
  // Redirection
  if (typeof window !== 'undefined') {
    window.location.href = '/login'
  }
}

// 🔒 Fonction pour vérifier si la session locale est valide
export async function validateLocalSession(): Promise<boolean> {
  const client = createClient()
  
  const { data: { session } } = await client.auth.getSession()
  if (!session?.user) return false
  
  // Admin toujours valide
  if (session.user.email === 'bensghaiermejdi70@gmail.com') return true
  
  const localId = localStorage.getItem('mathbac_session_id')
  if (!localId) return false
  
  // Vérifier en base
  const { data: prof } = await client
    .from('profiles')
    .select('current_session_id, is_active')
    .eq('id', session.user.id)
    .single()
  
  // Session valide si : pas d'abonnement actif OU session correspond
  if (!prof?.is_active) return true
  
  return prof?.current_session_id === localId
}
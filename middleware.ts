// middleware.ts (à la racine du projet Next.js)
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// ════════════════════════════════════════════════════════════════
// MIDDLEWARE SIMPLIFIÉ — Compatible local sans Supabase configuré
// En production : décommenter le bloc Supabase complet
// ════════════════════════════════════════════════════════════════

// Pages publiques — toujours accessibles sans auth
const PUBLIC_ROUTES = [
  '/',
  '/login',
  '/register',
  '/abonnement',
  '/activation',
  '/bac-blanc',  // accessible à tous (concours national gratuit)
  '/examens',
  '/bac',
]

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // TODO prod : activer la vérification Supabase complète ci-dessous
  // Pour l'instant on laisse passer tout le monde
  // (quotas vérifiés côté client via AuthContext)

  /* ── PRODUCTION : décommenter ce bloc ──────────────────────────
  import { createServerClient } from '@supabase/ssr'
  import { ADMIN_EMAIL } from '@/lib/types/monetisation'

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { getAll: () => request.cookies.getAll(), setAll: () => {} } }
  )
  const { data: { user } } = await supabase.auth.getUser()

  // Admin bypass
  if (user?.email === ADMIN_EMAIL) return NextResponse.next()

  // Pages nécessitant connexion
  const AUTH_ROUTES = ['/profile', '/admin', '/simulation', '/chat', '/solve']
  const needsAuth = AUTH_ROUTES.some(r => pathname.startsWith(r))
  if (needsAuth && !user) {
    const url = new URL('/login', request.url)
    url.searchParams.set('redirect', pathname)
    return NextResponse.redirect(url)
  }

  // Si connecté → ne pas afficher login/register
  if (user && (pathname === '/login' || pathname === '/register')) {
    return NextResponse.redirect(new URL('/', request.url))
  }
  ─────────────────────────────────────────────────────────────── */

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|api|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}

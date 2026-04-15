import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'

const ADMIN_EMAIL = 'bensghaiermejdi70@gmail.com'

const PUBLIC_ROUTES = [
  '/',
  '/login',
  '/register',
  '/abonnement',
  '/activation',
  '/bac-blanc',
  '/examens',
  '/bac',
  '/bac-france',
  '/solve', // Solveur accessible sans login
]

const PROTECTED_ROUTES = [
  '/chat',
  '/profile',
  '/simulation',
  '/app',
  '/dashboard',
  '/settings',
]

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const response = NextResponse.next()

  // 🔥 SUPABASE SSR CLIENT
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookies) {
          cookies.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          )
        }
      }
    }
  )

  // 🔐 GET USER SESSION
  const {
    data: { user }
  } = await supabase.auth.getUser()

  const email = user?.email

  const isProtected = PROTECTED_ROUTES.some(route =>
    pathname.startsWith(route)
  )

  const isPublic = PUBLIC_ROUTES.some(route =>
    pathname === route || pathname.startsWith(route + '/')
  )

  // 🔥 1. ADMIN BYPASS - Aucune restriction pour l'admin
  if (email && email === ADMIN_EMAIL) {
    // 🔥 6. BLOQUER LOGIN SI CONNECTÉ (même pour admin)
    if (pathname === '/login' || pathname === '/register') {
      return NextResponse.redirect(new URL('/', request.url))
    }
    return response
  }

  // 🔥 2. PUBLIC ROUTES - Pas besoin de vérifier
  if (isPublic) {
    return response
  }

  // 🔥 3. NON CONNECTÉ → LOGIN
  if (!user && isProtected) {
    return NextResponse.redirect(
      new URL('/login', request.url)
    )
  }

  // 🔥 4. CONNECTÉ → CHECK SUBSCRIPTION + SESSION UNIQUE
  if (user && isProtected) {
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('is_active, subscription_end, country, current_session_id')
      .eq('id', user.id)
      .single()

    // ❌ si profil introuvable → abonnement
    if (error || !profile) {
      return NextResponse.redirect(
        new URL('/abonnement', request.url)
      )
    }

    const now = new Date()

    const endDate = profile.subscription_end
      ? new Date(profile.subscription_end)
      : null

    const isExpired =
      endDate ? endDate.getTime() < now.getTime() : true

    const hasAccess =
      profile.is_active === true && !isExpired

    // 🔥 5. BLOQUAGE GLOBAL ACCÈS (pas d'abonnement actif)
    if (!hasAccess) {
      return NextResponse.redirect(
        new URL('/abonnement', request.url)
      )
    }

    // 🔒 6. VÉRIFICATION SESSION UNIQUE
    // Note: Le middleware ne peut pas lire localStorage (côté serveur)
    // Cette vérification est faite côté client dans AuthContext
    // Mais on peut vérifier si current_session_id existe (session créée)
    // Si pas de session_id mais abonnement actif = problème de sync
    if (hasAccess && !profile.current_session_id) {
      // Première connexion ou reset, on laisse passer
      // Le AuthContext va créer la session côté client
    }
  }

  // 🔥 7. BLOQUER LOGIN SI CONNECTÉ
  if (user && (pathname === '/login' || pathname === '/register')) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|api|.*\\.(svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}

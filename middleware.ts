import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'

const ADMIN_EMAIL = process.env.ADMIN_EMAIL

const PUBLIC_ROUTES = [
  '/',
  '/login',
  '/register',
  '/abonnement',
  '/activation',
  '/bac-blanc',
  '/examens',
  '/bac',
]

const PROTECTED_ROUTES = [
  '/chat',
  '/profile',
  '/simulation',
  '/solve',
  '/app'
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

  // 🔥 1. ADMIN BYPASS
  if (email && email === ADMIN_EMAIL) {
    return response
  }

  // 🔥 2. PUBLIC ROUTES
  if (PUBLIC_ROUTES.includes(pathname)) {
    return response
  }

  // 🔥 3. NON CONNECTÉ → LOGIN
  if (!user && isProtected) {
    return NextResponse.redirect(
      new URL('/login', request.url)
    )
  }

  // 🔥 4. CONNECTÉ → CHECK SUBSCRIPTION
  if (user && isProtected) {
    const { data: profile, error } = await supabase
      .from('profiles') // ✅ FIX IMPORTANT
      .select('is_active, subscription_end, country')
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

    // 🔥 5. BLOQUAGE GLOBAL ACCÈS
    if (!hasAccess) {
      return NextResponse.redirect(
        new URL('/abonnement', request.url)
      )
    }
  }

  // 🔥 6. BLOQUER LOGIN SI CONNECTÉ
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
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

  // 🔥 SUPABASE CLIENT (SOURCE DE VÉRITÉ)
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: () => {}
      }
    }
  )

  const {
    data: { user }
  } = await supabase.auth.getUser()

  const email = user?.email

  // 🔥 1. ADMIN BYPASS TOTAL
  if (email === ADMIN_EMAIL) {
    return NextResponse.next()
  }

  // 🔥 2. PUBLIC ROUTES
  if (PUBLIC_ROUTES.includes(pathname)) {
    return NextResponse.next()
  }

  // 🔥 3. CHECK DB SUBSCRIPTION (IMPORTANT)
  if (email) {
    const { data: profile } = await supabase
      .from('users')
      .select('is_active, subscription_end')
      .eq('email', email)
      .single()

    const now = new Date()

    const isExpired =
      profile?.subscription_end &&
      new Date(profile.subscription_end) < now

    const hasAccess = profile?.is_active && !isExpired

    const isProtected = PROTECTED_ROUTES.some(r =>
      pathname.startsWith(r)
    )

    if (isProtected && !hasAccess) {
      return NextResponse.redirect(
        new URL('/abonnement', request.url)
      )
    }
  }

  // 🔥 4. BLOCK UNAUTH USER
  const isProtected = PROTECTED_ROUTES.some(r =>
    pathname.startsWith(r)
  )

  if (!email && isProtected) {
    return NextResponse.redirect(
      new URL('/login', request.url)
    )
  }

  // 🔥 5. LOGIN / REGISTER REDIRECT
  if (email && (pathname === '/login' || pathname === '/register')) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|api|.*\\.(svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
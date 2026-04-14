// src/app/api/auth/reset-confirm/route.ts
// API Route SERVEUR — gère le code PKCE de Supabase
// Pas de React, pas de Strict Mode, pas de double exécution

import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function GET(req: NextRequest) {
  const url  = new URL(req.url)
  const code = url.searchParams.get('code')

  if (!code) {
    return NextResponse.redirect(new URL('/login?error=no_code', req.url))
  }

  const cookieStore = cookies()
  
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) { return cookieStore.get(name)?.value },
        set(name: string, value: string, options: any) {
          cookieStore.set({ name, value, ...options })
        },
        remove(name: string, options: any) {
          cookieStore.set({ name, value: '', ...options })
        },
      },
    }
  )

  // Échanger le code contre une session (côté serveur = pas de double appel)
  const { error } = await supabase.auth.exchangeCodeForSession(code)

  if (error) {
    console.error('exchangeCodeForSession error:', error.message)
    return NextResponse.redirect(new URL('/login?error=lien_expire', req.url))
  }

  // Session établie côté serveur → rediriger vers la page reset
  return NextResponse.redirect(new URL('/auth/reset-password', req.url))
}
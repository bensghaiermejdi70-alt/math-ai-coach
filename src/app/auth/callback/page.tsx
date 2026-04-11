'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function AuthCallback() {
  const router = useRouter()

  useEffect(() => {
    const supabase = createClient()

    // Timeout de sécurité — si rien ne se passe en 8s, rediriger
    const timeout = setTimeout(() => {
      router.push('/login?error=timeout')
    }, 8000)

    const handleAuth = async () => {
      try {
        const url = new URL(window.location.href)
        const code       = url.searchParams.get('code')
        const tokenHash  = url.searchParams.get('token_hash')
        const type       = url.searchParams.get('type')
        const hashStr    = window.location.hash

        // ── CAS 1 : token_hash (email reset via {{ .ConfirmationURL }}) ──
        if (tokenHash) {
          // type 'recovery' pour reset password, 'email' pour signup/magic link
          const otpType = type === 'recovery' ? 'recovery' : (type as any) || 'email'

          const { error } = await supabase.auth.verifyOtp({
            token_hash: tokenHash,
            type: otpType,
          })

          clearTimeout(timeout)

          if (error) {
            console.error('verifyOtp error:', error.message)
            // Lien peut-être déjà utilisé — essayer de récupérer la session active
            const { data: { session } } = await supabase.auth.getSession()
            if (session && type === 'recovery') {
              router.push('/auth/update-password')
              return
            }
            router.push('/login?error=lien_expire')
            return
          }

          if (type === 'recovery') {
            router.push('/auth/update-password')
            return
          }

          router.push('/')
          return
        }

        // ── CAS 2 : code PKCE (Google OAuth, magic link moderne) ──────
        if (code) {
          clearTimeout(timeout)
          const { error } = await supabase.auth.exchangeCodeForSession(code)

          if (error) {
            console.error('exchangeCode error:', error)
            router.push('/login?error=invalid_code')
            return
          }

          if (type === 'recovery') {
            router.push('/auth/update-password')
            return
          }

          router.push('/')
          return
        }

        // ── CAS 3 : hash fragment (ancien flow) ───────────────────────
        if (hashStr) {
          clearTimeout(timeout)
          const params       = new URLSearchParams(hashStr.replace('#', ''))
          const accessToken  = params.get('access_token')
          const refreshToken = params.get('refresh_token')
          const hashType     = params.get('type')

          if (accessToken && refreshToken) {
            await supabase.auth.setSession({ access_token: accessToken, refresh_token: refreshToken })
          }

          if (hashType === 'recovery') {
            router.push('/auth/update-password')
            return
          }

          router.push('/')
          return
        }

        // ── CAS 4 : session déjà active (rechargement) ───────────────
        clearTimeout(timeout)
        const { data: { session } } = await supabase.auth.getSession()
        router.push(session ? '/' : '/login')

      } catch (e) {
        console.error('Auth callback error:', e)
        clearTimeout(timeout)
        router.push('/login')
      }
    }

    handleAuth()
  }, [router])

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      background: '#0a0a1a', color: 'white', fontFamily: 'system-ui', gap: 16,
    }}>
      <div style={{
        width: 48, height: 48, borderRadius: '50%',
        border: '3px solid rgba(79,110,247,0.3)',
        borderTopColor: '#4f6ef7',
        animation: 'spin 0.8s linear infinite',
      }} />
      <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14, margin: 0 }}>
        Authentification en cours…
      </p>
      <style suppressHydrationWarning>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </div>
  )
}
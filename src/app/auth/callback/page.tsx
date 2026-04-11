'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function AuthCallback() {
  const router = useRouter()

  useEffect(() => {
    const supabase = createClient()

    const handleAuth = async () => {
      const url       = new URL(window.location.href)
      const code      = url.searchParams.get('code')
      const tokenHash = url.searchParams.get('token_hash')
      const type      = url.searchParams.get('type')
      const hash      = window.location.hash

      try {

        // ── CAS 1 : token_hash (reset password via email template) ───
        if (tokenHash) {
          const otpType: any = type || 'email'
          const { error } = await supabase.auth.verifyOtp({ token_hash: tokenHash, type: otpType })

          if (error) {
            // Peut-être déjà vérifié — essayer de récupérer la session
            const { data: { session } } = await supabase.auth.getSession()
            if (session) {
              window.location.replace('/auth/update-password')
            } else {
              window.location.replace('/login?error=lien_expire')
            }
            return
          }

          // Succès — si c'est un recovery, aller changer le mot de passe
          if (type === 'recovery') {
            window.location.replace('/auth/update-password')
          } else {
            window.location.replace('/')
          }
          return
        }

        // ── CAS 2 : code PKCE (Google OAuth / magic link) ────────────
        if (code) {
          const { error } = await supabase.auth.exchangeCodeForSession(code)
          if (error) {
            window.location.replace('/login?error=invalid_code')
            return
          }
          if (type === 'recovery') {
            window.location.replace('/auth/update-password')
          } else {
            window.location.replace('/')
          }
          return
        }

        // ── CAS 3 : hash fragment (ancien flow Supabase) ─────────────
        if (hash && hash.length > 1) {
          const params        = new URLSearchParams(hash.replace('#', ''))
          const access_token  = params.get('access_token')
          const refresh_token = params.get('refresh_token')
          const hashType      = params.get('type')

          if (access_token && refresh_token) {
            await supabase.auth.setSession({ access_token, refresh_token })
          }

          if (hashType === 'recovery') {
            window.location.replace('/auth/update-password')
          } else {
            window.location.replace('/')
          }
          return
        }

        // ── CAS 4 : rien dans l'URL — vérifier session existante ─────
        const { data: { session } } = await supabase.auth.getSession()
        window.location.replace(session ? '/' : '/login')

      } catch (err) {
        console.error('Auth callback error:', err)
        window.location.replace('/login')
      }
    }

    handleAuth()
  }, [])

  return (
    <div style={{ minHeight:'100vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', background:'#0a0a1a', color:'white', fontFamily:'system-ui', gap:16 }}>
      <div style={{ width:44, height:44, borderRadius:'50%', border:'3px solid rgba(79,110,247,0.25)', borderTopColor:'#4f6ef7', animation:'spin 0.8s linear infinite' }} />
      <p style={{ color:'rgba(255,255,255,0.45)', fontSize:14, margin:0 }}>Authentification en cours…</p>
      <style suppressHydrationWarning>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  )
}
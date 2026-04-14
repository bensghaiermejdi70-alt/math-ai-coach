'use client'
import { useEffect, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function AuthCallback() {
  const ran = useRef(false)

  useEffect(() => {
    if (ran.current) return
    ran.current = true

    const supabase = createClient()

    const run = async () => {
      const url       = new URL(window.location.href)
      const tokenHash = url.searchParams.get('token_hash')
      const type      = url.searchParams.get('type')
      const code      = url.searchParams.get('code')

      // ── Reset password avec token_hash ────────────────────────
      if (tokenHash && type === 'recovery') {
        // Utiliser le token directement (sans nettoyage pkce_)
        const { data, error } = await supabase.auth.verifyOtp({
          token_hash: tokenHash,
          type: 'recovery',
        })

        if (error) {
          console.error('verifyOtp error:', error.message)
          window.location.replace('/login?error=lien_expiré')
          return
        }

        // ✅ CRUCIAL pour @supabase/ssr : 
        // Attendre que les cookies soient bien enregistrés avant de rediriger
        if (data?.session) {
          // Force un refresh de la session pour s'assurer que les cookies sont set
          await supabase.auth.setSession({
            access_token: data.session.access_token,
            refresh_token: data.session.refresh_token,
          })
          
          // Attendre que les cookies se propagent (important pour SSR)
          await new Promise(resolve => setTimeout(resolve, 500))
          
          // Vérifier que la session est bien là avant de partir
          const { data: { session } } = await supabase.auth.getSession()
          if (session) {
            console.log('✅ Session établie, redirection...')
            window.location.replace('/auth/update-password')
            return
          }
        }
        
        window.location.replace('/login?error=session_failed')
        return
      }

      // ── Google OAuth (PKCE flow) ─────────────────────────────
      if (code) {
        const { error } = await supabase.auth.exchangeCodeForSession(code)
        if (error) {
          console.error('exchangeCodeForSession error:', error)
          window.location.replace('/login')
          return
        }
        window.location.replace('/')
        return
      }

      // ── Fallback ─────────────────────────────────────────────
      const { data: { session } } = await supabase.auth.getSession()
      window.location.replace(session ? '/' : '/login')
    }

    run()
  }, [])

  return (
    <div style={{ minHeight:'100vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', background:'#0a0a1a', color:'white', fontFamily:'system-ui', gap:16 }}>
      <div style={{ width:44, height:44, borderRadius:'50%', border:'3px solid rgba(79,110,247,0.25)', borderTopColor:'#4f6ef7', animation:'spin 0.8s linear infinite' }} />
      <p style={{ color:'rgba(255,255,255,0.45)', fontSize:14, margin:0 }}>Vérification en cours...</p>
      <style suppressHydrationWarning>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  )
}
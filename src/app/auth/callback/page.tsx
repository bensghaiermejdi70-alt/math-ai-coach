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
      try {
        const url       = new URL(window.location.href)
        const tokenHash = url.searchParams.get('token_hash')
        const type      = url.searchParams.get('type')
        const code      = url.searchParams.get('code')

        console.log('🔍 Callback params:', { tokenHash: tokenHash?.substring(0, 20) + '...', type, code: code?.substring(0, 10) })

        // ── Reset password ────────────────────────────────────────
        if (tokenHash && type === 'recovery') {
          console.log('🔄 Recovery flow detected')
          
          // Certains tokens ont un préfixe pkce_ qu'il faut nettoyer
          const cleanHash = tokenHash.startsWith('pkce_') 
            ? tokenHash.slice(5) 
            : tokenHash

          console.log('📝 Verifying OTP...')
          const { data, error } = await supabase.auth.verifyOtp({
            token_hash: cleanHash,
            type: 'recovery',
          })

          if (error) {
            console.error('❌ verifyOtp error:', error.message)
            window.location.replace('/login?error=' + encodeURIComponent(error.message))
            return
          }

          console.log('✅ OTP verified, session:', data.session ? 'present' : 'missing')

          if (data?.session) {
            // Forcer l'enregistrement de la session dans les cookies (@supabase/ssr)
            console.log('💾 Setting session...')
            const { error: sessionError } = await supabase.auth.setSession({
              access_token: data.session.access_token,
              refresh_token: data.session.refresh_token,
            })

            if (sessionError) {
              console.error('❌ setSession error:', sessionError)
              window.location.replace('/login?error=session_error')
              return
            }

            // Attendre que les cookies soient bien écrits
            console.log('⏳ Waiting for cookies...')
            await new Promise(resolve => setTimeout(resolve, 800))
            
            console.log('🚀 Redirecting to update-password')
            window.location.href = '/auth/update-password'
            return
          } else {
            console.error('❌ No session in verifyOtp response')
            window.location.replace('/login?error=no_session')
            return
          }
        }

        // ── Google OAuth ──────────────────────────────────────────
        if (code) {
          console.log('🔄 OAuth flow detected')
          const { error } = await supabase.auth.exchangeCodeForSession(code)
          if (error) {
            console.error('❌ OAuth error:', error)
            window.location.replace('/login')
            return
          }
          window.location.replace('/')
          return
        }

        // ── Fallback ─────────────────────────────────────────────
        console.log('🔄 Checking existing session...')
        const { data: { session } } = await supabase.auth.getSession()
        console.log('📊 Existing session:', session ? 'present' : 'none')
        window.location.replace(session ? '/' : '/login')
        
      } catch (err) {
        console.error('💥 Unexpected error:', err)
        window.location.replace('/login?error=unexpected')
      }
    }

    run()
  }, [])

  return (
    <div style={{ minHeight:'100vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', background:'#0a0a1a', color:'white', fontFamily:'system-ui', gap:16 }}>
      <div style={{ width:44, height:44, borderRadius:'50%', border:'3px solid rgba(79,110,247,0.25)', borderTopColor:'#4f6ef7', animation:'spin 0.8s linear infinite' }} />
      <p style={{ color:'rgba(255,255,255,0.45)', fontSize:14, margin:0 }}>Vérification en cours...</p>
      <p style={{ color:'rgba(255,255,255,0.3)', fontSize:12, margin:0 }}>Si cela dure plus de 5 secondes, rafraîchis la page</p>
      <style suppressHydrationWarning>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  )
}
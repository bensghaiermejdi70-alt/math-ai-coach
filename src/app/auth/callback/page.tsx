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
        const code      = url.searchParams.get('code')
        const type      = url.searchParams.get('type')
        const tokenHash = url.searchParams.get('token_hash')

        console.log('🔍 Params:', { code: code?.slice(0,10), type, tokenHash: tokenHash?.slice(0,10) })

        // ── Recovery avec Code (PKCE) ─────────────────────────────
        if (code && type === 'recovery') {
          console.log('🔄 Recovery PKCE flow')
          
          const { data, error } = await supabase.auth.exchangeCodeForSession(code)
          
          if (error) {
            console.error('❌ exchangeCodeForSession error:', error.message)
            window.location.replace('/login?error=' + encodeURIComponent(error.message))
            return
          }

          console.log('✅ Session exchanged')

          if (data?.session) {
            // Attendre que les cookies SSR soient écrits
            await new Promise(resolve => setTimeout(resolve, 500))
            
            console.log('🚀 Redirecting to update-password')
            window.location.replace('/auth/update-password')
            return
          }
        }

        // ── Ancien flow token_hash (fallback) ─────────────────────
        if (tokenHash && type === 'recovery') {
          console.log('🔄 Recovery token_hash flow')
          
          const { data, error } = await supabase.auth.verifyOtp({
            token_hash: tokenHash,
            type: 'recovery',
          })

          if (error) {
            console.error('❌ verifyOtp error:', error.message)
            window.location.replace('/login?error=' + encodeURIComponent(error.message))
            return
          }

          if (data?.session) {
            await supabase.auth.setSession({
              access_token: data.session.access_token,
              refresh_token: data.session.refresh_token,
            })
            
            await new Promise(resolve => setTimeout(resolve, 500))
            window.location.replace('/auth/update-password')
            return
          }
        }

        // ── Google OAuth ──────────────────────────────────────────
        if (code && !type) {
          console.log('🔄 Google OAuth flow')
          const { error } = await supabase.auth.exchangeCodeForSession(code)
          if (error) {
            window.location.replace('/login')
            return
          }
          window.location.replace('/')
          return
        }

        // ── Fallback ─────────────────────────────────────────────
        const { data: { session } } = await supabase.auth.getSession()
        window.location.replace(session ? '/' : '/login')
        
      } catch (err) {
        console.error('💥 Error:', err)
        window.location.replace('/login?error=erreur_systeme')
      }
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
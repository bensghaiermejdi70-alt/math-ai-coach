'use client'
import { useEffect, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function AuthCallback() {
  const ran = useRef(false)

  useEffect(() => {
    if (ran.current) return
    ran.current = true

    const run = async () => {
      try {
        const url       = new URL(window.location.href)
        const tokenHash = url.searchParams.get('token_hash')
        const type      = url.searchParams.get('type')
        const code      = url.searchParams.get('code')

        console.log('🔍 URL:', window.location.href)
        console.log('🔍 tokenHash:', tokenHash?.slice(0, 20))

        // ── Reset password ────────────────────────────────────────
        if (tokenHash && type === 'recovery') {
          console.log('🔄 Recovery flow')
          
          const supabase = createClient()
          
          // Vérifier le token et créer la session
          const { data, error } = await supabase.auth.verifyOtp({
            token_hash: tokenHash,
            type: 'recovery',
          })

          if (error) {
            console.error('❌ verifyOtp error:', error.message)
            window.location.replace('/login?error=' + encodeURIComponent(error.message))
            return
          }

          console.log('✅ verifyOtp success')

          // AVEC @supabase/ssr, la session devrait être automatiquement 
          // stockée dans les cookies par le client
          
          // Attendre un peu et vérifier
          await new Promise(resolve => setTimeout(resolve, 500))
          
          const { data: { session } } = await supabase.auth.getSession()
          console.log('📊 Session after verify:', session ? 'found' : 'not found')

          if (session) {
            console.log('🚀 Redirecting to update-password')
            window.location.replace('/auth/update-password')
            return
          } else {
            // Si pas de session, essayer de la récupérer depuis le localStorage
            // (parfois @supabase/ssr a besoin d'un coup de pouce)
            console.log('⚠️ No session, trying refresh...')
            
            const { data: { session: refreshedSession }, error: refreshError } = 
              await supabase.auth.refreshSession()
            
            if (refreshError) {
              console.error('❌ Refresh error:', refreshError)
            }
            
            if (refreshedSession) {
              console.log('✅ Session refreshed')
              window.location.replace('/auth/update-password')
              return
            }
            
            // Dernier recours : rediriger quand même et laisser update-password gérer
            console.log('⚠️ Redirecting anyway...')
            window.location.replace('/auth/update-password')
            return
          }
        }

        // ── Google OAuth ──────────────────────────────────────────
        if (code) {
          const supabase = createClient()
          const { error } = await supabase.auth.exchangeCodeForSession(code)
          if (error) {
            window.location.replace('/login')
            return
          }
          window.location.replace('/')
          return
        }

        // ── Fallback ─────────────────────────────────────────────
        const supabase = createClient()
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
      <p style={{ color:'rgba(255,255,255,0.3)', fontSize:11, margin:0 }}>Si cela dure, vérifie la console (F12)</p>
      <style suppressHydrationWarning>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  )
}
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
      const hash      = window.location.hash

      // ── Reset password : token_hash commence par "pkce_" ─────
      if (tokenHash && type === 'recovery') {
        if (tokenHash.startsWith('pkce_')) {
          // Code PKCE → exchangeCodeForSession
          const { error } = await supabase.auth.exchangeCodeForSession(tokenHash)
          if (error) {
            window.location.replace('/login?error=lien_expire')
            return
          }
        } else {
          // OTP classique → verifyOtp
          const { error } = await supabase.auth.verifyOtp({
            token_hash: tokenHash,
            type: 'recovery',
          })
          if (error) {
            window.location.replace('/login?error=lien_expire')
            return
          }
        }
        window.location.replace('/auth/update-password')
        return
      }

      // ── Google OAuth via code PKCE ────────────────────────────
      if (code) {
        const { error } = await supabase.auth.exchangeCodeForSession(code)
        if (error) {
          window.location.replace('/login')
          return
        }
        window.location.replace('/')
        return
      }

      // ── Hash fragment ─────────────────────────────────────────
      if (hash && hash.includes('access_token')) {
        const p  = new URLSearchParams(hash.replace('#', ''))
        const at = p.get('access_token')
        const rt = p.get('refresh_token')
        const ht = p.get('type')
        if (at && rt) {
          await supabase.auth.setSession({ access_token: at, refresh_token: rt })
          window.location.replace(ht === 'recovery' ? '/auth/update-password' : '/')
          return
        }
      }

      // ── Session existante ─────────────────────────────────────
      const { data: { session } } = await supabase.auth.getSession()
      window.location.replace(session ? '/' : '/login')
    }

    run()
  }, [])

  return (
    <div style={{ minHeight:'100vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', background:'#0a0a1a', color:'white', fontFamily:'system-ui', gap:16 }}>
      <div style={{ width:44, height:44, borderRadius:'50%', border:'3px solid rgba(79,110,247,0.25)', borderTopColor:'#4f6ef7', animation:'spin 0.8s linear infinite' }} />
      <p style={{ color:'rgba(255,255,255,0.45)', fontSize:14, margin:0 }}>Connexion en cours...</p>
      <style suppressHydrationWarning>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  )
}
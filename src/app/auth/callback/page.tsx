'use client'
// Gère Google OAuth ET reset password
// Redirige vers /auth/update-password pour le reset

import { useEffect, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function AuthCallback() {
  const ran = useRef(false)

  useEffect(() => {
    if (ran.current) return
    ran.current = true

    const supabase = createClient()

    const run = async () => {
      const url  = new URL(window.location.href)
      const code = url.searchParams.get('code')
      const type = url.searchParams.get('type')
      const token_hash = url.searchParams.get('token_hash')
      const hash = window.location.hash

      // ── 1. Recovery avec token_hash (depuis l'email) ─────────
      if (token_hash && type === 'recovery') {
        const { error } = await supabase.auth.verifyOtp({
          token_hash,
          type: 'recovery',
        })
        
        if (error) {
          console.error('Recovery error:', error)
          window.location.replace('/login?error=recovery_failed')
          return
        }
        
        // ✅ Redirection vers la page de mise à jour du mot de passe
        window.location.replace('/auth/update-password')
        return
      }

      // ── 2. Code PKCE (Google OAuth OU reset password moderne) ─
      if (code) {
        const { data, error } = await supabase.auth.exchangeCodeForSession(code)
        if (error) {
          console.error('Code exchange error:', error)
          window.location.replace('/login')
          return
        }

        // Vérifier si c'est un recovery (mot de passe oublié)
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
          if (event === 'PASSWORD_RECOVERY') {
            subscription.unsubscribe()
            window.location.replace('/auth/update-password')
          }
        })

        // Timeout 2s → si pas PASSWORD_RECOVERY c'est Google ou login normal → home
        setTimeout(() => {
          subscription.unsubscribe()
          window.location.replace('/')
        }, 2000)
        return
      }

      // ── 3. Hash fragment (ancien flow access_token) ───────────
      if (hash && hash.includes('access_token')) {
        const p    = new URLSearchParams(hash.replace('#', ''))
        const at   = p.get('access_token')
        const rt   = p.get('refresh_token')
        const type = p.get('type')
        
        if (at && rt) {
          await supabase.auth.setSession({ access_token: at, refresh_token: rt })
          if (type === 'recovery') {
            window.location.replace('/auth/update-password')
            return
          }
          window.location.replace('/')
          return
        }
      }

      // ── 4. Session existante ─────────────────────────────────
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
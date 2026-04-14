'use client'
// src/app/auth/callback/page.tsx
// Gère : Google OAuth + reset password via token_hash

import { useEffect, useState, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function AuthCallback() {
  const [status, setStatus] = useState('Connexion en cours...')
  const ran = useRef(false)

  useEffect(() => {
    if (ran.current) return
    ran.current = true

    const supabase = createClient()

    const run = async () => {
      const url       = new URL(window.location.href)
      const code      = url.searchParams.get('code')
      const tokenHash = url.searchParams.get('token_hash')
      const type      = url.searchParams.get('type')
      const next      = url.searchParams.get('next') || '/'

      // ── Reset password via token_hash ─────────────────────────
      if (tokenHash && type === 'recovery') {
        setStatus('Vérification du lien...')
        const { error } = await supabase.auth.verifyOtp({
          token_hash: tokenHash,
          type: 'recovery',
        })
        if (error) {
          console.error('verifyOtp:', error.message)
          // Même si erreur → tenter redirect (token peut être déjà consommé)
          window.location.replace('/auth/reset-password')
          return
        }
        window.location.replace('/auth/reset-password')
        return
      }

      // ── Google OAuth via code PKCE ────────────────────────────
      if (code) {
        setStatus('Finalisation connexion Google...')
        const { error } = await supabase.auth.exchangeCodeForSession(code)
        if (error) {
          window.location.replace('/login?error=google')
          return
        }
        window.location.replace(next)
        return
      }

      // ── Hash fragment (ancien flow Supabase) ──────────────────
      const hash = window.location.hash
      if (hash && hash.includes('access_token')) {
        const p    = new URLSearchParams(hash.replace('#', ''))
        const at   = p.get('access_token')
        const rt   = p.get('refresh_token')
        const htype = p.get('type')
        if (at && rt) {
          await supabase.auth.setSession({ access_token: at, refresh_token: rt })
          if (htype === 'recovery') {
            window.location.replace('/auth/reset-password')
            return
          }
          window.location.replace('/')
          return
        }
      }

      // ── Session existante ──────────────────────────────────────
      const { data: { session } } = await supabase.auth.getSession()
      if (session) {
        window.location.replace('/')
        return
      }

      window.location.replace('/login')
    }

    run()
  }, [])

  return (
    <div style={{ minHeight:'100vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', background:'#0a0a1a', color:'white', fontFamily:'system-ui', gap:16 }}>
      <div style={{ width:44, height:44, borderRadius:'50%', border:'3px solid rgba(79,110,247,0.25)', borderTopColor:'#4f6ef7', animation:'spin 0.8s linear infinite' }} />
      <p style={{ color:'rgba(255,255,255,0.45)', fontSize:14, margin:0 }}>{status}</p>
      <style suppressHydrationWarning>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  )
}
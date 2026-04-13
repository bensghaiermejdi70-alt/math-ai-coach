'use client'
import { useEffect, useState, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function AuthCallback() {
  const [status, setStatus] = useState('Vérification...')
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
      const hash      = window.location.hash

      // Log pour debug
      console.log('Callback params:', { code: !!code, tokenHash: !!tokenHash, type, hash: hash.slice(0,50) })

      // ── token_hash (email template avec .TokenHash) ───────────────
      if (tokenHash) {
        setStatus('Vérification du lien...')
        const { error } = await supabase.auth.verifyOtp({
          token_hash: tokenHash,
          type: 'recovery',
        })
        if (error) {
          console.error('verifyOtp error:', error)
          window.location.replace('/login?error=lien_expire')
          return
        }
        window.location.replace('/auth/reset-password')
        return
      }

      // ── code PKCE (Google + reset password moderne) ───────────────
      if (code) {
        setStatus('Connexion en cours...')
        const { data, error } = await supabase.auth.exchangeCodeForSession(code)
        if (error) {
          console.error('exchangeCode error:', error)
          window.location.replace('/login?error=invalid_code')
          return
        }
        // Supabase met le type dans la session après échange
        // Pour recovery, on vérifie si l'user a un recovery token
        if (type === 'recovery') {
          window.location.replace('/auth/reset-password')
          return
        }
        window.location.replace('/')
        return
      }

      // ── hash fragment ─────────────────────────────────────────────
      if (hash && hash.length > 1) {
        const p = new URLSearchParams(hash.replace('#', ''))
        const access_token  = p.get('access_token')
        const refresh_token = p.get('refresh_token')
        const hashType      = p.get('type')
        if (access_token && refresh_token) {
          await supabase.auth.setSession({ access_token, refresh_token })
          if (hashType === 'recovery') {
            window.location.replace('/auth/reset-password')
            return
          }
          window.location.replace('/')
          return
        }
      }

      // ── Vérifier session existante ────────────────────────────────
      const { data: { session } } = await supabase.auth.getSession()
      if (session) {
        window.location.replace('/')
      } else {
        setStatus('Aucune session — redirection...')
        setTimeout(() => { window.location.replace('/login') }, 1500)
      }
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
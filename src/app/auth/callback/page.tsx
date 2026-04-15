'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function AuthCallback() {
  const router = useRouter()
  const [error, setError] = useState('')

  useEffect(() => {
    const supabase = createClient()

    const handle = async () => {
      try {
        const url = new URL(window.location.href)
        let token_hash = url.searchParams.get('token_hash')
        const type = url.searchParams.get('type')
        const code = url.searchParams.get('code')

        console.log('🔍 URL:', window.location.href)
        console.log('🔍 Token brut:', token_hash?.slice(0, 30))

        // ── Recovery password ─────────────────────────────────────
        if (type === 'recovery' && token_hash) {
          
          // ✅ CORRECTION : Retirer le préfixe pkce_ si présent
          if (token_hash.startsWith('pkce_')) {
            token_hash = token_hash.slice(5)
            console.log('✂️ Token nettoyé:', token_hash.slice(0, 30))
          }

          const { error: verifyError } = await supabase.auth.verifyOtp({
            token_hash,
            type: 'recovery',
          })

          if (verifyError) {
            console.error('❌ verifyOtp error:', verifyError.message)
            setError(verifyError.message)
            setTimeout(() => {
              router.push('/login?error=' + encodeURIComponent(verifyError.message))
            }, 2000)
            return
          }

          console.log('✅ OTP verified')
          
          // Attendre un peu pour la persistance
          await new Promise(r => setTimeout(r, 300))
          
          router.push('/auth/update-password')
          return
        }

        // ── Google OAuth ────────────────────────────────────────
        if (code) {
          const { error: oauthError } = await supabase.auth.exchangeCodeForSession(code)
          if (oauthError) {
            router.push('/login')
            return
          }
          router.push('/')
          return
        }

        // ── Fallback ────────────────────────────────────────────
        const { data: { session } } = await supabase.auth.getSession()
        router.push(session ? '/' : '/login')

      } catch (err) {
        console.error('💥 Error:', err)
        router.push('/login?error=erreur_systeme')
      }
    }

    handle()
  }, [router])

  if (error) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center', 
        justifyContent: 'center', 
        background: '#0a0a1a', 
        color: 'white',
        gap: 16 
      }}>
        <div style={{ fontSize: 48 }}>⚠️</div>
        <p style={{ color: '#fca5a5' }}>{error}</p>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14 }}>Redirection...</p>
      </div>
    )
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center', 
      justifyContent: 'center', 
      background: '#0a0a1a', 
      color: 'white',
      gap: 16 
    }}>
      <div style={{ 
        width: 44, 
        height: 44, 
        borderRadius: '50%', 
        border: '3px solid rgba(79,110,247,0.25)', 
        borderTopColor: '#4f6ef7', 
        animation: 'spin 0.8s linear infinite' 
      }} />
      <p style={{ color: 'rgba(255,255,255,0.45)' }}>Vérification...</p>
      <style suppressHydrationWarning>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  )
}
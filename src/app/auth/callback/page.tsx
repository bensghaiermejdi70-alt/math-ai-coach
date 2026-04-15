'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function AuthCallback() {
  const router = useRouter()
  const [error, setError] = useState('')
  const [status, setStatus] = useState('Initialisation...')

  useEffect(() => {
    const supabase = createClient()

    const handle = async () => {
      try {
        setStatus('Analyse de l\'URL...')
        const url = new URL(window.location.href)
        const token_hash = url.searchParams.get('token_hash')
        const type = url.searchParams.get('type')
        const code = url.searchParams.get('code')

        console.log('🔍 URL:', window.location.href)
        console.log('🔍 Token:', token_hash?.slice(0, 40))
        console.log('🔍 Type:', type)

        // ── Recovery password ─────────────────────────────────────
        if (type === 'recovery' && token_hash) {
          setStatus('Vérification du token de récupération...')
          
          // ✅ NOUVELLE APPROCHE : Nettoyer le token pkce_ et utiliser verifyOtp
          // Le token pkce_XXXX est au format pkce_verifier + hash
          // On doit extraire la partie après pkce_
          
          let cleanToken = token_hash
          if (token_hash.startsWith('pkce_')) {
            cleanToken = token_hash.substring(5) // Enlever "pkce_"
            console.log('📝 Token nettoyé:', cleanToken.slice(0, 30))
          }

          // Essayer verifyOtp avec le token nettoyé
          setStatus('Vérification OTP...')
          const { data, error: verifyError } = await supabase.auth.verifyOtp({
            token_hash: cleanToken,
            type: 'recovery',
          })

          if (verifyError) {
            console.error('❌ verifyOtp error:', verifyError.message)
            
            // Si ça échoue, essayer avec le token complet (au cas où)
            console.log('🔄 Retry avec token complet...')
            const { error: retryError } = await supabase.auth.verifyOtp({
              token_hash: token_hash, // Token original avec pkce_
              type: 'recovery',
            })
            
            if (retryError) {
              setError('Lien invalide ou expiré. Veuillez demander un nouveau lien.')
              setTimeout(() => {
                router.push('/login?error=lien_expire')
              }, 3000)
              return
            }
          }

          console.log('✅ OTP verified, session:', data?.session ? 'présente' : 'absente')
          setStatus('Session établie, redirection...')

          // Attendre que les cookies soient écrits
          await new Promise(r => setTimeout(r, 800))
          
          // Vérifier que la session est bien là
          const { data: { session } } = await supabase.auth.getSession()
          
          if (session) {
            console.log('✅ Session confirmée, redirection update-password')
            router.push('/auth/update-password')
          } else {
            console.error('❌ Session non trouvée après verifyOtp')
            setError('Erreur de session. Veuillez réessayer.')
            setTimeout(() => {
              router.push('/login?error=session_error')
            }, 3000)
          }
          return
        }

        // ── Google OAuth ────────────────────────────────────────
        if (code) {
          setStatus('Connexion Google...')
          const { error: oauthError } = await supabase.auth.exchangeCodeForSession(code)
          if (oauthError) {
            router.push('/login')
            return
          }
          router.push('/')
          return
        }

        // ── Fallback ────────────────────────────────────────────
        setStatus('Vérification session existante...')
        const { data: { session } } = await supabase.auth.getSession()
        router.push(session ? '/' : '/login')

      } catch (err) {
        console.error('💥 Error:', err)
        setError('Erreur inattendue')
        setTimeout(() => {
          router.push('/login?error=erreur_systeme')
        }, 2000)
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
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12 }}>Redirection...</p>
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
      gap: 12 
    }}>
      <div style={{ 
        width: 44, 
        height: 44, 
        borderRadius: '50%', 
        border: '3px solid rgba(79,110,247,0.25)', 
        borderTopColor: '#4f6ef7', 
        animation: 'spin 0.8s linear infinite' 
      }} />
      <p style={{ color: 'rgba(255,255,255,0.45)' }}>{status}</p>
      <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 11 }}>Si cela dure, vérifie la console (F12)</p>
      <style suppressHydrationWarning>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  )
}
'use client'

import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function AuthCallback() {
  const router = useRouter()
  const [error, setError] = useState('')
  const [status, setStatus] = useState('Initialisation...')
  
  const hasProcessed = useRef(false)

  useEffect(() => {
    if (hasProcessed.current) return
    hasProcessed.current = true

    const supabase = createClient()

    const handle = async () => {
      try {
        const url = new URL(window.location.href)
        const token_hash = url.searchParams.get('token_hash')
        const type = url.searchParams.get('type')
        const code = url.searchParams.get('code')

        console.log('🔍 URL:', window.location.href)
        console.log('🔍 Token:', token_hash?.slice(0, 40))
        console.log('🔍 Type:', type)
        console.log('🔍 Code présent:', !!code)

        // ── Recovery password ─────────────────────────────────────
        if (type === 'recovery' && token_hash) {
          setStatus('Vérification du token de récupération...')
          
          let cleanToken = token_hash
          if (token_hash.startsWith('pkce_')) {
            cleanToken = token_hash.substring(5)
          }

          const { error: verifyError } = await supabase.auth.verifyOtp({
            token_hash: cleanToken,
            type: 'recovery',
          })

          if (verifyError) {
            const { error: retryError } = await supabase.auth.verifyOtp({
              token_hash: token_hash,
              type: 'recovery',
            })
            
            if (retryError) {
              setError('Lien invalide ou expiré.')
              setTimeout(() => router.push('/login?error=lien_expire'), 3000)
              return
            }
          }

          await new Promise(r => setTimeout(r, 800))
          const { data: { session } } = await supabase.auth.getSession()
          router.push(session ? '/auth/update-password' : '/login?error=session_error')
          return
        }

        // ── Google OAuth ────────────────────────────────────────
        if (code) {
          setStatus('Connexion Google en cours...')
          
          // ✅ APPROCHE DÉFINITIVE : Utiliser onAuthStateChange
          // Le client Supabase traite le code automatiquement avec detectSessionInUrl
          // On écoute l'événement SIGNED_IN qui est émis quand c'est prêt

          let resolved = false

          // 1. S'abonner à l'événement auth
          const { data: { subscription } } = supabase.auth.onAuthStateChange(
            (event, session) => {
              console.log('🔄 Auth event:', event)
              
              if (resolved) return
              
              if (event === 'SIGNED_IN' && session) {
                resolved = true
                console.log('✅ SIGNED_IN reçu, user:', session.user.email)
                subscription.unsubscribe()
                router.push('/')
              }
              
              if (event === 'SIGNED_OUT') {
                resolved = true
                subscription.unsubscribe()
                setError('Connexion annulée.')
                setTimeout(() => router.push('/login'), 3000)
              }
            }
          )

          // 2. Vérification immédiate (au cas où l'événement est déjà passé)
          const { data: { session: existingSession } } = await supabase.auth.getSession()
          if (existingSession && !resolved) {
            resolved = true
            console.log('✅ Session déjà présente')
            subscription.unsubscribe()
            router.push('/')
            return
          }

          // 3. Timeout de sécurité (10 secondes)
          setTimeout(() => {
            if (!resolved) {
              resolved = true
              subscription.unsubscribe()
              console.error('⏱️ Timeout - aucun événement auth reçu')
              setError('La connexion a pris trop de temps.')
              setTimeout(() => router.push('/login?error=timeout'), 3000)
            }
          }, 10000)

          return
        }

        // ── Fallback ────────────────────────────────────────────
        const { data: { session } } = await supabase.auth.getSession()
        router.push(session ? '/' : '/login')

      } catch (err: any) {
        console.error('💥 Error:', err)
        setError('Erreur: ' + (err?.message || 'Inconnue'))
        setTimeout(() => router.push('/login?error=erreur'), 2000)
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
'use client'

import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { claimDeviceSlot, clearAllSupabaseStorage, markAsKicked } from '@/lib/auth/deviceSession'

export default function AuthCallback() {
  const router = useRouter()
  const [error, setError] = useState('')
  const [status, setStatus] = useState('Initialisation...')
  const hasProcessed = useRef(false)

  useEffect(() => {
    if (hasProcessed.current) return
    hasProcessed.current = true

    const supabase = createClient()

    const finalizeLogin = async (session: any) => {
      try {
        const claim = await claimDeviceSlot(supabase, session.user.id, session.user.email)
        if (!claim.ok) {
          console.warn('BLOCAGE (device limit):', claim.error)
          clearAllSupabaseStorage()
          markAsKicked()
          await supabase.auth.signOut().catch(() => {})
          setError(claim.error)
          setTimeout(() => router.push('/login?error=' + encodeURIComponent(claim.error)), 3000)
          return
        }
      } catch (e) {
        console.error('Erreur verification appareil:', e)
      }
      router.push('/')
    }

    const handle = async () => {
      try {
        const url = new URL(window.location.href)
        const token_hash = url.searchParams.get('token_hash')
        const type = url.searchParams.get('type')
        const code = url.searchParams.get('code')

        if (type === 'recovery' && token_hash) {
          setStatus('Verification du token de recuperation...')
          let cleanToken = token_hash
          if (token_hash.startsWith('pkce_')) cleanToken = token_hash.substring(5)

          const { error: verifyError } = await supabase.auth.verifyOtp({ token_hash: cleanToken, type: 'recovery' })
          if (verifyError) {
            const { error: retryError } = await supabase.auth.verifyOtp({ token_hash, type: 'recovery' })
            if (retryError) {
              setError('Lien invalide ou expire.')
              setTimeout(() => router.push('/login?error=lien_expire'), 3000)
              return
            }
          }
          await new Promise(r => setTimeout(r, 800))
          const { data: { session } } = await supabase.auth.getSession()
          router.push(session ? '/auth/update-password' : '/login?error=session_error')
          return
        }

        if (code) {
          setStatus('Connexion Google en cours...')
          let resolved = false

          const { data: { subscription } } = supabase.auth.onAuthStateChange(
            (event: string, session: any) => {
              if (resolved) return
              if (event === 'SIGNED_IN' && session) {
                resolved = true
                subscription.unsubscribe()
                finalizeLogin(session)
              }
              if (event === 'SIGNED_OUT') {
                resolved = true
                subscription.unsubscribe()
                setError('Connexion annulee.')
                setTimeout(() => router.push('/login'), 3000)
              }
            }
          )

          const { data: { session: existingSession } } = await supabase.auth.getSession()
          if (existingSession && !resolved) {
            resolved = true
            subscription.unsubscribe()
            finalizeLogin(existingSession)
            return
          }

          setTimeout(() => {
            if (!resolved) {
              resolved = true
              subscription.unsubscribe()
              setError('La connexion a pris trop de temps.')
              setTimeout(() => router.push('/login?error=timeout'), 3000)
            }
          }, 10000)
          return
        }

        const { data: { session } } = await supabase.auth.getSession()
        if (session) await finalizeLogin(session)
        else router.push('/login')

      } catch (err: any) {
        console.error('Error:', err)
        setError('Erreur: ' + (err?.message || 'Inconnue'))
        setTimeout(() => router.push('/login?error=erreur'), 2000)
      }
    }

    handle()
  }, [router])

  if (error) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#0a0a1a', color: 'white', gap: 16 }}>
        <div style={{ fontSize: 48 }}>⚠️</div>
        <p style={{ color: '#fca5a5' }}>{error}</p>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12 }}>Redirection...</p>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#0a0a1a', color: 'white', gap: 12 }}>
      <div style={{ width: 44, height: 44, borderRadius: '50%', border: '3px solid rgba(79,110,247,0.25)', borderTopColor: '#4f6ef7', animation: 'spin 0.8s linear infinite' }} />
      <p style={{ color: 'rgba(255,255,255,0.45)' }}>{status}</p>
      <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 11 }}>Si cela dure, verifie la console (F12)</p>
      <style suppressHydrationWarning>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  )
}
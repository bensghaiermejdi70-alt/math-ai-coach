'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function AuthCallback() {
  const router = useRouter()

  useEffect(() => {
    const supabase = createClient()

    const handleAuth = async () => {
      try {
        // 🔥 Récupérer le code de l'URL (PKCE)
        const url = new URL(window.location.href)
        const code = url.searchParams.get('code')

        if (code) {
          // Échanger le code contre une session
          const { error } = await supabase.auth.exchangeCodeForSession(code)
          
          if (error) {
            console.error('Erreur échange code:', error)
            router.push('/login?error=invalid_code')
            return
          }
        }

        // 🔥 Vérifier si c'est une récupération de mot de passe
        // Supabase met 'type=recovery' dans le hash ou dans les params
        const hash = window.location.hash
        const isRecovery = hash.includes('type=recovery') || 
                          url.searchParams.get('type') === 'recovery'

        if (isRecovery) {
          // 👈 Redirige vers TA page update-password
          router.push('/auth/update-password')
          return
        }

        // 🔥 Sinon c'est un login normal (Google, etc.)
        router.push('/')

      } catch (e) {
        console.error(e)
        router.push('/login')
      }
    }

    handleAuth()
  }, [router])

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0f172a', color: 'white' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 40, marginBottom: 10 }}>⏳</div>
        <p>Connexion en cours...</p>
      </div>
    </div>
  )
}
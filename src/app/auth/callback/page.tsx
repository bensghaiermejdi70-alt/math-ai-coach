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
        // 🔥 Récupère la session depuis l'URL (IMPORTANT pour reset password)
        const { data, error } = await supabase.auth.getSession()

        if (error) {
          console.error(error)
          router.push('/login')
          return
        }

        // 🔥 Si reset password → rediriger vers page changement mot de passe
        const hash = window.location.hash

        if (hash.includes('type=recovery')) {
          router.push('/reset-password') // 👈 IMPORTANT
          return
        }

        // 🔥 Sinon login normal (Google etc)
        router.push('/')

      } catch (e) {
        console.error(e)
        router.push('/login')
      }
    }

    handleAuth()
  }, [])

  return (
    <div style={{ padding: 40, textAlign: 'center' }}>
      🔄 Connexion en cours...
    </div>
  )
}
'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function AuthCallback() {
  const router = useRouter()

  useEffect(() => {
    const supabase = createClient()

    const handleAuth = async () => {
      await supabase.auth.getSession()

      // 🔥 redirection après login / reset password
      router.push('/')
    }

    handleAuth()
  }, [])

  return (
    <div style={{ padding: 40 }}>
      🔄 Connexion en cours...
    </div>
  )
}
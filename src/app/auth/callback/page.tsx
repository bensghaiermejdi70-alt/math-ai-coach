'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function AuthCallback() {
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const handleAuth = async () => {
      await supabase.auth.getSession()
      router.push('/')
    }

    handleAuth()
  }, [])

  return <p style={{padding:20}}>Connexion en cours...</p>
}
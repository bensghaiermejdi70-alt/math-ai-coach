'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function ResetPasswordPage() {
  const supabase = createClient()
  const router = useRouter()

  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleUpdate = async () => {
    setLoading(true)

    const { error } = await supabase.auth.updateUser({
      password
    })

    if (error) {
      alert(error.message)
      setLoading(false)
      return
    }

    alert('Mot de passe mis à jour ✅')
    router.push('/')
  }

  return (
    <div style={{ padding: 40, textAlign: 'center' }}>
      <h1>Nouveau mot de passe</h1>

      <input
        type="password"
        placeholder="Nouveau mot de passe"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ marginTop: 20, padding: 10 }}
      />

      <br /><br />

      <button onClick={handleUpdate} disabled={loading}>
        {loading ? '...' : 'Mettre à jour'}
      </button>
    </div>
  )
}
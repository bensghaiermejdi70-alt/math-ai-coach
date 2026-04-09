'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function UpdatePasswordPage() {
  const supabase = createClient()
  const router = useRouter()

  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    setMessage('')

    const { error } = await supabase.auth.updateUser({
      password
    })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    setMessage('✅ Mot de passe mis à jour !')
    setLoading(false)

    setTimeout(() => {
      router.push('/')
    }, 1500)
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{ width: 400 }}>

        <h2>🔐 Nouveau mot de passe</h2>

        {error && <p style={{ color: 'red' }}>{error}</p>}
        {message && <p style={{ color: 'green' }}>{message}</p>}

        <form onSubmit={handleUpdate}>
          <input
            type="password"
            placeholder="Nouveau mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '100%', marginBottom: 10 }}
          />

          <button type="submit" disabled={loading}>
            {loading ? 'Mise à jour...' : 'Changer le mot de passe'}
          </button>
        </form>

      </div>
    </div>
  )
}
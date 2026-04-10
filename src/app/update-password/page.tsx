'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function Page() {
  const supabase = createClient()

  const [password, setPassword] = useState<string>('')
  const [showPwd, setShowPwd] = useState(false)
  const [loading, setLoading] = useState(false)
  const [ready, setReady] = useState(false)
  const [error, setError] = useState<string>('')
  const [message, setMessage] = useState<string>('')

  useEffect(() => {
    const init = async () => {
      try {
        const { error } = await supabase.auth.exchangeCodeForSession(
          window.location.href
        )

        if (error) {
          setError('Lien invalide ou expiré')
          return
        }

        setReady(true)
      } catch {
        setError('Erreur de session')
      }
    }

    init()
  }, [])

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setLoading(true)
    setError('')
    setMessage('')

    if (!password || password.length < 6) {
      setError('Mot de passe trop court (min 6 caractères)')
      setLoading(false)
      return
    }

    const { error } = await supabase.auth.updateUser({
      password
    })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    setMessage('Mot de passe mis à jour !')

    setTimeout(() => {
      window.location.href = '/dashboard'
    }, 1500)
  }

  if (!ready) {
    return (
      <div style={{ textAlign: 'center', marginTop: 50 }}>
        🔐 Vérification du lien...
      </div>
    )
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <form onSubmit={handleUpdate} style={{ width: 400 }}>
        <h2>🔐 Nouveau mot de passe</h2>

        {error && <p style={{ color: 'red' }}>{error}</p>}
        {message && <p style={{ color: 'green' }}>{message}</p>}

        <div style={{ position: 'relative', marginBottom: 10 }}>
          <input
            type={showPwd ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Nouveau mot de passe"
            style={{ width: '100%', padding: 10, paddingRight: 40 }}
          />

          <button
            type="button"
            onClick={() => setShowPwd(!showPwd)}
            style={{
              position: 'absolute',
              right: 10,
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            {showPwd ? '🙈' : '👁️'}
          </button>
        </div>

        <button type="submit" disabled={loading} style={{ width: '100%' }}>
          {loading ? 'Mise à jour...' : 'Changer le mot de passe'}
        </button>
      </form>
    </div>
  )
}
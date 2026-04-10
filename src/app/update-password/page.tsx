'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function UpdatePasswordPage() {
  const supabase = createClient()

  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [checking, setChecking] = useState(true)
  const [validSession, setValidSession] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    const initSession = async () => {
      try {
        const url = new URL(window.location.href)

        // 🔥 CAS 1 : ?code= (le plus fréquent)
        const code = url.searchParams.get('code')

        if (code) {
          const { error } = await supabase.auth.exchangeCodeForSession(code)

          if (error) {
            setError('Lien expiré ou invalide')
          } else {
            setValidSession(true)
          }

          setChecking(false)
          return
        }

        // 🔥 CAS 2 : #access_token (fallback)
        const hash = window.location.hash
        const params = new URLSearchParams(hash.replace('#', ''))

        const access_token = params.get('access_token')
        const refresh_token = params.get('refresh_token')

        if (access_token && refresh_token) {
          const { error } = await supabase.auth.setSession({
            access_token,
            refresh_token,
          })

          if (error) {
            setError('Erreur session')
          } else {
            setValidSession(true)
          }
        } else {
          setError('Lien invalide ou expiré')
        }
      } catch (e) {
        setError('Erreur lors de la vérification')
      }

      setChecking(false)
    }

    initSession()
  }, [])

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validSession) {
      setError('Session invalide')
      return
    }

    if (password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères')
      return
    }

    setLoading(true)
    setError('')
    setMessage('')

    const { error } = await supabase.auth.updateUser({
      password,
    })

    setLoading(false)

    if (error) {
      setError(error.message)
      return
    }

    setMessage('✅ Mot de passe mis à jour')

    setTimeout(() => {
      window.location.href = '/dashboard'
    }, 1500)
  }

  if (checking) {
    return (
      <div style={styles.center}>
        <p>Vérification du lien...</p>
      </div>
    )
  }

  if (!validSession) {
    return (
      <div style={styles.center}>
        <div style={styles.card}>
          <h2>Lien invalide</h2>
          <p style={{ color: 'red' }}>{error}</p>

          <button
            onClick={() => (window.location.href = '/login')}
            style={styles.button}
          >
            Retour à la connexion
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Changer mot de passe</h1>

        {error && <p style={{ color: 'red' }}>{error}</p>}
        {message && <p style={{ color: 'green' }}>{message}</p>}

        <form onSubmit={handleUpdatePassword}>
          <div style={styles.inputWrapper}>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Nouveau mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={styles.eyeButton}
            >
              {showPassword ? '🙈' : '👁️'}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading || !password}
            style={styles.button}
          >
            {loading ? 'Mise à jour...' : 'Mettre à jour'}
          </button>
        </form>
      </div>
    </div>
  )
}

const styles: any = {
  container: {
    display: 'flex',
    height: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#0f172a',
  },
  center: {
    display: 'flex',
    height: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#0f172a',
    color: 'white',
  },
  card: {
    background: '#111827',
    padding: 30,
    borderRadius: 12,
    width: 350,
    color: 'white',
    textAlign: 'center',
  },
  title: {
    marginBottom: 20,
    fontSize: 20,
  },
  inputWrapper: {
    position: 'relative',
    marginBottom: 15,
  },
  input: {
    width: '100%',
    padding: 10,
    paddingRight: 40,
    borderRadius: 6,
    border: '1px solid #374151',
    background: '#1f2937',
    color: 'white',
  },
  eyeButton: {
    position: 'absolute',
    right: 10,
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
  },
  button: {
    width: '100%',
    padding: 10,
    borderRadius: 6,
    border: 'none',
    background: '#3b82f6',
    color: 'white',
    cursor: 'pointer',
  },
}
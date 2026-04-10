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
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  // ✅ VERSION SIMPLE ET STABLE
  useEffect(() => {
    const init = async () => {
      try {
        const { data, error } = await supabase.auth.getSession()

        if (error || !data.session) {
          setError('Lien invalide ou expiré')
        } else {
          setValidSession(true)
        }
      } catch {
        setError('Erreur session')
      }

      setChecking(false)
    }

    init()
  }, [])

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validSession) {
      setError('Session invalide')
      return
    }

    if (password.length < 6) {
      setError('Mot de passe ≥ 6 caractères')
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

  // ⏳ CHECK SESSION
  if (checking) {
    return (
      <div style={styles.center}>
        <p>Vérification du lien...</p>
      </div>
    )
  }

  // ❌ ERREUR
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
            Retour connexion
          </button>
        </div>
      </div>
    )
  }

  // ✅ FORM
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
              required
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
            disabled={loading}
            style={styles.button}
          >
            {loading ? 'Mise à jour...' : 'Changer le mot de passe'}
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
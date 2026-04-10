'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function UpdatePasswordPage() {
  const router = useRouter()
  const supabase = createClient()

  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [checking, setChecking] = useState(true)
  const [validSession, setValidSession] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  // ✅ Vérification du token Supabase (CRITIQUE)
  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession()

      if (data.session) {
        setValidSession(true)
      } else {
        setError('Lien invalide ou expiré')
      }

      setChecking(false)
    }

    checkSession()
  }, [])

  // ✅ Update password
  const handleUpdatePassword = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()

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

    setMessage('✅ Mot de passe mis à jour avec succès')

    // 🔥 Redirection fiable (IMPORTANT)
    setTimeout(() => {
      window.location.href = '/dashboard'
    }, 1500)
  }

  // ⏳ Vérification en cours
  if (checking) {
    return (
      <div style={styles.center}>
        <p>Vérification du lien...</p>
      </div>
    )
  }

  // ❌ Lien invalide
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

  // ✅ UI principale
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
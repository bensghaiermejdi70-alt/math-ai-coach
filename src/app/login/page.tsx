'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function LoginPage() {
  const supabase = createClient()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPwd, setShowPwd] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  // 🔐 LOGIN SIMPLE ET FIABLE
  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    // ✅ redirection stable
    window.location.href = '/dashboard'
  }

  // 🔁 RESET PASSWORD
  async function handleReset() {
    if (!email) {
      alert('Entre ton email')
      return
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/update-password`,
    })

    if (error) {
      setError(error.message)
    } else {
      setMessage('📩 Email envoyé (vérifie spam)')
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>

        <h2 style={styles.title}>Connexion</h2>

        {error && <p style={styles.error}>{error}</p>}
        {message && <p style={styles.success}>{message}</p>}

        <form onSubmit={handleLogin}>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            required
          />

          <div style={styles.inputWrapper}>
            <input
              type={showPwd ? 'text' : 'password'}
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              required
            />

            <button
              type="button"
              onClick={() => setShowPwd(!showPwd)}
              style={styles.eye}
            >
              {showPwd ? '🙈' : '👁️'}
            </button>
          </div>

          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>

        </form>

        <button onClick={handleReset} style={styles.link}>
          Mot de passe oublié ?
        </button>

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
  card: {
    background: '#111827',
    padding: 30,
    borderRadius: 12,
    width: 380,
    color: 'white',
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 12,
    marginBottom: 10,
    borderRadius: 6,
    border: '1px solid #374151',
    background: '#1f2937',
    color: 'white',
  },
  inputWrapper: {
    position: 'relative',
  },
  eye: {
    position: 'absolute',
    right: 10,
    top: 12,
    background: 'none',
    border: 'none',
    cursor: 'pointer',
  },
  button: {
    width: '100%',
    padding: 12,
    borderRadius: 6,
    border: 'none',
    background: '#3b82f6',
    color: 'white',
    fontSize: 16,
    cursor: 'pointer',
    marginTop: 10,
  },
  link: {
    marginTop: 15,
    background: 'none',
    border: 'none',
    color: '#3b82f6',
    cursor: 'pointer',
    width: '100%',
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  success: {
    color: 'green',
    marginBottom: 10,
  },
}
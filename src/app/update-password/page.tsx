'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function UpdatePasswordPage() {
  const router = useRouter()
  const supabase = createClient()

  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleUpdatePassword = async () => {
    if (password.length < 6) {
      setMessage('Le mot de passe doit contenir au moins 6 caractères')
      return
    }

    setLoading(true)
    setMessage('')

    const { error } = await supabase.auth.updateUser({
      password: password,
    })

    setLoading(false)

    if (error) {
      setMessage(error.message)
      return
    }

    setMessage('Mot de passe mis à jour avec succès 🎉')

    // petite pause UX
    setTimeout(() => {
      router.push('/dashboard')
    }, 800)
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Changer mot de passe</h1>

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
          onClick={handleUpdatePassword}
          disabled={loading}
          style={styles.button}
        >
          {loading ? 'Mise à jour...' : 'Mettre à jour'}
        </button>

        {message && <p style={styles.message}>{message}</p>}
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
    width: 350,
    color: 'white',
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
    top: 8,
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    fontSize: 16,
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
  message: {
    marginTop: 10,
    fontSize: 14,
    color: '#fbbf24',
  },
}
'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'

export default function UpdatePasswordPage() {
  const supabase = createClient()

  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [checking, setChecking] = useState(true)

  // ✅ Vérifier qu'une session existe bien (recovery)
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      
      if (!session) {
        setError('Session invalide. Veuillez recommencer la procédure.')
      }
      
      setChecking(false)
    }
    
    checkSession()
  }, [])

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setMessage('')

    if (password.length < 6) {
      setError('Minimum 6 caractères')
      return
    }

    if (password !== confirm) {
      setError('Les mots de passe ne correspondent pas')
      return
    }

    setLoading(true)

    const { error: updateError } = await supabase.auth.updateUser({
      password,
    })

    setLoading(false)

    if (updateError) {
      setError(updateError.message)
    } else {
      setMessage('✅ Mot de passe changé avec succès !')
      setTimeout(() => {
        window.location.href = '/login?updated=1'
      }, 1500)
    }
  }

  if (checking) {
    return (
      <div style={styles.page}>
        <div style={{ textAlign: 'center' }}>
          <div style={styles.spinner} />
          <p style={{ color: 'rgba(255,255,255,0.4)', marginTop: 16 }}>Vérification...</p>
          <style suppressHydrationWarning>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
        </div>
      </div>
    )
  }

  if (error && !password) {
    return (
      <div style={styles.page}>
        <div style={{ textAlign: 'center', maxWidth: 400 }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>⚠️</div>
          <h2 style={{ color: 'white', marginBottom: 8 }}>Erreur</h2>
          <p style={{ color: '#fca5a5', marginBottom: 24 }}>{error}</p>
          <Link href="/login" style={{ color: '#4f6ef7', textDecoration: 'none' }}>
            ← Retour à la connexion
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div style={styles.page}>
      <div style={{ width: '100%', maxWidth: 400 }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>🔐</div>
          <h1 style={{ color: 'white', fontSize: 22, fontWeight: 900, margin: '0 0 6px' }}>
            Nouveau mot de passe
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13 }}>
            Choisis un mot de passe sécurisé
          </p>
        </div>

        <div style={styles.card}>
          {error && (
            <div style={styles.alert}>⚠️ {error}</div>
          )}
          
          {message && (
            <div style={{ ...styles.alert, background: 'rgba(6,214,160,0.1)', borderColor: 'rgba(6,214,160,0.3)', color: '#6ee7b7' }}>
              {message}
            </div>
          )}

          <form onSubmit={handleUpdate}>
            <div style={{ marginBottom: 16 }}>
              <label style={styles.label}>Nouveau mot de passe</label>
              <input
                type="password"
                placeholder="Minimum 6 caractères"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                style={styles.input}
                autoComplete="new-password"
              />
            </div>

            <div style={{ marginBottom: 24 }}>
              <label style={styles.label}>Confirmer</label>
              <input
                type="password"
                placeholder="Répète le mot de passe"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                required
                style={{
                  ...styles.input,
                  borderColor: confirm && confirm !== password 
                    ? 'rgba(239,68,68,0.5)' 
                    : 'rgba(255,255,255,0.12)'
                }}
                autoComplete="new-password"
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              style={{
                ...styles.button,
                opacity: loading ? 0.7 : 1,
                cursor: loading ? 'not-allowed' : 'pointer'
              }}
            >
              {loading ? 'Mise à jour...' : '✅ Changer mon mot de passe'}
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: 16 }}>
            <Link href="/login" style={{ color: 'rgba(255,255,255,0.35)', fontSize: 12, textDecoration: 'none' }}>
              ← Retour connexion
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

const styles: any = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#0a0a1a',
    color: 'white',
    fontFamily: 'system-ui',
    padding: '20px'
  },
  card: {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: 20,
    padding: 32
  },
  spinner: {
    width: 40,
    height: 40,
    borderRadius: '50%',
    border: '3px solid rgba(79,110,247,0.3)',
    borderTopColor: '#4f6ef7',
    animation: 'spin 0.8s linear infinite',
    margin: '0 auto'
  },
  label: {
    display: 'block',
    fontSize: 12,
    color: 'rgba(255,255,255,0.5)',
    marginBottom: 6,
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.06em'
  },
  input: {
    width: '100%',
    padding: '11px 14px',
    borderRadius: 10,
    border: '1px solid rgba(255,255,255,0.12)',
    background: 'rgba(255,255,255,0.06)',
    color: 'white',
    fontSize: 14,
    outline: 'none',
    boxSizing: 'border-box'
  },
  button: {
    width: '100%',
    padding: '13px',
    borderRadius: 12,
    border: 'none',
    background: 'linear-gradient(135deg,#4f6ef7,#7c3aed)',
    color: 'white',
    fontSize: 15,
    fontWeight: 700
  },
  alert: {
    background: 'rgba(239,68,68,0.1)',
    border: '1px solid rgba(239,68,68,0.3)',
    borderRadius: 10,
    padding: '12px 16px',
    marginBottom: 16,
    fontSize: 13,
    color: '#fca5a5'
  }
}
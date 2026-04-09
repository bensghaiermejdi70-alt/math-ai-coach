
'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/lib/auth/AuthContext'
import { createClient } from '@/lib/supabase/client'

// ✅ GOOGLE ACTIVÉ
const GOOGLE_ENABLED = true

function LoginPageInner() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const redirect = searchParams.get('redirect') || '/'

  const {
    signIn,
    signInWithGoogle,
    user,
    profile,
    isLoading
  } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPwd, setShowPwd] = useState(false)

  // 🔥 REDIRECTION FIABLE
  useEffect(() => {
    if (user) {
      window.location.href = redirect
    }
  }, [user])

  // 🔐 LOGIN EMAIL/PASSWORD
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const { error: signInError } = await signIn(email, password)

      if (signInError) {
        setError(signInError)
        setLoading(false)
        return
      }

      if (!signInError) {
        window.location.href = redirect
      }

      // redirection via useEffect

    } catch (err) {
      setError("Une erreur est survenue lors de la connexion")
      setLoading(false)
    }
  }

  // 🔵 GOOGLE LOGIN
  async function handleGoogleLogin() {
    try {
      setError('')
      await signInWithGoogle()
    } catch (e) {
      setError("Erreur connexion Google")
    }
  }

  // 🔐 RESET PASSWORD
  async function handleResetPassword() {
    if (!email) {
      alert('Entrez votre email')
      return
    }

    const supabase = createClient()

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/callback`
    })

    if (error) {
      alert('Erreur: ' + error.message)
    } else {
      alert('Email envoyé 📩')
    }
  }

  // 🔥 SI CONNECTÉ (fallback UI)
  if (!isLoading && user) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 40 }}>✅</div>
          <p>Connexion réussie... redirection</p>

          <button
            onClick={() => {
              window.location.href = redirect
            }}
            className="btn btn-primary"
          >
            Continuer →
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <div style={{ width: '100%', maxWidth: 420 }}>

        <h1 style={{ fontSize: 26, fontWeight: 700, textAlign: 'center' }}>
          Connexion
        </h1>

        <p style={{ textAlign: 'center', color: 'var(--muted)', marginBottom: 20 }}>
          Accédez à votre espace d'apprentissage
        </p>

        {error && (
          <div style={{
            background: 'rgba(239,68,68,0.1)',
            border: '1px solid rgba(239,68,68,0.3)',
            padding: 12,
            borderRadius: 10,
            marginBottom: 15,
            color: '#ef4444',
            fontSize: 13
          }}>
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="input"
            style={{ marginBottom: 12 }}
          />

          <div style={{ position: 'relative', marginBottom: 8 }}>
            <input
              type={showPwd ? 'text' : 'password'}
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input"
              style={{ paddingRight: 40 }}
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

          <div style={{ textAlign: 'right', marginBottom: 16 }}>
            <button
              type="button"
              onClick={handleResetPassword}
              style={{ background: 'none', border: 'none', color: 'var(--accent)', cursor: 'pointer' }}
            >
              Mot de passe oublié ?
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary"
            style={{ width: '100%', marginBottom: 12 }}
          >
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>

        </form>

        {/* 🔵 GOOGLE */}
        {GOOGLE_ENABLED && (
          <button
            onClick={handleGoogleLogin}
            className="btn btn-secondary"
            style={{
              width: '100%',
              marginBottom: 20,
              display: 'flex',
              justifyContent: 'center',
              gap: 8
            }}
          >
            🔵 Continuer avec Google
          </button>
        )}

        <div style={{ textAlign: 'center', fontSize: 13 }}>
          <p>
            Pas de compte ?{' '}
            <Link href="/register">S'inscrire</Link>
          </p>

          <p>
            Pas encore abonné ?{' '}
            <Link href="/abonnement">Voir les plans</Link>
          </p>
        </div>

      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Chargement...</div>}>
      <LoginPageInner />
    </Suspense>
  )
}

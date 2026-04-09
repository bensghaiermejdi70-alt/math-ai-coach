'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/lib/auth/AuthContext'

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

  // 🔥 REDIRECTION INTELLIGENTE APRÈS LOGIN
  useEffect(() => {
    if (!isLoading && user) {
      if (profile && !profile.is_active) {
        router.push('/abonnement')
      } else {
        router.push(redirect)
      }
    }
  }, [user, isLoading, profile])

  // 🔐 LOGIN EMAIL/PASSWORD
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const { error } = await signIn(email, password)

    if (error) {
      setError(error)
      setLoading(false)
      return
    }

    // redirection gérée par useEffect
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

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        background: 'var(--bg)'
      }}
    >

      <div style={{ width: '100%', maxWidth: 420 }}>

        {/* HEADER */}
        <div style={{ textAlign: 'center', marginBottom: 30 }}>
          <h1 style={{ fontSize: 26, fontWeight: 700 }}>
            Connexion
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: 13 }}>
            Accédez à votre espace d'apprentissage
          </p>
        </div>

        {/* ERROR */}
        {error && (
          <div
            style={{
              background: 'rgba(239,68,68,0.1)',
              border: '1px solid rgba(239,68,68,0.3)',
              padding: 12,
              borderRadius: 10,
              marginBottom: 15,
              color: '#ef4444',
              fontSize: 13
            }}
          >
            ⚠️ {error}
          </div>
        )}

        {/* FORM */}
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

          <div style={{ position: 'relative', marginBottom: 12 }}>
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

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary"
            style={{ width: '100%', marginBottom: 12 }}
          >
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>

        </form>

        {/* 🔵 GOOGLE LOGIN */}
        <button
          onClick={handleGoogleLogin}
          className="btn btn-secondary"
          style={{
            width: '100%',
            marginBottom: 20,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8
          }}
        >
          🔵 Continuer avec Google
        </button>

        {/* LINKS */}
        <div style={{ textAlign: 'center', fontSize: 13 }}>

          <p style={{ marginBottom: 8 }}>
            Pas de compte ?{' '}
            <Link href="/register" style={{ color: 'var(--accent)' }}>
              S'inscrire
            </Link>
          </p>

          <p style={{ marginBottom: 8 }}>
            Pas encore abonné ?{' '}
            <Link href="/abonnement" style={{ color: 'var(--gold)' }}>
              Voir les plans
            </Link>
          </p>

          <p>
            Abonnement actif ?{' '}
            <Link href="/activation" style={{ color: 'var(--teal)' }}>
              Activer mon accès
            </Link>
          </p>

        </div>

      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginPageInner />
    </Suspense>
  )
}
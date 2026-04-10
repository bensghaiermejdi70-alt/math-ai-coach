'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/lib/auth/AuthContext'
import { createClient } from '@/lib/supabase/client'

const GOOGLE_ENABLED = true

function LoginPageInner() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const redirect = searchParams.get('redirect') || '/dashboard'

  const { signIn, signInWithGoogle, user, isLoading } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPwd, setShowPwd] = useState(false)

  // 🔥 REDIRECTION STABLE
  useEffect(() => {
    if (user) {
      window.location.href = '/dashboard'
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

      window.location.href = '/dashboard'
    } catch (err) {
      setError('Erreur connexion')
      setLoading(false)
    }
  }

  // 🔵 GOOGLE LOGIN
  async function handleGoogleLogin() {
    try {
      setError('')
      await signInWithGoogle()
    } catch {
      setError('Erreur connexion Google')
    }
  }

  // 🔐 RESET PASSWORD (FIX IMPORTANT)
  async function handleResetPassword() {
  if (!email) {
    alert('Entrez votre email')
    return
  }

  const supabase = createClient()

  const redirectUrl =
    process.env.NEXT_PUBLIC_SITE_URL
      ? `${process.env.NEXT_PUBLIC_SITE_URL}/update-password`
      : `${window.location.origin}/update-password`

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: redirectUrl,
  })

  if (error) {
    alert('Erreur: ' + error.message)
  } else {
    alert('Email envoyé 📩 Vérifie ta boîte')
  }
}

  // 🔥 UI SI CONNECTÉ
  if (!isLoading && user) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 40 }}>✅</div>
          <p>Connexion réussie</p>

          <button
            onClick={() => (window.location.href = '/dashboard')}
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

        <p style={{ textAlign: 'center', marginBottom: 20 }}>
          Accédez à votre espace
        </p>

        {error && (
          <div style={{
            background: 'rgba(239,68,68,0.1)',
            border: '1px solid rgba(239,68,68,0.3)',
            padding: 12,
            borderRadius: 10,
            marginBottom: 15,
            color: '#ef4444'
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

          <div style={{ position: 'relative' }}>
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

          <div style={{ textAlign: 'right', margin: '10px 0' }}>
            <button
              type="button"
              onClick={handleResetPassword}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#3b82f6' }}
            >
              Mot de passe oublié ?
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary"
            style={{ width: '100%' }}
          >
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>

        {/* GOOGLE */}
        {GOOGLE_ENABLED && (
          <button
            onClick={handleGoogleLogin}
            className="btn btn-secondary"
            style={{ width: '100%', marginTop: 12 }}
          >
            🔵 Google
          </button>
        )}

        <div style={{ textAlign: 'center', fontSize: 13, marginTop: 20 }}>
          <Link href="/register">Créer un compte</Link>
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
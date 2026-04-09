'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/lib/auth/AuthContext'

// 🔧 CONFIGURATION : Activer Google OAuth dans Supabase puis mettre à true
const GOOGLE_ENABLED = false

function LoginPageInner() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const redirect = searchParams.get('redirect') || '/'

  const {
    signIn,
    signInWithGoogle,
    resetPassword,
    user,
    profile,
    isLoading
  } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPwd, setShowPwd] = useState(false)
  
  // États pour mot de passe oublié
  const [showForgotPassword, setShowForgotPassword] = useState(false)
  const [resetEmail, setResetEmail] = useState('')
  const [resetLoading, setResetLoading] = useState(false)
  const [resetSuccess, setResetSuccess] = useState(false)

  // 🔥 CORRECTION : Redirection forcée avec window.location si router échoue
  useEffect(() => {
    if (isLoading) return
    if (!user) return

    console.log('✅ Utilisateur connecté, redirection...')
    
    // Utiliser window.location pour une redirection forcée
    if (profile && !profile.is_active) {
      window.location.href = '/abonnement'
    } else {
      window.location.href = redirect
    }
  }, [user, profile, isLoading, redirect])

  // 🔐 LOGIN EMAIL/PASSWORD - CORRIGÉ
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      // CORRECTION : Récupérer l'utilisateur retourné
      const { error: signInError, user: loggedInUser } = await signIn(email, password)

      if (signInError) {
        setError(signInError)
        setLoading(false)
        return
      }

      // ✅ Si on a l'utilisateur, la redirection se fera via le useEffect
      if (loggedInUser) {
        console.log('Connexion réussie, attente de redirection...')
        // Le useEffect détectera le changement de `user`
      }
      
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

  // Gestion mot de passe oublié
  async function handleForgotPassword(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setResetLoading(true)
    setResetSuccess(false)

    const { error } = await resetPassword(resetEmail)

    if (error) {
      setError(error)
      setResetLoading(false)
      return
    }

    setResetSuccess(true)
    setResetLoading(false)
  }

  // Vue mot de passe oublié
  if (showForgotPassword) {
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
          <div style={{ textAlign: 'center', marginBottom: 30 }}>
            <h1 style={{ fontSize: 26, fontWeight: 700 }}>
              Mot de passe oublié
            </h1>
            <p style={{ color: 'var(--muted)', fontSize: 13 }}>
              Recevez un lien pour réinitialiser votre mot de passe
            </p>
          </div>

          {resetSuccess && (
            <div
              style={{
                background: 'rgba(6,214,160,0.1)',
                border: '1px solid rgba(6,214,160,0.3)',
                padding: 12,
                borderRadius: 10,
                marginBottom: 15,
                color: 'var(--teal)',
                fontSize: 13
              }}
            >
              ✅ Email envoyé ! Vérifiez votre boîte de réception.
            </div>
          )}

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

          {!resetSuccess && (
            <form onSubmit={handleForgotPassword}>
              <input
                type="email"
                placeholder="Votre adresse email"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                required
                className="input"
                style={{ marginBottom: 12 }}
              />

              <button
                type="submit"
                disabled={resetLoading}
                className="btn btn-primary"
                style={{ width: '100%', marginBottom: 12 }}
              >
                {resetLoading ? 'Envoi...' : 'Envoyer le lien'}
              </button>
            </form>
          )}

          <div style={{ textAlign: 'center', fontSize: 13, marginTop: 20 }}>
            <button
              onClick={() => {
                setShowForgotPassword(false)
                setResetSuccess(false)
                setError('')
              }}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--accent)',
                cursor: 'pointer',
                textDecoration: 'underline'
              }}
            >
              ← Retour à la connexion
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Si déjà connecté - afficher message et bouton manuel
  if (!isLoading && user) {
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
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
          <div style={{ fontSize: 18, marginBottom: 16, fontWeight: 600 }}>
            Connecté ! Redirection...
          </div>
          <div style={{ color: 'var(--muted)', fontSize: 13, marginBottom: 20 }}>
            {profile && !profile.is_active 
              ? 'Vers la page d\'abonnement' 
              : 'Vers l\'accueil'}
          </div>
          <button
            onClick={() => {
              if (profile && !profile.is_active) {
                window.location.href = '/abonnement'
              } else {
                window.location.href = redirect
              }
            }}
            className="btn btn-primary"
          >
            Continuer →
          </button>
        </div>
      </div>
    )
  }

  // Vue normale de connexion
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
        <div style={{ textAlign: 'center', marginBottom: 30 }}>
          <h1 style={{ fontSize: 26, fontWeight: 700 }}>
            Connexion
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: 13 }}>
            Accédez à votre espace d'apprentissage
          </p>
        </div>

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
              onClick={() => setShowForgotPassword(true)}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--muted)',
                fontSize: 12,
                cursor: 'pointer',
                textDecoration: 'underline'
              }}
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

        {/* 🔵 GOOGLE OAUTH - Conditionnel */}
        {GOOGLE_ENABLED ? (
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
        ) : (
          <div style={{ 
            textAlign: 'center', 
            fontSize: 12, 
            color: 'var(--muted)',
            marginBottom: 20,
            padding: '12px',
            background: 'rgba(255,255,255,0.03)',
            borderRadius: 8,
            border: '1px solid rgba(255,255,255,0.05)'
          }}>
            🔵 Connexion Google temporairement indisponible
          </div>
        )}

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
    <Suspense fallback={<div>Chargement...</div>}>
      <LoginPageInner />
    </Suspense>
  )
}
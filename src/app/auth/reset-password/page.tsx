'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'

export default function ResetPasswordPage() {
  const router = useRouter()
  const supabase = createClient()

  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    // Vérifier que l'utilisateur a un token de réinitialisation valide
    supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'PASSWORD_RECOVERY') {
        // L'utilisateur a cliqué sur le lien de réinitialisation
        console.log('Password recovery event detected')
      }
    })
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (newPassword !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas')
      return
    }

    if (newPassword.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères')
      return
    }

    setLoading(true)

    const { error } = await supabase.auth.updateUser({
      password: newPassword
    })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    setSuccess(true)
    setLoading(false)

    // Redirection après 3 secondes
    setTimeout(() => {
      router.push('/login')
    }, 3000)
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
            Nouveau mot de passe
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: 13 }}>
            Définissez votre nouveau mot de passe
          </p>
        </div>

        {/* SUCCESS */}
        {success && (
          <div
            style={{
              background: 'rgba(6,214,160,0.1)',
              border: '1px solid rgba(6,214,160,0.3)',
              padding: 16,
              borderRadius: 10,
              marginBottom: 20,
              color: 'var(--teal)',
              fontSize: 14,
              textAlign: 'center'
            }}
          >
            ✅ Mot de passe mis à jour avec succès !<br />
            Redirection vers la connexion...
          </div>
        )}

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
        {!success && (
          <form onSubmit={handleSubmit}>
            <input
              type="password"
              placeholder="Nouveau mot de passe"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              minLength={6}
              className="input"
              style={{ marginBottom: 12 }}
            />

            <input
              type="password"
              placeholder="Confirmer le mot de passe"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={6}
              className="input"
              style={{ marginBottom: 20 }}
            />

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary"
              style={{ width: '100%' }}
            >
              {loading ? 'Mise à jour...' : 'Mettre à jour le mot de passe'}
            </button>
          </form>
        )}

        {/* LINKS */}
        <div style={{ textAlign: 'center', fontSize: 13, marginTop: 20 }}>
          <Link href="/login" style={{ color: 'var(--accent)' }}>
            ← Retour à la connexion
          </Link>
        </div>
      </div>
    </div>
  )
}
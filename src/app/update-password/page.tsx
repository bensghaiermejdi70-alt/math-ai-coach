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
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    const checkSession = async () => {
      try {
        // Vérifier si on a une session active (après passage par auth/callback)
        const { data: { session } } = await supabase.auth.getSession()
        
        if (session) {
          setValidSession(true)
          setChecking(false)
          return
        }

        // Si pas de session, c'est que le user est arrivé directement sans passer par le callback
        setErrorMsg('Session invalide. Veuillez refaire une demande de réinitialisation.')
        setChecking(false)
        
      } catch (err) {
        setErrorMsg('Erreur lors de la vérification')
        setChecking(false)
      }
    }

    checkSession()
  }, [])

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault()

    if (password.length < 6) {
      setErrorMsg('Le mot de passe doit contenir au moins 6 caractères')
      return
    }

    setLoading(true)
    setErrorMsg('')

    const { error } = await supabase.auth.updateUser({ password })

    setLoading(false)

    if (error) {
      setErrorMsg('Erreur: ' + error.message)
      return
    }

    alert('✅ Mot de passe mis à jour avec succès !')
    window.location.href = '/login'
  }

  if (checking) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0f172a' }}>
        <div style={{ textAlign: 'center', color: 'white' }}>
          <div style={{ fontSize: 40, marginBottom: 10 }}>⏳</div>
          <p>Vérification...</p>
        </div>
      </div>
    )
  }

  if (!validSession) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0f172a', padding: 20 }}>
        <div style={{ background: '#111827', padding: 30, borderRadius: 12, maxWidth: 400, textAlign: 'center', color: 'white', border: '1px solid #374151' }}>
          <div style={{ fontSize: 40, marginBottom: 10 }}>❌</div>
          <h2 style={{ marginBottom: 10 }}>Lien invalide</h2>
          <p style={{ color: '#ef4444', marginBottom: 20 }}>{errorMsg}</p>
          <button
            onClick={() => router.push('/login')}
            style={{ padding: '10px 20px', background: '#3b82f6', color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer' }}
          >
            Retour à la connexion
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0f172a', padding: 20 }}>
      <div style={{ background: '#111827', padding: 30, borderRadius: 12, width: '100%', maxWidth: 400, color: 'white', border: '1px solid #374151' }}>
        <h1 style={{ textAlign: 'center', marginBottom: 20, fontSize: 24 }}>🔐 Nouveau mot de passe</h1>

        {errorMsg && (
          <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', padding: 12, borderRadius: 8, marginBottom: 15, color: '#ef4444', fontSize: 14 }}>
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleUpdatePassword}>
          <div style={{ position: 'relative', marginBottom: 15 }}>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Nouveau mot de passe (min. 6 caractères)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: '100%', padding: 12, paddingRight: 40, borderRadius: 6, border: '1px solid #374151', background: '#1f2937', color: 'white' }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              {showPassword ? '🙈' : '👁️'}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading || !password}
            style={{ 
              width: '100%', 
              padding: 12, 
              background: '#3b82f6', 
              color: 'white', 
              border: 'none', 
              borderRadius: 6, 
              fontWeight: 600, 
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.6 : 1 
            }}
          >
            {loading ? 'Mise à jour...' : 'Mettre à jour le mot de passe'}
          </button>
        </form>
      </div>
    </div>
  )
}
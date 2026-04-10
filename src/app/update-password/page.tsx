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
        // Vérifier si on a déjà une session
        const { data: { session } } = await supabase.auth.getSession()
        
        if (session) {
          setValidSession(true)
          setChecking(false)
          return
        }

        // Récupérer le code de l'URL
        const url = new URL(window.location.href)
        const code = url.searchParams.get('code')

        if (!code) {
          setErrorMsg('Lien invalide ou expiré.')
          setChecking(false)
          return
        }

        // Échanger le code contre une session
        const { data, error } = await supabase.auth.exchangeCodeForSession(code)

        if (error) {
          setErrorMsg('Ce lien est expiré ou a déjà été utilisé.')
          setChecking(false)
          return
        }

        if (data.session) {
          setValidSession(true)
        }
      } catch (err) {
        setErrorMsg('Erreur lors de la vérification')
      } finally {
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
    const { error } = await supabase.auth.updateUser({ password })
    setLoading(false)

    if (error) {
      setErrorMsg(error.message)
      return
    }

    alert('✅ Mot de passe mis à jour !')
    router.push('/login')
  }

  if (checking) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0f172a', color: 'white' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 40, marginBottom: 10 }}>⏳</div>
          <p>Vérification...</p>
        </div>
      </div>
    )
  }

  if (!validSession) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0f172a', padding: 20 }}>
        <div style={{ background: '#111827', padding: 30, borderRadius: 12, maxWidth: 400, textAlign: 'center', color: 'white' }}>
          <div style={{ fontSize: 40, marginBottom: 10 }}>❌</div>
          <h2>Lien invalide</h2>
          <p style={{ color: '#ef4444', marginBottom: 20 }}>{errorMsg}</p>
          <button onClick={() => router.push('/login')} style={{ padding: '10px 20px', background: '#3b82f6', color: 'white', border: 'none', borderRadius: 6 }}>
            Retour
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0f172a', padding: 20 }}>
      <div style={{ background: '#111827', padding: 30, borderRadius: 12, width: '100%', maxWidth: 400, color: 'white' }}>
        <h1 style={{ textAlign: 'center', marginBottom: 20 }}>🔐 Nouveau mot de passe</h1>
        
        {errorMsg && (
          <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', padding: 12, borderRadius: 8, marginBottom: 15, color: '#ef4444' }}>
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
            <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer' }}>
              {showPassword ? '🙈' : '👁️'}
            </button>
          </div>

          <button type="submit" disabled={loading || !password} style={{ width: '100%', padding: 12, background: '#3b82f6', color: 'white', border: 'none', borderRadius: 6, fontWeight: 600, opacity: loading ? 0.6 : 1 }}>
            {loading ? 'Mise à jour...' : 'Mettre à jour'}
          </button>
        </form>
      </div>
    </div>
  )
}
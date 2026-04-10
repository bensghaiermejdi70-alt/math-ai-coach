'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function UpdatePasswordPage() {
  const router = useRouter()
  const supabase = createClient()

  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const handlePasswordRecovery = async () => {
      try {
        const url = new URL(window.location.href)
        const code = url.searchParams.get('code')
        const hash = window.location.hash
        
        console.log('🔍 URL complète:', window.location.href)
        console.log('🔍 Code query param:', code)
        console.log('🔍 Hash:', hash)

        // 🔥 CAS 1: Flux PKCE (code dans query params) - Nouveau flux Supabase SSR
        if (code) {
          console.log('🔄 Tentative exchangeCodeForSession avec code:', code)
          
          const { data, error } = await supabase.auth.exchangeCodeForSession(code)
          
          if (error) {
            console.error('❌ Erreur exchangeCodeForSession:', error)
            setMessage('Lien invalide ou expiré. Erreur: ' + error.message)
            return
          }
          
          if (data.session) {
            console.log('✅ Session établie via PKCE/code')
            setIsReady(true)
            return
          }
        }

        // 🔥 CAS 2: Flux Implicit (access_token dans hash) - Ancien flux
        if (hash && hash.includes('access_token')) {
          console.log('🔄 Détection access_token dans hash')
          
          // Le client Supabase parse automatiquement le hash
          // On attend un peu que le parsing soit fait
          await new Promise(resolve => setTimeout(resolve, 500))
          
          const { data, error } = await supabase.auth.getSession()
          
          if (error) {
            console.error('❌ Erreur getSession:', error)
            setMessage('Erreur de session: ' + error.message)
            return
          }
          
          if (data.session) {
            console.log('✅ Session établie via hash/access_token')
            setIsReady(true)
            return
          }
        }

        // 🔥 CAS 3: Déjà connecté (changement de MDP normal)
        const { data: sessionData } = await supabase.auth.getSession()
        if (sessionData.session) {
          console.log('✅ Déjà connecté, session existante')
          setIsReady(true)
          return
        }

        // ❌ Aucun token trouvé
        console.error('❌ Aucun token valide trouvé dans l\'URL')
        setMessage('Lien de réinitialisation invalide. Vérifiez que vous utilisez le lien depuis votre email. Si le problème persiste, redemandez un nouveau lien.')
        
      } catch (err: any) {
        console.error('💥 Erreur inattendue:', err)
        setMessage('Erreur technique: ' + (err.message || 'Inconnue'))
      }
    }

    handlePasswordRecovery()
  }, [])

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
      console.error('❌ Erreur updateUser:', error)
      setMessage('Erreur: ' + error.message)
      return
    }

    setMessage('Mot de passe mis à jour avec succès 🎉 Redirection...')

    setTimeout(() => {
      router.push('/dashboard')
    }, 1500)
  }

  if (!isReady && !message) {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <div style={{ fontSize: 40, marginBottom: 15, animation: 'spin 1s linear infinite' }}>⏳</div>
            <p style={{ fontSize: 14, color: '#9ca3af' }}>Vérification du lien...</p>
            <p style={{ fontSize: 12, color: '#6b7280', marginTop: 10 }}>
              Si ça prend trop de temps, vérifiez la console (F12)
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>🔐 Changer mot de passe</h1>

        {message && (
          <div style={{ 
            ...styles.messageBox, 
            background: message.includes('succès') ? 'rgba(16,185,129,0.15)' : 'rgba(239,68,68,0.15)',
            border: message.includes('succès') ? '1px solid rgba(16,185,129,0.3)' : '1px solid rgba(239,68,68,0.3)',
            color: message.includes('succès') ? '#10b981' : '#ef4444',
          }}>
            {message}
          </div>
        )}

        {isReady && (
          <>
            <div style={styles.inputWrapper}>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Nouveau mot de passe (min. 6 caractères)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={styles.input}
                disabled={loading}
                onKeyDown={(e) => e.key === 'Enter' && handleUpdatePassword()}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={styles.eyeButton}
                disabled={loading}
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>

            <button
              onClick={handleUpdatePassword}
              disabled={loading || !password}
              style={{
                ...styles.button,
                opacity: loading || !password ? 0.6 : 1,
                cursor: loading || !password ? 'not-allowed' : 'pointer'
              }}
            >
              {loading ? 'Mise à jour...' : 'Mettre à jour'}
            </button>
          </>
        )}

        {!isReady && message && (
          <button
            onClick={() => router.push('/login')}
            style={{
              ...styles.button,
              background: '#6b7280',
              marginTop: '10px'
            }}
          >
            Retour à la connexion
          </button>
        )}
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
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
    padding: '20px'
  },
  card: {
    background: '#111827',
    padding: '30px',
    borderRadius: '12px',
    width: '100%',
    maxWidth: '380px',
    color: 'white',
    border: '1px solid #374151'
  },
  title: {
    marginBottom: '20px',
    fontSize: '20px',
    textAlign: 'center'
  },
  inputWrapper: {
    position: 'relative',
    marginBottom: '15px',
  },
  input: {
    width: '100%',
    padding: '12px',
    paddingRight: '45px',
    borderRadius: '8px',
    border: '1px solid #374151',
    background: '#1f2937',
    color: 'white',
    fontSize: '14px',
    outline: 'none',
    boxSizing: 'border-box'
  },
  eyeButton: {
    position: 'absolute',
    right: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    fontSize: '18px',
    padding: '0'
  },
  button: {
    width: '100%',
    padding: '12px',
    borderRadius: '8px',
    border: 'none',
    background: '#3b82f6',
    color: 'white',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '600',
    transition: 'all 0.2s'
  },
  messageBox: {
    padding: '12px',
    borderRadius: '8px',
    marginBottom: '15px',
    fontSize: '13px',
    textAlign: 'center'
  },
}


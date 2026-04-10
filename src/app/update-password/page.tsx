
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

  // 🔥 Récupérer la session depuis le token dans l'URL
  useEffect(() => {
    const handlePasswordRecovery = async () => {
      // Vérifier si on a un hash dans l'URL (token de réinitialisation)
      const hash = window.location.hash
      
      if (hash) {
        // Échanger le token contre une session
        const { data, error } = await supabase.auth.getSession()
        
        if (error) {
          setMessage('Lien de réinitialisation invalide ou expiré')
          return
        }
        
        if (data.session) {
          setIsReady(true)
        } else {
          // Essayer de récupérer depuis le hash si pas de session
          const { data: exchangeData, error: exchangeError } = await supabase.auth.getUser()
          
          if (exchangeError || !exchangeData.user) {
            setMessage('Lien de réinitialisation invalide ou expiré. Veuillez refaire une demande.')
            return
          }
          
          setIsReady(true)
        }
      } else {
        // Vérifier si déjà connecté
        const { data } = await supabase.auth.getSession()
        if (data.session) {
          setIsReady(true)
        } else {
          setMessage('Aucun token de réinitialisation trouvé. Utilisez le lien depuis votre email.')
        }
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

    // 🔥 Utiliser supabase.auth.updateUser pour changer le mot de passe
    const { error } = await supabase.auth.updateUser({
      password: password,
    })

    setLoading(false)

    if (error) {
      setMessage('Erreur: ' + error.message)
      return
    }

    setMessage('Mot de passe mis à jour avec succès 🎉 Redirection...')

    // Redirection après succès
    setTimeout(() => {
      router.push('/dashboard')
    }, 1500)
  }

  // Affichage si pas prêt
  if (!isReady && !message) {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <div style={{ fontSize: 30, marginBottom: 10 }}>⏳</div>
            <p>Vérification du lien...</p>
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
            ...styles.message, 
            color: message.includes('succès') ? '#10b981' : '#ef4444',
            background: message.includes('succès') ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)',
            padding: '10px',
            borderRadius: '8px',
            marginBottom: '15px',
            fontSize: '13px'
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
  message: {
    textAlign: 'center'
  },
}




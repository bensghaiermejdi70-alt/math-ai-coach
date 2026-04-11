'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function UpdatePasswordPage() {
  const supabase = createClient()

  const [password,     setPassword]     = useState('')
  const [confirm,      setConfirm]      = useState('')
  const [showPwd,      setShowPwd]      = useState(false)
  const [loading,      setLoading]      = useState(false)
  const [checking,     setChecking]     = useState(true)
  const [hasSession,   setHasSession]   = useState(false)
  const [message,      setMessage]      = useState('')
  const [error,        setError]        = useState('')

  useEffect(() => {
    const checkSession = async () => {
      // Supabase a déjà établi la session avant de rediriger ici
      const { data: { session } } = await supabase.auth.getSession()
      setHasSession(!!session)
      setChecking(false)
    }
    checkSession()
  }, [])

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (password.length < 6) { setError('Minimum 6 caractères'); return }
    if (password !== confirm) { setError('Les mots de passe ne correspondent pas'); return }

    setLoading(true)
    const { error } = await supabase.auth.updateUser({ password })
    setLoading(false)

    if (error) { setError(error.message); return }

    setMessage('✅ Mot de passe mis à jour avec succès !')
    setTimeout(() => { window.location.replace('/') }, 2000)
  }

  if (checking) return (
    <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', background:'#0a0a1a', color:'white', fontFamily:'system-ui' }}>
      <div style={{ textAlign:'center' }}>
        <div style={{ width:40, height:40, borderRadius:'50%', border:'3px solid rgba(79,110,247,0.3)', borderTopColor:'#4f6ef7', animation:'spin 0.8s linear infinite', margin:'0 auto 12px' }} />
        <p style={{ color:'rgba(255,255,255,0.4)', fontSize:13 }}>Vérification...</p>
        <style suppressHydrationWarning>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      </div>
    </div>
  )

  if (!hasSession) return (
    <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', background:'#0a0a1a', color:'white', fontFamily:'system-ui' }}>
      <div style={{ textAlign:'center', maxWidth:380, padding:32, background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:20 }}>
        <div style={{ fontSize:40, marginBottom:12 }}>⛔</div>
        <h2 style={{ marginBottom:10 }}>Lien invalide ou expiré</h2>
        <p style={{ color:'rgba(255,255,255,0.5)', fontSize:14, marginBottom:20, lineHeight:1.6 }}>
          Ce lien a expiré ou a déjà été utilisé.<br/>Demande un nouveau lien de réinitialisation.
        </p>
        <button onClick={() => window.location.replace('/login')}
          style={{ padding:'11px 24px', borderRadius:12, border:'none', background:'linear-gradient(135deg,#4f6ef7,#7c3aed)', color:'white', fontSize:14, fontWeight:700, cursor:'pointer' }}>
          Retour à la connexion
        </button>
      </div>
    </div>
  )

  return (
    <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', background:'#0a0a1a', padding:'20px', fontFamily:'system-ui' }}>
      <div style={{ width:'100%', maxWidth:400 }}>

        <div style={{ textAlign:'center', marginBottom:28 }}>
          <div style={{ fontSize:36, marginBottom:8 }}>🔐</div>
          <h1 style={{ color:'white', fontSize:24, fontWeight:900, margin:'0 0 6px' }}>Nouveau mot de passe</h1>
          <p style={{ color:'rgba(255,255,255,0.4)', fontSize:13, margin:0 }}>Choisis un mot de passe sécurisé</p>
        </div>

        <div style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:20, padding:32 }}>
          {error && (
            <div style={{ background:'rgba(239,68,68,0.1)', border:'1px solid rgba(239,68,68,0.3)', borderRadius:10, padding:'10px 14px', marginBottom:16, fontSize:13, color:'#fca5a5' }}>⚠️ {error}</div>
          )}
          {message && (
            <div style={{ background:'rgba(6,214,160,0.1)', border:'1px solid rgba(6,214,160,0.3)', borderRadius:10, padding:'10px 14px', marginBottom:16, fontSize:13, color:'#6ee7b7' }}>{message}</div>
          )}

          <form onSubmit={handleUpdate}>
            <div style={{ marginBottom:14 }}>
              <label style={{ display:'block', fontSize:12, color:'rgba(255,255,255,0.5)', marginBottom:6, fontWeight:600, textTransform:'uppercase', letterSpacing:'0.06em' }}>Nouveau mot de passe</label>
              <div style={{ position:'relative' }}>
                <input type={showPwd ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} required minLength={6}
                  placeholder="Minimum 6 caractères"
                  style={{ width:'100%', padding:'11px 44px 11px 14px', borderRadius:10, border:'1px solid rgba(255,255,255,0.12)', background:'rgba(255,255,255,0.06)', color:'white', fontSize:14, outline:'none', boxSizing:'border-box' as any }}
                  onFocus={e => e.target.style.borderColor = 'rgba(79,110,247,0.6)'}
                  onBlur={e  => e.target.style.borderColor = 'rgba(255,255,255,0.12)'}
                />
                <button type="button" onClick={() => setShowPwd(!showPwd)}
                  style={{ position:'absolute', right:12, top:'50%', transform:'translateY(-50%)', background:'none', border:'none', cursor:'pointer', fontSize:16, color:'rgba(255,255,255,0.4)' }}>
                  {showPwd ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            <div style={{ marginBottom:24 }}>
              <label style={{ display:'block', fontSize:12, color:'rgba(255,255,255,0.5)', marginBottom:6, fontWeight:600, textTransform:'uppercase', letterSpacing:'0.06em' }}>Confirmer le mot de passe</label>
              <input type={showPwd ? 'text' : 'password'} value={confirm} onChange={e => setConfirm(e.target.value)} required
                placeholder="Répète ton mot de passe"
                style={{ width:'100%', padding:'11px 14px', borderRadius:10, border:`1px solid ${confirm && confirm !== password ? 'rgba(239,68,68,0.5)' : 'rgba(255,255,255,0.12)'}`, background:'rgba(255,255,255,0.06)', color:'white', fontSize:14, outline:'none', boxSizing:'border-box' as any }}
                onFocus={e => e.target.style.borderColor = 'rgba(79,110,247,0.6)'}
                onBlur={e  => e.target.style.borderColor = confirm && confirm !== password ? 'rgba(239,68,68,0.5)' : 'rgba(255,255,255,0.12)'}
              />
            </div>

            <button type="submit" disabled={loading}
              style={{ width:'100%', padding:'13px', borderRadius:12, border:'none', background:'linear-gradient(135deg,#4f6ef7,#7c3aed)', color:'white', fontSize:15, fontWeight:800, cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1 }}>
              {loading ? 'Mise à jour...' : '✅ Changer mon mot de passe'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
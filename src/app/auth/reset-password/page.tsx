'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'

export default function ResetPasswordPage() {
  const supabase = createClient()

  const [password,  setPassword]  = useState('')
  const [confirm,   setConfirm]   = useState('')
  const [showPwd,   setShowPwd]   = useState(false)
  const [loading,   setLoading]   = useState(false)
  const [ready,     setReady]     = useState(false)
  const [done,      setDone]      = useState(false)
  const [error,     setError]     = useState('')

  useEffect(() => {
    const init = async () => {

      // ── Méthode 1 : token_hash dans l'URL (template Supabase) ────
      const url       = new URL(window.location.href)
      const tokenHash = url.searchParams.get('token_hash')
      const type      = url.searchParams.get('type')

      if (tokenHash && type === 'recovery') {
        const { error } = await supabase.auth.verifyOtp({
          token_hash: tokenHash,
          type: 'recovery',
        })
        if (error) {
          setError('Lien expiré — demande un nouveau lien')
        } else {
          setReady(true)
        }
        return
      }

      // ── Méthode 2 : code PKCE (Google flow) ──────────────────────
      const code = url.searchParams.get('code')
      if (code) {
        const { error } = await supabase.auth.exchangeCodeForSession(code)
        if (!error) setReady(true)
        return
      }

      // ── Méthode 3 : onAuthStateChange PASSWORD_RECOVERY ──────────
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        (event) => {
          if (event === 'PASSWORD_RECOVERY') {
            setReady(true)
            subscription.unsubscribe()
          }
        }
      )

      // ── Méthode 4 : session déjà active ──────────────────────────
      const { data: { session } } = await supabase.auth.getSession()
      if (session) {
        setReady(true)
        subscription.unsubscribe()
      }

      // Timeout 10s pour éviter le blocage infini
      setTimeout(() => {
        subscription.unsubscribe()
        if (!ready) setError('Lien invalide ou expiré')
      }, 10000)
    }

    init()
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    if (password.length < 6) { setError('Minimum 6 caractères'); return }
    if (password !== confirm)  { setError('Les mots de passe ne correspondent pas'); return }

    setLoading(true)
    const { error } = await supabase.auth.updateUser({ password })
    setLoading(false)

    if (error) { setError(error.message); return }
    setDone(true)
    setTimeout(() => { window.location.replace('/') }, 2000)
  }

  // ── Succès ───────────────────────────────────────────────────────
  if (done) return (
    <div style={s.center}>
      <div style={{ textAlign:'center' }}>
        <div style={{ fontSize:52, marginBottom:12 }}>✅</div>
        <h2 style={{ color:'white', marginBottom:8 }}>Mot de passe mis à jour !</h2>
        <p style={{ color:'rgba(255,255,255,0.4)', fontSize:14 }}>Redirection vers l'accueil...</p>
      </div>
    </div>
  )

  // ── Erreur sans session ──────────────────────────────────────────
  if (error && !ready) return (
    <div style={s.center}>
      <div style={{ textAlign:'center', maxWidth:380, padding:32, background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:20 }}>
        <div style={{ fontSize:40, marginBottom:12 }}>⛔</div>
        <h2 style={{ color:'white', marginBottom:10 }}>Lien invalide ou expiré</h2>
        <p style={{ color:'rgba(255,255,255,0.5)', fontSize:14, marginBottom:20, lineHeight:1.6 }}>
          Ce lien a expiré ou a déjà été utilisé.<br/>Demande un nouveau lien.
        </p>
        <button onClick={() => window.location.replace('/login')}
          style={{ padding:'11px 24px', borderRadius:12, border:'none', background:'linear-gradient(135deg,#4f6ef7,#7c3aed)', color:'white', fontSize:14, fontWeight:700, cursor:'pointer' }}>
          Retour à la connexion
        </button>
      </div>
    </div>
  )

  // ── Chargement ───────────────────────────────────────────────────
  if (!ready) return (
    <div style={s.center}>
      <div style={{ textAlign:'center' }}>
        <div style={{ width:40, height:40, borderRadius:'50%', border:'3px solid rgba(79,110,247,0.3)', borderTopColor:'#4f6ef7', animation:'spin 0.8s linear infinite', margin:'0 auto 12px' }} />
        <p style={{ color:'rgba(255,255,255,0.4)', fontSize:13 }}>Vérification du lien...</p>
        <style suppressHydrationWarning>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      </div>
    </div>
  )

  // ── Formulaire ───────────────────────────────────────────────────
  return (
    <div style={s.center}>
      <div style={{ width:'100%', maxWidth:400 }}>
        <div style={{ textAlign:'center', marginBottom:28 }}>
          <div style={{ fontSize:36, marginBottom:8 }}>🔐</div>
          <h1 style={{ color:'white', fontSize:24, fontWeight:900, margin:'0 0 6px' }}>Nouveau mot de passe</h1>
          <p style={{ color:'rgba(255,255,255,0.4)', fontSize:13, margin:0 }}>Choisis un mot de passe sécurisé</p>
        </div>

        <div style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:20, padding:32 }}>
          {error && (
            <div style={{ background:'rgba(239,68,68,0.1)', border:'1px solid rgba(239,68,68,0.3)', borderRadius:10, padding:'10px 14px', marginBottom:16, fontSize:13, color:'#fca5a5' }}>
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom:14 }}>
              <label style={s.label}>Nouveau mot de passe</label>
              <div style={{ position:'relative' }}>
                <input
                  type={showPwd ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required minLength={6}
                  placeholder="Minimum 6 caractères"
                  style={s.input}
                  onFocus={e => e.target.style.borderColor='rgba(79,110,247,0.6)'}
                  onBlur={e  => e.target.style.borderColor='rgba(255,255,255,0.12)'}
                />
                <button type="button" onClick={() => setShowPwd(!showPwd)} style={s.eye}>
                  {showPwd ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            <div style={{ marginBottom:24 }}>
              <label style={s.label}>Confirmer le mot de passe</label>
              <input
                type={showPwd ? 'text' : 'password'}
                value={confirm}
                onChange={e => setConfirm(e.target.value)}
                required
                placeholder="Répète ton mot de passe"
                style={{ ...s.input, borderColor: confirm && confirm !== password ? 'rgba(239,68,68,0.5)' : 'rgba(255,255,255,0.12)', padding:'11px 14px' }}
                onFocus={e => e.target.style.borderColor='rgba(79,110,247,0.6)'}
                onBlur={e  => e.target.style.borderColor=confirm&&confirm!==password?'rgba(239,68,68,0.5)':'rgba(255,255,255,0.12)'}
              />
            </div>

            <button type="submit" disabled={loading}
              style={{ width:'100%', padding:'13px', borderRadius:12, border:'none', background:'linear-gradient(135deg,#4f6ef7,#7c3aed)', color:'white', fontSize:15, fontWeight:800, cursor:loading?'not-allowed':'pointer', opacity:loading?0.7:1 }}>
              {loading ? 'Mise à jour...' : '✅ Changer mon mot de passe'}
            </button>
          </form>

          <div style={{ textAlign:'center', marginTop:16 }}>
            <Link href="/login" style={{ color:'rgba(255,255,255,0.4)', fontSize:12, textDecoration:'none' }}>
              ← Retour à la connexion
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

const s: any = {
  center: { minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', background:'#0a0a1a', color:'white', fontFamily:'system-ui', padding:'20px' },
  label:  { display:'block', fontSize:12, color:'rgba(255,255,255,0.5)', marginBottom:6, fontWeight:600, textTransform:'uppercase', letterSpacing:'0.06em' },
  input:  { width:'100%', padding:'11px 44px 11px 14px', borderRadius:10, border:'1px solid rgba(255,255,255,0.12)', background:'rgba(255,255,255,0.06)', color:'white', fontSize:14, outline:'none', boxSizing:'border-box' },
  eye:    { position:'absolute', right:12, top:'50%', transform:'translateY(-50%)', background:'none', border:'none', cursor:'pointer', fontSize:16, color:'rgba(255,255,255,0.4)' },
}
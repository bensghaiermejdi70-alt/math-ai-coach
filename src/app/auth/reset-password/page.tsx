'use client'
import { useState, useEffect, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'

export default function ResetPasswordPage() {
  const [password,  setPassword]  = useState('')
  const [confirm,   setConfirm]   = useState('')
  const [showPwd,   setShowPwd]   = useState(false)
  const [loading,   setLoading]   = useState(false)
  const [status,    setStatus]    = useState<'checking'|'ready'|'error'|'done'>('checking')
  const [errMsg,    setErrMsg]    = useState('')
  const done = useRef(false)

  useEffect(() => {
    if (done.current) return
    done.current = true

    const supabase = createClient()

    const init = async () => {
      const url       = new URL(window.location.href)
      const tokenHash = url.searchParams.get('token_hash')
      const type      = url.searchParams.get('type')
      const code      = url.searchParams.get('code')

      // ── CAS 1 : token_hash présent (lien email direct) ──────────
      if (tokenHash) {
        const { error } = await supabase.auth.verifyOtp({
          token_hash: tokenHash,
          type: 'recovery',
        })

        if (!error) {
          // Token valide → session recovery établie
          setStatus('ready')
          return
        }

        // Token déjà utilisé → vérifier si session active quand même
        const { data: { session } } = await supabase.auth.getSession()
        if (session) {
          setStatus('ready')
          return
        }

        setErrMsg('Ce lien a expiré ou a déjà été utilisé. Demande un nouveau lien.')
        setStatus('error')
        return
      }

      // ── CAS 2 : code PKCE ────────────────────────────────────────
      if (code) {
        const { error } = await supabase.auth.exchangeCodeForSession(code)
        if (!error) { setStatus('ready'); return }
        setErrMsg('Lien invalide.')
        setStatus('error')
        return
      }

      // ── CAS 3 : onAuthStateChange (lien Supabase classique) ──────
      // Supabase établit la session AVANT de rediriger
      // On attend PASSWORD_RECOVERY event pendant 5 secondes max
      let resolved = false
      const timer = setTimeout(() => {
        if (!resolved) {
          sub.unsubscribe()
          // Vérifier session une dernière fois
          supabase.auth.getSession().then(({ data: { session } }) => {
            if (session) setStatus('ready')
            else { setErrMsg('Lien invalide ou expiré.'); setStatus('error') }
          })
        }
      }, 5000)

      const { data: { subscription: sub } } = supabase.auth.onAuthStateChange((event) => {
        if (event === 'PASSWORD_RECOVERY' || event === 'SIGNED_IN') {
          resolved = true
          clearTimeout(timer)
          sub.unsubscribe()
          setStatus('ready')
        }
      })
    }

    init()
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setErrMsg('')

    if (password.length < 6) { setErrMsg('Minimum 6 caractères'); return }
    if (password !== confirm)  { setErrMsg('Les mots de passe ne correspondent pas'); return }

    setLoading(true)
    const supabase = createClient()
    const { error } = await supabase.auth.updateUser({ password })
    setLoading(false)

    if (error) {
      setErrMsg(error.message)
      return
    }

    // Succès — déconnecter et rediriger vers login pour reconnecter
    setStatus('done')
    await supabase.auth.signOut()
    setTimeout(() => { window.location.href = '/login?updated=1' }, 2000)
  }

  // ── États ────────────────────────────────────────────────────────
  if (status === 'done') return (
    <div style={s.page}>
      <div style={{ textAlign:'center' }}>
        <div style={{ fontSize:56, marginBottom:16 }}>✅</div>
        <h2 style={{ color:'white', marginBottom:8, fontSize:22 }}>Mot de passe mis à jour !</h2>
        <p style={{ color:'rgba(255,255,255,0.4)', fontSize:14 }}>
          Redirection vers la connexion...
        </p>
      </div>
    </div>
  )

  if (status === 'checking') return (
    <div style={s.page}>
      <div style={{ textAlign:'center' }}>
        <div style={s.spinner} />
        <p style={{ color:'rgba(255,255,255,0.4)', fontSize:13, marginTop:12 }}>
          Vérification du lien…
        </p>
        <style suppressHydrationWarning>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      </div>
    </div>
  )

  if (status === 'error') return (
    <div style={s.page}>
      <div style={{ textAlign:'center', maxWidth:380, ...s.card }}>
        <div style={{ fontSize:44, marginBottom:12 }}>⛔</div>
        <h2 style={{ color:'white', marginBottom:10, fontSize:20 }}>Lien invalide ou expiré</h2>
        <p style={{ color:'rgba(255,255,255,0.5)', fontSize:14, lineHeight:1.6, marginBottom:20 }}>
          {errMsg}
        </p>
        <button onClick={() => window.location.href = '/login'}
          style={s.btn}>
          Retour à la connexion
        </button>
      </div>
    </div>
  )

  // ── Formulaire (status === 'ready') ──────────────────────────────
  return (
    <div style={s.page}>
      <div style={{ width:'100%', maxWidth:400 }}>
        <div style={{ textAlign:'center', marginBottom:28 }}>
          <div style={{ fontSize:36, marginBottom:8 }}>🔐</div>
          <h1 style={{ color:'white', fontSize:22, fontWeight:900, margin:'0 0 6px' }}>
            Nouveau mot de passe
          </h1>
          <p style={{ color:'rgba(255,255,255,0.4)', fontSize:13, margin:0 }}>
            Choisis un mot de passe sécurisé
          </p>
        </div>

        <div style={s.card}>
          {errMsg && (
            <div style={s.alert}>⚠️ {errMsg}</div>
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
                <button type="button" onClick={() => setShowPwd(v => !v)} style={s.eye}>
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
                style={{
                  ...s.input,
                  padding: '11px 14px',
                  borderColor: confirm && confirm !== password
                    ? 'rgba(239,68,68,0.5)'
                    : 'rgba(255,255,255,0.12)',
                }}
                onFocus={e => e.target.style.borderColor='rgba(79,110,247,0.6)'}
                onBlur={e  => e.target.style.borderColor =
                  confirm && confirm !== password
                    ? 'rgba(239,68,68,0.5)'
                    : 'rgba(255,255,255,0.12)'
                }
              />
            </div>

            <button type="submit" disabled={loading} style={{
              ...s.btn,
              width: '100%',
              opacity: loading ? 0.7 : 1,
              cursor: loading ? 'not-allowed' : 'pointer',
            }}>
              {loading ? 'Mise à jour...' : '✅ Changer mon mot de passe'}
            </button>
          </form>

          <div style={{ textAlign:'center', marginTop:16 }}>
            <Link href="/login" style={{ color:'rgba(255,255,255,0.35)', fontSize:12, textDecoration:'none' }}>
              ← Retour à la connexion
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

const s: any = {
  page:    { minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', background:'#0a0a1a', color:'white', fontFamily:'system-ui', padding:'20px' },
  card:    { background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:20, padding:32 },
  spinner: { width:40, height:40, borderRadius:'50%', border:'3px solid rgba(79,110,247,0.3)', borderTopColor:'#4f6ef7', animation:'spin 0.8s linear infinite', margin:'0 auto' },
  label:   { display:'block', fontSize:12, color:'rgba(255,255,255,0.5)', marginBottom:6, fontWeight:600, textTransform:'uppercase', letterSpacing:'0.06em' },
  input:   { width:'100%', padding:'11px 44px 11px 14px', borderRadius:10, border:'1px solid rgba(255,255,255,0.12)', background:'rgba(255,255,255,0.06)', color:'white', fontSize:14, outline:'none', boxSizing:'border-box' },
  eye:     { position:'absolute', right:12, top:'50%', transform:'translateY(-50%)', background:'none', border:'none', cursor:'pointer', fontSize:16, color:'rgba(255,255,255,0.4)' },
  btn:     { padding:'12px 24px', borderRadius:12, border:'none', background:'linear-gradient(135deg,#4f6ef7,#7c3aed)', color:'white', fontSize:14, fontWeight:700, cursor:'pointer' },
  alert:   { background:'rgba(239,68,68,0.1)', border:'1px solid rgba(239,68,68,0.3)', borderRadius:10, padding:'10px 14px', marginBottom:16, fontSize:13, color:'#fca5a5' },
}
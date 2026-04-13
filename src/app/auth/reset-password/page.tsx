'use client'
import { useState, useEffect, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('')
  const [confirm,  setConfirm]  = useState('')
  const [showPwd,  setShowPwd]  = useState(false)
  const [loading,  setLoading]  = useState(false)
  const [status,   setStatus]   = useState<'checking'|'ready'|'error'|'done'>('checking')
  const [errMsg,   setErrMsg]   = useState('')
  const ran = useRef(false)

  useEffect(() => {
    if (ran.current) return
    ran.current = true

    const supabase = createClient()

    const run = async () => {
      const url       = new URL(window.location.href)
      const tokenHash = url.searchParams.get('token_hash')
      const type      = url.searchParams.get('type')
      const code      = url.searchParams.get('code')
      const hash      = window.location.hash

      // ── CAS 1 : hash fragment #access_token (ConfirmationURL) ──
      if (hash && hash.includes('access_token')) {
        const p  = new URLSearchParams(hash.replace('#', ''))
        const at = p.get('access_token')
        const rt = p.get('refresh_token')
        if (at && rt) {
          const { error } = await supabase.auth.setSession({ access_token: at, refresh_token: rt })
          if (!error) { setStatus('ready'); return }
        }
      }

      // ── CAS 2 : token_hash dans URL ─────────────────────────────
      if (tokenHash) {
        const { error } = await supabase.auth.verifyOtp({
          token_hash: tokenHash,
          type: 'recovery',
        })
        if (!error) { setStatus('ready'); return }

        // verifyOtp 403 = token déjà consommé par Supabase
        // La session peut déjà être active
        const { data: { session } } = await supabase.auth.getSession()
        if (session) { setStatus('ready'); return }

        // Rien ne marche → erreur
        setErrMsg('Ce lien a expiré. Demande un nouveau lien depuis la page connexion.')
        setStatus('error')
        return
      }

      // ── CAS 3 : code PKCE ────────────────────────────────────────
      if (code) {
        const { error } = await supabase.auth.exchangeCodeForSession(code)
        if (!error) { setStatus('ready'); return }
        setErrMsg('Lien invalide.')
        setStatus('error')
        return
      }

      // ── CAS 4 : session déjà active ─────────────────────────────
      const { data: { session } } = await supabase.auth.getSession()
      if (session) { setStatus('ready'); return }

      // ── CAS 5 : écouter PASSWORD_RECOVERY ───────────────────────
      const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
        if (event === 'PASSWORD_RECOVERY' || event === 'SIGNED_IN') {
          subscription.unsubscribe()
          setStatus('ready')
        }
      })

      setTimeout(() => {
        subscription.unsubscribe()
        setStatus(prev => {
          if (prev === 'checking') {
            setErrMsg('Lien invalide ou expiré. Demande un nouveau lien.')
            return 'error'
          }
          return prev
        })
      }, 6000)
    }

    run()
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

    if (error) { setErrMsg(error.message); return }

    setStatus('done')
    setTimeout(() => { window.location.href = '/login?updated=1' }, 1500)
  }

  if (status === 'done') return (
    <div style={s.page}>
      <div style={{ textAlign:'center' }}>
        <div style={{ fontSize:56, marginBottom:16 }}>✅</div>
        <h2 style={{ color:'white', marginBottom:8 }}>Mot de passe mis à jour !</h2>
        <p style={{ color:'rgba(255,255,255,0.4)', fontSize:14 }}>Redirection...</p>
      </div>
    </div>
  )

  if (status === 'checking') return (
    <div style={s.page}>
      <div style={{ textAlign:'center' }}>
        <div style={s.spinner} />
        <p style={{ color:'rgba(255,255,255,0.4)', fontSize:13, marginTop:14 }}>Vérification du lien...</p>
        <style suppressHydrationWarning>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      </div>
    </div>
  )

  if (status === 'error') return (
    <div style={s.page}>
      <div style={{ ...s.card, textAlign:'center', maxWidth:380 }}>
        <div style={{ fontSize:44, marginBottom:12 }}>⛔</div>
        <h2 style={{ color:'white', marginBottom:10, fontSize:20 }}>Lien invalide ou expiré</h2>
        <p style={{ color:'rgba(255,255,255,0.5)', fontSize:14, lineHeight:1.6, marginBottom:20 }}>{errMsg}</p>
        <button onClick={() => window.location.href = '/login'}
          style={{ ...s.btn, width:'100%' }}>
          Retour à la connexion
        </button>
      </div>
    </div>
  )

  return (
    <div style={s.page}>
      <div style={{ width:'100%', maxWidth:400 }}>
        <div style={{ textAlign:'center', marginBottom:28 }}>
          <div style={{ fontSize:36, marginBottom:8 }}>🔐</div>
          <h1 style={{ color:'white', fontSize:22, fontWeight:900, margin:'0 0 6px' }}>Nouveau mot de passe</h1>
          <p style={{ color:'rgba(255,255,255,0.4)', fontSize:13, margin:0 }}>Choisis un mot de passe sécurisé</p>
        </div>
        <div style={s.card}>
          {errMsg && <div style={s.alert}>⚠️ {errMsg}</div>}
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom:14 }}>
              <label style={s.label}>Nouveau mot de passe</label>
              <div style={{ position:'relative' }}>
                <input type={showPwd?'text':'password'} value={password}
                  onChange={e=>setPassword(e.target.value)}
                  required minLength={6} placeholder="Minimum 6 caractères"
                  style={s.input}
                  onFocus={e=>e.target.style.borderColor='rgba(79,110,247,0.6)'}
                  onBlur={e=>e.target.style.borderColor='rgba(255,255,255,0.12)'}
                />
                <button type="button" onClick={()=>setShowPwd(v=>!v)} style={s.eye}>
                  {showPwd?'🙈':'👁️'}
                </button>
              </div>
            </div>
            <div style={{ marginBottom:24 }}>
              <label style={s.label}>Confirmer</label>
              <input type={showPwd?'text':'password'} value={confirm}
                onChange={e=>setConfirm(e.target.value)}
                required placeholder="Répète ton mot de passe"
                style={{ ...s.input, padding:'11px 14px',
                  borderColor:confirm&&confirm!==password?'rgba(239,68,68,0.5)':'rgba(255,255,255,0.12)' }}
                onFocus={e=>e.target.style.borderColor='rgba(79,110,247,0.6)'}
                onBlur={e=>e.target.style.borderColor=confirm&&confirm!==password?'rgba(239,68,68,0.5)':'rgba(255,255,255,0.12)'}
              />
            </div>
            <button type="submit" disabled={loading}
              style={{ ...s.btn, width:'100%', opacity:loading?0.7:1, cursor:loading?'not-allowed':'pointer' }}>
              {loading?'Mise à jour...':'✅ Changer mon mot de passe'}
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
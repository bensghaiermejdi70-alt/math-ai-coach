'use client'
import { useState, useEffect, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'

export default function UpdatePasswordPage() {
  const [password, setPassword] = useState('')
  const [confirm,  setConfirm]  = useState('')
  const [showPwd,  setShowPwd]  = useState(false)
  const [loading,  setLoading]  = useState(false)
  const [ready,    setReady]    = useState(false)
  const [done,     setDone]     = useState(false)
  const [errMsg,   setErrMsg]   = useState('')
  const [debug,    setDebug]    = useState<string[]>([])
  const ran = useRef(false)

  const addDebug = (msg: string) => {
    setDebug(prev => [...prev, msg])
    console.log(msg)
  }

  useEffect(() => {
    if (ran.current) return
    ran.current = true

    const supabase = createClient()

    const checkSession = async () => {
      addDebug('Démarrage vérification...')
      
      // Essayer de récupérer la session immédiatement
      let { data: { session }, error } = await supabase.auth.getSession()
      
      if (error) {
        addDebug('Erreur getSession: ' + error.message)
      }

      if (session) {
        addDebug('✅ Session trouvée immédiatement')
        setReady(true)
        return
      }

      addDebug('⏳ Session non trouvée, attente...')

      // Essayer de refresh la session
      addDebug('Tentative refreshSession...')
      const { data: refreshData, error: refreshError } = await supabase.auth.refreshSession()
      
      if (refreshError) {
        addDebug('❌ refreshSession error: ' + refreshError.message)
      } else if (refreshData.session) {
        addDebug('✅ Session refreshée')
        setReady(true)
        return
      }

      // Attendre avec retry
      let attempts = 0
      const maxAttempts = 20
      
      while (attempts < maxAttempts) {
        await new Promise(resolve => setTimeout(resolve, 300))
        
        const { data: { session: retrySession } } = await supabase.auth.getSession()
        
        if (retrySession) {
          addDebug(`✅ Session trouvée après ${attempts + 1} tentatives`)
          setReady(true)
          return
        }
        
        attempts++
      }
      
      addDebug('❌ Échec après 20 tentatives')
      setErrMsg('Session non trouvée. Le lien a peut-être expiré ou les cookies sont bloqués.')
      setReady(true)
    }

    checkSession()
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setErrMsg('')
    
    if (password.length < 6) { 
      setErrMsg('Minimum 6 caractères'); 
      return 
    }
    if (password !== confirm) { 
      setErrMsg('Les mots de passe ne correspondent pas'); 
      return 
    }

    setLoading(true)
    const supabase = createClient()
    
    const { error } = await supabase.auth.updateUser({ password })
    setLoading(false)

    if (error) { 
      setErrMsg(error.message)
      return 
    }
    
    setDone(true)
    setTimeout(() => { 
      window.location.href = '/login?updated=1' 
    }, 2000)
  }

  if (!ready) return (
    <div style={s.page}>
      <div style={{ textAlign:'center' }}>
        <div style={s.spinner} />
        <p style={{ color:'rgba(255,255,255,0.4)', fontSize:13, marginTop:14 }}>Vérification...</p>
        <div style={{ marginTop:20, textAlign:'left', maxWidth: 350, background:'rgba(0,0,0,0.3)', padding:10, borderRadius:8 }}>
          <p style={{ color:'rgba(255,255,255,0.5)', fontSize:10, margin:0 }}>Debug:</p>
          {debug.map((d, i) => (
            <p key={i} style={{ color:'rgba(255,255,255,0.4)', fontSize:9, margin:'2px 0' }}>{d}</p>
          ))}
        </div>
        <style suppressHydrationWarning>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      </div>
    </div>
  )

  if (done) return (
    <div style={s.page}>
      <div style={{ textAlign:'center' }}>
        <div style={{ fontSize:56, marginBottom:16 }}>✅</div>
        <h2 style={{ color:'white', marginBottom:8 }}>Mot de passe mis à jour !</h2>
        <p style={{ color:'rgba(255,255,255,0.4)', fontSize:14 }}>Redirection vers la connexion...</p>
      </div>
    </div>
  )

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
            <div style={{ ...s.alert, marginBottom:16, textAlign: 'center' }}>
              ⚠️ {errMsg}
              <div style={{ marginTop:12 }}>
                <Link href="/login" style={{ color:'#4f6ef7', textDecoration:'none', fontSize:13, fontWeight: 600 }}>
                  ← Retour à la connexion
                </Link>
              </div>
            </div>
          )}
          
          {!errMsg && (
            <>
              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom:14 }}>
                  <label style={s.label}>Nouveau mot de passe</label>
                  <div style={{ position:'relative' }}>
                    <input 
                      type={showPwd?'text':'password'} 
                      value={password}
                      onChange={e=>setPassword(e.target.value)}
                      required 
                      minLength={6} 
                      placeholder="Minimum 6 caractères"
                      style={s.input}
                      autoComplete="new-password"
                    />
                    <button type="button" onClick={()=>setShowPwd(v=>!v)} style={s.eye}>
                      {showPwd?'🙈':'👁️'}
                    </button>
                  </div>
                </div>
                
                <div style={{ marginBottom:24 }}>
                  <label style={s.label}>Confirmer le mot de passe</label>
                  <input 
                    type={showPwd?'text':'password'} 
                    value={confirm}
                    onChange={e=>setConfirm(e.target.value)} 
                    required
                    placeholder="Répète le mot de passe"
                    style={{ ...s.input, padding:'11px 14px',
                      borderColor:confirm&&confirm!==password?'rgba(239,68,68,0.5)':'rgba(255,255,255,0.12)' }}
                    autoComplete="new-password"
                  />
                </div>
                
                <button 
                  type="submit" 
                  disabled={loading}
                  style={{ ...s.btn, width:'100%', opacity:loading?0.7:1, cursor:loading?'not-allowed':'pointer' }}
                >
                  {loading?'Mise à jour...':'✅ Changer mon mot de passe'}
                </button>
              </form>
              
              <div style={{ textAlign:'center', marginTop:16 }}>
                <Link href="/login" style={{ color:'rgba(255,255,255,0.35)', fontSize:12, textDecoration:'none' }}>
                  ← Retour connexion
                </Link>
              </div>
            </>
          )}
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
  alert:   { background:'rgba(239,68,68,0.1)', border:'1px solid rgba(239,68,68,0.3)', borderRadius:10, padding:'12px 16px', fontSize:13, color:'#fca5a5' },
}
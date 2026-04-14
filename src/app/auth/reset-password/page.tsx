'use client'
// src/app/auth/reset-password/page.tsx
// Simple — session déjà établie par /auth/confirm côté serveur

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('')
  const [confirm,  setConfirm]  = useState('')
  const [showPwd,  setShowPwd]  = useState(false)
  const [loading,  setLoading]  = useState(false)
  const [done,     setDone]     = useState(false)
  const [errMsg,   setErrMsg]   = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setErrMsg('')
    if (password.length < 6) { setErrMsg('Minimum 6 caractères'); return }
    if (password !== confirm) { setErrMsg('Les mots de passe ne correspondent pas'); return }

    setLoading(true)
    const supabase = createClient()
    const { error } = await supabase.auth.updateUser({ password })
    setLoading(false)

    if (error) { setErrMsg(error.message); return }
    setDone(true)
    setTimeout(() => { window.location.href = '/login?updated=1' }, 1500)
  }

  if (done) return (
    <div style={s.page}>
      <div style={{ textAlign:'center' }}>
        <div style={{ fontSize:56, marginBottom:16 }}>✅</div>
        <h2 style={{ color:'white', marginBottom:8 }}>Mot de passe mis à jour !</h2>
        <p style={{ color:'rgba(255,255,255,0.4)', fontSize:14 }}>Redirection...</p>
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
                onChange={e=>setConfirm(e.target.value)} required
                placeholder="Répète le mot de passe"
                style={{ ...s.input, padding:'11px 14px',
                  borderColor:confirm&&confirm!==password
                    ?'rgba(239,68,68,0.5)':'rgba(255,255,255,0.12)' }}
                onFocus={e=>e.target.style.borderColor='rgba(79,110,247,0.6)'}
                onBlur={e=>e.target.style.borderColor=confirm&&confirm!==password
                  ?'rgba(239,68,68,0.5)':'rgba(255,255,255,0.12)'}
              />
            </div>
            <button type="submit" disabled={loading}
              style={{ ...s.btn, width:'100%',
                opacity:loading?0.7:1, cursor:loading?'not-allowed':'pointer' }}>
              {loading?'Mise à jour...':'✅ Changer mon mot de passe'}
            </button>
          </form>
          <div style={{ textAlign:'center', marginTop:16 }}>
            <Link href="/login"
              style={{ color:'rgba(255,255,255,0.35)', fontSize:12, textDecoration:'none' }}>
              ← Retour connexion
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
  label:   { display:'block', fontSize:12, color:'rgba(255,255,255,0.5)', marginBottom:6, fontWeight:600, textTransform:'uppercase', letterSpacing:'0.06em' },
  input:   { width:'100%', padding:'11px 44px 11px 14px', borderRadius:10, border:'1px solid rgba(255,255,255,0.12)', background:'rgba(255,255,255,0.06)', color:'white', fontSize:14, outline:'none', boxSizing:'border-box' },
  eye:     { position:'absolute', right:12, top:'50%', transform:'translateY(-50%)', background:'none', border:'none', cursor:'pointer', fontSize:16, color:'rgba(255,255,255,0.4)' },
  btn:     { padding:'12px 24px', borderRadius:12, border:'none', background:'linear-gradient(135deg,#4f6ef7,#7c3aed)', color:'white', fontSize:14, fontWeight:700, cursor:'pointer' },
  alert:   { background:'rgba(239,68,68,0.1)', border:'1px solid rgba(239,68,68,0.3)', borderRadius:10, padding:'10px 14px', marginBottom:16, fontSize:13, color:'#fca5a5' },
}
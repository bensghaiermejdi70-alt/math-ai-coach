'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [pwd, setPwd] = useState('')

  return (
    <main style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', padding:20, position:'relative', zIndex:1 }}>
      <div style={{ width:'100%', maxWidth:420 }}>
        <div style={{ textAlign:'center', marginBottom:32 }}>
          <Link href="/" style={{ display:'inline-flex', alignItems:'center', gap:10, textDecoration:'none', fontFamily:'var(--font-display)', fontWeight:800, fontSize:24, color:'var(--text)', marginBottom:24 }}>
            <div style={{ width:40, height:40, background:'linear-gradient(135deg,#4f6ef7,#7c3aed)', borderRadius:12, display:'flex', alignItems:'center', justifyContent:'center', fontSize:20 }}>∑</div>
            Math<span style={{ color:'var(--accent)' }}>AI</span> Coach
          </Link>
          <h1 style={{ fontSize:28, marginBottom:8 }}>Connexion</h1>
          <p style={{ fontSize:14 }}>Accède à ton espace mathématiques</p>
        </div>

        <div className="card" style={{ padding:32 }}>
          <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
            <div>
              <label style={{ fontSize:12, color:'var(--muted)', display:'block', marginBottom:6, fontFamily:'var(--font-mono)', textTransform:'uppercase', letterSpacing:'0.06em' }}>Email</label>
              <input className="input" type="email" placeholder="ton@email.com" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div>
              <label style={{ fontSize:12, color:'var(--muted)', display:'block', marginBottom:6, fontFamily:'var(--font-mono)', textTransform:'uppercase', letterSpacing:'0.06em' }}>Mot de passe</label>
              <input className="input" type="password" placeholder="••••••••" value={pwd} onChange={e => setPwd(e.target.value)} />
            </div>
            <Link href="/profile" className="btn btn-primary" style={{ justifyContent:'center', marginTop:8 }}>Se connecter →</Link>
          </div>
          <div style={{ textAlign:'center', marginTop:20, fontSize:13, color:'var(--muted)' }}>
            Pas encore de compte ? <Link href="/auth/register" style={{ color:'var(--accent)', textDecoration:'none' }}>S'inscrire</Link>
          </div>
        </div>

        {/* Social */}
        <div style={{ marginTop:16 }}>
          <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:16 }}>
            <div style={{ flex:1, height:1, background:'var(--border)' }} />
            <span style={{ fontSize:12, color:'var(--muted)' }}>ou</span>
            <div style={{ flex:1, height:1, background:'var(--border)' }} />
          </div>
          <button className="btn btn-secondary" style={{ width:'100%', justifyContent:'center', gap:10 }}>
            <span>🌐</span> Continuer avec Google
          </button>
        </div>
      </div>
    </main>
  )
}

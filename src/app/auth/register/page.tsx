'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function RegisterPage() {
  const [level, setLevel] = useState<'bac'|'universite'>('bac')

  return (
    <main style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', padding:20, position:'relative', zIndex:1 }}>
      <div style={{ width:'100%', maxWidth:460 }}>
        <div style={{ textAlign:'center', marginBottom:32 }}>
          <Link href="/" style={{ display:'inline-flex', alignItems:'center', gap:10, textDecoration:'none', fontFamily:'var(--font-display)', fontWeight:800, fontSize:24, color:'var(--text)', marginBottom:24 }}>
            <div style={{ width:40, height:40, background:'linear-gradient(135deg,#4f6ef7,#7c3aed)', borderRadius:12, display:'flex', alignItems:'center', justifyContent:'center', fontSize:20 }}>∑</div>
            Math<span style={{ color:'var(--accent)' }}>AI</span> Coach
          </Link>
          <h1 style={{ fontSize:28, marginBottom:8 }}>Créer un compte</h1>
          <p style={{ fontSize:14 }}>Gratuit · Programme officiel tunisien</p>
        </div>

        <div className="card" style={{ padding:32 }}>
          <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
            <div>
              <label style={{ fontSize:12, color:'var(--muted)', display:'block', marginBottom:6, fontFamily:'var(--font-mono)', textTransform:'uppercase', letterSpacing:'0.06em' }}>Nom complet</label>
              <input className="input" placeholder="Ahmed Ben Salah" />
            </div>
            <div>
              <label style={{ fontSize:12, color:'var(--muted)', display:'block', marginBottom:6, fontFamily:'var(--font-mono)', textTransform:'uppercase', letterSpacing:'0.06em' }}>Email</label>
              <input className="input" type="email" placeholder="ton@email.com" />
            </div>
            <div>
              <label style={{ fontSize:12, color:'var(--muted)', display:'block', marginBottom:6, fontFamily:'var(--font-mono)', textTransform:'uppercase', letterSpacing:'0.06em' }}>Niveau</label>
              <div style={{ display:'flex', gap:8 }}>
                {([['bac','🏫 Bac Maths'],['universite','🎓 Université FST']] as const).map(([v,l]) => (
                  <button key={v} onClick={() => setLevel(v)} style={{ flex:1, padding:'10px', borderRadius:10, border:'1px solid', borderColor: level===v ? 'var(--accent)' : 'var(--border)', background: level===v ? 'rgba(79,110,247,0.15)' : 'transparent', color: level===v ? 'var(--accent)' : 'var(--muted)', fontFamily:'var(--font-body)', fontSize:13, cursor:'pointer', transition:'all 0.2s' }}>{l}</button>
                ))}
              </div>
            </div>
            <div>
              <label style={{ fontSize:12, color:'var(--muted)', display:'block', marginBottom:6, fontFamily:'var(--font-mono)', textTransform:'uppercase', letterSpacing:'0.06em' }}>Mot de passe</label>
              <input className="input" type="password" placeholder="Min. 8 caractères" />
            </div>
            <Link href="/bac" className="btn btn-primary" style={{ justifyContent:'center', marginTop:8 }}>
              🚀 Commencer gratuitement →
            </Link>
          </div>
          <div style={{ textAlign:'center', marginTop:20, fontSize:13, color:'var(--muted)' }}>
            Déjà inscrit ? <Link href="/auth/login" style={{ color:'var(--accent)', textDecoration:'none' }}>Se connecter</Link>
          </div>
        </div>
      </div>
    </main>
  )
}

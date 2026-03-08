'use client'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

const COURS = [
  { titre:'Suites arithmétiques', contenu:'uₙ = u₀ + n·r   |   Sₙ = n·(u₀+uₙ)/2   |   raison r = uₙ₊₁ - uₙ' },
  { titre:'Suites géométriques', contenu:'uₙ = u₀·qⁿ   |   Sₙ = u₀·(1-qⁿ)/(1-q) si q≠1   |   raison q = uₙ₊₁/uₙ' },
  { titre:'Suites récurrentes', contenu:'uₙ₊₁ = f(uₙ). Points fixes : f(l)=l. Monotonie : étudier uₙ₊₁ - uₙ ou uₙ₊₁/uₙ' },
  { titre:'Convergence', contenu:'(uₙ) converge ⟺ monotone et bornée. Théorème : suite croissante majorée ⟹ convergente.' },
  { titre:'Suites adjacentes', contenu:'(uₙ) croissante, (vₙ) décroissante, vₙ-uₙ→0 ⟹ convergent vers même limite l' },
  { titre:'Raisonnement par récurrence', contenu:'Base : P(0) vraie. Hérédité : P(n) ⟹ P(n+1). Conclusion : P(n) vraie ∀n∈ℕ' },
]

const EXERCICES = [
  { num:'01', titre:'Suite arithmétique', diff:'facile', enonce:'(uₙ) arithmétique, u₀=3, r=5. Calculer u₁₀ et S₁₀.' },
  { num:'02', titre:'Suite géométrique', diff:'facile', enonce:'(uₙ) géométrique, u₀=2, q=3. Calculer u₅ et Sₙ.' },
  { num:'03', titre:'Suite récurrente — monotonie', diff:'moyen', enonce:'uₙ₊₁ = √(uₙ+2), u₀=0. Montrer que (uₙ) est croissante et bornée.' },
  { num:'04', titre:'Convergence par récurrence', diff:'difficile', enonce:'uₙ₊₁ = (uₙ+3)/(uₙ+1), u₀=1. Montrer que (uₙ) converge et trouver sa limite.' },
  { num:'05', titre:'Suites adjacentes', diff:'difficile', enonce:'uₙ = (1+1/n)ⁿ et vₙ = (1+1/n)ⁿ⁺¹. Montrer qu\'elles sont adjacentes.' },
  { num:'06', titre:'Récurrence', diff:'moyen', enonce:'Démontrer par récurrence que ∑(k=1 to n) k = n(n+1)/2' },
  { num:'07', titre:'Type Bac complet', diff:'bac', enonce:'Soit uₙ₊₁ = (2uₙ+3)/(uₙ+2), u₀=1. Étude complète : points fixes, monotonie, convergence.' },
]

export default function SuitesPage() {
  return (
    <>
      <Navbar />
      <main style={{ position:'relative', zIndex:1, paddingTop:80 }}>
        <div style={{ borderBottom:'1px solid var(--border)', padding:'14px clamp(20px,5vw,60px)', display:'flex', gap:8, fontSize:13, color:'var(--muted)', alignItems:'center' }}>
          <Link href="/bac" style={{ color:'var(--muted)', textDecoration:'none' }}>Bac</Link><span>›</span>
          <span style={{ color:'var(--muted)' }}>Trimestre 1</span><span>›</span>
          <span style={{ color:'var(--text)' }}>Suites Réelles</span>
        </div>
        <div className="container" style={{ paddingTop:40, paddingBottom:80 }}>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 300px', gap:32, alignItems:'start' }}>
            <div>
              <span className="badge badge-blue" style={{ marginBottom:12, display:'inline-block' }}>Analyse · Trimestre 1 · CH03</span>
              <h1 style={{ fontSize:'clamp(24px,4vw,40px)', marginBottom:12 }}>Suites Réelles</h1>
              <p style={{ maxWidth:500, marginBottom:16 }}>Suites arithmétiques, géométriques, récurrentes. Convergence, monotonie et raisonnement par récurrence.</p>
              <div style={{ display:'flex', gap:20, fontSize:13, color:'var(--muted)', marginBottom:36 }}>
                <span>📝 28 exercices</span><span>·</span><span>📋 Bac 2015–2024</span>
              </div>
              <h2 style={{ fontSize:20, marginBottom:16 }}>📖 Cours</h2>
              <div style={{ display:'flex', flexDirection:'column', gap:10, marginBottom:36 }}>
                {COURS.map((c,i) => (
                  <div key={i} style={{ background:'var(--surface)', border:'1px solid var(--border)', borderRadius:14, padding:18, display:'flex', gap:14 }}>
                    <div style={{ minWidth:26, height:26, background:'linear-gradient(135deg,#4f6ef7,#7c3aed)', borderRadius:8, display:'flex', alignItems:'center', justifyContent:'center', fontSize:11, color:'white', fontFamily:'var(--font-mono)', flexShrink:0 }}>{i+1}</div>
                    <div>
                      <div style={{ fontFamily:'var(--font-display)', fontWeight:600, fontSize:14, marginBottom:6 }}>{c.titre}</div>
                      <div style={{ fontFamily:'var(--font-mono)', fontSize:13, color:'var(--teal)', background:'rgba(6,214,160,0.06)', padding:'8px 12px', borderRadius:8, lineHeight:1.8 }}>{c.contenu}</div>
                    </div>
                  </div>
                ))}
              </div>
              <h2 style={{ fontSize:20, marginBottom:16 }}>📝 Exercices</h2>
              <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
                {EXERCICES.map(ex => (
                  <div key={ex.num} style={{ background:'var(--surface)', border:'1px solid var(--border)', borderRadius:14, padding:18 }}>
                    <span className={`badge ${ex.diff==='bac'?'badge-blue':ex.diff==='difficile'?'badge-red':ex.diff==='moyen'?'badge-gold':'badge-teal'}`} style={{ marginBottom:8, display:'inline-block' }}>{ex.diff}</span>
                    <div style={{ fontFamily:'var(--font-display)', fontWeight:600, fontSize:14, marginBottom:8 }}>Ex {ex.num} — {ex.titre}</div>
                    <div style={{ fontFamily:'var(--font-mono)', fontSize:13, color:'var(--text2)', background:'var(--bg2)', padding:'10px 14px', borderRadius:8, marginBottom:10 }}>{ex.enonce}</div>
                    <div style={{ display:'flex', gap:8 }}>
                      <Link href={`/solve?q=${encodeURIComponent(ex.enonce)}`} className="btn btn-primary btn-sm">🧮 Résoudre</Link>
                      <button className="btn btn-ghost btn-sm">📋 Correction</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ position:'sticky', top:100, display:'flex', flexDirection:'column', gap:16 }}>
              <div className="card" style={{ padding:20 }}>
                <div style={{ fontSize:11, color:'var(--muted)', fontFamily:'var(--font-mono)', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:12 }}>Progression</div>
                <div style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:32, color:'var(--accent)' }}>75%</div>
                <div style={{ height:6, background:'var(--surface2)', borderRadius:100, margin:'8px 0 12px' }}><div style={{ height:'100%', width:'75%', background:'linear-gradient(90deg,var(--accent),var(--teal))', borderRadius:100 }} /></div>
                <div style={{ fontSize:12, color:'var(--muted)' }}>21 / 28 exercices complétés</div>
              </div>
              <div className="card" style={{ padding:20 }}>
                <div style={{ fontSize:11, color:'var(--muted)', fontFamily:'var(--font-mono)', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:12 }}>Navigation T1</div>
                {[['← Limites','/bac/trimestre1/limites'],['← Complexes','/bac/trimestre1/complexes'],['Dérivées →','/bac/trimestre2/derivees']].map(([l,h]) => (
                  <Link key={h} href={h} style={{ display:'block', padding:'8px 12px', borderRadius:8, textDecoration:'none', fontSize:13, color:'var(--muted)', marginBottom:4, transition:'all 0.2s' }}
                    onMouseEnter={e => { e.currentTarget.style.background='rgba(79,110,247,0.08)'; e.currentTarget.style.color='var(--text)' }}
                    onMouseLeave={e => { e.currentTarget.style.background=''; e.currentTarget.style.color='var(--muted)' }}
                  >{l}</Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <style>{`@media(max-width:900px){.container>div{grid-template-columns:1fr!important;}}`}</style>
    </>
  )
}

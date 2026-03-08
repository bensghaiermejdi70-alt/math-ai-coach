import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

const COURS = [
  { titre:'Primitive — Définition', contenu:'F est une primitive de f si F\'(x) = f(x). On note ∫f(x)dx = F(x) + C' },
  { titre:'Primitives usuelles', contenu:'∫xⁿdx = xⁿ⁺¹/(n+1)+C  |  ∫eˣdx = eˣ+C  |  ∫(1/x)dx = ln|x|+C  |  ∫sin(x)dx = -cos(x)+C' },
  { titre:'Intégration par parties', contenu:'∫u·v\'dx = [u·v] - ∫u\'·v dx  (choisir u dérivable simple, v\' intégrable)' },
  { titre:'Changement de variable', contenu:'∫f(g(x))·g\'(x)dx = ∫f(t)dt  avec t = g(x)' },
  { titre:'Intégrale définie', contenu:'∫ₐᵇ f(x)dx = [F(x)]ₐᵇ = F(b) - F(a)  (si F est une primitive de f)' },
  { titre:'Interprétation géométrique', contenu:'∫ₐᵇ f(x)dx représente l\'aire algébrique entre la courbe et l\'axe des abscisses' },
]

const EXERCICES = [
  { num:'01', titre:'Primitive par formule directe', diff:'facile', enonce:'Calculer : ∫ (3x² + 2x - 1) dx' },
  { num:'02', titre:'Intégrale définie', diff:'facile', enonce:'Calculer : ∫₀² (x² + 1) dx' },
  { num:'03', titre:'Intégration par parties', diff:'moyen', enonce:'Calculer : ∫ x·eˣ dx' },
  { num:'04', titre:'Intégration par parties (double)', diff:'difficile', enonce:'Calculer : ∫ x²·eˣ dx' },
  { num:'05', titre:'Changement de variable', diff:'moyen', enonce:'Calculer : ∫ x·√(x²+1) dx' },
  { num:'06', titre:'Intégrale trigonométrique', diff:'difficile', enonce:'Calculer : ∫ sin(x)·cos(x) dx' },
  { num:'07', titre:'Exercice type Bac', diff:'bac', enonce:'Soit f(x) = (x+1)·e^(-x). Calculer ∫₀¹ f(x)dx et interpréter géométriquement.' },
]

export default function IntegralesPage() {
  return (
    <>
      <Navbar />
      <main style={{ position:'relative', zIndex:1, paddingTop:80 }}>
        <div style={{ borderBottom:'1px solid var(--border)', padding:'14px clamp(20px,5vw,60px)', display:'flex', gap:8, alignItems:'center', fontSize:13, color:'var(--muted)' }}>
          <Link href="/bac" style={{ color:'var(--muted)', textDecoration:'none' }}>Bac</Link>
          <span>›</span>
          <span style={{ color:'var(--muted)' }}>Trimestre 3</span>
          <span>›</span>
          <span style={{ color:'var(--text)' }}>Primitives & Intégrales</span>
        </div>

        <div className="container" style={{ paddingTop:40, paddingBottom:80 }}>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 300px', gap:32, alignItems:'start' }}>
            <div>
              <span className="badge badge-blue" style={{ marginBottom:12, display:'inline-block' }}>Analyse · Trimestre 3 · CH08</span>
              <h1 style={{ fontSize:'clamp(24px,4vw,42px)', marginBottom:12 }}>Primitives & Calcul Intégral</h1>
              <p style={{ maxWidth:500, marginBottom:16 }}>Calcul de primitives, intégration par parties, changement de variable et intégrale définie.</p>
              <div style={{ display:'flex', gap:20, fontSize:13, color:'var(--muted)', marginBottom:36 }}>
                <span>📝 30 exercices</span><span>·</span><span>📋 Bac 2015-2024</span>
              </div>

              <h2 style={{ fontSize:22, marginBottom:20 }}>📖 Cours</h2>
              <div style={{ display:'flex', flexDirection:'column', gap:12, marginBottom:36 }}>
                {COURS.map((c, i) => (
                  <div key={i} style={{ background:'var(--surface)', border:'1px solid var(--border)', borderRadius:14, padding:18, display:'flex', gap:14 }}>
                    <div style={{ minWidth:26, height:26, background:'linear-gradient(135deg,var(--accent),var(--accent2))', borderRadius:8, display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'var(--font-mono)', fontSize:11, color:'white', flexShrink:0 }}>{i+1}</div>
                    <div>
                      <div style={{ fontFamily:'var(--font-display)', fontWeight:600, fontSize:14, marginBottom:6 }}>{c.titre}</div>
                      <div style={{ fontFamily:'var(--font-mono)', fontSize:13, color:'var(--teal)', background:'rgba(6,214,160,0.06)', padding:'6px 12px', borderRadius:8, lineHeight:1.8 }}>{c.contenu}</div>
                    </div>
                  </div>
                ))}
              </div>

              <h2 style={{ fontSize:22, marginBottom:20 }}>📝 Exercices</h2>
              <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
                {EXERCICES.map(ex => (
                  <div key={ex.num} style={{ background:'var(--surface)', border:'1px solid var(--border)', borderRadius:14, padding:18 }}>
                    <div style={{ display:'flex', justifyContent:'space-between', marginBottom:8 }}>
                      <span className={`badge ${ex.diff==='bac'?'badge-blue':ex.diff==='difficile'?'badge-red':ex.diff==='moyen'?'badge-gold':'badge-teal'}`}>{ex.diff}</span>
                    </div>
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

            {/* Sidebar */}
            <div style={{ position:'sticky', top:100, display:'flex', flexDirection:'column', gap:16 }}>
              <div className="card" style={{ padding:20 }}>
                <div style={{ fontSize:11, color:'var(--muted)', fontFamily:'var(--font-mono)', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:12 }}>Progression</div>
                <div style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:32, color:'var(--red)' }}>42%</div>
                <div style={{ height:6, background:'var(--surface2)', borderRadius:100, margin:'8px 0 12px' }}><div style={{ height:'100%', width:'42%', background:'linear-gradient(90deg,var(--red),#dc2626)', borderRadius:100 }} /></div>
                <div style={{ fontSize:12, color:'var(--red)', background:'rgba(239,68,68,0.08)', padding:'6px 10px', borderRadius:8 }}>⚠️ Point faible détecté — Focus ici !</div>
              </div>
              <div className="card" style={{ padding:20 }}>
                <div style={{ fontSize:11, color:'var(--muted)', fontFamily:'var(--font-mono)', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:12 }}>Accès rapide</div>
                <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                  <Link href="/chat?q=Explique les intégrales par parties" className="btn btn-primary btn-sm" style={{ justifyContent:'center' }}>🤖 Aide IA Intégrales</Link>
                  <Link href="/examens?chapter=integrales" className="btn btn-secondary btn-sm" style={{ justifyContent:'center' }}>📋 Examens Bac</Link>
                </div>
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

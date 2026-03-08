'use client'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

const COURS = [
  { titre: 'Forme algébrique', contenu: 'z = a + bi  avec  a = Re(z), b = Im(z)' },
  { titre: 'Module et argument', contenu: '|z| = √(a²+b²)   arg(z) = θ tel que cos θ = a/|z|, sin θ = b/|z|' },
  { titre: 'Forme trigonométrique', contenu: 'z = r(cos θ + i·sin θ)  avec r = |z|' },
  { titre: 'Forme exponentielle', contenu: 'z = r·e^(iθ)   (Formule d\'Euler : e^(iθ) = cos θ + i·sin θ)' },
  { titre: 'Conjugué', contenu: 'z̄ = a - bi   |z|² = z·z̄   Re(z) = (z+z̄)/2   Im(z) = (z-z̄)/2i' },
  { titre: 'Racines n-ièmes', contenu: 'Les n racines n-ièmes de z₀ = r·e^(iθ) sont : zₖ = ⁿ√r · e^(i(θ+2kπ)/n), k=0..n-1' },
]

const EXERCICES = [
  { num:'01', titre:'Écrire sous forme algébrique', diff:'facile', enonce:'Calculer : z = (2+3i)(1-2i)' },
  { num:'02', titre:'Module et argument', diff:'moyen', enonce:'Trouver le module et l\'argument de z = -1 + i√3' },
  { num:'03', titre:'Forme exponentielle', diff:'moyen', enonce:'Écrire z = 1 + i sous forme exponentielle' },
  { num:'04', titre:'Équation dans ℂ', diff:'difficile', enonce:'Résoudre dans ℂ : z² + 2z + 5 = 0' },
  { num:'05', titre:'Racines cubiques', diff:'difficile', enonce:'Trouver les racines cubiques de 8i' },
  { num:'06', titre:'Exercice type Bac', diff:'bac', enonce:'Soit z = (1+i)^n. Pour quelles valeurs de n ∈ ℕ, z est un réel positif ?' },
]

const diffColor: Record<string,string> = { facile:'var(--teal)', moyen:'var(--gold)', difficile:'var(--red)', bac:'var(--accent)' }
const diffBadge: Record<string,string> = { facile:'badge-teal', moyen:'badge-gold', difficile:'badge-red', bac:'badge-blue' }

export default function ComplexesPage() {
  return (
    <>
      <Navbar />
      <main style={{ position:'relative', zIndex:1, paddingTop:80 }}>

        {/* Breadcrumb */}
        <div style={{ borderBottom:'1px solid var(--border)', padding:'14px clamp(20px,5vw,60px)', display:'flex', gap:8, alignItems:'center', fontSize:13, color:'var(--muted)' }}>
          <Link href="/bac" style={{ color:'var(--muted)', textDecoration:'none' }}>Bac</Link>
          <span>›</span>
          <Link href="/bac" style={{ color:'var(--muted)', textDecoration:'none' }}>Trimestre 1</Link>
          <span>›</span>
          <span style={{ color:'var(--text)' }}>Nombres Complexes</span>
        </div>

        <div className="container" style={{ paddingTop:40, paddingBottom:80 }}>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 320px', gap:32, alignItems:'start' }}>

            {/* MAIN */}
            <div>
              {/* Header */}
              <div style={{ marginBottom:36 }}>
                <span className="badge badge-purple" style={{ marginBottom:12, display:'inline-block' }}>Algèbre · Trimestre 1 · CH02</span>
                <h1 style={{ fontSize:'clamp(24px,4vw,42px)', marginBottom:12 }}>Nombres Complexes</h1>
                <p style={{ maxWidth:500 }}>Maîtrise les formes algébrique, trigonométrique et exponentielle. Chapitre fondamental du Bac Tunisie.</p>
                <div style={{ display:'flex', gap:20, marginTop:16, fontSize:13, color:'var(--muted)' }}>
                  <span>📝 32 exercices</span>
                  <span>·</span>
                  <span>📋 Bac 2015-2024</span>
                  <span>·</span>
                  <span>⏱ ~6h d'étude</span>
                </div>
              </div>

              {/* Cours */}
              <div style={{ marginBottom:36 }}>
                <h2 style={{ fontSize:22, marginBottom:20 }}>📖 Cours — Rappels essentiels</h2>
                <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
                  {COURS.map((c, i) => (
                    <div key={i} style={{ background:'var(--surface)', border:'1px solid var(--border)', borderRadius:14, padding:20, display:'flex', gap:16, alignItems:'flex-start' }}>
                      <div style={{ minWidth:28, height:28, background:'linear-gradient(135deg,var(--accent),var(--accent2))', borderRadius:8, display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'var(--font-mono)', fontSize:12, color:'white', flexShrink:0 }}>{i+1}</div>
                      <div>
                        <div style={{ fontFamily:'var(--font-display)', fontWeight:600, fontSize:14, marginBottom:8 }}>{c.titre}</div>
                        <div style={{ fontFamily:'var(--font-mono)', fontSize:14, color:'var(--teal)', background:'rgba(6,214,160,0.06)', padding:'8px 14px', borderRadius:8 }}>{c.contenu}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Exercices */}
              <div>
                <h2 style={{ fontSize:22, marginBottom:20 }}>📝 Exercices</h2>
                <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
                  {EXERCICES.map(ex => (
                    <div key={ex.num} style={{ background:'var(--surface)', border:'1px solid var(--border)', borderRadius:14, padding:20 }}>
                      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:10 }}>
                        <div>
                          <span className={`badge ${diffBadge[ex.diff]}`} style={{ marginBottom:8, display:'inline-block' }}>{ex.diff}</span>
                          <div style={{ fontFamily:'var(--font-display)', fontWeight:600, fontSize:15 }}>Ex {ex.num} — {ex.titre}</div>
                        </div>
                      </div>
                      <div style={{ fontFamily:'var(--font-mono)', fontSize:14, color:'var(--text2)', background:'var(--bg2)', padding:'10px 14px', borderRadius:8, marginBottom:12 }}>{ex.enonce}</div>
                      <div style={{ display:'flex', gap:8 }}>
                        <Link href={`/solve?q=${encodeURIComponent(ex.enonce)}`} className="btn btn-primary btn-sm">🧮 Résoudre avec IA</Link>
                        <button className="btn btn-ghost btn-sm">📋 Voir correction</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* SIDEBAR */}
            <div style={{ position:'sticky', top:100, display:'flex', flexDirection:'column', gap:16 }}>
              <div className="card" style={{ padding:20 }}>
                <div style={{ fontSize:12, color:'var(--muted)', fontFamily:'var(--font-mono)', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:14 }}>Ta progression</div>
                <div style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:36, color:'var(--accent)', marginBottom:4 }}>82%</div>
                <div style={{ height:6, background:'var(--surface2)', borderRadius:100, marginBottom:14 }}><div style={{ height:'100%', width:'82%', background:'linear-gradient(90deg,var(--accent),var(--teal))', borderRadius:100 }} /></div>
                <div style={{ fontSize:12, color:'var(--muted)' }}>26 / 32 exercices complétés</div>
              </div>

              <div className="card" style={{ padding:20 }}>
                <div style={{ fontSize:12, color:'var(--muted)', fontFamily:'var(--font-mono)', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:14 }}>Actions rapides</div>
                <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                  <Link href="/chat?q=Explique les nombres complexes" className="btn btn-primary btn-sm" style={{ justifyContent:'center' }}>🤖 Chat IA Complexes</Link>
                  <Link href="/examens?chapter=complexes" className="btn btn-secondary btn-sm" style={{ justifyContent:'center' }}>📋 Examens Bac</Link>
                  <Link href="/solve" className="btn btn-ghost btn-sm" style={{ justifyContent:'center' }}>🧮 Solveur libre</Link>
                </div>
              </div>

              <div className="card" style={{ padding:20 }}>
                <div style={{ fontSize:12, color:'var(--muted)', fontFamily:'var(--font-mono)', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:14 }}>Chapitres voisins</div>
                {[['← Limites','/bac/trimestre1/limites'],['Suites →','/bac/trimestre1/suites']].map(([l,h]) => (
                  <Link key={h} href={h} style={{ display:'block', padding:'8px 12px', borderRadius:8, textDecoration:'none', fontSize:13, color:'var(--muted)', transition:'all 0.2s', marginBottom:4 }}
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

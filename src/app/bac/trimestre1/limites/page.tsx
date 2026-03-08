import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

const COURS = [
  { titre: 'Limite finie en un point', contenu: 'lim(x→a) f(x) = L  ⟺  ∀ε>0, ∃δ>0, |x-a|<δ ⟹ |f(x)-L|<ε' },
  { titre: 'Limites usuelles', contenu: 'lim(x→0) sin(x)/x = 1  |  lim(x→0) (eˣ-1)/x = 1  |  lim(x→∞) (1+1/x)^x = e' },
  { titre: 'Formes indéterminées', contenu: '∞/∞ , 0/0 , ∞-∞ , 0×∞ → factoriser, conjugué, règle de L\'Hôpital' },
  { titre: 'Limites en ±∞', contenu: 'Comparer les croissances : ln(x) ≪ xⁿ ≪ eˣ quand x→+∞' },
  { titre: 'Continuité', contenu: 'f continue en a ⟺ lim(x→a) f(x) = f(a). TVI : f continue sur [a,b], f(a)·f(b)<0 ⟹ ∃c∈]a,b[, f(c)=0' },
  { titre: 'Asymptotes', contenu: 'Horizontale : lim(x→±∞) f(x) = L. Oblique : lim(x→∞) [f(x)-(ax+b)] = 0. Verticale : lim(x→a) f(x) = ±∞' },
]

const EXERCICES = [
  { num:'01', titre:'Limite par substitution directe', diff:'facile', enonce:'Calculer : lim(x→2) (x²+3x-1)' },
  { num:'02', titre:'Levée de forme indéterminée 0/0', diff:'moyen', enonce:'Calculer : lim(x→1) (x²-1)/(x-1)' },
  { num:'03', titre:'Limite en ±∞', diff:'moyen', enonce:'Calculer : lim(x→+∞) (3x²+2x)/(x²-1)' },
  { num:'04', titre:'Limite avec racine carrée', diff:'moyen', enonce:'Calculer : lim(x→+∞) (√(x²+x) - x)' },
  { num:'05', titre:'Limite trigonométrique', diff:'difficile', enonce:'Calculer : lim(x→0) (1-cos x)/x²' },
  { num:'06', titre:'Continuité & TVI', diff:'difficile', enonce:'Montrer que x³ + 2x - 1 = 0 admet une solution dans ]0,1[' },
  { num:'07', titre:'Exercice type Bac', diff:'bac', enonce:'Étudier la continuité de f sur ℝ : f(x) = (x²-4)/(x-2) si x≠2, et f(2)=4' },
]

export default function LimitesPage() {
  return (
    <>
      <Navbar />
      <main style={{ position:'relative', zIndex:1, paddingTop:80 }}>
        <div style={{ borderBottom:'1px solid var(--border)', padding:'14px clamp(20px,5vw,60px)', display:'flex', gap:8, fontSize:13, color:'var(--muted)', alignItems:'center' }}>
          <Link href="/bac" style={{ color:'var(--muted)', textDecoration:'none' }}>Bac</Link><span>›</span>
          <span style={{ color:'var(--muted)' }}>Trimestre 1</span><span>›</span>
          <span style={{ color:'var(--text)' }}>Limites & Continuité</span>
        </div>
        <div className="container" style={{ paddingTop:40, paddingBottom:80 }}>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 300px', gap:32, alignItems:'start' }}>
            <div>
              <span className="badge badge-blue" style={{ marginBottom:12, display:'inline-block' }}>Analyse · Trimestre 1 · CH01</span>
              <h1 style={{ fontSize:'clamp(24px,4vw,40px)', marginBottom:12 }}>Limites & Continuité</h1>
              <p style={{ maxWidth:500, marginBottom:16 }}>Calcul de limites, formes indéterminées, continuité et théorème des valeurs intermédiaires.</p>
              <div style={{ display:'flex', gap:20, fontSize:13, color:'var(--muted)', marginBottom:36 }}>
                <span>📝 24 exercices</span><span>·</span><span>📋 Bac 2015–2024</span><span>·</span><span>⏱ ~5h</span>
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
                <div style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:32, color:'var(--gold)' }}>68%</div>
                <div style={{ height:6, background:'var(--surface2)', borderRadius:100, margin:'8px 0 12px' }}><div style={{ height:'100%', width:'68%', background:'linear-gradient(90deg,var(--gold),var(--orange))', borderRadius:100 }} /></div>
                <div style={{ fontSize:12, color:'var(--muted)' }}>16 / 24 exercices complétés</div>
              </div>
              <div className="card" style={{ padding:20 }}>
                <div style={{ fontSize:11, color:'var(--muted)', fontFamily:'var(--font-mono)', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:12 }}>Actions</div>
                <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                  <Link href="/chat?q=Explique les limites et formes indéterminées" className="btn btn-primary btn-sm" style={{ justifyContent:'center' }}>🤖 Chat IA Limites</Link>
                  <Link href="/examens?chapter=limites" className="btn btn-secondary btn-sm" style={{ justifyContent:'center' }}>📋 Examens Bac</Link>
                  <Link href="/bac/trimestre1/complexes" className="btn btn-ghost btn-sm" style={{ justifyContent:'center' }}>Complexes →</Link>
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

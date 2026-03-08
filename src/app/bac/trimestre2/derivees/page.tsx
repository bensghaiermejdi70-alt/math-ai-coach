import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

const COURS = [
  { titre:'Définition de la dérivée', contenu:"f'(a) = lim(h→0) [f(a+h)-f(a)]/h = lim(x→a) [f(x)-f(a)]/(x-a)" },
  { titre:'Dérivées usuelles', contenu:"(xⁿ)'=nxⁿ⁻¹  |  (eˣ)'=eˣ  |  (ln x)'=1/x  |  (sin x)'=cos x  |  (cos x)'=-sin x" },
  { titre:'Règles de dérivation', contenu:"(f+g)'=f'+g'  |  (fg)'=f'g+fg'  |  (f/g)'=(f'g-fg')/g²  |  (f∘g)'=(f'∘g)·g'" },
  { titre:'Dérivée d\'une composée', contenu:"Si h(x)=f(g(x)) alors h'(x)=f'(g(x))·g'(x). Ex: [e^(x²)]'=2x·e^(x²)" },
  { titre:'Tableau de variation', contenu:"f'(x)>0 ⟹ f croissante. f'(x)<0 ⟹ f décroissante. f'(a)=0 ⟹ extremum possible." },
  { titre:'Équation tangente', contenu:'Tangente en (a, f(a)) : y = f\'(a)(x-a) + f(a)' },
]

const EXERCICES = [
  { num:'01', titre:'Dérivée par définition', diff:'facile', enonce:"Calculer f'(x) par définition pour f(x) = x² + 3" },
  { num:'02', titre:'Dérivée par formules', diff:'facile', enonce:"Calculer f'(x) pour f(x) = 3x⁴ - 2x² + 5x - 1" },
  { num:'03', titre:'Dérivée produit', diff:'moyen', enonce:"f(x) = (2x+1)·e^x. Calculer f'(x)." },
  { num:'04', titre:'Dérivée composée', diff:'moyen', enonce:"f(x) = ln(x²+3x+1). Calculer f'(x)." },
  { num:'05', titre:'Dérivée quotient', diff:'moyen', enonce:"f(x) = (x²-1)/(x+2). Calculer f'(x) et simplifier." },
  { num:'06', titre:'Étude de fonction complète', diff:'difficile', enonce:'f(x) = x·e^(-x). Domaine, dérivée, variations, limites, asymptotes.' },
  { num:'07', titre:'Équation de tangente', diff:'moyen', enonce:"f(x) = x² + 2x. Trouver la tangente en x=1 et en x=-1." },
  { num:'08', titre:'Type Bac — Étude complète', diff:'bac', enonce:'f(x) = (x²+x+1)/(x-1). Étude complète : domaine, limites, asymptotes, dérivée, tableau de variation, courbe.' },
]

export default function DeriveesPage() {
  return (
    <>
      <Navbar />
      <main style={{ position:'relative', zIndex:1, paddingTop:80 }}>
        <div style={{ borderBottom:'1px solid var(--border)', padding:'14px clamp(20px,5vw,60px)', display:'flex', gap:8, fontSize:13, color:'var(--muted)', alignItems:'center' }}>
          <Link href="/bac" style={{ color:'var(--muted)', textDecoration:'none' }}>Bac</Link><span>›</span>
          <span style={{ color:'var(--muted)' }}>Trimestre 2</span><span>›</span>
          <span style={{ color:'var(--text)' }}>Dérivabilité & Étude de fonctions</span>
        </div>
        <div className="container" style={{ paddingTop:40, paddingBottom:80 }}>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 300px', gap:32, alignItems:'start' }}>
            <div>
              <span className="badge badge-blue" style={{ marginBottom:12, display:'inline-block' }}>Analyse · Trimestre 2 · CH04</span>
              <h1 style={{ fontSize:'clamp(24px,4vw,40px)', marginBottom:12 }}>Dérivabilité & Étude de Fonctions</h1>
              <p style={{ maxWidth:500, marginBottom:16 }}>Calcul de dérivées, règles de dérivation, tableaux de variations et étude complète de fonctions.</p>
              <div style={{ display:'flex', gap:20, fontSize:13, color:'var(--muted)', marginBottom:36 }}>
                <span>📝 36 exercices</span><span>·</span><span>📋 Bac 2015–2024</span><span>·</span><span>⏱ ~8h</span>
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
                <div style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:32, color:'var(--teal)' }}>90%</div>
                <div style={{ height:6, background:'var(--surface2)', borderRadius:100, margin:'8px 0 12px' }}><div style={{ height:'100%', width:'90%', background:'linear-gradient(90deg,var(--teal),#059669)', borderRadius:100 }} /></div>
                <div style={{ fontSize:12, color:'var(--teal)' }}>⭐ Point fort — Continue!</div>
              </div>
              <div className="card" style={{ padding:20 }}>
                <div style={{ fontSize:11, color:'var(--muted)', fontFamily:'var(--font-mono)', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:12 }}>Chapitres T2</div>
                {[['Dérivées (ici)','#'],['Logarithme','/bac/trimestre2/logarithme'],['Exponentielle','/bac/trimestre2/exponentielle'],['Géométrie espace','/bac/trimestre2/geometrie-espace']].map(([l,h]) => (
                  <Link key={h} href={h} style={{ display:'block', padding:'8px 12px', borderRadius:8, textDecoration:'none', fontSize:13, color: h==='#'?'var(--accent)':'var(--muted)', background: h==='#'?'rgba(79,110,247,0.1)':'transparent', marginBottom:4, transition:'all 0.2s' }}>{l}</Link>
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

import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

const COURS = [
  { titre: "Probabilité conditionnelle", contenu: "P(A|B) = P(A∩B)/P(B). Formule totale: P(A) = sum P(A|Bi)·P(Bi)" },
  { titre: "Théorème de Bayes", contenu: "P(Bi|A) = P(A|Bi)·P(Bi) / P(A)" },
  { titre: "Variable aléatoire", contenu: "E(X) = sum xi·pi. V(X) = E(X²) - [E(X)]²  = sum pi·(xi-E)²" },
  { titre: "Loi binomiale", contenu: "X~B(n,p): P(X=k)=C(n,k)·pᵏ·(1-p)^(n-k). E(X)=np. V(X)=np(1-p)" },
  { titre: "Loi normale", contenu: "X~N(mu,sigma²). Centrage: Z=(X-mu)/sigma~N(0,1). Table de Gauss." }
]

const EXERCICES = [
  { num:"01", titre:"Probabilité", diff:"facile", enonce:"3 rouges, 5 bleues. P(rouge au 1er tirage)?" },
  { num:"02", titre:"Probabilité cond.", diff:"moyen", enonce:"P(A)=0.4, P(B)=0.3, P(A∩B)=0.12. Calculer P(A|B)." },
  { num:"03", titre:"Formule totale", diff:"moyen", enonce:"2 usines: U1(60%, défaut 2%), U2(40%, défaut 5%). P(défaut)?" },
  { num:"04", titre:"Loi binomiale", diff:"moyen", enonce:"X~B(10,0.3). P(X=3), P(X>=2), E(X)." },
  { num:"05", titre:"Bayes", diff:"difficile", enonce:"Sachant défaut dans ex03: P(vient de U1)?" },
  { num:"06", titre:"Loi normale", diff:"difficile", enonce:"X~N(50,4). Calculer P(46<=X<=54) et P(X>52)." },
  { num:"07", titre:"Type Bac", diff:"bac", enonce:"Arbre proba complet + variable aléatoire + espérance." }
]

export default function Page() {
  return (
    <>
      <Navbar />
      <main style={{ position:'relative', zIndex:1, paddingTop:80 }}>
        <div style={{ borderBottom:'1px solid var(--border)', padding:'14px clamp(20px,5vw,60px)', display:'flex', gap:8, fontSize:13, color:'var(--muted)', alignItems:'center' }}>
          <Link href="/bac" style={{ color:'var(--muted)', textDecoration:'none' }}>Bac</Link><span>›</span>
          <span style={{ color:'var(--text)' }}>Probabilités & Variables Aléatoires</span>
        </div>
        <div className="container" style={{ paddingTop:40, paddingBottom:80 }}>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 300px', gap:32, alignItems:'start' }}>
            <div>
              <span className="badge badge-gold" style={{ marginBottom:12, display:'inline-block' }}>Probabilités · T3 · CH10</span>
              <h1 style={{ fontSize:'clamp(24px,4vw,40px)', marginBottom:12 }}>Probabilités & Variables Aléatoires</h1>
              <p style={{ maxWidth:500, marginBottom:16 }}>Probabilités conditionnelles, loi binomiale, loi normale et espérance.</p>
              <div style={{ display:'flex', gap:16, fontSize:13, color:'var(--muted)', marginBottom:36 }}>
                <span>📝 26 exercices · Bac 2015-2024</span>
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
                <div style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:32, color:'var(--accent)' }}>78%</div>
                <div style={{ height:6, background:'var(--surface2)', borderRadius:100, margin:'8px 0 12px' }}><div style={{ height:'100%', width:'78%', background:'linear-gradient(90deg,var(--accent),var(--accent))', borderRadius:100 }} /></div>
              </div>
              <div className="card" style={{ padding:20 }}>
                <div style={{ fontSize:11, color:'var(--muted)', fontFamily:'var(--font-mono)', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:12 }}>Actions rapides</div>
                <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                  <Link href="/chat" className="btn btn-primary btn-sm" style={{ justifyContent:'center' }}>🤖 Chat IA</Link>
                  <Link href="/examens" className="btn btn-secondary btn-sm" style={{ justifyContent:'center' }}>📋 Examens Bac</Link>
                  <Link href="/solve" className="btn btn-ghost btn-sm" style={{ justifyContent:'center' }}>🧮 Solveur libre</Link>
                </div>
              </div>
              <div className="card" style={{ padding:20 }}>
                <div style={{ fontSize:11, color:'var(--muted)', fontFamily:'var(--font-mono)', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:12 }}>Navigation</div>
                <Link key="/bac/trimestre3/equations-diff" href="/bac/trimestre3/equations-diff" style={{ display:"block", padding:"8px 12px", borderRadius:8, textDecoration:"none", fontSize:13, color:"var(--muted)", marginBottom:4 }}>← Éq. Diff</Link>
<Link key="/bac/trimestre3/isometries" href="/bac/trimestre3/isometries" style={{ display:"block", padding:"8px 12px", borderRadius:8, textDecoration:"none", fontSize:13, color:"var(--muted)", marginBottom:4 }}>Isométries →</Link>
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

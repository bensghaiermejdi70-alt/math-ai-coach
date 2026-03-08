import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

const COURS = [
  { titre: "EDO 1er ordre linéaire", contenu: "y' + a(x)·y = b(x). Solution: y = e^(-∫a dx)·(∫b·e^(∫a dx) dx + C)" },
  { titre: "Variables séparables", contenu: "y' = f(x)·g(y)  =>  ∫dy/g(y) = ∫f(x)dx" },
  { titre: "EDO 2ème ordre const.", contenu: "ay'' + by' + cy = 0. Éq. caractéristique: ar²+br+c=0" },
  { titre: "Delta > 0", contenu: "2 racines r1,r2: y = C1·e^(r1·x) + C2·e^(r2·x)" },
  { titre: "Delta = 0", contenu: "Racine double r0: y = (C1+C2·x)·e^(r0·x)" },
  { titre: "Delta < 0", contenu: "Racines alpha±i·beta: y = e^(alpha·x)·(C1·cos(beta·x)+C2·sin(beta·x))" }
]

const EXERCICES = [
  { num:"01", titre:"EDO séparable", diff:"facile", enonce:"Résoudre : y' = 2xy, y(0)=1" },
  { num:"02", titre:"EDO 1er ordre", diff:"moyen", enonce:"Résoudre : y' + 2y = 4, y(0)=3" },
  { num:"03", titre:"EDO 1er ordre non homo", diff:"moyen", enonce:"Résoudre : y' - y = eˣ" },
  { num:"04", titre:"EDO 2ème ordre D>0", diff:"difficile", enonce:"Résoudre : y'' - 5y' + 6y = 0" },
  { num:"05", titre:"EDO 2ème ordre D=0", diff:"difficile", enonce:"Résoudre : y'' - 4y' + 4y = 0, y(0)=1, y(0)=0" },
  { num:"06", titre:"Type Bac", diff:"bac", enonce:"y'' - 3y' + 2y = 2eˣ. Sol. générale + particulière avec CI." }
]

export default function Page() {
  return (
    <>
      <Navbar />
      <main style={{ position:'relative', zIndex:1, paddingTop:80 }}>
        <div style={{ borderBottom:'1px solid var(--border)', padding:'14px clamp(20px,5vw,60px)', display:'flex', gap:8, fontSize:13, color:'var(--muted)', alignItems:'center' }}>
          <Link href="/bac" style={{ color:'var(--muted)', textDecoration:'none' }}>Bac</Link><span>›</span>
          <span style={{ color:'var(--text)' }}>Équations Différentielles</span>
        </div>
        <div className="container" style={{ paddingTop:40, paddingBottom:80 }}>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 300px', gap:32, alignItems:'start' }}>
            <div>
              <span className="badge badge-blue" style={{ marginBottom:12, display:'inline-block' }}>Analyse · T3 · CH09</span>
              <h1 style={{ fontSize:'clamp(24px,4vw,40px)', marginBottom:12 }}>Équations Différentielles</h1>
              <p style={{ maxWidth:500, marginBottom:16 }}>EDO du 1er et 2ème ordre. Solutions générales et particulières.</p>
              <div style={{ display:'flex', gap:16, fontSize:13, color:'var(--muted)', marginBottom:36 }}>
                <span>📝 16 exercices · Bac 2017-2024</span>
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
                <div style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:32, color:'var(--gold)' }}>50%</div>
                <div style={{ height:6, background:'var(--surface2)', borderRadius:100, margin:'8px 0 12px' }}><div style={{ height:'100%', width:'50%', background:'linear-gradient(90deg,var(--gold),var(--gold))', borderRadius:100 }} /></div>
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
                <Link key="/bac/trimestre3/integrales" href="/bac/trimestre3/integrales" style={{ display:"block", padding:"8px 12px", borderRadius:8, textDecoration:"none", fontSize:13, color:"var(--muted)", marginBottom:4 }}>← Intégrales</Link>
<Link key="/bac/trimestre3/probabilites" href="/bac/trimestre3/probabilites" style={{ display:"block", padding:"8px 12px", borderRadius:8, textDecoration:"none", fontSize:13, color:"var(--muted)", marginBottom:4 }}>Probabilités →</Link>
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

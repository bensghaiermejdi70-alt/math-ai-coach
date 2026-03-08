import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

const COURS = [
  { titre: "Définition", contenu: "ln est la primitive de 1/x sur ]0,+inf[ avec ln(1)=0" },
  { titre: "Propriétés", contenu: "ln(ab)=ln a+ln b | ln(a/b)=ln a-ln b | ln(aⁿ)=n·ln a" },
  { titre: "Dérivée", contenu: "(ln x)'=1/x | (ln u)'=u'/u" },
  { titre: "Limites", contenu: "lim(x->0+) ln x = -inf | lim(x->+inf) ln x = +inf | lim(x->+inf) ln(x)/x = 0" },
  { titre: "Croissances comparées", contenu: "lim(x->+inf) ln(x)/xⁿ=0 pour tout n>0" }
]

const EXERCICES = [
  { num:"01", titre:"ln par calcul", diff:"facile", enonce:"Calculer : ln(e³) - ln(e) + ln(1)" },
  { num:"02", titre:"Équation log", diff:"moyen", enonce:"Résoudre : ln(x+1) + ln(x-1) = ln(3)" },
  { num:"03", titre:"Dérivée composée", diff:"moyen", enonce:"f(x) = ln(x²+3x+1). Calculer f(x)." },
  { num:"04", titre:"Étude de fonction", diff:"difficile", enonce:"f(x) = x·ln(x) sur ]0,+inf[. Dérivée, minimum, courbe." },
  { num:"05", titre:"Limite", diff:"moyen", enonce:"Calculer : lim(x->0+) x²·ln(x)" },
  { num:"06", titre:"Type Bac", diff:"bac", enonce:"f(x) = ln(x)/(x-1). Étude complète avec asymptotes." }
]

export default function Page() {
  return (
    <>
      <Navbar />
      <main style={{ position:'relative', zIndex:1, paddingTop:80 }}>
        <div style={{ borderBottom:'1px solid var(--border)', padding:'14px clamp(20px,5vw,60px)', display:'flex', gap:8, fontSize:13, color:'var(--muted)', alignItems:'center' }}>
          <Link href="/bac" style={{ color:'var(--muted)', textDecoration:'none' }}>Bac</Link><span>›</span>
          <span style={{ color:'var(--text)' }}>Fonction Logarithme Népérien</span>
        </div>
        <div className="container" style={{ paddingTop:40, paddingBottom:80 }}>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 300px', gap:32, alignItems:'start' }}>
            <div>
              <span className="badge badge-blue" style={{ marginBottom:12, display:'inline-block' }}>Analyse · T2 · CH05</span>
              <h1 style={{ fontSize:'clamp(24px,4vw,40px)', marginBottom:12 }}>Fonction Logarithme Népérien</h1>
              <p style={{ maxWidth:500, marginBottom:16 }}>Définition, propriétés, dérivée et applications de la fonction ln.</p>
              <div style={{ display:'flex', gap:16, fontSize:13, color:'var(--muted)', marginBottom:36 }}>
                <span>📝 20 exercices · Bac 2015-2024</span>
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
                <div style={{ height:6, background:'var(--surface2)', borderRadius:100, margin:'8px 0 12px' }}><div style={{ height:'100%', width:'75%', background:'linear-gradient(90deg,var(--accent),var(--accent))', borderRadius:100 }} /></div>
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
                <Link key="/bac/trimestre2/derivees" href="/bac/trimestre2/derivees" style={{ display:"block", padding:"8px 12px", borderRadius:8, textDecoration:"none", fontSize:13, color:"var(--muted)", marginBottom:4 }}>← Dérivées</Link>
<Link key="/bac/trimestre2/exponentielle" href="/bac/trimestre2/exponentielle" style={{ display:"block", padding:"8px 12px", borderRadius:8, textDecoration:"none", fontSize:13, color:"var(--muted)", marginBottom:4 }}>Exponentielle →</Link>
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

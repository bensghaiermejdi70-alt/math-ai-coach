import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

const COURS = [
  { titre: "Vecteurs dans R³", contenu: "AB = (xB-xA, yB-yA, zB-zA). Norme: ||v||=sqrt(x²+y²+z²)" },
  { titre: "Produit scalaire", contenu: "u·v = x1x2+y1y2+z1z2 = ||u||·||v||·cos θ. Perp: u·v=0" },
  { titre: "Produit vectoriel", contenu: "u∧v = (y1z2-z1y2, z1x2-x1z2, x1y2-y1x2)" },
  { titre: "Équation d'un plan", contenu: "Plan par A(x0,y0,z0), normale n(a,b,c): a(x-x0)+b(y-y0)+c(z-z0)=0" },
  { titre: "Distance point-plan", contenu: "d(M,P) = |ax0+by0+cz0+d| / sqrt(a²+b²+c²)" }
]

const EXERCICES = [
  { num:"01", titre:"Vecteurs et norme", diff:"facile", enonce:"A(1,2,3), B(4,0,1). Calculer AB et sa norme." },
  { num:"02", titre:"Produit scalaire", diff:"facile", enonce:"u=(2,1,-1), v=(1,3,2). Calculer u·v. Perpendiculaires?" },
  { num:"03", titre:"Équation de plan", diff:"moyen", enonce:"Plan par A(1,0,2) de normale n=(3,-1,2). Équation?" },
  { num:"04", titre:"Intersection", diff:"moyen", enonce:"Droite D:(x=1+t, y=2-t, z=3t). Plan P:2x-y+z=5. Intersection?" },
  { num:"05", titre:"Distance", diff:"difficile", enonce:"Distance du point A(3,-1,2) au plan 2x+y-2z=5." },
  { num:"06", titre:"Type Bac", diff:"bac", enonce:"A(1,2,0), B(3,0,1), C(0,1,2). Plan ABC, droite perp, distances." }
]

export default function Page() {
  return (
    <>
      <Navbar />
      <main style={{ position:'relative', zIndex:1, paddingTop:80 }}>
        <div style={{ borderBottom:'1px solid var(--border)', padding:'14px clamp(20px,5vw,60px)', display:'flex', gap:8, fontSize:13, color:'var(--muted)', alignItems:'center' }}>
          <Link href="/bac" style={{ color:'var(--muted)', textDecoration:'none' }}>Bac</Link><span>›</span>
          <span style={{ color:'var(--text)' }}>Géométrie dans l'Espace</span>
        </div>
        <div className="container" style={{ paddingTop:40, paddingBottom:80 }}>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 300px', gap:32, alignItems:'start' }}>
            <div>
              <span className="badge badge-teal" style={{ marginBottom:12, display:'inline-block' }}>Géométrie · T2 · CH07</span>
              <h1 style={{ fontSize:'clamp(24px,4vw,40px)', marginBottom:12 }}>Géométrie dans l'Espace</h1>
              <p style={{ maxWidth:500, marginBottom:16 }}>Vecteurs, droites et plans dans R³. Produits scalaire et vectoriel.</p>
              <div style={{ display:'flex', gap:16, fontSize:13, color:'var(--muted)', marginBottom:36 }}>
                <span>📝 18 exercices · Bac 2016-2024</span>
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
                <div style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:32, color:'var(--gold)' }}>60%</div>
                <div style={{ height:6, background:'var(--surface2)', borderRadius:100, margin:'8px 0 12px' }}><div style={{ height:'100%', width:'60%', background:'linear-gradient(90deg,var(--gold),var(--gold))', borderRadius:100 }} /></div>
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
                <Link key="/bac/trimestre2/exponentielle" href="/bac/trimestre2/exponentielle" style={{ display:"block", padding:"8px 12px", borderRadius:8, textDecoration:"none", fontSize:13, color:"var(--muted)", marginBottom:4 }}>← Exponentielle</Link>
<Link key="/bac/trimestre3/integrales" href="/bac/trimestre3/integrales" style={{ display:"block", padding:"8px 12px", borderRadius:8, textDecoration:"none", fontSize:13, color:"var(--muted)", marginBottom:4 }}>Intégrales →</Link>
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

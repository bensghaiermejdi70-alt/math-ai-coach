'use client'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

export default function BacFrancePage() {
  return (
    <>
      <Navbar />
      <main style={{ position:'relative', zIndex:1, paddingTop:80 }}>
        <div className="container" style={{ paddingTop:40, paddingBottom:80 }}>

          <div style={{ marginBottom:40 }}>
            <span className="label" style={{ marginBottom:12, display:'inline-block' }}>🇫🇷 Éducation Nationale France · Lycée</span>
            <h1 style={{ fontSize:'clamp(28px,4vw,48px)', marginBottom:14 }}>
              Programme France<br />
              <span style={{ background:'linear-gradient(90deg,#f59e0b,#06b6d4)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>
                Mathématiques
              </span>
            </h1>
            <p style={{ maxWidth:600, color:'var(--text2)', fontSize:14, lineHeight:1.7, marginBottom:20 }}>
              Programmes officiels MEN 2026 · Seconde · Première et Terminale Générale · Voies Technologiques.
              Cours, théorèmes, formules, exercices corrigés et IA professeur.
            </p>
          </div>

          <Link href="/bac-france/maths" style={{ textDecoration:'none' }}>
            <div style={{ background:'linear-gradient(135deg,rgba(245,158,11,0.14),rgba(249,115,22,0.07))', border:'1px solid rgba(245,158,11,0.3)', borderRadius:22, padding:'32px 28px', cursor:'pointer' }}>
              <div style={{ display:'flex', alignItems:'center', gap:14, marginBottom:16 }}>
                <div style={{ width:60, height:60, borderRadius:16, background:'rgba(245,158,11,0.2)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:30 }}>
                  🧮
                </div>
                <div>
                  <h2 style={{ fontSize:22, fontWeight:900, color:'var(--text)', margin:'0 0 4px' }}>Mathématiques</h2>
                  <span style={{ fontSize:11, padding:'3px 10px', borderRadius:20, background:'rgba(245,158,11,0.22)', color:'#fbbf24', fontWeight:700 }}>
                    5 voies · 54 chapitres
                  </span>
                </div>
              </div>
              <p style={{ fontSize:13, color:'var(--text2)', marginBottom:20, lineHeight:1.6 }}>
                Seconde · Première Spé · Terminale Générale · Maths Expertes · Terminale Techno
              </p>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:10, marginBottom:20 }}>
                {[{val:'5',label:'voies'},{val:'54',label:'chapitres'},{val:'419+',label:'théorèmes'},{val:'364+',label:'exercices'}].map(s => (
                  <div key={s.label} style={{ textAlign:'center', background:'rgba(0,0,0,0.15)', borderRadius:10, padding:'10px 6px' }}>
                    <div style={{ fontSize:18, fontWeight:900, color:'#f59e0b' }}>{s.val}</div>
                    <div style={{ fontSize:10, color:'var(--muted)' }}>{s.label}</div>
                  </div>
                ))}
              </div>
              <div style={{ display:'flex', justifyContent:'flex-end' }}>
                <span style={{ color:'#f59e0b', fontWeight:800, fontSize:15 }}>Accéder au programme →</span>
              </div>
            </div>
          </Link>

          <div style={{ marginTop:40, background:'linear-gradient(135deg,rgba(79,110,247,0.1),rgba(124,58,237,0.06))', border:'1px solid rgba(79,110,247,0.2)', borderRadius:18, padding:'24px 28px', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:16 }}>
            <div>
              <div style={{ fontFamily:'var(--font-mono)', fontSize:11, color:'#818cf8', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:6 }}>🤖 IA · Maths France</div>
              <h3 style={{ fontSize:17, marginBottom:4 }}>Prof IA — Pose toutes tes questions</h3>
              <p style={{ fontSize:13, color:'var(--text2)', margin:0 }}>Solveur, simulation d'examen, chat professeur</p>
            </div>
            <div style={{ display:'flex', gap:10 }}>
              <Link href="/chat" className="btn btn-primary" style={{ whiteSpace:'nowrap' }}>🤖 Chat Prof IA</Link>
              <Link href="/simulation-france" className="btn btn-secondary" style={{ whiteSpace:'nowrap' }}>🎯 Simulation France</Link>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </>
  )
}
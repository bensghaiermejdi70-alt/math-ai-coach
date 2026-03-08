import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

const semestres = [
  { num:1, modules:[
    { id:'analyse1', title:'Analyse 1', icon:'∫', chapitres:['Logique & raisonnement','Ensembles & applications','Suites réelles avancées','Limites & continuité'], exos:40 },
    { id:'algebre1', title:'Algèbre 1', icon:'⊕', chapitres:['Complexes approfondis','Polynômes & fractions rationnelles','Systèmes linéaires — Gauss','Matrices & inversibilité','Arithmétique & PGCD'], exos:50 },
  ]},
  { num:2, modules:[
    { id:'analyse2', title:'Analyse 2', icon:'∂', chapitres:['Dérivation avancée','DL — Taylor & MacLaurin','Intégration avancée','EDO du 2ème ordre'], exos:38 },
    { id:'algebre-lineaire', title:'Algèbre Linéaire', icon:'⊗', chapitres:['Espaces vectoriels','Applications linéaires','Déterminants','Valeurs propres & diagonalisation'], exos:42 },
  ]},
  { num:3, modules:[
    { id:'analyse3', title:'Analyse 3', icon:'Σ', chapitres:['Séries numériques','Suites & séries de fonctions','Séries entières','Intégrales généralisées','Fonctions de 2 variables'], exos:36 },
    { id:'topologie', title:'Topologie & Analyse', icon:'τ', chapitres:['Espaces métriques','Compacité','Connexité','Fonctions continues sur espaces métriques'], exos:28 },
  ]},
  { num:4, modules:[
    { id:'proba-stats', title:'Probabilités & Statistiques', icon:'ℙ', chapitres:['Dénombrement','Variables aléatoires discrètes','Lois continues (normale, exp)','Estimation & tests','Chaînes de Markov'], exos:44 },
    { id:'analyse4', title:'Analyse 4 / Calcul différentiel', icon:'∇', chapitres:['Fonctions à plusieurs variables','Différentielle & gradient','Extrema','Intégrale double'], exos:30 },
  ]},
]

export default function UniversitePage() {
  return (
    <>
      <Navbar />
      <main style={{ position:'relative', zIndex:1, paddingTop:80 }}>
        <div className="container" style={{ paddingTop:40, paddingBottom:80 }}>

          <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', flexWrap:'wrap', gap:20, marginBottom:50 }}>
            <div>
              <span className="label">🎓 Université — FST Tunisie</span>
              <h1 style={{ fontSize:'clamp(28px,4vw,48px)', marginBottom:12 }}>Licence Mathématiques<br/>Semestres 1 → 4</h1>
              <p style={{ maxWidth:500 }}>Programme complet de la Faculté des Sciences — LFM, LMI, LMA. Cours, TD corrigés et examens partiels.</p>
            </div>
            <div style={{ display:'flex', gap:10 }}>
              <Link href="/examens?level=universite" className="btn btn-secondary">📋 Partiels & Examens</Link>
              <Link href="/bac" className="btn btn-ghost">🏫 Bac ←</Link>
            </div>
          </div>

          {/* Tabs filières */}
          <div style={{ display:'flex', gap:4, background:'var(--surface)', border:'1px solid var(--border)', borderRadius:12, padding:4, width:'fit-content', marginBottom:50 }}>
            {['LFM — Licence Fondamentale Maths','LMI — Maths & Informatique','LMA — Maths Appliquées'].map((f,i) => (
              <button key={f} style={{ padding:'10px 18px', borderRadius:8, border:'none', background: i===0 ? 'var(--accent)' : 'transparent', color: i===0 ? 'white' : 'var(--muted)', fontFamily:'var(--font-body)', fontSize:13, fontWeight:500, cursor:'pointer', transition:'all 0.2s' }}>
                {f}
              </button>
            ))}
          </div>

          {/* Semestres */}
          {semestres.map(s => (
            <div key={s.num} style={{ marginBottom:50 }}>
              <div style={{ display:'flex', alignItems:'center', gap:14, marginBottom:24 }}>
                <div style={{ padding:'6px 16px', background:'linear-gradient(135deg,var(--accent),var(--accent2))', borderRadius:100, fontFamily:'var(--font-display)', fontWeight:700, fontSize:14, color:'white' }}>Semestre {s.num}</div>
                <div style={{ height:1, flex:1, background:'var(--border)' }} />
              </div>

              <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(340px,1fr))', gap:20 }}>
                {s.modules.map(mod => (
                  <div key={mod.id} className="card" style={{ display:'flex', flexDirection:'column', gap:16 }}>
                    <div style={{ display:'flex', alignItems:'center', gap:14 }}>
                      <div style={{ width:48, height:48, background:'rgba(79,110,247,0.15)', borderRadius:14, display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'var(--font-mono)', fontSize:22, color:'var(--accent)' }}>{mod.icon}</div>
                      <div>
                        <h4 style={{ fontSize:16, marginBottom:2 }}>{mod.title}</h4>
                        <span style={{ fontSize:12, color:'var(--muted)' }}>📝 {mod.exos} exercices · TD corrigés</span>
                      </div>
                    </div>

                    <ul style={{ listStyle:'none' }}>
                      {mod.chapitres.map(ch => (
                        <li key={ch} style={{ display:'flex', gap:10, fontSize:13, color:'var(--muted)', padding:'6px 0', borderBottom:'1px solid rgba(255,255,255,0.04)' }}>
                          <span style={{ color:'var(--accent)', fontSize:11, marginTop:2 }}>▶</span>{ch}
                        </li>
                      ))}
                    </ul>

                    <div style={{ display:'flex', gap:8 }}>
                      <Link href={`/universite/${mod.id}`} className="btn btn-primary btn-sm" style={{ flex:1, justifyContent:'center' }}>Étudier →</Link>
                      <Link href={`/examens?module=${mod.id}`} className="btn btn-ghost btn-sm">Partiels</Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

        </div>
      </main>
      <Footer />
    </>
  )
}
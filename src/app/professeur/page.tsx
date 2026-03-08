'use client'
import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ProgressBar from '@/components/ui/ProgressBar'

const STUDENTS = [
  { name:'Ahmed B.', score:82, weak:'Intégrales', strong:'Complexes', streak:12 },
  { name:'Sana M.', score:67, weak:'Limites', strong:'Probabilités', streak:5 },
  { name:'Yassine T.', score:91, weak:'Isométries', strong:'Dérivées', streak:20 },
  { name:'Nour K.', score:54, weak:'Suites', strong:'Algèbre', streak:2 },
  { name:'Rim H.', score:78, weak:'Éq. Diff', strong:'Intégrales', streak:8 },
]

const CHAPTERS = ['Complexes','Limites','Suites','Dérivées','Logarithme','Exponentielle','Géométrie','Intégrales','Éq. Diff','Probabilités']

export default function ProfesseurPage() {
  const [genChapter, setGenChapter] = useState('Intégrales')
  const [genDiff, setGenDiff] = useState('moyen')
  const [genCount, setGenCount] = useState(5)
  const [generated, setGenerated] = useState(false)

  return (
    <>
      <Navbar />
      <main style={{ position:'relative', zIndex:1, paddingTop:80 }}>
        <div className="container" style={{ paddingTop:40, paddingBottom:80 }}>

          {/* Header */}
          <div style={{ marginBottom:40 }}>
            <span className="label">👨‍🏫 Espace Professeur</span>
            <h1 style={{ fontSize:'clamp(28px,4vw,48px)', marginBottom:12 }}>Gérer ta Classe<br/>avec l'IA</h1>
            <p style={{ maxWidth:500 }}>Génère des exercices, suis la progression de tes étudiants et crée des examens automatiquement.</p>
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:30, alignItems:'start' }}>

            {/* LEFT */}
            <div style={{ display:'flex', flexDirection:'column', gap:24 }}>

              {/* Génération d'exercices */}
              <div className="card">
                <h3 style={{ marginBottom:20, fontSize:18 }}>🧠 Générer des Exercices IA</h3>
                <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
                  <div>
                    <label style={{ fontSize:12, color:'var(--muted)', display:'block', marginBottom:6, fontFamily:'var(--font-mono)', textTransform:'uppercase', letterSpacing:'0.06em' }}>Chapitre</label>
                    <select className="input" value={genChapter} onChange={e => setGenChapter(e.target.value)} style={{ background:'var(--bg2)' }}>
                      {CHAPTERS.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize:12, color:'var(--muted)', display:'block', marginBottom:6, fontFamily:'var(--font-mono)', textTransform:'uppercase', letterSpacing:'0.06em' }}>Difficulté</label>
                    <div style={{ display:'flex', gap:8 }}>
                      {['facile','moyen','difficile','bac'].map(d => (
                        <button key={d} onClick={() => setGenDiff(d)} style={{ flex:1, padding:'8px', borderRadius:8, border:'1px solid', borderColor: genDiff===d ? 'var(--accent)' : 'var(--border)', background: genDiff===d ? 'rgba(79,110,247,0.15)' : 'transparent', color: genDiff===d ? 'var(--accent)' : 'var(--muted)', fontFamily:'var(--font-body)', fontSize:12, cursor:'pointer', transition:'all 0.2s' }}>
                          {d}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label style={{ fontSize:12, color:'var(--muted)', display:'block', marginBottom:6, fontFamily:'var(--font-mono)', textTransform:'uppercase', letterSpacing:'0.06em' }}>Nombre d'exercices : {genCount}</label>
                    <input type="range" min={1} max={20} value={genCount} onChange={e => setGenCount(+e.target.value)} style={{ width:'100%', accentColor:'var(--accent)' }} />
                  </div>
                  <button className="btn btn-primary" onClick={() => setGenerated(true)}>
                    ✨ Générer {genCount} exercices sur {genChapter}
                  </button>
                </div>

                {generated && (
                  <div style={{ marginTop:20, animation:'fadeInUp 0.3s ease both' }}>
                    <div style={{ fontSize:12, color:'var(--teal)', fontFamily:'var(--font-mono)', marginBottom:12, textTransform:'uppercase', letterSpacing:'0.06em' }}>✓ Exercices générés</div>
                    {[1,2,3].map(i => (
                      <div key={i} style={{ background:'var(--surface2)', borderRadius:10, padding:14, marginBottom:8, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                        <div>
                          <div style={{ fontFamily:'var(--font-mono)', fontSize:13, color:'var(--text)', marginBottom:4 }}>Exercice {i} — {genChapter} ({genDiff})</div>
                          <div style={{ fontSize:12, color:'var(--muted)' }}>Généré par IA · Correction incluse</div>
                        </div>
                        <div style={{ display:'flex', gap:8 }}>
                          <button className="btn btn-ghost btn-sm">👁 Voir</button>
                          <button className="btn btn-secondary btn-sm">✏️ Modifier</button>
                        </div>
                      </div>
                    ))}
                    <div style={{ display:'flex', gap:10, marginTop:12 }}>
                      <button className="btn btn-primary btn-sm">📄 Exporter PDF</button>
                      <button className="btn btn-secondary btn-sm">📤 Envoyer aux étudiants</button>
                    </div>
                  </div>
                )}
              </div>

              {/* Créer un examen */}
              <div className="card">
                <h3 style={{ marginBottom:16, fontSize:18 }}>📋 Créer un Examen</h3>
                <p style={{ fontSize:13, marginBottom:16 }}>L'IA génère un sujet complet similaire au Bac, avec barème et correction.</p>
                <div style={{ display:'flex', gap:10, flexWrap:'wrap' }}>
                  {[['Devoir surveillé 1h','DS'],['Devoir surveillé 2h','DS2'],['Simulation Bac 3h','BAC'],['Test rapide 30min','TEST']].map(([l,t]) => (
                    <button key={t} className="btn btn-secondary btn-sm">{l}</button>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT — Suivi étudiants */}
            <div style={{ display:'flex', flexDirection:'column', gap:24 }}>
              <div className="card">
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20 }}>
                  <h3 style={{ fontSize:18 }}>👥 Suivi de la Classe</h3>
                  <span className="badge badge-blue">{STUDENTS.length} étudiants</span>
                </div>

                {/* Moyenne classe */}
                <div style={{ background:'var(--surface2)', borderRadius:12, padding:16, marginBottom:20 }}>
                  <div style={{ display:'flex', justifyContent:'space-between', marginBottom:8 }}>
                    <span style={{ fontSize:13, color:'var(--text2)' }}>Moyenne de la classe</span>
                    <span style={{ fontFamily:'var(--font-mono)', color:'var(--gold)' }}>{Math.round(STUDENTS.reduce((a,s)=>a+s.score,0)/STUDENTS.length)}%</span>
                  </div>
                  <ProgressBar value={Math.round(STUDENTS.reduce((a,s)=>a+s.score,0)/STUDENTS.length)} showPercent={false} />
                  <div style={{ fontSize:12, color:'var(--muted)', marginTop:8 }}>Chapitre le plus faible globalement : <strong style={{ color:'var(--orange)' }}>Intégrales</strong></div>
                </div>

                {/* Students list */}
                {STUDENTS.map(s => (
                  <div key={s.name} style={{ padding:'14px 0', borderBottom:'1px solid rgba(255,255,255,0.04)' }}>
                    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:8 }}>
                      <div>
                        <span style={{ fontWeight:600, fontSize:14 }}>{s.name}</span>
                        <span style={{ fontSize:11, color:'var(--muted)', marginLeft:10 }}>🔥 {s.streak} jours</span>
                      </div>
                      <span style={{ fontFamily:'var(--font-mono)', fontSize:13, color:s.score>=80?'var(--teal)':s.score>=60?'var(--gold)':'var(--red)' }}>{s.score}%</span>
                    </div>
                    <ProgressBar value={s.score} showPercent={false} color={s.score>=80?'linear-gradient(90deg,var(--teal),#059669)':s.score>=60?'linear-gradient(90deg,var(--gold),var(--orange))':'linear-gradient(90deg,var(--red),#dc2626)'} />
                    <div style={{ display:'flex', gap:16, marginTop:6, fontSize:11, color:'var(--muted)' }}>
                      <span>⚠️ Faible : {s.weak}</span>
                      <span>✅ Fort : {s.strong}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* IA analyse classe */}
              <div style={{ background:'linear-gradient(135deg,rgba(79,110,247,0.1),rgba(124,58,237,0.1))', border:'1px solid rgba(79,110,247,0.25)', borderRadius:16, padding:20 }}>
                <div style={{ fontSize:12, color:'var(--accent)', fontFamily:'var(--font-mono)', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:12 }}>🤖 Analyse IA de la classe</div>
                <p style={{ fontSize:13, lineHeight:1.8 }}>
                  <strong style={{ color:'var(--red)' }}>40% des étudiants</strong> ont des difficultés en Intégrales.<br/>
                  Recommandation : organiser une séance de révision ciblée avant la prochaine évaluation.<br/>
                  <strong style={{ color:'var(--teal)' }}>Yassine T.</strong> est en tête — envisager des exercices avancés.
                </p>
                <button className="btn btn-primary btn-sm" style={{ marginTop:14 }}>Générer plan de révision →</button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <style>{`@media(max-width:900px){.container>div:last-child{grid-template-columns:1fr!important;}}`}</style>
    </>
  )
}

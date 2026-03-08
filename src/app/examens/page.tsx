'use client'
import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

const BAC_YEARS = [2024,2023,2022,2021,2020,2019,2018,2017,2016,2015]
const UNI_YEARS = [2024,2023,2022,2021,2020,2019,2018,2017,2016,2015]

const UNI_MODULES = ['Analyse 1','Analyse 2','Algèbre 1','Algèbre Linéaire','Probabilités','Analyse 3']

export default function ExamensPage() {
  const [tab, setTab] = useState<'bac' | 'universite'>('bac')
  const [selectedYear, setSelectedYear] = useState<number|null>(null)
  const [simMode, setSimMode] = useState(false)
  const [simStarted, setSimStarted] = useState(false)
  const [simTime, setSimTime] = useState(180)

  return (
    <>
      <Navbar />
      <main style={{ position:'relative', zIndex:1, paddingTop:80 }}>
        <div className="container" style={{ paddingTop:40, paddingBottom:80 }}>

          {/* Header */}
          <div style={{ marginBottom:40 }}>
            <span className="label">📋 Examens Officiels</span>
            <h1 style={{ fontSize:'clamp(28px,4vw,48px)', marginBottom:12 }}>10 Ans d'Examens<br/>avec Corrections Complètes</h1>
            <p style={{ maxWidth:500 }}>Chaque sujet officiel résolu étape par étape. Prépare-toi comme un pro.</p>
          </div>

          {/* Tabs */}
          <div style={{ display:'flex', gap:4, background:'var(--surface)', border:'1px solid var(--border)', borderRadius:12, padding:4, width:'fit-content', marginBottom:40 }}>
            <button onClick={() => setTab('bac')} style={{ padding:'10px 24px', borderRadius:8, border:'none', background: tab==='bac' ? 'var(--accent)' : 'transparent', color: tab==='bac' ? 'white' : 'var(--muted)', fontFamily:'var(--font-body)', fontSize:14, fontWeight:600, cursor:'pointer', transition:'all 0.2s' }}>🎓 Bac Maths</button>
            <button onClick={() => setTab('universite')} style={{ padding:'10px 24px', borderRadius:8, border:'none', background: tab==='universite' ? 'var(--accent)' : 'transparent', color: tab==='universite' ? 'white' : 'var(--muted)', fontFamily:'var(--font-body)', fontSize:14, fontWeight:600, cursor:'pointer', transition:'all 0.2s' }}>🏛 Université FST</button>
          </div>

          {/* BAC */}
          {tab === 'bac' && (
            <div style={{ animation:'fadeInUp 0.3s ease both' }}>
              {/* Simulation banner */}
              <div style={{ background:'linear-gradient(135deg,rgba(79,110,247,0.12),rgba(124,58,237,0.12))', border:'1px solid rgba(79,110,247,0.25)', borderRadius:20, padding:28, marginBottom:40, display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:16 }}>
                <div>
                  <h3 style={{ marginBottom:6 }}>🎯 Simuler un Bac Complet</h3>
                  <p style={{ fontSize:14 }}>3 heures · conditions réelles · correction automatique · note estimée</p>
                </div>
                <div style={{ display:'flex', gap:10 }}>
                  <button className="btn btn-primary" onClick={() => setSimMode(true)}>Lancer la simulation →</button>
                  <button className="btn btn-ghost">Comment ça marche ?</button>
                </div>
              </div>

              {/* Grille années */}
              <h3 style={{ marginBottom:20 }}>📅 Sujets officiels par année</h3>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))', gap:16 }}>
                {BAC_YEARS.map(year => (
                  <div key={year} className="card" style={{ cursor:'pointer', textAlign:'center', padding:24, border: selectedYear===year ? '1px solid var(--accent)' : undefined, background: selectedYear===year ? 'var(--surface2)' : undefined }}
                    onClick={() => setSelectedYear(selectedYear===year ? null : year)}>
                    <div style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:32, color: year===2024 ? 'var(--accent)' : 'var(--text)', marginBottom:4 }}>{year}</div>
                    <div style={{ fontSize:11, color:'var(--muted)', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:12 }}>Section Mathématiques</div>
                    <span className="badge badge-teal">✓ Corrigé</span>
                    {year === 2024 && <div style={{ marginTop:8 }}><span className="badge badge-gold" style={{ fontSize:9 }}>🔥 Nouveau</span></div>}
                  </div>
                ))}
              </div>

              {/* Year detail */}
              {selectedYear && (
                <div style={{ marginTop:30, background:'var(--surface)', border:'1px solid rgba(79,110,247,0.3)', borderRadius:20, padding:28, animation:'fadeInUp 0.3s ease both' }}>
                  <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:24, flexWrap:'wrap', gap:12 }}>
                    <div>
                      <h3>Bac Maths Tunisie — {selectedYear}</h3>
                      <p style={{ fontSize:13 }}>Section Mathématiques · Sujet officiel + Correction détaillée</p>
                    </div>
                    <div style={{ display:'flex', gap:10 }}>
                      <button className="btn btn-primary">📄 Voir le sujet</button>
                      <button className="btn btn-secondary">✅ Voir la correction</button>
                      <button className="btn btn-ghost">🎯 Simuler cet examen</button>
                    </div>
                  </div>

                  <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))', gap:16 }}>
                    {[
                      { title:'Exercice 1', topic:'Analyse — Étude de fonction', pts:6 },
                      { title:'Exercice 2', topic:'Algèbre — Nombres complexes', pts:5 },
                      { title:'Exercice 3', topic:'Probabilités', pts:4 },
                      { title:'Exercice 4', topic:'Géométrie dans l\'espace', pts:5 },
                    ].map(ex => (
                      <div key={ex.title} style={{ background:'var(--surface2)', border:'1px solid var(--border)', borderRadius:12, padding:16 }}>
                        <div style={{ fontFamily:'var(--font-display)', fontWeight:600, marginBottom:4 }}>{ex.title}</div>
                        <div style={{ fontSize:12, color:'var(--muted)', marginBottom:8 }}>{ex.topic}</div>
                        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                          <span style={{ fontFamily:'var(--font-mono)', fontSize:11, color:'var(--gold)' }}>{ex.pts} points</span>
                          <button className="btn btn-ghost btn-sm">Résoudre</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* UNIVERSITÉ */}
          {tab === 'universite' && (
            <div style={{ animation:'fadeInUp 0.3s ease both' }}>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))', gap:20 }}>
                {UNI_MODULES.map(mod => (
                  <div key={mod} className="card">
                    <h4 style={{ marginBottom:12 }}>{mod}</h4>
                    <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                      {UNI_YEARS.slice(0,5).map(year => (
                        <div key={year} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'8px 12px', background:'var(--surface2)', borderRadius:10 }}>
                          <span style={{ fontFamily:'var(--font-mono)', fontSize:13, color:'var(--text2)' }}>{year}</span>
                          <div style={{ display:'flex', gap:8 }}>
                            <span className="badge badge-teal" style={{ fontSize:9 }}>✓ Partiel</span>
                            <button className="btn btn-ghost btn-sm">Voir</button>
                          </div>
                        </div>
                      ))}
                      <button className="btn btn-ghost btn-sm" style={{ marginTop:4 }}>Voir toutes les années →</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Simulation modal */}
          {simMode && (
            <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.8)', backdropFilter:'blur(10px)', zIndex:200, display:'flex', alignItems:'center', justifyContent:'center', padding:20 }}>
              <div style={{ background:'var(--surface)', border:'1px solid var(--border)', borderRadius:24, padding:40, maxWidth:480, width:'100%', textAlign:'center' }}>
                <div style={{ fontSize:48, marginBottom:16 }}>🎓</div>
                <h3 style={{ marginBottom:12 }}>Simulation Bac Mathématiques</h3>
                <p style={{ marginBottom:24 }}>Tu vas passer un examen dans les conditions réelles du Bac Tunisie.</p>
                <div style={{ background:'var(--surface2)', borderRadius:14, padding:20, marginBottom:24, textAlign:'left' }}>
                  {[['Durée','3 heures (180 min)'],['Matière','Mathématiques — Section Math'],['Sujets','Sujet type Bac 2024'],['Correction','Automatique à la fin']].map(([k,v]) => (
                    <div key={k} style={{ display:'flex', justifyContent:'space-between', padding:'8px 0', borderBottom:'1px solid rgba(255,255,255,0.05)', fontSize:13 }}>
                      <span style={{ color:'var(--muted)' }}>{k}</span>
                      <span style={{ color:'var(--text)', fontWeight:500 }}>{v}</span>
                    </div>
                  ))}
                </div>
                <div style={{ display:'flex', gap:10 }}>
                  <button className="btn btn-primary" style={{ flex:1 }} onClick={() => { setSimStarted(true); setSimMode(false) }}>🚀 Commencer</button>
                  <button className="btn btn-ghost" onClick={() => setSimMode(false)}>Annuler</button>
                </div>
              </div>
            </div>
          )}

        </div>
      </main>
      <Footer />
    </>
  )
}

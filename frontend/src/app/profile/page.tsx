'use client'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ProgressBar from '@/components/ui/ProgressBar'
import Link from 'next/link'

const CHAPTERS_PROGRESS = [
  { chapter:'Nombres Complexes', score:82, tag:'Algèbre', color:'badge-purple' },
  { chapter:'Limites & Continuité', score:68, tag:'Analyse', color:'badge-blue' },
  { chapter:'Suites Réelles', score:75, tag:'Analyse', color:'badge-blue' },
  { chapter:'Dérivées', score:90, tag:'Analyse', color:'badge-blue' },
  { chapter:'Logarithme & Exponentielle', score:55, tag:'Analyse', color:'badge-blue' },
  { chapter:'Intégrales', score:42, tag:'Analyse', color:'badge-blue' },
  { chapter:'Probabilités', score:78, tag:'Probabilités', color:'badge-gold' },
  { chapter:'Géométrie espace', score:60, tag:'Géométrie', color:'badge-teal' },
]

const ACTIVITY = [
  { date:'Hier', action:'Résolu : Intégrale ∫ x·e^x dx', type:'solve' },
  { date:'Hier', action:'Chapitre Complexes — 3 exercices', type:'exercise' },
  { date:'2 jours', action:'Simulation Bac 2023 : 13.5/20', type:'exam' },
  { date:'3 jours', action:'Chat IA : Dérivées composées', type:'chat' },
  { date:'4 jours', action:'Chapitre Probabilités — 5 exercices', type:'exercise' },
]

const typeIcon: Record<string,string> = { solve:'🧮', exercise:'📝', exam:'🎓', chat:'🤖' }

export default function ProfilePage() {
  const overall = Math.round(CHAPTERS_PROGRESS.reduce((a,c) => a+c.score,0) / CHAPTERS_PROGRESS.length)
  const weak = CHAPTERS_PROGRESS.filter(c => c.score < 60).map(c => c.chapter)
  const strong = CHAPTERS_PROGRESS.filter(c => c.score >= 80).map(c => c.chapter)

  return (
    <>
      <Navbar />
      <main style={{ position:'relative', zIndex:1, paddingTop:80 }}>
        <div className="container" style={{ paddingTop:40, paddingBottom:80 }}>

          {/* Profile header */}
          <div style={{ display:'flex', alignItems:'center', gap:24, marginBottom:40, flexWrap:'wrap' }}>
            <div style={{ width:80, height:80, background:'linear-gradient(135deg,var(--accent),var(--accent2))', borderRadius:24, display:'flex', alignItems:'center', justifyContent:'center', fontSize:36, flexShrink:0 }}>🎓</div>
            <div style={{ flex:1 }}>
              <h1 style={{ fontSize:28, marginBottom:4 }}>Ahmed Ben Salah</h1>
              <div style={{ display:'flex', gap:12, flexWrap:'wrap', fontSize:13, color:'var(--muted)' }}>
                <span>🇹🇳 Tunisie</span>
                <span>·</span>
                <span>📚 4ème Maths — Bac</span>
                <span>·</span>
                <span>📅 Membre depuis Jan 2025</span>
              </div>
            </div>
            <button className="btn btn-ghost btn-sm">✏️ Modifier</button>
          </div>

          {/* Stats cards */}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:16, marginBottom:40 }}>
            {[
              { num:'247', label:'Exercices résolus', icon:'📝', color:'var(--accent)' },
              { num:'12', label:'Jours de suite', icon:'🔥', color:'var(--orange)' },
              { num:`${overall}%`, label:'Score global', icon:'⭐', color:'var(--gold)' },
              { num:'#34', label:'Classement', icon:'🏆', color:'var(--teal)' },
            ].map(s => (
              <div key={s.label} className="card" style={{ textAlign:'center', padding:20 }}>
                <div style={{ fontSize:28, marginBottom:8 }}>{s.icon}</div>
                <div style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:28, color:s.color }}>{s.num}</div>
                <div style={{ fontSize:11, color:'var(--muted)', marginTop:4 }}>{s.label}</div>
              </div>
            ))}
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'1fr 340px', gap:24, alignItems:'start' }}>

            {/* LEFT */}
            <div style={{ display:'flex', flexDirection:'column', gap:24 }}>

              {/* Progression par chapitre */}
              <div className="card">
                <h3 style={{ marginBottom:20, fontSize:18 }}>📊 Progression par Chapitre</h3>
                <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
                  {CHAPTERS_PROGRESS.sort((a,b) => a.score-b.score).map(ch => (
                    <div key={ch.chapter}>
                      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:8 }}>
                        <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                          <span className={`badge ${ch.color}`} style={{ fontSize:9 }}>{ch.tag}</span>
                          <span style={{ fontSize:13, color:'var(--text)' }}>{ch.chapter}</span>
                        </div>
                        <span style={{ fontFamily:'var(--font-mono)', fontSize:12, color: ch.score>=80?'var(--teal)':ch.score>=60?'var(--gold)':'var(--red)' }}>{ch.score}%</span>
                      </div>
                      <ProgressBar value={ch.score} color={ch.score>=80?'linear-gradient(90deg,var(--teal),#059669)':ch.score>=60?'linear-gradient(90deg,var(--gold),var(--orange))':'linear-gradient(90deg,var(--red),#dc2626)'} showPercent={false} />
                    </div>
                  ))}
                </div>
              </div>

              {/* IA Recommendation */}
              <div style={{ background:'linear-gradient(135deg,rgba(79,110,247,0.1),rgba(124,58,237,0.1))', border:'1px solid rgba(79,110,247,0.25)', borderRadius:16, padding:24 }}>
                <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:16 }}>
                  <div style={{ width:36, height:36, background:'linear-gradient(135deg,#4f6ef7,#7c3aed)', borderRadius:10, display:'flex', alignItems:'center', justifyContent:'center', fontSize:18 }}>∑</div>
                  <div style={{ fontFamily:'var(--font-display)', fontWeight:600 }}>Recommandation IA</div>
                </div>
                <p style={{ fontSize:14, marginBottom:16, lineHeight:1.7 }}>
                  Tu es fort en <strong style={{ color:'var(--teal)' }}>Dérivées</strong> et <strong style={{ color:'var(--teal)' }}>Complexes</strong> 🎉<br/>
                  Focus cette semaine sur <strong style={{ color:'var(--red)' }}>Intégrales</strong> et <strong style={{ color:'var(--orange)' }}>Logarithme</strong> — ce sont tes points les plus faibles avant le Bac.
                </p>
                <div style={{ display:'flex', gap:10 }}>
                  <Link href="/exercises?focus=integrales" className="btn btn-primary btn-sm">📝 Exercices Intégrales</Link>
                  <Link href="/chat" className="btn btn-ghost btn-sm">🤖 Demander au Prof IA</Link>
                </div>
              </div>
            </div>

            {/* RIGHT */}
            <div style={{ display:'flex', flexDirection:'column', gap:20 }}>

              {/* Points faibles / forts */}
              <div className="card">
                <h4 style={{ marginBottom:14 }}>⚠️ Points faibles</h4>
                {weak.map(w => (
                  <div key={w} style={{ display:'flex', alignItems:'center', gap:10, padding:'8px 0', borderBottom:'1px solid rgba(255,255,255,0.04)', fontSize:13, color:'var(--muted)' }}>
                    <span style={{ color:'var(--red)', fontSize:12 }}>●</span>{w}
                  </div>
                ))}
              </div>

              <div className="card">
                <h4 style={{ marginBottom:14 }}>✅ Points forts</h4>
                {strong.map(s => (
                  <div key={s} style={{ display:'flex', alignItems:'center', gap:10, padding:'8px 0', borderBottom:'1px solid rgba(255,255,255,0.04)', fontSize:13, color:'var(--muted)' }}>
                    <span style={{ color:'var(--teal)', fontSize:12 }}>●</span>{s}
                  </div>
                ))}
              </div>

              {/* Activité récente */}
              <div className="card">
                <h4 style={{ marginBottom:14 }}>🕐 Activité récente</h4>
                {ACTIVITY.map((a, i) => (
                  <div key={i} style={{ display:'flex', gap:12, padding:'10px 0', borderBottom:'1px solid rgba(255,255,255,0.04)', alignItems:'flex-start' }}>
                    <span style={{ fontSize:18 }}>{typeIcon[a.type]}</span>
                    <div>
                      <div style={{ fontSize:13, color:'var(--text2)' }}>{a.action}</div>
                      <div style={{ fontSize:11, color:'var(--muted)', marginTop:2 }}>{a.date}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bac countdown */}
              <div style={{ background:'rgba(245,200,66,0.08)', border:'1px solid rgba(245,200,66,0.2)', borderRadius:16, padding:20, textAlign:'center' }}>
                <div style={{ fontSize:32, marginBottom:8 }}>⏰</div>
                <div style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:24, color:'var(--gold)' }}>~120 jours</div>
                <div style={{ fontSize:13, color:'var(--muted)' }}>avant le Bac 2025</div>
                <Link href="/examens" className="btn btn-gold btn-sm" style={{ marginTop:14 }}>Simuler le Bac →</Link>
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
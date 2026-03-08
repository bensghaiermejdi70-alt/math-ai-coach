import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

const trimestres = [
  {
    num: 1, label: 'Trimestre 1',
    chapitres: [
      { id:'limites', num:'01', title:'Continuité et Limites', tag:'Analyse', color:'badge-blue', exercises:24, examYears:'2018-2024' },
      { id:'complexes', num:'02', title:'Nombres Complexes', tag:'Algèbre', color:'badge-purple', exercises:32, examYears:'2015-2024' },
      { id:'suites', num:'03', title:'Suites Réelles', tag:'Analyse', color:'badge-blue', exercises:28, examYears:'2015-2024' },
    ]
  },
  {
    num: 2, label: 'Trimestre 2',
    chapitres: [
      { id:'derivees', num:'04', title:'Dérivabilité & Étude de fonctions', tag:'Analyse', color:'badge-blue', exercises:36, examYears:'2015-2024' },
      { id:'logarithme', num:'05', title:'Fonction Logarithme Népérien', tag:'Analyse', color:'badge-blue', exercises:20, examYears:'2015-2024' },
      { id:'exponentielle', num:'06', title:'Fonction Exponentielle', tag:'Analyse', color:'badge-blue', exercises:22, examYears:'2015-2024' },
      { id:'geometrie-espace', num:'07', title:'Géométrie dans l\'Espace', tag:'Géométrie', color:'badge-teal', exercises:18, examYears:'2016-2024' },
    ]
  },
  {
    num: 3, label: 'Trimestre 3',
    chapitres: [
      { id:'integrales', num:'08', title:'Primitives & Calcul Intégral', tag:'Analyse', color:'badge-blue', exercises:30, examYears:'2015-2024' },
      { id:'equations-diff', num:'09', title:'Équations Différentielles', tag:'Analyse', color:'badge-blue', exercises:16, examYears:'2017-2024' },
      { id:'probabilites', num:'10', title:'Probabilités & Variables aléatoires', tag:'Probabilités', color:'badge-gold', exercises:26, examYears:'2015-2024' },
      { id:'isometries', num:'11', title:'Isométries, Similitudes & Coniques', tag:'Géométrie', color:'badge-teal', exercises:14, examYears:'2015-2024' },
    ]
  },
]

export default function BacPage() {
  return (
    <>
      <Navbar />
      <main style={{ position:'relative', zIndex:1, paddingTop:80 }}>
        <div className="container" style={{ paddingTop:40, paddingBottom:80 }}>

          {/* Header */}
          <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', flexWrap:'wrap', gap:20, marginBottom:50 }}>
            <div>
              <span className="label">🇹🇳 Bac Tunisie</span>
              <h1 style={{ fontSize:'clamp(28px,4vw,48px)', marginBottom:12 }}>Programme Officiel<br/>4ème Année Maths</h1>
              <p style={{ maxWidth:500 }}>Tous les chapitres du programme officiel — organisés par trimestre avec exercices et examens.</p>
            </div>
            <div style={{ display:'flex', gap:10 }}>
              <Link href="/examens" className="btn btn-secondary">📋 Examens Bac</Link>
              <Link href="/universite" className="btn btn-ghost">🎓 Université →</Link>
            </div>
          </div>

          {/* Stats */}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:16, marginBottom:50 }}>
            {[
              { num:'11', label:'Chapitres', icon:'📚' },
              { num:'246', label:'Exercices', icon:'📝' },
              { num:'10', label:'Ans d\'examens', icon:'📋' },
              { num:'3', label:'Trimestres', icon:'🗓' },
            ].map(s => (
              <div key={s.label} className="card" style={{ textAlign:'center', padding:20 }}>
                <div style={{ fontSize:24, marginBottom:8 }}>{s.icon}</div>
                <div style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:28, color:'var(--accent)' }}>{s.num}</div>
                <div style={{ fontSize:12, color:'var(--muted)' }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Trimestres */}
          {trimestres.map(t => (
            <div key={t.num} style={{ marginBottom:50 }}>
              <div style={{ display:'flex', alignItems:'center', gap:14, marginBottom:24 }}>
                <div style={{ width:40, height:40, background:'linear-gradient(135deg,var(--accent),var(--accent2))', borderRadius:12, display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'var(--font-display)', fontWeight:700, fontSize:16, color:'white' }}>T{t.num}</div>
                <h2 style={{ fontSize:22 }}>{t.label}</h2>
              </div>

              <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(320px,1fr))', gap:16 }}>
                {t.chapitres.map(ch => (
                  <div key={ch.id} className="card" style={{ display:'flex', flexDirection:'column', gap:14 }}>
                    <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between' }}>
                      <div>
                        <span className={`badge ${ch.color}`} style={{ marginBottom:8, display:'inline-block' }}>{ch.tag}</span>
                        <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                          <span style={{ fontFamily:'var(--font-mono)', fontSize:11, color:'var(--muted)' }}>CH{ch.num}</span>
                          <h4 style={{ fontSize:15 }}>{ch.title}</h4>
                        </div>
                      </div>
                    </div>
                    <div style={{ display:'flex', gap:10, fontSize:12, color:'var(--muted)' }}>
                      <span>📝 {ch.exercises} exercices</span>
                      <span>·</span>
                      <span>📋 Bac {ch.examYears}</span>
                    </div>
                    <div style={{ display:'flex', gap:8, marginTop:4 }}>
                      <Link href={`/bac/trimestre${t.num}/${ch.id}`} className="btn btn-primary btn-sm" style={{ flex:1, justifyContent:'center' }}>Étudier →</Link>
                      <Link href={`/solve?chapter=${ch.id}`} className="btn btn-ghost btn-sm">🧮 Solveur</Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* CTA */}
          <div style={{ background:'linear-gradient(135deg, rgba(79,110,247,0.1), rgba(124,58,237,0.1))', border:'1px solid rgba(79,110,247,0.2)', borderRadius:20, padding:40, textAlign:'center' }}>
            <h3 style={{ marginBottom:12 }}>Prêt pour la simulation Bac ? 🎓</h3>
            <p style={{ marginBottom:24, maxWidth:400, margin:'0 auto 24px' }}>Teste-toi avec un vrai sujet de Bac — chrono, correction automatique et note estimée.</p>
            <Link href="/examens" className="btn btn-primary btn-lg">Passer une simulation →</Link>
          </div>
        </div>
      </main>
      <Footer />
      <style>{`@media(max-width:600px){.container>div:nth-child(2){grid-template-columns:repeat(2,1fr)!important;}}`}</style>
    </>
  )
}
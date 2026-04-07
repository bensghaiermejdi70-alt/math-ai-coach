'use client'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

const SECTIONS = [
  {
    slug: 'maths',
    icon: '📐',
    titre: 'Section Mathématiques',
    coeff: 'Coefficient 4',
    couleur: '#4f6ef7',
    gradient: 'linear-gradient(135deg,rgba(79,110,247,0.15),rgba(124,58,237,0.08))',
    border: 'rgba(79,110,247,0.25)',
    tomes: [
      { label:'Tome I — Analyse', chapitres:['Suites réelles','Limite et continuité','Dérivabilité & étude de fonctions','Fonctions réciproques','Primitives & calcul intégral'] },
      { label:'Tome II — Algèbre & Géométrie', chapitres:['Nombres complexes','Isométries du plan','Déplacements & Antidéplacements','Similitudes planes'] },
    ],
    nbCh: 9,
    nbThm: 110,
    nbEx: 90,
  },
  {
    slug: 'sciences-exp',
    icon: '🔬',
    titre: 'Section Sciences Expérimentales',
    coeff: 'Coefficient 3',
    couleur: '#06d6a0',
    gradient: 'linear-gradient(135deg,rgba(6,214,160,0.12),rgba(5,154,114,0.06))',
    border: 'rgba(6,214,160,0.25)',
    tomes: [
      { label:'Tome I — Analyse', chapitres:['Suites réelles','Limite et continuité','Dérivabilité & étude de fonctions','Fonctions réciproques','Primitives & calcul intégral'] },
      { label:'Tome II — Algèbre, Espace & Probabilités', chapitres:['Nombres complexes','Produit scalaire & vectoriel dans l\'espace','Probabilités sur un ensemble fini','Variables aléatoires réelles','Statistiques'] },
    ],
    nbCh: 10,
    nbThm: 128,
    nbEx: 98,
  },
  {
    slug: 'sciences-tech',
    icon: '⚙️',
    titre: 'Section Sciences Techniques',
    coeff: 'Coefficient 3',
    couleur: '#f59e0b',
    gradient: 'linear-gradient(135deg,rgba(245,158,11,0.12),rgba(217,119,6,0.06))',
    border: 'rgba(245,158,11,0.25)',
    tomes: [
      { label:'Tome I — Analyse', chapitres:['Suites réelles','Limite et continuité','Dérivabilité & étude de fonctions','Fonctions réciproques','Primitives & calcul intégral'] },
      { label:'Tome II — Algèbre, Espace & Arithmétique', chapitres:['Nombres complexes','Droites et plans de l\'espace','Produit scalaire, vectoriel et mixte dans l\'espace','Probabilités sur un ensemble fini','Arithmétique ★ (Euclide, Bézout, Gauss, congruences)'] },
    ],
    nbCh: 10,
    nbThm: 108,
    nbEx: 90,
    note: '★ Arithmétique — spécifique ST | Programme officiel CNP vérifié sur tadris.tn & devoirat.net',
  },
  {
    slug: 'eco-gestion',
    icon: '💹',
    titre: 'Section Économie & Gestion',
    coeff: 'Coefficient 2',
    couleur: '#10b981',
    gradient: 'linear-gradient(135deg,rgba(16,185,129,0.12),rgba(5,154,114,0.06))',
    border: 'rgba(16,185,129,0.25)',
    tomes: [
      { label:'Tome I — Analyse', chapitres:['Logique & Raisonnement','Limite et continuité','Suites réelles','Dérivabilité & étude de fonctions','Primitives & calcul intégral','Fonction logarithme népérien','Fonction exponentielle','Équations différentielles'] },
      { label:'Tome II — Algèbre, Probabilités & Finances', chapitres:['Probabilités sur un ensemble fini','Variables aléatoires réelles','Matrices & systèmes linéaires','Arithmétique','Mathématiques Financières ★ (intérêts, annuités, emprunts)'] },
    ],
    nbCh: 13,
    nbThm: 106,
    nbEx: 86,
    note: '★ Mathématiques Financières (intérêts, annuités, emprunts) — spécifique à EG',
  },
  {
    slug: 'informatique',
    icon: '💻',
    titre: 'Section Sciences Informatiques',
    coeff: 'Coefficient 3',
    couleur: '#6366f1',
    gradient: 'linear-gradient(135deg,rgba(99,102,241,0.14),rgba(124,58,237,0.07))',
    border: 'rgba(99,102,241,0.3)',
    isNew: true,
    tomes: [
      { label:'Tome I — Analyse', chapitres:['Suites réelles','Limite et continuité','Dérivabilité & étude de fonctions','Fonctions logarithme et exponentielle','Calcul intégral & primitives'] },
      { label:'Tome II — Algèbre & Probabilités', chapitres:['Nombres complexes','Probabilités sur un ensemble fini','Statistiques'] },
    ],
    nbCh: 8,
    nbThm: 95,
    nbEx: 78,
    note: 'Programme mathématiques officiel CNP — source : tadris.tn & bac.org.tn',
  },
]

export default function BacPage() {
  return (
    <>
      <Navbar />
      <main style={{ position:'relative', zIndex:1, paddingTop:80 }}>
        <div className="container" style={{ paddingTop:40, paddingBottom:80 }}>

          {/* Header */}
          <div style={{ marginBottom:48 }}>
            <span className="label" style={{ marginBottom:12, display:'inline-block' }}>🇹🇳 Programme officiel CNP Tunisie</span>
            <h1 style={{ fontSize:'clamp(28px,4vw,48px)', marginBottom:12 }}>
              Mathématiques,sc-experimentales ,sc-techniques ,Informatique & Gestion<br/>Bac 4ème Année Secondaire
            </h1>
            <p style={{ maxWidth:580, color:'var(--text2)', marginBottom:24 }}>
              Tous les chapitres du programme officiel CNP, répartis par section et par tome.
              Théorèmes, définitions, formules et exercices type Bac.
            </p>
            <div style={{ display:'flex', gap:10, flexWrap:'wrap' }}>
              <Link href="/examens" className="btn btn-secondary">📋 Examens Bac</Link>
              <Link href="/chat" className="btn btn-ghost">🤖 Chat IA →</Link>
            </div>
          </div>

          {/* Stats globales */}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:14, marginBottom:52 }}>
            {[
              { num:'5',    label:'Sections',    icon:'🎓' },
              { num:'57+',  label:'Chapitres',   icon:'📚' },
              { num:'621+', label:'Concepts',    icon:'📐' },
              { num:'497+', label:'Exercices',   icon:'📝' },
            ].map(s => (
              <div key={s.label} className="card" style={{ textAlign:'center', padding:20 }}>
                <div style={{ fontSize:22, marginBottom:8 }}>{s.icon}</div>
                <div style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:26, color:'var(--accent)' }}>{s.num}</div>
                <div style={{ fontSize:12, color:'var(--muted)' }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Sections */}
          <div style={{ display:'flex', flexDirection:'column', gap:28 }}>
            {SECTIONS.map(sec => (
              <div key={sec.slug} style={{ background:sec.gradient, border:`1.5px solid ${sec.border}`, borderRadius:20, padding:'28px 32px', position:'relative', overflow:'hidden' }}>

                {/* Badge NOUVEAU */}
                {sec.isNew && (
                  <div style={{ position:'absolute', top:20, right:20, background:'linear-gradient(135deg,#6366f1,#a78bfa)', color:'white', fontSize:10, fontWeight:800, padding:'3px 12px', borderRadius:20, letterSpacing:'0.08em' }}>
                    NOUVEAU
                  </div>
                )}

                {/* En-tête section */}
                <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', flexWrap:'wrap', gap:16, marginBottom:24 }}>
                  <div style={{ display:'flex', gap:16, alignItems:'center' }}>
                    <div style={{ fontSize:40 }}>{sec.icon}</div>
                    <div>
                      <div style={{ display:'flex', gap:10, alignItems:'center', marginBottom:4, flexWrap:'wrap' }}>
                        <h2 style={{ fontSize:'clamp(18px,2.5vw,24px)', margin:0 }}>{sec.titre}</h2>
                        <span style={{ background:`${sec.couleur}25`, color:sec.couleur, fontSize:11, fontFamily:'var(--font-mono)', padding:'3px 10px', borderRadius:20 }}>{sec.coeff}</span>
                      </div>
                      {sec.note && <div style={{ fontSize:12, color:'var(--muted)', fontStyle:'italic', marginTop:4 }}>{sec.note}</div>}
                    </div>
                  </div>
                  <div style={{ display:'flex', gap:14, fontSize:13, color:'var(--muted)', flexWrap:'wrap' }}>
                    <span>📚 {sec.nbCh} chapitres</span>
                    <span>·</span>
                    <span>📐 {sec.nbThm}+ concepts</span>
                    <span>·</span>
                    <span>📝 {sec.nbEx}+ exercices</span>
                  </div>
                </div>

                {/* Tomes / Matières */}
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16, marginBottom:20 }}>
                  {sec.tomes.map((tome, ti) => (
                    <div key={ti} style={{ background:'rgba(0,0,0,0.15)', borderRadius:14, padding:'16px 18px' }}>
                      <div style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:13, color:sec.couleur, marginBottom:10 }}>
                        {tome.label}
                      </div>
                      <div style={{ display:'flex', flexDirection:'column', gap:4 }}>
                        {tome.chapitres.map((ch, ci) => (
                          <div key={ci} style={{ display:'flex', gap:8, alignItems:'center', fontSize:12, color:'var(--text2)' }}>
                            <span style={{ color:sec.couleur, fontSize:10 }}>▸</span>
                            <span>{ch}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Bouton */}
                <Link
                  href={`/bac/${sec.slug}`}
                  style={{
                    display:'inline-flex', alignItems:'center', gap:8,
                    background:sec.couleur, color:'white',
                    padding:'10px 24px', borderRadius:12,
                    fontFamily:'var(--font-display)', fontWeight:700, fontSize:14,
                    textDecoration:'none', transition:'opacity 0.2s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.opacity='0.85')}
                  onMouseLeave={e => (e.currentTarget.style.opacity='1')}
                >
                  Voir tous les chapitres →
                </Link>
              </div>
            ))}
          </div>

          {/* CTA bas */}
          <div style={{ marginTop:52, background:'linear-gradient(135deg,rgba(79,110,247,0.1),rgba(124,58,237,0.1))', border:'1px solid rgba(79,110,247,0.2)', borderRadius:20, padding:40, textAlign:'center' }}>
            <h3 style={{ marginBottom:12 }}>Prêt pour la simulation Bac ? 🎓</h3>
            <p style={{ marginBottom:24, maxWidth:400, margin:'0 auto 24px', color:'var(--text2)' }}>
              Teste-toi avec un vrai sujet de Bac — chrono, correction automatique et note estimée.
            </p>
            <Link href="/examens" className="btn btn-primary btn-lg">Passer une simulation →</Link>
          </div>

        </div>
      </main>
      <Footer />
      <style>{`
        @media(max-width:700px){
          div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
          div[style*="grid-template-columns: repeat(4"] { grid-template-columns: repeat(2,1fr) !important; }
        }
      `}</style>
    </>
  )
}

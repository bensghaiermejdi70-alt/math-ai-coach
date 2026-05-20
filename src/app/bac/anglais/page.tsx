'use client'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

// ═══════════════════════════════════════════════════════════════
//  PAGE ANGLAIS BAC TUNISIE
//  Route : /bac/anglais
//  Programme officiel CNP — 4 Units · Toutes sections
// ═══════════════════════════════════════════════════════════════

const UNITS = [
  {
    num: 1,
    slug: 'unit1-art-shows-holidaying',
    icon: '🎨',
    titre: 'Unit 1 — Art Shows & Holidaying',
    couleur: '#f59e0b',
    gradient: 'linear-gradient(135deg,rgba(245,158,11,0.12),rgba(249,115,22,0.06))',
    border: 'rgba(245,158,11,0.25)',
    chapitres: ['Art Shows & Museums', 'Space Tourism', 'A Package Tour'],
    grammar: ['Present / Past tenses', 'Comparatives', 'Expressing opinion'],
  },
  {
    num: 2,
    slug: 'unit2-education-matters',
    icon: '📚',
    titre: 'Unit 2 — Education Matters',
    couleur: '#6366f1',
    gradient: 'linear-gradient(135deg,rgba(99,102,241,0.12),rgba(124,58,237,0.06))',
    border: 'rgba(99,102,241,0.25)',
    chapitres: ['Education for All', 'Education System Problems', 'Higher Education', 'Online Learning', 'Lifelong Learning', 'Comparing Systems'],
    grammar: ['Modals', 'Passive voice', 'Conditionals'],
  },
  {
    num: 3,
    slug: 'unit3-creative-inventive-minds',
    icon: '💡',
    titre: 'Unit 3 — Creative & Inventive Minds',
    couleur: '#06d6a0',
    gradient: 'linear-gradient(135deg,rgba(6,214,160,0.12),rgba(5,154,114,0.06))',
    border: 'rgba(6,214,160,0.25)',
    chapitres: ['Creativity', 'Innovation', 'Inventions & Inventors', 'Modern Technology & AI'],
    grammar: ['Relative clauses', 'Linking words', 'Gerund / Infinitive'],
  },
  {
    num: 4,
    slug: 'unit4-life-issues',
    icon: '🌍',
    titre: 'Unit 4 — Life Issues',
    couleur: '#ec4899',
    gradient: 'linear-gradient(135deg,rgba(236,72,153,0.12),rgba(219,39,119,0.06))',
    border: 'rgba(236,72,153,0.25)',
    chapitres: ['Environmental Issues', 'Social Issues', 'Health & Lifestyle', 'Teen Issues & Society'],
    grammar: ['Reported speech', 'Future forms', 'Complex sentences'],
  },
]

export default function AnglaisBacPage() {
  return (
    <>
      <Navbar />
      <main style={{ position:'relative', zIndex:1, paddingTop:80 }}>
        <div className="container" style={{ paddingTop:40, paddingBottom:80 }}>

          {/* Breadcrumb */}
          <div style={{ display:'flex', gap:8, alignItems:'center', fontSize:12, color:'var(--muted)', marginBottom:24, flexWrap:'wrap' }}>
            <Link href="/bac" style={{ color:'var(--muted)', textDecoration:'none' }}>🇹🇳 Bac Tunisie</Link>
            <span>›</span>
            <span style={{ color:'#f59e0b' }}>🇬🇧 Anglais</span>
          </div>

          {/* Header */}
          <div style={{ marginBottom:44 }}>
            <span className="label" style={{ marginBottom:14, display:'inline-block' }}>
              🇹🇳 Programme officiel CNP Tunisie — 🇬🇧 Anglais
            </span>
            <h1 style={{ fontSize:'clamp(26px,4vw,44px)', marginBottom:12 }}>
              Anglais — Toutes Sections<br />
              <span style={{ background:'linear-gradient(90deg,#f59e0b,#ec4899)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>
                Bac 4ème Année Secondaire
              </span>
            </h1>
            <p style={{ maxWidth:620, color:'var(--text2)', marginBottom:20, lineHeight:1.7 }}>
              Programme commun à toutes les sections — 4 Units · Reading · Writing · Language.
              Chapitres généraux + spécificités par section (Sciences, Éco-Gestion, Lettres).
            </p>

            {/* Badges sections */}
            <div style={{ display:'flex', flexWrap:'wrap', gap:6, marginBottom:20 }}>
              {[
                { label:'🔬 Sciences / Math / Info / Tech', color:'#6366f1' },
                { label:'📊 Éco-Gestion',                  color:'#10b981' },
                { label:'📚 Lettres',                      color:'#ec4899' },
              ].map(s => (
                <span key={s.label} style={{ fontSize:11, padding:'4px 12px', borderRadius:20,
                  background:`${s.color}14`, color:s.color, fontWeight:700,
                  border:`1px solid ${s.color}30` }}>
                  {s.label}
                </span>
              ))}
            </div>

            <div style={{ display:'flex', gap:10, flexWrap:'wrap' }}>
              <Link href="/bac/anglais/toutes-sections" style={{ display:'inline-flex', alignItems:'center', gap:8,
                padding:'10px 22px', borderRadius:11,
                background:'linear-gradient(135deg,#f59e0b,#d97706)',
                color:'white', fontSize:13, fontWeight:700, textDecoration:'none' }}>
                📖 Voir les 4 Units →
              </Link>
              <Link href="/examens" className="btn btn-secondary" style={{ textDecoration:'none' }}>📋 Examens Bac</Link>
              <Link href="/chat" className="btn btn-ghost" style={{ textDecoration:'none' }}>🤖 Chat IA →</Link>
            </div>
          </div>

          {/* Stats */}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:14, marginBottom:48 }}>
            {[
              { num:'4',   label:'Units',      icon:'📖' },
              { num:'17',  label:'Chapitres',  icon:'📚' },
              { num:'3',   label:'Sections',   icon:'🎓' },
              { num:'4',   label:'Grammar pts', icon:'✍️' },
            ].map(s => (
              <div key={s.label} className="card" style={{ textAlign:'center', padding:20 }}>
                <div style={{ fontSize:22, marginBottom:8 }}>{s.icon}</div>
                <div style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:26, color:'#f59e0b' }}>{s.num}</div>
                <div style={{ fontSize:12, color:'var(--muted)' }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Cards Units */}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))', gap:20, marginBottom:52 }}>
            {UNITS.map(u => (
              <Link key={u.slug} href={`/bac/anglais/toutes-sections/${u.slug}`} style={{ textDecoration:'none' }}>
                <div style={{ background:u.gradient, border:`1.5px solid ${u.border}`, borderRadius:20,
                  padding:'28px 24px', cursor:'pointer', transition:'transform 0.2s, box-shadow 0.2s',
                  height:'100%' }}
                  onMouseEnter={e=>{ (e.currentTarget as HTMLElement).style.transform='translateY(-4px)'; (e.currentTarget as HTMLElement).style.boxShadow=`0 12px 40px ${u.couleur}22` }}
                  onMouseLeave={e=>{ (e.currentTarget as HTMLElement).style.transform='translateY(0)'; (e.currentTarget as HTMLElement).style.boxShadow='' }}>

                  {/* Header Unit */}
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:16 }}>
                    <span style={{ fontSize:36 }}>{u.icon}</span>
                    <span style={{ fontFamily:'var(--font-mono)', fontSize:10, color:u.couleur,
                      background:`${u.couleur}18`, padding:'3px 10px', borderRadius:20, fontWeight:700 }}>
                      Unit {u.num}
                    </span>
                  </div>

                  <h3 style={{ fontSize:16, fontWeight:800, color:u.couleur, marginBottom:12 }}>{u.titre}</h3>

                  {/* Chapitres */}
                  <div style={{ marginBottom:14 }}>
                    {u.chapitres.map(ch => (
                      <div key={ch} style={{ display:'flex', gap:6, alignItems:'flex-start',
                        fontSize:12, color:'var(--text2)', marginBottom:5 }}>
                        <span style={{ color:u.couleur, flexShrink:0, fontWeight:700 }}>▸</span>
                        <span>{ch}</span>
                      </div>
                    ))}
                  </div>

                  {/* Grammar */}
                  <div style={{ background:`${u.couleur}08`, border:`1px solid ${u.couleur}20`,
                    borderRadius:10, padding:'8px 12px', marginBottom:16 }}>
                    <div style={{ fontSize:10, color:u.couleur, fontWeight:700, marginBottom:5,
                      textTransform:'uppercase', letterSpacing:'0.06em' }}>Grammar</div>
                    <div style={{ display:'flex', flexWrap:'wrap', gap:4 }}>
                      {u.grammar.map(g => (
                        <span key={g} style={{ fontSize:10, padding:'2px 8px', borderRadius:12,
                          background:`${u.couleur}14`, color:'var(--text2)' }}>{g}</span>
                      ))}
                    </div>
                  </div>

                  <span style={{ display:'inline-flex', alignItems:'center', gap:6,
                    color:u.couleur, fontWeight:700, fontSize:12 }}>
                    Voir les chapitres →
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* Lien retour */}
          <div style={{ textAlign:'center', paddingTop:28, borderTop:'1px solid var(--border)' }}>
            <Link href="/bac" style={{ display:'inline-flex', alignItems:'center', gap:8,
              padding:'10px 22px', borderRadius:12, border:'1px solid var(--border)',
              background:'var(--surface)', color:'var(--muted)', fontSize:13, fontWeight:600,
              textDecoration:'none' }}>
              ← Toutes les matières Bac Tunisie
            </Link>
          </div>
        </div>
      </main>
      <Footer />
      <style>{`
        @media(max-width:700px){
          div[style*="repeat(4,1fr)"] { grid-template-columns: repeat(2,1fr) !important; }
        }
      `}</style>
    </>
  )
}
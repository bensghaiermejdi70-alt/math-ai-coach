'use client'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

// ═══════════════════════════════════════════════════════════════
//  Route : /bac/anglais/toutes-sections
//  Index des 4 Units — Anglais Bac Tunisie · Toutes sections
// ═══════════════════════════════════════════════════════════════

const UNITS = [
  {
    num: 1,
    slug: 'unit1-art-shows-holidaying',
    icon: '🎨',
    titre: 'Unit 1 — Art Shows & Holidaying',
    couleur: '#f59e0b',
    bg: 'rgba(245,158,11,0.08)',
    border: 'rgba(245,158,11,0.22)',
    chapitres: [
      { titre:'Art Shows & Museums',  desc:'Museums · Galleries · Exhibitions · Role of art in society' },
      { titre:'Space Tourism',        desc:'Future travel · Technology & innovation · Pros / Cons' },
      { titre:'A Package Tour',       desc:'Organized tourism · Individual vs group travel · Travel experience' },
    ],
    grammar: ['Present / Past tenses','Comparatives','Expressing opinion'],
    skills: ['Reading comprehension','Opinion essay','Description'],
    nbEx: 6,
  },
  {
    num: 2,
    slug: 'unit2-education-matters',
    icon: '📚',
    titre: 'Unit 2 — Education Matters',
    couleur: '#6366f1',
    bg: 'rgba(99,102,241,0.08)',
    border: 'rgba(99,102,241,0.22)',
    chapitres: [
      { titre:'Education for All',         desc:'Right to education · Equality · Access' },
      { titre:'Education System Problems', desc:'Exams stress · School pressure · Weaknesses' },
      { titre:'Higher Education',          desc:'University · Career choice · Future' },
      { titre:'Online Learning',           desc:'Distance learning · Technology in education · Virtual schools' },
      { titre:'Lifelong Learning',         desc:'Continuous learning · Self-education · Adult education' },
      { titre:'Comparing Systems',         desc:'Different education models · Advantages / disadvantages' },
    ],
    grammar: ['Modals (can, must, should…)','Passive voice','Conditionals (1st, 2nd, 3rd)'],
    skills: ['Argumentative essay','Article','Summary'],
    nbEx: 8,
  },
  {
    num: 3,
    slug: 'unit3-creative-inventive-minds',
    icon: '💡',
    titre: 'Unit 3 — Creative & Inventive Minds',
    couleur: '#06d6a0',
    bg: 'rgba(6,214,160,0.08)',
    border: 'rgba(6,214,160,0.22)',
    chapitres: [
      { titre:'Creativity',            desc:'Imagination · Thinking skills · Creative process' },
      { titre:'Innovation',            desc:'Technology · Scientific progress · Breakthroughs' },
      { titre:'Inventions & Inventors',desc:'Famous inventors · Impact on society · Patents' },
      { titre:'Modern Technology & AI',desc:'Artificial Intelligence · Digital world · Future innovation' },
    ],
    grammar: ['Relative clauses (who, which, that…)','Linking words (however, therefore…)','Gerund / Infinitive'],
    skills: ['Cause / effect essay','Report','Email'],
    nbEx: 7,
  },
  {
    num: 4,
    slug: 'unit4-life-issues',
    icon: '🌍',
    titre: 'Unit 4 — Life Issues',
    couleur: '#ec4899',
    bg: 'rgba(236,72,153,0.08)',
    border: 'rgba(236,72,153,0.22)',
    chapitres: [
      { titre:'Environmental Issues',  desc:'Pollution · Climate change · Solutions' },
      { titre:'Social Issues',         desc:'Poverty · Inequality · Crime' },
      { titre:'Health & Lifestyle',    desc:'Stress · Mental health · Healthy living' },
      { titre:'Teen Issues & Society', desc:'Social media · Modern life problems · Teen challenges' },
    ],
    grammar: ['Reported speech','Future forms (will, going to, present continuous)','Complex sentences'],
    skills: ['Problem / solution essay','Opinion article','Formal email'],
    nbEx: 7,
  },
]

const SECTIONS_SPECS = [
  { key:'sciences', label:'Sciences / Math / Info / Tech', icon:'🔬', color:'#6366f1' },
  { key:'eco',      label:'Éco-Gestion',                  icon:'📊', color:'#10b981' },
  { key:'lettres',  label:'Lettres',                      icon:'📚', color:'#ec4899' },
]

export default function ToutesSectionsIndexPage() {
  return (
    <>
      <Navbar />
      <main style={{ position:'relative', zIndex:1, paddingTop:80 }}>

        {/* Breadcrumb */}
        <div style={{ borderBottom:'1px solid var(--border)', padding:'12px clamp(20px,5vw,60px)',
          display:'flex', gap:8, fontSize:13, color:'var(--muted)', alignItems:'center', flexWrap:'wrap' }}>
          <Link href="/bac" style={{ color:'var(--muted)', textDecoration:'none' }}>🇹🇳 Bac</Link>
          <span>›</span>
          <Link href="/bac/anglais" style={{ color:'var(--muted)', textDecoration:'none' }}>🇬🇧 Anglais</Link>
          <span>›</span>
          <span style={{ color:'#f59e0b', fontWeight:600 }}>Toutes sections</span>
        </div>

        <div className="container" style={{ paddingTop:40, paddingBottom:80 }}>

          {/* Header */}
          <div style={{ marginBottom:44 }}>
            <div style={{ display:'flex', gap:10, alignItems:'center', marginBottom:14, flexWrap:'wrap' }}>
              <span style={{ background:'rgba(245,158,11,0.15)', color:'#f59e0b',
                padding:'4px 14px', borderRadius:20, fontSize:12, fontWeight:700 }}>
                🇬🇧 ANGLAIS — PROGRAMME UNIQUE
              </span>
              <span style={{ background:'rgba(245,158,11,0.1)', color:'#f59e0b',
                fontSize:10, fontWeight:800, padding:'3px 12px', borderRadius:20 }}>
                4 UNITS · TOUTES SECTIONS
              </span>
            </div>
            <h1 style={{ fontSize:'clamp(24px,4vw,42px)', marginBottom:10 }}>
              🇬🇧 Anglais — Toutes Sections<br />
              <span style={{ background:'linear-gradient(90deg,#f59e0b,#ec4899)',
                WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>
                Bac 4ème Année · Programme officiel CNP
              </span>
            </h1>
            <p style={{ maxWidth:660, color:'var(--text2)', marginBottom:18, lineHeight:1.7 }}>
              Programme <strong style={{ color:'#f59e0b' }}>unique commun</strong> à toutes les sections.
              Chaque chapitre contient le cours général + des spécificités adaptées à chaque section.
            </p>

            {/* Sections disponibles */}
            <div style={{ background:'rgba(245,158,11,0.06)', border:'1px solid rgba(245,158,11,0.2)',
              borderRadius:12, padding:'12px 18px', marginBottom:18,
              display:'flex', gap:12, flexWrap:'wrap', alignItems:'center' }}>
              <span style={{ fontSize:12, color:'#f59e0b', fontWeight:700 }}>Sections :</span>
              {SECTIONS_SPECS.map(s => (
                <span key={s.key} style={{ fontSize:11, padding:'3px 12px', borderRadius:20,
                  background:`${s.color}14`, color:s.color, fontWeight:700,
                  border:`1px solid ${s.color}25` }}>
                  {s.icon} {s.label}
                </span>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:14, marginBottom:48 }}>
            {[
              { num:'4',  label:'Units',       icon:'📖' },
              { num:'17', label:'Chapitres',   icon:'📚' },
              { num:'3',  label:'Sections',    icon:'🎓' },
              { num:'28', label:'Exercices',   icon:'✍️' },
            ].map(s => (
              <div key={s.label} className="card" style={{ textAlign:'center', padding:20 }}>
                <div style={{ fontSize:22, marginBottom:8 }}>{s.icon}</div>
                <div style={{ fontFamily:'var(--font-display)', fontWeight:700,
                  fontSize:26, color:'#f59e0b' }}>{s.num}</div>
                <div style={{ fontSize:12, color:'var(--muted)' }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Cards Units */}
          <div style={{ display:'flex', flexDirection:'column', gap:24, marginBottom:52 }}>
            {UNITS.map(u => (
              <Link key={u.slug} href={`/bac/anglais/toutes-sections/${u.slug}`}
                style={{ textDecoration:'none' }}>
                <div style={{ background:u.bg, border:`1.5px solid ${u.border}`,
                  borderRadius:20, padding:'28px 28px', cursor:'pointer',
                  transition:'transform 0.2s, box-shadow 0.2s' }}
                  onMouseEnter={e=>{ (e.currentTarget as HTMLElement).style.transform='translateY(-3px)'; (e.currentTarget as HTMLElement).style.boxShadow=`0 10px 36px ${u.couleur}22` }}
                  onMouseLeave={e=>{ (e.currentTarget as HTMLElement).style.transform='translateY(0)'; (e.currentTarget as HTMLElement).style.boxShadow='' }}>

                  {/* Header */}
                  <div style={{ display:'flex', justifyContent:'space-between',
                    alignItems:'flex-start', marginBottom:18, flexWrap:'wrap', gap:10 }}>
                    <div style={{ display:'flex', gap:12, alignItems:'center' }}>
                      <span style={{ fontSize:32 }}>{u.icon}</span>
                      <div>
                        <span style={{ fontFamily:'var(--font-mono)', fontSize:10, color:u.couleur,
                          background:`${u.couleur}18`, padding:'2px 10px', borderRadius:20,
                          fontWeight:700, display:'block', marginBottom:4 }}>
                          UNIT {u.num}
                        </span>
                        <h3 style={{ fontSize:18, fontWeight:800, color:u.couleur, margin:0 }}>
                          {u.titre.replace(`Unit ${u.num} — `, '')}
                        </h3>
                      </div>
                    </div>
                    <span style={{ fontSize:11, color:'var(--muted)' }}>📝 {u.nbEx} exercices</span>
                  </div>

                  {/* 2 colonnes : chapitres + grammar/skills */}
                  <div style={{ display:'grid', gridTemplateColumns:'1fr 280px', gap:20 }}>

                    {/* Chapitres */}
                    <div>
                      <div style={{ fontSize:10, color:'var(--muted)', fontWeight:700,
                        textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:10 }}>
                        Chapitres
                      </div>
                      <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                        {u.chapitres.map((ch, i) => (
                          <div key={ch.titre} style={{ display:'flex', gap:8,
                            padding:'8px 12px', borderRadius:10,
                            background:'rgba(255,255,255,0.03)',
                            border:'1px solid rgba(255,255,255,0.06)' }}>
                            <span style={{ color:u.couleur, fontWeight:800, fontSize:11,
                              flexShrink:0, fontFamily:'var(--font-mono)', marginTop:1 }}>
                              {String(i+1).padStart(2,'0')}
                            </span>
                            <div>
                              <div style={{ fontSize:12, fontWeight:700, color:'var(--text)',
                                marginBottom:2 }}>{ch.titre}</div>
                              <div style={{ fontSize:11, color:'var(--muted)', lineHeight:1.5 }}>
                                {ch.desc}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Grammar + Skills + Spécificités */}
                    <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
                      {/* Grammar */}
                      <div style={{ background:`${u.couleur}08`, border:`1px solid ${u.couleur}20`,
                        borderRadius:12, padding:'12px 14px' }}>
                        <div style={{ fontSize:10, color:u.couleur, fontWeight:700,
                          textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:8 }}>
                          ✍️ Grammar
                        </div>
                        {u.grammar.map(g => (
                          <div key={g} style={{ display:'flex', gap:6, fontSize:11,
                            color:'var(--text2)', marginBottom:4 }}>
                            <span style={{ color:u.couleur }}>▸</span>{g}
                          </div>
                        ))}
                      </div>
                      {/* Writing Skills */}
                      <div style={{ background:'rgba(255,255,255,0.03)',
                        border:'1px solid rgba(255,255,255,0.08)', borderRadius:12, padding:'12px 14px' }}>
                        <div style={{ fontSize:10, color:'var(--muted)', fontWeight:700,
                          textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:8 }}>
                          📝 Writing / Skills
                        </div>
                        {u.skills.map(s => (
                          <div key={s} style={{ fontSize:11, color:'var(--text2)', marginBottom:4 }}>
                            · {s}
                          </div>
                        ))}
                      </div>
                      {/* Badge spécificités */}
                      <div style={{ background:'rgba(255,255,255,0.02)',
                        border:'1px solid rgba(255,255,255,0.06)', borderRadius:12, padding:'12px 14px' }}>
                        <div style={{ fontSize:10, color:'var(--muted)', fontWeight:700,
                          textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:8 }}>
                          Spécificités par section
                        </div>
                        <div style={{ display:'flex', flexDirection:'column', gap:4 }}>
                          <span style={{ fontSize:10, color:'#6366f1' }}>🔬 Sciences → logique / tech</span>
                          <span style={{ fontSize:10, color:'#10b981' }}>📊 Éco → économie / business</span>
                          <span style={{ fontSize:10, color:'#ec4899' }}>📚 Lettres → expression / culture</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* CTA */}
                  <div style={{ marginTop:18, display:'flex', justifyContent:'flex-end' }}>
                    <span style={{ display:'inline-flex', alignItems:'center', gap:6,
                      color:u.couleur, fontWeight:700, fontSize:13 }}>
                      Voir les chapitres complets →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Navigation */}
          <div style={{ display:'flex', gap:12, flexWrap:'wrap' }}>
            <Link href="/bac/anglais" style={{ display:'inline-flex', alignItems:'center', gap:8,
              padding:'10px 20px', background:'var(--surface)', border:'1px solid var(--border)',
              borderRadius:12, fontFamily:'var(--font-body)', fontWeight:600, fontSize:13,
              color:'var(--muted)', textDecoration:'none' }}>
              ← Retour Anglais
            </Link>
            <Link href="/examens" style={{ display:'inline-flex', alignItems:'center', gap:8,
              padding:'10px 20px', background:'var(--surface)', border:'1px solid var(--border)',
              borderRadius:12, fontFamily:'var(--font-body)', fontWeight:600, fontSize:13,
              color:'var(--muted)', textDecoration:'none' }}>
              📋 Examens Bac →
            </Link>
            <Link href="/chat" style={{ display:'inline-flex', alignItems:'center', gap:8,
              padding:'10px 20px', background:'var(--surface)', border:'1px solid var(--border)',
              borderRadius:12, fontFamily:'var(--font-body)', fontWeight:600, fontSize:13,
              color:'var(--muted)', textDecoration:'none' }}>
              🤖 Chat IA →
            </Link>
          </div>
        </div>
      </main>
      <Footer />
      <style>{`
        @media(max-width:800px){
          div[style*="grid-template-columns: 1fr 280px"]{grid-template-columns:1fr!important;}
          div[style*="repeat(4,1fr)"]{grid-template-columns:repeat(2,1fr)!important;}
        }
      `}</style>
    </>
  )
}
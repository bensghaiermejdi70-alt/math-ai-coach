'use client'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

// ══════════════════════════════════════════════════════════════════════
//  ANGLAIS PREMIÈRE FRANCE — INDEX 8 AXES
//  Route : /bac-france/anglais/premiere
//  Programme officiel MEN 2026/2027
// ══════════════════════════════════════════════════════════════════════

const AXES = [
  { num:1, emoji:'🌍', titre:'Identities and Exchanges',        slug:'ax1-identities-exchanges',  nb:6,  color:'#f59e0b', chapitres:['Cultural identity','Migration & Mobility','Multiculturalism','American Dream','Cultural Conflicts','Identity Construction'], grammar:['Present Perfect','Conditionals','Reported speech'] },
  { num:2, emoji:'📱', titre:'Private Sphere & Public Sphere',  slug:'ax2-private-public-sphere', nb:7,  color:'#8b5cf6', chapitres:['Digital Identity','Social Media & Influencers','Media Power','Privacy vs Surveillance','Freedom of Expression','Online Communication','Fake News'], grammar:['Passive voice','Relative clauses','Future forms'] },
  { num:3, emoji:'🎨', titre:'Art and Power',                   slug:'ax3-art-power',             nb:5,  color:'#ec4899', chapitres:['Art as Protest','Propaganda & Censorship','Music & Politics','Cinema & Power','Cultural Influence'], grammar:['Modals','Linking words','Gerund/Infinitive'] },
  { num:4, emoji:'💻', titre:'Citizenship & Virtual Worlds',    slug:'ax4-citizenship-virtual',   nb:7,  color:'#06b6d4', chapitres:['Online Activism','Digital Democracy','Fake News','Internet & Rights','AI Influence','Cybersecurity','Digital Citizenship'], grammar:['Conditionals type 1 & 2','Complex sentences','Reporting'] },
  { num:5, emoji:'📚', titre:'Fictions and Realities',          slug:'ax5-fictions-realities',    nb:6,  color:'#10b981', chapitres:['Dystopia (1984…)','Storytelling','Film Adaptation','Imagination vs Reality','Science-fiction','Narrative Voice'], grammar:['Past tenses narrative','Would/Could hypothetical','Relative clauses'] },
  { num:6, emoji:'🔬', titre:'Scientific Innovation',           slug:'ax6-scientific-innovation', nb:5,  color:'#6366f1', chapitres:['AI & Ethics','Climate Change','Biotechnology','Medical Progress','Green Technology'], grammar:['Passive voice','Future forms','Modals of obligation'] },
  { num:7, emoji:'⚖️', titre:'Diversity & Inclusion',           slug:'ax7-diversity-inclusion',   nb:6,  color:'#f97316', chapitres:['Gender Equality','Minorities','Social Justice','Discrimination','Inclusive Society','#MeToo'], grammar:['Reported speech','Comparatives','Modals'] },
  { num:8, emoji:'🏛️', titre:'Territory & Memory',              slug:'ax8-territory-memory',      nb:4,  color:'#84cc16', chapitres:['War Memory','Colonial History','National Identity','Heritage & Preservation'], grammar:['Past tenses','Passive','Reported speech'] },
]

export default function AnglaisPremiereIndexPage() {
  return (
    <>
      <Navbar />
      <main style={{ position:'relative', zIndex:1, paddingTop:80 }}>
        <div style={{ borderBottom:'1px solid var(--border)', padding:'12px clamp(20px,5vw,60px)',
          display:'flex', gap:8, fontSize:13, color:'var(--muted)', alignItems:'center', flexWrap:'wrap' }}>
          <Link href="/bac-france" style={{ color:'var(--muted)', textDecoration:'none' }}>🇫🇷 France</Link><span>›</span>
          <Link href="/bac-france/anglais" style={{ color:'var(--muted)', textDecoration:'none' }}>🇬🇧 Anglais</Link><span>›</span>
          <span style={{ color:'#8b5cf6', fontWeight:600 }}>📗 Première</span>
        </div>
        <div className="container" style={{ paddingTop:36, paddingBottom:80 }}>

          {/* Header */}
          <div style={{ marginBottom:40 }}>
            <div style={{ display:'flex', gap:10, alignItems:'center', marginBottom:14, flexWrap:'wrap' }}>
              <span style={{ fontSize:32 }}>📗</span>
              <span style={{ background:'rgba(139,92,246,0.15)', color:'#a78bfa', padding:'4px 14px', borderRadius:20, fontSize:12, fontWeight:700 }}>
                🇬🇧 ANGLAIS PREMIÈRE — 8 AXES
              </span>
              <span style={{ fontSize:11, background:'rgba(139,92,246,0.1)', color:'#a78bfa', padding:'3px 12px', borderRadius:20, fontWeight:700 }}>
                TRONC COMMUN + LLCER · AMC
              </span>
            </div>
            <h1 style={{ fontSize:'clamp(24px,4vw,40px)', marginBottom:10 }}>
              🇬🇧 Première — Anglais LVA/LVB<br />
              <span style={{ background:'linear-gradient(90deg,#8b5cf6,#06b6d4)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>
                Programme officiel MEN 2026/2027
              </span>
            </h1>
            <p style={{ maxWidth:640, color:'var(--text2)', marginBottom:18, lineHeight:1.7 }}>
              8 axes thématiques · Argumentation, analyse critique et autonomie linguistique.
              Préparation Grand Oral coef. 8 · LLCER (œuvres obligatoires) · AMC.
            </p>
          </div>

          {/* Stats */}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:14, marginBottom:44 }}>
            {[
              { num:'8', label:'Axes thématiques', icon:'🎯' },
              { num:'46',label:'Sous-chapitres',   icon:'📚' },
              { num:'B2',label:'Niveau visé',       icon:'🏆' },
              { num:'3', label:'Spécialités',       icon:'🎓' },
            ].map(s => (
              <div key={s.label} className="card" style={{ textAlign:'center', padding:18 }}>
                <div style={{ fontSize:20, marginBottom:6 }}>{s.icon}</div>
                <div style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:24, color:'#8b5cf6' }}>{s.num}</div>
                <div style={{ fontSize:11, color:'var(--muted)' }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* LLCER badge */}
          <div style={{ background:'rgba(236,72,153,0.06)', border:'1px solid rgba(236,72,153,0.2)', borderRadius:12, padding:'14px 18px', marginBottom:36 }}>
            <div style={{ fontWeight:700, fontSize:12, color:'#fb7185', marginBottom:8 }}>📚 LLCER — Œuvres au programme</div>
            <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
              {["Fahrenheit 451 (Bradbury)","Lord of the Flies (Golding)","To Kill a Mockingbird (Lee)","A.I. Artificial Intelligence (film)"].map(oe => (
                <span key={oe} style={{ fontSize:11, padding:'3px 12px', borderRadius:20, background:'rgba(236,72,153,0.1)', color:'#fb7185', border:'1px solid rgba(236,72,153,0.2)' }}>
                  📖 {oe}
                </span>
              ))}
            </div>
          </div>

          {/* Grille axes */}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))', gap:16, marginBottom:44 }}>
            {AXES.map(ax => (
              <Link key={ax.slug} href={`/bac-france/anglais/premiere/${ax.slug}`} style={{ textDecoration:'none' }}>
                <div style={{ background:`${ax.color}08`, border:`1.5px solid ${ax.color}22`, borderRadius:16, padding:'18px 20px', cursor:'pointer', transition:'transform 0.18s, box-shadow 0.18s', height:'100%' }}
                  onMouseEnter={e=>{ (e.currentTarget as HTMLElement).style.transform='translateY(-3px)'; (e.currentTarget as HTMLElement).style.boxShadow=`0 10px 30px ${ax.color}22` }}
                  onMouseLeave={e=>{ (e.currentTarget as HTMLElement).style.transform='translateY(0)'; (e.currentTarget as HTMLElement).style.boxShadow='' }}>
                  <div style={{ display:'flex', gap:9, alignItems:'center', marginBottom:12 }}>
                    <span style={{ fontSize:26 }}>{ax.emoji}</span>
                    <div>
                      <span style={{ fontFamily:'var(--font-mono)', fontSize:9, color:ax.color, fontWeight:700, display:'block', marginBottom:2 }}>AXE {ax.num} · {ax.nb} chapitres</span>
                      <h3 style={{ fontSize:13, fontWeight:800, color:ax.color, margin:0 }}>{ax.titre}</h3>
                    </div>
                  </div>
                  <div style={{ display:'flex', flexWrap:'wrap', gap:4, marginBottom:10 }}>
                    {ax.chapitres.slice(0,3).map(ch => (
                      <span key={ch} style={{ fontSize:10, padding:'2px 7px', borderRadius:8, background:`${ax.color}12`, color:'var(--text2)' }}>{ch}</span>
                    ))}
                  </div>
                  <div style={{ fontSize:10, color:'var(--muted)' }}>Grammar: {ax.grammar.join(' · ')}</div>
                </div>
              </Link>
            ))}
          </div>

          <div style={{ display:'flex', gap:12, flexWrap:'wrap' }}>
            <Link href="/bac-france/anglais/terminale" style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'10px 20px', background:'linear-gradient(135deg,#f43f5e,#f59e0b)', color:'white', borderRadius:12, fontWeight:700, fontSize:13, textDecoration:'none' }}>
              🎓 Terminale — 8 axes
            </Link>
            <Link href="/bac-france/anglais/seconde" style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'10px 20px', background:'var(--surface)', border:'1px solid var(--border)', borderRadius:12, fontWeight:600, fontSize:13, color:'var(--muted)', textDecoration:'none' }}>
              📘 Seconde
            </Link>
            <Link href="/bac-france/anglais" style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'10px 20px', background:'var(--surface)', border:'1px solid var(--border)', borderRadius:12, fontWeight:600, fontSize:13, color:'var(--muted)', textDecoration:'none' }}>
              ↩ Index Anglais
            </Link>
          </div>
        </div>
      </main>
      <Footer />
      <style>{`@media(max-width:700px){ div[style*="repeat(4,1fr)"]{ grid-template-columns:repeat(2,1fr)!important; } div[style*="minmax(300px,1fr)"]{ grid-template-columns:1fr!important; } }`}</style>
    </>
  )
}
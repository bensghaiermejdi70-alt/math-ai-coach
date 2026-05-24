'use client'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

// ══════════════════════════════════════════════════════════════════════
//  ANGLAIS SECONDE FRANCE — INDEX
//  Route : /bac-france/anglais/seconde
//  Global theme: "L'art de vivre ensemble"
//  Official MEN programme 2026/2027 · Tronc commun
// ══════════════════════════════════════════════════════════════════════

const COMPETENCES = [
  {
    num: 1, slug:'communication-interaction', emoji:'💬', titre:'Communication & Interaction', color:'#06b6d4',
    nb:7, badge:'Speaking · Dialogue · Debate',
    sous:['Oral interaction','Speaking & presenting','Giving opinions','Asking & answering questions','Debating','Storytelling','Group projects'],
    desc:"Learn to communicate in English — ask questions, take part in conversations, debate and express your opinion.",
    key_phrases:["In my opinion…","I agree/disagree because…","Could you explain…?","On the other hand…"],
  },
  {
    num: 2, slug:'comprehension-ecrite', emoji:'📖', titre:'Reading Comprehension', color:'#8b5cf6',
    nb:6, badge:'Reading · Analysis · Vocabulary',
    sous:['News articles','Formal emails','Literary extracts','Advertisements','Analysing purpose & audience','Vocabulary in context'],
    desc:"Understand different types of texts — identify the main idea, analyse details and deduce meaning from context.",
    key_phrases:["The text suggests…","According to the author…","The main idea is…","We can infer that…"],
  },
  {
    num: 3, slug:'comprehension-orale', emoji:'🎧', titre:'Listening Comprehension', color:'#ec4899',
    nb:4, badge:'Listening · Audio · Video',
    sous:['Dialogues & conversations','Interviews & podcasts','Videos & short films','Documentaries & news'],
    desc:"Understand spoken English — identify key information, recognise different accents and grasp the overall meaning.",
    key_phrases:["I heard that…","The speaker mentions…","The key point is…","I understood that…"],
  },
  {
    num: 4, slug:'expression-ecrite', emoji:'✍️', titre:'Written Expression', color:'#10b981',
    nb:7, badge:'Writing · Email · Narrative',
    sous:['Formal email','Narrative writing','Descriptive writing','Argumentative text','Organising ideas','Cohesive devices','Short synthesis'],
    desc:"Write correctly in English — organise your ideas, use logical connectors and structure a coherent text.",
    key_phrases:["Firstly…","However…","In conclusion…","Moreover…","Therefore…","Despite…"],
  },
  {
    num: 5, slug:'grammaire', emoji:'📐', titre:'Grammar', color:'#f59e0b',
    nb:5, badge:'Core grammar programme',
    sous:['Noun phrase (determiners, adjectives)','Verb phrase (auxiliaries, modals)','Tenses (Present/Past/Perfect/Future)','Sentence structure (questions, comparatives)','Advanced structures (passive, reported speech)'],
    desc:"Grammar is the official foundation of the programme. Master tenses, modals, passive voice and reported speech.",
    key_phrases:["Present Simple vs Continuous","Past Simple vs Present Perfect","Will vs Going to","Must / Should / Can"],
  },
  {
    num: 6, slug:'vocabulaire-culture', emoji:'🌍', titre:'Vocabulary & Cultural Themes', color:'#f43f5e',
    nb:5, badge:'Culture · Civilisation · English-speaking world',
    sous:['English-speaking countries (UK, USA, Commonwealth)','Traditions & society','Ways of life','Global theme: living together','Idioms & expressions'],
    desc:"Discover the English-speaking world — culture, traditions, society and ways of life. Global theme: the art of living together.",
    key_phrases:["cultural diversity","multiculturalism","way of life","British vs American English","Commonwealth"],
  },
]

const GRAMMAIRE_PROGRAMME = [
  { cat:'Tenses', points:['Present Simple / Continuous','Past Simple / Continuous','Present Perfect','Future (will / going to)','Conditional type 1'] },
  { cat:'Modals', points:['can / could','must / have to','should / ought to','may / might','will / would'] },
  { cat:'Sentence Structure', points:['Questions (direct / indirect)','Passive voice (intro)','Reported speech (intro)','Comparatives & Superlatives','Relative clauses (basic)'] },
  { cat:'Noun Phrase', points:['Articles (a, an, the)','Quantifiers (some, any, much, many…)','Adjectives (order, use)','Pronouns'] },
]

export default function AnglaisSecondeIndexPage() {
  return (
    <>
      <Navbar />
      <main style={{ position:'relative', zIndex:1, paddingTop:80 }}>
        <div style={{ borderBottom:'1px solid var(--border)', padding:'12px clamp(20px,5vw,60px)',
          display:'flex', gap:8, fontSize:13, color:'var(--muted)', alignItems:'center', flexWrap:'wrap' }}>
          <Link href="/bac-france" style={{ color:'var(--muted)', textDecoration:'none' }}>🇫🇷 France</Link><span>›</span>
          <Link href="/bac-france/anglais" style={{ color:'var(--muted)', textDecoration:'none' }}>🇬🇧 Anglais</Link><span>›</span>
          <span style={{ color:'#06b6d4', fontWeight:600 }}>📘 Seconde</span>
        </div>

        <div className="container" style={{ paddingTop:36, paddingBottom:80 }}>

          {/* Header */}
          <div style={{ marginBottom:40 }}>
            <div style={{ display:'flex', gap:10, alignItems:'center', marginBottom:14, flexWrap:'wrap' }}>
              <span style={{ fontSize:32 }}>📘</span>
              <span style={{ background:'rgba(6,182,212,0.15)', color:'#22d3ee', padding:'4px 14px', borderRadius:20, fontSize:12, fontWeight:700 }}>
                🇬🇧 ENGLISH — YEAR 10 — COMMON CORE
              </span>
              <span style={{ fontSize:11, background:'rgba(6,182,212,0.1)', color:'#22d3ee', padding:'3px 12px', borderRadius:20, fontWeight:700 }}>
                6 SKILLS · ALL STREAMS
              </span>
            </div>
            <h1 style={{ fontSize:'clamp(24px,4vw,40px)', marginBottom:10 }}>
              🇬🇧 Seconde — Anglais LVA/LVB<br />
              <span style={{ background:'linear-gradient(90deg,#06b6d4,#8b5cf6)',
                WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>
                Official MEN programme 2026/2027
              </span>
            </h1>
            <p style={{ maxWidth:640, color:'var(--text2)', marginBottom:16, lineHeight:1.7 }}>
              Programme basé sur les <strong style={{ color:'#22d3ee' }}>6 core skills</strong>
              et la culture anglophone. Global theme: <em>L'art de vivre ensemble</em>.
              Common core for all students — goal: consolidation and linguistic autonomy.
            </p>
            {/* Thème global */}
            <div style={{ background:'rgba(6,182,212,0.08)', border:'1px solid rgba(6,182,212,0.25)', borderRadius:12, padding:'12px 18px', marginBottom:16, display:'inline-flex', alignItems:'center', gap:10 }}>
              <span style={{ fontSize:20 }}>🌏</span>
              <div>
                <div style={{ fontSize:11, color:'#22d3ee', fontWeight:700, marginBottom:2 }}>Global theme — Year 10 / 2026</div>
                <div style={{ fontSize:13, color:'var(--text)', fontWeight:600 }}>The art of living together — Society, Culture, Diversity</div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:14, marginBottom:44 }}>
            {[
              { num:'6',  label:'Skills', icon:'🎯' },
              { num:'34', label:'Sub-chapters', icon:'📚' },
              { num:'B1', label:'Target level', icon:'🏆' },
              { num:'A2→B1', label:'Progression', icon:'📈' },
            ].map(s => (
              <div key={s.label} className="card" style={{ textAlign:'center', padding:18 }}>
                <div style={{ fontSize:20, marginBottom:6 }}>{s.icon}</div>
                <div style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:22, color:'#06b6d4' }}>{s.num}</div>
                <div style={{ fontSize:11, color:'var(--muted)' }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Différence France vs Tunisie */}
          <div style={{ background:'rgba(245,158,11,0.07)', border:'1px solid rgba(245,158,11,0.2)', borderRadius:12, padding:'14px 18px', marginBottom:40 }}>
            <div style={{ fontWeight:700, fontSize:12, color:'#fbbf24', marginBottom:10 }}>⚠️ France Year 10 vs Tunisia — Key difference</div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
              <div>
                <div style={{ fontSize:11, color:'#f87171', fontWeight:700, marginBottom:6 }}>❌ France Year 10 — NO fixed sections</div>
                <div style={{ fontSize:12, color:'var(--text2)', lineHeight:1.6 }}>
                  Le programme France est basé sur des <strong>compétences</strong> (parler, lire, écrire…) et des thèmes culturels, pas sur des unités fixes comme en Tunisie.<br/>
                  Tous les élèves ont le même programme — tronc commun.
                </div>
              </div>
              <div>
                <div style={{ fontSize:11, color:'#6ee7b7', fontWeight:700, marginBottom:6 }}>✅ Differences depend on future stream</div>
                <div style={{ fontSize:12, color:'var(--text2)', lineHeight:1.6 }}>
                  🔬 Scientifique → textes techniques et logiques<br/>
                  📊 SES → société et économie<br/>
                  📚 Littéraire → expression et culture<br/>
                  Différences dans les textes, pas dans le programme.
                </div>
              </div>
            </div>
          </div>

          {/* Compétences */}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))', gap:18, marginBottom:44 }}>
            {COMPETENCES.map(comp => (
              <Link key={comp.num} href={`/bac-france/anglais/seconde/${comp.slug}`} style={{ textDecoration:'none' }}>
              <div style={{ background:`${comp.color}08`, border:`1.5px solid ${comp.color}22`, borderRadius:16, padding:'20px 22px', cursor:'pointer', transition:'transform 0.18s' }}
                onMouseEnter={e=>((e.currentTarget as HTMLElement).style.transform='translateY(-3px)')}
                onMouseLeave={e=>((e.currentTarget as HTMLElement).style.transform='translateY(0)')}>
                <div style={{ display:'flex', gap:10, alignItems:'center', marginBottom:12 }}>
                  <span style={{ fontSize:28 }}>{comp.emoji}</span>
                  <div>
                    <span style={{ fontFamily:'var(--font-mono)', fontSize:9, color:comp.color, fontWeight:700, display:'block', marginBottom:2 }}>
                      COMPÉTENCE {comp.num} · {comp.nb} sub-chapters
                    </span>
                    <h3 style={{ fontSize:14, fontWeight:800, color:comp.color, margin:0 }}>{comp.titre}</h3>
                  </div>
                </div>
                <p style={{ fontSize:12, color:'var(--text2)', lineHeight:1.6, marginBottom:12 }}>{comp.desc}</p>
                <div style={{ display:'flex', flexWrap:'wrap', gap:5, marginBottom:10 }}>
                  {comp.sous.slice(0,4).map(s => (
                    <span key={s} style={{ fontSize:10, padding:'2px 8px', borderRadius:8, background:`${comp.color}12`, color:'var(--text2)' }}>{s}</span>
                  ))}
                </div>
                <div style={{ background:`${comp.color}08`, border:`1px solid ${comp.color}15`, borderRadius:8, padding:'8px 10px' }}>
                  <div style={{ fontSize:9, color:comp.color, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:5 }}>Key phrases</div>
                  {comp.key_phrases.map(kp => (
                    <div key={kp} style={{ fontSize:10, color:'var(--text2)', marginBottom:2, fontStyle:'italic' }}>"{kp}"</div>
                  ))}
                </div>
              </div>
              </Link>
            ))}
          </div>

          {/* Grammaire programme */}
          <div style={{ background:'rgba(245,158,11,0.06)', border:'1px solid rgba(245,158,11,0.2)', borderRadius:16, padding:'22px 26px', marginBottom:40 }}>
            <div style={{ fontWeight:800, fontSize:15, color:'#fbbf24', marginBottom:18 }}>
              📐 Official Grammar Programme — Year 10
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))', gap:16 }}>
              {GRAMMAIRE_PROGRAMME.map(cat => (
                <div key={cat.cat}>
                  <div style={{ fontSize:12, fontWeight:700, color:'#fbbf24', marginBottom:8 }}>{cat.cat}</div>
                  {cat.points.map(p => (
                    <div key={p} style={{ display:'flex', gap:6, fontSize:11, color:'var(--text2)', marginBottom:4 }}>
                      <span style={{ color:'#f59e0b', flexShrink:0 }}>▸</span>{p}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Nav */}
          <div style={{ display:'flex', gap:12, flexWrap:'wrap' }}>
            <Link href="/bac-france/anglais/premiere" style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'10px 20px', background:'linear-gradient(135deg,#8b5cf6,#06b6d4)', color:'white', borderRadius:12, fontWeight:700, fontSize:13, textDecoration:'none' }}>
              📗 Year 11 — 8 themes →
            </Link>
            <Link href="/bac-france/anglais/terminale" style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'10px 20px', background:'linear-gradient(135deg,#f43f5e,#f59e0b)', color:'white', borderRadius:12, fontWeight:700, fontSize:13, textDecoration:'none' }}>
              🎓 Year 13 — Bac 2027 →
            </Link>
            <Link href="/bac-france/anglais" style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'10px 20px', background:'var(--surface)', border:'1px solid var(--border)', borderRadius:12, fontWeight:600, fontSize:13, color:'var(--muted)', textDecoration:'none' }}>
              ↩ English Index
            </Link>
          </div>
        </div>
      </main>
      <Footer />
      <style>{`@media(max-width:700px){ div[style*="repeat(4,1fr)"]{ grid-template-columns:repeat(2,1fr)!important; } div[style*="minmax(300px,1fr)"]{ grid-template-columns:1fr!important; } div[style*="1fr 1fr"]{ grid-template-columns:1fr!important; } }`}</style>
    </>
  )
}
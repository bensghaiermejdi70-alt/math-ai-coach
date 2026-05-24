'use client'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

// ══════════════════════════════════════════════════════════════════════
//  ANGLAIS TERMINALE FRANCE — INDEX 8 AXES
//  Route : /bac-france/anglais/terminale
//  Programme officiel MEN 2026/2027 · Épreuve Bac 2027
// ══════════════════════════════════════════════════════════════════════

const AXES = [
  {
    slug: 'ax1-identities-exchanges',
    num: 1,
    emoji: '🌍',
    titre: 'Identities and Exchanges',
    couleur: '#f59e0b',
    bg: 'rgba(245,158,11,0.08)',
    border: 'rgba(245,158,11,0.22)',
    nb: 7,
    chapitres: ['Cultural identity','Migration & Mobility','Multiculturalism',
      'American Dream','Globalization','Cultural Conflicts','Identity Construction'],
    grammar: ['Present Perfect','Conditionals','Reported speech'],
    specs: {
      general: 'Analyse culturelle, débats, textes argumentatifs',
      ses: 'Migration économique, mondialisation, marchés',
      sciences: 'Mobilité internationale des chercheurs, échanges technologiques',
    },
  },
  {
    slug: 'ax2-private-public-sphere',
    num: 2,
    emoji: '📱',
    titre: 'Private Sphere & Public Sphere',
    couleur: '#8b5cf6',
    bg: 'rgba(139,92,246,0.08)',
    border: 'rgba(139,92,246,0.22)',
    nb: 6,
    chapitres: ['Digital Identity','Social Media & Influencers','Media Power',
      'Privacy vs Surveillance','Freedom of Expression','Communication & Society'],
    grammar: ['Passive voice','Relative clauses','Future forms'],
    specs: {
      nsi: 'Data privacy, cybersécurité, algorithmes',
      ses: 'Médias et opinion publique, désinformation',
      general: 'Analyse sociale et éthique des médias',
    },
  },
  {
    slug: 'ax3-art-power',
    num: 3,
    emoji: '🎨',
    titre: 'Art and Power',
    couleur: '#ec4899',
    bg: 'rgba(236,72,153,0.08)',
    border: 'rgba(236,72,153,0.22)',
    nb: 7,
    chapitres: ['Art as Protest','Propaganda & Censorship','Music & Politics',
      'Cinema & Power','Soft Power','Cultural Influence','Media & Art'],
    grammar: ['Modals','Linking words','Gerund/Infinitive'],
    specs: {
      llcer: "Analyse d'œuvres littéraires et cinématographiques",
      general: "Rôle de l'art dans la société, essai critique",
    },
  },
  {
    slug: 'ax4-citizenship-virtual',
    num: 4,
    emoji: '💻',
    titre: 'Citizenship & Virtual Worlds',
    couleur: '#06b6d4',
    bg: 'rgba(6,182,212,0.08)',
    border: 'rgba(6,182,212,0.22)',
    nb: 6,
    chapitres: ['Online Activism','Digital Democracy','Fake News & Disinformation',
      'Internet & Rights','AI Influence','Cybersecurity & Citizens'],
    grammar: ['Conditionals type 2 & 3','Complex sentences','Reporting'],
    specs: {
      nsi: 'Cybersécurité, IA, algorithmes de recommandation',
      ses: 'Opinion publique, démocratie numérique',
    },
  },
  {
    slug: 'ax5-fictions-realities',
    num: 5,
    emoji: '📚',
    titre: 'Fictions and Realities',
    couleur: '#10b981',
    bg: 'rgba(16,185,129,0.08)',
    border: 'rgba(16,185,129,0.22)',
    nb: 5,
    chapitres: ['Dystopia & Utopia (1984…)','Storytelling & Narrative',
      'Film Adaptation','Imagination vs Reality','Science-fiction'],
    grammar: ['Past tenses narrative','Would/Could hypothetical','Relative clauses'],
    specs: {
      llcer: 'Œuvres obligatoires : 1984, Lord of the Flies, Fahrenheit 451',
      general: 'Analyse de documents, extraits littéraires et cinématographiques',
    },
  },
  {
    slug: 'ax6-scientific-innovation',
    num: 6,
    emoji: '🔬',
    titre: 'Scientific Innovation & Responsibility',
    couleur: '#6366f1',
    bg: 'rgba(99,102,241,0.08)',
    border: 'rgba(99,102,241,0.22)',
    nb: 6,
    chapitres: ['Artificial Intelligence','Climate Change & Solutions',
      'Biotechnology & Ethics','Medical Progress','Space Exploration','Green Technology'],
    grammar: ['Passive voice','Future forms','Modals of obligation'],
    specs: {
      sciences: '🔥 Axe très important — textes scientifiques, vocabulaire technique',
      ses: 'Impact économique des innovations, marché vert',
      nsi: 'IA, algorithmes, éthique du numérique',
    },
  },
  {
    slug: 'ax7-diversity-inclusion',
    num: 7,
    emoji: '⚖️',
    titre: 'Diversity & Inclusion',
    couleur: '#f97316',
    bg: 'rgba(249,115,22,0.08)',
    border: 'rgba(249,115,22,0.22)',
    nb: 5,
    chapitres: ['Gender Equality','Minorities & Representation',
      'Social Justice','Discrimination & Law','Inclusive Society'],
    grammar: ['Reported speech','Comparatives','Modals'],
    specs: {
      ses: 'Inégalités sociales, politiques publiques, sociologie',
      general: 'Débats, argumentation, textes engagés',
    },
  },
  {
    slug: 'ax8-territory-memory',
    num: 8,
    emoji: '🏛️',
    titre: 'Territory & Memory',
    couleur: '#84cc16',
    bg: 'rgba(132,204,22,0.08)',
    border: 'rgba(132,204,22,0.22)',
    nb: 6,
    chapitres: ['War Memory & Commemoration','Colonial History',
      'National Identity','Heritage & Preservation','Historical Narratives','Territory & Borders'],
    grammar: ['Past tenses','Passive','Reported speech'],
    specs: {
      llcer: 'Analyse historique approfondie, œuvres sur la mémoire',
      general: 'Analyse de documents historiques et contemporains',
    },
  },
]

export default function AnglaisTerminalePage() {
  return (
    <>
      <Navbar />
      <main style={{ position:'relative', zIndex:1, paddingTop:80 }}>
        <div style={{ borderBottom:'1px solid var(--border)',
          padding:'12px clamp(20px,5vw,60px)',
          display:'flex', gap:8, fontSize:13, color:'var(--muted)',
          alignItems:'center', flexWrap:'wrap' }}>
          <Link href="/bac-france" style={{ color:'var(--muted)', textDecoration:'none' }}>🇫🇷 France</Link><span>›</span>
          <Link href="/bac-france/anglais" style={{ color:'var(--muted)', textDecoration:'none' }}>🇬🇧 Anglais</Link><span>›</span>
          <span style={{ color:'#f43f5e', fontWeight:600 }}>🎓 Terminale</span>
        </div>

        <div className="container" style={{ paddingTop:36, paddingBottom:80 }}>

          {/* Header */}
          <div style={{ marginBottom:44 }}>
            <div style={{ display:'flex', gap:10, alignItems:'center', marginBottom:14, flexWrap:'wrap' }}>
              <span style={{ fontSize:32 }}>🎓</span>
              <span style={{ background:'rgba(244,63,94,0.15)', color:'#fb7185',
                padding:'4px 14px', borderRadius:20, fontSize:12, fontWeight:700 }}>
                🇬🇧 ANGLAIS TERMINALE — 8 AXES
              </span>
              <span style={{ fontSize:11, background:'rgba(244,63,94,0.1)', color:'#fb7185',
                padding:'3px 12px', borderRadius:20, fontWeight:700 }}>
                BAC 2027 · GRAND ORAL
              </span>
            </div>
            <h1 style={{ fontSize:'clamp(24px,4vw,40px)', marginBottom:10 }}>
              🇬🇧 Terminale — Anglais LVA/LVB<br />
              <span style={{ background:'linear-gradient(90deg,#f43f5e,#f59e0b)',
                WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>
                Programme officiel MEN 2026/2027
              </span>
            </h1>
            <p style={{ maxWidth:660, color:'var(--text2)', marginBottom:18, lineHeight:1.7 }}>
              <strong style={{ color:'#fb7185' }}>8 axes thématiques</strong> communs à tous les parcours,
              avec spécificités selon la filière (LLCER, AMC, Sciences, NSI, SES).
              Niveau C1 visé · Épreuve Bac + Grand Oral coef. 8.
            </p>
            {/* Spécialités */}
            <div style={{ background:'rgba(244,63,94,0.06)', border:'1px solid rgba(244,63,94,0.2)',
              borderRadius:12, padding:'12px 18px', marginBottom:18,
              display:'flex', gap:12, flexWrap:'wrap', alignItems:'center' }}>
              <span style={{ fontSize:12, color:'#fb7185', fontWeight:700 }}>Parcours :</span>
              {[
                { l:'📚 LLCER',         c:'#8b5cf6' },
                { l:'🌍 AMC',           c:'#f59e0b' },
                { l:'🔬 Sciences/NSI',  c:'#6366f1' },
                { l:'📊 SES',           c:'#10b981' },
                { l:'🎓 Général',       c:'#06b6d4' },
              ].map(s => (
                <span key={s.l} style={{ fontSize:11, padding:'3px 12px', borderRadius:20,
                  background:`${s.c}14`, color:s.c, fontWeight:700,
                  border:`1px solid ${s.c}25` }}>{s.l}</span>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:14, marginBottom:48 }}>
            {[
              { num:'8',  label:'Axes',          icon:'🎯' },
              { num:'48', label:'Sous-chapitres',icon:'📚' },
              { num:'5',  label:'Parcours',      icon:'🎓' },
              { num:'C1', label:'Niveau visé',   icon:'🏆' },
            ].map(s => (
              <div key={s.label} className="card" style={{ textAlign:'center', padding:18 }}>
                <div style={{ fontSize:20, marginBottom:6 }}>{s.icon}</div>
                <div style={{ fontFamily:'var(--font-display)', fontWeight:700,
                  fontSize:24, color:'#f43f5e' }}>{s.num}</div>
                <div style={{ fontSize:11, color:'var(--muted)' }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Cards axes */}
          <div style={{ display:'grid',
            gridTemplateColumns:'repeat(auto-fill,minmax(320px,1fr))', gap:18, marginBottom:52 }}>
            {AXES.map(ax => (
              <Link key={ax.slug}
                href={`/bac-france/anglais/terminale/${ax.slug}`}
                style={{ textDecoration:'none' }}>
                <div style={{ background:ax.bg, border:`1.5px solid ${ax.border}`,
                  borderRadius:18, padding:'22px 22px', cursor:'pointer',
                  transition:'transform 0.18s, box-shadow 0.18s', height:'100%' }}
                  onMouseEnter={e=>{
                    (e.currentTarget as HTMLElement).style.transform='translateY(-3px)';
                    (e.currentTarget as HTMLElement).style.boxShadow=`0 10px 32px ${ax.couleur}22`
                  }}
                  onMouseLeave={e=>{
                    (e.currentTarget as HTMLElement).style.transform='translateY(0)';
                    (e.currentTarget as HTMLElement).style.boxShadow=''
                  }}>
                  {/* Header */}
                  <div style={{ display:'flex', justifyContent:'space-between',
                    alignItems:'flex-start', marginBottom:14 }}>
                    <div style={{ display:'flex', gap:10, alignItems:'center' }}>
                      <span style={{ fontSize:28 }}>{ax.emoji}</span>
                      <div>
                        <span style={{ fontFamily:'var(--font-mono)', fontSize:10,
                          color:ax.couleur, fontWeight:700, display:'block', marginBottom:2 }}>
                          AXE {ax.num}
                        </span>
                        <h3 style={{ fontSize:14, fontWeight:800, color:ax.couleur, margin:0 }}>
                          {ax.titre}
                        </h3>
                      </div>
                    </div>
                    <span style={{ fontSize:10, color:'var(--muted)' }}>
                      {ax.nb} chapitres
                    </span>
                  </div>

                  {/* Chapitres */}
                  <div style={{ display:'flex', flexWrap:'wrap', gap:5, marginBottom:12 }}>
                    {ax.chapitres.slice(0,4).map(ch => (
                      <span key={ch} style={{ fontSize:10, padding:'2px 8px',
                        borderRadius:10, background:`${ax.couleur}12`,
                        color:'var(--text2)', border:`1px solid ${ax.couleur}18` }}>
                        {ch}
                      </span>
                    ))}
                    {ax.chapitres.length > 4 && (
                      <span style={{ fontSize:10, padding:'2px 8px', borderRadius:10,
                        color:ax.couleur, fontWeight:600 }}>
                        +{ax.chapitres.length-4} autres
                      </span>
                    )}
                  </div>

                  {/* Grammar */}
                  <div style={{ background:`${ax.couleur}08`, border:`1px solid ${ax.couleur}15`,
                    borderRadius:8, padding:'7px 10px', marginBottom:10 }}>
                    <div style={{ fontSize:9, color:ax.couleur, fontWeight:700,
                      textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:4 }}>
                      Grammar
                    </div>
                    <div style={{ display:'flex', flexWrap:'wrap', gap:4 }}>
                      {ax.grammar.map(g => (
                        <span key={g} style={{ fontSize:10, color:'var(--text2)' }}>· {g}</span>
                      ))}
                    </div>
                  </div>

                  <span style={{ display:'inline-flex', alignItems:'center', gap:5,
                    color:ax.couleur, fontWeight:700, fontSize:12 }}>
                    Voir les chapitres →
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* Nav */}
          <div style={{ display:'flex', gap:12, flexWrap:'wrap' }}>
            <Link href="/bac-france/anglais/premiere"
              style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'10px 20px',
                background:'var(--surface)', border:'1px solid var(--border)', borderRadius:12,
                fontWeight:600, fontSize:13, color:'var(--muted)', textDecoration:'none' }}>
              ← Première
            </Link>
            <Link href="/bac-france/anglais"
              style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'10px 20px',
                background:'var(--surface)', border:'1px solid var(--border)', borderRadius:12,
                fontWeight:600, fontSize:13, color:'var(--muted)', textDecoration:'none' }}>
              ↩ Index Anglais
            </Link>
          </div>
        </div>
      </main>
      <Footer />
      <style>{`
        @media(max-width:700px){
          div[style*="repeat(4,1fr)"]{ grid-template-columns:repeat(2,1fr)!important; }
          div[style*="minmax(320px,1fr)"]{ grid-template-columns:1fr!important; }
        }
      `}</style>
    </>
  )
}
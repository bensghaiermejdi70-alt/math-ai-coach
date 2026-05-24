'use client'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

// ══════════════════════════════════════════════════════════════════════
//  ANGLAIS FRANCE — INDEX
//  Route : /bac-france/anglais
//  3 niveaux : Seconde · Première · Terminale
//  Programme officiel MEN 2026/2027
// ══════════════════════════════════════════════════════════════════════

const NIVEAUX = [
  {
    slug: 'seconde',
    icon: '📘',
    label: 'Seconde',
    couleur: '#06b6d4',
    gradient: 'linear-gradient(135deg,rgba(6,182,212,0.14),rgba(14,165,233,0.07))',
    border: 'rgba(6,182,212,0.3)',
    badge: 'Tronc commun · Tous parcours',
    desc: "Programme basé sur les compétences et la culture. Thème global : l'art de vivre ensemble.",
    chapitres: [
      { emoji:'💬', label:'Communication & Interaction',  nb:7 },
      { emoji:'📖', label:'Compréhension écrite',         nb:6 },
      { emoji:'🎧', label:'Compréhension orale',          nb:4 },
      { emoji:'✍️', label:'Expression écrite',            nb:7 },
      { emoji:'📐', label:'Grammaire',                    nb:5 },
      { emoji:'🌍', label:'Vocabulaire & Culture',        nb:5 },
    ],
    skills:['Communiquer','Lire','Écouter','Écrire','Grammaire','Culture anglophone'],
    total: 34,
  },
  {
    slug: 'premiere',
    icon: '📗',
    label: 'Première',
    couleur: '#8b5cf6',
    gradient: 'linear-gradient(135deg,rgba(139,92,246,0.14),rgba(99,102,241,0.07))',
    border: 'rgba(139,92,246,0.3)',
    badge: 'Tronc commun + Spécialités · LLCER · AMC',
    desc: '8 axes thématiques. Analyse, argumentation et autonomie linguistique. Préparation Grand Oral.',
    chapitres: [
      { emoji:'🌍', label:'Identities and Exchanges',           nb:6 },
      { emoji:'📱', label:'Private Sphere & Public Sphere',     nb:7 },
      { emoji:'🎨', label:'Art and Power',                      nb:5 },
      { emoji:'💻', label:'Citizenship & Virtual Worlds',       nb:7 },
      { emoji:'📚', label:'Fictions and Realities',             nb:6 },
      { emoji:'🔬', label:'Scientific Innovation',              nb:5 },
      { emoji:'⚖️', label:'Diversity & Inclusion',              nb:6 },
      { emoji:'🏛️', label:'Territory & Memory',                 nb:4 },
    ],
    skills:['Analyse culturelle','Argumentation','LLCER','AMC','Grand Oral'],
    total: 46,
  },
  {
    slug: 'terminale',
    icon: '🎓',
    label: 'Terminale',
    couleur: '#f43f5e',
    gradient: 'linear-gradient(135deg,rgba(244,63,94,0.14),rgba(245,158,11,0.07))',
    border: 'rgba(244,63,94,0.3)',
    badge: 'Épreuve Bac 2027 · Grand Oral coef. 8',
    desc: '8 axes approfondis. Niveau C1 visé. LLCER et AMC. Épreuve Bac + Grand Oral.',
    chapitres: [
      { emoji:'🌍', label:'Identities and Exchanges',           nb:7 },
      { emoji:'📱', label:'Private Sphere & Public Sphere',     nb:6 },
      { emoji:'🎨', label:'Art and Power',                      nb:7 },
      { emoji:'💻', label:'Citizenship & Virtual Worlds',       nb:6 },
      { emoji:'📚', label:'Fictions and Realities',             nb:5 },
      { emoji:'🔬', label:'Scientific Innovation & Responsibility', nb:6 },
      { emoji:'⚖️', label:'Diversity & Inclusion',              nb:5 },
      { emoji:'🏛️', label:'Territory & Memory',                 nb:6 },
    ],
    skills:['Synthèse','Argumentation avancée','LLCER','AMC','Bac 2027'],
    total: 48,
  },
]

export default function AnglaisFrancePage() {
  return (
    <>
      <Navbar />
      <main style={{ position:'relative', zIndex:1, paddingTop:80 }}>
        <div className="container" style={{ paddingTop:40, paddingBottom:80 }}>

          {/* Breadcrumb */}
          <div style={{ display:'flex', gap:8, alignItems:'center', fontSize:12,
            color:'var(--muted)', marginBottom:24, flexWrap:'wrap' }}>
            <Link href="/bac-france" style={{ color:'var(--muted)', textDecoration:'none' }}>🇫🇷 France</Link>
            <span>›</span>
            <span style={{ color:'#f43f5e' }}>🇬🇧 Anglais</span>
          </div>

          {/* Header */}
          <div style={{ marginBottom:44 }}>
            <span className="label" style={{ marginBottom:12, display:'inline-block' }}>
              🇫🇷 Programme officiel MEN 2026/2027 — Anglais LVA/LVB
            </span>
            <h1 style={{ fontSize:'clamp(26px,4vw,44px)', marginBottom:12 }}>
              🇬🇧 Anglais — Programme France<br />
              <span style={{ background:'linear-gradient(90deg,#f43f5e,#f59e0b)',
                WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>
                Seconde · Première · Terminale
              </span>
            </h1>
            <p style={{ maxWidth:640, color:'var(--text2)', marginBottom:20, lineHeight:1.7 }}>
              Programme officiel MEN basé sur <strong style={{ color:'#fb7185' }}>8 axes thématiques</strong>,
              compétences communicatives et culture anglophone.
              Parcours général, LLCER, AMC, NSI/Sciences/SES.
            </p>
            {/* Spécialités badges */}
            <div style={{ display:'flex', flexWrap:'wrap', gap:6, marginBottom:20 }}>
              {[
                { label:'🎓 Tronc commun', color:'#06b6d4' },
                { label:'📚 LLCER', color:'#8b5cf6' },
                { label:'🌍 AMC', color:'#f59e0b' },
                { label:'🔬 Sciences/NSI', color:'#10b981' },
                { label:'📊 SES', color:'#f43f5e' },
              ].map(s => (
                <span key={s.label} style={{ fontSize:11, padding:'4px 12px', borderRadius:20,
                  background:`${s.color}14`, color:s.color, fontWeight:700,
                  border:`1px solid ${s.color}30` }}>{s.label}</span>
              ))}
            </div>
            <div style={{ display:'flex', gap:10, flexWrap:'wrap' }}>
              <Link href="/bac-france/anglais/terminale"
                style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'10px 22px',
                  borderRadius:11, background:'linear-gradient(135deg,#f43f5e,#f59e0b)',
                  color:'white', fontSize:13, fontWeight:700, textDecoration:'none' }}>
                🎓 Terminale — 8 axes →
              </Link>
              <Link href="/chat" className="btn btn-secondary" style={{ textDecoration:'none' }}>
                🤖 Chat Prof Anglais
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:14, marginBottom:52 }}>
            {[
              { num:'3',   label:'Niveaux',      icon:'📚' },
              { num:'8',   label:'Axes Terminale', icon:'🎯' },
              { num:'128', label:'Chapitres',     icon:'📖' },
              { num:'3',   label:'Spécialités',   icon:'🎓' },
            ].map(s => (
              <div key={s.label} className="card" style={{ textAlign:'center', padding:20 }}>
                <div style={{ fontSize:22, marginBottom:8 }}>{s.icon}</div>
                <div style={{ fontFamily:'var(--font-display)', fontWeight:700,
                  fontSize:26, color:'#f43f5e' }}>{s.num}</div>
                <div style={{ fontSize:12, color:'var(--muted)' }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Cards niveaux */}
          <div style={{ display:'flex', flexDirection:'column', gap:24 }}>
            {NIVEAUX.map(n => (
              <div key={n.slug} style={{ background:n.gradient,
                border:`1.5px solid ${n.border}`, borderRadius:22, padding:'28px 32px' }}>

                {/* Header */}
                <div style={{ display:'flex', justifyContent:'space-between',
                  alignItems:'flex-start', flexWrap:'wrap', gap:16, marginBottom:22 }}>
                  <div style={{ display:'flex', gap:16, alignItems:'center' }}>
                    <span style={{ fontSize:44, flexShrink:0 }}>{n.icon}</span>
                    <div>
                      <div style={{ display:'flex', gap:10, alignItems:'center',
                        flexWrap:'wrap', marginBottom:6 }}>
                        <h2 style={{ fontSize:22, fontWeight:900, margin:0 }}>{n.label}</h2>
                        <span style={{ fontSize:11, padding:'3px 12px', borderRadius:20,
                          background:`${n.couleur}22`, color:n.couleur, fontWeight:700 }}>
                          {n.badge}
                        </span>
                      </div>
                      <p style={{ fontSize:13, color:'var(--text2)', margin:'0 0 10px' }}>{n.desc}</p>
                      <div style={{ display:'flex', gap:12, flexWrap:'wrap', fontSize:12 }}>
                        <span style={{ color:n.couleur, fontWeight:700 }}>
                          📚 {n.total} sous-chapitres
                        </span>
                        <span style={{ color:'var(--muted)' }}>·</span>
                        {n.skills.slice(0,3).map(sk => (
                          <span key={sk} style={{ color:'var(--muted)' }}>✓ {sk}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <Link href={`/bac-france/anglais/${n.slug}`}
                    style={{ display:'inline-flex', alignItems:'center', gap:6,
                      padding:'9px 20px', borderRadius:10,
                      background:`linear-gradient(135deg,${n.couleur},${n.couleur}cc)`,
                      color:'white', fontWeight:700, fontSize:13, textDecoration:'none',
                      flexShrink:0 }}>
                    Voir les axes →
                  </Link>
                </div>

                {/* Grille chapitres */}
                <div style={{ display:'grid',
                  gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))', gap:8 }}>
                  {n.chapitres.map(ch => (
                    <div key={ch.label} style={{ background:'rgba(0,0,0,0.14)',
                      borderRadius:12, padding:'10px 14px' }}>
                      <div style={{ fontSize:10, color:n.couleur, fontWeight:700,
                        marginBottom:5 }}>{ch.emoji} {ch.label}</div>
                      <div style={{ fontSize:11, color:'var(--muted)' }}>
                        {ch.nb} sous-chapitres
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div style={{ marginTop:48, background:'linear-gradient(135deg,rgba(244,63,94,0.1),rgba(245,158,11,0.06))',
            border:'1px solid rgba(244,63,94,0.2)', borderRadius:18, padding:'22px 28px',
            display:'flex', justifyContent:'space-between', alignItems:'center',
            flexWrap:'wrap', gap:16 }}>
            <div>
              <div style={{ fontFamily:'var(--font-mono)', fontSize:11, color:'#fb7185',
                textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:6 }}>
                🤖 IA · Anglais France
              </div>
              <h3 style={{ fontSize:17, marginBottom:4 }}>Prof IA Anglais — Essay, Speaking, Grammar</h3>
              <p style={{ fontSize:13, color:'var(--text2)', margin:0 }}>
                Correction essays · Grand Oral · Axes thématiques · Simulation Bac
              </p>
            </div>
            <div style={{ display:'flex', gap:10 }}>
              <Link href="/solve?subject=anglais" className="btn btn-primary"
                style={{ whiteSpace:'nowrap', textDecoration:'none' }}>
                🇬🇧 Chat Prof Anglais
              </Link>
              <Link href="/bac-france/anglais/terminale" className="btn btn-secondary"
                style={{ whiteSpace:'nowrap', textDecoration:'none' }}>
                📚 Terminale Bac 2027
              </Link>
            </div>
          </div>

          <div style={{ textAlign:'center', paddingTop:28,
            borderTop:'1px solid var(--border)', marginTop:40 }}>
            <Link href="/bac-france" style={{ display:'inline-flex', alignItems:'center', gap:8,
              padding:'10px 22px', borderRadius:12, border:'1px solid var(--border)',
              background:'var(--surface)', color:'var(--muted)', fontSize:13,
              fontWeight:600, textDecoration:'none' }}>
              ← Toutes les matières France
            </Link>
          </div>
        </div>
      </main>
      <Footer />
      <style>{`
        @media(max-width:700px){
          div[style*="repeat(4,1fr)"]{ grid-template-columns:repeat(2,1fr)!important; }
        }
      `}</style>
    </>
  )
}
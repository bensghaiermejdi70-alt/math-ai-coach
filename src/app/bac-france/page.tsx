'use client'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

// ══════════════════════════════════════════════════════════════════════
// PROGRAMME FRANCE — Page index avec choix Maths / Physique-Chimie
// Route : /bac-france
// ══════════════════════════════════════════════════════════════════════

const MATIERES = [
  {
    slug: 'maths',
    icon: '🧮',
    titre: 'Mathématiques',
    desc: 'Première Spé · Terminale Générale · Maths Expertes · Terminale Techno',
    couleur: '#f59e0b',
    gradient: 'linear-gradient(135deg,rgba(245,158,11,0.14),rgba(249,115,22,0.07))',
    border: 'rgba(245,158,11,0.3)',
    badge: '4 voies · 41 chapitres',
    badgeColor: '#fbbf24',
    stats: [
      { val: '4', label: 'voies' },
      { val: '41', label: 'chapitres' },
      { val: '367+', label: 'théorèmes' },
      { val: '325+', label: 'exercices' },
    ],
    href: '/bac-france/maths',
  },
  {
    slug: 'physique',
    icon: '⚛️',
    titre: 'Physique-Chimie',
    desc: 'Seconde · Première Spé · Terminale Générale · STI2D · ST2S · STL',
    couleur: '#06b6d4',
    gradient: 'linear-gradient(135deg,rgba(6,182,212,0.14),rgba(14,165,233,0.07))',
    border: 'rgba(6,182,212,0.3)',
    badge: '5 voies · Programme officiel 2026',
    badgeColor: '#22d3ee',
    stats: [
      { val: '5', label: 'voies' },
      { val: '48', label: 'chapitres' },
      { val: '420+', label: 'formules' },
      { val: '380+', label: 'exercices' },
    ],
    href: '/bac-france/physique',
    isNew: true,
  },
]

export default function BacFrancePage() {
  return (
    <>
      <Navbar />
      <main style={{ position: 'relative', zIndex: 1, paddingTop: 80 }}>
        <div className="container" style={{ paddingTop: 40, paddingBottom: 80 }}>

          {/* HEADER */}
          <div style={{ marginBottom: 40 }}>
            <span className="label" style={{ marginBottom: 12, display: 'inline-block' }}>🇫🇷 Éducation Nationale France · Lycée</span>
            <h1 style={{ fontSize: 'clamp(28px,4vw,48px)', marginBottom: 14 }}>
              Programme France<br />
              <span style={{ background: 'linear-gradient(90deg,#f59e0b,#06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Mathématiques & Physique-Chimie
              </span>
            </h1>
            <p style={{ maxWidth: 600, color: 'var(--text2)', fontSize: 14, lineHeight: 1.7, marginBottom: 20 }}>
              Programmes officiels MEN 2026 · Première & Terminale Générale · Voies Technologiques.
              Cours, théorèmes, formules, exercices corrigés et IA professeur.
            </p>
          </div>

          {/* CHOIX MATIÈRE */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 48 }}>
            {MATIERES.map(m => (
              <Link key={m.slug} href={m.href} style={{ textDecoration: 'none' }}>
                <div
                  style={{ background: m.gradient, border: `1px solid ${m.border}`, borderRadius: 22, padding: '32px 28px', transition: 'transform 0.2s, box-shadow 0.2s', cursor: 'pointer', position: 'relative', minHeight: 240 }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = `0 16px 48px ${m.couleur}25` }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '' }}
                >
                  {/* Badge Nouveau */}
                  {m.isNew && (
                    <div style={{ position: 'absolute', top: 16, right: 16, background: 'linear-gradient(135deg,#06b6d4,#0ea5e9)', color: 'white', fontSize: 10, fontWeight: 800, padding: '4px 12px', borderRadius: 20, letterSpacing: '0.08em' }}>
                      🆕 NOUVEAU
                    </div>
                  )}

                  {/* Icon + Titre */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
                    <div style={{ width: 60, height: 60, borderRadius: 16, background: `${m.couleur}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 30, flexShrink: 0 }}>
                      {m.icon}
                    </div>
                    <div>
                      <h2 style={{ fontSize: 22, fontWeight: 900, color: 'var(--text)', margin: '0 0 4px' }}>{m.titre}</h2>
                      <span style={{ fontSize: 11, padding: '3px 10px', borderRadius: 20, background: `${m.couleur}22`, color: m.badgeColor, fontWeight: 700 }}>{m.badge}</span>
                    </div>
                  </div>

                  <p style={{ fontSize: 13, color: 'var(--text2)', marginBottom: 20, lineHeight: 1.6 }}>{m.desc}</p>

                  {/* Stats */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 10, marginBottom: 20 }}>
                    {m.stats.map(s => (
                      <div key={s.label} style={{ textAlign: 'center', background: 'rgba(0,0,0,0.15)', borderRadius: 10, padding: '10px 6px' }}>
                        <div style={{ fontSize: 18, fontWeight: 900, color: m.couleur }}>{s.val}</div>
                        <div style={{ fontSize: 10, color: 'var(--muted)' }}>{s.label}</div>
                      </div>
                    ))}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                    <span style={{ color: m.couleur, fontWeight: 800, fontSize: 15 }}>Accéder au programme →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* CTA IA */}
          <div style={{ background: 'linear-gradient(135deg,rgba(79,110,247,0.1),rgba(124,58,237,0.06))', border: '1px solid rgba(79,110,247,0.2)', borderRadius: 18, padding: '24px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#818cf8', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6 }}>🤖 IA · Maths & Physique France</div>
              <h3 style={{ fontSize: 17, marginBottom: 4 }}>Prof IA — Pose toutes tes questions</h3>
              <p style={{ fontSize: 13, color: 'var(--text2)', margin: 0 }}>Solveur, simulation d'examen, chat professeur pour toutes les matières</p>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <Link href="/chat" className="btn btn-primary" style={{ whiteSpace: 'nowrap' }}>🤖 Chat Prof IA</Link>
              <Link href="/simulation-france" className="btn btn-secondary" style={{ whiteSpace: 'nowrap' }}>🎯 Simulation France</Link>
            </div>
          </div>

        </div>
      </main>
      <Footer />
      <style suppressHydrationWarning>{`
        @media(max-width:700px){
          div[style*="1fr 1fr"]{ grid-template-columns:1fr!important }
        }
      `}</style>
    </>
  )
}
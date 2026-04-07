'use client'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

// ═══════════════════════════════════════════════════════════════════
// MATHÉMATIQUES — Section Informatique (Bac Tunisie)
// Programme officiel CNP — source : tadris.tn
// Tome I : 5 chapitres | Tome II : 3 chapitres
// ═══════════════════════════════════════════════════════════════════

const MATHS = {
  id: 'mathematiques',
  icon: '📐',
  titre: 'Mathématiques',
  desc: 'Suites, limites, dérivabilité, log & exp, calcul intégral, complexes, probabilités, statistiques. Programme officiel CNP — source : tadris.tn',
  color: '#8b5cf6',
  tomes: [
    {
      label: '📗 Tome I — Analyse',
      chapitres: [
        { ch: 'CH 01', slug: 'suites',             titre: 'Suites réelles',                          nbThm: 12, nbEx: 8  },
        { ch: 'CH 02', slug: 'limite-continuite',   titre: 'Limite et continuité',                    nbThm: 14, nbEx: 10 },
        { ch: 'CH 03', slug: 'derivabilite',        titre: 'Dérivabilité & étude de fonctions',       nbThm: 11, nbEx: 8  },
        { ch: 'CH 04', slug: 'log-exp',             titre: 'Fonctions logarithme et exponentielle',   nbThm: 10, nbEx: 7  },
        { ch: 'CH 05', slug: 'calcul-integral',     titre: 'Calcul intégral & primitives',            nbThm: 9,  nbEx: 7  },
      ],
    },
    {
      label: '📘 Tome II — Algèbre & Probabilités',
      chapitres: [
        { ch: 'CH 06', slug: 'complexes',     titre: 'Nombres complexes',               nbThm: 12, nbEx: 8 },
        { ch: 'CH 07', slug: 'probabilites',  titre: 'Probabilités sur un ensemble fini', nbThm: 9,  nbEx: 6 },
        { ch: 'CH 08', slug: 'statistiques',  titre: 'Statistiques',                    nbThm: 7,  nbEx: 5 },
      ],
    },
  ],
}

const ALL_CHAPITRES = MATHS.tomes.flatMap(t => t.chapitres)
const totalThm = ALL_CHAPITRES.reduce((s, c) => s + c.nbThm, 0)
const totalEx  = ALL_CHAPITRES.reduce((s, c) => s + c.nbEx,  0)

function ChapitreCard({ ch, color }: { ch: typeof ALL_CHAPITRES[0]; color: string }) {
  return (
    <Link href={`/bac/informatique/${ch.slug}`} style={{ textDecoration: 'none' }}>
      <div
        className="card"
        style={{ padding: 18, transition: 'transform 0.2s, box-shadow 0.2s', cursor: 'pointer' }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = 'translateY(-3px)'
          e.currentTarget.style.boxShadow = `0 8px 28px ${color}22`
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = 'translateY(0)'
          e.currentTarget.style.boxShadow = ''
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--muted)', background: 'var(--surface2)', padding: '2px 7px', borderRadius: 6 }}>
            {ch.ch}
          </span>
          <span style={{ fontSize: 11, color: 'var(--muted)' }}>{ch.nbThm} concepts</span>
        </div>

        <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', marginBottom: 12, lineHeight: 1.4 }}>
          {ch.titre}
        </div>

        <div style={{ marginBottom: 10 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: 'var(--muted)', marginBottom: 4 }}>
            <span>Progression</span><span>0%</span>
          </div>
          <div style={{ height: 3, background: 'var(--surface2)', borderRadius: 4 }}>
            <div style={{ height: '100%', width: '0%', background: `linear-gradient(90deg,${color},#f97316)`, borderRadius: 4 }} />
          </div>
          <div style={{ fontSize: 10, color: 'var(--muted)', marginTop: 3 }}>0 / {ch.nbEx} exercices</div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: 4 }}>
            {['Déf', 'Thm', 'Ex'].map(l => (
              <span key={l} style={{
                fontSize: 10, padding: '2px 6px', borderRadius: 8,
                background: l === 'Déf' ? 'rgba(79,110,247,0.15)' : l === 'Thm' ? `${color}20` : 'rgba(6,214,160,0.12)',
                color:      l === 'Déf' ? '#4f6ef7'               : l === 'Thm' ? color          : '#06d6a0',
              }}>{l}</span>
            ))}
          </div>
          <span style={{ fontSize: 12, color: color, fontWeight: 600 }}>Ouvrir →</span>
        </div>
      </div>
    </Link>
  )
}

export default function InformatiquePage() {
  return (
    <>
      <Navbar />
      <main style={{ position: 'relative', zIndex: 1, paddingTop: 80 }}>

        {/* Breadcrumb */}
        <div style={{ borderBottom: '1px solid var(--border)', padding: '14px clamp(20px,5vw,60px)', display: 'flex', gap: 8, fontSize: 13, color: 'var(--muted)', alignItems: 'center' }}>
          <Link href="/bac" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Bac</Link>
          <span>›</span>
          <span style={{ color: 'var(--text)' }}>Sciences Informatiques</span>
        </div>

        <div className="container" style={{ paddingTop: 40, paddingBottom: 80 }}>

          {/* HEADER */}
          <div style={{ marginBottom: 48 }}>
            <span style={{ background: 'rgba(99,102,241,0.15)', color: '#6366f1', padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 700, marginBottom: 12, display: 'inline-block' }}>
              Coefficient 3
            </span>
            <h1 style={{ fontSize: 'clamp(28px,4vw,44px)', marginBottom: 12 }}>
              💻 Sciences Informatiques — Mathématiques
            </h1>
            <p style={{ maxWidth: 680, color: 'var(--text2)', marginBottom: 20, lineHeight: 1.7 }}>
              Programme officiel CNP Tunisie — 4ème année secondaire.
              Tous les chapitres de <strong style={{ color: '#8b5cf6' }}>Mathématiques</strong> de la section Informatique,
              avec théorèmes, définitions, formules et exercices type Bac 2026.
              Source : <span style={{ color: '#8b5cf6', fontFamily: 'var(--font-mono)', fontSize: 13 }}>tadris.tn</span>
            </p>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', fontSize: 13, color: 'var(--muted)' }}>
              <span>📚 2 tomes</span><span>·</span>
              <span>📖 {ALL_CHAPITRES.length} chapitres</span><span>·</span>
              <span>📊 {totalThm}+ concepts</span><span>·</span>
              <span>📝 {totalEx}+ exercices</span>
            </div>
          </div>

          {/* TOMES */}
          {MATHS.tomes.map((tome, ti) => {
            const tomeTotalThm = tome.chapitres.reduce((s, c) => s + c.nbThm, 0)
            const tomeTotalEx  = tome.chapitres.reduce((s, c) => s + c.nbEx,  0)
            return (
              <div key={ti} style={{ marginBottom: 52 }}>

                {/* Bannière tome */}
                <div style={{
                  background: `linear-gradient(135deg,${MATHS.color}18,${MATHS.color}06)`,
                  border: `1px solid ${MATHS.color}30`,
                  borderRadius: 16, padding: '20px 28px', marginBottom: 24,
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12,
                }}>
                  <div>
                    <h2 style={{ fontSize: 22, marginBottom: 4 }}>{tome.label}</h2>
                    <p style={{ fontSize: 13, color: 'var(--text2)', margin: 0 }}>
                      {ti === 0
                        ? 'Suites · Limite & continuité · Dérivabilité · Logarithme & Exponentielle · Calcul intégral'
                        : 'Nombres complexes · Probabilités · Statistiques'}
                    </p>
                  </div>
                  <div style={{ display: 'flex', gap: 10 }}>
                    <span style={{ background: `${MATHS.color}22`, color: MATHS.color, padding: '5px 13px', borderRadius: 20, fontSize: 12, fontFamily: 'var(--font-mono)' }}>
                      {tome.chapitres.length} ch.
                    </span>
                    <span style={{ background: 'var(--surface2)', color: 'var(--muted)', padding: '5px 13px', borderRadius: 20, fontSize: 12 }}>
                      {tomeTotalThm} concepts · {tomeTotalEx} ex.
                    </span>
                  </div>
                </div>

                {/* Grille chapitres */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: 14 }}>
                  {tome.chapitres.map(ch => (
                    <ChapitreCard key={ch.slug} ch={ch} color={MATHS.color} />
                  ))}
                </div>
              </div>
            )
          })}

          {/* Navigation inter-sections */}
          <div style={{ borderTop: '1px solid var(--border)', paddingTop: 32, marginTop: 8 }}>
            <p style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 16 }}>Autres sections</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))', gap: 14 }}>
              {[
                { href: '/bac/maths',         icon: '🧮', titre: 'Mathématiques',       sous: '9 chapitres · Coeff 4' },
                { href: '/bac/sciences-exp',  icon: '🔬', titre: 'Sciences Exp.',        sous: '10 chapitres · Coeff 3' },
                { href: '/bac/sciences-tech', icon: '⚙️', titre: 'Sciences Tech.',       sous: '10 chapitres · Coeff 3' },
                { href: '/bac/eco-gestion',   icon: '💹', titre: 'Éco-Gestion',          sous: '13 chapitres · Coeff 2' },
              ].map(s => (
                <Link key={s.href} href={s.href} style={{ textDecoration: 'none' }}>
                  <div
                    className="card"
                    style={{ padding: 18, display: 'flex', gap: 12, alignItems: 'center', transition: 'transform 0.2s' }}
                    onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-2px)')}
                    onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}
                  >
                    <div style={{ fontSize: 26 }}>{s.icon}</div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 14 }}>{s.titre}</div>
                      <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 2 }}>{s.sous}</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </>
  )
}

'use client'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

// ══════════════════════════════════════════════════════════════════════
// PROGRAMME FRANCE — Page index
// Route : /bac-france
// Sections : Première Spé Maths · Terminale Générale · Terminale Technologique
// ══════════════════════════════════════════════════════════════════════

const SECTIONS = [
  {
    slug: 'premiere',
    icon: '📗',
    titre: 'Première — Spécialité Mathématiques',
    niveau: 'Lycée · Classe de Première',
    annee: '2026–2027',
    couleur: '#4f6ef7',
    gradient: 'linear-gradient(135deg,rgba(79,110,247,0.16),rgba(124,58,237,0.08))',
    border: 'rgba(79,110,247,0.3)',
    badgeColor: '#818cf8',
    badge: 'Spécialité · 4h/semaine',
    sections: [
      { label: '📐 Section 1 — Algèbre',        items: ['Suites numériques', 'Second degré'] },
      { label: '📈 Section 2 — Analyse',         items: ['Dérivation', 'Fonction exponentielle', 'Fonctions trigonométriques'] },
      { label: '📏 Section 3 — Géométrie',       items: ['Produit scalaire', 'Géométrie repérée'] },
      { label: '🎲 Section 4 — Probabilités',    items: ['Probabilités conditionnelles', 'Variables aléatoires'] },
      { label: '💻 Section 5 — Algorithmique',   items: ['Python et algorithmes'] },
    ],
    nbCh: 10, nbThm: 95, nbEx: 90,
  },
  {
    slug: 'terminale-generale',
    icon: '🎓',
    titre: 'Terminale Générale — Spécialité Maths',
    niveau: 'Lycée · Classe de Terminale · Année du Bac',
    annee: '2027 (Bac)',
    couleur: '#f59e0b',
    gradient: 'linear-gradient(135deg,rgba(245,158,11,0.16),rgba(249,115,22,0.08))',
    border: 'rgba(245,158,11,0.3)',
    badgeColor: '#fbbf24',
    badge: 'Bac 2027 · Coef. 16',
    sections: [
      { label: '🧮 Section 1 — Algèbre & Géo.',  items: ['Suites (limites)', 'Nombres complexes'] },
      { label: '📈 Section 2 — Analyse',          items: ['Limites & Continuité', 'Dérivation avancée', 'Logarithme népérien', 'Intégration', 'Équations différentielles'] },
      { label: '🌐 Section 3 — Géo. espace',      items: ['Vecteurs 3D', 'Droites & Plans'] },
      { label: '🎲 Section 4 — Probas & Stats',   items: ['Loi normale', 'Loi binomiale', 'Échantillonnage'] },
      { label: '💻 Section 5 — Algorithmique',    items: ['Python avancé (récursivité, matrices)'] },
    ],
    nbCh: 13, nbThm: 130, nbEx: 110,
  },
  {
    slug: 'terminale-expertes',
    icon: '⭐',
    titre: 'Terminale — Option Maths Expertes',
    niveau: 'Option Terminale · 3h/semaine',
    annee: '2027',
    couleur: '#8b5cf6',
    gradient: 'linear-gradient(135deg,rgba(139,92,246,0.16),rgba(99,102,241,0.08))',
    border: 'rgba(139,92,246,0.3)',
    badgeColor: '#a78bfa',
    badge: 'Option · Coef. 2 CC',
    sections: [
      { label: 'A — Arithmétique',               items: ['Divisibilité dans ℤ', 'PGCD & Bézout', 'Nombres premiers'] },
      { label: 'B — Complexes (approfond.)',      items: ['Formes trig. & expo.', 'Équations polynomiales dans ℂ'] },
      { label: 'C — Graphes & Matrices',         items: ['Théorie des graphes', 'Calcul matriciel', 'Chaînes de Markov'] },
    ],
    nbCh: 8, nbThm: 72, nbEx: 60,
  },
  {
    slug: 'terminale-techno',
    icon: '⚙️',
    titre: 'Terminale Technologique',
    niveau: 'STMG · STI2D · STL · ST2S',
    annee: '2027',
    couleur: '#10b981',
    gradient: 'linear-gradient(135deg,rgba(16,185,129,0.14),rgba(5,150,105,0.07))',
    border: 'rgba(16,185,129,0.3)',
    badgeColor: '#34d399',
    badge: 'Tronc commun · toutes séries',
    sections: [
      { label: 'STMG — Analyse',                 items: ['Fonctions', 'Suites', 'Calculs financiers'] },
      { label: 'STMG — Probas & Stats',          items: ['Statistiques 2 variables', 'Proba conditionnelles', 'Loi binomiale'] },
      { label: 'STI2D/STL — Analyse',            items: ['Exp. & Logarithme', 'Intégration', 'Éq. différentielles'] },
    ],
    nbCh: 10, nbThm: 70, nbEx: 65,
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
              <span style={{ background: 'linear-gradient(90deg,#f59e0b,#f97316)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Première & Terminale
              </span>
            </h1>
            <p style={{ maxWidth: 600, color: 'var(--text2)', fontSize: 14, lineHeight: 1.7, marginBottom: 20 }}>
              Programmes officiels MEN · Première Spécialité (2026-2027) · Terminale Générale Bac 2027 ·
              Option Maths Expertes · Terminale Technologique. Théorèmes, définitions, formules et exercices.
            </p>
            <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', fontSize: 13, color: 'var(--muted)' }}>
              <span>🏫 4 voies</span><span>·</span>
              <span>📚 41 chapitres</span><span>·</span>
              <span>📊 367+ théorèmes</span><span>·</span>
              <span>📝 325+ exercices</span>
            </div>
          </div>

          {/* BADGE */}
          <div style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.28)', borderRadius: 14, padding: '14px 20px', marginBottom: 40, display: 'flex', gap: 12, alignItems: 'flex-start', flexWrap: 'wrap' }}>
            <span style={{ fontSize: 20 }}>🆕</span>
            <div>
              <div style={{ fontWeight: 700, fontSize: 13, color: '#fbbf24', marginBottom: 6 }}>Nouveautés 2026/2027</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
                {[
                  'Première 2026 : Épreuve anticipée maths coef. 2',
                  'Terminale 2027 : Grand Oral coef. 8 (au lieu de 10)',
                  'STMG 2026 : Épreuve anticipée en fin de Première',
                  'Bac général : Spécialité Maths coef. 16',
                ].map(n => (
                  <span key={n} style={{ fontSize: 11, background: 'rgba(245,158,11,0.1)', color: '#fbbf24', padding: '3px 10px', borderRadius: 20, border: '1px solid rgba(245,158,11,0.22)' }}>
                    🔴 {n}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* SECTIONS */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {SECTIONS.map(s => (
              <Link key={s.slug} href={`/bac-france/${s.slug}`} style={{ textDecoration: 'none' }}>
                <div style={{ background: s.gradient, border: `1px solid ${s.border}`, borderRadius: 20, padding: '24px 28px', transition: 'transform 0.2s, box-shadow 0.2s', cursor: 'pointer' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = `0 12px 40px ${s.couleur}22` }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '' }}>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16, marginBottom: 20 }}>
                    <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                      <span style={{ fontSize: 36, flexShrink: 0 }}>{s.icon}</span>
                      <div>
                        <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap', marginBottom: 5 }}>
                          <h2 style={{ fontSize: 19, fontWeight: 800, color: 'var(--text)', margin: 0 }}>{s.titre}</h2>
                          <span style={{ fontSize: 11, padding: '3px 10px', borderRadius: 20, background: `${s.couleur}22`, color: s.badgeColor, fontWeight: 700 }}>{s.badge}</span>
                        </div>
                        <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 8 }}>{s.niveau} · {s.annee}</div>
                        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', fontSize: 12 }}>
                          <span style={{ color: s.couleur, fontWeight: 600 }}>📚 {s.nbCh} chapitres</span>
                          <span style={{ color: 'var(--muted)' }}>·</span>
                          <span style={{ color: 'var(--muted)' }}>📊 {s.nbThm}+ théorèmes</span>
                          <span style={{ color: 'var(--muted)' }}>·</span>
                          <span style={{ color: 'var(--muted)' }}>📝 {s.nbEx}+ exercices</span>
                        </div>
                      </div>
                    </div>
                    <span style={{ color: s.couleur, fontWeight: 700, fontSize: 15, flexShrink: 0 }}>Ouvrir →</span>
                  </div>

                  {/* Aperçu sections */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 10 }}>
                    {s.sections.map(sec => (
                      <div key={sec.label} style={{ background: 'rgba(0,0,0,0.13)', borderRadius: 10, padding: '10px 14px' }}>
                        <div style={{ fontWeight: 700, fontSize: 11, color: s.couleur, marginBottom: 6 }}>{sec.label}</div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                          {sec.items.map(it => (
                            <span key={it} style={{ fontSize: 10, padding: '2px 7px', borderRadius: 8, background: `${s.couleur}18`, color: 'var(--text2)', border: `1px solid ${s.couleur}18` }}>{it}</span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* CTA IA */}
          <div style={{ marginTop: 48, background: 'linear-gradient(135deg,rgba(79,110,247,0.1),rgba(124,58,237,0.06))', border: '1px solid rgba(79,110,247,0.2)', borderRadius: 18, padding: '24px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#818cf8', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6 }}>🤖 IA · Tous niveaux</div>
              <h3 style={{ fontSize: 17, marginBottom: 4 }}>Prof IA — Maths France Lycée</h3>
              <p style={{ fontSize: 13, color: 'var(--text2)', margin: 0 }}>Pose une question sur n'importe quel chapitre de Première ou Terminale</p>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <Link href="/chat" className="btn btn-primary" style={{ whiteSpace: 'nowrap' }}>🤖 Chat Prof IA</Link>
              <Link href="/simulation" className="btn btn-secondary" style={{ whiteSpace: 'nowrap' }}>🎯 Simulation Bac</Link>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </>
  )
}

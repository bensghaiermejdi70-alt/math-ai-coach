'use client'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

// ══════════════════════════════════════════════════════════════════════
// SVT FRANCE — Page index
// Route : /bac-france/svt
// Matière : Sciences de la Vie et de la Terre
// 3 niveaux : Seconde (commune) · Première Spé · Terminale Spé
// ══════════════════════════════════════════════════════════════════════

const SECTIONS = [
  {
    slug: 'seconde',
    icon: '📘',
    titre: 'Seconde Générale & Technologique',
    niveau: 'Lycée · Classe de Seconde · Enseignement commun',
    annee: '2026–2027',
    couleur: '#22c55e',
    gradient: 'linear-gradient(135deg,rgba(34,197,94,0.14),rgba(16,185,129,0.07))',
    border: 'rgba(34,197,94,0.3)',
    badgeColor: '#86efac',
    badge: 'Enseignement commun · 1h30/semaine',
    sections: [
      { label: '🔬 La Terre, la vie & le vivant', items: ['Cellules animales et végétales','Métabolisme cellulaire','Biodiversité & évolution','Communication intraspécifique'] },
      { label: '🌍 Enjeux contemporains',          items: ['Géosciences & paysages','Érosion & activité humaine','Agrosystèmes & développement durable'] },
      { label: '🏥 Corps humain & santé',          items: ['Fécondation & puberté','Hormones & procréation','Cerveau & sexualité','Agents pathogènes & microbiote'] },
    ],
    nbCh: 9, nbFormules: 0, nbEx: 45,
  },
  {
    slug: 'premiere',
    icon: '📗',
    titre: 'Première Générale — Spécialité SVT',
    niveau: 'Lycée · Classe de Première',
    annee: '2026–2027',
    couleur: '#0891b2',
    gradient: 'linear-gradient(135deg,rgba(8,145,178,0.14),rgba(6,182,212,0.07))',
    border: 'rgba(8,145,178,0.3)',
    badgeColor: '#22d3ee',
    badge: 'Spécialité · 4h/semaine',
    sections: [
      { label: '🔬 La Terre, la vie & le vivant',  items: ['ADN & expression génétique','Réplication & mitose','Mutations','Tectonique des plaques','Écosystèmes & biodiversité'] },
      { label: '🌍 Enjeux contemporains',           items: ['Écosystèmes & activité humaine','Ressources naturelles','Développement durable'] },
      { label: '🏥 Corps humain & santé',           items: ['Système immunitaire','Vaccination','Variations génétiques & cancer','Système nerveux & plasticité'] },
    ],
    nbCh: 10, nbFormules: 0, nbEx: 65,
  },
  {
    slug: 'terminale',
    icon: '🎓',
    titre: 'Terminale Générale — Spécialité SVT',
    niveau: 'Lycée · Classe de Terminale · Année du Bac',
    annee: '2027 (Bac)',
    couleur: '#f59e0b',
    gradient: 'linear-gradient(135deg,rgba(245,158,11,0.14),rgba(249,115,22,0.07))',
    border: 'rgba(245,158,11,0.3)',
    badgeColor: '#fbbf24',
    badge: 'Bac 2027 · Coef. 16 · 6h/semaine',
    sections: [
      { label: '🧬 Génétique & Évolution',          items: ['Méiose & brassage génétique','Complexification des génomes','Hardy-Weinberg','Temps géologique','Tectonique & montagnes'] },
      { label: '🌱 Plantes & Climat',               items: ['Organisation végétale','Photosynthèse & biomasse','Reproduction des plantes','Domestication','Paléoclimats','Réchauffement climatique'] },
      { label: '🧠 Corps humain & santé',           items: ['Réflexes & arc réflexe','Cerveau & plasticité','Contraction musculaire','ATP & respiration','Glycémie & diabète','Comportement & stress'] },
    ],
    nbCh: 14, nbFormules: 0, nbEx: 80,
    isBac: true,
  },
]

export default function SVTIndexPage() {
  return (
    <>
      <Navbar />
      <main style={{ position: 'relative', zIndex: 1, paddingTop: 80 }}>
        <div className="container" style={{ paddingTop: 40, paddingBottom: 80 }}>

          {/* Fil d'Ariane */}
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 12, color: 'var(--muted)', marginBottom: 24 }}>
            <Link href="/bac-france" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇫🇷 France</Link>
            <span>›</span>
            <span style={{ color: '#22c55e' }}>SVT</span>
          </div>

          {/* HEADER */}
          <div style={{ marginBottom: 40 }}>
            <span className="label" style={{ marginBottom: 12, display: 'inline-block' }}>🌱 Programme Officiel MEN · 2026</span>
            <h1 style={{ fontSize: 'clamp(28px,4vw,48px)', marginBottom: 14 }}>
              SVT — Sciences de la Vie et de la Terre<br />
              <span style={{ background: 'linear-gradient(90deg,#22c55e,#0891b2,#f59e0b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Seconde · Première · Terminale
              </span>
            </h1>
            <p style={{ maxWidth: 640, color: 'var(--text2)', fontSize: 14, lineHeight: 1.7, marginBottom: 20 }}>
              Programmes officiels Éducation Nationale · Voie Générale.
              Cours, notions clés, schémas et exercices corrigés avec IA professeur pour toutes les classes.
            </p>
            <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', fontSize: 13, color: 'var(--muted)' }}>
              <span>🌱 3 niveaux</span><span>·</span>
              <span>📚 33 chapitres</span><span>·</span>
              <span>📊 210+ notions</span><span>·</span>
              <span>📝 190+ exercices</span>
            </div>
          </div>

          {/* BADGE NOUVEAUTÉS */}
          <div style={{ background: 'rgba(245,158,11,0.07)', border: '1px solid rgba(245,158,11,0.25)', borderRadius: 14, padding: '14px 20px', marginBottom: 40, display: 'flex', gap: 12, alignItems: 'flex-start', flexWrap: 'wrap' }}>
            <span style={{ fontSize: 20 }}>🆕</span>
            <div>
              <div style={{ fontWeight: 700, fontSize: 13, color: '#4ade80', marginBottom: 6 }}>Programme en vigueur — Bac 2026/2027</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
                {[
                  'Terminale : Épreuve spécialité SVT · 3h30 + ECE (1h)',
                  'Coefficient 16 pour la spécialité SVT',
                  'Première : Épreuve anticipée incluse au Bac',
                  'ECE : Épreuve de Capacités Expérimentales obligatoire',
                ].map(n => (
                  <span key={n} style={{ fontSize: 11, background: 'rgba(34,197,94,0.1)', color: '#fbbf24', padding: '3px 10px', borderRadius: 20, border: '1px solid rgba(245,158,11,0.22)' }}>
                    🟢 {n}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* SECTIONS */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {SECTIONS.map(s => (
              <Link key={s.slug} href={`/bac-france/svt/${s.slug}`} style={{ textDecoration: 'none' }}>
                <div
                  style={{ background: s.gradient, border: `1px solid ${(s as any).isBac ? s.couleur+'80' : s.border}`, borderRadius: 20, padding: '24px 28px', transition: 'transform 0.2s, box-shadow 0.2s', cursor: 'pointer' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = `0 12px 40px ${s.couleur}22` }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '' }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16, marginBottom: 20 }}>
                    <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                      <span style={{ fontSize: 36, flexShrink: 0 }}>{s.icon}</span>
                      <div>
                        <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap', marginBottom: 5 }}>
                          <h2 style={{ fontSize: 19, fontWeight: 800, color: 'var(--text)', margin: 0 }}>{s.titre}</h2>
                          <span style={{ fontSize: 11, padding: '3px 10px', borderRadius: 20, background: `${s.couleur}22`, color: s.badgeColor, fontWeight: 700 }}>{s.badge}</span>
                          {(s as any).isBac && <span style={{ fontSize: 11, padding: '3px 10px', borderRadius: 20, background: 'rgba(245,158,11,0.25)', color: '#fbbf24', fontWeight: 800 }}>⭐ BAC</span>}
                        </div>
                        <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 8 }}>{s.niveau} · {s.annee}</div>
                        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', fontSize: 12 }}>
                          <span style={{ color: s.couleur, fontWeight: 600 }}>📚 {s.nbCh} chapitres</span>
                          <span style={{ color: 'var(--muted)' }}>·</span>
                          <span style={{ color: 'var(--muted)' }}>📊 {s.nbFormules > 0 ? `${s.nbFormules}+ formules` : 'Schémas & notions'}</span>
                          <span style={{ color: 'var(--muted)' }}>·</span>
                          <span style={{ color: 'var(--muted)' }}>📝 {s.nbEx}+ exercices</span>
                        </div>
                      </div>
                    </div>
                    <span style={{ color: s.couleur, fontWeight: 700, fontSize: 15, flexShrink: 0 }}>Ouvrir →</span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 10 }}>
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

          {/* CTA */}
          <div style={{ marginTop: 48, background: 'linear-gradient(135deg,rgba(22,163,74,0.08),rgba(8,145,178,0.05))', border: '1px solid rgba(22,163,74,0.18)', borderRadius: 18, padding: '24px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#34d399', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6 }}>🤖 IA · SVT France</div>
              <h3 style={{ fontSize: 17, marginBottom: 4 }}>Résous n'importe quel exercice de SVT</h3>
              <p style={{ fontSize: 13, color: 'var(--text2)', margin: 0 }}>Solveur étape par étape · Chat professeur · Schémas annotés</p>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <Link href="/solve" className="btn btn-primary" style={{ whiteSpace: 'nowrap' }}>🌱 Solveur IA</Link>
              <Link href="/chat" className="btn btn-secondary" style={{ whiteSpace: 'nowrap' }}>🤖 Chat Prof IA</Link>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </>
  )
}
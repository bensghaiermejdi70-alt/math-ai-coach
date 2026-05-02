'use client'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

// ══════════════════════════════════════════════════════════════════════
// PHYSIQUE-CHIMIE FRANCE — Page index
// Route : /bac-france/physique
// ══════════════════════════════════════════════════════════════════════

const SECTIONS = [
  {
    slug: 'seconde',
    icon: '📘',
    titre: 'Seconde Générale & Technologique',
    niveau: 'Lycée · Classe de Seconde',
    annee: '2026–2027',
    couleur: '#10b981',
    gradient: 'linear-gradient(135deg,rgba(16,185,129,0.14),rgba(5,150,105,0.07))',
    border: 'rgba(16,185,129,0.3)',
    badgeColor: '#34d399',
    badge: 'Enseignement commun · 3h/semaine',
    sections: [
      { label: '⚗️ Constitution & Transformations', items: ['Atomes, molécules, ions','Tableau périodique','Réactions chimiques','Acides et bases'] },
      { label: '⚡ Mouvement & Interactions',        items: ['Référentiel, vecteur vitesse','Principe d\'inertie','Forces'] },
      { label: '🌊 Ondes & Signaux',                items: ['Ondes mécaniques','Lentilles minces','Circuits électriques'] },
      { label: '🔋 Énergie',                        items: ['Énergie cinétique','Transferts thermiques','Rendement'] },
    ],
    nbCh: 10, nbFormules: 65, nbEx: 70,
  },
  {
    slug: 'premiere',
    icon: '📗',
    titre: 'Première Générale — Spécialité PC',
    niveau: 'Lycée · Classe de Première',
    annee: '2026–2027',
    couleur: '#4f6ef7',
    gradient: 'linear-gradient(135deg,rgba(79,110,247,0.14),rgba(124,58,237,0.07))',
    border: 'rgba(79,110,247,0.3)',
    badgeColor: '#818cf8',
    badge: 'Spécialité · 6h/semaine',
    sections: [
      { label: '⚗️ Constitution & Transformations', items: ['Quantité de matière','Avancement de réaction','Oxydo-réduction','Géométrie moléculaire'] },
      { label: '⚡ Mouvement & Interactions',        items: ['Loi de Coulomb','Champ électrique','Poussée d\'Archimède','2ème loi Newton (intro)'] },
      { label: '🔋 Énergie',                        items: ['Énergie cinétique, potentielle','Bilan énergétique','Énergie chimique'] },
      { label: '🌊 Ondes & Signaux',                items: ['Ondes mécaniques périodiques','Ondes sonores','Spectre électromagnétique','Numérisation'] },
    ],
    nbCh: 14, nbFormules: 110, nbEx: 95,
  },
  {
    slug: 'terminale',
    icon: '🎓',
    titre: 'Terminale Générale — Spécialité PC',
    niveau: 'Lycée · Classe de Terminale · Année du Bac',
    annee: '2027 (Bac)',
    couleur: '#f59e0b',
    gradient: 'linear-gradient(135deg,rgba(245,158,11,0.14),rgba(249,115,22,0.07))',
    border: 'rgba(245,158,11,0.3)',
    badgeColor: '#fbbf24',
    badge: 'Bac 2027 · Coef. 16',
    sections: [
      { label: '⚗️ Constitution & Transformations', items: ['Cinétique chimique','Équilibres chimiques','Radioactivité','Dosages'] },
      { label: '⚡ Mouvement & Interactions',        items: ['2ème loi Newton (ΣF=ma)','Satellites & planètes','Relation de Bernoulli'] },
      { label: '🔋 Thermodynamique',                items: ['Gaz parfait PV=nRT','1er principe','Enthalpie de réaction','Bilan radiatif'] },
      { label: '🌊 Ondes & Signaux',                items: ['Diffraction, interférences','Effet Doppler','Circuit RLC','Circuit RC'] },
    ],
    nbCh: 16, nbFormules: 145, nbEx: 120,
    isBac: true,
  },
  {
    slug: 'sti2d',
    icon: '⚙️',
    titre: 'STI2D — Première & Terminale',
    niveau: 'Voie Technologique · Sciences de l\'Industrie',
    annee: '2026–2027',
    couleur: '#8b5cf6',
    gradient: 'linear-gradient(135deg,rgba(139,92,246,0.14),rgba(99,102,241,0.07))',
    border: 'rgba(139,92,246,0.3)',
    badgeColor: '#a78bfa',
    badge: 'Tronc commun · Toutes spécialités',
    sections: [
      { label: '🔋 Énergie (pôle central)',          items: ['Énergie chimique, électrique','Énergie thermique, mécanique','Panneaux photovoltaïques'] },
      { label: '⚗️ Matière & Matériaux',             items: ['Propriétés des matériaux','Combustions, oxydo-réduction','Piles et corrosion'] },
      { label: '🌊 Ondes & Information',             items: ['Ondes sonores','Ondes électromagnétiques','Signal analogique/numérique'] },
    ],
    nbCh: 8, nbFormules: 60, nbEx: 55,
  },
  {
    slug: 'st2s',
    icon: '🏥',
    titre: 'ST2S — Physique-Chimie pour la Santé',
    niveau: 'Voie Technologique · Santé & Social',
    annee: '2026–2027',
    couleur: '#ec4899',
    gradient: 'linear-gradient(135deg,rgba(236,72,153,0.12),rgba(168,85,247,0.07))',
    border: 'rgba(236,72,153,0.3)',
    badgeColor: '#f472b6',
    badge: 'PCPS · Première / CBPH · Terminale',
    sections: [
      { label: '🏥 Physique-chimie & Santé',         items: ['Biophysique','Propriétés des médicaments','Analyses médicales','Rayonnements ionisants'] },
    ],
    nbCh: 6, nbFormules: 40, nbEx: 35,
  },
]

export default function PhysiqueIndexPage() {
  return (
    <>
      <Navbar />
      <main style={{ position: 'relative', zIndex: 1, paddingTop: 80 }}>
        <div className="container" style={{ paddingTop: 40, paddingBottom: 80 }}>

          {/* Fil d'Ariane */}
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 12, color: 'var(--muted)', marginBottom: 24 }}>
            <Link href="/bac-france" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇫🇷 France</Link>
            <span>›</span>
            <span style={{ color: '#22d3ee' }}>Physique-Chimie</span>
          </div>

          {/* HEADER */}
          <div style={{ marginBottom: 40 }}>
            <span className="label" style={{ marginBottom: 12, display: 'inline-block' }}>⚛️ Programme Officiel MEN · 2026</span>
            <h1 style={{ fontSize: 'clamp(28px,4vw,48px)', marginBottom: 14 }}>
              Physique-Chimie France<br />
              <span style={{ background: 'linear-gradient(90deg,#06b6d4,#0ea5e9)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Seconde · Première · Terminale
              </span>
            </h1>
            <p style={{ maxWidth: 640, color: 'var(--text2)', fontSize: 14, lineHeight: 1.7, marginBottom: 20 }}>
              Programmes officiels Éducation Nationale · Voie Générale & Technologique.
              Cours, formules, exercices corrigés et IA professeur pour toutes les voies.
            </p>
            <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', fontSize: 13, color: 'var(--muted)' }}>
              <span>⚛️ 5 voies</span><span>·</span>
              <span>📚 54 chapitres</span><span>·</span>
              <span>📊 420+ formules</span><span>·</span>
              <span>📝 375+ exercices</span>
            </div>
          </div>

          {/* BADGE NOUVEAUTÉS */}
          <div style={{ background: 'rgba(6,182,212,0.07)', border: '1px solid rgba(6,182,212,0.25)', borderRadius: 14, padding: '14px 20px', marginBottom: 40, display: 'flex', gap: 12, alignItems: 'flex-start', flexWrap: 'wrap' }}>
            <span style={{ fontSize: 20 }}>🆕</span>
            <div>
              <div style={{ fontWeight: 700, fontSize: 13, color: '#22d3ee', marginBottom: 6 }}>Programme en vigueur — Bac 2026/2027</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
                {[
                  'Terminale 2026 : Épreuve spécialité PC · Coef. 16',
                  'Épreuve pratique incluse dans le coefficient',
                  'STI2D : Évaluation compétences expérimentales',
                  'ST2S : PCPS en Première · CBPH en Terminale',
                ].map(n => (
                  <span key={n} style={{ fontSize: 11, background: 'rgba(6,182,212,0.1)', color: '#22d3ee', padding: '3px 10px', borderRadius: 20, border: '1px solid rgba(6,182,212,0.22)' }}>
                    🔵 {n}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* SECTIONS */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {SECTIONS.map(s => (
              <Link key={s.slug} href={`/bac-france/physique/${s.slug}`} style={{ textDecoration: 'none' }}>
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
                          <span style={{ color: 'var(--muted)' }}>📐 {s.nbFormules}+ formules</span>
                          <span style={{ color: 'var(--muted)' }}>·</span>
                          <span style={{ color: 'var(--muted)' }}>📝 {s.nbEx}+ exercices</span>
                        </div>
                      </div>
                    </div>
                    <span style={{ color: s.couleur, fontWeight: 700, fontSize: 15, flexShrink: 0 }}>Ouvrir →</span>
                  </div>

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

          {/* CTA */}
          <div style={{ marginTop: 48, background: 'linear-gradient(135deg,rgba(6,182,212,0.1),rgba(14,165,233,0.06))', border: '1px solid rgba(6,182,212,0.2)', borderRadius: 18, padding: '24px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#22d3ee', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6 }}>🤖 IA · Physique-Chimie France</div>
              <h3 style={{ fontSize: 17, marginBottom: 4 }}>Résous n'importe quel exercice de PC</h3>
              <p style={{ fontSize: 13, color: 'var(--text2)', margin: 0 }}>Solveur étape par étape · Chat professeur · Graphiques interactifs</p>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <Link href="/solve" className="btn btn-primary" style={{ whiteSpace: 'nowrap' }}>🧮 Solveur IA</Link>
              <Link href="/chat" className="btn btn-secondary" style={{ whiteSpace: 'nowrap' }}>🤖 Chat Prof IA</Link>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </>
  )
}
'use client'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

// ══════════════════════════════════════════════════════════════════════
// SVT TUNISIE — Page index générale
// Route : /bac/svt
// Sections : Sciences Expérimentales · Mathématiques
// Programme officiel MEN Tunisie · 4ème année secondaire
// ══════════════════════════════════════════════════════════════════════

const FIRST_CH: Record<string, string> = {
  'sciences-exp': 'brassage-genetique',
  'mathematique':  'brassage-genetique-maths',
}

const SECTIONS = [
  {
    slug: 'sciences-exp',
    icon: '🔬',
    titre: 'Section Sciences Expérimentales',
    sous: 'SVT — Programme complet 4ème Sc. Exp.',
    couleur: '#22c55e',
    gradient: 'linear-gradient(135deg,rgba(34,197,94,0.16),rgba(16,185,129,0.08))',
    border: 'rgba(34,197,94,0.3)',
    badgeColor: '#4ade80',
    badge: 'Bac · Coef. 5',
    stats: { chapitres: 14, thm: 210, ex: 180 },
    apercu: [
      { label: '🧬 Génétique',        items: ['Brassage génétique','Transmission héréditaire','Mutations','Génétique des pop.'] },
      { label: '🧠 Neurophysiologie', items: ['Milieu intérieur','Glycémie','Système nerveux','Immunité'] },
      { label: '👶 Reproduction',     items: ['Fonction mascul.','Fonction féminine','Fécondation','FIVETE'] },
      { label: '🌿 Nutrition & Éco',  items: ['Nutrition animale','Nutrition végétale','Photosynthèse'] },
    ],
  },
  {
    slug: 'mathematique',
    icon: '📐',
    titre: 'Section Mathématiques',
    sous: 'SVT — Programme allégé 4ème Maths',
    couleur: '#4ade80',
    gradient: 'linear-gradient(135deg,rgba(74,222,128,0.14),rgba(34,197,94,0.07))',
    border: 'rgba(74,222,128,0.28)',
    badgeColor: '#86efac',
    badge: 'Bac · Coef. 2',
    stats: { chapitres: 13, thm: 165, ex: 130 },
    apercu: [
      { label: '🧬 Génétique',        items: ['Brassage génétique','Hérédité','Mutations','Diagnostic prénatal'] },
      { label: '🧠 Neurophysiologie', items: ['Milieu intérieur','Glycémie','Système nerveux','Immunité'] },
      { label: '👶 Reproduction',     items: ['Fonction mascul.','Fonction féminine','Fécondation'] },
      { label: '🌍 Géologie & Évol.', items: ['Évolution biologique','Tectonique des plaques','Séismes'] },
    ],
  },
]

export default function SvtTunisiePage() {
  return (
    <>
      <Navbar />
      <main style={{ position: 'relative', zIndex: 1, paddingTop: 80 }}>
        <div className="container" style={{ paddingTop: 40, paddingBottom: 80 }}>

          {/* FIL D'ARIANE */}
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 12, color: 'var(--muted)', marginBottom: 24 }}>
            <Link href="/bac" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇹🇳 Tunisie</Link>
            <span>›</span>
            <span style={{ color: '#22c55e' }}>SVT</span>
          </div>

          {/* HEADER */}
          <div style={{ marginBottom: 40 }}>
            <span className="label" style={{ marginBottom: 12, display: 'inline-block' }}>
              🇹🇳 Ministère de l'Éducation Tunisie · Baccalauréat
            </span>
            <h1 style={{ fontSize: 'clamp(28px,4vw,48px)', marginBottom: 14 }}>
              SVT — Sciences de la Vie et de la Terre<br />
              <span style={{ background: 'linear-gradient(90deg,#22c55e,#4ade80)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Tunisie · 4ème année secondaire
              </span>
            </h1>
            <p style={{ maxWidth: 620, color: 'var(--text2)', fontSize: 14, lineHeight: 1.7, marginBottom: 20 }}>
              Programme officiel MEN Tunisie · 4ème année secondaire · 2 sections.
              Cours complets, définitions, formules, exercices corrigés et IA professeur.
            </p>
            <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', fontSize: 13, color: 'var(--muted)' }}>
              <span>🏫 2 sections</span><span>·</span>
              <span>📚 27 chapitres</span><span>·</span>
              <span>📊 375+ concepts</span><span>·</span>
              <span>📝 310+ exercices</span>
            </div>
          </div>

          {/* BADGE INFO PROGRAMME */}
          <div style={{ background: 'rgba(34,197,94,0.07)', border: '1px solid rgba(34,197,94,0.25)', borderRadius: 14, padding: '14px 20px', marginBottom: 48, display: 'flex', gap: 12, alignItems: 'flex-start', flexWrap: 'wrap' }}>
            <span style={{ fontSize: 20 }}>📋</span>
            <div>
              <div style={{ fontWeight: 700, fontSize: 13, color: '#4ade80', marginBottom: 6 }}>Programme Baccalauréat SVT Tunisie 2024/2025</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
                {[
                  'Thème I — Génétique & Reproduction',
                  'Thème II — Milieu intérieur & Neurophysiologie',
                  'Thème III — Reproduction humaine & Santé',
                  'Thème IV — Nutrition & Environnement',
                  'Programme adapté par section',
                ].map(n => (
                  <span key={n} style={{ fontSize: 11, background: 'rgba(34,197,94,0.09)', color: '#4ade80', padding: '3px 10px', borderRadius: 20, border: '1px solid rgba(34,197,94,0.2)' }}>
                    ✦ {n}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* CARTES SECTIONS */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {SECTIONS.map(s => (
              <div key={s.slug}
                style={{ background: s.gradient, border: `1px solid ${s.border}`, borderRadius: 22, padding: '26px 30px', transition: 'transform 0.2s, box-shadow 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = `0 16px 48px ${s.couleur}28` }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '' }}
              >
                {/* Header section */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16, marginBottom: 20 }}>
                  <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                    <span style={{ fontSize: 40, flexShrink: 0 }}>{s.icon}</span>
                    <div>
                      <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap', marginBottom: 5 }}>
                        <h2 style={{ fontSize: 20, fontWeight: 900, color: 'var(--text)', margin: 0 }}>{s.titre}</h2>
                        <span style={{ fontSize: 11, padding: '3px 10px', borderRadius: 20, background: `${s.couleur}22`, color: s.badgeColor, fontWeight: 700 }}>{s.badge}</span>
                      </div>
                      <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 8 }}>{s.sous}</div>
                      <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', fontSize: 12 }}>
                        <span style={{ color: s.couleur, fontWeight: 700 }}>📚 {s.stats.chapitres} chapitres</span>
                        <span style={{ color: 'var(--muted)' }}>·</span>
                        <span style={{ color: 'var(--muted)' }}>📊 {s.stats.thm}+ concepts</span>
                        <span style={{ color: 'var(--muted)' }}>·</span>
                        <span style={{ color: 'var(--muted)' }}>📝 {s.stats.ex}+ exercices</span>
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', flexShrink: 0 }}>
                    <Link href={`/bac/svt/${s.slug}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '8px 16px', borderRadius: 10, background: `${s.couleur}18`, border: `1px solid ${s.couleur}40`, color: s.couleur, fontSize: 12, fontWeight: 700, textDecoration: 'none', whiteSpace: 'nowrap' }}>
                      📚 Voir les chapitres →
                    </Link>
                    <Link href={`/bac/svt/${s.slug}/${FIRST_CH[s.slug] || ''}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '8px 16px', borderRadius: 10, background: s.couleur, color: 'white', fontSize: 12, fontWeight: 700, textDecoration: 'none', whiteSpace: 'nowrap' }}>
                      📖 Premier cours →
                    </Link>
                  </div>
                </div>

                {/* Aperçu chapitres */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(190px,1fr))', gap: 10 }}>
                  {s.apercu.map(sec => (
                    <div key={sec.label} style={{ background: 'rgba(0,0,0,0.13)', borderRadius: 12, padding: '11px 14px' }}>
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
            ))}
          </div>

          {/* DIFFÉRENCES ENTRE SECTIONS */}
          <div style={{ marginTop: 40, background: 'rgba(34,197,94,0.05)', border: '1px solid rgba(34,197,94,0.18)', borderRadius: 16, padding: '20px 24px' }}>
            <div style={{ fontWeight: 700, fontSize: 13, color: '#4ade80', marginBottom: 12 }}>⚖️ Différences entre les deux sections</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 14 }}>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#22c55e', marginBottom: 6 }}>🔬 Sciences Expérimentales (Coef. 5)</div>
                <div style={{ fontSize: 12, color: 'var(--text2)', lineHeight: 1.7 }}>
                  Programme complet · 4 thèmes · 14 chapitres<br />
                  Génétique des populations · Écosystèmes & Biodiversité<br />
                  <strong style={{ color: '#22c55e' }}>Matière principale</strong> — la plus importante du Bac
                </div>
              </div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#4ade80', marginBottom: 6 }}>📐 Section Mathématiques (Coef. 2)</div>
                <div style={{ fontSize: 12, color: 'var(--text2)', lineHeight: 1.7 }}>
                  Programme allégé · 5 thèmes · 13 chapitres<br />
                  + Géologie & Évolution biologique<br />
                  <strong style={{ color: '#4ade80' }}>Matière complémentaire</strong> — contenu SVT réduit
                </div>
              </div>
            </div>
          </div>

          {/* CTA IA */}
          <div style={{ marginTop: 48, background: 'linear-gradient(135deg,rgba(34,197,94,0.1),rgba(16,185,129,0.06))', border: '1px solid rgba(34,197,94,0.2)', borderRadius: 18, padding: '24px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#4ade80', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6 }}>🤖 IA · SVT Tunisie</div>
              <h3 style={{ fontSize: 17, marginBottom: 4 }}>Prof IA — Maîtrise chaque chapitre de SVT</h3>
              <p style={{ fontSize: 13, color: 'var(--text2)', margin: 0 }}>Solveur étape par étape · Chat professeur · Simulation Bac Tunisie</p>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <Link href="/solve" className="btn btn-primary" style={{ whiteSpace: 'nowrap' }}>🧮 Solveur IA</Link>
              <Link href="/simulation" className="btn btn-secondary" style={{ whiteSpace: 'nowrap' }}>🎯 Simulation Bac</Link>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </>
  )
}
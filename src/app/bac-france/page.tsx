'use client'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

// ══════════════════════════════════════════════════════════════════════
// PROGRAMME FRANCE — Page index principale
// Route : /bac-france
// Matières : Mathématiques · Physique-Chimie
// ══════════════════════════════════════════════════════════════════════

const MATIERES = [
  {
    slug: 'maths',
    icon: '📐',
    titre: 'Mathématiques',
    sous: 'Seconde · Première · Terminale · Expertes · Techno',
    couleur: '#f59e0b',
    gradient: 'linear-gradient(135deg,rgba(245,158,11,0.16),rgba(249,115,22,0.08))',
    border: 'rgba(245,158,11,0.3)',
    badgeColor: '#fbbf24',
    badge: 'Bac 2027 · Coef. 16',
    stats: { voies: 5, chapitres: 54, thm: 419, ex: 364 },
    apercu: [
      { label: '📘 Seconde',            items: ['Python','Vecteurs','Fonctions','Probabilités'] },
      { label: '📗 Première Spé',       items: ['Dérivation','Exponentielle','Produit scalaire'] },
      { label: '🎓 Terminale Générale', items: ['Intégration','Complexes','Loi normale'] },
      { label: '⭐ Expertes · Techno',  items: ['Arithmétique','Graphes','Calcul financier'] },
    ],
  },
  {
    slug: 'informatique',
    icon: '💻',
    titre: 'Informatique',
    sous: 'Seconde (SNT) · Première NSI · Terminale NSI',
    couleur: '#8b5cf6',
    gradient: 'linear-gradient(135deg,rgba(139,92,246,0.14),rgba(99,102,241,0.07))',
    border: 'rgba(139,92,246,0.3)',
    badgeColor: '#a78bfa',
    badge: 'Bac 2027 · Coef. 16',
    stats: { voies: 3, chapitres: 22, thm: 180, ex: 120 },
    apercu: [
      { label: '📘 Seconde (SNT)',    items: ['Internet','Web','Données','Réseaux sociaux','GPS','Image'] },
      { label: '📗 Première (NSI)',   items: ['Python','Algorithmique','Bases de données','Web','OS'] },
      { label: '🎓 Terminale (NSI)',  items: ['Graphes','SQL avancé','Récursivité','POO','Cybersécurité'] },
    ],
  },
  {
    slug: 'physique',
    icon: '⚛️',
    titre: 'Physique-Chimie',
    sous: 'Seconde · Première · Terminale · STI2D · ST2S',
    couleur: '#06b6d4',
    gradient: 'linear-gradient(135deg,rgba(6,182,212,0.14),rgba(14,165,233,0.07))',
    border: 'rgba(6,182,212,0.3)',
    badgeColor: '#22d3ee',
    badge: 'Bac 2027 · Coef. 16',
    stats: { voies: 5, chapitres: 54, thm: 420, ex: 375 },
    apercu: [
      { label: '📘 Seconde',            items: ['Atomes','Mouvements','Ondes','Énergie'] },
      { label: '📗 Première Spé PC',    items: ['Oxydo-réduction','Newton','Spectre'] },
      { label: '🎓 Terminale Spé PC',   items: ['Cinétique','Thermodynamique','Doppler'] },
      { label: '⚙️ STI2D · ST2S',       items: ['Énergie','Matériaux','Santé & PC'] },
    ],
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
                Maths · Physique-Chimie · Informatique
              </span>
            </h1>
            <p style={{ maxWidth: 600, color: 'var(--text2)', fontSize: 14, lineHeight: 1.7, marginBottom: 20 }}>
              Programmes officiels MEN · Seconde · Première · Terminale Générale & Technologique.
              Cours, théorèmes, formules et exercices corrigés avec IA professeur.
            </p>
            <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', fontSize: 13, color: 'var(--muted)' }}>
              <span>🏫 3 matières</span><span>·</span>
              <span>📚 130 chapitres</span><span>·</span>
              <span>📊 1019+ théorèmes</span><span>·</span>
              <span>📝 859+ exercices</span>
            </div>
          </div>

          {/* BADGE NOUVEAUTÉS */}
          <div style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.28)', borderRadius: 14, padding: '14px 20px', marginBottom: 48, display: 'flex', gap: 12, alignItems: 'flex-start', flexWrap: 'wrap' }}>
            <span style={{ fontSize: 20 }}>🆕</span>
            <div>
              <div style={{ fontWeight: 700, fontSize: 13, color: '#fbbf24', marginBottom: 6 }}>Nouveautés 2026/2027</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
                {[
                  'Première 2026 : Épreuve anticipée Maths coef. 2',
                  'Terminale 2027 : Grand Oral coef. 8',
                  'Spécialité Maths & PC : Coef. 16',
                  'STI2D : Évaluation compétences expérimentales',
                ].map(n => (
                  <span key={n} style={{ fontSize: 11, background: 'rgba(245,158,11,0.1)', color: '#fbbf24', padding: '3px 10px', borderRadius: 20, border: '1px solid rgba(245,158,11,0.22)' }}>
                    🔴 {n}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* MATIÈRES */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {MATIERES.map(m => (
              <Link key={m.slug} href={`/bac-france/${m.slug}`} style={{ textDecoration: 'none' }}>
                <div
                  style={{ background: m.gradient, border: `1px solid ${m.border}`, borderRadius: 22, padding: '28px 32px', transition: 'transform 0.2s, box-shadow 0.2s', cursor: 'pointer' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = `0 16px 50px ${m.couleur}28` }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '' }}
                >
                  {/* Titre matière */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16, marginBottom: 24 }}>
                    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                      <span style={{ fontSize: 44, flexShrink: 0 }}>{m.icon}</span>
                      <div>
                        <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap', marginBottom: 6 }}>
                          <h2 style={{ fontSize: 24, fontWeight: 900, color: 'var(--text)', margin: 0 }}>{m.titre}</h2>
                          <span style={{ fontSize: 11, padding: '3px 12px', borderRadius: 20, background: `${m.couleur}22`, color: m.badgeColor, fontWeight: 700 }}>{m.badge}</span>
                        </div>
                        <div style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 10 }}>{m.sous}</div>
                        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', fontSize: 12 }}>
                          <span style={{ color: m.couleur, fontWeight: 700 }}>🏫 {m.stats.voies} voies</span>
                          <span style={{ color: 'var(--muted)' }}>·</span>
                          <span style={{ color: 'var(--muted)' }}>📚 {m.stats.chapitres} chapitres</span>
                          <span style={{ color: 'var(--muted)' }}>·</span>
                          <span style={{ color: 'var(--muted)' }}>📊 {m.stats.thm}+ théorèmes</span>
                          <span style={{ color: 'var(--muted)' }}>·</span>
                          <span style={{ color: 'var(--muted)' }}>📝 {m.stats.ex}+ exercices</span>
                        </div>
                      </div>
                    </div>
                    <span style={{ color: m.couleur, fontWeight: 800, fontSize: 16, flexShrink: 0 }}>Explorer →</span>
                  </div>

                  {/* Aperçu niveaux */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 10 }}>
                    {m.apercu.map(sec => (
                      <div key={sec.label} style={{ background: 'rgba(0,0,0,0.14)', borderRadius: 12, padding: '12px 16px' }}>
                        <div style={{ fontWeight: 700, fontSize: 11, color: m.couleur, marginBottom: 7 }}>{sec.label}</div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                          {sec.items.map(it => (
                            <span key={it} style={{ fontSize: 10, padding: '2px 8px', borderRadius: 8, background: `${m.couleur}18`, color: 'var(--text2)', border: `1px solid ${m.couleur}18` }}>{it}</span>
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
          <div style={{ marginTop: 52, background: 'linear-gradient(135deg,rgba(79,110,247,0.1),rgba(124,58,237,0.06))', border: '1px solid rgba(79,110,247,0.2)', borderRadius: 18, padding: '24px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#818cf8', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6 }}>🤖 IA · Maths · Physique · Informatique France</div>
              <h3 style={{ fontSize: 17, marginBottom: 4 }}>Prof IA — Résous n'importe quel exercice</h3>
              <p style={{ fontSize: 13, color: 'var(--text2)', margin: 0 }}>Solveur étape par étape · Chat professeur · Simulation Bac</p>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <Link href="/solve" className="btn btn-primary" style={{ whiteSpace: 'nowrap' }}>🧮 Solveur IA</Link>
              <Link href="/simulation-france" className="btn btn-secondary" style={{ whiteSpace: 'nowrap' }}>🎯 Simulation Bac</Link>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </>
  )
}
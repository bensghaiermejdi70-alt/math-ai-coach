'use client'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

// ══════════════════════════════════════════════════════════════════════
// PROGRAMME TUNISIE — Français · Page index
// Route : /bac/francais
// Sections : Lettres · Scientifiques (Maths, Sc.Exp, Sc.Tech, Info, Éco-Gestion)
// ══════════════════════════════════════════════════════════════════════

const FIRST_CH: Record<string, string> = {
  'lettres':       'partage',
  'scientifique':  'science-progres',
}

const SECTIONS = [
  {
    slug: 'lettres',
    icon: '📚',
    titre: 'Section Lettres',
    sous: 'Français — Programme Lettres',
    couleur: '#ec4899',
    gradient: 'linear-gradient(135deg,rgba(236,72,153,0.16),rgba(219,39,119,0.08))',
    border: 'rgba(236,72,153,0.3)',
    badgeColor: '#f472b6',
    badge: 'Bac · Lettres',
    stats: { chapitres: 8, thm: 120, ex: 95 },
    apercu: [
      { label: '🤝 Partage',              items: ['Solidarité', 'Tolérance', 'Vivre ensemble', 'Dialogue des cultures'] },
      { label: '✊ Engagement littéraire', items: ['Liberté', 'Justice', 'Droits humains', 'Écrivain engagé'] },
      { label: '🔬 Appel de la modernité', items: ['Technologie', 'Science', 'Tradition vs modernité'] },
      { label: '💡 À la lumière de la raison', items: ['Lumières', 'Esprit critique', 'Philosophie', 'Liberté de pensée'] },
    ],
  },
  {
    slug: 'scientifique',
    icon: '🔬',
    titre: 'Sections Scientifiques',
    sous: 'Français — Maths · Sc.Exp · Sc.Tech · Info · Éco-Gestion',
    couleur: '#8b5cf6',
    gradient: 'linear-gradient(135deg,rgba(139,92,246,0.16),rgba(99,40,217,0.08))',
    border: 'rgba(139,92,246,0.3)',
    badgeColor: '#a78bfa',
    badge: 'Bac · Sciences',
    stats: { chapitres: 8, thm: 115, ex: 90 },
    apercu: [
      { label: '🔭 Science et progrès',    items: ['Développement scientifique', 'Technologie', 'IA', 'Modernisation'] },
      { label: '🌿 Homme et nature',        items: ['Environnement', 'Pollution', 'Écologie', 'Développement durable'] },
      { label: '📡 Communication & médias', items: ['Réseaux sociaux', 'Internet', 'Fake news', 'Influence médias'] },
      { label: '🕊️ Tolérance & humanisme', items: ['Respect', 'Liberté', 'Dialogue cultures', 'Paix'] },
    ],
  },
]

export default function FrancaisTunisiePage() {
  return (
    <>
      <Navbar />
      <main style={{ position: 'relative', zIndex: 1, paddingTop: 80 }}>
        <div className="container" style={{ paddingTop: 40, paddingBottom: 80 }}>

          {/* FIL D'ARIANE */}
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 12, color: 'var(--muted)', marginBottom: 24 }}>
            <Link href="/bac" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇹🇳 Tunisie</Link>
            <span>›</span>
            <span style={{ color: '#ec4899' }}>Français</span>
          </div>

          {/* HEADER */}
          <div style={{ marginBottom: 40 }}>
            <span className="label" style={{ marginBottom: 12, display: 'inline-block' }}>
              🇹🇳 Ministère de l'Éducation Tunisie · Baccalauréat
            </span>
            <h1 style={{ fontSize: 'clamp(28px,4vw,48px)', marginBottom: 14 }}>
              Français Tunisie<br />
              <span style={{ background: 'linear-gradient(90deg,#ec4899,#8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Toutes Sections · 4ème année
              </span>
            </h1>
            <p style={{ maxWidth: 620, color: 'var(--text2)', fontSize: 14, lineHeight: 1.7, marginBottom: 20 }}>
              Programme officiel MEN Tunisie · 4ème année secondaire · 2 sections.
              Cours, textes, auteurs, axes d'argumentation et production écrite avec IA professeur.
            </p>
            <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', fontSize: 13, color: 'var(--muted)' }}>
              <span>🏫 2 sections</span><span>·</span>
              <span>📚 16 chapitres</span><span>·</span>
              <span>✍️ 235+ axes d'argumentation</span><span>·</span>
              <span>📝 185+ exercices</span>
            </div>
          </div>

          {/* BADGE INFO */}
          <div style={{ background: 'rgba(236,72,153,0.07)', border: '1px solid rgba(236,72,153,0.25)', borderRadius: 14, padding: '14px 20px', marginBottom: 48, display: 'flex', gap: 12, alignItems: 'flex-start', flexWrap: 'wrap' }}>
            <span style={{ fontSize: 20 }}>📋</span>
            <div>
              <div style={{ fontWeight: 700, fontSize: 13, color: '#f472b6', marginBottom: 6 }}>Programme Baccalauréat Français Tunisie 2024/2025</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
                {[
                  'Texte argumentatif · Essai · Dissertation',
                  'Auteurs : Camus · Hugo · Zola · Voltaire · Sartre',
                  'Poésie · Littérature engagée · Lumières',
                  'Programme adapté par section',
                ].map(n => (
                  <span key={n} style={{ fontSize: 11, background: 'rgba(236,72,153,0.09)', color: '#f472b6', padding: '3px 10px', borderRadius: 20, border: '1px solid rgba(236,72,153,0.2)' }}>
                    ✦ {n}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* SECTIONS */}
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
                        <span style={{ color: s.couleur, fontWeight: 700 }}>📚 {s.stats.chapitres} modules</span>
                        <span style={{ color: 'var(--muted)' }}>·</span>
                        <span style={{ color: 'var(--muted)' }}>✍️ {s.stats.thm}+ axes</span>
                        <span style={{ color: 'var(--muted)' }}>·</span>
                        <span style={{ color: 'var(--muted)' }}>📝 {s.stats.ex}+ exercices</span>
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', flexShrink: 0 }}>
                    <Link href={`/bac/francais/${s.slug}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '8px 16px', borderRadius: 10, background: `${s.couleur}18`, border: `1px solid ${s.couleur}40`, color: s.couleur, fontSize: 12, fontWeight: 700, textDecoration: 'none', whiteSpace: 'nowrap' }}>
                      📚 Voir les modules →
                    </Link>
                    <Link href={`/bac/francais/${s.slug}/${FIRST_CH[s.slug] || ''}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '8px 16px', borderRadius: 10, background: s.couleur, color: 'white', fontSize: 12, fontWeight: 700, textDecoration: 'none', whiteSpace: 'nowrap' }}>
                      📖 Premier module →
                    </Link>
                  </div>
                </div>

                {/* Aperçu modules */}
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

          {/* NOTE PROGRAMME */}
          <div style={{ marginTop: 40, background: 'rgba(236,72,153,0.05)', border: '1px solid rgba(236,72,153,0.18)', borderRadius: 16, padding: '18px 24px' }}>
            <div style={{ fontWeight: 700, fontSize: 13, color: '#f472b6', marginBottom: 10 }}>⚖️ Différences entre les deux sections</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 14 }}>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#ec4899', marginBottom: 6 }}>📚 Section Lettres</div>
                <div style={{ fontSize: 12, color: 'var(--text2)', lineHeight: 1.7 }}>
                  8 modules · Littérature engagée · Poésie lyrique<br />
                  Auteurs : Camus, Hugo, Zola, Baudelaire, Sartre<br />
                  <strong style={{ color: '#ec4899' }}>Coefficient élevé</strong> — matière principale
                </div>
              </div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#8b5cf6', marginBottom: 6 }}>🔬 Sections Scientifiques</div>
                <div style={{ fontSize: 12, color: 'var(--text2)', lineHeight: 1.7 }}>
                  8 modules · Textes scientifiques · Environnement<br />
                  Auteurs : Jacquard, Reeves, McLuhan, Voltaire<br />
                  <strong style={{ color: '#8b5cf6' }}>Programme adapté</strong> — accent sur l'argumentation
                </div>
              </div>
            </div>
          </div>

          {/* CTA IA */}
          <div style={{ marginTop: 48, background: 'linear-gradient(135deg,rgba(236,72,153,0.1),rgba(139,92,246,0.06))', border: '1px solid rgba(236,72,153,0.2)', borderRadius: 18, padding: '24px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#f472b6', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6 }}>🤖 IA · Français Tunisie</div>
              <h3 style={{ fontSize: 17, marginBottom: 4 }}>Prof IA — Maîtrise l'argumentation et la dissertation</h3>
              <p style={{ fontSize: 13, color: 'var(--text2)', margin: 0 }}>Dissertation étape par étape · Chat professeur · Simulation Bac Tunisie</p>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <Link href="/solve" className="btn btn-primary" style={{ whiteSpace: 'nowrap' }}>✍️ Solveur IA</Link>
              <Link href="/simulation" className="btn btn-secondary" style={{ whiteSpace: 'nowrap' }}>🎯 Simulation Bac</Link>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </>
  )
}
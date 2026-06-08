'use client'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

// ══════════════════════════════════════════════════════════════════════
// PROGRAMME TUNISIE — Économie · Page index matière
// Route : /bac/economie
// Section : Sciences Économiques et Gestion
// ══════════════════════════════════════════════════════════════════════

const FIRST_CH: Record<string, string> = {
  'eco-gestion': 'croissance-economique',
}

const SECTIONS = [
  {
    slug: 'eco-gestion',
    icon: '📈',
    titre: 'Section Sciences Économiques et Gestion',
    sous: 'Économie — 4ème Économie & Gestion',
    couleur: '#06b6d4',
    gradient: 'linear-gradient(135deg,rgba(6,182,212,0.16),rgba(14,165,233,0.08))',
    border: 'rgba(6,182,212,0.3)',
    badgeColor: '#22d3ee',
    badge: 'Bac · Éco-Gestion',
    stats: { chapitres: 9, parties: 4, sections: 25 },
    apercu: [
      { label: '📊 Partie I — Croissance', items: ['Croissance économique', 'Facteurs de croissance'] },
      { label: '🏭 Partie II — Mutations', items: ['Structure de production', 'Modes de vie'] },
      { label: '🌱 Partie III — Dév. durable', items: ['Coûts de la croissance', 'Développement durable'] },
      { label: '🌍 Partie IV — Mondialisation', items: ['Échanges internationaux', 'Commerce international', 'Firmes multinationales'] },
    ],
  },
]

export default function EconomieTunisiePage() {
  return (
    <>
      <Navbar />
      <main style={{ position: 'relative', zIndex: 1, paddingTop: 80 }}>
        <div className="container" style={{ paddingTop: 40, paddingBottom: 80 }}>

          {/* FIL D'ARIANE */}
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 12, color: 'var(--muted)', marginBottom: 24 }}>
            <Link href="/bac" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇹🇳 Tunisie</Link>
            <span>›</span>
            <span style={{ color: '#06b6d4' }}>Économie</span>
          </div>

          {/* HEADER */}
          <div style={{ marginBottom: 40 }}>
            <span className="label" style={{ marginBottom: 12, display: 'inline-block' }}>🇹🇳 Ministère de l'Éducation Tunisie · Baccalauréat</span>
            <h1 style={{ fontSize: 'clamp(28px,4vw,48px)', marginBottom: 14 }}>
              Économie Tunisie<br />
              <span style={{ background: 'linear-gradient(90deg,#06b6d4,#0891b2)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Section Sc. Économiques et Gestion · 4ème année
              </span>
            </h1>
            <p style={{ maxWidth: 620, color: 'var(--text2)', fontSize: 14, lineHeight: 1.7, marginBottom: 20 }}>
              Programme officiel CNP Tunisie · 4ème année secondaire · Section Économie & Gestion.
              Cours, définitions, indicateurs et exercices type Bac avec IA professeur.
            </p>
            <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', fontSize: 13, color: 'var(--muted)' }}>
              <span>🏫 1 section</span><span>·</span>
              <span>🗂️ 4 parties</span><span>·</span>
              <span>📚 9 chapitres</span><span>·</span>
              <span>📐 25 sections</span>
            </div>
          </div>

          {/* BADGE INFO */}
          <div style={{ background: 'rgba(6,182,212,0.07)', border: '1px solid rgba(6,182,212,0.25)', borderRadius: 14, padding: '14px 20px', marginBottom: 48, display: 'flex', gap: 12, alignItems: 'flex-start', flexWrap: 'wrap' }}>
            <span style={{ fontSize: 20 }}>📋</span>
            <div>
              <div style={{ fontWeight: 700, fontSize: 13, color: '#22d3ee', marginBottom: 6 }}>Programme Baccalauréat Tunisie · Économie</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
                {[
                  'Croissance économique et ses facteurs',
                  'Mutations des structures économiques',
                  'Développement durable',
                  'Mondialisation et ses enjeux',
                ].map(n => (
                  <span key={n} style={{ fontSize: 11, background: 'rgba(6,182,212,0.09)', color: '#22d3ee', padding: '3px 10px', borderRadius: 20, border: '1px solid rgba(6,182,212,0.2)' }}>
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
                          <span style={{ color: s.couleur, fontWeight: 700 }}>📚 {s.stats.chapitres} chapitres</span>
                          <span style={{ color: 'var(--muted)' }}>·</span>
                          <span style={{ color: 'var(--muted)' }}>🗂️ {s.stats.parties} parties</span>
                          <span style={{ color: 'var(--muted)' }}>·</span>
                          <span style={{ color: 'var(--muted)' }}>📐 {s.stats.sections} sections</span>
                        </div>
                      </div>
                    </div>
                    <div style={{ display:'flex', gap:10, flexWrap:'wrap', flexShrink:0 }}>
                    <Link href={`/bac/economie/${s.slug}`} style={{ display:'inline-flex',alignItems:'center',gap:6,padding:'8px 16px',borderRadius:10,background:`${s.couleur}18`,border:`1px solid ${s.couleur}40`,color:s.couleur,fontSize:12,fontWeight:700,textDecoration:'none',whiteSpace:'nowrap' }}>
                      📚 Voir les chapitres →
                    </Link>
                    <Link href={`/bac/economie/${s.slug}/${FIRST_CH[s.slug]||''}`} style={{ display:'inline-flex',alignItems:'center',gap:6,padding:'8px 16px',borderRadius:10,background:s.couleur,color:'white',fontSize:12,fontWeight:700,textDecoration:'none',whiteSpace:'nowrap' }}>
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

          {/* CTA IA */}
          <div style={{ marginTop: 52, background: 'linear-gradient(135deg,rgba(6,182,212,0.1),rgba(8,145,178,0.06))', border: '1px solid rgba(6,182,212,0.2)', borderRadius: 18, padding: '24px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#22d3ee', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6 }}>🤖 IA · Économie Tunisie</div>
              <h3 style={{ fontSize: 17, marginBottom: 4 }}>Prof IA — Comprends et révise chaque notion</h3>
              <p style={{ fontSize: 13, color: 'var(--text2)', margin: 0 }}>Chat professeur · Simulation Bac Tunisie · Sujets corrigés</p>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <Link href="/chat" className="btn btn-primary" style={{ whiteSpace: 'nowrap' }}>🤖 Chat Prof</Link>
              <Link href="/simulation" className="btn btn-secondary" style={{ whiteSpace: 'nowrap' }}>🎯 Simulation Bac</Link>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </>
  )
}
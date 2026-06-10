'use client'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

// ══════════════════════════════════════════════════════════════════════
// ÉCONOMIE & GESTION — STMG (Première & Terminale) — Page détail
// Route : /bac-france/eco-gestion/stmg
// Voie technologique · Sciences et Technologies du Management et de la Gestion
// Équivalent le plus proche de la section Économie-Gestion tunisienne
// ══════════════════════════════════════════════════════════════════════

type Chap = {
  id: string; num: string; titre: string; couleur: string; icone: string; tag: string
  notions?: string[]
  souschap?: { titre: string; notions: string[]; formules?: { f: string; desc: string }[] }[]
}

const CHAPITRES: Chap[] = [
  {
    id: 'management',
    num: '1', titre: 'Management', couleur: '#8b5cf6', icone: '🏢', tag: 'Tronc commun',
    notions: ['Organisation', 'Entreprise & finalités', 'Décision', 'Stratégie', 'Performance', 'Parties prenantes'],
  },
  {
    id: 'sciences-gestion-numerique',
    num: '2', titre: 'Sciences de gestion et numérique', couleur: '#6366f1', icone: '💻', tag: 'Tronc commun',
    notions: ['Système d\'information', 'Bases de données', 'Communication numérique', 'Gestion des données', 'Transformation numérique'],
  },
  {
    id: 'droit',
    num: '3', titre: 'Droit', couleur: '#f59e0b', icone: '⚖️', tag: 'Tronc commun',
    notions: ['Personne juridique', 'Contrat', 'Responsabilité', 'Droit du travail', 'Droit de l\'entreprise'],
  },
  {
    id: 'economie',
    num: '4', titre: 'Économie', couleur: '#06b6d4', icone: '📈', tag: 'Tronc commun',
    notions: ['Marché', 'Croissance', 'Chômage', 'Mondialisation', 'Politiques économiques'],
  },
  {
    id: 'gestion-finance',
    num: '5', titre: 'Gestion et Finance', couleur: '#10b981', icone: '💰', tag: 'Spécialité · Terminale',
    souschap: [
      {
        titre: '5.1 Comptabilité & analyse financière',
        notions: ['Comptabilité', 'Bilan', 'Compte de résultat', 'Analyse financière'],
        formules: [
          { f: 'FDR = Capitaux permanents − Actif immobilisé', desc: 'Fonds de roulement' },
          { f: 'BFR = Actif circulant − Passif circulant', desc: 'Besoin en fonds de roulement' },
          { f: 'TN = FDR − BFR', desc: 'Trésorerie nette' },
        ],
      },
      {
        titre: '5.2 Trésorerie, investissement & financement',
        notions: ['Trésorerie', 'Investissement', 'Rentabilité', 'Budget', 'Financement'],
        formules: [
          { f: 'Seuil de rentabilité = Charges fixes / Taux de MCV', desc: 'Point mort (CA)' },
        ],
      },
    ],
  },
]

export default function EcoGestionSTMGPage() {
  return (
    <>
      <Navbar />
      <main style={{ position: 'relative', zIndex: 1, paddingTop: 80 }}>
        <div className="container" style={{ paddingTop: 40, paddingBottom: 80 }}>

          <div style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 12, color: 'var(--muted)', marginBottom: 24, flexWrap: 'wrap' }}>
            <Link href="/bac-france" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇫🇷 France</Link>
            <span>›</span>
            <Link href="/bac-france/eco-gestion" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Économie & Gestion</Link>
            <span>›</span>
            <span style={{ color: '#a78bfa' }}>STMG</span>
          </div>

          <div style={{ marginBottom: 40 }}>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 14, flexWrap: 'wrap' }}>
              <span className="label">🏢 STMG · Première & Terminale</span>
              <span style={{ fontSize: 11, padding: '3px 10px', borderRadius: 20, background: 'rgba(139,92,246,0.2)', color: '#a78bfa', fontWeight: 800 }}>⭐ BAC 2027 · Voie technologique</span>
            </div>
            <h1 style={{ fontSize: 'clamp(24px,3.5vw,42px)', marginBottom: 14 }}>
              Économie & Gestion<br />
              <span style={{ background: 'linear-gradient(90deg,#8b5cf6,#14b8a6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                STMG — Management & Gestion
              </span>
            </h1>
            <p style={{ maxWidth: 640, color: 'var(--text2)', fontSize: 13, lineHeight: 1.7, marginBottom: 16 }}>
              Sciences et Technologies du Management et de la Gestion — l’équivalent le plus proche
              de la section Économie-Gestion tunisienne.
            </p>
            <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', fontSize: 13, color: 'var(--muted)', marginBottom: 20 }}>
              <span>📚 5 disciplines</span><span>·</span>
              <span>📈 60+ notions</span><span>·</span>
              <span>📝 70+ exercices</span><span>·</span>
              <span>🎯 Management · Droit · Éco · Gestion-Finance</span>
            </div>

            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <Link href="/solve" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '9px 18px', borderRadius: 10, background: 'linear-gradient(135deg,#8b5cf6,#6366f1)', color: 'white', fontSize: 13, fontWeight: 700, textDecoration: 'none' }}>🧮 Solveur Gestion</Link>
              <Link href="/chat" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '9px 18px', borderRadius: 10, background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.14)', color: 'var(--text)', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>🤖 Chat Prof</Link>
              <Link href="/simulation-france" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '9px 18px', borderRadius: 10, background: 'rgba(20,184,166,0.1)', border: '1px solid rgba(20,184,166,0.3)', color: '#2dd4bf', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>🎯 Simulation Bac</Link>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {CHAPITRES.map(ch => (
              <div key={ch.id} style={{ background: `${ch.couleur}08`, border: `1px solid ${ch.couleur}28`, borderRadius: 18, overflow: 'hidden' }}>
                <div style={{ background: `${ch.couleur}14`, borderBottom: `1px solid ${ch.couleur}20`, padding: '18px 24px', display: 'flex', gap: 14, alignItems: 'center' }}>
                  <div style={{ width: 48, height: 48, borderRadius: 13, background: `${ch.couleur}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, flexShrink: 0 }}>{ch.icone}</div>
                  <div>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap', marginBottom: 3 }}>
                      <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: ch.couleur, fontWeight: 700 }}>D.{ch.num}</span>
                      <h2 style={{ fontSize: 17, fontWeight: 800, color: 'var(--text)', margin: 0 }}>{ch.titre}</h2>
                      <span style={{ fontSize: 10, padding: '2px 9px', borderRadius: 20, background: `${ch.couleur}20`, color: ch.couleur, fontWeight: 700 }}>{ch.tag}</span>
                    </div>
                  </div>
                </div>

                <div style={{ padding: '18px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {ch.notions && !ch.souschap && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
                      {ch.notions.map(n => (
                        <span key={n} style={{ fontSize: 12, padding: '4px 12px', borderRadius: 20, background: `${ch.couleur}12`, color: 'var(--text2)', border: `1px solid ${ch.couleur}20` }}>{n}</span>
                      ))}
                    </div>
                  )}
                  {ch.souschap?.map(sc => (
                    <div key={sc.titre} style={{ background: 'rgba(0,0,0,0.12)', borderRadius: 12, padding: '14px 18px' }}>
                      <div style={{ fontWeight: 700, fontSize: 13, color: ch.couleur, marginBottom: 10 }}>{sc.titre}</div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: sc.formules?.length ? 12 : 0 }}>
                        {sc.notions.map(n => (
                          <span key={n} style={{ fontSize: 11, padding: '3px 10px', borderRadius: 18, background: `${ch.couleur}12`, color: 'var(--text2)', border: `1px solid ${ch.couleur}18` }}>{n}</span>
                        ))}
                      </div>
                      {sc.formules && sc.formules.length > 0 && (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                          {sc.formules.map(f => (
                            <div key={f.f} style={{ background: `${ch.couleur}18`, border: `1px solid ${ch.couleur}30`, borderRadius: 10, padding: '8px 14px' }}>
                              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: ch.couleur, fontWeight: 700, marginBottom: 2 }}>{f.f}</div>
                              <div style={{ fontSize: 10, color: 'var(--muted)' }}>{f.desc}</div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}

                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    <Link href={`/bac-france/eco-gestion/stmg/${ch.id}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '7px 14px', borderRadius: 9, background: 'linear-gradient(135deg,#8b5cf6,#6366f1)', border: '1px solid #8b5cf6', color: 'white', fontSize: 12, fontWeight: 700, textDecoration: 'none' }}>📖 Voir le cours complet →</Link>
                    <Link href={`/solve?q=Exercice+de+STMG+:+${encodeURIComponent(ch.titre)}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '7px 14px', borderRadius: 9, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'var(--muted)', fontSize: 12, fontWeight: 600, textDecoration: 'none' }}>🧮 Résoudre un exercice</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 48, display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/bac-france/eco-gestion/terminale" style={{ padding: '10px 20px', borderRadius: 12, border: '1px solid rgba(245,158,11,0.3)', background: 'rgba(245,158,11,0.08)', color: '#fbbf24', fontSize: 13, fontWeight: 700, textDecoration: 'none' }}>← Terminale Spé SES</Link>
            <Link href="/bac-france/eco-gestion" style={{ padding: '10px 20px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.05)', color: 'var(--text2)', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>↑ Toutes les voies</Link>
          </div>

        </div>
      </main>
      <Footer />
    </>
  )
}
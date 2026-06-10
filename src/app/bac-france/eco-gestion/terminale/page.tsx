'use client'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

// ══════════════════════════════════════════════════════════════════════
// ÉCONOMIE & GESTION — TERMINALE Générale (Spécialité SES) — Page détail
// Route : /bac-france/eco-gestion/terminale
// Programme officiel MEN — Bac 2027 · Coef. 16
// ══════════════════════════════════════════════════════════════════════

type Chap = {
  id: string; num: string; titre: string; couleur: string; icone: string; tag: string
  notions?: string[]
  souschap?: { titre: string; notions: string[]; formules?: { f: string; desc: string }[] }[]
}

const CHAPITRES: Chap[] = [
  {
    id: 'sources-defis-croissance',
    num: '1', titre: 'Sources et défis de la croissance économique', couleur: '#10b981', icone: '📈', tag: 'Économie',
    souschap: [
      { titre: '1.1 Les sources de la croissance', notions: ['Facteur travail', 'Facteur capital', 'Progrès technique', 'Innovation (Schumpeter)', 'Productivité globale des facteurs'] },
      { titre: '1.2 Les défis de la croissance', notions: ['Développement durable', 'Épuisement des ressources', 'Croissance soutenable', 'Externalités environnementales'],
        formules: [{ f: 'Taux de croissance = (PIBₙ − PIBₙ₋₁) / PIBₙ₋₁ × 100', desc: 'Croissance du PIB réel' }] },
    ],
  },
  {
    id: 'commerce-international',
    num: '2', titre: 'Le commerce international', couleur: '#06b6d4', icone: '🌍', tag: 'Économie',
    notions: ['Avantages comparatifs (Ricardo)', 'Libre-échange', 'Protectionnisme', 'Mondialisation', 'Division internationale du travail', 'Firmes multinationales'],
  },
  {
    id: 'chomage-politiques-emploi',
    num: '3', titre: 'Chômage et politiques de l\'emploi', couleur: '#0ea5e9', icone: '💼', tag: 'Économie',
    souschap: [
      { titre: '3.1 Le marché du travail & le chômage', notions: ['Marché du travail', 'Chômage structurel', 'Chômage conjoncturel', 'Chômage frictionnel'],
        formules: [{ f: 'Taux de chômage = Chômeurs / Population active × 100', desc: 'Mesure du chômage (BIT)' }] },
      { titre: '3.2 Les politiques de l\'emploi', notions: ['Politiques actives / passives', 'Flexibilité', 'Baisse du coût du travail', 'Formation'] },
    ],
  },
  {
    id: 'crises-financieres',
    num: '4', titre: 'Les crises financières', couleur: '#f59e0b', icone: '📉', tag: 'Économie',
    notions: ['Banque & crédit', 'Bulles spéculatives', 'Aléa moral', 'Risque systémique', 'Régulation financière', 'Krach'],
  },
  {
    id: 'politiques-economiques-europeennes',
    num: '5', titre: 'Les politiques économiques européennes', couleur: '#6366f1', icone: '🇪🇺', tag: 'Économie',
    notions: ['Banque Centrale Européenne', 'Politique monétaire', 'Politique budgétaire', 'Budget public', 'Union économique et monétaire', 'Policy mix'],
  },
  {
    id: 'structure-sociale',
    num: '6', titre: 'La structure sociale et les inégalités', couleur: '#8b5cf6', icone: '👥', tag: 'Sociologie',
    notions: ['Classes sociales', 'Groupes sociaux', 'CSP', 'Stratification sociale', 'Inégalités économiques & sociales', 'Mobilité sociale'],
  },
  {
    id: 'ecole-mobilite-sociale',
    num: '7', titre: 'École et mobilité sociale', couleur: '#a855f7', icone: '🎓', tag: 'Sociologie',
    notions: ['Égalité des chances', 'Réussite scolaire', 'Capital culturel (Bourdieu)', 'Reproduction sociale', 'Démocratisation scolaire', 'Méritocratie', 'Ascension sociale'],
  },
  {
    id: 'mutations-travail-emploi',
    num: '8', titre: 'Mutations du travail et de l\'emploi', couleur: '#ec4899', icone: '🛠️', tag: 'Sociologie',
    notions: ['Salariat', 'Précarité', 'Flexibilité', 'Numérisation', 'Télétravail', 'Transformation des métiers'],
  },
  {
    id: 'engagement-politique',
    num: '9', titre: 'L\'engagement politique', couleur: '#f43f5e', icone: '🗳️', tag: 'Science politique',
    notions: ['Participation politique', 'Vote', 'Abstention', 'Manifestation', 'Syndicats', 'Associations', 'Engagement numérique'],
  },
  {
    id: 'justice-sociale-inegalites',
    num: '10', titre: 'Justice sociale et inégalités', couleur: '#14b8a6', icone: '⚖️', tag: 'Regards croisés',
    notions: ['Égalité', 'Équité', 'Redistribution', 'Revenus & patrimoine', 'Discrimination', 'Politiques de lutte contre les inégalités'],
  },
]

export default function EcoGestionTerminalePage() {
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
            <span style={{ color: '#fbbf24' }}>Terminale Spé SES</span>
          </div>

          <div style={{ marginBottom: 40 }}>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 14, flexWrap: 'wrap' }}>
              <span className="label">📊 Terminale Générale · Spécialité SES</span>
              <span style={{ fontSize: 11, padding: '3px 10px', borderRadius: 20, background: 'rgba(245,158,11,0.2)', color: '#fbbf24', fontWeight: 800 }}>⭐ BAC 2027 · Coef. 16</span>
            </div>
            <h1 style={{ fontSize: 'clamp(24px,3.5vw,42px)', marginBottom: 14 }}>
              Économie & Gestion<br />
              <span style={{ background: 'linear-gradient(90deg,#f59e0b,#14b8a6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Terminale — Spécialité SES
              </span>
            </h1>
            <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', fontSize: 13, color: 'var(--muted)', marginBottom: 20 }}>
              <span>📚 10 chapitres</span><span>·</span>
              <span>📈 80+ notions</span><span>·</span>
              <span>📝 95+ exercices</span><span>·</span>
              <span>🎯 Grand Oral · EC · Dissertation</span>
            </div>

            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <Link href="/solve" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '9px 18px', borderRadius: 10, background: 'linear-gradient(135deg,#f59e0b,#d97706)', color: 'white', fontSize: 13, fontWeight: 700, textDecoration: 'none' }}>🧮 Solveur SES</Link>
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
                      <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: ch.couleur, fontWeight: 700 }}>CH.{ch.num}</span>
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
                    <Link href={`/bac-france/eco-gestion/terminale/${ch.id}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '7px 14px', borderRadius: 9, background: 'linear-gradient(135deg,#f59e0b,#d97706)', border: '1px solid #f59e0b', color: 'white', fontSize: 12, fontWeight: 700, textDecoration: 'none' }}>📖 Voir le cours complet →</Link>
                    <Link href={`/solve?q=Exercice+de+SES+terminale+:+${encodeURIComponent(ch.titre)}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '7px 14px', borderRadius: 9, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'var(--muted)', fontSize: 12, fontWeight: 600, textDecoration: 'none' }}>🧮 Résoudre un exercice</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 48, display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/bac-france/eco-gestion/premiere" style={{ padding: '10px 20px', borderRadius: 12, border: '1px solid rgba(79,110,247,0.3)', background: 'rgba(79,110,247,0.08)', color: '#818cf8', fontSize: 13, fontWeight: 700, textDecoration: 'none' }}>← Première Spé SES</Link>
            <Link href="/bac-france/eco-gestion/stmg" style={{ padding: '10px 20px', borderRadius: 12, border: '1px solid rgba(139,92,246,0.3)', background: 'rgba(139,92,246,0.08)', color: '#a78bfa', fontSize: 13, fontWeight: 700, textDecoration: 'none' }}>Voie STMG →</Link>
            <Link href="/bac-france/eco-gestion" style={{ padding: '10px 20px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.05)', color: 'var(--text2)', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>↑ Toutes les voies</Link>
          </div>

        </div>
      </main>
      <Footer />
    </>
  )
}
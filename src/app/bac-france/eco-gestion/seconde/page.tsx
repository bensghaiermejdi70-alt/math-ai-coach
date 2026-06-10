'use client'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

// ══════════════════════════════════════════════════════════════════════
// ÉCONOMIE & GESTION — SECONDE (SES tronc commun) — Page détail
// Route : /bac-france/eco-gestion/seconde
// Programme officiel MEN — Sciences Économiques et Sociales
// ══════════════════════════════════════════════════════════════════════

type Chap = {
  id: string; num: string; titre: string; couleur: string; icone: string; tag: string
  notions?: string[]
  souschap?: { titre: string; notions: string[]; formules?: { f: string; desc: string }[] }[]
}

const CHAPITRES: Chap[] = [
  {
    id: 'richesses-creation-mesure',
    num: '1',
    titre: 'Comment crée-t-on des richesses et comment les mesure-t-on ?',
    couleur: '#10b981',
    icone: '💰',
    tag: 'Économie',
    notions: [
      'Production marchande / non marchande',
      'Entreprise & facteurs de production',
      'Valeur ajoutée = Production − Consommations intermédiaires',
      'PIB (somme des valeurs ajoutées)',
      'Croissance économique & taux de croissance',
      'Répartition des richesses (revenus primaires)',
      'Productivité = Production / quantité de facteurs',
    ],
  },
  {
    id: 'formation-prix-marche',
    num: '2',
    titre: 'Comment se forment les prix sur un marché ?',
    couleur: '#06b6d4',
    icone: '📈',
    tag: 'Économie',
    notions: [
      'Offre & loi de l\'offre',
      'Demande & loi de la demande',
      'Prix d\'équilibre (offre = demande)',
      'Marché concurrentiel',
      'Agents économiques',
      'Variations des prix (déplacements de l\'offre et de la demande)',
    ],
  },
  {
    id: 'socialisation-acteurs-sociaux',
    num: '3',
    titre: 'Comment devenons-nous des acteurs sociaux ?',
    couleur: '#8b5cf6',
    icone: '👥',
    tag: 'Sociologie',
    notions: [
      'Socialisation primaire',
      'Normes sociales',
      'Valeurs',
      'Rôle de la famille',
      'Rôle de l\'école',
      'Groupe social & groupe de pairs',
    ],
  },
  {
    id: 'organisation-vie-politique',
    num: '4',
    titre: 'Comment s\'organise la vie politique ?',
    couleur: '#f59e0b',
    icone: '🏛️',
    tag: 'Science politique',
    notions: [
      'Démocratie représentative',
      'Citoyenneté',
      'Le vote & le droit de vote',
      'Institutions politiques',
      'Participation politique',
    ],
  },
  {
    id: 'diplome-emploi-salaire',
    num: '5',
    titre: 'Diplôme, emploi et salaire',
    couleur: '#f43f5e',
    icone: '🎓',
    tag: 'Regards croisés',
    notions: [
      'Qualification',
      'Emploi & marché du travail',
      'Chômage',
      'Salaire & rémunération',
      'Insertion professionnelle',
    ],
  },
]

export default function EcoGestionSecondePage() {
  return (
    <>
      <Navbar />
      <main style={{ position: 'relative', zIndex: 1, paddingTop: 80 }}>
        <div className="container" style={{ paddingTop: 40, paddingBottom: 80 }}>

          {/* Fil d'Ariane */}
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 12, color: 'var(--muted)', marginBottom: 24, flexWrap: 'wrap' }}>
            <Link href="/bac-france" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇫🇷 France</Link>
            <span>›</span>
            <Link href="/bac-france/eco-gestion" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Économie & Gestion</Link>
            <span>›</span>
            <span style={{ color: '#34d399' }}>Seconde</span>
          </div>

          {/* HEADER */}
          <div style={{ marginBottom: 40 }}>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 14, flexWrap: 'wrap' }}>
              <span className="label">📊 Seconde Générale & Technologique · SES</span>
              <span style={{ fontSize: 11, padding: '3px 10px', borderRadius: 20, background: 'rgba(16,185,129,0.2)', color: '#34d399', fontWeight: 800 }}>Tronc commun · 1h30/semaine</span>
            </div>
            <h1 style={{ fontSize: 'clamp(24px,3.5vw,42px)', marginBottom: 14 }}>
              Économie & Gestion<br />
              <span style={{ background: 'linear-gradient(90deg,#10b981,#06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Seconde — Sciences Économiques et Sociales
              </span>
            </h1>
            <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', fontSize: 13, color: 'var(--muted)', marginBottom: 20 }}>
              <span>📚 5 chapitres</span><span>·</span>
              <span>📈 40+ notions</span><span>·</span>
              <span>📝 50+ exercices</span><span>·</span>
              <span>🎯 Économie · Sociologie · Science politique</span>
            </div>

            {/* Actions rapides */}
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <Link href="/solve" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '9px 18px', borderRadius: 10, background: 'linear-gradient(135deg,#14b8a6,#06b6d4)', color: 'white', fontSize: 13, fontWeight: 700, textDecoration: 'none' }}>
                🧮 Solveur SES
              </Link>
              <Link href="/chat" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '9px 18px', borderRadius: 10, background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.14)', color: 'var(--text)', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>
                🤖 Chat Prof
              </Link>
              <Link href="/simulation-france" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '9px 18px', borderRadius: 10, background: 'rgba(20,184,166,0.1)', border: '1px solid rgba(20,184,166,0.3)', color: '#2dd4bf', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>
                🎯 Simulation Bac
              </Link>
            </div>
          </div>

          {/* CHAPITRES */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {CHAPITRES.map(ch => (
              <div key={ch.id} style={{ background: `${ch.couleur}08`, border: `1px solid ${ch.couleur}28`, borderRadius: 18, overflow: 'hidden' }}>

                {/* En-tête chapitre */}
                <div style={{ background: `${ch.couleur}14`, borderBottom: `1px solid ${ch.couleur}20`, padding: '18px 24px', display: 'flex', gap: 14, alignItems: 'center' }}>
                  <div style={{ width: 48, height: 48, borderRadius: 13, background: `${ch.couleur}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, flexShrink: 0 }}>
                    {ch.icone}
                  </div>
                  <div>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap', marginBottom: 3 }}>
                      <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: ch.couleur, fontWeight: 700 }}>CH.{ch.num}</span>
                      <h2 style={{ fontSize: 17, fontWeight: 800, color: 'var(--text)', margin: 0 }}>{ch.titre}</h2>
                      <span style={{ fontSize: 10, padding: '2px 9px', borderRadius: 20, background: `${ch.couleur}20`, color: ch.couleur, fontWeight: 700 }}>{ch.tag}</span>
                    </div>
                  </div>
                </div>

                {/* Notions / Sous-chapitres */}
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

                  {/* Boutons */}
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    <Link href={`/bac-france/eco-gestion/seconde/${ch.id}`}
                      style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '7px 14px', borderRadius: 9, background: 'linear-gradient(135deg,#10b981,#059669)', border: '1px solid #10b981', color: 'white', fontSize: 12, fontWeight: 700, textDecoration: 'none' }}>
                      📖 Voir le cours complet →
                    </Link>
                    <Link href={`/solve?q=Exercice+de+SES+seconde+:+${encodeURIComponent(ch.titre)}`}
                      style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '7px 14px', borderRadius: 9, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'var(--muted)', fontSize: 12, fontWeight: 600, textDecoration: 'none' }}>
                      🧮 Résoudre un exercice
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation */}
          <div style={{ marginTop: 48, display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/bac-france/eco-gestion/premiere" style={{ padding: '10px 20px', borderRadius: 12, border: '1px solid rgba(79,110,247,0.3)', background: 'rgba(79,110,247,0.08)', color: '#818cf8', fontSize: 13, fontWeight: 700, textDecoration: 'none' }}>
              Première Spé SES →
            </Link>
            <Link href="/bac-france/eco-gestion" style={{ padding: '10px 20px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.05)', color: 'var(--text2)', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>
              ↑ Toutes les voies
            </Link>
          </div>

        </div>
      </main>
      <Footer />
    </>
  )
}
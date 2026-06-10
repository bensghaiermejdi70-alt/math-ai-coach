'use client'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

// ══════════════════════════════════════════════════════════════════════
// ÉCONOMIE & GESTION — PREMIÈRE Générale (Spécialité SES) — Page détail
// Route : /bac-france/eco-gestion/premiere
// Programme officiel MEN — Sciences Économiques et Sociales
// ══════════════════════════════════════════════════════════════════════

type Chap = {
  id: string; num: string; titre: string; couleur: string; icone: string; tag: string
  notions?: string[]
  souschap?: { titre: string; notions: string[]; formules?: { f: string; desc: string }[] }[]
}

const CHAPITRES: Chap[] = [
  {
    id: 'marche-concurrentiel',
    num: '1', titre: 'Le marché concurrentiel', couleur: '#10b981', icone: '💰', tag: 'Économie',
    notions: ['Offre & demande', 'Équilibre de marché', 'Concurrence parfaite', 'Formation des prix', 'Surplus du consommateur / producteur', 'Élasticité-prix'],
  },
  {
    id: 'defaillances-marche',
    num: '2', titre: 'Les défaillances du marché', couleur: '#06b6d4', icone: '⚠️', tag: 'Économie',
    notions: ['Externalités positives / négatives', 'Biens publics', 'Pollution & environnement', 'Asymétries d\'information', 'Intervention de l\'État', 'Taxes & réglementation'],
  },
  {
    id: 'financement-economie',
    num: '3', titre: 'Le financement de l\'économie', couleur: '#0ea5e9', icone: '🏦', tag: 'Économie',
    notions: ['Épargne', 'Crédit', 'Banques', 'Marchés financiers', 'Financement direct / indirect', 'Taux d\'intérêt'],
  },
  {
    id: 'monnaie',
    num: '4', titre: 'La monnaie & sa création', couleur: '#f59e0b', icone: '🪙', tag: 'Économie',
    souschap: [
      {
        titre: '4.1 Fonctions & formes de la monnaie',
        notions: ['Unité de compte', 'Réserve de valeur', 'Intermédiaire des échanges', 'Monnaie fiduciaire / scripturale'],
      },
      {
        titre: '4.2 Création monétaire & inflation',
        notions: ['Création monétaire par le crédit', 'Banque centrale', 'Masse monétaire', 'Inflation & pouvoir d\'achat'],
        formules: [
          { f: 'Inflation = (IPCₙ − IPCₙ₋₁) / IPCₙ₋₁ × 100', desc: 'Taux d\'inflation annuel' },
        ],
      },
    ],
  },
  {
    id: 'socialisation',
    num: '5', titre: 'La socialisation', couleur: '#8b5cf6', icone: '👥', tag: 'Sociologie',
    souschap: [
      { titre: '5.1 Les processus de socialisation', notions: ['Définition', 'Normes sociales', 'Valeurs', 'Apprentissage social', 'Intégration sociale'] },
      { titre: '5.2 Les instances de socialisation', notions: ['Famille', 'École', 'Groupe de pairs', 'Médias', 'Réseaux sociaux'] },
      { titre: '5.3 Diversité des socialisations', notions: ['Selon le sexe', 'Selon le milieu social', 'Selon la culture', 'Primaire / secondaire'] },
    ],
  },
  {
    id: 'liens-sociaux',
    num: '6', titre: 'Les liens sociaux', couleur: '#a855f7', icone: '🔗', tag: 'Sociologie',
    souschap: [
      { titre: '6.1 Les formes des liens sociaux', notions: ['Lien de filiation', 'Participation élective', 'Participation organique', 'Lien de citoyenneté'] },
      { titre: '6.2 Le rôle des liens sociaux', notions: ['Cohésion sociale', 'Solidarité', 'Intégration sociale', 'Sentiment d\'appartenance'] },
      { titre: '6.3 La fragilisation des liens', notions: ['Isolement social', 'Exclusion sociale', 'Précarité', 'Rupture des liens'] },
    ],
  },
  {
    id: 'deviance-controle-social',
    num: '7', titre: 'Déviance et contrôle social', couleur: '#ec4899', icone: '⚖️', tag: 'Sociologie',
    souschap: [
      { titre: '7.1 La déviance', notions: ['Définition', 'Transgression des normes', 'Délinquance', 'Déviance positive / négative'] },
      { titre: '7.2 Les explications de la déviance', notions: ['Anomie', 'Stigmatisation', 'Contrôle social insuffisant', 'Influence du groupe'] },
      { titre: '7.3 Le contrôle social', notions: ['Contrôle formel / informel', 'Sanctions positives / négatives', 'Rôle des institutions'] },
    ],
  },
  {
    id: 'opinion-publique-vote',
    num: '8', titre: 'Opinion publique et vote', couleur: '#f43f5e', icone: '🗳️', tag: 'Science politique',
    souschap: [
      { titre: '8.1 Formation de l\'opinion publique', notions: ['Opinion publique', 'Médias', 'Réseaux sociaux', 'Sondages', 'Influence politique'] },
      { titre: '8.2 Les comportements électoraux', notions: ['Participation', 'Abstention', 'Vote de classe', 'Vote d\'adhésion', 'Vote de contestation'] },
      { titre: '8.3 Facteurs explicatifs du vote', notions: ['Âge', 'Sexe', 'Niveau d\'études', 'CSP', 'Influence familiale'] },
    ],
  },
  {
    id: 'protection-sociale-risques',
    num: '9', titre: 'Protection sociale et gestion des risques', couleur: '#14b8a6', icone: '🛡️', tag: 'Regards croisés',
    souschap: [
      { titre: '9.1 Les risques sociaux', notions: ['Maladie', 'Vieillesse', 'Chômage', 'Invalidité', 'Accidents du travail'] },
      { titre: '9.2 La protection sociale', notions: ['Sécurité sociale', 'Assurance maladie', 'Retraites', 'Allocations familiales', 'Assurance chômage'] },
      { titre: '9.3 Les défis de la protection sociale', notions: ['Vieillissement', 'Déficits sociaux', 'Financement', 'Réformes', 'Solidarité nationale'] },
    ],
  },
]

export default function EcoGestionPremierePage() {
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
            <span style={{ color: '#818cf8' }}>Première Spé SES</span>
          </div>

          <div style={{ marginBottom: 40 }}>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 14, flexWrap: 'wrap' }}>
              <span className="label">📊 Première Générale · Spécialité SES</span>
              <span style={{ fontSize: 11, padding: '3px 10px', borderRadius: 20, background: 'rgba(79,110,247,0.2)', color: '#818cf8', fontWeight: 800 }}>Spécialité · 4h/semaine</span>
            </div>
            <h1 style={{ fontSize: 'clamp(24px,3.5vw,42px)', marginBottom: 14 }}>
              Économie & Gestion<br />
              <span style={{ background: 'linear-gradient(90deg,#4f6ef7,#14b8a6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Première — Spécialité SES
              </span>
            </h1>
            <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', fontSize: 13, color: 'var(--muted)', marginBottom: 20 }}>
              <span>📚 9 chapitres</span><span>·</span>
              <span>📈 70+ notions</span><span>·</span>
              <span>📝 85+ exercices</span><span>·</span>
              <span>🎯 Économie · Sociologie · Science politique</span>
            </div>

            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <Link href="/solve" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '9px 18px', borderRadius: 10, background: 'linear-gradient(135deg,#4f6ef7,#7c3aed)', color: 'white', fontSize: 13, fontWeight: 700, textDecoration: 'none' }}>🧮 Solveur SES</Link>
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
                    <Link href={`/bac-france/eco-gestion/premiere/${ch.id}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '7px 14px', borderRadius: 9, background: 'linear-gradient(135deg,#4f6ef7,#7c3aed)', border: '1px solid #4f6ef7', color: 'white', fontSize: 12, fontWeight: 700, textDecoration: 'none' }}>📖 Voir le cours complet →</Link>
                    <Link href={`/solve?q=Exercice+de+SES+premiere+:+${encodeURIComponent(ch.titre)}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '7px 14px', borderRadius: 9, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'var(--muted)', fontSize: 12, fontWeight: 600, textDecoration: 'none' }}>🧮 Résoudre un exercice</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 48, display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/bac-france/eco-gestion/seconde" style={{ padding: '10px 20px', borderRadius: 12, border: '1px solid rgba(16,185,129,0.3)', background: 'rgba(16,185,129,0.08)', color: '#34d399', fontSize: 13, fontWeight: 700, textDecoration: 'none' }}>← Seconde</Link>
            <Link href="/bac-france/eco-gestion/terminale" style={{ padding: '10px 20px', borderRadius: 12, border: '1px solid rgba(245,158,11,0.3)', background: 'rgba(245,158,11,0.08)', color: '#fbbf24', fontSize: 13, fontWeight: 700, textDecoration: 'none' }}>Terminale Spé SES →</Link>
            <Link href="/bac-france/eco-gestion" style={{ padding: '10px 20px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.05)', color: 'var(--text2)', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>↑ Toutes les voies</Link>
          </div>

        </div>
      </main>
      <Footer />
    </>
  )
}
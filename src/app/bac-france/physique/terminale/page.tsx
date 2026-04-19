'use client'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

// ══════════════════════════════════════════════════════════════════════
// PHYSIQUE-CHIMIE TERMINALE — Page détail
// Route : /bac-france/physique/terminale
// Programme officiel 2019 — Bac 2026/2027
// ══════════════════════════════════════════════════════════════════════

const CHAPITRES = [
  {
    id: 'mesures-incertitudes',
    num: '0',
    titre: 'Mesures & Incertitudes',
    couleur: '#6b7280',
    icone: '📏',
    tag: 'Transversal',
    notions: [
      'Variabilité de la mesure, histogramme, moyenne, écart-type',
      'Incertitude-type (type A et B)',
      'Incertitude-type composée',
      'Critère quantitatif de comparaison',
      'Chiffres significatifs',
    ],
    formules: [],
  },
  {
    id: 'cinetique-equilibre',
    num: '1',
    titre: 'Constitution & Transformations de la Matière',
    couleur: '#10b981',
    icone: '⚗️',
    tag: 'Chimie',
    souschap: [
      {
        titre: '1.1 Composition d\'un système — Dosages',
        notions: ['Spectrophotométrie UV-visible','Conductimétrie','Titrages : pH-métrie, conductimétrie, colorimétrie','Équivalence, réactif limitant'],
      },
      {
        titre: '1.2 Suivi temporel — Cinétique',
        notions: ['Vitesse de réaction','Facteurs cinétiques (concentration, température, catalyse)','Évolution des concentrations','Temps de demi-réaction t₁/₂'],
      },
      {
        titre: '1.3 Équilibres chimiques',
        notions: ['Réactions limitées, quotient de réaction Qr','Constante d\'équilibre K','Évolution spontanée vers l\'équilibre','Déplacement d\'équilibre (Le Chatelier)'],
      },
      {
        titre: '1.4 Transformations nucléaires',
        notions: ['Stabilité des noyaux, diagramme N,Z','Radioactivité α, β⁻, β⁺, γ','Lois de conservation (A, Z)','Loi de décroissance : N(t) = N₀·e^(−λt)','Temps de demi-vie t₁/₂ = ln2/λ','Datation, applications médicales'],
        formules: [
          { f: 'N(t) = N₀·e^(−λt)', desc: 'Loi de décroissance radioactive' },
          { f: 't₁/₂ = ln2/λ', desc: 'Temps de demi-vie' },
          { f: 'A(t) = A₀·e^(−λt)', desc: 'Activité radioactive' },
        ],
      },
    ],
  },
  {
    id: 'deuxieme-loi-newton',
    num: '2',
    titre: 'Mouvement & Interactions',
    couleur: '#4f6ef7',
    icone: '🚀',
    tag: 'Mécanique',
    souschap: [
      {
        titre: '2.1 Décrire un mouvement',
        notions: ['Vecteur position, vecteur vitesse (dérivée)','Vecteur accélération','Mouvement rectiligne, circulaire','Représentation paramétrique'],
        formules: [
          { f: 'v⃗ = dr⃗/dt', desc: 'Vecteur vitesse' },
          { f: 'a⃗ = dv⃗/dt', desc: 'Vecteur accélération' },
        ],
      },
      {
        titre: '2.2 Deuxième loi de Newton',
        notions: ['Relation ΣF⃗ = m·a⃗','Mouvement dans un champ uniforme (pesanteur, électrique)','Mouvement dans un champ gravitationnel newtonien','Satellites, planètes, vitesse de libération','3ème loi de Newton (action-réaction)'],
        formules: [
          { f: 'ΣF⃗ = m·a⃗', desc: '2ème loi de Newton' },
          { f: 'F = GMm/r²', desc: 'Loi de gravitation universelle' },
          { f: 'v = √(GM/r)', desc: 'Vitesse orbitale d\'un satellite' },
          { f: 'T² = (4π²/GM)·r³', desc: '3ème loi de Kepler' },
        ],
      },
      {
        titre: '2.3 Écoulement d\'un fluide',
        notions: ['Écoulement laminaire et turbulent','Débit volumique Qv, débit massique Qm','Relation de Bernoulli'],
        formules: [
          { f: 'P + ½ρv² + ρgh = cte', desc: 'Théorème de Bernoulli' },
          { f: 'Qv = S·v', desc: 'Débit volumique' },
        ],
      },
    ],
  },
  {
    id: 'gaz-parfait',
    num: '3',
    titre: 'Énergie : Conversions & Transferts',
    couleur: '#f59e0b',
    icone: '🔥',
    tag: 'Thermodynamique',
    souschap: [
      {
        titre: '3.1 Gaz parfait',
        notions: ['Modèle du gaz parfait','Équation d\'état : PV = nRT','Masse volumique, température thermodynamique, pression'],
        formules: [
          { f: 'PV = nRT', desc: 'Équation d\'état du gaz parfait' },
          { f: 'R = 8,314 J·mol⁻¹·K⁻¹', desc: 'Constante des gaz parfaits' },
        ],
      },
      {
        titre: '3.2 Premier principe de la thermodynamique',
        notions: ['Énergie interne d\'un système','Transfert thermique Q, travail W','Capacité thermique : Q = m·c·ΔT','Bilan énergétique','Temps caractéristique thermique'],
        formules: [
          { f: 'ΔU = W + Q', desc: '1er principe de la thermodynamique' },
          { f: 'Q = m·c·ΔT', desc: 'Capacité thermique' },
        ],
      },
      {
        titre: '3.3 Énergie chimique',
        notions: ['Énergie de liaison','Enthalpie de réaction ΔrH','Pouvoir calorifique, énergie de combustion'],
        formules: [
          { f: 'ΔrH = Σ E(liaisons rompues) − Σ E(liaisons formées)', desc: 'Enthalpie de réaction' },
        ],
      },
      {
        titre: '3.4 Bilan radiatif terrestre',
        notions: ['Rayonnement solaire, flux radiatif','Bilan thermique Terre-atmosphère','Effet de serre, albédo'],
      },
    ],
  },
  {
    id: 'diffraction-interferences',
    num: '4',
    titre: 'Ondes & Signaux',
    couleur: '#8b5cf6',
    icone: '🌊',
    tag: 'Physique des ondes',
    souschap: [
      {
        titre: '4.1 Propagation des ondes',
        notions: ['Diffraction (ouverture, obstacle)','Condition de diffraction : λ ≈ a','Interférences lumineuses','Différence de marche δ','Interfrange i = λ·D/a'],
        formules: [
          { f: 'i = λD/a', desc: 'Interfrange (double fente)' },
          { f: 'δ = k·λ → interfér. constructives', desc: 'Condition d\'interférences' },
        ],
      },
      {
        titre: '4.2 Effet Doppler',
        notions: ['Décalage Doppler (ondes mécanique et EM)','Fréquence perçue selon le mouvement','Applications : radar, vitesse, astrophysique (décalage vers le rouge)'],
        formules: [
          { f: 'f_obs = f_source × (1 ± v/c)', desc: 'Effet Doppler (approx. v<<c)' },
        ],
      },
      {
        titre: '4.3 Circuits en régime sinusoïdal',
        notions: ['Régime sinusoïdal forcé','Impédance Z, déphasage φ','Circuit RLC série','Résonance : ω₀ = 1/√(LC)','Bande passante, facteur de qualité Q'],
        formules: [
          { f: 'Z = √(R² + (Lω − 1/Cω)²)', desc: 'Impédance circuit RLC' },
          { f: 'ω₀ = 1/√(LC)', desc: 'Pulsation de résonance' },
          { f: 'Q = Lω₀/R = 1/(RC·ω₀)', desc: 'Facteur de qualité' },
        ],
      },
      {
        titre: '4.4 Circuit RC',
        notions: ['Charge et décharge d\'un condensateur','Temps caractéristique τ = RC','Équation différentielle 1er ordre','Capteurs capacitifs'],
        formules: [
          { f: 'τ = RC', desc: 'Constante de temps circuit RC' },
          { f: 'u_C(t) = E(1 − e^(−t/τ))', desc: 'Charge d\'un condensateur' },
          { f: 'u_C(t) = U₀·e^(−t/τ)', desc: 'Décharge d\'un condensateur' },
        ],
      },
    ],
  },
]

export default function PhysiqueTerminalePage() {
  return (
    <>
      <Navbar />
      <main style={{ position: 'relative', zIndex: 1, paddingTop: 80 }}>
        <div className="container" style={{ paddingTop: 40, paddingBottom: 80 }}>

          {/* Fil d'Ariane */}
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 12, color: 'var(--muted)', marginBottom: 24, flexWrap: 'wrap' }}>
            <Link href="/bac-france" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇫🇷 France</Link>
            <span>›</span>
            <Link href="/bac-france/physique" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Physique-Chimie</Link>
            <span>›</span>
            <span style={{ color: '#fbbf24' }}>Terminale Générale</span>
          </div>

          {/* HEADER */}
          <div style={{ marginBottom: 40 }}>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 14, flexWrap: 'wrap' }}>
              <span className="label">⚛️ Terminale Générale · Spécialité PC</span>
              <span style={{ fontSize: 11, padding: '3px 10px', borderRadius: 20, background: 'rgba(245,158,11,0.2)', color: '#fbbf24', fontWeight: 800 }}>⭐ BAC 2027 · Coef. 16</span>
            </div>
            <h1 style={{ fontSize: 'clamp(24px,3.5vw,42px)', marginBottom: 14 }}>
              Physique-Chimie<br />
              <span style={{ background: 'linear-gradient(90deg,#f59e0b,#06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Terminale Générale — Programme complet
              </span>
            </h1>
            <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', fontSize: 13, color: 'var(--muted)', marginBottom: 20 }}>
              <span>📚 16 chapitres</span><span>·</span>
              <span>📐 145+ formules</span><span>·</span>
              <span>📝 120+ exercices</span><span>·</span>
              <span>🔬 Épreuve pratique incluse</span>
            </div>

            {/* Actions rapides */}
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <Link href="/solve" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '9px 18px', borderRadius: 10, background: 'linear-gradient(135deg,#4f6ef7,#7c3aed)', color: 'white', fontSize: 13, fontWeight: 700, textDecoration: 'none' }}>
                🧮 Solveur PC
              </Link>
              <Link href="/chat" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '9px 18px', borderRadius: 10, background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.14)', color: 'var(--text)', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>
                🤖 Chat Prof
              </Link>
              <Link href="/simulation-france" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '9px 18px', borderRadius: 10, background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.3)', color: '#fbbf24', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>
                🎯 Simulation PC
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

                {/* Sous-chapitres */}
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

                  {/* Bouton résoudre */}
                  <div style={{ display: 'flex', gap: 8 }}>
                    <Link href={`/bac-france/physique/terminale/${ch.id}`}
                      style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '7px 14px', borderRadius: 9, background: `${ch.couleur}15`, border: `1px solid ${ch.couleur}30`, color: ch.couleur, fontSize: 12, fontWeight: 700, textDecoration: 'none' }}>
                      📖 Voir le cours complet →
                    </Link>
                    <Link href={`/solve?q=Exercice+de+physique+terminale+:+${encodeURIComponent(ch.titre)}`}
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
            <Link href="/bac-france/physique/premiere" style={{ padding: '10px 20px', borderRadius: 12, border: '1px solid rgba(79,110,247,0.3)', background: 'rgba(79,110,247,0.08)', color: '#818cf8', fontSize: 13, fontWeight: 700, textDecoration: 'none' }}>
              ← Première PC
            </Link>
            <Link href="/bac-france/physique" style={{ padding: '10px 20px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.05)', color: 'var(--text2)', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>
              ↑ Toutes les voies
            </Link>
          </div>

        </div>
      </main>
      <Footer />
    </>
  )
}
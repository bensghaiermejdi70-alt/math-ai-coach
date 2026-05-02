'use client'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

// ══════════════════════════════════════════════════════════════════════
// PHYSIQUE-CHIMIE TUNISIE — Section Informatique
// Route : /bac/physique/informatique
// Programme officiel MEN Tunisie · 4ème année Informatique
// ══════════════════════════════════════════════════════════════════════

const CHAPITRES = [
  // ── PHYSIQUE ──────────────────────────────────────────────────────────
  {
    id: 'condensateur-info',
    num: '1',
    titre: 'Condensateur',
    couleur: '#8b5cf6',
    icone: '⚡',
    tag: 'Physique',
    souschap: [
      { titre: 'Charge et décharge', notions: ['Charge q=CU','Décharge exponentielle','Courbes u_C(t)'] },
      { titre: 'Capacité et énergie', notions: ['Capacité C (Farads)','E=½CU²','Condensateur plan'] },
      { titre: 'Énergie électrostatique', notions: ['Stockage d\'énergie','Applications (flash, défibrillateur)'] },
    ],
    formules: [
      { f: 'q = C·U', desc: 'Charge du condensateur' },
      { f: 'E = ½CU²', desc: 'Énergie électrostatique' },
    ],
  },
  {
    id: 'dipole-rc-info',
    num: '2',
    titre: 'Dipôle RC',
    couleur: '#6d28d9',
    icone: '🔌',
    tag: 'Physique',
    souschap: [
      { titre: 'Étude expérimentale', notions: ['Montage RC','Oscilloscope','Mesure de τ'] },
      { titre: 'Équation différentielle', notions: ['RC·du_C/dt + u_C = E','Solution u_C(t)','Régime transitoire'] },
      { titre: 'Constante de temps & intensité', notions: ['τ = RC','i(t) = (E/R)e^(−t/τ)','Filtrage et temporisation'] },
    ],
    formules: [
      { f: 'τ = RC', desc: 'Constante de temps' },
      { f: 'u_C(t) = E(1 − e^(−t/τ))', desc: 'Charge du condensateur' },
      { f: 'i(t) = (E/R)·e^(−t/τ)', desc: 'Intensité lors de la charge' },
    ],
  },
  {
    id: 'bobine-rl-info',
    num: '3',
    titre: 'Bobine & Dipôle RL',
    couleur: '#4f6ef7',
    icone: '🌀',
    tag: 'Physique',
    souschap: [
      { titre: 'Bobine — Courant induit & Loi de Lenz', notions: ['Flux Φ=Li','e_L=−L·di/dt','Loi de Lenz (opposition)'] },
      { titre: 'Auto-induction & énergie magnétique', notions: ['Inductance L (Henry)','E_L=½LI²','Régime permanent'] },
      { titre: 'Dipôle RL — Équation différentielle', notions: ['τ=L/R','i(t)=(E/R)(1−e^(−t/τ))','Rupture du courant'] },
    ],
    formules: [
      { f: 'τ = L/R', desc: 'Constante de temps RL' },
      { f: 'E_L = ½LI²', desc: 'Énergie dans la bobine' },
      { f: 'e_L = −L·di/dt', desc: 'Force électromotrice d\'auto-induction' },
    ],
  },
  {
    id: 'oscillations-lc-info',
    num: '4',
    titre: 'Oscillations électriques libres',
    couleur: '#06b6d4',
    icone: '〰️',
    tag: 'Physique',
    souschap: [
      { titre: 'Oscillations libres amorties (RLC)', notions: ['Régimes apériodique/critique/pseudo-périodique','Énergie dissipée','Équation différentielle'] },
      { titre: 'Oscillations libres non amorties (LC)', notions: ['Solution sinusoïdale','T₀=2π√(LC)','Échanges Ec↔Em'] },
      { titre: 'Fréquence propre et énergie', notions: ['f₀=1/(2π√LC)','Conservation d\'énergie','Analogie méca-élec'] },
    ],
    formules: [
      { f: 'T₀ = 2π√(LC)', desc: 'Période propre' },
      { f: 'f₀ = 1/(2π√(LC))', desc: 'Fréquence propre' },
    ],
  },
  {
    id: 'ondes-mec-info',
    num: '5',
    titre: 'Ondes mécaniques progressives',
    couleur: '#f59e0b',
    icone: '🌊',
    tag: 'Physique',
    souschap: [
      { titre: 'Nature et propagation', notions: ['Ondes transversales/longitudinales','Célérité v','Retard temporel τ=d/v'] },
      { titre: 'Ondes sinusoïdales', notions: ['λ = vT','Fréquence f','Déphasage φ'] },
    ],
    formules: [
      { f: 'λ = v·T = v/f', desc: 'Longueur d\'onde' },
      { f: 'τ = d/v', desc: 'Retard temporel' },
    ],
  },
  {
    id: 'ondes-optique-info',
    num: '6',
    titre: 'Ondes et optique',
    couleur: '#14b8a6',
    icone: '🌈',
    tag: 'Physique',
    souschap: [
      { titre: 'Diffraction', notions: ['Tache centrale θ≈λ/a','Condition de diffraction','Limite de résolution'] },
      { titre: 'Dispersion de la lumière', notions: ['Prisme','Indice de réfraction n(λ)','Décomposition lumière blanche'] },
      { titre: 'Spectres atomiques', notions: ['Spectre d\'émission','Spectre d\'absorption','Identification d\'éléments'] },
    ],
    formules: [
      { f: 'θ ≈ λ/a', desc: 'Angle de diffraction' },
      { f: 'n = c/v', desc: 'Indice de réfraction' },
    ],
  },
  {
    id: 'nucleaire-info',
    num: '7',
    titre: 'Physique nucléaire',
    couleur: '#ef4444',
    icone: '☢️',
    tag: 'Physique',
    souschap: [
      { titre: 'Noyau et radioactivité', notions: ['Notation ᴬ_Z X','Désintégrations α, β⁻, β⁺, γ','Lois de conservation'] },
      { titre: 'Loi de décroissance radioactive', notions: ['N(t)=N₀e^(−λt)','t₁/₂=ln2/λ','Activité A=λN'] },
      { titre: 'Fission et Fusion nucléaires', notions: ['Énergie libérée E=Δm·c²','Réacteur nucléaire','Applications'] },
    ],
    formules: [
      { f: 'N(t) = N₀·e^(−λt)', desc: 'Décroissance radioactive' },
      { f: 't₁/₂ = ln2/λ', desc: 'Demi-vie' },
      { f: 'E = Δm·c²', desc: 'Énergie libérée (Einstein)' },
    ],
  },
  // ── CHIMIE ────────────────────────────────────────────────────────────
  {
    id: 'acide-base-info',
    num: '1',
    titre: 'Acides-bases',
    couleur: '#10b981',
    icone: '🧪',
    tag: 'Chimie',
    souschap: [
      { titre: 'Couples acide/base & pH', notions: ['pH=−log[H₃O⁺]','Ka et pKa','Diagramme de prédominance'] },
      { titre: 'Dosages et titrages', notions: ['Titrage pH-métrique','Équivalence','Indicateurs colorés'] },
    ],
    formules: [
      { f: 'pH = −log[H₃O⁺]', desc: 'Définition du pH' },
      { f: 'Ka = [A⁻][H₃O⁺]/[AH]', desc: 'Constante d\'acidité' },
    ],
  },
  {
    id: 'cinetique-info',
    num: '2',
    titre: 'Cinétique chimique',
    couleur: '#f59e0b',
    icone: '⏱️',
    tag: 'Chimie',
    souschap: [
      { titre: 'Vitesse de réaction', notions: ['v=−d[A]/dt','Loi de vitesse','Ordre de réaction'] },
      { titre: 'Facteurs influents', notions: ['Concentration','Température','Catalyseur (homogène/hétérogène/enzymatique)'] },
      { titre: 'Suivi temporel', notions: ['Spectrophotométrie','Conductimétrie','Courbes cinétiques'] },
    ],
    formules: [{ f: 'v = −(1/a)·d[A]/dt', desc: 'Vitesse de réaction' }],
  },
  {
    id: 'transformations-info',
    num: '3',
    titre: 'Transformations chimiques',
    couleur: '#06b6d4',
    icone: '🔄',
    tag: 'Chimie',
    souschap: [
      { titre: 'Estérification', notions: ['Acide carboxylique + alcool','Ester + eau','Équilibre, rendement'] },
      { titre: 'Formation d\'amides', notions: ['Acide + amine','Liaison amide','Polycondensation'] },
      { titre: 'Réversibilité et rendement', notions: ['Taux d\'avancement τ','Distillation','Excès de réactif'] },
    ],
    formules: [{ f: 'τ = x_f / x_max', desc: 'Taux de conversion' }],
  },
  {
    id: 'equilibre-chimique-info',
    num: '4',
    titre: 'Équilibre chimique',
    couleur: '#8b5cf6',
    icone: '⚖️',
    tag: 'Chimie',
    souschap: [
      { titre: 'Loi de Le Chatelier', notions: ['Perturbation de l\'équilibre','Déplacement sens direct/inverse','Applications industrielles'] },
      { titre: 'Constantes d\'équilibre', notions: ['Quotient Qr','Kéq','Critère d\'évolution Qr vs K'] },
    ],
    formules: [
      { f: 'Qr < K → sens direct', desc: 'Critère d\'évolution' },
      { f: 'Qr = K à l\'équilibre', desc: 'État d\'équilibre' },
    ],
  },
  {
    id: 'electrochimie-info',
    num: '5',
    titre: 'Électrochimie',
    couleur: '#f97316',
    icone: '🔋',
    tag: 'Chimie',
    souschap: [
      { titre: 'Piles électrochimiques', notions: ['Couples rédox','f.e.m. de la pile','Cathode/Anode'] },
      { titre: 'Électrolyse', notions: ['Sens forcé','Loi de Faraday m=MIt/nF','Applications industrielles'] },
      { titre: 'Applications', notions: ['Galvanoplastie','Batteries','Raffinage de l\'aluminium'] },
    ],
    formules: [
      { f: 'm = M·I·t/(n·F)', desc: 'Loi de Faraday' },
      { f: 'Q = I·t', desc: 'Quantité d\'électricité' },
    ],
  },
  {
    id: 'avancement-info',
    num: '6',
    titre: 'Tableau d\'avancement',
    couleur: '#ec4899',
    icone: '📊',
    tag: 'Chimie',
    souschap: [
      { titre: 'Avancement de réaction', notions: ['Variable x','Réactif limitant','x_max'] },
      { titre: 'Taux de conversion & rendement', notions: ['τ = x_f/x_max','Réaction totale τ=1','Réaction limitée τ<1'] },
      { titre: 'Limites et applications', notions: ['Bilan matière','Concentrations à l\'état final','Dosages'] },
    ],
    formules: [
      { f: 'τ = x_f / x_max', desc: 'Taux d\'avancement' },
    ],
  },
]

export default function PhysiqueInformatiquePage() {
  return (
    <>
      <Navbar />
      <main style={{ position: 'relative', zIndex: 1, paddingTop: 80 }}>
        <div className="container" style={{ paddingTop: 40, paddingBottom: 80 }}>

          <div style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 12, color: 'var(--muted)', marginBottom: 24, flexWrap: 'wrap' }}>
            <Link href="/bac" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇹🇳 Tunisie</Link>
            <span>›</span>
            <Link href="/bac/physique" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Physique-Chimie</Link>
            <span>›</span>
            <span style={{ color: '#8b5cf6' }}>Informatique</span>
          </div>

          <div style={{ marginBottom: 40 }}>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 14, flexWrap: 'wrap' }}>
              <span className="label">💻 Section Informatique · 4ème année</span>
              <span style={{ fontSize: 11, padding: '3px 10px', borderRadius: 20, background: 'rgba(139,92,246,0.2)', color: '#a78bfa', fontWeight: 800 }}>⭐ Baccalauréat Tunisie</span>
            </div>
            <h1 style={{ fontSize: 'clamp(24px,3.5vw,42px)', marginBottom: 14 }}>
              Physique-Chimie<br />
              <span style={{ background: 'linear-gradient(90deg,#8b5cf6,#06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Section Informatique — Programme complet
              </span>
            </h1>
            <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', fontSize: 13, color: 'var(--muted)', marginBottom: 20 }}>
              <span>📚 13 chapitres</span><span>·</span><span>📐 7 Physique · 6 Chimie</span><span>·</span><span>🤖 Solveur IA</span>
            </div>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <Link href="/solve" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '9px 18px', borderRadius: 10, background: 'linear-gradient(135deg,#8b5cf6,#6d28d9)', color: 'white', fontSize: 13, fontWeight: 700, textDecoration: 'none' }}>🧮 Solveur IA</Link>
              <Link href="/chat" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '9px 18px', borderRadius: 10, background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.14)', color: 'var(--text)', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>🤖 Chat Prof</Link>
              <Link href="/examens" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '9px 18px', borderRadius: 10, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'var(--muted)', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>📋 Examens officiels</Link>
            </div>
          </div>

          {['Physique','Chimie'].map(section => (
            <div key={section}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18, marginTop: section === 'Chimie' ? 32 : 0 }}>
                <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
                <span style={{ fontSize: 12, fontWeight: 800, color: section === 'Physique' ? '#8b5cf6' : '#10b981', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{section === 'Physique' ? '⚛️' : '🧪'} {section}</span>
                <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 12 }}>
                {CHAPITRES.filter(ch => ch.tag === section).map(ch => (
                  <div key={ch.id} style={{ background: `${ch.couleur}08`, border: `1px solid ${ch.couleur}28`, borderRadius: 16, overflow: 'hidden' }}>
                    <div style={{ background: `${ch.couleur}14`, borderBottom: `1px solid ${ch.couleur}20`, padding: '14px 20px', display: 'flex', gap: 12, alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                        <div style={{ width: 40, height: 40, borderRadius: 10, background: `${ch.couleur}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>{ch.icone}</div>
                        <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
                          <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: ch.couleur, fontWeight: 700 }}>CH.{ch.num}</span>
                          <h2 style={{ fontSize: 15, fontWeight: 800, color: 'var(--text)', margin: 0 }}>{ch.titre}</h2>
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                        {ch.formules.length > 0 && (
                          <span style={{ fontSize: 10, padding: '3px 8px', borderRadius: 6, background: `${ch.couleur}15`, color: ch.couleur, fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
                            {ch.formules[0].f}
                          </span>
                        )}
                        <Link href={`/bac/physique/informatique/${ch.id}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '6px 12px', borderRadius: 8, background: `${ch.couleur}20`, border: `1px solid ${ch.couleur}40`, color: ch.couleur, fontSize: 11, fontWeight: 700, textDecoration: 'none' }}>📖 Cours →</Link>
                      </div>
                    </div>
                    <div style={{ padding: '12px 20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 7 }}>
                      {ch.souschap.map(sc => (
                        <div key={sc.titre} style={{ background: 'rgba(0,0,0,0.12)', borderRadius: 9, padding: '9px 12px' }}>
                          <div style={{ fontWeight: 700, fontSize: 10, color: ch.couleur, marginBottom: 4 }}>{sc.titre}</div>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                            {sc.notions.map(n => <span key={n} style={{ fontSize: 9, padding: '2px 6px', borderRadius: 6, background: `${ch.couleur}12`, color: 'var(--text2)', border: `1px solid ${ch.couleur}18` }}>{n}</span>)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div style={{ marginTop: 48, display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/bac/physique/sciences-tech" style={{ padding: '10px 20px', borderRadius: 12, border: '1px solid rgba(245,158,11,0.3)', background: 'rgba(245,158,11,0.08)', color: '#fbbf24', fontSize: 13, fontWeight: 700, textDecoration: 'none' }}>← Sciences Tech.</Link>
            <Link href="/bac/physique" style={{ padding: '10px 20px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.05)', color: 'var(--text2)', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>↑ Toutes les sections</Link>
          </div>

        </div>
      </main>
      <Footer />
    </>
  )
}
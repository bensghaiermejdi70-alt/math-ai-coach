'use client'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

// ══════════════════════════════════════════════════════════════════════
// PHYSIQUE-CHIMIE TUNISIE — Section Sciences Expérimentales
// Route : /bac/physique/sciences-exp
// Programme officiel MEN Tunisie · 4ème année Sciences Exp.
// ══════════════════════════════════════════════════════════════════════

const CHAPITRES = [
  // ── PHYSIQUE ──────────────────────────────────────────────────────
  {
    id: 'dipole-rc',
    num: '1',
    titre: 'Dipôle RC',
    couleur: '#4f6ef7',
    icone: '🔌',
    tag: 'Physique',
    souschap: [
      { titre: 'Condensateur', notions: ['Charge / décharge','Énergie emmagasinée E = ½CU²','Capacité C en Farads'] },
      { titre: 'Dipôle RC', notions: ['Réponse à un échelon de tension','Constante de temps τ = RC','Équation différentielle 1er ordre'] },
      { titre: 'Courbes de réponse', notions: ['u_C(t) lors charge','i(t) lors décharge','Détermination graphique de τ'] },
    ],
    formules: [
      { f: 'τ = RC', desc: 'Constante de temps RC' },
      { f: 'u_C(t) = E(1 − e^(−t/τ))', desc: 'Charge du condensateur' },
      { f: 'u_C(t) = U₀·e^(−t/τ)', desc: 'Décharge du condensateur' },
      { f: 'E_C = ½CU²', desc: 'Énergie emmagasinée' },
    ],
  },
  {
    id: 'dipole-rl',
    num: '2',
    titre: 'Dipôle RL',
    couleur: '#8b5cf6',
    icone: '🌀',
    tag: 'Physique',
    souschap: [
      { titre: 'Induction électromagnétique', notions: ['Loi de Lenz','Courant induit','Flux magnétique'] },
      { titre: 'Bobine', notions: ['FEM d\'auto-induction','Inductance L en Henry','e_L = −L·di/dt'] },
      { titre: 'Dipôle RL', notions: ['Réponse à un échelon de tension','Constante de temps τ = L/R','Régime permanent'] },
      { titre: 'Énergie emmagasinée', notions: ['E_L = ½LI²','Énergie magnétique','Transfert d\'énergie'] },
    ],
    formules: [
      { f: 'τ = L/R', desc: 'Constante de temps RL' },
      { f: 'e_L = −L·di/dt', desc: 'FEM d\'auto-induction' },
      { f: 'E_L = ½LI²', desc: 'Énergie dans une bobine' },
    ],
  },
  {
    id: 'oscillations-lc',
    num: '3',
    titre: 'Oscillations électriques libres',
    couleur: '#06b6d4',
    icone: '〰️',
    tag: 'Physique',
    souschap: [
      { titre: 'Circuit LC', notions: ['Charge / décharge oscillante','Oscillations libres non amorties','Échanges d\'énergie'] },
      { titre: 'Équation différentielle', notions: ['Solution sinusoïdale','Période propre T₀','Fréquence propre f₀'] },
      { titre: 'Énergie électromagnétique', notions: ['E_C + E_L = constante','Conversion énergie électrique ↔ magnétique','Analogie mécanique'] },
    ],
    formules: [
      { f: 'T₀ = 2π√(LC)', desc: 'Période propre du circuit LC' },
      { f: 'f₀ = 1/(2π√(LC))', desc: 'Fréquence propre' },
      { f: 'E_total = ½CU² + ½LI² = cte', desc: 'Conservation de l\'énergie' },
    ],
  },
  {
    id: 'oscillations-mecaniques',
    num: '4',
    titre: 'Oscillations mécaniques libres',
    couleur: '#10b981',
    icone: '🔔',
    tag: 'Physique',
    souschap: [
      { titre: 'Pendule simple', notions: ['Oscillations libres','Période T = 2π√(l/g)','Petites oscillations'] },
      { titre: 'Système masse-ressort', notions: ['Équation différentielle','Solution sinusoïdale','T = 2π√(m/k)'] },
      { titre: 'Énergie mécanique', notions: ['E_c ↔ E_p','Conservation de l\'énergie mécanique','Amortissement'] },
    ],
    formules: [
      { f: 'T = 2π√(l/g)', desc: 'Période du pendule simple' },
      { f: 'T = 2π√(m/k)', desc: 'Période masse-ressort' },
      { f: 'E_m = ½mv² + mgh = cte', desc: 'Énergie mécanique conservée' },
    ],
  },
  {
    id: 'ondes-mecaniques',
    num: '5',
    titre: 'Ondes mécaniques progressives',
    couleur: '#f59e0b',
    icone: '🌊',
    tag: 'Physique',
    souschap: [
      { titre: 'Notion d\'onde', notions: ['Propagation d\'une perturbation','Milieu matériel','Ondes transversales / longitudinales'] },
      { titre: 'Ondes progressives', notions: ['Célérité v','Retard temporel','Périodicité spatiale et temporelle'] },
      { titre: 'Ondes sinusoïdales', notions: ['Longueur d\'onde λ','Relation λ = vT','Fréquence et période'] },
    ],
    formules: [
      { f: 'λ = v·T = v/f', desc: 'Longueur d\'onde' },
      { f: 'v = λ·f', desc: 'Célérité d\'une onde' },
      { f: 'retard = d/v', desc: 'Retard temporel entre deux points' },
    ],
  },
  {
    id: 'ondes-lumineuses-exp',
    num: '6',
    titre: 'Ondes lumineuses',
    couleur: '#14b8a6',
    icone: '🌈',
    tag: 'Physique',
    souschap: [
      { titre: 'Diffraction', notions: ['Tache centrale','Condition : λ ≈ a','Limite de résolution','Critère de Rayleigh'] },
      { titre: 'Interférences', notions: ['Fentes d\'Young','Interfrange i = λD/a','Interférences constructives/destructives'] },
      { titre: 'Spectres', notions: ['Spectre électromagnétique','Spectre d\'émission / absorption','Identification des éléments'] },
    ],
    formules: [
      { f: 'i = λD/a', desc: 'Interfrange (fentes d\'Young)' },
      { f: 'δ = kλ (k entier)', desc: 'Interférences constructives' },
      { f: 'δ = (2k+1)λ/2', desc: 'Interférences destructives' },
    ],
  },
  {
    id: 'nucleaire-exp',
    num: '7',
    titre: 'Réactions nucléaires',
    couleur: '#ef4444',
    icone: '☢️',
    tag: 'Physique',
    souschap: [
      { titre: 'Radioactivité', notions: ['Rayonnements α, β, γ','Loi de décroissance : N = N₀e^(−λt)','Temps de demi-vie t₁/₂ = ln2/λ'] },
      { titre: 'Fission nucléaire', notions: ['Réaction en chaîne','Énergie libérée','Centrale nucléaire'] },
      { titre: 'Fusion nucléaire', notions: ['Réactions thermonucléaires','Énergie de liaison','Défaut de masse'] },
    ],
    formules: [
      { f: 'N(t) = N₀·e^(−λt)', desc: 'Loi de décroissance radioactive' },
      { f: 't₁/₂ = ln2/λ', desc: 'Période radioactive' },
      { f: 'E = Δm·c²', desc: 'Énergie libérée (Einstein)' },
    ],
  },
  // ── AJOUTS PROGRAMME OFFICIEL ─────────────────────────────────────
  {
    id: 'oscillations-forcees-mec',
    num: '8',
    titre: "Oscillations mécaniques forcées",
    couleur: '#06b6d4',
    icone: '📳',
    tag: 'Physique',
    souschap: [
      { titre: "Oscillateur forcé", notions: ["Excitateur sinusoïdal","Régime forcé","Résonance mécanique"] },
      { titre: "Résonance", notions: ["Amplitude maximale à la résonance","Déphasage x et excitateur","Facteur de qualité Q"] },
      { titre: "Équation", notions: ["x(t)=Xm sin(ωt+φ)","Bande passante Δω","Courbe de résonance"] },
      { f: "x(t) = Xm·sin(ωt + φ)", desc: "Équation horaire en régime forcé" },
    ],
  },
  {
    id: 'interaction-onde-matiere',
    num: '9',
    titre: "Interaction onde-matière",
    couleur: '#06b6d4',
    icone: '🔬',
    tag: 'Physique',
    souschap: [
      { titre: "Diffraction et interférences", notions: ["Diffraction par une fente","Interférences (Young)","Interfrange i=λD/a"] },
      { titre: "Effet photoélectrique", notions: ["Énergie du photon E=hf","Fréquence seuil","Électron extrait"] },
      { titre: "Dualité onde-corpuscule", notions: ["Longueur de De Broglie λ=h/mv","Quantification","Spectres atomiques"] },
      { f: "E = h·f", desc: "Énergie du photon (h = 6,626×10⁻³´ J·s)" },
    ],
  },
  // ── CHIMIE ────────────────────────────────────────────────────────
  {
    id: 'cinetique-exp',
    num: '1',
    titre: 'Cinétique chimique',
    couleur: '#f59e0b',
    icone: '⏱️',
    tag: 'Chimie',
    souschap: [
      { titre: 'Vitesse de réaction', notions: ['v = −d[A]/dt','Facteurs cinétiques','Taux d\'avancement'] },
      { titre: 'Suivi temporel', notions: ['Courbes [A](t)','Temps de demi-réaction t₁/₂','Ordre de réaction'] },
      { titre: 'Catalyse', notions: ['Catalyse homogène','Catalyse hétérogène','Catalyse enzymatique'] },
    ],
    formules: [
      { f: 'v = −d[A]/dt', desc: 'Vitesse volumique de réaction' },
      { f: 't₁/₂ : [A] = [A]₀/2', desc: 'Définition du temps de demi-réaction' },
    ],
  },
  {
    id: 'equilibres-exp',
    num: '2',
    titre: 'Équilibres chimiques',
    couleur: '#8b5cf6',
    icone: '⚖️',
    tag: 'Chimie',
    souschap: [
      { titre: 'Avancement final', notions: ['Réactions totales et limitées','Taux d\'avancement final τ','Réactif limitant'] },
      { titre: 'État d\'équilibre', notions: ['Définition','Quotient de réaction Qr','Constante d\'équilibre K'] },
      { titre: 'Loi d\'action de masse', notions: ['Expression de Qr','Critère d\'évolution','Loi de modération (Le Chatelier)'] },
    ],
    formules: [
      { f: 'τ = x_f / x_max', desc: 'Taux d\'avancement final' },
      { f: 'Qr → K à l\'équilibre', desc: 'Critère d\'équilibre' },
    ],
  },
  {
    id: 'acide-base-exp',
    num: '3',
    titre: 'Acides et bases',
    couleur: '#10b981',
    icone: '🧪',
    tag: 'Chimie',
    souschap: [
      { titre: 'Couples acide/base', notions: ['Théorie de Brønsted','Réaction acide-base','Couple AH/A⁻'] },
      { titre: 'pH', notions: ['pH = −log[H₃O⁺]','Acide fort / faible','Base forte / faible'] },
      { titre: 'Constante d\'acidité K_A', notions: ['pKa','Diagramme de prédominance','Dosage acide-base'] },
    ],
    formules: [
      { f: 'pH = −log[H₃O⁺]', desc: 'Définition du pH' },
      { f: 'Ka = [A⁻][H₃O⁺]/[AH]', desc: 'Constante d\'acidité' },
    ],
  },
  {
    id: 'electrochimie-exp',
    num: '4',
    titre: 'Électrochimie',
    couleur: '#ef4444',
    icone: '⚗️',
    tag: 'Chimie',
    souschap: [
      { titre: 'Réactions redox', notions: ['Nombre d\'oxydation','Équilibrage des équations redox','Couples Ox/Red'] },
      { titre: 'Piles électrochimiques', notions: ['Anode / Cathode','FEM','Pont salin','Applications'] },
      { titre: 'Électrolyse', notions: ['Réactions forcées','Loi de Faraday','Applications industrielles'] },
    ],
    formules: [
      { f: 'm = M·I·t/(n·F)', desc: 'Masse déposée (loi de Faraday)' },
      { f: 'F = 96 500 C/mol', desc: 'Constante de Faraday' },
    ],
  },
  {
    id: 'organique-exp',
    num: '5',
    titre: 'Chimie organique',
    couleur: '#06b6d4',
    icone: '🔬',
    tag: 'Chimie',
    souschap: [
      { titre: 'Composés carbonylés', notions: ['Aldéhydes','Cétones','Propriétés et réactions'] },
      { titre: 'Acides carboxyliques', notions: ['Structure','Propriétés acides','Réactions'] },
      { titre: 'Estérification', notions: ['Réaction acide + alcool','Hydrolyse','Équilibre estérification/hydrolyse'] },
      { titre: 'Polymères', notions: ['Polyaddition','Polycondensation','Applications'] },
    ],
    formules: [],
  },
]

export default function PhysiqueSciencesExpPage() {
  return (
    <>
      <Navbar />
      <main style={{ position: 'relative', zIndex: 1, paddingTop: 80 }}>
        <div className="container" style={{ paddingTop: 40, paddingBottom: 80 }}>

          {/* Fil d'Ariane */}
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 12, color: 'var(--muted)', marginBottom: 24, flexWrap: 'wrap' }}>
            <Link href="/bac" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇹🇳 Tunisie</Link>
            <span>›</span>
            <Link href="/bac/physique" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Physique-Chimie</Link>
            <span>›</span>
            <span style={{ color: '#06b6d4' }}>Sciences Expérimentales</span>
          </div>

          {/* HEADER */}
          <div style={{ marginBottom: 40 }}>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 14, flexWrap: 'wrap' }}>
              <span className="label">🔬 Sciences Expérimentales · 4ème année</span>
              <span style={{ fontSize: 11, padding: '3px 10px', borderRadius: 20, background: 'rgba(6,182,212,0.2)', color: '#22d3ee', fontWeight: 800 }}>⭐ Baccalauréat Tunisie</span>
            </div>
            <h1 style={{ fontSize: 'clamp(24px,3.5vw,42px)', marginBottom: 14 }}>
              Physique-Chimie<br />
              <span style={{ background: 'linear-gradient(90deg,#06b6d4,#10b981)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Sciences Exp. — Programme complet
              </span>
            </h1>
            <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', fontSize: 13, color: 'var(--muted)', marginBottom: 20 }}>
              <span>📚 12 chapitres</span><span>·</span>
              <span>📐 7 Physique · 5 Chimie</span><span>·</span>
              <span>📊 195+ formules</span><span>·</span>
              <span>🤖 Solveur IA intégré</span>
            </div>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <Link href="/solve" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '9px 18px', borderRadius: 10, background: 'linear-gradient(135deg,#06b6d4,#10b981)', color: 'white', fontSize: 13, fontWeight: 700, textDecoration: 'none' }}>
                🧮 Solveur IA
              </Link>
              <Link href="/chat" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '9px 18px', borderRadius: 10, background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.14)', color: 'var(--text)', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>
                🤖 Chat Prof
              </Link>
              <Link href="/simulation" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '9px 18px', borderRadius: 10, background: 'rgba(6,182,212,0.1)', border: '1px solid rgba(6,182,212,0.3)', color: '#22d3ee', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>
                🎯 Simulation Bac
              </Link>
            </div>
          </div>

          {/* SÉPARATEUR PHYSIQUE */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
            <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
            <span style={{ fontSize: 12, fontWeight: 800, color: '#4f6ef7', textTransform: 'uppercase', letterSpacing: '0.1em' }}>⚛️ Physique</span>
            <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 32 }}>
            {CHAPITRES.filter(ch => ch.tag === 'Physique').map(ch => (
              <div key={ch.id} style={{ background: `${ch.couleur}08`, border: `1px solid ${ch.couleur}28`, borderRadius: 18, overflow: 'hidden' }}>
                <div style={{ background: `${ch.couleur}14`, borderBottom: `1px solid ${ch.couleur}20`, padding: '16px 22px', display: 'flex', gap: 14, alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                    <div style={{ width: 44, height: 44, borderRadius: 12, background: `${ch.couleur}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>{ch.icone}</div>
                    <div>
                      <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap', marginBottom: 2 }}>
                        <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: ch.couleur, fontWeight: 700 }}>CH.{ch.num}</span>
                        <h2 style={{ fontSize: 16, fontWeight: 800, color: 'var(--text)', margin: 0 }}>{ch.titre}</h2>
                        <span style={{ fontSize: 10, padding: '2px 9px', borderRadius: 20, background: `${ch.couleur}20`, color: ch.couleur, fontWeight: 700 }}>{ch.tag}</span>
                      </div>
                      <div style={{ fontSize: 11, color: 'var(--muted)' }}>{ch.souschap.length} sous-chapitres</div>
                    </div>
                  </div>
                  <Link href={`/bac/physique/sciences-exp/${ch.id}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '7px 14px', borderRadius: 9, background: `${ch.couleur}20`, border: `1px solid ${ch.couleur}40`, color: ch.couleur, fontSize: 12, fontWeight: 700, textDecoration: 'none' }}>
                    📖 Cours complet →
                  </Link>
                </div>
                <div style={{ padding: '14px 22px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 8, marginBottom: (ch.formules?.length ?? 0) > 0 ? 12 : 0 }}>
                    {ch.souschap.map(sc => (
                      <div key={sc.titre} style={{ background: 'rgba(0,0,0,0.12)', borderRadius: 10, padding: '10px 13px' }}>
                        <div style={{ fontWeight: 700, fontSize: 11, color: ch.couleur, marginBottom: 5 }}>{sc.titre}</div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                          {(sc.notions ?? []).map(n => (
                            <span key={n} style={{ fontSize: 10, padding: '2px 7px', borderRadius: 8, background: `${ch.couleur}12`, color: 'var(--text2)', border: `1px solid ${ch.couleur}18` }}>{n}</span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  {(ch.formules?.length ?? 0) > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                      {(ch.formules ?? []).map(f => (
                        <div key={f.f} style={{ background: `${ch.couleur}14`, border: `1px solid ${ch.couleur}28`, borderRadius: 9, padding: '7px 13px' }}>
                          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: ch.couleur, fontWeight: 700, marginBottom: 1 }}>{f.f}</div>
                          <div style={{ fontSize: 10, color: 'var(--muted)' }}>{f.desc}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* SÉPARATEUR CHIMIE */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
            <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
            <span style={{ fontSize: 12, fontWeight: 800, color: '#10b981', textTransform: 'uppercase', letterSpacing: '0.1em' }}>🧪 Chimie</span>
            <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {CHAPITRES.filter(ch => ch.tag === 'Chimie').map(ch => (
              <div key={ch.id} style={{ background: `${ch.couleur}08`, border: `1px solid ${ch.couleur}28`, borderRadius: 18, overflow: 'hidden' }}>
                <div style={{ background: `${ch.couleur}14`, borderBottom: `1px solid ${ch.couleur}20`, padding: '16px 22px', display: 'flex', gap: 14, alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                    <div style={{ width: 44, height: 44, borderRadius: 12, background: `${ch.couleur}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>{ch.icone}</div>
                    <div>
                      <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap', marginBottom: 2 }}>
                        <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: ch.couleur, fontWeight: 700 }}>CH.{ch.num}</span>
                        <h2 style={{ fontSize: 16, fontWeight: 800, color: 'var(--text)', margin: 0 }}>{ch.titre}</h2>
                        <span style={{ fontSize: 10, padding: '2px 9px', borderRadius: 20, background: `${ch.couleur}20`, color: ch.couleur, fontWeight: 700 }}>{ch.tag}</span>
                      </div>
                      <div style={{ fontSize: 11, color: 'var(--muted)' }}>{ch.souschap.length} sous-chapitres</div>
                    </div>
                  </div>
                  <Link href={`/bac/physique/sciences-exp/${ch.id}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '7px 14px', borderRadius: 9, background: `${ch.couleur}20`, border: `1px solid ${ch.couleur}40`, color: ch.couleur, fontSize: 12, fontWeight: 700, textDecoration: 'none' }}>
                    📖 Cours complet →
                  </Link>
                </div>
                <div style={{ padding: '14px 22px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 8 }}>
                    {ch.souschap.map(sc => (
                      <div key={sc.titre} style={{ background: 'rgba(0,0,0,0.12)', borderRadius: 10, padding: '10px 13px' }}>
                        <div style={{ fontWeight: 700, fontSize: 11, color: ch.couleur, marginBottom: 5 }}>{sc.titre}</div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                          {(sc.notions ?? []).map(n => (
                            <span key={n} style={{ fontSize: 10, padding: '2px 7px', borderRadius: 8, background: `${ch.couleur}12`, color: 'var(--text2)', border: `1px solid ${ch.couleur}18` }}>{n}</span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation */}
          <div style={{ marginTop: 48, display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/bac/physique/maths" style={{ padding: '10px 20px', borderRadius: 12, border: '1px solid rgba(245,158,11,0.3)', background: 'rgba(245,158,11,0.08)', color: '#fbbf24', fontSize: 13, fontWeight: 700, textDecoration: 'none' }}>← Section Maths</Link>
            <Link href="/bac/physique" style={{ padding: '10px 20px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.05)', color: 'var(--text2)', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>↑ Toutes les sections</Link>
            <Link href="/bac/physique/sciences-tech" style={{ padding: '10px 20px', borderRadius: 12, border: '1px solid rgba(16,185,129,0.3)', background: 'rgba(16,185,129,0.08)', color: '#34d399', fontSize: 13, fontWeight: 700, textDecoration: 'none' }}>Sciences Tech. →</Link>
          </div>

        </div>
      </main>
      <Footer />
    </>
  )
}
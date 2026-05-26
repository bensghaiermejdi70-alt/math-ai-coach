'use client'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

// ══════════════════════════════════════════════════════════════════════
// PHYSIQUE-CHIMIE TUNISIE — Section Sciences Techniques
// Route : /bac/physique/sciences-tech
// Programme officiel MEN Tunisie · 4ème année Technique
// ══════════════════════════════════════════════════════════════════════

const CHAPITRES = [
  {
    id: 'dipole-rc-tech',
    num: '1',
    titre: 'Dipôle RC',
    couleur: '#4f6ef7',
    icone: '🔌',
    tag: 'Physique',
    souschap: [
      { titre: 'Condensateur', notions: ['Charge / décharge','Énergie E = ½CU²','Applications : filtrage, temporisation'] },
      { titre: 'Dipôle RC', notions: ['Constante de temps τ = RC','Équation différentielle 1er ordre','Courbes u_C(t) et i(t)'] },
      { titre: 'Applications', notions: ['Circuit de filtrage passe-bas','Temporisation électronique','Mesure de τ graphiquement'] },
    ],
    formules: [
      { f: 'τ = RC', desc: 'Constante de temps' },
      { f: 'u_C(t) = E(1 − e^(−t/τ))', desc: 'Charge' },
      { f: 'E_C = ½CU²', desc: 'Énergie condensateur' },
    ],
  },
  {
    id: 'dipole-rl-tech',
    num: '2',
    titre: 'Dipôle RL',
    couleur: '#8b5cf6',
    icone: '🌀',
    tag: 'Physique',
    souschap: [
      { titre: 'Induction & bobine', notions: ['Loi de Lenz','Inductance L en Henry','FEM d\'auto-induction e_L = −L·di/dt'] },
      { titre: 'Dipôle RL', notions: ['Constante de temps τ = L/R','Réponse à un échelon','Régime permanent'] },
      { titre: 'Applications', notions: ['Circuit de lissage','Protection contre les surtensions','Stockage d\'énergie'] },
    ],
    formules: [
      { f: 'τ = L/R', desc: 'Constante de temps RL' },
      { f: 'e_L = −L·di/dt', desc: 'FEM d\'auto-induction' },
      { f: 'E_L = ½LI²', desc: 'Énergie dans la bobine' },
    ],
  },
  {
    id: 'oscillations-lc-tech',
    num: '3',
    titre: 'Oscillations électriques libres',
    couleur: '#06b6d4',
    icone: '〰️',
    tag: 'Physique',
    souschap: [
      { titre: 'Circuit LC', notions: ['Oscillations libres','Échanges d\'énergie électrique ↔ magnétique'] },
      { titre: 'Équation différentielle', notions: ['Solution sinusoïdale','T₀ = 2π√(LC)','Fréquence propre f₀'] },
      { titre: 'Applications', notions: ['Oscillateur électronique','Circuit accordé','Radio et télécommunications'] },
    ],
    formules: [
      { f: 'T₀ = 2π√(LC)', desc: 'Période propre LC' },
      { f: 'f₀ = 1/(2π√(LC))', desc: 'Fréquence propre' },
    ],
  },
  {
    id: 'oscillations-mec-tech',
    num: '4',
    titre: 'Oscillations mécaniques libres',
    couleur: '#10b981',
    icone: '🔔',
    tag: 'Physique',
    souschap: [
      { titre: 'Pendule simple', notions: ['T = 2π√(l/g)','Petites oscillations','Isochrone'] },
      { titre: 'Système masse-ressort', notions: ['T = 2π√(m/k)','Équation différentielle','Amortissement'] },
      { titre: 'Applications', notions: ['Amortisseur automobile','Suspension','Horloge à pendule'] },
    ],
    formules: [
      { f: 'T = 2π√(l/g)', desc: 'Pendule simple' },
      { f: 'T = 2π√(m/k)', desc: 'Masse-ressort' },
    ],
  },
  {
    id: 'ondes-mec-tech',
    num: '5',
    titre: 'Ondes mécaniques progressives',
    couleur: '#f59e0b',
    icone: '🌊',
    tag: 'Physique',
    souschap: [
      { titre: 'Ondes progressives', notions: ['Célérité v','Retard temporel','Transversal / longitudinal'] },
      { titre: 'Ondes sinusoïdales', notions: ['λ = vT','Fréquence et période','Déphasage'] },
      { titre: 'Réflexion & réfraction', notions: ['Changement de milieu','Lois de la réflexion','Applications industrielles'] },
    ],
    formules: [
      { f: 'λ = v·T', desc: 'Longueur d\'onde' },
      { f: 'v = λ·f', desc: 'Célérité' },
    ],
  },
  {
    id: 'ondes-lum-tech',
    num: '6',
    titre: 'Ondes lumineuses',
    couleur: '#14b8a6',
    icone: '🌈',
    tag: 'Physique',
    souschap: [
      { titre: 'Diffraction', notions: ['Tache centrale','λ ≈ a','Limite de résolution'] },
      { titre: 'Interférences', notions: ['Fentes d\'Young','i = λD/a','Applications'] },
      { titre: 'Applications tech.', notions: ['Laser industriel','Fibre optique','Contrôle qualité'] },
    ],
    formules: [
      { f: 'i = λD/a', desc: 'Interfrange' },
      { f: 'n = c/v', desc: 'Indice de réfraction' },
    ],
  },
  {
    id: 'nucleaire-tech',
    num: '7',
    titre: 'Réactions nucléaires',
    couleur: '#ef4444',
    icone: '☢️',
    tag: 'Physique',
    souschap: [
      { titre: 'Radioactivité', notions: ['α, β, γ','N(t) = N₀e^(−λt)','t₁/₂ = ln2/λ'] },
      { titre: 'Fission nucléaire', notions: ['Réaction en chaîne','Centrale nucléaire','Sécurité'] },
      { titre: 'Applications', notions: ['Médecine nucléaire','Datation','Énergie nucléaire'] },
    ],
    formules: [
      { f: 'N(t) = N₀·e^(−λt)', desc: 'Décroissance radioactive' },
      { f: 'E = Δm·c²', desc: 'Énergie de masse' },
    ],
  },
  // ── AJOUTS PROGRAMME OFFICIEL ──────────────────────────────────────
  {
    id: 'oscillations-forcees-elec',
    num: '8',
    titre: "Oscillations électriques forcées",
    couleur: '#10b981',
    icone: '📶',
    tag: 'Physique',
    souschap: [
      { titre: "Résonance", notions: ["Résonance à ω=ω₀=1/√(LC)","Im_max=E/R","Facteur de qualité Q=Lω₀/R"] },
      { titre: "Bande passante", notions: ["Bande passante Δf=f₀/Q","Courbe de résonance","Applications filtrage"] },
      { f: "Z = √[R² + (Lω - 1/(Cω))²]", desc: "Impédance du circuit RLC série" },
    ],
  },
  {
    id: 'electronique-tech',
    num: '9',
    titre: "Électronique",
    couleur: '#10b981',
    icone: '🔌',
    tag: 'Physique',
    souschap: [
      { titre: "Diodes", notions: ["Jonction PN","Polarisation directe/inverse","Redressement simple/double alternance"] },
      { titre: "Transistors", notions: ["Transistor NPN/PNP","Zone active IC=βIB","Amplification et commutation"] },
      { titre: "Applications", notions: ["Filtrage signal redressé","Commande de charge","Circuits de puissance"] },
    ],
  },
  {
    id: 'interaction-onde-matiere-tech',
    num: '10',
    titre: "Interaction onde-matière",
    couleur: '#10b981',
    icone: '🔬',
    tag: 'Physique',
    souschap: [
      { titre: "Diffraction et interférences", notions: ["Diffraction (a≈λ)","Interférences Young i=λD/a","Sources cohérentes"] },
      { titre: "Effet photoélectrique", notions: ["Énergie photon E=hf","Fréquence seuil f₀=W₀/h","Dualité onde-corpuscule"] },
      { f: "E = h·f", desc: "Énergie d'un photon — h=6,626×10⁻³´ J·s" },
    ],
  },
  // CHIMIE
  {
    id: 'cinetique-tech',
    num: '1',
    titre: 'Cinétique chimique',
    couleur: '#f59e0b',
    icone: '⏱️',
    tag: 'Chimie',
    souschap: [
      { titre: 'Vitesse de réaction', notions: ['v = −d[A]/dt','Facteurs cinétiques','Suivi temporel'] },
      { titre: 'Catalyse', notions: ['Homogène / hétérogène / enzymatique','Accélération de réaction'] },
      { titre: 'Applications industrielles', notions: ['Contrôle de production','Optimisation des réactions','Industrie chimique'] },
    ],
    formules: [{ f: 'v = −d[A]/dt', desc: 'Vitesse volumique' }],
  },
  {
    id: 'equilibres-tech',
    num: '2',
    titre: 'Équilibres chimiques',
    couleur: '#8b5cf6',
    icone: '⚖️',
    tag: 'Chimie',
    souschap: [
      { titre: 'Avancement & taux', notions: ['x_f / x_max','Réactif limitant','Réactions totales / limitées'] },
      { titre: 'Loi d\'action de masse', notions: ['Quotient Qr','Constante K','Critère d\'évolution'] },
      { titre: 'Applications industrielles', notions: ['Synthèse de Haber (NH₃)','Procédé Contact (H₂SO₄)','Optimisation'] },
    ],
    formules: [{ f: 'Qr → K à l\'équilibre', desc: 'Critère d\'équilibre' }],
  },
  {
    id: 'acide-base-tech',
    num: '3',
    titre: 'Acides et bases',
    couleur: '#10b981',
    icone: '🧪',
    tag: 'Chimie',
    souschap: [
      { titre: 'pH et couples', notions: ['pH = −log[H₃O⁺]','Ka, pKa','Diagramme de prédominance'] },
      { titre: 'Dosage acide-base', notions: ['Équivalence','Indicateurs colorés','pH-métrie'] },
      { titre: 'Applications', notions: ['Contrôle qualité','Environnement','Traitement des eaux'] },
    ],
    formules: [{ f: 'pH = −log[H₃O⁺]', desc: 'Définition du pH' }],
  },
  {
    id: 'electrochimie-tech',
    num: '4',
    titre: 'Électrochimie',
    couleur: '#ef4444',
    icone: '⚗️',
    tag: 'Chimie',
    souschap: [
      { titre: 'Réactions redox', notions: ['Nombre d\'oxydation','Équilibrage','Piles'] },
      { titre: 'Corrosion', notions: ['Mécanisme de corrosion','Protection des métaux','Galvanisation'] },
      { titre: 'Applications', notions: ['Batterie','Pile à combustible','Électrolyse industrielle'] },
    ],
    formules: [{ f: 'm = MIt/(nF)', desc: 'Loi de Faraday' }],
  },
  {
    id: 'organique-tech',
    num: '5',
    titre: 'Chimie organique',
    couleur: '#06b6d4',
    icone: '🔬',
    tag: 'Chimie',
    souschap: [
      { titre: 'Composés carbonylés', notions: ['Aldéhydes / cétones','Réactions de reconnaissance'] },
      { titre: 'Estérification', notions: ['Réaction acide + alcool','Hydrolyse','Équilibre'] },
      { titre: 'Polymères & applications', notions: ['Polyaddition','Polycondensation','Plastiques, fibres, biocarburants'] },
    ],
    formules: [],
  },
]

export default function PhysiqueSciencesTechPage() {
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
            <span style={{ color: '#10b981' }}>Sciences Techniques</span>
          </div>

          <div style={{ marginBottom: 40 }}>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 14, flexWrap: 'wrap' }}>
              <span className="label">⚙️ Sciences Techniques · 4ème année</span>
              <span style={{ fontSize: 11, padding: '3px 10px', borderRadius: 20, background: 'rgba(16,185,129,0.2)', color: '#34d399', fontWeight: 800 }}>⭐ Baccalauréat Tunisie</span>
            </div>
            <h1 style={{ fontSize: 'clamp(24px,3.5vw,42px)', marginBottom: 14 }}>
              Physique-Chimie<br />
              <span style={{ background: 'linear-gradient(90deg,#10b981,#06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Sciences Tech. — Programme complet
              </span>
            </h1>
            <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', fontSize: 13, color: 'var(--muted)', marginBottom: 20 }}>
              <span>📚 12 chapitres</span><span>·</span><span>📐 7 Physique · 5 Chimie</span><span>·</span><span>🤖 Solveur IA intégré</span>
            </div>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <Link href="/solve" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '9px 18px', borderRadius: 10, background: 'linear-gradient(135deg,#10b981,#059669)', color: 'white', fontSize: 13, fontWeight: 700, textDecoration: 'none' }}>🧮 Solveur IA</Link>
              <Link href="/chat" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '9px 18px', borderRadius: 10, background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.14)', color: 'var(--text)', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>🤖 Chat Prof</Link>
            </div>
          </div>

          {['Physique','Chimie'].map(section => (
            <div key={section}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20, marginTop: section === 'Chimie' ? 32 : 0 }}>
                <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
                <span style={{ fontSize: 12, fontWeight: 800, color: section === 'Physique' ? '#4f6ef7' : '#10b981', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{section === 'Physique' ? '⚛️' : '🧪'} {section}</span>
                <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 12 }}>
                {CHAPITRES.filter(ch => ch.tag === section).map(ch => (
                  <div key={ch.id} style={{ background: `${ch.couleur}08`, border: `1px solid ${ch.couleur}28`, borderRadius: 16, overflow: 'hidden' }}>
                    <div style={{ background: `${ch.couleur}14`, borderBottom: `1px solid ${ch.couleur}20`, padding: '14px 20px', display: 'flex', gap: 12, alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                        <div style={{ width: 40, height: 40, borderRadius: 10, background: `${ch.couleur}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>{ch.icone}</div>
                        <div>
                          <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
                            <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: ch.couleur, fontWeight: 700 }}>CH.{ch.num}</span>
                            <h2 style={{ fontSize: 15, fontWeight: 800, color: 'var(--text)', margin: 0 }}>{ch.titre}</h2>
                          </div>
                        </div>
                      </div>
                      <Link href={`/bac/physique/sciences-tech/${ch.id}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '6px 12px', borderRadius: 8, background: `${ch.couleur}20`, border: `1px solid ${ch.couleur}40`, color: ch.couleur, fontSize: 11, fontWeight: 700, textDecoration: 'none' }}>📖 Cours →</Link>
                    </div>
                    <div style={{ padding: '12px 20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 7 }}>
                      {ch.souschap.map(sc => (
                        <div key={sc.titre} style={{ background: 'rgba(0,0,0,0.12)', borderRadius: 9, padding: '9px 12px' }}>
                          <div style={{ fontWeight: 700, fontSize: 10, color: ch.couleur, marginBottom: 4 }}>{sc.titre}</div>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                            {(sc.notions ?? []).map(n => <span key={n} style={{ fontSize: 9, padding: '2px 6px', borderRadius: 6, background: `${ch.couleur}12`, color: 'var(--text2)', border: `1px solid ${ch.couleur}18` }}>{n}</span>)}
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
            <Link href="/bac/physique/sciences-exp" style={{ padding: '10px 20px', borderRadius: 12, border: '1px solid rgba(6,182,212,0.3)', background: 'rgba(6,182,212,0.08)', color: '#22d3ee', fontSize: 13, fontWeight: 700, textDecoration: 'none' }}>← Sciences Exp.</Link>
            <Link href="/bac/physique" style={{ padding: '10px 20px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.05)', color: 'var(--text2)', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>↑ Toutes les sections</Link>
            <Link href="/bac/physique/informatique" style={{ padding: '10px 20px', borderRadius: 12, border: '1px solid rgba(139,92,246,0.3)', background: 'rgba(139,92,246,0.08)', color: '#a78bfa', fontSize: 13, fontWeight: 700, textDecoration: 'none' }}>Informatique →</Link>
          </div>

        </div>
      </main>
      <Footer />
    </>
  )
}
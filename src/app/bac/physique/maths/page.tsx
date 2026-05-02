'use client'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

// ══════════════════════════════════════════════════════════════════════
// PHYSIQUE-CHIMIE TUNISIE — Section Mathématiques
// Route : /bac/physique/maths
// Programme officiel MEN Tunisie · 4ème année Maths
// ══════════════════════════════════════════════════════════════════════

const CHAPITRES = [
  // ── PHYSIQUE ──────────────────────────────────────────────────────
  {
    id: 'cinematique',
    num: '1',
    titre: 'Cinématique du point',
    couleur: '#4f6ef7',
    icone: '🚀',
    tag: 'Mécanique',
    souschap: [
      { titre: 'Vecteur position & trajectoire', notions: ['Coordonnées cartésiennes','Trajectoire d\'un point','Repère de référence'] },
      { titre: 'Vecteur vitesse', notions: ['Vitesse moyenne','Vitesse instantanée','Composantes du vecteur vitesse'] },
      { titre: 'Vecteur accélération', notions: ['Accélération tangentielle','Accélération normale','Accélération totale'] },
      { titre: 'Types de mouvements', notions: ['MRU','MRUV','MCU','MCUV'] },
      { titre: 'Mouvement de projectiles', notions: ['Trajectoire parabolique','Portée','Hauteur maximale'] },
    ],
    formules: [
      { f: 'v = dr/dt', desc: 'Vecteur vitesse instantanée' },
      { f: 'a = dv/dt', desc: 'Vecteur accélération' },
      { f: 'x(t) = v₀cosθ·t', desc: 'Projectile — composante horizontale' },
      { f: 'y(t) = v₀sinθ·t − ½gt²', desc: 'Projectile — composante verticale' },
    ],
  },
  {
    id: 'dynamique',
    num: '2',
    titre: 'Dynamique du point matériel',
    couleur: '#10b981',
    icone: '⚙️',
    tag: 'Mécanique',
    souschap: [
      { titre: 'Principe d\'inertie', notions: ['Référentiels galiléens','Quantité de mouvement','Conservation de la quantité de mouvement'] },
      { titre: 'Deuxième loi de Newton', notions: ['ΣF⃗ = m·a⃗','Théorème du centre d\'inertie','Applications'] },
      { titre: 'Troisième loi de Newton', notions: ['Action-réaction','Forces mutuelles','Paires de forces'] },
      { titre: 'Travail et énergie', notions: ['Travail d\'une force','Théorème de l\'énergie cinétique','Puissance'] },
      { titre: 'Énergie potentielle & conservation', notions: ['Énergie potentielle gravitationnelle','Énergie potentielle élastique','Conservation de l\'énergie mécanique','Forces conservatives et non-conservatives'] },
    ],
    formules: [
      { f: 'ΣF⃗ = m·a⃗', desc: '2ème loi de Newton' },
      { f: 'Ec = ½mv²', desc: 'Énergie cinétique' },
      { f: 'Ep = mgh', desc: 'Énergie potentielle gravitationnelle' },
      { f: 'ΔEc = W(F)', desc: 'Théorème de l\'énergie cinétique' },
    ],
  },
  {
    id: 'satellites',
    num: '3',
    titre: 'Mouvement des satellites',
    couleur: '#8b5cf6',
    icone: '🛸',
    tag: 'Mécanique',
    souschap: [
      { titre: 'Champ gravitationnel', notions: ['g = GM/r²','Champ de pesanteur','Intensité du champ'] },
      { titre: 'Satellites en orbite circulaire', notions: ['Vitesse orbitale','Période de révolution','Altitude d\'orbite'] },
      { titre: '3ème loi de Kepler', notions: ['T² = k·r³','Constante de Kepler','Vérification expérimentale'] },
      { titre: 'Satellites géostationnaires', notions: ['Caractéristiques','Altitude ≈ 36 000 km','Applications : télécommunications, météo'] },
    ],
    formules: [
      { f: 'g = GM/r²', desc: 'Champ gravitationnel' },
      { f: 'v = √(GM/r)', desc: 'Vitesse orbitale' },
      { f: 'T² = (4π²/GM)·r³', desc: '3ème loi de Kepler' },
      { f: 'F = GMm/r²', desc: 'Loi de gravitation universelle' },
    ],
  },
  {
    id: 'champ-electrique',
    num: '4',
    titre: 'Champ électrique',
    couleur: '#f59e0b',
    icone: '⚡',
    tag: 'Électromagnétisme',
    souschap: [
      { titre: 'Interaction électrostatique', notions: ['Loi de Coulomb','Charges électriques','Force d\'interaction'] },
      { titre: 'Champ électrique', notions: ['E = kq/r²','Lignes de champ','Principe de superposition'] },
      { titre: 'Champ électrique uniforme', notions: ['Condensateur plan','Champ entre les armatures','Mouvement d\'une charge'] },
      { titre: 'Travail & potentiel électrique', notions: ['W = q·U_AB','Potentiel électrique V','Différence de potentiel','Équipotentielles'] },
    ],
    formules: [
      { f: 'F = kq₁q₂/r²', desc: 'Loi de Coulomb' },
      { f: 'E = kq/r²', desc: 'Champ électrique d\'une charge ponctuelle' },
      { f: 'W = q·U_AB', desc: 'Travail de la force électrique' },
      { f: 'E = U/d', desc: 'Champ dans un condensateur plan' },
    ],
  },
  {
    id: 'champ-magnetique',
    num: '5',
    titre: 'Champ magnétique',
    couleur: '#06b6d4',
    icone: '🧲',
    tag: 'Électromagnétisme',
    souschap: [
      { titre: 'Sources du champ magnétique', notions: ['Aimants','Courants électriques','Lignes de champ magnétique'] },
      { titre: 'Champ créé par un courant', notions: ['Fil rectiligne infini','Solénoïde : B = μ₀nI','Spire circulaire'] },
      { titre: 'Force de Laplace', notions: ['F = I·L·B·sinα','Règle de la main droite','Applications : moteur électrique'] },
      { titre: 'Force de Lorentz', notions: ['F = q·v·B·sinα','Trajectoire circulaire d\'une charge','Spectrographe de masse'] },
    ],
    formules: [
      { f: 'B = μ₀nI', desc: 'Champ dans un solénoïde' },
      { f: 'F = I·L·B·sinα', desc: 'Force de Laplace' },
      { f: 'F = q·v·B·sinα', desc: 'Force de Lorentz' },
      { f: 'r = mv/(qB)', desc: 'Rayon de la trajectoire circulaire' },
    ],
  },
  {
    id: 'induction',
    num: '6',
    titre: 'Induction électromagnétique',
    couleur: '#ec4899',
    icone: '🔄',
    tag: 'Électromagnétisme',
    souschap: [
      { titre: 'Flux magnétique', notions: ['Φ = B·S·cosθ','Flux à travers une surface','Unité : Weber (Wb)'] },
      { titre: 'Loi de Faraday', notions: ['e = −dΦ/dt','Force électromotrice d\'induction','Courant induit'] },
      { titre: 'Loi de Lenz', notions: ['Sens du courant induit','Opposition au changement de flux','Applications'] },
      { titre: 'Auto-induction', notions: ['Inductance L d\'une bobine','e_L = −L·di/dt','Énergie emmagasinée dans une bobine'] },
    ],
    formules: [
      { f: 'Φ = B·S·cosθ', desc: 'Flux magnétique' },
      { f: 'e = −dΦ/dt', desc: 'Loi de Faraday' },
      { f: 'e_L = −L·di/dt', desc: 'FEM d\'auto-induction' },
      { f: 'E_L = ½LI²', desc: 'Énergie dans une bobine' },
    ],
  },
  {
    id: 'lentilles',
    num: '7',
    titre: 'Lentilles minces',
    couleur: '#f97316',
    icone: '🔭',
    tag: 'Optique',
    souschap: [
      { titre: 'Types de lentilles', notions: ['Lentilles convergentes','Lentilles divergentes','Foyers principal objet & image','Centre optique O'] },
      { titre: 'Relation de conjugaison', notions: ['1/OA\' − 1/OA = 1/f\'','Distance focale f\'','Vergence V = 1/f\''] },
      { titre: 'Grandissement', notions: ['γ = A\'B\'/AB = OA\'/OA','Image réelle / virtuelle','Image droite / renversée'] },
      { titre: 'Instruments d\'optique', notions: ['Loupe : G = D/f\'','Microscope','Lunette astronomique'] },
    ],
    formules: [
      { f: '1/OA\' − 1/OA = 1/f\'', desc: 'Relation de conjugaison' },
      { f: 'γ = OA\'/OA', desc: 'Grandissement transversal' },
      { f: 'V = 1/f\' (dioptries)', desc: 'Vergence d\'une lentille' },
      { f: 'G_loupe = D/f\'', desc: 'Grossissement d\'une loupe (D = 0,25 m)' },
    ],
  },
  {
    id: 'ondes-lumineuses',
    num: '8',
    titre: 'Ondes lumineuses',
    couleur: '#14b8a6',
    icone: '🌈',
    tag: 'Optique',
    souschap: [
      { titre: 'Diffraction de la lumière', notions: ['Tache centrale','Condition : λ ≈ a','Limite de résolution','Critère de Rayleigh'] },
      { titre: 'Interférences lumineuses', notions: ['Fentes d\'Young','Interfrange i = λD/a','Interférences constructives / destructives','Différence de marche δ'] },
      { titre: 'Indice de réfraction', notions: ['n = c/v','Loi de Snell-Descartes','Réflexion totale interne'] },
      { titre: 'Spectre électromagnétique', notions: ['UV · Visible · IR','Longueur d\'onde dans le vide','Couleurs et longueurs d\'onde'] },
    ],
    formules: [
      { f: 'i = λD/a', desc: 'Interfrange (fentes d\'Young)' },
      { f: 'δ = kλ', desc: 'Interférences constructives' },
      { f: 'n = c/v', desc: 'Indice de réfraction' },
      { f: 'n₁sinθ₁ = n₂sinθ₂', desc: 'Loi de Snell-Descartes' },
    ],
  },
  // ── CHIMIE ────────────────────────────────────────────────────────
  {
    id: 'redox',
    num: '1',
    titre: 'Réactions d\'oxydoréduction',
    couleur: '#ef4444',
    icone: '⚗️',
    tag: 'Chimie',
    souschap: [
      { titre: 'Transfert d\'électrons', notions: ['Oxydant / Réducteur','Couple Ox/Red','Demi-équation électronique'] },
      { titre: 'Nombre d\'oxydation', notions: ['Règles de détermination','Variation du n.o.','Identification Ox/Red'] },
      { titre: 'Équilibrage des réactions redox', notions: ['Par voie humide (milieu acide/basique)','Par voie sèche','Conservation de la charge'] },
      { titre: 'Piles électrochimiques', notions: ['Anode / Cathode','Force électromotrice (FEM)','Pont salin','Pile Daniell'] },
      { titre: 'Électrolyse', notions: ['Réactions forcées','Loi de Faraday','Applications industrielles'] },
    ],
    formules: [
      { f: 'm = M·I·t/(n·F)', desc: 'Masse déposée par électrolyse (Faraday)' },
      { f: 'F = 96 500 C/mol', desc: 'Constante de Faraday' },
    ],
  },
  {
    id: 'acide-base',
    num: '2',
    titre: 'Réactions acide-base',
    couleur: '#10b981',
    icone: '🧪',
    tag: 'Chimie',
    souschap: [
      { titre: 'Couples acide/base', notions: ['Théorie de Brønsted','Couple AH/A⁻','Réaction acide-base'] },
      { titre: 'pH des solutions', notions: ['pH = −log[H₃O⁺]','Acide fort / faible','Base forte / faible'] },
      { titre: 'Constante d\'acidité K_A', notions: ['pKa = −log Ka','Diagramme de prédominance','Espèces majoritaires'] },
      { titre: 'Dosage acide-base', notions: ['Équivalence : n_a/b stoech.','Indicateurs colorés','pH-métrie','Conductimétrie'] },
    ],
    formules: [
      { f: 'pH = −log[H₃O⁺]', desc: 'Définition du pH' },
      { f: 'Ka = [A⁻][H₃O⁺]/[AH]', desc: 'Constante d\'acidité' },
      { f: 'pKa = −log Ka', desc: 'pKa' },
      { f: 'pH < pKa → AH prédomine', desc: 'Diagramme de prédominance' },
    ],
  },
  {
    id: 'cinetique',
    num: '3',
    titre: 'Cinétique chimique',
    couleur: '#f59e0b',
    icone: '⏱️',
    tag: 'Chimie',
    souschap: [
      { titre: 'Vitesse de réaction', notions: ['v = −d[A]/dt','Vitesse volumique','Taux d\'avancement'] },
      { titre: 'Facteurs cinétiques', notions: ['Concentration','Température','Catalyseur','Lumière'] },
      { titre: 'Évolution temporelle', notions: ['Courbes [A](t) et [P](t)','Temps de demi-réaction t₁/₂','Ordre de réaction'] },
    ],
    formules: [
      { f: 'v = −d[A]/dt = d[P]/dt', desc: 'Vitesse de réaction' },
      { f: 't₁/₂ : [A] = [A]₀/2', desc: 'Temps de demi-réaction' },
    ],
  },
  {
    id: 'equilibre',
    num: '4',
    titre: 'Équilibre chimique',
    couleur: '#8b5cf6',
    icone: '⚖️',
    tag: 'Chimie',
    souschap: [
      { titre: 'État d\'équilibre dynamique', notions: ['Réactions réversibles','Quotient de réaction Qr','Constante d\'équilibre K'] },
      { titre: 'Critère d\'évolution', notions: ['Qr < K → sens direct','Qr > K → sens inverse','Qr = K → équilibre'] },
      { titre: 'Déplacement d\'équilibre', notions: ['Loi de Le Chatelier','Influence de la concentration','Influence de la température','Influence de la pression'] },
    ],
    formules: [
      { f: 'Qr = [C]^c[D]^d / ([A]^a[B]^b)', desc: 'Quotient de réaction' },
      { f: 'Qr < K → évolution sens direct', desc: 'Critère d\'évolution' },
    ],
  },
  {
    id: 'organique',
    num: '5',
    titre: 'Chimie organique',
    couleur: '#06b6d4',
    icone: '🔬',
    tag: 'Chimie',
    souschap: [
      { titre: 'Structure des molécules organiques', notions: ['Formules brute / développée / semi-développée','Isomérie de chaîne, position, fonction','Groupes caractéristiques'] },
      { titre: 'Réactions en chimie organique', notions: ['Substitution (alcanes)','Addition (alcènes)','Élimination','Oxydation : alcools → aldéhydes → acides','Estérification','Hydrolyse des esters','Saponification'] },
      { titre: 'Polymères', notions: ['Polyaddition : polyéthylène, PVC','Polycondensation : polyesters, polyamides','Propriétés thermoplastiques / thermodurcissables'] },
    ],
    formules: [],
  },
]

export default function PhysiqueMathsTunisiePage() {
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
            <span style={{ color: '#f59e0b' }}>Section Mathématiques</span>
          </div>

          {/* HEADER */}
          <div style={{ marginBottom: 40 }}>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 14, flexWrap: 'wrap' }}>
              <span className="label">📐 Section Mathématiques · 4ème année</span>
              <span style={{ fontSize: 11, padding: '3px 10px', borderRadius: 20, background: 'rgba(245,158,11,0.2)', color: '#fbbf24', fontWeight: 800 }}>⭐ Baccalauréat Tunisie</span>
            </div>
            <h1 style={{ fontSize: 'clamp(24px,3.5vw,42px)', marginBottom: 14 }}>
              Physique-Chimie<br />
              <span style={{ background: 'linear-gradient(90deg,#f59e0b,#06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Section Maths — Programme complet
              </span>
            </h1>
            <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', fontSize: 13, color: 'var(--muted)', marginBottom: 20 }}>
              <span>📚 13 chapitres</span><span>·</span>
              <span>📐 8 Physique · 5 Chimie</span><span>·</span>
              <span>📊 210+ formules</span><span>·</span>
              <span>🤖 Solveur IA intégré</span>
            </div>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <Link href="/solve" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '9px 18px', borderRadius: 10, background: 'linear-gradient(135deg,#f59e0b,#f97316)', color: 'white', fontSize: 13, fontWeight: 700, textDecoration: 'none' }}>
                🧮 Solveur IA
              </Link>
              <Link href="/chat" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '9px 18px', borderRadius: 10, background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.14)', color: 'var(--text)', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>
                🤖 Chat Prof
              </Link>
              <Link href="/simulation" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '9px 18px', borderRadius: 10, background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.3)', color: '#fbbf24', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>
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

          {/* CHAPITRES PHYSIQUE */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 32 }}>
            {CHAPITRES.filter(ch => ch.tag !== 'Chimie').map(ch => (
              <div key={ch.id} style={{ background: `${ch.couleur}08`, border: `1px solid ${ch.couleur}28`, borderRadius: 18, overflow: 'hidden' }}>
                <div style={{ background: `${ch.couleur}14`, borderBottom: `1px solid ${ch.couleur}20`, padding: '16px 22px', display: 'flex', gap: 14, alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                    <div style={{ width: 44, height: 44, borderRadius: 12, background: `${ch.couleur}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>
                      {ch.icone}
                    </div>
                    <div>
                      <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap', marginBottom: 2 }}>
                        <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: ch.couleur, fontWeight: 700 }}>CH.{ch.num}</span>
                        <h2 style={{ fontSize: 16, fontWeight: 800, color: 'var(--text)', margin: 0 }}>{ch.titre}</h2>
                        <span style={{ fontSize: 10, padding: '2px 9px', borderRadius: 20, background: `${ch.couleur}20`, color: ch.couleur, fontWeight: 700 }}>{ch.tag}</span>
                      </div>
                      <div style={{ fontSize: 11, color: 'var(--muted)' }}>{ch.souschap.length} sous-chapitres</div>
                    </div>
                  </div>
                  <Link href={`/bac/physique/maths/${ch.id}`}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '7px 14px', borderRadius: 9, background: `${ch.couleur}20`, border: `1px solid ${ch.couleur}40`, color: ch.couleur, fontSize: 12, fontWeight: 700, textDecoration: 'none' }}>
                    📖 Cours complet →
                  </Link>
                </div>
                <div style={{ padding: '14px 22px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 8, marginBottom: ch.formules.length > 0 ? 12 : 0 }}>
                    {ch.souschap.map(sc => (
                      <div key={sc.titre} style={{ background: 'rgba(0,0,0,0.12)', borderRadius: 10, padding: '10px 13px' }}>
                        <div style={{ fontWeight: 700, fontSize: 11, color: ch.couleur, marginBottom: 5 }}>{sc.titre}</div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                          {sc.notions.map(n => (
                            <span key={n} style={{ fontSize: 10, padding: '2px 7px', borderRadius: 8, background: `${ch.couleur}12`, color: 'var(--text2)', border: `1px solid ${ch.couleur}18` }}>{n}</span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  {ch.formules.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                      {ch.formules.map(f => (
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

          {/* CHAPITRES CHIMIE */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {CHAPITRES.filter(ch => ch.tag === 'Chimie').map(ch => (
              <div key={ch.id} style={{ background: `${ch.couleur}08`, border: `1px solid ${ch.couleur}28`, borderRadius: 18, overflow: 'hidden' }}>
                <div style={{ background: `${ch.couleur}14`, borderBottom: `1px solid ${ch.couleur}20`, padding: '16px 22px', display: 'flex', gap: 14, alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                    <div style={{ width: 44, height: 44, borderRadius: 12, background: `${ch.couleur}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>
                      {ch.icone}
                    </div>
                    <div>
                      <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap', marginBottom: 2 }}>
                        <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: ch.couleur, fontWeight: 700 }}>CH.{ch.num}</span>
                        <h2 style={{ fontSize: 16, fontWeight: 800, color: 'var(--text)', margin: 0 }}>{ch.titre}</h2>
                        <span style={{ fontSize: 10, padding: '2px 9px', borderRadius: 20, background: `${ch.couleur}20`, color: ch.couleur, fontWeight: 700 }}>{ch.tag}</span>
                      </div>
                      <div style={{ fontSize: 11, color: 'var(--muted)' }}>{ch.souschap.length} sous-chapitres</div>
                    </div>
                  </div>
                  <Link href={`/bac/physique/maths/${ch.id}`}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '7px 14px', borderRadius: 9, background: `${ch.couleur}20`, border: `1px solid ${ch.couleur}40`, color: ch.couleur, fontSize: 12, fontWeight: 700, textDecoration: 'none' }}>
                    📖 Cours complet →
                  </Link>
                </div>
                <div style={{ padding: '14px 22px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 8, marginBottom: ch.formules.length > 0 ? 12 : 0 }}>
                    {ch.souschap.map(sc => (
                      <div key={sc.titre} style={{ background: 'rgba(0,0,0,0.12)', borderRadius: 10, padding: '10px 13px' }}>
                        <div style={{ fontWeight: 700, fontSize: 11, color: ch.couleur, marginBottom: 5 }}>{sc.titre}</div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                          {sc.notions.map(n => (
                            <span key={n} style={{ fontSize: 10, padding: '2px 7px', borderRadius: 8, background: `${ch.couleur}12`, color: 'var(--text2)', border: `1px solid ${ch.couleur}18` }}>{n}</span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  {ch.formules.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                      {ch.formules.map(f => (
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

          {/* Navigation */}
          <div style={{ marginTop: 48, display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/bac/physique" style={{ padding: '10px 20px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.05)', color: 'var(--text2)', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>
              ↑ Toutes les sections
            </Link>
            <Link href="/bac/physique/sciences-exp" style={{ padding: '10px 20px', borderRadius: 12, border: '1px solid rgba(6,182,212,0.3)', background: 'rgba(6,182,212,0.08)', color: '#22d3ee', fontSize: 13, fontWeight: 700, textDecoration: 'none' }}>
              Sciences Exp. →
            </Link>
          </div>

        </div>
      </main>
      <Footer />
    </>
  )
}
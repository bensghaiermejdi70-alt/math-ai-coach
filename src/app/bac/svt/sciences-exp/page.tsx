'use client'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

// ══════════════════════════════════════════════════════════════════════
// SVT TUNISIE — Section Sciences Expérimentales
// Route : /bac/svt/sciences-exp
// Programme officiel MEN Tunisie · 4ème année Sciences Exp.
// 9 chapitres biologie + 5 chapitres (Nutrition & Éco) = 14 au total
// ══════════════════════════════════════════════════════════════════════

const CHAPITRES = [

  // ── THÈME I — GÉNÉTIQUE ──────────────────────────────────────────
  {
    id: 'brassage-genetique',
    num: '1',
    titre: 'Le brassage de l\'information génétique',
    couleur: '#4f6ef7',
    icone: '🧬',
    tag: 'Thème I — Génétique',
    souschap: [
      { titre: 'La méiose et ses conséquences', notions: ['Brassage interchromosomique','Indépendance des chromosomes','Brassage intrachromosomique','Crossing-over'] },
      { titre: 'Diversité génétique', notions: ['Recombinaisons possibles','Variabilité des gamètes','Diversité des individus'] },
    ],
    formules: [
      { f: 'Nombre de gamètes différents = 2ⁿ', desc: 'n = nombre de paires de chromosomes (sans crossing-over)' },
    ],
  },
  {
    id: 'transmission-hereditaire',
    num: '2',
    titre: 'La transmission de l\'information génétique',
    couleur: '#8b5cf6',
    icone: '🔗',
    tag: 'Thème I — Génétique',
    souschap: [
      { titre: 'Lois de Mendel', notions: ['Monohybridisme','Dihybridisme','Loi de ségrégation','Loi d\'assortiment indépendant'] },
      { titre: 'Hérédité liée au sexe', notions: ['Chromosomes sexuels X et Y','Gènes liés au sexe','Transmission croisée'] },
      { titre: 'Risque et diagnostic', notions: ['Risque de consanguinité','Diagnostic prénatal','Sonde moléculaire','Caryotype'] },
    ],
    formules: [
      { f: 'F1 = Aa (monohybridisme) → F2 : 3/4 A_ · 1/4 aa', desc: 'Croisement monohybride (dominance complète)' },
    ],
  },
  {
    id: 'mutations-scexp',
    num: '3',
    titre: 'Les mutations',
    couleur: '#ef4444',
    icone: '⚠️',
    tag: 'Thème I — Génétique',
    souschap: [
      { titre: 'Mutations géniques', notions: ['Substitution de bases','Délétion / insertion','Faux-sens · non-sens','Agents mutagènes'] },
      { titre: 'Mutations chromosomiques', notions: ['Délétion · duplication','Inversion · translocation','Aneuploïdie (trisomie 21)','Non-disjonction en méiose'] },
      { titre: 'Conséquences biologiques', notions: ['Expression phénotypique','Maladies génétiques','Cancers','Évolution'] },
    ],
    formules: [],
  },
  {
    id: 'genetique-populations',
    num: '4',
    titre: 'Génétique des populations',
    couleur: '#06b6d4',
    icone: '👥',
    tag: 'Thème I — Génétique',
    souschap: [
      { titre: 'Fréquences alléliques', notions: ['Fréquence allélique p et q','p + q = 1','Fréquences génotypiques','Calcul à partir d\'un échantillon'] },
      { titre: 'Équilibre Hardy-Weinberg', notions: ['Conditions d\'équilibre','p² + 2pq + q² = 1','Population panmictique','Applications médicales'] },
    ],
    formules: [
      { f: 'p² + 2pq + q² = 1', desc: 'Loi de Hardy-Weinberg (p = fréq. allèle A ; q = fréq. allèle a)' },
      { f: 'q = √(fréq. homozygotes récessifs)', desc: 'Calcul de q si dominance complète' },
    ],
  },

  // ── THÈME II — MILIEU INTÉRIEUR & NEUROPHYSIOLOGIE ───────────────
  {
    id: 'milieu-interieur',
    num: '5',
    titre: 'La constance du milieu intérieur',
    couleur: '#10b981',
    icone: '💧',
    tag: 'Thème II — Milieu intérieur',
    souschap: [
      { titre: 'Compartiments liquidiens', notions: ['Plasma sanguin','Liquide interstitiel','Liquide intracellulaire','Échanges entre compartiments'] },
      { titre: 'Constantes biologiques', notions: ['Glycémie 1g/L','Température 37°C','pH sanguin 7,4','Pression artérielle'] },
      { titre: 'Troubles et régulation', notions: ['Conséquences des variations','Homéostasie','Rétrocontrôle'] },
    ],
    formules: [
      { f: 'Glycémie normale : 0,8 – 1,2 g/L', desc: 'Constante biologique à maintenir' },
    ],
  },
  {
    id: 'regulation-glycemie',
    num: '6',
    titre: 'La régulation de la glycémie',
    couleur: '#f59e0b',
    icone: '🍬',
    tag: 'Thème II — Milieu intérieur',
    souschap: [
      { titre: 'Rôle du foie', notions: ['Glycogénogenèse','Glycogénolyse','Néoglucogenèse','Stockage du glycogène'] },
      { titre: 'Rôle du pancréas', notions: ['Insuline (cellules β)','Glucagon (cellules α)','Hormones antagonistes','Îlots de Langerhans'] },
      { titre: 'Boucle de régulation', notions: ['Rétrocontrôle négatif','Hyperglycémie → insuline','Hypoglycémie → glucagon'] },
      { titre: 'Diabète', notions: ['Diabète type 1 (insulino-dépendant)','Diabète type 2 (non insulino-dépendant)','Symptômes et traitement'] },
    ],
    formules: [
      { f: 'Hyperglycémie → ↑ insuline → ↓ glycémie', desc: 'Boucle de rétrocontrôle négatif' },
    ],
  },
  {
    id: 'systeme-nerveux-scexp',
    num: '7',
    titre: 'Le système nerveux et la régulation',
    couleur: '#06b6d4',
    icone: '🧠',
    tag: 'Thème II — Milieu intérieur',
    souschap: [
      { titre: 'Le tissu nerveux', notions: ['Neurone : corps cellulaire · dendrites · axone','Cellules gliales','Gaine de myéline','Nœuds de Ranvier'] },
      { titre: 'Le potentiel de repos et d\'action', notions: ['Potentiel de repos : −70mV','Potentiel d\'action (dépolarisation)','Origine ionique Na⁺/K⁺','Propagation le long de l\'axone'] },
      { titre: 'La transmission synaptique', notions: ['Synapse chimique','Neurotransmetteur','PPSE et PPSI','Intégration postsynaptique'] },
      { titre: 'Le réflexe myotatique', notions: ['Récepteur → centre → effecteur','Coordination muscles antagonistes','Nature du message nerveux'] },
    ],
    formules: [
      { f: 'Potentiel de repos ≈ −70 mV', desc: 'Différence de potentiel membranaire au repos' },
      { f: 'Potentiel d\'action : −70 mV → +30 mV → −70 mV', desc: 'Dépolarisation et repolarisation' },
    ],
  },
  {
    id: 'defense-organisme-scexp',
    num: '8',
    titre: 'Défense de l\'organisme',
    couleur: '#8b5cf6',
    icone: '🛡️',
    tag: 'Thème II — Milieu intérieur',
    souschap: [
      { titre: 'Immunité non spécifique', notions: ['Barrières physiques (peau · muqueuses)','Phagocytose (macrophages · neutrophiles)','Inflammation','Protéines du complément'] },
      { titre: 'Immunité spécifique humorale', notions: ['Lymphocytes B','Anticorps (immunoglobulines)','Mémoire immunologique','Plasmocytes'] },
      { titre: 'Immunité spécifique cellulaire', notions: ['Lymphocytes T cytotoxiques','Lymphocytes T auxiliaires','Reconnaissance antigène','CMH (complexe majeur d\'histocompatibilité)'] },
      { titre: 'Applications', notions: ['Vaccination (mémoire immunitaire)','Sérothérapie (anticorps préformés)','Comparaison : vaccination vs sérothérapie'] },
    ],
    formules: [],
  },
  {
    id: 'hygiene-systeme-nerveux',
    num: '9',
    titre: 'Hygiène du système nerveux',
    couleur: '#ec4899',
    icone: '🚫',
    tag: 'Thème II — Milieu intérieur',
    souschap: [
      { titre: 'Les drogues et le système nerveux', notions: ['Définition de la drogue','Mécanismes d\'action','Exemple : cocaïne (blocage recapture dopamine)','Effets nocifs sur le SN','Dépendance et addiction'] },
      { titre: 'Le stress', notions: ['Définition et causes','Effets physiologiques du stress','Cortisol et adrénaline','Mesures de protection et hygiène de vie'] },
    ],
    formules: [],
  },

  // ── THÈME III — REPRODUCTION HUMAINE & SANTÉ ─────────────────────
  {
    id: 'fonction-reproductrice-homme',
    num: '10',
    titre: 'La fonction reproductrice chez l\'homme',
    couleur: '#4f6ef7',
    icone: '♂️',
    tag: 'Thème III — Reproduction',
    souschap: [
      { titre: 'Structure du spermatozoïde', notions: ['Tête : acrosome · noyau (ADN haploïde)','Pièce intermédiaire : mitochondries','Flagelle : mobilité','Particularités cytologiques'] },
      { titre: 'La spermatogenèse', notions: ['Cellules souches → spermatogonies','Multiplication (mitoses)','Accroissement','Maturation (méiose)','Différenciation (spermiogenèse)'] },
      { titre: 'Rôle de la testostérone', notions: ['Cellules de Leydig (interstitielles)','Caractères sexuels secondaires','Maintien de la spermatogenèse','Effets biologiques'] },
      { titre: 'Régulation hormonale', notions: ['Complexe hypothalamo-hypophysaire','GnRH (hypothalamus)','LH → testostérone','FSH → spermatogenèse','Rétrocontrôle négatif'] },
    ],
    formules: [],
  },
  {
    id: 'fonction-reproductrice-femme',
    num: '11',
    titre: 'La fonction reproductrice chez la femme',
    couleur: '#ec4899',
    icone: '♀️',
    tag: 'Thème III — Reproduction',
    souschap: [
      { titre: 'La folliculogenèse', notions: ['Follicule primordial → follicule mûr (de De Graaf)','Structure du follicule mûr','Ovulation (rupture du follicule)','Corps jaune post-ovulatoire'] },
      { titre: 'L\'ovogenèse', notions: ['Étapes de la formation des ovocytes','Ovocyte I → ovocyte II (méiose I)','Méiose II achevée après fécondation','Structure de l\'ovocyte II'] },
      { titre: 'Cycle sexuel féminin', notions: ['Cycle ovarien (28 jours)','Cycle utérin (endomètre)','Cycle hormonal : FSH · LH · œstrogènes · progestérone'] },
      { titre: 'Régulation hormonale', notions: ['Complexe hypothalamo-hypophysaire','GnRH pulsatile (signalé)','Rétrocontrôle : négatif et positif (pic LH)'] },
    ],
    formules: [
      { f: 'Ovulation : jour 14 du cycle (cycle de 28j)', desc: 'Pic de LH → rupture du follicule mûr' },
    ],
  },
  {
    id: 'fecondation-procreation',
    num: '12',
    titre: 'La fécondation et la procréation',
    couleur: '#f59e0b',
    icone: '🌱',
    tag: 'Thème III — Reproduction',
    souschap: [
      { titre: 'Conditions et étapes de la fécondation', notions: ['Rencontre des gamètes (trompes)','Capacitation du spermatozoïde','Pénétration et réaction corticale','Fusion des pronuclei → cellule-œuf'] },
      { titre: 'Maîtrise de la procréation', notions: ['Contraception chimique (pilule)','Contraception mécanique (préservatif)','FIVETE (FIV + transfert embryon)','IAD (insémination artificielle)'] },
      { titre: 'Hygiène de la procréation', notions: ['IST et prévention','Comportements de protection','Suivi de grossesse'] },
    ],
    formules: [],
  },

  // ── THÈME IV — NUTRITION & ENVIRONNEMENT ─────────────────────────
  {
    id: 'nutrition-animale',
    num: '13',
    titre: 'Nutrition animale',
    couleur: '#10b981',
    icone: '🍎',
    tag: 'Thème IV — Nutrition & Environnement',
    souschap: [
      { titre: 'Digestion des aliments', notions: ['Glucides → glucose (amylase salivaire)','Protides → acides aminés (pepsine · trypsine)','Lipides → AG + glycérol (lipase)','pH et température optimaux des enzymes'] },
      { titre: 'Absorption des nutriments', notions: ['Villosités intestinales','Voies d\'absorption (sang/lymphe)','Transport jusqu\'aux cellules'] },
      { titre: 'Respiration cellulaire', notions: ['Glycolyse (cytoplasme)','Cycle de Krebs (matrice mitochondriale)','Chaîne respiratoire','Bilan : 1 glucose → 36-38 ATP','CO₂ + H₂O produits'] },
    ],
    formules: [
      { f: 'C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + 38 ATP', desc: 'Bilan simplifié de la respiration cellulaire' },
    ],
  },
  {
    id: 'nutrition-vegetale',
    num: '14',
    titre: 'Nutrition végétale',
    couleur: '#22c55e',
    icone: '🌿',
    tag: 'Thème IV — Nutrition & Environnement',
    souschap: [
      { titre: 'Besoins en eau', notions: ['Absorption (osmose · poils absorbants)','Conduction dans les vaisseaux du xylème','Transpiration (stomates)','Équilibre hydrique'] },
      { titre: 'Besoins en sels minéraux', notions: ['N · P · K · Mg · Fe','Effets de carence et d\'excès','Fertilisation des sols','Risques des engrais chimiques'] },
      { titre: 'La photosynthèse', notions: ['Conditions : lumière · CO₂ · eau','Phase photochimique (photolyse de l\'eau)','Phase biochimique (cycle de Calvin)','Rôle de la chlorophylle','Facteurs de l\'environnement'] },
    ],
    formules: [
      { f: '6CO₂ + 6H₂O + lumière → C₆H₁₂O₆ + 6O₂', desc: 'Bilan simplifié de la photosynthèse' },
      { f: 'Intensité photosynthétique ∝ [CO₂] · lumière · temp.', desc: 'Facteurs limitants de la photosynthèse' },
    ],
  },
]

export default function SvtSciencesExpPage() {
  const BIO_CH = CHAPITRES.filter(ch => ['Thème I — Génétique', 'Thème II — Milieu intérieur', 'Thème III — Reproduction'].includes(ch.tag))
  const ECO_CH = CHAPITRES.filter(ch => ch.tag === 'Thème IV — Nutrition & Environnement')

  return (
    <>
      <Navbar />
      <main style={{ position: 'relative', zIndex: 1, paddingTop: 80 }}>
        <div className="container" style={{ paddingTop: 40, paddingBottom: 80 }}>

          {/* FIL D'ARIANE */}
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 12, color: 'var(--muted)', marginBottom: 24 }}>
            <Link href="/bac" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇹🇳 Tunisie</Link>
            <span>›</span>
            <Link href="/bac/svt" style={{ color: 'var(--muted)', textDecoration: 'none' }}>SVT</Link>
            <span>›</span>
            <span style={{ color: '#22c55e' }}>Sciences Expérimentales</span>
          </div>

          {/* HEADER */}
          <div style={{ marginBottom: 36 }}>
            <span className="label" style={{ marginBottom: 12, display: 'inline-block' }}>
              🇹🇳 Programme officiel MEN Tunisie · SVT Sciences Exp.
            </span>
            <h1 style={{ fontSize: 'clamp(24px,3.5vw,44px)', marginBottom: 12 }}>
              SVT — Sciences Expérimentales<br />
              <span style={{ background: 'linear-gradient(90deg,#22c55e,#4ade80)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                4ème Année · Bac Tunisie
              </span>
            </h1>
            <p style={{ maxWidth: 620, color: 'var(--text2)', fontSize: 14, lineHeight: 1.7, marginBottom: 20 }}>
              Programme officiel CNP · Sciences de la Vie et de la Terre · Section Sciences Expérimentales.
              14 chapitres · Génétique · Neurophysiologie · Reproduction · Nutrition & Environnement.
            </p>
            <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', fontSize: 13, color: 'var(--muted)' }}>
              <span>📚 14 chapitres</span><span>·</span>
              <span>🧬 Génétique · Neuro · Reproduction · Nutrition</span><span>·</span>
              <span>🤖 Solveur IA intégré</span>
            </div>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 16 }}>
              <Link href="/solve" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '9px 18px', borderRadius: 10, background: 'linear-gradient(135deg,#22c55e,#16a34a)', color: 'white', fontSize: 13, fontWeight: 700, textDecoration: 'none' }}>
                🧮 Solveur IA
              </Link>
              <Link href="/chat" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '9px 18px', borderRadius: 10, background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.14)', color: 'var(--text)', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>
                🤖 Chat Prof
              </Link>
              <Link href="/simulation" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '9px 18px', borderRadius: 10, background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)', color: '#4ade80', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>
                🎯 Simulation Bac
              </Link>
            </div>
          </div>

          {/* ──── CHAPITRES PAR THÈME ──────────────────────────────── */}
          {[
            { label: '🧬 Thème I — Génétique', color: '#4f6ef7', filter: 'Thème I — Génétique' },
            { label: '🧠 Thème II — Milieu intérieur & Neurophysiologie', color: '#10b981', filter: 'Thème II — Milieu intérieur' },
            { label: '👶 Thème III — Reproduction humaine & Santé', color: '#ec4899', filter: 'Thème III — Reproduction' },
            { label: '🌿 Thème IV — Nutrition & Environnement', color: '#22c55e', filter: 'Thème IV — Nutrition & Environnement' },
          ].map(theme => {
            const themeChaps = CHAPITRES.filter(ch => ch.tag === theme.filter)
            return (
              <div key={theme.label} style={{ marginBottom: 40 }}>
                {/* Séparateur thème */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                  <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
                  <span style={{ fontSize: 12, fontWeight: 800, color: theme.color, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{theme.label}</span>
                  <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {themeChaps.map(ch => (
                    <div key={ch.id} style={{ background: `${ch.couleur}08`, border: `1px solid ${ch.couleur}28`, borderRadius: 18, overflow: 'hidden' }}>
                      <div style={{ background: `${ch.couleur}14`, borderBottom: `1px solid ${ch.couleur}20`, padding: '16px 22px', display: 'flex', gap: 14, alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                          <div style={{ width: 44, height: 44, borderRadius: 12, background: `${ch.couleur}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>{ch.icone}</div>
                          <div>
                            <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap', marginBottom: 2 }}>
                              <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: ch.couleur, fontWeight: 700 }}>CH.{ch.num}</span>
                              <h2 style={{ fontSize: 16, fontWeight: 800, color: 'var(--text)', margin: 0 }}>{ch.titre}</h2>
                              <span style={{ fontSize: 10, padding: '2px 9px', borderRadius: 20, background: `${ch.couleur}20`, color: ch.couleur, fontWeight: 700 }}>SVT</span>
                            </div>
                            <div style={{ fontSize: 11, color: 'var(--muted)' }}>{ch.souschap.length} sous-chapitres</div>
                          </div>
                        </div>
                        <Link href={`/bac/svt/sciences-exp/${ch.id}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '7px 14px', borderRadius: 9, background: `${ch.couleur}20`, border: `1px solid ${ch.couleur}40`, color: ch.couleur, fontSize: 12, fontWeight: 700, textDecoration: 'none' }}>
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
              </div>
            )
          })}

          {/* Navigation */}
          <div style={{ marginTop: 48, display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/bac/svt" style={{ padding: '10px 20px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.05)', color: 'var(--text2)', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>↑ Toutes les sections SVT</Link>
            <Link href="/bac/svt/mathematique" style={{ padding: '10px 20px', borderRadius: 12, border: '1px solid rgba(74,222,128,0.3)', background: 'rgba(74,222,128,0.08)', color: '#4ade80', fontSize: 13, fontWeight: 700, textDecoration: 'none' }}>Section Maths →</Link>
            <Link href="/bac" style={{ padding: '10px 20px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.1)', background: 'transparent', color: 'var(--muted)', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>← Toutes matières</Link>
          </div>

        </div>
      </main>
      <Footer />
    </>
  )
}
'use client'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

// ══════════════════════════════════════════════════════════════════════
// SVT TUNISIE — Section Mathématiques
// Route : /bac/svt/mathematique
// Programme officiel MEN Tunisie · 4ème année Section Maths
// 13 chapitres : Génétique · Milieu intérieur · Reproduction · Nutrition · Géologie & Évolution
// ══════════════════════════════════════════════════════════════════════

const CHAPITRES = [

  // ── THÈME I — GÉNÉTIQUE ──────────────────────────────────────────
  {
    id: 'brassage-genetique-maths',
    num: '1',
    titre: 'Le brassage de l\'information génétique',
    couleur: '#4f6ef7',
    icone: '🧬',
    tag: 'Thème I — Génétique',
    souschap: [
      { titre: 'La méiose et ses conséquences', notions: ['Brassage interchromosomique','Brassage intrachromosomique (crossing-over)','Diversité des gamètes : 2ⁿ'] },
      { titre: 'Conséquences génétiques', notions: ['Recombinaison génétique','Variabilité des individus','Source de diversité'] },
    ],
    formules: [
      { f: 'Nombre de gamètes = 2ⁿ', desc: 'n = nombre de paires de chromosomes (brassage interchromosomique seul)' },
    ],
  },
  {
    id: 'transmission-hereditaire-maths',
    num: '2',
    titre: 'Transmission et hérédité',
    couleur: '#8b5cf6',
    icone: '🔗',
    tag: 'Thème I — Génétique',
    souschap: [
      { titre: 'Lois de Mendel', notions: ['Monohybridisme · dihybridisme','Dominance · récessivité','Loi de ségrégation · assortiment indépendant'] },
      { titre: 'Hérédité liée au sexe', notions: ['Chromosomes X et Y','Gènes liés à X','Transmission croisée · conductrice'] },
      { titre: 'Risque & diagnostic prénatal', notions: ['Consanguinité','Caryotype','Sonde moléculaire','Diagnostic prénatal'] },
    ],
    formules: [
      { f: 'F2 monohybride : 3/4 [A_] · 1/4 [aa]', desc: 'Dominance complète — ratio phénotypique' },
      { f: 'F2 dihybride (gènes indépendants) : 9:3:3:1', desc: 'Ratio phénotypique en F2' },
    ],
  },

  // ── THÈME II — MILIEU INTÉRIEUR & NEUROPHYSIOLOGIE ───────────────
  {
    id: 'milieu-interieur-maths',
    num: '3',
    titre: 'La constance du milieu intérieur',
    couleur: '#10b981',
    icone: '💧',
    tag: 'Thème II — Milieu intérieur',
    souschap: [
      { titre: 'Compartiments liquidiens', notions: ['Plasma · liquide interstitiel · liquide intracellulaire','Échanges entre compartiments'] },
      { titre: 'Constantes biologiques', notions: ['Glycémie 0,8–1,2 g/L','pH sanguin 7,35–7,45','Température 37°C','Troubles liés aux variations'] },
    ],
    formules: [
      { f: 'Glycémie normale = 0,8 – 1,2 g/L', desc: 'Constante à maintenir par homéostasie' },
    ],
  },
  {
    id: 'regulation-glycemie-maths',
    num: '4',
    titre: 'La régulation de la glycémie',
    couleur: '#f59e0b',
    icone: '🍬',
    tag: 'Thème II — Milieu intérieur',
    souschap: [
      { titre: 'Rôle du foie', notions: ['Glycogénogenèse (stockage)','Glycogénolyse (libération)','Néoglucogenèse'] },
      { titre: 'Hormones pancréatiques', notions: ['Insuline (cellules β)','Glucagon (cellules α)','Hormones antagonistes','Îlots de Langerhans'] },
      { titre: 'Rétrocontrôle & diabète', notions: ['Rétrocontrôle négatif','Diabète type 1 (insulino-dépendant)','Diabète type 2 (résistance à l\'insuline)'] },
    ],
    formules: [
      { f: 'Hyperglycémie → ↑ insuline → ↓ glycémie', desc: 'Boucle de rétrocontrôle négatif' },
    ],
  },
  {
    id: 'systeme-nerveux-maths',
    num: '5',
    titre: 'Le système nerveux et la régulation',
    couleur: '#06b6d4',
    icone: '🧠',
    tag: 'Thème II — Milieu intérieur',
    souschap: [
      { titre: 'Le tissu nerveux', notions: ['Neurone : corps · dendrites · axone','Gaine de myéline · nœuds de Ranvier','Cellules gliales'] },
      { titre: 'Potentiel de repos et d\'action', notions: ['Potentiel de repos : −70 mV','Dépolarisation Na⁺ · repolarisation K⁺','Loi du tout ou rien · propagation'] },
      { titre: 'Synapse et réflexe myotatique', notions: ['Neurotransmetteur · fente synaptique','PPSE et PPSI · intégration','Réflexe myotatique · muscles antagonistes'] },
    ],
    formules: [
      { f: 'Potentiel de repos ≈ −70 mV', desc: 'Différence de potentiel transmembranaire au repos' },
    ],
  },
  {
    id: 'defense-organisme-maths',
    num: '6',
    titre: 'Défense de l\'organisme',
    couleur: '#8b5cf6',
    icone: '🛡️',
    tag: 'Thème II — Milieu intérieur',
    souschap: [
      { titre: 'Immunité non spécifique', notions: ['Barrières physiques (peau · muqueuses)','Phagocytose · inflammation','Protéines du complément'] },
      { titre: 'Immunité spécifique', notions: ['Mémoire immunologique','Spécificité · diversité','Lymphocytes B et T','Anticorps'] },
      { titre: 'Applications', notions: ['Vaccination (mémoire active)','Sérothérapie (anticorps passifs)','Comparaison vaccination / sérothérapie'] },
    ],
    formules: [],
  },
  {
    id: 'hygiene-sn-maths',
    num: '7',
    titre: 'Hygiène du système nerveux',
    couleur: '#ec4899',
    icone: '🚫',
    tag: 'Thème II — Milieu intérieur',
    souschap: [
      { titre: 'Les drogues', notions: ['Définition · mécanismes d\'action','Effets nocifs sur le SN','Exemple : cocaïne (blocage recapture dopamine)','Dépendance et addiction'] },
      { titre: 'Le stress', notions: ['Définition · causes','Cortisol et adrénaline','Effets physiologiques','Mesures de protection et hygiène de vie'] },
    ],
    formules: [],
  },

  // ── THÈME III — REPRODUCTION HUMAINE & SANTÉ ─────────────────────
  {
    id: 'fonction-reproductrice-homme-maths',
    num: '8',
    titre: 'La fonction reproductrice chez l\'homme',
    couleur: '#4f6ef7',
    icone: '♂️',
    tag: 'Thème III — Reproduction',
    souschap: [
      { titre: 'Structure du spermatozoïde', notions: ['Tête : acrosome · noyau haploïde','Pièce intermédiaire : mitochondries','Flagelle : mobilité'] },
      { titre: 'La spermatogenèse', notions: ['Multiplication (mitoses)','Accroissement','Maturation (méiose) · méiose signalée sans détails','Différenciation (spermiogenèse)'] },
      { titre: 'Régulation hormonale', notions: ['Testostérone (cellules de Leydig)','Complexe hypothalamo-hypophysaire','GnRH → LH + FSH → rétrocontrôle négatif'] },
    ],
    formules: [],
  },
  {
    id: 'fonction-reproductrice-femme-maths',
    num: '9',
    titre: 'La fonction reproductrice chez la femme',
    couleur: '#ec4899',
    icone: '♀️',
    tag: 'Thème III — Reproduction',
    souschap: [
      { titre: 'Folliculogenèse et ovogenèse', notions: ['Follicule primordial → follicule mûr (De Graaf)','Ovogenèse : étapes (sans détails méiose)','Structure de l\'ovocyte II (schéma légendé)'] },
      { titre: 'Cycle sexuel féminin', notions: ['Cycle ovarien (28 j)','Cycle utérin','Cycle hormonal : FSH · LH · œstrogènes · progestérone'] },
      { titre: 'Régulation hypothalamo-hypophysaire', notions: ['GnRH pulsatile (signalé)','Pic de LH → ovulation','Rétrocontrôle positif puis négatif'] },
    ],
    formules: [
      { f: 'Ovulation ≈ j14 (cycle de 28 jours)', desc: 'Déclenchée par le pic de LH' },
    ],
  },
  {
    id: 'fecondation-procreation-maths',
    num: '10',
    titre: 'La fécondation et la procréation',
    couleur: '#f59e0b',
    icone: '🌱',
    tag: 'Thème III — Reproduction',
    souschap: [
      { titre: 'Conditions et étapes de la fécondation', notions: ['Rencontre des gamètes · capacitation','Pénétration · réaction corticale','Fusion des pronuclei → zygote 2n'] },
      { titre: 'Maîtrise de la procréation', notions: ['Contraception chimique (pilule)','Contraception mécanique (préservatif)','FIVETE · IAD'] },
      { titre: 'Hygiène de la procréation', notions: ['IST et prévention','Comportements de protection','Suivi de grossesse'] },
    ],
    formules: [],
  },

  // ── THÈME IV — NUTRITION & ENVIRONNEMENT ─────────────────────────
  {
    id: 'nutrition-animale-maths',
    num: '11',
    titre: 'Nutrition animale',
    couleur: '#10b981',
    icone: '🍎',
    tag: 'Thème IV — Nutrition & Environnement',
    souschap: [
      { titre: 'Digestion des aliments', notions: ['Glucides → glucose (amylase salivaire)','Protides → acides aminés (pepsine · trypsine)','Lipides → AG + glycérol (lipase)','Conditions d\'activité des enzymes'] },
      { titre: 'Respiration cellulaire', notions: ['Glycolyse (cytoplasme)','Cycle de Krebs (mitochondrie)','Chaîne respiratoire','Bilan : 1 glucose → 38 ATP'] },
    ],
    formules: [
      { f: 'C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + 38 ATP', desc: 'Bilan de la respiration cellulaire' },
    ],
  },
  {
    id: 'nutrition-vegetale-maths',
    num: '12',
    titre: 'Nutrition végétale',
    couleur: '#22c55e',
    icone: '🌿',
    tag: 'Thème IV — Nutrition & Environnement',
    souschap: [
      { titre: 'Absorption de l\'eau et des sels minéraux', notions: ['Osmose · poils absorbants','Xylème : conduction sève brute','Transpiration (stomates)','N · P · K · Mg · Fe'] },
      { titre: 'Photosynthèse', notions: ['Lumière · CO₂ · eau','Photolyse de l\'eau → O₂','Cycle de Calvin (CO₂ → glucose)','Rôle de la chlorophylle','Facteurs limitants'] },
    ],
    formules: [
      { f: '6CO₂ + 6H₂O + lumière → C₆H₁₂O₆ + 6O₂', desc: 'Bilan de la photosynthèse' },
    ],
  },

  // ── THÈME V — GÉOLOGIE & ÉVOLUTION ───────────────────────────────
  {
    id: 'evolution-geologie-maths',
    num: '13',
    titre: 'Évolution biologique & Géologie',
    couleur: '#f97316',
    icone: '🌍',
    tag: 'Thème V — Géologie & Évolution',
    souschap: [
      { titre: 'Théories de l\'évolution', notions: ['Lamarck · Darwin · néo-darwinisme','Sélection naturelle · adaptation','Variabilité génétique (mutations · brassage)','Dérive génétique'] },
      { titre: 'Preuves de l\'évolution', notions: ['Fossiles · stratigraphie','Anatomie comparée (homologie · analogie)','Données génétiques (ADN universel)','Phylogénie moléculaire'] },
      { titre: 'Spéciation', notions: ['Formation des espèces','Isolement reproducteur','Spéciation allopatrique et sympatrique'] },
      { titre: 'Tectonique des plaques', notions: ['Structure du globe terrestre (croûte · manteau · noyau)','Lithosphère · asthénosphère','Dérive des continents · expansion océanique','Subduction · formation des chaînes de montagnes','Séismes · volcanisme'] },
    ],
    formules: [],
  },
]

export default function SvtMathematiquePage() {
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
            <span style={{ color: '#4ade80' }}>Section Mathématiques</span>
          </div>

          {/* HEADER */}
          <div style={{ marginBottom: 36 }}>
            <span className="label" style={{ marginBottom: 12, display: 'inline-block' }}>
              🇹🇳 Programme officiel MEN Tunisie · SVT Section Maths
            </span>
            <h1 style={{ fontSize: 'clamp(24px,3.5vw,44px)', marginBottom: 12 }}>
              SVT — Section Mathématiques<br />
              <span style={{ background: 'linear-gradient(90deg,#4ade80,#86efac)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                4ème Année · Bac Tunisie
              </span>
            </h1>
            <p style={{ maxWidth: 620, color: 'var(--text2)', fontSize: 14, lineHeight: 1.7, marginBottom: 20 }}>
              Programme officiel CNP · SVT · Section Mathématiques · Coefficient 2.
              13 chapitres sur 5 thèmes — programme allégé par rapport à Sciences Expérimentales,
              avec un thème supplémentaire : Géologie & Évolution biologique.
            </p>
            <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', fontSize: 13, color: 'var(--muted)' }}>
              <span>📚 13 chapitres</span><span>·</span>
              <span>🧬 5 thèmes</span><span>·</span>
              <span>📐 Coef. 2</span><span>·</span>
              <span>🤖 Solveur IA intégré</span>
            </div>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 16 }}>
              <Link href="/solve" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '9px 18px', borderRadius: 10, background: 'linear-gradient(135deg,#4ade80,#22c55e)', color: 'white', fontSize: 13, fontWeight: 700, textDecoration: 'none' }}>
                🧮 Solveur IA
              </Link>
              <Link href="/chat" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '9px 18px', borderRadius: 10, background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.14)', color: 'var(--text)', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>
                🤖 Chat Prof
              </Link>
              <Link href="/simulation" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '9px 18px', borderRadius: 10, background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.3)', color: '#4ade80', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>
                🎯 Simulation Bac
              </Link>
            </div>
          </div>

          {/* NOTE PROGRAMME */}
          <div style={{ background: 'rgba(74,222,128,0.06)', border: '1px solid rgba(74,222,128,0.22)', borderRadius: 14, padding: '14px 20px', marginBottom: 40, display: 'flex', gap: 12, alignItems: 'flex-start', flexWrap: 'wrap' }}>
            <span style={{ fontSize: 20 }}>📋</span>
            <div>
              <div style={{ fontWeight: 700, fontSize: 13, color: '#4ade80', marginBottom: 6 }}>Programme SVT Section Maths — Spécificités</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
                {[
                  'Coefficient 2 — programme allégé',
                  'Thème I : Génétique (sans génétique des populations)',
                  'Thèmes II/III/IV : identiques à Sc.Exp.',
                  'Thème V : Géologie & Évolution (exclusif Maths)',
                  'Méiose signalée sans détail prophase I',
                ].map(n => (
                  <span key={n} style={{ fontSize: 11, background: 'rgba(74,222,128,0.09)', color: '#4ade80', padding: '3px 10px', borderRadius: 20, border: '1px solid rgba(74,222,128,0.2)' }}>
                    ✦ {n}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* ──── CHAPITRES PAR THÈME ──────────────────────────────── */}
          {[
            { label: '🧬 Thème I — Génétique', color: '#4f6ef7', filter: 'Thème I — Génétique' },
            { label: '🧠 Thème II — Milieu intérieur & Neurophysiologie', color: '#10b981', filter: 'Thème II — Milieu intérieur' },
            { label: '👶 Thème III — Reproduction humaine & Santé', color: '#ec4899', filter: 'Thème III — Reproduction' },
            { label: '🌿 Thème IV — Nutrition & Environnement', color: '#22c55e', filter: 'Thème IV — Nutrition & Environnement' },
            { label: '🌍 Thème V — Géologie & Évolution', color: '#f97316', filter: 'Thème V — Géologie & Évolution' },
          ].map(theme => {
            const themeChaps = CHAPITRES.filter(ch => ch.tag === theme.filter)
            return (
              <div key={theme.label} style={{ marginBottom: 40 }}>
                {/* Séparateur thème */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                  <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
                  <span style={{ fontSize: 12, fontWeight: 800, color: theme.color, textTransform: 'uppercase', letterSpacing: '0.1em', whiteSpace: 'nowrap' }}>{theme.label}</span>
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
                              <span style={{ fontSize: 10, padding: '2px 9px', borderRadius: 20, background: `${ch.couleur}20`, color: ch.couleur, fontWeight: 700 }}>SVT · Maths</span>
                            </div>
                            <div style={{ fontSize: 11, color: 'var(--muted)' }}>{ch.souschap.length} sous-chapitres</div>
                          </div>
                        </div>
                        <Link href={`/bac/svt/mathematique/${ch.id}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '7px 14px', borderRadius: 9, background: `${ch.couleur}20`, border: `1px solid ${ch.couleur}40`, color: ch.couleur, fontSize: 12, fontWeight: 700, textDecoration: 'none' }}>
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
            <Link href="/bac/svt/sciences-exp" style={{ padding: '10px 20px', borderRadius: 12, border: '1px solid rgba(34,197,94,0.3)', background: 'rgba(34,197,94,0.08)', color: '#22c55e', fontSize: 13, fontWeight: 700, textDecoration: 'none' }}>← Section Sc. Exp.</Link>
            <Link href="/bac/svt" style={{ padding: '10px 20px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.05)', color: 'var(--text2)', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>↑ Toutes les sections SVT</Link>
            <Link href="/bac" style={{ padding: '10px 20px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.1)', background: 'transparent', color: 'var(--muted)', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>← Toutes matières</Link>
          </div>

        </div>
      </main>
      <Footer />
    </>
  )
}
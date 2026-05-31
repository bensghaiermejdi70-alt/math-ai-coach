'use client'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

// ══════════════════════════════════════════════════════════════════════
// SVT FRANCE — Classe de Terminale Spécialité
// Route : /bac-france/svt/terminale
// Programme officiel MEN 2026 — Amalgame des 2 programmes officiels
// Coef. 16 · Épreuve 3h30 + ECE 1h
// 3 thèmes · 14 chapitres
// ══════════════════════════════════════════════════════════════════════

const COULEUR = '#16a34a'

const THEMES = [
  {
    tag: 'Thème 1 — La Terre, la vie & l\'évolution du vivant',
    couleur: '#22c55e',
    iconeTheme: '🧬',
    parties: [
      {
        label: 'Partie A — Génétique & Évolution',
        couleurPartie: '#22c55e',
        chapitres: [
          {
            id: 'origine-genotype-terminale',
            num: '1',
            titre: 'L\'origine du génotype des individus',
            icone: '🧬',
            souschap: [
              { titre: 'Méiose & formation des gamètes', notions: ['Division réductionnelle (méiose I)','Division équationnelle (méiose II)','Réduction du nombre de chromosomes (2n → n)','Tétrades & crossing-over en prophase I'] },
              { titre: 'Brassage génétique', notions: ['Brassage interchromosomique (anaphase I)','Brassage intrachromosomique (crossing-over)','Recombinaison génétique','Gamètes parentaux vs recombinants','Fréquence de recombinaison'] },
              { titre: 'Fécondation & diversité', notions: ['Fusion des gamètes (n + n → 2n)','Diversité des génotypes','Formation du zygote','Trisomie 21 (non-disjonction méiose)'] },
            ],
            notionsCles: ['Méiose','Crossing-over','Brassage génétique','Gamètes','Recombinaison','Trisomie 21'],
          },
          {
            id: 'complexification-genomes-terminale',
            num: '2',
            titre: 'La complexification des génomes',
            icone: '🔄',
            souschap: [
              { titre: 'Diversification génétique', notions: ['Mutations aléatoires (ponctuelles, chromosomiques)','Nouveaux allèles','Évolution des populations'] },
              { titre: 'Transferts horizontaux de gènes', notions: ['Conjugaison bactérienne','Transformation','Transduction virale','Différence transfert horizontal vs vertical'] },
              { titre: 'Endosymbiose', notions: ['Origine des mitochondries (bactéries α-protéobactéries)','Origine des chloroplastes (cyanobactéries)','Phylogénie & arbre du vivant','Eucaryotes vs Procaryotes'] },
            ],
            notionsCles: ['Transfert horizontal','Endosymbiose','Mitochondrie','Chloroplaste','Mutation','Phylogénie'],
          },
          {
            id: 'evolution-genomes-populations-terminale',
            num: '3',
            titre: 'L\'évolution des génomes au sein des populations',
            icone: '📈',
            souschap: [
              { titre: 'Théorie de Hardy-Weinberg', notions: ['p² + 2pq + q² = 1','Fréquences alléliques (p et q)','Conditions d\'équilibre (panmixie, pas de sélection)','Applications médicales'] },
              { titre: 'Dérive génétique', notions: ['Variation aléatoire des fréquences','Effet fondateur','Goulot d\'étranglement','Petites populations'] },
              { titre: 'Sélection naturelle', notions: ['Pression de sélection','Adaptation','Sélection directionnelle / stabilisatrice / diversifiante','Évolution des populations'] },
            ],
            notionsCles: ['Hardy-Weinberg','Dérive génétique','Sélection naturelle','Fréquences alléliques','Adaptation'],
          },
          {
            id: 'autres-mecanismes-diversite',
            num: '4',
            titre: 'Autres mécanismes de diversité du vivant',
            icone: '🌀',
            souschap: [
              { titre: 'Symbioses & hérédité non-ADN', notions: ['Symbioses (lichen, mycorhizes)','Hérédité épigénétique','Transmission culturelle','Évolution culturelle (humains)'] },
              { titre: 'Spéciation', notions: ['Isolement reproducteur','Spéciation allopatrique','Espèce biologique (Mayr)','Exemples : pinsons de Darwin, ours polaires'] },
            ],
            notionsCles: ['Symbiose','Épigénétique','Spéciation','Isolement reproducteur','Évolution culturelle'],
          },
        ],
      },
      {
        label: 'Partie B — Passé géologique de la Terre',
        couleurPartie: '#f97316',
        chapitres: [
          {
            id: 'temps-roches-terminale',
            num: '5',
            titre: 'Le temps et les roches',
            icone: '⏳',
            souschap: [
              { titre: 'Datation absolue (radioactivité)', notions: ['Désintégration radioactive','Isotopes radioactifs (¹⁴C, ⁴⁰K, ²³⁸U)','t½ (demi-vie)','Isochrone & concordia'] },
              { titre: 'Datation relative', notions: ['Principe de superposition','Principe de recoupement','Fossiles stratigraphiques (ammonites)','Discontinuités'] },
              { titre: 'Échelle des temps géologiques', notions: ['Éons → Ères → Périodes','Hadéen · Archéen · Protérozoïque · Phanérozoïque','Crises biologiques majeures','Extinctions de masse (KPg, Permien)'] },
            ],
            notionsCles: ['Radioactivité','Demi-vie','Fossile stratigraphique','Ère géologique','Extinction de masse'],
          },
          {
            id: 'traces-passe-terre-terminale',
            num: '6',
            titre: 'Les traces du passé mouvementé de la Terre',
            icone: '🏔️',
            souschap: [
              { titre: 'Convergence lithosphérique', notions: ['Subduction (croûte océanique sous continentale)','Obduction','Fossé de subduction','Magmatisme d\'arc'] },
              { titre: 'Formation des chaînes de montagnes', notions: ['Collision continentale','Alpes (Eurasie-Afrique)','Himalaya (Inde-Eurasie)','Ophiolites & paléo-océans'] },
              { titre: 'Paléogéographie', notions: ['Reconstitution des paléo-continents','Pangée & Téthys','Preuve magnétique des déplacements','Histoire géologique de la France'] },
            ],
            notionsCles: ['Subduction','Collision continentale','Ophiolite','Paléogéographie','Orogénèse'],
          },
        ],
      },
    ],
  },
  {
    tag: 'Thème 2 — Enjeux contemporains de la planète',
    couleur: '#10b981',
    iconeTheme: '🌱',
    parties: [
      {
        label: 'Partie A — Plantes domestiquées',
        couleurPartie: '#10b981',
        chapitres: [
          {
            id: 'plantes-organisation-terminale',
            num: '7',
            titre: 'Organisation fonctionnelle des plantes à fleurs',
            icone: '🌸',
            souschap: [
              { titre: 'Structures végétales', notions: ['Racines (poils absorbants)','Tiges (nœuds, entre-nœuds)','Feuilles (limbe, nervures, stomates)','Mycorhizes (symbiose racine-champignon)'] },
              { titre: 'Circulation interne', notions: ['Xylème (sève brute — eau + sels minéraux)','Phloème (sève élaborée — sucres)','Transpiration (cohésion-tension)','Zones d\'élongation (méristèmes)'] },
              { titre: 'Relations avec le milieu', notions: ['Absorption eau & ions (osmose)','Échanges gazeux (CO₂/O₂)','Phototropisme (auxine)','Gravitropisme'] },
            ],
            notionsCles: ['Xylème','Phloème','Stomate','Mycorhize','Auxine','Transpiration'],
          },
          {
            id: 'photosynthese-biomasse-terminale',
            num: '8',
            titre: 'La plante productrice de matière organique',
            icone: '☀️',
            souschap: [
              { titre: 'Photosynthèse — Phase lumineuse', notions: ['Absorption lumineuse (chlorophylle a et b)','Photolyse de l\'eau → O₂','Production ATP & NADPH','Thylakoïdes du chloroplaste'] },
              { titre: 'Photosynthèse — Cycle de Calvin', notions: ['Fixation du CO₂ (RuBisCO)','Réduction C3 → G3P (triose)','Régénération du RuBP','Stroma du chloroplaste'] },
              { titre: 'Influence du milieu', notions: ['Facteurs limitants (lumière, CO₂, température)','Courbe d\'Emerson','Croissance végétale & biomasse','Auxine & croissance orientée'] },
            ],
            notionsCles: ['Photosynthèse','RuBisCO','Calvin','Chlorophylle','O₂','Facteur limitant'],
            formules: [
              { f: '6CO₂ + 6H₂O + lumière → C₆H₁₂O₆ + 6O₂', desc: 'Équation bilan de la photosynthèse' },
            ],
          },
          {
            id: 'reproduction-plantes-terminale',
            num: '9',
            titre: 'Reproduction de la plante & domestication',
            icone: '🌾',
            souschap: [
              { titre: 'Reproduction sexuée', notions: ['Fleur (étamine, pistil, ovule)','Pollinisation (anémophile, entomophile)','Fécondation végétale (double fécondation)','Graine & fruit','Dissémination'] },
              { titre: 'Reproduction asexuée', notions: ['Clonage végétatif (bouturage, marcottage)','Stolons & rhizomes','Totipotence cellulaire','Culture in vitro'] },
              { titre: 'Domestication des plantes', notions: ['Sélection artificielle (maïs sauvage → moderne)','OGM & transgénèse (Agrobacterium)','Impacts sur la biodiversité','Agriculture durable'] },
            ],
            notionsCles: ['Pollinisation','Totipotence','Domestication','Sélection artificielle','OGM','Biodiversité agricole'],
          },
        ],
      },
      {
        label: 'Partie B — Climats de la Terre',
        couleurPartie: '#0ea5e9',
        chapitres: [
          {
            id: 'paleoclimats-terminale',
            num: '10',
            titre: 'Reconstituer les variations climatiques passées',
            icone: '🧊',
            souschap: [
              { titre: 'Archives climatiques', notions: ['Carottes de glace (δ¹⁸O)','Sédiments marins (foraminifères)','Fossiles végétaux (pollen)','Stalactites (spéléothèmes)'] },
              { titre: 'Variations climatiques naturelles', notions: ['Cycles de Milankovitch (excentricité, obliquité, précession)','Glaciations (Quaternaire)','Albédo','Circulation thermohaline (Gulf Stream)'] },
              { titre: 'Rôle de la tectonique & de la géochimie', notions: ['CO₂ volcanique','Altération des roches silicatées','Cycle du carbone','Rôle de l\'océan (puits de carbone)'] },
            ],
            notionsCles: ['δ¹⁸O','Milankovitch','Glaciation','Albédo','Circulation thermohaline','Cycle du carbone'],
          },
          {
            id: 'rechauffement-climatique-terminale',
            num: '11',
            titre: 'Comprendre & agir face au réchauffement climatique',
            icone: '🌡️',
            souschap: [
              { titre: 'Mécanismes du réchauffement', notions: ['Effet de serre (CO₂, CH₄, N₂O, vapeur d\'eau)','Forçage radiatif','Rétroactions (albédo glace, vapeur d\'eau)','Modèles climatiques (GIEC)'] },
              { titre: 'Conséquences environnementales', notions: ['Montée du niveau marin','Acidification des océans','Extinction d\'espèces','Événements extrêmes'] },
              { titre: 'Stratégies d\'atténuation & adaptation', notions: ['Transition énergétique','Séquestration carbone','Accords de Paris','Services écosystémiques & conservation'] },
            ],
            notionsCles: ['Effet de serre','CO₂','Forçage radiatif','GIEC','Transition énergétique','Séquestration carbone'],
          },
        ],
      },
    ],
  },
  {
    tag: 'Thème 3 — Corps humain & santé',
    couleur: '#8b5cf6',
    iconeTheme: '🧠',
    parties: [
      {
        label: 'Partie A — Comportements, mouvement & système nerveux',
        couleurPartie: '#8b5cf6',
        chapitres: [
          {
            id: 'reflexes-systeme-nerveux-terminale',
            num: '12',
            titre: 'Réflexes, cerveau & mouvement volontaire',
            icone: '⚡',
            souschap: [
              { titre: 'Arc réflexe & réflexe myotatique', notions: ['Récepteur (fuseau neuromusculaire)','Neurone afférent','Centre intégrateur (moelle)','Neurone efférent (motoneurone)','Muscle antagoniste','Réflexe monosynaptique'] },
              { titre: 'Organisation du SN & mouvement volontaire', notions: ['SNC (encéphale + moelle)','SNP (nerfs)','Cortex moteur primaire','Homonculus de Penfield','Voies pyramidales'] },
              { titre: 'Cerveau fragile & plasticité', notions: ['Plasticité synaptique','Apprentissage (LTP)','Maladies neurodégénératives (Alzheimer, Parkinson)','Comportements addictifs','Drogues & circuit dopaminergique'] },
            ],
            notionsCles: ['Arc réflexe','Motoneurone','Cortex moteur','Plasticité cérébrale','Alzheimer','Addiction'],
          },
        ],
      },
      {
        label: 'Partie B — Produire le mouvement',
        couleurPartie: '#ec4899',
        chapitres: [
          {
            id: 'contraction-musculaire-terminale',
            num: '13',
            titre: 'Contraction musculaire & production d\'énergie',
            icone: '💪',
            souschap: [
              { titre: 'Cellule musculaire & sarcomère', notions: ['Fibre musculaire striée','Sarcomère (unité contractile)','Filaments d\'actine & myosine','Glissement des filaments (Huxley)','Rôle du Ca²⁺ & ATP'] },
              { titre: 'Production d\'ATP pour le mouvement', notions: ['Voie immédiate (créatine phosphate)','Glycolyse anaérobie (2 ATP)','Respiration cellulaire aérobie (30-32 ATP)','Équation : C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + ATP'] },
              { titre: 'Contrôle du glucose sanguin (glycémie)', notions: ['Glycémie normale : 0,8-1,2 g/L','Insuline (cellules β pancréas) → ↓ glycémie','Glucagon (cellules α pancréas) → ↑ glycémie','Diabète type 1 (autoimmun) vs type 2 (résistance)','Homéostasie'] },
            ],
            notionsCles: ['Sarcomère','Actine-Myosine','ATP','Glycémie','Insuline','Glucagon','Diabète'],
            formules: [
              { f: 'C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + ATP', desc: 'Équation bilan de la respiration cellulaire' },
            ],
          },
        ],
      },
      {
        label: 'Partie C — Comportements & stress',
        couleurPartie: '#f59e0b',
        chapitres: [
          {
            id: 'comportements-stress-terminale',
            num: '14',
            titre: 'Comportement, adaptabilité & stress',
            icone: '😰',
            souschap: [
              { titre: 'Réponse physiologique au stress', notions: ['Axe HHS (hypothalamus-hypophyse-surrénales)','CRH → ACTH → cortisol','Adrénaline & noradrénaline (système sympathique)','Réactions immédiates (fight or flight)'] },
              { titre: 'Stress chronique & santé', notions: ['Effets du cortisol chronique (immunosuppression, HTA)','Structuration des voies neuronales','Résistance au stress','Impact sur la mémoire (hippocampe)'] },
            ],
            notionsCles: ['Axe HHS','Cortisol','Adrénaline','Stress chronique','Hippocampe','Immunosuppression'],
          },
        ],
      },
    ],
  },
]

export default function SVTTerminalePage() {
  return (
    <>
      <Navbar />
      <main style={{ position: 'relative', zIndex: 1, paddingTop: 80 }}>
        <div className="container" style={{ paddingTop: 40, paddingBottom: 80 }}>

          {/* Fil d'Ariane */}
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 12, color: 'var(--muted)', marginBottom: 24, flexWrap: 'wrap' }}>
            <Link href="/bac-france" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇫🇷 France</Link>
            <span>›</span>
            <Link href="/bac-france/svt" style={{ color: 'var(--muted)', textDecoration: 'none' }}>SVT</Link>
            <span>›</span>
            <span style={{ color: COULEUR }}>Terminale ⭐</span>
          </div>

          {/* HEADER */}
          <div style={{ marginBottom: 40 }}>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 14, flexWrap: 'wrap' }}>
              <span className="label">🎓 Terminale Générale — Spécialité SVT</span>
              <span style={{ fontSize: 11, padding: '3px 10px', borderRadius: 20, background: 'rgba(22,163,74,0.25)', color: '#4ade80', fontWeight: 800 }}>⭐ BAC 2027 · Coef. 16</span>
            </div>
            <h1 style={{ fontSize: 'clamp(24px,3.5vw,42px)', marginBottom: 14 }}>
              SVT — Classe de Terminale<br />
              <span style={{ background: 'linear-gradient(90deg,#22c55e,#16a34a,#10b981)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Spécialité — Programme Bac 2027 complet
              </span>
            </h1>
            {/* Infos épreuve */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(170px,1fr))', gap: 10, marginBottom: 20 }}>
              {[
                { label: '⏱️ Épreuve écrite', val: '3h30 · 20 pts' },
                { label: '🔬 ECE (pratique)', val: '1h · inclus coef.' },
                { label: '📊 Coefficient', val: 'Coef. 16' },
                { label: '📚 Chapitres', val: '14 chapitres' },
              ].map(i => (
                <div key={i.label} style={{ background: 'rgba(22,163,74,0.08)', border: '1px solid rgba(22,163,74,0.25)', borderRadius: 10, padding: '10px 14px' }}>
                  <div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 3 }}>{i.label}</div>
                  <div style={{ fontSize: 14, fontWeight: 800, color: '#4ade80' }}>{i.val}</div>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <Link href="/solve" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '9px 18px', borderRadius: 10, background: 'linear-gradient(135deg,#16a34a,#22c55e)', color: 'white', fontSize: 13, fontWeight: 700, textDecoration: 'none' }}>
                🌱 Solveur IA SVT
              </Link>
              <Link href="/chat" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '9px 18px', borderRadius: 10, background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.14)', color: 'var(--text)', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>
                🤖 Chat Prof
              </Link>
              <Link href="/simulation-france" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '9px 18px', borderRadius: 10, background: 'rgba(22,163,74,0.1)', border: '1px solid rgba(22,163,74,0.3)', color: '#4ade80', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>
                🎯 Simulation Bac
              </Link>
            </div>
          </div>

          {/* THÈMES */}
          {THEMES.map(theme => (
            <div key={theme.tag} style={{ marginBottom: 48 }}>
              {/* Séparateur grand thème */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
                <div style={{ flex: 1, height: 2, background: `linear-gradient(90deg,${theme.couleur}60,transparent)` }} />
                <span style={{ fontSize: 13, fontWeight: 900, color: theme.couleur, textTransform: 'uppercase', letterSpacing: '0.07em', whiteSpace: 'nowrap' }}>
                  {theme.iconeTheme} {theme.tag}
                </span>
                <div style={{ flex: 1, height: 2, background: `linear-gradient(270deg,${theme.couleur}60,transparent)` }} />
              </div>

              {/* Parties */}
              {theme.parties.map(partie => (
                <div key={partie.label} style={{ marginBottom: 28 }}>
                  {/* Sous-séparateur partie */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                    <div style={{ width: 4, height: 18, borderRadius: 2, background: partie.couleurPartie }} />
                    <span style={{ fontSize: 12, fontWeight: 700, color: partie.couleurPartie }}>{partie.label}</span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                    {partie.chapitres.map(ch => (
                      <div key={ch.id} style={{ background: `${partie.couleurPartie}08`, border: `1px solid ${partie.couleurPartie}28`, borderRadius: 18, overflow: 'hidden' }}>
                        {/* Header chapitre */}
                        <div style={{ background: `${partie.couleurPartie}14`, borderBottom: `1px solid ${partie.couleurPartie}20`, padding: '16px 22px', display: 'flex', gap: 14, alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                            <div style={{ width: 44, height: 44, borderRadius: 12, background: `${partie.couleurPartie}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>{ch.icone}</div>
                            <div>
                              <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap', marginBottom: 2 }}>
                                <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: partie.couleurPartie, fontWeight: 700 }}>CH.{ch.num}</span>
                                <h2 style={{ fontSize: 15, fontWeight: 800, color: 'var(--text)', margin: 0 }}>{ch.titre}</h2>
                              </div>
                              <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', marginTop: 4 }}>
                                {ch.notionsCles.slice(0, 5).map(n => (
                                  <span key={n} style={{ fontSize: 9, padding: '1px 7px', borderRadius: 8, background: `${partie.couleurPartie}18`, color: partie.couleurPartie, border: `1px solid ${partie.couleurPartie}25`, fontWeight: 600 }}>{n}</span>
                                ))}
                              </div>
                            </div>
                          </div>
                          <Link href={`/bac-france/svt/terminale/${ch.id}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '7px 14px', borderRadius: 9, background: `${partie.couleurPartie}20`, border: `1px solid ${partie.couleurPartie}40`, color: partie.couleurPartie, fontSize: 12, fontWeight: 700, textDecoration: 'none', whiteSpace: 'nowrap' }}>
                            📖 Cours complet →
                          </Link>
                        </div>

                        {/* Sous-chapitres */}
                        <div style={{ padding: '14px 22px' }}>
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(210px,1fr))', gap: 8, marginBottom: (ch as any).formules?.length > 0 ? 12 : 0 }}>
                            {ch.souschap.map(sc => (
                              <div key={sc.titre} style={{ background: 'rgba(0,0,0,0.12)', borderRadius: 10, padding: '10px 13px' }}>
                                <div style={{ fontWeight: 700, fontSize: 11, color: partie.couleurPartie, marginBottom: 5 }}>{sc.titre}</div>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                                  {sc.notions.map(n => (
                                    <span key={n} style={{ fontSize: 10, padding: '2px 7px', borderRadius: 8, background: `${partie.couleurPartie}12`, color: 'var(--text2)', border: `1px solid ${partie.couleurPartie}18` }}>{n}</span>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                          {/* Formules si présentes */}
                          {(ch as any).formules?.length > 0 && (
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                              {(ch as any).formules.map((f: any) => (
                                <div key={f.f} style={{ background: `${partie.couleurPartie}14`, border: `1px solid ${partie.couleurPartie}28`, borderRadius: 9, padding: '7px 13px' }}>
                                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: partie.couleurPartie, fontWeight: 700, marginBottom: 1 }}>{f.f}</div>
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
              ))}
            </div>
          ))}

          {/* Navigation */}
          <div style={{ marginTop: 48, display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/bac-france/svt/premiere" style={{ padding: '10px 20px', borderRadius: 12, border: '1px solid rgba(16,185,129,0.3)', background: 'rgba(16,185,129,0.08)', color: '#34d399', fontSize: 13, fontWeight: 700, textDecoration: 'none' }}>← Première SVT</Link>
            <Link href="/bac-france/svt" style={{ padding: '10px 20px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.05)', color: 'var(--text2)', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>↑ Tous les niveaux</Link>
            <Link href="/simulation-france" style={{ padding: '10px 20px', borderRadius: 12, border: '1px solid rgba(22,163,74,0.4)', background: 'rgba(22,163,74,0.12)', color: '#4ade80', fontSize: 13, fontWeight: 800, textDecoration: 'none' }}>🎯 Simulation Bac →</Link>
          </div>

        </div>
      </main>
      <Footer />
    </>
  )
}
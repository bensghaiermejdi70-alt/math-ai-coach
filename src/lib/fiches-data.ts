// src/lib/fiches-data.ts — Données structurées des fiches de révision
// Ajouter une nouvelle matière : dupliquer une entrée dans FICHES_TUNISIE,
// mettre disponible: true et remplir chapitres[]. Aucune page à modifier.

export interface FicheDocument {
  type: 'cours' | 'quiz' | 'flashcards' | 'complet'
  label: string
  file: string // nom du fichier dans /public/fiches/tunisie/<matiere>/
}

export interface FicheChapitre {
  numero: number
  titre: string
  unite?: string // regroupement optionnel (ex: "Unit 1", "Tome 1", "Algorithmique"...)
  documents: FicheDocument[]
}

export interface FicheMatiere {
  slug: string
  nom: string
  icone: string
  disponible: boolean
  chapitres: FicheChapitre[]
}

// ══════════════════════════════════════════════════════════════
// CHIMIE — 12 chapitres, 3 documents chacun
// ══════════════════════════════════════════════════════════════
const chimieChapitres: FicheChapitre[] = [
  "Notion d'avancement d'une réaction chimique",
  "La vitesse d'une réaction chimique",
  "Les principaux facteurs cinétiques",
  "La notion d'équilibre chimique",
  "Loi d'action de masse et évolution spontanée",
  "Déplacement des équilibres chimiques — La loi de modération de Le Chatelier",
  "Loi d'action de masse appliquée aux réactions acide-base",
  "pH des solutions aqueuses",
  "Variation du pH au cours d'une réaction acide-base",
  "Étude de la pile Daniell",
  "Potentiel standard d'un couple redox",
  "Les piles alcalines",
].map((titre, i) => {
  const n = i + 1
  return {
    numero: n,
    titre,
    documents: [
      { type: 'cours' as const, label: 'Cours complet', file: `cours_complet_chapitre_${n}_chimie.pdf` },
      { type: 'quiz' as const, label: 'Quiz + fiches mémo', file: `quiz_memo_chapitre_${n}_chimie.pdf` },
      { type: 'flashcards' as const, label: 'Questions flashcards', file: `questions_flashcards_chapitre_${n}_chimie.pdf` },
    ],
  }
})

// ══════════════════════════════════════════════════════════════
// PHYSIQUE — 11 chapitres, 3 documents chacun
// ══════════════════════════════════════════════════════════════
const physiqueChapitres: FicheChapitre[] = [
  'Le condensateur et le dipôle RC',
  'La bobine et le dipôle RL',
  'Les oscillations électriques libres',
  'Les oscillations électriques forcées en régime sinusoïdal',
  "Les oscillations libres d'un pendule élastique",
  "Oscillations forcées d'un pendule élastique",
  'Les ondes mécaniques progressives',
  'La nature ondulatoire de la lumière',
  'Spectre atomique',
  'Le noyau atomique',
  'Les réactions nucléaires',
].map((titre, i) => {
  const n = i + 1
  return {
    numero: n,
    titre,
    documents: [
      { type: 'cours' as const, label: 'Cours complet', file: `cours_complet_chapitre_${n}.pdf` },
      { type: 'quiz' as const, label: 'Quiz + fiches mémo', file: `quiz_memo_chapitre_${n}.pdf` },
      { type: 'flashcards' as const, label: 'Questions flashcards', file: `questions_flashcards_chapitre_${n}.pdf` },
    ],
  }
})

// ══════════════════════════════════════════════════════════════
// MATHÉMATIQUES — Tome 1 (9 ch.) + Tome 2 (10 ch.), 3 documents chacun
// ══════════════════════════════════════════════════════════════
const mathTome1Titres = [
  "Continuité d'une fonction",
  'Les suites réelles',
  'Dérivabilité et étude de fonctions',
  'Fonction réciproque',
  'Les primitives',
  'Calcul intégral',
  'Fonction logarithme népérien',
  "La fonction exponentielle",
  'Équations différentielles',
]
const mathTome2Titres = [
  'Les nombres complexes',
  'Les isométries du plan',
  'Isométries et déplacements',
  'Les similitudes directes',
  'Les coniques',
  "Géométrie dans l'espace",
  'Arithmétique (divisibilité dans Z)',
  'PGCD, PPCM, théorèmes de Bézout & Gauss',
  'Les probabilités',
  'Les statistiques à deux variables',
]
// Suffixes réels des fichiers (certains chapitres ont "-v2" — présent seulement là où il existe vraiment)
const mathTome1Suffix: Record<number, string> = { 5: '-v2', 6: '-v2' }
const mathTome2CoursSuffix: Record<number, string> = { 9: '-v2', 10: '-v2' }

const mathematiquesChapitres: FicheChapitre[] = [
  ...mathTome1Titres.map((titre, i) => {
    const n = i + 1
    const sfx = mathTome1Suffix[n] || ''
    return {
      numero: n,
      titre,
      unite: 'Tome 1',
      documents: [
        { type: 'cours' as const, label: 'Cours complet', file: `mathbacai.com_chapitre${n}_cours_complet${sfx}.pdf` },
        { type: 'quiz' as const, label: 'Quiz et flashcards', file: `mathbacai.com_chapitre${n}_quiz_et_flashcards${sfx}.pdf` },
        { type: 'flashcards' as const, label: '60 questions flashcards', file: `mathbacai.com_chapitre${n}_60_questions_flashcards${sfx}.pdf` },
      ],
    }
  }),
  ...mathTome2Titres.map((titre, i) => {
    const n = i + 1
    const coursSfx = mathTome2CoursSuffix[n] || ''
    return {
      numero: 9 + n,
      titre,
      unite: 'Tome 2',
      documents: [
        { type: 'cours' as const, label: 'Cours complet', file: `mathbacai.com_tome2_chapitre${n}_cours_complet${coursSfx}.pdf` },
        { type: 'quiz' as const, label: 'Quiz et flashcards', file: `mathbacai.com_tome2_chapitre${n}_quiz_et_flashcards.pdf` },
        { type: 'flashcards' as const, label: '60 questions flashcards', file: `mathbacai.com_tome2_chapitre${n}_60_questions_flashcards.pdf` },
      ],
    }
  }),
]

// ══════════════════════════════════════════════════════════════
// SVT — 15 chapitres, 1 document chacun
// ══════════════════════════════════════════════════════════════
const svtData: { n: number; titre: string; file: string }[] = [
  { n: 1,  titre: "La fonction reproductrice chez l'Homme",              file: 'fiche-revision-svt-chap1-v2.pdf' },
  { n: 2,  titre: 'La fonction reproductrice chez la femme',             file: 'fiche-revision-svt-chap2.pdf' },
  { n: 3,  titre: 'La procréation',                                      file: 'fiche-revision-svt-chap3.pdf' },
  { n: 4,  titre: "Le brassage de l'information génétique",              file: 'fiche-revision-svt-chap4.pdf' },
  { n: 5,  titre: 'La génétique humaine',                                file: 'fiche-revision-svt-chap5.pdf' },
  { n: 6,  titre: "L'évolution biologique",                              file: 'fiche-revision-svt-chap6.pdf' },
  { n: 7,  titre: 'Le tissu nerveux',                                    file: 'fiche-revision-svt-chap7.pdf' },
  { n: 8,  titre: 'Le réflexe myotatique',                               file: 'fiche-revision-svt-chap8.pdf' },
  { n: 9,  titre: 'Le fonctionnement du muscle squelettique',            file: 'fiche-revision-svt-chap9.pdf' },
  { n: 10, titre: 'La régulation de la pression artérielle',             file: 'fiche-revision-svt-chap10.pdf' },
  { n: 11, titre: 'Hygiène du système nerveux',                          file: 'fiche-revision-svt-chap11.pdf' },
  { n: 12, titre: 'Le soi et le non-soi',                                file: 'fiche-revision-svt-chap12.pdf' },
  { n: 13, titre: "Les acteurs de l'immunité spécifique",                file: 'fiche-revision-svt-chap13.pdf' },
  { n: 14, titre: "Le déroulement de la réponse immunitaire spécifique", file: 'fiche-revision-svt-chap14.pdf' },
  { n: 15, titre: 'Les dysfonctionnements du système immunitaire',       file: 'fiche-revision-svt-chap15.pdf' },
]
const svtChapitres: FicheChapitre[] = svtData.map(d => ({
  numero: d.n, titre: d.titre, documents: [{ type: 'complet', label: 'Fiche complète', file: d.file }],
}))

// ══════════════════════════════════════════════════════════════
// ANGLAIS — 33 chapitres, 1 document chacun, regroupés par unité
// ══════════════════════════════════════════════════════════════
const anglaisData: { n: number; titre: string; unite: string; file: string }[] = [
  { n: 1,  titre: 'Holidaying & Webquest',                                          unite: 'Unit 1 · Art Shows and Holidaying', file: 'anglais-unit1-chap1-complete.pdf' },
  { n: 2,  titre: 'Space Tourism',                                                  unite: 'Unit 1 · Art Shows and Holidaying', file: 'anglais-unit1-chap2.pdf' },
  { n: 3,  titre: 'Art Shows, Strings & Poetry Masterclass',                        unite: 'Unit 1 · Art Shows and Holidaying', file: 'anglais-unit1-chap3.pdf' },
  { n: 4,  titre: 'Exploring a Song (Immortality by Céline Dion)',                  unite: 'Unit 1 · Art Shows and Holidaying', file: 'anglais-unit1-chap4.pdf' },
  { n: 5,  titre: 'Walking Tour',                                                   unite: 'Unit 1 · Art Shows and Holidaying', file: 'anglais-unit1-chap5.pdf' },
  { n: 6,  titre: 'A Package Tour',                                                 unite: 'Unit 1 · Art Shows and Holidaying', file: 'anglais-unit1-chap6.pdf' },
  { n: 7,  titre: 'At the Travel Agency',                                           unite: 'Unit 1 · Art Shows and Holidaying', file: 'anglais-unit1-chap7.pdf' },
  { n: 8,  titre: 'Put a Little Drama in Your Travel',                              unite: 'Unit 1 · Art Shows and Holidaying', file: 'anglais-unit1-chap8.pdf' },
  { n: 9,  titre: "The Winter's Tale (Part 1)",                                     unite: 'Unit 1 · Art Shows and Holidaying', file: 'anglais-unit1-chap9.pdf' },
  { n: 10, titre: 'School-related Words',                                          unite: 'Unit 2 · Education Matters',        file: 'anglais-unit2-chap10.pdf' },
  { n: 11, titre: 'Education for All',                                             unite: 'Unit 2 · Education Matters',        file: 'anglais-unit2-chap11.pdf' },
  { n: 12, titre: 'Virtual Schools',                                               unite: 'Unit 2 · Education Matters',        file: 'anglais-unit2-chap12.pdf' },
  { n: 13, titre: 'Online Learning',                                               unite: 'Unit 2 · Education Matters',        file: 'anglais-unit2-chap13.pdf' },
  { n: 14, titre: 'Comparing Educational Systems',                                 unite: 'Unit 2 · Education Matters',        file: 'anglais-unit2-chap14.pdf' },
  { n: 15, titre: 'Age or...? (Ability-Based Learning)',                           unite: 'Unit 2 · Education Matters',        file: 'anglais-unit2-chap15.pdf' },
  { n: 16, titre: 'Lifelong Learning',                                             unite: 'Unit 2 · Education Matters',        file: 'anglais-unit2-chap16.pdf' },
  { n: 17, titre: 'Inventions-Related Words & Webquest 5: Robots',                 unite: 'Unit 3 · Creative Inventions',      file: 'anglais-unit3-chap17-v2.pdf' },
  { n: 18, titre: 'Technology: A Blessing in Disguise?',                           unite: 'Unit 3 · Creative Inventions',      file: 'anglais-unit3-chap18.pdf' },
  { n: 19, titre: 'The Father of Playstation (Ken Kutaragi) & Video Gaming',       unite: 'Unit 3 · Creative Inventions',      file: 'anglais-unit3-chap19.pdf' },
  { n: 20, titre: 'Women Choose to Opt Out',                                       unite: 'Unit 3 · Creative Inventions',      file: 'anglais-unit3-chap20.pdf' },
  { n: 21, titre: 'The Brain Drain',                                               unite: 'Unit 3 · Creative Inventions',      file: 'anglais-unit3-chap21.pdf' },
  { n: 22, titre: "Scientists' Achievements",                                      unite: 'Unit 3 · Creative Inventions',      file: 'anglais-unit3-chap22.pdf' },
  { n: 23, titre: 'The Daffodils (William Wordsworth)',                            unite: 'Unit 3 · Creative Inventions',      file: 'anglais-unit3-chap23.pdf' },
  { n: 24, titre: 'Complete Study Package',                                        unite: 'Unit 3 · Creative Inventions',      file: 'anglais-unit3-chap24.pdf' },
  { n: 25, titre: 'Life Concerns',                                                 unite: 'Unit 4 · Life Issues',              file: 'anglais-unit4-chap25.pdf' },
  { n: 26, titre: 'Attitudes',                                                     unite: 'Unit 4 · Life Issues',              file: 'anglais-unit4-chap26.pdf' },
  { n: 27, titre: "If..., a poem by Kipling",                                      unite: 'Unit 4 · Life Issues',              file: 'anglais-unit4-chap27.pdf' },
  { n: 28, titre: 'Consumerism',                                                   unite: 'Unit 4 · Life Issues',              file: 'anglais-unit4-chap28.pdf' },
  { n: 29, titre: 'Ecodriving',                                                    unite: 'Unit 4 · Life Issues',              file: 'anglais-unit4-chap29.pdf' },
  { n: 30, titre: 'Urban Exodus',                                                  unite: 'Unit 4 · Life Issues',              file: 'anglais-unit4-chap30.pdf' },
  { n: 31, titre: 'A Newscast',                                                    unite: 'Unit 4 · Life Issues',              file: 'anglais-unit4-chap31.pdf' },
  { n: 32, titre: 'Staff Management',                                              unite: 'Unit 4 · Life Issues',              file: 'anglais-unit4-chap32.pdf' },
  { n: 33, titre: 'Comprehensive Literary & Practical Syllabus',                   unite: 'Unit 4 · Life Issues',              file: 'anglais-unit4-chap33.pdf' },
]
const anglaisChapitres: FicheChapitre[] = anglaisData.map(d => ({
  numero: d.n, titre: d.titre, unite: d.unite,
  documents: [{ type: 'complet', label: 'Fiche complète', file: d.file }],
}))

// ══════════════════════════════════════════════════════════════
// FRANÇAIS (section Lettres) — 16 chapitres, 5 modules, 1 document chacun
// ══════════════════════════════════════════════════════════════
const francaisData: { n: number; titre: string; unite: string; file: string }[] = [
  { n: 1,  titre: 'Initiation au partage',                                unite: 'Module 1 · Le Partage',              file: 'francais_module_1_chap_1.pdf' },
  { n: 2,  titre: "Image, langue & pratique de l'oral",                   unite: 'Module 1 · Le Partage',              file: 'francais_module_1_chap_2.pdf' },
  { n: 3,  titre: "Synthèse globale, méthodologie d'écriture & évaluation", unite: 'Module 1 · Le Partage',            file: 'francais_module_1_chap_3.pdf' },
  { n: 4,  titre: "L'engagement de l'écrivain",                           unite: "Module 2 · L'Engagement en Littérature", file: 'francais_module_2_chap_4.pdf' },
  { n: 5,  titre: 'Lire, analyser, argumenter & s\'engager',              unite: "Module 2 · L'Engagement en Littérature", file: 'francais_module_2_chap_5.pdf' },
  { n: 6,  titre: 'Synthèse, projet & autoévaluation',                    unite: "Module 2 · L'Engagement en Littérature", file: 'francais_module_2_chap_6.pdf' },
  { n: 7,  titre: 'Textes de lecture expliquée',                          unite: 'Module 3 · L\'Appel de la Modernité',   file: 'francais_module_3_chap_7.pdf' },
  { n: 8,  titre: 'Image, langue, écriture, oral & projet',               unite: 'Module 3 · L\'Appel de la Modernité',   file: 'francais_module_3_chap_8.pdf' },
  { n: 9,  titre: 'Synthèse & autoévaluation',                            unite: 'Module 3 · L\'Appel de la Modernité',   file: 'francais_module_3_chap_9.pdf' },
  { n: 10, titre: 'Textes à lire et à expliquer',                         unite: 'Module 4 · À la Lumière de la Raison',  file: 'francais_module_4_chap_10.pdf' },
  { n: 11, titre: 'Image, langue, écriture & oral',                       unite: 'Module 4 · À la Lumière de la Raison',  file: 'francais_module_4_chap_11.pdf' },
  { n: 12, titre: 'Synthèse, projet & autoévaluation',                    unite: 'Module 4 · À la Lumière de la Raison',  file: 'francais_module_4_chap_12.pdf' },
  { n: 13, titre: 'Textes à lire et à expliquer',                         unite: 'Module 5 · Poésies',                    file: 'francais_module_5_chap_13.pdf' },
  { n: 14, titre: 'Lire, analyser, argumenter & écrire la poésie',        unite: 'Module 5 · Poésies',                    file: 'francais_module_5_chap_14.pdf' },
  { n: 15, titre: 'Synthèse, projet & autoévaluation',                    unite: 'Module 5 · Poésies',                    file: 'francais_module_5_chap_15.pdf' },
  { n: 16, titre: 'Œuvres complètes : Antigone & Carmen',                 unite: 'Module 5 · Poésies',                    file: 'francais_module_5_chap_16.pdf' },
]
const francaisChapitres: FicheChapitre[] = francaisData.map(d => ({
  numero: d.n, titre: d.titre, unite: d.unite,
  documents: [{ type: 'complet', label: 'Fiche complète', file: d.file }],
}))

// ══════════════════════════════════════════════════════════════
// ÉCONOMIE — 9 chapitres, 1 document chacun
// ══════════════════════════════════════════════════════════════
const economieTitres = [
  'La croissance économique',
  'Les facteurs de la croissance économique',
  'Les mutations des structures de la production',
  'Les mutations de la consommation',
  'Les coûts de la croissance économique',
  'Le développement durable',
  'Mondialisation et enjeux',
  "L'évolution de la structure des échanges internationaux de biens et services",
  'Les firmes multinationales',
]
const economieChapitres: FicheChapitre[] = economieTitres.map((titre, i) => {
  const n = i + 1
  return { numero: n, titre, documents: [{ type: 'complet' as const, label: 'Fiche complète', file: `economie_chap_${n}.pdf` }] }
})

// ══════════════════════════════════════════════════════════════
// GESTION — 6 chapitres (le chapitre 6 a 2 parties)
// ══════════════════════════════════════════════════════════════
const gestionChapitres: FicheChapitre[] = [
  { numero: 1, titre: 'Module Évaluation - Consolidation', documents: [{ type: 'complet', label: 'Fiche complète', file: 'gestion_chap1.pdf' }] },
  { numero: 2, titre: "La gestion de l'approvisionnement", documents: [{ type: 'complet', label: 'Fiche complète', file: 'gestion_chap2.pdf' }] },
  { numero: 3, titre: 'La gestion de la production', documents: [{ type: 'complet', label: 'Fiche complète', file: 'gestion_chap3.pdf' }] },
  { numero: 4, titre: 'La gestion commerciale', documents: [{ type: 'complet', label: 'Fiche complète', file: 'gestion_chap4.pdf' }] },
  { numero: 5, titre: 'La gestion des ressources humaines (GRH)', documents: [{ type: 'complet', label: 'Fiche complète', file: 'gestion_chap5.pdf' }] },
  {
    numero: 6, titre: 'La gestion financière',
    documents: [
      { type: 'complet', label: 'Partie 1', file: 'gestion_chap6_partie1.pdf' },
      { type: 'complet', label: 'Partie 2 : Choix d\'investissement, bilan, trésorerie', file: 'gestion_chap6_partie2.pdf' },
    ],
  },
]

// ══════════════════════════════════════════════════════════════
// INFORMATIQUE — 2 séries : Algorithmique (7 ch.) + Bases de données (9 ch.)
// ══════════════════════════════════════════════════════════════
const algoTitres = [
  'Enregistrements & Fichiers',
  'La récursivité',
  'Les algorithmes de tri',
  'Les algorithmes récurrents',
  "Les algorithmes d'arithmétique",
  "Les algorithmes d'approximation",
  'Algorithmes avancés : Backtracking & Jeu du Taquin',
]
const bddTitres = [
  'Notion de base de données',
  'Les SGBD',
  'Structure de BDR',
  "Démarche de détermination de la structure d'une BD",
  "Création et modification d'une BD (SQL LDD)",
  "Manipulation d'une BD (SQL LMD)",
  "Développement d'applications autour d'une BD",
  'Sécurisation et sécurité',
  'Étude de cas',
]
const informatiqueChapitres: FicheChapitre[] = [
  ...algoTitres.map((titre, i) => ({
    numero: i + 1, titre, unite: 'Algorithmique',
    documents: [{ type: 'complet' as const, label: 'Fiche complète', file: `informatique_algorithme_chap${i + 1}.pdf` }],
  })),
  ...bddTitres.map((titre, i) => {
    const n = i + 1
    const sfx = n === 8 ? '-v2' : ''
    return {
      numero: 7 + n, titre, unite: 'Bases de données',
      documents: [{ type: 'complet' as const, label: 'Fiche complète', file: `informatique_base-donees_chap${n}${sfx}.pdf` }],
    }
  }),
]

// ══════════════════════════════════════════════════════════════
export const FICHES_TUNISIE: FicheMatiere[] = [
  { slug: 'mathematiques', nom: 'Mathématiques', icone: '🧮', disponible: true,  chapitres: mathematiquesChapitres },
  { slug: 'physique',      nom: 'Physique',      icone: '⚛️', disponible: true,  chapitres: physiqueChapitres },
  { slug: 'chimie',        nom: 'Chimie',        icone: '⚗️', disponible: true,  chapitres: chimieChapitres },
  { slug: 'svt',           nom: 'SVT',           icone: '🌱', disponible: true,  chapitres: svtChapitres },
  { slug: 'anglais',       nom: 'Anglais',       icone: '🇬🇧', disponible: true,  chapitres: anglaisChapitres },
  { slug: 'francais',      nom: 'Français',      icone: '📖', disponible: true,  chapitres: francaisChapitres },
  { slug: 'economie',      nom: 'Économie',      icone: '📈', disponible: true,  chapitres: economieChapitres },
  { slug: 'gestion',       nom: 'Gestion',       icone: '💼', disponible: true,  chapitres: gestionChapitres },
  { slug: 'informatique',  nom: 'Informatique',  icone: '💻', disponible: true,  chapitres: informatiqueChapitres },
]

// France : pas encore de contenu — structure prête pour plus tard
export const FICHES_FRANCE: FicheMatiere[] = []

export function getMatiere(slug: string): FicheMatiere | undefined {
  return FICHES_TUNISIE.find(m => m.slug === slug)
}
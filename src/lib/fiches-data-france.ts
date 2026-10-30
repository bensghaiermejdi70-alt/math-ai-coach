// src/lib/fiches-data-france.ts — Données structurées des fiches de révision France (Terminale)
// Chaque chapitre France = 1 seul PDF combiné (Cours + Quiz + 45 Questions-Réponses).
// Ajouter un chapitre : compléter le tableau de la matière concernée. Ajouter une matière :
// dupliquer une entrée dans FICHES_FRANCE, mettre disponible: true et remplir chapitres[].

export interface FicheChapitreFrance {
  numero: number
  titre: string
  unite?: string // regroupement optionnel (ex: grands thèmes de Physique-Chimie)
  file: string // nom du fichier dans /public/fiches/france/<matiere>/
}

export interface FicheMatiereFrance {
  slug: string
  nom: string
  icone: string
  disponible: boolean
  chapitres: FicheChapitreFrance[]
}

const mathematiquesChapitres: FicheChapitreFrance[] = [
  { numero: 1,  titre: 'Suites : Limites & Convergence',        file: 'chapitre1_suites.pdf' },
  { numero: 2,  titre: 'Nombres complexes',                     file: 'chapitre2_complexes.pdf' },
  { numero: 3,  titre: 'Combinatoire & Dénombrement',           file: 'chapitre3_combinatoire.pdf' },
  { numero: 4,  titre: 'Limites & Continuité',                  file: 'chapitre4_limites_continuite.pdf' },
  { numero: 5,  titre: 'Dérivation avancée',                    file: 'chapitre5_derivation.pdf' },
  { numero: 6,  titre: 'Fonction exponentielle',                file: 'chapitre6_exponentielle.pdf' },
  { numero: 7,  titre: 'Logarithme népérien',                   file: 'chapitre7_logarithme.pdf' },
  { numero: 8,  titre: 'Intégration',                           file: 'chapitre8_integration.pdf' },
  { numero: 9,  titre: 'Équations différentielles',             file: 'chapitre9_equations_differentielles.pdf' },
  { numero: 10, titre: "Vecteurs & Repères dans l'espace",      file: 'chapitre10_vecteurs_espace.pdf' },
  { numero: 11, titre: 'Droites & Plans — Équations',           file: 'chapitre11_droites_plans.pdf' },
  { numero: 12, titre: "Produit scalaire dans l'espace",        file: 'chapitre12_produit_scalaire.pdf' },
  { numero: 13, titre: 'Variables aléatoires',                  file: 'chapitre13_variables_aleatoires.pdf' },
  { numero: 14, titre: 'Lois à densité (continues)',            file: 'chapitre14_lois_continues.pdf' },
  { numero: 15, titre: 'Loi normale (Gauss)',                   file: 'chapitre15_loi_normale.pdf' },
  { numero: 16, titre: 'Loi binomiale B(n,p)',                  file: 'chapitre16_loi_binomiale.pdf' },
  { numero: 17, titre: 'Échantillonnage & Estimation',          file: 'chapitre17_echantillonnage.pdf' },
  { numero: 18, titre: 'Python avancé & Algorithmique',         file: 'chapitre18_python_avance.pdf' },
]

const svtChapitres: FicheChapitreFrance[] = [
  { numero: 1 , titre: "L'origine du génotype des individus", unite: "Thème 1 — La Terre, la vie et l'évolution", file: 'chapitre1_origine_genotype.pdf' },
  { numero: 2 , titre: 'La complexification des génomes', unite: "Thème 1 — La Terre, la vie et l'évolution", file: 'chapitre2_complexification_genomes.pdf' },
  { numero: 3 , titre: "L'évolution des génomes dans les populations", unite: "Thème 1 — La Terre, la vie et l'évolution", file: 'chapitre3_evolution_genomes_populations.pdf' },
  { numero: 4 , titre: 'Autres mécanismes de diversité du vivant', unite: "Thème 1 — La Terre, la vie et l'évolution", file: 'chapitre4_autres_mecanismes_diversite.pdf' },
  { numero: 5 , titre: 'Le temps et les roches', unite: "Thème 1 — La Terre, la vie et l'évolution", file: 'chapitre5_temps_et_roches.pdf' },
  { numero: 6 , titre: 'Les traces du passé mouvementé de la Terre', unite: "Thème 1 — La Terre, la vie et l'évolution", file: 'chapitre6_traces_passe_terre.pdf' },
  { numero: 7 , titre: 'Organisation fonctionnelle des plantes à fleurs', unite: 'Thème 2 — Enjeux planétaires contemporains', file: 'chapitre7_organisation_plantes.pdf' },
  { numero: 8 , titre: 'La plante, productrice de matière organique', unite: 'Thème 2 — Enjeux planétaires contemporains', file: 'chapitre8_photosynthese.pdf' },
  { numero: 9 , titre: 'Reproduction de la plante & domestication', unite: 'Thème 2 — Enjeux planétaires contemporains', file: 'chapitre9_reproduction_domestication.pdf' },
  { numero: 10, titre: 'Reconstituer les variations climatiques passées', unite: 'Thème 2 — Enjeux planétaires contemporains', file: 'chapitre10_variations_climatiques.pdf' },
  { numero: 11, titre: 'Comprendre & agir face au réchauffement climatique', unite: 'Thème 2 — Enjeux planétaires contemporains', file: 'chapitre11_rechauffement_climatique.pdf' },
  { numero: 12, titre: 'Réflexes, cerveau & mouvement volontaire', unite: 'Thème 3 — Corps humain et santé', file: 'chapitre12_reflexes_cerveau.pdf' },
  { numero: 13, titre: "Contraction musculaire & production d'énergie", unite: 'Thème 3 — Corps humain et santé', file: 'chapitre13_contraction_musculaire_energie.pdf' },
  { numero: 14, titre: 'Comportement, adaptabilité & stress', unite: 'Thème 3 — Corps humain et santé', file: 'chapitre14_comportement_adaptabilite_stress.pdf' },
]

const physiqueChimieChapitres: FicheChapitreFrance[] = [
  { numero: 1 , titre: 'Mesures & Incertitudes', unite: 'Mesures & Incertitudes', file: 'chapitre1_mesures_incertitudes.pdf' },
  { numero: 2 , titre: 'Cinétique chimique', unite: 'Constitution et transformations de la matière', file: 'chapitre2_cinetique_chimique.pdf' },
  { numero: 3 , titre: 'Équilibres chimiques', unite: 'Constitution et transformations de la matière', file: 'chapitre3_equilibres_chimiques.pdf' },
  { numero: 4 , titre: 'Dosages & Titrages', unite: 'Constitution et transformations de la matière', file: 'chapitre4_dosages_titrages.pdf' },
  { numero: 5 , titre: 'Radioactivité', unite: 'Constitution et transformations de la matière', file: 'chapitre5_radioactivite.pdf' },
  { numero: 6 , titre: '2ème loi de Newton', unite: 'Mouvement et interactions', file: 'chapitre6_deuxieme_loi_newton.pdf' },
  { numero: 7 , titre: 'Satellites & Planètes', unite: 'Mouvement et interactions', file: 'chapitre7_satellites_planetes.pdf' },
  { numero: 8 , titre: 'Écoulement des fluides', unite: 'Mouvement et interactions', file: 'chapitre8_ecoulement_fluides.pdf' },
  { numero: 9 , titre: 'Gaz parfait & Thermodynamique', unite: 'Énergie : conversions et transferts', file: 'chapitre9_gaz_parfait_thermodynamique.pdf' },
  { numero: 10, titre: '1er principe de la thermodynamique', unite: 'Énergie : conversions et transferts', file: 'chapitre10_premier_principe.pdf' },
  { numero: 11, titre: 'Énergie chimique & Enthalpie', unite: 'Énergie : conversions et transferts', file: 'chapitre11_energie_chimique_enthalpie.pdf' },
  { numero: 12, titre: 'Bilan radiatif terrestre', unite: 'Énergie : conversions et transferts', file: 'chapitre12_bilan_radiatif.pdf' },
  { numero: 13, titre: 'Diffraction & Interférences', unite: 'Ondes et signaux', file: 'chapitre13_diffraction_interferences.pdf' },
  { numero: 14, titre: 'Effet Doppler', unite: 'Ondes et signaux', file: 'chapitre14_effet_doppler.pdf' },
  { numero: 15, titre: 'Circuit RLC — Résonance', unite: 'Ondes et signaux', file: 'chapitre15_circuit_rlc.pdf' },
  { numero: 16, titre: 'Circuit RC', unite: 'Ondes et signaux', file: 'chapitre16_circuit_rc.pdf' },
]

export const FICHES_FRANCE: FicheMatiereFrance[] = [
  { slug: 'mathematiques',    nom: 'Mathématiques',       icone: '🧮', disponible: true,  chapitres: mathematiquesChapitres },
  { slug: 'physique-chimie',  nom: 'Physique-Chimie',      icone: '⚛️', disponible: false, chapitres: physiqueChimieChapitres }, // passer à true quand les 16 PDF sont dans public/fiches/france/physique-chimie/
  { slug: 'svt',              nom: 'SVT',                  icone: '🌱', disponible: true,  chapitres: svtChapitres },
  { slug: 'informatique',     nom: 'Informatique (NSI)',   icone: '💻', disponible: false, chapitres: [] },
  { slug: 'francais',         nom: 'Français',             icone: '📖', disponible: false, chapitres: [] },
  { slug: 'anglais',          nom: 'Anglais',              icone: '🇬🇧', disponible: false, chapitres: [] },
  { slug: 'eco-gestion',      nom: 'Éco-Gestion',          icone: '📈', disponible: false, chapitres: [] },
]

export function getMatiereFrance(slug: string): FicheMatiereFrance | undefined {
  return FICHES_FRANCE.find(m => m.slug === slug)
}
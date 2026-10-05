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

export const FICHES_FRANCE: FicheMatiereFrance[] = [
  { slug: 'mathematiques',    nom: 'Mathématiques',       icone: '🧮', disponible: true,  chapitres: mathematiquesChapitres },
  { slug: 'physique-chimie',  nom: 'Physique-Chimie',      icone: '⚛️', disponible: false, chapitres: [] },
  { slug: 'svt',              nom: 'SVT',                  icone: '🌱', disponible: false, chapitres: [] },
  { slug: 'informatique',     nom: 'Informatique (NSI)',   icone: '💻', disponible: false, chapitres: [] },
  { slug: 'francais',         nom: 'Français',             icone: '📖', disponible: false, chapitres: [] },
  { slug: 'anglais',          nom: 'Anglais',              icone: '🇬🇧', disponible: false, chapitres: [] },
  { slug: 'eco-gestion',      nom: 'Éco-Gestion',          icone: '📈', disponible: false, chapitres: [] },
]

export function getMatiereFrance(slug: string): FicheMatiereFrance | undefined {
  return FICHES_FRANCE.find(m => m.slug === slug)
}
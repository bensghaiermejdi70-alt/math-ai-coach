'use client'

import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import { useParams } from 'next/navigation'

// ══════════════════════════════════════════════════════════════════════
// SVT — SECTION SCIENCES EXPÉRIMENTALES / [SLUG]
// Route : /bac/svt/sciences-exp/[slug]
// Programme officiel MEN Tunisie · 4ème année Sc. Exp.
// 14 chapitres : Génétique · Milieu intérieur · Reproduction · Nutrition
// ══════════════════════════════════════════════════════════════════════

const C = { thm: '#06b6d4', def: '#22c55e', formule: '#f59e0b', prop: '#8b5cf6', methode: '#ec4899', loi: '#f97316' }
const L: Record<string, string> = { thm: 'Théorème', def: 'Définition', formule: 'Formule clé', prop: 'Propriété', methode: 'Méthode', loi: 'Loi' }

const NAV_ORDER = [
  'brassage-genetique', 'transmission-hereditaire', 'mutations-scexp', 'genetique-populations',
  'milieu-interieur', 'regulation-glycemie', 'systeme-nerveux-scexp', 'defense-organisme-scexp', 'hygiene-systeme-nerveux',
  'fonction-reproductrice-homme', 'fonction-reproductrice-femme', 'fecondation-procreation',
  'nutrition-animale', 'nutrition-vegetale',
]

const TITRES_NAV: Record<string, string> = {
  'brassage-genetique':           'CH 01 — Brassage de l\'information génétique',
  'transmission-hereditaire':     'CH 02 — Transmission de l\'information génétique',
  'mutations-scexp':              'CH 03 — Les mutations',
  'genetique-populations':        'CH 04 — Génétique des populations',
  'milieu-interieur':             'CH 05 — La constance du milieu intérieur',
  'regulation-glycemie':         'CH 06 — La régulation de la glycémie',
  'systeme-nerveux-scexp':        'CH 07 — Le système nerveux et la régulation',
  'defense-organisme-scexp':      'CH 08 — Défense de l\'organisme',
  'hygiene-systeme-nerveux':      'CH 09 — Hygiène du système nerveux',
  'fonction-reproductrice-homme': 'CH 10 — Fonction reproductrice chez l\'homme',
  'fonction-reproductrice-femme': 'CH 11 — Fonction reproductrice chez la femme',
  'fecondation-procreation':      'CH 12 — La fécondation et la procréation',
  'nutrition-animale':            'CH 13 — Nutrition animale',
  'nutrition-vegetale':           'CH 14 — Nutrition végétale',
}

const SEC_COLORS: Record<string, string> = {
  'brassage-genetique': '#4f6ef7', 'transmission-hereditaire': '#8b5cf6',
  'mutations-scexp': '#ef4444', 'genetique-populations': '#06b6d4',
  'milieu-interieur': '#10b981', 'regulation-glycemie': '#f59e0b',
  'systeme-nerveux-scexp': '#06b6d4', 'defense-organisme-scexp': '#8b5cf6',
  'hygiene-systeme-nerveux': '#ec4899',
  'fonction-reproductrice-homme': '#4f6ef7', 'fonction-reproductrice-femme': '#ec4899',
  'fecondation-procreation': '#f59e0b',
  'nutrition-animale': '#10b981', 'nutrition-vegetale': '#22c55e',
}

const THEME_SLUGS: Record<string, string[]> = {
  'Thème I — Génétique':         ['brassage-genetique','transmission-hereditaire','mutations-scexp','genetique-populations'],
  'Thème II — Milieu intérieur': ['milieu-interieur','regulation-glycemie','systeme-nerveux-scexp','defense-organisme-scexp','hygiene-systeme-nerveux'],
  'Thème III — Reproduction':    ['fonction-reproductrice-homme','fonction-reproductrice-femme','fecondation-procreation'],
  'Thème IV — Nutrition':        ['nutrition-animale','nutrition-vegetale'],
}

type Thm  = { id: string; type: string; nom: string; enonce: string; remarque?: string }
type Exo  = { id: string; niveau: string; titre: string; enonce: string; correction: string }
type Bloc = { notion: string; theoremes: Thm[]; exercices: Exo[] }
type SC   = { id: string; titre: string; notions: string[]; blocs: Bloc[] }
type Chap = { id: string; titre: string; tag: string; color: string; emoji: string; desc: string; souschapitres: SC[] }

// ══════════════════════════════════════════════════════════════════════
// DONNÉES — 14 CHAPITRES SVT SC. EXP.
// ══════════════════════════════════════════════════════════════════════

const ALL_CHAPTERS: Record<string, Chap> = {

// ─────────────────────────────────────────────────────────────────────
// CH 01 — BRASSAGE DE L'INFORMATION GÉNÉTIQUE
// ─────────────────────────────────────────────────────────────────────
'brassage-genetique': {
  id: 'brassage-genetique', emoji: '🧬', tag: 'SVT', color: '#4f6ef7',
  titre: 'Le brassage de l\'information génétique',
  desc: 'La méiose produit une diversité de gamètes grâce au brassage interchromosomique (indépendance des chromosomes) et au brassage intrachromosomique (crossing-over). Ces mécanismes expliquent la variabilité génétique des individus.',
  souschapitres: [
    {
      id: 'sc-bg-meiose', titre: '1.1 La méiose et ses conséquences',
      notions: ['Méiose I : division réductionnelle', 'Méiose II : division équationnelle', 'Brassage interchromosomique', 'Brassage intrachromosomique (crossing-over)'],
      blocs: [
        {
          notion: '🧬 Méiose et sources de diversité',
          theoremes: [
            { id: 'D-BG1', type: 'def', nom: 'La méiose — définition et étapes',
              enonce: "La MÉIOSE est une division cellulaire spéciale qui produit des CELLULES HAPLOÏDES (n chromosomes) à partir d'une cellule diploïde (2n).\n\nMÉIOSE I (division réductionnelle) :\n- Prophase I : appariement des chromosomes homologues (bivalents)\n- Métaphase I : alignement des bivalents sur la plaque équatoriale\n- Anaphase I : séparation des chromosomes homologues → BRASSAGE INTERCHROMOSOMIQUE\n- Télophase I : 2 cellules à n chromosomes bichromatidiens\n\nMÉIOSE II (division équationnelle) :\n- Séparation des chromatides sœurs\n- 4 cellules haploïdes (gamètes)" },
            { id: 'D-BG2', type: 'def', nom: 'Brassage interchromosomique',
              enonce: "Le BRASSAGE INTERCHROMOSOMIQUE se produit lors de l'Anaphase I.\n\nMÉCANISME : les chromosomes homologues se séparent indépendamment les uns des autres.\n\nCONSÉQUENCE : chaque gamète reçoit aléatoirement un chromosome de chaque paire.\n\nNOMBRE DE GAMÈTES DIFFÉRENTS POSSIBLES :\nSans crossing-over : 2ⁿ types de gamètes\n(n = nombre de paires de chromosomes)\n\nChez l'humain (2n = 46, n = 23) :\n2²³ ≈ 8 millions de gamètes différents possibles\n\nPour un couple : 2²³ × 2²³ = 2⁴⁶ ≈ 70 000 milliards de combinaisons",
              remarque: 'Ce brassage seul est insuffisant pour expliquer toute la diversité. Le crossing-over apporte une diversité supplémentaire.' },
            { id: 'D-BG3', type: 'def', nom: 'Brassage intrachromosomique (crossing-over)',
              enonce: "Le BRASSAGE INTRACHROMOSOMIQUE (ou crossing-over) se produit lors de la Prophase I.\n\nMÉCANISME :\n1. Les chromosomes homologues s'apparient → chiasmas\n2. Des segments de chromatides non-sœurs s'échangent\n3. Des chromosomes RECOMBINÉS sont produits\n\nCONSÉQUENCE :\nDes allèles auparavant liés sur le même chromosome se retrouvent dissociés.\nDes associations d'allèles nouvelles (RECOMBINANTS) sont produites.\n\nRÈGLE IMPORTANTE :\nLa fréquence de crossing-over entre 2 gènes est d'autant plus grande que les gènes sont éloignés sur le chromosome.\n(Fréquence de recombinaison = distance génétique en cM)" },
          ],
          exercices: [
            { id: 'EX-BG1', niveau: 'Facile', titre: 'Nombre de gamètes',
              enonce: "Un organisme a 2n = 6 chromosomes (3 paires). Combien de types de gamètes différents peut-il former par brassage interchromosomique seul ?",
              correction: "n = 3 paires de chromosomes.\nNombre de gamètes = 2ⁿ = 2³ = 8 types de gamètes différents." },
            { id: 'EX-BG2', niveau: 'Intermédiaire', titre: 'Identifier les gamètes recombinants',
              enonce: "Un individu est de génotype AB//ab (gènes liés en cis). Les gamètes AB et ab sont parentaux. Quels sont les gamètes recombinants ? Par quel mécanisme sont-ils produits ?",
              correction: "Les gamètes recombinants sont Ab et aB.\nIls sont produits par crossing-over lors de la prophase I de la méiose.\nSans crossing-over, seuls AB et ab seraient produits." },
          ],
        },
      ],
    },
  ],
},

// ─────────────────────────────────────────────────────────────────────
// CH 02 — TRANSMISSION DE L'INFORMATION GÉNÉTIQUE
// ─────────────────────────────────────────────────────────────────────
'transmission-hereditaire': {
  id: 'transmission-hereditaire', emoji: '🔗', tag: 'SVT', color: '#8b5cf6',
  titre: 'La transmission de l\'information génétique',
  desc: 'Les lois de Mendel gouvernent la transmission des caractères héréditaires. L\'étude des croisements (monohybridisme, dihybridisme) permet de déterminer les génotypes et de prédire les phénotypes. L\'hérédité liée au sexe concerne les gènes portés par les chromosomes sexuels.',
  souschapitres: [
    {
      id: 'sc-th-mendel', titre: '2.1 Lois de Mendel',
      notions: ['Monohybridisme : 1 seul couple d\'allèles', 'Dihybridisme : 2 couples d\'allèles', 'Dominance · récessivité', 'Loi de ségrégation · loi d\'assortiment indépendant'],
      blocs: [
        {
          notion: '🔗 Lois de Mendel',
          theoremes: [
            { id: 'L-TH1', type: 'loi', nom: 'Loi de ségrégation des allèles (1ère loi)',
              enonce: "Lors de la formation des gamètes, les deux allèles d'un même gène se SÉPARENT : chaque gamète ne reçoit qu'UN SEUL allèle de chaque gène.\n\nMONOHYBRIDISME :\nParents : AA × aa → F1 : Aa (hétérozygote) → phénotype [A] (dominance)\n\nF1 × F1 : Aa × Aa → F2 :\n- 1/4 AA + 2/4 Aa + 1/4 aa → phénotypes : 3[A] : 1[a]\n\nTest-cross (rétrocroisement) :\nAa × aa → 1/2 Aa [A] + 1/2 aa [a] → ratio 1:1",
              remarque: 'Dominance incomplète : phénotype intermédiaire en F1. Codominance : les deux phénotypes s\'expriment simultanément.' },
            { id: 'L-TH2', type: 'loi', nom: 'Loi d\'assortiment indépendant (2ème loi)',
              enonce: "En dihybridisme, les deux couples d'allèles se répartissent INDÉPENDAMMENT lors de la méiose (si les gènes sont sur des chromosomes DIFFÉRENTS).\n\nDIHYBRIDISME (gènes non liés) :\nParents AABB × aabb → F1 : AaBb\n\nF1 × F1 → F2 : ratio 9:3:3:1\n9 A_B_ : 3 A_bb : 3 aaB_ : 1 aabb\n\nGÈNES LIÉS (sur même chromosome) :\nRatio différent → pas d'assortiment indépendant\nPrésence de classes parentales (majoritaires) et recombinantes (minoritaires)\n\nDetection du linkage :\nSi ratio ≠ 9:3:3:1 en F2 → gènes liés" },
          ],
          exercices: [
            { id: 'EX-TH1', niveau: 'Facile', titre: 'Croisement monohybride',
              enonce: "Fleur rouge (RR) × fleur blanche (rr). Phénotypes en F1 et F2 (rouge dominant). Quels sont les génotypes en F2 ?",
              correction: "F1 : Rr → toutes rouges (R dominant sur r).\nF2 : Rr × Rr → 1RR : 2Rr : 1rr\nPhénotypes : 3 rouges [R] : 1 blanche [r]\nGénotypes : 1 RR + 2 Rr (rouge) + 1 rr (blanche)." },
            { id: 'EX-TH2', niveau: 'Intermédiaire', titre: 'Test-cross',
              enonce: "Un individu de phénotype [A][B] est croisé avec un individu aacc. On obtient 50% [A][B] et 50% [A][C]. Déduire le génotype de l'individu inconnu.",
              correction: "Résultat du test-cross avec aacc :\n50% [A][B] (AaBb) + 50% [A][C] → incohérent avec dihybridisme.\nSi résultat = 1/2 Aa[B] + 1/2 Aa[C] → individu est AaBb ou AaBc…\nConclusion : l'individu [A][B] est hétérozygote → génotype AaBb (test-cross donne 1:1 pour chaque gène)." },
          ],
        },
      ],
    },
    {
      id: 'sc-th-sexe', titre: '2.2 Hérédité liée au sexe et diagnostic prénatal',
      notions: ['Chromosomes X et Y', 'Gènes liés au chromosome X', 'Transmission croisée (père → fille → petit-fils)', 'Diagnostic prénatal · sonde moléculaire'],
      blocs: [
        {
          notion: '🔬 Hérédité liée au sexe',
          theoremes: [
            { id: 'D-TH3', type: 'def', nom: 'Hérédité gonosomique (liée au sexe)',
              enonce: "Les gènes LIÉS AU CHROMOSOME X sont transmis différemment selon le sexe.\n\nNOTATION :\nXᴬ = chromosome X portant l'allèle A (dominant)\nXᵃ = chromosome X portant l'allèle a (récessif)\n\nFEMME : XᴬXᴬ (homozygote saine) · XᴬXᵃ (hétérozygote = conductrice) · XᵃXᵃ (malade)\nHOMME : XᴬY (sain) · XᵃY (malade)\n\nTRANSMISSION CROISÉE :\nPère malade (XᵃY) → transmet Xᵃ aux filles (conductrices) → petits-fils malades\n\nEXEMPLES : daltonisme · hémophilie · myopathie de Duchenne\n\nRISQUE DE CONSANGUINITÉ :\nMariage entre apparentés → augmentation de la probabilité d'homozygotie pour les allèles récessifs rares → maladies récessives plus fréquentes",
              remarque: 'Un homme ne peut pas être conducteur pour un gène lié à X : il n\'a qu\'un seul chromosome X. S\'il a l\'allèle récessif, il est malade.' },
            { id: 'M-TH1', type: 'methode', nom: 'Diagnostic prénatal',
              enonce: "Le DIAGNOSTIC PRÉNATAL permet de détecter des anomalies génétiques chez le fœtus.\n\nTECHNIQUES :\n1. Amniocentèse : prélèvement de liquide amniotique (semaines 15-18)\n2. Biopsie du trophoblaste : prélèvement de cellules placentaires (semaine 10-12)\n\nANALYSES POSSIBLES :\n• Caryotype : détection d'anomalies chromosomiques (trisomie 21, etc.)\n• Sonde moléculaire (sonde ADN) : détection d'un allèle muté spécifique\n\nSONDE MOLÉCULAIRE :\n• Séquence d'ADN complémentaire à la séquence recherchée\n• Marquée par radioactivité ou fluorescence\n• S'hybride spécifiquement avec la séquence cible\n• Révèle la présence ou l'absence de l'allèle muté" },
          ],
          exercices: [
            { id: 'EX-TH3', niveau: 'Facile', titre: 'Daltonisme',
              enonce: "Le daltonisme est récessif lié au chromosome X. Un homme daltonien (XᵈY) épouse une femme conductrice (XᴰXᵈ). Quels sont les phénotypes attendus chez les enfants ?",
              correction: "Croisement : XᴰXᵈ × XᵈY\nFilles : 1/2 XᴰXᵈ (conductrices) + 1/2 XᵈXᵈ (daltoniennes)\nGarçons : 1/2 XᴰY (normaux) + 1/2 XᵈY (daltoniens)\nGlobal : 1/4 filles conductrices + 1/4 filles daltoniennes + 1/4 garçons normaux + 1/4 garçons daltoniens." },
          ],
        },
      ],
    },
  ],
},

// ─────────────────────────────────────────────────────────────────────
// CH 03 — LES MUTATIONS
// ─────────────────────────────────────────────────────────────────────
'mutations-scexp': {
  id: 'mutations-scexp', emoji: '⚠️', tag: 'SVT', color: '#ef4444',
  titre: 'Les mutations',
  desc: 'Les mutations sont des modifications de la séquence d\'ADN. Géniques (substitution, délétion, insertion) ou chromosomiques (délétion, duplication, inversion, translocation), elles peuvent être neutres, bénéfiques ou pathologiques, et constituent la source de variation pour l\'évolution.',
  souschapitres: [
    {
      id: 'sc-mut-gen', titre: '3.1 Mutations géniques',
      notions: ['Substitution de bases', 'Délétion / insertion d\'une base', 'Mutation faux-sens · non-sens · silencieuse', 'Agents mutagènes physiques et chimiques'],
      blocs: [
        {
          notion: '⚠️ Mutations géniques',
          theoremes: [
            { id: 'D-MUT1', type: 'def', nom: 'Types de mutations géniques',
              enonce: "Une MUTATION GÉNIQUE est une modification de la séquence de bases d'un gène.\n\nTYPES :\n1. SUBSTITUTION : remplacement d'une base par une autre\n   → Faux-sens : codon muté → autre acide aminé → protéine modifiée\n   → Non-sens : codon muté → codon STOP → protéine tronquée\n   → Synonyme (silencieuse) : même acide aminé → protéine inchangée\n\n2. DÉLÉTION : perte d'une ou plusieurs bases\n   → Décalage du cadre de lecture → protéine très différente\n\n3. INSERTION : ajout d'une ou plusieurs bases\n   → Décalage du cadre de lecture\n\nAGENTS MUTAGÈNES :\n• Rayonnements : UV (dimères de thymine), rayons X, rayons γ\n• Produits chimiques : benzène, amiante, agents alkylants\n• Virus oncogènes\n\nRÉPARATION DE L'ADN :\nLes cellules ont des mécanismes de réparation de l'ADN.\nSi la réparation échoue → mutation fixée.",
              remarque: 'La délétion ou l\'insertion d\'UN seul nucléotide décale tout le cadre de lecture → mutation particulièrement grave. La substitution ne touche qu\'un seul codon.' },
          ],
          exercices: [
            { id: 'EX-MUT1', niveau: 'Intermédiaire', titre: 'Type de mutation',
              enonce: "Séquence normale : ATG-CGT-TTA-CCG\nSéquence mutée : ATG-CGT-TCA-CCG\nQuel type de mutation ? Quel est son effet probable ?",
              correction: "Position 7 : T→C (substitution).\nCodon muté : TCA (au lieu de TTA).\nTTA code Leucine, TCA code Sérine → acide aminé différent.\nMutation FAUX-SENS : protéine légèrement modifiée. L'effet dépend de l'importance de cet acide aminé pour la fonction de la protéine." },
          ],
        },
      ],
    },
    {
      id: 'sc-mut-chrom', titre: '3.2 Mutations chromosomiques et conséquences',
      notions: ['Délétion · duplication de segment', 'Inversion · translocation', 'Aneuploïdie (trisomie 21)', 'Non-disjonction en méiose'],
      blocs: [
        {
          notion: '🔬 Mutations chromosomiques',
          theoremes: [
            { id: 'D-MUT2', type: 'def', nom: 'Types de mutations chromosomiques',
              enonce: "Les MUTATIONS CHROMOSOMIQUES affectent la structure ou le nombre de chromosomes.\n\nMUTATIONS DE STRUCTURE :\n• Délétion : perte d'un segment chromosomique → perte de gènes\n• Duplication : répétition d'un segment\n• Inversion : retournement d'un segment (180°) → gènes inversés\n• Translocation : déplacement d'un segment vers un autre chromosome\n\nMUTATIONS DU NOMBRE (ANEUPLOÏDIE) :\nCausées par une non-disjonction lors de la méiose :\n• Trisomie : 2n + 1 = chromosome supplémentaire\n• Monosomie : 2n − 1 = chromosome manquant\n\nTRISOIMIE 21 (syndrome de Down) :\n• 47 chromosomes (3 chromosomes 21)\n• Causée par non-disjonction en méiose (oocyte ou spermatocyte)\n• Fréquence : environ 1/700 naissances\n• Risque augmente avec l'âge maternel\n\nCONSÉQUENCES :\nBénigne : duplication peut apporter de nouveaux gènes → matériel pour l'évolution\nPathologique : plupart des mutations chromosomiques causent des maladies" },
          ],
          exercices: [
            { id: 'EX-MUT2', niveau: 'Facile', titre: 'Origine d\'une trisomie 21',
              enonce: "Un enfant a une trisomie 21. Ses parents ont un caryotype normal. Comment expliquer l'origine de la trisomie ?",
              correction: "La trisomie 21 résulte d'une NON-DISJONCTION lors de la méiose chez l'un des parents (le plus souvent la mère).\nDurant l'anaphase I ou II, les deux chromosomes 21 (ou les deux chromatides) migrent du même côté.\nUn gamète reçoit 2 chromosomes 21, l'autre en reçoit 0.\nLe gamète à 2 chromosomes 21, fusionné avec un gamète normal, donne un zygote à 3 chromosomes 21 → trisomie 21." },
          ],
        },
      ],
    },
  ],
},

// ─────────────────────────────────────────────────────────────────────
// CH 04 — GÉNÉTIQUE DES POPULATIONS
// ─────────────────────────────────────────────────────────────────────
'genetique-populations': {
  id: 'genetique-populations', emoji: '👥', tag: 'SVT', color: '#06b6d4',
  titre: 'Génétique des populations',
  desc: 'La génétique des populations étudie la distribution et l\'évolution des fréquences alléliques dans les populations. La loi de Hardy-Weinberg décrit l\'état d\'équilibre en l\'absence de forces évolutives.',
  souschapitres: [
    {
      id: 'sc-gp-hardy', titre: '4.1 Fréquences alléliques et loi de Hardy-Weinberg',
      notions: ['Fréquence allélique p et q (p + q = 1)', 'Fréquences génotypiques', 'Conditions d\'équilibre (panmixie, etc.)', 'Applications médicales'],
      blocs: [
        {
          notion: '👥 Génétique des populations',
          theoremes: [
            { id: 'L-GP1', type: 'loi', nom: 'Loi de Hardy-Weinberg',
              enonce: "La loi de Hardy-Weinberg stipule que dans une population idéale, les fréquences alléliques et génotypiques restent constantes de génération en génération.\n\nCONDITIONS D'ÉQUILIBRE :\n• Population de grande taille (pas de dérive génétique)\n• Panmixie (croisements aléatoires)\n• Pas de mutation\n• Pas de sélection naturelle\n• Pas de migration\n\nFRÉQUENCES ALLÉLIQUES :\nAllèle A : fréquence p\nAllèle a : fréquence q\np + q = 1\n\nFRÉQUENCES GÉNOTYPIQUES À L'ÉQUILIBRE :\nAA : p²\nAa : 2pq\naa : q²\np² + 2pq + q² = 1\n\nAPPLICATION (si dominance complète) :\nFréquence des malades (aa) connue → q² → q = √(fréq. malades)\n→ p = 1 − q\n→ fréquence des conducteurs = 2pq",
              remarque: 'Utile en santé publique : connaître la fréquence des hétérozygotes (conducteurs) pour une maladie récessive à partir de la fréquence des malades (homozygotes récessifs).' },
          ],
          exercices: [
            { id: 'EX-GP1', niveau: 'Intermédiaire', titre: 'Application Hardy-Weinberg',
              enonce: "La mucoviscidose (aa) touche 1/2500 naissances en Europe. Quelle est la fréquence du gène maladie a, et quelle est la proportion de porteurs sains (Aa) dans la population ?",
              correction: "q² = 1/2500 = 0,0004\nq = √0,0004 = 0,02\np = 1 − 0,02 = 0,98\nPorteurs sains (Aa) : 2pq = 2 × 0,98 × 0,02 = 0,0392 ≈ 1/25\nEnviron 1 personne sur 25 est porteuse saine de la mucoviscidose." },
          ],
        },
      ],
    },
  ],
},

// ─────────────────────────────────────────────────────────────────────
// CH 05 — LA CONSTANCE DU MILIEU INTÉRIEUR
// ─────────────────────────────────────────────────────────────────────
'milieu-interieur': {
  id: 'milieu-interieur', emoji: '💧', tag: 'SVT', color: '#10b981',
  titre: 'La constance du milieu intérieur',
  desc: 'Le milieu intérieur (liquides de l\'organisme) maintient des conditions constantes (homéostasie) indispensables à la vie des cellules : glycémie, pH, température, pression artérielle.',
  souschapitres: [
    {
      id: 'sc-mi-comp', titre: '5.1 Compartiments liquidiens et constantes biologiques',
      notions: ['Plasma sanguin (55% du sang)', 'Liquide interstitiel (baigne les cellules)', 'Liquide intracellulaire (67% de l\'eau corporelle)', 'Constantes biologiques maintenues'],
      blocs: [
        {
          notion: '💧 Milieu intérieur',
          theoremes: [
            { id: 'D-MI1', type: 'def', nom: 'Compartiments liquidiens',
              enonce: "L'organisme contient plusieurs COMPARTIMENTS LIQUIDIENS :\n\n1. PLASMA SANGUIN :\n• Partie liquide du sang (55% du volume sanguin)\n• Contient : eau, protéines, glucose, ions, hormones, gaz\n• Volume ≈ 3 L chez l'adulte\n\n2. LIQUIDE INTERSTITIEL :\n• Baigne les cellules\n• Provient du plasma par filtration capillaire\n• Intermédiaire entre plasma et cellules\n\n3. LIQUIDE INTRACELLULAIRE :\n• À l'intérieur des cellules\n• Représente ≈ 67% de l'eau corporelle\n\nÉCHANGES :\nPlasma ⟷ Liquide interstitiel (capillaires)\nLiquide interstitiel ⟷ Liquide intracellulaire (membranes cellulaires)",
              remarque: 'L\'homéostasie est le maintien constant du milieu intérieur malgré les variations extérieures. Tout écart par rapport aux valeurs normales peut être dangereux pour les cellules.' },
            { id: 'D-MI2', type: 'formule', nom: 'Constantes biologiques',
              enonce: "CONSTANTES BIOLOGIQUES PRINCIPALES :\n\n• Glycémie : 0,8 – 1,2 g/L (normale = 1 g/L à jeun)\n• Température corporelle : 37°C ± 0,5°C\n• pH sanguin : 7,35 – 7,45 (légèrement basique)\n• Pression artérielle : 120/80 mmHg\n• Natrémie (Na⁺) : 135 – 145 mmol/L\n• Osmolarité plasmatique : ≈ 300 mOsm/L\n\nCONSÉQUENCES DES VARIATIONS :\n• Hypoglycémie (< 0,7 g/L) : malaise, convulsions, coma\n• Hyperglycémie chronique : complications du diabète\n• Acidose (pH < 7,35) : troubles neurologiques et respiratoires\n• Hyperthermie (> 40°C) : dénaturation des enzymes" },
          ],
          exercices: [
            { id: 'EX-MI1', niveau: 'Facile', titre: 'Glycémie normale',
              enonce: "La glycémie d'un patient à jeun est de 1,5 g/L. Est-ce normal ? Quel trouble peut-on suspecter ?",
              correction: "La glycémie normale à jeun est de 0,8 – 1,2 g/L.\n1,5 g/L > 1,2 g/L → HYPERGLYCÉMIE.\nOn peut suspecter un diabète (type 1 ou type 2).\nUn diagnostic complet nécessite d'autres tests (HGPO, HbA1c)." },
          ],
        },
      ],
    },
  ],
},

// ─────────────────────────────────────────────────────────────────────
// CH 06 — LA RÉGULATION DE LA GLYCÉMIE
// ─────────────────────────────────────────────────────────────────────
'regulation-glycemie': {
  id: 'regulation-glycemie', emoji: '🍬', tag: 'SVT', color: '#f59e0b',
  titre: 'La régulation de la glycémie',
  desc: 'La glycémie est régulée par l\'insuline et le glucagon (hormones pancréatiques antagonistes) et par le foie (organe central). Un rétrocontrôle négatif assure le retour à la valeur normale. Le diabète résulte d\'une rupture de cette régulation.',
  souschapitres: [
    {
      id: 'sc-rg-foie', titre: '6.1 Rôle du foie et du pancréas',
      notions: ['Foie : glycogénogenèse · glycogénolyse · néoglucogenèse', 'Pancréas endocrine : cellules α (glucagon) et β (insuline)', 'Hormones antagonistes', 'Îlots de Langerhans'],
      blocs: [
        {
          notion: '🍬 Régulation de la glycémie',
          theoremes: [
            { id: 'D-RG1', type: 'def', nom: 'Rôle du foie dans la glycémie',
              enonce: "Le FOIE est l'organe central de la régulation de la glycémie :\n\nAPRÈS UN REPAS (hyperglycémie) :\n• GLYCOGÉNOGENÈSE : glucose → glycogène (stockage)\n• Favorisée par l'insuline\n• Réduit la glycémie\n\nEN PÉRIODE DE JEÛNE (hypoglycémie) :\n• GLYCOGÉNOLYSE : glycogène → glucose (dégradation du glycogène)\n• NÉOGLUCOGENÈSE : synthèse de glucose à partir d'autres molécules (acides aminés, acide lactique, glycérol)\n• Favorisée par le glucagon\n• Augmente la glycémie" },
            { id: 'D-RG2', type: 'def', nom: 'Hormones pancréatiques et boucle de régulation',
              enonce: "PANCRÉAS ENDOCRINE (îlots de Langerhans) :\n\nCELLULES β → INSULINE :\n• Sécrétée en réponse à l'HYPERGLYCÉMIE\n• Action : favorise l'entrée du glucose dans les cellules\n• Stimule la glycogénogenèse hépatique\n• Inhibe la glycogénolyse\n→ Effet : BAISSE de la glycémie\n\nCELLULES α → GLUCAGON :\n• Sécrété en réponse à l'HYPOGLYCÉMIE\n• Action : stimule la glycogénolyse et la néoglucogenèse hépatiques\n→ Effet : HAUSSE de la glycémie\n\nBOUCLE DE RÉTROCONTRÔLE NÉGATIF :\nHyperglycémie → ↑ insuline → ↓ glycémie (retour à la normale)\nHypoglycémie → ↑ glucagon → ↑ glycémie (retour à la normale)\n\nDIABÈTE TYPE 1 : destruction des cellules β → absence d'insuline → hyperglycémie chronique\nDIABÈTE TYPE 2 : résistance des cellules cibles à l'insuline → hyperglycémie chronique",
              remarque: 'Insuline et glucagon sont des hormones ANTAGONISTES : leurs effets s\'opposent pour maintenir la glycémie dans les valeurs normales.' },
          ],
          exercices: [
            { id: 'EX-RG1', niveau: 'Facile', titre: 'Identification hormones',
              enonce: "Après un repas riche en sucres (hyperglycémie), quelle hormone est sécrétée en priorité ? Par quelles cellules ? Quel est son effet sur le foie ?",
              correction: "Après un repas, la glycémie augmente.\nL'INSULINE est sécrétée par les CELLULES β des îlots de Langerhans du pancréas.\nSur le foie : l'insuline stimule la GLYCOGÉNOGENÈSE (glucose → glycogène = stockage).\nCela fait baisser la glycémie → retour à la normale (rétrocontrôle négatif)." },
            { id: 'EX-RG2', niveau: 'Intermédiaire', titre: 'Type de diabète',
              enonce: "Patient A : cellules β détruites par le système immunitaire. Patient B : produit de l'insuline mais ses cellules cibles n'y répondent plus. Quel type de diabète pour chacun ?",
              correction: "Patient A : destruction des cellules β → plus d'insuline → DIABÈTE TYPE 1 (insulino-dépendant). Traitement : injections d'insuline.\nPatient B : insuline produite mais inefficace → RÉSISTANCE À L'INSULINE → DIABÈTE TYPE 2 (non insulino-dépendant). Traitement : régime, metformine, parfois insuline." },
          ],
        },
      ],
    },
  ],
},

// ─────────────────────────────────────────────────────────────────────
// CH 07 — LE SYSTÈME NERVEUX ET LA RÉGULATION
// ─────────────────────────────────────────────────────────────────────
'systeme-nerveux-scexp': {
  id: 'systeme-nerveux-scexp', emoji: '🧠', tag: 'SVT', color: '#06b6d4',
  titre: 'Le système nerveux et la régulation',
  desc: 'Le neurone est l\'unité fonctionnelle du système nerveux. Le message nerveux est un signal électrique (potentiel d\'action) qui se propage le long des fibres nerveuses et se transmet aux neurones voisins via les synapses chimiques.',
  souschapitres: [
    {
      id: 'sc-sn-neurone', titre: '7.1 Neurone et potentiel d\'action',
      notions: ['Structure du neurone : corps · dendrites · axone', 'Potentiel de repos : −70 mV', 'Potentiel d\'action : dépolarisation Na⁺ puis repolarisation K⁺', 'Propagation le long de l\'axone'],
      blocs: [
        {
          notion: '🧠 Neurone et message nerveux',
          theoremes: [
            { id: 'D-SN1', type: 'def', nom: 'Structure du neurone',
              enonce: "Le NEURONE est l'unité structurale et fonctionnelle du système nerveux.\n\nSTRUCTURE :\n• Corps cellulaire (soma) : contient le noyau\n• Dendrites : fibres courtes → reçoivent les messages entrants\n• Axone : fibre longue → transmet le message (jusqu'à 1m)\n• Gaine de myéline : entoure l'axone → isole et accélère la conduction\n• Nœuds de Ranvier : interruptions de la myéline → conduction saltatoire\n\nFibres myélinisées : conduction rapide (jusqu'à 120 m/s)\nFibres amyélinisées : conduction lente (0,5 – 2 m/s)" },
            { id: 'F-SN1', type: 'formule', nom: 'Potentiel de repos et potentiel d\'action',
              enonce: "POTENTIEL DE REPOS (cellule non stimulée) :\n• Différence de potentiel = −70 mV (intérieur négatif)\n• Maintenu par la pompe Na⁺/K⁺ ATPase\n• Na⁺ est exclu de la cellule · K⁺ est accumulé à l'intérieur\n\nPOTENTIEL D'ACTION (cellule stimulée) :\n1. DÉPOLARISATION : stimulation → ouverture des canaux Na⁺\n   → Na⁺ entre massivement → potentiel monte de −70 mV à +30 mV\n2. REPOLARISATION : fermeture Na⁺ · ouverture des canaux K⁺\n   → K⁺ sort → potentiel revient à −70 mV\n3. HYPERPOLARISATION : brève chute en dessous de −70 mV\n   → puis retour au potentiel de repos\n\nPROPRIÉTÉS :\n• Loi du tout ou rien : le PA a toujours la même amplitude\n• Le PA est auto-propagé le long de l'axone\n• Période réfractaire : ne peut pas déclencher 2 PA simultanément",
              remarque: 'La fréquence des potentiels d\'action code l\'intensité du stimulus. Un stimulus fort → PA très fréquents. La durée et l\'amplitude de chaque PA restent constantes (loi du tout ou rien).' },
          ],
          exercices: [
            { id: 'EX-SN1', niveau: 'Facile', titre: 'Potentiel de repos',
              enonce: "Pourquoi le potentiel membranaire au repos est-il négatif (−70 mV) ? Quel rôle joue la pompe Na⁺/K⁺ ?",
              correction: "Au repos, l'intérieur de la cellule est plus riche en K⁺ et en anions non diffusibles (protéines chargées négativement).\nL'extérieur est riche en Na⁺ et Cl⁻.\nLa pompe Na⁺/K⁺ ATPase expulse activement 3 Na⁺ vers l'extérieur pour chaque 2 K⁺ entrant → maintient l'asymétrie ionique.\nL'intérieur reste négatif → potentiel de repos ≈ −70 mV." },
          ],
        },
      ],
    },
    {
      id: 'sc-sn-synapse', titre: '7.2 Transmission synaptique et intégration',
      notions: ['Synapse chimique : vésicules · fente synaptique · récepteurs', 'PPSE (dépolarisation) et PPSI (hyperpolarisation)', 'Intégration postsynaptique', 'Réflexe myotatique'],
      blocs: [
        {
          notion: '⚡ Synapse et intégration',
          theoremes: [
            { id: 'D-SN2', type: 'def', nom: 'La synapse chimique',
              enonce: "La SYNAPSE est la zone de communication entre deux neurones (ou neurone et effecteur).\n\nCOMPOSANTS :\n• Neurone pré-synaptique : transmet le signal\n• Fente synaptique : espace entre les deux neurones (20 – 50 nm)\n• Neurone post-synaptique : reçoit le signal\n\nTRANSMISSION SYNAPTIQUE :\n1. PA arrive au bouton synaptique\n2. Entrée de Ca²⁺ (canaux voltage-dépendants)\n3. Exocytose des vésicules de neurotransmetteur\n4. Neurotransmetteur traverse la fente synaptique\n5. Se lie aux récepteurs du neurone post-synaptique\n6. Génère un PPSE ou PPSI\n7. Neurotransmetteur inactivé (recapture ou dégradation)\n\nNEUROTRANSMETTEURS : acétylcholine · dopamine · sérotonine · GABA\n\nSYNAPSE EXCITATRICE → PPSE (dépolarisation)\nSYNAPSE INHIBITRICE → PPSI (hyperpolarisation)" },
            { id: 'D-SN3', type: 'def', nom: 'Intégration postsynaptique et réflexe myotatique',
              enonce: "INTÉGRATION POSTSYNAPTIQUE :\nUn neurone reçoit simultanément des signaux de nombreux neurones pré-synaptiques.\nLa SOMMATION des PPSE et PPSI détermine si un PA est déclenché.\n\nSOMMAION TEMPORELLE : PA fréquents sur une même synapse\nSOMMAION SPATIALE : PA simultanés sur plusieurs synapses\n\nSi la sommation dépasse le seuil → PA déclenché (tout ou rien)\n\nRÉFLEXE MYOTATIQUE :\n1. Étirement du muscle → activation des fuseaux neuromusculaires (récepteurs)\n2. Signal afférent (sensitif) vers la moelle épinière\n3. Synapse monosynaptique avec motoneurone\n4. Signal efférent (moteur) vers le muscle\n5. Contraction du muscle étiré + INHIBITION du muscle antagoniste\n\nRôle : ajuster automatiquement la posture et le tonus musculaire" },
          ],
          exercices: [
            { id: 'EX-SN2', niveau: 'Intermédiaire', titre: 'PPSE et PPSI',
              enonce: "Un neurone post-synaptique reçoit simultanément 3 PPSE de 5 mV chacun et 2 PPSI de −6 mV chacun. Le seuil de déclenchement d'un PA est −55 mV. Le potentiel de repos est −70 mV. Un PA est-il déclenché ?",
              correction: "Sommation spatiale :\nΔV = 3 × (+5) + 2 × (−6) = +15 − 12 = +3 mV\nPotentiel résultant = −70 + 3 = −67 mV\n−67 mV < −55 mV (seuil non atteint)\n→ PAS DE POTENTIEL D'ACTION." },
          ],
        },
      ],
    },
  ],
},

// ─────────────────────────────────────────────────────────────────────
// CH 08 — DÉFENSE DE L'ORGANISME
// ─────────────────────────────────────────────────────────────────────
'defense-organisme-scexp': {
  id: 'defense-organisme-scexp', emoji: '🛡️', tag: 'SVT', color: '#8b5cf6',
  titre: 'Défense de l\'organisme',
  desc: 'L\'organisme dispose de deux lignes de défense : l\'immunité non spécifique (rapide, non ciblée : phagocytose, inflammation) et l\'immunité spécifique (adaptative : lymphocytes B/T, anticorps, mémoire). La vaccination exploite la mémoire immunitaire.',
  souschapitres: [
    {
      id: 'sc-do-nonspec', titre: '8.1 Immunité non spécifique et spécifique',
      notions: ['Phagocytose : macrophages et neutrophiles', 'Immunité humorale : lymphocytes B et anticorps', 'Immunité cellulaire : lymphocytes T cytotoxiques', 'Mémoire immunitaire · vaccination · sérothérapie'],
      blocs: [
        {
          notion: '🛡️ Système immunitaire',
          theoremes: [
            { id: 'D-DO1', type: 'def', nom: 'Immunité non spécifique (innée)',
              enonce: "L'IMMUNITÉ NON SPÉCIFIQUE est la première ligne de défense, immédiate et non ciblée.\n\nBAR RIÈRES PHYSIQUES ET CHIMIQUES :\n• Peau (kératine), muqueuses (mucus), pH acide\n• Larmes (lysozyme), sécrétions antibactériennes\n\nPHAGOCYTOSE :\n1. Chimiotactisme : migration des phagocytes vers l'infection\n2. Adhérence : reconnaissance du micro-organisme\n3. Ingestion : formation du phagosome\n4. Digestion : enzymes lysosomiales détruisent l'agent pathogène\nCellules : macrophages · neutrophiles · cellules dendritiques\n\nINFLAMMATION :\n• Rougeur · chaleur · douleur · gonflement\n• Libération de médiateurs (histamine, cytokines)\n• Recrutement de phagocytes sur le site d'infection" },
            { id: 'D-DO2', type: 'def', nom: 'Immunité spécifique humorale et cellulaire',
              enonce: "L'IMMUNITÉ SPÉCIFIQUE (adaptative) est ciblée contre un antigène particulier.\n\nANTIGÈNE : molécule reconnue comme étrangère → déclenche la réponse immune\n\nIMMUNITÉ HUMORALE (lymphocytes B) :\n1. Lymphocyte B reconnaît l'antigène spécifique\n2. Activation et prolifération → clone de lymphocytes B\n3. Différenciation en PLASMOCYTES → synthèse d'ANTICORPS\n4. Anticorps (immunoglobulines) se lient à l'antigène → complexe Ag-Ac → neutralisation\n5. Lymphocytes B mémoire persistants → réponse secondaire rapide\n\nIMMUNITÉ CELLULAIRE (lymphocytes T) :\n• Lymphocytes T AUXILIAIRES (T4/CD4) : activent B et Tc\n• Lymphocytes T CYTOTOXIQUES (T8/CD8) : détruisent cellules infectées\n• Reconnaissance via le complexe CMH + peptide antigénique\n\nMÉMOIRE IMMUNITAIRE :\nAprès premier contact → lymphocytes B et T mémoire persistants\nDe uxième contact → réponse secondaire : plus rapide · plus forte · plus durable" },
            { id: 'D-DO3', type: 'methode', nom: 'Vaccination vs Sérothérapie',
              enonce: "VACCINATION :\n• Administration d'un ANTIGÈNE (vaccin = agent atténué/inactivé ou protéine antigénique)\n• Déclenche une réponse immunitaire primaire\n• Génère des lymphocytes MÉMOIRE\n• Protection ACTIVE et DURABLE (mois à années)\n• Délai : 2 – 4 semaines avant protection efficace\n• Exemples : vaccin DTP, ROR, COVID-19, grippe\n\nSÉROTHÉRAPIE :\n• Injection d'un SÉRUM contenant des ANTICORPS PRÉFORMÉS (d'origine animale ou humaine)\n• Transfert passif d'immunité\n• Protection IMMÉDIATE mais TEMPORAIRE (quelques semaines)\n• Exemples : antitétanique, antivenin de serpent\n\nCOMPARAISON :\n• Vaccin : active le propre système immunitaire → mémoire durable\n• Sérum : apporte des anticorps tout faits → pas de mémoire",
              remarque: 'La sérothérapie est utilisée en urgence (morsure de serpent, tétanos après blessure grave) car la vaccination est trop lente.' },
          ],
          exercices: [
            { id: 'EX-DO1', niveau: 'Facile', titre: 'Vaccination',
              enonce: "Expliquer pourquoi une personne vaccinée contre la rougeole est protégée pendant des années, alors qu'une sérothérapie ne protège que quelques semaines.",
              correction: "VACCINATION : le vaccin introduit l'antigène (virus atténué ou protéine). Le système immunitaire produit une réponse primaire + des LYMPHOCYTES MÉMOIRE qui persistent des années. Lors d'un 2ème contact avec le virus → réponse secondaire rapide et forte → protection efficace.\n\nSÉROTHÉRAPIE : les anticorps injectés sont des protéines étrangères qui sont progressivement dégradées (demi-vie ≈ 3 semaines). Il n'y a pas de mémoire immunitaire. La protection disparaît avec les anticorps." },
          ],
        },
      ],
    },
  ],
},

// ─────────────────────────────────────────────────────────────────────
// CH 09 — HYGIÈNE DU SYSTÈME NERVEUX
// ─────────────────────────────────────────────────────────────────────
'hygiene-systeme-nerveux': {
  id: 'hygiene-systeme-nerveux', emoji: '🚫', tag: 'SVT', color: '#ec4899',
  titre: 'Hygiène du système nerveux',
  desc: 'Les drogues perturbent la transmission synaptique (ex. : la cocaïne bloque la recapture de la dopamine). Le stress active l\'axe hypothalamo-hypophyso-surrénalien. Des mesures d\'hygiène de vie permettent de protéger le système nerveux.',
  souschapitres: [
    {
      id: 'sc-hsn-drogues', titre: '9.1 Drogues, stress et hygiène de vie',
      notions: ['Drogue : perturbation de la synapse', 'Cocaïne : blocage recapture dopamine', 'Dépendance et addiction', 'Stress : cortisol et adrénaline · mesures de protection'],
      blocs: [
        {
          notion: '🚫 Drogues et système nerveux',
          theoremes: [
            { id: 'D-HSN1', type: 'def', nom: 'Mécanismes d\'action des drogues sur le SN',
              enonce: "Les DROGUES sont des substances qui modifient le fonctionnement du système nerveux en agissant sur les synapses.\n\nMÉCANISMES D'ACTION :\n• Agoniste : mime le neurotransmetteur (ex : morphine ↔ opioïdes endogènes)\n• Antagoniste : bloque les récepteurs (ex : atropine ↔ acétylcholine)\n• Inhibition de recapture : augmente la concentration du NT dans la fente\n\nEXEMPLE DE LA COCAÏNE :\nEFFET NORMAL : dopamine libérée → se lie aux récepteurs → plaisir\n             → recapturée par le neurone pré-synaptique → effet limité\nEFFET COCAÏNE : bloque les transporteurs de recapture de la dopamine\n             → dopamine s'accumule dans la fente synaptique\n             → stimulation prolongée des récepteurs → sensation intense de plaisir (euphorie)\nDÉPENDANCE : le cerveau s'adapte → besoin de doses croissantes (tolérance)\n           → syndrome de sevrage à l'arrêt\n\nAUTRES EXEMPLES :\n• Alcool : inhibe le SNC (GABA mimétique)\n• Amphétamines : stimulent la libération de dopamine et norépinéphrine\n• THC (cannabis) : agit sur les récepteurs cannabinoïdes",
              remarque: 'La dépendance physique et psychologique rend l\'arrêt très difficile. Le cerveau des adolescents est particulièrement vulnérable aux effets des drogues (plasticité cérébrale).' },
            { id: 'D-HSN2', type: 'def', nom: 'Le stress et ses effets sur le système nerveux',
              enonce: "Le STRESS est une réponse physiologique de l'organisme à une situation perçue comme menaçante.\n\nMÉCANISME (axe HHS) :\n1. Hypothalamus détecte le stress → libère CRH\n2. Hypophyse → libère ACTH\n3. Glandes surrénales → libèrent CORTISOL et ADRÉNALINE\n\nEFFETS PHYSIOLOGIQUES DU STRESS AIGU :\n• Augmentation de la fréquence cardiaque et de la pression artérielle\n• Vasodilatation musculaire · vasoconstriction digestive\n• Mobilisation des réserves de glucose (néoglucogenèse)\n• Alerter et préparer à la réaction : «fuite ou combat»\n\nSTRESS CHRONIQUE (effets néfastes) :\n• Troubles du sommeil · anxiété · dépression\n• Affaiblissement du système immunitaire\n• Maladies cardiovasculaires · ulcères\n\nMESURES DE PROTECTION :\n• Activité physique régulière · sommeil suffisant\n• Techniques de relaxation (méditation · respiration)\n• Alimentation équilibrée · gestion du temps\n• Soutien social et psychologique" },
          ],
          exercices: [
            { id: 'EX-HSN1', niveau: 'Intermédiaire', titre: 'Cocaïne et synapse',
              enonce: "Expliquer pourquoi la cocaïne provoque une sensation intense de plaisir, puis une dépression intense à l'arrêt de la prise.",
              correction: "LORS DE LA PRISE :\nLa cocaïne bloque les transporteurs de recapture de la DOPAMINE.\nLa dopamine s'accumule dans la fente synaptique et stimule massivement les récepteurs → euphorie intense.\n\nAPRÈS LA PRISE :\nLe cerveau s'adapte en réduisant le nombre de récepteurs à la dopamine (down-regulation).\nÀ l'arrêt → peu de dopamine disponible + peu de récepteurs → niveaux de dopamine bien inférieurs à la normale → dépression, dysphorie, besoin intense de la drogue pour retrouver un état «normal».\nCeci explique la dépendance psychologique." },
          ],
        },
      ],
    },
  ],
},

// ─────────────────────────────────────────────────────────────────────
// CH 10 — FONCTION REPRODUCTRICE CHEZ L'HOMME
// ─────────────────────────────────────────────────────────────────────
'fonction-reproductrice-homme': {
  id: 'fonction-reproductrice-homme', emoji: '♂️', tag: 'SVT', color: '#4f6ef7',
  titre: 'La fonction reproductrice chez l\'homme',
  desc: 'Les testicules assurent deux fonctions : la spermatogenèse (production de spermatozoïdes par méiose) et la sécrétion de testostérone. Ces fonctions sont régulées par le complexe hypothalamo-hypophysaire (GnRH → LH + FSH).',
  souschapitres: [
    {
      id: 'sc-rh-sperma', titre: '10.1 Spermatogenèse et régulation hormonale',
      notions: ['Structure du spermatozoïde : tête · pièce intermédiaire · flagelle', 'Étapes : multiplication · accroissement · maturation (méiose) · différenciation', 'Testostérone : cellules de Leydig', 'Régulation : GnRH → LH + FSH → rétrocontrôle'],
      blocs: [
        {
          notion: '♂️ Spermatogenèse',
          theoremes: [
            { id: 'D-RH1', type: 'def', nom: 'Structure du spermatozoïde',
              enonce: "Le SPERMATOZOÏDE est une cellule haploïde (n = 23 chromosomes) hautement spécialisée.\n\nSTRUCTURE :\n1. TÊTE :\n   • Noyau haploïde (ADN condensé)\n   • Acrosome : sac enzymatique (hyaluronidase, acrosine) → pénétration dans l'ovocyte\n\n2. PIÈCE INTERMÉDIAIRE :\n   • Riche en MITOCHONDRIES → production d'ATP → énergie pour le mouvement\n\n3. FLAGELLE :\n   • Structure 9+2 (axonème)\n   • Mouvement : 3 mm/min dans les voies génitales féminines\n\nPRODUCTION : dans les tubes séminifères des TESTICULES\nMATURATION : dans l'épididyme\nSTOCKAGE : dans les vésicules séminales" },
            { id: 'D-RH2', type: 'def', nom: 'Spermatogenèse — étapes',
              enonce: "La SPERMATOGENÈSE produit 4 spermatozoïdes par cellule souche. Elle se déroule dans les tubes séminifères.\n\nÉTAPES :\n1. MULTIPLICATION : spermatogonies (2n) → mitoses → spermatogonies\n2. ACCROISSEMENT : spermatogonies → spermatocytes I (2n)\n3. MATURATION (MÉIOSE) :\n   • Méiose I : spermatocyte I (2n) → 2 spermatocytes II (n)\n   • Méiose II : spermatocyte II (n) → 2 spermatides (n)\n4. DIFFÉRENCIATION (SPERMIOGENÈSE) :\n   • Spermatides → spermatozoïdes (formation du flagelle, condensation du noyau, acrosome)\n\nDURÉE : environ 72 jours\nPRODUCTION : ≈ 300 millions de spermatozoïdes par jour\nCELLULES DE SERTOLI : soutien et nutrition des cellules germinales" },
            { id: 'D-RH3', type: 'def', nom: 'Régulation hormonale masculine',
              enonce: "La fonction reproductive masculine est régulée par l'AXE HYPOTHALAMO-HYPOPHYSO-TESTICULAIRE.\n\nHYPOTHALAMUS :\n→ Libère GnRH (pulsatile) → hypophyse\n\nHYPOPHYSE ANTÉRIEURE (adénohypophyse) :\n→ Libère LH et FSH\n\nLH → CELLULES DE LEYDIG → TESTOSTÉRONE\n• Caractères sexuels secondaires\n• Maintien de la spermatogenèse\n• Libido\n\nFSH → CELLULES DE SERTOLI → soutien de la spermatogenèse\n• Favorise la maturation des cellules germinales\n• Sécrétion d'ABP (Androgen Binding Protein)\n\nRÉTROCONTRÔLE NÉGATIF :\n• Testostérone ↑ → inhibe GnRH et LH (rétrocontrôle négatif)\n• Inhibe → [Testostérone] revient à la normale",
              remarque: 'La castration (ablation des testicules) → absence de testostérone → augmentation de GnRH et LH (réponse compensatoire) → preuve du rétrocontrôle négatif.' },
          ],
          exercices: [
            { id: 'EX-RH1', niveau: 'Facile', titre: 'Étapes de la spermatogenèse',
              enonce: "Placer dans l'ordre : spermatocyte I, spermatide, spermatogonie, spermatozoïde, spermatocyte II.",
              correction: "Ordre : Spermatogonie (2n) → Spermatocyte I (2n) → Spermatocyte II (n) → Spermatide (n) → Spermatozoïde (n).\nPréciser :\nMéiose I : spermatocyte I → 2 spermatocytes II\nMéiose II : spermatocyte II → 2 spermatides\nSpermiogenèse : spermatide → spermatozoïde." },
          ],
        },
      ],
    },
  ],
},

// ─────────────────────────────────────────────────────────────────────
// CH 11 — FONCTION REPRODUCTRICE CHEZ LA FEMME
// ─────────────────────────────────────────────────────────────────────
'fonction-reproductrice-femme': {
  id: 'fonction-reproductrice-femme', emoji: '♀️', tag: 'SVT', color: '#ec4899',
  titre: 'La fonction reproductrice chez la femme',
  desc: 'Les ovaires produisent des ovocytes (ovogenèse) et des hormones sexuelles (œstrogènes, progestérone). Le cycle sexuel féminin (28 jours) est contrôlé par le complexe hypothalamo-hypophysaire et les hormones ovariennes.',
  souschapitres: [
    {
      id: 'sc-rf-follicule', titre: '11.1 Folliculogenèse, ovogenèse et cycle sexuel',
      notions: ['Follicule primordial → follicule mûr (de De Graaf)', 'Ovogenèse : ovocyte I → ovocyte II (bloqué en méiose II)', 'Cycle ovarien · cycle utérin · hormones', 'Régulation : GnRH → FSH + LH · pic LH → ovulation'],
      blocs: [
        {
          notion: '♀️ Ovogenèse et cycle sexuel',
          theoremes: [
            { id: 'D-RF1', type: 'def', nom: 'Folliculogenèse et ovogenèse',
              enonce: "FOLLICULOGENÈSE :\nDéveloppement du follicule ovarien :\n1. Follicule primordial (réserve à la naissance)\n2. Follicule primaire → secondaire → tertiaire → FOLLICULE MÛR (de De Graaf)\n\nStructure du follicule mûr :\n• Ovocyte II au centre (bloqué en métaphase II)\n• Cellules de la granulosa (sécrètent les œstrogènes)\n• Antrum (liquide folliculaire)\n• Thèque interne et externe\n\nOVOGENÈSE :\n• Ovogonies → ovocyte I (2n) formés AVANT la naissance (fœtus)\n• Méiose I arrêtée en prophase I jusqu'à la puberté\n• À chaque cycle : 1 follicule dominant reprend la méiose I\n• Méiose I → ovocyte II (n) + 1er globule polaire\n• Méiose II arrêtée en métaphase II → OVULATION\n• Méiose II terminée SEULEMENT si fécondation → ovotide + 2ème globule polaire" },
            { id: 'D-RF2', type: 'def', nom: 'Cycle sexuel féminin',
              enonce: "Le CYCLE SEXUEL FÉMININ dure en moyenne 28 jours. Il se compose de 3 cycles simultanés.\n\nCYCLE OVARIEN :\n• Phase folliculaire (j1–j14) : développement du follicule dominant\n• OVULATION (j14) : pic de LH → rupture du follicule → libération de l'ovocyte II\n• Phase lutéale (j15–j28) : follicule → corps jaune → progestérone\n• Si pas de fécondation : corps jaune dégénère → chute hormonale → menstruations\n\nCYCLE UTÉRIN (endomètre) :\n• Phase menstruelle (j1–j5) : desquamation de la muqueuse\n• Phase proliférative (j6–j14) : épaississement (action des œstrogènes)\n• Phase sécrétoire (j15–j28) : sécrétion glandes utérines (action progestérone)\n\nCYCLE HORMONAL :\n• FSH ↑ → croissance follicule → œstrogènes ↑\n• Pic d'œstrogènes → rétrocontrôle POSITIF → pic de LH → ovulation\n• Corps jaune → progestérone + œstrogènes → rétrocontrôle négatif → FSH et LH ↓\n• Chute progestérone → menstruations",
              remarque: 'Le rétrocontrôle POSITIF des œstrogènes sur LH est exceptionnel dans l\'organisme (la plupart des rétrocontrôles sont négatifs). Il déclenche le pic ovulatoire de LH.' },
          ],
          exercices: [
            { id: 'EX-RF1', niveau: 'Intermédiaire', titre: 'Ovulation et hormones',
              enonce: "Chez une femme, la concentration en LH augmente brutalement le 14ème jour du cycle. Expliquer la cause de ce pic et ses conséquences.",
              correction: "CAUSE DU PIC DE LH :\nDans la 1ère moitié du cycle, les œstrogènes (produits par le follicule en croissance) augmentent progressivement.\nQuand leur concentration atteint un seuil élevé → rétrocontrôle POSITIF → stimulation de l'hypophyse → libération massive de LH (pic de LH).\n\nCONSÉQUENCES :\n• Le pic de LH déclenche l'OVULATION : rupture du follicule mûr → libération de l'ovocyte II\n• Le follicule rompu se transforme en CORPS JAUNE qui sécrète progestérone et œstrogènes." },
          ],
        },
      ],
    },
  ],
},

// ─────────────────────────────────────────────────────────────────────
// CH 12 — LA FÉCONDATION ET LA PROCRÉATION
// ─────────────────────────────────────────────────────────────────────
'fecondation-procreation': {
  id: 'fecondation-procreation', emoji: '🌱', tag: 'SVT', color: '#f59e0b',
  titre: 'La fécondation et la procréation',
  desc: 'La fécondation est la fusion du spermatozoïde et de l\'ovocyte II dans les trompes de Fallope. La maîtrise de la procréation inclut les méthodes contraceptives et les techniques de procréation médicalement assistée (FIVETE).',
  souschapitres: [
    {
      id: 'sc-fp-fecond', titre: '12.1 Fécondation et maîtrise de la procréation',
      notions: ['Capacitation du spermatozoïde', 'Étapes : pénétration · réaction corticale · fusion des pronuclei', 'Contraception chimique (pilule) · mécanique (préservatif)', 'FIVETE · IAD'],
      blocs: [
        {
          notion: '🌱 Fécondation',
          theoremes: [
            { id: 'D-FP1', type: 'def', nom: 'Étapes de la fécondation',
              enonce: "La FÉCONDATION est la fusion du spermatozoïde et de l'ovocyte II → cellule-œuf (zygote) 2n.\n\nCONDITIONS PRÉALABLES :\n• Rencontre dans le 1/3 externe de la TROMPE DE FALLOPE (12 – 24h après ovulation)\n• CAPACITATION : maturation du spermatozoïde dans les voies génitales féminines\n  (modification de la membrane plasmique → hyperactivation du flagelle)\n\nÉTAPES DE LA FÉCONDATION :\n1. Pénétration dans la zone pellucide : acrosine et hyaluronidase dissolvent la zone\n2. Fusion des membranes : un seul spermatozoïde pénètre (réaction corticale → bloc polyspermie)\n3. Activation de l'ovocyte II → achève la méiose II → ovotide + 2ème globule polaire\n4. Formation des PRONUCLEI : noyau femelle (23 chr.) + noyau mâle (23 chr.)\n5. Fusion des pronuclei → ZYGOTE (46 chromosomes)\n→ Début du développement embryonnaire (segmentation)" },
            { id: 'D-FP2', type: 'def', nom: 'Maîtrise de la procréation',
              enonce: "CONTRACEPTION :\n\nMÉTHODES CHIMIQUES :\n• Pilule combinée (œstro-progestative) : bloque la sécrétion de FSH et LH → pas d'ovulation\n• Pilule progestative seule : épaissit la glaire cervicale + atrophie de l'endomètre\n• Contraception d'urgence : lévonorgestrel (retarde l'ovulation)\n• Stérilet hormonal (DIU) : libère progestérone localement\n\nMÉTHODES MÉCANIQUES :\n• Préservatif masculin/féminin : barrière mécanique + protection IST\n• Stérilet au cuivre : inhibe les spermatozoïdes + empêche la nidation\n• Diaphragme\n\nPROCRÉATION MÉDICALEMENT ASSISTÉE (PMA) :\nFIVETE (Fécondation In Vitro et Transfert d'Embryon) :\n1. Stimulation ovarienne (FSH) → plusieurs follicules\n2. Ponction des ovocytes sous échographie\n3. Fécondation in vitro avec les spermatozoïdes du conjoint\n4. Culture des embryons (2 – 5 jours)\n5. Transfert de 1 – 2 embryons dans l'utérus\n\nIAD (Insémination Artificielle avec Donneur) : injection de sperme dans l'utérus",
              remarque: 'Seul le préservatif protège à la fois contre les IST ET contre les grossesses non désirées. La pilule n\'offre aucune protection contre les IST.' },
          ],
          exercices: [
            { id: 'EX-FP1', niveau: 'Facile', titre: 'Pilule contraceptive',
              enonce: "Comment la pilule combinée (œstro-progestative) empêche-t-elle la grossesse ?",
              correction: "La pilule combinée contient des œstrogènes et de la progestérone de synthèse.\nCes hormones, maintenues à un taux constant, exercent un RÉTROCONTRÔLE NÉGATIF sur l'hypothalamus et l'hypophyse.\n→ Inhibition de la sécrétion de GnRH → pas de sécrétion de FSH et de LH\n→ Pas de développement folliculaire → PAS D'OVULATION\n→ Pas d'ovocyte disponible → la fécondation est impossible." },
          ],
        },
      ],
    },
  ],
},

// ─────────────────────────────────────────────────────────────────────
// CH 13 — NUTRITION ANIMALE
// ─────────────────────────────────────────────────────────────────────
'nutrition-animale': {
  id: 'nutrition-animale', emoji: '🍎', tag: 'SVT', color: '#10b981',
  titre: 'Nutrition animale',
  desc: 'La digestion transforme les macromolécules alimentaires en molécules assimilables. La respiration cellulaire (glycolyse, cycle de Krebs, chaîne respiratoire) dégrade le glucose pour produire de l\'énergie sous forme d\'ATP.',
  souschapitres: [
    {
      id: 'sc-na-digestion', titre: '13.1 Digestion, absorption et respiration cellulaire',
      notions: ['Amylase salivaire : amidon → maltose', 'Pepsine : protéines → peptides (pH acide)', 'Villosités intestinales : absorption', 'Glycolyse → Cycle de Krebs → Chaîne respiratoire → 38 ATP'],
      blocs: [
        {
          notion: '🍎 Digestion et respiration cellulaire',
          theoremes: [
            { id: 'D-NA1', type: 'def', nom: 'Digestion des aliments',
              enonce: "La DIGESTION est la transformation des macromolécules en molécules assimilables par les cellules.\n\nGLUCIDES :\n• Amidon → maltose : amylase SALIVAIRE (pH 6,8 · t° 37°C)\n• Maltose → glucose : maltase intestinale\n\nPROTÉINES :\n• Protéines → peptides : PEPSINE (pH 2 · estomac)\n• Peptides → acides aminés : trypsine · chymotrypsine (pancréas)\n\nLIPIDES :\n• Lipides → acides gras + glycérol : LIPASES (pancréatique principalement)\n• Émulsification préalable : sels biliaires (bile)\n\nFACTEURS INFLUANT :\n• Température : optimum ≈ 37°C (dénaturation > 50°C)\n• pH : chaque enzyme a un pH optimal\n\nABSORPTION :\n• Villosités intestinales (intestin grêle) : augmentent la surface × 600\n• Glucose + acides aminés → capillaires sanguins → veine porte\n• Acides gras + glycérol → lymphe (chylomicrons) → système lymphatique" },
            { id: 'F-NA1', type: 'formule', nom: 'Respiration cellulaire',
              enonce: "La RESPIRATION CELLULAIRE dégrade le glucose pour produire de l'ATP.\n\nÉQUATION BILAN :\nC₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + 38 ATP\n\nÉTAPES :\n1. GLYCOLYSE (cytoplasme) :\n   Glucose (6C) → 2 pyruvates (3C) + 2 ATP + 2 NADH\n   Ne nécessite pas d'O₂\n\n2. CYCLE DE KREBS (matrice mitochondriale) :\n   Pyruvates → CO₂ + NADH + FADH₂ + 2 ATP\n   Produit la majorité des coenzymes réduits\n\n3. CHAÎNE RESPIRATOIRE (membrane interne mitochondrie) :\n   NADH + FADH₂ + O₂ → H₂O + 34 ATP\n   Consomme O₂ · produit H₂O · majeure source d'ATP\n\nBILAN ÉNERGÉTIQUE :\n• 1 molécule de glucose → 38 ATP\n• Rendement : ≈ 40%",
              remarque: 'En absence d\'O₂ (anaérobiose) : glycolyse seulement → fermentation → seulement 2 ATP par glucose. Beaucoup moins efficace que la respiration aérobie.' },
          ],
          exercices: [
            { id: 'EX-NA1', niveau: 'Facile', titre: 'Enzyme digestive',
              enonce: "Un patient prend un médicament qui bloque l'acidité gastrique (antiacide). Quelle enzyme digestive est affectée ? Pourquoi ?",
              correction: "La PEPSINE est affectée.\nLa pepsine fonctionne optimalement à pH 2 (milieu très acide de l'estomac).\nSi l'acidité gastrique est bloquée → pH augmente → pepsine est inhibée (son pH optimal n'est plus atteint).\nConséquence : la digestion des protéines est ralentie dans l'estomac (elle sera compensée en partie par les protéases pancréatiques dans l'intestin grêle)." },
          ],
        },
      ],
    },
  ],
},

// ─────────────────────────────────────────────────────────────────────
// CH 14 — NUTRITION VÉGÉTALE
// ─────────────────────────────────────────────────────────────────────
'nutrition-vegetale': {
  id: 'nutrition-vegetale', emoji: '🌿', tag: 'SVT', color: '#22c55e',
  titre: 'Nutrition végétale',
  desc: 'Les végétaux chlorophylliens sont autotrophes : ils synthétisent leurs matières organiques par photosynthèse à partir de CO₂ et H₂O sous l\'action de la lumière. Ils absorbent également l\'eau et les sels minéraux du sol.',
  souschapitres: [
    {
      id: 'sc-nv-eau', titre: '14.1 Absorption de l\'eau et des sels minéraux',
      notions: ['Osmose : absorption racinaire par poils absorbants', 'Xylème : conduction de la sève brute vers les feuilles', 'Transpiration : stomates · pression de turgescence', 'Sels minéraux : N · P · K · Mg · Fe'],
      blocs: [
        {
          notion: '🌱 Absorption et conduction',
          theoremes: [
            { id: 'D-NV1', type: 'def', nom: 'Absorption de l\'eau et des sels minéraux',
              enonce: "ABSORPTION DE L'EAU :\n• Par OSMOSE : pression osmotique des cellules racinaires > solution du sol → entrée passive de l'eau\n• Zone d'absorption : poils absorbants (racines)\n\nCONDUCTION :\n• Sève BRUTE (eau + sels minéraux) : monte par le XYLÈME\n• Force motrice : transpiration + pression racinaire\n\nTRANSPIRATION FOLIAIRE :\n• Évaporation d'eau par les STOMATES (pores de la feuille)\n• Crée une tension qui aspire la sève brute vers le haut (théorie cohésion-tension)\n• Régulation : ouverture/fermeture des stomates (cellules de garde)\n\nSELS MINÉRAUX :\n• Nécessaires à la croissance et au métabolisme\n• N (azote) : synthèse des protéines et de l'ADN\n• P (phosphore) : ATP, acides nucléiques, membranes\n• K (potassium) : osmorégulation, enzymes\n• Mg (magnésium) : centre de la chlorophylle\n• Fe (fer) : synthèse de la chlorophylle\n\nCARENDES :\n• Azote : jaunissement des feuilles (chlorose) · croissance ralentie\n• Excès d'engrais : pollution des nappes phréatiques (nitrates)" },
          ],
          exercices: [
            { id: 'EX-NV1', niveau: 'Facile', titre: 'Osmose et absorption',
              enonce: "Une plante est placée dans une solution très concentrée en sel. Que se passe-t-il ? Expliquer en utilisant le principe de l'osmose.",
              correction: "La solution saline très concentrée a une PRESSION OSMOTIQUE plus élevée que celle du cytoplasme des cellules racinaires.\nPar OSMOSE, l'eau sort des cellules racinaires vers la solution du sol (sens : concentration faible → concentration élevée pour le solvant).\n→ Les cellules se déplasmolyse (perdent leur eau)\n→ PLASMOLYSE : ratatinage des cellules\n→ La plante se fane et meurt si l'exposition est prolongée.\nC'est pourquoi l'excès d'engrais peut 'brûler' les racines." },
          ],
        },
      ],
    },
    {
      id: 'sc-nv-photo', titre: '14.2 La photosynthèse',
      notions: ['Phase photochimique : photolyse de l\'eau · libération O₂', 'Phase biochimique (cycle de Calvin) : fixation CO₂ → glucose', 'Rôle de la chlorophylle · facteurs limitants'],
      blocs: [
        {
          notion: '☀️ Photosynthèse',
          theoremes: [
            { id: 'F-NV1', type: 'formule', nom: 'Équation bilan de la photosynthèse',
              enonce: "LA PHOTOSYNTHÈSE :\n6CO₂ + 6H₂O + énergie lumineuse → C₆H₁₂O₆ + 6O₂\n\nCHLOROPLASTE : siège de la photosynthèse\n• Thylakoïdes : membranes contenant la chlorophylle\n• Stroma : milieu liquide\n\nPHASE PHOTOCHIMIQUE (thylakoïdes) :\n• Absorption de la lumière par la CHLOROPHYLLE\n• PHOTOLYSE DE L'EAU : 2H₂O → 4H⁺ + 4e⁻ + O₂ ↑ (source de l'O₂ libéré)\n• Production d'ATP et de NADPH\n\nPHASE BIOCHIMIQUE — CYCLE DE CALVIN (stroma) :\n• Fixation du CO₂ sur le ribulose-1,5-bisphosphate (RuBP)\n• Réduction des molécules C3 → glucose\n• Régénération du RuBP\n\nFACTEURS LIMITANTS (intensité photosynthétique ∝) :\n• Intensité lumineuse (facteur principal par faible lumière)\n• Concentration en CO₂\n• Température (action sur les enzymes du cycle de Calvin)\n• Eau",
              remarque: 'L\'O₂ libéré par la photosynthèse provient de la PHOTOLYSE DE L\'EAU, pas du CO₂. L\'origine de l\'oxygène atmosphérique est l\'eau dissociée par les chloroplastes.' },
          ],
          exercices: [
            { id: 'EX-NV2', niveau: 'Intermédiaire', titre: 'Facteurs limitants',
              enonce: "En augmentant l'intensité lumineuse, l'intensité photosynthétique augmente jusqu'à un plateau. En augmentant ensuite la concentration en CO₂, l'intensité augmente à nouveau. Que peut-on conclure ?",
              correction: "Quand l'intensité lumineuse est faible : la LUMIÈRE est le facteur limitant → augmenter la lumière → augmenter la photosynthèse.\n\nAu plateau avec lumière seule : la lumière n'est plus limitante. Un autre facteur devient limitant : ici le CO₂.\n\nEn augmentant le CO₂ : l'intensité photosynthétique reprend sa croissance → le CO₂ était bien le nouveau facteur limitant.\n\nCONCLUSION : la photosynthèse est limitée par le facteur en déficit (loi de Liebig du minimum). On peut augmenter les rendements en culture sous serre en enrichissant l'atmosphère en CO₂." },
          ],
        },
      ],
    },
  ],
},

} // fin ALL_CHAPTERS

// ══════════════════════════════════════════════════════════════════════
// COMPOSANTS UTILITAIRES
// ══════════════════════════════════════════════════════════════════════

function TypeBadge({ type }: { type: string }) {
  const color = C[type as keyof typeof C] || C.def
  const label = L[type as keyof typeof L] || type
  return (
    <span style={{ fontSize: 10, padding: '2px 9px', borderRadius: 20, background: `${color}20`, color, fontWeight: 700, flexShrink: 0 }}>
      {label}
    </span>
  )
}

function NiveauBadge({ niveau }: { niveau: string }) {
  const colors: Record<string, string> = { 'Facile': '#22c55e', 'Intermédiaire': '#f59e0b', 'Difficile': '#ef4444' }
  const c = colors[niveau] || '#06b6d4'
  return (
    <span style={{ fontSize: 10, padding: '2px 8px', borderRadius: 12, background: `${c}18`, color: c, fontWeight: 700 }}>{niveau}</span>
  )
}

// ══════════════════════════════════════════════════════════════════════
// PAGE PRINCIPALE
// ══════════════════════════════════════════════════════════════════════

export default function SvtScexpSlugPage() {
  const params = useParams()
  const slug = Array.isArray(params.slug) ? params.slug[0] : (params.slug ?? '')
  const chapter = ALL_CHAPTERS[slug]
  const [openSc, setOpenSc] = useState<string | null>(null)
  const [openEx, setOpenEx] = useState<string | null>(null)

  const curIdx  = NAV_ORDER.indexOf(slug)
  const prevSlug = curIdx > 0 ? NAV_ORDER[curIdx - 1] : null
  const nextSlug = curIdx < NAV_ORDER.length - 1 ? NAV_ORDER[curIdx + 1] : null
  const secColor = SEC_COLORS[slug] || '#22c55e'

  // Groupe actuel
  const currentTheme = Object.entries(THEME_SLUGS).find(([, slugs]) => slugs.includes(slug))
  const currentThemeName = currentTheme?.[0] ?? ''

  if (!chapter) {
    return (
      <>
        <Navbar />
        <main style={{ paddingTop: 120, minHeight: '60vh', textAlign: 'center' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
          <h1 style={{ fontSize: 24 }}>Chapitre non trouvé</h1>
          <p style={{ color: 'var(--muted)' }}>Le chapitre "{slug}" n'existe pas pour la section Sciences Expérimentales (SVT).</p>
          <Link href="/bac/svt/sciences-exp" className="btn btn-primary" style={{ textDecoration: 'none', display: 'inline-block', marginTop: 20 }}>
            ← Retour aux chapitres SVT Sc.Exp.
          </Link>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Navbar />
      <main style={{ position: 'relative', zIndex: 1, paddingTop: 80 }}>
        <div className="container" style={{ paddingTop: 32, paddingBottom: 80 }}>

          {/* FIL D'ARIANE */}
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 11, color: 'var(--muted)', marginBottom: 20, flexWrap: 'wrap' }}>
            <Link href="/bac" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇹🇳 Tunisie</Link>
            <span>›</span>
            <Link href="/bac/svt" style={{ color: 'var(--muted)', textDecoration: 'none' }}>SVT</Link>
            <span>›</span>
            <Link href="/bac/svt/sciences-exp" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Sciences Exp.</Link>
            <span>›</span>
            <span style={{ color: secColor }}>{chapter.titre}</span>
          </div>

          {/* LAYOUT PRINCIPAL */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 270px', gap: 28, alignItems: 'start' }}>

            {/* ═══════ CONTENU PRINCIPAL ═══════ */}
            <div>
              {/* HEADER */}
              <div style={{ marginBottom: 36 }}>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 12, flexWrap: 'wrap' }}>
                  <span style={{ fontSize: 28 }}>{chapter.emoji}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: secColor, background: `${secColor}18`, padding: '3px 10px', borderRadius: 8, fontWeight: 700 }}>
                    {TITRES_NAV[slug]?.split(' — ')[0]}
                  </span>
                  <span style={{ fontSize: 11, padding: '2px 10px', borderRadius: 20, background: `${secColor}14`, color: secColor, fontWeight: 700 }}>SVT</span>
                  <span style={{ fontSize: 11, background: 'rgba(34,197,94,0.15)', color: '#4ade80', padding: '2px 9px', borderRadius: 10 }}>
                    🔬 Sc. Exp. · Tunisie
                  </span>
                </div>
                <h1 style={{ fontSize: 'clamp(22px,3vw,36px)', fontWeight: 800, marginBottom: 10 }}>
                  {chapter.titre}
                </h1>
                <p style={{ color: 'var(--text2)', fontSize: 14, lineHeight: 1.7, maxWidth: 620, marginBottom: 18 }}>{chapter.desc}</p>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  <Link href={`/solve?q=${encodeURIComponent('Explique ' + chapter.titre + ' SVT Sc.Exp. Bac Tunisie')}`}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '8px 16px', borderRadius: 10, background: `linear-gradient(135deg,${secColor},${secColor}cc)`, color: 'white', fontSize: 13, fontWeight: 700, textDecoration: 'none' }}>
                    🤖 Chat IA — ce chapitre
                  </Link>
                  <Link href="/examens"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '8px 16px', borderRadius: 10, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', color: 'var(--text2)', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>
                    📋 Exercices Bac
                  </Link>
                  <Link href="/simulation"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '8px 16px', borderRadius: 10, background: `${secColor}10`, border: `1px solid ${secColor}30`, color: secColor, fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>
                    🎯 Simulation Bac
                  </Link>
                </div>
              </div>

              {/* SOUS-CHAPITRES */}
              {chapter.souschapitres.map((sc, scIdx) => (
                <div key={sc.id} style={{ marginBottom: 24, background: `${secColor}05`, border: `1px solid ${secColor}20`, borderRadius: 18, overflow: 'hidden' }}>
                  <button
                    onClick={() => setOpenSc(openSc === sc.id ? null : sc.id)}
                    style={{ width: '100%', background: `${secColor}12`, borderBottom: `1px solid ${secColor}20`, padding: '16px 22px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', border: 'none', textAlign: 'left' }}>
                    <div>
                      <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 6 }}>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: secColor, fontWeight: 700 }}>
                          {String(scIdx + 1).padStart(2, '0')}
                        </span>
                        <h2 style={{ fontSize: 15, fontWeight: 800, color: 'var(--text)', margin: 0 }}>{sc.titre}</h2>
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                        {sc.notions.map(n => (
                          <span key={n} style={{ fontSize: 10, padding: '2px 9px', borderRadius: 12, background: `${secColor}12`, color: 'var(--text2)', border: `1px solid ${secColor}18` }}>{n}</span>
                        ))}
                      </div>
                    </div>
                    <span style={{ fontSize: 18, color: secColor, marginLeft: 12 }}>
                      {(openSc === sc.id || scIdx === 0) ? '▲' : '▼'}
                    </span>
                  </button>

                  {(openSc === sc.id || scIdx === 0) && (
                    <div style={{ padding: '18px 22px', display: 'flex', flexDirection: 'column', gap: 24 }}>
                      {sc.blocs.map(bloc => (
                        <div key={bloc.notion}>
                          <div style={{ fontSize: 14, fontWeight: 800, color: secColor, marginBottom: 14 }}>{bloc.notion}</div>

                          <div style={{ display: 'flex', flexDirection: 'column', gap: 11, marginBottom: 14 }}>
                            {bloc.theoremes.map(t => {
                              const color = C[t.type as keyof typeof C] || C.def
                              return (
                                <div key={t.id} style={{ borderLeft: `3px solid ${color}`, background: `${color}07`, borderRadius: '0 12px 12px 0', padding: '14px 18px', border: `1px solid ${color}18` }}>
                                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8, gap: 10, flexWrap: 'wrap' }}>
                                    <div style={{ fontWeight: 700, fontSize: 13 }}>{t.nom}</div>
                                    <TypeBadge type={t.type} />
                                  </div>
                                  <div style={{ fontSize: 12, color: 'var(--text2)', lineHeight: 1.85, whiteSpace: 'pre-line', fontFamily: t.type === 'formule' ? 'var(--font-mono)' : 'inherit' }}>
                                    {t.enonce}
                                  </div>
                                  {t.remarque && (
                                    <div style={{ marginTop: 10, paddingLeft: 12, borderLeft: '2px solid rgba(245,158,11,0.5)', fontSize: 11, color: 'rgba(245,158,11,0.9)', fontStyle: 'italic', lineHeight: 1.6 }}>
                                      ⚡ {t.remarque}
                                    </div>
                                  )}
                                </div>
                              )
                            })}
                          </div>

                          {bloc.exercices.length > 0 && (
                            <div>
                              <div style={{ fontSize: 11, color: 'var(--muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 9 }}>
                                Exercices
                              </div>
                              <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
                                {bloc.exercices.map(ex => (
                                  <div key={ex.id} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
                                    <div style={{ padding: '12px 16px' }}>
                                      <div style={{ display: 'flex', gap: 7, alignItems: 'center', marginBottom: 7, flexWrap: 'wrap' }}>
                                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--muted)', background: 'var(--surface2)', padding: '2px 7px', borderRadius: 5 }}>{ex.id}</span>
                                        <NiveauBadge niveau={ex.niveau} />
                                        <span style={{ fontWeight: 600, fontSize: 13 }}>{ex.titre}</span>
                                      </div>
                                      <p style={{ fontSize: 12, color: 'var(--text2)', margin: 0, lineHeight: 1.65, whiteSpace: 'pre-line' }}>{ex.enonce}</p>
                                    </div>
                                    <div style={{ borderTop: '1px solid var(--border)', padding: '8px 16px', display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                                      <Link href={`/solve?q=${encodeURIComponent('SVT Sc.Exp. Tunisie — ' + ex.enonce)}`}
                                        className="btn btn-primary" style={{ fontSize: 11, padding: '5px 12px' }}>
                                        🧮 Résoudre avec IA
                                      </Link>
                                      <button onClick={() => setOpenEx(openEx === ex.id ? null : ex.id)}
                                        style={{ fontSize: 11, padding: '5px 12px', borderRadius: 7, border: '1px solid var(--border)', background: 'transparent', color: 'var(--text2)', cursor: 'pointer', fontFamily: 'inherit' }}>
                                        📋 {openEx === ex.id ? 'Masquer' : 'Correction'}
                                      </button>
                                    </div>
                                    {openEx === ex.id && (
                                      <div style={{ padding: '10px 16px', borderTop: '1px solid var(--border)', background: `${secColor}06` }}>
                                        <div style={{ fontSize: 10, color: secColor, fontWeight: 700, marginBottom: 4 }}>✅ Correction</div>
                                        <div style={{ fontSize: 12, color: 'var(--text2)', lineHeight: 1.75, whiteSpace: 'pre-line' }}>{ex.correction}</div>
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* NAV PREV / NEXT */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, borderTop: '1px solid var(--border)', paddingTop: 22, marginTop: 8 }}>
                {prevSlug ? (
                  <Link href={`/bac/svt/sciences-exp/${prevSlug}`} style={{ textDecoration: 'none' }}>
                    <div className="card" style={{ padding: '12px 15px', transition: 'transform 0.15s' }}
                      onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                      onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
                      <div style={{ fontSize: 10, color: 'var(--muted)', marginBottom: 2 }}>← Précédent</div>
                      <div style={{ fontWeight: 700, fontSize: 12 }}>{TITRES_NAV[prevSlug].replace(/CH \d+ — /, '')}</div>
                    </div>
                  </Link>
                ) : <div />}
                {nextSlug ? (
                  <Link href={`/bac/svt/sciences-exp/${nextSlug}`} style={{ textDecoration: 'none' }}>
                    <div className="card" style={{ padding: '12px 15px', textAlign: 'right', transition: 'transform 0.15s' }}
                      onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                      onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
                      <div style={{ fontSize: 10, color: 'var(--muted)', marginBottom: 2 }}>Suivant →</div>
                      <div style={{ fontWeight: 700, fontSize: 12 }}>{TITRES_NAV[nextSlug].replace(/CH \d+ — /, '')}</div>
                    </div>
                  </Link>
                ) : <div />}
              </div>
            </div>

            {/* ═══════ SIDEBAR ═══════ */}
            <aside style={{ position: 'sticky', top: 88 }}>
              <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, overflow: 'hidden', marginBottom: 12 }}>

                {/* Thème I */}
                <div style={{ padding: '10px 14px', borderBottom: '1px solid var(--border)', fontSize: 11, color: '#4f6ef7', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', background: 'rgba(79,110,247,0.08)' }}>
                  🧬 Thème I — Génétique
                </div>
                {THEME_SLUGS['Thème I — Génétique'].map(s => (
                  <Link key={s} href={`/bac/svt/sciences-exp/${s}`} style={{ textDecoration: 'none' }}>
                    <div style={{ padding: '8px 15px', borderBottom: '1px solid var(--border)', background: s === slug ? `${SEC_COLORS[s]}12` : 'transparent', borderLeft: s === slug ? `3px solid ${SEC_COLORS[s]}` : '3px solid transparent', transition: 'all 0.15s', cursor: 'pointer' }}
                      onMouseEnter={e => { if (s !== slug) e.currentTarget.style.background = 'rgba(255,255,255,0.03)' }}
                      onMouseLeave={e => { if (s !== slug) e.currentTarget.style.background = 'transparent' }}>
                      <div style={{ fontSize: 10, color: 'var(--muted)', marginBottom: 1, fontFamily: 'var(--font-mono)' }}>{TITRES_NAV[s].split(' — ')[0]}</div>
                      <div style={{ fontSize: 11, fontWeight: s === slug ? 700 : 400, color: s === slug ? SEC_COLORS[s] : 'var(--text2)' }}>{TITRES_NAV[s].replace(/CH \d+ — /, '').slice(0, 28)}</div>
                    </div>
                  </Link>
                ))}

                {/* Thème II */}
                <div style={{ padding: '10px 14px', borderBottom: '1px solid var(--border)', fontSize: 11, color: '#10b981', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', background: 'rgba(16,185,129,0.08)' }}>
                  🧠 Thème II — Milieu intérieur
                </div>
                {THEME_SLUGS['Thème II — Milieu intérieur'].map(s => (
                  <Link key={s} href={`/bac/svt/sciences-exp/${s}`} style={{ textDecoration: 'none' }}>
                    <div style={{ padding: '8px 15px', borderBottom: '1px solid var(--border)', background: s === slug ? `${SEC_COLORS[s]}12` : 'transparent', borderLeft: s === slug ? `3px solid ${SEC_COLORS[s]}` : '3px solid transparent', transition: 'all 0.15s', cursor: 'pointer' }}
                      onMouseEnter={e => { if (s !== slug) e.currentTarget.style.background = 'rgba(255,255,255,0.03)' }}
                      onMouseLeave={e => { if (s !== slug) e.currentTarget.style.background = 'transparent' }}>
                      <div style={{ fontSize: 10, color: 'var(--muted)', marginBottom: 1, fontFamily: 'var(--font-mono)' }}>{TITRES_NAV[s].split(' — ')[0]}</div>
                      <div style={{ fontSize: 11, fontWeight: s === slug ? 700 : 400, color: s === slug ? SEC_COLORS[s] : 'var(--text2)' }}>{TITRES_NAV[s].replace(/CH \d+ — /, '').slice(0, 28)}</div>
                    </div>
                  </Link>
                ))}

                {/* Thème III */}
                <div style={{ padding: '10px 14px', borderBottom: '1px solid var(--border)', fontSize: 11, color: '#ec4899', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', background: 'rgba(236,72,153,0.08)' }}>
                  👶 Thème III — Reproduction
                </div>
                {THEME_SLUGS['Thème III — Reproduction'].map(s => (
                  <Link key={s} href={`/bac/svt/sciences-exp/${s}`} style={{ textDecoration: 'none' }}>
                    <div style={{ padding: '8px 15px', borderBottom: '1px solid var(--border)', background: s === slug ? `${SEC_COLORS[s]}12` : 'transparent', borderLeft: s === slug ? `3px solid ${SEC_COLORS[s]}` : '3px solid transparent', transition: 'all 0.15s', cursor: 'pointer' }}
                      onMouseEnter={e => { if (s !== slug) e.currentTarget.style.background = 'rgba(255,255,255,0.03)' }}
                      onMouseLeave={e => { if (s !== slug) e.currentTarget.style.background = 'transparent' }}>
                      <div style={{ fontSize: 10, color: 'var(--muted)', marginBottom: 1, fontFamily: 'var(--font-mono)' }}>{TITRES_NAV[s].split(' — ')[0]}</div>
                      <div style={{ fontSize: 11, fontWeight: s === slug ? 700 : 400, color: s === slug ? SEC_COLORS[s] : 'var(--text2)' }}>{TITRES_NAV[s].replace(/CH \d+ — /, '').slice(0, 28)}</div>
                    </div>
                  </Link>
                ))}

                {/* Thème IV */}
                <div style={{ padding: '10px 14px', borderBottom: '1px solid var(--border)', fontSize: 11, color: '#22c55e', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', background: 'rgba(34,197,94,0.08)' }}>
                  🌿 Thème IV — Nutrition
                </div>
                {THEME_SLUGS['Thème IV — Nutrition'].map(s => (
                  <Link key={s} href={`/bac/svt/sciences-exp/${s}`} style={{ textDecoration: 'none' }}>
                    <div style={{ padding: '8px 15px', borderBottom: '1px solid var(--border)', background: s === slug ? `${SEC_COLORS[s]}12` : 'transparent', borderLeft: s === slug ? `3px solid ${SEC_COLORS[s]}` : '3px solid transparent', transition: 'all 0.15s', cursor: 'pointer' }}
                      onMouseEnter={e => { if (s !== slug) e.currentTarget.style.background = 'rgba(255,255,255,0.03)' }}
                      onMouseLeave={e => { if (s !== slug) e.currentTarget.style.background = 'transparent' }}>
                      <div style={{ fontSize: 10, color: 'var(--muted)', marginBottom: 1, fontFamily: 'var(--font-mono)' }}>{TITRES_NAV[s].split(' — ')[0]}</div>
                      <div style={{ fontSize: 11, fontWeight: s === slug ? 700 : 400, color: s === slug ? SEC_COLORS[s] : 'var(--text2)' }}>{TITRES_NAV[s].replace(/CH \d+ — /, '').slice(0, 28)}</div>
                    </div>
                  </Link>
                ))}

              </div>

              {/* Actions */}
              <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '13px' }}>
                <div style={{ fontSize: 11, color: 'var(--muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 9 }}>Actions</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <Link href={`/solve?q=${encodeURIComponent('Explique ' + chapter.titre + ' SVT Sc.Exp. Bac Tunisie')}`}
                    className="btn btn-primary" style={{ textAlign: 'center', fontSize: 12 }}>
                    🤖 Chat IA — SVT
                  </Link>
                  <Link href="/examens" className="btn btn-secondary" style={{ textAlign: 'center', fontSize: 12 }}>📋 Exercice type Bac</Link>
                  <Link href="/simulation" className="btn btn-secondary" style={{ textAlign: 'center', fontSize: 12 }}>🎯 Simulation Bac</Link>
                  <Link href="/bac/svt/sciences-exp" className="btn btn-secondary" style={{ textAlign: 'center', fontSize: 12 }}>↩ Tous les chapitres</Link>
                  <Link href="/bac/svt" className="btn btn-secondary" style={{ textAlign: 'center', fontSize: 12 }}>📚 Autres sections SVT</Link>
                </div>
              </div>
            </aside>

          </div>
        </div>
      </main>
      <Footer />
      <style>{`
        @media(max-width:900px){
          div[style*="grid-template-columns: 1fr 270px"]{grid-template-columns:1fr!important;}
          aside{display:none;}
        }
      `}</style>
    </>
  )
}
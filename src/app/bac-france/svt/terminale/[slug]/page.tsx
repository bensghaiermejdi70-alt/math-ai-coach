'use client'
import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import { useParams } from 'next/navigation'

// ══════════════════════════════════════════════════════════════════════
// SVT FRANCE — TERMINALE SPÉCIALITÉ · PAGE SLUG COMPLÈTE
// Route : /bac-france/svt/terminale/[slug]
// 14 chapitres · 3 thèmes · Coef. 16 · Épreuve 3h30 + ECE 1h
// Programme officiel MEN 2026 (amalgame 2 programmes)
// ══════════════════════════════════════════════════════════════════════

const C = { thm:'#0891b2', def:'#22c55e', formule:'#f59e0b', prop:'#8b5cf6', methode:'#ec4899' }
const L: Record<string,string> = { thm:'Théorème', def:'Définition', formule:'Formule clé', prop:'Propriété', methode:'Méthode' }

const NAV_ORDER = [
  'origine-genotype-terminale',
  'complexification-genomes-terminale',
  'evolution-genomes-populations-terminale',
  'autres-mecanismes-diversite',
  'temps-roches-terminale',
  'traces-passe-terre-terminale',
  'plantes-organisation-terminale',
  'photosynthese-biomasse-terminale',
  'reproduction-plantes-terminale',
  'paleoclimats-terminale',
  'rechauffement-climatique-terminale',
  'reflexes-systeme-nerveux-terminale',
  'contraction-musculaire-terminale',
  'comportements-stress-terminale',
]

const TITRES_NAV: Record<string,string> = {
  'origine-genotype-terminale':              'CH.1 — Origine du génotype',
  'complexification-genomes-terminale':      'CH.2 — Complexification des génomes',
  'evolution-genomes-populations-terminale': 'CH.3 — Évolution des génomes (Hardy-Weinberg)',
  'autres-mecanismes-diversite':             'CH.4 — Autres mécanismes de diversité',
  'temps-roches-terminale':                  'CH.5 — Le temps et les roches',
  'traces-passe-terre-terminale':            'CH.6 — Traces du passé de la Terre',
  'plantes-organisation-terminale':          'CH.7 — Organisation des plantes à fleurs',
  'photosynthese-biomasse-terminale':        'CH.8 — Photosynthèse & Biomasse',
  'reproduction-plantes-terminale':          'CH.9 — Reproduction & Domestication',
  'paleoclimats-terminale':                  'CH.10 — Paléoclimats',
  'rechauffement-climatique-terminale':      'CH.11 — Réchauffement climatique',
  'reflexes-systeme-nerveux-terminale':      'CH.12 — Réflexes & Système nerveux',
  'contraction-musculaire-terminale':        'CH.13 — Contraction musculaire & Énergie',
  'comportements-stress-terminale':          'CH.14 — Comportements & Stress',
}

const SEC_COLORS: Record<string,string> = {
  'origine-genotype-terminale':              '#22c55e',
  'complexification-genomes-terminale':      '#16a34a',
  'evolution-genomes-populations-terminale': '#4ade80',
  'autres-mecanismes-diversite':             '#84cc16',
  'temps-roches-terminale':                  '#f97316',
  'traces-passe-terre-terminale':            '#ea580c',
  'plantes-organisation-terminale':          '#10b981',
  'photosynthese-biomasse-terminale':        '#059669',
  'reproduction-plantes-terminale':          '#34d399',
  'paleoclimats-terminale':                  '#0ea5e9',
  'rechauffement-climatique-terminale':      '#0891b2',
  'reflexes-systeme-nerveux-terminale':      '#8b5cf6',
  'contraction-musculaire-terminale':        '#ec4899',
  'comportements-stress-terminale':          '#f59e0b',
}

// ═════════════════════════════════════════════════════════════════════
// DONNÉES — 14 CHAPITRES TERMINALE SVT
// ═════════════════════════════════════════════════════════════════════

const ALL_CHAPTERS: Record<string, {
  id: string; titre: string; badge: string; color: string; emoji: string; desc: string;
  souschapitres: {
    id: string; titre: string; notions: string[];
    blocs: {
      notion: string;
      theoremes: { id:string; type:string; nom:string; enonce:string }[];
      exercices: { id:string; niveau:string; titre:string; enonce:string; correction:string }[];
    }[];
  }[];
}> = {

// ═══════════════════════════════════════════════════════════════════════
// CH.1 — ORIGINE DU GÉNOTYPE DES INDIVIDUS
// ═══════════════════════════════════════════════════════════════════════
'origine-genotype-terminale': {
  id:'origine-genotype-terminale', emoji:'🧬', badge:'Génétique & Évolution', color:'#22c55e',
  titre:'L\'origine du génotype des individus',
  desc:'La méiose et la fécondation sexuée sont les deux mécanismes qui génèrent la formidable diversité génétique des individus. Ce chapitre est la clé de voûte de la génétique en Terminale.',
  souschapitres:[
    {
      id:'sc-meiose', titre:'1.1 Méiose & brassage génétique',
      notions:['Méiose I (réductionnelle)','Méiose II (équationnelle)','Tétrades','Crossing-over (Prophase I)','Brassage interchromosomique (Anaphase I)','Gamètes parentaux & recombinants'],
      blocs:[
        {
          notion:'🔬 La méiose — réduire le nombre de chromosomes',
          theoremes:[
            { id:'D-M1', type:'def', nom:'Les deux divisions de la méiose',
              enonce:'La MÉIOSE est une division cellulaire particulière produisant 4 cellules haploïdes (n) à partir d\'une cellule diploïde (2n).\n\nMÉIOSE I — Division RÉDUCTIONNELLE :\n• Prophase I : appariement des chromosomes homologues → tétrades → crossing-over (échanges de segments)\n• Métaphase I : alignement des bivalents sur la plaque équatoriale\n• Anaphase I : séparation des chromosomes homologues (2n → n chromosomes bivalents) → BRASSAGE INTERCHROMOSOMIQUE\n• Télophase I : 2 cellules à n chromosomes chacune (mais bivalents)\n\nMÉIOSE II — Division ÉQUATIONNELLE (= mitose) :\n• Séparation des chromatides sœurs\n• Résultat : 4 cellules haploïdes (n) contenant chacune 1 chromatide\n\nChez l\'Homme : 2n = 46 → 4 cellules haploïdes n = 23' },
            { id:'D-M2', type:'def', nom:'Les deux mécanismes de brassage génétique',
              enonce:'BRASSAGE INTERCHROMOSOMIQUE (Anaphase I) :\n→ Les chromosomes homologues d\'origines paternelle et maternelle se répartissent ALÉATOIREMENT dans les cellules filles\n→ Nombre de combinaisons possibles = 2ⁿ (n = nombre de paires de chromosomes)\n→ Chez l\'Homme : 2²³ = ~8,4 millions de combinaisons\n\nBRASSAGE INTRACHROMOSOMIQUE (Crossing-over, Prophase I) :\n→ Échange de segments entre chromatides de chromosomes homologues\n→ Crée des gamètes RECOMBINANTS (combinaisons nouvelles non présentes chez les parents)\n→ Fréquence de recombinaison fr = (gamètes recombinants / total gamètes) × 100\n→ fr = distance génétique en cM (centiMorgans) : 1 cM = 1% de recombinaison\n\nRÉSULTAT COMBINÉ : diversité quasi infinie des gamètes → clé de la variabilité génétique' },
            { id:'F-M1', type:'formule', nom:'Nombre de combinaisons gamétiques',
              enonce:'Brassage interchromosomique uniquement :\nNombre de types de gamètes = 2ⁿ\nn = nombre de paires de chromosomes\n\nChez l\'Homme : 2²³ = 8 388 608 types de gamètes\n\nFréquence de recombinaison :\nfr = (nombre de gamètes recombinants / nombre total de gamètes) × 100\n\nDistance génétique en cM :\n1 cM ↔ fr = 1%\nEx : fr = 20% → gènes A et B distants de 20 cM sur le même chromosome' },
          ],
          exercices:[
            { id:'EX-M1', niveau:'Facile', titre:'Types de gamètes',
              enonce:'Un organisme a 3 paires de chromosomes (2n = 6). Combien de types de gamètes différents peut-il produire par brassage interchromosomique seul ?',
              correction:'Formule : 2ⁿ où n = nombre de paires de chromosomes\n2³ = 8 types de gamètes différents\n\nLes gamètes peuvent être :\n(A ou a) × (B ou b) × (C ou c) = 8 combinaisons possibles\nABC · ABc · AbC · Abc · aBC · aBc · abC · abc' },
            { id:'EX-M2', niveau:'Intermédiaire', titre:'Fréquence de recombinaison',
              enonce:'On croise AaBb × aabb (test-cross). On obtient 400 descendants :\n• Ab : 120 · aB : 120 → parentaux\n• AB : 80 · ab : 80 → recombinants\nCalculer la fréquence de recombinaison et la distance génétique.',
              correction:'Total de descendants : 400\nGamètes parentaux (Ab et aB) : 120 + 120 = 240\nGamètes recombinants (AB et ab) : 80 + 80 = 160\n\nfr = (gamètes recombinants / total) × 100\nfr = (160 / 400) × 100 = 40%\n\nDistance génétique = 40 cM\n→ Les gènes A et B sont liés sur le même chromosome, distants de 40 cM.' },
            { id:'EX-M3', niveau:'Difficile', titre:'Trisomie 21 et non-disjonction',
              enonce:'La trisomie 21 résulte d\'une non-disjonction lors de la méiose. Expliquer le mécanisme et calculer la probabilité qu\'un enfant issu d\'un parent porteur de trisomie 21 (caryotype : 46+1 = 47) soit lui aussi trisomique.',
              correction:'MÉCANISME de la non-disjonction :\nNormalement en Anaphase I (ou II) : les deux chromosomes 21 homologues se séparent.\nLors d\'une non-disjonction : les 2 chromosomes 21 migrent ensemble vers le même pôle.\n→ Un gamète reçoit 2 chromosomes 21 (n+1 = 24)\n→ L\'autre gamète ne reçoit pas de chromosome 21 (n-1 = 22)\n\nFécondation d\'un gamète n+1 = 24 (2 chr 21) avec un gamète normal n = 23 (1 chr 21) :\n→ Zygote 2n+1 = 47 (3 chr 21) → Trisomie 21\n\nPROBABILITÉ :\nUn parent trisomique 21 produit 2 types de gamètes lors de la méiose :\n• Gamète avec 1 chr 21 (normal) : 50%\n• Gamète avec 2 chr 21 (anomalie) : 50%\n\nSi l\'autre parent est normal (23 chromosomes) :\n→ 50% des enfants auront 46 chromosomes (normal)\n→ 50% auront 47 chromosomes (trisomie 21)\nRisque de trisomie 21 = 50% à chaque grossesse.' },
          ],
        },
      ],
    },
    {
      id:'sc-fecondation', titre:'1.2 Fécondation & diversité génétique',
      notions:['Fécondation aléatoire','Diversité des génotypes','Anomalies de la méiose','Trisomie 21'],
      blocs:[
        {
          notion:'🎲 Fécondation et diversité des génotypes',
          theoremes:[
            { id:'P-F1', type:'prop', nom:'Diversité génétique — bilan chiffré',
              enonce:'SOURCES DE DIVERSITÉ GÉNÉTIQUE :\n\n1. Brassage interchromosomique : 2²³ ≈ 8,4 millions de gamètes différents\n2. Crossing-over : multiplié encore davantage\n3. Fécondation aléatoire : 8,4 millions × 8,4 millions ≈ 70 billions de génotypes possibles\n\nRésultat : aucun humain ne peut avoir le même génotype qu\'un autre (sauf jumeaux monozygotes issus d\'un même zygote).\n\nCONSÉQUENCE ÉVOLUTIVE :\n→ La reproduction sexuée génère une variabilité génétique immense\n→ La sélection naturelle peut agir sur cette diversité\n→ C\'est un avantage sélectif majeur face aux pathogènes et aux changements environnementaux\n→ Les espèces asexuées (clones) sont moins adaptables' },
          ],
          exercices:[
            { id:'EX-F1', niveau:'Intermédiaire', titre:'Gamètes parentaux vs recombinants',
              enonce:'Une femme est hétérozygote pour deux gènes liés : AB/ab (A et B sur le même chromosome). Quels sont les 4 types de gamètes possibles ? Lesquels sont parentaux ? Lesquels sont recombinants ?',
              correction:'Les deux gènes sont liés (sur le même chromosome).\nSans crossing-over : la femme produit uniquement 2 types de gamètes parentaux :\n→ AB (chromosome maternel intact)\n→ ab (chromosome paternel intact)\n\nAvec crossing-over (recombinaison) : 2 types supplémentaires de gamètes recombinants :\n→ Ab (chromosome recombinant)\n→ aB (chromosome recombinant)\n\nGAMÈTES PARENTAUX : AB et ab → reflètent l\'association parentale\nGAMÈTES RECOMBINANTS : Ab et aB → nouvelles associations créées par crossing-over\n\nLa fréquence de recombinaison indique la proportion de gamètes recombinants.' },
          ],
        },
      ],
    },
  ],
},

// ═══════════════════════════════════════════════════════════════════════
// CH.2 — COMPLEXIFICATION DES GÉNOMES
// ═══════════════════════════════════════════════════════════════════════
'complexification-genomes-terminale': {
  id:'complexification-genomes-terminale', emoji:'🔄', badge:'Génétique & Évolution', color:'#16a34a',
  titre:'La complexification des génomes',
  desc:'Au-delà de la reproduction sexuée, d\'autres mécanismes font évoluer les génomes : transferts horizontaux entre bactéries, endosymbiose, duplications de gènes.',
  souschapitres:[
    {
      id:'sc-transferts', titre:'2.1 Transferts horizontaux & endosymbiose',
      notions:['Transfert horizontal','Conjugaison bactérienne','Transformation','Transduction','Plasmide','Endosymbiose','Origine mitochondries','Origine chloroplastes'],
      blocs:[
        {
          notion:'🔀 Transferts horizontaux de gènes (THG)',
          theoremes:[
            { id:'D-THG1', type:'def', nom:'Transferts horizontaux vs verticaux',
              enonce:'TRANSFERT VERTICAL (classique) :\n→ Transmission des gènes de parent à descendant (reproduction)\n→ Préserve le génotype parental\n\nTRANSFERT HORIZONTAL (THG) :\n→ Transfert de gènes entre organismes sans lien de parenté directe\n→ Surtout chez les bactéries, mais aussi champignons et plantes\n\n3 mécanismes chez les bactéries :\n\n1. CONJUGAISON :\n→ Contact direct entre 2 bactéries via pilus sexuel\n→ Transfert d\'un plasmide (ADN circulaire extrachromosomique)\n→ Ex : gènes de résistance aux antibiotiques (R-plasmide)\n\n2. TRANSFORMATION :\n→ Bactérie compétente absorbe de l\'ADN libre dans le milieu\n→ Expérience de Griffith (1928) : bactérie non virulente → virulente\n\n3. TRANSDUCTION :\n→ Bactériophage (virus) transfère des gènes d\'une bactérie à une autre\n→ ADN bactérien empaqueté dans le phage par erreur → transféré à la bactérie suivante' },
            { id:'D-ENDO1', type:'def', nom:'Endosymbiose — origine des organites',
              enonce:'La THÉORIE DE L\'ENDOSYMBIOSE (Lynn Margulis, 1967) explique l\'origine des organites eucaryotes.\n\nHYPOTHÈSE : il y a ~2 milliards d\'années, une cellule hôte primitive a ingéré (sans les digérer) des bactéries, devenant une relation symbiotique.\n\nMITOCHONDRIES ← bactéries α-protéobactéries (ancêtres des Rickettsia)\nPREUVES :\n• Membrane double (la membrane interne = ancienne membrane bactérienne)\n• ADN circulaire propre (comme les bactéries)\n• Ribosomes de type 70S (bactérien, pas 80S eucaryote)\n• Se divisent par scission binaire (comme les bactéries)\n• Taille ~1 µm (comme une bactérie)\n\nCHLOROPLASTES ← cyanobactéries (bactéries photosynthétiques)\nMÊMES PREUVES + thylakoïdes (mêmes que chez Cyanobactéries)\n\nConséquence : les eucaryotes ont acquis des gènes bactériens par THG → complexification du génome' },
          ],
          exercices:[
            { id:'EX-THG1', niveau:'Intermédiaire', titre:'Résistance aux antibiotiques',
              enonce:'Dans un hôpital, une souche de Staphylococcus aureus résistante à la méticilline (SARM) se répand rapidement. Comment ce gène de résistance peut-il se propager à d\'autres bactéries sans reproduction classique ?',
              correction:'La résistance à la méticilline est codée par le gène mecA, souvent porté par un plasmide ou une cassette génomique mobile.\n\nMécanismes de propagation SANS reproduction :\n\n1. CONJUGAISON : si le gène mecA est sur un plasmide conjugatif → transfert direct à d\'autres bactéries (même non SARM) via pilus → nouvelle bactérie devient résistante\n\n2. TRANSFORMATION : des SARM mortes libèrent leur ADN dans le milieu → d\'autres bactéries compétentes absorbent le fragment mecA → intégration dans leur génome\n\n3. TRANSDUCTION : bactériophages infectant les SARM peuvent emporter mecA et l\'injecter dans d\'autres bactéries\n\nConséquence : résistance se répand rapidement dans la population bactérienne sans attendre la reproduction → problème majeur de santé publique (SARM → 30 000 morts/an en Europe).' },
          ],
        },
      ],
    },
  ],
},

// ═══════════════════════════════════════════════════════════════════════
// CH.3 — ÉVOLUTION DES GÉNOMES AU SEIN DES POPULATIONS
// ═══════════════════════════════════════════════════════════════════════
'evolution-genomes-populations-terminale': {
  id:'evolution-genomes-populations-terminale', emoji:'📈', badge:'Génétique & Évolution', color:'#4ade80',
  titre:'L\'évolution des génomes au sein des populations',
  desc:'Hardy-Weinberg, sélection naturelle et dérive génétique : les trois forces qui façonnent les fréquences alléliques dans les populations au fil des générations.',
  souschapitres:[
    {
      id:'sc-hardy', titre:'3.1 Équilibre de Hardy-Weinberg',
      notions:['Fréquences alléliques p et q','p + q = 1','p² + 2pq + q² = 1','Panmixie','Équilibre génétique','Applications médicales'],
      blocs:[
        {
          notion:'📊 Loi de Hardy-Weinberg — équilibre des fréquences alléliques',
          theoremes:[
            { id:'F-HW1', type:'formule', nom:'Équilibre de Hardy-Weinberg',
              enonce:'Dans une population en ÉQUILIBRE DE HARDY-WEINBERG :\n\np = fréquence de l\'allèle dominant A\nq = fréquence de l\'allèle récessif a\n\nRELATION 1 : p + q = 1\n\nRELATION 2 (fréquences génotypiques) :\np² + 2pq + q² = 1\n→ p² : fréquence des individus AA (homozygotes dominants)\n→ 2pq : fréquence des individus Aa (hétérozygotes = porteurs sains)\n→ q² : fréquence des individus aa (homozygotes récessifs = malades)\n\nCONDITIONS D\'ÉQUILIBRE (5 conditions) :\n1. Population grande (pas de dérive génétique)\n2. Panmixie (croisements aléatoires)\n3. Pas de mutation\n4. Pas de sélection naturelle\n5. Pas de migration\n→ En réalité rarement atteint → outil théorique de référence' },
            { id:'M-HW1', type:'methode', nom:'Appliquer Hardy-Weinberg',
              enonce:'MÉTHODE en 4 étapes :\n\n1. Identifier la fréquence des malades (génotype aa = q²)\n→ Ex : mucoviscidose : 1/2500 malades → q² = 1/2500\n\n2. Calculer q : q = √(q²) = √(1/2500) = 1/50 = 0,02\n\n3. Calculer p : p = 1 - q = 1 - 0,02 = 0,98\n\n4. Calculer la fréquence des porteurs (hétérozygotes) :\n2pq = 2 × 0,98 × 0,02 = 0,039 ≈ 1/25\n\n→ 1 personne sur 25 est porteur sain de la mucoviscidose en France !' },
          ],
          exercices:[
            { id:'EX-HW1', niveau:'Intermédiaire', titre:'Application Hardy-Weinberg — drépanocytose',
              enonce:'En Afrique subsaharienne, la drépanocytose (aa) touche 4% de la population. Calculer :\na) q (fréquence allèle récessif a)\nb) p (fréquence allèle dominant A)\nc) la fréquence des porteurs sains (Aa)',
              correction:'Fréquence des malades : q² = 4% = 0,04\n\na) q = √0,04 = 0,20 (fréquence allèle a = 20%)\n\nb) p = 1 - q = 1 - 0,20 = 0,80 (fréquence allèle A = 80%)\n\nc) Fréquence porteurs sains (Aa) = 2pq = 2 × 0,80 × 0,20 = 0,32 = 32%\n\nInterprétation : 32% de la population est porteuse saine ! La fréquence élevée de l\'allèle s\'explique par l\'avantage sélectif du porteur sain (Aa) face au paludisme → hétérozygote résistant → sélection naturelle maintient l\'allèle a dans la population.' },
            { id:'EX-HW2', niveau:'Difficile', titre:'Population en déséquilibre HW',
              enonce:'Dans une population, on observe : AA = 81%, Aa = 2%, aa = 17%. Est-elle en équilibre HW ? Quelle force évolutive peut expliquer ce déséquilibre ?',
              correction:'Calculer p et q observés :\np (fréquence A) = fréquence(AA) + ½ × fréquence(Aa) = 0,81 + ½ × 0,02 = 0,82\nq (fréquence a) = fréquence(aa) + ½ × fréquence(Aa) = 0,17 + ½ × 0,02 = 0,18\n\nFréquences attendues par HW :\np² = 0,82² = 0,672 ≠ 0,81 (observé)\n2pq = 2 × 0,82 × 0,18 = 0,295 ≠ 0,02 (observé) ← TRÈS différent !\nq² = 0,18² = 0,032 ≠ 0,17 (observé)\n\nConclusion : la population n\'est PAS en équilibre HW.\n\nLes hétérozygotes (Aa = 2%) sont bien moins nombreux qu\'attendus (29,5%).\nCause possible : sélection CONTRE les hétérozygotes (sélection diversifiante) ou consanguinité (croisements entre individus apparentés → excès d\'homozygotes). Effet fondateur ou goulot d\'étranglement possible également.' },
          ],
        },
      ],
    },
    {
      id:'sc-derive', titre:'3.2 Dérive génétique & sélection naturelle',
      notions:['Dérive génétique','Effet fondateur','Goulot d\'étranglement','Sélection directionnelle','Sélection stabilisatrice','Sélection diversifiante'],
      blocs:[
        {
          notion:'🎲 Dérive génétique — le hasard dans l\'évolution',
          theoremes:[
            { id:'D-DG1', type:'def', nom:'Dérive génétique et ses effets',
              enonce:'La DÉRIVE GÉNÉTIQUE est la variation aléatoire des fréquences alléliques due au hasard de la reproduction dans une PETITE population.\n\nCaractéristiques :\n• Phénomène ALÉATOIRE (pas de direction)\n• D\'autant plus fort que la population est PETITE\n• Peut faire disparaître ou fixer un allèle par hasard\n• Indépendant de la valeur sélective de l\'allèle\n\nDEUX CAS EXTRÊMES :\n\n1. EFFET FONDATEUR :\n→ Petit groupe colonise un nouveau territoire\n→ Diversité génétique réduite à ce sous-échantillon\n→ Ex : Amish de Pennsylvanie : polydactylie très fréquente (1/200 vs 1/1000 000)\n→ Ex : île de Tristan da Cunha : 15 fondateurs → faible diversité actuelle\n\n2. GOULOT D\'ÉTRANGLEMENT :\n→ Catastrophe réduit massivement la population\n→ Perte d\'allèles par hasard\n→ Ex : guépard (Acinonyx jubatus) → quasi extinction il y a 10 000 ans → diversité génétique extrêmement faible → tous presque génétiquement identiques !' },
          ],
          exercices:[
            { id:'EX-DG1', niveau:'Intermédiaire', titre:'Effet fondateur — analyse',
              enonce:'Une île est colonisée par 5 individus fondateurs pris au hasard dans une population continentale où :\n• Allèle M (groupe sanguin M) : fréquence = 60%\n• Allèle N (groupe sanguin N) : fréquence = 40%\nParmi les 5 fondateurs, on trouve 4 individus MM et 1 individu MN. Calculer les fréquences alléliques sur l\'île.',
              correction:'Génotypes des fondateurs : 4 MM + 1 MN\nNombre total d\'allèles = 5 individus × 2 allèles = 10 allèles\n\nAllèles M : (4 × 2) + (1 × 1) = 8 + 1 = 9 allèles M\nAllèles N : (1 × 1) = 1 allèle N\n\nFréquence M sur l\'île = 9/10 = 90%\nFréquence N sur l\'île = 1/10 = 10%\n\nComparaison avec le continent :\nM : 90% (île) vs 60% (continent) → augmentation par hasard\nN : 10% (île) vs 40% (continent) → diminution par hasard\n\nC\'est l\'effet fondateur : les fréquences alléliques de l\'île diffèrent du continent non par sélection mais par hasard de l\'échantillonnage (petit groupe fondateur).' },
          ],
        },
      ],
    },
  ],
},

// ═══════════════════════════════════════════════════════════════════════
// CH.4 — AUTRES MÉCANISMES DE DIVERSITÉ
// ═══════════════════════════════════════════════════════════════════════
'autres-mecanismes-diversite': {
  id:'autres-mecanismes-diversite', emoji:'🌀', badge:'Génétique & Évolution', color:'#84cc16',
  titre:'Autres mécanismes de diversité du vivant',
  desc:'Symbioses, épigénétique, transmission culturelle et spéciation : des mécanismes évolutifs qui complètent et enrichissent la théorie darwinienne classique.',
  souschapitres:[
    {
      id:'sc-symbiose', titre:'4.1 Symbioses & hérédité non-ADN',
      notions:['Symbiose','Mutualisme','Épigénétique','Méthylation ADN','Transmission culturelle','Spéciation','Isolement reproducteur'],
      blocs:[
        {
          notion:'🤝 Symbioses et évolution',
          theoremes:[
            { id:'D-SYM1', type:'def', nom:'Symbioses et coévolution',
              enonce:'La SYMBIOSE est une association étroite et durable entre deux espèces différentes.\n\nTypes selon le bénéfice :\n• Mutualisme (+/+) : les deux espèces bénéficient\n  Ex : mycorhizes (champignon + racines) → plante absorbe + eau/minéraux, champignon reçoit sucres\n  Ex : lichen (champignon + algue)\n\n• Commensalisme (+/0) : l\'un bénéficie, l\'autre indifférent\n  Ex : rémora sur requin\n\n• Parasitisme (+/-) : l\'un bénéficie, l\'autre est lésé\n  Ex : Plasmodium/paludisme · tænia\n\nCOÉVOLUTION :\n→ Les deux espèces exercent des pressions de sélection réciproques\n→ Ex : fleurs et pollinisateurs (orchidée de Darwin + hawkmoth à longue trompe)\n→ La coévolution peut créer des spécialisations morphologiques extrêmes' },
            { id:'D-EPI1', type:'def', nom:'Épigénétique — hérédité sans modifier l\'ADN',
              enonce:'L\'ÉPIGÉNÉTIQUE étudie les modifications d\'expression des gènes SANS modification de la séquence ADN, qui peuvent être transmises aux cellules filles (voire à la descendance).\n\nMÉCANISMES :\n1. Méthylation de l\'ADN : ajout de groupes CH₃ sur les cytosines → répression du gène\n2. Modification des histones : acétylation (activation) / déacétylation (répression)\n\nEXEMPLES :\n• Abeille : ouvrière vs reine → même génotype, différences dues à la gelée royale (méthylation)\n• Cancer : hypométhylation des oncogènes → surexpression → prolifération\n• Stress parental : traces épigénétiques transmissibles à la génération suivante (débattu)\n• Imprinting génomique : gène Igf2 exprimé uniquement si copie paternelle\n\nIMPORTANCE : explique comment l\'environnement peut influencer l\'expression des gènes sans muter l\'ADN → lien génotype-phénotype plus complexe que prévu' },
          ],
          exercices:[
            { id:'EX-SYM1', niveau:'Intermédiaire', titre:'Mycorhizes et fertilité',
              enonce:'Des plants de pin sont cultivés dans un sol stérile : la moitié avec des champignons mycorhiziens, l\'autre sans. Après 6 mois, les plants avec mycorhizes pèsent 3× plus. Expliquer le mécanisme de cette symbiose.',
              correction:'Les MYCORHIZES sont une association symbiotique entre les racines d\'une plante (ici pin) et des champignons (ex : Suillus, Paxillus).\n\nMécanisme du bénéfice mutuel :\n\nLe CHAMPIGNON apporte à la plante :\n→ Augmente considérablement la surface d\'absorption racinaire (hyphes = réseau filamenteux très fin)\n→ Absorbe l\'eau (avantage en sol sec)\n→ Absorbe les ions minéraux : surtout phosphore (P) et azote (N), peu mobiles dans le sol\n→ Protège contre certains pathogènes racinaires\n\nLa PLANTE apporte au champignon :\n→ Sucres produits par photosynthèse (glucose) → source de carbone pour le champignon hétérotrophe\n\nRésultat : × 3 de masse → nutrition améliorée grâce aux mycorhizes → plantes plus développées dans les sols pauvres.\nNote : 90% des plantes terrestres forment des mycorhizes → essentiel pour les forêts.' },
          ],
        },
      ],
    },
  ],
},

// ═══════════════════════════════════════════════════════════════════════
// CH.5 — LE TEMPS ET LES ROCHES
// ═══════════════════════════════════════════════════════════════════════
'temps-roches-terminale': {
  id:'temps-roches-terminale', emoji:'⏳', badge:'Passé géologique', color:'#f97316',
  titre:'Le temps et les roches',
  desc:'Comment dater la Terre et son histoire géologique ? Ce chapitre explore les méthodes de datation absolue (radioactivité) et relative (fossiles, stratigraphie).',
  souschapitres:[
    {
      id:'sc-datation', titre:'5.1 Méthodes de datation',
      notions:['Désintégration radioactive','Demi-vie t½','¹⁴C','⁴⁰K','²³⁸U','Fossiles stratigraphiques','Principe de superposition','Ère géologique'],
      blocs:[
        {
          notion:'⚛️ Datation absolue par radioactivité',
          theoremes:[
            { id:'D-DAT1', type:'def', nom:'Désintégration radioactive et demi-vie',
              enonce:'Les ISOTOPES RADIOACTIFS se désintègrent spontanément en isotopes stables à une vitesse constante.\n\nLoi de désintégration :\nN(t) = N₀ × (1/2)^(t/t½)\n\nN₀ : nombre initial d\'atomes radioactifs\nN(t) : nombre restant après temps t\nt½ : demi-vie (temps pour diviser par 2 le nombre d\'atomes)\n\nPRINCIPAUX ISOTOPES UTILISÉS EN GÉOLOGIE :\n\n• ¹⁴C → ¹⁴N : t½ = 5730 ans → datation matières organiques récentes (0–50 000 ans)\n  (bois, charbon, os, textile, papyrus)\n\n• ⁴⁰K → ⁴⁰Ar : t½ = 1,25 milliards d\'années → roches volcaniques (100 000 → 4 milliards ans)\n\n• ²³⁸U → ²⁰⁶Pb : t½ = 4,47 milliards d\'années → roches très anciennes\n\n• ⁸⁷Rb → ⁸⁷Sr : t½ = 49 milliards d\'années' },
            { id:'F-DAT1', type:'formule', nom:'Calcul de l\'âge par radioactivité',
              enonce:'Formule de datation :\nN(t) = N₀ × (1/2)^(t/t½)\n\nOu sous forme logarithmique :\nt = t½ × log₂(N₀/N(t)) = t½ × [ln(N₀/N) / ln(2)]\n\nExemple ¹⁴C :\nN₀ = 100% · N actuel = 25%\nt = 5730 × log₂(100/25) = 5730 × log₂(4) = 5730 × 2 = 11 460 ans\n\nOu plus simplement :\n100 → 50 (1 demi-vie) → 25 (2 demi-vies)\n→ 25% correspond à 2 × 5730 = 11 460 ans' },
          ],
          exercices:[
            { id:'EX-DAT1', niveau:'Facile', titre:'Datation au ¹⁴C',
              enonce:'Un os préhistorique contient 12,5% de ¹⁴C par rapport à un os actuel (100%). La demi-vie du ¹⁴C est de 5730 ans. Calculer l\'âge de l\'os.',
              correction:'On part de 100% et on cherche combien de demi-vies pour atteindre 12,5% :\n100% → 50% (1 demi-vie)\n50% → 25% (2 demi-vies)\n25% → 12,5% (3 demi-vies)\n\n→ 3 demi-vies se sont écoulées\nÂge = 3 × 5730 = 17 190 ans\n\nL\'os a environ 17 190 ans (Paléolithique supérieur).' },
            { id:'EX-DAT2', niveau:'Difficile', titre:'Calcul avec la formule',
              enonce:'Une roche volcanique contient 30% de ⁴⁰K par rapport à sa composition initiale (100%). La demi-vie du ⁴⁰K est de 1,25 × 10⁹ ans. Calculer l\'âge de cette roche.',
              correction:'N(t)/N₀ = 30/100 = 0,30\n\nFormule : t = t½ × [ln(N₀/N) / ln(2)]\nt = 1,25 × 10⁹ × [ln(100/30) / ln(2)]\nt = 1,25 × 10⁹ × [ln(3,333) / 0,693]\nt = 1,25 × 10⁹ × [1,204 / 0,693]\nt = 1,25 × 10⁹ × 1,737\nt ≈ 2,17 × 10⁹ ans ≈ 2,2 milliards d\'années\n\nCette roche date de l\'Archéen (ère la plus ancienne).' },
          ],
        },
        {
          notion:'🦕 Datation relative et fossiles stratigraphiques',
          theoremes:[
            { id:'D-DAT2', type:'def', nom:'Principes de datation relative',
              enonce:'DATATION RELATIVE : établit l\'ordre chronologique des événements SANS donner d\'âge absolu.\n\n3 PRINCIPES FONDAMENTAUX :\n\n1. SUPERPOSITION :\n→ Dans une série sédimentaire non perturbée, les couches les plus récentes sont au sommet\n→ Sauf si tectonique a retourné les couches (vérifier)\n\n2. RECOUPEMENT :\n→ Tout élément géologique est plus jeune que ce qu\'il recoupe\n→ Ex : un filon de granite recoupant des schistes → granite plus jeune\n\n3. HORIZONTALITÉ INITIALE :\n→ Les sédiments se déposent horizontalement\n→ Si couches inclinées → déformation tectonique postérieure\n\nFOSSILES STRATIGRAPHIQUES :\n→ Fossiles d\'espèces à large répartition géographique, durée courte (< 1 Ma), abondants\n→ Servent de marqueurs chronologiques (repères de temps)\n→ Ex : ammonites (Secondaire), nummulites (Éocène), trilobites (Primaire)\n\nBIOZONES : intervalles stratigraphiques définis par la présence d\'un fossile stratigraphique' },
          ],
          exercices:[
            { id:'EX-DAT3', niveau:'Facile', titre:'Datation relative d\'une coupe',
              enonce:'Une coupe géologique montre de bas en haut : calcaire (contient ammonites) / granite / grès / basalte. Le basalte recoupe le grès. Classer ces roches de la plus ancienne à la plus récente.',
              correction:'Application des principes :\n\n1. Superposition : calcaire (bas) → granite → grès (en haut = plus récent que calcaire)\nMais attention : le granite recoupeait-il le calcaire ? On suppose que le granite est intrusif.\n\n2. Recoupement : le basalte recoupe le grès → basalte plus jeune que le grès\n\nOrdre du plus ancien au plus récent :\n1. Calcaire (le plus ancien — en bas, contient des fossiles d\'ammonites)\n2. Granite (intrusion dans le calcaire avant le dépôt du grès)\n3. Grès (au-dessus du granite → déposé après)\n4. Basalte (recoupe le grès → le plus récent)\n\nLes ammonites dans le calcaire permettent une datation relative (Mésozoïque).' },
          ],
        },
      ],
    },
  ],
},

// ═══════════════════════════════════════════════════════════════════════
// CH.6 — TRACES DU PASSÉ DE LA TERRE
// ═══════════════════════════════════════════════════════════════════════
'traces-passe-terre-terminale': {
  id:'traces-passe-terre-terminale', emoji:'🏔️', badge:'Passé géologique', color:'#ea580c',
  titre:'Les traces du passé mouvementé de la Terre',
  desc:'Les chaînes de montagnes, les ophiolites et la paléogéographie témoignent d\'une Terre en perpétuel mouvement. Ce chapitre reconstitue l\'histoire tectonique de notre planète.',
  souschapitres:[
    {
      id:'sc-montagnes', titre:'6.1 Convergence & Formation des montagnes',
      notions:['Subduction','Magmatisme d\'arc','Ophiolites','Collision continentale','Alpes','Himalaya','Paléogéographie','Pangée'],
      blocs:[
        {
          notion:'⛰️ Formation des chaînes de montagnes',
          theoremes:[
            { id:'D-MON1', type:'def', nom:'Deux types de convergence — subduction et collision',
              enonce:'CONVERGENCE — SUBDUCTION :\n→ Plaque océanique (dense, ~3,0) plonge sous plaque continentale (légère, ~2,7)\n→ Ophiolites : lambeaux de croûte océanique coincés dans les montagnes → preuve de paléo-océan\n→ Magmatisme d\'arc (volcanisme explosif) : roche partiellement fondue remonte\n→ Exemples actuels : Andes (subduction Nazca), Japon, Cascades\n\nCONVERGENCE — COLLISION :\n→ Après fermeture de l\'océan, les deux croûtes continentales entrent en collision\n→ Aucune ne peut subducter (trop légères)\n→ Compression → épaississement crustal → chaîne de montagnes\n→ HIMALAYA : collision Inde-Eurasie commencée il y a ~50 Ma\n  → Plaque indienne remonte vers nord à ~5 cm/an\n  → Everest : 8849 m → toujours en soulèvement\n→ ALPES : collision Afrique (microplaques)-Eurasie commencée il y a ~35 Ma\n  → Ophiolites du Chenaillet → témoins de l\'océan Téthys\n  → Mont Blanc : 4808 m' },
            { id:'P-MON1', type:'prop', nom:'Reconstitution paléogéographique',
              enonce:'La PALÉOGÉOGRAPHIE reconstitue la position des continents dans le passé.\n\nPREUVES DU DÉPLACEMENT :\n1. Anomalies magnétiques symétriques (expansion dorsale, Hess 1960)\n2. Fossiles identiques sur continents séparés (ex : Glossopteris en Amérique du Sud, Afrique, Inde, Antarctique)\n3. Traces glaciaires dans des régions tropicales (ex : stries glaciaires en Afrique)\n4. Similitudes géologiques entre côtes opposées (ex : Appalaches → Calédoniennes)\n5. Ophiolites → paléo-océans reconstitués\n\nCHRONOLOGIE :\n• ~300 Ma : PANGÉE (supercontinent unique — Wegener 1912)\n• ~180 Ma : Début de fragmentation (Gondwana et Laurasie)\n• ~65 Ma : Séparation Amérique du Sud / Afrique complète\n• Aujourd\'hui : configuration actuelle\n• ~250 Ma (futur) : reconstitution possible d\'un nouveau supercontinent' },
          ],
          exercices:[
            { id:'EX-MON1', niveau:'Difficile', titre:'Ophiolites et paléo-océan',
              enonce:'Dans les Alpes (ex : massif du Chenaillet, Haute-Alpes), on trouve des roches appartenant à la séquence ophiolitique : basaltes en coussin (pillow-lavas), gabbros, péridotites. Comment ces roches oceániques se retrouvent-elles dans une chaîne de montagne ? Quelle histoire géologique reconstituez-vous ?',
              correction:'Les OPHIOLITES sont des fragments de croûte océanique et de manteau supérieur inclus dans une chaîne de montagne suite à une obduction.\n\nSÉQUENCE OPHIOLITIQUE (de haut en bas) :\n→ Basaltes en coussin (pillow-lavas) : refroidissement rapide de lave sous l\'eau\n→ Complexe filonien (sheeted dykes)\n→ Gabbros (intrusion lente en profondeur)\n→ Péridotites (manteau supérieur lithosphérique)\n\nHISTOIRE RECONSTITUÉE :\n1. Il y a ~180-170 Ma : océan Téthys alpin sépare la microplaque adriatique de l\'Europe\n2. Dorsale centrale → production de croûte océanique → basaltes en coussin + gabbros + péridotites\n3. La plaque océanique tethysienne subducte sous la microplaque adriatique\n4. Lors de la collision finale (Afrique-Eurasie, ~35 Ma), des lambeaux de croûte océanique sont "coincés" entre les deux croûtes continentales → obduction\n5. Ces ophiolites se retrouvent maintenant en altitude dans les Alpes\n→ Le Chenaillet est un témoin de l\'océan Téthys, qui n\'existe plus !' },
          ],
        },
      ],
    },
  ],
},

// ═══════════════════════════════════════════════════════════════════════
// CH.7 — ORGANISATION DES PLANTES À FLEURS
// ═══════════════════════════════════════════════════════════════════════
'plantes-organisation-terminale': {
  id:'plantes-organisation-terminale', emoji:'🌸', badge:'Plantes & Climat', color:'#10b981',
  titre:'Organisation fonctionnelle des plantes à fleurs',
  desc:'Les plantes ont développé des structures sophistiquées pour absorber l\'eau, les minéraux et la lumière. Ce chapitre explore l\'organisation végétale et les échanges avec le milieu.',
  souschapitres:[
    {
      id:'sc-structures-veg', titre:'7.1 Structures végétales & circulation',
      notions:['Racines','Poils absorbants','Tiges','Stomates','Xylème','Phloème','Transpiration','Mycorhizes','Auxine','Gravitropisme'],
      blocs:[
        {
          notion:'🌱 Structures et fonctions des organes végétaux',
          theoremes:[
            { id:'D-PL1', type:'def', nom:'Organisation générale des plantes à fleurs',
              enonce:'RACINES :\n• Ancrage dans le sol\n• Poils absorbants : augmentent la surface d\'absorption × 1000\n• Absorption eau + ions minéraux par OSMOSE et transport actif\n• Zone méristématique (croissance), zone d\'élongation, zone de différenciation\n• MYCORHIZES : champignons associés aux racines → +50% absorption phosphore\n\nTIGES :\n• Soutien et transport\n• XYLÈME : tissu conducteur de la sève brute (eau + ions minéraux) montante\n  → Éléments de vaisseaux morts (lignine) → conduit passif\n  → Force motrice : transpiration (cohésion-tension) + pression racinaire\n• PHLOÈME : tissu conducteur de la sève élaborée (sucres) descendante\n  → Cellules vivantes (tubes criblés + cellules compagnes)\n  → Force motrice : gradient de pression osmotique (source → puits)\n\nFEUILLES :\n• Limbe : surface d\'échange maximale pour lumière + CO₂\n• Nervures : vaisseaux (xylème + phloème)\n• STOMATES : pores d\'échanges gazeux (CO₂ entrant, O₂ + vapeur eau sortants)\n  → Ouverture contrôlée par les cellules de garde (turgescence / plasmolyse)' },
            { id:'D-PL2', type:'def', nom:'Transpiration et cohésion-tension',
              enonce:'La TRANSPIRATION est l\'évaporation de l\'eau par les stomates → moteur principal de la montée de la sève brute.\n\nMÉCANISME COHÉSION-TENSION (Dixon & Joly, 1894) :\n1. Transpiration foliaire : évaporation d\'eau dans les espaces intercellulaires → sortie par stomates\n2. Pression négative : crée une tension dans le xylème (dépression)\n3. Cohésion de l\'eau : molécules d\'eau liées par liaisons hydrogène → colonne d\'eau continue\n4. Aspiration : la tension tire la colonne d\'eau vers le haut\n5. Absorption racinaire : eau absorbée par les poils absorbants compense\n\nValeurs :\n• Un chêne peut transporter 100-200 L d\'eau par jour\n• Pression négative dans le xylème : jusqu\'à -30 bars\n• Vitesse de montée : 30-50 cm/min dans les herbacées\n\nROLE DE L\'AUXINE (phytohormone) :\n→ Phototropisme : plus de lumière d\'un côté → IAA (indole-3-acétique acid) migre du côté ombragé → élongation cellulaire → courbure vers la lumière\n→ Gravitropisme : racine positive (croît vers le bas) ; tige négative (croît vers le haut)' },
          ],
          exercices:[
            { id:'EX-PL1', niveau:'Intermédiaire', titre:'Transpiration et sécheresse',
              enonce:'Par temps chaud et sec, une plante ferme ses stomates. Quelles sont les conséquences sur a) la transpiration, b) la montée de la sève brute, c) la photosynthèse ?',
              correction:'La fermeture des stomates est une réponse adaptative à la sécheresse (déclenchée par l\'ABA, acide abscissique).\n\na) TRANSPIRATION :\n→ Les stomates fermés empêchent l\'évaporation d\'eau par les feuilles\n→ Transpiration fortement réduite → économie d\'eau\n\nb) MONTÉE DE LA SÈVE BRUTE :\n→ La transpiration est le moteur de la cohésion-tension\n→ Transpiration réduite → tension diminuée → montée de sève RALENTIE\n→ Absorption d\'eau et minéraux par les racines ralentie aussi\n\nc) PHOTOSYNTHÈSE :\n→ Le CO₂ atmosphérique entre par les stomates\n→ Stomates fermés → entrée de CO₂ BLOQUÉE\n→ Photosynthèse fortement réduite (manque de substrat CO₂)\n→ Risque de carence en assimilats → croissance ralentie\n\nConclusion : la fermeture des stomates est un compromis : économise l\'eau mais réduit la photosynthèse → coût de la sécheresse pour la plante.' },
          ],
        },
      ],
    },
  ],
},

// ═══════════════════════════════════════════════════════════════════════
// CH.8 — PHOTOSYNTHÈSE & BIOMASSE
// ═══════════════════════════════════════════════════════════════════════
'photosynthese-biomasse-terminale': {
  id:'photosynthese-biomasse-terminale', emoji:'☀️', badge:'Plantes & Climat', color:'#059669',
  titre:'La plante productrice de matière organique',
  desc:'La photosynthèse est le processus fondamental qui convertit l\'énergie solaire en matière organique. Ce chapitre détaille les deux phases (lumineuse et obscure) et les facteurs qui l\'influencent.',
  souschapitres:[
    {
      id:'sc-photo-phases', titre:'8.1 Les deux phases de la photosynthèse',
      notions:['Phase lumineuse','Photolyse de l\'eau','Thylakoïdes','ATP','NADPH','Cycle de Calvin','RuBisCO','Stroma','Facteurs limitants'],
      blocs:[
        {
          notion:'☀️ Phase lumineuse — capter l\'énergie',
          theoremes:[
            { id:'D-PH1', type:'def', nom:'Phase lumineuse dans les thylakoïdes',
              enonce:'La PHASE LUMINEUSE se déroule dans les THYLAKOÏDES du chloroplaste.\n\nÉtapes clés :\n1. ABSORPTION LUMINEUSE :\n→ Chlorophylle a et b absorbent la lumière rouge (680-700 nm) et bleue (430-450 nm)\n→ Excitation des électrons de la chlorophylle\n\n2. PHOTOLYSE DE L\'EAU :\n2H₂O → 4H⁺ + 4e⁻ + O₂\n→ L\'O₂ libéré est un DÉCHET de la photosynthèse (pas un produit utile !)\n→ Source des électrons pour la chaîne photosynthétique\n\n3. PRODUCTION D\'ATP (photophosphorylation) :\n→ Flux d\'électrons dans la chaîne de transport → gradient de H⁺ → ATP synthase → ATP\n\n4. PRODUCTION DE NADPH :\n→ NADP⁺ + H⁺ + 2e⁻ → NADPH (pouvoir réducteur pour le Calvin)\n\nBILAN phase lumineuse :\nÉnergie lumineuse + H₂O → ATP + NADPH + O₂' },
            { id:'D-PH2', type:'def', nom:'Cycle de Calvin — phase obscure dans le stroma',
              enonce:'Le CYCLE DE CALVIN se déroule dans le STROMA du chloroplaste (ne nécessite PAS de lumière directe, mais utilise ATP et NADPH de la phase lumineuse).\n\nÉtapes :\n1. FIXATION du CO₂ :\nRuBP (5C) + CO₂ → 2 × PGA (3C) catalysé par RuBisCO\n(RuBisCO = enzyme la plus abondante au monde !)\n\n2. RÉDUCTION du PGA :\nPGA + ATP + NADPH → G3P (glycéraldéhyde-3-phosphate)\n\n3. RÉGÉNÉRATION du RuBP :\nG3P + ATP → RuBP (5C) → peut fixer un nouveau CO₂\n\nPRODUCTION de glucose :\n6 tours du cycle → 1 molécule de glucose (C₆H₁₂O₆)\n\nÉQUATION BILAN PHOTOSYNTHÈSE :\n6CO₂ + 6H₂O + lumière → C₆H₁₂O₆ + 6O₂' },
            { id:'F-PH1', type:'formule', nom:'Équation bilan de la photosynthèse',
              enonce:'6 CO₂  +  6 H₂O  +  lumière  →  C₆H₁₂O₆  +  6 O₂\n\nBilan énergétique :\n→ 1 mole de glucose = 2870 kJ d\'énergie stockée\n→ Efficacité photosynthétique ≈ 6-8% en conditions optimales (plantes C3)\n\nFACTEURS LIMITANTS (loi de Liebig) :\n→ Le facteur en plus faible concentration limite la photosynthèse\n• Lumière : photocompensation, photosaturation\n• CO₂ : augmentation → augmentation photosynthèse (jusqu\'à saturation)\n• Température : optimum enzymatique (RuBisCO) ≈ 25-35°C\n• Eau : sécheresse → fermeture stomates → manque CO₂' },
          ],
          exercices:[
            { id:'EX-PH1', niveau:'Intermédiaire', titre:'Facteur limitant',
              enonce:'On mesure la photosynthèse nette d\'une plante à différentes intensités lumineuses, à deux concentrations de CO₂ (400 ppm et 800 ppm). À faible lumière, les deux courbes sont identiques. À forte lumière, la courbe à 800 ppm est au-dessus. Interpréter.',
              correction:'À FAIBLE LUMIÈRE :\n→ Les deux courbes sont identiques\n→ La lumière est le facteur limitant : même si le CO₂ est plus concentré, la plante ne peut pas en profiter car l\'énergie lumineuse manque\n→ La phase lumineuse est le goulot d\'étranglement\n\nÀ FORTE LUMIÈRE :\n→ La courbe à 800 ppm CO₂ est supérieure\n→ La lumière n\'est plus limitante (saturation lumineuse atteinte)\n→ C\'est maintenant le CO₂ qui devient limitant à 400 ppm\n→ Avec 800 ppm de CO₂, RuBisCO a plus de substrat → cycle de Calvin plus actif → plus de glucose produit\n\nApplication : l\'enrichissement des serres en CO₂ augmente les rendements car la lumière artificielle est forte et le CO₂ atmosphérique devient limitant.' },
          ],
        },
      ],
    },
  ],
},

// ═══════════════════════════════════════════════════════════════════════
// CH.9 — REPRODUCTION DES PLANTES & DOMESTICATION
// ═══════════════════════════════════════════════════════════════════════
'reproduction-plantes-terminale': {
  id:'reproduction-plantes-terminale', emoji:'🌾', badge:'Plantes & Climat', color:'#34d399',
  titre:'Reproduction de la plante & domestication',
  desc:'Les plantes se reproduisent de façon sexuée (pollinisation, fécondation) ou asexuée (clonage). L\'homme a profondément modifié ces mécanismes par la domestication et l\'amélioration variétale.',
  souschapitres:[
    {
      id:'sc-repro-veg', titre:'9.1 Reproduction sexuée & asexuée',
      notions:['Fleur','Pollinisation','Double fécondation','Dissémination','Clonage végétatif','Totipotence','Domestication','OGM'],
      blocs:[
        {
          notion:'🌺 Reproduction sexuée des plantes à fleurs',
          theoremes:[
            { id:'D-REP1', type:'def', nom:'Pollinisation et double fécondation',
              enonce:'STRUCTURE DE LA FLEUR :\n• Pistil (= gynécée) : stigmate + style + ovaire (contient ovules)\n• Étamines : filet + anthère (produit le pollen)\n• Sépales + pétales : protection et attraction des pollinisateurs\n\nPOLLINISATION :\n→ Transport du pollen de l\'anthère au stigmate\n• Anémophile : par le vent (ex : graminées, chênes, noisetiers) → pollen léger, abondant\n• Entomophile : par les insectes (ex : abeilles) → pollen collant, fleur colorée/parfumée\n• Hydrophile : par l\'eau (rares aquatiques)\n\nDOUBLE FÉCONDATION (spécificité des Angiospermes) :\n→ 2 noyaux du grain de pollen fécondent :\n1. Oosphère (n) + 1 noyau spermatique (n) → ZYGOTE (2n) → embryon\n2. Noyau central (2n) + 1 noyau spermatique (n) → ALBUMEN (3n) → tissu nourricier\n→ Graine = embryon + albumen + tégument\n→ Fruit = paroi de l\'ovaire transformée' },
            { id:'D-REP2', type:'def', nom:'Reproduction asexuée et totipotence',
              enonce:'La REPRODUCTION ASEXUÉE produit des clones génétiquement identiques au parent.\n\nMécanismes naturels :\n• Stolons : tiges horizontales avec bourgeons (fraisier)\n• Rhizomes : tiges souterraines (iris, bambou)\n• Tubercules : organes de réserve bourgeonnants (pomme de terre)\n• Bulbes : (tulipe, oignon)\n• Marcottage naturel : branche touchant le sol → enracinement\n\nTOTIPOTENCE :\n→ Toute cellule végétale contient l\'information génétique complète\n→ Peut se redifférencier en plante entière si conditions adéquates\n→ Utilisation : culture in vitro (micropropagation)\n→ 1 cellule ou explant + milieu nutritif + hormones (auxine + cytokinine) → plant entier\n→ Applications : conservation variétés rares, production industrielle, OGM\n\nDOMESTICATION :\n→ Sélection artificielle par l\'homme depuis ~10 000 ans\n→ Maïs : ~10 000 ans pour obtenir depuis téosinte (petite graminée mexicaine)\n→ OGM : gène étranger introduit via Agrobacterium tumefaciens' },
          ],
          exercices:[
            { id:'EX-REP1', niveau:'Intermédiaire', titre:'Pollinisateurs et agriculture',
              enonce:'75% des espèces cultivées dans le monde dépendent des pollinisateurs (abeilles, bourdons…). En France, les populations d\'abeilles ont diminué de 30-40% en 20 ans. Quelles pourraient être les conséquences agricoles et économiques ?',
              correction:'CONSÉQUENCES DIRECTES SUR LA PRODUCTION AGRICOLE :\n→ Sans pollinisateurs, pas de pollinisation des fleurs → pas de fruits ni de graines\n→ Cultures touchées : pommes, poires, cerises, fraises, colza, tournesol, amandes, melon, courgette…\n→ Rendements chuteraient de 50-90% pour ces espèces\n→ Seules les cultures anémophiles (blé, maïs, riz) seraient moins touchées\n\nCONSÉQUENCES ÉCONOMIQUES :\n→ Valeur de la pollinisation en France : ~2,5 milliards €/an\n→ Renchérissement des aliments (offre réduite, demande stable)\n→ Certains vergers pourraient nécessiter une pollinisation manuelle (cas en Chine, régions Sichuan)\n\nCAUSES DE DÉCLIN DES ABEILLES :\n→ Pesticides (néonicotinoïdes → désorientation)\n→ Varroa destructor (parasite)\n→ Perte d\'habitats fleuris (monocultures, urbanisation)\n→ Changement climatique (décalage phénologique fleur/pollinisateur)\n\nSOLUTIONS : réduction pesticides, haies fleuries, bandes enherbées, agriculture biologique.' },
          ],
        },
      ],
    },
  ],
},

// ═══════════════════════════════════════════════════════════════════════
// CH.10 — PALÉOCLIMATS
// ═══════════════════════════════════════════════════════════════════════
'paleoclimats-terminale': {
  id:'paleoclimats-terminale', emoji:'🧊', badge:'Plantes & Climat', color:'#0ea5e9',
  titre:'Reconstituer les variations climatiques passées',
  desc:'Les carottes de glace, les sédiments marins et les pollens fossiles sont des archives du climat passé. Ce chapitre explore comment les scientifiques reconstituentt les paléoclimats.',
  souschapitres:[
    {
      id:'sc-archives', titre:'10.1 Archives climatiques & cycles',
      notions:['δ¹⁸O','Carottes de glace','Foraminifères','Milankovitch','Albédo','Circulation thermohaline','Cycle du carbone'],
      blocs:[
        {
          notion:'❄️ Archives climatiques — lire le passé',
          theoremes:[
            { id:'D-PAL1', type:'def', nom:'Les proxies climatiques',
              enonce:'Un PROXY CLIMATIQUE est un paramètre naturel qui enregistre les conditions climatiques passées.\n\nPRINCIPAUX PROXIES :\n\n1. CAROTTES DE GLACE (Vostok, EPICA) :\n• δ¹⁸O (rapport isotopique ¹⁸O/¹⁶O) :\n→ Période froide : ¹⁸O reste dans les océans (plus lourd → moins évaporé)\n→ Glace des pôles s\'appauvrit en ¹⁸O → δ¹⁸O bas = période froide\n• Bulles d\'air : concentration CO₂ et CH₄ directement mesurée\n→ Carotte Vostok : 800 000 ans d\'enregistrement\n\n2. SÉDIMENTS MARINS :\n• Foraminifères planctoniques → coquilles de CaCO₃\n→ δ¹⁸O des coquilles corrélé à la température de l\'eau\n→ Abondance des espèces (froides vs chaudes)\n\n3. FOSSILES VÉGÉTAUX :\n• Pollens fossiles → reconstitution de la végétation → paléoclimats\n• Cernes de croissance des arbres (dendrochronologie)\n\n4. SPÉLÉOTHÈMES :\n• Stalactites/stalagmites → δ¹⁸O + taux de croissance → précipitations et températures' },
            { id:'D-PAL2', type:'def', nom:'Cycles de Milankovitch — causes astronomiques des glaciations',
              enonce:'Les CYCLES DE MILANKOVITCH sont des variations périodiques de l\'orbite et de l\'axe de la Terre qui modulent l\'insolation reçue → déclenchent les glaciations.\n\n3 PARAMÈTRES ORBITAUX :\n\n1. EXCENTRICITÉ (période ~100 000 ans) :\n→ Variation de la forme de l\'orbite terrestre (cercle → ellipse)\n→ Modifie la distance Terre-Soleil en périhélie et aphélie\n\n2. OBLIQUITÉ / Inclinaison de l\'axe (période ~41 000 ans) :\n→ Varie entre 22,1° et 24,5° (actuellement 23,5°)\n→ Plus incliné → contrastes saisonniers plus marqués\n\n3. PRÉCESSION des équinoxes (période ~23 000 ans) :\n→ Oscillation de l\'axe de rotation (comme une toupie)\n→ Modifie la saison où la Terre est au plus près du Soleil\n\nMÉCANISME DES GLACIATIONS :\n→ Été froid dans l\'hémisphère Nord → neige ne fond pas totalement\n→ Albédo augmente (glace réfléchit) → refroidissement supplémentaire (rétroaction positive)\n→ Spirale de refroidissement → glaciation\n\nCes cycles expliquent ~8 glaciations dans les 800 000 dernières années.' },
          ],
          exercices:[
            { id:'EX-PAL1', niveau:'Difficile', titre:'Interpréter un δ¹⁸O',
              enonce:'Une carotte de glace montre : δ¹⁸O = -50‰ entre 20 000 et 18 000 ans BP, puis δ¹⁸O augmente progressivement jusqu\'à -35‰ il y a 10 000 ans. Interpréter ces données.',
              correction:'RAPPEL : δ¹⁸O bas (très négatif) → période FROIDE · δ¹⁸O élevé (moins négatif) → période CHAUDE\n\nInterprétation :\n\n20 000-18 000 ans BP : δ¹⁸O = -50‰ (très bas)\n→ Période très froide → MAXIMUM GLACIAIRE du Dernier Maximum Glaciaire (DMG/LGM)\n→ Les glaces polaires s\'accumulent (eau ¹⁸O reste dans les océans → glace appauvrie en ¹⁸O)\n→ Niveau des mers ~120 m plus bas qu\'aujourd\'hui\n→ Des ponts terrestres existaient (Béring, Manche)\n\n18 000 → 10 000 ans BP : δ¹⁸O augmente progressivement (-50 → -35‰)\n→ DÉGLACIATION : réchauffement progressif\n→ Les glaces fondent → eau ¹⁸O retourne dans l\'océan\n→ La glace qui se forme s\'enrichit progressivement en ¹⁸O\n→ Transition vers l\'HOLOCÈNE (période interglaciaire actuelle, commencée ~11 700 ans)\n\nCe changement correspond à la fin de la dernière glaciation (Würm/Wisconsin), probablement déclenché par les cycles de Milankovitch.' },
          ],
        },
      ],
    },
  ],
},

// ═══════════════════════════════════════════════════════════════════════
// CH.11 — RÉCHAUFFEMENT CLIMATIQUE
// ═══════════════════════════════════════════════════════════════════════
'rechauffement-climatique-terminale': {
  id:'rechauffement-climatique-terminale', emoji:'🌡️', badge:'Plantes & Climat', color:'#0891b2',
  titre:'Comprendre & agir face au réchauffement climatique',
  desc:'Le réchauffement actuel est sans précédent. Ce chapitre analyse ses mécanismes physiques, ses conséquences et les stratégies d\'atténuation et d\'adaptation.',
  souschapitres:[
    {
      id:'sc-rechauffement', titre:'11.1 Mécanismes & conséquences',
      notions:['Effet de serre','CO₂','CH₄','Forçage radiatif','Rétroaction positive','GIEC','Modèles climatiques'],
      blocs:[
        {
          notion:'🌡️ L\'effet de serre et le forçage radiatif',
          theoremes:[
            { id:'D-REC1', type:'def', nom:'Mécanisme de l\'effet de serre',
              enonce:'L\'EFFET DE SERRE NATUREL est un phénomène physique indispensable à la vie sur Terre.\n\nMÉCANISME :\n1. Le Soleil émet des rayonnements de courte longueur d\'onde (visible, UV)\n2. L\'atmosphère est transparente à ces rayonnements → atteignent la surface\n3. La Terre absorbe et réémet des infrarouges (grande longueur d\'onde)\n4. Les GES absorbent ces infrarouges → réémetent dans toutes directions → réchauffement\n\nSans effet de serre naturel : Terre = -18°C (vs +15°C actuel)\n\nGAZ À EFFET DE SERRE (GES) :\n• CO₂ (dioxyde de carbone) : 421 ppm (2023) → +50% vs ère préindustrielle (280 ppm)\n• CH₄ (méthane) : ×2,5 vs préindustriel · PRG = 28 (28× plus puissant que CO₂ sur 100 ans)\n• N₂O (protoxyde d\'azote) : engrais azotés · PRG = 265\n• H₂O (vapeur d\'eau) : GES majeur, mais rétroaction et non forcage\n• HFC/PFC/SF₆ : gaz fluorés industriels · PRG = 1000-25 000\n\nFORÇAGE RADIATIF : perturbation du bilan radiatif en W/m²\n→ Actuel : +2,9 W/m² vs 1750 (GIEC AR6, 2021)' },
            { id:'P-REC1', type:'prop', nom:'Rétroactions climatiques',
              enonce:'Les RÉTROACTIONS amplifient ou atténuent le réchauffement initial.\n\nRÉTROACTIONS POSITIVES (amplifient le réchauffement) :\n\n🔴 Glace-Albédo :\n→ Réchauffement → fonte glaces → albédo diminue (eau absorbe + de lumière que glace)\n→ Surface se réchauffe davantage → + de fonte → spirale\n\n🔴 Vapeur d\'eau :\n→ Réchauffement → + d\'évaporation → + de vapeur (GES) → + de réchauffement\n→ Rétroaction positive la plus forte\n\n🔴 Pergélisol (permafrost) :\n→ Réchauffement → fonte pergélisol → libération CH₄ + CO₂ (matière organique décomposée)\n→ + de GES → + de réchauffement\n\nRÉTROACTION NÉGATIVE (atténue) :\n🟢 Nuages bas : + de nuages → + d\'albédo → léger refroidissement\n(mais les nuages sont aussi des GES → net incertain)\n\n🟢 Végétation : + de CO₂ → photosynthèse augmente → absorption CO₂ (partiellement)' },
          ],
          exercices:[
            { id:'EX-REC1', niveau:'Intermédiaire', titre:'Bilan carbone et scénarios',
              enonce:'Le GIEC présente 5 scénarios (SSP) d\'émissions futures. Le SSP5-8.5 (scénario "fossile") prévoit +4-5°C en 2100. Le SSP1-1.9 (objectif 1,5°C) nécessite des émissions nettes nulles avant 2050. Calculer : si l\'humanité émet actuellement 40 Gt CO₂/an, combien d\'années reste-t-il à ce rythme avant d\'atteindre le budget carbone compatible avec 1,5°C (400 Gt CO₂) ?',
              correction:'Budget carbone restant pour 1,5°C : 400 Gt CO₂ (estimé GIEC AR6, 2021)\nÉmissions actuelles : ~40 Gt CO₂/an\n\nNombre d\'années restantes = 400 / 40 = 10 ans\n\n→ À ce rythme, le budget sera épuisé vers 2033-2034 !\n\nMais en réalité :\n→ Les émissions doivent baisser rapidement (courbe decroissante)\n→ Le budget n\'est pas consommé à taux constant\n→ Émissions nettes nulles (neutralité carbone) nécessaires avant 2050\n\nStratégies d\'atténuation nécessaires :\n• Électrification des transports et du chauffage\n• Sortie des énergies fossiles\n• Efficacité énergétique des bâtiments\n• Agriculture bas-carbone\n• Séquestration carbone (forêts, sols, CCS)\n\nMessage clé : chaque demi-degré compte, chaque année compte.' },
          ],
        },
      ],
    },
  ],
},

// ═══════════════════════════════════════════════════════════════════════
// CH.12 — RÉFLEXES & SYSTÈME NERVEUX
// ═══════════════════════════════════════════════════════════════════════
'reflexes-systeme-nerveux-terminale': {
  id:'reflexes-systeme-nerveux-terminale', emoji:'⚡', badge:'Corps humain & santé', color:'#8b5cf6',
  titre:'Réflexes, cerveau & mouvement volontaire',
  desc:'De l\'arc réflexe au cortex moteur en passant par les maladies neurodégénératives et les addictions : ce chapitre explore le système nerveux dans toute sa complexité.',
  souschapitres:[
    {
      id:'sc-reflexe', titre:'12.1 Arc réflexe & réflexe myotatique',
      notions:['Arc réflexe','Récepteur','Neurone afférent','Moelle épinière','Motoneurone','Fuseau neuromusculaire','Muscle antagoniste','Réflexe monosynaptique'],
      blocs:[
        {
          notion:'⚡ Le réflexe myotatique — exemple d\'arc réflexe',
          theoremes:[
            { id:'D-REF1', type:'def', nom:'Arc réflexe — structure et fonctionnement',
              enonce:'Un RÉFLEXE est une réponse motrice involontaire, rapide et stéréotypée à un stimulus.\n\nARC RÉFLEXE — 5 éléments en série :\n1. RÉCEPTEUR : capte le stimulus\n2. VOIE AFFÉRENTE : neurone sensitif → moelle épinière\n3. CENTRE INTÉGRATEUR : moelle épinière (réflexe spinal) ou cerveau\n4. VOIE EFFÉRENTE : motoneurone → muscle\n5. EFFECTEUR : muscle ou glande → réponse\n\nRÉFLEXE MYOTATIQUE (exemple du réflexe rotulien) :\n• Stimulus : étirement du tendon → étirement du muscle\n• Récepteur : FUSEAU NEUROMUSCULAIRE (dans le muscle)\n• Voie afférente : neurone Ia (proprioceptif) → corne dorsale moelle\n• Synapse monosynaptique : 1 seule synapse dans la moelle\n• Motoneurone α → contrôle le muscle extenseur → contraction\n• Inhibition du muscle antagoniste (fléchisseur) par interneurone inhibiteur\n• Réponse : extension du genou (si rotulien)\n\nVITESSE : très rapide (20-120 m/s) car circuit court (pas de cerveau)' },
          ],
          exercices:[
            { id:'EX-REF1', niveau:'Intermédiaire', titre:'Section de la moelle',
              enonce:'Après une section complète de la moelle épinière à la hauteur dorsale, un patient perd ses réflexes tendineux dans les membres inférieurs dans les premières heures, puis ils réapparaissent. Expliquer.',
              correction:'PHASE 1 — Disparition des réflexes (choc spinal, quelques heures à semaines) :\n→ La section rompt les voies descendantes du cerveau vers la moelle inférieure\n→ Le cerveau exerce normalement une influence facilitatrice (contrôle descendant) sur les motoneurones\n→ Perte brusque de cette facilitation → dépression synaptique → motoneurones moins excitables\n→ Les réflexes myotatiques sont abolis temporairement (areflexie)\n\nPHASE 2 — Réapparition des réflexes (semaines à mois) :\n→ Les motoneurones de la moelle inférieure récupèrent leur excitabilité intrinsèque\n→ Le circuit réflexe local (fuseau + motoneurone) est INTACT (non lésé)\n→ Les réflexes réapparaissent, souvent exagérés (hyperreflexie) car perte des contrôles inhibiteurs descendants\n\nConclusion : le réflexe myotatique est un réflexe SPINAL (circuit dans la moelle) qui peut fonctionner sans le cerveau. La section ne le détruit pas définitivement.' },
          ],
        },
      ],
    },
    {
      id:'sc-cerveau', titre:'12.2 Cortex moteur, plasticité & pathologies',
      notions:['Cortex moteur primaire','Homonculus de Penfield','Voies pyramidales','Plasticité synaptique','LTP','Alzheimer','Parkinson','Dopamine','Addiction'],
      blocs:[
        {
          notion:'🧠 Cortex moteur & plasticité cérébrale',
          theoremes:[
            { id:'D-CORT1', type:'def', nom:'Organisation du cortex moteur',
              enonce:'Le CORTEX MOTEUR PRIMAIRE (aire 4 de Brodmann) est situé dans le gyrus précentral du lobe frontal.\n\nORGANISATION SOMATOTOPIQUE :\n→ Chaque partie du corps est représentée dans une zone précise du cortex\n→ HOMONCULUS DE PENFIELD : représentation des zones motrices en taille proportionnelle à la précision du mouvement\n→ Main et visage : très grandes zones (mouvements précis)\n→ Tronc et jambe : zones plus petites\n\nVOIES PYRAMIDALES (voies corticospinales) :\n→ Des neurones du cortex moteur → traversent le tronc cérébral → décussation dans le bulbe (croisement) → moelle épinière → motoneurones\n→ Conséquence : hémisphère gauche contrôle le côté droit du corps (et inversement)\n\nPLASTICITÉ CÉRÉBRALE :\n→ Capacité du cerveau à modifier ses connexions synaptiques en réponse à l\'expérience\n→ LTP (Long-Term Potentiation) : renforcement d\'une synapse après activation répétée\n→ Base neurologique de la mémoire et de l\'apprentissage\n→ La zone motrice de la main des musiciens est plus développée que chez les non-musiciens !' },
            { id:'P-CORT1', type:'prop', nom:'Maladies neurodégénératives & addictions',
              enonce:'MALADIE D\'ALZHEIMER :\n→ Dépôts de protéines β-amyloïde (plaques séniles) et tau (dégénérescences neurofibrillaires)\n→ Destruction progressive des neurones (hippocampe d\'abord → autres régions)\n→ Symptômes : perte mémoire récente → désorientation → perte autonomie\n→ 55 millions de personnes dans le monde · 1ère cause de démence\n→ Pas de traitement curatif actuel (traitements symptomatiques)\n\nMALADIE DE PARKINSON :\n→ Dégénérescence des neurones dopaminergiques de la substance noire\n→ Manque de dopamine → voie nigro-striée défaillante → troubles du mouvement\n→ Symptômes : tremblement au repos · rigidité musculaire · akinésie · démarche festinante\n→ Traitement : L-DOPA (précurseur de la dopamine)\n\nADDICTIONS :\n→ Drogues détournent le circuit de récompense (mésocortical + mésolimbique)\n→ Toutes libèrent ou prolongent l\'action de la dopamine dans le nucleus accumbens\n→ Neuroadaptation → tolérance → dépendance' },
          ],
          exercices:[
            { id:'EX-CORT1', niveau:'Difficile', titre:'Lésion du cortex moteur',
              enonce:'Suite à un AVC touchant le cortex moteur gauche, un patient présente une paralysie du côté droit du visage et du bras droit, mais pas de la jambe droite. Les réflexes myotatiques du bras droit sont exagérés. Expliquer chaque observation.',
              correction:'PARALYSIE DU CÔTÉ DROIT (hémiplégie droite) :\n→ Le cortex moteur gauche contrôle le côté DROIT du corps (décussation des voies pyramidales dans le bulbe)\n→ La lésion du cortex moteur gauche → atteinte des voies pyramidales → paralysie côté droit\n\nATTEINTE DU VISAGE ET BRAS mais PAS de la jambe :\n→ Organisation somatotopique du cortex moteur (homonculus)\n→ Le visage et le bras sont représentés dans la région latérale du cortex\n→ La jambe est représentée dans la région supérieure/interne (interhémisphérique)\n→ L\'AVC n\'a pas touché la région du cortex représentant la jambe → jambe épargnée\n\nRÉFLEXES EXAGÉRÉS (hyperreflexie) :\n→ Normalement, le cortex moteur exerce une influence inhibitrice descendante sur les arcs réflexes spinaux\n→ La lésion corticale supprime cette inhibition descendante\n→ Les motoneurones spinaux sont hyperexcitables → réflexes exagérés (signe de Babinski)\n→ C\'est caractéristique d\'une lésion du motoneurone supérieur (cortex ou voies pyramidales).' },
          ],
        },
      ],
    },
  ],
},

// ═══════════════════════════════════════════════════════════════════════
// CH.13 — CONTRACTION MUSCULAIRE & PRODUCTION D'ÉNERGIE
// ═══════════════════════════════════════════════════════════════════════
'contraction-musculaire-terminale': {
  id:'contraction-musculaire-terminale', emoji:'💪', badge:'Corps humain & santé', color:'#ec4899',
  titre:'Contraction musculaire & production d\'énergie',
  desc:'Comment le muscle se contracte-t-il ? Comment l\'organisme produit-il l\'ATP nécessaire ? Ce chapitre intègre biologie cellulaire, biochimie et physiologie du mouvement.',
  souschapitres:[
    {
      id:'sc-sarcomere', titre:'13.1 Sarcomère & mécanisme de contraction',
      notions:['Fibre musculaire','Sarcomère','Actine','Myosine','Glissement des filaments','Ca²⁺','ATP','Créatine phosphate','Glycolyse','Respiration cellulaire'],
      blocs:[
        {
          notion:'💪 Structure du muscle et sarcomère',
          theoremes:[
            { id:'D-SARC1', type:'def', nom:'Organisation du muscle strié squelettique',
              enonce:'HIÉRARCHIE STRUCTURALE :\nMuscle → Faisceau de fibres → Fibre musculaire (cellule) → Myofibrille → Sarcomère\n\nSARCOMÈRE (unité contractile) :\n• Délimité par 2 disques Z\n• Filaments épais (myosine) : bande A centrale\n• Filaments fins (actine) : fixés sur disques Z + zone I\n• Lors de la contraction : filaments fins glissent vers le centre → zone I raccourcit → sarcomère raccourcit → muscle se contracte\n\nMÉCANISME DE CONTRACTION (Huxley, 1954) :\n1. Signal nerveux → libération d\'acétylcholine (JNM)\n2. Potentiel d\'action de la fibre musculaire\n3. Libération de Ca²⁺ du réticulum sarcoplasmique\n4. Ca²⁺ se fixe sur la troponine → tropomyosine se déplace → sites de liaison actine exposés\n5. Têtes de myosine se fixent sur actine → pivotent → tractent l\'actine vers le centre\n6. ATP hydrolysé → détachement de la tête → nouveau cycle\n→ Chaque cycle : raccourcissement de ~10 nm par sarcomère' },
            { id:'D-SARC2', type:'def', nom:'3 voies de production de l\'ATP musculaire',
              enonce:'3 VOIES ÉNERGÉTIQUES du muscle (selon l\'intensité et la durée) :\n\n1. VOIE IMMÉDIATE — Créatine phosphate (Pcr) :\nPcr + ADP → Créatine + ATP\n→ Très rapide · Pas d\'O₂ · Stocks limités (~10 s)\n→ Sprints (100 m) · Mouvements explosifs\n\n2. VOIE ANAÉROBIE — Glycolyse :\nGlucose → 2 pyruvate + 2 ATP (sans O₂)\n→ Pyruvate → lactate (fermentation lactique)\n→ Rapide · Pas d\'O₂ · Fatigue (acidose lactique) · Dure ~1-3 min\n→ Courses de demi-fond (400-800 m)\n\n3. VOIE AÉROBIE — Respiration cellulaire :\nC₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + 30-32 ATP\n→ Lente · Nécessite O₂ · Très efficace · Dure heures\n→ Marathon · Endurance · Lipides aussi utilisés\n\nEN PRATIQUE :\n→ Les 3 voies fonctionnent simultanément\n→ L\'intensité de l\'effort détermine la voie dominante' },
            { id:'F-SARC1', type:'formule', nom:'Équation bilan de la respiration cellulaire',
              enonce:'C₆H₁₂O₆  +  6 O₂  →  6 CO₂  +  6 H₂O  +  30-32 ATP\n\nBilan comparatif :\n• Glycolyse seule (anaérobie) : 2 ATP / glucose\n• Respiration aérobie complète : 30-32 ATP / glucose\n→ La respiration aérobie est 15-16× plus efficace !\n\nSubstrats utilisés :\n→ Effort modéré long : 50% glucides + 50% lipides (1 g lipide → ~2× plus d\'ATP qu\'1 g glucose)\n→ Effort intense court : glucides presque exclusivement\n→ En famine prolongée : acides aminés (protéines) aussi utilisés' },
          ],
          exercices:[
            { id:'EX-SARC1', niveau:'Intermédiaire', titre:'Rigidité cadavérique',
              enonce:'Après la mort, les muscles restent contractés et rigides pendant 12-24h (rigidité cadavérique). Puis la rigidité disparaît. Expliquer ces deux phases.',
              correction:'PHASE 1 — Rigidité cadavérique (12-24h post-mortem) :\n\nAprès la mort, la circulation s\'arrête → plus d\'O₂ ni de glucose → plus de production d\'ATP\nSans ATP, les têtes de myosine restent attachées à l\'actine (le détachement nécessite ATP)\n→ Ponts actine-myosine permanents → muscles rigides\n→ Le Ca²⁺ libéré du réticulum sarcoplasmique ne peut plus être réabsorbé (pompe Ca²⁺ SERCA nécessite ATP)\n→ Ca²⁺ reste dans le cytoplasme → maintien de la contraction\n\nPHASE 2 — Disparition de la rigidité (après 24-48h) :\n→ Les enzymes protéolytiques (lysosomes) commencent à dégrader les protéines musculaires (actine, myosine, troponine)\n→ Les ponts actomyosine sont détruits mécaniquement\n→ Muscles redeviennent mous (début de la putréfaction)\n\nApplication médico-légale : le stade de la rigidité cadavérique permet d\'estimer l\'heure du décès.' },
          ],
        },
      ],
    },
    {
      id:'sc-glycemie', titre:'13.2 Contrôle de la glycémie & diabète',
      notions:['Glycémie','Insuline','Glucagon','Cellules β','Cellules α','Homéostasie','Diabète type 1','Diabète type 2'],
      blocs:[
        {
          notion:'🍬 Régulation de la glycémie — homéostasie glucidique',
          theoremes:[
            { id:'D-GLYC1', type:'def', nom:'Régulation hormonale de la glycémie',
              enonce:'La GLYCÉMIE est la concentration de glucose dans le sang.\nValeur normale : 0,8 à 1,2 g/L (à jeun : ~1 g/L)\n\nRÉGULATION par le PANCRÉAS ENDOCRINE (îlots de Langerhans) :\n\nHYPERGLYCÉMIE (repas) → réponse à la baisse :\n• Cellules β → INSULINE\n→ Stimule la capture du glucose par les cellules (muscle, foie, tissu adipeux)\n→ Foie : glycogénogenèse (glucose → glycogène)\n→ Tissu adipeux : lipogenèse\n→ Résultat : ↓ glycémie\n\nHYPOGLYCÉMIE (jeûne, exercice) → réponse à la hausse :\n• Cellules α → GLUCAGON\n→ Foie : glycogénolyse (glycogène → glucose) + néoglucogenèse\n→ Résultat : ↑ glycémie\n\nRÉTROCONTRÔLE NÉGATIF :\n→ La glycémie revient à sa valeur d\'équilibre → inhibe la sécrétion hormonale\n→ Système de régulation en boucle (thermostat biologique)' },
            { id:'D-GLYC2', type:'def', nom:'Diabète — types et mécanismes',
              enonce:'DIABÈTE DE TYPE 1 (DT1) — Auto-immun :\n→ Destruction des cellules β par le système immunitaire\n→ Absence totale d\'insuline\n→ Début : enfant/adolescent (maladie auto-immune)\n→ Glycémie très élevée → corps utilise lipides → corps cétoniques → acidocétose\n→ Traitement : INSULINOTHÉRAPIE (injections ou pompe)\n→ Prevalence : ~10% des diabétiques\n\nDIABÈTE DE TYPE 2 (DT2) — Résistance à l\'insuline :\n→ Les cellules cibles répondent moins à l\'insuline (résistance)\n→ Au début : hypersécrétion compensatoire d\'insuline\n→ Épuisement progressif des cellules β → déficit en insuline\n→ Facteurs : obésité, sédentarité, alimentation (sucres rapides), génétique, âge\n→ Traitement : mode de vie → metformine → insuline si stade avancé\n→ Prevalence : ~90% des diabétiques · ~500 millions dans le monde (2023)\n\nCOMPLICATIONS CHRONIQUES (hyperglycémie chronique) :\n→ Rétinopathie · Néphropathie · Neuropathie · Artérite · AVC' },
          ],
          exercices:[
            { id:'EX-GLYC1', niveau:'Difficile', titre:'Courbe HGPO',
              enonce:'Un patient réalise une HGPO (hyperglycémie provoquée par voie orale) : ingestion de 75g de glucose. Sa glycémie à jeun = 1,1 g/L. 2h après : 2,3 g/L. Interpréter. Quel diagnostic peut-on poser ?',
              correction:'VALEURS NORMALES HGPO :\n• À jeun : < 1,10 g/L\n• 2h après : < 1,40 g/L\n\nVALEURS DIAGNOSTIQUES :\n• Diabète si : glycémie à jeun ≥ 1,26 g/L ET/OU 2h post-charge ≥ 2,00 g/L\n• Prédiabète si : à jeun 1,10-1,25 g/L ET/OU 2h = 1,40-1,99 g/L\n\nINTERPRÉTATION DU PATIENT :\n→ À jeun : 1,1 g/L (normale haute, prédiabète possible)\n→ 2h après charge : 2,3 g/L ≥ 2,0 g/L → DIABÈTE\n\nDiagnostic : DIABÈTE (critère OMS confirmé : glycémie 2h ≥ 2,0 g/L lors d\'HGPO)\n\nPhysiopathologie probable : Diabète de type 2 (adulte, prédiabète initial)\n→ Après ingestion de 75g glucose, l\'insuline est sécrétée mais les cellules cibles y répondent mal (résistance à l\'insuline)\n→ La glycémie monte trop haut et reste élevée à 2h (clairance insuffisante)\n\nMesures recommandées : bilan complémentaire (HbA1c) + modification du mode de vie + suivi médical.' },
          ],
        },
      ],
    },
  ],
},

// ═══════════════════════════════════════════════════════════════════════
// CH.14 — COMPORTEMENTS & STRESS
// ═══════════════════════════════════════════════════════════════════════
'comportements-stress-terminale': {
  id:'comportements-stress-terminale', emoji:'😰', badge:'Corps humain & santé', color:'#f59e0b',
  titre:'Comportement, adaptabilité & stress',
  desc:'Le stress est une réponse physiologique normale à un défi. Ce chapitre explore l\'axe HHS, les effets du stress chronique sur l\'organisme et les stratégies de résilience.',
  souschapitres:[
    {
      id:'sc-stress', titre:'14.1 Réponse au stress & axe HHS',
      notions:['Axe HHS','Hypothalamus','Hypophyse','Surrénales','CRH','ACTH','Cortisol','Adrénaline','Fight or flight','Stress chronique'],
      blocs:[
        {
          notion:'😰 L\'axe hypothalamo-hypophyso-surrénalien (HHS)',
          theoremes:[
            { id:'D-STR1', type:'def', nom:'Réponse physiologique au stress',
              enonce:'Le STRESS est la réponse physiologique de l\'organisme à une perturbation (stresseur) menaçant l\'homéostasie.\n\nRÉPONSE IMMÉDIATE (secondes) — Système nerveux sympathique :\n→ Hypothalamus → nerfs sympathiques → médullosurrénale\n→ Libération d\'ADRÉNALINE (épinéphrine) et NORADRÉNALINE\n→ Effets : ↑ FC · ↑ PA · Dilatation pupilles · Bronchodilatation · ↑ Glycémie · Vasodilatation musculaire\n→ Prépare au "Fight or Flight" (combat ou fuite)\n\nRÉPONSE DIFFÉRÉE (minutes-heures) — Axe HHS :\n1. Hypothalamus → CRH (Corticotropin-Releasing Hormone)\n2. CRH → Hypophyse antérieure → ACTH (Adrénocorticotrophine)\n3. ACTH → Corticosurrénale → CORTISOL\n\nEFFETS DU CORTISOL :\n→ ↑ Glycémie (néoglucogenèse, glycogénolyse) → énergie disponible\n→ Anti-inflammatoire (inhibe prostaglandines, cytokines)\n→ Immunosuppresseur (↓ lymphocytes)\n→ Catabolisme protéique (libère AA → énergie)\n\nRÉTROCONTRÔLE NÉGATIF : Cortisol → inhibe hypothalamus et hypophyse → ↓ CRH et ACTH → boucle de régulation' },
            { id:'P-STR1', type:'prop', nom:'Stress chronique — effets délétères',
              enonce:'Le STRESS CHRONIQUE (cortisol élevé en continu) a des effets néfastes sur l\'organisme.\n\n🧠 CERVEAU :\n→ Atrophie de l\'hippocampe (riche en récepteurs glucocorticoïdes) → troubles mémoire\n→ Favorise les maladies anxieuses et dépressives\n→ Perturbe l\'axe du sommeil (perturbation cortisol/mélatonine)\n\n🛡️ IMMUNITÉ :\n→ Immunosuppression chronique → infections répétées · réactivation virus latents (herpès)\n→ Mais aussi inflammation systémique paradoxale (cytokines pro-inflammatoires)\n\n❤️ CARDIOVASCULAIRE :\n→ HTA chronique (hypertension artérielle)\n→ Athérosclérose accélérée\n→ Risque AVC et infarctus multiplié\n\n🩺 MÉTABOLIQUE :\n→ Résistance à l\'insuline → risque DT2\n→ Accumulation graisse viscérale (syndrome métabolique)\n\nRÉSILIENCE (facteurs protecteurs) :\n→ Exercice physique (↓ cortisol, ↑ endorphines)\n→ Liens sociaux (ocytocine ↓ cortisol)\n→ Pleine conscience / méditation\n→ Sommeil suffisant (7-9h)' },
          ],
          exercices:[
            { id:'EX-STR1', niveau:'Intermédiaire', titre:'Test de Trier Social Stress',
              enonce:'Lors du test de Trier (prise de parole en public devant jury hostile), le cortisol salivaire d\'un sujet monte de 5 nmol/L à 28 nmol/L en 20 min, puis redescend à 8 nmol/L après 60 min. Décrire la réponse HHS impliquée et le rétrocontrôle négatif.',
              correction:'RÉPONSE HHS LORS DU TEST :\n\nPhase 1 (0-20 min) — Montée du cortisol :\n1. Stresseur (prise de parole, menace sociale) → perçu par le cortex cérébral → amygdale (émotion)\n2. Amygdale → Hypothalamus → libération CRH\n3. CRH → Hypophyse antérieure → libération ACTH dans le sang\n4. ACTH → Corticosurrénale → CORTISOL (5 → 28 nmol/L)\n5 → 28 nmol/L = augmentation de ×5,6 en 20 min\n\nEffets du cortisol :\n→ Mobilisation du glucose (néoglucogenèse) → énergie pour le cerveau\n→ Vigilance accrue → mémoire de travail optimisée\n\nPhase 2 (20-80 min) — Descente du cortisol :\nRÉTROCONTRÔLE NÉGATIF :\n→ Le cortisol élevé se fixe sur les récepteurs glucocorticoïdes de l\'hypothalamus ET de l\'hypophyse\n→ Inhibition de la sécrétion de CRH et d\'ACTH\n→ ↓ ACTH → ↓ stimulation de la corticosurrénale → ↓ cortisol\n→ Retour progressif vers la valeur basale (8 nmol/L ≈ valeur physiologique normale)\n\nConclusion : réponse au stress aiguë bien régulée par rétrocontrôle négatif (homeostasie préservée).' },
          ],
        },
      ],
    },
  ],
},

} // fin ALL_CHAPTERS

// ═════════════════════════════════════════════════════════════════════
// COMPOSANT PAGE
// ═════════════════════════════════════════════════════════════════════

export default function SVTTerminaleSlugPage() {
  const params = useParams()
  const slug = params?.slug as string
  const [activeTab, setActiveTab] = useState<string|null>(null)
  const [openEx, setOpenEx] = useState<string|null>(null)

  const chapter = ALL_CHAPTERS[slug]
  const idx = NAV_ORDER.indexOf(slug)
  const prevSlug = idx > 0 ? NAV_ORDER[idx-1] : null
  const nextSlug = idx < NAV_ORDER.length-1 ? NAV_ORDER[idx+1] : null
  const secColor = SEC_COLORS[slug] || '#22c55e'

  const currentSCId = activeTab || chapter?.souschapitres?.[0]?.id
  const currentSC = chapter?.souschapitres?.find(s => s.id === currentSCId)

  if (!chapter) {
    return (
      <>
        <Navbar />
        <main style={{ paddingTop:80 }}>
          <div className="container" style={{ paddingTop:40, paddingBottom:80, textAlign:'center' }}>
            <div style={{ fontSize:48, marginBottom:16 }}>🎓</div>
            <h1>Chapitre non trouvé</h1>
            <p style={{ color:'var(--muted)', marginBottom:24 }}>Le chapitre « {slug} » n'existe pas encore.</p>
            <Link href="/bac-france/svt/terminale" className="btn btn-primary">← Retour Terminale SVT</Link>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Navbar />
      <main style={{ position:'relative', zIndex:1, paddingTop:80 }}>
        <div className="container" style={{ paddingTop:32, paddingBottom:80 }}>

          {/* Fil d'Ariane */}
          <div style={{ display:'flex', gap:8, alignItems:'center', fontSize:12, color:'var(--muted)', marginBottom:24, flexWrap:'wrap' }}>
            <Link href="/bac-france" style={{ color:'var(--muted)', textDecoration:'none' }}>🇫🇷 France</Link>
            <span>›</span>
            <Link href="/bac-france/svt" style={{ color:'var(--muted)', textDecoration:'none' }}>SVT</Link>
            <span>›</span>
            <Link href="/bac-france/svt/terminale" style={{ color:'var(--muted)', textDecoration:'none' }}>Terminale</Link>
            <span>›</span>
            <span style={{ color:secColor }}>{chapter.emoji} {chapter.titre}</span>
          </div>

          {/* Header chapitre */}
          <div style={{ marginBottom:28 }}>
            <div style={{ display:'flex', gap:8, flexWrap:'wrap', marginBottom:10 }}>
              <span style={{ fontSize:11, fontFamily:'var(--font-mono)', fontWeight:700, color:secColor }}>
                CH.{String(idx+1).padStart(2,'0')}
              </span>
              <span className="label">{chapter.badge}</span>
              <span style={{ fontSize:11, padding:'2px 9px', borderRadius:20, background:'rgba(245,158,11,0.2)', color:'#fbbf24', fontWeight:800 }}>⭐ BAC · Coef.16</span>
            </div>
            <h1 style={{ fontFamily:'var(--font-display)', fontWeight:900, fontSize:'clamp(22px,3vw,36px)', marginBottom:10 }}>
              {chapter.emoji} {chapter.titre}
            </h1>
            <p style={{ fontSize:14, color:'var(--text2)', lineHeight:1.7 }}>{chapter.desc}</p>
          </div>

          {/* Onglets sous-chapitres */}
          <div style={{ display:'flex', gap:6, flexWrap:'wrap', marginBottom:28, borderBottom:'1px solid var(--border)', paddingBottom:12 }}>
            {chapter.souschapitres.map(sc => (
              <button key={sc.id}
                onClick={() => { setActiveTab(sc.id); setOpenEx(null) }}
                style={{ padding:'7px 14px', borderRadius:10,
                  border:`1px solid ${currentSCId===sc.id ? secColor : 'var(--border)'}`,
                  background: currentSCId===sc.id ? `${secColor}18` : 'transparent',
                  color: currentSCId===sc.id ? secColor : 'var(--muted)',
                  fontSize:12, fontWeight:currentSCId===sc.id ? 800 : 500,
                  cursor:'pointer', fontFamily:'inherit', transition:'all 0.15s' }}>
                {sc.titre}
              </button>
            ))}
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'1fr 280px', gap:28, alignItems:'start' }}>

            {/* Contenu principal */}
            <div>
              {currentSC && (
                <>
                  <div style={{ marginBottom:20, padding:'14px 18px', background:`${secColor}0a`, border:`1px solid ${secColor}25`, borderRadius:12 }}>
                    <div style={{ fontSize:11, color:'var(--muted)', marginBottom:4, textTransform:'uppercase', letterSpacing:'0.08em' }}>Sous-chapitre actif</div>
                    <div style={{ fontSize:16, fontWeight:800, color:secColor }}>{currentSC.titre}</div>
                    <div style={{ display:'flex', flexWrap:'wrap', gap:5, marginTop:8 }}>
                      {currentSC.notions.map(n => (
                        <span key={n} style={{ fontSize:10, padding:'2px 9px', borderRadius:14, background:`${secColor}15`, color:'var(--text2)', border:`1px solid ${secColor}20` }}>{n}</span>
                      ))}
                    </div>
                  </div>

                  {currentSC.blocs.map(bloc => (
                    <div key={bloc.notion} style={{ marginBottom:36 }}>
                      <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:14, paddingBottom:8, borderBottom:`2px solid ${secColor}20` }}>
                        <div style={{ width:3, height:22, background:secColor, borderRadius:2 }}/>
                        <h2 style={{ fontSize:15, fontWeight:800, color:'var(--text)', margin:0 }}>{bloc.notion}</h2>
                      </div>

                      <div style={{ display:'flex', flexDirection:'column', gap:12, marginBottom:16 }}>
                        {bloc.theoremes.map(t => (
                          <div key={t.id} style={{ border:`1px solid ${C[t.type as keyof typeof C]||secColor}30`, borderLeft:`4px solid ${C[t.type as keyof typeof C]||secColor}`, borderRadius:'0 12px 12px 0', overflow:'hidden' }}>
                            <div style={{ background:`${C[t.type as keyof typeof C]||secColor}10`, padding:'9px 15px', display:'flex', gap:10, alignItems:'center' }}>
                              <span style={{ fontSize:10, fontWeight:800, color:C[t.type as keyof typeof C]||secColor, fontFamily:'var(--font-mono)', textTransform:'uppercase', letterSpacing:'0.1em', background:`${C[t.type as keyof typeof C]||secColor}20`, padding:'2px 8px', borderRadius:6 }}>{L[t.type]||t.type}</span>
                              <span style={{ fontSize:13, fontWeight:700, color:'var(--text)' }}>{t.nom}</span>
                            </div>
                            <div style={{ padding:'12px 16px', background:'rgba(255,255,255,0.02)' }}>
                              <pre style={{ fontSize:12.5, color:'var(--text2)', lineHeight:1.85, margin:0, fontFamily:'var(--font-body)', whiteSpace:'pre-wrap', wordBreak:'break-word' }}>{t.enonce}</pre>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div>
                        <div style={{ fontSize:12, fontWeight:700, color:'var(--muted)', marginBottom:8, textTransform:'uppercase', letterSpacing:'0.07em' }}>📝 Exercices</div>
                        <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                          {bloc.exercices.map(ex => (
                            <div key={ex.id} style={{ border:'1px solid var(--border)', borderRadius:10, overflow:'hidden' }}>
                              <div style={{ padding:'10px 16px', display:'flex', gap:10, alignItems:'flex-start' }}>
                                <div style={{ flexShrink:0 }}>
                                  <span style={{ fontSize:9, fontFamily:'var(--font-mono)', color:'var(--muted)' }}>{ex.id}</span>
                                  <div style={{ marginTop:2 }}>
                                    <span style={{ fontSize:9, padding:'2px 7px', borderRadius:20, fontWeight:700,
                                      background: ex.niveau==='Facile'?'rgba(34,197,94,0.15)':ex.niveau==='Difficile'?'rgba(239,68,68,0.15)':'rgba(245,158,11,0.15)',
                                      color: ex.niveau==='Facile'?'#86efac':ex.niveau==='Difficile'?'#f87171':'#fbbf24'
                                    }}>{ex.niveau}</span>
                                  </div>
                                </div>
                                <div style={{ flex:1 }}>
                                  <div style={{ fontSize:12, fontWeight:700, color:'var(--text)', marginBottom:4 }}>{ex.titre}</div>
                                  <div style={{ fontSize:12, color:'var(--text2)', lineHeight:1.65 }}>{ex.enonce}</div>
                                </div>
                              </div>
                              <div style={{ borderTop:'1px solid var(--border)', padding:'8px 16px', display:'flex', gap:8, flexWrap:'wrap' }}>
                                <Link href={`/solve?q=${encodeURIComponent('Terminale SVT — '+ex.enonce)}`} className="btn btn-primary" style={{ fontSize:11, padding:'5px 12px' }}>
                                  🌱 Résoudre avec IA
                                </Link>
                                <button onClick={() => setOpenEx(openEx===ex.id?null:ex.id)}
                                  style={{ fontSize:11, padding:'5px 12px', borderRadius:7, border:'1px solid var(--border)', background:'transparent', color:'var(--text2)', cursor:'pointer', fontFamily:'inherit' }}>
                                  📋 {openEx===ex.id?'Masquer':'Correction'}
                                </button>
                              </div>
                              {openEx===ex.id && (
                                <div style={{ padding:'10px 16px', borderTop:'1px solid var(--border)', background:`${secColor}06` }}>
                                  <div style={{ fontSize:10, color:secColor, fontWeight:700, marginBottom:4 }}>✅ Correction</div>
                                  <div style={{ fontSize:12, color:'var(--text2)', lineHeight:1.75, whiteSpace:'pre-line' }}>{ex.correction}</div>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              )}

              {/* Navigation prev/next */}
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, borderTop:'1px solid var(--border)', paddingTop:20, marginTop:12 }}>
                {prevSlug ? (
                  <Link href={`/bac-france/svt/terminale/${prevSlug}`} style={{ textDecoration:'none' }}>
                    <div className="card" style={{ padding:'12px 15px', transition:'transform 0.15s' }}
                      onMouseEnter={e=>e.currentTarget.style.transform='translateY(-2px)'}
                      onMouseLeave={e=>e.currentTarget.style.transform='translateY(0)'}>
                      <div style={{ fontSize:10, color:'var(--muted)', marginBottom:2 }}>← Précédent</div>
                      <div style={{ fontWeight:700, fontSize:12 }}>{TITRES_NAV[prevSlug]}</div>
                    </div>
                  </Link>
                ) : <div/>}
                {nextSlug ? (
                  <Link href={`/bac-france/svt/terminale/${nextSlug}`} style={{ textDecoration:'none' }}>
                    <div className="card" style={{ padding:'12px 15px', textAlign:'right', transition:'transform 0.15s' }}
                      onMouseEnter={e=>e.currentTarget.style.transform='translateY(-2px)'}
                      onMouseLeave={e=>e.currentTarget.style.transform='translateY(0)'}>
                      <div style={{ fontSize:10, color:'var(--muted)', marginBottom:2 }}>Suivant →</div>
                      <div style={{ fontWeight:700, fontSize:12 }}>{TITRES_NAV[nextSlug]}</div>
                    </div>
                  </Link>
                ) : <div/>}
              </div>
            </div>

            {/* Sidebar */}
            <aside style={{ position:'sticky', top:88 }}>
              <div style={{ background:'var(--surface)', border:'1px solid var(--border)', borderRadius:14, overflow:'hidden', marginBottom:12 }}>
                <div style={{ padding:'10px 14px', borderBottom:'1px solid var(--border)', fontSize:11, color:'var(--muted)', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.08em' }}>
                  🎓 Terminale SVT ⭐ — 14 chapitres
                </div>
                {NAV_ORDER.map((s,i) => (
                  <Link key={s} href={`/bac-france/svt/terminale/${s}`} style={{ textDecoration:'none' }}>
                    <div style={{ padding:'8px 15px', borderBottom:i<NAV_ORDER.length-1?'1px solid var(--border)':'none',
                      background:s===slug?`${SEC_COLORS[s]}12`:'transparent',
                      borderLeft:s===slug?`3px solid ${SEC_COLORS[s]}`:'3px solid transparent',
                      transition:'all 0.15s', cursor:'pointer' }}
                      onMouseEnter={e=>{ if(s!==slug) e.currentTarget.style.background='rgba(255,255,255,0.03)' }}
                      onMouseLeave={e=>{ if(s!==slug) e.currentTarget.style.background='transparent' }}>
                      <div style={{ fontSize:9, color:'var(--muted)', marginBottom:1, fontFamily:'var(--font-mono)' }}>CH.{String(i+1).padStart(2,'0')}</div>
                      <div style={{ fontSize:10, fontWeight:s===slug?700:400, color:s===slug?SEC_COLORS[s]:'var(--text2)', lineHeight:1.3 }}>{TITRES_NAV[s].replace(/^CH\.\d+ — /,'')}</div>
                    </div>
                  </Link>
                ))}
              </div>

              <div style={{ background:'var(--surface)', border:'1px solid var(--border)', borderRadius:12, padding:'13px' }}>
                <div style={{ fontSize:11, color:'var(--muted)', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:9 }}>Actions</div>
                <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
                  <Link href={`/chat?q=${encodeURIComponent('Explique-moi '+chapter.titre+' en Terminale SVT Bac 2027')}`} className="btn btn-primary" style={{ textAlign:'center', fontSize:12 }}>
                    🤖 Chat IA — SVT
                  </Link>
                  <Link href="/solve" className="btn btn-secondary" style={{ textAlign:'center', fontSize:12 }}>🌱 Solveur SVT</Link>
                  <Link href="/simulation-france" className="btn btn-secondary" style={{ textAlign:'center', fontSize:12 }}>🎯 Simulation Bac</Link>
                  <Link href="/bac-france/svt/terminale" className="btn btn-secondary" style={{ textAlign:'center', fontSize:12 }}>↩ Tous les chapitres</Link>
                </div>
              </div>
            </aside>

          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
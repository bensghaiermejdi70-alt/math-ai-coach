'use client'
import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import { useParams } from 'next/navigation'

// ══════════════════════════════════════════════════════════════════════
// SVT FRANCE — PREMIÈRE SPÉCIALITÉ · PAGE SLUG COMPLÈTE
// Route : /bac-france/svt/premiere/[slug]
// 9 chapitres · 3 thèmes · Programme officiel MEN 2026 · 4h/semaine
// ══════════════════════════════════════════════════════════════════════

const C = { thm:'#0891b2', def:'#10b981', formule:'#f59e0b', prop:'#8b5cf6', methode:'#ec4899' }
const L: Record<string,string> = { thm:'Théorème', def:'Définition', formule:'Formule clé', prop:'Propriété', methode:'Méthode' }

const NAV_ORDER = [
  'adn-genome-premiere',
  'tectonique-premiere',
  'ecosystemes-premiere',
  'ecosystemes-humains-premiere',
  'ressources-naturelles-premiere',
  'immunite-premiere',
  'genetique-sante-premiere',
  'systeme-nerveux-premiere',
  'methodes-scientifiques-premiere',
]

const TITRES_NAV: Record<string,string> = {
  'adn-genome-premiere':              'CH.1 — ADN & Expression génétique',
  'tectonique-premiere':              'CH.2 — Dynamique interne de la Terre',
  'ecosystemes-premiere':             'CH.3 — Écosystèmes & Biodiversité',
  'ecosystemes-humains-premiere':     'CH.4 — Écosystèmes & Activité humaine',
  'ressources-naturelles-premiere':   'CH.5 — Ressources naturelles',
  'immunite-premiere':                'CH.6 — Système immunitaire',
  'genetique-sante-premiere':         'CH.7 — Génétique & Santé',
  'systeme-nerveux-premiere':         'CH.8 — Système nerveux',
  'methodes-scientifiques-premiere':  'CH.9 — Méthodes scientifiques & ECE',
}

const SEC_COLORS: Record<string,string> = {
  'adn-genome-premiere':             '#10b981',
  'tectonique-premiere':             '#f97316',
  'ecosystemes-premiere':            '#22c55e',
  'ecosystemes-humains-premiere':    '#f59e0b',
  'ressources-naturelles-premiere':  '#0891b2',
  'immunite-premiere':               '#8b5cf6',
  'genetique-sante-premiere':        '#ec4899',
  'systeme-nerveux-premiere':        '#6366f1',
  'methodes-scientifiques-premiere': '#06b6d4',
}

// ═════════════════════════════════════════════════════════════════════
// DONNÉES — 9 CHAPITRES PREMIÈRE SVT
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
// CH.1 — ADN & EXPRESSION DU PATRIMOINE GÉNÉTIQUE
// ═══════════════════════════════════════════════════════════════════════
'adn-genome-premiere': {
  id:'adn-genome-premiere', emoji:'🧬', badge:'La Terre & le vivant', color:'#10b981',
  titre:'Transmission, variation & expression du patrimoine génétique',
  desc:'L\'ADN est le support universel de l\'information génétique. Ce chapitre explore sa structure, sa duplication, ses mutations et son expression en protéines — clé de tout le vivant.',
  souschapitres:[
    {
      id:'sc-adn-structure', titre:'1.1 Structure de l\'ADN & réplication',
      notions:['Double hélice','Nucléotides','Complémentarité A-T / G-C','Réplication semi-conservative','ADN polymérase','Mitose'],
      blocs:[
        {
          notion:'🧬 Structure de l\'ADN',
          theoremes:[
            { id:'D-ADN1', type:'def', nom:'La double hélice d\'ADN (Watson & Crick, 1953)',
              enonce:'L\'ADN (Acide DésoxyriboNucléique) est une macromolécule constituée de deux brins antiparallèles enroulés en double hélice.\n\nUNITÉ DE BASE : le nucléotide\nChaque nucléotide = groupement phosphate + sucre (désoxyribose) + base azotée\n\nLes 4 bases azotées :\n• Adénine (A) ↔ Thymine (T) — 2 liaisons hydrogène\n• Guanine (G) ↔ Cytosine (C) — 3 liaisons hydrogène\n→ Règle de complémentarité : A s\'apparie toujours avec T, G avec C\n\nEn chiffres :\n• 1 cellule humaine ≈ 2 m d\'ADN compactés en 6 µm de noyau\n• Génome humain ≈ 3,2 milliards de paires de bases\n• 23 paires de chromosomes (2n = 46)' },
            { id:'D-ADN2', type:'def', nom:'Réplication semi-conservative de l\'ADN',
              enonce:'La RÉPLICATION est la duplication de l\'ADN avant chaque division cellulaire (mitose).\n\nSemi-conservative : chaque molécule fille conserve un des deux brins parentaux.\n\nÉtapes :\n1. Ouverture de la double hélice (hélicases)\n2. Lecture du brin matrice\n3. Synthèse du nouveau brin (ADN polymérase — ajoute nucléotides 5\'→3\')\n4. Résultat : 2 molécules d\'ADN identiques à la molécule mère\n\nPreuve : expérience de Meselson & Stahl (1958) — isotopes ¹⁴N et ¹⁵N' },
            { id:'M-ADN1', type:'methode', nom:'Calculer la composition en bases d\'un ADN',
              enonce:'À partir de la règle de complémentarité :\n\nSi on connaît %A → %T = %A\nSi on connaît %G → %C = %G\nEt : %A + %T + %G + %C = 100%\n\nExemple :\nADN : 30% de A\n→ %T = 30%\n→ %G + %C = 100 - 30 - 30 = 40% → %G = %C = 20%\n\nRègle de Chargaff : [A]=[T] et [G]=[C] dans un ADN bicaténaire' },
          ],
          exercices:[
            { id:'EX-ADN1', niveau:'Facile', titre:'Complémentarité des bases',
              enonce:'Un brin d\'ADN a la séquence : 5\'-ATGCGATC-3\'\nÉcrire la séquence du brin complémentaire en précisant l\'orientation.',
              correction:'Règle : A↔T et G↔C, et les brins sont antiparallèles.\nBrin complémentaire (antiparallèle) : 3\'-TACGCTAG-5\'\nOu écrit dans le sens 5\'→3\' : 5\'-GATCGCAT-3\'' },
            { id:'EX-ADN2', niveau:'Intermédiaire', titre:'Composition en bases',
              enonce:'Un fragment d\'ADN double brin contient 20% de cytosine. Calculer les pourcentages de A, T, G et C.',
              correction:'%C = 20% → %G = 20% (complémentarité G↔C)\n%A + %T = 100 - 20 - 20 = 60%\n%A = %T = 30% (complémentarité A↔T)\n\nRéponse : A=30% · T=30% · G=20% · C=20%' },
            { id:'EX-ADN3', niveau:'Difficile', titre:'Réplication et longueur',
              enonce:'Une molécule d\'ADN contient 2400 paires de bases. Après 3 cycles de réplication, combien de molécules d\'ADN sont produites ? Combien de nucléotides ont été synthétisés au total ?',
              correction:'Après n cycles de réplication : 2ⁿ molécules d\'ADN\n→ 2³ = 8 molécules d\'ADN après 3 cycles\n\nNucléotides synthétisés :\nChaque cycle double la quantité d\'ADN, mais chaque nouvelle molécule = 1 brin original + 1 brin neuf.\nMolécules neuves = 2³ - 1 = 7 (on soustrait la molécule originale)\nChaque nouveau brin = 2400 nucléotides\n→ Total nucléotides synthétisés = 7 × 2400 = 16 800 nucléotides' },
          ],
        },
        {
          notion:'🔄 Mutations génétiques',
          theoremes:[
            { id:'D-MUT1', type:'def', nom:'Types de mutations',
              enonce:'Une MUTATION est une modification permanente de la séquence d\'ADN.\n\nMUTATIONS GÉNIQUES (au niveau d\'un gène) :\n• Substitution : remplacement d\'une base → mutation faux-sens (AA différent), silencieuse (même AA), non-sens (codon stop prématuré)\n• Délétion : perte d\'une ou plusieurs bases → décalage du cadre de lecture\n• Insertion : ajout d\'une base → décalage du cadre de lecture\n\nMUTATIONS CHROMOSOMIQUES :\n• Délétion d\'un segment → perte de gènes\n• Translocation → échange de segments entre chromosomes\n• Non-disjonction → trisomie (ex : trisomie 21)\n\nAGENTS MUTAGÈNES :\n• Physiques : UV (dimères de thymine), rayonnements ionisants (X, γ)\n• Chimiques : benzène, amiante, nitrosamines (tabac)\n• Biologiques : certains virus (VPH, VHB)' },
            { id:'P-MUT1', type:'prop', nom:'Conséquences des mutations',
              enonce:'Effets possibles d\'une mutation :\n\n✅ NEUTRE (silencieuse) :\n→ Même acide aminé (code génétique dégénéré)\n→ Zone non codante (intron)\n→ Aucune conséquence phénotypique\n\n✅ BÉNÉFIQUE :\n→ Nouvelle protéine mieux adaptée\n→ Source de la diversification du vivant (évolution)\n→ Ex : résistance aux antibiotiques (bactéries)\n\n❌ DÉLÉTÈRE :\n→ Protéine non fonctionnelle\n→ Maladies génétiques (mucoviscidose, drépanocytose)\n→ Cancer (si gène suppresseur de tumeur muté)' },
          ],
          exercices:[
            { id:'EX-MUT1', niveau:'Intermédiaire', titre:'Identifier le type de mutation',
              enonce:'Séquence normale : ATG-GCA-TGC-AAT\nSéquence mutée : ATG-GCG-TGC-AAT\nIdentifier le type de mutation. Est-elle forcément délétère ?',
              correction:'Comparaison : GCA → GCG (3ème codon, 3ème base A→G)\nType : substitution ponctuelle (remplacement A par G en position 9)\n\nGCA code Alanine · GCG code aussi Alanine (même acide aminé !)\n→ Mutation SILENCIEUSE / synonyme\n→ La protéine produite est identique → pas délétère\nCela illustre la dégénérescence du code génétique.' },
          ],
        },
      ],
    },
    {
      id:'sc-expression', titre:'1.2 Expression du patrimoine génétique',
      notions:['Transcription','ARNm','Traduction','Ribosome','Code génétique','Acides aminés','Protéine'],
      blocs:[
        {
          notion:'🔬 De l\'ADN à la protéine : transcription & traduction',
          theoremes:[
            { id:'D-EXP1', type:'def', nom:'La transcription (ADN → ARNm)',
              enonce:'La TRANSCRIPTION est la synthèse d\'un ARN messager (ARNm) à partir d\'un brin matrice d\'ADN.\n\nLieu : noyau (eucaryotes)\nEnzyme : ARN polymérase\n\nÉtapes :\n1. Ouverture du double brin d\'ADN au niveau du promoteur\n2. Lecture du brin matrice (3\'→5\')\n3. Synthèse de l\'ARNm (5\'→3\') par complémentarité : A→U · T→A · G→C · C→G\n4. Maturation de l\'ARNm pré-messager (épissage des introns)\n5. Export de l\'ARNm vers le cytoplasme\n\nNote : ARN utilise Uracile (U) à la place de Thymine (T)' },
            { id:'D-EXP2', type:'def', nom:'La traduction (ARNm → protéine)',
              enonce:'La TRADUCTION est la synthèse d\'une protéine à partir du code de l\'ARNm, réalisée par les ribosomes.\n\nLieu : cytoplasme (ribosomes libres ou fixés au RE)\n\nÉléments nécessaires :\n• ARNm (contient l\'information)\n• Ribosomes (usine de traduction)\n• ARNt (portent les acides aminés)\n\nCode génétique :\n• Triplets de bases = codons (64 codons)\n• 61 codons = acides aminés (20 AA au total)\n• 3 codons stop (UAA, UAG, UGA)\n• Code universel (commun à tous les êtres vivants)\n• Code dégénéré (plusieurs codons pour 1 même AA)\n\nÉtapes : Initiation (codon AUG=Met) → Élongation → Terminaison (codon stop)' },
            { id:'M-EXP1', type:'methode', nom:'Lire un tableau du code génétique',
              enonce:'Exemple : traduction de l\'ARNm 5\'-AUG-UUU-GCC-UAA-3\'\n\nAUG = Méthionine (Met) — toujours le codon initiateur\nUUU = Phénylalanine (Phe)\nGCC = Alanine (Ala)\nUAA = STOP → fin de la traduction\n\n→ Protéine : Met-Phe-Ala (3 acides aminés)\n\nRemarque : la protéine commence toujours par Met\n(qui peut être ensuite coupée)' },
          ],
          exercices:[
            { id:'EX-EXP1', niveau:'Facile', titre:'Séquence ARNm',
              enonce:'Brin matrice d\'ADN : 3\'-TACGGATCGAAT-5\'\nÉcrire la séquence de l\'ARNm transcrit.',
              correction:'Lecture du brin matrice 3\'→5\' → synthèse ARNm 5\'→3\'\nRègles : A(ADN)→U(ARN) · T→A · G→C · C→G\nBrin matrice : 3\'-T-A-C-G-G-A-T-C-G-A-A-T-5\'\nARNm :        5\'-A-U-G-C-C-U-A-G-C-U-U-A-3\'\n→ ARNm : 5\'-AUGCCUAGCUUA-3\'' },
            { id:'EX-EXP2', niveau:'Intermédiaire', titre:'Traduction complète',
              enonce:'ARNm : 5\'-AUG-GGA-UUU-CAG-UAG-3\'\nDéterminer la séquence protéique (code : GGA=Gly, UUU=Phe, CAG=Gln, UAG=Stop).',
              correction:'AUG = Méthionine (Met) — codon initiateur\nGGA = Glycine (Gly)\nUUU = Phénylalanine (Phe)\nCAG = Glutamine (Gln)\nUAG = STOP → arrêt de la traduction\n\nProtéine synthétisée : Met-Gly-Phe-Gln (4 acides aminés)' },
          ],
        },
      ],
    },
  ],
},

// ═══════════════════════════════════════════════════════════════════════
// CH.2 — DYNAMIQUE INTERNE DE LA TERRE
// ═══════════════════════════════════════════════════════════════════════
'tectonique-premiere': {
  id:'tectonique-premiere', emoji:'🌋', badge:'La Terre & le vivant', color:'#f97316',
  titre:'Dynamique interne de la Terre',
  desc:'La Terre est une planète vivante dont les plaques lithosphériques se déplacent de quelques centimètres par an. Ce chapitre explore la tectonique des plaques et les risques géologiques associés.',
  souschapitres:[
    {
      id:'sc-structure-globe', titre:'2.1 Structure du globe terrestre',
      notions:['Croûte continentale','Croûte océanique','Manteau','Noyau','Lithosphère','Asthénosphère','Ondes sismiques P et S'],
      blocs:[
        {
          notion:'🌍 Structure interne de la Terre',
          theoremes:[
            { id:'D-TEC1', type:'def', nom:'Les enveloppes terrestres',
              enonce:'La Terre est structurée en couches concentriques :\n\n1. CROÛTE (0–30 km) :\n• Continentale : 30–70 km · granite · densité ~2,7\n• Océanique : 5–10 km · basalte · densité ~3,0 · plus dense\n\n2. MANTEAU (30–2900 km) :\n• Lithosphérique (rigide) + Asthénosphère (ductile, peut couler lentement)\n• Composition : péridotite\n\n3. NOYAU (2900–6370 km) :\n• Externe (liquide) : fer et nickel → génère le champ magnétique\n• Interne (solide) : fer cristallisé\n\nLITHOSPHÈRE = croûte + manteau supérieur rigide\nASTHÉNOSPHÈRE = manteau plastique (convection)' },
            { id:'D-TEC2', type:'def', nom:'Ondes sismiques : explorer l\'intérieur de la Terre',
              enonce:'Les séismes génèrent des ondes sismiques qui traversent la Terre.\n\nOndes P (Primaires) :\n• Ondes de compression (longitudinales)\n• Traversent solides ET liquides\n• Plus rapides (6–14 km/s)\n\nOndes S (Secondaires) :\n• Ondes de cisaillement (transversales)\n• Traversent UNIQUEMENT les solides\n• Plus lentes (3,5–7 km/s)\n→ La zone d\'ombre des ondes S révèle le noyau externe LIQUIDE\n\nApplication : tomographie sismique → cartographie de l\'intérieur terrestre' },
          ],
          exercices:[
            { id:'EX-TEC1', niveau:'Facile', titre:'Ondes P et S',
              enonce:'Suite à un séisme, une station sismique enregistre les ondes P mais pas les ondes S. Que peut-on en conclure sur la nature du milieu traversé ?',
              correction:'Les ondes S ne se propagent pas dans les liquides (ondes transversales nécessitent un milieu rigide).\nSi seules les ondes P sont détectées → l\'onde a traversé un milieu LIQUIDE dans sa trajectoire.\nConclusion : la station est dans la zone d\'ombre des ondes S, ce qui indique que le trajet inclut le noyau externe (liquide) de la Terre.' },
          ],
        },
      ],
    },
    {
      id:'sc-plaques', titre:'2.2 Mobilité des plaques & risques géologiques',
      notions:['Divergence','Dorsale','Subduction','Collision','Convection mantellique','Séisme','Volcanisme'],
      blocs:[
        {
          notion:'🏔️ Mouvements des plaques lithosphériques',
          theoremes:[
            { id:'D-PL1', type:'def', nom:'Les trois types de frontières de plaques',
              enonce:'DIVERGENCE (frontières constructives) :\n• Les plaques s\'écartent\n• Remontée de magma → formation de nouvelle croûte océanique\n• Reliefs : dorsales médio-océaniques (ex : dorsale médio-atlantique)\n• Vitesse : 2–18 cm/an\n→ Séismes superficiels · Volcanisme effusif (basalte)\n\nCONVERGENCE — Subduction (destructives) :\n• Plaque océanique (dense) plonge sous plaque continentale ou océanique\n• Fusion → magma → volcanisme explosif\n• Fosses océaniques (ex : fosse des Mariannes, −11 km)\n→ Séismes profonds · Tsunamis · Volcans de type explosif\n\nCONVERGENCE — Collision :\n• Deux plaques continentales (légères) → aucune ne plonge → compression\n• Formation de chaînes de montagnes (ex : Himalaya, Alpes)\n→ Séismes profonds · Pas de volcanisme\n\nFAILLES TRANSFORMANTES :\n• Plaques glissent latéralement\n• Ex : faille de San Andreas (Californie)\n→ Séismes intenses · Pas de volcanisme' },
            { id:'P-PL1', type:'prop', nom:'Moteur des plaques : la convection mantellique',
              enonce:'Le déplacement des plaques est dû à la CONVECTION MANTELLIQUE.\n\nPrincipe :\n• Chaleur interne de la Terre (radioactivité + refroidissement primitif)\n→ Roches chaudes du manteau profond remontent (moins denses)\n→ Refroidissement en surface → redescente\n→ Cellules de convection lentes (~cm/an)\n\nEffet : les plaques « flottent » sur l\'asthénosphère et sont entraînées par ce mouvement.\n\nPreuves du déplacement des plaques :\n• Anomalies magnétiques symétriques (expansion océanique, Hess 1960)\n• Alignement des volcans de point chaud (ex : Hawaï)\n• Similitudes de faunes & flores entre continents\n• Fossiles identiques sur des continents séparés' },
          ],
          exercices:[
            { id:'EX-PL1', niveau:'Intermédiaire', titre:'Identifier le type de frontière',
              enonce:'Pour chaque situation, identifier le type de frontière et le phénomène attendu :\na) La plaque Nazca plonge sous la plaque sud-américaine, formant les Andes.\nb) La dorsale médio-atlantique sépare les plaques américaine et eurasiatique.\nc) Les plaques indienne et eurasiatique entrent en collision depuis 45 Ma.',
              correction:'a) SUBDUCTION (convergence) : plaque océanique sous continentale\n→ Fosse océanique + volcanisme explosif + séismes profonds + formation des Andes\n\nb) DIVERGENCE : écartement des plaques\n→ Dorsale océanique + volcanisme effusif (basalte) + expansion océanique + séismes superficiels\n\nc) COLLISION : deux plaques continentales (légères, aucune ne subducte)\n→ Compression → Himalaya (montagnes) + séismes + pas de volcanisme' },
          ],
        },
      ],
    },
  ],
},

// ═══════════════════════════════════════════════════════════════════════
// CH.3 — ÉCOSYSTÈMES & SERVICES ENVIRONNEMENTAUX
// ═══════════════════════════════════════════════════════════════════════
'ecosystemes-premiere': {
  id:'ecosystemes-premiere', emoji:'🌿', badge:'La Terre & le vivant', color:'#22c55e',
  titre:'Écosystèmes & services environnementaux',
  desc:'Les écosystèmes fournissent des services vitaux à l\'humanité. Comprendre leur fonctionnement est essentiel pour les préserver face aux pressions humaines croissantes.',
  souschapitres:[
    {
      id:'sc-ecosysteme-fonct', titre:'3.1 Fonctionnement des écosystèmes',
      notions:['Producteur primaire','Consommateur','Décomposeur','Chaîne alimentaire','Réseau trophique','Flux de matière','Flux d\'énergie'],
      blocs:[
        {
          notion:'🌱 Organisation trophique des écosystèmes',
          theoremes:[
            { id:'D-ECO1', type:'def', nom:'Niveaux trophiques et réseaux alimentaires',
              enonce:'Un ÉCOSYSTÈME = BIOCÉNOSE (communauté d\'êtres vivants) + BIOTOPE (milieu physico-chimique)\n\nNIVEAUX TROPHIQUES :\n1. PRODUCTEURS PRIMAIRES (végétaux, algues, cyanobactéries)\n→ Autotrophes : convertissent énergie solaire en matière organique (photosynthèse)\n\n2. CONSOMMATEURS PRIMAIRES (herbivores)\n→ Hétérotrophes : mangent les producteurs\n\n3. CONSOMMATEURS SECONDAIRES (carnivores de 1er ordre)\n4. CONSOMMATEURS TERTIAIRES (grands prédateurs)\n\n5. DÉCOMPOSEURS (bactéries, champignons)\n→ Dégradent la matière organique morte → recyclent les minéraux\n\nRÈGLE DES 10% :\n→ Seulement 10% de l\'énergie d\'un niveau trophique est transférée au suivant\n→ 90% perdue en chaleur, respiration, déjections\n→ Conséquence : les chaînes alimentaires sont courtes (max 5 niveaux)' },
            { id:'P-ECO1', type:'prop', nom:'Services écosystémiques',
              enonce:'Les SERVICES ÉCOSYSTÉMIQUES sont les bénéfices que les écosystèmes fournissent aux humains.\n\n4 catégories :\n\n🥗 SERVICES D\'APPROVISIONNEMENT :\n→ Nourriture, eau douce, bois, fibres, médicaments\n\n⚙️ SERVICES DE RÉGULATION :\n→ Régulation du climat, purification de l\'air, épuration de l\'eau\n→ Pollinisation (insectes → 75% cultures vivrières), protection contre les crues\n\n🌍 SERVICES DE SOUTIEN :\n→ Fertilité des sols, cycle de l\'eau, cycle du carbone\n\n🎨 SERVICES CULTURELS :\n→ Tourisme, bien-être, valeur esthétique et spirituelle\n\nValeur estimée : ~125 000 milliards $/an (PIB mondial ≈ 95 000 Md$)' },
          ],
          exercices:[
            { id:'EX-ECO1', niveau:'Facile', titre:'Règle des 10%',
              enonce:'Une prairie contient 10 000 kg de végétaux (producteurs primaires). En appliquant la règle des 10%, calculer la biomasse disponible pour les herbivores (consommateurs primaires), puis pour les carnivores (consommateurs secondaires).',
              correction:'Règle des 10% : chaque niveau ne transfert que 10% de sa biomasse au niveau supérieur.\n\nProducteurs primaires : 10 000 kg\nConsommateurs primaires (herbivores) : 10 000 × 10% = 1 000 kg\nConsommateurs secondaires (carnivores) : 1 000 × 10% = 100 kg\n\n→ Conclusion : un grand carnivore a besoin de 100× plus de végétaux qu\'il ne pèse. C\'est pourquoi les grands prédateurs sont rares et les pyramides trophiques ont une large base.' },
          ],
        },
      ],
    },
    {
      id:'sc-biodiversite-premiere', titre:'3.2 Biodiversité & indicateurs',
      notions:['Diversité génétique','Diversité spécifique','Diversité des écosystèmes','Indice de Shannon','Espèce clé de voûte'],
      blocs:[
        {
          notion:'📊 Mesurer la biodiversité',
          theoremes:[
            { id:'D-BIO1', type:'def', nom:'Indicateurs de biodiversité',
              enonce:'Mesurer la biodiversité nécessite des outils quantitatifs.\n\nINDICE DE RICHESSE SPÉCIFIQUE (S) :\n→ Nombre d\'espèces différentes dans un milieu\n→ Simple mais ne tient pas compte de l\'abondance\n\nINDICE DE SHANNON (H) :\nH = -Σ pᵢ × log₂(pᵢ)\noù pᵢ = proportion de l\'espèce i dans la communauté\n→ Tient compte de la richesse ET de l\'équitabilité\n→ H = 0 : 1 seule espèce (monoculture)\n→ H élevé : biodiversité riche et équilibrée\n\nESPÈCES CLÉS DE VOÛTE :\n→ Espèces dont la disparition affecterait massivement l\'écosystème\n→ Ex : loutre de mer (contrôle les oursins → protège les forêts de kelp)\n→ Ex : loup (régule les cervidés → protège la végétation riveraine)' },
          ],
          exercices:[
            { id:'EX-BIO1', niveau:'Difficile', titre:'Calcul indice de Shannon',
              enonce:'Dans un bois, on recense :\n• Chênes : 50 individus\n• Hêtres : 30 individus\n• Charmes : 20 individus\nTotal = 100 individus. Calculer l\'indice de Shannon H.',
              correction:'p(Chêne) = 50/100 = 0,50\np(Hêtre) = 30/100 = 0,30\np(Charme) = 20/100 = 0,20\n\nH = -[0,50 × log₂(0,50) + 0,30 × log₂(0,30) + 0,20 × log₂(0,20)]\nH = -[0,50 × (-1) + 0,30 × (-1,737) + 0,20 × (-2,322)]\nH = -[-0,500 - 0,521 - 0,464]\nH = -[-1,485]\nH ≈ 1,49 bits\n\nInterprétation : biodiversité modérée. H_max (3 espèces équiréparties) = log₂(3) ≈ 1,58' },
          ],
        },
      ],
    },
  ],
},

// ═══════════════════════════════════════════════════════════════════════
// CH.4 — ÉCOSYSTÈMES & ACTIVITÉ HUMAINE
// ═══════════════════════════════════════════════════════════════════════
'ecosystemes-humains-premiere': {
  id:'ecosystemes-humains-premiere', emoji:'🏭', badge:'Enjeux contemporains', color:'#f59e0b',
  titre:'Écosystèmes & activité humaine',
  desc:'L\'humanité exerce des pressions sans précédent sur les écosystèmes. Ce chapitre analyse les impacts et explore les solutions pour une gestion durable.',
  souschapitres:[
    {
      id:'sc-pressions', titre:'4.1 Pressions anthropiques sur les écosystèmes',
      notions:['Déforestation','Fragmentation','Pollution','Espèces invasives','Surexploitation','IPBES','6ème extinction'],
      blocs:[
        {
          notion:'⚠️ Les 5 grandes menaces sur la biodiversité (IPBES 2019)',
          theoremes:[
            { id:'D-ANTH1', type:'def', nom:'Les 5 pressions anthropiques (IPBES)',
              enonce:'Le rapport IPBES (2019) identifie 5 grandes causes de perte de biodiversité par ordre d\'importance :\n\n1. 🌾 CHANGEMENT D\'UTILISATION DES TERRES (1er cause)\n→ Déforestation, agriculture, urbanisation\n→ 75% des terres émergées modifiées par l\'homme\n→ 1,5 milliard ha de forêts tropicales détruites depuis 1990\n\n2. 🎣 SUREXPLOITATION DES RESSOURCES\n→ Pêche (30% des stocks surexploités), chasse, commerce espèces\n\n3. 🌡️ CHANGEMENT CLIMATIQUE (importance croissante)\n→ Déplacement des aires de répartition · Phénologie décalée · Blanchissement coraux\n\n4. 🏭 POLLUTION\n→ Pesticides · Plastiques · Nitrates · Lumière artificielle · Bruit\n\n5. 🦜 ESPÈCES EXOTIQUES ENVAHISSANTES\n→ Frelon asiatique · Ragondin · Algues Caulerpa · Tortue de Floride' },
          ],
          exercices:[
            { id:'EX-ANTH1', niveau:'Intermédiaire', titre:'Analyse d\'un cas de fragmentation',
              enonce:'On observe que dans une forêt fragmentée par des routes, les populations de lynx sont génétiquement moins diversifiées que dans une forêt continue. Expliquer ce phénomène.',
              correction:'La fragmentation de l\'habitat par les routes crée des îlots forestiers séparés.\n\nConséquences :\n• Les lynx ne peuvent plus circuler librement entre les fragments (routes = barrières)\n→ Isolement des populations\n• Pas d\'échanges de gènes entre les groupes isolés (pas de flux génique)\n→ Chaque fragment devient une petite population\n• Dans une petite population isolée :\n→ Dérive génétique : perte d\'allèles par hasard\n→ Consanguinité : reproduction entre individus apparentés\n\nRésultat : diversité génétique réduite → fragilité face aux maladies et aux changements environnementaux.' },
          ],
        },
        {
          notion:'🌿 Conservation et gestion durable',
          theoremes:[
            { id:'P-CONS1', type:'prop', nom:'Stratégies de conservation de la biodiversité',
              enonce:'Face à la 6ème extinction de masse (taux 100-1000× supérieur au taux naturel), plusieurs stratégies :\n\nIN SITU (en milieu naturel) :\n✅ Aires protégées (parc national, réserve biosphère)\n→ Objectif 30×30 : 30% terres et mers protégées d\'ici 2030\n✅ Corridors écologiques (Trame Verte et Bleue en France)\n→ Relient les habitats fragmentés\n✅ Réintroduction d\'espèces (loup, lynx, ours en Europe)\n\nEX SITU (hors milieu naturel) :\n✅ Banques de graines (Svalbard Global Seed Vault)\n✅ Cryoconservation de gamètes et embryons\n✅ Élevage en captivité (panda géant, condor de Californie)\n\nPOLITIQUES :\n✅ Convention sur la Diversité Biologique (CDB)\n✅ CITES : contrôle du commerce international d\'espèces menacées\n✅ PSE : Paiements pour Services Écosystémiques' },
          ],
          exercices:[
            { id:'EX-CONS1', niveau:'Facile', titre:'Corridor écologique',
              enonce:'Des aménageurs proposent de créer un corridor écologique entre deux fragments de forêt séparés par 5 km de zones agricoles. Quels avantages biologiques cela procure-t-il ?',
              correction:'Un corridor écologique est un habitat permettant la dispersion des espèces entre deux zones.\n\nAvantages biologiques :\n1. Flux génique : échanges d\'individus entre les populations → maintien de la diversité génétique\n2. Recolonisation : si une espèce disparaît d\'un fragment, elle peut revenir depuis l\'autre\n3. Ressources : accès à plus de territoire pour se nourrir et se reproduire\n4. Adaptation : le brassage génétique améliore la résilience face aux changements\n\nExemple réel : en France, la Trame Verte et Bleue vise à connecter les habitats naturels fragmentés par les infrastructures humaines.' },
          ],
        },
      ],
    },
  ],
},

// ═══════════════════════════════════════════════════════════════════════
// CH.5 — RESSOURCES NATURELLES & DÉVELOPPEMENT DURABLE
// ═══════════════════════════════════════════════════════════════════════
'ressources-naturelles-premiere': {
  id:'ressources-naturelles-premiere', emoji:'💧', badge:'Enjeux contemporains', color:'#0891b2',
  titre:'Ressources naturelles & développement durable',
  desc:'L\'eau, les sols et l\'énergie sont des ressources vitales sous pression. Ce chapitre analyse les défis de durabilité et les solutions pour nourrir 10 milliards d\'humains.',
  souschapitres:[
    {
      id:'sc-eau-sols', titre:'5.1 Eau, sols et agriculture durable',
      notions:['Cycle de l\'eau','Nappe phréatique','Fertilité des sols','Érosion','Agriculture biologique','Agroécologie'],
      blocs:[
        {
          notion:'💧 Le cycle de l\'eau et les ressources hydriques',
          theoremes:[
            { id:'D-EAU1', type:'def', nom:'Cycle de l\'eau et pressions humaines',
              enonce:'Le cycle de l\'eau est le mouvement continu de l\'eau entre atmosphère, surface et sous-sol.\n\nÉtapes naturelles :\nÉvaporation (océans, lacs) → Transpiration (plantes) → Condensation → Précipitations → Ruissellement → Infiltration → Nappes phréatiques\n\nPRESSIONS HUMAINES :\n• Prélèvements agricoles : 70% de l\'eau douce mondiale (irrigation)\n• Prélèvements industriels : 20%\n• Usage domestique : 10%\n\nProblèmes :\n→ Surexploitation des nappes (niveau baisse de 0,5–3 m/an dans certaines régions)\n→ Pollution (nitrates, pesticides, médicaments)\n→ Changement climatique → sécheresses + inondations\n\nSolutions :\n→ Irrigation au goutte-à-goutte (économie 30–50%)\n→ Traitement des eaux usées\n→ Désalinisation (énergie coûteuse)' },
          ],
          exercices:[
            { id:'EX-EAU1', niveau:'Intermédiaire', titre:'Bilan hydrique agricole',
              enonce:'Une culture de blé nécessite 450 mm d\'eau par saison (sur 4 mois). La région reçoit 300 mm de précipitations sur la même période. Calculer le déficit hydrique. Quelle solution proposer ?',
              correction:'Besoins : 450 mm\nPrécipitations : 300 mm\nDéficit = 450 - 300 = 150 mm\n\n150 mm sur une surface de 1 hectare (10 000 m²) :\nVolume = 0,150 m × 10 000 m² = 1 500 m³ d\'eau par hectare à apporter\n\nSolutions proposées :\n• Irrigation complémentaire (pompage nappe ou rivière)\n• Choisir des variétés de blé résistantes à la sécheresse\n• Paillage (mulch) pour réduire l\'évaporation du sol\n• Rotation culturale pour mieux utiliser l\'humidité résiduelle' },
          ],
        },
        {
          notion:'🌾 Sols agricoles et agriculture durable',
          theoremes:[
            { id:'D-SOL1', type:'def', nom:'Fertilité des sols et agroécologie',
              enonce:'Un SOL FERTILE est un sol capable de soutenir une production végétale importante.\n\nComposants d\'un sol fertile :\n• Fraction minérale (sables, limons, argiles) → structure\n• Matière organique (humus) → fertilité · rétention d\'eau\n• Micro-organismes (bactéries, champignons, vers de terre) → décomposition et recyclage\n• Eau et air dans les pores\n\nMenaces sur les sols :\n• Tassement (engins lourds → compaction)\n• Érosion hydrique et éolienne\n• Acidification (pluies acides, engrais azotés)\n• Artificialisation (bétonisation) : 20 000 ha/an en France\n\nAGROÉCOLOGIE :\n→ Couverture permanente des sols (engrais verts, CIPAN)\n→ Rotation des cultures (brise les cycles parasites)\n→ Haies (brise-vent, biodiversité, anti-érosion)\n→ Agriculture biologique (sans pesticides de synthèse)' },
          ],
          exercices:[
            { id:'EX-SOL1', niveau:'Facile', titre:'Rôle des vers de terre',
              enonce:'Dans un sol labouré avec pesticides, on trouve 10 vers de terre/m². Dans un sol en agriculture biologique voisin, on en trouve 400/m². Expliquer l\'intérêt des vers de terre pour la fertilité du sol.',
              correction:'Les vers de terre jouent plusieurs rôles essentiels dans la fertilité des sols :\n\n1. Aération : leurs galeries créent des pores → meilleure circulation de l\'eau et de l\'air\n2. Drainage : réduisent le ruissellement et les inondations\n3. Mélange : homogénéisent la matière organique (feuilles, racines) avec les particules minérales\n4. Fertilité : leurs déjections (turricules) sont riches en nutriments (N, P, K) assimilables\n5. Micro-organismes : transportent des bactéries et champignons décomposeurs\n\nConclusion : 400 vers/m² = sol biologique beaucoup plus fertile et structuré. Les pesticides détruisent cette biodiversité du sol.' },
          ],
        },
      ],
    },
    {
      id:'sc-energie', titre:'5.2 Ressources énergétiques et transition',
      notions:['Énergies fossiles','Énergies renouvelables','Bilan carbone','Empreinte écologique','Transition énergétique'],
      blocs:[
        {
          notion:'⚡ Énergies fossiles vs renouvelables',
          theoremes:[
            { id:'D-EN1', type:'def', nom:'Bilan carbone et empreinte écologique',
              enonce:'BILAN CARBONE : comptabilise les émissions de GES (gaz à effet de serre) en équivalent CO₂ (eq CO₂).\n\nÉmissions mondiales : ~40 Gt CO₂/an (2023)\nPar habitant : France ≈ 9 t CO₂eq/an · Monde ≈ 5 t · Objectif 2°C : < 2 t\n\nEMPREINTE ÉCOLOGIQUE : surface terrestre nécessaire pour subvenir aux besoins d\'un habitant.\n→ France : 4,7 planètes si tous vivaient comme un Français (dépassement du Jour du Dépassement)\n\nÉNERGIES FOSSILES (charbon, pétrole, gaz) :\n✗ Stock limité (500–1000 ans)\n✗ Émissions CO₂ importantes\n✗ Pollution locale\n\nÉNERGIES RENOUVELABLES (solaire, éolien, hydraulique, biomasse) :\n✅ Inépuisables à l\'échelle humaine\n✅ Faibles émissions GES (cycle de vie)\n✗ Intermittentes (stockage problématique)\n✗ Impacts paysagers et matériaux rares' },
          ],
          exercices:[
            { id:'EX-EN1', niveau:'Intermédiaire', titre:'Calcul d\'empreinte carbone',
              enonce:'Un lycéen effectue les trajets suivants par an :\n• Voiture (avec parents) : 8 000 km (0,15 kg CO₂/km)\n• Train : 2 000 km (0,005 kg CO₂/km)\n• Avion : 4 000 km (0,25 kg CO₂/km)\nCalculer l\'empreinte carbone liée aux transports.',
              correction:'Voiture : 8 000 × 0,15 = 1 200 kg CO₂ = 1,2 t CO₂\nTrain : 2 000 × 0,005 = 10 kg CO₂ = 0,01 t CO₂\nAvion : 4 000 × 0,25 = 1 000 kg CO₂ = 1,0 t CO₂\n\nTotal transports : 1,2 + 0,01 + 1,0 = 2,21 t CO₂/an\n\nAnalyse : l\'avion est proportionnellement le plus impactant (1 000 km en avion = plus que 8 000 km en voiture !). La décarbonation des transports passe principalement par la réduction du trafic aérien et l\'électrification routière.' },
          ],
        },
      ],
    },
  ],
},

// ═══════════════════════════════════════════════════════════════════════
// CH.6 — SYSTÈME IMMUNITAIRE
// ═══════════════════════════════════════════════════════════════════════
'immunite-premiere': {
  id:'immunite-premiere', emoji:'🛡️', badge:'Corps humain & santé', color:'#8b5cf6',
  titre:'Le système immunitaire humain',
  desc:'Le système immunitaire est notre armée interne. Ce chapitre décrit ses deux grands types de défenses — innée et adaptative — et comment les vaccins exploitent la mémoire immunitaire.',
  souschapitres:[
    {
      id:'sc-immunite-innee', titre:'6.1 Immunité innée (non spécifique)',
      notions:['Barrières naturelles','Phagocytose','Inflammation','Neutrophiles','Macrophages','Interférons'],
      blocs:[
        {
          notion:'🛡️ Premières lignes de défense',
          theoremes:[
            { id:'D-IMM1', type:'def', nom:'Immunité innée — mécanismes',
              enonce:'L\'IMMUNITÉ INNÉE est la première ligne de défense, immédiate, non spécifique.\n\n1. BARRIÈRES PHYSIQUES ET CHIMIQUES :\n• Peau (kératine, pH acide, flore commensale)\n• Muqueuses (mucus piège les pathogènes)\n• Larmes, salive (lysozyme → détruit paroi bactérienne)\n• Acide gastrique (pH 1-2 → tue les bactéries)\n\n2. RÉPONSE INFLAMMATOIRE :\nSignes : rougeur · chaleur · œdème · douleur\nMécanisme :\n→ Cellules lésées libèrent histamine et cytokines\n→ Vasodilatation → afflux de sang\n→ Phagocytes recrutés (chimiotactisme)\n\n3. PHAGOCYTOSE :\nCellules : Neutrophiles (60% des GB) + Macrophages\nÉtapes : Reconnaissance → Adhérence → Ingestion (pseudopodes) → Digestion (lysosomes) → Présentation de l\'antigène (macrophages = CPA)\n\n4. INTERFÉRONS :\nProduits par les cellules infectées par virus\n→ Alertent les cellules voisines → résistance virale' },
          ],
          exercices:[
            { id:'EX-IMM1', niveau:'Facile', titre:'Phagocytose',
              enonce:'Décrire les étapes de la phagocytose d\'une bactérie par un macrophage.',
              correction:'Étapes de la phagocytose :\n1. Chimiotactisme : le macrophage est attiré vers la bactérie par des molécules chimiques (cytokines)\n2. Reconnaissance et adhérence : récepteurs du macrophage reconnaissent des motifs conservés de la bactérie (PAMP)\n3. Ingestion : les pseudopodes du macrophage englobent la bactérie → formation du phagosome\n4. Digestion : le phagosome fusionne avec un lysosome (enzymes digestives) → destruction de la bactérie\n5. Présentation : les fragments de la bactérie (antigènes) sont présentés à la surface du macrophage sur des molécules CMH II → communication avec les lymphocytes T\n\nRéponse rapide : quelques minutes à heures.' },
          ],
        },
      ],
    },
    {
      id:'sc-immunite-adaptative', titre:'6.2 Immunité adaptative & vaccination',
      notions:['Lymphocyte B','Anticorps','Lymphocyte T cytotoxique','LT CD4','Mémoire immunitaire','Vaccin','CMH','Épitope'],
      blocs:[
        {
          notion:'🎯 Immunité adaptative — réponse spécifique',
          theoremes:[
            { id:'D-IMM2', type:'def', nom:'Immunité humorale — Lymphocytes B et anticorps',
              enonce:'L\'IMMUNITÉ HUMORALE est médiée par les anticorps produits par les lymphocytes B.\n\nÉtapes :\n1. Reconnaissance de l\'antigène par un LB spécifique (récepteur BCR)\n2. Activation du LB (avec l\'aide des LT CD4)\n3. Prolifération clonale : expansion du clone de LB spécifiques\n4. Différenciation :\n→ Plasmocytes : sécrètent massivement des anticorps (1000-10000/seconde)\n→ Cellules mémoires B : longévité (années, décennies)\n\nANTICORPS (Immunoglobulines) :\n• Structure en Y : 2 chaînes lourdes + 2 chaînes légères\n• Paratope (site de liaison) ↔ Épitope (partie de l\'Ag)\n• Neutralisation, opsonisation, activation du complément' },
            { id:'D-IMM3', type:'def', nom:'Immunité cellulaire — Lymphocytes T',
              enonce:'L\'IMMUNITÉ CELLULAIRE est médiée par les lymphocytes T cytotoxiques (LTc).\n\nLT CD4 (Lymphocytes T auxiliaires/helper) :\n→ Reconnaissent Ag présentés sur CMH II (sur CPA)\n→ Sécrètent des cytokines (interleukines) → activent LB et LTc\n→ « Chef d\'orchestre » de la réponse immunitaire\n→ Ciblés par le VIH (SIDA)\n\nLT CD8 (Lymphocytes T cytotoxiques = LTc) :\n→ Reconnaissent Ag présentés sur CMH I (sur cellules infectées)\n→ Tuent les cellules infectées par apoptose (perforine, granzyme)\n→ Surveillance anti-tumorale\n\nMÉMOIRE IMMUNITAIRE :\n→ Cellules mémoires B et T persistent après l\'infection\n→ Réponse secondaire : plus rapide + plus intense + plus durable\n→ Base de la vaccination !' },
            { id:'P-IMM1', type:'prop', nom:'Principe de la vaccination',
              enonce:'La VACCINATION exploite la mémoire immunitaire pour protéger avant l\'infection.\n\nPrincipe :\n• Injection d\'un antigène inoffensif (vaccin atténué, inactivé, sous-unitaire, ARNm…)\n• → Réponse primaire → cellules mémoires formées\n• → Si infection réelle → réponse secondaire immédiate → maladie évitée\n\nTypes de vaccins :\n• Atténués : virus/bactérie vivant affaibli (ROR, BCG)\n• Inactivés : agent tué (grippe, polio inactivée)\n• Sous-unitaires : protéines purifiées (Hépatite B, coqueluche)\n• ARNm : nouveau (Covid-19, Pfizer, Moderna) → ARNm → protéine spike → immunité\n• Vecteur viral : adénovirus modifié (AstraZeneca)\n\nIMMUNITÉ COLLECTIVE :\n→ Si 80-95% de la population est immunisée → le virus ne peut plus circuler\n→ Protège les personnes ne pouvant pas être vaccinées' },
          ],
          exercices:[
            { id:'EX-IMM2', niveau:'Intermédiaire', titre:'Réponse primaire et secondaire',
              enonce:'On injecte l\'antigène X à une souris. 15 jours plus tard, on mesure [anticorps] = 100 unités. 30 jours après, on reinjecte X. 5 jours plus tard, [anticorps] = 5000 unités. Expliquer la différence.',
              correction:'1ère injection (réponse primaire) :\n→ Première rencontre avec l\'Ag X → peu de LB spécifiques au départ\n→ Délai : 5-15 jours avant production d\'anticorps (activation, prolifération, différenciation)\n→ Intensité : faible (100 unités)\n→ Formation de cellules mémoires B et T spécifiques de X\n\n2ème injection (réponse secondaire) :\n→ Cellules mémoires (nombreuses, préexistantes) reconnaissent immédiatement X\n→ Délai court : 2-5 jours\n→ Intensité très élevée (5000 unités = ×50) — plasmocytes en grand nombre\n→ Anticorps de meilleure affinité (maturation de l\'affinité)\n\nC\'est le principe de la vaccination et du rappel !' },
          ],
        },
      ],
    },
  ],
},

// ═══════════════════════════════════════════════════════════════════════
// CH.7 — GÉNÉTIQUE & SANTÉ
// ═══════════════════════════════════════════════════════════════════════
'genetique-sante-premiere': {
  id:'genetique-sante-premiere', emoji:'🔭', badge:'Corps humain & santé', color:'#ec4899',
  titre:'Variation génétique & santé',
  desc:'Les mutations peuvent causer des maladies génétiques ou déclencher des cancers. Ce chapitre fait le lien entre génétique moléculaire et pathologies humaines.',
  souschapitres:[
    {
      id:'sc-maladies-gen', titre:'7.1 Maladies génétiques',
      notions:['Maladie monogénique','Mucoviscidose','Drépanocytose','Hérédité autosomique récessive','Phénotype','Génotype'],
      blocs:[
        {
          notion:'🧬 Maladies monogéniques — exemples et hérédité',
          theoremes:[
            { id:'D-MAL1', type:'def', nom:'Mucoviscidose — maladie génétique la plus fréquente en France',
              enonce:'La MUCOVISCIDOSE est la maladie génétique héréditaire grave la plus fréquente en Europe.\n\nGène : CFTR (Cystic Fibrosis Transmembrane conductance Regulator) → chromosome 7\nMutation la + fréquente : délétion Phe508 (perte d\'une phénylalanine)\n\nEffet : protéine CFTR non fonctionnelle → canal Cl⁻ défaillant\n→ Mucus épais dans les poumons, pancréas, foie, intestins\n\nSymptômes :\n• Insuffisance respiratoire chronique (infections répétées)\n• Insuffisance pancréatique (malabsorption)\n• Stérilité masculine (azoospermie)\n\nHérédité : autosomique RÉCESSIVE\n→ Un seul allèle sain suffit → porteur sain\n→ Deux allèles mutés nécessaires → malade\n→ Fréquence : 1/4 enfants si 2 parents porteurs\n\nTraitement actuel : ivacaftor/lumacaftor → corrige partiellement la protéine (thérapie ciblée)' },
            { id:'D-MAL2', type:'def', nom:'Drépanocytose — maladie du globule rouge',
              enonce:'La DRÉPANOCYTOSE est la maladie génétique la plus répandue dans le monde.\n\nGène : HBB → code la chaîne β de l\'hémoglobine (chromosome 11)\nMutation : substitution GAG → GTG → acide glutamique (Glu) → Valine (Val) en position 6\n\nEffet : hémoglobine S (HbS) → se polymérise en bas d\'O₂ → globule rouge en « faucille »\n→ Obstruction capillaires (crises vaso-occlusives) → douleurs intenses\n→ Anémie hémolytique\n\nHérédité : autosomique RÉCESSIVE (mais codominance : porteur sain = HbA/HbS)\n• HbA/HbA : normal\n• HbA/HbS : porteur sain (trait drépanocytaire, légère protection paludisme)\n• HbS/HbS : malade (drépanocytose sévère)\n\nTraitement : hydroxyurée, transfusions, greffe de moelle, thérapie génique (2023)' },
          ],
          exercices:[
            { id:'EX-MAL1', niveau:'Intermédiaire', titre:'Génétique de la mucoviscidose',
              enonce:'Deux parents porteurs sains de la mucoviscidose (Cc × Cc) souhaitent avoir un enfant. Calculer les probabilités que l\'enfant soit : a) sain non porteur, b) porteur sain, c) malade.',
              correction:'Croisement Cc × Cc :\nC = allèle dominant (sain) · c = allèle récessif (mucoviscidose)\n\nGrille de Punnett :\n       C    c\n  C  | CC | Cc |\n  c  | Cc | cc |\n\nRésultats :\nCC : 1/4 = 25% → sain non porteur (a)\nCc : 2/4 = 50% → porteur sain (b)\ncc : 1/4 = 25% → malade (c)\n\nConclusion : 25% de risque d\'enfant malade à chaque grossesse (indépendant des grossesses précédentes).' },
          ],
        },
      ],
    },
    {
      id:'sc-cancer', titre:'7.2 Cancer & mutations somatiques',
      notions:['Oncogène','Gène suppresseur de tumeur','Mutation somatique','Carcinogène','Apoptose','Proto-oncogène'],
      blocs:[
        {
          notion:'🔬 Le cancer — une maladie génétique de la cellule',
          theoremes:[
            { id:'D-CAN1', type:'def', nom:'Mécanismes du cancer',
              enonce:'Le CANCER est une prolifération incontrôlée de cellules due à l\'accumulation de mutations somatiques.\n\nDeux types de gènes impliqués :\n\n1. PROTO-ONCOGÈNES (gènes de prolifération) :\n→ Normalement : contrôlent la division cellulaire (frein → avancer)\n→ Mutés en ONCOGÈNES → accélèrent en permanence la division\n→ Mutation gain de fonction → une seule copie suffit (dominant)\n→ Ex : gène RAS (30% des cancers), c-Myc\n\n2. GÈNES SUPPRESSEURS DE TUMEURS (antioncogènes) :\n→ Normalement : freinent la division, induisent l\'apoptose\n→ Mutés → frein lâché\n→ Mutation perte de fonction → les 2 copies doivent être mutées (récessif)\n→ Ex : TP53 (gardien du génome, muté dans 50% des cancers), BRCA1/2 (cancer du sein)\n\nThéorie de l\'initiation-promotion-progression :\n→ Accumulation de 5-10 mutations nécessaires → cancer invasif' },
            { id:'P-CAN1', type:'prop', nom:'Facteurs de risque et prévention',
              enonce:'CARCINOGÈNES (agents favorisant les mutations) :\n\n🔴 Physiques :\n• UV (rayons solaires) → mélanome (dimères de thymine)\n• Rayonnements ionisants (X, γ, radon) → leucémies\n\n🔴 Chimiques :\n• Tabac (benzopyrène, nitrosamines) → poumon (85%), ORL, vessie\n• Alcool → foie, côlon, sein\n• Amiante → mésothéliome\n\n🔴 Biologiques :\n• VPH (Human Papillomavirus) → col de l\'utérus\n• VHB/VHC → carcinome hépatique\n• H. pylori → cancer gastrique\n\nPRÉVENTION PRIMAIRE (70% des cancers évitables) :\n→ Arrêt tabac · Modération alcool · Protection UV\n→ Vaccination VPH · Alimentation équilibrée · Sport\n→ Dépistage précoce (mammographie, coloscopie, frottis)' },
          ],
          exercices:[
            { id:'EX-CAN1', niveau:'Difficile', titre:'Mutation BRCA1 et risque cancer',
              enonce:'Une femme porte une mutation hétérozygote du gène BRCA1. Ses médecins estiment son risque de cancer du sein à 72% (vs 12% en population générale). \na) BRCA1 est-il un oncogène ou un gène suppresseur ? \nb) Pourquoi une seule copie mutée augmente-t-elle autant le risque ?',
              correction:'a) BRCA1 est un GÈNE SUPPRESSEUR DE TUMEUR (antioncogène).\nSa protéine normale répare les cassures double-brin de l\'ADN et régule le cycle cellulaire.\n\nb) Modèle des "deux coups" (Alfred Knudson) :\n→ La patiente est hétérozygote : elle possède une copie normale (BRCA1+) et une copie mutée (BRCA1-)\n→ La copie normale suffit à protéger (récessif)\n→ Mais dans les cellules mammaires, si la 2ème copie (BRCA1+) subit une mutation somatique (par UV, erreur de réplication…) :\n→ Les deux copies sont mutées → plus de réparation de l\'ADN → accumulation de mutations → cancer\n\nRisque élevé car le "1er coup" héréditaire est déjà fait : il ne reste qu\'un seul "coup" aléatoire pour perdre la 2ème copie, ce qui est statistiquement probable sur 70 ans de vie cellulaire.' },
          ],
        },
      ],
    },
  ],
},

// ═══════════════════════════════════════════════════════════════════════
// CH.8 — SYSTÈME NERVEUX & PLASTICITÉ
// ═══════════════════════════════════════════════════════════════════════
'systeme-nerveux-premiere': {
  id:'systeme-nerveux-premiere', emoji:'🧠', badge:'Corps humain & santé', color:'#6366f1',
  titre:'Fonctionnement du système nerveux',
  desc:'Le système nerveux est le réseau de communication le plus complexe du vivant. Ce chapitre explore la transmission nerveuse, la plasticité cérébrale et les effets des drogues.',
  souschapitres:[
    {
      id:'sc-neurone', titre:'8.1 Neurone & potentiel d\'action',
      notions:['Neurone','Dendrites','Axone','Gaine de myéline','Nœud de Ranvier','Potentiel de repos','Potentiel d\'action','Na⁺','K⁺'],
      blocs:[
        {
          notion:'⚡ Le neurone — structure et potentiel d\'action',
          theoremes:[
            { id:'D-NEU1', type:'def', nom:'Structure du neurone',
              enonce:'Le NEURONE est l\'unité fonctionnelle du système nerveux.\n\nStructure :\n• Corps cellulaire (soma) : contient le noyau et les organites\n• Dendrites : ramifications qui REÇOIVENT l\'information\n• Axone : prolongement unique qui TRANSMET l\'information (peut mesurer 1 m)\n• Gaine de myéline : isolant électrique (produit par cellules de Schwann) → accélère la transmission\n• Nœuds de Ranvier : interruptions de la gaine → conduction saltatoire\n• Boutons synaptiques : terminaisons axonales → transmettent aux neurones suivants\n\nTypes :\n• Neurones sensitifs (afférents) : sens → SNC\n• Neurones moteurs (efférents) : SNC → muscles/glandes\n• Interneurones : entre neurones' },
            { id:'D-NEU2', type:'def', nom:'Potentiel d\'action — mécanisme ionique',
              enonce:'Le POTENTIEL D\'ACTION (PA) est le signal électrique qui se propage le long de l\'axone.\n\nPOTENTIEL DE REPOS : -70 mV (intérieur négatif)\n→ Pompe Na⁺/K⁺ (3 Na⁺ sortent, 2 K⁺ entrent) → maintien du gradient\n\nGÉNÉRATION DU PA :\n1. DÉPOLARISATION : stimulus → canaux Na⁺ s\'ouvrent → entrée de Na⁺ → potentiel passe de -70 à +30 mV\n2. REPOLARISATION : canaux Na⁺ se ferment, canaux K⁺ s\'ouvrent → sortie K⁺ → retour vers -70 mV\n3. HYPERPOLARISATION (période réfractaire) → légère sous-oscillation avant retour\n\nLoi du TOUT OU RIEN :\n→ Si stimulus < seuil : pas de PA\n→ Si stimulus ≥ seuil : PA toujours identique en amplitude\n→ L\'intensité est codée par la FRÉQUENCE des PA (Hz)' },
            { id:'M-NEU1', type:'methode', nom:'Lire un oscillogramme de PA',
              enonce:'Un oscillogramme montre : potentiel en mV en fonction du temps.\n\nIdentification des phases :\n• Ligne de base → -70 mV : potentiel de repos\n• Montée rapide → dépolarisation (entrée Na⁺)\n• Pic → +30 mV : dépolarisation maximale\n• Descente → repolarisation (sortie K⁺)\n• Creux < -70 mV → hyperpolarisation\n• Retour → -70 mV : fin\n\nDurée totale d\'un PA : ~2 ms\nPériode réfractaire absolue : ~1 ms (impossible de générer 2ème PA)\n→ Fréquence max : ~500 PA/s' },
          ],
          exercices:[
            { id:'EX-NEU1', niveau:'Intermédiaire', titre:'Loi du tout ou rien',
              enonce:'On applique 3 stimuli de différentes intensités à un neurone : 1 mV, 5 mV (seuil=4 mV) et 10 mV. Quel(s) stimulus génère(nt) un PA ? Les PA sont-ils différents ?',
              correction:'Seuil de déclenchement = 4 mV.\n\n• Stimulus 1 mV < 4 mV → Pas de PA (sous le seuil)\n• Stimulus 5 mV > 4 mV → PA déclenché ✓\n• Stimulus 10 mV > 4 mV → PA déclenché ✓\n\nLoi du tout ou rien : tous les PA ont la même amplitude (~100 mV, de -70 à +30 mV), quelle que soit l\'intensité du stimulus (au-delà du seuil).\n\nConclusion : 1 seul PA est généré par le stimulus 1 mV (aucun), et des PA identiques par les 5 mV et 10 mV. L\'intensité n\'affecte pas la taille du PA mais sa fréquence.' },
          ],
        },
      ],
    },
    {
      id:'sc-synapse', titre:'8.2 Synapse, plasticité & drogues',
      notions:['Synapse','Neurotransmetteur','Récepteur','Dopamine','Sérotonine','Plasticité synaptique','Dépendance'],
      blocs:[
        {
          notion:'🔌 La synapse chimique — communication entre neurones',
          theoremes:[
            { id:'D-SYN1', type:'def', nom:'Structure et fonctionnement de la synapse',
              enonce:'La SYNAPSE est la zone de communication entre deux neurones.\n\nÉLÉMENTS :\n• Neurone présynaptique (émet le signal)\n• Fente synaptique (20-50 nm)\n• Neurone postsynaptique (reçoit le signal)\n\nFONCTIONNEMENT :\n1. PA arrive au bouton présynaptique\n2. Entrée de Ca²⁺ → fusion des vésicules synaptiques avec la membrane\n3. Libération du neurotransmetteur dans la fente\n4. Fixation du NT sur les récepteurs postsynaptiques\n5. → PPSE (dépolarisation → excitateur) ou PPSI (hyperpolarisation → inhibiteur)\n6. Recapture ou dégradation du NT\n\nNEUROTRANSMETTEURS PRINCIPAUX :\n• Acétylcholine (ACh) → jonction neuromusculaire, SNP\n• Dopamine → circuit de récompense, motivation\n• Sérotonine → humeur, sommeil, anxiété\n• GABA → inhibiteur principal du cerveau\n• Glutamate → excitateur principal du cerveau\n• Noradrénaline → vigilance, stress' },
            { id:'P-SYN1', type:'prop', nom:'Drogues et système nerveux',
              enonce:'Les DROGUES agissent sur les synapses en mimant ou bloquant les neurotransmetteurs.\n\nMécanismes d\'action :\n\n🚫 COCAÏNE :\n→ Bloque la recapture de la dopamine\n→ Dopamine reste longtemps dans la fente → euphorie intense\n→ Puis manque → dépression → dépendance\n\n💊 MORPHINE/HÉROÏNE :\n→ Agoniste des récepteurs opioïdes (μ)\n→ Mimik les endorphines naturelles\n→ Analgésie + euphorie → dépendance forte\n\n🍺 ALCOOL :\n→ Potentialise le GABA (inhibiteur)\n→ Inhibe le glutamate (excitateur)\n→ Désinhibition → troubles coordination\n\n🌿 THC (cannabis) :\n→ Agoniste des récepteurs cannabinoïdes (CB1)\n→ Perturbe mémoire (hippocampe) + perception\n\nDÉPENDANCE → neuroadaptation → manque → tolérance' },
          ],
          exercices:[
            { id:'EX-SYN1', niveau:'Difficile', titre:'Mécanisme d\'action de la cocaïne',
              enonce:'Expliquer pourquoi la cocaïne provoque une euphorie intense, suivie d\'un sentiment de manque, pouvant mener à la dépendance.',
              correction:'MÉCANISME NORMAL (sans cocaïne) :\n→ Dopamine libérée dans la fente → se fixe sur récepteurs → signal "plaisir" → recaptée et recyclée\n\nAVEC COCAÏNE :\n1. La cocaïne bloque le transporteur DAT (Dopamine Transporter)\n→ La dopamine ne peut plus être recaptée\n→ S\'accumule dans la fente synaptique\n→ Stimulation prolongée et intense des récepteurs à dopamine\n→ EUPHORIE intense (10-30× supérieure à tout plaisir naturel)\n\nEFFET DU MANQUE :\n→ Quand la cocaïne est éliminée, les stocks de dopamine sont épuisés\n→ Circuit de récompense sous-stimulé → DÉPRESSION, anhédonie (incapacité à ressentir du plaisir)\n\nDÉPENDANCE :\n→ Neuroadaptation : le cerveau réduit ses récepteurs dopaminergiques\n→ Il faut des doses croissantes pour le même effet (TOLÉRANCE)\n→ Sans cocaïne : manque sévère → compulsion à reconsommer' },
          ],
        },
      ],
    },
  ],
},

// ═══════════════════════════════════════════════════════════════════════
// CH.9 — MÉTHODES SCIENTIFIQUES & ECE
// ═══════════════════════════════════════════════════════════════════════
'methodes-scientifiques-premiere': {
  id:'methodes-scientifiques-premiere', emoji:'🔬', badge:'Transversal', color:'#06b6d4',
  titre:'Méthodes scientifiques & Épreuve de Capacités Expérimentales (ECE)',
  desc:'La démarche scientifique et les capacités expérimentales sont au cœur de l\'enseignement de la spécialité SVT. Ce chapitre prépare à l\'ECE du Baccalauréat.',
  souschapitres:[
    {
      id:'sc-demarche', titre:'9.1 Démarche scientifique',
      notions:['Observation','Hypothèse','Expérience','Groupe témoin','Variable','Résultats','Interprétation','Conclusion'],
      blocs:[
        {
          notion:'🔭 Démarche expérimentale — méthode scientifique',
          theoremes:[
            { id:'M-DEM1', type:'methode', nom:'Étapes de la démarche expérimentale',
              enonce:'1. OBSERVATION : constater un phénomène (curiosité scientifique)\n\n2. PROBLÉMATIQUE : formuler une question précise et scientifique\nEx : "Quel est l\'effet de la température sur l\'activité de l\'amylase ?"\n\n3. HYPOTHÈSE : proposition explicative vérifiable\nEx : "Une température plus élevée augmente l\'activité de l\'amylase jusqu\'à un optimum"\n\n4. PROTOCOLE EXPÉRIMENTAL :\n• Définir la variable INDÉPENDANTE (qu\'on fait varier : température)\n• Identifier la variable DÉPENDANTE (ce qu\'on mesure : vitesse de dégradation)\n• CONTRÔLER toutes les autres variables (pH, concentration en enzyme, substrat…)\n• Prévoir un GROUPE TÉMOIN (condition de référence)\n• Répliquer (au moins 3 répétitions → statistiques)\n\n5. EXPÉRIENCE : réaliser et noter tous les résultats\n\n6. ANALYSE DES RÉSULTATS : décrire les données (tableaux, graphiques)\n\n7. INTERPRÉTATION : expliquer les résultats en termes biologiques\n\n8. CONCLUSION : répondre à la problématique (hypothèse confirmée ou infirmée)' },
            { id:'M-DEM2', type:'methode', nom:'Construire et lire un graphique scientifique',
              enonce:'RÈGLES DE CONSTRUCTION :\n• Titre explicite (variable dépendante en fonction de variable indépendante)\n• Axe X (abscisses) : variable indépendante + unité\n• Axe Y (ordonnées) : variable mesurée + unité\n• Échelles régulières et adaptées aux données\n• Points bien placés + courbe lissée (tendance)\n• Légende si plusieurs courbes\n\nLECTURE ET ANALYSE :\n1. Décrire la tendance générale (augmentation, diminution, plateau)\n2. Identifier les valeurs remarquables (maximum, minimum, seuil)\n3. Repérer les phases distinctes\n4. Relier aux mécanismes biologiques\n\nEx : courbe d\'activité enzymatique en fonction de la température\n→ Phase 1 : augmentation (énergie cinétique ↑)\n→ Optimum : Topt (activité maximale)\n→ Phase 2 : chute brutale (dénaturation au-delà de Topt)' },
          ],
          exercices:[
            { id:'EX-DEM1', niveau:'Intermédiaire', titre:'Identifier les variables',
              enonce:'Expérience : On étudie l\'effet du pH sur la vitesse de digestion des protéines par la pepsine. On prépare 5 tubes avec le même substrat (albumine), la même quantité de pepsine, la même température (37°C), mais des pH différents : 1 / 2 / 4 / 6 / 8. On mesure la concentration en acides aminés après 1h.\n\nIdentifier : a) la variable indépendante, b) la variable dépendante, c) les variables contrôlées, d) à quoi sert le tube pH=8.',
              correction:'a) Variable INDÉPENDANTE : le pH (ce que l\'expérimentateur fait varier intentionnellement)\n\nb) Variable DÉPENDANTE : la concentration en acides aminés après 1h (ce qu\'on mesure, qui dépend du pH)\n\nc) Variables CONTRÔLÉES (maintenues constantes) :\n• Même substrat (albumine) et même concentration\n• Même quantité de pepsine\n• Même température (37°C)\n• Même durée d\'incubation (1h)\n→ Permet d\'attribuer les différences uniquement au pH\n\nd) Tube pH=8 → GROUPE TÉMOIN (ou contrôle négatif) :\nLa pepsine est une enzyme gastrique optimale vers pH 2. À pH 8, elle est inactive (dénaturation ou hors domaine d\'activité)\n→ Permet de vérifier que toute digestion observée est bien due à la pepsine et non à un autre facteur' },
          ],
        },
      ],
    },
    {
      id:'sc-ece', titre:'9.2 Préparer l\'ECE (Épreuve de Capacités Expérimentales)',
      notions:['ECE','Microscope','Dissection','Chromatographie','Électrophorèse','Compte-rendu'],
      blocs:[
        {
          notion:'🧪 Techniques expérimentales clés pour l\'ECE',
          theoremes:[
            { id:'M-ECE1', type:'methode', nom:'Techniques expérimentales fréquentes à l\'ECE',
              enonce:'L\'ECE évalue 4 compétences :\n→ CONCEVOIR : protocole, matériel, démarche\n→ RÉALISER : manipulation, observations\n→ ANALYSER : résultats, interprétation\n→ COMMUNIQUER : schémas, compte-rendu\n\nTECHNIQUES FRÉQUENTES :\n\n🔬 MICROSCOPIE :\n• Préparer une lame, régler, observer\n• Schéma annoté (titre + grandissement)\n• Calcul de taille réelle\n\n🧫 CHROMATOGRAPHIE :\n• Séparation de pigments (chlorophylle : Rf = distance migr. pigment / distance front solvant)\n• Identifier les pigments par leur Rf\n\n⚡ ÉLECTROPHORÈSE :\n• Migration de l\'ADN selon la taille (petit = loin)\n• Analyse de profils de restriction\n\n💉 TECHNIQUES IMMUNOLOGIQUES :\n• Réaction Ag-Ac (ELISA, Ouchterlony)\n• Test de grossesse (test à bandelette)\n\n🌿 ÉTUDE DES ÉCOSYSTÈMES :\n• Quadrats, transects, captures-recaptures\n• Calcul richesse spécifique, indice de Shannon' },
          ],
          exercices:[
            { id:'EX-ECE1', niveau:'Facile', titre:'Calcul de Rf en chromatographie',
              enonce:'En chromatographie de chlorophylle, le solvant a migré sur 8 cm. On observe deux pigments :\n• Pigment A : migré sur 6,4 cm\n• Pigment B : migré sur 2,4 cm\nCalculer les Rf et identifier les pigments (chlorophylle a : Rf≈0,85 ; chlorophylle b : Rf≈0,45).',
              correction:'Rf = distance migrée par le pigment / distance migrée par le solvant\n\nRf(A) = 6,4 / 8,0 = 0,80 ≈ 0,85 → CHLOROPHYLLE a\nRf(B) = 2,4 / 8,0 = 0,30 ≈ 0,45 → CHLOROPHYLLE b\n\nConclusion : le pigment A est de la chlorophylle a (la plus abondante, verte-bleue), le pigment B est de la chlorophylle b (verte-jaune). Les différences de Rf reflètent les différences de polarité : chlorophylle a moins polaire → migre plus loin dans un solvant peu polaire.' },
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

export default function SVTPremiereSlugPage() {
  const params = useParams()
  const slug = params?.slug as string
  const [activeTab, setActiveTab] = useState<string|null>(null)
  const [openEx, setOpenEx] = useState<string|null>(null)

  const chapter = ALL_CHAPTERS[slug]
  const idx = NAV_ORDER.indexOf(slug)
  const prevSlug = idx > 0 ? NAV_ORDER[idx-1] : null
  const nextSlug = idx < NAV_ORDER.length-1 ? NAV_ORDER[idx+1] : null
  const secColor = SEC_COLORS[slug] || '#10b981'

  const currentSCId = activeTab || chapter?.souschapitres?.[0]?.id
  const currentSC = chapter?.souschapitres?.find(s => s.id === currentSCId)

  if (!chapter) {
    return (
      <>
        <Navbar />
        <main style={{ paddingTop:80 }}>
          <div className="container" style={{ paddingTop:40, paddingBottom:80, textAlign:'center' }}>
            <div style={{ fontSize:48, marginBottom:16 }}>🧬</div>
            <h1>Chapitre non trouvé</h1>
            <p style={{ color:'var(--muted)', marginBottom:24 }}>Le chapitre « {slug} » n'existe pas encore.</p>
            <Link href="/bac-france/svt/premiere" className="btn btn-primary">← Retour Première SVT</Link>
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
            <Link href="/bac-france/svt/premiere" style={{ color:'var(--muted)', textDecoration:'none' }}>Première</Link>
            <span>›</span>
            <span style={{ color:secColor }}>{chapter.emoji} {chapter.titre}</span>
          </div>

          {/* Header chapitre */}
          <div style={{ marginBottom:28 }}>
            <div style={{ display:'flex', gap:8, flexWrap:'wrap', marginBottom:10 }}>
              <span style={{ fontSize:11, fontFamily:'var(--font-mono)', fontWeight:700, color:secColor }}>CH.0{idx+1}</span>
              <span className="label">{chapter.badge}</span>
              <span style={{ fontSize:11, padding:'2px 9px', borderRadius:20, background:'rgba(16,185,129,0.15)', color:'#34d399', fontWeight:700 }}>Première Spécialité</span>
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
                                <Link href={`/solve?q=${encodeURIComponent('Première SVT — '+ex.enonce)}`} className="btn btn-primary" style={{ fontSize:11, padding:'5px 12px' }}>
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
                  <Link href={`/bac-france/svt/premiere/${prevSlug}`} style={{ textDecoration:'none' }}>
                    <div className="card" style={{ padding:'12px 15px', transition:'transform 0.15s' }}
                      onMouseEnter={e=>e.currentTarget.style.transform='translateY(-2px)'}
                      onMouseLeave={e=>e.currentTarget.style.transform='translateY(0)'}>
                      <div style={{ fontSize:10, color:'var(--muted)', marginBottom:2 }}>← Précédent</div>
                      <div style={{ fontWeight:700, fontSize:12 }}>{TITRES_NAV[prevSlug]}</div>
                    </div>
                  </Link>
                ) : <div/>}
                {nextSlug ? (
                  <Link href={`/bac-france/svt/premiere/${nextSlug}`} style={{ textDecoration:'none' }}>
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
                  📗 Première SVT — 9 chapitres
                </div>
                {NAV_ORDER.map((s,i) => (
                  <Link key={s} href={`/bac-france/svt/premiere/${s}`} style={{ textDecoration:'none' }}>
                    <div style={{ padding:'9px 15px', borderBottom:i<NAV_ORDER.length-1?'1px solid var(--border)':'none',
                      background:s===slug?`${SEC_COLORS[s]}12`:'transparent',
                      borderLeft:s===slug?`3px solid ${SEC_COLORS[s]}`:'3px solid transparent',
                      transition:'all 0.15s', cursor:'pointer' }}
                      onMouseEnter={e=>{ if(s!==slug) e.currentTarget.style.background='rgba(255,255,255,0.03)' }}
                      onMouseLeave={e=>{ if(s!==slug) e.currentTarget.style.background='transparent' }}>
                      <div style={{ fontSize:10, color:'var(--muted)', marginBottom:1, fontFamily:'var(--font-mono)' }}>CH.0{i+1}</div>
                      <div style={{ fontSize:11, fontWeight:s===slug?700:400, color:s===slug?SEC_COLORS[s]:'var(--text2)' }}>{TITRES_NAV[s].replace(/^CH\.\d+ — /,'')}</div>
                    </div>
                  </Link>
                ))}
              </div>

              <div style={{ background:'var(--surface)', border:'1px solid var(--border)', borderRadius:12, padding:'13px' }}>
                <div style={{ fontSize:11, color:'var(--muted)', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:9 }}>Actions</div>
                <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
                  <Link href={`/chat?q=${encodeURIComponent('Explique-moi '+chapter.titre+' en Première SVT')}`} className="btn btn-primary" style={{ textAlign:'center', fontSize:12 }}>
                    🤖 Chat IA — SVT
                  </Link>
                  <Link href="/solve" className="btn btn-secondary" style={{ textAlign:'center', fontSize:12 }}>🌱 Solveur SVT</Link>
                  <Link href="/bac-france/svt/premiere" className="btn btn-secondary" style={{ textAlign:'center', fontSize:12 }}>↩ Tous les chapitres</Link>
                  <Link href="/bac-france/svt/terminale" className="btn btn-secondary" style={{ textAlign:'center', fontSize:12 }}>🎓 Terminale SVT ⭐ →</Link>
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
'use client'
import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import { useParams } from 'next/navigation'

// ══════════════════════════════════════════════════════════════════════
// SVT FRANCE — SECONDE · PAGE SLUG COMPLÈTE
// Route : /bac-france/svt/seconde/[slug]
// 9 chapitres · 3 thèmes · Programme officiel MEN 2026
// ══════════════════════════════════════════════════════════════════════

const C = { thm:'#0891b2', def:'#22c55e', formule:'#f59e0b', prop:'#8b5cf6', methode:'#ec4899' }
const L: Record<string,string> = { thm:'Théorème', def:'Définition', formule:'Formule clé', prop:'Propriété', methode:'Méthode' }

const NAV_ORDER = [
  'cellules-seconde',
  'metabolisme-seconde',
  'biodiversite-evolution-seconde',
  'communication-selection-sexuelle',
  'geosciences-paysages',
  'erosion-humaine',
  'agrosystemes',
  'fecondation-puberte',
  'cerveau-sante',
]

const TITRES_NAV: Record<string,string> = {
  'cellules-seconde':              'CH.1 — Cellules spécialisées',
  'metabolisme-seconde':           'CH.2 — Métabolisme cellulaire',
  'biodiversite-evolution-seconde':'CH.3 — Biodiversité & Évolution',
  'communication-selection-sexuelle':'CH.4 — Communication & Sélection sexuelle',
  'geosciences-paysages':          'CH.5 — Géosciences & Paysages',
  'erosion-humaine':               'CH.6 — Érosion & Activité humaine',
  'agrosystemes':                  'CH.7 — Agrosystèmes',
  'fecondation-puberte':           'CH.8 — Fécondation & Puberté',
  'cerveau-sante':                 'CH.9 — Hormones, Cerveau & Santé',
}

const SEC_COLORS: Record<string,string> = {
  'cellules-seconde':               '#22c55e',
  'metabolisme-seconde':            '#10b981',
  'biodiversite-evolution-seconde': '#16a34a',
  'communication-selection-sexuelle':'#84cc16',
  'geosciences-paysages':           '#f59e0b',
  'erosion-humaine':                '#f97316',
  'agrosystemes':                   '#a16207',
  'fecondation-puberte':            '#ec4899',
  'cerveau-sante':                  '#8b5cf6',
}

// ═════════════════════════════════════════════════════════════════════
// DONNÉES — 9 CHAPITRES SECONDE SVT
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
// CH.1 — CELLULES SPÉCIALISÉES
// ═══════════════════════════════════════════════════════════════════════
'cellules-seconde': {
  id:'cellules-seconde', emoji:'🔬', badge:'La Terre & le vivant', color:'#22c55e',
  titre:'L\'organisme pluricellulaire — cellules spécialisées',
  desc:'Toutes les cellules d\'un organisme partagent le même ADN. Pourtant chaque cellule remplit une fonction particulière. Ce chapitre explore comment la spécialisation cellulaire est possible.',
  souschapitres:[
    {
      id:'sc-cellule-types', titre:'1.1 Types de cellules',
      notions:['Cellule animale','Cellule végétale','Organites','Membrane plasmique','Noyau','ADN'],
      blocs:[
        {
          notion:'🔬 La cellule : unité du vivant',
          theoremes:[
            { id:'D-C1', type:'def', nom:'Cellule animale vs cellule végétale',
              enonce:'Tous les êtres vivants sont constitués de cellules.\n\n🐾 CELLULE ANIMALE :\n• Membrane plasmique (enveloppe externe)\n• Noyau (contient l\'ADN)\n• Cytoplasme\n• Mitochondries (production d\'énergie)\n• Ribosomes (synthèse des protéines)\n→ Pas de paroi, pas de chloroplaste\n\n🌿 CELLULE VÉGÉTALE (tout cela + ) :\n• Paroi en cellulose (rigidité)\n• Chloroplastes (photosynthèse — vert)\n• Grande vacuole centrale (réserve d\'eau)\n• Plasmodesmes (communication entre cellules)' },
            { id:'D-C2', type:'def', nom:'Organites cellulaires',
              enonce:'Les organites sont des compartiments spécialisés à l\'intérieur de la cellule.\n\n• Noyau : contient l\'ADN (information génétique) — entouré de la membrane nucléaire\n• Mitochondries : centrale énergétique → produisent l\'ATP (respiration cellulaire)\n• Chloroplastes : captent la lumière → photosynthèse (cellule végétale uniquement)\n• Ribosomes : fabriquent les protéines (traduction de l\'ADN)\n• Réticulum endoplasmique : transport et modification des protéines\n• Appareil de Golgi : tri et export des protéines\n• Vacuole : stockage eau, pigments, déchets (grande chez les végétaux)' },
            { id:'M-C1', type:'methode', nom:'Observer une cellule au microscope',
              enonce:'Protocole d\'observation microscopique :\n1. Préparer la lame : placer l\'échantillon sur la lame + lamelle\n2. Coloration : Lugol (violet → amidon · noyau), Bleu de méthylène (noyau bleu)\n3. Régler le microscope : objectif ×4 → ×10 → ×40\n4. Mise au point : vis macromètrique puis micrométrique\n5. Observation et schéma annoté (titre + grandissement + légendes)\n\nGrandissement = G_objectif × G_oculaire\nEx : ×40 objectif × ×10 oculaire = ×400' },
          ],
          exercices:[
            { id:'EX-C1', niveau:'Facile', titre:'Identifier un organite',
              enonce:'Au microscope, on observe un organite vert en forme de lentille dans une cellule. Quel est cet organite ? Quelle est sa fonction ?',
              correction:'C\'est un chloroplaste (couleur verte due à la chlorophylle).\nFonction : réaliser la photosynthèse — capter l\'énergie lumineuse pour produire du glucose à partir de CO₂ et H₂O.\nIl ne se trouve que dans les cellules végétales.' },
            { id:'EX-C2', niveau:'Intermédiaire', titre:'Cellule animale ou végétale ?',
              enonce:'On observe au microscope une cellule avec : membrane plasmique, noyau, mitochondries, grande vacuole et paroi rigide. S\'agit-il d\'une cellule animale ou végétale ? Justifier.',
              correction:'C\'est une cellule végétale.\nJustification : elle possède une paroi rigide (en cellulose) et une grande vacuole centrale → caractéristiques exclusives des cellules végétales. Une cellule animale n\'a ni paroi ni grande vacuole centrale.' },
          ],
        },
        {
          notion:'🧬 Différenciation cellulaire & spécialisation',
          theoremes:[
            { id:'D-C3', type:'def', nom:'Différenciation cellulaire',
              enonce:'Toutes les cellules d\'un organisme partagent le même génome (même ADN).\n\nPourtant elles sont différentes (neurone ≠ globule rouge ≠ cellule musculaire).\n\n→ Ce phénomène s\'appelle la DIFFÉRENCIATION CELLULAIRE.\n\nMécanisme : selon le type de cellule, certains gènes de l\'ADN sont « activés » et d\'autres « silencieux ».\n→ Expression différentielle des gènes.\n\nRésultat : chaque cellule produit des protéines spécifiques qui lui confèrent sa forme et sa fonction.' },
            { id:'P-C1', type:'prop', nom:'Tissu et organe',
              enonce:'Un TISSU est un ensemble de cellules similaires qui remplissent une même fonction.\nExemples :\n• Tissu musculaire → contraction\n• Tissu nerveux → transmission de l\'influx\n• Tissu épithélial → protection & absorption\n• Tissu conjonctif → soutien\n\nUn ORGANE est formé de plusieurs tissus assemblés.\nExemples : le cœur (tissu musculaire + nerveux + conjonctif), le foie, les poumons.' },
          ],
          exercices:[
            { id:'EX-C3', niveau:'Intermédiaire', titre:'Même ADN, cellules différentes',
              enonce:'Un neurone et un lymphocyte proviennent du même organisme. Ils ont le même ADN. Comment expliquer qu\'ils soient si différents ?',
              correction:'Bien que ces deux cellules aient le même ADN, elles n\'expriment pas les mêmes gènes.\nDans le neurone : les gènes codant pour les protéines nerveuses (canaux ioniques, neurotransmetteurs) sont activés.\nDans le lymphocyte : les gènes codant pour les anticorps et récepteurs immunitaires sont activés.\nC\'est la différenciation cellulaire : expression différentielle des gènes selon le type cellulaire.' },
          ],
        },
      ],
    },
    {
      id:'sc-observation', titre:'1.2 Techniques d\'observation',
      notions:['Microscope optique','Préparations histologiques','Schéma biologique','Grandissement'],
      blocs:[
        {
          notion:'🔭 Microscope optique & grandissement',
          theoremes:[
            { id:'F-O1', type:'formule', nom:'Grandissement total',
              enonce:'G_total = G_objectif × G_oculaire\n\nExemples courants :\n• Objectif ×10, oculaire ×10 → G = ×100\n• Objectif ×40, oculaire ×10 → G = ×400\n• Objectif ×100, oculaire ×10 → G = ×1000\n\nTaille réelle de l\'objet :\nTaille réelle = taille mesurée sur le schéma ÷ grandissement\n\nEx : on mesure 2 cm sur le schéma, G = ×400 → taille réelle = 2 cm / 400 = 0,005 cm = 50 µm' },
            { id:'M-O1', type:'methode', nom:'Réaliser un schéma biologique',
              enonce:'Règles d\'un bon schéma biologique :\n✏️ Tracé au crayon à papier (pas de stylo)\n📏 Traits de légende à la règle, sans se croiser\n🏷️ Légendes horizontales à droite\n📋 Titre descriptif + grandissement + source\n\nStructure :\n[Titre : ex "Cellule végétale d\'Elodea — G×400"]\n[Schéma centré]\n[Légendes : paroi, membrane, chloroplastes, noyau, vacuole]' },
          ],
          exercices:[
            { id:'EX-O1', niveau:'Facile', titre:'Calcul de grandissement',
              enonce:'Un globule rouge mesure 7 µm en réalité. Sur un schéma, il est représenté avec un diamètre de 2,8 cm. Calculer le grandissement.',
              correction:'G = taille mesurée / taille réelle\nConversion : 7 µm = 7×10⁻⁴ cm\nG = 2,8 cm / (7×10⁻⁴ cm) = 4000\nGrandissement = ×4000' },
          ],
        },
      ],
    },
  ],
},

// ═══════════════════════════════════════════════════════════════════════
// CH.2 — MÉTABOLISME CELLULAIRE
// ═══════════════════════════════════════════════════════════════════════
'metabolisme-seconde': {
  id:'metabolisme-seconde', emoji:'⚡', badge:'La Terre & le vivant', color:'#10b981',
  titre:'Le métabolisme des cellules',
  desc:'Les cellules sont des usines chimiques en activité permanente. Elles transforment la matière et l\'énergie selon deux grands processus : la respiration cellulaire et la photosynthèse.',
  souschapitres:[
    {
      id:'sc-respiration', titre:'2.1 Respiration cellulaire',
      notions:['Mitochondrie','ATP','Glucose','Dioxygène','Dioxyde de carbone','Hétérotrophe'],
      blocs:[
        {
          notion:'💨 Respiration cellulaire — énergie pour vivre',
          theoremes:[
            { id:'D-R1', type:'def', nom:'Respiration cellulaire',
              enonce:'La respiration cellulaire est le processus par lequel les cellules dégradent le glucose pour produire de l\'énergie (ATP).\n\nLocalisation : mitochondries (et cytoplasme pour la glycolyse)\n\nCaractéristiques :\n• Nécessite du dioxygène O₂ (aérobie)\n• Produit du CO₂ et de l\'eau\n• Libère de l\'énergie sous forme d\'ATP\n\nOrganismes concernés : HÉTÉROTROPHES (animaux, champignons, bactéries et aussi les plantes la nuit)' },
            { id:'F-R1', type:'formule', nom:'Équation bilan de la respiration cellulaire',
              enonce:'C₆H₁₂O₆  +  6 O₂  →  6 CO₂  +  6 H₂O  +  ATP\n\nGlucose + Dioxygène → Dioxyde de carbone + Eau + Énergie\n\nBilan énergétique : ~30-32 ATP par molécule de glucose\n\nÉtapes :\n1. Glycolyse (cytoplasme) : glucose → pyruvate + 2 ATP\n2. Cycle de Krebs (matrice mitochondriale) : pyruvate → CO₂ + NADH\n3. Chaîne respiratoire (membrane interne mitochon.) : NADH → ATP + H₂O' },
            { id:'M-R1', type:'methode', nom:'Mettre en évidence la respiration cellulaire',
              enonce:'Expériences classiques :\n\n1. Consommation d\'O₂ : animaux dans enceinte fermée → [O₂] diminue (capteur O₂ ou eau de baryte)\n\n2. Production de CO₂ : eau de baryte (Ca(OH)₂) → se trouble en présence de CO₂\nCa(OH)₂ + CO₂ → CaCO₃ (précipité blanc) + H₂O\n\n3. Production de chaleur (organisme vivant = exothermique)\n\nContrôle : même dispositif avec objet inerte → pas de changement' },
          ],
          exercices:[
            { id:'EX-R1', niveau:'Facile', titre:'Équation de la respiration',
              enonce:'Équilibrer l\'équation : C₆H₁₂O₆ + _O₂ → _CO₂ + _H₂O\nCombien de molécules d\'O₂ sont consommées ?',
              correction:'C₆H₁₂O₆ + 6 O₂ → 6 CO₂ + 6 H₂O\n6 molécules de O₂ sont consommées par molécule de glucose.' },
            { id:'EX-R2', niveau:'Intermédiaire', titre:'Expérience eau de baryte',
              enonce:'On place des graines en germination dans un flacon fermé. On fait barboter l\'air dans de l\'eau de baryte. Après 30 min, l\'eau de baryte se trouble. Quelle conclusion tirer ?',
              correction:'L\'eau de baryte se trouble en présence de CO₂ (formation de CaCO₃ blanc insoluble).\nConclusion : les graines en germination produisent du CO₂. Elles réalisent la respiration cellulaire. La germination est une activité métabolique intense qui consomme des réserves glucidiques et libère du CO₂.' },
          ],
        },
      ],
    },
    {
      id:'sc-photosynthese', titre:'2.2 Photosynthèse',
      notions:['Chloroplaste','Chlorophylle','CO₂','Lumière','Glucose','Autotrophe'],
      blocs:[
        {
          notion:'☀️ Photosynthèse — produire sa propre matière organique',
          theoremes:[
            { id:'D-P1', type:'def', nom:'Photosynthèse',
              enonce:'La photosynthèse est le processus par lequel les plantes (et algues) convertissent l\'énergie lumineuse en énergie chimique (glucose).\n\nLocalisation : chloroplastes (grâce à la chlorophylle)\n\nCaractéristiques :\n• Nécessite de la lumière (énergie solaire)\n• Utilise CO₂ (atmosphère) et H₂O (sol)\n• Produit du glucose et libère O₂\n\nOrganismes concernés : AUTOTROPHES (plantes, algues, cyanobactéries)\n→ Producteurs primaires des écosystèmes' },
            { id:'F-P1', type:'formule', nom:'Équation bilan de la photosynthèse',
              enonce:'6 CO₂  +  6 H₂O  +  lumière  →  C₆H₁₂O₆  +  6 O₂\n\nDioxyde de carbone + Eau + Énergie lumineuse → Glucose + Dioxygène\n\nPhase lumineuse (thylakoïdes) : lumière + H₂O → O₂ + ATP + NADPH\nPhase obscure / Calvin (stroma) : CO₂ + ATP + NADPH → glucose\n\nFacteurs limitants :\n• Intensité lumineuse\n• Concentration en CO₂\n• Température (enzymes)' },
            { id:'P-P1', type:'prop', nom:'Comparaison photosynthèse vs respiration',
              enonce:'PHOTOSYNTHÈSE :\n→ Sens : CO₂ + H₂O + lumière → glucose + O₂\n→ Lieu : chloroplastes\n→ Qui : cellules végétales uniquement\n→ Bilan : stocke de l\'énergie (endothermique)\n\nRESPIRATION CELLULAIRE :\n→ Sens : glucose + O₂ → CO₂ + H₂O + ATP\n→ Lieu : mitochondries\n→ Qui : TOUTES les cellules vivantes (y compris végétaux)\n→ Bilan : libère de l\'énergie (exothermique)\n\nLes deux réactions sont inverses l\'une de l\'autre !' },
          ],
          exercices:[
            { id:'EX-P1', niveau:'Facile', titre:'Bilan de la photosynthèse',
              enonce:'Une plante reçoit de la lumière. Elle absorbe 6 mol de CO₂ et 6 mol de H₂O. Quel est le résultat de la photosynthèse ? Écrire l\'équation.',
              correction:'6 CO₂ + 6 H₂O + lumière → C₆H₁₂O₆ + 6 O₂\nLa plante produit 1 mol de glucose (C₆H₁₂O₆) et libère 6 mol de dioxygène O₂.' },
            { id:'EX-P2', niveau:'Intermédiaire', titre:'Influence de la lumière',
              enonce:'On mesure les échanges gazeux d\'une plante à l\'obscurité et à la lumière :\n• Obscurité : consomme O₂, libère CO₂\n• Lumière forte : libère O₂, consomme CO₂\nExpliquer ces observations.',
              correction:'À l\'obscurité : la plante ne peut pas réaliser la photosynthèse (pas de lumière). Elle effectue uniquement la respiration cellulaire → consomme O₂ et libère CO₂.\n\nÀ la lumière forte : la photosynthèse l\'emporte sur la respiration. Le bilan global montre une consommation de CO₂ (photosynthèse) et une libération d\'O₂ (photosynthèse > respiration).\n\nConclusion : les plantes respirent en permanence, mais font aussi la photosynthèse à la lumière.' },
          ],
        },
        {
          notion:'⚡ ATP — la monnaie énergétique du vivant',
          theoremes:[
            { id:'D-A1', type:'def', nom:'ATP : Adénosine TriPhosphate',
              enonce:'L\'ATP est la molécule universelle de transfert d\'énergie dans les cellules.\n\nStructure : Adénine + Ribose + 3 groupements phosphate\n\nFonctionnement :\nATP → ADP + Pi + ÉNERGIE utilisable\n(hydrolyse d\'une liaison phosphate libère ~30 kJ/mol)\n\nProduction :\n• Respiration cellulaire → ~30-32 ATP / glucose\n• Fermentation → 2 ATP / glucose (sans O₂)\n• Photosynthèse → ATP utilisé pour le cycle de Calvin\n\nUtilisation :\n• Travail mécanique (contraction musculaire)\n• Biosynthèse (fabriquer des molécules)\n• Transport actif (pompes ioniques)\n• Signalisation (influx nerveux)' },
          ],
          exercices:[
            { id:'EX-A1', niveau:'Facile', titre:'Rôle de l\'ATP',
              enonce:'Lors d\'une contraction musculaire, les fibres musculaires consomment de l\'ATP. Pourquoi les muscles ont-ils besoin d\'ATP ?',
              correction:'L\'ATP est la source d\'énergie directement utilisable par les cellules musculaires.\nLors de la contraction, les protéines musculaires (actine et myosine) glissent les unes sur les autres grâce à l\'hydrolyse de l\'ATP :\nATP → ADP + Pi + énergie → mouvement des filaments protéiques → contraction.\nSans ATP, les muscles ne peuvent pas se contracter (rigidité cadavérique = épuisement de l\'ATP après la mort).' },
          ],
        },
      ],
    },
  ],
},

// ═══════════════════════════════════════════════════════════════════════
// CH.3 — BIODIVERSITÉ & ÉVOLUTION
// ═══════════════════════════════════════════════════════════════════════
'biodiversite-evolution-seconde': {
  id:'biodiversite-evolution-seconde', emoji:'🌿', badge:'La Terre & le vivant', color:'#16a34a',
  titre:'Biodiversité et évolution',
  desc:'La Terre abrite une diversité extraordinaire du vivant. Ce chapitre explore comment cette biodiversité s\'est construite au fil du temps grâce à l\'évolution.',
  souschapitres:[
    {
      id:'sc-biodiversite', titre:'3.1 Échelles de la biodiversité',
      notions:['Diversité génétique','Diversité spécifique','Diversité des écosystèmes','Espèce','Inventaire'],
      blocs:[
        {
          notion:'🌍 Les 3 niveaux de la biodiversité',
          theoremes:[
            { id:'D-B1', type:'def', nom:'Biodiversité — 3 niveaux',
              enonce:'La BIODIVERSITÉ désigne la diversité du vivant à 3 échelles :\n\n1. DIVERSITÉ GÉNÉTIQUE :\n→ Variabilité des gènes au sein d\'une même espèce\n→ Exemple : différentes races de chiens, couleurs de pelage\n→ Outil : séquençage ADN, allèles\n\n2. DIVERSITÉ SPÉCIFIQUE :\n→ Nombre d\'espèces différentes dans un milieu\n→ ~8,7 millions d\'espèces estimées sur Terre (dont ~1,9 M décrites)\n→ Outil : inventaires, classification binomiale (Homo sapiens)\n\n3. DIVERSITÉ DES ÉCOSYSTÈMES :\n→ Variété des milieux de vie (forêt, récif corallien, savane…)\n→ Chaque écosystème = ensemble d\'espèces + environnement physique' },
            { id:'P-B1', type:'prop', nom:'Biodiversité en chiffres',
              enonce:'Quelques ordres de grandeur :\n• ~1,9 million d\'espèces décrites (sur ~8,7 millions estimées)\n• ~300 000 espèces végétales connues\n• Insectes : ~1 million d\'espèces décrites (la moitié du vivant décrit)\n• Bactéries : 10³⁰ individus sur Terre\n• Taux d\'extinction actuel : 100 à 1000× supérieur au taux naturel\n→ 6ème extinction de masse en cours (due à l\'activité humaine)' },
          ],
          exercices:[
            { id:'EX-B1', niveau:'Facile', titre:'Identifier le niveau de biodiversité',
              enonce:'Pour chaque situation, indiquer le niveau de biodiversité (génétique, spécifique ou écosystémique) :\na) Une forêt tropicale contient 300 espèces d\'arbres différentes.\nb) Deux individus du même pommier ont des pommes de tailles différentes.\nc) On compare un lac, une prairie et un désert.',
              correction:'a) Diversité SPÉCIFIQUE → nombreuses espèces différentes dans ce milieu.\nb) Diversité GÉNÉTIQUE → variabilité entre individus de la même espèce.\nc) Diversité des ÉCOSYSTÈMES → différents types de milieux de vie.' },
          ],
        },
      ],
    },
    {
      id:'sc-evolution', titre:'3.2 Mécanismes de l\'évolution',
      notions:['Sélection naturelle','Dérive génétique','Mutation','Adaptation','Fossile','Phylogénie'],
      blocs:[
        {
          notion:'🦋 Sélection naturelle (Darwin, 1859)',
          theoremes:[
            { id:'D-SN1', type:'def', nom:'Sélection naturelle',
              enonce:'La SÉLECTION NATURELLE est le mécanisme principal de l\'évolution, théorisé par Charles Darwin (1859) dans "L\'Origine des espèces".\n\nPrincipe en 4 étapes :\n1. VARIATION : les individus d\'une population sont différents (due aux mutations)\n2. HÉRÉDITÉ : les caractères se transmettent aux descendants\n3. LUTTE POUR L\'EXISTENCE : ressources limitées → compétition\n4. SURVIE DES PLUS ADAPTÉS : les individus mieux adaptés à leur milieu survivent et se reproduisent plus\n→ Leurs gènes se répandent dans la population\n\nExemple classique : Biston betularia (papillon poivré) en Angleterre industrielle' },
            { id:'D-SN2', type:'def', nom:'Dérive génétique',
              enonce:'La DÉRIVE GÉNÉTIQUE est une modification aléatoire des fréquences alléliques au sein d\'une petite population.\n\nCaractéristiques :\n• Phénomène aléatoire (pas de direction)\n• D\'autant plus fort que la population est petite\n• Peut faire disparaître des allèles par hasard\n\nEffet fondateur : une petite population colonisatrice → peu d\'allèles → dérive forte\nEx : Amish de Pennsylvanie — polydactylie sur-représentée\n\nGoulot d\'étranglement : catastrophe → population réduite → perte de diversité génétique\nEx : guépard — très faible diversité génétique' },
            { id:'M-SN1', type:'methode', nom:'Lire un arbre phylogénétique',
              enonce:'Un arbre phylogénétique représente les relations de parenté entre espèces.\n\n🌳 LECTURE :\n• Nœud : ancêtre commun\n• Branche : lignée évolutive\n• Plus deux espèces partagent un nœud récent → plus elles sont proches\n• La racine = ancêtre commun à toutes les espèces représentées\n\nExemple : (([Chimpanzé, Gorille], Orang-outan), Gibbon)\n→ Chimpanzé et Gorille sont plus proches parents qu\'avec l\'orang-outan\n→ L\'homme partage 98,7% de son ADN avec le chimpanzé' },
          ],
          exercices:[
            { id:'EX-SN1', niveau:'Facile', titre:'Sélection naturelle du papillon poivré',
              enonce:'Avant industrialisation, le papillon Biston betularia était majoritairement blanc (camouflé sur écorce claire). Après industrialisation (suie noircit les troncs), la forme noire est devenue dominante. Expliquer.',
              correction:'Avant industrialisation :\n• Les papillons blancs sont camouflés sur les écorces claires → survivent mieux\n• Les papillons noirs sont visibles → prédatés davantage → rares\n\nAprès industrialisation (suie sur troncs) :\n• Les papillons noirs sont camouflés → survivent mieux et se reproduisent plus\n• Les papillons blancs sont visibles → éliminés par prédation\n→ La sélection naturelle favorise la forme noire : sa fréquence augmente.\nC\'est un exemple direct de l\'adaptation et de la sélection naturelle.' },
            { id:'EX-SN2', niveau:'Intermédiaire', titre:'Dérive génétique — effet fondateur',
              enonce:'Une population de 5 individus colonise une île. Dans la population d\'origine, l\'allèle A (groupe sanguin A) est présent à 40%. Par hasard, dans les 5 fondateurs, aucun ne porte cet allèle. Que va-t-il se passer ?',
              correction:'C\'est l\'effet fondateur, cas extrême de dérive génétique.\nL\'allèle A est absent des 5 fondateurs → il ne peut pas être transmis.\nSur l\'île, toute la population sera dépourvue de l\'allèle A (fréquence = 0%).\nCela est dû au hasard de l\'échantillonnage (petite population) et non à une sélection.\nLa diversité génétique de cette île est réduite par rapport à la population d\'origine.' },
          ],
        },
      ],
    },
  ],
},

// ═══════════════════════════════════════════════════════════════════════
// CH.4 — COMMUNICATION & SÉLECTION SEXUELLE
// ═══════════════════════════════════════════════════════════════════════
'communication-selection-sexuelle': {
  id:'communication-selection-sexuelle', emoji:'🦚', badge:'La Terre & le vivant', color:'#84cc16',
  titre:'Communication intraspécifique & sélection sexuelle',
  desc:'Les animaux communiquent pour trouver un partenaire, défendre un territoire ou coordonner leurs activités. La sélection sexuelle est une forme particulière de sélection naturelle.',
  souschapitres:[
    {
      id:'sc-communication', titre:'4.1 Signaux de communication',
      notions:['Phéromones','Signaux sonores','Signaux visuels','Communication animale'],
      blocs:[
        {
          notion:'📡 Types de signaux de communication intraspécifique',
          theoremes:[
            { id:'D-COM1', type:'def', nom:'Communication intraspécifique',
              enonce:'La communication INTRASPÉCIFIQUE désigne les échanges de signaux entre individus de la MÊME espèce.\n\n3 grands types de signaux :\n\n🧪 CHIMIQUES (phéromones) :\n• Molécules émises dans l\'environnement\n• Reçues par l\'olfaction (antennes des insectes)\n• Exemples : phéromones sexuelles du bombyx (papillon) → mâle détecte à 10 km\n• Phéromones d\'alarme chez les fourmis\n\n🔊 SONORES :\n• Chant des oiseaux (marquage territoire + attraction partenaire)\n• Ultrasons des chauves-souris et des dauphins\n• Bourdonnement des abeilles\n\n👁️ VISUELS :\n• Coloration vive (queue du paon)\n• Postures corporelles\n• Bioluminescence (luciole)' },
            { id:'D-COM2', type:'def', nom:'Sélection sexuelle',
              enonce:'La SÉLECTION SEXUELLE est une forme de sélection naturelle liée au choix du partenaire pour la reproduction.\n\nThéorisée par Darwin (1871) — "La Filiation de l\'homme".\n\n2 mécanismes :\n\n1. COMPÉTITION INTRASEXUELLE (entre mâles) :\n→ Combats, tournois → le mâle le plus fort obtient les femelles\n→ Ex : cerfs (bois), lions (crinière), éléphants de mer\n\n2. SÉLECTION INTERSEXUELLE (choix de la femelle) :\n→ Femelle choisit le mâle selon des critères (plumage, chant, danse)\n→ Ex : paon (queue), paradisier, grenouille (chant)\n\nParadoxe de Zahavi : ornements coûteux = signal honnête de bonne santé génétique' },
          ],
          exercices:[
            { id:'EX-COM1', niveau:'Facile', titre:'Type de signal',
              enonce:'Classer chaque signal en chimique, sonore ou visuel :\na) La queue du paon mâle\nb) Les phéromones de la lionne en chaleur\nc) Le chant du rossignol au printemps\nd) La bioluminescence de la luciole femelle',
              correction:'a) Visuel — la queue colorée est un signal visuel destiné aux femelles paon.\nb) Chimique — les phéromones sont des molécules chimiques détectées par l\'olfaction.\nc) Sonore — le chant est un signal acoustique de marquage du territoire et d\'attraction.\nd) Visuel — la lumière produite est un signal visuel (bioluminescence).' },
          ],
        },
      ],
    },
  ],
},

// ═══════════════════════════════════════════════════════════════════════
// CH.5 — GÉOSCIENCES & PAYSAGES
// ═══════════════════════════════════════════════════════════════════════
'geosciences-paysages': {
  id:'geosciences-paysages', emoji:'🏔️', badge:'Enjeux contemporains', color:'#f59e0b',
  titre:'Géosciences & dynamique des paysages',
  desc:'Les paysages terrestres se forment et évoluent sous l\'action de l\'eau, du vent et de la gravité. Ce chapitre explore les processus d\'érosion, transport et sédimentation.',
  souschapitres:[
    {
      id:'sc-erosion-nat', titre:'5.1 Érosion et formation des paysages',
      notions:['Érosion','Altération','Transport sédimentaire','Sédimentation','Roches'],
      blocs:[
        {
          notion:'🌊 Les processus d\'érosion',
          theoremes:[
            { id:'D-E1', type:'def', nom:'Érosion et sédimentation',
              enonce:'L\'ÉROSION est l\'ensemble des processus qui dégradent et transportent les matériaux rocheux.\n\nÉtapes du cycle érosif :\n\n1. ALTÉRATION des roches :\n• Mécanique : gel/dégel, variations thermiques, racines\n• Chimique : dissolution par l\'eau acide (CO₂ + H₂O → H₂CO₃)\nEx : calcaires → grottes, karst\n\n2. TRANSPORT des sédiments :\n• Par l\'eau (rivières, ruissellement)\n• Par le vent (éolien)\n• Par la glace (glaciaire)\n• Par la gravité (éboulements)\n\n3. SÉDIMENTATION :\n• Dépôt des sédiments dans des bassins (mer, lac, plaine)\n• Ordre de dépôt : couches les plus récentes au-dessus (principe de superposition)' },
            { id:'M-E1', type:'methode', nom:'Lire une carte géologique',
              enonce:'Une carte géologique représente les roches affleurant en surface.\n\nLecture :\n• Couleurs → types de roches (légende obligatoire)\n• Symboles → pendage des couches (direction + inclinaison)\n• Lignes → failles, contacts géologiques\n\nPrincipes de lecture :\n• Superposition : couches les + récentes au-dessus\n• Horizontalité initiale : couches déposées horizontalement\n• Recoupement : un filon recoupe ce qui existait avant → plus jeune\n\nEx : granite recoupé par un filon de basalte → basalte plus jeune' },
          ],
          exercices:[
            { id:'EX-E1', niveau:'Facile', titre:'Ordre des couches géologiques',
              enonce:'Un affleurement montre (de bas en haut) : calcaire, grès, argile. Quelle est la couche la plus ancienne ? La plus récente ? Quel principe utilise-t-on ?',
              correction:'Couche la plus ancienne : calcaire (au fond = déposé en premier).\nCouche la plus récente : argile (au sommet = déposée en dernier).\nPrincipe utilisé : principe de superposition — dans une série sédimentaire non renversée, les couches les plus récentes sont au-dessus.' },
          ],
        },
      ],
    },
  ],
},

// ═══════════════════════════════════════════════════════════════════════
// CH.6 — ÉROSION & ACTIVITÉ HUMAINE
// ═══════════════════════════════════════════════════════════════════════
'erosion-humaine': {
  id:'erosion-humaine', emoji:'🏭', badge:'Enjeux contemporains', color:'#f97316',
  titre:'Érosion & activité humaine',
  desc:'L\'homme accélère considérablement les processus naturels d\'érosion. Déforestation, urbanisation et agriculture intensive modifient profondément les paysages et génèrent des risques.',
  souschapitres:[
    {
      id:'sc-impact-humain', titre:'6.1 Impact humain sur les paysages',
      notions:['Déforestation','Urbanisation','Agriculture intensive','Pollution des sols','Risques naturels'],
      blocs:[
        {
          notion:'🌲 Déforestation et ses conséquences',
          theoremes:[
            { id:'D-DH1', type:'def', nom:'Impact humain sur l\'érosion',
              enonce:'L\'activité humaine accélère l\'érosion naturelle :\n\n🌲 DÉFORESTATION :\n→ Suppression du couvert végétal → racines ne retiennent plus le sol\n→ Ruissellement × 10 à × 100 → érosion massive\n→ Perte de biodiversité + désertification\n→ 15 millions d\'hectares/an détruits (Amazonie, Bornéo)\n\n🏗️ URBANISATION :\n→ Imperméabilisation des sols (béton, asphalte)\n→ Ruissellement rapide → risque d\'inondation\n→ Pollution des nappes phréatiques\n\n🌾 AGRICULTURE INTENSIVE :\n→ Labour profond → destruction de la structure du sol\n→ Pesticides et engrais → pollution des eaux\n→ Surpâturage → érosion éolienne' },
            { id:'P-DH1', type:'prop', nom:'Gestion des risques naturels',
              enonce:'Les risques naturels liés à l\'érosion :\n• Inondations (crues éclair)\n• Glissements de terrain\n• Coulées de boue\n• Érosion côtière\n\nMesures de protection :\n✅ Reboisement (maintenir les sols)\n✅ Terrasses agricoles (retenir l\'eau)\n✅ Haies bocagères (ralentir ruissellement)\n✅ Zones inondables protégées\n✅ Plan de Prévention des Risques (PPR)\n✅ Systèmes d\'alerte précoce' },
          ],
          exercices:[
            { id:'EX-DH1', niveau:'Intermédiaire', titre:'Déforestation et inondations',
              enonce:'Dans une région montagneuse, on observe qu\'après la déforestation, les crues fluviales sont plus fréquentes et plus intenses. Comment expliquer ce lien ?',
              correction:'Avant déforestation :\n• Les racines des arbres retiennent le sol et absorbent l\'eau\n• Les arbres ralentissent le ruissellement en surface\n• L\'eau s\'infiltre lentement dans le sol\n\nAprès déforestation :\n• Pas de racines → sol meuble et non retenu\n• Plus d\'absorption → l\'eau ruisselle directement\n• Ruissellement rapide et massif → rivières se remplissent très vite\n→ Crues plus fréquentes, plus intenses, emportant la terre (coulées de boue)\nConclusion : la déforestation rompt le cycle de l\'eau et aggrave les risques d\'inondation.' },
          ],
        },
      ],
    },
  ],
},

// ═══════════════════════════════════════════════════════════════════════
// CH.7 — AGROSYSTÈMES & DÉVELOPPEMENT DURABLE
// ═══════════════════════════════════════════════════════════════════════
'agrosystemes': {
  id:'agrosystemes', emoji:'🌾', badge:'Enjeux contemporains', color:'#a16207',
  titre:'Agrosystèmes & développement durable',
  desc:'Comment nourrir 8 milliards d\'humains sans détruire la planète ? Ce chapitre étudie le fonctionnement des agrosystèmes et les solutions pour une agriculture durable.',
  souschapitres:[
    {
      id:'sc-agro', titre:'7.1 Fonctionnement des agrosystèmes',
      notions:['Agrosystème','Biomasse','Sols agricoles','Engrais','Biodiversité agricole'],
      blocs:[
        {
          notion:'🌱 L\'agrosystème — un écosystème modifié par l\'homme',
          theoremes:[
            { id:'D-AG1', type:'def', nom:'Agrosystème vs écosystème naturel',
              enonce:'Un AGROSYSTÈME est un écosystème artificialisé par l\'homme pour produire des aliments.\n\nDifférences avec un écosystème naturel :\n\n| | Écosystème naturel | Agrosystème |\n|---|---|---|\n| Énergie | Soleil seulement | Soleil + énergie fossile |\n| Biodiversité | Élevée | Faible (monoculture) |\n| Cycles | Bouclés (recyclage) | Ouverts (exportation) |\n| Entretien | Automatique | Travail humain |\n| Stabilité | Haute | Faible (fragilité) |\n\nProblème principal : en exportant les récoltes, on exporte les minéraux du sol\n→ Nécessité d\'apporter des engrais pour compenser' },
            { id:'D-AG2', type:'def', nom:'Engrais et fertilité des sols',
              enonce:'Les ENGRAIS compensent les pertes minérales causées par les récoltes.\n\nÉléments essentiels pour les plantes :\n• N (azote) → croissance végétative, chlorophylle\n• P (phosphore) → racines, fleurs, fruits\n• K (potassium) → résistance aux maladies, qualité fruits\nEngrais NPK = formule complète\n\n2 types d\'engrais :\n🌿 ORGANIQUES : compost, fumier, lisier\n→ Améliorent la structure du sol + biodiversité\n→ Libération lente des minéraux\n\n⚗️ MINÉRAUX (synthétiques) : urée, superphosphate\n→ Efficacité rapide et précise\n→ Risque de pollution si excès (nitrates dans eaux)' },
          ],
          exercices:[
            { id:'EX-AG1', niveau:'Intermédiaire', titre:'Agrosystème maïs',
              enonce:'Un champ de maïs produit 10 tonnes de grain/ha/an. Ces grains sont vendus et exportés. Pourquoi le paysan doit-il apporter des engrais chaque année ? Quels risques cela pose-t-il pour l\'environnement ?',
              correction:'Chaque année, l\'exportation des récoltes (grains) emporte hors du champ :\n• Des minéraux (N, P, K) extraits du sol par la plante\n• De la matière organique\n→ Contrairement à un écosystème naturel où les matières mortes restent sur place et se recyclent, ici les éléments sont perdus définitivement.\n\nSans engrais, le sol s\'appauvrît et les rendements chutent.\n\nRisques environnementaux des engrais minéraux :\n• Excess d\'azote → nitrates dans les nappes phréatiques → eau impropre à la consommation\n• Ruissellement → eutrophisation des rivières et lacs (algues qui étouffent la vie aquatique)\n• Émissions de N₂O (gaz à effet de serre)' },
          ],
        },
      ],
    },
  ],
},

// ═══════════════════════════════════════════════════════════════════════
// CH.8 — FÉCONDATION & PUBERTÉ
// ═══════════════════════════════════════════════════════════════════════
'fecondation-puberte': {
  id:'fecondation-puberte', emoji:'👶', badge:'Corps humain & santé', color:'#ec4899',
  titre:'De la fécondation à la puberté',
  desc:'La reproduction humaine est un processus biologique complexe impliquant hormones, gamètes et développement embryonnaire. Ce chapitre explore la mise en place du corps humain.',
  souschapitres:[
    {
      id:'sc-repro', titre:'8.1 Fécondation et développement',
      notions:['Fécondation','Gamètes','Embryon','Puberté','Hormones sexuelles','Appareils reproducteurs'],
      blocs:[
        {
          notion:'🧬 La fécondation et le développement embryonnaire',
          theoremes:[
            { id:'D-F1', type:'def', nom:'Fécondation et zygote',
              enonce:'La FÉCONDATION est la fusion d\'un gamète mâle (spermatozoïde) avec un gamète femelle (ovocyte) pour former un ZYGOTE.\n\nCaractéristiques :\n• Spermatozoïde (n chromosomes) + Ovocyte (n chromosomes) → Zygote (2n = 46 chromosomes)\n• Lieu : trompe de Fallope\n• Résultat : rétablissement du nombre diploïde (2n)\n• Génotype unique car combinaison des allèles paternels et maternels\n\nDéveloppement embryonnaire :\n1. Zygote → divisions cellulaires (mitoses)\n2. Morula → Blastocyte → Gastrula\n3. Implantation dans la muqueuse utérine (~J7)\n4. Formation des feuillets embryonnaires → organes' },
            { id:'D-F2', type:'def', nom:'Puberté et caractères sexuels',
              enonce:'La PUBERTÉ est la période de maturation sexuelle permettant la reproduction.\n\nHOMMME :\n• Âge moyen : 11-13 ans\n• Hormones : testostérone (testicules)\n• Caractères sexuels secondaires : pilosité, mue de la voix, développement musculaire, production de spermatozoïdes\n\nFEMME :\n• Âge moyen : 10-12 ans\n• Hormones : œstrogènes et progestérone (ovaires)\n• Caractères sexuels secondaires : développement des seins, hanches, apparition des règles (ménarche)\n\nCaractères sexuels PRIMAIRES = organes génitaux (présents dès la naissance)\nCaractères sexuels SECONDAIRES = apparaissent à la puberté' },
          ],
          exercices:[
            { id:'EX-F1', niveau:'Facile', titre:'Fécondation et caryotype',
              enonce:'Un spermatozoïde contient 23 chromosomes. Un ovocyte contient 23 chromosomes. Combien de chromosomes contient le zygote formé ? Quelle est la formule chromosomique ?',
              correction:'Le zygote contient 23 + 23 = 46 chromosomes.\nFormule chromosomique : 2n = 46 chromosomes (23 paires homologues).\nParmi ces paires : 22 paires d\'autosomes + 1 paire de chromosomes sexuels (XX pour une fille ou XY pour un garçon).' },
          ],
        },
      ],
    },
  ],
},

// ═══════════════════════════════════════════════════════════════════════
// CH.9 — HORMONES, CERVEAU & SANTÉ
// ═══════════════════════════════════════════════════════════════════════
'cerveau-sante': {
  id:'cerveau-sante', emoji:'🧠', badge:'Corps humain & santé', color:'#8b5cf6',
  titre:'Hormones, cerveau, agents pathogènes & microbiote',
  desc:'La santé humaine dépend d\'un équilibre délicat entre hormones, système nerveux, défenses immunitaires et microbiote intestinal. Ce chapitre explore ces systèmes de régulation.',
  souschapitres:[
    {
      id:'sc-hormones', titre:'9.1 Hormones et procréation',
      notions:['Testostérone','Œstrogènes','Cycle menstruel','GnRH','LH','FSH'],
      blocs:[
        {
          notion:'⚗️ Principales hormones sexuelles',
          theoremes:[
            { id:'D-H1', type:'def', nom:'Hormones sexuelles — rôles',
              enonce:'Les HORMONES SEXUELLES sont des molécules chimiques produites par les gonades et régulées par l\'hypothalamus et l\'hypophyse.\n\n🔵 TESTOSTÉRONE (homme) :\n• Produite par les testicules (cellules de Leydig)\n• Rôles : spermatogenèse, caractères sexuels secondaires (pilosité, voix grave, musculature)\n• Régulation : GnRH (hypothalamus) → LH (hypophyse) → testostérone\n\n🔴 ŒSTROGÈNES (femme) :\n• Produits par les ovaires (follicules)\n• Rôles : développement sein, cycle utérin, caractères sexuels secondaires\n• Varient au cours du cycle menstruel (28 jours)\n\n🟡 PROGESTÉRONE (femme) :\n• Produite par le corps jaune (après ovulation)\n• Rôle : préparation de l\'utérus à la grossesse' },
          ],
          exercices:[
            { id:'EX-H1', niveau:'Facile', titre:'Identifier une hormone',
              enonce:'Chez un adolescent, on observe : développement de la barbe, mue de la voix, développement musculaire. Quelle hormone est responsable ? Où est-elle produite ?',
              correction:'L\'hormone responsable est la TESTOSTÉRONE.\nElle est produite par les testicules (plus précisément par les cellules de Leydig).\nCes caractères (barbe, voix grave, musculature) sont des caractères sexuels secondaires masculins qui apparaissent à la puberté sous l\'effet de la testostérone.' },
          ],
        },
        {
          notion:'🦠 Agents pathogènes et microbiote',
          theoremes:[
            { id:'D-M1', type:'def', nom:'Agents pathogènes — types et exemples',
              enonce:'Un AGENT PATHOGÈNE est un organisme capable de provoquer une maladie.\n\n4 types principaux :\n\n🦠 VIRUS :\n• Non vivants (pas de métabolisme propre)\n• Parasites obligatoires des cellules\n• Exemples : grippe (Influenzavirus), VIH, Covid-19 (SARS-CoV-2), dengue\n• Traitement : antiviraux, vaccins\n\n🧫 BACTÉRIES :\n• Organismes procaryotes unicellulaires\n• Exemple : tuberculose (Mycobacterium), angine à streptocoque\n• Traitement : antibiotiques\n\n🐛 PARASITES :\n• Organismes eucaryotes\n• Exemples : paludisme (Plasmodium falciparum, vecteur : moustique Anophèle), tænia\n• Maladies vectorielles : transmises par un vecteur (insecte)\n\n🍄 CHAMPIGNONS :\n• Mycoses, candidoses\n• Traitement : antifongiques' },
            { id:'D-M2', type:'def', nom:'Microbiote humain',
              enonce:'Le MICROBIOTE humain est l\'ensemble des micro-organismes (bactéries, virus, champignons) vivant dans ou sur notre corps en symbiose.\n\nChiffres clés :\n• ~38 000 milliards de bactéries dans notre corps (autant que nos propres cellules !)\n• Le microbiote intestinal représente 1,5 à 2 kg\n\nRôles essentiels :\n• Digestion : dégradation fibres, production vitamines (K, B12)\n• Immunité : entraîne le système immunitaire dès la naissance\n• Protection : empêche la colonisation par des pathogènes (effet barrière)\n• Santé mentale : axe intestin-cerveau (production sérotonine)\n\nDéséquilibre (dysbiose) → maladies inflammatoires, obésité, dépression, allergies' },
          ],
          exercices:[
            { id:'EX-M1', niveau:'Intermédiaire', titre:'Paludisme — maladie vectorielle',
              enonce:'Le paludisme est causé par Plasmodium falciparum, transmis par le moustique Anophèle femelle. Pourquoi dit-on que c\'est une maladie vectorielle ? Quels moyens de prévention existent ?',
              correction:'Le paludisme est dit VECTORIEL car l\'agent pathogène (Plasmodium) est transmis à l\'homme par un VECTEUR : le moustique Anophèle femelle qui pique lors d\'un repas sanguin.\n\nCycle : moustique infecté → piqûre → Plasmodium dans le sang → foie → globules rouges → symptômes (fièvre, frissons, anémie).\n\nMoyens de prévention :\n• Moustiquaires imprégnées d\'insecticide (barrière physique + chimique)\n• Répulsifs cutanés (DEET)\n• Médicaments antipaludiques (prophylaxie)\n• Elimination des gîtes larvaires (eaux stagnantes)\n• Vaccin RTS,S (première approbation OMS 2021)' },
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

export default function SVTSecondeSlugPage() {
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
            <div style={{ fontSize:48, marginBottom:16 }}>🌿</div>
            <h1>Chapitre non trouvé</h1>
            <p style={{ color:'var(--muted)', marginBottom:24 }}>Le chapitre « {slug} » n'existe pas encore.</p>
            <Link href="/bac-france/svt/seconde" className="btn btn-primary">← Retour Seconde SVT</Link>
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
            <Link href="/bac-france/svt/seconde" style={{ color:'var(--muted)', textDecoration:'none' }}>Seconde</Link>
            <span>›</span>
            <span style={{ color:secColor }}>{chapter.emoji} {chapter.titre}</span>
          </div>

          {/* Header chapitre */}
          <div style={{ marginBottom:28 }}>
            <div style={{ display:'flex', gap:8, flexWrap:'wrap', marginBottom:10 }}>
              <span style={{ fontSize:11, fontFamily:'var(--font-mono)', fontWeight:700, color:secColor }}>CH.0{idx+1}</span>
              <span className="label">{chapter.badge}</span>
              <span style={{ fontSize:11, padding:'2px 9px', borderRadius:20, background:'rgba(34,197,94,0.15)', color:'#86efac', fontWeight:700 }}>Seconde</span>
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
                  {/* En-tête sous-chapitre */}
                  <div style={{ marginBottom:20, padding:'14px 18px', background:`${secColor}0a`, border:`1px solid ${secColor}25`, borderRadius:12 }}>
                    <div style={{ fontSize:11, color:'var(--muted)', marginBottom:4, textTransform:'uppercase', letterSpacing:'0.08em' }}>Sous-chapitre actif</div>
                    <div style={{ fontSize:16, fontWeight:800, color:secColor }}>{currentSC.titre}</div>
                    <div style={{ display:'flex', flexWrap:'wrap', gap:5, marginTop:8 }}>
                      {currentSC.notions.map(n => (
                        <span key={n} style={{ fontSize:10, padding:'2px 9px', borderRadius:14, background:`${secColor}15`, color:'var(--text2)', border:`1px solid ${secColor}20` }}>{n}</span>
                      ))}
                    </div>
                  </div>

                  {/* Blocs notion par notion */}
                  {currentSC.blocs.map(bloc => (
                    <div key={bloc.notion} style={{ marginBottom:36 }}>
                      <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:14, paddingBottom:8, borderBottom:`2px solid ${secColor}20` }}>
                        <div style={{ width:3, height:22, background:secColor, borderRadius:2 }}/>
                        <h2 style={{ fontSize:15, fontWeight:800, color:'var(--text)', margin:0 }}>{bloc.notion}</h2>
                      </div>

                      {/* Théorèmes / Définitions */}
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

                      {/* Exercices */}
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
                                <Link href={`/solve?q=${encodeURIComponent('Seconde SVT — '+ex.enonce)}`} className="btn btn-primary" style={{ fontSize:11, padding:'5px 12px' }}>
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
                  <Link href={`/bac-france/svt/seconde/${prevSlug}`} style={{ textDecoration:'none' }}>
                    <div className="card" style={{ padding:'12px 15px', transition:'transform 0.15s' }}
                      onMouseEnter={e=>e.currentTarget.style.transform='translateY(-2px)'}
                      onMouseLeave={e=>e.currentTarget.style.transform='translateY(0)'}>
                      <div style={{ fontSize:10, color:'var(--muted)', marginBottom:2 }}>← Précédent</div>
                      <div style={{ fontWeight:700, fontSize:12 }}>{TITRES_NAV[prevSlug]}</div>
                    </div>
                  </Link>
                ) : <div/>}
                {nextSlug ? (
                  <Link href={`/bac-france/svt/seconde/${nextSlug}`} style={{ textDecoration:'none' }}>
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
                  🌱 Seconde SVT — 9 chapitres
                </div>
                {NAV_ORDER.map((s,i) => (
                  <Link key={s} href={`/bac-france/svt/seconde/${s}`} style={{ textDecoration:'none' }}>
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

              {/* Actions */}
              <div style={{ background:'var(--surface)', border:'1px solid var(--border)', borderRadius:12, padding:'13px' }}>
                <div style={{ fontSize:11, color:'var(--muted)', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:9 }}>Actions</div>
                <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
                  <Link href={`/chat?q=${encodeURIComponent('Explique-moi '+chapter.titre+' en Seconde SVT')}`} className="btn btn-primary" style={{ textAlign:'center', fontSize:12 }}>
                    🤖 Chat IA — SVT
                  </Link>
                  <Link href="/solve" className="btn btn-secondary" style={{ textAlign:'center', fontSize:12 }}>🌱 Solveur SVT</Link>
                  <Link href="/bac-france/svt/seconde" className="btn btn-secondary" style={{ textAlign:'center', fontSize:12 }}>↩ Tous les chapitres</Link>
                  <Link href="/bac-france/svt/premiere" className="btn btn-secondary" style={{ textAlign:'center', fontSize:12 }}>📗 Première SVT →</Link>
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
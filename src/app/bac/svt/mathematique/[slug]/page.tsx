'use client'

import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import { useParams } from 'next/navigation'

// ══════════════════════════════════════════════════════════════════════
// SVT — SECTION MATHÉMATIQUES / [SLUG]
// Route : /bac/svt/mathematique/[slug]
// Programme officiel MEN Tunisie · 4ème année Section Maths
// 13 chapitres : Génétique · Milieu intérieur · Reproduction · Nutrition · Géologie & Évol.
// ══════════════════════════════════════════════════════════════════════

const C = { thm: '#06b6d4', def: '#4ade80', formule: '#f59e0b', prop: '#8b5cf6', methode: '#ec4899', loi: '#f97316' }
const L: Record<string, string> = { thm: 'Théorème', def: 'Définition', formule: 'Formule clé', prop: 'Propriété', methode: 'Méthode', loi: 'Loi' }

const NAV_ORDER = [
  'brassage-genetique-maths', 'transmission-hereditaire-maths',
  'milieu-interieur-maths', 'regulation-glycemie-maths', 'systeme-nerveux-maths',
  'defense-organisme-maths', 'hygiene-sn-maths',
  'fonction-reproductrice-homme-maths', 'fonction-reproductrice-femme-maths', 'fecondation-procreation-maths',
  'nutrition-animale-maths', 'nutrition-vegetale-maths',
  'evolution-geologie-maths',
]

const TITRES_NAV: Record<string, string> = {
  'brassage-genetique-maths':           'CH 01 — Brassage de l\'information génétique',
  'transmission-hereditaire-maths':     'CH 02 — Transmission et hérédité',
  'milieu-interieur-maths':             'CH 03 — La constance du milieu intérieur',
  'regulation-glycemie-maths':          'CH 04 — La régulation de la glycémie',
  'systeme-nerveux-maths':              'CH 05 — Le système nerveux et la régulation',
  'defense-organisme-maths':            'CH 06 — Défense de l\'organisme',
  'hygiene-sn-maths':                   'CH 07 — Hygiène du système nerveux',
  'fonction-reproductrice-homme-maths': 'CH 08 — Fonction reproductrice chez l\'homme',
  'fonction-reproductrice-femme-maths': 'CH 09 — Fonction reproductrice chez la femme',
  'fecondation-procreation-maths':      'CH 10 — La fécondation et la procréation',
  'nutrition-animale-maths':            'CH 11 — Nutrition animale',
  'nutrition-vegetale-maths':           'CH 12 — Nutrition végétale',
  'evolution-geologie-maths':           'CH 13 — Évolution biologique & Géologie',
}

const SEC_COLORS: Record<string, string> = {
  'brassage-genetique-maths': '#4f6ef7',
  'transmission-hereditaire-maths': '#8b5cf6',
  'milieu-interieur-maths': '#10b981',
  'regulation-glycemie-maths': '#f59e0b',
  'systeme-nerveux-maths': '#06b6d4',
  'defense-organisme-maths': '#8b5cf6',
  'hygiene-sn-maths': '#ec4899',
  'fonction-reproductrice-homme-maths': '#4f6ef7',
  'fonction-reproductrice-femme-maths': '#ec4899',
  'fecondation-procreation-maths': '#f59e0b',
  'nutrition-animale-maths': '#10b981',
  'nutrition-vegetale-maths': '#22c55e',
  'evolution-geologie-maths': '#f97316',
}

const THEME_SLUGS: Record<string, string[]> = {
  'Thème I — Génétique':         ['brassage-genetique-maths', 'transmission-hereditaire-maths'],
  'Thème II — Milieu intérieur': ['milieu-interieur-maths', 'regulation-glycemie-maths', 'systeme-nerveux-maths', 'defense-organisme-maths', 'hygiene-sn-maths'],
  'Thème III — Reproduction':    ['fonction-reproductrice-homme-maths', 'fonction-reproductrice-femme-maths', 'fecondation-procreation-maths'],
  'Thème IV — Nutrition':        ['nutrition-animale-maths', 'nutrition-vegetale-maths'],
  'Thème V — Géologie & Évol.':  ['evolution-geologie-maths'],
}

type Thm  = { id: string; type: string; nom: string; enonce: string; remarque?: string }
type Exo  = { id: string; niveau: string; titre: string; enonce: string; correction: string }
type Bloc = { notion: string; theoremes: Thm[]; exercices: Exo[] }
type SC   = { id: string; titre: string; notions: string[]; blocs: Bloc[] }
type Chap = { id: string; titre: string; tag: string; color: string; emoji: string; desc: string; souschapitres: SC[] }

// ══════════════════════════════════════════════════════════════════════
// DONNÉES — 13 CHAPITRES SVT SECTION MATHS
// ══════════════════════════════════════════════════════════════════════

const ALL_CHAPTERS: Record<string, Chap> = {

// ─────────────────────────────────────────────────────────────────────
// CH 01 — BRASSAGE DE L'INFORMATION GÉNÉTIQUE
// ─────────────────────────────────────────────────────────────────────
'brassage-genetique-maths': {
  id: 'brassage-genetique-maths', emoji: '🧬', tag: 'SVT · Maths', color: '#4f6ef7',
  titre: 'Le brassage de l\'information génétique',
  desc: 'La méiose génère la diversité génétique grâce à deux mécanismes : le brassage interchromosomique (séparation aléatoire des chromosomes homologues) et le brassage intrachromosomique (crossing-over entre chromosomes homologues en prophase I).',
  souschapitres: [
    {
      id: 'sc-bg-m-meiose', titre: '1.1 La méiose et ses conséquences',
      notions: ['Méiose I : division réductionnelle', 'Méiose II : division équationnelle', 'Brassage interchromosomique (Anaphase I)', 'Brassage intrachromosomique / crossing-over (Prophase I)'],
      blocs: [
        {
          notion: '🧬 Méiose et diversité génétique',
          theoremes: [
            { id: 'D-BGM1', type: 'def', nom: 'La méiose — étapes et brassages',
              enonce: "La MÉIOSE produit 4 cellules haploïdes (n chromosomes) à partir d'une cellule diploïde (2n).\n\nMÉIOSE I — Division réductionnelle :\n• Prophase I : appariement des chromosomes homologues → bivalents\n   ↳ CROSSING-OVER : échange de segments entre chromatides non-sœurs → BRASSAGE INTRACHROMOSOMIQUE\n• Anaphase I : séparation aléatoire des chromosomes homologues\n   ↳ Chaque gamète reçoit au hasard un chromosome de chaque paire\n   ↳ BRASSAGE INTERCHROMOSOMIQUE\n\nMÉIOSE II — Division équationnelle :\n• Séparation des chromatides sœurs\n• 4 spermatides ou 1 ovocyte II + globules polaires\n\nNOMBRE DE GAMÈTES DIFFÉRENTS POSSIBLES :\n• Sans crossing-over : 2ⁿ types (n = nombre de paires)\n• Chez l'humain (n = 23) : 2²³ ≈ 8 millions de types\n• Avec crossing-over : nombre quasiment illimité",
              remarque: 'Ces deux types de brassage, combinés à la fécondation aléatoire, expliquent l\'unicité de chaque individu (sauf jumeaux monozygotes).' },
            { id: 'D-BGM2', type: 'prop', nom: 'Gamètes parentaux vs recombinants',
              enonce: "Pour un individu de génotype AB//ab (gènes liés en CIS) :\n\nGAMÈTES PARENTAUX (sans crossing-over) :\n• AB (chromosome intact du parent 1)\n• ab (chromosome intact du parent 2)\n→ Classes majoritaires\n\nGAMÈTES RECOMBINANTS (avec crossing-over) :\n• Ab et aB\n→ Classes minoritaires (fréquence dépend de la distance entre gènes)\n\nFRÉQUENCE DE RECOMBINAISON :\n• f(recombinaison) = (nb recombinants) / (nb total gamètes) × 100\n• S'exprime en cM (centiMorgans)\n• Plus les gènes sont éloignés → crossing-over plus fréquent → fréquence recombinaison plus élevée" },
          ],
          exercices: [
            { id: 'EX-BGM1', niveau: 'Facile', titre: 'Calcul du nombre de gamètes',
              enonce: "Un organisme diploïde a 2n = 8 chromosomes. Combien de types de gamètes différents peut-il former par brassage interchromosomique seul ? Et si on considère les crossing-over ?",
              correction: "n = 4 paires de chromosomes.\nBrassage interchromosomique seul : 2ⁿ = 2⁴ = 16 types de gamètes différents.\n\nAvec crossing-over : chaque crossing-over crée de nouveaux chromosomes recombinés. Le nombre de types possibles devient théoriquement très grand, car plusieurs crossing-over peuvent avoir lieu à différents endroits des chromosomes → diversité quasi-illimitée." },
            { id: 'EX-BGM2', niveau: 'Intermédiaire', titre: 'Identifier les gamètes',
              enonce: "Un individu est de génotype Aa//Bb (gènes sur chromosomes différents). Quels gamètes peut-il former ? Quels sont leurs fréquences attendues ?",
              correction: "Gènes sur chromosomes DIFFÉRENTS → assortiment indépendant (pas de linkage).\nGamètes possibles : AB · Ab · aB · ab\nFréquence de chacun : 1/4 = 25%\n(Mendel, 2ème loi : assortiment indépendant)\nPas de distinction parentaux/recombinants car les gènes ne sont pas liés." },
          ],
        },
      ],
    },
  ],
},

// ─────────────────────────────────────────────────────────────────────
// CH 02 — TRANSMISSION ET HÉRÉDITÉ
// ─────────────────────────────────────────────────────────────────────
'transmission-hereditaire-maths': {
  id: 'transmission-hereditaire-maths', emoji: '🔗', tag: 'SVT · Maths', color: '#8b5cf6',
  titre: 'Transmission et hérédité',
  desc: 'Les lois de Mendel (ségrégation, assortiment indépendant) régissent la transmission héréditaire. L\'hérédité liée au sexe concerne les gènes portés par les chromosomes sexuels. Le diagnostic prénatal permet de détecter des anomalies génétiques.',
  souschapitres: [
    {
      id: 'sc-th-m-mendel', titre: '2.1 Lois de Mendel et croisements',
      notions: ['1ère loi : ségrégation des allèles', '2ème loi : assortiment indépendant', 'Monohybridisme → F2 : 3:1', 'Dihybridisme → F2 : 9:3:3:1 (gènes indépendants)'],
      blocs: [
        {
          notion: '🔗 Lois de Mendel',
          theoremes: [
            { id: 'L-THM1', type: 'loi', nom: 'Lois de Mendel — monohybridisme et dihybridisme',
              enonce: "1ÈRE LOI — Ségrégation des allèles :\nChaque gamète ne reçoit qu'UN allèle de chaque gène.\n\nCROISEMENT MONOHYBRIDE :\nAA × aa → F1 : Aa → phénotype [A] si A dominant\nF1 × F1 : Aa × Aa → F2 :\n• 1/4 AA + 2/4 Aa + 1/4 aa\n• Phénotypes : 3 [A] : 1 [a]   (ratio 3:1)\n\n2ÈME LOI — Assortiment indépendant :\nValable si les gènes sont sur des chromosomes DIFFÉRENTS.\nLes allèles des 2 gènes se séparent indépendamment.\n\nCROISEMENT DIHYBRIDE (gènes non liés) :\nAABB × aabb → F1 : AaBb\nF1 × F1 → F2 : ratio 9:3:3:1\n9 A_B_ : 3 A_bb : 3 aaB_ : 1 aabb\n\nGÈNES LIÉS (même chromosome) :\nLa 2ème loi ne s'applique PAS → ratio différent de 9:3:3:1\nPrésence de crossing-over → gamètes recombinants minoritaires",
              remarque: 'Si le ratio en F2 n\'est pas 9:3:3:1 en dihybridisme, les gènes sont liés (sur le même chromosome). La fréquence de recombinaison permet d\'estimer leur distance génétique.' },
            { id: 'M-THM1', type: 'methode', nom: 'Méthode de résolution d\'un croisement',
              enonce: "ÉTAPES POUR RÉSOUDRE UN PROBLÈME DE GÉNÉTIQUE :\n\n1. IDENTIFIER LES ALLÈLES :\n   Nommer l'allèle dominant (ex: A) et récessif (ex: a)\n\n2. DÉTERMINER LES GÉNOTYPES DES PARENTS :\n   Homozygote dominant : AA\n   Hétérozygote : Aa\n   Homozygote récessif : aa\n\n3. ÉCRIRE LES GAMÈTES :\n   AA → gamètes A uniquement\n   Aa → gamètes A et a (1/2 chacun)\n\n4. CONSTRUIRE L'ÉCHIQUIER DE CROISEMENT (tableau de Punnett)\n\n5. LIRE LES RÉSULTATS :\n   Calculer les fréquences génotypiques et phénotypiques\n\n6. VÉRIFIER avec le ratio attendu (3:1 pour monohybride, 9:3:3:1 pour dihybride)" },
          ],
          exercices: [
            { id: 'EX-THM1', niveau: 'Facile', titre: 'Croisement simple',
              enonce: "Deux parents à phénotype [Aa] se croisent (Aa × Aa). Quels sont les génotypes et phénotypes des enfants ? Quelles fréquences ?",
              correction: "Gamètes de chaque parent : A (1/2) et a (1/2).\n\nTableau de Punnett :\n       A       a\nA | AA (1/4) | Aa (1/4)\na | Aa (1/4) | aa (1/4)\n\nGénotypes : 1/4 AA + 2/4 Aa + 1/4 aa\nPhénotypes (A dominant) : 3/4 [A] + 1/4 [a] → ratio 3:1" },
            { id: 'EX-THM2', niveau: 'Intermédiaire', titre: 'Test-cross diagnostic',
              enonce: "Un individu de phénotype [A] est croisé avec un individu [aa]. On obtient 50% [A] et 50% [a]. Quel est le génotype de l'individu [A] ?",
              correction: "Test-cross : croisement avec l'homozygote récessif aa.\nSi l'individu [A] est AA → TOUS les descendants sont Aa → phénotype [A] uniquement.\nSi l'individu [A] est Aa → 1/2 Aa [A] + 1/2 aa [a] → ratio 1:1.\n\nOn obtient 50% [A] et 50% [a] → ratio 1:1 → l'individu [A] est HÉTÉROZYGOTE : Aa." },
          ],
        },
      ],
    },
    {
      id: 'sc-th-m-sexe', titre: '2.2 Hérédité liée au sexe et diagnostic prénatal',
      notions: ['Chromosomes X et Y', 'Gène lié au chromosome X', 'Transmission croisée · conductrice', 'Diagnostic prénatal · sonde moléculaire · caryotype'],
      blocs: [
        {
          notion: '🔬 Hérédité gonosomique',
          theoremes: [
            { id: 'D-THM2', type: 'def', nom: 'Hérédité liée au chromosome X',
              enonce: "Les gènes portés par le CHROMOSOME X se transmettent différemment selon le sexe.\n\nNOTATION :\n• Xᴬ = allèle dominant · Xᵃ = allèle récessif\n\nGÉNOTYPES FÉMININS :\n• XᴬXᴬ : femme homozygote saine\n• XᴬXᵃ : femme hétérozygote CONDUCTRICE (phénotype normal)\n• XᵃXᵃ : femme malade\n\nGÉNOTYPES MASCULINS :\n• XᴬY : homme sain\n• XᵃY : homme malade (hemizygote)\n\nTRANSMISSION CROISÉE :\nPère malade (XᵃY) → Xᵃ transmis UNIQUEMENT aux filles → filles conductrices\nFilles conductrices (XᴬXᵃ) → 1/2 fils malades · 1/2 fils sains\n\nCONSÉQUENCE PRATIQUE :\nLes maladies récessives liées à X sont plus fréquentes chez les GARÇONS\n(ils ne peuvent pas être conducteurs)\n\nEXEMPLES : daltonisme · hémophilie A · myopathie de Duchenne",
              remarque: 'Un père ne peut pas transmettre une maladie liée à X à ses fils (il leur transmet Y, pas X). La transmission se fait toujours père → filles → petits-fils.' },
            { id: 'M-THM2', type: 'methode', nom: 'Diagnostic prénatal',
              enonce: "Le DIAGNOSTIC PRÉNATAL détecte des anomalies génétiques chez le fœtus.\n\nTECHNIQUES DE PRÉLÈVEMENT :\n• Amniocentèse : ponction du liquide amniotique (sem. 15-18)\n• Biopsie du trophoblaste (choriocentèse) : sem. 10-12\n\nANALYSES :\n1. CARYOTYPE :\n   → Visualisation de l'ensemble des chromosomes\n   → Détecte : trisomies (21, 18, 13) · monosomies · translocations\n   → Ex : trisomie 21 → 47 chromosomes avec 3 chr. 21\n\n2. SONDE MOLÉCULAIRE (sonde ADN) :\n   → Séquence d'ADN complémentaire à la séquence recherchée\n   → Marquée (fluorescence ou radioactivité)\n   → Hybridation spécifique avec la séquence cible\n   → Détecte : allèle muté précis (mucoviscidose, drépanocytose...)\n   → Plus précise que le caryotype pour les mutations géniques\n\nRISQUE DE CONSANGUINITÉ :\n→ Mariage entre apparentés → allèles récessifs rares en commun\n→ Risque accru de maladies récessives chez les enfants" },
          ],
          exercices: [
            { id: 'EX-THM3', niveau: 'Intermédiaire', titre: 'Hémophilie liée à X',
              enonce: "L'hémophilie A est récessive liée à X. Un homme sain épouse une femme conductrice. Quel pourcentage de leurs fils seront hémophiles ? Et de leurs filles ?",
              correction: "Homme sain : XᴴY\nFemme conductrice : XᴴXʰ\n\nCroisement : XᴴXʰ × XᴴY\n\nFilles : \n• 1/2 XᴴXᴴ (saines)\n• 1/2 XᴴXʰ (conductrices)\n→ 0% de filles hémophiles\n\nGarçons :\n• 1/2 XᴴY (sains)\n• 1/2 XʰY (hémophiles)\n→ 50% des garçons seront hémophiles" },
          ],
        },
      ],
    },
  ],
},

// ─────────────────────────────────────────────────────────────────────
// CH 03 — LA CONSTANCE DU MILIEU INTÉRIEUR
// ─────────────────────────────────────────────────────────────────────
'milieu-interieur-maths': {
  id: 'milieu-interieur-maths', emoji: '💧', tag: 'SVT · Maths', color: '#10b981',
  titre: 'La constance du milieu intérieur',
  desc: 'Le milieu intérieur (plasma, liquide interstitiel, liquide intracellulaire) maintient des constantes biologiques précises. Tout écart par rapport aux valeurs normales peut être dangereux pour les cellules. L\'homéostasie assure ce maintien.',
  souschapitres: [
    {
      id: 'sc-mi-m', titre: '3.1 Compartiments et constantes biologiques',
      notions: ['Plasma sanguin · liquide interstitiel · liquide intracellulaire', 'Glycémie · pH · température · pression artérielle', 'Conséquences des variations anormales', 'Homéostasie et rétrocontrôle'],
      blocs: [
        {
          notion: '💧 Milieu intérieur',
          theoremes: [
            { id: 'D-MIM1', type: 'def', nom: 'Compartiments liquidiens et constantes biologiques',
              enonce: "COMPARTIMENTS LIQUIDIENS DE L'ORGANISME :\n\n1. PLASMA SANGUIN :\n• Partie liquide du sang (55% du volume sanguin)\n• Contient : eau, protéines, glucose, ions (Na⁺, K⁺, Ca²⁺), hormones, gaz dissous\n\n2. LIQUIDE INTERSTITIEL :\n• Baigne directement les cellules\n• Issu du plasma par filtration capillaire\n• Intermédiaire entre plasma et cellules\n\n3. LIQUIDE INTRACELLULAIRE :\n• Cytoplasme des cellules\n• Riche en K⁺ et protéines\n• Représente ≈ 40% du poids corporel\n\nCONSTANTES BIOLOGIQUES :\n• Glycémie : 0,8 – 1,2 g/L (normale = 1 g/L à jeun)\n• pH sanguin : 7,35 – 7,45 (légèrement basique)\n• Température : 37°C ± 0,5°C\n• Natrémie : 135 – 145 mmol/L\n\nTROUBLES LIÉS AUX VARIATIONS :\n• Hypoglycémie < 0,7 g/L → malaise, convulsions\n• Acidose (pH < 7,35) → troubles nerveux et respiratoires\n• Hyperthermie > 40°C → dénaturation des enzymes, convulsions" },
          ],
          exercices: [
            { id: 'EX-MIM1', niveau: 'Facile', titre: 'Valeurs normales',
              enonce: "Un bilan sanguin indique : glycémie = 0,65 g/L, pH = 7,52. Analyser ces résultats et préciser le nom des troubles éventuels.",
              correction: "Glycémie = 0,65 g/L < 0,8 g/L (valeur normale minimale) → HYPOGLYCÉMIE.\nLe patient peut ressentir des malaises, sueurs, tremblements. En cas sévère : perte de conscience.\n\npH = 7,52 > 7,45 (valeur maximale normale) → ALCALOSE (basose).\nLe pH est trop élevé. Causes possibles : hyperventilation, vomissements répétés.\nConséquences : crampes musculaires, troubles cardiaques." },
          ],
        },
      ],
    },
  ],
},

// ─────────────────────────────────────────────────────────────────────
// CH 04 — LA RÉGULATION DE LA GLYCÉMIE
// ─────────────────────────────────────────────────────────────────────
'regulation-glycemie-maths': {
  id: 'regulation-glycemie-maths', emoji: '🍬', tag: 'SVT · Maths', color: '#f59e0b',
  titre: 'La régulation de la glycémie',
  desc: 'La glycémie est régulée par deux hormones pancréatiques antagonistes : l\'insuline (hypoglycémiante) et le glucagon (hyperglycémiant). Le foie est l\'organe effecteur central. Un rétrocontrôle négatif assure le retour à la valeur de consigne.',
  souschapitres: [
    {
      id: 'sc-rgm', titre: '4.1 Régulation hormonale de la glycémie et diabète',
      notions: ['Foie : glycogénogenèse · glycogénolyse · néoglucogenèse', 'Insuline (cellules β) → hypoglycémiant', 'Glucagon (cellules α) → hyperglycémiant', 'Rétrocontrôle négatif · diabète type 1 et 2'],
      blocs: [
        {
          notion: '🍬 Régulation de la glycémie',
          theoremes: [
            { id: 'D-RGM1', type: 'def', nom: 'Rôles du foie et du pancréas',
              enonce: "LE FOIE — organe central de la glycémie :\n\nEN CAS D'HYPERGLYCÉMIE (après repas) :\n• GLYCOGÉNOGENÈSE : glucose → glycogène (stockage hépatique)\n• Stimulée par l'insuline\n\nEN CAS D'HYPOGLYCÉMIE (jeûne, exercice) :\n• GLYCOGÉNOLYSE : glycogène → glucose (dégradation du glycogène)\n• NÉOGLUCOGENÈSE : synthèse de glucose depuis les acides aminés, le lactate, le glycérol\n• Stimulées par le glucagon\n\nLE PANCRÉAS ENDOCRINE — îlots de Langerhans :\n\nCELLULES β → INSULINE :\n• Sécrétée quand la glycémie ↑\n• Action : stimule la captation du glucose par les cellules\n• Stimule la glycogénogenèse hépatique\n• Résultat : glycémie ↓\n\nCELLULES α → GLUCAGON :\n• Sécrété quand la glycémie ↓\n• Action : stimule glycogénolyse + néoglucogenèse hépatiques\n• Résultat : glycémie ↑\n\nBOUCLE DE RÉTROCONTRÔLE NÉGATIF :\nValeur consigne (≈ 1 g/L) → écart détecté par le pancréas → correction hormonale → retour à la consigne",
              remarque: 'Insuline et glucagon sont antagonistes. Cette dualité assure une régulation fine et réversible : un excès de glucose est stocké, un manque est compensé par libération du glycogène ou néosynthèse.' },
            { id: 'D-RGM2', type: 'def', nom: 'Le diabète — types et mécanismes',
              enonce: "Le DIABÈTE SUCRÉ est caractérisé par une HYPERGLYCÉMIE chronique (glycémie > 1,26 g/L à jeun).\n\nDIABÈTE DE TYPE 1 (insulino-dépendant) :\n• Mécanisme : destruction AUTOIMMUNE des cellules β par le système immunitaire\n• Conséquence : absence totale d'insuline\n• Glycémie non régulée → hyperglycémie permanente\n• Traitement : injections d'insuline OBLIGATOIRES\n• Début souvent dès l'enfance\n\nDIABÈTE DE TYPE 2 (non insulino-dépendant) :\n• Mécanisme : RÉSISTANCE À L'INSULINE des cellules cibles\n• L'insuline est produite mais les récepteurs ne répondent plus correctement\n• Au fil du temps, les cellules β s'épuisent → moins d'insuline\n• Facteurs de risque : obésité · sédentarité · âge · alimentation\n• Traitement : régime + activité physique + médicaments (metformine...)\n• Début souvent après 40 ans\n\nSYMPTÔMES COMMUNS :\nPolyurie · polydipsie · fatigue · perte de poids · cicatrisation lente" },
          ],
          exercices: [
            { id: 'EX-RGM1', niveau: 'Facile', titre: 'Action de l\'insuline',
              enonce: "Après un repas, la glycémie d'un individu passe de 1 g/L à 1,6 g/L. Décrire la réponse hormonale du pancréas et ses effets sur le foie.",
              correction: "Glycémie = 1,6 g/L > 1,2 g/L → HYPERGLYCÉMIE détectée par les cellules β.\n\nRéponse hormonale :\nLes cellules β des îlots de Langerhans sécrètent de l'INSULINE.\n\nEffets sur le foie :\n• L'insuline stimule la GLYCOGÉNOGENÈSE : le glucose excédentaire est converti en glycogène et stocké dans le foie.\n• L'insuline favorise aussi la captation du glucose par les muscles et les adipocytes.\n\nRésultat :\nLa glycémie diminue et revient vers 1 g/L → rétrocontrôle négatif." },
            { id: 'EX-RGM2', niveau: 'Intermédiaire', titre: 'Distinguer les deux types',
              enonce: "Patient A : glycémie très élevée, pas d'insuline dans le sang. Patient B : glycémie élevée malgré un taux normal d'insuline. Quel type de diabète pour chacun ? Quel traitement ?",
              correction: "Patient A : pas d'insuline → DIABÈTE TYPE 1.\nLes cellules β ont été détruites (auto-immunité). Pas de production d'insuline → hyperglycémie permanente.\nTraitement : injections quotidiennes d'INSULINE (stylos injecteurs ou pompe).\n\nPatient B : insuline présente mais inefficace → DIABÈTE TYPE 2.\nLes cellules cibles sont résistantes à l'insuline. La glycémie reste élevée malgré l'insuline.\nTraitement : régime alimentaire + activité physique + metformine (réduit la résistance à l'insuline)." },
          ],
        },
      ],
    },
  ],
},

// ─────────────────────────────────────────────────────────────────────
// CH 05 — LE SYSTÈME NERVEUX ET LA RÉGULATION
// ─────────────────────────────────────────────────────────────────────
'systeme-nerveux-maths': {
  id: 'systeme-nerveux-maths', emoji: '🧠', tag: 'SVT · Maths', color: '#06b6d4',
  titre: 'Le système nerveux et la régulation',
  desc: 'Le neurone transmet l\'information sous forme de potentiel d\'action (signal électrique). La synapse chimique transmet le message d\'un neurone à l\'autre via des neurotransmetteurs. L\'intégration postsynaptique détermine si un nouveau PA sera émis.',
  souschapitres: [
    {
      id: 'sc-snm', titre: '5.1 Neurone, potentiel d\'action et synapse',
      notions: ['Structure du neurone : corps · dendrites · axone · myéline', 'Potentiel de repos (−70 mV) · potentiel d\'action', 'Dépolarisation (Na⁺) · repolarisation (K⁺)', 'Synapse chimique · PPSE · PPSI · intégration · réflexe myotatique'],
      blocs: [
        {
          notion: '🧠 Message nerveux',
          theoremes: [
            { id: 'D-SNM1', type: 'def', nom: 'Neurone et propagation du message nerveux',
              enonce: "LE NEURONE :\n• Corps cellulaire (soma) : noyau · métabolisme\n• Dendrites : reçoivent les messages entrants\n• Axone : conduit le message jusqu'aux synapses\n• Gaine de myéline : isolation électrique → conduction saltatoire rapide\n• Nœuds de Ranvier : interruptions de la myéline → site de régénération du PA\n\nPOTENTIEL DE REPOS :\n• Membrane polarisée : intérieur négatif (−70 mV)\n• Maintenu par la pompe Na⁺/K⁺ (3Na⁺ sortent · 2K⁺ entrent)\n\nPOTENTIEL D'ACTION :\n1. Stimulus → ouverture canaux Na⁺ → Na⁺ entre massivement\n2. DÉPOLARISATION : −70 mV → +30 mV\n3. Fermeture Na⁺ → ouverture K⁺ → K⁺ sort\n4. REPOLARISATION : +30 mV → −70 mV\n5. Période réfractaire → retour au repos\n\nPROPRIÉTÉS DU PA :\n• Loi du tout ou rien : amplitude constante (≈ 100 mV)\n• Auto-propagé le long de l'axone\n• Fréquence des PA ∝ intensité du stimulus" },
            { id: 'D-SNM2', type: 'def', nom: 'Synapse chimique et intégration',
              enonce: "LA SYNAPSE CHIMIQUE :\n1. PA arrive au bouton terminal → ouverture Ca²⁺\n2. Exocytose des vésicules de neurotransmetteur (NT)\n3. NT traverse la fente synaptique (20-50 nm)\n4. NT se lie aux récepteurs postsynaptiques\n5. Génération d'un PPSE ou PPSI\n6. NT inactivé (recapture ou dégradation enzymatique)\n\nPPSE (Potentiel Post-Synaptique Excitateur) :\n• Synapse excitatrice → dépolarisation partielle → rapproche du seuil\n\nPPSI (Potentiel Post-Synaptique Inhibiteur) :\n• Synapse inhibitrice → hyperpolarisation → éloigne du seuil\n\nINTÉGRATION POSTSYNAPTIQUE :\n• Sommation temporelle : PA répétés sur même synapse\n• Sommation spatiale : PA simultanés sur plusieurs synapses\n• Si somme > seuil → PA déclenché\n\nRÉFLEXE MYOTATIQUE :\nÉtirement muscle → fuseau → message afférent → moelle → motoneurone\n→ contraction du muscle étiré + inhibition du muscle antagoniste",
              remarque: 'L\'intégration est la fonction centrale du neurone. Il «décide» s\'il déclenche un PA en additionnant tous ses signaux d\'entrée (PPSE - PPSI). C\'est la base du traitement de l\'information par le cerveau.' },
          ],
          exercices: [
            { id: 'EX-SNM1', niveau: 'Facile', titre: 'Transmission synaptique',
              enonce: "La cocaïne bloque la recapture de la dopamine dans la synapse. Quel est l'effet immédiat sur le signal nerveux dans cette synapse ?",
              correction: "La dopamine est un neurotransmetteur (NT).\n\nNORMALEMENT :\nDopamine libérée → se lie aux récepteurs → effet → recapture par le neurone pré-synaptique → fin de l'effet.\n\nAVEC COCAÏNE :\nLa cocaïne bloque les transporteurs de recapture.\nLa dopamine reste dans la fente synaptique plus longtemps.\nElle continue à stimuler les récepteurs → POTENTIELS D'ACTION supplémentaires générés.\nL'effet excitatoire est amplifié et prolongé → euphorie intense.\n\nConséquence : l'influx nerveux dans la voie dopaminergique est anormalement augmenté." },
            { id: 'EX-SNM2', niveau: 'Intermédiaire', titre: 'Seuil d\'intégration',
              enonce: "Un neurone reçoit : 4 PPSE de +4 mV chacun, et 2 PPSI de −5 mV chacun. Potentiel de repos = −70 mV. Seuil = −55 mV. Un PA est-il déclenché ?",
              correction: "Sommation algébrique des potentiels :\nΔV = 4 × (+4) + 2 × (−5) = +16 − 10 = +6 mV\n\nPotentiel résultant = −70 + 6 = −64 mV\n\n−64 mV < −55 mV → le seuil n'est pas atteint.\n→ AUCUN POTENTIEL D'ACTION déclenché.\n(Le neurone intègre les signaux mais reste sous le seuil)" },
          ],
        },
      ],
    },
  ],
},

// ─────────────────────────────────────────────────────────────────────
// CH 06 — DÉFENSE DE L'ORGANISME
// ─────────────────────────────────────────────────────────────────────
'defense-organisme-maths': {
  id: 'defense-organisme-maths', emoji: '🛡️', tag: 'SVT · Maths', color: '#8b5cf6',
  titre: 'Défense de l\'organisme',
  desc: 'Le système immunitaire protège l\'organisme contre les agents pathogènes. L\'immunité non spécifique (phagocytose, inflammation) est la première ligne. L\'immunité spécifique (lymphocytes B et T, anticorps) est ciblée et mémorisée. La vaccination exploite cette mémoire.',
  souschapitres: [
    {
      id: 'sc-dom', titre: '6.1 Immunité non spécifique, spécifique et applications',
      notions: ['Phagocytose · inflammation · barrières physiques', 'Mémoire immunologique · spécificité · diversité', 'Lymphocytes B (anticorps) · lymphocytes T (cytotoxicité)', 'Vaccination (active) vs sérothérapie (passive)'],
      blocs: [
        {
          notion: '🛡️ Système immunitaire',
          theoremes: [
            { id: 'D-DOM1', type: 'def', nom: 'Immunité non spécifique et spécifique',
              enonce: "IMMUNITÉ NON SPÉCIFIQUE (innée, immédiate) :\n\n1. Barrières physiques :\n   • Peau (kératine · acidité) · Muqueuses (mucus · cils)\n   • Lysozyme (larmes, salive) · sécrétions gastriques (pH 2)\n\n2. Phagocytose :\n   • Macrophages et neutrophiles détruisent les agents pathogènes\n   • Chimiotactisme → adhérence → ingestion → digestion\n\n3. Inflammation :\n   • Libération d'histamine · cytokines · prostaglandines\n   • Vasodilatation · afflux de phagocytes\n\nIMMUNITÉ SPÉCIFIQUE (adaptative, différée) :\n\nIMMUNITÉ HUMORALE (lymphocytes B) :\n• Reconnaissance de l'antigène (Ag) spécifique\n• Prolifération clonale → plasmocytes → ANTICORPS\n• Complexes Ag-Ac → neutralisation / opsonisation\n• Lymphocytes B mémoire → réponse secondaire rapide\n\nIMMUNITÉ CELLULAIRE (lymphocytes T) :\n• T auxiliaires (CD4) : activent B et T cytotoxiques\n• T cytotoxiques (CD8) : lysent les cellules infectées\n• Reconnaissance via CMH + peptide antigénique\n\nSPÉCIFICITÉ : chaque lymphocyte reconnaît un seul antigène\nDIVERSITÉ : des millions de clones différents existent" },
            { id: 'D-DOM2', type: 'methode', nom: 'Vaccination vs Sérothérapie — Comparaison',
              enonce: "VACCINATION :\n• On injecte un ANTIGÈNE (vaccin = agent atténué, inactivé ou protéines antigéniques)\n• Le système immunitaire produit une RÉPONSE PRIMAIRE\n• Génère des LYMPHOCYTES MÉMOIRE spécifiques\n• Protection ACTIVE : le propre SI de l'individu est armé\n• Durée : des mois à des années (parfois toute la vie avec rappels)\n• Délai avant protection : 2 à 4 semaines (temps de production des anticorps)\n• Exemples : DTP, ROR, BCG, COVID-19, grippe\n\nSÉROTHÉRAPIE :\n• On injecte un SÉRUM contenant des ANTICORPS PRÉFORMÉS\n• Anticorps d'origine animale (cheval) ou humaine\n• Protection PASSIVE : pas de stimulation du SI propre\n• Protection IMMÉDIATE mais TEMPORAIRE (demi-vie des Ac ≈ 3 semaines)\n• Pas de mémoire immunitaire → pas de protection durable\n• Exemples : antitétanique (urgence) · antivenin · anti-rage\n\nQUAND UTILISER LEQUEL ?\n• Vaccination : prévention à long terme (avant exposition)\n• Sérothérapie : urgence après exposition (morsure, blessure grave)",
              remarque: 'Le préservatif est le SEUL moyen contraceptif protégeant AUSSI contre les IST. La pilule ne protège pas contre les infections sexuellement transmissibles.' },
          ],
          exercices: [
            { id: 'EX-DOM1', niveau: 'Facile', titre: 'Vaccination et mémoire',
              enonce: "Pourquoi un enfant vacciné contre la méningite à 2 mois est-il toujours protégé à 5 ans, alors qu'une sérothérapie ne protège que quelques semaines ?",
              correction: "VACCIN (protection longue durée) :\nLe vaccin contient des antigènes de la bactérie (méningocoque) atténués ou inactivés.\nLe SI de l'enfant produit une réponse immunitaire → anticorps + LYMPHOCYTES MÉMOIRE.\nCes lymphocytes mémoire persistent pendant des années dans l'organisme.\nSi la bactérie réelle arrive → réponse secondaire immédiate et très forte → protection efficace.\n\nSÉROTHÉRAPIE (protection courte durée) :\nOn injecte des anticorps préformés (protéines étrangères).\nCes protéines sont progressivement dégradées par l'organisme (demi-vie ≈ 3 semaines).\nAucun lymphocyte mémoire n'est produit → protection disparaît avec les anticorps." },
          ],
        },
      ],
    },
  ],
},

// ─────────────────────────────────────────────────────────────────────
// CH 07 — HYGIÈNE DU SYSTÈME NERVEUX
// ─────────────────────────────────────────────────────────────────────
'hygiene-sn-maths': {
  id: 'hygiene-sn-maths', emoji: '🚫', tag: 'SVT · Maths', color: '#ec4899',
  titre: 'Hygiène du système nerveux',
  desc: 'Les drogues perturbent le fonctionnement synaptique, entraînant dépendance et pathologies. La cocaïne bloque la recapture de la dopamine. Le stress chronique altère l\'organisme. Des mesures d\'hygiène de vie permettent de préserver le système nerveux.',
  souschapitres: [
    {
      id: 'sc-hsn-m', titre: '7.1 Drogues, stress et hygiène de vie',
      notions: ['Définition et mécanismes d\'action des drogues', 'Cocaïne : blocage recapture dopamine', 'Effets nocifs et dépendance', 'Stress : cortisol et adrénaline · mesures de protection'],
      blocs: [
        {
          notion: '🚫 Drogues et stress',
          theoremes: [
            { id: 'D-HSNM1', type: 'def', nom: 'Drogues — mécanismes et effets sur le SN',
              enonce: "Une DROGUE est une substance psychoactive qui modifie le fonctionnement du SN en agissant sur les synapses.\n\nMÉCANISMES D'ACTION :\n• Agoniste : mime un neurotransmetteur → sur-activation\n  Ex : morphine → récepteurs opioïdes (endorphines endogènes)\n• Antagoniste : bloque les récepteurs → sous-activation\n  Ex : naloxone → bloque récepteurs opioïdes\n• Inhibition de recapture : NT s'accumule dans la fente → effet prolongé\n  Ex : COCAÏNE → bloque recapture de la DOPAMINE\n\nEXEMPLE COCAÏNE :\nNormal : dopamine libérée → plaisir → recaptée → fin de l'effet\nCocaïne : bloque les transporteurs de recapture\n→ dopamine s'accumule → euphorie intense et prolongée\n→ Le cerveau s'adapte : ↓ récepteurs (tolérance) → besoin de doses croissantes\n→ Arrêt : manque de dopamine effective → dépression · sevrage\n\nDÉPENDANCE :\n• Physique : le corps a besoin de la drogue pour fonctionner\n• Psychologique : envie irrépressible (craving)\n• Tolérance : doses croissantes pour le même effet\n\nAUTRES EFFETS NOCIFS :\n• Alcool : dommages cérébraux, cirrhose, cancers\n• Cannabis : troubles mémoire chez adolescents, psychoses\n• Tabac : nicotine → dépendance + cancers + maladies cardiovasculaires" },
            { id: 'D-HSNM2', type: 'def', nom: 'Le stress et ses effets physiologiques',
              enonce: "Le STRESS est une réponse de l'organisme à une situation perçue comme menaçante.\n\nAXE HHS (Hypothalamo-Hypophyso-Surrénalien) :\n1. Hypothalamus → libère CRH\n2. Hypophyse → libère ACTH\n3. Glandes surrénales → libèrent :\n   • ADRÉNALINE (réponse immédiate)\n   • CORTISOL (réponse prolongée)\n\nEFFETS DU STRESS AIGU (adaptatif) :\n• ↑ Fréquence cardiaque · ↑ pression artérielle\n• ↑ Glycémie (mobilisation des réserves)\n• Vasodilatation musculaire · vasoconstriction digestive\n• Dilatation des pupilles\n→ Prépare à «fuir ou combattre» (réaction adaptative)\n\nSTRESS CHRONIQUE (pathologique) :\n• Troubles du sommeil · anxiété · dépression\n• Immunosuppression → infections plus fréquentes\n• Maladies cardiovasculaires · hypertension\n• Troubles digestifs · ulcères\n• Obésité (cortisol stimule l'appétit)\n\nMESURES DE PROTECTION :\n• Activité physique régulière (libère endorphines)\n• Sommeil suffisant (7-8h)\n• Techniques de relaxation (méditation · respiration abdominale · yoga)\n• Alimentation équilibrée · éviter alcool et caféine\n• Soutien social · consultation psychologique si nécessaire" },
          ],
          exercices: [
            { id: 'EX-HSNM1', niveau: 'Intermédiaire', titre: 'Mécanisme de la dépendance',
              enonce: "Un toxicomane à la cocaïne ressent une forte dépression à l'arrêt de la drogue. Expliquer ce phénomène en utilisant les connaissances sur la synapse dopaminergique.",
              correction: "LORS DE LA PRISE DE COCAÏNE :\nLa cocaïne bloque les transporteurs de recapture de la dopamine.\n→ Accumulation de dopamine dans la fente synaptique\n→ Stimulation massive et prolongée des récepteurs\n→ Euphorie intense (activation circuit de récompense)\n\nADAPTATION DU CERVEAU :\nFace à cette sur-stimulation chronique, le cerveau réduit le nombre de récepteurs à la dopamine (down-regulation) pour se protéger.\n\nÀ L'ARRÊT DE LA COCAÏNE :\n• Peu de dopamine libre disponible (niveaux normaux insuffisants)\n• Moins de récepteurs fonctionnels\n→ Le niveau de stimulation dopaminergique est bien INFÉRIEUR à la normale\n→ DÉPRESSION intense, anhédonie (incapacité à ressentir le plaisir), envie irrépressible de la drogue\nC'est la base biologique de la dépendance psychologique." },
          ],
        },
      ],
    },
  ],
},

// ─────────────────────────────────────────────────────────────────────
// CH 08 — FONCTION REPRODUCTRICE CHEZ L'HOMME
// ─────────────────────────────────────────────────────────────────────
'fonction-reproductrice-homme-maths': {
  id: 'fonction-reproductrice-homme-maths', emoji: '♂️', tag: 'SVT · Maths', color: '#4f6ef7',
  titre: 'La fonction reproductrice chez l\'homme',
  desc: 'Les testicules produisent les spermatozoïdes (spermatogenèse) et la testostérone. La méiose est signalée sans détail de la prophase I. La régulation est assurée par le complexe hypothalamo-hypophysaire via GnRH, LH et FSH.',
  souschapitres: [
    {
      id: 'sc-rhmaths', titre: '8.1 Spermatogenèse et régulation hormonale',
      notions: ['Structure du spermatozoïde : tête · pièce intermédiaire · flagelle', 'Étapes : multiplication · accroissement · maturation · différenciation', 'Méiose (signalée sans détails de la prophase I)', 'GnRH → LH (testostérone) + FSH (spermatogenèse) · rétrocontrôle'],
      blocs: [
        {
          notion: '♂️ Spermatogenèse',
          theoremes: [
            { id: 'D-RHMATHS1', type: 'def', nom: 'Structure du spermatozoïde et spermatogenèse',
              enonce: "STRUCTURE DU SPERMATOZOÏDE :\n• Tête : noyau haploïde (23 chromosomes) + acrosome (enzymes)\n• Pièce intermédiaire : mitochondries (énergie ATP)\n• Flagelle : propulsion (3 mm/min)\n\nSPERMATOGENÈSE (dans les tubes séminifères des testicules) :\n\n1. MULTIPLICATION :\n   Spermatogonies (2n) → mitoses successives\n\n2. ACCROISSEMENT :\n   Spermatogonie → spermatocyte I (2n) → grossit en accumulant des réserves\n\n3. MATURATION (MÉIOSE) :\n   • Méiose I : spermatocyte I (2n) → 2 spermatocytes II (n)\n   • Méiose II : spermatocyte II (n) → 2 spermatides (n)\n   ⚠️ La prophase I est signalée sans détail en section Maths\n\n4. DIFFÉRENCIATION (SPERMIOGENÈSE) :\n   Spermatide → spermatozoïde\n   • Formation du flagelle\n   • Condensation du noyau\n   • Formation de l'acrosome\n\nCELLULES DE SERTOLI : nourrissent les cellules germinales",
              remarque: 'En section Mathématiques, la méiose est citée sans décrire en détail les stades de la prophase I (pas de zygoténe, pachytène, etc.). On indique seulement qu\'elle produit des cellules haploïdes.' },
            { id: 'D-RHMATHS2', type: 'def', nom: 'Régulation hormonale masculine',
              enonce: "COMPLEXE HYPOTHALAMO-HYPOPHYSAIRE :\n\nHYPOTHALAMUS → GnRH (pulsatile) → HYPOPHYSE\n\nHYPOPHYSE → LH et FSH\n\nLH → CELLULES DE LEYDIG (interstitielles) → TESTOSTÉRONE :\n• Caractères sexuels secondaires (pilosité · voix grave · masse musculaire)\n• Maintien de la spermatogenèse\n• Libido\n\nFSH → CELLULES DE SERTOLI :\n• Soutien nutritif des spermatides\n• Production d'ABP (Androgen Binding Protein)\n• Maintien de la spermatogenèse\n\nRÉTROCONTRÔLE NÉGATIF :\n• Testostérone ↑ → inhibe GnRH et LH\n• Maintient la testostérone dans les valeurs normales\n\nINHIBINE (cellules de Sertoli) :\n• Inhibe FSH quand la spermatogenèse est trop active" },
          ],
          exercices: [
            { id: 'EX-RHMATHS1', niveau: 'Facile', titre: 'Rétrocontrôle testostérone',
              enonce: "Expliquer pourquoi, après une injection de testostérone (anabolisants), la production naturelle de testostérone par les testicules diminue.",
              correction: "La testostérone exerce un RÉTROCONTRÔLE NÉGATIF sur l'axe hypothalamo-hypophysaire.\n\nAvec l'injection de testostérone de synthèse :\n→ Taux de testostérone sanguin ↑ fortement\n→ Ce taux élevé est détecté par l'hypothalamus et l'hypophyse\n→ Inhibition de la sécrétion de GnRH (hypothalamus)\n→ Inhibition de la sécrétion de LH (hypophyse)\n→ Moins de LH → les cellules de Leydig ne sont plus stimulées\n→ Production endogène de testostérone ↓ voire s'arrête\n\nConséquence : atrophie testiculaire à long terme chez les utilisateurs d'anabolisants." },
          ],
        },
      ],
    },
  ],
},

// ─────────────────────────────────────────────────────────────────────
// CH 09 — FONCTION REPRODUCTRICE CHEZ LA FEMME
// ─────────────────────────────────────────────────────────────────────
'fonction-reproductrice-femme-maths': {
  id: 'fonction-reproductrice-femme-maths', emoji: '♀️', tag: 'SVT · Maths', color: '#ec4899',
  titre: 'La fonction reproductrice chez la femme',
  desc: 'Les ovaires produisent les ovocytes (ovogenèse) et les hormones sexuelles. Le cycle sexuel féminin (28 j) est coordonné par FSH, LH, œstrogènes et progestérone. La GnRH pulsatile de l\'hypothalamus est signalée. Les étapes de la méiose sont présentées sans détail.',
  souschapitres: [
    {
      id: 'sc-rfmaths', titre: '9.1 Ovogenèse, folliculogenèse et cycle sexuel',
      notions: ['Folliculogenèse : follicule primordial → follicule mûr (De Graaf)', 'Ovogenèse : étapes sans détail de la méiose · structure ovocyte II', 'Cycle ovarien · cycle utérin · cycle hormonal', 'GnRH pulsatile · pic LH → ovulation · rétrocontrôle'],
      blocs: [
        {
          notion: '♀️ Cycle sexuel et régulation',
          theoremes: [
            { id: 'D-RFMATHS1', type: 'def', nom: 'Folliculogenèse et ovogenèse',
              enonce: "FOLLICULOGENÈSE (développement du follicule ovarien) :\n• Follicule primordial (réserve à la naissance : ≈ 400 000 follicules)\n• Follicule primaire → secondaire → tertiaire → FOLLICULE MÛR (de De Graaf)\n• Structure du follicule mûr : ovocyte II · granulosa · thèque · antrum\n• À chaque cycle : 1 follicule dominant sélectionné · les autres dégénèrent\n\nOVOGENÈSE :\n⚠️ Les étapes sont présentées SANS DÉTAIL de la méiose en section Maths\n\nÉtapes simplifiées :\n1. Ovogonies → ovocyte I (formé avant la naissance)\n2. Méiose I (déclenchée à la puberté, à chaque cycle) → ovocyte II\n3. Méiose II arrêtée en métaphase II → OVULATION\n4. Méiose II terminée si FÉCONDATION → ovotide\n\nSTRUCTURE DE L'OVOCYTE II :\n• Noyau haploïde (23 chromosomes)\n• Cytoplasme riche en réserves\n• Zone pellucide (glycoprotéines)\n• Granules corticaux (réaction corticale après fécondation)" },
            { id: 'D-RFMATHS2', type: 'def', nom: 'Cycle sexuel féminin (28 jours)',
              enonce: "CYCLE OVARIEN :\n• Phase folliculaire (j1-j14) : croissance du follicule dominant · FSH ↑\n• OVULATION (j14) : pic de LH → rupture du follicule mûr → libération ovocyte II\n• Phase lutéale (j15-j28) : follicule → corps jaune → progestérone + œstrogènes ↑\n• Si pas fécondation : corps jaune dégénère j25-j28 → hormones ↓ → menstruations\n\nCYCLE UTÉRIN :\n• Phase menstruelle (j1-j5) : desquamation de la muqueuse (chute progestérone)\n• Phase proliférative (j6-j14) : épaississement endomètre (œstrogènes)\n• Phase sécrétoire (j15-j28) : glandes utérines actives (progestérone)\n\nCYCLE HORMONAL :\n• FSH → croissance follicule → œstrogènes ↑\n• Œstrogènes élevés → rétrocontrôle POSITIF → pic de LH → ovulation\n• Corps jaune → progestérone + œstrogènes → rétrocontrôle NÉGATIF → FSH et LH ↓\n• Dégénérescence corps jaune → hormones ↓ → menstruations\n\nGnRH PULSATILE (hypothalamus) :\n• Sécrétée de façon pulsatile toutes les 60-90 min\n• Régule la libération de FSH et LH",
              remarque: 'Le rétrocontrôle POSITIF des œstrogènes sur le pic de LH est exceptionnel. Il s\'agit d\'une boucle d\'amplification déclenchant l\'ovulation — c\'est le seul rétrocontrôle positif hormonal du cycle.' },
          ],
          exercices: [
            { id: 'EX-RFMATHS1', niveau: 'Intermédiaire', titre: 'Analyser un cycle',
              enonce: "Chez une femme, on mesure au jour 14 un pic brutal de LH. Expliquer la cause de ce pic et ses deux conséquences immédiates sur l'ovaire.",
              correction: "CAUSE DU PIC DE LH :\nDans la phase folliculaire (j1-j14), le follicule en croissance produit des ŒSTROGÈNES.\nQuand la concentration en œstrogènes atteint un seuil élevé et prolongé → RÉTROCONTRÔLE POSITIF sur l'hypothalamus et l'hypophyse.\n→ Libération massive et brutale de LH par l'hypophyse → pic de LH au j14.\n\nCONSÉQUENCES SUR L'OVAIRE :\n1. OVULATION : le pic de LH déclenche la rupture du follicule mûr → libération de l'ovocyte II dans les trompes.\n2. FORMATION DU CORPS JAUNE : le follicule rompu se transforme en corps jaune qui va sécréter progestérone et œstrogènes pour préparer l'endomètre à une éventuelle nidation." },
          ],
        },
      ],
    },
  ],
},

// ─────────────────────────────────────────────────────────────────────
// CH 10 — LA FÉCONDATION ET LA PROCRÉATION
// ─────────────────────────────────────────────────────────────────────
'fecondation-procreation-maths': {
  id: 'fecondation-procreation-maths', emoji: '🌱', tag: 'SVT · Maths', color: '#f59e0b',
  titre: 'La fécondation et la procréation',
  desc: 'La fécondation est la fusion d\'un spermatozoïde et d\'un ovocyte II dans la trompe. Elle restaure la diploïdie (2n). La maîtrise de la procréation inclut contraception (pilule, préservatif) et PMA (FIVETE, IAD).',
  souschapitres: [
    {
      id: 'sc-fpmaths', titre: '10.1 Fécondation et maîtrise de la procréation',
      notions: ['Rencontre des gamètes · capacitation', 'Pénétration · réaction corticale · fusion des pronuclei', 'Contraception chimique (pilule) · mécanique (préservatif)', 'FIVETE · IAD · hygiène procréation'],
      blocs: [
        {
          notion: '🌱 Fécondation et PMA',
          theoremes: [
            { id: 'D-FPMATHS1', type: 'def', nom: 'Étapes de la fécondation',
              enonce: "La FÉCONDATION se déroule dans le 1/3 externe de la trompe de Fallope (12-24h après ovulation).\n\nCONDITIONS PRÉALABLES :\n• Rencontre des gamètes dans les trompes\n• CAPACITATION : maturation des spermatozoïdes dans les voies génitales féminines\n  (Modif. membranaire → hyperactivation du flagelle · activation acrosome)\n\nÉTAPES :\n1. PÉNÉTRATION dans la zone pellucide :\n   Enzymes acrosomiales (acrosine · hyaluronidase) dissout la zone pellucide\n\n2. FUSION des membranes :\n   Un seul spermatozoïde pénètre (réaction corticale → bloc polyspermie)\n\n3. ACTIVATION DE L'OVOCYTE II :\n   L'ovocyte II achève sa méiose II → ovotide + 2ème globule polaire\n\n4. FORMATION DES PRONUCLEI :\n   Pronucleus femelle (23 chr.) + Pronucleus mâle (23 chr.)\n\n5. FUSION DES PRONUCLEI → ZYGOTE (46 chromosomes)\n   → Début de la segmentation (divisions mitotiques)" },
            { id: 'D-FPMATHS2', type: 'def', nom: 'Contraception et PMA',
              enonce: "CONTRACEPTION :\n\nMÉTHODES CHIMIQUES :\n• Pilule œstroprogestative : bloque GnRH · FSH · LH → pas d'ovulation\n• Pilule progestative seule : épaissit la glaire cervicale\n• Contraception d'urgence (Plan B) : retarde ou bloque l'ovulation\n• DIU hormonal : progestérone locale → pas de nidation\n\nMÉTHODES MÉCANIQUES :\n• Préservatif masculin/féminin : barrière physique + SEUL protecteur contre IST\n• DIU au cuivre : toxique pour les spermatozoïdes\n• Diaphragme + spermicide\n\nPROCRÉATION MÉDICALEMENT ASSISTÉE (PMA) :\n\nFIVETE (Fécondation In Vitro et Transfert d'Embryon) :\n1. Stimulation ovarienne (FSH → plusieurs ovocytes)\n2. Ponction des ovocytes sous échographie\n3. Fécondation in vitro avec les spermatozoïdes\n4. Culture des embryons 2-5 jours\n5. Transfert de 1-2 embryons dans l'utérus\n\nIAD (Insémination Artificielle avec Donneur) :\nInjection de sperme (du conjoint ou d'un donneur) dans l'utérus\n\nHYGIÈNE DE LA PROCRÉATION :\n• Prévention des IST (préservatif)\n• Suivi prénatal régulier\n• Comportements à risque à éviter (alcool · tabac · drogue pendant grossesse)" },
          ],
          exercices: [
            { id: 'EX-FPMATHS1', niveau: 'Facile', titre: 'Mécanisme de la pilule',
              enonce: "La pilule combinée contient des œstrogènes et de la progestérone de synthèse. Expliquer son mécanisme contraceptif principal.",
              correction: "La pilule combinée maintient un taux constant d'œstrogènes et de progestérone de synthèse.\n\nCes hormones exercent un RÉTROCONTRÔLE NÉGATIF sur :\n• L'hypothalamus : inhibition de la sécrétion de GnRH\n• L'hypophyse : inhibition de la sécrétion de FSH et LH\n\nConséquences :\n→ Pas de FSH → pas de croissance folliculaire\n→ Pas de pic de LH → PAS D'OVULATION\n→ Sans ovocyte → la fécondation est impossible\n\nEFFETS SECONDAIRES CONTRACEPTIFS :\n→ Glaire cervicale épaisse (difficile à traverser pour les spermatozoïdes)\n→ Endomètre peu propice à la nidation" },
          ],
        },
      ],
    },
  ],
},

// ─────────────────────────────────────────────────────────────────────
// CH 11 — NUTRITION ANIMALE
// ─────────────────────────────────────────────────────────────────────
'nutrition-animale-maths': {
  id: 'nutrition-animale-maths', emoji: '🍎', tag: 'SVT · Maths', color: '#10b981',
  titre: 'Nutrition animale',
  desc: 'La digestion transforme les macromolécules alimentaires en petites molécules assimilables grâce aux enzymes digestives. La respiration cellulaire produit l\'ATP nécessaire à toutes les fonctions cellulaires (glycolyse → cycle de Krebs → chaîne respiratoire).',
  souschapitres: [
    {
      id: 'sc-namaths', titre: '11.1 Digestion, absorption et respiration cellulaire',
      notions: ['Enzymes digestives : amylase (glucides) · pepsine (protides) · lipase (lipides)', 'Conditions d\'activité : pH et température optimaux', 'Villosités intestinales : absorption sanguine et lymphatique', 'Glycolyse → Krebs → Chaîne respiratoire → 38 ATP'],
      blocs: [
        {
          notion: '🍎 Digestion et énergie cellulaire',
          theoremes: [
            { id: 'D-NAMATHS1', type: 'def', nom: 'Digestion enzymatique',
              enonce: "La DIGESTION est la transformation enzymatique des macromolécules alimentaires en monomères assimilables.\n\nGLUCIDES :\n• Amidon → maltose : AMYLASE SALIVAIRE (pH 6,8 · bouche)\n• Maltose → glucose : maltase (intestin grêle)\n\nPROTÉINES :\n• Protéines → peptides : PEPSINE (pH 2 · estomac acide)\n• Peptides → acides aminés : trypsine, chymotrypsine (pancréas, pH 8)\n\nLIPIDES :\n• Lipides → acides gras + glycérol : LIPASE PANCRÉATIQUE (intestin grêle)\n• Émulsification préalable par les sels biliaires (bile)\n\nCONDITIONS D'ACTIVITÉ ENZYMATIQUE :\n• Température optimale : ≈ 37°C (dénaturation irréversible > 50°C)\n• pH optimal : spécifique à chaque enzyme (pepsine : pH 2 · trypsine : pH 8)\n• Spécificité : chaque enzyme agit sur un substrat particulier\n\nABSORPTION (intestin grêle) :\n• Villosités et microvillosités → surface × 600 m²\n• Glucose + acides aminés → capillaires sanguins → veine porte hépatique\n• Acides gras + glycérol → chylomicrons → lymphe (capillaires lymphatiques)" },
            { id: 'F-NAMATHS1', type: 'formule', nom: 'Respiration cellulaire — bilan',
              enonce: "La RESPIRATION CELLULAIRE dégrade le glucose pour produire de l'ATP (énergie).\n\nÉQUATION BILAN GLOBALE :\nC₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + 38 ATP\n\nÉTAPES :\n\n1. GLYCOLYSE (cytoplasme) :\n   C₆H₁₂O₆ → 2 pyruvates (C₃)\n   Produit : 2 ATP + 2 NADH\n   Pas besoin d'O₂ (anaérobie)\n\n2. CYCLE DE KREBS (matrice mitochondriale) :\n   Pyruvates → CO₂ (éliminé)\n   Produit : 2 ATP + NADH + FADH₂\n   Produit la majorité des coenzymes réduits\n\n3. CHAÎNE RESPIRATOIRE (membrane interne mitochondriale) :\n   NADH + FADH₂ + O₂ → H₂O\n   Produit : 34 ATP\n   Consomme O₂ · étape la plus productrice d'ATP\n\nBILAN :\n1 glucose → 38 ATP (rendement ≈ 40%)\nSans O₂ (fermentation) : glycolyse seule → seulement 2 ATP",
              remarque: 'La mitochondrie est le «centre énergétique» de la cellule. Les cellules très actives (muscles, neurones, hépatocytes) sont riches en mitochondries. En cas de manque d\'O₂ → fermentation lactique (muscles) → fatigue musculaire.' },
          ],
          exercices: [
            { id: 'EX-NAMATHS1', niveau: 'Facile', titre: 'Enzyme et pH',
              enonce: "La pepsine, enzyme gastrique, est testée à pH 2, pH 7 et pH 8. À quel pH est-elle la plus active ? Pourquoi ? Que se passe-t-il si on la met dans l'intestin (pH 8) ?",
              correction: "La pepsine est la plus active à pH 2 (pH optimal de l'estomac).\n\nEXPLICATION :\nChaque enzyme a un site actif de forme spécifique, stable uniquement à son pH optimal.\nÀ pH 2, la pepsine est dans sa conformation active → hydrolyse efficace des protéines.\n\nÀ pH 8 (intestin grêle) :\nLe pH alcalin modifie la structure tridimensionnelle du site actif de la pepsine.\n→ DÉNATURATION : la pepsine perd son activité enzymatique → elle devient inefficace.\nLa digestion des protéines est alors assurée par d'autres enzymes (trypsine, chymotrypsine) adaptées au pH intestinal." },
          ],
        },
      ],
    },
  ],
},

// ─────────────────────────────────────────────────────────────────────
// CH 12 — NUTRITION VÉGÉTALE
// ─────────────────────────────────────────────────────────────────────
'nutrition-vegetale-maths': {
  id: 'nutrition-vegetale-maths', emoji: '🌿', tag: 'SVT · Maths', color: '#22c55e',
  titre: 'Nutrition végétale',
  desc: 'Les végétaux sont autotrophes : ils synthétisent leur matière organique par photosynthèse (CO₂ + H₂O + lumière → glucose + O₂). Ils absorbent aussi l\'eau et les sels minéraux du sol. La chlorophylle capte la lumière. La photolyse de l\'eau libère l\'O₂.',
  souschapitres: [
    {
      id: 'sc-nvmaths', titre: '12.1 Absorption et photosynthèse',
      notions: ['Osmose · poils absorbants · xylème (sève brute)', 'Transpiration stomacale · équilibre hydrique', 'Sels minéraux : N · P · K · Mg · Fe', 'Photosynthèse : phase photochimique (photolyse eau) · cycle de Calvin'],
      blocs: [
        {
          notion: '🌿 Nutrition végétale',
          theoremes: [
            { id: 'D-NVMATHS1', type: 'def', nom: 'Absorption eau, minéraux et conduction',
              enonce: "ABSORPTION DE L'EAU :\n• OSMOSE passive : la solution du cytoplasme est plus concentrée que le sol\n→ L'eau entre dans les poils absorbants par osmose\n• Conduction : eau + sels minéraux (= sève brute) montée par le XYLÈME\n• Force motrice : transpiration (aspiration) + pression racinaire\n\nTRANSPIRATION :\n• Évaporation de l'eau par les STOMATES (pores des feuilles)\n• Crée une dépression qui aspire la sève brute (théorie cohésion-tension)\n• Ouverture/fermeture des stomates : cellules de garde (turgor dépend de K⁺)\n\nSELS MINÉRAUX :\n• AZOTE (N) : composant des protéines et acides nucléiques\n• PHOSPHORE (P) : ATP, acides nucléiques, phospholipides\n• POTASSIUM (K) : régulation osmotique et activité enzymatique\n• MAGNÉSIUM (Mg) : centre de la molécule de CHLOROPHYLLE\n• FER (Fe) : nécessaire à la synthèse de la chlorophylle\n\nCARENDES :\n• Carence en N : chlorose (jaunissement) · croissance ralentie\n• Excès d'engrais chimiques : pollution nitrates dans les nappes" },
            { id: 'F-NVMATHS1', type: 'formule', nom: 'La photosynthèse',
              enonce: "LA PHOTOSYNTHÈSE :\nÉQUATION BILAN :\n6CO₂ + 6H₂O + énergie lumineuse → C₆H₁₂O₆ + 6O₂\n\nSIÈGE : CHLOROPLASTE\n• Thylakoïdes (membranes) : contiennent la CHLOROPHYLLE\n• Stroma (milieu liquide) : cycle de Calvin\n\nPHASE PHOTOCHIMIQUE (thylakoïdes, nécessite lumière) :\n• Absorption de la lumière par la chlorophylle\n• PHOTOLYSE DE L'EAU :\n  2H₂O → 4H⁺ + 4e⁻ + O₂ ↑\n  (Origine de l'O₂ libéré : l'eau, pas le CO₂ !)\n• Production de NADPH et ATP\n\nPHASE BIOCHIMIQUE — CYCLE DE CALVIN (stroma, sans besoin direct de lumière) :\n• CO₂ + RuBP → molécules C3\n• Réduction des C3 en glucose → grâce à NADPH + ATP\n• Régénération du RuBP\n\nFACTEURS LIMITANTS DE L'INTENSITÉ PHOTOSYNTHÉTIQUE :\n• Intensité lumineuse\n• Concentration en CO₂\n• Température (action sur les enzymes du cycle de Calvin)\n• Eau\nLe facteur le plus bas est le facteur limitant (loi de Liebig)",
              remarque: 'L\'O₂ produit par la photosynthèse provient de la PHOTOLYSE DE L\'EAU, pas du CO₂. Cette découverte (van Niel, 1931) a été confirmée par marquage isotopique de l\'oxygène de l\'eau (¹⁸O).' },
          ],
          exercices: [
            { id: 'EX-NVMATHS1', niveau: 'Intermédiaire', titre: 'Intensité photosynthétique',
              enonce: "On mesure la photosynthèse d'une plante : à basse lumière, doubler la lumière double la photosynthèse. À haute lumière, doubler la lumière n'a plus d'effet. Expliquer et nommer le phénomène.",
              correction: "À BASSE LUMIÈRE :\nLa lumière est le FACTEUR LIMITANT.\nEn doublant la lumière → plus de photons captés par la chlorophylle → plus de photolyse de l'eau → plus de NADPH et ATP produits → photosynthèse ↑.\n\nÀ HAUTE LUMIÈRE :\nLa lumière n'est plus limitante. Un autre facteur est maintenant limitant (ex. : CO₂ ou enzymes du cycle de Calvin saturées).\nDoubler la lumière n'améliore plus la photosynthèse → plateau.\n\nPHÉNOMÈNE : SATURATION (ou point de compensation lumineux).\nLoi de Liebig du minimum : c'est toujours le facteur en déficit qui limite la réaction." },
          ],
        },
      ],
    },
  ],
},

// ─────────────────────────────────────────────────────────────────────
// CH 13 — ÉVOLUTION BIOLOGIQUE & GÉOLOGIE
// ─────────────────────────────────────────────────────────────────────
'evolution-geologie-maths': {
  id: 'evolution-geologie-maths', emoji: '🌍', tag: 'SVT · Maths', color: '#f97316',
  titre: 'Évolution biologique & Géologie',
  desc: 'CHAPITRE EXCLUSIF SECTION MATHS. L\'évolution biologique est le changement des caractères héréditaires dans les populations au fil du temps. La tectonique des plaques explique la dynamique interne de la Terre : dérive des continents, séismes, volcanisme, formation des chaînes de montagnes.',
  souschapitres: [
    {
      id: 'sc-egm-evol', titre: '13.1 Théories de l\'évolution et preuves',
      notions: ['Lamarck · Darwin · néo-darwinisme', 'Sélection naturelle · adaptation · variabilité génétique', 'Fossiles · anatomie comparée · données génétiques', 'Spéciation · isolement reproducteur'],
      blocs: [
        {
          notion: '🦕 Évolution biologique',
          theoremes: [
            { id: 'D-EGM1', type: 'def', nom: 'Théories de l\'évolution',
              enonce: "L'ÉVOLUTION BIOLOGIQUE est la modification des caractères héréditaires d'une population au fil des générations.\n\nLAMARCK (1809) — Théorie transformiste :\n• Hérédité des caractères acquis\n• Usure/développement des organes selon l'utilisation\n• Non retenu scientifiquement\n\nDARWIN (1859) — Sélection naturelle :\n• Les individus d'une population varient naturellement\n• Lutte pour la survie dans un environnement donné\n• Les individus les mieux adaptés survivent et se reproduisent davantage\n• Les caractères avantageux se transmettent à la descendance\n• Sur de nombreuses générations → évolution des populations\n\nNÉO-DARWINISME (synthèse moderne) :\n• Sources de variation : MUTATIONS (aléatoires) + brassage méiotique\n• SÉLECTION NATURELLE filtre ces variations\n• DÉRIVE GÉNÉTIQUE : modifications aléatoires des fréquences alléliques (petites populations)\n• ISOLEMENT REPRODUCTEUR → SPÉCIATION (formation de nouvelles espèces)\n\nSÉLECTION NATURELLE :\n• Sélection purificatrice : élimine les allèles défavorables\n• Sélection directionnelle : favorise un phénotype extrême (peppered moth)\n• Sélection diversifiante : favorise les phénotypes extrêmes dans 2 niches écologiques" },
            { id: 'D-EGM2', type: 'def', nom: 'Preuves de l\'évolution et spéciation',
              enonce: "PREUVES DE L'ÉVOLUTION :\n\n1. FOSSILES ET STRATIGRAPHIE :\n• Les couches géologiques les plus profondes sont les plus anciennes\n• Formes fossiles intermédiaires (ex : Archaeopteryx entre reptiles et oiseaux)\n• Séries de fossiles montrant l'évolution graduelle (ex : Équidés)\n\n2. ANATOMIE COMPARÉE :\n• HOMOLOGIE : même structure, fonctions différentes\n  Ex : membres antérieurs des vertébrés (nageoire baleine · aile chauve-souris · bras humain)\n  → Même origine évolutive (ancêtre commun)\n• ANALOGIE : structures différentes, même fonction (aile oiseau vs aile insecte)\n  → Pas d'ancêtre commun → évolution convergente\n• ORGANES VESTIGIAUX : restes d'organes (coccyx humain, os de bassin chez baleines)\n\n3. DONNÉES GÉNÉTIQUES ET MOLÉCULAIRES :\n• Code génétique universel → origine commune\n• Plus deux espèces sont proches phylogénétiquement → plus leurs séquences ADN/ARNr sont similaires\n• Phylogénie moléculaire → arbre du vivant\n\nSPÉCIATION :\n• Isolement reproducteur : deux populations séparées évoluent indépendamment\n• Spéciation allopatrique : isolement géographique (ex : îles, montagnes)\n• Accumulation de différences génétiques → impossibilité de se reproduire\n→ Deux espèces distinctes" },
          ],
          exercices: [
            { id: 'EX-EGM1', niveau: 'Intermédiaire', titre: 'Preuves évolutives',
              enonce: "La baleine possède des os de bassin vestigiaux (non fonctionnels) enfouis dans sa musculature. Qu'est-ce que cela indique sur l'évolution des baleines ?",
              correction: "La présence d'OS DE BASSIN VESTIGIAUX chez la baleine est une preuve anatomique de son évolution.\n\nCes os sont des vestiges d'un ANCÊTRE TERRESTRE (mammifère quadrupède) qui possédait des pattes postérieures fonctionnelles.\nLors de la transition vers un mode de vie aquatique, les pattes postérieures ont progressivement régressé par sélection naturelle (inutiles en milieu aquatique).\nCependant, les gènes codant pour ces structures n'ont pas totalement disparu → os vestigiaux persistants.\n\nConclusion : la baleine partage un ancêtre commun avec les mammifères terrestres → évolution à partir d'animaux terrestres il y a environ 50 millions d'années (confirmé par les fossiles de Pakicetus, Ambulocetus)." },
          ],
        },
      ],
    },
    {
      id: 'sc-egm-geo', titre: '13.2 Tectonique des plaques et dynamique interne',
      notions: ['Structure du globe : croûte · manteau · noyau', 'Lithosphère et asthénosphère', 'Dérive des continents · expansion océanique · subduction', 'Séismes · volcanisme · formation des chaînes de montagnes'],
      blocs: [
        {
          notion: '🌋 Tectonique des plaques',
          theoremes: [
            { id: 'D-EGM3', type: 'def', nom: 'Structure interne de la Terre et tectonique',
              enonce: "STRUCTURE INTERNE DE LA TERRE :\n• CROÛTE : continentale (30-70 km, granite) ou océanique (5-10 km, basalte)\n• MANTEAU SUPÉRIEUR : solide, riche en péridotite\n• ASTHÉNOSPHÈRE : zone visqueuse · permet le déplacement des plaques\n• MANTEAU INFÉRIEUR : solide\n• NOYAU EXTERNE : liquide (fer + nickel) · génère le champ magnétique\n• NOYAU INTERNE : solide (températures très élevées)\n\nLITHOSPHÈRE : croûte + manteau supérieur rigide (≈ 100 km d'épaisseur)\nDivisée en PLAQUES TECTONIQUES se déplaçant sur l'asthénosphère\n\nTECTONIQUE DES PLAQUES :\n\nEXPANSION OCÉANIQUE :\n• Dorsales océaniques : montée du magma → formation nouvelle croûte océanique\n• Les plaques s'écartent de part et d'autre de la dorsale\n• Preuve : anomalies magnétiques symétriques, âge croissant des fonds marins\n\nSUBDUCTION :\n• Quand deux plaques convergent, la plus dense (océanique) plonge sous l'autre\n• Zone de subduction : fosse océanique · séismes profonds · volcanisme\n• Provoque : arcs insulaires · chaînes de montagnes côtières\n\nCOLLISION CONTINENTALE :\n• Deux plaques continentales (moins denses) entrent en collision\n• Pas de subduction → FORMATION DE CHAÎNES DE MONTAGNES (Himalaya, Alpes)\n\nSÉISMES :\n• Rupture brutale des roches en profondeur (foyer/hypocentre)\n• Ondes sismiques P (longitudinales) et S (transversales)\n• Epicentre : point en surface au-dessus du foyer\n• Magnitude (Richter) · intensité (effets en surface)\n\nVOLCANISME :\n• Aux dorsales (magma basaltique · peu explosif)\n• Aux zones de subduction (magma siliceux · très explosif)\n• Points chauds (hotspots : Hawaii, Réunion · indépendants des bords de plaques)",
              remarque: 'La tectonique des plaques unifie tout en géologie : séismes · volcanisme · formation des montagnes · dérive des continents · évolution des océans. C\'est la théorie centrale des géosciences modernes.' },
          ],
          exercices: [
            { id: 'EX-EGM2', niveau: 'Facile', titre: 'Dorsale et subduction',
              enonce: "Au niveau d'une dorsale océanique, de la nouvelle croûte se forme en permanence. Pourtant, la Terre ne grossit pas. Comment expliquer ce paradoxe ?",
              correction: "Au niveau des DORSALES OCÉANIQUES :\nDu magma remonte depuis le manteau et se solidifie → nouvelle croûte océanique basaltique.\nLes plaques s'écartent → la croûte océanique s'élargit continuellement.\n\nPARADOXE RÉSOLU : par la SUBDUCTION.\nAu niveau des FOSSES OCÉANIQUES (zones de convergence), la vieille croûte océanique dense plonge sous la croûte continentale moins dense.\n→ Elle est «recyclée» dans le manteau (fusion).\n\nBILAN GLOBAL :\nCréation de croûte (dorsale) = Destruction de croûte (subduction)\n→ Le volume de la Terre reste constant.\nC'est un cycle de renouvellement de la lithosphère océanique (environ 200 millions d'années)." },
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
  const colors: Record<string, string> = { 'Facile': '#4ade80', 'Intermédiaire': '#f59e0b', 'Difficile': '#ef4444' }
  const c = colors[niveau] || '#06b6d4'
  return (
    <span style={{ fontSize: 10, padding: '2px 8px', borderRadius: 12, background: `${c}18`, color: c, fontWeight: 700 }}>{niveau}</span>
  )
}

// ══════════════════════════════════════════════════════════════════════
// PAGE PRINCIPALE
// ══════════════════════════════════════════════════════════════════════

export default function SvtMathsSlugPage() {
  const params = useParams()
  const slug = Array.isArray(params.slug) ? params.slug[0] : (params.slug ?? '')
  const chapter = ALL_CHAPTERS[slug]
  const [openSc, setOpenSc] = useState<string | null>(null)
  const [openEx, setOpenEx] = useState<string | null>(null)

  const curIdx   = NAV_ORDER.indexOf(slug)
  const prevSlug = curIdx > 0 ? NAV_ORDER[curIdx - 1] : null
  const nextSlug = curIdx < NAV_ORDER.length - 1 ? NAV_ORDER[curIdx + 1] : null
  const secColor = SEC_COLORS[slug] || '#4ade80'

  if (!chapter) {
    return (
      <>
        <Navbar />
        <main style={{ paddingTop: 120, minHeight: '60vh', textAlign: 'center' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
          <h1 style={{ fontSize: 24 }}>Chapitre non trouvé</h1>
          <p style={{ color: 'var(--muted)' }}>Le chapitre "{slug}" n'existe pas pour la section Mathématiques (SVT).</p>
          <Link href="/bac/svt/mathematique" className="btn btn-primary" style={{ textDecoration: 'none', display: 'inline-block', marginTop: 20 }}>
            ← Retour aux chapitres SVT Maths
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
            <Link href="/bac/svt/mathematique" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Section Maths</Link>
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
                  <span style={{ fontSize: 11, padding: '2px 10px', borderRadius: 20, background: `${secColor}14`, color: secColor, fontWeight: 700 }}>SVT · Maths</span>
                  <span style={{ fontSize: 11, background: 'rgba(74,222,128,0.15)', color: '#4ade80', padding: '2px 9px', borderRadius: 10 }}>
                    📐 Section Maths · Tunisie
                  </span>
                  {slug === 'evolution-geologie-maths' && (
                    <span style={{ fontSize: 10, background: 'rgba(249,115,22,0.2)', color: '#f97316', padding: '2px 9px', borderRadius: 10, fontWeight: 700 }}>
                      ★ Exclusif Section Maths
                    </span>
                  )}
                </div>
                <h1 style={{ fontSize: 'clamp(22px,3vw,36px)', fontWeight: 800, marginBottom: 10 }}>
                  {chapter.titre}
                </h1>
                <p style={{ color: 'var(--text2)', fontSize: 14, lineHeight: 1.7, maxWidth: 620, marginBottom: 18 }}>{chapter.desc}</p>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  <Link href={`/solve?q=${encodeURIComponent('Explique ' + chapter.titre + ' SVT Section Maths Bac Tunisie')}`}
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
                                      <Link href={`/solve?q=${encodeURIComponent('SVT Section Maths Tunisie — ' + ex.enonce)}`}
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
                  <Link href={`/bac/svt/mathematique/${prevSlug}`} style={{ textDecoration: 'none' }}>
                    <div className="card" style={{ padding: '12px 15px', transition: 'transform 0.15s' }}
                      onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                      onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
                      <div style={{ fontSize: 10, color: 'var(--muted)', marginBottom: 2 }}>← Précédent</div>
                      <div style={{ fontWeight: 700, fontSize: 12 }}>{TITRES_NAV[prevSlug].replace(/CH \d+ — /, '')}</div>
                    </div>
                  </Link>
                ) : <div />}
                {nextSlug ? (
                  <Link href={`/bac/svt/mathematique/${nextSlug}`} style={{ textDecoration: 'none' }}>
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

                {[
                  { label: '🧬 Thème I — Génétique', color: '#4f6ef7', bg: 'rgba(79,110,247,0.08)', slugs: THEME_SLUGS['Thème I — Génétique'] },
                  { label: '🧠 Thème II — Milieu intérieur', color: '#10b981', bg: 'rgba(16,185,129,0.08)', slugs: THEME_SLUGS['Thème II — Milieu intérieur'] },
                  { label: '👶 Thème III — Reproduction', color: '#ec4899', bg: 'rgba(236,72,153,0.08)', slugs: THEME_SLUGS['Thème III — Reproduction'] },
                  { label: '🌿 Thème IV — Nutrition', color: '#22c55e', bg: 'rgba(34,197,94,0.08)', slugs: THEME_SLUGS['Thème IV — Nutrition'] },
                  { label: '🌍 Thème V — Géologie & Évol.', color: '#f97316', bg: 'rgba(249,115,22,0.08)', slugs: THEME_SLUGS['Thème V — Géologie & Évol.'] },
                ].map(theme => (
                  <div key={theme.label}>
                    <div style={{ padding: '10px 14px', borderBottom: '1px solid var(--border)', fontSize: 11, color: theme.color, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', background: theme.bg }}>
                      {theme.label}
                    </div>
                    {theme.slugs.map(s => (
                      <Link key={s} href={`/bac/svt/mathematique/${s}`} style={{ textDecoration: 'none' }}>
                        <div style={{ padding: '8px 15px', borderBottom: '1px solid var(--border)', background: s === slug ? `${SEC_COLORS[s]}12` : 'transparent', borderLeft: s === slug ? `3px solid ${SEC_COLORS[s]}` : '3px solid transparent', transition: 'all 0.15s', cursor: 'pointer' }}
                          onMouseEnter={e => { if (s !== slug) e.currentTarget.style.background = 'rgba(255,255,255,0.03)' }}
                          onMouseLeave={e => { if (s !== slug) e.currentTarget.style.background = 'transparent' }}>
                          <div style={{ fontSize: 10, color: 'var(--muted)', marginBottom: 1, fontFamily: 'var(--font-mono)' }}>{TITRES_NAV[s].split(' — ')[0]}</div>
                          <div style={{ fontSize: 11, fontWeight: s === slug ? 700 : 400, color: s === slug ? SEC_COLORS[s] : 'var(--text2)' }}>{TITRES_NAV[s].replace(/CH \d+ — /, '').slice(0, 26)}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                ))}

              </div>

              {/* Actions */}
              <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '13px' }}>
                <div style={{ fontSize: 11, color: 'var(--muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 9 }}>Actions</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <Link href={`/solve?q=${encodeURIComponent('Explique ' + chapter.titre + ' SVT Section Maths Bac Tunisie')}`}
                    className="btn btn-primary" style={{ textAlign: 'center', fontSize: 12 }}>
                    🤖 Chat IA — SVT Maths
                  </Link>
                  <Link href="/examens" className="btn btn-secondary" style={{ textAlign: 'center', fontSize: 12 }}>📋 Exercice type Bac</Link>
                  <Link href="/simulation" className="btn btn-secondary" style={{ textAlign: 'center', fontSize: 12 }}>🎯 Simulation Bac</Link>
                  <Link href="/bac/svt/mathematique" className="btn btn-secondary" style={{ textAlign: 'center', fontSize: 12 }}>↩ Tous les chapitres</Link>
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
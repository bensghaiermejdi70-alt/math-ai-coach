'use client'
import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import { useParams } from 'next/navigation'

// ══════════════════════════════════════════════════════════════════════
// SECONDE / [SLUG]
// Route : /bac-france/seconde/[slug]
// Programme officiel Seconde Générale Maths
// ══════════════════════════════════════════════════════════════════════

const C = {thm:'#4f6ef7',def:'#06d6a0',formule:'#f59e0b',prop:'#8b5cf6',methode:'#ec4899'}
const L: Record<string,string> = {thm:'Théorème',def:'Définition',formule:'Formule clé',prop:'Propriété',methode:'Méthode'}

const NAV_ORDER = [
  'python-algorithmique','nombres-calculs','intervalles-inequations','calcul-litteral',
  'geometrie-non-reperee','vecteurs-repere','droites-systemes',
  'fonctions-generalites','variations-extremums','signe-fonction',
  'proportions-evolutions','statistiques-descriptives','probabilites-echantillonnage',
]

const TITRES: Record<string,string> = {
  'python-algorithmique':         'Algorithmique & Python',
  'nombres-calculs':              'Nombres & Calculs',
  'intervalles-inequations':      'Intervalles, Inégalités & Inéquations',
  'calcul-litteral':              'Calcul Littéral',
  'geometrie-non-reperee':        'Géométrie non Repérée & Vecteurs',
  'vecteurs-repere':              'Vecteurs & Repère',
  'droites-systemes':             'Droites du Plan & Systèmes',
  'fonctions-generalites':        'Fonctions — Généralités',
  'variations-extremums':         'Variations & Extremums',
  'signe-fonction':               "Signe d'une Fonction",
  'proportions-evolutions':       'Proportions & Évolutions',
  'statistiques-descriptives':    'Statistiques Descriptives',
  'probabilites-echantillonnage': 'Probabilités & Échantillonnage',
}

const SEC_COLOR: Record<string,string> = {
  'python-algorithmique':'#06d6a0','nombres-calculs':'#4f6ef7','intervalles-inequations':'#f59e0b',
  'calcul-litteral':'#8b5cf6','geometrie-non-reperee':'#ec4899','vecteurs-repere':'#06b6d4',
  'droites-systemes':'#f97316','fonctions-generalites':'#10b981','variations-extremums':'#4f6ef7',
  'signe-fonction':'#8b5cf6','proportions-evolutions':'#06b6d4','statistiques-descriptives':'#f59e0b',
  'probabilites-echantillonnage':'#ec4899',
}

const CHAPITRES: Record<string,{
  ch:string; titre:string; badge:string; desc:string; duree:string; section:string;
  theoremes:{id:string; type:string; nom:string; enonce:string}[];
  exercices:{id:string; niveau:string; titre:string; enonce:string; correction:string}[];
}> = {

  'python-algorithmique': {
    ch:'CH 01', titre:'Algorithmique & Python', badge:'Informatique', duree:'~6h', section:'Partie 1 — Algorithmique & Programmation',
    desc:"Python est le langage de programmation au programme de Seconde. On apprend à écrire des algorithmes : variables, conditions, fonctions et boucles.",
    theoremes:[
      {id:'D1',type:'def',nom:'Variables et types',
       enonce:'Types principaux en Python :\n• int : entier  ex: a = 5\n• float : décimal  ex: pi = 3.14\n• str : chaîne  ex: nom = \'Alice\'\n• bool : booléen  ex: ok = True\n\nAffectation : variable = valeur\nprint(type(a))  =>  <class \'int\'>'},
      {id:'D2',type:'def',nom:'Instructions conditionnelles',
       enonce:'if condition:\n    bloc_si_vrai\nelif autre_condition:\n    bloc_sinon_si\nelse:\n    bloc_sinon\n\nComparateurs : ==  !=  <  >  <=  >=\nLogiques : and  or  not\n\nEx:\nnote = 14\nif note >= 16:\n    print(\'Très bien\')\nelif note >= 12:\n    print(\'Bien\')'},
      {id:'D3',type:'def',nom:'Fonctions',
       enonce:'def nom_fonction(param1, param2):\n    # corps de la fonction\n    return résultat\n\nExemple :\ndef aire(longueur, largeur):\n    return longueur * largeur\n\nAppel : print(aire(5, 3))  =>  15\nSans return : la fonction retourne None'},
      {id:'D4',type:'def',nom:'Boucles bornées et conditionnelles',
       enonce:'Boucle bornée FOR :\nfor i in range(n):    # i de 0 à n-1\n    instruction\n\nBoucle conditionnelle WHILE :\nwhile condition:\n    instruction\n\nEx — somme de 1 à 10 :\ntotal = 0\nfor i in range(1, 11):\n    total = total + i\nprint(total)  =>  55'},
      {id:'M1',type:'methode',nom:'Écrire un algorithme en Python',
       enonce:'Étapes :\n1. Identifier les ENTRÉES (input ou paramètres)\n2. Identifier les SORTIES (print ou return)\n3. Décomposer en étapes simples\n4. Coder et tester\n\nEx — tester si un nombre est premier :\ndef est_premier(n):\n    if n < 2: return False\n    for d in range(2, n):\n        if n % d == 0: return False\n    return True'},
    ],
    exercices:[
      {id:'EX01',niveau:'Facile',titre:'Calculer une moyenne',
       enonce:'Écrire une fonction moyenne(a, b, c) qui retourne la moyenne de 3 nombres. Tester avec 12, 15, 9.',
       correction:'def moyenne(a, b, c):\n    return (a + b + c) / 3\n\nprint(moyenne(12, 15, 9))  # 12.0'},
      {id:'EX02',niveau:'Facile',titre:'Multiples de 7',
       enonce:'Afficher tous les multiples de 7 de 1 à 100.',
       correction:'for n in range(1, 101):\n    if n % 7 == 0:\n        print(n)'},
      {id:'EX03',niveau:'Intermédiaire',titre:'Factorielle',
       enonce:'Écrire factorielle(n) = 1 × 2 × ... × n. Tester avec n = 5.',
       correction:'def factorielle(n):\n    r = 1\n    for i in range(1, n+1):\n        r = r * i\n    return r\nprint(factorielle(5))  # 120'},
    ],
  },

  'nombres-calculs': {
    ch:'CH 02', titre:'Nombres & Calculs', badge:'Algèbre', duree:'~5h', section:'Partie 2 — Nombres et calculs',
    desc:"Puissances, racines carrées, ensembles de nombres et divisibilité. Outils indispensables tout au long de l'année.",
    theoremes:[
      {id:'D1',type:'def',nom:'Puissances entières relatives',
       enonce:'a⁰ = 1  |  aⁿ = a × a × ... × a (n fois)\na⁻ⁿ = 1/aⁿ\n\nExemples :\n2⁴ = 16  |  2⁻³ = 1/8 = 0,125\n10⁻² = 0,01  |  3⁰ = 1\n(-2)³ = -8  |  (-2)⁴ = +16'},
      {id:'T1',type:'thm',nom:'Propriétés des puissances',
       enonce:'Pour a, b ≠ 0 et m, n entiers :\n1. aᵐ × aⁿ = aᵐ⁺ⁿ   (même base, on additionne)\n2. aᵐ / aⁿ = aᵐ⁻ⁿ   (même base, on soustrait)\n3. (aᵐ)ⁿ = aᵐⁿ      (puissance de puissance)\n4. (a × b)ⁿ = aⁿ × bⁿ\n\nEx: 2³ × 2⁵ = 2⁸ = 256  |  (3²)⁴ = 3⁸'},
      {id:'D2',type:'def',nom:'Racine carrée',
       enonce:'√a est le réel positif dont le carré vaut a.\nDéfinie seulement pour a ≥ 0.\n(√a)² = a  |  √(a²) = |a|\n\nPropriétés :\n√(a × b) = √a × √b\n√(a/b) = √a / √b\n\nSimplification :\n√12 = √(4×3) = 2√3\n√50 = √(25×2) = 5√2'},
      {id:'F1',type:'formule',nom:'Ensembles de nombres',
       enonce:'ℕ ⊂ ℤ ⊂ D ⊂ ℚ ⊂ ℝ\n\n• ℕ = {0, 1, 2, ...} entiers naturels\n• ℤ = {...,-2,-1,0,1,2,...} entiers relatifs\n• ℚ = {p/q | p∈ℤ, q∈ℤ*} rationnels\n• ℝ = tous les réels\n\nIrrationnels : √2 ≈ 1,41421...  |  π ≈ 3,14159...'},
      {id:'M1',type:'methode',nom:"PGCD — Algorithme d'Euclide",
       enonce:"PGCD(a,b) = Plus Grand Diviseur Commun\n\nAlgorithme d'Euclide :\n→ diviser le plus grand par le plus petit\n→ remplacer par (diviseur, reste)\n→ s'arrêter quand reste = 0\n\nEx: PGCD(48, 18)\n48 = 2×18 + 12\n18 = 1×12 + 6\n12 = 2×6 + 0\nPGCD(48,18) = 6\n\nPPCM(a,b) = a×b / PGCD(a,b) = 144"},
    ],
    exercices:[
      {id:'EX01',niveau:'Facile',titre:'Puissances',
       enonce:'Calculer : 2⁵, 3⁻², 10⁻³, (2²)³',
       correction:'2⁵ = 32\n3⁻² = 1/9 ≈ 0,111\n10⁻³ = 0,001\n(2²)³ = 2⁶ = 64'},
      {id:'EX02',niveau:'Facile',titre:'Simplifier des racines',
       enonce:'Simplifier : √75, √108',
       correction:'√75 = √(25×3) = 5√3\n√108 = √(36×3) = 6√3'},
      {id:'EX03',niveau:'Intermédiaire',titre:'PGCD et fractions',
       enonce:'Calculer PGCD(84, 60), puis simplifier 84/60.',
       correction:'84 = 1×60 + 24\n60 = 2×24 + 12\n24 = 2×12 + 0\nPGCD = 12\n84/60 = 7/5'},
    ],
  },

  'intervalles-inequations': {
    ch:'CH 03', titre:'Intervalles, Inégalités & Inéquations', badge:'Algèbre', duree:'~4h', section:'Partie 2 — Nombres et calculs',
    desc:"Les intervalles décrivent des ensembles de réels. Les inégalités et inéquations servent à résoudre des problèmes avec contraintes.",
    theoremes:[
      {id:'D1',type:'def',nom:"Notations d'intervalles",
       enonce:"[a;b] = {x ∈ ℝ | a ≤ x ≤ b}  fermé : bornes incluses\n]a;b[ = {x ∈ ℝ | a < x < b}  ouvert : bornes exclues\n[a;b[ ou ]a;b]  semi-ouvert\n[a;+∞[ = {x ∈ ℝ | x ≥ a}\n]-∞;b] = {x ∈ ℝ | x ≤ b}\n\nNote : +∞ et -∞ ne sont JAMAIS inclus."},
      {id:'T1',type:'thm',nom:"Propriétés des inégalités",
       enonce:"Si a < b :\n1. c > 0 : ac < bc           (MÊME sens)\n2. c < 0 : ac > bc           (sens INVERSÉ !)\n3. a+c < b+c                 (translation conserve)\n4. 0 < a < b ⟹ 1/a > 1/b   (inverser positifs)\n\nATTENTION : multiplier par un négatif INVERSE le sens !"},
      {id:'M1',type:'methode',nom:"Résoudre une inéquation du 1er degré",
       enonce:"Méthode :\n1. Développer si nécessaire\n2. Isoler x (termes en x d'un côté)\n3. Diviser par le coefficient\n4. Si coefficient négatif : inverser le sens\n5. Écrire la solution en intervalle\n\nEx 1 : 3x - 5 > 2x + 1 ⟹ x > 6 → ]6 ; +∞[\nEx 2 : -2x + 3 ≤ 7 ⟹ x ≥ -2 → [-2 ; +∞["},
      {id:'D2',type:'def',nom:'Valeur absolue',
       enonce:"|x| = x si x ≥ 0  et  |x| = -x si x < 0\n|x| = distance de x à 0\n|x - a| = distance de x à a\n\nRésolution :\n|x| < r  ⟺  -r < x < r    (r > 0)\n|x| > r  ⟺  x < -r  ou  x > r\n|x - a| < r  ⟺  a-r < x < a+r"},
    ],
    exercices:[
      {id:'EX01',niveau:'Facile',titre:"Résoudre une inéquation",
       enonce:'Résoudre : 2x + 3 ≤ x - 5',
       correction:'2x - x ≤ -5 - 3\nx ≤ -8\nSolution : ]-∞ ; -8]'},
      {id:'EX02',niveau:'Facile',titre:"Inéquation avec inversement",
       enonce:'Résoudre : -3x + 6 > 12',
       correction:'-3x > 6\nx < -2  (division par -3 : sens inversé !)\nSolution : ]-∞ ; -2['},
      {id:'EX03',niveau:'Intermédiaire',titre:'Valeur absolue',
       enonce:'Résoudre : |2x - 1| ≤ 5',
       correction:'-5 ≤ 2x-1 ≤ 5\n-4 ≤ 2x ≤ 6\n-2 ≤ x ≤ 3\nSolution : [-2 ; 3]'},
    ],
  },

  'calcul-litteral': {
    ch:'CH 04', titre:'Calcul Littéral', badge:'Algèbre', duree:'~5h', section:'Partie 2 — Nombres et calculs',
    desc:"Identités remarquables, factorisation et résolution d'équations produit et quotient.",
    theoremes:[
      {id:'F1',type:'formule',nom:'Identités remarquables',
       enonce:"(a+b)² = a² + 2ab + b²    (carré d'une somme)\n(a-b)² = a² - 2ab + b²    (carré d'une différence)\n(a+b)(a-b) = a² - b²      (produit de conjugués)\n\nExemples développement :\n(x+3)² = x² + 6x + 9\n(x+4)(x-4) = x² - 16\n\nExemples factorisation :\nx² + 6x + 9 = (x+3)²\n4x² - 25 = (2x-5)(2x+5)"},
      {id:'T1',type:'thm',nom:'Propriété du produit nul',
       enonce:"A × B = 0  ⟺  A = 0  ou  B = 0\n\nApplication :\nx² - 5x + 6 = 0\n⟹ (x-2)(x-3) = 0\n⟹ x = 2  ou  x = 3\n\nMéthode : factoriser AVANT d'appliquer !"},
      {id:'M1',type:'methode',nom:'Développer et factoriser',
       enonce:"DÉVELOPPER : k(a+b) = ka + kb\n\nFACTORISER :\n1. Facteur commun : 6x²+9x = 3x(2x+3)\n2. Identité : x²-9 = (x-3)(x+3)\n3. Trinôme : x²+5x+6 = (x+2)(x+3)\n\nToujours vérifier en redéveloppant !"},
      {id:'D1',type:'def',nom:'Fractions algébriques et équation quotient',
       enonce:"A/B = 0  ⟺  A = 0  ET  B ≠ 0\n\nEx: (x-2)/(x+1) = 0\n⟹ x-2 = 0  et  x+1 ≠ 0\n⟹ x = 2  et  x ≠ -1\nSolution : x = 2"},
    ],
    exercices:[
      {id:'EX01',niveau:'Facile',titre:'Développer',
       enonce:'Développer et réduire : (x+5)² - (x-3)(x+3)',
       correction:'(x+5)² = x² + 10x + 25\n(x-3)(x+3) = x² - 9\nRésultat = 10x + 34'},
      {id:'EX02',niveau:'Facile',titre:'Factoriser',
       enonce:'Factoriser : 9x² - 6x + 1',
       correction:'= (3x)² - 2(3x)(1) + 1² = (3x-1)²'},
      {id:'EX03',niveau:'Intermédiaire',titre:'Résoudre par factorisation',
       enonce:'Résoudre : x² - 7x + 12 = 0',
       correction:'(x-3)(x-4) = 0\nx = 3  ou  x = 4'},
    ],
  },

  'geometrie-non-reperee': {
    ch:'CH 05', titre:'Géométrie & Vecteurs', badge:'Géométrie', duree:'~5h', section:'Partie 3 — Géométrie',
    desc:"Les vecteurs représentent des déplacements dans le plan. Base de la géométrie analytique et de la physique.",
    theoremes:[
      {id:'D1',type:'def',nom:'Vecteur — définition',
       enonce:"Un vecteur AB est caractérisé par :\n1. Sa DIRECTION : droite (AB) et parallèles\n2. Son SENS : de A vers B\n3. Sa NORME : longueur AB (notée ||AB||)\n\nDeux vecteurs égaux : même direction, sens et norme.\nVecteur nul : norme = 0  |  AA = 0"},
      {id:'T1',type:'thm',nom:'Relation de Chasles',
       enonce:"Pour tous points A, B, C :\nAC = AB + BC\n\nConséquences :\nAB + BA = 0  (vecteur opposé : BA = -AB)\nAB = AO + OB  (décomposition par O)\n\nEx: si M milieu de [BC]\nAM = AB + (1/2)BC"},
      {id:'D2',type:'def',nom:'Multiplication par un réel',
       enonce:"k·u est le vecteur de :\n- même direction que u (si k ≠ 0)\n- même sens si k > 0, opposé si k < 0\n- norme |k| × ||u||\n\nColinéarité :\nu et v colinéaires ⟺ u = k·v  pour un k réel\n⟺ droites parallèles ou confondues"},
      {id:'P1',type:'prop',nom:'Théorème de Thalès',
       enonce:"Si MN // BC :\nAM/AB = AN/AC\n\nRéciproque : AM/AB = AN/AC ⟹ MN // BC\n\nPythagore : triangle rectangle en A\nBC² = AB² + AC²"},
    ],
    exercices:[
      {id:'EX01',niveau:'Facile',titre:'Relation de Chasles',
       enonce:'ABCD est un parallélogramme. Exprimer AC en fonction de AB et AD.',
       correction:'ABCD parallélogramme ⟹ BC = AD\nAC = AB + BC = AB + AD'},
      {id:'EX02',niveau:'Intermédiaire',titre:'Colinéarité',
       enonce:'M est tel que AM = (2/3)AB. Que dire de M par rapport à [AB] ?',
       correction:'AM et AB colinéaires ⟹ M sur la droite (AB)\n2/3 entre 0 et 1 ⟹ M entre A et B, aux 2/3 de AB depuis A'},
    ],
  },

  'vecteurs-repere': {
    ch:'CH 06', titre:'Vecteurs & Repère', badge:'Géométrie', duree:'~4h', section:'Partie 3 — Géométrie',
    desc:"Coordonnées de vecteurs, distances et colinéarité par le calcul.",
    theoremes:[
      {id:'D1',type:'def',nom:'Repère et coordonnées',
       enonce:"Repère (O ; i, j) : origine O + vecteurs directeurs i et j\nTout vecteur u = a·i + b·j  (coordonnées (a;b))\n\nCoordonnées de AB :\nSi A(xA;yA) et B(xB;yB)\n⟹ AB = (xB-xA ; yB-yA)\n\nOpérations :\nu(a;b) + v(a';b') = (a+a' ; b+b')\nk·u(a;b) = (ka ; kb)"},
      {id:'F1',type:'formule',nom:'Milieu et distance',
       enonce:"Milieu I de [AB] :\nxI = (xA+xB)/2   yI = (yA+yB)/2\n\nDistance AB :\nAB = √((xB-xA)² + (yB-yA)²)\n\nNorme : ||u(a;b)|| = √(a² + b²)\n\nEx: A(1;3), B(4;7)\nAB = (3;4) ⟹ ||AB|| = 5"},
      {id:'T1',type:'thm',nom:'Colinéarité en coordonnées',
       enonce:"u(a;b) et v(a';b') colinéaires\n⟺  ab' - a'b = 0  (déterminant nul)\n\nA, B, C alignés ⟺ det(AB, AC) = 0\n(AB) // (CD) ⟺ AB et CD colinéaires\n\nEx: A(0;0), B(2;4), C(3;6)\ndet = 2×6 - 4×3 = 0 ⟹ alignés"},
    ],
    exercices:[
      {id:'EX01',niveau:'Facile',titre:'Coordonnées de vecteur',
       enonce:'A(2;-1), B(5;3). Calculer AB et ||AB||.',
       correction:'AB = (3;4)\n||AB|| = √(9+16) = 5'},
      {id:'EX02',niveau:'Intermédiaire',titre:'Trois points alignés ?',
       enonce:'Vérifier si A(0;0), B(2;4) et C(3;6) sont alignés.',
       correction:'AB=(2;4), AC=(3;6)\ndet = 2×6 - 4×3 = 0 ⟹ alignés (tous sur y = 2x)'},
    ],
  },

  'droites-systemes': {
    ch:'CH 07', titre:'Droites du Plan & Systèmes', badge:'Géométrie', duree:'~5h', section:'Partie 3 — Géométrie',
    desc:"Équations de droites et résolution de systèmes de deux équations à deux inconnues.",
    theoremes:[
      {id:'D1',type:'def',nom:"Équations d'une droite",
       enonce:"Forme réduite : y = mx + p\nm = coefficient directeur (pente)\np = ordonnée à l'origine\n\nCalcul depuis A(xA;yA) et B(xB;yB) :\nm = (yB-yA)/(xB-xA)  puis  p = yA - m·xA\n\nForme cartésienne : ax + by + c = 0\nDroite verticale : x = k"},
      {id:'T1',type:'thm',nom:'Positions relatives de deux droites',
       enonce:"d1 : y=m1x+p1  et  d2 : y=m2x+p2\n\nParallèles : m1 = m2  et  p1 ≠ p2\nConfondues : m1 = m2  et  p1 = p2\nSécantes : m1 ≠ m2  (un seul point commun)\nPerpendiculaires : m1 × m2 = -1"},
      {id:'M1',type:'methode',nom:'Résoudre un système 2×2',
       enonce:"Substitution : isoler x dans eq1, substituer dans eq2.\nCombinaison : multiplier pour éliminer une inconnue.\n\nEx: { 2x + y = 5\n     { x - y = 1\nAddition : 3x = 6 ⟹ x = 2, y = 1\nToujours vérifier dans les 2 équations !"},
    ],
    exercices:[
      {id:'EX01',niveau:'Facile',titre:"Équation de droite",
       enonce:'Droite passant par A(1;3) et B(3;7).',
       correction:'m = (7-3)/(3-1) = 2\np = 3 - 2×1 = 1\ny = 2x + 1'},
      {id:'EX02',niveau:'Intermédiaire',titre:'Résoudre un système',
       enonce:'Résoudre : { 3x - y = 5  et  { x + 2y = 4',
       correction:'y = 3x-5\nx + 2(3x-5) = 4  ⟹  7x = 14  ⟹  x=2, y=1'},
    ],
  },

  'fonctions-generalites': {
    ch:'CH 08', titre:'Fonctions — Généralités', badge:'Fonctions', duree:'~6h', section:'Partie 4 — Fonctions',
    desc:"Définition, image, antécédent, parité et fonctions de référence à connaître.",
    theoremes:[
      {id:'D1',type:'def',nom:'Vocabulaire des fonctions',
       enonce:"f : D → ℝ associe à tout x un UNIQUE réel f(x).\n\nEnsemble de définition D : valeurs autorisées pour x\nImage de x par f : f(x)\nAntécédent de y par f : x tel que f(x) = y\n\nCourbe Cf : ensemble des points (x ; f(x))\nM(a;b) ∈ Cf  ⟺  f(a) = b"},
      {id:'D2',type:'def',nom:'Fonctions de référence',
       enonce:"f(x) = x²  (parabole)\n D = ℝ  |  décroit sur ]-∞;0]  |  croît sur [0;+∞[\n minimum 0 en x=0  |  PAIRE\n\nf(x) = x³  (cubique)\n D = ℝ  |  croissante sur ℝ  |  IMPAIRE\n\nf(x) = 1/x  (hyperbole)\n D = ℝ\\{0}  |  décroissante sur chaque partie  |  IMPAIRE\n\nf(x) = √x\n D = [0;+∞[  |  croissante  |  ni paire ni impaire"},
      {id:'D3',type:'def',nom:"Parité d'une fonction",
       enonce:"D doit être symétrique par rapport à 0.\n\nFonction PAIRE : f(-x) = f(x) pour tout x\n⟹ Cf symétrique par rapport à l'axe Oy\nEx : x², cos(x)\n\nFonction IMPAIRE : f(-x) = -f(x) pour tout x\n⟹ Cf symétrique par rapport à l'origine O\nEx : x³, x, 1/x"},
      {id:'M1',type:'methode',nom:'Résolutions graphiques',
       enonce:"f(x) = k : abscisses des intersections de Cf avec y = k\nf(x) > k : x pour lesquels Cf est AU-DESSUS de y = k\nf(x) = g(x) : abscisses des intersections de Cf et Cg"},
    ],
    exercices:[
      {id:'EX01',niveau:'Facile',titre:'Image et antécédent',
       enonce:'f(x) = 2x² - 3x + 1. Calculer f(2) et f(-1).',
       correction:'f(2) = 8 - 6 + 1 = 3\nf(-1) = 2 + 3 + 1 = 6'},
      {id:'EX02',niveau:'Intermédiaire',titre:'Parité',
       enonce:'Étudier la parité de f(x) = x³ - x.',
       correction:'f(-x) = -x³ + x = -(x³-x) = -f(x)\n⟹ f est IMPAIRE'},
    ],
  },

  'variations-extremums': {
    ch:'CH 09', titre:'Variations & Extremums', badge:'Fonctions', duree:'~4h', section:'Partie 4 — Fonctions',
    desc:"Étude des variations, tableau de variations et extremums d'une fonction.",
    theoremes:[
      {id:'D1',type:'def',nom:'Croissance et décroissance',
       enonce:"f croissante sur I : pour tout a < b dans I : f(a) < f(b)\nf décroissante sur I : pour tout a < b dans I : f(a) > f(b)\n\nTableau de variations :\nFlèche montante ↗ : croissante\nFlèche descendante ↘ : décroissante"},
      {id:'D2',type:'def',nom:'Maximum et minimum',
       enonce:"Maximum global : f(a) ≥ f(x) pour tout x ∈ D\nMinimum global : f(a) ≤ f(x) pour tout x ∈ D\n\nExtremum local :\n- croissante → décroissante : MAXIMUM local\n- décroissante → croissante : MINIMUM local"},
      {id:'P1',type:'prop',nom:'Variations des fonctions usuelles',
       enonce:"f(x) = mx + p :\nm > 0 : croissante sur ℝ\nm < 0 : décroissante sur ℝ\n\nf(x) = x² : décroit sur ]-∞;0] et croît sur [0;+∞[\nf(x) = 1/x : décroissante sur ]-∞;0[ et ]0;+∞[\nf(x) = √x : croissante sur [0;+∞["},
    ],
    exercices:[
      {id:'EX01',niveau:'Facile',titre:'Lire un tableau de variations',
       enonce:'f croissante sur [-2;1], décroissante sur [1;4]. f(-2)=0, f(1)=5, f(4)=-1. Max et min ?',
       correction:'Maximum : f(1) = 5\nMinimum : f(4) = -1'},
      {id:'EX02',niveau:'Intermédiaire',titre:'Fonction affine',
       enonce:'f(x) = -3x + 7. Tableau de variations et f(-1), f(4).',
       correction:'m = -3 < 0 ⟹ décroissante sur ℝ\nf(-1) = 10  |  f(4) = -5'},
    ],
  },

  'signe-fonction': {
    ch:'CH 10', titre:"Signe d'une Fonction", badge:'Fonctions', duree:'~5h', section:'Partie 4 — Fonctions',
    desc:"Tableaux de signes, produits et quotients de fonctions, résolution d'inéquations.",
    theoremes:[
      {id:'M1',type:'methode',nom:"Signe d'une fonction affine",
       enonce:"f(x) = ax + b  avec a ≠ 0\nZéro unique : x₀ = -b/a\n\nSi a > 0 : f(x) < 0 sur ]-∞;x₀[  et  f(x) > 0 sur ]x₀;+∞[\nSi a < 0 : inverse\n\nEx: f(x) = 2x - 6\nZéro : x₀ = 3, a > 0\n⟹ f(x) < 0 sur ]-∞;3[  et  f(x) > 0 sur ]3;+∞["},
      {id:'T1',type:'thm',nom:'Signe produit et quotient',
       enonce:"Règle des signes :\n(+)(+) = (+)  |  (-)(-) = (+)  |  (+)(-) = (-)\n\nMéthode pour A(x)·B(x) :\n1. Trouver les zéros de A et B\n2. Tableau de signes de chaque facteur\n3. Multiplier ligne par ligne\n\nPour A/B : même méthode + exclure les zéros de B"},
      {id:'M2',type:'methode',nom:'Inéquation par tableau de signes',
       enonce:"Ex: (x-1)(x+3) > 0\n\nZéros : x=1 et x=-3\n\nTableau :\n       ]-∞;-3[  -3  ]-3;1[  1  ]1;+∞[\n(x+3)    -       0     +     +     +\n(x-1)    -       -     -     0     +\nProduit  +       0     -     0     +\n\nSolution de > 0 : ]-∞;-3[ ∪ ]1;+∞["},
    ],
    exercices:[
      {id:'EX01',niveau:'Facile',titre:"Signe d'un produit",
       enonce:'Résoudre (x+2)(x-5) ≤ 0',
       correction:'Zéros : x=-2 et x=5\nProduit ≤ 0 sur [-2 ; 5]'},
      {id:'EX02',niveau:'Intermédiaire',titre:"Signe d'un quotient",
       enonce:'Résoudre (2x-4)/(x+1) > 0',
       correction:'Zéros : x=2 (num)  |  x=-1 (den, exclu)\nSolution : ]-∞;-1[ ∪ ]2;+∞['},
    ],
  },

  'proportions-evolutions': {
    ch:'CH 11', titre:'Proportions & Évolutions', badge:'Stats & Probas', duree:'~4h', section:'Partie 5 — Statistiques et probabilités',
    desc:"Pourcentages, taux d'évolution et coefficients multiplicateurs.",
    theoremes:[
      {id:'D1',type:'def',nom:"Taux d'évolution et coefficient multiplicateur",
       enonce:"Taux d'évolution de Vi à Vf :\nt = (Vf - Vi) / Vi  (en décimal ou en %)\n\nCoefficient multiplicateur :\nCM = Vf / Vi = 1 + t\n\nRelations :\nVf = Vi × CM  |  t = CM - 1\n\nHausse 20% ⟹ CM = 1,20\nBaisse 15% ⟹ CM = 0,85"},
      {id:'T1',type:'thm',nom:'Évolutions successives et réciproques',
       enonce:"Évolutions successives :\nCM_total = CM1 × CM2\n\nATTENTION : +20% puis -20% ≠ 0%\nCM = 1,20 × 0,80 = 0,96 ⟹ baisse de 4% !\n\nÉvolution réciproque :\nPour annuler CM : CM_inverse = 1/CM\nEx: +25% (CM=1,25) ⟹ annuler avec -20% (CM=0,8)"},
    ],
    exercices:[
      {id:'EX01',niveau:'Facile',titre:'Calcul de CM',
       enonce:"Un article passe de 80€ à 96€. Taux d'évolution ?",
       correction:'CM = 96/80 = 1,20\nt = +20%'},
      {id:'EX02',niveau:'Intermédiaire',titre:'Évolutions successives',
       enonce:'+10% puis -10% : évolution globale ?',
       correction:'CM = 1,10 × 0,90 = 0,99\nt = -1%  (pas 0% !)'},
    ],
  },

  'statistiques-descriptives': {
    ch:'CH 12', titre:'Statistiques Descriptives', badge:'Stats & Probas', duree:'~5h', section:'Partie 5 — Statistiques et probabilités',
    desc:"Indicateurs de position (moyenne, médiane) et de dispersion (écart-type, quartiles).",
    theoremes:[
      {id:'F1',type:'formule',nom:'Moyenne',
       enonce:"Moyenne simple de n valeurs :\nx̄ = (x1 + x2 + ... + xn) / n\n\nMoyenne pondérée :\nx̄ = (n1·x1 + n2·x2 + ...) / (n1+n2+...)\n\nLinéarité : si y = ax + b ⟹ ȳ = a·x̄ + b\n\nEx: notes 10, 12, 15, 14, 9\nx̄ = 60/5 = 12"},
      {id:'F2',type:'formule',nom:'Écart-type',
       enonce:"Variance : V = (1/n) × Σ(xi - x̄)²\nÉcart-type : σ = √V\n\nσ mesure la dispersion :\nσ faible : données groupées près de x̄\nσ grand : données dispersées\n\nEx: 10,12,15,14,9 ; x̄=12\nV = (4+0+9+4+9)/5 = 5,2  ⟹  σ ≈ 2,28"},
      {id:'D1',type:'def',nom:'Médiane et quartiles',
       enonce:"Médiane Me : 50% des données de chaque côté\nQuartile Q1 : 25% des données ≤ Q1\nQuartile Q3 : 75% des données ≤ Q3\nÉcart interquartile : EI = Q3 - Q1\n\nBoîte à moustaches :\n[min ---[ Q1 | Me | Q3 ]--- max]"},
    ],
    exercices:[
      {id:'EX01',niveau:'Facile',titre:'Moyenne et écart-type',
       enonce:'Calculer x̄ et σ pour : 4, 6, 8, 10, 12.',
       correction:'x̄ = 40/5 = 8\nV = (16+4+0+4+16)/5 = 8\nσ = 2√2 ≈ 2,83'},
      {id:'EX02',niveau:'Facile',titre:'Médiane et quartiles',
       enonce:'Données : 3, 5, 7, 9, 11, 13, 15, 17. Calculer Q1, Me, Q3.',
       correction:'Me = (7+9)/2 = 8\nQ1 = (5+7)/2 = 6\nQ3 = (13+15)/2 = 14  |  EI = 8'},
    ],
  },

  'probabilites-echantillonnage': {
    ch:'CH 13', titre:'Probabilités & Échantillonnage', badge:'Stats & Probas', duree:'~5h', section:'Partie 5 — Statistiques et probabilités',
    desc:"Calcul des probabilités, opérations sur les événements et intervalle de fluctuation.",
    theoremes:[
      {id:'D1',type:'def',nom:'Vocabulaire des probabilités',
       enonce:"Univers Ω : ensemble de tous les résultats\nÉvénement : sous-ensemble de Ω\nProbabilité P :\n0 ≤ P(A) ≤ 1  |  P(Ω) = 1\n\nÉquiprobabilité : P(A) = card(A)/card(Ω)\n\nEx: dé à 6 faces\nP(pair) = 3/6 = 1/2"},
      {id:'T1',type:'thm',nom:'Opérations sur les événements',
       enonce:"Contraire : P(Ā) = 1 - P(A)\n\nRéunion :\nP(A∪B) = P(A) + P(B) - P(A∩B)\nSi incompatibles : P(A∪B) = P(A) + P(B)\n\nIndépendance :\nA et B indépendants ⟺ P(A∩B) = P(A) × P(B)"},
      {id:'T2',type:'thm',nom:'Intervalle de fluctuation',
       enonce:"Échantillon taille n, proportion p.\n\nIntervalle de fluctuation 95% :\n[p - 1/√n  ;  p + 1/√n]\n\nValable si n ≥ 25 et 0,2 ≤ p ≤ 0,8\n\nf ∈ intervalle : résultat conforme\nf ∉ intervalle : résultat surprenant\n\nEx: p=0,4, n=100 ⟹ [0,3 ; 0,5]"},
    ],
    exercices:[
      {id:'EX01',niveau:'Facile',titre:'Calcul de probabilités',
       enonce:'Dé équilibré 6 faces. P(multiple de 3) et P(au moins 4) ?',
       correction:'P(mult 3) = 2/6 = 1/3\nP(≥4) = 3/6 = 1/2'},
      {id:'EX02',niveau:'Intermédiaire',titre:'Intervalle de fluctuation',
       enonce:'p=0,3, n=400. Intervalle et f=0,28 ?',
       correction:'I = [0,3-0,05 ; 0,3+0,05] = [0,25 ; 0,35]\nf=0,28 ∈ I ⟹ conforme, pas surprenant'},
    ],
  },
}

function TypeBadge({type}:{type:string}) {
  const color = C[type as keyof typeof C]||C.def
  return <span style={{fontSize:11,fontWeight:700,padding:'3px 10px',borderRadius:20,background:`${color}20`,color,border:`1px solid ${color}30`,flexShrink:0}}>{L[type as keyof typeof L]||type}</span>
}

export default function SecondeChapterPage() {
  const params = useParams()
  const slug = params?.slug as string
  const ch = CHAPITRES[slug]
  const [openEx, setOpenEx] = useState<string|null>(null)
  const secColor = SEC_COLOR[slug]||'#10b981'

  if (!ch) return (
    <>
      <Navbar />
      <main style={{paddingTop:80,minHeight:'50vh',display:'flex',alignItems:'center',justifyContent:'center'}}>
        <div style={{textAlign:'center'}}>
          <div style={{fontSize:48,marginBottom:16}}>📐</div>
          <h2 style={{marginBottom:12}}>Chapitre non trouvé</h2>
          <Link href="/bac-france/seconde" style={{color:'#10b981'}}>← Retour Seconde</Link>
        </div>
      </main>
      <Footer />
    </>
  )

  const idx = NAV_ORDER.indexOf(slug)
  const prevSlug = idx>0 ? NAV_ORDER[idx-1] : null
  const nextSlug = idx<NAV_ORDER.length-1 ? NAV_ORDER[idx+1] : null

  return (
    <>
      <Navbar />
      <main style={{position:'relative',zIndex:1,paddingTop:80}}>
        {/* Fil d'Ariane */}
        <div style={{borderBottom:'1px solid var(--border)',padding:'14px clamp(20px,5vw,60px)',display:'flex',gap:8,fontSize:13,color:'var(--muted)',alignItems:'center',flexWrap:'wrap'}}>
          <Link href="/bac-france" style={{color:'var(--muted)',textDecoration:'none'}}>Bac France</Link>
          <span>›</span>
          <Link href="/bac-france/seconde" style={{color:'var(--muted)',textDecoration:'none'}}>Seconde</Link>
          <span>›</span>
          <span style={{color:secColor,fontWeight:600}}>{ch.ch} — {ch.titre}</span>
        </div>
        <div className="container" style={{paddingTop:40,paddingBottom:80}}>
          <div style={{display:'grid',gridTemplateColumns:'1fr 275px',gap:32,alignItems:'start'}}>
            <div>
              {/* Header */}
              <div style={{marginBottom:32}}>
                <div style={{display:'flex',gap:8,marginBottom:12,flexWrap:'wrap'}}>
                  <span style={{fontFamily:'var(--font-mono)',fontSize:12,background:'var(--surface2)',color:'var(--muted)',padding:'3px 10px',borderRadius:8}}>Seconde · {ch.ch}</span>
                  <span style={{fontSize:12,background:`${secColor}20`,color:secColor,padding:'3px 10px',borderRadius:12,fontWeight:600}}>{ch.badge}</span>
                  <span style={{fontSize:11,background:'rgba(16,185,129,0.1)',color:'#34d399',padding:'3px 10px',borderRadius:12}}>Programme officiel Seconde</span>
                </div>
                <h1 style={{fontSize:'clamp(22px,3.5vw,36px)',marginBottom:8}}>{ch.titre}</h1>
                <div style={{fontSize:12,color:secColor,marginBottom:8}}>📂 {ch.section}</div>
                <p style={{color:'var(--text2)',fontSize:14,lineHeight:1.65,marginBottom:14,maxWidth:640}}>{ch.desc}</p>
                <div style={{display:'flex',gap:16,fontSize:12,color:'var(--muted)',flexWrap:'wrap'}}>
                  <span>📊 {ch.theoremes.length} théorèmes & formules</span><span>·</span>
                  <span>📝 {ch.exercices.length} exercices</span><span>·</span>
                  <span>⏱ {ch.duree}</span>
                </div>
              </div>
              {/* Légende */}
              <div style={{display:'flex',gap:8,flexWrap:'wrap',marginBottom:24,padding:'10px 14px',background:'var(--surface)',borderRadius:12,border:'1px solid var(--border)'}}>
                <span style={{fontSize:12,color:'var(--muted)',marginRight:4,alignSelf:'center'}}>Légende :</span>
                {Object.entries(L).map(([k,v])=>(
                  <span key={k} style={{fontSize:11,padding:'2px 10px',borderRadius:20,background:`${C[k as keyof typeof C]}18`,color:C[k as keyof typeof C],border:`1px solid ${C[k as keyof typeof C]}25`,fontWeight:600}}>{v}</span>
                ))}
              </div>
              {/* Cours */}
              <div style={{marginBottom:44}}>
                <h2 style={{fontSize:20,marginBottom:18}}>📐 Cours officiel — Théorèmes & Formules</h2>
                <div style={{display:'flex',flexDirection:'column',gap:13}}>
                  {ch.theoremes.map(t=>{
                    const color=C[t.type as keyof typeof C]||C.def
                    return (
                      <div key={t.id} style={{borderLeft:`3px solid ${color}`,background:`${color}07`,borderRadius:'0 12px 12px 0',padding:'15px 20px',border:`1px solid ${color}18`}}>
                        <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:8,gap:10,flexWrap:'wrap'}}>
                          <div style={{fontWeight:700,fontSize:14,color:'var(--text)'}}>{t.nom}</div>
                          <TypeBadge type={t.type}/>
                        </div>
                        <div style={{fontSize:13,color:'var(--text2)',lineHeight:1.8,whiteSpace:'pre-line',fontFamily:(t.type==='formule'||t.type==='methode')?'var(--font-mono)':'inherit'}}>{t.enonce}</div>
                      </div>
                    )
                  })}
                </div>
              </div>
              {/* Exercices */}
              <div style={{marginBottom:44}}>
                <h2 style={{fontSize:20,marginBottom:18}}>📝 Exercices</h2>
                <div style={{display:'flex',flexDirection:'column',gap:11}}>
                  {ch.exercices.map(ex=>(
                    <div key={ex.id} style={{background:'var(--surface)',border:'1px solid var(--border)',borderRadius:14,overflow:'hidden'}}>
                      <div style={{padding:'15px 20px'}}>
                        <div style={{display:'flex',gap:8,alignItems:'center',marginBottom:8,flexWrap:'wrap'}}>
                          <span style={{fontFamily:'var(--font-mono)',fontSize:11,color:'var(--muted)',background:'var(--surface2)',padding:'2px 8px',borderRadius:6}}>{ex.id}</span>
                          <span style={{fontSize:11,padding:'2px 8px',borderRadius:10,fontWeight:600,background:ex.niveau==='Facile'?'rgba(6,214,160,0.15)':'rgba(245,158,11,0.15)',color:ex.niveau==='Facile'?'#06d6a0':'#f59e0b'}}>{ex.niveau}</span>
                          <span style={{fontWeight:600,fontSize:14,color:'var(--text)'}}>{ex.titre}</span>
                        </div>
                        <p style={{fontSize:13,color:'var(--text2)',margin:0,lineHeight:1.6,whiteSpace:'pre-line'}}>{ex.enonce}</p>
                      </div>
                      <div style={{borderTop:'1px solid var(--border)',padding:'10px 20px',display:'flex',gap:10,flexWrap:'wrap'}}>
                        <Link href={`/solve?q=${encodeURIComponent('Seconde France, '+ch.titre+' — '+ex.enonce)}`} className="btn btn-primary" style={{fontSize:12,padding:'6px 14px'}}>
                          🧮 Résoudre avec IA
                        </Link>
                        <button onClick={()=>setOpenEx(openEx===ex.id?null:ex.id)} style={{fontSize:12,padding:'6px 14px',borderRadius:8,border:'1px solid var(--border)',background:'transparent',color:'var(--text2)',cursor:'pointer',fontFamily:'inherit'}}>
                          📋 {openEx===ex.id?'Masquer':'Correction'}
                        </button>
                      </div>
                      {openEx===ex.id&&(
                        <div style={{padding:'13px 20px',borderTop:'1px solid var(--border)',background:`${secColor}06`}}>
                          <div style={{fontSize:11,color:secColor,fontWeight:700,marginBottom:5}}>✅ Correction</div>
                          <div style={{fontSize:13,color:'var(--text2)',lineHeight:1.75,whiteSpace:'pre-line'}}>{ex.correction}</div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              {/* Nav */}
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,borderTop:'1px solid var(--border)',paddingTop:22}}>
                {prevSlug?(<Link href={`/bac-france/seconde/${prevSlug}`} style={{textDecoration:'none'}}>
                  <div className="card" style={{padding:'13px 16px',transition:'transform 0.15s'}} onMouseEnter={e=>e.currentTarget.style.transform='translateY(-2px)'} onMouseLeave={e=>e.currentTarget.style.transform='translateY(0)'}>
                    <div style={{fontSize:11,color:'var(--muted)',marginBottom:3}}>← Précédent</div>
                    <div style={{fontWeight:700,fontSize:13}}>{TITRES[prevSlug]}</div>
                  </div>
                </Link>):<div/>}
                {nextSlug?(<Link href={`/bac-france/seconde/${nextSlug}`} style={{textDecoration:'none'}}>
                  <div className="card" style={{padding:'13px 16px',textAlign:'right',transition:'transform 0.15s'}} onMouseEnter={e=>e.currentTarget.style.transform='translateY(-2px)'} onMouseLeave={e=>e.currentTarget.style.transform='translateY(0)'}>
                    <div style={{fontSize:11,color:'var(--muted)',marginBottom:3}}>Suivant →</div>
                    <div style={{fontWeight:700,fontSize:13}}>{TITRES[nextSlug]}</div>
                  </div>
                </Link>):<div/>}
              </div>
            </div>
            {/* Sidebar */}
            <aside style={{position:'sticky',top:88}}>
              <div style={{background:'var(--surface)',border:'1px solid var(--border)',borderRadius:16,overflow:'hidden',marginBottom:14}}>
                <div style={{padding:'11px 15px',borderBottom:'1px solid var(--border)',fontSize:11,color:'var(--muted)',fontWeight:700,textTransform:'uppercase',letterSpacing:'0.08em'}}>📘 Seconde — 13 chapitres</div>
                {NAV_ORDER.map((s,i)=>(
                  <Link key={s} href={`/bac-france/seconde/${s}`} style={{textDecoration:'none'}}>
                    <div style={{padding:'9px 15px',borderBottom:i<NAV_ORDER.length-1?'1px solid var(--border)':'none',background:s===slug?`${SEC_COLOR[s]}12`:'transparent',borderLeft:s===slug?`3px solid ${SEC_COLOR[s]}`:'3px solid transparent',transition:'all 0.15s',cursor:'pointer'}}
                      onMouseEnter={e=>{if(s!==slug)e.currentTarget.style.background='rgba(255,255,255,0.03)'}}
                      onMouseLeave={e=>{if(s!==slug)e.currentTarget.style.background='transparent'}}>
                      <div style={{fontSize:10,color:'var(--muted)',marginBottom:1,fontFamily:'var(--font-mono)'}}>CH {String(i+1).padStart(2,'0')}</div>
                      <div style={{fontSize:11,fontWeight:s===slug?700:400,color:s===slug?SEC_COLOR[s]:'var(--text2)'}}>{TITRES[s]}</div>
                    </div>
                  </Link>
                ))}
              </div>
              <div style={{background:'var(--surface)',border:'1px solid var(--border)',borderRadius:13,padding:'14px'}}>
                <div style={{fontSize:11,color:'var(--muted)',fontWeight:700,textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:10}}>Actions</div>
                <div style={{display:'flex',flexDirection:'column',gap:7}}>
                  <Link href={`/solve?q=${encodeURIComponent('Explique-moi '+ch.titre+' en Seconde Maths')}`} className="btn btn-primary" style={{textAlign:'center',fontSize:12}}>
                    🤖 Chat IA — {ch.titre}
                  </Link>
                  <Link href="/simulation-france" className="btn btn-secondary" style={{textAlign:'center',fontSize:12}}>📋 Exercice type Bac</Link>
                  <Link href="/bac-france/maths" className="btn btn-secondary" style={{textAlign:'center',fontSize:12}}>🧮 Voir Maths France</Link>
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
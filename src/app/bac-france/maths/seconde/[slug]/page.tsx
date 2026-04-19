'use client'
import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import { useParams } from 'next/navigation'

const C = { thm:'#4f6ef7', def:'#06d6a0', formule:'#f59e0b', prop:'#8b5cf6', methode:'#ec4899' }
const L: Record<string,string> = { thm:'Théorème', def:'Définition', formule:'Formule clé', prop:'Propriété', methode:'Méthode' }

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
  'signe-fonction':               'Signe d\'une Fonction',
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

const CHAPITRES: Record<string,any> = {

  'python-algorithmique': {
    ch:'CH 01', titre:'Algorithmique & Python', badge:'Informatique', duree:'~6h', section:'Partie 1 — Algorithmique',
    desc:'Python est le langage de programmation au programme de Seconde. On y apprend à écrire des algorithmes : variables, conditions, fonctions et boucles.',
    theoremes:[
      {id:'D1',type:'def',nom:'Variables et types en Python',enonce:'Une variable stocke une valeur. Elle est créée par affectation.\n\nTypes principaux :\n• int : entier (5, -3, 0)\n• float : décimal (3.14, -2.5)\n• str : chaîne (\"Bonjour\")\n• bool : booléen (True, False)\n\nExemples :\na = 5          # entier\npi = 3.14      # flottant\nnom = "Alice"  # chaîne\nresultat = True  # booléen\n\nprint(type(a))  # <class "int">'},
      {id:'D2',type:'def',nom:'Instructions conditionnelles',enonce:'Permettent d\'exécuter du code selon une condition.\n\nStructure :\nif condition:\n    instruction_si_vrai\nelif autre_condition:\n    instruction_si_autre\nelse:\n    instruction_sinon\n\nExemple :\nnote = 14\nif note >= 16:\n    print("Très bien")\nelif note >= 12:\n    print("Bien")\nelse:\n    print("Encouragements")\n\nComparateurs : ==, !=, <, >, <=, >=\nLogiques : and, or, not'},
      {id:'D3',type:'def',nom:'Fonctions',enonce:'Une fonction est un bloc de code réutilisable.\n\ndef nom_fonction(paramètre1, paramètre2):\n    """Docstring (description)"""\n    # corps de la fonction\n    return résultat\n\nExemple — calculer l\'aire d\'un rectangle :\ndef aire_rectangle(longueur, largeur):\n    aire = longueur * largeur\n    return aire\n\n# Appel :\nresultat = aire_rectangle(5, 3)\nprint(resultat)  # affiche 15\n\nSans return : la fonction retourne None'},
      {id:'D4',type:'def',nom:'Boucles bornées et conditionnelles',enonce:'Boucle FOR (nombre de tours connu) :\nfor i in range(n):  # i va de 0 à n-1\n    instruction\n\nfor i in range(a, b):  # i va de a à b-1\n    instruction\n\nExemple — somme de 1 à 10 :\ntotal = 0\nfor i in range(1, 11):\n    total = total + i\nprint(total)  # 55\n\nBoucle WHILE (condition) :\nwhile condition:\n    instruction\n\nExemple — diviser par 2 jusqu\'à atteindre 1 :\nn = 100\ncompteur = 0\nwhile n > 1:\n    n = n // 2\n    compteur += 1\nprint(compteur)'},
      {id:'M1',type:'methode',nom:'Écrire un algorithme en Python',enonce:'Étapes :\n1. Identifier les ENTRÉES (input ou paramètres)\n2. Identifier les SORTIES (print ou return)\n3. Décomposer en étapes simples\n4. Coder étape par étape\n5. Tester avec des valeurs connues\n\nExemple — tester si un nombre est premier :\ndef est_premier(n):\n    if n < 2:\n        return False\n    for d in range(2, n):\n        if n % d == 0:\n            return False\n    return True\n\nprint(est_premier(7))   # True\nprint(est_premier(10))  # False'},
    ],
    exercices:[
      {id:'EX01',niveau:'Facile',titre:'Calculer une moyenne',enonce:'Écrire une fonction Python moyenne(a, b, c) qui retourne la moyenne de trois nombres.\nTester avec 12, 15 et 9.',correction:'def moyenne(a, b, c):\n    return (a + b + c) / 3\n\nresultat = moyenne(12, 15, 9)\nprint(resultat)  # affiche 12.0'},
      {id:'EX02',niveau:'Facile',titre:'Boucle et accumulation',enonce:'Écrire un programme qui affiche tous les multiples de 7 de 1 à 100.',correction:'for n in range(1, 101):\n    if n % 7 == 0:\n        print(n)\n# Affiche : 7, 14, 21, 28, 35, 42, 49, 56, 63, 70, 77, 84, 91, 98'},
      {id:'EX03',niveau:'Intermédiaire',titre:'Factorielle',enonce:'Écrire une fonction factorielle(n) qui calcule n! (n factorielle = 1×2×3×…×n).\nTester avec n = 5.',correction:'def factorielle(n):\n    resultat = 1\n    for i in range(1, n + 1):\n        resultat = resultat * i\n    return resultat\n\nprint(factorielle(5))  # 120 = 1×2×3×4×5'},
    ],
  },

  'nombres-calculs': {
    ch:'CH 02', titre:'Nombres & Calculs', badge:'Algèbre', duree:'~5h', section:'Partie 2 — Nombres et calculs',
    desc:'Ce chapitre consolide les bases du calcul numérique : puissances, racines, ensembles de nombres et divisibilité. Ces outils sont indispensables tout au long de l\'année.',
    theoremes:[
      {id:'D1',type:'def',nom:'Puissances entières relatives',enonce:'Pour tout réel a ≠ 0 et tout entier n :\n• a⁰ = 1\n• a¹ = a\n• aⁿ = a × a × … × a  (n fois, n > 0)\n• a⁻ⁿ = 1/aⁿ  (n > 0)\n\nExemples :\n2⁴ = 16 ; 2⁻³ = 1/8 = 0,125 ; 10⁻² = 0,01\n3⁰ = 1 ; (−2)³ = −8 ; (−2)⁴ = +16'},
      {id:'T1',type:'thm',nom:'Propriétés des puissances',enonce:'Pour a, b ≠ 0 et m, n entiers :\n\n1. aᵐ × aⁿ = aᵐ⁺ⁿ   (même base, on additionne les exposants)\n2. aᵐ / aⁿ = aᵐ⁻ⁿ   (même base, on soustrait)\n3. (aᵐ)ⁿ = aᵐⁿ      (puissance de puissance : on multiplie)\n4. (a×b)ⁿ = aⁿ×bⁿ   (produit : exposant se distribue)\n5. (a/b)ⁿ = aⁿ/bⁿ   (quotient : exposant se distribue)\n\nExemples :\n2³ × 2⁵ = 2⁸ = 256\n(3²)⁴ = 3⁸ = 6561\n10³ × 10⁻² = 10¹ = 10'},
      {id:'D2',type:'def',nom:'Racine carrée',enonce:'√a est le réel positif dont le carré vaut a.\n→ √a est défini seulement pour a ≥ 0\n→ (√a)² = a\n→ √(a²) = |a| (valeur absolue !)\n\nPropriétés :\n• √(a×b) = √a × √b  (a,b ≥ 0)\n• √(a/b) = √a/√b    (a ≥ 0, b > 0)\n• √(a²) = |a|\n\nSimplification :\n√12 = √(4×3) = 2√3\n√50 = √(25×2) = 5√2\n√(48) = √(16×3) = 4√3'},
      {id:'F1',type:'formule',nom:'Ensembles de nombres',enonce:'Inclusions :\nℕ ⊂ ℤ ⊂ D ⊂ ℚ ⊂ ℝ\n\n• ℕ = {0, 1, 2, 3, …} entiers naturels\n• ℤ = {…,−2,−1,0,1,2,…} entiers relatifs\n• D = fractions à dénominateur puissance de 10 (décimaux)\n• ℚ = {p/q | p∈ℤ, q∈ℤ*} rationnels (écriture décimale finie ou infinie périodique)\n• ℝ = tous les réels (inclut les irrationnels : √2, π, e)\n\nIrrationnels célèbres : √2 ≈ 1,41421…, π ≈ 3,14159…'},
      {id:'M1',type:'methode',nom:'PGCD et algorithme d\'Euclide',enonce:'PGCD(a,b) = Plus Grand Diviseur Commun\n\nAlgorithme d\'Euclide :\n→ On divise le plus grand par le plus petit\n→ On remplace par (diviseur, reste)\n→ On s\'arrête quand le reste = 0\n→ Le PGCD est le dernier diviseur non nul\n\nExemple : PGCD(48, 18)\n48 = 2×18 + 12\n18 = 1×12 + 6\n12 = 2×6 + 0\nDonc PGCD(48,18) = 6\n\nPPCM(a,b) = a×b / PGCD(a,b)\nPPCM(48,18) = 48×18/6 = 144'},
    ],
    exercices:[
      {id:'EX01',niveau:'Facile',titre:'Puissances',enonce:'Calculer : 2⁵, 3⁻², 10⁻³, (2²)³',correction:'2⁵ = 32\n3⁻² = 1/9 ≈ 0,111\n10⁻³ = 0,001\n(2²)³ = 2⁶ = 64'},
      {id:'EX02',niveau:'Facile',titre:'Simplifier des racines',enonce:'Simplifier : √75, √108, √(50/2)',correction:'√75 = √(25×3) = 5√3\n√108 = √(36×3) = 6√3\n√(50/2) = √25 = 5'},
      {id:'EX03',niveau:'Intermédiaire',titre:'PGCD et fractions',enonce:'Calculer PGCD(84, 60), puis simplifier 84/60.',correction:'84 = 1×60 + 24\n60 = 2×24 + 12\n24 = 2×12 + 0\nPGCD(84,60) = 12\n84/60 = (84÷12)/(60÷12) = 7/5'},
    ],
  },

  'intervalles-inequations': {
    ch:'CH 03', titre:'Intervalles, Inégalités & Inéquations', badge:'Algèbre', duree:'~4h', section:'Partie 2 — Nombres et calculs',
    desc:'Les intervalles permettent de décrire des ensembles de réels. Les inégalités et inéquations servent à résoudre des problèmes avec des contraintes.',
    theoremes:[
      {id:'D1',type:'def',nom:'Notations d\'intervalles',enonce:'[a ; b] = {x ∈ ℝ | a ≤ x ≤ b}  (fermé : bornes incluses)\n]a ; b[ = {x ∈ ℝ | a < x < b}  (ouvert : bornes exclues)\n[a ; b[ = {x ∈ ℝ | a ≤ x < b}  (semi-ouvert)\n]a ; b] = {x ∈ ℝ | a < x ≤ b}  (semi-ouvert)\n[a ; +∞[ = {x ∈ ℝ | x ≥ a}\n]−∞ ; b] = {x ∈ ℝ | x ≤ b}\n]−∞ ; +∞[ = ℝ\n\nNote : +∞ et −∞ ne sont jamais inclus → toujours crochets ouverts'],
      {id:'T1',type:'thm',nom:'Propriétés des inégalités',enonce:'Soient a < b des réels et c un réel.\n\n1. a < b et c > 0 → ac < bc  (MÊME sens)\n2. a < b et c < 0 → ac > bc  (sens INVERSÉ !!!)\n3. a < b → a+c < b+c          (translation : sens conservé)\n4. a < b et b < c → a < c    (transitivité)\n5. 0 < a < b → 1/a > 1/b     (inverser des positifs : sens inversé)\n\n⚠️ ATTENTION : multiplier par un négatif inverse le sens de l\'inégalité !'},
      {id:'M1',type:'methode',nom:'Résoudre une inéquation du 1er degré',enonce:'Méthode :\n1. Développer/simplifier si nécessaire\n2. Isoler l\'inconnue (termes en x d\'un côté, nombres de l\'autre)\n3. Diviser par le coefficient de x\n4. ATTENTION : si on divise par un négatif → inverser le sens\n5. Exprimer la solution sous forme d\'intervalle\n\nExemple : 3x − 5 > 2x + 1\n→ 3x − 2x > 1 + 5\n→ x > 6\nSolution : ]6 ; +∞[\n\nExemple avec inversement : −2x + 3 ≤ 7\n→ −2x ≤ 4\n→ x ≥ −2  (division par −2 : sens inversé !)\nSolution : [−2 ; +∞['},
      {id:'D2',type:'def',nom:'Valeur absolue',enonce:'|x| = x si x ≥ 0 et |x| = −x si x < 0\n\nInterprétation : |x| = distance de x à 0\n|x − a| = distance de x à a\n\nPropriétés :\n• |x| ≥ 0 pour tout x\n• |x| = 0 ⟺ x = 0\n• |−x| = |x|\n• |ab| = |a|·|b|\n• |a/b| = |a|/|b| (b ≠ 0)\n\nRésolution :\n|x| < r ⟺ −r < x < r  (r > 0)\n|x| > r ⟺ x < −r ou x > r\n|x − a| < r ⟺ a−r < x < a+r'},
    ],
    exercices:[
      {id:'EX01',niveau:'Facile',titre:'Résoudre une inéquation',enonce:'Résoudre : 2x + 3 ≤ x − 5 et donner la solution en notation d\'intervalle.',correction:'2x + 3 ≤ x − 5\n2x − x ≤ −5 − 3\nx ≤ −8\nSolution : ]−∞ ; −8]'},
      {id:'EX02',niveau:'Facile',titre:'Inéquation avec inversement',enonce:'Résoudre : −3x + 6 > 12',correction:'−3x > 12 − 6\n−3x > 6\nx < −2  (division par −3 : sens inversé !)\nSolution : ]−∞ ; −2['},
      {id:'EX03',niveau:'Intermédiaire',titre:'Valeur absolue',enonce:'Résoudre : |2x − 1| ≤ 5',correction:'|2x − 1| ≤ 5 ⟺ −5 ≤ 2x−1 ≤ 5\n⟺ −4 ≤ 2x ≤ 6\n⟺ −2 ≤ x ≤ 3\nSolution : [−2 ; 3]'},
    ],
  },

  'calcul-litteral': {
    ch:'CH 04', titre:'Calcul Littéral', badge:'Algèbre', duree:'~5h', section:'Partie 2 — Nombres et calculs',
    desc:'Le calcul littéral permet de manipuler des expressions algébriques. Les identités remarquables et la factorisation sont des outils fondamentaux en mathématiques.',
    theoremes:[
      {id:'F1',type:'formule',nom:'Identités remarquables',enonce:'(a + b)² = a² + 2ab + b²      (carré d\'une somme)\n(a − b)² = a² − 2ab + b²      (carré d\'une différence)\n(a + b)(a − b) = a² − b²      (produit de conjugués)\n\nMémoriser ces 3 identités ! Elles servent dans tout le lycée.\n\nExemples de développement :\n(x + 3)² = x² + 6x + 9\n(2x − 5)² = 4x² − 20x + 25\n(x + 4)(x − 4) = x² − 16\n\nExemples de factorisation :\nx² + 6x + 9 = (x + 3)²\n4x² − 25 = (2x − 5)(2x + 5)'},
      {id:'T1',type:'thm',nom:'Propriété du produit nul',enonce:'Pour tous réels A et B :\nA × B = 0  ⟺  A = 0  ou  B = 0\n\n⚠️ "ou" au sens mathématique (au moins l\'un des deux)\n\nApplication — résoudre une équation par factorisation :\nEx : x² − 5x + 6 = 0\n→ Chercher à factoriser : (x − 2)(x − 3) = 0\n→ x − 2 = 0  ou  x − 3 = 0\n→ x = 2  ou  x = 3\n\nMéthode : factoriser AVANT d\'appliquer la propriété !'},
      {id:'M1',type:'methode',nom:'Développer et factoriser',enonce:'DÉVELOPPER : transformer un produit en somme\nRègles : k(a+b) = ka+kb ; (a+b)(c+d) = ac+ad+bc+bd\n\nFACTORISER : transformer une somme en produit\nTechniques :\n1. Facteur commun : 6x²+9x = 3x(2x+3)\n2. Identité remarquable : x²−9 = (x−3)(x+3)\n3. Groupement par paires\n\nExemple complet :\nÀ factoriser : 4x² − 12x + 9\n→ Reconnaître : a² − 2ab + b² avec a=2x, b=3\n→ 4x² − 12x + 9 = (2x − 3)²\n\nVérification : développer pour contrôler !'},
      {id:'D1',type:'def',nom:'Fractions algébriques et équation quotient',enonce:'Fraction algébrique : A(x)/B(x) avec B(x) ≠ 0\n\nSimplification : A×C / (B×C) = A/B  (si C ≠ 0)\n\nOpérations :\n• Addition : A/B + C/D = (AD + BC)/(BD)\n• Multiplication : (A/B)×(C/D) = AC/(BD)\n\nÉquation A/B = 0 :\n→ A = 0  ET  B ≠ 0\n\nExemple : (x−2)/(x+1) = 0\n→ x−2 = 0  et  x+1 ≠ 0\n→ x = 2  et  x ≠ −1\n→ Solution : x = 2'},
    ],
    exercices:[
      {id:'EX01',niveau:'Facile',titre:'Développer',enonce:'Développer et réduire : (x + 5)² − (x − 3)(x + 3)',correction:'(x+5)² = x² + 10x + 25\n(x−3)(x+3) = x² − 9\n(x+5)² − (x−3)(x+3) = x²+10x+25 − (x²−9)\n= x²+10x+25 − x²+9\n= 10x + 34'},
      {id:'EX02',niveau:'Facile',titre:'Factoriser',enonce:'Factoriser : 9x² − 6x + 1',correction:'9x² − 6x + 1 = (3x)² − 2·(3x)·1 + 1²\n= (3x − 1)²'},
      {id:'EX03',niveau:'Intermédiaire',titre:'Résoudre par factorisation',enonce:'Résoudre : x² − 7x + 12 = 0',correction:'Chercher a + b = 7 et ab = 12 → a=3, b=4\nx² − 7x + 12 = (x−3)(x−4) = 0\n→ x = 3 ou x = 4'},
    ],
  },

  'geometrie-non-reperee': {
    ch:'CH 05', titre:'Géométrie non Repérée & Vecteurs', badge:'Géométrie', duree:'~5h', section:'Partie 3 — Géométrie',
    desc:'Les vecteurs permettent de représenter des déplacements dans le plan. Ils sont la base de la géométrie analytique et de la physique.',
    theoremes:[
      {id:'D1',type:'def',nom:'Vecteur : définition et caractéristiques',enonce:'Un vecteur AB⃗ est caractérisé par :\n1. Sa DIRECTION : la droite (AB) et ses parallèles\n2. Son SENS : de A vers B\n3. Sa NORME : longueur AB (notée ‖AB⃗‖ ou AB)\n\nDeux vecteurs sont ÉGAUX si même direction, même sens, même norme.\n→ u⃗ = v⃗  même si pas le même point de départ !\n\nVecteur nul 0⃗ : norme nulle, direction et sens non définis\nAA⃗ = 0⃗ pour tout point A'},
      {id:'T1',type:'thm',nom:'Relation de Chasles',enonce:'Pour tous points A, B, C :\nAC⃗ = AB⃗ + BC⃗\n\nConséquences :\nAB⃗ + BA⃗ = 0⃗  (vecteur opposé : BA⃗ = −AB⃗)\nAB⃗ = AO⃗ + OB⃗  (décomposition avec une origine O)\nAB⃗ − AC⃗ = CB⃗\n\nInterprétation : pour aller de A à C,\non peut passer par B = AB⃗ puis BC⃗\n\nExemple : si M est le milieu de [BC]\nAM⃗ = AB⃗ + BM⃗ = AB⃗ + ½BC⃗'},
      {id:'D2',type:'def',nom:'Multiplication d\'un vecteur par un réel',enonce:'ku⃗ est le vecteur :\n• de même direction que u⃗ (si k ≠ 0)\n• de même sens si k > 0, sens opposé si k < 0\n• de norme |k|·‖u⃗‖\n\nCas particuliers :\n• 0·u⃗ = 0⃗\n• 1·u⃗ = u⃗\n• (−1)·u⃗ = −u⃗ (opposé)\n• ½·u⃗ : même sens, norme divisée par 2\n\nColinéarité :\nu⃗ et v⃗ (v⃗ ≠ 0⃗) colinéaires ⟺ ∃k réel : u⃗ = k·v⃗\n⟺ droites de même direction (parallèles ou confondues)'},
      {id:'P1',type:'prop',nom:'Théorème de Thalès',enonce:'Si M est sur (AB) et N est sur (AC) avec AM/AB = AN/AC = k ≠ 0\nAlors MN ∥ BC et MN/BC = |k|\n\nRéciproque : Si MN ∥ BC alors AM/AB = AN/AC\n\nApplication — milieu : si M milieu de [AB]\n→ AM/AB = 1/2\n→ Tout point N tel que MN ∥ BC avec AN/AC = 1/2\n\nThéorème de Pythagore : dans un triangle rectangle en A\nBC² = AB² + AC²'},
    ],
    exercices:[
      {id:'EX01',niveau:'Facile',titre:'Relation de Chasles',enonce:'ABCD est un parallélogramme. Exprimer AC⃗ en fonction de AB⃗ et AD⃗.',correction:'ABCD parallélogramme → BC⃗ = AD⃗\nAC⃗ = AB⃗ + BC⃗ = AB⃗ + AD⃗'},
      {id:'EX02',niveau:'Intermédiaire',titre:'Colinéarité et parallélisme',enonce:'M est tel que AM⃗ = (2/3)AB⃗. Que peut-on dire de M par rapport à [AB] ?',correction:'AM⃗ = (2/3)AB⃗ → AM⃗ et AB⃗ colinéaires → M est sur la droite (AB).\nDe plus 2/3 ∈ ]0;1[ → M est entre A et B, aux 2/3 de AB depuis A.'},
    ],
  },

  'vecteurs-repere': {
    ch:'CH 06', titre:'Vecteurs & Repère', badge:'Géométrie', duree:'~4h', section:'Partie 3 — Géométrie',
    desc:'En plaçant un repère dans le plan, on peut calculer des coordonnées de vecteurs, des distances et vérifier la colinéarité par calcul.',
    theoremes:[
      {id:'D1',type:'def',nom:'Repère et coordonnées',enonce:'Repère (O ; i⃗, j⃗) : origine O + vecteurs directeurs i⃗ et j⃗.\n→ Tout vecteur s\'écrit u⃗ = ai⃗ + bj⃗  (coordonnées (a;b))\n→ Tout point s\'écrit M = O + OMs⃗\n\nCoordonnées de AB⃗ :\nSi A(xA ; yA) et B(xB ; yB)\n→ AB⃗(xB−xA ; yB−yA)\n\nOpérations en coordonnées :\nu⃗(a;b) + v⃗(a\';b\') = (a+a\' ; b+b\')\nk·u⃗(a;b) = (ka ; kb)\n\nColinéarité : u⃗(a;b) et v⃗(a\';b\') colinéaires ⟺ ab\' − a\'b = 0'},
      {id:'F1',type:'formule',nom:'Milieu et distance',enonce:'Milieu I de [AB] avec A(xA;yA) et B(xB;yB) :\nxI = (xA+xB)/2  ;  yI = (yA+yB)/2\n\nDistance AB (= norme de AB⃗) :\nAB = √((xB−xA)² + (yB−yA)²)\n\nNorme d\'un vecteur u⃗(a;b) :\n‖u⃗‖ = √(a² + b²)\n\nExemple : A(1;3) et B(4;7)\nAB⃗(3;4) → AB = √(9+16) = √25 = 5\nMilieu I : ((1+4)/2 ; (3+7)/2) = (2,5 ; 5)'},
      {id:'T1',type:'thm',nom:'Condition de colinéarité en coordonnées',enonce:'u⃗(a;b) et v⃗(a\';b\') sont colinéaires\n⟺  ab\' − a\'b = 0  (déterminant nul)\n\nApplication 1 — trois points alignés :\nA, B, C alignés ⟺ AB⃗ et AC⃗ colinéaires\n⟺ det(AB⃗, AC⃗) = 0\n\nApplication 2 — droites parallèles :\n(AB) ∥ (CD) ⟺ AB⃗ et CD⃗ colinéaires\n\nExemple : A(0;0), B(2;4), C(3;6)\nAB⃗(2;4), AC⃗(3;6)\ndet = 2×6 − 4×3 = 12 − 12 = 0 → alignés ✓'},
    ],
    exercices:[
      {id:'EX01',niveau:'Facile',titre:'Coordonnées de vecteur',enonce:'A(2;−1), B(5;3), C(−1;4). Calculer AB⃗, AC⃗ et ‖AB⃗‖.',correction:'AB⃗(5−2 ; 3−(−1)) = (3;4)\nAC⃗(−1−2 ; 4−(−1)) = (−3;5)\n‖AB⃗‖ = √(9+16) = √25 = 5'},
      {id:'EX02',niveau:'Intermédiaire',titre:'Trois points alignés ?',enonce:'Montrer que A(1;2), B(3;6) et C(0;0) ne sont pas alignés.',correction:'AB⃗(2;4), AC⃗(−1;−2)\ndet = 2×(−2) − 4×(−1) = −4 + 4 = 0\nEn fait ils sont alignés ! Vérification : C, A, B sont sur y = 2x.'},
    ],
  },

  'droites-systemes': {
    ch:'CH 07', titre:'Droites du Plan & Systèmes', badge:'Géométrie', duree:'~5h', section:'Partie 3 — Géométrie',
    desc:'Une droite du plan peut s\'écrire avec une équation. Les systèmes d\'équations permettent de trouver le point d\'intersection de deux droites.',
    theoremes:[
      {id:'D1',type:'def',nom:'Équations d\'une droite',enonce:'Forme cartésienne : ax + by + c = 0 (avec a et b non tous deux nuls)\n\nForme réduite (si droite non verticale) : y = mx + p\n→ m = coefficient directeur (pente)\n→ p = ordonnée à l\'origine (valeur en x=0)\n\nDroite verticale : x = k (pas de forme réduite)\n\nÉquation à partir de deux points A(xA;yA) et B(xB;yB) :\nm = (yB−yA)/(xB−xA)  (si xA ≠ xB)\nPuis p = yA − m·xA\n\nVecteur directeur u⃗(l;m) de y = mx+p : on avance de l en x, de m en y'},
      {id:'T1',type:'thm',nom:'Positions relatives de deux droites',enonce:'d₁ : y = m₁x + p₁  et  d₂ : y = m₂x + p₂\n\n1. d₁ ∥ d₂  ⟺  m₁ = m₂  et  p₁ ≠ p₂\n2. d₁ = d₂  ⟺  m₁ = m₂  et  p₁ = p₂\n3. d₁ sécante à d₂  ⟺  m₁ ≠ m₂\n   (intersection en un point unique)\n4. d₁ ⊥ d₂  ⟺  m₁ × m₂ = −1\n\nExemple :\nd₁ : y = 2x+1 et d₂ : y = −½x+3\nm₁×m₂ = 2×(−½) = −1 → perpendiculaires !'},
      {id:'M1',type:'methode',nom:'Résoudre un système 2×2',enonce:'Système : { ax + by = e\n           { cx + dy = f\n\nMéthode par substitution :\n1. Isoler une inconnue dans une équation\n2. Substituer dans l\'autre\n3. Résoudre → obtenir une valeur\n4. Substituer pour l\'autre valeur\n\nMéthode par combinaison :\n1. Multiplier les équations pour avoir ±même coefficient\n2. Additionner/soustraire pour éliminer une inconnue\n3. Résoudre\n\nExemple : { 2x + y = 5\n            { x − y = 1\nAddition : 3x = 6 → x = 2, puis y = 5−4 = 1\nSolution : (2;1) — vérifier dans les 2 équations !'},
    ],
    exercices:[
      {id:'EX01',niveau:'Facile',titre:'Équation de droite',enonce:'Trouver l\'équation de la droite passant par A(1;3) et B(3;7).',correction:'m = (7−3)/(3−1) = 4/2 = 2\np = 3 − 2×1 = 1\nÉquation : y = 2x + 1'},
      {id:'EX02',niveau:'Intermédiaire',titre:'Résoudre un système',enonce:'Résoudre : { 3x − y = 5\n             { x + 2y = 4',correction:'De (1) : y = 3x−5\nSubstituer dans (2) : x + 2(3x−5) = 4\nx + 6x − 10 = 4\n7x = 14 → x = 2\ny = 3×2−5 = 1\nSolution : (2;1)'},
    ],
  },

  'fonctions-generalites': {
    ch:'CH 08', titre:'Fonctions — Généralités', badge:'Fonctions', duree:'~6h', section:'Partie 4 — Fonctions',
    desc:'Les fonctions décrivent des relations entre des grandeurs. Leur représentation graphique et leur étude (image, antécédent, parité) sont essentielles en mathématiques.',
    theoremes:[
      {id:'D1',type:'def',nom:'Définition et vocabulaire',enonce:'Une fonction f est une relation qui à tout x de son ensemble de définition D associe un UNIQUE réel noté f(x).\n\nVocabulaire :\n• Ensemble de définition : D (valeurs autorisées pour x)\n• Image de x par f : f(x)  (la valeur calculée)\n• Antécédent de y par f : x tel que f(x) = y\n\nNotation : f : D → ℝ, x ↦ f(x)\n\nCourbe représentative C_f :\n{(x ; f(x)) | x ∈ D}\nUn point M(a;b) ∈ C_f ⟺ f(a) = b'},
      {id:'D2',type:'def',nom:'Fonctions de référence',enonce:'À connaître par cœur :\n\nf(x) = x²  (parabole)\n→ D = ℝ, image ≥ 0\n→ Décroissante sur ]−∞;0], croissante sur [0;+∞[\n→ Minimum en x=0 : f(0)=0\n→ Paire : f(−x) = f(x)\n\nf(x) = x³  (cubique)\n→ D = ℝ, croissante sur ℝ\n→ Impaire : f(−x) = −f(x)\n\nf(x) = 1/x  (hyperbole)\n→ D = ℝ\\ {0}\n→ Décroissante sur ]−∞;0[ et sur ]0;+∞[\n→ Impaire\n\nf(x) = √x  (racine carrée)\n→ D = [0;+∞[\n→ Croissante sur D\n→ Ni paire ni impaire'},
      {id:'D3',type:'def',nom:'Parité d\'une fonction',enonce:'D DOIT ÊTRE SYMÉTRIQUE PAR RAPPORT À 0\n\nFonction PAIRE :\n• f(−x) = f(x) pour tout x ∈ D\n• Courbe symétrique par rapport à l\'axe des ordonnées (Oy)\n• Exemples : f(x) = x², f(x) = cos(x)\n\nFonction IMPAIRE :\n• f(−x) = −f(x) pour tout x ∈ D\n• f(0) = 0 (si 0 ∈ D)\n• Courbe symétrique par rapport à l\'origine O\n• Exemples : f(x) = x³, f(x) = x, f(x) = 1/x\n\nSinon : ni paire ni impaire'},
      {id:'M1',type:'methode',nom:'Résolutions graphiques',enonce:'f(x) = k :\n→ Lire les abscisses des points d\'intersection de C_f avec la droite y = k\n\nf(x) > k :\n→ Lire les x pour lesquels C_f est AU-DESSUS de y = k\n\nf(x) = g(x) :\n→ Lire les abscisses des intersections de C_f et C_g\n\nf(x) ≤ g(x) :\n→ Lire les x pour lesquels C_f est en dessous ou coïncide avec C_g'},
    ],
    exercices:[
      {id:'EX01',niveau:'Facile',titre:'Image et antécédent',enonce:'f(x) = 2x² − 3x + 1. Calculer f(2) et f(−1).',correction:'f(2) = 2×4 − 3×2 + 1 = 8−6+1 = 3\nf(−1) = 2×1 − 3×(−1) + 1 = 2+3+1 = 6'},
      {id:'EX02',niveau:'Intermédiaire',titre:'Parité',enonce:'Étudier la parité de f(x) = x³ − x.',correction:'D = ℝ, symétrique par rapport à 0.\nf(−x) = (−x)³ − (−x) = −x³ + x = −(x³−x) = −f(x)\n→ f est impaire.'},
    ],
  },

  'variations-extremums': {
    ch:'CH 09', titre:'Variations & Extremums', badge:'Fonctions', duree:'~4h', section:'Partie 4 — Fonctions',
    desc:'L\'étude des variations d\'une fonction permet de savoir si elle augmente ou diminue sur chaque intervalle, et de trouver ses extremums.',
    theoremes:[
      {id:'D1',type:'def',nom:'Fonction croissante et décroissante',enonce:'f est croissante sur I :\n∀ a, b ∈ I : a < b ⟹ f(a) < f(b)\n(quand x augmente, f(x) augmente)\n\nf est décroissante sur I :\n∀ a, b ∈ I : a < b ⟹ f(a) > f(b)\n(quand x augmente, f(x) diminue)\n\nf est constante sur I :\n∀ a, b ∈ I : f(a) = f(b)\n\nTableau de variations : représentation synthétique\n→ Flèche montante ↗ : croissante\n→ Flèche descendante ↘ : décroissante'},
      {id:'D2',type:'def',nom:'Maximum et minimum',enonce:'Maximum global : f(a) ≥ f(x) pour tout x ∈ D\n(le plus grand de toutes les valeurs)\n\nMinimum global : f(a) ≤ f(x) pour tout x ∈ D\n(le plus petit de toutes les valeurs)\n\nExtremum local en a : maximum ou minimum sur un voisinage de a\n→ Changement de monotonie : croissante → décroissante = maximum local\n→ Changement de monotonie : décroissante → croissante = minimum local\n\nLecture graphique : extremum = point "sommet" ou "creux" de la courbe'},
      {id:'P1',type:'prop',nom:'Variations des fonctions affines et de référence',enonce:'f(x) = mx + p (affine) :\n→ m > 0 : croissante sur ℝ\n→ m < 0 : décroissante sur ℝ\n→ m = 0 : constante\n\nf(x) = x² :\n→ Décroissante sur ]−∞ ; 0]\n→ Croissante sur [0 ; +∞[\n→ Minimum en 0 : f(0) = 0\n\nf(x) = x³ : Croissante sur ℝ\n\nf(x) = 1/x :\n→ Décroissante sur ]−∞;0[ et ]0;+∞[\n(⚠️ pas de croissance "globale" car D non connexe)\n\nf(x) = √x : Croissante sur [0;+∞['},
    ],
    exercices:[
      {id:'EX01',niveau:'Facile',titre:'Lire un tableau de variations',enonce:'f est définie sur [−2;4]. f est croissante sur [−2;1] et décroissante sur [1;4].\nf(−2)=0, f(1)=5, f(4)=−1.\nDonner le maximum et le minimum de f.',correction:'Maximum : f(1) = 5 (sommet de la courbe)\nMinimum : f(4) = −1 (valeur la plus basse)'},
      {id:'EX02',niveau:'Intermédiaire',titre:'Étudier une fonction affine',enonce:'f(x) = −3x + 7. Dresser le tableau de variations et calculer les images de −1 et 4.',correction:'m = −3 < 0 → f est décroissante sur ℝ\nf(−1) = 3 + 7 = 10\nf(4) = −12 + 7 = −5'},
    ],
  },

  'signe-fonction': {
    ch:'CH 10', titre:'Signe d\'une Fonction', badge:'Fonctions', duree:'~5h', section:'Partie 4 — Fonctions',
    desc:'Étudier le signe d\'une fonction permet de résoudre des inéquations et de comprendre les positions relatives de courbes.',
    theoremes:[
      {id:'M1',type:'methode',nom:'Tableau de signes d\'une fonction affine',enonce:'Pour f(x) = ax + b (a ≠ 0) :\n→ Zéro unique : x₀ = −b/a\n→ f(x) > 0 du côté de x₀ où a est positif\n\nRègle :\nSi a > 0 : f(x) < 0 pour x < x₀, f(x) > 0 pour x > x₀\nSi a < 0 : f(x) > 0 pour x < x₀, f(x) < 0 pour x > x₀\n\nExemple : f(x) = 2x − 6\nZéro : x₀ = 3, a = 2 > 0\n→ f(x) < 0 sur ]−∞;3[, f(3)=0, f(x)>0 sur ]3;+∞['},
      {id:'T1',type:'thm',nom:'Signe d\'un produit et d\'un quotient',enonce:'Règle des signes :\n(+) × (+) = (+) ;  (−) × (−) = (+)\n(+) × (−) = (−) ;  (+) / (−) = (−)\n\nPour A(x) × B(x) :\n→ Trouver les zéros de A et B\n→ Dresser les tableaux de signes de A et B\n→ Multiplier les signes (règle)\n\nPour A(x) / B(x) :\n→ Mêmes étapes que le produit\n→ ⚠️ B ≠ 0 : les valeurs annulant B sont EXCLUES du domaine\n→ A/B = 0 ⟺ A = 0 ET B ≠ 0'},
      {id:'M2',type:'methode',nom:'Résoudre une inéquation par tableau de signes',enonce:'Exemple : (x−1)(x+3) > 0\n\nÉtape 1 : Zéros de chaque facteur\n→ x−1 = 0 : x=1\n→ x+3 = 0 : x=−3\n\nÉtape 2 : Tableau de signes\n         | −∞  | −3  |  1  | +∞ |\n(x+3)    | −   |  0  |  +  |  + |\n(x−1)    | −   |  −  |  0  |  + |\n(x+3)(x−1) | + |  0  |  −  |  + |\n\nÉtape 3 : Solution de > 0\n→ ]−∞;−3[ ∪ ]1;+∞['},
    ],
    exercices:[
      {id:'EX01',niveau:'Facile',titre:'Signe d\'un produit',enonce:'Résoudre (x+2)(x−5) ≤ 0',correction:'Zéros : x=−2 et x=5\nTableau des signes :\n(x+2) : − | 0 | + | +\n(x−5) : − | − | 0 | +\nProduit : + | 0 | − | 0 | +\n→ Produit ≤ 0 sur [−2;5]'},
      {id:'EX02',niveau:'Intermédiaire',titre:'Signe d\'un quotient',enonce:'Résoudre (2x−4)/(x+1) > 0',correction:'Zéros : 2x−4=0 → x=2 ; x+1=0 → x=−1 (exclu)\nTableau :\n(2x−4) : − | − | 0 | +\n(x+1)  : − | 0 | + | +\nQuotient : + | ∅ | − | 0 | +\n→ ]−∞;−1[ ∪ ]2;+∞['},
    ],
  },

  'proportions-evolutions': {
    ch:'CH 11', titre:'Proportions & Évolutions', badge:'Stats', duree:'~4h', section:'Partie 5 — Statistiques et probabilités',
    desc:'Ce chapitre aborde les pourcentages, les taux d\'évolution et les coefficients multiplicateurs, très utiles en économie et sciences.',
    theoremes:[
      {id:'D1',type:'def',nom:'Proportion et taux d\'évolution',enonce:'Proportion d\'une sous-population A dans une population totale :\np(A) = (effectif de A) / (effectif total)\n→ Souvent exprimé en % : p(A)×100\n\nTaux d\'évolution de V_i à V_f :\nt = (V_f − V_i) / V_i = (V_f/V_i) − 1\n→ t en décimal ou %\n\nCoefficent multiplicateur :\nCM = V_f / V_i = 1 + t\n\nRelations :\nV_f = V_i × CM = V_i × (1+t)\nt = CM − 1\n\nHausse de 20% → CM = 1,20\nBaisse de 15% → CM = 0,85'},
      {id:'T1',type:'thm',nom:'Évolutions successives et réciproques',enonce:'Évolutions successives :\nSi on applique CM₁ puis CM₂ :\n→ CM_total = CM₁ × CM₂\n\n⚠️ Exemple : +20% puis −20% ≠ 0%\nCM = 1,20 × 0,80 = 0,96 → baisse de 4% !\n\nÉvolution réciproque :\nSi CM ramène de V_i à V_f,\nlalors pour revenir de V_f à V_i : CM_inverse = 1/CM\n\nExemple : hausse de 25% (CM=1,25)\nPour annuler : CM_inverse = 1/1,25 = 0,8 → baisse de 20%\n\nProportion de proportion :\np(A∩B) = p(A) × p(B|A)\n"30% des élèves sont des filles, et 40% des filles font du sport\n→ 30%×40% = 12% font du sport et sont des filles"'},
    ],
    exercices:[
      {id:'EX01',niveau:'Facile',titre:'Calcul de CM',enonce:'Un article passe de 80€ à 96€. Calculer le taux d\'évolution.',correction:'CM = 96/80 = 1,20\nt = 1,20 − 1 = 0,20 = +20%'},
      {id:'EX02',niveau:'Intermédiaire',titre:'Évolutions successives',enonce:'Un prix augmente de 10% puis diminue de 10%. Quelle est l\'évolution globale ?',correction:'CM₁ = 1,10 ; CM₂ = 0,90\nCM_total = 1,10 × 0,90 = 0,99\nt = 0,99 − 1 = −0,01 = −1%\nLe prix diminue de 1% (pas 0% !)'},
    ],
  },

  'statistiques-descriptives': {
    ch:'CH 12', titre:'Statistiques Descriptives', badge:'Stats', duree:'~5h', section:'Partie 5 — Statistiques et probabilités',
    desc:'La statistique descriptive résume des données numériques par des indicateurs de position (moyenne, médiane) et de dispersion (écart-type, quartiles).',
    theoremes:[
      {id:'F1',type:'formule',nom:'Moyenne',enonce:'Moyenne simple de n valeurs x₁, x₂, …, xₙ :\nx̄ = (x₁ + x₂ + … + xₙ) / n = (1/n) Σxᵢ\n\nMoyenne pondérée :\nx̄ = (n₁x₁ + n₂x₂ + … + nₖxₖ) / (n₁+n₂+…+nₖ)\n\nLinéarité :\nSi y = ax + b → ȳ = ax̄ + b\n\nExemple :\nNotes : 10, 12, 15, 14, 9 (n=5)\nx̄ = (10+12+15+14+9)/5 = 60/5 = 12'},
      {id:'F2',type:'formule',nom:'Écart-type et variance',enonce:'Variance :\nV = (1/n) Σ(xᵢ − x̄)²\n\nÉcart-type :\nσ = √V\n\nσ mesure la dispersion :\n→ σ faible : données groupées autour de x̄\n→ σ grand : données dispersées\n→ σ = 0 : toutes les valeurs égales\n\nExemple : 10, 12, 15, 14, 9 ; x̄ = 12\nV = [(10−12)²+(12−12)²+(15−12)²+(14−12)²+(9−12)²]/5\n  = [4+0+9+4+9]/5 = 26/5 = 5,2\nσ = √5,2 ≈ 2,28'},
      {id:'D1',type:'def',nom:'Médiane et quartiles',enonce:'Médiane Me : valeur qui sépare les données ordonnées en deux moitiés égales\n→ 50% des données ≤ Me et 50% ≥ Me\n\nQuartile Q₁ : 25% des données ≤ Q₁\nQuartile Q₃ : 75% des données ≤ Q₃\nÉcart interquartile : EI = Q₃ − Q₁\n\nBoîte à moustaches :\n[valeur min ---|---[ Q₁ | Me | Q₃ ]---|--- valeur max]\n\nMédiane vs moyenne :\n→ Médiane : robuste aux valeurs extrêmes\n→ Moyenne : tient compte de toutes les valeurs'},
    ],
    exercices:[
      {id:'EX01',niveau:'Facile',titre:'Calcul de moyenne et écart-type',enonce:'Calculer x̄ et σ pour : 4, 6, 8, 10, 12.',correction:'x̄ = (4+6+8+10+12)/5 = 40/5 = 8\nV = [(4−8)²+(6−8)²+(8−8)²+(10−8)²+(12−8)²]/5\n= [16+4+0+4+16]/5 = 40/5 = 8\nσ = √8 = 2√2 ≈ 2,83'},
      {id:'EX02',niveau:'Facile',titre:'Médiane et quartiles',enonce:'Données ordonnées : 3, 5, 7, 9, 11, 13, 15, 17.\nCalculer Q₁, Me et Q₃.',correction:'n=8 valeurs\nMe = (7+9)/2 = 8 (entre 4e et 5e valeurs)\nQ₁ = (5+7)/2 = 6 (médiane de la moitié inférieure)\nQ₃ = (13+15)/2 = 14 (médiane de la moitié supérieure)\nEI = Q₃−Q₁ = 14−6 = 8'},
    ],
  },

  'probabilites-echantillonnage': {
    ch:'CH 13', titre:'Probabilités & Échantillonnage', badge:'Probabilités', duree:'~5h', section:'Partie 5 — Statistiques et probabilités',
    desc:'Ce chapitre introduit le calcul des probabilités et la notion d\'échantillonnage, avec l\'intervalle de fluctuation.',
    theoremes:[
      {id:'D1',type:'def',nom:'Vocabulaire des probabilités',enonce:'Expérience aléatoire : résultat imprévisible\nUnivers Ω : ensemble de tous les résultats possibles (issue)\nÉvénement : sous-ensemble de Ω\nÉvénement élémentaire : {ω} avec ω unique résultat\n\nProbabilité P : fonction qui vérifie :\n• 0 ≤ P(A) ≤ 1  pour tout A\n• P(Ω) = 1\n• Si A∩B = ∅ : P(A∪B) = P(A)+P(B)\n\nÉquiprobabilité : P(A) = card(A)/card(Ω)\n(tous les résultats ont même probabilité)\n\nExemple : dé à 6 faces\nΩ = {1,2,3,4,5,6}, P({k}) = 1/6\nP("pair") = P({2,4,6}) = 3/6 = 1/2'},
      {id:'T1',type:'thm',nom:'Opérations sur les événements',enonce:'Événement contraire Ā (complémentaire de A) :\nP(Ā) = 1 − P(A)\n\nRéunion :\nP(A∪B) = P(A) + P(B) − P(A∩B)\n\nSi A et B incompatibles (A∩B = ∅) :\nP(A∪B) = P(A) + P(B)\n\nIndépendance :\nA et B indépendants ⟺ P(A∩B) = P(A)×P(B)\n\nExemple : P(A) = 0,3, P(B) = 0,5, P(A∩B) = 0,15\n→ A et B indépendants ? P(A)×P(B) = 0,15 = P(A∩B) ✓\nP(A∪B) = 0,3 + 0,5 − 0,15 = 0,65'},
      {id:'T2',type:'thm',nom:'Intervalle de fluctuation',enonce:'On prélève un échantillon de taille n dans une population de proportion p.\nLa fréquence f observée fluctue autour de p.\n\nIntervalle de fluctuation au seuil 95% :\n[p − 1/√n  ;  p + 1/√n]\n\n(valable si n ≥ 25, 0,2 ≤ p ≤ 0,8)\n\nInterprétation :\n→ Si f ∈ intervalle : résultat conforme à p (ne pas rejeter)\n→ Si f ∉ intervalle : résultat surprenant, remettre en question p\n\nExemple : p = 0,4, n = 100\nIntervalle = [0,4−0,1 ; 0,4+0,1] = [0,3 ; 0,5]\nSi on observe f = 0,35 ∈ [0,3;0,5] → pas de rejet\nSi on observe f = 0,25 ∉ [0,3;0,5] → résultat surprenant'},
    ],
    exercices:[
      {id:'EX01',niveau:'Facile',titre:'Calcul de probabilités',enonce:'On lance un dé équilibré à 6 faces. Calculer :\na) P(obtenir un multiple de 3)\nb) P(obtenir au moins 4)',correction:'a) Multiples de 3 : {3, 6} → P = 2/6 = 1/3\nb) Au moins 4 : {4, 5, 6} → P = 3/6 = 1/2'},
      {id:'EX02',niveau:'Intermédiaire',titre:'Intervalle de fluctuation',enonce:'Dans une urne, 30% des boules sont rouges (p = 0,3). On tire n = 400 boules avec remise. Calculer l\'intervalle de fluctuation et dire si f = 0,28 est surprenant.',correction:'Intervalle = [0,3 − 1/√400 ; 0,3 + 1/√400]\n= [0,3 − 0,05 ; 0,3 + 0,05]\n= [0,25 ; 0,35]\nf = 0,28 ∈ [0,25 ; 0,35] → résultat conforme, pas surprenant.'},
    ],
  },
}

export default function MathsSecondeChapPage() {
  const params = useParams()
  const slug = params.slug as string
  const ch = CHAPITRES[slug]
  const [openEx, setOpenEx] = useState<string|null>(null)

  const color = SEC_COLOR[slug] || '#4f6ef7'
  const idx = NAV_ORDER.indexOf(slug)
  const prevSlug = idx > 0 ? NAV_ORDER[idx-1] : null
  const nextSlug = idx < NAV_ORDER.length-1 ? NAV_ORDER[idx+1] : null

  if (!ch) return (
    <div style={{ minHeight:'100vh', background:'var(--bg)', color:'var(--text)', display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', gap:16 }}>
      <div style={{ fontSize:48 }}>📐</div>
      <h2>Chapitre en cours de rédaction</h2>
      <p style={{ color:'var(--muted)' }}>Ce chapitre sera disponible prochainement.</p>
      <Link href="/bac-france/maths/seconde" className="btn btn-primary">← Retour Seconde Maths</Link>
    </div>
  )

  return (
    <>
      <Navbar />
      <main style={{ minHeight:'100vh', background:'var(--bg)', color:'var(--text)' }}>

        {/* Hero chapitre */}
        <section style={{ padding:'80px clamp(20px,5vw,60px) 32px', borderBottom:'1px solid var(--border)', position:'relative' }}>
          <div style={{ position:'absolute', top:0, left:0, right:0, height:4, background:`linear-gradient(90deg, ${color}, transparent)` }} />
          <div style={{ maxWidth:900, margin:'0 auto' }}>

            {/* Fil d'Ariane */}
            <div style={{ display:'flex', alignItems:'center', gap:8, fontSize:12, color:'var(--muted)', marginBottom:20, flexWrap:'wrap' }}>
              <Link href="/bac-france/maths" style={{ color:'var(--muted)', textDecoration:'none' }}>Maths France</Link>
              <span>›</span>
              <Link href="/bac-france/maths/seconde" style={{ color:'var(--muted)', textDecoration:'none' }}>Seconde</Link>
              <span>›</span>
              <span style={{ color:'var(--text2)' }}>{ch.titre}</span>
            </div>

            <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:12 }}>
              <span style={{ fontSize:10, fontFamily:'var(--font-mono)', color: color, fontWeight:700, background:`${color}15`, border:`1px solid ${color}30`, padding:'3px 10px', borderRadius:20 }}>
                {ch.ch}
              </span>
              <span style={{ fontSize:10, color:'var(--muted)', background:'var(--surface)', padding:'3px 10px', borderRadius:20, border:'1px solid var(--border)' }}>
                {ch.badge}
              </span>
              <span style={{ fontSize:10, color:'var(--muted)', background:'var(--surface)', padding:'3px 10px', borderRadius:20, border:'1px solid var(--border)' }}>
                ⏱ {ch.duree}
              </span>
            </div>

            <h1 style={{ fontFamily:'var(--font-display)', fontWeight:800, fontSize:'clamp(22px,3.5vw,40px)', lineHeight:1.1, marginBottom:10, color:'var(--text)' }}>
              {ch.titre}
            </h1>
            <p style={{ fontSize:14, color:'var(--text2)', maxWidth:700, lineHeight:1.6 }}>{ch.desc}</p>
          </div>
        </section>

        {/* Contenu principal */}
        <div style={{ maxWidth:900, margin:'0 auto', padding:'32px clamp(20px,5vw,60px) 80px' }}>

          {/* Théorèmes, définitions, formules */}
          <h2 style={{ fontFamily:'var(--font-display)', fontSize:18, marginBottom:20, color:'var(--text)', display:'flex', alignItems:'center', gap:8 }}>
            <span style={{ color: color }}>📖</span> Cours complet
          </h2>

          <div style={{ display:'flex', flexDirection:'column', gap:16, marginBottom:40 }}>
            {ch.theoremes.map((t: any) => (
              <div key={t.id} style={{ background:'var(--surface)', border:`1px solid ${C[t.type as keyof typeof C]}30`, borderLeft:`3px solid ${C[t.type as keyof typeof C]}`, borderRadius:12, padding:'20px 24px' }}>
                <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:12 }}>
                  <span style={{ fontSize:10, fontWeight:800, padding:'2px 10px', borderRadius:20, background:`${C[t.type as keyof typeof C]}18`, color: C[t.type as keyof typeof C], border:`1px solid ${C[t.type as keyof typeof C]}30`, letterSpacing:'0.05em' }}>
                    {L[t.type]}
                  </span>
                  <span style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:15, color:'var(--text)' }}>{t.nom}</span>
                </div>
                <pre style={{ fontFamily:'var(--font-mono)', fontSize:12.5, color:'var(--text2)', whiteSpace:'pre-wrap', lineHeight:1.8, margin:0, background:'rgba(0,0,0,0.15)', borderRadius:8, padding:'12px 16px' }}>
                  {t.enonce}
                </pre>
              </div>
            ))}
          </div>

          {/* Exercices */}
          {ch.exercices?.length > 0 && (
            <>
              <h2 style={{ fontFamily:'var(--font-display)', fontSize:18, marginBottom:20, color:'var(--text)', display:'flex', alignItems:'center', gap:8 }}>
                <span style={{ color: color }}>✏️</span> Exercices corrigés
              </h2>
              <div style={{ display:'flex', flexDirection:'column', gap:12, marginBottom:40 }}>
                {ch.exercices.map((ex: any) => (
                  <div key={ex.id} style={{ background:'var(--surface)', border:'1px solid var(--border)', borderRadius:12, overflow:'hidden' }}>
                    <button
                      onClick={() => setOpenEx(openEx === ex.id ? null : ex.id)}
                      style={{ width:'100%', display:'flex', justifyContent:'space-between', alignItems:'center', padding:'16px 20px', background:'none', border:'none', cursor:'pointer', color:'var(--text)', textAlign:'left' }}>
                      <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                        <span style={{ fontSize:10, padding:'2px 8px', borderRadius:20, fontWeight:700, background: ex.niveau==='Facile' ? 'rgba(6,214,160,0.15)' : ex.niveau==='Intermédiaire' ? 'rgba(245,158,11,0.15)' : 'rgba(239,68,68,0.15)', color: ex.niveau==='Facile' ? '#06d6a0' : ex.niveau==='Intermédiaire' ? '#f59e0b' : '#ef4444' }}>
                          {ex.niveau}
                        </span>
                        <span style={{ fontWeight:600, fontSize:14 }}>{ex.titre}</span>
                      </div>
                      <span style={{ color:'var(--muted)', fontSize:14, transition:'transform 0.2s', transform: openEx===ex.id ? 'rotate(180deg)' : 'none' }}>▼</span>
                    </button>
                    {openEx === ex.id && (
                      <div style={{ padding:'0 20px 20px', borderTop:'1px solid var(--border)' }}>
                        <div style={{ background:'rgba(255,255,255,0.03)', borderRadius:8, padding:'12px 16px', marginBottom:12, marginTop:12 }}>
                          <div style={{ fontSize:11, color:'var(--muted)', fontWeight:600, marginBottom:6 }}>ÉNONCÉ</div>
                          <p style={{ fontSize:13, color:'var(--text2)', lineHeight:1.7, margin:0 }}>{ex.enonce}</p>
                        </div>
                        <div style={{ background:`${color}10`, border:`1px solid ${color}25`, borderRadius:8, padding:'12px 16px' }}>
                          <div style={{ fontSize:11, color: color, fontWeight:700, marginBottom:6 }}>✅ CORRECTION</div>
                          <pre style={{ fontFamily:'var(--font-mono)', fontSize:12, color:'var(--text2)', whiteSpace:'pre-wrap', lineHeight:1.7, margin:0 }}>
                            {ex.correction}
                          </pre>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Lien solveur */}
          <div style={{ background:'rgba(79,110,247,0.07)', border:'1px solid rgba(79,110,247,0.2)', borderRadius:14, padding:'20px 24px', marginBottom:40, display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:12 }}>
            <div>
              <div style={{ fontWeight:700, color:'var(--text)', marginBottom:4 }}>🤖 Besoin d\'aide sur un exercice ?</div>
              <div style={{ fontSize:13, color:'var(--muted)' }}>Le solveur IA résout pas à pas vos exercices de Seconde</div>
            </div>
            <Link href={`/solve?q=${encodeURIComponent('Exercice de Maths Seconde — ' + ch.titre)}`}
              className="btn btn-primary btn-sm">
              Résoudre un exercice →
            </Link>
          </div>

          {/* Navigation prev/next */}
          <div style={{ display:'flex', justifyContent:'space-between', gap:12, flexWrap:'wrap' }}>
            {prevSlug ? (
              <Link href={`/bac-france/maths/seconde/${prevSlug}`}
                style={{ display:'flex', alignItems:'center', gap:8, padding:'12px 18px', borderRadius:10, border:'1px solid var(--border)', background:'var(--surface)', color:'var(--text2)', textDecoration:'none', fontSize:13, fontWeight:600 }}>
                ← {TITRES[prevSlug]}
              </Link>
            ) : (
              <Link href="/bac-france/maths/seconde"
                style={{ display:'flex', alignItems:'center', gap:8, padding:'12px 18px', borderRadius:10, border:'1px solid var(--border)', background:'var(--surface)', color:'var(--text2)', textDecoration:'none', fontSize:13, fontWeight:600 }}>
                ← Retour Seconde
              </Link>
            )}
            {nextSlug && (
              <Link href={`/bac-france/maths/seconde/${nextSlug}`}
                style={{ display:'flex', alignItems:'center', gap:8, padding:'12px 18px', borderRadius:10, border:`1px solid ${color}40`, background:`${color}10`, color: color, textDecoration:'none', fontSize:13, fontWeight:600 }}>
                {TITRES[nextSlug]} →
              </Link>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
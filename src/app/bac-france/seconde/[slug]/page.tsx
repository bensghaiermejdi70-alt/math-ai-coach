'use client'
import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import { useParams } from 'next/navigation'

const C = { thm:'#4f6ef7', def:'#06d6a0', formule:'#f59e0b', prop:'#8b5cf6', methode:'#ec4899' }
const L: Record<string,string> = { thm:'Theoreme', def:'Definition', formule:'Formule cle', prop:'Propriete', methode:'Methode' }

const NAV_ORDER = [
  'python-algorithmique','nombres-calculs','intervalles-inequations','calcul-litteral',
  'geometrie-non-reperee','vecteurs-repere','droites-systemes',
  'fonctions-generalites','variations-extremums','signe-fonction',
  'proportions-evolutions','statistiques-descriptives','probabilites-echantillonnage',
]

const TITRES: Record<string,string> = {
  'python-algorithmique': 'Algorithmique et Python',
  'nombres-calculs': 'Nombres et Calculs',
  'intervalles-inequations': 'Intervalles et Inequations',
  'calcul-litteral': 'Calcul Litteral',
  'geometrie-non-reperee': 'Geometrie et Vecteurs',
  'vecteurs-repere': 'Vecteurs et Repere',
  'droites-systemes': 'Droites et Systemes',
  'fonctions-generalites': 'Fonctions Generalites',
  'variations-extremums': 'Variations et Extremums',
  'signe-fonction': "Signe d'une Fonction",
  'proportions-evolutions': 'Proportions et Evolutions',
  'statistiques-descriptives': 'Statistiques Descriptives',
  'probabilites-echantillonnage': 'Probabilites et Echantillonnage',
}

const SEC_COLOR: Record<string,string> = {
  'python-algorithmique':'#06d6a0','nombres-calculs':'#4f6ef7','intervalles-inequations':'#f59e0b',
  'calcul-litteral':'#8b5cf6','geometrie-non-reperee':'#ec4899','vecteurs-repere':'#06b6d4',
  'droites-systemes':'#f97316','fonctions-generalites':'#10b981','variations-extremums':'#4f6ef7',
  'signe-fonction':'#8b5cf6','proportions-evolutions':'#06b6d4','statistiques-descriptives':'#f59e0b',
  'probabilites-echantillonnage':'#ec4899',
}

type Theoreme = { id:string; type:string; nom:string; enonce:string }
type Exercice = { id:string; niveau:string; titre:string; enonce:string; correction:string }
type Chapitre = { ch:string; titre:string; badge:string; duree:string; desc:string; theoremes:Theoreme[]; exercices:Exercice[] }

const CHAPITRES: Record<string,Chapitre> = {

  'python-algorithmique': {
    ch:'CH 01', titre:'Algorithmique et Python', badge:'Informatique', duree:'~6h',
    desc:"Python est le langage de programmation au programme de Seconde. On apprend variables, conditions, fonctions et boucles.",
    theoremes:[
      { id:'D1', type:'def', nom:'Variables et types',
        enonce:"Types principaux :\n• int : entier  ex: a = 5\n• float : decimal  ex: pi = 3.14\n• str : chaine  ex: nom = 'Alice'\n• bool : booleen  ex: ok = True\n\nAffectation : variable = valeur\nprint(type(a))  =>  <class 'int'>" },
      { id:'D2', type:'def', nom:'Instructions conditionnelles',
        enonce:"if condition:\n    bloc_si_vrai\nelif autre_condition:\n    bloc_sinon_si\nelse:\n    bloc_sinon\n\nComparateurs : ==  !=  <  >  <=  >=\nLogiques : and  or  not\n\nEx:\nif note >= 16:\n    print('Tres bien')\nelif note >= 12:\n    print('Bien')" },
      { id:'D3', type:'def', nom:'Fonctions',
        enonce:"def nom_fonction(param1, param2):\n    # corps de la fonction\n    return resultat\n\nExemple :\ndef aire(longueur, largeur):\n    return longueur * largeur\n\nAppel : print(aire(5, 3))  =>  15\nSans return : la fonction retourne None" },
      { id:'D4', type:'def', nom:'Boucles',
        enonce:"Boucle bornee FOR :\nfor i in range(n):    # i de 0 a n-1\n    instruction\n\nBoucle conditionnelle WHILE :\nwhile condition:\n    instruction\n\nEx - somme de 1 a 10 :\ntotal = 0\nfor i in range(1, 11):\n    total = total + i\nprint(total)  =>  55" },
      { id:'M1', type:'methode', nom:'Ecrire un algorithme',
        enonce:"Etapes :\n1. Identifier les ENTREES (input ou parametres)\n2. Identifier les SORTIES (print ou return)\n3. Decomposer en etapes simples\n4. Coder et tester\n\nEx - tester si premier :\ndef est_premier(n):\n    if n < 2: return False\n    for d in range(2, n):\n        if n % d == 0: return False\n    return True\nprint(est_premier(7))  =>  True" },
    ],
    exercices:[
      { id:'EX01', niveau:'Facile', titre:'Calculer une moyenne',
        enonce:"Ecrire une fonction moyenne(a, b, c) qui retourne la moyenne de 3 nombres. Tester avec 12, 15, 9.",
        correction:"def moyenne(a, b, c):\n    return (a + b + c) / 3\n\nprint(moyenne(12, 15, 9))  # 12.0" },
      { id:'EX02', niveau:'Facile', titre:'Multiples de 7',
        enonce:"Afficher tous les multiples de 7 de 1 a 100.",
        correction:"for n in range(1, 101):\n    if n % 7 == 0:\n        print(n)\n# 7, 14, 21, 28, 35, 42, 49, 56, 63, 70, 77, 84, 91, 98" },
      { id:'EX03', niveau:'Intermediaire', titre:'Factorielle',
        enonce:"Ecrire factorielle(n) = 1 x 2 x ... x n. Tester avec n = 5.",
        correction:"def factorielle(n):\n    r = 1\n    for i in range(1, n+1):\n        r = r * i\n    return r\nprint(factorielle(5))  # 120" },
    ],
  },

  'nombres-calculs': {
    ch:'CH 02', titre:'Nombres et Calculs', badge:'Algebre', duree:'~5h',
    desc:"Puissances, racines carrees, ensembles de nombres et divisibilite. Outils indispensables tout au long de l'annee.",
    theoremes:[
      { id:'D1', type:'def', nom:'Puissances entieres relatives',
        enonce:"a^0 = 1  |  a^n = a x a x ... x a (n fois)\na^(-n) = 1 / a^n\n\nExemples :\n2^4 = 16\n2^(-3) = 1/8 = 0.125\n10^(-2) = 0.01\n3^0 = 1\n(-2)^3 = -8\n(-2)^4 = +16" },
      { id:'T1', type:'thm', nom:'Proprietes des puissances',
        enonce:"Pour a, b != 0 et m, n entiers :\n1. a^m x a^n = a^(m+n)   (meme base, on additionne)\n2. a^m / a^n = a^(m-n)   (meme base, on soustrait)\n3. (a^m)^n = a^(mn)      (puissance de puissance)\n4. (a x b)^n = a^n x b^n\n\nEx: 2^3 x 2^5 = 2^8 = 256\n    (3^2)^4 = 3^8 = 6561" },
      { id:'D2', type:'def', nom:'Racine carree',
        enonce:"racine(a) est le reel positif dont le carre vaut a.\nDefinie seulement pour a >= 0.\n(racine(a))^2 = a\nracine(a^2) = |a|\n\nProprietes :\nracine(a x b) = racine(a) x racine(b)\nracine(a/b) = racine(a) / racine(b)\n\nSimplification :\nracine(12) = racine(4 x 3) = 2 x racine(3)\nracine(50) = racine(25 x 2) = 5 x racine(2)" },
      { id:'F1', type:'formule', nom:'Ensembles de nombres',
        enonce:"N inclus dans Z inclus dans D inclus dans Q inclus dans R\n\nN = {0, 1, 2, 3, ...} entiers naturels\nZ = {...,-2,-1,0,1,2,...} entiers relatifs\nD = decimaux (denominateur puissance de 10)\nQ = rationnels p/q (decimale finie ou periodique)\nR = tous les reels (inclut les irrationnels)\n\nIrrationnels : racine(2) ≈ 1.41421... ; pi ≈ 3.14159..." },
      { id:'M1', type:'methode', nom:'PGCD - Algorithme d Euclide',
        enonce:"PGCD(a,b) = Plus Grand Diviseur Commun\n\nAlgorithme :\n-> diviser le plus grand par le plus petit\n-> remplacer par (diviseur, reste)\n-> s'arreter quand reste = 0\n-> PGCD = dernier diviseur non nul\n\nEx: PGCD(48, 18)\n48 = 2 x 18 + 12\n18 = 1 x 12 + 6\n12 = 2 x 6 + 0\nPGCD(48,18) = 6\n\nPPCM(a,b) = a x b / PGCD(a,b) = 48 x 18/6 = 144" },
    ],
    exercices:[
      { id:'EX01', niveau:'Facile', titre:'Puissances',
        enonce:"Calculer : 2^5, 3^(-2), 10^(-3), (2^2)^3",
        correction:"2^5 = 32\n3^(-2) = 1/9 ≈ 0.111\n10^(-3) = 0.001\n(2^2)^3 = 2^6 = 64" },
      { id:'EX02', niveau:'Facile', titre:'Simplifier des racines',
        enonce:"Simplifier : racine(75), racine(108), racine(50/2)",
        correction:"racine(75) = racine(25 x 3) = 5 x racine(3)\nracine(108) = racine(36 x 3) = 6 x racine(3)\nracine(50/2) = racine(25) = 5" },
      { id:'EX03', niveau:'Intermediaire', titre:'PGCD et fractions',
        enonce:"Calculer PGCD(84, 60), puis simplifier 84/60.",
        correction:"84 = 1 x 60 + 24\n60 = 2 x 24 + 12\n24 = 2 x 12 + 0\nPGCD = 12\n84/60 = 7/5" },
    ],
  },

  'intervalles-inequations': {
    ch:'CH 03', titre:'Intervalles, Inegalites et Inequations', badge:'Algebre', duree:'~4h',
    desc:"Les intervalles decrivent des ensembles de reels. Les inequations servent a resoudre des problemes avec contraintes.",
    theoremes:[
      { id:'D1', type:'def', nom:'Notations d intervalles',
        enonce:"Intervalle ferme : [a;b] = {x in R | a <= x <= b}\nIntervalle ouvert : ]a;b[ = {x in R | a < x < b}\nSemi-ouvert : [a;b[ ou ]a;b]\nInfinis : [a;+inf[ = {x in R | x >= a}\n         ]-inf;b] = {x in R | x <= b}\n\nNote : +inf et -inf ne sont JAMAIS inclus (crochet ouvert).\nUnion : A u B  |  Intersection : A n B" },
      { id:'T1', type:'thm', nom:'Proprietes des inegalites',
        enonce:"Si a < b et c reel :\n1. c > 0 : ac < bc           (MEME sens)\n2. c < 0 : ac > bc           (sens INVERSE !)\n3. a+c < b+c                 (translation conserve)\n4. a < b et b < c => a < c   (transitivite)\n5. 0 < a < b => 1/a > 1/b   (inverser positifs)\n\nATTENTION : multiplier par un negatif INVERSE le sens !" },
      { id:'M1', type:'methode', nom:'Resoudre une inequation du 1er degre',
        enonce:"Methode :\n1. Developper si necessaire\n2. Isoler x (termes en x d'un cote)\n3. Diviser par le coefficient\n4. Si coefficient negatif : inverser le sens\n5. Ecrire la solution en intervalle\n\nEx 1 : 3x - 5 > 2x + 1\n=> x > 6\nSolution : ]6 ; +inf[\n\nEx 2 : -2x + 3 <= 7\n=> -2x <= 4\n=> x >= -2  (division par -2 : sens inverse)\nSolution : [-2 ; +inf[" },
      { id:'D2', type:'def', nom:'Valeur absolue',
        enonce:"|x| = x si x >= 0  et  |x| = -x si x < 0\n|x| = distance de x a 0\n|x - a| = distance de x a a\n\nProprietes :\n|x| >= 0  |  |x| = 0 <=> x = 0\n|-x| = |x|  |  |ab| = |a| x |b|\n\nResolution :\n|x| < r  <=>  -r < x < r    (r > 0)\n|x| > r  <=>  x < -r  ou  x > r\n|x - a| < r  <=>  a-r < x < a+r" },
    ],
    exercices:[
      { id:'EX01', niveau:'Facile', titre:'Resoudre une inequation',
        enonce:"Resoudre : 2x + 3 <= x - 5 et donner la solution en intervalle.",
        correction:"2x + 3 <= x - 5\n2x - x <= -5 - 3\nx <= -8\nSolution : ]-inf ; -8]" },
      { id:'EX02', niveau:'Facile', titre:'Inequation avec inversement',
        enonce:"Resoudre : -3x + 6 > 12",
        correction:"-3x > 12 - 6\n-3x > 6\nx < -2  (division par -3 : sens inverse !)\nSolution : ]-inf ; -2[" },
      { id:'EX03', niveau:'Intermediaire', titre:'Valeur absolue',
        enonce:"Resoudre : |2x - 1| <= 5",
        correction:"|2x-1| <= 5  <=>  -5 <= 2x-1 <= 5\n<=>  -4 <= 2x <= 6\n<=>  -2 <= x <= 3\nSolution : [-2 ; 3]" },
    ],
  },

  'calcul-litteral': {
    ch:'CH 04', titre:'Calcul Litteral', badge:'Algebre', duree:'~5h',
    desc:"Identites remarquables, factorisation et resolution d'equations produit et quotient.",
    theoremes:[
      { id:'F1', type:'formule', nom:'Identites remarquables',
        enonce:"(a+b)^2 = a^2 + 2ab + b^2    (carre d'une somme)\n(a-b)^2 = a^2 - 2ab + b^2    (carre d'une difference)\n(a+b)(a-b) = a^2 - b^2       (produit de conjugues)\n\nA MEMORISER - servent tout au lycee !\n\nDeveloppement :\n(x+3)^2 = x^2 + 6x + 9\n(2x-5)^2 = 4x^2 - 20x + 25\n(x+4)(x-4) = x^2 - 16\n\nFactorisation :\nx^2 + 6x + 9 = (x+3)^2\n4x^2 - 25 = (2x-5)(2x+5)" },
      { id:'T1', type:'thm', nom:'Propriete du produit nul',
        enonce:"A x B = 0  <=>  A = 0  ou  B = 0\n\n(ou au sens mathematique : au moins l'un des deux)\n\nApplication - resoudre par factorisation :\nx^2 - 5x + 6 = 0\n=> (x-2)(x-3) = 0\n=> x-2 = 0  ou  x-3 = 0\n=> x = 2  ou  x = 3\n\nMethode : factoriser AVANT d'appliquer !" },
      { id:'M1', type:'methode', nom:'Developper et factoriser',
        enonce:"DEVELOPPER : produit => somme\nk(a+b) = ka + kb\n(a+b)(c+d) = ac + ad + bc + bd\n\nFACTORISER : somme => produit\n1. Facteur commun : 6x^2+9x = 3x(2x+3)\n2. Identite : x^2-9 = (x-3)(x+3)\n3. Trinome : x^2+5x+6 = (x+2)(x+3)\n\nEx: 4x^2 - 12x + 9\n= (2x)^2 - 2(2x)(3) + 3^2\n= (2x-3)^2\nVerifier en developpant !" },
      { id:'D1', type:'def', nom:'Fractions algebriques et equation quotient',
        enonce:"Fraction A(x)/B(x) avec B(x) != 0\n\nSimplification : A*C/(B*C) = A/B  (si C != 0)\n\nEquation A/B = 0 :\n=> A = 0  ET  B != 0\n\nEx: (x-2)/(x+1) = 0\n=> x-2 = 0  et  x+1 != 0\n=> x = 2  et  x != -1\nSolution : x = 2" },
    ],
    exercices:[
      { id:'EX01', niveau:'Facile', titre:'Developper',
        enonce:"Developper et reduire : (x+5)^2 - (x-3)(x+3)",
        correction:"(x+5)^2 = x^2 + 10x + 25\n(x-3)(x+3) = x^2 - 9\nResultat = x^2+10x+25 - x^2+9 = 10x + 34" },
      { id:'EX02', niveau:'Facile', titre:'Factoriser',
        enonce:"Factoriser : 9x^2 - 6x + 1",
        correction:"9x^2 - 6x + 1 = (3x)^2 - 2(3x)(1) + 1^2\n= (3x-1)^2" },
      { id:'EX03', niveau:'Intermediaire', titre:'Resoudre par factorisation',
        enonce:"Resoudre : x^2 - 7x + 12 = 0",
        correction:"Chercher a+b=7 et ab=12 => a=3, b=4\nx^2 - 7x + 12 = (x-3)(x-4) = 0\nx = 3  ou  x = 4" },
    ],
  },

  'geometrie-non-reperee': {
    ch:'CH 05', titre:'Geometrie et Vecteurs', badge:'Geometrie', duree:'~5h',
    desc:"Les vecteurs representent des deplacements dans le plan. Base de la geometrie analytique et de la physique.",
    theoremes:[
      { id:'D1', type:'def', nom:'Vecteur : caracteristiques',
        enonce:"Un vecteur AB est caracterise par :\n1. Sa DIRECTION : droite (AB) et paralleles\n2. Son SENS : de A vers B\n3. Sa NORME : longueur AB (notee ||AB||)\n\nDeux vecteurs egaux : meme direction, sens et norme.\n=> u = v meme sans meme point de depart !\n\nVecteur nul : norme = 0  |  AA = vecteur_nul\npour tout point A : AA = 0" },
      { id:'T1', type:'thm', nom:'Relation de Chasles',
        enonce:"Pour tous points A, B, C :\nAC = AB + BC\n\nConsequences :\nAB + BA = 0  (vecteur oppose : BA = -AB)\nAB = AO + OB  (decomposition par O)\nAB - AC = CB\n\nEx: si M milieu de [BC]\nAM = AB + BM = AB + (1/2)BC\n\nApplications : simplifier les sommes de vecteurs" },
      { id:'D2', type:'def', nom:'Multiplication par un reel',
        enonce:"k*u est le vecteur :\n- meme direction que u (si k != 0)\n- meme sens si k > 0, sens oppose si k < 0\n- norme = |k| x ||u||\n\nCas particuliers :\n0*u = 0  |  1*u = u  |  (-1)*u = -u\n\nColinearite :\nu et v colineaires <=> u = k*v  pour un k reel\n<=> droites de meme direction\n<=> paralleles ou confondues" },
      { id:'P1', type:'prop', nom:'Theoreme de Thales',
        enonce:"Si M sur (AB) et N sur (AC) avec AM/AB = AN/AC = k != 0\nAlors MN // BC et MN/BC = |k|\n\nReciproque : MN // BC => AM/AB = AN/AC\n\nCas particulier : M milieu de AB\n=> AM/AB = 1/2\n\nPythagore : triangle rectangle en A\nBC^2 = AB^2 + AC^2\ncos A = AB/BC  |  sin A = AC/BC" },
    ],
    exercices:[
      { id:'EX01', niveau:'Facile', titre:'Relation de Chasles',
        enonce:"ABCD est un parallelogramme. Exprimer AC en fonction de AB et AD.",
        correction:"ABCD parallelogramme => BC = AD\nAC = AB + BC = AB + AD" },
      { id:'EX02', niveau:'Intermediaire', titre:'Colinearite',
        enonce:"M est tel que AM = (2/3)AB. Que dire de M par rapport a [AB] ?",
        correction:"AM et AB sont colineaires => M est sur la droite (AB)\n2/3 est entre 0 et 1 => M est entre A et B\nM se trouve aux 2/3 de [AB] depuis A" },
    ],
  },

  'vecteurs-repere': {
    ch:'CH 06', titre:'Vecteurs et Repere', badge:'Geometrie', duree:'~4h',
    desc:"Coordonnees de vecteurs, distances et colinearite par le calcul.",
    theoremes:[
      { id:'D1', type:'def', nom:'Repere et coordonnees',
        enonce:"Repere (O ; i, j) : origine O + vecteurs directeurs i et j\nTout vecteur u = a*i + b*j  (coordonnees (a;b))\n\nCoordonnees de AB :\nSi A(xA;yA) et B(xB;yB)\n=> AB = (xB-xA ; yB-yA)\n\nOperations :\nu(a;b) + v(a';b') = (a+a' ; b+b')\nk * u(a;b) = (ka ; kb)\n\nColinearite : u(a;b) et v(a';b') colineaires <=> ab' - a'b = 0" },
      { id:'F1', type:'formule', nom:'Milieu et distance',
        enonce:"Milieu I de [AB] avec A(xA;yA) et B(xB;yB) :\nxI = (xA+xB)/2   yI = (yA+yB)/2\n\nDistance AB (= norme de AB) :\nAB = racine( (xB-xA)^2 + (yB-yA)^2 )\n\nNorme d'un vecteur u(a;b) :\n||u|| = racine(a^2 + b^2)\n\nEx: A(1;3) et B(4;7)\nAB = (3;4)  =>  AB = racine(9+16) = 5\nMilieu = (2.5 ; 5)" },
      { id:'T1', type:'thm', nom:'Colinearite en coordonnees',
        enonce:"u(a;b) et v(a';b') colineaires  <=>  ab' - a'b = 0\n\nApplication 1 - points alignes :\nA, B, C alignes <=> det(AB, AC) = 0\n<=> (xB-xA)(yC-yA) - (yB-yA)(xC-xA) = 0\n\nApplication 2 - droites paralleles :\n(AB) // (CD) <=> AB et CD colineaires\n\nEx: A(0;0), B(2;4), C(3;6)\ndet = 2*6 - 4*3 = 0  => alignes" },
    ],
    exercices:[
      { id:'EX01', niveau:'Facile', titre:'Coordonnees de vecteur',
        enonce:"A(2;-1), B(5;3), C(-1;4). Calculer AB, AC et ||AB||.",
        correction:"AB = (5-2 ; 3-(-1)) = (3;4)\nAC = (-1-2 ; 4-(-1)) = (-3;5)\n||AB|| = racine(9+16) = racine(25) = 5" },
      { id:'EX02', niveau:'Intermediaire', titre:'Trois points alignes ?',
        enonce:"Verifier si A(0;0), B(2;4) et C(3;6) sont alignes.",
        correction:"AB = (2;4)  AC = (3;6)\ndet = 2*6 - 4*3 = 12 - 12 = 0\n=> Alignes ! (ils sont tous sur y = 2x)" },
    ],
  },

  'droites-systemes': {
    ch:'CH 07', titre:'Droites du Plan et Systemes', badge:'Geometrie', duree:'~5h',
    desc:"Equations de droites et resolution de systemes de deux equations a deux inconnues.",
    theoremes:[
      { id:'D1', type:'def', nom:'Equations d une droite',
        enonce:"Forme reduite : y = mx + p\nm = coefficient directeur (pente)\np = ordonnee a l'origine (valeur en x=0)\n\nDroite verticale : x = k (pas de forme reduite)\n\nCalculer m et p depuis A(xA;yA) et B(xB;yB) :\nm = (yB-yA) / (xB-xA)  (si xA != xB)\npuis p = yA - m*xA\n\nForme cartes. : ax + by + c = 0" },
      { id:'T1', type:'thm', nom:'Positions relatives de deux droites',
        enonce:"d1 : y = m1x + p1  et  d2 : y = m2x + p2\n\nParalleles : m1 = m2  et  p1 != p2\nConfondues : m1 = m2  et  p1 = p2\nSecantes : m1 != m2  (un seul point commun)\nPerpendiculaires : m1 * m2 = -1\n\nEx: d1 : y = 2x+1  et  d2 : y = -0.5x+3\nm1 * m2 = 2 * (-0.5) = -1  => perpendiculaires !" },
      { id:'M1', type:'methode', nom:'Resoudre un systeme 2x2',
        enonce:"Systeme : { ax + by = e\n           { cx + dy = f\n\nMethode substitution :\n1. Isoler une inconnue dans eq1\n2. Substituer dans eq2\n3. Resoudre et trouver les deux valeurs\n\nMethode combinaison :\n1. Multiplier pour avoir +/- memes coefficients\n2. Additionner/soustraire pour eliminer\n\nEx: { 2x + y = 5\n     { x - y = 1\nAddition : 3x = 6  =>  x = 2, y = 1\nVerifier dans les 2 equations !" },
    ],
    exercices:[
      { id:'EX01', niveau:'Facile', titre:'Equation de droite',
        enonce:"Trouver l'equation de la droite passant par A(1;3) et B(3;7).",
        correction:"m = (7-3)/(3-1) = 4/2 = 2\np = 3 - 2*1 = 1\nEquation : y = 2x + 1" },
      { id:'EX02', niveau:'Intermediaire', titre:'Resoudre un systeme',
        enonce:"Resoudre : { 3x - y = 5\n             { x + 2y = 4",
        correction:"De (1) : y = 3x - 5\nSubstituer dans (2) : x + 2(3x-5) = 4\n7x - 10 = 4  =>  x = 2\ny = 3*2 - 5 = 1\nSolution : (2 ; 1)" },
    ],
  },

  'fonctions-generalites': {
    ch:'CH 08', titre:'Fonctions, Generalites', badge:'Fonctions', duree:'~6h',
    desc:"Definition, image, antecedent, parite et fonctions de reference a connaitre.",
    theoremes:[
      { id:'D1', type:'def', nom:'Vocabulaire des fonctions',
        enonce:"f : D -> R associe a tout x un UNIQUE reel f(x)\n\nEnsemble de definition D : valeurs autorisees pour x\nImage de x par f : f(x)\nAntecedent de y par f : x tel que f(x) = y\n\nNotation : f : D -> R, x |-> f(x)\n\nCourbe Cf : ensemble des points (x ; f(x))\nM(a;b) sur Cf  <=>  f(a) = b" },
      { id:'D2', type:'def', nom:'Fonctions de reference',
        enonce:"f(x) = x^2  (parabole)\n D = R  |  image >= 0\n Decroit sur ]-inf;0]  |  Croit sur [0;+inf[\n Minimum 0 en x=0  |  PAIRE\n\nf(x) = x^3  (cubique)\n D = R  |  Croissante sur R  |  IMPAIRE\n\nf(x) = 1/x  (hyperbole)\n D = R\\{0}  |  Decroissante sur ]-inf;0[ et ]0;+inf[\n IMPAIRE\n\nf(x) = racine(x)\n D = [0;+inf[  |  Croissante  |  ni paire ni impaire" },
      { id:'D3', type:'def', nom:'Parite d une fonction',
        enonce:"D doit etre symetrique par rapport a 0.\n\nFonction PAIRE : f(-x) = f(x) pour tout x\n=> Cf symetrique par rapport a l'axe Oy\nEx : x^2, cos(x)\n\nFonction IMPAIRE : f(-x) = -f(x) pour tout x\n=> f(0) = 0 si 0 dans D\n=> Cf symetrique par rapport a l'origine O\nEx : x^3, x, 1/x\n\nSinon : ni paire ni impaire" },
      { id:'M1', type:'methode', nom:'Resolutions graphiques',
        enonce:"f(x) = k :\n=> abscisses des intersections de Cf avec y = k\n\nf(x) > k :\n=> x pour lesquels Cf est AU-DESSUS de y = k\n\nf(x) = g(x) :\n=> abscisses des intersections de Cf et Cg\n\nf(x) <= g(x) :\n=> x pour lesquels Cf est en-dessous ou coincide avec Cg" },
    ],
    exercices:[
      { id:'EX01', niveau:'Facile', titre:'Image et antecedent',
        enonce:"f(x) = 2x^2 - 3x + 1. Calculer f(2) et f(-1).",
        correction:"f(2) = 2*4 - 3*2 + 1 = 8 - 6 + 1 = 3\nf(-1) = 2*1 - 3*(-1) + 1 = 2 + 3 + 1 = 6" },
      { id:'EX02', niveau:'Intermediaire', titre:'Parite',
        enonce:"Etudier la parite de f(x) = x^3 - x.",
        correction:"D = R, symetrique par rapport a 0.\nf(-x) = (-x)^3 - (-x) = -x^3 + x = -(x^3-x) = -f(x)\n=> f est IMPAIRE" },
    ],
  },

  'variations-extremums': {
    ch:'CH 09', titre:'Variations et Extremums', badge:'Fonctions', duree:'~4h',
    desc:"Etude des variations, tableau de variations et extremums d'une fonction.",
    theoremes:[
      { id:'D1', type:'def', nom:'Croissance et decroissance',
        enonce:"f croissante sur I :\npour tout a < b dans I : f(a) < f(b)\n(quand x augmente, f(x) augmente)\n\nf decroissante sur I :\npour tout a < b dans I : f(a) > f(b)\n(quand x augmente, f(x) diminue)\n\nf constante sur I :\npour tout a, b dans I : f(a) = f(b)\n\nTableau de variations :\nFleche montante : croissante\nFleche descendante : decroissante" },
      { id:'D2', type:'def', nom:'Maximum et minimum',
        enonce:"Maximum global : f(a) >= f(x) pour tout x dans D\nMinimum global : f(a) <= f(x) pour tout x dans D\n\nExtremum local en a :\n- croissante => decroissante : MAXIMUM local\n- decroissante => croissante : MINIMUM local\n\nLecture graphique :\nmaximum = sommet de la courbe\nminimum = creux de la courbe" },
      { id:'P1', type:'prop', nom:'Variations des fonctions usuelles',
        enonce:"f(x) = mx + p :\nm > 0 : croissante sur R\nm < 0 : decroissante sur R\nm = 0 : constante\n\nf(x) = x^2 :\nDecroissante sur ]-inf ; 0]  |  Croissante sur [0 ; +inf[\nMinimum 0 en x = 0\n\nf(x) = x^3 : Croissante sur R\n\nf(x) = 1/x : Decroissante sur ]-inf;0[ et sur ]0;+inf[\n\nf(x) = racine(x) : Croissante sur [0;+inf[" },
    ],
    exercices:[
      { id:'EX01', niveau:'Facile', titre:'Lire un tableau de variations',
        enonce:"f definie sur [-2;4]. Croissante sur [-2;1], decroissante sur [1;4].\nf(-2)=0, f(1)=5, f(4)=-1. Max et min ?",
        correction:"Maximum : f(1) = 5 (sommet)\nMinimum : f(4) = -1 (valeur la plus basse)" },
      { id:'EX02', niveau:'Intermediaire', titre:'Etudier une fonction affine',
        enonce:"f(x) = -3x + 7. Tableau de variations et valeurs en -1 et 4.",
        correction:"m = -3 < 0 => f decroissante sur R\nf(-1) = 3 + 7 = 10\nf(4) = -12 + 7 = -5" },
    ],
  },

  'signe-fonction': {
    ch:'CH 10', titre:"Signe d'une Fonction", badge:'Fonctions', duree:'~5h',
    desc:"Tableaux de signes, produits et quotients de fonctions, resolution d'inequations.",
    theoremes:[
      { id:'M1', type:'methode', nom:'Signe d une fonction affine',
        enonce:"f(x) = ax + b  avec a != 0\nZero unique : x0 = -b/a\n\nSi a > 0 : f(x) < 0 sur ]-inf;x0[  et  f(x) > 0 sur ]x0;+inf[\nSi a < 0 : inverse\n\nEx: f(x) = 2x - 6\nZero : x0 = 3, a = 2 > 0\n=> f(x) < 0 sur ]-inf;3[\n   f(3) = 0\n   f(x) > 0 sur ]3;+inf[" },
      { id:'T1', type:'thm', nom:'Signe produit et quotient',
        enonce:"Regle des signes :\n(+) x (+) = (+)  |  (-) x (-) = (+)\n(+) x (-) = (-)  |  (+) / (-) = (-)\n\nMethode pour A(x) x B(x) :\n1. Trouver les zeros de A et B\n2. Tableau de signes de A puis de B\n3. Multiplier les signes ligne par ligne\n\nPour A(x) / B(x) :\nMeme methode + exclure les zeros de B\nA/B = 0 <=> A = 0 ET B != 0" },
      { id:'M2', type:'methode', nom:'Inequation par tableau de signes',
        enonce:"Ex: (x-1)(x+3) > 0\n\nEtape 1 : zeros\nx-1 = 0 => x = 1\nx+3 = 0 => x = -3\n\nEtape 2 : tableau\n       ]-inf;-3[  -3  ]-3;1[  1  ]1;+inf[\n(x+3)    -        0     +     +      +\n(x-1)    -        -     -     0      +\nProduit  +        0     -     0      +\n\nEtape 3 : solution de > 0\n]-inf;-3[ union ]1;+inf[" },
    ],
    exercices:[
      { id:'EX01', niveau:'Facile', titre:"Signe d'un produit",
        enonce:"Resoudre (x+2)(x-5) <= 0",
        correction:"Zeros : x = -2 et x = 5\nTableau => produit <= 0 sur [-2 ; 5]" },
      { id:'EX02', niveau:'Intermediaire', titre:"Signe d'un quotient",
        enonce:"Resoudre (2x-4)/(x+1) > 0",
        correction:"Zeros : x = 2 (num)  |  x = -1 (den, exclu)\nTableau => solution : ]-inf;-1[ union ]2;+inf[" },
    ],
  },

  'proportions-evolutions': {
    ch:'CH 11', titre:'Proportions et Evolutions', badge:'Stats', duree:'~4h',
    desc:"Pourcentages, taux d'evolution et coefficients multiplicateurs.",
    theoremes:[
      { id:'D1', type:'def', nom:"Taux d'evolution et coefficient multiplicateur",
        enonce:"Proportion : p = effectif_A / effectif_total\n\nTaux d'evolution de Vi a Vf :\nt = (Vf - Vi) / Vi = Vf/Vi - 1\n(en decimal ou en %)\n\nCoefficient multiplicateur :\nCM = Vf / Vi = 1 + t\n\nRelations :\nVf = Vi x CM\nt = CM - 1\n\nHausse 20% => CM = 1.20\nBaisse 15% => CM = 0.85" },
      { id:'T1', type:'thm', nom:'Evolutions successives et reciproques',
        enonce:"Evolutions successives :\nCM_total = CM1 x CM2\n\nATTENTION : +20% puis -20% != 0% !\nCM = 1.20 x 0.80 = 0.96 => baisse de 4% !\n\nEvolution reciproque :\nPour annuler CM : CM_inverse = 1/CM\nEx: +25% (CM=1.25) => annuler avec CM=1/1.25=0.8 => -20%\n\nProportion de proportion :\np(A inter B) = p(A) x p(B sachant A)" },
    ],
    exercices:[
      { id:'EX01', niveau:'Facile', titre:'Calcul de CM',
        enonce:"Un article passe de 80 euro a 96 euro. Calculer le taux d'evolution.",
        correction:"CM = 96/80 = 1.20\nt = 1.20 - 1 = 0.20 = +20%" },
      { id:'EX02', niveau:'Intermediaire', titre:'Evolutions successives',
        enonce:"Un prix augmente de 10% puis diminue de 10%. Evolution globale ?",
        correction:"CM1 = 1.10  |  CM2 = 0.90\nCM_total = 1.10 x 0.90 = 0.99\nt = -0.01 = -1%  (pas 0% !)" },
    ],
  },

  'statistiques-descriptives': {
    ch:'CH 12', titre:'Statistiques Descriptives', badge:'Stats', duree:'~5h',
    desc:"Indicateurs de position (moyenne, mediane) et de dispersion (ecart-type, quartiles).",
    theoremes:[
      { id:'F1', type:'formule', nom:'Moyenne',
        enonce:"Moyenne simple de n valeurs :\nx_barre = (x1 + x2 + ... + xn) / n\n\nMoyenne ponderee :\nx_barre = (n1*x1 + n2*x2 + ...) / (n1+n2+...)\n\nLinearite : si y = ax + b  =>  y_barre = a*x_barre + b\n\nEx: notes 10, 12, 15, 14, 9 (n=5)\nx_barre = (10+12+15+14+9)/5 = 60/5 = 12" },
      { id:'F2', type:'formule', nom:'Ecart-type',
        enonce:"Variance :\nV = (1/n) x somme( (xi - x_barre)^2 )\n\nEcart-type :\nsigma = racine(V)\n\nsigma mesure la dispersion :\nsigma faible : donnees groupees pres de x_barre\nsigma grand : donnees dispersees\nsigma = 0 : toutes valeurs egales a x_barre\n\nEx: 10,12,15,14,9 ; x_barre = 12\nV = (4+0+9+4+9)/5 = 5.2  =>  sigma ≈ 2.28" },
      { id:'D1', type:'def', nom:'Mediane et quartiles',
        enonce:"Mediane Me : 50% des donnees de chaque cote\n\nQuartile Q1 : 25% des donnees <= Q1\nQuartile Q3 : 75% des donnees <= Q3\nEcart interquartile : EI = Q3 - Q1\n\nBoite a moustaches :\n[min ---[ Q1 | Me | Q3 ]--- max]\n\nMediane vs moyenne :\nMediane : robuste aux valeurs extremes\nMoyenne : tient compte de toutes les valeurs" },
    ],
    exercices:[
      { id:'EX01', niveau:'Facile', titre:'Moyenne et ecart-type',
        enonce:"Calculer x_barre et sigma pour : 4, 6, 8, 10, 12.",
        correction:"x_barre = 40/5 = 8\nV = (16+4+0+4+16)/5 = 40/5 = 8\nsigma = racine(8) = 2*racine(2) ≈ 2.83" },
      { id:'EX02', niveau:'Facile', titre:'Mediane et quartiles',
        enonce:"Donnees ordonnees : 3, 5, 7, 9, 11, 13, 15, 17.\nCalculer Q1, Me et Q3.",
        correction:"n=8\nMe = (7+9)/2 = 8  (entre 4e et 5e valeurs)\nQ1 = (5+7)/2 = 6  (mediane partie inferieure)\nQ3 = (13+15)/2 = 14  (mediane partie superieure)\nEI = 14 - 6 = 8" },
    ],
  },

  'probabilites-echantillonnage': {
    ch:'CH 13', titre:'Probabilites et Echantillonnage', badge:'Probabilites', duree:'~5h',
    desc:"Calcul des probabilites, operations sur les evenements et intervalle de fluctuation.",
    theoremes:[
      { id:'D1', type:'def', nom:'Vocabulaire des probabilites',
        enonce:"Experience aleatoire : resultat impredictible\nUnivers Omega : ensemble de tous les resultats\nEvenement : sous-ensemble de Omega\nEvenement elementaire : {omega} un seul resultat\n\nProbabilite P :\n0 <= P(A) <= 1  |  P(Omega) = 1\nSi A inter B = vide : P(A union B) = P(A)+P(B)\n\nEquiprobabilite : P(A) = card(A) / card(Omega)\n\nEx: de a 6 faces\nP(pair) = 3/6 = 1/2" },
      { id:'T1', type:'thm', nom:'Operations sur les evenements',
        enonce:"Contraire : P(A_barre) = 1 - P(A)\n\nReunion :\nP(A union B) = P(A) + P(B) - P(A inter B)\nSi incompatibles : P(A union B) = P(A) + P(B)\n\nIndependance :\nA et B independants <=> P(A inter B) = P(A) x P(B)\n\nEx: P(A)=0.3, P(B)=0.5, P(A inter B)=0.15\nIndependants ? 0.3*0.5 = 0.15 = P(A inter B) => oui\nP(A union B) = 0.3 + 0.5 - 0.15 = 0.65" },
      { id:'T2', type:'thm', nom:'Intervalle de fluctuation',
        enonce:"Echantillon de taille n dans une population de proportion p.\nLa frequence f observee fluctue autour de p.\n\nIntervalle de fluctuation au seuil 95% :\n[p - 1/racine(n)  ;  p + 1/racine(n)]\n\nValable si n >= 25 et 0.2 <= p <= 0.8\n\nInterpretation :\nf dans intervalle : resultat conforme (ne pas rejeter)\nf hors intervalle : resultat surprenant\n\nEx: p=0.4, n=100\n=> [0.4-0.1 ; 0.4+0.1] = [0.3 ; 0.5]" },
    ],
    exercices:[
      { id:'EX01', niveau:'Facile', titre:'Calcul de probabilites',
        enonce:"De equilibre 6 faces. Calculer P(multiple de 3) et P(au moins 4).",
        correction:"P(mult 3) = card{3,6}/6 = 2/6 = 1/3\nP(>= 4) = card{4,5,6}/6 = 3/6 = 1/2" },
      { id:'EX02', niveau:'Intermediaire', titre:'Intervalle de fluctuation',
        enonce:"Urne : 30% de boules rouges (p=0.3). On tire n=400. Intervalle et f=0.28 ?",
        correction:"I = [0.3 - 1/20 ; 0.3 + 1/20] = [0.25 ; 0.35]\nf = 0.28 appartient a [0.25;0.35]\n=> pas surprenant, conforme" },
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
      <h2>Chapitre en cours de redaction</h2>
      <p style={{ color:'var(--muted)' }}>Ce chapitre sera disponible prochainement.</p>
      <Link href="/bac-france/maths/seconde" className="btn btn-primary">Retour Seconde Maths</Link>
    </div>
  )

  return (
    <>
      <Navbar />
      <main style={{ minHeight:'100vh', background:'var(--bg)', color:'var(--text)' }}>

        <section style={{ padding:'80px clamp(20px,5vw,60px) 32px', borderBottom:'1px solid var(--border)', position:'relative' }}>
          <div style={{ position:'absolute', top:0, left:0, right:0, height:4, background:`linear-gradient(90deg, ${color}, transparent)` }} />
          <div style={{ maxWidth:900, margin:'0 auto' }}>
            <div style={{ display:'flex', alignItems:'center', gap:8, fontSize:12, color:'var(--muted)', marginBottom:20, flexWrap:'wrap' }}>
              <Link href="/bac-france/maths" style={{ color:'var(--muted)', textDecoration:'none' }}>Maths France</Link>
              <span>›</span>
              <Link href="/bac-france/maths/seconde" style={{ color:'var(--muted)', textDecoration:'none' }}>Seconde</Link>
              <span>›</span>
              <span style={{ color:'var(--text2)' }}>{ch.titre}</span>
            </div>
            <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:12 }}>
              <span style={{ fontSize:10, fontFamily:'var(--font-mono)', color, fontWeight:700, background:`${color}15`, border:`1px solid ${color}30`, padding:'3px 10px', borderRadius:20 }}>{ch.ch}</span>
              <span style={{ fontSize:10, color:'var(--muted)', background:'var(--surface)', padding:'3px 10px', borderRadius:20, border:'1px solid var(--border)' }}>{ch.badge}</span>
              <span style={{ fontSize:10, color:'var(--muted)', background:'var(--surface)', padding:'3px 10px', borderRadius:20, border:'1px solid var(--border)' }}>⏱ {ch.duree}</span>
            </div>
            <h1 style={{ fontFamily:'var(--font-display)', fontWeight:800, fontSize:'clamp(22px,3.5vw,40px)', lineHeight:1.1, marginBottom:10 }}>{ch.titre}</h1>
            <p style={{ fontSize:14, color:'var(--text2)', maxWidth:700, lineHeight:1.6 }}>{ch.desc}</p>
          </div>
        </section>

        <div style={{ maxWidth:900, margin:'0 auto', padding:'32px clamp(20px,5vw,60px) 80px' }}>

          <h2 style={{ fontFamily:'var(--font-display)', fontSize:18, marginBottom:20, display:'flex', alignItems:'center', gap:8 }}>
            <span style={{ color }}>📖</span> Cours complet
          </h2>
          <div style={{ display:'flex', flexDirection:'column', gap:16, marginBottom:40 }}>
            {ch.theoremes.map((t) => (
              <div key={t.id} style={{ background:'var(--surface)', border:`1px solid ${C[t.type as keyof typeof C]}30`, borderLeft:`3px solid ${C[t.type as keyof typeof C]}`, borderRadius:12, padding:'20px 24px' }}>
                <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:12 }}>
                  <span style={{ fontSize:10, fontWeight:800, padding:'2px 10px', borderRadius:20, background:`${C[t.type as keyof typeof C]}18`, color:C[t.type as keyof typeof C], border:`1px solid ${C[t.type as keyof typeof C]}30`, letterSpacing:'0.05em' }}>
                    {L[t.type]}
                  </span>
                  <span style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:15 }}>{t.nom}</span>
                </div>
                <pre style={{ fontFamily:'var(--font-mono)', fontSize:12.5, color:'var(--text2)', whiteSpace:'pre-wrap', lineHeight:1.8, margin:0, background:'rgba(0,0,0,0.15)', borderRadius:8, padding:'12px 16px' }}>
                  {t.enonce}
                </pre>
              </div>
            ))}
          </div>

          {ch.exercices.length > 0 && (
            <>
              <h2 style={{ fontFamily:'var(--font-display)', fontSize:18, marginBottom:20, display:'flex', alignItems:'center', gap:8 }}>
                <span style={{ color }}>✏️</span> Exercices corriges
              </h2>
              <div style={{ display:'flex', flexDirection:'column', gap:12, marginBottom:40 }}>
                {ch.exercices.map((ex) => (
                  <div key={ex.id} style={{ background:'var(--surface)', border:'1px solid var(--border)', borderRadius:12, overflow:'hidden' }}>
                    <button onClick={() => setOpenEx(openEx === ex.id ? null : ex.id)}
                      style={{ width:'100%', display:'flex', justifyContent:'space-between', alignItems:'center', padding:'16px 20px', background:'none', border:'none', cursor:'pointer', color:'var(--text)', textAlign:'left' }}>
                      <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                        <span style={{ fontSize:10, padding:'2px 8px', borderRadius:20, fontWeight:700,
                          background: ex.niveau==='Facile' ? 'rgba(6,214,160,0.15)' : ex.niveau==='Intermediaire' ? 'rgba(245,158,11,0.15)' : 'rgba(239,68,68,0.15)',
                          color: ex.niveau==='Facile' ? '#06d6a0' : ex.niveau==='Intermediaire' ? '#f59e0b' : '#ef4444' }}>
                          {ex.niveau}
                        </span>
                        <span style={{ fontWeight:600, fontSize:14 }}>{ex.titre}</span>
                      </div>
                      <span style={{ color:'var(--muted)', transition:'transform 0.2s', transform: openEx===ex.id ? 'rotate(180deg)' : 'none' }}>▼</span>
                    </button>
                    {openEx === ex.id && (
                      <div style={{ padding:'0 20px 20px', borderTop:'1px solid var(--border)' }}>
                        <div style={{ background:'rgba(255,255,255,0.03)', borderRadius:8, padding:'12px 16px', margin:'12px 0' }}>
                          <div style={{ fontSize:11, color:'var(--muted)', fontWeight:600, marginBottom:6 }}>ENONCE</div>
                          <p style={{ fontSize:13, color:'var(--text2)', lineHeight:1.7, margin:0 }}>{ex.enonce}</p>
                        </div>
                        <div style={{ background:`${color}10`, border:`1px solid ${color}25`, borderRadius:8, padding:'12px 16px' }}>
                          <div style={{ fontSize:11, color, fontWeight:700, marginBottom:6 }}>CORRECTION</div>
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

          <div style={{ background:'rgba(79,110,247,0.07)', border:'1px solid rgba(79,110,247,0.2)', borderRadius:14, padding:'20px 24px', marginBottom:40, display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:12 }}>
            <div>
              <div style={{ fontWeight:700, marginBottom:4 }}>🤖 Besoin d'aide sur un exercice ?</div>
              <div style={{ fontSize:13, color:'var(--muted)' }}>Le solveur IA resout pas a pas vos exercices de Seconde</div>
            </div>
            <Link href={`/solve?q=${encodeURIComponent('Maths Seconde ' + ch.titre)}`} className="btn btn-primary btn-sm">
              Resoudre un exercice →
            </Link>
          </div>

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
                style={{ display:'flex', alignItems:'center', gap:8, padding:'12px 18px', borderRadius:10, border:`1px solid ${color}40`, background:`${color}10`, color, textDecoration:'none', fontSize:13, fontWeight:600 }}>
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
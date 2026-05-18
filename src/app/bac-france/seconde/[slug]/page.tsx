'use client'
import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import { useParams } from 'next/navigation'

// ══════════════════════════════════════════════════════════════════════
// SECONDE GÉNÉRALE / [SLUG]
// Route : /bac-france/seconde/[slug]
// Programme officiel EN · 13 chapitres · 4h/semaine
// Structure : souschapitres + blocs
// ══════════════════════════════════════════════════════════════════════

const C = { thm:'#4f6ef7', def:'#06d6a0', formule:'#f59e0b', prop:'#8b5cf6', methode:'#ec4899', corollaire:'#f97316' }
const L: Record<string,string> = { thm:'Théorème', def:'Définition', formule:'Formule clé', prop:'Propriété', methode:'Méthode', corollaire:'Corollaire' }

const NAV_ORDER = [
  'python-algorithmique','nombres-calculs','intervalles-inequations','calcul-litteral',
  'geometrie-non-reperee','vecteurs-repere','droites-systemes',
  'fonctions-generalites','variations-extremums','signe-fonction',
  'proportions-evolutions','statistiques-descriptives','probabilites-echantillonnage',
]
const TITRES_NAV: Record<string,string> = {
  'python-algorithmique':         'CH 01 — Algorithmique & Python',
  'nombres-calculs':              'CH 02 — Nombres & Calculs',
  'intervalles-inequations':      'CH 03 — Intervalles & Inéquations',
  'calcul-litteral':              'CH 04 — Calcul Littéral',
  'geometrie-non-reperee':        'CH 05 — Géométrie & Vecteurs',
  'vecteurs-repere':              'CH 06 — Vecteurs & Repère',
  'droites-systemes':             'CH 07 — Droites & Systèmes',
  'fonctions-generalites':        'CH 08 — Fonctions — Généralités',
  'variations-extremums':         'CH 09 — Variations & Extremums',
  'signe-fonction':               "CH 10 — Signe d'une Fonction",
  'proportions-evolutions':       'CH 11 — Proportions & Évolutions',
  'statistiques-descriptives':    'CH 12 — Statistiques Descriptives',
  'probabilites-echantillonnage': 'CH 13 — Probabilités & Échantillonnage',
}
const SEC_COLORS: Record<string,string> = {
  'python-algorithmique':'#06d6a0','nombres-calculs':'#4f6ef7','intervalles-inequations':'#f59e0b',
  'calcul-litteral':'#8b5cf6','geometrie-non-reperee':'#ec4899','vecteurs-repere':'#06b6d4',
  'droites-systemes':'#f97316','fonctions-generalites':'#10b981','variations-extremums':'#4f6ef7',
  'signe-fonction':'#8b5cf6','proportions-evolutions':'#06b6d4','statistiques-descriptives':'#f59e0b',
  'probabilites-echantillonnage':'#ec4899',
}

type Thm  = { id:string; type:string; nom:string; enonce:string; remarque?:string }
type Exo  = { id:string; niveau:string; titre:string; enonce:string; correction:string }
type Bloc = { notion:string; theoremes:Thm[]; exercices:Exo[] }
type SC   = { id:string; titre:string; notions:string[]; blocs:Bloc[] }
type Chap = { id:string; titre:string; badge:string; color:string; emoji:string; desc:string; souschapitres:SC[] }

// ══════════════════════════════════════════════════════════════════════
// DONNÉES — 13 CHAPITRES
// ══════════════════════════════════════════════════════════════════════
const ALL_CHAPTERS: Record<string,Chap> = {

// ─────────────────────────────────────────────────────────────────────
// CH 01 — ALGORITHMIQUE & PYTHON
// ─────────────────────────────────────────────────────────────────────
'python-algorithmique': {
  id:'python-algorithmique', emoji:'🐍', badge:'Informatique', color:'#06d6a0',
  titre:'Algorithmique & Python',
  desc:"Variables, conditions, fonctions, boucles for/while. Premiers algorithmes : calculs, tests, boucles imbriquées.",
  souschapitres:[
    {
      id:'sc-py-bases', titre:'1.1 Variables, conditions et fonctions',
      notions:['Variable : nom, valeur, type (int, float, str, bool)','Affectation x=5','if/elif/else','def f(x): return ...'],
      blocs:[
        {
          notion:'🐍 Bases de Python',
          theoremes:[
            { id:'M-PY1', type:'methode', nom:'Variables et types de base',
              enonce:"VARIABLES ET AFFECTATION :\nx = 5          # entier (int)\ny = 3.14       # décimal (float)\ns = 'bonjour'  # chaîne (str)\nb = True       # booléen (bool)\n\nOPÉRATIONS :\n+  −  *  /     # opérations classiques\n//             # division entière\n%              # reste (modulo)\n**             # puissance\n\nTYPE d'une variable : type(x)\nCONVERSION : int('5')=5 ; float(3)=3.0 ; str(5)='5'" },
            { id:'M-PY2', type:'methode', nom:'Conditions et fonctions',
              enonce:"CONDITIONS :\nif condition:\n    instruction\nelif autre_condition:\n    instruction\nelse:\n    instruction\n\nOpérateurs : == != < > <= >= and or not\n\nFONCTIONS :\ndef ma_fonction(parametre):\n    # corps de la fonction\n    return resultat\n\nAppel : resultat = ma_fonction(5)\n\nExemple — max de deux nombres :\ndef maxi(a, b):\n    if a >= b:\n        return a\n    else:\n        return b" },
          ],
          exercices:[
            { id:'EX-PY1', niveau:'Facile', titre:'Calculer un carré',
              enonce:"Écrire une fonction carre(x) qui retourne x².",
              correction:"def carre(x):\n    return x**2\n\ncarre(5)  # → 25" },
            { id:'EX-PY2', niveau:'Facile', titre:'Pair ou impair',
              enonce:"Écrire une fonction pair(n) qui retourne True si n est pair.",
              correction:"def pair(n):\n    return n % 2 == 0" },
          ]
        },
      ]
    },
    {
      id:'sc-boucles', titre:'1.2 Boucles for et while',
      notions:['for i in range(n): répéter n fois','while condition: tant que','Accumulateur : somme, compteur','Algorithme de seuil'],
      blocs:[
        {
          notion:'🔄 Boucles et algorithmes',
          theoremes:[
            { id:'M-PY3', type:'methode', nom:'Boucles for et while',
              enonce:"BOUCLE FOR (nombre d'itérations connu) :\nfor i in range(n):      # i de 0 à n−1\n    instruction\nfor i in range(a,b):    # i de a à b−1\n    instruction\nfor i in range(a,b,p):  # i de a à b−1 par pas p\n\nEXEMPLE — Somme des entiers de 1 à n :\ndef somme(n):\n    s = 0\n    for i in range(1, n+1):\n        s += i\n    return s\n\nBOUCLE WHILE (condition d'arrêt) :\nwhile condition:\n    instruction\n\nEXEMPLE — Seuil : premier n tel que 2ⁿ>1000 :\nn = 0\nwhile 2**n <= 1000:\n    n += 1\nprint(n)  # → 10" },
          ],
          exercices:[
            { id:'EX-PY3', niveau:'Facile', titre:'Somme des carrés',
              enonce:"Calculer 1²+2²+…+10² avec une boucle for.",
              correction:"s = 0\nfor i in range(1, 11):\n    s += i**2\nprint(s)  # → 385" },
            { id:'EX-PY4', niveau:'Intermédiaire', titre:'Algorithme de seuil',
              enonce:"Trouver le plus petit n tel que 3ⁿ>10000.",
              correction:"n = 0\nwhile 3**n <= 10000:\n    n += 1\nprint(n)  # → 9  (car 3⁹=19683)" },
          ]
        },
      ]
    },
  ]
},

// ─────────────────────────────────────────────────────────────────────
// CH 02 — NOMBRES & CALCULS
// ─────────────────────────────────────────────────────────────────────
'nombres-calculs': {
  id:'nombres-calculs', emoji:'ℕ', badge:'Algèbre', color:'#4f6ef7',
  titre:'Nombres & Calculs',
  desc:"Ensembles de nombres (ℕ,ℤ,ℚ,ℝ), puissances et racines carrées, PGCD, règles de divisibilité, développements décimaux.",
  souschapitres:[
    {
      id:'sc-ensembles', titre:'2.1 Ensembles de nombres et puissances',
      notions:['ℕ⊂ℤ⊂ℚ⊂ℝ','aⁿ×aᵐ=aⁿ⁺ᵐ ; (aⁿ)ᵐ=aⁿᵐ','√a≥0 ; (√a)²=a ; √(a²)=|a|','Écriture scientifique a×10ⁿ'],
      blocs:[
        {
          notion:'🔢 Nombres et puissances',
          theoremes:[
            { id:'D-NC1', type:'def', nom:'Ensembles de nombres',
              enonce:"ℕ = {0,1,2,3,…}  (entiers naturels)\nℤ = {…,−2,−1,0,1,2,…}  (relatifs)\nℚ = {p/q : p∈ℤ, q∈ℕ*}  (rationnels)\nℝ = droite numérique  (réels)\n\nℕ⊂ℤ⊂ℚ⊂ℝ\n\nIRRATIONNELS : √2, π, e… ∈ℝ\\ℚ\n\nEXPRESSION DÉCIMALE :\nRationnel ↔ développement décimal fini ou périodique\n1/3=0,333… ; 1/7=0,142857142857…" },
            { id:'F-NC1', type:'formule', nom:'Règles des puissances',
              enonce:"aⁿ×aᵐ = aⁿ⁺ᵐ\naⁿ/aᵐ = aⁿ⁻ᵐ  (a≠0)\n(aⁿ)ᵐ = aⁿˣᵐ\n(ab)ⁿ = aⁿ×bⁿ\na⁰ = 1  (a≠0)\na⁻ⁿ = 1/aⁿ\n\nRACINE CARRÉE (a≥0) :\n√a ≥ 0 et (√a)² = a\n√(a²) = |a|\n√(ab) = √a×√b\n√(a/b) = √a/√b\n√a×√b = √(ab)\n\nÉCRITURE SCIENTIFIQUE : a×10ⁿ avec 1≤|a|<10",
              remarque:"Ne pas écrire √(a²)=a : c'est FAUX si a<0. Toujours écrire √(a²)=|a|." },
          ],
          exercices:[
            { id:'EX-NC1', niveau:'Facile', titre:'Simplifier des puissances',
              enonce:"Simplifier : 2³×2⁴ et (3²)³ et 10⁻² .",
              correction:"2³×2⁴=2⁷=128.\n(3²)³=3⁶=729.\n10⁻²=0,01." },
            { id:'EX-NC2', niveau:'Intermédiaire', titre:'Racines carrées',
              enonce:"Simplifier √50, √(a²b²) et rationaliser 3/√2.",
              correction:"√50=√(25×2)=5√2.\n√(a²b²)=|a||b|.\n3/√2=3√2/2." },
          ]
        },
      ]
    },
  ]
},

// ─────────────────────────────────────────────────────────────────────
// CH 03 — INTERVALLES, INÉGALITÉS & INÉQUATIONS
// ─────────────────────────────────────────────────────────────────────
'intervalles-inequations': {
  id:'intervalles-inequations', emoji:'≤', badge:'Algèbre', color:'#f59e0b',
  titre:'Intervalles, Inégalités & Inéquations',
  desc:"Notations d'intervalles, propriétés des inégalités, valeur absolue, résolution d'inéquations du premier degré.",
  souschapitres:[
    {
      id:'sc-ineg', titre:'3.1 Inégalités et intervalles',
      notions:['[a;b], ]a;b[, [a;+∞[','a≤b et c≤d → a+c≤b+d','a≤b et λ>0 → λa≤λb','a≤b et λ<0 → λa≥λb (INVERSER)'],
      blocs:[
        {
          notion:'≤ Intervalles et inégalités',
          theoremes:[
            { id:'D-II1', type:'def', nom:'Notations d\'intervalles',
              enonce:"[a;b] = {x∈ℝ : a≤x≤b}  (fermé)\n]a;b[ = {x∈ℝ : a<x<b}  (ouvert)\n[a;b[ = {x∈ℝ : a≤x<b}  (semi-ouvert)\n\n[a;+∞[ = {x∈ℝ : x≥a}\n]−∞;b] = {x∈ℝ : x≤b}\n\nINTERSECTION ET UNION :\n[1;4]∩[2;6]=[2;4]\n[1;4]∪[2;6]=[1;6]" },
            { id:'P-II1', type:'prop', nom:'Propriétés des inégalités',
              enonce:"Si a≤b :\na+c ≤ b+c  (ajouter la même chose)\na−c ≤ b−c\n\nλ>0 : λa ≤ λb  (multiplier par positif : même sens)\nλ<0 : λa ≥ λb  ← ATTENTION : INVERSION du sens !\n\n⚠️ Diviser par un négatif → inverser le signe !\n−2x ≤ 6 ↔ x ≥ −3\n\nTRANSITIVITÉ : a≤b et b≤c → a≤c",
              remarque:"L'erreur la plus fréquente en Seconde : oublier d'inverser le sens en multipliant par un nombre négatif." },
            { id:'D-II2', type:'def', nom:'Valeur absolue',
              enonce:"|x| = x si x≥0 ; |x| = −x si x<0\n\n|x| = distance entre x et 0 sur la droite réelle\n\nPROPRIÉTÉS :\n|x|≥0 ; |x|=0 ↔ x=0\n|xy|=|x||y|\n|x/y|=|x|/|y|  (y≠0)\n|x+y|≤|x|+|y|  (inégalité triangulaire)\n\nRÉSOLUTIONS :\n|x|≤a ↔ −a≤x≤a ↔ x∈[−a;a]\n|x|≥a ↔ x≤−a ou x≥a ↔ x∈]−∞;−a]∪[a;+∞[" },
          ],
          exercices:[
            { id:'EX-II1', niveau:'Facile', titre:'Résoudre une inéquation',
              enonce:"Résoudre 3x−5>7.",
              correction:"3x>12 → x>4. Solution : ]4;+∞[." },
            { id:'EX-II2', niveau:'Intermédiaire', titre:'Inéquation avec négatif',
              enonce:"Résoudre −2x+6≤10.",
              correction:"−2x≤4 → x≥−2 (inversion !). Solution : [−2;+∞[." },
            { id:'EX-II3', niveau:'Intermédiaire', titre:'Valeur absolue',
              enonce:"Résoudre |2x−3|≤5.",
              correction:"−5≤2x−3≤5 → −2≤2x≤8 → −1≤x≤4. Solution : [−1;4]." },
          ]
        },
      ]
    },
  ]
},

// ─────────────────────────────────────────────────────────────────────
// CH 04 — CALCUL LITTÉRAL
// ─────────────────────────────────────────────────────────────────────
'calcul-litteral': {
  id:'calcul-litteral', emoji:'(a+b)', badge:'Algèbre', color:'#8b5cf6',
  titre:'Calcul Littéral',
  desc:"Identités remarquables, développement, factorisation, produit nul, équations du second degré par factorisation.",
  souschapitres:[
    {
      id:'sc-cl-ir', titre:'4.1 Identités remarquables et factorisation',
      notions:['(a+b)²=a²+2ab+b²','(a−b)²=a²−2ab+b²','(a+b)(a−b)=a²−b²','Produit nul : AB=0 ↔ A=0 ou B=0'],
      blocs:[
        {
          notion:'📐 Identités remarquables',
          theoremes:[
            { id:'F-CL1', type:'formule', nom:'Identités remarquables',
              enonce:"(a+b)² = a²+2ab+b²\n(a−b)² = a²−2ab+b²\n(a+b)(a−b) = a²−b²\n\nUTILISATION :\nDévelopper : remplacer par le produit\nFactoriser : reconnaître la forme factorisée\n\nExemples :\n(x+3)²=x²+6x+9\n(2x−1)²=4x²−4x+1\n(x+4)(x−4)=x²−16\n\nFACTORISATION :\nx²−6x+9=(x−3)²\n4x²−9=(2x−3)(2x+3)" },
            { id:'T-CL1', type:'thm', nom:'Produit nul',
              enonce:"A×B = 0  ↔  A=0  ou  B=0\n\nPERMET DE RÉSOUDRE :\n(x−2)(x+5)=0 ↔ x=2 ou x=−5\n\nMÉTHODE générale :\n1. Mettre à 0 : f(x)=0\n2. Factoriser\n3. Appliquer le produit nul\n\nExemple : x²−5x+6=0\nDelta ou factoriser : (x−2)(x−3)=0\n→ x=2 ou x=3",
              remarque:"Le produit nul est la clé de la résolution d'équations factorisées. Vérifier que le membre de droite est 0 avant d'appliquer !" },
          ],
          exercices:[
            { id:'EX-CL1', niveau:'Facile', titre:'Développer',
              enonce:"Développer (3x−2)² et (x+7)(x−7).",
              correction:"(3x−2)²=9x²−12x+4.\n(x+7)(x−7)=x²−49." },
            { id:'EX-CL2', niveau:'Intermédiaire', titre:'Factoriser',
              enonce:"Factoriser x²−4x+4 et 9x²−25.",
              correction:"x²−4x+4=(x−2)².\n9x²−25=(3x−5)(3x+5)." },
            { id:'EX-CL3', niveau:'Intermédiaire', titre:'Équation par produit nul',
              enonce:"Résoudre (2x+1)(x−3)=0.",
              correction:"2x+1=0 → x=−1/2 ou x−3=0 → x=3.\nS={−1/2; 3}." },
          ]
        },
      ]
    },
  ]
},

// ─────────────────────────────────────────────────────────────────────
// CH 05 — GÉOMÉTRIE NON REPÉRÉE & VECTEURS
// ─────────────────────────────────────────────────────────────────────
'geometrie-non-reperee': {
  id:'geometrie-non-reperee', emoji:'→', badge:'Géométrie', color:'#ec4899',
  titre:'Géométrie & Vecteurs',
  desc:"Vecteurs (définition, addition, soustraction, multiplication par scalaire), relation de Chasles, colinéarité, théorèmes de Thalès et Pythagore.",
  souschapitres:[
    {
      id:'sc-vect-def', titre:'5.1 Vecteurs : définition et opérations',
      notions:['Vecteur u⃗ : direction, sens, norme','Addition u⃗+v⃗ (règle du parallélogramme)','Chasles : AB⃗+BC⃗=AC⃗','Colinéarité : u⃗=λv⃗'],
      blocs:[
        {
          notion:'→ Vecteurs',
          theoremes:[
            { id:'D-GV1', type:'def', nom:'Vecteurs — définition et opérations',
              enonce:"VECTEUR AB⃗ : \n• Direction : droite (AB)\n• Sens : de A vers B\n• Norme : |AB⃗|=AB (longueur)\n\nDeux vecteurs ÉGAUX si même direction, sens et norme.\nVecteur nul 0⃗ : norme nulle.\nVecteur opposé : BA⃗=−AB⃗\n\nADDITION (règle du parallélogramme ou chaîne) :\nu⃗+v⃗ = diagonale du parallélogramme\nAB⃗+AC⃗ = AD⃗ (D 4e sommet)\n\nMULTIPLICATION PAR UN SCALAIRE :\nλu⃗ : même direction ; sens selon signe(λ) ; norme |λ||u⃗|" },
            { id:'T-GV1', type:'thm', nom:'Relation de Chasles',
              enonce:"Pour tous points A,B,C :\nAB⃗ + BC⃗ = AC⃗\n\nConséquences :\nAA⃗ = 0⃗\nAB⃗ = −BA⃗\nAB⃗ = AC⃗ + CB⃗  (ou toute décomposition)\n\nCOLINÉARITÉ :\nu⃗ et v⃗ colinéaires ↔ ∃λ∈ℝ : u⃗=λv⃗\n→ Points A,B,C alignés ↔ AB⃗ et AC⃗ colinéaires" },
            { id:'T-GV2', type:'thm', nom:'Théorème de Thalès',
              enonce:"Droites (BC) et (B'C') parallèles, sécantes à (AB) et (AC) :\nAB'/AB = AC'/AC = B'C'/BC\n(et réciproquement : si les rapports sont égaux → parallèles)\n\nThéorème de PYTHAGORE :\nABC rectangle en A : BC²=AB²+AC²\n(Réciproque : BC²=AB²+AC² → angle A droit)\n\nCORRECTION : médiane/médiatrice/bissectrice :\nMédiatrice de [AB] : ensemble des points équidistants de A et B." },
          ],
          exercices:[
            { id:'EX-GV1', niveau:'Facile', titre:'Relation de Chasles',
              enonce:"Simplifier AB⃗+BC⃗+CD⃗+DA⃗.",
              correction:"=AC⃗+CD⃗+DA⃗=AD⃗+DA⃗=0⃗." },
            { id:'EX-GV2', niveau:'Intermédiaire', titre:'Thalès',
              enonce:"Droites (MN)∥(BC). AM=3, AB=8, AN=5. Calculer AC.",
              correction:"AM/AB=AC'/AC ... utiliser Thalès :\nAM/AB=AN/AC → 3/8=5/AC → AC=40/3≈13,3." },
          ]
        },
      ]
    },
  ]
},

// ─────────────────────────────────────────────────────────────────────
// CH 06 — VECTEURS & REPÈRE
// ─────────────────────────────────────────────────────────────────────
'vecteurs-repere': {
  id:'vecteurs-repere', emoji:'📍', badge:'Géométrie', color:'#06b6d4',
  titre:'Vecteurs & Repère',
  desc:"Repère orthonormé, coordonnées d'un vecteur, milieu, distance, norme, déterminant pour la colinéarité.",
  souschapitres:[
    {
      id:'sc-vr-coord', titre:'6.1 Coordonnées, milieu et distance',
      notions:['Repère (O;i⃗;j⃗) : M(x;y)','AB⃗=(xB−xA ; yB−yA)','Milieu M=((xA+xB)/2 ; (yA+yB)/2)','Distance AB=√((xB−xA)²+(yB−yA)²)'],
      blocs:[
        {
          notion:'📍 Coordonnées dans le repère',
          theoremes:[
            { id:'F-VR1', type:'formule', nom:'Opérations sur les vecteurs en coordonnées',
              enonce:"Repère (O;i⃗;j⃗)\nPoint A(xA;yA) : M=xA·i⃗+yA·j⃗\n\nVECTEUR AB⃗ = (xB−xA ; yB−yA)\n\nADDITION :\nu⃗(a;b)+v⃗(c;d)=(a+c ; b+d)\n\nMULTIPLICATION :\nλ·u⃗(a;b)=(λa ; λb)\n\nNORME :\n|u⃗(a;b)|=√(a²+b²)\n\nMILIEU de [AB] :\nM=((xA+xB)/2 ; (yA+yB)/2)\n\nDISTANCE :\nAB=√((xB−xA)²+(yB−yA)²)" },
            { id:'F-VR2', type:'formule', nom:'Déterminant et colinéarité',
              enonce:"Déterminant de u⃗(a;b) et v⃗(c;d) :\ndet(u⃗,v⃗) = ad−bc\n\nu⃗ et v⃗ COLINÉAIRES ↔ det(u⃗,v⃗)=0 ↔ ad−bc=0\nA,B,C ALIGNÉS ↔ det(AB⃗,AC⃗)=0\n\nCONDITION DE PARALLÉLISME :\nd₁ de direction u⃗, d₂ de direction v⃗ :\nd₁∥d₂ ↔ u⃗ et v⃗ colinéaires ↔ det(u⃗,v⃗)=0",
              remarque:"Le déterminant est aussi lié à l'aire : |det(AB⃗,AC⃗)|/2 = aire du triangle ABC." },
          ],
          exercices:[
            { id:'EX-VR1', niveau:'Facile', titre:'Coordonnées et milieu',
              enonce:"A(1;3), B(5;−1). Calculer AB⃗, |AB⃗| et milieu de [AB].",
              correction:"AB⃗=(4;−4). |AB⃗|=√(16+16)=4√2.\nMilieu M=(3;1)." },
            { id:'EX-VR2', niveau:'Intermédiaire', titre:'Alignement par déterminant',
              enonce:"A(0;1), B(2;3), C(4;5). Vérifier l'alignement.",
              correction:"AB⃗=(2;2), AC⃗=(4;4).\ndet=2×4−2×4=8−8=0 → alignés." },
          ]
        },
      ]
    },
  ]
},

// ─────────────────────────────────────────────────────────────────────
// CH 07 — DROITES DU PLAN & SYSTÈMES
// ─────────────────────────────────────────────────────────────────────
'droites-systemes': {
  id:'droites-systemes', emoji:'/', badge:'Géométrie', color:'#f97316',
  titre:'Droites du Plan & Systèmes',
  desc:"Équations de droite (réduite, cartésienne), pente, positions relatives, systèmes de 2 équations à 2 inconnues (substitution, combinaison).",
  souschapitres:[
    {
      id:'sc-droites', titre:'7.1 Équations de droite et positions relatives',
      notions:['Réduite y=mx+p (m pente, p ordonnée à l\'origine)','Cartésienne ax+by+c=0','Droites parallèles : même pente m','Droites perpendiculaires : m×m\'=−1'],
      blocs:[
        {
          notion:'📏 Droites dans le plan',
          theoremes:[
            { id:'F-DR1', type:'formule', nom:'Équations de droite',
              enonce:"FORME RÉDUITE : y=mx+p\nm : coefficient directeur (pente)\np : ordonnée à l'origine\n\nDROITE PAR A(x₀;y₀) de pente m :\ny−y₀ = m(x−x₀)\n\nDROITE PAR A(x₁;y₁) ET B(x₂;y₂) :\nm=(y₂−y₁)/(x₂−x₁)  (si x₁≠x₂)\n\nFORME CARTÉSIENNE : ax+by+c=0\nVecteur directeur u⃗(b;−a)\nVecteur normal n⃗(a;b)\n\nDROITE VERTICALE : x=k (pas de forme réduite)" },
            { id:'P-DR1', type:'prop', nom:'Positions relatives',
              enonce:"DROITES NON VERTICALES de pentes m₁ et m₂ :\n\nParallèles (non confondues) :\nm₁=m₂ et p₁≠p₂\n\nSécantes (intersection unique) :\nm₁≠m₂\n→ Résoudre le système pour trouver le point\n\nCONFONDUES :\nm₁=m₂ et p₁=p₂\n\nPERPENDICULAIRES :\nm₁×m₂=−1\n(ou m₁=0 et l'autre verticale)" },
          ],
          exercices:[
            { id:'EX-DR1', niveau:'Facile', titre:'Équation de droite',
              enonce:"Droite par A(2;5) de pente m=3. Équation.",
              correction:"y−5=3(x−2) → y=3x−1." },
            { id:'EX-DR2', niveau:'Intermédiaire', titre:'Positions relatives',
              enonce:"y=2x+3 et y=2x−5 : parallèles ou sécantes ?",
              correction:"Mêmes pentes (m=2), ordonnées différentes (3≠−5) → Parallèles." },
          ]
        },
      ]
    },
    {
      id:'sc-systemes', titre:'7.2 Systèmes de deux équations',
      notions:['Substitution : exprimer une variable puis remplacer','Combinaison (élimination) : ajouter les équations','Solution unique, infinité, ou pas de solution','Interprétation graphique'],
      blocs:[
        {
          notion:'⚙️ Résolution de systèmes',
          theoremes:[
            { id:'M-DR1', type:'methode', nom:'Méthodes de résolution',
              enonce:"SYSTÈME 2×2 :\n{ ax+by=e  (équation 1)\n{ cx+dy=f  (équation 2)\n\nMÉTHODE 1 — SUBSTITUTION :\n1. Exprimer x (ou y) d'une équation\n2. Substituer dans l'autre\n3. Résoudre en y (ou x)\n4. Retrouver la première inconnue\n\nMÉTHODE 2 — COMBINAISON :\n1. Multiplier les équations pour éliminer une variable\n2. Additionner les équations\n3. Résoudre\n\nINTERPRÉTATION GRAPHIQUE :\nSolution unique ↔ droites sécantes\nPas de solution ↔ droites parallèles\nInfinité ↔ droites confondues",
              remarque:"Toujours vérifier la solution en substituant dans les deux équations originales." },
          ],
          exercices:[
            { id:'EX-DR3', niveau:'Facile', titre:'Substitution',
              enonce:"Résoudre : {y=2x+1 ; 3x+y=16}.",
              correction:"3x+(2x+1)=16 → 5x=15 → x=3.\ny=7. Solution (3;7)." },
            { id:'EX-DR4', niveau:'Intermédiaire', titre:'Combinaison',
              enonce:"Résoudre : {2x+3y=7 ; 5x−y=9}.",
              correction:"Multiplier la 2e par 3 : 15x−3y=27.\nAdditionner : 17x=34 → x=2.\ny=(7−4)/3=1. Solution (2;1)." },
          ]
        },
      ]
    },
  ]
},

// ─────────────────────────────────────────────────────────────────────
// CH 08 — FONCTIONS : GÉNÉRALITÉS
// ─────────────────────────────────────────────────────────────────────
'fonctions-generalites': {
  id:'fonctions-generalites', emoji:'f(x)', badge:'Fonctions', color:'#10b981',
  titre:'Fonctions — Généralités',
  desc:"Image, antécédent, domaine de définition, parité, fonctions de référence (constante, affine, carré, racine, inverse), représentation graphique.",
  souschapitres:[
    {
      id:'sc-fg-def', titre:'8.1 Définitions et fonctions de référence',
      notions:['Image f(a), antécédent(s) de b','Domaine D_f','Lecture graphique','Fonctions de référence : x, x², √x, 1/x'],
      blocs:[
        {
          notion:'📊 Fonctions et représentations',
          theoremes:[
            { id:'D-FG1', type:'def', nom:'Fonction et vocabulaire',
              enonce:"Fonction f de D vers ℝ : à chaque x∈D associe un unique f(x)\n\nIMAGE de a par f : f(a)\nANTÉCÉDENT de b par f : x tel que f(x)=b\n(peut ne pas exister ou ne pas être unique)\n\nDOMAINE D_f : ensemble des x pour lesquels f(x) est définie\n\nREPRÉSENTATION GRAPHIQUE :\nC_f = {(x ; f(x)) : x∈D_f}\n\nLECTURE GRAPHIQUE :\nImage de a = ordonnée du point d'abscisse a\nAntécédent de b = abscisse(s) des points d'ordonnée b" },
            { id:'F-FG1', type:'formule', nom:'Fonctions de référence',
              enonce:"CONSTANTE f(x)=c : droite horizontale\nAFFINE f(x)=mx+p : droite de pente m\n\nCARRÉ f(x)=x² : parabole, paire, min en 0\n• Croissante sur [0;+∞[, décroissante sur ]−∞;0]\n\nRACINE f(x)=√x : D=[0;+∞[, croissante\n• (√x)²=x ; √(x²)=|x|\n\nINVERSE f(x)=1/x : D=ℝ\\{0}\n• Décroissante sur ]−∞;0[ et sur ]0;+∞[\n• Asymptotes x=0 et y=0",
              remarque:"Ces fonctions de référence sont la base. En Première, on ajoutera eˣ et sin/cos." },
          ],
          exercices:[
            { id:'EX-FG1', niveau:'Facile', titre:'Image et antécédent',
              enonce:"f(x)=x²−3. Image de 4. Antécédent(s) de 6.",
              correction:"f(4)=16−3=13.\nf(x)=6 → x²=9 → x=3 ou x=−3." },
          ]
        },
      ]
    },
  ]
},

// ─────────────────────────────────────────────────────────────────────
// CH 09 — VARIATIONS & EXTREMUMS
// ─────────────────────────────────────────────────────────────────────
'variations-extremums': {
  id:'variations-extremums', emoji:'↗', badge:'Fonctions', color:'#4f6ef7',
  titre:'Variations & Extremums',
  desc:"Fonction croissante/décroissante, tableau de variations, lecture graphique, extremums locaux et globaux.",
  souschapitres:[
    {
      id:'sc-var-def', titre:'9.1 Monotonie et tableaux de variations',
      notions:['f croissante : x₁<x₂ → f(x₁)<f(x₂)','f décroissante : x₁<x₂ → f(x₁)>f(x₂)','Tableau de variations','Extremum global/local'],
      blocs:[
        {
          notion:'📈 Variations et extremums',
          theoremes:[
            { id:'D-VA1', type:'def', nom:'Fonctions monotones et extremums',
              enonce:"f CROISSANTE sur I :\n∀x₁,x₂∈I : x₁<x₂ → f(x₁)<f(x₂)\n(quand x augmente, f(x) augmente)\n\nf DÉCROISSANTE sur I :\n∀x₁,x₂∈I : x₁<x₂ → f(x₁)>f(x₂)\n\nTABLEAU DE VARIATIONS :\nx  | a      b      c\nf  | ↗  f(b)  ↘  f(c)\n   |  f(a)          \n\nEXTREMUM LOCAL en b :\nf(b) est un maximum local si f(b)≥f(x) autour de b\nf(b) est un minimum local si f(b)≤f(x) autour de b\n\nEXTREMUM GLOBAL : comparer tous les extrema locaux + valeurs aux bornes" },
            { id:'M-VA1', type:'methode', nom:'Lecture graphique des variations',
              enonce:"Sur la courbe C_f :\n→ croissante = la courbe monte de gauche à droite\n→ décroissante = la courbe descend\n\nLire un maximum : point le plus haut localement\nLire un minimum : point le plus bas localement\n\nLire f(a)=b : point d'abscisse a sur C_f, ordonnée b\nLire les antécédents de b : points d'ordonnée b sur C_f\n\nREMARQUE : une fonction peut être croissante sans être dérivable (cas Seconde : tableaux de signes sans dérivée)" },
          ],
          exercices:[
            { id:'EX-VA1', niveau:'Facile', titre:'Lecture d\'un tableau',
              enonce:"f : croissante sur [−2;1], décroissante sur [1;4]. f(−2)=0, f(1)=5, f(4)=−1. Maxima et minima sur [−2;4] ?",
              correction:"Max global : f(1)=5.\nMin global : f(4)=−1.\nf(−2)=0 n'est ni min ni max local." },
          ]
        },
      ]
    },
  ]
},

// ─────────────────────────────────────────────────────────────────────
// CH 10 — SIGNE D'UNE FONCTION
// ─────────────────────────────────────────────────────────────────────
'signe-fonction': {
  id:'signe-fonction', emoji:'±', badge:'Fonctions', color:'#8b5cf6',
  titre:"Signe d'une Fonction",
  desc:"Tableau de signes, signe d'un produit, signe d'un quotient, résolution d'inéquations (f(x)≥0, f(x)≤g(x)).",
  souschapitres:[
    {
      id:'sc-signe', titre:'10.1 Tableaux de signes et inéquations',
      notions:['Signe de f : + si f>0, − si f<0','Signe de f×g : règle des signes','Signe de f/g : + si même signe','Résolution de f(x)≥0 par tableau'],
      blocs:[
        {
          notion:'± Tableaux de signes',
          theoremes:[
            { id:'M-SF1', type:'methode', nom:'Dresser un tableau de signes',
              enonce:"1. Trouver les ZÉROS de f (f(x)=0)\n2. Choisir un point test dans chaque intervalle\n3. Calculer le signe en ce point\n4. Remplir le tableau\n\nFORMAT :\nx  | −∞  x₁    x₂  +∞\nf  |  +   0  −   0  +\n\nSIGNE D'UN PRODUIT f×g :\n+ × + = +  ;  + × − = −  ;  − × − = +\n(règle des signes classique)\n\nSIGNE D'UN QUOTIENT f/g :\nMême règle, mais attention aux valeurs interdites de g\n\nRÉSOLUTION de f(x)>0 :\nLire dans le tableau les x où f est positive",
              remarque:"En Seconde, les fonctions à signer sont souvent des polynômes du 1er degré (affines) ou produits d'affines." },
          ],
          exercices:[
            { id:'EX-SF1', niveau:'Facile', titre:'Signe d\'un trinôme',
              enonce:"Signer f(x)=(x−2)(x+3).",
              correction:"Zéros : x=2 et x=−3.\nTableau :\nx | −∞ −3 2 +∞\nf |  +  0 − 0  +\nf(x)>0 pour x<−3 ou x>2." },
            { id:'EX-SF2', niveau:'Intermédiaire', titre:'Inéquation',
              enonce:"Résoudre (x+1)/(x−4)≥0.",
              correction:"Zéros et valeurs interdites : x=−1 (zéro), x=4 (interdit).\nTableau :\nx | −∞ −1 4 +∞\nN |  −  0  +  +\nD |  −  −  | +\nQ |  +  0  |  +\nSolution : x∈]−∞;−1]∪]4;+∞[." },
          ]
        },
      ]
    },
  ]
},

// ─────────────────────────────────────────────────────────────────────
// CH 11 — PROPORTIONS & ÉVOLUTIONS
// ─────────────────────────────────────────────────────────────────────
'proportions-evolutions': {
  id:'proportions-evolutions', emoji:'%', badge:'Stats & Probas', color:'#06b6d4',
  titre:'Proportions & Évolutions',
  desc:"Proportions et pourcentages, taux d'évolution, coefficient multiplicateur, évolutions successives et réciproques.",
  souschapitres:[
    {
      id:'sc-pct', titre:'11.1 Pourcentages et évolutions',
      notions:['p% de N = N×p/100','Taux t% → CM=1+t/100','Évolutions successives : CM=CM₁×CM₂','Évolution réciproque : CM\'=1/CM'],
      blocs:[
        {
          notion:'% Proportions et taux',
          theoremes:[
            { id:'D-PE1', type:'def', nom:'Proportion et taux d\'évolution',
              enonce:"PROPORTION : p=n/N×100\n(n : effectif partiel, N : effectif total)\n\nPOURCENTAGE DE b PAR RAPPORT À a :\nt=(b−a)/a×100\n\nCOEFFICIENT MULTIPLICATEUR :\nHausse de t% → CM=1+t/100\nBaisse de t% → CM=1−t/100\n\nEXEMPLE :\nHausse de 20% → CM=1,20\nBaisse de 15% → CM=0,85\n\nRecalculer la nouvelle valeur :\nValeur finale = valeur initiale × CM" },
            { id:'F-PE1', type:'formule', nom:'Évolutions successives et réciproques',
              enonce:"ÉVOLUTIONS SUCCESSIVES :\nCM_total = CM₁ × CM₂ × … × CMₙ\n⚠️ On ne peut PAS additionner les taux !\n\nÉVOLUTION RÉCIPROQUE (revenir à la valeur initiale) :\nCM' = 1/CM\nt' = (1/CM−1)×100\n\nExemple : hausse de 25% puis retour\nCM=1,25. CM'=1/1,25=0,8 → baisse de 20%\n(et non −25% !)\n\nTAUX MOYEN SUR n PÉRIODES :\nCM_moyen = CM_total^(1/n)",
              remarque:"Erreur classique : +10% puis −10% ≠ retour à la valeur initiale. CM=1,10×0,90=0,99 → baisse de 1%." },
          ],
          exercices:[
            { id:'EX-PE1', niveau:'Facile', titre:'Taux d\'évolution',
              enonce:"Prix passe de 80€ à 92€. Taux d'évolution ?",
              correction:"t=(92−80)/80×100=12/80×100=15%." },
            { id:'EX-PE2', niveau:'Intermédiaire', titre:'Évolution réciproque',
              enonce:"Soldes : −30%. Quel taux pour retrouver le prix initial ?",
              correction:"CM=0,7. CM'=1/0,7≈1,4286 → hausse d'environ 42,9%." },
          ]
        },
      ]
    },
  ]
},

// ─────────────────────────────────────────────────────────────────────
// CH 12 — STATISTIQUES DESCRIPTIVES
// ─────────────────────────────────────────────────────────────────────
'statistiques-descriptives': {
  id:'statistiques-descriptives', emoji:'📊', badge:'Stats & Probas', color:'#f59e0b',
  titre:'Statistiques Descriptives',
  desc:"Moyenne, médiane, quartiles, étendue, variance, écart-type, boîte à moustaches.",
  souschapitres:[
    {
      id:'sc-stats-centre', titre:'12.1 Indicateurs de position et de dispersion',
      notions:['Moyenne x̄=Σxᵢ/n','Médiane : valeur centrale','Quartiles Q1, Q3','Variance σ² et écart-type σ'],
      blocs:[
        {
          notion:'📈 Indicateurs statistiques',
          theoremes:[
            { id:'F-ST1', type:'formule', nom:'Indicateurs de position',
              enonce:"MOYENNE (ou moyenne arithmétique) :\nx̄ = (x₁+x₂+…+xₙ)/n = Σxᵢ/n\n\nSérie avec effectifs :\nx̄ = Σ(nᵢ×xᵢ)/Σnᵢ\n\nMÉDIANE Me :\n→ Valeur qui partage la série en deux moitiés égales\n→ Si n pair : moyenne des deux valeurs centrales\n→ Si n impair : valeur centrale\n\nQUARTILES :\nQ1 : 25% des valeurs en-dessous\nQ3 : 75% des valeurs en-dessous\nÉcart interquartile : Q3−Q1" },
            { id:'F-ST2', type:'formule', nom:'Indicateurs de dispersion',
              enonce:"ÉTENDUE = max − min\n\nVARIANCE :\nσ² = (1/n)Σ(xᵢ−x̄)² = (1/n)Σxᵢ²−x̄²\n\nÉCART-TYPE :\nσ = √σ²  (même unité que les données)\n\nBOÎTE À MOUSTACHES :\n• Moustache gauche : min\n• Bord gauche boîte : Q1\n• Trait central : médiane\n• Bord droit boîte : Q3\n• Moustache droite : max\n\nInterprétation : σ petit → données concentrées près de x̄",
              remarque:"σ=0 signifie toutes les valeurs sont identiques. Plus σ est grand, plus les données sont dispersées." },
          ],
          exercices:[
            { id:'EX-ST1', niveau:'Facile', titre:'Moyenne et écart-type',
              enonce:"Notes : 8, 12, 14, 10, 16. Calculer x̄ et σ.",
              correction:"x̄=60/5=12.\nσ²=(64+144+196+100+256)/5−144=152−144=8.\nσ=√8=2√2≈2,83." },
            { id:'EX-ST2', niveau:'Intermédiaire', titre:'Médiane et quartiles',
              enonce:"Série : 3, 5, 7, 8, 10, 12, 15, 17. Trouver Me, Q1, Q3.",
              correction:"n=8. Me=(8+10)/2=9.\nQ1 : médiane de {3,5,7,8}=(5+7)/2=6.\nQ3 : médiane de {10,12,15,17}=(12+15)/2=13,5." },
          ]
        },
      ]
    },
  ]
},

// ─────────────────────────────────────────────────────────────────────
// CH 13 — PROBABILITÉS & ÉCHANTILLONNAGE
// ─────────────────────────────────────────────────────────────────────
'probabilites-echantillonnage': {
  id:'probabilites-echantillonnage', emoji:'🎲', badge:'Stats & Probas', color:'#ec4899',
  titre:'Probabilités & Échantillonnage',
  desc:"Événements, probabilités (équiprobabilité, addition, complémentaire), intervalle de fluctuation 95%, simulation en Python.",
  souschapitres:[
    {
      id:'sc-proba-base', titre:'13.1 Probabilités — Bases',
      notions:['Univers Ω, événements A⊂Ω','P(Ω)=1, P(∅)=0','P(A∪B)=P(A)+P(B)−P(A∩B)','Équiprobabilité : P(A)=|A|/|Ω|'],
      blocs:[
        {
          notion:'🎲 Probabilités et événements',
          theoremes:[
            { id:'D-PR1', type:'def', nom:'Vocabulaire probabiliste',
              enonce:"EXPÉRIENCE ALÉATOIRE : résultat imprévisible\nΩ : ensemble des résultats possibles (univers)\nÉVÉNEMENT A : sous-ensemble de Ω\n\nAXIOMES :\nP(Ω)=1 ; P(∅)=0 ; 0≤P(A)≤1\nA∩B=∅ → P(A∪B)=P(A)+P(B)\n\nCOMPLÉMENTAIRE Ā=Ω\\A :\nP(Ā)=1−P(A)\n\nFORMULE GÉNÉRALE :\nP(A∪B)=P(A)+P(B)−P(A∩B)\n\nÉQUIPROBABILITÉ :\nP(A)=card(A)/card(Ω)=|A|/|Ω|" },
            { id:'F-PR1', type:'formule', nom:'Intervalle de fluctuation 95%',
              enonce:"Expérience de Bernoulli répétée n fois, probabilité p.\nFréquence observée f dans un échantillon de taille n.\n\nSi n est grand et p connu :\nINTERVALLE DE FLUCTUATION (niveau 95%) :\nI = [p − 1/√n ; p + 1/√n]\n\nInterprétation : 95% des échantillons de taille n auront une fréquence f dans I.\n\nTEST :\nSi f∉I → résultat anormal (p suspect)\nSi f∈I → résultat compatible avec p\n\nCONDITIONS : n≥30, np≥5, n(1−p)≥5",
              remarque:"En Seconde, on utilise l'intervalle [p−1/√n;p+1/√n] comme approximation simple du vrai intervalle de fluctuation." },
          ],
          exercices:[
            { id:'EX-PR1', niveau:'Facile', titre:'Équiprobabilité',
              enonce:"Dé équilibré. P(nombre pair) et P(multiple de 3).",
              correction:"P(pair)=3/6=1/2.\nP(mult. 3)={3,6}→2/6=1/3." },
            { id:'EX-PR2', niveau:'Intermédiaire', titre:'Intervalle de fluctuation',
              enonce:"Pièce équilibrée (p=0,5). On lance 400 fois. Sur 400, on obtient 220 faces. Anormal ?",
              correction:"I=[0,5−1/20;0,5+1/20]=[0,45;0,55].\nf=220/400=0,55∈[0,45;0,55] ✓ → compatible." },
            { id:'EX-PR3', niveau:'Intermédiaire', titre:'Simulation Python',
              enonce:"Simuler 1000 lancers d'un dé et estimer P(6).",
              correction:"import random\nn = 1000\ncount = sum(1 for _ in range(n) if random.randint(1,6)==6)\nprint(count/n)  # ≈ 0.167 (théorique 1/6)" },
          ]
        },
      ]
    },
  ]
},

} // fin ALL_CHAPTERS

// ══════════════════════════════════════════════════════════════════════
// UI HELPERS
// ══════════════════════════════════════════════════════════════════════
function TypeBadge({ type }: { type: string }) {
  const color = C[type as keyof typeof C] || C.def
  return (
    <span style={{ fontSize:10, padding:'2px 10px', borderRadius:20, fontWeight:700,
      background:`${color}20`, color, whiteSpace:'nowrap' }}>
      {L[type] || type}
    </span>
  )
}
function NiveauBadge({ niveau }: { niveau: string }) {
  const cfg = niveau==='Facile'
    ? { bg:'rgba(6,214,160,0.15)', color:'#06d6a0' }
    : niveau==='Difficile'
    ? { bg:'rgba(239,68,68,0.15)', color:'#ef4444' }
    : { bg:'rgba(245,158,11,0.15)', color:'#f59e0b' }
  return <span style={{ fontSize:10, padding:'2px 8px', borderRadius:10, fontWeight:600,
    background:cfg.bg, color:cfg.color }}>{niveau}</span>
}

// ══════════════════════════════════════════════════════════════════════
// PAGE
// ══════════════════════════════════════════════════════════════════════
export default function SecondeSlugPage() {
  const params = useParams()
  const slug = (params?.slug as string) || 'python-algorithmique'
  const chapter = ALL_CHAPTERS[slug]
  const [openEx, setOpenEx] = useState<string|null>(null)
  const [openSc, setOpenSc] = useState<string|null>(null)

  if (!chapter) return (
    <><Navbar/>
      <main style={{ paddingTop:80, minHeight:'50vh', display:'flex',
        alignItems:'center', justifyContent:'center' }}>
        <div style={{ textAlign:'center' }}>
          <div style={{ fontSize:48, marginBottom:16 }}>📭</div>
          <h2>Chapitre non trouvé</h2>
          <Link href="/bac-france/seconde" style={{ color:'#10b981' }}>
            ← Retour Seconde
          </Link>
        </div>
      </main><Footer/></>
  )

  const idx = NAV_ORDER.indexOf(slug)
  const prevSlug = idx>0 ? NAV_ORDER[idx-1] : null
  const nextSlug = idx<NAV_ORDER.length-1 ? NAV_ORDER[idx+1] : null
  const secColor = SEC_COLORS[slug] || '#10b981'

  const GROUPS = [
    { label:'Partie 1 — Algorithmique', slugs:['python-algorithmique'] },
    { label:'Partie 2 — Nombres & Algèbre', slugs:['nombres-calculs','intervalles-inequations','calcul-litteral'] },
    { label:'Partie 3 — Géométrie', slugs:['geometrie-non-reperee','vecteurs-repere','droites-systemes'] },
    { label:'Partie 4 — Fonctions', slugs:['fonctions-generalites','variations-extremums','signe-fonction'] },
    { label:'Partie 5 — Stats & Probas', slugs:['proportions-evolutions','statistiques-descriptives','probabilites-echantillonnage'] },
  ]

  return (
    <><Navbar/>
      <main style={{ position:'relative', zIndex:1, paddingTop:80 }}>

        {/* BREADCRUMB */}
        <div style={{ borderBottom:'1px solid var(--border)',
          padding:'12px clamp(20px,5vw,60px)',
          display:'flex', gap:8, fontSize:13, color:'var(--muted)',
          alignItems:'center', flexWrap:'wrap' }}>
          <Link href="/bac-france" style={{ color:'var(--muted)', textDecoration:'none' }}>🇫🇷 France</Link><span>›</span>
          <Link href="/bac-france/seconde" style={{ color:'var(--muted)', textDecoration:'none' }}>Seconde</Link><span>›</span>
          <span style={{ color:secColor, fontWeight:600 }}>{chapter.titre}</span>
        </div>

        <div className="container" style={{ paddingTop:36, paddingBottom:80 }}>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 270px', gap:32, alignItems:'start' }}>

            {/* ═══════ CONTENU ═══════ */}
            <div>
              {/* HEADER */}
              <div style={{ marginBottom:36 }}>
                <div style={{ display:'flex', gap:10, alignItems:'center', marginBottom:12, flexWrap:'wrap' }}>
                  <span style={{ fontSize:28 }}>{chapter.emoji}</span>
                  <span style={{ fontFamily:'var(--font-mono)', fontSize:12, color:secColor,
                    background:`${secColor}18`, padding:'3px 10px', borderRadius:8, fontWeight:700 }}>
                    {TITRES_NAV[slug]?.split(' — ')[0]}
                  </span>
                  <span style={{ fontSize:11, padding:'2px 10px', borderRadius:20,
                    background:`${secColor}14`, color:secColor, fontWeight:700 }}>{chapter.badge}</span>
                  <span style={{ fontSize:11, background:'rgba(16,185,129,0.15)',
                    color:'#10b981', padding:'2px 9px', borderRadius:10 }}>
                    📘 Seconde Générale · 4h/sem
                  </span>
                </div>
                <h1 style={{ fontSize:'clamp(22px,3vw,36px)', fontWeight:800, marginBottom:10 }}>
                  {chapter.titre}
                </h1>
                <p style={{ color:'var(--text2)', fontSize:14, lineHeight:1.7,
                  maxWidth:620, marginBottom:18 }}>{chapter.desc}</p>
                <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
                  <Link href={`/solve?q=${encodeURIComponent('Explique '+chapter.titre+' Seconde Maths France')}`}
                    style={{ display:'inline-flex', alignItems:'center', gap:7, padding:'8px 16px',
                      borderRadius:10, background:`linear-gradient(135deg,${secColor},${secColor}cc)`,
                      color:'white', fontSize:13, fontWeight:700, textDecoration:'none' }}>
                    🤖 Chat IA — ce chapitre
                  </Link>
                  <Link href="/bac-france/premiere"
                    style={{ display:'inline-flex', alignItems:'center', gap:7, padding:'8px 16px',
                      borderRadius:10, background:'rgba(255,255,255,0.06)',
                      border:'1px solid rgba(255,255,255,0.12)', color:'var(--text2)',
                      fontSize:13, fontWeight:600, textDecoration:'none' }}>
                    📗 Suite en Première
                  </Link>
                </div>
              </div>

              {/* SOUS-CHAPITRES */}
              {chapter.souschapitres.map((sc, scIdx) => (
                <div key={sc.id} style={{ marginBottom:24,
                  background:`${secColor}05`, border:`1px solid ${secColor}20`,
                  borderRadius:18, overflow:'hidden' }}>

                  <button
                    onClick={() => setOpenSc(openSc===sc.id ? null : sc.id)}
                    style={{ width:'100%', background:`${secColor}12`,
                      borderBottom:`1px solid ${secColor}20`, padding:'16px 22px',
                      display:'flex', justifyContent:'space-between', alignItems:'center',
                      cursor:'pointer', border:'none', textAlign:'left' }}>
                    <div>
                      <div style={{ display:'flex', gap:8, alignItems:'center', marginBottom:6 }}>
                        <span style={{ fontFamily:'var(--font-mono)', fontSize:10, color:secColor, fontWeight:700 }}>
                          {String(scIdx+1).padStart(2,'0')}
                        </span>
                        <h2 style={{ fontSize:15, fontWeight:800, color:'var(--text)', margin:0 }}>{sc.titre}</h2>
                      </div>
                      <div style={{ display:'flex', flexWrap:'wrap', gap:5 }}>
                        {sc.notions.map(n => (
                          <span key={n} style={{ fontSize:10, padding:'2px 9px', borderRadius:12,
                            background:`${secColor}12`, color:'var(--text2)',
                            border:`1px solid ${secColor}18` }}>{n}</span>
                        ))}
                      </div>
                    </div>
                    <span style={{ fontSize:18, color:secColor, marginLeft:12 }}>
                      {(openSc===sc.id || scIdx===0) ? '▲' : '▼'}
                    </span>
                  </button>

                  {(openSc===sc.id || scIdx===0) && (
                    <div style={{ padding:'18px 22px', display:'flex', flexDirection:'column', gap:24 }}>
                      {sc.blocs.map(bloc => (
                        <div key={bloc.notion}>
                          <div style={{ fontSize:14, fontWeight:800, color:secColor, marginBottom:14 }}>{bloc.notion}</div>

                          <div style={{ display:'flex', flexDirection:'column', gap:11, marginBottom:14 }}>
                            {bloc.theoremes.map(t => {
                              const color = C[t.type as keyof typeof C] || C.def
                              return (
                                <div key={t.id} style={{ borderLeft:`3px solid ${color}`,
                                  background:`${color}07`, borderRadius:'0 12px 12px 0',
                                  padding:'14px 18px', border:`1px solid ${color}18` }}>
                                  <div style={{ display:'flex', justifyContent:'space-between',
                                    alignItems:'flex-start', marginBottom:8, gap:10, flexWrap:'wrap' }}>
                                    <div style={{ fontWeight:700, fontSize:13 }}>{t.nom}</div>
                                    <TypeBadge type={t.type} />
                                  </div>
                                  <div style={{ fontSize:12, color:'var(--text2)', lineHeight:1.85,
                                    whiteSpace:'pre-line',
                                    fontFamily:t.type==='formule'?'var(--font-mono)':'inherit' }}>
                                    {t.enonce}
                                  </div>
                                  {t.remarque && (
                                    <div style={{ marginTop:10, paddingLeft:12,
                                      borderLeft:'2px solid rgba(245,158,11,0.5)',
                                      fontSize:11, color:'rgba(245,158,11,0.9)',
                                      fontStyle:'italic', lineHeight:1.6 }}>
                                      ⚡ {t.remarque}
                                    </div>
                                  )}
                                </div>
                              )
                            })}
                          </div>

                          {bloc.exercices.length > 0 && (
                            <div>
                              <div style={{ fontSize:11, color:'var(--muted)', fontWeight:700,
                                textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:9 }}>
                                Exercices
                              </div>
                              <div style={{ display:'flex', flexDirection:'column', gap:9 }}>
                                {bloc.exercices.map(ex => (
                                  <div key={ex.id} style={{ background:'var(--surface)',
                                    border:'1px solid var(--border)', borderRadius:12, overflow:'hidden' }}>
                                    <div style={{ padding:'12px 16px' }}>
                                      <div style={{ display:'flex', gap:7, alignItems:'center',
                                        marginBottom:7, flexWrap:'wrap' }}>
                                        <span style={{ fontFamily:'var(--font-mono)', fontSize:10,
                                          color:'var(--muted)', background:'var(--surface2)',
                                          padding:'2px 7px', borderRadius:5 }}>{ex.id}</span>
                                        <NiveauBadge niveau={ex.niveau} />
                                        <span style={{ fontWeight:600, fontSize:13 }}>{ex.titre}</span>
                                      </div>
                                      <p style={{ fontSize:12, color:'var(--text2)', margin:0,
                                        lineHeight:1.65, whiteSpace:'pre-line' }}>{ex.enonce}</p>
                                    </div>
                                    <div style={{ borderTop:'1px solid var(--border)',
                                      padding:'8px 16px', display:'flex', gap:8, flexWrap:'wrap' }}>
                                      <Link href={`/solve?q=${encodeURIComponent('Seconde Maths France — '+ex.enonce)}`}
                                        className="btn btn-primary" style={{ fontSize:11, padding:'5px 12px' }}>
                                        🧮 Résoudre avec IA
                                      </Link>
                                      <button onClick={() => setOpenEx(openEx===ex.id?null:ex.id)}
                                        style={{ fontSize:11, padding:'5px 12px', borderRadius:7,
                                          border:'1px solid var(--border)', background:'transparent',
                                          color:'var(--text2)', cursor:'pointer', fontFamily:'inherit' }}>
                                        📋 {openEx===ex.id?'Masquer':'Correction'}
                                      </button>
                                    </div>
                                    {openEx===ex.id && (
                                      <div style={{ padding:'10px 16px',
                                        borderTop:'1px solid var(--border)',
                                        background:`${secColor}06` }}>
                                        <div style={{ fontSize:10, color:secColor, fontWeight:700, marginBottom:4 }}>✅ Correction</div>
                                        <div style={{ fontSize:12, color:'var(--text2)',
                                          lineHeight:1.75, whiteSpace:'pre-line' }}>{ex.correction}</div>
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
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12,
                borderTop:'1px solid var(--border)', paddingTop:22, marginTop:8 }}>
                {prevSlug ? (
                  <Link href={`/bac-france/seconde/${prevSlug}`} style={{ textDecoration:'none' }}>
                    <div className="card" style={{ padding:'12px 15px', transition:'transform 0.15s' }}
                      onMouseEnter={e=>e.currentTarget.style.transform='translateY(-2px)'}
                      onMouseLeave={e=>e.currentTarget.style.transform='translateY(0)'}>
                      <div style={{ fontSize:10, color:'var(--muted)', marginBottom:2 }}>← Précédent</div>
                      <div style={{ fontWeight:700, fontSize:12 }}>{TITRES_NAV[prevSlug].replace(/CH \d+ — /,'')}</div>
                    </div>
                  </Link>
                ) : <div/>}
                {nextSlug ? (
                  <Link href={`/bac-france/seconde/${nextSlug}`} style={{ textDecoration:'none' }}>
                    <div className="card" style={{ padding:'12px 15px', textAlign:'right', transition:'transform 0.15s' }}
                      onMouseEnter={e=>e.currentTarget.style.transform='translateY(-2px)'}
                      onMouseLeave={e=>e.currentTarget.style.transform='translateY(0)'}>
                      <div style={{ fontSize:10, color:'var(--muted)', marginBottom:2 }}>Suivant →</div>
                      <div style={{ fontWeight:700, fontSize:12 }}>{TITRES_NAV[nextSlug].replace(/CH \d+ — /,'')}</div>
                    </div>
                  </Link>
                ) : <div/>}
              </div>
            </div>

            {/* ═══════ SIDEBAR ═══════ */}
            <aside style={{ position:'sticky', top:88 }}>
              <div style={{ background:'var(--surface)', border:'1px solid var(--border)',
                borderRadius:14, overflow:'hidden', marginBottom:12 }}>
                <div style={{ padding:'10px 14px', borderBottom:'1px solid var(--border)',
                  fontSize:11, color:'var(--muted)', fontWeight:700,
                  textTransform:'uppercase', letterSpacing:'0.08em' }}>
                  📘 Seconde · 13 chapitres
                </div>
                {GROUPS.map(g => (
                  <div key={g.label}>
                    <div style={{ padding:'7px 15px 3px', fontSize:10, color:'var(--muted)',
                      fontWeight:700, textTransform:'uppercase', letterSpacing:'0.1em',
                      background:'rgba(255,255,255,0.02)' }}>{g.label}</div>
                    {g.slugs.map(s => (
                      <Link key={s} href={`/bac-france/seconde/${s}`} style={{ textDecoration:'none' }}>
                        <div style={{ padding:'8px 15px', borderBottom:'1px solid var(--border)',
                          background:s===slug?`${SEC_COLORS[s]}12`:'transparent',
                          borderLeft:s===slug?`3px solid ${SEC_COLORS[s]}`:'3px solid transparent',
                          transition:'all 0.15s', cursor:'pointer' }}
                          onMouseEnter={e=>{ if(s!==slug) e.currentTarget.style.background='rgba(255,255,255,0.03)' }}
                          onMouseLeave={e=>{ if(s!==slug) e.currentTarget.style.background='transparent' }}>
                          <div style={{ fontSize:10, color:'var(--muted)', marginBottom:1, fontFamily:'var(--font-mono)' }}>
                            {TITRES_NAV[s].split(' — ')[0]}
                          </div>
                          <div style={{ fontSize:11, fontWeight:s===slug?700:400,
                            color:s===slug?SEC_COLORS[s]:'var(--text2)' }}>
                            {TITRES_NAV[s].replace(/CH \d+ — /,'').slice(0,26)}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
              <div style={{ background:'var(--surface)', border:'1px solid var(--border)',
                borderRadius:12, padding:'13px' }}>
                <div style={{ fontSize:11, color:'var(--muted)', fontWeight:700,
                  textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:9 }}>Progression</div>
                <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
                  <Link href={`/solve?q=${encodeURIComponent('Aide moi avec '+chapter.titre+' Seconde')}`}
                    className="btn btn-primary" style={{ textAlign:'center', fontSize:12 }}>
                    🤖 Chat IA — ce chapitre
                  </Link>
                  <Link href="/bac-france/premiere" className="btn btn-secondary"
                    style={{ textAlign:'center', fontSize:12 }}>📗 Première Spécialité</Link>
                  <Link href="/bac-france/terminale-generale" className="btn btn-secondary"
                    style={{ textAlign:'center', fontSize:12 }}>🎓 Terminale Générale</Link>
                  <Link href="/bac-france/seconde" className="btn btn-secondary"
                    style={{ textAlign:'center', fontSize:12 }}>↩ Tous les chapitres</Link>
                </div>
              </div>
            </aside>

          </div>
        </div>
      </main>
      <Footer/>
      <style>{`
        @media(max-width:900px){
          div[style*="grid-template-columns: 1fr 270px"]{grid-template-columns:1fr!important;}
          aside{display:none;}
        }
      `}</style>
    </>
  )
}
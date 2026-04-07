'use client'
import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import { useParams } from 'next/navigation'

// ══════════════════════════════════════════════════════════════════════
// FRANCE / PREMIÈRE / [SLUG]
// Route : /bac-france/premiere/[slug]
// Programme officiel Première Spécialité Maths 2026-2027
// ══════════════════════════════════════════════════════════════════════

const C = { thm:'#4f6ef7', def:'#06d6a0', formule:'#f59e0b', prop:'#8b5cf6', methode:'#ec4899' }
const L: Record<string,string> = { thm:'Théorème', def:'Définition', formule:'Formule clé', prop:'Propriété', methode:'Méthode' }

const NAV_ORDER = [
  'suites-numeriques','second-degre',
  'derivation','exponentielle','trigonometrie',
  'produit-scalaire','geometrie-reperee',
  'probas-conditionnelles','variables-aleatoires',
  'python-algorithmes'
]
const TITRES: Record<string,string> = {
  'suites-numeriques':      'Suites numériques',
  'second-degre':           'Second degré',
  'derivation':             'Dérivation',
  'exponentielle':          'Fonction exponentielle',
  'trigonometrie':          'Fonctions trigonométriques',
  'produit-scalaire':       'Produit scalaire',
  'geometrie-reperee':      'Géométrie repérée',
  'probas-conditionnelles': 'Probabilités conditionnelles',
  'variables-aleatoires':   'Variables aléatoires',
  'python-algorithmes':     'Python et algorithmes',
}
const SECTION_COLOR: Record<string,string> = {
  'suites-numeriques':'#4f6ef7','second-degre':'#4f6ef7',
  'derivation':'#06d6a0','exponentielle':'#06d6a0','trigonometrie':'#06d6a0',
  'produit-scalaire':'#f59e0b','geometrie-reperee':'#f59e0b',
  'probas-conditionnelles':'#8b5cf6','variables-aleatoires':'#8b5cf6',
  'python-algorithmes':'#ec4899',
}

const CHAPITRES: Record<string,{
  ch:string; titre:string; badge:string; desc:string; duree:string; section:string
  theoremes:{id:string;type:string;nom:string;enonce:string}[]
  exercices:{id:string;niveau:string;titre:string;enonce:string;correction:string}[]
}> = {

  'suites-numeriques': {
    ch:'CH 01', titre:'Suites numériques', badge:'Algèbre', duree:'~6h', section:'Section 1 — Algèbre',
    desc:'Formule explicite, récurrence, sens de variation, suites arithmétiques/géométriques, termes et sommes.',
    theoremes:[
      {id:'D1',type:'def',nom:'Suite numérique',enonce:'Une suite numérique (uₙ) est une fonction de ℕ (ou ℕ* ou une partie de ℕ) vers ℝ.\n• Formule explicite : uₙ = f(n) — on calcule directement le terme de rang n.\n• Définition par récurrence : u₀ (ou u₁) donné, puis uₙ₊₁ = f(uₙ) — chaque terme dépend du précédent.\nExemple explicite : uₙ = 2n + 3. Exemple récurrent : u₀ = 1, uₙ₊₁ = 2uₙ.'},
      {id:'D2',type:'def',nom:'Suites monotones',enonce:'Une suite (uₙ) est :\n• Croissante si uₙ₊₁ ≥ uₙ pour tout n (ou uₙ₊₁ − uₙ ≥ 0).\n• Strictement croissante si uₙ₊₁ > uₙ.\n• Décroissante si uₙ₊₁ ≤ uₙ.\n• Constante si uₙ₊₁ = uₙ.\nMéthode : calculer uₙ₊₁ − uₙ (si positif → croissante) ou uₙ₊₁/uₙ (si > 1 → croissante pour termes positifs).'},
      {id:'D3',type:'def',nom:'Suite arithmétique',enonce:'Une suite (uₙ) est arithmétique de raison r si uₙ₊₁ = uₙ + r pour tout n.\nFormule du terme général : uₙ = u₀ + n×r  (ou uₙ = u₁ + (n−1)×r).\nLa suite est croissante si r > 0, décroissante si r < 0.\nExemple : u₀ = 5, r = 3 → uₙ = 5 + 3n. (u₅ = 20)'},
      {id:'F1',type:'formule',nom:'Somme d\'une suite arithmétique',enonce:'Somme des (n+1) premiers termes (de u₀ à uₙ) :\nS = (n+1) × (u₀ + uₙ) / 2 = (nombre de termes) × (premier + dernier) / 2\n\nFormule alternative : S = (n+1) × u₀ + n(n+1)/2 × r\n\nExemple : u₀=1, r=1 (entiers de 1 à 100) : S₁₀₀ = 101 × 100/2 = 5 050.'},
      {id:'D4',type:'def',nom:'Suite géométrique',enonce:'Une suite (uₙ) est géométrique de raison q (q ≠ 0) si uₙ₊₁ = q × uₙ pour tout n.\nFormule du terme général : uₙ = u₀ × qⁿ.\n• Si q > 1 et u₀ > 0 : croissante. Si 0 < q < 1 et u₀ > 0 : décroissante.\n• Si q < 0 : valeurs alternativement positives et négatives.\nExemple : u₀ = 2, q = 3 → uₙ = 2 × 3ⁿ. (u₄ = 2 × 81 = 162)'},
      {id:'F2',type:'formule',nom:'Somme d\'une suite géométrique',enonce:'Somme des (n+1) premiers termes (u₀ à uₙ), pour q ≠ 1 :\nS = u₀ × (1 − qⁿ⁺¹) / (1 − q)\n\nFormule mémo : S = u₀ × (1 − q^(nb de termes)) / (1 − q)\nPour q = 1 : S = (n+1) × u₀.\n\nExemple : u₀=1, q=2, 10 termes → S = 1×(1−2¹⁰)/(1−2) = 1023.'},
      {id:'P1',type:'prop',nom:'Représentation graphique',enonce:'On représente une suite par un nuage de points de coordonnées (n ; uₙ) dans un repère.\nLa suite arithmétique donne des points alignés (sur la droite y = u₀ + r×x).\nLa suite géométrique donne une courbe exponentielle.\nUn escalier entre y=x et y=f(x) représente la convergence d\'une suite récurrente.'},
    ],
    exercices:[
      {id:'EX01',niveau:'Facile',titre:'Suite arithmétique',enonce:'La suite (uₙ) est arithmétique avec u₃ = 11 et u₇ = 23. Trouver la raison r et le premier terme u₀.',correction:'u₇ − u₃ = 4r = 23 − 11 = 12 → r = 3. u₃ = u₀ + 3r → 11 = u₀ + 9 → u₀ = 2.'},
      {id:'EX02',niveau:'Facile',titre:'Suite géométrique',enonce:'(uₙ) géométrique : u₀ = 5, q = 2. Calculer u₆ et la somme S = u₀ + u₁ + … + u₅.',correction:'u₆ = 5 × 2⁶ = 5 × 64 = 320. S (6 termes) = 5 × (1 − 2⁶)/(1 − 2) = 5 × 63 = 315.'},
      {id:'EX03',niveau:'Intermédiaire',titre:'Sens de variation',enonce:'La suite est définie par u₀ = 3 et uₙ₊₁ = (uₙ + 5)/2. Étudier son sens de variation.',correction:'uₙ₊₁ − uₙ = (uₙ + 5)/2 − uₙ = (5 − uₙ)/2. Si uₙ < 5 : positif → croissante. Si uₙ > 5 : décroissante. Si uₙ = 5 : constante (point fixe). Ici u₀=3 < 5 : (uₙ) croissante (jusqu\'à la limite 5).'},
    ],
  },

  'second-degre': {
    ch:'CH 02', titre:'Second degré', badge:'Algèbre', duree:'~5h', section:'Section 1 — Algèbre',
    desc:'Forme canonique, forme factorisée, discriminant Δ, résolution ax²+bx+c=0, signe du trinôme.',
    theoremes:[
      {id:'D1',type:'def',nom:'Trinôme du second degré',enonce:'Un trinôme du second degré est une expression de la forme f(x) = ax² + bx + c avec a ≠ 0.\n• a est le coefficient du terme en x² (a > 0 → parabole ouverte vers le haut ; a < 0 → vers le bas).\n• Représentation graphique : une parabole de sommet S(α, β).'},
      {id:'F1',type:'formule',nom:'Forme canonique',enonce:'Tout trinôme ax² + bx + c se met sous la forme : a(x − α)² + β\n\nAvec : α = −b/(2a)   et   β = f(α) = c − b²/(4a)\n\nLe sommet de la parabole est S(α, β) = S(−b/(2a) ; β).\nExemple : 2x² − 4x + 1 = 2(x − 1)² − 1 → sommet S(1, −1).'},
      {id:'F2',type:'formule',nom:'Discriminant et racines',enonce:'Pour f(x) = ax² + bx + c, le discriminant est Δ = b² − 4ac.\n\n• Δ > 0 : deux racines réelles distinctes x₁ = (−b − √Δ)/(2a) et x₂ = (−b + √Δ)/(2a).\n• Δ = 0 : une racine double x₀ = −b/(2a).\n• Δ < 0 : pas de racine réelle (deux racines complexes conjuguées en Terminale).'},
      {id:'F3',type:'formule',nom:'Forme factorisée',enonce:'Si Δ > 0 : f(x) = a(x − x₁)(x − x₂) où x₁ et x₂ sont les deux racines.\nSi Δ = 0 : f(x) = a(x − x₀)².\nSi Δ < 0 : pas de factorisation dans ℝ.\n\nRelations racines-coefficients : x₁ + x₂ = −b/a   et   x₁ × x₂ = c/a.'},
      {id:'P1',type:'prop',nom:'Signe du trinôme',enonce:'Pour f(x) = ax² + bx + c (a ≠ 0) :\n• Si Δ < 0 : f(x) a le même signe que a pour tout x.\n• Si Δ = 0 : f(x) a le même signe que a sauf en x₀ où f(x₀) = 0.\n• Si Δ > 0 : f(x) est du signe de (−a) entre les racines x₁ et x₂, et du signe de a en dehors.\n\nRègle mnémotechnique : "signe de a sauf entre les racines".'},
    ],
    exercices:[
      {id:'EX01',niveau:'Facile',titre:'Résolution équation',enonce:'Résoudre : 2x² − 5x + 3 = 0',correction:'Δ = 25 − 24 = 1 > 0. x₁ = (5−1)/4 = 1. x₂ = (5+1)/4 = 3/2. Solutions : {1 ; 3/2}.'},
      {id:'EX02',niveau:'Facile',titre:'Forme canonique',enonce:'Mettre f(x) = x² − 6x + 10 sous forme canonique. Trouver le sommet.',correction:'α = 6/2 = 3. β = 10 − 36/4 = 10 − 9 = 1. Forme canonique : (x−3)² + 1. Sommet S(3 ; 1).'},
      {id:'EX03',niveau:'Intermédiaire',titre:'Signe du trinôme',enonce:'Résoudre l\'inéquation : 2x² + x − 6 ≤ 0',correction:'Δ = 1 + 48 = 49. Racines : x₁=(−1−7)/4=−2 et x₂=(−1+7)/4=3/2. a=2>0 → f(x)≤0 entre les racines : x ∈ [−2 ; 3/2].'},
    ],
  },

  'derivation': {
    ch:'CH 03', titre:'Dérivation', badge:'Analyse', duree:'~6h', section:'Section 2 — Analyse',
    desc:'Nombre dérivé, dérivées usuelles, opérations, équation de la tangente, variations de f, extremums.',
    theoremes:[
      {id:'D1',type:'def',nom:'Nombre dérivé — taux d\'accroissement',enonce:'Le nombre dérivé de f en a est la limite (si elle existe) du taux d\'accroissement :\nf\'(a) = lim(h→0) [f(a+h) − f(a)] / h\n\nInterprétation géométrique : f\'(a) est le coefficient directeur de la tangente à la courbe de f au point d\'abscisse a.'},
      {id:'D2',type:'def',nom:'Fonction dérivée',enonce:'Si f est dérivable en tout point de son domaine, la fonction qui à x associe f\'(x) est la fonction dérivée de f, notée f\'.\nf\' est elle-même une fonction qu\'on peut étudier (variations, signe…).\nf\'\' = (f\')\'  est la dérivée seconde de f (utile en Terminale pour la convexité).'},
      {id:'F1',type:'formule',nom:'Dérivées usuelles',enonce:'(c)\' = 0  (c constante)\n(xⁿ)\' = nxⁿ⁻¹  (n entier ≠ 0)\n(√x)\' = 1/(2√x)  sur ]0;+∞[\n(1/x)\' = −1/x²  sur ℝ*\n(eˣ)\' = eˣ\n(ln x)\' = 1/x  sur ]0;+∞[  (Terminale)\n(sin x)\' = cos x   (Première)\n(cos x)\' = −sin x  (Première)'},
      {id:'F2',type:'formule',nom:'Opérations sur les dérivées',enonce:'(u + v)\' = u\' + v\'\n(ku)\' = ku\'  (k constante)\n(uv)\' = u\'v + uv\'  ← formule du produit (très utilisée)\n(u/v)\' = (u\'v − uv\') / v²  (v ≠ 0)\n(u∘v)\' (composée) = v\' × (u\'∘v)  (si u=f et v=g : (f∘g)\' = g\'×f\'(g))\nExemple : (sin(2x))\' = 2cos(2x).'},
      {id:'F3',type:'formule',nom:'Équation de la tangente',enonce:'La tangente à la courbe de f au point A(a ; f(a)) a pour équation :\ny = f\'(a)(x − a) + f(a)\n\nC\'est une droite de coefficient directeur f\'(a) passant par A.\nSi f\'(a) = 0 : tangente horizontale (extremum potentiel).\nExemple : f(x) = x², f\'(x) = 2x, tangente en x=3 : y = 6(x−3)+9 = 6x−9.'},
      {id:'P1',type:'prop',nom:'Lien signe de f\' et variations de f',enonce:'Sur un intervalle I :\n• f\'(x) > 0 sur I ⟹ f est strictement croissante sur I.\n• f\'(x) < 0 sur I ⟹ f est strictement décroissante sur I.\n• f\'(x) = 0 sur I ⟹ f est constante sur I.\n\nExtremum local : si f\' change de signe en a → extremum (maximum si − à +, minimum si + à −).'},
    ],
    exercices:[
      {id:'EX01',niveau:'Facile',titre:'Dérivée d\'un produit',enonce:'Calculer la dérivée de f(x) = (2x + 1)(x² − 3).',correction:'u = 2x+1, u\' = 2 ; v = x²−3, v\' = 2x. f\' = u\'v + uv\' = 2(x²−3) + (2x+1)(2x) = 2x²−6 + 4x²+2x = 6x²+2x−6.'},
      {id:'EX02',niveau:'Facile',titre:'Équation de la tangente',enonce:'Donner l\'équation de la tangente à f(x) = x³ − 2x en x = 1.',correction:'f(1) = 1−2 = −1. f\'(x) = 3x²−2, f\'(1) = 1. Tangente : y = 1×(x−1) + (−1) = x − 2.'},
      {id:'EX03',niveau:'Intermédiaire',titre:'Étude des variations',enonce:'Étudier les variations de f(x) = 2x³ − 9x² + 12x − 4.',correction:'f\'(x) = 6x²−18x+12 = 6(x²−3x+2) = 6(x−1)(x−2). f\'(x) > 0 sur ]−∞;1[ et ]2;+∞[ → f croissante. f\'(x) < 0 sur ]1;2[ → f décroissante. Max local en x=1 : f(1)=1, min local en x=2 : f(2)=0.'},
    ],
  },

  'exponentielle': {
    ch:'CH 04', titre:'Fonction exponentielle', badge:'Analyse', duree:'~5h', section:'Section 2 — Analyse',
    desc:'Définition (f\'=f, f(0)=1), propriétés algébriques, étude de eˣ, croissances comparées, équations.',
    theoremes:[
      {id:'D1',type:'def',nom:'Définition de l\'exponentielle',enonce:'La fonction exponentielle, notée exp ou eˣ, est l\'unique fonction f dérivable sur ℝ telle que :\n• f\'= f  (sa dérivée est elle-même)\n• f(0) = 1\n\ne ≈ 2,71828… est un nombre irrationnel (constante d\'Euler).\nConséquence directe : (eˣ)\' = eˣ pour tout x ∈ ℝ.'},
      {id:'F1',type:'formule',nom:'Propriétés algébriques',enonce:'Pour tous réels a, b et tout entier n :\neᵃ × eᵇ = eᵃ⁺ᵇ\neᵃ / eᵇ = eᵃ⁻ᵇ\n(eᵃ)ⁿ = eⁿᵃ\ne⁰ = 1\ne⁻ᵃ = 1/eᵃ\n\nImplication fondamentale : eᵃ = eᵇ ⟺ a = b  (injectivité)'},
      {id:'P1',type:'prop',nom:'Étude de la fonction eˣ',enonce:'Domaine : ℝ\nDérivée : (eˣ)\' = eˣ > 0 → strictement croissante sur ℝ\nLimites : lim(x→−∞) eˣ = 0  et  lim(x→+∞) eˣ = +∞\nSigne : eˣ > 0 pour tout x ∈ ℝ (jamais nul, jamais négatif)\nCourbe : passe par (0;1) et (1;e). Asymptote horizontale en −∞ : y = 0.'},
      {id:'P2',type:'prop',nom:'Croissances comparées',enonce:'Comparaison eˣ avec les puissances de x :\nlim(x→+∞) eˣ/xⁿ = +∞  (pour tout n ∈ ℕ)\nlim(x→−∞) xⁿ eˣ = 0   (pour tout n ∈ ℕ)\n\nInterprétation : eˣ "grandit plus vite" que toute puissance de x au voisinage de +∞.\nExemples : lim(x→+∞) eˣ/x = +∞ ;  lim(x→−∞) xe^x = 0.'},
      {id:'M1',type:'methode',nom:'Résoudre équations/inéquations avec eˣ',enonce:'eᵘ = eᵛ ⟺ u = v  (stricte croissance)\neᵘ > eᵛ ⟺ u > v  (stricte croissance)\n\nStratégie :\n1. Isoler eˣ d\'un côté.\n2. Prendre le logarithme des deux membres si besoin (en Terminale).\n\nExemple : e²ˣ⁻¹ = e³ ⟺ 2x − 1 = 3 ⟺ x = 2.'},
    ],
    exercices:[
      {id:'EX01',niveau:'Facile',titre:'Propriétés algébriques',enonce:'Simplifier : A = e⁵ × e⁻³  ;  B = (e²)³ / e⁴',correction:'A = e^(5−3) = e². B = e⁶/e⁴ = e².'},
      {id:'EX02',niveau:'Facile',titre:'Équation',enonce:'Résoudre : e^(3x−1) = e^5',correction:'3x − 1 = 5 → 3x = 6 → x = 2.'},
      {id:'EX03',niveau:'Intermédiaire',titre:'Dérivée et variations',enonce:'Étudier les variations de f(x) = (2x − 3)eˣ.',correction:'f\'(x) = 2eˣ + (2x−3)eˣ = eˣ(2 + 2x − 3) = eˣ(2x−1). Comme eˣ > 0 toujours : f\'(x) < 0 si x < 1/2, f\'(x) > 0 si x > 1/2. Minimum en x = 1/2 : f(1/2) = (2×1/2−3)e^(1/2) = −2√e.'},
    ],
  },

  'trigonometrie': {
    ch:'CH 05', titre:'Fonctions trigonométriques', badge:'Analyse', duree:'~5h', section:'Section 2 — Analyse',
    desc:'Cercle trigonométrique, radians, cos²x+sin²x=1, valeurs remarquables, périodicité 2π, variations, équations.',
    theoremes:[
      {id:'D1',type:'def',nom:'Cercle trigonométrique et radians',enonce:'Le cercle trigonométrique est le cercle de centre O et de rayon 1.\nConversion degrés-radians : 360° = 2π radians.\n0° = 0  ;  30° = π/6  ;  45° = π/4  ;  60° = π/3  ;  90° = π/2  ;  180° = π\n\nPour un point M du cercle de paramètre x (angle) : M(cos x ; sin x).'},
      {id:'F1',type:'formule',nom:'Valeurs remarquables',enonce:'| x | 0 | π/6 | π/4 | π/3 | π/2 |\n|---|---|---|---|---|---|\n| cos x | 1 | √3/2 | √2/2 | 1/2 | 0 |\n| sin x | 0 | 1/2 | √2/2 | √3/2 | 1 |\n| tan x | 0 | 1/√3 | 1 | √3 | — |\n\nMnémotechnique sin : 0, 1/2, √2/2, √3/2, 1 → mémoriser en ordre croissant.'},
      {id:'F2',type:'formule',nom:'Relations fondamentales',enonce:'Relation de Pythagore : cos²x + sin²x = 1  (pour tout x)\nParité : cos(−x) = cos x  (cosinus est pair)\n         sin(−x) = −sin x (sinus est impair)\nPériodicité : cos(x + 2π) = cos x  et  sin(x + 2π) = sin x  (période 2π)\nTransformations : cos(π − x) = −cos x  ;  sin(π − x) = sin x\n                  cos(π + x) = −cos x  ;  sin(π + x) = −sin x'},
      {id:'P1',type:'prop',nom:'Variations sur [0 ; 2π]',enonce:'Cosinus : décroissant sur [0; π], croissant sur [π; 2π]. cos(0)=1, cos(π)=−1.\nSinus : croissant sur [0; π/2], décroissant sur [π/2; 3π/2], croissant sur [3π/2; 2π].\nMaximum de sin x = 1 atteint en x = π/2. Minimum = −1 atteint en x = 3π/2.'},
      {id:'M1',type:'methode',nom:'Résoudre cos x = a et sin x = a',enonce:'cos x = a (|a| ≤ 1) : x = ±arccos(a) + 2kπ (k ∈ ℤ) → 2 familles de solutions.\nsin x = a (|a| ≤ 1) : x = arcsin(a) + 2kπ  ou  x = π − arcsin(a) + 2kπ.\n\nCas particuliers :\ncos x = 0 → x = π/2 + kπ\nsin x = 0 → x = kπ\ncos x = 1 → x = 2kπ\nsin x = 1 → x = π/2 + 2kπ'},
    ],
    exercices:[
      {id:'EX01',niveau:'Facile',titre:'Valeurs exactes',enonce:'Calculer : cos(5π/6) et sin(5π/6).',correction:'5π/6 = π − π/6. cos(π − π/6) = −cos(π/6) = −√3/2. sin(π − π/6) = sin(π/6) = 1/2.'},
      {id:'EX02',niveau:'Facile',titre:'Relation Pythagore',enonce:'On sait que sin x = 3/5 et x ∈ [0; π/2]. Calculer cos x.',correction:'cos²x = 1 − sin²x = 1 − 9/25 = 16/25. Comme x ∈ [0;π/2], cos x > 0 → cos x = 4/5.'},
      {id:'EX03',niveau:'Intermédiaire',titre:'Équation trig',enonce:'Résoudre sur [0; 2π] : cos x = −1/2.',correction:'arccos(−1/2) = 2π/3. Solutions : x = 2π/3 ou x = 2π − 2π/3 = 4π/3.'},
    ],
  },

  'produit-scalaire': {
    ch:'CH 06', titre:'Produit scalaire', badge:'Géométrie', duree:'~5h', section:'Section 3 — Géométrie',
    desc:'3 définitions (projection, cosinus, coordonnées), Al-Kashi, orthogonalité, perpendicularité, angles.',
    theoremes:[
      {id:'D1',type:'def',nom:'Définition du produit scalaire — 3 formules',enonce:'Soient u⃗ et v⃗ deux vecteurs du plan, θ l\'angle entre eux :\n\n1/ Par les normes et cosinus : u⃗ · v⃗ = ‖u⃗‖ × ‖v⃗‖ × cos θ\n\n2/ Par les coordonnées (repère orthonormé) : u⃗(x, y) · v⃗(x\', y\') = xx\' + yy\'\n\n3/ Par la norme d\'une différence : u⃗ · v⃗ = (‖u⃗+v⃗‖² − ‖u⃗‖² − ‖v⃗‖²) / 2'},
      {id:'P1',type:'prop',nom:'Propriétés du produit scalaire',enonce:'Symétrie : u⃗ · v⃗ = v⃗ · u⃗\nBilinéarité :\n  (u⃗ + v⃗) · w⃗ = u⃗ · w⃗ + v⃗ · w⃗\n  (ku⃗) · v⃗ = k(u⃗ · v⃗)\n\nNorme : ‖u⃗‖² = u⃗ · u⃗ = x² + y²  (si u⃗(x,y))\n\nIdentités remarquables :\n‖u⃗ + v⃗‖² = ‖u⃗‖² + 2u⃗·v⃗ + ‖v⃗‖²\n‖u⃗ − v⃗‖² = ‖u⃗‖² − 2u⃗·v⃗ + ‖v⃗‖²'},
      {id:'F1',type:'formule',nom:'Formule d\'Al-Kashi (généralisation de Pythagore)',enonce:'Dans le triangle ABC, en notant a = BC, b = CA, c = AB :\nBC² = AB² + AC² − 2 · AB · AC · cos(∠BAC)\na² = b² + c² − 2bc·cos A\n\nCas particulier : si ∠A = 90°, cos A = 0 → a² = b² + c² (Pythagore).\nUtilisation : calculer un côté connaissant deux côtés et l\'angle entre eux, ou calculer un angle.'},
      {id:'P2',type:'prop',nom:'Orthogonalité',enonce:'u⃗ · v⃗ = 0 ⟺ u⃗ ⊥ v⃗  (les vecteurs sont orthogonaux)\n\nSi u⃗ (non nul) et v⃗ (non nul) vérifient u⃗·v⃗ = 0 : les droites portées par ces vecteurs sont perpendiculaires.\n\nRéciproquement : si deux droites sont perpendiculaires, les vecteurs directeurs ont un produit scalaire nul.\nApplication : prouver la perpendicularité de deux droites, trouver un angle.'},
    ],
    exercices:[
      {id:'EX01',niveau:'Facile',titre:'Calcul en coordonnées',enonce:'u⃗(3 ; −4) et v⃗(2 ; 1). Calculer u⃗ · v⃗ et ‖u⃗‖.',correction:'u⃗ · v⃗ = 3×2 + (−4)×1 = 6 − 4 = 2. ‖u⃗‖ = √(9+16) = √25 = 5.'},
      {id:'EX02',niveau:'Facile',titre:'Orthogonalité',enonce:'Montrer que les vecteurs u⃗(4 ; −3) et v⃗(3 ; 4) sont orthogonaux.',correction:'u⃗ · v⃗ = 4×3 + (−3)×4 = 12 − 12 = 0. Donc u⃗ ⊥ v⃗. ✓'},
      {id:'EX03',niveau:'Intermédiaire',titre:'Formule d\'Al-Kashi',enonce:'Dans le triangle ABC : AB = 5, AC = 7, ∠A = 60°. Calculer BC.',correction:'BC² = 5² + 7² − 2×5×7×cos(60°) = 25 + 49 − 70×(1/2) = 74 − 35 = 39. BC = √39 ≈ 6,24.'},
    ],
  },

  'geometrie-reperee': {
    ch:'CH 07', titre:'Géométrie repérée', badge:'Géométrie', duree:'~4h', section:'Section 3 — Géométrie',
    desc:'Équations de droite (réduite, cartésienne), vecteur directeur/normal, équation du cercle, positions relatives.',
    theoremes:[
      {id:'D1',type:'def',nom:'Équations de droite',enonce:'Équation réduite : y = mx + p  (m = pente, p = ordonnée à l\'origine).\nÉquation cartésienne : ax + by + c = 0 (a ≠ 0 ou b ≠ 0).\n\n• Vecteur directeur de la droite (ax+by+c=0) : u⃗(−b ; a).\n• Vecteur normal de la droite : n⃗(a ; b)  (perpendiculaire à la droite).\n\nConversion : y = mx + p ↔ mx − y + p = 0 (a=m, b=−1, c=p).'},
      {id:'P1',type:'prop',nom:'Positions relatives de deux droites',enonce:'Deux droites d₁ : a₁x+b₁y+c₁=0 et d₂ : a₂x+b₂y+c₂=0 :\n• Parallèles et distinctes : a₁b₂ = a₂b₁ et c₁b₂ ≠ c₂b₁\n• Confondues : a₁b₂ = a₂b₁ et c₁b₂ = c₂b₁\n• Sécantes : a₁b₂ ≠ a₂b₁ → résoudre le système 2×2\n• Perpendiculaires : a₁a₂ + b₁b₂ = 0 (produit scalaire des normales nul)'},
      {id:'F1',type:'formule',nom:'Équation du cercle',enonce:'Le cercle de centre Ω(a ; b) et de rayon r a pour équation :\n(x − a)² + (y − b)² = r²\n\nDéveloppée : x² + y² − 2ax − 2by + (a² + b² − r²) = 0\n\nDéterminer le centre et le rayon depuis la forme développée : compléter les carrés.\nExemple : x² + y² − 4x + 2y − 4 = 0 → (x−2)² + (y+1)² = 9 → centre (2;−1), r=3.'},
      {id:'P2',type:'prop',nom:'Position relative droite-cercle',enonce:'Pour la droite d et le cercle C(Ω, r), calculer la distance δ = d(Ω, d) :\n• δ > r : la droite est EXTERNE (pas d\'intersection).\n• δ = r : la droite est TANGENTE (1 point d\'intersection).\n• δ < r : la droite est SÉCANTE (2 points d\'intersection).\n\nFormule de la distance d\'un point M(x₀;y₀) à la droite ax+by+c=0 :\nδ = |ax₀ + by₀ + c| / √(a² + b²)'},
    ],
    exercices:[
      {id:'EX01',niveau:'Facile',titre:'Équation d\'une droite',enonce:'Trouver l\'équation de la droite passant par A(2;1) et B(5;7).',correction:'Pente : m = (7−1)/(5−2) = 6/3 = 2. y − 1 = 2(x − 2) → y = 2x − 3.'},
      {id:'EX02',niveau:'Facile',titre:'Cercle — centre et rayon',enonce:'Déterminer le centre et le rayon de : (x−3)²+(y+2)²=16.',correction:'Centre Ω(3 ; −2), rayon r = √16 = 4.'},
      {id:'EX03',niveau:'Intermédiaire',titre:'Position droite-cercle',enonce:'Droite d : y = x + 1  et cercle C : (x−1)² + y² = 9. Étudier leur position.',correction:'Équation de d : x − y + 1 = 0. Centre Ω(1;0), r = 3. Distance : δ = |1−0+1|/√(1+1) = 2/√2 = √2 ≈ 1,41 < 3. La droite est sécante au cercle (2 points communs).'},
    ],
  },

  'probas-conditionnelles': {
    ch:'CH 08', titre:'Probabilités conditionnelles', badge:'Probas', duree:'~5h', section:'Section 4 — Probabilités',
    desc:'P_A(B), probabilités composées, arbres pondérés, partition, probabilités totales, indépendance.',
    theoremes:[
      {id:'D1',type:'def',nom:'Probabilité conditionnelle',enonce:'La probabilité de B sachant A (noté P_A(B) ou P(B|A)) est définie par :\nP_A(B) = P(A ∩ B) / P(A)  avec P(A) ≠ 0\n\nInterprétation : probabilité que B se réalise, sachant que A est déjà réalisé.\nConséquence : P(A ∩ B) = P(A) × P_A(B)  (formule des probabilités composées)'},
      {id:'F1',type:'formule',nom:'Formule des probabilités totales',enonce:'Si (A₁, A₂, …, Aₙ) est une partition de l\'univers Ω (événements deux à deux incompatibles dont la réunion est Ω), alors pour tout événement B :\n\nP(B) = P(A₁)×P_{A₁}(B) + P(A₂)×P_{A₂}(B) + … + P(Aₙ)×P_{Aₙ}(B)\nP(B) = Σ P(Aᵢ) × P_{Aᵢ}(B)\n\nUse : arbres de probabilités (lire chaque branche, additionner les chemins menant à B).'},
      {id:'D2',type:'def',nom:'Indépendance de deux événements',enonce:'A et B sont indépendants si et seulement si :\nP(A ∩ B) = P(A) × P(B)\n\nÉquivalences :\n• P_A(B) = P(B)  (réaliser A ne modifie pas la probabilité de B)\n• P_B(A) = P(A)\n\nATTENTION : indépendance ≠ incompatibilité !\n(Incompatibles : P(A∩B)=0 ; Indépendants : P(A∩B)=P(A)×P(B))'},
      {id:'M1',type:'methode',nom:'Utiliser un arbre de probabilités',enonce:'1. Représenter chaque étape par des branches avec les probabilités (conditionnelles).\n2. La probabilité d\'un chemin = produit des probabilités des branches.\n3. Si plusieurs chemins mènent à un même événement, additionner leurs probabilités.\n\nVérification : la somme de toutes les feuilles = 1.'},
    ],
    exercices:[
      {id:'EX01',niveau:'Facile',titre:'Probabilité conditionnelle',enonce:'P(A) = 0,4 ; P(A ∩ B) = 0,24. Calculer P_A(B) et P(A ∩ B̄).',correction:'P_A(B) = 0,24/0,4 = 0,6. P(A ∩ B̄) = P(A) − P(A∩B) = 0,4 − 0,24 = 0,16.'},
      {id:'EX02',niveau:'Intermédiaire',titre:'Probabilités totales',enonce:'Urne A : 3 rouges, 2 bleues. Urne B : 1 rouge, 4 bleues. On choisit l\'urne A avec proba 0,4 puis une boule. Quelle est la proba d\'une boule rouge ?',correction:'P(R) = P(A)×P_A(R) + P(B)×P_B(R) = 0,4×(3/5) + 0,6×(1/5) = 0,24 + 0,12 = 0,36.'},
      {id:'EX03',niveau:'Intermédiaire',titre:'Indépendance',enonce:'P(A)=0,3 ; P(B)=0,5 ; P(A∩B)=0,15. A et B sont-ils indépendants ?',correction:'P(A)×P(B) = 0,3×0,5 = 0,15 = P(A∩B). OUI, A et B sont indépendants.'},
    ],
  },

  'variables-aleatoires': {
    ch:'CH 09', titre:'Variables aléatoires', badge:'Probas', duree:'~4h', section:'Section 4 — Probabilités',
    desc:'Définition, loi de probabilité, espérance E(X), variance V(X), écart-type σ(X), loi uniforme.',
    theoremes:[
      {id:'D1',type:'def',nom:'Variable aléatoire',enonce:'Une variable aléatoire X est une fonction qui associe à chaque issue ω de l\'univers Ω un nombre réel X(ω).\nL\'ensemble des valeurs prises par X est {x₁, x₂, …, xₙ}.\nLa loi de probabilité de X est le tableau :\n| X   | x₁  | x₂  | … | xₙ  |\n|-----|-----|-----|---|-----|\n| P   | p₁  | p₂  | … | pₙ  |\nAvec Σpᵢ = 1 (la somme des probabilités vaut 1).'},
      {id:'F1',type:'formule',nom:'Espérance mathématique',enonce:'E(X) = Σ xᵢ × pᵢ = x₁p₁ + x₂p₂ + … + xₙpₙ\n\nInterprétation : valeur moyenne de X sur un grand nombre d\'expériences (loi des grands nombres).\nPropriétés linéaires : E(aX + b) = a×E(X) + b  ;  E(X + Y) = E(X) + E(Y).'},
      {id:'F2',type:'formule',nom:'Variance et écart-type',enonce:'Variance : V(X) = E[(X − E(X))²] = E(X²) − [E(X)]²\nAvec E(X²) = Σ xᵢ² × pᵢ\n\nÉcart-type : σ(X) = √V(X)\n\nInterprétation : plus σ est grand, plus les valeurs de X sont dispersées autour de la moyenne.\nPropriété : V(aX + b) = a² × V(X).'},
      {id:'D2',type:'def',nom:'Loi uniforme sur {1, 2, …, n}',enonce:'X suit la loi uniforme sur {1, 2, …, n} si chaque valeur a la même probabilité 1/n :\nP(X = k) = 1/n  pour k ∈ {1, 2, …, n}\n\nEspérance : E(X) = (n + 1) / 2\nVariance : V(X) = (n² − 1) / 12\n\nExemple : lancer d\'un dé équilibré à 6 faces → E(X) = 7/2 = 3,5.'},
    ],
    exercices:[
      {id:'EX01',niveau:'Facile',titre:'Espérance',enonce:'X prend les valeurs : X=0 (p=0,3), X=1 (p=0,5), X=2 (p=0,2). Calculer E(X).',correction:'E(X) = 0×0,3 + 1×0,5 + 2×0,2 = 0 + 0,5 + 0,4 = 0,9.'},
      {id:'EX02',niveau:'Intermédiaire',titre:'Variance',enonce:'Avec la loi de l\'exercice précédent, calculer V(X) et σ(X).',correction:'E(X²) = 0²×0,3 + 1²×0,5 + 2²×0,2 = 0 + 0,5 + 0,8 = 1,3. V(X) = 1,3 − 0,9² = 1,3 − 0,81 = 0,49. σ(X) = √0,49 = 0,7.'},
      {id:'EX03',niveau:'Intermédiaire',titre:'Construction de loi',enonce:'On lance un dé équilibré. X = 1 si le résultat est pair, X = 0 sinon. Donner la loi de X et E(X).',correction:'P(X=1) = 3/6 = 1/2 (les faces paires : 2,4,6). P(X=0) = 1/2. E(X) = 1×1/2 + 0×1/2 = 1/2.'},
    ],
  },

  'python-algorithmes': {
    ch:'CH 10', titre:'Python et algorithmes', badge:'Info', duree:'~4h', section:'Section 5 — Algorithmique',
    desc:'Listes (création, parcours, compréhension), fonctions (def/return), applications mathématiques, dichotomie.',
    theoremes:[
      {id:'D1',type:'def',nom:'Listes en Python',enonce:'Création : L = [1, 2, 3]  ou  L = [0] * 10 (liste de 10 zéros)\nAccès : L[0] (premier), L[-1] (dernier), L[i]\nParcours :\n  for x in L :          # parcours des éléments\n  for i in range(len(L)): # parcours par indices\nMéthodes : L.append(x) (ajouter), L.insert(i,x), L.remove(x), len(L)\nCompréhension : carres = [x**2 for x in range(10)]'},
      {id:'D2',type:'def',nom:'Fonctions Python',enonce:'Définition :\ndef ma_fonction(paramètre1, paramètre2):\n    [instructions]\n    return résultat\n\nVariables locales : existent seulement dans la fonction.\nVariables globales : définies en dehors (usage déconseillé dans les fonctions).\n\nExemple :\ndef carre(x):\n    return x * x\ncarre(5)  → retourne 25'},
      {id:'M1',type:'methode',nom:'Calculer un terme de suite en Python',enonce:'Suite arithmétique (u₀, r) :\ndef u_arith(n, u0, r):\n    return u0 + n * r\n\nSuite par récurrence (u₀, f) :\ndef u_rec(n, u0):\n    u = u0\n    for i in range(n):\n        u = f(u)   # f est la fonction de récurrence\n    return u\n\nAvec liste pour stocker tous les termes :\nL = [u0]\nfor i in range(1, n+1):\n    L.append(2*L[-1] + 1)  # exemple uₙ₊₁ = 2uₙ+1'},
      {id:'M2',type:'methode',nom:'Méthode de dichotomie',enonce:'Pour résoudre f(x) = k sur [a;b] (f continue et monotone) :\na, b = valeurs initiales\nwhile b - a > précision:\n    m = (a + b) / 2\n    if f(m) < k:  # adapter selon le sens de variation\n        a = m\n    else:\n        b = m\nreturn (a + b) / 2   # valeur approchée\n\nPrincipe : diviser par 2 l\'intervalle à chaque étape → convergence rapide.'},
    ],
    exercices:[
      {id:'EX01',niveau:'Facile',titre:'Liste et compréhension',enonce:'Écrire en Python la liste des 10 premiers termes de la suite uₙ = 3n + 1.',correction:'L = [3*n + 1 for n in range(10)]\n# ou : L = []\n#       for n in range(10): L.append(3*n+1)'},
      {id:'EX02',niveau:'Facile',titre:'Fonction Python',enonce:'Écrire une fonction Python qui prend un entier n et retourne la somme 1 + 2 + … + n.',correction:'def somme(n):\n    s = 0\n    for i in range(1, n+1):\n        s += i\n    return s\n# ou : return n*(n+1)//2'},
      {id:'EX03',niveau:'Intermédiaire',titre:'Suite récurrente',enonce:'Suite u₀ = 1, uₙ₊₁ = (uₙ + 5)/2. Écrire une fonction qui retourne le rang à partir duquel uₙ > 4,9.',correction:'def seuil():\n    u = 1\n    n = 0\n    while u <= 4.9:\n        u = (u + 5) / 2\n        n += 1\n    return n'},
    ],
  },
}

function TypeBadge({ type }: { type: string }) {
  const color = C[type as keyof typeof C] || C.def
  return (
    <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 20, background: `${color}20`, color, border: `1px solid ${color}30`, flexShrink: 0 }}>
      {L[type as keyof typeof L] || type}
    </span>
  )
}

export default function PremiereChapterPage() {
  const params = useParams()
  const slug = params?.slug as string
  const ch = CHAPITRES[slug]
  const [openEx, setOpenEx] = useState<string | null>(null)
  const secColor = SECTION_COLOR[slug] || '#4f6ef7'

  if (!ch) {
    return (
      <>
        <Navbar />
        <main style={{ paddingTop: 80, minHeight: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>📭</div>
            <h2 style={{ marginBottom: 12 }}>Chapitre non trouvé</h2>
            <Link href="/bac-france/premiere" style={{ color: '#818cf8' }}>← Retour à la Première</Link>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  const idx = NAV_ORDER.indexOf(slug)
  const prevSlug = idx > 0 ? NAV_ORDER[idx - 1] : null
  const nextSlug = idx < NAV_ORDER.length - 1 ? NAV_ORDER[idx + 1] : null

  return (
    <>
      <Navbar />
      <main style={{ position: 'relative', zIndex: 1, paddingTop: 80 }}>
        <div style={{ borderBottom: '1px solid var(--border)', padding: '14px clamp(20px,5vw,60px)', display: 'flex', gap: 8, fontSize: 13, color: 'var(--muted)', alignItems: 'center', flexWrap: 'wrap' }}>
          <Link href="/bac-france" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Bac France</Link>
          <span>›</span>
          <Link href="/bac-france/premiere" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Première</Link>
          <span>›</span>
          <span style={{ color: secColor, fontWeight: 600 }}>{ch.ch} — {ch.titre}</span>
        </div>

        <div className="container" style={{ paddingTop: 40, paddingBottom: 80 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 275px', gap: 32, alignItems: 'start' }}>

            {/* CONTENU */}
            <div>
              <div style={{ marginBottom: 32 }}>
                <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, background: 'var(--surface2)', color: 'var(--muted)', padding: '3px 10px', borderRadius: 8 }}>Première · {ch.ch}</span>
                  <span style={{ fontSize: 12, background: `${secColor}20`, color: secColor, padding: '3px 10px', borderRadius: 12, fontWeight: 600 }}>{ch.badge}</span>
                  <span style={{ fontSize: 11, background: 'rgba(79,110,247,0.08)', color: '#818cf8', padding: '3px 10px', borderRadius: 12 }}>Spécialité 2026-2027</span>
                </div>
                <h1 style={{ fontSize: 'clamp(22px,3.5vw,36px)', marginBottom: 8 }}>{ch.titre}</h1>
                <div style={{ fontSize: 12, color: secColor, marginBottom: 8 }}>📂 {ch.section}</div>
                <p style={{ color: 'var(--text2)', fontSize: 14, lineHeight: 1.65, marginBottom: 14, maxWidth: 640 }}>{ch.desc}</p>
                <div style={{ display: 'flex', gap: 16, fontSize: 12, color: 'var(--muted)', flexWrap: 'wrap' }}>
                  <span>📊 {ch.theoremes.length} définitions & théorèmes</span>
                  <span>·</span>
                  <span>📝 {ch.exercices.length} exercices</span>
                  <span>·</span>
                  <span>⏱ {ch.duree}</span>
                </div>
              </div>

              {/* Légende */}
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 26, padding: '10px 14px', background: 'var(--surface)', borderRadius: 12, border: '1px solid var(--border)' }}>
                <span style={{ fontSize: 12, color: 'var(--muted)', marginRight: 4, alignSelf: 'center' }}>Légende :</span>
                {Object.entries(L).map(([k, v]) => (
                  <span key={k} style={{ fontSize: 11, padding: '2px 10px', borderRadius: 20, background: `${C[k as keyof typeof C]}18`, color: C[k as keyof typeof C], border: `1px solid ${C[k as keyof typeof C]}25`, fontWeight: 600 }}>
                    {v}
                  </span>
                ))}
              </div>

              {/* Cours */}
              <div style={{ marginBottom: 44 }}>
                <h2 style={{ fontSize: 20, marginBottom: 18 }}>📐 Cours officiel — Définitions & Théorèmes</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 13 }}>
                  {ch.theoremes.map(t => {
                    const color = C[t.type as keyof typeof C] || C.def
                    return (
                      <div key={t.id} style={{ borderLeft: `3px solid ${color}`, background: `${color}07`, borderRadius: '0 12px 12px 0', padding: '15px 20px', border: `1px solid ${color}18` }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8, gap: 10, flexWrap: 'wrap' }}>
                          <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--text)' }}>{t.nom}</div>
                          <TypeBadge type={t.type} />
                        </div>
                        <div style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.8, whiteSpace: 'pre-line', fontFamily: (t.type === 'formule' || t.type === 'methode') ? 'var(--font-mono)' : 'inherit' }}>
                          {t.enonce}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Exercices */}
              <div style={{ marginBottom: 44 }}>
                <h2 style={{ fontSize: 20, marginBottom: 18 }}>📝 Exercices</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
                  {ch.exercices.map(ex => (
                    <div key={ex.id} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, overflow: 'hidden' }}>
                      <div style={{ padding: '15px 20px' }}>
                        <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8, flexWrap: 'wrap' }}>
                          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)', background: 'var(--surface2)', padding: '2px 8px', borderRadius: 6 }}>{ex.id}</span>
                          <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 10, fontWeight: 600,
                            background: ex.niveau === 'Facile' ? 'rgba(6,214,160,0.15)' : 'rgba(245,158,11,0.15)',
                            color: ex.niveau === 'Facile' ? '#06d6a0' : '#f59e0b' }}>{ex.niveau}</span>
                          <span style={{ fontWeight: 600, fontSize: 14, color: 'var(--text)' }}>{ex.titre}</span>
                        </div>
                        <p style={{ fontSize: 13, color: 'var(--text2)', margin: 0, lineHeight: 1.6, whiteSpace: 'pre-line' }}>{ex.enonce}</p>
                      </div>
                      <div style={{ borderTop: '1px solid var(--border)', padding: '10px 20px', display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                        <Link href={`/solve?q=${encodeURIComponent('Première France, ' + ch.titre + ' — ' + ex.enonce)}`}
                          className="btn btn-primary" style={{ fontSize: 12, padding: '6px 14px' }}>
                          🧮 Résoudre avec IA
                        </Link>
                        <button onClick={() => setOpenEx(openEx === ex.id ? null : ex.id)}
                          style={{ fontSize: 12, padding: '6px 14px', borderRadius: 8, border: '1px solid var(--border)', background: 'transparent', color: 'var(--text2)', cursor: 'pointer', fontFamily: 'inherit' }}>
                          📋 {openEx === ex.id ? 'Masquer' : 'Correction'}
                        </button>
                      </div>
                      {openEx === ex.id && (
                        <div style={{ padding: '13px 20px', borderTop: '1px solid var(--border)', background: `${secColor}06` }}>
                          <div style={{ fontSize: 11, color: secColor, fontWeight: 700, marginBottom: 5 }}>✅ Correction</div>
                          <div style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.75, whiteSpace: 'pre-line' }}>{ex.correction}</div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, borderTop: '1px solid var(--border)', paddingTop: 22 }}>
                {prevSlug ? (
                  <Link href={`/bac-france/premiere/${prevSlug}`} style={{ textDecoration: 'none' }}>
                    <div className="card" style={{ padding: '13px 16px', transition: 'transform 0.15s' }}
                      onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                      onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
                      <div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 3 }}>← Précédent</div>
                      <div style={{ fontWeight: 700, fontSize: 13 }}>{TITRES[prevSlug]}</div>
                    </div>
                  </Link>
                ) : <div />}
                {nextSlug ? (
                  <Link href={`/bac-france/premiere/${nextSlug}`} style={{ textDecoration: 'none' }}>
                    <div className="card" style={{ padding: '13px 16px', textAlign: 'right', transition: 'transform 0.15s' }}
                      onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                      onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
                      <div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 3 }}>Suivant →</div>
                      <div style={{ fontWeight: 700, fontSize: 13 }}>{TITRES[nextSlug]}</div>
                    </div>
                  </Link>
                ) : <div />}
              </div>
            </div>

            {/* SIDEBAR */}
            <aside style={{ position: 'sticky', top: 88 }}>
              <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden', marginBottom: 14 }}>
                <div style={{ padding: '11px 15px', borderBottom: '1px solid var(--border)', fontSize: 11, color: 'var(--muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  📗 Première — 10 chapitres
                </div>
                {NAV_ORDER.map((s, i) => (
                  <Link key={s} href={`/bac-france/premiere/${s}`} style={{ textDecoration: 'none' }}>
                    <div style={{ padding: '9px 15px', borderBottom: i < NAV_ORDER.length-1 ? '1px solid var(--border)' : 'none',
                      background: s === slug ? `${SECTION_COLOR[s]}12` : 'transparent',
                      borderLeft: s === slug ? `3px solid ${SECTION_COLOR[s]}` : '3px solid transparent',
                      transition: 'all 0.15s', cursor: 'pointer' }}
                      onMouseEnter={e => { if(s!==slug) e.currentTarget.style.background='rgba(255,255,255,0.03)' }}
                      onMouseLeave={e => { if(s!==slug) e.currentTarget.style.background='transparent' }}>
                      <div style={{ fontSize: 10, color: 'var(--muted)', marginBottom: 1, fontFamily: 'var(--font-mono)' }}>CH {String(i+1).padStart(2,'0')}</div>
                      <div style={{ fontSize: 11, fontWeight: s===slug ? 700 : 400, color: s===slug ? SECTION_COLOR[s] : 'var(--text2)' }}>{TITRES[s]}</div>
                    </div>
                  </Link>
                ))}
              </div>
              <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 13, padding: '14px' }}>
                <div style={{ fontSize: 11, color: 'var(--muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>Actions</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                  <Link href={`/solve?q=${encodeURIComponent('Explique-moi ' + ch.titre + ' en Première Spécialité Maths')}`}
                    className="btn btn-primary" style={{ textAlign: 'center', fontSize: 12 }}>
                    🤖 Chat IA — {ch.titre}
                  </Link>
                  <Link href="/simulation" className="btn btn-secondary" style={{ textAlign: 'center', fontSize: 12 }}>📋 Exercice type</Link>
                  <Link href="/bac-france/terminale" className="btn btn-secondary" style={{ textAlign: 'center', fontSize: 12 }}>🎓 Voir Terminale</Link>
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
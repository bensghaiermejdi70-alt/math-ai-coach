'use client'
import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import { useParams } from 'next/navigation'

// ══════════════════════════════════════════════════════════════════════
// TERMINALE GÉNÉRALE / [SLUG]
// Route : /bac-france/terminale-generale/[slug]
// Programme officiel Terminale Spécialité Maths · Bac 2027
// ══════════════════════════════════════════════════════════════════════

const C = {thm:'#4f6ef7',def:'#06d6a0',formule:'#f59e0b',prop:'#8b5cf6',methode:'#ec4899'}
const L: Record<string,string> = {thm:'Théorème',def:'Définition',formule:'Formule clé',prop:'Propriété',methode:'Méthode'}

const NAV_ORDER = [
  'suites-limites','nombres-complexes',
  'limites-continuite','derivation-avancee','logarithme-neperien','integration','equations-differentielles',
  'vecteurs-espace','droites-plans',
  'loi-normale','loi-binomiale','echantillonnage',
  'python-avance'
]
const TITRES: Record<string,string> = {
  'suites-limites':'Suites — Limites & Convergence',
  'nombres-complexes':'Nombres complexes',
  'limites-continuite':'Limites & Continuité',
  'derivation-avancee':'Dérivation avancée',
  'logarithme-neperien':'Logarithme népérien',
  'integration':'Intégration',
  'equations-differentielles':'Équations différentielles',
  'vecteurs-espace':'Vecteurs & Repères dans l\'espace',
  'droites-plans':'Droites & Plans',
  'loi-normale':'Loi normale (Gauss)',
  'loi-binomiale':'Loi binomiale B(n,p)',
  'echantillonnage':'Échantillonnage & Estimation',
  'python-avance':'Python avancé & Algorithmique',
}
const SEC_COLOR: Record<string,string> = {
  'suites-limites':'#4f6ef7','nombres-complexes':'#4f6ef7',
  'limites-continuite':'#06d6a0','derivation-avancee':'#06d6a0','logarithme-neperien':'#06d6a0',
  'integration':'#06d6a0','equations-differentielles':'#06d6a0',
  'vecteurs-espace':'#f59e0b','droites-plans':'#f59e0b',
  'loi-normale':'#8b5cf6','loi-binomiale':'#8b5cf6','echantillonnage':'#8b5cf6',
  'python-avance':'#ec4899',
}

const CHAPITRES: Record<string,{
  ch:string;titre:string;badge:string;desc:string;duree:string;section:string;
  theoremes:{id:string;type:string;nom:string;enonce:string}[];
  exercices:{id:string;niveau:string;titre:string;enonce:string;correction:string}[];
}> = {

  'suites-limites': {
    ch:'CH 01',titre:'Suites — Limites & Convergence',badge:'Algèbre',duree:'~5h',section:'Section 1 — Algèbre & Géométrie',
    desc:'Limite finie/infinie, convergence, théorème des gendarmes, suites monotones bornées, arithmético-géométriques.',
    theoremes:[
      {id:'D1',type:'def',nom:'Limite d\'une suite',enonce:'La suite (uₙ) converge vers ℓ (lim uₙ = ℓ) si les termes uₙ sont arbitrairement proches de ℓ pour n assez grand.\nFormellement : ∀ε>0, ∃N∈ℕ, n≥N ⟹ |uₙ−ℓ| < ε.\n\n• Suite divergente : ne converge pas vers un réel fini.\n• lim uₙ = +∞ : les termes deviennent arbitrairement grands.\n• lim uₙ = −∞ : les termes deviennent arbitrairement petits.'},
      {id:'P1',type:'prop',nom:'Opérations sur les limites',enonce:'Si lim uₙ = ℓ et lim vₙ = m (ℓ, m ∈ ℝ) :\nlim (uₙ + vₙ) = ℓ + m\nlim (uₙ × vₙ) = ℓ × m\nlim (uₙ/vₙ) = ℓ/m  (si m ≠ 0)\n\nFormes indéterminées : ∞−∞, 0×∞, ∞/∞, 0/0 → lever l\'indétermination (factoriser, conjugué, taux…).\n\nLimites des suites géométriques : si |q|<1 → qⁿ→0 ; q=1 → qⁿ=1 ; q>1 → qⁿ→+∞ ; q≤−1 → pas de limite.'},
      {id:'T1',type:'thm',nom:'Théorème des gendarmes',enonce:'Si uₙ ≤ wₙ ≤ vₙ pour tout n à partir d\'un certain rang, et si lim uₙ = lim vₙ = ℓ, alors lim wₙ = ℓ.\n\nApplication classique : pour montrer qu\'une suite tend vers 0, l\'encadrer entre deux suites tendant vers 0.\nExemple : 0 ≤ sin(n)/n ≤ 1/n → lim sin(n)/n = 0.'},
      {id:'T2',type:'thm',nom:'Convergence des suites monotones bornées',enonce:'Théorème (admis) :\n• Toute suite croissante et majorée converge.\n• Toute suite décroissante et minorée converge.\n\nCorollaire : pour une suite récurrente uₙ₊₁ = f(uₙ) qui converge vers ℓ, ℓ est un point fixe de f : f(ℓ) = ℓ.'},
      {id:'D2',type:'def',nom:'Suite arithmético-géométrique',enonce:'Une suite arithmético-géométrique vérifie : uₙ₊₁ = a·uₙ + b  (a ≠ 0, a ≠ 1).\n\nMéthode de résolution :\n1. Trouver le point fixe ℓ tel que ℓ = a·ℓ + b → ℓ = b/(1−a).\n2. Poser vₙ = uₙ − ℓ → vₙ est géométrique de raison a.\n3. vₙ = v₀·aⁿ → uₙ = ℓ + (u₀−ℓ)·aⁿ.\n\nComportement : si |a|<1 → uₙ→ℓ ; si |a|>1 → diverge.'},
    ],
    exercices:[
      {id:'EX01',niveau:'Facile',titre:'Limite d\'une suite géométrique',enonce:'Donner la limite de uₙ = (2/3)ⁿ + 5.',correction:'lim (2/3)ⁿ = 0 (car |2/3| < 1). Donc lim uₙ = 0 + 5 = 5.'},
      {id:'EX02',niveau:'Intermédiaire',titre:'Suite arithmético-géométrique',enonce:'uₙ₊₁ = 3uₙ − 4, u₀ = 2. Trouver uₙ et la limite.',correction:'Point fixe : ℓ = 3ℓ−4 → ℓ = 2. vₙ = uₙ−2, v₀=0 → vₙ = 0×3ⁿ = 0 → uₙ = 2 pour tout n. Suite constante ! lim uₙ = 2.'},
      {id:'EX03',niveau:'Intermédiaire',titre:'Gendarmes',enonce:'Montrer que lim (n·cos(n))/n² = 0.',correction:'|cos(n)| ≤ 1 → |n·cos(n)|/n² ≤ n/n² = 1/n. Comme 0 ≤ |uₙ| ≤ 1/n → lim uₙ = 0 (gendarmes).'},
    ],
  },

  'nombres-complexes': {
    ch:'CH 02',titre:'Nombres complexes',badge:'Algèbre',duree:'~6h',section:'Section 1 — Algèbre & Géométrie',
    desc:'Forme algébrique, conjugué, module, argument, formes trigonométrique et exponentielle (Euler), Moivre, racines n-ièmes.',
    theoremes:[
      {id:'D1',type:'def',nom:'Forme algébrique',enonce:'Un nombre complexe z s\'écrit z = a + ib, où a,b ∈ ℝ et i² = −1.\n• a = Re(z) est la partie réelle\n• b = Im(z) est la partie imaginaire\n• Conjugué : z̄ = a − ib\n\nOpérations :\nAddition : (a+ib)+(c+id) = (a+c)+i(b+d)\nMultiplication : (a+ib)(c+id) = (ac−bd)+i(ad+bc)\nInverse : 1/z = z̄/|z|²  (si z ≠ 0)'},
      {id:'F1',type:'formule',nom:'Module et argument',enonce:'Module : |z| = √(a²+b²)  (distance à l\'origine dans le plan complexe)\nArgument : arg(z) = θ tel que cos θ = a/|z| et sin θ = b/|z| (défini à 2kπ près)\n\nPropriétés :\n|z₁·z₂| = |z₁|·|z₂|\narg(z₁·z₂) = arg(z₁) + arg(z₂)  [mod 2π]\n|z̄| = |z|  ;  |1/z| = 1/|z|'},
      {id:'F2',type:'formule',nom:'Formes trigonométrique et exponentielle',enonce:'Forme trigonométrique : z = r(cosθ + i sinθ)  avec r = |z| ≥ 0 et θ = arg(z)\n\nForme exponentielle (Euler) : z = r·eⁱᶿ\n\nFormule d\'Euler : eⁱᶿ = cosθ + i sinθ\n\nPropriété : eⁱᶿ · eⁱᶿ\' = eⁱ⁽ᶿ⁺ᶿ\'⁾\n  → arg(z₁·z₂) = θ₁+θ₂\n  → arg(z₁/z₂) = θ₁−θ₂'},
      {id:'T1',type:'thm',nom:'Formule de Moivre',enonce:'Pour tout entier n ∈ ℤ et tout θ ∈ ℝ :\n(cosθ + i sinθ)ⁿ = cos(nθ) + i sin(nθ)\n\nÉquivalent : (eⁱᶿ)ⁿ = eⁱⁿᶿ\n\nApplication : calcul de cos(2θ) et sin(2θ) en fonction de cosθ et sinθ :\n(cosθ + i sinθ)² = cos²θ − sin²θ + i·2sinθcosθ\n→ cos(2θ) = cos²θ − sin²θ  ;  sin(2θ) = 2sinθcosθ'},
      {id:'F3',type:'formule',nom:'Racines n-ièmes de l\'unité',enonce:'Les solutions de zⁿ = 1 sont les n racines n-ièmes de l\'unité :\nzₖ = eⁱ²ᵏᵖⁱ/ⁿ = cos(2kπ/n) + i sin(2kπ/n)  pour k = 0, 1, …, n−1\n\nElles forment un polygone régulier à n côtés inscrit dans le cercle unité.\n\nRacines carrées de l\'unité : ±1\nRacines cubiques : 1, e^(2iπ/3), e^(4iπ/3)'},
      {id:'D2',type:'def',nom:'Interprétation géométrique',enonce:'Dans le plan complexe (plan d\'Argand) :\n• Tout point M(x,y) ↔ affixe z = x + iy\n• |z₁ − z₂| = distance entre les points d\'affixes z₁ et z₂\n• arg(z₂ − z₁) = angle de rotation de z₁ vers z₂\n\nÉquation du cercle : |z − z₀| = r (centre z₀, rayon r)\nÉquation de la médiatrice : |z − z₁| = |z − z₂|'},
    ],
    exercices:[
      {id:'EX01',niveau:'Facile',titre:'Calcul algébrique',enonce:'Calculer z = (2+3i)(1−i) et trouver |z|.',correction:'z = 2−2i+3i−3i² = 2+i+3 = 5+i. |z| = √(25+1) = √26.'},
      {id:'EX02',niveau:'Facile',titre:'Forme trigonométrique',enonce:'Écrire z = 1+i sous forme trigonométrique.',correction:'|z| = √2. arg(z) = π/4 (1er quadrant, cos=sin=1/√2). z = √2(cos(π/4)+i sin(π/4)) = √2·eⁱᵖⁱ/⁴.'},
      {id:'EX03',niveau:'Intermédiaire',titre:'Formule de Moivre',enonce:'En utilisant (cosθ+i sinθ)³, exprimer cos(3θ) en fonction de cosθ.',correction:'(cosθ+i sinθ)³ = cos³θ − 3cosθsin²θ + i(3cos²θsinθ − sin³θ). Partie réelle : cos(3θ) = cos³θ − 3cosθsin²θ = 4cos³θ − 3cosθ (en utilisant sin²θ=1−cos²θ).'},
    ],
  },

  'limites-continuite': {
    ch:'CH 03',titre:'Limites & Continuité',badge:'Analyse',duree:'~6h',section:'Section 2 — Analyse',
    desc:'Limite en un point, asymptotes, formes indéterminées, croissances comparées, TVI, dichotomie.',
    theoremes:[
      {id:'D1',type:'def',nom:'Limite d\'une fonction en un point',enonce:'lim(x→a) f(x) = ℓ si f(x) est arbitrairement proche de ℓ quand x s\'approche de a (sans atteindre a).\n\nLimite à gauche : lim(x→a⁻) f(x) — x s\'approche de a par valeurs inférieures.\nLimite à droite : lim(x→a⁺) f(x) — x s\'approche par valeurs supérieures.\n\nLa limite en a existe ⟺ les limites à gauche et à droite existent et sont égales.'},
      {id:'D2',type:'def',nom:'Asymptotes',enonce:'• Asymptote verticale x=a : lim(x→a) f(x) = ±∞\n• Asymptote horizontale y=ℓ : lim(x→±∞) f(x) = ℓ\n• Asymptote oblique y=ax+b : lim(x→±∞) [f(x)−(ax+b)] = 0\n  avec a = lim f(x)/x et b = lim [f(x)−ax]'},
      {id:'P1',type:'prop',nom:'Opérations sur les limites & formes indéterminées',enonce:'Règles habituelles : somme, produit, quotient, composée.\n\nFormes indéterminées à lever :\n∞−∞ → factoriser ou conjugué\n0/0 → simplifier ou règle de L\'Hôpital\n∞/∞ → diviser par la puissance dominante\n0×∞ → réécrire en 0/0 ou ∞/∞\n1^∞ → passer au logarithme'},
      {id:'P2',type:'prop',nom:'Croissances comparées (Terminale)',enonce:'Comparaison exponentielles, polynômes, logarithme :\nlim(x→+∞) eˣ/xⁿ = +∞  (exp "gagne" sur toute puissance)\nlim(x→−∞) xⁿeˣ = 0   (exp "écrase" toute puissance)\nlim(x→+∞) (ln x)/xᵅ = 0  (ln "perd" devant toute puissance, α>0)\nlim(x→0⁺) x·ln x = 0\n\nConséquence : pour les limites en ∞, la hiérarchie est : ln ≪ puissances ≪ exp.'},
      {id:'T1',type:'thm',nom:'Théorème des valeurs intermédiaires (TVI)',enonce:'Si f est continue sur [a;b] et si k est un réel strictement compris entre f(a) et f(b), alors il existe au moins un c ∈ ]a;b[ tel que f(c) = k.\n\nCorollaire : si f est continue sur [a;b] et f(a)·f(b) < 0, alors f s\'annule au moins une fois sur ]a;b[.\n\nSi f est de plus strictement monotone : il existe un unique c tel que f(c) = k.'},
      {id:'M1',type:'methode',nom:'Méthode de dichotomie',enonce:'Pour encadrer une solution de f(x)=0 sur [a;b] :\n1. Calculer m = (a+b)/2.\n2. Si f(m) = 0 → solution trouvée.\n3. Si f(a)·f(m) < 0 → recommencer sur [a;m].\n4. Sinon → recommencer sur [m;b].\n5. Répéter jusqu\'à l\'intervalle de précision souhaitée.\n\nChaque étape divise la longueur par 2 → après n étapes : longueur = (b−a)/2ⁿ.'},
    ],
    exercices:[
      {id:'EX01',niveau:'Facile',titre:'Asymptote horizontale',enonce:'Trouver les asymptotes de f(x) = (2x+1)/(x−3).',correction:'Asymptote verticale : x=3 (annule le dénominateur). lim(x→±∞) f(x) = 2 → asymptote horizontale y=2. (Car (2x+1)/(x−3) → 2x/x = 2.)'},
      {id:'EX02',niveau:'Facile',titre:'Croissances comparées',enonce:'Calculer lim(x→+∞) (x²+ln x)/eˣ.',correction:'Par croissances comparées : eˣ "écrase" x² et ln x. lim x²/eˣ = 0 et lim (ln x)/eˣ = 0. Donc lim f(x) = 0.'},
      {id:'EX03',niveau:'Intermédiaire',titre:'TVI — Existence d\'une solution',enonce:'Montrer que f(x) = x³ − 2x + 1 a une racine dans ]−2;−1[.',correction:'f(−2) = −8+4+1 = −3 < 0. f(−1) = −1+2+1 = 2 > 0. f est continue (polynôme) et f(−2)·f(−1) < 0 → par TVI il existe c ∈ ]−2;−1[ tel que f(c)=0. ✓'},
    ],
  },

  'derivation-avancee': {
    ch:'CH 04',titre:'Dérivation avancée',badge:'Analyse',duree:'~4h',section:'Section 2 — Analyse',
    desc:'Dérivée seconde, convexité (f\'\'≥0 ⟺ convexe), points d\'inflexion, théorème des accroissements finis.',
    theoremes:[
      {id:'D1',type:'def',nom:'Dérivée seconde et convexité',enonce:'La dérivée seconde de f est f\'\' = (f\')\'.\n\nDéfinition géométrique de la convexité :\n• f est convexe sur I si sa courbe est au-dessus de toutes ses tangentes sur I.\n• f est concave sur I si sa courbe est en-dessous de toutes ses tangentes sur I.\n\nCritère algébrique :\nf\'\'(x) ≥ 0 sur I ⟺ f est convexe sur I\nf\'\'(x) ≤ 0 sur I ⟺ f est concave sur I'},
      {id:'D2',type:'def',nom:'Point d\'inflexion',enonce:'Un point d\'inflexion est un point où la courbe change de convexité (f\'\' change de signe).\n\nÀ un point d\'inflexion I(a ; f(a)) :\n• f\'\'(a) = 0 et f\'\' change de signe en a.\n• La tangente en I traverse la courbe.\n\nExemple : f(x) = x³ → f\'\'(x) = 6x, change de signe en 0 → inflexion en (0;0).'},
      {id:'T1',type:'thm',nom:'Théorème des accroissements finis (TAF)',enonce:'Si f est continue sur [a;b] et dérivable sur ]a;b[, alors il existe c ∈ ]a;b[ tel que :\nf\'(c) = (f(b) − f(a)) / (b − a)\n\nInterprétation : il existe une tangente à la courbe parallèle à la corde [AB].\n\nInégalité des accroissements finis : si m ≤ f\'(x) ≤ M sur ]a;b[, alors :\nm(b−a) ≤ f(b)−f(a) ≤ M(b−a)'},
    ],
    exercices:[
      {id:'EX01',niveau:'Facile',titre:'Convexité',enonce:'Étudier la convexité de f(x) = eˣ.',correction:'f\'(x) = eˣ, f\'\'(x) = eˣ > 0 pour tout x. f est convexe sur ℝ (pas de point d\'inflexion).'},
      {id:'EX02',niveau:'Intermédiaire',titre:'Point d\'inflexion',enonce:'Trouver les points d\'inflexion de f(x) = x⁴ − 6x².',correction:'f\'(x) = 4x³−12x. f\'\'(x) = 12x²−12 = 12(x−1)(x+1). f\'\' s\'annule en x=±1 et change de signe → points d\'inflexion en x=1 : f(1)=−5, et x=−1 : f(−1)=−5.'},
    ],
  },

  'logarithme-neperien': {
    ch:'CH 05',titre:'Logarithme népérien',badge:'Analyse',duree:'~5h',section:'Section 2 — Analyse',
    desc:'Définition comme primitive de 1/x, propriétés algébriques, étude complète de ln x, croissances comparées.',
    theoremes:[
      {id:'D1',type:'def',nom:'Définition du logarithme népérien',enonce:'La fonction logarithme népérien, notée ln, est l\'unique primitive de x ↦ 1/x sur ℝ₊* qui s\'annule en 1.\nAutrement dit : (ln x)\' = 1/x pour x > 0, et ln(1) = 0.\n\nConséquence : ln est la réciproque de l\'exponentielle :\nln(eˣ) = x pour tout x ∈ ℝ\ne^(ln x) = x pour tout x > 0'},
      {id:'F1',type:'formule',nom:'Propriétés algébriques',enonce:'Pour tous a, b > 0 et tout entier n ∈ ℤ :\nln(a×b) = ln a + ln b\nln(a/b) = ln a − ln b\nln(aⁿ) = n·ln a\nln(√a) = (1/2)·ln a\nln(1/a) = −ln a  ;  ln(1) = 0  ;  ln(e) = 1\n\nImplication : ln a = ln b ⟺ a = b  (stricte croissance)'},
      {id:'P1',type:'prop',nom:'Étude de la fonction ln',enonce:'Domaine : ]0;+∞[\nDérivée : (ln x)\' = 1/x > 0 → strictement croissante sur ]0;+∞[\nSigne : ln x < 0 si 0<x<1 ; ln x = 0 si x=1 ; ln x > 0 si x>1\nLimites : lim(x→0⁺) ln x = −∞  ;  lim(x→+∞) ln x = +∞\nConcavité : (ln x)\'\' = −1/x² < 0 → concave sur ]0;+∞['},
      {id:'P2',type:'prop',nom:'Croissances comparées',enonce:'lim(x→+∞) (ln x)/xᵅ = 0  pour tout α > 0\nlim(x→0⁺) x·ln x = 0\nlim(x→+∞) (ln x)/xⁿ = 0  pour tout n > 0\n\nInterprétation : ln x "grandit moins vite" que toute puissance positive de x.\n\nFormules à connaître :\n(ln u)\' = u\'/u  (dérivée composée, u > 0)\n(ln|u|)\' = u\'/u  sur tout intervalle où u ≠ 0'},
    ],
    exercices:[
      {id:'EX01',niveau:'Facile',titre:'Propriétés algébriques',enonce:'Simplifier : A = ln(6) + ln(3) − ln(9).',correction:'A = ln(6×3) − ln(9) = ln(18/9) = ln(2).'},
      {id:'EX02',niveau:'Facile',titre:'Dérivée composée',enonce:'Calculer la dérivée de f(x) = ln(2x²+1).',correction:'u = 2x²+1, u\' = 4x. f\'(x) = u\'/u = 4x/(2x²+1).'},
      {id:'EX03',niveau:'Intermédiaire',titre:'Étude de fonction',enonce:'Étudier les variations de f(x) = x·ln x sur ]0;+∞[.',correction:'f\'(x) = ln x + x·(1/x) = ln x + 1. f\'(x) = 0 ⟺ ln x = −1 ⟺ x = e⁻¹ = 1/e. f\'(x) < 0 sur ]0;1/e[ (décroissante), f\'(x) > 0 sur ]1/e;+∞[ (croissante). Minimum en x=1/e : f(1/e) = (1/e)×(−1) = −1/e.'},
    ],
  },

  'integration': {
    ch:'CH 06',titre:'Intégration',badge:'Analyse',duree:'~6h',section:'Section 2 — Analyse',
    desc:'Primitives usuelles, intégrale ∫ₐᵇ f(x)dx = F(b)−F(a), Chasles, IPP, changement variable, aires, valeur moyenne.',
    theoremes:[
      {id:'D1',type:'def',nom:'Primitive d\'une fonction',enonce:'F est une primitive de f sur I si F\'(x) = f(x) pour tout x ∈ I.\nToutes les primitives de f diffèrent d\'une constante : F(x) + C.\n\nPrimitives usuelles :\nxⁿ → xⁿ⁺¹/(n+1)  (n ≠ −1)\n1/x → ln|x|\neˣ → eˣ\ncos x → sin x\nsin x → −cos x\n1/√x → 2√x'},
      {id:'F1',type:'formule',nom:'Intégrale définie et relation fondamentale',enonce:'Si F est une primitive de f sur [a;b] :\n∫ₐᵇ f(x)dx = [F(x)]ₐᵇ = F(b) − F(a)\n\nPropriétés :\n• Linéarité : ∫(αf+βg) = α∫f + β∫g\n• Relation de Chasles : ∫ₐᶜ f = ∫ₐᵇ f + ∫ᵦᶜ f\n• Positivité : si f ≥ 0 sur [a;b] → ∫ₐᵇ f ≥ 0\n• ∫ₐᵃ f(x)dx = 0  ;  ∫ᵦᵃ f = −∫ₐᵇ f'},
      {id:'F2',type:'formule',nom:'Intégration par parties (IPP)',enonce:'∫ₐᵇ u\'(x)·v(x) dx = [u(x)·v(x)]ₐᵇ − ∫ₐᵇ u(x)·v\'(x) dx\n\nChoix stratégique : u\' = terme qu\'on "sait intégrer", v = terme qu\'on "sait dériver".\n\nTypiquement :\n∫ xeˣ dx → u\'=eˣ, v=x\n∫ ln x dx → u\'=1, v=ln x\n∫ x·sin x dx → u\'=sin x, v=x'},
      {id:'F3',type:'formule',nom:'Aires et valeur moyenne',enonce:'Aire entre la courbe de f et l\'axe des x sur [a;b] :\nA = ∫ₐᵇ |f(x)| dx  (toujours positive)\n\nAire entre deux courbes (f ≥ g sur [a;b]) :\nA = ∫ₐᵇ [f(x) − g(x)] dx\n\nValeur moyenne de f sur [a;b] :\nm = (1/(b−a)) × ∫ₐᵇ f(x) dx'},
    ],
    exercices:[
      {id:'EX01',niveau:'Facile',titre:'Calcul d\'intégrale',enonce:'Calculer ∫₀² (3x²−2x+1) dx.',correction:'∫₀² (3x²−2x+1) dx = [x³−x²+x]₀² = (8−4+2) − 0 = 6.'},
      {id:'EX02',niveau:'Intermédiaire',titre:'IPP',enonce:'Calculer ∫₀¹ x·eˣ dx.',correction:'u\'=eˣ → u=eˣ ; v=x → v\'=1. ∫₀¹ xeˣ dx = [xeˣ]₀¹ − ∫₀¹ eˣ dx = (1·e−0) − [eˣ]₀¹ = e − (e−1) = 1.'},
      {id:'EX03',niveau:'Intermédiaire',titre:'Valeur moyenne',enonce:'Calculer la valeur moyenne de f(x) = sin x sur [0;π].',correction:'m = (1/π)·∫₀ᵖⁱ sin x dx = (1/π)·[−cos x]₀ᵖⁱ = (1/π)·(−(−1)+1) = 2/π.'},
    ],
  },

  'equations-differentielles': {
    ch:'CH 07',titre:'Équations différentielles',badge:'Analyse',duree:'~4h',section:'Section 2 — Analyse',
    desc:'y\'=ay → y=Ceᵃˣ ; y\'=ay+b → solutions générales ; condition initiale ; modélisations.',
    theoremes:[
      {id:'T1',type:'thm',nom:'Équation y\' = ay (homogène)',enonce:'Les solutions de y\' = ay (a ∈ ℝ) sont les fonctions :\ny(x) = C·eᵃˣ  où C est une constante réelle quelconque.\n\nDémonstration rapide : si y\'=ay, alors (y·e⁻ᵃˣ)\' = y\'e⁻ᵃˣ − ay·e⁻ᵃˣ = 0 → y·e⁻ᵃˣ = C.\n\nCondition initiale y(x₀) = y₀ : C = y₀·e⁻ᵃˣ⁰ → solution unique.'},
      {id:'T2',type:'thm',nom:'Équation y\' = ay + b (a ≠ 0)',enonce:'1. Solution particulière constante yₚ : y\' = 0 → 0 = a·yₚ + b → yₚ = −b/a\n2. Solution de l\'équation homogène associée y\' = ay : yₕ = C·eᵃˣ\n3. Solution générale : y(x) = C·eᵃˣ − b/a\n\nAvec condition initiale y(0) = y₀ :\nC = y₀ + b/a\nDonc y(x) = (y₀ + b/a)·eᵃˣ − b/a'},
      {id:'D1',type:'def',nom:'Modélisations classiques',enonce:'Croissance/décroissance exponentielle : y\'= k·y\n• k > 0 : croissance (population, intérêts composés)\n• k < 0 : décroissance (radioactivité, médicament)\n\nLoi de Newton (refroidissement) : T\'= −k(T − T_ext)\n→ Solution : T(t) = T_ext + (T₀ − T_ext)·e⁻ᵏᵗ\n\nCircuit RC : q\'= −q/(RC) + U/R\n→ Solution : charge ou décharge exponentielle du condensateur.'},
    ],
    exercices:[
      {id:'EX01',niveau:'Facile',titre:'Équation homogène',enonce:'Résoudre y\' = −2y avec y(0) = 5.',correction:'Solution générale : y = Ce⁻²ˣ. Condition initiale : y(0)=5 → C=5. Solution : y(x) = 5e⁻²ˣ.'},
      {id:'EX02',niveau:'Intermédiaire',titre:'Équation complète',enonce:'Résoudre y\' = 3y − 6 avec y(0) = 4.',correction:'yₚ = −(−6)/3 = 2. yₕ = Ce³ˣ. Solution générale : y = Ce³ˣ + 2. y(0)=4 → C+2=4 → C=2. Solution : y(x) = 2e³ˣ + 2.'},
    ],
  },

  'vecteurs-espace': {
    ch:'CH 08',titre:'Vecteurs & Repères dans l\'espace',badge:'Géométrie',duree:'~5h',section:'Section 3 — Géométrie',
    desc:'Vecteurs 3D, relation de Chasles, repère (O;i,j,k), coordonnées, colinéarité, coplanarité, droite paramétrique.',
    theoremes:[
      {id:'D1',type:'def',nom:'Vecteurs de l\'espace',enonce:'Un vecteur de l\'espace est défini par sa direction, son sens et sa norme.\nRelation de Chasles : AB⃗ + BC⃗ = AC⃗\n\nRepère de l\'espace : (O ; i⃗, j⃗, k⃗) — O origine, i⃗, j⃗, k⃗ vecteurs unitaires non coplanaires.\nCoordonnées d\'un vecteur : u⃗(x;y;z) si u⃗ = x·i⃗ + y·j⃗ + z·k⃗\nNorme : ‖u⃗‖ = √(x²+y²+z²)'},
      {id:'D2',type:'def',nom:'Colinéarité et coplanarité',enonce:'Deux vecteurs u⃗ et v⃗ sont colinéaires si v⃗ = k·u⃗ pour un réel k.\nDans un repère : u⃗(a;b;c) et v⃗(a\';b\';c\') colinéaires ⟺ les coordonnées sont proportionnelles.\n\nTrois vecteurs u⃗, v⃗, w⃗ sont coplanaires si l\'un d\'eux est combinaison linéaire des deux autres : w⃗ = αu⃗ + βv⃗.\nTrois points A, B, C coplanaires avec un 4ème point D ⟺ AD⃗ = αAB⃗ + βAC⃗.'},
      {id:'F1',type:'formule',nom:'Représentation paramétrique d\'une droite',enonce:'La droite passant par A(x₀;y₀;z₀) et de vecteur directeur u⃗(a;b;c) a pour représentation paramétrique :\n  x = x₀ + at\n  y = y₀ + bt   avec t ∈ ℝ\n  z = z₀ + ct\n\nPour trouver si un point M appartient à une droite : résoudre le système et vérifier la cohérence.'},
    ],
    exercices:[
      {id:'EX01',niveau:'Facile',titre:'Vecteur et norme',enonce:'A(1;2;−1) et B(4;0;3). Calculer AB⃗ et ‖AB⃗‖.',correction:'AB⃗ = (4−1;0−2;3−(−1)) = (3;−2;4). ‖AB⃗‖ = √(9+4+16) = √29.'},
      {id:'EX02',niveau:'Intermédiaire',titre:'Représentation paramétrique',enonce:'Droite passant par A(1;2;3) et B(3;1;5). Écrire la représentation paramétrique.',correction:'Vecteur directeur AB⃗ = (2;−1;2). Droite : x=1+2t ; y=2−t ; z=3+2t (t∈ℝ).'},
    ],
  },

  'droites-plans': {
    ch:'CH 09',titre:'Droites & Plans — Équations',badge:'Géométrie',duree:'~5h',section:'Section 3 — Géométrie',
    desc:'Équation cartésienne du plan, vecteur normal, positions relatives, orthogonalité, distances.',
    theoremes:[
      {id:'D1',type:'def',nom:'Équation cartésienne d\'un plan',enonce:'Tout plan de l\'espace admet une équation de la forme : ax + by + cz + d = 0  (a,b,c non tous nuls).\n\nVecteur normal au plan : n⃗(a;b;c) est perpendiculaire à tout vecteur du plan.\n\nPlan passant par A(x₀;y₀;z₀) et de vecteur normal n⃗(a;b;c) :\na(x−x₀) + b(y−y₀) + c(z−z₀) = 0'},
      {id:'P1',type:'prop',nom:'Positions relatives',enonce:'Droite et plan :\n• Droite ∥ plan : vecteur directeur ⊥ vecteur normal\n• Droite ⊂ plan : vecteur directeur ⊥ n⃗ ET un point de la droite satisfait l\'équation du plan\n• Droite sécante : résoudre le système\n\nDeux plans :\n• Plans ∥ : vecteurs normaux colinéaires\n• Plans sécants : droite d\'intersection (résoudre le système)'},
      {id:'F1',type:'formule',nom:'Distance point-plan',enonce:'Distance du point M(x₀;y₀;z₀) au plan P : ax+by+cz+d=0 :\nd(M,P) = |ax₀ + by₀ + cz₀ + d| / √(a²+b²+c²)\n\nCette formule généralise en 3D la distance point-droite du plan.'},
    ],
    exercices:[
      {id:'EX01',niveau:'Facile',titre:'Équation d\'un plan',enonce:'Plan passant par A(1;2;3) de vecteur normal n⃗(2;−1;4). Écrire son équation.',correction:'2(x−1)−1(y−2)+4(z−3)=0 → 2x−2−y+2+4z−12=0 → 2x−y+4z−12=0.'},
      {id:'EX02',niveau:'Intermédiaire',titre:'Distance point-plan',enonce:'Calculer la distance du point M(3;1;−2) au plan 2x−y+2z−1=0.',correction:'d = |2×3−1×1+2×(−2)−1| / √(4+1+4) = |6−1−4−1| / 3 = |0| / 3 = 0. M appartient au plan !'},
    ],
  },

  'loi-normale': {
    ch:'CH 10',titre:'Loi normale (Gauss)',badge:'Probas',duree:'~5h',section:'Section 4 — Probabilités',
    desc:'N(μ,σ²), N(0,1), standardisation Z=(X−μ)/σ, symétrie, μ±σ, μ±2σ, approximation binomiale.',
    theoremes:[
      {id:'D1',type:'def',nom:'Loi normale N(μ,σ²)',enonce:'Une variable aléatoire X suit la loi normale N(μ,σ²) si sa densité est :\nf(x) = (1/(σ√(2π)))·exp(−(x−μ)²/(2σ²))\n\nParamètres :\n• μ : espérance (E(X) = μ), position du centre de la courbe en cloche\n• σ² : variance (V(X) = σ²), σ : écart-type, "largeur" de la cloche\n\nLa courbe est symétrique par rapport à x = μ.'},
      {id:'F1',type:'formule',nom:'Loi normale centrée réduite N(0,1)',enonce:'La loi N(0,1) est la loi normale avec μ=0 et σ=1.\nStandardisation : si X suit N(μ,σ²), alors Z = (X−μ)/σ suit N(0,1).\n\nPropriété de symétrie : P(Z ≤ −a) = P(Z ≥ a) = 1 − P(Z ≤ a)\n\nIntervalles usuels (à retenir) :\nP(μ−σ ≤ X ≤ μ+σ) ≈ 0,683 (≈ 68%)\nP(μ−2σ ≤ X ≤ μ+2σ) ≈ 0,954 (≈ 95%)\nP(μ−3σ ≤ X ≤ μ+3σ) ≈ 0,997 (≈ 99,7%)'},
      {id:'T1',type:'thm',nom:'Théorème de Moivre-Laplace (approximation)',enonce:'Si X suit la loi B(n,p) avec n grand, np ≥ 5 et n(1−p) ≥ 5, alors X est approximativement normale :\nX ≈ N(np ; np(1−p))\n\nStandardisation : Z = (X − np) / √(np(1−p)) ≈ N(0,1)\n\nUtilisation : calculer des probabilités de la loi binomiale via la table de la loi normale.'},
    ],
    exercices:[
      {id:'EX01',niveau:'Facile',titre:'Standardisation',enonce:'X suit N(50;16) (μ=50, σ=4). Calculer P(46 ≤ X ≤ 54).',correction:'P(46≤X≤54) = P((46−50)/4 ≤ Z ≤ (54−50)/4) = P(−1≤Z≤1) ≈ 0,683 (68%).'},
      {id:'EX02',niveau:'Intermédiaire',titre:'Probabilité avec table',enonce:'Z suit N(0,1). Calculer P(Z ≤ 1,96).',correction:'D\'après la table de la loi normale : P(Z ≤ 1,96) ≈ 0,975. (Valeur fondamentale à retenir pour les intervalles de confiance à 95%).'},
    ],
  },

  'loi-binomiale': {
    ch:'CH 11',titre:'Loi binomiale B(n,p)',badge:'Probas',duree:'~4h',section:'Section 4 — Probabilités',
    desc:'Bernoulli, schéma de Bernoulli, P(X=k)=C(n,k)pᵏ(1−p)ⁿ⁻ᵏ, E(X)=np, V(X)=np(1−p).',
    theoremes:[
      {id:'D1',type:'def',nom:'Épreuve de Bernoulli',enonce:'Une épreuve de Bernoulli est une expérience aléatoire à deux issues :\n• Succès (prob. p)\n• Échec (prob. 1−p = q)\n\nSchéma de Bernoulli : répéter n fois la même épreuve de Bernoulli de manière indépendante.\nLa variable X = nombre de succès suit la loi binomiale B(n,p).'},
      {id:'F1',type:'formule',nom:'Loi binomiale B(n,p)',enonce:'P(X = k) = C(n,k) × pᵏ × (1−p)ⁿ⁻ᵏ  pour k = 0, 1, …, n\n\nAvec C(n,k) = n! / (k!(n−k)!)  (coefficients binomiaux)\n\nEspérance : E(X) = n·p\nVariance : V(X) = n·p·(1−p)\nÉcart-type : σ(X) = √(n·p·(1−p))\n\nExemple : 10 lancers d\'une pièce équilibrée → X ∼ B(10, 0,5), E(X)=5, V(X)=2,5.'},
    ],
    exercices:[
      {id:'EX01',niveau:'Facile',titre:'Calcul de probabilité',enonce:'X suit B(5, 0,4). Calculer P(X=2).',correction:'P(X=2) = C(5,2)×0,4²×0,6³ = 10×0,16×0,216 = 0,3456.'},
      {id:'EX02',niveau:'Intermédiaire',titre:'Espérance et variance',enonce:'Un QCM a 20 questions, chacune avec 4 choix (une seule bonne réponse). On répond au hasard. Quelle est l\'espérance du nombre de bonnes réponses ?',correction:'X ∼ B(20, 1/4). E(X) = 20×1/4 = 5. V(X) = 20×(1/4)×(3/4) = 3,75.'},
    ],
  },

  'echantillonnage': {
    ch:'CH 12',titre:'Échantillonnage & Estimation',badge:'Probas',duree:'~4h',section:'Section 4 — Probabilités',
    desc:'Intervalle de fluctuation 95%, test de conformité, estimation ponctuelle, intervalle de confiance [f±1/√n].',
    theoremes:[
      {id:'F1',type:'formule',nom:'Intervalle de fluctuation asymptotique (seuil 95%)',enonce:'Si X ∼ B(n,p), la fréquence F = X/n fluctue. Intervalle de fluctuation asymptotique au seuil 95% :\n\nI = [p − 1,96√(p(1−p)/n) ; p + 1,96√(p(1−p)/n)]\n\nApproximation simple (souvent utilisée) : I ≈ [p − 1/√n ; p + 1/√n]\n\nInterprétation : dans 95% des échantillons de taille n, la fréquence observée f est dans I.'},
      {id:'F2',type:'formule',nom:'Intervalle de confiance au seuil 95%',enonce:'On observe une fréquence f dans un échantillon de taille n (n ≥ 30). On estime la proportion p inconnue :\n\nIC₉₅% = [f − 1/√n ; f + 1/√n]\n\nInterprétation : on est "confiant à 95%" que p appartient à cet intervalle.\nDifférence avec fluctuation : fluctuation (p connu) ↔ confiance (p inconnu).'},
      {id:'D1',type:'def',nom:'Test de conformité',enonce:'On teste si une proportion p₀ est conforme à une valeur attendue :\n1. Construire l\'intervalle de fluctuation I au seuil 95% pour p₀.\n2. Observer la fréquence f dans l\'échantillon de taille n.\n3. Si f ∉ I : on rejette l\'hypothèse p = p₀ au seuil de 5%.\n   Si f ∈ I : on ne peut pas rejeter l\'hypothèse.'},
    ],
    exercices:[
      {id:'EX01',niveau:'Facile',titre:'Intervalle de fluctuation',enonce:'Une pièce a P(face)=0,5. Sur n=400 lancers, dans quel intervalle la fréquence de "face" est-elle dans 95% des cas ?',correction:'1/√400 = 1/20 = 0,05. I = [0,5−0,05 ; 0,5+0,05] = [0,45 ; 0,55].'},
      {id:'EX02',niveau:'Intermédiaire',titre:'Intervalle de confiance',enonce:'Sur un échantillon de 900 personnes, 63% ont répondu "oui". Construire un IC95% pour la proportion réelle.',correction:'f=0,63, n=900. 1/√900=1/30≈0,033. IC = [0,63−0,033 ; 0,63+0,033] = [0,597 ; 0,663].'},
    ],
  },

  'python-avance': {
    ch:'CH 13',titre:'Python avancé & Algorithmique',badge:'Info',duree:'~4h',section:'Section 5 — Algorithmique',
    desc:'Récursivité, matrices 2D, visualisation matplotlib, simulation loi binomiale/normale, intégrales numériques.',
    theoremes:[
      {id:'D1',type:'def',nom:'Récursivité en Python',enonce:'Une fonction récursive s\'appelle elle-même.\nToute récursion doit avoir un cas de base (sans appel récursif) et un cas inductif.\n\nExemple — factorielle :\ndef fact(n):\n    if n == 0: return 1  # cas de base\n    return n * fact(n-1)  # cas inductif\n\nExemple — suite de Fibonacci :\ndef fib(n):\n    if n <= 1: return n\n    return fib(n-1) + fib(n-2)'},
      {id:'D2',type:'def',nom:'Matrices en Python (listes 2D)',enonce:'Une matrice est une liste de listes.\n# Matrice 3×3 de zéros\nM = [[0]*3 for _ in range(3)]\nM[i][j]  # accès à l\'élément ligne i, colonne j\n\nMultiplication matricielle :\ndef produit(A, B, n):\n    C = [[0]*n for _ in range(n)]\n    for i in range(n):\n        for j in range(n):\n            for k in range(n):\n                C[i][j] += A[i][k] * B[k][j]\n    return C'},
      {id:'M1',type:'methode',nom:'Calcul approché d\'intégrale (méthode des rectangles)',enonce:'Pour approcher ∫ₐᵇ f(x)dx par la méthode des rectangles avec n subdivisions :\n\ndef integrale_rectangles(f, a, b, n):\n    h = (b - a) / n\n    somme = 0\n    for i in range(n):\n        x = a + i * h\n        somme += f(x) * h\n    return somme\n\nMéthode des trapèzes (plus précise) : remplacer f(x)*h par (f(x)+f(x+h))/2*h.'},
    ],
    exercices:[
      {id:'EX01',niveau:'Facile',titre:'Fonction récursive',enonce:'Écrire une fonction récursive Python calculant la somme 1+2+…+n.',correction:'def somme(n):\n    if n == 0: return 0\n    return n + somme(n-1)\n# somme(5) = 5+4+3+2+1+0 = 15'},
      {id:'EX02',niveau:'Intermédiaire',titre:'Intégrale numérique',enonce:'Approximer ∫₀¹ x² dx avec 1000 rectangles. Comparer avec la valeur exacte.',correction:'# Valeur exacte : [x³/3]₀¹ = 1/3 ≈ 0.333...\ndef f(x): return x**2\nresultat = integrale_rectangles(f, 0, 1, 1000)  # ≈ 0.3328\n# Erreur ≈ 0.0003 → bonne approximation.'},
    ],
  },
}

function TypeBadge({type}:{type:string}) {
  const color = C[type as keyof typeof C]||C.def
  return <span style={{fontSize:11,fontWeight:700,padding:'3px 10px',borderRadius:20,background:`${color}20`,color,border:`1px solid ${color}30`,flexShrink:0}}>{L[type as keyof typeof L]||type}</span>
}

export default function TerminaleGeneraleChapterPage() {
  const params = useParams()
  const slug = params?.slug as string
  const ch = CHAPITRES[slug]
  const [openEx, setOpenEx] = useState<string|null>(null)
  const secColor = SEC_COLOR[slug]||'#f59e0b'

  if (!ch) return (
    <>
      <Navbar />
      <main style={{paddingTop:80,minHeight:'50vh',display:'flex',alignItems:'center',justifyContent:'center'}}>
        <div style={{textAlign:'center'}}>
          <div style={{fontSize:48,marginBottom:16}}>📭</div>
          <h2 style={{marginBottom:12}}>Chapitre non trouvé</h2>
          <Link href="/bac-france/terminale-generale" style={{color:'#fbbf24'}}>← Retour Terminale Générale</Link>
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
        <div style={{borderBottom:'1px solid var(--border)',padding:'14px clamp(20px,5vw,60px)',display:'flex',gap:8,fontSize:13,color:'var(--muted)',alignItems:'center',flexWrap:'wrap'}}>
          <Link href="/bac-france" style={{color:'var(--muted)',textDecoration:'none'}}>Bac France</Link>
          <span>›</span>
          <Link href="/bac-france/terminale-generale" style={{color:'var(--muted)',textDecoration:'none'}}>Terminale Générale</Link>
          <span>›</span>
          <span style={{color:secColor,fontWeight:600}}>{ch.ch} — {ch.titre}</span>
        </div>
        <div className="container" style={{paddingTop:40,paddingBottom:80}}>
          <div style={{display:'grid',gridTemplateColumns:'1fr 275px',gap:32,alignItems:'start'}}>
            <div>
              {/* Header */}
              <div style={{marginBottom:32}}>
                <div style={{display:'flex',gap:8,marginBottom:12,flexWrap:'wrap'}}>
                  <span style={{fontFamily:'var(--font-mono)',fontSize:12,background:'var(--surface2)',color:'var(--muted)',padding:'3px 10px',borderRadius:8}}>Term. Générale · {ch.ch}</span>
                  <span style={{fontSize:12,background:`${secColor}20`,color:secColor,padding:'3px 10px',borderRadius:12,fontWeight:600}}>{ch.badge}</span>
                  <span style={{fontSize:11,background:'rgba(245,158,11,0.1)',color:'#fbbf24',padding:'3px 10px',borderRadius:12}}>Bac 2027 · Coef. 16</span>
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
                        <Link href={`/solve?q=${encodeURIComponent('Terminale Générale France, '+ch.titre+' — '+ex.enonce)}`} className="btn btn-primary" style={{fontSize:12,padding:'6px 14px'}}>
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
                {prevSlug?(<Link href={`/bac-france/terminale-generale/${prevSlug}`} style={{textDecoration:'none'}}>
                  <div className="card" style={{padding:'13px 16px',transition:'transform 0.15s'}} onMouseEnter={e=>e.currentTarget.style.transform='translateY(-2px)'} onMouseLeave={e=>e.currentTarget.style.transform='translateY(0)'}>
                    <div style={{fontSize:11,color:'var(--muted)',marginBottom:3}}>← Précédent</div>
                    <div style={{fontWeight:700,fontSize:13}}>{TITRES[prevSlug]}</div>
                  </div>
                </Link>):<div/>}
                {nextSlug?(<Link href={`/bac-france/terminale-generale/${nextSlug}`} style={{textDecoration:'none'}}>
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
                <div style={{padding:'11px 15px',borderBottom:'1px solid var(--border)',fontSize:11,color:'var(--muted)',fontWeight:700,textTransform:'uppercase',letterSpacing:'0.08em'}}>🎓 Terminale — 13 chapitres</div>
                {NAV_ORDER.map((s,i)=>(
                  <Link key={s} href={`/bac-france/terminale-generale/${s}`} style={{textDecoration:'none'}}>
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
                  <Link href={`/solve?q=${encodeURIComponent('Explique-moi '+ch.titre+' en Terminale Spécialité Maths')}`} className="btn btn-primary" style={{textAlign:'center',fontSize:12}}>
                    🤖 Chat IA — {ch.titre}
                  </Link>
                  <Link href="/simulation" className="btn btn-secondary" style={{textAlign:'center',fontSize:12}}>📋 Exercice type Bac</Link>
                  <Link href="/bac-france/premiere" className="btn btn-secondary" style={{textAlign:'center',fontSize:12}}>📗 Voir Première</Link>
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
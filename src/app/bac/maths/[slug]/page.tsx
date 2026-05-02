'use client'
import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import { useParams } from 'next/navigation'

// ══════════════════════════════════════════════════════════════════════
// SECTION MATHÉMATIQUES / [SLUG]
// Route : /bac/maths/[slug]
// Programme officiel CNP Tunisie — 4ème Mathématiques · Coeff 4
// ══════════════════════════════════════════════════════════════════════

const C = { thm:'#a78bfa', def:'#4f6ef7', formule:'#f5c842', prop:'#06d6a0', corollaire:'#f97316' }
const L: Record<string,string> = { thm:'Théorème', def:'Définition', formule:'Formule clé', prop:'Propriété', corollaire:'Corollaire' }

const NAV_ORDER = [
  'second-degre','complexes','matrices-systemes',
  'suites','limites-continuite','derivation','etude-fonctions',
  'geometrie-plane','geometrie-espace',
  'graphes',
]
const TITRES: Record<string,string> = {
  'second-degre':       'Problèmes du second degré',
  'complexes':          'Nombres Complexes',
  'matrices-systemes':  'Systèmes Linéaires & Matrices',
  'suites':             'Suites Numériques',
  'limites-continuite': 'Limites et Continuité',
  'derivation':         'Dérivation',
  'etude-fonctions':    'Étude de Fonctions',
  'geometrie-plane':    'Géométrie Plane',
  'geometrie-espace':   'Géométrie dans l\'Espace',
  'graphes':            'Graphes & Algorithmique',
}
const NUMS: Record<string,string> = {
  'second-degre':'CH 01','complexes':'CH 02','matrices-systemes':'CH 03',
  'suites':'CH 04','limites-continuite':'CH 05','derivation':'CH 06','etude-fonctions':'CH 07',
  'geometrie-plane':'CH 08','geometrie-espace':'CH 09','graphes':'CH 10',
}
const SEC_COLOR: Record<string,string> = {
  'second-degre':'#a78bfa','complexes':'#a78bfa','matrices-systemes':'#a78bfa',
  'suites':'#4f6ef7','limites-continuite':'#4f6ef7','derivation':'#4f6ef7','etude-fonctions':'#4f6ef7',
  'geometrie-plane':'#06d6a0','geometrie-espace':'#06d6a0',
  'graphes':'#f5c842',
}
const SECTIONS_LABEL: Record<string,string> = {
  'second-degre':'Partie 1 — Algèbre','complexes':'Partie 1 — Algèbre','matrices-systemes':'Partie 1 — Algèbre',
  'suites':'Partie 2 — Analyse','limites-continuite':'Partie 2 — Analyse','derivation':'Partie 2 — Analyse','etude-fonctions':'Partie 2 — Analyse',
  'geometrie-plane':'Partie 3 — Géométrie','geometrie-espace':'Partie 3 — Géométrie',
  'graphes':'Partie 4 — Graphes & Algorithmique',
}
const BADGES: Record<string,string> = {
  'second-degre':'Algèbre','complexes':'Algèbre','matrices-systemes':'Algèbre',
  'suites':'Analyse','limites-continuite':'Analyse','derivation':'Analyse','etude-fonctions':'Analyse',
  'geometrie-plane':'Géométrie','geometrie-espace':'Géométrie',
  'graphes':'Info',
}

const CHAPITRES: Record<string,{
  ch:string; titre:string; badge:string; desc:string; duree:string; section:string;
  theoremes:{id:string;type:string;nom:string;enonce:string;remarque?:string}[];
  exercices:{id:string;niveau:string;titre:string;enonce:string;correction:string}[];
}> = {

  'second-degre': {
    ch:'CH 01', titre:'Problèmes du second degré', badge:'Algèbre', duree:'~5h', section:'Partie 1 — Algèbre',
    desc:'Trinôme ax²+bx+c, discriminant Δ, signe, équations et inéquations du 2nd degré, systèmes linéaires (pivot de Gauss).',
    theoremes:[
      {id:'D1',type:'def',nom:'Trinôme du second degré',
       enonce:'Soit f(x)=ax²+bx+c avec a≠0.\nDiscriminant : Δ=b²−4ac\n\n• Δ>0 : deux racines réelles x₁=(−b−√Δ)/(2a) et x₂=(−b+√Δ)/(2a)\n• Δ=0 : racine double x₀=−b/(2a)\n• Δ<0 : pas de racine réelle\n\nForme canonique : f(x)=a(x+b/(2a))²−Δ/(4a)\nSommet : S(−b/(2a) ; −Δ/(4a))'},
      {id:'P1',type:'prop',nom:'Signe du trinôme',
       enonce:'Si Δ>0 : f(x) a le signe de a à l\'extérieur de [x₁;x₂] et le signe de −a entre x₁ et x₂.\nSi Δ≤0 : f(x) a le signe de a pour tout x∈ℝ.\n\nRelations coefficients-racines :\nx₁+x₂=−b/a\nx₁×x₂=c/a'},
      {id:'F1',type:'formule',nom:'Inéquations du second degré',
       enonce:'Méthode : calculer Δ, trouver les racines, utiliser le tableau de signe.\n\nax²+bx+c≥0 :\n• Si Δ>0 : x≤x₁ ou x≥x₂ (si a>0) ; x₁≤x≤x₂ (si a<0)\n• Si Δ<0 et a>0 : solution = ℝ\n• Si Δ<0 et a<0 : pas de solution\n\nFactorisation : ax²+bx+c = a(x−x₁)(x−x₂)  (si Δ>0)'},
      {id:'D2',type:'def',nom:'Systèmes linéaires — Méthode de Gauss',
       enonce:'Pour résoudre un système de n équations à n inconnues :\n1. Écrire la matrice augmentée [A|b]\n2. Opérations élémentaires sur les lignes (L_i ← L_i − k·L_j)\n3. Remonter le système triangulaire (substitution)\n\nPossibilités : système compatible déterminé (une solution unique), indéterminé (infinité), ou incompatible (pas de solution).'},
    ],
    exercices:[
      {id:'EX01',niveau:'Facile',titre:'Résolution d\'équation',
       enonce:'Résoudre : 2x²−5x+2=0.',
       correction:'Δ=25−16=9. √Δ=3.\nx₁=(5−3)/4=1/2  ;  x₂=(5+3)/4=2.\nSolutions : {1/2 ; 2}.'},
      {id:'EX02',niveau:'Intermédiaire',titre:'Inéquation',
       enonce:'Résoudre : x²−3x+2≤0.',
       correction:'Δ=9−8=1. Racines : x₁=1, x₂=2.\na=1>0 → f(x)≤0 entre les racines.\nSolution : [1;2].'},
    ],
  },

  'complexes': {
    ch:'CH 02', titre:'Nombres Complexes', badge:'Algèbre', duree:'~7h', section:'Partie 1 — Algèbre',
    desc:'Formes algébrique, trigonométrique et exponentielle (Euler), module, argument, formule de Moivre, racines n-ièmes, géométrie complexe.',
    theoremes:[
      {id:'D1',type:'def',nom:'Forme algébrique',
       enonce:'z=a+ib, a,b∈ℝ, i²=−1.\nRe(z)=a ; Im(z)=b ; Conjugué : z̄=a−ib\nz+z̄=2a ; z·z̄=|z|²\n1/z=z̄/|z|²  (si z≠0)'},
      {id:'F1',type:'formule',nom:'Module et argument',
       enonce:'|z|=√(a²+b²)\narg(z)=θ : cosθ=a/|z|, sinθ=b/|z| (mod 2π)\n\n|z₁z₂|=|z₁||z₂| ; arg(z₁z₂)=arg(z₁)+arg(z₂)\n|z₁/z₂|=|z₁|/|z₂| ; arg(z₁/z₂)=arg(z₁)−arg(z₂)'},
      {id:'F2',type:'formule',nom:'Euler et forme exponentielle',
       enonce:'eⁱᶿ=cosθ+i sinθ\nz=r·eⁱᶿ  (r=|z|, θ=arg(z))\n\nLinéarisation :\ncosθ=(eⁱᶿ+e⁻ⁱᶿ)/2\nsinθ=(eⁱᶿ−e⁻ⁱᶿ)/(2i)'},
      {id:'T1',type:'thm',nom:'Formule de Moivre',
       enonce:'(cosθ+i sinθ)ⁿ=cos(nθ)+i sin(nθ)\n\nApplications :\ncos(2θ)=cos²θ−sin²θ ; sin(2θ)=2sinθcosθ\ncos(3θ)=4cos³θ−3cosθ'},
      {id:'F3',type:'formule',nom:'Racines n-ièmes',
       enonce:'Solutions de zⁿ=r·eⁱᵅ :\nzₖ=r^(1/n)·eⁱ⁽ᵅ⁺²ᵏᵖⁱ⁾/ⁿ  (k=0,…,n−1)\n\nRacines de l\'unité : polygone régulier n côtés inscrit dans le cercle |z|=1.'},
      {id:'D2',type:'def',nom:'Géométrie complexe',
       enonce:'|z₁−z₂| = distance entre points d\'affixes z₁ et z₂\narg(z₂−z₁) = angle de la droite z₁z₂\n\nTranslation u⃗(a;b) : z\'=z+a+ib\nRotation angle θ, centre ω : z\'−ω=eⁱᶿ(z−ω)\nHomothetie centre ω, rapport k : z\'−ω=k(z−ω)'},
    ],
    exercices:[
      {id:'EX01',niveau:'Facile',titre:'Forme exponentielle',
       enonce:'Écrire z=−1+i√3 en forme exponentielle.',
       correction:'|z|=√(1+3)=2.\ncosθ=−1/2 ; sinθ=√3/2 → θ=2π/3.\nz=2·e^(2iπ/3).'},
      {id:'EX02',niveau:'Intermédiaire',titre:'Racines cubiques de −8',
       enonce:'Trouver les racines cubiques de −8.',
       correction:'−8=8·eⁱᵖⁱ.\nzₖ=2·e^(i(π+2kπ)/3) pour k=0,1,2.\nz₀=2·eⁱᵖⁱ/³=2(1/2+i√3/2)=1+i√3\nz₁=2·eⁱᵖⁱ=−2\nz₂=2·e^(5iπ/3)=1−i√3'},
    ],
  },

  'matrices-systemes': {
    ch:'CH 03', titre:'Systèmes Linéaires & Matrices', badge:'Algèbre', duree:'~5h', section:'Partie 1 — Algèbre',
    desc:'Opérations matricielles, déterminant d\'ordre 2 et 3 (Sarrus), inverse, systèmes linéaires (Gauss, Cramer).',
    theoremes:[
      {id:'D1',type:'def',nom:'Opérations matricielles',
       enonce:'Matrice A=(aᵢⱼ) de taille m×n.\n\nAddition : (A+B)ᵢⱼ=aᵢⱼ+bᵢⱼ  (même taille)\nMultiplication scalaire : (kA)ᵢⱼ=k·aᵢⱼ\nProduit : (AB)ᵢⱼ=Σₖ aᵢₖ·bₖⱼ  (m×n)×(n×p)=(m×p)\n\nMatrice identité Iₙ : AIn=IₙA=A\nTransposée : (Aᵀ)ᵢⱼ=aⱼᵢ'},
      {id:'F1',type:'formule',nom:'Déterminant',
       enonce:'Ordre 2 : det[[a,b],[c,d]] = ad−bc\n\nOrdre 3 (règle de Sarrus) :\ndet[[a,b,c],[d,e,f],[g,h,i]]\n= aei+bfg+cdh − ceg−afh−bdi\n\nPropriétés :\ndet(AB)=det(A)·det(B)\ndet(Aᵀ)=det(A)\nA inversible ⟺ det(A)≠0'},
      {id:'F2',type:'formule',nom:'Matrice inverse',
       enonce:'Pour A 2×2 : A⁻¹=(1/det(A))·[[d,−b],[−c,a]]\n\nPour A n×n : A⁻¹=(1/det(A))·cof(A)ᵀ\n(cof(A)ᵀ = matrice des cofacteurs transposée)\n\nMéthode pratique (Gauss-Jordan) :\n[A|Iₙ] → opérations élémentaires → [Iₙ|A⁻¹]'},
      {id:'T1',type:'thm',nom:'Systèmes linéaires',
       enonce:'AX=B avec A inversible ⟹ X=A⁻¹B (solution unique)\n\nRègle de Cramer (2×2) :\nx=det([B,A₂])/det(A)  ;  y=det([A₁,B])/det(A)\n(A₁,A₂ colonnes de A)\n\nMéthode de Gauss-Jordan :\nÉcrire [A|B] et réduire par opérations élémentaires.'},
    ],
    exercices:[
      {id:'EX01',niveau:'Facile',titre:'Déterminant 2×2',
       enonce:'Calculer det(A) pour A=[[3,2],[1,4]].',
       correction:'det(A)=3×4−2×1=12−2=10.'},
      {id:'EX02',niveau:'Intermédiaire',titre:'Système de Cramer',
       enonce:'Résoudre : {3x+2y=7 ; x+4y=9}.',
       correction:'A=[[3,2],[1,4]], det(A)=10.\nx=det([[7,2],[9,4]])/10=(28−18)/10=1.\ny=det([[3,7],[1,9]])/10=(27−7)/10=2.\nSolution : (1;2).'},
    ],
  },

  'suites': {
    ch:'CH 04', titre:'Suites Numériques', badge:'Analyse', duree:'~7h', section:'Partie 2 — Analyse',
    desc:'Suites arithmétiques, géométriques, récurrentes (affine, homographique), limite, principe de récurrence, comportement asymptotique.',
    theoremes:[
      {id:'D1',type:'def',nom:'Suites arithmétiques et géométriques',
       enonce:'Arithmétique (raison r) : uₙ₊₁=uₙ+r\n• uₙ=u₀+nr\n• Sₙ=n(u₁+uₙ)/2\n\nGéométrique (raison q≠0) : uₙ₊₁=q·uₙ\n• uₙ=u₀·qⁿ\n• Sₙ=u₁(1−qⁿ)/(1−q) si q≠1\n\nComportement : |q|<1→0 ; q>1→+∞ ; q=1 constante ; q<−1 diverge par oscillation'},
      {id:'T1',type:'thm',nom:'Suite monotone bornée',
       enonce:'• Croissante et majorée → converge\n• Décroissante et minorée → converge\n\nThéorème des gendarmes :\nvₙ≤uₙ≤wₙ et lim vₙ=lim wₙ=ℓ → lim uₙ=ℓ'},
      {id:'D2',type:'def',nom:'Suite récurrente uₙ₊₁=f(uₙ)',
       enonce:'Cas affine : uₙ₊₁=auₙ+b (a≠1)\n• Point fixe ℓ=b/(1−a)\n• Poser vₙ=uₙ−ℓ → géométrique de raison a\n• uₙ=ℓ+(u₀−ℓ)·aⁿ\n\nCas homographique : uₙ₊₁=(auₙ+b)/(cuₙ+d)\n• Point fixe : ℓ²−(a−d)ℓ/c−b/c=0\n• Changement vₙ=1/(uₙ−ℓ) → affine'},
      {id:'T2',type:'thm',nom:'Principe de récurrence',
       enonce:'Pour montrer P(n) pour tout n≥n₀ :\n1. Initialisation : vérifier P(n₀)\n2. Hérédité : supposer P(n) et montrer P(n+1)\n→ P(n) vraie pour tout n≥n₀\n\nRécurrence forte : supposer P(k) pour tous k<n et montrer P(n).'},
    ],
    exercices:[
      {id:'EX01',niveau:'Facile',titre:'Suite géométrique',
       enonce:'uₙ géométrique, u₀=4, q=1/2. Calculer u₄ et lim uₙ.',
       correction:'u₄=4×(1/2)⁴=4/16=1/4.\n|1/2|<1 → lim uₙ=0.'},
      {id:'EX02',niveau:'Intermédiaire',titre:'Suite affine',
       enonce:'uₙ₊₁=2uₙ−3, u₀=1. Exprimer uₙ.',
       correction:'ℓ=3/(1−2)=−3. vₙ=uₙ+3, v₀=4.\nvₙ=4×2ⁿ → uₙ=4×2ⁿ−3.'},
    ],
  },

  'limites-continuite': {
    ch:'CH 05', titre:'Limites et Continuité', badge:'Analyse', duree:'~7h', section:'Partie 2 — Analyse',
    desc:'Limite finie/infinie, TVI, théorème de la bijection, asymptotes, formes indéterminées, croissances comparées.',
    theoremes:[
      {id:'D1',type:'def',nom:'Limite en un point',
       enonce:'lim(x→a) f(x)=ℓ si f(x)→ℓ quand x→a (sans atteindre a).\nLimite à gauche/droite : existent et sont égales → limite existe.\n\nOpérations : somme, produit, quotient (dénominateur ≠0).\nFormes indéterminées : 0/0, ∞/∞, ∞−∞, 0·∞ → lever.'},
      {id:'T1',type:'thm',nom:'Théorème des Valeurs Intermédiaires',
       enonce:'f continue sur [a,b] et k compris entre f(a) et f(b) :\n∃ c∈[a,b] : f(c)=k\n\nCorollaire (unicité) : si f strictement monotone → c unique.\nSi f(a)·f(b)<0 → ∃ racine dans ]a,b[.'},
      {id:'T2',type:'thm',nom:'Théorème de la bijection',
       enonce:'f continue et strictement monotone sur [a,b] :\nf réalise une bijection de [a,b] sur [f(a),f(b)] (ou [f(b),f(a)]).\n→ Pour tout k∈[f(a),f(b)] il existe un unique c tel que f(c)=k.'},
      {id:'D2',type:'def',nom:'Asymptotes',
       enonce:'Verticale x=a : lim(x→a) |f(x)|=+∞\nHorizontale y=ℓ : lim(x→±∞) f(x)=ℓ\nOblique y=ax+b : lim(x→±∞)[f(x)−ax−b]=0\n  avec a=lim f(x)/x et b=lim[f(x)−ax]\n\nBranche parabolique : lim f(x)/x=±∞'},
      {id:'F1',type:'formule',nom:'Croissances comparées',
       enonce:'x→+∞ : eˣ≫xⁿ≫ln x pour tout n>0\nlim eˣ/xⁿ=+∞ ; lim (ln x)/xᵅ=0 (α>0)\nx→0⁺ : lim x·ln x=0\n\nLimites fondamentales :\nlim(x→0) sin x/x=1 ; lim(x→0) (eˣ−1)/x=1'},
    ],
    exercices:[
      {id:'EX01',niveau:'Facile',titre:'Asymptote oblique',
       enonce:'Trouver l\'asymptote oblique de f(x)=(x²+2x)/(x+1).',
       correction:'a=lim f(x)/x=lim(x+2)/(1+1/x)=1.\nb=lim[f(x)−x]=lim[(x²+2x−x(x+1))/(x+1)]=lim[x/(x+1)]=1.\nAsymptote : y=x+1.'},
      {id:'EX02',niveau:'Intermédiaire',titre:'TVI — Existence',
       enonce:'Montrer que x³+x−1=0 a une solution unique dans ]0;1[.',
       correction:'f(x)=x³+x−1 continue.\nf(0)=−1<0 ; f(1)=1>0 → ∃ c∈]0;1[ avec f(c)=0 (TVI).\nf\'(x)=3x²+1>0 → f strictement croissante → c unique.'},
    ],
  },

  'derivation': {
    ch:'CH 06', titre:'Dérivation', badge:'Analyse', duree:'~6h', section:'Partie 2 — Analyse',
    desc:'Nombre dérivé, dérivées usuelles, règles, tangente, approximation affine, théorème de Rolle, TAF, règle de L\'Hôpital.',
    theoremes:[
      {id:'D1',type:'def',nom:'Nombre dérivé et tangente',
       enonce:'f\'(a)=lim(x→a) (f(x)−f(a))/(x−a)\n\nTangente en (a,f(a)) : y=f\'(a)(x−a)+f(a)\nApproximation affine : f(x)≈f(a)+f\'(a)(x−a) au voisinage de a'},
      {id:'F1',type:'formule',nom:'Dérivées usuelles et règles',
       enonce:'(xⁿ)\'=nxⁿ⁻¹ ; (√x)\'=1/(2√x) ; (1/x)\'=−1/x²\n(eˣ)\'=eˣ ; (ln x)\'=1/x\n(sin x)\'=cos x ; (cos x)\'=−sin x ; (tan x)\'=1/cos²x\n(arcsin x)\'=1/√(1−x²) ; (arctan x)\'=1/(1+x²)\n\nRègles : (u+v)\'=u\'+v\' ; (uv)\'=u\'v+uv\'\n(u/v)\'=(u\'v−uv\')/v² ; (f∘g)\'=f\'(g)·g\''},
      {id:'T1',type:'thm',nom:'Théorème de Rolle & TAF',
       enonce:'Rolle : f continue sur [a,b], dérivable sur ]a,b[, f(a)=f(b)\n→ ∃ c∈]a,b[ : f\'(c)=0\n\nTAF : f continue sur [a,b], dérivable sur ]a,b[\n→ ∃ c∈]a,b[ : f\'(c)=(f(b)−f(a))/(b−a)'},
      {id:'T2',type:'thm',nom:'Règle de L\'Hôpital',
       enonce:'Si lim f(x)=lim g(x)=0 (ou ±∞) et lim f\'(x)/g\'(x) existe :\nlim f(x)/g(x) = lim f\'(x)/g\'(x)\n\nConvexité : f\'\'(x)≥0 ⟺ f convexe\nPoint d\'inflexion : f\'\' change de signe.'},
    ],
    exercices:[
      {id:'EX01',niveau:'Facile',titre:'Dérivée composée',
       enonce:'f(x)=sin(3x²+1). Calculer f\'(x).',
       correction:'f\'(x)=6x·cos(3x²+1).'},
      {id:'EX02',niveau:'Intermédiaire',titre:'L\'Hôpital',
       enonce:'Calculer lim(x→0) (eˣ−1−x)/x².',
       correction:'0/0 → L\'Hôpital : lim(eˣ−1)/(2x)=0/0 → lim eˣ/2=1/2.'},
    ],
  },

  'etude-fonctions': {
    ch:'CH 07', titre:'Étude de Fonctions', badge:'Analyse', duree:'~6h', section:'Partie 2 — Analyse',
    desc:'Polynômes (deg 2,3, bicarrées), rationnelles (3 types), irrationnelles, circulaires, logarithme, exponentielle — étude complète.',
    theoremes:[
      {id:'D1',type:'def',nom:'Méthode d\'étude complète',
       enonce:'Plan d\'étude d\'une fonction :\n1. Domaine de définition D_f\n2. Parité/périodicité (si applicable)\n3. Limites aux bornes et asymptotes\n4. Dérivée f\', signe, variations\n5. Tableau de variations\n6. Convexité f\'\', points d\'inflexion\n7. Courbe représentative (repère, points clés)'},
      {id:'F1',type:'formule',nom:'Fonctions polynômes',
       enonce:'Deg 2 : f(x)=ax²+bx+c\n• Sommet S(−b/2a ; −Δ/4a)\n• Factorisation si Δ>0 : a(x−x₁)(x−x₂)\n\nDeg 3 : f(x)=ax³+bx²+cx+d\n• f\'(x)=3ax²+2bx+c\n• Inflexion en −b/(3a)\n\nBicarrée : f(x)=ax⁴+bx²+c\n• Substitution X=x² → aX²+bX+c'},
      {id:'F2',type:'formule',nom:'Fonctions rationnelles',
       enonce:'Type 1 : f(x)=(ax+b)/(cx+d)\n• Centre de symétrie (−d/c ; a/c)\n• Asymptote verticale x=−d/c\n• Asymptote horizontale y=a/c\n\nType 2 : f(x)=(ax²+bx+c)/(dx+e)\n• Division euclidienne → asymptote oblique\n\nType 3 : f(x)=(ax²+bx+c)/(dx²+ex+f)\n• Forme générale, étudier le signe du dénominateur'},
      {id:'F3',type:'formule',nom:'Fonctions irrationnelles et circulaires',
       enonce:'√(ax+b) : domaine ax+b≥0, dérivée a/(2√(ax+b))\n√(ax²+bx+c) : signe du trinôme\n\nCirculaires :\nsin(ax+b) : période 2π/a, amplitude 1\ncos(ax+b) : période 2π/a, amplitude 1\ntan(ax+b) : période π/a, asymptotes\n\nLogarithme ln(f(x)) : domaine f(x)>0\nExponentielle e^(f(x)) : domaine ℝ entier'},
    ],
    exercices:[
      {id:'EX01',niveau:'Intermédiaire',titre:'Étude d\'une rationnelle',
       enonce:'f(x)=(x+1)/(x−2). Trouver asymptotes et tableau de variations.',
       correction:'Asymptote verticale x=2. lim(x→±∞)f(x)=1 → horizontale y=1.\nf\'(x)=(x−2−(x+1))/(x−2)²=−3/(x−2)²<0 pour tout x≠2.\nf décroissante sur ]−∞;2[ et sur ]2;+∞[.'},
      {id:'EX02',niveau:'Intermédiaire',titre:'Bicarrée',
       enonce:'f(x)=x⁴−5x²+4. Trouver les racines.',
       correction:'X=x² : X²−5X+4=0 → (X−1)(X−4)=0.\nX=1 → x=±1 ; X=4 → x=±2.\nRacines : {−2;−1;1;2}.'},
    ],
  },

  'geometrie-plane': {
    ch:'CH 08', titre:'Géométrie Plane', badge:'Géométrie', duree:'~5h', section:'Partie 3 — Géométrie',
    desc:'Vecteurs du plan, colinéarité, droites (équations cartésiennes, réduites), cercles (équation, tangente, intersection).',
    theoremes:[
      {id:'D1',type:'def',nom:'Vecteurs du plan',
       enonce:'u⃗(x;y) dans repère (O;i⃗;j⃗).\n‖u⃗‖=√(x²+y²)\n\nColinéarité : u⃗(x;y)∥v⃗(x\';y\') ⟺ xy\'−yx\'=0\n\nBase du plan : (i⃗;j⃗) deux vecteurs non colinéaires.\nTout vecteur u⃗=xi⃗+yj⃗.'},
      {id:'F1',type:'formule',nom:'Équations de droite',
       enonce:'Droite passant par A(x₀;y₀) de vecteur directeur u⃗(a;b) :\n• Paramétrique : x=x₀+at ; y=y₀+bt\n• Cartésienne : bx−ay+c=0  (c=−bx₀+ay₀)\n• Réduite : y=mx+p  (m=−b/a si a≠0)\n\nDroite passant par A(x₁;y₁) et B(x₂;y₂) :\nm=(y₂−y₁)/(x₂−x₁) puis y−y₁=m(x−x₁)'},
      {id:'F2',type:'formule',nom:'Cercles',
       enonce:'Cercle de centre Ω(a;b) et rayon r :\n(x−a)²+(y−b)²=r²\n\nÉquation générale : x²+y²+dx+ey+f=0\nCentre (−d/2;−e/2) ; rayon r=√(d²/4+e²/4−f)\n\nTangente en M(x₀;y₀) au cercle :\n(x₀−a)(x−a)+(y₀−b)(y−b)=r²'},
      {id:'D2',type:'def',nom:'Positions relatives droite-cercle',
       enonce:'Distance du centre Ω à la droite D :\nd=|aΩ+bΩ+c|/√(a²+b²)  (droite ax+by+c=0)\n\nd<r : droite sécante (2 points)\nd=r : droite tangente (1 point)\nd>r : droite sans intersection'},
    ],
    exercices:[
      {id:'EX01',niveau:'Facile',titre:'Équation d\'une droite',
       enonce:'Droite passant par A(1;2) et B(3;6). Trouver son équation réduite.',
       correction:'m=(6−2)/(3−1)=2. y−2=2(x−1) → y=2x.'},
      {id:'EX02',niveau:'Intermédiaire',titre:'Tangente au cercle',
       enonce:'Cercle (x−1)²+(y−2)²=25. Tangente en M(4;6).',
       correction:'(4−1)(x−1)+(6−2)(y−2)=25 → 3(x−1)+4(y−2)=25 → 3x+4y=36.'},
    ],
  },

  'geometrie-espace': {
    ch:'CH 09', titre:'Géométrie dans l\'Espace', badge:'Géométrie', duree:'~7h', section:'Partie 3 — Géométrie',
    desc:'Vecteurs 3D, bases, produit scalaire, vectoriel, droites et plans (équations), positions relatives, distances, sphères.',
    theoremes:[
      {id:'D1',type:'def',nom:'Vecteurs et bases de l\'espace',
       enonce:'Vecteur u⃗(x;y;z) dans repère orthonormé (O;i⃗;j⃗;k⃗).\n‖u⃗‖=√(x²+y²+z²)\n\nBase : 3 vecteurs non coplanaires.\nColinéarité : u⃗∥v⃗ ⟺ v⃗=k·u⃗\nCoplanarité de 3 vecteurs : det=0'},
      {id:'F1',type:'formule',nom:'Produit scalaire',
       enonce:'u⃗·v⃗=xx\'+yy\'+zz\'=‖u⃗‖‖v⃗‖cosθ\nu⃗⊥v⃗ ⟺ u⃗·v⃗=0\n‖u⃗‖²=u⃗·u⃗\n(u⃗+v⃗)²=‖u⃗‖²+2u⃗·v⃗+‖v⃗‖²'},
      {id:'F2',type:'formule',nom:'Produit vectoriel',
       enonce:'u⃗∧v⃗=(y₁z₂−z₁y₂ ; z₁x₂−x₁z₂ ; x₁y₂−y₁x₂)\n\nu⃗∧v⃗⊥u⃗ et ⊥v⃗\n‖u⃗∧v⃗‖=‖u⃗‖‖v⃗‖|sinθ|\nu⃗∥v⃗ ⟺ u⃗∧v⃗=0⃗\n\nProduit mixte : (u⃗∧v⃗)·w⃗ = volume du parallélépipède'},
      {id:'D2',type:'def',nom:'Plans et droites',
       enonce:'Plan ax+by+cz+d=0, vecteur normal n⃗(a;b;c)\nPlan passant par A(x₀;y₀;z₀), normale n⃗ :\na(x−x₀)+b(y−y₀)+c(z−z₀)=0\n\nDroite passant par A, vecteur directeur u⃗(a;b;c) :\n{x=x₀+at ; y=y₀+bt ; z=z₀+ct}\n\nSphère centre Ω(a;b;c), rayon r :\n(x−a)²+(y−b)²+(z−c)²=r²'},
      {id:'F3',type:'formule',nom:'Distances',
       enonce:'Point M → plan ax+by+cz+d=0 :\nd=|ax₀+by₀+cz₀+d|/√(a²+b²+c²)\n\nPoint M → droite D (A∈D, u⃗ directeur) :\nd=‖AM⃗∧u⃗‖/‖u⃗‖'},
    ],
    exercices:[
      {id:'EX01',niveau:'Facile',titre:'Équation d\'un plan',
       enonce:'Plan passant par A(2;1;3), normale n⃗(1;−2;1). Équation.',
       correction:'1(x−2)−2(y−1)+1(z−3)=0 → x−2y+z−3=0.'},
      {id:'EX02',niveau:'Intermédiaire',titre:'Distance point-plan',
       enonce:'Distance de M(1;2;3) au plan 2x−y+2z−6=0.',
       correction:'d=|2−2+6−6|/√(4+1+4)=|0|/3=0. M est dans le plan !'},
    ],
  },

  'graphes': {
    ch:'CH 10', titre:'Graphes & Algorithmique', badge:'Info', duree:'~4h', section:'Partie 4 — Graphes & Algorithmique',
    desc:'Définitions, théorème d\'Euler, chaînes eulériennes, algorithme de Dijkstra, matrice d\'adjacence, graphes orientés, graphes probabilistes.',
    theoremes:[
      {id:'D1',type:'def',nom:'Vocabulaire des graphes',
       enonce:'Graphe G=(S,A) : S=sommets, A=arêtes.\nOrdre : |S|. Degré d(v)=nombre d\'arêtes incidentes à v.\n\nChaîne : suite de sommets reliés par des arêtes.\nCycle : chaîne dont le départ = arrivée.\nGraphe connexe : toute paire de sommets est reliée par une chaîne.\n\nMatrice d\'adjacence : M[i][j]=nb d\'arêtes entre i et j.'},
      {id:'T1',type:'thm',nom:'Théorème d\'Euler',
       enonce:'Un graphe connexe admet une chaîne eulérienne (passant par chaque arête une fois) ⟺ il a exactement 0 ou 2 sommets de degré impair.\n\nCircuit eulérien (chaîne eulérienne fermée) ⟺ tous les sommets ont un degré pair.\n\nSomme des degrés = 2×|A|  (lemme des poignées de mains)'},
      {id:'D2',type:'def',nom:'Algorithme de Dijkstra',
       enonce:'Trouve le plus court chemin d\'un sommet source s à tous les autres sommets (poids positifs).\n\nAlgorithme :\n1. dist[s]=0 ; dist[v]=∞ pour tout v≠s\n2. Non visités = tous les sommets\n3. Choisir u = sommet non visité à dist minimale\n4. Pour chaque voisin v de u :\n   si dist[u]+poids(u,v)<dist[v] → mettre à jour dist[v]\n5. Marquer u comme visité\n6. Répéter jusqu\'à ce que tous soient visités'},
      {id:'D3',type:'def',nom:'Graphe probabiliste',
       enonce:'Graphe orienté où chaque sommet représente un état.\nLes arêtes portent des probabilités de transition.\nLa somme des probabilités sortantes de chaque sommet = 1.\n\nMatrice de transition M : Mᵢⱼ = probabilité de passer de l\'état i à j.\nÉtat au temps n+1 : P(n+1)=P(n)·M\nÉtat stable π : π=π·M (distribution stationnaire)'},
    ],
    exercices:[
      {id:'EX01',niveau:'Facile',titre:'Degrés et Euler',
       enonce:'Graphe à 4 sommets A,B,C,D. Arêtes : AB, AC, AD, BC, BD. Vérifier s\'il admet une chaîne eulérienne.',
       correction:'degrés : d(A)=3, d(B)=3, d(C)=2, d(D)=2.\n2 sommets de degré impair (A et B) → admet une chaîne eulérienne de A à B (ou B à A).'},
      {id:'EX02',niveau:'Intermédiaire',titre:'Dijkstra',
       enonce:'Graphe : A−(3)−B, A−(5)−C, B−(2)−C, B−(4)−D, C−(1)−D. Plus court chemin de A à D.',
       correction:'A:0 ; B:3 ; C:min(5,3+2)=5 ; D:min(3+4,5+1)=6.\nChemin A→B→C→D=6 (ou A→B→D=7 → A→C→D=6).\nPlus court chemin : A→B→C→D, longueur 6.'},
    ],
  },
}

function TypeBadge({type}:{type:string}) {
  const color = C[type as keyof typeof C]||C.def
  return <span style={{fontSize:11,fontWeight:700,padding:'3px 10px',borderRadius:20,background:`${color}20`,color,border:`1px solid ${color}30`,flexShrink:0}}>{L[type as keyof typeof L]||type}</span>
}

export default function MathsSlugPage() {
  const params = useParams()
  const slug = params?.slug as string
  const ch = CHAPITRES[slug]
  const [openEx, setOpenEx] = useState<string|null>(null)
  const secColor = SEC_COLOR[slug]||'#4f6ef7'
  const idx = NAV_ORDER.indexOf(slug)
  const prevSlug = idx>0 ? NAV_ORDER[idx-1] : null
  const nextSlug = idx<NAV_ORDER.length-1 ? NAV_ORDER[idx+1] : null

  if (!ch) return (
    <><Navbar />
      <main style={{paddingTop:80,minHeight:'50vh',display:'flex',alignItems:'center',justifyContent:'center'}}>
        <div style={{textAlign:'center'}}>
          <div style={{fontSize:48,marginBottom:16}}>📭</div>
          <h2 style={{marginBottom:12}}>Chapitre non trouvé</h2>
          <Link href="/bac/maths" style={{color:'#4f6ef7'}}>← Retour Section Mathématiques</Link>
        </div>
      </main><Footer /></>
  )

  return (
    <><Navbar />
      <main style={{position:'relative',zIndex:1,paddingTop:80}}>
        <div style={{borderBottom:'1px solid var(--border)',padding:'14px clamp(20px,5vw,60px)',display:'flex',gap:8,fontSize:13,color:'var(--muted)',alignItems:'center',flexWrap:'wrap'}}>
          <Link href="/bac" style={{color:'var(--muted)',textDecoration:'none'}}>Bac</Link><span>›</span>
          <Link href="/bac/maths" style={{color:'var(--muted)',textDecoration:'none'}}>Section Mathématiques</Link><span>›</span>
          <span style={{color:secColor,fontWeight:600}}>{ch.ch} — {ch.titre}</span>
        </div>
        <div className="container" style={{paddingTop:40,paddingBottom:80}}>
          <div style={{display:'grid',gridTemplateColumns:'1fr 275px',gap:32,alignItems:'start'}}>
            <div>
              {/* Header */}
              <div style={{marginBottom:32}}>
                <div style={{display:'flex',gap:8,marginBottom:12,flexWrap:'wrap'}}>
                  <span style={{fontFamily:'var(--font-mono)',fontSize:12,background:'var(--surface2)',color:'var(--muted)',padding:'3px 10px',borderRadius:8}}>Sc. Maths · {ch.ch}</span>
                  <span style={{fontSize:12,background:`${secColor}20`,color:secColor,padding:'3px 10px',borderRadius:12,fontWeight:600}}>{ch.badge}</span>
                  <span style={{fontSize:11,background:'rgba(79,110,247,0.1)',color:'#4f6ef7',padding:'3px 10px',borderRadius:12}}>Bac Tunisie · Coef. 4</span>
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
              <div style={{display:'flex',gap:8,flexWrap:'wrap',alignItems:'center',marginBottom:24,padding:'10px 14px',background:'var(--surface)',borderRadius:12,border:'1px solid var(--border)'}}>
                <span style={{fontSize:12,color:'var(--muted)',marginRight:4}}>Légende :</span>
                {Object.entries(L).map(([k,v])=>(<span key={k} style={{fontSize:11,padding:'2px 10px',borderRadius:20,background:`${C[k as keyof typeof C]}18`,color:C[k as keyof typeof C],border:`1px solid ${C[k as keyof typeof C]}25`,fontWeight:600}}>{v}</span>))}
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
                          <div style={{fontWeight:700,fontSize:14}}>{t.nom}</div>
                          <TypeBadge type={t.type}/>
                        </div>
                        <div style={{fontSize:13,color:'var(--text2)',lineHeight:1.8,whiteSpace:'pre-line',fontFamily:t.type==='formule'?'var(--font-mono)':'inherit'}}>{t.enonce}</div>
                        {t.remarque&&(<div style={{marginTop:10,paddingLeft:12,borderLeft:'2px solid rgba(245,200,66,0.5)',fontSize:12,color:'rgba(245,200,66,0.9)',fontStyle:'italic',lineHeight:1.6}}>⚡ {t.remarque}</div>)}
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
                          <span style={{fontWeight:600,fontSize:14}}>{ex.titre}</span>
                        </div>
                        <p style={{fontSize:13,color:'var(--text2)',margin:0,lineHeight:1.6,whiteSpace:'pre-line'}}>{ex.enonce}</p>
                      </div>
                      <div style={{borderTop:'1px solid var(--border)',padding:'10px 20px',display:'flex',gap:10,flexWrap:'wrap'}}>
                        <Link href={`/solve?q=${encodeURIComponent('Bac Tunisie Sc.Maths, '+ch.titre+' — '+ex.enonce)}`} className="btn btn-primary" style={{fontSize:12,padding:'6px 14px'}}>🧮 Résoudre avec IA</Link>
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
              {/* Nav prev/next */}
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,borderTop:'1px solid var(--border)',paddingTop:22}}>
                {prevSlug?(<Link href={`/bac/maths/${prevSlug}`} style={{textDecoration:'none'}}><div className="card" style={{padding:'13px 16px',transition:'transform 0.15s'}} onMouseEnter={e=>e.currentTarget.style.transform='translateY(-2px)'} onMouseLeave={e=>e.currentTarget.style.transform='translateY(0)'}><div style={{fontSize:11,color:'var(--muted)',marginBottom:3}}>← Précédent</div><div style={{fontWeight:700,fontSize:13}}>{TITRES[prevSlug]}</div></div></Link>):<div/>}
                {nextSlug?(<Link href={`/bac/maths/${nextSlug}`} style={{textDecoration:'none'}}><div className="card" style={{padding:'13px 16px',textAlign:'right',transition:'transform 0.15s'}} onMouseEnter={e=>e.currentTarget.style.transform='translateY(-2px)'} onMouseLeave={e=>e.currentTarget.style.transform='translateY(0)'}><div style={{fontSize:11,color:'var(--muted)',marginBottom:3}}>Suivant →</div><div style={{fontWeight:700,fontSize:13}}>{TITRES[nextSlug]}</div></div></Link>):<div/>}
              </div>
            </div>
            {/* Sidebar */}
            <aside style={{position:'sticky',top:88}}>
              <div style={{background:'var(--surface)',border:'1px solid var(--border)',borderRadius:16,overflow:'hidden',marginBottom:14}}>
                <div style={{padding:'11px 15px',borderBottom:'1px solid var(--border)',fontSize:11,color:'var(--muted)',fontWeight:700,textTransform:'uppercase',letterSpacing:'0.08em'}}>📐 Sc. Maths · 10 chapitres</div>
                {[
                  {label:'Partie 1 — Algèbre', slugs:NAV_ORDER.slice(0,3)},
                  {label:'Partie 2 — Analyse', slugs:NAV_ORDER.slice(3,7)},
                  {label:'Partie 3 — Géométrie', slugs:NAV_ORDER.slice(7,9)},
                  {label:'Partie 4 — Graphes', slugs:NAV_ORDER.slice(9)},
                ].map(group=>(
                  <div key={group.label}>
                    <div style={{padding:'7px 15px 3px',fontSize:10,color:'var(--muted)',fontWeight:700,textTransform:'uppercase',letterSpacing:'0.1em',background:'rgba(255,255,255,0.02)'}}>{group.label}</div>
                    {group.slugs.map((s,i)=>(
                      <Link key={s} href={`/bac/maths/${s}`} style={{textDecoration:'none'}}>
                        <div style={{padding:'8px 15px',borderBottom:'1px solid var(--border)',background:s===slug?`${SEC_COLOR[s]}12`:'transparent',borderLeft:s===slug?`3px solid ${SEC_COLOR[s]}`:'3px solid transparent',transition:'all 0.15s'}}
                          onMouseEnter={e=>{if(s!==slug)e.currentTarget.style.background='rgba(255,255,255,0.03)'}}
                          onMouseLeave={e=>{if(s!==slug)e.currentTarget.style.background='transparent'}}>
                          <div style={{fontSize:10,color:'var(--muted)',marginBottom:1,fontFamily:'var(--font-mono)'}}>{NUMS[s]}</div>
                          <div style={{fontSize:11,fontWeight:s===slug?700:400,color:s===slug?SEC_COLOR[s]:'var(--text2)'}}>{TITRES[s]}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
              <div style={{background:'var(--surface)',border:'1px solid var(--border)',borderRadius:13,padding:'14px'}}>
                <div style={{fontSize:11,color:'var(--muted)',fontWeight:700,textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:10}}>Actions</div>
                <div style={{display:'flex',flexDirection:'column',gap:7}}>
                  <Link href={`/solve?q=${encodeURIComponent('Explique-moi '+ch.titre+' Section Maths Bac Tunisie')}`} className="btn btn-primary" style={{textAlign:'center',fontSize:12}}>🤖 Chat IA — {ch.titre}</Link>
                  <Link href="/examens" className="btn btn-secondary" style={{textAlign:'center',fontSize:12}}>📋 Exercice type Bac</Link>
                  <Link href="/bac/maths" className="btn btn-secondary" style={{textAlign:'center',fontSize:12}}>← Retour Section Maths</Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
      <style>{`@media(max-width:900px){div[style*="grid-template-columns: 1fr 275px"]{grid-template-columns:1fr!important;}aside{display:none;}}`}</style>
    </>
  )
}
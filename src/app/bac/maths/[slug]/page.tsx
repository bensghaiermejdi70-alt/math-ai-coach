'use client'
import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import { useParams } from 'next/navigation'

// ══════════════════════════════════════════════════════════════════════
// SECTION MATHÉMATIQUES — [SLUG] DÉTAIL COMPLET
// Route : /bac/maths/[slug]
// Programme officiel CNP Tunisie — 4ème Mathématiques · Coeff 4
// Structure identique à physique terminale France : souschapitres + blocs
// ══════════════════════════════════════════════════════════════════════

const C = { thm:'#a78bfa', def:'#4f6ef7', formule:'#f5c842', prop:'#06d6a0', methode:'#ec4899', corollaire:'#f97316' }
const L: Record<string,string> = { thm:'Théorème', def:'Définition', formule:'Formule clé', prop:'Propriété', methode:'Méthode', corollaire:'Corollaire' }

const NAV_ORDER = [
  'complexes','arithmetique',
  'suites','limites-continuite','derivation','fonctions-reciproques',
  'logarithme','exponentielle','calcul-integral','equations-differentielles',
  'geometrie-espace','isometries-similitudes','coniques',
  'probabilites-discretes','probabilites-continues',
  'graphes',
]
const TITRES_NAV: Record<string,string> = {
  'complexes':               'CH 01 — Complexes',
  'arithmetique':            'CH 02 — Arithmétique ℤ',
  'suites':                  'CH 03 — Suites',
  'limites-continuite':      'CH 04 — Limites & Continuité',
  'derivation':              'CH 05 — Dérivabilité',
  'fonctions-reciproques':   'CH 06 — Fonctions réciproques',
  'logarithme':              'CH 07 — Logarithme',
  'exponentielle':           'CH 08 — Exponentielle',
  'calcul-integral':         'CH 09 — Calcul intégral',
  'equations-differentielles':'CH 10 — Éq. différentielles',
  'geometrie-espace':        'CH 11 — Géométrie espace',
  'isometries-similitudes':  'CH 12 — Isométries',
  'coniques':                'CH 13 — Coniques',
  'probabilites-discretes':  'CH 14 — Probas discrètes',
  'probabilites-continues':  'CH 15 — Loi normale',
  'graphes':                 'CH 16 — Graphes',
}
const SEC_COLORS: Record<string,string> = {
  'complexes':'#a78bfa','arithmetique':'#a78bfa',
  'suites':'#4f6ef7','limites-continuite':'#4f6ef7','derivation':'#4f6ef7',
  'fonctions-reciproques':'#4f6ef7','logarithme':'#4f6ef7','exponentielle':'#4f6ef7',
  'calcul-integral':'#4f6ef7','equations-differentielles':'#4f6ef7',
  'geometrie-espace':'#06d6a0','isometries-similitudes':'#06d6a0','coniques':'#06d6a0',
  'probabilites-discretes':'#f43f5e','probabilites-continues':'#f43f5e',
  'graphes':'#f5c842',
}

// ══════════════════════════════════════════════════════════════════════
// TYPE
// ══════════════════════════════════════════════════════════════════════
type Thm  = { id:string; type:string; nom:string; enonce:string; remarque?:string }
type Exo  = { id:string; niveau:string; titre:string; enonce:string; correction:string }
type Bloc = { notion:string; theoremes:Thm[]; exercices:Exo[] }
type SC   = { id:string; titre:string; notions:string[]; blocs:Bloc[] }
type Chap = { id:string; titre:string; badge:string; color:string; emoji:string; desc:string; souschapitres:SC[] }

// ══════════════════════════════════════════════════════════════════════
// DONNÉES — 10 CHAPITRES COMPLETS
// ══════════════════════════════════════════════════════════════════════
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ALL_CHAPTERS: Record<string, any> = {

// ─────────────────────────────────────────────────────────────────────
// CH 01 — SECOND DEGRÉ
// ─────────────────────────────────────────────────────────────────────
'second-degre': {
  id:'second-degre', emoji:'🔢', badge:'Algèbre', color:'#a78bfa',
  titre:'Problèmes du second degré',
  desc:"Trinôme ax²+bx+c, discriminant, forme canonique, signe, équations, inéquations et systèmes linéaires (pivot de Gauss).",
  souschapitres:[
    {
      id:'sc-trinome', titre:'1.1 Trinôme du second degré',
      notions:['Discriminant Δ=b²−4ac','Racines réelles (Δ>0, =0, <0)','Forme canonique et sommet','Relations coefficients-racines'],
      blocs:[
        {
          notion:'📐 Discriminant et racines',
          theoremes:[
            { id:'D-SD1', type:'def', nom:'Trinôme et discriminant',
              enonce:"Soit f(x)=ax²+bx+c avec a≠0 (trinôme du second degré).\nDiscriminant : Δ = b²−4ac\n\n• Δ > 0 : deux racines réelles distinctes\n  x₁ = (−b−√Δ)/(2a)  et  x₂ = (−b+√Δ)/(2a)\n\n• Δ = 0 : une racine double (réelle)\n  x₀ = −b/(2a)\n\n• Δ < 0 : pas de racine réelle\n  (mais deux racines complexes conjuguées)"},
            { id:'F-SD1', type:'formule', nom:'Forme canonique et sommet',
              enonce:"f(x) = a(x − α)² + β\n\nα = −b/(2a)   (abscisse du sommet)\nβ = −Δ/(4a)  = f(α)  (ordonnée du sommet)\n\nSommet S(α ; β) = extremum de la parabole :\n• a > 0 : minimum en S\n• a < 0 : maximum en S\n\nForte utilisation pour résoudre les problèmes d'optimisation." },
            { id:'P-SD1', type:'prop', nom:'Relations coefficients-racines',
              enonce:"Si x₁ et x₂ sont les deux racines de ax²+bx+c=0 :\n\nx₁ + x₂ = −b/a\nx₁ × x₂ = c/a\n\nFactorisation : ax²+bx+c = a(x−x₁)(x−x₂)  (si Δ>0)\n\nRecherche de trinôme connaissant les racines :\nx²−(x₁+x₂)x + x₁x₂ = 0",
              remarque:"Ces relations permettent souvent d'éviter de calculer √Δ." },
          ],
          exercices:[
            { id:'EX-SD1', niveau:'Facile', titre:"Résolution d'équation",
              enonce:'Résoudre dans ℝ : 2x²−5x+2=0.',
              correction:'Δ=25−16=9 > 0. √Δ=3.\nx₁=(5−3)/4=1/2  ;  x₂=(5+3)/4=2.\nS={1/2 ; 2}.' },
            { id:'EX-SD2', niveau:'Intermédiaire', titre:'Forme canonique',
              enonce:'Écrire f(x)=2x²−8x+5 sous forme canonique et donner le sommet.',
              correction:'α=8/(2×2)=2  ;  β=f(2)=8−16+5=−3.\nf(x)=2(x−2)²−3.\nSommet : S(2;−3). Minimum car a=2>0.' },
            { id:'EX-SD3', niveau:'Difficile', titre:'Problème de relations',
              enonce:"Les racines x₁,x₂ de x²−5x+k=0 vérifient x₁²+x₂²=13. Trouver k.",
              correction:'x₁+x₂=5, x₁x₂=k.\nx₁²+x₂²=(x₁+x₂)²−2x₁x₂=25−2k=13\n→ 2k=12 → k=6.' },
          ]
        },
        {
          notion:'📊 Signe du trinôme et inéquations',
          theoremes:[
            { id:'P-SD2', type:'prop', nom:'Tableau de signe du trinôme',
              enonce:"f(x) = ax²+bx+c (a>0)\n\nSi Δ>0 :\n  x  | −∞   x₁       x₂   +∞\n  f  |  +    0    −    0    +\n\nSi Δ=0 :\n  f(x) ≥ 0 pour tout x (nul en x₀)\n\nSi Δ<0 :\n  f(x) > 0 pour tout x (même signe que a)" },
            { id:'M-SD1', type:'methode', nom:'Résoudre une inéquation du second degré',
              enonce:"1. Mettre sous la forme ax²+bx+c [≥] 0\n2. Calculer Δ et les racines si Δ>0\n3. Dresser le tableau de signe\n4. Lire la solution\n\nExemple : x²−3x+2 ≤ 0\nΔ=1, x₁=1, x₂=2, a=1>0\nf(x)≤0 ↔ x∈[1;2]" },
          ],
          exercices:[
            { id:'EX-SD4', niveau:'Facile', titre:'Inéquation',
              enonce:'Résoudre : x²−3x+2 ≤ 0.',
              correction:'Δ=9−8=1. x₁=1, x₂=2. a>0.\nf≤0 entre les racines : S=[1;2].' },
            { id:'EX-SD5', niveau:'Intermédiaire', titre:'Inéquation avec paramètre',
              enonce:"Pour quelles valeurs de k l'équation x²−2kx+k+2=0 a-t-elle deux racines réelles distinctes ?",
              correction:'Δ=4k²−4(k+2)>0\n4k²−4k−8>0\nk²−k−2>0\n(k−2)(k+1)>0\nk∈]−∞;−1[∪]2;+∞[.' },
          ]
        },
      ]
    },
    {
      id:'sc-gauss', titre:'1.2 Systèmes linéaires — Méthode de Gauss',
      notions:['Matrice augmentée [A|b]','Opérations élémentaires sur lignes','Forme triangulaire et remontée','3 types de systèmes'],
      blocs:[
        {
          notion:'⚙️ Pivot de Gauss',
          theoremes:[
            { id:'M-GA1', type:'methode', nom:'Algorithme du pivot de Gauss',
              enonce:"Pour résoudre AX=b (n équations, n inconnues) :\n\n1. Écrire la matrice augmentée [A|b]\n2. Opérations élémentaires sur les lignes :\n   • Lᵢ ← Lᵢ − k·Lⱼ  (éliminer un terme)\n   • Lᵢ ↔ Lⱼ  (permuter)\n   • Lᵢ ← k·Lᵢ  (normaliser, k≠0)\n3. Obtenir forme triangulaire (ou échelon)\n4. Remonter par substitution\n\nPossibilités :\n  • Système déterminé : rang = n → solution unique\n  • Système indéterminé : rang < n → infinité de solutions\n  • Système incompatible : 0=c (c≠0) → aucune solution" },
          ],
          exercices:[
            { id:'EX-GA1', niveau:'Intermédiaire', titre:'Système 2×2',
              enonce:'Résoudre : { 3x+2y=7 ; x+4y=9 }.',
              correction:'[3,2|7] ; [1,4|9]\nL₁↔L₂ : [1,4|9] ; [3,2|7]\nL₂←L₂−3L₁ : [1,4|9] ; [0,−10|−20]\ny=2. x=9−8=1.\nSolution : (1;2).' },
            { id:'EX-GA2', niveau:'Difficile', titre:'Système 3×3',
              enonce:'Résoudre : { x+y+z=6 ; 2x−y+z=3 ; x+2y−z=2 }.',
              correction:'[1,1,1|6] ; [2,−1,1|3] ; [1,2,−1|2]\nL₂←L₂−2L₁ : [0,−3,−1|−9]\nL₃←L₃−L₁   : [0,1,−2|−4]\nL₂←L₂+3L₃  : [0,0,−7|−21] → z=3\nDe L₃+L₂ amélioré : y=2. De L₁ : x=1.\nSolution : (1;2;3).' },
          ]
        },
      ]
    },
  ]
},

// ─────────────────────────────────────────────────────────────────────
// CH 02 — NOMBRES COMPLEXES
// ─────────────────────────────────────────────────────────────────────
'complexes': {
  id:'complexes', emoji:'ℂ', badge:'Algèbre', color:'#a78bfa',
  titre:'Nombres Complexes',
  desc:"Formes algébrique, trigonométrique et exponentielle d'Euler, module, argument, formule de Moivre, racines n-ièmes, géométrie complexe.",
  souschapitres:[
    {
      id:'sc-forms', titre:'2.1 Formes et opérations',
      notions:['Forme algébrique z=a+ib','Module |z| et argument arg(z)','Forme exponentielle reiθ','Conjugué et inverse'],
      blocs:[
        {
          notion:'📐 Forme algébrique et opérations',
          theoremes:[
            { id:'D-CP1', type:'def', nom:'Ensemble ℂ et opérations',
              enonce:"z = a+ib,  a,b∈ℝ,  i²=−1\nRe(z)=a (partie réelle) ; Im(z)=b (partie imaginaire)\nConjugué : z̄ = a−ib\n\nPropriétés du conjugué :\nz+z̄ = 2Re(z)  ;  z−z̄ = 2i·Im(z)\nz·z̄ = |z|²     ;  z̄̄ = z\n\nz réel ↔ Im(z)=0 ↔ z=z̄\nz imaginaire pur ↔ Re(z)=0 ↔ z=−z̄\n\nInverse : z⁻¹ = z̄/|z|²  (z≠0)" },
            { id:'F-CP1', type:'formule', nom:'Module et argument',
              enonce:"|z| = √(a²+b²)  (module, toujours ≥ 0)\narg(z) = θ : cosθ=a/|z|,  sinθ=b/|z|  (mod 2π)\n\nPropriétés :\n|z₁z₂| = |z₁|·|z₂|\narg(z₁z₂) = arg(z₁)+arg(z₂)  (mod 2π)\n|z₁/z₂| = |z₁|/|z₂|  ;  arg(z₁/z₂) = arg(z₁)−arg(z₂)\n|z̄| = |z|  ;  arg(z̄) = −arg(z)\n|zⁿ| = |z|ⁿ  ;  arg(zⁿ) = n·arg(z)" },
            { id:'F-CP2', type:'formule', nom:"Formule d'Euler — Forme exponentielle",
              enonce:"eⁱᶿ = cosθ + i sinθ  (formule d'Euler)\n\nForme exponentielle : z = r·eⁱᶿ  avec r=|z|, θ=arg(z)\n\nLinéarisation (très utile pour Moivre) :\ncosθ = (eⁱᶿ + e⁻ⁱᶿ)/2\nsinθ = (eⁱᶿ − e⁻ⁱᶿ)/(2i)\n\nIdentité d'Euler : eⁱᵖ + 1 = 0",
              remarque:"La forme exponentielle est la plus efficace pour les calculs de puissance et racines." },
          ],
          exercices:[
            { id:'EX-CP1', niveau:'Facile', titre:'Forme exponentielle',
              enonce:'Écrire z=−1+i√3 sous forme exponentielle.',
              correction:'|z|=√(1+3)=2.\ncosθ=−1/2, sinθ=√3/2 → θ=2π/3.\nz=2·e^(i·2π/3).' },
            { id:'EX-CP2', niveau:'Intermédiaire', titre:'Calcul de module et argument',
              enonce:'z=(1+i)⁸. Calculer |z| et arg(z).',
              correction:'|1+i|=√2, arg(1+i)=π/4.\n|z|=(√2)⁸=2⁴=16.\narg(z)=8×π/4=2π≡0 (mod 2π).\nz=16 (réel).' },
          ]
        },
      ]
    },
    {
      id:'sc-moivre', titre:'2.2 Formule de Moivre et applications',
      notions:['Moivre : (cosθ+i sinθ)ⁿ=cos(nθ)+i sin(nθ)','Linéarisation de cosⁿθ et sinⁿθ','Formules de duplication et triplication','Racines n-ièmes'],
      blocs:[
        {
          notion:'⚡ Formule de Moivre et linéarisation',
          theoremes:[
            { id:'T-CP1', type:'thm', nom:'Formule de Moivre',
              enonce:"(cosθ + i sinθ)ⁿ = cos(nθ) + i sin(nθ)  pour tout n∈ℤ\n\nDémonstration (n>0) : par récurrence ou via eⁱⁿᶿ=(eⁱᶿ)ⁿ.\n\nApplications directes :\ncos(2θ) = cos²θ − sin²θ = 2cos²θ−1 = 1−2sin²θ\nsin(2θ) = 2sinθcosθ\n\ncos(3θ) = 4cos³θ − 3cosθ\nsin(3θ) = 3sinθ − 4sin³θ\n\nMéthode : développer (cosθ+i sinθ)ⁿ par Newton puis identifier Re et Im." },
            { id:'M-CP1', type:'methode', nom:'Linéarisation de cosⁿθ ou sinⁿθ',
              enonce:"But : exprimer cosⁿθ ou sinⁿθ en somme de cos(kθ) ou sin(kθ).\n\nÉtapes :\n1. Écrire cosθ=(eⁱᶿ+e⁻ⁱᶿ)/2  ou  sinθ=(eⁱᶿ−e⁻ⁱᶿ)/(2i)\n2. Élever à la puissance n et développer par Newton\n3. Regrouper les termes conjugués eⁱᵏᶿ+e⁻ⁱᵏᶿ=2cos(kθ)\n\nExemple : cos²θ = (eⁱᶿ+e⁻ⁱᶿ)²/4 = (e²ⁱᶿ+2+e⁻²ⁱᶿ)/4 = (1+cos2θ)/2",
              remarque:"Utilisé pour calculer des primitives de cosⁿ ou sinⁿ." },
          ],
          exercices:[
            { id:'EX-MV1', niveau:'Intermédiaire', titre:'Linéarisation de cos³θ',
              enonce:'Exprimer cos³θ en fonction de cos3θ et cosθ.',
              correction:'cosθ=(eⁱᶿ+e⁻ⁱᶿ)/2.\ncos³θ=(eⁱᶿ+e⁻ⁱᶿ)³/8\n=(e³ⁱᶿ+3eⁱᶿ+3e⁻ⁱᶿ+e⁻³ⁱᶿ)/8\n=(2cos3θ+6cosθ)/8.\ncos³θ=(cos3θ+3cosθ)/4.' },
            { id:'EX-MV2', niveau:'Difficile', titre:'Formule de triplication',
              enonce:'Montrer que cos(3θ)=4cos³θ−3cosθ en développant (cosθ+i sinθ)³.',
              correction:'(c+is)³=c³+3c²(is)+3c(is)²+(is)³\n=c³+3ic²s−3cs²−is³\n=Re : c³−3cs²=cos³θ−3cosθsin²θ\n=cos³θ−3cosθ(1−cos²θ)\n=4cos³θ−3cosθ=cos(3θ) ✓' },
          ]
        },
        {
          notion:'🔄 Racines n-ièmes',
          theoremes:[
            { id:'F-CP3', type:'formule', nom:'Racines n-ièmes',
              enonce:"zⁿ = w = r·eⁱᵅ  (w≠0, n∈ℕ*)\n\nSolutions : zₖ = r^(1/n) · e^(i(α+2kπ)/n)  pour k=0,1,…,n−1\n\nRacines n-ièmes de l'unité (w=1) :\nωₖ = e^(2iπk/n)  ;  k=0,1,…,n−1\n→ Représentées par un polygone régulier n côtés inscrit dans |z|=1\n\nPropriétés :\nSomme des n racines = 0 (n≥2)\nProduit des n racines = (−1)^(n+1)\nω = e^(2iπ/n) est une racine primitive : toutes les racines sont ωᵏ" },
          ],
          exercices:[
            { id:'EX-RN1', niveau:'Intermédiaire', titre:'Racines cubiques de −8',
              enonce:'Calculer les racines cubiques de −8.',
              correction:'−8=8·eⁱᵖ.\nzₖ=2·e^(i(π+2kπ)/3), k=0,1,2.\nz₀=2e^(iπ/3)=2(1/2+i√3/2)=1+i√3\nz₁=2e^(iπ)=−2\nz₂=2e^(i5π/3)=1−i√3' },
          ]
        },
      ]
    },
    {
      id:'sc-geocomplex', titre:'2.3 Géométrie complexe',
      notions:['Distance |zA−zB|','Argument et angle','Transformations : translation, rotation, homothétie','Alignement et cocyclicité'],
      blocs:[
        {
          notion:'📍 Transformations dans ℂ',
          theoremes:[
            { id:'D-GC1', type:'def', nom:'Points, distances et angles',
              enonce:"Point M d'affixe z dans le plan complexe.\n\nDistance : |zA−zB| = distance entre A et B\nAngle orienté (AB,AC) = arg((zC−zA)/(zB−zA))\n\nAlignement A,B,C :\n(zC−zA)/(zB−zA) est réel\n↔ arg(...) = 0 ou π\n\nOrthogonalité AB⊥AC :\narg((zC−zA)/(zB−zA)) = ±π/2\n↔ (zC−zA)/(zB−zA) est imaginaire pur" },
            { id:'F-GC1', type:'formule', nom:'Transformations complexes',
              enonce:"Translation de vecteur u=a+ib :\nz' = z + a+ib\n\nRotation de centre Ω, angle θ :\nz'−zΩ = eⁱᶿ(z−zΩ)\n\nHomothétie de centre Ω, rapport k∈ℝ* :\nz'−zΩ = k(z−zΩ)\n\nSimilitude directe (rotation + homothétie) :\nz'−zΩ = k·eⁱᶿ(z−zΩ)\n\nSymétrie centrale de centre Ω :\nz' = 2zΩ − z\n\nSymétrie axiale (axe réel) :\nz' = z̄" },
          ],
          exercices:[
            { id:'EX-GC1', niveau:'Intermédiaire', titre:'Rotation',
              enonce:'Rotation de centre O, angle π/2. Image de A(1+2i).',
              correction:"z'=e^(iπ/2)·z=i(1+2i)=i+2i²=i−2=−2+i.\nA'(−2;1)." },
            { id:'EX-GC2', niveau:'Difficile', titre:'Similitude',
              enonce:'Trouver la similitude z\'=az+b sachant que A(0)→A\'(1+i) et B(1)→B\'(i).',
              correction:'z\'=az+b.\nA: b=1+i.\nB: a+b=i → a=i−(1+i)=−1.\nz\'=−z+(1+i).' },
          ]
        },
      ]
    },
  ,
    {
      id:'sc-equations-complexes', titre:'2.4 Équations dans ℂ',
      notions:['zⁿ=a : n racines complexes','Équation du second degré à coefficients complexes','Factorisation dans ℂ','Recherche de z sous forme a+ib'],
      blocs:[
        {
          notion:'⚡ Équations et factorisation dans ℂ',
          theoremes:[
            { id:'T-CP3', type:'thm', nom:"Théorème fondamental de l'algèbre",
              enonce:"Tout polynôme de degré n à coefficients complexes a exactement n racines dans ℂ (comptées avec multiplicité).\n\nConséquence :\nP(z) = aₙ(z−z₁)(z−z₂)···(z−zₙ)\n\nSi P est à coefficients réels :\n• Les racines complexes viennent par paires conjuguées (z₁ et z̄₁)\n• Factorisation réelle : (z−z₁)(z−z̄₁) = z² − 2Re(z₁)z + |z₁|²" },
            { id:'M-CP2', type:'methode', nom:'Résoudre une équation du 2ème degré dans ℂ',
              enonce:"z² + pz + q = 0  (p,q∈ℂ)\n\nMéthode : chercher z = a+ib tel que z²=−p\nSystem de 2 équations (partie réelle et imaginaire)\n\nAlternativement : formulaire directement :\nΔ = p²−4q (complexe)\n√Δ = x+iy → (x²−y²=Re(Δ), 2xy=Im(Δ))\nz = (−p±√Δ)/2\n\nExemple : z²−2iz−5=0\nΔ=4i²+20=16, √Δ=4\nz=(2i±4)/2 → z₁=2+i, z₂=−2+i",
              remarque:"Toujours vérifier les solutions en substituant dans l'équation initiale." },
          ],
          exercices:[
            { id:'EX-CE1', niveau:'Intermédiaire', titre:'Résoudre dans ℂ',
              enonce:'Résoudre z²−(3+i)z+2+2i=0.',
              correction:'Δ=(3+i)²−4(2+2i)=9+6i−1−8−8i=−2i.\nTrouver √(−2i) : (a+ib)²=−2i → a²−b²=0, 2ab=−2 → a=b ou a=−b ; ab=−1.\na=1,b=−1 → √(−2i)=1−i (ou −1+i).\nz=(3+i±(1−i))/2.\nz₁=(4)/2=2 ; z₂=(2+2i)/2=1+i.' },
            { id:'EX-CE2', niveau:'Difficile', titre:'Factorisation',
              enonce:"P(z)=z⁴−2z³+4z²−8z+16. Sachant que 2i est racine, factoriser P dans ℂ puis ℝ.",
              correction:'2i racine → z̄=−2i aussi racine.\n(z−2i)(z+2i)=z²+4.\nDivision euclidienne : P=(z²+4)(z²−2z+4).\nz²−2z+4=0 : Δ=4−16=−12, racines 1±i√3.\nP=(z²+4)(z−1−i√3)(z−1+i√3).' },
          ]
        },
      ]
    }]
},

// ─────────────────────────────────────────────────────────────────────
// CH 03 — MATRICES & SYSTÈMES
// ─────────────────────────────────────────────────────────────────────
'matrices-systemes': {
  id:'matrices-systemes', emoji:'▦', badge:'Algèbre', color:'#a78bfa',
  titre:'Systèmes Linéaires & Matrices',
  desc:"Opérations matricielles, déterminant d'ordre 2 et 3 (règle de Sarrus), matrice inverse, résolution par Cramer et Gauss-Jordan.",
  souschapitres:[
    {
      id:'sc-matops', titre:'3.1 Opérations matricielles',
      notions:['Addition et multiplication scalaire','Produit AB (m×n)×(n×p)','Matrice identité Iₙ','Transposée Aᵀ'],
      blocs:[
        {
          notion:'▦ Produit matriciel et propriétés',
          theoremes:[
            { id:'D-MA1', type:'def', nom:'Définitions et opérations',
              enonce:"Matrice A=(aᵢⱼ) de taille m×n  (m lignes, n colonnes).\n\nAddition (même taille) : (A+B)ᵢⱼ = aᵢⱼ+bᵢⱼ\nMultiplication scalaire : (kA)ᵢⱼ = k·aᵢⱼ\n\nProduit AB (défini si A est m×n et B est n×p) :\n(AB)ᵢⱼ = Σₖ₌₁ⁿ aᵢₖ·bₖⱼ  →  résultat m×p\n\nMatrice identité Iₙ (n×n, diagonale=1, reste=0) :\nA·Iₙ = Iₙ·A = A\n\nTransposée : (Aᵀ)ᵢⱼ = aⱼᵢ\n(AB)ᵀ = BᵀAᵀ",
              remarque:"⚠️ AB ≠ BA en général (non-commutativité du produit matriciel)." },
          ],
          exercices:[
            { id:'EX-MA1', niveau:'Facile', titre:'Produit de matrices',
              enonce:'Calculer AB : A=[[1,2],[3,4]], B=[[5,0],[1,2]].',
              correction:'AB=[[1×5+2×1, 1×0+2×2],[3×5+4×1, 3×0+4×2]]\n=[[7,4],[19,8]].' },
          ]
        },
      ]
    },
    {
      id:'sc-det', titre:'3.2 Déterminant et inverse',
      notions:['det d\'ordre 2 : ad−bc','Règle de Sarrus (ordre 3)','A inversible ↔ det(A)≠0','Inverse A⁻¹ et Cramer'],
      blocs:[
        {
          notion:'🔑 Déterminant',
          theoremes:[
            { id:'F-DT1', type:'formule', nom:'Déterminant d\'ordre 2 et 3',
              enonce:"Ordre 2 :\ndet(A) = det[[a,b],[c,d]] = ad−bc\n\nOrdre 3 — Règle de Sarrus :\ndet[[a,b,c],[d,e,f],[g,h,i]]\n= aei + bfg + cdh\n  − ceg − afh − bdi\n\n(Diagonales descendantes + ; diagonales montantes −)\n\nPropriétés :\n• det(AB) = det(A)·det(B)\n• det(Aᵀ) = det(A)\n• A inversible ⟺ det(A) ≠ 0\n• Deux lignes égales ou proportionnelles → det = 0",
              remarque:"Cofacteur Cᵢⱼ = (−1)^(i+j)·Mᵢⱼ où Mᵢⱼ est le mineur (det de la sous-matrice)." },
            { id:'F-DT2', type:'formule', nom:'Matrice inverse et règle de Cramer',
              enonce:"Inverse (ordre 2) :\nA⁻¹ = (1/det(A))·[[d,−b],[−c,a]]\n\nInverse (ordre n) — Gauss-Jordan :\n[A | Iₙ]  →  opérations élémentaires  →  [Iₙ | A⁻¹]\n\nRègle de Cramer (AX=B, det(A)≠0) :\nxᵢ = det(Aᵢ)/det(A)\noù Aᵢ = A avec la colonne i remplacée par B." },
          ],
          exercices:[
            { id:'EX-DT1', niveau:'Facile', titre:'Déterminant 2×2',
              enonce:'Calculer det(A) pour A=[[3,2],[1,4]].',
              correction:'det(A)=3×4−2×1=10.' },
            { id:'EX-DT2', niveau:'Intermédiaire', titre:'Cramer 2×2',
              enonce:'Résoudre { 3x+2y=7 ; x+4y=9 } par Cramer.',
              correction:'det(A)=12−2=10.\ndet(A₁)=7×4−2×9=28−18=10 → x=1.\ndet(A₂)=3×9−7×1=27−7=20 → y=2.\nSolution : (1;2).' },
            { id:'EX-DT3', niveau:'Difficile', titre:'Sarrus + inverse',
              enonce:"Calculer det(A) par Sarrus et A⁻¹ par Gauss-Jordan pour A=[[1,2,0],[0,1,3],[2,0,1]].",
              correction:'Sarrus : d=1×1×1+2×3×2+0×0×0−0×1×0−1×3×2−2×0×1\n=1+12+0−0−6−0=7.\nGauss-Jordan : [A|I₃] → ... → [I₃|A⁻¹].\nA⁻¹=(1/7)·[[1,−2,6],[6,1,−3],[−2,4,1]].' },
          ]
        },
      ]
    },
  ]
},

// ─────────────────────────────────────────────────────────────────────
// CH 04 — SUITES NUMÉRIQUES
// ─────────────────────────────────────────────────────────────────────
'suites': {
  id:'suites', emoji:'uₙ', badge:'Analyse', color:'#4f6ef7',
  titre:'Suites Numériques',
  desc:"Suites arithmétiques, géométriques, récurrentes affines (uₙ₊₁=auₙ+b) et homographiques, convergence, principe de récurrence.",
  souschapitres:[
    {
      id:'sc-arith-geo', titre:'4.1 Suites arithmétiques et géométriques',
      notions:['Définition et terme général','Somme des n premiers termes','Comportement à l\'infini','Comparaison arith./géom.'],
      blocs:[
        {
          notion:'📈 Arithmétiques et géométriques',
          theoremes:[
            { id:'D-SU1', type:'def', nom:'Définitions et formules',
              enonce:"Suite arithmétique (raison r) :\nuₙ₊₁ = uₙ + r  (la différence est constante)\nuₙ = u₀ + n·r  (terme général)\nSomme : Σᵢ₌₀ⁿ⁻¹ uᵢ = n·(u₀+uₙ₋₁)/2 = n·(2u₀+(n−1)r)/2\n\nSuite géométrique (raison q≠0) :\nuₙ₊₁ = q·uₙ  (le rapport est constant)\nuₙ = u₀·qⁿ  (terme général)\nSomme : Σᵢ₌₀ⁿ⁻¹ uᵢ = u₀·(1−qⁿ)/(1−q)  si q≠1\n           = n·u₀  si q=1\n\nComportement de qⁿ :\n|q|<1 → 0 ; q=1 → 1 ; q>1 → +∞ ; q<−1 → diverge (oscillation)",
              remarque:"Somme des n premiers entiers : 1+2+…+n = n(n+1)/2\nSomme des n premiers carrés : 1²+…+n² = n(n+1)(2n+1)/6" },
          ],
          exercices:[
            { id:'EX-SU1', niveau:'Facile', titre:'Suite géométrique',
              enonce:'u₀=4, q=1/2. Calculer u₄, S₅ et lim uₙ.',
              correction:'u₄=4×(1/2)⁴=1/4.\nS₅=4×(1−(1/2)⁵)/(1−1/2)=4×31/32/(1/2)=4×31/16=31/4.\n|1/2|<1 → lim uₙ=0.' },
            { id:'EX-SU2', niveau:'Intermédiaire', titre:'Suite arithmétique — somme',
              enonce:'(uₙ) arithmétique, u₁=3, u₁₀=30. Trouver r, u₁₀₀ et S₁₀₀.',
              correction:'r=(30−3)/(10−1)=3.\nu₁₀₀=3+(99)×3=300.\nS₁₀₀=100×(3+300)/2=15150.' },
          ]
        },
      ]
    },
    {
      id:'sc-recurrente', titre:'4.2 Suites récurrentes',
      notions:['Suite affine uₙ₊₁=auₙ+b : point fixe et changement de variable','Suite homographique : deux points fixes','Monotonie par uₙ₊₁−uₙ','Convergence et limite'],
      blocs:[
        {
          notion:'🔄 Suite affine uₙ₊₁=auₙ+b',
          theoremes:[
            { id:'M-SU1', type:'methode', nom:'Résolution de uₙ₊₁=auₙ+b (a≠1)',
              enonce:"1. Trouver le point fixe ℓ : ℓ=aℓ+b → ℓ=b/(1−a)\n\n2. Poser vₙ=uₙ−ℓ :\n   vₙ₊₁=uₙ₊₁−ℓ=auₙ+b−ℓ=a(uₙ−ℓ)=a·vₙ\n   → vₙ est géométrique de raison a\n\n3. vₙ = v₀·aⁿ = (u₀−ℓ)·aⁿ\n\n4. uₙ = ℓ + (u₀−ℓ)·aⁿ\n\nComportement :\n  |a|<1 : uₙ → ℓ (convergente)\n  a>1  : |uₙ| → +∞ (divergente)\n  a=−1 : oscille entre deux valeurs",
              remarque:"Si a=1 : uₙ₊₁=uₙ+b → suite arithmétique de raison b." },
            { id:'D-SU2', type:'def', nom:'Suite homographique uₙ₊₁=(auₙ+b)/(cuₙ+d)',
              enonce:"Points fixes : ℓ=(aℓ+b)/(cℓ+d)\n→ cℓ²+(d−a)ℓ−b=0\n\nCas 1 : deux points fixes ℓ₁≠ℓ₂\nPoser vₙ=(uₙ−ℓ₁)/(uₙ−ℓ₂)\n→ vₙ₊₁=k·vₙ (géométrique)\nk=(a−cℓ₁)/(a−cℓ₂)\n\nCas 2 : un point fixe double ℓ₁=ℓ₂=ℓ\nPoser wₙ=1/(uₙ−ℓ) → arithmétique" },
          ],
          exercices:[
            { id:'EX-RC1', niveau:'Facile', titre:'Suite affine',
              enonce:'uₙ₊₁=2uₙ−3, u₀=1. Exprimer uₙ.',
              correction:'ℓ=3/(1−2)=−3. vₙ=uₙ+3, v₀=4.\nvₙ=4×2ⁿ → uₙ=4·2ⁿ−3.' },
            { id:'EX-RC2', niveau:'Difficile', titre:'Suite homographique',
              enonce:'uₙ₊₁=(uₙ+3)/(uₙ+1), u₀=2. Étudier la convergence.',
              correction:'Points fixes : ℓ=(ℓ+3)/(ℓ+1) → ℓ²=3 → ℓ=√3 (>0 car u₀>0).\nvₙ=(uₙ−√3)/(uₙ+√3).\nvₙ₊₁=vₙ·(1−√3)/(1+√3)=k·vₙ, |k|<1.\nuₙ→√3.' },
          ]
        },
      ]
    },
    {
      id:'sc-recurrence', titre:'4.3 Principe de récurrence',
      notions:['Initialisation P(n₀)','Hérédité P(n)→P(n+1)','Récurrence forte','Applications classiques'],
      blocs:[
        {
          notion:'🔁 Démonstration par récurrence',
          theoremes:[
            { id:'T-SU1', type:'thm', nom:'Principe de récurrence',
              enonce:"Pour montrer P(n) vraie pour tout n≥n₀ :\n\n1. INITIALISATION : vérifier P(n₀) directement\n\n2. HÉRÉDITÉ : supposer P(n) vraie pour un n≥n₀\n   (hypothèse de récurrence)\n   → Montrer que P(n+1) est vraie\n\n3. CONCLUSION : P(n) est vraie pour tout n≥n₀\n\nRécurrence forte : supposer P(k) vraie pour tout k≤n\npuis montrer P(n+1).  [Utile pour les suites récurrentes d'ordre 2]" },
          ],
          exercices:[
            { id:'EX-PR1', niveau:'Intermédiaire', titre:'Somme des carrés',
              enonce:'Montrer par récurrence : Σᵢ₌₁ⁿ i²=n(n+1)(2n+1)/6.',
              correction:'n=1 : 1=1×2×3/6=1 ✓\nHérédité : Σⁿ⁺¹ i²=n(n+1)(2n+1)/6+(n+1)²\n=(n+1)[n(2n+1)+6(n+1)]/6\n=(n+1)(2n²+7n+6)/6\n=(n+1)(n+2)(2n+3)/6 ✓' },
          ]
        },
      ]
    },
  ,
    {
      id:'sc-suites-monotonie', titre:'4.4 Monotonie et convergence',
      notions:['Suite croissante/décroissante par uₙ₊₁−uₙ','Suite majorée, minorée, bornée','Théorème de la limite monotone','Suites adjacentes'],
      blocs:[
        {
          notion:'📊 Convergence et théorèmes',
          theoremes:[
            { id:'T-SU2', type:'thm', nom:'Théorème de la limite monotone',
              enonce:"Toute suite croissante et majorée est convergente.\nToute suite décroissante et minorée est convergente.\n\nStratégie de démonstration :\n1. Montrer la monotonie : uₙ₊₁−uₙ ≥ 0 (croissante)\n2. Montrer la borne : uₙ ≤ M (majorée)\n3. Conclure : (uₙ) converge vers ℓ\n4. Calculer ℓ : passer à la limite dans uₙ₊₁=f(uₙ) → ℓ=f(ℓ)\n\nSuites adjacentes :\n(uₙ) et (vₙ) adjacentes si :\n• uₙ croissante, vₙ décroissante\n• vₙ−uₙ → 0\nAlors elles convergent vers la même limite ℓ et uₙ≤ℓ≤vₙ.",
              remarque:"Le calcul de la limite se fait via le point fixe f(ℓ)=ℓ." },
            { id:'M-SU2', type:'methode', nom:"Étude complète d'une suite récurrente uₙ₊₁=f(uₙ)",
              enonce:"1. POINT(S) FIXE(S) : résoudre f(ℓ)=ℓ\n\n2. MONOTONIE : calculer uₙ₊₁−uₙ = f(uₙ)−uₙ\n   → signe dépend de uₙ et du point fixe\n\n3. BORNITUDE : prouver par récurrence que uₙ∈[a,b]\n\n4. CONVERGENCE : appliquer le théorème de la limite monotone\n\n5. LIMITE : résoudre ℓ=f(ℓ) et choisir la bonne racine\n\nExemple : uₙ₊₁=√(uₙ+2), u₀=0\nPoint fixe : ℓ=√(ℓ+2) → ℓ²−ℓ−2=0 → ℓ=2 (positif)\nCroissante et bornée par 2 → converge vers 2." },
          ],
          exercices:[
            { id:'EX-MO1', niveau:'Intermédiaire', titre:'Suite bornée et convergente',
              enonce:'uₙ₊₁=uₙ/2+1, u₀=0. Montrer que uₙ∈[0;2] et converge. Calculer la limite.',
              correction:'f(ℓ)=ℓ/2+1 → ℓ=2.\n[0;2] stable : u∈[0;2] → u/2+1∈[1;2]⊂[0;2].\nMonotonie : u₁=1>u₀=0, puis croissante par récurrence (f croissante).\nBornée et croissante → converge vers ℓ=2.' },
            { id:'EX-MO2', niveau:'Difficile', titre:'Suites adjacentes',
              enonce:'uₙ=1+1/2+...+1/2ⁿ et vₙ=uₙ+1/2ⁿ. Montrer que ces suites sont adjacentes.',
              correction:'uₙ₊₁−uₙ=1/2ⁿ⁺¹>0 (croissante).\nvₙ₊₁−vₙ=1/2ⁿ⁺¹−1/2ⁿ=−1/2ⁿ⁺¹<0 (décroissante).\nvₙ−uₙ=1/2ⁿ→0.\nDonc adjacentes → convergent vers ℓ=2 (somme série géométrique).' },
          ]
        },
      ]
    }]
},

// ─────────────────────────────────────────────────────────────────────
// CH 05 — LIMITES ET CONTINUITÉ
// ─────────────────────────────────────────────────────────────────────
'limites-continuite': {
  id:'limites-continuite', emoji:'∞', badge:'Analyse', color:'#4f6ef7',
  titre:'Limites et Continuité',
  desc:"Limites finies et infinies, formes indéterminées, TVI, théorème de la bijection, asymptotes, croissances comparées.",
  souschapitres:[
    {
      id:'sc-limites', titre:'5.1 Limites d\'une fonction',
      notions:['Limite en un point a (finie, infinie)','Limite à l\'infini','Opérations sur les limites','Formes indéterminées : 0/0, ∞/∞, ∞−∞, 0·∞'],
      blocs:[
        {
          notion:'∞ Limites et opérations',
          theoremes:[
            { id:'D-LI1', type:'def', nom:'Définition de la limite',
              enonce:"lim(x→a) f(x) = ℓ\n↔ f(x) se rapproche de ℓ quand x se rapproche de a (x≠a)\n\nLimites unilatérales :\nlim(x→a⁻) f(x) = ℓ₁  (par la gauche)\nlim(x→a⁺) f(x) = ℓ₂  (par la droite)\nlim(x→a) f(x) existe ↔ ℓ₁=ℓ₂\n\nOPÉRATIONS :\n• Somme : lim(f+g)=lim f+lim g\n• Produit : lim(fg)=lim f × lim g\n• Quotient : lim(f/g)=lim f / lim g  (si lim g≠0)\n• Composition : si lim(x→a)g=b et lim(x→b)f=ℓ → lim(x→a)(f∘g)=ℓ" },
            { id:'M-LI1', type:'methode', nom:'Lever les formes indéterminées',
              enonce:"0/0 → factoriser numérateur et dénominateur (racines, identités remarquables)\n\n∞/∞ → diviser par le terme de plus haut degré\n\n∞−∞ → factoriser ou multiplier par conjugué\n   Conjugué de √A−√B : multiplier par (√A+√B)/(√A+√B)\n\n0×∞ → réécrire f×g = f/(1/g) puis appliquer 0/0 ou ∞/∞\n\nLimites fondamentales :\nlim(x→0) sin x/x = 1\nlim(x→0) (eˣ−1)/x = 1\nlim(x→0) ln(1+x)/x = 1",
              remarque:"Pour les polynômes et fractions rationnelles : terme dominant en ±∞." },
          ],
          exercices:[
            { id:'EX-LI1', niveau:'Facile', titre:'Forme 0/0',
              enonce:'Calculer lim(x→1) (x²−1)/(x−1).',
              correction:'=(x+1)(x−1)/(x−1)=x+1 → 2.' },
            { id:'EX-LI2', niveau:'Intermédiaire', titre:'Forme ∞−∞',
              enonce:'Calculer lim(x→+∞) [√(x²+x)−x].',
              correction:'Multiplier par conjugué :\nx/[√(x²+x)+x]=1/[√(1+1/x)+1]→1/2.' },
            { id:'EX-LI3', niveau:'Difficile', titre:'Croissances comparées',
              enonce:'Calculer lim(x→+∞) x⁵/eˣ et lim(x→0⁺) x·ln x.',
              correction:'eˣ≫xⁿ → lim x⁵/eˣ=0.\nlim x·ln x=lim(ln x)/(1/x) [L\'Hôpital : (1/x)/(−1/x²)]=lim(−x)=0.' },
          ]
        },
      ]
    },
    {
      id:'sc-continuite', titre:'5.2 Continuité et théorèmes',
      notions:['Définition de la continuité','TVI : f(a)f(b)<0 → racine','Théorème de la bijection','Méthode de dichotomie','Asymptotes (AV, AH, AO)'],
      blocs:[
        {
          notion:'📊 TVI et théorème de la bijection',
          theoremes:[
            { id:'T-LI1', type:'thm', nom:'Théorème des Valeurs Intermédiaires (TVI)',
              enonce:"f continue sur [a,b] et k∈[min(f(a),f(b));max(f(a),f(b))] :\n∃c∈[a,b] : f(c)=k\n\nCas pratique : si f(a)·f(b)<0 → ∃ au moins une racine dans ]a,b[\n\nUnicitée : si de plus f est strictement monotone → c est unique\n\nDichotomie (encadrement de la racine) :\n• Évaluer f au milieu m=(a+b)/2\n• f(m)·f(a)<0 → racine dans [a;m]\n• f(m)·f(b)<0 → racine dans [m;b]\n• Répéter jusqu'à la précision souhaitée",
              remarque:"Le TVI garantit l'existence mais pas l'unicité. Il faut la monotonie pour l'unicité." },
            { id:'T-LI2', type:'thm', nom:'Théorème de la bijection',
              enonce:"f continue et strictement monotone sur I=[a,b] :\nf réalise une bijection de [a,b] vers J=[f(a),f(b)] (ou [f(b),f(a)])\n→ Pour tout k∈J, ∃! c∈[a,b] : f(c)=k\n\nApplication : existence et unicité d'une racine\n→ Résolution graphique, numérique ou analytique." },
            { id:'D-LI2', type:'def', nom:'Asymptotes',
              enonce:"Asymptote Verticale (AV) x=a :\nlim(x→a) |f(x)| = +∞\n\nAsymptote Horizontale (AH) y=ℓ en ±∞ :\nlim(x→±∞) f(x) = ℓ\n\nAsymptote Oblique (AO) y=mx+p en ±∞ :\n• m = lim(x→±∞) f(x)/x  (pente)\n• p = lim(x→±∞) [f(x)−mx]  (ordonnée à l'origine)\n\nPosition de C_f par rapport à y=mx+p :\nÉtudier le signe de f(x)−(mx+p)" },
          ],
          exercices:[
            { id:'EX-CO1', niveau:'Intermédiaire', titre:'TVI — existence et unicité',
              enonce:'Montrer que x³+x−1=0 a une solution unique dans ]0;1[.',
              correction:'f(x)=x³+x−1 continue.\nf(0)=−1<0 ; f(1)=1>0 → ∃c∈]0;1[ (TVI).\nf\'(x)=3x²+1>0 → f croissante → c unique.' },
            { id:'EX-CO2', niveau:'Difficile', titre:'Asymptote oblique + position',
              enonce:'f(x)=(x²+2x)/(x+1). AO, puis position de C_f par rapport à l\'AO.',
              correction:'a=lim f/x=1 ; b=lim[f−x]=lim[x/(x+1)]=1.\nAO : y=x+1.\nf(x)−(x+1)=[(x²+2x)−(x+1)(x+1)]/(x+1)=[−1]/(x+1).\nSur x>−1 : négatif → C_f en dessous de l\'AO.\nSur x<−1 : positif → C_f au-dessus de l\'AO.' },
          ]
        },
      ]
    },
  ,
    {
      id:'sc-croissances-comparees', titre:'5.3 Croissances comparées et développements limités',
      notions:['Hiérarchie ln≪xⁿ≪eˣ','Développements limités usuels en 0','Équivalents en 0 et +∞','Calcul de limite par DL'],
      blocs:[
        {
          notion:'🚀 Croissances comparées et DL',
          theoremes:[
            { id:'T-CC1', type:'thm', nom:'Hiérarchie des croissances',
              enonce:"En +∞ (pour α,β>0) :\nln x ≪ xᵅ ≪ eˣ ≪ eˣ²\n\nFormellement :\nlim(x→+∞) (ln x)/xᵅ = 0  (tout exposant)\nlim(x→+∞) xⁿ/eˣ = 0  (tout entier n)\n\nEn 0⁺ :\nlim(x→0⁺) xᵅ·ln x = 0  (tout α>0)\n\nApplication : tout morceau qui 'domine' l'emporte.",
              remarque:"La fonction eˣ croît plus vite que tout polynôme et xⁿ plus vite que tout logarithme." },
            { id:'F-DL1', type:'formule', nom:'Développements limités usuels en 0',
              enonce:"eˣ = 1 + x + x²/2! + x³/3! + ... + xⁿ/n! + o(xⁿ)\n\nln(1+x) = x − x²/2 + x³/3 − ... + (−1)ⁿ⁺¹xⁿ/n + o(xⁿ)\n\nsin x = x − x³/6 + x⁵/120 + ... + o(xⁿ)\n\ncos x = 1 − x²/2 + x⁴/24 − ... + o(xⁿ)\n\n(1+x)ᵅ = 1 + αx + α(α−1)x²/2! + ... + o(xⁿ)  (binôme)",
              remarque:"Les DL permettent de calculer rapidement des limites de formes indéterminées." },
          ],
          exercices:[
            { id:'EX-DL1', niveau:'Intermédiaire', titre:'Limite par DL',
              enonce:'Calculer lim(x→0) (eˣ−1−x)/x².',
              correction:'eˣ=1+x+x²/2+o(x²).\neˣ−1−x=x²/2+o(x²).\n(eˣ−1−x)/x²→1/2.' },
            { id:'EX-DL2', niveau:'Difficile', titre:'DL au voisinage de 0',
              enonce:'Calculer lim(x→0) (sin x − x)/x³.',
              correction:'sin x = x − x³/6 + o(x³).\nsin x − x = −x³/6 + o(x³).\n(sin x − x)/x³ → −1/6.' },
          ]
        },
      ]
    }]
},

// ─────────────────────────────────────────────────────────────────────
// CH 06 — DÉRIVATION
// ─────────────────────────────────────────────────────────────────────
'derivation': {
  id:'derivation', emoji:"f'", badge:'Analyse', color:'#4f6ef7',
  titre:'Dérivation',
  desc:"Nombre dérivé, dérivées usuelles et règles de calcul, tangente, approximation affine, théorèmes de Rolle, TAF et règle de L'Hôpital.",
  souschapitres:[
    {
      id:'sc-calcul-der', titre:'6.1 Calcul des dérivées',
      notions:['Nombre dérivé f\'(a) — taux d\'accroissement','Dérivées usuelles','Règles : somme, produit, quotient, composée','Tangente et approximation affine'],
      blocs:[
        {
          notion:"📐 Dérivées usuelles et règles",
          theoremes:[
            { id:'D-DE1', type:'def', nom:'Nombre dérivé et tangente',
              enonce:"f'(a) = lim(x→a) [f(x)−f(a)]/(x−a)\n     = lim(h→0) [f(a+h)−f(a)]/h\n\nInterprétation géométrique :\nf'(a) = pente de la tangente en M(a,f(a))\n\nÉquation de la tangente en a :\ny = f'(a)·(x−a) + f(a)\n\nApproximation affine au voisinage de a :\nf(x) ≈ f(a) + f'(a)·(x−a)  pour x proche de a" },
            { id:'F-DE1', type:'formule', nom:'Table des dérivées usuelles',
              enonce:"(c)' = 0  (constante)\n(xⁿ)' = n·xⁿ⁻¹  (n∈ℤ, x≠0 si n<0)\n(√x)' = 1/(2√x)\n(1/x)' = −1/x²\n\n(eˣ)' = eˣ\n(ln x)' = 1/x  (x>0)\n\n(sin x)' = cos x\n(cos x)' = −sin x\n(tan x)' = 1+tan²x = 1/cos²x" },
            { id:'F-DE2', type:'formule', nom:'Règles de dérivation',
              enonce:"Somme : (u+v)' = u'+v'\nProduit : (uv)' = u'v + uv'\nQuotient : (u/v)' = (u'v−uv')/v²\nComposée : (f∘g)' = (f'∘g)·g'\n\nFormes chaîne (très utilisées) :\n(uⁿ)' = n·u'·uⁿ⁻¹\n(eᵘ)' = u'·eᵘ\n(ln u)' = u'/u  (u>0)\n(√u)' = u'/(2√u)",
              remarque:"La dérivée d'une composée (f∘g)' = f'(g(x))·g'(x) est la règle la plus utilisée." },
          ],
          exercices:[
            { id:'EX-DE1', niveau:'Facile', titre:'Dérivée composée',
              enonce:"f(x)=e^(x²). Calculer f'(x).",
              correction:"u=x², u'=2x.\nf'(x)=2x·e^(x²)." },
            { id:'EX-DE2', niveau:'Facile', titre:'Dérivée logarithme composé',
              enonce:"f(x)=ln(2x²+1). Calculer f'(x).",
              correction:"u=2x²+1, u'=4x.\nf'(x)=4x/(2x²+1)." },
            { id:'EX-DE3', niveau:'Intermédiaire', titre:'Tangente et approximation',
              enonce:"f(x)=x³−x. Tangente en x=1 et approx. de f(1,1).",
              correction:"f(1)=0. f'(x)=3x²−1, f'(1)=2.\nTangente : y=2(x−1).\nf(1,1)≈2×0,1=0,2.\nExact : 1,331−1,1=0,231." },
          ]
        },
      ]
    },
    {
      id:'sc-theoremes-der', titre:'6.2 Théorèmes fondamentaux',
      notions:['Théorème de Rolle : f(a)=f(b) → f\'(c)=0','TAF : pente de la sécante = f\'(c)','Inégalité des accroissements finis','Règle de L\'Hôpital (0/0, ∞/∞)'],
      blocs:[
        {
          notion:'📏 Rolle, TAF et L\'Hôpital',
          theoremes:[
            { id:'T-DE1', type:'thm', nom:'Théorème de Rolle',
              enonce:"f continue sur [a,b], dérivable sur ]a,b[ et f(a)=f(b) :\n→ ∃c∈]a,b[ tel que f'(c)=0\n\nInterprétation : la courbe a au moins un point à tangente horizontale.\n\nConséquence pratique :\nEntre deux racines consécutives de f il existe au moins une racine de f'.\n(Utile pour localiser les extrema).",
              remarque:"Les 3 hypothèses sont nécessaires : si l'une manque le résultat peut être faux." },
            { id:'T-DE2', type:'thm', nom:'Théorème des Accroissements Finis (TAF)',
              enonce:"f continue sur [a,b], dérivable sur ]a,b[ :\n→ ∃c∈]a,b[ : f'(c) = [f(b)−f(a)]/(b−a)\n\nInterprétation : la pente de la tangente en c = pente de la corde AB.\n\nInégalité des accroissements finis :\nSi m≤f'(x)≤M sur ]a,b[ :\nm(b−a) ≤ f(b)−f(a) ≤ M(b−a)\n\nApplication : encadrement de f(b)−f(a) quand m,M sont connus." },
            { id:'F-DE3', type:'formule', nom:"Règle de L'Hôpital",
              enonce:"Si lim f(x)=0 et lim g(x)=0  (ou les deux →±∞) :\nlim f(x)/g(x) = lim f'(x)/g'(x)\n(sous réserve que cette dernière limite existe)\n\nApplicable aux formes indéterminées : 0/0, ∞/∞\n\nExemple :\nlim(x→0) sinx/x = lim cosx/1 = 1\n\nlim(x→0) (eˣ−1)/x = lim eˣ/1 = 1\n\nlim(x→0) (sinx−x)/x³ : appliquer 3 fois → −1/6" },
          ],
          exercices:[
            { id:'EX-TH1', niveau:'Intermédiaire', titre:"Rolle — existence d'un extremum",
              enonce:"f(x)=x³−3x. Montrer que f a un maximum sur ]−∞;0[ et le localiser.",
              correction:"f'(x)=3x²−3=3(x−1)(x+1).\nf'(−1)=0. f'(x)<0 sur ]−∞;−1[ et f'(x)<0 sur ]−1;0[\nAttention : f'<0 sur ]−∞;−1[ et f'>0 sur ... Non.\nf'(x)=3(x+1)(x−1)>0 sur ]−∞;−1[, <0 sur ]−1;1[.\nDonc maximum en x=−1 : f(−1)=−1+3=2." },
            { id:'EX-TH2', niveau:'Difficile', titre:"L'Hôpital",
              enonce:"Calculer lim(x→0) (sinx−x)/x³.",
              correction:"0/0 → L'Hôpital :\n(cosx−1)/3x² → 0/0 → (−sinx)/6x → 0/0 → (−cosx)/6 → −1/6." },
          ]
        },
      ]
    },
  ,
    {
      id:'sc-optimisation', titre:"5.3 Optimisation et problèmes d'extrema",
      notions:["Problème d'optimisation sous contrainte",'Extrema globaux sur un intervalle fermé','Inégalités classiques par dérivation'],
      blocs:[
        {
          notion:'🎯 Optimisation',
          theoremes:[
            { id:'M-OPT1', type:'methode', nom:"Résoudre un problème d'optimisation",
              enonce:"MÉTHODE GÉNÉRALE :\n1. Identifier la quantité à optimiser (f) et les contraintes\n2. Exprimer f en fonction d'une seule variable x∈[a;b]\n3. Calculer f'(x) et le tableau de variations\n4. Identifier le maximum/minimum\n5. Répondre à la question posée (avec unités)" },
            { id:'T-OPT1', type:'thm', nom:'Inégalités classiques par dérivation',
              enonce:"1. eˣ ≥ 1+x pour tout x∈ℝ (avec égalité en x=0)\nDémonstration : f(x)=eˣ−1−x, f'(x)=eˣ−1, minimum en 0.\n\n2. ln x ≤ x−1 pour tout x>0 (avec égalité en x=1)\nDémonstration : f(x)=ln x−(x−1), f'(x)=1/x−1, maximum en 1.\n\n3. Inégalité AM-GM : (a+b)/2 ≥ √(ab) pour a,b>0\nDémonstration : (√a−√b)² ≥ 0." },
          ],
          exercices:[
            { id:'EX-OPT1', niveau:'Intermédiaire', titre:'Boîte de volume maximal',
              enonce:"On découpe 4 carrés de côté x dans un carton 20cm×30cm. Valeur de x maximisant le volume?",
              correction:"V(x)=x(20−2x)(30−2x) sur [0;10].\nV'(x)=12x²−200x+600=0 → x=(50−10√7)/6≈3.92.\nV(3.92)≈1056 cm³." },
            { id:'EX-OPT2', niveau:'Difficile', titre:'Distance minimale',
              enonce:"Trouver le point de la parabole y=x² le plus proche de A(3;0).",
              correction:"f(x)=(x−3)²+x⁴. f'(x)=2(x−3)+4x³=0.\n2x³+x−3=0 → (x−1)(2x²+2x+3)=0.\nx=1 (discriminant négatif pour l'autre facteur).\nPoint M(1;1), distance=√[(1−3)²+1]=√5." },
          ]
        },
      ]
    }]
},

// ─────────────────────────────────────────────────────────────────────
// CH 07 — ÉTUDE DE FONCTIONS
// ─────────────────────────────────────────────────────────────────────
'etude-fonctions': {
  id:'etude-fonctions', emoji:'📈', badge:'Analyse', color:'#4f6ef7',
  titre:'Étude de Fonctions',
  desc:"Variations, extrema, étude complète de fonctions polynômes, rationnelles, irrationnelles, circulaires, exponentielle et logarithme.",
  souschapitres:[
    {
      id:'sc-methode', titre:'7.1 Méthode d\'étude complète',
      notions:['Domaine de définition','Parité (pair/impair)','Limites aux bornes et asymptotes','Tableau de variations et extrema','Représentation graphique'],
      blocs:[
        {
          notion:'📋 Étape par étape',
          theoremes:[
            { id:'P-EF1', type:'prop', nom:'Plan d\'étude complète d\'une fonction',
              enonce:"1. DOMAINE 𝒟_f :\n   Exclure les zéros du dénominateur, ln de négatif, racine de négatif...\n\n2. PARITÉ :\n   Calculer f(−x) :\n   f(−x)=f(x) → paire (symétrie par rapport à Oy)\n   f(−x)=−f(x) → impaire (symétrie par rapport à O)\n\n3. LIMITES AUX BORNES → asymptotes\n\n4. DÉRIVÉE f'(x) :\n   Calculer, factoriser, dresser le tableau de signe\n   → déduire le tableau de variations\n\n5. EXTREMA LOCAUX/GLOBAUX :\n   Comparer valeurs aux extrema et aux bornes\n\n6. REPRÉSENTATION GRAPHIQUE :\n   Placer quelques points remarquables, tracer" },
          ],
          exercices:[
            { id:'EX-EF1', niveau:'Intermédiaire', titre:'Étude rationnelle',
              enonce:"Étudier f(x)=(x²+1)/(x−1) : domaine, asymptotes, variations, tableau complet.",
              correction:"𝒟_f=ℝ\\{1}. AV : x=1.\na=1, b=1 → AO : y=x+1.\nf'(x)=(x²−2x−1)/(x−1)².\nRacines f'=0 : x=1±√2≈2,41 et −0,41.\nTableau : décroissante sur ]−∞;1−√2], croissante sur [1−√2;1[,\ndécroissante sur ]1;1+√2], croissante sur [1+√2;+∞[." },
          ]
        },
      ]
    },
    {
      id:'sc-fonctions-ref', titre:'7.2 Fonctions de référence',
      notions:['Exponentielle eˣ et eᵘ','Logarithme ln x et ln u','Fonctions irrationnelles √f(x)','Fonctions circulaires sin, cos, tan'],
      blocs:[
        {
          notion:'📉 Exponentielle et logarithme',
          theoremes:[
            { id:'F-EF1', type:'formule', nom:'Propriétés de exp et ln',
              enonce:"EXPONENTIELLE eˣ :\neˣ⁺ʸ=eˣeʸ ; (eˣ)'=eˣ ; 𝒟=ℝ ; Im=]0;+∞[\nlim(x→−∞)eˣ=0 ; lim(x→+∞)eˣ=+∞\n(eᵘ)'=u'eᵘ ; eˣ>0 toujours\n\nLOGARITHME NATUREL ln x :\nln(ab)=lna+lnb ; ln(aⁿ)=nlna ; (ln x)'=1/x\n𝒟=]0;+∞[ ; Im=ℝ ; ln1=0 ; lne=1\nlim(x→0⁺)lnx=−∞ ; lim(x→+∞)lnx=+∞\n(ln u)'=u'/u ; ln et exp sont réciproques\n\nCroissances comparées :\nxⁿ/eˣ→0 ; (ln x)/xᵅ→0 ; x·ln x→0 (x→0⁺)",
              remarque:"log_a(x)=ln x/ln a. En pratique : log₁₀(x)=ln x/ln 10≈ln x/2,303." },
          ],
          exercices:[
            { id:'EX-EF2', niveau:'Facile', titre:'Variations de xe^(−x)',
              enonce:"Étudier f(x)=xe^(−x) sur ℝ.",
              correction:"f'(x)=e^(−x)−xe^(−x)=e^(−x)(1−x).\nf'(x)>0 sur ]−∞;1[ → croissante.\nMax en x=1 : f(1)=1/e.\nf'(x)<0 sur ]1;+∞[ → décroissante.\nlim(x→+∞)f=0 ; lim(x→−∞)f=−∞." },
            { id:'EX-EF3', niveau:'Intermédiaire', titre:'Fonction irrationnelle',
              enonce:"f(x)=√(x²−4x). Domaine et variations.",
              correction:"x(x−4)≥0 → 𝒟=]−∞;0]∪[4;+∞[.\nf'(x)=(2x−4)/(2√(x²−4x))=(x−2)/√(x²−4x).\nSur ]−∞;0[ : x<2 → f'<0 → décroissante.\nSur ]4;+∞[ : x>2 → f'>0 → croissante." },
          ]
        },
      ]
    },
  ]
},

// ─────────────────────────────────────────────────────────────────────
// CH 08 — GÉOMÉTRIE PLANE
// ─────────────────────────────────────────────────────────────────────
'geometrie-plane': {
  id:'geometrie-plane', emoji:'📐', badge:'Géométrie', color:'#06d6a0',
  titre:'Géométrie Plane',
  desc:"Vecteurs, produit scalaire, équations de droites (cartésiennes, réduites, paramétriques), cercles (équation, tangente), distances et positions relatives.",
  souschapitres:[
    {
      id:'sc-vecteurs-plan', titre:'8.1 Vecteurs et produit scalaire',
      notions:['Colinéarité det(u⃗,v⃗)=0','Produit scalaire u⃗·v⃗=|u||v|cosθ','Orthogonalité u⃗·v⃗=0','Distance et projeté'],
      blocs:[
        {
          notion:'🔷 Vecteurs dans le plan',
          theoremes:[
            { id:'D-GP1', type:'def', nom:'Vecteurs et colinéarité',
              enonce:"Dans le repère orthonormé (O;i⃗;j⃗) :\nu⃗(a;b) et v⃗(c;d)\n\n|u⃗| = √(a²+b²)\n\nColinéarité : u⃗ ∥ v⃗ ↔ det(u⃗,v⃗) = ad−bc = 0\n\nBase (u⃗;v⃗) libre ↔ det≠0\nCoordin. de M dans la base : M=αu⃗+βv⃗\n\nMillieu de [AB] : I((xA+xB)/2 ; (yA+yB)/2)" },
            { id:'F-GP1', type:'formule', nom:'Produit scalaire',
              enonce:"u⃗(a;b)·v⃗(c;d) = ac+bd  (formule coordonnées)\nu⃗·v⃗ = |u⃗|·|v⃗|·cosθ  (formule géométrique)\n\nOrthogonalité : u⃗·v⃗ = 0\n\nPropriétés :\n• u⃗·u⃗ = |u⃗|²\n• (u⃗+v⃗)·w⃗ = u⃗·w⃗ + v⃗·w⃗\n• u⃗·v⃗ = ½(|u⃗+v⃗|²−|u⃗|²−|v⃗|²)\n\nProjeté orthogonal de u⃗ sur v⃗ :\np = (u⃗·v⃗)/|v⃗|²·v⃗" },
          ],
          exercices:[
            { id:'EX-GP1', niveau:'Facile', titre:'Produit scalaire',
              enonce:"u⃗(3;4), v⃗(−4;3). Calculer u⃗·v⃗ et déduire l'angle.",
              correction:"u⃗·v⃗=3×(−4)+4×3=−12+12=0.\nOrthogonaux : angle=90°." },
          ]
        },
      ]
    },
    {
      id:'sc-droites-cercles', titre:'8.2 Droites et cercles',
      notions:['Équation cartésienne ax+by+c=0','Équation réduite y=mx+p','Distance point-droite','Équation cercle, tangente','Intersection droite-cercle'],
      blocs:[
        {
          notion:'📏 Droites dans le plan',
          theoremes:[
            { id:'F-GP2', type:'formule', nom:'Équations de droites',
              enonce:"Cartésienne : ax+by+c=0  (n⃗(a;b) vecteur normal)\nRéduite : y=mx+p  (m=pente, p=ordonnée à l'origine)\nParamétrique : {x=x₀+at ; y=y₀+bt}  (u⃗(a;b) vecteur directeur)\n\nRelation normale-directeur :\nSi directeur u⃗(a;b) → normale n⃗(−b;a)\n\nPente de la droite (A,B) : m=(yB−yA)/(xB−xA)\n\nDistance de M₀(x₀;y₀) à la droite ax+by+c=0 :\nd = |ax₀+by₀+c| / √(a²+b²)\n\nPositions relatives :\n• Parallèles : même n⃗ (prop.) mais c différent\n• Confondues : même équation\n• Sécantes : résoudre le système → 1 point" },
            { id:'F-GP3', type:'formule', nom:'Cercles dans le plan',
              enonce:"Cercle Γ de centre Ω(a;b) et rayon r>0 :\n(x−a)²+(y−b)²=r²\n\nForme développée : x²+y²+Ax+By+C=0\nCentre=(−A/2;−B/2) ; r=√(A²/4+B²/4−C)\n\nTangente à Γ en M₀(x₀;y₀)∈Γ :\n(x₀−a)(x−a)+(y₀−b)(y−b)=r²\n\nPosition de M par rapport à Γ :\nd(M,Ω)<r : intérieur\nd(M,Ω)=r : sur le cercle\nd(M,Ω)>r : extérieur" },
          ],
          exercices:[
            { id:'EX-DR1', niveau:'Facile', titre:'Équation de droite',
              enonce:'Droite par A(1;2) et B(3;−2). Équation cartésienne.',
              correction:"u⃗AB=(2;−4), n⃗(4;2)=(2;1).\n2(x−1)+1(y−2)=0 → 2x+y−4=0." },
            { id:'EX-DR2', niveau:'Intermédiaire', titre:'Tangente au cercle',
              enonce:'Γ:(x−1)²+(y+2)²=25. Vérifier A(4;2)∈Γ, tangente en A.',
              correction:"d(A,Ω)=√(9+16)=5=r ✓\nTangente : 3(x−1)+4(y+2)=25 → 3x+4y=20." },
            { id:'EX-DR3', niveau:'Difficile', titre:'Intersection droite-cercle',
              enonce:'Δ:y=2x+1. Γ:x²+y²=5. Intersections.',
              correction:"Substituer : x²+(2x+1)²=5\n5x²+4x−4=0.\nΔ'=4+20=24. x=(−4±4√6)/10=(−2±2√6)/5.\nDeux points d'intersection." },
          ]
        },
      ]
    },
  ]
},

// ─────────────────────────────────────────────────────────────────────
// CH 09 — GÉOMÉTRIE DANS L'ESPACE
// ─────────────────────────────────────────────────────────────────────
'geometrie-espace': {
  id:'geometrie-espace', emoji:'🧊', badge:'Géométrie', color:'#06d6a0',
  titre:"Géométrie dans l'Espace",
  desc:"Vecteurs 3D, droites et plans (équations paramétriques et cartésiennes), positions relatives, produit scalaire et vectoriel, distances.",
  souschapitres:[
    {
      id:'sc-droites-plans', titre:'9.1 Droites et plans dans l\'espace',
      notions:['Paramétrique droite : M=A+t·u⃗','Plan : ax+by+cz+d=0','Positions relatives droite-plan, plan-plan','Angle entre deux plans'],
      blocs:[
        {
          notion:'🗂️ Plans et droites — Équations',
          theoremes:[
            { id:'F-GE1', type:'formule', nom:'Équations dans l\'espace',
              enonce:"DROITE (A,u⃗) — paramétrique :\n{x=x₀+at ; y=y₀+bt ; z=z₀+ct}  t∈ℝ\n\nPLAN — équation cartésienne :\nax+by+cz+d=0  où n⃗(a;b;c) est la normale\n\nPlan par A₀(x₀;y₀;z₀), normale n⃗(a;b;c) :\na(x−x₀)+b(y−y₀)+c(z−z₀)=0\n\nPositions droite-plan :\nu⃗·n⃗=0 et A∉plan → droite ∥ plan\nu⃗·n⃗=0 et A∈plan  → droite ⊂ plan\nu⃗·n⃗≠0           → intersection en un point\n\nPositions plan-plan :\nn⃗₁ ∥ n⃗₂ → parallèles ou confondus\nn⃗₁ ∦ n⃗₂ → intersection = droite" },
          ],
          exercices:[
            { id:'EX-GE1', niveau:'Facile', titre:'Équation d\'un plan',
              enonce:"Plan par A(1;0;2) de normale n⃗(2;−1;3).",
              correction:"2(x−1)−1(y−0)+3(z−2)=0\n2x−y+3z−8=0." },
            { id:'EX-GE2', niveau:'Intermédiaire', titre:'Intersection droite-plan',
              enonce:"D:{x=1+t;y=2t;z=−1+3t}. P:2x−y+z=3.",
              correction:"2(1+t)−2t+(−1+3t)=3\n3t+1=3 → t=2/3.\nPoint (5/3;4/3;1)." },
          ]
        },
      ]
    },
    {
      id:'sc-distances-espace', titre:'9.2 Produit scalaire et distances',
      notions:['Produit scalaire 3D : u⃗·v⃗=aa\'+bb\'+cc\'','Produit vectoriel u⃗∧v⃗','Distance point-plan','Projeté orthogonal'],
      blocs:[
        {
          notion:'📏 Distances dans l\'espace',
          theoremes:[
            { id:'F-GE2', type:'formule', nom:'Produit vectoriel et distances',
              enonce:"Produit vectoriel u⃗(a₁;b₁;c₁) ∧ v⃗(a₂;b₂;c₂) :\n= (b₁c₂−c₁b₂ ; c₁a₂−a₁c₂ ; a₁b₂−b₁a₂)\n\nu⃗∧v⃗ est perpendiculaire à u⃗ et v⃗\n|u⃗∧v⃗|=|u⃗||v⃗|sinθ = aire du parallélogramme\n\nDistance du point M₀(x₀;y₀;z₀) au plan ax+by+cz+d=0 :\nd = |ax₀+by₀+cz₀+d| / √(a²+b²+c²)\n\nProjeté orthogonal H de A sur le plan Π :\nH = A + t₀·n⃗  où  t₀ = −(n⃗·A+d)/|n⃗|²\n\nAngle de deux plans (dièdre) :\ncosθ = |n⃗₁·n⃗₂| / (|n⃗₁|·|n⃗₂|)" },
          ],
          exercices:[
            { id:'EX-GE3', niveau:'Intermédiaire', titre:'Distance point-plan',
              enonce:"Distance de M(3;−1;2) au plan x+2y−2z+1=0.",
              correction:"d=|3+2(−1)−2(2)+1|/√(1+4+4)=|−2|/3=2/3." },
            { id:'EX-GE4', niveau:'Difficile', titre:'Produit vectoriel et normale',
              enonce:"Plan passant par A(1;0;0), B(0;2;0), C(0;0;3). Équation.",
              correction:"AB⃗=(−1;2;0), AC⃗=(−1;0;3).\nn⃗=AB⃗∧AC⃗=(2×3−0×0; 0×(−1)−(−1)×3; (−1)×0−2×(−1))\n=(6;3;2).\nPlan : 6(x−1)+3(y)+2(z)=0 → 6x+3y+2z=6." },
          ]
        },
      ]
    },
  ,
    {
      id:'sc-solides', titre:"9.3 Solides de l'espace — Volumes et sections",
      notions:['Pyramide et cône V=Bh/3','Sphère V=4πR³/3, A=4πR²','Principe de Cavalieri',"Section plane d'un solide"],
      blocs:[
        {
          notion:'📦 Volumes des solides',
          theoremes:[
            { id:'F-SO1', type:'formule', nom:'Volumes des solides usuels',
              enonce:"Prisme droit (base B, hauteur h) : V = B×h\n\nPyramide (base B, hauteur h) : V = (1/3)Bh\n\nCylindre (rayon r, hauteur h) : V = πr²h, Alat = 2πrh\n\nCône (rayon r, hauteur h) : V = (1/3)πr²h, Alat = πrl (l=arête latérale)\n\nSphère (rayon R) : V = (4/3)πR³, A = 4πR²\n\nPrincipe de Cavalieri : deux solides de même hauteur ayant des sections de même aire ont le même volume." },
          ],
          exercices:[
            { id:'EX-SO1', niveau:'Facile', titre:"Volume d'un cône",
              enonce:"Un cône a r=3 et h=4. Calculer V et Alat.",
              correction:"V=(1/3)π×9×4=12π.\nArête l=√(9+16)=5.\nAlat=π×3×5=15π." },
            { id:'EX-SO2', niveau:'Difficile', titre:"Section d'une sphère",
              enonce:"Sphère de centre O et rayon 5. Section par le plan 2x+2y+z=5. Rayon du cercle de section?",
              correction:"Distance du centre au plan : d=|5|/√(4+4+1)=5/3.\nRayon du cercle : r=√(25−25/9)=√(200/9)=10√2/3≈4.71." },
          ]
        },
      ]
    }]
},

// ─────────────────────────────────────────────────────────────────────
// CH 10 — GRAPHES & ALGORITHMIQUE
// ─────────────────────────────────────────────────────────────────────
'graphes': {
  id:'graphes', emoji:'🕸️', badge:'Info', color:'#f5c842',
  titre:'Graphes & Algorithmique',
  desc:"Définitions (sommets, arêtes, degré), théorème d'Euler, algorithme de Dijkstra, matrice d'adjacence, graphe orienté, graphe probabiliste.",
  souschapitres:[
    {
      id:'sc-graphes-def', titre:'10.1 Définitions et propriétés',
      notions:['Graphe G=(V,E), ordre, degré','Graphe connexe, chemin, cycle','Théorème des poignées de main','Chaîne et circuit eulériens (Euler)'],
      blocs:[
        {
          notion:'🕸️ Graphes — Vocabulaire et Euler',
          theoremes:[
            { id:'D-GR1', type:'def', nom:'Définitions fondamentales',
              enonce:"Graphe non orienté G=(V,E) :\nV = ensemble de sommets, E = ensemble d'arêtes\n\nOrdre = |V| (nombre de sommets)\nDegré d(v) = nombre d'arêtes incidentes à v\n\nGraphe connexe : il existe un chemin entre toute paire de sommets\n\nThéorème des poignées de main :\nΣᵢ d(vᵢ) = 2|E|\nCorollaire : le nombre de sommets de degré impair est pair\n\nGraphe complet Kₙ :\nChaque sommet relié à tous les autres : |E|=n(n−1)/2",
              remarque:"Chaîne : suite de sommets liés par des arêtes (arête visitée une seule fois).\nCycle : chaîne fermée." },
            { id:'T-GR1', type:'thm', nom:"Théorème d'Euler",
              enonce:"CHAÎNE EULÉRIENNE (traverse chaque arête exactement une fois) :\n↔ G connexe  ET  exactement 0 ou 2 sommets de degré impair\n\nCIRCUIT EULÉRIEN (chaîne eulérienne fermée) :\n↔ G connexe  ET  tous les sommets de degré pair\n\nSi 2 sommets impairs → ce sont les extrémités de la chaîne eulérienne\nSi 0 sommet impair → on peut commencer par n'importe quel sommet\n\nAlgorithme de construction : algorithme de Hierholzer",
              remarque:"Chemin hamiltonien (chaque SOMMET une fois) ≠ eulérien. Le problème hamiltonien est NP-complet." },
          ],
          exercices:[
            { id:'EX-GR1', niveau:'Facile', titre:'Somme des degrés',
              enonce:'Graphe : 6 sommets et 9 arêtes. Somme de tous les degrés ?',
              correction:'Σd(vᵢ)=2|E|=18.' },
            { id:'EX-GR2', niveau:'Intermédiaire', titre:'Chaîne eulérienne ?',
              enonce:"Sommets {A,B,C,D,E}, arêtes AB,AC,BC,BD,CD,DE. Chaîne eulérienne ?",
              correction:'d(A)=2, d(B)=3, d(C)=3, d(D)=3, d(E)=1.\n4 sommets impairs → pas de chaîne eulérienne (il en faut 0 ou 2).' },
          ]
        },
      ]
    },
    {
      id:'sc-dijkstra', titre:'10.2 Algorithme de Dijkstra',
      notions:['Plus court chemin depuis source s','Initialisation d(s)=0, d(v)=+∞','Mise à jour des voisins','Marquage et terminaison'],
      blocs:[
        {
          notion:'🗺️ Dijkstra — Plus court chemin',
          theoremes:[
            { id:'M-GR1', type:'methode', nom:'Algorithme de Dijkstra (étape par étape)',
              enonce:"But : trouver les plus courts chemins depuis un sommet source s vers tous les autres.\n\nINITIALISATION :\n  d(s)=0 ; d(v)=+∞ pour tout v≠s\n  Prédécesseur(v)=∅ pour tout v\n  M = ∅ (ensemble des sommets marqués)\n\nRÉPÉTER :\n  1. Choisir u ∉ M avec d(u) minimal\n  2. Pour chaque voisin v de u avec v∉M :\n     Si d(u)+w(u,v) < d(v) :\n       d(v) ← d(u)+w(u,v)\n       prédécesseur(v) ← u\n  3. M ← M∪{u}\nJUSQU'À M=V\n\nReconstruire le chemin : remonter depuis la destination via les prédécesseurs.",
              remarque:"⚠️ Ne fonctionne que pour des poids positifs ou nuls. Pour poids négatifs : algorithme de Bellman-Ford." },
          ],
          exercices:[
            { id:'EX-DJ1', niveau:'Intermédiaire', titre:'Dijkstra — 5 sommets',
              enonce:'Graphe : A−B(4), A−C(2), C−B(1), B−D(3), C−D(5). Plus court chemin A→D.',
              correction:'Init: d(A)=0,d(B)=∞,d(C)=∞,d(D)=∞.\nTraiter A : d(B)=4, d(C)=2.\nTraiter C (min=2) : d(B)=min(4,3)=3, d(D)=min(∞,7)=7.\nTraiter B (min=3) : d(D)=min(7,6)=6.\nTraiter D. Chemin : A→C→B→D (longueur 6).' },
            { id:'EX-DJ2', niveau:'Difficile', titre:'Tableau complet Dijkstra',
              enonce:'Réseau : A−B(3), A−C(1), B−D(2), B−E(4), C−B(1), C−D(5), D−E(1). Source A, trouver d(E).',
              correction:'d(A)=0.\nA→C=1, A→B=3.\nTraiter C : d(B)=min(3,1+1)=2, d(D)=min(∞,6)=6.\nTraiter B : d(D)=min(6,2+2)=4, d(E)=min(∞,2+4)=6.\nTraiter D : d(E)=min(6,4+1)=5.\nd(E)=5. Chemin : A→C→B→D→E.' },
          ]
        },
      ]
    },
    {
      id:'sc-matrices-graphes', titre:'10.3 Matrices et graphes probabilistes',
      notions:['Matrice d\'adjacence A=(aᵢⱼ)','Aᵏ donne les chemins de longueur k','Graphe probabiliste','Matrice de transition T et distribution stationnaire π*'],
      blocs:[
        {
          notion:'📊 Matrice d\'adjacence et probabiliste',
          theoremes:[
            { id:'D-GR2', type:'def', nom:"Matrice d'adjacence",
              enonce:"Matrice A=(aᵢⱼ) de taille n×n (n=ordre du graphe) :\naᵢⱼ = 1 si arête (vᵢ,vⱼ) existe ; 0 sinon\n\nGraphe non orienté → A symétrique (aᵢⱼ=aⱼᵢ)\nd(vᵢ) = Σⱼ aᵢⱼ  (somme de la ligne i)\n\nPropriété fondamentale :\n(Aᵏ)ᵢⱼ = nombre de chemins de longueur exactement k entre vᵢ et vⱼ\n\nApplication : compter les triangles (circuits de longueur 3) = trace(A³)/6" },
            { id:'D-GR3', type:'def', nom:'Graphe probabiliste et matrice de transition',
              enonce:"Graphe orienté où pour chaque sommet i :\nΣⱼ tᵢⱼ = 1  (la somme des probabilités sortantes = 1)\n\nMatrice de transition T=(tᵢⱼ) :\ntᵢⱼ = probabilité de passer de l'état i à l'état j\nChaque LIGNE somme à 1 (matrice stochastique)\n\nDistribution à l'étape n :\nπ⁽ⁿ⁾ = π⁽⁰⁾ · Tⁿ  (π vecteur ligne)\n\nDistribution stationnaire π* :\nπ*·T = π*  et  Σᵢ π*ᵢ = 1\n→ Résoudre le système (enlever une équation redondante)\n\nConvergence : si T est régulière (Tᵏ à entrées >0), alors π⁽ⁿ⁾→π*.",
              remarque:"Interprétation : π*ᵢ = proportion de temps passé dans l'état i sur le long terme." },
          ],
          exercices:[
            { id:'EX-MA2', niveau:'Intermédiaire', titre:'Matrice de transition',
              enonce:"T=[[0.7,0.3],[0.4,0.6]], π⁽⁰⁾=[1,0]. Calculer π⁽¹⁾ et π⁽²⁾.",
              correction:'π⁽¹⁾=[1,0]·T=[0.7,0.3].\nπ⁽²⁾=[0.7,0.3]·T=[0.7×0.7+0.3×0.4, 0.7×0.3+0.3×0.6]\n=[0.49+0.12, 0.21+0.18]=[0.61,0.39].' },
            { id:'EX-MA3', niveau:'Difficile', titre:'Distribution stationnaire',
              enonce:"Même T. Trouver π*=(π₁,π₂).",
              correction:'π*T=π* :\n0.7π₁+0.4π₂=π₁ → −0.3π₁+0.4π₂=0 → π₂=0.75π₁.\nπ₁+π₂=1 → 1.75π₁=1 → π₁=4/7, π₂=3/7.\nπ*=(4/7, 3/7)≈(0.571, 0.429).' },
          ]
        },
      ]
    },
  ]
},


// ─────────────────────────────────────────────────────────────────────
// CH 06 — FONCTIONS RÉCIPROQUES
// ─────────────────────────────────────────────────────────────────────
'fonctions-reciproques': {
  id:'fonctions-reciproques', emoji:'🔄', badge:'Analyse', color:'#4f6ef7',
  titre:'Fonctions Réciproques',
  desc:"Bijection, réciproque, arcsin, arccos, arctan — définitions, propriétés, dérivées.",
  souschapitres:[
    {
      id:'sc-bijection', titre:'6.1 Bijection et fonction réciproque',
      notions:['Fonction injective, surjective, bijective','Fonction réciproque f⁻¹','Symétrie par rapport à y=x','Dérivée de la réciproque'],
      blocs:[
        {
          notion:'📐 Bijection et réciproque',
          theoremes:[
            { id:'D-FR1', type:'def', nom:'Bijection',
              enonce:"f : I → J est bijective si et seulement si :\n• f est injective (x₁≠x₂ ⟹ f(x₁)≠f(x₂))\n• f est surjective (∀y∈J, ∃x∈I, f(x)=y)\n\nÉquivalent pour les fonctions continues et strictement monotones sur un intervalle." },
            { id:'T-FR1', type:'thm', nom:'Dérivée de la fonction réciproque',
              enonce:"Si f est dérivable et bijective sur I avec f'(x)≠0 :\n\n(f⁻¹)'(y) = 1 / f'(f⁻¹(y))\n\nOu encore : si y = f(x), alors (f⁻¹)'(y) = 1/f'(x)",
              remarque:"La courbe de f⁻¹ est le symétrique de celle de f par rapport à la droite y=x." },
          ],
          exercices:[
            { id:'EX-FR1', niveau:'Moyen', titre:'Réciproque et dérivée',
              enonce:"Soit f(x) = x³ + x définie sur ℝ. Montrer que f est bijective. Calculer (f⁻¹)'(2).",
              correction:"f'(x)=3x²+1≥1>0 → f strictement croissante → bijective.\nf(1)=2 donc f⁻¹(2)=1.\n(f⁻¹)'(2)=1/f'(1)=1/(3+1)=1/4." },
          ],
        },
      ],
    },
    {
      id:'sc-arctan', titre:'6.2 arcsin, arccos, arctan',
      notions:['arcsin : [-1,1] → [-π/2, π/2]','arccos : [-1,1] → [0, π]','arctan : ℝ → (-π/2, π/2)','Dérivées des fonctions arc'],
      blocs:[
        {
          notion:'📐 Les trois fonctions arc',
          theoremes:[
            { id:'F-FR2', type:'formule', nom:'Fonctions arcsin, arccos, arctan',
              enonce:"arcsin : [-1,1] → [-π/2, π/2]\n(arcsin x)' = 1/√(1-x²)   pour x ∈ (-1,1)\narcsin(sin x) = x pour x ∈ [-π/2,π/2]\n\narccos : [-1,1] → [0, π]\n(arccos x)' = -1/√(1-x²)   pour x ∈ (-1,1)\narcsin x + arccos x = π/2\n\narctan : ℝ → (-π/2, π/2)\n(arctan x)' = 1/(1+x²)\narctan x + arctan(1/x) = π/2  (x>0)\narctan(+∞) = π/2, arctan(-∞) = -π/2" },
          ],
          exercices:[
            { id:'EX-FR2', niveau:'Moyen', titre:'Dérivée avec arctan',
              enonce:"Calculer la dérivée de f(x) = arctan(2x+1).",
              correction:"f'(x) = 2/(1+(2x+1)²) = 2/(4x²+4x+2) = 1/(2x²+2x+1)." },
          ],
        },
      ],
    },
  ,
    {
      id:'sc-applications-arcs', titre:"6.3 Applications et résolution d'équations",
      notions:['Intégrales avec arctan et arcsin','Équations trigonométriques via fonctions arc','Inégalités avec fonctions arc'],
      blocs:[
        {
          notion:'🔧 Applications des fonctions arc',
          theoremes:[
            { id:'F-FA1', type:'formule', nom:'Intégrales utilisant arcsin et arctan',
              enonce:"∫ 1/√(a²−x²) dx = arcsin(x/a) + C  (|x|<a)\n\n∫ 1/(a²+x²) dx = (1/a)arctan(x/a) + C\n\nFormes composées :\n∫ u'/√(a²−u²) du = arcsin(u/a) + C\n∫ u'/(a²+u²) du = (1/a)arctan(u/a) + C\n\nExemple :\n∫ 1/(4+x²) dx = (1/2)arctan(x/2)+C" },
            { id:'M-FA1', type:'methode', nom:'Résoudre sin(f(x))=k, cos(f(x))=k',
              enonce:"sin θ = k  (|k|≤1) :\nθ = arcsin k + 2kπ  ou  θ = π−arcsin k + 2kπ\n\ncos θ = k  (|k|≤1) :\nθ = ±arccos k + 2kπ\n\ntan θ = k :\nθ = arctan k + kπ" },
          ],
          exercices:[
            { id:'EX-FA1', niveau:'Intermédiaire', titre:'Intégrale avec arctan',
              enonce:"Calculer ∫₀¹ x/(1+x⁴) dx.",
              correction:"u=x², du=2x dx → x dx=du/2.\n∫₀¹ (1/2)·1/(1+u²)du=[arctan(u)/2]₀¹=π/8." },
            { id:'EX-FA2', niveau:'Difficile', titre:'Équation trigonométrique',
              enonce:"Résoudre cos(2x+π/3)=1/2 sur [0;π].",
              correction:"cos θ=1/2 → θ=π/3 ou θ=5π/3 (+2kπ).\n2x+π/3=π/3 → x=0.\n2x+π/3=−π/3+2π → x=2π/3.\n2x+π/3=π/3+2π → x=π.\nSolutions : x∈{0;2π/3;π}." },
          ]
        },
      ]
    }],
},

// ─────────────────────────────────────────────────────────────────────
// CH 07 — LOGARITHME NÉPÉRIEN
// ─────────────────────────────────────────────────────────────────────
'logarithme': {
  id:'logarithme', emoji:'📊', badge:'Analyse', color:'#4f6ef7',
  titre:'Logarithme Népérien',
  desc:"Définition par intégrale, propriétés algébriques, dérivée (ln u)'=u'/u, étude complète, limites.",
  souschapitres:[
    {
      id:'sc-ln-def', titre:'7.1 Définition et propriétés',
      notions:['Définition intégrale de ln','Propriétés algébriques','Dérivée de ln u','Limites en 0⁺ et +∞'],
      blocs:[
        {
          notion:'📐 Logarithme népérien',
          theoremes:[
            { id:'D-LN1', type:'def', nom:'Définition par intégrale',
              enonce:"Le logarithme népérien est défini pour x>0 par :\n\nln x = ∫₁ˣ (1/t) dt\n\nPropriétés immédiates :\n• ln 1 = 0 (intégrale nulle)\n• ln e = 1 (e = 2,71828...)\n• ln est strictement croissante sur ]0,+∞[\n• ln est dérivable : (ln x)' = 1/x" },
            { id:'T-LN1', type:'thm', nom:'Propriétés algébriques',
              enonce:"Pour tous a,b > 0 et n ∈ ℤ :\n\nln(a×b) = ln a + ln b\nln(a/b) = ln a − ln b\nln(aⁿ) = n·ln a\nln(√a) = (1/2)ln a\n\nDérivée composée : si u>0,\n(ln u)' = u'/u",
              remarque:"La dérivée (ln u)'=u'/u est l'une des plus utilisées au Bac." },
            { id:'F-LN2', type:'formule', nom:'Limites aux bornes',
              enonce:"lim(x→0⁺) ln x = −∞\nlim(x→+∞) ln x = +∞\n\nCroissances comparées (fondamentales) :\nlim(x→+∞) (ln x)/xⁿ = 0  pour tout n>0\nlim(x→0⁺) x·ln x = 0\nlim(x→0⁺) xⁿ·ln x = 0  pour tout n>0" },
          ],
          exercices:[
            { id:'EX-LN1', niveau:'Facile', titre:'Dérivée avec logarithme',
              enonce:"Calculer f'(x) pour f(x)=ln(x²+1).",
              correction:"f'(x) = (x²+1)'/(x²+1) = 2x/(x²+1)." },
            { id:'EX-LN2', niveau:'Moyen', titre:'Limite avec ln',
              enonce:"Calculer lim(x→0⁺) x²·ln x.",
              correction:"Croissances comparées : lim(x→0⁺) x·ln x=0, donc lim x²·ln x = lim x·(x·ln x) = 0·0 = 0." },
          ],
        },
      ],
    },
  ,
    {
      id:'sc-ln-etude', titre:'7.2 Étude de fonctions contenant ln',
      notions:['Domaine et parité','Branches infinies et asymptotes','Tableau de variations complet','Fonctions xᵃ = e^(a·ln x)'],
      blocs:[
        {
          notion:'📈 Fonctions avec ln',
          theoremes:[
            { id:'M-LN2', type:'methode', nom:'Étude de f(x)=xⁿ·ln x',
              enonce:"f(x) = xⁿ·ln x sur ]0;+∞[ (n>0)\n\nf'(x) = n·xⁿ⁻¹·ln x + xⁿ/x = xⁿ⁻¹(n·ln x+1)\n\nAnnulation : n·ln x = −1 → x = e^(−1/n)\n\nlim(x→0⁺) xⁿ·ln x = 0 (croissances comparées)\n\nMinimum : f(e^(-1/n)) = −1/(n·e^(1/n))" },
            { id:'F-LN3', type:'formule', nom:'Puissances réelles xᵃ = e^(a·ln x)',
              enonce:"Pour a∈ℝ et x>0 :\nxᵃ = eᵃ·ˡⁿˣ\n(xᵃ)' = a·xᵃ⁻¹  (vraie pour tout a réel)\n\nLog en base a (a>0, a≠1) :\nlog_a(x) = ln x/ln a\n(log_a x)' = 1/(x·ln a)" },
          ],
          exercices:[
            { id:'EX-LN3', niveau:'Difficile', titre:'Étude complète de x²·ln x',
              enonce:'Étudier f(x)=x²·ln x sur ]0;+∞[.',
              correction:"Domaine ]0;+∞[. lim(x→0⁺)f=0, lim(x→+∞)f=+∞.\nf'(x)=2x·ln x+x=x(2ln x+1).\nf'=0 : ln x=−1/2 → x=1/√e.\nMinimum f(1/√e)=−1/(2e)≈−0.184." },
          ]
        },
      ]
    }],
},

// ─────────────────────────────────────────────────────────────────────
// CH 08 — FONCTION EXPONENTIELLE
// ─────────────────────────────────────────────────────────────────────
'exponentielle': {
  id:'exponentielle', emoji:'📈', badge:'Analyse', color:'#4f6ef7',
  titre:'Fonction Exponentielle',
  desc:"Réciproque de ln, (eᵘ)'=u'eᵘ, propriétés, croissances comparées, fonctions aˣ.",
  souschapitres:[
    {
      id:'sc-exp-def', titre:'8.1 Définition et propriétés',
      notions:['Définition comme réciproque de ln','Propriétés algébriques de exp','Dérivée (eᵘ)\'=u\'eᵘ','Croissances comparées'],
      blocs:[
        {
          notion:'📐 Fonction exponentielle',
          theoremes:[
            { id:'D-EX1', type:'def', nom:'Exponentielle — définition',
              enonce:"La fonction exponentielle exp = ln⁻¹ est l'unique solution de :\n  y' = y  avec  y(0) = 1\n\nOn note exp(x) = eˣ.\n\nPropriétés algébriques :\neᵃ⁺ᵇ = eᵃ·eᵇ\ne⁻ˣ = 1/eˣ\n(eᵃ)ᵇ = eᵃᵇ\neˣ > 0 pour tout x ∈ ℝ" },
            { id:'F-EX1', type:'formule', nom:'Dérivée et limites',
              enonce:"Dérivée : (eˣ)' = eˣ\n(eᵘ)' = u'·eᵘ  (règle de la chaîne)\n\nLimites :\nlim(x→−∞) eˣ = 0\nlim(x→+∞) eˣ = +∞\n\nCroissances comparées (fondamentales) :\nlim(x→+∞) eˣ/xⁿ = +∞  pour tout n>0\nlim(x→−∞) |x|ⁿ·eˣ = 0  pour tout n>0",
              remarque:"eˣ croît plus vite que tout polynôme en +∞." },
          ],
          exercices:[
            { id:'EX-EX1', niveau:'Facile', titre:'Dérivée avec exponentielle',
              enonce:"Calculer f'(x) pour f(x) = e^(x²−3x).",
              correction:"f'(x) = (2x−3)·e^(x²−3x)." },
            { id:'EX-EX2', niveau:'Moyen', titre:'Limite avec croissances comparées',
              enonce:"Calculer lim(x→+∞) x²·e^(−x).",
              correction:"lim(x→+∞) x²·e^(−x) = lim e^(−x)·x² = 0 (croissances comparées : eˣ domine x²)." },
          ],
        },
      ],
    },
  ,
    {
      id:'sc-exp-etude', titre:'8.2 Étude de fonctions avec exp',
      notions:['Fonctions eᵘ avec u polynôme','Modèles de croissance/décroissance','Équations avec exp et ln','Demi-vie'],
      blocs:[
        {
          notion:"📉 Applications de l'exponentielle",
          theoremes:[
            { id:'F-EX2', type:'formule', nom:'Modèles de croissance/décroissance',
              enonce:"Croissance exponentielle :\ny(t) = y₀·e^(rt)  (r>0)\n\nDécroissance exponentielle :\ny(t) = y₀·e^(-λt)  (λ>0)\nDemi-vie T₁/₂ : y(T₁/₂)=y₀/2 → T₁/₂=ln2/λ\n\nRefroidissement de Newton :\nT(t)=T_env+(T₀−T_env)·e^(-kt)" },
            { id:'M-EX1', type:'methode', nom:'Résoudre e^u = k',
              enonce:"e^(f(x)) = e^(g(x)) ↔ f(x) = g(x)  (exp injective)\ne^(f(x)) = k  (k>0) ↔ f(x) = ln k\ne^(f(x)) = k  (k≤0) : impossible (exp toujours >0)\n\nInéquation e^(f(x)) ≤ e^(g(x)) ↔ f(x) ≤ g(x)  (exp croissante)" },
          ],
          exercices:[
            { id:'EX-EX3', niveau:'Intermédiaire', titre:'Décroissance radioactive',
              enonce:"Le carbone 14 a une demi-vie de 5730 ans. Un os contient 60% du C14 initial. Quel est son âge?",
              correction:"T₁/₂=5730 → λ=ln2/5730.\nN(t)=N₀e^(-λt)=0.6N₀.\nλt=ln(5/3).\nt=5730×ln(5/3)/ln2≈4227 ans." },
            { id:'EX-EX4', niveau:'Difficile', titre:'Étude de f(x)=eˣ/(1+eˣ)',
              enonce:"Étudier f(x)=eˣ/(1+eˣ) sur ℝ. Asymptotes, variations, point d'inflexion.",
              correction:"lim(x→-∞)f=0 (AH y=0) ; lim(x→+∞)f=1 (AH y=1).\nf'(x)=eˣ/(1+eˣ)²>0 → croissante sur ℝ.\nf''(x)=eˣ(1−eˣ)/(1+eˣ)³=0 en x=0 (inflexion)." },
          ]
        },
      ]
    }],
},

// ─────────────────────────────────────────────────────────────────────
// CH 09 — CALCUL INTÉGRAL
// ─────────────────────────────────────────────────────────────────────
'calcul-integral': {
  id:'calcul-integral', emoji:'∫', badge:'Analyse', color:'#4f6ef7',
  titre:'Calcul Intégral',
  desc:"Primitives, intégrale de Riemann, TFA, IPP, changement de variable, aires, volumes.",
  souschapitres:[
    {
      id:'sc-primitives', titre:'9.1 Primitives et intégrale de Riemann',
      notions:['Primitives des fonctions usuelles','Intégrale définie ∫ₐᵇf(x)dx',"Théorème fondamental de l'analyse",'Linéarité et positivité'],
      blocs:[
        {
          notion:'📐 Intégrale de Riemann',
          theoremes:[
            { id:'F-CI1', type:'formule', nom:'Primitives usuelles',
              enonce:"Primitives fondamentales (à connaître) :\nxⁿ → xⁿ⁺¹/(n+1)  (n≠-1)\n1/x → ln|x|\neˣ → eˣ\nsin x → −cos x\ncos x → sin x\n1/√(1-x²) → arcsin x\n1/(1+x²) → arctan x\n\nPrimitive de u'vⁿ : u'vⁿ → vⁿ⁺¹/(n+1)\nPrimitive de u'/u : → ln|u|\nPrimitive de u'eᵘ : → eᵘ" },
            { id:'T-CI1', type:'thm', nom:"Théorème fondamental de l'analyse",
              enonce:"Si f est continue sur [a,b] et F une primitive de f :\n\n∫ₐᵇ f(x)dx = F(b) − F(a) = [F(x)]ₐᵇ\n\nPropriétés :\n• ∫ₐᵃ f = 0\n• ∫ₐᵇ f = −∫ᵦᵃ f\n• ∫ₐᵇ f + ∫ᵦᶜ f = ∫ₐᶜ f  (relation de Chasles)\n• |∫ₐᵇ f| ≤ ∫ₐᵇ |f|" },
            { id:'T-CI2', type:'thm', nom:'Intégration par parties (IPP)',
              enonce:"∫ₐᵇ u'(x)·v(x)dx = [u(x)·v(x)]ₐᵇ − ∫ₐᵇ u(x)·v'(x)dx\n\nChoix classique :\n• Polynôme × eˣ : dériver le polynôme\n• Polynôme × ln x : dériver ln, intégrer le polynôme\n• Polynôme × sin/cos : dériver le polynôme" },
          ],
          exercices:[
            { id:'EX-CI1', niveau:'Moyen', titre:'IPP — Intégration par parties',
              enonce:"Calculer ∫₀¹ x·eˣ dx.",
              correction:"IPP avec u'=eˣ, v=x → u=eˣ, v'=1.\n∫₀¹ xeˣdx = [xeˣ]₀¹ − ∫₀¹ eˣdx = e − [eˣ]₀¹ = e − (e−1) = 1." },
          ],
        },
      ],
    },
    {
      id:'sc-aires-volumes', titre:'9.2 Aires et volumes',
      notions:['Aire entre deux courbes','Volume de révolution','Valeur moyenne'],
      blocs:[
        {
          notion:'📐 Applications géométriques',
          theoremes:[
            { id:'F-CI3', type:'formule', nom:'Aires et volumes',
              enonce:"Aire entre deux courbes f et g sur [a,b] :\nA = ∫ₐᵇ |f(x)−g(x)| dx\n\nVolume de révolution autour de Ox :\nV = π ∫ₐᵇ [f(x)]² dx\n\nValeur moyenne de f sur [a,b] :\nm = (1/(b−a)) ∫ₐᵇ f(x) dx" },
          ],
          exercices:[
            { id:'EX-CI2', niveau:'Moyen', titre:'Volume de révolution',
              enonce:"Calculer le volume du solide de révolution obtenu en faisant tourner y=√x (0≤x≤1) autour de Ox.",
              correction:"V = π ∫₀¹ (√x)² dx = π ∫₀¹ x dx = π [x²/2]₀¹ = π/2." },
          ],
        },
      ],
    },
  ,
    {
      id:'sc-changement-var', titre:'9.3 Changement de variable et intégrales généralisées',
      notions:['Changement de variable x=φ(t)','Primitives de fonctions trigonométriques','Intégrales impropres','Convergence/divergence'],
      blocs:[
        {
          notion:'🔄 Changement de variable',
          theoremes:[
            { id:'F-CV1', type:'formule', nom:'Changement de variable',
              enonce:"Si x = φ(t) est C¹ et bijective :\n∫_{φ(α)}^{φ(β)} f(x)dx = ∫_α^β f(φ(t))·φ'(t)dt\n\nMéthode :\n1. Choisir x=φ(t) et calculer dx=φ'(t)dt\n2. Changer les bornes : a=φ(α), b=φ(β)\n3. Intégrer la nouvelle expression en t\n\nExemples classiques :\n• ∫√(a²−x²)dx → x=a·sint\n• ∫1/(a²+x²)dx → x=a·tant → arctan",
              remarque:"Toujours bien changer les bornes quand on change la variable !" },
            { id:'F-CV2', type:'formule', nom:'Intégrales généralisées',
              enonce:"Intégrale impropre en +∞ :\n∫_a^{+∞} f(x)dx = lim_{M→+∞} ∫_a^M f(x)dx\n\nConvergence des intégrales de Riemann :\n∫_1^{+∞} 1/xᵅ dx converge ↔ α>1\n∫_0^1 1/xᵅ dx converge ↔ α<1" },
          ],
          exercices:[
            { id:'EX-CV1', niveau:'Intermédiaire', titre:'Changement de variable trigonométrique',
              enonce:"Calculer ∫₀^1 √(1−x²)dx par x=sin(t).",
              correction:"x=sint, dx=cost dt. Bornes : t=0→π/2.\n∫₀^{π/2} cos²t dt = (1/2)∫₀^{π/2}(1+cos2t)dt = π/4.\n(Aire d'un quart de disque unité.)" },
            { id:'EX-CV2', niveau:'Difficile', titre:'Intégrale impropre',
              enonce:"Étudier la convergence de ∫_1^{+∞} e^(-x)/x dx.",
              correction:"0 < e^(-x)/x ≤ e^(-x) pour x≥1.\n∫_1^{+∞} e^(-x)dx = e^(-1) converge.\nDonc par comparaison : ∫_1^{+∞} e^(-x)/x dx converge." },
          ]
        },
      ]
    }],
},

// ─────────────────────────────────────────────────────────────────────
// CH 10 — ÉQUATIONS DIFFÉRENTIELLES
// ─────────────────────────────────────────────────────────────────────
'equations-differentielles': {
  id:'equations-differentielles', emoji:'∂', badge:'Analyse', color:'#4f6ef7',
  titre:'Équations Différentielles',
  desc:"y'=ay, y'=ay+b, y''+ay'+by=0 — équation caractéristique, solutions selon discriminant.",
  souschapitres:[
    {
      id:'sc-eq1', titre:'10.1 Équations du premier ordre',
      notions:["y'=ay — solution générale","y'=ay+b — méthode variation constante",'Conditions initiales'],
      blocs:[
        {
          notion:'📐 Équations différentielles du 1er ordre',
          theoremes:[
            { id:'T-ED1', type:'thm', nom:"Solution de y'=ay",
              enonce:"L'équation différentielle y' = ay (a∈ℝ) a pour solution générale :\n\ny(x) = C·eᵃˣ   (C ∈ ℝ quelconque)\n\nCondition initiale : si y(0)=y₀, alors C=y₀.\nDonc y(x) = y₀·eᵃˣ" },
            { id:'T-ED2', type:'thm', nom:"Solution de y'=ay+b",
              enonce:"Méthode :\n1. Solution particulière constante yₚ = −b/a (si a≠0)\n2. Solution homogène de y'=ay : yₕ = Ceᵃˣ\n3. Solution générale : y = Ceᵃˣ − b/a\n\nCondition initiale y(0)=y₀ :\nC = y₀ + b/a" },
          ],
          exercices:[
            { id:'EX-ED1', niveau:'Facile', titre:"Résolution de y\'=3y",
              enonce:"Résoudre y'=3y avec y(0)=2.",
              correction:"Solution générale : y=Ce^(3x).\ny(0)=C=2 donc y=2e^(3x)." },
          ],
        },
      ],
    },
    {
      id:'sc-eq2', titre:"10.2 Équations du second ordre y''+ay'+by=0",
      notions:['Équation caractéristique r²+ar+b=0','Discriminant Δ=a²-4b','Cas Δ>0, Δ=0, Δ<0'],
      blocs:[
        {
          notion:'📐 Équations différentielles du 2ème ordre',
          theoremes:[
            { id:'T-ED3', type:'thm', nom:"Solution selon Δ",
              enonce:"Équation : y'' + ay' + by = 0\nÉquation caractéristique : r² + ar + b = 0\nDiscriminant : Δ = a² − 4b\n\n• Δ > 0 : deux racines réelles r₁ ≠ r₂\n  y = C₁e^(r₁x) + C₂e^(r₂x)\n\n• Δ = 0 : racine double r₀ = −a/2\n  y = (C₁ + C₂x)e^(r₀x)\n\n• Δ < 0 : racines complexes r = α ± iβ\n  avec α = −a/2, β = √(−Δ)/2\n  y = e^(αx)(C₁cos(βx) + C₂sin(βx))",
              remarque:"Les deux constantes C₁ et C₂ sont déterminées par deux conditions initiales : y(0) et y'(0)." },
          ],
          exercices:[
            { id:'EX-ED2', niveau:'Moyen', titre:"Résolution y''+2y'+y=0",
              enonce:"Résoudre y''+2y'+y=0.",
              correction:"Éq. caract. : r²+2r+1=0 → (r+1)²=0 → r=-1 (racine double).\ny=(C₁+C₂x)e^(-x)." },
          ],
        },
      ],
    },
  ,
    {
      id:'sc-eq-avec-second-membre', titre:'10.3 Équations avec second membre',
      notions:["y'=ay+f(x) — variation de la constante","y''+ay'+by=f(x) — solution particulière",'Second membre polynôme/exponentielle','Superposition des solutions'],
      blocs:[
        {
          notion:'⚡ Équations avec second membre',
          theoremes:[
            { id:'T-ED4', type:'thm', nom:"Structure de l'ensemble des solutions",
              enonce:"Pour L(y)=f(x) (équation différentielle linéaire) :\n\nSolution générale = Solution homogène + Solution particulière\ny = yₕ + yₚ\n\nyₕ : solution générale de L(y)=0 (avec C libre)\nyₚ : une solution particulière de L(y)=f(x)\n\nMéthode de variation de la constante (ordre 1) :\ny'=ay+f(x) → yₕ=Ceᵃˣ → poser C=C(x)\nC'(x)eᵃˣ=f(x) → C'(x)=f(x)e⁻ᵃˣ" },
            { id:'M-ED1', type:'methode', nom:'Choix de la solution particulière',
              enonce:"f(x) = Pₙ(x) (degré n) → yₚ = Qₙ(x)\nf(x) = Pₙ(x)·eᵅˣ → yₚ = Qₙ(x)·eᵅˣ\n(Si α est racine simple : yₚ=x·Qₙ(x)eᵅˣ)\nf(x) = A·cos(βx)+B·sin(βx) → yₚ = a·cos(βx)+b·sin(βx)\n(Si iβ est racine : yₚ = x(a·cos(βx)+b·sin(βx)))" },
          ],
          exercices:[
            { id:'EX-ED3', niveau:'Intermédiaire', titre:'Second membre exponentiel',
              enonce:"Résoudre y'−2y=3e^(2x).",
              correction:"Éq. homogène → yₕ=Ce^(2x).\nα=2 est racine → yₚ=axe^(2x).\nyₚ'=ae^(2x)+2axe^(2x).\nyₚ'−2yₚ=ae^(2x)=3e^(2x) → a=3.\ny=(C+3x)e^(2x)." },
            { id:'EX-ED4', niveau:'Difficile', titre:'Équation du 2ème ordre avec second membre',
              enonce:"Résoudre y''−y=eˣ avec y(0)=1, y'(0)=0.",
              correction:"Éq. caract. : r²−1=0 → r=±1.\nyₕ=C₁eˣ+C₂e^(−x).\nα=1 est racine simple → yₚ=axeˣ.\nyₚ''−yₚ=2aeˣ=eˣ → a=1/2.\ny=C₁eˣ+C₂e^(−x)+(x/2)eˣ.\ny(0)=C₁+C₂=1.\ny'(0)=C₁−C₂+1/2=0 → C₁=1/4, C₂=3/4." },
          ]
        },
      ]
    }],
},

// ─────────────────────────────────────────────────────────────────────
// CH 12 — ISOMÉTRIES & SIMILITUDES
// ─────────────────────────────────────────────────────────────────────
'isometries-similitudes': {
  id:'isometries-similitudes', emoji:'🔄', badge:'Géométrie', color:'#06d6a0',
  titre:'Isométries & Similitudes du Plan',
  desc:"Isométries directes/indirectes, similitudes, expression complexe f(z)=az+b ou f(z)=az̄+b.",
  souschapitres:[
    {
      id:'sc-isometries', titre:'12.1 Isométries du plan',
      notions:['Isométries directes : translations, rotations','Isométries indirectes : réflexions, retournements','Expression complexe des isométries'],
      blocs:[
        {
          notion:'📐 Isométries',
          theoremes:[
            { id:'T-IS1', type:'thm', nom:'Classification des isométries',
              enonce:"Une isométrie est une transformation qui conserve les distances.\n\nIsométries directes (conservent l'orientation) :\n• Translation de vecteur a⃗ : f(z) = z + a\n• Rotation de centre Ω, angle θ : f(z) = e^(iθ)(z−ω) + ω\n\nIsométries indirectes (renversent l'orientation) :\n• Réflexion (axiale) d'axe D : f(z) = e^(2iθ)·z̄ + c\n• Retournement (symétrie glissée)\n\nToute isométrie directe sans point fixe est une translation.\nToute isométrie directe avec point fixe est une rotation." },
          ],
          exercices:[
            { id:'EX-IS1', niveau:'Moyen', titre:'Isométrie directe',
              enonce:"Soit f(z)=iz+2−i. Montrer que f est une rotation et trouver son centre et son angle.",
              correction:"f(z)=e^(iπ/2)·z+2−i. Angle θ=π/2.\nCentre ω : ω=iω+2−i → ω−iω=2−i → ω(1−i)=2−i → ω=(2−i)/(1−i)=(2−i)(1+i)/2=(3+i)/2." },
          ],
        },
      ],
    },
    {
      id:'sc-similitudes', titre:'12.2 Similitudes',
      notions:['Similitude directe : rotation + homothétie','Expression f(z)=az+b (a≠1)','Rapport |a| et angle arg(a)','Similitude indirecte f(z)=az̄+b'],
      blocs:[
        {
          notion:'📐 Similitudes',
          theoremes:[
            { id:'T-SI1', type:'thm', nom:'Similitudes directes et indirectes',
              enonce:"Similitude directe (k≠1) : f(z) = az + b  avec a∈ℂ, |a|≠0,1\n• Rapport de la similitude : k = |a|\n• Angle de la similitude : θ = arg(a)\n• Point fixe : ω = b/(1−a)\n\nSi |a|=1 et a≠1 : rotation d'angle θ\nSi arg(a)=0 et |a|≠1 : homothétie de rapport k\n\nSimilitude indirecte : f(z) = az̄ + b\n• Rapport k = |a|, compose réflexion + homothétie",
              remarque:"f(z)=az+b est une similitude directe ⟺ a∈ℂ*, f(z)=az̄+b est indirecte." },
          ],
          exercices:[
            { id:'EX-SI1', niveau:'Moyen', titre:"Point fixe d'une similitude",
              enonce:"Trouver le point fixe de f(z)=(1+i)z+2.",
              correction:"ω=(1+i)ω+2 → ω−(1+i)ω=2 → ω(−i)=2 → ω=2/(−i)=2i/(−i²)=2i." },
          ],
        },
      ],
    },
  ],
},

// ─────────────────────────────────────────────────────────────────────
// CH 13 — CONIQUES
// ─────────────────────────────────────────────────────────────────────
'coniques': {
  id:'coniques', emoji:'🔵', badge:'Géométrie', color:'#06d6a0',
  titre:'Coniques',
  desc:"Parabole (y²=2px), ellipse (x²/a²+y²/b²=1, e<1), hyperbole (x²/a²-y²/b²=1, asymptotes, e>1).",
  souschapitres:[
    {
      id:'sc-parabole', titre:'13.1 Parabole',
      notions:['Définition foyer/directrice','Équation réduite y²=2px','Propriétés de réflexion'],
      blocs:[
        {
          notion:'📐 Parabole',
          theoremes:[
            { id:'D-CO1', type:'def', nom:'Parabole — définition et équation',
              enonce:"La parabole est le lieu des points M équidistants du foyer F et de la directrice D.\n\nÉquation réduite (axe Ox, sommet à l'origine) :\ny² = 2px  (p > 0)\n\nÉléments :\n• Foyer : F(p/2 ; 0)\n• Directrice : x = −p/2\n• Sommet : O(0;0)\n• Axe de symétrie : axe Ox\n• Excentricité : e = 1\n\nTangente en M(x₀,y₀) : y·y₀ = p(x+x₀)" },
          ],
          exercices:[
            { id:'EX-CO1', niveau:'Facile', titre:"Éléments d'une parabole",
              enonce:"Donner le foyer et la directrice de la parabole y²=8x.",
              correction:"2p=8 → p=4. Foyer F(2;0), directrice x=−2." },
          ],
        },
      ],
    },
    {
      id:'sc-ellipse', titre:'13.2 Ellipse et hyperbole',
      notions:['Ellipse x²/a²+y²/b²=1 (a>b>0)','Foyers F₁F₂, a²=b²+c²','Excentricité e=c/a<1','Hyperbole x²/a²-y²/b²=1, e>1, asymptotes'],
      blocs:[
        {
          notion:'📐 Ellipse',
          theoremes:[
            { id:'D-CO2', type:'def', nom:'Ellipse',
              enonce:"Ellipse : lieu des points M tels que MF₁+MF₂ = 2a\n\nÉquation réduite : x²/a² + y²/b² = 1  avec a > b > 0\n\nÉléments :\n• Foyers : F₁(−c;0), F₂(c;0) avec c²=a²−b²\n• Excentricité : e = c/a < 1\n• Demi-grand axe : a (horizontal), demi-petit axe : b (vertical)\n• Sommets : (±a;0) et (0;±b)\n\nPropriété : MF₁ + MF₂ = 2a pour tout M de l'ellipse" },
            { id:'D-CO3', type:'def', nom:'Hyperbole',
              enonce:"Hyperbole : lieu des points M tels que |MF₁−MF₂| = 2a\n\nÉquation réduite : x²/a² − y²/b² = 1\n\nÉléments :\n• Foyers : F₁(−c;0), F₂(c;0) avec c²=a²+b²\n• Excentricité : e = c/a > 1\n• Asymptotes : y = ±(b/a)x\n• Sommets : (±a;0)\n\nPropriété : |MF₁−MF₂| = 2a" },
          ],
          exercices:[
            { id:'EX-CO2', niveau:'Moyen', titre:"Éléments d'une ellipse",
              enonce:"Donner les foyers et l'excentricité de x²/25 + y²/16 = 1.",
              correction:"a²=25, b²=16 → a=5, b=4, c²=25−16=9 → c=3.\nFoyers F₁(-3;0), F₂(3;0). Excentricité e=3/5=0,6." },
          ],
        },
      ],
    },
  ,
    {
      id:'sc-tangentes-coniques', titre:'13.3 Tangentes et propriétés optiques',
      notions:['Tangente en un point de la conique','Propriété de réflexion de l\'ellipse et parabole','Excentricité et foyer-directrice'],
      blocs:[
        {
          notion:'🔮 Propriétés optiques et tangentes',
          theoremes:[
            { id:'T-CO1', type:'thm', nom:'Tangentes et propriétés de réflexion',
              enonce:"ELLIPSE — tangente en M₀(x₀,y₀) :\nx·x₀/a² + y·y₀/b² = 1\n\nPropriété optique : tout rayon issu de F₁ se réfléchit en M vers F₂.\nApplication : miroirs elliptiques, lithotriteur médical.\n\nPARABOLE — tangente en M₀(x₀,y₀) :\ny·y₀ = p(x+x₀)\n\nPropriété optique : tout rayon parallèle à l'axe est réfléchi vers le foyer F.\nApplication : antennes paraboliques, phares, fours solaires." },
            { id:'F-CO2', type:'formule', nom:'Foyer-directrice et excentricité',
              enonce:"Definition unifiée : la conique est le lieu des points M tels que\nMF / Md = e  (e = excentricité, d = distance à la directrice)\n\n• e = 1 → parabole\n• e < 1 → ellipse\n• e > 1 → hyperbole\n\nEllipse x²/a² + y²/b² = 1 : directrices x = ±a²/c" },
          ],
          exercices:[
            { id:'EX-CO3', niveau:'Intermédiaire', titre:'Excentricité et classification',
              enonce:"Une conique a pour foyer F(3;0) et directrice x=4/3. Identifier et donner son équation.",
              correction:"e=MF/Md. Pour le sommet x=a : a·e=3−a/e... Essayons e=c/a avec c=3.\nSi e<1 → ellipse. e=c/a < 1 → a>3.\nEquation directrice x=a²/c=a²/3=4/3 → a²=4 → a=2.\nc=3? Non, c²=a²−b² et e=c/a.\nAvec x=a/e=4/3 : a/(c/a)=a²/c=4/3 et c=3 → a²=4 → a=2 → c²=4−b²=9? Non.\nc=a·e, directrice x=a/e=4/3. Essayons e=3/2>1 (hyperbole) : a/(3/2)=4/3 → a=2, c=ae=3, b²=c²-a²=5.\nHyperbole x²/4−y²/5=1." },
          ]
        },
      ]
    }],
},

// ─────────────────────────────────────────────────────────────────────
// CH 14 — PROBABILITÉS DISCRÈTES
// ─────────────────────────────────────────────────────────────────────
'probabilites-discretes': {
  id:'probabilites-discretes', emoji:'🎲', badge:'Probabilités', color:'#f43f5e',
  titre:'Probabilités Discrètes',
  desc:"Probabilité conditionnelle, Bayes, variables aléatoires, loi binomiale B(n,p), loi de Poisson P(λ).",
  souschapitres:[
    {
      id:'sc-cond', titre:'14.1 Probabilité conditionnelle et Bayes',
      notions:['P(A|B)=P(A∩B)/P(B)','Indépendance de deux événements','Formule des probabilités totales','Théorème de Bayes'],
      blocs:[
        {
          notion:'📐 Probabilités conditionnelles',
          theoremes:[
            { id:'D-PD1', type:'def', nom:'Probabilité conditionnelle',
              enonce:"P(A|B) = P(A∩B) / P(B)   (P(B) > 0)\n\nLecture : 'probabilité de A sachant B'\n\nIndépendance : A et B sont indépendants si :\nP(A∩B) = P(A)·P(B)  ⟺  P(A|B) = P(A)" },
            { id:'T-PD1', type:'thm', nom:'Probabilités totales et Bayes',
              enonce:"Si (B₁,...,Bₙ) est un système complet d'événements :\n\nProbabilités totales :\nP(A) = Σᵢ P(A|Bᵢ)·P(Bᵢ)\n\nThéorème de Bayes :\nP(Bᵢ|A) = P(A|Bᵢ)·P(Bᵢ) / P(A)\n\nUtilisation : arbre de probabilité (feuilles = chemins)." },
          ],
          exercices:[
            { id:'EX-PD1', niveau:'Moyen', titre:'Théorème de Bayes',
              enonce:"Une urne A contient 3R et 2B, une urne B contient 1R et 4B. On choisit une urne au hasard, puis on tire une boule rouge. Quelle est la probabilité que ce soit l'urne A?",
              correction:"P(R|A)=3/5, P(R|B)=1/5, P(A)=P(B)=1/2.\nP(R)=3/10+1/10=4/10=2/5.\nP(A|R)=(3/10)/(2/5)=3/4." },
          ],
        },
      ],
    },
    {
      id:'sc-lois', titre:'14.2 Loi binomiale et loi de Poisson',
      notions:['Variable aléatoire discrète — espérance, variance','Loi binomiale B(n,p)','Loi de Poisson P(λ)','Approximation Poisson de B(n,p)'],
      blocs:[
        {
          notion:'📐 Lois discrètes classiques',
          theoremes:[
            { id:'F-PD2', type:'formule', nom:'Loi binomiale B(n,p)',
              enonce:"X ~ B(n,p) : nombre de succès en n épreuves indépendantes de Bernoulli\n\nP(X=k) = C(n,k)·pᵏ·(1-p)ⁿ⁻ᵏ   (k=0,1,...,n)\n\nEspérance : E(X) = np\nVariance : V(X) = np(1-p)\nÉcart-type : σ = √(np(1-p))" },
            { id:'F-PD3', type:'formule', nom:'Loi de Poisson P(λ)',
              enonce:"X ~ P(λ) : modélise des événements rares\n\nP(X=k) = e^(-λ)·λᵏ/k!   (k=0,1,2,...)\n\nEspérance : E(X) = λ\nVariance : V(X) = λ\n\nApproximation : si n≥30, p≤0.1 et λ=np≤5 :\nB(n,p) ≈ P(λ=np)",
              remarque:"La loi de Poisson modélise les files d'attente, pannes, accidents." },
          ],
          exercices:[
            { id:'EX-PD2', niveau:'Moyen', titre:'Loi binomiale',
              enonce:"Un QCM a 10 questions, 4 choix chacune. P(X≥8) si on répond au hasard?",
              correction:"X~B(10,1/4).\nP(X=8)=C(10,8)·(1/4)⁸·(3/4)²=45·(1/4)⁸·9/16≈0.000386.\nP(X=9)≈0.000029, P(X=10)≈0.0000009.\nP(X≥8)≈0.000415." },
          ],
        },
      ],
    },
  ,
    {
      id:'sc-esperance-variance', titre:'14.3 Espérance, variance et inégalités',
      notions:['E(aX+b)=aE(X)+b','V(X)=E(X²)−[E(X)]²','Inégalité de Bienaymé-Tchébychev','Loi des grands nombres'],
      blocs:[
        {
          notion:'📊 Moments et inégalités probabilistes',
          theoremes:[
            { id:'T-PD3', type:'thm', nom:"Propriétés de l'espérance et variance",
              enonce:"E(aX+b) = aE(X)+b\nE(X+Y) = E(X)+E(Y)  (toujours)\nE(XY) = E(X)E(Y) si X et Y indépendants\n\nV(X) = E(X²)−[E(X)]² = E[(X−μ)²]\nV(aX+b) = a²V(X)\nV(X+Y) = V(X)+V(Y) si X et Y indépendants\n\nÉcart-type σ(X) = √V(X)" },
            { id:'T-PD4', type:'thm', nom:'Inégalités et loi des grands nombres',
              enonce:"Inégalité de Markov (X≥0) :\nP(X≥a) ≤ E(X)/a\n\nInégalité de Bienaymé-Tchébychev :\nP(|X−μ|≥kσ) ≤ 1/k²\n\nApplication : k=2 → P(|X−μ|≥2σ) ≤ 1/4 (75% des valeurs dans [μ−2σ;μ+2σ])\n\nLoi des grands nombres :\nX̄ₙ = (X₁+...+Xₙ)/n → E(X) en probabilité\nP(|X̄ₙ−μ|≥ε) ≤ σ²/(nε²) → 0" },
          ],
          exercices:[
            { id:'EX-PD3', niveau:'Intermédiaire', titre:'Calcul espérance et variance',
              enonce:'X : prend 1 avec prob 0.4, 2 avec prob 0.3, 3 avec prob 0.3. Calculer E(X), V(X), σ(X).',
              correction:'E(X)=1×0.4+2×0.3+3×0.3=1.9.\nE(X²)=1×0.4+4×0.3+9×0.3=4.3.\nV(X)=4.3−3.61=0.69.\nσ(X)=√0.69≈0.83.' },
            { id:'EX-PD4', niveau:'Difficile', titre:'Tchébychev appliqué',
              enonce:'X~B(100,0.5). Encadrer P(40≤X≤60) par Tchébychev.',
              correction:'E(X)=50, V(X)=25, σ=5.\nP(|X−50|≥10)=P(|X−50|≥2σ)≤1/4.\nDonc P(40≤X≤60)≥3/4=75%.' },
          ]
        },
      ]
    }],
},

// ─────────────────────────────────────────────────────────────────────
// CH 15 — PROBABILITÉS CONTINUES & LOI NORMALE
// ─────────────────────────────────────────────────────────────────────
'probabilites-continues': {
  id:'probabilites-continues', emoji:'📊', badge:'Probabilités', color:'#f43f5e',
  titre:'Probabilités Continues & Loi Normale',
  desc:"Variable aléatoire continue, densité, loi uniforme, loi exponentielle ε(λ), loi normale N(μ,σ²).",
  souschapitres:[
    {
      id:'sc-cont', titre:'15.1 Variables aléatoires continues',
      notions:['Fonction de densité f','Espérance et variance','Loi uniforme U([a,b])','Loi exponentielle ε(λ) — sans mémoire'],
      blocs:[
        {
          notion:'📐 Variables continues et lois classiques',
          theoremes:[
            { id:'D-PC1', type:'def', nom:'Variable aléatoire continue',
              enonce:"X est continue si ∃ f≥0 (densité) telle que :\nP(a≤X≤b) = ∫ₐᵇ f(x)dx\n∫_{-∞}^{+∞} f(x)dx = 1\n\nEspérance : E(X) = ∫_{-∞}^{+∞} x·f(x)dx\nVariance : V(X) = E(X²) − [E(X)]²" },
            { id:'F-PC1', type:'formule', nom:'Lois continues classiques',
              enonce:"Loi uniforme U([a,b]) :\nf(x) = 1/(b−a) sur [a,b], 0 ailleurs\nE(X) = (a+b)/2, V(X) = (b−a)²/12\n\nLoi exponentielle ε(λ) (λ>0) :\nf(x) = λe^(−λx) pour x≥0\nE(X) = 1/λ, V(X) = 1/λ²\nPropriété sans mémoire : P(X>s+t|X>s) = P(X>t)" },
          ],
          exercices:[
            { id:'EX-PC1', niveau:'Moyen', titre:'Loi exponentielle',
              enonce:"La durée de vie X d'un composant suit ε(0.1). P(X>20)?",
              correction:"P(X>20) = e^(-0.1×20) = e^(-2) ≈ 0.135." },
          ],
        },
      ],
    },
    {
      id:'sc-normale', titre:'15.2 Loi normale N(μ,σ²)',
      notions:['Densité de Gauss','Loi normale centrée réduite N(0,1)','Standardisation Z=(X-μ)/σ','Utilisation de la table'],
      blocs:[
        {
          notion:'📐 Loi normale',
          theoremes:[
            { id:'T-PC2', type:'thm', nom:'Loi normale N(μ,σ²)',
              enonce:"X ~ N(μ,σ²) : courbe de Gauss symétrique en μ\n\nDensité : f(x) = (1/(σ√(2π)))·e^(−(x−μ)²/(2σ²))\n\nStandardisation : Z = (X−μ)/σ ~ N(0,1)\n\nPropriétés :\n• P(μ−σ ≤ X ≤ μ+σ) ≈ 68%\n• P(μ−2σ ≤ X ≤ μ+2σ) ≈ 95%\n• P(μ−3σ ≤ X ≤ μ+3σ) ≈ 99.7%\n\nLecture de table : P(Z≤z) = Φ(z)\nP(Z≥z) = 1−Φ(z)\nP(−z≤Z≤z) = 2Φ(z)−1",
              remarque:"La loi N(0,1) est tabulée. On se ramène toujours à elle par standardisation." },
          ],
          exercices:[
            { id:'EX-PC2', niveau:'Moyen', titre:'Calcul avec loi normale',
              enonce:"X~N(100,25). Calculer P(95≤X≤110).",
              correction:"Z=(X-100)/5. P(95≤X≤110)=P(-1≤Z≤2)=Φ(2)-Φ(-1)=0.9772-0.1587=0.8185." },
          ],
        },
      ],
    },
  ,
    {
      id:'sc-tcl', titre:'15.3 Théorème Central Limite et estimation',
      notions:['TCL : √n(X̄-μ)/σ → N(0,1)','Intervalle de confiance de μ','Estimation ponctuelle p̂','IC pour proportion'],
      blocs:[
        {
          notion:'📐 TCL et intervalles de confiance',
          theoremes:[
            { id:'T-PC3', type:'thm', nom:'Théorème Central Limite',
              enonce:"X₁,...,Xₙ i.i.d. avec E(Xᵢ)=μ et V(Xᵢ)=σ² finis.\n\nTCL : pour n grand (n≥30),\n√n(X̄ₙ−μ)/σ ~ N(0,1) approximativement\n\nIntervalle de confiance de niveau (1−α) pour μ :\nIC = [X̄ₙ − z_{α/2}·σ/√n ;  X̄ₙ + z_{α/2}·σ/√n]\n\nz_{0.025} = 1.96  (IC à 95%)\nz_{0.005} = 2.576 (IC à 99%)",
              remarque:"Si σ est inconnue, on remplace σ par l'écart-type empirique S." },
            { id:'F-PC3', type:'formule', nom:'Estimation de proportion',
              enonce:"Sur n observations, on observe k succès.\nEstimateur ponctuel : p̂ = k/n\n\nIC de niveau 95% pour p (n≥30) :\nIC = [p̂ − 1.96√(p̂(1−p̂)/n) ; p̂ + 1.96√(p̂(1−p̂)/n)]\n\nTaille minimale : si p inconnue → n ≥ (1/ε)²/4" },
          ],
          exercices:[
            { id:'EX-PC3', niveau:'Intermédiaire', titre:'Intervalle de confiance',
              enonce:'Sur 400 élèves sondés, 220 ont réussi. Donner un IC à 95% pour p.',
              correction:'p̂=0.55. IC=0.55±1.96×√(0.55×0.45/400)=0.55±0.0487.\nIC≈[0.501 ; 0.599].' },
          ]
        },
      ]
    }],
},

// ─────────────────────────────────────────────────────────────────────
// CH 02 — ARITHMÉTIQUE DANS ℤ
// ─────────────────────────────────────────────────────────────────────
'arithmetique': {
  id:'arithmetique', emoji:'🔢', badge:'Algèbre', color:'#a78bfa',
  titre:'Arithmétique dans ℤ',
  desc:"Divisibilité, PGCD, Euclide, Bézout, Gauss, nombres premiers, congruences, équations diophantiennes.",
  souschapitres:[
    {
      id:'sc-pgcd', titre:'2.1 Divisibilité et PGCD',
      notions:['Divisibilité dans ℤ',"PGCD — algorithme d'Euclide",'Identité de Bézout','Nombres premiers entre eux'],
      blocs:[
        {
          notion:'📐 Divisibilité et PGCD',
          theoremes:[
            { id:'D-AR1', type:'def', nom:'Divisibilité et division euclidienne',
              enonce:"a divise b (noté a|b) si ∃k∈ℤ tel que b=ka.\n\nDivision euclidienne : ∀a∈ℤ, ∀b∈ℕ*, ∃!(q,r) :\na = b·q + r   avec 0 ≤ r < b\n\nPGCD(a,b) = plus grand diviseur commun positif de a et b.\nAlgorithme d'Euclide : PGCD(a,b) = PGCD(b, a mod b) jusqu'à r=0." },
            { id:'T-AR1', type:'thm', nom:'Identité de Bézout',
              enonce:"∀a,b∈ℤ, ∃u,v∈ℤ tels que :\nau + bv = PGCD(a,b)\n\nCorollaire : a et b premiers entre eux (PGCD=1) ⟺ ∃u,v : au+bv=1\n\nThéorème de Gauss : si a|bc et PGCD(a,b)=1 alors a|c\n\nLemme d'Euclide : si p premier et p|ab alors p|a ou p|b",
              remarque:"On trouve u,v par l'algorithme d'Euclide remonté (substitutions successives)." },
          ],
          exercices:[
            { id:'EX-AR1', niveau:'Moyen', titre:"Algorithme d'Euclide et Bézout",
              enonce:"Calculer PGCD(252,180) et trouver u,v tels que 252u+180v=PGCD(252,180).",
              correction:"252=1×180+72 → 180=2×72+36 → 72=2×36+0. PGCD=36.\n36=180-2×72=180-2(252-180)=3×180-2×252.\nu=-2, v=3 → 252×(-2)+180×3=−504+540=36. ✓" },
          ],
        },
      ],
    },
    {
      id:'sc-cong', titre:'2.2 Congruences et équations diophantiennes',
      notions:['Congruence modulo n','Propriétés des congruences','Équations ax+by=c','Critères de divisibilité'],
      blocs:[
        {
          notion:'📐 Congruences',
          theoremes:[
            { id:'D-AR2', type:'def', nom:'Congruences modulo n',
              enonce:"a ≡ b (mod n) si n | (a−b)\n\nPropriétés :\n• Réflexivité : a ≡ a (mod n)\n• Symétrie : a≡b ⟹ b≡a\n• Transitivité : a≡b et b≡c ⟹ a≡c\n• Si a≡b et c≡d : a+c≡b+d, ac≡bd (mod n)\n• aᵏ≡bᵏ (mod n)\n\nCritères classiques :\n• n|a ⟺ a≡0 (mod n)\n• 2|a ⟺ dernier chiffre pair\n• 9|a ⟺ somme des chiffres divisible par 9\n• 11|a ⟺ somme alternée des chiffres divisible par 11" },
            { id:'T-AR2', type:'thm', nom:'Équations diophantiennes ax+by=c',
              enonce:"L'équation ax+by=c (a,b,c∈ℤ) a des solutions entières si et seulement si :\nPGCD(a,b) | c\n\nMéthode :\n1. Vérifier PGCD(a,b)|c\n2. Trouver une solution particulière (x₀,y₀) par Bézout\n3. Solution générale :\n   x = x₀ + (b/d)k\n   y = y₀ − (a/d)k  (d=PGCD(a,b), k∈ℤ)" },
          ],
          exercices:[
            { id:'EX-AR2', niveau:'Moyen', titre:'Équation diophantienne',
              enonce:"Résoudre dans ℤ : 15x + 10y = 25.",
              correction:"PGCD(15,10)=5, 5|25 ✓. Diviser par 5 : 3x+2y=5.\nSolution particulière : x₀=1, y₀=1 (3+2=5).\nSolution générale : x=1+2k, y=1-3k (k∈ℤ)." },
          ],
        },
      ],
    },
  ,
    {
      id:'sc-nombres-premiers', titre:'2.3 Nombres premiers et décomposition',
      notions:['Nombre premier','Infinité des premiers (Euclide)','Décomposition en facteurs premiers','PPCM(a,b)=ab/PGCD(a,b)'],
      blocs:[
        {
          notion:'🔑 Nombres premiers et décomposition',
          theoremes:[
            { id:'T-AR3', type:'thm', nom:"Théorème fondamental de l'arithmétique",
              enonce:"Tout entier n≥2 s'écrit de façon unique (à l'ordre près) comme produit de nombres premiers :\nn = p₁^α₁ · p₂^α₂ · ... · pₖ^αₖ\n\nExemple : 360 = 2³ × 3² × 5\n\nInfinité des premiers (Euclide) :\nSi p₁,...,pₙ sont tous les premiers → considérer p₁p₂···pₙ+1\n(nouveau premier ou diviseur premier non listé → contradiction).",
              remarque:"Les nombres premiers sont la brique fondamentale de l'arithmétique." },
            { id:'F-AR2', type:'formule', nom:'PGCD, PPCM et applications',
              enonce:"Si a = ∏ pᵢ^αᵢ et b = ∏ pᵢ^βᵢ :\nPGCD(a,b) = ∏ pᵢ^min(αᵢ,βᵢ)\nPPCM(a,b) = ∏ pᵢ^max(αᵢ,βᵢ)\n\nRelation fondamentale : PGCD(a,b) × PPCM(a,b) = |a × b|\n\nNombre de diviseurs de n=p₁^α₁·...·pₖ^αₖ :\n(α₁+1)(α₂+1)···(αₖ+1)" },
          ],
          exercices:[
            { id:'EX-AR3', niveau:'Facile', titre:'Décomposition et PPCM',
              enonce:'Décomposer 504 et 360. Calculer PGCD et PPCM.',
              correction:'504=2³×3²×7 ; 360=2³×3²×5.\nPGCD=2³×3²=72.\nPPCM=2³×3²×5×7=2520.' },
            { id:'EX-AR4', niveau:'Intermédiaire', titre:'Nombre de diviseurs',
              enonce:'Combien n=1800 a-t-il de diviseurs ?',
              correction:'1800=2³×3²×5².\nNombre de diviseurs=(3+1)(2+1)(2+1)=36.' },
          ]
        },
      ]
    }],
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
  return (
    <span style={{ fontSize:10, padding:'2px 8px', borderRadius:10, fontWeight:600,
      background:cfg.bg, color:cfg.color }}>{niveau}</span>
  )
}

// ══════════════════════════════════════════════════════════════════════
// PAGE
// ══════════════════════════════════════════════════════════════════════

export default function MathsSlugPage() {
  const params = useParams()
  const slug = (params?.slug as string) || 'second-degre'
  const chapter = ALL_CHAPTERS[slug] as any
  const [openEx, setOpenEx] = useState<string|null>(null)
  const [openSc, setOpenSc] = useState<string|null>(null)

  if (!chapter) {
    return (
      <>
        <Navbar />
        <main style={{ paddingTop:80, textAlign:'center', padding:'120px 20px' }}>
          <h1>Chapitre introuvable</h1>
          <Link href="/bac/maths" style={{ color:'#4f6ef7' }}>← Retour Section Maths</Link>
        </main>
        <Footer />
      </>
    )
  }

  const idx = NAV_ORDER.indexOf(slug)
  const prevSlug = idx > 0 ? NAV_ORDER[idx-1] : null
  const nextSlug = idx < NAV_ORDER.length-1 ? NAV_ORDER[idx+1] : null
  const secColor = SEC_COLORS[slug] || '#4f6ef7'

  return (
    <>
      <Navbar />
      <main style={{ position:'relative', zIndex:1, paddingTop:80 }}>

        {/* BREADCRUMB */}
        <div style={{ borderBottom:'1px solid var(--border)', padding:'12px clamp(20px,5vw,60px)',
          display:'flex', gap:8, fontSize:13, color:'var(--muted)', alignItems:'center', flexWrap:'wrap' }}>
          <Link href="/bac" style={{ color:'var(--muted)', textDecoration:'none' }}>Bac</Link><span>›</span>
          <Link href="/bac/maths" style={{ color:'var(--muted)', textDecoration:'none' }}>Mathématiques</Link><span>›</span>
          <span style={{ color:secColor, fontWeight:600 }}>{chapter.titre}</span>
        </div>

        <div className="container" style={{ paddingTop:36, paddingBottom:80 }}>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 270px', gap:32, alignItems:'start' }}>

            {/* ═══════════════════════════ CONTENU ═══════════════════════════ */}
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
                  <span style={{ fontSize:11, background:'rgba(79,110,247,0.12)',
                    color:'#818cf8', padding:'2px 9px', borderRadius:10 }}>Coeff 4</span>
                </div>
                <h1 style={{ fontSize:'clamp(22px,3vw,36px)', fontWeight:800, marginBottom:10 }}>{chapter.titre}</h1>
                <p style={{ color:'var(--text2)', fontSize:14, lineHeight:1.7, maxWidth:620, marginBottom:18 }}>{chapter.desc}</p>
                <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
                  <Link href={`/solve?q=${encodeURIComponent('Explique '+chapter.titre+' Bac Tunisie Maths')}`}
                    style={{ display:'inline-flex', alignItems:'center', gap:7, padding:'8px 16px',
                      borderRadius:10, background:`linear-gradient(135deg,${secColor},${secColor}cc)`,
                      color:'white', fontSize:13, fontWeight:700, textDecoration:'none' }}>
                    🤖 Chat IA — ce chapitre
                  </Link>
                  <Link href="/examens"
                    style={{ display:'inline-flex', alignItems:'center', gap:7, padding:'8px 16px',
                      borderRadius:10, background:'rgba(255,255,255,0.06)',
                      border:'1px solid rgba(255,255,255,0.12)', color:'var(--text2)',
                      fontSize:13, fontWeight:600, textDecoration:'none' }}>
                    📋 Exercices type Bac
                  </Link>
                  <Link href="/simulation"
                    style={{ display:'inline-flex', alignItems:'center', gap:7, padding:'8px 16px',
                      borderRadius:10, background:`${secColor}10`,
                      border:`1px solid ${secColor}30`, color:secColor,
                      fontSize:13, fontWeight:600, textDecoration:'none' }}>
                    🎯 Simulation Bac
                  </Link>
                </div>
              </div>

              {/* SOUS-CHAPITRES */}
              {chapter.souschapitres.map((sc: any, scIdx: number) => (
                <div key={sc.id} style={{ marginBottom:28,
                  background:`${secColor}05`, border:`1px solid ${secColor}20`,
                  borderRadius:18, overflow:'hidden' }}>

                  {/* En-tête sous-chapitre */}
                  <button
                    onClick={() => setOpenSc(openSc===sc.id ? null : sc.id)}
                    style={{ width:'100%', background:`${secColor}12`,
                      borderBottom:`1px solid ${secColor}20`, padding:'16px 22px',
                      display:'flex', justifyContent:'space-between', alignItems:'center',
                      cursor:'pointer', border:'none', textAlign:'left' }}>
                    <div>
                      <div style={{ display:'flex', gap:8, alignItems:'center', marginBottom:6, flexWrap:'wrap' }}>
                        <span style={{ fontFamily:'var(--font-mono)', fontSize:10,
                          color:secColor, fontWeight:700 }}>
                          {String(scIdx+1).padStart(2,'0')}
                        </span>
                        <h2 style={{ fontSize:16, fontWeight:800, color:'var(--text)', margin:0 }}>{sc.titre}</h2>
                      </div>
                      <div style={{ display:'flex', flexWrap:'wrap', gap:5 }}>
                        {sc.notions.map((n: string) => (
                          <span key={n} style={{ fontSize:10, padding:'2px 9px', borderRadius:12,
                            background:`${secColor}12`, color:'var(--text2)',
                            border:`1px solid ${secColor}18` }}>{n}</span>
                        ))}
                      </div>
                    </div>
                    <span style={{ fontSize:18, color:secColor, marginLeft:12 }}>
                      {openSc===sc.id ? '▲' : '▼'}
                    </span>
                  </button>

                  {/* Contenu blocs */}
                  {(openSc===sc.id || scIdx===0) && (
                    <div style={{ padding:'18px 22px', display:'flex', flexDirection:'column', gap:28 }}>
                      {sc.blocs.map((bloc: any) => (
                        <div key={bloc.notion}>

                          {/* Titre notion */}
                          <div style={{ fontSize:14, fontWeight:800, color:secColor,
                            marginBottom:14, display:'flex', alignItems:'center', gap:8 }}>
                            {bloc.notion}
                          </div>

                          {/* Théorèmes / Définitions / Formules */}
                          <div style={{ display:'flex', flexDirection:'column', gap:12, marginBottom:16 }}>
                            {bloc.theoremes.map((t: any) => {
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
                                      borderLeft:'2px solid rgba(245,200,66,0.5)',
                                      fontSize:11, color:'rgba(245,200,66,0.9)',
                                      fontStyle:'italic', lineHeight:1.6 }}>
                                      ⚡ {t.remarque}
                                    </div>
                                  )}
                                </div>
                              )
                            })}
                          </div>

                          {/* Exercices */}
                          {bloc.exercices.length > 0 && (
                            <div>
                              <div style={{ fontSize:12, color:'var(--muted)', fontWeight:700,
                                textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:10 }}>
                                Exercices
                              </div>
                              <div style={{ display:'flex', flexDirection:'column', gap:9 }}>
                                {bloc.exercices.map((ex: any) => (
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
                                      <Link href={`/solve?q=${encodeURIComponent('Bac Tunisie Maths — '+ex.enonce)}`}
                                        className="btn btn-primary"
                                        style={{ fontSize:11, padding:'5px 12px' }}>
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
                                        <div style={{ fontSize:10, color:secColor,
                                          fontWeight:700, marginBottom:4 }}>✅ Correction</div>
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
                  <Link href={`/bac/maths/${prevSlug}`} style={{ textDecoration:'none' }}>
                    <div className="card" style={{ padding:'12px 15px', transition:'transform 0.15s' }}
                      onMouseEnter={e=>e.currentTarget.style.transform='translateY(-2px)'}
                      onMouseLeave={e=>e.currentTarget.style.transform='translateY(0)'}>
                      <div style={{ fontSize:10, color:'var(--muted)', marginBottom:2 }}>← Précédent</div>
                      <div style={{ fontWeight:700, fontSize:12 }}>
                        {TITRES_NAV[prevSlug].replace(/CH \d+ — /,'')}
                      </div>
                    </div>
                  </Link>
                ) : <div/>}
                {nextSlug ? (
                  <Link href={`/bac/maths/${nextSlug}`} style={{ textDecoration:'none' }}>
                    <div className="card" style={{ padding:'12px 15px', textAlign:'right',
                      transition:'transform 0.15s' }}
                      onMouseEnter={e=>e.currentTarget.style.transform='translateY(-2px)'}
                      onMouseLeave={e=>e.currentTarget.style.transform='translateY(0)'}>
                      <div style={{ fontSize:10, color:'var(--muted)', marginBottom:2 }}>Suivant →</div>
                      <div style={{ fontWeight:700, fontSize:12 }}>
                        {TITRES_NAV[nextSlug].replace(/CH \d+ — /,'')}
                      </div>
                    </div>
                  </Link>
                ) : <div/>}
              </div>
            </div>

            {/* ═══════════════════════════ SIDEBAR ═══════════════════════════ */}
            <aside style={{ position:'sticky', top:88 }}>
              {/* Navigation chapitres */}
              <div style={{ background:'var(--surface)', border:'1px solid var(--border)',
                borderRadius:14, overflow:'hidden', marginBottom:12 }}>
                <div style={{ padding:'10px 14px', borderBottom:'1px solid var(--border)',
                  fontSize:11, color:'var(--muted)', fontWeight:700,
                  textTransform:'uppercase', letterSpacing:'0.08em' }}>
                  📐 Sc. Maths · 10 chapitres
                </div>
                {NAV_ORDER.map((s,i) => (
                  <Link key={s} href={`/bac/maths/${s}`} style={{ textDecoration:'none' }}>
                    <div style={{ padding:'9px 15px',
                      borderBottom:i<NAV_ORDER.length-1?'1px solid var(--border)':'none',
                      background:s===slug?`${SEC_COLORS[s]}12`:'transparent',
                      borderLeft:s===slug?`3px solid ${SEC_COLORS[s]}`:'3px solid transparent',
                      transition:'all 0.15s', cursor:'pointer' }}
                      onMouseEnter={e=>{ if(s!==slug) e.currentTarget.style.background='rgba(255,255,255,0.03)' }}
                      onMouseLeave={e=>{ if(s!==slug) e.currentTarget.style.background='transparent' }}>
                      <div style={{ fontSize:10, color:'var(--muted)', marginBottom:1,
                        fontFamily:'var(--font-mono)' }}>
                        {TITRES_NAV[s].split(' — ')[0]}
                      </div>
                      <div style={{ fontSize:11, fontWeight:s===slug?700:400,
                        color:s===slug?SEC_COLORS[s]:'var(--text2)' }}>
                        {TITRES_NAV[s].replace(/CH \d+ — /,'')}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Actions */}
              <div style={{ background:'var(--surface)', border:'1px solid var(--border)',
                borderRadius:12, padding:'13px' }}>
                <div style={{ fontSize:11, color:'var(--muted)', fontWeight:700,
                  textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:9 }}>Actions</div>
                <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
                  <Link href={`/solve?q=${encodeURIComponent('Explique '+chapter.titre+' Bac Tunisie')}`}
                    className="btn btn-primary" style={{ textAlign:'center', fontSize:12 }}>
                    🤖 Chat IA — {chapter.badge}
                  </Link>
                  <Link href="/examens" className="btn btn-secondary"
                    style={{ textAlign:'center', fontSize:12 }}>📋 Exercice type Bac</Link>
                  <Link href="/simulation" className="btn btn-secondary"
                    style={{ textAlign:'center', fontSize:12 }}>🎯 Simulation Bac</Link>
                  <Link href="/bac/maths" className="btn btn-secondary"
                    style={{ textAlign:'center', fontSize:12 }}>↩ Tous les chapitres</Link>
                </div>
              </div>
            </aside>

          </div>
        </div>
      </main>
      <Footer />
      <style>{`
        @media(max-width:900px){
          div[style*="grid-template-columns: 1fr 270px"]{
            grid-template-columns:1fr!important;
          }
          aside{display:none;}
        }
      `}</style>
    </>
  )
}
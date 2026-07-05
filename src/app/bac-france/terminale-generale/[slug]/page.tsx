'use client'
import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import { useParams } from 'next/navigation'

// ══════════════════════════════════════════════════════════════════════
// TERMINALE GÉNÉRALE — SPÉCIALITÉ MATHS / [SLUG]
// Route : /bac-france/terminale-generale/[slug]
// Programme officiel MEN · Bac 2027 · Coef. 16
// Structure : souschapitres + blocs
// ══════════════════════════════════════════════════════════════════════

const C = { thm:'#4f6ef7', def:'#06d6a0', formule:'#f59e0b', prop:'#8b5cf6', methode:'#ec4899', corollaire:'#f97316' }
const L: Record<string,string> = { thm:'Théorème', def:'Définition', formule:'Formule clé', prop:'Propriété', methode:'Méthode', corollaire:'Corollaire' }

const NAV_ORDER = [
  'suites-limites','nombres-complexes','combinatoire-denombrement',
  'limites-continuite','derivation-avancee','exponentielle','logarithme-neperien','integration','equations-differentielles',
  'vecteurs-espace','droites-plans','produit-scalaire',
  'variables-aleatoires','lois-continues','loi-normale','loi-binomiale','echantillonnage',
  'python-avance',
]
const TITRES_NAV: Record<string,string> = {
  'suites-limites':              'CH 01 — Suites & Convergence',
  'nombres-complexes':           'CH 02 — Nombres Complexes',
  'combinatoire-denombrement':   'CH 03 — Combinatoire & Dénombrement',
  'limites-continuite':          'CH 04 — Limites & Continuité',
  'derivation-avancee':          'CH 05 — Dérivation Avancée',
  'exponentielle':               'CH 06 — Fonction Exponentielle',
  'logarithme-neperien':         'CH 07 — Logarithme Népérien',
  'integration':                 'CH 08 — Intégration',
  'equations-differentielles':   'CH 09 — Équations Différentielles',
  'vecteurs-espace':             'CH 10 — Vecteurs & Repères',
  'droites-plans':               'CH 11 — Droites & Plans',
  'produit-scalaire':            'CH 12 — Produit Scalaire',
  'variables-aleatoires':        'CH 13 — Variables Aléatoires',
  'lois-continues':              'CH 14 — Lois à Densité',
  'loi-normale':                 'CH 15 — Loi Normale',
  'loi-binomiale':               'CH 16 — Loi Binomiale',
  'echantillonnage':             'CH 17 — Échantillonnage',
  'python-avance':               'CH 18 — Python & Algorithmique',
}
const SEC_COLORS: Record<string,string> = {
  'suites-limites':'#4f6ef7','nombres-complexes':'#4f6ef7','combinatoire-denombrement':'#4f6ef7',
  'limites-continuite':'#06d6a0','derivation-avancee':'#06d6a0','exponentielle':'#06d6a0',
  'logarithme-neperien':'#06d6a0','integration':'#06d6a0','equations-differentielles':'#06d6a0',
  'vecteurs-espace':'#f59e0b','droites-plans':'#f59e0b','produit-scalaire':'#f59e0b',
  'variables-aleatoires':'#8b5cf6','lois-continues':'#8b5cf6',
  'loi-normale':'#8b5cf6','loi-binomiale':'#8b5cf6','echantillonnage':'#8b5cf6',
  'python-avance':'#ec4899',
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
// CH 01 — SUITES : LIMITES & CONVERGENCE
// ─────────────────────────────────────────────────────────────────────
'suites-limites': {
  id:'suites-limites', emoji:'uₙ', badge:'Algèbre', color:'#4f6ef7',
  titre:'Suites — Limites & Convergence',
  desc:"Limite finie/infinie, suites convergentes/divergentes, gendarmes, suites monotones bornées, arithmético-géométriques, suites récurrentes.",
  souschapitres:[
    {
      id:'sc-lim-suites', titre:'1.1 Limites de suites',
      notions:['Convergence : ∀ε>0, ∃N, n≥N ⟹ |uₙ−ℓ|<ε','Opérations sur les limites et FI','Théorème des gendarmes','Suites géométriques : |q|<1→0, q>1→+∞'],
      blocs:[
        {
          notion:'∞ Définitions et opérations',
          theoremes:[
            { id:'D-SL1', type:'def', nom:'Limite d\'une suite',
              enonce:"(uₙ) converge vers ℓ : lim uₙ=ℓ\n∀ε>0, ∃N∈ℕ, n≥N ⟹ |uₙ−ℓ|<ε\n\n• Suite divergente : pas de limite finie\n• lim uₙ=+∞ : uₙ→+∞  (diverge vers +∞)\n• lim uₙ=−∞ : uₙ→−∞\n\nSuites géométriques (uₙ=q·uₙ₋₁) :\n|q|<1 → qⁿ→0\nq=1  → qⁿ=1\nq>1  → qⁿ→+∞\nq≤−1 → pas de limite" },
            { id:'P-SL1', type:'prop', nom:'Opérations sur les limites',
              enonce:"Si lim uₙ=ℓ, lim vₙ=m (ℓ,m∈ℝ) :\nlim(uₙ+vₙ)=ℓ+m\nlim(uₙ·vₙ)=ℓm\nlim(uₙ/vₙ)=ℓ/m  (m≠0)\n\nFormes indéterminées :\n∞−∞ ; ∞/∞ ; 0×∞ ; 0/0\n→ Lever en factorisant ou conjugué",
              remarque:"Toujours identifier si la forme est indéterminée avant d'appliquer les règles d'opérations." },
            { id:'T-SL1', type:'thm', nom:'Théorème des gendarmes',
              enonce:"∀n≥N₀ : uₙ≤wₙ≤vₙ\net lim uₙ=lim vₙ=ℓ\n→ lim wₙ=ℓ\n\nExemple : 0≤|sin n/n|≤1/n → lim sin(n)/n=0\n\nCOROLLAIRE : si |uₙ|≤vₙ et vₙ→0, alors uₙ→0." },
          ],
          exercices:[
            { id:'EX-SL1', niveau:'Facile', titre:'Limite de suite géométrique',
              enonce:"uₙ=3×(0,7)ⁿ. Calculer u₀, u₃ et trouver lim uₙ.",
              correction:"u₀=3 ; u₃=3×0,343=1,029.\n|0,7|<1 → lim uₙ=0." },
            { id:'EX-SL2', niveau:'Intermédiaire', titre:'Forme indéterminée ∞/∞',
              enonce:"uₙ=(3n²+2n)/(n²−1). Calculer lim uₙ.",
              correction:"Diviser par n² : (3+2/n)/(1−1/n²) → 3/1=3." },
            { id:'EX-SL3', niveau:'Difficile', titre:'Gendarmes',
              enonce:"Montrer que lim sin(n)/√n = 0.",
              correction:"|sin(n)|≤1 → |sin(n)/√n|≤1/√n.\n0≤|sin(n)/√n|≤1/√n → 0.\nPar gendarmes : lim sin(n)/√n=0." },
          ]
        },
      ]
    },
    {
      id:'sc-suites-mono', titre:'1.2 Suites monotones bornées et récurrentes',
      notions:['Suite croissante+majorée → converge','Suite récurrente uₙ₊₁=f(uₙ) : points fixes','Suites adjacentes','Principe de récurrence'],
      blocs:[
        {
          notion:'📈 Convergence et suites récurrentes',
          theoremes:[
            { id:'T-SL2', type:'thm', nom:'Suite monotone bornée',
              enonce:"Suite croissante et majorée → converge\nSuite décroissante et minorée → converge\n\nCorollaire : suite croissante non majorée → +∞\n\nSUITES ADJACENTES (uₙ) et (vₙ) :\n• L'une croissante, l'autre décroissante\n• vₙ−uₙ→0\n→ Convergent vers la même limite ℓ",
              remarque:"Pour montrer qu'une suite converge : montrer qu'elle est monotone et bornée, puis calculer la limite ℓ depuis f(ℓ)=ℓ." },
            { id:'M-SL1', type:'methode', nom:'Étude d\'une suite récurrente uₙ₊₁=f(uₙ)',
              enonce:"1. Trouver les points fixes : f(ℓ)=ℓ\n2. Étudier la monotonie :\n   uₙ₊₁−uₙ=f(uₙ)−uₙ, signe\n3. Trouver un encadrement (par récurrence)\n4. Conclure par le théorème des suites monotones bornées\n5. La limite ℓ vérifie f(ℓ)=ℓ\n\nSuite géométrique de raison a : ℓ=b/(1−a) (si |a|<1)" },
            { id:'T-SL3', type:'thm', nom:'Principe de récurrence',
              enonce:"P(n₀) vraie + (P(n)→P(n+1)) → P(n) vraie pour tout n≥n₀\n\nRécurrence forte : supposer P(k) pour tout k≤n\n→ Montrer P(n+1)\n\nApplication : prouver uₙ≤M pour tout n (encadrement)" },
          ],
          exercices:[
            { id:'EX-SL4', niveau:'Intermédiaire', titre:'Suite récurrente',
              enonce:"uₙ₊₁=(uₙ+4)/2, u₀=0. Étudier la convergence.",
              correction:"Point fixe : ℓ=(ℓ+4)/2 → ℓ=4.\nvₙ=uₙ−4 : vₙ₊₁=(1/2)vₙ → vₙ=v₀×(1/2)ⁿ=−4×(1/2)ⁿ.\nuₙ=4−4×(1/2)ⁿ→4." },
            { id:'EX-SL5', niveau:'Difficile', titre:'Récurrence — encadrement',
              enonce:"Montrer par récurrence que 0≤uₙ≤4 pour uₙ₊₁=(uₙ+4)/2, u₀=0.",
              correction:"n=0 : 0≤0≤4 ✓\nHérédité : si 0≤uₙ≤4, alors uₙ₊₁=(uₙ+4)/2.\n0≤uₙ→(0+4)/2=2≤uₙ₊₁≤(4+4)/2=4. ✓" },
            { id:'EX-SL6', niveau:'Facile', titre:'Monotonie d\'une suite explicite',
              enonce:"Étudier la monotonie de la suite uₙ=2n+1.",
              correction:"uₙ₊₁−uₙ=2(n+1)+1−(2n+1)=2>0 → suite strictement croissante." },
          ]
        },
      ]
    },
  ]
},

// ─────────────────────────────────────────────────────────────────────
// CH 02 — NOMBRES COMPLEXES
// ─────────────────────────────────────────────────────────────────────
'nombres-complexes': {
  id:'nombres-complexes', emoji:'ℂ', badge:'Algèbre', color:'#4f6ef7',
  titre:'Nombres Complexes',
  desc:"Forme algébrique, module, argument, forme exponentielle, formule de Moivre, racines n-ièmes, géométrie complexe, transformations.",
  souschapitres:[
    {
      id:'sc-cx-formes', titre:'2.1 Formes et opérations',
      notions:['z=a+ib ; Re(z), Im(z), z̄','Module |z|=√(a²+b²)','Argument arg(z) ∈]−π;π]','Forme exponentielle z=reⁱᶿ'],
      blocs:[
        {
          notion:'ℂ Forme algébrique et module',
          theoremes:[
            { id:'D-CX1', type:'def', nom:'Nombre complexe — formes',
              enonce:"z=a+ib, a,b∈ℝ, i²=−1\nRe(z)=a ; Im(z)=b ; Conjugué z̄=a−ib\n\n|z|=√(a²+b²) ; |z|²=z·z̄\nz réel ↔ z=z̄ ; z imaginaire pur ↔ z=−z̄\n1/z=z̄/|z|²\n\nRÈGLES :\n|z₁z₂|=|z₁||z₂| ; arg(z₁z₂)=arg(z₁)+arg(z₂)\n|z₁/z₂|=|z₁|/|z₂| ; arg(z₁/z₂)=arg(z₁)−arg(z₂)" },
            { id:'F-CX1', type:'formule', nom:'Forme exponentielle — Euler',
              enonce:"eⁱᶿ=cosθ+i sinθ  (formule d'Euler)\nz=r·eⁱᶿ  (r=|z|, θ=arg(z))\n\nLinéarisation :\ncosθ=(eⁱᶿ+e⁻ⁱᶿ)/2\nsinθ=(eⁱᶿ−e⁻ⁱᶿ)/(2i)\n\neⁱᵖ=−1 (identité d'Euler)",
              remarque:"La forme exponentielle est la plus efficace pour les puissances et racines." },
          ],
          exercices:[
            { id:'EX-CX1', niveau:'Facile', titre:'Forme exponentielle',
              enonce:"Écrire z=−√3+i sous forme exponentielle.",
              correction:"|z|=√(3+1)=2.\ncosθ=−√3/2, sinθ=1/2 → θ=5π/6.\nz=2e^(i5π/6)." },
            { id:'EX-CX4', niveau:'Intermédiaire', titre:'Module et conjugué',
              enonce:"z=3−4i. Calculer |z|, z̄ et z·z̄.",
              correction:"|z|=√(9+16)=5. z̄=3+4i. z·z̄=|z|²=25." },
            { id:'EX-CX5', niveau:'Difficile', titre:'Racines de z²+z+1=0',
              enonce:"Résoudre z²+z+1=0 dans ℂ.",
              correction:"Δ=1−4=−3=(i√3)². z=(−1±i√3)/2.\nCe sont j=e^(2iπ/3) et j̄=e^(−2iπ/3)." },
          ]
        },
      ]
    },
    {
      id:'sc-cx-moivre', titre:'2.2 Moivre, racines et géométrie',
      notions:['Moivre : (eⁱᶿ)ⁿ=eⁱⁿᶿ','Racines n-ièmes : zₖ=r^(1/n)e^(i(α+2kπ)/n)','Alignement et angle en complexe','Transformations : rotation, homothétie'],
      blocs:[
        {
          notion:'⚡ Formule de Moivre et géométrie',
          theoremes:[
            { id:'T-CX1', type:'thm', nom:'Formule de Moivre',
              enonce:"(cosθ+i sinθ)ⁿ = cos(nθ)+i sin(nθ)\n\nApplications :\ncos(2θ)=cos²θ−sin²θ=2cos²θ−1=1−2sin²θ\nsin(2θ)=2sinθcosθ\ncos(3θ)=4cos³θ−3cosθ\nsin(3θ)=3sinθ−4sin³θ\n\nLinéarisation de cosⁿθ, sinⁿθ :\ncosθ=(eⁱᶿ+e⁻ⁱᶿ)/2 → puissancer puis regrouper" },
            { id:'F-CX2', type:'formule', nom:'Racines n-ièmes',
              enonce:"zⁿ=w=r·eⁱᵅ :\nzₖ=r^(1/n)·e^(i(α+2kπ)/n)  k=0,…,n−1\n\nRacines de l'unité : ωₖ=e^(2ikπ/n)\n→ polygone régulier n côtés dans |z|=1\nSomme des racines de l'unité = 0 (n≥2)" },
            { id:'D-CX2', type:'def', nom:'Géométrie et transformations',
              enonce:"M,N représentent z_M, z_N :\nMN=|z_N−z_M|\narg(z_N−z_M) = angle (Ox, MN)\n\nRotation centre Ω, angle θ :\nz'−z_Ω=eⁱᶿ(z−z_Ω)\n\nHomothétie centre Ω, rapport k :\nz'−z_Ω=k(z−z_Ω)\n\nAlignement A,B,C :\n(z_C−z_A)/(z_B−z_A)∈ℝ" },
          ],
          exercices:[
            { id:'EX-CX2', niveau:'Intermédiaire', titre:'Racines cubiques',
              enonce:"Trouver les racines cubiques de 8.",
              correction:"8=8e^(i·0). zₖ=2e^(i·2kπ/3) k=0,1,2.\nz₀=2 ; z₁=2e^(i2π/3)=−1+i√3 ; z₂=2e^(i4π/3)=−1−i√3." },
            { id:'EX-CX3', niveau:'Difficile', titre:'Linéarisation cos²θsin θ',
              enonce:"Linéariser cos²θ·sinθ.",
              correction:"cos²θ=(1+cos2θ)/2 ; sinθ=sinθ.\ncos²θ·sinθ=(sinθ+sinθcos2θ)/2.\nsinθcos2θ=[sin3θ+sin(−θ)]/2=[sin3θ−sinθ]/2.\ncos²θ·sinθ=[sinθ+sin3θ/2−sinθ/2]/2=(sinθ/2+sin3θ/2)/2... simplifié : (2sinθ+sin3θ−sinθ)... Résultat : (sinθ−sin3θ)/4+sinθ/2. Vérifier par Moivre." },
            { id:'EX-CX6', niveau:'Facile', titre:'Puissance par Moivre',
              enonce:"z=2e^(iπ/3). Calculer z³ par la formule de Moivre.",
              correction:"z³=2³·e^(i·3·π/3)=8·e^(iπ)=8×(−1)=−8." },
          ]
        },
      ]
    },
  ]
},

// ─────────────────────────────────────────────────────────────────────
// CH 03 — LIMITES ET CONTINUITÉ
// ─────────────────────────────────────────────────────────────────────
'limites-continuite': {
  id:'limites-continuite', emoji:'∞', badge:'Analyse', color:'#06d6a0',
  titre:'Limites & Continuité',
  desc:"Limite en un point (gauche/droite), asymptotes, formes indéterminées, croissances comparées, TVI, dichotomie.",
  souschapitres:[
    {
      id:'sc-lim-fonctions', titre:'3.1 Limites de fonctions',
      notions:['Limite en un point a (finie, infinie)','Limite à ±∞ : AH, AO','Formes indéterminées : 0/0, ∞/∞, ∞−∞','Croissances comparées : eˣ≫xⁿ≫ln x'],
      blocs:[
        {
          notion:'∞ Calcul des limites',
          theoremes:[
            { id:'D-LC1', type:'def', nom:'Limite d\'une fonction',
              enonce:"lim(x→a) f(x)=ℓ : f(x)→ℓ quand x→a (x≠a)\nLimites à gauche f(a⁻) et à droite f(a⁺)\n\nOpérations (ℓ,m∈ℝ) :\nlim(f+g)=ℓ+m ; lim(fg)=ℓm ; lim(f/g)=ℓ/m (m≠0)\n\nFormes indéterminées : 0/0, ∞/∞, ∞−∞, 0×∞\n→ Lever : factoriser, conjugué, terme dominant" },
            { id:'F-LC1', type:'formule', nom:'Croissances comparées et limites fondamentales',
              enonce:"lim(x→0) sin x/x = 1\nlim(x→0) (eˣ−1)/x = 1\nlim(x→0) ln(1+x)/x = 1\n\nCROISSANCES COMPARÉES (x→+∞) :\neˣ ≫ xⁿ ≫ ln x  (∀n>0)\n\nÀ l'infini :\nlim eˣ/xⁿ=+∞ ; lim xⁿ/eˣ=0\nlim(ln x)/xᵅ=0 (α>0) ; lim x·ln x→+∞\nlim(x→0⁺) x·ln x=0",
              remarque:"Règle des équivalents : f~g en a ↔ lim f/g=1 en a. Utile pour les DL." },
            { id:'D-LC2', type:'def', nom:'Asymptotes',
              enonce:"AV x=a : lim(x→a)|f(x)|=+∞\nAH y=ℓ : lim(x→±∞)f(x)=ℓ\nAO y=mx+p :\n  m=lim f(x)/x ; p=lim[f(x)−mx]\n\nBranche parabolique : lim f(x)/x=±∞ (parabole)  " },
          ],
          exercices:[
            { id:'EX-LC1', niveau:'Facile', titre:'Forme 0/0',
              enonce:"lim(x→1) (x²−1)/(x−1).",
              correction:"=(x+1)(x−1)/(x−1)=x+1 → 2." },
            { id:'EX-LC2', niveau:'Intermédiaire', titre:'Forme ∞−∞',
              enonce:"lim(x→+∞) (√(x²+x)−x).",
              correction:"Conjugué : x/[√(x²+x)+x]=1/[√(1+1/x)+1] → 1/2." },
            { id:'EX-LC4', niveau:'Difficile', titre:'Asymptote oblique',
              enonce:"Déterminer l'asymptote oblique de f(x)=(2x²+1)/(x−1) en +∞.",
              correction:"Division : f(x)=2x+2+3/(x−1).\nQuand x→+∞, 3/(x−1)→0 → asymptote oblique y=2x+2." },
          ]
        },
      ]
    },
    {
      id:'sc-continuite', titre:'3.2 Continuité, TVI, dichotomie',
      notions:['f continue en a ↔ lim(x→a)f=f(a)','TVI : f(a)f(b)<0 → racine','Théorème de la bijection','Dichotomie : algo O(log₂ε)'],
      blocs:[
        {
          notion:'📊 TVI et continuité',
          theoremes:[
            { id:'T-LC1', type:'thm', nom:'TVI et théorème de la bijection',
              enonce:"TVI : f continue sur [a,b], k entre f(a) et f(b) :\n∃c∈[a,b] : f(c)=k\n\nSi f(a)·f(b)<0 → ∃ racine dans ]a,b[\nSi f strictement monotone → racine unique\n\nBIJECTION : f continue et strictement monotone sur [a,b] :\n→ ∀k∈[f(a),f(b)], ∃!c : f(c)=k\n\nDICHOTOMIE :\nEncadrer c : m=(a+b)/2\nf(a)f(m)<0 → racine dans [a,m], sinon [m,b]\nAprès n étapes : amplitude (b−a)/2ⁿ",
              remarque:"La méthode de dichotomie est un algorithme de complexité O(log₂((b-a)/ε))." },
          ],
          exercices:[
            { id:'EX-LC3', niveau:'Intermédiaire', titre:'TVI + dichotomie',
              enonce:"f(x)=x³−x−2. Montrer ∃ racine dans [1;2] et encadrer à 0,25.",
              correction:"f(1)=−2<0 ; f(2)=4>0 → ∃c (TVI).\nf(1,5)=3,375−1,5−2=−0,125<0 → c∈]1,5;2[.\nf(1,75)=5,359−1,75−2=1,609>0 → c∈]1,5;1,75[.\nEncadrement à 0,25 : c∈]1,5;1,75[." },
            { id:'EX-LC5', niveau:'Facile', titre:'Application du TVI',
              enonce:"Montrer que x³+x−1=0 admet une solution dans ]0;1[.",
              correction:"f(x)=x³+x−1 continue. f(0)=−1<0, f(1)=1>0.\nPar le TVI, ∃c∈]0;1[ tel que f(c)=0." },
            { id:'EX-LC6', niveau:'Difficile', titre:'Nombre de solutions',
              enonce:"Montrer que x³−3x+1=0 admet exactement 3 solutions réelles.",
              correction:"f'=3x²−3=0 en x=±1. Max local f(−1)=3>0, min local f(1)=−1<0.\nlim(±∞)=±∞. f change 3 fois de signe → 3 solutions (TVI sur chaque intervalle de monotonie)." },
          ]
        },
      ]
    },
  ]
},

// ─────────────────────────────────────────────────────────────────────
// CH 04 — DÉRIVATION AVANCÉE
// ─────────────────────────────────────────────────────────────────────
'derivation-avancee': {
  id:'derivation-avancee', emoji:"f''", badge:'Analyse', color:'#06d6a0',
  titre:'Dérivation Avancée',
  desc:"Dérivée seconde, convexité (f''≥0 ↔ convexe), points d'inflexion, TAF, inégalité des accroissements finis.",
  souschapitres:[
    {
      id:'sc-convex', titre:'4.1 Dérivée seconde et convexité',
      notions:['f\'\'(x)≥0 ↔ f convexe (courbe au-dessus des tangentes)','f\'\'(x)≤0 ↔ f concave','Point d\'inflexion : f\'\' change de signe','Inégalité de convexité : f(λx+(1−λ)y)≤λf(x)+(1−λ)f(y)'],
      blocs:[
        {
          notion:'📈 Convexité et inflexion',
          theoremes:[
            { id:'D-DA1', type:'def', nom:'Dérivée seconde et convexité',
              enonce:"f''(x)=(f')'(x)\n\nf CONVEXE sur I :\nf''(x)≥0 sur I\n↔ Courbe au-dessus de toute tangente\n↔ f(λa+(1−λ)b)≤λf(a)+(1−λ)f(b)  ∀λ∈[0;1]\n\nf CONCAVE sur I :\nf''(x)≤0 sur I\n↔ Courbe en dessous de toute tangente\n\nPOINT D'INFLEXION en a :\nf''(a)=0 ET f'' change de signe en a\n→ Tangente traverse la courbe",
              remarque:"Convexe = sourire 😊 ; Concave = tristesse 😢. La convexité a des applications en optimisation (fonction objectif convexe → minimum global unique)." },
            { id:'T-DA1', type:'thm', nom:'Théorème des Accroissements Finis (TAF)',
              enonce:"f continue sur [a,b], dérivable sur ]a,b[ :\n∃c∈]a,b[ : f'(c)=[f(b)−f(a)]/(b−a)\n\nINÉGALITÉ DES ACCROISSEMENTS FINIS :\nm≤f'(x)≤M sur ]a,b[\n→ m(b−a)≤f(b)−f(a)≤M(b−a)\n\nCOROLLAIRE :\nf'=0 sur ]a,b[ → f constante\nf'>0 sur ]a,b[ → f strictement croissante" },
          ],
          exercices:[
            { id:'EX-DA1', niveau:'Facile', titre:'Convexité de eˣ',
              enonce:"Montrer que f(x)=eˣ est convexe sur ℝ.",
              correction:"f'(x)=eˣ, f''(x)=eˣ>0 ∀x∈ℝ → f convexe sur ℝ." },
            { id:'EX-DA2', niveau:'Intermédiaire', titre:'Point d\'inflexion',
              enonce:"f(x)=x³−6x²+9x. Trouver les points d'inflexion.",
              correction:"f'=3x²−12x+9, f''=6x−12.\nf''=0 ↔ x=2. f''<0 pour x<2, f''>0 pour x>2 → inflexion en (2,f(2))=(2,2)." },
            { id:'EX-DA6', niveau:'Difficile', titre:'Convexité de x⁴−6x²',
              enonce:"Étudier la convexité de f(x)=x⁴−6x² et ses points d'inflexion.",
              correction:"f''(x)=12x²−12=12(x²−1).\nf''>0 sur ]−∞;−1[∪]1;+∞[ (convexe), f''<0 sur ]−1;1[ (concave).\nPoints d'inflexion en x=−1 et x=1." },
          ]
        },
      ]
    },
    {
      id:'sc-ineg-convex', titre:'4.2 Inégalités de convexité et applications du TAF',
      notions:['f convexe ⟹ graphe au-dessus des tangentes','Inégalités classiques : eˣ≥1+x, ln x≤x−1','TAF : encadrement de f(b)−f(a)','Corollaire de Rolle'],
      blocs:[
        {
          notion:'📐 Inégalités et accroissements',
          theoremes:[
            { id:'F-DA1', type:'formule', nom:'Inégalités via convexité',
              enonce:"Si f est CONVEXE sur I, pour tout a∈I :\nf(x) ≥ f(a) + f'(a)·(x−a)  ∀x∈I\n(graphe au-dessus de chaque tangente)\n\nINÉGALITÉS CLASSIQUES déduites :\n• eˣ convexe → eˣ ≥ 1+x  (∀x∈ℝ, égalité en x=0)\n• −ln x convexe → ln x ≤ x−1  (∀x>0, égalité en x=1)\n• x/(1+x) ≤ ln(1+x) ≤ x  (encadrement de ln)\n\nAPPLICATION : comparer ln(1+a/b) avec a/b pour démontrer des inégalités.",
              remarque:"Retenir eˣ≥1+x et ln x≤x−1 : ce sont les deux inégalités les plus utilisées au Bac." },
            { id:'M-DA1', type:'methode', nom:'TAF — encadrement et égalité',
              enonce:"THÉORÈME DES ACCROISSEMENTS FINIS :\nm ≤ f'(x) ≤ M sur ]a,b[ →\nm(b−a) ≤ f(b)−f(a) ≤ M(b−a)\n\nUSAGE : encadrer f(b)−f(a) ou f(b) quand on connaît les bornes de f'.\n\nEXEMPLE : f(x)=√x, f'(x)=1/(2√x).\nSur [100;101] : 1/20,2 ≤ f'≤ 1/20\n→ 1/20,2 ≤ √101−10 ≤ 1/20\n→ 10,049… ≤ √101 ≤ 10,05\n\nTHÉORÈME DE ROLLE : f(a)=f(b) → ∃c∈]a,b[ : f'(c)=0.",
              remarque:"Le TAF est l'outil de démonstration d'inégalités et d'encadrements par excellence en Terminale." },
          ],
          exercices:[
            { id:'EX-DA3', niveau:'Facile', titre:'Inégalité eˣ≥1+x',
              enonce:"Montrer que eˣ≥1+x pour tout x∈ℝ.",
              correction:"f(x)=eˣ−(1+x). f'(x)=eˣ−1. f'=0 en x=0.\nf'<0 sur ]−∞;0[, f'>0 sur ]0;+∞[ → minimum en 0 : f(0)=0.\nDonc eˣ−(1+x)≥0 soit eˣ≥1+x ∀x. Égalité en x=0." },
            { id:'EX-DA4', niveau:'Intermédiaire', titre:'Encadrement par le TAF',
              enonce:"Encadrer ln(1,1) à l'aide du TAF appliqué à ln sur [1;1,1].",
              correction:"f(x)=ln x, f'(x)=1/x. Sur [1;1,1] : 1/1,1 ≤ f'(x) ≤ 1.\nTAF : 0,1/1,1 ≤ ln(1,1)−0 ≤ 0,1\n0,0909... ≤ ln(1,1) ≤ 0,1." },
            { id:'EX-DA5', niveau:'Difficile', titre:'Inégalité ln x ≤ x−1',
              enonce:"Démontrer que ln x ≤ x−1 pour tout x>0.",
              correction:"g(x)=(x−1)−ln x. g'(x)=1−1/x=(x−1)/x.\ng'=0 en x=1. g'<0 sur ]0;1[, g'>0 sur ]1;+∞[ → min en 1 : g(1)=0.\nDonc (x−1)−ln x ≥ 0 → ln x ≤ x−1. Égalité en x=1." },
          ],
        },
      ],
    },
  ]
},

// ─────────────────────────────────────────────────────────────────────
// CH 05 — LOGARITHME NÉPÉRIEN
// ─────────────────────────────────────────────────────────────────────
'logarithme-neperien': {
  id:'logarithme-neperien', emoji:'ln', badge:'Analyse', color:'#06d6a0',
  titre:'Logarithme Népérien',
  desc:"Définition (primitive de 1/x valant 0 en 1), propriétés algébriques, dérivée, étude complète, croissances comparées.",
  souschapitres:[
    {
      id:'sc-ln-def', titre:'5.1 Définition, propriétés et dérivée',
      notions:['ln primitive de 1/x sur ]0;+∞[ avec ln(1)=0','ln(ab)=ln a+ln b ; ln(aⁿ)=n·ln a','(ln x)\'=1/x ; (ln u)\'=u\'/u','ln et exp : fonctions réciproques'],
      blocs:[
        {
          notion:'📐 Propriétés de ln',
          theoremes:[
            { id:'D-LN1', type:'def', nom:'Logarithme népérien — définition',
              enonce:"ln est la primitive de 1/x sur ]0;+∞[ valant 0 en 1.\n\nln 1=0 ; ln e=1 ; e^(ln x)=x ; ln(eˣ)=x\n\nPROPRIÉTÉS ALGÉBRIQUES (a,b>0) :\nln(ab)=ln a+ln b\nln(a/b)=ln a−ln b\nln(aⁿ)=n·ln a  (n∈ℝ)\n\nChangement de base : log_a(x)=ln x/ln a" },
            { id:'F-LN1', type:'formule', nom:'Dérivée de ln',
              enonce:"(ln x)'=1/x  (x>0)\n(ln u)'=u'/u  (u>0)\n\nExemples :\n(ln(x²+1))'=2x/(x²+1)\n(ln|x|)'=1/x  (x≠0)" },
            { id:'T-LN1', type:'thm', nom:'Propriétés de ln — limites',
              enonce:"ln strictement croissante sur ]0;+∞[\nlim(x→0⁺) ln x=−∞ ; lim(x→+∞) ln x=+∞\n\nCROISSANCES COMPARÉES :\nlim(x→+∞) (ln x)/xᵅ=0 (α>0)\nlim(x→0⁺) x ln x=0\n\nCourbe : passe par (1;0) et (e;1)\nTangente en 1 : y=x−1\nln x < x−1 pour x≠1" },
          ],
          exercices:[
            { id:'EX-LN1', niveau:'Facile', titre:'Dérivée composée',
              enonce:"f(x)=ln(x²+3x+2). Calculer f'(x) et D_f.",
              correction:"D_f : x²+3x+2>0 ↔ (x+1)(x+2)>0 ↔ x∈]−∞;−2[∪]−1;+∞[.\nf'(x)=(2x+3)/(x²+3x+2)." },
            { id:'EX-LN2', niveau:'Intermédiaire', titre:'Étude de x−ln x',
              enonce:"f(x)=x−ln x sur ]0;+∞[. Variations, minimum.",
              correction:"f'(x)=1−1/x=(x−1)/x.\nf'=0 en x=1. Min en x=1 : f(1)=1.\nlim(x→0⁺)f=+∞ ; lim(x→+∞)f=+∞." },
            { id:'EX-LN6', niveau:'Difficile', titre:'Croissances comparées',
              enonce:"Calculer lim(x→+∞) (ln x)/√x et lim(x→0⁺) x²·ln x.",
              correction:"(ln x)/√x=(ln x)/x^(1/2) → 0 (croissance comparée, α=1/2).\nx²·ln x → 0 en 0⁺ (croissance comparée)." },
          ]
        },
      ]
    },
    {
      id:'sc-ln-etude', titre:'5.2 Étude de fonctions avec ln et équations',
      notions:['Méthode d\'étude : domaine, limites, f\'','Fonctions x·ln x, (ln x)/x, ln²x','Équations et inéquations avec ln','Comparaison eˣ et xⁿ via ln'],
      blocs:[
        {
          notion:'📊 Fonctions et équations logarithmiques',
          theoremes:[
            { id:'M-LN1', type:'methode', nom:'Étude d\'une fonction contenant ln',
              enonce:"MÉTHODE GÉNÉRALE :\n1. DOMAINE : déterminer {x : argument de ln > 0}\n2. LIMITES AUX BORNES :\n   • lim(x→0⁺) x ln x = 0 (croissances comparées)\n   • lim(x→+∞) (ln x)/xᵅ = 0 (α>0)\n   • lim(x→+∞) x·ln x = +∞\n3. DÉRIVÉE : (ln u)' = u'/u, puis signe → tableau de variations\n4. LIMITES DES TANGENTES en bornes du domaine si besoin.\n\nFONCTIONS CLASSIQUES :\nf(x)=x ln x : min en 1/e (f(1/e)=−1/e) ; lim(0⁺)=0\nf(x)=(ln x)/x : max en e (f(e)=1/e) ; lim(+∞)=0\nf(x)=ln²x : min en 1 (f(1)=0)",
              remarque:"Pour f(x)=x·ln x au voisinage de 0⁺ : utiliser la croissance comparée lim x·ln x=0 (par LHôpital ou substitution)." },
          ],
          exercices:[
            { id:'EX-LN3', niveau:'Facile', titre:'Équation logarithmique',
              enonce:"Résoudre ln(x+1)+ln(x−1)=ln 3.",
              correction:"Domaine : x>1. ln((x+1)(x−1))=ln 3 → x²−1=3 → x²=4 → x=2.\nS={2} (x=−2 hors domaine)." },
            { id:'EX-LN4', niveau:'Intermédiaire', titre:'Étude de x·ln x',
              enonce:"f(x)=x·ln x sur ]0;+∞[. Variations et minimum.",
              correction:"f'(x)=ln x + x·(1/x)=ln x+1. f'=0 ↔ ln x=−1 ↔ x=e⁻¹=1/e.\nf'<0 sur ]0;1/e[, f'>0 sur ]1/e;+∞[ → min en 1/e : f(1/e)=(1/e)·(−1)=−1/e.\nlim(x→0⁺)x·ln x=0 ; lim(x→+∞)=+∞." },
            { id:'EX-LN5', niveau:'Difficile', titre:'Inéquation',
              enonce:"Résoudre ln(2x−1) < ln(x+3).",
              correction:"Domaine : 2x−1>0 et x+3>0 → x>1/2.\nln strictement croissante → 2x−1<x+3 → x<4.\nS=]1/2 ; 4[." },
          ],
        },
      ],
    },
  ]
},

// ─────────────────────────────────────────────────────────────────────
// CH 06 — INTÉGRATION
// ─────────────────────────────────────────────────────────────────────
'integration': {
  id:'integration', emoji:'∫', badge:'Analyse', color:'#06d6a0',
  titre:'Intégration',
  desc:"Primitives usuelles, intégrale définie F(b)−F(a), Chasles, intégration par parties, changement de variable, aire, valeur moyenne.",
  souschapitres:[
    {
      id:'sc-primitives', titre:'6.1 Primitives et intégrale définie',
      notions:['Table des primitives','∫ₐᵇf(x)dx=F(b)−F(a)','Chasles, linéarité, positivité','Valeur moyenne : (1/(b−a))∫ₐᵇf'],
      blocs:[
        {
          notion:'∫ Primitives et calcul',
          theoremes:[
            { id:'F-IN1', type:'formule', nom:'Table des primitives usuelles',
              enonce:"∫xⁿdx=xⁿ⁺¹/(n+1)+C  (n≠−1)\n∫(1/x)dx=ln|x|+C\n∫eˣdx=eˣ+C\n∫cos xdx=sin x+C\n∫sin xdx=−cos x+C\n∫(1/cos²x)dx=tan x+C\n∫(1/(1+x²))dx=arctan x+C\n\nPar reconnaissance :\n∫u'eᵘdx=eᵘ+C\n∫u'/u dx=ln|u|+C\n∫u'·uⁿdx=uⁿ⁺¹/(n+1)+C  (n≠−1)" },
            { id:'T-IN1', type:'thm', nom:'Intégrale définie — propriétés',
              enonce:"∫ₐᵇf(x)dx=F(b)−F(a)  (F primitive de f)\n\nPROPRIÉTÉS :\nChasles : ∫ₐᶜ=∫ₐᵇ+∫ᵦᶜ\nLinéarité : ∫(αf+βg)=α∫f+β∫g\nPositivité : f≥0 → ∫ₐᵇf≥0\n∫ₐᵃf=0 ; ∫ₐᵇf=−∫ᵦᵃf\n\nVALEUR MOYENNE :\nμ=(1/(b−a))∫ₐᵇf(x)dx" },
          ],
          exercices:[
            { id:'EX-IN1', niveau:'Facile', titre:'Calcul d\'intégrale',
              enonce:"Calculer ∫₀² (2x+eˣ)dx.",
              correction:"[x²+eˣ]₀²=(4+e²)−(0+1)=3+e²." },
            { id:'EX-IN2', niveau:'Intermédiaire', titre:'Aire entre deux courbes',
              enonce:"Calculer l'aire entre f(x)=x² et g(x)=x sur [0;1].",
              correction:"f≤g sur [0;1] (x²≤x). A=∫₀¹(x−x²)dx=[x²/2−x³/3]₀¹=1/2−1/3=1/6." },
            { id:'EX-IN5', niveau:'Difficile', titre:'Primitive par reconnaissance',
              enonce:"Calculer ∫₀¹ 2x·e^(x²) dx.",
              correction:"Forme u'·eᵘ avec u=x². ∫=[e^(x²)]₀¹=e¹−e⁰=e−1." },
          ]
        },
      ]
    },
    {
      id:'sc-ipp', titre:'6.2 IPP, changement de variable et aires',
      notions:['IPP : ∫u\'v=[uv]−∫uv\'','Changement de variable : u=φ(t)','Aire entre deux courbes : ∫|f−g|','Intégrale et valeur algébrique'],
      blocs:[
        {
          notion:'⚙️ Techniques avancées',
          theoremes:[
            { id:'F-IN2', type:'formule', nom:'Intégration par parties (IPP)',
              enonce:"∫ₐᵇu'(x)v(x)dx = [u(x)v(x)]ₐᵇ − ∫ₐᵇu(x)v'(x)dx\n\nStratégie :\n• Choisir v facile à dériver\n• Choisir u' facile à intégrer\n\nCas classiques :\n∫xeˣdx : u'=eˣ, v=x → [xeˣ]−∫eˣdx=(x−1)eˣ+C\n∫ln x dx : u'=1, v=ln x → [x ln x]−∫1dx=x(ln x−1)+C\n∫x sin xdx : u'=sin x, v=x",
              remarque:"Pour ∫eˣcos x dx : appliquer IPP deux fois, puis résoudre pour I." },
          ],
          exercices:[
            { id:'EX-IN3', niveau:'Intermédiaire', titre:'IPP classique',
              enonce:"Calculer ∫₁ᵉ x·ln x dx.",
              correction:"u'=x→u=x²/2 ; v=ln x→v'=1/x.\n[x²/2·ln x]₁ᵉ−∫₁ᵉx²/2·(1/x)dx\n=(e²/2−0)−(1/2)[x²/2]₁ᵉ\n=e²/2−(1/4)(e²−1)=e²/4+1/4." },
            { id:'EX-IN4', niveau:'Difficile', titre:'Intégrale de ln',
              enonce:"Calculer ∫₁² ln x dx.",
              correction:"u'=1→u=x ; v=ln x→v'=1/x.\n[x ln x]₁²−∫₁²dx=(2ln2−0)−[x]₁²=2ln2−1." },
            { id:'EX-IN6', niveau:'Facile', titre:'IPP simple',
              enonce:"Calculer ∫₀¹ x·eˣ dx par parties.",
              correction:"u'=eˣ→u=eˣ ; v=x→v'=1.\n[x·eˣ]₀¹−∫₀¹eˣdx=e−[eˣ]₀¹=e−(e−1)=1." },
          ]
        },
      ]
    },
  ]
},

// ─────────────────────────────────────────────────────────────────────
// CH 07 — ÉQUATIONS DIFFÉRENTIELLES
// ─────────────────────────────────────────────────────────────────────
'equations-differentielles': {
  id:'equations-differentielles', emoji:'dy', badge:'Analyse', color:'#06d6a0',
  titre:'Équations Différentielles',
  desc:"y'=ay → Ceᵃˣ ; y'=ay+b → solution générale ; condition initiale ; modélisations (croissance, radioactivité, circuit RC).",
  souschapitres:[
    {
      id:'sc-ed1', titre:'7.1 Équations du premier ordre',
      notions:['y\'=ay : solution générale Ce^(ax)','y\'=ay+b : sol. part. constante +Ceᵃˣ','Condition initiale : déterminer C','Applications : cinétique, démographie, RC'],
      blocs:[
        {
          notion:'📐 EDO du premier ordre',
          theoremes:[
            { id:'T-ED1', type:'thm', nom:'Solution de y\'=ay',
              enonce:"y'=ay (a∈ℝ, a≠0) :\n\nSolution générale : y=C·eᵃˣ  (C∈ℝ)\n\nCondition initiale y(x₀)=y₀ :\nC=y₀·e^(−ax₀)\ny=y₀·e^(a(x−x₀))\n\nInterprétation :\na>0 : croissance exponentielle\na<0 : décroissance (demi-vie t_{1/2}=ln2/|a|)" },
            { id:'T-ED2', type:'thm', nom:'Solution de y\'=ay+b',
              enonce:"Solution particulière (constante) : y*=−b/a\nSolution générale : y=C·eᵃˣ−b/a\n\nMéthode :\n1. Solution particulière constante\n2. Solution générale de y'=ay (homogène)\n3. Sol. générale = particulière + homogène\n4. Condition initiale pour trouver C\n\nSi a=0 : y'=b → y=bx+C",
              remarque:"Pour y'=f(x) (second membre quelconque) : y=∫f(x)dx+C." },
          ],
          exercices:[
            { id:'EX-ED1', niveau:'Facile', titre:'EDO simple',
              enonce:"Résoudre y'−3y=0, y(0)=2.",
              correction:"Solution : y=Ce^(3x). y(0)=C=2 → y=2e^(3x)." },
            { id:'EX-ED2', niveau:'Intermédiaire', titre:'EDO avec second membre',
              enonce:"Résoudre y'−2y=4, y(0)=1.",
              correction:"Sol. part. : y*=−2.\nSol. gén. : y=Ce^(2x)−2.\ny(0)=C−2=1 → C=3.\ny=3e^(2x)−2." },
            { id:'EX-ED3', niveau:'Difficile', titre:'Circuit RC',
              enonce:"Circuit RC : u'+(1/RC)u=E/RC, E=10V, RC=2s, u(0)=0. Trouver u(t).",
              correction:"a=−1/2, b=5, sol. part. y*=10.\nu=Ce^(−t/2)+10. u(0)=C+10=0 → C=−10.\nu(t)=10(1−e^(−t/2)).\n(Charge du condensateur vers la tension d'alimentation.)" },
          ]
        },
      ]
    },
    {
      id:'sc-ed2', titre:'7.2 Modélisation et comportement asymptotique',
      notions:['Croissance logistique (population)','Demi-vie et constante de temps τ','Comportement en +∞ : régime permanent','Mise en équation d\'un phénomène réel'],
      blocs:[
        {
          notion:'🔬 Modèles différentiels',
          theoremes:[
            { id:'D-ED3', type:'def', nom:'Tableau des modèles classiques',
              enonce:"MODÈLE                ÉQUATION        SOLUTION\nCroissance libre      y'=ay (a>0)     y=y₀eᵃᵗ\nDécroissance          y'=ay (a<0)     y=y₀eᵃᵗ\nRadioactivité         N'=−λN          N=N₀e^(−λt), t½=ln2/λ\nRefroidissement       T'=−k(T−Tₐ)    T=Tₐ+(T₀−Tₐ)e^(−kt)\nCharge RC             u'=−u/τ+E/τ    u=E(1−e^(−t/τ))\nCroissance limitée    y'=a(L−y)       y=L(1−e^(−at))\n\nτ = constante de temps : au bout de τ, la quantité a atteint 63% de sa valeur finale.\nRégime permanent : lim(t→+∞) y(t) = valeur d'équilibre = −b/a (solution particulière constante).",
              remarque:"La constante de temps τ=−1/a (si a<0) donne l'échelle de temps du phénomène : après 5τ, le régime permanent est atteint à 99%." },
            { id:'M-ED1', type:'methode', nom:'Mise en équation d\'un phénomène',
              enonce:"ÉTAPES :\n1. Identifier la grandeur y(t), son unité et son domaine (t≥0).\n2. Lire la loi d'évolution : « varie proportionnellement à » → y'=ay.\n3. Identifier a et b (si second membre constant).\n4. Écrire la solution générale y=Ceᵃᵗ+yₚ.\n5. Appliquer la condition initiale pour trouver C.\n6. Calculer la limite (régime permanent) et interpréter.\n7. Si demandé : trouver la demi-vie, le temps pour atteindre un seuil (résoudre y(t)=valeur)." },
          ],
          exercices:[
            { id:'EX-ED4', niveau:'Facile', titre:'Désintégration radioactive',
              enonce:"N(t)=N₀e^(−0,02t). Calculer la demi-vie.",
              correction:"N(t½)=N₀/2 → e^(−0,02t½)=1/2 → −0,02t½=−ln2.\nt½=ln2/0,02=34,66 (même unité que t)." },
            { id:'EX-ED5', niveau:'Difficile', titre:'Refroidissement de Newton',
              enonce:"T'=−0,1(T−20), T(0)=80°C. Trouver T(t), sa limite et l'instant où T=30°C.",
              correction:"Éq. y'=−0,1y+2 (a=−0,1, b=2). Sol. part. y*=20.\nT=Ce^(−0,1t)+20. T(0)=C+20=80 → C=60.\nT(t)=60e^(−0,1t)+20. lim(t→+∞)=20°C (temp. ambiante).\nT(t)=30 → 60e^(−0,1t)=10 → e^(−0,1t)=1/6 → t=10ln6≈17,9." },
            { id:'EX-ED6', niveau:'Intermédiaire', titre:'Croissance d\'une population',
              enonce:"Une population suit P'=0,03P, P(0)=1000. Donner P(t) et P(10).",
              correction:"P(t)=1000·e^(0,03t).\nP(10)=1000·e^(0,3)≈1000×1,3499≈1350." },
          ],
        },
      ],
    },
  ]
},

// ─────────────────────────────────────────────────────────────────────
// CH 08 — VECTEURS & REPÈRES DANS L'ESPACE
// ─────────────────────────────────────────────────────────────────────
'vecteurs-espace': {
  id:'vecteurs-espace', emoji:'🌐', badge:'Géométrie', color:'#f59e0b',
  titre:"Vecteurs & Repères dans l'Espace",
  desc:"Vecteurs 3D, repère orthonormé, coordonnées, colinéarité, coplanarité, représentation paramétrique d'une droite, produit scalaire.",
  souschapitres:[
    {
      id:'sc-vect3d', titre:'8.1 Vecteurs, coordonnées et produit scalaire',
      notions:['Repère (O;i⃗;j⃗;k⃗), u⃗(a;b;c)','|u⃗|=√(a²+b²+c²)','Produit scalaire u⃗·v⃗=aa\'+bb\'+cc\'','Coplanarité : det(u⃗,v⃗,w⃗)=0'],
      blocs:[
        {
          notion:'🔷 Vecteurs dans l\'espace',
          theoremes:[
            { id:'D-VE1', type:'def', nom:'Repère et opérations',
              enonce:"Repère orthonormé (O;i⃗;j⃗;k⃗)\nu⃗(a;b;c) ; |u⃗|=√(a²+b²+c²)\n\nAddition, produit scalaire :\nu⃗+v⃗=(a+a';b+b';c+c')\nλu⃗=(λa;λb;λc)\n\nPRODUIT SCALAIRE :\nu⃗·v⃗=aa'+bb'+cc'\nu⃗·v⃗=|u⃗||v⃗|cosθ\nOrthogonalité : u⃗·v⃗=0\n\nCOPLANARITÉ : det(u⃗,v⃗,w⃗)=0" },
            { id:'F-VE1', type:'formule', nom:'Droite paramétrique',
              enonce:"Droite (A,u⃗) :\n{x=x_A+at ; y=y_A+bt ; z=z_A+ct}  t∈ℝ\n\nPoint M∈droite ↔ AM⃗=t·u⃗ pour un t\n\nDeux droites sécantes ↔ système en t,s admet solution\nDeux droites gauches ↔ système incompatible ET non parallèles" },
          ],
          exercices:[
            { id:'EX-VE1', niveau:'Facile', titre:'Produit scalaire',
              enonce:"u⃗(2;1;−2), v⃗(1;3;2). Calculer u⃗·v⃗ et cosθ.",
              correction:"u⃗·v⃗=2+3−4=1.\n|u⃗|=3 ; |v⃗|=√14.\ncosθ=1/(3√14)." },
            { id:'EX-VE2', niveau:'Intermédiaire', titre:'Droite paramétrique',
              enonce:"Droite D par A(1;0;2) de direction u⃗(1;2;−1). Représentation paramétrique.",
              correction:"{x=1+t ; y=2t ; z=2−t}  t∈ℝ." },
            { id:'EX-VE6', niveau:'Difficile', titre:'Coplanéité de 4 points',
              enonce:"Les points A(1;0;0), B(0;1;0), C(0;0;1), D(1;1;1) sont-ils coplanaires ?",
              correction:"AB⃗(−1;1;0), AC⃗(−1;0;1), AD⃗(0;1;1).\ndet=−1(0−1)−1(−1−0)+0=1+1=2≠0 → NON coplanaires." },
          ]
        },
      ]
    },
    {
      id:'sc-prod-vect', titre:'8.2 Produit vectoriel et distances dans l\'espace',
      notions:['u⃗∧v⃗ : vecteur orthogonal aux deux','Calcul : composantes (b₁c₂−c₁b₂ ; …)','Distance d\'un point à une droite','Positions relatives de deux droites de l\'espace'],
      blocs:[
        {
          notion:'✖️ Produit vectoriel et distance',
          theoremes:[
            { id:'F-VE2', type:'formule', nom:'Produit vectoriel',
              enonce:"u⃗(a₁;b₁;c₁) ∧ v⃗(a₂;b₂;c₂) =\n(b₁c₂−c₁b₂ ; c₁a₂−a₁c₂ ; a₁b₂−b₁a₂)\n\nPROPRIÉTÉS :\n• u⃗∧v⃗ ⊥ u⃗ et u⃗∧v⃗ ⊥ v⃗\n• u⃗∧v⃗ = 0⃗ ⟺ u⃗ et v⃗ colinéaires\n• |u⃗∧v⃗| = |u⃗|·|v⃗|·|sinθ| = aire du parallélogramme\n• u⃗∧v⃗ = −v⃗∧u⃗ (anticommutativité)\n\nAPPLICATIONS :\n→ Vecteur normal à un plan : n⃗ = AB⃗∧AC⃗\n→ Distance d'un point M à une droite (A,u⃗) :\nd = |AM⃗∧u⃗| / |u⃗|",
              remarque:"Le produit vectoriel n'est défini que dans ℝ³ (espace) ; il n'existe pas dans ℝ²." },
            { id:'M-VE1', type:'methode', nom:'Positions relatives de deux droites',
              enonce:"Droites D₁(A;u⃗) et D₂(B;v⃗) :\n1. Si u⃗ et v⃗ COLINÉAIRES : parallèles (et distinctes ou confondues).\n2. Sinon, résoudre le système AM⃗=t·u⃗, BM⃗=s·v⃗ :\n   → système en t,s,t (3 eq., 2 inconnues) :\n   • compatible → SÉCANTES (1 point d'intersection)\n   • incompatible → GAUCHES (non parallèles, non sécantes)\n\nDISTANCE ENTRE DEUX DROITES GAUCHES :\nd = |AB⃗·(u⃗∧v⃗)| / |u⃗∧v⃗|",
              remarque:"Les droites gauches n'existent pas dans le plan (R²) : c'est un concept purement spatial." },
          ],
          exercices:[
            { id:'EX-VE3', niveau:'Facile', titre:'Calcul de produit vectoriel',
              enonce:"u⃗(1;2;0) et v⃗(−1;1;3). Calculer u⃗∧v⃗.",
              correction:"u⃗∧v⃗=(2×3−0×1 ; 0×(−1)−1×3 ; 1×1−2×(−1))\n=(6 ; −3 ; 3).\nVérif : (6;−3;3)·(1;2;0)=6−6+0=0 ✓" },
            { id:'EX-VE4', niveau:'Intermédiaire', titre:'Distance point-droite',
              enonce:"Droite D : A(0;0;0), u⃗(1;1;0). Distance de M(2;0;3) à D.",
              correction:"AM⃗=(2;0;3). AM⃗∧u⃗=(0×0−3×1 ; 3×1−2×0 ; 2×1−0×1)=(−3;3;2).\n|AM⃗∧u⃗|=√(9+9+4)=√22. |u⃗|=√2.\nd=√22/√2=√11≈3,32." },
            { id:'EX-VE5', niveau:'Difficile', titre:'Droites sécantes ou gauches',
              enonce:"D₁ : A(1;0;0), u⃗(1;1;0). D₂ : B(0;1;1), v⃗(0;1;1). Sécantes ou gauches ?",
              correction:"u⃗=(1;1;0), v⃗=(0;1;1) non colinéaires.\nSystème : 1+t=0 → t=−1 ; t=1+s → s=−2 ; 0=1+s=−1 ≠ 0.\nIncompatible → droites GAUCHES." },
          ],
        },
      ],
    },
  ]
},

// ─────────────────────────────────────────────────────────────────────
// CH 09 — DROITES & PLANS
// ─────────────────────────────────────────────────────────────────────
'droites-plans': {
  id:'droites-plans', emoji:'📐', badge:'Géométrie', color:'#f59e0b',
  titre:'Droites & Plans — Équations',
  desc:"Équation cartésienne du plan, vecteur normal, positions relatives, orthogonalité, distance point-plan, point-droite.",
  souschapitres:[
    {
      id:'sc-plans-eq', titre:'9.1 Plans et positions relatives',
      notions:['Plan ax+by+cz+d=0 : normale n⃗(a;b;c)','Positions droite-plan : u⃗·n⃗=0 ou ≠0','Angle entre deux plans : cos=|n⃗₁·n⃗₂|/(|n⃗₁||n⃗₂|)','Plan par 3 points : n⃗=AB⃗∧AC⃗'],
      blocs:[
        {
          notion:'🗂️ Plans et distances',
          theoremes:[
            { id:'F-DP1', type:'formule', nom:'Plan et distances',
              enonce:"Plan par A₀(x₀;y₀;z₀), normale n⃗(a;b;c) :\na(x−x₀)+b(y−y₀)+c(z−z₀)=0\n\nForme générale : ax+by+cz+d=0\n\nPositions droite (A,u⃗) — plan ax+by+cz+d=0 :\nu⃗·n⃗=0 et A∉plan → ∥\nu⃗·n⃗=0 et A∈plan → ⊂\nu⃗·n⃗≠0 → intersection (1 point)\n\nDISTANCE M₀(x₀;y₀;z₀) au plan :\nd=|ax₀+by₀+cz₀+d|/√(a²+b²+c²)\n\nPRODUIT VECTORIEL u⃗(a₁;b₁;c₁)∧v⃗(a₂;b₂;c₂) :\n=(b₁c₂−c₁b₂ ; c₁a₂−a₁c₂ ; a₁b₂−b₁a₂)\n→ Normal au plan contenant u⃗ et v⃗" },
          ],
          exercices:[
            { id:'EX-DP1', niveau:'Facile', titre:'Équation d\'un plan',
              enonce:"Plan par A(1;2;0), normale n⃗(2;−1;3).",
              correction:"2(x−1)−(y−2)+3z=0 → 2x−y+3z=0." },
            { id:'EX-DP2', niveau:'Intermédiaire', titre:'Distance point-plan',
              enonce:"Distance de M(3;1;−2) au plan 2x−y+2z+1=0.",
              correction:"d=|6−1−4+1|/√(4+1+4)=|2|/3=2/3." },
            { id:'EX-DP3', niveau:'Difficile', titre:'Plan par 3 points',
              enonce:"Plan par A(1;0;0), B(0;2;0), C(0;0;3).",
              correction:"AB⃗=(−1;2;0), AC⃗=(−1;0;3).\nn⃗=AB⃗∧AC⃗=(6;3;2).\n6(x−1)+3y+2z=0 → 6x+3y+2z=6." },
          ]
        },
      ]
    },
    {
      id:'sc-droites3d', titre:'9.2 Intersection de deux plans et angle droite-plan',
      notions:['Intersection de deux plans non parallèles → droite','Équation paramétrique de l\'intersection','Angle entre une droite et un plan','Droite perpendiculaire à un plan'],
      blocs:[
        {
          notion:'📏 Intersections et angles',
          theoremes:[
            { id:'M-DP1', type:'methode', nom:'Intersection de deux plans',
              enonce:"DEUX PLANS non parallèles se coupent selon une droite.\n\nMÉTHODE :\n1. Vérifier que les normales n⃗₁ et n⃗₂ ne sont pas colinéaires.\n2. Résoudre le système des deux équations cartésiennes :\n   {a₁x+b₁y+c₁z+d₁=0\n   {a₂x+b₂y+c₂z+d₂=0\n   → 2 équations, 3 inconnues → une infinité de solutions paramétrées.\n3. Introduire un paramètre t (ex : poser z=t ou x=t) pour exprimer x,y en fonction de t.\n4. Écrire la représentation paramétrique de la droite intersection.\n\nVECTEUR DIRECTEUR de la droite d'intersection : n⃗₁∧n⃗₂.",
              remarque:"La droite d'intersection a pour vecteur directeur le produit vectoriel des normales des deux plans." },
            { id:'F-DP2', type:'formule', nom:'Angle droite-plan et perpendiculaire',
              enonce:"ANGLE entre une droite (u⃗) et un plan (normale n⃗) :\nNON le même que l'angle avec la normale.\nsin(α) = |u⃗·n⃗| / (|u⃗|·|n⃗|)  (α ∈ [0°;90°])\n\nDROITE ⊥ AU PLAN :\nu⃗ parallèle à n⃗ ↔ u⃗∧n⃗=0⃗ ↔ u⃗ et n⃗ colinéaires.\n\nDROITE PERPENDICULAIRE depuis M₀ à un plan Π :\n— passe par M₀ et a pour direction n⃗ (la normale de Π)\n— Repr. param. : {x=x₀+at ; y=y₀+bt ; z=z₀+ct}\n— Le pied de la perpendiculaire est le projeté orthogonal de M₀ sur Π.",
              remarque:"Confondre l'angle droite-normal et l'angle droite-plan est une erreur classique : sin(α droite-plan)=cos(angle avec la normale)." },
          ],
          exercices:[
            { id:'EX-DP4', niveau:'Intermédiaire', titre:'Droite intersection de deux plans',
              enonce:"P₁ : x+y+z=1 et P₂ : x−y+z=3. Trouver la droite d'intersection.",
              correction:"n⃗₁(1;1;1), n⃗₂(1;−1;1) non colinéaires → plans sécants.\nSomme : 2x+2z=4 → x+z=2. Diff. : 2y=−2 → y=−1.\nPoser z=t : x=2−t, y=−1, z=t.\nRepr. param. : {x=2−t ; y=−1 ; z=t}. Direction : u⃗(−1;0;1)." },
            { id:'EX-DP5', niveau:'Difficile', titre:'Droite perpendiculaire à un plan',
              enonce:"Plan Π : 2x−y+2z=5, M(1;2;3). Trouver le projeté orthogonal H de M sur Π.",
              correction:"Droite ⊥ par M : {x=1+2t ; y=2−t ; z=3+2t}.\nH∈Π : 2(1+2t)−(2−t)+2(3+2t)=5\n→ 2+4t−2+t+6+4t=5 → 9t+6=5 → t=−1/9.\nH=(1−2/9 ; 2+1/9 ; 3−2/9)=(7/9 ; 19/9 ; 25/9)." },
            { id:'EX-DP6', niveau:'Facile', titre:'Droite parallèle à un plan',
              enonce:"Droite de direction u⃗(1;1;1) et plan x+y−2z=4 (normale n⃗(1;1;−2)). La droite est-elle parallèle au plan ?",
              correction:"u⃗·n⃗=1+1−2=0 → la droite est parallèle au plan (ou incluse)." },
          ],
        },
      ],
    },
  ]
},

// ─────────────────────────────────────────────────────────────────────
// CH 10 — LOI NORMALE (GAUSS)
// ─────────────────────────────────────────────────────────────────────
'loi-normale': {
  id:'loi-normale', emoji:'🔔', badge:'Probas', color:'#8b5cf6',
  titre:'Loi Normale — Gauss',
  desc:"Densité N(μ,σ²), loi réduite N(0,1), standardisation Z=(X−μ)/σ, règle des σ, intervalle de confiance, Moivre-Laplace.",
  souschapitres:[
    {
      id:'sc-normale-def', titre:'10.1 Loi normale N(μ,σ²)',
      notions:['Densité f(x)=(1/σ√2π)exp(−(x−μ)²/2σ²)','Standardisation Z=(X−μ)/σ~N(0,1)','Règles : P(μ−σ<X<μ+σ)≈0,683','P(μ−2σ<X<μ+2σ)≈0,954'],
      blocs:[
        {
          notion:'🔔 Loi normale et standardisation',
          theoremes:[
            { id:'D-NO1', type:'def', nom:'Loi normale N(μ,σ²)',
              enonce:"X~N(μ,σ²) :\nDensité : f(x)=(1/(σ√2π))·e^(−(x−μ)²/(2σ²))\nE(X)=μ (espérance) ; V(X)=σ² (variance)\n\nSTANDARDISATION :\nZ=(X−μ)/σ ~ N(0,1) (loi centrée réduite)\nP(a≤X≤b)=P((a−μ)/σ≤Z≤(b−μ)/σ)\n\nRÈGLES :\nP(μ−σ<X<μ+σ)≈0,683 (68%)\nP(μ−2σ<X<μ+2σ)≈0,954 (95%)\nP(μ−3σ<X<μ+3σ)≈0,997 (99,7%)\n\nSYMÉTRIE de N(0,1) :\nP(Z≤−z)=1−P(Z≤z)=P(Z≥z)",
              remarque:"La table de N(0,1) donne P(Z≤z). Toujours ramener à cette table en standardisant." },
          ],
          exercices:[
            { id:'EX-NO1', niveau:'Facile', titre:'Standardisation',
              enonce:"X~N(50;9). Calculer P(47≤X≤56).",
              correction:"σ=3. Z=(X−50)/3.\nP=(47−50)/3≤Z≤(56−50)/3=P(−1≤Z≤2).\n=P(Z≤2)−P(Z≤−1)=Φ(2)−(1−Φ(1))\n≈0,9772−0,1587=0,8185." },
            { id:'EX-NO2', niveau:'Intermédiaire', titre:'Moivre-Laplace',
              enonce:"X~B(400;0,5). Approximation normale. P(X≥220).",
              correction:"μ=200, σ²=100, σ=10.\nP(X≥220)≈P(Z≥(220−200)/10)=P(Z≥2)≈1−0,9772=0,0228." },
            { id:'EX-NO5', niveau:'Difficile', titre:'Seuil à partir d\'une probabilité',
              enonce:"X~N(100;25) (σ=5). Trouver a tel que P(X≤a)=0,975.",
              correction:"P(Z≤z)=0,975 → z=1,96 (table).\na=μ+1,96σ=100+1,96×5=109,8." },
          ]
        },
      ]
    },
    {
      id:'sc-normale-app', titre:'10.2 Approximation B(n,p)→N et intervalle 95%',
      notions:['Conditions : n≥30, np≥5, n(1−p)≥5','B(n,p)≈N(np, np(1−p))','P(μ−2σ<X<μ+2σ)≈95%','Intervalle de valeurs typiques'],
      blocs:[
        {
          notion:'📊 Approximation normale',
          theoremes:[
            { id:'M-NO1', type:'methode', nom:'Approx. de B(n,p) par la loi normale',
              enonce:"CONDITIONS (Moivre-Laplace) :\nn ≥ 30  ET  np ≥ 5  ET  n(1−p) ≥ 5\n\nAPPROXIMATION :\nX~B(n,p) → X≈N(μ, σ²) avec μ=np, σ²=np(1−p)\n\nÉTAPES :\n1. Vérifier les 3 conditions.\n2. Calculer μ=np et σ=√(np(1−p)).\n3. Standardiser : Z=(X−μ)/σ ~ N(0,1)\n4. Lire P(Z≤z) dans la table de la loi normale.\n\nCORRECTION DE CONTINUITÉ (optionnelle) :\nP(X≤k) ≈ P(X≤k+0,5) pour améliorer la précision.",
              remarque:"L'approximation est d'autant meilleure que n est grand et que p est proche de 0,5." },
            { id:'F-NO1', type:'formule', nom:'Intervalles de confiance via la règle des σ',
              enonce:"Pour X~N(μ,σ²) :\n\nP(μ−1,65σ < X < μ+1,65σ) ≈ 0,90  (90%)\nP(μ−1,96σ < X < μ+1,96σ) ≈ 0,95  (95%)\nP(μ−2,58σ < X < μ+2,58σ) ≈ 0,99  (99%)\n\nUSAGE : exprimer les intervalles de confiance en fonction de σ.\n\nAPPROXIMATION PRATIQUE (Terminale) :\n1,96 ≈ 2 (règle des 2σ) pour le niveau 95%.",
              remarque:"1,96 vient de la table N(0,1) : P(−1,96≤Z≤1,96)=0,95. On arrondit à 2 pour les calculs rapides." },
          ],
          exercices:[
            { id:'EX-NO3', niveau:'Intermédiaire', titre:'Approximation normale',
              enonce:"X~B(200;0,6). Calculer P(X≥130) par approximation normale.",
              correction:"Conditions : n=200≥30, np=120≥5, n(1−p)=80≥5 ✓\nμ=120, σ=√48≈6,93.\nP(X≥130)≈P(Z≥(130−120)/6,93)=P(Z≥1,44)≈1−0,9251=0,0749." },
            { id:'EX-NO4', niveau:'Difficile', titre:'Intervalle à 95%',
              enonce:"Taille moyenne μ=170 cm, σ=8 cm. Quel intervalle contient 95% de la population (N(170;64)) ?",
              correction:"I=[μ−1,96σ ; μ+1,96σ]=[170−15,68 ; 170+15,68]=[154,32 ; 185,68].\nArrondi pratique (2σ) : [170−16 ; 170+16]=[154 ; 186] cm." },
            { id:'EX-NO6', niveau:'Facile', titre:'Conditions d\'approximation',
              enonce:"X~B(50;0,4). Peut-on approcher par une loi normale ? Donner μ et σ.",
              correction:"n=50≥30, np=20≥5, n(1−p)=30≥5 ✓ → approximation valide.\nμ=np=20, σ=√(np(1−p))=√12≈3,46." },
          ],
        },
      ],
    },
  ]
},

// ─────────────────────────────────────────────────────────────────────
// CH 11 — LOI BINOMIALE B(n,p)
// ─────────────────────────────────────────────────────────────────────
'loi-binomiale': {
  id:'loi-binomiale', emoji:'🎲', badge:'Probas', color:'#8b5cf6',
  titre:'Loi Binomiale B(n,p)',
  desc:"Épreuve de Bernoulli, schéma de Bernoulli, P(X=k)=C(n,k)pᵏ(1−p)ⁿ⁻ᵏ, E(X)=np, V(X)=np(1−p), diagrammes.",
  souschapitres:[
    {
      id:'sc-binom', titre:'11.1 Loi binomiale — définition et calculs',
      notions:['Épreuve de Bernoulli : succès prob. p','Schéma de Bernoulli : n épreuves indép.','P(X=k)=Cₙᵏ pᵏ (1−p)ⁿ⁻ᵏ','E(X)=np ; V(X)=np(1−p)'],
      blocs:[
        {
          notion:'🎲 Loi binomiale',
          theoremes:[
            { id:'D-BI1', type:'def', nom:'Loi binomiale B(n,p)',
              enonce:"X~B(n,p) : nombre de succès sur n épreuves indép.\nChaque épreuve : succès prob. p, échec prob. 1−p\n\nP(X=k)=Cₙᵏ·pᵏ·(1−p)ⁿ⁻ᵏ  k=0,…,n\n\nE(X)=np\nV(X)=np(1−p)\nσ=√(np(1−p))\n\nMode (valeur la plus probable) :\n• (n+1)p entier : modes (n+1)p et (n+1)p−1\n• Sinon : mode = ⌊(n+1)p⌋",
              remarque:"Conditions d'approximation par la loi normale (Moivre-Laplace) : n≥30, np≥5 et n(1−p)≥5." },
          ],
          exercices:[
            { id:'EX-BI1', niveau:'Facile', titre:'Calcul de probabilité',
              enonce:"X~B(10;0,3). Calculer P(X=3) et P(X≤2).",
              correction:"P(X=3)=C₁₀³×0,3³×0,7⁷=120×0,027×0,0824≈0,267.\nP(X≤2)=P(0)+P(1)+P(2)\n=0,7¹⁰+10×0,3×0,7⁹+45×0,09×0,7⁸\n≈0,028+0,121+0,233=0,382." },
            { id:'EX-BI2', niveau:'Intermédiaire', titre:'Espérance et écart-type',
              enonce:"X~B(100;0,4). Calculer E(X), V(X) et σ.",
              correction:"E(X)=100×0,4=40.\nV(X)=100×0,4×0,6=24.\nσ=√24≈4,9." },
            { id:'EX-BI5', niveau:'Difficile', titre:'Au moins un / au moins deux succès',
              enonce:"X~B(20;0,1). Calculer P(X≥1) et P(X≥2).",
              correction:"P(X≥1)=1−0,9²⁰≈1−0,1216=0,878.\nP(X≥2)=1−P(0)−P(1)=1−0,1216−20×0,1×0,9¹⁹≈1−0,1216−0,2702=0,608." },
          ]
        },
      ]
    },
    {
      id:'sc-binom-concentr', titre:'11.2 Inégalité de concentration et loi des grands nombres',
      notions:['Inégalité de concentration : P(|X/n−p|≥ε)≤1/(4nε²)','Loi des grands nombres : X/n → p','Taille minimale n pour garantir une précision','Application au contrôle qualité'],
      blocs:[
        {
          notion:'🎯 Concentration et estimation',
          theoremes:[
            { id:'T-BI1', type:'thm', nom:'Inégalité de concentration',
              enonce:"X~B(n,p). Pour tout ε>0 :\nP(|X/n − p| ≥ ε) ≤ 1/(4nε²)\n\nINTERPRÉTATION :\nLa fréquence observée X/n s'écarte de p d'au moins ε\navec une probabilité AU PLUS 1/(4nε²).\n\nLOI DES GRANDS NOMBRES :\nQuand n→+∞, X/n converge (en probabilité) vers p.\n« Plus l'échantillon est grand, plus la fréquence est proche de la probabilité. »\n\nCOROLLAIRE : pour garantir P(|X/n−p|≥ε)≤α :\nIl suffit de prendre n ≥ 1/(4αε²).",
              remarque:"Cette inégalité est une majoration grossière mais universelle : elle ne dépend pas de la valeur de p." },
            { id:'M-BI1', type:'methode', nom:'Trouver la taille d\'échantillon minimale',
              enonce:"PROBLÈME : choisir n pour que P(|X/n−p|≥ε)≤α.\n\nRÉPONSE : n ≥ 1/(4αε²)\n\nEXEMPLE COURANT :\nα=0,05 (risque 5%), ε=0,01 (précision au centième) :\nn ≥ 1/(4×0,05×0,0001) = 1/0,0002 = 5000\n\nα=0,05, ε=0,02 :\nn ≥ 1/(4×0,05×0,0004) = 1250\n\nα=0,05, ε=0,05 :\nn ≥ 1/(4×0,05×0,0025) = 200",
              remarque:"Plus la précision ε souhaitée est petite, plus n doit être grand : n varie comme 1/ε²." },
          ],
          exercices:[
            { id:'EX-BI3', niveau:'Intermédiaire', titre:'Inégalité de concentration',
              enonce:"X~B(400;0,5). Majorer P(|X/400−0,5|≥0,05).",
              correction:"ε=0,05, n=400. 1/(4×400×0,0025)=1/4=0,25.\nP(|X/400−0,5|≥0,05) ≤ 0,25." },
            { id:'EX-BI4', niveau:'Difficile', titre:'Taille minimale',
              enonce:"Quelle taille d'échantillon garantit P(|X/n−p|≥0,02)≤0,05 ?",
              correction:"n ≥ 1/(4×0,05×0,02²)=1/(4×0,05×0,0004)=1/0,0008=1250.\nIl faut n ≥ 1250." },
            { id:'EX-BI6', niveau:'Facile', titre:'Majoration directe',
              enonce:"X~B(100;0,5). Majorer P(|X/100−0,5|≥0,1).",
              correction:"Inégalité de concentration : 1/(4nε²)=1/(4×100×0,1²)=1/4=0,25.\nP(|X/100−0,5|≥0,1) ≤ 0,25." },
          ],
        },
      ],
    },
  ]
},

// ─────────────────────────────────────────────────────────────────────
// CH 12 — ÉCHANTILLONNAGE & ESTIMATION
// ─────────────────────────────────────────────────────────────────────
'echantillonnage': {
  id:'echantillonnage', emoji:'📊', badge:'Probas', color:'#8b5cf6',
  titre:'Échantillonnage & Estimation',
  desc:"Intervalle de fluctuation asymptotique 95%, test de conformité, estimation ponctuelle, intervalle de confiance [f±1/√n].",
  souschapitres:[
    {
      id:'sc-echant', titre:'12.1 Intervalle de fluctuation et test',
      notions:['Fréquence f observée dans un échantillon de taille n','IC 95% : [f−1/√n ; f+1/√n]','Test de conformité : p₀∈IC?','Conditions : n≥30, np₀≥5, n(1−p₀)≥5'],
      blocs:[
        {
          notion:'📈 Intervalles et tests',
          theoremes:[
            { id:'F-EC1', type:'formule', nom:'Intervalle de fluctuation et confiance',
              enonce:"Éch. taille n, fréq. obs. f, proportion inconnue p :\n\nINTERVALLE DE FLUCTUATION (niveau 95%) :\nI=[p₀−1/√n ; p₀+1/√n]\n\nSi f∈I : résultat compatible avec p₀\nSi f∉I : résultat significativement différent de p₀\n\nINTERVALLE DE CONFIANCE (niveau 95%) :\nIC=[f−1/√n ; f+1/√n]\n\nInterprétation : avec 95% de chances, p∈IC\n\nCONDITIONS D'APPLICATION :\nn≥30, np₀≥5, n(1−p₀)≥5",
              remarque:"1/√n est une approximation pratique. La valeur exacte utilise la table de N(0,1) : 1,96/√(p(1−p)/n)." },
          ],
          exercices:[
            { id:'EX-EC1', niveau:'Facile', titre:'Test de conformité',
              enonce:"Pièce de monnaie : p₀=0,5. 100 lancers : 58 faces. Compatible avec p₀=0,5 ?",
              correction:"f=0,58. IC=[0,5−1/10;0,5+1/10]=[0,4;0,6].\n0,58∈[0,4;0,6] → compatible avec p₀=0,5." },
            { id:'EX-EC2', niveau:'Intermédiaire', titre:'Intervalle de confiance',
              enonce:"Sondage : 420 favorables sur 700. Donner un IC 95% pour p.",
              correction:"f=0,6. √700≈26,46. 1/√700≈0,038.\nIC=[0,562 ; 0,638]." },
            { id:'EX-EC5', niveau:'Difficile', titre:'Test de conformité d\'un dé',
              enonce:"Sur 250 lancers d'un dé, on obtient 30 fois la face 6. Tester si le dé est équilibré (p₀=1/6) au seuil 95%.",
              correction:"1/√250≈0,063. IF=[1/6−0,063 ; 1/6+0,063]=[0,103 ; 0,230].\nf=30/250=0,12 ∈ IF → compatible avec p₀=1/6 : on ne rejette pas l'équilibre." },
          ]
        },
      ]
    },
    {
      id:'sc-confiance', titre:'12.2 Intervalle de confiance et estimation',
      notions:['IC 95% : [f−1/√n ; f+1/√n]','Interprétation : 95% des IC couvrent p','Différence IC vs intervalle de fluctuation','Taille minimale pour une précision donnée'],
      blocs:[
        {
          notion:'📐 Estimation et décision',
          theoremes:[
            { id:'M-EC1', type:'methode', nom:'Construire et interpréter un IC 95%',
              enonce:"DONNÉES : n individus sondés, f fréquence observée.\n\nIC 95% pour p :\nIC = [f − 1/√n ; f + 1/√n]\n\nINTERPRÉTATION EXACTE :\n« Si l'on répétait l'expérience un grand nombre de fois, 95% des intervalles ainsi construits contiendraient la vraie valeur p. »\n(≠ 'p est dans IC avec probabilité 95%' : p est fixe, c'est IC qui est aléatoire.)\n\nDIFFÉRENCE IC / FLUCTUATION :\n• Fluctuation [p₀−1/√n ; p₀+1/√n] : centré sur p₀ connu, sert au test.\n• Confiance [f−1/√n ; f+1/√n] : centré sur f observée, sert à estimer p inconnu.",
              remarque:"En pratique on dit «p est dans l'IC à 95% de confiance» par abus de langage, mais c'est l'intervalle qui est aléatoire." },
            { id:'F-EC2', type:'formule', nom:'Précision et taille minimale',
              enonce:"La demi-largeur de l'IC 95% est e = 1/√n (précision).\n\nPour une précision souhaitée e :\nn ≥ 1/e²\n\nTableau :\ne=0,05 → n ≥ 400\ne=0,02 → n ≥ 2500\ne=0,01 → n ≥ 10000\n\nVALEUR EXACTE avec la table N(0,1) :\ne = 1,96·√(p(1−p)/n) ≈ 0,98/√n (max en p=0,5).\n→ n ≥ (1,96)²/(4e²) ≈ 0,9604/e²",
              remarque:"1/√n est l'approximation simplifiée du programme. En pratique les sondeurs utilisent 1,96/√n et connaissent p approximativement." },
          ],
          exercices:[
            { id:'EX-EC3', niveau:'Intermédiaire', titre:'IC à construire',
              enonce:"Sondage : 312 personnes favorables sur 500. Construire un IC 95% pour p.",
              correction:"f=312/500=0,624. 1/√500≈0,0447.\nIC=[0,624−0,0447 ; 0,624+0,0447]=[0,579 ; 0,669]." },
            { id:'EX-EC4', niveau:'Difficile', titre:'Taille minimale',
              enonce:"Combien de personnes faut-il sonder pour obtenir une précision de 0,03 ?",
              correction:"Précision e=0,03. n ≥ 1/e²=1/0,0009≈1111.\nIl faut au moins 1111 personnes." },
            { id:'EX-EC6', niveau:'Facile', titre:'Intervalle de confiance',
              enonce:"Sur 400 sondés, 220 sont favorables. Donner un IC 95% pour p.",
              correction:"f=220/400=0,55. 1/√400=0,05.\nIC=[0,55−0,05 ; 0,55+0,05]=[0,50 ; 0,60]." },
          ],
        },
      ],
    },
  ]
},

// ─────────────────────────────────────────────────────────────────────
// CH 13 — PYTHON AVANCÉ & ALGORITHMIQUE
// ─────────────────────────────────────────────────────────────────────
'python-avance': {
  id:'python-avance', emoji:'🐍', badge:'Info', color:'#ec4899',
  titre:'Python Avancé & Algorithmique',
  desc:"Récursivité, matrices 2D, simulation Monte Carlo, visualisation matplotlib, méthode de Newton, intégrales numériques.",
  souschapitres:[
    {
      id:'sc-python-base', titre:'13.1 Récursivité et structures',
      notions:['Fonction récursive : cas de base + appel récursif','Complexité : comparaison récursif vs itératif','Matrices 2D en Python (liste de listes)','Algorithme de tri et de recherche'],
      blocs:[
        {
          notion:'🐍 Récursivité et structures de données',
          theoremes:[
            { id:'M-PY1', type:'methode', nom:'Récursivité en Python',
              enonce:"Principe :\ndef f(n):\n    if n == 0:      # cas de base\n        return 1\n    return n * f(n-1)  # appel récursif\n\nEXEMPLES CLASSIQUES :\ndef factorielle(n):\n    if n<=1: return 1\n    return n*factorielle(n-1)\n\ndef fibo(n):\n    if n<=1: return n\n    return fibo(n-1)+fibo(n-2)  # O(2ⁿ) naïf !\n\nFibo avec mémoïsation (O(n)) :\nfrom functools import lru_cache\n@lru_cache\ndef fibo(n):\n    if n<=1: return n\n    return fibo(n-1)+fibo(n-2)",
              remarque:"Toute récursion doit avoir un CAS DE BASE (terminaison) sinon RecursionError. Python limite la récursion à ~1000 niveaux." },
            { id:'M-PY2', type:'methode', nom:'Matrices 2D et algorithmes',
              enonce:"Matrice n×p :\nM = [[0]*p for _ in range(n)]\nM[i][j] = valeur\n\nProduit matriciel :\ndef produit(A, B):\n    n,p,q = len(A),len(B),len(B[0])\n    C = [[sum(A[i][k]*B[k][j] for k in range(p))\n          for j in range(q)] for i in range(n)]\n    return C\n\nRECHERCHE DICHOTOMIQUE :\ndef dicho(lst, val):\n    g, d = 0, len(lst)-1\n    while g <= d:\n        m = (g+d)//2\n        if lst[m]==val: return m\n        elif lst[m]<val: g=m+1\n        else: d=m-1\n    return -1" },
          ],
          exercices:[
            { id:'EX-PY1', niveau:'Facile', titre:'Factorielle récursive',
              enonce:"Écrire une fonction récursive Python calculant n!. Tester pour n=5.",
              correction:"def fact(n):\n    if n<=1: return 1\n    return n*fact(n-1)\nfact(5) # → 120" },
            { id:'EX-PY2', niveau:'Intermédiaire', titre:'Suite récurrente',
              enonce:"Calculer les 10 premiers termes de uₙ₊₁=0,5uₙ+2, u₀=0.",
              correction:"u = 0\nfor i in range(10):\n    print(f'u_{i}={u:.4f}')\n    u = 0.5*u + 2\n# → converge vers 4" },
            { id:'EX-PY5', niveau:'Difficile', titre:'PGCD récursif (Euclide)',
              enonce:"Écrire une fonction récursive Python calculant le PGCD de deux entiers.",
              correction:"def pgcd(a, b):\n    if b == 0:\n        return a\n    return pgcd(b, a % b)\n# pgcd(252,180) → 36" },
          ]
        },
      ]
    },
    {
      id:'sc-simulation', titre:'13.2 Simulation et visualisation',
      notions:['Monte Carlo : estimation de π','Simulation binomiale/normale (numpy)','Intégrale numérique : méthode des rectangles/trapèzes','Visualisation matplotlib : histogrammes, courbes'],
      blocs:[
        {
          notion:'📊 Simulation et visualisation',
          theoremes:[
            { id:'M-PY3', type:'methode', nom:'Monte Carlo et intégrale numérique',
              enonce:"MONTE CARLO — Estimation de π :\nimport random\ndef estimer_pi(n):\n    dans=sum(1 for _ in range(n)\n              if random.random()**2+random.random()**2<=1)\n    return 4*dans/n\n# n=1000000 → π≈3.14...\n\nINTÉGRALE — Méthode des rectangles :\ndef integrale(f, a, b, n=1000):\n    h = (b-a)/n\n    return h*sum(f(a+i*h) for i in range(n))\n\nMÉTHODE DE NEWTON :\ndef newton(f, df, x0, eps=1e-9):\n    x = x0\n    while abs(f(x)) > eps:\n        x -= f(x)/df(x)\n    return x",
              remarque:"Monte Carlo converge en O(1/√n) : pour 1 décimale de précision il faut n~10000." },
            { id:'M-PY4', type:'methode', nom:'Visualisation matplotlib',
              enonce:"import numpy as np\nimport matplotlib.pyplot as plt\n\n# Courbe d'une fonction\nx = np.linspace(-3, 3, 500)\ny = np.exp(-x**2)\nplt.plot(x, y, label='Gauss')\nplt.title('Densité normale centrée réduite')\nplt.legend() ; plt.grid() ; plt.show()\n\n# Simulation binomiale\nimport numpy.random as rnd\nX = rnd.binomial(n=50, p=0.4, size=10000)\nplt.hist(X, bins=20, density=True)\nplt.show()" },
          ],
          exercices:[
            { id:'EX-PY3', niveau:'Intermédiaire', titre:'Intégrale numérique',
              enonce:"Estimer ∫₀¹ √(1−x²)dx par la méthode des rectangles avec n=1000 (résultat = π/4).",
              correction:"import numpy as np\ndef f(x): return np.sqrt(1-x**2)\nx = np.linspace(0,1,1000)\nh = 1/1000\nI = h*sum(f(x[i]) for i in range(999))\n# I ≈ π/4 ≈ 0.7854" },
            { id:'EX-PY4', niveau:'Difficile', titre:'Newton — racine de cos x = x',
              enonce:"Résoudre cos x=x par la méthode de Newton depuis x₀=0,7.",
              correction:"def f(x): return np.cos(x)-x\ndef df(x): return -np.sin(x)-1\nnewton(f, df, 0.7)  # → 0.73909 (point fixe du cosinus)" },
            { id:'EX-PY6', niveau:'Facile', titre:'Simulation d\'un dé',
              enonce:"Simuler 1000 lancers d'un dé et estimer la fréquence du 6 (numpy).",
              correction:"import numpy.random as rnd\nX = rnd.randint(1, 7, 1000)\nprint((X == 6).mean())  # ≈ 0.167" },
          ]
        },
      ]
    },
  ]
},


// ─────────────────────────────────────────────────────────────────────
// CH 03 — COMBINATOIRE & DÉNOMBREMENT
// ─────────────────────────────────────────────────────────────────────
'combinatoire-denombrement': {
  id:'combinatoire-denombrement', emoji:'C(n,p)', badge:'Algèbre', color:'#4f6ef7',
  titre:'Combinatoire & Dénombrement',
  desc:'Principes de dénombrement, factorielle, arrangements, combinaisons C(n,p), triangle de Pascal, coefficients binomiaux, binôme de Newton.',
  souschapitres:[
    {
      id:'sc-comb-1', titre:'3.1 Principes fondamentaux',
      notions:['Principe additif : |A∪B|=|A|+|B| si A∩B=∅','Principe multiplicatif : |A×B|=|A|×|B|','Arbre de dénombrement','Factorielle : n!=1×2×…×n'],
      blocs:[
        {
          notion:'🔢 Principes et factorielle',
          theoremes:[
            { id:'D-CB1', type:'def', nom:'Factorielle',
              enonce:"n! = 1×2×3×…×n (n≥1)  ;  0!=1\n\nPropriétés :\n(n+1)! = (n+1)×n!\nn!/( n−1)! = n\n\nValeurs : 0!=1, 1!=1, 2!=2, 3!=6, 4!=24, 5!=120, 6!=720, 7!=5040" },
            { id:'P-CB1', type:'prop', nom:'Principes de dénombrement',
              enonce:"PRINCIPE ADDITIF :\nSi A et B sont disjoints : |A∪B|=|A|+|B|\nGénéralisation : |A₁∪…∪Aₖ|=|A₁|+…+|Aₖ|\n\nPRINCIPE MULTIPLICATIF :\nChoix successifs indépendants : n₁×n₂×…×nₖ possibilités\n\nExemple : codes de 4 chiffres (0-9) → 10⁴=10000",
              remarque:"Toujours vérifier si les choix sont avec ou sans remise, et avec ou sans ordre." },
          ],
          exercices:[
            { id:'EX-CB1', niveau:'Facile', titre:'Calcul de factorielles',
              enonce:"Calculer 5!/3! et 7!/(5!×2!)",
              correction:"5!/3!=120/6=20\n7!/(5!×2!)=5040/(120×2)=21" },
            { id:'EX-CB2', niveau:'Intermédiaire', titre:'Principe multiplicatif',
              enonce:"Un code est formé de 2 lettres (A-Z) puis 3 chiffres (0-9). Combien de codes différents ?",
              correction:"26×26×10×10×10=26²×10³=676×1000=676 000 codes." },
          ]
        },
      ]
    },
    {
      id:'sc-comb-2', titre:'3.2 Arrangements et combinaisons',
      notions:['Arrangements : A(n,p)=n!/(n-p)!','Combinaisons : C(n,p)=n!/(p!(n-p)!)','Triangle de Pascal : C(n,p)=C(n-1,p-1)+C(n-1,p)','Symétrie : C(n,p)=C(n,n-p)'],
      blocs:[
        {
          notion:'🎯 Arrangements et combinaisons',
          theoremes:[
            { id:'D-CB2', type:'def', nom:'Arrangements',
              enonce:"Arranger p éléments parmi n (ordre important, sans répétition) :\nA(n,p) = n×(n-1)×…×(n-p+1) = n!/(n-p)!\n\nCas particulier : permutations de n éléments = A(n,n)=n!\n\nAvec répétition : nᵖ façons de choisir p éléments parmi n" },
            { id:'D-CB3', type:'def', nom:'Combinaisons',
              enonce:"Choisir p éléments parmi n (ordre non important, sans répétition) :\nC(n,p) = n!/(p!(n-p)!)\n\nNotation : aussi noté ⟨n/p⟩ ou C_n^p\n\nPropriétés :\nC(n,0)=C(n,n)=1\nC(n,1)=C(n,n-1)=n\nC(n,p)=C(n,n-p)  [symétrie]\nC(n,p)=C(n-1,p-1)+C(n-1,p)  [Pascal]" },
            { id:'T-CB1', type:'thm', nom:'Binôme de Newton',
              enonce:"(a+b)ⁿ = Σₖ₌₀ⁿ C(n,k)·aⁿ⁻ᵏ·bᵏ\n\n(a+b)² = a²+2ab+b²\n(a+b)³ = a³+3a²b+3ab²+b³\n\nCas particuliers :\n(1+x)ⁿ = 1+C(n,1)x+C(n,2)x²+…+xⁿ\n\nTriangle de Pascal :\nn=0 :         1\nn=1 :       1   1\nn=2 :     1   2   1\nn=3 :   1   3   3   1\nn=4 : 1   4   6   4   1",
              remarque:"La somme de la ligne n du triangle de Pascal vaut 2ⁿ : C(n,0)+C(n,1)+…+C(n,n)=2ⁿ." },
          ],
          exercices:[
            { id:'EX-CB3', niveau:'Facile', titre:'Calcul de combinaisons',
              enonce:"Calculer C(6,2), C(8,3) et C(10,10).",
              correction:"C(6,2)=6!/(2!4!)=15\nC(8,3)=8!/(3!5!)=56\nC(10,10)=1" },
            { id:'EX-CB4', niveau:'Intermédiaire', titre:'Comité de délégués',
              enonce:"Dans une classe de 30 élèves, on choisit 4 délégués. Combien y a-t-il de choix possibles ?",
              correction:"C(30,4)=30!/(4!×26!)=(30×29×28×27)/(4×3×2×1)=657720/24=27 405." },
            { id:'EX-CB5', niveau:'Difficile', titre:'Binôme de Newton',
              enonce:"Développer (2x−3)⁴.",
              correction:"(2x−3)⁴=C(4,0)(2x)⁴+C(4,1)(2x)³(−3)+C(4,2)(2x)²(−3)²+C(4,3)(2x)(−3)³+C(4,4)(−3)⁴\n=16x⁴−96x³+216x²−216x+81" },
          ]
        },
      ]
    },
  ]
},

// ─────────────────────────────────────────────────────────────────────
// CH 06 — FONCTION EXPONENTIELLE
// ─────────────────────────────────────────────────────────────────────
'exponentielle': {
  id:'exponentielle', emoji:'eˣ', badge:'Analyse', color:'#06d6a0',
  titre:'Fonction exponentielle',
  desc:'Définition de exp, nombre e, positivité, croissance, dérivabilité, règles algébriques, limites, croissances comparées, équations et étude de fonctions.',
  souschapitres:[
    {
      id:'sc-exp-1', titre:'6.1 Définition et propriétés',
      notions:['exp est la seule fonction f telle que f\'=f et f(0)=1','e=exp(1)≈2,718','exp(a+b)=exp(a)·exp(b)','exp est toujours >0, strictement croissante'],
      blocs:[
        {
          notion:'📐 Définition et règles algébriques',
          theoremes:[
            { id:'D-EX1', type:'def', nom:'Fonction exponentielle',
              enonce:"Il existe une unique fonction f telle que :\nf\'=f  et  f(0)=1\nCette fonction est la fonction exponentielle : x↦exp(x)=eˣ\n\ne = exp(1) ≈ 2,71828…  (irrationnel)\n\nNotation : exp(x) = eˣ" },
            { id:'P-EX1', type:'prop', nom:'Propriétés algébriques',
              enonce:"Pour tous réels a, b :\neᵃ⁺ᵇ = eᵃ·eᵇ\neᵃ⁻ᵇ = eᵃ/eᵇ\n(eᵃ)ⁿ = eⁿᵃ\ne⁻ᵃ = 1/eᵃ\n(eᵃ)ᵇ = eᵃᵇ\ne⁰ = 1\n\nPropriétés de la courbe :\n• Toujours >0 : eˣ>0 pour tout x∈ℝ\n• Strictement croissante sur ℝ\n• Courbe passe par (0,1) et (1,e)",
              remarque:"eˣ>0 pour TOUT x réel, même très négatif. Ne jamais écrire eˣ=0." },
            { id:'T-EX1', type:'thm', nom:'Dérivée et convexité',
              enonce:"(eˣ)\' = eˣ\n(eᵘ)\' = u\'·eᵘ  (dérivation en chaîne)\n\nConséquences :\n• eˣ est dérivable sur ℝ\n• (eˣ)\'=eˣ>0 : strictement croissante\n• (eˣ)\'\'=eˣ>0 : convexe sur ℝ\n\nTangente en x₀ : y=eˣ⁰(x−x₀+1)\nEn x₀=0 : tangente y=x+1" },
          ],
          exercices:[
            { id:'EX-EX1', niveau:'Facile', titre:'Calculs avec exp',
              enonce:"Simplifier : e²·e³, e⁵/e², (e³)², e⁻¹.",
              correction:"e²·e³=e⁵\ne⁵/e²=e³\n(e³)²=e⁶\ne⁻¹=1/e≈0,368" },
            { id:'EX-EX2', niveau:'Intermédiaire', titre:'Équation exponentielle',
              enonce:"Résoudre eˣ=e²ˣ⁻¹.",
              correction:"eˣ=e²ˣ⁻¹ ⟺ x=2x−1 ⟺ x=1.\nSolution : {1}" },
          ]
        },
      ]
    },
    {
      id:'sc-exp-2', titre:'6.2 Limites et étude de fonctions',
      notions:['lim eˣ (x→+∞)=+∞ ; lim eˣ (x→-∞)=0','Croissances comparées : xⁿeˣ→+∞, xⁿe⁻ˣ→0','Étude de f(x)=xe^(-x), f(x)=e^(x²)'],
      blocs:[
        {
          notion:'📊 Limites et croissances comparées',
          theoremes:[
            { id:'T-EX2', type:'thm', nom:'Limites fondamentales',
              enonce:"lim(x→+∞) eˣ = +∞\nlim(x→−∞) eˣ = 0  (axe des abscisses : asymptote horizontale)\n\nCROISSANCES COMPARÉES (à savoir par cœur) :\nlim(x→+∞) eˣ/xⁿ = +∞  (exp l'emporte sur tout polynôme)\nlim(x→+∞) xⁿe⁻ˣ = 0   (exp écrase tout polynôme)\nlim(x→−∞) xⁿeˣ = 0   (exp→0 plus vite que tout polynôme)\nlim(x→0, x>0) eˣ/x = +∞",
              remarque:"Moyen mnémotechnique : exp TOUJOURS gagne contre les puissances, dans les deux sens." },
            { id:'M-EX1', type:'methode', nom:'Étude de f(x)=eᵘ⁽ˣ⁾',
              enonce:"1. Domaine : ℝ entier (exp définie partout)\n2. Dérivée : f\'(x)=u\'(x)·eᵘ⁽ˣ⁾\n   Signe de f\' = signe de u\' (car eᵘ>0)\n3. Tableau de variations de u → tableau de f\n4. Limites aux bornes : composer avec lim de eˣ\n5. Asymptotes : chercher lim f(x) = 0 → asymptote y=0\n\nFonctions classiques :\nf(x)=xe⁻ˣ : maximum en x=1, vaut 1/e\nf(x)=e⁻ˣ² : cloche de Gauss, max en x=0" },
          ],
          exercices:[
            { id:'EX-EX3', niveau:'Intermédiaire', titre:'Étude de f(x)=xe⁻ˣ',
              enonce:"Étudier les variations de f(x)=xe⁻ˣ et dresser le tableau de variations.",
              correction:"f\'(x)=e⁻ˣ+x(−e⁻ˣ)=e⁻ˣ(1−x)\ne⁻ˣ>0 donc signe f\'=signe(1−x) : f\'>0 si x<1, f\'<0 si x>1\nMax en x=1 : f(1)=e⁻¹=1/e\nlim(x→−∞) xe⁻ˣ=−∞ ; lim(x→+∞) xe⁻ˣ=0 (croissances comp.)\nAsymptote y=0 en +∞." },
            { id:'EX-EX4', niveau:'Difficile', titre:'Inégalité avec exp',
              enonce:"Montrer que eˣ≥x+1 pour tout x∈ℝ.",
              correction:"Soit g(x)=eˣ−x−1.\ng\'(x)=eˣ−1 ; g\'(x)=0 ⟺ x=0.\ng décroît sur ]−∞,0[ et croît sur ]0,+∞[.\nMin en x=0 : g(0)=1−0−1=0.\nDonc g(x)≥0 pour tout x, soit eˣ≥x+1." },
          ]
        },
      ]
    },
  ]
},

// ─────────────────────────────────────────────────────────────────────
// CH 12 — PRODUIT SCALAIRE DANS L'ESPACE
// ─────────────────────────────────────────────────────────────────────
'produit-scalaire': {
  id:'produit-scalaire', emoji:'u⃗·v⃗', badge:'Géométrie', color:'#f59e0b',
  titre:'Produit scalaire dans l\'espace',
  desc:'Produit scalaire en coordonnées, orthogonalité, distances point-droite et point-plan, angles entre droites et plans, projections.',
  souschapitres:[
    {
      id:'sc-ps-1', titre:'12.1 Définition et propriétés',
      notions:['u⃗·v⃗=x₁x₂+y₁y₂+z₁z₂ en coordonnées','u⃗·v⃗=||u⃗||·||v⃗||·cos θ','u⃗⊥v⃗ ⟺ u⃗·v⃗=0','Bilinéarité, symétrie'],
      blocs:[
        {
          notion:'🔷 Produit scalaire',
          theoremes:[
            { id:'D-PS1', type:'def', nom:'Produit scalaire dans l\'espace',
              enonce:"Si u⃗=(x₁,y₁,z₁) et v⃗=(x₂,y₂,z₂) :\nu⃗·v⃗ = x₁x₂+y₁y₂+z₁z₂\n\nFormule angulaire :\nu⃗·v⃗ = ||u⃗||·||v⃗||·cos(θ)  où θ=angle entre u⃗ et v⃗\n\nNorme : ||u⃗||=√(x²+y²+z²)\n||u⃗||²=u⃗·u⃗" },
            { id:'P-PS1', type:'prop', nom:'Propriétés algébriques',
              enonce:"Symétrie : u⃗·v⃗=v⃗·u⃗\nBilinéarité : (u⃗+v⃗)·w⃗=u⃗·w⃗+v⃗·w⃗\nHomogénéité : (λu⃗)·v⃗=λ(u⃗·v⃗)\n\nIdentités remarquables :\n||u⃗+v⃗||²=||u⃗||²+2u⃗·v⃗+||v⃗||²\n||u⃗−v⃗||²=||u⃗||²−2u⃗·v⃗+||v⃗||²\n(u⃗+v⃗)·(u⃗−v⃗)=||u⃗||²−||v⃗||²\n\nORTHOGONALITÉ :\nu⃗⊥v⃗ ⟺ u⃗·v⃗=0" },
          ],
          exercices:[
            { id:'EX-PS1', niveau:'Facile', titre:'Calcul de produit scalaire',
              enonce:"u⃗=(2,−1,3) et v⃗=(1,4,−2). Calculer u⃗·v⃗, ||u⃗|| et l'angle entre u⃗ et v⃗.",
              correction:"u⃗·v⃗=2×1+(−1)×4+3×(−2)=2−4−6=−8\n||u⃗||=√(4+1+9)=√14\n||v⃗||=√(1+16+4)=√21\ncos θ=−8/(√14×√21)=−8/√294≈−0,467\nθ≈117,8°" },
          ]
        },
      ]
    },
    {
      id:'sc-ps-2', titre:'12.2 Distances et angles',
      notions:['Distance point-plan : d=|ax₀+by₀+cz₀+d|/√(a²+b²+c²)','Angle droite/plan, plan/plan','Vecteur normal à un plan'],
      blocs:[
        {
          notion:'📏 Distances et orthogonalité',
          theoremes:[
            { id:'T-PS1', type:'formule', nom:'Distance point-plan',
              enonce:"Plan π : ax+by+cz+d=0  de vecteur normal n⃗=(a,b,c)\nPoint A(x₀,y₀,z₀)\n\nd(A,π) = |ax₀+by₀+cz₀+d| / √(a²+b²+c²)\n\nCas particulier — distance point-droite :\nDroite D de vecteur directeur u⃗, passant par B :\nd(A,D) = ||BA⃗ ∧ u⃗|| / ||u⃗||  (produit vectoriel)\n\nOU : d(A,D)=√(||BA⃗||²−(BA⃗·u⃗/||u⃗||)²)",
              remarque:"Le vecteur normal n⃗=(a,b,c) se lit directement sur l'équation cartésienne du plan ax+by+cz+d=0." },
            { id:'T-PS2', type:'thm', nom:'Angles entre plans et droites',
              enonce:"ANGLE ENTRE DEUX PLANS de normales n⃗₁ et n⃗₂ :\ncos θ = |n⃗₁·n⃗₂| / (||n⃗₁||·||n⃗₂||)\n\nANGLE DROITE/PLAN (u⃗ direct. de droite, n⃗ normal au plan) :\nsin φ = |u⃗·n⃗| / (||u⃗||·||n⃗||)\n\nORTHOGONALITÉ :\nDeux plans ⊥ ⟺ n⃗₁·n⃗₂=0\nDroite ⊥ plan ⟺ vecteur directeur ∥ vecteur normal" },
          ],
          exercices:[
            { id:'EX-PS2', niveau:'Intermédiaire', titre:'Distance point-plan',
              enonce:"Calculer la distance du point A(1,2,−1) au plan 2x−y+2z+3=0.",
              correction:"d=|2×1+(−1)×2+2×(−1)+3|/√(4+1+4)\n=|2−2−2+3|/3=|1|/3=1/3" },
            { id:'EX-PS3', niveau:'Difficile', titre:'Plan perpendiculaire',
              enonce:"Trouver l'équation du plan passant par A(1,0,2) et perpendiculaire aux plans x+y−z=1 et 2x−y+z=0.",
              correction:"n⃗ doit être ⊥ à n⃗₁=(1,1,−1) et n⃗₂=(2,−1,1).\nn⃗=n⃗₁∧n⃗₂=(1×1−(−1)×(−1), (−1)×2−1×1, 1×(−1)−1×2)=(0,−3,−3)\nOn peut prendre n⃗=(0,1,1).\nPlan : 0(x−1)+1(y−0)+1(z−2)=0 → y+z−2=0." },
          ]
        },
      ]
    },
  ]
},

// ─────────────────────────────────────────────────────────────────────
// CH 13 — VARIABLES ALÉATOIRES
// ─────────────────────────────────────────────────────────────────────
'variables-aleatoires': {
  id:'variables-aleatoires', emoji:'E(X)', badge:'Probas', color:'#8b5cf6',
  titre:'Variables aléatoires',
  desc:'Variable aléatoire réelle, loi de probabilité, espérance E(X), variance V(X), écart-type σ(X), linéarité, variance d\'une somme.',
  souschapitres:[
    {
      id:'sc-va-1', titre:'13.1 Loi de probabilité',
      notions:['Variable aléatoire X : valeurs x₁,…,xₙ avec P(X=xᵢ)','Σ P(X=xᵢ)=1','Tableau de la loi','Espérance, variance, écart-type'],
      blocs:[
        {
          notion:'🎲 Variable aléatoire et loi',
          theoremes:[
            { id:'D-VA1', type:'def', nom:'Variable aléatoire réelle',
              enonce:"Une variable aléatoire X associe à chaque issue ω de l'univers Ω un réel X(ω).\n\nLoi de probabilité : tableau donnant\n P(X=x₁), P(X=x₂), …, P(X=xₙ)\navec Σᵢ P(X=xᵢ)=1\n\nEspérance :\nE(X) = Σᵢ xᵢ·P(X=xᵢ)\n= 'valeur moyenne' de X sur un grand nombre d'expériences" },
            { id:'D-VA2', type:'def', nom:'Variance et écart-type',
              enonce:"Variance :\nV(X) = E((X−E(X))²) = Σᵢ (xᵢ−E(X))²·P(X=xᵢ)\n\nFormule de calcul (plus pratique) :\nV(X) = E(X²) − (E(X))²\noù E(X²)=Σᵢ xᵢ²·P(X=xᵢ)\n\nÉcart-type :\nσ(X) = √V(X)\n\nInterprétation : σ(X) mesure la dispersion autour de la moyenne.",
              remarque:"V(X)≥0 toujours ; V(X)=0 ssi X est constante (presque sûrement)." },
            { id:'P-VA1', type:'prop', nom:'Linéarité de l\'espérance',
              enonce:"Pour toutes variables X, Y et réels a, b :\nE(aX+b) = aE(X)+b\nE(X+Y) = E(X)+E(Y)  (toujours vrai)\n\nVariance :\nV(aX+b) = a²V(X)\nV(X+Y) = V(X)+V(Y)  (si X et Y indépendantes)\n\nÉcart-type :\nσ(aX+b) = |a|·σ(X)" },
          ],
          exercices:[
            { id:'EX-VA1', niveau:'Facile', titre:'Calcul de E(X) et V(X)',
              enonce:"X prend les valeurs 1, 2, 3 avec P(X=1)=0,5 ; P(X=2)=0,3 ; P(X=3)=0,2. Calculer E(X) et V(X).",
              correction:"E(X)=1×0,5+2×0,3+3×0,2=0,5+0,6+0,6=1,7\nE(X²)=1×0,5+4×0,3+9×0,2=0,5+1,2+1,8=3,5\nV(X)=3,5−1,7²=3,5−2,89=0,61\nσ(X)=√0,61≈0,781" },
            { id:'EX-VA2', niveau:'Intermédiaire', titre:'Jeu de dé',
              enonce:"On lance un dé équilibré. X est le gain : +2€ si on obtient 6, −1€ sinon. Calculer E(X). Le jeu est-il favorable ?",
              correction:"P(X=2)=1/6 ; P(X=−1)=5/6\nE(X)=2×(1/6)+(−1)×(5/6)=2/6−5/6=−3/6=−0,5€\nE(X)<0 : jeu défavorable au joueur." },
          ]
        },
      ]
    },
  ]
},

// ─────────────────────────────────────────────────────────────────────
// CH 14 — LOIS À DENSITÉ (CONTINUES)
// ─────────────────────────────────────────────────────────────────────
'lois-continues': {
  id:'lois-continues', emoji:'∫f(x)dx', badge:'Probas', color:'#8b5cf6',
  titre:'Lois à densité (continues)',
  desc:'Fonction densité, probabilité comme aire, fonction de répartition, loi uniforme, loi exponentielle (λ, durée de vie, propriété sans mémoire).',
  souschapitres:[
    {
      id:'sc-lc-1', titre:'14.1 Densité et répartition',
      notions:['f densité : f≥0, ∫f=1','P(a≤X≤b)=∫ₐᵇf(x)dx','Fonction de répartition F(x)=P(X≤x)','E(X)=∫xf(x)dx'],
      blocs:[
        {
          notion:'📉 Lois continues — concepts',
          theoremes:[
            { id:'D-LC1', type:'def', nom:'Fonction densité',
              enonce:"f est une densité de probabilité si :\n• f(x)≥0 pour tout x\n• ∫₋∞^(+∞) f(x)dx = 1\n\nProbabilité :\nP(a≤X≤b) = ∫ₐᵇ f(x)dx\n\nREMARQUE : P(X=x₀)=0 pour toute valeur isolée x₀\n→ P(a≤X≤b)=P(a<X<b)=P(a≤X<b)=P(a<X≤b)" },
            { id:'D-LC2', type:'def', nom:'Fonction de répartition',
              enonce:"F(x) = P(X≤x) = ∫₋∞ˣ f(t)dt\n\nPropriétés :\n• F croissante sur ℝ\n• lim(x→−∞) F(x)=0 ; lim(x→+∞) F(x)=1\n• F\'(x)=f(x)\n• P(a<X≤b)=F(b)−F(a)\n\nEspérance : E(X)=∫₋∞^(+∞) xf(x)dx\nVariance : V(X)=∫x²f(x)dx−(E(X))²" },
          ],
          exercices:[
            { id:'EX-LC1', niveau:'Intermédiaire', titre:'Vérification de densité',
              enonce:"f(x)=3x² sur [0,1], 0 ailleurs. Vérifier que f est une densité, puis calculer P(0≤X≤1/2).",
              correction:"∫₀¹ 3x²dx=[x³]₀¹=1 ✓ et f≥0 ✓\nP(0≤X≤1/2)=∫₀^(1/2) 3x²dx=[x³]₀^(1/2)=(1/2)³=1/8" },
          ]
        },
      ]
    },
    {
      id:'sc-lc-2', titre:'14.2 Loi uniforme et loi exponentielle',
      notions:['Loi U[a,b] : densité 1/(b-a)','Loi exp(λ) : densité λe^(-λx) sur [0,+∞)','E(loi exp)=1/λ','Propriété sans mémoire'],
      blocs:[
        {
          notion:'📊 Lois usuelles continues',
          theoremes:[
            { id:'T-LC1', type:'thm', nom:'Loi uniforme U[a,b]',
              enonce:"X suit la loi uniforme sur [a,b] :\nf(x) = 1/(b−a) sur [a,b], 0 ailleurs\n\nE(X) = (a+b)/2\nV(X) = (b−a)²/12\n\nP(c≤X≤d) = (d−c)/(b−a)  pour a≤c≤d≤b\n\nInterprétation : toutes les valeurs de [a,b] sont équiprobables." },
            { id:'T-LC2', type:'thm', nom:'Loi exponentielle de paramètre λ',
              enonce:"X suit la loi exponentielle de paramètre λ>0 :\nf(x) = λe^(−λx) sur [0,+∞), 0 ailleurs\n\nF(x) = 1−e^(−λx)  pour x≥0\nP(X>x) = e^(−λx)\n\nE(X) = 1/λ  (durée de vie moyenne)\nV(X) = 1/λ²\nσ(X) = 1/λ\n\nPROPRIÉTÉ SANS MÉMOIRE :\nP(X>s+t | X>s) = P(X>t)\n→ Le passé n'influence pas l'avenir (modèle de durée de vie).",
              remarque:"La loi exponentielle modélise la durée de vie d'un composant, le temps d'attente d'un appel, etc. Sa propriété sans mémoire est unique parmi les lois continues." },
          ],
          exercices:[
            { id:'EX-LC2', niveau:'Facile', titre:'Loi uniforme',
              enonce:"Un bus arrive à une heure uniforme sur [0,20] minutes. Quelle est la probabilité d'attendre plus de 12 minutes ?",
              correction:"X~U[0,20]\nP(X>12)=(20−12)/(20−0)=8/20=0,4" },
            { id:'EX-LC3', niveau:'Intermédiaire', titre:'Loi exponentielle',
              enonce:"La durée de vie (en années) d'une ampoule suit une loi exponentielle de paramètre λ=0,5. Calculer la durée de vie moyenne et P(X>3).",
              correction:"E(X)=1/λ=1/0,5=2 ans\nP(X>3)=e^(−0,5×3)=e^(−1,5)≈0,223" },
            { id:'EX-LC4', niveau:'Difficile', titre:'Propriété sans mémoire',
              enonce:"Même ampoule. Sachant qu'elle a déjà fonctionné 2 ans, quelle est la probabilité qu'elle fonctionne encore plus de 3 ans ?",
              correction:"Par la propriété sans mémoire :\nP(X>5 | X>2)=P(X>3)=e^(−1,5)≈0,223\nLa durée déjà écoulée n'a aucune influence." },
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
export default function TerminaleGeneraleSlugPage() {
  const params = useParams()
  const slug = (params?.slug as string) || 'suites-limites'
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
          <Link href="/bac-france/terminale-generale" style={{ color:'#4f6ef7' }}>
            ← Retour Terminale Générale
          </Link>
        </div>
      </main><Footer/></>
  )

  const idx = NAV_ORDER.indexOf(slug)
  const prevSlug = idx>0 ? NAV_ORDER[idx-1] : null
  const nextSlug = idx<NAV_ORDER.length-1 ? NAV_ORDER[idx+1] : null
  const secColor = SEC_COLORS[slug] || '#4f6ef7'

  const GROUPS = [
    { label:'Section 1 — Algèbre & Géométrie', slugs:NAV_ORDER.slice(0,3) },
    { label:'Section 2 — Analyse', slugs:NAV_ORDER.slice(3,9) },
    { label:'Section 3 — Géométrie espace', slugs:NAV_ORDER.slice(9,12) },
    { label:'Section 4 — Probabilités & Stats', slugs:NAV_ORDER.slice(12,17) },
    { label:'Section 5 — Algorithmique', slugs:NAV_ORDER.slice(17) },
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
          <Link href="/bac-france/terminale-generale" style={{ color:'var(--muted)', textDecoration:'none' }}>
            Terminale Générale
          </Link><span>›</span>
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
                  <span style={{ fontSize:11, background:'rgba(245,158,11,0.15)',
                    color:'#fbbf24', padding:'2px 9px', borderRadius:10 }}>
                    🎓 Terminale · Bac 2027 · Coef. 16
                  </span>
                </div>
                <h1 style={{ fontSize:'clamp(22px,3vw,36px)', fontWeight:800, marginBottom:10 }}>
                  {chapter.titre}
                </h1>
                <p style={{ color:'var(--text2)', fontSize:14, lineHeight:1.7,
                  maxWidth:620, marginBottom:18 }}>{chapter.desc}</p>
                <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
                  <Link href={`/solve?q=${encodeURIComponent('Explique '+chapter.titre+' Terminale Spécialité Maths France Bac 2027')}`}
                    style={{ display:'inline-flex', alignItems:'center', gap:7, padding:'8px 16px',
                      borderRadius:10, background:`linear-gradient(135deg,${secColor},${secColor}cc)`,
                      color:'white', fontSize:13, fontWeight:700, textDecoration:'none' }}>
                    🤖 Chat IA — ce chapitre
                  </Link>
                  <Link href="/examens-france"
                    style={{ display:'inline-flex', alignItems:'center', gap:7, padding:'8px 16px',
                      borderRadius:10, background:'rgba(255,255,255,0.06)',
                      border:'1px solid rgba(255,255,255,0.12)', color:'var(--text2)',
                      fontSize:13, fontWeight:600, textDecoration:'none' }}>
                    📋 Sujets Bac France
                  </Link>
                  <Link href="/simulation-france"
                    style={{ display:'inline-flex', alignItems:'center', gap:7, padding:'8px 16px',
                      borderRadius:10, background:`${secColor}10`,
                      border:`1px solid ${secColor}30`, color:secColor,
                      fontSize:13, fontWeight:600, textDecoration:'none' }}>
                    🎯 Simulation Bac France
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
                        <span style={{ fontFamily:'var(--font-mono)', fontSize:10,
                          color:secColor, fontWeight:700 }}>
                          {String(scIdx+1).padStart(2,'0')}
                        </span>
                        <h2 style={{ fontSize:15, fontWeight:800, color:'var(--text)', margin:0 }}>
                          {sc.titre}
                        </h2>
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
                          <div style={{ fontSize:14, fontWeight:800, color:secColor,
                            marginBottom:14 }}>{bloc.notion}</div>

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
                                      <Link href={`/solve?q=${encodeURIComponent('Bac France Terminale Spé Maths — '+ex.enonce)}`}
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
                  <Link href={`/bac-france/terminale-generale/${prevSlug}`} style={{ textDecoration:'none' }}>
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
                  <Link href={`/bac-france/terminale-generale/${nextSlug}`} style={{ textDecoration:'none' }}>
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

            {/* ═══════ SIDEBAR ═══════ */}
            <aside style={{ position:'sticky', top:88 }}>
              <div style={{ background:'var(--surface)', border:'1px solid var(--border)',
                borderRadius:14, overflow:'hidden', marginBottom:12 }}>
                <div style={{ padding:'10px 14px', borderBottom:'1px solid var(--border)',
                  fontSize:11, color:'var(--muted)', fontWeight:700,
                  textTransform:'uppercase', letterSpacing:'0.08em' }}>
                  🎓 Terminale Générale · 13 chapitres
                </div>
                {GROUPS.map(g => (
                  <div key={g.label}>
                    <div style={{ padding:'7px 15px 3px', fontSize:10, color:'var(--muted)',
                      fontWeight:700, textTransform:'uppercase', letterSpacing:'0.1em',
                      background:'rgba(255,255,255,0.02)' }}>{g.label}</div>
                    {g.slugs.map(s => (
                      <Link key={s} href={`/bac-france/terminale-generale/${s}`} style={{ textDecoration:'none' }}>
                        <div style={{ padding:'8px 15px', borderBottom:'1px solid var(--border)',
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
                            {TITRES_NAV[s].replace(/CH \d+ — /,'').slice(0,28)}
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
                  textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:9 }}>Actions</div>
                <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
                  <Link href={`/solve?q=${encodeURIComponent('Explique '+chapter.titre+' Terminale Spé Maths France')}`}
                    className="btn btn-primary" style={{ textAlign:'center', fontSize:12 }}>
                    🤖 Chat IA — {chapter.badge}
                  </Link>
                  <Link href="/examens-france" className="btn btn-secondary"
                    style={{ textAlign:'center', fontSize:12 }}>📋 Sujets Bac France</Link>
                  <Link href="/simulation-france" className="btn btn-secondary"
                    style={{ textAlign:'center', fontSize:12 }}>🎯 Simulation Bac France</Link>
                  <Link href="/bac-france/terminale-generale" className="btn btn-secondary"
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
          div[style*="grid-template-columns: 1fr 270px"]{
            grid-template-columns:1fr!important;
          }
          aside{display:none;}
        }
      `}</style>
    </>
  )
}
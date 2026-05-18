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
  'suites-limites','nombres-complexes',
  'limites-continuite','derivation-avancee','logarithme-neperien','integration','equations-differentielles',
  'vecteurs-espace','droites-plans',
  'loi-normale','loi-binomiale','echantillonnage',
  'python-avance',
]
const TITRES_NAV: Record<string,string> = {
  'suites-limites':           'CH 01 — Suites & Convergence',
  'nombres-complexes':        'CH 02 — Nombres Complexes',
  'limites-continuite':       'CH 03 — Limites & Continuité',
  'derivation-avancee':       'CH 04 — Dérivation Avancée',
  'logarithme-neperien':      'CH 05 — Logarithme Népérien',
  'integration':              'CH 06 — Intégration',
  'equations-differentielles':'CH 07 — Équations Différentielles',
  'vecteurs-espace':          "CH 08 — Vecteurs & Repères",
  'droites-plans':            'CH 09 — Droites & Plans',
  'loi-normale':              'CH 10 — Loi Normale',
  'loi-binomiale':            'CH 11 — Loi Binomiale',
  'echantillonnage':          'CH 12 — Échantillonnage',
  'python-avance':            'CH 13 — Python & Algorithmique',
}
const SEC_COLORS: Record<string,string> = {
  'suites-limites':'#4f6ef7','nombres-complexes':'#4f6ef7',
  'limites-continuite':'#06d6a0','derivation-avancee':'#06d6a0','logarithme-neperien':'#06d6a0',
  'integration':'#06d6a0','equations-differentielles':'#06d6a0',
  'vecteurs-espace':'#f59e0b','droites-plans':'#f59e0b',
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
          ]
        },
      ]
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
          ]
        },
      ]
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
          ]
        },
      ]
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
            { id:'D-LN1', type:'def', nom:'Loi normale N(μ,σ²)',
              enonce:"X~N(μ,σ²) :\nDensité : f(x)=(1/(σ√2π))·e^(−(x−μ)²/(2σ²))\nE(X)=μ (espérance) ; V(X)=σ² (variance)\n\nSTANDARDISATION :\nZ=(X−μ)/σ ~ N(0,1) (loi centrée réduite)\nP(a≤X≤b)=P((a−μ)/σ≤Z≤(b−μ)/σ)\n\nRÈGLES :\nP(μ−σ<X<μ+σ)≈0,683 (68%)\nP(μ−2σ<X<μ+2σ)≈0,954 (95%)\nP(μ−3σ<X<μ+3σ)≈0,997 (99,7%)\n\nSYMÉTRIE de N(0,1) :\nP(Z≤−z)=1−P(Z≤z)=P(Z≥z)",
              remarque:"La table de N(0,1) donne P(Z≤z). Toujours ramener à cette table en standardisant." },
          ],
          exercices:[
            { id:'EX-LN1', niveau:'Facile', titre:'Standardisation',
              enonce:"X~N(50;9). Calculer P(47≤X≤56).",
              correction:"σ=3. Z=(X−50)/3.\nP=(47−50)/3≤Z≤(56−50)/3=P(−1≤Z≤2).\n=P(Z≤2)−P(Z≤−1)=Φ(2)−(1−Φ(1))\n≈0,9772−0,1587=0,8185." },
            { id:'EX-LN2', niveau:'Intermédiaire', titre:'Moivre-Laplace',
              enonce:"X~B(400;0,5). Approximation normale. P(X≥220).",
              correction:"μ=200, σ²=100, σ=10.\nP(X≥220)≈P(Z≥(220−200)/10)=P(Z≥2)≈1−0,9772=0,0228." },
          ]
        },
      ]
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
          ]
        },
      ]
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
          ]
        },
      ]
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
    { label:'Section 1 — Algèbre & Géométrie', slugs:NAV_ORDER.slice(0,2) },
    { label:'Section 2 — Analyse', slugs:NAV_ORDER.slice(2,7) },
    { label:'Section 3 — Géométrie espace', slugs:NAV_ORDER.slice(7,9) },
    { label:'Section 4 — Probabilités', slugs:NAV_ORDER.slice(9,12) },
    { label:'Section 5 — Algorithmique', slugs:NAV_ORDER.slice(12) },
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
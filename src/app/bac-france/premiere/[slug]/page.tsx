'use client'
import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import { useParams } from 'next/navigation'

// ══════════════════════════════════════════════════════════════════════
// PREMIÈRE SPÉCIALITÉ MATHS / [SLUG]
// Route : /bac-france/premiere/[slug]
// Programme officiel MEN · 4h/semaine · Épreuve anticipée coef.2
// 5 sections · 10 chapitres
// ══════════════════════════════════════════════════════════════════════

const C = { thm:'#4f6ef7', def:'#06d6a0', formule:'#f59e0b', prop:'#8b5cf6', methode:'#ec4899', corollaire:'#f97316' }
const L: Record<string,string> = { thm:'Théorème', def:'Définition', formule:'Formule clé', prop:'Propriété', methode:'Méthode', corollaire:'Corollaire' }

const NAV_ORDER = [
  'suites-numeriques','second-degre',
  'derivation','exponentielle','trigonometrie',
  'produit-scalaire','geometrie-reperee',
  'probas-conditionnelles','variables-aleatoires',
  'python-algorithmes',
]
const TITRES_NAV: Record<string,string> = {
  'suites-numeriques':     'CH 01 — Suites numériques',
  'second-degre':          'CH 02 — Second degré',
  'derivation':            'CH 03 — Dérivation',
  'exponentielle':         'CH 04 — Fonction exponentielle',
  'trigonometrie':         'CH 05 — Fonctions trigonométriques',
  'produit-scalaire':      'CH 06 — Produit scalaire',
  'geometrie-reperee':     'CH 07 — Géométrie repérée',
  'probas-conditionnelles':'CH 08 — Probabilités conditionnelles',
  'variables-aleatoires':  'CH 09 — Variables aléatoires',
  'python-algorithmes':    'CH 10 — Python & Algorithmes',
}
const SEC_COLORS: Record<string,string> = {
  'suites-numeriques':'#4f6ef7','second-degre':'#4f6ef7',
  'derivation':'#06d6a0','exponentielle':'#06d6a0','trigonometrie':'#06d6a0',
  'produit-scalaire':'#f59e0b','geometrie-reperee':'#f59e0b',
  'probas-conditionnelles':'#8b5cf6','variables-aleatoires':'#8b5cf6',
  'python-algorithmes':'#ec4899',
}

type Thm  = { id:string; type:string; nom:string; enonce:string; remarque?:string }
type Exo  = { id:string; niveau:string; titre:string; enonce:string; correction:string }
type Bloc = { notion:string; theoremes:Thm[]; exercices:Exo[] }
type SC   = { id:string; titre:string; notions:string[]; blocs:Bloc[] }
type Chap = { id:string; titre:string; badge:string; color:string; emoji:string; desc:string; souschapitres:SC[] }

// ══════════════════════════════════════════════════════════════════════
// DONNÉES — 10 CHAPITRES
// ══════════════════════════════════════════════════════════════════════
const ALL_CHAPTERS: Record<string,Chap> = {

// ─────────────────────────────────────────────────────────────────────
// CH 01 — SUITES NUMÉRIQUES
// ─────────────────────────────────────────────────────────────────────
'suites-numeriques': {
  id:'suites-numeriques', emoji:'uₙ', badge:'Algèbre', color:'#4f6ef7',
  titre:'Suites numériques',
  desc:"Formule explicite, terme défini par récurrence, suites croissantes/décroissantes, suites arithmétiques et géométriques, calculs de termes et sommes.",
  souschapitres:[
    {
      id:'sc-def-types', titre:'1.1 Définitions et types de suites',
      notions:['Formule explicite uₙ=f(n)','Récurrence uₙ₊₁=f(uₙ), u₀ donné','Suites monotones : croissante uₙ₊₁>uₙ','Suites bornées : majorée/minorée'],
      blocs:[
        {
          notion:'📐 Définir une suite',
          theoremes:[
            { id:'D-SN1', type:'def', nom:'Suite numérique',
              enonce:"Une suite (uₙ)ₙ∈ℕ est une fonction de ℕ dans ℝ.\n\nDEUX MODES DE DÉFINITION :\n1. Formule explicite : uₙ=f(n)  (calcul direct)\n   Exemple : uₙ=3n+2 ; uₙ=n²−1\n\n2. Récurrence : u₀ donné (ou u₁) + uₙ₊₁=g(uₙ)\n   Exemple : u₀=1, uₙ₊₁=2uₙ+3\n\nMONOTONIE :\nCroissante : uₙ₊₁>uₙ (ou uₙ₊₁−uₙ>0)\nDécroissante : uₙ₊₁<uₙ (ou uₙ₊₁−uₙ<0)\nConstante : uₙ₊₁=uₙ" },
            { id:'D-SN2', type:'def', nom:'Suites arithmétiques et géométriques',
              enonce:"ARITHMÉTIQUE (raison r) :\nuₙ₊₁=uₙ+r ↔ uₙ=u₀+nr ↔ uₙ−uₚ=(n−p)r\nCaractérisation : différences consécutives constantes\n\nGÉOMÉTRIQUE (raison q≠0) :\nuₙ₊₁=q·uₙ ↔ uₙ=u₀·qⁿ ↔ uₙ/uₚ=q^(n−p)\nCaractérisation : rapports consécutifs constants\n\nRECONNAÎTRE :\nArith. ↔ uₙ₊₁−uₙ=constante\nGéom. ↔ uₙ₊₁/uₙ=constante (uₙ≠0)" },
          ],
          exercices:[
            { id:'EX-SN1', niveau:'Facile', titre:'Calcul de termes',
              enonce:"uₙ=3n²−2n+1. Calculer u₀, u₃, u₁₀.",
              correction:"u₀=1. u₃=27−6+1=22. u₁₀=300−20+1=281." },
            { id:'EX-SN2', niveau:'Facile', titre:'Suite arithmétique',
              enonce:"Suite arith., u₁=5, u₇=29. Trouver r, u₁₀ et Σᵢ₌₁¹⁰ uᵢ.",
              correction:"r=(29−5)/(7−1)=4. u₁₀=5+9×4=41.\nS=10(5+41)/2=230." },
            { id:'EX-SN3', niveau:'Intermédiaire', titre:'Suite récurrente — monotonie',
              enonce:"u₀=2, uₙ₊₁=0,5uₙ+1. Étudier la monotonie.",
              correction:"uₙ₊₁−uₙ=0,5uₙ+1−uₙ=1−0,5uₙ.\nSigne selon uₙ vs 2 (point fixe).\nSi uₙ<2 → uₙ₊₁−uₙ>0 → croissante.\nuₙ₊₁ reste <2 (si u₀<2) : suite croissante et majorée par 2." },
          ]
        },
      ]
    },
    {
      id:'sc-sommes-arith-geo', titre:'1.2 Sommes de suites',
      notions:['Somme arithmétique : Sₙ=n(u₁+uₙ)/2','Somme géométrique : Sₙ=u₁(1−qⁿ)/(1−q)','Σᵢ₌₁ⁿ i=n(n+1)/2','Comportement des suites géométriques'],
      blocs:[
        {
          notion:'∑ Sommes et comportement',
          theoremes:[
            { id:'F-SN1', type:'formule', nom:'Sommes arithmétiques et géométriques',
              enonce:"ARITHMÉTIQUE (n termes, de u₁ à uₙ) :\nSₙ = n·(u₁+uₙ)/2 = n·(premier+dernier)/2\n\nFormules utiles :\nΣᵢ₌₁ⁿ i = n(n+1)/2\nΣᵢ₌₀ⁿ⁻¹ i = n(n−1)/2\n\nGÉOMÉTRIQUE (n termes, de u₁ à uₙ) :\nSₙ = u₁·(1−qⁿ)/(1−q)  si q≠1\nSₙ = n·u₁  si q=1\n\nCOMPORTEMENT qⁿ :\n|q|<1 → 0 (converge)\nq=1  → 1 (constante)\nq>1  → +∞ (diverge)\nq≤−1 → oscille/diverge",
              remarque:"En Première, retenir Σᵢ₌₁ⁿ i=n(n+1)/2. En Terminale, ce sera Σqᵢ=1/(1−q) si |q|<1." },
          ],
          exercices:[
            { id:'EX-SN4', niveau:'Intermédiaire', titre:'Somme géométrique',
              enonce:"Suite géom. u₁=3, q=2. Calculer S₈=u₁+u₂+…+u₈.",
              correction:"S₈=3×(1−2⁸)/(1−2)=3×(1−256)/(−1)=3×255=765." },
            { id:'EX-SN5', niveau:'Difficile', titre:'Capital avec intérêts',
              enonce:"Placement 1000€ par an à 5%. Capital total après 10 versements.",
              correction:"Annuités géom. q=1,05, u₁=1000×1,05.\nVA=1000×1,05×(1,05¹⁰−1)/(1,05−1)=1050×(1,629−1)/0,05≈13207€." },
          ]
        },
      ]
    },
  ]
},

// ─────────────────────────────────────────────────────────────────────
// CH 02 — SECOND DEGRÉ
// ─────────────────────────────────────────────────────────────────────
'second-degre': {
  id:'second-degre', emoji:'△', badge:'Algèbre', color:'#4f6ef7',
  titre:'Second degré',
  desc:"Forme canonique, forme factorisée, discriminant Δ, résolution de ax²+bx+c=0, signe du trinôme, somme et produit des racines.",
  souschapitres:[
    {
      id:'sc-sd-formes', titre:'2.1 Discriminant, racines et formes',
      notions:['Δ=b²−4ac','Forme canonique f(x)=a(x−α)²+β','Racines x₁=(−b±√Δ)/(2a)','Signe du trinôme selon Δ'],
      blocs:[
        {
          notion:'△ Discriminant et résolution',
          theoremes:[
            { id:'D-SD1', type:'def', nom:'Trinôme du second degré',
              enonce:"f(x)=ax²+bx+c  (a≠0)\nDiscriminant : Δ=b²−4ac\n\nFORME CANONIQUE :\nf(x)=a(x−α)²+β\nα=−b/(2a)  ;  β=f(α)=−Δ/(4a)\nSommet S(α;β) : min si a>0, max si a<0\n\nRACINES :\nΔ>0 : x₁=(−b−√Δ)/(2a)  ;  x₂=(−b+√Δ)/(2a)\nΔ=0 : x₀=−b/(2a)  (double)\nΔ<0 : pas de racine réelle" },
            { id:'P-SD1', type:'prop', nom:'Signe du trinôme',
              enonce:"a>0 :\n  Δ>0 : f(x)>0 si x<x₁ ou x>x₂ ; f(x)<0 si x₁<x<x₂\n  Δ=0 : f(x)≥0 sur ℝ (nul en x₀)\n  Δ<0 : f(x)>0 sur ℝ\n\na<0 : inverser les signes\n\nFACTORISATION (si Δ>0) :\nf(x)=a(x−x₁)(x−x₂)" },
            { id:'F-SD1', type:'formule', nom:'Somme et produit des racines',
              enonce:"x₁+x₂ = −b/a\nx₁×x₂ = c/a\n\nRECONSTRUIRE le trinôme depuis ses racines :\nax²+bx+c = a[x²−(x₁+x₂)x+x₁x₂]\n\nExemple : racines 3 et −2 :\n(x−3)(x+2)=x²−x−6",
              remarque:"Ces relations permettent souvent d'éviter le calcul de √Δ pour vérifier ou résoudre des problèmes." },
          ],
          exercices:[
            { id:'EX-SD1', niveau:'Facile', titre:'Résolution',
              enonce:"Résoudre 2x²+3x−2=0.",
              correction:"Δ=9+16=25. √Δ=5.\nx₁=(−3−5)/4=−2 ; x₂=(−3+5)/4=1/2." },
            { id:'EX-SD2', niveau:'Intermédiaire', titre:'Forme canonique + sommet',
              enonce:"f(x)=−x²+4x−1. Forme canonique, sommet, maximum.",
              correction:"α=2, β=f(2)=−4+8−1=3.\nf(x)=−(x−2)²+3. Sommet S(2;3). Max=3 (a<0)." },
            { id:'EX-SD3', niveau:'Difficile', titre:'Inéquation du second degré',
              enonce:"Résoudre x²−5x+6≤0.",
              correction:"Δ=25−24=1. x₁=2, x₂=3. a=1>0.\nf(x)≤0 entre les racines : S=[2;3]." },
          ]
        },
      ]
    },
  ]
},

// ─────────────────────────────────────────────────────────────────────
// CH 03 — DÉRIVATION
// ─────────────────────────────────────────────────────────────────────
'derivation': {
  id:'derivation', emoji:"f'", badge:'Analyse', color:'#06d6a0',
  titre:'Dérivation',
  desc:"Taux d'accroissement, nombre dérivé, dérivées usuelles, règles (u+v, uv, u/v, ku), équation de la tangente, variations de f.",
  souschapitres:[
    {
      id:'sc-der-def', titre:'3.1 Définition et règles de dérivation',
      notions:['f\'(a) = lim taux d\'accroissement en a','Tangente : y=f\'(a)(x−a)+f(a)','Dérivées usuelles','Règles : somme, produit, quotient'],
      blocs:[
        {
          notion:"📐 Nombre dérivé et règles",
          theoremes:[
            { id:'D-DE1', type:'def', nom:'Nombre dérivé',
              enonce:"f'(a) = lim(h→0) [f(a+h)−f(a)]/h\n\nGéométrie : f'(a) = pente de la tangente en M(a,f(a))\nTangente en a : y = f'(a)·(x−a) + f(a)\n\nf dérivable en a ↔ la limite existe (finie)\nf dérivable sur I ↔ dérivable en tout point de I" },
            { id:'F-DE1', type:'formule', nom:'Dérivées usuelles',
              enonce:"(c)' = 0  (constante)\n(xⁿ)' = nxⁿ⁻¹  (n∈ℤ)\n(√x)' = 1/(2√x)\n(1/x)' = −1/x²\n(eˣ)' = eˣ\n(ln x)' = 1/x  (x>0)  ← Terminale\n(sin x)' = cos x  ← Terminale\n(cos x)' = −sin x  ← Terminale" },
            { id:'F-DE2', type:'formule', nom:'Règles de dérivation',
              enonce:"(u+v)' = u'+v'\n(ku)' = k·u'  (k constante)\n(uv)' = u'v + uv'\n(u/v)' = (u'v−uv')/v²\n\nEn Première (pas de composée) :\n(uⁿ)' = n·u'·uⁿ⁻¹ peut être admis\nMais surtout savoir dériver les polynômes et fractions rationnelles.",
              remarque:"La règle de la composée (f∘g)' est au programme de Terminale. En Première : concentrer sur polynômes et quotients." },
          ],
          exercices:[
            { id:'EX-DE1', niveau:'Facile', titre:'Dérivée d\'un polynôme',
              enonce:"f(x)=3x³−2x²+5x−1. Calculer f'(x).",
              correction:"f'(x)=9x²−4x+5." },
            { id:'EX-DE2', niveau:'Facile', titre:'Équation de la tangente',
              enonce:"f(x)=x²−3x. Tangente en x=2.",
              correction:"f(2)=4−6=−2. f'(x)=2x−3, f'(2)=1.\ny=1·(x−2)+(−2)=x−4." },
            { id:'EX-DE3', niveau:'Intermédiaire', titre:'Dérivée d\'un quotient',
              enonce:"f(x)=(2x+1)/(x−3). Calculer f'(x).",
              correction:"u=2x+1, u'=2 ; v=x−3, v'=1.\nf'(x)=(2(x−3)−1·(2x+1))/(x−3)²=(2x−6−2x−1)/(x−3)²=−7/(x−3)²." },
          ]
        },
      ]
    },
    {
      id:'sc-der-var', titre:'3.2 Signe de f\' et tableau de variations',
      notions:['f\'(x)>0 ↔ f croissante','f\'(x)<0 ↔ f décroissante','Extremum local : f\' change de signe','Tableau de variations complet'],
      blocs:[
        {
          notion:'📈 Variations et extrema',
          theoremes:[
            { id:'P-DE1', type:'prop', nom:'Lien dérivée-variations',
              enonce:"f dérivable sur ]a,b[ :\nf'(x)>0 → f strictement croissante\nf'(x)<0 → f strictement décroissante\nf'(x)=0 → f constante\n\nEXTREMUM LOCAL en α :\nf'(α)=0 ET f' change de signe en α\n• f' passe de + à − : maximum local f(α)\n• f' passe de − à + : minimum local f(α)\n• f' ne change pas de signe : pas d'extremum" },
            { id:'M-DE1', type:'methode', nom:'Dresser un tableau de variations',
              enonce:"1. Calculer f'(x)\n2. Factoriser f'(x)\n3. Résoudre f'(x)=0\n4. Étudier le signe de f'(x)\n5. En déduire les variations de f\n6. Calculer f aux points critiques\n\nFORMAT :\nx   | a   x₀    b\nf'  | +   0    −\nf   | ↗  f(x₀)  ↘" },
          ],
          exercices:[
            { id:'EX-DE4', niveau:'Intermédiaire', titre:'Tableau complet',
              enonce:"f(x)=2x³−3x²−12x+5. Tableau de variations sur ℝ.",
              correction:"f'(x)=6x²−6x−12=6(x−2)(x+1).\nf'=0 en x=−1 et x=2.\nf'(x)>0 sur ]−∞;−1[ et ]2;+∞[ ; <0 sur ]−1;2[.\nMax local f(−1)=12 ; Min local f(2)=−15." },
          ]
        },
      ]
    },
  ]
},

// ─────────────────────────────────────────────────────────────────────
// CH 04 — FONCTION EXPONENTIELLE
// ─────────────────────────────────────────────────────────────────────
'exponentielle': {
  id:'exponentielle', emoji:'eˣ', badge:'Analyse', color:'#06d6a0',
  titre:'Fonction exponentielle',
  desc:"Définition (f'=f, f(0)=1), propriétés algébriques e^(a+b), étude complète de eˣ, croissances comparées, équations et inéquations.",
  souschapitres:[
    {
      id:'sc-exp-def', titre:'4.1 Définition et propriétés',
      notions:['Unique f telle que f\'=f et f(0)=1','e^(a+b)=eᵃ·eᵇ ; eˣ>0 toujours','(eˣ)\'=eˣ ; croissante sur ℝ','Équations eˣ=k ↔ x=ln k (Terminale)'],
      blocs:[
        {
          notion:'📐 La fonction exponentielle',
          theoremes:[
            { id:'D-EX1', type:'def', nom:'Définition de eˣ',
              enonce:"La fonction exponentielle est l'UNIQUE fonction f définie sur ℝ vérifiant :\n  f' = f  et  f(0) = 1\n\ne = f(1) ≈ 2,71828…\n\nPROPRIÉTÉS ALGÉBRIQUES :\ne^(a+b) = eᵃ·eᵇ\ne^(a−b) = eᵃ/eᵇ\ne^(−a) = 1/eᵃ\n(eᵃ)ⁿ = e^(na)\ne⁰ = 1\n\neˣ > 0 pour tout x ∈ ℝ" },
            { id:'T-EX1', type:'thm', nom:'Propriétés de eˣ',
              enonce:"(eˣ)' = eˣ > 0 → eˣ strictement CROISSANTE sur ℝ\n\nLIMITES :\nlim(x→−∞) eˣ = 0  (asymptote horizontale y=0)\nlim(x→+∞) eˣ = +∞\n\nCROISSANCES COMPARÉES :\nlim(x→+∞) eˣ/xⁿ = +∞  (exp≫polynôme)\nlim(x→+∞) xⁿ·e^(−x) = 0\nlim(x→+∞) eˣ/xⁿ = +∞\nlim(x→0⁺) x·ln x = 0  (hors programme Première)\n\nCourbe : passe par (0;1), tangente en 0 : y=x+1" },
            { id:'F-EX1', type:'formule', nom:'Résolution d\'équations et inéquations',
              enonce:"eˣ=eᵃ ↔ x=a  (bijectivité)\neˣ=k (k>0) ↔ x=ln k  (log en Terminale)\neˣ<eᵃ ↔ x<a  (croissante)\n\nÉQUATIONS pratiques en Première :\nPrincipalement de la forme eˣ=eᵃ ou après substitution\nExemple : e^(2x)=e^(3) → 2x=3 → x=3/2\n\nINÉQUATION :\neˣ>k>0 ↔ x>ln k",
              remarque:"En Première, eˣ=k se résout par 'x=ln k' mais ln est officiellement au programme de Terminale. Utiliser les propriétés algébriques directement." },
          ],
          exercices:[
            { id:'EX-EX1', niveau:'Facile', titre:'Simplification',
              enonce:"Simplifier : e³×e⁻¹/(e²) et (e^2x)³.",
              correction:"e³×e⁻¹/e²=e^(3−1−2)=e⁰=1.\n(e^(2x))³=e^(6x)." },
            { id:'EX-EX2', niveau:'Facile', titre:'Équation',
              enonce:"Résoudre : e^(3x−1)=e^(2x+4).",
              correction:"3x−1=2x+4 → x=5." },
            { id:'EX-EX3', niveau:'Intermédiaire', titre:'Étude de xe^(−x)',
              enonce:"f(x)=xe^(−x). Calculer f'(x) et dresser le tableau de variations.",
              correction:"f'(x)=(1)e^(−x)+x(−e^(−x))=e^(−x)(1−x).\nf'=0 en x=1. f'>0 sur ]−∞;1[, f'<0 sur ]1;+∞[.\nMax en x=1 : f(1)=e⁻¹=1/e." },
          ]
        },
      ]
    },
  ]
},

// ─────────────────────────────────────────────────────────────────────
// CH 05 — FONCTIONS TRIGONOMÉTRIQUES
// ─────────────────────────────────────────────────────────────────────
'trigonometrie': {
  id:'trigonometrie', emoji:'cos', badge:'Analyse', color:'#06d6a0',
  titre:'Fonctions trigonométriques',
  desc:"Cercle trigonométrique, radians, cos²x+sin²x=1, valeurs remarquables, périodicité, variations sur [0;2π], équations cosx=a et sinx=a.",
  souschapitres:[
    {
      id:'sc-trigo-cercle', titre:'5.1 Cercle trigonométrique et valeurs remarquables',
      notions:['Radian : arc = rayon×angle','cos²x+sin²x=1','Valeurs : 0, π/6, π/4, π/3, π/2, π','tan x=sin x/cos x'],
      blocs:[
        {
          notion:'⭕ Cercle trigonométrique',
          theoremes:[
            { id:'D-TR1', type:'def', nom:'Cercle trigonométrique et radians',
              enonce:"Cercle unité (rayon 1, centre O).\nÀ l'angle x (radians) correspond le point M(cos x; sin x).\n\nCONVERSION :\n180° = π rad\nx° = x×π/180 rad\n\nRELATION FONDAMENTALE :\ncos²x + sin²x = 1  pour tout x∈ℝ\n\nParité :\ncos(−x)=cos x  (cos paire)\nsin(−x)=−sin x  (sin impaire)\n\nComplémentarité :\ncos(π/2−x)=sin x  ;  sin(π/2−x)=cos x" },
            { id:'F-TR1', type:'formule', nom:'Valeurs remarquables',
              enonce:"x      | 0   | π/6  | π/4   | π/3   | π/2 | π\ncos x  | 1   | √3/2 | √2/2  | 1/2   |  0  | −1\nsin x  | 0   | 1/2  | √2/2  | √3/2  |  1  |  0\n\nTANGENTE : tan x=sin x/cos x (définie si cos x≠0)\ntan 0=0 ; tan π/4=1 ; tan π/3=√3 ; tan π/6=1/√3\n\nFormules somme (en Terminale) :\ncos(a+b)=cos a·cos b−sin a·sin b\nsin(a+b)=sin a·cos b+cos a·sin b",
              remarque:"Mémorise le tableau avec le triangle ! La colonne 1/2 / √2/2 / √3/2 correspond aux angles 30°/45°/60°." },
          ],
          exercices:[
            { id:'EX-TR1', niveau:'Facile', titre:'Valeurs exactes',
              enonce:"Calculer cos(3π/4) et sin(5π/6).",
              correction:"cos(3π/4)=cos(π−π/4)=−cos(π/4)=−√2/2.\nsin(5π/6)=sin(π−π/6)=sin(π/6)=1/2." },
          ]
        },
      ]
    },
    {
      id:'sc-trigo-period', titre:'5.2 Périodicité, variations et équations',
      notions:['cos et sin périodiques de période 2π','Variations de cos sur [0;π] et sin sur [−π/2;π/2]','cosx=a : solutions sur [0;2π]','sinx=a : solutions sur [0;2π]'],
      blocs:[
        {
          notion:'📈 Variations et équations trigonométriques',
          theoremes:[
            { id:'T-TR1', type:'thm', nom:'Variations et périodicité',
              enonce:"PÉRIODICITÉ :\ncos et sin : période 2π\ncos(x+2π)=cos x  ;  sin(x+2π)=sin x\n→ Étudier sur [0;2π] ou [−π;π] suffit\n\nVARIATIONS DE cos :\nDécroissante sur [0;π], croissante sur [π;2π]\nMax cos=1 en x=0 ; Min cos=−1 en x=π\n\nVARIATIONS DE sin :\nCroissante sur [−π/2;π/2], décroissante sur [π/2;3π/2]\nMax sin=1 en x=π/2 ; Min sin=−1 en x=−π/2 ou 3π/2" },
            { id:'M-TR1', type:'methode', nom:'Résoudre cos x = a et sin x = a',
              enonce:"cos x = a (−1≤a≤1) :\nSolution de référence x₀=arccos(a)∈[0;π]\nSolutions sur ℝ : x=±x₀+2kπ (k∈ℤ)\nSur [0;2π] : x=x₀ et x=2π−x₀\n\nsin x = a (−1≤a≤1) :\nSolution de référence x₀=arcsin(a)∈[−π/2;π/2]\nSolutions sur ℝ : x=x₀+2kπ ou x=(π−x₀)+2kπ\nSur [0;2π] : x=x₀ et x=π−x₀\n\nCas particuliers :\ncos x=1 ↔ x=2kπ\ncos x=−1 ↔ x=(2k+1)π\nsin x=0 ↔ x=kπ",
              remarque:"Toujours dessiner le cercle pour visualiser les deux solutions dans [0;2π]." },
          ],
          exercices:[
            { id:'EX-TR2', niveau:'Facile', titre:'Équation trigonométrique',
              enonce:"Résoudre cos x=1/2 sur [0;2π].",
              correction:"x₀=π/3. Solutions : x=π/3 et x=2π−π/3=5π/3." },
            { id:'EX-TR3', niveau:'Intermédiaire', titre:'Équation sin',
              enonce:"Résoudre sin x=√3/2 sur [0;2π].",
              correction:"x₀=arcsin(√3/2)=π/3.\nSolutions : x=π/3 et x=π−π/3=2π/3." },
            { id:'EX-TR4', niveau:'Difficile', titre:'Équation en 2x',
              enonce:"Résoudre sin(2x)=1/2 sur [0;π].",
              correction:"2x∈[0;2π]. sin(2x)=1/2 → 2x=π/6 ou 2x=5π/6.\nx=π/12 ou x=5π/12." },
          ]
        },
      ]
    },
  ]
},

// ─────────────────────────────────────────────────────────────────────
// CH 06 — PRODUIT SCALAIRE
// ─────────────────────────────────────────────────────────────────────
'produit-scalaire': {
  id:'produit-scalaire', emoji:'·', badge:'Géométrie', color:'#f59e0b',
  titre:'Produit scalaire',
  desc:"3 définitions (projection, cosinus, coordonnées), propriétés, formule d'Al-Kashi, orthogonalité, applications (perpendicularité, angles, distances).",
  souschapitres:[
    {
      id:'sc-ps-def', titre:'6.1 Définitions et propriétés',
      notions:['u⃗·v⃗=|u⃗||v⃗|cosθ','u⃗·v⃗=aa\'+bb\' (coordonnées)','Orthogonalité u⃗·v⃗=0','u⃗·u⃗=|u⃗|²'],
      blocs:[
        {
          notion:'📐 Trois définitions du produit scalaire',
          theoremes:[
            { id:'D-PS1', type:'def', nom:'Produit scalaire — définitions',
              enonce:"DEF 1 — Géométrique (cosinus) :\nu⃗·v⃗ = |u⃗|·|v⃗|·cos(u⃗,v⃗)\n(angle entre les deux vecteurs)\n\nDEF 2 — Par projection :\nu⃗·v⃗ = |u⃗|·proj_{u⃗}(v⃗)  ou  u⃗·v⃗ = |v⃗|·proj_{v⃗}(u⃗)\n\nDEF 3 — Coordonnées dans un repère orthonormé :\nSi u⃗(a;b) et v⃗(a';b') :\nu⃗·v⃗ = aa'+bb'\n\nRÉSULTAT IMPORTANT :\nu⃗·u⃗ = |u⃗|²\nu⃗ ⊥ v⃗ ↔ u⃗·v⃗=0" },
            { id:'P-PS1', type:'prop', nom:'Propriétés algébriques',
              enonce:"COMMUTATIVITÉ : u⃗·v⃗=v⃗·u⃗\nBILINÉARITÉ :\n(u⃗+v⃗)·w⃗=u⃗·w⃗+v⃗·w⃗\n(λu⃗)·v⃗=λ(u⃗·v⃗)\n\nIDENTITÉS REMARQUABLES :\n|u⃗+v⃗|²=|u⃗|²+2u⃗·v⃗+|v⃗|²\n|u⃗−v⃗|²=|u⃗|²−2u⃗·v⃗+|v⃗|²\n(u⃗+v⃗)·(u⃗−v⃗)=|u⃗|²−|v⃗|²" },
            { id:'F-PS1', type:'formule', nom:'Formule d\'Al-Kashi (cosinus)',
              enonce:"Dans le triangle ABC :\nBC²=AB²+AC²−2·AB·AC·cos(A)\n\nCorollaire (Pythagore) :\ncos(A)=0 ↔ BC²=AB²+AC²\n\nDÉTERMINER UN ANGLE :\ncos(A)=(AB²+AC²−BC²)/(2·AB·AC)\n\nDÉTERMINER UNE LONGUEUR :\nBC=√(AB²+AC²−2·AB·AC·cos(A))",
              remarque:"Al-Kashi généralise Pythagore : si A=π/2, on retrouve BC²=AB²+AC²." },
          ],
          exercices:[
            { id:'EX-PS1', niveau:'Facile', titre:'Orthogonalité',
              enonce:"u⃗(3;−2) et v⃗(4;6). u⃗⊥v⃗ ?",
              correction:"u⃗·v⃗=3×4+(−2)×6=12−12=0. Oui, u⃗⊥v⃗." },
            { id:'EX-PS2', niveau:'Intermédiaire', titre:'Al-Kashi',
              enonce:"Triangle : AB=5, AC=7, BC=8. Calculer cos(A).",
              correction:"cos(A)=(25+49−64)/(2×5×7)=10/70=1/7." },
            { id:'EX-PS3', niveau:'Difficile', titre:'Application — projection',
              enonce:"Cercle diamètre [AB]. Montrer que pour tout M sur le cercle (M≠A,B), AM⃗·BM⃗=0.",
              correction:"O milieu de [AB].\nAM⃗=AO⃗+OM⃗ ; BM⃗=BO⃗+OM⃗=−AO⃗+OM⃗.\nAM⃗·BM⃗=(AO⃗+OM⃗)·(−AO⃗+OM⃗)=|OM⃗|²−|AO⃗|².\nOM⃗=R et AO⃗=R (rayon) → AM⃗·BM⃗=0 ✓" },
          ]
        },
      ]
    },
  ]
},

// ─────────────────────────────────────────────────────────────────────
// CH 07 — GÉOMÉTRIE REPÉRÉE
// ─────────────────────────────────────────────────────────────────────
'geometrie-reperee': {
  id:'geometrie-reperee', emoji:'📍', badge:'Géométrie', color:'#f59e0b',
  titre:'Géométrie repérée',
  desc:"Équations de droite (réduite, cartésienne), vecteur directeur et normal, équation du cercle, positions relatives, intersections.",
  souschapitres:[
    {
      id:'sc-geo-droites', titre:'7.1 Droites dans le plan',
      notions:['Réduite y=mx+p','Cartésienne ax+by+c=0','Vecteur directeur u⃗(b;−a) et normal n⃗(a;b)','Distance point-droite'],
      blocs:[
        {
          notion:'📏 Droites et cercles',
          theoremes:[
            { id:'F-GR1', type:'formule', nom:'Équations de droite',
              enonce:"RÉDUITE : y=mx+p\nm : pente (coefficient directeur)\np : ordonnée à l'origine\n\nCARTÉSIENNE : ax+by+c=0\nVecteur NORMAL n⃗(a;b)\nVecteur DIRECTEUR u⃗(b;−a)  (ou (−b;a))\n\nDROITE PASSANT PAR A(x₀;y₀) de directeur u⃗(α;β) :\n{x=x₀+αt ; y=y₀+βt}  (paramétrique)\nCartésienne : β(x−x₀)−α(y−y₀)=0\n\nDistance de M₀(x₀;y₀) à ax+by+c=0 :\nd=|ax₀+by₀+c|/√(a²+b²)" },
            { id:'F-GR2', type:'formule', nom:'Cercle et positions relatives',
              enonce:"CERCLE de centre Ω(a;b) et rayon r :\n(x−a)²+(y−b)²=r²\n\nForme développée : x²+y²+Ax+By+C=0\nCentre=(−A/2;−B/2) ; r=√(A²/4+B²/4−C)\n\nTangente en M₀(x₀;y₀)∈Γ :\n(x₀−a)(x−a)+(y₀−b)(y−b)=r²\n\nIntersection droite-cercle :\nSubstituer l'équation de la droite dans celle du cercle\nRésoudre l'équation du 2nd degré en x (ou t)" },
          ],
          exercices:[
            { id:'EX-GR1', niveau:'Facile', titre:'Équation de droite',
              enonce:"Droite par A(2;1) de normale n⃗(3;−2). Équation cartésienne.",
              correction:"3(x−2)−2(y−1)=0 → 3x−2y−4=0." },
            { id:'EX-GR2', niveau:'Intermédiaire', titre:'Intersection droite-cercle',
              enonce:"Droite y=x+1. Cercle x²+y²=5. Intersection ?",
              correction:"x²+(x+1)²=5 → 2x²+2x+1=5 → 2x²+2x−4=0 → x²+x−2=(x+2)(x−1)=0.\nx=1→y=2 ; x=−2→y=−1.\nIntersections : A(1;2) et B(−2;−1)." },
            { id:'EX-GR3', niveau:'Difficile', titre:'Distance point-droite',
              enonce:"Distance de M(3;4) à la droite 3x+4y−10=0.",
              correction:"d=|3×3+4×4−10|/√(9+16)=|9+16−10|/5=15/5=3." },
          ]
        },
      ]
    },
  ]
},

// ─────────────────────────────────────────────────────────────────────
// CH 08 — PROBABILITÉS CONDITIONNELLES
// ─────────────────────────────────────────────────────────────────────
'probas-conditionnelles': {
  id:'probas-conditionnelles', emoji:'🎲', badge:'Probas', color:'#8b5cf6',
  titre:'Probabilités conditionnelles',
  desc:"P(A|B)=P(A∩B)/P(A), formule des probabilités composées, arbres pondérés, partition de l'univers, probabilités totales, indépendance.",
  souschapitres:[
    {
      id:'sc-pc-def', titre:'8.1 Probabilité conditionnelle et indépendance',
      notions:['P(A|B)=P(A∩B)/P(B)','P(A∩B)=P(B)·P(A|B)','Indépendance : P(A∩B)=P(A)P(B)','Arbre de probabilités'],
      blocs:[
        {
          notion:'🎲 Probabilité conditionnelle',
          theoremes:[
            { id:'D-PC1', type:'def', nom:'Probabilité conditionnelle',
              enonce:"P(A|B) = P(A∩B)/P(B)  avec P(B)>0\n«Probabilité de A sachant que B est réalisé»\n\nFormule multiplicative :\nP(A∩B) = P(B)·P(A|B) = P(A)·P(B|A)\n\nINDÉPENDANCE :\nA et B indép. ↔ P(A∩B)=P(A)·P(B)\n                ↔ P(A|B)=P(A)\n                ↔ P(B|A)=P(B)\n\nRemarque : indépendance ≠ incompatibilité\nSi P(A)>0 et P(B)>0 : incomp. → non indép." },
            { id:'T-PC1', type:'thm', nom:'Formule des probabilités totales',
              enonce:"Si B₁,…,Bₙ est une PARTITION de Ω :\n(Bᵢ disjoints, de réunion Ω, tous de proba>0)\n\nP(A) = Σᵢ P(A|Bᵢ)·P(Bᵢ)\n\nCas {B,B̄} :\nP(A) = P(A|B)·P(B) + P(A|B̄)·P(B̄)\n\nARBRE DE PROBABILITÉS :\n• Multiplier les branches pour P(∩)\n• Additionner les chemins → même événement" },
          ],
          exercices:[
            { id:'EX-PC1', niveau:'Facile', titre:'Arbre pondéré',
              enonce:"P(M)=0,4 (matin), P(P|M)=0,9, P(P|M̄)=0,7. P(ponctuel) ?",
              correction:"P(P)=0,9×0,4+0,7×0,6=0,36+0,42=0,78." },
            { id:'EX-PC2', niveau:'Intermédiaire', titre:'Bayes',
              enonce:"Urne A (3R,2B), urne B (1R,4B). Urne choisie au hasard, boule tirée rouge. P(urne A) ?",
              correction:"P(R)=3/5×1/2+1/5×1/2=3/10+1/10=4/10=2/5.\nP(A|R)=P(R|A)P(A)/P(R)=(3/5×1/2)/(2/5)=(3/10)/(4/10)=3/4." },
          ]
        },
      ]
    },
  ]
},

// ─────────────────────────────────────────────────────────────────────
// CH 09 — VARIABLES ALÉATOIRES
// ─────────────────────────────────────────────────────────────────────
'variables-aleatoires': {
  id:'variables-aleatoires', emoji:'X', badge:'Probas', color:'#8b5cf6',
  titre:'Variables aléatoires',
  desc:"Définition, loi de probabilité, espérance E(X), variance V(X)=E(X²)−[E(X)]², écart-type σ(X), loi uniforme sur {1,…,n}.",
  souschapitres:[
    {
      id:'sc-va-def', titre:'9.1 Loi de probabilité et espérance',
      notions:['Variable aléatoire X : X(Ω)={x₁,…,xₙ}','Loi : P(X=xᵢ)=pᵢ avec Σpᵢ=1','Espérance E(X)=Σxᵢpᵢ','Variance V(X)=E(X²)−[E(X)]²'],
      blocs:[
        {
          notion:'📊 Loi, espérance et variance',
          theoremes:[
            { id:'D-VA1', type:'def', nom:'Variable aléatoire et loi de probabilité',
              enonce:"X : Ω → ℝ (fonction qui associe un nombre réel à chaque issue)\n\nX prend les valeurs x₁<x₂<…<xₙ avec probabilités p₁,…,pₙ\nΣᵢ pᵢ = 1\n\nLOI DE X : tableau\nX  | x₁  x₂  …  xₙ\nP  | p₁  p₂  …  pₙ\n\nLOI UNIFORME sur {x₁,…,xₙ} :\npᵢ=1/n pour tout i" },
            { id:'F-VA1', type:'formule', nom:'Espérance, variance et écart-type',
              enonce:"ESPÉRANCE :\nE(X) = Σᵢ xᵢ·pᵢ = x₁p₁+x₂p₂+…+xₙpₙ\n\n«Valeur moyenne à long terme»\n\nVARIANCE :\nV(X) = E(X²)−[E(X)]²\nE(X²) = Σᵢ xᵢ²·pᵢ\nV(X) ≥ 0 toujours\n\nÉCART-TYPE :\nσ(X) = √V(X)\n(même unité que X)\n\nPROPRIÉTÉS LINÉAIRES :\nE(aX+b) = a·E(X)+b\nV(aX+b) = a²·V(X)\nσ(aX+b) = |a|·σ(X)",
              remarque:"L'espérance est le 'centre de gravité' de la loi. La variance mesure la dispersion autour de E(X)." },
          ],
          exercices:[
            { id:'EX-VA1', niveau:'Facile', titre:'Espérance et variance',
              enonce:"X : loi\nX | 1   2   3\nP | 0,2 0,5 0,3\nCalculer E(X) et V(X).",
              correction:"E(X)=1×0,2+2×0,5+3×0,3=0,2+1+0,9=2,1.\nE(X²)=1×0,2+4×0,5+9×0,3=0,2+2+2,7=4,9.\nV(X)=4,9−2,1²=4,9−4,41=0,49.\nσ(X)=0,7." },
            { id:'EX-VA2', niveau:'Intermédiaire', titre:'Jeu de dés équitable',
              enonce:"Dé équilibré. Gain X : +3€ si pair, −2€ si impair. E(X) et σ(X).",
              correction:"P(X=3)=1/2, P(X=−2)=1/2.\nE(X)=3×1/2+(−2)×1/2=0,5€.\nE(X²)=9/2+4/2=6,5. V=6,5−0,25=6,25. σ=2,5€." },
          ]
        },
      ]
    },
  ]
},

// ─────────────────────────────────────────────────────────────────────
// CH 10 — PYTHON ET ALGORITHMES
// ─────────────────────────────────────────────────────────────────────
'python-algorithmes': {
  id:'python-algorithmes', emoji:'🐍', badge:'Info', color:'#ec4899',
  titre:'Python et Algorithmes',
  desc:"Listes (création, parcours, compréhension, append/insert/remove), fonctions (def, return), suites, traitement de données, dichotomie.",
  souschapitres:[
    {
      id:'sc-py-bases', titre:'10.1 Listes et fonctions',
      notions:['Listes : création, indexation, len()','Méthodes : append, insert, remove, sort','Boucles for/while sur listes','Fonctions def f(x): return ...'],
      blocs:[
        {
          notion:'🐍 Listes et fonctions Python',
          theoremes:[
            { id:'M-PY1', type:'methode', nom:'Listes en Python',
              enonce:"CRÉATION :\nlst = []               # liste vide\nlst = [1, 2, 3, 4]\nlst = list(range(10))  # [0..9]\n\nACCÈS :\nlst[0]    # premier élément\nlst[−1]   # dernier\nlst[2:5]  # tranche [2,3,4]\n\nMODIFICATION :\nlst.append(x)     # ajouter en fin\nlst.insert(i, x)  # insérer en position i\nlst.remove(x)     # supprimer 1ère occurrence\nlst.pop(i)        # supprimer et retourner l'élément i\nlst.sort()        # trier\n\nLISTES EN COMPRÉHENSION :\n[f(x) for x in range(n)]\n[x for x in lst if condition]\n\nExemple : carrés des pairs de 0 à 9 :\n[x**2 for x in range(10) if x%2==0]" },
            { id:'M-PY2', type:'methode', nom:'Fonctions et suites',
              enonce:"DÉFINIR UNE FONCTION :\ndef ma_fonction(a, b):\n    resultat = a + b\n    return resultat\n\nSUITE AVEC BOUCLE :\ndef suite(u0, n):\n    u = u0\n    for i in range(n):\n        u = 2*u - 1  # récurrence\n    return u\n\nSUITE EN LISTE :\ndef liste_suite(u0, n):\n    termes = [u0]\n    for i in range(n):\n        termes.append(2*termes[-1] - 1)\n    return termes\n\nSOMMAIRE DES FONCTIONS UTILES :\nlen(lst)    # longueur\nsum(lst)    # somme\nmin/max(lst) # min/max\nsorted(lst) # liste triée (nouvelle liste)" },
          ],
          exercices:[
            { id:'EX-PY1', niveau:'Facile', titre:'Liste et compréhension',
              enonce:"Créer la liste des 10 premiers multiples de 3 (3,6,…,30).",
              correction:"lst = [3*i for i in range(1, 11)]\n# ou : lst = list(range(3, 31, 3))" },
            { id:'EX-PY2', niveau:'Facile', titre:'Fonction somme',
              enonce:"Écrire une fonction somme(n) qui retourne 1+2+…+n.",
              correction:"def somme(n):\n    return n*(n+1)//2\n# ou : return sum(range(1, n+1))" },
          ]
        },
      ]
    },
    {
      id:'sc-py-algo', titre:'10.2 Algorithmes classiques : dichotomie et simulation',
      notions:['Algorithme de dichotomie : O(log n)','Simulation de probabilités : random','Traitement de données : moyenne, écart-type','Boucle while avec condition de sortie'],
      blocs:[
        {
          notion:'⚙️ Dichotomie et simulation',
          theoremes:[
            { id:'M-PY3', type:'methode', nom:'Dichotomie en Python',
              enonce:"BUT : trouver x tel que f(x)=0 sur [a,b]\n(f continue, f(a)·f(b)<0)\n\ndef dichotomie(f, a, b, eps=1e-6):\n    while b - a > eps:\n        m = (a + b) / 2\n        if f(a) * f(m) <= 0:\n            b = m\n        else:\n            a = m\n    return (a + b) / 2\n\nExemple : racine de x²−2 sur [1;2]\nf = lambda x: x**2 - 2\nprint(dichotomie(f, 1, 2))  # → 1.41421...\n\nRECHERCHE BINAIRE (tableau trié) :\ndef recherche(lst, val):\n    g, d = 0, len(lst)-1\n    while g <= d:\n        m = (g+d)//2\n        if lst[m]==val: return m\n        elif lst[m]<val: g=m+1\n        else: d=m-1\n    return -1" },
            { id:'M-PY4', type:'methode', nom:'Simulation et traitement de données',
              enonce:"SIMULATION :\nimport random\nrandom.random()      # flottant dans [0;1[\nrandom.randint(a,b)  # entier dans [a;b]\nrandom.choice(lst)   # élément aléatoire\n\nSimuler 1000 lancers d'un dé :\nresultats = [random.randint(1,6) for _ in range(1000)]\n\nMOYENNE ET VARIANCE :\ndef moyenne(lst):\n    return sum(lst)/len(lst)\n\ndef variance(lst):\n    m = moyenne(lst)\n    return sum((x-m)**2 for x in lst)/len(lst)\n\ndef ecart_type(lst):\n    return variance(lst)**0.5\n\nFRÉQUENCE :\nfreq = resultats.count(6) / len(resultats)" },
          ],
          exercices:[
            { id:'EX-PY3', niveau:'Intermédiaire', titre:'Algorithme de seuil',
              enonce:"u₀=1, uₙ₊₁=1,2·uₙ. Trouver le premier n tel que uₙ>100.",
              correction:"def seuil():\n    u, n = 1, 0\n    while u <= 100:\n        u *= 1.2\n        n += 1\n    return n, u\n# → n=26, u≈114.5" },
            { id:'EX-PY4', niveau:'Difficile', titre:'Simulation de probabilités',
              enonce:"Simuler 10000 lancers de 2 dés. Estimer P(somme=7).",
              correction:"import random\nn, total = 0, 10000\nfor _ in range(total):\n    s = random.randint(1,6)+random.randint(1,6)\n    if s==7: n+=1\nprint(n/total)  # ≈ 1/6 ≈ 0.167" },
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
export default function PremiereSlugPage() {
  const params = useParams()
  const slug = (params?.slug as string) || 'suites-numeriques'
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
          <Link href="/bac-france/premiere" style={{ color:'#4f6ef7' }}>
            ← Retour Première Spécialité
          </Link>
        </div>
      </main><Footer/></>
  )

  const idx = NAV_ORDER.indexOf(slug)
  const prevSlug = idx>0 ? NAV_ORDER[idx-1] : null
  const nextSlug = idx<NAV_ORDER.length-1 ? NAV_ORDER[idx+1] : null
  const secColor = SEC_COLORS[slug] || '#4f6ef7'

  const GROUPS = [
    { label:'Section 1 — Algèbre', slugs:NAV_ORDER.slice(0,2) },
    { label:'Section 2 — Analyse', slugs:NAV_ORDER.slice(2,5) },
    { label:'Section 3 — Géométrie', slugs:NAV_ORDER.slice(5,7) },
    { label:'Section 4 — Probabilités', slugs:NAV_ORDER.slice(7,9) },
    { label:'Section 5 — Algorithmique', slugs:NAV_ORDER.slice(9) },
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
          <Link href="/bac-france/premiere" style={{ color:'var(--muted)', textDecoration:'none' }}>
            Première Spécialité
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
                  <span style={{ fontSize:11, background:'rgba(79,110,247,0.15)',
                    color:'#818cf8', padding:'2px 9px', borderRadius:10 }}>
                    📗 Première · 4h/sem · Épreuve anticipée coef.2
                  </span>
                </div>
                <h1 style={{ fontSize:'clamp(22px,3vw,36px)', fontWeight:800, marginBottom:10 }}>
                  {chapter.titre}
                </h1>
                <p style={{ color:'var(--text2)', fontSize:14, lineHeight:1.7,
                  maxWidth:620, marginBottom:18 }}>{chapter.desc}</p>
                <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
                  <Link href={`/solve?q=${encodeURIComponent('Explique '+chapter.titre+' Première Spécialité Maths France')}`}
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
                  <Link href="/bac-france/terminale-generale"
                    style={{ display:'inline-flex', alignItems:'center', gap:7, padding:'8px 16px',
                      borderRadius:10, background:`${secColor}10`,
                      border:`1px solid ${secColor}30`, color:secColor,
                      fontSize:13, fontWeight:600, textDecoration:'none' }}>
                    🎓 Suite en Terminale
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
                                      <Link href={`/solve?q=${encodeURIComponent('Première Spécialité Maths France — '+ex.enonce)}`}
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
                  <Link href={`/bac-france/premiere/${prevSlug}`} style={{ textDecoration:'none' }}>
                    <div className="card" style={{ padding:'12px 15px', transition:'transform 0.15s' }}
                      onMouseEnter={e=>e.currentTarget.style.transform='translateY(-2px)'}
                      onMouseLeave={e=>e.currentTarget.style.transform='translateY(0)'}>
                      <div style={{ fontSize:10, color:'var(--muted)', marginBottom:2 }}>← Précédent</div>
                      <div style={{ fontWeight:700, fontSize:12 }}>{TITRES_NAV[prevSlug].replace(/CH \d+ — /,'')}</div>
                    </div>
                  </Link>
                ) : <div/>}
                {nextSlug ? (
                  <Link href={`/bac-france/premiere/${nextSlug}`} style={{ textDecoration:'none' }}>
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
                  📗 Première Spécialité · 10 chapitres
                </div>
                {GROUPS.map(g => (
                  <div key={g.label}>
                    <div style={{ padding:'7px 15px 3px', fontSize:10, color:'var(--muted)',
                      fontWeight:700, textTransform:'uppercase', letterSpacing:'0.1em',
                      background:'rgba(255,255,255,0.02)' }}>{g.label}</div>
                    {g.slugs.map(s => (
                      <Link key={s} href={`/bac-france/premiere/${s}`} style={{ textDecoration:'none' }}>
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
                  <Link href={`/solve?q=${encodeURIComponent('Explique '+chapter.titre+' Première Spécialité France')}`}
                    className="btn btn-primary" style={{ textAlign:'center', fontSize:12 }}>
                    🤖 Chat IA — {chapter.badge}
                  </Link>
                  <Link href="/examens-france" className="btn btn-secondary"
                    style={{ textAlign:'center', fontSize:12 }}>📋 Sujets Bac France</Link>
                  <Link href="/bac-france/terminale-generale" className="btn btn-secondary"
                    style={{ textAlign:'center', fontSize:12 }}>🎓 Continuer en Terminale</Link>
                  <Link href="/bac-france/premiere" className="btn btn-secondary"
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
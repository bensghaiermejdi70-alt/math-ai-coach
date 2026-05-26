'use client'
import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import { useParams } from 'next/navigation'

// ══════════════════════════════════════════════════════════════════════
// SCIENCES INFORMATIQUES — [SLUG] DÉTAIL COMPLET
// Route : /bac/informatique/[slug]
// Programme officiel CNP Tunisie — 4ème Sc. Info. · Coeff 3
// Source : tadris.tn — Programme mis à jour
// Structure : souschapitres + blocs (identique aux autres sections)
// ══════════════════════════════════════════════════════════════════════

const C = { thm:'#6366f1', def:'#4f6ef7', formule:'#f5c842', prop:'#06d6a0', methode:'#ec4899', corollaire:'#f97316' }
const L: Record<string,string> = { thm:'Théorème', def:'Définition', formule:'Formule clé', prop:'Propriété', methode:'Méthode', corollaire:'Corollaire' }

const NAV_ORDER = [
  'fonctions-generalites','limites-continuite','derivation','etude-fonctions',
  'logarithme','exponentielle','suites',
  'geometrie-espace',
  'denombrement','probabilites',
]
const TITRES_NAV: Record<string,string> = {
  'fonctions-generalites': 'CH 01 — Fonctions & Généralités',
  'limites-continuite':    'CH 02 — Limites & Continuité',
  'derivation':            'CH 03 — Dérivation',
  'etude-fonctions':       'CH 04 — Étude de Fonctions',
  'logarithme':            'CH 05 — Logarithme Népérien',
  'exponentielle':         'CH 06 — Fonction Exponentielle',
  'suites':                'CH 07 — Suites Numériques',
  'geometrie-espace':      "CH 08 — Géométrie dans l'Espace",
  'denombrement':          'CH 09 — Dénombrement',
  'probabilites':          'CH 10 — Probabilités',
}
const SEC_COLORS: Record<string,string> = {
  'fonctions-generalites':'#6366f1','limites-continuite':'#6366f1','derivation':'#6366f1',
  'etude-fonctions':'#6366f1','logarithme':'#6366f1','exponentielle':'#6366f1','suites':'#6366f1',
  'geometrie-espace':'#4f6ef7',
  'denombrement':'#f5c842','probabilites':'#f5c842',
}

type Thm  = { id:string; type:string; nom:string; enonce:string; remarque?:string }
type Exo  = { id:string; niveau:string; titre:string; enonce:string; correction:string }
type Bloc = { notion:string; theoremes:Thm[]; exercices:Exo[] }
type SC   = { id:string; titre:string; notions:string[]; blocs:Bloc[] }
type Chap = { id:string; titre:string; badge:string; color:string; emoji:string; desc:string; souschapitres:SC[] }

// ══════════════════════════════════════════════════════════════════════
// DONNÉES — 10 CHAPITRES COMPLETS
// ══════════════════════════════════════════════════════════════════════
const ALL_CHAPTERS: Record<string,Chap> = {

// ─────────────────────────────────────────────────────────────────────
// CH 01 — FONCTIONS & GÉNÉRALITÉS
// ─────────────────────────────────────────────────────────────────────
'fonctions-generalites': {
  id:'fonctions-generalites', emoji:'📊', badge:'Analyse', color:'#6366f1',
  titre:'Fonctions — Généralités',
  desc:"Ensemble de définition, parité, opérations sur fonctions (somme, produit, quotient, composée), fonction √f. Lien avec la programmation : domaines, restrictions, algorithmes.",
  souschapitres:[
    {
      id:'sc-domaine', titre:'1.1 Domaine de définition et parité',
      notions:['D_f : exclusions (1/g, √g, ln g)','Parité f(−x)=f(x) ou f(−x)=−f(x)','Opérations : D=D_f∩D_g','Composée (g∘f)(x)=g(f(x))'],
      blocs:[
        {
          notion:'📐 Domaine de définition',
          theoremes:[
            { id:'D-FG1', type:'def', nom:'Ensemble de définition D_f',
              enonce:"D_f = ensemble des réels x pour lesquels f(x) est définie.\n\nConditions d'exclusion :\n• 1/g(x) : g(x)≠0\n• √g(x) : g(x)≥0\n• ln(g(x)) : g(x)>0\n\nSi plusieurs contraintes : D_f = intersection.\n\nExemples :\nf(x)=√(x−1)/ln(x+1) → x≥1 et x+1>0 et x+1≠1\n→ x≥1 et x≠0 → D_f=[1;+∞[\n\nf(x)=1/√(4−x²) → 4−x²>0 → D_f=]−2;2[",
              remarque:"En informatique, D_f correspond au domaine de validité d'une fonction mathématique — essentiel pour la gestion des exceptions dans les programmes." },
            { id:'D-FG2', type:'def', nom:'Parité',
              enonce:"f PAIRE : D_f symétrique et f(−x)=f(x)\n→ Courbe symétrique par rapport à Oy\n→ Réduire l'étude à [0;+∞[\n\nf IMPAIRE : f(−x)=−f(x)\n→ Courbe symétrique par rapport à O\n\nMéthode : calculer f(−x) et simplifier.\n\nExemples :\nf(x)=x²+cos x : f(−x)=x²+cos x=f(x) → paire\nf(x)=x³+sin x : f(−x)=−x³−sin x=−f(x) → impaire\nf(x)=x²+x : ni paire ni impaire" },
          ],
          exercices:[
            { id:'EX-FG1', niveau:'Facile', titre:'Domaine',
              enonce:"D_f pour f(x)=√(x+2)/ln(x).",
              correction:"x+2≥0→x≥−2 ; x>0 ; x≠1.\nD_f=]0;1[∪]1;+∞[." },
            { id:'EX-FG2', niveau:'Facile', titre:'Parité',
              enonce:"f(x)=x³+sin x. Paire, impaire ou aucune ?",
              correction:"f(−x)=−x³−sin x=−f(x). Impaire." },
            { id:'EX-FG3', niveau:'Intermédiaire', titre:'Domaine complexe',
              enonce:"D_f pour f(x)=√(4−x²)+1/ln(x²−1).",
              correction:"4−x²≥0 → −2≤x≤2.\nx²−1>0 → x∈]−∞;−1[∪]1;+∞[ et x²≠2 (ln≠0) → x≠±√2.\nIntersection : x∈]−2;−1[∪]1;2[ avec x≠√2.\nD_f=]−2;−1[∪]1;√2[∪]√2;2[." },
          ]
        },
        {
          notion:'⚙️ Opérations et composée',
          theoremes:[
            { id:'D-FG3', type:'def', nom:'Opérations sur les fonctions',
              enonce:"f+g, fg, f/g (g≠0) : D=D_f∩D_g\n\nComposée (g∘f)(x)=g(f(x)) :\nD_{g∘f}={x∈D_f : f(x)∈D_g}\n\n√f(x) : D={x : f(x)≥0}\n|f(x)| : D=D_f\n\nATTENTION : g∘f ≠ f∘g en général\n\nLien informatique :\nComposée ↔ appel imbriqué de fonctions\ng(f(x)) en Python : g(f(x))\nPipelinе : x → f → g → résultat",
              remarque:"En programmation fonctionnelle, la composée est un outil fondamental (map, filter, reduce)." },
          ],
          exercices:[
            { id:'EX-FG4', niveau:'Intermédiaire', titre:'Composée',
              enonce:"f(x)=√x, g(x)=x²−1. Calculer (g∘f)(x) et (f∘g)(x) avec leurs domaines.",
              correction:"(g∘f)(x)=x−1, D=[0;+∞[\n(f∘g)(x)=√(x²−1), D=]−∞;−1]∪[1;+∞[" },
          ]
        },
      ]
    },
  ]
},

// ─────────────────────────────────────────────────────────────────────
// CH 02 — LIMITES ET CONTINUITÉ
// ─────────────────────────────────────────────────────────────────────
'limites-continuite': {
  id:'limites-continuite', emoji:'∞', badge:'Analyse', color:'#6366f1',
  titre:'Limites et Continuité',
  desc:"Limite finie/infinie en un point ou à l'infini, formes indéterminées, asymptotes, TVI, théorème de la bijection. Applications : analyse de complexité algorithmique.",
  souschapitres:[
    {
      id:'sc-lim', titre:'2.1 Calcul des limites',
      notions:['Limite en un point (finie, infinie)','Limite à ±∞','Formes indéterminées : 0/0, ∞/∞, ∞−∞','Limites fondamentales sin x/x→1, (eˣ−1)/x→1'],
      blocs:[
        {
          notion:'∞ Limites et formes indéterminées',
          theoremes:[
            { id:'D-LC1', type:'def', nom:'Limite — définition et opérations',
              enonce:"lim(x→a) f(x)=ℓ : f(x) s'approche de ℓ quand x→a\n\nOpérations (ℓ,m finis) :\nlim(f+g)=ℓ+m ; lim(fg)=ℓm ; lim(f/g)=ℓ/m (m≠0)\n\nFormes indéterminées à lever :\n0/0 → factoriser ou conjugué\n∞/∞ → terme dominant\n∞−∞ → factoriser ou conjugué\n\nLien info : lim de O(nᵏ)/O(nᵐ) → complexité relative\nSi lim=0 : premier algo plus lent ; si lim=∞ : plus rapide" },
            { id:'F-LC1', type:'formule', nom:'Limites fondamentales et croissances comparées',
              enonce:"lim(x→0) sin x/x = 1\nlim(x→0) (eˣ−1)/x = 1\nlim(x→0) ln(1+x)/x = 1\n\nCROISSANCES COMPARÉES (x→+∞) :\neˣ ≫ xⁿ ≫ ln x  (∀n>0)\n\nComplexité algorithmique :\nO(1) < O(log n) < O(n) < O(n log n) < O(n²) < O(2ⁿ)\n\nAnalogue : 1 ≪ ln x ≪ x ≪ x² ≪ eˣ",
              remarque:"Les croissances comparées correspondent directement à l'ordre de grandeur des complexités algorithmiques." },
          ],
          exercices:[
            { id:'EX-LC1', niveau:'Facile', titre:'Forme 0/0',
              enonce:"lim(x→2) (x²−4)/(x−2).",
              correction:"=(x+2)(x−2)/(x−2)=x+2 → 4." },
            { id:'EX-LC2', niveau:'Intermédiaire', titre:'Forme ∞/∞',
              enonce:"lim(x→+∞) (3x²+2x)/(x²−1).",
              correction:"Diviser par x² : (3+2/x)/(1−1/x²) → 3." },
            { id:'EX-LC3', niveau:'Difficile', titre:'Forme ∞−∞',
              enonce:"lim(x→+∞) [√(x²+4x)−x].",
              correction:"Conjugué : 4x/[√(x²+4x)+x]=4/[√(1+4/x)+1] → 4/2=2." },
          ]
        },
      ]
    },
    {
      id:'sc-asymp-cont', titre:'2.2 Asymptotes et continuité',
      notions:['AV x=a, AH y=ℓ, AO y=mx+p','TVI : f(a)·f(b)<0 → racine','Théorème de la bijection','Méthode de dichotomie (lien algo)'],
      blocs:[
        {
          notion:'📏 Asymptotes et TVI',
          theoremes:[
            { id:'D-LC2', type:'def', nom:'Asymptotes',
              enonce:"AV x=a : lim(x→a)|f(x)|=+∞\nAH y=ℓ : lim(x→±∞)f(x)=ℓ\nAO y=mx+p :\n  m=lim f(x)/x ; p=lim[f(x)−mx]" },
            { id:'T-LC1', type:'thm', nom:'TVI et méthode de dichotomie',
              enonce:"TVI : f continue sur [a,b], k entre f(a) et f(b) :\n∃c∈[a,b] : f(c)=k\n\nCas pratique : f(a)·f(b)<0 → ∃ racine dans ]a,b[\n\nMÉTHODE DE DICHOTOMIE (algorithme) :\n  Tant que b−a > ε :\n    m = (a+b)/2\n    Si f(a)·f(m) < 0 : b ← m\n    Sinon : a ← m\n  Retourner (a+b)/2\n\nComplexité : O(log₂((b−a)/ε)) itérations",
              remarque:"La dichotomie est un algorithme de recherche binaire — équivalent de la recherche binaire sur un tableau trié." },
          ],
          exercices:[
            { id:'EX-LC4', niveau:'Intermédiaire', titre:'TVI + dichotomie',
              enonce:"f(x)=x³−x−1. Montrer qu'il existe une racine dans [1;2] et l'encadrer à 0,25.",
              correction:"f(1)=−1<0 ; f(2)=5>0 → ∃c∈]1;2[.\nf(1,5)=3,375−1,5−1=0,875>0 → c∈]1;1,5[.\nf(1,25)=1,953−1,25−1=−0,297<0 → c∈]1,25;1,5[.\nEncadrement : c∈]1,25;1,5[ à 0,25 près." },
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
  id:'derivation', emoji:"f'", badge:'Analyse', color:'#6366f1',
  titre:'Dérivation',
  desc:"Nombre dérivé, dérivées usuelles et règles de calcul, tangente, signe de f'(x), tableau de variations, extrema. Lien : dérivation numérique et méthode de Newton.",
  souschapitres:[
    {
      id:'sc-der-calc', titre:'3.1 Calcul des dérivées',
      notions:['Nombre dérivé f\'(a) = taux d\'accroissement','Tangente y=f\'(a)(x−a)+f(a)','Dérivées usuelles','Règles : produit, quotient, composée'],
      blocs:[
        {
          notion:'📐 Dérivées usuelles et règles',
          theoremes:[
            { id:'D-DE1', type:'def', nom:'Nombre dérivé et tangente',
              enonce:"f'(a)=lim(h→0)[f(a+h)−f(a)]/h\n\nGéométrie : f'(a) = pente de la tangente en M(a,f(a))\nTangente : y=f'(a)(x−a)+f(a)\nApproximation affine : f(x)≈f(a)+f'(a)(x−a)\n\nDérivée numérique (informatique) :\nf'(a) ≈ [f(a+h)−f(a)]/h  pour h petit\nCode Python : def deriv(f,a,h=1e-7): return (f(a+h)-f(a))/h" },
            { id:'F-DE1', type:'formule', nom:'Dérivées usuelles',
              enonce:"(c)'=0 ; (xⁿ)'=nxⁿ⁻¹ ; (√x)'=1/(2√x) ; (1/x)'=−1/x²\n(eˣ)'=eˣ ; (ln x)'=1/x (x>0)\n(sin x)'=cos x ; (cos x)'=−sin x ; (tan x)'=1/cos²x" },
            { id:'F-DE2', type:'formule', nom:'Règles de dérivation',
              enonce:"(u+v)'=u'+v' ; (ku)'=ku'\n(uv)'=u'v+uv' ; (u/v)'=(u'v−uv')/v²\n(f∘g)'=(f'∘g)·g'\n\nFormules chaîne :\n(uⁿ)'=n·u'·uⁿ⁻¹ ; (√u)'=u'/(2√u)\n(eᵘ)'=u'·eᵘ ; (ln u)'=u'/u" },
          ],
          exercices:[
            { id:'EX-DE1', niveau:'Facile', titre:'Dérivée composée',
              enonce:"f(x)=e^(x²+1). Calculer f'(x).",
              correction:"u=x²+1, u'=2x. f'(x)=2x·e^(x²+1)." },
            { id:'EX-DE2', niveau:'Intermédiaire', titre:'Règle du quotient',
              enonce:"f(x)=(x²+1)/(2x−1). f'(x).",
              correction:"f'(x)=(2x(2x−1)−2(x²+1))/(2x−1)²=(2x²−2x−2)/(2x−1)²." },
          ]
        },
      ]
    },
    {
      id:'sc-variations-newton', titre:'3.2 Variations, extrema et méthode de Newton',
      notions:['f\'(x)>0 → croissante ; f\'(x)<0 → décroissante','Extremum local : f\'(a)=0 et changement de signe','Tableau de variations complet','Méthode de Newton : xₙ₊₁=xₙ−f(xₙ)/f\'(xₙ)'],
      blocs:[
        {
          notion:'📈 Variations et méthode de Newton',
          theoremes:[
            { id:'P-DE1', type:'prop', nom:'Monotonie et extrema',
              enonce:"f'(x)>0 sur ]a,b[ → f croissante\nf'(x)<0 sur ]a,b[ → f décroissante\n\nExtremum local en α : f'(α)=0 ET f' change de signe\n• +→− : maximum local\n• −→+ : minimum local" },
            { id:'M-DE1', type:'methode', nom:'Méthode de Newton (algorithme)',
              enonce:"But : trouver une racine de f(x)=0\n\nAlgorithme :\nx₀ donné (proche de la racine)\nxₙ₊₁ = xₙ − f(xₙ)/f'(xₙ)\n\nConvergence quadratique si f'(x₀)≠0\n\nCode Python :\ndef newton(f, df, x0, eps=1e-9):\n    x = x0\n    while abs(f(x)) > eps:\n        x = x - f(x)/df(x)\n    return x\n\nExemple : f(x)=x²−2, f'(x)=2x\nx₀=1 : x₁=1−(−1)/2=1,5\nx₂=1,5−(0,25)/(3)≈1,4167\n→ converge vers √2",
              remarque:"Newton est plus rapide que la dichotomie (convergence quadratique vs logarithmique) mais nécessite f'." },
          ],
          exercices:[
            { id:'EX-DE3', niveau:'Intermédiaire', titre:'Tableau de variations',
              enonce:"f(x)=x³−3x²−9x+5. Tableau complet.",
              correction:"f'(x)=3(x−3)(x+1). Zéros : x=−1, x=3.\nf(−1)=10 (max local) ; f(3)=−22 (min local)." },
            { id:'EX-DE4', niveau:'Difficile', titre:'Newton — 2 itérations',
              enonce:"f(x)=x³−2. Appliquer Newton depuis x₀=1.",
              correction:"f'(x)=3x².\nx₁=1−(−1)/3=1+1/3≈1,333.\nf(1,333)=2,370−2=0,370.\nx₂=1,333−0,370/(3×1,777)≈1,333−0,069=1,264.\n→ converge vers ∛2≈1,2599." },
          ]
        },
      ]
    },
  ]
},

// ─────────────────────────────────────────────────────────────────────
// CH 04 — ÉTUDE DE FONCTIONS
// ─────────────────────────────────────────────────────────────────────
'etude-fonctions': {
  id:'etude-fonctions', emoji:'🔍', badge:'Analyse', color:'#6366f1',
  titre:'Étude de Fonctions',
  desc:"Polynômes (deg 2, 3, bicarrées), rationnelles (3 types), irrationnelles, circulaires. Méthode d'étude complète.",
  souschapitres:[
    {
      id:'sc-methode', titre:'4.1 Méthode d\'étude complète',
      notions:['1. Domaine 2. Parité 3. Limites/asymptotes','4. Dérivée et signe 5. Tableau de variations','6. Extrema 7. Représentation graphique','Traçage algorithmique (matplotlib)'],
      blocs:[
        {
          notion:'📋 Plan d\'étude systématique',
          theoremes:[
            { id:'P-EF1', type:'prop', nom:'Étapes d\'une étude complète',
              enonce:"1. DOMAINE D_f\n2. PARITÉ : calculer f(−x)\n3. LIMITES aux bornes → asymptotes\n4. f'(x) : calculer, factoriser, signe\n5. TABLEAU de variations\n6. EXTREMA\n7. REPRÉSENTATION graphique\n\nEn informatique — tracé avec matplotlib :\nimport numpy as np, matplotlib.pyplot as plt\nx = np.linspace(a, b, 1000)\ny = f(x)  # f vectorisée\nplt.plot(x, y) ; plt.show()" },
          ],
          exercices:[
            { id:'EX-EF1', niveau:'Intermédiaire', titre:'Rationnelle type 1',
              enonce:"Étude complète de f(x)=(3x+1)/(x−2).",
              correction:"D=ℝ\\{2}. AV: x=2. AH: y=3.\nf'(x)=−7/(x−2)²<0 → décroissante sur chaque intervalle.\nCentre de symétrie I(2;3)." },
          ]
        },
      ]
    },
    {
      id:'sc-types', titre:'4.2 Polynômes, rationnelles, irrationnelles, circulaires',
      notions:['Deg 2 : sommet Sx=−b/2a','Bicarrée : poser X=x²','Rationnelle type 1 : centre de symétrie','Circulaires : période, Im=[−1;1]'],
      blocs:[
        {
          notion:'📊 Types de fonctions',
          theoremes:[
            { id:'D-EF1', type:'def', nom:'Polynômes et rationnelles',
              enonce:"DEG 2 : f(x)=ax²+bx+c\nSommet : x₀=−b/(2a) ; f(x₀) min ou max\n\nDEG 3 : ax³+bx²+cx+d\n1 ou 2 extrema locaux\n\nBICARRÉE : ax⁴+bx²+c → poser X=x², g(X)=aX²+bX+c (X≥0)\n\nRATIONNELLE TYPE 1 : (ax+b)/(cx+d)\nAV x=−d/c ; AH y=a/c\nCentre de symétrie I(−d/c ; a/c)\n\nRATIONNELLE TYPE 2 : (ax²+bx+c)/(dx+e)\nAV + AO (par division euclidienne)" },
            { id:'D-EF2', type:'def', nom:'Irrationnelles et circulaires',
              enonce:"IRRATIONNELLES :\n√(ax+b) : D=[−b/a;+∞[, f'=a/(2√(ax+b))\n√(ax²+bx+c) : D={x:disc≥0}, f'=(2ax+b)/(2√(...))\n\nCIRCULAIRES :\nsin(ax+b) : T=2π/a, Im=[−1;1]\ncos(ax+b) : T=2π/a, Im=[−1;1], paire\ntan x : T=π, Im=ℝ\n\nLien info : fonctions trigonométriques\n→ calcul des angles dans les algo géométriques\n→ math.sin(x), math.cos(x) en Python (x en radians)" },
          ],
          exercices:[
            { id:'EX-EF2', niveau:'Facile', titre:'Bicarrée',
              enonce:"f(x)=x⁴−5x²+4. Racines.",
              correction:"X=x² : X²−5X+4=(X−1)(X−4).\nx=±1 ou x=±2." },
            { id:'EX-EF3', niveau:'Intermédiaire', titre:'Irrationnelle',
              enonce:"f(x)=√(x²−4). Domaine, parité, variations.",
              correction:"x²≥4 → D=]−∞;−2]∪[2;+∞[. f paire.\nf'=x/√(x²−4) ; f'>0 sur ]2;+∞[, f'<0 sur ]−∞;−2[." },
          ]
        },
      ]
    },
  ]
},

// ─────────────────────────────────────────────────────────────────────
// CH 05 — LOGARITHME NÉPÉRIEN ★
// ─────────────────────────────────────────────────────────────────────
'logarithme': {
  id:'logarithme', emoji:'ln', badge:'Analyse', color:'#6366f1',
  titre:'Logarithme Népérien',
  desc:"Définition ln x pour x>0, propriétés algébriques, dérivée (ln u)'=u'/u, étude complète, fonctions du type ln(u(x)). Application : entropie, complexité logarithmique.",
  souschapitres:[
    {
      id:'sc-ln-prop', titre:'5.1 Propriétés et dérivée',
      notions:['ln x défini sur ]0;+∞[, ln 1=0, ln e=1','ln(ab)=ln a+ln b, ln(aⁿ)=n·ln a','(ln x)\'=1/x ; (ln u)\'=u\'/u','lien info : log₂(n) = complexité des algo O(log n)'],
      blocs:[
        {
          notion:'📐 Propriétés algébriques de ln',
          theoremes:[
            { id:'D-LN1', type:'def', nom:'Définition et propriétés',
              enonce:"ln est la primitive de 1/x sur ]0;+∞[ valant 0 en 1.\nln 1=0 ; ln e=1 ; e^(ln x)=x ; ln(eˣ)=x\n\nPROPRIÉTÉS ALGÉBRIQUES (a,b>0) :\nln(ab)=ln a+ln b\nln(a/b)=ln a−ln b\nln(aⁿ)=n·ln a\nln(1/a)=−ln a\n\nCHANGEMENT DE BASE :\nlog_a(x)=ln x/ln a\nlog₂(x)=ln x/ln 2\n\nLIEN INFORMATIQUE :\nComplexité O(log₂ n) → nb d'itérations dichotomie\nlog₂(1000)≈10 → 10 comparaisons pour chercher dans 1000 éléments\nEntropie de Shannon : H=−Σ pᵢ·log₂(pᵢ)",
              remarque:"En informatique, log₂(n) est omniprésent : arbres binaires, tri fusion, recherche binaire." },
            { id:'F-LN1', type:'formule', nom:'Dérivée de ln et composée',
              enonce:"(ln x)'=1/x  (x>0)\n(ln u)'=u'/u  (u>0)\n\nExemples :\n(ln(x²+1))'=2x/(x²+1)\n(ln(2x+3))'=2/(2x+3)\n(ln|x|)'=1/x  (x≠0)" },
          ],
          exercices:[
            { id:'EX-LN1', niveau:'Facile', titre:'Propriétés',
              enonce:"Simplifier ln(8)−ln(4)+ln(1/2).",
              correction:"=ln(8/4)+ln(1/2)=ln(2)+ln(1/2)=ln(1)=0." },
            { id:'EX-LN2', niveau:'Facile', titre:'Dérivée composée',
              enonce:"f(x)=ln(x²+2x+1). f'(x).",
              correction:"u=(x+1)², u'=2(x+1).\nf'=2(x+1)/(x+1)²=2/(x+1) (x≠−1)." },
            { id:'EX-LN3', niveau:'Intermédiaire', titre:'Complexité logarithmique',
              enonce:"Combien de comparaisons pour une recherche binaire dans un tableau de 1024 éléments ?",
              correction:"Nb max d'itérations = ⌊log₂(1024)⌋+1=10+1=11 comparaisons.\n(log₂(1024)=log₂(2¹⁰)=10)" },
          ]
        },
      ]
    },
    {
      id:'sc-ln-etude', titre:'5.2 Étude complète de ln et de ln(u(x))',
      notions:['ln croissante sur ]0;+∞[','lim(x→0⁺) ln x=−∞ ; lim(x→+∞) ln x=+∞','lim x·ln x=0 (x→0⁺)','Étude de f(x)=A·ln(u(x))+B'],
      blocs:[
        {
          notion:'📈 Étude de ln',
          theoremes:[
            { id:'T-LN1', type:'thm', nom:'Propriétés de la fonction ln',
              enonce:"(ln x)'=1/x>0 → ln STRICTEMENT CROISSANTE sur ]0;+∞[\n\nLIMITES :\nlim(x→0⁺) ln x=−∞  (AV x=0)\nlim(x→+∞) ln x=+∞\n\nCROISSANCES COMPARÉES :\nlim(x→+∞) (ln x)/xᵅ=0 (α>0)\nlim(x→0⁺) x·ln x=0\n\nCourbe : passe par (1;0) et (e;1)\nTangente en 1 d'équation y=x−1",
              remarque:"Courbe de ln symétrique à celle de exp par rapport à la droite y=x (fonctions réciproques)." },
            { id:'M-LN1', type:'methode', nom:'Étude de f(x)=A·ln(u(x))+B',
              enonce:"1. Domaine : u(x)>0\n2. f'(x)=A·u'(x)/u(x)\n   Signe de f'=signe de A·u'(x)\n3. Limites aux bornes\n4. Tableau\n\nExemple : f(x)=x·ln x sur ]0;+∞[\nf'(x)=ln x+1=0 → x=1/e\nMin en x=1/e : f(1/e)=−1/e" },
          ],
          exercices:[
            { id:'EX-LN4', niveau:'Intermédiaire', titre:'Étude de x−ln x',
              enonce:"f(x)=x−ln x sur ]0;+∞[. Variations, minimum.",
              correction:"f'(x)=1−1/x=(x−1)/x.\nf'=0 en x=1. Min : f(1)=1.\nlim(x→0⁺)f=+∞ ; lim(x→+∞)f=+∞." },
            { id:'EX-LN5', niveau:'Difficile', titre:'ln et résolution',
              enonce:"Résoudre ln(x²−1)=ln(3x−3)+ln(x+1)−ln(x+1).",
              correction:"Simplifier : ln(x²−1)=ln(3x−3).\nx²−1=3x−3 → x²−3x+2=0 → (x−1)(x−2)=0.\nVérification domaine : x²−1>0 et 3x−3>0 → x>1.\nSolution : x=2." },
          ]
        },
      ]
    },
  ]
},

// ─────────────────────────────────────────────────────────────────────
// CH 06 — FONCTION EXPONENTIELLE ★
// ─────────────────────────────────────────────────────────────────────
'exponentielle': {
  id:'exponentielle', emoji:'eˣ', badge:'Analyse', color:'#6366f1',
  titre:'Fonction Exponentielle',
  desc:"Définition eˣ (réciproque de ln), propriétés, dérivée (eᵘ)'=u'eᵘ, étude complète. Application : algorithmes exponentiels, chiffrement, complexité.",
  souschapitres:[
    {
      id:'sc-exp-prop', titre:'6.1 Propriétés et dérivée',
      notions:['eˣ réciproque de ln x','e^(a+b)=eᵃ·eᵇ ; eˣ>0 toujours','(eˣ)\'=eˣ ; (eᵘ)\'=u\'·eᵘ','Domaine ℝ ; image ]0;+∞['],
      blocs:[
        {
          notion:'📐 Propriétés de exp',
          theoremes:[
            { id:'D-EX1', type:'def', nom:'Fonction exponentielle — définition et propriétés',
              enonce:"eˣ est la réciproque de ln : e^(ln x)=x et ln(eˣ)=x\nDomaine ℝ, Image ]0;+∞[ ; eˣ>0 toujours\ne⁰=1 ; e¹=e≈2,718\n\nPROPRIÉTÉS ALGÉBRIQUES :\ne^(a+b)=eᵃ·eᵇ ; e^(a−b)=eᵃ/eᵇ\n(eᵃ)ⁿ=e^(na) ; e^(−a)=1/eᵃ\n\nLIEN INFORMATIQUE :\nComplexité O(2ⁿ) → exponentiel (problèmes NP)\nCryptographie RSA : e^(ln n)=n → lien ln/exp\nChiffrement de César (modélisation) : e^(iθ) en complexes\nRecherche exhaustive : 2ⁿ possibilités → impraticable pour n>50",
              remarque:"Un algo de complexité O(2ⁿ) double ses opérations à chaque unité → exponentiel = problème difficile en info." },
            { id:'F-EX1', type:'formule', nom:'Dérivée de exp et composée',
              enonce:"(eˣ)'=eˣ\n(eᵘ)'=u'·eᵘ\n\nExemples :\n(e^(3x))'=3e^(3x)\n(e^(x²+1))'=2xe^(x²+1)\n(e^(sin x))'=cos x·e^(sin x)" },
            { id:'T-EX1', type:'thm', nom:'Propriétés de exp',
              enonce:"exp STRICTEMENT CROISSANTE sur ℝ\nlim(x→−∞)eˣ=0 (AH y=0)\nlim(x→+∞)eˣ=+∞\n\nCROISSANCES COMPARÉES :\nlim(x→+∞) eˣ/xⁿ=+∞\nlim(x→+∞) xⁿ·e^(−x)=0" },
          ],
          exercices:[
            { id:'EX-EX1', niveau:'Facile', titre:'Dérivée composée',
              enonce:"f(x)=e^(2x²−1). f'(x).",
              correction:"f'(x)=4x·e^(2x²−1)." },
            { id:'EX-EX2', niveau:'Intermédiaire', titre:'Résolution',
              enonce:"Résoudre e^(2x)−3eˣ+2=0.",
              correction:"X=eˣ>0 : X²−3X+2=(X−1)(X−2)=0.\nX=1→x=0 ; X=2→x=ln2.\nS={0;ln2}." },
          ]
        },
      ]
    },
    {
      id:'sc-exp-etude', titre:'6.2 Étude de fonctions exponentielles',
      notions:['Signe de (eᵘ)\' = signe de u\'','AH y=0 en −∞ pour e^(ax), a<0','Étude de P(x)·e^(ax)','Croissance rapide : e≫polynôme'],
      blocs:[
        {
          notion:'📈 Études exponentielles',
          theoremes:[
            { id:'M-EX1', type:'methode', nom:'Étude de P(x)·eˣ',
              enonce:"f(x)=P(x)·eˣ (P polynôme) :\nf'(x)=[P'(x)+P(x)]·eˣ\nSigne de f'=signe de Q(x)=P'(x)+P(x)\n\nf(x)=P(x)·e^(−x) :\nf'(x)=[P'(x)−P(x)]·e^(−x)\n\nCas xe^(−x) : f'=(1−x)e^(−x)\nMax en x=1 : f(1)=1/e\nlim(x→+∞)f=0 (AH y=0)",
              remarque:"lim(x→+∞) xⁿ·e^(−x)=0 pour tout n → AH y=0 pour P(x)·e^(−x) en +∞." },
          ],
          exercices:[
            { id:'EX-EX3', niveau:'Intermédiaire', titre:'Étude de xe^(−x)',
              enonce:"f(x)=(x+2)e^(−x). Variations et extremum.",
              correction:"f'(x)=e^(−x)−(x+2)e^(−x)=(−x−1)e^(−x).\nf'=0 en x=−1. Max local : f(−1)=e.\nlim(x→+∞)f=0 ; lim(x→−∞)f=−∞." },
          ]
        },
      ]
    },
  ]
},

// ─────────────────────────────────────────────────────────────────────
// CH 07 — SUITES NUMÉRIQUES
// ─────────────────────────────────────────────────────────────────────
'suites': {
  id:'suites', emoji:'uₙ', badge:'Analyse', color:'#6366f1',
  titre:'Suites Numériques',
  desc:"Suites arithmétiques, géométriques, récurrentes, convergence, récurrence. Lien informatique : tableaux, boucles, algorithmes itératifs, suite de Fibonacci.",
  souschapitres:[
    {
      id:'sc-suites-class', titre:'7.1 Suites arithmétiques et géométriques',
      notions:['Arithmétique : uₙ=u₀+nr, somme','Géométrique : uₙ=u₀·qⁿ, somme','Comportement à l\'infini','Lien : boucles et accumulation'],
      blocs:[
        {
          notion:'💻 Suites et algorithmes',
          theoremes:[
            { id:'D-SU1', type:'def', nom:'Suites et lien informatique',
              enonce:"ARITHMÉTIQUE (raison r) : uₙ₊₁=uₙ+r\nuₙ=u₀+nr ; Somme=n(u₀+uₙ₋₁)/2\n\nLien info :\nfor i in range(n): total += r  # accumulation arith.\n\nGÉOMÉTRIQUE (raison q≠0) : uₙ₊₁=q·uₙ\nuₙ=u₀·qⁿ ; Somme=u₀(1−qⁿ)/(1−q)\n\nLien info :\nchaque itération multiplie par q → complexité O(qⁿ)\nratio = 1 ; for i in range(n): ratio *= q\n\nCOMPLEXITÉ :\nArith. → O(n) ; Géom. q>1 → O(qⁿ) (exponentiel)\n\nFIBONACCI :\nF₀=0, F₁=1, Fₙ=Fₙ₋₁+Fₙ₋₂\nNi arith. ni géom. ; croissance comme φⁿ (φ≈1,618)",
              remarque:"Fibonacci naïf (récursif) : O(2ⁿ). Fibonacci itératif : O(n). Mémoïsation : O(n) avec cache." },
          ],
          exercices:[
            { id:'EX-SU1', niveau:'Facile', titre:'Terme général',
              enonce:"u₀=2, raison géom. q=3. Calculer u₅ et S₆.",
              correction:"u₅=2×3⁵=486.\nS₆=2(1−3⁶)/(1−3)=2(1−729)/(−2)=728." },
            { id:'EX-SU2', niveau:'Intermédiaire', titre:'Fibonacci — algorithme',
              enonce:"Écrire un algorithme itératif calculant F₁₀ (10ème terme de Fibonacci).",
              correction:"a←0 ; b←1\nPour i de 1 à 9 :\n  c←a+b ; a←b ; b←c\nRetourner b  (F₁₀=55)" },
          ]
        },
      ]
    },
    {
      id:'sc-suites-rec', titre:'7.2 Suites récurrentes, convergence et récurrence',
      notions:['Suite affine uₙ₊₁=auₙ+b : uₙ=ℓ+(u₀−ℓ)aⁿ','Convergence si |a|<1','Théorème des gendarmes','Principe de récurrence ↔ preuve par induction'],
      blocs:[
        {
          notion:'🔄 Récurrentes et induction',
          theoremes:[
            { id:'M-SU1', type:'methode', nom:'Suite affine et convergence',
              enonce:"uₙ₊₁=auₙ+b (a≠1) :\n1. ℓ=b/(1−a) (point fixe)\n2. vₙ=uₙ−ℓ → vₙ₊₁=a·vₙ (géom.)\n3. uₙ=ℓ+(u₀−ℓ)·aⁿ\n|a|<1 → converge vers ℓ\n\nLIEN INFORMATIQUE :\nSuite affine ↔ boucle de mise à jour\nu = u0\nfor _ in range(n): u = a*u + b\n\nPoint fixe ↔ état stationnaire d'un système" },
            { id:'T-SU1', type:'thm', nom:'Principe de récurrence et induction',
              enonce:"Pour montrer P(n) pour tout n≥n₀ :\n1. Initialisation : P(n₀) vraie\n2. Hérédité : P(n)→P(n+1)\n→ P(n) vraie pour tout n≥n₀\n\nLIEN INFORMATIQUE :\nC'est la PREUVE PAR INDUCTION en informatique théorique\n→ Preuve de correction des algorithmes récursifs\n→ Preuve de terminaison (variante décroissante)\n\nExemple : prouver que sum(1..n)=n(n+1)/2\nCode Python : sum(range(1,n+1))\nPreuve par récurrence : cas n=1 OK, P(n)→P(n+1) ✓",
              remarque:"Récurrence en mathématiques = induction en informatique théorique. Même concept, vocabulaire différent." },
          ],
          exercices:[
            { id:'EX-SU3', niveau:'Facile', titre:'Suite affine',
              enonce:"uₙ₊₁=0,5uₙ+4, u₀=0. Exprimer uₙ et lim.",
              correction:"ℓ=4/(0,5)=8. vₙ=(0−8)·0,5ⁿ=−8·(0,5)ⁿ.\nuₙ=8−8·(0,5)ⁿ. lim=8." },
            { id:'EX-SU4', niveau:'Difficile', titre:'Récurrence — induction',
              enonce:"Prouver par récurrence : Σᵢ₌₁ⁿ (2i−1)=n² (somme des n premiers impairs).",
              correction:"n=1 : 1=1² ✓\nHérédité : Σⁿ⁺¹(2i−1)=n²+(2(n+1)−1)=n²+2n+1=(n+1)² ✓" },
          ]
        },
      ]
    },
  ]
},

// ─────────────────────────────────────────────────────────────────────
// CH 08 — GÉOMÉTRIE DANS L'ESPACE
// ─────────────────────────────────────────────────────────────────────
'geometrie-espace': {
  id:'geometrie-espace', emoji:'🧊', badge:'Géométrie', color:'#4f6ef7',
  titre:"Géométrie dans l'Espace",
  desc:"Vecteurs 3D, produit scalaire, droites et plans, positions relatives, distances. Application : infographie 3D, transformations géométriques en informatique.",
  souschapitres:[
    {
      id:'sc-vect3d', titre:'8.1 Vecteurs et produit scalaire',
      notions:['u⃗(a;b;c), |u⃗|=√(a²+b²+c²)','Produit scalaire u⃗·v⃗=aa\'+bb\'+cc\'','Orthogonalité et angle','Application : produit scalaire en 3D graphics'],
      blocs:[
        {
          notion:'🔷 Vecteurs et infographie',
          theoremes:[
            { id:'F-GE1', type:'formule', nom:'Produit scalaire et angle',
              enonce:"u⃗(a;b;c)·v⃗(a';b';c')=aa'+bb'+cc'\nu⃗·v⃗=|u⃗||v⃗|cosθ\nOrthogonalité : u⃗·v⃗=0\n\nNORMALISATION :\nû=u⃗/|u⃗|  (vecteur unitaire)\n\nLIEN INFOGRAPHIE :\nLighting (éclairage) : intensité=n⃗·l⃗\nn⃗ : normale à la surface, l⃗ : direction lumière\nSi n⃗·l⃗>0 : surface éclairée\nSi n⃗·l⃗=0 : surface tangente au rayon\n\nPRODUIT VECTORIEL u⃗∧v⃗ :\n=(b₁c₂−c₁b₂ ; c₁a₂−a₁c₂ ; a₁b₂−b₁a₂)\nPerp. aux deux vecteurs → normale à un plan",
              remarque:"OpenGL, WebGL, Unity utilisent les produits scalaire et vectoriel pour tous les calculs d'éclairage 3D." },
          ],
          exercices:[
            { id:'EX-GE1', niveau:'Facile', titre:'Produit scalaire',
              enonce:"u⃗(1;2;−1), v⃗(3;−1;2). Calculer u⃗·v⃗. Angle ?",
              correction:"u⃗·v⃗=3−2−2=−1.\n|u⃗|=√6 ; |v⃗|=√14.\ncosθ=−1/√84≈−0,109. θ≈96°." },
            { id:'EX-GE2', niveau:'Intermédiaire', titre:'Éclairage 3D',
              enonce:"Normale n⃗(0;1;0), lumière l⃗(1;1;0) normalisée. Intensité lumineuse ?",
              correction:"l⃗ normalisé : |l⃗|=√2 → l̂=(1/√2;1/√2;0).\nIntensité=n⃗·l̂=0+1/√2+0=1/√2≈0,707.\nSurface éclairée à 70,7% de la puissance max." },
          ]
        },
      ]
    },
    {
      id:'sc-plans-droites', titre:'8.2 Plans, droites et distances',
      notions:['Plan ax+by+cz+d=0','Droite M=A+t·u⃗','Positions relatives droite-plan','Distance point-plan : formule'],
      blocs:[
        {
          notion:'📐 Plans et droites',
          theoremes:[
            { id:'F-GE2', type:'formule', nom:'Équations et distances',
              enonce:"PLAN par A₀(x₀;y₀;z₀), normale n⃗(a;b;c) :\na(x−x₀)+b(y−y₀)+c(z−z₀)=0\n\nDROITE (A,u⃗) :\n{x=x₀+at ; y=y₀+bt ; z=z₀+ct}\n\nPositions droite-plan :\nu⃗·n⃗=0 et A∉plan → ∥\nu⃗·n⃗=0 et A∈plan → ⊂\nu⃗·n⃗≠0 → intersection\n\nDISTANCE M₀ au plan ax+by+cz+d=0 :\nd=|ax₀+by₀+cz₀+d|/√(a²+b²+c²)\n\nLIEN 3D GRAPHICS :\nDistance point-plan ↔ test collision\nRay casting : intersection droite-plan" },
          ],
          exercices:[
            { id:'EX-GE3', niveau:'Facile', titre:'Équation d\'un plan',
              enonce:"Plan par A(1;0;2) de normale n⃗(2;−1;3).",
              correction:"2(x−1)−y+3(z−2)=0 → 2x−y+3z−8=0." },
            { id:'EX-GE4', niveau:'Intermédiaire', titre:'Distance point-plan',
              enonce:"Distance de M(3;−1;2) au plan x+2y−2z+1=0.",
              correction:"d=|3−2−4+1|/√(1+4+4)=|−2|/3=2/3." },
          ]
        },
      ]
    },
  ]
},

// ─────────────────────────────────────────────────────────────────────
// CH 09 — DÉNOMBREMENT
// ─────────────────────────────────────────────────────────────────────
'denombrement': {
  id:'denombrement', emoji:'🔢', badge:'Probabilités', color:'#f5c842',
  titre:'Dénombrement',
  desc:"Arrangements Aₙᵖ, permutations n!, combinaisons Cₙᵖ, binôme de Newton. Application : complexité combinatoire, algorithmes de tri, codage.",
  souschapitres:[
    {
      id:'sc-arr', titre:'9.1 Arrangements et permutations',
      notions:['Principe multiplicatif','Arrangement Aₙᵖ=n!/(n−p)! (ordre compte)','Permutation n!','Complexité : n! arrangements → O(n!)'],
      blocs:[
        {
          notion:'🎯 Arrangements et complexité',
          theoremes:[
            { id:'D-DN1', type:'def', nom:'Arrangements et permutations',
              enonce:"PRINCIPE MULTIPLICATIF :\nk choix successifs (n₁,n₂,…,nₖ) indépendants :\nTotal = n₁×n₂×…×nₖ\n\nARRANGEMENT Aₙᵖ (ordre compte, sans répétition) :\nAₙᵖ=n!/(n−p)!=n(n−1)…(n−p+1)\n\nPERMUTATION : Aₙⁿ=n!\n\nLIEN INFORMATIQUE :\nNombre de tableaux triés possibles : n!\nAlgorithme bogosort (tri aléatoire) : O(n·n!) en moyenne\nProblème du voyageur de commerce (TSP) : (n−1)!/2 tours\nTri à bulles : O(n²) comparaisons (bien mieux que n!)",
              remarque:"10!=3 628 800 ; 20!≈2,4×10¹⁸. Les algorithmes en O(n!) sont inutilisables pour n>15." },
          ],
          exercices:[
            { id:'EX-DN1', niveau:'Facile', titre:'Arrangement',
              enonce:"Mots de 3 lettres distinctes parmi 26 de l'alphabet.",
              correction:"A₂₆³=26×25×24=15 600." },
            { id:'EX-DN2', niveau:'Intermédiaire', titre:'Complexité TSP',
              enonce:"Pour 10 villes, combien de tours distincts pour le TSP ?",
              correction:"(10−1)!/2=9!/2=362880/2=181440 tours." },
          ]
        },
      ]
    },
    {
      id:'sc-combin', titre:'9.2 Combinaisons et binôme de Newton',
      notions:['Cₙᵖ=n!/[p!(n−p)!] (ordre ne compte pas)','Cₙᵖ=Cₙⁿ⁻ᵖ, formule de Pascal','(a+b)ⁿ=Σ Cₙᵏ aᵏ bⁿ⁻ᵏ','Application : arbres de décision, coefficient binomial'],
      blocs:[
        {
          notion:'📊 Combinaisons et informatique',
          theoremes:[
            { id:'F-DN1', type:'formule', nom:'Combinaisons et binôme',
              enonce:"Cₙᵖ=n!/[p!(n−p)!]  (sélection sans ordre)\n\nPROPRIÉTÉS :\nCₙ⁰=Cₙⁿ=1 ; Cₙᵖ=Cₙⁿ⁻ᵖ\nPascal : Cₙᵖ=Cₙ₋₁ᵖ⁻¹+Cₙ₋₁ᵖ\n\nBINÔME DE NEWTON :\n(a+b)ⁿ=Σₖ₌₀ⁿ Cₙᵏ·aᵏ·bⁿ⁻ᵏ\nΣ Cₙᵏ=2ⁿ\n\nLIEN INFORMATIQUE :\nTriangle de Pascal ↔ programmation dynamique\ndef C(n,k): return C(n-1,k-1)+C(n-1,k)  (récurrence)\nOptimisé avec mémoïsation : O(n²) au lieu de O(2ⁿ)\n\nNombre de sous-ensembles de taille k d'un ensemble de n : Cₙᵏ\nNombre total de sous-ensembles : 2ⁿ → complexité O(2ⁿ)",
              remarque:"Pascal dynamique : remplir une table 2D en O(n²). Sans mémoïsation : O(2ⁿ) — même piège que Fibonacci." },
          ],
          exercices:[
            { id:'EX-DN3', niveau:'Facile', titre:'Calcul de C₁₀³',
              enonce:"Calculer C₁₀³.",
              correction:"C₁₀³=10!/(3!×7!)=10×9×8/(6)=120." },
            { id:'EX-DN4', niveau:'Intermédiaire', titre:'Sous-ensembles',
              enonce:"Combien de sous-ensembles de taille 3 peut-on former avec 8 bits ?",
              correction:"C₈³=8!/(3!×5!)=56 sous-ensembles." },
            { id:'EX-DN5', niveau:'Difficile', titre:'Binôme — terme en x³',
              enonce:"Dans (x+2)⁵, trouver le coefficient de x³.",
              correction:"Terme général : C₅ᵏ·xᵏ·2^(5−k).\nk=3 : C₅³·2²=10×4=40." },
          ]
        },
      ]
    },
  ]
},

// ─────────────────────────────────────────────────────────────────────
// CH 10 — PROBABILITÉS
// ─────────────────────────────────────────────────────────────────────
'probabilites': {
  id:'probabilites', emoji:'🎲', badge:'Probabilités', color:'#f5c842',
  titre:'Probabilités',
  desc:"Probabilité sur ensemble fini, équiprobabilité, P(A∪B), conditionnelle P(A|B), indépendance, probabilités totales, Bayes. Application : tests, détection d'erreurs, IA.",
  souschapitres:[
    {
      id:'sc-proba-base', titre:'10.1 Probabilités — Bases',
      notions:['Espace (Ω,P) : axiomes','P(A∪B)=P(A)+P(B)−P(A∩B)','Équiprobabilité : P(A)=|A|/|Ω|','Contraire : P(Ā)=1−P(A)'],
      blocs:[
        {
          notion:'🎯 Probabilités et informatique',
          theoremes:[
            { id:'D-PR1', type:'def', nom:'Espace probabilisé et applications info',
              enonce:"Ω = univers ; A⊂Ω évènement\nP(Ω)=1 ; P(∅)=0 ; 0≤P(A)≤1\nP(Ā)=1−P(A)\nP(A∪B)=P(A)+P(B)−P(A∩B)\nÉQUIPROBABILITÉ : P(A)=|A|/|Ω|\n\nAPPLICATIONS INFORMATIQUES :\n• Détection d'erreurs : P(bit erroné) dans les transmissions\n• Hashing : P(collision) dans une table de hachage\n• Quicksort aléatoire : complexité O(n log n) en moyenne\n• Algorithmes Monte Carlo : estimation par probabilités\n• IA et Machine Learning : probabilités conditionnelles partout",
              remarque:"Les algorithmes probabilistes (Las Vegas, Monte Carlo) utilisent intensivement P(succès) et P(erreur)." },
          ],
          exercices:[
            { id:'EX-PR1', niveau:'Facile', titre:'Collision de hachage',
              enonce:"Table de hachage de taille 100. 50 clés insérées. P(deux clés en même case) approximative ?",
              correction:"Heuristique : P(pas de collision) ≈ (1−1/100)^(50×49/2) ≈ e^(−50×49/200) ≈ e^(−12,25) ≈ 5×10⁻⁶.\nP(collision) ≈ 1−5×10⁻⁶ ≈ 1 (quasi-certaine pour 50 clés dans 100 cases)." },
            { id:'EX-PR2', niveau:'Intermédiaire', titre:'Équiprobabilité',
              enonce:"On génère un entier aléatoire entre 1 et 100. P(divisible par 3 ou par 5) ?",
              correction:"Div. par 3 : {3,6,…,99} : 33 éléments.\nDiv. par 5 : {5,10,…,100} : 20 éléments.\nDiv. par 15 : {15,30,…,90} : 6 éléments.\nP=33/100+20/100−6/100=47/100=0,47." },
          ]
        },
      ]
    },
    {
      id:'sc-proba-cond', titre:'10.2 Probabilités conditionnelles et Bayes',
      notions:['P(A|B)=P(A∩B)/P(B)','Indépendance : P(A∩B)=P(A)·P(B)','Probabilités totales','Bayes : filtres anti-spam, diagnostic IA'],
      blocs:[
        {
          notion:'🔗 Conditionnement, Bayes et IA',
          theoremes:[
            { id:'D-PR2', type:'def', nom:'Probabilité conditionnelle et indépendance',
              enonce:"P(A|B)=P(A∩B)/P(B)  (P(B)>0)\n\nIndépendance : P(A∩B)=P(A)·P(B)\n\nLIEN INFORMATIQUE :\nFiltre anti-spam (Naïve Bayes) :\nP(spam|mot)∝P(mot|spam)·P(spam)\n\nTests logiciels :\nP(bug détecté | test unitaire)\n\nRéseaux bayésiens : modèles graphiques\nP(A|B,C)=P(A,B,C)/P(B,C)\n\nJeu : P(gagner|position actuelle) ↔ évaluation d'état" },
            { id:'T-PR1', type:'thm', nom:'Probabilités totales et Bayes',
              enonce:"Partition {B₁,…,Bₙ} de Ω :\n\nPROBABILITÉS TOTALES :\nP(A)=Σ P(A|Bᵢ)·P(Bᵢ)\n\nFORMULE DE BAYES :\nP(Bⱼ|A)=P(A|Bⱼ)·P(Bⱼ)/P(A)\n\nAPPLICATION : FILTRE ANTI-SPAM\nM=«message spam», W=«contient le mot 'gratuit'»\nP(M|W)=P(W|M)·P(M)/P(W)\nSi P(M)=0,2, P(W|M)=0,8, P(W|M̄)=0,05 :\nP(W)=0,8×0,2+0,05×0,8=0,16+0,04=0,20\nP(M|W)=0,16/0,20=0,80 → 80% de chances que ce soit un spam",
              remarque:"Le classifieur Naïve Bayes est parmi les plus simples et plus efficaces en filtrage de spam et classification de textes." },
          ],
          exercices:[
            { id:'EX-PR3', niveau:'Intermédiaire', titre:'Détection d\'erreur',
              enonce:"Transmission : P(bit erroné)=0,01. Parité : détecte si nb erreurs impair. P(message 8 bits avec exactement 1 erreur) ?",
              correction:"P(1 erreur)=C₈¹×0,01¹×0,99⁷=8×0,01×0,9321≈0,0746.\nDétecté car 1 erreur = impair → parité détecte." },
            { id:'EX-PR4', niveau:'Difficile', titre:'Naïve Bayes simplifié',
              enonce:"Emails : 30% spam. P(mot 'urgent'|spam)=0,7. P('urgent'|légitime)=0,1. Email avec 'urgent'. P(spam) ?",
              correction:"P(spam)=0,3 ; P(lég.)=0,7.\nP('urgent')=0,7×0,3+0,1×0,7=0,21+0,07=0,28.\nP(spam|'urgent')=0,21/0,28=0,75.\nCet email a 75% de chance d'être un spam." },
          ]
        },
      ]
    },
  ]
},


'primitives-integrales': {
  id:'primitives-integrales', emoji:'∫', badge:'Analyse', color:'#6366f1',
  titre:'Primitives & Intégrales',
  desc:"Primitives usuelles, intégrale définie, théorème fondamental, aire sous une courbe.",
  souschapitres:[
    {
      id:'sc-prim', titre:'8.1 Primitives et intégrale définie',
      notions:['Primitives des fonctions usuelles','Linéarité','Intégrale ∫ab f(x)dx',"Théorème fondamental de l'analyse"],
      blocs:[
        {
          notion:'📐 Primitives et intégrale',
          theoremes:[
            { id:'F-PI1', type:'formule', nom:'Primitives usuelles',
              enonce:"x^n → x^(n+1)/(n+1)  (n≠1)\n1/x → ln|x|\ne^x → e^x\nsin x → -cos x\ncos x → sin x\n\nPrimitive de u'e^u : → e^u\nPrimitive de u'/u : → ln|u|" },
            { id:'T-PI2', type:'thm', nom:"Théorème fondamental",
              enonce:"Si F est une primitive de f sur [a,b] :\n∫ab f(x)dx = [F(x)]ab = F(b)-F(a)\n\nInterprétation géométrique :\nAire entre la courbe et Ox = ∫ab |f(x)| dx" },
          ],
          exercices:[
            { id:'EX-PI1', niveau:'Facile', titre:'Calcul intégral',
              enonce:"Calculer ∫02 (x²+1)dx.",
              correction:"[x³/3+x]02 = 8/3+2 = 14/3." },
          ],
        },
      ],
    },
  ],
},

'equations-differentielles': {
  id:'equations-differentielles', emoji:'∂', badge:'Analyse', color:'#6366f1',
  titre:'Équations Différentielles',
  desc:"y'=ay+b, solution générale, condition initiale, modélisation informatique.",
  souschapitres:[
    {
      id:'sc-ed', titre:"9.1 Équation y'=ay+b",
      notions:["y'=ay → y=Ce^(ax)","y'=ay+b → y=Ce^(ax)-b/a","Condition initiale","Modélisation"],
      blocs:[
        {
          notion:'📐 Résolution',
          theoremes:[
            { id:'T-ED1', type:'thm', nom:"Solution de y'=ay+b",
              enonce:"y' = ay + b  (a≠0) :\n\n1. Homogène y'=ay : yh=Ce^(ax)\n2. Particulière : yp=-b/a\n3. Générale : y = Ce^(ax) - b/a\n\nCondition initiale y(0)=y0 :\nC = y0 + b/a" },
          ],
          exercices:[
            { id:'EX-ED1', niveau:'Facile', titre:"Résolution y'=3y-6",
              enonce:"Résoudre y'=3y-6 avec y(0)=4.",
              correction:"Sol. gén. y=Ce^(3x)+2. y(0)=C+2=4 → C=2. y=2e^(3x)+2." },
          ],
        },
      ],
    },
  ],
},

'complexes': {
  id:'complexes', emoji:'🔢', badge:'Algèbre', color:'#a78bfa',
  titre:'Nombres Complexes',
  desc:"z=a+ib, module, argument, forme trigonométrique, Moivre, équations dans C.",
  souschapitres:[
    {
      id:'sc-cx', titre:'10.1 Formes algébrique et trigonométrique',
      notions:['z=a+ib, Re(z), Im(z)','Module |z|, conjugué z*','Forme trigonométrique','Formule de Moivre'],
      blocs:[
        {
          notion:'📐 Nombres complexes',
          theoremes:[
            { id:'D-CX1', type:'def', nom:'Nombre complexe',
              enonce:"z = a+ib  (a,b∈R, i²=-1)\nRe(z)=a, Im(z)=b, z*=a-ib\n|z|=√(a²+b²)\n\nForme trigonométrique : z=r(cosθ+isinθ)=re^(iθ)\nr=|z|, θ=arg(z)\n\nMoivre : (cosθ+isinθ)^n = cos(nθ)+isin(nθ)" },
          ],
          exercices:[
            { id:'EX-CX1', niveau:'Moyen', titre:'Équation dans C',
              enonce:"Résoudre z²+2z+5=0 dans C.",
              correction:"Δ=4-20=-16. z=(−2±4i)/2. z1=−1+2i, z2=−1−2i." },
          ],
        },
      ],
    },
  ],
},

'systemes-lineaires': {
  id:'systemes-lineaires', emoji:'🧮', badge:'Algèbre', color:'#a78bfa',
  titre:'Systèmes Linéaires',
  desc:"Systèmes de 2 et 3 équations, méthodes de résolution, pivot de Gauss, modélisation.",
  souschapitres:[
    {
      id:'sc-sys', titre:'11.1 Résolution de systèmes',
      notions:['Substitution et élimination','Méthode de Gauss (pivot)','Méthode matricielle','Modélisation informatique'],
      blocs:[
        {
          notion:'📐 Systèmes linéaires',
          theoremes:[
            { id:'T-SY1', type:'thm', nom:'Pivot de Gauss',
              enonce:"Algorithme du pivot de Gauss :\n1. Écrire la matrice augmentée [A|b]\n2. Opérations Ã©lémentaires sur les lignes :\n   L_i ← L_i + k·L_j (élimination)\n3. Forme échelonnée → substitution ascendante\n\nExemple :\n2x+y=5 et x-y=1 :\n[2,1|5] [1,-1|1] → x=2, y=1" },
          ],
          exercices:[
            { id:'EX-SY1', niveau:'Moyen', titre:'Système 2 équations',
              enonce:"Résoudre : 3x+2y=12 et x-y=1.",
              correction:"De L2: x=1+y. Substitution: 3(1+y)+2y=12 → 5y=9 → y=9/5, x=14/5." },
          ],
        },
      ],
    },
  ],
},

'arithmetique': {
  id:'arithmetique', emoji:'🔢', badge:'Algèbre', color:'#a78bfa',
  titre:'Arithmétique dans ℤ',
  desc:"Divisibilité, PGCD, PPCM, nombres premiers, congruences, applications cryptographiques.",
  souschapitres:[
    {
      id:'sc-div', titre:'12.1 Divisibilité et PGCD',
      notions:['Division euclidienne','PGCD — algorithme d\'Euclide','PPCM','Nombres premiers et décomposition'],
      blocs:[
        {
          notion:'📐 Arithmétique dans Z',
          theoremes:[
            { id:'D-AR1', type:'def', nom:'Divisibilité et PGCD',
              enonce:"a divise b (a|b) si ∃k∈Z : b=ka\n\nDivision euclidienne : a=bq+r, 0≤r<b\n\nAlgorithme d'Euclide :\nPGCD(a,b) = PGCD(b, a mod b) jusqu'à r=0\n\nExemple : PGCD(252,180)\n252=1×180+72 → PGCD(180,72)\n180=2×72+36 → PGCD(72,36)\n72=2×36+0 → PGCD=36" },
            { id:'D-AR2', type:'def', nom:'Congruences modulo n',
              enonce:"a ≡ b (mod n) si n|(a-b)\n\nPropriétés :\na+c ≡ b+d (mod n)\na·c ≡ b·d (mod n)\na^k ≡ b^k (mod n)\n\nApplication RSA :\nChiffrement : c = m^e mod n\nDéchiffrement : m = c^d mod n",
              remarque:"Les congruences sont fondamentales en cryptographie et sécurité informatique." },
          ],
          exercices:[
            { id:'EX-AR1', niveau:'Moyen', titre:'PGCD et congruences',
              enonce:"Calculer PGCD(48,18). Vérifier que 17 ≡ 3 (mod 7).",
              correction:"PGCD : 48=2×18+12 ; 18=1×12+6 ; 12=2×6+0. PGCD=6.\n17-3=14=2×7 → 17≡3 (mod 7). ✓" },
          ],
        },
      ],
    },
  ],
},

'variables-aleatoires': {
  id:'variables-aleatoires', emoji:'🎲', badge:'Probabilités', color:'#f5c842',
  titre:'Variables Aléatoires & Loi Binomiale',
  desc:"Variable aléatoire discrète, espérance, variance, loi binomiale B(n,p).",
  souschapitres:[
    {
      id:'sc-va', titre:'16.1 Variables aléatoires discrètes',
      notions:['Loi de probabilité P(X=xi)','Espérance E(X)','Variance V(X)','Loi binomiale B(n,p)'],
      blocs:[
        {
          notion:'📐 Variable aléatoire et loi binomiale',
          theoremes:[
            { id:'D-VA1', type:'def', nom:'Variable aléatoire discrète',
              enonce:"X prenant valeurs x1,...,xn avec P(X=xi)=pi (Σpi=1)\n\nEspérance : E(X) = Σ xi·pi\nVariance : V(X) = E(X²)-[E(X)]²\nÉcart-type : σ = √V(X)" },
            { id:'F-VA2', type:'formule', nom:'Loi binomiale B(n,p)',
              enonce:"X ~ B(n,p) : n épreuves de Bernoulli\nP(X=k) = Cn^k·p^k·(1-p)^(n-k)\nE(X)=np, V(X)=np(1-p)\n\nApplications : algorithmes probabilistes, tests de performance.",
              remarque:"Loi binomiale utilisée pour modéliser les résultats binaires répétés (succès/échec)." },
          ],
          exercices:[
            { id:'EX-VA1', niveau:'Moyen', titre:'Loi binomiale — test réseau',
              enonce:"Prob. erreur de transmission = 0,1. Paquet de 8 bits. X = nombre d'erreurs. Calculer P(X=0) et E(X).",
              correction:"X~B(8;0,1). P(X=0)=(0,9)^8≈0,430. E(X)=8×0,1=0,8." },
          ],
        },
      ],
    },
  ],
},

'statistiques': {
  id:'statistiques', emoji:'📊', badge:'Probabilités', color:'#f5c842',
  titre:'Statistiques',
  desc:"Paramètres statistiques, histogrammes, diagrammes, courbes statistiques.",
  souschapitres:[
    {
      id:'sc-stat', titre:'17.1 Paramètres statistiques',
      notions:['Moyenne x-barre','Variance s² et écart-type s','Séries simples et groupées','Représentations graphiques'],
      blocs:[
        {
          notion:'📐 Statistiques descriptives',
          theoremes:[
            { id:'F-ST1', type:'formule', nom:'Paramètres statistiques',
              enonce:"Série x1,...,xn (poids n1,...,nk, N=Σni) :\n\nMoyenne : x̄ = (Σ ni·xi)/N\nVariance : s² = (Σ ni·xi²)/N - x̄²\nÉcart-type : s = √s²\n\nSéries regroupées en classes [ak,ak+1[ :\nCentre ck = (ak+ak+1)/2\nMêmes formules avec les centres." },
          ],
          exercices:[
            { id:'EX-ST1', niveau:'Facile', titre:'Paramètres statistiques',
              enonce:"Temps de réponse (ms) : 10, 12, 8, 15, 10. Calculer moyenne et écart-type.",
              correction:"x̄=(10+12+8+15+10)/5=55/5=11. s²=(100+144+64+225+100)/5-121=126,6-121=5,6. s=√5,6≈2,37 ms." },
          ],
        },
      ],
    },
  ],
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
export default function InformatiqueSlugPage() {
  const params = useParams()
  const slug = (params?.slug as string) || 'fonctions-generalites'
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
          <Link href="/bac/informatique" style={{ color:'#6366f1' }}>
            ← Retour Sciences Informatiques
          </Link>
        </div>
      </main><Footer/></>
  )

  const idx = NAV_ORDER.indexOf(slug)
  const prevSlug = idx>0 ? NAV_ORDER[idx-1] : null
  const nextSlug = idx<NAV_ORDER.length-1 ? NAV_ORDER[idx+1] : null
  const secColor = SEC_COLORS[slug] || '#6366f1'

  const GROUPS = [
    { label:'Partie 1 — Analyse (7 ch.)', slugs:NAV_ORDER.slice(0,7) },
    { label:"Partie 2 — Géométrie (1 ch.)", slugs:NAV_ORDER.slice(7,8) },
    { label:'Partie 3 — Probabilités (2 ch.)', slugs:NAV_ORDER.slice(8) },
  ]

  return (
    <><Navbar/>
      <main style={{ position:'relative', zIndex:1, paddingTop:80 }}>

        {/* BREADCRUMB */}
        <div style={{ borderBottom:'1px solid var(--border)',
          padding:'12px clamp(20px,5vw,60px)',
          display:'flex', gap:8, fontSize:13, color:'var(--muted)',
          alignItems:'center', flexWrap:'wrap' }}>
          <Link href="/bac" style={{ color:'var(--muted)', textDecoration:'none' }}>Bac</Link><span>›</span>
          <Link href="/bac/informatique" style={{ color:'var(--muted)', textDecoration:'none' }}>
            Sciences Informatiques
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
                  <span style={{ fontSize:11, background:'rgba(99,102,241,0.1)',
                    color:'#6366f1', padding:'2px 9px', borderRadius:10 }}>Bac Tunisie · Coeff 3</span>
                  <span style={{ fontSize:10, background:'linear-gradient(135deg,#6366f1,#a78bfa)',
                    color:'white', padding:'2px 9px', borderRadius:10, fontWeight:800 }}>
                    💻 PROGRAMME CNP
                  </span>
                </div>
                <h1 style={{ fontSize:'clamp(22px,3vw,36px)', fontWeight:800, marginBottom:10 }}>
                  {chapter.titre}
                </h1>
                <p style={{ color:'var(--text2)', fontSize:14, lineHeight:1.7,
                  maxWidth:620, marginBottom:18 }}>{chapter.desc}</p>
                <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
                  <Link href={`/solve?q=${encodeURIComponent('Explique '+chapter.titre+' Sciences Informatiques Bac Tunisie')}`}
                    style={{ display:'inline-flex', alignItems:'center', gap:7, padding:'8px 16px',
                      borderRadius:10, background:`linear-gradient(135deg,#6366f1,#a78bfa)`,
                      color:'white', fontSize:13, fontWeight:700, textDecoration:'none' }}>
                    🤖 Chat IA — ce chapitre
                  </Link>
                  <Link href="/examens"
                    style={{ display:'inline-flex', alignItems:'center', gap:7, padding:'8px 16px',
                      borderRadius:10, background:'rgba(255,255,255,0.06)',
                      border:'1px solid rgba(255,255,255,0.12)', color:'var(--text2)',
                      fontSize:13, fontWeight:600, textDecoration:'none' }}>
                    📋 Exercices Bac
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
              {chapter.souschapitres.map((sc, scIdx) => (
                <div key={sc.id} style={{ marginBottom:24,
                  background:`${secColor}05`, border:`1px solid ${secColor}20`,
                  borderRadius:18, overflow:'hidden' }}>

                  {/* Accordéon */}
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

                  {/* Blocs */}
                  {(openSc===sc.id || scIdx===0) && (
                    <div style={{ padding:'18px 22px', display:'flex', flexDirection:'column', gap:24 }}>
                      {sc.blocs.map(bloc => (
                        <div key={bloc.notion}>
                          <div style={{ fontSize:14, fontWeight:800, color:secColor,
                            marginBottom:14 }}>{bloc.notion}</div>

                          {/* Théorèmes */}
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
                                      <Link href={`/solve?q=${encodeURIComponent('Sc.Info. Tunisie — '+ex.enonce)}`}
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
                  <Link href={`/bac/informatique/${prevSlug}`} style={{ textDecoration:'none' }}>
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
                  <Link href={`/bac/informatique/${nextSlug}`} style={{ textDecoration:'none' }}>
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
                  💻 Sc. Info. · 10 chapitres
                </div>
                {GROUPS.map(g => (
                  <div key={g.label}>
                    <div style={{ padding:'7px 15px 3px', fontSize:10, color:'var(--muted)',
                      fontWeight:700, textTransform:'uppercase', letterSpacing:'0.1em',
                      background:'rgba(255,255,255,0.02)' }}>{g.label}</div>
                    {g.slugs.map(s => (
                      <Link key={s} href={`/bac/informatique/${s}`} style={{ textDecoration:'none' }}>
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
                  textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:9 }}>Actions</div>
                <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
                  <Link href={`/solve?q=${encodeURIComponent('Explique '+chapter.titre+' Sc.Info Bac Tunisie')}`}
                    className="btn btn-primary" style={{ textAlign:'center', fontSize:12 }}>
                    🤖 Chat IA — {chapter.badge}
                  </Link>
                  <Link href="/examens" className="btn btn-secondary"
                    style={{ textAlign:'center', fontSize:12 }}>📋 Exercice type Bac</Link>
                  <Link href="/simulation" className="btn btn-secondary"
                    style={{ textAlign:'center', fontSize:12 }}>🎯 Simulation Bac</Link>
                  <Link href="/bac/informatique" className="btn btn-secondary"
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
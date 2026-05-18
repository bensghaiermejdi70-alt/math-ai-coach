'use client'
import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import { useParams } from 'next/navigation'

// ══════════════════════════════════════════════════════════════════════
// SCIENCES TECHNIQUES — [SLUG] DÉTAIL COMPLET
// Route : /bac/sciences-tech/[slug]
// Programme officiel CNP Tunisie — 4ème Sc. Tech. · Coeff 3
// Spécificités ST : Logarithme · Exponentielle · Coniques · Statistiques 2 variables
// Structure : souschapitres + blocs (identique à slug maths & sc-exp)
// ══════════════════════════════════════════════════════════════════════

const C = { thm:'#f59e0b', def:'#4f6ef7', formule:'#f5c842', prop:'#06d6a0', methode:'#ec4899', corollaire:'#f97316' }
const L: Record<string,string> = { thm:'Théorème', def:'Définition', formule:'Formule clé', prop:'Propriété', methode:'Méthode', corollaire:'Corollaire' }

const NAV_ORDER = [
  'fonctions-generalites','limites-continuite','derivation','etude-fonctions',
  'logarithme','exponentielle','suites',
  'geometrie-plane','geometrie-espace',
  'statistiques',
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
  'geometrie-plane':       'CH 08 — Géométrie Plane ★',
  'geometrie-espace':      "CH 09 — Géométrie dans l'Espace",
  'statistiques':          'CH 10 — Statistiques 2 variables',
  'denombrement':          'CH 11 — Dénombrement',
  'probabilites':          'CH 12 — Probabilités',
}
const SEC_COLORS: Record<string,string> = {
  'fonctions-generalites':'#f59e0b','limites-continuite':'#f59e0b','derivation':'#f59e0b',
  'etude-fonctions':'#f59e0b','logarithme':'#f59e0b','exponentielle':'#f59e0b','suites':'#f59e0b',
  'geometrie-plane':'#4f6ef7','geometrie-espace':'#4f6ef7',
  'statistiques':'#f97316',
  'denombrement':'#f5c842','probabilites':'#f5c842',
}

type Thm  = { id:string; type:string; nom:string; enonce:string; remarque?:string }
type Exo  = { id:string; niveau:string; titre:string; enonce:string; correction:string }
type Bloc = { notion:string; theoremes:Thm[]; exercices:Exo[] }
type SC   = { id:string; titre:string; notions:string[]; blocs:Bloc[] }
type Chap = { id:string; titre:string; badge:string; color:string; emoji:string; desc:string; souschapitres:SC[] }

// ══════════════════════════════════════════════════════════════════════
// DONNÉES — 12 CHAPITRES
// ══════════════════════════════════════════════════════════════════════
const ALL_CHAPTERS: Record<string,Chap> = {

// ─────────────────────────────────────────────────────────────────────
// CH 01 — FONCTIONS & GÉNÉRALITÉS
// ─────────────────────────────────────────────────────────────────────
'fonctions-generalites': {
  id:'fonctions-generalites', emoji:'📊', badge:'Analyse', color:'#f59e0b',
  titre:'Fonctions — Généralités',
  desc:"Ensemble de définition, parité, périodicité, opérations sur fonctions, √f, |f|, fonctions affines par intervalles.",
  souschapitres:[
    {
      id:'sc-domaine', titre:'1.1 Domaine de définition et parité',
      notions:['D_f : exclusions (1/g, √g, ln g)','Parité f(−x)=f(x) ou f(−x)=−f(x)','Périodicité f(x+T)=f(x)','Restriction d\'une fonction'],
      blocs:[
        {
          notion:'📐 Domaine et parité',
          theoremes:[
            { id:'D-FG1', type:'def', nom:'Ensemble de définition',
              enonce:"D_f = ensemble des x pour lesquels f(x) est définie.\n\nConditions d'exclusion :\n• 1/g(x) : g(x)≠0\n• √g(x) : g(x)≥0\n• ln(g(x)) : g(x)>0\n• g(x)/h(x) : h(x)≠0\n\nSi plusieurs contraintes : D_f = intersection.\n\nExemples :\nf(x)=1/√(x−1) → D_f=]1;+∞[\nf(x)=ln(x²−4) → D_f=]−∞;−2[∪]2;+∞[" },
            { id:'D-FG2', type:'def', nom:'Parité et périodicité',
              enonce:"PARITÉ :\nf paire : D_f symétrique et f(−x)=f(x)\n→ Courbe symétrique par rapport à Oy\n\nf impaire : f(−x)=−f(x)\n→ Courbe symétrique par rapport à O\n\nPÉRIODICITÉ :\nf est T-périodique si f(x+T)=f(x) pour tout x\nExemples : sin, cos (T=2π) ; tan, |sin| (T=π)",
              remarque:"Méthode parité : calculer f(−x) et simplifier. Si f(−x)=f(x) → paire ; si =−f(x) → impaire." },
          ],
          exercices:[
            { id:'EX-FG1', niveau:'Facile', titre:'Domaine',
              enonce:"D_f pour f(x)=√(x+2)/ln(x).",
              correction:"x+2≥0→x≥−2 ; x>0 ; x≠1.\nD_f=]0;1[∪]1;+∞[." },
            { id:'EX-FG2', niveau:'Facile', titre:'Parité',
              enonce:"f(x)=x³+sin x. Paire, impaire ou aucune ?",
              correction:"f(−x)=−x³+sin(−x)=−x³−sin x=−f(x).\nf est impaire." },
            { id:'EX-FG3', niveau:'Intermédiaire', titre:'Domaine complexe',
              enonce:"D_f pour f(x)=ln(x²−1)/√(3−x).",
              correction:"x²−1>0 → x∈]−∞;−1[∪]1;+∞[\n3−x>0 → x<3.\nIntersection : D_f=]−∞;−1[∪]1;3[." },
          ]
        },
        {
          notion:'⚙️ Opérations et valeur absolue',
          theoremes:[
            { id:'D-FG3', type:'def', nom:'Opérations sur les fonctions',
              enonce:"f+g, fg, f/g (avec g≠0) : D=D_f∩D_g\nComposée (g∘f)(x)=g(f(x)) :\n  D_{g∘f}={x∈D_f : f(x)∈D_g}\n\n√f(x) : D={x : f(x)≥0}\n|f(x)| : défini sur tout D_f\n\nFonction affine par intervalles :\nf(x)=aₖx+bₖ sur [xₖ;xₖ₊₁] → tracer morceau par morceau" },
          ],
          exercices:[
            { id:'EX-FG4', niveau:'Intermédiaire', titre:'Composée',
              enonce:"f(x)=√x, g(x)=x²−1. Calculer g∘f et f∘g avec leurs domaines.",
              correction:"g∘f(x)=x−1, D=[0;+∞[\nf∘g(x)=√(x²−1), D=]−∞;−1]∪[1;+∞[" },
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
  id:'limites-continuite', emoji:'∞', badge:'Analyse', color:'#f59e0b',
  titre:'Limites et Continuité',
  desc:"Limite finie/infinie en un point ou à l'infini, formes indéterminées, asymptotes (AV, AH, AO), TVI, théorème de la bijection, croissances comparées.",
  souschapitres:[
    {
      id:'sc-lim', titre:'2.1 Calcul des limites',
      notions:['Limite en un point a (finie, infinie)','Limite à l\'infini','Formes indéterminées : 0/0, ∞/∞, ∞−∞','Limites fondamentales : sin x/x → 1, (eˣ−1)/x → 1'],
      blocs:[
        {
          notion:'∞ Opérations et formes indéterminées',
          theoremes:[
            { id:'D-LC1', type:'def', nom:'Limite d\'une fonction — opérations',
              enonce:"lim(x→a) f(x)=ℓ : f(x) arbitrairement proche de ℓ pour x→a\n\nOpérations (ℓ,m finis) :\nlim(f+g)=ℓ+m ; lim(fg)=ℓm ; lim(f/g)=ℓ/m (m≠0)\n\nFormes indéterminées à lever :\n0/0 → factoriser ou conjugué\n∞/∞ → diviser par terme dominant\n∞−∞ → factoriser ou conjugué\n0×∞ → réécrire f/(1/g)" },
            { id:'F-LC1', type:'formule', nom:'Limites fondamentales et croissances comparées',
              enonce:"lim(x→0) sin x/x = 1\nlim(x→0) (eˣ−1)/x = 1\nlim(x→0) ln(1+x)/x = 1\n\nCROISSANCES COMPARÉES (x→+∞) :\neˣ ≫ xⁿ ≫ ln x  (∀n>0)\nlim eˣ/xⁿ=+∞ ; lim xⁿ/eˣ=0\nlim(ln x)/xᵅ=0 (α>0)\nlim(x→0⁺) x·ln x=0",
              remarque:"Terme dominant pour polynômes et fractions rationnelles en ±∞." },
          ],
          exercices:[
            { id:'EX-LC1', niveau:'Facile', titre:'Forme 0/0',
              enonce:"lim(x→2) (x²−4)/(x−2).",
              correction:"=(x+2)(x−2)/(x−2)=x+2 → 4." },
            { id:'EX-LC2', niveau:'Intermédiaire', titre:'Forme ∞−∞',
              enonce:"lim(x→+∞) [√(x²+3x)−x].",
              correction:"Conjugué : 3x/[√(x²+3x)+x]=3/[√(1+3/x)+1] → 3/2." },
          ]
        },
      ]
    },
    {
      id:'sc-asy-cont', titre:'2.2 Asymptotes et continuité',
      notions:['AV : lim|f(x)|=+∞ en x=a','AH : lim f(x)=ℓ en ±∞','AO : y=mx+p','TVI : f(a)·f(b)<0 → racine','Théorème de la bijection'],
      blocs:[
        {
          notion:'📏 Asymptotes et TVI',
          theoremes:[
            { id:'D-LC2', type:'def', nom:'Asymptotes',
              enonce:"AV x=a : lim(x→a)|f(x)|=+∞\nAH y=ℓ : lim(x→±∞)f(x)=ℓ\nAO y=mx+p :\n  m=lim f(x)/x ; p=lim[f(x)−mx]\n\nPosition de C_f : signe de f(x)−(mx+p)" },
            { id:'T-LC1', type:'thm', nom:'TVI et théorème de la bijection',
              enonce:"TVI : f continue sur [a,b], k entre f(a) et f(b) :\n∃c∈[a,b] : f(c)=k\nSi f(a)·f(b)<0 → ∃ racine dans ]a,b[\n\nBijection : f continue et strictement monotone sur [a,b] :\n→ bijection de [a,b] vers [f(a),f(b)]\n→ ∀k dans l'image, ∃!c : f(c)=k\n\nDichotomie : encadrer la racine par halvings successifs.",
              remarque:"Prolongement par continuité : si lim(x→a)f=ℓ et f non définie en a, on peut poser f(a)=ℓ." },
          ],
          exercices:[
            { id:'EX-LC3', niveau:'Intermédiaire', titre:'Asymptote oblique',
              enonce:"f(x)=(x²+2x+3)/(x+1). AO.",
              correction:"Division : x+1+2/(x+1). AO : y=x+1.\nf(x)−(x+1)=2/(x+1) : >0 si x>−1." },
            { id:'EX-LC4', niveau:'Difficile', titre:'TVI',
              enonce:"Montrer que x³−2x−1=0 a une racine dans ]1;2[.",
              correction:"f(1)=−2<0 ; f(2)=3>0 → ∃c∈]1;2[ (TVI).\nf'=3x²−2>0 sur ]1;2[ → f croissante → c unique." },
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
  id:'derivation', emoji:"f'", badge:'Analyse', color:'#f59e0b',
  titre:'Dérivation',
  desc:"Nombre dérivé, tangente, approximation affine, dérivées usuelles et règles de calcul, signe de f'(x), tableau de variations, extrema.",
  souschapitres:[
    {
      id:'sc-der-calc', titre:'3.1 Calcul des dérivées',
      notions:['Nombre dérivé f\'(a) = taux d\'accroissement en a','Tangente y=f\'(a)(x−a)+f(a)','Dérivées usuelles','Règles : produit, quotient, composée'],
      blocs:[
        {
          notion:'📐 Dérivées usuelles et règles',
          theoremes:[
            { id:'D-DE1', type:'def', nom:'Nombre dérivé et tangente',
              enonce:"f'(a)=lim(h→0)[f(a+h)−f(a)]/h\n\nGéométrie : f'(a) = pente de la tangente en M(a,f(a))\nTangente : y=f'(a)(x−a)+f(a)\nApproximation affine : f(x)≈f(a)+f'(a)(x−a) (x proche de a)" },
            { id:'F-DE1', type:'formule', nom:'Dérivées usuelles',
              enonce:"(c)'=0 ; (xⁿ)'=nxⁿ⁻¹ ; (√x)'=1/(2√x) ; (1/x)'=−1/x²\n(eˣ)'=eˣ ; (ln x)'=1/x (x>0)\n(sin x)'=cos x ; (cos x)'=−sin x ; (tan x)'=1/cos²x" },
            { id:'F-DE2', type:'formule', nom:'Règles de dérivation',
              enonce:"(u+v)'=u'+v' ; (ku)'=ku'\n(uv)'=u'v+uv' ; (u/v)'=(u'v−uv')/v²\n(f∘g)'=(f'∘g)·g'  ← règle de la chaîne\n\nFormules chaîne :\n(uⁿ)'=n·u'·uⁿ⁻¹ ; (√u)'=u'/(2√u)\n(eᵘ)'=u'·eᵘ ; (ln u)'=u'/u",
              remarque:"En ST : (eᵘ)' et (ln u)' sont très fréquentes aux chapitres ln et exp." },
          ],
          exercices:[
            { id:'EX-DE1', niveau:'Facile', titre:'Règle du produit',
              enonce:"f(x)=x²·sin x. Calculer f'(x).",
              correction:"f'(x)=2x·sin x+x²·cos x." },
            { id:'EX-DE2', niveau:'Intermédiaire', titre:'Quotient',
              enonce:"f(x)=(x²+1)/(2x−1). Calculer f'(x).",
              correction:"f'(x)=(2x(2x−1)−2(x²+1))/(2x−1)²=(2x²−2x−2)/(2x−1)²." },
            { id:'EX-DE3', niveau:'Intermédiaire', titre:'Tangente',
              enonce:"f(x)=x³−3x. Tangente en x=1.",
              correction:"f(1)=−2. f'(x)=3x²−3, f'(1)=0.\nTangente : y=−2 (horizontale)." },
          ]
        },
      ]
    },
    {
      id:'sc-variations', titre:'3.2 Variations et extrema',
      notions:['f\'(x)>0 → croissante','f\'(x)<0 → décroissante','Extremum local : f\'(a)=0 et changement de signe','Tableau de variations complet'],
      blocs:[
        {
          notion:'📈 Tableau de variations',
          theoremes:[
            { id:'P-DE1', type:'prop', nom:'Monotonie et extrema locaux',
              enonce:"f'(x)>0 sur ]a,b[ → f croissante\nf'(x)<0 sur ]a,b[ → f décroissante\n\nExtremum local en α :\nf'(α)=0 ET f' change de signe\n• +→− : maximum local f(α)\n• −→+ : minimum local f(α)\n\nTableau de variations :\nx  | ... α₁  ... α₂  ...\nf' |  +   0   −   0   +\nf  |  ↗  max  ↘  min  ↗",
              remarque:"Extremum global : comparer tous les extrema locaux et les valeurs aux bornes." },
          ],
          exercices:[
            { id:'EX-DE4', niveau:'Intermédiaire', titre:'Tableau complet',
              enonce:"f(x)=x³−3x²−9x+5. Tableau de variations sur ℝ.",
              correction:"f'(x)=3(x−3)(x+1).\nf'=0 en x=−1 (max local : f=10) et x=3 (min local : f=−22)." },
            { id:'EX-DE5', niveau:'Difficile', titre:'Optimisation',
              enonce:"f(x)=xe^(−x) sur [0;3]. Maximum global.",
              correction:"f'(x)=e^(−x)(1−x)=0 → x=1.\nf(1)=1/e≈0,368 ; f(0)=0 ; f(3)=3e^(−3)≈0,149.\nMax global en x=1 : f(1)=1/e." },
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
  id:'etude-fonctions', emoji:'🔍', badge:'Analyse', color:'#f59e0b',
  titre:'Étude de Fonctions',
  desc:"Polynômes (deg 2, 3, bicarrées), rationnelles (3 types), irrationnelles (√(ax+b), √(ax²+bx+c)), circulaires sin, cos, tan.",
  souschapitres:[
    {
      id:'sc-methode', titre:'4.1 Méthode d\'étude complète',
      notions:['1. Domaine 2. Parité 3. Limites/asymptotes','4. Dérivée et tableau de variations','5. Extrema et représentation graphique','Position de C_f par rapport à une droite'],
      blocs:[
        {
          notion:'📋 Plan d\'étude systématique',
          theoremes:[
            { id:'P-EF1', type:'prop', nom:'Étapes d\'une étude complète',
              enonce:"1. DOMAINE D_f\n2. PARITÉ : f(−x)=?\n3. LIMITES aux bornes → asymptotes\n4. f'(x) : calculer, factoriser, signe\n5. TABLEAU de variations\n6. EXTREMA (valeurs aux points critiques)\n7. REPRÉSENTATION graphique (asymptotes, variations, points remarquables)" },
          ],
          exercices:[
            { id:'EX-EF1', niveau:'Intermédiaire', titre:'Rationnelle type 1',
              enonce:"Étude complète de f(x)=(2x−1)/(x+1).",
              correction:"D=ℝ\\{−1}. AV: x=−1.\na=lim f/x=2 → AH: y=2.\nf'(x)=3/(x+1)²>0 → f toujours croissante sur chaque intervalle.\nf(0)=−1. Centre de symétrie I(−1;2)." },
          ]
        },
      ]
    },
    {
      id:'sc-types', titre:'4.2 Types de fonctions',
      notions:['Polynômes : deg 2 (sommet), deg 3, bicarrée ax⁴+bx²+c','Rationnelles : 3 types selon degrés','Irrationnelles √(ax+b) et √(ax²+bx+c)','Circulaires : sin, cos, tan'],
      blocs:[
        {
          notion:'📊 Polynômes, rationnelles, irrationnelles',
          theoremes:[
            { id:'D-EF1', type:'def', nom:'Fonctions polynômes — types ST',
              enonce:"DEG 2 : f(x)=ax²+bx+c\nSommet : x=−b/(2a), y=f(sommet)\nPARABOLE : branche vers le haut si a>0\n\nDEG 3 : f(x)=ax³+bx²+cx+d\n0, 1 ou 2 extrema locaux\n\nBICARRÉE : f(x)=ax⁴+bx²+c\nPoser X=x² (X≥0) → g(X)=aX²+bX+c\nf paire → étudier sur [0;+∞[ puis symétrie\n\nRATIONNELLES :\nType 1 : (ax+b)/(cx+d) → AV x=−d/c, AH y=a/c, centre symétrie\nType 2 : (ax²+bx+c)/(dx+e) → AV, AO (par division)\nType 3 : (ax²+bx+c)/(dx²+ex+f) → AH y=a/d" },
            { id:'D-EF2', type:'def', nom:'Irrationnelles et circulaires',
              enonce:"IRRATIONNELLES :\n√(ax+b) : D=[−b/a;+∞[, dérivée=a/(2√(ax+b))\n√(ax²+bx+c) : D={x: ax²+bx+c≥0}, dérivée=(2ax+b)/(2√(...))\n\nCIRCULAIRES :\nsin(ax+b) : T=2π/a, Im=[−1;1]\ncos(ax+b) : T=2π/a, Im=[−1;1], paire\ntan x : D=ℝ\\{π/2+kπ}, T=π, impaire",
              remarque:"En ST, les fonctions circulaires servent souvent de contre-exemple pour vérifier la périodicité." },
          ],
          exercices:[
            { id:'EX-EF2', niveau:'Facile', titre:'Bicarrée',
              enonce:"f(x)=x⁴−5x²+4. Racines et variations.",
              correction:"X=x² : X²−5X+4=(X−1)(X−4)=0 → X=1 ou 4.\nx=±1 ou x=±2.\nf'(x)=4x³−10x=2x(2x²−5). Zéros : x=0, x=±√(5/2)." },
            { id:'EX-EF3', niveau:'Intermédiaire', titre:'Irrationnelle',
              enonce:"Étudier f(x)=√(x²−4) : domaine, parité, variations.",
              correction:"x²≥4 → D=]−∞;−2]∪[2;+∞[. f paire.\nf'(x)=x/√(x²−4). f'>0 sur ]2;+∞[, f'<0 sur ]−∞;−2[.\nMin en x=±2 : f=0." },
          ]
        },
      ]
    },
  ]
},

// ─────────────────────────────────────────────────────────────────────
// CH 05 — LOGARITHME NÉPÉRIEN ★ SPÉCIFICITÉ ST
// ─────────────────────────────────────────────────────────────────────
'logarithme': {
  id:'logarithme', emoji:'ln', badge:'Analyse', color:'#f59e0b',
  titre:'Logarithme Népérien',
  desc:"Définition ln x pour x>0, propriétés algébriques, dérivée, étude complète de ln et de fonctions du type ln(u(x)), croissances comparées.",
  souschapitres:[
    {
      id:'sc-ln-def', titre:'5.1 Définition et propriétés algébriques',
      notions:['ln x défini sur ]0;+∞[, ln 1=0, ln e=1','ln(ab)=ln a+ln b ; ln(aⁿ)=n·ln a','ln(a/b)=ln a−ln b','Croissances comparées : ln x≪xᵅ en +∞'],
      blocs:[
        {
          notion:'📐 Propriétés algébriques de ln',
          theoremes:[
            { id:'D-LN1', type:'def', nom:'Logarithme népérien — définition',
              enonce:"ln est la primitive de 1/x sur ]0;+∞[ valant 0 en 1.\n\nDomaine : D=]0;+∞[\nlm 1=0 ; ln e=1 ; ln e^a=a\n\nPROPRIÉTÉS ALGÉBRIQUES (a,b>0) :\nln(ab) = ln a+ln b\nln(a/b) = ln a−ln b\nln(aⁿ) = n·ln a  (n∈ℝ)\nln(1/a) = −ln a\n\nCHANGEMENT DE BASE :\nlog_a(x) = ln x/ln a\nlog₁₀(x) = ln x/ln 10 ≈ ln x/2,303" },
            { id:'F-LN1', type:'formule', nom:'Dérivée de ln et composée',
              enonce:"(ln x)' = 1/x  (x>0)\n\nCOMPOSÉE :\n(ln u)' = u'/u  (u>0)\n\nExemples :\n(ln(x²+1))' = 2x/(x²+1)\n(ln(sin x))' = cos x/sin x = cot x  (sin x>0)\n(ln|x|)' = 1/x  (x≠0)",
              remarque:"u'/u est très fréquente → repérer une dérivée au numérateur divisée par la fonction." },
          ],
          exercices:[
            { id:'EX-LN1', niveau:'Facile', titre:'Propriétés algébriques',
              enonce:"Simplifier ln(8)−ln(2)+ln(1/4).",
              correction:"=ln(8/2)+ln(1/4)=ln(4)+ln(1/4)=ln(4×1/4)=ln(1)=0." },
            { id:'EX-LN2', niveau:'Facile', titre:'Dérivée composée',
              enonce:"f(x)=ln(x²+2x+1). Calculer f'(x).",
              correction:"u=x²+2x+1=(x+1)², u'=2x+2.\nf'(x)=(2x+2)/(x²+2x+1)=2(x+1)/(x+1)²=2/(x+1) (si x≠−1)." },
            { id:'EX-LN3', niveau:'Intermédiaire', titre:'Résolution avec ln',
              enonce:"Résoudre ln(x+1)+ln(x−1)=ln(3).",
              correction:"ln((x+1)(x−1))=ln 3 → x²−1=3 → x²=4.\nx=2 (x=−2 rejeté car x+1>0 et x−1>0 nécessite x>1)." },
          ]
        },
      ]
    },
    {
      id:'sc-ln-etude', titre:'5.2 Étude complète de ln et de ln(u(x))',
      notions:['Variations de ln x : croissante sur ]0;+∞[','lim(x→0⁺) ln x=−∞ ; lim(x→+∞) ln x=+∞','Limites fondamentales : x·ln x→0, ln x/x→0','Étude de f(x)=ln(u(x))'],
      blocs:[
        {
          notion:'📈 Étude de la fonction ln',
          theoremes:[
            { id:'T-LN1', type:'thm', nom:'Propriétés de la fonction ln',
              enonce:"ln est définie, continue et dérivable sur ]0;+∞[\n(ln x)'=1/x>0 → ln strictement CROISSANTE sur ]0;+∞[\n\nLIMITES :\nlim(x→0⁺) ln x = −∞\nlim(x→+∞) ln x = +∞\nlim(x→+∞) ln x/x = 0  (ln négligeable devant x)\nlim(x→0⁺) x·ln x = 0\n\nRéciproque : ln et exp sont inverses l'une de l'autre\nln(eˣ)=x et e^(ln x)=x (x>0)",
              remarque:"Courbe de ln : passe par (1;0) et (e;1), tangente en 1 d'équation y=x−1." },
            { id:'M-LN1', type:'methode', nom:'Étude d\'une fonction f(x)=A·ln(u(x))+B',
              enonce:"1. Domaine : u(x)>0\n2. Variations :\n   f'(x)=A·u'(x)/u(x)\n   Signe de f' = signe de A·u'(x) (car u(x)>0)\n3. Limites en bord de domaine\n4. Tableau de variations\n\nExemple : f(x)=ln(x²−1)\n• D : x²>1 → ]−∞;−1[∪]1;+∞[\n• f'(x)=2x/(x²−1)\n• Sur ]1;+∞[ : f'>0 (croissante)\n• lim(x→1⁺)f=−∞ ; lim(x→+∞)f=+∞" },
          ],
          exercices:[
            { id:'EX-LN4', niveau:'Intermédiaire', titre:'Étude de f(x)=x−ln x',
              enonce:"Étudier f(x)=x−ln x sur ]0;+∞[ : variations, minimum.",
              correction:"f'(x)=1−1/x=(x−1)/x.\nf'=0 en x=1. f'<0 sur ]0;1[, f'>0 sur ]1;+∞[.\nMin en x=1 : f(1)=1−0=1.\nlim(x→0⁺)f=+∞ (car ln x→−∞) ; lim(x→+∞)f=+∞." },
            { id:'EX-LN5', niveau:'Difficile', titre:'Étude complète f(x)=ln(x²−4x+3)',
              enonce:"Domaine, variations, asymptotes.",
              correction:"x²−4x+3=(x−1)(x−3)>0 → D=]−∞;1[∪]3;+∞[.\nf'(x)=(2x−4)/((x−1)(x−3))=2(x−2)/((x−1)(x−3)).\nSur ]−∞;1[ : f'>0 (croissante) ; sur ]3;+∞[ : f'>0 (croissante).\nAV : x=1 et x=3.\nlim(x→+∞)f=+∞ (branche parabolique)." },
          ]
        },
      ]
    },
  ]
},

// ─────────────────────────────────────────────────────────────────────
// CH 06 — FONCTION EXPONENTIELLE ★ SPÉCIFICITÉ ST
// ─────────────────────────────────────────────────────────────────────
'exponentielle': {
  id:'exponentielle', emoji:'eˣ', badge:'Analyse', color:'#f59e0b',
  titre:'Fonction Exponentielle',
  desc:"Définition eˣ (réciproque de ln), propriétés algébriques, dérivée (eˣ)'=eˣ et (eᵘ)'=u'eᵘ, étude complète, fonctions du type e^(u(x)).",
  souschapitres:[
    {
      id:'sc-exp-def', titre:'6.1 Définition et propriétés',
      notions:['eˣ = réciproque de ln x','e^(a+b)=eᵃ·eᵇ ; (eᵃ)ⁿ=eⁿᵃ ; e⁰=1','(eˣ)\'=eˣ ; (eᵘ)\'=u\'eᵘ','Domaine ℝ ; image ]0;+∞[ ; eˣ>0 toujours'],
      blocs:[
        {
          notion:'📐 Propriétés de exp',
          theoremes:[
            { id:'D-EX1', type:'def', nom:'Fonction exponentielle — définition',
              enonce:"eˣ est la réciproque de ln : ln(eˣ)=x et e^(ln x)=x\n\nDomaine : ℝ  ;  Image : ]0;+∞[\neˣ>0 pour tout x∈ℝ\ne⁰=1 ; e¹=e≈2,718\n\nPROPRIÉTÉS ALGÉBRIQUES :\ne^(a+b) = eᵃ·eᵇ\ne^(a−b) = eᵃ/eᵇ\n(eᵃ)ⁿ = e^(na)\ne^(−a) = 1/eᵃ\n\nComparaison : eˣ>xⁿ pour x assez grand (croissance plus rapide que tout polynôme)" },
            { id:'F-EX1', type:'formule', nom:'Dérivée de exp et composée',
              enonce:"(eˣ)' = eˣ\n\nRÈGLE DE LA CHAÎNE :\n(eᵘ)' = u'·eᵘ\n\nExemples :\n(e^(x²))' = 2x·e^(x²)\n(e^(−x))' = −e^(−x)\n(e^(sin x))' = cos x·e^(sin x)\n(e^(2x+1))' = 2·e^(2x+1)",
              remarque:"eᵘ>0 toujours → le signe de (eᵘ)' est toujours le signe de u'." },
            { id:'T-EX1', type:'thm', nom:'Propriétés de exp — limites et variations',
              enonce:"exp strictement CROISSANTE sur ℝ (car (eˣ)'=eˣ>0)\n\nLIMITES :\nlim(x→−∞) eˣ = 0  (AH y=0 en −∞)\nlim(x→+∞) eˣ = +∞\n\nCROISSANCES COMPARÉES :\nlim(x→+∞) eˣ/xⁿ = +∞  (exp≫polynôme)\nlim(x→+∞) xⁿ/eˣ = 0\nlim(x→−∞) xⁿ·eˣ = 0\n\nCourbe : passe par (0;1), tangente en 0 d'équation y=x+1." },
          ],
          exercices:[
            { id:'EX-EX1', niveau:'Facile', titre:'Dérivée composée',
              enonce:"f(x)=e^(3x²−1). Calculer f'(x).",
              correction:"u=3x²−1, u'=6x.\nf'(x)=6x·e^(3x²−1)." },
            { id:'EX-EX2', niveau:'Intermédiaire', titre:'Résolution',
              enonce:"Résoudre e^(2x)−3eˣ+2=0.",
              correction:"Poser X=eˣ (X>0) : X²−3X+2=0=(X−1)(X−2).\nX=1 → eˣ=1 → x=0.\nX=2 → eˣ=2 → x=ln 2.\nS={0;ln 2}." },
          ]
        },
      ]
    },
    {
      id:'sc-exp-etude', titre:'6.2 Étude de fonctions en e^(u(x))',
      notions:['Signe de f\'(x) : signe de u\'(x) × eᵘ = signe de u\'','Limites aux bornes du domaine','Tableau de variations','Asymptote horizontale y=0 en −∞ pour e^(ax), a<0'],
      blocs:[
        {
          notion:'📈 Études de fonctions exponentielles',
          theoremes:[
            { id:'M-EX1', type:'methode', nom:'Étude de f(x)=eᵘ ou f(x)=P(x)·eˣ',
              enonce:"f(x)=eᵘ : D=ℝ (si u définie sur ℝ)\nf'(x)=u'·eᵘ ; signe de f' = signe de u'\n\nf(x)=P(x)·eˣ (P polynôme) :\nf'(x)=[P'(x)+P(x)]·eˣ = Q(x)·eˣ\nSigne de f' = signe de Q(x)\n\nCas f(x)=x·e^(−x) :\nf'(x)=(1−x)e^(−x) ; f'=0 en x=1\nMax en x=1 : f(1)=1/e\nlim(x→+∞)f=0 (AH y=0) ; lim(x→−∞)f=−∞",
              remarque:"lim(x→+∞) xⁿ·e^(−x)=0 pour tout n → AH y=0 pour toute fonction P(x)·e^(−x)." },
          ],
          exercices:[
            { id:'EX-EX3', niveau:'Intermédiaire', titre:'Étude de xe^(−x)',
              enonce:"f(x)=(x+1)e^(−x) sur ℝ. Variations et lim.",
              correction:"f'(x)=e^(−x)+(x+1)(−e^(−x))=e^(−x)(1−(x+1))=e^(−x)(−x)=−xe^(−x).\nf'=0 en x=0. f'>0 sur ]−∞;0[, f'<0 sur ]0;+∞[.\nMax en x=0 : f(0)=1.\nlim(x→+∞)(x+1)e^(−x)=0 ; lim(x→−∞)(x+1)e^(−x)=−∞." },
            { id:'EX-EX4', niveau:'Difficile', titre:'Étude de e^x/(x+1)',
              enonce:"f(x)=eˣ/(x+1). Domaine, variations, asymptotes.",
              correction:"D=ℝ\\{−1}. AV : x=−1.\nf'(x)=(eˣ(x+1)−eˣ)/(x+1)²=eˣ·x/(x+1)².\nf'=0 en x=0. f'<0 sur ]−1;0[ et signe de x/(x+1)² donne le reste.\nf(0)=1 min local.\nlim(x→+∞)f=+∞ ; lim(x→−∞)f=0 (AH y=0)." },
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
  id:'suites', emoji:'uₙ', badge:'Analyse', color:'#f59e0b',
  titre:'Suites Numériques',
  desc:"Arithmétiques, géométriques, suites de type uₙ=f(n), récurrentes affines et homographiques, limite, gendarmes, récurrence.",
  souschapitres:[
    {
      id:'sc-suites-class', titre:'7.1 Suites classiques',
      notions:['Arithmétique : raison r, somme, comportement','Géométrique : raison q, somme, comportement','Reconnaître : différence ou quotient constant','Suites de type uₙ=f(n)'],
      blocs:[
        {
          notion:'📈 Arithmétiques et géométriques',
          theoremes:[
            { id:'D-SU1', type:'def', nom:'Suites arithmétiques et géométriques',
              enonce:"ARITHMÉTIQUE (raison r) : uₙ₊₁=uₙ+r\nuₙ=u₀+nr\nSomme=n(u₀+uₙ₋₁)/2\nComportement : r>0→+∞ ; r<0→−∞ ; r=0→constante\n\nGÉOMÉTRIQUE (raison q≠0) : uₙ₊₁=q·uₙ\nuₙ=u₀·qⁿ\nSomme=u₀(1−qⁿ)/(1−q) (q≠1)\nComportement : |q|<1→0 ; q>1→+∞ ; q<−1→diverge\n\nSuites de type uₙ=f(n) :\nuₙ=aⁿ/n! → 0 (croissance exponentielle > factorielle... non)\nuₙ=n·qⁿ → 0 si |q|<1 (gendarmes)",
              remarque:"Reconnaître arith. : uₙ₊₁−uₙ=cste. Reconnaître géom. : uₙ₊₁/uₙ=cste." },
          ],
          exercices:[
            { id:'EX-SU1', niveau:'Facile', titre:'Terme général et somme',
              enonce:"u₁=5 arith. raison 3. u₁₀ et S₁₀ (somme u₁+…+u₁₀).",
              correction:"u₁₀=5+9×3=32.\nS₁₀=10×(5+32)/2=185." },
          ]
        },
      ]
    },
    {
      id:'sc-suites-rec', titre:'7.2 Suites récurrentes et convergence',
      notions:['Affine uₙ₊₁=auₙ+b : point fixe et uₙ=ℓ+(u₀−ℓ)aⁿ','Homographique : deux points fixes, vₙ géométrique','Monotonie : signe de uₙ₊₁−uₙ','Convergence : monotone + bornée'],
      blocs:[
        {
          notion:'🔄 Récurrentes affines et convergence',
          theoremes:[
            { id:'M-SU1', type:'methode', nom:'Suite affine uₙ₊₁=auₙ+b',
              enonce:"1. Point fixe ℓ=b/(1−a) (si a≠1)\n2. vₙ=uₙ−ℓ → vₙ₊₁=a·vₙ (géom. raison a)\n3. uₙ=ℓ+(u₀−ℓ)·aⁿ\n\n|a|<1 → uₙ→ℓ ; a>1 → diverge\n\nSUITE HOMOGRAPHIQUE uₙ₊₁=(auₙ+b)/(cuₙ+d) :\nPoints fixes : cℓ²+(d−a)ℓ−b=0\nSi ℓ₁≠ℓ₂ : vₙ=(uₙ−ℓ₁)/(uₙ−ℓ₂) géométrique\n\nTHÉORÈME : croissante+majorée → converge\nTHÉORÈME DES GENDARMES :\nuₙ≤vₙ≤wₙ et lim uₙ=lim wₙ=ℓ → lim vₙ=ℓ",
              remarque:"Récurrence : 1. Initialisation P(n₀). 2. P(n)→P(n+1). → Conclusion." },
          ],
          exercices:[
            { id:'EX-SU2', niveau:'Facile', titre:'Suite affine',
              enonce:"uₙ₊₁=(1/3)uₙ+4, u₀=0. Exprimer uₙ et lim.",
              correction:"ℓ=4/(1−1/3)=6. vₙ=uₙ−6=(−6)(1/3)ⁿ.\nuₙ=6−6(1/3)ⁿ. lim uₙ=6." },
            { id:'EX-SU3', niveau:'Difficile', titre:'Suite homographique',
              enonce:"uₙ₊₁=(uₙ+3)/(uₙ+1), u₀=2. Étudier la convergence.",
              correction:"ℓ=(ℓ+3)/(ℓ+1) → ℓ²=3 → ℓ=√3 (>0).\nvₙ=(uₙ−√3)/(uₙ+√3) géométrique de raison (1−√3)/(1+√3).\n|raison|<1 → uₙ→√3." },
          ]
        },
      ]
    },
  ]
},

// ─────────────────────────────────────────────────────────────────────
// CH 08 — GÉOMÉTRIE PLANE ★ (CONIQUES)
// ─────────────────────────────────────────────────────────────────────
'geometrie-plane': {
  id:'geometrie-plane', emoji:'⭕', badge:'Géométrie', color:'#4f6ef7',
  titre:'Géométrie Plane ★ Coniques',
  desc:"Vecteurs, droites, cercles dans le plan + CONIQUES : ellipse, hyperbole, parabole (définition, équation réduite, foyers, directrices, excentricité). Spécificité ST.",
  souschapitres:[
    {
      id:'sc-droites-cercles', titre:'8.1 Droites et cercles',
      notions:['Équation cartésienne ax+by+c=0','Distance M₀ à droite : |ax₀+by₀+c|/√(a²+b²)','Cercle (x−a)²+(y−b)²=r²','Tangente en M₀ sur le cercle'],
      blocs:[
        {
          notion:'📏 Droites et cercles dans le plan',
          theoremes:[
            { id:'F-GP1', type:'formule', nom:'Droites et distances',
              enonce:"Cartésienne : ax+by+c=0 (n⃗(a;b) normale)\nRéduite : y=mx+p (m pente)\nParamétrique : {x=x₀+at ; y=y₀+bt}\n\nDistance M₀(x₀;y₀) à ax+by+c=0 :\nd=|ax₀+by₀+c|/√(a²+b²)\n\nMi-point de [AB] : ((xA+xB)/2 ; (yA+yB)/2)" },
            { id:'F-GP2', type:'formule', nom:'Cercles',
              enonce:"Centre Ω(a;b), rayon r : (x−a)²+(y−b)²=r²\nForme développée : x²+y²+Ax+By+C=0\nCentre=(−A/2;−B/2) ; r=√(A²/4+B²/4−C)\n\nTangente en M₀(x₀;y₀)∈Γ :\n(x₀−a)(x−a)+(y₀−b)(y−b)=r²" },
          ],
          exercices:[
            { id:'EX-GP1', niveau:'Facile', titre:'Équation de droite',
              enonce:"Droite par A(1;2) et B(3;−2). Équation cartésienne.",
              correction:"u⃗AB=(2;−4). n⃗(4;2)→(2;1).\n2(x−1)+(y−2)=0 → 2x+y−4=0." },
          ]
        },
      ]
    },
    {
      id:'sc-coniques', titre:'8.2 Coniques ★ Spécificité ST',
      notions:['Ellipse : x²/a²+y²/b²=1, foyers F₁(±c;0), c²=a²−b²','Hyperbole : x²/a²−y²/b²=1, asymptotes y=±(b/a)x','Parabole : y²=4px, foyer F(p;0), directrice x=−p','Excentricité e=c/a'],
      blocs:[
        {
          notion:'⭕ Ellipse',
          theoremes:[
            { id:'D-CO1', type:'def', nom:'Ellipse — définition et équation réduite',
              enonce:"DÉFINITION : ensemble des points M tels que MF₁+MF₂=2a\n(somme des distances aux foyers F₁ et F₂ constante)\n\nÉQUATION RÉDUITE (centre O, grand axe horizontal) :\nx²/a² + y²/b² = 1  avec a>b>0\n\nFoyers : F₁(−c;0) et F₂(c;0)  avec c²=a²−b²\nDemi-grand axe : a ; demi-petit axe : b\nExcentricité : e=c/a  (0<e<1)\n\nSommet grand axe : A(−a;0) et A'(a;0)\nSommet petit axe : B(0;−b) et B'(0;b)\n\nTangente en M₀(x₀;y₀)∈ellipse :\nx·x₀/a² + y·y₀/b² = 1",
              remarque:"Si a=b : l'ellipse est un cercle de rayon a. Plus e est proche de 1, plus l'ellipse est 'aplatie'." },
          ],
          exercices:[
            { id:'EX-CO1', niveau:'Facile', titre:'Paramètres d\'une ellipse',
              enonce:"E : x²/25+y²/9=1. Donner a, b, c, les foyers et e.",
              correction:"a=5, b=3. c=√(25−9)=4.\nFoyers : F₁(−4;0) et F₂(4;0). e=4/5=0,8." },
            { id:'EX-CO2', niveau:'Intermédiaire', titre:'Équation d\'une ellipse',
              enonce:"Ellipse de foyers F₁(−3;0), F₂(3;0) et grand axe 2a=10.",
              correction:"a=5, c=3. b²=25−9=16.\nx²/25+y²/16=1." },
          ]
        },
        {
          notion:'〰️ Hyperbole',
          theoremes:[
            { id:'D-CO2', type:'def', nom:'Hyperbole — définition et équation',
              enonce:"DÉFINITION : ensemble des points M tels que |MF₁−MF₂|=2a\n(différence des distances aux foyers en valeur absolue)\n\nÉQUATION RÉDUITE :\nx²/a² − y²/b² = 1\n\nFoyers : F₁(−c;0) et F₂(c;0)  avec c²=a²+b²\nExcentricité : e=c/a  (e>1)\n\nASYMPTOTES : y=±(b/a)·x\n(la courbe se rapproche des asymptotes sans les atteindre)\n\nDeux branches : x≤−a et x≥a",
              remarque:"Conjuguée : y²/a²−x²/b²=1 (axe focal vertical). Hyperbole équilatère si a=b : asymptotes y=±x." },
          ],
          exercices:[
            { id:'EX-CO3', niveau:'Facile', titre:'Hyperbole — paramètres',
              enonce:"H : x²/4−y²/9=1. Donner a, b, c, les foyers et les asymptotes.",
              correction:"a=2, b=3. c=√(4+9)=√13.\nFoyers : F₁(−√13;0), F₂(√13;0).\nAsymptotes : y=±(3/2)x." },
            { id:'EX-CO4', niveau:'Intermédiaire', titre:'Équation de l\'hyperbole',
              enonce:"Hyperbole de foyers F₁(−5;0), F₂(5;0) et différence 2a=6.",
              correction:"a=3, c=5. b²=25−9=16.\nx²/9−y²/16=1." },
          ]
        },
        {
          notion:'📈 Parabole',
          theoremes:[
            { id:'D-CO3', type:'def', nom:'Parabole — définition et équation',
              enonce:"DÉFINITION : ensemble des points M équidistants du foyer F et de la directrice Δ\n(d(M,F)=d(M,Δ))\n\nÉQUATION RÉDUITE :\ny² = 4p·x\n\nFoyer : F(p;0)\nDirectrice : x=−p\nSommet : O(0;0)\nAxe de symétrie : axe Ox\n\nTangente en M₀(x₀;y₀)∈parabole :\ny·y₀ = 2p(x+x₀)\n\nParabole verticale (variante) : x²=4py\nFoyer : F(0;p) ; Directrice : y=−p",
              remarque:"Réflecteur parabolique : tout rayon parallèle à l'axe converge au foyer → antennes paraboliques, phares." },
          ],
          exercices:[
            { id:'EX-CO5', niveau:'Facile', titre:'Parabole — foyer et directrice',
              enonce:"Parabole y²=12x. Foyer, directrice, tracé.",
              correction:"4p=12 → p=3.\nFoyer : F(3;0). Directrice : x=−3." },
            { id:'EX-CO6', niveau:'Difficile', titre:'Point sur la parabole',
              enonce:"Parabole y²=8x. Trouver les points à distance 5 du foyer.",
              correction:"p=2. Foyer F(2;0).\nd(M,F)=5 → d(M, directrice x=−2)=5.\nx+2=5 → x=3. y²=8×3=24 → y=±2√6.\nPoints : (3;2√6) et (3;−2√6)." },
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
  id:'geometrie-espace', emoji:'🧊', badge:'Géométrie', color:'#4f6ef7',
  titre:"Géométrie dans l'Espace",
  desc:"Vecteurs 3D, produit scalaire, produit vectoriel, droites et plans (paramétrique et cartésien), positions relatives, distances.",
  souschapitres:[
    {
      id:'sc-vect3d', titre:'9.1 Vecteurs et produits dans l\'espace',
      notions:['|u⃗|=√(a²+b²+c²)','Produit scalaire : u⃗·v⃗=aa\'+bb\'+cc\'','Produit vectoriel u⃗∧v⃗ : perpendiculaire aux deux','|u⃗∧v⃗|=aire du parallélogramme'],
      blocs:[
        {
          notion:'🔷 Produit scalaire et vectoriel',
          theoremes:[
            { id:'F-GE1', type:'formule', nom:'Produit scalaire dans l\'espace',
              enonce:"u⃗(a;b;c)·v⃗(a';b';c')=aa'+bb'+cc'\nFormule géométrique : u⃗·v⃗=|u⃗||v⃗|cosθ\nOrthogonalité : u⃗·v⃗=0\n\nCoplanarité u⃗,v⃗,w⃗ : det=0" },
            { id:'F-GE2', type:'formule', nom:'Produit vectoriel',
              enonce:"u⃗(a₁;b₁;c₁)∧v⃗(a₂;b₂;c₂)\n=(b₁c₂−c₁b₂ ; c₁a₂−a₁c₂ ; a₁b₂−b₁a₂)\n\n• u⃗∧v⃗ ⊥ u⃗ et ⊥ v⃗\n• |u⃗∧v⃗|=|u⃗||v⃗|sinθ = aire parallélogramme\n• u⃗∧u⃗=0⃗ ; v⃗∧u⃗=−u⃗∧v⃗\n\nAire triangle ABC = ½|AB⃗∧AC⃗|",
              remarque:"Produit vectoriel → vecteur normal au plan : utile pour l'équation d'un plan." },
          ],
          exercices:[
            { id:'EX-GE1', niveau:'Facile', titre:'Produit scalaire',
              enonce:"u⃗(1;2;−1), v⃗(3;−1;2). Orthogonaux ?",
              correction:"u⃗·v⃗=3−2−2=−1≠0. Non orthogonaux." },
            { id:'EX-GE2', niveau:'Intermédiaire', titre:'Produit vectoriel',
              enonce:"A(1;0;0), B(0;2;0), C(0;0;3). Calculer AB⃗∧AC⃗ et l'aire du triangle.",
              correction:"AB⃗=(−1;2;0), AC⃗=(−1;0;3).\nAB⃗∧AC⃗=(6;3;2).\nAire=½√(36+9+4)=½×7=7/2." },
          ]
        },
      ]
    },
    {
      id:'sc-plans3d', titre:'9.2 Plans, droites et distances',
      notions:['Plan ax+by+cz+d=0','Droite paramétrique M=A+t·u⃗','Positions relatives droite-plan','Distance point-plan'],
      blocs:[
        {
          notion:'📐 Plans et droites dans l\'espace',
          theoremes:[
            { id:'F-GE3', type:'formule', nom:'Équations et distances',
              enonce:"Plan par A₀(x₀;y₀;z₀), normale n⃗(a;b;c) :\na(x−x₀)+b(y−y₀)+c(z−z₀)=0\n\nDroite (A,u⃗) :\n{x=x₀+at ; y=y₀+bt ; z=z₀+ct}\n\nDistance M₀(x₀;y₀;z₀) au plan ax+by+cz+d=0 :\nd=|ax₀+by₀+cz₀+d|/√(a²+b²+c²)\n\nPositions droite-plan :\nu⃗·n⃗=0 et A∉plan → parallèle\nu⃗·n⃗=0 et A∈plan → ⊂ plan\nu⃗·n⃗≠0 → intersection (1 point)" },
          ],
          exercices:[
            { id:'EX-GE3', niveau:'Facile', titre:'Équation d\'un plan',
              enonce:"Plan par A(1;2;3) de normale n⃗(2;−1;1).",
              correction:"2(x−1)−(y−2)+(z−3)=0 → 2x−y+z=3." },
            { id:'EX-GE4', niveau:'Difficile', titre:'Distance point-plan',
              enonce:"Distance de M(2;1;3) au plan 2x−y+2z−1=0.",
              correction:"d=|4−1+6−1|/√(4+1+4)=8/3." },
          ]
        },
      ]
    },
  ]
},

// ─────────────────────────────────────────────────────────────────────
// CH 10 — STATISTIQUES À DEUX VARIABLES ★ SPÉCIFICITÉ ST
// ─────────────────────────────────────────────────────────────────────
'statistiques': {
  id:'statistiques', emoji:'📊', badge:'Statistiques', color:'#f97316',
  titre:'Statistiques — Séries à deux variables',
  desc:"Nuage de points (xᵢ,yᵢ), point moyen G(x̄,ȳ), ajustement linéaire (droite de régression moindres carrés), coefficient de corrélation r, prévisions.",
  souschapitres:[
    {
      id:'sc-nuage', titre:'10.1 Nuage de points et point moyen',
      notions:['Série statistique à 2 variables : (xᵢ,yᵢ)','Moyennes x̄=Σxᵢ/n et ȳ=Σyᵢ/n','Point moyen G(x̄;ȳ)','Représentation graphique (nuage)'],
      blocs:[
        {
          notion:'📍 Nuage de points et point moyen',
          theoremes:[
            { id:'D-ST1', type:'def', nom:'Série à deux variables et point moyen',
              enonce:"Série statistique à deux variables : n couples (xᵢ,yᵢ)\n\nMoyennes :\nx̄ = (1/n)·Σxᵢ = (x₁+x₂+…+xₙ)/n\nȳ = (1/n)·Σyᵢ\n\nPoint moyen : G(x̄ ; ȳ)\n→ La droite de régression PASSE TOUJOURS par G.\n\nVariances et covariance :\nσx² = (1/n)Σxᵢ² − x̄²\nσy² = (1/n)Σyᵢ² − ȳ²\ncov(X,Y) = (1/n)Σxᵢyᵢ − x̄·ȳ",
              remarque:"Nuage de points : représenter chaque couple (xᵢ;yᵢ) dans le plan cartésien. Linéarité visible si les points s'alignent." },
          ],
          exercices:[
            { id:'EX-ST1', niveau:'Facile', titre:'Point moyen',
              enonce:"x: 1,2,3,4,5. y: 2,4,5,4,5. Calculer G(x̄;ȳ).",
              correction:"x̄=(1+2+3+4+5)/5=3.\nȳ=(2+4+5+4+5)/5=4.\nG(3;4)." },
          ]
        },
      ]
    },
    {
      id:'sc-regression', titre:'10.2 Droite de régression et coefficient r',
      notions:['Droite de régression y en x : y=ax+b, a=cov(X,Y)/σx²','Droite passe par G(x̄;ȳ) : b=ȳ−a·x̄','Coefficient de corrélation r=cov/(σxσy)','Interprétation : r proche ±1 → bonne corrélation'],
      blocs:[
        {
          notion:'📉 Droite de régression (moindres carrés)',
          theoremes:[
            { id:'F-ST1', type:'formule', nom:'Droite de régression et coefficient r',
              enonce:"DROITE DE RÉGRESSION y en x : y=ax+b\n\nPente : a = cov(X,Y)/σx²\n     = [Σxᵢyᵢ − n·x̄·ȳ] / [Σxᵢ² − n·x̄²]\n\nOrdonnée à l'origine : b = ȳ − a·x̄\n\nLa droite PASSE PAR G(x̄;ȳ)\n\nCOEFFICIENT DE CORRÉLATION LINÉAIRE :\nr = cov(X,Y) / (σx·σy)\n\n−1 ≤ r ≤ 1\n\nInterprétation :\n|r| proche de 1 → forte corrélation linéaire\n|r| proche de 0 → faible corrélation (ajust. linéaire inadapté)\nr>0 : corrélation positive\nr<0 : corrélation négative",
              remarque:"Pour prédire y à partir de x₀ : substituer x₀ dans y=ax₀+b. Valable si |r|≥0,9 environ." },
            { id:'M-ST1', type:'methode', nom:'Tableau de calcul pour la régression',
              enonce:"Construire le tableau :\n| xᵢ | yᵢ | xᵢ² | yᵢ² | xᵢyᵢ |\n\nCalculer :\nΣxᵢ, Σyᵢ, Σxᵢ², Σyᵢ², Σxᵢyᵢ\n\nDéduire :\nx̄=Σxᵢ/n ; ȳ=Σyᵢ/n\na=(Σxᵢyᵢ − n·x̄·ȳ)/(Σxᵢ² − n·x̄²)\nb=ȳ−a·x̄\nr=cov/(σxσy)\n\nVérification : G(x̄;ȳ) doit vérifier y=ax̄+b ✓" },
          ],
          exercices:[
            { id:'EX-ST2', niveau:'Intermédiaire', titre:'Droite de régression',
              enonce:"x: 1,2,3,4. y: 2,3,5,6. Calculer a, b et prédire y pour x=5.",
              correction:"x̄=2,5 ; ȳ=4.\nΣxᵢyᵢ=1×2+2×3+3×5+4×6=2+6+15+24=47.\nΣxᵢ²=1+4+9+16=30.\na=(47−4×2,5×4)/(30−4×6,25)=(47−40)/(30−25)=7/5=1,4.\nb=4−1,4×2,5=4−3,5=0,5.\ny=1,4x+0,5.\nPour x=5 : y=1,4×5+0,5=7,5." },
            { id:'EX-ST3', niveau:'Difficile', titre:'Coefficient de corrélation',
              enonce:"Même série. Calculer r.",
              correction:"Σyᵢ²=4+9+25+36=74.\nσx²=(30/4)−6,25=7,5−6,25=1,25 → σx=√1,25.\nσy²=(74/4)−16=18,5−16=2,5 → σy=√2,5.\ncov=(47/4)−2,5×4=11,75−10=1,75.\nr=1,75/(√1,25×√2,5)=1,75/√3,125=1,75/1,768≈0,99.\nTrès forte corrélation positive ✓" },
          ]
        },
      ]
    },
  ]
},

// ─────────────────────────────────────────────────────────────────────
// CH 11 — DÉNOMBREMENT
// ─────────────────────────────────────────────────────────────────────
'denombrement': {
  id:'denombrement', emoji:'🔢', badge:'Probabilités', color:'#f5c842',
  titre:'Dénombrement',
  desc:"Arrangements Aₙᵖ, permutations n!, combinaisons Cₙᵖ, formule du binôme de Newton, applications au dénombrement.",
  souschapitres:[
    {
      id:'sc-arr-perm', titre:'11.1 Arrangements et permutations',
      notions:['Arrangement Aₙᵖ=n!/(n−p)! (ordre compte)','Permutation Aₙⁿ=n!','Principe multiplicatif','n! : 0!=1, 5!=120, 10!=3 628 800'],
      blocs:[
        {
          notion:'🎯 Arrangements et permutations',
          theoremes:[
            { id:'D-DN1', type:'def', nom:'Arrangements et permutations',
              enonce:"PRINCIPE MULTIPLICATIF :\nk choix successifs indépendants (n₁,n₂,…,nₖ) :\nNombre total = n₁×n₂×…×nₖ\n\nARRANGEMENT Aₙᵖ (ordre compte, sans répétition) :\nAₙᵖ = n!/(n−p)! = n×(n−1)×…×(n−p+1)\n\nPERMUTATION (p=n) : n!\n\nFactorielle : n! = n×(n−1)×…×2×1\n0!=1 ; 5!=120 ; 7!=5040 ; 10!=3 628 800",
              remarque:"Aₙᵖ : on choisit p éléments PARMI n en tenant compte de l'ordre (liste ordonnée)." },
          ],
          exercices:[
            { id:'EX-DN1', niveau:'Facile', titre:'Arrangement',
              enonce:"Nombre de mots de 3 lettres distinctes avec l'alphabet (26 lettres).",
              correction:"A₂₆³=26×25×24=15 600." },
            { id:'EX-DN2', niveau:'Intermédiaire', titre:'Permutation avec contrainte',
              enonce:"6 coureurs. Podium (or, argent, bronze). Combien de podiums distincts ?",
              correction:"A₆³=6×5×4=120." },
          ]
        },
      ]
    },
    {
      id:'sc-combinaisons', titre:'11.2 Combinaisons et binôme de Newton',
      notions:['Cₙᵖ=n!/[p!(n−p)!] (ordre ne compte pas)','Propriétés : Cₙᵖ=Cₙⁿ⁻ᵖ, Pascal : Cₙᵖ=Cₙ₋₁ᵖ⁻¹+Cₙ₋₁ᵖ','(a+b)ⁿ=Σ Cₙᵏ aᵏ bⁿ⁻ᵏ','Σ Cₙᵏ=2ⁿ'],
      blocs:[
        {
          notion:'📊 Combinaisons et binôme',
          theoremes:[
            { id:'F-DN1', type:'formule', nom:'Combinaisons et binôme de Newton',
              enonce:"Cₙᵖ = n!/[p!·(n−p)!]  (sans ordre)\n\nPROPRIÉTÉS :\nCₙ⁰=Cₙⁿ=1 ; Cₙ¹=n ; Cₙᵖ=Cₙⁿ⁻ᵖ\nPascal : Cₙᵖ=Cₙ₋₁ᵖ⁻¹+Cₙ₋₁ᵖ\n\nBINÔME DE NEWTON :\n(a+b)ⁿ=Σₖ₌₀ⁿ Cₙᵏ·aᵏ·bⁿ⁻ᵏ\n\nSommes remarquables :\nΣ Cₙᵏ = 2ⁿ  (poser a=b=1)\nΣ (−1)ᵏCₙᵏ = 0  (poser a=1,b=−1)\n\nTerme indépendant de x dans (ax+b/x)ⁿ :\nChercher k tel que l'exposant de x soit 0",
              remarque:"Utiliser Cₙᵖ=Cₙⁿ⁻ᵖ pour simplifier : C₁₀⁸=C₁₀²=45." },
          ],
          exercices:[
            { id:'EX-DN3', niveau:'Facile', titre:'Calcul de C₁₂⁴',
              enonce:"Calculer C₁₂⁴.",
              correction:"C₁₂⁴=12!/(4!×8!)=12×11×10×9/(4×3×2×1)=11880/24=495." },
            { id:'EX-DN4', niveau:'Intermédiaire', titre:'Terme indépendant',
              enonce:"Dans (2x+1/x)⁶, trouver le terme indépendant de x.",
              correction:"T_k=C₆ᵏ(2x)ᵏ(1/x)^(6−k)=C₆ᵏ·2ᵏ·x^(2k−6).\n2k−6=0 → k=3.\nTerme : C₆³·2³=20×8=160." },
            { id:'EX-DN5', niveau:'Difficile', titre:'Dénombrement avec contrainte',
              enonce:"12 élèves (7F+5G). Comité de 4 avec au moins 2 filles.",
              correction:"2F+2G : C₇²×C₅²=21×10=210\n3F+1G : C₇³×C₅¹=35×5=175\n4F+0G : C₇⁴=35\nTotal=210+175+35=420." },
          ]
        },
      ]
    },
  ]
},

// ─────────────────────────────────────────────────────────────────────
// CH 12 — PROBABILITÉS
// ─────────────────────────────────────────────────────────────────────
'probabilites': {
  id:'probabilites', emoji:'🎲', badge:'Probabilités', color:'#f5c842',
  titre:'Probabilités',
  desc:"Probabilité sur ensemble fini, équiprobabilité, P(A∪B), probabilités conditionnelles P(A|B), indépendance, formule des probabilités totales.",
  souschapitres:[
    {
      id:'sc-proba-base', titre:'12.1 Probabilités — Bases',
      notions:['Espace probabilisé (Ω,P)','P(A∪B)=P(A)+P(B)−P(A∩B)','Équiprobabilité : P(A)=|A|/|Ω|','Contraire : P(Ā)=1−P(A)'],
      blocs:[
        {
          notion:'🎯 Probabilités de base',
          theoremes:[
            { id:'D-PR1', type:'def', nom:'Espace probabilisé',
              enonce:"Ω = univers (tous les résultats possibles)\nÉvénement A⊂Ω\n\nAXIOMES :\nP(Ω)=1 ; P(∅)=0 ; 0≤P(A)≤1\nA∩B=∅ → P(A∪B)=P(A)+P(B)\n\nFORMULE GÉNÉRALE :\nP(A∪B)=P(A)+P(B)−P(A∩B)\nP(Ā)=1−P(A)\n\nÉQUIPROBABILITÉ :\nP(A)=|A|/|Ω| (tous les résultats équiprobables)" },
          ],
          exercices:[
            { id:'EX-PR1', niveau:'Facile', titre:'Dé et équiprobabilité',
              enonce:"Dé équilibré. P(multiple de 3 ou pair) ?",
              correction:"A={3,6}, B={2,4,6}, A∩B={6}.\nP(A∪B)=2/6+3/6−1/6=4/6=2/3." },
          ]
        },
      ]
    },
    {
      id:'sc-proba-cond', titre:'12.2 Probabilités conditionnelles et indépendance',
      notions:['P(A|B)=P(A∩B)/P(B)','Indépendance : P(A∩B)=P(A)·P(B)','Formule des probabilités totales','Formule de Bayes'],
      blocs:[
        {
          notion:'🔗 Conditionnement et Bayes',
          theoremes:[
            { id:'D-PR2', type:'def', nom:'Probabilité conditionnelle et indépendance',
              enonce:"P(A|B) = P(A∩B)/P(B)  (P(B)>0)\n«Probabilité de A sachant B»\n\nP(A∩B) = P(B)·P(A|B)\n\nINDÉPENDANCE :\nA et B indép. ↔ P(A∩B)=P(A)·P(B)\n↔ P(A|B)=P(A)\n\nExpériences répétées indép. :\nP(A₁∩…∩Aₙ)=P(A₁)×…×P(Aₙ)",
              remarque:"Indépendance ≠ incompatibilité. A∩B=∅ et P(A),P(B)>0 → NON indépendants." },
            { id:'T-PR1', type:'thm', nom:'Probabilités totales et Bayes',
              enonce:"Partition {B₁,…,Bₙ} de Ω :\n\nPROBABILITÉS TOTALES :\nP(A)=Σᵢ P(A|Bᵢ)·P(Bᵢ)\n\nFORMULE DE BAYES :\nP(Bⱼ|A)=P(A|Bⱼ)·P(Bⱼ)/P(A)\n\nCas B,B̄ :\nP(A)=P(A|B)·P(B)+P(A|B̄)·P(B̄)\nP(B|A)=P(A|B)·P(B)/P(A)",
              remarque:"Arbre de probabilités : outil indispensable pour visualiser les expériences successives." },
          ],
          exercices:[
            { id:'EX-PR2', niveau:'Facile', titre:'Probabilités totales',
              enonce:"Urne A:3B+2R ; Urne B:1B+4R. Urne choisie au hasard. P(bleue) ?",
              correction:"P(B)=½×3/5+½×1/5=3/10+1/10=2/5." },
            { id:'EX-PR3', niveau:'Intermédiaire', titre:'Bayes',
              enonce:"Test médical : P(+|M)=0,95 ; P(+|M̄)=0,03 ; P(M)=0,02. P(M|+) ?",
              correction:"P(+)=0,95×0,02+0,03×0,98=0,019+0,0294=0,0484.\nP(M|+)=0,019/0,0484≈39,3%." },
            { id:'EX-PR4', niveau:'Difficile', titre:'Indépendance et répétition',
              enonce:"Tir : P(toucher)=0,7. 3 tirs indépendants. P(au moins 2 touches) ?",
              correction:"P(X≥2)=P(2)+P(3).\nP(2)=C₃²×0,7²×0,3=3×0,49×0,3=0,441.\nP(3)=0,7³=0,343.\nP(X≥2)=0,784." },
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
export default function SciencesTechSlugPage() {
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
          <Link href="/bac/sciences-tech" style={{ color:'#f59e0b' }}>
            ← Retour Sciences Techniques
          </Link>
        </div>
      </main><Footer/></>
  )

  const idx = NAV_ORDER.indexOf(slug)
  const prevSlug = idx>0 ? NAV_ORDER[idx-1] : null
  const nextSlug = idx<NAV_ORDER.length-1 ? NAV_ORDER[idx+1] : null
  const secColor = SEC_COLORS[slug] || '#f59e0b'

  const GROUPS = [
    { label:'Partie 1 — Analyse (7 ch.)', slugs:NAV_ORDER.slice(0,7) },
    { label:'Partie 2 — Géométrie (2 ch.)', slugs:NAV_ORDER.slice(7,9) },
    { label:'Partie 3 — Statistiques (1 ch.)', slugs:NAV_ORDER.slice(9,10) },
    { label:'Partie 4 — Probabilités (2 ch.)', slugs:NAV_ORDER.slice(10) },
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
          <Link href="/bac/sciences-tech" style={{ color:'var(--muted)', textDecoration:'none' }}>
            Sciences Techniques
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
                  <span style={{ fontSize:11, background:'rgba(245,158,11,0.1)',
                    color:'#f59e0b', padding:'2px 9px', borderRadius:10 }}>Bac Tunisie · Coeff 3</span>
                  {(slug==='geometrie-plane'||slug==='logarithme'||slug==='exponentielle'||slug==='statistiques') && (
                    <span style={{ fontSize:10, background:'rgba(245,158,11,0.2)',
                      color:'#f59e0b', padding:'2px 9px', borderRadius:10, fontWeight:800 }}>★ SPÉCIFICITÉ ST</span>
                  )}
                </div>
                <h1 style={{ fontSize:'clamp(22px,3vw,36px)', fontWeight:800, marginBottom:10 }}>
                  {chapter.titre}
                </h1>
                <p style={{ color:'var(--text2)', fontSize:14, lineHeight:1.7,
                  maxWidth:620, marginBottom:18 }}>{chapter.desc}</p>
                <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
                  <Link href={`/solve?q=${encodeURIComponent('Explique '+chapter.titre+' Sciences Techniques Bac Tunisie')}`}
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

                  {/* Accordéon header */}
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
                                      <Link href={`/solve?q=${encodeURIComponent('Sc. Tech. Tunisie — '+ex.enonce)}`}
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
                  <Link href={`/bac/sciences-tech/${prevSlug}`} style={{ textDecoration:'none' }}>
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
                  <Link href={`/bac/sciences-tech/${nextSlug}`} style={{ textDecoration:'none' }}>
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
                  ⚙️ Sc. Techniques · 12 chapitres
                </div>
                {GROUPS.map(g => (
                  <div key={g.label}>
                    <div style={{ padding:'7px 15px 3px', fontSize:10, color:'var(--muted)',
                      fontWeight:700, textTransform:'uppercase', letterSpacing:'0.1em',
                      background:'rgba(255,255,255,0.02)' }}>{g.label}</div>
                    {g.slugs.map(s => (
                      <Link key={s} href={`/bac/sciences-tech/${s}`} style={{ textDecoration:'none' }}>
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
                            {TITRES_NAV[s].replace(/CH \d+ — /,'').replace(' ★','').slice(0,28)}
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
                  <Link href={`/solve?q=${encodeURIComponent('Explique '+chapter.titre+' Sc.Tech. Bac Tunisie')}`}
                    className="btn btn-primary" style={{ textAlign:'center', fontSize:12 }}>
                    🤖 Chat IA — {chapter.badge}
                  </Link>
                  <Link href="/examens" className="btn btn-secondary"
                    style={{ textAlign:'center', fontSize:12 }}>📋 Exercice type Bac</Link>
                  <Link href="/simulation" className="btn btn-secondary"
                    style={{ textAlign:'center', fontSize:12 }}>🎯 Simulation Bac</Link>
                  <Link href="/bac/sciences-tech" className="btn btn-secondary"
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
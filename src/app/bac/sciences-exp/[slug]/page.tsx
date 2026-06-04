'use client'
import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import { useParams } from 'next/navigation'

// ══════════════════════════════════════════════════════════════════════
// SCIENCES EXPÉRIMENTALES — [SLUG] DÉTAIL COMPLET
// Route : /bac/sciences-exp/[slug]
// Programme officiel CNP Tunisie — 4ème Sc. Exp. · Coeff 3
// Structure : souschapitres + blocs + notions (identique à slug maths)
// ══════════════════════════════════════════════════════════════════════

const C = { thm:'#06d6a0', def:'#4f6ef7', formule:'#f5c842', prop:'#a78bfa', methode:'#ec4899', corollaire:'#f97316' }
const L: Record<string,string> = { thm:'Théorème', def:'Définition', formule:'Formule clé', prop:'Propriété', methode:'Méthode', corollaire:'Corollaire' }

const NAV_ORDER = [
  'fonctions-generalites','limites-continuite','derivation','etude-fonctions','suites',
  'fonctions-reciproques','logarithme','exponentielle','primitives-integrales','equations-differentielles',
  'complexes',
  'vecteurs-espace','droites-plans-espace',
  'denombrement','probabilites','variables-aleatoires','statistiques',
]
const TITRES_NAV: Record<string,string> = {
  'fonctions-generalites':    'CH 01 — Fonctions',
  'limites-continuite':       'CH 02 — Limites & Continuité',
  'derivation':               'CH 03 — Dérivation',
  'etude-fonctions':          'CH 04 — Étude de fonctions',
  'suites':                   'CH 05 — Suites',
  'fonctions-reciproques':    'CH 06 — Fonctions réciproques',
  'logarithme':               'CH 07 — Logarithme',
  'exponentielle':            'CH 08 — Exponentielle',
  'primitives-integrales':    'CH 09 — Primitives & ∫',
  'equations-differentielles':'CH 10 — Éq. différentielles',
  'complexes':                'CH 11 — Complexes',
  'vecteurs-espace':          "CH 12 — Vecteurs espace",
  'droites-plans-espace':     "CH 13 — Droites & Plans",
  'denombrement':             'CH 14 — Dénombrement',
  'probabilites':             'CH 15 — Probabilités',
  'variables-aleatoires':     'CH 16 — Variables aléatoires',
  'statistiques':             'CH 17 — Statistiques',
}
const SEC_COLORS: Record<string,string> = {
  'fonctions-generalites':'#06d6a0','limites-continuite':'#06d6a0','derivation':'#06d6a0',
  'etude-fonctions':'#06d6a0','suites':'#06d6a0',
  'fonctions-reciproques':'#06d6a0','logarithme':'#06d6a0','exponentielle':'#06d6a0',
  'primitives-integrales':'#06d6a0','equations-differentielles':'#06d6a0',
  'complexes':'#a78bfa',
  'vecteurs-espace':'#4f6ef7','droites-plans-espace':'#4f6ef7',
  'denombrement':'#f5c842','probabilites':'#f5c842',
  'variables-aleatoires':'#f5c842','statistiques':'#f5c842',
}

// ══════════════════════════════════════════════════════════════════════
// TYPES
// ══════════════════════════════════════════════════════════════════════
type Thm  = { id:string; type:string; nom:string; enonce:string; remarque?:string }
type Exo  = { id:string; niveau:string; titre:string; enonce:string; correction:string }
type Bloc = { notion:string; theoremes:Thm[]; exercices:Exo[] }
type SC   = { id:string; titre:string; notions:string[]; blocs:Bloc[] }
type Chap = { id:string; titre:string; badge:string; color:string; emoji:string; desc:string; souschapitres:SC[] }

// ══════════════════════════════════════════════════════════════════════
// DONNÉES — 17 CHAPITRES COMPLETS
// ══════════════════════════════════════════════════════════════════════
const ALL_CHAPTERS: Record<string,Chap> = {

// ─────────────────────────────────────────────────────────────────────
// CH 01 — FONCTIONS & GÉNÉRALITÉS
// ─────────────────────────────────────────────────────────────────────
'fonctions-generalites': {
  id:'fonctions-generalites', emoji:'📊', badge:'Analyse', color:'#06d6a0',
  titre:'Fonctions — Généralités',
  desc:"Ensemble de définition, parité, périodicité, restriction, majorant/minorant, fonctions bornées, opérations (somme, produit, quotient, composée), fonctions affines par intervalles.",
  souschapitres:[
    {
      id:'sc-domaine', titre:'1.1 Ensemble de définition et parité',
      notions:['Domaine D_f : exclusions (1/g, √g, ln g)','Parité : f(−x)=f(x) pair / f(−x)=−f(x) impair','Périodicité f(x+T)=f(x)','Restriction d\'une fonction'],
      blocs:[
        {
          notion:'📐 Domaine de définition',
          theoremes:[
            { id:'D-FG1', type:'def', nom:'Ensemble de définition D_f',
              enonce:"D_f = ensemble des x pour lesquels f(x) est définie.\n\nConditions d'exclusion :\n• 1/g(x) : g(x) ≠ 0\n• √g(x) : g(x) ≥ 0\n• ln(g(x)) : g(x) > 0\n• g(x)/h(x) : h(x) ≠ 0\n\nSi plusieurs contraintes : D_f = intersection des conditions.\n\nExemples :\nf(x)=1/√(x−1) → x−1>0 → D_f=]1;+∞[\nf(x)=ln(x²−4) → x²>4 → D_f=]−∞;−2[∪]2;+∞[" },
            { id:'D-FG2', type:'def', nom:'Parité et périodicité',
              enonce:"PARITÉ :\nf paire : D_f symétrique par rapport à 0 et f(−x)=f(x)\n→ Courbe symétrique par rapport à l'axe Oy\n\nf impaire : f(−x)=−f(x)\n→ Courbe symétrique par rapport à l'origine O\n\nMéthode : calculer f(−x) et simplifier.\n\nPÉRIODICITÉ :\nf est T-périodique : f(x+T)=f(x) pour tout x\n→ On étudie f sur [0;T] ou [−T/2;T/2] puis on étend\n\nExemples :\nsin x, cos x : T=2π\ntan x, |sin x| : T=π",
              remarque:"Utilité de la parité : on étudie f sur [0;D] puis on déduit sur [−D;0] par symétrie." },
          ],
          exercices:[
            { id:'EX-FG1', niveau:'Facile', titre:'Domaine de définition',
              enonce:"Trouver D_f pour f(x)=√(x+2)/ln(x).",
              correction:"x+2≥0 → x≥−2\nx>0 (ln défini) et x≠1 (ln(1)=0)\nD_f = ]0;1[∪]1;+∞[." },
            { id:'EX-FG2', niveau:'Facile', titre:'Parité',
              enonce:"f(x)=x³+sin x. Paire, impaire ou ni l'un ni l'autre ?",
              correction:"f(−x)=(−x)³+sin(−x)=−x³−sin x=−(x³+sin x)=−f(x).\nf est impaire." },
            { id:'EX-FG3', niveau:'Intermédiaire', titre:'Domaine complexe',
              enonce:"D_f pour f(x)=ln(x²−1)/√(3−x).",
              correction:"x²−1>0 → x∈]−∞;−1[∪]1;+∞[\n3−x>0 → x<3\nIntersection : x∈]−∞;−1[∪]1;3[." },
          ]
        },
        {
          notion:'⚙️ Opérations sur les fonctions',
          theoremes:[
            { id:'D-FG3', type:'def', nom:'Opérations et fonction composée',
              enonce:"Soit f (domaine D_f) et g (domaine D_g) :\n\nSomme f+g : D_{f+g} = D_f ∩ D_g\nProduit f·g : D_{fg} = D_f ∩ D_g\nQuotient f/g : D_{f/g} = {x∈D_f∩D_g : g(x)≠0}\n\nFonction composée g∘f (lire «g après f») :\n(g∘f)(x) = g(f(x))\nD_{g∘f} = {x∈D_f : f(x)∈D_g}\n\nFonction √f : D = {x : f(x)≥0}\n|f| : définie sur tout D_f\n\nFonction affine par intervalles :\nf(x) = aₖx+bₖ sur [xₖ;xₖ₊₁]  →  tracer morceau par morceau" },
            { id:'D-FG4', type:'def', nom:'Majorant, minorant, borne',
              enonce:"f est majorée sur I : ∃M∈ℝ, ∀x∈I, f(x)≤M\nf est minorée sur I : ∃m∈ℝ, ∀x∈I, f(x)≥m\nf est bornée : majorée ET minorée\n\nSupremum (borne supérieure) = plus petit majorant\nInfimum (borne inférieure) = plus grand minorant\n\nMaximum : valeur atteinte par f sur I (si elle existe)\nMinimum : valeur atteinte par f sur I (si elle existe)",
              remarque:"sin x est bornée sur ℝ : −1≤sin x≤1. Mais eˣ n'est pas majorée sur ℝ." },
          ],
          exercices:[
            { id:'EX-FG4', niveau:'Intermédiaire', titre:'Composée',
              enonce:"f(x)=√x, g(x)=x²−1. Calculer g∘f et f∘g avec leurs domaines.",
              correction:"g∘f(x)=g(√x)=(√x)²−1=x−1, D=D_f=[0;+∞[\nf∘g(x)=f(x²−1)=√(x²−1), D={x : x²≥1}=]−∞;−1]∪[1;+∞[" },
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
  id:'limites-continuite', emoji:'∞', badge:'Analyse', color:'#06d6a0',
  titre:'Limites et Continuité',
  desc:"Limite finie en un réel a, prolongement par continuité, opérations sur les limites, asymptotes (AV, AH, AO), formes indéterminées, croissances comparées, TVI, théorème de la bijection.",
  souschapitres:[
    {
      id:'sc-lim-ops', titre:'2.1 Limites et opérations',
      notions:['Limite en un point et à l\'infini','Opérations sur les limites','Formes indéterminées : 0/0, ∞/∞, ∞−∞','Croissances comparées eˣ≫xⁿ≫ln x'],
      blocs:[
        {
          notion:'∞ Calcul des limites',
          theoremes:[
            { id:'D-LC1', type:'def', nom:'Limite d\'une fonction',
              enonce:"lim(x→a) f(x) = ℓ\n↔ f(x) s'approche de ℓ quand x s'approche de a (x≠a)\n\nLimites à gauche et droite doivent être égales pour que la limite existe.\n\nOPÉRATIONS (ℓ,m finis) :\nlim(f+g)=ℓ+m  ;  lim(f·g)=ℓ·m\nlim(f/g)=ℓ/m si m≠0\n\nCas ∞ : ∞+ℓ=∞ ; ∞×ℓ=∞ si ℓ≠0 ; 1/0=∞ ; 1/∞=0\n\nFORMES INDÉTERMINÉES (à lever) :\n0/0 → factoriser ou conjugué\n∞/∞ → diviser par terme dominant\n∞−∞ → factoriser ou conjugué\n0×∞ → réécrire f/(1/g)" },
            { id:'F-LC1', type:'formule', nom:'Limites fondamentales et croissances comparées',
              enonce:"LIMITES EN 0 :\nlim(x→0) sin x/x = 1\nlim(x→0) (eˣ−1)/x = 1\nlim(x→0) ln(1+x)/x = 1\n\nCROISSANCES COMPARÉES en +∞ :\neˣ ≫ xⁿ ≫ ln x  (pour tout n>0)\n→ lim eˣ/xⁿ = +∞  ;  lim xⁿ/eˣ = 0\n→ lim (ln x)/xᵅ = 0  (α>0)\n→ lim(x→0⁺) x·ln x = 0\n\nTERME DOMINANT (polynômes) :\nlim(x→±∞) aₙxⁿ+…+a₀ = lim aₙxⁿ",
              remarque:"Pour une fraction rationnelle P(x)/Q(x) en ±∞ : diviser par x^(degré max)." },
          ],
          exercices:[
            { id:'EX-LC1', niveau:'Facile', titre:'Limite en 0/0',
              enonce:"Calculer lim(x→2) (x²−4)/(x−2).",
              correction:"=(x+2)(x−2)/(x−2)=x+2 → 4." },
            { id:'EX-LC2', niveau:'Intermédiaire', titre:'Forme ∞−∞',
              enonce:"Calculer lim(x→+∞) [√(x²+3x)−x].",
              correction:"Multiplier par conjugué :\n3x/[√(x²+3x)+x]=3x/[x√(1+3/x)+x]\n=3/[√(1+3/x)+1]→3/2." },
            { id:'EX-LC3', niveau:'Difficile', titre:'Croissances comparées',
              enonce:"Calculer lim(x→+∞) (x³+ln x)/eˣ.",
              correction:"eˣ≫x³ → x³/eˣ→0 ; (ln x)/eˣ→0.\n→ lim=0." },
          ]
        },
      ]
    },
    {
      id:'sc-asymptotes', titre:'2.2 Asymptotes et continuité',
      notions:['Asymptote verticale (AV) x=a','Asymptote horizontale (AH) y=ℓ','Asymptote oblique (AO) y=ax+b','TVI — existence de racines','Théorème de la bijection'],
      blocs:[
        {
          notion:'📏 Asymptotes',
          theoremes:[
            { id:'D-LC2', type:'def', nom:'Asymptotes',
              enonce:"Asymptote Verticale (AV) x=a :\nlim(x→a) |f(x)| = +∞\n\nAsymptote Horizontale (AH) y=ℓ :\nlim(x→±∞) f(x) = ℓ\n\nAsymptote Oblique (AO) y=mx+p :\nm = lim(x→±∞) f(x)/x\np = lim(x→±∞) [f(x)−mx]\n\nPosition de C_f par rapport à l'AO :\nÉtudier le signe de f(x)−(mx+p)\n\nBranche parabolique : lim f(x)/x = ±∞ (pas d'AO)" },
            { id:'T-LC1', type:'thm', nom:'Théorème des Valeurs Intermédiaires (TVI)',
              enonce:"f continue sur [a,b] et k entre f(a) et f(b) :\n∃ c∈[a,b] : f(c)=k\n\nCas pratique (f(a)·f(b)<0) :\n→ ∃ au moins une racine dans ]a,b[\n\nUnicitée : si f est strictement monotone → c unique\n\nDichotomie : m=(a+b)/2\n• f(m)·f(a)<0 → racine dans [a;m]\n• f(m)·f(b)<0 → racine dans [m;b]\nRépéter jusqu'à la précision ε voulue.",
              remarque:"Prolongement par continuité : si lim(x→a)f(x)=ℓ et f non définie en a, on peut poser f(a)=ℓ (on prolonge)." },
            { id:'T-LC2', type:'thm', nom:'Théorème de la bijection',
              enonce:"f continue et strictement monotone sur [a,b] :\n→ f bijection de [a,b] sur [f(a),f(b)] (ou [f(b),f(a)])\n→ ∀k dans l'image, ∃! c∈[a,b] : f(c)=k\n\nApplication : existence et unicité d'une solution à f(x)=k." },
          ],
          exercices:[
            { id:'EX-LC4', niveau:'Intermédiaire', titre:'Asymptote oblique',
              enonce:"f(x)=(x²+2x+3)/(x+1). Trouver l'AO et la position.",
              correction:"Division : (x²+2x+3)÷(x+1)=x+1+2/(x+1).\nAO : y=x+1.\nf(x)−(x+1)=2/(x+1) : >0 si x>−1 (C_f au-dessus), <0 si x<−1 (en-dessous)." },
            { id:'EX-LC5', niveau:'Difficile', titre:'TVI et encadrement',
              enonce:"Montrer que x³−2x−1=0 a une racine dans ]1;2[ et encadrer à 0,1 près.",
              correction:"f(1)=−2<0 ; f(2)=3>0 → ∃c∈]1;2[ (TVI). f croissante (f'=3x²−2>0 sur ]1;2[) → c unique.\nf(1,5)=3,375−3−1=−0,625<0 → c∈]1,5;2[\nf(1,6)=4,096−3,2−1=−0,104<0 → c∈]1,6;2[\nf(1,7)=4,913−3,4−1=0,513>0 → c∈]1,6;1,7[" },
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
  desc:"Nombre dérivé, interprétation géométrique, tangente, approximation affine, dérivées usuelles et règles de calcul (produit, quotient, composée), signe de f'(x), variations, extrema locaux.",
  souschapitres:[
    {
      id:'sc-der-calc', titre:'3.1 Calcul des dérivées',
      notions:['Nombre dérivé f\'(a) — taux d\'accroissement','Tangente y=f\'(a)(x−a)+f(a)','Approximation affine f(x)≈f(a)+f\'(a)(x−a)','Dérivées usuelles et règles composée'],
      blocs:[
        {
          notion:"📐 Nombre dérivé et tangente",
          theoremes:[
            { id:'D-DE1', type:'def', nom:'Nombre dérivé',
              enonce:"f'(a) = lim(h→0) [f(a+h)−f(a)]/h\n     = lim(x→a) [f(x)−f(a)]/(x−a)\n\nInterprétation géométrique :\nf'(a) = pente de la tangente à C_f en M(a,f(a))\n\nTangente en a : y = f'(a)·(x−a) + f(a)\n\nApproximation affine (x proche de a) :\nf(x) ≈ f(a) + f'(a)·(x−a)\n\nf dérivable sur I ↔ f'(a) existe pour tout a∈I\nf dérivable → f continue (mais pas l'inverse)" },
            { id:'F-DE1', type:'formule', nom:'Dérivées usuelles',
              enonce:"(c)' = 0  (constante)\n(xⁿ)' = n·xⁿ⁻¹\n(√x)' = 1/(2√x)\n(1/x)' = −1/x²\n(eˣ)' = eˣ\n(ln x)' = 1/x  (x>0)\n(sin x)' = cos x\n(cos x)' = −sin x\n(tan x)' = 1/cos²x = 1+tan²x" },
            { id:'F-DE2', type:'formule', nom:'Règles de dérivation',
              enonce:"(u+v)' = u'+v'\n(ku)' = k·u'  (k constante)\n(uv)' = u'v + uv'\n(u/v)' = (u'v − uv')/v²\n(f∘g)' = (f'∘g)·g'  ← règle de la chaîne\n\nFormules chaîne (très utilisées en Sc.Exp.) :\n(uⁿ)' = n·u'·uⁿ⁻¹\n(√u)' = u'/(2√u)\n(eᵘ)' = u'·eᵘ\n(ln u)' = u'/u",
              remarque:"En Sc.Exp., les dérivées de composées (eᵘ)', (ln u)', (√u)' sont les plus fréquentes au Bac : maîtriser la règle de la chaîne est essentiel." },
          ],
          exercices:[
            { id:'EX-DE1', niveau:'Facile', titre:'Dérivée composée',
              enonce:"f(x)=√(x²+1). Calculer f'(x).",
              correction:"u=x²+1, u'=2x.\nf'(x)=2x/(2√(x²+1))=x/√(x²+1)." },
            { id:'EX-DE2', niveau:'Facile', titre:'Tangente',
              enonce:"f(x)=x²−3x. Tangente en x=2.",
              correction:"f(2)=4−6=−2. f'(x)=2x−3, f'(2)=1.\ny=1·(x−2)+(−2)=x−4." },
            { id:'EX-DE3', niveau:'Intermédiaire', titre:'Règle du quotient',
              enonce:"f(x)=(x²+1)/(2x−1). Calculer f'(x).",
              correction:"u=x²+1, u'=2x ; v=2x−1, v'=2.\nf'(x)=(2x(2x−1)−2(x²+1))/(2x−1)²\n=(4x²−2x−2x²−2)/(2x−1)²\n=(2x²−2x−2)/(2x−1)²." },
          ]
        },
      ]
    },
    {
      id:'sc-der-variations', titre:'3.2 Variations et extrema',
      notions:['f\'(x)>0 → f croissante','f\'(x)<0 → f décroissante','Extremum local : f\'(a)=0 et changement de signe','Tableau de variations complet'],
      blocs:[
        {
          notion:'📈 Signe de f\' et tableau de variations',
          theoremes:[
            { id:'P-DE1', type:'prop', nom:'Monotonie et extrema locaux',
              enonce:"f dérivable sur ]a,b[ :\n• f'(x)>0 sur ]a,b[ → f strictement croissante sur ]a,b[\n• f'(x)<0 sur ]a,b[ → f strictement décroissante sur ]a,b[\n• f'(x)=0 sur ]a,b[ → f constante\n\nEXTREMUM LOCAL en α :\nf'(α)=0 ET f' change de signe en α\n• f' passe de + à − : maximum local f(α)\n• f' passe de − à + : minimum local f(α)\n\nRÈGLE : si f'(α)=0 mais f' ne change pas de signe → pas d'extremum (point d'inflexion à tangente horizontale)",
              remarque:"Extremum global : comparer tous les extrema locaux et les valeurs aux bornes du domaine." },
            { id:'M-DE1', type:'methode', nom:'Dresser un tableau de variations',
              enonce:"1. Calculer f'(x) et le factoriser\n2. Résoudre f'(x)=0 → trouver les zéros\n3. Étudier le signe de f'(x) entre les zéros\n4. En déduire le sens de variation\n5. Calculer f aux points critiques et aux bornes\n6. Remplir le tableau\n\nFormat :\nx  | a    α₁      α₂    b\nf' | (−)  0  (+)   0  (−)\nf  | ↘   min  ↗   max  ↘" },
          ],
          exercices:[
            { id:'EX-DE4', niveau:'Intermédiaire', titre:'Tableau complet',
              enonce:"f(x)=x³−3x²−9x+5. Dresser le tableau de variations sur ℝ.",
              correction:"f'(x)=3x²−6x−9=3(x²−2x−3)=3(x−3)(x+1).\nf'=0 en x=−1 et x=3.\nf'(x)>0 sur ]−∞;−1[ et ]3;+∞[ ; f'(x)<0 sur ]−1;3[.\nf(−1)=10 (max local) ; f(3)=−22 (min local)." },
            { id:'EX-DE5', niveau:'Difficile', titre:'Extremum global',
              enonce:"f(x)=xe^(−x) sur [0;3]. Trouver le maximum global.",
              correction:"f'(x)=e^(−x)−xe^(−x)=e^(−x)(1−x).\nf'=0 en x=1. f'>0 sur ]0;1[, f'<0 sur ]1;3[.\nMax local en x=1 : f(1)=1/e.\nBornes : f(0)=0, f(3)=3e^(−3)≈0,149.\n1/e≈0,368>0,149 → maximum global en x=1 : f(1)=1/e." },
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
  id:'etude-fonctions', emoji:'🔬', badge:'Analyse', color:'#06d6a0',
  titre:'Étude de Fonctions',
  desc:"Étude complète de fonctions polynômes (deg 1,2,3, bicarrées), rationnelles (3 types), irrationnelles (√(ax+b), √(ax²+bx+c)), circulaires (sin, cos, tan).",
  souschapitres:[
    {
      id:'sc-methode-complete', titre:'4.1 Méthode d\'étude complète',
      notions:['1. Domaine 2. Parité 3. Limites/asymptotes','4. Dérivée et variations 5. Extrema','6. Representation graphique','Position par rapport à une droite'],
      blocs:[
        {
          notion:'📋 Plan d\'étude systématique',
          theoremes:[
            { id:'P-EF1', type:'prop', nom:'Plan d\'étude complète d\'une fonction',
              enonce:"1. DOMAINE D_f : conditions d'existence\n\n2. PARITÉ : calculer f(−x)\n   pair → symétrie Oy / impair → symétrie O\n\n3. LIMITES AUX BORNES → asymptotes (AV, AH, AO)\n\n4. DÉRIVÉE f'(x) :\n   → Calculer, factoriser\n   → Signe de f'(x)\n   → Tableau de variations\n\n5. EXTREMA : valeurs aux points critiques\n\n6. POINTS REMARQUABLES : calculer f(0), quelques autres\n\n7. REPRÉSENTATION GRAPHIQUE :\n   → Placer les asymptotes\n   → Tracer C_f en respectant les variations" },
          ],
          exercices:[
            { id:'EX-EF1', niveau:'Intermédiaire', titre:'Étude d\'une rationnelle',
              enonce:"Étudier f(x)=(x²+x−2)/(x−1). Domaine, AV éventuelle, AO, variations.",
              correction:"𝒟_f=ℝ\\{1}.\nFactorisation : (x+2)(x−1)/(x−1)=x+2 si x≠1.\nC_f : droite y=x+2 avec trou en x=1.\nPas d'AV (la singularité est levable). AO y=x+2 n'est pas une asymptote ici car f se prolonge." },
          ]
        },
      ]
    },
    {
      id:'sc-types-fonctions', titre:'4.2 Types de fonctions',
      notions:['Polynômes : ax³+bx²+cx+d, bicarrées ax⁴+bx²+c','Rationnelles : P(x)/Q(x) selon les degrés','Irrationnelles : √(ax+b), √(ax²+bx+c)','Circulaires : sin(ax+b), cos(ax+b), tan x'],
      blocs:[
        {
          notion:'📊 Polynômes et rationnelles',
          theoremes:[
            { id:'D-EF1', type:'def', nom:'Fonctions polynômes — types',
              enonce:"DEGRÉ 1 : f(x)=ax+b → droite, toujours monotone\nDEGRÉ 2 : f(x)=ax²+bx+c → parabole, vertex en x=−b/2a\nDEGRÉ 3 : f(x)=ax³+bx²+cx+d → 0, 1 ou 2 extrema\n\nBICARRÉE : f(x)=ax⁴+bx²+c\nPoser X=x² → g(X)=aX²+bX+c (étudier pour X≥0)\nf paire → symétrie par rapport à Oy\n\nFONCTIONS RATIONNELLES :\nType 1 : (ax+b)/(cx+d) → AV x=−d/c, AH y=a/c\nType 2 : (ax²+bx+c)/(dx+e) → AV, AO (degré num = dég dénom +1)\nType 3 : (ax²+bx+c)/(dx²+ex+f) → AH y=a/d" },
            { id:'D-EF2', type:'def', nom:'Fonctions irrationnelles et circulaires',
              enonce:"IRRATIONNELLES :\n√(ax+b) : D=[−b/a;+∞[ si a>0. Dérivée : a/(2√(ax+b))\n√(ax²+bx+c) : D={x : ax²+bx+c≥0}. Dérivée : (2ax+b)/(2√(...))\n\nCirculaires (rappels) :\nsin x : D=ℝ, Im=[−1;1], T=2π\ncos x : D=ℝ, Im=[−1;1], T=2π, paire\ntan x : D=ℝ\\{π/2+kπ}, T=π, impaire\n\nf(x)=sin(ax+b) : T=2π/a, même propriétés\n\nPériodicité : étudier sur une période puis déduire",
              remarque:"En Sc.Exp., les fonctions eˣ et ln x apparaissent très fréquemment dans les études complètes (ex : f(x)=x·eˣ, f(x)=ln x / x)." },
          ],
          exercices:[
            { id:'EX-EF2', niveau:'Facile', titre:'Bicarrée',
              enonce:"f(x)=x⁴−5x²+4. Domaine, racines, variations.",
              correction:"Poser X=x² : X²−5X+4=(X−1)(X−4)=0 → X=1 ou X=4.\nx=±1 ou x=±2.\nf'(x)=4x³−10x=2x(2x²−5)=0 → x=0 ou x=±√(5/2).\nMin en 0 : f(0)=4 ; Max en ±√2,5 ; Min en ±√2,5... (bicarrée paire)." },
            { id:'EX-EF3', niveau:'Intermédiaire', titre:'Irrationnelle complète',
              enonce:"Étudier f(x)=√(x²−4) : domaine, symétrie, variations, asymptotes.",
              correction:"x²−4≥0 → D=]−∞;−2]∪[2;+∞[.\nf(−x)=√(x²−4)=f(x) → paire.\nf'(x)=x/√(x²−4) ; f'>0 sur ]2;+∞[, f'<0 sur ]−∞;−2[.\nMin en ±2 : f(2)=0.\nlim(x→+∞)[f(x)−x]=lim[(x²−4−x²)/f+x]=−4/[+∞]=0... non, développer.\nlim(x→+∞) f(x)/x=1, b=lim[√(x²−4)−x]=[x²−4−x²]/[√(x²−4)+x]=−4/[...]=0.\nAO : y=x et y=−x (branches asymptotiques)." },
          ]
        },
      ]
    },
  ]
},

// ─────────────────────────────────────────────────────────────────────
// CH 05 — SUITES NUMÉRIQUES
// ─────────────────────────────────────────────────────────────────────
'suites': {
  id:'suites', emoji:'uₙ', badge:'Analyse', color:'#06d6a0',
  titre:'Suites Numériques',
  desc:"Comportement global (monotonie, bornitude), suites arithmétiques, géométriques, récurrentes (affines et homographiques), limite d'une suite, théorème des gendarmes, principe de récurrence.",
  souschapitres:[
    {
      id:'sc-arith-geo', titre:'5.1 Suites arithmétiques et géométriques',
      notions:['Arithmétique : uₙ₊₁=uₙ+r, terme général, somme','Géométrique : uₙ₊₁=q·uₙ, terme général, somme','Comportement à l\'infini selon q','Reconnaître le type par quotient ou différence'],
      blocs:[
        {
          notion:'📈 Suites classiques',
          theoremes:[
            { id:'D-SU1', type:'def', nom:'Arithmétique et géométrique',
              enonce:"ARITHMÉTIQUE (raison r) : uₙ₊₁=uₙ+r\n→ uₙ=u₀+nr  (terme général)\n→ Somme S=n·(u₀+uₙ₋₁)/2=n·(2u₀+(n−1)r)/2\n→ lim : si r>0 → +∞ ; r<0 → −∞ ; r=0 → constante\n\nGÉOMÉTRIQUE (raison q≠0) : uₙ₊₁=q·uₙ\n→ uₙ=u₀·qⁿ  (terme général)\n→ Somme S=u₀·(1−qⁿ)/(1−q)  si q≠1\n→ Comportement :\n  |q|<1 → 0\n  q=1   → u₀ (constante)\n  q>1   → +∞\n  q<−1  → diverge par oscillation\n\nRECONNAÎTRE :\nArith. ↔ uₙ₊₁−uₙ = constante\nGéom. ↔ uₙ₊₁/uₙ = constante (uₙ≠0)",
              remarque:"Somme des n premiers entiers : 1+2+…+n=n(n+1)/2. Somme géom. infinie : Σqⁿ=1/(1−q) si |q|<1." },
          ],
          exercices:[
            { id:'EX-SU1', niveau:'Facile', titre:'Suite géométrique',
              enonce:"u₀=3, q=2. Calculer u₅ et S₅ (somme des 6 premiers termes).",
              correction:"u₅=3×2⁵=96.\nS₅=3×(1−2⁶)/(1−2)=3×(−63)/(−1)=189." },
            { id:'EX-SU2', niveau:'Intermédiaire', titre:'Reconnaître le type',
              enonce:"uₙ=3n+5. Arithmétique ou géométrique ? Trouver u₀, r ou q.",
              correction:"uₙ₊₁−uₙ=(3(n+1)+5)−(3n+5)=3=constante.\nArithmétique de raison r=3.\nu₀=5, u₁=8." },
          ]
        },
      ]
    },
    {
      id:'sc-recurrentes', titre:'5.2 Suites récurrentes et convergence',
      notions:['Suite affine uₙ₊₁=auₙ+b : point fixe, uₙ=ℓ+(u₀−ℓ)aⁿ','Suite homographique : deux points fixes','Monotonie et convergence','Théorème des gendarmes','Principe de récurrence'],
      blocs:[
        {
          notion:'🔄 Suites affines et convergence',
          theoremes:[
            { id:'M-SU1', type:'methode', nom:'Résolution de uₙ₊₁=auₙ+b',
              enonce:"1. Point fixe : ℓ=aℓ+b → ℓ=b/(1−a)  (si a≠1)\n\n2. vₙ=uₙ−ℓ :\n   vₙ₊₁=auₙ+b−ℓ=a(uₙ−ℓ)=a·vₙ\n   → vₙ géométrique de raison a\n   → vₙ=(u₀−ℓ)·aⁿ\n\n3. uₙ = ℓ + (u₀−ℓ)·aⁿ\n\nCONVERGENCE :\n|a|<1 : uₙ→ℓ\na=1  : uₙ=u₀+nb (arithmétique)\na>1  : |uₙ|→+∞ (diverge)",
              remarque:"Si a=−1 : uₙ oscille entre u₀ et 2ℓ−u₀ sans converger." },
            { id:'T-SU1', type:'thm', nom:'Suite monotone bornée et gendarmes',
              enonce:"Suite croissante et majorée → converge vers sa borne sup.\nSuite décroissante et minorée → converge vers sa borne inf.\n\nThéorème des gendarmes :\nuₙ≤vₙ≤wₙ et lim uₙ=lim wₙ=ℓ → lim vₙ=ℓ\n\nMONOTONIE :\nMéthode 1 : signe de uₙ₊₁−uₙ\nMéthode 2 : signe de uₙ₊₁/uₙ−1 (si uₙ>0)" },
            { id:'T-SU2', type:'thm', nom:'Principe de récurrence',
              enonce:"Pour montrer P(n) pour tout n≥n₀ :\n1. Initialisation : vérifier P(n₀)\n2. Hérédité : supposer P(n) → montrer P(n+1)\n→ P(n) vraie pour tout n≥n₀\n\nApplications fréquentes :\n• Prouver uₙ>0 pour tout n\n• Prouver uₙ<M pour tout n (majoration)\n• Prouver uₙ≤uₙ₊₁ (monotonie)" },
          ],
          exercices:[
            { id:'EX-SU3', niveau:'Facile', titre:'Suite affine',
              enonce:"uₙ₊₁=(1/2)uₙ+3, u₀=0. Exprimer uₙ et trouver la limite.",
              correction:"ℓ=3/(1−1/2)=6. vₙ=uₙ−6.\nvₙ=(0−6)·(1/2)ⁿ=−6·(1/2)ⁿ.\nuₙ=6−6·(1/2)ⁿ=6(1−(1/2)ⁿ).\n|1/2|<1 → lim uₙ=6." },
            { id:'EX-SU4', niveau:'Intermédiaire', titre:'Monotonie par récurrence',
              enonce:"uₙ₊₁=(1/2)uₙ+3, u₀=0. Montrer par récurrence que 0≤uₙ≤6.",
              correction:"n=0 : 0≤0≤6 ✓\nHérédité : si 0≤uₙ≤6 :\n(1/2)·0+3=3≤uₙ₊₁≤(1/2)·6+3=6.\nEt 3≥0, donc 0≤uₙ₊₁≤6 ✓" },
            { id:'EX-SU5', niveau:'Difficile', titre:'Suite homographique',
              enonce:"uₙ₊₁=2uₙ/(uₙ+1), u₀=2. Étudier la convergence.",
              correction:"Points fixes : ℓ=2ℓ/(ℓ+1) → ℓ(ℓ+1)=2ℓ → ℓ²=ℓ → ℓ=0 ou ℓ=1.\nvₙ=(uₙ−0)/(uₙ−1)=uₙ/(uₙ−1).\nvₙ₊₁=[2uₙ/(uₙ+1)]/[2uₙ/(uₙ+1)−1]=[2uₙ]/[uₙ−1]=2vₙ.\nRaison 2>1 → vₙ→±∞ → uₙ→1." },
          ]
        },
      ]
    },
  ]
},

// ─────────────────────────────────────────────────────────────────────
// CH 12 — VECTEURS DE L'ESPACE
// ─────────────────────────────────────────────────────────────────────
'vecteurs-espace': {
  id:'vecteurs-espace', emoji:'🧊', badge:'Géométrie', color:'#4f6ef7',
  titre:"Vecteurs de l'Espace",
  desc:"Vecteurs de l'espace (composantes, opérations, coplanarité), produit scalaire dans l'espace (définition, propriétés, orthogonalité), produit vectoriel (définition, propriétés, applications géométriques).",
  souschapitres:[
    {
      id:'sc-vect-ops', titre:'6.1 Vecteurs et produit scalaire',
      notions:['Composantes u⃗(a;b;c), module |u⃗|','Coplanarité : det(u⃗,v⃗,w⃗)=0','Produit scalaire u⃗·v⃗=aa\'+bb\'+cc\'','Orthogonalité u⃗·v⃗=0, angle θ'],
      blocs:[
        {
          notion:'🔷 Vecteurs dans l\'espace',
          theoremes:[
            { id:'D-VE1', type:'def', nom:'Vecteurs dans l\'espace — opérations',
              enonce:"Dans le repère orthonormé (O;i⃗;j⃗;k⃗) :\nu⃗(a;b;c) ;  |u⃗|=√(a²+b²+c²)\n\nAddition : u⃗+v⃗=(a+a';b+b';c+c')\nMultiplication scalaire : λu⃗=(λa;λb;λc)\n\nColinéarité u⃗∥v⃗ : ∃λ, u⃗=λv⃗  ↔  a/a'=b/b'=c/c'\n\nCOPLANARITÉ de u⃗,v⃗,w⃗ :\ndet(u⃗,v⃗,w⃗) = | a  b  c  |\n               | a' b' c' | = 0\n               | a'' b'' c''|\nEquivalent : w⃗ = αu⃗ + βv⃗ (w⃗ combinaison linéaire)" },
            { id:'F-VE1', type:'formule', nom:'Produit scalaire dans l\'espace',
              enonce:"u⃗(a;b;c)·v⃗(a';b';c') = aa'+bb'+cc'\n\nFormule géométrique :\nu⃗·v⃗ = |u⃗|·|v⃗|·cosθ\n\nOrthogonalité : u⃗·v⃗=0 ↔ θ=π/2\n\nPropriétés :\n(u⃗+v⃗)·w⃗ = u⃗·w⃗+v⃗·w⃗\nλu⃗·v⃗ = λ(u⃗·v⃗)\n|u⃗|² = u⃗·u⃗\n\nDistance AB = |AB⃗| = √(Σ(xB−xA)²)" },
          ],
          exercices:[
            { id:'EX-VE1', niveau:'Facile', titre:'Produit scalaire',
              enonce:"u⃗(2;−1;3), v⃗(1;4;−1). Calculer u⃗·v⃗ et l'angle.",
              correction:"u⃗·v⃗=2+(-4)+(-3)=−5.\n|u⃗|=√(4+1+9)=√14 ; |v⃗|=√(1+16+1)=√18.\ncosθ=−5/(√14·√18)=−5/√252≈−0,315.\nθ≈108°." },
            { id:'EX-VE2', niveau:'Intermédiaire', titre:'Coplanarité',
              enonce:"u⃗(1;2;1), v⃗(0;1;−1), w⃗(3;5;a). Trouver a pour coplanarité.",
              correction:"det=|1,2,1;0,1,−1;3,5,a|\n=1(a+5)−2(0+3)+1(0−3)\n=a+5−6−3=a−4=0 → a=4." },
          ]
        },
      ]
    },
    {
      id:'sc-produit-vect', titre:'6.2 Produit vectoriel',
      notions:['Définition u⃗∧v⃗ : perpendiculaire à u⃗ et v⃗','|u⃗∧v⃗|=|u⃗||v⃗|sinθ = aire du parallélogramme','Applications : normale à un plan, volume tétraèdre'],
      blocs:[
        {
          notion:'✖️ Produit vectoriel',
          theoremes:[
            { id:'F-VE2', type:'formule', nom:'Produit vectoriel',
              enonce:"u⃗(a₁;b₁;c₁) ∧ v⃗(a₂;b₂;c₂) =\n(b₁c₂−c₁b₂ ; c₁a₂−a₁c₂ ; a₁b₂−b₁a₂)\n\nPropriétés :\n• u⃗∧v⃗ ⊥ u⃗  et  u⃗∧v⃗ ⊥ v⃗\n• v⃗∧u⃗ = −u⃗∧v⃗  (anti-commutatif)\n• u⃗∧u⃗ = 0⃗\n• |u⃗∧v⃗| = |u⃗|·|v⃗|·sinθ\n\nApplications géométriques :\nAire du parallélogramme (A,B,C,D) = |AB⃗∧AD⃗|\nAire du triangle ABC = (1/2)|AB⃗∧AC⃗|\nVolume du tétraèdre ABCD = (1/6)|det(AB⃗,AC⃗,AD⃗)|",
              remarque:"Le produit vectoriel donne directement un vecteur normal au plan : utile pour l'équation d'un plan passant par 3 points." },
          ],
          exercices:[
            { id:'EX-VE3', niveau:'Intermédiaire', titre:'Produit vectoriel et aire',
              enonce:"A(1;0;0), B(0;2;0), C(0;0;3). Calculer AB⃗∧AC⃗ et l'aire du triangle.",
              correction:"AB⃗=(−1;2;0), AC⃗=(−1;0;3).\nAB⃗∧AC⃗=(2×3−0×0; 0×(−1)−(−1)×3; (−1)×0−2×(−1))\n=(6;3;2).\nAire=½|AB⃗∧AC⃗|=½√(36+9+4)=½√49=7/2." },
          ]
        },
      ]
    },
  ]
},

// ─────────────────────────────────────────────────────────────────────
// CH 13 — DROITES ET PLANS DANS L'ESPACE
// ─────────────────────────────────────────────────────────────────────
'droites-plans-espace': {
  id:'droites-plans-espace', emoji:'📐', badge:'Géométrie', color:'#4f6ef7',
  titre:"Droites & Plans dans l'Espace",
  desc:"Droites dans l'espace (représentation paramétrique et cartésienne), plans (équation cartésienne et paramétrique), positions relatives, distances point-plan et point-droite, sphères.",
  souschapitres:[
    {
      id:'sc-plans', titre:'7.1 Plans et droites — Équations',
      notions:['Plan ax+by+cz+d=0 : normale n⃗(a;b;c)','Droite : {x=x₀+at ; y=y₀+bt ; z=z₀+ct}','Positions relatives droite-plan, plan-plan','Angle entre deux plans : cosθ=|n⃗₁·n⃗₂|/(|n⃗₁||n⃗₂|)'],
      blocs:[
        {
          notion:'🗂️ Équations de droites et plans',
          theoremes:[
            { id:'F-DP1', type:'formule', nom:'Plan dans l\'espace',
              enonce:"Plan passant par A₀(x₀;y₀;z₀) de normale n⃗(a;b;c) :\na(x−x₀)+b(y−y₀)+c(z−z₀)=0\nForme générale : ax+by+cz+d=0\n\nPlan par 3 points A,B,C non alignés :\nn⃗=AB⃗∧AC⃗ puis équation avec A\n\nPlan paramétrique :\nM=A+su⃗+tv⃗  (s,t∈ℝ, u⃗,v⃗ non colinéaires dans le plan)\n\nPositions plan-plan :\nParallèles : n⃗₁∥n⃗₂ (normales colinéaires)\nSécants : n⃗₁∦n⃗₂ → intersection = droite\nAngle dièdre : cosθ=|n⃗₁·n⃗₂|/(|n⃗₁|·|n⃗₂|)" },
            { id:'F-DP2', type:'formule', nom:'Droite dans l\'espace',
              enonce:"Droite (A,u⃗) — forme paramétrique :\n{x=x₀+at ; y=y₀+bt ; z=z₀+ct}  t∈ℝ\n\nPositions droite-plan :\nu⃗·n⃗=0 et A∉plan → droite ∥ plan\nu⃗·n⃗=0 et A∈plan  → droite ⊂ plan\nu⃗·n⃗≠0 → intersection (un point) : substituer la paramétr. dans l'éq. du plan\n\nAngle droite-plan :\nsinα=|u⃗·n⃗|/(|u⃗|·|n⃗|)  (α∈[0;π/2])" },
          ],
          exercices:[
            { id:'EX-DP1', niveau:'Facile', titre:'Équation d\'un plan',
              enonce:"Plan par A(1;2;3) de normale n⃗(2;−1;1). Équation.",
              correction:"2(x−1)−1(y−2)+1(z−3)=0\n2x−y+z−3=0." },
            { id:'EX-DP2', niveau:'Intermédiaire', titre:'Intersection droite-plan',
              enonce:"D:{x=1+2t;y=−t;z=2+t}. Plan P:x+y−z+1=0.",
              correction:"(1+2t)+(−t)−(2+t)+1=0\n1+2t−t−2−t+1=0\n0=0 → infinité de solutions.\nLa droite est contenue dans le plan." },
            { id:'EX-DP3', niveau:'Difficile', titre:'Plan par 3 points',
              enonce:"Trouver l'équation du plan par A(1;0;0), B(0;2;0), C(0;0;3).",
              correction:"AB⃗=(−1;2;0), AC⃗=(−1;0;3).\nn⃗=AB⃗∧AC⃗=(6;3;2).\n6(x−1)+3(y)+2(z)=0 → 6x+3y+2z=6.\nOu : x/1+y/2+z/3=1." },
          ]
        },
      ]
    },
    {
      id:'sc-distances-spheres', titre:'7.2 Distances et sphères',
      notions:['Distance point-plan : d=|ax₀+by₀+cz₀+d|/√(a²+b²+c²)','Projeté orthogonal sur un plan','Sphère : (x−a)²+(y−b)²+(z−c)²=r²','Intersection sphère-plan, sphère-droite'],
      blocs:[
        {
          notion:'📏 Distances dans l\'espace et sphères',
          theoremes:[
            { id:'F-DP3', type:'formule', nom:'Distances dans l\'espace',
              enonce:"Distance du point M₀(x₀;y₀;z₀) au plan ax+by+cz+d=0 :\nd = |ax₀+by₀+cz₀+d| / √(a²+b²+c²)\n\nProjeté orthogonal H de M sur le plan :\nH = M + t₀·n⃗  où  t₀ = −(ax₀+by₀+cz₀+d)/(a²+b²+c²)\n\nDistance entre plans parallèles ax+by+cz+d₁=0 et …+d₂=0 :\nd = |d₁−d₂| / √(a²+b²+c²)" },
            { id:'D-SP1', type:'def', nom:'Sphère — équation et intersections',
              enonce:"Sphère de centre Ω(a;b;c) et rayon r>0 :\n(x−a)²+(y−b)²+(z−c)²=r²\n\nForme développée : x²+y²+z²+Ax+By+Cz+D=0\nCentre=(-A/2;−B/2;−C/2)\nr=√(A²/4+B²/4+C²/4−D)\n\nIntersection sphère-plan :\n→ Calculer d=dist(centre,plan)\n• d>r : pas d'intersection\n• d=r : cercle de rayon 0 (point de tangence)\n• d<r : cercle de rayon ρ=√(r²−d²)\n\nIntersection sphère-droite :\nSubstituer la paramétr. dans l'éq. de la sphère → équation en t",
              remarque:"Toute sphère peut aussi être définie par : {M : d(M,Ω)=r}" },
          ],
          exercices:[
            { id:'EX-DP4', niveau:'Intermédiaire', titre:'Distance point-plan',
              enonce:"Distance de M(2;1;3) au plan 2x−y+2z−1=0.",
              correction:"d=|2×2−1+2×3−1|/√(4+1+4)=|4−1+6−1|/3=8/3." },
            { id:'EX-DP5', niveau:'Difficile', titre:'Intersection sphère-plan',
              enonce:"Sphère Σ: centre Ω(0;0;0), r=5. Plan P:3x+4y=15. Intersection ?",
              correction:"d=|3(0)+4(0)−15|/√(9+16)=15/5=3.\nd=3<r=5 → intersection = cercle.\nρ=√(25−9)=√16=4." },
          ]
        },
      ]
    },
  ]
},

// ─────────────────────────────────────────────────────────────────────
// CH 14 — DÉNOMBREMENT
// ─────────────────────────────────────────────────────────────────────
'denombrement': {
  id:'denombrement', emoji:'🔢', badge:'Probabilités', color:'#f5c842',
  titre:'Dénombrement',
  desc:"Applications d'un ensemble fini (nombre d'applications, injections, surjections), arrangements Aₙᵖ, permutations n!, combinaisons Cₙᵖ, formule du binôme de Newton.",
  souschapitres:[
    {
      id:'sc-arrangements', titre:'8.1 Arrangements et permutations',
      notions:['Arrangement Aₙᵖ=n!/(n−p)! (ordre compte)','Permutation : Aₙⁿ=n!','Principe multiplicatif','Nombre total d\'applications E→F : |F|^|E|'],
      blocs:[
        {
          notion:'🎯 Arrangements et permutations',
          theoremes:[
            { id:'D-DN1', type:'def', nom:'Arrangements et permutations',
              enonce:"PRINCIPE MULTIPLICATIF :\nSi on fait k choix successifs (n₁, n₂, …, nₖ possibilités indépendantes) :\nNombre total = n₁×n₂×…×nₖ\n\nARRANGEMENT Aₙᵖ :\nNombre de p-listes d'éléments distincts de {1,…,n} (ordre compte)\nAₙᵖ = n!/(n−p)! = n×(n−1)×…×(n−p+1)\n\nPERMUTATION (p=n) :\nAₙⁿ = n! = n×(n−1)×…×2×1\n\nNOMBRE D'APPLICATIONS :\n|F|^|E| (toutes applications de E dans F)\nInjections : Aₙᵖ (si p=|E|, n=|F|, n≥p)",
              remarque:"Factorial : 0!=1, 1!=1, 2!=2, 3!=6, 4!=24, 5!=120, 6!=720, 7!=5040." },
          ],
          exercices:[
            { id:'EX-DN1', niveau:'Facile', titre:'Arrangement',
              enonce:"Combien de mots de 3 lettres distincts peut-on former avec les 26 lettres de l'alphabet ?",
              correction:"A₂₆³=26×25×24=15 600." },
            { id:'EX-DN2', niveau:'Intermédiaire', titre:'Permutation avec contrainte',
              enonce:"Anagrammes de MATHS (5 lettres distinctes). Combien commencent par M ?",
              correction:"M fixé en 1ère position : 4!=24 anagrammes." },
          ]
        },
      ]
    },
    {
      id:'sc-combinaisons', titre:'8.2 Combinaisons et binôme de Newton',
      notions:['Cₙᵖ=n!/[p!(n−p)!] (ordre ne compte pas)','Cₙᵖ=Cₙⁿ⁻ᵖ, Cₙ⁰=Cₙⁿ=1','Formule de Pascal : Cₙᵖ=Cₙ₋₁ᵖ⁻¹+Cₙ₋₁ᵖ','Binôme de Newton : (a+b)ⁿ=Σ Cₙᵏ aᵏ bⁿ⁻ᵏ'],
      blocs:[
        {
          notion:'📊 Combinaisons et binôme',
          theoremes:[
            { id:'F-DN1', type:'formule', nom:'Combinaisons',
              enonce:"Cₙᵖ = n! / [p!·(n−p)!]  =  Aₙᵖ / p!\n\nNombre de p-sous-ensembles de {1,…,n} (ordre ne compte PAS)\n\nPropriétés :\nCₙ⁰ = Cₙⁿ = 1\nCₙ¹ = n\nCₙᵖ = Cₙⁿ⁻ᵖ  (symétrie)\nFormule de Pascal : Cₙᵖ = Cₙ₋₁ᵖ⁻¹ + Cₙ₋₁ᵖ\n\nTriangle de Pascal :\nn=0 :    1\nn=1 :   1 1\nn=2 :  1 2 1\nn=3 : 1 3 3 1\nn=4 :1 4 6 4 1" },
            { id:'T-DN1', type:'thm', nom:'Binôme de Newton',
              enonce:"(a+b)ⁿ = Σₖ₌₀ⁿ Cₙᵏ · aᵏ · bⁿ⁻ᵏ\n\nDéveloppements usuels :\n(a+b)² = a²+2ab+b²\n(a+b)³ = a³+3a²b+3ab²+b³\n(a+b)⁴ = a⁴+4a³b+6a²b²+4ab³+b⁴\n\nSommes remarquables :\nΣₖ Cₙᵏ = 2ⁿ  (poser a=b=1)\nΣₖ (−1)ᵏCₙᵏ = 0  (poser a=1,b=−1)\n\nTerme général : Cₙᵏ · aᵏ · bⁿ⁻ᵏ (terme de rang k)",
              remarque:"Utiliser Cₙᵖ=Cₙⁿ⁻ᵖ pour calculer rapidement : C₁₀⁸=C₁₀²=45." },
          ],
          exercices:[
            { id:'EX-DN3', niveau:'Facile', titre:'Calcul de combinaison',
              enonce:"Calculer C₁₀⁴.",
              correction:"C₁₀⁴=10!/(4!×6!)=10×9×8×7/(4×3×2×1)=5040/24=210." },
            { id:'EX-DN4', niveau:'Intermédiaire', titre:'Binôme — terme général',
              enonce:"Dans (2x+1/x)⁶, trouver le terme indépendant de x.",
              correction:"Terme général : C₆ᵏ·(2x)ᵏ·(1/x)^(6−k)=C₆ᵏ·2ᵏ·x^(2k−6).\nIndépendant de x : 2k−6=0 → k=3.\nTerme : C₆³·2³=20×8=160." },
            { id:'EX-DN5', niveau:'Difficile', titre:'Dénombrement combiné',
              enonce:"Dans un groupe de 12 étudiants (7F+5G), combien de comités de 4 ont au moins une femme ?",
              correction:"Total : C₁₂⁴=495.\nSans femme (que G) : C₅⁴=5.\nAu moins une F = 495−5=490." },
          ]
        },
      ]
    },
  ]
},

// ─────────────────────────────────────────────────────────────────────
// CH 15 — PROBABILITÉS
// ─────────────────────────────────────────────────────────────────────
'probabilites': {
  id:'probabilites', emoji:'🎲', badge:'Probabilités', color:'#f5c842',
  titre:'Probabilités',
  desc:"Probabilité sur un ensemble fini, équiprobabilité, réunion P(A∪B), probabilité conditionnelle P(A|B), indépendance, formule des probabilités totales, formule de Bayes.",
  souschapitres:[
    {
      id:'sc-proba-base', titre:'9.1 Probabilités — Bases',
      notions:['Espace probabilisé (Ω, P)','P(A∪B)=P(A)+P(B)−P(A∩B)','Équiprobabilité : P(A)=card(A)/card(Ω)','Événements incompatibles, contraires'],
      blocs:[
        {
          notion:'🎯 Vocabulaire et calculs de base',
          theoremes:[
            { id:'D-PR1', type:'def', nom:'Espace probabilisé',
              enonce:"Expérience aléatoire : résultat imprévisible\nΩ = univers (ensemble de tous les résultats possibles)\nÉvénement A ⊂ Ω : sous-ensemble de Ω\n\nPROBABILITÉ P sur Ω :\n• P(Ω)=1  et  P(∅)=0\n• 0≤P(A)≤1 pour tout A\n• A et B incompatibles (A∩B=∅) : P(A∪B)=P(A)+P(B)\n\nÉvénement contraire : Ā=Ω\\A\nP(Ā)=1−P(A)\n\nÉQUIPROBABILITÉ :\nP(A)=card(A)/card(Ω)=|A|/|Ω|\n\nCas général :\nP(A∪B)=P(A)+P(B)−P(A∩B)" },
          ],
          exercices:[
            { id:'EX-PR1', niveau:'Facile', titre:'Équiprobabilité',
              enonce:"Dé équilibré à 6 faces. P(multiple de 3 ou pair) ?",
              correction:"A={3,6} (multiples de 3), B={2,4,6} (pairs).\nA∩B={6}.\nP(A∪B)=2/6+3/6−1/6=4/6=2/3." },
            { id:'EX-PR2', niveau:'Intermédiaire', titre:'Complémentaire',
              enonce:"Tirer 2 cartes d'un jeu de 52. P(au moins un as) ?",
              correction:"P(aucun as)=C₄₈²/C₅₂²=(48×47)/(52×51)=2256/2652≈0,851.\nP(au moins 1)=1−0,851=0,149." },
          ]
        },
      ]
    },
    {
      id:'sc-proba-cond', titre:'9.2 Probabilités conditionnelles et Bayes',
      notions:['P(A|B)=P(A∩B)/P(B) — probabilité conditionnelle','Indépendance : P(A∩B)=P(A)·P(B)','Formule des probabilités totales','Formule de Bayes'],
      blocs:[
        {
          notion:'🔗 Conditionnement et Bayes',
          theoremes:[
            { id:'D-PR2', type:'def', nom:'Probabilité conditionnelle et indépendance',
              enonce:"PROBABILITÉ CONDITIONNELLE :\nP(A|B) = P(A∩B)/P(B)  (P(B)>0)\nLire : «probabilité de A sachant B»\n\nEquivalent : P(A∩B) = P(B)·P(A|B)\n\nINDÉPENDANCE :\nA et B indépendants ↔ P(A∩B) = P(A)·P(B)\n↔ P(A|B) = P(A)  (B ne modifie pas A)\n\nExpériences répétées indépendantes :\nP(A₁∩A₂∩…∩Aₙ) = P(A₁)·P(A₂)·…·P(Aₙ)",
              remarque:"Indépendance ≠ incompatibilité. Si A∩B=∅ et P(A)>0 et P(B)>0, ils ne sont PAS indépendants." },
            { id:'T-PR1', type:'thm', nom:'Formule des probabilités totales et Bayes',
              enonce:"Partition {B₁,…,Bₙ} de Ω (Bᵢ deux à deux disjoints, de réunion Ω) :\n\nFORMULE DES PROBABILITÉS TOTALES :\nP(A) = Σᵢ P(A|Bᵢ)·P(Bᵢ)\n\nFORMULE DE BAYES :\nP(Bⱼ|A) = P(A|Bⱼ)·P(Bⱼ) / P(A)\n         = P(A|Bⱼ)·P(Bⱼ) / Σᵢ P(A|Bᵢ)·P(Bᵢ)\n\nInterprétation :\nBayes permet de «remonter» de l'effet (A observé) à la cause (Bⱼ probable)",
              remarque:"La partition {B, B̄} (deux événements complémentaires) est la plus fréquente en exercice." },
          ],
          exercices:[
            { id:'EX-PR3', niveau:'Facile', titre:'Probabilités totales',
              enonce:"Urne A : 3B+2R. Urne B : 1B+4R. On tire une urne au hasard puis une boule. P(bleue) ?",
              correction:"P(bleue)=P(bleue|A)·P(A)+P(bleue|B)·P(B)\n=3/5×1/2+1/5×1/2=3/10+1/10=4/10=2/5." },
            { id:'EX-PR4', niveau:'Intermédiaire', titre:'Bayes — diagnostic médical',
              enonce:"Maladie M : prévalence 2%. Test : sensibilité 95% (P(+|M)=0,95), spécificité 97% (P(−|M̄)=0,97). P(M|+) ?",
              correction:"P(+)=P(+|M)·P(M)+P(+|M̄)·P(M̄)\n=0,95×0,02+0,03×0,98=0,019+0,0294=0,0484.\nP(M|+)=0,019/0,0484≈39,3%.\nMalgré un bon test, VPP faible car maladie rare !" },
            { id:'EX-PR5', niveau:'Difficile', titre:'Arbre de probabilités',
              enonce:"Usine produit 60% type A (5% défectueux) et 40% type B (10% défectueux). Pièce choisie au hasard est défectueuse. P(type A) ?",
              correction:"P(D)=0,05×0,6+0,10×0,4=0,03+0,04=0,07.\nP(A|D)=0,03/0,07=3/7≈42,9%." },
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
  id:'fonctions-reciproques', emoji:'🔄', badge:'Analyse', color:'#06d6a0',
  titre:'Fonctions Réciproques',
  desc:"Bijection d'un intervalle sur un intervalle, fonction réciproque f⁻¹, domaine et image, symétrie par rapport à y=x, dérivée de la réciproque, fonction racine n-ième et puissances rationnelles.",
  souschapitres:[
    {
      id:'sc-bij', titre:'6.1 Bijection et fonction réciproque',
      notions:['Bijection : continue + strictement monotone','Réciproque f⁻¹ : J→I','Symétrie des courbes par rapport à y=x',"Dérivée de la réciproque (f⁻¹)'=1/f'∘f⁻¹"],
      blocs:[
        {
          notion:'📐 Bijection et réciproque',
          theoremes:[
            { id:'T-FR0', type:'thm', nom:'Théorème de la bijection',
              enonce:"Si f est continue et strictement monotone sur un intervalle I :\n→ f réalise une bijection de I sur J=f(I)\n→ J est un intervalle de mêmes bornes que f(I)\n\nDans ce cas :\n• f⁻¹ est aussi continue et strictement monotone, de même sens que f\n• Pour tout y∈J, l'équation f(x)=y admet une solution unique x∈I\n\nDétermination de J selon le sens :\nSi f croissante sur [a,b] : J=[f(a),f(b)]\nSi f décroissante sur [a,b] : J=[f(b),f(a)]" },
            { id:'D-FR1', type:'def', nom:'Fonction réciproque f⁻¹',
              enonce:"f : I → J bijective admet une réciproque f⁻¹ : J → I telle que :\nf⁻¹(f(x))=x pour tout x∈I\nf(f⁻¹(y))=y pour tout y∈J\n\nÉquivalence fondamentale :\ny=f(x) ⟺ x=f⁻¹(y)  (x∈I, y∈J)\n\nGRAPHIQUE :\nLa courbe de f⁻¹ est la symétrique de C_f par rapport à la droite d'équation y=x (première bissectrice).\n\nMéthode pour expliciter f⁻¹ :\nRésoudre y=f(x) d'inconnue x, puis échanger x et y.",
              remarque:"D(f⁻¹)=f(I) et f⁻¹(J)=I : le domaine de f⁻¹ est l'ensemble image de f." },
            { id:'T-FR1', type:'thm', nom:'Dérivée de la fonction réciproque',
              enonce:"Si f est bijective, dérivable en x₀=f⁻¹(y₀) avec f'(x₀)≠0 :\nf⁻¹ est dérivable en y₀ et\n(f⁻¹)'(y₀) = 1/f'(f⁻¹(y₀)) = 1/f'(x₀)\n\nFormulation pratique : si y=f(x), alors (f⁻¹)'(y)=1/f'(x).\n\nInterprétation géométrique :\nLes tangentes en M(x₀,y₀) à C_f et en M'(y₀,x₀) à C_(f⁻¹) ont des pentes inverses (symétrie /y=x)." },
          ],
          exercices:[
            { id:'EX-FR1', niveau:'Facile', titre:'Bijection et image',
              enonce:"f(x)=2x−3 sur ℝ. Montrer que f est bijective et déterminer f⁻¹.",
              correction:"f'(x)=2>0 → f strictement croissante et continue → bijective de ℝ sur ℝ.\ny=2x−3 → x=(y+3)/2.\nDonc f⁻¹(y)=(y+3)/2, soit f⁻¹(x)=(x+3)/2." },
            { id:'EX-FR2', niveau:'Intermédiaire', titre:'Réciproque et dérivée',
              enonce:"f(x)=x³+x sur ℝ. Montrer que f est bijective. Calculer (f⁻¹)'(2).",
              correction:"f'(x)=3x²+1≥1>0 → f strictement croissante, continue → bijective de ℝ sur ℝ.\nf(1)=1+1=2 → f⁻¹(2)=1.\n(f⁻¹)'(2)=1/f'(1)=1/(3+1)=1/4." },
            { id:'EX-FR3', niveau:'Difficile', titre:'Restriction et réciproque',
              enonce:"f(x)=x²−4x+1 sur [2;+∞[. Montrer que f admet une réciproque et expliciter f⁻¹.",
              correction:"f'(x)=2x−4≥0 sur [2;+∞[ → f croissante, continue → bijective de [2;+∞[ sur [f(2);+∞[=[−3;+∞[.\ny=x²−4x+1 → x²−4x+(1−y)=0. Δ=16−4(1−y)=12+4y.\nx=(4+√(12+4y))/2=2+√(3+y) (racine ≥2).\nf⁻¹(x)=2+√(x+3), définie sur [−3;+∞[." },
          ],
        },
      ],
    },
    {
      id:'sc-racine-nieme', titre:'6.2 Fonction racine n-ième et puissances',
      notions:['x↦xⁿ bijective sur [0;+∞[','Racine n-ième : ⁿ√x = x^(1/n)','Dérivée de ⁿ√x','Puissances à exposant rationnel x^(p/q)'],
      blocs:[
        {
          notion:'√ Racine n-ième',
          theoremes:[
            { id:'D-FR2', type:'def', nom:'Fonction racine n-ième',
              enonce:"Pour n∈ℕ*, x↦xⁿ est continue strictement croissante sur [0;+∞[ :\n→ elle réalise une bijection de [0;+∞[ sur [0;+∞[\n\nSa réciproque est la fonction racine n-ième :\nⁿ√ : [0;+∞[ → [0;+∞[ , notée ⁿ√x ou x^(1/n)\n\nDéfinition : y=ⁿ√x ⟺ yⁿ=x  (x≥0, y≥0)\n\nCas particuliers :\n²√x = √x  (racine carrée)\n³√x  (racine cubique, définie sur ℝ par prolongement impair)\n\nPropriétés : ⁿ√(ab)=ⁿ√a·ⁿ√b ; ⁿ√(aⁿ)=a (a≥0)" },
            { id:'F-FR1', type:'formule', nom:'Dérivée et puissances rationnelles',
              enonce:"Dérivée de la racine n-ième (x>0) :\n(ⁿ√x)' = (1/n)·x^(1/n − 1) = 1/(n·ⁿ√(x^(n−1)))\n\nVérification par la formule de la réciproque :\nf(x)=xⁿ, f'(x)=n·xⁿ⁻¹ → (f⁻¹)'(y)=1/(n·xⁿ⁻¹)\n\nPUISSANCES À EXPOSANT RATIONNEL (a>0) :\na^(p/q) = (aᵖ)^(1/q) = racine q-ième de aᵖ\n\nRègles (a,b>0, r,s∈ℚ) :\naʳ·aˢ=aʳ⁺ˢ ; (aʳ)ˢ=aʳˢ ; (ab)ʳ=aʳbʳ ; a⁻ʳ=1/aʳ",
              remarque:"a^(p/q)=e^((p/q)ln a) : les puissances réelles se définissent via exp et ln." },
          ],
          exercices:[
            { id:'EX-FR4', niveau:'Facile', titre:'Calcul de racine n-ième',
              enonce:"Simplifier ³√27 , ⁴√16 et 8^(2/3).",
              correction:"³√27=3 (car 3³=27).\n⁴√16=2 (car 2⁴=16).\n8^(2/3)=(³√8)²=2²=4." },
            { id:'EX-FR5', niveau:'Intermédiaire', titre:'Dérivée',
              enonce:"Dériver g(x)=³√x sur ]0;+∞[.",
              correction:"g(x)=x^(1/3).\ng'(x)=(1/3)x^(1/3−1)=(1/3)x^(−2/3)=1/(3·³√(x²))." },
          ],
        },
      ],
    },
  ],
},

// ─────────────────────────────────────────────────────────────────────
// CH 07 — LOGARITHME NÉPÉRIEN
// ─────────────────────────────────────────────────────────────────────
'logarithme': {
  id:'logarithme', emoji:'📊', badge:'Analyse', color:'#06d6a0',
  titre:'Logarithme Népérien',
  desc:"Fonction ln, propriétés algébriques, équations et inéquations logarithmiques, dérivée (ln u)'=u'/u, limites et croissances comparées, étude de fonctions avec ln, logarithme décimal.",
  souschapitres:[
    {
      id:'sc-ln-def', titre:'7.1 Définition et propriétés algébriques',
      notions:['ln : ]0;+∞[ → ℝ, (ln x)′=1/x','ln(ab)=ln a+ln b, ln(aⁿ)=n ln a','Équations et inéquations avec ln','Nombre e : ln e = 1'],
      blocs:[
        {
          notion:'📐 Logarithme népérien — propriétés',
          theoremes:[
            { id:'D-LN1', type:'def', nom:'Définition du logarithme népérien',
              enonce:"ln : ]0;+∞[ → ℝ est l'unique primitive de x↦1/x qui s'annule en 1 :\n• ln 1 = 0\n• (ln x)' = 1/x  (x>0)\n• ln strictement croissante sur ]0;+∞[\n\nNombre e : unique réel tel que ln e = 1  (e ≈ 2,718)\n\nPROPRIÉTÉS ALGÉBRIQUES (a,b>0, n∈ℤ) :\nln(ab) = ln a + ln b\nln(a/b) = ln a − ln b\nln(1/b) = −ln b\nln(aⁿ) = n·ln a\nln(√a) = (1/2)·ln a",
              remarque:"Conséquence de la stricte croissance : ln a = ln b ⟺ a=b  et  ln a < ln b ⟺ a < b (a,b>0)." },
            { id:'M-LN1', type:'methode', nom:'Équations et inéquations logarithmiques',
              enonce:"ÉTAPE 1 — Domaine : tous les ln g(x) exigent g(x)>0.\nDéterminer l'ensemble de validité AVANT de résoudre.\n\nÉTAPE 2 — Réduire à une seule expression ln à l'aide des propriétés.\n\nÉTAPE 3 — Utiliser l'injectivité / la croissance :\nln A = ln B ⟺ A=B (avec A,B>0)\nln A ≤ ln B ⟺ A≤B (avec A,B>0)\nln A = k ⟺ A = eᵏ\n\nÉTAPE 4 — Garder uniquement les solutions du domaine." },
          ],
          exercices:[
            { id:'EX-LN1', niveau:'Facile', titre:'Simplification',
              enonce:"Simplifier A=ln 8 − ln 2 + ln(1/4).",
              correction:"A=ln(8/2)+ln(1/4)=ln 4 + ln(1/4)=ln(4×1/4)=ln 1=0." },
            { id:'EX-LN2', niveau:'Intermédiaire', titre:'Équation logarithmique',
              enonce:"Résoudre ln(x+1)+ln(x−1)=ln 3.",
              correction:"Domaine : x+1>0 et x−1>0 → x>1.\nln((x+1)(x−1))=ln 3 → x²−1=3 → x²=4 → x=2 ou x=−2.\nSeul x=2 vérifie x>1. S={2}." },
            { id:'EX-LN3', niveau:'Difficile', titre:'Inéquation',
              enonce:"Résoudre ln(2x−1) < ln(x+3).",
              correction:"Domaine : 2x−1>0 et x+3>0 → x>1/2.\nPar croissance : 2x−1 < x+3 → x < 4.\nIntersection avec x>1/2 : S=]1/2 ; 4[." },
          ],
        },
      ],
    },
    {
      id:'sc-ln-etude', titre:'7.2 Dérivée, limites et étude',
      notions:["Dérivée (ln u)'=u'/u",'Limites en 0⁺ et +∞','Croissances comparées (ln x)/x → 0','Étude de fonctions avec ln'],
      blocs:[
        {
          notion:'∞ Limites et étude de fonctions',
          theoremes:[
            { id:'F-LN1', type:'formule', nom:'Dérivée et limites',
              enonce:"DÉRIVÉE composée (u>0) : (ln u)' = u'/u\nExemple : (ln(x²+1))' = 2x/(x²+1)\n\nLIMITES :\nlim(x→0⁺) ln x = −∞\nlim(x→+∞) ln x = +∞\nlim(x→1) ln x/(x−1) = 1\n\nCROISSANCES COMPARÉES :\nlim(x→+∞) (ln x)/xᵅ = 0  (α>0)\nlim(x→0⁺) xᵅ·ln x = 0  (α>0)\n→ « x l'emporte sur ln x »\n\nLimite usuelle : lim(x→0) ln(1+x)/x = 1" },
            { id:'F-LN2', type:'formule', nom:'Logarithme décimal',
              enonce:"Logarithme décimal : log x = ln x / ln 10\n\nPropriétés analogues : log(ab)=log a+log b, log(10ⁿ)=n.\n\nUsage : pH=−log[H₃O⁺] (chimie), échelles (décibels, Richter).\nlog 10=1, log 1=0, log 100=2.",
              remarque:"Le log décimal sert surtout aux applications en physique-chimie ; en analyse on travaille avec ln." },
          ],
          exercices:[
            { id:'EX-LN4', niveau:'Facile', titre:'Dérivée avec ln',
              enonce:"Calculer f'(x) pour f(x)=ln(x²+1).",
              correction:"u=x²+1>0, u'=2x.\nf'(x)=u'/u=2x/(x²+1)." },
            { id:'EX-LN5', niveau:'Intermédiaire', titre:'Croissance comparée',
              enonce:"Calculer lim(x→+∞) (ln x)/√x et lim(x→0⁺) x·ln x.",
              correction:"(ln x)/√x=(ln x)/x^(1/2) → 0 (croissance comparée, α=1/2).\nx·ln x → 0⁻ en 0⁺ (croissance comparée)." },
            { id:'EX-LN6', niveau:'Difficile', titre:'Étude complète',
              enonce:"Étudier f(x)=ln x / x sur ]0;+∞[ : variations et limites.",
              correction:"f'(x)=(1−ln x)/x²=0 → ln x=1 → x=e.\nf'>0 sur ]0;e[, f'<0 sur ]e;+∞[ → maximum en e : f(e)=1/e.\nlim(x→0⁺)f=−∞ (ln x→−∞, /x→+∞) ; lim(x→+∞)f=0⁺ (croissance comparée).\nC_f admet l'axe Ox comme asymptote en +∞." },
          ],
        },
      ],
    },
  ],
},

// ─────────────────────────────────────────────────────────────────────
// CH 08 — FONCTION EXPONENTIELLE
// ─────────────────────────────────────────────────────────────────────
'exponentielle': {
  id:'exponentielle', emoji:'📈', badge:'Analyse', color:'#06d6a0',
  titre:'Fonction Exponentielle',
  desc:"Fonction exp réciproque de ln, propriétés algébriques, équations et inéquations, dérivée (eᵘ)'=u'eᵘ, limites et croissances comparées, étude de fonctions et modèles d'évolution.",
  souschapitres:[
    {
      id:'sc-exp-def', titre:'8.1 Définition et propriétés',
      notions:['exp = réciproque de ln, eˣ>0','eᵃ⁺ᵇ=eᵃeᵇ, e⁻ˣ=1/eˣ','Équations/inéquations avec eˣ','Lien eˣ=y ⟺ x=ln y'],
      blocs:[
        {
          notion:'📐 Exponentielle — propriétés',
          theoremes:[
            { id:'D-EX1', type:'def', nom:"Fonction exponentielle",
              enonce:"exp : ℝ → ]0;+∞[ est la réciproque de ln. On note exp(x)=eˣ.\n\nÉquivalence fondamentale :\ny=eˣ ⟺ x=ln y  (y>0)\neˡⁿ ˣ = x (x>0) ; ln(eˣ)=x (x∈ℝ)\n\nPropriétés (a,b∈ℝ, n∈ℤ) :\neˣ > 0 pour tout x\ne⁰=1 ; e¹=e\neᵃ⁺ᵇ = eᵃ·eᵇ\ne⁻ˣ = 1/eˣ\neᵃ⁻ᵇ = eᵃ/eᵇ\n(eᵃ)ⁿ = eⁿᵃ",
              remarque:"exp est strictement croissante : eᵃ=eᵇ ⟺ a=b  et  eᵃ<eᵇ ⟺ a<b." },
            { id:'M-EX1', type:'methode', nom:'Équations et inéquations exponentielles',
              enonce:"eᴬ = eᴮ ⟺ A = B\neᴬ ≤ eᴮ ⟺ A ≤ B  (croissance)\neᴬ = k ⟺ A = ln k  (si k>0 ; impossible si k≤0)\n\nÉquation du type aX²+bX+c=0 avec X=eˣ :\n→ poser X=eˣ>0, résoudre en X, ne garder que X>0, puis x=ln X.\n\nExemple : e²ˣ−3eˣ+2=0 → X²−3X+2=0 → X=1 ou X=2\n→ eˣ=1 (x=0) ou eˣ=2 (x=ln 2)." },
          ],
          exercices:[
            { id:'EX-EX1', niveau:'Facile', titre:'Simplification',
              enonce:"Simplifier A = e³·e⁻¹ / e²  et  B = (eˣ)²·e⁻ˣ.",
              correction:"A=e^(3−1−2)=e⁰=1.\nB=e^(2x−x)=eˣ." },
            { id:'EX-EX2', niveau:'Intermédiaire', titre:'Équation par changement de variable',
              enonce:"Résoudre e²ˣ − 5eˣ + 6 = 0.",
              correction:"Poser X=eˣ>0 : X²−5X+6=0 → (X−2)(X−3)=0 → X=2 ou X=3.\neˣ=2 → x=ln 2 ; eˣ=3 → x=ln 3.\nS={ln 2 ; ln 3}." },
            { id:'EX-EX3', niveau:'Difficile', titre:'Inéquation',
              enonce:"Résoudre e^(2x) − eˣ − 2 > 0.",
              correction:"Poser X=eˣ>0 : X²−X−2>0 → (X−2)(X+1)>0.\nRacines X=2 et X=−1. Comme X>0 : X>2.\neˣ>2 → x>ln 2. S=]ln 2 ; +∞[." },
          ],
        },
      ],
    },
    {
      id:'sc-exp-etude', titre:'8.2 Dérivée, limites et applications',
      notions:["Dérivée (eᵘ)'=u'eᵘ",'Limites : eˣ→0 en −∞, +∞ en +∞','Croissances comparées eˣ/xⁿ→+∞','Modèles d\'évolution (eᵏᵗ)'],
      blocs:[
        {
          notion:'∞ Limites, étude et modèles',
          theoremes:[
            { id:'F-EX1', type:'formule', nom:'Dérivée, limites, croissances comparées',
              enonce:"DÉRIVÉE : (eˣ)'=eˣ ; (eᵘ)'=u'·eᵘ\nExemple : (e^(x²−2x))'=(2x−2)e^(x²−2x)\n\nLIMITES :\nlim(x→−∞) eˣ = 0⁺\nlim(x→+∞) eˣ = +∞\nlim(x→0) (eˣ−1)/x = 1\n\nCROISSANCES COMPARÉES (eˣ l'emporte sur xⁿ) :\nlim(x→+∞) eˣ/xⁿ = +∞\nlim(x→−∞) xⁿ·eˣ = 0\nlim(x→+∞) xⁿ·e⁻ˣ = 0" },
            { id:'D-EX2', type:'def', nom:"Modèles d'évolution exponentielle",
              enonce:"Fonction t↦A·eᵏᵗ (solution de y'=ky) :\n• k>0 : croissance exponentielle (population, intérêts composés)\n• k<0 : décroissance (désintégration radioactive, refroidissement, décharge RC)\n\nDemi-vie / temps caractéristique :\nDécroissance N(t)=N₀·e⁻ᵗ/τ :\n→ N(τ)=N₀/e (≈37%)\n→ demi-vie t½ : N(t½)=N₀/2 → t½ = τ·ln 2\n\nValeur à l'infini d'un modèle A+B·e⁻ᵏᵗ : tend vers A (asymptote horizontale).",
              remarque:"Ces modèles relient le chapitre exp aux équations différentielles y'=ay+b (chap. 10)." },
          ],
          exercices:[
            { id:'EX-EX4', niveau:'Facile', titre:'Dérivée composée',
              enonce:"Dériver f(x)=e^(x²−2x).",
              correction:"u=x²−2x, u'=2x−2.\nf'(x)=(2x−2)·e^(x²−2x)=2(x−1)e^(x²−2x)." },
            { id:'EX-EX5', niveau:'Intermédiaire', titre:'Étude de x·eˣ',
              enonce:"Étudier les variations de f(x)=x·eˣ sur ℝ et ses limites.",
              correction:"f'(x)=eˣ+x·eˣ=(1+x)eˣ. Signe = signe de (1+x).\nf'<0 sur ]−∞;−1[, f'>0 sur ]−1;+∞[ → min en x=−1 : f(−1)=−1/e.\nlim(x→−∞)x·eˣ=0 (croissance comparée) ; lim(x→+∞)=+∞." },
            { id:'EX-EX6', niveau:'Difficile', titre:'Modèle de décroissance',
              enonce:"Une substance radioactive : N(t)=N₀·e⁻⁰·⁰⁵ᵗ (t en jours). Calculer la demi-vie.",
              correction:"N(t½)=N₀/2 → e⁻⁰·⁰⁵ᵗ½=1/2 → −0,05·t½=ln(1/2)=−ln 2.\nt½=ln 2/0,05≈13,86 jours." },
          ],
        },
      ],
    },
  ],
},

// ─────────────────────────────────────────────────────────────────────
// CH 09 — PRIMITIVES & INTÉGRALES
// ─────────────────────────────────────────────────────────────────────
'primitives-integrales': {
  id:'primitives-integrales', emoji:'∫', badge:'Analyse', color:'#06d6a0',
  titre:'Primitives & Intégrales',
  desc:"Primitives usuelles et de fonctions composées, intégrale définie ∫ₐᵇf(x)dx, théorème fondamental, propriétés (Chasles, linéarité, positivité), aire entre courbes, valeur moyenne, intégration par parties.",
  souschapitres:[
    {
      id:'sc-prim', titre:'9.1 Primitives',
      notions:['Primitive : F′=f, unicité à constante près','Primitives usuelles','Composées : u′eᵘ, u′/u, u′uⁿ','Linéarité'],
      blocs:[
        {
          notion:'📐 Primitives',
          theoremes:[
            { id:'D-PI1', type:'def', nom:'Primitive d\'une fonction',
              enonce:"F est une primitive de f sur I ⟺ F dérivable sur I et F'=f.\n\nThéorème : toute fonction continue sur I admet des primitives sur I.\n\nUnicité à une constante près :\nSi F est une primitive de f, toutes les primitives sont F(x)+C, C∈ℝ.\n\nPrimitive vérifiant une condition F(x₀)=y₀ : unique (détermine C).\n\nLinéarité : une primitive de af+bg est aF+bG." },
            { id:'F-PI1', type:'formule', nom:'Primitives usuelles et composées',
              enonce:"FONCTIONS USUELLES (primitive, +C) :\nxⁿ → xⁿ⁺¹/(n+1)  (n≠−1)\n1/x → ln|x|\n1/√x → 2√x\neˣ → eˣ\nsin x → −cos x ;  cos x → sin x\n1/cos²x → tan x\n\nFORMES COMPOSÉES (u dérivable) :\nu'·eᵘ → eᵘ\nu'/u → ln|u|\nu'·uⁿ → uⁿ⁺¹/(n+1)  (n≠−1)\nu'/√u → 2√u\nu'·cos u → sin u ;  u'·sin u → −cos u",
              remarque:"Reconnaître la forme u'·(quelque chose en u) est la clé : c'est l'inverse de la règle de la chaîne." },
          ],
          exercices:[
            { id:'EX-PI1', niveau:'Facile', titre:'Primitive composée',
              enonce:"Trouver une primitive de f(x)=(2x+1)·e^(x²+x).",
              correction:"u=x²+x, u'=2x+1 → forme u'·eᵘ.\nF(x)=e^(x²+x)." },
            { id:'EX-PI2', niveau:'Intermédiaire', titre:'Forme u′/u',
              enonce:"Primitive de f(x)=2x/(x²+1) sur ℝ.",
              correction:"u=x²+1>0, u'=2x → forme u'/u.\nF(x)=ln(x²+1)." },
            { id:'EX-PI3', niveau:'Difficile', titre:'Primitive avec condition',
              enonce:"Trouver la primitive F de f(x)=3x²−2 telle que F(1)=4.",
              correction:"F(x)=x³−2x+C. F(1)=1−2+C=4 → C=5.\nF(x)=x³−2x+5." },
          ],
        },
      ],
    },
    {
      id:'sc-int', titre:'9.2 Intégrale définie et applications',
      notions:['Théorème fondamental ∫ₐᵇf=F(b)−F(a)','Chasles, linéarité, positivité','Valeur moyenne, aire entre courbes','Intégration par parties (IPP)'],
      blocs:[
        {
          notion:'📐 Intégrale définie',
          theoremes:[
            { id:'T-PI2', type:'thm', nom:"Théorème fondamental et propriétés",
              enonce:"Si F est une primitive de f (continue) sur [a,b] :\n∫ₐᵇ f(x)dx = [F(x)]ₐᵇ = F(b)−F(a)\n\nPROPRIÉTÉS :\n∫ₐᵃ f = 0 ;  ∫ₐᵇ f = −∫ᵦᵃ f\nChasles : ∫ₐᵇ f + ∫ᵦᶜ f = ∫ₐᶜ f\nLinéarité : ∫ₐᵇ(αf+βg) = α∫ₐᵇf + β∫ₐᵇg\nPositivité : si f≥0 sur [a,b] (a<b) alors ∫ₐᵇf≥0\nCroissance : f≤g sur [a,b] → ∫ₐᵇf ≤ ∫ₐᵇg\n\nVALEUR MOYENNE de f sur [a,b] :\nμ = 1/(b−a) · ∫ₐᵇ f(x)dx" },
            { id:'F-PI2', type:'formule', nom:'Aires et intégration par parties',
              enonce:"AIRE sous une courbe (f≥0 sur [a,b]) :\nA = ∫ₐᵇ f(x)dx  (en unités d'aire)\n\nAIRE entre deux courbes (f≥g sur [a,b]) :\nA = ∫ₐᵇ [f(x)−g(x)] dx\n\nSi f change de signe : A = ∫ₐᵇ |f(x)| dx (découper selon le signe).\n\nINTÉGRATION PAR PARTIES (u,v dérivables, dérivées continues) :\n∫ₐᵇ u'(x)v(x)dx = [u(x)v(x)]ₐᵇ − ∫ₐᵇ u(x)v'(x)dx\n\nChoix : v = partie qui se simplifie en dérivant (ex : x, ln x).",
              remarque:"IPP typique : ∫ x·eˣ dx (poser v=x), ∫ ln x dx (poser v=ln x, u'=1)." },
          ],
          exercices:[
            { id:'EX-PI4', niveau:'Facile', titre:'Calcul direct',
              enonce:"Calculer ∫₀² (x²+1)dx.",
              correction:"[x³/3+x]₀² = (8/3+2)−0 = 8/3+6/3 = 14/3." },
            { id:'EX-PI5', niveau:'Intermédiaire', titre:'Aire entre courbes',
              enonce:"Aire entre f(x)=x+2 et g(x)=x² sur [−1;2].",
              correction:"Sur [−1;2], x+2≥x² (vérifié aux bornes et entre racines −1,2).\nA=∫₋₁²(x+2−x²)dx=[x²/2+2x−x³/3]₋₁²\n=(2+4−8/3)−(1/2−2+1/3)=(6−8/3)−(−7/6)=10/3+7/6=27/6=9/2." },
            { id:'EX-PI6', niveau:'Difficile', titre:'Intégration par parties',
              enonce:"Calculer ∫₀¹ x·eˣ dx.",
              correction:"u'=eˣ→u=eˣ ; v=x→v'=1.\n∫₀¹ x·eˣ dx=[x·eˣ]₀¹−∫₀¹ eˣ dx=(1·e−0)−[eˣ]₀¹=e−(e−1)=1." },
          ],
        },
      ],
    },
  ],
},

// ─────────────────────────────────────────────────────────────────────
// CH 10 — ÉQUATIONS DIFFÉRENTIELLES
// ─────────────────────────────────────────────────────────────────────
'equations-differentielles': {
  id:'equations-differentielles', emoji:'∂', badge:'Analyse', color:'#06d6a0',
  titre:'Équations Différentielles',
  desc:"Équations y'=ay et y'=ay+b — solution générale, solution particulière, condition initiale, et applications physiques (désintégration radioactive, charge/décharge d'un condensateur, refroidissement de Newton).",
  souschapitres:[
    {
      id:'sc-ed-resolution', titre:"10.1 Résolution de y'=ay+b",
      notions:["y'=ay → y=Ceᵃˣ","y'=ay+b → y=Ceᵃˣ−b/a",'Condition initiale → détermine C','Vérifier qu\'une fonction est solution'],
      blocs:[
        {
          notion:'📐 Résolution',
          theoremes:[
            { id:'T-ED1', type:'thm', nom:"Solutions de y'=ay et y'=ay+b",
              enonce:"ÉQUATION HOMOGÈNE y'=ay (a∈ℝ) :\nSolutions : y(x)=C·eᵃˣ , C∈ℝ\n\nÉQUATION COMPLÈTE y'=ay+b (a≠0) :\n1. Solution particulière constante : yₚ=−b/a (car 0=a·yₚ+b)\n2. Solution générale : y(x) = C·eᵃˣ − b/a , C∈ℝ\n\nCONDITION INITIALE y(x₀)=y₀ :\ndétermine C de façon unique :\nC = (y₀ + b/a)·e^(−a x₀)\n\nThéorème de Cauchy : il existe une unique solution vérifiant une condition initiale donnée." },
            { id:'M-ED1', type:'methode', nom:'Vérifier / utiliser une solution',
              enonce:"VÉRIFIER qu'une fonction g est solution de y'=ay+b :\n→ calculer g'(x) et vérifier g'(x)=a·g(x)+b pour tout x.\n\nCAS y'=ay (sans second membre) :\nFonctions solutions ↔ x↦Ceᵃˣ uniquement.\n\nSTRATÉGIE TYPE BAC :\n1. Identifier a et b.\n2. Écrire la forme générale y=Ceᵃˣ−b/a.\n3. Appliquer la condition initiale pour trouver C.\n4. Étudier la limite / le comportement de la solution si demandé." },
          ],
          exercices:[
            { id:'EX-ED1', niveau:'Facile', titre:"Équation homogène",
              enonce:"Résoudre y'=3y avec y(0)=2.",
              correction:"y=Ce^(3x). y(0)=C=2.\ny(x)=2e^(3x)." },
            { id:'EX-ED2', niveau:'Intermédiaire', titre:"Équation complète",
              enonce:"Résoudre y'=2y−4 avec y(0)=3.",
              correction:"yₚ=−(−4)/2=2. Sol. gén. : y=Ce^(2x)+2.\ny(0)=C+2=3 → C=1.\ny(x)=e^(2x)+2." },
            { id:'EX-ED3', niveau:'Difficile', titre:'Vérification et limite',
              enonce:"Soit y'=−y+5, y(0)=1. Résoudre puis donner lim(x→+∞) y(x).",
              correction:"a=−1, b=5, yₚ=−5/(−1)=5. y=Ce⁻ˣ+5.\ny(0)=C+5=1 → C=−4. y(x)=−4e⁻ˣ+5.\nlim(x→+∞)e⁻ˣ=0 → lim y=5 (asymptote horizontale y=5)." },
          ],
        },
      ],
    },
    {
      id:'sc-ed-applications', titre:'10.2 Applications physiques',
      notions:['Désintégration radioactive N′=−λN','Circuit RC : charge/décharge','Refroidissement de Newton','Lecture d\'un modèle A+Be⁻ᵏᵗ'],
      blocs:[
        {
          notion:'🔬 Modèles d\'évolution',
          theoremes:[
            { id:'D-ED2', type:'def', nom:'Modèles différentiels classiques',
              enonce:"DÉSINTÉGRATION RADIOACTIVE : N'(t)=−λN(t)\n→ N(t)=N₀·e⁻λᵗ\n→ demi-vie t½ = ln 2 / λ\n\nCHARGE D'UN CONDENSATEUR (RC) : u'+u/(RC)=E/(RC)\n→ u(t)=E·(1−e⁻ᵗ/(RC))  (tend vers E)\nConstante de temps τ=RC.\n\nDÉCHARGE : u'=−u/(RC) → u(t)=E·e⁻ᵗ/(RC)\n\nREFROIDISSEMENT DE NEWTON : T'=−k(T−Tₐ)\n→ T(t)=Tₐ+(T₀−Tₐ)·e⁻ᵏᵗ  (tend vers Tₐ ambiante)",
              remarque:"Tous ces modèles se ramènent à y'=ay+b : repérer a (taux) et b puis appliquer la méthode 10.1." },
          ],
          exercices:[
            { id:'EX-ED4', niveau:'Intermédiaire', titre:'Charge d\'un condensateur',
              enonce:"u'+u/2=5 (RC=2, E·/(RC)=5 donc E=10), u(0)=0. Trouver u(t) et u(+∞).",
              correction:"a=−1/2, b=5, yₚ=−5/(−1/2)=10. u=Ce⁻ᵗ/²+10.\nu(0)=C+10=0 → C=−10. u(t)=10(1−e⁻ᵗ/²).\nlim(t→+∞)u=10 V (tension de charge maximale)." },
            { id:'EX-ED5', niveau:'Difficile', titre:'Refroidissement',
              enonce:"Un café à 80°C dans une pièce à 20°C : T'=−0,1(T−20), T(0)=80. T(t) ? Température après 10 min ?",
              correction:"Forme : T=20+(80−20)e⁻⁰·¹ᵗ=20+60e⁻⁰·¹ᵗ.\nT(10)=20+60e⁻¹=20+60×0,368≈42,1°C." },
          ],
        },
      ],
    },
  ],
},

// ─────────────────────────────────────────────────────────────────────
// CH 11 — NOMBRES COMPLEXES
// ─────────────────────────────────────────────────────────────────────
'complexes': {
  id:'complexes', emoji:'🔢', badge:'Algèbre', color:'#a78bfa',
  titre:'Nombres Complexes',
  desc:"Forme algébrique, conjugué, module, opérations, équations du second degré dans ℂ, forme trigonométrique et exponentielle, argument, formule de Moivre, interprétation géométrique (affixe, distances, ensembles de points).",
  souschapitres:[
    {
      id:'sc-cx-alg', titre:'11.1 Forme algébrique et équations',
      notions:['z=a+ib, Re(z), Im(z), i²=−1','Conjugué z̄, module |z|','Opérations et quotient','Équations du second degré dans ℂ'],
      blocs:[
        {
          notion:'📐 Forme algébrique',
          theoremes:[
            { id:'D-CX1', type:'def', nom:'Nombre complexe — forme algébrique',
              enonce:"z = a+ib  (a,b∈ℝ, i²=−1)\nRe(z)=a (partie réelle), Im(z)=b (partie imaginaire)\nz réel ⟺ Im(z)=0 ; z imaginaire pur ⟺ Re(z)=0\n\nCONJUGUÉ : z̄ = a−ib\nz+z̄=2Re(z) ; z−z̄=2i·Im(z) ; z·z̄=a²+b²=|z|²\nz₁+z₂ = z̄₁+z̄₂ ;  z₁z₂ = z̄₁·z̄₂ ;  (z̄)̄=z\n\nMODULE : |z|=√(a²+b²)\n|z|=0 ⟺ z=0 ; |z₁z₂|=|z₁||z₂| ; |z₁/z₂|=|z₁|/|z₂|\n\nDIVISION : z₁/z₂ = z₁·z̄₂ / |z₂|²  (multiplier par le conjugué)" },
            { id:'T-CX1', type:'thm', nom:'Équation du second degré dans ℂ',
              enonce:"az²+bz+c=0 (a,b,c réels, a≠0), discriminant Δ=b²−4ac :\n\n• Δ>0 : deux racines réelles z=(−b±√Δ)/(2a)\n• Δ=0 : racine double z=−b/(2a)\n• Δ<0 : deux racines complexes conjuguées\n   z = (−b ± i√(−Δ)) / (2a)\n\nLes racines non réelles sont toujours conjuguées : z et z̄.\n\nSomme et produit : z₁+z₂=−b/a , z₁·z₂=c/a.",
              remarque:"Quand Δ<0, écrire Δ=(i√(−Δ))² pour obtenir √Δ=i√(−Δ)." },
          ],
          exercices:[
            { id:'EX-CX1', niveau:'Facile', titre:'Forme algébrique d\'un quotient',
              enonce:"Écrire z=(2+i)/(1−i) sous forme algébrique.",
              correction:"z=(2+i)(1+i)/((1−i)(1+i))=(2+2i+i+i²)/2=(1+3i)/2=1/2+(3/2)i." },
            { id:'EX-CX2', niveau:'Intermédiaire', titre:'Équation dans ℂ',
              enonce:"Résoudre z²+2z+5=0 dans ℂ.",
              correction:"Δ=4−20=−16=(4i)². √Δ=4i.\nz=(−2±4i)/2 → z₁=−1+2i, z₂=−1−2i." },
            { id:'EX-CX3', niveau:'Difficile', titre:'Module et conjugué',
              enonce:"z=3−4i. Calculer |z|, z·z̄ et 1/z sous forme algébrique.",
              correction:"|z|=√(9+16)=5. z·z̄=|z|²=25.\n1/z=z̄/|z|²=(3+4i)/25=3/25+(4/25)i." },
          ],
        },
      ],
    },
    {
      id:'sc-cx-trig', titre:'11.2 Forme trigonométrique, Moivre et géométrie',
      notions:['Module r, argument θ : z=r(cosθ+isinθ)','Forme exponentielle reⁱᶿ','Formule de Moivre','Affixe, distances, ensembles de points'],
      blocs:[
        {
          notion:'📐 Forme trigonométrique et exponentielle',
          theoremes:[
            { id:'F-CX2', type:'formule', nom:'Forme trigonométrique, exponentielle et Moivre',
              enonce:"FORME TRIGONOMÉTRIQUE : z=r(cosθ+isinθ), r=|z|, θ=arg(z) [2π]\nFORME EXPONENTIELLE : z=reⁱᶿ\ncosθ=a/r , sinθ=b/r\n\nPRODUIT / QUOTIENT :\nr₁eⁱᶿ¹ · r₂eⁱᶿ² = r₁r₂·eⁱ⁽ᶿ¹⁺ᶿ²⁾\n(r₁eⁱᶿ¹)/(r₂eⁱᶿ²) = (r₁/r₂)·eⁱ⁽ᶿ¹⁻ᶿ²⁾\narg(z₁z₂)=arg z₁+arg z₂ ; arg(z̄)=−arg z\n\nFORMULE DE MOIVRE :\n(cosθ+isinθ)ⁿ = cos(nθ)+isin(nθ)\nzⁿ = rⁿ·eⁱⁿᶿ\n\nFORMULES D'EULER :\ncosθ=(eⁱᶿ+e⁻ⁱᶿ)/2 ; sinθ=(eⁱᶿ−e⁻ⁱᶿ)/(2i)",
              remarque:"Pour trouver arg(z) : placer (a,b), repérer le quadrant, et utiliser cosθ=a/r, sinθ=b/r." },
            { id:'D-CX2', type:'def', nom:'Interprétation géométrique',
              enonce:"Le plan est muni d'un repère orthonormé direct.\nAFFIXE : à M(x,y) on associe z=x+iy ; à u⃗(x,y) on associe z.\n\nDISTANCES ET VECTEURS :\nAffixe de AB⃗ = z_B − z_A\nAB = |z_B − z_A|\nMilieu I de [AB] : z_I=(z_A+z_B)/2\n\nANGLES : (u⃗ ; v⃗) = arg(z_v / z_u) [2π]\n\nENSEMBLES DE POINTS :\n|z−z_A|=r : cercle de centre A, rayon r\n|z−z_A|=|z−z_B| : médiatrice de [AB]\narg(z−z_A)=θ [2π] : demi-droite issue de A" },
          ],
          exercices:[
            { id:'EX-CX4', niveau:'Intermédiaire', titre:'Forme trigonométrique',
              enonce:"Écrire z=1+i√3 sous forme trigonométrique puis calculer z⁶.",
              correction:"r=√(1+3)=2. cosθ=1/2, sinθ=√3/2 → θ=π/3.\nz=2(cos(π/3)+isin(π/3))=2e^(iπ/3).\nz⁶=2⁶·e^(i6π/3)=64·e^(2iπ)=64." },
            { id:'EX-CX5', niveau:'Difficile', titre:'Ensemble de points',
              enonce:"Déterminer l'ensemble des points M(z) tels que |z−2|=|z+i|.",
              correction:"A(2;0), B(0;−1). |z−2|=distance MA, |z+i|=|z−(−i)|=distance MB.\nMA=MB ⟺ M sur la médiatrice du segment [AB].\nC'est la médiatrice de [AB]." },
          ],
        },
      ],
    },
  ],
},

// ─────────────────────────────────────────────────────────────────────
// CH 16 — VARIABLES ALÉATOIRES & LOI BINOMIALE
// ─────────────────────────────────────────────────────────────────────
'variables-aleatoires': {
  id:'variables-aleatoires', emoji:'🎲', badge:'Probabilités', color:'#f5c842',
  titre:'Variables Aléatoires & Loi Binomiale',
  desc:"Variable aléatoire discrète, loi de probabilité, espérance, variance, écart-type, épreuve de Bernoulli, schéma de Bernoulli et loi binomiale B(n,p), calculs et applications.",
  souschapitres:[
    {
      id:'sc-va', titre:'16.1 Variable aléatoire discrète',
      notions:['Loi de probabilité P(X=xᵢ)','Espérance E(X)=Σxᵢpᵢ','Variance V(X) et écart-type σ','Fonction de répartition'],
      blocs:[
        {
          notion:'📐 Loi, espérance et variance',
          theoremes:[
            { id:'D-VA1', type:'def', nom:'Variable aléatoire et moments',
              enonce:"X variable aléatoire discrète prenant les valeurs x₁,…,xₙ avec P(X=xᵢ)=pᵢ.\nLOI DE PROBABILITÉ : tableau (xᵢ , pᵢ) avec Σpᵢ=1 et 0≤pᵢ≤1.\n\nESPÉRANCE (moyenne) :\nE(X) = Σ xᵢ·pᵢ\nLinéarité : E(aX+b)=a·E(X)+b\n\nVARIANCE :\nV(X) = E(X²) − [E(X)]² = Σ xᵢ²pᵢ − [E(X)]²\nV(aX+b) = a²·V(X)\n\nÉCART-TYPE : σ(X)=√V(X)\n\nFONCTION DE RÉPARTITION : F(x)=P(X≤x) (escalier, croissante de 0 à 1).",
              remarque:"E(X) est la valeur moyenne « espérée » sur un grand nombre d'expériences ; σ mesure la dispersion." },
          ],
          exercices:[
            { id:'EX-VA1', niveau:'Facile', titre:'Loi et espérance',
              enonce:"X prend les valeurs 0,1,2 avec P(0)=0,5 ; P(1)=0,3 ; P(2)=0,2. Calculer E(X).",
              correction:"Σp=0,5+0,3+0,2=1 ✓.\nE(X)=0×0,5+1×0,3+2×0,2=0,3+0,4=0,7." },
            { id:'EX-VA2', niveau:'Intermédiaire', titre:'Variance',
              enonce:"Avec la loi précédente, calculer V(X) et σ(X).",
              correction:"E(X²)=0²×0,5+1²×0,3+2²×0,2=0,3+0,8=1,1.\nV(X)=1,1−0,7²=1,1−0,49=0,61.\nσ=√0,61≈0,78." },
          ],
        },
      ],
    },
    {
      id:'sc-binomiale', titre:'16.2 Schéma de Bernoulli et loi binomiale',
      notions:['Épreuve de Bernoulli (succès/échec)','Schéma : n épreuves indépendantes','Loi binomiale B(n,p)','E(X)=np, V(X)=np(1−p)'],
      blocs:[
        {
          notion:'🎯 Loi binomiale B(n,p)',
          theoremes:[
            { id:'F-VA2', type:'formule', nom:'Loi binomiale',
              enonce:"ÉPREUVE DE BERNOULLI : expérience à deux issues, succès (proba p) / échec (proba 1−p).\n\nSCHÉMA DE BERNOULLI : n épreuves identiques et INDÉPENDANTES.\nX = nombre de succès → X suit la loi binomiale B(n,p).\n\nP(X=k) = Cₙᵏ · pᵏ · (1−p)ⁿ⁻ᵏ   (k=0,1,…,n)\n\nPARAMÈTRES :\nE(X) = n·p\nV(X) = n·p·(1−p)\nσ(X) = √(n·p·(1−p))\n\nCALCULS COURANTS :\nP(X≥1)=1−P(X=0)=1−(1−p)ⁿ\nP(X≤k)=Σⱼ₌₀ᵏ P(X=j)",
              remarque:"Reconnaître B(n,p) : nombre FIXE n de répétitions, INDÉPENDANTES, même probabilité p, on compte les succès." },
          ],
          exercices:[
            { id:'EX-VA3', niveau:'Intermédiaire', titre:'Loi binomiale',
              enonce:"Un dé est lancé 5 fois. X = nombre de 6 obtenus. Calculer P(X=2) et E(X).",
              correction:"X~B(5 ; 1/6). P(X=2)=C₅²·(1/6)²·(5/6)³=10·(1/36)·(125/216)=1250/7776≈0,161.\nE(X)=5×1/6≈0,833." },
            { id:'EX-VA4', niveau:'Difficile', titre:'Au moins un succès',
              enonce:"Une machine produit 8% de pièces défectueuses. Sur 10 pièces, P(au moins une défectueuse) ?",
              correction:"X~B(10 ; 0,08). P(X≥1)=1−P(X=0)=1−(0,92)¹⁰.\n(0,92)¹⁰≈0,434. P(X≥1)≈1−0,434=0,566." },
          ],
        },
      ],
    },
  ],
},

// ─────────────────────────────────────────────────────────────────────
// CH 17 — STATISTIQUES
// ─────────────────────────────────────────────────────────────────────
'statistiques': {
  id:'statistiques', emoji:'📊', badge:'Probabilités', color:'#f5c842',
  titre:'Statistiques',
  desc:"Paramètres d'une série statistique (moyenne, médiane, variance, écart-type), séries regroupées en classes, séries à deux variables, ajustement affine par la méthode des moindres carrés et coefficient de corrélation.",
  souschapitres:[
    {
      id:'sc-stat-param', titre:'17.1 Paramètres statistiques',
      notions:['Moyenne x̄, médiane, étendue','Variance s² et écart-type s','Séries regroupées en classes','Centres de classe'],
      blocs:[
        {
          notion:'📐 Statistiques descriptives',
          theoremes:[
            { id:'F-ST1', type:'formule', nom:'Paramètres de position et de dispersion',
              enonce:"Série x₁,…,xₚ d'effectifs n₁,…,nₚ, N=Σnᵢ :\n\nPOSITION :\nMoyenne x̄ = (Σ nᵢxᵢ)/N\nMédiane Me : valeur partageant l'effectif en deux moitiés\nMode : valeur (ou classe) de plus grand effectif\n\nDISPERSION :\nÉtendue = max − min\nVariance s² = (Σ nᵢxᵢ²)/N − x̄²  (formule de König)\nÉcart-type s = √s²\n\nSÉRIES EN CLASSES [aₖ;aₖ₊₁[ :\nCentre cₖ=(aₖ+aₖ₊₁)/2, on remplace xᵢ par cₖ dans les formules.",
              remarque:"s² mesure la dispersion autour de la moyenne ; plus s est grand, plus la série est étalée." },
          ],
          exercices:[
            { id:'EX-ST1', niveau:'Facile', titre:'Moyenne et écart-type',
              enonce:"Série : 2, 4, 4, 6, 8, 2. Calculer x̄ et l'écart-type s.",
              correction:"x̄=(2+4+4+6+8+2)/6=26/6≈4,33.\nΣx²=4+16+16+36+64+4=140. s²=140/6−(26/6)²≈23,33−18,78=4,56.\ns=√4,56≈2,13." },
            { id:'EX-ST2', niveau:'Intermédiaire', titre:'Série en classes',
              enonce:"Classes [0;10[, [10;20[, [20;30[ d'effectifs 4, 10, 6. Calculer x̄.",
              correction:"Centres : 5, 15, 25. N=20.\nx̄=(4×5+10×15+6×25)/20=(20+150+150)/20=320/20=16." },
          ],
        },
      ],
    },
    {
      id:'sc-stat-ajustement', titre:'17.2 Séries doubles et ajustement affine',
      notions:['Nuage de points, point moyen G(x̄;ȳ)','Covariance cov(x,y)','Droite de régression y=ax+b','Coefficient de corrélation r'],
      blocs:[
        {
          notion:'📈 Ajustement affine (moindres carrés)',
          theoremes:[
            { id:'F-ST2', type:'formule', nom:'Droite de régression et corrélation',
              enonce:"Série double (xᵢ ; yᵢ), point moyen G(x̄ ; ȳ).\n\nVARIANCES ET COVARIANCE :\nV(x)=(Σxᵢ²)/N − x̄² ;  V(y)=(Σyᵢ²)/N − ȳ²\ncov(x,y)=(Σxᵢyᵢ)/N − x̄·ȳ\n\nDROITE DE RÉGRESSION de y en x (moindres carrés) :\ny = a·x + b   avec   a = cov(x,y)/V(x)  ,  b = ȳ − a·x̄\n→ La droite passe TOUJOURS par le point moyen G.\n\nCOEFFICIENT DE CORRÉLATION LINÉAIRE :\nr = cov(x,y) / (σₓ·σ_y) ,  avec  −1 ≤ r ≤ 1\n|r| proche de 1 → forte corrélation linéaire (ajustement pertinent)\n|r| proche de 0 → pas de liaison linéaire.",
              remarque:"On utilise l'ajustement pour faire une PRÉVISION : remplacer x par une valeur dans y=ax+b." },
          ],
          exercices:[
            { id:'EX-ST3', niveau:'Intermédiaire', titre:'Point moyen',
              enonce:"Données x : 1,2,3,4 et y : 3,5,6,8. Calculer le point moyen G.",
              correction:"x̄=(1+2+3+4)/4=2,5 ; ȳ=(3+5+6+8)/4=22/4=5,5.\nG(2,5 ; 5,5)." },
            { id:'EX-ST4', niveau:'Difficile', titre:'Droite de régression et prévision',
              enonce:"Avec les données précédentes, déterminer la droite y=ax+b puis prévoir y pour x=5.",
              correction:"Σxy=1×3+2×5+3×6+4×8=3+10+18+32=63. cov=63/4−2,5×5,5=15,75−13,75=2.\nV(x)=(1+4+9+16)/4−2,5²=7,5−6,25=1,25. a=2/1,25=1,6.\nb=ȳ−a·x̄=5,5−1,6×2,5=5,5−4=1,5. → y=1,6x+1,5.\nPrévision x=5 : y=1,6×5+1,5=9,5." },
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
export default function SciencesExpSlugPage() {
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
          <Link href="/bac/sciences-exp" style={{ color:'#06d6a0' }}>
            ← Retour Sciences Expérimentales
          </Link>
        </div>
      </main><Footer/></>
  )

  const idx = NAV_ORDER.indexOf(slug)
  const prevSlug = idx>0 ? NAV_ORDER[idx-1] : null
  const nextSlug = idx<NAV_ORDER.length-1 ? NAV_ORDER[idx+1] : null
  const secColor = SEC_COLORS[slug] || '#06d6a0'

  const GROUPS = [
    { label:'Partie 1 — Analyse (10 ch.)', slugs:NAV_ORDER.slice(0,10) },
    { label:'Partie 2 — Algèbre (1 ch.)',  slugs:NAV_ORDER.slice(10,11) },
    { label:'Partie 3 — Géométrie (2 ch.)', slugs:NAV_ORDER.slice(11,13) },
    { label:'Partie 4 — Dénombrement & Probas (4 ch.)', slugs:NAV_ORDER.slice(13) },
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
          <Link href="/bac/sciences-exp" style={{ color:'var(--muted)', textDecoration:'none' }}>
            Sciences Expérimentales
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
                  <span style={{ fontSize:11, background:'rgba(6,214,160,0.1)',
                    color:'#06d6a0', padding:'2px 9px', borderRadius:10 }}>Bac Tunisie · Coeff 3</span>
                </div>
                <h1 style={{ fontSize:'clamp(22px,3vw,36px)', fontWeight:800, marginBottom:10 }}>
                  {chapter.titre}
                </h1>
                <p style={{ color:'var(--text2)', fontSize:14, lineHeight:1.7,
                  maxWidth:620, marginBottom:18 }}>{chapter.desc}</p>
                <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
                  <Link href={`/solve?q=${encodeURIComponent('Explique '+chapter.titre+' Sciences Expérimentales Bac Tunisie')}`}
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

                  {/* En-tête accordéon */}
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

                  {/* Contenu blocs */}
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
                                      <Link href={`/solve?q=${encodeURIComponent('Sc. Exp. Tunisie — '+ex.enonce)}`}
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
                  <Link href={`/bac/sciences-exp/${prevSlug}`} style={{ textDecoration:'none' }}>
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
                  <Link href={`/bac/sciences-exp/${nextSlug}`} style={{ textDecoration:'none' }}>
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
                  🔬 Sciences Exp. · 17 chapitres
                </div>
                {GROUPS.map(g => (
                  <div key={g.label}>
                    <div style={{ padding:'7px 15px 3px', fontSize:10, color:'var(--muted)',
                      fontWeight:700, textTransform:'uppercase', letterSpacing:'0.1em',
                      background:'rgba(255,255,255,0.02)' }}>{g.label}</div>
                    {g.slugs.map(s => (
                      <Link key={s} href={`/bac/sciences-exp/${s}`} style={{ textDecoration:'none' }}>
                        <div style={{ padding:'9px 15px', borderBottom:'1px solid var(--border)',
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
                ))}
              </div>

              {/* Actions */}
              <div style={{ background:'var(--surface)', border:'1px solid var(--border)',
                borderRadius:12, padding:'13px' }}>
                <div style={{ fontSize:11, color:'var(--muted)', fontWeight:700,
                  textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:9 }}>Actions</div>
                <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
                  <Link href={`/solve?q=${encodeURIComponent('Explique '+chapter.titre+' Sc.Exp. Bac Tunisie')}`}
                    className="btn btn-primary" style={{ textAlign:'center', fontSize:12 }}>
                    🤖 Chat IA — {chapter.badge}
                  </Link>
                  <Link href="/examens" className="btn btn-secondary"
                    style={{ textAlign:'center', fontSize:12 }}>📋 Exercice type Bac</Link>
                  <Link href="/simulation" className="btn btn-secondary"
                    style={{ textAlign:'center', fontSize:12 }}>🎯 Simulation Bac</Link>
                  <Link href="/bac/sciences-exp" className="btn btn-secondary"
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
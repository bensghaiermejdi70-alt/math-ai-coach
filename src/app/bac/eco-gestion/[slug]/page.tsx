'use client'
import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import { useParams } from 'next/navigation'

// ══════════════════════════════════════════════════════════════════════
// ÉCONOMIE & GESTION — [SLUG] DÉTAIL COMPLET
// Route : /bac/eco-gestion/[slug]
// Programme officiel CNP Tunisie — 4ème Éco & Gestion · Coeff 2
// Spécificités EG : Ln · Exp · Statistiques 2 var. · Applications économiques
// Structure : souschapitres + blocs (identique aux autres sections)
// ══════════════════════════════════════════════════════════════════════

const C = { thm:'#10b981', def:'#4f6ef7', formule:'#f5c842', prop:'#a78bfa', methode:'#ec4899', corollaire:'#f97316' }
const L: Record<string,string> = { thm:'Théorème', def:'Définition', formule:'Formule clé', prop:'Propriété', methode:'Méthode', corollaire:'Corollaire' }

const NAV_ORDER = [
  'fonctions-generalites','limites-continuite','derivation','etude-fonctions',
  'logarithme','exponentielle','suites',
  'maths-financieres','matrices-systemes',
  'geometrie-espace',
  'statistiques',
  'denombrement','probabilites','variables-aleatoires',
]
const TITRES_NAV: Record<string,string> = {
  'fonctions-generalites': 'CH 01 — Fonctions',
  'limites-continuite':    'CH 02 — Limites & Continuité',
  'derivation':            'CH 03 — Dérivation',
  'etude-fonctions':       'CH 04 — Étude de fonctions',
  'logarithme':            'CH 05 — Logarithme',
  'exponentielle':         'CH 06 — Exponentielle',
  'suites':                'CH 07 — Suites',
  'maths-financieres':     'CH 08 — Maths financières',
  'matrices-systemes':     'CH 09 — Matrices & Systèmes',
  'geometrie-espace':      "CH 10 — Géométrie espace",
  'statistiques':          'CH 11 — Statistiques',
  'denombrement':          'CH 12 — Dénombrement',
  'probabilites':          'CH 13 — Probabilités',
  'variables-aleatoires':  'CH 14 — Variables aléatoires',
}
const SEC_COLORS: Record<string,string> = {
  'fonctions-generalites':'#10b981','limites-continuite':'#10b981','derivation':'#10b981',
  'etude-fonctions':'#10b981','logarithme':'#10b981','exponentielle':'#10b981','suites':'#10b981',
  'geometrie-espace':'#4f6ef7',
  'statistiques':'#f97316',
  'denombrement':'#f5c842','probabilites':'#f5c842',
}

type Thm  = { id:string; type:string; nom:string; enonce:string; remarque?:string }
type Exo  = { id:string; niveau:string; titre:string; enonce:string; correction:string }
type Bloc = { notion:string; theoremes:Thm[]; exercices:Exo[] }
type SC   = { id:string; titre:string; notions:string[]; blocs:Bloc[] }
type Chap = { id:string; titre:string; badge:string; color:string; emoji:string; desc:string; souschapitres:SC[] }

// ══════════════════════════════════════════════════════════════════════
// DONNÉES — 11 CHAPITRES
// ══════════════════════════════════════════════════════════════════════
const ALL_CHAPTERS: Record<string,Chap> = {

// ─────────────────────────────────────────────────────────────────────
// CH 01 — FONCTIONS & GÉNÉRALITÉS
// ─────────────────────────────────────────────────────────────────────
'fonctions-generalites': {
  id:'fonctions-generalites', emoji:'📊', badge:'Analyse', color:'#10b981',
  titre:'Fonctions — Généralités',
  desc:"Ensemble de définition, parité, périodicité, opérations sur fonctions (somme, produit, quotient, composée), √f, |f|.",
  souschapitres:[
    {
      id:'sc-domaine', titre:'1.1 Domaine de définition et parité',
      notions:['D_f : exclusions (1/g, √g, ln g)','Parité f(−x)=f(x) ou f(−x)=−f(x)','Périodicité f(x+T)=f(x)','Restriction et prolongement'],
      blocs:[
        {
          notion:'📐 Domaine de définition',
          theoremes:[
            { id:'D-FG1', type:'def', nom:'Ensemble de définition D_f',
              enonce:"D_f = ensemble des réels x pour lesquels f(x) est définie.\n\nConditions d'exclusion :\n• 1/g(x) : g(x)≠0\n• √g(x) : g(x)≥0\n• ln(g(x)) : g(x)>0\n\nSi plusieurs contraintes simultanées : D_f = intersection.\n\nExemples :\nf(x)=1/√(x−1) → x>1 → D_f=]1;+∞[\nf(x)=ln(x²−4) → x²>4 → D_f=]−∞;−2[∪]2;+∞[\nf(x)=√(x)/ln(x) → x>0 et x≠1 → D_f=]0;1[∪]1;+∞[" },
            { id:'D-FG2', type:'def', nom:'Parité et périodicité',
              enonce:"f PAIRE : D_f symétrique par rapport à 0 et f(−x)=f(x)\n→ Courbe C_f symétrique par rapport à l'axe Oy\n→ Étudier sur [0;+∞[ puis déduire sur ]−∞;0]\n\nf IMPAIRE : f(−x)=−f(x)\n→ Courbe C_f symétrique par rapport à l'origine O\n\nPÉRIODICITÉ (période T>0) :\nf(x+T)=f(x) pour tout x dans D_f\n→ Étudier sur une période puis déduire\n\nExemples :\ncos x, sin x : T=2π (paire pour cos, impaire pour sin)\ntan x : T=π, impaire\n|sin x| : T=π, paire",
              remarque:"En EG, la parité simplifie l'étude des fonctions polynômes et circulaires." },
          ],
          exercices:[
            { id:'EX-FG1', niveau:'Facile', titre:'Domaine de définition',
              enonce:"Trouver D_f pour f(x)=√(x+2)/ln(x).",
              correction:"x+2≥0→x≥−2 ; x>0 ; x≠1.\nD_f=]0;1[∪]1;+∞[." },
            { id:'EX-FG2', niveau:'Facile', titre:'Parité',
              enonce:"f(x)=x³+sin x. Paire, impaire ou aucune ?",
              correction:"f(−x)=−x³+sin(−x)=−x³−sin x=−(x³+sin x)=−f(x).\nf est impaire." },
            { id:'EX-FG3', niveau:'Intermédiaire', titre:'Domaine complexe',
              enonce:"D_f pour f(x)=ln(x²−1)/√(3−x).",
              correction:"x²−1>0→x∈]−∞;−1[∪]1;+∞[\n3−x>0→x<3.\nD_f=]−∞;−1[∪]1;3[." },
          ]
        },
        {
          notion:'⚙️ Opérations sur les fonctions',
          theoremes:[
            { id:'D-FG3', type:'def', nom:'Opérations et composée',
              enonce:"Somme, produit, quotient (g≠0) : D=D_f∩D_g\n\nComposée (g∘f)(x)=g(f(x)) :\nD_{g∘f}={x∈D_f : f(x)∈D_g}\n\n√f(x) : D={x : f(x)≥0}\n|f(x)| : défini sur tout D_f\n\nApplication en EG :\nC(q) = coût total (q quantité)\nCm(q) = C'(q) = coût marginal (dérivée du coût)\nRecette R(q) = p·q\nBénéfice B(q) = R(q)−C(q)",
              remarque:"En économie, q≥0 toujours → le domaine est [0;+∞[ ou un sous-intervalle." },
          ],
          exercices:[
            { id:'EX-FG4', niveau:'Intermédiaire', titre:'Composée',
              enonce:"f(x)=√x, g(x)=x²−1. Calculer (g∘f)(x) et (f∘g)(x) avec leurs domaines.",
              correction:"(g∘f)(x)=(√x)²−1=x−1, D=[0;+∞[\n(f∘g)(x)=√(x²−1), D=]−∞;−1]∪[1;+∞[" },
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
  id:'limites-continuite', emoji:'∞', badge:'Analyse', color:'#10b981',
  titre:'Limites et Continuité',
  desc:"Limite finie/infinie en un point ou à l'infini, formes indéterminées, asymptotes (AV, AH, AO), TVI, théorème de la bijection, croissances comparées.",
  souschapitres:[
    {
      id:'sc-lim-calc', titre:'2.1 Calcul des limites',
      notions:['Limite en un point (finie, infinie)','Limite à l\'infini','Formes indéterminées : 0/0, ∞/∞, ∞−∞','Limites fondamentales sin x/x → 1, (eˣ−1)/x → 1'],
      blocs:[
        {
          notion:'∞ Opérations et formes indéterminées',
          theoremes:[
            { id:'D-LC1', type:'def', nom:'Limite d\'une fonction',
              enonce:"lim(x→a) f(x)=ℓ : f(x) arbitrairement proche de ℓ pour x→a\n\nOpérations (ℓ,m finis) :\nlim(f+g)=ℓ+m ; lim(fg)=ℓm ; lim(f/g)=ℓ/m (m≠0)\n\nFormes indéterminées à lever :\n0/0 → factoriser ou conjugué\n∞/∞ → terme dominant\n∞−∞ → factoriser ou mettre en facteur\n0×∞ → réécrire\n\nTerme dominant (polynôme) :\nlim(x→±∞) aₙxⁿ+…+a₀ = lim aₙxⁿ" },
            { id:'F-LC1', type:'formule', nom:'Limites fondamentales et croissances comparées',
              enonce:"lim(x→0) sin x/x = 1\nlim(x→0) (eˣ−1)/x = 1\nlim(x→0) ln(1+x)/x = 1\n\nCROISSANCES COMPARÉES (x→+∞) :\neˣ ≫ xⁿ ≫ ln x  (∀n>0)\nlim eˣ/xⁿ=+∞ ; lim xⁿ/eˣ=0\nlim(ln x)/xᵅ=0 ; lim x·ln x=+∞\nlim(x→0⁺) x·ln x=0",
              remarque:"En EG : ces limites servent à étudier les fonctions de coût et de recette à long terme." },
          ],
          exercices:[
            { id:'EX-LC1', niveau:'Facile', titre:'Forme 0/0',
              enonce:"Calculer lim(x→1) (x²−1)/(x−1).",
              correction:"=(x+1)(x−1)/(x−1)=x+1 → 2." },
            { id:'EX-LC2', niveau:'Intermédiaire', titre:'Forme ∞/∞',
              enonce:"Calculer lim(x→+∞) (3x²+x)/(x²−1).",
              correction:"Diviser par x² : (3+1/x)/(1−1/x²) → 3/1 = 3." },
            { id:'EX-LC3', niveau:'Difficile', titre:'Forme ∞−∞',
              enonce:"Calculer lim(x→+∞) [√(x²+2x)−x].",
              correction:"Conjugué : 2x/[√(x²+2x)+x]=2/[√(1+2/x)+1] → 2/2 = 1." },
          ]
        },
      ]
    },
    {
      id:'sc-asymptotes-cont', titre:'2.2 Asymptotes et continuité',
      notions:['AV x=a : lim|f(x)|=+∞','AH y=ℓ : lim f(x)=ℓ','AO y=mx+p : m=lim f/x, p=lim(f−mx)','TVI et théorème de la bijection'],
      blocs:[
        {
          notion:'📏 Asymptotes et TVI',
          theoremes:[
            { id:'D-LC2', type:'def', nom:'Asymptotes',
              enonce:"AV x=a : lim(x→a)|f(x)|=+∞\nAH y=ℓ : lim(x→±∞)f(x)=ℓ\nAO y=mx+p :\n  m=lim(x→±∞) f(x)/x\n  p=lim(x→±∞) [f(x)−mx]\n\nPosition de C_f par rapport à l'AO :\nSigne de f(x)−(mx+p)" },
            { id:'T-LC1', type:'thm', nom:'TVI et théorème de la bijection',
              enonce:"TVI : f continue sur [a,b], k entre f(a) et f(b) :\n∃c∈[a,b] : f(c)=k\n\nSi f(a)·f(b)<0 → ∃ racine dans ]a,b[\nSi f strictement monotone → c unique\n\nDichotomie : encadrer c par halvings\n\nBIJECTION : f continue et strictement monotone sur [a,b] :\n→ ∀k dans [f(a),f(b)], ∃!c : f(c)=k",
              remarque:"Application EG : résoudre C(q)=R(q) (seuil de rentabilité) par dichotomie." },
          ],
          exercices:[
            { id:'EX-LC4', niveau:'Intermédiaire', titre:'Asymptote oblique',
              enonce:"f(x)=(x²+3x+2)/(x+1). Trouver l'AO.",
              correction:"Division : x+2+0/(x+1). AO : y=x+2.\n(car (x²+3x+2)=(x+1)(x+2)→f(x)=x+2 pour x≠−1 → pas d'AO, droite!)" },
            { id:'EX-LC5', niveau:'Difficile', titre:'TVI — seuil de rentabilité',
              enonce:"C(q)=q³−6q²+15q (coût), R(q)=10q (recette). B(q)=R−C. Montrer que B admet une racine dans ]0;1[.",
              correction:"B(q)=−q³+6q²−5q=q(−q²+6q−5).\nB(0)=0 (pas utile). Étude signe : B(1)=−1+6−5=0. B(0,5)=0,5(−0,25+3−5)=0,5×(−2,25)<0.\nB(0,5)<0<B(1)... En fait B(1)=0 donc 1 est une racine.\nFactorisation : B=q(−q+1)(q−5) → racines 0;1;5." },
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
  id:'derivation', emoji:"f'", badge:'Analyse', color:'#10b981',
  titre:'Dérivation',
  desc:"Nombre dérivé, tangente, approximation affine, dérivées usuelles et règles de calcul, signe de f'(x), tableau de variations, extrema. Applications : coût marginal, optimisation.",
  souschapitres:[
    {
      id:'sc-der-regles', titre:'3.1 Calcul des dérivées',
      notions:['Nombre dérivé f\'(a) = taux d\'accroissement','Tangente y=f\'(a)(x−a)+f(a)','Dérivées usuelles','Règles : produit, quotient, composée'],
      blocs:[
        {
          notion:'📐 Dérivées usuelles et règles',
          theoremes:[
            { id:'D-DE1', type:'def', nom:'Nombre dérivé et tangente',
              enonce:"f'(a)=lim(h→0)[f(a+h)−f(a)]/h\n\nGéométrie : f'(a) = pente de la tangente en M(a,f(a))\nTangente : y=f'(a)(x−a)+f(a)\nApproximation affine : f(x)≈f(a)+f'(a)(x−a)\n\nApplication EG :\nCoût marginal : Cm(q₀)=C'(q₀)\n  ≈ coût supplémentaire pour produire une unité de plus\nRecette marginale : Rm(q₀)=R'(q₀)=p (si prix fixe)" },
            { id:'F-DE1', type:'formule', nom:'Dérivées usuelles',
              enonce:"(c)'=0 ; (xⁿ)'=nxⁿ⁻¹ ; (√x)'=1/(2√x) ; (1/x)'=−1/x²\n(eˣ)'=eˣ ; (ln x)'=1/x (x>0)\n(sin x)'=cos x ; (cos x)'=−sin x ; (tan x)'=1/cos²x" },
            { id:'F-DE2', type:'formule', nom:'Règles de dérivation',
              enonce:"(u+v)'=u'+v' ; (ku)'=ku'\n(uv)'=u'v+uv' ; (u/v)'=(u'v−uv')/v²\n(f∘g)'=(f'∘g)·g'\n\nFormules chaîne :\n(uⁿ)'=n·u'·uⁿ⁻¹ ; (√u)'=u'/(2√u)\n(eᵘ)'=u'·eᵘ ; (ln u)'=u'/u",
              remarque:"En EG : (eᵘ)' et (ln u)' apparaissent dans les fonctions de coût et de demande." },
          ],
          exercices:[
            { id:'EX-DE1', niveau:'Facile', titre:'Dérivée d\'un produit',
              enonce:"f(x)=(2x+1)(x²−3). Calculer f'(x).",
              correction:"f'(x)=2(x²−3)+(2x+1)·2x=2x²−6+4x²+2x=6x²+2x−6." },
            { id:'EX-DE2', niveau:'Intermédiaire', titre:'Coût marginal',
              enonce:"Coût total C(q)=0,01q³−0,3q²+4q+50 (q en centaines). Coût marginal en q=10.",
              correction:"C'(q)=0,03q²−0,6q+4.\nC'(10)=0,03×100−6+4=3−6+4=1.\nCm(10)=1 (milliers de DT par centaine d'unités)." },
          ]
        },
      ]
    },
    {
      id:'sc-variations-optim', titre:'3.2 Variations et optimisation',
      notions:['f\'(x)>0 → croissante','f\'(x)<0 → décroissante','Extremum local : f\'(a)=0 et changement de signe','Optimisation économique : max bénéfice, min coût moyen'],
      blocs:[
        {
          notion:'📈 Tableau de variations et optimisation',
          theoremes:[
            { id:'P-DE1', type:'prop', nom:'Monotonie, extrema et optimisation',
              enonce:"f'(x)>0 sur ]a,b[ → f croissante\nf'(x)<0 sur ]a,b[ → f décroissante\n\nExtremum local en α : f'(α)=0 et f' change de signe\n\nOPTIMISATION EG :\nMax bénéfice B(q)=R(q)−C(q) :\n→ B'(q)=0 ↔ R'(q)=C'(q) ↔ Rm=Cm (recette marg.=coût marg.)\n\nMin coût moyen CM(q)=C(q)/q :\n→ CM'(q)=0 ↔ C'(q)=C(q)/q ↔ Cm=CM\n\nCes conditions sont les règles d'optimisation microéconomiques classiques.",
              remarque:"Règle d'or de la microéconomie : profit maximum quand Rm=Cm." },
          ],
          exercices:[
            { id:'EX-DE3', niveau:'Intermédiaire', titre:'Maximisation du bénéfice',
              enonce:"R(q)=100q ; C(q)=q³−6q²+20q+50. Trouver q qui maximise B.",
              correction:"B(q)=−q³+6q²+80q−50.\nB'(q)=−3q²+12q+80=0.\nΔ=144+960=1104. √1104≈33,2.\nq=(12+33,2)/6≈7,5 ou q<0 (rejeté).\nVérifier B''=−6q+12<0 en q≈7,5 → maximum." },
            { id:'EX-DE4', niveau:'Difficile', titre:'Coût moyen minimum',
              enonce:"C(q)=q³−3q²+6q+50. Trouver q minimisant CM(q)=C(q)/q.",
              correction:"CM'(q)=(C'(q)·q−C(q))/q².\nCM'=0 ↔ C'(q)=C(q)/q ↔ q(3q²−6q+6)=q³−3q²+6q+50.\n3q³−6q²+6q=q³−3q²+6q+50\n2q³−3q²−50=0.\nTester q=5 : 2(125)−75−50=250−125=125≠0. Par Newton ou dichotomie : q≈4." },
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
  id:'etude-fonctions', emoji:'📉', badge:'Analyse', color:'#10b981',
  titre:'Étude de Fonctions',
  desc:"Polynômes (deg 2, 3, bicarrées), rationnelles (3 types), irrationnelles, circulaires. Applications économiques : coût, recette, bénéfice.",
  souschapitres:[
    {
      id:'sc-plan-etude', titre:'4.1 Méthode d\'étude complète',
      notions:['1. Domaine 2. Parité 3. Limites/asymptotes','4. Dérivée et signe 5. Tableau de variations','6. Extrema 7. Représentation graphique','Interprétation économique des variations'],
      blocs:[
        {
          notion:'📋 Plan d\'étude — Application EG',
          theoremes:[
            { id:'P-EF1', type:'prop', nom:'Étapes d\'une étude complète',
              enonce:"1. DOMAINE D_f\n2. PARITÉ : f(−x)=?\n3. LIMITES aux bornes → asymptotes\n4. f'(x) : calculer, factoriser, signe\n5. TABLEAU de variations\n6. EXTREMA (valeurs aux points critiques)\n7. REPRÉSENTATION graphique\n\nINTERPRÉTATION EG :\nSi C(q) croissante : coût augmente avec la production (normal)\nSi B(q) a un max en q₀ : q₀ = quantité optimale\nLa concavité de C indique les économies ou déséconomies d'échelle",
              remarque:"En EG, les fonctions sont souvent définies sur [0;+∞[ car q≥0." },
          ],
          exercices:[
            { id:'EX-EF1', niveau:'Intermédiaire', titre:'Étude d\'une fonction rationnelle (type 1)',
              enonce:"f(x)=(2x−1)/(x+1). Étude complète.",
              correction:"D=ℝ\\{−1}. AV: x=−1.\nm=lim f/x=2 → AH: y=2.\nf'(x)=3/(x+1)²>0 → f croissante sur chaque partie.\nCentre de symétrie I(−1;2)." },
          ]
        },
      ]
    },
    {
      id:'sc-fonctions-types', titre:'4.2 Polynômes, rationnelles, irrationnelles',
      notions:['Deg 2 : sommet, signe du trinôme','Deg 3 et bicarrée ax⁴+bx²+c','Rationnelle type 1 (centre de symétrie)','Irrationnelles √(ax+b), √(ax²+bx+c)'],
      blocs:[
        {
          notion:'📊 Types de fonctions en EG',
          theoremes:[
            { id:'D-EF1', type:'def', nom:'Fonctions polynômes et rationnelles',
              enonce:"DEG 2 : f(x)=ax²+bx+c\nSommet : x₀=−b/(2a) ; f(x₀)=−Δ/(4a)\nPARABOLE : vers le haut si a>0\n\nDEG 3 : f(x)=ax³+bx²+cx+d\n0, 1 ou 2 extrema locaux\n\nBICARRÉE : f(x)=ax⁴+bx²+c\nPoser X=x² (X≥0)\nf paire → étudier sur [0;+∞[\n\nRATIONNELLE TYPE 1 : f(x)=(ax+b)/(cx+d)\nAV : x=−d/c ; AH : y=a/c\nCentre de symétrie : I(−d/c ; a/c)\n\nRATIONNELLE TYPE 2 : (ax²+bx+c)/(dx+e)\n→ AV et AO (division euclidienne)" },
            { id:'D-EF2', type:'def', nom:'Irrationnelles — application EG',
              enonce:"f(x)=√(ax+b) :\nD=[−b/a;+∞[ si a>0\nf'(x)=a/(2√(ax+b))\n\nf(x)=√(ax²+bx+c) :\nD={x : ax²+bx+c≥0}\nf'(x)=(2ax+b)/(2√(ax²+bx+c))\n\nAPPLICATION EG — Fonction de production :\nQ(L)=√L (rendements décroissants)\nQ'(L)=1/(2√L) → productivité marginale décroissante\n\nLoi de Cobb-Douglas simplifiée :\nQ=A·Kᵅ·Lᵝ (K capital fixe → Q∝Lᵝ)",
              remarque:"En économie, √q modélise les rendements décroissants très fréquemment." },
          ],
          exercices:[
            { id:'EX-EF2', niveau:'Facile', titre:'Irrationnelle',
              enonce:"f(q)=√(4q+9). Domaine, dérivée, variations.",
              correction:"4q+9≥0 → D=[−9/4;+∞[.\nf'(q)=4/(2√(4q+9))=2/√(4q+9)>0 → f croissante sur D." },
            { id:'EX-EF3', niveau:'Intermédiaire', titre:'Bicarrée',
              enonce:"f(x)=x⁴−5x²+4. Racines, extrema.",
              correction:"X=x² : X²−5X+4=(X−1)(X−4)→X=1 ou 4→x=±1 ou ±2.\nf'(x)=4x³−10x=2x(2x²−5)=0→x=0 ou x=±√(5/2).\nf(0)=4 max local ; f(±√2,5)=6,25−12,5+4=−2,25 min local." },
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
  id:'logarithme', emoji:'ln', badge:'Analyse', color:'#10b981',
  titre:'Logarithme Népérien',
  desc:"Définition ln x pour x>0, propriétés algébriques, dérivée (ln u)'=u'/u, étude complète, fonctions du type ln(u(x)). Application : élasticité, taux de croissance.",
  souschapitres:[
    {
      id:'sc-ln-prop', titre:'5.1 Propriétés et dérivée',
      notions:['ln x défini sur ]0;+∞[, ln 1=0, ln e=1','ln(ab)=ln a+ln b, ln(aⁿ)=n·ln a','(ln x)\'=1/x ; (ln u)\'=u\'/u','Croissances comparées : ln x≪xᵅ'],
      blocs:[
        {
          notion:'📐 Propriétés algébriques de ln',
          theoremes:[
            { id:'D-LN1', type:'def', nom:'Logarithme népérien — définition et propriétés',
              enonce:"ln est la primitive de 1/x sur ]0;+∞[ valant 0 en 1.\n\nDomaine : ]0;+∞[ ; ln 1=0 ; ln e=1\nln et exp sont réciproques : ln(eˣ)=x et e^(ln x)=x\n\nPROPRIÉTÉS ALGÉBRIQUES (a,b>0) :\nln(ab) = ln a+ln b\nln(a/b) = ln a−ln b\nln(aⁿ) = n·ln a\nln(1/a) = −ln a\n\nAPPLICATIONS EG :\nTaux de croissance continu : ln(Pt/P₀)=r·t\nÉlasticité : ε=d(ln Q)/d(ln P)=P·(dQ/dP)/Q\nDoubler le revenu : Δln(R)=ln 2≈0,693" },
            { id:'F-LN1', type:'formule', nom:'Dérivée de ln et composée',
              enonce:"(ln x)' = 1/x  (x>0)\n(ln u)' = u'/u  (u>0)\n\nExemples :\n(ln(x²+1))' = 2x/(x²+1)\n(ln(2x+3))' = 2/(2x+3)\n(ln|x|)' = 1/x  (x≠0)\n\nLINÉARISATION approchée :\nln(1+x)≈x pour x petit (développement)\nln(1,05)≈0,05 ; ln(0,98)≈−0,02",
              remarque:"En EG : ln(Pₜ/P₀)=taux de variation continue → très utilisé en croissance économique." },
          ],
          exercices:[
            { id:'EX-LN1', niveau:'Facile', titre:'Propriétés algébriques',
              enonce:"Simplifier ln(8)−ln(4)+ln(1/2).",
              correction:"=ln(8/4)+ln(1/2)=ln(2)+ln(1/2)=ln(2×1/2)=ln(1)=0." },
            { id:'EX-LN2', niveau:'Facile', titre:'Dérivée composée',
              enonce:"f(x)=ln(3x²+1). Calculer f'(x).",
              correction:"u=3x²+1, u'=6x.\nf'(x)=6x/(3x²+1)." },
            { id:'EX-LN3', niveau:'Intermédiaire', titre:'Taux de croissance',
              enonce:"Une entreprise passe de 100 à 150 employés. Calculer le taux de croissance continue.",
              correction:"ln(150/100)=ln(1,5)≈0,405.\nTaux de croissance continue ≈ 40,5%." },
          ]
        },
      ]
    },
    {
      id:'sc-ln-etude', titre:'5.2 Étude de ln et de ln(u(x))',
      notions:['ln strictement croissante sur ]0;+∞[','lim(x→0⁺) ln x=−∞ ; lim(x→+∞) ln x=+∞','lim x·ln x=0 (x→0⁺)','Étude de f(x)=ln(u(x))'],
      blocs:[
        {
          notion:'📈 Étude complète de ln',
          theoremes:[
            { id:'T-LN1', type:'thm', nom:'Propriétés de la fonction ln',
              enonce:"ln est strictement croissante sur ]0;+∞[ (car (ln x)'=1/x>0)\n\nLIMITES :\nlim(x→0⁺) ln x = −∞\nlim(x→+∞) ln x = +∞\n\nCROISSANCES COMPARÉES :\nlim(x→+∞) (ln x)/xᵅ = 0  (α>0)  → ln négligeable devant xᵅ\nlim(x→0⁺) x·ln x = 0\nlim(x→+∞) x·ln x = +∞\n\nCourbe de ln :\nPasse par (1;0) et (e;1)\nTangente en 1 d'équation y=x−1\nBranche verticale x=0 (AV)",
              remarque:"ln x < x pour tout x>0 → utile pour comparer croissances." },
            { id:'M-LN1', type:'methode', nom:'Étude de f(x)=A·ln(u(x))+B',
              enonce:"1. Domaine : u(x)>0\n2. f'(x)=A·u'(x)/u(x)\n   Signe de f' = signe de A·u'(x)\n3. Limites aux bornes\n4. Tableau de variations\n\nExemple : f(q)=q·ln(q) sur ]0;+∞[\nf'(q)=ln(q)+1=0 → q=1/e\nf'<0 sur ]0;1/e[ → décroissante\nf'>0 sur ]1/e;+∞[ → croissante\nMin en q=1/e : f(1/e)=−1/e" },
          ],
          exercices:[
            { id:'EX-LN4', niveau:'Intermédiaire', titre:'Étude de x−ln x',
              enonce:"f(x)=x−ln x sur ]0;+∞[. Variations, minimum.",
              correction:"f'(x)=1−1/x=(x−1)/x.\nf'=0 en x=1. f'<0 sur ]0;1[, f'>0 sur ]1;+∞[.\nMin en x=1 : f(1)=1." },
            { id:'EX-LN5', niveau:'Difficile', titre:'Application : coût et logarithme',
              enonce:"C(q)=100+50·ln(q+1). Coût marginal et variations.",
              correction:"C'(q)=50/(q+1).\nCm=50/(q+1)>0 → C toujours croissante.\nCm décroissante (50/(q+1)↘) → économies d'échelle.\nlim(q→+∞) C'(q)=0 : coût marginal tend vers 0." },
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
  id:'exponentielle', emoji:'eˣ', badge:'Analyse', color:'#10b981',
  titre:'Fonction Exponentielle',
  desc:"Définition eˣ (réciproque de ln), propriétés, dérivée (eᵘ)'=u'eᵘ, étude complète, fonctions du type e^(u(x)). Applications : croissance économique, actualisation.",
  souschapitres:[
    {
      id:'sc-exp-prop', titre:'6.1 Propriétés et dérivée',
      notions:['eˣ réciproque de ln x','e^(a+b)=eᵃ·eᵇ ; e⁰=1 ; eˣ>0','(eˣ)\'=eˣ ; (eᵘ)\'=u\'·eᵘ','Domaine ℝ, image ]0;+∞['],
      blocs:[
        {
          notion:'📐 Propriétés de exp',
          theoremes:[
            { id:'D-EX1', type:'def', nom:'Fonction exponentielle — définition',
              enonce:"eˣ est la réciproque de ln : e^(ln x)=x (x>0) et ln(eˣ)=x\n\nPROPRIÉTÉS ALGÉBRIQUES :\ne^(a+b)=eᵃ·eᵇ ; e^(a−b)=eᵃ/eᵇ\n(eᵃ)ⁿ=e^(na) ; e^(−a)=1/eᵃ\ne⁰=1 ; e¹=e≈2,718 ; eˣ>0 toujours\n\nAPPLICATIONS EG :\nCroissance économique : Yₜ=Y₀·e^(r·t)\nActualisation : VA=VF·e^(−r·t)\nCroissance de la population : Pₜ=P₀·e^(k·t)\nDésintégration de dettes : D(t)=D₀·e^(−α·t)\n\nDoublement en temps T :\ne^(rT)=2 → T=ln2/r≈0,693/r\n«Règle des 70» : T≈70/r (r en %)." },
            { id:'F-EX1', type:'formule', nom:'Dérivée de exp et composée',
              enonce:"(eˣ)'=eˣ\n(eᵘ)'=u'·eᵘ\n\nExemples :\n(e^(3x))'=3e^(3x)\n(e^(−x))'=−e^(−x)\n(e^(x²))'=2xe^(x²)\n(e^(ax+b))'=a·e^(ax+b)\n\nSigne : eᵘ>0 toujours → signe de (eᵘ)'=signe de u'",
              remarque:"Règle des 70 : si PIB croît à r%/an, il double en ≈70/r ans." },
          ],
          exercices:[
            { id:'EX-EX1', niveau:'Facile', titre:'Dérivée composée',
              enonce:"f(x)=e^(2x²−1). Calculer f'(x).",
              correction:"u=2x²−1, u'=4x.\nf'(x)=4x·e^(2x²−1)." },
            { id:'EX-EX2', niveau:'Intermédiaire', titre:'Résolution — actualisation',
              enonce:"Trouver t tel que e^(0,05t)=2 (doublement du capital à 5%/an).",
              correction:"0,05t=ln2 → t=ln2/0,05=0,693/0,05≈13,9 ans.\n(Règle des 70 : 70/5=14 ans ✓)" },
          ]
        },
      ]
    },
    {
      id:'sc-exp-etude', titre:'6.2 Étude de fonctions exponentielles',
      notions:['exp strictement croissante (car (eˣ)\'=eˣ>0)','lim(x→−∞) eˣ=0 (AH y=0) ; lim(x→+∞) eˣ=+∞','Étude de P(x)·e^(ax)','Applications économiques'],
      blocs:[
        {
          notion:'📈 Études exponentielles et applications EG',
          theoremes:[
            { id:'T-EX1', type:'thm', nom:'Propriétés de exp et limites',
              enonce:"exp strictement CROISSANTE sur ℝ\nlim(x→−∞)eˣ=0 (AH y=0 en −∞)\nlim(x→+∞)eˣ=+∞\n\nCROISSANCES COMPARÉES :\nlim(x→+∞) eˣ/xⁿ=+∞ (exp≫polynôme)\nlim(x→+∞) xⁿ·e^(−x)=0\n\nÉTUDE DE f(x)=P(x)·eˣ :\nf'(x)=[P'(x)+P(x)]·eˣ\nSigne de f'=signe de P'(x)+P(x)\n\nÉTUDE DE f(t)=A·e^(rt) (croissance) :\nf'(t)=A·r·e^(rt)\nr>0 : croissante (croissance économique)\nr<0 : décroissante (actualisation, dépréciation)" },
            { id:'M-EX1', type:'methode', nom:'Actualisation et valeur actuelle',
              enonce:"Flux futur FT reçu en t ans :\nValeur actuelle (VA) = FT·e^(−r·t)\n\nAnnuité perpétuelle : VA=a/r\n(a: annuité, r: taux continu)\n\nLien ln et exp :\nVA=FT·e^(−rt)\nln(VA)=ln(FT)−rt\nPente de ln(VA) vs t : −r (taux d'actualisation)\n\nVAN = Σ FTₜ·e^(−rₜ·t) − I₀\nVAN>0 → investissement rentable" },
          ],
          exercices:[
            { id:'EX-EX3', niveau:'Intermédiaire', titre:'Valeur actuelle',
              enonce:"Capital de 10 000 DT dans 5 ans. Taux r=4% continu. Valeur actuelle ?",
              correction:"VA=10000·e^(−0,04×5)=10000·e^(−0,2).\ne^(−0,2)≈0,819.\nVA≈8 187 DT." },
            { id:'EX-EX4', niveau:'Difficile', titre:'Étude de xe^(−x)',
              enonce:"f(q)=q·e^(−0,1q) sur [0;+∞[. Variations et maximum.",
              correction:"f'(q)=e^(−0,1q)−0,1q·e^(−0,1q)=e^(−0,1q)(1−0,1q).\nf'=0 en q=10. f'>0 sur ]0;10[, f'<0 sur ]10;+∞[.\nMax en q=10 : f(10)=10e^(−1)≈3,68.\nlim(q→+∞)f=0 (AH y=0)." },
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
  id:'suites', emoji:'uₙ', badge:'Analyse', color:'#10b981',
  titre:'Suites Numériques',
  desc:"Suites arithmétiques (intérêts simples), géométriques (intérêts composés, actualisation), récurrentes affines, convergence, gendarmes. Applications financières.",
  souschapitres:[
    {
      id:'sc-suites-class', titre:'7.1 Suites arithmétiques et géométriques',
      notions:['Arithmétique : uₙ=u₀+nr (intérêts simples)','Géométrique : uₙ=u₀·qⁿ (intérêts composés)','Somme de n termes','Comportement à l\'infini'],
      blocs:[
        {
          notion:'💰 Suites et finance',
          theoremes:[
            { id:'D-SU1', type:'def', nom:'Arithmétiques et géométriques — applications EG',
              enonce:"ARITHMÉTIQUE (raison r) : uₙ₊₁=uₙ+r\nuₙ=u₀+nr\nSomme=n(u₀+uₙ₋₁)/2\n\nAPPLICATION : INTÉRÊTS SIMPLES\nCapital Cₙ=C₀+n·i·C₀=C₀(1+ni)\n(i taux d'intérêt, n nombre de périodes)\n\nGÉOMÉTRIQUE (raison q≠0) : uₙ₊₁=q·uₙ\nuₙ=u₀·qⁿ\nSomme=u₀(1−qⁿ)/(1−q) (q≠1)\n\nAPPLICATION : INTÉRÊTS COMPOSÉS\nCₙ=C₀·(1+i)ⁿ  (q=1+i)\n→ Doublement : (1+i)ⁿ=2 → n=ln2/ln(1+i)\n\nANNUITÉS :\nValeur future : VF=a·[(1+i)ⁿ−1]/i\nValeur actuelle : VA=a·[1−(1+i)^(−n)]/i",
              remarque:"En EG : suites géométriques = modèle fondamental de la finance (capitalisation et actualisation)." },
          ],
          exercices:[
            { id:'EX-SU1', niveau:'Facile', titre:'Intérêts composés',
              enonce:"Placement de 5000 DT à 3%/an composé. Valeur après 10 ans.",
              correction:"C₁₀=5000×(1,03)¹⁰=5000×1,344≈6720 DT." },
            { id:'EX-SU2', niveau:'Intermédiaire', titre:'Annuités',
              enonce:"Annuités de 1000 DT pendant 5 ans à 4%/an. Valeur actuelle ?",
              correction:"VA=1000·[1−(1,04)^(−5)]/0,04=1000·[1−0,822]/0,04\n=1000×0,178/0,04=1000×4,45=4450 DT." },
          ]
        },
      ]
    },
    {
      id:'sc-suites-rec', titre:'7.2 Suites récurrentes et convergence',
      notions:['Suite affine uₙ₊₁=auₙ+b : uₙ=ℓ+(u₀−ℓ)aⁿ','Convergence si |a|<1','Théorème des gendarmes','Principe de récurrence'],
      blocs:[
        {
          notion:'🔄 Récurrentes affines et convergence',
          theoremes:[
            { id:'M-SU1', type:'methode', nom:'Suite affine uₙ₊₁=auₙ+b',
              enonce:"1. Point fixe ℓ=b/(1−a) (si a≠1)\n2. vₙ=uₙ−ℓ → vₙ₊₁=a·vₙ\n3. uₙ=ℓ+(u₀−ℓ)·aⁿ\n\n|a|<1 → uₙ→ℓ (converge)\na=1 → arithmétique\n|a|>1 → diverge\n\nAPPLICATION EG — Stock d'une entreprise :\nSₙ₊₁=α·Sₙ+C (α : taux de réutilisation, C : commande fixe)\nSi |α|<1 → stock tend vers l'équilibre ℓ=C/(1−α)\n\nMODÈLE DE CROISSANCE DISCRETE :\nYₙ₊₁=(1+g)·Yₙ → suite géométrique de raison 1+g",
              remarque:"En EG : les modèles de court terme utilisent souvent des suites affines (stocks, trésorerie)." },
            { id:'T-SU1', type:'thm', nom:'Suite monotone bornée et gendarmes',
              enonce:"Croissante + majorée → converge\nDécroissante + minorée → converge\n\nTHÉORÈME DES GENDARMES :\nuₙ≤vₙ≤wₙ et lim uₙ=lim wₙ=ℓ → lim vₙ=ℓ\n\nPRINCIPE DE RÉCURRENCE :\n1. Initialisation P(n₀)\n2. P(n) → P(n+1)\n→ P(n) vraie pour tout n≥n₀" },
          ],
          exercices:[
            { id:'EX-SU3', niveau:'Facile', titre:'Modèle de stock',
              enonce:"Sₙ₊₁=0,7·Sₙ+300, S₀=1000. Exprimer Sₙ et trouver la limite.",
              correction:"ℓ=300/(1−0,7)=1000. vₙ=Sₙ−1000.\nv₀=0. vₙ=0·0,7ⁿ=0.\nSₙ=1000 (constante car S₀=ℓ).\n\nSi S₀=500 : vₙ=(500−1000)×0,7ⁿ=−500×0,7ⁿ → 0.\nSₙ=1000−500×0,7ⁿ → 1000." },
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
  desc:"Vecteurs 3D, produit scalaire, droites et plans (paramétrique et cartésien), positions relatives, distances point-plan.",
  souschapitres:[
    {
      id:'sc-vect3d', titre:'8.1 Vecteurs et produit scalaire',
      notions:['Vecteur u⃗(a;b;c), |u⃗|=√(a²+b²+c²)','Produit scalaire u⃗·v⃗=aa\'+bb\'+cc\'','Orthogonalité u⃗·v⃗=0','Coplanarité det(u⃗,v⃗,w⃗)=0'],
      blocs:[
        {
          notion:'🔷 Vecteurs dans l\'espace',
          theoremes:[
            { id:'F-GE1', type:'formule', nom:'Produit scalaire et orthogonalité',
              enonce:"(O;i⃗;j⃗;k⃗) repère orthonormé\nu⃗(a;b;c) ; |u⃗|=√(a²+b²+c²)\n\nPRODUIT SCALAIRE :\nu⃗·v⃗=aa'+bb'+cc'\nu⃗·v⃗=|u⃗||v⃗|cosθ\nOrthogonalité : u⃗·v⃗=0\n\nCOPLANARITÉ u⃗,v⃗,w⃗ :\ndet(u⃗,v⃗,w⃗)=0\n\nDistance entre A et B :\nd(A,B)=|AB⃗|=√(Σ(xB−xA)²)" },
          ],
          exercices:[
            { id:'EX-GE1', niveau:'Facile', titre:'Produit scalaire',
              enonce:"u⃗(2;−1;3), v⃗(1;4;−1). Calculer u⃗·v⃗. Orthogonaux ?",
              correction:"u⃗·v⃗=2−4−3=−5≠0. Non orthogonaux." },
          ]
        },
      ]
    },
    {
      id:'sc-plans-droites', titre:'8.2 Plans et droites — Distances',
      notions:['Plan ax+by+cz+d=0','Droite paramétrique M=A+t·u⃗','Positions relatives droite-plan','Distance point-plan'],
      blocs:[
        {
          notion:'📐 Équations et distances',
          theoremes:[
            { id:'F-GE2', type:'formule', nom:'Plans, droites et distances',
              enonce:"PLAN par A₀(x₀;y₀;z₀), normale n⃗(a;b;c) :\na(x−x₀)+b(y−y₀)+c(z−z₀)=0\n\nDROITE (A,u⃗) :\n{x=x₀+at ; y=y₀+bt ; z=z₀+ct}  t∈ℝ\n\nPositions droite-plan :\nu⃗·n⃗=0 et A∉plan → ∥ plan\nu⃗·n⃗=0 et A∈plan → ⊂ plan\nu⃗·n⃗≠0 → intersection\n\nDISTANCE M₀(x₀;y₀;z₀) au plan ax+by+cz+d=0 :\nd=|ax₀+by₀+cz₀+d|/√(a²+b²+c²)" },
          ],
          exercices:[
            { id:'EX-GE2', niveau:'Facile', titre:'Équation d\'un plan',
              enonce:"Plan par A(1;2;3) de normale n⃗(2;−1;1).",
              correction:"2(x−1)−(y−2)+(z−3)=0 → 2x−y+z=3." },
            { id:'EX-GE3', niveau:'Intermédiaire', titre:'Distance point-plan',
              enonce:"Distance de M(1;1;1) au plan 2x+y−2z+3=0.",
              correction:"d=|2+1−2+3|/√(4+1+4)=4/3." },
          ]
        },
      ]
    },
  ]
},

// ─────────────────────────────────────────────────────────────────────
// CH 09 — STATISTIQUES À DEUX VARIABLES ★
// ─────────────────────────────────────────────────────────────────────
'statistiques': {
  id:'statistiques', emoji:'📊', badge:'Statistiques', color:'#f97316',
  titre:'Statistiques — Séries à deux variables',
  desc:"Nuage de points, point moyen G(x̄;ȳ), droite de régression (moindres carrés), coefficient de corrélation r, prévisions. Applications économiques : consommation/revenu, demande/prix.",
  souschapitres:[
    {
      id:'sc-nuage', titre:'9.1 Nuage de points et point moyen',
      notions:['Série (xᵢ,yᵢ) : nuage de points','x̄=Σxᵢ/n ; ȳ=Σyᵢ/n','Point moyen G(x̄;ȳ)','Covariance et variances'],
      blocs:[
        {
          notion:'📍 Nuage et point moyen',
          theoremes:[
            { id:'D-ST1', type:'def', nom:'Série à deux variables',
              enonce:"n couples (xᵢ;yᵢ) — variable x (explicative), variable y (expliquée)\n\nMOYENNES :\nx̄=(1/n)Σxᵢ ; ȳ=(1/n)Σyᵢ\n\nPOINT MOYEN G(x̄;ȳ) : la droite de régression passe TOUJOURS par G\n\nVARIANCES ET COVARIANCE :\nσx²=(1/n)Σxᵢ²−x̄²\nσy²=(1/n)Σyᵢ²−ȳ²\ncov(X,Y)=(1/n)Σxᵢyᵢ−x̄·ȳ\n\nAPPLICATIONS EG :\nx=revenu, y=consommation → fonction de consommation keynésienne\nx=prix, y=quantité demandée → fonction de demande\nx=PIB, y=investissement → accélérateur économique",
              remarque:"En EG : la régression sert souvent à estimer la propension marginale à consommer (pente a)." },
          ],
          exercices:[
            { id:'EX-ST1', niveau:'Facile', titre:'Point moyen',
              enonce:"Revenus (x): 2,3,4,5,6 (milliers DT). Consommations (y): 1,8;2,5;3,2;4,0;4,5.",
              correction:"x̄=(2+3+4+5+6)/5=4.\nȳ=(1,8+2,5+3,2+4,0+4,5)/5=16/5=3,2.\nG(4;3,2)." },
          ]
        },
      ]
    },
    {
      id:'sc-regression', titre:'9.2 Droite de régression et coefficient r',
      notions:['a=cov(X,Y)/σx² (pente)','b=ȳ−a·x̄ (ordonnée)','r=cov/(σxσy) ∈[−1;1]','|r|→1 : forte corrélation, prévisions fiables'],
      blocs:[
        {
          notion:'📉 Régression et corrélation',
          theoremes:[
            { id:'F-ST1', type:'formule', nom:'Droite de régression et coefficient r',
              enonce:"DROITE y=ax+b :\na = cov(X,Y)/σx² = [Σxᵢyᵢ−n·x̄·ȳ]/[Σxᵢ²−n·x̄²]\nb = ȳ−a·x̄\n\nLa droite passe par G(x̄;ȳ) ✓\n\nCOEFFICIENT r :\nr = cov(X,Y)/(σx·σy)\n\n−1≤r≤1\n|r|≈1 : corrélation forte\n|r|≈0 : pas de corrélation linéaire\nr>0 : corrélation positive (x↑→y↑)\nr<0 : corrélation négative (x↑→y↓)\n\nINTERPRÉTATION EG :\na : propension marginale à consommer (si y=conso, x=revenu)\nb : consommation autonome\nr : qualité de l'ajustement linéaire",
              remarque:"Seuil pratique : |r|≥0,9 → corrélation forte → prévisions fiables." },
            { id:'M-ST1', type:'methode', nom:'Tableau de calcul et prévision',
              enonce:"TABLEAU :\n| xᵢ | yᵢ | xᵢ² | yᵢ² | xᵢyᵢ |\n\n1. Calculer Σxᵢ, Σyᵢ, Σxᵢ², Σyᵢ², Σxᵢyᵢ\n2. x̄=Σxᵢ/n, ȳ=Σyᵢ/n\n3. a=(Σxᵢyᵢ−n·x̄·ȳ)/(Σxᵢ²−n·x̄²)\n4. b=ȳ−a·x̄\n5. r=cov/(σxσy)\n6. PRÉVISION : pour x=x₀, ŷ=ax₀+b\n\nVérification : G(x̄;ȳ) sur la droite\na·x̄+b = a·x̄+(ȳ−a·x̄) = ȳ ✓" },
          ],
          exercices:[
            { id:'EX-ST2', niveau:'Intermédiaire', titre:'Fonction de consommation',
              enonce:"Revenus x (milliers DT) : 2,3,4,5,6. Consommations y : 1,8;2,5;3,2;4,0;4,5. Trouver la droite de régression et estimer la conso pour x=7.",
              correction:"x̄=4 ; ȳ=3,2.\nΣxᵢyᵢ=2×1,8+3×2,5+4×3,2+5×4+6×4,5=3,6+7,5+12,8+20+27=70,9.\nΣxᵢ²=4+9+16+25+36=90.\na=(70,9−5×4×3,2)/(90−5×16)=(70,9−64)/(90−80)=6,9/10=0,69.\nb=3,2−0,69×4=3,2−2,76=0,44.\ny=0,69x+0,44.\nPour x=7 : ŷ=0,69×7+0,44=4,83+0,44=5,27 milliers DT." },
            { id:'EX-ST3', niveau:'Difficile', titre:'Coefficient de corrélation',
              enonce:"Même série. Calculer r.",
              correction:"Σyᵢ²=3,24+6,25+10,24+16+20,25=56.\nσx²=90/5−16=18−16=2, σx=√2≈1,414.\nσy²=56/5−10,24=11,2−10,24=0,96, σy=√0,96≈0,98.\ncov=70,9/5−4×3,2=14,18−12,8=1,38.\nr=1,38/(1,414×0,98)=1,38/1,386≈0,996.\nTrès forte corrélation positive ✓" },
          ]
        },
      ]
    },
  ]
},

// ─────────────────────────────────────────────────────────────────────
// CH 10 — DÉNOMBREMENT
// ─────────────────────────────────────────────────────────────────────
'denombrement': {
  id:'denombrement', emoji:'🔢', badge:'Probabilités', color:'#f5c842',
  titre:'Dénombrement',
  desc:"Arrangements Aₙᵖ, permutations n!, combinaisons Cₙᵖ, binôme de Newton. Applications en gestion et probabilités.",
  souschapitres:[
    {
      id:'sc-arr-perm', titre:'10.1 Arrangements et permutations',
      notions:['Principe multiplicatif','Arrangement Aₙᵖ=n!/(n−p)! (ordre compte)','Permutation n!','Factorielle : 0!=1'],
      blocs:[
        {
          notion:'🎯 Arrangements et permutations',
          theoremes:[
            { id:'D-DN1', type:'def', nom:'Arrangements et permutations',
              enonce:"PRINCIPE MULTIPLICATIF :\nk choix successifs indépendants (n₁,n₂,…,nₖ) :\nNombre total = n₁×n₂×…×nₖ\n\nARRANGEMENT Aₙᵖ (ordre compte, sans répétition) :\nAₙᵖ = n!/(n−p)! = n×(n−1)×…×(n−p+1)\n\nPERMUTATION : p=n → Aₙⁿ=n!\n\nFactorielle : 0!=1 ; 5!=120 ; 7!=5040\n\nAPPLICATION EG :\nNombre d'ordres de traitement de n dossiers = n!\nNombre de classements possibles de p candidats parmi n = Aₙᵖ" },
          ],
          exercices:[
            { id:'EX-DN1', niveau:'Facile', titre:'Arrangement',
              enonce:"10 candidats, 3 postes distincts (DG, DAF, DRH). Combien de façons ?",
              correction:"A₁₀³=10×9×8=720." },
            { id:'EX-DN2', niveau:'Intermédiaire', titre:'Permutation',
              enonce:"6 réunions à planifier dans une journée. Combien d'ordres du jour ?",
              correction:"6!=720." },
          ]
        },
      ]
    },
    {
      id:'sc-combin', titre:'10.2 Combinaisons et binôme',
      notions:['Cₙᵖ=n!/[p!(n−p)!] (ordre ne compte pas)','Propriétés : Cₙᵖ=Cₙⁿ⁻ᵖ, Pascal','(a+b)ⁿ=Σ Cₙᵏ aᵏ bⁿ⁻ᵏ','Applications : sélection de membres, comités'],
      blocs:[
        {
          notion:'📊 Combinaisons et binôme',
          theoremes:[
            { id:'F-DN1', type:'formule', nom:'Combinaisons et binôme de Newton',
              enonce:"Cₙᵖ = n!/[p!(n−p)!] (sélection sans ordre)\n\nPROPRIÉTÉS :\nCₙ⁰=Cₙⁿ=1 ; Cₙᵖ=Cₙⁿ⁻ᵖ\nFormule de Pascal : Cₙᵖ=Cₙ₋₁ᵖ⁻¹+Cₙ₋₁ᵖ\n\nBINÔME DE NEWTON :\n(a+b)ⁿ=Σₖ₌₀ⁿ Cₙᵏ·aᵏ·bⁿ⁻ᵏ\nΣ Cₙᵏ=2ⁿ (poser a=b=1)\n\nAPPLICATION EG :\nComité de p membres choisis parmi n : Cₙᵖ\nNombre de sous-marchés de taille k : Cₙᵏ\nPortefeuilles de p actions parmi n : Cₙᵖ",
              remarque:"Cₙᵖ=Cₙⁿ⁻ᵖ simplifie : C₁₀⁸=C₁₀²=45 (10×9/2)." },
          ],
          exercices:[
            { id:'EX-DN3', niveau:'Facile', titre:'Comité',
              enonce:"CA de 12 membres. Sélectionner un comité de 4. Combien de comités ?",
              correction:"C₁₂⁴=12!/(4!×8!)=12×11×10×9/24=495." },
            { id:'EX-DN4', niveau:'Intermédiaire', titre:'Contrainte',
              enonce:"8 candidats (5 hommes, 3 femmes). Sélectionner 3 dont au moins 1 femme.",
              correction:"Total : C₈³=56. Aucune femme : C₅³=10.\nAu moins 1 femme : 56−10=46." },
          ]
        },
      ]
    },
  ]
},

// ─────────────────────────────────────────────────────────────────────
// CH 11 — PROBABILITÉS
// ─────────────────────────────────────────────────────────────────────
'probabilites': {
  id:'probabilites', emoji:'🎲', badge:'Probabilités', color:'#f5c842',
  titre:'Probabilités',
  desc:"Probabilité sur ensemble fini, équiprobabilité, P(A∪B), probabilités conditionnelles P(A|B), indépendance, probabilités totales, Bayes. Applications : risques, contrôle qualité.",
  souschapitres:[
    {
      id:'sc-proba-base', titre:'11.1 Probabilités — Bases',
      notions:['Espace (Ω,P) : axiomes','P(A∪B)=P(A)+P(B)−P(A∩B)','Équiprobabilité : P(A)=|A|/|Ω|','Contraire : P(Ā)=1−P(A)'],
      blocs:[
        {
          notion:'🎯 Calcul de probabilités',
          theoremes:[
            { id:'D-PR1', type:'def', nom:'Espace probabilisé',
              enonce:"Ω = univers (tous résultats possibles)\nÉvénement A⊂Ω\n\nAXIOMES : P(Ω)=1 ; P(∅)=0 ; 0≤P(A)≤1\nA∩B=∅ → P(A∪B)=P(A)+P(B)\nP(Ā)=1−P(A)\n\nFORMULE GÉNÉRALE :\nP(A∪B)=P(A)+P(B)−P(A∩B)\n\nÉQUIPROBABILITÉ : P(A)=|A|/|Ω|\n\nAPPLICATION EG — CONTRÔLE QUALITÉ :\nLot de N pièces avec D défectueuses.\nP(défectueuse)=D/N\nP(2 défectueuses en 2 tirages sans remise)\n=D(D−1)/[N(N−1)]" },
          ],
          exercices:[
            { id:'EX-PR1', niveau:'Facile', titre:'Contrôle qualité',
              enonce:"Lot de 20 pièces : 4 défectueuses. P(tirer 1 défectueuse) ?",
              correction:"P=4/20=1/5=0,2." },
            { id:'EX-PR2', niveau:'Intermédiaire', titre:'P(A∪B)',
              enonce:"P(A)=0,4 ; P(B)=0,3 ; P(A∩B)=0,1. Calculer P(A∪B) et P(Ā∩B̄).",
              correction:"P(A∪B)=0,4+0,3−0,1=0,6.\nP(Ā∩B̄)=P(Ā∪B̄ complémentaire)=1−P(A∪B)=0,4." },
          ]
        },
      ]
    },
    {
      id:'sc-proba-cond', titre:'11.2 Probabilités conditionnelles et Bayes',
      notions:['P(A|B)=P(A∩B)/P(B)','Indépendance : P(A∩B)=P(A)·P(B)','Probabilités totales','Formule de Bayes — diagnostic'],
      blocs:[
        {
          notion:'🔗 Conditionnement, Bayes et applications EG',
          theoremes:[
            { id:'D-PR2', type:'def', nom:'Probabilité conditionnelle et indépendance',
              enonce:"P(A|B)=P(A∩B)/P(B) (P(B)>0)\n«Probabilité de A sachant que B est réalisé»\n\nP(A∩B)=P(B)·P(A|B)\n\nINDÉPENDANCE :\nA et B indép. ↔ P(A∩B)=P(A)·P(B)\n\nAPPLICATION EG — RISQUE CRÉDIT :\nA=«défaut de paiement» ; B=«mauvaise notation»\nP(A|B) = probabilité de défaut sachant mauvaise notation\n→ Base de la notation de crédit (rating)" },
            { id:'T-PR1', type:'thm', nom:'Probabilités totales et Bayes',
              enonce:"Partition {B₁,…,Bₙ} de Ω :\n\nPROBABILITÉS TOTALES :\nP(A)=Σ P(A|Bᵢ)·P(Bᵢ)\n\nFORMULE DE BAYES :\nP(Bⱼ|A)=P(A|Bⱼ)·P(Bⱼ)/P(A)\n\nCas {B,B̄} :\nP(A)=P(A|B)·P(B)+P(A|B̄)·P(B̄)\n\nAPPLICATION EG :\nB=«produit de l'usine 1», A=«défectueux»\nP(B|A)=P(A|B)·P(B)/P(A)\n→ Identifier quelle usine a produit la pièce défectueuse",
              remarque:"Le théorème de Bayes est fondamental en gestion des risques et en intelligence économique." },
          ],
          exercices:[
            { id:'EX-PR3', niveau:'Intermédiaire', titre:'Contrôle qualité par lots',
              enonce:"Usine A : 60% production, 2% défauts. Usine B : 40% production, 5% défauts. P(défaut) ? P(vient de A | défectueux) ?",
              correction:"P(D)=0,6×0,02+0,4×0,05=0,012+0,02=0,032.\nP(A|D)=0,012/0,032=0,375=37,5%.\n(Moins probable de venir de A malgré sa majorité de production car taux de défaut plus faible.)" },
            { id:'EX-PR4', niveau:'Difficile', titre:'Risque de crédit',
              enonce:"Entreprises bien notées (70%) : défaut 2%. Mal notées (30%) : défaut 15%. Une entreprise fait défaut. P(était mal notée) ?",
              correction:"P(D)=0,7×0,02+0,3×0,15=0,014+0,045=0,059.\nP(mal notée|D)=0,045/0,059≈76,3%.\n→ 76% des défauts viennent des mal notées (seulement 30% de la population)." },
          ]
        },
      ]
    },
  ]
},


'maths-financieres': {
  id:'maths-financieres', emoji:'💹', badge:'Analyse', color:'#10b981',
  titre:'Mathématiques Financières',
  desc:"Intérêts simples, intérêts composés, valeur acquise, valeur actuelle, annuités.",
  souschapitres:[
    {
      id:'sc-mf1', titre:'8.1 Intérêts simples et composés',
      notions:['Intérêt simple I=C0·i·n','Intérêt composé Cn=C0(1+i)^n','Valeur acquise et valeur actuelle','Taux équivalent'],
      blocs:[
        {
          notion:'📐 Intérêts',
          theoremes:[
            { id:'F-MF1', type:'formule', nom:'Intérêts simples et composés',
              enonce:"Intérêts simples :\nI = C₀ · i · n\nCn = C₀(1 + i·n)\n\nIntérêts composés (capitalisation) :\nCn = C₀(1+i)^n\nValeur acquise = Cn\nValeur actuelle = Cn/(1+i)^n = C₀\n\nTaux effectif = (1+iₘois)^12 - 1" },
          ],
          exercices:[
            { id:'EX-MF1', niveau:'Facile', titre:'Placement à intérêts composés',
              enonce:"C₀=5000 DT, i=4% annuel, n=3 ans. Calculer C3.",
              correction:"C3=5000×(1,04)^3=5000×1,124864=5624,32 DT." },
          ],
        },
      ],
    },
    {
      id:'sc-mf2', titre:'8.2 Annuités',
      notions:["Annuité constante a","Valeur acquise Va=a·[(1+i)^n-1]/i","Valeur actuelle Vp=a·[1-(1+i)^(-n)]/i","Tableau d'amortissement"],
      blocs:[
        {
          notion:'📐 Annuités',
          theoremes:[
            { id:'F-MF2', type:'formule', nom:'Valeur acquise et actuelle des annuités',
              enonce:"Annuités constantes a versées en fin de période :\n\nValeur acquise :\nVa = a · [(1+i)^n - 1] / i\n\nValeur actuelle :\nVp = a · [1 - (1+i)^(-n)] / i\n\nAmortissement d'emprunt :\nC₀ = Vp  (valeur actuelle = capital emprunté)\na = C₀ · i / [1-(1+i)^(-n)]" },
          ],
          exercices:[
            { id:'EX-MF2', niveau:'Moyen', titre:'Calcul annuité',
              enonce:"Emprunt de 20000 DT à 5% sur 4 ans. Calculer l'annuité a.",
              correction:"a = 20000×0,05/[1-(1,05)^(-4)] = 1000/[1-0,8227] = 1000/0,1773 ≈ 5640,5 DT." },
          ],
        },
      ],
    },
  ],
},

'matrices-systemes': {
  id:'matrices-systemes', emoji:'🧮', badge:'Algèbre', color:'#a78bfa',
  titre:'Matrices & Systèmes Linéaires',
  desc:"Matrices, opérations, déterminants, inverse A^(-1), systèmes AX=b, applications économiques.",
  souschapitres:[
    {
      id:'sc-mat', titre:'9.1 Matrices et opérations',
      notions:["Définition matrice (m×n)","Addition et produit scalaire","Produit AB","Matrice identité et inverse"],
      blocs:[
        {
          notion:'📐 Matrices',
          theoremes:[
            { id:'D-MA1', type:'def', nom:'Matrice et opérations',
              enonce:"Matrice A de taille (m×n) : m lignes, n colonnes.\n\nAddition A+B : même taille, terme à terme.\nProduit λA : multiplier chaque terme par λ.\nProduit AB : (AB)ij = Σk aik·bkj (A:(m×p), B:(p×n))\n\nMatrice identité In : 1 sur diagonale, 0 ailleurs.\nA⁻¹ existe si det(A)≠0 : A·A⁻¹=In" },
            { id:'F-MA2', type:'formule', nom:'Déterminant et inverse',
              enonce:"Déterminant ordre 2 :\ndet(A)=ad-bc pour A=[[a,b],[c,d]]\n\nInverse ordre 2 :\nA⁻¹ = (1/det(A))·[[d,-b],[-c,a]]\n\nDéterminant ordre 3 (développement selon ligne 1) :\ndet(A)=a11·M11-a12·M12+a13·M13" },
          ],
          exercices:[
            { id:'EX-MA1', niveau:'Moyen', titre:'Inverse de matrice',
              enonce:"A=[[2,1],[3,2]]. Calculer A^(-1).",
              correction:"det(A)=4-3=1. A^(-1)=[[2,-1],[-3,2]]. Vérif: A·A^(-1)=I2." },
          ],
        },
      ],
    },
    {
      id:'sc-sys', titre:'9.2 Systèmes linéaires',
      notions:["Système AX=b","Méthode matricielle X=A^(-1)b","Méthode de Gauss","Applications économiques"],
      blocs:[
        {
          notion:'📐 Systèmes linéaires',
          theoremes:[
            { id:'T-SY1', type:'thm', nom:'Résolution par méthode matricielle',
              enonce:"Système AX=b (n équations, n inconnues) :\n\nSi det(A)≠0, unique solution : X = A^(-1)·b\n\nExemple économique :\n2x+y=100 (production A)\n3x+2y=180 (production B)\n\nA=[[2,1],[3,2]], b=[[100],[180]]\nA^(-1)=[[2,-1],[-3,2]]\nX=[[2×100-180],[(-3)×100+2×180]]=[[20],[60]]" },
          ],
          exercices:[
            { id:'EX-SY1', niveau:'Moyen', titre:'Système économique',
              enonce:"x+2y=14 et 3x+y=12. Résoudre par méthode matricielle.",
              correction:"A=[[1,2],[3,1]], det=1-6=-5. A^(-1)=(1/-5)[[1,-2],[-3,1]].\nX=A^(-1)b=(-1/5)[[14-24],[(-3×14)+12]]=(-1/5)[[-10],[-30]]=[2,6]." },
          ],
        },
      ],
    },
  ],
},

'variables-aleatoires': {
  id:'variables-aleatoires', emoji:'🎲', badge:'Probabilités', color:'#f5c842',
  titre:'Variables Aléatoires & Loi Binomiale',
  desc:"Variable aléatoire discrète, espérance, variance, loi binomiale B(n,p), applications économiques.",
  souschapitres:[
    {
      id:'sc-va', titre:'14.1 Variables aléatoires discrètes',
      notions:['Loi de probabilité P(X=xi)','Espérance E(X)','Variance V(X) et écart-type','Loi binomiale B(n,p)'],
      blocs:[
        {
          notion:'📐 Variable aléatoire et loi binomiale',
          theoremes:[
            { id:'D-VA1', type:'def', nom:'Variable aléatoire discrète',
              enonce:"X prenant valeurs x1,...,xn avec P(X=xi)=pi (Σpi=1)\n\nEspérance : E(X) = Σ xi·pi\nVariance : V(X) = E(X²)-[E(X)]²\nÉcart-type : σ = √V(X)\n\nLinéarité : E(aX+b)=aE(X)+b\nV(aX+b)=a²V(X)" },
            { id:'F-VA2', type:'formule', nom:'Loi binomiale B(n,p)',
              enonce:"X ~ B(n,p) : n épreuves de Bernoulli indépendantes\n\nP(X=k) = Cn^k · p^k · (1-p)^(n-k)\n\nE(X) = np\nV(X) = np(1-p)\n\nApplication économique :\nTaux de défaut, contrôle qualité, sondages.",
              remarque:"Si n grand et p petit : B(n,p) ≈ Poisson(λ=np)." },
          ],
          exercices:[
            { id:'EX-VA1', niveau:'Moyen', titre:'Loi binomiale — contrôle qualité',
              enonce:"Lot de 10 pièces, 15% de défectueuses. X=nombre de défectueuses. Calculer P(X=0) et E(X).",
              correction:"X~B(10;0,15). P(X=0)=(0,85)^10≈0,197. E(X)=10×0,15=1,5." },
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
export default function EcoGestionSlugPage() {
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
          <Link href="/bac/eco-gestion" style={{ color:'#10b981' }}>← Retour Éco & Gestion</Link>
        </div>
      </main><Footer/></>
  )

  const idx = NAV_ORDER.indexOf(slug)
  const prevSlug = idx>0 ? NAV_ORDER[idx-1] : null
  const nextSlug = idx<NAV_ORDER.length-1 ? NAV_ORDER[idx+1] : null
  const secColor = SEC_COLORS[slug] || '#10b981'

  const GROUPS = [
    { label:'Partie 1 — Analyse (7 ch.)', slugs:NAV_ORDER.slice(0,7) },
    { label:"Partie 2 — Géométrie (1 ch.)", slugs:NAV_ORDER.slice(7,8) },
    { label:'Partie 3 — Statistiques (1 ch.)', slugs:NAV_ORDER.slice(8,9) },
    { label:'Partie 4 — Probabilités (2 ch.)', slugs:NAV_ORDER.slice(9) },
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
          <Link href="/bac/eco-gestion" style={{ color:'var(--muted)', textDecoration:'none' }}>
            Économie & Gestion
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
                  <span style={{ fontSize:11, background:'rgba(16,185,129,0.1)',
                    color:'#10b981', padding:'2px 9px', borderRadius:10 }}>Bac Tunisie · Coeff 2</span>
                  {['logarithme','exponentielle','statistiques'].includes(slug) && (
                    <span style={{ fontSize:10, background:'rgba(16,185,129,0.2)',
                      color:'#10b981', padding:'2px 9px', borderRadius:10, fontWeight:800 }}>
                      💹 Application EG
                    </span>
                  )}
                </div>
                <h1 style={{ fontSize:'clamp(22px,3vw,36px)', fontWeight:800, marginBottom:10 }}>
                  {chapter.titre}
                </h1>
                <p style={{ color:'var(--text2)', fontSize:14, lineHeight:1.7,
                  maxWidth:620, marginBottom:18 }}>{chapter.desc}</p>
                <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
                  <Link href={`/solve?q=${encodeURIComponent('Explique '+chapter.titre+' Économie Gestion Bac Tunisie')}`}
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
                                      <Link href={`/solve?q=${encodeURIComponent('Éco & Gestion Tunisie — '+ex.enonce)}`}
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
                  <Link href={`/bac/eco-gestion/${prevSlug}`} style={{ textDecoration:'none' }}>
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
                  <Link href={`/bac/eco-gestion/${nextSlug}`} style={{ textDecoration:'none' }}>
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
                  💹 Éco & Gestion · 11 chapitres
                </div>
                {GROUPS.map(g => (
                  <div key={g.label}>
                    <div style={{ padding:'7px 15px 3px', fontSize:10, color:'var(--muted)',
                      fontWeight:700, textTransform:'uppercase', letterSpacing:'0.1em',
                      background:'rgba(255,255,255,0.02)' }}>{g.label}</div>
                    {g.slugs.map(s => (
                      <Link key={s} href={`/bac/eco-gestion/${s}`} style={{ textDecoration:'none' }}>
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
                  <Link href={`/solve?q=${encodeURIComponent('Explique '+chapter.titre+' Éco Gestion Bac Tunisie')}`}
                    className="btn btn-primary" style={{ textAlign:'center', fontSize:12 }}>
                    🤖 Chat IA — {chapter.badge}
                  </Link>
                  <Link href="/examens" className="btn btn-secondary"
                    style={{ textAlign:'center', fontSize:12 }}>📋 Exercice type Bac</Link>
                  <Link href="/simulation" className="btn btn-secondary"
                    style={{ textAlign:'center', fontSize:12 }}>🎯 Simulation Bac</Link>
                  <Link href="/bac/eco-gestion" className="btn btn-secondary"
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
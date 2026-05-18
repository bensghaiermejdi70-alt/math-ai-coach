'use client'
import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import { useParams } from 'next/navigation'

// ══════════════════════════════════════════════════════════════════════
// TERMINALE TECHNOLOGIQUE / [SLUG]
// Route : /bac-france/terminale-techno/[slug]
// Branches : STMG (6 ch.) · STI2D/STL (7 ch.) · Total 13 chapitres
// Structure : souschapitres + blocs
// ══════════════════════════════════════════════════════════════════════

const C = { thm:'#4f6ef7', def:'#06d6a0', formule:'#f59e0b', prop:'#8b5cf6', methode:'#ec4899', corollaire:'#f97316' }
const L: Record<string,string> = { thm:'Théorème', def:'Définition', formule:'Formule clé', prop:'Propriété', methode:'Méthode', corollaire:'Corollaire' }

const NAV_ORDER = [
  'stmg-fonctions','stmg-suites','stmg-stats-2var','stmg-probas','stmg-pourcentages','stmg-financier',
  'sti-suites','sti-exp-ln','sti-integration','sti-probas-cont','sti-stat-inf','sti-geometrie','sti-eq-diff',
]
const TITRES_NAV: Record<string,string> = {
  'stmg-fonctions':   'CH 01 — Fonctions (approfondissement)',
  'stmg-suites':      'CH 02 — Suites numériques',
  'stmg-stats-2var':  'CH 03 — Statistiques 2 variables',
  'stmg-probas':      'CH 04 — Probabilités conditionnelles',
  'stmg-pourcentages':'CH 05 — Pourcentages & Évolutions',
  'stmg-financier':   'CH 06 — Calculs financiers',
  'sti-suites':       'CH 07 — Suites & Modélisation',
  'sti-exp-ln':       'CH 08 — Exponentielle & Logarithme',
  'sti-integration':  'CH 09 — Intégration',
  'sti-probas-cont':  'CH 10 — Probabilités continues',
  'sti-stat-inf':     'CH 11 — Statistiques inférentielles',
  'sti-geometrie':    "CH 12 — Géométrie dans l'Espace",
  'sti-eq-diff':      'CH 13 — Équations Différentielles',
}
const SEC_COLORS: Record<string,string> = {
  'stmg-fonctions':'#4f6ef7','stmg-suites':'#4f6ef7','stmg-stats-2var':'#4f6ef7',
  'stmg-probas':'#4f6ef7','stmg-pourcentages':'#4f6ef7','stmg-financier':'#4f6ef7',
  'sti-suites':'#10b981','sti-exp-ln':'#10b981','sti-integration':'#10b981',
  'sti-probas-cont':'#10b981','sti-stat-inf':'#10b981','sti-geometrie':'#10b981','sti-eq-diff':'#10b981',
}
const BRANCH_LABEL: Record<string,string> = {
  'stmg-fonctions':'📊 STMG','stmg-suites':'📊 STMG','stmg-stats-2var':'📊 STMG',
  'stmg-probas':'📊 STMG','stmg-pourcentages':'📊 STMG','stmg-financier':'📊 STMG',
  'sti-suites':'⚙️ STI2D/STL','sti-exp-ln':'⚙️ STI2D/STL','sti-integration':'⚙️ STI2D/STL',
  'sti-probas-cont':'⚙️ STI2D/STL','sti-stat-inf':'⚙️ STI2D/STL',
  'sti-geometrie':'⚙️ STI2D/STL','sti-eq-diff':'⚙️ STI2D/STL',
}

type Thm  = { id:string; type:string; nom:string; enonce:string; remarque?:string }
type Exo  = { id:string; niveau:string; titre:string; enonce:string; correction:string }
type Bloc = { notion:string; theoremes:Thm[]; exercices:Exo[] }
type SC   = { id:string; titre:string; notions:string[]; blocs:Bloc[] }
type Chap = { id:string; titre:string; badge:string; color:string; emoji:string; desc:string; branch:string; souschapitres:SC[] }

// ══════════════════════════════════════════════════════════════════════
// DONNÉES — 13 CHAPITRES
// ══════════════════════════════════════════════════════════════════════
const ALL_CHAPTERS: Record<string,Chap> = {

// ══════════════════════════════════════════════════════════════════════
// ████  STMG — 6 CHAPITRES
// ══════════════════════════════════════════════════════════════════════

'stmg-fonctions': {
  id:'stmg-fonctions', emoji:'📊', badge:'Analyse', color:'#4f6ef7', branch:'STMG',
  titre:'Fonctions — Approfondissement',
  desc:"Fonctions affines, second degré (forme canonique, sommet, signe), exponentielle eˣ, croissance comparée, applications économiques (coût, recette, bénéfice).",
  souschapitres:[
    {
      id:'sc-f1', titre:'1.1 Fonctions du second degré et exponentielle',
      notions:['f(x)=ax²+bx+c : sommet, forme canonique','Signe du trinôme selon Δ','Exponentielle eˣ : propriétés, (eˣ)\'=eˣ','Croissance comparée : eˣ≫xⁿ en +∞'],
      blocs:[
        {
          notion:'📐 Second degré et exponentielle',
          theoremes:[
            { id:'D-SF1', type:'def', nom:'Fonctions du second degré',
              enonce:"f(x)=ax²+bx+c (a≠0)\nForme canonique : f(x)=a(x−α)²+β\nα=−b/(2a) (sommet), β=f(α)=−Δ/(4a)\nΔ=b²−4ac\n\nSIGNE :\nΔ>0 : racines x₁<x₂ ; f(x) signe de a hors [x₁;x₂]\nΔ=0 : racine double x₀ ; f(x)≥0 si a>0 (≤0 si a<0)\nΔ<0 : f(x) signe de a sur ℝ" },
            { id:'D-SF2', type:'def', nom:'Fonction exponentielle eˣ',
              enonce:"Propriétés :\neᵃ⁺ᵇ=eᵃ·eᵇ ; (eˣ)'=eˣ ; eˣ>0 ∀x\nDomaine ℝ ; image ]0;+∞[\nlim(x→−∞) eˣ=0 (AH y=0) ; lim(x→+∞) eˣ=+∞\n\nCROISSANCE COMPARÉE :\nlim(x→+∞) eˣ/xⁿ=+∞ ; lim xⁿ/eˣ=0\nlim(x→+∞) xⁿ·e^(−x)=0\n\nApplication STMG :\nModèle exponentiel : q(t)=q₀·e^(rt)\nDoubler : e^(rt₂)=2 → t₂=ln2/r",
              remarque:"En STMG, l'exponentielle sert à modéliser la croissance et la décroissance économique ou démographique." },
          ],
          exercices:[
            { id:'EX-SF1', niveau:'Facile', titre:'Signe du trinôme',
              enonce:"f(x)=2x²−8x+6. Trouver les racines, le sommet et signer f.",
              correction:"Δ=64−48=16. x₁=1, x₂=3. α=2, β=f(2)=8−16+6=−2.\nf(x)=2(x−2)²−2. f(x)≥0 pour x≤1 ou x≥3." },
            { id:'EX-SF2', niveau:'Intermédiaire', titre:'Modèle exponentiel',
              enonce:"Entreprise : CA(t)=50000·e^(0,05t). CA en t=0 et t=10. Quand CA double ?",
              correction:"CA(0)=50000. CA(10)=50000·e^(0,5)≈82436.\ne^(0,05t)=2 → t=ln2/0,05≈13,9 ans." },
          ]
        },
        {
          notion:'💼 Applications économiques',
          theoremes:[
            { id:'M-SF1', type:'methode', nom:'Optimisation du bénéfice',
              enonce:"B(q)=R(q)−C(q) (Recette − Coût)\n\nMaximum de B :\nB'(q)=0 ↔ R'(q)=C'(q) (recette marg. = coût marg.)\n\nCoût moyen : CM(q)=C(q)/q\nMin CM quand CM'(q)=0 ↔ Cm(q)=CM(q)\n\nSeuil de rentabilité : R(q)=C(q) → B(q)=0\nRésoudre par TVI ou graphiquement" },
          ],
          exercices:[
            { id:'EX-SF3', niveau:'Intermédiaire', titre:'Seuil de rentabilité',
              enonce:"C(q)=2q+100, R(q)=5q. Seuil de rentabilité.",
              correction:"R(q)=C(q) → 5q=2q+100 → q=100/3≈33,3 unités." },
          ]
        },
      ]
    },
  ]
},

'stmg-suites': {
  id:'stmg-suites', emoji:'uₙ', badge:'Algèbre', color:'#4f6ef7', branch:'STMG',
  titre:'Suites Numériques',
  desc:"Suites arithmétiques et géométriques, formules explicites et récurrentes, sommes de termes, intérêts simples/composés, amortissements.",
  souschapitres:[
    {
      id:'sc-su1', titre:'2.1 Suites arithmétiques et géométriques',
      notions:['Arithmétique uₙ=u₀+nr, somme Sₙ=n(u₀+uₙ₋₁)/2','Géométrique uₙ=u₀qⁿ, Sₙ=u₀(1−qⁿ)/(1−q)','Intérêts simples ↔ arithmétique','Intérêts composés ↔ géométrique'],
      blocs:[
        {
          notion:'💰 Suites et finances',
          theoremes:[
            { id:'D-SU1', type:'def', nom:'Suites arithmétiques et géométriques',
              enonce:"ARITHMÉTIQUE (raison r) :\nuₙ₊₁=uₙ+r ; uₙ=u₀+nr\nSomme Sₙ=n(u₀+uₙ₋₁)/2\n\nINTÉRÊTS SIMPLES :\nCₙ=C₀(1+ni) → suite arithmétique de raison C₀·i\n\nGÉOMÉTRIQUE (raison q) :\nuₙ₊₁=q·uₙ ; uₙ=u₀·qⁿ\nSomme Sₙ=u₀(1−qⁿ)/(1−q) (q≠1)\n\nINTÉRÊTS COMPOSÉS :\nCₙ=C₀(1+i)ⁿ → suite géométrique de raison q=1+i\n\nComportement :\n|q|<1 → 0 ; q>1 → +∞ ; q=1 → u₀" },
            { id:'F-SU1', type:'formule', nom:'Annuités et amortissements',
              enonce:"ANNUITÉS (versement constant a) :\nValeur acquise après n versements :\nVA = a·[(1+i)ⁿ−1]/i\n\nValeur actuelle :\nV₀ = a·[1−(1+i)^(−n)]/i\n\nAMORTISSEMENT d'un emprunt K en n années à taux i :\nAnnuité constante a = K·i/[1−(1+i)^(−n)]",
              remarque:"En STMG, toujours bien distinguer intérêts simples (arith.) et composés (géom.). La règle de 70 : doublement en 70/i% ans." },
          ],
          exercices:[
            { id:'EX-SU1', niveau:'Facile', titre:'Intérêts composés',
              enonce:"Placement 10000€ à 3%/an. Valeur après 5 ans et 10 ans.",
              correction:"C₅=10000×1,03⁵=10000×1,1593≈11593€.\nC₁₀=10000×1,03¹⁰≈13439€." },
            { id:'EX-SU2', niveau:'Intermédiaire', titre:'Mensualités emprunt',
              enonce:"Emprunt 15000€ à 4%/an sur 3 ans. Mensualité ?",
              correction:"i=4%/12≈0,00333. n=36.\na=15000×0,00333/[1−1,00333^(−36)]≈15000×0,00333/0,1136≈443€/mois." },
          ]
        },
      ]
    },
  ]
},

'stmg-stats-2var': {
  id:'stmg-stats-2var', emoji:'📉', badge:'Stats', color:'#4f6ef7', branch:'STMG',
  titre:'Statistiques à deux variables',
  desc:"Nuage de points, point moyen G(x̄;ȳ), ajustement affine (moindres carrés), coefficient de corrélation r, prévisions par interpolation et extrapolation.",
  souschapitres:[
    {
      id:'sc-s2v', titre:'3.1 Nuage, régression et corrélation',
      notions:['Point moyen G(x̄;ȳ)','Droite y=ax+b : a=cov/σx², b=ȳ−ax̄','r=cov/(σxσy) ∈[−1;1]','Prévision : valide si |r|≥0,9 env.'],
      blocs:[
        {
          notion:'📊 Régression et prévisions',
          theoremes:[
            { id:'F-S2V1', type:'formule', nom:'Droite de régression et coefficient r',
              enonce:"x̄=(1/n)Σxᵢ ; ȳ=(1/n)Σyᵢ\nG(x̄;ȳ) : la droite passe TOUJOURS par G\n\nPENTE : a=cov(X,Y)/σx²\n  cov(X,Y)=(1/n)Σxᵢyᵢ−x̄·ȳ\n  σx²=(1/n)Σxᵢ²−x̄²\n\nORDONNÉE : b=ȳ−a·x̄\n\nCOEFFICIENT r=cov/(σx·σy)\n−1≤r≤1\n|r|→1 : forte corrélation linéaire\n|r|→0 : faible corrélation\n\nPRÉVISION pour x=x₀ : ŷ=ax₀+b",
              remarque:"En STMG : utiliser la calculatrice pour obtenir a, b et r. Toujours interpréter r avant de prédire." },
            { id:'M-S2V1', type:'methode', nom:'Tableau de calcul',
              enonce:"| xᵢ | yᵢ | xᵢ² | yᵢ² | xᵢyᵢ |\n\n1. Calculer Σxᵢ, Σyᵢ, Σxᵢ², Σyᵢ², Σxᵢyᵢ\n2. x̄=Σxᵢ/n, ȳ=Σyᵢ/n\n3. cov=Σxᵢyᵢ/n−x̄·ȳ\n4. σx²=Σxᵢ²/n−x̄²\n5. a=cov/σx², b=ȳ−ax̄\n6. r=cov/(√σx²·√σy²)\n7. Vérifier G(x̄,ȳ) sur la droite" },
          ],
          exercices:[
            { id:'EX-S2V1', niveau:'Intermédiaire', titre:'Régression et prévision',
              enonce:"CA (millions) : x={1,2,3,4,5}, y={3,5,4,7,6}. Trouver la droite et estimer y pour x=7.",
              correction:"x̄=3, ȳ=5.\nΣxᵢyᵢ=3+10+12+28+30=83. Σxᵢ²=55.\ncov=83/5−15=16,6−15=1,6.\nσx²=55/5−9=11−9=2.\na=1,6/2=0,8. b=5−0,8×3=2,6.\ny=0,8x+2,6.\nPour x=7 : ŷ=5,6+2,6=8,2 millions." },
          ]
        },
      ]
    },
  ]
},

'stmg-probas': {
  id:'stmg-probas', emoji:'🎲', badge:'Probas', color:'#4f6ef7', branch:'STMG',
  titre:'Probabilités conditionnelles',
  desc:"P(A|B), formule des probabilités totales, arbres pondérés, indépendance, variable aléatoire, espérance E(X), loi binomiale B(n,p).",
  souschapitres:[
    {
      id:'sc-pc1', titre:'4.1 Probabilités conditionnelles et loi binomiale',
      notions:['P(A|B)=P(A∩B)/P(B)','Indépendance : P(A∩B)=P(A)P(B)','Formule des probabilités totales','B(n,p) : P(X=k)=Cₙᵏpᵏ(1−p)ⁿ⁻ᵏ, E(X)=np'],
      blocs:[
        {
          notion:'🎲 Conditionnement et loi binomiale',
          theoremes:[
            { id:'D-PC1', type:'def', nom:'Probabilité conditionnelle',
              enonce:"P(A|B)=P(A∩B)/P(B)  (P(B)>0)\n«Probabilité de A sachant B»\n\nP(A∩B)=P(B)·P(A|B)\n\nINDÉPENDANCE :\nA,B indép. ↔ P(A∩B)=P(A)·P(B) ↔ P(A|B)=P(A)\n\nARBRE DE PROBABILITÉS :\nMultiplier les branches pour P(∩)\nAdditionner les chemins aboutissant au même événement" },
            { id:'T-PC1', type:'thm', nom:'Probabilités totales',
              enonce:"B,B̄ partition de Ω :\nP(A)=P(A|B)·P(B)+P(A|B̄)·P(B̄)\n\nFORMULE DE BAYES :\nP(B|A)=P(A|B)·P(B)/P(A)" },
            { id:'F-PC1', type:'formule', nom:'Loi binomiale B(n,p)',
              enonce:"n épreuves de Bernoulli indép., succès prob. p\nX=nb de succès\n\nP(X=k)=Cₙᵏ·pᵏ·(1−p)ⁿ⁻ᵏ  k=0,…,n\n\nE(X)=np\nV(X)=np(1−p)\nσ=√(np(1−p))\n\nCALCULATRICE : binomFdp(k,n,p) ou binomRép(k,n,p)",
              remarque:"En STMG, utiliser la calculatrice pour les calculs de B(n,p). Savoir reconnaître un schéma de Bernoulli." },
          ],
          exercices:[
            { id:'EX-PC1', niveau:'Facile', titre:'Arbre et probabilités totales',
              enonce:"P(M)=0,3 (matin), P(P|M)=0,8 (ponctuel matin), P(P|M̄)=0,6. P(ponctuel) ?",
              correction:"P(P)=0,8×0,3+0,6×0,7=0,24+0,42=0,66." },
            { id:'EX-PC2', niveau:'Intermédiaire', titre:'Loi binomiale',
              enonce:"Quiz 10 questions, P(bonne rép.)=0,7 par question. P(X≥8) ?",
              correction:"X~B(10;0,7).\nP(X=8)=C₁₀⁸×0,7⁸×0,3²=45×0,0576×0,09≈0,233.\nP(X=9)=C₁₀⁹×0,7⁹×0,3¹=10×0,0403×0,3≈0,121.\nP(X=10)=0,7¹⁰≈0,028.\nP(X≥8)≈0,382." },
          ]
        },
      ]
    },
  ]
},

'stmg-pourcentages': {
  id:'stmg-pourcentages', emoji:'%', badge:'Calcul', color:'#4f6ef7', branch:'STMG',
  titre:'Pourcentages & Évolutions',
  desc:"Taux d'évolution, coefficients multiplicateurs, évolutions successives et réciproques, taux moyen, indice.",
  souschapitres:[
    {
      id:'sc-pct', titre:'5.1 Taux d\'évolution et coefficients multiplicateurs',
      notions:['Taux t%→CM=1+t/100','Évolutions successives : CM=CM₁×CM₂×…','Évolution réciproque : CM\'=1/CM','Taux moyen : CM=(1+r)ⁿ → r=CM^(1/n)−1'],
      blocs:[
        {
          notion:'📈 Évolutions et coefficients multiplicateurs',
          theoremes:[
            { id:'D-PCT1', type:'def', nom:'Coefficient multiplicateur et taux',
              enonce:"Taux d'évolution t% ↔ Coefficient multiplicateur CM=1+t/100\n\nHausse de 20% → CM=1,20\nBaisse de 15% → CM=0,85\n\nDe CM au taux : t=(CM−1)×100\n\nÉVOLUTIONS SUCCESSIVES :\nCM_total = CM₁×CM₂×…×CMₖ\n\nÉVOLUTION RÉCIPROQUE :\nCM' = 1/CM\nTaux r'=(1/CM−1)×100\n\nHausse de 20% puis retour : CM'=1/1,20≈0,833 → baisse de 16,7% (et non −20%!)" },
            { id:'F-PCT1', type:'formule', nom:'Taux moyen et indices',
              enonce:"TAUX MOYEN SUR n PÉRIODES :\nSi CM global connu sur n périodes :\nCM moyen = CM^(1/n)\nTaux moyen r = (CM^(1/n)−1)×100\n\nINDICE (base 100) :\nIₙ = (Valeurₙ/Valeur_base)×100\n\nÉvolution d'un indice :\n(Iₙ−I₀)/I₀×100 = taux d'évolution",
              remarque:"Toujours travailler avec les CM (multiplicatifs), jamais additionner les taux." },
          ],
          exercices:[
            { id:'EX-PCT1', niveau:'Facile', titre:'Évolution réciproque',
              enonce:"Les prix augmentent de 25%. Quel taux de baisse pour revenir au prix initial ?",
              correction:"CM=1,25. CM'=1/1,25=0,80.\nBaisse de (0,80−1)×100=−20%." },
            { id:'EX-PCT2', niveau:'Intermédiaire', titre:'Taux moyen annuel',
              enonce:"PIB passe de 100 à 133 en 5 ans. Taux moyen de croissance annuel ?",
              correction:"CM global=1,33. CM moyen=1,33^(1/5)≈1,0588.\nTaux moyen≈5,88%/an." },
          ]
        },
      ]
    },
  ]
},

'stmg-financier': {
  id:'stmg-financier', emoji:'💳', badge:'Finance', color:'#4f6ef7', branch:'STMG',
  titre:'Calculs financiers',
  desc:"Intérêts simples et composés, valeur actuelle/acquise, amortissements (linéaire, dégressif), rentes et mensualités d'emprunt.",
  souschapitres:[
    {
      id:'sc-fin1', titre:'6.1 Valeur actuelle, acquise et amortissements',
      notions:['Valeur acquise Vₙ=V₀(1+i)ⁿ','Valeur actuelle VA=VF/(1+i)ⁿ','Amortissement linéaire : annuité constante A=K/n','Amortissement dégressif : taux appliqué à la VNC'],
      blocs:[
        {
          notion:'💰 Valeurs et amortissements',
          theoremes:[
            { id:'D-FIN1', type:'def', nom:'Valeur acquise et actuelle',
              enonce:"VALEUR ACQUISE (capitalisation) :\nVₙ = V₀·(1+i)ⁿ\n(Valeur future d'un capital V₀ placé n années au taux i)\n\nVALEUR ACTUELLE (actualisation) :\nV₀ = Vₙ·(1+i)^(−n) = Vₙ/(1+i)ⁿ\n(Valeur aujourd'hui d'un flux futur Vₙ)\n\nANNUITÉS CONSTANTES a, n périodes, taux i :\nValeur acquise : VF = a·[(1+i)ⁿ−1]/i\nValeur actuelle : V₀ = a·[1−(1+i)^(−n)]/i" },
            { id:'D-FIN2', type:'def', nom:'Amortissements',
              enonce:"LINÉAIRE :\nAnnuité A=K/n (K coût, n durée vie)\nVNC après k ans : K−k·A\n\nDÉGRESSIF :\nTaux t=2/n (ou selon méthode)\nAnnuité k : Aₖ=VNCₖ₋₁·t\nVNC décroissante de façon géométrique\n\nTableau d'amortissement :\nAnnée | Dotation | Amort. cumulé | VNC\n  1   |    A     |       A       | K−A\n  2   |    A     |      2A       | K−2A\n  …   |    …     |       …       |  …\n  n   |    A     |       K       |  0",
              remarque:"En pratique STMG : remplir le tableau ligne par ligne. VNC finale doit être 0." },
          ],
          exercices:[
            { id:'EX-FIN1', niveau:'Facile', titre:'Amortissement linéaire',
              enonce:"Machine coût 24000€, durée 4 ans. Tableau d'amortissement linéaire.",
              correction:"A=24000/4=6000€/an.\nAn 1 : dotation 6000, cumulé 6000, VNC 18000.\nAn 2 : 6000, 12000, 12000.\nAn 3 : 6000, 18000, 6000.\nAn 4 : 6000, 24000, 0." },
            { id:'EX-FIN2', niveau:'Intermédiaire', titre:'Mensualité de remboursement',
              enonce:"Emprunt 20000€ à 3,6%/an sur 3 ans. Mensualité ?",
              correction:"i=3,6/12/100=0,003. n=36.\na=20000×0,003/[1−1,003^(−36)]=60/[1−0,898]=60/0,102≈588€/mois." },
          ]
        },
      ]
    },
  ]
},

// ══════════════════════════════════════════════════════════════════════
// ████  STI2D/STL — 7 CHAPITRES
// ══════════════════════════════════════════════════════════════════════

'sti-suites': {
  id:'sti-suites', emoji:'∿', badge:'Algèbre', color:'#10b981', branch:'STI2D/STL',
  titre:'Suites & Modélisation',
  desc:"Suites arithmétiques et géométriques, modèles discrets (croissance exponentielle, décroissance), algorithme de seuil, récurrences.",
  souschapitres:[
    {
      id:'sc-sti-su1', titre:'7.1 Suites et algorithme de seuil',
      notions:['Arithmétique uₙ=u₀+nr ; géométrique uₙ=u₀qⁿ','Modèle discret : Xₙ₊₁=k·Xₙ → géom.','Algorithme de seuil : trouver n tel que uₙ≥S','Suite récurrente affine : point fixe'],
      blocs:[
        {
          notion:'⚙️ Suites et modélisation physique',
          theoremes:[
            { id:'D-STI-SU1', type:'def', nom:'Suites arithmétiques et géométriques',
              enonce:"ARITHMÉTIQUE (raison r) :\nuₙ₊₁=uₙ+r ; uₙ=u₀+nr\nSomme=n(u₀+uₙ₋₁)/2\n\nGÉOMÉTRIQUE (raison q) :\nuₙ₊₁=q·uₙ ; uₙ=u₀·qⁿ\nSomme=u₀(1−qⁿ)/(1−q)\n\nMODÈLES PHYSIQUES :\nDécharge RC : uₙ=U₀·e^(−nτ) ≈ U₀·(e^(−1/τ))ⁿ → géom.\nRefroidissement : Tₙ₊₁=k·Tₙ+(1−k)·T_amb → affine" },
            { id:'M-STI-SU1', type:'methode', nom:'Algorithme de seuil',
              enonce:"Trouver n tel que uₙ≥S (ou ≤S) :\n\nMÉTHODE 1 (analytique) :\nuₙ=u₀·qⁿ≥S → qⁿ≥S/u₀\n→ n≥ln(S/u₀)/ln(q)  (si q>1)\n\nMÉTHODE 2 (algorithmique) :\nn←0 ; u←u₀\nTant que u<S :\n  n←n+1 ; u←f(u)\nRetourner n\n\nExemple : bactéries doublent/heure. Quand dépasse 10000 si n₀=100 ?\n100×2ⁿ≥10000 → n≥log₂(100)=6,64 → n=7 heures" },
          ],
          exercices:[
            { id:'EX-STI-SU1', niveau:'Facile', titre:'Suite géométrique — charge batterie',
              enonce:"Batterie : charge initiale 500mAh. Perd 2% par cycle. Après 30 cycles ?",
              correction:"q=0,98. u₃₀=500×0,98³⁰=500×0,545≈273mAh." },
            { id:'EX-STI-SU2', niveau:'Intermédiaire', titre:'Seuil',
              enonce:"Population bactérienne double toutes les 2h. Départ 200. Quand dépasse 10000 ?",
              correction:"uₙ=200×2ⁿ≥10000 → 2ⁿ≥50 → n≥log₂(50)≈5,64 → n=6 doublings=12h." },
          ]
        },
      ]
    },
  ]
},

'sti-exp-ln': {
  id:'sti-exp-ln', emoji:'eˣ', badge:'Analyse', color:'#10b981', branch:'STI2D/STL',
  titre:'Exponentielle & Logarithme',
  desc:"Fonction eˣ : propriétés, équations eᵃ=eᵇ⟺a=b. Logarithme ln : primitive de 1/x, propriétés algébriques, résolution, croissances comparées. Modélisations physiques.",
  souschapitres:[
    {
      id:'sc-sti-el1', titre:'8.1 Propriétés et dérivées',
      notions:['(eˣ)\'=eˣ ; (eᵘ)\'=u\'eᵘ','ln x : (ln x)\'=1/x ; (ln u)\'=u\'/u','Résolution : eˣ=k ↔ x=ln k','Croissances comparées : eˣ≫xⁿ≫ln x'],
      blocs:[
        {
          notion:'📐 Exponentielle et logarithme',
          theoremes:[
            { id:'F-EL1', type:'formule', nom:'Propriétés de eˣ',
              enonce:"eᵃ⁺ᵇ=eᵃ·eᵇ ; (eˣ)'=eˣ ; eˣ>0 ∀x\nlim(x→−∞) eˣ=0 ; lim(x→+∞) eˣ=+∞\n(eᵘ)'=u'·eᵘ\n\nRÉSOLUTIONS :\neˣ=k (k>0) → x=ln k\neˣ=eᵃ → x=a\n\nAPPLICATIONS STI2D :\nLoi de refroidissement : T(t)=T_amb+(T₀−T_amb)·e^(−kt)\nDécharge RC : u(t)=U₀·e^(−t/RC)" },
            { id:'F-EL2', type:'formule', nom:'Propriétés de ln x',
              enonce:"ln(ab)=ln a+ln b ; ln(aⁿ)=n·ln a (a,b>0)\n(ln x)'=1/x ; (ln u)'=u'/u\nlim(x→0⁺) ln x=−∞ ; lim(x→+∞) ln x=+∞\n\nRÉSOLUTIONS :\nln x=k → x=eᵏ\nln x=ln a → x=a\n\nCROISSANCES COMPARÉES :\nlim eˣ/xⁿ=+∞ ; lim xⁿ/eˣ=0\nlim (ln x)/xᵅ=0 (α>0)",
              remarque:"En STI2D/STL : résoudre les équations du type ln(f(x))=k en passant à l'exponentielle." },
          ],
          exercices:[
            { id:'EX-EL1', niveau:'Facile', titre:'Résolution',
              enonce:"Résoudre : e^(2x−1)=4 et ln(3x+1)=2.",
              correction:"e^(2x−1)=4 → 2x−1=ln4 → x=(1+ln4)/2≈1,19.\nln(3x+1)=2 → 3x+1=e²≈7,39 → x≈2,13." },
            { id:'EX-EL2', niveau:'Intermédiaire', titre:'Demi-vie',
              enonce:"Désintégration : N(t)=N₀·e^(−0,02t). Demi-vie (quand N=N₀/2) ?",
              correction:"e^(−0,02t)=1/2 → −0,02t=−ln2 → t=ln2/0,02≈34,7 unités de temps." },
          ]
        },
      ]
    },
  ]
},

'sti-integration': {
  id:'sti-integration', emoji:'∫', badge:'Analyse', color:'#10b981', branch:'STI2D/STL',
  titre:'Intégration',
  desc:"Primitives usuelles, intégrale définie (aire, relation de Chasles), valeur moyenne, applications : énergie, travail d'une force, centre d'inertie.",
  souschapitres:[
    {
      id:'sc-sti-int1', titre:'9.1 Primitives et intégrale définie',
      notions:['Table des primitives usuelles','∫ₐᵇf(x)dx=F(b)−F(a)','Relation de Chasles, linéarité','Valeur moyenne μ=(1/(b−a))∫ₐᵇf'],
      blocs:[
        {
          notion:'∫ Calcul intégral et applications physiques',
          theoremes:[
            { id:'F-INT1', type:'formule', nom:'Primitives usuelles et intégrale',
              enonce:"PRIMITIVES :\n∫xⁿdx=xⁿ⁺¹/(n+1)+C (n≠−1)\n∫eˣdx=eˣ+C ; ∫(1/x)dx=ln|x|+C\n∫cos x dx=sin x+C ; ∫sin x dx=−cos x+C\n∫u'eᵘ dx=eᵘ+C ; ∫u'/u dx=ln|u|+C\n\nINTÉGRALE :\n∫ₐᵇf(x)dx=F(b)−F(a)\nChasles : ∫ₐᶜ=∫ₐᵇ+∫ᵦᶜ\nf≥0 → ∫ₐᵇf≥0" },
            { id:'F-INT2', type:'formule', nom:'Valeur moyenne et applications',
              enonce:"Valeur moyenne de f sur [a,b] :\nμ=(1/(b−a))·∫ₐᵇf(x)dx\n\nAPPLICATIONS STI2D :\nTRAVAIL d'une force F(x) sur [a,b] :\nW=∫ₐᵇF(x)dx  (en Joules)\n\nÉNERGIE électrique :\nE=∫₀ᵀP(t)dt  (P puissance)\n\nAIRE entre C_f et Ox :\nA=∫ₐᵇ|f(x)|dx\n\nAIRE entre C_f et C_g :\nA=∫ₐᵇ|f(x)−g(x)|dx" },
          ],
          exercices:[
            { id:'EX-INT1', niveau:'Facile', titre:'Calcul d\'intégrale',
              enonce:"Calculer ∫₀³(2x+e^x)dx.",
              correction:"[x²+eˣ]₀³=(9+e³)−(0+1)=8+e³≈28,09." },
            { id:'EX-INT2', niveau:'Intermédiaire', titre:'Valeur moyenne',
              enonce:"I(t)=5e^(−0,1t) (ampères). Valeur moyenne sur [0;10] ?",
              correction:"μ=(1/10)∫₀¹⁰5e^(−0,1t)dt=(1/10)×[5e^(−0,1t)/(−0,1)]₀¹⁰\n=(1/10)×(−50)(e⁻¹−1)=5(1−e⁻¹)≈3,16 A." },
            { id:'EX-INT3', niveau:'Difficile', titre:'Travail d\'une force',
              enonce:"Force F(x)=3x²+2 (N). Travail pour déplacer de x=0 à x=4 m.",
              correction:"W=∫₀⁴(3x²+2)dx=[x³+2x]₀⁴=64+8=72 J." },
          ]
        },
      ]
    },
  ]
},

'sti-probas-cont': {
  id:'sti-probas-cont', emoji:'🔔', badge:'Probas', color:'#10b981', branch:'STI2D/STL',
  titre:'Probabilités continues',
  desc:"Loi uniforme sur [a;b] (densité, espérance), loi normale N(μ,σ²), standardisation Z=(X−μ)/σ, intervalles μ±σ, μ±2σ, approximation binomiale.",
  souschapitres:[
    {
      id:'sc-sti-pc1', titre:'10.1 Loi uniforme et loi normale',
      notions:['Loi uniforme U([a,b]) : f=1/(b−a), E=( a+b)/2','Loi normale N(μ,σ²) : densité en cloche','Standardisation Z=(X−μ)/σ~N(0,1)','P(μ−2σ≤X≤μ+2σ)≈95%'],
      blocs:[
        {
          notion:'🔔 Lois continues et applications',
          theoremes:[
            { id:'D-PC1', type:'def', nom:'Loi uniforme et loi normale',
              enonce:"LOI UNIFORME U([a,b]) :\nDensité f(x)=1/(b−a) sur [a,b], 0 ailleurs\nE(X)=(a+b)/2 ; V(X)=(b−a)²/12\nP(c≤X≤d)=(d−c)/(b−a)\n\nLOI NORMALE N(μ,σ²) :\nCloche symétrique centrée en μ\n68% des valeurs dans [μ−σ;μ+σ]\n95% des valeurs dans [μ−2σ;μ+2σ]\n99,7% dans [μ−3σ;μ+3σ]" },
            { id:'F-PC1', type:'formule', nom:'Standardisation',
              enonce:"X~N(μ,σ²) → Z=(X−μ)/σ~N(0,1)\n\nP(a≤X≤b)=P((a−μ)/σ≤Z≤(b−μ)/σ)\n\nSYMÉTRIE de N(0,1) :\nP(Z≤−z)=1−P(Z≤z)\nP(−z≤Z≤z)=2Φ(z)−1\n\nAPPROXIMATION BINOMIALE :\nSi X~B(n,p) avec n≥30, np≥5, n(1−p)≥5 :\nX ≈ N(np ; np(1−p))",
              remarque:"En STI2D : toujours standardiser avant de lire la table. Φ(z)=P(Z≤z)." },
          ],
          exercices:[
            { id:'EX-PC1', niveau:'Facile', titre:'Loi uniforme',
              enonce:"Bus toutes les 8min. Attente X~U([0;8]). P(X≤3) ?",
              correction:"P(X≤3)=(3−0)/(8−0)=3/8=0,375=37,5%." },
            { id:'EX-PC2', niveau:'Intermédiaire', titre:'Loi normale — contrôle qualité',
              enonce:"Pièce L~N(50;0,04), σ=0,2mm. Tolérance [49,5;50,5]. P(pièce bonne) ?",
              correction:"P(49,5≤L≤50,5)=P(−2,5≤Z≤2,5)=2Φ(2,5)−1≈2×0,9938−1=0,9876≈98,8%." },
          ]
        },
      ]
    },
  ]
},

'sti-stat-inf': {
  id:'sti-stat-inf', emoji:'📊', badge:'Stats', color:'#10b981', branch:'STI2D/STL',
  titre:'Statistiques inférentielles',
  desc:"Fluctuation d'échantillonnage, intervalle de confiance 95% [f±1/√n], estimation d'une proportion, taille d'échantillon.",
  souschapitres:[
    {
      id:'sc-sti-si1', titre:'11.1 Intervalles de fluctuation et de confiance',
      notions:['Intervalle de fluctuation : p₀ dans [p₀−1/√n;p₀+1/√n]','Test de conformité : f∈IC ?','IC 95% : [f−1/√n;f+1/√n]','Taille n minimale pour précision donnée'],
      blocs:[
        {
          notion:'📏 Intervalles et tests',
          theoremes:[
            { id:'F-SI1', type:'formule', nom:'Intervalle de fluctuation et de confiance',
              enonce:"FLUCTUATION (niveau 95%) :\nI=[p₀−1/√n ; p₀+1/√n]\nSi la fréquence observée f∈I → compatible avec p₀\nSinon → résultat significatif\n\nCONFIANCE (niveau 95%) :\nIC=[f−1/√n ; f+1/√n]\n(intervalle centré sur la fréquence obs. f)\n\nCONDITIONS : n≥30, np₀≥5, n(1−p₀)≥5\n\nTAILLE MINIMALE pour précision ε :\n1/√n≤ε → n≥(1/ε)²\nε=0,05 → n≥400\nε=0,02 → n≥2500",
              remarque:"En STI2D : le test de conformité est utilisé en contrôle qualité (taux de défaut, non-conformité)." },
          ],
          exercices:[
            { id:'EX-SI1', niveau:'Facile', titre:'Test de conformité',
              enonce:"Machine : taux défaut théorique p₀=2%. Contrôle de 500 pièces : 15 défectueuses. Compatible ?",
              correction:"f=15/500=0,03=3%.\nI=[0,02−1/√500;0,02+1/√500]=[0,02−0,045;0,02+0,045]=[-0,025;0,065].\nf=0,03∈I ✓ → compatible avec p₀=2%." },
          ]
        },
      ]
    },
  ]
},

'sti-geometrie': {
  id:'sti-geometrie', emoji:'📐', badge:'Géométrie', color:'#10b981', branch:'STI2D/STL',
  titre:"Géométrie dans l'Espace",
  desc:"Vecteurs de l'espace, coplanarité, équation cartésienne du plan ax+by+cz+d=0, droite paramétrique, intersection, orthogonalité, distance.",
  souschapitres:[
    {
      id:'sc-sti-geo1', titre:'12.1 Plans, droites et distances',
      notions:['Vecteur u⃗(a;b;c), produit scalaire','Plan ax+by+cz+d=0 : normale n⃗(a;b;c)','Droite M=A+t·u⃗','Distance point-plan'],
      blocs:[
        {
          notion:'🌐 Géométrie 3D pour STI2D',
          theoremes:[
            { id:'F-GEO1', type:'formule', nom:'Plan, droite et distance',
              enonce:"PRODUIT SCALAIRE :\nu⃗(a;b;c)·v⃗(a';b';c')=aa'+bb'+cc'\nOrthogonalité : u⃗·v⃗=0\n\nPLAN :\nPassant par A₀, de normale n⃗(a;b;c) :\na(x−x₀)+b(y−y₀)+c(z−z₀)=0\n\nDROITE (A,u⃗) :\n{x=x_A+at ; y=y_A+bt ; z=z_A+ct}\n\nPositions droite-plan :\nu⃗·n⃗=0 et A∉plan → ∥\nu⃗·n⃗≠0 → intersection\n\nDISTANCE M₀ au plan ax+by+cz+d=0 :\nd=|ax₀+by₀+cz₀+d|/√(a²+b²+c²)\n\nAPPLICATION STI2D :\nCoordonnées d'un point d'une pièce mécanique\nCalcul de distance entre composants" },
          ],
          exercices:[
            { id:'EX-GEO1', niveau:'Facile', titre:'Équation d\'un plan',
              enonce:"Plan par A(2;1;−1) de normale n⃗(1;2;3).",
              correction:"1(x−2)+2(y−1)+3(z+1)=0 → x+2y+3z−3=0." },
            { id:'EX-GEO2', niveau:'Intermédiaire', titre:'Distance point-plan',
              enonce:"Distance de M(1;2;0) au plan 2x−y+2z+5=0.",
              correction:"d=|2−2+0+5|/√(4+1+4)=5/3." },
          ]
        },
      ]
    },
  ]
},

'sti-eq-diff': {
  id:'sti-eq-diff', emoji:'dy', badge:'Analyse', color:'#10b981', branch:'STI2D/STL',
  titre:'Équations Différentielles & Compléments',
  desc:"y'=ay → y=Ceᵃˣ ; y'=ay+b → Ceᵃˣ−b/a ; condition initiale ; circuits RC, refroidissement Newton, croissance bactérienne. Convexité f'', IPP.",
  souschapitres:[
    {
      id:'sc-sti-ed1', titre:'13.1 Équations différentielles',
      notions:['y\'=ay : y=Ce^(ax)','y\'=ay+b : sol. part. + homogène','Condition initiale → déterminer C','Applications : RC, Newton, biologie'],
      blocs:[
        {
          notion:'⚡ EDO et modèles physiques',
          theoremes:[
            { id:'T-ED1', type:'thm', nom:'Solution de y\'=ay et y\'=ay+b',
              enonce:"y'=ay :\nSolution générale : y=Ce^(ax), C∈ℝ\n\ny'=ay+b :\nSolution particulière constante : y*=−b/a (si a≠0)\nSolution générale : y=Ce^(ax)−b/a\n\nCONDITION INITIALE y(t₀)=y₀ → C=(y₀+b/a)e^(−at₀)\n\nMODÈLES STI2D :\nCircuit RC : dU/dt=−U/(RC)+E/(RC)\n→ U(t)=E+(U₀−E)·e^(−t/RC)\n\nRefroidissement Newton : dT/dt=−k(T−T_amb)\n→ T(t)=T_amb+(T₀−T_amb)·e^(−kt)\n\nBactéries : dN/dt=rN\n→ N(t)=N₀·e^(rt)",
              remarque:"Identifier le type (homogène ou inhomogène) avant de résoudre. La solution particulière constante est souvent l'état d'équilibre physique." },
          ],
          exercices:[
            { id:'EX-ED1', niveau:'Facile', titre:'Circuit RC',
              enonce:"RC : RC=10ms, E=5V, U₀=0. U(t)=? U après 20ms ?",
              correction:"U(t)=5(1−e^(−t/10ms)).\nU(20ms)=5(1−e⁻²)=5(1−0,135)≈4,32V." },
            { id:'EX-ED2', niveau:'Intermédiaire', titre:'Refroidissement',
              enonce:"Corps : T₀=80°C, T_amb=20°C, k=0,05/min. T après 30min ? Quand T=30°C ?",
              correction:"T(t)=20+60·e^(−0,05t).\nT(30)=20+60·e^(−1,5)=20+60×0,223≈33,4°C.\nT=30 : 60·e^(−0,05t)=10 → e^(−0,05t)=1/6 → t=ln6/0,05≈35,8min." },
          ]
        },
      ]
    },
    {
      id:'sc-sti-compl', titre:'13.2 Compléments : convexité et IPP',
      notions:['Dérivée seconde f\'\' : convexité et inflexion','IPP : ∫u\'v=[uv]−∫uv\'','Applications : aires, valeurs moyennes complexes'],
      blocs:[
        {
          notion:'📈 Convexité et intégration par parties',
          theoremes:[
            { id:'D-CP1', type:'def', nom:'Convexité et IPP',
              enonce:"CONVEXITÉ :\nf''(x)>0 → f convexe (courbe au-dessus des tangentes)\nf''(x)<0 → f concave\nf''(a)=0 et changement de signe → point d'inflexion\n\nIPP :\n∫ₐᵇu'v dx=[uv]ₐᵇ−∫ₐᵇuv' dx\n\nCas classiques STI2D :\n∫t·e^(at)dt : u'=e^(at), v=t\n∫t·sin(ωt)dt : u'=sin(ωt), v=t",
              remarque:"En STI2D : l'IPP sert souvent dans les calculs d'énergie (P(t)=u(t)·i(t)) et de valeur efficace." },
          ],
          exercices:[
            { id:'EX-CP1', niveau:'Intermédiaire', titre:'IPP — énergie',
              enonce:"Calculer ∫₀¹t·eᵗdt (énergie absorbée).",
              correction:"u'=eᵗ→u=eᵗ ; v=t→v'=1.\n[t·eᵗ]₀¹−∫₀¹eᵗdt=e−[eᵗ]₀¹=e−(e−1)=1." },
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
export default function TerminaleTechnoSlugPage() {
  const params = useParams()
  const slug = (params?.slug as string) || 'stmg-fonctions'
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
          <Link href="/bac-france/terminale-techno" style={{ color:'#10b981' }}>
            ← Retour Terminale Technologique
          </Link>
        </div>
      </main><Footer/></>
  )

  const idx = NAV_ORDER.indexOf(slug)
  const prevSlug = idx>0 ? NAV_ORDER[idx-1] : null
  const nextSlug = idx<NAV_ORDER.length-1 ? NAV_ORDER[idx+1] : null
  const secColor = SEC_COLORS[slug] || '#10b981'
  const isSTMG = chapter.branch==='STMG'

  const STMG_SLUGS = NAV_ORDER.slice(0,6)
  const STI_SLUGS  = NAV_ORDER.slice(6)

  return (
    <><Navbar/>
      <main style={{ position:'relative', zIndex:1, paddingTop:80 }}>

        {/* BREADCRUMB */}
        <div style={{ borderBottom:'1px solid var(--border)',
          padding:'12px clamp(20px,5vw,60px)',
          display:'flex', gap:8, fontSize:13, color:'var(--muted)',
          alignItems:'center', flexWrap:'wrap' }}>
          <Link href="/bac-france" style={{ color:'var(--muted)', textDecoration:'none' }}>🇫🇷 France</Link><span>›</span>
          <Link href="/bac-france/terminale-techno" style={{ color:'var(--muted)', textDecoration:'none' }}>
            Terminale Techno
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
                  <span style={{ fontSize:11, padding:'2px 9px', borderRadius:10,
                    background: isSTMG ? 'rgba(79,110,247,0.15)' : 'rgba(16,185,129,0.15)',
                    color: isSTMG ? '#818cf8' : '#34d399', fontWeight:700 }}>
                    {BRANCH_LABEL[slug]}
                  </span>
                </div>
                <h1 style={{ fontSize:'clamp(22px,3vw,36px)', fontWeight:800, marginBottom:10 }}>
                  {chapter.titre}
                </h1>
                <p style={{ color:'var(--text2)', fontSize:14, lineHeight:1.7,
                  maxWidth:620, marginBottom:18 }}>{chapter.desc}</p>
                <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
                  <Link href={`/solve?q=${encodeURIComponent('Explique '+chapter.titre+' Terminale '+chapter.branch+' France')}`}
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
                                      <Link href={`/solve?q=${encodeURIComponent(chapter.branch+' France — '+ex.enonce)}`}
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
                  <Link href={`/bac-france/terminale-techno/${prevSlug}`} style={{ textDecoration:'none' }}>
                    <div className="card" style={{ padding:'12px 15px', transition:'transform 0.15s' }}
                      onMouseEnter={e=>e.currentTarget.style.transform='translateY(-2px)'}
                      onMouseLeave={e=>e.currentTarget.style.transform='translateY(0)'}>
                      <div style={{ fontSize:10, color:'var(--muted)', marginBottom:2 }}>← Précédent</div>
                      <div style={{ fontWeight:700, fontSize:12 }}>{TITRES_NAV[prevSlug].replace(/CH \d+ — /,'')}</div>
                    </div>
                  </Link>
                ) : <div/>}
                {nextSlug ? (
                  <Link href={`/bac-france/terminale-techno/${nextSlug}`} style={{ textDecoration:'none' }}>
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
                {/* STMG */}
                <div style={{ padding:'10px 14px', borderBottom:'1px solid var(--border)',
                  fontSize:11, color:'#818cf8', fontWeight:700,
                  textTransform:'uppercase', letterSpacing:'0.08em',
                  background:'rgba(79,110,247,0.08)' }}>📊 STMG — 6 chapitres</div>
                {STMG_SLUGS.map(s => (
                  <Link key={s} href={`/bac-france/terminale-techno/${s}`} style={{ textDecoration:'none' }}>
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
                {/* STI2D */}
                <div style={{ padding:'10px 14px', borderBottom:'1px solid var(--border)',
                  fontSize:11, color:'#34d399', fontWeight:700,
                  textTransform:'uppercase', letterSpacing:'0.08em',
                  background:'rgba(16,185,129,0.08)' }}>⚙️ STI2D/STL — 7 chapitres</div>
                {STI_SLUGS.map(s => (
                  <Link key={s} href={`/bac-france/terminale-techno/${s}`} style={{ textDecoration:'none' }}>
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
              <div style={{ background:'var(--surface)', border:'1px solid var(--border)',
                borderRadius:12, padding:'13px' }}>
                <div style={{ fontSize:11, color:'var(--muted)', fontWeight:700,
                  textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:9 }}>Actions</div>
                <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
                  <Link href={`/solve?q=${encodeURIComponent('Explique '+chapter.titre+' '+chapter.branch+' France')}`}
                    className="btn btn-primary" style={{ textAlign:'center', fontSize:12 }}>
                    🤖 Chat IA — {chapter.badge}
                  </Link>
                  <Link href="/examens-france" className="btn btn-secondary"
                    style={{ textAlign:'center', fontSize:12 }}>📋 Sujets Bac France</Link>
                  <Link href="/bac-france/terminale-techno" className="btn btn-secondary"
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
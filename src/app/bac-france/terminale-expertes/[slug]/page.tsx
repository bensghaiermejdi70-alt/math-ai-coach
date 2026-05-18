'use client'
import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import { useParams } from 'next/navigation'

// ══════════════════════════════════════════════════════════════════════
// TERMINALE — OPTION MATHÉMATIQUES EXPERTES / [SLUG]
// Route : /bac-france/terminale-expertes/[slug]
// Programme officiel · 3h/semaine · Coef. 2 (CC)
// Structure : souschapitres + blocs
// ══════════════════════════════════════════════════════════════════════

const C = { thm:'#8b5cf6', def:'#4f6ef7', formule:'#f59e0b', prop:'#10b981', methode:'#ec4899', corollaire:'#f97316' }
const L: Record<string,string> = { thm:'Théorème', def:'Définition', formule:'Formule clé', prop:'Propriété', methode:'Méthode', corollaire:'Corollaire' }

const NAV_ORDER = [
  'divisibilite-z','pgcd-theoremes','nombres-premiers',
  'complexes-formes','polynomes-complexes',
  'theorie-graphes','calcul-matriciel','chaines-markov',
]
const TITRES_NAV: Record<string,string> = {
  'divisibilite-z':     'CH 01 — Divisibilité dans ℤ',
  'pgcd-theoremes':     'CH 02 — PGCD & Théorèmes',
  'nombres-premiers':   'CH 03 — Nombres premiers',
  'complexes-formes':   'CH 04 — Complexes : formes & expo.',
  'polynomes-complexes':'CH 05 — Polynômes dans ℂ',
  'theorie-graphes':    'CH 06 — Théorie des graphes',
  'calcul-matriciel':   'CH 07 — Calcul matriciel',
  'chaines-markov':     'CH 08 — Chaînes de Markov',
}
const SEC_COLORS: Record<string,string> = {
  'divisibilite-z':'#8b5cf6','pgcd-theoremes':'#8b5cf6','nombres-premiers':'#8b5cf6',
  'complexes-formes':'#4f6ef7','polynomes-complexes':'#4f6ef7',
  'theorie-graphes':'#10b981','calcul-matriciel':'#10b981','chaines-markov':'#10b981',
}

type Thm  = { id:string; type:string; nom:string; enonce:string; remarque?:string }
type Exo  = { id:string; niveau:string; titre:string; enonce:string; correction:string }
type Bloc = { notion:string; theoremes:Thm[]; exercices:Exo[] }
type SC   = { id:string; titre:string; notions:string[]; blocs:Bloc[] }
type Chap = { id:string; titre:string; badge:string; color:string; emoji:string; desc:string; souschapitres:SC[] }

// ══════════════════════════════════════════════════════════════════════
// DONNÉES — 8 CHAPITRES
// ══════════════════════════════════════════════════════════════════════
const ALL_CHAPTERS: Record<string,Chap> = {

// ─────────────────────────────────────────────────────────────────────
// CH 01 — DIVISIBILITÉ DANS ℤ
// ─────────────────────────────────────────────────────────────────────
'divisibilite-z': {
  id:'divisibilite-z', emoji:'÷', badge:'Arithmétique', color:'#8b5cf6',
  titre:'Divisibilité dans ℤ',
  desc:"Multiples et diviseurs dans ℤ, division euclidienne (unicité), congruences (addition, multiplication), critères de divisibilité, calculs modulaires.",
  souschapitres:[
    {
      id:'sc-div', titre:'1.1 Divisibilité et division euclidienne',
      notions:['b|a ↔ ∃k∈ℤ : a=kb','Propriétés : b|a et b|c → b|(a±c)','Division euclidienne : a=bq+r, 0≤r<|b|, unicité','b|a ↔ r=0'],
      blocs:[
        {
          notion:'÷ Divisibilité dans ℤ',
          theoremes:[
            { id:'D-DZ1', type:'def', nom:'Divisibilité dans ℤ',
              enonce:"b divise a (noté b|a) : ∃k∈ℤ, a=k·b\n\nPROPRIÉTÉS :\nb|a et b|c ⟹ b|(a+c), b|(a−c), b|(λa) ∀λ∈ℤ\nb|a et a|b ⟹ a=±b\nTout entier divise 0 ; 1 divise tout entier\n\nExemples :\n6|42 car 42=7×6 ✓\n7∤43 car 43=7×6+1 et r≠0" },
            { id:'T-DZ1', type:'thm', nom:'Division euclidienne dans ℤ',
              enonce:"Pour tout a∈ℤ et b∈ℤ* (b≠0), il existe un UNIQUE couple (q,r)∈ℤ² tel que :\na = bq + r  avec  0≤r<|b|\n\nq : quotient euclidien  ;  r : reste euclidien\nb|a ↔ r=0\n\nExemple :\n−17 = 5×(−4)+3 : q=−4, r=3\n(car |5|=5 et 0≤3<5 ✓)",
              remarque:"L'unicité est importante : il n'y a qu'une façon de diviser avec 0≤r<|b|." },
          ],
          exercices:[
            { id:'EX-DZ1', niveau:'Facile', titre:'Division euclidienne',
              enonce:"Effectuer la division euclidienne de 247 par 13.",
              correction:"247=13×19+0. q=19, r=0.\n13|247 ✓" },
            { id:'EX-DZ2', niveau:'Intermédiaire', titre:'Propriétés de divisibilité',
              enonce:"Montrer que si 6|n alors 2|n et 3|n.",
              correction:"6|n ⟹ ∃k∈ℤ: n=6k=2(3k) → 2|n.\n6|n ⟹ n=6k=3(2k) → 3|n. ✓" },
          ]
        },
      ]
    },
    {
      id:'sc-congru', titre:'1.2 Congruences modulo n',
      notions:['a≡b[n] ↔ n|(a−b)','Compatibilité +, −, ×','aᵏ≡bᵏ[n]','Critères de divisibilité par 2,3,9'],
      blocs:[
        {
          notion:'≡ Congruences et calculs modulaires',
          theoremes:[
            { id:'D-CG1', type:'def', nom:'Congruence modulo n',
              enonce:"a≡b[n]  ↔  n|(a−b)  ↔  a et b ont le même reste modulo n\n\nPROPRIÉTÉS (si a≡b[n] et c≡d[n]) :\na+c ≡ b+d [n]\na−c ≡ b−d [n]\na×c ≡ b×d [n]\naᵏ ≡ bᵏ [n]  pour tout k∈ℕ\n\nREMARQUE :\na≡b[n] et b≡c[n] → a≡c[n]  (transitivité)" },
            { id:'P-CG1', type:'prop', nom:'Critères de divisibilité',
              enonce:"10≡0[2] et [5] ; 10≡1[3] et [9]\n\n→ Somme des chiffres ≡ n (mod 3) et (mod 9)\n→ Dernier chiffre → divisibilité par 2 et 5\n\nEXEMPLE : 2025\n2+0+2+5=9 → 9|2025 et 3|2025 ✓\n5 dernier chiffre → 5|2025 ✓\n2025 impair → 2∤2025",
              remarque:"Pour 7 et 11 : règles plus complexes — en pratique, faire la division euclidienne." },
            { id:'M-CG1', type:'methode', nom:'Calculs rapides de puissances modulaires',
              enonce:"Astuce : remplacer aᵏ par (a mod n)ᵏ\n\nExemple : 7¹⁰⁰ mod 5\n7≡2[5] → 7¹⁰⁰≡2¹⁰⁰[5]\n2⁴=16≡1[5] → 2¹⁰⁰=(2⁴)²⁵≡1²⁵=1[5]\n7¹⁰⁰ mod 5 = 1\n\nExemple : 3⁴¹ mod 7\n3¹=3, 3²=9≡2, 3³≡6≡−1, 3⁶≡1[7]\n41=6×6+5 → 3⁴¹=(3⁶)⁶×3⁵≡1×3⁵=3⁵\n3⁵=3⁴×3=81×3≡4×3=12≡5[7]" },
          ],
          exercices:[
            { id:'EX-CG1', niveau:'Facile', titre:'Puissance modulaire',
              enonce:"Calculer 7³ mod 5 et 3¹⁰⁰ mod 4.",
              correction:"7≡2[5] → 7³≡8≡3[5].\n3≡−1[4] → 3¹⁰⁰≡(−1)¹⁰⁰=1[4]." },
            { id:'EX-CG2', niveau:'Intermédiaire', titre:'Reste de 2⁶⁰ mod 7',
              enonce:"Quel est le reste de 2⁶⁰ dans la division par 7 ?",
              correction:"2³=8≡1[7] (car 7|7).\n60=3×20 → 2⁶⁰=(2³)²⁰≡1²⁰=1[7].\nReste = 1." },
            { id:'EX-CG3', niveau:'Difficile', titre:'Divisibilité par 6',
              enonce:"Montrer que n(n+1)(2n+1) est divisible par 6 pour tout n∈ℕ.",
              correction:"Divisible par 2 : parmi n, n+1 l'un est pair.\nDivisible par 3 : parmi 3 entiers consécutifs n, n+1, n+2 l'un est mult. de 3. Or 2n+1≡−(n+2)+3(n+1)... Tester n mod 3 :\nn≡0 : 3|n ✓ ; n≡1 : n+1≡2, 2n+1≡3≡0 ✓ ; n≡2 : n+1≡0 ✓.\nDivisible par 6 car 2 et 3 coprimes et les deux divisent n(n+1)(2n+1)." },
          ]
        },
      ]
    },
  ]
},

// ─────────────────────────────────────────────────────────────────────
// CH 02 — PGCD & THÉORÈMES FONDAMENTAUX
// ─────────────────────────────────────────────────────────────────────
'pgcd-theoremes': {
  id:'pgcd-theoremes', emoji:'gcd', badge:'Arithmétique', color:'#8b5cf6',
  titre:'PGCD & Théorèmes fondamentaux',
  desc:"PGCD par algorithme d'Euclide, théorème de Bézout (au+bv=PGCD), théorème de Gauss, équations diophantiennes ax+by=c.",
  souschapitres:[
    {
      id:'sc-pgcd', titre:'2.1 PGCD et algorithme d\'Euclide',
      notions:['PGCD(a,b) : plus grand diviseur commun','Algorithme d\'Euclide : PGCD(a,b)=PGCD(b,a mod b)','Copremiers : PGCD(a,b)=1','PGCD et multiples : PGCD(ka,kb)=k·PGCD(a,b)'],
      blocs:[
        {
          notion:'🔑 PGCD et algorithme d\'Euclide',
          theoremes:[
            { id:'D-PG1', type:'def', nom:'PGCD',
              enonce:"PGCD(a,b) = plus grand diviseur commun de a et b\nNotation : PGCD(a,b) ou a∧b\n\nPROPRIÉTÉS :\nGPGCD(a,b)=PGCD(b,a)\nGPGCD(a,0)=a\nSi d=PGCD(a,b) : a=d·a', b=d·b' avec PGCD(a',b')=1\nGPGCD(a,b)=PGCD(a,a−b)\n\na et b COPRIMES : PGCD(a,b)=1" },
            { id:'M-PG1', type:'methode', nom:'Algorithme d\'Euclide',
              enonce:"PGCD(a,b) avec a≥b>0 :\nPrincipe : PGCD(a,b)=PGCD(b,r) où r=a mod b\n\nÉTAPES :\na = bq₁+r₁ → PGCD(a,b)=PGCD(b,r₁)\nb = r₁q₂+r₂ → PGCD(b,r₁)=PGCD(r₁,r₂)\n… jusqu'à rₖ=0\nDernier reste non nul = PGCD(a,b)\n\nExemple : PGCD(252,105) :\n252=105×2+42\n105=42×2+21\n42=21×2+0\n→ PGCD=21",
              remarque:"Complexité : O(log(min(a,b))) divisions. C'est un des algorithmes les plus anciens (Euclide, ~300 av.J.-C.)." },
          ],
          exercices:[
            { id:'EX-PG1', niveau:'Facile', titre:'Algorithme d\'Euclide',
              enonce:"Calculer PGCD(756, 315).",
              correction:"756=315×2+126\n315=126×2+63\n126=63×2+0\nPGCD=63." },
          ]
        },
      ]
    },
    {
      id:'sc-bezout', titre:'2.2 Bézout, Gauss et diophantiennes',
      notions:['Bézout : ∃u,v∈ℤ : au+bv=PGCD(a,b)','Gauss : a|bc et PGCD(a,b)=1 ⟹ a|c','ax+by=c solvable ↔ PGCD(a,b)|c','Solutions générales diophantiennes'],
      blocs:[
        {
          notion:'📐 Bézout et équations diophantiennes',
          theoremes:[
            { id:'T-PG1', type:'thm', nom:'Théorème de Bézout',
              enonce:"Pour a,b∈ℤ non tous nuls :\n∃u,v∈ℤ : au+bv=PGCD(a,b)\n\nCOROLLAIRE (Bézout) :\nGPGCD(a,b)=1 ↔ ∃u,v∈ℤ : au+bv=1\n\nMÉTHODE des coefficients (remontée d'Euclide) :\n21=105−42×2\n42=252−105×2\n→ 21=105−(252−105×2)×2=105×5−252×2\n→ u=5, v=−2 : 105×5+252×(−2)=21 ✓" },
            { id:'T-PG2', type:'thm', nom:'Théorème de Gauss',
              enonce:"Si a|bc et PGCD(a,b)=1, alors a|c.\n\nCOROLLAIRE : p premier et p|bc → p|b ou p|c\n\nDémonstration :\nGPGCD(a,b)=1 → ∃u,v : au+bv=1\n→ acu+bcv=c\na|acu et a|bcv (car a|bc) → a|c ✓",
              remarque:"Ce théorème est fondamental : il est utilisé partout en arithmétique pour prouver les divisibilités." },
            { id:'D-PG2', type:'def', nom:'Équations diophantiennes',
              enonce:"ax+by=c  (a,b,c∈ℤ)\n\nCONDITION DE SOLVABILITÉ :\nAdmet des solutions entières ↔ PGCD(a,b)|c\n\nSOLUTIONS GÉNÉRALES :\nSi (x₀,y₀) est une solution particulière et d=PGCD(a,b) :\nx = x₀ + (b/d)k\ny = y₀ − (a/d)k\npour tout k∈ℤ\n\nMÉTHODE :\n1. Vérifier PGCD(a,b)|c\n2. Ramener à au'+bv'=1 (diviser par d)\n3. Trouver (u₀,v₀) par Bézout\n4. Solution part. (x₀,y₀)=(c/d·u₀, c/d·v₀)" },
          ],
          exercices:[
            { id:'EX-BZ1', niveau:'Intermédiaire', titre:'Bézout — remontée d\'Euclide',
              enonce:"Trouver u,v∈ℤ tels que 35u+14v=7.",
              correction:"PGCD(35,14)=7. 35=14×2+7 → 7=35−14×2.\nu=1, v=−2 : 35×1+14×(−2)=7 ✓" },
            { id:'EX-BZ2', niveau:'Difficile', titre:'Équation diophantienne',
              enonce:"Résoudre dans ℤ² : 12x+8y=4.",
              correction:"d=PGCD(12,8)=4. 4|4 ✓.\nDiviser : 3x+2y=1.\nBézout : 3×1+2×(−1)=1 → (x₀,y₀)=(1,−1).\nSolutions générales : x=1+2k, y=−1−3k, k∈ℤ." },
          ]
        },
      ]
    },
  ]
},

// ─────────────────────────────────────────────────────────────────────
// CH 03 — NOMBRES PREMIERS
// ─────────────────────────────────────────────────────────────────────
'nombres-premiers': {
  id:'nombres-premiers', emoji:'ℙ', badge:'Arithmétique', color:'#8b5cf6',
  titre:'Nombres premiers',
  desc:"Définition, crible d'Ératosthène, infinité des premiers, décomposition en facteurs premiers (unicité), petit théorème de Fermat aᵖ⁻¹≡1[p].",
  souschapitres:[
    {
      id:'sc-prem-def', titre:'3.1 Définitions et propriétés',
      notions:['p premier : diviseurs uniquement 1 et p','Infinité des nombres premiers (preuve Euclide)','Crible d\'Ératosthène','Décomposition unique en facteurs premiers (TFA)'],
      blocs:[
        {
          notion:'ℙ Premiers et décomposition',
          theoremes:[
            { id:'D-NP1', type:'def', nom:'Nombre premier',
              enonce:"p∈ℕ, p≥2 est PREMIER si ses seuls diviseurs positifs sont 1 et p.\n\n2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, …\n\nTests de primalité :\nPour tester si n est premier : essayer les diviseurs ≤√n\n(Si aucun ne divise n, alors n est premier)\n\nExemple : 97 premier ?\n√97≈9,8 → tester 2,3,5,7 → aucun ne divise 97 → premier ✓" },
            { id:'T-NP1', type:'thm', nom:'Infinité des nombres premiers (Euclide)',
              enonce:"Il existe une infinité de nombres premiers.\n\nDÉMONSTRATION PAR L'ABSURDE :\nSupponsons qu'il n'y en ait qu'un nombre fini : p₁,…,pₙ\nPoser N = p₁×p₂×…×pₙ + 1\n• N>pᵢ pour tout i → N n'est pas dans la liste\n• Soit q un facteur premier de N\n• q ne peut être aucun des pᵢ (sinon q|N et q|p₁…pₙ → q|1, impossible)\n• CONTRADICTION : il existe un premier hors de la liste.",
              remarque:"Cette preuve d'Euclide date d'environ 300 av. J.-C. C'est l'une des plus belles preuves de mathématiques." },
            { id:'T-NP2', type:'thm', nom:'Théorème fondamental de l\'arithmétique (TFA)',
              enonce:"Tout entier n≥2 s'écrit de manière UNIQUE comme produit de nombres premiers :\nn = p₁^α₁ × p₂^α₂ × … × pₖ^αₖ\n(p₁<p₂<…<pₖ premiers, αᵢ≥1)\n\nExemples :\n360 = 2³×3²×5\n1001 = 7×11×13\n\nNOMBRE DE DIVISEURS :\nSi n=p₁^α₁×…×pₖ^αₖ : nb de diviseurs = (α₁+1)(α₂+1)…(αₖ+1)" },
          ],
          exercices:[
            { id:'EX-NP1', niveau:'Facile', titre:'Décomposition en facteurs premiers',
              enonce:"Décomposer 1260 en facteurs premiers. Combien a-t-il de diviseurs ?",
              correction:"1260=2×630=2×2×315=4×315=4×5×63=4×5×9×7=2²×3²×5×7.\nNb diviseurs=(2+1)(2+1)(1+1)(1+1)=3×3×2×2=36." },
            { id:'EX-NP2', niveau:'Intermédiaire', titre:'PGCD par décomposition',
              enonce:"Calculer PGCD(360,504) et PPCM(360,504).",
              correction:"360=2³×3²×5 ; 504=2³×3²×7.\nPGCD=2³×3²=72.\nPPCM=2³×3²×5×7=2520." },
          ]
        },
      ]
    },
    {
      id:'sc-fermat', titre:'3.2 Petit théorème de Fermat',
      notions:['Si p premier et PGCD(a,p)=1 : aᵖ⁻¹≡1[p]','aᵖ≡a[p] pour tout a','Application : calculs modulaires rapides','RSA (base cryptographique)'],
      blocs:[
        {
          notion:'⚡ Petit théorème de Fermat',
          theoremes:[
            { id:'T-FE1', type:'thm', nom:'Petit théorème de Fermat',
              enonce:"Si p est premier et PGCD(a,p)=1 (a non multiple de p) :\naᵖ⁻¹ ≡ 1 [p]\n\nFORME ÉQUIVALENTE :\naᵖ ≡ a [p]  pour tout a∈ℤ\n\nEXEMPLES :\np=7 : a⁶≡1[7] si 7∤a\n3⁶=729=104×7+1 → 3⁶≡1[7] ✓\n\np=5 : a⁴≡1[5] si 5∤a\n2⁴=16=3×5+1 → 2⁴≡1[5] ✓",
              remarque:"Application RSA : chiffrement aᵉ mod n, déchiffrement aᵉᵈ≡a mod n grâce au théorème d'Euler (généralisation de Fermat)." },
            { id:'M-FE1', type:'methode', nom:'Calcul de aⁿ mod p par Fermat',
              enonce:"Réduire n modulo (p−1) :\naⁿ mod p = aⁿ ᵐᵒᵈ ⁽ᵖ⁻¹⁾ mod p\n\nEXEMPLE : 7¹⁰⁰ mod 13\np=13 → p−1=12\n100 = 12×8+4 → 7¹⁰⁰≡7⁴[13]\n7²=49≡10[13]\n7⁴≡10²=100≡9[13]\n7¹⁰⁰≡9[13]\n\nEXEMPLE : 2¹⁰⁰⁰ mod 11\np−1=10 ; 1000=10×100 → 2¹⁰⁰⁰≡(2¹⁰)¹⁰⁰≡1[11]" },
          ],
          exercices:[
            { id:'EX-FE1', niveau:'Intermédiaire', titre:'Application Fermat',
              enonce:"Calculer 3¹⁰⁰ mod 7.",
              correction:"p=7, p−1=6. 100=6×16+4 → 3¹⁰⁰≡3⁴[7].\n3²=9≡2[7] → 3⁴≡4[7].\n3¹⁰⁰ mod 7 = 4." },
            { id:'EX-FE2', niveau:'Difficile', titre:'Fermat et divisibilité',
              enonce:"Montrer que pour p premier, p|nᵖ−n pour tout n∈ℤ.",
              correction:"nᵖ≡n[p] (petit théorème de Fermat, cas n multiple de p : nᵖ≡0≡n).\nDonc p|(nᵖ−n) ✓" },
          ]
        },
      ]
    },
  ]
},

// ─────────────────────────────────────────────────────────────────────
// CH 04 — COMPLEXES : FORMES & EXPONENTIELLE
// ─────────────────────────────────────────────────────────────────────
'complexes-formes': {
  id:'complexes-formes', emoji:'eⁱᶿ', badge:'Complexes', color:'#4f6ef7',
  titre:'Complexes : formes & exponentielles',
  desc:"Module, argument, forme trigonométrique z=r(cosθ+isinθ), forme exponentielle reⁱᶿ, formule d'Euler, De Moivre, racines n-ièmes de l'unité.",
  souschapitres:[
    {
      id:'sc-cx-forms', titre:'4.1 Formes trigonométrique et exponentielle',
      notions:['z=r(cosθ+isinθ) : forme trigonométrique','z=reⁱᶿ : forme exponentielle','eⁱᶿ=cosθ+isinθ (Euler)','|z₁z₂|=|z₁||z₂| ; arg(z₁z₂)=arg(z₁)+arg(z₂)'],
      blocs:[
        {
          notion:'eⁱᶿ Forme exponentielle et Euler',
          theoremes:[
            { id:'D-CF1', type:'def', nom:'Module, argument et formes',
              enonce:"z=a+ib (forme algébrique)\n|z|=√(a²+b²) ; arg(z)=θ tel que cosθ=a/|z|, sinθ=b/|z|\n\nForme trig. : z=|z|(cosθ+isinθ)\nForme expo. : z=|z|·eⁱᶿ\n\nFORMULE D'EULER :\neⁱᶿ=cosθ+isinθ\n\nConséquences :\ncosθ=(eⁱᶿ+e⁻ⁱᶿ)/2\nsinθ=(eⁱᶿ−e⁻ⁱᶿ)/(2i)\neⁱᵖ=−1 ; eⁱᵖ/²=i ; eⁱ²ᵖ=1" },
            { id:'F-CF1', type:'formule', nom:'Produit et quotient en forme exponentielle',
              enonce:"z₁=r₁eⁱᶿ¹, z₂=r₂eⁱᶿ²\n\nz₁z₂ = r₁r₂ · eⁱ⁽ᶿ¹⁺ᶿ²⁾\nz₁/z₂ = (r₁/r₂) · eⁱ⁽ᶿ¹⁻ᶿ²⁾\nz̄ = r·e⁻ⁱᶿ\nzⁿ = rⁿ·eⁱⁿᶿ  (formule de De Moivre pour r=1)",
              remarque:"La forme exponentielle transforme les multiplications en additions d'arguments : c'est sa grande puissance." },
          ],
          exercices:[
            { id:'EX-CF1', niveau:'Facile', titre:'Forme exponentielle',
              enonce:"Écrire z=1−i et w=√3+i en forme exponentielle, puis calculer z·w.",
              correction:"z=√2·e^(−iπ/4) ; w=2·e^(iπ/6).\nzw=2√2·e^(i(π/6−π/4))=2√2·e^(−iπ/12)." },
          ]
        },
      ]
    },
    {
      id:'sc-moivre-racines', titre:'4.2 Formule de De Moivre et racines',
      notions:['(eⁱᶿ)ⁿ=eⁱⁿᶿ : formule de De Moivre','Linéarisation de cosⁿθ et sinⁿθ','Racines n-ièmes de l\'unité : ωₖ=e^(2ikπ/n)','Polygone régulier et racines'],
      blocs:[
        {
          notion:'⭕ De Moivre, linéarisation, racines n-ièmes',
          theoremes:[
            { id:'T-CF1', type:'thm', nom:'Formule de De Moivre',
              enonce:"(cosθ+isinθ)ⁿ = cos(nθ)+isin(nθ)  pour n∈ℤ\n\nAPPLICATIONS :\nLinéarisation de cosⁿθ ou sinⁿθ :\n  Développer (eⁱᶿ±e⁻ⁱᶿ)ⁿ par Newton, regrouper\n\nFormules cos(nθ) et sin(nθ) :\n  Développer (cosθ+isinθ)ⁿ par Newton, identifier Re et Im\n\nExemple cos(3θ) :\n(c+is)³=c³+3ic²s−3cs²−is³\nRe : c³−3cs²=cos²θ−3cosθsin²θ=4cos³θ−3cosθ" },
            { id:'F-CF2', type:'formule', nom:'Racines n-ièmes de l\'unité',
              enonce:"Racines de zⁿ=1 :\nωₖ = e^(2ikπ/n)  pour k=0,1,…,n−1\n\nωₖ = cos(2kπ/n)+isin(2kπ/n)\n\n→ Polygone régulier n côtés inscrit dans |z|=1\n\nPROPRIÉTÉS :\nSomme des racines = 0 (n≥2)\nProduit des racines = (−1)^(n+1)\nω = e^(2iπ/n) : racine primitive (génère toutes les autres)" },
            { id:'M-CF1', type:'methode', nom:'Linéarisation de cosⁿθ',
              enonce:"But : exprimer cosⁿθ en somme de cos(kθ)\n\nMÉTHODE :\n1. Écrire cosθ=(eⁱᶿ+e⁻ⁱᶿ)/2\n2. Développer (eⁱᶿ+e⁻ⁱᶿ)ⁿ par Newton :\n   Σ Cₙᵏ e^(i(2k−n)θ)\n3. Regrouper : e^(imθ)+e^(−imθ)=2cos(mθ)\n\nExemple cos³θ :\n(eⁱᶿ+e⁻ⁱᶿ)³=e³ⁱᶿ+3eⁱᶿ+3e⁻ⁱᶿ+e⁻³ⁱᶿ\n=2cos(3θ)+6cos(θ)\n→ cos³θ=(2cos3θ+6cosθ)/8=(cos3θ+3cosθ)/4" },
          ],
          exercices:[
            { id:'EX-MR1', niveau:'Intermédiaire', titre:'Racines cubiques de j',
              enonce:"Trouver toutes les racines cubiques de j=e^(2iπ/3).",
              correction:"zⁿ=j=e^(2iπ/3). zₖ=e^(i(2π/3+2kπ)/3)=e^(i(2π/9+2kπ/3)) k=0,1,2.\nz₀=e^(2iπ/9) ; z₁=e^(i8π/9) ; z₂=e^(i14π/9)." },
            { id:'EX-MR2', niveau:'Difficile', titre:'Linéarisation sin²θcos²θ',
              enonce:"Linéariser sin²θ·cos²θ.",
              correction:"sin²θcos²θ=(sinθcosθ)²=(sin(2θ)/2)²=sin²(2θ)/4.\nsin²(2θ)=(1−cos4θ)/2.\nsin²θcos²θ=(1−cos4θ)/8." },
          ]
        },
      ]
    },
  ]
},

// ─────────────────────────────────────────────────────────────────────
// CH 05 — POLYNÔMES DANS ℂ
// ─────────────────────────────────────────────────────────────────────
'polynomes-complexes': {
  id:'polynomes-complexes', emoji:'P(z)', badge:'Complexes', color:'#4f6ef7',
  titre:'Équations polynomiales dans ℂ',
  desc:"Second degré dans ℂ (Δ<0), factorisation zⁿ−aⁿ, théorème fondamental de l'algèbre, factorisation par (z−a), relations coefficients-racines.",
  souschapitres:[
    {
      id:'sc-pol-deg2', titre:'5.1 Second degré dans ℂ et factorisations',
      notions:['Δ<0 : racines z=(-b±i√|Δ|)/(2a)','zⁿ−aⁿ=(z−a)(zⁿ⁻¹+azⁿ⁻²+…+aⁿ⁻¹)','Théorème fondamental de l\'algèbre (admis)','P(a)=0 ↔ (z−a)|P(z)'],
      blocs:[
        {
          notion:'📐 Racines complexes et factorisations',
          theoremes:[
            { id:'T-PC1', type:'thm', nom:'Second degré dans ℂ',
              enonce:"az²+bz+c=0 (a,b,c∈ℂ, a≠0) :\nDiscriminant Δ=b²−4ac∈ℂ\n\nSi Δ=0 : z₀=−b/(2a) (racine double)\nSi Δ≠0 : z₁=(−b+√Δ)/(2a) ; z₂=(−b−√Δ)/(2a)\n\nCAS RÉELS (a,b,c∈ℝ) et Δ<0 :\nΔ=−|Δ| → √Δ=i√|Δ|\nz₁=(−b+i√|Δ|)/(2a)  ;  z₂=(−b−i√|Δ|)/(2a)=z̄₁\n(racines complexes conjuguées)\n\nRelations coefficients-racines :\nz₁+z₂=−b/a  ;  z₁z₂=c/a" },
            { id:'F-PC1', type:'formule', nom:'Factorisations polynomiales',
              enonce:"zⁿ−aⁿ = (z−a)(zⁿ⁻¹+azⁿ⁻²+a²zⁿ⁻³+…+aⁿ⁻¹)\n\nCas particulier :\nz²−a²=(z−a)(z+a)\nz³−a³=(z−a)(z²+az+a²)\nz³+a³=(z+a)(z²−az+a²)\n\nTHÉORÈME (admis) :\nTout polynôme de degré n≥1 à coeff. complexes admet exactement n racines complexes (comptées avec multiplicité).\n→ P(z)=a(z−z₁)(z−z₂)…(z−zₙ)",
              remarque:"A contrario, un polynôme de degré n à coeff. réels a ses racines complexes en paires conjuguées." },
          ],
          exercices:[
            { id:'EX-PC1', niveau:'Facile', titre:'Racines complexes',
              enonce:"Résoudre dans ℂ : z²+2z+5=0.",
              correction:"Δ=4−20=−16. √Δ=4i.\nz₁=(−2+4i)/2=−1+2i ; z₂=−1−2i." },
            { id:'EX-PC2', niveau:'Intermédiaire', titre:'Factorisation',
              enonce:"Factoriser P(z)=z³−1 dans ℂ.",
              correction:"z³−1=(z−1)(z²+z+1).\nRacines de z²+z+1 : Δ=−3, z=(-1±i√3)/2.\nP(z)=(z−1)(z−j)(z−j̄) où j=e^(2iπ/3)." },
          ]
        },
      ]
    },
    {
      id:'sc-pol-relcoefsrac', titre:'5.2 Relations coefficients-racines',
      notions:['Polynôme à coeff. réels : racines complexes par paires conjuguées','Relations de Vieta : z₁+z₂+…=−aₙ₋₁/aₙ','Reconstruction d\'un polynôme depuis ses racines','Applications'],
      blocs:[
        {
          notion:'🔑 Relations de Vieta',
          theoremes:[
            { id:'T-PC2', type:'thm', nom:'Relations de Vieta',
              enonce:"Pour P(z)=aₙzⁿ+aₙ₋₁zⁿ⁻¹+…+a₀=aₙ(z−z₁)…(z−zₙ) :\n\nSomme des racines : z₁+z₂+…+zₙ = −aₙ₋₁/aₙ\nProduit des racines : z₁z₂…zₙ = (−1)ⁿ a₀/aₙ\n\nPour n=3 : P(z)=z³+pz²+qz+r\nz₁+z₂+z₃=−p\nz₁z₂+z₁z₃+z₂z₃=q\nz₁z₂z₃=−r\n\nUTILISATION :\nSi on connaît une racine z₁, on peut trouver les autres\nen utilisant les relations et en factorisant par (z−z₁)." },
          ],
          exercices:[
            { id:'EX-VT1', niveau:'Intermédiaire', titre:'Vieta inverse',
              enonce:"P(z)=z³−6z²+11z−6. Sachant que P(1)=0, factoriser P.",
              correction:"P(1)=1−6+11−6=0 ✓. (z−1) est un facteur.\nDivision : P(z)=(z−1)(z²−5z+6)=(z−1)(z−2)(z−3)." },
            { id:'EX-VT2', niveau:'Difficile', titre:'Polynôme réel et racine complexe',
              enonce:"P∈ℝ[z] de degré 3, P(i)=0, P(2)=0, P(0)=−2. Trouver P.",
              correction:"P∈ℝ[z] et P(i)=0 → P(−i)=0.\nP(z)=a(z−i)(z+i)(z−2)=a(z²+1)(z−2).\nP(0)=a(1)(−2)=−2a=−2 → a=1.\nP(z)=(z²+1)(z−2)=z³−2z²+z−2." },
          ]
        },
      ]
    },
  ]
},

// ─────────────────────────────────────────────────────────────────────
// CH 06 — THÉORIE DES GRAPHES
// ─────────────────────────────────────────────────────────────────────
'theorie-graphes': {
  id:'theorie-graphes', emoji:'⬡', badge:'Graphes', color:'#10b981',
  titre:'Théorie des graphes',
  desc:"Vocabulaire (sommets, arêtes, degrés), graphes orientés/non orientés, chaînes eulériennes (Euler), matrice d'adjacence, graphes probabilistes.",
  souschapitres:[
    {
      id:'sc-graphes-def', titre:'6.1 Vocabulaire et propriétés',
      notions:['Graphe G=(V,E), ordre, degré d(v)','Théorème des poignées de mains : Σd=2|E|','Chaîne eulérienne : 0 ou 2 sommets impairs','Circuit eulérien : tous sommets de degré pair'],
      blocs:[
        {
          notion:'⬡ Graphes et théorème d\'Euler',
          theoremes:[
            { id:'D-GR1', type:'def', nom:'Graphe — vocabulaire',
              enonce:"Graphe G=(V,E) :\nV : ensemble de sommets (ordre n=|V|)\nE : ensemble d'arêtes (m=|E|)\n\nDEGRÉ d(v) : nombre d'arêtes incidentes à v\nGraphe connexe : tout sommet accessible depuis tout autre\n\nGRAPHE ORIENTÉ (digraphe) :\nArcs (u,v) : de u vers v (u→v)\nDemi-degré entrant d⁺(v) et sortant d⁻(v)" },
            { id:'T-GR1', type:'thm', nom:'Théorème des poignées de mains',
              enonce:"Σᵥ d(v) = 2|E|\n(Somme des degrés = 2 × nombre d'arêtes)\n\nCOROLLAIRE :\nLe nombre de sommets de degré impair est pair.\n\nDÉMONSTRATION :\nChaque arête contribue 1 à d(u) et 1 à d(v)\n→ contribue exactement 2 à Σd(v)\n→ Σd(v) = 2|E| ✓" },
            { id:'T-GR2', type:'thm', nom:'Théorème d\'Euler (chaînes et circuits)',
              enonce:"CHAÎNE EULÉRIENNE (traverse chaque arête une fois) :\n↔ G connexe ET exactement 0 ou 2 sommets de degré impair\n\nCIRCUIT EULÉRIEN (chaîne eulérienne fermée) :\n↔ G connexe ET tous sommets de degré pair\n\nSi 2 sommets impairs : ce sont les extrémités obligatoires\nSi 0 sommet impair : tout sommet peut être le départ",
              remarque:"Problème des 7 ponts de Königsberg (Euler, 1736) : premier problème de théorie des graphes." },
          ],
          exercices:[
            { id:'EX-GR1', niveau:'Facile', titre:'Degrés et Euler',
              enonce:"Graphe K₄ (complet à 4 sommets). Degrés, Σd, nombre d'arêtes. Circuit eulérien ?",
              correction:"K₄ : chaque sommet relié aux 3 autres → d(v)=3 ∀v.\nΣd=4×3=12. |E|=12/2=6.\nDegrés impairs (tous 3) : 4 sommets impairs → pas de chaîne eulérienne (il faudrait 0 ou 2)." },
            { id:'EX-GR2', niveau:'Intermédiaire', titre:'Condition eulérienne',
              enonce:"Graphe avec sommets {A,B,C,D,E} et arêtes AB,AC,BC,BD,CD,DE,EA. Circuit eulérien possible ?",
              correction:"d(A)=3, d(B)=3, d(C)=3, d(D)=3, d(E)=3.\n5 sommets impairs → pas de chaîne eulérienne. (Il en faut 0 ou 2.)" },
          ]
        },
      ]
    },
    {
      id:'sc-matrice-adj', titre:'6.2 Matrice d\'adjacence et graphes probabilistes',
      notions:['Matrice A=(aᵢⱼ) : aᵢⱼ=1 si arête (i,j)','(Aᵏ)ᵢⱼ = nombre de chemins de longueur k','Graphe probabiliste : Σⱼ tᵢⱼ=1','Distribution stationnaire π=πT'],
      blocs:[
        {
          notion:'📊 Matrice d\'adjacence et probabiliste',
          theoremes:[
            { id:'D-GR2', type:'def', nom:'Matrice d\'adjacence',
              enonce:"A=(aᵢⱼ) matrice n×n :\naᵢⱼ=1 si arête (vᵢ,vⱼ) ; 0 sinon\n\nGraphe non orienté : A symétrique\nd(vᵢ) = somme de la ligne i\n\nPROPRIÉTÉ FONDAMENTALE :\n(Aᵏ)ᵢⱼ = nombre de chemins de longueur k de vᵢ à vⱼ\n\nGRAPHE PROBABILISTE :\nSommet = état ; arc (i,j) de probabilité pᵢⱼ\nΣⱼ pᵢⱼ = 1 (probabilités sortantes somment à 1)" },
          ],
          exercices:[
            { id:'EX-MA1', niveau:'Intermédiaire', titre:'Matrice d\'adjacence',
              enonce:"Graphe G : sommets {1,2,3,4}, arêtes 1-2, 2-3, 3-4, 1-4, 2-4. Écrire A et calculer (A²)₁₃.",
              correction:"A=[[0,1,0,1],[1,0,1,1],[0,1,0,1],[1,1,1,0]].\n(A²)₁₃=A[1]·A[:,3]=0×0+1×1+0×0+1×1=2.\n→ 2 chemins de longueur 2 de 1 à 3 : 1→2→3 et 1→4→3." },
          ]
        },
      ]
    },
  ]
},

// ─────────────────────────────────────────────────────────────────────
// CH 07 — CALCUL MATRICIEL
// ─────────────────────────────────────────────────────────────────────
'calcul-matriciel': {
  id:'calcul-matriciel', emoji:'▦', badge:'Matrices', color:'#10b981',
  titre:'Calcul matriciel',
  desc:"Matrices carrées ordre 2 et 3, addition, multiplication, matrice identité, matrice inverse (ordre 2), puissances Mⁿ, systèmes linéaires, transformations géométriques.",
  souschapitres:[
    {
      id:'sc-mat-ops', titre:'7.1 Opérations et matrice inverse',
      notions:['Addition, multiplication scalaire, produit AB','Identité Iₙ : AIₙ=IₙA=A','Inverse A⁻¹ : AA⁻¹=I','det(A) ; A inversible ↔ det(A)≠0'],
      blocs:[
        {
          notion:'▦ Opérations matricielles',
          theoremes:[
            { id:'D-MA1', type:'def', nom:'Matrices et opérations',
              enonce:"A=(aᵢⱼ) taille m×n\n\nPRODUIT AB (m×n)×(n×p)=(m×p) :\n(AB)ᵢⱼ=Σₖ aᵢₖbₖⱼ\n\n⚠ AB≠BA en général\n(AB)ᵀ=BᵀAᵀ\n(AB)ⁿ ≠ AⁿBⁿ (sauf si AB=BA)\n\nMATRICE IDENTITÉ Iₙ : diagonale=1, reste=0\nAIₙ=IₙA=A" },
            { id:'F-MA1', type:'formule', nom:'Déterminant et inverse',
              enonce:"Ordre 2 : A=[[a,b],[c,d]]\ndet(A)=ad−bc\nA⁻¹=(1/det(A))·[[d,−b],[−c,a]]  (si det(A)≠0)\n\nOrdre 3 (Sarrus) :\ndet([[a,b,c],[d,e,f],[g,h,i]])\n=aei+bfg+cdh−ceg−afh−bdi\n\nPROPRIÉTÉS :\ndet(AB)=det(A)·det(B)\nA inversible ↔ det(A)≠0\nSystème AX=B : X=A⁻¹B si det(A)≠0",
              remarque:"Méthode de Gauss-Jordan pour l'inverse : [A|I] → opérations élémentaires → [I|A⁻¹]." },
          ],
          exercices:[
            { id:'EX-MA1', niveau:'Facile', titre:'Inverse d\'ordre 2',
              enonce:"Calculer l'inverse de A=[[3,2],[5,4]].",
              correction:"det(A)=12−10=2.\nA⁻¹=(1/2)[[4,−2],[−5,3]]=[[2,−1],[−5/2,3/2]]." },
            { id:'EX-MA2', niveau:'Intermédiaire', titre:'Produit matriciel',
              enonce:"A=[[1,2],[3,4]], B=[[5,1],[0,2]]. Calculer AB et BA.",
              correction:"AB=[[5,5],[15,11]].\nBA=[[8,14],[6,8]].\nAB≠BA ✓ (non-commutativité)" },
          ]
        },
      ]
    },
    {
      id:'sc-mat-puiss', titre:'7.2 Puissances de matrices et diagonalisation',
      notions:['Mⁿ par récurrence ou diagonalisation','M=PDP⁻¹ → Mⁿ=PDⁿP⁻¹','Valeurs propres λ : det(M−λI)=0','Vecteurs propres : (M−λI)v=0'],
      blocs:[
        {
          notion:'🔢 Puissances et diagonalisation',
          theoremes:[
            { id:'M-MA1', type:'methode', nom:'Calcul de Mⁿ — méthodes',
              enonce:"MÉTHODE 1 — Relation de récurrence :\nSi Mⁿ=aMⁿ⁻¹+bMⁿ⁻² (équation char.) : résoudre\n\nMÉTHODE 2 — Diagonalisation :\nM diagonalisable ↔ M=PDP⁻¹\nD=diag(λ₁,…,λₙ) ; colonnes de P = vecteurs propres\nMⁿ = PDⁿP⁻¹\n\nVALEURS PROPRES λ :\ndet(M−λI)=0 (équation caractéristique)\n\nVECTEURS PROPRES :\n(M−λI)v=0 → espace propre\n\nExemple 2×2 :\nM=[[3,1],[0,2]]\ndet(M−λI)=(3−λ)(2−λ)=0 → λ₁=3, λ₂=2",
              remarque:"Pour les chaînes de Markov : Mⁿ→M^∞ quand n→∞ (convergence vers l'état stationnaire)." },
            { id:'F-MA2', type:'formule', nom:'Transformations géométriques matricielles',
              enonce:"ROTATION d'angle θ dans ℝ² :\nR_θ=[[cosθ,−sinθ],[sinθ,cosθ]]\n\nSYMÉTRIE axiale (axe Ox) :\nS_x=[[1,0],[0,−1]]\n\nHOMOTHÉTIE de rapport k :\nH_k=[[k,0],[0,k]]\n\nCOMPOSITION : (R_θ∘S_x)(M)=S_x·R_θ·M (dans l'ordre)" },
          ],
          exercices:[
            { id:'EX-MA3', niveau:'Intermédiaire', titre:'Valeurs propres',
              enonce:"M=[[5,4],[1,2]]. Trouver les valeurs propres et les vecteurs propres.",
              correction:"det(M−λI)=(5−λ)(2−λ)−4=λ²−7λ+6=(λ−1)(λ−6)=0.\nλ₁=1 : (M−I)v=[[4,4],[1,1]]v=0 → v₁=(1,−1).\nλ₂=6 : (M−6I)v=[[−1,4],[1,−4]]v=0 → v₂=(4,1)." },
            { id:'EX-MA4', niveau:'Difficile', titre:'Mⁿ par diagonalisation',
              enonce:"M=[[3,1],[0,2]]. Calculer Mⁿ.",
              correction:"λ₁=3, λ₂=2.\nP=[[1,1],[0,1]], P⁻¹=[[1,−1],[0,1]].\nD=[[3,0],[0,2]].\nMⁿ=PDⁿP⁻¹=[[3ⁿ,3ⁿ−2ⁿ],[0,2ⁿ]]." },
          ]
        },
      ]
    },
  ]
},

// ─────────────────────────────────────────────────────────────────────
// CH 08 — CHAÎNES DE MARKOV
// ─────────────────────────────────────────────────────────────────────
'chaines-markov': {
  id:'chaines-markov', emoji:'🔄', badge:'Graphes', color:'#10b981',
  titre:'Chaînes de Markov',
  desc:"Matrice de transition M, évolution Pₙ₊₁=Pₙ×M, calcul Pₙ=P₀×Mⁿ, état stable π=π×M, convergence vers l'état stationnaire.",
  souschapitres:[
    {
      id:'sc-markov-def', titre:'8.1 Définition et matrice de transition',
      notions:['État Xₙ, espace d\'états','Matrice T=(tᵢⱼ) : tᵢⱼ=P(Xₙ₊₁=j|Xₙ=i)','Chaque ligne somme à 1','Pₙ₊₁=Pₙ·T (vecteur ligne × matrice)'],
      blocs:[
        {
          notion:'🔄 Chaîne de Markov et matrice de transition',
          theoremes:[
            { id:'D-MK1', type:'def', nom:'Chaîne de Markov',
              enonce:"Suite (Xₙ) de variables aléatoires à valeurs dans {e₁,…,eₙ}\n\nPROPRIÉTÉ DE MARKOV :\nP(Xₙ₊₁=j|Xₙ=i,Xₙ₋₁,…,X₀)=P(Xₙ₊₁=j|Xₙ=i)\n→ L'état futur ne dépend que de l'état présent\n\nMATRICE DE TRANSITION T=(tᵢⱼ) :\ntᵢⱼ=P(Xₙ₊₁=eⱼ|Xₙ=eᵢ)\nChaque ligne somme à 1 : Σⱼ tᵢⱼ=1\n(matrice stochastique)\n\nÉVOLUTION :\nPₙ vecteur ligne de distribution à l'étape n\nPₙ₊₁=Pₙ·T  ;  Pₙ=P₀·Tⁿ" },
            { id:'F-MK1', type:'formule', nom:'Loi d\'évolution',
              enonce:"P₀ : distribution initiale (vecteur ligne)\nPₙ = P₀·Tⁿ\n\nCalcul de P₁, P₂, … par multiplication répétée :\nP₁=P₀·T ; P₂=P₁·T ; …\n\nÉtat stable π (distribution stationnaire) :\nπ·T=π  ET  Σᵢ πᵢ=1\n→ Résoudre le système (enlever une équation redondante)\n→ Ajouter Σπᵢ=1\n\nCONVERGENCE :\nSi T est régulière (Tᵏ à entrées >0 pour un k) :\nPₙ → π quelle que soit la distribution initiale P₀",
              remarque:"L'état stationnaire est le vecteur propre gauche de T pour la valeur propre 1." },
          ],
          exercices:[
            { id:'EX-MK1', niveau:'Facile', titre:'Évolution d\'une chaîne',
              enonce:"T=[[0,8;0,2],[0,3;0,7]], P₀=[0,6;0,4]. Calculer P₁ et P₂.",
              correction:"P₁=P₀·T=[0,6×0,8+0,4×0,3 ; 0,6×0,2+0,4×0,7]=[0,60 ; 0,40].\nP₂=P₁·T=[même calcul]=P₁ (fixe ! P₁ est déjà stationnaire ?)\nVérifier : 0,6=0,6×0,8+0,4×0,3=0,48+0,12=0,60 ✓. Oui, P₀ était déjà l'état stationnaire." },
          ]
        },
      ]
    },
    {
      id:'sc-markov-stationnaire', titre:'8.2 État stationnaire et convergence',
      notions:['π·T=π (équation stationnaire)','Σᵢπᵢ=1 (normalisation)','Unicité si T régulière','Tⁿ → M^∞ (toutes lignes égales à π)'],
      blocs:[
        {
          notion:'♾️ État stationnaire et applications',
          theoremes:[
            { id:'T-MK1', type:'thm', nom:'État stationnaire — existence et unicité',
              enonce:"T matrice stochastique RÉGULIÈRE (Tᵏ entièrement positif pour un k) :\n\n1. Il existe un unique état stationnaire π>0\n2. Σπᵢ=1\n3. Pₙ→π pour toute distribution initiale P₀\n4. Tⁿ→M^∞ (chaque ligne = π)\n\nMÉTHODE pour trouver π :\n1. Écrire π·T=π :\n   πᵢ=Σⱼ πⱼ·tⱼᵢ pour chaque i\n2. Supprimer une équation (redondante)\n3. Ajouter Σπᵢ=1\n4. Résoudre le système",
              remarque:"Applications : Google PageRank, biologie (dynamique des populations), météo (soleil/pluie), économie (modèles sectoriels)." },
            { id:'M-MK1', type:'methode', nom:'Calcul de l\'état stationnaire',
              enonce:"Exemple : T=[[0,8;0,2],[0,3;0,7]]\n\nÉQUATION π·T=π :\nπ₁=0,8π₁+0,3π₂  →  0,2π₁=0,3π₂  →  π₁=(3/2)π₂\n\nNORMALISATION :\nπ₁+π₂=1 → (3/2)π₂+π₂=1 → π₂=2/5\n→ π₁=3/5\n\nÉtat stationnaire : π=(3/5 ; 2/5)=(0,6 ; 0,4)\n\nVérification : [0,6;0,4]·T=[0,6×0,8+0,4×0,3 ; 0,6×0,2+0,4×0,7]=[0,6;0,4] ✓" },
          ],
          exercices:[
            { id:'EX-MK2', niveau:'Intermédiaire', titre:'État stationnaire',
              enonce:"T=[[0,6;0,4],[0,1;0,9]]. Trouver l'état stationnaire π.",
              correction:"π₁=0,6π₁+0,1π₂ → 0,4π₁=0,1π₂ → π₂=4π₁.\nπ₁+π₂=1 → 5π₁=1 → π₁=1/5, π₂=4/5.\nπ=(0,2 ; 0,8)." },
            { id:'EX-MK3', niveau:'Difficile', titre:'3 états',
              enonce:"T=[[0,5;0,3;0,2],[0,2;0,6;0,2],[0,1;0,2;0,7]]. Trouver π.",
              correction:"π·T=π :\n0,5π₁+0,2π₂+0,1π₃=π₁ → 0,5π₁=0,2π₂+0,1π₃ (I)\n0,3π₁+0,6π₂+0,2π₃=π₂ → 0,3π₁=0,4π₂−0,2π₃ (II)\n0,2π₁+0,2π₂+0,7π₃=π₃ → 0,2π₁+0,2π₂=0,3π₃ (III)\nπ₁+π₂+π₃=1 (IV)\n\nDe (III) : π₃=(0,2π₁+0,2π₂)/0,3. Substituer dans (I) et (II). Résoudre.\nSolution : π₁≈0,222, π₂≈0,433, π₃≈0,344." },
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
export default function TerminaleExpertesSlugPage() {
  const params = useParams()
  const slug = (params?.slug as string) || 'divisibilite-z'
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
          <Link href="/bac-france/terminale-expertes" style={{ color:'#8b5cf6' }}>
            ← Retour Maths Expertes
          </Link>
        </div>
      </main><Footer/></>
  )

  const idx = NAV_ORDER.indexOf(slug)
  const prevSlug = idx>0 ? NAV_ORDER[idx-1] : null
  const nextSlug = idx<NAV_ORDER.length-1 ? NAV_ORDER[idx+1] : null
  const secColor = SEC_COLORS[slug] || '#8b5cf6'

  const GROUPS = [
    { label:'Section A — Arithmétique', slugs:NAV_ORDER.slice(0,3) },
    { label:'Section B — Complexes (approfondissement)', slugs:NAV_ORDER.slice(3,5) },
    { label:'Section C — Graphes & Matrices', slugs:NAV_ORDER.slice(5) },
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
          <Link href="/bac-france/terminale-expertes" style={{ color:'var(--muted)', textDecoration:'none' }}>
            Maths Expertes
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
                  <span style={{ fontSize:11, background:'rgba(139,92,246,0.15)',
                    color:'#a78bfa', padding:'2px 9px', borderRadius:10 }}>
                    ⭐ Option · 3h/sem · Coef. 2
                  </span>
                </div>
                <h1 style={{ fontSize:'clamp(22px,3vw,36px)', fontWeight:800, marginBottom:10 }}>
                  {chapter.titre}
                </h1>
                <p style={{ color:'var(--text2)', fontSize:14, lineHeight:1.7,
                  maxWidth:620, marginBottom:18 }}>{chapter.desc}</p>
                <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
                  <Link href={`/solve?q=${encodeURIComponent('Explique '+chapter.titre+' Option Maths Expertes France')}`}
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
                    🎯 Simulation Bac
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
                                      <Link href={`/solve?q=${encodeURIComponent('Maths Expertes France — '+ex.enonce)}`}
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
                  <Link href={`/bac-france/terminale-expertes/${prevSlug}`} style={{ textDecoration:'none' }}>
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
                  <Link href={`/bac-france/terminale-expertes/${nextSlug}`} style={{ textDecoration:'none' }}>
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
                  ⭐ Maths Expertes · 8 chapitres
                </div>
                {GROUPS.map(g => (
                  <div key={g.label}>
                    <div style={{ padding:'7px 15px 3px', fontSize:10, color:'var(--muted)',
                      fontWeight:700, textTransform:'uppercase', letterSpacing:'0.1em',
                      background:'rgba(255,255,255,0.02)' }}>{g.label}</div>
                    {g.slugs.map(s => (
                      <Link key={s} href={`/bac-france/terminale-expertes/${s}`} style={{ textDecoration:'none' }}>
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
                  <Link href={`/solve?q=${encodeURIComponent('Explique '+chapter.titre+' Maths Expertes France')}`}
                    className="btn btn-primary" style={{ textAlign:'center', fontSize:12 }}>
                    🤖 Chat IA — {chapter.badge}
                  </Link>
                  <Link href="/examens-france" className="btn btn-secondary"
                    style={{ textAlign:'center', fontSize:12 }}>📋 Sujets Bac France</Link>
                  <Link href="/simulation-france" className="btn btn-secondary"
                    style={{ textAlign:'center', fontSize:12 }}>🎯 Simulation Bac</Link>
                  <Link href="/bac-france/terminale-generale" className="btn btn-secondary"
                    style={{ textAlign:'center', fontSize:12 }}>🎓 Terminale Générale</Link>
                  <Link href="/bac-france/terminale-expertes" className="btn btn-secondary"
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
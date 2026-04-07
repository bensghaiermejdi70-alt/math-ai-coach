'use client'
import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import { useParams } from 'next/navigation'

// Route : /bac-france/terminale-expertes/[slug]

const C = {thm:'#4f6ef7',def:'#06d6a0',formule:'#f59e0b',prop:'#8b5cf6',methode:'#ec4899'}
const L: Record<string,string> = {thm:'Théorème',def:'Définition',formule:'Formule clé',prop:'Propriété',methode:'Méthode'}

const NAV_ORDER = ['divisibilite-z','pgcd-theoremes','nombres-premiers','complexes-formes','polynomes-complexes','theorie-graphes','calcul-matriciel','chaines-markov']
const TITRES: Record<string,string> = {
  'divisibilite-z':    'Divisibilité dans ℤ',
  'pgcd-theoremes':    'PGCD & Théorèmes fondamentaux',
  'nombres-premiers':  'Nombres premiers',
  'complexes-formes':  'Formes trig. & exponentielles',
  'polynomes-complexes':'Équations polynomiales dans ℂ',
  'theorie-graphes':   'Théorie des graphes',
  'calcul-matriciel':  'Calcul matriciel',
  'chaines-markov':    'Chaînes de Markov',
}
const SEC_COLOR: Record<string,string> = {
  'divisibilite-z':'#8b5cf6','pgcd-theoremes':'#8b5cf6','nombres-premiers':'#8b5cf6',
  'complexes-formes':'#4f6ef7','polynomes-complexes':'#4f6ef7',
  'theorie-graphes':'#10b981','calcul-matriciel':'#10b981','chaines-markov':'#10b981',
}

const CHAPITRES: Record<string,{
  ch:string;titre:string;badge:string;desc:string;duree:string;section:string;
  theoremes:{id:string;type:string;nom:string;enonce:string}[];
  exercices:{id:string;niveau:string;titre:string;enonce:string;correction:string}[];
}> = {
  'divisibilite-z': {
    ch:'CH 01',titre:'Divisibilité dans ℤ',badge:'Arithmétique',duree:'~4h',section:'Section A — Arithmétique',
    desc:'Multiples, diviseurs, division euclidienne dans ℤ, congruences et propriétés.',
    theoremes:[
      {id:'D1',type:'def',nom:'Divisibilité dans ℤ',enonce:'b divise a (noté b|a) s\'il existe k ∈ ℤ tel que a = k·b.\nPropriétés : b|a et b|c ⟹ b|(a+c) et b|(a−c) et b|(λa) pour tout λ ∈ ℤ.\nTout entier divise 0. 1 divise tout entier. Si b|a et a|b alors a=±b.'},
      {id:'T1',type:'thm',nom:'Division euclidienne dans ℤ',enonce:'Pour tout a ∈ ℤ et tout b ∈ ℤ* (b ≠ 0), il existe un UNIQUE couple (q, r) ∈ ℤ² tel que :\na = bq + r  avec  0 ≤ r < |b|\nq est le quotient euclidien, r est le reste euclidien.\nb|a ⟺ r = 0.'},
      {id:'D2',type:'def',nom:'Congruences',enonce:'a ≡ b [n] (a congru à b modulo n) si n|(a−b), i.e. a et b ont le même reste dans la division par n.\nPropriétés (si a≡b[n] et c≡d[n]) :\na+c ≡ b+d [n]\na−c ≡ b−d [n]\na×c ≡ b×d [n]\naᵏ ≡ bᵏ [n]  pour tout k ∈ ℕ'},
      {id:'P1',type:'prop',nom:'Critères de divisibilité via congruences',enonce:'Un entier est divisible par :\n• 2 si dernier chiffre pair (≡ 0 [2])\n• 3 si somme des chiffres ≡ 0 [3]\n• 9 si somme des chiffres ≡ 0 [9]\n• 7, 11 : règles spécifiques\n\nExemple : 2026 ≡ 2+0+2+6 = 10 ≡ 1 [9] → non divisible par 9.'},
    ],
    exercices:[
      {id:'EX01',niveau:'Facile',titre:'Congruence',enonce:'Calculer 7³ mod 5.',correction:'7 ≡ 2 [5] → 7³ ≡ 2³ = 8 ≡ 3 [5]. Donc 7³ mod 5 = 3.'},
      {id:'EX02',niveau:'Intermédiaire',titre:'Application',enonce:'Quel est le reste de 3¹⁰⁰ dans la division par 4 ?',correction:'3 ≡ −1 [4] → 3¹⁰⁰ ≡ (−1)¹⁰⁰ = 1 [4]. Reste = 1.'},
    ],
  },
  'pgcd-theoremes': {
    ch:'CH 02',titre:'PGCD & Théorèmes fondamentaux',badge:'Arithmétique',duree:'~5h',section:'Section A — Arithmétique',
    desc:'PGCD, algorithme d\'Euclide, Bézout, Gauss, équations diophantiennes.',
    theoremes:[
      {id:'D1',type:'def',nom:'PGCD',enonce:'Le PGCD (Plus Grand Commun Diviseur) de a et b est le plus grand entier naturel divisant à la fois a et b.\nNotation : PGCD(a,b) ou a∧b.\na et b sont premiers entre eux si PGCD(a,b) = 1.'},
      {id:'M1',type:'methode',nom:'Algorithme d\'Euclide',enonce:'Pour calculer PGCD(a,b) avec a > b > 0 :\n1. Diviser a par b : a = bq₁ + r₁\n2. Si r₁ = 0 : PGCD(a,b) = b. Sinon continuer.\n3. Diviser b par r₁ : b = r₁q₂ + r₂\n4. Répéter jusqu\'au reste nul.\nLe dernier reste non nul est PGCD(a,b).\nExemple : PGCD(48,18) : 48=18×2+12 ; 18=12×1+6 ; 12=6×2+0 → PGCD=6.'},
      {id:'T1',type:'thm',nom:'Théorème de Bézout',enonce:'Pour tous a,b ∈ ℤ non tous nuls, il existe u,v ∈ ℤ tels que :\nau + bv = PGCD(a,b)\n\nCorollaire : a et b sont premiers entre eux ⟺ il existe u,v ∈ ℤ tels que au+bv=1.\nLes coefficients u,v se calculent par l\'algorithme d\'Euclide étendu.'},
      {id:'T2',type:'thm',nom:'Théorème de Gauss',enonce:'Si a|bc et PGCD(a,b)=1, alors a|c.\n\nApplication (cas particulier) : si p premier et p|bc, alors p|b ou p|c.\n\nUtilisation type : pour montrer que a divise c, trouver b coprime avec a tel que a|bc.'},
      {id:'D2',type:'def',nom:'Équations diophantiennes ax + by = c',enonce:'L\'équation ax+by=c (a,b,c ∈ ℤ) admet des solutions entières ⟺ PGCD(a,b)|c.\n\nSi (x₀,y₀) est une solution particulière, les solutions générales sont :\nx = x₀ + (b/d)·k\ny = y₀ − (a/d)·k\npour tout k ∈ ℤ, avec d = PGCD(a,b).'},
    ],
    exercices:[
      {id:'EX01',niveau:'Facile',titre:'Algorithme d\'Euclide',enonce:'Calculer PGCD(252, 105).',correction:'252 = 105×2 + 42 ; 105 = 42×2 + 21 ; 42 = 21×2 + 0 → PGCD = 21.'},
      {id:'EX02',niveau:'Intermédiaire',titre:'Bézout',enonce:'Trouver u,v tels que 7u + 3v = 1.',correction:'Algorithme d\'Euclide étendu : 7 = 3×2+1 → 1 = 7−3×2 → u=1, v=−2. Vérif : 7×1+3×(−2)=7−6=1 ✓'},
    ],
  },
  'nombres-premiers': {
    ch:'CH 03',titre:'Nombres premiers',badge:'Arithmétique',duree:'~4h',section:'Section A — Arithmétique',
    desc:'Définition, crible d\'Ératosthène, décomposition en facteurs premiers, petit théorème de Fermat.',
    theoremes:[
      {id:'D1',type:'def',nom:'Nombre premier',enonce:'Un entier p > 1 est premier s\'il admet exactement deux diviseurs positifs : 1 et lui-même.\nLes nombres premiers : 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, …\nTout entier n > 1 est soit premier, soit composé (a au moins un facteur premier ≤ √n).'},
      {id:'T1',type:'thm',nom:'Décomposition en facteurs premiers',enonce:'Tout entier n > 1 s\'écrit de manière unique (à l\'ordre des facteurs près) comme produit de nombres premiers :\nn = p₁^α₁ × p₂^α₂ × … × pₖ^αₖ\n\nConséquence pour le PGCD et PPCM :\nGCPD prend le min des exposants, PPCM prend le max.\nExemple : 360 = 2³×3²×5 ; 84 = 2²×3×7 → PGCD=2²×3=12 ; PPCM=2³×3²×5×7=2520.'},
      {id:'T2',type:'thm',nom:'Petit théorème de Fermat',enonce:'Si p est premier et si PGCD(a,p) = 1 (a non divisible par p), alors :\naᵖ⁻¹ ≡ 1 (mod p)\n\nÉquivalent : aᵖ ≡ a (mod p) pour tout entier a.\n\nApplication : calculer aⁿ mod p en réduisant n modulo (p−1).\nExemple : 2¹⁰⁰ mod 7. p−1=6 ; 100=6×16+4 → 2¹⁰⁰≡2⁴=16≡2 [7].'},
    ],
    exercices:[
      {id:'EX01',niveau:'Facile',titre:'Décomposition',enonce:'Décomposer 180 en produit de facteurs premiers.',correction:'180 = 2²×3²×5. (180÷2=90 ; 90÷2=45 ; 45÷3=15 ; 15÷3=5 ; 5 premier)'},
      {id:'EX02',niveau:'Intermédiaire',titre:'Fermat',enonce:'Calculer 3⁴⁰ mod 7.',correction:'p=7, p−1=6. 40 = 6×6+4 → 3⁴⁰ ≡ 3⁴ = 81 ≡ 81−11×7=81−77=4 [7]. Résultat : 4.'},
    ],
  },
  'complexes-formes': {
    ch:'CH 04',titre:'Formes trig. & exponentielles',badge:'Complexes',duree:'~4h',section:'Section B — Complexes',
    desc:'Module, argument, formes trigonométrique et exponentielle d\'Euler, De Moivre, racines n-ièmes.',
    theoremes:[
      {id:'F1',type:'formule',nom:'Formule d\'Euler et formes',enonce:'Formule d\'Euler : eⁱᶿ = cosθ + i sinθ\nDéduction :\ncosθ = (eⁱᶿ + e⁻ⁱᶿ)/2\nsinθ = (eⁱᶿ − e⁻ⁱᶿ)/(2i)\n\nForme exponentielle : z = r·eⁱᶿ  (r=|z|, θ=arg z)\nProduit : z₁z₂ = r₁r₂·eⁱ⁽ᶿ¹⁺ᶿ²⁾\nQuotient : z₁/z₂ = (r₁/r₂)·eⁱ⁽ᶿ¹⁻ᶿ²⁾'},
      {id:'T1',type:'thm',nom:'Formule de De Moivre & applications',enonce:'(cosθ + i sinθ)ⁿ = cos(nθ) + i sin(nθ)  pour tout n ∈ ℤ\n\nApplication — linéarisation :\ncos²θ = (1 + cos2θ)/2\nsin²θ = (1 − cos2θ)/2\ncos³θ = (3cosθ + cos3θ)/4\n(utiliser (eⁱᶿ+e⁻ⁱᶿ)ⁿ pour la formule générale)'},
      {id:'F2',type:'formule',nom:'Racines n-ièmes de l\'unité',enonce:'Les n racines n-ièmes de l\'unité (solutions de zⁿ=1) :\nωₖ = eⁱ²ᵏᵖⁱ/ⁿ  pour k=0,1,…,n−1\n\nPropriétés :\n• Forme un polygone régulier à n côtés inscrit dans le cercle unité\n• Somme de toutes les racines = 0 (si n ≥ 2)\n• Produit de toutes les racines = (−1)ⁿ⁺¹\n\nRacines cubiques : 1, j = e^(2iπ/3), j̄ = e^(4iπ/3) avec 1+j+j̄=0 et j³=1.'},
    ],
    exercices:[
      {id:'EX01',niveau:'Facile',titre:'Forme exponentielle',enonce:'Écrire z = −1 + i√3 sous forme exponentielle.',correction:'|z| = √(1+3) = 2. arg(z) = 2π/3 (2ème quadrant, cos=−1/2, sin=√3/2). z = 2e^(2iπ/3).'},
      {id:'EX02',niveau:'Intermédiaire',titre:'Linéarisation',enonce:'Exprimer cos³θ en fonction de cosθ et cos(3θ).',correction:'cos³θ = ((eⁱᶿ+e⁻ⁱᶿ)/2)³ = (e³ⁱᶿ+3eⁱᶿ+3e⁻ⁱᶿ+e⁻³ⁱᶿ)/8 = (cos3θ+3cosθ)/4. Donc cos³θ = (3cosθ+cos3θ)/4.'},
    ],
  },
  'polynomes-complexes': {
    ch:'CH 05',titre:'Équations polynomiales dans ℂ',badge:'Complexes',duree:'~4h',section:'Section B — Complexes',
    desc:'Second degré dans ℂ, factorisation zⁿ−aⁿ, théorème fondamental, relations coefficients-racines.',
    theoremes:[
      {id:'T1',type:'thm',nom:'Second degré dans ℂ (Δ < 0)',enonce:'L\'équation az²+bz+c=0 (Δ=b²−4ac < 0) admet deux racines complexes conjuguées dans ℂ :\nz₁ = (−b + i√|Δ|)/(2a)  et  z₂ = z̄₁ = (−b − i√|Δ|)/(2a)\n\nFactorisation : az²+bz+c = a(z−z₁)(z−z₂).'},
      {id:'F1',type:'formule',nom:'Relations de Viète (coefficients-racines)',enonce:'Pour az²+bz+c=0 de racines z₁, z₂ :\nz₁ + z₂ = −b/a  (somme des racines)\nz₁ × z₂ = c/a  (produit des racines)\n\nUtilisation : si on connaît une racine z₁, calculer z₂ sans résoudre l\'équation.'},
      {id:'T2',type:'thm',nom:'Théorème fondamental de l\'algèbre (admis)',enonce:'Tout polynôme de degré n à coefficients complexes admet exactement n racines dans ℂ (comptées avec multiplicité).\n\nConséquence : si P est de degré n et admet z₁,…,zₙ comme racines, alors :\nP(z) = a(z−z₁)(z−z₂)…(z−zₙ)\n\nFactorisation par (z−a) : si P(a)=0 alors (z−a)|P(z).'},
    ],
    exercices:[
      {id:'EX01',niveau:'Facile',titre:'Second degré dans ℂ',enonce:'Résoudre z² + 2z + 5 = 0 dans ℂ.',correction:'Δ = 4−20 = −16 < 0. z₁ = (−2+4i)/2 = −1+2i. z₂ = −1−2i.'},
      {id:'EX02',niveau:'Intermédiaire',titre:'Relations de Viète',enonce:'z²−6z+10=0. Sans calculer les racines, trouver z₁+z₂ et z₁z₂.',correction:'z₁+z₂ = −(−6)/1 = 6. z₁z₂ = 10/1 = 10.'},
    ],
  },
  'theorie-graphes': {
    ch:'CH 06',titre:'Théorie des graphes',badge:'Graphes',duree:'~4h',section:'Section C — Graphes & Matrices',
    desc:'Vocabulaire, degrés, graphes orientés, chaînes eulériennes, matrice d\'adjacence, graphes probabilistes.',
    theoremes:[
      {id:'D1',type:'def',nom:'Vocabulaire des graphes',enonce:'Graphe G = (S, A) : S ensemble de sommets, A ensemble d\'arêtes (paires de sommets).\n• Degré d(s) : nombre d\'arêtes issues de s\n• Graphe orienté (digraphe) : les arêtes ont un sens (flèches)\n• Graphe complet Kₙ : chaque paire de sommets est reliée\n• Graphe biparti : sommets en deux groupes, arêtes seulement entre groupes\n• Chaîne : suite de sommets reliés par des arêtes\n• Cycle : chaîne fermée'},
      {id:'T1',type:'thm',nom:'Théorème d\'Euler (chaînes eulériennes)',enonce:'Un graphe connexe admet une chaîne eulérienne (passant une fois et une seule par chaque arête) si et seulement si il a exactement 0 ou 2 sommets de degré impair.\n• 0 sommet impair → circuit eulérien (retour au départ)\n• 2 sommets impairs → chaîne eulérienne (de l\'un à l\'autre)\n\nApplication : problème des 7 ponts de Königsberg.'},
      {id:'D2',type:'def',nom:'Matrice d\'adjacence',enonce:'Pour un graphe à n sommets, la matrice d\'adjacence M est une matrice n×n où :\nM[i][j] = 1 si arête de i vers j, 0 sinon (graphe non orienté : matrice symétrique).\n\nPropriété : M^k[i][j] = nombre de chemins de longueur k de i vers j.\n\nUtilisation : calculer M², M³ pour compteur les chemins de longueur 2, 3, etc.'},
    ],
    exercices:[
      {id:'EX01',niveau:'Facile',titre:'Degrés et Euler',enonce:'Un graphe a 4 sommets de degrés 2, 3, 3, 4. Admet-il une chaîne eulérienne ?',correction:'Sommets de degré impair : 2 (degrés 3 et 3). → Le graphe admet une chaîne eulérienne (de l\'un à l\'autre des sommets de degré impair).'},
    ],
  },
  'calcul-matriciel': {
    ch:'CH 07',titre:'Calcul matriciel',badge:'Matrices',duree:'~4h',section:'Section C — Graphes & Matrices',
    desc:'Matrices carrées, addition, multiplication, matrice identité, inverse (ordre 2), puissances Mⁿ.',
    theoremes:[
      {id:'D1',type:'def',nom:'Opérations matricielles',enonce:'Matrices de même dimension : addition terme à terme.\nMultiplication A×B (A est m×p, B est p×n → résultat m×n) :\n(AB)[i][j] = Σₖ A[i][k]×B[k][j]\n\nATTENTION : AB ≠ BA en général (non commutatif) !\nMatrice identité Iₙ : carrée, 1 sur la diagonale, 0 ailleurs. AI = IA = A.'},
      {id:'F1',type:'formule',nom:'Matrice inverse (ordre 2)',enonce:'Pour A = [[a,b],[c,d]], le déterminant est det(A) = ad − bc.\nSi det(A) ≠ 0, A est inversible et :\nA⁻¹ = (1/det(A)) × [[d,−b],[−c,a]]\n\nVérification : A×A⁻¹ = A⁻¹×A = I₂.\nSi det(A) = 0 : A n\'est pas inversible (matrice singulière).'},
      {id:'P1',type:'prop',nom:'Puissances de matrices et applications',enonce:'Mⁿ = M × M × … × M (n fois)\n\nApplications :\n• Suites vectorielles : si Vₙ₊₁ = M×Vₙ alors Vₙ = Mⁿ×V₀\n• Transformations géométriques :\n  Rotation d\'angle θ : [[cosθ, −sinθ],[sinθ, cosθ]]\n  Homothétie de rapport k : k×I₂'},
    ],
    exercices:[
      {id:'EX01',niveau:'Facile',titre:'Multiplication',enonce:'Calculer A×B avec A=[[1,2],[3,4]] et B=[[5,6],[7,8]].',correction:'(AB)[0][0]=1×5+2×7=19 ; [0][1]=1×6+2×8=22 ; [1][0]=3×5+4×7=43 ; [1][1]=3×6+4×8=50. AB=[[19,22],[43,50]].'},
      {id:'EX02',niveau:'Facile',titre:'Inverse',enonce:'Trouver A⁻¹ pour A=[[3,1],[5,2]].',correction:'det(A)=3×2−1×5=1. A⁻¹=(1/1)×[[2,−1],[−5,3]]=[[2,−1],[−5,3]]. Vérif: A×A⁻¹=I₂ ✓'},
    ],
  },
  'chaines-markov': {
    ch:'CH 08',titre:'Chaînes de Markov',badge:'Graphes',duree:'~4h',section:'Section C — Graphes & Matrices',
    desc:'Matrice de transition, évolution Pₙ₊₁=PₙM, état stable π=πM, convergence.',
    theoremes:[
      {id:'D1',type:'def',nom:'Matrice de transition',enonce:'Un graphe probabiliste (chaîne de Markov) modélise un système pouvant se trouver dans différents états.\nLa matrice de transition M est telle que M[i][j] = probabilité de passer de l\'état i à l\'état j.\n• Chaque ligne de M somme à 1 (matrice stochastique)\n• M[i][j] ≥ 0 pour tout i,j'},
      {id:'F1',type:'formule',nom:'Évolution et état stable',enonce:'Si P₀ = (p₁, p₂, …) est la distribution initiale (vecteur ligne), après n étapes :\nPₙ = P₀ × Mⁿ\n\nÉtat stable (distribution stationnaire) π :\nπ = π × M  (π est un vecteur propre gauche pour la valeur propre 1)\nCondition : Σ πᵢ = 1\n\nConvergence : sous certaines conditions (chaîne régulière), Pₙ → π quelle que soit la distribution initiale.'},
    ],
    exercices:[
      {id:'EX01',niveau:'Intermédiaire',titre:'État stable',enonce:'M=[[0,7;0,3],[0,4;0,6]]. Trouver l\'état stable π=(a,b).',correction:'π×M=π : 0,7a+0,4b=a → −0,3a+0,4b=0 → b=0,75a. Avec a+b=1 : a+0,75a=1 → a=4/7, b=3/7. π=(4/7 ; 3/7)≈(0,571 ; 0,429).'},
    ],
  },
}

function TypeBadge({type}:{type:string}) {
  const color=C[type as keyof typeof C]||C.def
  return <span style={{fontSize:11,fontWeight:700,padding:'3px 10px',borderRadius:20,background:`${color}20`,color,border:`1px solid ${color}30`,flexShrink:0}}>{L[type as keyof typeof L]||type}</span>
}

export default function ExpertesChapterPage() {
  const params = useParams()
  const slug = params?.slug as string
  const ch = CHAPITRES[slug]
  const [openEx,setOpenEx] = useState<string|null>(null)
  const secColor = SEC_COLOR[slug]||'#8b5cf6'

  if(!ch) return (
    <><Navbar /><main style={{paddingTop:80,minHeight:'50vh',display:'flex',alignItems:'center',justifyContent:'center'}}>
      <div style={{textAlign:'center'}}><div style={{fontSize:48,marginBottom:16}}>📭</div><h2 style={{marginBottom:12}}>Chapitre non trouvé</h2><Link href="/bac-france/terminale-expertes" style={{color:'#a78bfa'}}>← Retour Maths Expertes</Link></div>
    </main><Footer /></>
  )

  const idx = NAV_ORDER.indexOf(slug)
  const prevSlug = idx>0?NAV_ORDER[idx-1]:null
  const nextSlug = idx<NAV_ORDER.length-1?NAV_ORDER[idx+1]:null

  return (
    <>
      <Navbar />
      <main style={{position:'relative',zIndex:1,paddingTop:80}}>
        <div style={{borderBottom:'1px solid var(--border)',padding:'14px clamp(20px,5vw,60px)',display:'flex',gap:8,fontSize:13,color:'var(--muted)',alignItems:'center',flexWrap:'wrap'}}>
          <Link href="/bac-france" style={{color:'var(--muted)',textDecoration:'none'}}>Bac France</Link><span>›</span>
          <Link href="/bac-france/terminale-expertes" style={{color:'var(--muted)',textDecoration:'none'}}>Maths Expertes</Link><span>›</span>
          <span style={{color:secColor,fontWeight:600}}>{ch.ch} — {ch.titre}</span>
        </div>
        <div className="container" style={{paddingTop:40,paddingBottom:80}}>
          <div style={{display:'grid',gridTemplateColumns:'1fr 275px',gap:32,alignItems:'start'}}>
            <div>
              <div style={{marginBottom:32}}>
                <div style={{display:'flex',gap:8,marginBottom:12,flexWrap:'wrap'}}>
                  <span style={{fontFamily:'var(--font-mono)',fontSize:12,background:'var(--surface2)',color:'var(--muted)',padding:'3px 10px',borderRadius:8}}>Expertes · {ch.ch}</span>
                  <span style={{fontSize:12,background:`${secColor}20`,color:secColor,padding:'3px 10px',borderRadius:12,fontWeight:600}}>{ch.badge}</span>
                </div>
                <h1 style={{fontSize:'clamp(22px,3.5vw,36px)',marginBottom:8}}>{ch.titre}</h1>
                <div style={{fontSize:12,color:secColor,marginBottom:8}}>📂 {ch.section}</div>
                <p style={{color:'var(--text2)',fontSize:14,lineHeight:1.65,marginBottom:14,maxWidth:640}}>{ch.desc}</p>
                <div style={{display:'flex',gap:16,fontSize:12,color:'var(--muted)',flexWrap:'wrap'}}>
                  <span>📊 {ch.theoremes.length} théorèmes</span><span>·</span><span>📝 {ch.exercices.length} exercices</span><span>·</span><span>⏱ {ch.duree}</span>
                </div>
              </div>
              <div style={{display:'flex',gap:8,flexWrap:'wrap',marginBottom:24,padding:'10px 14px',background:'var(--surface)',borderRadius:12,border:'1px solid var(--border)'}}>
                <span style={{fontSize:12,color:'var(--muted)',marginRight:4,alignSelf:'center'}}>Légende :</span>
                {Object.entries(L).map(([k,v])=><span key={k} style={{fontSize:11,padding:'2px 10px',borderRadius:20,background:`${C[k as keyof typeof C]}18`,color:C[k as keyof typeof C],border:`1px solid ${C[k as keyof typeof C]}25`,fontWeight:600}}>{v}</span>)}
              </div>
              <div style={{marginBottom:44}}>
                <h2 style={{fontSize:20,marginBottom:18}}>📐 Cours — Définitions & Théorèmes</h2>
                <div style={{display:'flex',flexDirection:'column',gap:13}}>
                  {ch.theoremes.map(t=>{const color=C[t.type as keyof typeof C]||C.def; return(
                    <div key={t.id} style={{borderLeft:`3px solid ${color}`,background:`${color}07`,borderRadius:'0 12px 12px 0',padding:'15px 20px',border:`1px solid ${color}18`}}>
                      <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:8,gap:10,flexWrap:'wrap'}}>
                        <div style={{fontWeight:700,fontSize:14,color:'var(--text)'}}>{t.nom}</div>
                        <TypeBadge type={t.type}/>
                      </div>
                      <div style={{fontSize:13,color:'var(--text2)',lineHeight:1.8,whiteSpace:'pre-line',fontFamily:(t.type==='formule'||t.type==='methode')?'var(--font-mono)':'inherit'}}>{t.enonce}</div>
                    </div>
                  )})}
                </div>
              </div>
              <div style={{marginBottom:44}}>
                <h2 style={{fontSize:20,marginBottom:18}}>📝 Exercices</h2>
                <div style={{display:'flex',flexDirection:'column',gap:11}}>
                  {ch.exercices.map(ex=>(
                    <div key={ex.id} style={{background:'var(--surface)',border:'1px solid var(--border)',borderRadius:14,overflow:'hidden'}}>
                      <div style={{padding:'15px 20px'}}>
                        <div style={{display:'flex',gap:8,alignItems:'center',marginBottom:8,flexWrap:'wrap'}}>
                          <span style={{fontFamily:'var(--font-mono)',fontSize:11,color:'var(--muted)',background:'var(--surface2)',padding:'2px 8px',borderRadius:6}}>{ex.id}</span>
                          <span style={{fontSize:11,padding:'2px 8px',borderRadius:10,fontWeight:600,background:ex.niveau==='Facile'?'rgba(6,214,160,0.15)':'rgba(245,158,11,0.15)',color:ex.niveau==='Facile'?'#06d6a0':'#f59e0b'}}>{ex.niveau}</span>
                          <span style={{fontWeight:600,fontSize:14,color:'var(--text)'}}>{ex.titre}</span>
                        </div>
                        <p style={{fontSize:13,color:'var(--text2)',margin:0,lineHeight:1.6,whiteSpace:'pre-line'}}>{ex.enonce}</p>
                      </div>
                      <div style={{borderTop:'1px solid var(--border)',padding:'10px 20px',display:'flex',gap:10}}>
                        <Link href={`/chat?q=${encodeURIComponent('Maths Expertes, '+ch.titre+' — '+ex.enonce)}`} className="btn btn-primary" style={{fontSize:12,padding:'6px 14px'}}>🧮 Résoudre avec IA</Link>
                        <button onClick={()=>setOpenEx(openEx===ex.id?null:ex.id)} style={{fontSize:12,padding:'6px 14px',borderRadius:8,border:'1px solid var(--border)',background:'transparent',color:'var(--text2)',cursor:'pointer',fontFamily:'inherit'}}>📋 {openEx===ex.id?'Masquer':'Correction'}</button>
                      </div>
                      {openEx===ex.id&&(<div style={{padding:'13px 20px',borderTop:'1px solid var(--border)',background:`${secColor}06`}}>
                        <div style={{fontSize:11,color:secColor,fontWeight:700,marginBottom:5}}>✅ Correction</div>
                        <div style={{fontSize:13,color:'var(--text2)',lineHeight:1.75,whiteSpace:'pre-line'}}>{ex.correction}</div>
                      </div>)}
                    </div>
                  ))}
                </div>
              </div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,borderTop:'1px solid var(--border)',paddingTop:22}}>
                {prevSlug?(<Link href={`/bac-france/terminale-expertes/${prevSlug}`} style={{textDecoration:'none'}}><div className="card" style={{padding:'13px 16px'}}><div style={{fontSize:11,color:'var(--muted)',marginBottom:3}}>← Précédent</div><div style={{fontWeight:700,fontSize:13}}>{TITRES[prevSlug]}</div></div></Link>):<div/>}
                {nextSlug?(<Link href={`/bac-france/terminale-expertes/${nextSlug}`} style={{textDecoration:'none'}}><div className="card" style={{padding:'13px 16px',textAlign:'right'}}><div style={{fontSize:11,color:'var(--muted)',marginBottom:3}}>Suivant →</div><div style={{fontWeight:700,fontSize:13}}>{TITRES[nextSlug]}</div></div></Link>):<div/>}
              </div>
            </div>
            <aside style={{position:'sticky',top:88}}>
              <div style={{background:'var(--surface)',border:'1px solid var(--border)',borderRadius:16,overflow:'hidden',marginBottom:14}}>
                <div style={{padding:'11px 15px',borderBottom:'1px solid var(--border)',fontSize:11,color:'var(--muted)',fontWeight:700,textTransform:'uppercase',letterSpacing:'0.08em'}}>⭐ Expertes — 8 chapitres</div>
                {NAV_ORDER.map((s,i)=>(<Link key={s} href={`/bac-france/terminale-expertes/${s}`} style={{textDecoration:'none'}}>
                  <div style={{padding:'9px 15px',borderBottom:i<NAV_ORDER.length-1?'1px solid var(--border)':'none',background:s===slug?`${SEC_COLOR[s]}12`:'transparent',borderLeft:s===slug?`3px solid ${SEC_COLOR[s]}`:'3px solid transparent',transition:'all 0.15s',cursor:'pointer'}}>
                    <div style={{fontSize:10,color:'var(--muted)',marginBottom:1,fontFamily:'var(--font-mono)'}}>CH {String(i+1).padStart(2,'0')}</div>
                    <div style={{fontSize:11,fontWeight:s===slug?700:400,color:s===slug?SEC_COLOR[s]:'var(--text2)'}}>{TITRES[s]}</div>
                  </div>
                </Link>))}
              </div>
              <div style={{background:'var(--surface)',border:'1px solid var(--border)',borderRadius:13,padding:'14px'}}>
                <div style={{fontSize:11,color:'var(--muted)',fontWeight:700,textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:10}}>Actions</div>
                <div style={{display:'flex',flexDirection:'column',gap:7}}>
                  <Link href={`/chat?q=${encodeURIComponent('Explique-moi '+ch.titre+' Option Maths Expertes')}`} className="btn btn-primary" style={{textAlign:'center',fontSize:12}}>🤖 Chat IA</Link>
                  <Link href="/bac-france/terminale-generale" className="btn btn-secondary" style={{textAlign:'center',fontSize:12}}>🎓 Terminale Générale</Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
'use client'
import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

type TType = 'Théorème' | 'Définition' | 'Formule clé' | 'Propriété' | 'Corollaire'
interface Thm { id: string; type: TType; label: string; enonce: string; remarque?: string }
interface Section { titre: string; theoremes: Thm[] }
interface Ch { slug: string; num: string; titre: string; badge: string; tome: 1|2; desc: string; color: string; icon: string; sections: Section[] }

const TYPE_STYLE: Record<TType, { bg: string; color: string; border: string }> = {
  'Théorème':    { bg: 'rgba(124,58,237,0.12)',  color: '#a78bfa', border: 'rgba(124,58,237,0.4)' },
  'Définition':  { bg: 'rgba(79,110,247,0.12)',   color: '#4f6ef7', border: 'rgba(79,110,247,0.4)' },
  'Formule clé': { bg: 'rgba(245,200,66,0.12)',   color: '#f5c842', border: 'rgba(245,200,66,0.4)' },
  'Propriété':   { bg: 'rgba(6,214,160,0.12)',    color: '#06d6a0', border: 'rgba(6,214,160,0.4)'  },
  'Corollaire':  { bg: 'rgba(249,115,22,0.12)',   color: '#f97316', border: 'rgba(249,115,22,0.4)' },
}

// ═══════════════════════════════════════════════════════════════════
// DONNÉES — Mathématiques Section Informatique · Programme CNP officiel
// Source : tadris.tn · bac-done.com/sections/mathematiques/documents/65
// Tome I (5 ch.) · Tome II (3 ch.)
// ═══════════════════════════════════════════════════════════════════
const CHAPITRES: Ch[] = [

// ── TOME I — ANALYSE ────────────────────────────────────────────────
{
  slug:'suites', num:'CH 01', titre:'Suites réelles', badge:'Analyse', tome:1,
  color:'#6366f1', icon:'Σ',
  desc:'Suites arithmétiques, géométriques, monotonie, convergence, raisonnement par récurrence.',
  sections:[
  { titre:'I. Suites arithmétiques et géométriques', theoremes:[
    { id:'s1', type:'Définition', label:'Suite arithmétique de raison r',
      enonce:'(uₙ) est arithmétique de raison r si uₙ₊₁ = uₙ + r pour tout n.\n\nTerme général : uₙ = u₀ + n·r\nSomme des (n+1) premiers termes : Sₙ = (n+1)·(u₀+uₙ)/2',
      remarque:'Si r > 0, la suite est croissante. Si r < 0, elle est décroissante.' },
    { id:'s2', type:'Définition', label:'Suite géométrique de raison q',
      enonce:'(uₙ) est géométrique de raison q (q≠0) si uₙ₊₁ = q·uₙ.\n\nTerme général : uₙ = u₀·qⁿ\nSomme (q≠1) : Sₙ = u₀·(1−qⁿ⁺¹)/(1−q)' },
    { id:'s3', type:'Formule clé', label:'Sommes usuelles',
      enonce:'Σₖ₌₁ⁿ k = n(n+1)/2\nΣₖ₌₁ⁿ k² = n(n+1)(2n+1)/6\nΣₖ₌₀ⁿ qᵏ = (1−qⁿ⁺¹)/(1−q)  (q≠1)' },
  ]},
  { titre:'II. Convergence et monotonie', theoremes:[
    { id:'s4', type:'Théorème', label:'Suite monotone bornée',
      enonce:'• Toute suite croissante et majorée est convergente.\n• Toute suite décroissante et minorée est convergente.',
      remarque:'La limite est alors le supremum (resp. infimum) de la suite.' },
    { id:'s5', type:'Théorème', label:'Suite récurrente — point fixe',
      enonce:'Si uₙ₊₁ = f(uₙ) converge vers ℓ et f est continue en ℓ, alors f(ℓ) = ℓ.\nMéthode : résoudre f(x) = x pour trouver les candidats à la limite.' },
    { id:'s6', type:'Théorème', label:'Théorème des gendarmes',
      enonce:'Si vₙ ≤ uₙ ≤ wₙ pour tout n ≥ N₀ et lim vₙ = lim wₙ = ℓ,\nalors lim uₙ = ℓ.' },
  ]},
  { titre:'III. Raisonnement par récurrence', theoremes:[
    { id:'s7', type:'Propriété', label:'Principe de récurrence',
      enonce:'Pour démontrer P(n) pour tout n ≥ n₀ :\n1. Initialisation : vérifier P(n₀) est vraie.\n2. Hérédité : supposer P(n) vraie (H.R.), démontrer P(n+1).\nConclusion : P(n) vraie pour tout n ≥ n₀.',
      remarque:'Toujours préciser où l\'hypothèse de récurrence est utilisée dans la démonstration.' },
  ]},
]},

{
  slug:'limite-continuite', num:'CH 02', titre:'Limite et continuité', badge:'Analyse', tome:1,
  color:'#7c3aed', icon:'∞',
  desc:'Calcul de limites, formes indéterminées, TVI, asymptotes, prolongement par continuité.',
  sections:[
  { titre:'I. Limites de fonctions', theoremes:[
    { id:'lc1', type:'Définition', label:'Limite en un point',
      enonce:'lim(x→a) f(x) = ℓ ⟺ ∀ε>0, ∃δ>0, 0<|x−a|<δ ⟹ |f(x)−ℓ|<ε.',
      remarque:'f(a) peut ne pas être défini. La valeur en a est sans importance pour la limite.' },
    { id:'lc2', type:'Théorème', label:'Opérations sur les limites',
      enonce:'Si lim f = ℓ et lim g = m (en a) :\n• lim(f±g) = ℓ±m\n• lim(f·g) = ℓ·m\n• lim(f/g) = ℓ/m  (si m≠0)\n• lim f(g(x)) = f(m)  (si f continue en m)',
      remarque:'Formes indéterminées : ∞−∞, 0/0, ∞/∞, 0·∞ → lever l\'indétermination.' },
    { id:'lc3', type:'Théorème', label:'Théorème des gendarmes',
      enonce:'g(x) ≤ f(x) ≤ h(x) au voisinage de a, lim g = lim h = ℓ ⟹ lim f = ℓ.' },
    { id:'lc4', type:'Formule clé', label:'Limites fondamentales',
      enonce:'• lim(x→0) sin(x)/x = 1\n• lim(x→0) (eˣ−1)/x = 1\n• lim(x→0) ln(1+x)/x = 1\nCroissances comparées (x→+∞) :\n• eˣ/xⁿ → +∞  pour tout n ∈ ℕ\n• ln(x)/xᵅ → 0  pour α>0\n• xⁿ·e⁻ˣ → 0  pour tout n ∈ ℕ' },
  ]},
  { titre:'II. Continuité', theoremes:[
    { id:'lc5', type:'Définition', label:'Continuité en un point',
      enonce:'f est continue en a si :\n1. f est définie en a\n2. lim(x→a) f(x) = f(a)' },
    { id:'lc6', type:'Théorème', label:'Théorème des Valeurs Intermédiaires (TVI)',
      enonce:'f continue sur [a,b], f(a)·f(b) < 0\n⟹ ∃c ∈ ]a,b[ tel que f(c) = 0.',
      remarque:'Si f est strictement monotone, c est unique. Application : existence et unicité d\'une racine.' },
    { id:'lc7', type:'Propriété', label:'Prolongement par continuité',
      enonce:'Si lim(x→a) f(x) = ℓ ∈ ℝ, on prolonge f par continuité en posant f̃(a) = ℓ.\nExemple : f(x) = sin(x)/x → f̃(0) = 1' },
  ]},
  { titre:'III. Asymptotes et branches infinies', theoremes:[
    { id:'lc8', type:'Définition', label:'Types d\'asymptotes',
      enonce:'• Asymptote horizontale y = ℓ : lim(x→±∞) f(x) = ℓ\n• Asymptote verticale x = a : lim(x→a) |f(x)| = +∞\n• Asymptote oblique y = ax+b : lim(x→+∞) [f(x)−(ax+b)] = 0\n  avec a = lim f(x)/x  et  b = lim [f(x)−ax]' },
  ]},
]},

{
  slug:'derivabilite', num:'CH 03', titre:'Dérivabilité & étude de fonctions', badge:'Analyse', tome:1,
  color:'#a855f7', icon:"f'",
  desc:'Nombre dérivé, dérivées usuelles, TAF, extrema, convexité, tracé de courbes.',
  sections:[
  { titre:'I. Dérivée en un point', theoremes:[
    { id:'d1', type:'Définition', label:'Nombre dérivé',
      enonce:"f'(a) = lim(h→0) [f(a+h) − f(a)] / h  si cette limite existe.\nInterprétation géométrique : pente de la tangente à la courbe en a.",
      remarque:'Si f est dérivable en a, elle est continue en a. La réciproque est fausse (ex : |x| en 0).' },
  ]},
  { titre:'II. Dérivées usuelles et règles', theoremes:[
    { id:'d2', type:'Formule clé', label:'Dérivées de base',
      enonce:'• (xⁿ)\' = nxⁿ⁻¹\n• (eˣ)\' = eˣ\n• (ln x)\' = 1/x  (x>0)\n• (sin x)\' = cos x\n• (cos x)\' = −sin x\n• (arctan x)\' = 1/(1+x²)\n• (arcsin x)\' = 1/√(1−x²)\n• (√x)\' = 1/(2√x)' },
    { id:'d3', type:'Formule clé', label:'Règles de calcul',
      enonce:'(u+v)\' = u\'+v\'            (ku)\' = ku\'\n(uv)\' = u\'v + uv\'          (u/v)\' = (u\'v−uv\')/v²\n(uⁿ)\' = n·u^(n−1)·u\'      (eᵘ)\' = u\'·eᵘ\n(ln u)\' = u\'/u             (f∘g)\' = (f\'∘g)·g\'' },
    { id:'d4', type:'Théorème', label:'Théorème de Rolle',
      enonce:'f continue sur [a,b], dérivable sur ]a,b[ et f(a) = f(b)\n⟹ ∃ c ∈ ]a,b[ tel que f\'(c) = 0.' },
    { id:'d5', type:'Théorème', label:'Théorème des Accroissements Finis (TAF)',
      enonce:'f continue sur [a,b] et dérivable sur ]a,b[\n⟹ ∃ c ∈ ]a,b[ tel que f\'(c) = [f(b)−f(a)]/(b−a).',
      remarque:'Corollaire : si |f\'| ≤ M sur ]a,b[, alors |f(b)−f(a)| ≤ M|b−a|.' },
  ]},
  { titre:'III. Étude de fonctions', theoremes:[
    { id:'d6', type:'Propriété', label:'Signe de f\' et monotonie',
      enonce:'• f\' > 0 sur I ⟺ f strictement croissante sur I\n• f\' < 0 sur I ⟺ f strictement décroissante sur I\n• f\' = 0 sur I ⟺ f constante sur I' },
    { id:'d7', type:'Propriété', label:'Extrema locaux',
      enonce:'Si f\'(a) = 0 et f\' change de signe en a :\n• f\' : + puis − → maximum local en a\n• f\' : − puis + → minimum local en a' },
    { id:'d8', type:'Propriété', label:'Convexité et point d\'inflexion',
      enonce:'f\'\' ≥ 0 sur I ⟺ f convexe (courbe au-dessus de ses tangentes).\nf\'\' ≤ 0 sur I ⟺ f concave.\nPoint d\'inflexion en c : f\'\' change de signe en c.' },
  ]},
]},

{
  slug:'log-exp', num:'CH 04', titre:'Fonctions logarithme et exponentielle', badge:'Analyse', tome:1,
  color:'#0891b2', icon:'ln',
  desc:'Logarithme népérien, exponentielle naturelle, propriétés, limites, croissances comparées.',
  sections:[
  { titre:'I. Logarithme népérien', theoremes:[
    { id:'le1', type:'Définition', label:'Fonction ln',
      enonce:'ln : ]0,+∞[ → ℝ, définie par ln(x) = ∫₁ˣ (1/t)dt.\nln est l\'unique primitive de 1/x s\'annulant en 1.\n\nPropriétés algébriques :\n• ln(ab) = ln a + ln b\n• ln(a/b) = ln a − ln b\n• ln(aⁿ) = n·ln a\n• ln(1) = 0  ;  ln(e) = 1  ;  ln(e^a) = a' },
    { id:'le2', type:'Formule clé', label:'Dérivée, variations et limites de ln',
      enonce:'(ln x)\' = 1/x sur ]0,+∞[\n(ln u)\' = u\'/u  (si u > 0)\n\nlim(x→0⁺) ln x = −∞\nlim(x→+∞) ln x = +∞\nlim(x→0) ln(1+x)/x = 1\nlim(x→0⁺) x·ln(x) = 0\nlim(x→+∞) ln(x)/xᵅ = 0  pour α>0' },
  ]},
  { titre:'II. Fonction exponentielle', theoremes:[
    { id:'le3', type:'Définition', label:'Fonction exp = ln⁻¹',
      enonce:'exp = réciproque de ln : ℝ → ]0,+∞[\ne^x = y ⟺ x = ln(y)\ne⁰ = 1  ;  e¹ = e ≈ 2,718\n\nPropriétés :\n• e^(a+b) = eᵃ·eᵇ\n• e^(−x) = 1/eˣ\n• (eᵃ)ⁿ = e^(na)' },
    { id:'le4', type:'Formule clé', label:'Dérivée, variations et limites de exp',
      enonce:'(eˣ)\' = eˣ  ;  (eᵘ)\' = u\'·eᵘ\n\neˣ > 0 pour tout x, strictement croissante\nlim(x→−∞) eˣ = 0\nlim(x→+∞) eˣ = +∞\nlim(x→0) (eˣ−1)/x = 1' },
    { id:'le5', type:'Théorème', label:'Croissances comparées',
      enonce:'Quand x → +∞ :\n• eˣ/xⁿ → +∞  (eˣ domine xⁿ)\n• xⁿ/ln(x) → +∞  (xⁿ domine ln x)\nQuand x → 0⁺ :\n• xᵅ·|ln x| → 0  pour α>0',
      remarque:'L\'exponentielle "écrase" toute puissance, qui "écrase" le logarithme.' },
  ]},
]},

{
  slug:'calcul-integral', num:'CH 05', titre:'Calcul intégral & primitives', badge:'Analyse', tome:1,
  color:'#059669', icon:'∫',
  desc:'Table des primitives, IPP, théorème fondamental, calcul d\'aires et volumes.',
  sections:[
  { titre:'I. Primitives', theoremes:[
    { id:'ci1', type:'Définition', label:'Primitive d\'une fonction',
      enonce:'F est une primitive de f sur I si F\'(x) = f(x) pour tout x ∈ I.\nToute primitive de f s\'écrit F(x) + C  (C ∈ ℝ constante).',
      remarque:'Si f est continue sur I, elle admet des primitives sur I.' },
    { id:'ci2', type:'Formule clé', label:'Primitives usuelles',
      enonce:'∫ xⁿ dx = xⁿ⁺¹/(n+1)    (n ≠ −1)\n∫ 1/x dx = ln|x|\n∫ eˣ dx = eˣ\n∫ sin x dx = −cos x\n∫ cos x dx = sin x\n∫ u\'/u dx = ln|u|\n∫ u\'·eᵘ dx = eᵘ\n∫ u\'·uⁿ dx = uⁿ⁺¹/(n+1)  (n≠−1)' },
  ]},
  { titre:'II. Intégrale définie', theoremes:[
    { id:'ci3', type:'Théorème', label:'Théorème fondamental de l\'analyse',
      enonce:'Si f est continue sur [a,b] et F une primitive de f :\n∫ₐᵇ f(x)dx = F(b) − F(a)\n\nPropriétés :\n• Linéarité : ∫(αf+βg) = α∫f + β∫g\n• Chasles : ∫ₐᵇ f = ∫ₐᶜ f + ∫ᶜᵇ f\n• f ≥ 0 sur [a,b] ⟹ ∫ₐᵇ f ≥ 0' },
    { id:'ci4', type:'Théorème', label:'Intégration par parties (IPP)',
      enonce:'∫ₐᵇ u\'(x)·v(x) dx = [u(x)·v(x)]ₐᵇ − ∫ₐᵇ u(x)·v\'(x) dx',
      remarque:'Choisir u\' et v selon LIATE : Logarithme, Inverse, Algèbre, Trigonométrique, Exponentielle. Exemple : ∫ ln(x)dx, ∫ xeˣdx.' },
    { id:'ci5', type:'Formule clé', label:'Calcul d\'aires',
      enonce:'Aire entre f et l\'axe Ox sur [a,b] : A = ∫ₐᵇ |f(x)| dx\n\nAire entre f et g (f ≥ g sur [a,b]) :\nA = ∫ₐᵇ (f(x) − g(x)) dx' },
  ]},
]},

// ── TOME II — ALGÈBRE & PROBABILITÉS ────────────────────────────────
{
  slug:'complexes', num:'CH 06', titre:'Nombres complexes', badge:'Algèbre', tome:2,
  color:'#8b5cf6', icon:'ℂ',
  desc:'Forme algébrique, trigonométrique, exponentielle, Euler, De Moivre, racines n-ièmes, applications géométriques.',
  sections:[
  { titre:'I. Formes des complexes', theoremes:[
    { id:'c1', type:'Définition', label:'Nombre complexe — forme algébrique',
      enonce:'z = a + ib  avec a,b ∈ ℝ et i² = −1\n• Partie réelle : Re(z) = a\n• Partie imaginaire : Im(z) = b\n• Conjugué : z̄ = a − ib\n• Module : |z| = √(a²+b²)\n• z·z̄ = |z|²  ;  Re(z) = (z+z̄)/2  ;  Im(z) = (z−z̄)/(2i)' },
    { id:'c2', type:'Définition', label:'Forme trigonométrique',
      enonce:'z = r(cosθ + i sinθ)  avec r = |z| ≥ 0 et θ = arg(z) ∈ [−π,π[\n\nRègle des arguments :\n• arg(z₁z₂) ≡ arg(z₁) + arg(z₂)  [2π]\n• arg(z₁/z₂) ≡ arg(z₁) − arg(z₂)  [2π]' },
  ]},
  { titre:'II. Formules fondamentales', theoremes:[
    { id:'c3', type:'Théorème', label:'Formule d\'Euler',
      enonce:'eⁱθ = cosθ + i sinθ  pour tout θ ∈ ℝ\n\nConséquences :\n• cosθ = (eⁱθ + e⁻ⁱθ)/2\n• sinθ = (eⁱθ − e⁻ⁱθ)/(2i)\n• |eⁱθ| = 1\n• eⁱπ + 1 = 0  (identité d\'Euler)',
      remarque:'La forme exponentielle z = reⁱθ rend le produit et la division très simples.' },
    { id:'c4', type:'Théorème', label:'Formule de De Moivre',
      enonce:'(cosθ + i sinθ)ⁿ = cos(nθ) + i sin(nθ)\nou : (eⁱθ)ⁿ = eⁱⁿθ',
      remarque:'Permet de linéariser cosⁿθ et sinⁿθ, et de calculer des sommes trigonométriques.' },
    { id:'c5', type:'Propriété', label:'Racines n-ièmes de l\'unité',
      enonce:'Les n racines n-ièmes de ρeⁱφ sont :\nzₖ = ρ^(1/n)·eⁱ⁽φ⁺²ᵏπ⁾/ⁿ,  k = 0, 1, …, n−1\n\nGeométrie : n points régulièrement espacés sur le cercle de rayon ρ^(1/n).',
      remarque:'Les racines n-ièmes de 1 forment un sous-groupe multiplicatif de ℂ*.' },
  ]},
  { titre:'III. Applications géométriques', theoremes:[
    { id:'c6', type:'Propriété', label:'Transformations du plan complexe',
      enonce:'Soit M d\'affixe z et M\' d\'affixe z\'.\n\nTranslation de vecteur w̄ : z\' = z + w\nHomothétie (centre ω, rapport k ∈ ℝ) : z\'−ω = k(z−ω)\nRotation (centre ω, angle θ) : z\'−ω = eⁱθ(z−ω)\nSimilitude directe : z\' = az + b  (a∈ℂ*, b∈ℂ)' },
    { id:'c7', type:'Formule clé', label:'Distance, milieu, alignement',
      enonce:'|z_B − z_A| = AB (distance)\nMilieu de [AB] : affixe = (z_A+z_B)/2\n\nA, B, C alignés ⟺ (z_C−z_A)/(z_B−z_A) ∈ ℝ\nAB ⊥ AC ⟺ arg((z_C−z_A)/(z_B−z_A)) ≡ ±π/2  [2π]' },
  ]},
]},

{
  slug:'probabilites', num:'CH 07', titre:'Probabilités sur un ensemble fini', badge:'Probabilités', tome:2,
  color:'#d97706', icon:'P()',
  desc:'Probabilité conditionnelle, indépendance, probabilités totales, Bayes, variable aléatoire, loi binomiale.',
  sections:[
  { titre:'I. Probabilité conditionnelle et indépendance', theoremes:[
    { id:'p1', type:'Définition', label:'Probabilité conditionnelle',
      enonce:'P(A|B) = P(A∩B) / P(B)  si P(B) > 0\n"Probabilité de A sachant que B est réalisé."',
      remarque:'P(A∩B) = P(A|B)·P(B) = P(B|A)·P(A)  → règle du produit.' },
    { id:'p2', type:'Définition', label:'Événements indépendants',
      enonce:'A et B sont indépendants si :\nP(A∩B) = P(A)·P(B)\nou de façon équivalente : P(A|B) = P(A).',
      remarque:'L\'indépendance est une propriété symétrique. A et B indépendants ⟺ Ā et B indépendants.' },
  ]},
  { titre:'II. Probabilités totales et formule de Bayes', theoremes:[
    { id:'p3', type:'Théorème', label:'Formule des probabilités totales',
      enonce:'(B₁, …, Bₙ) partition de Ω (événements 2 à 2 incompatibles, union = Ω) :\nP(A) = Σᵢ P(Bᵢ)·P(A|Bᵢ)',
      remarque:'Utiliser un arbre de probabilités pour organiser les calculs.' },
    { id:'p4', type:'Théorème', label:'Formule de Bayes',
      enonce:'P(Bₖ|A) = P(Bₖ)·P(A|Bₖ) / Σᵢ P(Bᵢ)·P(A|Bᵢ)',
      remarque:'Permet de "remonter" dans l\'arbre : on connaît P(A|Bᵢ), on cherche P(Bᵢ|A).' },
  ]},
  { titre:'III. Variable aléatoire et loi binomiale', theoremes:[
    { id:'p5', type:'Définition', label:'Variable aléatoire discrète',
      enonce:'X prend les valeurs x₁,…,xₙ avec probabilités p₁,…,pₙ (Σpᵢ = 1).\n\nEspérance : E(X) = Σxᵢpᵢ\nVariance : V(X) = E(X²) − [E(X)]²\nÉcart-type : σ(X) = √V(X)' },
    { id:'p6', type:'Formule clé', label:'Loi binomiale B(n,p)',
      enonce:'X ~ B(n,p) : nb de succès en n épreuves de Bernoulli indépendantes, chacune de probabilité p.\n\nP(X=k) = C(n,k)·pᵏ·(1−p)ⁿ⁻ᵏ,  k = 0, 1, …, n\nE(X) = np\nV(X) = np(1−p)',
      remarque:'C(n,k) = n! / (k!·(n−k)!)  Attention : C(n,0) = C(n,n) = 1.' },
    { id:'p7', type:'Corollaire', label:'Loi géométrique',
      enonce:'X = rang du premier succès dans une suite d\'épreuves de Bernoulli de paramètre p.\nP(X=k) = (1−p)^(k−1)·p,  k ≥ 1\nE(X) = 1/p' },
  ]},
]},

{
  slug:'statistiques', num:'CH 08', titre:'Statistiques', badge:'Statistiques', tome:2,
  color:'#0891b2', icon:'σ',
  desc:'Indicateurs de position et dispersion, médiane, quartiles, série à deux variables, régression.',
  sections:[
  { titre:'I. Indicateurs de position', theoremes:[
    { id:'st1', type:'Formule clé', label:'Moyenne, médiane, mode',
      enonce:'Moyenne : x̄ = (Σnᵢxᵢ) / N  (N = effectif total)\nMédiane : valeur qui partage la distribution en deux parties égales.\nMode : valeur (ou classe) de plus grande fréquence.',
      remarque:'Pour une série groupée par classes, interpoler linéairement pour la médiane.' },
  ]},
  { titre:'II. Indicateurs de dispersion', theoremes:[
    { id:'st2', type:'Formule clé', label:'Variance et écart-type',
      enonce:'Variance : V = (ΣnᵢXᵢ²)/N − x̄²\nÉcart-type : σ = √V\n\nÉtendue : xₘₐₓ − xₘᵢₙ\nÉcart interquartile : IQ = Q₃ − Q₁' },
    { id:'st3', type:'Définition', label:'Quartiles et boîte à moustaches',
      enonce:'Q₁ : 1er quartile — 25% des données en-dessous\nQ₂ : médiane — 50%\nQ₃ : 3ème quartile — 75%\n\nBoîte à moustaches : [Q₁ ; Q₃] encadre 50% des données.\nMoustaches : Q₁−1,5·IQ  à  Q₃+1,5·IQ  (valeurs aberrantes au-delà).' },
  ]},
  { titre:'III. Série à deux variables — Régression', theoremes:[
    { id:'st4', type:'Formule clé', label:'Covariance et corrélation',
      enonce:'Covariance : cov(X,Y) = (ΣxᵢYᵢ)/n − x̄·ȳ\nCoefficient de corrélation : r = cov(X,Y) / (σₓ·σᵧ)  ,  r ∈ [−1,1]\n• |r| proche de 1 : corrélation linéaire forte\n• |r| proche de 0 : pas de liaison linéaire',
      remarque:'r > 0 : liaison positive. r < 0 : liaison négative.' },
    { id:'st5', type:'Formule clé', label:'Droite de régression (moindres carrés)',
      enonce:'Droite Δ : y = ax + b\na = cov(X,Y) / V(X)\nb = ȳ − a·x̄\n\nLa droite passe toujours par le point moyen G(x̄, ȳ).',
      remarque:'Utiliser Δ pour estimer y à partir de x (interpolation ou extrapolation).' },
  ]},
]},
]

// ════════════════════════════════════════════════════════════════════
// COMPOSANTS UI — identiques à page éco-gestion
// ════════════════════════════════════════════════════════════════════
function ThmCard({ thm }: { thm: Thm }) {
  const [open, setOpen] = useState(true)
  const st = TYPE_STYLE[thm.type]
  return (
    <div style={{ border: `1px solid ${st.border}`, borderRadius: 12, overflow: 'hidden', marginBottom: 12 }}>
      <button onClick={() => setOpen(!open)}
        style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', background: st.bg, border: 'none', cursor: 'pointer', textAlign: 'left' }}>
        <span style={{ fontSize: 10, fontWeight: 700, background: st.color, color: '#0d0d1a', padding: '2px 8px', borderRadius: 8, flexShrink: 0 }}>{thm.type.toUpperCase()}</span>
        <span style={{ fontWeight: 700, fontSize: 14, color: 'var(--text)', flex: 1 }}>{thm.label}</span>
        <span style={{ color: 'var(--muted)', fontSize: 14 }}>{open ? '▲' : '▼'}</span>
      </button>
      {open && (
        <div style={{ padding: '14px 18px', background: 'var(--surface)' }}>
          <pre style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--text)', whiteSpace: 'pre-wrap', lineHeight: 1.7, margin: 0 }}>{thm.enonce}</pre>
          {thm.remarque && (
            <div style={{ marginTop: 10, padding: '8px 12px', background: 'rgba(245,200,66,0.08)', border: '1px solid rgba(245,200,66,0.25)', borderRadius: 8 }}>
              <span style={{ fontSize: 11, color: '#f5c842', fontWeight: 700 }}>💡 Remarque : </span>
              <span style={{ fontSize: 12, color: 'var(--text2)' }}>{thm.remarque}</span>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// ════════════════════════════════════════════════════════════════════
// PAGE PRINCIPALE
// ════════════════════════════════════════════════════════════════════
export default function InformatiqueChapitrePage({ params }: { params: { slug: string } }) {
  const ch = CHAPITRES.find(c => c.slug === params.slug)
  const [filter, setFilter] = useState<TType | 'Tous'>('Tous')

  if (!ch) return (
    <>
      <Navbar />
      <main style={{ paddingTop: 120, textAlign: 'center' }}>
        <h1>Chapitre introuvable</h1>
        <Link href="/bac/informatique" style={{ color: 'var(--accent)' }}>← Retour</Link>
      </main>
      <Footer />
    </>
  )

  const tome1 = CHAPITRES.filter(c => c.tome === 1)
  const tome2 = CHAPITRES.filter(c => c.tome === 2)
  const allTypes: TType[] = ['Théorème', 'Définition', 'Formule clé', 'Propriété', 'Corollaire']
  const filteredSections = ch.sections.map(sec => ({
    ...sec,
    theoremes: filter === 'Tous' ? sec.theoremes : sec.theoremes.filter(t => t.type === filter)
  })).filter(sec => sec.theoremes.length > 0)
  const totalThm = ch.sections.reduce((s, sec) => s + sec.theoremes.length, 0)

  return (
    <>
      <Navbar />
      <main style={{ position: 'relative', zIndex: 1, paddingTop: 80 }}>

        {/* Breadcrumb */}
        <div style={{ borderBottom: '1px solid var(--border)', padding: '14px clamp(20px,5vw,60px)', display: 'flex', gap: 8, fontSize: 13, color: 'var(--muted)', alignItems: 'center', flexWrap: 'wrap' }}>
          <Link href="/bac" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Bac</Link>
          <span>›</span>
          <Link href="/bac/informatique" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Sciences Informatiques</Link>
          <span>›</span>
          <span style={{ color: 'var(--muted)', fontSize: 11 }}>Mathématiques</span>
          <span>›</span>
          <span style={{ color: 'var(--text)' }}>{ch.titre}</span>
        </div>

        <div style={{ display: 'flex', minHeight: 'calc(100vh - 140px)' }}>

          {/* SIDEBAR */}
          <aside style={{ width: 240, flexShrink: 0, borderRight: '1px solid var(--border)', padding: '20px 12px', position: 'sticky', top: 80, height: 'calc(100vh - 80px)', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 2 }}>
            {/* Tome I */}
            <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.13em', color: 'var(--muted)', margin: '8px 0 6px', paddingLeft: 10 }}>📗 Tome I — Analyse</div>
            {tome1.map(c => {
              const active = c.slug === ch.slug
              return (
                <Link key={c.slug} href={`/bac/informatique/${c.slug}`} style={{ textDecoration: 'none' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '7px 10px', borderRadius: 10,
                    background: active ? `${c.color}18` : 'transparent',
                    border: active ? `1px solid ${c.color}35` : '1px solid transparent', transition: 'all 0.15s' }}>
                    <div style={{ width: 7, height: 7, borderRadius: '50%', background: active ? c.color : 'var(--surface3)', flexShrink: 0 }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 10, color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>{c.num}</div>
                      <div style={{ fontSize: 12, color: active ? 'var(--text)' : 'var(--text2)', fontWeight: active ? 600 : 400, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.titre}</div>
                    </div>
                  </div>
                </Link>
              )
            })}
            {/* Tome II */}
            <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.13em', color: 'var(--muted)', margin: '14px 0 6px', paddingLeft: 10 }}>📘 Tome II — Algèbre & Proba</div>
            {tome2.map(c => {
              const active = c.slug === ch.slug
              return (
                <Link key={c.slug} href={`/bac/informatique/${c.slug}`} style={{ textDecoration: 'none' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '7px 10px', borderRadius: 10,
                    background: active ? `${c.color}18` : 'transparent',
                    border: active ? `1px solid ${c.color}35` : '1px solid transparent', transition: 'all 0.15s' }}>
                    <div style={{ width: 7, height: 7, borderRadius: '50%', background: active ? c.color : 'var(--surface3)', flexShrink: 0 }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 10, color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>{c.num}</div>
                      <div style={{ fontSize: 12, color: active ? 'var(--text)' : 'var(--text2)', fontWeight: active ? 600 : 400, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.titre}</div>
                    </div>
                  </div>
                </Link>
              )
            })}
            {/* Retour */}
            <div style={{ marginTop: 'auto', paddingTop: 16, borderTop: '1px solid var(--border)' }}>
              <Link href="/bac/informatique" style={{ textDecoration: 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 10px', borderRadius: 10, background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.2)' }}>
                  <span style={{ fontSize: 14 }}>←</span>
                  <span style={{ fontSize: 12, color: '#a78bfa', fontWeight: 600 }}>Tous les chapitres</span>
                </div>
              </Link>
            </div>
          </aside>

          {/* CONTENU PRINCIPAL */}
          <div style={{ flex: 1, padding: '32px clamp(20px,4vw,52px)', overflowX: 'hidden' }}>

            {/* Header chapitre */}
            <div style={{ background: `linear-gradient(135deg,${ch.color}18,${ch.color}05)`, border: `1px solid ${ch.color}30`, borderRadius: 20, padding: '28px 32px', marginBottom: 32 }}>
              <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap', marginBottom: 12 }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--muted)', background: 'var(--surface2)', padding: '3px 10px', borderRadius: 8 }}>{ch.num}</span>
                <span style={{ fontSize: 11, background: `${ch.color}22`, color: ch.color, padding: '3px 10px', borderRadius: 20, fontWeight: 600 }}>
                  Tome {ch.tome === 1 ? 'I — Analyse' : 'II — Algèbre & Probabilités'}
                </span>
                <span style={{ fontSize: 11, background: `${ch.color}15`, color: ch.color, padding: '3px 10px', borderRadius: 20 }}>{ch.badge}</span>
              </div>
              <h1 style={{ fontSize: 'clamp(24px,3.5vw,38px)', marginBottom: 10 }}>{ch.icon} {ch.titre}</h1>
              <p style={{ color: 'var(--text2)', marginBottom: 16, maxWidth: 600 }}>{ch.desc}</p>
              <div style={{ display: 'flex', gap: 20, fontSize: 13, color: 'var(--muted)', flexWrap: 'wrap' }}>
                <span>📐 {totalThm} résultats</span>
                <span>·</span>
                <span>📂 {ch.sections.length} sections</span>
                <span>·</span>
                <span style={{ color: ch.color }}>Bac Informatique · Mathématiques · CNP Tunisie</span>
              </div>
            </div>

            {/* Filtres par type */}
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 28 }}>
              {(['Tous', ...allTypes] as const).map(t => (
                <button key={t} onClick={() => setFilter(t)}
                  style={{ padding: '7px 14px', borderRadius: 20, border: '1px solid', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-body)',
                    background: filter === t ? (t === 'Tous' ? '#8b5cf6' : TYPE_STYLE[t as TType].color) : 'transparent',
                    color: filter === t ? (t === 'Tous' ? '#fff' : '#0d0d1a') : 'var(--muted)',
                    borderColor: filter === t ? 'transparent' : 'var(--border)' }}>
                  {t}
                </button>
              ))}
            </div>

            {/* Sections & théorèmes */}
            {filteredSections.map((sec, si) => (
              <div key={si} style={{ marginBottom: 36 }}>
                <h2 style={{ fontSize: 18, marginBottom: 16, paddingBottom: 8, borderBottom: '1px solid var(--border)', color: 'var(--text)' }}>{sec.titre}</h2>
                {sec.theoremes.map(thm => <ThmCard key={thm.id} thm={thm} />)}
              </div>
            ))}

            {/* Navigation */}
            <div style={{ marginTop: 40, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
              <Link href="/bac/informatique" className="btn btn-secondary">← Tous les chapitres</Link>
              <Link href="/simulation" className="btn btn-primary">📋 Simulation Bac →</Link>
            </div>

            {/* Footer source */}
            <div style={{ marginTop: 32, textAlign: 'center' }}>
              <p style={{ fontSize: 11, color: 'var(--muted)' }}>Programme CNP officiel · 4ème Sciences Informatiques · Bac Tunisie</p>
              <p style={{ fontSize: 11, color: 'var(--muted)', marginTop: 4 }}>Sources : tadris.tn · bac-done.com</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
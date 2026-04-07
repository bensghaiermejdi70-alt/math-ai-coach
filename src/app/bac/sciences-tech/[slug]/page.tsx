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

// ═══════════════════════════════════════════════════
// DONNÉES — Programme CNP Sc.Tech 4ème Tunisie
// Sources : bac-done.com/sections/mathematique/documents/15
//           sigmaths.net · Manuel CNP 4ème Technique (id=21)
// ═══════════════════════════════════════════════════
const CHAPITRES: Ch[] = [
// ─── TOME I — ANALYSE ────────────────────────────
{
  slug:'limites-continuite', num:'CH 01', titre:'Continuité et Limites', badge:'Analyse', tome:1,
  color:'#6366f1', icon:'∞', desc:'Limites finies/infinies, TVI, asymptotes, branches infinies, prolongement.',
  sections:[
  { titre:'I. Limites de fonctions', theoremes:[
    { id:'l1', type:'Définition', label:'Limite finie en un point',
      enonce:'f admet ℓ pour limite en a si :\n∀ε>0, ∃δ>0 : 0<|x−a|<δ ⟹ |f(x)−ℓ|<ε\nNotation : lim(x→a) f(x) = ℓ',
      remarque:'La valeur f(a) est sans importance pour la limite.' },
    { id:'l2', type:'Théorème', label:'Unicité de la limite',
      enonce:'Si lim f = ℓ et lim f = ℓ\' en a, alors ℓ = ℓ\'.\nUne limite, si elle existe, est unique.' },
    { id:'l3', type:'Théorème', label:'Opérations sur les limites',
      enonce:'Si lim f = ℓ et lim g = m en a :\n• lim(f+g) = ℓ+m\n• lim(f·g) = ℓ·m\n• lim(f/g) = ℓ/m  (m≠0)\n• lim f(g(x)) = f(m)  si f continue en m',
      remarque:'Formes indéterminées : ∞−∞, 0/0, ∞/∞, 0·∞ → lever l\'indétermination.' },
    { id:'l4', type:'Théorème', label:'Théorème des Gendarmes',
      enonce:'Si g(x) ≤ f(x) ≤ h(x) au voisinage de a\net lim g = lim h = ℓ, alors lim f = ℓ.' },
    { id:'l5', type:'Formule clé', label:'Limites fondamentales',
      enonce:'• lim(x→0) sin(x)/x = 1\n• lim(x→0) (eˣ−1)/x = 1\n• lim(x→0) ln(1+x)/x = 1\n• lim(x→0) (1−cos x)/x² = 1/2\nCroissances comparées (x→+∞) :\n• eˣ/xⁿ → +∞  pour tout n\n• xⁿ/ln x → +∞  pour n>0\n• ln(x)/xᵅ → 0  pour α>0' },
  ]},
  { titre:'II. Continuité', theoremes:[
    { id:'c1', type:'Définition', label:'Continuité en un point',
      enonce:'f est continue en a si :\n1. f est définie en a\n2. lim(x→a) f(x) = f(a)' },
    { id:'c2', type:'Théorème', label:'Théorème des Valeurs Intermédiaires (TVI)',
      enonce:'Si f est continue sur [a,b] et k est entre f(a) et f(b),\nalors ∃ c ∈ [a,b] tel que f(c) = k.',
      remarque:'Corollaire : si f est de plus strictement monotone, c est unique.' },
    { id:'c3', type:'Propriété', label:'Prolongement par continuité',
      enonce:'Si lim(x→a) f(x) = ℓ et f non définie en a,\non pose f̃(a) = ℓ.\nExemple : f(x)=sin(x)/x → f̃(0)=1' },
  ]},
  { titre:'III. Asymptotes', theoremes:[
    { id:'a1', type:'Définition', label:'Asymptote verticale',
      enonce:'x = a est asymptote verticale ⟺ lim(x→a) |f(x)| = +∞.' },
    { id:'a2', type:'Définition', label:'Asymptote horizontale',
      enonce:'y = ℓ est asymptote horizontale en +∞ ⟺ lim(x→+∞) f(x) = ℓ.' },
    { id:'a3', type:'Définition', label:'Asymptote oblique',
      enonce:'y = ax+b est asymptote oblique en +∞ si lim(x→+∞)[f(x)−(ax+b)] = 0.\na = lim f(x)/x  ;  b = lim [f(x)−ax]' },
  ]},
]},
{
  slug:'suites', num:'CH 02', titre:'Suites Réelles', badge:'Analyse', tome:1,
  color:'#8b5cf6', icon:'Σ', desc:'Suites arithmétiques/géométriques, convergence, suites adjacentes, récurrentes.',
  sections:[
  { titre:'I. Suites classiques', theoremes:[
    { id:'s1', type:'Définition', label:'Suite arithmétique',
      enonce:'uₙ₊₁ = uₙ + r  (r = raison)\n• Terme général : uₙ = u₀ + nr\n• Somme : S = n(u₁+uₙ)/2' },
    { id:'s2', type:'Définition', label:'Suite géométrique',
      enonce:'uₙ₊₁ = q·uₙ  (q = raison, q≠0)\n• Terme général : uₙ = u₀·qⁿ\n• Somme : S = u₁(1−qⁿ)/(1−q)  (q≠1)',
      remarque:'|q|<1 ⟹ qⁿ→0 ;  |q|>1 ⟹ |qⁿ|→+∞' },
  ]},
  { titre:'II. Convergence', theoremes:[
    { id:'s3', type:'Définition', label:'Suite convergente',
      enonce:'(uₙ) converge vers ℓ si :\n∀ε>0, ∃N : n≥N ⟹ |uₙ−ℓ|<ε' },
    { id:'s4', type:'Théorème', label:'Suite monotone bornée',
      enonce:'• Croissante et majorée → convergente\n• Décroissante et minorée → convergente',
      remarque:'Assure l\'existence d\'une limite sans la calculer.' },
    { id:'s5', type:'Théorème', label:'Suites adjacentes',
      enonce:'(uₙ) croissante, (vₙ) décroissante, lim(vₙ−uₙ)=0\n⟹ même limite ℓ  et  uₙ ≤ ℓ ≤ vₙ' },
    { id:'s6', type:'Théorème', label:'Suite récurrente — Point fixe',
      enonce:'Si uₙ₊₁=f(uₙ) converge vers ℓ et f continue en ℓ,\nalors f(ℓ) = ℓ  (ℓ est un point fixe de f).' },
  ]},
]},
{
  slug:'derivabilite', num:'CH 03', titre:'Dérivabilité', badge:'Analyse', tome:1,
  color:'#a855f7', icon:"f'", desc:'Dérivées, Rolle, TAF, L\'Hôpital, convexité, étude complète.',
  sections:[
  { titre:'I. Dérivée et règles', theoremes:[
    { id:'d1', type:'Définition', label:'Nombre dérivé',
      enonce:'f\'(a) = lim(h→0) [f(a+h)−f(a)] / h\nÉquation de la tangente en a :\ny = f\'(a)(x−a) + f(a)' },
    { id:'d2', type:'Formule clé', label:'Dérivées usuelles',
      enonce:'• (xⁿ)\'=nxⁿ⁻¹  • (√x)\'=1/(2√x)  • (eˣ)\'=eˣ\n• (ln x)\'=1/x  • (sin x)\'=cos x  • (cos x)\'=−sin x\n• (tan x)\'=1/cos²x  • (arcsin x)\'=1/√(1−x²)\n• (arccos x)\'=−1/√(1−x²)  • (arctan x)\'=1/(1+x²)' },
    { id:'d3', type:'Formule clé', label:'Règles de dérivation',
      enonce:'• (u+v)\'=u\'+v\'  •  (ku)\'=ku\'\n• (uv)\'=u\'v+uv\'  (Leibniz)\n• (u/v)\'=(u\'v−uv\')/v²\n• (f∘g)\'=(f\'∘g)·g\'  (composée)' },
  ]},
  { titre:'II. Théorèmes fondamentaux', theoremes:[
    { id:'d4', type:'Théorème', label:'Théorème de Rolle',
      enonce:'f continue sur [a,b], dérivable sur ]a,b[, f(a)=f(b)\n⟹ ∃ c ∈ ]a,b[ : f\'(c) = 0' },
    { id:'d5', type:'Théorème', label:'Théorème des Accroissements Finis (TAF)',
      enonce:'f continue sur [a,b], dérivable sur ]a,b[\n⟹ ∃ c ∈ ]a,b[ : f(b)−f(a) = f\'(c)·(b−a)',
      remarque:'f\'=0 ⟹ f constante ;  f\'>0 ⟹ f croissante' },
    { id:'d6', type:'Théorème', label:'Règle de L\'Hôpital',
      enonce:'Si lim f = lim g = 0 (ou ±∞) en a\net lim f\'/g\' = ℓ, alors lim f/g = ℓ.',
      remarque:'Formes 0/0 et ∞/∞ uniquement.' },
  ]},
  { titre:'III. Convexité', theoremes:[
    { id:'d7', type:'Définition', label:'Convexité et concavité',
      enonce:'f convexe ⟺ f\'\'≥0 ⟺ courbe au-dessus des tangentes\nf concave ⟺ f\'\'≤0 ⟺ courbe en-dessous des tangentes\nPoint d\'inflexion : f\'\' s\'annule et change de signe.' },
  ]},
]},
{
  slug:'fonctions-reciproques', num:'CH 04', titre:'Fonctions Réciproques', badge:'Analyse', tome:1,
  color:'#ec4899', icon:'f⁻¹', desc:'Bijections, réciproque, arcsin, arccos, arctan.',
  sections:[
  { titre:'I. Théorie', theoremes:[
    { id:'r1', type:'Théorème', label:'Existence de la réciproque',
      enonce:'f continue et strictement monotone sur I\n⟹ bijection de I sur J=f(I)\n⟹ ∃ unique f⁻¹ : J→I',
      remarque:'Courbe de f⁻¹ = symétrique de f par rapport à y=x' },
    { id:'r2', type:'Théorème', label:'Dérivée de la réciproque',
      enonce:'(f⁻¹)\'(b) = 1 / f\'(f⁻¹(b))' },
  ]},
  { titre:'II. arcsin, arccos, arctan', theoremes:[
    { id:'r3', type:'Définition', label:'arcsin',
      enonce:'arcsin : [−1,1] → [−π/2,π/2]\n(arcsin x)\' = 1/√(1−x²)\narcsin(−x) = −arcsin(x)  (impaire)' },
    { id:'r4', type:'Définition', label:'arccos',
      enonce:'arccos : [−1,1] → [0,π]\n(arccos x)\' = −1/√(1−x²)\narcsin(x)+arccos(x) = π/2' },
    { id:'r5', type:'Définition', label:'arctan',
      enonce:'arctan : ℝ → ]−π/2,π/2[\n(arctan x)\' = 1/(1+x²)\nlim(x→±∞) arctan x = ±π/2' },
    { id:'r6', type:'Formule clé', label:'Valeurs remarquables',
      enonce:'arcsin(0)=0   arccos(0)=π/2   arctan(0)=0\narcsin(1/2)=π/6  arccos(1/2)=π/3  arctan(1)=π/4\narcsin(√2/2)=π/4  arctan(√3)=π/3\narcsin(1)=π/2   arccos(1)=0' },
  ]},
]},
{
  slug:'logarithme', num:'CH 05', titre:'Logarithme Népérien', badge:'Analyse', tome:1,
  color:'#f59e0b', icon:'ln', desc:'Définition, propriétés algébriques, dérivées, limites, inégalités.',
  sections:[
  { titre:'I. Définition et propriétés', theoremes:[
    { id:'ln1', type:'Définition', label:'Logarithme Népérien',
      enonce:'ln(x) = ∫₁ˣ (1/t) dt  pour x>0\n• Strictement croissant sur ]0,+∞[\n• ln(1)=0  ;  ln(e)=1\n• (ln x)\'=1/x' },
    { id:'ln2', type:'Théorème', label:'Propriétés algébriques',
      enonce:'Pour a,b>0, n∈ℤ :\n• ln(ab) = ln a + ln b\n• ln(a/b) = ln a − ln b\n• ln(aⁿ) = n·ln a\n• ln(√a) = (1/2)ln a' },
    { id:'ln3', type:'Formule clé', label:'Dérivées avec ln',
      enonce:'• (ln u)\' = u\'/u  (u>0)\n• (ln|u|)\' = u\'/u  (u≠0)\n• ∫ 1/x dx = ln|x| + C' },
    { id:'ln4', type:'Théorème', label:'Limites fondamentales',
      enonce:'• lim(x→0⁺) ln x = −∞\n• lim(x→+∞) ln x = +∞\n• lim(x→0) ln(1+x)/x = 1\n• lim(x→+∞) ln(x)/xᵅ = 0  (α>0)\n• lim(x→0⁺) x·ln x = 0' },
    { id:'ln5', type:'Propriété', label:'Inégalité fondamentale',
      enonce:'Pour tout x>0 :  ln(x) ≤ x−1  (égalité ssi x=1)\nPour tout t∈ℝ :  ln(1+t) ≤ t' },
  ]},
]},
{
  slug:'exponentielle', num:'CH 06', titre:'Fonction Exponentielle', badge:'Analyse', tome:1,
  color:'#10b981', icon:'eˣ', desc:'Réciproque de ln, propriétés, dérivées, limites, inégalité de convexité.',
  sections:[
  { titre:'I. Définition et propriétés', theoremes:[
    { id:'e1', type:'Définition', label:'Fonction exponentielle',
      enonce:'exp = réciproque de ln.\neˣ=y ⟺ ln(y)=x\n• Domaine ℝ, image ]0,+∞[\n• e⁰=1, e¹≈2.718\n• eˣ>0 pour tout x' },
    { id:'e2', type:'Théorème', label:'Propriétés algébriques',
      enonce:'• eᵃ·eᵇ = eᵃ⁺ᵇ\n• eᵃ/eᵇ = eᵃ⁻ᵇ\n• (eᵃ)ⁿ = eⁿᵃ\n• e⁻ˣ = 1/eˣ' },
    { id:'e3', type:'Formule clé', label:'Dérivées et primitives',
      enonce:'• (eˣ)\'= eˣ\n• (eᵘ)\'= u\'·eᵘ\n• ∫ eˣ dx = eˣ+C\n• ∫ u\'eᵘ dx = eᵘ+C' },
    { id:'e4', type:'Théorème', label:'Limites — Croissances comparées',
      enonce:'• lim(x→−∞) eˣ = 0\n• lim(x→+∞) eˣ = +∞\n• lim(x→0) (eˣ−1)/x = 1\n• lim(x→+∞) eˣ/xⁿ = +∞  (tout n)\n• lim(x→+∞) xⁿe⁻ˣ = 0  (tout n)' },
    { id:'e5', type:'Propriété', label:'Inégalité de convexité',
      enonce:'Pour tout x∈ℝ :  eˣ ≥ 1+x  (égalité ssi x=0)' },
  ]},
]},
{
  slug:'primitives', num:'CH 07', titre:'Primitives', badge:'Analyse', tome:1,
  color:'#06b6d4', icon:'∫', desc:'Table des primitives, formes composées u\'f(u), IPP.',
  sections:[
  { titre:'I. Table des primitives', theoremes:[
    { id:'p1', type:'Formule clé', label:'Primitives usuelles',
      enonce:'• ∫ xⁿ dx = xⁿ⁺¹/(n+1)+C  (n≠−1)\n• ∫ 1/x dx = ln|x|+C\n• ∫ eˣ dx = eˣ+C\n• ∫ sin x dx = −cos x+C\n• ∫ cos x dx = sin x+C\n• ∫ 1/cos²x dx = tan x+C\n• ∫ 1/√(1−x²) dx = arcsin x+C\n• ∫ 1/(1+x²) dx = arctan x+C' },
    { id:'p2', type:'Formule clé', label:'Formes composées u\'f(u)',
      enonce:'• ∫ u\'eᵘ dx = eᵘ+C\n• ∫ u\'/u dx = ln|u|+C\n• ∫ u\'uⁿ dx = uⁿ⁺¹/(n+1)+C\n• ∫ u\'sin u dx = −cos u+C\n• ∫ u\'cos u dx = sin u+C\n• ∫ u\'/√u dx = 2√u+C\n• ∫ u\'/√(1−u²) dx = arcsin u+C\n• ∫ u\'/(1+u²) dx = arctan u+C' },
  ]},
  { titre:'II. Intégration par parties', theoremes:[
    { id:'p3', type:'Théorème', label:'IPP — Intégration Par Parties',
      enonce:'∫ u\'v dx = [uv] − ∫ uv\' dx\nSur [a,b] : ∫ᵃᵇ u\'v = [uv]ᵃᵇ − ∫ᵃᵇ uv\'',
      remarque:'Placer ln, arcsin, arccos, arctan en v (jamais en v\').' },
  ]},
]},
{
  slug:'integrales', num:'CH 08', titre:'Calcul Intégral', badge:'Analyse', tome:1,
  color:'#3b82f6', icon:'∫ᵃᵇ', desc:'Théorème fondamental, Chasles, valeur moyenne, aires, volumes.',
  sections:[
  { titre:'I. Théorèmes fondamentaux', theoremes:[
    { id:'i1', type:'Théorème', label:'Théorème Fondamental de l\'Analyse',
      enonce:'Si f continue sur [a,b] :\nF(x) = ∫ₐˣ f(t) dt  est la primitive de f nulle en a.\n∫ᵃᵇ f(x) dx = F(b)−F(a) = [F(x)]ᵃᵇ' },
    { id:'i2', type:'Propriété', label:'Propriétés des intégrales',
      enonce:'• Linéarité : ∫(αf+βg) = α∫f+β∫g\n• Chasles : ∫ᵃᶜ f = ∫ᵃᵇ f + ∫ᵇᶜ f\n• Positivité : f≥0 ⟹ ∫ᵃᵇ f ≥ 0\n• |∫ᵃᵇ f| ≤ ∫ᵃᵇ |f|' },
    { id:'i3', type:'Définition', label:'Valeur moyenne',
      enonce:'m = (1/(b−a)) · ∫ᵃᵇ f(x) dx' },
  ]},
  { titre:'II. Applications géométriques', theoremes:[
    { id:'i4', type:'Formule clé', label:'Calcul d\'aires',
      enonce:'Aire entre f et l\'axe Ox :\nA = ∫ᵃᵇ |f(x)| dx\n\nAire entre f et g (f≥g) :\nA = ∫ᵃᵇ [f(x)−g(x)] dx' },
    { id:'i5', type:'Formule clé', label:'Volume de révolution',
      enonce:'Rotation de f autour de Ox :\nV = π · ∫ᵃᵇ [f(x)]² dx' },
  ]},
]},
// ─── TOME II — ALGÈBRE & PROBABILITÉS ────────────
{
  slug:'complexes', num:'CH 01', titre:'Nombres Complexes', badge:'Algèbre', tome:2,
  color:'#7c3aed', icon:'ℂ', desc:'Forme algébrique, Euler, De Moivre, racines, transformations du plan.',
  sections:[
  { titre:'I. Forme algébrique', theoremes:[
    { id:'cx1', type:'Définition', label:'Nombre complexe',
      enonce:'z = a+ib  (a,b∈ℝ, i²=−1)\n• Re(z)=a, Im(z)=b\n• z̄=a−ib  (conjugué)\n• |z|=√(a²+b²)  (module)' },
    { id:'cx2', type:'Propriété', label:'Module et conjugué',
      enonce:'• z·z̄=|z|²  ⟹  1/z=z̄/|z|²\n• |z₁z₂|=|z₁|·|z₂|\n• |z₁+z₂|≤|z₁|+|z₂|\n• z réel ⟺ z=z̄' },
  ]},
  { titre:'II. Forme exponentielle', theoremes:[
    { id:'cx3', type:'Théorème', label:'Formule d\'Euler',
      enonce:'e^(iθ) = cos θ + i sin θ\n• cos θ = (e^(iθ)+e^(−iθ))/2\n• sin θ = (e^(iθ)−e^(−iθ))/(2i)\n• e^(iπ)+1 = 0' },
    { id:'cx4', type:'Théorème', label:'Formule de De Moivre',
      enonce:'(cos θ+i sin θ)ⁿ = cos(nθ)+i sin(nθ)\nUsage : linéariser cosⁿθ, développer cos(nθ)' },
    { id:'cx5', type:'Propriété', label:'Multiplication et argument',
      enonce:'z₁=r₁e^(iθ₁), z₂=r₂e^(iθ₂) :\n• z₁z₂=r₁r₂·e^(i(θ₁+θ₂))\n• arg(z₁z₂)=arg z₁+arg z₂  [2π]\n• zⁿ=rⁿ·e^(inθ)' },
  ]},
  { titre:'III. Racines — Équations', theoremes:[
    { id:'cx6', type:'Théorème', label:'Racines n-ièmes',
      enonce:'Racines n-ièmes de z₀=ρe^(iφ) :\nzₖ=ρ^(1/n)·e^(i(φ+2kπ)/n), k=0,...,n−1\n→ sommets d\'un polygone régulier à n côtés.' },
    { id:'cx7', type:'Propriété', label:'Transformations du plan',
      enonce:'• Translation u⃗(a+ib) : z\'=z+(a+ib)\n• Rotation centre O, angle θ : z\'=e^(iθ)z\n• Rotation centre Ω(ω), angle θ : z\'−ω=e^(iθ)(z−ω)\n• Distance : |z_A−z_B|=AB' },
  ]},
]},
{
  slug:'geometrie-espace', num:'CH 02', titre:"Géométrie dans l'Espace", badge:'Géométrie', tome:2,
  color:'#059669', icon:'↗', desc:'Produit scalaire, vectoriel, plans, droites, distances, sphère.',
  sections:[
  { titre:'I. Produits scalaire et vectoriel', theoremes:[
    { id:'g1', type:'Définition', label:'Produit scalaire',
      enonce:'u⃗·v⃗ = x₁x₂+y₁y₂+z₁z₂ = |u⃗||v⃗|cos θ\n• u⃗·v⃗=0 ⟺ u⃗⊥v⃗\n• |u⃗|=√(x²+y²+z²)' },
    { id:'g2', type:'Définition', label:'Produit vectoriel',
      enonce:'u⃗×v⃗ = (y₁z₂−z₁y₂, z₁x₂−x₁z₂, x₁y₂−y₁x₂)\n• u⃗×v⃗ ⊥ u⃗ et ⊥ v⃗\n• |u⃗×v⃗|=|u⃗||v⃗||sin θ|\n• u⃗×v⃗=0⃗ ⟺ colinéaires' },
  ]},
  { titre:'II. Plans — Droites — Distances', theoremes:[
    { id:'g3', type:'Formule clé', label:'Équation d\'un plan',
      enonce:'Plan de normale n⃗(a,b,c) par A(x₀,y₀,z₀) :\na(x−x₀)+b(y−y₀)+c(z−z₀)=0\n⟺ ax+by+cz+d=0' },
    { id:'g4', type:'Formule clé', label:'Droite dans l\'espace',
      enonce:'Par A(x₀,y₀,z₀), direction u⃗(l,m,n) :\nx=x₀+tl, y=y₀+tm, z=z₀+tn  (t∈ℝ)' },
    { id:'g5', type:'Formule clé', label:'Distance point–plan',
      enonce:'d(M,P) = |ax₀+by₀+cz₀+d| / √(a²+b²+c²)\noù M(x₀,y₀,z₀) et P : ax+by+cz+d=0' },
    { id:'g6', type:'Définition', label:'Sphère',
      enonce:'Centre Ω(a,b,c), rayon R :\n(x−a)²+(y−b)²+(z−c)²=R²' },
  ]},
]},
{
  slug:'arithmetique', num:'CH 03', titre:'Arithmétique', badge:'Algèbre', tome:2,
  color:'#f59e0b', icon:'ℤ', desc:'Divisibilité, Euclide, Bézout, Gauss, congruences.',
  sections:[
  { titre:'I. Divisibilité et PGCD', theoremes:[
    { id:'ar1', type:'Définition', label:'Divisibilité dans ℤ',
      enonce:'a divise b (a|b) si ∃k∈ℤ : b=ka\n• a|b et a|c ⟹ a|(bu+cv)  pour u,v∈ℤ' },
    { id:'ar2', type:'Théorème', label:'Division euclidienne',
      enonce:'Pour a∈ℤ, b∈ℤ* : ∃! q,r∈ℤ :\na = bq + r  avec 0≤r<|b|\nq = quotient, r = reste' },
    { id:'ar3', type:'Théorème', label:'Algorithme d\'Euclide',
      enonce:'PGCD(a,b) = PGCD(b, a mod b)\nOn divise successivement jusqu\'au reste nul.\nLe dernier diviseur non nul = PGCD(a,b).',
      remarque:'Exemple : PGCD(48,18) : 48=18×2+12 → 18=12×1+6 → 12=6×2+0 → PGCD=6' },
  ]},
  { titre:'II. Bézout — Gauss', theoremes:[
    { id:'ar4', type:'Théorème', label:'Théorème de Bézout',
      enonce:'a et b sont premiers entre eux\n⟺ ∃ u,v∈ℤ : au+bv = 1\nPlus généralement : ∃ u,v : au+bv = PGCD(a,b)' },
    { id:'ar5', type:'Corollaire', label:'Théorème de Gauss',
      enonce:'Si a|bc et PGCD(a,b)=1, alors a|c.\nApplications : résolution d\'équations diophantiennes.' },
    { id:'ar6', type:'Théorème', label:'Entiers premiers',
      enonce:'p est premier si ses seuls diviseurs sont 1 et p.\nPetit théorème de Fermat : si p premier et p∤a,\nalors aᵖ⁻¹ ≡ 1  [mod p]' },
  ]},
  { titre:'III. Congruences', theoremes:[
    { id:'ar7', type:'Définition', label:'Congruence modulo n',
      enonce:'a ≡ b [n] ⟺ n|(a−b)\nPropriétés :\n• a≡b et c≡d ⟹ a+c≡b+d, ac≡bd  [n]\n• a≡b [n] ⟹ aᵏ≡bᵏ [n]' },
    { id:'ar8', type:'Propriété', label:'Critères de divisibilité',
      enonce:'• Div. par 2 : dernier chiffre pair\n• Div. par 3 : somme des chiffres div. par 3\n• Div. par 9 : somme des chiffres div. par 9\n• Div. par 11 : somme alternée div. par 11' },
  ]},
]},
{
  slug:'probabilites', num:'CH 04', titre:'Probabilités', badge:'Probabilités', tome:2,
  color:'#d97706', icon:'P()', desc:'Probabilités conditionnelles, probabilités totales, Bayes, indépendance.',
  sections:[
  { titre:'I. Probabilités conditionnelles et Bayes', theoremes:[
    { id:'pr1', type:'Définition', label:'Probabilité conditionnelle',
      enonce:'P(A|B) = P(A∩B)/P(B)  si P(B)>0\nFormule de multiplication :\nP(A∩B) = P(B)·P(A|B) = P(A)·P(B|A)' },
    { id:'pr2', type:'Théorème', label:'Formule des Probabilités Totales',
      enonce:'Si (B₁,...,Bₙ) partition de Ω :\nP(A) = Σᵢ P(Bᵢ)·P(A|Bᵢ)',
      remarque:'Visualisation : arbre de probabilités.' },
    { id:'pr3', type:'Théorème', label:'Formule de Bayes',
      enonce:'P(Bₖ|A) = P(Bₖ)·P(A|Bₖ) / Σᵢ P(Bᵢ)·P(A|Bᵢ)',
      remarque:'Permet de remonter d\'une conséquence à sa cause.' },
    { id:'pr4', type:'Définition', label:'Événements indépendants',
      enonce:'A et B indépendants ⟺ P(A∩B)=P(A)·P(B)\n⚠ Indépendance ≠ Incompatibilité !' },
  ]},
]},
{
  slug:'statistiques', num:'CH 05', titre:'Statistiques', badge:'Statistiques', tome:2,
  color:'#0891b2', icon:'r', desc:'Série à deux variables, covariance, corrélation, droite de régression.',
  sections:[
  { titre:'I. Série à deux variables', theoremes:[
    { id:'st1', type:'Définition', label:'Indicateurs',
      enonce:'Pour (xᵢ,yᵢ), i=1..n :\n• x̄=(1/n)Σxᵢ,  ȳ=(1/n)Σyᵢ\n• V(x)=(1/n)Σxᵢ²−x̄²\n• cov(x,y)=(1/n)Σxᵢyᵢ−x̄ȳ\n• σₓ=√V(x),  σᵧ=√V(y)' },
    { id:'st2', type:'Définition', label:'Coefficient de corrélation',
      enonce:'r = cov(x,y) / (σₓ·σᵧ)\n• r ∈ [−1,1]\n• |r| proche de 1 → forte corrélation' },
    { id:'st3', type:'Formule clé', label:'Droite de régression',
      enonce:'y−ȳ = [cov(x,y)/V(x)]·(x−x̄)\nPente : a=cov(x,y)/V(x)\nOrdonnée : b=ȳ−ax̄\nPasse par G(x̄,ȳ).' },
  ]},
]},
]

// ═══════════════════════════════════════════════════
// COMPOSANT CARTE THÉORÈME
// ═══════════════════════════════════════════════════
function ThmCard({ t, color }: { t: Thm; color: string }) {
  const [open, setOpen] = useState(false)
  const [done, setDone] = useState(false)
  const ts = TYPE_STYLE[t.type]
  return (
    <div style={{ background:'var(--surface)', border:`1px solid ${open ? ts.border : 'var(--border)'}`, borderLeft:`3px solid ${color}`, borderRadius:12, opacity:done?0.6:1, transition:'all 0.2s' }}>
      <div style={{ padding:'14px 16px' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:12 }}>
          <div style={{ flex:1 }}>
            <div style={{ display:'flex', gap:8, alignItems:'center', marginBottom:8, flexWrap:'wrap' }}>
              <span style={{ fontSize:10, fontWeight:700, background:ts.bg, color:ts.color, border:`1px solid ${ts.border}`, padding:'2px 8px', borderRadius:20 }}>{t.type}</span>
              <span style={{ fontSize:14, fontWeight:700, color:'var(--text)' }}>{t.label}</span>
            </div>
            <pre style={{ fontSize:13, color:'var(--text2)', fontFamily:'var(--font-mono)', whiteSpace:'pre-wrap', lineHeight:1.75,
              display:open?'block':'-webkit-box', WebkitLineClamp:open?undefined:3,
              WebkitBoxOrient:'vertical' as any, overflow:open?'visible':'hidden' }}>
              {t.enonce}
            </pre>
            {open && t.remarque && (
              <div style={{ marginTop:12, paddingLeft:12, borderLeft:'2px solid rgba(245,200,66,0.5)', fontSize:12, color:'rgba(245,200,66,0.85)', fontStyle:'italic', lineHeight:1.6 }}>
                ⚡ {t.remarque}
              </div>
            )}
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:6, flexShrink:0 }}>
            <button onClick={() => setOpen(p=>!p)}
              style={{ background:'var(--surface2)', border:'1px solid var(--border2)', borderRadius:8, width:30, height:30, display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', color:'var(--text2)', fontSize:18 }}>
              {open?'−':'+'}
            </button>
            <button onClick={() => setDone(p=>!p)}
              style={{ background:done?'rgba(6,214,160,0.15)':'var(--surface2)', border:done?'1px solid rgba(6,214,160,0.4)':'1px solid var(--border2)', borderRadius:8, width:30, height:30, display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', fontSize:14 }}>
              {done?'✓':'○'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════
// PAGE PRINCIPALE
// ═══════════════════════════════════════════════════
export default function SciencesTechChapPage({ params }: { params: { slug: string } }) {
  const ch = CHAPITRES.find(c => c.slug === params.slug) ?? CHAPITRES[0]
  const idx = CHAPITRES.indexOf(ch)
  const prev = CHAPITRES[idx-1]
  const next = CHAPITRES[idx+1]
  const t1 = CHAPITRES.filter(c => c.tome===1)
  const t2 = CHAPITRES.filter(c => c.tome===2)
  const allThms = ch.sections.flatMap(s => s.theoremes)
  const [done, setDone] = useState<Record<string,boolean>>({})
  const doneCount = Object.values(done).filter(Boolean).length
  const pct = allThms.length ? Math.round(doneCount/allThms.length*100) : 0

  return (
    <>
      <Navbar />
      <main style={{ position:'relative', zIndex:1, paddingTop:80 }}>
        {/* Breadcrumb */}
        <div style={{ borderBottom:'1px solid var(--border)', padding:'14px clamp(20px,5vw,60px)', display:'flex', gap:8, fontSize:13, color:'var(--muted)', alignItems:'center', flexWrap:'wrap' }}>
          <Link href="/bac" style={{ color:'var(--muted)', textDecoration:'none' }}>Bac</Link><span>›</span>
          <Link href="/bac/sciences-tech" style={{ color:'var(--muted)', textDecoration:'none' }}>Sciences Tech</Link><span>›</span>
          <span style={{ color:'var(--text)' }}>{ch.titre}</span>
        </div>

        <div style={{ display:'flex', minHeight:'calc(100vh - 140px)' }}>

          {/* SIDEBAR */}
          <aside style={{ width:252, flexShrink:0, borderRight:'1px solid var(--border)', padding:'24px 14px', position:'sticky', top:80, height:'calc(100vh - 80px)', overflowY:'auto', display:'flex', flexDirection:'column', gap:4 }}>
            <div style={{ fontSize:10, textTransform:'uppercase', letterSpacing:'0.14em', color:'var(--muted)', marginBottom:6, paddingLeft:10 }}>Tome I — Analyse</div>
            {t1.map(c => (
              <Link key={c.slug} href={`/bac/sciences-tech/${c.slug}`} style={{ textDecoration:'none' }}>
                <div style={{ display:'flex', alignItems:'center', gap:10, padding:'8px 10px', borderRadius:10,
                  background: c.slug===ch.slug ? `${c.color}18` : 'transparent',
                  border: c.slug===ch.slug ? `1px solid ${c.color}35` : '1px solid transparent', transition:'all 0.15s' }}>
                  <div style={{ width:7, height:7, borderRadius:'50%', background:c.slug===ch.slug?c.color:'var(--surface3)', flexShrink:0 }} />
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontSize:10, color:'var(--muted)', fontFamily:'var(--font-mono)' }}>{c.num}</div>
                    <div style={{ fontSize:12, color:c.slug===ch.slug?'var(--text)':'var(--text2)', fontWeight:c.slug===ch.slug?600:400, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{c.titre}</div>
                  </div>
                </div>
              </Link>
            ))}
            <div style={{ fontSize:10, textTransform:'uppercase', letterSpacing:'0.14em', color:'var(--muted)', marginBottom:6, paddingLeft:10, marginTop:14 }}>Tome II — Algèbre & Proba</div>
            {t2.map(c => (
              <Link key={c.slug} href={`/bac/sciences-tech/${c.slug}`} style={{ textDecoration:'none' }}>
                <div style={{ display:'flex', alignItems:'center', gap:10, padding:'8px 10px', borderRadius:10,
                  background: c.slug===ch.slug ? `${c.color}18` : 'transparent',
                  border: c.slug===ch.slug ? `1px solid ${c.color}35` : '1px solid transparent', transition:'all 0.15s' }}>
                  <div style={{ width:7, height:7, borderRadius:'50%', background:c.slug===ch.slug?c.color:'var(--surface3)', flexShrink:0 }} />
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontSize:10, color:'var(--muted)', fontFamily:'var(--font-mono)' }}>{c.num}</div>
                    <div style={{ fontSize:12, color:c.slug===ch.slug?'var(--text)':'var(--text2)', fontWeight:c.slug===ch.slug?600:400, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{c.titre}</div>
                  </div>
                </div>
              </Link>
            ))}
          </aside>

          {/* CONTENU */}
          <div style={{ flex:1, padding:'32px clamp(20px,4vw,52px)', overflowX:'hidden' }}>

            {/* En-tête chapitre */}
            <div style={{ background:`linear-gradient(135deg,${ch.color}18,${ch.color}05)`, border:`1px solid ${ch.color}30`, borderRadius:16, padding:'24px 28px', marginBottom:28, position:'relative', overflow:'hidden' }}>
              <div style={{ position:'absolute', right:24, top:12, fontSize:60, opacity:0.07, fontWeight:900, color:ch.color }}>{ch.icon}</div>
              <div style={{ display:'flex', gap:10, alignItems:'center', marginBottom:10 }}>
                <span style={{ fontFamily:'var(--font-mono)', fontSize:11, color:'var(--muted)', background:'var(--surface2)', padding:'2px 8px', borderRadius:6 }}>{ch.num}</span>
                <span style={{ fontSize:11, background:`${ch.color}22`, color:ch.color, padding:'2px 10px', borderRadius:12, fontWeight:600 }}>Tome {ch.tome}</span>
                <span style={{ fontSize:11, color:'var(--muted)' }}>{allThms.length} éléments</span>
              </div>
              <h2 style={{ fontSize:26, marginBottom:6 }}>{ch.titre}</h2>
              <p style={{ fontSize:13, color:'var(--text2)', marginBottom:18 }}>{ch.desc}</p>
              {/* Progression */}
              <div>
                <div style={{ display:'flex', justifyContent:'space-between', fontSize:12, color:'var(--muted)', marginBottom:6 }}>
                  <span>Progression</span>
                  <span style={{ color:pct===100?'#06d6a0':'var(--muted)' }}>{pct}%</span>
                </div>
                <div style={{ height:6, background:'var(--surface2)', borderRadius:6, overflow:'hidden' }}>
                  <div style={{ height:'100%', width:`${pct}%`, background:`linear-gradient(90deg,${ch.color},#f97316)`, borderRadius:6, transition:'width 0.4s' }} />
                </div>
                <div style={{ fontSize:11, color:'var(--muted)', marginTop:5 }}>{doneCount} / {allThms.length} étudiés</div>
              </div>
            </div>

            {/* Légende */}
            <div style={{ display:'flex', gap:8, flexWrap:'wrap', alignItems:'center', marginBottom:28, padding:'12px 16px', background:'var(--surface)', border:'1px solid var(--border)', borderRadius:12 }}>
              <span style={{ fontSize:11, color:'var(--muted)', marginRight:4 }}>Légende</span>
              {(Object.entries(TYPE_STYLE) as [TType, typeof TYPE_STYLE[TType]][]).map(([type, s]) => (
                <span key={type} style={{ display:'flex', alignItems:'center', gap:5, fontSize:11, background:s.bg, color:s.color, border:`1px solid ${s.border}`, padding:'3px 10px', borderRadius:20 }}>
                  <span style={{ width:6, height:6, borderRadius:'50%', background:s.color, display:'inline-block', flexShrink:0 }} />
                  {type}
                </span>
              ))}
            </div>

            {/* Sections */}
            {ch.sections.map((sec, si) => (
              <div key={si} style={{ marginBottom:36 }}>
                <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:16 }}>
                  <div style={{ height:1, flex:1, background:'var(--border2)' }} />
                  <h3 style={{ fontSize:12, fontWeight:700, color:'var(--text2)', textTransform:'uppercase', letterSpacing:'0.12em', whiteSpace:'nowrap', padding:'0 8px' }}>{sec.titre}</h3>
                  <div style={{ height:1, flex:1, background:'var(--border2)' }} />
                </div>
                <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
                  {sec.theoremes.map(t => <ThmCard key={t.id} t={t} color={ch.color} />)}
                </div>
              </div>
            ))}

            {/* Prev / Next */}
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16, marginTop:48, paddingTop:32, borderTop:'1px solid var(--border)' }}>
              {prev ? (
                <Link href={`/bac/sciences-tech/${prev.slug}`} style={{ textDecoration:'none' }}>
                  <div className="card" style={{ padding:16, display:'flex', gap:12, alignItems:'center', transition:'transform 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.transform='translateX(-3px)'}
                    onMouseLeave={e => e.currentTarget.style.transform='translateX(0)'}>
                    <span style={{ color:'var(--muted)', fontSize:20 }}>←</span>
                    <div>
                      <div style={{ fontSize:10, color:'var(--muted)', marginBottom:2 }}>{prev.num}</div>
                      <div style={{ fontSize:14, fontWeight:600 }}>{prev.titre}</div>
                    </div>
                  </div>
                </Link>
              ) : <div />}
              {next ? (
                <Link href={`/bac/sciences-tech/${next.slug}`} style={{ textDecoration:'none' }}>
                  <div className="card" style={{ padding:16, display:'flex', gap:12, alignItems:'center', justifyContent:'flex-end', transition:'transform 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.transform='translateX(3px)'}
                    onMouseLeave={e => e.currentTarget.style.transform='translateX(0)'}>
                    <div style={{ textAlign:'right' }}>
                      <div style={{ fontSize:10, color:'var(--muted)', marginBottom:2 }}>{next.num}</div>
                      <div style={{ fontSize:14, fontWeight:600 }}>{next.titre}</div>
                    </div>
                    <span style={{ color:'var(--muted)', fontSize:20 }}>→</span>
                  </div>
                </Link>
              ) : <div />}
            </div>

            <div style={{ marginTop:32, textAlign:'center' }}>
              <p style={{ fontSize:11, color:'var(--muted)' }}>Programme CNP officiel · Manuel 4ème Technique · Bac Tunisie 2026</p>
              <p style={{ fontSize:11, color:'var(--muted)', marginTop:4 }}>Sources : bac-done.com · sigmaths.net · devoirat.net</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

'use client'
import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

// ═══════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════
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
// DONNÉES — Programme CNP Sc.Exp 4ème Tunisie
// Sources : bac-done.com · sigmaths.net · devoirat.net
//           Manuel CNP 222433 (T1) + 222434 (T2)
// ═══════════════════════════════════════════════════
const CHAPITRES: Ch[] = [
// ─────────────────────────────────────────────────
//  TOME I — ANALYSE
// ─────────────────────────────────────────────────
{
  slug:'limites-continuite', num:'CH 01', titre:'Continuité et Limites', badge:'Analyse', tome:1,
  color:'#6366f1', icon:'∞', desc:'Limites finies/infinies, TVI, asymptotes, prolongement, croissances comparées.',
  sections:[
  { titre:'I. Limites de fonctions', theoremes:[
    { id:'l1', type:'Définition', label:'Limite en un point',
      enonce:'f admet ℓ pour limite en a si :\n∀ε>0, ∃η>0 : 0<|x−a|<η ⟹ |f(x)−ℓ|<ε\nNotation : lim(x→a) f(x) = ℓ',
      remarque:'La valeur f(a) est sans importance pour la limite.' },
    { id:'l2', type:'Théorème', label:'Unicité de la limite',
      enonce:'Si lim f = ℓ et lim f = ℓ\' en a, alors ℓ = ℓ\'.\nUne limite, si elle existe, est unique.' },
    { id:'l3', type:'Théorème', label:'Opérations sur les limites',
      enonce:'Si lim f = ℓ et lim g = m en a :\n• lim(f+g) = ℓ+m\n• lim(f·g) = ℓ·m\n• lim(f/g) = ℓ/m  (m≠0)\n• lim f(g(x)) = f(m)  si f continue en m',
      remarque:'Formes indéterminées : ∞−∞, 0/0, ∞/∞, 0·∞ → lever l\'indétermination.' },
    { id:'l4', type:'Théorème', label:'Théorème des Gendarmes',
      enonce:'Si g(x) ≤ f(x) ≤ h(x) au voisinage de a\net lim g = lim h = ℓ, alors lim f = ℓ.\nSi |f(x)| ≤ h(x) et lim h = 0, alors lim f = 0.' },
    { id:'l5', type:'Formule clé', label:'Limites fondamentales et croissances comparées',
      enonce:'• lim(x→0) sin(x)/x = 1\n• lim(x→0) (eˣ−1)/x = 1\n• lim(x→0) ln(1+x)/x = 1\nQuand x→+∞ :\n• eˣ/xⁿ → +∞  (exp domine tout polynôme)\n• xⁿ/ln(x) → +∞  pour n>0\n• ln(x)/xᵅ → 0  pour α>0\nQuand x→0⁺ : xᵅ|ln x| → 0  pour α>0' },
  ]},
  { titre:'II. Continuité', theoremes:[
    { id:'c1', type:'Définition', label:'Continuité en un point',
      enonce:'f est continue en a si :\n1. f est définie en a\n2. lim(x→a) f(x) = f(a)\nf est continue sur I si elle est continue en tout point de I.' },
    { id:'c2', type:'Théorème', label:'Théorème des Valeurs Intermédiaires (TVI)',
      enonce:'Si f est continue sur [a,b] et k est compris entre f(a) et f(b),\nalors ∃ c ∈ [a,b] tel que f(c) = k.',
      remarque:'Corollaire (unicité) : si f est de plus STRICTEMENT MONOTONE, c est unique.\nApplication : existence et unicité d\'une racine dans un intervalle.' },
    { id:'c3', type:'Propriété', label:'Prolongement par continuité',
      enonce:'Si f est définie sur I\\{a} et lim(x→a) f(x) = ℓ ∈ ℝ,\non pose f̃(a) = ℓ pour prolonger f par continuité.\nExemple : f(x)=sin(x)/x  →  f̃(0) = 1' },
  ]},
  { titre:'III. Asymptotes — Branches infinies', theoremes:[
    { id:'a1', type:'Définition', label:'Asymptote verticale',
      enonce:'x = a est asymptote verticale ⟺ lim(x→a) |f(x)| = +∞ (d\'au moins un côté).' },
    { id:'a2', type:'Définition', label:'Asymptote horizontale',
      enonce:'y = ℓ est asymptote horizontale en +∞ ⟺ lim(x→+∞) f(x) = ℓ.' },
    { id:'a3', type:'Définition', label:'Asymptote oblique',
      enonce:'y = ax+b est asymptote oblique en +∞ ⟺ lim(x→+∞)[f(x)−(ax+b)] = 0.\nMéthode :\n• a = lim(x→+∞) f(x)/x\n• b = lim(x→+∞) [f(x)−ax]',
      remarque:'Si lim f(x)/x = ±∞ : branche parabolique.' },
  ]},
]},
{
  slug:'suites', num:'CH 02', titre:'Suites Réelles', badge:'Analyse', tome:1,
  color:'#8b5cf6', icon:'Σ', desc:'Suites arithmétiques/géométriques, convergence, suites adjacentes, récurrentes.',
  sections:[
  { titre:'I. Suites arithmétiques et géométriques', theoremes:[
    { id:'s1', type:'Définition', label:'Suite arithmétique',
      enonce:'(uₙ) est arithmétique de raison r si uₙ₊₁ = uₙ + r.\n• Terme général : uₙ = u₀ + nr  (ou uₙ = u₁ + (n−1)r)\n• Somme des n premiers termes : Sₙ = n·(u₁+uₙ)/2' },
    { id:'s2', type:'Définition', label:'Suite géométrique',
      enonce:'(uₙ) est géométrique de raison q≠0 si uₙ₊₁ = q·uₙ.\n• Terme général : uₙ = u₀·qⁿ\n• Somme : Sₙ = u₁·(1−qⁿ)/(1−q)  si q≠1',
      remarque:'|q|<1 ⟹ lim qⁿ = 0 ;  |q|>1 ⟹ lim |qⁿ| = +∞' },
  ]},
  { titre:'II. Convergence et théorèmes', theoremes:[
    { id:'s3', type:'Définition', label:'Suite convergente',
      enonce:'(uₙ) converge vers ℓ ∈ ℝ si :\n∀ε>0, ∃N ∈ ℕ,  n≥N ⟹ |uₙ−ℓ|<ε\nSinon, la suite est dite divergente.' },
    { id:'s4', type:'Théorème', label:'Théorème des gendarmes pour suites',
      enonce:'Si vₙ ≤ uₙ ≤ wₙ à partir d\'un certain rang,\net lim vₙ = lim wₙ = ℓ, alors lim uₙ = ℓ.' },
    { id:'s5', type:'Théorème', label:'Suite monotone bornée',
      enonce:'• Suite CROISSANTE et MAJORÉE → converge\n• Suite DÉCROISSANTE et MINORÉE → converge\n• Suite croissante non majorée → +∞\n• Suite décroissante non minorée → −∞',
      remarque:'Ce théorème assure l\'existence d\'une limite sans la calculer.' },
    { id:'s6', type:'Théorème', label:'Suites adjacentes',
      enonce:'(uₙ) et (vₙ) sont adjacentes si :\n1. (uₙ) croissante\n2. (vₙ) décroissante\n3. lim(vₙ−uₙ) = 0\n⟹ même limite ℓ et  uₙ ≤ ℓ ≤ vₙ  pour tout n.',
      remarque:'Application classique : encadrement de e, π, √2...' },
    { id:'s7', type:'Théorème', label:'Suite récurrente uₙ₊₁ = f(uₙ) — Point fixe',
      enonce:'Si (uₙ) définie par uₙ₊₁=f(uₙ) converge vers ℓ,\net si f est continue en ℓ, alors f(ℓ) = ℓ.\n\nMéthode d\'étude :\n1. Montrer que f est monotone et que l\'intervalle est stable\n2. Conclure à la convergence par le théorème des suites monotones bornées\n3. Trouver ℓ en résolvant f(ℓ)=ℓ',
      remarque:'Si f est une contraction sur [a,b], la convergence est garantie.' },
    { id:'s8', type:'Propriété', label:'Lien suites-fonctions',
      enonce:'Si uₙ = f(n) et lim(x→+∞) f(x) = ℓ, alors lim uₙ = ℓ.\nSi lim uₙ = ℓ et f continue en ℓ, alors lim f(uₙ) = f(ℓ).' },
  ]},
]},
{
  slug:'derivabilite', num:'CH 03', titre:'Dérivabilité', badge:'Analyse', tome:1,
  color:'#a855f7', icon:"f'", desc:'Dérivées, Rolle, TAF, L\'Hôpital, convexité, étude de fonctions.',
  sections:[
  { titre:'I. Nombre dérivé et règles', theoremes:[
    { id:'d1', type:'Définition', label:'Nombre dérivé en un point',
      enonce:'f est dérivable en a si la limite est finie :\nf\'(a) = lim(h→0) [f(a+h)−f(a)] / h\n\nInterprétation géométrique :\nf\'(a) = pente de la tangente à la courbe en (a, f(a)).\nÉquation de la tangente : y = f\'(a)(x−a) + f(a)',
      remarque:'Dérivée à droite (h→0⁺) / à gauche (h→0⁻).' },
    { id:'d2', type:'Théorème', label:'Dérivabilité implique continuité',
      enonce:'f dérivable en a ⟹ f continue en a.\nRéciproque FAUSSE : f(x)=|x| est continue en 0 mais non dérivable en 0.' },
    { id:'d3', type:'Formule clé', label:'Dérivées usuelles',
      enonce:'• (xⁿ)\'  = nxⁿ⁻¹          • (√x)\' = 1/(2√x)\n• (eˣ)\'  = eˣ               • (ln x)\' = 1/x\n• (sin x)\' = cos x          • (cos x)\' = −sin x\n• (tan x)\' = 1/cos²x        • (arcsin x)\' = 1/√(1−x²)\n• (arccos x)\' = −1/√(1−x²) • (arctan x)\' = 1/(1+x²)' },
    { id:'d4', type:'Formule clé', label:'Règles de dérivation',
      enonce:'• (u+v)\' = u\'+v\'  ;  (ku)\' = ku\'\n• (uv)\' = u\'v + uv\'  (Leibniz)\n• (u/v)\' = (u\'v−uv\')/v²\n• (f∘g)\' = (f\'∘g)·g\'  (composée)\n• (f⁻¹)\'(b) = 1/f\'(f⁻¹(b))  (réciproque)' },
  ]},
  { titre:'II. Théorèmes de l\'analyse', theoremes:[
    { id:'d5', type:'Théorème', label:'Théorème de Rolle',
      enonce:'Si f est continue sur [a,b], dérivable sur ]a,b[ et f(a)=f(b),\nalors ∃ c ∈ ]a,b[ tel que f\'(c) = 0.' },
    { id:'d6', type:'Théorème', label:'Théorème des Accroissements Finis (TAF)',
      enonce:'Si f est continue sur [a,b] et dérivable sur ]a,b[,\nalors ∃ c ∈ ]a,b[ tel que :\nf(b)−f(a) = f\'(c)·(b−a)',
      remarque:'Corollaires importants :\n• f\'=0 sur ]a,b[ ⟹ f constante\n• f\'>0 sur ]a,b[ ⟹ f strictement croissante\n• |f\'|≤M ⟹ |f(b)−f(a)| ≤ M|b−a|  (inégalité des accroissements finis)' },
    { id:'d7', type:'Théorème', label:'Règle de L\'Hôpital',
      enonce:'Si lim f(x) = lim g(x) = 0 (ou ±∞) en a\net lim f\'(x)/g\'(x) = ℓ, alors lim f(x)/g(x) = ℓ.\n\nS\'applique aux formes : 0/0  et  ∞/∞',
      remarque:'Peut s\'appliquer plusieurs fois si la forme reste indéterminée.' },
  ]},
  { titre:'III. Convexité', theoremes:[
    { id:'d8', type:'Définition', label:'Fonction convexe / concave',
      enonce:'f convexe sur I ⟺ f\'\' ≥ 0 sur I  ⟺  courbe AU-DESSUS de ses tangentes.\nf concave sur I ⟺ f\'\' ≤ 0 sur I  ⟺  courbe EN-DESSOUS de ses tangentes.\n\nPoint d\'inflexion : f\'\' s\'annule ET change de signe.' },
    { id:'d9', type:'Propriété', label:'Inégalité de convexité',
      enonce:'f convexe sur [a,b] ⟹ pour tous x₁,x₂ ∈ [a,b] et λ ∈ [0,1] :\nf(λx₁+(1−λ)x₂) ≤ λf(x₁)+(1−λ)f(x₂)\nf concave : inégalité dans l\'autre sens.' },
  ]},
]},
{
  slug:'fonctions-reciproques', num:'CH 04', titre:'Fonctions Réciproques', badge:'Analyse', tome:1,
  color:'#ec4899', icon:'f⁻¹', desc:'Bijections, réciproque, arcsin, arccos, arctan, dérivées et formules.',
  sections:[
  { titre:'I. Théorie générale', theoremes:[
    { id:'r1', type:'Théorème', label:'Existence et unicité de la fonction réciproque',
      enonce:'Si f est continue et STRICTEMENT MONOTONE sur I,\nalors f réalise une bijection de I sur J=f(I),\net il existe une unique f⁻¹ : J→I telle que f⁻¹(f(x))=x.',
      remarque:'Graphiquement : courbe de f⁻¹ = symétrique de celle de f par rapport à y=x.' },
    { id:'r2', type:'Théorème', label:'Dérivée de la fonction réciproque',
      enonce:'Si f est dérivable en a avec f\'(a)≠0,\nalors f⁻¹ est dérivable en b=f(a) et :\n(f⁻¹)\'(b) = 1 / f\'(f⁻¹(b))' },
  ]},
  { titre:'II. Fonctions trigonométriques inverses', theoremes:[
    { id:'r3', type:'Définition', label:'arcsin — Sinus inverse',
      enonce:'arcsin : [−1,1] → [−π/2, π/2]\narcsin(x)=y ⟺ sin(y)=x et y∈[−π/2,π/2]\n\n• Dérivée : (arcsin x)\'=1/√(1−x²)  sur ]−1,1[\n• Impaire : arcsin(−x) = −arcsin(x)\n• arcsin(sin x) = x  pour x∈[−π/2,π/2]' },
    { id:'r4', type:'Définition', label:'arccos — Cosinus inverse',
      enonce:'arccos : [−1,1] → [0,π]\narccos(x)=y ⟺ cos(y)=x et y∈[0,π]\n\n• Dérivée : (arccos x)\'=−1/√(1−x²)  sur ]−1,1[\n• Relation fondamentale : arcsin(x)+arccos(x) = π/2' },
    { id:'r5', type:'Définition', label:'arctan — Tangente inverse',
      enonce:'arctan : ℝ → ]−π/2, π/2[\narctan(x)=y ⟺ tan(y)=x et y∈]−π/2,π/2[\n\n• Dérivée : (arctan x)\'=1/(1+x²)  sur ℝ\n• Impaire : arctan(−x) = −arctan(x)\n• lim(x→±∞) arctan x = ±π/2' },
    { id:'r6', type:'Formule clé', label:'Valeurs remarquables',
      enonce:'       arcsin    arccos    arctan\n  0  →   0        π/2        0\n 1/2 →   π/6      π/3      1/√3 = π/6\n√2/2 →   π/4      π/4        1   = π/4\n√3/2 →   π/3      π/6       √3   = π/3\n  1  →   π/2       0       → π/2 (lim)' },
  ]},
]},
{
  slug:'logarithme', num:'CH 05', titre:'Logarithme Népérien', badge:'Analyse', tome:1,
  color:'#f59e0b', icon:'ln', desc:'Définition, propriétés algébriques, dérivées composées, limites, inégalités.',
  sections:[
  { titre:'I. Définition et propriétés algébriques', theoremes:[
    { id:'ln1', type:'Définition', label:'Logarithme Népérien',
      enonce:'ln(x) = ∫₁ˣ (1/t) dt  pour x > 0\n\n• Continue et strictement croissante sur ]0,+∞[\n• ln(1) = 0  ;  ln(e) = 1\n• Dérivée : (ln x)\' = 1/x\n• Réciproque de la fonction exponentielle' },
    { id:'ln2', type:'Théorème', label:'Propriétés algébriques',
      enonce:'Pour a,b > 0 et n ∈ ℤ :\n• ln(ab) = ln a + ln b\n• ln(a/b) = ln a − ln b\n• ln(aⁿ) = n·ln a\n• ln(√a) = (1/2)ln a\n• ln(1/a) = −ln a' },
    { id:'ln3', type:'Formule clé', label:'Dérivées impliquant ln',
      enonce:'• (ln x)\' = 1/x                (x>0)\n• (ln|x|)\' = 1/x              (x≠0)\n• (ln u)\' = u\'/u              (u>0)\n• (ln|u|)\' = u\'/u            (u≠0)\n• Primitive : ∫ 1/x dx = ln|x| + C' },
  ]},
  { titre:'II. Limites et inégalités', theoremes:[
    { id:'ln4', type:'Théorème', label:'Limites fondamentales de ln',
      enonce:'• lim(x→0⁺) ln x = −∞\n• lim(x→+∞) ln x = +∞\n• lim(x→0) ln(1+x)/x = 1  ← fondamentale\n• lim(x→+∞) ln(x)/xᵅ = 0  pour α>0\n• lim(x→0⁺) x·ln x = 0  ← à connaître' },
    { id:'ln5', type:'Propriété', label:'Inégalité fondamentale du logarithme',
      enonce:'Pour tout x > 0 :   ln(x) ≤ x−1  (égalité ssi x=1)\n\nConséquence : 1−1/x ≤ ln(x) ≤ x−1\nPour tout t ∈ ℝ :  ln(1+t) ≤ t\nPour t > −1 :  t/(1+t) ≤ ln(1+t) ≤ t' },
  ]},
]},
{
  slug:'exponentielle', num:'CH 06', titre:'Fonction Exponentielle', badge:'Analyse', tome:1,
  color:'#10b981', icon:'eˣ', desc:'Réciproque de ln, propriétés, dérivées, limites, inégalité de convexité.',
  sections:[
  { titre:'I. Définition et propriétés', theoremes:[
    { id:'e1', type:'Définition', label:'Fonction exponentielle',
      enonce:'exp = réciproque de ln.\neˣ = y ⟺ ln(y) = x\n\n• Domaine : ℝ,  Image : ]0,+∞[\n• e⁰ = 1  ;  e¹ = e ≈ 2.71828\n• eˣ > 0 pour tout x ∈ ℝ\n• exp est strictement croissante sur ℝ' },
    { id:'e2', type:'Théorème', label:'Propriétés algébriques',
      enonce:'Pour a,b ∈ ℝ :\n• eᵃ·eᵇ = eᵃ⁺ᵇ\n• eᵃ/eᵇ = eᵃ⁻ᵇ\n• (eᵃ)ⁿ = eⁿᵃ\n• e⁻ˣ = 1/eˣ\n• eˢ = eᵗ ⟺ s = t' },
    { id:'e3', type:'Formule clé', label:'Dérivées et primitives de exp',
      enonce:'• (eˣ)\' = eˣ  (exp est sa propre dérivée)\n• (eᵘ)\' = u\'·eᵘ  (forme composée)\n• ∫ eˣ dx = eˣ + C\n• ∫ u\'eᵘ dx = eᵘ + C' },
    { id:'e4', type:'Théorème', label:'Limites de exp — Croissances comparées',
      enonce:'• lim(x→−∞) eˣ = 0\n• lim(x→+∞) eˣ = +∞\n• lim(x→0) (eˣ−1)/x = 1  ← fondamentale\n• lim(x→+∞) eˣ/xⁿ = +∞  pour tout n (exp domine)\n• lim(x→+∞) xⁿ·e⁻ˣ = 0  pour tout n' },
    { id:'e5', type:'Propriété', label:'Inégalité de convexité',
      enonce:'Pour tout x ∈ ℝ :   eˣ ≥ 1 + x  (égalité ssi x=0)\n\nConséquence : eˣ ≥ 1+x+x²/2 (approximation quadratique)' },
    { id:'e6', type:'Définition', label:'Puissance de base quelconque',
      enonce:'Pour a>0, a≠1 et x∈ℝ :  aˣ = eˣ·ln(a)\n• (aˣ)\' = ln(a)·aˣ\n• ∫ aˣ dx = aˣ/ln(a) + C\n• log_a(x) = ln(x)/ln(a)  (logarithme de base a)' },
  ]},
]},
{
  slug:'primitives', num:'CH 07', titre:'Primitives', badge:'Analyse', tome:1,
  color:'#06b6d4', icon:'∫', desc:'Primitives usuelles, formes composées u\'f(u), intégration par parties (IPP).',
  sections:[
  { titre:'I. Table des primitives', theoremes:[
    { id:'p1', type:'Définition', label:'Primitive d\'une fonction',
      enonce:'F est une primitive de f sur I si F\'(x)=f(x) pour tout x∈I.\nL\'ensemble des primitives est {F+C, C∈ℝ}.' },
    { id:'p2', type:'Formule clé', label:'Primitives usuelles',
      enonce:'• ∫ xⁿ dx = xⁿ⁺¹/(n+1) + C     (n≠−1)\n• ∫ 1/x dx = ln|x| + C\n• ∫ eˣ dx = eˣ + C\n• ∫ sin x dx = −cos x + C\n• ∫ cos x dx = sin x + C\n• ∫ 1/cos²x dx = tan x + C\n• ∫ 1/sin²x dx = −cotan x + C\n• ∫ 1/√(1−x²) dx = arcsin x + C\n• ∫ 1/(1+x²) dx = arctan x + C\n• ∫ sh x dx = ch x + C\n• ∫ ch x dx = sh x + C' },
    { id:'p3', type:'Formule clé', label:'Primitives composées u\'·f(u)',
      enonce:'• ∫ u\'eᵘ dx = eᵘ + C\n• ∫ u\'/u dx = ln|u| + C\n• ∫ u\'·uⁿ dx = uⁿ⁺¹/(n+1) + C  (n≠−1)\n• ∫ u\'·sin u dx = −cos u + C\n• ∫ u\'·cos u dx = sin u + C\n• ∫ u\'/√u dx = 2√u + C\n• ∫ u\'/√(1−u²) dx = arcsin u + C\n• ∫ u\'/(1+u²) dx = arctan u + C',
      remarque:'Reconnaître la forme u\'f(u) est l\'étape clé.' },
  ]},
  { titre:'II. Intégration par parties', theoremes:[
    { id:'p4', type:'Théorème', label:'Intégration Par Parties (IPP)',
      enonce:'∫ u\'v dx = [uv] − ∫ uv\' dx\n\nSur [a,b] : ∫ᵃᵇ u\'v dx = [uv]ᵃᵇ − ∫ᵃᵇ uv\' dx',
      remarque:'Stratégie : v\' doit être facilement intégrable.\nPlacez toujours ln, arcsin, arccos, arctan en v (jamais en v\').\nTypique : ∫ ln x dx  avec u\'=1, v=ln x' },
  ]},
]},
{
  slug:'integrales', num:'CH 08', titre:'Calcul Intégral', badge:'Analyse', tome:1,
  color:'#3b82f6', icon:'∫ᵃᵇ', desc:'Théorème fondamental, Chasles, valeur moyenne, aires, volumes de révolution.',
  sections:[
  { titre:'I. Théorème fondamental', theoremes:[
    { id:'i1', type:'Théorème', label:'Théorème Fondamental de l\'Analyse (TFA)',
      enonce:'Si f est continue sur [a,b], alors :\nF(x) = ∫ₐˣ f(t) dt est la primitive de f qui s\'annule en a.\n\nDe plus :  ∫ᵃᵇ f(x) dx = F(b)−F(a) = [F(x)]ᵃᵇ' },
    { id:'i2', type:'Propriété', label:'Propriétés des intégrales définies',
      enonce:'• Linéarité : ∫(αf+βg) = α∫f+β∫g\n• Chasles : ∫ᵃᶜ f = ∫ᵃᵇ f + ∫ᵇᶜ f\n• Positivité : f≥0 sur [a,b] ⟹ ∫ᵃᵇ f ≥ 0\n• Croissance : f≤g ⟹ ∫ᵃᵇ f ≤ ∫ᵃᵇ g\n• |∫ᵃᵇ f| ≤ ∫ᵃᵇ |f|  (inégalité triangulaire)' },
    { id:'i3', type:'Définition', label:'Valeur moyenne d\'une fonction',
      enonce:'La valeur moyenne de f sur [a,b] est :\nm = (1/(b−a)) · ∫ᵃᵇ f(x) dx\n\nIl existe c ∈ ]a,b[ tel que f(c) = m  (si f continue).' },
  ]},
  { titre:'II. Applications géométriques', theoremes:[
    { id:'i4', type:'Formule clé', label:'Calcul d\'aires',
      enonce:'Aire entre la courbe de f et l\'axe Ox sur [a,b] :\nA = ∫ᵃᵇ |f(x)| dx\n\nAire entre deux courbes (f ≥ g sur [a,b]) :\nA = ∫ᵃᵇ [f(x)−g(x)] dx\n\nUnité : unités d\'aire (u.a.) en contexte géométrique.' },
    { id:'i5', type:'Formule clé', label:'Volume de révolution',
      enonce:'Volume engendré par rotation de la courbe de f\nautour de l\'axe Ox sur [a,b] :\nV = π · ∫ᵃᵇ [f(x)]² dx\n\nAutour de l\'axe Oy (si f inversible) :\nV = π · ∫_{f(a)}^{f(b)} [f⁻¹(y)]² dy' },
  ]},
]},
{
  slug:'equations-differentielles', num:'CH 09', titre:'Équations Différentielles', badge:'Analyse', tome:1,
  color:'#ef4444', icon:"y'", desc:'EDO du 1er ordre y\'=ay, y\'=ay+b, y\'=f(x) ; EDO du 2ème ordre.',
  sections:[
  { titre:'I. EDO du 1er ordre', theoremes:[
    { id:'edo1', type:'Théorème', label:'y\' = ay  (équation homogène)',
      enonce:'Solutions de y\'=ay sur ℝ (a∈ℝ) :\n\ny(x) = C·eᵃˣ,  C∈ℝ\n\nAvec condition initiale y(x₀)=y₀ :\ny(x) = y₀·eᵃ⁽ˣ⁻ˣ⁰⁾' },
    { id:'edo2', type:'Théorème', label:'y\' = ay + b  (a≠0)',
      enonce:'Solution particulière constante : yₚ = −b/a\n\nSolution générale :\ny(x) = C·eᵃˣ − b/a,  C∈ℝ',
      remarque:'Méthode : 1) résoudre l\'équation homogène yₕ, 2) trouver yₚ, 3) y = yₕ + yₚ' },
    { id:'edo3', type:'Théorème', label:'y\' = f(x)  (à variables séparées)',
      enonce:'Solutions : y(x) = F(x) + C,  C∈ℝ\n(F une primitive de f)\n\nAvec y(x₀)=y₀ :\ny(x) = y₀ + ∫_{x₀}^x f(t) dt' },
    { id:'edo4', type:'Propriété', label:'Principe de superposition',
      enonce:'Si yₚ est une solution particulière de y\'=ay+b\net yₕ = C·eᵃˣ est la solution générale de y\'=ay,\nalors toute solution de y\'=ay+b s\'écrit :\ny = yₕ + yₚ = C·eᵃˣ + yₚ' },
  ]},
  { titre:'II. EDO du 2ème ordre', theoremes:[
    { id:'edo5', type:'Théorème', label:'ay\'\' + by\' + cy = 0  (à coefficients constants)',
      enonce:'Équation caractéristique : ar²+br+c = 0\nΔ = b²−4ac\n\n• Δ > 0 : r₁,r₂ ∈ ℝ distincts\n  y = C₁eʳ¹ˣ + C₂eʳ²ˣ\n\n• Δ = 0 : r₀ racine double\n  y = (C₁+C₂x)eʳ⁰ˣ\n\n• Δ < 0 : α±iβ racines complexes\n  y = eᵅˣ(C₁cos βx + C₂sin βx)',
      remarque:'Pour trouver C₁ et C₂ : conditions initiales y(x₀)=y₀ et y\'(x₀)=y₁.' },
  ]},
]},
// ─────────────────────────────────────────────────
//  TOME II — ALGÈBRE & GÉOMÉTRIE
// ─────────────────────────────────────────────────
{
  slug:'complexes', num:'CH 01', titre:'Nombres Complexes', badge:'Algèbre', tome:2,
  color:'#7c3aed', icon:'ℂ', desc:'Forme algébrique, Euler, De Moivre, racines, transformations du plan.',
  sections:[
  { titre:'I. Forme algébrique', theoremes:[
    { id:'cx1', type:'Définition', label:'Nombre complexe — Définition',
      enonce:'z = a + ib  (a,b∈ℝ, i²=−1)\n• Re(z) = a : partie réelle\n• Im(z) = b : partie imaginaire\n• z̄ = a−ib : conjugué\n• |z| = √(a²+b²) : module' },
    { id:'cx2', type:'Propriété', label:'Module et conjugué',
      enonce:'• z·z̄ = |z|²  ⟹  1/z = z̄/|z|²  (z≠0)\n• z+z̄ = 2Re(z)  ;  z−z̄ = 2i·Im(z)\n• |z₁z₂| = |z₁|·|z₂|  ;  |z₁/z₂| = |z₁|/|z₂|\n• |z₁+z₂| ≤ |z₁|+|z₂|  (inégalité triangulaire)\n• z réel ⟺ z=z̄  ;  z pur imaginaire ⟺ z+z̄=0' },
  ]},
  { titre:'II. Forme exponentielle et De Moivre', theoremes:[
    { id:'cx3', type:'Théorème', label:'Formule d\'Euler',
      enonce:'e^(iθ) = cos θ + i sin θ  pour tout θ ∈ ℝ\n\nConséquences :\n• cos θ = (e^(iθ)+e^(−iθ))/2\n• sin θ = (e^(iθ)−e^(−iθ))/(2i)\n• e^(iπ)+1 = 0  (identité d\'Euler)',
      remarque:'e^(iπ) = −1 est considérée la plus belle formule des mathématiques.' },
    { id:'cx4', type:'Théorème', label:'Formule de De Moivre',
      enonce:'(cos θ+i sin θ)ⁿ = cos(nθ)+i sin(nθ)\nOu :  (e^(iθ))ⁿ = e^(inθ)\n\nUsages :\n• Développer cos(nθ), sin(nθ) en puissances\n• Linéariser cosⁿθ, sinⁿθ' },
    { id:'cx5', type:'Propriété', label:'Multiplication — Division — Argument',
      enonce:'Si z₁=r₁e^(iθ₁) et z₂=r₂e^(iθ₂) :\n• z₁z₂ = r₁r₂·e^(i(θ₁+θ₂))\n  → arg(z₁z₂) = arg(z₁)+arg(z₂)  [mod 2π]\n• z₁/z₂ = (r₁/r₂)·e^(i(θ₁−θ₂))  (z₂≠0)\n• zⁿ = rⁿ·e^(inθ)\n• z̄ = re^(−iθ)' },
  ]},
  { titre:'III. Racines — Géométrie complexe', theoremes:[
    { id:'cx6', type:'Théorème', label:'Racines n-ièmes d\'un nombre complexe',
      enonce:'Les n racines n-ièmes de z₀=ρe^(iφ) sont :\nzₖ = ρ^(1/n)·e^(i(φ+2kπ)/n),  k=0,1,...,n−1\n\nElles forment les sommets d\'un polygone régulier\nà n côtés inscrit dans un cercle de rayon ρ^(1/n).' },
    { id:'cx7', type:'Théorème', label:'Équations dans ℂ',
      enonce:'az²+bz+c=0 (a≠0), Δ=b²−4ac\n• Δ=0 : racine double z=−b/(2a)\n• Δ=δ²∈ℂ* : z₁=(−b+δ)/(2a), z₂=(−b−δ)/(2a)\nThéorème fondamental de l\'algèbre :\nTout polynôme de degré n a exactement n racines dans ℂ.' },
    { id:'cx8', type:'Propriété', label:'Transformations du plan complexe',
      enonce:'Si M a pour affixe z et M\' a pour affixe z\' :\n• Translation de vecteur u⃗(a+ib) : z\'=z+(a+ib)\n• Rotation de centre O, angle θ : z\'=e^(iθ)·z\n• Rotation de centre Ω(ω), angle θ : z\'−ω=e^(iθ)(z−ω)\n• Homothétie de centre O, rapport k : z\'=kz\n• Distance : |z_A−z_B| = AB' },
  ]},
]},
{
  slug:'geometrie-espace', num:'CH 02', titre:"Géométrie dans l'Espace", badge:'Géométrie', tome:2,
  color:'#059669', icon:'↗', desc:'Produit scalaire, vectoriel, plans, droites, distances, sphère.',
  sections:[
  { titre:'I. Produits scalaire et vectoriel', theoremes:[
    { id:'g1', type:'Définition', label:'Produit scalaire dans l\'espace',
      enonce:'u⃗(x₁,y₁,z₁)·v⃗(x₂,y₂,z₂) = x₁x₂+y₁y₂+z₁z₂\n= |u⃗|·|v⃗|·cos θ\n\n• u⃗·v⃗=0 ⟺ u⃗⊥v⃗\n• |u⃗|=√(u⃗·u⃗) = √(x²+y²+z²)\n• u⃗·v⃗ = u⃗·w⃗ et u⃗≠0⃗ ⟹ v⃗=w⃗ (si u⃗ est une base)' },
    { id:'g2', type:'Définition', label:'Produit vectoriel',
      enonce:'u⃗(x₁,y₁,z₁) × v⃗(x₂,y₂,z₂) =\n(y₁z₂−z₁y₂,  z₁x₂−x₁z₂,  x₁y₂−y₁x₂)\n\n• u⃗×v⃗ ⊥ u⃗  et  u⃗×v⃗ ⊥ v⃗\n• |u⃗×v⃗| = |u⃗|·|v⃗|·|sin θ|  = aire du parallélogramme\n• u⃗×v⃗ = 0⃗ ⟺ u⃗ et v⃗ colinéaires\n• Anticommutatif : v⃗×u⃗ = −(u⃗×v⃗)' },
    { id:'g3', type:'Formule clé', label:'Produit mixte — Volume',
      enonce:'[u⃗,v⃗,w⃗] = u⃗·(v⃗×w⃗) = déterminant 3×3\n\n• [u⃗,v⃗,w⃗]=0 ⟺ u⃗,v⃗,w⃗ coplanaires\n• |[u⃗,v⃗,w⃗]| = volume du parallélépipède' },
  ]},
  { titre:'II. Plans et droites dans l\'espace', theoremes:[
    { id:'g4', type:'Formule clé', label:'Équation cartésienne d\'un plan',
      enonce:'Plan de vecteur normal n⃗(a,b,c) passant par A(x₀,y₀,z₀) :\na(x−x₀) + b(y−y₀) + c(z−z₀) = 0\nou  ax + by + cz + d = 0\n\nDeux plans sont parallèles ⟺ leurs normales sont colinéaires.\nDeux plans sont ⊥ ⟺ n⃗₁·n⃗₂=0' },
    { id:'g5', type:'Formule clé', label:'Droite dans l\'espace',
      enonce:'Droite par A(x₀,y₀,z₀), vecteur directeur u⃗(l,m,n) :\n\nParamétrique :\nx=x₀+tl,  y=y₀+tm,  z=z₀+tn  (t∈ℝ)\n\nSymétrique :\n(x−x₀)/l = (y−y₀)/m = (z−z₀)/n  (si l,m,n≠0)' },
    { id:'g6', type:'Formule clé', label:'Distances dans l\'espace',
      enonce:'Distance point M(x₀,y₀,z₀) au plan ax+by+cz+d=0 :\nd(M,P) = |ax₀+by₀+cz₀+d| / √(a²+b²+c²)\n\nDistance entre deux droites gauches D₁,D₂ :\nd = |AB⃗·(u⃗₁×u⃗₂)| / |u⃗₁×u⃗₂|\noù A∈D₁, B∈D₂' },
    { id:'g7', type:'Définition', label:'Sphère',
      enonce:'Sphère de centre Ω(a,b,c) et rayon R>0 :\n(x−a)²+(y−b)²+(z−c)² = R²\n\nSoit M(x,y,z), la sphère = {M : ΩM=R}\n\nSection par un plan : cercle (si d(Ω,plan)<R)\nPlan tangent en M₀ : \n(x₀−a)(x−a)+(y₀−b)(y−b)+(z₀−c)(z−c) = R²' },
  ]},
]},
{
  slug:'probabilites', num:'CH 03', titre:'Probabilités', badge:'Probabilités', tome:2,
  color:'#d97706', icon:'P()', desc:'Probabilités conditionnelles, probabilités totales, Bayes, indépendance.',
  sections:[
  { titre:'I. Probabilités conditionnelles', theoremes:[
    { id:'pr1', type:'Définition', label:'Probabilité conditionnelle',
      enonce:'P(A|B) = P(A∩B) / P(B)  si P(B)>0\n\nFormules de multiplication :\n• P(A∩B) = P(B)·P(A|B)\n• P(A∩B) = P(A)·P(B|A)\n• P(A∩B∩C) = P(A)·P(B|A)·P(C|A∩B)' },
    { id:'pr2', type:'Théorème', label:'Formule des Probabilités Totales',
      enonce:'Si (B₁,...,Bₙ) est une PARTITION de Ω :\n(incompatibles deux à deux, exhaustifs, P(Bᵢ)>0)\n\nAlors pour tout événement A :\nP(A) = Σᵢ P(Bᵢ)·P(A|Bᵢ)',
      remarque:'Visualisation : arbre des probabilités → multiplier les branches, additionner les chemins.' },
    { id:'pr3', type:'Théorème', label:'Formule de Bayes',
      enonce:'Si (B₁,...,Bₙ) partition de Ω :\nP(Bₖ|A) = P(Bₖ)·P(A|Bₖ) / Σᵢ P(Bᵢ)·P(A|Bᵢ)\n\nInterprétation : remonter d\'une conséquence (A) vers sa cause (Bₖ).',
      remarque:'Très utilisé en médecine (sensibilité/spécificité d\'un test), en IA...' },
    { id:'pr4', type:'Définition', label:'Événements indépendants',
      enonce:'A et B sont INDÉPENDANTS si :\nP(A∩B) = P(A)·P(B)\n\nÉquivalent à : P(A|B)=P(A) (si P(B)>0)\n\n⚠ Indépendance ≠ Incompatibilité !\n• Incompatibles : P(A∩B)=0\n• Indépendants : P(A∩B)=P(A)·P(B)' },
  ]},
]},
{
  slug:'variables-aleatoires', num:'CH 04', titre:'Variables Aléatoires', badge:'Probabilités', tome:2,
  color:'#dc2626', icon:'X~', desc:'VA discrètes, espérance, variance, Bernoulli, Binomiale, inégalités.',
  sections:[
  { titre:'I. Variable aléatoire discrète', theoremes:[
    { id:'va1', type:'Définition', label:'Variable aléatoire discrète',
      enonce:'X est une VA discrète si elle prend des valeurs x₁,...,xₙ\navec probabilités P(X=xᵢ)=pᵢ (pᵢ≥0, Σpᵢ=1).\n\nLoi de X : tableau (valeurs, probabilités).' },
    { id:'va2', type:'Définition', label:'Espérance mathématique',
      enonce:'E(X) = Σᵢ xᵢ·pᵢ  (valeur moyenne attendue)\n\nPropriétés :\n• E(aX+b) = a·E(X)+b  (linéarité)\n• E(X+Y) = E(X)+E(Y)\n• E(XY) = E(X)·E(Y)  si X,Y INDÉPENDANTS' },
    { id:'va3', type:'Définition', label:'Variance et Écart-type',
      enonce:'V(X) = E(X²)−[E(X)]²  = E[(X−E(X))²]\nσ(X) = √V(X)  (écart-type)\n\nPropriétés :\n• V(aX+b) = a²·V(X)\n• V(X+Y) = V(X)+V(Y)  si X,Y indépendants' },
  ]},
  { titre:'II. Lois usuelles et inégalités', theoremes:[
    { id:'va4', type:'Définition', label:'Loi de Bernoulli B(1,p)',
      enonce:'P(X=1)=p  ;  P(X=0)=q=1−p\n• E(X)=p\n• V(X)=pq=p(1−p)\n\nModélise : succès/échec d\'une seule épreuve.' },
    { id:'va5', type:'Théorème', label:'Loi Binomiale B(n,p)',
      enonce:'X = nombre de succès dans n épreuves de Bernoulli\nindépendantes de même paramètre p.\n\nP(X=k) = C(n,k)·pᵏ·(1−p)ⁿ⁻ᵏ,  k=0,...,n\n\n• E(X) = np\n• V(X) = np(1−p)\n• σ(X) = √(np(1−p))',
      remarque:'C(n,k) = n!/[k!(n−k)!]\nTableau de valeurs utile pour p=0.5 : distribution symétrique.' },
    { id:'va6', type:'Théorème', label:'Inégalité de Markov',
      enonce:'Si X≥0 et a>0 :\nP(X≥a) ≤ E(X)/a\n\nUtile pour majorer les probabilités de grands dépassements.' },
    { id:'va7', type:'Théorème', label:'Inégalité de Bienaymé-Tchebychev',
      enonce:'Pour tout ε>0 :\nP(|X−E(X)|≥ε) ≤ V(X)/ε²\n\nOu de façon équivalente :\nP(|X−μ|≥kσ) ≤ 1/k²\n\nInterprétation : au moins 1−1/k² des valeurs sont dans [μ−kσ, μ+kσ].',
      remarque:'Pour k=2 : P(|X−μ|≥2σ)≤1/4, donc P(|X−μ|<2σ)≥3/4.' },
  ]},
]},
{
  slug:'statistiques', num:'CH 05', titre:'Statistiques', badge:'Statistiques', tome:2,
  color:'#0891b2', icon:'r', desc:'Série à deux variables, covariance, corrélation, droite de régression.',
  sections:[
  { titre:'I. Série statistique à deux variables', theoremes:[
    { id:'st1', type:'Définition', label:'Indicateurs d\'une série (xᵢ,yᵢ)',
      enonce:'Pour n points (xᵢ,yᵢ), i=1..n :\n\n• Moyennes : x̄=(1/n)Σxᵢ ,  ȳ=(1/n)Σyᵢ\n• Variances : V(x)=(1/n)Σxᵢ²−x̄²\n            V(y)=(1/n)Σyᵢ²−ȳ²\n• Covariance : cov(x,y)=(1/n)Σxᵢyᵢ−x̄·ȳ\n• Écarts-type : σₓ=√V(x) ,  σᵧ=√V(y)' },
    { id:'st2', type:'Définition', label:'Coefficient de corrélation linéaire',
      enonce:'r = cov(x,y) / (σₓ·σᵧ)\n\n• r ∈ [−1, 1]  (toujours)\n• |r| proche de 1 → forte corrélation linéaire\n• |r| proche de 0 → faible corrélation linéaire\n• r>0 : corrélation positive (même sens)\n• r<0 : corrélation négative (sens opposé)',
      remarque:'r=1 ou r=−1 : parfaite alignement des points.' },
    { id:'st3', type:'Formule clé', label:'Droite de régression (moindres carrés)',
      enonce:'Droite de régression de y en x :\ny − ȳ = [cov(x,y)/V(x)]·(x−x̄)\n\nCoefficients :\n• a = cov(x,y)/V(x)  (pente)\n• b = ȳ − a·x̄          (ordonnée à l\'origine)\nÉquation : y = ax + b\n\nPasse TOUJOURS par G(x̄, ȳ).',
      remarque:'Droite de régression de x en y : symétrique, a\'=cov/V(y).' },
    { id:'st4', type:'Propriété', label:'Coefficient de détermination',
      enonce:'r² ∈ [0,1] : proportion de la variance de y expliquée par x.\nr²=1 : ajustement parfait.\nr²=0 : aucune relation linéaire.\n\nRègle pratique : si |r|>0.8, régression linéaire fiable.' },
  ]},
]},
]

// ═══════════════════════════════════════════════════
// COMPOSANT THÉORÈME
// ═══════════════════════════════════════════════════
function ThmCard({ t, color }: { t: Thm; color: string }) {
  const [open, setOpen] = useState(false)
  const [done, setDone] = useState(false)
  const ts = TYPE_STYLE[t.type]
  return (
    <div style={{ background: 'var(--surface)', border: `1px solid ${open ? ts.border : 'var(--border)'}`, borderLeft: `3px solid ${color}`, borderRadius: 12, overflow: 'hidden', opacity: done ? 0.6 : 1, transition: 'all 0.2s' }}>
      <div style={{ padding: '14px 16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8, flexWrap: 'wrap' }}>
              <span style={{ fontSize: 10, fontWeight: 700, background: ts.bg, color: ts.color, border: `1px solid ${ts.border}`, padding: '2px 8px', borderRadius: 20 }}>{t.type}</span>
              <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>{t.label}</span>
            </div>
            <pre style={{ fontSize: 13, color: 'var(--text2)', fontFamily: 'var(--font-mono)', whiteSpace: 'pre-wrap', lineHeight: 1.75,
              display: open ? 'block' : '-webkit-box',
              WebkitLineClamp: open ? undefined : 3,
              WebkitBoxOrient: 'vertical' as any,
              overflow: open ? 'visible' : 'hidden'
            }}>
              {t.enonce}
            </pre>
            {open && t.remarque && (
              <div style={{ marginTop: 12, paddingLeft: 12, borderLeft: '2px solid rgba(245,200,66,0.5)', fontSize: 12, color: 'rgba(245,200,66,0.85)', fontStyle: 'italic', lineHeight: 1.6 }}>
                ⚡ {t.remarque}
              </div>
            )}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flexShrink: 0 }}>
            <button onClick={() => setOpen(p => !p)}
              style={{ background: 'var(--surface2)', border: '1px solid var(--border2)', borderRadius: 8, width: 30, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--text2)', fontSize: 18 }}>
              {open ? '−' : '+'}
            </button>
            <button onClick={() => setDone(p => !p)} title={done ? 'Marquer non étudié' : 'Marquer étudié'}
              style={{ background: done ? 'rgba(6,214,160,0.15)' : 'var(--surface2)', border: done ? '1px solid rgba(6,214,160,0.4)' : '1px solid var(--border2)', borderRadius: 8, width: 30, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: 14 }}>
              {done ? '✓' : '○'}
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
export default function SciencesExpChapPage({ params }: { params: { slug: string } }) {
  const ch = CHAPITRES.find(c => c.slug === params.slug) ?? CHAPITRES[0]
  const idx = CHAPITRES.indexOf(ch)
  const prev = CHAPITRES[idx - 1]
  const next = CHAPITRES[idx + 1]
  const t1 = CHAPITRES.filter(c => c.tome === 1)
  const t2 = CHAPITRES.filter(c => c.tome === 2)

  // Comptage progression (via state global simplifié — par chapitre courant)
  const allThms = ch.sections.flatMap(s => s.theoremes)
  const [done, setDone] = useState<Record<string, boolean>>({})
  const doneCount = Object.values(done).filter(Boolean).length
  const pct = allThms.length ? Math.round(doneCount / allThms.length * 100) : 0

  return (
    <>
      <Navbar />
      <main style={{ position: 'relative', zIndex: 1, paddingTop: 80 }}>
        {/* Breadcrumb */}
        <div style={{ borderBottom: '1px solid var(--border)', padding: '14px clamp(20px,5vw,60px)', display: 'flex', gap: 8, fontSize: 13, color: 'var(--muted)', alignItems: 'center', flexWrap: 'wrap' }}>
          <Link href="/bac" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Bac</Link><span>›</span>
          <Link href="/bac/sciences-exp" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Sciences Exp</Link><span>›</span>
          <span style={{ color: 'var(--text)' }}>{ch.titre}</span>
        </div>

        <div style={{ display: 'flex', minHeight: 'calc(100vh - 140px)' }}>

          {/* ── SIDEBAR ── */}
          <aside style={{ width: 252, flexShrink: 0, borderRight: '1px solid var(--border)', padding: '24px 14px', position: 'sticky', top: 80, height: 'calc(100vh - 80px)', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 4 }}>
            <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--muted)', marginBottom: 6, paddingLeft: 10 }}>Tome I — Analyse</div>
            {t1.map(c => (
              <Link key={c.slug} href={`/bac/sciences-exp/${c.slug}`} style={{ textDecoration: 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', borderRadius: 10,
                  background: c.slug === ch.slug ? `${c.color}18` : 'transparent',
                  border: c.slug === ch.slug ? `1px solid ${c.color}35` : '1px solid transparent',
                  transition: 'all 0.15s' }}>
                  <div style={{ width: 7, height: 7, borderRadius: '50%', background: c.slug === ch.slug ? c.color : 'var(--surface3)', flexShrink: 0 }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 10, color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>{c.num}</div>
                    <div style={{ fontSize: 12, color: c.slug === ch.slug ? 'var(--text)' : 'var(--text2)', fontWeight: c.slug === ch.slug ? 600 : 400, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.titre}</div>
                  </div>
                </div>
              </Link>
            ))}
            <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--muted)', marginBottom: 6, paddingLeft: 10, marginTop: 14 }}>Tome II — Algèbre & Géo</div>
            {t2.map(c => (
              <Link key={c.slug} href={`/bac/sciences-exp/${c.slug}`} style={{ textDecoration: 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', borderRadius: 10,
                  background: c.slug === ch.slug ? `${c.color}18` : 'transparent',
                  border: c.slug === ch.slug ? `1px solid ${c.color}35` : '1px solid transparent',
                  transition: 'all 0.15s' }}>
                  <div style={{ width: 7, height: 7, borderRadius: '50%', background: c.slug === ch.slug ? c.color : 'var(--surface3)', flexShrink: 0 }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 10, color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>{c.num}</div>
                    <div style={{ fontSize: 12, color: c.slug === ch.slug ? 'var(--text)' : 'var(--text2)', fontWeight: c.slug === ch.slug ? 600 : 400, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.titre}</div>
                  </div>
                </div>
              </Link>
            ))}
          </aside>

          {/* ── CONTENU PRINCIPAL ── */}
          <div style={{ flex: 1, padding: '32px clamp(20px,4vw,52px)', overflowX: 'hidden', maxWidth: '100%' }}>

            {/* En-tête chapitre */}
            <div style={{ background: `linear-gradient(135deg,${ch.color}18,${ch.color}05)`, border: `1px solid ${ch.color}30`, borderRadius: 16, padding: '24px 28px', marginBottom: 28, position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', right: 24, top: 12, fontSize: 60, opacity: 0.07, fontWeight: 900, color: ch.color }}>{ch.icon}</div>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 10 }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)', background: 'var(--surface2)', padding: '2px 8px', borderRadius: 6 }}>{ch.num}</span>
                <span style={{ fontSize: 11, background: `${ch.color}22`, color: ch.color, padding: '2px 10px', borderRadius: 12, fontWeight: 600 }}>Tome {ch.tome}</span>
                <span style={{ fontSize: 11, color: 'var(--muted)' }}>{allThms.length} éléments</span>
              </div>
              <h2 style={{ fontSize: 26, marginBottom: 6 }}>{ch.titre}</h2>
              <p style={{ fontSize: 13, color: 'var(--text2)', marginBottom: 18 }}>{ch.desc}</p>
              {/* Barre de progression */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--muted)', marginBottom: 6 }}>
                  <span>Progression</span>
                  <span style={{ color: pct === 100 ? '#06d6a0' : 'var(--muted)' }}>{pct}%</span>
                </div>
                <div style={{ height: 6, background: 'var(--surface2)', borderRadius: 6, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${pct}%`, background: `linear-gradient(90deg,${ch.color},#06d6a0)`, borderRadius: 6, transition: 'width 0.4s' }} />
                </div>
                <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 5 }}>{doneCount} / {allThms.length} étudiés</div>
              </div>
            </div>

            {/* Légende */}
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center', marginBottom: 28, padding: '12px 16px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12 }}>
              <span style={{ fontSize: 11, color: 'var(--muted)', marginRight: 4 }}>Légende</span>
              {(Object.entries(TYPE_STYLE) as [TType, typeof TYPE_STYLE[TType]][]).map(([type, s]) => (
                <span key={type} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, background: s.bg, color: s.color, border: `1px solid ${s.border}`, padding: '3px 10px', borderRadius: 20 }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: s.color, display: 'inline-block', flexShrink: 0 }} />
                  {type}
                </span>
              ))}
            </div>

            {/* Sections et théorèmes */}
            {ch.sections.map((sec, si) => (
              <div key={si} style={{ marginBottom: 36 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                  <div style={{ height: 1, flex: 1, background: 'var(--border2)' }} />
                  <h3 style={{ fontSize: 12, fontWeight: 700, color: 'var(--text2)', textTransform: 'uppercase', letterSpacing: '0.12em', whiteSpace: 'nowrap', padding: '0 8px' }}>{sec.titre}</h3>
                  <div style={{ height: 1, flex: 1, background: 'var(--border2)' }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {sec.theoremes.map(t => (
                    <ThmCard key={t.id} t={t} color={ch.color} />
                  ))}
                </div>
              </div>
            ))}

            {/* Navigation prev / next */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 48, paddingTop: 32, borderTop: '1px solid var(--border)' }}>
              {prev ? (
                <Link href={`/bac/sciences-exp/${prev.slug}`} style={{ textDecoration: 'none' }}>
                  <div className="card" style={{ padding: 16, display: 'flex', gap: 12, alignItems: 'center', transition: 'transform 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'translateX(-3px)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'translateX(0)'}>
                    <span style={{ color: 'var(--muted)', fontSize: 20 }}>←</span>
                    <div>
                      <div style={{ fontSize: 10, color: 'var(--muted)', marginBottom: 2 }}>{prev.num}</div>
                      <div style={{ fontSize: 14, fontWeight: 600 }}>{prev.titre}</div>
                    </div>
                  </div>
                </Link>
              ) : <div />}
              {next ? (
                <Link href={`/bac/sciences-exp/${next.slug}`} style={{ textDecoration: 'none' }}>
                  <div className="card" style={{ padding: 16, display: 'flex', gap: 12, alignItems: 'center', justifyContent: 'flex-end', transition: 'transform 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'translateX(3px)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'translateX(0)'}>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: 10, color: 'var(--muted)', marginBottom: 2 }}>{next.num}</div>
                      <div style={{ fontSize: 14, fontWeight: 600 }}>{next.titre}</div>
                    </div>
                    <span style={{ color: 'var(--muted)', fontSize: 20 }}>→</span>
                  </div>
                </Link>
              ) : <div />}
            </div>

            <div style={{ marginTop: 32, textAlign: 'center' }}>
              <p style={{ fontSize: 11, color: 'var(--muted)' }}>Programme CNP officiel · Manuel 222433 (T1) + 222434 (T2) · Bac Tunisie 2026</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

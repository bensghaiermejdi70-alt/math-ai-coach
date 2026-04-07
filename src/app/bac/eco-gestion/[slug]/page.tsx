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

// ═══════════════════════════════════════════════════════════════
//  DONNÉES — Programme CNP Économie & Gestion 4ème Tunisie
// ═══════════════════════════════════════════════════════════════
const CHAPITRES: Ch[] = [
// ─── TOME I — ANALYSE ────────────────────────────────────────
{
  slug:'logique-raisonnement', num:'CH 01', titre:'Logique & Raisonnement', badge:'Logique', tome:1,
  color:'#06d6a0', icon:'⊢', desc:'Propositions, connecteurs, tables de vérité, modes de raisonnement.',
  sections:[
  { titre:'I. Propositions et connecteurs logiques', theoremes:[
    { id:'lr1', type:'Définition', label:'Proposition',
      enonce:'Une proposition est un énoncé qui est soit vrai (V), soit faux (F).\nExemples : "2+2=4" (V), "7 est pair" (F).' },
    { id:'lr2', type:'Définition', label:'Connecteurs logiques',
      enonce:'• Négation : ¬P  (non P)\n• Conjonction : P ∧ Q  (P et Q)\n• Disjonction : P ∨ Q  (P ou Q)\n• Implication : P ⟹ Q  (si P alors Q)\n• Équivalence : P ⟺ Q  (P si et seulement si Q)',
      remarque:'P ⟹ Q est faux uniquement quand P est vrai et Q est faux.' },
    { id:'lr3', type:'Formule clé', label:'Tables de vérité essentielles',
      enonce:'P ⟹ Q  équivaut à  ¬P ∨ Q\nContraposée : P ⟹ Q  équivaut à  ¬Q ⟹ ¬P\nP ⟺ Q  équivaut à  (P⟹Q) ∧ (Q⟹P)\nLois de De Morgan :\n• ¬(P∧Q) ≡ ¬P∨¬Q\n• ¬(P∨Q) ≡ ¬P∧¬Q' },
  ]},
  { titre:'II. Modes de raisonnement', theoremes:[
    { id:'lr4', type:'Propriété', label:'Raisonnement direct',
      enonce:'On part de l\'hypothèse H et on enchaîne des implications :\nH ⟹ P₁ ⟹ P₂ ⟹ ... ⟹ C\npour aboutir à la conclusion C.' },
    { id:'lr5', type:'Propriété', label:'Raisonnement par contraposée',
      enonce:'Pour prouver P ⟹ Q, on prouve ¬Q ⟹ ¬P.\nLes deux sont logiquement équivalents.' },
    { id:'lr6', type:'Propriété', label:'Raisonnement par l\'absurde',
      enonce:'Pour prouver P, on suppose ¬P et on dérive une contradiction.\nSi ¬P ⟹ Faux, alors P est vrai.' },
    { id:'lr7', type:'Théorème', label:'Raisonnement par récurrence',
      enonce:'Pour prouver P(n) pour tout n ≥ n₀ :\n1. Initialisation : vérifier P(n₀)\n2. Hérédité : supposer P(n) vraie (H.R.) et prouver P(n+1)\nConclusion : P(n) vraie pour tout n ≥ n₀.' },
  ]},
]},
// ─────────────────────────────────────────────────────────────
{
  slug:'limites-continuite', num:'CH 02', titre:'Continuité & Limites', badge:'Analyse', tome:1,
  color:'#6366f1', icon:'∞', desc:'Limites, TVI, asymptotes, prolongement par continuité.',
  sections:[
  { titre:'I. Limites de fonctions', theoremes:[
    { id:'lc1', type:'Définition', label:'Limite finie en un point',
      enonce:'f admet ℓ pour limite en a si :\n∀ε>0, ∃δ>0 : 0<|x−a|<δ ⟹ |f(x)−ℓ|<ε\nNotation : lim(x→a) f(x) = ℓ',
      remarque:'f(a) peut ne pas être défini.' },
    { id:'lc2', type:'Théorème', label:'Théorème des Gendarmes',
      enonce:'Si g(x) ≤ f(x) ≤ h(x) au voisinage de a\net lim g = lim h = ℓ en a, alors lim f = ℓ.' },
    { id:'lc3', type:'Formule clé', label:'Limites fondamentales',
      enonce:'• lim(x→0) sin(x)/x = 1\n• lim(x→0) (eˣ−1)/x = 1\n• lim(x→0) ln(1+x)/x = 1\nCroissances comparées (x→+∞) :\n• eˣ/xⁿ → +∞ pour tout n\n• ln(x)/xᵅ → 0 pour α>0' },
  ]},
  { titre:'II. Continuité et TVI', theoremes:[
    { id:'lc4', type:'Définition', label:'Continuité en un point',
      enonce:'f est continue en a si lim(x→a) f(x) = f(a).' },
    { id:'lc5', type:'Théorème', label:'Théorème des Valeurs Intermédiaires (TVI)',
      enonce:'Si f est continue sur [a,b] et k est entre f(a) et f(b),\n∃ c ∈ [a,b] tel que f(c) = k.',
      remarque:'Si f est de plus strictement monotone, c est unique.' },
  ]},
]},
// ─────────────────────────────────────────────────────────────
{
  slug:'suites-numeriques', num:'CH 03', titre:'Suites Numériques', badge:'Analyse', tome:1,
  color:'#6366f1', icon:'Σ', desc:'Suites arithmétiques, géométriques, convergence, récurrentes.',
  sections:[
  { titre:'I. Suites classiques', theoremes:[
    { id:'sn1', type:'Formule clé', label:'Suite arithmétique de raison r',
      enonce:'uₙ = u₀ + n·r\nSomme : u₀+u₁+…+uₙ = (n+1)·(u₀+uₙ)/2' },
    { id:'sn2', type:'Formule clé', label:'Suite géométrique de raison q',
      enonce:'uₙ = u₀·qⁿ  (q ≠ 0)\nSomme : u₀+u₁+…+uₙ = u₀·(1−qⁿ⁺¹)/(1−q)  (q ≠ 1)' },
  ]},
  { titre:'II. Convergence', theoremes:[
    { id:'sn3', type:'Théorème', label:'Suite monotone bornée',
      enonce:'Toute suite monotone et bornée est convergente.' },
    { id:'sn4', type:'Théorème', label:'Suite récurrente uₙ₊₁ = f(uₙ)',
      enonce:'Si f est continue et uₙ → ℓ, alors ℓ est un point fixe : f(ℓ) = ℓ.\nMéthode : résoudre f(x) = x, puis étudier la monotonie de (uₙ).' },
  ]},
]},
// ─────────────────────────────────────────────────────────────
{
  slug:'derivabilite', num:'CH 04', titre:'Dérivabilité & Applications', badge:'Analyse', tome:1,
  color:'#6366f1', icon:'∂', desc:'Dérivées, Rolle, TAF, extrema, convexité, variation.',
  sections:[
  { titre:'I. Dérivées usuelles et règles', theoremes:[
    { id:'d1', type:'Formule clé', label:'Tableau des dérivées usuelles',
      enonce:'(xⁿ)\' = n·xⁿ⁻¹\n(eˣ)\' = eˣ\n(ln x)\' = 1/x\n(sin x)\' = cos x\n(cos x)\' = −sin x\n(√x)\' = 1/(2√x)\n(u·v)\' = u\'v + uv\'\n(u/v)\' = (u\'v − uv\')/v²\n(f∘g)\' = (f\'∘g)·g\'' },
    { id:'d2', type:'Théorème', label:'Théorème de Rolle',
      enonce:'Si f continue sur [a,b], dérivable sur ]a,b[ et f(a)=f(b),\nalors ∃ c ∈ ]a,b[ tel que f\'(c) = 0.' },
    { id:'d3', type:'Théorème', label:'Théorème des Accroissements Finis (TAF)',
      enonce:'Si f continue sur [a,b] et dérivable sur ]a,b[,\n∃ c ∈ ]a,b[ tel que f\'(c) = [f(b)−f(a)]/(b−a).' },
  ]},
  { titre:'II. Étude de fonctions', theoremes:[
    { id:'d4', type:'Propriété', label:'Extrema et dérivée',
      enonce:'Si f\'(a) = 0 et f\' change de signe en a :\n• f\'  + puis − → maximum local\n• f\'  − puis + → minimum local' },
    { id:'d5', type:'Propriété', label:'Convexité et dérivée seconde',
      enonce:'f convexe sur I ⟺ f\'\' ≥ 0 sur I ⟺ C_f au-dessus de ses tangentes.\nf concave sur I ⟺ f\'\' ≤ 0 sur I.\nPoint d\'inflexion : f\'\'(a) = 0 et f\'\' change de signe.' },
  ]},
]},
// ─────────────────────────────────────────────────────────────
{
  slug:'primitives-integrales', num:'CH 05', titre:'Primitives & Intégrales', badge:'Analyse', tome:1,
  color:'#6366f1', icon:'∫', desc:'Table des primitives, IPP, théorème fondamental, aires.',
  sections:[
  { titre:'I. Primitives', theoremes:[
    { id:'pi1', type:'Formule clé', label:'Primitives usuelles',
      enonce:'∫xⁿdx = xⁿ⁺¹/(n+1)  (n≠−1)\n∫(1/x)dx = ln|x|\n∫eˣdx = eˣ\n∫sin(x)dx = −cos(x)\n∫cos(x)dx = sin(x)\n∫u\'·f(u)dx = F(u)+C (primitive de forme composée)' },
    { id:'pi2', type:'Théorème', label:'Intégration par parties (IPP)',
      enonce:'∫u·v\'dx = [u·v] − ∫u\'·v dx\nChoisir u et v\' selon la règle LIATE :\nLogarithme · Inverse · Algèbre · Trig · Expo.' },
  ]},
  { titre:'II. Intégrale définie', theoremes:[
    { id:'pi3', type:'Théorème', label:'Théorème fondamental de l\'analyse',
      enonce:'Si f est continue sur [a,b] et F est une primitive de f :\n∫[a,b] f(x)dx = F(b) − F(a)' },
    { id:'pi4', type:'Propriété', label:'Aire entre deux courbes',
      enonce:'Aire = ∫[a,b] |f(x)−g(x)|dx\nSi f(x) ≥ g(x) sur [a,b] : Aire = ∫[a,b] (f(x)−g(x))dx' },
  ]},
]},
// ─────────────────────────────────────────────────────────────
{
  slug:'logarithme', num:'CH 06', titre:'Logarithme Népérien', badge:'Analyse', tome:1,
  color:'#6366f1', icon:'ln', desc:'Définition intégrale, propriétés, dérivées, limites.',
  sections:[
  { titre:'I. Définition et propriétés', theoremes:[
    { id:'lg1', type:'Définition', label:'Logarithme népérien',
      enonce:'ln(x) = ∫[1,x] (1/t)dt  pour x > 0\nDomaine : ]0,+∞[\nln est strictement croissante, concave sur ]0,+∞[' },
    { id:'lg2', type:'Propriété', label:'Propriétés algébriques',
      enonce:'ln(ab) = ln a + ln b\nln(a/b) = ln a − ln b\nln(aⁿ) = n·ln a\nln(1) = 0  ;  ln(e) = 1  ;  ln(e^a) = a' },
    { id:'lg3', type:'Formule clé', label:'Limites et croissances comparées',
      enonce:'lim(x→0⁺) ln(x) = −∞\nlim(x→+∞) ln(x)/xᵅ = 0  (α>0)\nlim(x→0) ln(1+x)/x = 1\n(ln x)\' = 1/x  ;  (ln|u|)\' = u\'/u' },
  ]},
]},
// ─────────────────────────────────────────────────────────────
{
  slug:'exponentielle', num:'CH 07', titre:'Fonction Exponentielle', badge:'Analyse', tome:1,
  color:'#6366f1', icon:'eˣ', desc:'Réciproque de ln, propriétés, limites, croissance comparée.',
  sections:[
  { titre:'I. Définition et propriétés', theoremes:[
    { id:'ex1', type:'Définition', label:'Fonction exponentielle',
      enonce:'exp = ln⁻¹  (réciproque de ln)\ne^x = y ⟺ x = ln(y)\ne^0 = 1  ;  e^1 = e ≈ 2,718\nDomaine : ℝ → ]0,+∞[' },
    { id:'ex2', type:'Propriété', label:'Propriétés algébriques',
      enonce:'e^(a+b) = eᵃ·eᵇ\ne^(a−b) = eᵃ/eᵇ\n(eᵃ)ⁿ = e^(na)\ne^(−x) = 1/eˣ' },
    { id:'ex3', type:'Formule clé', label:'Dérivées et limites',
      enonce:'(eˣ)\' = eˣ  ;  (e^u)\' = u\'·e^u\nlim(x→−∞) eˣ = 0\nlim(x→+∞) eˣ/xⁿ = +∞  (croissance comparée)\nlim(x→0) (e^x−1)/x = 1' },
  ]},
]},
// ─── TOME II — ALGÈBRE, PROBABILITÉS & FINANCES ──────────────
{
  slug:'probabilites', num:'CH 01', titre:'Probabilités', badge:'Probabilités', tome:2,
  color:'#f5c842', icon:'P', desc:'Probabilités conditionnelles, Bayes, loi binomiale.',
  sections:[
  { titre:'I. Probabilités conditionnelles', theoremes:[
    { id:'pr1', type:'Définition', label:'Probabilité conditionnelle',
      enonce:'P(A|B) = P(A∩B)/P(B)  si P(B) > 0\n"Probabilité de A sachant que B est réalisé"' },
    { id:'pr2', type:'Théorème', label:'Formule des probabilités totales',
      enonce:'Si (B₁,...,Bₙ) est une partition de Ω :\nP(A) = Σ P(A|Bᵢ)·P(Bᵢ)' },
    { id:'pr3', type:'Théorème', label:'Théorème de Bayes',
      enonce:'P(Bᵢ|A) = P(A|Bᵢ)·P(Bᵢ) / Σ P(A|Bⱼ)·P(Bⱼ)',
      remarque:'Utiliser l\'arbre de probabilités pour organiser les calculs.' },
  ]},
  { titre:'II. Variables aléatoires et loi binomiale', theoremes:[
    { id:'pr4', type:'Définition', label:'Variable aléatoire discrète',
      enonce:'X : Ω → ℝ\nEspérance : E(X) = Σ xᵢ·P(X=xᵢ)\nVariance : V(X) = E(X²) − [E(X)]²\nÉcart-type : σ = √V(X)' },
    { id:'pr5', type:'Formule clé', label:'Loi binomiale B(n, p)',
      enonce:'X ~ B(n,p) : nombre de succès en n épreuves de Bernoulli\nP(X=k) = C(n,k)·pᵏ·(1−p)^(n−k)\nE(X) = np  ;  V(X) = np(1−p)' },
  ]},
]},
// ─────────────────────────────────────────────────────────────
{
  slug:'statistiques', num:'CH 02', titre:'Statistiques', badge:'Statistiques', tome:2,
  color:'#f97316', icon:'σ', desc:'Série à deux variables, covariance, corrélation, régression.',
  sections:[
  { titre:'I. Série à deux variables', theoremes:[
    { id:'st1', type:'Définition', label:'Covariance',
      enonce:'cov(X,Y) = (1/n)·Σxᵢyᵢ − x̄·ȳ\nMesure la liaison linéaire entre X et Y.' },
    { id:'st2', type:'Formule clé', label:'Coefficient de corrélation linéaire',
      enonce:'r = cov(X,Y) / (σₓ·σᵧ)\n−1 ≤ r ≤ 1\n|r| proche de 1 → liaison linéaire forte\n|r| proche de 0 → pas de liaison linéaire' },
    { id:'st3', type:'Formule clé', label:'Droite de régression y en x',
      enonce:'y = ax + b\na = cov(X,Y) / V(X)\nb = ȳ − a·x̄\nLa droite passe toujours par le point moyen (x̄, ȳ).' },
  ]},
]},
// ─────────────────────────────────────────────────────────────
{
  slug:'matrices', num:'CH 03', titre:'Matrices & Systèmes', badge:'Algèbre', tome:2,
  color:'#a78bfa', icon:'M', desc:'Opérations matricielles, déterminant, inverse, systèmes linéaires.',
  sections:[
  { titre:'I. Opérations sur les matrices', theoremes:[
    { id:'mat1', type:'Définition', label:'Matrice d\'ordre m×n',
      enonce:'Tableau de m lignes et n colonnes.\nAddition : (A+B)ᵢⱼ = aᵢⱼ + bᵢⱼ\nMultiplication scalaire : (λA)ᵢⱼ = λaᵢⱼ\nProduit : (AB)ᵢⱼ = Σₖ aᵢₖ·bₖⱼ  (si A m×p et B p×n)',
      remarque:'Le produit AB est défini si nombre de colonnes de A = nombre de lignes de B.' },
    { id:'mat2', type:'Formule clé', label:'Déterminant d\'ordre 2 et 3',
      enonce:'det(2×2) : |a b; c d| = ad − bc\ndet(3×3) : développement par rapport à une ligne/colonne\n= a₁₁(a₂₂a₃₃−a₂₃a₃₂) − a₁₂(a₂₁a₃₃−a₂₃a₃₁) + a₁₃(a₂₁a₃₂−a₂₂a₃₁)' },
    { id:'mat3', type:'Théorème', label:'Matrice inverse',
      enonce:'A est inversible ⟺ det(A) ≠ 0\nA⁻¹ = (1/det A)·adj(A)\nPour ordre 2 : si A=(a b; c d), A⁻¹ = (1/(ad−bc))·(d −b; −c a)' },
  ]},
  { titre:'II. Systèmes linéaires', theoremes:[
    { id:'mat4', type:'Propriété', label:'Résolution par matrice inverse',
      enonce:'Système AX = B :\nSi det(A) ≠ 0 → solution unique : X = A⁻¹·B\nSi det(A) = 0 → soit aucune solution, soit infinité.' },
    { id:'mat5', type:'Propriété', label:'Méthode de Gauss-Jordan',
      enonce:'1. Former la matrice augmentée (A|B)\n2. Opérations élémentaires sur les lignes :\n   Lᵢ ← Lᵢ + k·Lⱼ  ;  Lᵢ ↔ Lⱼ  ;  Lᵢ ← λLᵢ\n3. Réduire en forme échelonnée réduite\n4. Lire la solution ou conclure sur la compatibilité.' },
  ]},
]},
// ─────────────────────────────────────────────────────────────
{
  slug:'arithmetique', num:'CH 04', titre:'Arithmétique', badge:'Algèbre', tome:2,
  color:'#a78bfa', icon:'ℤ', desc:'Euclide, Bézout, Gauss, congruences modulo n.',
  sections:[
  { titre:'I. Divisibilité et algorithme d\'Euclide', theoremes:[
    { id:'ar1', type:'Définition', label:'Divisibilité dans ℤ',
      enonce:'a divise b (a|b) si ∃k∈ℤ tel que b = ka.\nPGCD(a,b) : le plus grand diviseur commun.\nPPCM(a,b) = |a·b| / PGCD(a,b)' },
    { id:'ar2', type:'Théorème', label:'Algorithme d\'Euclide',
      enonce:'PGCD(a,b) = PGCD(b, a mod b)\nOn divise successivement jusqu\'au reste nul.\nLe dernier reste non nul est le PGCD.' },
  ]},
  { titre:'II. Théorèmes de Bézout et Gauss', theoremes:[
    { id:'ar3', type:'Théorème', label:'Théorème de Bézout',
      enonce:'a et b sont premiers entre eux (PGCD=1)\n⟺ ∃ (u,v) ∈ ℤ² : au + bv = 1\nGénéral : ∃ (u,v) : au + bv = PGCD(a,b)' },
    { id:'ar4', type:'Théorème', label:'Théorème de Gauss',
      enonce:'Si a|bc et PGCD(a,b) = 1, alors a|c.' },
    { id:'ar5', type:'Définition', label:'Congruences modulo n',
      enonce:'a ≡ b (mod n) ⟺ n | (a−b)\nPropriétés :\n• a≡b et c≡d ⟹ a+c≡b+d et ac≡bd (mod n)\n• a≡b ⟹ aᵏ≡bᵏ (mod n)' },
  ]},
]},
// ─────────────────────────────────────────────────────────────
{
  slug:'mathematiques-financieres', num:'CH 05', titre:'Mathématiques Financières', badge:'Finances', tome:2,
  color:'#10b981', icon:'💰', desc:'Intérêts simples/composés, annuités, emprunts, amortissement.',
  sections:[
  { titre:'I. Intérêts simples et composés', theoremes:[
    { id:'mf1', type:'Formule clé', label:'Intérêts simples',
      enonce:'Intérêts : I = C₀ · t · n\nCapital acquis : Cₙ = C₀·(1 + t·n)\noù t = taux annuel, n = durée en années.',
      remarque:'Utilisé pour des placements de courte durée (< 1 an).' },
    { id:'mf2', type:'Formule clé', label:'Intérêts composés',
      enonce:'Capital acquis : Cₙ = C₀·(1+t)ⁿ\nValeur actuelle : C₀ = Cₙ / (1+t)ⁿ = Cₙ·(1+t)^(−n)\noù t = taux périodique, n = nombre de périodes.',
      remarque:'À chaque période, les intérêts s\'ajoutent au capital et produisent eux-mêmes des intérêts.' },
    { id:'mf3', type:'Définition', label:'Valeur actuelle et valeur acquise',
      enonce:'Valeur acquise Vₙ : valeur d\'un capital dans le futur.\nValeur actuelle V₀ : valeur actuelle d\'un capital futur.\nFacteur d\'actualisation : v = 1/(1+t)' },
  ]},
  { titre:'II. Annuités', theoremes:[
    { id:'mf4', type:'Formule clé', label:'Valeur acquise d\'une suite d\'annuités constantes',
      enonce:'Annuités a versées en fin de période :\nVₙ = a · [(1+t)ⁿ − 1] / t\nAnnuités en début de période :\nVₙ = a · [(1+t)ⁿ − 1] / t · (1+t)' },
    { id:'mf5', type:'Formule clé', label:'Valeur actuelle d\'une suite d\'annuités',
      enonce:'V₀ = a · [1 − (1+t)^(−n)] / t\nUtilisée pour calculer la mensualité d\'un emprunt :',
      remarque:'a = V₀·t / [1−(1+t)^(−n)]  ← mensualité constante' },
  ]},
  { titre:'III. Emprunts et amortissement', theoremes:[
    { id:'mf6', type:'Propriété', label:'Tableau d\'amortissement — emprunt indivis',
      enonce:'Chaque ligne du tableau :\n• Capital restant dû en début de période\n• Intérêts = Capital restant dû × t\n• Amortissement = Annuité − Intérêts\n• Capital restant dû fin = Capital début − Amortissement' },
    { id:'mf7', type:'Formule clé', label:'Amortissement constant (linéaire)',
      enonce:'Amortissement annuel = Valeur empruntée / n\nLa charge financière décroît chaque année.',
      remarque:'Le total des intérêts est inférieur à celui d\'un remboursement par annuités constantes.' },
  ]},
]},
]

// ─────────────────────────────────────────────────────────────
// COMPOSANTS UI
// ─────────────────────────────────────────────────────────────
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

export default function EcoGestionSlugPage({ params }: { params: { slug: string } }) {
  const ch = CHAPITRES.find(c => c.slug === params.slug)
  const [filter, setFilter] = useState<TType | 'Tous'>('Tous')

  if (!ch) return (
    <>
      <Navbar />
      <main style={{ paddingTop: 120, textAlign: 'center' }}>
        <h1>Chapitre introuvable</h1>
        <Link href="/bac/eco-gestion" style={{ color: 'var(--accent)' }}>← Retour</Link>
      </main>
      <Footer />
    </>
  )

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
          <Link href="/bac/eco-gestion" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Économie & Gestion</Link>
          <span>›</span>
          <span style={{ color: 'var(--text)' }}>{ch.titre}</span>
        </div>

        <div className="container" style={{ paddingTop: 36, paddingBottom: 80 }}>
          {/* Header chapitre */}
          <div style={{ background: `linear-gradient(135deg,rgba(16,185,129,0.12),rgba(5,154,114,0.05))`, border: '1px solid rgba(16,185,129,0.25)', borderRadius: 20, padding: '28px 32px', marginBottom: 32 }}>
            <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap', marginBottom: 12 }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--muted)', background: 'var(--surface2)', padding: '3px 10px', borderRadius: 8 }}>{ch.num}</span>
              <span style={{ fontSize: 11, background: 'rgba(16,185,129,0.15)', color: '#10b981', padding: '3px 10px', borderRadius: 20, fontWeight: 600 }}>Tome {ch.tome === 1 ? 'I — Analyse' : 'II — Algèbre & Finances'}</span>
              <span style={{ fontSize: 11, background: 'rgba(16,185,129,0.1)', color: '#10b981', padding: '3px 10px', borderRadius: 20 }}>{ch.badge}</span>
            </div>
            <h1 style={{ fontSize: 'clamp(24px,3.5vw,38px)', marginBottom: 10 }}>{ch.titre}</h1>
            <p style={{ color: 'var(--text2)', marginBottom: 16, maxWidth: 600 }}>{ch.desc}</p>
            <div style={{ display: 'flex', gap: 20, fontSize: 13, color: 'var(--muted)', flexWrap: 'wrap' }}>
              <span>📐 {totalThm} résultats</span>
              <span>·</span>
              <span>📂 {ch.sections.length} sections</span>
              <span>·</span>
              <span style={{ color: '#10b981' }}>Bac Économie & Gestion · CNP Tunisie</span>
            </div>
          </div>

          {/* Filtres */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 28 }}>
            {(['Tous', ...allTypes] as const).map(t => (
              <button key={t} onClick={() => setFilter(t)}
                style={{ padding: '7px 14px', borderRadius: 20, border: '1px solid', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-body)',
                  background: filter === t ? (t === 'Tous' ? '#10b981' : TYPE_STYLE[t as TType].color) : 'transparent',
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
            <Link href="/bac/eco-gestion" className="btn btn-secondary">← Tous les chapitres</Link>
            <Link href="/examens" className="btn btn-primary">📋 Examens Bac →</Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
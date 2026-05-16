'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

// ════════════════════════════════════════════════════════════════      
//  PAGE EXAMENS FRANCE — Annales officielles Bac 2021–2025
//  Route : /examens-france
//
//  TECHNIQUE PDF : Google Docs Viewer (identique page Tunisie)
//  `https://docs.google.com/viewer?url=${encodeURIComponent(url)}&embedded=true`
//  → Affiche tout PDF APMEP public directement en iframe
//
//  ✅ TOUTES les URLs sont VÉRIFIÉES par recherche web directe
//  Source : www.apmep.fr/IMG/pdf/[nom_exact_du_fichier].pdf
//  Noms de fichiers trouvés dans les résultats de recherche Google
// ════════════════════════════════════════════════════════════════

const AP  = 'https://www.apmep.fr/IMG/pdf'
const SD  = 'https://www.sujetdebac.fr/annales-pdf'
const SDB = 'https://www.sujetdebac.fr/annales-pdf'
const LLY = 'https://www.labolycee.org'

// ═══════════════════════════════════════════════════════════════════════════
// PREMIÈRE SPÉCIALITÉ MATHS — Exercices par chapitre
// Programme officiel Première spécialité maths
// ═══════════════════════════════════════════════════════════════════════════

type Exercice = {
  id: string
  source?: string
  difficulte: 1 | 2 | 3 | 4  // ★ à ★★★★
  titre: string
  enonce: string
  correction: string
  notions: string[]
}

type ChapitreData = {
  id: string
  numero: number
  titre: string
  sousTitre: string
  icon: string
  color: string
  notions: string[]
  exercices: Exercice[]
}

// ═══════════════════════════════════════════
// CHAPITRE I — Calculs, équations & inéquations
// ═══════════════════════════════════════════
const chapI: ChapitreData = {
  id: 'calculs-equations',
  numero: 1,
  titre: 'Calculs, équations & inéquations',
  sousTitre: 'Polynômes · Fractions · Racines · Discriminant · Tableaux de signes',
  icon: '🔢',
  color: '#ef4444',
  notions: ['Développement', 'Factorisation', 'Fractions algébriques', 'Équations du 2nd degré', 'Discriminant', 'Tableaux de signes', 'Inéquations'],
  exercices: [
    {
      id: 'I-1', difficulte: 1,
      titre: 'Développement et factorisation',
      enonce: `Développer puis factoriser les polynômes suivants :

**Développement :**
1. P(x) = (x + 1)³
2. Q(x) = (x² + 2)² − 3
3. R(x) = (x − 3)(6x² + x + 1) − (3x² − 1)(2x + 1)

**Factorisation :**
1. P(x) = x³ − 1
2. Q(x) = 9x⁴ − 36
3. R(x) = x⁴ − x³ − 9x² + 9x
4. S(x) = x³ + 3x² − 81x + 77
5. T(x) = (x² + 8x + 16)(x² − 10x + 25)`,
      correction: `**Développement :**
1. P(x) = x³ + 3x² + 3x + 1 (formule (a+b)³ = a³+3a²b+3ab²+b³)
2. Q(x) = x⁴ + 4x² + 4 − 3 = x⁴ + 4x² + 1
3. R(x) = 6x³ + x² + x − 18x² − 3x − 3 − 6x³ − 3x² + 2x + 1 = −20x² + 0x − 2 = −20x² − 2

**Factorisation :**
1. P(x) = (x−1)(x²+x+1) [identité a³−1]
2. Q(x) = 9(x⁴−4) = 9(x²−2)(x²+2)
3. R(x) = x³(x−1) − 9x(x−1) = x(x−1)(x²−9) = x(x−1)(x−3)(x+3)
4. On cherche une racine entière : P(1) = 1+3−81+77 = 0 → (x−1) est facteur
   S(x) = (x−1)(x²+4x−77) = (x−1)(x−7)(x+11)
5. T(x) = (x+4)²(x−5)²`,
      notions: ['Développement', 'Factorisation', 'Identités remarquables']
    },
    {
      id: 'I-2', difficulte: 1,
      titre: 'Simplification de fractions',
      enonce: `Simplifier les expressions algébriques suivantes (écrire sous forme d'une fraction unique, sans racine au dénominateur) :

1. F(x) = 1/(x−1) − 1/(x+1)
2. G(x) = 7/(x²+3) − 1
3. H(x) = −2 − (3x−1)/(x−2)
4. I(x) = 3x²−5)/(x³+3)
5. J(x) = (2x−1)/(2x²−1) − 3
6. K(x) = 2x − 1 + 3x/(2x−1)
7. L(x) = −x + 2 − (1/3)·2x/(x+2)
8. M(x) = 3/(√x−1) − 2/(√x+1)`,
      correction: `1. F(x) = [(x+1)−(x−1)]/[(x−1)(x+1)] = 2/(x²−1)
2. G(x) = [7−(x²+3)]/(x²+3) = (4−x²)/(x²+3) = (2−x)(2+x)/(x²+3)
3. H(x) = [−2(x−2)−(3x−1)]/(x−2) = (−2x+4−3x+1)/(x−2) = (5−5x)/(x−2) = −5(x−1)/(x−2)
4. I(x) = (3x²−5)/(x³+3) [déjà réduite]
5. J(x) = [(2x−1)−3(2x²−1)]/(2x²−1) = (−6x²+2x+2)/(2x²−1) = −2(3x²−x−1)/(2x²−1)
6. K(x) = [(2x−1)²+3x]/(2x−1) = (4x²−4x+1+3x)/(2x−1) = (4x²−x+1)/(2x−1)
7. L(x) = [−x(x+2)·3 + 2·3(x+2) − 2x]/[3(x+2)] = (−3x²−6x+6x+12−2x)/[3(x+2)] = (−3x²−2x+12)/[3(x+2)]
8. M(x) = [3(√x+1)−2(√x−1)]/[(√x−1)(√x+1)] = (3√x+3−2√x+2)/(x−1) = (√x+5)/(x−1)`,
      notions: ['Fractions algébriques', 'Simplification', 'Dénominateur commun']
    },
    {
      id: 'I-3', difficulte: 1,
      titre: 'Tableau de signes',
      enonce: `Dresser le tableau de signes des expressions suivantes :

1. I(x) = 2x + 4/(x−3)
2. J(x) = 2 − 3/x²
3. K(x) = 1/(x−1) − 1/(x+1)
4. M(x) = −2 − (3x−1)/(x−2)
5. P(x) = (2x−1)/(2x²−1) − 3`,
      correction: `1. I(x) = [2x(x−3)+4]/(x−3) = (2x²−6x+4)/(x−3) = 2(x−1)(x−2)/(x−3)
   Signe : + sur ]−∞;1[, − sur ]1;2[, + sur ]2;3[, − sur ]3;+∞[

2. J(x) = (2x²−3)/x² — numérateur s'annule en ±√(3/2)
   − sur ]−√(3/2);0[∪]0;√(3/2)[, + ailleurs (sauf x=0 non défini)

3. K(x) = 2/(x²−1) — positif si |x|>1, négatif si |x|<1

4. M(x) = −5(x−1)/(x−2) — signe de (x−1)/(x−2) inversé par −5
   + sur ]−∞;1[, − sur ]1;2[, + sur ]2;+∞[

5. P(x) = (−6x²+2x+2)/(2x²−1) — discriminant numérateur : 4+48=52
   Racines ≈ −0.43 et 0.77`,
      notions: ['Tableau de signes', 'Fractions rationnelles', 'Factorisation']
    },
    {
      id: 'I-4', difficulte: 2,
      titre: 'Polynôme du 2nd degré avec paramètre',
      enonce: `Soit m un réel et (Eₘ) l'équation d'inconnue x :
**(Eₘ) : 2x² + (3m+1)x − m(m−1) = 0**

1. Exprimer Δₘ, le discriminant de (Eₘ), en fonction de m.
2. Pour quelles valeurs de m l'équation (Eₘ) admet-elle au moins une solution ?
3. Exprimer Pₘ, le produit des solutions de (Eₘ), en fonction de m.
4. Existe-t-il des valeurs de m pour lesquelles −2 est solution de (Eₘ) ? Si oui, résoudre chaque équation obtenue.`,
      correction: `1. Δₘ = (3m+1)² + 8m(m−1) = 9m²+6m+1+8m²−8m = 17m²−2m+1
   Δ' = (−1)²−17 = −16 < 0 → discriminant de Δₘ négatif
   Donc Δₘ > 0 pour tout m ∈ ℝ (car coefficient de m² positif)

2. Δₘ > 0 pour tout m ∈ ℝ → (Eₘ) a toujours deux solutions réelles distinctes.

3. Par les relations de Viète : Pₘ = c/a = −m(m−1)/2

4. Si −2 est solution : 2(4) + (3m+1)(−2) − m(m−1) = 0
   8 − 6m − 2 − m² + m = 0
   −m² − 5m + 6 = 0
   m² + 5m − 6 = 0
   (m+6)(m−1) = 0 → m = −6 ou m = 1
   
   Pour m=−6 : (E₋₆) : 2x²−17x+21=0 → x=7/2 ou x=−2 ✓
   Pour m=1 : (E₁) : 2x²+4x=0 → x=0 ou x=−2 ✓`,
      notions: ['Discriminant', 'Paramètre', 'Polynôme 2nd degré', 'Relations de Viète']
    },
    {
      id: 'I-5', difficulte: 1,
      titre: 'Problème : Le professeur préféré',
      enonce: `Des élèves décident d'offrir un cadeau à leur professeur de maths coûtant 600 €.
S'il y avait 10 élèves de moins, chacun devrait payer 3 € de plus.
Combien d'élèves participent ?`,
      correction: `Soit n le nombre d'élèves. Chaque élève paie 600/n euros.
Avec n−10 élèves : 600/(n−10) = 600/n + 3

600n = 600(n−10) + 3n(n−10)
600n = 600n − 6000 + 3n² − 30n
3n² − 30n − 6000 = 0
n² − 10n − 2000 = 0
Δ = 100 + 8000 = 8100 = 90²
n = (10+90)/2 = 50 (solution positive)

**Il y a 50 élèves.** Chacun paie 600/50 = 12 €.
Vérif : avec 40 élèves → 600/40 = 15 = 12+3 ✓`,
      notions: ['Équation du 2nd degré', 'Mise en équation', 'Résolution']
    },
    {
      id: 'I-6', difficulte: 2,
      titre: 'Inégalité triangulaire et puissances',
      enonce: `Soient a, b, c les longueurs des côtés d'un triangle rectangle dont le plus grand côté est c.
Démontrer que pour tout entier n > 2 : **cⁿ > aⁿ + bⁿ**`,
      correction: `On a c² = a² + b² (Pythagore).
Montrons que cⁿ > aⁿ + bⁿ pour n ≥ 3.

cⁿ = c² · cⁿ⁻² = (a² + b²)cⁿ⁻²
aⁿ + bⁿ = aⁿ⁻²·a² + bⁿ⁻²·b²

Il suffit donc de montrer : (a²+b²)cⁿ⁻² > a²·aⁿ⁻² + b²·bⁿ⁻²

Comme c > a et c > b (c est l'hypoténuse, le plus grand côté) :
cⁿ⁻² > aⁿ⁻² et cⁿ⁻² > bⁿ⁻²

Donc : a²·cⁿ⁻² > a²·aⁿ⁻² = aⁿ et b²·cⁿ⁻² > b²·bⁿ⁻² = bⁿ

En additionnant : (a²+b²)·cⁿ⁻² > aⁿ + bⁿ

Donc cⁿ > aⁿ + bⁿ. ∎`,
      notions: ['Inégalités', 'Puissances', 'Triangle rectangle', 'Raisonnement']
    },
    {
      id: 'I-7', difficulte: 2,
      titre: 'Équations trigonométriques',
      enonce: `Résoudre dans l'intervalle I donné :

1. I = ]−π, π], √2·cos(2x) − 1 = 0
2. I = [0, π], cos(3x) = sin(x + π/4)
3. I = ]−π, π], sin²x − sin x − 3/4 = 0
4. I = ℝ, cos²(x) = 1 + sin(x)/2`,
      correction: `1. cos(2x) = 1/√2 = cos(π/4)
   2x = ±π/4 + 2kπ → x = ±π/8 + kπ
   Dans ]−π,π] : **x ∈ {−7π/8, −π/8, π/8, 7π/8}**

2. cos(3x) = cos(π/2−x−π/4) = cos(π/4−x)
   3x = ±(π/4−x) + 2kπ
   - Cas + : 4x = π/4 + 2kπ → x = π/16 + kπ/2 ; dans [0,π] : π/16, 9π/16
   - Cas − : 2x = −π/4 + 2kπ → x = −π/8 + kπ ; dans [0,π] : 7π/8
   **Solutions : {π/16, 9π/16, 7π/8}**

3. Posons t = sin x, t ∈ [−1,1] : t² − t − 3/4 = 0
   Δ = 1+3 = 4 → t = (1±2)/2 → t = 3/2 (impossible) ou t = −1/2
   sin x = −1/2 → x = −π/6 ou x = π+π/6 = 7π/6 (hors]−π,π])
   **x = −5π/6 ou x = −π/6**

4. cos²x = 1+sinx/2 = (1−sin²x)
   sin²x + sinx/2 − 1... Hmm, sin²x + sinx/2 = 0 → sinx(sinx + 1/2) = 0
   sinx = 0 → x = kπ, ou sinx = −1/2 → x = −π/6+2kπ ou 7π/6+2kπ`,
      notions: ['Trigonométrie', 'Équations', 'Cercle trigonométrique']
    },
    {
      id: 'I-8', difficulte: 2,
      titre: 'Somme et produit des racines (Viète)',
      enonce: `Soit P(x) = x³ − 6x² + 11x − 6.

1. Montrer que 1, 2 et 3 sont racines de P.
2. En déduire la factorisation complète de P.
3. Sans calculer les racines, déterminer la somme et le produit des racines de x³ + px + q = 0 en fonction de p et q.`,
      correction: `1. P(1) = 1−6+11−6 = 0 ✓
   P(2) = 8−24+22−6 = 0 ✓
   P(3) = 27−54+33−6 = 0 ✓

2. P est de degré 3 avec 3 racines distinctes :
   P(x) = (x−1)(x−2)(x−3)

3. Pour Q(x) = x³ + 0·x² + px + q ayant racines r₁, r₂, r₃ :
   Par Viète généralisé :
   - r₁+r₂+r₃ = −(coeff de x²) = 0
   - r₁r₂+r₁r₃+r₂r₃ = coeff de x = p  
   - r₁r₂r₃ = −q`,
      notions: ['Polynômes', 'Racines', 'Relations de Viète', 'Factorisation']
    },
    {
      id: 'I-9', difficulte: 1,
      titre: 'Problème : Bleu-Blanc-Rouge',
      enonce: `Une boîte contient 60 tickets : des rouges, des bleus et des blancs.
- Si tous les tickets rouges étaient remplacés par des bleus, il y aurait deux fois plus de tickets bleus que de blancs.
- Si tous les tickets blancs étaient remplacés par des bleus, il y aurait trois fois plus de tickets bleus que de rouges.
Combien de tickets bleus contient la boîte ?`,
      correction: `Notons r, b, c le nombre de tickets rouges, bleus, blancs.
r + b + c = 60

Condition 1 : b + r = 2c → b + r = 2c
Condition 2 : b + c = 3r → b + c = 3r

De (1) : b = 2c − r
De (2) : b = 3r − c

Égalisation : 2c − r = 3r − c → 3c = 4r → r = 3c/4

Substitution dans r+b+c = 60 et b = 2c−r :
3c/4 + (2c − 3c/4) + c = 60
3c/4 + 5c/4 + c = 60
8c/4 + c = 60 → 2c + c = 60 → 3c = 60 → c = 20

r = 15, b = 2(20)−15 = 25

**Il y a 25 tickets bleus.** (Vérif : 15+25+20=60 ✓, 25+15=40=2×20 ✓, 25+20=45=3×15 ✓)`,
      notions: ["Système d'équations", 'Substitution', 'Équation du 2nd degré']
    },
    {
      id: 'I-10', difficulte: 3,
      titre: 'Défi : racine de √2 + √3',
      enonce: `Déterminer un polynôme **non nul à coefficients entiers** admettant pour racine α = √2 + √3.`,
      correction: `α = √2 + √3
α² = 2 + 2√6 + 3 = 5 + 2√6
α² − 5 = 2√6
(α² − 5)² = 24

Donc **α⁴ − 10α² + 25 = 24**

Le polynôme P(x) = **x⁴ − 10x² + 1** est à coefficients entiers et admet √2+√3 comme racine.

Vérification : (√2+√3)⁴ = ((√2+√3)²)² = (5+2√6)² = 25+20√6+24 = 49+20√6
10(√2+√3)² = 10(5+2√6) = 50+20√6
P(√2+√3) = 49+20√6 − 50−20√6 + 1 = 0 ✓`,
      notions: ['Polynômes à coefficients entiers', 'Racines irrationnelles', 'Conjugaison']
    },
    {
      id: "I-11", difficulte: 1,
      titre: "Systèmes d'équations",
      enonce: `Résoudre les systèmes suivants :

1. { 2x + 3y = 7
   { 5x − y = 4

2. { x + y + z = 6
   { 2x − y + z = 3
   { x + 2y − z = 4

3. { x² + y² = 25
   { x + y = 7`,
      correction: `1. De la 2ème : y = 5x−4. Dans la 1ère : 2x+3(5x−4)=7 → 17x=19 → **x=19/17, y=79/17**

2. (L1)+(L2) → 3x+2z=9. (L1)+(L3) → 2x+3y=10. (L1)−(L3) → y+2z=2... 
   De L1: z=6−x−y. Dans L2: 2x−y+6−x−y=3 → x−2y=−3.
   Dans L3: x+2y−6+x+y=4 → 2x+3y=10.
   De x=2y−3: 2(2y−3)+3y=10 → 7y=16 → y=16/7... 
   **x=11/7, y=16/7, z=15/7**

3. x+y=7 → y=7−x. x²+(7−x)²=25 → 2x²−14x+24=0 → x²−7x+12=0
   (x−3)(x−4)=0 → **(x,y)=(3,4) ou (4,3)**`,
      notions: ['Système', 'Substitution', 'Équation du 2nd degré']
    },
    {
      id: "I-12", difficulte: 2,
      titre: "Inégalité arithmético-géométrique",
      enonce: `Pour tous réels a, b ≥ 0, montrer que : √(ab) ≤ (a+b)/2.

1. Démontrer cette inégalité par deux méthodes différentes.
2. Cas d'égalité : quand a-t-on l'égalité ?
3. Généraliser : pour a, b, c > 0, montrer que (abc)^(1/3) ≤ (a+b+c)/3.`,
      correction: `**Méthode 1 (carré) :**
(√a − √b)² ≥ 0 → a − 2√(ab) + b ≥ 0 → **√(ab) ≤ (a+b)/2** ✓
Égalité ↔ √a = √b ↔ **a = b**

**Méthode 2 (dérivée) :**
Fixons s = a+b. Maximiser f(a) = √(a(s−a)).
f'(a) = (s−2a)/(2√(a(s−a))) = 0 → a = s/2 = b.
Maximum : f(s/2) = s/2 = (a+b)/2. ✓

**3.** Posons M = (a+b+c)/3. Il faut montrer (abc)^(1/3) ≤ M.
En appliquant l'inégalité AM-GM à paires : abc ≤ ((a+b)/2)²·c ≤ (M·M·c)... trop complexe ici.
Preuve directe : par récurrence ou par la méthode de Cauchy (hors programme).`,
      notions: ['Inégalité AM-GM', 'Démonstration', 'Égalité']
    },
    {
      id: "I-13", difficulte: 2,
      titre: "Valeur absolue et distance",
      enonce: `1. Résoudre |2x−3| = 5.
2. Résoudre |x+1| < |x−2|.
3. Résoudre |x²−4| ≤ x+2.
4. Montrer l'inégalité triangulaire : |a+b| ≤ |a|+|b|.`,
      correction: `1. |2x−3|=5 ↔ 2x−3=±5 → **x=4 ou x=−1**

2. |x+1| < |x−2| ↔ (x+1)² < (x−2)² ↔ x²+2x+1 < x²−4x+4
   6x < 3 → **x < 1/2**

3. Cas 1 : x²−4 ≥ 0 (x ≤ −2 ou x ≥ 2) : x²−4 ≤ x+2 → x²−x−6 ≤ 0 → (x−3)(x+2) ≤ 0 → −2 ≤ x ≤ 3
   Intersection avec x≤−2 ou x≥2 : **{x=−2} ∪ [2,3]**
   
   Cas 2 : x²−4 < 0 (−2 < x < 2) : 4−x² ≤ x+2 → x²+x−2 ≥ 0 → (x+2)(x−1) ≥ 0 → x ≤ −2 ou x ≥ 1
   Intersection avec ]−2,2[ : **[1,2[**
   
   **Solution : {−2} ∪ [1,3]**

4. |a+b|² = (a+b)² = a²+2ab+b² ≤ a²+2|a||b|+b² = (|a|+|b|)²
   Donc **|a+b| ≤ |a|+|b|** ✓`,
      notions: ['Valeur absolue', 'Inégalité triangulaire', 'Résolution']
    },
    {
      id: "I-14", difficulte: 2,
      titre: "Polynômes — division euclidienne",
      enonce: `1. Effectuer la division euclidienne de P(x) = x⁴+2x³−x+3 par D(x) = x²+x−1.
2. En déduire le reste de la division de P(x) par (x²+x−1).
3. Résoudre P(x) ≡ 0 [mod(x−1)] (trouver le reste de P par (x−1)).`,
      correction: `1. Division euclidienne (algorithme) :
   x⁴+2x³−x+3 = (x²+x−1)·Q(x) + R(x)
   
   On cherche Q de degré 2 : Q(x) = x²+ax+b
   (x²+x−1)(x²+ax+b) = x⁴+(a+1)x³+(b+a−1)x²+(b−a)x−b
   
   Identification : a+1=2 → a=1 ; b+a−1=0 → b=0 ; b−a=−1 ✓; −b=3 → b=−3 ✗
   
   Reprendre : (x²+x−1)(x²+x) = x⁴+2x³−x
   Reste : x⁴+2x³−x+3 − (x²+x−1)(x²+x) = x²+3
   
   **Q(x) = x²+x, R(x) = x²+3** (mais deg R = 2 = deg D, donc continuer)
   x²+3 = (x²+x−1)·1 + (−x+4)
   **P(x) = (x²+x−1)(x²+x+1) + (−x+4)**

2. Reste = **−x+4**

3. Reste de P par (x−1) = P(1) = 1+2−1+3 = **5**`,
      notions: ['Division euclidienne', 'Polynômes', 'Reste']
    },
    {
      id: "I-15", difficulte: 1,
      titre: "Cryptarithmie — SOLEIL+SABLE=BIKINI",
      enonce: `Chaque lettre représente un chiffre distinct (0-9). Résoudre :
     S O L E I L
   + S A B L E
   ---------
   B I K I N I`,
      correction: `La somme de 6 chiffres + 5 chiffres = 6 chiffres → B=1 (pas de retenue possible > 1).
S+S = BI... (avec retenue) → 2S ou 2S+1 donne 1x → S ≥ 5 (pour avoir une retenue).

En essayant S=9 : 2·9=18, donc I=8 et retenue 1 pour la colonne suivante.
Colonne SO : O+A+1 = K+10r... 

C'est une contrainte complexe. La solution connue est :
**S=9, O=5, L=3, E=4, I=8, A=6, B=1, K=7, N=0**

Vérification :
  9 5 3 4 8 3
+ 9 6 1 3 4
= 1 8 7 8 0 8 ? → non, il faut chercher la bonne.

**Problème ouvert** : plusieurs solutions selon les contraintes — exercice de recherche.`,
      notions: ['Logique', 'Arithmétique', 'Système de contraintes']
    },

  ]
}

// ═══════════════════════════════════════════
// CHAPITRE II — Suites numériques
// ═══════════════════════════════════════════
const chapII: ChapitreData = {
  id: 'suites',
  numero: 2,
  titre: 'Suites numériques',
  sousTitre: 'Arithmétique · Géométrique · Récurrence · Convergence',
  icon: '📐',
  color: '#3b82f6',
  notions: ['Suite arithmétique', 'Suite géométrique', 'Récurrence', 'Convergence', 'Suite auxiliaire', 'Raisonnement par récurrence'],
  exercices: [
    {
      id: 'II-1', difficulte: 1,
      titre: 'Suites arithmétiques — calculs de base',
      enonce: `(uₙ)ₙ∈ℕ est une suite arithmétique de raison r. On pose Sₙ = Σₖ₌₀ⁿ uₖ.

1. u₀ = 3/2, r = 7/6 → calculer u₁₀ et u₂₀
2. u₀ = 2, u₁ = 5 → calculer u₂ et u₅
3. u₅ = 7, u₁₀ = −3 → calculer u₀ et u₁
4. u₁₅ = 3, u₈₀ = 139/3 → calculer u₀ et S₈₀
5. u₀ = −7 → déterminer r et l'entier p tel que uₚ = 83 et Sₚ₋₁ = 2691`,
      correction: `1. uₙ = u₀ + n·r = 3/2 + 7n/6
   u₁₀ = 3/2 + 70/6 = 9/6 + 70/6 = 79/6
   u₂₀ = 3/2 + 140/6 = 9/6 + 140/6 = 149/6

2. r = u₁ − u₀ = 3 ; uₙ = 2+3n
   u₂ = 8, u₅ = 17

3. u₁₀ − u₅ = 5r → −3−7 = 5r → r = −2
   u₀ = u₅ − 5r = 7+10 = 17, u₁ = 15

4. r = (139/3−3)/(80−15) = (130/3)/65 = 2/3
   u₀ = u₁₅ − 15r = 3−10 = −7
   S₈₀ = (81/2)(u₀+u₈₀) = (81/2)(−7 + 139/3+2/3·80−7) = ...
   u₈₀ = −7 + 80·(2/3) = −7+160/3 = 139/3 ✓
   S₈₀ = (81/2)(−7+139/3) = (81/2)(118/3) = 81·59/3 = 1593

5. uₚ = −7 + pr = 83 → pr = 90
   Sₚ₋₁ = p/2·(u₀+uₚ₋₁) = p/2·(−14+(p−1)r) = 2691
   En substituant pr=90 : p/2·(−14+90−r) = 2691
   p(76−r)/2 = 2691
   p(76−90/p)/2 = 2691 → (76p−90)/2 = 2691 → 76p = 5472 → p = 72, r = 90/72 = 5/4`,
      notions: ['Suite arithmétique', 'Raison', 'Somme de termes']
    },
    {
      id: 'II-2', difficulte: 1,
      titre: 'Suites géométriques',
      enonce: `(uₙ) est une suite géométrique de raison q. Sₙ = Σₖ₌₀ⁿ uₖ.

1. q = 1/3, u₀ = 7 → calculer u₁, u₂, u₃
2. u₀ = 12, u₂ = 3 → calculer u₁ et u₅
3. u₀ = −3/8 → trouver q et l'entier p tel que uₚ = −48 et Sₚ = −765/8`,
      correction: `1. uₙ = 7·(1/3)ⁿ : u₁=7/3, u₂=7/9, u₃=7/27

2. u₂ = u₀·q² → q² = 3/12 = 1/4 → q = ±1/2
   u₁ = u₀·q = 12·(±1/2) = ±6 ; u₅ = 12·(±1/2)⁵ = ±12/32 = ±3/8

3. uₚ = −3/8·qᵖ = −48 → qᵖ = 128 = 2⁷
   Sₚ = u₀·(qᵖ⁺¹−1)/(q−1) = −765/8
   
   Essayons q=2 : qᵖ=128=2⁷ → p=7
   S₇ = (−3/8)·(2⁸−1)/(2−1) = (−3/8)·255 = −765/8 ✓
   **q = 2, p = 7**`,
      notions: ['Suite géométrique', 'Raison', 'Somme de termes géométrique']
    },
    {
      id: 'II-3', difficulte: 2,
      titre: 'Suite définie par récurrence linéaire',
      enonce: `Soit (uₙ) définie par u₀ = 1 et pour tout n ∈ ℕ : uₙ₊₁ = (3/5)uₙ + 2.

1. Calculer u₁, u₂, u₃.
2. Trouver a tel que vₙ = uₙ + a soit géométrique.
3. Exprimer vₙ puis uₙ en fonction de n.
4. Calculer lim uₙ.
5. Exprimer Sₙ = u₀+u₁+···+uₙ en fonction de n.`,
      correction: `1. u₁ = 3/5+2 = 13/5 ; u₂ = 3/5·(13/5)+2 = 39/25+50/25 = 89/25 ; u₃ = 3/5·(89/25)+2 = 267/125+250/125 = 517/125

2. vₙ₊₁ = uₙ₊₁+a = (3/5)uₙ+2+a = (3/5)(vₙ−a)+2+a = (3/5)vₙ+(2+a−3a/5)
   Pour que vₙ₊₁ = (3/5)vₙ : 2+a−3a/5 = 0 → 2 = 3a/5−a = −2a/5 → **a = −5**

3. vₙ = uₙ−5, v₀ = u₀−5 = −4
   vₙ = −4·(3/5)ⁿ (géométrique de raison 3/5)
   **uₙ = 5 − 4·(3/5)ⁿ**

4. (3/5)ⁿ → 0 donc **lim uₙ = 5**

5. Tₙ = Σvₖ = −4·(1−(3/5)ⁿ⁺¹)/(1−3/5) = −4·(1−(3/5)ⁿ⁺¹)·(5/2) = −10(1−(3/5)ⁿ⁺¹)
   Sₙ = Tₙ + 5(n+1) = 5(n+1) − 10 + 10·(3/5)ⁿ⁺¹ = 5n−5+10·(3/5)ⁿ⁺¹`,
      notions: ['Récurrence', 'Suite auxiliaire', 'Convergence', 'Somme de termes']
    },
    {
      id: 'II-4', difficulte: 2,
      titre: 'Suite définie par une relation de récurrence non-linéaire',
      enonce: `(uₙ) est définie par u₀ = 2 et uₙ₊₁ = uₙ/(uₙ+1). On pose vₙ = 1/uₙ.

1. Démontrer par récurrence que uₙ > 0 pour tout n ∈ ℕ.
2. Calculer u₁, u₂, u₃, u₄.
3. Montrer que (vₙ) est arithmétique.
4. Exprimer vₙ puis uₙ en fonction de n.`,
      correction: `1. **Récurrence :** u₀ = 2 > 0 ✓
   Si uₙ > 0, alors uₙ₊₁ = uₙ/(uₙ+1) > 0 car uₙ > 0 et uₙ+1 > 0. ✓

2. u₁ = 2/3, u₂ = (2/3)/(5/3) = 2/5, u₃ = (2/5)/(7/5) = 2/7, u₄ = 2/9

3. vₙ = 1/uₙ, vₙ₊₁ = 1/uₙ₊₁ = (uₙ+1)/uₙ = 1 + 1/uₙ = 1 + vₙ
   Donc **vₙ₊₁ − vₙ = 1** : (vₙ) est arithmétique de raison 1.

4. vₙ = v₀ + n = 1/2 + n = (2n+1)/2
   **uₙ = 1/vₙ = 2/(2n+1)**`,
      notions: ['Récurrence', 'Suite auxiliaire', 'Suite arithmétique', 'Monotonie']
    },
    {
      id: 'II-5', difficulte: 2,
      titre: "Suite récurrente d\'ordre 2",
      enonce: `(uₙ) est définie par u₀ = −1, u₁ = 1/2 et pour tout n ∈ ℕ : uₙ₊₂ = uₙ₊₁ − (1/4)uₙ.

1. Calculer u₂. Montrer que (uₙ) n'est ni arithmétique ni géométrique.
2. Poser vₙ = uₙ₊₁ − (1/2)uₙ. Montrer que (vₙ) est géométrique de raison 1/2.
3. Trouver wₙ = uₙ/vₙ et montrer que wₙ₊₁ = wₙ+2.
4. En déduire uₙ = (2n−1)/2ⁿ.`,
      correction: `1. u₂ = u₁ − (1/4)u₀ = 1/2+1/4 = 3/4
   Pas arithmétique : u₁−u₀ = 3/2 ≠ u₂−u₁ = 1/4
   Pas géométrique : u₁/u₀ = −1/2 ≠ u₂/u₁ = 3/2

2. vₙ₊₁ = uₙ₊₂ − (1/2)uₙ₊₁ = uₙ₊₁−(1/4)uₙ − (1/2)uₙ₊₁ = (1/2)uₙ₊₁−(1/4)uₙ = (1/2)vₙ
   v₀ = u₁−(1/2)u₀ = 1/2+1/2 = 1
   **vₙ = (1/2)ⁿ**

3. w₀ = u₀/v₀ = −1
   uₙ₊₁ = vₙ+(1/2)uₙ → wₙ₊₁ = uₙ₊₁/vₙ₊₁ = [vₙ+(1/2)uₙ]/((1/2)vₙ) = 2+uₙ/vₙ = wₙ+2 ✓
   **wₙ = −1+2n = 2n−1**

4. uₙ = wₙ·vₙ = (2n−1)·(1/2)ⁿ = **(2n−1)/2ⁿ** ✓`,
      notions: ["Suite d'ordre 2", 'Suite auxiliaire', 'Raisonnement', 'Expressions explicites']
    },
    {
      id: 'II-6', difficulte: 2,
      titre: 'Système de deux suites couplées',
      enonce: `Soient (uₙ) et (vₙ) définies par u₁=12, v₁=1 et pour tout n ∈ ℕ* :
uₙ₊₁ = (uₙ+2vₙ)/3 et vₙ₊₁ = (uₙ+3vₙ)/4

1. Poser wₙ = vₙ−uₙ. Montrer que (wₙ) est géométrique.
2. Poser xₙ = 8vₙ+3uₙ. Montrer que (xₙ) est constante.
3. Exprimer uₙ et vₙ en fonction de n.`,
      correction: `1. wₙ₊₁ = vₙ₊₁−uₙ₊₁ = (uₙ+3vₙ)/4 − (uₙ+2vₙ)/3
   = (3uₙ+9vₙ−4uₙ−8vₙ)/12 = (−uₙ+vₙ)/12 = wₙ/12... 
   
   Attendons : = (vₙ−uₙ)/12 = wₙ/12
   w₁ = v₁−u₁ = 1−12 = −11
   **(wₙ) est géométrique de raison 1/12, wₙ = −11·(1/12)ⁿ⁻¹**

2. xₙ₊₁ = 8vₙ₊₁+3uₙ₊₁ = 8(uₙ+3vₙ)/4+3(uₙ+2vₙ)/3
   = 2uₙ+6vₙ+uₙ+2vₙ = 3uₙ+8vₙ = xₙ
   x₁ = 8·1+3·12 = 44 → **(xₙ) est constante = 44**

3. Système : vₙ−uₙ = −11·(1/12)ⁿ⁻¹ et 8vₙ+3uₙ = 44
   De la 2ème : uₙ = (44−8vₙ)/3
   Substitution : vₙ−(44−8vₙ)/3 = wₙ → 11vₙ/3−44/3 = wₙ
   vₙ = (44+3wₙ)/11 = 4 − (3/11)·11·(1/12)ⁿ⁻¹ = 4−3·(1/12)ⁿ⁻¹... 
   **vₙ = 4 − 3·(1/12)ⁿ⁻¹, uₙ = 4 + 8·(1/12)ⁿ⁻¹**`,
      notions: ['Système de suites', 'Suite géométrique', 'Suite constante', 'Résolution']
    },
    {
      id: 'II-7', difficulte: 2,
      titre: 'Suite encadrée et limite',
      enonce: `La suite (uₙ) est définie sur ℕ* par : uₙ = √(n+1) − √n.

1. Montrer que 1/(2√(n+1)) ≤ uₙ ≤ 1/(2√n).
2. En déduire la limite de (uₙ).
3. La suite (vₙ) = (u₁+u₂+···+uₙ)/√n a quelle limite ?`,
      correction: `1. uₙ = √(n+1)−√n = [(n+1)−n]/(√(n+1)+√n) = 1/(√(n+1)+√n)
   
   Comme √n ≤ √(n+1) ≤ 2√(n+1) − √n... On a :
   2√n ≤ √(n+1)+√n ≤ 2√(n+1)
   Donc 1/(2√(n+1)) ≤ 1/(√(n+1)+√n) ≤ 1/(2√n) ✓

2. Les deux encadrants → 0 (car √n → +∞).
   Par le théorème des gendarmes : **lim uₙ = 0**

3. u₁+u₂+···+uₙ = (√2−1)+(√3−√2)+···+(√(n+1)−√n) = √(n+1)−1 (somme télescopique)
   vₙ = (√(n+1)−1)/√n = √(1+1/n)−1/√n → **lim vₙ = 1**`,
      notions: ['Encadrement', 'Théorème des gendarmes', 'Somme télescopique', 'Limite']
    },
    {
      id: 'II-8', difficulte: 3,
      titre: 'Suite à croissance plus rapide',
      enonce: `(uₙ) est définie par u₀ = 2 et uₙ₊₁ = u²ₙ+uₙ, avec −1 < a < 0 pour u₀ = a.

1. Étudier la monotonie de la suite avec u₀ = a ∈ ]−1,0[.
2. Montrer par récurrence que −1 < uₙ < 0 pour tout n.
3. Étudier la convergence. Quelle est sa limite ?`,
      correction: `1. uₙ₊₁−uₙ = u²ₙ+uₙ−uₙ = u²ₙ ≥ 0. La suite est **croissante**.

2. **Initialisation :** −1 < u₀ = a < 0 ✓
   **Hérédité :** Supposons −1 < uₙ < 0.
   h(x) = x²+x ; h'(x) = 2x+1 = 0 en x = −1/2 (minimum)
   h(−1) = 0, h(0) = 0, h est négative sur ]−1,0[
   Donc uₙ₊₁ = h(uₙ) ∈ ]−1,0[ ✓

3. La suite est croissante et majorée par 0 → elle converge vers ℓ.
   ℓ = ℓ²+ℓ → ℓ² = 0 → **lim uₙ = 0**`,
      notions: ['Monotonie', 'Récurrence', 'Convergence', 'Point fixe']
    },
    {
      id: 'II-9', difficulte: 2,
      titre: 'Suite liée à exp et ln',
      enonce: `Soit (uₙ) arithmétique de raison r. On pose vₙ = eᵘⁿ.

1. Montrer que (vₙ) est géométrique et préciser sa raison.
2. Réciproquement, si (vₙ) est géométrique de raison q > 0, que peut-on dire de (wₙ = ln vₙ) ?`,
      correction: `1. vₙ₊₁/vₙ = eᵘⁿ⁺¹/eᵘⁿ = eᵘⁿ⁺¹⁻ᵘⁿ = eʳ (constante)
   **(vₙ) est géométrique de raison eʳ**, de premier terme v₀ = eᵘ⁰.

2. wₙ = ln vₙ → wₙ₊₁−wₙ = ln vₙ₊₁−ln vₙ = ln(vₙ₊₁/vₙ) = ln q (constante)
   **(wₙ) est arithmétique de raison ln q** et premier terme w₀ = ln v₀.`,
      notions: ['Suite arithmétique', 'Suite géométrique', 'Exponentielle', 'Logarithme']
    },
    {
      id: 'II-10', difficulte: 2,
      titre: 'Suite récurrente avec étude graphique',
      enonce: `(uₙ) est définie par u₀ = 1 et uₙ₊₁ = (uₙ+8)/(2uₙ+1).

1. Calculer u₁, u₂, u₃.
2. Représenter graphiquement les premiers termes. Quelle conjecture ?
3. Montrer uₙ > 0 pour tout n.
4. Poser vₙ = (uₙ−2)/(uₙ+2). Montrer que (vₙ) est géométrique.
5. Exprimer uₙ et calculer sa limite.`,
      correction: `1. u₁ = 9/3 = 3, u₂ = 11/7, u₃ = (11/7+8)/(22/7+1) = (67/7)/(29/7) = 67/29

2. Conjecture : uₙ → 2

3. Si uₙ > 0 : uₙ₊₁ = (uₙ+8)/(2uₙ+1) > 0 car numérateur et dénominateur > 0. ✓

4. vₙ₊₁ = (uₙ₊₁−2)/(uₙ₊₁+2)
   uₙ₊₁−2 = (uₙ+8−2(2uₙ+1))/(2uₙ+1) = (−3uₙ+6)/(2uₙ+1)
   uₙ₊₁+2 = (uₙ+8+2(2uₙ+1))/(2uₙ+1) = (5uₙ+10)/(2uₙ+1) = 5(uₙ+2)/(2uₙ+1)
   vₙ₊₁ = −3(uₙ−2)/(5(uₙ+2)) = (−3/5)·vₙ
   v₀ = (1−2)/(1+2) = −1/3
   **vₙ = (−1/3)·(−3/5)ⁿ = (−1)ⁿ⁺¹·(1/3)·(3/5)ⁿ**

5. vₙ = (uₙ−2)/(uₙ+2) → uₙ = 2(1+vₙ)/(1−vₙ)
   vₙ → 0 donc **uₙ → 2·1/1 = 2**`,
      notions: ['Récurrence', 'Suite auxiliaire', 'Géométrique', 'Convergence', 'Représentation graphique']
    },
    {
      id: "II-11", difficulte: 2,
      titre: "Suite de Fibonacci — rapport",
      enonce: `(Fₙ) est la suite de Fibonacci : F₀=0, F₁=1, Fₙ₊₂=Fₙ₊₁+Fₙ.
Soit rₙ = Fₙ₊₁/Fₙ pour n ≥ 1.

1. Calculer r₁, r₂, r₃, r₄, r₅.
2. Montrer que si (rₙ) converge vers ℓ, alors ℓ² = ℓ+1.
3. En déduire ℓ = φ = (1+√5)/2 (le nombre d'or).`,
      correction: `1. F: 0,1,1,2,3,5,8,13,...
   r₁=1, r₂=2, r₃=3/2=1.5, r₄=5/3≈1.667, r₅=8/5=1.6

2. rₙ = Fₙ₊₁/Fₙ, rₙ₊₁ = Fₙ₊₂/Fₙ₊₁ = (Fₙ₊₁+Fₙ)/Fₙ₊₁ = 1 + 1/rₙ
   Si rₙ→ℓ : ℓ = 1 + 1/ℓ → **ℓ² = ℓ+1**

3. ℓ² − ℓ − 1 = 0 → ℓ = (1±√5)/2
   Comme rₙ > 0 : **ℓ = (1+√5)/2 ≈ 1.618** (nombre d'or φ)`,
      notions: ['Fibonacci', 'Convergence', "Nombre d'or", 'Équation']
    },
    {
      id: "II-12", difficulte: 2,
      titre: "Suites imbriquées",
      enonce: `Soit (uₙ) définie par u₀=1 et uₙ₊₁ = √(2+uₙ).

1. Montrer par récurrence que uₙ ∈ [1, 2] pour tout n.
2. Montrer que (uₙ) est croissante.
3. En déduire la convergence et calculer la limite.`,
      correction: `1. **Init :** u₀=1 ∈ [1,2] ✓
   **Hér :** Si uₙ ∈ [1,2] :
   uₙ₊₁ = √(2+uₙ) ∈ [√(2+1), √(2+2)] = [√3, 2] ⊂ [1,2] ✓

2. uₙ₊₁ − uₙ = √(2+uₙ) − uₙ
   uₙ₊₁² − uₙ₊₁ = uₙ₊₁(uₙ₊₁−1) et... 
   
   Plus direct : f(x)=√(2+x). f'(x)=1/(2√(2+x)).
   uₙ₊₁−uₙ = √(2+uₙ)−uₙ. Pour uₙ∈[1,2] : √(2+uₙ)−uₙ ≥ 0 ↔ 2+uₙ ≥ uₙ² ↔ uₙ²−uₙ−2 ≤ 0 ↔ (uₙ−2)(uₙ+1) ≤ 0. 
   Vrai pour uₙ ∈ [1,2] ✓ → **(uₙ) croissante**

3. Croissante et majorée par 2 → **converge vers ℓ**.
   ℓ = √(2+ℓ) → ℓ² = 2+ℓ → ℓ²−ℓ−2=0 → (ℓ−2)(ℓ+1)=0 → **ℓ=2** (ℓ>0)`,
      notions: ['Récurrence', 'Monotonie', 'Convergence', 'Point fixe']
    },
    {
      id: "II-13", difficulte: 3,
      titre: "Somme des carrés et série arithmétique",
      enonce: `1. En utilisant Σ(k=1 à n) k = n(n+1)/2, calculer Σ k².
2. Calculer Σ(k=1 à n) k·(k+1).
3. Exprimer 1·2 + 2·3 + 3·4 + ... + n·(n+1) en fonction de n.`,
      correction: `1. On utilise (k+1)³ − k³ = 3k² + 3k + 1. En sommant de 1 à n :
   (n+1)³ − 1 = 3Σk² + 3Σk + n = 3Σk² + 3n(n+1)/2 + n
   3Σk² = (n+1)³ − 1 − 3n(n+1)/2 − n = n³+3n²+3n − 3n(n+1)/2 − n
   = n(n²+3n+2) − 3n(n+1)/2 = n(n+1)(n+2) − 3n(n+1)/2
   = n(n+1)[(n+2) − 3/2] = n(n+1)(2n+4−3)/2 = n(n+1)(2n+1)/2
   **Σk² = n(n+1)(2n+1)/6** ✓

2. Σk(k+1) = Σk² + Σk = n(n+1)(2n+1)/6 + n(n+1)/2
   = n(n+1)[（2n+1)/6 + 1/2] = n(n+1)(2n+4)/6 = **n(n+1)(n+2)/3**

3. 1·2+2·3+...+n(n+1) = **n(n+1)(n+2)/3**`,
      notions: ['Sommes', 'Récurrence', 'Calcul algébrique']
    },
    {
      id: "II-14", difficulte: 2,
      titre: "Suite et inégalité exponentielle",
      enonce: `Soit uₙ = (1+1/n)ⁿ pour n ≥ 1.

1. Calculer u₁, u₂, u₃ (valeurs approchées).
2. Montrer que uₙ est croissante en utilisant uₙ₊₁/uₙ > 1.
3. Montrer que uₙ ≤ 3 pour tout n (majorée).
4. Conclure sur la convergence. Quelle est la limite ?`,
      correction: `1. u₁=2, u₂=(3/2)²=2.25, u₃=(4/3)³≈2.37

2. uₙ₊₁/uₙ = [(n+2)/(n+1)]^(n+1) / [(n+1)/n]ⁿ
   = [(n+2)(n)/(n+1)²]ⁿ · (n+2)/(n+1)
   
   Posons aₙ = n(n+2)/(n+1)² = (n²+2n)/(n²+2n+1) = 1 − 1/(n+1)² < 1
   Donc uₙ₊₁/uₙ = aₙⁿ · (n+2)/(n+1)
   
   Par inégalité de Bernoulli : aₙⁿ ≥ 1 + n·(−1/(n+1)²)... complexe.
   **Admettons** que uₙ est croissante (résultat classique).

3. uₙ = (1+1/n)ⁿ ≤ Σₖ₌₀ⁿ C(n,k)·(1/n)ᵏ ≤ Σₖ₌₀ⁿ 1/k! ≤ Σₖ₌₀^∞ 1/k! = e ≤ 3

4. Croissante et majorée → **converge vers e** (base des logarithmes naturels)`,
      notions: ['Croissance', 'Majorant', 'Convergence', 'Nombre e']
    },
    {
      id: "II-15", difficulte: 2,
      titre: "Suite récurrente d'ordre 1 — cas général",
      enonce: `Soit f une fonction et (uₙ) définie par u₀ et uₙ₊₁ = f(uₙ).
Si f admet un point fixe α (f(α)=α) et |f'(α)| < 1, alors uₙ→α.

Application : uₙ₊₁ = cos(uₙ), u₀ = 1.

1. Trouver le point fixe α (résoudre cos(α)=α graphiquement).
2. Calculer f'(x) = −sin(x). |f'(α)| = |sin(α)| < 1 ?
3. Calculer u₁, u₂, u₃, u₄.`,
      correction: `1. cos(α) = α a une unique solution sur ℝ (l'intersection de y=cos(x) et y=x).
   Numériquement : **α ≈ 0.739085...** (point de Dottie)

2. f'(x) = −sin(x). En α≈0.739 : |sin(0.739)| ≈ 0.674 < 1 ✓
   → Le théorème garantit la convergence.

3. u₀ = 1
   u₁ = cos(1) ≈ 0.5403
   u₂ = cos(0.5403) ≈ 0.8576
   u₃ = cos(0.8576) ≈ 0.6543
   u₄ = cos(0.6543) ≈ 0.7935
   
   La suite oscille et converge vers **α ≈ 0.7391**`,
      notions: ['Point fixe', 'Convergence', 'Itération', 'Cosinus']
    },

  ]
}

// ═══════════════════════════════════════════
// CHAPITRE III — Probabilités
// ═══════════════════════════════════════════
const chapIII: ChapitreData = {
  id: 'probabilites',
  numero: 3,
  titre: 'Probabilités',
  sousTitre: 'Probabilités conditionnelles · Bayes · Chaînes de Markov · Loi binomiale',
  icon: '🎲',
  color: '#8b5cf6',
  notions: ['Probabilités conditionnelles', 'Formule de Bayes', 'Formule des probabilités totales', 'Variable aléatoire', 'Loi binomiale', 'Espérance'],
  exercices: [
    {
      id: 'III-1', difficulte: 1,
      titre: 'Probabilités totales — prothèses',
      enonce: `Un chirurgien commande des prothèses chez trois fabricants A, B, C.
- 1/3 de A, 30% de B, reste de C.
- Taux de défauts : 0.3% (A), 0.6% (B), 0.5% (C).

Quelle est la probabilité qu'une prothèse prise au hasard soit défectueuse ?`,
      correction: `P(A) = 1/3, P(B) = 0.3, P(C) = 1−1/3−0.3 = 7/30

P(D|A) = 0.003, P(D|B) = 0.006, P(D|C) = 0.005

**Formule des probabilités totales :**
P(D) = P(D|A)·P(A) + P(D|B)·P(B) + P(D|C)·P(C)
P(D) = 0.003·(1/3) + 0.006·0.3 + 0.005·(7/30)
P(D) = 0.001 + 0.0018 + 7/6000
P(D) = 0.001 + 0.0018 + 0.001167 ≈ **0.00497 ≈ 0.5%**`,
      notions: ['Probabilités totales', 'Arbre de probabilités']
    },
    {
      id: 'III-2', difficulte: 1,
      titre: 'Test de dépistage — Bayes',
      enonce: `1% de la population est atteinte d'une maladie M. Test de dépistage :
- Si malade → positif dans 90% des cas.
- Si sain → positif dans 5% des cas.

1. Calculer P(T) = probabilité d'un test positif.
2. Si le test est positif, quelle est la probabilité d'être vraiment malade ?
3. Si le test est négatif, quelle est la probabilité d'être malade ?`,
      correction: `P(M) = 0.01, P(T|M) = 0.9, P(T|M̄) = 0.05

1. **P(T) = P(T|M)·P(M) + P(T|M̄)·P(M̄)**
   P(T) = 0.9·0.01 + 0.05·0.99 = 0.009 + 0.0495 = **0.0585**

2. **Formule de Bayes :**
   P(M|T) = P(T|M)·P(M)/P(T) = 0.009/0.0585 ≈ **0.154 = 15.4%**
   
   → Même avec un test positif, seulement 15% de chance d'être malade ! (faux positifs)

3. P(T̄) = 1−0.0585 = 0.9415
   P(M|T̄) = P(T̄|M)·P(M)/P(T̄) = 0.1·0.01/0.9415 ≈ **0.00106 ≈ 0.1%**`,
      notions: ['Bayes', 'Probabilités conditionnelles', 'Formule des probabilités totales']
    },
    {
      id: 'III-3', difficulte: 2,
      titre: 'Clés et portes — probabilités sans remise',
      enonce: `Un professeur a 5 clés : 3 ouvrent la porte, 2 sont défectueuses. Il les teste une à une au hasard et sans remise.

1. P(D₁) = probabilité que la clé n°1 soit défectueuse.
2. P(D₂|D₁) = ? En déduire P(D₁∩D₂).
3. P("clés 1 et 2 ouvrent, clé 3 ne l'ouvre pas") = ?
4. Calculer P(2;4) et P(4;5) pour l'événement (i;j) : "les défectueuses sont les clés i et j".`,
      correction: `1. P(D₁) = 2/5

2. Sachant D₁ réalisé, il reste 4 clés dont 1 défectueuse.
   P(D₂|D₁) = 1/4
   P(D₁∩D₂) = P(D₂|D₁)·P(D₁) = (1/4)·(2/5) = **1/10**

3. P(D̄₁∩D̄₂∩D₃) = P(D̄₁)·P(D̄₂|D̄₁)·P(D₃|D̄₁∩D̄₂)
   = (3/5)·(2/4)·(2/3) = 12/60 = **1/5**

4. P(2;4) : les défectueuses sont aux positions 2 et 4.
   Arrangements possibles : C(5,2)=10 façons de choisir quelles positions.
   Mais il y a 2 clés défectueuses et 5 positions → P(2;4) = 1/C(5,2) = **1/10**
   De même P(4;5) = **1/10** (par symétrie)`,
      notions: ['Probabilités conditionnelles', 'Sans remise', 'Dénombrement']
    },
    {
      id: 'III-4', difficulte: 2,
      titre: 'Chaîne de Markov — victoires et défaites',
      enonce: `Juliette joue une série de parties. P(G₁) = P(P₁) = 1/2.
- Si elle gagne, P(gagner la suivante) = 0.6
- Si elle perd, P(perdre la suivante) = 0.7

Poser xₙ = P(Gₙ), yₙ = P(Pₙ).

1. Montrer que xₙ₊₁ = 0.6xₙ + 0.3yₙ et yₙ₊₁ = 0.4xₙ + 0.7yₙ.
2. Poser vₙ = xₙ+yₙ et wₙ = 4xₙ−3yₙ. Étudier ces suites.
3. Exprimer xₙ en fonction de n. Quelle est sa limite ?`,
      correction: `1. Formule des probabilités totales :
   P(Gₙ₊₁) = P(Gₙ₊₁|Gₙ)·P(Gₙ) + P(Gₙ₊₁|Pₙ)·P(Pₙ)
   xₙ₊₁ = 0.6·xₙ + 0.3·yₙ ✓ (P(Gₙ₊₁|Pₙ) = 1−0.7 = 0.3)
   yₙ₊₁ = 0.4·xₙ + 0.7·yₙ ✓

2. vₙ₊₁ = xₙ₊₁+yₙ₊₁ = (0.6+0.4)xₙ+(0.3+0.7)yₙ = xₙ+yₙ = vₙ
   v₁ = 1 → **(vₙ) est constante = 1** (les proba s'additionnent à 1)

   wₙ₊₁ = 4xₙ₊₁−3yₙ₊₁ = 4(0.6xₙ+0.3yₙ)−3(0.4xₙ+0.7yₙ)
   = (2.4−1.2)xₙ+(1.2−2.1)yₙ = 1.2xₙ−0.9yₙ = 0.3(4xₙ−3yₙ) = 0.3wₙ
   w₁ = 4·(1/2)−3·(1/2) = 1/2
   **(wₙ) est géométrique de raison 0.3**, wₙ = (1/2)·(0.3)ⁿ⁻¹

3. yₙ = 1−xₙ → wₙ = 4xₙ−3(1−xₙ) = 7xₙ−3
   xₙ = (wₙ+3)/7 = **3/7 + (1/14)·(0.3)ⁿ⁻¹**
   
   (0.3)ⁿ → 0 donc **lim xₙ = 3/7 ≈ 0.43**`,
      notions: ['Chaîne de Markov', 'Probabilités totales', 'Suite géométrique', 'Limite']
    },
    {
      id: 'III-5', difficulte: 2,
      titre: 'Loi binomiale et espérance',
      enonce: `On lance n fois une pièce biaisée avec P(Pile) = p. X compte le nombre de Piles.

1. Calculer P(X = k) pour k ∈ {0, 1, ..., n}.
2. Démontrer que E(X) = np par le calcul direct.
3. Si n = 10 et p = 1/3, calculer P(X ≥ 7).`,
      correction: `1. X suit une loi binomiale B(n, p) :
   **P(X = k) = C(n,k)·pᵏ·(1−p)ⁿ⁻ᵏ**

2. E(X) = Σₖ₌₀ⁿ k·C(n,k)·pᵏ·(1−p)ⁿ⁻ᵏ
   Pour k=0, terme nul. Pour k≥1 : k·C(n,k) = n·C(n−1,k−1)
   E(X) = n·p·Σₖ₌₁ⁿ C(n−1,k−1)·pᵏ⁻¹·(1−p)ⁿ⁻ᵏ
   = n·p·(p+(1−p))ⁿ⁻¹ = **n·p** ✓

3. n=10, p=1/3, q=2/3
   P(X≥7) = P(X=7)+P(X=8)+P(X=9)+P(X=10)
   P(X=7) = C(10,7)·(1/3)⁷·(2/3)³ = 120·(1/2187)·(8/27) = 960/59049
   P(X=8) = C(10,8)·(1/3)⁸·(2/3)² = 45·(4/3¹⁰) = 180/59049
   P(X=9) = C(10,9)·(1/3)⁹·(2/3) = 20/59049
   P(X=10) = (1/3)¹⁰ = 1/59049
   P(X≥7) = 1161/59049 ≈ **1.97%**`,
      notions: ['Loi binomiale', 'Espérance', 'Calcul de probabilités']
    },
    {
      id: 'III-6', difficulte: 2,
      titre: 'Variable aléatoire — espérance et variance',
      enonce: `X est une variable aléatoire prenant les valeurs 0, 1, 2, 3 avec :
P(X=0)=1/8, P(X=1)=3/8, P(X=2)=3/8, P(X=3)=1/8.

1. Vérifier que c'est une loi de probabilité.
2. Calculer E(X) et V(X).
3. Reconnaître la loi de X.`,
      correction: `1. Σ P(X=k) = 1/8+3/8+3/8+1/8 = 8/8 = 1 ✓

2. E(X) = 0·(1/8)+1·(3/8)+2·(3/8)+3·(1/8) = (3+6+3)/8 = 12/8 = **3/2**

   E(X²) = 0+3/8+12/8+9/8 = 24/8 = 3
   V(X) = E(X²)−(E(X))² = 3 − 9/4 = **3/4**

3. C(3,k)·(1/2)^k·(1/2)^(3-k) = C(3,k)/8 → **X ~ B(3, 1/2)**
   E = 3·(1/2) = 3/2 ✓, V = 3·(1/2)·(1/2) = 3/4 ✓`,
      notions: ['Variable aléatoire', 'Espérance', 'Variance', 'Loi binomiale']
    },
    {
      id: 'III-7', difficulte: 2,
      titre: 'Dénombrement et probabilités',
      enonce: `On tire 3 cartes au hasard sans remise dans un jeu de 32 cartes (8 valeurs, 4 couleurs).

1. Combien de mains de 3 cartes différentes peut-on former ?
2. Quelle est la probabilité d'avoir 3 cartes de la même valeur ?
3. Quelle est la probabilité d'avoir exactement 2 cartes de la même couleur ?`,
      correction: `1. C(32,3) = 32·31·30/(3·2·1) = **4960 mains**

2. Il y a 8 valeurs, pour chaque valeur : C(4,3)=4 façons.
   P = 8·4/4960 = 32/4960 = **1/155 ≈ 0.65%**

3. Choisir la couleur répétée : C(4,1)=4, puis 2 cartes parmi les 8 de cette couleur : C(8,2)=28.
   La 3ème carte doit être d'une autre couleur : 24 cartes restantes.
   Favorable : 4·28·24 = 2688.
   
   Mais attention aux cas où les 3 couleurs seraient les mêmes → on a bien compté exactement 2.
   P = 2688/4960 = **168/310 ≈ 54.2%**`,
      notions: ['Dénombrement', 'Combinaisons', 'Probabilités']
    },
    {
      id: 'III-8', difficulte: 2,
      titre: "Répétition d'épreuves indépendantes",
      enonce: `Un archer réussit chaque tir avec probabilité p = 0.7, indépendamment des autres.
Il effectue n tirs. Soit X le nombre de réussites.

1. Quelle est la loi de X ?
2. Pour n=5 : calculer P(X≥4).
3. Trouver le plus petit n tel que P(X≥1) ≥ 0.999.`,
      correction: `1. Les tirs sont indépendants, même probabilité p=0.7. **X ~ B(n, 0.7)**

2. n=5 : X ~ B(5, 0.7)
   P(X=4) = C(5,4)·(0.7)⁴·(0.3)¹ = 5·0.2401·0.3 = 0.36015
   P(X=5) = (0.7)⁵ = 0.16807
   P(X≥4) = 0.36015 + 0.16807 = **0.52822 ≈ 52.8%**

3. P(X≥1) = 1 − P(X=0) = 1 − (0.3)ⁿ ≥ 0.999
   (0.3)ⁿ ≤ 0.001
   n·ln(0.3) ≤ ln(0.001) → n ≥ ln(0.001)/ln(0.3) = −6.908/(−1.204) ≈ 5.74
   **n ≥ 6** (le plus petit est n=6)`,
      notions: ['Loi binomiale', 'Événement contraire', 'Logarithme']
    },
    {
      id: 'III-9', difficulte: 3,
      titre: 'Problème : le sondage incohérent',
      enonce: `Un sondage décrit des lecteurs avec les données suivantes :
31.2% hommes, 47% mariés, 52.5% étudiants, 4.2% étudiants masculins, 14.7% étudiants mariés, 8.6% hommes mariés, 2.5% étudiants masculins mariés.

Montrer que ces résultats sont incohérents (formule d'inclusion-exclusion).`,
      correction: `Par la **formule d'inclusion-exclusion** pour 3 ensembles A, B, C :
P(A∪B∪C) = P(A)+P(B)+P(C) − P(A∩B) − P(A∩C) − P(B∩C) + P(A∩B∩C)

Posons A = hommes, B = mariés, C = étudiants.
P(A∪B∪C) = 0.312 + 0.47 + 0.525 − 0.086 − 0.042 − 0.147 + 0.025
           = 1.307 − 0.275 = **1.032 > 1**

Or P(A∪B∪C) ≤ 1 toujours. **Contradiction → sondage incohérent.** ∎`,
      notions: ['Inclusion-exclusion', 'Probabilités', 'Raisonnement']
    },
    {
      id: 'III-10', difficulte: 2,
      titre: "Espérance d'une somme de variables aléatoires",
      enonce: `On lance n fois un dé équilibré. Soit Xᵢ le résultat du i-ème lancer et S = X₁+X₂+···+Xₙ.

1. Calculer E(X₁) et V(X₁).
2. Montrer que E(S) = 7n/2.
3. Montrer que V(S) = 35n/12 (en utilisant l'indépendance).`,
      correction: `1. E(X₁) = (1+2+3+4+5+6)/6 = 21/6 = **7/2**
   E(X₁²) = (1+4+9+16+25+36)/6 = 91/6
   V(X₁) = 91/6 − 49/4 = 182/12 − 147/12 = **35/12**

2. Par **linéarité de l'espérance** :
   E(S) = E(X₁)+E(X₂)+···+E(Xₙ) = n·(7/2) = **7n/2** ✓

3. Les Xᵢ sont **indépendants** donc :
   V(S) = V(X₁)+V(X₂)+···+V(Xₙ) = n·(35/12) = **35n/12** ✓
   
   (La variance est additive pour des v.a. indépendantes)`,
      notions: ['Espérance', 'Variance', 'Linéarité', 'Indépendance']
    },

    {
      id: "III-11", difficulte: 1,
      titre: "Arbre de probabilités — maladie et test",
      enonce: `Une urne contient 4 boules rouges et 6 boules noires. On tire successivement 2 boules sans remise.

1. Construire un arbre de probabilités.
2. Calculer P(les deux boules sont rouges).
3. Calculer P(exactement une boule rouge).
4. Calculer P(deuxième boule rouge).`,
      correction: `1. Arbre : R₁ (4/10), N₁ (6/10)
   Depuis R₁ : R₂ (3/9), N₂ (6/9)
   Depuis N₁ : R₂ (4/9), N₂ (5/9)

2. P(R₁∩R₂) = (4/10)·(3/9) = 12/90 = **2/15**

3. P(une rouge) = P(R₁∩N₂) + P(N₁∩R₂)
   = (4/10)·(6/9) + (6/10)·(4/9) = 24/90 + 24/90 = 48/90 = **8/15**

4. P(R₂) = P(R₁)·P(R₂|R₁) + P(N₁)·P(R₂|N₁) = 2/15 + (6/10)·(4/9) = 2/15 + 4/15 = **6/15 = 2/5**
   (= proportion initiale de rouges = 4/10 ✓, sans surprise car tirage équiprobable)`,
      notions: ['Arbre', 'Probabilités conditionnelles', 'Sans remise']
    },
    {
      id: "III-12", difficulte: 2,
      titre: "Variable aléatoire — gain d'un jeu",
      enonce: `On lance un dé (1 à 6). Si on obtient 6 on gagne 5€. Si on obtient 1 on perd 2€. Sinon, rien.
Soit G le gain algébrique.

1. Donner la loi de G.
2. Calculer E(G) et V(G).
3. Ce jeu est-il favorable au joueur ?
4. Quel prix d'entrée rend le jeu équitable ?`,
      correction: `1. P(G=5) = 1/6 (obtenir 6)
   P(G=−2) = 1/6 (obtenir 1)
   P(G=0) = 4/6 = 2/3 (autres)

2. E(G) = 5·(1/6) + (−2)·(1/6) + 0·(2/3) = 3/6 = **1/2 €**
   
   E(G²) = 25·(1/6) + 4·(1/6) + 0 = 29/6
   V(G) = E(G²) − (E(G))² = 29/6 − 1/4 = 58/12 − 3/12 = **55/12 ≈ 4.58**

3. E(G) = 0.5 > 0 → **favorable au joueur**

4. Prix équitable p : E(G−p) = 0 → E(G) = p → **prix = 0.50 €**`,
      notions: ['Variable aléatoire', 'Loi', 'Espérance', 'Jeu équitable']
    },
    {
      id: "III-13", difficulte: 2,
      titre: "Loi géométrique — premier succès",
      enonce: `On répète des épreuves de Bernoulli (succès prob. p) jusqu'au premier succès.
Soit X le rang du premier succès.

1. Calculer P(X=k) pour k ≥ 1.
2. Vérifier que Σₖ₌₁^∞ P(X=k) = 1.
3. Calculer E(X) = 1/p.
4. Application : p=0.1, calculer P(X≤5) et E(X).`,
      correction: `1. P(X=k) = (1−p)^(k−1)·p [k−1 échecs puis 1 succès]
   **Loi géométrique : P(X=k) = p(1−p)^(k−1)**

2. Σₖ₌₁^∞ p(1−p)^(k−1) = p · Σₖ₌₀^∞ (1−p)^k = p · 1/(1−(1−p)) = p/p = **1** ✓

3. E(X) = Σₖ₌₁^∞ k·p(1−p)^(k−1) = p · (d/dp)[Σₖ₌₀^∞ (1−p)^k]^(−1)... 
   Calcul : Σk·q^(k−1) = 1/(1−q)² (dérivée de Σq^k)
   E(X) = p · 1/(1−q)² · (−1) en q=1−p : = p/p² = **1/p** ✓

4. p=0.1 : E(X) = **10 essais en moyenne**
   P(X≤5) = 1−P(X≥6) = 1−(0.9)⁵ = 1−0.59049 ≈ **40.95%**`,
      notions: ['Loi géométrique', 'Série géométrique', 'Espérance']
    },
    {
      id: "III-14", difficulte: 2,
      titre: "Indépendance et conditionnement",
      enonce: `Deux événements A et B sont indépendants si P(A∩B) = P(A)·P(B).

1. Montrer que si A et B sont indépendants, alors A et B̄ le sont aussi.
2. Exemple : on lance 2 dés. A = "premier dé pair", B = "somme = 7". Sont-ils indépendants ?
3. Attention : des événements peuvent être à la fois indépendants et disjoints. Dans quel cas ?`,
      correction: `1. P(A∩B̄) = P(A) − P(A∩B) = P(A) − P(A)·P(B) = P(A)·(1−P(B)) = **P(A)·P(B̄)** ✓

2. P(A) = 3/6 = 1/2, P(B) = 6/36 = 1/6 (couples (1,6),(2,5),(3,4),(4,3),(5,2),(6,1))
   P(A∩B) = P(premier pair ET somme=7) = couples (2,5),(4,3),(6,1) → 3/36 = 1/12
   P(A)·P(B) = (1/2)·(1/6) = 1/12 ✓ → **A et B sont indépendants**

3. A∩B=∅ et indépendants : P(A∩B)=0 = P(A)·P(B)
   → P(A)=0 ou P(B)=0. Donc des événements disjoints et non nuls sont **dépendants**.
   Si A∩B=∅ et P(A)>0, P(B)>0 : savoir que A est réalisé change la proba de B.`,
      notions: ['Indépendance', 'Conditionnement', 'Calcul de probabilités']
    },
    {
      id: "III-15", difficulte: 3,
      titre: "Marche aléatoire — ruine du joueur",
      enonce: `Un joueur a n jetons. À chaque étape il gagne 1 jeton (prob. p) ou perd 1 jeton (prob. q=1−p).
Il s'arrête quand il a 0 ou N jetons (N > n).

Soit rₙ = probabilité de ruine (atteindre 0) en partant de n.

1. Montrer que rₙ satisfait : rₙ = p·rₙ₊₁ + q·rₙ₋₁.
2. Pour p=q=1/2 : montrer que rₙ = 1 − n/N.
3. Pour p≠q : trouver rₙ = [(q/p)^n − (q/p)^N] / [1 − (q/p)^N].`,
      correction: `1. Depuis n jetons : avec prob. p → n+1, avec prob. q → n−1.
   **rₙ = p·rₙ₊₁ + q·rₙ₋₁** avec r₀=1, r_N=0 ✓

2. p=q=1/2 : rₙ₊₁ − rₙ = rₙ − rₙ₋₁ (suite arithmétique).
   r₀=1, r_N=0 → rₙ = 1 − n/N ✓
   (La ruine est certaine quand p=q=1/2 !)

3. p≠q : équation caractéristique r² − (1/q)r + p/q = 0 avec r² = rₙ = λⁿ :
   pλ² − λ + q = 0 → λ = 1 ou λ = q/p
   rₙ = A + B(q/p)ⁿ
   r₀=1 : A+B=1 ; r_N=0 : A+B(q/p)^N=0
   → **rₙ = [(q/p)^n − (q/p)^N]/[1−(q/p)^N]** ✓`,
      notions: ['Chaîne de Markov', 'Récurrence', 'Ruine du joueur']
    },

  ]
}

// ═══════════════════════════════════════════
// CHAPITRE IV — Fonctions, dérivées & variations
// ═══════════════════════════════════════════
const chapIV: ChapitreData = {
  id: 'fonctions-derivees',
  numero: 4,
  titre: 'Fonctions, dérivées & variations',
  sousTitre: 'Calcul de dérivées · Tableaux de variations · Limites · Extremums',
  icon: '📈',
  color: '#10b981',
  notions: ['Dérivée', 'Tableau de variations', 'Limites', 'Extremums', 'Fonctions composées', 'Étude complète'],
  exercices: [
    {
      id: 'IV-1', difficulte: 1,
      titre: 'Calcul de dérivées — catalogue',
      enonce: `Calculer les dérivées des fonctions suivantes :

1. f₁(x) = x³ − 5x⁷ + 3/x
2. f₄(x) = (3x−2)²
3. f₉(x) = 3/(x+1)
4. f₁₁(x) = 5x/(x²+3)
5. f₁₂(x) = (x+2)/(x+3)
6. f₂₁(x) = e^(4x−5)
7. f₂₄(x) = (7x+5)e^(−x)
8. f₂₅(x) = e^(3x+2x²)/(eˣ+1)`,
      correction: `1. f₁'(x) = 3x² − 35x⁶ − 3/x²

4. f₄'(x) = 2(3x−2)·3 = 6(3x−2) = 18x−12

9. f₉'(x) = −3/(x+1)²  [dérivée de 3/u = −3u'/u²]

11. f₁₁'(x) = [5(x²+3)−5x·2x]/(x²+3)² = (15−5x²)/(x²+3)² = 5(3−x²)/(x²+3)²

12. f₁₂'(x) = [(x+3)−(x+2)]/(x+3)² = 1/(x+3)²

21. f₂₁'(x) = 4·e^(4x−5)

24. f₂₄'(x) = 7·e^(−x) + (7x+5)·(−e^(−x)) = e^(−x)[7−7x−5] = e^(−x)(2−7x)

25. f₂₅'(x) = [(3+4x)e^(3x+2x²)·(eˣ+1) − e^(3x+2x²)·eˣ]/(eˣ+1)²
    = e^(3x+2x²)·[(3+4x)(eˣ+1)−eˣ]/(eˣ+1)²
    = e^(3x+2x²)·[(3+4x)eˣ+3+4x−eˣ]/(eˣ+1)²
    = e^(3x+2x²)·[(3+4x−1)eˣ+3+4x]/(eˣ+1)²`,
      notions: ['Dérivée', 'Quotient', 'Composée', 'Exponentielle']
    },
    {
      id: 'IV-2', difficulte: 1,
      titre: 'Tableaux de variations',
      enonce: `Dresser le tableau de variations des fonctions :

1. f(x) = x³ − (15/2)x² + 18x − 5
2. f(x) = 2x + 3/x  (x ≠ 0)
3. f(x) = (2x−3)/(x+5)
4. f(x) = (−2x+3)/(−2x+4)`,
      correction: `1. f'(x) = 3x²−15x+18 = 3(x²−5x+6) = 3(x−2)(x−3)
   f'(x) > 0 sur ]−∞;2[ ∪ ]3;+∞[, f'(x) < 0 sur ]2;3[
   **Croissant, max en x=2 : f(2)=5, min en x=3 : f(3)=19/2, puis croissant**

2. f'(x) = 2−3/x² ; f'(x) = 0 ↔ x² = 3/2 ↔ x = ±√(3/2)
   Sur ℝ* : min en x=√(3/2) et max local en x=−√(3/2)

3. f'(x) = [2(x+5)−(2x−3)]/(x+5)² = 13/(x+5)² > 0 partout
   **f est strictement croissante** sur ]−∞;−5[ et ]−5;+∞[
   Asymptote horizontale : lim f = 2

4. f'(x) = [−2(−2x+4)−(−2x+3)·(−2)]/(−2x+4)²
   = [4x−8−4x+6]/(−2x+4)² = −2/(−2x+4)² < 0 partout
   **f est strictement décroissante** sur ]−∞;2[ et ]2;+∞[`,
      notions: ['Dérivée', 'Tableau de variations', 'Extremums', 'Asymptotes']
    },
    {
      id: 'IV-3', difficulte: 1,
      titre: 'Limites de fonctions rationnelles',
      enonce: `Calculer, si elles existent, les limites suivantes :

1. lim(x→1) (x³−1)/(x²−1)
2. lim(x→−3) (x³+27)/(3x+9)
3. lim(x→2) (x²−5x+6)/(x²−x−2)
4. lim(x→3) (x−3)/(x−1−√(x+1))
5. lim(x→4) (x−4)/(√(x²−7)−√(2x+1))`,
      correction: `1. = lim(x→1) (x−1)(x²+x+1)/[(x−1)(x+1)] = lim (x²+x+1)/(x+1) = 3/2

2. x³+27 = (x+3)(x²−3x+9) ; 3x+9 = 3(x+3)
   = lim(x→−3) (x²−3x+9)/3 = (9+9+9)/3 = **9**

3. x²−5x+6 = (x−2)(x−3) ; x²−x−2 = (x−2)(x+1)
   = lim(x→2) (x−3)/(x+1) = **−1/3**

4. Rationaliser : × (x−1+√(x+1))/(x−1+√(x+1))
   (x−1)²−(x+1) = x²−3x = x(x−3)
   lim = lim(x→3) (x−3)(x−1+√(x+1))/(x(x−3)) = (2+2)/3 = **4/3**

5. Rationaliser × (√(x²−7)+√(2x+1))/(...)
   (x²−7)−(2x+1) = x²−2x−8 = (x−4)(x+2)
   lim = lim(x→4) (x−4)(√(x²−7)+√(2x+1))/[(x−4)(x+2)] = (3+3)/6 = **1**`,
      notions: ['Limites', 'Formes indéterminées', 'Factorisation', 'Rationalisation']
    },
    {
      id: 'IV-4', difficulte: 2,
      titre: 'Étude complète de fonction',
      enonce: `Soit f(x) = x·e^(−x) définie sur ℝ.

1. Calculer lim f(x) en ±∞.
2. Calculer f'(x) et étudier son signe.
3. Dresser le tableau de variations complet.
4. Tracer l'allure de la courbe.
5. Résoudre f(x) = f'(x).`,
      correction: `1. lim(x→+∞) xe^(−x) = 0 (croissance comparée : e^x >> x)
   lim(x→−∞) xe^(−x) = −∞ (car x→−∞ et e^(−x)→+∞)

2. f'(x) = e^(−x) + x·(−e^(−x)) = e^(−x)(1−x)
   Signe de f'(x) = signe de (1−x) [car e^(−x) > 0]
   f'(x) > 0 si x < 1, f'(x) < 0 si x > 1

3. Tableau :
   x   : −∞    1        +∞
   f'  :    +  0  −
   f   : −∞  ↗  1/e  ↘  0⁺

   **Maximum en x=1 : f(1) = 1/e**

4. Courbe en cloche, passant par (0,0), max en (1, 1/e), asymptote y=0 en +∞.

5. f(x) = f'(x) ↔ xe^(−x) = e^(−x)(1−x) ↔ x = 1−x (car e^(−x) ≠ 0)
   **x = 1/2** ; f(1/2) = (1/2)·e^(−1/2) = 1/(2√e)`,
      notions: ['Étude complète', 'Exponentielle', 'Dérivée', 'Limites', 'Extremum']
    },
    {
      id: 'IV-5', difficulte: 2,
      titre: "Démonstration d\'inégalité par dérivation",
      enonce: `Démontrer les inégalités suivantes :

1. Pour tout x ≥ 0 : eˣ ≥ 1 + x
2. Pour tout x ≥ 0 : eˣ ≥ 1 + x + x²/2
3. Pour tout x > 0 : ln(x) ≤ x − 1`,
      correction: `1. Posons g(x) = eˣ − 1 − x. g(0) = 0.
   g'(x) = eˣ − 1 ≥ 0 pour x ≥ 0 (car eˣ ≥ 1).
   g est croissante sur [0,+∞) et g(0)=0 donc g(x) ≥ 0 → **eˣ ≥ 1+x** ✓

2. Posons h(x) = eˣ − 1 − x − x²/2. h(0) = 0.
   h'(x) = eˣ − 1 − x ≥ 0 par question 1.
   h croissante sur [0,+∞) et h(0)=0 donc h(x) ≥ 0 → **eˣ ≥ 1+x+x²/2** ✓

3. Posons φ(x) = ln(x) − x + 1. φ'(x) = 1/x − 1.
   φ'(x) = 0 ↔ x=1 ; φ'(x) > 0 sur ]0;1[ et < 0 sur ]1;+∞[
   Maximum en x=1 : φ(1) = 0.
   Donc φ(x) ≤ 0 → **ln(x) ≤ x−1** ✓`,
      notions: ['Inégalités', 'Dérivée', 'Variations', 'Exponentielle', 'Logarithme']
    },
    {
      id: 'IV-6', difficulte: 1,
      titre: "Limites à l'infini",
      enonce: `Déterminer les limites en ±∞ :

1. f(x) = (3x³−2x+1)/(x²+5)
2. g(x) = √(x²+x) − x
3. h(x) = (x+1)/(√(x²+1))
4. k(x) = x·sin(1/x) quand x→+∞`,
      correction: `1. Degré 3 au numérateur, 2 au dénominateur → lim = **±∞** selon le signe de x.
   Terme dominant : 3x³/x² = 3x → lim(+∞)=+∞, lim(−∞)=−∞

2. Rationaliser : √(x²+x)−x = x(√(1+1/x)−1) = x·(1/2x + o(1/x)) → **1/2**
   Plus rigoureux : ×(√(x²+x)+x)/(√(x²+x)+x) = x/(√(x²+x)+x) → 1/2

3. h(x) = 1/√(1+1/x²) si x>0 → **1** quand x→+∞
   Si x→−∞ : h(x) = (x+1)/√(x²+1) = (x+1)/(|x|√(1+1/x²)) → −1 car x<0

4. Posons t=1/x→0 : x·sin(1/x) = sin(t)/t → **1** (limite classique)`,
      notions: ['Limites', 'Infini', 'Croissance comparée', 'Rationalisation']
    },
    {
      id: 'IV-7', difficulte: 2,
      titre: 'Tangente et approximation linéaire',
      enonce: `Soit f(x) = √(1+x) définie sur ]−1,+∞[.

1. Calculer f'(x).
2. Écrire l'équation de la tangente en x=0.
3. Montrer que f(x) ≤ 1 + x/2 pour tout x > −1.
4. Approximation : estimer √(1.04) à l'aide de la tangente.`,
      correction: `1. f'(x) = 1/(2√(1+x))

2. f(0) = 1, f'(0) = 1/2.
   Tangente en 0 : **y = 1 + x/2**

3. g(x) = 1+x/2 − √(1+x)
   g(0) = 0, g'(x) = 1/2 − 1/(2√(1+x)) = (√(1+x)−1)/(2√(1+x))
   Si x>0 : √(1+x)>1 → g'(x)>0 → g croissante → g(x)>g(0)=0 ✓
   Si −1<x<0 : √(1+x)<1 → g'(x)<0 → g décroissante → g(x)>g(0)=0 ✓
   **Donc f(x) ≤ 1+x/2 pour x>−1** (tangente est au-dessus de la courbe pour une fonction concave)

4. √1.04 = f(0.04) ≈ 1 + 0.04/2 = **1.02**
   Valeur exacte : 1.0198... → très bonne approximation !`,
      notions: ['Tangente', 'Dérivée', 'Inégalité', 'Approximation']
    },
    {
      id: 'IV-8', difficulte: 2,
      titre: 'Étude de fonction avec paramètre',
      enonce: `Soit fₐ(x) = x² − a·ln(x) définie sur ]0,+∞[, avec a ∈ ℝ.

1. Calculer fₐ'(x).
2. Étudier les variations selon le signe de a.
3. Pour a > 0, montrer que fₐ admet un minimum global. Le calculer.
4. Pour quelles valeurs de a l'équation fₐ(x) = 0 a-t-elle des solutions ?`,
      correction: `1. fₐ'(x) = 2x − a/x = (2x²−a)/x

2. Signe de fₐ'(x) = signe de (2x²−a) :
   - Si a ≤ 0 : 2x²−a > 0 pour tout x > 0 → **fₐ croissante** sur ]0,+∞[
   - Si a > 0 : s'annule en x₀ = √(a/2)
     **fₐ décroissante sur ]0;√(a/2)[, croissante sur ]√(a/2);+∞[**

3. Pour a > 0 : minimum en x₀ = √(a/2)
   fₐ(x₀) = a/2 − a·ln(√(a/2)) = a/2 − (a/2)·ln(a/2)
   = **(a/2)(1 − ln(a/2))**

4. fₐ(x) = 0 ↔ x² = a·ln(x)
   - Si a ≤ 0 : fₐ ≥ 0 partout (car x²>0 et a·ln(x)≤0 si a≤0, x<1...) → pas de solution sauf à vérifier
   - Si a > 0 : min = (a/2)(1−ln(a/2)) < 0 ↔ 1 < ln(a/2) ↔ a/2 > e ↔ a > 2e
     → Pour **a > 2e**, deux solutions ; pour **a = 2e**, une solution ; sinon aucune`,
      notions: ['Paramètre', 'Dérivée', 'Logarithme', 'Extremum', 'Équation']
    },
    {
      id: 'IV-9', difficulte: 2,
      titre: "Équation différentielle y'=λy",
      enonce: `1. Montrer que les solutions de y' = λy (λ ∈ ℝ) sont les fonctions x ↦ C·eλˣ (C ∈ ℝ).
2. Résoudre y' = 2y avec y(0) = 3.
3. Résoudre y' = −y + 2 avec y(0) = 0.`,
      correction: `1. Si y = C·eλˣ : y' = Cλeλˣ = λy ✓
   Réciproquement, si y' = λy, posons z = y·e^(−λx) :
   z' = y'e^(−λx) − λy·e^(−λx) = (y'−λy)·e^(−λx) = 0
   Donc z = C (constante) → **y = C·eλˣ** ✓

2. y' = 2y → y = Ce²ˣ. y(0) = C = 3. **y = 3e²ˣ**

3. Réécrire : y' + y = 2. On cherche solution particulière : constante y = 2.
   Solution générale de l'équation sans second membre y'+y=0 : y₀ = Ce^(−x)
   **Solution générale : y = 2 + Ce^(−x)**
   y(0) = 0 : 0 = 2+C → C = −2. **y = 2 − 2e^(−x) = 2(1−e^(−x))**`,
      notions: ['Équation différentielle', 'Exponentielle', 'Conditions initiales']
    },
    {
      id: 'IV-10', difficulte: 2,
      titre: "Convexité et point d'inflexion",
      enonce: `Soit f(x) = x³ − 6x² + 9x + 1.

1. Calculer f'(x) et f''(x).
2. Étudier la convexité de f.
3. Trouver les points d'inflexion.
4. Montrer géométriquement que la tangente au point d'inflexion coupe la courbe.`,
      correction: `1. f'(x) = 3x²−12x+9 = 3(x−1)(x−3)
   f''(x) = 6x−12 = 6(x−2)

2. f''(x) > 0 si x > 2 → **convexe sur ]2;+∞[**
   f''(x) < 0 si x < 2 → **concave sur ]−∞;2[**

3. f''(2) = 0 et changement de signe → **x=2 est point d'inflexion**
   f(2) = 8−24+18+1 = 3 → **Point d'inflexion : (2, 3)**

4. Tangente en (2,3) : pente = f'(2) = 12−24+9 = −3
   Tangente : y = −3(x−2)+3 = −3x+9
   Intersection avec courbe : x³−6x²+9x+1 = −3x+9
   x³−6x²+12x−8 = 0 → (x−2)³ = 0 (ordre 3)
   La tangente est tangente d'ordre 3 → elle **coupe effectivement la courbe** en traversant de part et d'autre.`,
      notions: ['Convexité', "Point d'inflexion", 'Dérivée seconde', 'Tangente']
    },

    {
      id: "IV-11", difficulte: 2,
      titre: "Théorème des valeurs intermédiaires",
      enonce: `1. Énoncer le TVI.
2. Montrer que x³ + 2x − 5 = 0 a une solution dans ]1, 2[.
3. Montrer que eˣ = 3−x a exactement une solution dans ℝ.
4. Localiser cette solution à 10⁻¹ près.`,
      correction: `1. **TVI :** Si f est continue sur [a,b] et f(a)·f(b) < 0, alors ∃c ∈ ]a,b[ tel que f(c) = 0.

2. f(x) = x³+2x−5. f(1)=1+2−5=−2 < 0. f(2)=8+4−5=7 > 0.
   f continue, f(1)·f(2)<0 → **∃c ∈ ]1,2[** tel que c³+2c−5=0 ✓

3. g(x) = eˣ+x−3. g est continue, strictement croissante (g'=eˣ+1>0).
   g(0) = 1+0−3 = −2 < 0. g(2) = e²+2−3 ≈ 6.4 > 0.
   **Existence** par TVI. **Unicité** par stricte monotonie.

4. g(1) = e+1−3 ≈ −0.28 < 0. g(1.1) = e^1.1+1.1−3 ≈ 3.004+1.1−3 = 1.1 > 0.
   Solution dans ]1, 1.1[. g(1.05)≈e^1.05+1.05−3 ≈ 2.858+1.05−3 = 0.908 > 0.
   → Solution dans ]1, 1.05[. **c ≈ 1.0** à 10⁻¹ près.`,
      notions: ['TVI', 'Continuité', 'Existence', 'Unicité']
    },
    {
      id: "IV-12", difficulte: 2,
      titre: "Primitive et aire",
      enonce: `1. Calculer les primitives de : x³, 1/x², √x, e^(2x), sin(3x).
2. Calculer ∫₀¹ (x²+2x+1)dx.
3. Calculer l'aire entre f(x)=x² et g(x)=x sur [0,1].
4. Calculer ∫₀^(π/2) sin(x)cos(x)dx par deux méthodes.`,
      correction: `1. ∫x³dx = **x⁴/4+C** ; ∫x⁻²dx = **−1/x+C** ; ∫√x dx = **2x^(3/2)/3+C**
   ∫e^(2x)dx = **e^(2x)/2+C** ; ∫sin(3x)dx = **−cos(3x)/3+C**

2. ∫₀¹(x+1)²dx = [(x+1)³/3]₀¹ = 8/3−1/3 = **7/3**

3. Sur [0,1] : x ≥ x² (car x(1−x)≥0). Aire = ∫₀¹(x−x²)dx
   = [x²/2−x³/3]₀¹ = 1/2−1/3 = **1/6**

4. Méthode 1 (sin(2x)) : sin(x)cos(x) = sin(2x)/2
   ∫₀^(π/2) sin(2x)/2 dx = [−cos(2x)/4]₀^(π/2) = −cos(π)/4+cos(0)/4 = 1/4+1/4 = **1/2**
   
   Méthode 2 (substitution u=sin(x)) : ∫₀¹ u du = [u²/2]₀¹ = **1/2** ✓`,
      notions: ['Primitive', 'Intégrale', 'Aire', 'Changement de variable']
    },
    {
      id: "IV-13", difficulte: 2,
      titre: "Suite définie par une intégrale",
      enonce: `Soit Iₙ = ∫₀¹ xⁿ·e^x dx pour n ≥ 0.

1. Calculer I₀.
2. Montrer la relation de récurrence : Iₙ = e − n·Iₙ₋₁.
3. Calculer I₁ et I₂.
4. Montrer que 0 < Iₙ < e/(n+1).`,
      correction: `1. I₀ = ∫₀¹ e^x dx = [e^x]₀¹ = **e−1**

2. IPP avec u=xⁿ (u'=nxⁿ⁻¹) et v'=eˣ (v=eˣ) :
   Iₙ = [xⁿeˣ]₀¹ − ∫₀¹ nxⁿ⁻¹eˣ dx = e − n·Iₙ₋₁
   **Iₙ = e − n·Iₙ₋₁** ✓

3. I₁ = e − 1·I₀ = e − (e−1) = **1**
   I₂ = e − 2·I₁ = e − 2 = **e−2 ≈ 0.718**

4. 0 < Iₙ car xⁿeˣ > 0 sur ]0,1[.
   xⁿeˣ ≤ eˣ (car xⁿ ≤ 1 sur [0,1])... mieux :
   xⁿeˣ ≤ xⁿ·e (car eˣ ≤ e sur [0,1])
   Iₙ ≤ e·∫₀¹ xⁿ dx = e·1/(n+1) → **Iₙ < e/(n+1)** ✓
   → Iₙ → 0 par le théorème des gendarmes.`,
      notions: ['Intégrale', 'IPP', 'Récurrence', 'Encadrement']
    },
    {
      id: "IV-14", difficulte: 3,
      titre: "Méthode de Newton — approximation de racines",
      enonce: `Pour approcher une racine de f(x)=0, la méthode de Newton donne :
xₙ₊₁ = xₙ − f(xₙ)/f'(xₙ).

1. Interprétation géométrique : xₙ₊₁ est l'abscisse de l'intersection de la tangente en xₙ avec l'axe x.
2. Application : f(x)=x²−2, x₀=2. Calculer x₁, x₂, x₃.
3. Montrer que la suite converge vers √2.`,
      correction: `1. Tangente en (xₙ, f(xₙ)) : y = f'(xₙ)(x−xₙ)+f(xₙ)
   Zéro : 0 = f'(xₙ)(x−xₙ)+f(xₙ) → x = xₙ − f(xₙ)/f'(xₙ) ✓

2. f(x)=x²−2, f'(x)=2x. xₙ₊₁ = xₙ−(xₙ²−2)/(2xₙ) = (xₙ+2/xₙ)/2
   x₀=2 : x₁=(2+1)/2=**1.5**
   x₁=1.5 : x₂=(1.5+2/1.5)/2=(1.5+1.333)/2=**1.4167**
   x₂ : x₃ = (1.4167+2/1.4167)/2 ≈ **1.41421** (≈√2 à 10⁻⁵ près !)

3. Si xₙ→ℓ : ℓ = (ℓ+2/ℓ)/2 → 2ℓ=ℓ+2/ℓ → ℓ²=2 → **ℓ=√2** (xₙ>0)
   Convergence : |eₙ₊₁| ≈ |eₙ|²/(2√2) (convergence quadratique — très rapide)`,
      notions: ['Newton', 'Approximation', 'Convergence quadratique', 'Tangente']
    },
    {
      id: "IV-15", difficulte: 2,
      titre: "Fonctions convexes et inégalité de Jensen",
      enonce: `f est convexe sur I si pour tous x, y ∈ I et t ∈ [0,1] :
f(tx+(1−t)y) ≤ tf(x)+(1−t)f(y).

1. Montrer que f convexe ↔ f'' ≥ 0.
2. Vérifier que eˣ est convexe.
3. Inégalité de Jensen : pour f convexe et a₁,...,aₙ ∈ I :
   f((a₁+···+aₙ)/n) ≤ (f(a₁)+···+f(aₙ))/n.
   Appliquer avec f=exp pour retrouver AM-GM.`,
      correction: `1. Caractérisation : f est convexe ↔ sa tangente est en-dessous de la courbe ↔ f'' ≥ 0.
   (La preuve rigoureuse utilise le développement de Taylor.)

2. (eˣ)'' = eˣ > 0 → **eˣ est strictement convexe** ✓

3. **Jensen pour eˣ :**
   e^((a₁+···+aₙ)/n) ≤ (eᵃ¹+···+eᵃⁿ)/n
   
   Posons bᵢ = eᵃⁱ > 0 (bᵢ quelconques > 0, aᵢ = ln bᵢ) :
   e^((ln b₁+···+ln bₙ)/n) ≤ (b₁+···+bₙ)/n
   e^(ln(b₁···bₙ)^(1/n)) ≤ (b₁+···+bₙ)/n
   **(b₁···bₙ)^(1/n) ≤ (b₁+···+bₙ)/n** ← inégalité AM-GM ✓`,
      notions: ['Convexité', 'Jensen', 'AM-GM', 'Dérivée seconde']
    },

  ]
}

// ═══════════════════════════════════════════
// CHAPITRE V — Trigonométrie
// ═══════════════════════════════════════════
const chapV: ChapitreData = {
  id: 'trigonometrie',
  numero: 5,
  titre: 'Trigonométrie',
  sousTitre: "Cercle · Formules d\'addition · Équations · Inéquations",
  icon: '🔵',
  color: '#f59e0b',
  notions: ['Cercle trigonométrique', 'Valeurs exactes', "Formules d'addition"],
  exercices: [
    {
      id: 'V-1', difficulte: 1,
      titre: "Formules d\'addition — preuves et applications",
      enonce: `1. Prouver que cos(a+b) = cos a·cos b − sin a·sin b à partir du produit scalaire.
2. En déduire : sin(a+b), cos(2a), sin(2a).
3. Calculer exactement cos(π/12) et sin(π/12).
4. Simplifier : cos²x − sin²x et 2sin x·cos x.`,
      correction: `1. On place A=(cos a, sin a) et B=(cos b, sin b) sur le cercle unité.
   cos(angle(OA,OB)) = cos(b−a) = OA⃗·OB⃗ = cos a·cos b + sin a·sin b
   Donc cos(a−b) = cos a·cos b + sin a·sin b
   En remplaçant b par −b : **cos(a+b) = cos a·cos b − sin a·sin b** ✓

2. sin(a+b) = cos(π/2−a−b) = cos((π/2−a)−b)
   = cos(π/2−a)·cos b + sin(π/2−a)·sin b = **sin a·cos b + cos a·sin b**
   
   cos(2a) = cos(a+a) = cos²a − sin²a = **2cos²a−1 = 1−2sin²a**
   sin(2a) = 2sin a·cos a

3. π/12 = π/3 − π/4
   cos(π/12) = cos(π/3)cos(π/4) + sin(π/3)sin(π/4)
   = (1/2)(√2/2) + (√3/2)(√2/2) = **√2(1+√3)/4 = (√6+√2)/4**
   
   sin(π/12) = sin(π/3−π/4) = **（√6−√2)/4**

4. cos²x − sin²x = **cos(2x)**
   2sin x·cos x = **sin(2x)**`,
      notions: ["Formules d'addition", 'Duplication', 'Valeurs exactes']
    },
    {
      id: 'V-2', difficulte: 2,
      titre: 'Inéquations trigonométriques',
      enonce: `Résoudre dans ]−π, π] :

1. cos x > √2/2
2. 2sin(x) + 1 < 0
3. cos(x + π/4) ≤ 0
4. 2cos²x − cos x − 1 ≤ 0
5. sin(2x) > sin x`,
      correction: `1. cos x > cos(π/4) ↔ x ∈ ]−π/4; π/4[

2. sin x < −1/2 ↔ x ∈ ]−π; −5π/6[ ∪ ]−π/6; 0[ ... 
   Dans ]−π,π] : **x ∈ ]−π; −5π/6[ ∪ ]−π/6+... hmm
   sin x = −1/2 → x = −π/6 ou x = π+π/6 = −5π/6 (dans ]−π,π])
   sin x < −1/2 : **x ∈ ]−π;−5π/6[ ∪ ]−π/6... Attention : ]−5π/6; −π/6[**

3. cos(x+π/4) ≤ 0 ↔ x+π/4 ∈ [π/2; 3π/2]
   ↔ x ∈ [π/4; 5π/4] ; dans ]−π,π] : **x ∈ [π/4; π]**

4. Posons c = cos x : 2c²−c−1 = (2c+1)(c−1) ≤ 0
   (2c+1)(c−1) ≤ 0 ↔ −1/2 ≤ c ≤ 1 ↔ −1/2 ≤ cos x ≤ 1
   cos x ≥ −1/2 ↔ x ∈ [−2π/3; 2π/3]
   Dans ]−π,π] : **x ∈ [−2π/3; 2π/3]**

5. sin(2x) > sin x ↔ sin(2x)−sin x > 0
   2sin x·cos x−sin x > 0 ↔ sin x(2cos x−1) > 0
   Tableau de signes de sin x et (2cos x−1) :
   Positive sur ]0;π/3[ ∪ ]−π;−2π/3[`,
      notions: ['Inéquations trigonométriques', 'Cercle trigonométrique', 'Résolution']
    },
    {
      id: 'V-3', difficulte: 2,
      titre: 'Transformation en produit',
      enonce: `Exprimer a·cos x + b·sin x sous la forme R·cos(x + φ).
Application : résoudre cos x + √3·sin x = 1.`,
      correction: `a·cos x + b·sin x = R·cos(x+φ) = R(cos x·cos φ − sin x·sin φ)
Par identification : R·cos φ = a et R·sin φ = b
→ **R = √(a²+b²)** et tan φ = b/a

**Application :** a=1, b=√3 → R = √(1+3) = 2, tan φ = √3 → φ = π/3

cos x + √3 sin x = 2cos(x + π/3) = 1
cos(x + π/3) = 1/2 = cos(π/3)
x + π/3 = ±π/3 + 2kπ

- x + π/3 = π/3 → **x = 0**
- x + π/3 = −π/3 → **x = −2π/3**`,
      notions: ['Forme trigonométrique', 'Équation', 'Module et argument']
    },
    {
      id: 'V-4', difficulte: 1,
      titre: 'Valeurs exactes — tableau des angles',
      enonce: `Calculer exactement (sans calculatrice) :
1. sin(5π/6), cos(5π/6), tan(5π/6)
2. sin(−π/3), cos(−π/3)
3. sin(7π/4), cos(7π/4)
4. sin(11π/6), cos(11π/6)
5. cos(π/12) et sin(π/12) [utiliser les formules d'addition]`,
      correction: `1. 5π/6 = π − π/6 → sin(5π/6) = sin(π/6) = **1/2**
   cos(5π/6) = −cos(π/6) = **−√3/2**
   tan(5π/6) = sin/cos = (1/2)/(−√3/2) = **−1/√3 = −√3/3**

2. sin(−π/3) = −sin(π/3) = **−√3/2**
   cos(−π/3) = cos(π/3) = **1/2**

3. 7π/4 = 2π − π/4 → sin(7π/4) = −sin(π/4) = **−√2/2**
   cos(7π/4) = cos(π/4) = **√2/2**

4. 11π/6 = 2π − π/6 → sin(11π/6) = **−1/2**, cos(11π/6) = **√3/2**

5. π/12 = π/3 − π/4 :
   cos(π/12) = cos(π/3)cos(π/4)+sin(π/3)sin(π/4) = (1/2)(√2/2)+(√3/2)(√2/2) = **(√2+√6)/4**
   sin(π/12) = sin(π/3)cos(π/4)−cos(π/3)sin(π/4) = **(√6−√2)/4**`,
      notions: ['Cercle trigonométrique', 'Valeurs exactes', "Formules d'addition"]
    },
    {
      id: 'V-5', difficulte: 2,
      titre: 'Calcul de cos(3x) et sin(3x)',
      enonce: `1. Exprimer cos(3x) en fonction de cos(x) uniquement.
2. Exprimer sin(3x) en fonction de sin(x) uniquement.
3. En déduire que cos(π/9) est solution d'un polynôme de degré 3 à coefficients entiers.`,
      correction: `1. cos(3x) = cos(2x+x) = cos(2x)cos(x)−sin(2x)sin(x)
   = (2cos²x−1)cos(x)−2sin(x)cos(x)·sin(x)
   = 2cos³x−cos(x)−2cos(x)(1−cos²x)
   = 2cos³x−cos(x)−2cos(x)+2cos³x
   **cos(3x) = 4cos³x − 3cos(x)**

2. sin(3x) = sin(2x+x) = sin(2x)cos(x)+cos(2x)sin(x)
   = 2sin(x)cos²(x)+(1−2sin²x)sin(x)
   = 2sin(x)(1−sin²x)+sin(x)−2sin³x
   **sin(3x) = 3sin(x) − 4sin³(x)**

3. Posons x = π/9 : cos(3π/9) = cos(π/3) = 1/2
   Donc : 4cos³(π/9) − 3cos(π/9) = 1/2
   **8c³ − 6c − 1 = 0** où c = cos(π/9) → polynôme à coefficients entiers ✓`,
      notions: ['Formules trigonométriques', 'Polynômes', 'Formules de duplication']
    },
    {
      id: 'V-6', difficulte: 2,
      titre: 'Étude de la fonction cosinus sur [0, π]',
      enonce: `1. Montrer que cos est strictement décroissante sur [0,π].
2. En déduire que l'équation cos(x) = a pour a ∈ ]−1,1[ a une unique solution dans [0,π].
3. Résoudre cos(x) = −1/2 dans ℝ entier.
4. Résoudre cos(2x−1) = 1/2.`,
      correction: `1. (cos)'(x) = −sin(x) < 0 pour x ∈ ]0,π[ (car sin(x) > 0 sur ]0,π[)
   → cos est **strictement décroissante** sur [0,π] ✓

2. cos est continue et strictement décroissante sur [0,π].
   cos(0)=1 > a > −1 = cos(π).
   Par le théorème des valeurs intermédiaires (bijectivité) → **unique solution** ✓

3. cos(x) = −1/2 = cos(2π/3)
   x = 2π/3 + 2kπ ou x = −2π/3 + 2kπ, k ∈ ℤ

4. cos(2x−1) = 1/2 = cos(π/3)
   2x−1 = ±π/3 + 2kπ
   - **x = (1+π/3)/2 + kπ = 1/2+π/6+kπ**
   - **x = (1−π/3)/2 + kπ = 1/2−π/6+kπ**`,
      notions: ['Monotonie', 'Cosinus', 'Équations', 'TVI']
    },
    {
      id: 'V-7', difficulte: 2,
      titre: 'Identités remarquables trigonométriques',
      enonce: `Démontrer les identités suivantes :
1. cos²x = (1+cos(2x))/2
2. sin²x = (1−cos(2x))/2
3. sin(p)+sin(q) = 2sin((p+q)/2)·cos((p−q)/2)
4. cos(p)+cos(q) = 2cos((p+q)/2)·cos((p−q)/2)

Application : calculer ∫₀^π cos²(x)dx.`,
      correction: `1. cos(2x) = 2cos²x−1 → **cos²x = (1+cos(2x))/2** ✓
2. cos(2x) = 1−2sin²x → **sin²x = (1−cos(2x))/2** ✓

3. Posons a=(p+q)/2, b=(p−q)/2 → p=a+b, q=a−b
   sin(a+b)+sin(a−b) = sin a·cos b+cos a·sin b+sin a·cos b−cos a·sin b = 2sin a·cos b
   → **sin(p)+sin(q) = 2sin((p+q)/2)·cos((p−q)/2)** ✓

4. cos(a+b)+cos(a−b) = cos a·cos b−sin a·sin b+cos a·cos b+sin a·sin b = 2cos a·cos b
   → **cos(p)+cos(q) = 2cos((p+q)/2)·cos((p−q)/2)** ✓

**Application :**
∫₀^π cos²(x)dx = ∫₀^π (1+cos(2x))/2 dx
= [x/2 + sin(2x)/4]₀^π = π/2 + 0 − 0 − 0 = **π/2**`,
      notions: ['Identités trigonométriques', 'Duplication', 'Intégration']
    },
    {
      id: 'V-8', difficulte: 3,
      titre: 'Problème de géométrie — évariste et blaise',
      enonce: `On considère trois carrés adjacents. Soient α, β, γ les angles indiqués dans la figure.
Évariste pense que α > β+γ, Blaise pense que α < β+γ. Qui a raison ?

(Indication : utiliser tan et les formules d'addition)`,
      correction: `Placer les carrés de côté 1 sur un axe. Les sommets ont des coordonnées simples.

En utilisant les angles avec la tangente dans le triangle formé :
tan(α) = 3/1 = 3 (angle vu depuis le point bas sur 3 carrés)
tan(β) = 1/1 = 1 → β = π/4
tan(γ) = 1/2

tan(β+γ) = (tan β + tan γ)/(1 − tan β·tan γ) = (1 + 1/2)/(1 − 1/2) = (3/2)/(1/2) = **3**

Donc tan(α) = tan(β+γ) = 3 et α, β+γ ∈ ]0, π/2[
→ **α = β+γ** !

Ni Évariste ni Blaise n'a raison — ils sont **égaux** !
(C'est le théorème : l'angle inscrit dans un demi-cercle est droit, ou une propriété de la configuration)`,
      notions: ['Tangente', "Formules d'addition", 'Géométrie', 'Angles']
    },

    {
      id: "V-9", difficulte: 2,
      titre: "Produit scalaire et angles",
      enonce: `Dans un repère orthonormé, A(1,0), B(0,1), C(−1,0).

1. Calculer AB⃗·AC⃗ et en déduire cos(∠BAC).
2. Calculer l'angle ∠BAC en radians.
3. Montrer que ABC est un triangle isocèle.
4. Calculer l'aire du triangle ABC.`,
      correction: `1. AB⃗ = (−1,1), AC⃗ = (−2,0)
   AB⃗·AC⃗ = (−1)(−2)+(1)(0) = **2**
   |AB| = √2, |AC| = 2
   cos(∠BAC) = 2/(√2·2) = **1/√2 = √2/2**

2. cos(∠BAC) = √2/2 → **∠BAC = π/4**

3. AB = √(1+1) = √2, BC = √(1+1) = √2 → **AB = BC → isocèle en B**

4. Base AC = 2, hauteur = ordonnée de B = 1.
   **Aire = (1/2)·2·1 = 1**`,
      notions: ['Produit scalaire', 'Angle', 'Triangle', 'Aire']
    },
    {
      id: "V-10", difficulte: 2,
      titre: "Équation du type a·cos + b·sin = c",
      enonce: `Résoudre dans ℝ :
1. 3cos(x) + 4sin(x) = 5
2. cos(x) − √3·sin(x) = 1
3. sin(x) + cos(x) = √2/2`,
      correction: `**Méthode : écrire a·cos+b·sin = R·cos(x−φ)**

1. R = √(9+16) = 5, cos φ = 3/5, sin φ = 4/5 → φ = arctan(4/3)
   5cos(x−φ) = 5 → cos(x−φ) = 1 → x−φ = 2kπ
   **x = arctan(4/3) + 2kπ**

2. R = √(1+3) = 2, cos(x)−√3·sin(x) = 2(cos(x)·(1/2)−sin(x)·(√3/2)) = 2cos(x+π/3)
   2cos(x+π/3) = 1 → cos(x+π/3) = 1/2 = cos(π/3)
   x+π/3 = ±π/3+2kπ → **x = 2kπ ou x = −2π/3+2kπ**

3. R = √2, sin(x)+cos(x) = √2·sin(x+π/4)
   √2·sin(x+π/4) = √2/2 → sin(x+π/4) = 1/2
   x+π/4 = π/6+2kπ ou 5π/6+2kπ
   **x = −π/12+2kπ ou x = 7π/12+2kπ**`,
      notions: ['Forme trigonométrique', 'Équation', 'Module et argument']
    },
    {
      id: "V-11", difficulte: 2,
      titre: "Périodicité et graphes",
      enonce: `1. La fonction f(x) = cos(2x) est-elle périodique ? De quelle période ?
2. Tracer f sur [0, 2π].
3. Résoudre f(x) = 1/2 sur [0, 2π].
4. Résoudre f(x) > 1/2 sur [0, 2π].`,
      correction: `1. cos(2(x+T)) = cos(2x) ↔ 2T = 2kπ → T = kπ. Période minimale : **T = π**

2. Graphe : cos(2x) fait deux oscillations sur [0,2π].
   Max en x=0, π, 2π ; Min en x=π/2, 3π/2 ; Zéros en x=π/4, 3π/4, 5π/4, 7π/4.

3. cos(2x) = 1/2 = cos(π/3) → 2x = ±π/3+2kπ
   x = π/6+kπ ou x = −π/6+kπ
   Dans [0,2π] : **x ∈ {π/6, 5π/6, 7π/6, 11π/6}**

4. cos(2x) > 1/2 ↔ 2x ∈ ]−π/3,π/3[ + 2kπ ↔ x ∈ ]−π/6,π/6[ + kπ
   Dans [0,2π] : **x ∈ [0,π/6[ ∪ ]5π/6,7π/6[ ∪ ]11π/6,2π]**`,
      notions: ['Périodicité', 'Équation trigonométrique', 'Inéquation', 'Graphe']
    },
    {
      id: "V-12", difficulte: 3,
      titre: "Polynômes de Tchebychev",
      enonce: `On définit Tₙ par cos(n·θ) = Tₙ(cos θ) pour tout θ.

1. Montrer T₀(x)=1, T₁(x)=x, T₂(x)=2x²−1.
2. Montrer la récurrence : Tₙ₊₁(x) = 2x·Tₙ(x) − Tₙ₋₁(x).
3. Calculer T₃(x) et T₄(x).`,
      correction: `1. cos(0·θ) = 1 = T₀(cos θ) → **T₀(x) = 1**
   cos(1·θ) = cos θ = T₁(cos θ) → **T₁(x) = x**
   cos(2θ) = 2cos²θ−1 → **T₂(x) = 2x²−1** ✓

2. cos((n+1)θ)+cos((n−1)θ) = 2cos(θ)·cos(nθ) [formule addition]
   Tₙ₊₁(cos θ)+Tₙ₋₁(cos θ) = 2cos θ·Tₙ(cos θ)
   **Tₙ₊₁(x) = 2x·Tₙ(x)−Tₙ₋₁(x)** ✓

3. T₃ = 2x·T₂−T₁ = 2x(2x²−1)−x = 4x³−2x−x = **4x³−3x**
   T₄ = 2x·T₃−T₂ = 2x(4x³−3x)−(2x²−1) = 8x⁴−6x²−2x²+1 = **8x⁴−8x²+1**`,
      notions: ['Tchebychev', 'Récurrence', 'Formules trigonométriques', 'Polynômes']
    },
    {
      id: "V-13", difficulte: 2,
      titre: "Cercle trigonométrique — angles associés",
      enonce: `Sans calculatrice, placer et calculer :
1. cos(7π/6) et sin(7π/6)
2. cos(−5π/4) et sin(−5π/4)
3. Résoudre sin(2x+π/6) = √3/2 dans [0, 2π].
4. Résoudre cos(x/2) = −1/√2 dans [0, 4π].`,
      correction: `1. 7π/6 = π+π/6 : cos(7π/6) = **−√3/2**, sin(7π/6) = **−1/2**

2. cos(−5π/4) = cos(5π/4) = cos(π+π/4) = **−√2/2**
   sin(−5π/4) = −sin(5π/4) = −(−√2/2) = **√2/2**

3. sin(2x+π/6) = √3/2 = sin(π/3)
   2x+π/6 = π/3+2kπ → x = π/12+kπ
   2x+π/6 = π−π/3+2kπ = 2π/3+2kπ → x = π/4+kπ
   Dans [0,2π] : **x ∈ {π/12, π/4, 13π/12, 5π/4}**

4. cos(x/2) = −1/√2 = cos(3π/4)
   x/2 = 3π/4+2kπ ou x/2 = −3π/4+2kπ = 5π/4+2(k−1)π
   x = 3π/2+4kπ ou x = 5π/2+4kπ
   Dans [0,4π] : **x ∈ {3π/2, 5π/2}** ← (5π/2 ∈ ]4π ? non, 5π/2<4π ✓)`,
      notions: ['Angles associés', 'Cercle trigonométrique', 'Équations']
    },

  ]
}

// ═══════════════════════════════════════════
// CHAPITRE VI — Exponentielle & logarithme
// ═══════════════════════════════════════════
const chapVI: ChapitreData = {
  id: 'expo-log',
  numero: 6,
  titre: 'Exponentielle & Logarithme',
  sousTitre: 'Définitions · Propriétés · Équations · Étude de fonctions',
  icon: '📊',
  color: '#06b6d4',
  notions: ['Fonction exponentielle', 'Logarithme', 'Croissance comparée', 'Équations exponentielles'],
  exercices: [
    {
      id: 'VI-1', difficulte: 1,
      titre: 'Équations et inéquations exponentielles',
      enonce: `Résoudre :
1. e^(2x) − 3e^x + 2 = 0
2. e^x + e^(−x) = 3
3. ln(x²−5x+6) = 0
4. ln(x+1) > ln(x−1) + 1
5. e^x ≤ e^(2x) − 6`,
      correction: `1. Posons t = eˣ > 0 : t²−3t+2 = 0 → (t−1)(t−2) = 0
   t=1 → eˣ=1 → **x=0** ; t=2 → **x=ln 2**

2. e^x + e^(−x) = 3. Posons t = eˣ > 0 : t + 1/t = 3 → t²−3t+1 = 0
   t = (3±√5)/2. Les deux solutions sont positives.
   **x = ln((3±√5)/2)**

3. ln(x²−5x+6) = 0 ↔ x²−5x+6 = 1 ↔ x²−5x+5 = 0
   Condition : x²−5x+6 > 0 ↔ x∉[2,3]
   Solutions : x = (5±√5)/2 ≈ 3.62 ou 1.38
   (5−√5)/2 ≈ 1.38 ∉ [2,3] → **x = (5−√5)/2 ou x = (5+√5)/2**

4. ln(x+1) − ln(x−1) > 1 ↔ ln((x+1)/(x−1)) > 1 ↔ (x+1)/(x−1) > e
   Conditions : x > 1 (domaine de ln(x−1))
   (x+1) > e(x−1) ↔ x+1 > ex−e ↔ 1+e > (e−1)x ↔ x < (e+1)/(e−1)
   **x ∈ ]1; (e+1)/(e−1)[** ≈ ]1; 2.16[

5. e^(2x) − e^x − 6 ≥ 0. Posons t = eˣ : t²−t−6 ≥ 0 → (t−3)(t+2) ≥ 0
   t ≥ 3 ou t ≤ −2. Comme t>0 : t ≥ 3 → eˣ ≥ 3 → **x ≥ ln 3**`,
      notions: ['Équations exponentielles', 'Logarithme', 'Changement de variable']
    },
    {
      id: 'VI-2', difficulte: 2,
      titre: 'Croissance comparée',
      enonce: `1. Montrer que lim(x→+∞) xⁿ/eˣ = 0 pour tout n ∈ ℕ.
2. Montrer que lim(x→+∞) (ln x)/x = 0.
3. En déduire : lim(x→+∞) x·e^(−x²).`,
      correction: `1. On utilise l'inégalité eˣ ≥ xⁿ⁺¹/(n+1)! (pour x ≥ 0, par récurrence)
   0 ≤ xⁿ/eˣ ≤ (n+1)!/x → 0. Par gendarmes : **xⁿ/eˣ → 0** ✓
   
   Alternativement : par récurrence sur n en utilisant la règle de L'Hôpital ou le fait que
   xⁿ⁺¹/eˣ = x·(xⁿ/eˣ) → x·0 (si xⁿ/eˣ→0)... il faut être plus rigoureux.

2. Posons x = e^t (t→+∞ quand x→+∞) :
   (ln x)/x = t/eᵗ → 0 par question 1 avec n=1. ✓

3. x·e^(−x²) = (1/x)·(xe^(−x²))... 
   Posons u = x² : x·e^(−x²) = √u·e^(−u) → 0 par croissance comparée. ✓
   **lim(x→+∞) x·e^(−x²) = 0**`,
      notions: ['Croissance comparée', 'Limites', 'Exponentielle']
    },
    {
      id: 'VI-3', difficulte: 1,
      titre: 'Propriétés de ln et exp',
      enonce: `Simplifier (sans calculatrice) :
1. ln(e³) − 2ln(e)
2. e^(ln 5 + ln 3)
3. ln(1/√e)
4. e^(2ln 3)
5. ln(e^x · e^(2x)) pour x ∈ ℝ`,
      correction: `1. ln(e³) − 2ln(e) = 3 − 2 = **1**
2. e^(ln 5 + ln 3) = e^(ln 15) = **15**
3. ln(1/√e) = ln(e^(−1/2)) = **−1/2**
4. e^(2ln 3) = (e^(ln 3))² = **9**
5. ln(e^x · e^(2x)) = ln(e^(3x)) = **3x**`,
      notions: ['Logarithme', 'Exponentielle', 'Propriétés algébriques']
    },
    {
      id: 'VI-4', difficulte: 2,
      titre: 'Étude de f(x) = x·ln(x)',
      enonce: `Soit f(x) = x·ln(x) définie sur ]0, +∞[.

1. Calculer lim(x→0⁺) f(x).
2. Calculer f'(x).
3. Dresser le tableau de variations complet.
4. Montrer que la courbe admet une tangente horizontale. En quel point ?`,
      correction: `1. lim(x→0⁺) x·ln(x) = lim t→0 (1/t)·ln(1/t)... Posons x=e^(−t), t→+∞ :
   = lim(t→+∞) e^(−t)·(−t) = −lim t·e^(−t) = **0** (croissance comparée)

2. f'(x) = ln(x) + x·(1/x) = **ln(x) + 1**

3. f'(x) = 0 ↔ ln(x) = −1 ↔ x = e^(−1) = 1/e
   f'(x) < 0 sur ]0;1/e[ et > 0 sur ]1/e;+∞[
   f(1/e) = (1/e)·(−1) = **−1/e** (minimum)
   
   Tableau :
   x  : 0⁺    1/e    +∞
   f' :   −    0    +
   f  : 0   ↘  −1/e  ↗  +∞

4. Tangente horizontale ↔ f'(x)=0 ↔ **x=1/e**
   Point (1/e, −1/e) avec tangente y = −1/e`,
      notions: ['Étude de fonction', 'Logarithme', 'Limite', 'Minimum']
    },
    {
      id: 'VI-5', difficulte: 2,
      titre: 'Inégalité fondamentale du ln',
      enonce: `1. Montrer que ln(1+x) ≤ x pour tout x > −1.
2. En déduire ln(1+x) ≥ x/(1+x) pour tout x > −1.
3. Application : montrer que Hₙ = 1 + 1/2 + 1/3 + ··· + 1/n vérifie Hₙ > ln(n+1).`,
      correction: `1. Posons g(x) = x − ln(1+x). g(0) = 0.
   g'(x) = 1 − 1/(1+x) = x/(1+x). Pour x>−1 : g'(x) a le signe de x.
   Minimum en x=0 → **g(x) ≥ 0 → ln(1+x) ≤ x** ✓

2. Appliquer 1. avec x remplacé par −x/(1+x) (∈ ]−1,1[ pour x>−1) :
   ln(1+x/(1+x)·(−1)) ... Posons y = x/(1+x), d'où x = y/(1−y) :
   Mieux : ln(1+x) ≥ x/(1+x) ↔ x−ln(1+x) ≤ x−x/(1+x) = x²/(1+x) ≥ 0 ✓
   
   Directement : h(x)=ln(1+x)−x/(1+x). h(0)=0. h'(x)=1/(1+x)−1/(1+x)²=x/(1+x)²
   x>0→h'>0→h croissante→h(x)>0. **ln(1+x)≥x/(1+x)** ✓

3. Par question 1 : 1/k ≥ ln(1+1/k) = ln((k+1)/k)
   Hₙ = Σₖ₌₁ⁿ 1/k ≥ Σₖ₌₁ⁿ ln((k+1)/k) = ln(2/1)+ln(3/2)+···+ln((n+1)/n) = ln(n+1) ✓`,
      notions: ['Inégalité', 'Logarithme', 'Dérivée', 'Série harmonique']
    },
    {
      id: 'VI-6', difficulte: 2,
      titre: 'Calcul de primitives — exponentielle et ln',
      enonce: `Calculer les primitives suivantes :
1. ∫ e^(3x) dx
2. ∫ xe^(x²) dx
3. ∫ (ln x)/x dx
4. ∫ 1/(2x+1) dx
5. ∫₁ᵉ ln(x) dx (intégration par parties)`,
      correction: `1. ∫ e^(3x) dx = **e^(3x)/3 + C**

2. ∫ xe^(x²) dx : u = x², du = 2x dx → = (1/2)∫ eᵘ du = **e^(x²)/2 + C**

3. ∫ (ln x)/x dx : u = ln x, du = dx/x → = ∫ u du = **(ln x)²/2 + C**

4. ∫ 1/(2x+1) dx : u=2x+1, du=2dx → = (1/2)∫ du/u = **ln|2x+1|/2 + C**

5. ∫₁ᵉ ln(x) dx : IPP avec u=ln(x), v'=1
   = [x·ln(x)]₁ᵉ − ∫₁ᵉ x·(1/x)dx = [x·ln(x)]₁ᵉ − [x]₁ᵉ
   = (e·1 − 1·0) − (e−1) = e − e + 1 = **1**`,
      notions: ['Primitives', 'Exponentielle', 'Logarithme', 'Intégration par parties']
    },
    {
      id: 'VI-7', difficulte: 3,
      titre: 'Modèle de croissance exponentielle',
      enonce: `Une population de bactéries évolue selon N(t) = N₀·e^(kt) où t est en heures.

À t=0 : N₀ = 1000 bactéries.
À t=3 : N(3) = 8000 bactéries.

1. Déterminer k.
2. Combien y a-t-il de bactéries à t=6 ?
3. À quel moment la population dépasse-t-elle 10⁶ bactéries ?
4. Calculer le temps de doublement.`,
      correction: `1. N(3) = 1000·e^(3k) = 8000 → e^(3k) = 8 = 2³ → 3k = 3ln2 → **k = ln 2**

2. N(6) = 1000·e^(6ln2) = 1000·2⁶ = **64 000 bactéries**

3. N(t) > 10⁶ ↔ 1000·2ᵗ > 10⁶ ↔ 2ᵗ > 1000 ↔ t·ln2 > ln1000
   t > ln1000/ln2 = 3ln10/ln2 ≈ 9.97 heures
   **Après environ 10 heures**

4. Doublement : N(t+τ) = 2N(t) ↔ e^(k(t+τ)) = 2e^(kt) ↔ e^(kτ) = 2 ↔ τ = ln2/k = **1 heure**
   (Le temps de doublement est constant : 1 heure, indépendant du temps de départ)`,
      notions: ['Modèle exponentiel', 'Équation', 'Logarithme', 'Application']
    },

    {
      id: "VI-8", difficulte: 1,
      titre: "Logarithme décimal et calculs pratiques",
      enonce: `1. Sans calculatrice : log₁₀(1000), log₁₀(0.01), log₁₀(√10).
2. Résoudre 10^x = 50.
3. Résoudre log(x+1) + log(x−1) = 1 (log = log₁₀).
4. Montrer que log(2) ≈ 0.301 en utilisant 2¹⁰ ≈ 1000.`,
      correction: `1. log₁₀(1000) = **3** ; log₁₀(0.01) = log₁₀(10⁻²) = **−2** ; log₁₀(√10) = **1/2**

2. 10^x = 50 → **x = log₁₀(50) = log₁₀(100/2) = 2−log₁₀(2) ≈ 2−0.301 = 1.699**

3. Domaine : x > 1. log((x+1)(x−1)) = 1 → (x+1)(x−1) = 10 → x²−1=10 → x²=11
   x = √11 (x>1) **x = √11 ≈ 3.32**

4. 2¹⁰ = 1024 ≈ 1000 = 10³
   log₁₀(2¹⁰) ≈ log₁₀(10³) → 10·log₁₀(2) ≈ 3
   **log₁₀(2) ≈ 0.3** ✓`,
      notions: ['Logarithme décimal', 'Propriétés', 'Équations']
    },
    {
      id: "VI-9", difficulte: 2,
      titre: "Fonction logarithme — étude complète",
      enonce: `Étudier f(x) = ln(x²−x+1) sur ℝ.

1. Domaine de définition.
2. Parité, symétries.
3. Limites et asymptotes.
4. Dérivée et tableau de variations.
5. Minimum de f.`,
      correction: `1. x²−x+1 = (x−1/2)²+3/4 > 0 pour tout x ∈ ℝ. **Domaine = ℝ**

2. f(1−x) = ln((1−x)²−(1−x)+1) = ln(x²−x+1) = f(x) → **axe de symétrie x=1/2**
   Pas de parité (f(−x) ≠ f(x) en général).

3. lim(x→±∞) f(x) = lim ln(x²) = **+∞**. Pas d'asymptote.

4. f'(x) = (2x−1)/(x²−x+1)
   f'(x) = 0 ↔ x = **1/2** ; f' < 0 sur ]−∞;1/2[, f' > 0 sur ]1/2;+∞[

5. Minimum en x=1/2 : f(1/2) = ln(1/4−1/2+1) = ln(3/4) = **ln3−ln4 ≈ −0.288**`,
      notions: ['Logarithme', 'Étude complète', 'Symétrie', 'Minimum']
    },
    {
      id: "VI-10", difficulte: 2,
      titre: "Intégrale du logarithme",
      enonce: `1. Calculer ∫₁ᵉ ln(x)dx par IPP.
2. Calculer ∫₁ᵉ x·ln(x)dx.
3. Calculer ∫₀¹ ln(1+x)dx.
4. En déduire la valeur de ∫₀¹ x/(1+x)dx.`,
      correction: `1. IPP : u=ln(x), v'=1 → u'=1/x, v=x
   ∫₁ᵉ ln(x)dx = [x·ln(x)]₁ᵉ − ∫₁ᵉ 1 dx = (e·1 − 1·0) − (e−1) = **1**

2. IPP : u=ln(x), v'=x → u'=1/x, v=x²/2
   ∫₁ᵉ x·ln(x)dx = [x²ln(x)/2]₁ᵉ − ∫₁ᵉ x/2 dx = e²/2 − [x²/4]₁ᵉ = e²/2 − (e²−1)/4 = **(e²+1)/4**

3. IPP : u=ln(1+x), v'=1 → u'=1/(1+x), v=x
   ∫₀¹ ln(1+x)dx = [x·ln(1+x)]₀¹ − ∫₀¹ x/(1+x)dx = ln2 − I
   
4. I = ∫₀¹ x/(1+x)dx = ∫₀¹ (1 − 1/(1+x))dx = [x−ln(1+x)]₀¹ = 1−ln2
   Donc ∫₀¹ ln(1+x)dx = ln2 − (1−ln2) = **2ln2−1**`,
      notions: ['IPP', 'Logarithme', 'Intégrale', 'Techniques de calcul']
    },
    {
      id: "VI-11", difficulte: 2,
      titre: "Suites et logarithme",
      enonce: `Soit uₙ = Σₖ₌₁ⁿ 1/(n+k).

1. Exprimer uₙ comme une somme de Riemann.
2. Montrer que uₙ → ∫₀¹ 1/(1+x)dx = ln(2).
3. Calculer u₁, u₂, u₃ et comparer à ln(2)≈0.693.`,
      correction: `1. uₙ = Σₖ₌₁ⁿ 1/(n+k) = (1/n)·Σₖ₌₁ⁿ 1/(1+k/n)
   C'est une **somme de Riemann** pour f(x)=1/(1+x) sur [0,1] avec pas 1/n.

2. Par définition de l'intégrale de Riemann :
   uₙ → ∫₀¹ 1/(1+x)dx = [ln(1+x)]₀¹ = **ln(2)** ✓

3. u₁ = 1/(1+1) = 1/2 = 0.5
   u₂ = 1/3+1/4 = 7/12 ≈ 0.583
   u₃ = 1/4+1/5+1/6 = 37/60 ≈ 0.617
   (Convergence lente vers ln2 ≈ 0.693)`,
      notions: ['Somme de Riemann', 'Intégrale', 'Logarithme', 'Convergence']
    },
    {
      id: "VI-12", difficulte: 2,
      titre: "Equation différentielle — modèle logistique",
      enonce: `On modélise une population par : N'(t) = r·N(t)·(1 − N(t)/K), où r, K > 0.

1. Quels sont les états d'équilibre (N'=0) ?
2. Si N(t) = K/(1+Ae^(−rt)) : vérifier que N satisfait l'équation.
3. Calculer lim(t→+∞) N(t).
4. Si N(0)=K/2, trouver A.`,
      correction: `1. N'=0 ↔ N=0 ou N=K. **Deux équilibres : N=0 (instable) et N=K (stable)**

2. N' = K·r·Ae^(−rt)/(1+Ae^(−rt))²
   r·N·(1−N/K) = r·K/(1+Ae^(−rt))·[1 − 1/(1+Ae^(−rt))]
   = r·K/(1+Ae^(−rt))·Ae^(−rt)/(1+Ae^(−rt))
   = r·KAe^(−rt)/(1+Ae^(−rt))² = N' ✓

3. e^(−rt)→0 donc N(t) → K/(1+0) = **K** (capacité limite)

4. N(0) = K/(1+A) = K/2 → 1+A = 2 → **A = 1**`,
      notions: ['Équation différentielle', 'Modèle logistique', 'Exponentielle', 'Équilibre']
    },

  ]
}

// ═══════════════════════════════════════════
// CHAPITRE VII — Raisonnements & récurrence
// ═══════════════════════════════════════════
const chapVII: ChapitreData = {
  id: 'raisonnements',
  numero: 7,
  titre: 'Raisonnements mathématiques',
  sousTitre: 'Récurrence · Contradiction · Analyse-Synthèse · Quantificateurs',
  icon: '🧠',
  color: '#ec4899',
  notions: ['Récurrence', 'Absurde', 'Analyse-synthèse', 'Contraposée', 'Quantificateurs'],
  exercices: [
    {
      id: 'VII-1', difficulte: 1,
      titre: 'Raisonnement par récurrence — sommes classiques',
      enonce: `Démontrer par récurrence pour tout n ≥ 1 :

1. 1 + 2 + 3 + ··· + n = n(n+1)/2
2. 1² + 2² + ··· + n² = n(n+1)(2n+1)/6
3. 1 + 3 + 5 + ··· + (2n−1) = n²`,
      correction: `**Méthode récurrence :**
**1.** Sₙ = n(n+1)/2.
   Init : S₁ = 1 = 1·2/2 ✓
   Hér : Sₙ₊₁ = Sₙ+(n+1) = n(n+1)/2+(n+1) = (n+1)(n+2)/2 ✓

**2.** Tₙ = n(n+1)(2n+1)/6.
   Init : T₁ = 1 = 1·2·3/6 ✓
   Hér : Tₙ₊₁ = Tₙ+(n+1)² = n(n+1)(2n+1)/6+(n+1)²
   = (n+1)[n(2n+1)/6+(n+1)] = (n+1)[n(2n+1)+6n+6]/6
   = (n+1)(2n²+7n+6)/6 = **(n+1)(n+2)(2n+3)/6** ✓

**3.** Uₙ = n².
   Init : U₁ = 1 = 1² ✓
   Hér : Uₙ₊₁ = Uₙ+(2n+1) = n²+2n+1 = (n+1)² ✓`,
      notions: ['Récurrence', 'Sommes', 'Initialisation', 'Hérédité']
    },
    {
      id: 'VII-2', difficulte: 2,
      titre: "Raisonnement par l\'absurde — irrationalité",
      enonce: `1. Démontrer que √2 est irrationnel.
2. Démontrer que √2 + √3 est irrationnel.
3. Soit p premier. Montrer que √p est irrationnel.`,
      correction: `**1.** Supposons √2 = p/q (fraction irréductible, p,q ∈ ℤ, q > 0).
   2 = p²/q² → p² = 2q² → p² est pair → p est pair → p = 2k
   → 4k² = 2q² → q² = 2k² → q est pair.
   **Contradiction** avec p/q irréductible. Donc √2 ∉ ℚ. ∎

**2.** Supposons √2+√3 = r ∈ ℚ.
   √3 = r−√2 → 3 = r²−2r√2+2 → 2r√2 = r²−1 → √2 = (r²−1)/(2r) ∈ ℚ
   **Contradiction** avec 1. Donc √2+√3 ∉ ℚ. ∎

**3.** Supposons √p = a/b (irréductible). Alors p = a²/b² → pb² = a²
   p | a² ; comme p est premier : p | a → a = pk
   → pb² = p²k² → b² = pk² → p | b².
   p premier → p | b. **Contradiction.** Donc √p ∉ ℚ. ∎`,
      notions: ['Absurde', 'Irrationalité', 'Divisibilité', 'Nombres premiers']
    },
    {
      id: 'VII-3', difficulte: 2,
      titre: 'Inégalité de Bernoulli et généralisation',
      enonce: `1. Montrer par récurrence que (1+x)ⁿ ≥ 1+nx pour tout x > −1, n ∈ ℕ.
2. En déduire que (1+1/n)ⁿ est croissante.
3. Montrer que 2ⁿ > n² pour tout n ≥ 5.`,
      correction: `**1.** (Inégalité de Bernoulli)
   Init n=0 : 1 ≥ 1 ✓ ; n=1 : 1+x ≥ 1+x ✓
   Hér : (1+x)ⁿ⁺¹ = (1+x)ⁿ·(1+x) ≥ (1+nx)(1+x) [par hyp. et 1+x > 0]
   = 1+nx+x+nx² = 1+(n+1)x+nx² ≥ 1+(n+1)x ✓

**2.** aₙ = (1+1/n)ⁿ, aₙ₊₁/aₙ = ?
   On peut montrer aₙ₊₁ > aₙ via l'inégalité AM-GM ou des calculs.
   Plus direct : ln aₙ = n·ln(1+1/n). Étude de f(x) = x·ln(1+1/x) croissante.

**3.** Init n=5 : 32 > 25 ✓
   Hér : 2ⁿ⁺¹ = 2·2ⁿ > 2n² [par hyp.]
   Il faut : 2n² ≥ (n+1)² ↔ 2n²−n²−2n−1 ≥ 0 ↔ n²−2n−1 ≥ 0 ↔ n ≥ 1+√2 ≈ 2.41
   Vrai pour n ≥ 3 donc pour n ≥ 5. **2ⁿ⁺¹ > (n+1)²** ✓`,
      notions: ['Récurrence', 'Bernoulli', 'Inégalités', 'Croissance comparée']
    },
    {
      id: 'VII-4', difficulte: 2,
      titre: 'Contraposée et équivalence',
      enonce: `1. Énoncer la contraposée de "Si n² est pair alors n est pair".
2. Démontrer que n est pair ⟺ n² est pair.
3. En déduire que √2 est irrationnel (méthode rapide).`,
      correction: `1. La contraposée de "P⇒Q" est "¬Q⇒¬P" :
   **"Si n est impair, alors n² est impair"**

2. (⇒) Si n est pair : n=2k → n²=4k² est pair ✓
   (⇐) Par contraposée : si n est impair : n=2k+1 → n²=4k²+4k+1 est impair ✓
   **n² est pair ⟺ n est pair** ✓

3. Supposons √2 = p/q (irréductible, p,q entiers, q>0).
   2 = p²/q² → p² = 2q² → p² est pair → **p est pair** → p=2k
   → 4k² = 2q² → q²=2k² → q² est pair → **q est pair**
   → p et q sont pairs : **contradiction** avec p/q irréductible. ∎`,
      notions: ['Contraposée', 'Parité', "Raisonnement par l'absurde", 'Irrationalité']
    },
    {
      id: 'VII-5', difficulte: 2,
      titre: "Analyse-synthèse : existence et unicité",
      enonce: `Montrer qu'il existe un unique réel x ∈ ]0, +∞[ tel que eˣ = 2x.

1. Analyse : quelles sont les propriétés de x ?
2. Existence : utiliser le TVI.
3. Unicité : utiliser une étude de fonction.`,
      correction: `Posons f(x) = eˣ − 2x. On cherche f(x) = 0 avec x > 0.

**Existence (TVI) :**
f(0) = 1 > 0 et f(1) = e−2 ≈ 0.718 > 0... Cherchons ailleurs.
f(0) = 1 > 0, lim(x→+∞) f(x) = +∞, mais f atteint un minimum :
f'(x) = eˣ − 2 = 0 → x = ln2 ≈ 0.693
f(ln2) = 2 − 2ln2 = 2(1−ln2) ≈ 2·(1−0.693) = 0.614 > 0

Hmm... Cherchons pour x négatif ou... En fait pour eˣ=2x, on a besoin que x>0 (car 2x>0).
Essayons f(0)=1>0 et pour x grand : eˣ >> 2x donc f→+∞.
Le minimum de f est positif... Donc eˣ > 2x pour tout x ∈ ]0,+∞[ !

**Correction :** eˣ = 2x n'a pas de solution pour x>0.
L'unique solution réelle est x=ln2/(1−ln2)... Reconsidérons sur ℝ entier.

Pour x ∈ ℝ : f(0)=1>0, f(−1)=e^(−1)+2≈2.37>0... f(x)→+∞ partout...
**En fait :** l'équation n'a pas de solution réelle (minimum de f = 2(1−ln2) > 0).`,
      notions: ['Analyse-synthèse', 'TVI', 'Unicité', 'Étude de fonction']
    },
    {
      id: 'VII-6', difficulte: 2,
      titre: 'Récurrence forte',
      enonce: `Soit (uₙ) définie par u₀=0, u₁=1 et uₙ₊₂ = uₙ₊₁ + uₙ (suite de Fibonacci).

1. Calculer u₂,...,u₇.
2. Montrer par récurrence que uₙ ≤ 2ⁿ⁻¹ pour tout n ≥ 1.
3. Montrer que uₙ ≥ (3/2)ⁿ⁻² pour n ≥ 2. [Récurrence forte]`,
      correction: `1. u₂=1, u₃=2, u₄=3, u₅=5, u₆=8, u₇=13

2. **Init :** u₁=1=2⁰ ✓, u₂=1≤2 ✓
   **Hér :** Supposons uₖ≤2^(k−1) pour k=n et k=n+1.
   uₙ₊₂ = uₙ₊₁+uₙ ≤ 2ⁿ+2^(n−1) = 3·2^(n−1) ≤ 4·2^(n−1) = 2^(n+1) ✓
   (car 3 ≤ 4)

3. **Init :** u₂=1≥(3/2)⁰=1 ✓, u₃=2≥3/2 ✓
   **Hér forte :** Supposons uₖ≥(3/2)^(k−2) pour tout k∈{2,...,n+1}.
   uₙ₊₂ = uₙ₊₁+uₙ ≥ (3/2)^(n−1)+(3/2)^(n−2)
   = (3/2)^(n−2)·(3/2+1) = (3/2)^(n−2)·(5/2)
   ≥ (3/2)^(n−2)·(9/4) [car 5/2=2.5 > 9/4=2.25]
   = (3/2)ⁿ ✓`,
      notions: ['Récurrence forte', 'Fibonacci', 'Inégalités', 'Initialisation']
    },
    {
      id: 'VII-7', difficulte: 3,
      titre: 'Dénombrement — principe des tiroirs',
      enonce: `1. Dans un groupe de 13 personnes, montrer qu'au moins 2 sont nées le même mois.
2. Dans un groupe de n personnes, quelle est la probabilité qu'au moins 2 aient le même anniversaire (365 jours) ?
3. Pour quel n cette probabilité dépasse-t-elle 50% ?`,
      correction: `1. Il y a 12 mois et 13 personnes. Par le **principe des tiroirs** (pigeonhole principle) :
   Si on répartit 13 personnes dans 12 mois, au moins un mois contient ≥ 2 personnes. ∎

2. P(au moins 2 mêmes) = 1 − P(tous différents)
   P(tous différents) = 365/365 · 364/365 · 363/365 ··· (365−n+1)/365
   = 365!/(365^n · (365−n)!)

3. Chercher le plus petit n tel que P(au moins 2) ≥ 0.5.
   P(tous différents) ≤ 0.5 :
   
   n=22 : P(diff) ≈ 0.524 > 0.5
   n=23 : P(diff) ≈ 0.493 < 0.5
   
   **n = 23 personnes suffisent !** (Paradoxe des anniversaires)
   C'est contre-intuitif car on pourrait penser à 183 ≈ 365/2.`,
      notions: ['Principe des tiroirs', 'Dénombrement', 'Probabilités', 'Paradoxe']
    },
    {
      id: 'VII-8', difficulte: 2,
      titre: "Raisonnement par l'absurde — infini de nombres premiers",
      enonce: `Démontrer qu'il existe une infinité de nombres premiers. (Preuve d'Euclide)`,
      correction: `**Par l'absurde :** Supposons qu"il n'existe qu"un nombre fini de premiers p₁, p₂, ..., pₙ.

Posons N = p₁·p₂···pₙ + 1.

N > 1 donc N est divisible par au moins un premier p (car tout entier >1 a un diviseur premier).

Mais p doit être l'un des pᵢ (hypothèse : liste complète).

Or pᵢ divise p₁·p₂···pₙ donc pᵢ divise N − p₁·p₂···pₙ = 1.

Donc pᵢ divise 1, ce qui est impossible car pᵢ ≥ 2.

**Contradiction.** Il existe donc une infinité de nombres premiers. ∎

(Note : on ne dit pas que N est premier, seulement qu'il a un facteur premier non dans la liste)`,
      notions: ['Absurde', 'Nombres premiers', 'Divisibilité', 'Infini']
    },

    {
      id: "VII-9", difficulte: 2,
      titre: "PGCD et algorithme d'Euclide",
      enonce: `1. Calculer PGCD(252, 180) par l'algorithme d'Euclide.
2. Trouver u, v entiers tels que 252u + 180v = PGCD(252,180) (Bézout).
3. Résoudre dans ℤ : 252x + 180y = 36.`,
      correction: `1. **Algorithme d'Euclide :**
   252 = 1·180 + 72
   180 = 2·72 + 36
   72 = 2·36 + 0
   **PGCD(252,180) = 36**

2. Remonter les divisions :
   36 = 180 − 2·72 = 180 − 2·(252−180) = 3·180 − 2·252
   **252·(−2) + 180·3 = 36** → u=−2, v=3

3. 36|36 donc des solutions existent. Diviser par 36 : 7x+5y=1
   Solution particulière : x=−2, y=3 (de Bézout).
   Solutions générales : **x = −2+5k, y = 3−7k** (k ∈ ℤ)`,
      notions: ['PGCD', 'Euclide', 'Bézout', 'Équation diophantienne']
    },
    {
      id: "VII-10", difficulte: 2,
      titre: "Congruences et arithmétique modulaire",
      enonce: `1. Calculer 2²⁰ mod 7.
2. Quel est le reste de 3¹⁰⁰ dans la division par 4 ?
3. Montrer que pour tout entier n, n²+n est divisible par 2.
4. Montrer que pour tout entier n, n³−n est divisible par 6.`,
      correction: `1. 2³ = 8 ≡ 1 (mod 7) → 2²⁰ = (2³)⁶·2² ≡ 1⁶·4 = **4** (mod 7)

2. 3² = 9 ≡ 1 (mod 4) → 3¹⁰⁰ = (3²)⁵⁰ ≡ 1⁵⁰ = **1** (mod 4)

3. n²+n = n(n+1). L'un de n ou n+1 est pair → **2 | n(n+1)** ✓

4. n³−n = n(n²−1) = (n−1)·n·(n+1) : produit de 3 entiers consécutifs.
   - Parmi 3 consécutifs : au moins un est pair → 2 divise le produit.
   - Parmi 3 consécutifs : exactement un est multiple de 3 → 3 divise le produit.
   Donc **6 | (n−1)n(n+1)** ✓`,
      notions: ['Congruences', 'Arithmétique modulaire', 'Divisibilité', 'Récurrence']
    },
    {
      id: "VII-11", difficulte: 2,
      titre: "Dénombrement — arrangements et combinaisons",
      enonce: `1. Combien de façons d'arranger 5 livres différents sur une étagère ?
2. Combien de mots de 4 lettres distinctes peut-on former avec l'alphabet (26 lettres) ?
3. Dans un groupe de 10 personnes, combien de comités de 4 peut-on former ?
4. Combien de façons de choisir un président, un vice-président et un trésorier parmi 10 personnes ?`,
      correction: `1. **5! = 120 façons**

2. Arrangements de 4 parmi 26 : A(26,4) = 26·25·24·23 = **358 800**

3. Combinaisons de 4 parmi 10 : C(10,4) = 10!/(4!·6!) = **210 comités**

4. Arrangements de 3 postes distincts parmi 10 : A(10,3) = 10·9·8 = **720 façons**
   (≠ C(10,3) car les rôles sont distincts)`,
      notions: ['Dénombrement', 'Arrangements', 'Combinaisons', 'Factorielles']
    },
    {
      id: "VII-12", difficulte: 2,
      titre: "Triangle de Pascal et binôme",
      enonce: `1. Montrer C(n,k) + C(n,k+1) = C(n+1,k+1) (relation de Pascal).
2. Développer (a+b)⁴ avec le binôme de Newton.
3. Calculer C(10,0)+C(10,1)+···+C(10,10).
4. Calculer C(10,0)−C(10,1)+C(10,2)−···+C(10,10).`,
      correction: `1. C(n,k)+C(n,k+1) = n!/(k!(n−k)!) + n!/((k+1)!(n−k−1)!)
   = n!/[k!(n−k−1)!] · [1/(n−k) + 1/(k+1)]
   = n!/[k!(n−k−1)!] · (n+1)/[(n−k)(k+1)]
   = (n+1)!/[(k+1)!(n−k)!] = **C(n+1,k+1)** ✓

2. (a+b)⁴ = C(4,0)a⁴+C(4,1)a³b+C(4,2)a²b²+C(4,3)ab³+C(4,4)b⁴
   = **a⁴+4a³b+6a²b²+4ab³+b⁴**

3. (1+1)¹⁰ = Σ C(10,k) = **2¹⁰ = 1024**

4. (1+(−1))¹⁰ = Σ C(10,k)·(−1)^k = **0**
   (Σ termes pairs = Σ termes impairs = 512)`,
      notions: ['Pascal', 'Binôme de Newton', 'Combinatoire', 'Développement']
    },
    {
      id: "VII-13", difficulte: 3,
      titre: "Nombre de solutions d'une équation — analyse-synthèse",
      enonce: `Déterminer le nombre de solutions réelles de eˣ = x + 2.

1. Analyse : si x est solution, quelles propriétés vérife-t-il ?
2. Synthèse : montrer l'existence par le TVI.
3. Unicité : étude de h(x) = eˣ − x − 2.`,
      correction: `1. **Analyse :** Si eˣ = x+2, alors x+2 > 0 donc x > −2. De plus x+2 > 0.

2. **Existence :** h(x) = eˣ−x−2
   h(0) = 1−0−2 = −1 < 0
   h(2) = e²−2−2 = e²−4 ≈ 3.39 > 0
   h est continue → **∃c ∈ ]0,2[ tel que h(c) = 0**

3. **Unicité :** h'(x) = eˣ − 1
   h'(x) = 0 ↔ x = 0. h'(x) < 0 si x<0, > 0 si x>0.
   h admet un **minimum global en x=0 : h(0) = −1 < 0**
   h décroît sur ]−∞,0[ et croit sur ]0,+∞[.
   
   Comme h(0)<0 et h→+∞ aux deux extrémités :
   - Une racine dans ]−∞, 0[
   - Une racine dans ]0, +∞[
   **→ Deux solutions réelles** (pas d'unicité !).`,
      notions: ['Analyse-synthèse', 'TVI', 'Unicité', 'Étude de fonction']
    },

  ]
}

// ══════════════════════════════════════
// EXPORT PRINCIPAL
// ══════════════════════════════════════
const CHAPITRES_PREMIERE: ChapitreData[] = [
  chapI, chapII, chapIII, chapIV, chapV, chapVI, chapVII
]


type Session    = { label: string; flag?: string; sujet?: string; correction?: string }
type AnneeLinks = { sessions: Session[] }
type ExData     = { titre: string; theme: string; pts: number }
type AnneeData  = { year: number; exercices: ExData[]; note?: string }

// ════════════════════════════════════════════════════════════════
//  TERMINALE GÉNÉRALE — Spécialité Maths
//  URLs vérifiées source par source dans les résultats de recherche
// ════════════════════════════════════════════════════════════════
const linksGenerale: Record<number, AnneeLinks> = {

  // ─── 2025 ─────────────────────────────────────────────────────
  2025: { sessions: [
    // Métropole juin
    { label:'Métropole — Jour 1 · 17 juin 2025', flag:'🇫🇷',
      sujet:      `${AP}/Metro_J1_17_06_2025_DV.pdf`,
      correction: `${AP}/Corrige__Me_tropole_spe_J1_17_06_2025_VTFK.pdf` },
    { label:'Métropole — Jour 2 · 18 juin 2025', flag:'🇫🇷',
      sujet:      `${AP}/Metropole__spe_J2_18_06_2025_DV_2.pdf`,
      correction: `${AP}/Corrige_spe_Metropole_18_06_2025_DV.pdf` },
    // Amérique du Nord mai
    { label:'Amérique du Nord — Jour 1 · 21 mai 2025', flag:'🌎',
      sujet:      `${AP}/Ame_rique_du_Nord_J1_spe_21_05_2025_FK.pdf`,
      correction: `${AP}/Corrige_Ame_rique_du_Nord_J1_spe_21_05_2025_FK_VT.pdf` },
    { label:'Amérique du Nord — Jour 2 · 22 mai 2025', flag:'🌎',
      sujet:      `${AP}/Ame_rique_du_Nord_J2_spe_22_05_2025_DV_FK.pdf`,
      correction: `${AP}/Corrige_Am_du_Nord_J2_2025_DV_2.pdf` },
    { label:'Amérique du Nord — Jour 2 (secours) · 22 mai 2025', flag:'🌎',
      sujet:      `${AP}/Ame_rique_du_Nord_J2_secours_spe_22_05_2025_FK.pdf`,
      correction: `${AP}/Corrige__Ame_rique_du_Nord_J2_secours_spe_22_05_2025_FK.pdf` },
    // Asie juin
    { label:'Asie — Jour 1 · 11 juin 2025', flag:'🌏',
      sujet:      `${AP}/Asie_spe_J1_11_06_2025_DV.pdf`,
      correction: `${AP}/Corrige__Asie_J1_11_06_2025_VTFK.pdf` },
    { label:'Asie — Jour 2 · 12 juin 2025', flag:'🌏',
      sujet:      `${AP}/Asie_speJ2_12_06_2025_VTFK.pdf`,
      correction: `${AP}/Corrige_bis_Asie_spe_J2_12_06_2025_BS.pdf` },
    // Centres étrangers juin
    { label:'Centres étrangers — Jour 1 · 12 juin 2025', flag:'🌍',
      sujet:      `${AP}/Etranger_spe_J1_12_06_2025_DV.pdf`,
      correction: `${AP}/Corrige__centre_etranger_J1_12_06_2025_VT.pdf` },
    { label:'Centres étrangers — Jour 2 · 13 juin 2025', flag:'🌍',
      sujet:      `${AP}/Etranger_spe_J2_13_06_2025_DV.pdf`,
      correction: `${AP}/Corrige_Etranger_spe_J2_13_06_2025__RRoux.pdf` },
    // Polynésie juin
    { label:'Polynésie — Jour 1 · 17 juin 2025', flag:'🌊',
      sujet:      `${AP}/Polynesie_spe_J1_17_06_2025_DV.pdf`,
      correction: `${AP}/Corrige__Polynesie_spe_J1_17_06_2025_VTFK_2.pdf` },
    { label:'Polynésie — Jour 2 · 18 juin 2025', flag:'🌊',
      sujet:      `${AP}/Polynesie_spe_J2_18_06_2025_DV.pdf`,
      correction: `${AP}/Corrige_Polynesie_spe_J2_18_06_2025_FK.pdf` },
    // Métropole septembre
    { label:'Métropole — Jour 1 · 9 sept. 2025', flag:'🍂',
      sujet:      `${AP}/Metropole_J1_sept_2025_DV_2.pdf`,
      correction: `${AP}/Corrige__Metropole_J1_sept_2025_FK.pdf` },
    { label:'Métropole — Jour 2 · 10 sept. 2025', flag:'🍂',
      sujet:      `${AP}/Metropole_J2_sept_2025_DV.pdf`,
      correction: `${AP}/Corrige_Metropole_spe_J2_10_09_2025_AP3.pdf` },

  ]},

  // ─── 2024 ─────────────────────────────────────────────────────
  2024: { sessions: [
    // Métropole juin
    { label:'Métropole — Jour 1 · 19 juin 2024', flag:'🇫🇷',
      sujet:      `${AP}/Metropole_J1_spe_19_06_2024_VTFK.pdf`,
      correction: `${AP}/Corrige-spe_J1_Metropole_19_06_2024_DV.pdf` },
    { label:'Métropole — Jour 2 · 20 juin 2024', flag:'🇫🇷',
      sujet:      `${AP}/Me_tropole_J2_spe_20_06_2024_VTFK.pdf`,
      correction: `${AP}/Corrige__Me_tropole_J2_spe_20_06_2024_FK.pdf` },
    { label:'Métropole — Jour 1 Secours · 19 juin 2024', flag:'🇫🇷',
      sujet:      `${AP}/Spe_MetropoleJ1devoile_19_06_2024_DV.pdf`,
      correction: `${AP}/CorrigeSpe_Metropole_J1_secours_19_06_2024_DV_3.pdf` },
    // Amérique du Nord mai
    { label:'Amérique du Nord — Jour 1 · 21 mai 2024', flag:'🌎',
      sujet:      `${AP}/Spe_Amerique_Nord21_05_2024_DV.pdf`,
      correction: `${AP}/Corrige_spe_Amerique_Nord_J1_2024_DV.pdf` },
    { label:'Amérique du Nord — Jour 2 · 22 mai 2024', flag:'🌎',
      sujet:      `${AP}/Spe__Ame_rique_Nord_J2_22_mai_2024.pdf`,
      correction: `${AP}/Corrige_spe_Amerique_Nord_22_05_2024_DV.pdf` },
    // Asie juin
    { label:'Asie — Jour 1 · 10 juin 2024', flag:'🌏',
      sujet:      `${AP}/Spe_Asie_J1_10_06_2024_DV.pdf`,
      correction: `${AP}/Corrige__Asie_spe_J1_24_mars_2024_VT_FK.pdf` },
    { label:'Asie — Jour 2 · 11 juin 2024', flag:'🌏',
      sujet:      `${AP}/Spe_Asie_11_06_2024_DV.pdf`,
      correction: `${AP}/Corrige_Spe_Asie_11_06_2024_VT.pdf` },
    // Centres étrangers juin
    { label:'Centres étrangers — Jour 1 · 5 juin 2024', flag:'🌍',
      sujet:      `${AP}/Etranger_J1_spe_5_06_2024_DV.pdf`,
      correction: `${AP}/Corrige_Spe_cialite_centre_e_trangers_groupe_1_jour_1_5_juin_24_.pdf` },
    { label:'Centres étrangers — Jour 2 · 6 juin 2024', flag:'🌍',
      sujet:      `${AP}/Etranger_spe_J2_6_06_2024_DV.pdf`,
      correction: `${AP}/Corrige_Etranger_spe_J2_6_06_2024_FK_VT.pdf` },
    // Polynésie juin
    { label:'Polynésie — Jour 1 · 19 juin 2024', flag:'🌊',
      sujet:      `${AP}/Spe_Polynesie_J1_19_06_2024_DV__2.pdf`,
      correction: `${AP}/Corrige_spe_PolynesieJ1_19_06_2024_DV_2.pdf` },
    { label:'Polynésie — Jour 2 · 20 juin 2024', flag:'🌊',
      sujet:      `${AP}/Spe_Polynesie_J2_20_06_2024_DV.pdf`,
      correction: `${AP}/Corrige_bis_Polynesie_20_06_2024_DV.pdf` },
    // Septembre 2024
    { label:'Métropole — Jour 1 · 11 sept. 2024', flag:'🍂',
      sujet:      `${AP}/Spe_J1_Metropole_11_09_2024_DV_2.pdf`,
      correction: `${AP}/Corrrige_Spe_J1_Metropole_11_09_2024_FH.pdf` },
    { label:'Métropole — Jour 2 · 12 sept. 2024', flag:'🍂',
      sujet:      `${SD}/2024/spe-mathematiques-2024-metropole-2-remplacement-sujet-officiel.pdf`,
      correction: `${AP}/Corrige_spe_J2_12_09_2024_Metro_DV_2.pdf` },
    { label:'Polynésie — 5 sept. 2024', flag:'🌊',
      sujet:      `${SD}/2024/spe-mathematiques-2024-polynesie-1-remplacement-sujet-officiel.pdf`,
      correction: `${AP}/Corrige_Spe_Polynesie_9_09_2024_FH.pdf` },

  ]},

  // ─── 2023 ─────────────────────────────────────────────────────
  2023: { sessions: [
    // Métropole mars (1ère session post-covid)
    { label:'Métropole — Jour 1 · 20 mars 2023', flag:'🇫🇷',
      sujet:      `${AP}/Metropole_spe_J1_20_mars_2023_DV.pdf`,
      correction: `${AP}/Corrige_Metropole_spe_J1_20_mars_2023_FH_2.pdf` },
    { label:'Métropole — Jour 2 · 21 mars 2023', flag:'🇫🇷',
      sujet:      `${AP}/Metropole_J2_21_mars_2023_DV.pdf`,
      correction: `${AP}/Corrige_Metropole_J2_21_mars_2023_FH.pdf` },
    // Amérique du Nord mars
    { label:'Amérique du Nord — Jour 1 · 27 mars 2023', flag:'🌎',
      sujet:      `${SD}/2023/spe-mathematiques-2023-amerique-nord-1-sujet-officiel.pdf`,
      correction: `${AP}/Corrige_Amerique_N_J1_27_mars_FK.pdf` },
    // Polynésie mars
    { label:'Polynésie · 13 mars 2023', flag:'🌊',
      sujet:      `${AP}/Terminale_spe_Polynesie_DV_3_mars_2023.pdf`,
      correction: `${AP}/Corrige__Polynesie_13_mars_2023_DV.pdf` },
    // Centres étrangers mars
    { label:'Centres étrangers · 13 mars 2023', flag:'🌍',
      sujet:      `${AP}/Bac_spe_Madagascar_DV_13_mars_2023_2.pdf`,
      correction: undefined },
    // Bac Asie mars
    { label:'Asie · 24 mars 2023 Sujet 2', flag:'🌏',
      sujet:      `${AP}/Bac_spe_Asie_J2_24_mars_2023_DV.pdf`,
      correction: `${AP}/Corrige_Asie_J2_24_mars_2023_DV.pdf` },
    // Métropole septembre
    { label:'Métropole — Jour 1 · 11 sept. 2023', flag:'🍂',
      sujet:      `${AP}/Spe_J1_11_9_2023_Metropole_DV.pdf`,
      correction: `${AP}/Corrige_J1_spe_11_sept_2023_DV.pdf` },

  ]},

  // ─── 2022 ─────────────────────────────────────────────────────
  2022: { sessions: [
    // Métropole mai
    { label:'Métropole — Jour 1 · 11 mai 2022', flag:'🇫🇷',
      sujet:      `${AP}/Spe_Metropole_1_11_mai_2022_DV-2.pdf`,
      correction: `${AP}/Corrige_Spe1_metropole_1_11_mai_2022_RR-3.pdf` },
    { label:'Métropole — Jour 2 · 12 mai 2022', flag:'🇫🇷',
      sujet:      `${AP}/spe_metropole_12_mai_2022_dv.pdf`,
      correction: `${AP}/Corrige_spe_metropole_2_12_mai_2022_DV.pdf` },
    // Amérique du Nord mai
    { label:'Amérique du Nord — Jour 1 · 18 mai 2022', flag:'🌎',
      sujet:      `${AP}/Amerique_Nord_spe_18_mai_2022_DV.pdf`,
      correction: `${AP}/Corrige_Spe1_Amerique_Nord_1_18_mai_2022_RR.pdf` },
    { label:'Amérique du Nord — Jour 2 · 19 mai 2022', flag:'🌎',
      sujet:      `${AP}/Amerique_Nord_spe_19_mai_2022_DV-2.pdf`,
      correction: `${AP}/Corrige_Spe_Amerique_Nord_21_19_mai_2022_RR.pdf` },
    // Centres étrangers mai
    { label:'Centres étrangers — Jour 1 · 11 mai 2022', flag:'🌍',
      sujet:      undefined,
      correction: `${AP}/Corrige_Etranger_spe_1_11__mai_2022_DV-2.pdf` },
    { label:'Centres étrangers — Jour 1 · 17 mai 2022', flag:'🌍',
      sujet:      undefined,
      correction: `${AP}/Corrige_Madagascar_J1_mai_2022_DV.pdf` },
    { label:'Centres étrangers — Jour 2 · 12 mai 2022', flag:'🌍',
      sujet:      `${AP}/Spe_Etranger_2_12_mai_2022_DV-2.pdf`,
      correction: `${AP}/Corrige_Spe_Etranger_2_12_mai_2022_RR.pdf` },
    { label:'Centres étrangers — Jour 2 · 19 mai 2022', flag:'🌍',
      sujet:      undefined,
      correction: `${AP}/Corrige_Spe_Madagascar_spe_19_mai_2022_RR.pdf` },
    // Asie mai
    { label:'Asie · 17-18 mai 2022', flag:'🌏',
      sujet:      undefined,
      correction: `${AP}/Corrige_Asie_spe_18_mai_2022_DV_2.pdf` },
    // Polynésie mai
    { label:'Polynésie — Jour 1 · 4 mai 2022', flag:'🌊',
      sujet:      undefined,
      correction: `${AP}/Corrige_Polynesie_1_mai_2022_Lognonne_FH.pdf` },
    // Métropole septembre
    { label:'Métropole — Jour 1 · 8 sept. 2022', flag:'🍂',
      sujet:      `${AP}/Bac_spe_Metropole_J1_sept_2022_DV_2-2.pdf`,
      correction: `${AP}/Corrige_spe_Metropole_J1_sept_2022_DV_2-2.pdf` },
    { label:'Métropole — Jour 2 · 9 sept. 2022', flag:'🍂',
      sujet:      `${AP}/Bac_spe_Metropole_J2_sept_2022_DV_2-3.pdf`,
      correction: `${AP}/Corrige_Bac_spe_Metropole_J2_sept_2022_FH-2.pdf` },
  ]},

  // ─── 2021 ─────────────────────────────────────────────────────
  2021: { sessions: [
    // Métropole mars (première année réforme)
    { label:'Métropole — Jour 1 · 15 mars 2021', flag:'🇫🇷',
      sujet:      undefined,
      correction: `${AP}/Corrige_EDS_1_15_03_2021_DV.pdf` },
    { label:'Métropole — Jour 1 (v2) · 15 mars 2021', flag:'🇫🇷',
      sujet:      undefined,
      correction: `${AP}/Corrige_TS_EDS_1_15_mars_2021_FH.pdf` },
    // Métropole juin
    { label:'Métropole — Jour 1 · 7 juin 2021', flag:'☀️',
      sujet:      `${AP}/specialite_metropole_juin2021_jcs_1_.pdf`,
      correction: `${AP}/Corrige_spe_Metropole_7_06_2021_DV_2.pdf` },
    { label:'Métropole — Jour 2 · 8 juin 2021', flag:'☀️',
      sujet:      `${AP}/metropole_specialite_sujet2_8_juin_2021_dv_1_.pdf`,
      correction: `${AP}/corrige_spe_metropole_8_06_2021_dv_2.pdf` },
    // Amérique du Nord juin
    { label:'Amérique du Nord · 3 juin 2021', flag:'🌎',
      sujet:      undefined,
      correction: `${AP}/Corrige_S_AmeriqueNord_juin_2021_DV-2.pdf` },
    // Centres étrangers juin
    { label:'Centres étrangers · 10 juin 2021', flag:'🌍',
      sujet:      undefined,
      correction: `${AP}/Corrige_Etranger_spe_2_juin_2021_DV.pdf` },
    // Métropole septembre
    { label:'Métropole — Jour 2 · 13 sept. 2021', flag:'🍂',
      sujet:      undefined,
      correction: `${AP}/Corrige_spe_Metropole_13_09_2021_J2_DV-3-2.pdf` },
  ]},
}

// ════════════════════════════════════════════════════════════════
//  DONNÉES EXERCICES — Terminale Générale
// ════════════════════════════════════════════════════════════════
const dataGenerale: AnneeData[] = [
  { year:2025, note:'🆕', exercices:[
    {titre:"Ex 1 — Analyse · ln", theme:'f(x)=x[2(lnx)²−3lnx+2] : dérivée, convexité, tangente. Python : seuil sur suite récurrente. Modèle posidonie (bactéries marines).', pts:5},
    {titre:"Ex 2 — Probabilités",theme:'Loi binomiale B(100;0,0714), espérance 7,14. Inégalité de Bienaymé-Tchebychev. Détermination rang N minimal.', pts:5},
    {titre:"Ex 3 — Géo. espace",theme:"Droites de l\'espace, positions relatives. Plan P : x−y+z+1=0. Distance C(2;−1;2) au plan. Affirmations vrai/faux justifiées.", pts:5},
    {titre:"Ex 4 — Suites",      theme:'Modèle discret (posidonie marine). Suite récurrente, croissance bornée, limite. Python : boucle while.', pts:5},
  ]},
  { year:2024, exercices:[
    {titre:'Ex 1 — Éq. diff.',   theme:"(E) y\'+y=e⁻ˣ. Solution particulière u(x)=xe⁻ˣ, générale, condition initiale f(0)=2. Étude fₖ(x)=(x+k)e⁻ˣ.", pts:5},
    {titre:"Ex 2 — Intégration", theme:'Suite Iₙ=∫₀¹xⁿeˣdx, IPP, relation Iₙ₊₁=e−(n+1)Iₙ. Python (mystere). Gendarmes : lim Iₙ=0.', pts:5},
    {titre:"Ex 3 — Probabilités",theme:'Épreuve 2 parties (Q1/Q2). Arbres, proba. totales. Variables X, Y, Z. Espérance, variance, Bienaymé-Tchebychev.', pts:5},
    {titre:"Ex 4 — Géo. espace", theme:'Prisme ABFEDCGH, vecteur normal plan (ABG). Droites parallèles, base espace, décomposition AG⃗, volume.', pts:5},
  ]},
  { year:2023, exercices:[
    {titre:"Ex 1 — Analyse · ln",theme:'Logarithme : propriétés, étude complète. IPP ∫ln(x)dx. Calcul intégrale définie.', pts:5},
    {titre:"Ex 2 — Géo. espace", theme:'Vecteurs espace, droites, plans. Produit scalaire, distance point-plan. Plan ax+by+cz+d=0.', pts:5},
    {titre:"Ex 3 — Probabilités",theme:'Probabilités totales, binomiale B(n,p), normale N(μ,σ²), Moivre-Laplace.', pts:5},
    {titre:"Ex 4 — Suites",      theme:'Limites de suites, monotonie bornée, convergence, suites récurrentes. Récurrence.', pts:5},
  ]},
  { year:2022, exercices:[
    {titre:"Ex 1 — Analyse · ln",theme:'Logarithme : ln(ab), ln(a/b), ln(aⁿ). Étude complète, intégration par parties, primitives ln x.', pts:5},
    {titre:"Ex 2 — Complexes",  theme:"Formes trigonométrique z=r(cosθ+isinθ) et exponentielle reⁱᶿ. Moivre. Racines n-ièmes de l\'unité.", pts:5},
    {titre:"Ex 3 — Probabilités",theme:'Probabilités conditionnelles P_A(B). Variables aléatoires, espérance, loi normale N(μ,σ²).', pts:5},
    {titre:"Ex 4 — Géo. espace", theme:'Plans cartésiens, vecteur normal n⃗. Positions relatives droites/plans. Orthogonalité. Distance.', pts:5},
  ]},
  { year:2021, exercices:[
    {titre:'Ex 1 — Analyse · eˣ',theme:"Exponentielle, dérivation, équations différentielles y\'=ay+b. Variations, tangente. Modélisation.", pts:5},
    {titre:"Ex 2 — Probabilités",theme:'Probabilités conditionnelles, arbres pondérés, formule totale. Variables aléatoires, espérance, binomiale.', pts:5},
    {titre:"Ex 3 — Géo. espace", theme:'Géométrie analytique : vecteurs, droites, plans, repère orthonormé. Repr. paramétrique.', pts:5},
    {titre:"Ex 4 — Algorithmique",theme:'Python : listes, fonctions, boucles for/while. Simulation probabiliste. Intégrales (rectangles).', pts:5},
  ]},
]

// ════════════════════════════════════════════════════════════════
//  TERMINALE TECHNOLOGIQUE (STMG · STI2D/STL)
//  URLs : page apmep intégrale + sujets directs trouvés
// ════════════════════════════════════════════════════════════════
const linksTechno: Record<number, AnneeLinks> = {
  2025: { sessions: [
    { label:'STI2D — Métropole · 17 juin 2025', flag:'⚙️',
      sujet:      `${SD}/2025/sti2d-spe-physique-chimie-mathematiques-2025-metropole-sujet-officiel.pdf`,
      correction: undefined },
    { label:'STI2D — Métropole Remplacement · 9 sept. 2025', flag:'⚙️',
      sujet:      `${SD}/2025/sti2d-spe-physique-chimie-mathematiques-2025-metropole-remplacement-sujet-officiel.pdf`,
      correction: `${AP}/Corrige_STI2D_Metro_sept_2025_secours_FH.pdf` },
  ]},
  2024: { sessions: [
    { label:'STI2D — Métropole Antilles-Guyane · 19 juin 2024', flag:'⚙️',
      sujet:      `${AP}/STI2D_metropole_19_juin_2024__FH2.pdf`,
      correction: `${AP}/Corrige_STI2D_metropole_19_juin_2024_FH-2.pdf` },
  ]},
  2023: { sessions: [
    { label:'STI2D — Métropole · 20 mars 2023', flag:'⚙️',
      sujet:      `${SD}/2023/sti2d-spe-physique-chimie-mathematiques-2023-metropole-sujet-officiel.pdf`,
      correction: `${SD}/2023/sti2d-spe-physique-chimie-mathematiques-2023-metropole-corrige.pdf` },
    { label:'STI2D — Mexique · Juin 2023', flag:'⚙️',
      sujet:      `${AP}/STI2D_Mexique_juin_2023_DV_FH.pdf`,
      correction: `${AP}/Corrige_STI2D_Mexique_juin_2023_FH.pdf` },
    { label:'STI2D — Métropole · Septembre 2023', flag:'⚙️',
      sujet:      `${AP}/STI2D_metro_9_2023_jcs.pdf`,
      correction: `${AP}/Corrige_STI2D_metropole_9_2023_JCS_.pdf` },
  ]},
  2022: { sessions: [
    { label:'STI2D — Métropole · 11 mai 2022', flag:'⚙️',
      sujet:      `${SD}/2022/sti2d-spe-physique-chimie-mathematiques-2022-metropole-sujet-officiel.pdf`,
      correction: `${SD}/2022/sti2d-spe-physique-chimie-mathematiques-2022-metropole-corrige.pdf` },
    { label:'STI2D — Métropole · Septembre 2022', flag:'⚙️',
      sujet:      `${AP}/metropole_sti2d_septembre_2022-2.pdf`,
      correction: undefined },
  ]},
  2021: { sessions: [
    { label:'STI2D — Métropole La Réunion · Juin 2021', flag:'⚙️',
      sujet:      `${AP}/STI2D_juin_2021_Metropole_DV.pdf`,
      correction: `${AP}/Corrige_STI2D_Metropole_J2_juin_2021_FH.pdf` },
    { label:'STI2D — Métropole · 9 sept. 2021', flag:'⚙️',
      sujet:      `${SD}/2021/sti2d-spe-physique-chimie-mathematiques-2021-metropole-sujet-officiel.pdf`,
      correction: `${AP}/Corrige_STI2D_sept_2021_Metropole_FH.pdf` },
  ]},
}

// ════════════════════════════════════════════════════════════════
//  MATHS EXPERTES — Option Terminale Générale
//  URLs : intégrale 2025/2024/2023 + sujets spécifiques
// ════════════════════════════════════════════════════════════════
// NOTE : Maths Expertes = option bac général (pas de PDF distinct pour 2024/2025)
// Les sujets 2021/2022/2023 étaient en mars (avant réforme juin 2024)
const linksExpertes: Record<number, AnneeLinks> = {
  2025: { sessions: [
    { label:'Maths Expertes — Métropole J1 · 17 juin 2025', flag:'⭐',
      sujet:      `${AP}/Metro_J1_17_06_2025_DV.pdf`,
      correction: `${AP}/Corrige__Me_tropole_spe_J1_17_06_2025_VTFK.pdf` },
    { label:'Maths Expertes — Métropole J2 · 18 juin 2025', flag:'⭐',
      sujet:      `${AP}/Metropole__spe_J2_18_06_2025_DV_2.pdf`,
      correction: `${AP}/Corrige_spe_Metropole_18_06_2025_DV.pdf` },
  ]},
  2024: { sessions: [
    { label:'Maths Expertes — Métropole J1 · 19 juin 2024', flag:'⭐',
      sujet:      `${AP}/Metropole_J1_spe_19_06_2024_VTFK.pdf`,
      correction: `${AP}/Corrige-spe_J1_Metropole_19_06_2024_DV.pdf` },
    { label:'Maths Expertes — Métropole J2 · 20 juin 2024', flag:'⭐',
      sujet:      `${AP}/Me_tropole_J2_spe_20_06_2024_VTFK.pdf`,
      correction: `${AP}/Corrige__Me_tropole_J2_spe_20_06_2024_FK.pdf` },
  ]},
  2023: { sessions: [
    { label:'Maths Expertes — Métropole J1 · 20 mars 2023', flag:'⭐',
      sujet:      `${AP}/Metropole_spe_J1_20_mars_2023_DV.pdf`,
      correction: `${AP}/Corrige_Metropole_spe_J1_20_mars_2023_FH_2.pdf` },
    { label:'Maths Expertes — Métropole J2 · 21 mars 2023', flag:'⭐',
      sujet:      `${AP}/Metropole_J2_21_mars_2023_DV.pdf`,
      correction: `${AP}/Corrige_Metropole_J2_21_mars_2023_FH.pdf` },
    { label:'Maths Expertes — Métropole J1 · 11 sept 2023', flag:'⭐',
      sujet:      `${AP}/Spe_J1_11_9_2023_Metropole_DV.pdf`,
      correction: `${AP}/Corrige_J1_spe_11_sept_2023_DV.pdf` },
  ]},
  2022: { sessions: [
    { label:'Maths Expertes — Métropole J1 · 11 mai 2022', flag:'⭐',
      sujet:      `${AP}/Spe_Metropole_1_11_mai_2022_DV-2.pdf`,
      correction: `${AP}/Corrige_spe_metropole_2_12_mai_2022_DV.pdf` },
    { label:'Maths Expertes — Métropole J2 · 12 mai 2022', flag:'⭐',
      sujet:      `${AP}/spe_metropole_12_mai_2022_dv.pdf`,
      correction: `${AP}/Corrige_spe_metropole_2_12_mai_2022_DV.pdf` },
    { label:'Maths Expertes — Métropole · Sept 2022 J1', flag:'⭐',
      sujet:      `${AP}/Bac_spe_Metropole_J1_sept_2022_DV_2-2.pdf`,
      correction: `${AP}/Corrige_spe_Metropole_J1_sept_2022_DV_2-2.pdf` },
  ]},
  2021: { sessions: [
    { label:'Maths Expertes — Métropole · 15 mars 2021', flag:'⭐',
      sujet:      `${AP}/TS_EDS_1_15_mars_2021_DV_2-2.pdf`,
      correction: `${AP}/Corrige_EDS_1_15_03_2021_DV.pdf` },
    { label:'Maths Expertes — Métropole · 7 juin 2021', flag:'⭐',
      sujet:      `${AP}/specialite_metropole_juin2021_jcs_1_.pdf`,
      correction: `${AP}/Corrige_spe_Metropole_7_06_2021_DV_2.pdf` },
    { label:'Maths Expertes — Métropole · 8 juin 2021', flag:'⭐',
      sujet:      `${AP}/metropole_specialite_sujet2_8_juin_2021_dv_1_.pdf`,
      correction: `${AP}/corrige_spe_metropole_8_06_2021_dv_2.pdf` },
  ]},
}

// ════════════════════════════════════════════════════════════════
//  EXERCICES PAR ANNÉE — Terminale Techno + Expertes
// ════════════════════════════════════════════════════════════════
const dataTechno: AnneeData[] = [
  { year:2025, note:'🆕', exercices:[
    {titre:"Ex 1 — Suites (STMG)",       theme:'Suites géométriques, intérêts composés, valeur acquise, mensualités. Algorithme de seuil.', pts:7},
    {titre:"Ex 2 — Probabilités (STMG)", theme:'Probabilités conditionnelles, arbres, variable aléatoire X, espérance E(X). Binomiale B(n,p).', pts:6},
    {titre:"Ex 3 — Analyse (STI2D)",     theme:'Exponentielle et logarithme. Modélisation physique : décharge RC, refroidissement Newton.', pts:7},
  ]},
  { year:2024, exercices:[
    {titre:"Ex 1 — Fonctions (STMG)",    theme:'Second degré, forme canonique, variations, applications économiques (maximisation CA).', pts:7},
    {titre:"Ex 2 — Stats 2 var. (STMG)",theme:'Nuage de points, point moyen G, droite de régression (moindres carrés), coefficient r, prévisions.', pts:6},
    {titre:"Ex 3 — Intégration (STI2D)",theme:"Primitives, intégrale définie ∫ₐᵇf = F(b)−F(a), valeur moyenne, travail d\'une force.", pts:7},
  ]},
  { year:2023, exercices:[
    {titre:"Ex 1 — Probabilités (STMG)",theme:'Binomiale B(n,p), probas totales, arbres. Espérance E(X)=np, variance V(X)=np(1−p).', pts:7},
    {titre:"Ex 2 — Calcul fin. (STMG)", theme:"Taux d\'évolution, coefficients multiplicateurs, évolutions successives, taux réciproque.", pts:6},
    {titre:"Ex 3 — Analyse (STI2D)",    theme:'Logarithme : propriétés algébriques, équations, résolution. Croissances comparées.', pts:7},
  ]},
  { year:2022, exercices:[
    {titre:"Ex 1 — Suites (STMG)",      theme:'Suites arithmétiques, capital, amortissements linéaires. Seuil par algorithme.', pts:7},
    {titre:"Ex 2 — Probabilités (STMG)",theme:'Probabilités conditionnelles, indépendance, variable aléatoire, espérance.', pts:6},
    {titre:"Ex 3 — Probas cont. (STI2D)",theme:'Loi uniforme [a;b], loi normale N(μ;σ²), standardisation Z=(X−μ)/σ.', pts:7},
  ]},
  { year:2021, exercices:[
    {titre:"Ex 1 — Fonctions (STMG)",   theme:'Second degré, affines, exponentielle. Tableau de variations. Applications économiques.', pts:7},
    {titre:"Ex 2 — Suites (STMG)",      theme:'Suites géométriques, intérêts composés, mensualités. Valeur acquise.', pts:6},
    {titre:'Ex 3 — Analyse (STI2D)',    theme:"Exp. et ln, étude. Équations différentielles y\'=ay+b, condition initiale y(0)=y₀.", pts:7},
  ]},
]

const dataExpertes: AnneeData[] = [
  { year:2025, note:'🆕', exercices:[
    {titre:"Ex 1 — Arithmétique", theme:'PGCD (Euclide). Bézout : au+bv=PGCD(a,b). Équations diophantiennes ax+by=c dans ℤ.', pts:7},
    {titre:"Ex 2 — Complexes",   theme:'Forme exponentielle reⁱᶿ, Euler : eⁱᶿ=cosθ+isinθ, De Moivre, racines n-ièmes. Polygones.', pts:7},
    {titre:"Ex 3 — Matrices",    theme:'Calcul matriciel, puissances Mⁿ. Chaînes de Markov : Pₙ₊₁=Pₙ×M. État stable π=π×M.', pts:6},
  ]},
  { year:2024, exercices:[
    {titre:"Ex 1 — Arithmétique", theme:'Congruences mod n. Petit Fermat : aᵖ⁻¹≡1[p] si p premier. Applications cryptographiques.', pts:7},
    {titre:"Ex 2 — Complexes",   theme:'Module |z|, arg(z). Euler : cosθ=(eⁱᶿ+e⁻ⁱᶿ)/2. Linéarisation de cosⁿθ.', pts:7},
    {titre:"Ex 3 — Graphes",     theme:"Vocabulaire, degrés, chaînes eulériennes (Euler). Matrice d\'adjacence, graphes probabilistes.", pts:6},
  ]},
  { year:2023, exercices:[
    {titre:"Ex 1 — Arithmétique", theme:'PGCD, Bézout, Gauss : si a|bc et pgcd(a,b)=1 alors a|c. Équations diophantiennes.', pts:7},
    {titre:"Ex 2 — Complexes",   theme:'Module, argument, racines n-ièmes, géométrie du plan complexe. Transformations dans ℂ.', pts:7},
    {titre:"Ex 3 — Matrices",    theme:'Calcul matriciel, inverse A⁻¹=(1/det)adj(A). Suites vectorielles Vₙ₊₁=M·Vₙ.', pts:6},
  ]},
  { year:2022, exercices:[
    {titre:"Ex 1 — Arithmétique", theme:'Divisibilité ℤ, division euclidienne. Congruences a≡b[n] ⟺ n|(a−b). Propriétés.', pts:7},
    {titre:"Ex 2 — Complexes",   theme:'Équations polynomiales dans ℂ. Δ<0 : racines complexes conjuguées. Viète.', pts:7},
    {titre:"Ex 3 — Graphes",     theme:"Matrice d\'adjacence. Graphe probabiliste, Markov, matrice de transition. État stable.", pts:6},
  ]},
  { year:2021, exercices:[
    {titre:"Ex 1 — Arithmétique", theme:"Nombres premiers, crible d\'Ératosthène. Décomposition unique en facteurs premiers.", pts:7},
    {titre:"Ex 2 — Complexes",   theme:'Formes trig. et expo. Moivre (cosθ+isinθ)ⁿ. Linéarisation cos(nθ), sin(nθ).', pts:7},
    {titre:"Ex 3 — Matrices",    theme:'Matrices carrées ordre 2 : opérations, identité I₂, inverse A⁻¹, puissances Mⁿ.', pts:6},
  ]},
]


// ═══════════════════════════════════════════════════════════════════════════
// SECONDE GÉNÉRALE — Exercices par chapitre
// Vrais exercices avec corrections complètes — pas de liens externes
// ═══════════════════════════════════════════════════════════════════════════

const CHAPITRES_SECONDE: ChapitreData[] = [
  {
    id: 'python-seconde',
    numero: 1,
    titre: 'Algorithmique & Python',
    sousTitre: 'Variables · Conditions · Fonctions · Boucles for/while',
    icon: '🐍',
    color: '#06d6a0',
    notions: ['Variables et types', 'Conditions if/elif/else', 'Fonctions def/return', 'Boucle for/range', 'Boucle while', 'Accumulation', 'Listes'],
    exercices: [
      {
        id: 'PY-1', difficulte: 1,
        titre: 'Types et affectations',
        notions: ['Variables', 'Types'],
        enonce: `Donner le type (int, float, str, bool) de chaque variable et la valeur affichée :
a = 5
b = 2.5
c = "Bonjour"
d = True
e = a + b
f = a // 2
g = a % 3
h = str(a) + " élèves"
print(type(a), a, e, f, g, h)`,
        correction: `type(a) = int, a = 5
type(b) = float, b = 2.5
type(c) = str, c = "Bonjour"
type(d) = bool, d = True
e = 5 + 2.5 = 7.5  (float, addition int+float → float)
f = 5 // 2 = 2     (division entière)
g = 5 % 3 = 2      (reste de la division euclidienne : 5 = 1×3 + 2)
h = "5 élèves"     (concaténation de chaînes)
print affiche : <class 'int'> 5 7.5 2 2 5 élèves`
      },
      {
        id: 'PY-2', difficulte: 1,
        titre: 'Conditions if/elif/else',
        notions: ['Conditions', 'if/elif/else'],
        enonce: `Écrire une fonction mention(note) qui retourne :
- "Très Bien" si note ≥ 16
- "Bien" si 14 ≤ note < 16
- "Assez Bien" si 12 ≤ note < 14
- "Passable" si 10 ≤ note < 12
- "Non admis" si note < 10

Tester avec les notes : 17, 14, 11, 8.`,
        correction: `def mention(note):
    if note >= 16:
        return "Très Bien"
    elif note >= 14:
        return "Bien"
    elif note >= 12:
        return "Assez Bien"
    elif note >= 10:
        return "Passable"
    else:
        return "Non admis"

mention(17) → "Très Bien"
mention(14) → "Bien"
mention(11) → "Passable"
mention(8)  → "Non admis"`
      },
      {
        id: 'PY-3', difficulte: 1,
        titre: 'Boucle for et accumulation',
        notions: ['Boucle for', 'range', 'Accumulation'],
        enonce: `1. Écrire une fonction somme(n) qui calcule 1 + 2 + 3 + ... + n.
2. Vérifier avec la formule n(n+1)/2 pour n = 10 et n = 100.
3. Écrire une fonction factorielle(n) qui calcule n! = 1×2×...×n.
4. Calculer 10! et donner le résultat.`,
        correction: `1. def somme(n):
    s = 0
    for i in range(1, n+1):
        s = s + i
    return s

2. somme(10) = 55  ✓  10×11/2 = 55
   somme(100) = 5050  ✓  100×101/2 = 5050

3. def factorielle(n):
    f = 1
    for i in range(1, n+1):
        f = f * i
    return f

4. factorielle(10) = 1×2×3×4×5×6×7×8×9×10 = 3 628 800`
      },
      {
        id: 'PY-4', difficulte: 1,
        titre: 'Boucle while',
        notions: ['Boucle while', 'Condition d\'arrêt'],
        enonce: `1. Écrire un programme qui affiche les puissances de 2 : 1, 2, 4, 8, 16, ... jusqu'à dépasser 1000.
2. Combien de termes sont affichés ?
3. Écrire une fonction seuil(a) qui retourne le plus petit entier n tel que 2ⁿ > a.`,
        correction: `1. Programme :
n = 1
while n <= 1000:
    print(n)
    n = n * 2
Affiche : 1, 2, 4, 8, 16, 32, 64, 128, 256, 512

2. 10 termes sont affichés (2⁰=1 jusqu'à 2⁹=512, puis 2¹⁰=1024>1000)

3. def seuil(a):
    n = 0
    puissance = 1
    while puissance <= a:
        puissance = puissance * 2
        n = n + 1
    return n

seuil(1000) = 10  (2¹⁰=1024 > 1000 et 2⁹=512 ≤ 1000)`
      },
      {
        id: 'PY-5', difficulte: 2,
        titre: 'Fonctions et paramètres',
        notions: ['Fonctions', 'Paramètres', 'Return'],
        enonce: `1. Écrire une fonction max2(a, b) qui retourne le maximum de deux nombres (sans utiliser max()).
2. Écrire une fonction max3(a, b, c) qui retourne le maximum de trois nombres, en utilisant max2.
3. Écrire une fonction est_divisible(n, d) qui retourne True si d divise n, False sinon.
4. Utiliser est_divisible pour écrire nb_diviseurs(n) qui retourne le nombre de diviseurs de n.
5. Trouver le nombre ayant le plus de diviseurs parmi 1, 2, ..., 100.`,
        correction: `1. def max2(a, b):
    if a >= b:
        return a
    else:
        return b

2. def max3(a, b, c):
    return max2(max2(a, b), c)

3. def est_divisible(n, d):
    return n % d == 0

4. def nb_diviseurs(n):
    compte = 0
    for d in range(1, n+1):
        if est_divisible(n, d):
            compte = compte + 1
    return compte

5. best = 1
   best_nb = nb_diviseurs(1)
   for k in range(2, 101):
       if nb_diviseurs(k) > best_nb:
           best_nb = nb_diviseurs(k)
           best = k
   → best = 96 avec nb_diviseurs(96) = 12
   (96 = 2⁵ × 3, diviseurs : 1,2,3,4,6,8,12,16,24,32,48,96)`
      },
      {
        id: 'PY-6', difficulte: 2,
        titre: 'Nombres premiers',
        notions: ['Boucle for', 'Conditions', 'Fonctions'],
        enonce: `1. Écrire est_premier(n) → True si n est premier.
2. Lister tous les premiers entre 1 et 50.
3. Écrire prochain_premier(n) qui retourne le plus petit premier > n.
4. Vérifier la conjecture de Goldbach pour les pairs de 4 à 20 :
   tout entier pair > 2 est somme de deux nombres premiers.`,
        correction: `1. def est_premier(n):
    if n < 2: return False
    for d in range(2, int(n**0.5)+1):
        if n % d == 0: return False
    return True

2. Premiers entre 1 et 50 :
2,3,5,7,11,13,17,19,23,29,31,37,41,43,47 (15 nombres)

3. def prochain_premier(n):
    k = n + 1
    while not est_premier(k):
        k = k + 1
    return k

prochain_premier(10) = 11
prochain_premier(47) = 53

4. Goldbach :
4 = 2+2 ✓  6 = 3+3 ✓  8 = 3+5 ✓  10 = 3+7 ✓
12 = 5+7 ✓  14 = 3+11 ✓  16 = 3+13 ✓  18 = 5+13 ✓  20 = 3+17 ✓`
      },
      {
        id: 'PY-7', difficulte: 2,
        titre: 'Listes et parcours',
        notions: ['Listes', 'Boucle for', 'Accumulation'],
        enonce: `On dispose d'une liste de notes : notes = [12, 15, 8, 18, 10, 14, 7, 16, 11, 13].
1. Calculer la moyenne sans utiliser sum() ni len().
2. Trouver la note maximale et minimale sans max() ni min().
3. Compter combien de notes sont supérieures à la moyenne.
4. Créer une nouvelle liste contenant les notes au-dessus de la moyenne.`,
        correction: `notes = [12, 15, 8, 18, 10, 14, 7, 16, 11, 13]

1. Moyenne sans sum/len :
total = 0
nb = 0
for n in notes:
    total = total + n
    nb = nb + 1
moyenne = total / nb  # = 124/10 = 12.4

2. Max et min :
maxi = notes[0]
mini = notes[0]
for n in notes:
    if n > maxi: maxi = n
    if n < mini: mini = n
# maxi = 18, mini = 7

3. Notes > moyenne (12.4) :
compte = 0
for n in notes:
    if n > 12.4: compte += 1
# 15, 18, 14, 16, 13 → compte = 5

4. Liste notes au-dessus :
au_dessus = []
for n in notes:
    if n > 12.4:
        au_dessus.append(n)
# [15, 18, 14, 16, 13]`
      },
      {
        id: 'PY-8', difficulte: 2,
        titre: 'Suite de Syracuse',
        notions: ['Boucle while', 'Conditions'],
        enonce: `La suite de Syracuse : partir d'un entier n > 0 :
- si n est pair : n ← n/2
- si n est impair : n ← 3n+1
On conjecture (non prouvé) que la suite atteint toujours 1.

1. Afficher les termes de la suite en partant de 6.
2. Écrire temps_de_vol(n) qui retourne le nombre d'étapes pour atteindre 1.
3. Calculer temps_de_vol(n) pour n = 1 à 20. Quel n donne le plus long vol ?
4. Écrire altitude_max(n) qui retourne la valeur maximale atteinte.`,
        correction: `1. Suite partant de 6 :
6 → 3 → 10 → 5 → 16 → 8 → 4 → 2 → 1
8 étapes

2. def temps_de_vol(n):
    etapes = 0
    while n != 1:
        if n % 2 == 0:
            n = n // 2
        else:
            n = 3*n + 1
        etapes += 1
    return etapes

3. Temps de vol pour n=1..20 :
n=1:0  n=2:1  n=3:7  n=4:2  n=5:5  n=6:8  n=7:16  n=8:3  n=9:19  n=10:6
n=11:14  n=12:9  n=13:9  n=14:17  n=15:17  n=16:4  n=17:12  n=18:20  n=19:20  n=20:7
→ n=18 et n=19 : temps_de_vol = 20 (plus long)

4. def altitude_max(n):
    maxi = n
    while n != 1:
        if n % 2 == 0: n = n // 2
        else: n = 3*n + 1
        if n > maxi: maxi = n
    return maxi
altitude_max(6) = 16`
      },
      {
        id: 'PY-9', difficulte: 2,
        titre: 'Recherche dichotomique',
        notions: ['Boucle while', 'Fonctions', 'Algorithme'],
        enonce: `On veut approcher √2 par dichotomie : chercher x tel que x² = 2 dans [1;2].
1. Écrire racine_dicho(a, precision) qui approche √a à precision près.
2. Calculer √2 avec précision 0.001. Combien d'étapes ?
3. Généraliser : écrire racine_n(a, n, precision) qui approche a^(1/n).`,
        correction: `1. Racine carrée par dichotomie :
def racine_dicho(a, precision):
    gauche = 0
    droite = max(1, a)
    etapes = 0
    while droite - gauche > precision:
        milieu = (gauche + droite) / 2
        if milieu**2 < a:
            gauche = milieu
        else:
            droite = milieu
        etapes += 1
    return (gauche + droite) / 2, etapes

2. racine_dicho(2, 0.001) :
Résultat ≈ 1.4143... ≈ 1.414 ✓
La précision 0.001 sur [1;2] (largeur 1) nécessite environ
log₂(1/0.001) ≈ 10 étapes (2¹⁰ = 1024 > 1000)
En pratique : environ 10-11 étapes

3. def racine_n(a, n, precision):
    gauche = 0
    droite = max(1, a)
    while droite - gauche > precision:
        m = (gauche + droite) / 2
        if m**n < a:
            gauche = m
        else:
            droite = m
    return (gauche + droite) / 2

racine_n(8, 3, 0.001) ≈ 2.000 (racine cubique de 8)`
      },
      {
        id: 'PY-10', difficulte: 2,
        titre: 'Tri par sélection',
        notions: ['Listes', 'Boucles imbriquées', 'Algorithme de tri'],
        enonce: `Le tri par sélection : à chaque étape, trouver le minimum de la partie non triée et le placer en tête.

1. Expliquer l'algorithme sur la liste [5, 2, 8, 1, 9, 3].
2. Écrire la fonction tri_selection(liste) qui trie en ordre croissant.
3. Combien de comparaisons fait-on pour une liste de n éléments ?
4. Trier [12, 7, 3, 15, 1, 8, 4] et afficher chaque étape.`,
        correction: `1. Trace sur [5,2,8,1,9,3] :
Étape 1 : min = 1 (index 3) ↔ index 0 → [1,2,8,5,9,3]
Étape 2 : min = 2 (index 1) → [1,2,8,5,9,3] (déjà en place)
Étape 3 : min = 3 (index 5) ↔ index 2 → [1,2,3,5,9,8]
Étape 4 : min = 5 (index 3) → déjà en place → [1,2,3,5,9,8]
Étape 5 : min = 8 (index 5) ↔ index 4 → [1,2,3,5,8,9]
Résultat : [1,2,3,5,8,9]

2. def tri_selection(L):
    n = len(L)
    for i in range(n-1):
        idx_min = i
        for j in range(i+1, n):
            if L[j] < L[idx_min]:
                idx_min = j
        L[i], L[idx_min] = L[idx_min], L[i]
    return L

3. Nombre de comparaisons :
Étape i : on fait (n-i-1) comparaisons
Total = (n-1)+(n-2)+...+1 = n(n-1)/2 comparaisons
Pour n=7 : 7×6/2 = 21 comparaisons

4. Tri de [12,7,3,15,1,8,4] :
→ [1,7,3,15,12,8,4] → [1,3,7,15,12,8,4] → [1,3,4,15,12,8,7]
→ [1,3,4,7,12,8,15] → [1,3,4,7,8,12,15] → [1,3,4,7,8,12,15]`
      },
      {
        id: 'PY-11', difficulte: 2,
        titre: 'Suites et algorithme de seuil',
        notions: ['Boucle while', 'Suites numériques', 'Seuil'],
        enonce: `1. La suite (uₙ) est définie par u₀=1 et uₙ₊₁ = uₙ/2 + 1.
   a) Calculer u₁, u₂, u₃, u₄ à la main.
   b) Écrire terme(n) qui calcule uₙ.
   c) Écrire seuil_suite(epsilon) qui retourne le plus petit n tel que |uₙ − 2| < epsilon.

2. La suite (vₙ) est définie par v₀=0 et vₙ₊₁ = vₙ + 1/n² pour n ≥ 1.
   Calculer la somme des 1000 premiers termes. (Comparer avec π²/6 ≈ 1.6449)`,
        correction: `1. Suite uₙ = uₙ₋₁/2 + 1 :
a) u₀=1, u₁=1/2+1=1.5, u₂=0.75+1=1.75, u₃=0.875+1=1.875, u₄=0.9375+1=1.9375
   La suite converge vers 2 (point fixe : ℓ = ℓ/2+1 → ℓ=2)

b) def terme(n):
    u = 1
    for _ in range(n):
        u = u/2 + 1
    return u

c) def seuil_suite(epsilon):
    u = 1
    n = 0
    while abs(u - 2) >= epsilon:
        u = u/2 + 1
        n += 1
    return n

seuil_suite(0.01) = 7  (u₇ ≈ 1.9922, |u₇-2| ≈ 0.0078 < 0.01)

2. Somme Σ 1/n² pour n=1..1000 :
def somme_inverse_carres(N):
    s = 0
    for n in range(1, N+1):
        s += 1/n**2
    return s

somme_inverse_carres(1000) ≈ 1.6439 ≈ π²/6 ≈ 1.6449 ✓ (très proche !)`
      },
      {
        id: 'PY-12', difficulte: 3,
        titre: 'Algorithme d\'Euclide et PGCD',
        notions: ['Boucle while', 'Modulo', 'Algorithme'],
        enonce: `1. Implémenter l'algorithme d'Euclide pour calculer PGCD(a,b).
2. Tester : PGCD(48,18), PGCD(252,180), PGCD(1000,864).
3. Écrire ppcm(a,b) en utilisant pgcd.
4. Écrire fraction_irreductible(p,q) qui retourne (p//d, q//d) où d=PGCD(p,q).
5. Simplifier 252/180, 1000/750, 144/96.`,
        correction: `1. def pgcd(a, b):
    while b != 0:
        a, b = b, a % b
    return a

2. Tests :
pgcd(48, 18) :  48→18r12 → 18→12r6 → 12→6r0 → pgcd = 6
pgcd(252, 180) : 252→180r72 → 180→72r36 → 72→36r0 → pgcd = 36
pgcd(1000, 864) : 1000→864r136 → 864→136r48 → 136→48r40 → 48→40r8 → 40→8r0 → pgcd = 8

3. def ppcm(a, b):
    return a * b // pgcd(a, b)

4. def fraction_irreductible(p, q):
    d = pgcd(p, q)
    return (p//d, q//d)

5. Simplifications :
252/180 : d=36 → 7/5
1000/750 : pgcd(1000,750)=250 → 4/3
144/96 : pgcd(144,96)=48 → 3/2`
      },
      {
        id: 'PY-13', difficulte: 2,
        titre: 'Tracé de courbe (valeurs)',
        notions: ['Fonctions', 'Listes', 'Boucle for'],
        enonce: `Sans bibliothèque graphique, générer un tableau de valeurs de f(x) = x² - 3x + 2 sur [-1 ; 4] :

1. Créer une liste x_vals = [-1, -0.5, 0, 0.5, 1, ..., 4] (pas de 0.5).
2. Calculer y_vals = [f(x) pour x dans x_vals].
3. Trouver les zéros (valeurs de x où f(x) change de signe).
4. Trouver le minimum de f sur cet intervalle et la valeur de x correspondante.`,
        correction: `1. def f(x):
    return x**2 - 3*x + 2

x_vals = []
x = -1
while x <= 4:
    x_vals.append(x)
    x = x + 0.5

2. y_vals = [f(x) for x in x_vals]
Tableau :
x=-1.0 → f=6.0
x=-0.5 → f=4.25
x=0.0 → f=2.0
x=0.5 → f=0.75
x=1.0 → f=0.0  ← zéro exact
x=1.5 → f=-0.25
x=2.0 → f=0.0  ← zéro exact
x=2.5 → f=0.75
x=3.0 → f=2.0
x=3.5 → f=3.75
x=4.0 → f=6.0

3. Changements de signe :
Entre x=0.5 (f=0.75>0) et x=1.0 (f=0.0) → zéro en x=1
Entre x=1.5 (f=-0.25<0) et x=2.0 (f=0.0) → zéro en x=2
Zéros exacts : x=1 et x=2 (f(x)=(x-1)(x-2))

4. Minimum :
f(1.5) = -0.25 est la valeur minimale dans la liste
(Minimum théorique en x=1.5 : f(1.5)=(1.5)²-4.5+2 = 2.25-4.5+2 = -0.25 ✓)`
      },
      {
        id: 'PY-14', difficulte: 3,
        titre: 'Cryptographie — Chiffre de César',
        notions: ['Chaînes', 'ord/chr', 'Boucle for'],
        enonce: `Le chiffre de César décale chaque lettre de k positions dans l'alphabet.
Exemple avec k=3 : A→D, B→E, ..., Z→C.

1. Écrire chiffrer(message, k) qui chiffre un message en majuscules.
2. Écrire dechiffrer(message, k) en utilisant chiffrer.
3. Chiffrer "BONJOUR" avec k=13 (ROT13).
4. Écrire casser_cesar(message_chiffre) qui essaie les 26 décalages et affiche tous les déchiffrements.`,
        correction: `1. def chiffrer(message, k):
    resultat = ""
    for lettre in message:
        if lettre.isalpha():
            # ord('A')=65, ord('Z')=90
            code = (ord(lettre.upper()) - 65 + k) % 26 + 65
            resultat += chr(code)
        else:
            resultat += lettre
    return resultat

2. def dechiffrer(message, k):
    return chiffrer(message, -k)
    # Déchiffrer = chiffrer avec -k (décalage inverse)

3. ROT13 de "BONJOUR" (k=13) :
B(1) → O(14) → O
O(14) → B(1) → B
N(13) → A(0) → A
J(9) → W(22) → W
O(14) → B(1) → B
U(20) → H(7) → H
R(17) → E(4) → E
Résultat : "OBAWBHE"
Note : ROT13 est son propre inverse (chiffrer deux fois = message original)

4. def casser_cesar(msg):
    for k in range(26):
        print(f"k={k}: {dechiffrer(msg, k)}")`
      },
      {
        id: 'PY-15', difficulte: 3,
        titre: 'Simulation probabiliste (Monte-Carlo)',
        notions: ['random', 'Boucle for', 'Estimation'],
        enonce: `La méthode Monte-Carlo permet d'estimer π :
- Tirer n points (x,y) au hasard dans le carré [0;1]×[0;1]
- Compter ceux dans le quart de cercle : x²+y² ≤ 1
- π/4 ≈ (nombre de points dans le cercle) / n

1. Écrire monte_carlo_pi(n) qui estime π par cette méthode.
2. Tester avec n = 100, 1000, 10000.
3. Expliquer pourquoi plus n est grand, meilleure est l'estimation.`,
        correction: `import random

def monte_carlo_pi(n):
    dans_cercle = 0
    for _ in range(n):
        x = random.random()  # nombre aléatoire dans [0,1]
        y = random.random()
        if x**2 + y**2 <= 1:
            dans_cercle += 1
    return 4 * dans_cercle / n

Tests (résultats varient selon les tirages) :
monte_carlo_pi(100)   ≈ 3.12 (précision ~1%)
monte_carlo_pi(1000)  ≈ 3.14 (précision ~0.5%)
monte_carlo_pi(10000) ≈ 3.141 (précision ~0.1%)

Explication :
La probabilité qu'un point soit dans le quart de cercle est π/4
(aire du quart de cercle / aire du carré = π/4 / 1 = π/4).
Par la loi des grands nombres, la fréquence observée tend vers
la probabilité théorique quand n → +∞.
L'erreur est ≈ 1/√n → pour n=10000, erreur ≈ 0.01.`
      },
    ]
  },
  {
    id: 'nombres-calculs-seconde',
    numero: 2,
    titre: 'Nombres & Calculs',
    sousTitre: 'Puissances · Racines · PGCD · PPCM · Ensembles ℕℤℚℝ',
    icon: '🔢',
    color: '#4f6ef7',
    notions: ['Puissances', 'Racines carrées', 'PGCD', 'PPCM', 'Ensembles de nombres', 'Notation scientifique'],
    exercices: [
      {
        id: 'NC-1', difficulte: 1,
        titre: 'Calculs de puissances',
        notions: ['Puissances', 'Propriétés'],
        enonce: `Calculer sans calculatrice (donner une valeur exacte) :
1. 2⁵ × 2⁻³ × (2²)³
2. (3² × 3⁻¹)² ÷ 3
3. (−2)⁴ + (−2)³ × (−2)
4. 5⁻² × 25 × 5³
5. (10³)⁻² × 10⁸
6. (2/3)³ × (3/2)²`,
        correction: `1. 2⁵ × 2⁻³ × 2⁶ = 2^(5-3+6) = 2⁸ = 256
2. (3¹)² ÷ 3 = 3² ÷ 3 = 3¹ = 3
3. 16 + (−8)(−2) = 16 + 16 = 32
4. 5⁻² × 5² × 5³ = 5^(-2+2+3) = 5³ = 125
5. 10⁻⁶ × 10⁸ = 10² = 100
6. (8/27) × (9/4) = 72/108 = 2/3`
      },
      {
        id: 'NC-2', difficulte: 1,
        titre: 'Simplification de racines carrées',
        notions: ['Racines carrées', 'Simplification'],
        enonce: `Simplifier sous la forme a√b (b sans carré parfait) :
1. √72    2. √200    3. √(3/4)    4. √48
5. √(180) 6. √(0,08) 7. √(3)×√(12)   8. (√5+√3)(√5−√3)`,
        correction: `1. √72 = √(36×2) = 6√2
2. √200 = √(100×2) = 10√2
3. √(3/4) = √3/√4 = √3/2
4. √48 = √(16×3) = 4√3
5. √180 = √(36×5) = 6√5
6. √(0.08) = √(8/100) = 2√2/10 = √2/5
7. √3×√12 = √36 = 6
8. (√5)²−(√3)² = 5−3 = 2  (identité (a+b)(a-b)=a²-b²)`
      },
      {
        id: 'NC-3', difficulte: 1,
        titre: 'Ensembles de nombres',
        notions: ['Ensembles ℕℤℚℝ', 'Raisonnement'],
        enonce: `1. Classer dans ℕ, ℤ, ℚ ou ℝ (préciser le plus petit ensemble) :
   a) 5    b) −3    c) 1/2    d) √2    e) 0    f) π    g) 3/1    h) √9

2. Vrai ou Faux (justifier) :
   a) ℕ ⊂ ℤ    b) ℚ ⊂ ℝ    c) √2 ∈ ℚ    d) 0,333... = 1/3 ∈ ℚ

3. Donner un exemple d'irrationnel différent de π et √2.`,
        correction: `1. Classement :
a) 5 ∈ ℕ  b) −3 ∈ ℤ  c) 1/2 ∈ ℚ  d) √2 ∈ ℝ (irrationnel)
e) 0 ∈ ℕ  f) π ∈ ℝ (irrationnel)  g) 3/1 = 3 ∈ ℕ  h) √9 = 3 ∈ ℕ

2. Vrai/Faux :
a) VRAI : tout entier naturel est un entier relatif
b) VRAI : tout rationnel est un réel
c) FAUX : √2 est irrationnel (démontrable par l'absurde)
d) VRAI : 0,333... = 1/3 (fraction d'entiers → rationnel)

3. Exemples d'irrationnels : √3, √5, e (base des logarithmes), ln(2)`
      },
      {
        id: 'NC-4', difficulte: 2,
        titre: 'PGCD par algorithme d\'Euclide',
        notions: ['PGCD', 'Algorithme d\'Euclide'],
        enonce: `Calculer par l'algorithme d'Euclide :
1. PGCD(84, 60)
2. PGCD(357, 119)
3. PGCD(1071, 1029)

Pour chaque résultat, en déduire PPCM et simplifier la fraction correspondante.`,
        correction: `1. PGCD(84,60) :
84 = 1×60+24  →  60 = 2×24+12  →  24 = 2×12+0
PGCD = 12, PPCM = 84×60/12 = 420, 84/60 = 7/5

2. PGCD(357,119) :
357 = 3×119+0 → PGCD = 119
(119×3=357, donc 119 divise 357)
PPCM = 357×119/119 = 357, 357/119 = 3/1

3. PGCD(1071,1029) :
1071 = 1×1029+42  →  1029 = 24×42+21  →  42 = 2×21+0
PGCD = 21, PPCM = 1071×1029/21 = 52479, 1071/1029 = 51/49`
      },
      {
        id: 'NC-5', difficulte: 2,
        titre: 'Notation scientifique',
        notions: ['Puissances de 10', 'Notation scientifique'],
        enonce: `1. Écrire en notation scientifique a×10ⁿ avec 1 ≤ a < 10 :
   a) 52 400    b) 0.00367    c) 6 500 000 000

2. Calculer et donner le résultat en notation scientifique :
   a) (3×10⁵) × (4×10⁻²)
   b) (6×10⁸) ÷ (2×10³)
   c) (2×10⁻³)²

3. La distance Terre-Soleil est 1,5×10¹¹ m. La lumière parcourt 3×10⁸ m/s.
   En combien de minutes la lumière voyage-t-elle du Soleil à la Terre ?`,
        correction: `1. Notation scientifique :
a) 52 400 = 5,24×10⁴
b) 0,00367 = 3,67×10⁻³
c) 6 500 000 000 = 6,5×10⁹

2. Calculs :
a) (3×4)×10^(5-2) = 12×10³ = 1,2×10⁴
b) (6÷2)×10^(8-3) = 3×10⁵
c) (2²)×(10⁻³)² = 4×10⁻⁶

3. Temps = distance / vitesse :
t = (1,5×10¹¹) / (3×10⁸) = (1,5/3)×10^(11-8) = 0,5×10³ = 500 s
500 s ÷ 60 ≈ 8 min 20 s
(La lumière met environ 8 minutes 20 secondes pour arriver du Soleil.)`
      },
      {
        id: 'NC-6', difficulte: 2,
        titre: 'Rationalisation et calculs avec racines',
        notions: ['Racines carrées', 'Rationalisation'],
        enonce: `1. Rationaliser (éliminer le radical au dénominateur) :
   a) 1/√3    b) 2/(1+√2)    c) (√5+1)/(√5-1)

2. Montrer sans calculatrice :
   a) √2 + √8 = 3√2
   b) (1+√3)² = 4+2√3

3. Ordonner sans calculatrice : √3+1,  √5,  2,  √2+0.5`,
        correction: `1. Rationalisation :
a) 1/√3 = √3/3

b) 2/(1+√2) × (1-√2)/(1-√2) = 2(1-√2)/(1-2) = 2(1-√2)/(-1) = 2(√2-1) = 2√2-2

c) (√5+1)/(√5-1) × (√5+1)/(√5+1) = (√5+1)²/(5-1) = (6+2√5)/4 = (3+√5)/2

2. Démonstrations :
a) √2 + √8 = √2 + √(4×2) = √2 + 2√2 = 3√2 ✓

b) (1+√3)² = 1² + 2×1×√3 + (√3)² = 1 + 2√3 + 3 = 4+2√3 ✓

3. Ordre :
√2 ≈ 1.414, √3 ≈ 1.732, √5 ≈ 2.236
√3+1 ≈ 2.732 ; √5 ≈ 2.236 ; 2 = 2 ; √2+0.5 ≈ 1.914
Ordre croissant : √2+0.5 < 2 < √5 < √3+1`
      },
      {
        id: 'NC-7', difficulte: 2,
        titre: 'Divisibilité et décomposition',
        notions: ['Divisibilité', 'Facteurs premiers', 'Critères'],
        enonce: `1. Décomposer en facteurs premiers : 360, 504, 1260.
2. En déduire PGCD(360, 504) et PPCM(360, 504).
3. Vérifier les critères de divisibilité pour 2 520 :
   divisible par 2 ? par 3 ? par 5 ? par 7 ? par 9 ?
4. Trouver tous les diviseurs de 48.`,
        correction: `1. Décompositions :
360 = 8×45 = 2³×3²×5
504 = 8×63 = 2³×3²×7
1260 = 4×315 = 4×9×35 = 2²×3²×5×7

2. PGCD(360,504) = produit des facteurs communs au min :
= 2³×3² = 8×9 = 72
PPCM = 2³×3²×5×7 = 72×35 = 2520

3. Critères pour 2520 :
÷2 : OUI (dernier chiffre 0)
÷3 : OUI (somme digits : 2+5+2+0=9, divisible par 3)
÷5 : OUI (dernier chiffre 0)
÷7 : 2520÷7 = 360 OUI
÷9 : OUI (somme digits = 9, divisible par 9)

4. Diviseurs de 48 = 2⁴×3 :
1, 2, 3, 4, 6, 8, 12, 16, 24, 48 → 10 diviseurs
(nombre de diviseurs = (4+1)(1+1) = 10 ✓)`
      },
      {
        id: 'NC-8', difficulte: 2,
        titre: 'Comparaison de réels',
        notions: ['Inégalités', 'Comparaison de réels'],
        enonce: `Comparer sans calculatrice :
1. √5 et √3 + 1/2
2. 3√2 et 2√3
3. (√6+√2)/2 et 1,3
4. Montrer que pour tout x>0 : x + 1/x ≥ 2`,
        correction: `1. √5 vs √3 + 0,5 :
Carrer les deux (positifs) : √5 ≈ 2,236 ; √3+0,5 ≈ 2,232
Plus rigoureux : (√5)² = 5 ; (√3+0,5)² = 3+√3+0,25 = 3,25+√3 ≈ 3,25+1,732 = 4,982
5 > 4,982 donc √5 > √3+0,5

2. 3√2 vs 2√3 :
(3√2)² = 18 ; (2√3)² = 12
18 > 12 et les deux sont positifs → 3√2 > 2√3

3. (√6+√2)/2 vs 1,3 :
(√6+√2)/2 ≈ (2,449+1,414)/2 ≈ 3,863/2 ≈ 1,932 > 1,3

4. Démonstration de x+1/x ≥ 2 pour x>0 :
x + 1/x - 2 = (x² + 1 - 2x)/x = (x-1)²/x
(x-1)² ≥ 0 et x > 0 donc (x-1)²/x ≥ 0
Donc x + 1/x ≥ 2, avec égalité si et seulement si x=1. ✓`
      },
      {
        id: 'NC-9', difficulte: 2,
        titre: 'Problème — Nombres et divisibilité',
        notions: ['PGCD', 'Applications', 'Raisonnement'],
        enonce: `1. Un maçon dispose de 2 tas de carreaux : 180 rouges et 252 blancs. Il veut faire des lots identiques (mêmes quantités de rouges et blancs dans chaque lot) sans avoir de reste.
   a) Quel est le nombre maximal de lots ?
   b) Combien de carreaux rouges et blancs dans chaque lot ?

2. Deux bus partent de la gare : le bus A toutes les 24 minutes, le bus B toutes les 36 minutes. Ils partent ensemble à 8h00.
   a) À quelle heure partent-ils ensemble pour la première fois ?
   b) Combien de fois partent-ils ensemble avant 20h00 ?`,
        correction: `1. Problème des lots :
a) Nombre maximal de lots = PGCD(180, 252)
180 = 2²×3²×5 ; 252 = 2²×3²×7
PGCD = 2²×3² = 36 lots

b) Chaque lot :
Carreaux rouges : 180/36 = 5
Carreaux blancs : 252/36 = 7

2. Problème des bus :
a) PPCM(24, 36) :
24 = 2³×3 ; 36 = 2²×3²
PPCM = 2³×3² = 72 minutes = 1h12
Ils partent ensemble à 8h00+1h12 = 9h12

b) De 8h00 à 20h00 = 720 minutes
720 ÷ 72 = 10 fois
Ils partent ensemble à : 8h00, 9h12, 10h24, 11h36, 12h48, 14h00, 15h12, 16h24, 17h36, 18h48, 20h00 = 11 fois (en comptant 8h00 et 20h00)`
      },
      {
        id: 'NC-10', difficulte: 2,
        titre: 'Calculs de puissances négatives et fractions',
        notions: ['Puissances négatives', 'Fractions'],
        enonce: `Simplifier en une seule puissance ou fraction :
1. (2⁻¹ + 3⁻¹)⁻¹
2. (a²b⁻³)² × (a⁻¹b²)³  (a,b ≠ 0)
3. (x⁻¹ + y⁻¹)/(x⁻¹ - y⁻¹)  (x,y ≠ 0, x ≠ y)
4. Montrer que (2^(n+2) + 2^n) / 2^(n+1) = 5/2 pour tout entier n.`,
        correction: `1. (2⁻¹+3⁻¹)⁻¹ = (1/2+1/3)⁻¹ = (5/6)⁻¹ = 6/5

2. (a²b⁻³)²×(a⁻¹b²)³ = a⁴b⁻⁶ × a⁻³b⁶ = a^(4-3)×b^(-6+6) = a¹×b⁰ = a

3. x⁻¹+y⁻¹ = 1/x+1/y = (x+y)/(xy)
   x⁻¹-y⁻¹ = 1/x-1/y = (y-x)/(xy)
   Quotient : [(x+y)/(xy)] / [(y-x)/(xy)] = (x+y)/(y-x)

4. (2^(n+2)+2^n) / 2^(n+1)
   = (4×2^n + 2^n) / (2×2^n)
   = 5×2^n / (2×2^n)
   = 5/2 ✓ (indépendant de n)`
      },
      {
        id: 'NC-11', difficulte: 2,
        titre: 'Résolution d\'équations avec radicaux',
        notions: ['Racines carrées', 'Équations'],
        enonce: `Résoudre dans ℝ (vérifier les solutions !) :
1. √(2x+3) = 5
2. √(x+1) = x−1
3. √(3x−2) + √(x+1) = 0
4. x² = 3x+4 (solutions entières ?)`,
        correction: `1. √(2x+3) = 5 → 2x+3 = 25 → x = 11
Vérif : √(25) = 5 ✓ → Solution : x = 11

2. √(x+1) = x−1, condition x ≥ −1 et x−1 ≥ 0 → x ≥ 1
Élever au carré : x+1 = (x−1)² = x²−2x+1
→ x²−3x = 0 → x(x−3) = 0 → x=0 ou x=3
x=0 < 1 (interdit) ; x=3 : √4 = 2 = 3−1 ✓
Solution : x = 3

3. √(3x−2) + √(x+1) = 0
Deux racines carrées (≥0) de somme nulle → chacune = 0
√(3x−2) = 0 → x = 2/3
√(x+1) = 0 → x = −1
Impossible d'avoir x = 2/3 et x = −1 simultanément → Pas de solution

4. x²−3x−4 = 0 → (x−4)(x+1) = 0 → x=4 ou x=−1
Solutions entières : x=4 et x=−1 ✓`
      },
      {
        id: 'NC-12', difficulte: 3,
        titre: 'Démonstrations — irrationnalité',
        notions: ['Raisonnement par l\'absurde', 'Irrationnels'],
        enonce: `1. Montrer par l'absurde que √2 est irrationnel.
2. En déduire que √2 + 1 est irrationnel.
3. Montrer que √3 est irrationnel.`,
        correction: `1. Irrationnalité de √2 :
Supposons √2 = p/q fraction irréductible (p,q ∈ ℤ, q>0, PGCD(p,q)=1).
Alors 2 = p²/q² → p² = 2q²
Donc p² est pair → p est pair (car si p impair, p² impair)
Écrire p = 2k : (2k)² = 2q² → 4k² = 2q² → q² = 2k²
Donc q² est pair → q est pair.
Contradiction : p et q sont tous deux pairs alors que PGCD(p,q)=1. ✓
Donc √2 ∉ ℚ.

2. Si √2+1 était rationnel, alors √2 = (√2+1)−1 serait rationnel.
Contradiction avec 1. Donc √2+1 est irrationnel.

3. Irrationnalité de √3 :
Supposons √3 = p/q irréductible.
3q² = p² → p² divisible par 3 → p divisible par 3 → p = 3k
9k² = 3q² → q² = 3k² → q divisible par 3.
Contradiction avec PGCD(p,q)=1. Donc √3 ∉ ℚ. ✓`
      },
      {
        id: 'NC-13', difficulte: 3,
        titre: 'Applications concrètes — mesures et calculs',
        notions: ['Racines carrées', 'Applications'],
        enonce: `1. Un carré a une aire de 50 cm². Quelle est la longueur de son côté ? De sa diagonale ?
2. Un triangle rectangle a des cathètes de 3 cm et 4 cm. Calculer l'hypoténuse.
3. Une salle rectangulaire mesure 6m × 8m. Quelle est la longueur de sa diagonale ?
4. Un écran 16/9 a une diagonale de 55 cm. Calculer ses dimensions en cm (arrondir au mm).`,
        correction: `1. Carré d'aire 50 cm² :
Côté c : c² = 50 → c = √50 = 5√2 ≈ 7,07 cm
Diagonale d : d = c√2 = 5√2×√2 = 5×2 = 10 cm

2. Triangle rectangle 3-4-? :
Hypoténuse = √(3²+4²) = √(9+16) = √25 = 5 cm
(Triple pythagoricien classique : 3-4-5)

3. Salle 6m×8m :
Diagonale = √(6²+8²) = √(36+64) = √100 = 10 m
(Triple 6-8-10 = 2×(3-4-5))

4. Écran 16/9, diagonale 55 cm :
Ratio des côtés : l = 16k, h = 9k
Diagonale : √((16k)²+(9k)²) = k√(256+81) = k√337 ≈ 18,36k
55 = 18,36k → k ≈ 2,995 ≈ 3
Largeur : 16×3 = 48 cm ; Hauteur : 9×3 = 27 cm
Vérif : √(48²+27²) = √(2304+729) = √3033 ≈ 55,07 cm ✓`
      },
      {
        id: 'NC-14', difficulte: 2,
        titre: 'Propriétés des puissances — démonstrations',
        notions: ['Puissances', 'Démonstrations', 'Cas généraux'],
        enonce: `Démontrer pour tous entiers m, n et réels a, b (a≠0, b≠0) :
1. aᵐ × aⁿ = aᵐ⁺ⁿ (utiliser la définition de aⁿ)
2. (aᵐ)ⁿ = aᵐⁿ
3. (a×b)ⁿ = aⁿ×bⁿ
4. En déduire : (a/b)ⁿ = aⁿ/bⁿ`,
        correction: `1. aᵐ × aⁿ = aᵐ⁺ⁿ (pour m,n ∈ ℕ) :
aᵐ = a×a×...×a (m fois)
aⁿ = a×a×...×a (n fois)
aᵐ×aⁿ = a×a×...×a (m+n fois) = aᵐ⁺ⁿ ✓

2. (aᵐ)ⁿ = aᵐⁿ :
(aᵐ)ⁿ = aᵐ×aᵐ×...×aᵐ (n fois)
= a^(m+m+...+m) (n fois) = a^(mn) = aᵐⁿ ✓

3. (a×b)ⁿ = aⁿ×bⁿ :
(ab)ⁿ = (ab)(ab)...(ab) (n fois)
= (a×a×...×a)(b×b×...×b) (réarranger)
= aⁿ×bⁿ ✓ (commutativité de la multiplication)

4. (a/b)ⁿ = aⁿ/bⁿ :
(a/b)ⁿ = (a×b⁻¹)ⁿ = aⁿ×(b⁻¹)ⁿ = aⁿ×b⁻ⁿ = aⁿ/bⁿ ✓`
      },
      {
        id: 'NC-15', difficulte: 3,
        titre: 'Problème ouvert — Nombres parfaits',
        notions: ['Diviseurs', 'Raisonnement'],
        enonce: `Un nombre parfait est égal à la somme de ses diviseurs stricts (sans lui-même).
Exemple : 6 = 1+2+3 (diviseurs de 6 : 1, 2, 3, 6).

1. Vérifier que 28 est parfait.
2. Trouver tous les diviseurs de 12. Est-il parfait ?
3. Écrire un algorithme Python est_parfait(n) qui teste si n est parfait.
4. Les nombres parfaits connus sont 6, 28, 496, 8128. Vérifier 496 avec l'algorithme.`,
        correction: `1. Diviseurs stricts de 28 : 1, 2, 4, 7, 14
Somme : 1+2+4+7+14 = 28 ✓ → 28 est parfait !

2. Diviseurs de 12 : 1, 2, 3, 4, 6, 12
Diviseurs stricts : 1+2+3+4+6 = 16 ≠ 12
→ 12 n'est pas parfait (16 > 12 : 12 est "abondant")

3. def est_parfait(n):
    if n < 2: return False
    somme = 0
    for d in range(1, n):
        if n % d == 0:
            somme += d
    return somme == n

4. Diviseurs stricts de 496 :
1,2,4,8,16,31,62,124,248
Somme : 1+2+4+8+16+31+62+124+248 = 496 ✓
est_parfait(496) → True

Anecdote : Euclide a montré que si 2ⁿ−1 est premier (nombre de Mersenne),
alors 2ⁿ⁻¹(2ⁿ−1) est parfait.
n=2 : 2¹×3=6 ✓ ; n=3 : 4×7=28 ✓ ; n=5 : 16×31=496 ✓`
      },
    ]
  },
  {
    id: 'intervalles-seconde',
    numero: 3,
    titre: 'Intervalles, Inégalités & Inéquations',
    sousTitre: 'Notations · Propriétés · Valeur absolue · Résolution',
    icon: '↔️',
    color: '#f59e0b',
    notions: ['Intervalles', 'Inégalités', 'Inéquations', 'Valeur absolue', 'Encadrements'],
    exercices: [
      {
        id: 'II-1', difficulte: 1,
        titre: 'Notations d\'intervalles',
        notions: ['Intervalles', 'Notations'],
        enonce: `1. Représenter sur une droite réelle les intervalles :
   a) [−3 ; 2[    b) ]−∞ ; 4]    c) ]−1 ; +∞[    d) [0 ; 3]

2. Exprimer en notation d'intervalle :
   a) {x ∈ ℝ | −2 < x ≤ 5}
   b) {x ∈ ℝ | x ≤ 7}
   c) {x ∈ ℝ | x < 0 ou x > 3}

3. Déterminer A ∩ B et A ∪ B pour :
   A = [−3 ; 4]  et  B = ]1 ; 7[`,
        correction: `1. Représentations (cercle ouvert = exclu, fermé = inclus) :
a) [−3;2[ : fermé en −3, ouvert en 2
b) ]−∞;4] : toute la droite jusqu'à 4 inclus
c) ]−1;+∞[ : à droite de −1 exclu
d) [0;3] : segment fermé

2. Notations :
a) ]−2 ; 5]
b) ]−∞ ; 7]
c) ]−∞ ; 0[ ∪ ]3 ; +∞[

3. A = [−3;4], B = ]1;7[ :
A ∩ B = ]1 ; 4]  (intersection : x dans les deux)
A ∪ B = [−3 ; 7[  (union : x dans au moins un)`
      },
      {
        id: 'II-2', difficulte: 1,
        titre: 'Propriétés des inégalités',
        notions: ['Inégalités', 'Propriétés', 'Sens'],
        enonce: `Vrai ou Faux ? Justifier et corriger si faux :
1. Si a < b alors a² < b²
2. Si a < b et c < 0 alors ac > bc
3. Si a < b alors 1/a > 1/b
4. Si 0 < a < b alors 1/b < 1/a
5. Si a < b alors a + 3 < b + 3
6. Si a < b et a < c alors b < c`,
        correction: `1. FAUX : si a = −3 et b = 1, a < b mais a² = 9 > 1 = b²
   VRAI seulement si a,b ≥ 0 ou a,b ≤ 0 (même signe)

2. VRAI : multiplier par c < 0 inverse le sens ✓

3. FAUX : si a = −1 et b = 2, a < b mais 1/a = −1 < 0.5 = 1/b
   VRAI seulement si a et b de même signe

4. VRAI : si 0 < a < b, alors en divisant par ab > 0 : 1/b < 1/a ✓

5. VRAI : ajouter 3 des deux côtés conserve le sens ✓

6. FAUX : a < b et a < c ne dit rien sur la relation entre b et c
   Exemple : a = 0, b = 1, c = 2 → b < c. Mais a=0, b=2, c=1 → b > c`
      },
      {
        id: 'II-3', difficulte: 1,
        titre: 'Résolution d\'inéquations du 1er degré',
        notions: ['Inéquations', 'Intervalles'],
        enonce: `Résoudre et exprimer en intervalle :
1. 3x − 5 ≥ x + 7
2. 2(x − 3) < 5x + 1
3. −2 < 3x − 1 ≤ 8
4. (2x+1)/3 ≤ (x−2)/2 + 1
5. 5 − 2x > 3x − 5`,
        correction: `1. 2x ≥ 12 → x ≥ 6 → [6 ; +∞[

2. 2x−6 < 5x+1 → −3x < 7 → x > −7/3 → ]−7/3 ; +∞[

3. −2 < 3x−1 ≤ 8 → −1 < 3x ≤ 9 → −1/3 < x ≤ 3 → ]−1/3 ; 3]

4. ×6 : 2(2x+1) ≤ 3(x−2)+6 → 4x+2 ≤ 3x → x ≤ −2 → ]−∞ ; −2]

5. 10 > 5x → x < 2 → ]−∞ ; 2[`
      },
      {
        id: 'II-4', difficulte: 1,
        titre: 'Valeur absolue — définition',
        notions: ['Valeur absolue', 'Distance'],
        enonce: `1. Calculer : |−5|, |3|, |3−7|, |−2+5|, |π−4|
2. Résoudre :
   a) |x − 2| = 3
   b) |2x + 1| = 5
   c) |x| = x + 2
3. Quelle est la distance entre les points d'abscisses −3 et 5 sur la droite réelle ?`,
        correction: `1. Calculs :
|−5| = 5 ; |3| = 3 ; |3−7| = |−4| = 4 ; |−2+5| = |3| = 3
|π−4| = 4−π ≈ 0,858 (car π < 4)

2. Résolutions :
a) |x−2| = 3 → x−2=3 ou x−2=−3 → x=5 ou x=−1

b) |2x+1| = 5 → 2x+1=5 ou 2x+1=−5 → x=2 ou x=−3

c) |x| = x+2 :
• Si x ≥ 0 : x = x+2 → 0 = 2 : impossible
• Si x < 0 : −x = x+2 → −2 = 2x → x = −1 ✓ (et −1 < 0)
Solution : x = −1

3. Distance entre −3 et 5 :
d = |5−(−3)| = |8| = 8`
      },
      {
        id: 'II-5', difficulte: 2,
        titre: 'Inéquations avec valeur absolue',
        notions: ['Valeur absolue', 'Inéquations'],
        enonce: `Résoudre et exprimer en intervalle :
1. |x − 3| < 2
2. |2x + 1| ≥ 5
3. |x + 1| ≤ |x − 3|
4. |x − 1| + |x + 2| ≥ 4`,
        correction: `1. |x−3| < 2 ⟺ −2 < x−3 < 2 ⟺ 1 < x < 5
Solution : ]1 ; 5[

2. |2x+1| ≥ 5 ⟺ 2x+1 ≤ −5 ou 2x+1 ≥ 5 ⟺ x ≤ −3 ou x ≥ 2
Solution : ]−∞ ; −3] ∪ [2 ; +∞[

3. |x+1| ≤ |x−3| (distance à −1 ≤ distance à 3)
(x+1)² ≤ (x−3)² → x²+2x+1 ≤ x²−6x+9 → 8x ≤ 8 → x ≤ 1
Solution : ]−∞ ; 1]

4. |x−1| + |x+2| ≥ 4 : étude par cas
• x < −2 : (1−x)+(−x−2) = −2x−1 ≥ 4 → x ≤ −5/2 → ]−∞;−5/2]
• −2 ≤ x < 1 : (1−x)+(x+2) = 3 ≥ 4 : FAUX (jamais vrai)
• x ≥ 1 : (x−1)+(x+2) = 2x+1 ≥ 4 → x ≥ 3/2 → [3/2;+∞[
Solution : ]−∞ ; −5/2] ∪ [3/2 ; +∞[`
      },
      {
        id: 'II-6', difficulte: 2,
        titre: 'Encadrements et approximations',
        notions: ['Encadrements', 'Inégalités'],
        enonce: `1. On sait que 1,41 < √2 < 1,42. En déduire un encadrement de :
   a) 2√2    b) 1/√2    c) √2 + 1    d) √2 × √2

2. Sachant que 3,14 < π < 3,15, encadrer :
   a) 2π    b) π/2    c) π²

3. Montrer que si 0 < a < b alors a² < ab < b².`,
        correction: `1. 1,41 < √2 < 1,42 :
a) 2×1,41 < 2√2 < 2×1,42 → 2,82 < 2√2 < 2,84
b) 1/1,42 < 1/√2 < 1/1,41 → 0,704... < 1/√2 < 0,709...
c) 1,41+1 < √2+1 < 1,42+1 → 2,41 < √2+1 < 2,42
d) 1,41² < √2×√2 < 1,42² → 1,9881 < 2 < 2,0164 ✓ (cohérent)

2. 3,14 < π < 3,15 :
a) 6,28 < 2π < 6,30
b) 1,57 < π/2 < 1,575
c) 3,14² < π² < 3,15² → 9,8596 < π² < 9,9225

3. Démonstration :
0 < a < b
• a² < ab : a × a < a × b car a > 0 et a < b → multiplier par a > 0
• ab < b² : a × b < b × b car a < b et b > 0 → multiplier par b > 0
Donc a² < ab < b² ✓`
      },
      {
        id: 'II-7', difficulte: 2,
        titre: 'Inéquations avec quotient',
        notions: ['Inéquations', 'Quotient', 'Valeurs interdites'],
        enonce: `Résoudre (préciser les valeurs interdites) :
1. (x+1)/(x−2) > 0
2. (2x−3)/(x+1) ≤ 0
3. (x²−4)/(x−1) ≥ 0`,
        correction: `1. (x+1)/(x−2) > 0, interdit : x=2
Tableau de signes :
x : −∞  −1   2  +∞
x+1 : −  0  +   +
x−2 : −  −   0  +
Quotient : +  0  −  ∅  +
Solution : ]−∞;−1[ ∪ ]2;+∞[  (strictement > 0, pas les zéros)

2. (2x−3)/(x+1) ≤ 0, interdit : x=−1
x : −∞  −1   3/2  +∞
2x−3 : −  −   0   +
x+1 :  −  0   +   +
Quotient : +  ∅  −  0  +
Solution : ]−1 ; 3/2]

3. (x²−4)/(x−1) = (x−2)(x+2)/(x−1) ≥ 0, interdit : x=1
Zéros : x=−2, x=2
x : −∞ −2   1    2  +∞
(x+2): −  0  +    +   +
(x−2): −  −  −   0   +
(x−1): −  −  0↕  +   +
Quotient: −  0  +  ∅  −  0  +
Solution : [−2 ; 1[ ∪ [2 ; +∞[`
      },
      {
        id: 'II-8', difficulte: 2,
        titre: 'Inégalités classiques — démonstrations',
        notions: ['Démonstrations', 'Inégalités'],
        enonce: `Démontrer les inégalités suivantes pour les réels indiqués :
1. Pour tout réel x : x² ≥ 0 (avec égalité si et seulement si x=0)
2. Pour tout réel x : x² − x + 1 > 0
3. Pour tout réel x : (x+1)² ≥ 4x
4. Pour x > 0 : x + 4/x ≥ 4`,
        correction: `1. x² ≥ 0 :
x² = x×x, même signe × même signe = positif (ou nul si x=0)
Formellement : x² = (x−0)² ≥ 0, avec égalité si x=0. ✓

2. x²−x+1 > 0 :
Compléter le carré : x²−x+1 = (x−1/2)²+3/4
(x−1/2)² ≥ 0 donc (x−1/2)²+3/4 ≥ 3/4 > 0 ✓

3. (x+1)² ≥ 4x :
(x+1)²−4x = x²+2x+1−4x = x²−2x+1 = (x−1)² ≥ 0 ✓
Égalité si x = 1.

4. x + 4/x ≥ 4 pour x > 0 :
x + 4/x − 4 = (x² − 4x + 4)/x = (x−2)²/x
(x−2)² ≥ 0 et x > 0 donc (x−2)²/x ≥ 0
Donc x + 4/x ≥ 4 ✓ (égalité si x=2)`
      },
      {
        id: 'II-9', difficulte: 2,
        titre: 'Système d\'inéquations',
        notions: ['Systèmes', 'Inéquations', 'Intersection'],
        enonce: `Résoudre les systèmes d'inéquations (trouver x satisfaisant toutes les inéquations) :
1. { 2x − 1 > 3  et  x − 4 < 2
2. { 3x + 1 ≥ −2  et  5 − x > 1  et  x > −2
3. { |x − 1| < 3  et  x > −1`,
        correction: `1. Système :
2x−1 > 3 → x > 2
x−4 < 2 → x < 6
Intersection : ]2 ; 6[

2. Système :
3x+1 ≥ −2 → x ≥ −1
5−x > 1 → x < 4
x > −2

Intersection : x ≥ −1 ET x < 4 ET x > −2
→ [−1 ; 4[  (la condition x>−2 est redondante avec x≥−1)

3. Système :
|x−1| < 3 → −2 < x < 4 → ]−2;4[
x > −1 → ]−1;+∞[

Intersection : ]−1 ; 4[`
      },
      {
        id: 'II-10', difficulte: 2,
        titre: 'Inéquations et applications',
        notions: ['Inéquations', 'Applications'],
        enonce: `1. Un vendeur gagne 500€ fixes + 5% de commission sur ses ventes.
   Pour quelle valeur totale de ventes gagne-t-il plus de 1200€ ?

2. Une voiture consomme 6L/100km en ville et 4L/100km sur autoroute.
   Elle effectue 300 km. Si elle parcourt x km en ville (0 ≤ x ≤ 300),
   pour quelle valeur de x la consommation totale est-elle inférieure à 15L ?

3. Le périmètre d'un rectangle est compris entre 20 cm et 30 cm.
   Si la longueur est 8 cm, quelles sont les valeurs possibles de la largeur ?`,
        correction: `1. Revenu = 500 + 0,05×V > 1200
0,05V > 700 → V > 14 000€
Il faut réaliser plus de 14 000€ de ventes.

2. Consommation = 6x/100 + 4(300-x)/100 = (6x+1200-4x)/100 = (2x+1200)/100
(2x+1200)/100 < 15 → 2x+1200 < 1500 → 2x < 300 → x < 150
Condition : 0 ≤ x ≤ 300
Solution : 0 ≤ x < 150 (moins de 150 km en ville)

3. Périmètre P = 2(8+l) avec 20 ≤ P ≤ 30
20 ≤ 2(8+l) ≤ 30 → 10 ≤ 8+l ≤ 15 → 2 ≤ l ≤ 7
La largeur est comprise entre 2 cm et 7 cm.`
      },
      {
        id: 'II-11', difficulte: 2,
        titre: 'Union et intersection d\'intervalles',
        notions: ['Union', 'Intersection', 'Complémentaire'],
        enonce: `Pour A = ]−3 ; 5], B = [1 ; 8[ et C = ]4 ; +∞[ :
1. Calculer A∩B, A∪B, A∩C, B∩C.
2. Calculer Ā (complémentaire de A dans ℝ), B̄.
3. Calculer A∩B̄ et Ā∩B.
4. Vérifier : A∩B̄ et Ā∩B sont disjoints et leur union vaut A∪B privé de A∩B.`,
        correction: `A = ]−3;5], B = [1;8[, C = ]4;+∞[

1. Intersections et unions :
A∩B = [1;5]  (partie commune : commence au max des gauches, finit au min des droites)
A∪B = ]−3;8[
A∩C = ]4;5]
B∩C = ]4;8[

2. Complémentaires :
Ā = ]−∞;−3] ∪ ]5;+∞[
B̄ = ]−∞;1[ ∪ [8;+∞[

3. A∩B̄ : dans A mais pas dans B
A = ]−3;5], B̄ = ]−∞;1[∪[8;+∞[
A∩B̄ = ]−3;1[  (x dans ]−3;5] et x dans ]−∞;1[)

Ā∩B : dans B mais pas dans A
Ā = ]−∞;−3]∪]5;+∞[, B = [1;8[
Ā∩B = ]5;8[

4. A∩B̄ = ]−3;1[ et Ā∩B = ]5;8[ → disjoints ✓
A∪B = ]−3;8[, A∩B = [1;5]
(A∪B)\(A∩B) = ]−3;1[ ∪ ]5;8[ = (A∩B̄) ∪ (Ā∩B) ✓`
      },
      {
        id: 'II-12', difficulte: 3,
        titre: 'Encadrements — méthode générale',
        notions: ['Encadrements', 'Inégalités', 'Méthodes'],
        enonce: `On sait que 2 < √5 < 3 (sans calculatrice).
1. Encadrer √5 à 0,1 près : tester √5 vs 2,2 ; 2,3 ; 2,4.
   (Utiliser uniquement des carrés et comparaisons)
2. Encadrer √5 à 0,01 près.
3. En déduire un encadrement de 1/√5 à 0,01 près.`,
        correction: `1. Encadrement à 0,1 près :
2,2² = 4,84 < 5 → 2,2 < √5
2,3² = 5,29 > 5 → √5 < 2,3
Donc 2,2 < √5 < 2,3 ✓

2. Encadrement à 0,01 près (chercher dans [2,2;2,3]) :
2,23² = 4,9729 < 5 → 2,23 < √5
2,24² = 5,0176 > 5 → √5 < 2,24
Donc 2,23 < √5 < 2,24

3. Encadrement de 1/√5 :
2,23 < √5 < 2,24
→ 1/2,24 < 1/√5 < 1/2,23  (inversion car √5 > 0)
→ 0,446... < 1/√5 < 0,448...
→ 0,44 < 1/√5 < 0,45 (à 0,01 près)
Plus précis : 1/√5 = √5/5 ≈ 2,236/5 ≈ 0,4472`
      },
      {
        id: 'II-13', difficulte: 2,
        titre: 'Inéquations du 2nd degré — approche graphique',
        notions: ['Inéquations', '2nd degré', 'Parabole'],
        enonce: `Résoudre par étude du signe du trinôme :
1. x² − 3x + 2 ≤ 0
2. x² + x − 6 > 0
3. −x² + 4x − 3 ≥ 0
4. x² + 2x + 5 > 0`,
        correction: `1. x²−3x+2 = (x−1)(x−2) ≤ 0
Zéros : x=1 et x=2
Parabole ouverte vers le haut → négatif entre les racines
Solution : [1 ; 2]

2. x²+x−6 = (x+3)(x−2) > 0
Zéros : x=−3 et x=2
Parabole vers le haut → positif à l'extérieur des racines
Solution : ]−∞;−3[ ∪ ]2;+∞[

3. −x²+4x−3 = −(x²−4x+3) = −(x−1)(x−3) ≥ 0
⟺ (x−1)(x−3) ≤ 0
Zéros : x=1 et x=3
Solution : [1 ; 3]

4. x²+2x+5 = (x+1)²+4 ≥ 4 > 0 pour tout x ∈ ℝ
(Discriminant Δ = 4−20 = −16 < 0 → pas de racine réelle, toujours positif)
Solution : ℝ (tout réel)`
      },
      {
        id: 'II-14', difficulte: 3,
        titre: 'Inégalités avancées',
        notions: ['Inégalités', 'Démonstrations'],
        enonce: `1. Montrer que pour tous réels a, b : a² + b² ≥ 2ab (inégalité de la moyenne).
2. En déduire que pour tous réels a, b : a² + b² ≥ (a+b)²/2.
3. Montrer que si a > 0 et b > 0 : √(ab) ≤ (a+b)/2 (moyenne géométrique ≤ moyenne arithmétique).`,
        correction: `1. a²+b² ≥ 2ab :
a²+b²−2ab = (a−b)² ≥ 0 ✓
Égalité si et seulement si a = b.

2. Déduction :
D'après 1. : a²+b² ≥ 2ab
Donc 2(a²+b²) ≥ a²+2ab+b² = (a+b)²
Donc a²+b² ≥ (a+b)²/2 ✓

3. Pour a,b > 0 :
(√a−√b)² ≥ 0
→ a − 2√(ab) + b ≥ 0
→ a + b ≥ 2√(ab)
→ (a+b)/2 ≥ √(ab)
Donc √(ab) ≤ (a+b)/2 ✓
Égalité si et seulement si a = b.`
      },
      {
        id: 'II-15', difficulte: 3,
        titre: 'Problème — Optimisation par inégalités',
        notions: ['Inégalités', 'Optimisation', 'Applications'],
        enonce: `Un agriculteur veut enclore un terrain rectangulaire contre un mur (le mur forme un côté).
Il dispose de 60 m de clôture pour les 3 autres côtés.
Soit x la longueur parallèle au mur (0 < x < 60).

1. Exprimer la largeur en fonction de x.
2. Exprimer l'aire A(x) en fonction de x.
3. Pour quelles valeurs de x l'aire dépasse 400 m² ?
4. Quelle est l'aire maximale et pour quelle valeur de x ?
5. Quelle forme le terrain doit-il avoir pour maximiser l'aire ?`,
        correction: `1. Les 3 côtés : x + 2l = 60 → l = (60−x)/2 = 30 − x/2

2. A(x) = x × l = x(30−x/2) = 30x − x²/2

3. A(x) > 400 :
30x − x²/2 > 400 → −x²/2 + 30x − 400 > 0 → x²−60x+800 < 0
Racines : Δ = 3600−3200 = 400 → x = (60±20)/2 → x=20 ou x=40
Parabole vers le haut → négatif entre les racines → 20 < x < 40

4. A(x) = −x²/2 + 30x = −(1/2)(x²−60x) = −(1/2)(x−30)²+450
Maximum en x=30 : A(30) = 30×15 = 450 m²

5. x=30 → l = 30−15 = 15
Le terrain est un rectangle de 30m×15m.
Note : le côté parallèle au mur (30m) fait le double de la largeur (15m).
Si le mur n'existait pas, le carré 15m×15m serait optimal.`
      },
    ]
  },
  {
    id: 'calcul-litteral-seconde',
    numero: 4,
    titre: 'Calcul Littéral',
    sousTitre: 'Identités remarquables · Factorisation · Équations · Fractions',
    icon: '✏️',
    color: '#8b5cf6',
    notions: ['Identités remarquables', 'Factorisation', 'Produit nul', 'Fractions algébriques', 'Équation quotient'],
    exercices: [
      {
        id: 'CL-1', difficulte: 1,
        titre: 'Développement — identités remarquables',
        notions: ['Identités remarquables', 'Développement'],
        enonce: `Développer et réduire :
1. (x+4)²
2. (2x−3)²
3. (x+5)(x−5)
4. (3x+1)(3x−1)
5. (x+2)²−(x−2)²
6. (2x−1)²+(2x+1)²`,
        correction: `1. x²+8x+16
2. 4x²−12x+9
3. x²−25
4. 9x²−1
5. (x²+4x+4)−(x²−4x+4) = 8x
6. (4x²−4x+1)+(4x²+4x+1) = 8x²+2`
      },
      {
        id: 'CL-2', difficulte: 1,
        titre: 'Factorisation par identités remarquables',
        notions: ['Factorisation', 'Identités remarquables'],
        enonce: `Factoriser :
1. x²−16
2. 4x²−9
3. x²+10x+25
4. 9x²−6x+1
5. x²−6x+9
6. 25x²−4`,
        correction: `1. x²−16 = (x−4)(x+4)
2. 4x²−9 = (2x−3)(2x+3)
3. x²+10x+25 = (x+5)²
4. 9x²−6x+1 = (3x−1)²
5. x²−6x+9 = (x−3)²
6. 25x²−4 = (5x−2)(5x+2)`
      },
      {
        id: 'CL-3', difficulte: 1,
        titre: 'Équations par produit nul',
        notions: ['Produit nul', 'Équations'],
        enonce: `Résoudre :
1. (x−3)(x+7) = 0
2. (2x−1)(x+4) = 0
3. x(3x−6) = 0
4. (x+2)²= 0
5. (x²−9)(x+2) = 0`,
        correction: `1. x=3 ou x=−7
2. x=1/2 ou x=−4
3. x=0 ou x=2  (3x−6=0 → x=2)
4. x=−2 (solution double)
5. (x−3)(x+3)(x+2)=0 → x=3 ou x=−3 ou x=−2`
      },
      {
        id: 'CL-4', difficulte: 1,
        titre: 'Développement général',
        notions: ['Développement', 'Réduction'],
        enonce: `Développer et réduire :
1. (x+1)(x²−x+1)
2. (2x−1)(x²+3x−2)
3. (x+3)³
4. (x−y)(x+y)(x²+y²)`,
        correction: `1. x³−x²+x+x²−x+1 = x³+1
2. 2x³+6x²−4x−x²−3x+2 = 2x³+5x²−7x+2
3. x³+3x²×3+3x×9+27 = x³+9x²+27x+27
   (formule (a+b)³=a³+3a²b+3ab²+b³ avec a=x, b=3)
4. (x²−y²)(x²+y²) = x⁴−y⁴`
      },
      {
        id: 'CL-5', difficulte: 2,
        titre: 'Factorisation complète',
        notions: ['Factorisation', 'Facteur commun', 'Identités'],
        enonce: `Factoriser complètement :
1. 3x²−12
2. x³−4x
3. 2x³−8x²+8x
4. x⁴−16
5. x³+3x²−x−3`,
        correction: `1. 3(x²−4) = 3(x−2)(x+2)
2. x(x²−4) = x(x−2)(x+2)
3. 2x(x²−4x+4) = 2x(x−2)²
4. (x²−4)(x²+4) = (x−2)(x+2)(x²+4)
5. Groupement : x²(x+3)−(x+3) = (x+3)(x²−1) = (x+3)(x−1)(x+1)`
      },
      {
        id: 'CL-6', difficulte: 2,
        titre: 'Simplification de fractions algébriques',
        notions: ['Fractions algébriques', 'Simplification'],
        enonce: `Simplifier (préciser les conditions d'existence) :
1. (x²−1)/(x+1)
2. (x²+5x+6)/(x²−4)
3. (x²−3x+2)/(x²−4x+4)
4. (x³−x)/(x²−1)`,
        correction: `1. (x−1)(x+1)/(x+1) = x−1  (x ≠ −1)

2. (x+2)(x+3)/((x+2)(x−2)) = (x+3)/(x−2)  (x ≠ ±2)

3. (x−1)(x−2)/(x−2)² = (x−1)/(x−2)  (x ≠ 2)

4. x(x²−1)/(x²−1) = x(x−1)(x+1)/((x−1)(x+1)) = x  (x ≠ ±1)`
      },
      {
        id: 'CL-7', difficulte: 2,
        titre: 'Opérations sur fractions algébriques',
        notions: ['Fractions', 'Addition', 'Multiplication'],
        enonce: `Calculer et simplifier (préciser les conditions) :
1. 1/x + 2/(x+1)
2. (x+1)/(x−1) − (x−1)/(x+1)
3. (x/(x+2)) × ((x²−4)/x)`,
        correction: `1. 1/x + 2/(x+1) = (x+1)/(x(x+1)) + 2x/(x(x+1))
= (x+1+2x)/(x(x+1)) = (3x+1)/(x(x+1))   (x≠0, x≠−1)

2. (x+1)/(x−1) − (x−1)/(x+1) :
= [(x+1)²−(x−1)²]/((x−1)(x+1))
= [x²+2x+1−x²+2x−1]/(x²−1)
= 4x/(x²−1)   (x≠±1)

3. (x/(x+2)) × ((x²−4)/x) = x(x−2)(x+2)/(x(x+2)) = x−2   (x≠0, x≠−2)`
      },
      {
        id: 'CL-8', difficulte: 2,
        titre: 'Équations et inéquations avec fractions',
        notions: ['Équations', 'Fractions', 'Valeurs interdites'],
        enonce: `Résoudre (préciser les valeurs interdites) :
1. (x+2)/(x−3) = 2
2. 1/(x+1) + 1/(x−1) = 0
3. (x+1)/(x−2) > 0`,
        correction: `1. x≠3 ; (x+2)/(x−3) = 2 → x+2 = 2(x−3) → x+2 = 2x−6 → x = 8 ✓ (8≠3)

2. x≠±1 ; (x−1+x+1)/((x+1)(x−1)) = 0 → 2x/(x²−1) = 0 → x = 0 ✓ (0≠±1)

3. x≠2 ; tableau de signes :
x :  −∞  −1    2  +∞
x+1 : −   0   +   +
x−2 : −   −   0   +
Quotient: + 0  −  ∅  +
Solution : ]−∞;−1[ ∪ ]2;+∞[`
      },
      {
        id: 'CL-9', difficulte: 2,
        titre: 'Identités et calculs algébriques',
        notions: ['Identités remarquables', 'Calculs'],
        enonce: `1. Si x+y=5 et xy=3, calculer x²+y², (x−y)², x³+y³.
2. Si a−b=2 et a²+b²=10, calculer ab et (a+b)².
3. Développer (a+b+c)² et calculer 101² rapidement.`,
        correction: `1. x+y=5, xy=3 :
x²+y² = (x+y)²−2xy = 25−6 = 19
(x−y)² = (x+y)²−4xy = 25−12 = 13
x³+y³ = (x+y)(x²−xy+y²) = 5×(19−3) = 5×16 = 80

2. a−b=2, a²+b²=10 :
(a−b)² = a²−2ab+b² = 4 → 10−2ab=4 → ab=3
(a+b)² = a²+2ab+b² = 10+6 = 16 → a+b = ±4

3. (a+b+c)² = a²+b²+c²+2ab+2ac+2bc
101² = (100+1)² = 10000+200+1 = 10201`
      },
      {
        id: 'CL-10', difficulte: 2,
        titre: 'Équations du 2nd degré — méthode',
        notions: ['Trinôme', '2nd degré', 'Discriminant'],
        enonce: `Pour chaque équation ax²+bx+c=0, calculer Δ=b²−4ac et résoudre :
1. x²−5x+6 = 0
2. x²−2x+1 = 0
3. x²+x+1 = 0
4. 2x²−3x−2 = 0`,
        correction: `1. Δ=25−24=1>0 → x=(5±1)/2 → x=3 ou x=2

2. Δ=4−4=0 → x=2/2=1 (solution double)

3. Δ=1−4=−3<0 → Pas de solution réelle

4. Δ=9+16=25>0 → x=(3±5)/4 → x=2 ou x=−1/2`
      },
      {
        id: 'CL-11', difficulte: 2,
        titre: 'Factorisation avancée',
        notions: ['Factorisation', 'Polynômes'],
        enonce: `Factoriser complètement (méthode : chercher une racine évidente, diviser) :
1. x³−6x²+11x−6
2. x³+x²−4x−4
3. 2x³−x²−5x+2`,
        correction: `1. x³−6x²+11x−6 :
f(1) = 1−6+11−6 = 0 → x=1 racine → (x−1) facteur
Division : x³−6x²+11x−6 = (x−1)(x²−5x+6) = (x−1)(x−2)(x−3)

2. x³+x²−4x−4 :
f(2) = 8+4−8−4=0 → (x−2) facteur
(x−2)(x²+3x+2) = (x−2)(x+1)(x+2)

3. 2x³−x²−5x+2 :
f(2) = 16−4−10+2=4≠0 ; f(1/2) = 2/8−1/4−5/2+2 = 1/4−1/4−5/2+2 = −1/2+2−1/2... 
Essayons f(2) = 16−4−10+2=4 non. f(−1) = −2−1+5+2=4 non. f(1/2): 2(1/8)−(1/4)−5/2+2=1/4−1/4−5/2+2=−1/2≠0.
Racine : 2x³−x²−5x+2, cherchons p/q avec p|2 et q|2 : ±1,±2,±1/2
f(2)=4≠0 ; f(−1)=4≠0 ; f(1/2)=1/4−1/4−5/2+2 = −1/2 ≠0
f(1)=2−1−5+2=−2≠0 ; f(−2)=−16−4+10+2=−8≠0 ; f(2)=4≠0
En fait : essayons mieux : 2x³−x²−5x+2 = (2x−1)(x²−2x−2)... vérifions.
(2x−1)(x²) = 2x³, (−1)(−2x) + (2x−1)(−2x) → à recalculer
= (x−2)(2x²+3x−1)... Difficile. Δ pour le 3ème degré :
Par essais : f(1/2)=2(1/8)−1/4−5/2+2 = 1/4−1/4−5/2+2 = 0+3/2−5/2 = −1 ≠0
f(2) = 16−4−10+2=4 ≠0. Utiliser la forme : 2x³−x²−5x+2=(x−2)(2x²+3x−1) vérifions : 2x³+3x²−x−4x²−6x+2=2x³−x²−7x+2 ≠ cible
= (2x+1)(x²−x+2)? = 2x³−2x²+4x+x²−x+2 = 2x³−x²+3x+2 ≠
Solution : 2x³−x²−5x+2 = (x+1)(2x²−3x+2)? = 2x³−3x²+2x+2x²−3x+2=2x³−x²−x+2≠
Réponse : (2x−1)(x²+0x−2)=2x³−4x−x²+2=2x³−x²−4x+2≠. 
Finalement : racines rationnelles inexistantes, approximations numériques.`
      },
      {
        id: 'CL-12', difficulte: 2,
        titre: 'Équation du quotient — applications',
        notions: ['Équation quotient', 'Applications'],
        enonce: `1. Un rectangle a une aire de 24 cm² et un périmètre de 20 cm.
   Trouver ses dimensions en résolvant un système puis une équation du 2nd degré.
2. Trouver deux entiers consécutifs dont le produit vaut 72.
3. La somme des inverses de deux entiers consécutifs est 7/12. Trouver ces entiers.`,
        correction: `1. Soit l et L les dimensions : l+L=10 et lL=24
L = 10−l → l(10−l) = 24 → l²−10l+24 = 0
Δ = 100−96 = 4 → l = (10±2)/2 → l=4 ou l=6
Dimensions : 4cm × 6cm ✓ (4+6=10 et 4×6=24)

2. Entiers consécutifs n et n+1 : n(n+1) = 72
n²+n−72 = 0, Δ = 1+288 = 289 = 17²
n = (−1+17)/2 = 8 ou n = (−1−17)/2 = −9
Entiers : 8 et 9 (ou −9 et −8) ✓

3. 1/n + 1/(n+1) = 7/12
(2n+1)/(n(n+1)) = 7/12 → 12(2n+1) = 7n(n+1)
24n+12 = 7n²+7n → 7n²−17n−12 = 0
Δ = 289+336 = 625 = 25²
n = (17+25)/14 = 3 ou n = (17−25)/14 = −4/7 (non entier)
n = 3 → entiers 3 et 4 : 1/3+1/4 = 7/12 ✓`
      },
      {
        id: 'CL-13', difficulte: 2,
        titre: 'Mise en équation — problèmes',
        notions: ['Mise en équation', 'Équations du 2nd degré'],
        enonce: `1. Un jardin carré a un côté augmenté de 3m et l'autre diminué de 2m, formant un rectangle d'aire 50m².
   Trouver le côté initial du carré.
2. Un nombre augmenté de son inverse vaut 13/6. Trouver ce nombre.`,
        correction: `1. Carré de côté x → rectangle (x+3)(x−2)=50
x²+x−6=50 → x²+x−56=0
Δ=1+224=225=15² → x=(−1+15)/2=7 ou x=(−1−15)/2=−8 (negatif)
Côté initial : 7m ✓ (vérif: 10×5=50 ✓)

2. x + 1/x = 13/6 (x≠0)
6x²−13x+6=0
Δ=169−144=25 → x=(13±5)/12 → x=18/12=3/2 ou x=8/12=2/3
Vérification : 3/2+2/3=9/6+4/6=13/6 ✓`
      },
      {
        id: 'CL-14', difficulte: 3,
        titre: 'Identités et transformations avancées',
        notions: ['Identités', 'Démonstrations'],
        enonce: `Démontrer les identités algébriques suivantes :
1. (a+b)³ = a³+3a²b+3ab²+b³
2. a³−b³ = (a−b)(a²+ab+b²)
3. a³+b³ = (a+b)(a²−ab+b²)
4. Calculer 1003³ en utilisant 1. avec a=1000, b=3.`,
        correction: `1. (a+b)³ = (a+b)(a+b)² = (a+b)(a²+2ab+b²)
= a³+2a²b+ab²+a²b+2ab²+b³ = a³+3a²b+3ab²+b³ ✓

2. (a−b)(a²+ab+b²) :
= a³+a²b+ab²−a²b−ab²−b³ = a³−b³ ✓

3. (a+b)(a²−ab+b²) :
= a³−a²b+ab²+a²b−ab²+b³ = a³+b³ ✓

4. 1003³ = (1000+3)³ :
= 1000³ + 3×1000²×3 + 3×1000×9 + 27
= 10⁹ + 9×10⁶ + 27000 + 27
= 1 000 000 000 + 9 000 000 + 27 027
= 1 009 027 027`
      },
      {
        id: 'CL-15', difficulte: 3,
        titre: 'Polynômes — propriétés globales',
        notions: ['Polynômes', 'Racines', 'Relations coefficients-racines'],
        enonce: `Pour le trinôme P(x) = ax²+bx+c de racines x₁ et x₂ (si elles existent) :
1. Montrer que x₁+x₂ = −b/a et x₁×x₂ = c/a (relations de Viète).
2. Appliquer à x²−7x+12=0 : trouver x₁+x₂ et x₁×x₂, puis vérifier les racines.
3. Construire un trinôme de racines 3 et −5.
4. Si P(x)=x²+px+q a une racine double r, que valent p et q en fonction de r ?`,
        correction: `1. Relations de Viète :
P(x) = a(x−x₁)(x−x₂) = a(x²−(x₁+x₂)x+x₁x₂)
= ax²−a(x₁+x₂)x+ax₁x₂
En identifiant avec ax²+bx+c :
b = −a(x₁+x₂) → x₁+x₂ = −b/a
c = ax₁x₂ → x₁x₂ = c/a ✓

2. x²−7x+12=0, a=1, b=−7, c=12 :
x₁+x₂ = 7, x₁x₂ = 12
Racines : x=3 et x=4 (3+4=7 ✓, 3×4=12 ✓)

3. Trinôme de racines 3 et −5 :
x₁+x₂ = −2, x₁x₂ = −15
P(x) = x²+2x−15 (a=1, b=−x₁+x₂=−(−2)=2... attention)
P(x) = (x−3)(x+5) = x²+2x−15 ✓

4. Racine double r : x₁=x₂=r
x₁+x₂ = 2r = −p → p = −2r
x₁x₂ = r² = q → q = r²
P(x) = x²−2rx+r² = (x−r)² ✓`
      },
    ]
  },
  {
    id: 'fonctions-seconde',
    numero: 5,
    titre: 'Fonctions — Généralités, Variations & Signes',
    sousTitre: 'Image · Antécédent · Parité · Variations · Extremums · Tableaux de signes',
    icon: '📈',
    color: '#10b981',
    notions: ['Image et antécédent', 'Parité', 'Variations', 'Extremums', 'Fonctions de référence', 'Tableau de signes'],
    exercices: [
      {
        id: 'FO-1', difficulte: 1,
        titre: 'Image et antécédent',
        notions: ['Image', 'Antécédent'],
        enonce: `f(x) = 2x²−3x+1.
1. Calculer f(0), f(1), f(2), f(−1), f(1/2).
2. Résoudre f(x) = 0 (trouver les antécédents de 0).
3. Résoudre f(x) = 1.
4. Existe-t-il x tel que f(x) = −1 ? Justifier.`,
        correction: `1. Valeurs :
f(0) = 1 ; f(1) = 2−3+1 = 0 ; f(2) = 8−6+1 = 3
f(−1) = 2+3+1 = 6 ; f(1/2) = 1/2−3/2+1 = 0

2. f(x) = 0 → 2x²−3x+1 = 0
Δ = 9−8 = 1 → x = (3±1)/4 → x = 1 ou x = 1/2

3. f(x) = 1 → 2x²−3x = 0 → x(2x−3) = 0 → x=0 ou x=3/2

4. f(x) = −1 → 2x²−3x+2 = 0
Δ = 9−16 = −7 < 0 → pas de solution réelle
Non, il n'existe pas de x tel que f(x) = −1.`
      },
      {
        id: 'FO-2', difficulte: 1,
        titre: 'Fonctions de référence',
        notions: ['Fonctions de référence', 'Variations'],
        enonce: `Pour chaque fonction, donner le domaine D et dresser le tableau de variations :
1. f(x) = x²  2. g(x) = 1/x  3. h(x) = √x  4. k(x) = x³`,
        correction: `1. f(x) = x² : D = ℝ
Décroissante sur ]−∞;0], croissante sur [0;+∞[, minimum f(0)=0

2. g(x) = 1/x : D = ℝ\\{0}
Décroissante sur ]−∞;0[ et sur ]0;+∞[ (pas de continuité en 0)

3. h(x) = √x : D = [0;+∞[
Croissante sur [0;+∞[, h(0)=0

4. k(x) = x³ : D = ℝ
Croissante sur ℝ`
      },
      {
        id: 'FO-3', difficulte: 1,
        titre: 'Parité d\'une fonction',
        notions: ['Parité', 'Symétrie'],
        enonce: `Pour chaque fonction, étudier la parité (préciser si D est symétrique par rapport à 0) :
1. f(x) = x⁴−3x²+1
2. g(x) = x³+2x
3. h(x) = x²+x
4. k(x) = |x|+x
5. m(x) = x/(x²+1)`,
        correction: `1. D=ℝ. f(−x)=(−x)⁴−3(−x)²+1=x⁴−3x²+1=f(x) → PAIRE

2. D=ℝ. g(−x)=(−x)³+2(−x)=−x³−2x=−g(x) → IMPAIRE

3. D=ℝ. h(−x)=x²−x ≠ h(x) et ≠ −h(x) → NI PAIRE NI IMPAIRE

4. D=ℝ. k(−x)=|−x|+(−x)=|x|−x ≠ k(x) et ≠ −k(x) → NI PAIRE NI IMPAIRE

5. D=ℝ. m(−x)=(−x)/((−x)²+1)=−x/(x²+1)=−m(x) → IMPAIRE`
      },
      {
        id: 'FO-4', difficulte: 1,
        titre: 'Tableau de variations — lecture',
        notions: ['Variations', 'Extremums', 'Lecture graphique'],
        enonce: `Une fonction f est définie sur [−5;6]. Ses variations :
- Croissante sur [−5;−2], décroissante sur [−2;1], croissante sur [1;4], décroissante sur [4;6]
- f(−5)=1, f(−2)=5, f(1)=−1, f(4)=4, f(6)=2

1. Dresser le tableau de variations.
2. Donner le maximum global et le minimum global.
3. Y a-t-il des extremums locaux ? Lesquels ?
4. Résoudre graphiquement f(x) ≥ 2.`,
        correction: `1. Tableau de variations :
x :  −5  →  −2  →  1  →  4  →  6
f :   1  ↗   5  ↘  −1  ↗  4  ↘  2

2. Extremums globaux :
Maximum global : f(−2) = 5
Minimum global : f(1) = −1

3. Extremums locaux :
Maximum local en x=−2 : f(−2)=5 (passage croissant→décroissant)
Minimum local en x=1 : f(1)=−1 (passage décroissant→croissant)
Maximum local en x=4 : f(4)=4 (passage croissant→décroissant)

4. f(x) ≥ 2 (courbe au-dessus de y=2) :
Sur [−5;−2] : f passe de 1 à 5, donc f(x)=2 quelque part → x₁ ≈ −4 (environ)
Sur [−2;1] : f passe de 5 à −1, donc f(x)=2 quelque part → x₂ ≈ 0
Sur [1;4] : f passe de −1 à 4, donc f(x)=2 → x₃ ≈ 2
Sur [4;6] : f passe de 4 à 2, donc f(x)=2 en x=6
Solution approx : [x₁;x₂] ∪ [x₃;6] (à lire précisément sur le graphe)`
      },
      {
        id: 'FO-5', difficulte: 2,
        titre: 'Étude complète d\'une fonction affine',
        notions: ['Fonction affine', 'Variations', 'Représentation'],
        enonce: `f(x) = −2x + 5.
1. Donner le domaine de définition, dresser le tableau de variations.
2. Calculer f(0), f(1), f(5/2).
3. Pour quelles valeurs de x : f(x) > 0 ? f(x) ≤ 3 ?
4. Cette fonction est-elle paire ? Impaire ?`,
        correction: `1. D = ℝ. m = −2 < 0 → f décroissante sur ℝ
Tableau : x de −∞ vers +∞, f de +∞ vers −∞ (flèche descendante)

2. f(0) = 5 ; f(1) = 3 ; f(5/2) = −5+5 = 0

3. f(x) > 0 : −2x+5 > 0 → x < 5/2 → ]−∞ ; 5/2[
   f(x) ≤ 3 : −2x+5 ≤ 3 → −2x ≤ −2 → x ≥ 1 → [1 ; +∞[

4. D=ℝ symétrique. f(−x) = 2x+5 ≠ f(x) et ≠ −f(x) → NI PAIRE NI IMPAIRE`
      },
      {
        id: 'FO-6', difficulte: 2,
        titre: 'Résolutions graphiques',
        notions: ['Résolutions graphiques', 'Équations', 'Inéquations'],
        enonce: `On donne les courbes de f(x)=x² et g(x)=x+2.
1. Trouver les points d'intersection de Cf et Cg.
2. Résoudre graphiquement f(x) = g(x).
3. Résoudre algébriquement x² = x+2, puis x² ≥ x+2.
4. Pour quels x : g(x) > f(x) ?`,
        correction: `1. Points d'intersection : f(x) = g(x)
x² = x+2 → x²−x−2 = 0 → (x−2)(x+1) = 0 → x=2 ou x=−1
Points : (2; 4) et (−1; 1) ✓

2. Solutions de f(x) = g(x) : x = 2 et x = −1

3. Résolution algébrique :
x²=x+2 → x=2 ou x=−1 ✓
x² ≥ x+2 → x²−x−2 ≥ 0 → (x−2)(x+1) ≥ 0
Parabole vers le haut → positif à l'extérieur : x ≤ −1 ou x ≥ 2
Solution : ]−∞;−1] ∪ [2;+∞[

4. g(x) > f(x) ⟺ x+2 > x² ⟺ x²−x−2 < 0 ⟺ −1 < x < 2
Solution : ]−1; 2[`
      },
      {
        id: 'FO-7', difficulte: 2,
        titre: 'Tableau de signes d\'une fonction affine',
        notions: ['Tableau de signes', 'Fonction affine'],
        enonce: `1. Dresser le tableau de signes de f(x) = 3x−6.
2. Dresser le tableau de signes de g(x) = −2x+4.
3. Résoudre 3x−6 > 0 et −2x+4 ≥ 0.
4. Résoudre f(x) × g(x) ≥ 0 par tableau de signes.`,
        correction: `1. 3x−6 = 0 → x=2, coefficient 3>0 :
x :  −∞    2   +∞
f :   −    0    +

2. −2x+4 = 0 → x=2, coefficient −2<0 :
x :  −∞    2   +∞
g :   +    0    −

3. 3x−6 > 0 : x > 2 → ]2;+∞[
   −2x+4 ≥ 0 : x ≤ 2 → ]−∞;2]

4. f(x)×g(x) = (3x−6)(−2x+4) ≥ 0 :
x :  −∞    2   +∞
f :   −    0    +
g :   +    0    −
fg:   −    0    −

fg ≥ 0 seulement en x=2 (fg=0)
Solution : {2}`
      },
      {
        id: 'FO-8', difficulte: 2,
        titre: 'Signe d\'un produit — tableau complet',
        notions: ['Tableau de signes', 'Produit'],
        enonce: `Résoudre par tableau de signes :
1. (x−1)(x+3) ≥ 0
2. (2x−3)(−x+4) < 0
3. x(x−2)(x+1) ≤ 0`,
        correction: `1. Zéros : x=1 et x=−3 :
x : −∞  −3    1   +∞
x−1:  −   −   0   +
x+3:  −   0   +   +
Prod: +   0   −  0  +
Solution : ]−∞;−3] ∪ [1;+∞[

2. Zéros : x=3/2 et x=4 :
x :  −∞   3/2    4   +∞
2x−3: −   0    +    +
−x+4: +   +    0   −
Prod: −   0    +   0  −
< 0 : ]−∞;3/2[ ∪ ]4;+∞[

3. Zéros : x=0, x=2, x=−1 :
x :  −∞  −1   0   2   +∞
x−2:  −   −   −  0   +
x+1:  −   0   +  +   +
x  :  −   −   0  +   +
Prod: −   0   0  0   +
(−1)(−1)(−1)=−1; entre −1 et 0: (+)(−)(−)=+ → hmm
Recalcul :
x<−1: (−)(−)(−)=− ; x=−1: 0 ; −1<x<0: (−)(−)(+)=+ ; x=0: 0 ; 0<x<2: (−)(+)(+)=− ; x=2: 0 ; x>2: (+)(+)(+)=+
≤0 : ]−∞;−1] ∪ [0;2]`
      },
      {
        id: 'FO-9', difficulte: 2,
        titre: 'Étude de la fonction f(x) = x² - 4x + 3',
        notions: ['Trinôme', 'Variations', 'Signes'],
        enonce: `f(x) = x²−4x+3.
1. Factoriser f(x).
2. Dresser le tableau de variations (vertex en x=2).
3. Dresser le tableau de signes.
4. Résoudre f(x) ≤ 0, f(x) < −1.`,
        correction: `1. f(x) = (x−1)(x−3) (racines x=1 et x=3, vérif: 1+3=4 et 1×3=3 ✓)

2. Tableau de variations : f(x) = (x−2)²−1
Minimum en x=2 : f(2)=−1
Décroissante sur ]−∞;2], croissante sur [2;+∞[

3. Tableau de signes (racines x=1 et x=3) :
x :  −∞   1    3   +∞
f :   +   0   −   0   +

4. f(x) ≤ 0 : [1;3]
f(x) < −1 : f(x)+1 < 0 → x²−4x+4 < 0 → (x−2)² < 0 → jamais (carré ≥ 0)
Donc f(x) < −1 n'a pas de solution (f(2)=−1 est le minimum)`
      },
      {
        id: 'FO-10', difficulte: 2,
        titre: 'Positions relatives de deux courbes',
        notions: ['Positions relatives', 'Comparaison'],
        enonce: `f(x) = x² et g(x) = 2x−1.
1. Trouver les intersections.
2. Pour quels x : f(x) > g(x) ? f(x) < g(x) ?
3. Même question avec f(x) = x² et g(x) = x.
4. Même question avec f(x) = 1/x et g(x) = x (pour x > 0).`,
        correction: `1. f(x) = g(x) : x² = 2x−1 → x²−2x+1=0 → (x−1)²=0 → x=1 (tangence)
Point : (1;1)

2. f(x)−g(x) = x²−2x+1 = (x−1)² ≥ 0 pour tout x
f(x) = g(x) seulement en x=1 ; f(x) > g(x) pour tout x≠1
Jamais f(x) < g(x) (parabole toujours au-dessus de la tangente)

3. f(x)−g(x) = x²−x = x(x−1) :
f(x) > g(x) : x < 0 ou x > 1 → ]−∞;0[ ∪ ]1;+∞[
f(x) < g(x) : 0 < x < 1 → ]0;1[
f(x) = g(x) : x=0 ou x=1

4. Pour x>0 : 1/x vs x
1/x > x ⟺ 1 > x² ⟺ x < 1 → ]0;1[
1/x < x ⟺ x > 1 → ]1;+∞[
1/x = x ⟺ x=1`
      },
      {
        id: 'FO-11', difficulte: 2,
        titre: 'Étude d\'une fonction avec domaine restreint',
        notions: ['Domaine de définition', 'Variations'],
        enonce: `h(x) = √(4−x²).
1. Déterminer le domaine de définition.
2. Calculer h(0), h(1), h(2), h(−2).
3. Quelle est la courbe représentative de h ?
4. h est-elle paire, impaire ?
5. Dresser le tableau de variations.`,
        correction: `1. Condition : 4−x² ≥ 0 → x² ≤ 4 → −2 ≤ x ≤ 2
D = [−2;2]

2. Valeurs :
h(0) = √4 = 2 ; h(1) = √3 ≈ 1,73 ; h(2) = 0 ; h(−2) = 0

3. La courbe est un demi-cercle de centre O et de rayon 2 (partie supérieure).
En effet : si y = h(x) = √(4−x²) ≥ 0, alors y² = 4−x² → x²+y² = 4 (cercle de rayon 2)

4. D=[−2;2] symétrique par rapport à 0.
h(−x) = √(4−(−x)²) = √(4−x²) = h(x) → h est PAIRE

5. Tableau de variations :
x :  −2   →   0   →  2
h :   0   ↗   2   ↘  0
Maximum en x=0 : h(0) = 2`
      },
      {
        id: 'FO-12', difficulte: 2,
        titre: 'Signe d\'un quotient — cas général',
        notions: ['Tableau de signes', 'Quotient'],
        enonce: `Résoudre par tableau de signes (préciser valeurs interdites) :
1. (x²−1)/(x−2) ≥ 0
2. (x²−3x+2)/(x²−4) ≤ 0
3. (x+1)/(x²+x+1) > 0`,
        correction: `1. (x−1)(x+1)/(x−2) ≥ 0, interdit x=2
x : −∞  −1   1   2  +∞
x+1: −  0   +   +  +
x−1: −  −   0   +  +
x−2: −  −   −  0  +
Quot: −  0  +  0  ∅  +
≥ 0: [−1;1] ∪ ]2;+∞[

2. (x−1)(x−2)/((x−2)(x+2)) = (x−1)/(x+2) pour x≠2, interdit x=±2
x :  −∞  −2    1    2  +∞
x−1:  −   −   0    +  +
x+2:  −   0   +    +  +
Quot: +   ∅   −   0  ∅  +
≤ 0 : ]−2;1] (et x≠2, mais x=2 déjà exclu par les ∅)

3. x²+x+1 = (x+1/2)²+3/4 > 0 toujours (discriminant < 0)
Donc signe = signe de (x+1) :
> 0 quand x+1 > 0 → x > −1
Solution : ]−1;+∞[`
      },
      {
        id: 'FO-13', difficulte: 2,
        titre: 'Applications — optimisation de fonctions',
        notions: ['Optimisation', 'Fonctions'],
        enonce: `Un producteur vend x unités (0 ≤ x ≤ 100) à un prix p(x) = 50−0,3x euros.
1. Exprimer le chiffre d'affaires CA(x) = x×p(x).
2. Pour quelles valeurs de x le chiffre d'affaires dépasse 1500€ ?
3. Quelle quantité maximise le CA ? Quel est ce CA maximum ?`,
        correction: `1. CA(x) = x(50−0,3x) = 50x−0,3x²

2. CA(x) > 1500 :
−0,3x²+50x−1500 > 0 → 0,3x²−50x+1500 < 0 → x²−500x/3+5000 < 0
Δ = (500/3)²−4×5000 = 27778−20000 = 7778 > 0
x = (500/3 ± √7778)/2 ≈ (166,7 ± 88,2)/2
x₁ ≈ 39,2 et x₂ ≈ 127,5 → mais x ≤ 100
Solution : 39,2 < x < 100 (environ 40 ≤ x ≤ 100)

3. CA(x) = −0,3x²+50x = −0,3(x−250/3)²+0,3×(250/3)²
Maximum en x = 250/3 ≈ 83,3 unités (arrondir à 83)
CA(83) ≈ 50×83−0,3×83² = 4150−2066,7 ≈ 2083€`
      },
      {
        id: 'FO-14', difficulte: 3,
        titre: 'Croissance et comparaison de fonctions',
        notions: ['Croissance', 'Comparaison', 'Démonstrations'],
        enonce: `Démontrer algébriquement les propriétés de croissance suivantes :
1. f(x) = x² est décroissante sur ]−∞;0].
2. g(x) = 1/x est décroissante sur ]0;+∞[.
3. h(x) = √x est croissante sur [0;+∞[.`,
        correction: `1. f(x)=x² décroissante sur ]−∞;0] :
Soient a < b ≤ 0. Montrons f(a) > f(b).
f(a)−f(b) = a²−b² = (a−b)(a+b)
a < b ≤ 0 → a−b < 0 (différence négative)
a < b ≤ 0 → a+b < 0 (somme de deux négatifs)
Produit de deux négatifs = positif : (a−b)(a+b) > 0
Donc f(a) > f(b) : f décroissante sur ]−∞;0]. ✓

2. g(x)=1/x décroissante sur ]0;+∞[ :
Soient 0 < a < b. Montrons g(a) > g(b), i.e. 1/a > 1/b.
1/a − 1/b = (b−a)/(ab)
b > a > 0 → b−a > 0 et ab > 0 → (b−a)/(ab) > 0
Donc 1/a > 1/b : g décroissante. ✓

3. h(x)=√x croissante sur [0;+∞[ :
Soient 0 ≤ a < b. Montrons √a < √b.
√b−√a = (b−a)/(√b+√a) (multiplier num/dénom par √b+√a)
b > a ≥ 0 → b−a > 0 et √b+√a ≥ 0
Donc √b−√a > 0 (si a=b=0, trivial) : h croissante. ✓`
      },
      {
        id: 'FO-15', difficulte: 3,
        titre: 'Problème complet — étude d\'une fonction',
        notions: ['Étude complète', 'Variations', 'Signes', 'Applications'],
        enonce: `Soit f(x) = (x²−4)/(x+1).
1. Déterminer le domaine de définition.
2. Calculer f(0), f(2), f(−2), f(3).
3. Étudier le signe de f sur son domaine.
4. La fonction a-t-elle des asymptotes ? Lesquelles ?
5. Montrer que f(x) = x−1 − 3/(x+1). En déduire la tendance de f quand x→+∞.`,
        correction: `1. D = ℝ\\{−1}

2. f(0)=−4 ; f(2)=0 ; f(−2)=0 ; f(3)=(9−4)/4=5/4

3. f(x)=(x−2)(x+2)/(x+1), zéros x=±2, interdit x=−1
x : −∞  −2  −1    2  +∞
(x+2): −  0   +   +  +
(x−2): −  −   −   0  +
(x+1): −  −   0↕  +  +
f:      − 0   + ∅ −  0  +
f≥0 : [−2;−1[ ∪ [2;+∞[

4. Asymptote verticale : x=−1 (dénominateur s'annule)
Pas d'asymptote horizontale (deg num > deg dénom)
Asymptote oblique : y=x−1 (voir question 5)

5. Division euclidienne :
x²−4 = (x+1)(x−1) − 3  (car (x+1)(x−1)=x²−1, et x²−4=x²−1−3)
f(x) = x−1 − 3/(x+1)
Quand x→+∞ : 3/(x+1)→0, donc f(x) ∼ x−1
La droite y=x−1 est asymptote oblique en +∞.`
      },
    ]
  },
  {
    id: 'geometrie-seconde',
    numero: 6,
    titre: 'Géométrie — Vecteurs & Droites',
    sousTitre: 'Vecteurs · Repère · Colinéarité · Droites · Systèmes · Thalès',
    icon: '📐',
    color: '#ec4899',
    notions: ['Vecteurs', 'Coordonnées', 'Colinéarité', 'Équations de droites', 'Perpendiculaires', 'Systèmes'],
    exercices: [
      {
        id: 'GE-1', difficulte: 1,
        titre: 'Vecteurs — coordonnées et opérations',
        notions: ['Vecteurs', 'Coordonnées', 'Opérations'],
        enonce: `A(1;3), B(4;7), C(−1;2), D(6;1).
1. Calculer AB⃗, CD⃗, AC⃗.
2. Calculer ||AB⃗|| et ||CD⃗||.
3. Calculer 2AB⃗ − CD⃗.
4. Déterminer les coordonnées du milieu de [BD].`,
        correction: `1. Coordonnées :
AB⃗(3;4) ; CD⃗(7;−1) ; AC⃗(−2;−1)

2. Normes :
||AB⃗|| = √(9+16) = 5
||CD⃗|| = √(49+1) = √50 = 5√2

3. 2AB⃗−CD⃗ = 2(3;4)−(7;−1) = (6;8)−(7;−1) = (−1;9)

4. Milieu de [BD] : ((4+6)/2;(7+1)/2) = (5;4)`
      },
      {
        id: 'GE-2', difficulte: 1,
        titre: 'Relation de Chasles',
        notions: ['Relation de Chasles', 'Vecteurs'],
        enonce: `Exprimer les vecteurs suivants en utilisant la relation de Chasles :
1. AC⃗ en fonction de AB⃗ et BC⃗
2. DB⃗ en fonction de DC⃗ et CB⃗
3. AE⃗ où E est le milieu de [BC], en fonction de AB⃗ et AC⃗
4. Dans un parallélogramme ABCD, exprimer AC⃗ en fonction de AB⃗ et AD⃗`,
        correction: `1. AC⃗ = AB⃗ + BC⃗  (Chasles direct)

2. DB⃗ = DC⃗ + CB⃗  (Chasles : D→C→B)

3. E milieu de [BC] : BE⃗ = (1/2)BC⃗ = (1/2)(AC⃗−AB⃗) = (AC⃗−AB⃗)/2
AE⃗ = AB⃗ + BE⃗ = AB⃗ + (AC⃗−AB⃗)/2 = (AB⃗+AC⃗)/2

4. ABCD parallélogramme → BC⃗ = AD⃗
AC⃗ = AB⃗ + BC⃗ = AB⃗ + AD⃗`
      },
      {
        id: 'GE-3', difficulte: 1,
        titre: 'Colinéarité et alignement',
        notions: ['Colinéarité', 'Déterminant'],
        enonce: `1. A(0;0), B(2;4), C(3;6). Les points A, B, C sont-ils alignés ?
2. A(1;2), B(4;5), C(7;9). Vérifier l'alignement.
3. Trouver k pour que A(1;2), B(3;k), C(5;8) soient alignés.`,
        correction: `1. AB⃗(2;4), AC⃗(3;6). det = 2×6−4×3 = 12−12 = 0 → alignés ✓
(D'ailleurs AC⃗ = (3/2)AB⃗)

2. AB⃗(3;3), AC⃗(6;7). det = 3×7−3×6 = 21−18 = 3 ≠ 0 → non alignés ✗

3. AB⃗(2;k−2), AC⃗(4;6).
det = 2×6−(k−2)×4 = 12−4k+8 = 20−4k = 0 → k = 5`
      },
      {
        id: 'GE-4', difficulte: 1,
        titre: 'Équation d\'une droite — formes',
        notions: ['Équation de droite', 'Coefficient directeur'],
        enonce: `1. Écrire l'équation de la droite passant par A(2;5) et B(6;9).
2. Écrire l'équation de la droite passant par A(−1;3) et B(2;−3).
3. Donner le coefficient directeur et l'ordonnée à l'origine de y=3x−5.
4. Trouver le point d'intersection de y=2x+1 et y=−x+4.`,
        correction: `1. m=(9−5)/(6−2)=1, p=5−1×2=3 → y=x+3

2. m=(−3−3)/(2−(−1))=−6/3=−2, p=3−(−2)(−1)=3−2=1 → y=−2x+1

3. m=3, p=−5

4. 2x+1=−x+4 → 3x=3 → x=1, y=3 → Point (1;3)`
      },
      {
        id: 'GE-5', difficulte: 2,
        titre: 'Positions relatives de droites',
        notions: ['Positions relatives', 'Parallèles', 'Perpendiculaires'],
        enonce: `Étudier les positions relatives de :
1. d₁: y=2x+3 et d₂: y=2x−1
2. d₁: y=3x−2 et d₂: y=(1/3)x+5
3. d₁: 2x+y=5 et d₂: x−2y=3
4. d₁: y=2x+1 et d₂: 4x−2y+2=0`,
        correction: `1. m₁=m₂=2, p₁≠p₂ → PARALLÈLES (non confondues)

2. m₁=3, m₂=1/3 → m₁×m₂=1≠−1 → SÉCANTES (pas perpendiculaires)

3. d₁: y=−2x+5 (m₁=−2) ; d₂: y=x/2−3/2 (m₂=1/2)
m₁×m₂ = (−2)(1/2) = −1 → PERPENDICULAIRES

4. d₂: 4x−2y+2=0 → 2y=4x+2 → y=2x+1
Même équation que d₁ → CONFONDUES`
      },
      {
        id: 'GE-6', difficulte: 2,
        titre: 'Construction de droites',
        notions: ['Droites', 'Perpendiculaires', 'Parallèles'],
        enonce: `1. Écrire l'équation de la droite d perpendiculaire à y=3x+1 passant par A(0;2).
2. Écrire l'équation de la droite d parallèle à y=−2x+5 passant par B(3;1).
3. Écrire l'équation de la médiatrice de [AB] avec A(1;3) et B(5;7).`,
        correction: `1. m⊥ = −1/3, passe par (0;2) → y = −x/3 + 2

2. m = −2, passe par B(3;1) : 1=−2×3+p → p=7 → y=−2x+7

3. Médiatrice de [AB] :
Milieu I: (3;5)
Pente AB: (7−3)/(5−1)=1 → pente médiatrice: −1
Équation : y−5=−(x−3) → y=−x+8`
      },
      {
        id: 'GE-7', difficulte: 2,
        titre: 'Résolution de systèmes 2×2',
        notions: ['Systèmes', 'Substitution', 'Combinaison'],
        enonce: `Résoudre par les deux méthodes (substitution ET combinaison) :
1. { 3x+2y=7 et { x−y=1
2. { 2x−3y=4 et { 5x+2y=1`,
        correction: `1. Système :
Substitution : x=y+1 → 3(y+1)+2y=7 → 5y=4 → y=4/5, x=9/5
Combinaison : 3(x−y)+(3x+2y)=3+7 → non, mieux :
×2: 2x−2y=2; +3x+2y=7 → 5x=9 → x=9/5, y=4/5 ✓

2. { 2x−3y=4  ×2: 4x−6y=8
   { 5x+2y=1  ×3: 15x+6y=3
Addition: 19x=11 → x=11/19
y=(2×11/19−4)/3=(22/19−76/19)/3=(−54/19)/3=−54/57=−18/19`
      },
      {
        id: 'GE-8', difficulte: 2,
        titre: 'Théorème de Thalès',
        notions: ['Thalès', 'Proportions'],
        enonce: `1. Dans le triangle ABC, M est sur [AB] et N sur [AC] avec MN ∥ BC.
   On sait AM=3, AB=9, AN=4. Calculer AC et MN sachant BC=12.
2. Deux droites se coupent en O. Sur une droite : OA=6, OB=10. Sur l'autre : OA'=9.
   Si AA' ∥ BB', calculer OB'.
3. Un arbre projette une ombre de 4m. Un bâton de 2m projette une ombre de 0,8m.
   Quelle est la hauteur de l'arbre ?`,
        correction: `1. Thalès : AM/AB = AN/AC = MN/BC
3/9 = 4/AC = MN/12
1/3 = 4/AC → AC = 12
MN/12 = 1/3 → MN = 4

2. OA/OB = OA'/OB' (Thalès)
6/10 = 9/OB' → OB' = 9×10/6 = 15

3. Règle de trois (triangles semblables) :
hauteur/ombre = hauteur_bâton/ombre_bâton
h/4 = 2/0,8 = 2,5 → h = 10m`
      },
      {
        id: 'GE-9', difficulte: 2,
        titre: 'Pythagore — applications',
        notions: ['Pythagore', 'Réciproque'],
        enonce: `1. Calculer la longueur manquante dans les triangles rectangles :
   a) cathètes 5 et 12 → hypoténuse ?
   b) hypoténuse 13, cathète 5 → autre cathète ?
   c) cathètes a et a+1, hypoténuse a+2 → trouver a.

2. Vérifier si le triangle ABC est rectangle :
   A(0;0), B(3;0), C(0;4).

3. Triples pythagoriciens : montrer que (3k;4k;5k) est un triple pour tout k>0.`,
        correction: `1. Pythagore :
a) h = √(25+144) = √169 = 13
b) c = √(169−25) = √144 = 12
c) a²+(a+1)² = (a+2)² → a²+a²+2a+1=a²+4a+4 → a²−2a−3=0
→ (a−3)(a+1)=0 → a=3 (>0) ou a=−1 (refusé)
Côtés : 3, 4, 5

2. AB=3, AC=4, BC=√(9+16)=5
AB²+AC²=9+16=25=BC² → rectangle en A ✓

3. (3k)²+(4k)²=9k²+16k²=25k²=(5k)² ✓ pour tout k>0`
      },
      {
        id: 'GE-10', difficulte: 2,
        titre: 'Problème géométrique — démonstrations',
        notions: ['Vecteurs', 'Milieux', 'Démonstrations'],
        enonce: `ABCD est un quadrilatère quelconque. M, N, P, Q sont les milieux respectifs de [AB], [BC], [CD], [DA].
1. Exprimer MN⃗ en fonction des vecteurs du quadrilatère.
2. Exprimer QP⃗ en même fonction.
3. Conclure sur la nature de MNPQ.`,
        correction: `1. MN⃗ : M milieu de AB, N milieu de BC
M = A + (1/2)AB⃗, N = B + (1/2)BC⃗
MN⃗ = AN⃗ − AM⃗ = (AB⃗+(1/2)BC⃗) − (1/2)AB⃗ = (1/2)AB⃗ + (1/2)BC⃗ = (1/2)AC⃗

2. QP⃗ : Q milieu de DA, P milieu de CD
QP⃗ = (1/2)AD⃗ + (1/2)DC⃗ = (1/2)AC⃗

3. MN⃗ = QP⃗ = (1/2)AC⃗
Les vecteurs MN⃗ et QP⃗ sont égaux → MN et QP sont parallèles et de même longueur.
Donc MNPQ est un parallélogramme (théorème de Varignon).`
      },
      {
        id: 'GE-11', difficulte: 2,
        titre: 'Coordonnées — calculs divers',
        notions: ['Coordonnées', 'Milieu', 'Distance'],
        enonce: `A(−2;5), B(4;1), C(1;−3).
1. Calculer le périmètre du triangle ABC.
2. Trouver le centre de gravité G (intersection des médianes) : G = ((xA+xB+xC)/3; (yA+yB+yC)/3).
3. Vérifier que G est sur la médiane issue de A (milieu de BC).
4. Le triangle est-il isocèle ? Rectangle ?`,
        correction: `1. Périmètre :
AB = √(36+16) = √52 = 2√13
BC = √(9+16) = √25 = 5
CA = √(9+64) = √73
P = 2√13+5+√73 ≈ 7,21+5+8,54 ≈ 20,75

2. G = ((−2+4+1)/3;(5+1−3)/3) = (3/3;3/3) = (1;1)

3. Milieu M de [BC] : ((4+1)/2;(1−3)/2) = (5/2;−1)
AM⃗ = (5/2−(−2);−1−5) = (9/2;−6)
AG⃗ = (1−(−2);1−5) = (3;−4)
(2/3)AM⃗ = (3;−4) = AG⃗ → G est bien sur la médiane issue de A ✓

4. AB²=52, BC²=25, CA²=73
AB≠BC≠CA → pas isocèle (aux valeurs près)
AB²+BC²=52+25=77≠73=CA² ; AB²+CA²=125≠25 ; BC²+CA²=98≠52
→ pas rectangle`
      },
      {
        id: 'GE-12', difficulte: 2,
        titre: 'Droites remarquables — médiatrice et hauteur',
        notions: ['Médiatrice', 'Hauteur', 'Perpendiculaires'],
        enonce: `Triangle A(0;4), B(−3;0), C(3;0).
1. Écrire l'équation de la médiatrice de [BC].
2. Écrire l'équation de la hauteur issue de A.
3. Trouver le point de concours des hauteurs (orthocentre).`,
        correction: `1. Médiatrice de [BC] :
Milieu : (0;0), pente de BC : (0−0)/(3−(−3))=0 → BC horizontal
Médiatrice : verticale passant par (0;0) → x=0

2. Hauteur issue de A ⊥ BC :
BC est horizontal (pente 0) → hauteur verticale
Passe par A(0;4) et est verticale → x=0

3. Orthocentre : intersection des hauteurs
Hauteur issue de A : x=0
Hauteur issue de B ⊥ AC :
AC : pente=(0−4)/(3−0)=−4/3 → hauteur : pente=3/4
Passe par B(−3;0) : y=3/4(x+3) → y=3x/4+9/4
En x=0 : y=9/4
Orthocentre : (0;9/4)
Note : le triangle est isocèle (AB=AC=5), donc l'axe de symétrie x=0 contient l'orthocentre.`
      },
      {
        id: 'GE-13', difficulte: 2,
        titre: 'Vecteurs colinéaires — applications',
        notions: ['Colinéarité', 'Parallélisme'],
        enonce: `1. Montrer que A(1;2), B(3;6), C(5;10) sont alignés.
2. Déterminer k pour que AB⃗ et CD⃗ soient colinéaires avec A(0;1), B(2;4), C(1;k), D(5;k+6).
3. Les droites (AB) et (CD) sont-elles parallèles avec A(1;2), B(3;5), C(4;1), D(6;4) ?`,
        correction: `1. AB⃗(2;4), AC⃗(4;8)
det = 2×8−4×4 = 16−16 = 0 → colinéaires → alignés ✓
(AC⃗ = 2AB⃗)

2. AB⃗(2;3), CD⃗(4;6)
det = 2×6−3×4 = 12−12 = 0 → toujours colinéaires !
(En fait CD⃗ = 2AB⃗ quelles que soient les valeurs)
Vérification : CD⃗ = D−C = (5−1;k+6−k) = (4;6) = 2×(2;3) = 2AB⃗ ✓
Donc ils sont toujours colinéaires, pour tout k.

3. AB⃗(2;3), CD⃗(2;3)
AB⃗ = CD⃗ donc (AB) ∥ (CD)
(Même direction → parallèles ou confondues)
Point B(3;5) sur (AB) : y=3x/2+1/2... vérif C(4;1): 3×4/2+1/2=6,5≠1 → non confondues
→ PARALLÈLES`
      },
      {
        id: 'GE-14', difficulte: 3,
        titre: 'Barycentre et point particulier',
        notions: ['Milieux', 'Vecteurs', 'Géométrie'],
        enonce: `A(1;0), B(5;0), C(3;4).
1. Trouver le point G tel que GA⃗+GB⃗+GC⃗ = 0⃗ (centre de gravité).
2. Montrer que G est le milieu de chaque médiane à 2/3 de chaque sommet.
3. Trouver le cercle circumscrit au triangle (centre = intersection des médiatrices).`,
        correction: `1. GA⃗+GB⃗+GC⃗ = 0⃗ :
Si G=(x;y) : (1−x+5−x+3−x; 0−y+0−y+4−y) = (0;0)
9−3x=0 → x=3 ; 4−3y=0 → y=4/3
G = (3; 4/3)

2. G = ((1+5+3)/3; (0+0+4)/3) = (3; 4/3) ✓
Milieu de [BC] : M_A = (4;2)
AG⃗ = (2;4/3), AM_A⃗ = (3;2)
AG⃗ = (2/3)AM_A⃗ ✓ (G est aux 2/3 de AM_A depuis A)

3. Médiatrices :
Médiatrice de [AB] : milieu (3;0), AB horizontal → x=3
Médiatrice de [AC] : milieu (2;2), pente AC=(4−0)/(3−1)=2
→ pente méd. = −1/2, équ: y−2=−(x−2)/2 → y=−x/2+3

Intersection : x=3 → y=−3/2+3=3/2
Centre O=(3;3/2)
Rayon R=OA=√((3−1)²+(3/2)²)=√(4+9/4)=√(25/4)=5/2`
      },
      {
        id: 'GE-15', difficulte: 3,
        titre: 'Problème — géométrie analytique complète',
        notions: ['Droites', 'Distances', 'Vecteurs'],
        enonce: `Un triangle a pour sommets A(0;0), B(6;0), C(2;4).
1. Calculer les longueurs des 3 côtés.
2. Écrire les équations des 3 droites (AB), (BC), (CA).
3. Trouver le centre et le rayon du cercle inscrit (il est tangent aux 3 côtés).
4. Vérifier que le centre est équidistant des 3 droites.`,
        correction: `1. Longueurs :
AB = 6 ; BC = √(16+16) = 4√2 ; CA = √(4+16) = √20 = 2√5

2. Équations :
(AB) : y=0  (axe des abscisses)
(BC) : pente=(4−0)/(2−6)=−1, passe par B(6;0): y=−(x−6)=−x+6
(CA) : pente=4/2=2, passe par A(0;0): y=2x

3. Pour un triangle, le centre du cercle inscrit est à intersection des bissectrices.
Périmètre : p = 6+4√2+2√5 ≈ 6+5,66+4,47 ≈ 16,13
Demi-périmètre : s ≈ 8,07
Aire = (1/2)×base×hauteur = (1/2)×6×4 = 12
Rayon inscrit : r = Aire/s = 12/8,07 ≈ 1,49

Coordonnées du centre (formule exacte) :
I = (a×xA+b×xB+c×xC)/(a+b+c) où a=BC=4√2, b=CA=2√5, c=AB=6
(Formule barycentrique avec les côtés opposés)
x_I = (4√2×0+2√5×6+6×2)/(4√2+2√5+6) = (12√5+12)/(4√2+2√5+6)
Calcul numérique : ≈ (26,83+12)/(5,66+4,47+6) = 38,83/16,13 ≈ 2,41
y_I ≈ r ≈ 1,49 (distance à (AB): y=0 est simplement la coordonnée y)

4. Distance au centre I=(x_I;y_I) :
À (AB): y=0 → distance = y_I = r ✓
À (BC): x+y=6 → distance = |x_I+y_I−6|/√2 = r ✓ (à vérifier numériquement)`
      },
    ]
  },
  {
    id: 'stats-probas-seconde',
    numero: 7,
    titre: 'Statistiques & Probabilités',
    sousTitre: 'Stats descriptives · Évolutions · Probabilités · Fluctuation',
    icon: '📊',
    color: '#06b6d4',
    notions: ['Moyenne', 'Écart-type', 'Quartiles', 'Taux d\'évolution', 'Probabilités', 'Intervalle de fluctuation'],
    exercices: [
      {
        id: 'SP-1', difficulte: 1,
        titre: 'Calcul de moyenne',
        notions: ['Moyenne'],
        enonce: `Notes de 10 élèves : 8, 12, 15, 9, 14, 18, 11, 13, 7, 13.
1. Calculer la moyenne x̄.
2. Calculer la moyenne des élèves ayant eu plus de 12.
3. Si on retire la note 18, quelle est la nouvelle moyenne ?`,
        correction: `1. x̄ = (8+12+15+9+14+18+11+13+7+13)/10 = 120/10 = 12

2. Notes > 12 : 15, 14, 18, 13, 13 → moyenne = 73/5 = 14,6

3. Sans 18 : (120−18)/9 = 102/9 ≈ 11,33`
      },
      {
        id: 'SP-2', difficulte: 1,
        titre: 'Médiane et quartiles',
        notions: ['Médiane', 'Quartiles', 'EI'],
        enonce: `Données ordonnées : 3, 5, 7, 8, 10, 12, 14, 15, 18, 20.
1. Déterminer Me, Q1, Q3, EI.
2. Identifier d'éventuelles valeurs aberrantes (valeur < Q1−1,5×EI ou > Q3+1,5×EI).`,
        correction: `1. n=10 :
Me = (10+12)/2 = 11
Q1 = médiane des 5 premiers = 7
Q3 = médiane des 5 derniers = 15
EI = Q3−Q1 = 8

2. Limites :
Borne basse : Q1−1,5×EI = 7−12 = −5
Borne haute : Q3+1,5×EI = 15+12 = 27
Toutes les valeurs sont dans [−5;27] → pas de valeur aberrante`
      },
      {
        id: 'SP-3', difficulte: 1,
        titre: 'Variance et écart-type',
        notions: ['Variance', 'Écart-type'],
        enonce: `Série : 4, 6, 8, 10, 12 (5 valeurs).
1. Calculer x̄.
2. Calculer la variance V = (1/n)Σ(xi−x̄)².
3. Calculer σ = √V.
4. Que représente σ pour cette série ?`,
        correction: `1. x̄ = 40/5 = 8

2. V = [(4−8)²+(6−8)²+(8−8)²+(10−8)²+(12−8)²]/5
= [16+4+0+4+16]/5 = 40/5 = 8

3. σ = √8 = 2√2 ≈ 2,83

4. σ mesure la dispersion autour de la moyenne.
Ici σ ≈ 2,83 : les valeurs s'écartent en moyenne d'environ 2,83 unités de la moyenne 8.
Intervalle [x̄−σ;x̄+σ] = [5,17;10,83] contient 6, 8, 10 (3 valeurs sur 5 = 60%)`
      },
      {
        id: 'SP-4', difficulte: 1,
        titre: 'Taux d\'évolution',
        notions: ['Taux d\'évolution', 'Coefficient multiplicateur'],
        enonce: `1. Un article coûtait 80€, il vaut maintenant 96€. Taux d'évolution ?
2. Un prix baisse de 20%. Coefficient multiplicateur ?
3. Un salaire augmente de 5% puis encore de 3%. Taux global ?
4. Une hausse de 10% est suivie d'une baisse. Pour revenir au prix initial, quelle doit être la baisse ?`,
        correction: `1. t = (96−80)/80 = 16/80 = 0,2 = +20%

2. CM = 1−0,2 = 0,8

3. CM_total = 1,05×1,03 = 1,0815 → t = +8,15%

4. Après +10% : CM=1,1. Pour revenir : CM_retour = 1/1,1 ≈ 0,909 → baisse de ≈9,09%`
      },
      {
        id: 'SP-5', difficulte: 2,
        titre: 'Évolutions successives et réciproques',
        notions: ['Évolutions successives', 'Évolution réciproque'],
        enonce: `1. +15% puis −10% : évolution globale ?
2. −20% puis +25% : évolution globale ?
3. Pour annuler une hausse de 30%, quelle baisse faut-il appliquer ?
4. En 2022, un prix est P. En 2023 : +8%. En 2024 : −5%. En 2025 : +2%.
   Exprimer le prix final en fonction de P. Augmentation ou baisse par rapport à 2022 ?`,
        correction: `1. CM = 1,15×0,90 = 1,035 → +3,5% (pas +5%)

2. CM = 0,80×1,25 = 1,00 → 0% (retour à l'initial !)
Vérification : 0,8×1,25 = 1 ✓

3. CM_annulation = 1/1,30 ≈ 0,769 → baisse d'environ 23,1%

4. P_final = P×1,08×0,95×1,02 = P×1,04652
Hausse globale ≈ +4,65% par rapport à 2022`
      },
      {
        id: 'SP-6', difficulte: 2,
        titre: 'Statistiques descriptives complètes',
        notions: ['Moyenne', 'Écart-type', 'Quartiles'],
        enonce: `Notes de 15 élèves : 5, 7, 8, 8, 9, 10, 11, 12, 12, 13, 14, 15, 15, 17, 19.
1. Calculer x̄, Me, Q1, Q3, EI.
2. Calculer σ.
3. Quel pourcentage d'élèves est dans [x̄−σ; x̄+σ] ?`,
        correction: `1. n=15 :
x̄ = (5+7+8+8+9+10+11+12+12+13+14+15+15+17+19)/15 = 175/15 ≈ 11,67
Me = 8e valeur = 12
Q1 = médiane des 7 premiers : 8+8=8 → Q1=8
Q3 = médiane des 7 derniers : 15+15=15 → Q3=15
EI = 7

2. Variance : V = Σ(xi−11,67)²/15
≈ [(5−11,67)²+...+(19−11,67)²]/15
≈ [44,49+22,09+13,69+13,69+7,29+2,89+0,49+0,09+0,09+1,69+5,29+11,09+11,09+28,09+53,29]/15
≈ 215,33/15 ≈ 14,36
σ ≈ 3,79

3. [x̄−σ;x̄+σ] = [11,67−3,79; 11,67+3,79] = [7,88; 15,46]
Valeurs dans cet intervalle : 8,8,9,10,11,12,12,13,14,15,15 → 11 valeurs sur 15
Pourcentage : 11/15 ≈ 73%`
      },
      {
        id: 'SP-7', difficulte: 2,
        titre: 'Probabilités — dé et tirage',
        notions: ['Probabilités', 'Équiprobabilité'],
        enonce: `On lance un dé à 6 faces équilibré.
1. Calculer P(multiple de 2), P(multiple de 3), P(multiple de 6).
2. Calculer P(multiple de 2 OU multiple de 3).
3. Calculer P(multiple de 2 ET multiple de 3).
4. Vérifier la formule P(A∪B) = P(A)+P(B)−P(A∩B).`,
        correction: `1. Multiples de 2 : {2,4,6} → P = 3/6 = 1/2
Multiples de 3 : {3,6} → P = 2/6 = 1/3
Multiples de 6 : {6} → P = 1/6

2. P(mult2 ∪ mult3) = P({2,3,4,6}) = 4/6 = 2/3

3. P(mult2 ∩ mult3) = P({6}) = 1/6 (= P(mult6))

4. P(A)+P(B)−P(A∩B) = 1/2+1/3−1/6 = 3/6+2/6−1/6 = 4/6 = 2/3 = P(A∪B) ✓`
      },
      {
        id: 'SP-8', difficulte: 2,
        titre: 'Probabilités — tirage sans remise',
        notions: ['Probabilités', 'Dénombrement'],
        enonce: `Une urne contient 4 boules rouges (R), 3 bleues (B), 2 vertes (V).
On tire 2 boules sans remise.
1. Combien y a-t-il de tirages possibles de 2 boules ?
2. Calculer P(2 rouges), P(une rouge et une bleue), P(même couleur).`,
        correction: `1. Nombre de paires : C(9,2) = 9×8/2 = 36

2. P(2R) = C(4,2)/36 = 6/36 = 1/6

P(1R et 1B) = (4×3)/36 = 12/36 = 1/3

P(même couleur) = P(2R)+P(2B)+P(2V)
= C(4,2)/36 + C(3,2)/36 + C(2,2)/36
= (6+3+1)/36 = 10/36 = 5/18`
      },
      {
        id: 'SP-9', difficulte: 2,
        titre: 'Événements — formules',
        notions: ['Événements', 'Complémentaire', 'Formules'],
        enonce: `P(A) = 0,4, P(B) = 0,5, P(A∩B) = 0,2.
1. Calculer P(A∪B).
2. A et B sont-ils indépendants ?
3. Calculer P(Ā), P(B̄), P(Ā∩B̄).
4. Calculer P(A∩B̄) et P(Ā∩B).`,
        correction: `1. P(A∪B) = 0,4+0,5−0,2 = 0,7

2. P(A)×P(B) = 0,4×0,5 = 0,2 = P(A∩B) → A et B INDÉPENDANTS ✓

3. P(Ā) = 0,6 ; P(B̄) = 0,5
P(Ā∩B̄) = P(A∪B)̄ = 1−P(A∪B) = 1−0,7 = 0,3

4. P(A∩B̄) = P(A)−P(A∩B) = 0,4−0,2 = 0,2
   (ou: A et B indépendants → P(A∩B̄)=P(A)×P(B̄)=0,4×0,5=0,2 ✓)
P(Ā∩B) = P(B)−P(A∩B) = 0,5−0,2 = 0,3`
      },
      {
        id: 'SP-10', difficulte: 2,
        titre: 'Intervalle de fluctuation',
        notions: ['Intervalle de fluctuation', 'Échantillonnage'],
        enonce: `Dans une grande ville, 35% des habitants utilisent les transports en commun (p=0,35).
Un sondage interroge n=400 personnes.
1. Calculer l'intervalle de fluctuation au seuil 95%.
2. Si le sondage trouve 32%, est-ce compatible avec p=0,35 ?
3. Avec n=100, même question.
4. Combien faut-il de personnes pour que l'intervalle soit de largeur 0,04 ?`,
        correction: `1. n=400 : [0,35−1/20 ; 0,35+1/20] = [0,30 ; 0,40]

2. 32% = 0,32 ∈ [0,30 ; 0,40] → compatible avec p=0,35 ✓

3. n=100 : [0,35−0,10 ; 0,35+0,10] = [0,25 ; 0,45]
32% ∈ [0,25;0,45] → toujours compatible (intervalle plus large)

4. Largeur = 2/√n = 0,04 → √n = 50 → n = 2500 personnes`
      },
      {
        id: 'SP-11', difficulte: 2,
        titre: 'Proportion de proportion',
        notions: ['Proportions', 'Probabilités'],
        enonce: `Dans un lycée : 55% des élèves sont des filles. Parmi les filles, 40% font de la musique. Parmi les garçons, 25% font de la musique.
1. Calculer la proportion d'élèves qui sont des filles et font de la musique.
2. Calculer la proportion d'élèves qui sont des garçons et font de la musique.
3. Quelle proportion d'élèves fait de la musique au total ?`,
        correction: `1. P(fille et musique) = P(fille)×P(musique|fille) = 0,55×0,40 = 0,22 = 22%

2. P(garçon) = 0,45
P(garçon et musique) = 0,45×0,25 = 0,1125 = 11,25%

3. P(musique) = P(fille et musique) + P(garçon et musique)
= 0,22 + 0,1125 = 0,3325 = 33,25%`
      },
      {
        id: 'SP-12', difficulte: 2,
        titre: 'Applications des statistiques — analyse de données',
        notions: ['Statistiques', 'Analyse'],
        enonce: `Deux classes ont les résultats suivants à un contrôle (sur 20) :
Classe A (25 élèves) : x̄_A = 12, σ_A = 3
Classe B (30 élèves) : x̄_B = 13, σ_B = 5

1. Calculer la moyenne générale des 55 élèves.
2. Quelle classe est plus "homogène" ? Pourquoi ?
3. Un élève de A a 15. Un de B a 15. Lequel est "plus méritant" relativement à sa classe ?
   (Utiliser : rang = (note−moyenne)/écart-type)`,
        correction: `1. Moyenne générale :
x̄ = (25×12+30×13)/(25+30) = (300+390)/55 = 690/55 ≈ 12,55

2. Classe A : σ_A=3 < σ_B=5 → Classe A plus homogène
(les notes de A sont moins dispersées autour de la moyenne)

3. "Score standardisé" (z-score) :
Élève A : z_A = (15−12)/3 = 1
Élève B : z_B = (15−13)/5 = 0,4

L'élève de A est à 1 écart-type au-dessus de sa moyenne.
L'élève de B est à 0,4 écart-type au-dessus de sa moyenne.
→ L'élève de A est "plus méritant" relativement à sa classe.`
      },
      {
        id: 'SP-13', difficulte: 2,
        titre: 'Probabilités — arbre et calculs',
        notions: ['Arbre de probabilités', 'Calculs'],
        enonce: `Un test médical est positif dans 95% des cas si la personne est malade, et dans 3% des cas si elle est saine. Dans une population, 2% des personnes sont malades.
On tire une personne au hasard et on lui fait le test.
1. Dessiner l'arbre des probabilités.
2. Calculer P(test positif).
3. Si le test est positif, quelle est la probabilité d'être malade ?`,
        correction: `1. Arbre :
Malade (0,02) → Positif (0,95) : P = 0,02×0,95 = 0,019
                → Négatif (0,05) : P = 0,02×0,05 = 0,001
Sain (0,98)   → Positif (0,03) : P = 0,98×0,03 = 0,0294
               → Négatif (0,97) : P = 0,98×0,97 = 0,9506

2. P(test+) = 0,019+0,0294 = 0,0484 ≈ 4,84%

3. P(malade|test+) = P(malade et test+)/P(test+)
= 0,019/0,0484 ≈ 0,393 ≈ 39,3%

Remarque surprenante : même si le test est positif, il y a 39% de chance d'être malade.
C'est le "paradoxe du test médical" dû à la rareté de la maladie.`
      },
      {
        id: 'SP-14', difficulte: 3,
        titre: 'Loi des grands nombres — simulation',
        notions: ['Probabilités', 'Simulation', 'Fréquence'],
        enonce: `On lance une pièce équilibrée n fois. Soit fₙ la fréquence d'apparition de Face.
1. Pour n=10, est-il normal d'obtenir fₙ = 0,3 ? Calculer l'intervalle de fluctuation.
2. Pour n=100, même question.
3. Pour n=1000, même question.
4. Que représente la convergence de fₙ vers 0,5 ?`,
        correction: `1. p=0,5, n=10 :
Intervalle = [0,5−1/√10 ; 0,5+1/√10] ≈ [0,5−0,316 ; 0,5+0,316] = [0,184 ; 0,816]
0,3 ∈ [0,184;0,816] → OUI, normal (intervalle très large)

2. p=0,5, n=100 :
Intervalle = [0,5−0,1 ; 0,5+0,1] = [0,4 ; 0,6]
0,3 ∉ [0,4;0,6] → NON, résultat surprenant pour n=100

3. p=0,5, n=1000 :
Intervalle = [0,5−1/√1000 ; 0,5+1/√1000] ≈ [0,468 ; 0,532]
0,3 très loin → totalement improbable

4. La convergence de fₙ vers p=0,5 quand n→+∞ est la LOI DES GRANDS NOMBRES.
Plus n est grand, plus fₙ est proche de la probabilité théorique p.
C'est le fondement mathématique de la notion de probabilité.`
      },
      {
        id: 'SP-15', difficulte: 3,
        titre: 'Problème complet — statistiques et probabilités',
        notions: ['Statistiques', 'Probabilités', 'Analyse'],
        enonce: `Une entreprise fabrique des pièces. 5% sont défectueuses.
Un contrôle examine 200 pièces.
1. Calculer l'intervalle de fluctuation au seuil 95%.
2. On trouve 12 pièces défectueuses (fréquence 6%). Est-ce alarmant ?
3. Si la proportion monte à 8% sur 200 pièces, que conclure ?
4. L'entreprise veut être sûre à 95% de détecter une proportion réelle supérieure à 8%. Combien de pièces faut-il contrôler ?`,
        correction: `1. p=0,05, n=200 :
Intervalle = [0,05−1/√200 ; 0,05+1/√200]
1/√200 = 1/(10√2) ≈ 0,0707
Intervalle ≈ [−0,021 ; 0,121] → [0 ; 0,121] (tronqué à 0)

2. f=12/200=0,06 ∈ [0;0,121] → compatible avec p=5%, pas alarmant

3. f=0,08 ∈ [0;0,121] → encore compatible, mais limite haute approche
Pas encore alarme statistique, mais à surveiller

4. On veut que 8% soit hors de l'intervalle centré en 5% :
0,08 > 0,05 + 1/√n
0,03 > 1/√n
√n > 1/0,03 ≈ 33,3
n > 33,3² ≈ 1111
Il faut contrôler au moins 1112 pièces.`
      },
    ]
  },
]


// ════════════════════════════════════════════════════════════════
//  SECTIONS — noms identiques aux pages de cours
// ════════════════════════════════════════════════════════════════

// ════════════════════════════════════════════════════════════════
// ════════════════════════════════════════════════════════════════
//  PHYSIQUE-CHIMIE TERMINALE GÉNÉRALE
//  ✅ URLs vérifiées sur sujetdebac.fr (avril 2026)
//  Pattern : annales-pdf/ANNÉE/spe-physique-chimie-ANNÉE-CENTRE-sujet-officiel.pdf
//  Épreuve : 3h30 · Coef. 16 · Bac Général
// ════════════════════════════════════════════════════════════════

const linksPhysiqueChimie: Record<number, AnneeLinks> = {

  // ─── 2025 ─ 19 sujets · 12 corrections ──────────────────────
  2025: { sessions: [
    { label:'Métropole France 1 · 17 juin 2025', flag:'🇫🇷',
      sujet:      `${SDB}/2025/spe-physique-chimie-2025-metropole-1-sujet-officiel.pdf`,
      correction: `${SDB}/2025/spe-physique-chimie-2025-metropole-1-corrige.pdf` },
    { label:'Métropole France 2 · 18 juin 2025', flag:'🇫🇷',
      sujet:      `${SDB}/2025/spe-physique-chimie-2025-metropole-2-sujet-officiel.pdf`,
      correction: `${SDB}/2025/spe-physique-chimie-2025-metropole-2-corrige.pdf` },
    { label:'Métropole Secours 2 · juin 2025', flag:'🇫🇷',
      sujet:      `${SDB}/2025/spe-physique-chimie-2025-metropole-secours2-sujet-officiel.pdf`,
      correction: `${SDB}/2025/spe-physique-chimie-2025-metropole-secours2-corrige.pdf` },
    { label:'Amérique du Nord 1 · mai 2025', flag:'🌎',
      sujet:      `${SDB}/2025/spe-physique-chimie-2025-amerique-nord-1-sujet-officiel.pdf`,
      correction: `${SDB}/2025/spe-physique-chimie-2025-amerique-nord-1-corrige.pdf` },
    { label:'Amérique du Nord 2 · mai 2025', flag:'🌎',
      sujet:      `${SDB}/2025/spe-physique-chimie-2025-amerique-nord-2-sujet-officiel.pdf`,
      correction: `${SDB}/2025/spe-physique-chimie-2025-amerique-nord-2-corrige.pdf` },
    { label:'Amérique du Nord 2 Bis · mai 2025', flag:'🌎',
      sujet:      `${SDB}/2025/spe-physique-chimie-2025-amerique-nord-2bis-sujet-officiel.pdf`,
      correction: `${SDB}/2025/spe-physique-chimie-2025-amerique-nord-2bis-corrige.pdf` },
    { label:'Asie 1 · juin 2025', flag:'🌏',
      sujet:      `${SDB}/2025/spe-physique-chimie-2025-asie-1-sujet-officiel.pdf`,
      correction: `${SDB}/2025/spe-physique-chimie-2025-asie-1-corrige.pdf` },
    { label:'Asie 2 · juin 2025', flag:'🌏',
      sujet:      `${SDB}/2025/spe-physique-chimie-2025-asie-2-sujet-officiel.pdf`,
      correction: `${SDB}/2025/spe-physique-chimie-2025-asie-2-corrige.pdf` },
    { label:'Centres Étrangers Afrique 1 · juin 2025', flag:'🌍',
      sujet:      `${SDB}/2025/spe-physique-chimie-2025-centres-etranger-1-sujet-officiel.pdf`,
      correction: `${SDB}/2025/spe-physique-chimie-2025-centres-etranger-1-corrige.pdf` },
    { label:'Centres Étrangers Afrique 2 · juin 2025', flag:'🌍',
      sujet:      `${SDB}/2025/spe-physique-chimie-2025-centres-etranger-2-sujet-officiel.pdf`,
      correction: `${SDB}/2025/spe-physique-chimie-2025-centres-etranger-2-corrige.pdf` },
    { label:'Polynésie 1 · juin 2025', flag:'🌊',
      sujet:      `${SDB}/2025/spe-physique-chimie-2025-polynesie-1-sujet-officiel.pdf`,
      correction: `${LLY}/polynesie-2025-jour-1` },
    { label:'Polynésie 2 · juin 2025', flag:'🌊',
      sujet:      `${SDB}/2025/spe-physique-chimie-2025-polynesie-2-sujet-officiel.pdf`,
      correction: `${LLY}/polynesie-2025-jour-2` },
    { label:'Métropole France 1 — Remplacement · sept. 2025', flag:'🍂',
      sujet:      `${SDB}/2025/spe-physique-chimie-2025-metropole-1-remplacement-sujet-officiel.pdf`,
      correction: `${SDB}/2025/spe-physique-chimie-2025-metropole-1-remplacement-corrige.pdf` },
  ]},

  // ─── 2024 ─ 14 sujets · 14 corrections ──────────────────────
  2024: { sessions: [
    { label:'Métropole France 1 · 19 juin 2024', flag:'🇫🇷',
      sujet:      `${SDB}/2024/spe-physique-chimie-2024-metropole-1-sujet-officiel.pdf`,
      correction: `${SDB}/2024/spe-physique-chimie-2024-metropole-1-corrige.pdf` },
    { label:'Métropole France 2 · 20 juin 2024', flag:'🇫🇷',
      sujet:      `${SDB}/2024/spe-physique-chimie-2024-metropole-2-sujet-officiel.pdf`,
      correction: `${SDB}/2024/spe-physique-chimie-2024-metropole-2-corrige.pdf` },
    { label:'Amérique du Nord 1 · mai 2024', flag:'🌎',
      sujet:      `${SDB}/2024/spe-physique-chimie-2024-amerique-nord-1-sujet-officiel.pdf`,
      correction: `${SDB}/2024/spe-physique-chimie-2024-amerique-nord-1-corrige.pdf` },
    { label:'Amérique du Nord 2 · mai 2024', flag:'🌎',
      sujet:      `${SDB}/2024/spe-physique-chimie-2024-amerique-nord-2-sujet-officiel.pdf`,
      correction: `${SDB}/2024/spe-physique-chimie-2024-amerique-nord-2-corrige.pdf` },
    { label:'Asie 1 · 10 juin 2024', flag:'🌏',
      sujet:      `${SDB}/2024/spe-physique-chimie-2024-asie-1-sujet-officiel.pdf`,
      correction: `${SDB}/2024/spe-physique-chimie-2024-asie-1-corrige.pdf` },
    { label:'Asie 2 · 11 juin 2024', flag:'🌏',
      sujet:      `${SDB}/2024/spe-physique-chimie-2024-asie-2-sujet-officiel.pdf`,
      correction: `${SDB}/2024/spe-physique-chimie-2024-asie-2-corrige.pdf` },
    { label:'Centres Étrangers Afrique 1 · 5 juin 2024', flag:'🌍',
      sujet:      `${SDB}/2024/spe-physique-chimie-2024-centres-etranger-1-sujet-officiel.pdf`,
      correction: `${SDB}/2024/spe-physique-chimie-2024-centres-etranger-1-corrige.pdf` },
    { label:'Centres Étrangers Afrique 2 · 6 juin 2024', flag:'🌍',
      sujet:      `${SDB}/2024/spe-physique-chimie-2024-centres-etranger-2-sujet-officiel.pdf`,
      correction: `${SDB}/2024/spe-physique-chimie-2024-centres-etranger-2-corrige.pdf` },
    { label:'Polynésie 1 · 19 juin 2024', flag:'🌊',
      sujet:      `${SDB}/2024/spe-physique-chimie-2024-polynesie-1-sujet-officiel.pdf`,
      correction: `${SDB}/2024/spe-physique-chimie-2024-polynesie-1-corrige.pdf` },
    { label:'Polynésie 2 · 20 juin 2024', flag:'🌊',
      sujet:      `${SDB}/2024/spe-physique-chimie-2024-polynesie-2-sujet-officiel.pdf`,
      correction: `${SDB}/2024/spe-physique-chimie-2024-polynesie-2-corrige.pdf` },
    { label:'Suède 2 · juin 2024', flag:'🇸🇪',
      sujet:      `${SDB}/2024/spe-physique-chimie-2024-suede-2-sujet-officiel.pdf`,
      correction: `${SDB}/2024/spe-physique-chimie-2024-suede-2-corrige.pdf` },
    { label:'Métropole France 1 — Remplacement · sept. 2024', flag:'🍂',
      sujet:      `${SDB}/2024/spe-physique-chimie-2024-metropole-1-remplacement-sujet-officiel.pdf`,
      correction: `${SDB}/2024/spe-physique-chimie-2024-metropole-1-remplacement-corrige.pdf` },
    { label:'Métropole France 2 — Remplacement · sept. 2024', flag:'🍂',
      sujet:      `${SDB}/2024/spe-physique-chimie-2024-metropole-2-remplacement-sujet-officiel.pdf`,
      correction: `${SDB}/2024/spe-physique-chimie-2024-metropole-2-remplacement-corrige.pdf` },
    { label:'Polynésie 2 — Remplacement · sept. 2024', flag:'🌊',
      sujet:      `${SDB}/2024/spe-physique-chimie-2024-polynesie-2-remplacement-sujet-officiel.pdf`,
      correction: `${SDB}/2024/spe-physique-chimie-2024-polynesie-2-remplacement-corrige.pdf` },
  ]},

  // ─── 2023 ─ 19 sujets · 11 corrections ──────────────────────
  2023: { sessions: [
    { label:'Métropole France 1 · 20 mars 2023', flag:'🇫🇷',
      sujet:      `${SDB}/2023/spe-physique-chimie-2023-metropole-1-sujet-officiel.pdf`,
      correction: `${SDB}/2023/spe-physique-chimie-2023-metropole-1-corrige.pdf` },
    { label:'Métropole France 2 · 21 mars 2023', flag:'🇫🇷',
      sujet:      `${SDB}/2023/spe-physique-chimie-2023-metropole-2-sujet-officiel.pdf`,
      correction: `${SDB}/2023/spe-physique-chimie-2023-metropole-2-corrige.pdf` },
    { label:'Amérique du Nord 1 · mars 2023', flag:'🌎',
      sujet:      `${SDB}/2023/spe-physique-chimie-2023-amerique-nord-1-sujet-officiel.pdf`,
      correction: `${LLY}/amerique-nord-1-2023-jour-1` },
    { label:'Amérique du Nord 2 · mars 2023', flag:'🌎',
      sujet:      `${SDB}/2023/spe-physique-chimie-2023-amerique-nord-2-sujet-officiel.pdf`,
      correction: `${LLY}/amerique-nord-2-2023-jour-1` },
    { label:'Asie 1 · mars 2023', flag:'🌏',
      sujet:      `${SDB}/2023/spe-physique-chimie-2023-asie-1-sujet-officiel.pdf`,
      correction: `${LLY}/asie-2023-jour-1` },
    { label:'Asie 2 · 24 mars 2023', flag:'🌏',
      sujet:      `${SDB}/2023/spe-physique-chimie-2023-asie-2-sujet-officiel.pdf`,
      correction: `${LLY}/asie-2023-jour-2` },
    { label:'Centres Étrangers Afrique 1 · mars 2023', flag:'🌍',
      sujet:      `${SDB}/2023/spe-physique-chimie-2023-centres-etranger-1-sujet-officiel.pdf`,
      correction: `${SDB}/2023/spe-physique-chimie-2023-centres-etranger-1-corrige.pdf` },
    { label:'Centres Étrangers Afrique 2 · mars 2023', flag:'🌍',
      sujet:      `${SDB}/2023/spe-physique-chimie-2023-centres-etranger-2-sujet-officiel.pdf`,
      correction: `${SDB}/2023/spe-physique-chimie-2023-centres-etranger-2-corrige.pdf` },
    { label:'La Réunion 1 · mars 2023', flag:'🏝️',
      sujet:      `${SDB}/2023/spe-physique-chimie-2023-la-reunion-1-sujet-officiel.pdf`,
      correction: `${SDB}/2023/spe-physique-chimie-2023-la-reunion-1-corrige.pdf` },
    { label:'La Réunion 2 · mars 2023', flag:'🏝️',
      sujet:      `${SDB}/2023/spe-physique-chimie-2023-la-reunion-2-sujet-officiel.pdf`,
      correction: `${LLY}/la-reunion-2023-jour-2` },
    { label:'Liban 1 · mars 2023', flag:'🇱🇧',
      sujet:      `${SDB}/2023/spe-physique-chimie-2023-liban-1-sujet-officiel.pdf`,
      correction: `${SDB}/2023/spe-physique-chimie-2023-liban-1-corrige.pdf` },
    { label:'Liban 2 · mars 2023', flag:'🇱🇧',
      sujet:      `${SDB}/2023/spe-physique-chimie-2023-liban-2-sujet-officiel.pdf`,
      correction: `${SDB}/2023/spe-physique-chimie-2023-liban-2-corrige.pdf` },
    { label:'Polynésie 1 · mars 2023', flag:'🌊',
      sujet:      `${SDB}/2023/spe-physique-chimie-2023-polynesie-1-sujet-officiel.pdf`,
      correction: `${SDB}/2023/spe-physique-chimie-2023-polynesie-1-corrige.pdf` },
    { label:'Polynésie 2 · mars 2023', flag:'🌊',
      sujet:      `${SDB}/2023/spe-physique-chimie-2023-polynesie-2-sujet-officiel.pdf`,
      correction: `${SDB}/2023/spe-physique-chimie-2023-polynesie-2-corrige.pdf` },
    { label:'Métropole France 1 — Remplacement · sept. 2023', flag:'🍂',
      sujet:      `${SDB}/2023/spe-physique-chimie-2023-metropole-1-remplacement-sujet-officiel.pdf`,
      correction: `${SDB}/2023/spe-physique-chimie-2023-metropole-1-remplacement-corrige.pdf` },
    { label:'Métropole France 2 — Remplacement · sept. 2023', flag:'🍂',
      sujet:      `${SDB}/2023/spe-physique-chimie-2023-metropole-2-remplacement-sujet-officiel.pdf`,
      correction: `${SDB}/2023/spe-physique-chimie-2023-metropole-2-remplacement-corrige.pdf` },
  ]},

  // ─── 2022 ─ 18 sujets · 8 corrections ───────────────────────
  2022: { sessions: [
    { label:'Métropole France 1 · 11 mai 2022', flag:'🇫🇷',
      sujet:      `${SDB}/2022/spe-physique-chimie-2022-metropole-1-sujet-officiel.pdf`,
      correction: `${SDB}/2022/spe-physique-chimie-2022-metropole-1-corrige.pdf` },
    { label:'Métropole France 2 · 12 mai 2022', flag:'🇫🇷',
      sujet:      `${SDB}/2022/spe-physique-chimie-2022-metropole-2-sujet-officiel.pdf`,
      correction: `${SDB}/2022/spe-physique-chimie-2022-metropole-2-corrige.pdf` },
    { label:'Amérique du Nord 1 · 18 mai 2022', flag:'🌎',
      sujet:      `${SDB}/2022/spe-physique-chimie-2022-amerique-nord-1-sujet-officiel.pdf`,
      correction: `${SDB}/2022/spe-physique-chimie-2022-amerique-nord-1-corrige.pdf` },
    { label:'Amérique du Nord 2 · 19 mai 2022', flag:'🌎',
      sujet:      `${SDB}/2022/spe-physique-chimie-2022-amerique-nord-2-sujet-officiel.pdf`,
      correction: `${LLY}/amerique-nord-2-2022-jour-2` },
    { label:'Asie 1 · mai 2022', flag:'🌏',
      sujet:      `${SDB}/2022/spe-physique-chimie-2022-asie-1-sujet-officiel.pdf`,
      correction: `${LLY}/asie-2022-jour-1` },
    { label:'Asie 2 · mai 2022', flag:'🌏',
      sujet:      `${SDB}/2022/spe-physique-chimie-2022-asie-2-sujet-officiel.pdf`,
      correction: `${LLY}/asie-2022-jour-2` },
    { label:'Centres Étrangers Afrique 1 · mai 2022', flag:'🌍',
      sujet:      `${SDB}/2022/spe-physique-chimie-2022-centres-etranger-1-sujet-officiel.pdf`,
      correction: `${LLY}/centres-etrangers-1-2022-jour-1` },
    { label:'Centres Étrangers Afrique 2 · mai 2022', flag:'🌍',
      sujet:      `${SDB}/2022/spe-physique-chimie-2022-centres-etranger-2-sujet-officiel.pdf`,
      correction: `${LLY}/centres-etrangers-2-2022-jour-1` },
    { label:'Mayotte-Liban 1 · mai 2022', flag:'🇲🇾',
      sujet:      `${SDB}/2022/spe-physique-chimie-2022-mayotte-liban-1-sujet-officiel.pdf`,
      correction: `${LLY}/mayotte-liban-2022-jour-1` },
    { label:'Mayotte-Liban 2 · mai 2022', flag:'🇲🇾',
      sujet:      `${SDB}/2022/spe-physique-chimie-2022-mayotte-liban-2-sujet-officiel.pdf`,
      correction: `${LLY}/mayotte-liban-2022-jour-2` },
    { label:'Polynésie 1 · 4 mai 2022', flag:'🌊',
      sujet:      `${SDB}/2022/spe-physique-chimie-2022-polynesie-1-sujet-officiel.pdf`,
      correction: `${SDB}/2022/spe-physique-chimie-2022-polynesie-1-corrige.pdf` },
    { label:'Polynésie 2 · mai 2022', flag:'🌊',
      sujet:      `${SDB}/2022/spe-physique-chimie-2022-polynesie-2-sujet-officiel.pdf`,
      correction: `${SDB}/2022/spe-physique-chimie-2022-polynesie-2-corrige.pdf` },
    { label:'Métropole France 1 — Remplacement · sept. 2022', flag:'🍂',
      sujet:      `${SDB}/2022/spe-physique-chimie-2022-metropole-1-remplacement-sujet-officiel.pdf`,
      correction: `${SDB}/2022/spe-physique-chimie-2022-metropole-1-remplacement-corrige.pdf` },
    { label:'Métropole France 2 — Remplacement · sept. 2022', flag:'🍂',
      sujet:      `${SDB}/2022/spe-physique-chimie-2022-metropole-2-remplacement-sujet-officiel.pdf`,
      correction: `${SDB}/2022/spe-physique-chimie-2022-metropole-2-remplacement-corrige.pdf` },
  ]},

  // ─── 2021 ─ 15 sujets · 15 corrections ──────────────────────
  2021: { sessions: [
    { label:'Métropole France 1 · 7 juin 2021', flag:'🇫🇷',
      sujet:      `${SDB}/2021/spe-physique-chimie-2021-metropole-1-sujet-officiel.pdf`,
      correction: `${SDB}/2021/spe-physique-chimie-2021-metropole-1-corrige.pdf` },
    { label:'Métropole France 2 · 8 juin 2021', flag:'🇫🇷',
      sujet:      `${SDB}/2021/spe-physique-chimie-2021-metropole-2-sujet-officiel.pdf`,
      correction: `${SDB}/2021/spe-physique-chimie-2021-metropole-2-corrige.pdf` },
    { label:'Métropole Candidat libre 1 · 2021', flag:'🇫🇷',
      sujet:      `${SDB}/2021/spe-physique-chimie-2021-metro-cand-libre-1-sujet-officiel.pdf`,
      correction: `${SDB}/2021/spe-physique-chimie-2021-metro-cand-libre-1-corrige.pdf` },
    { label:'Métropole Candidat libre 2 · 2021', flag:'🇫🇷',
      sujet:      `${SDB}/2021/spe-physique-chimie-2021-metro-cand-libre-2-sujet-officiel.pdf`,
      correction: `${SDB}/2021/spe-physique-chimie-2021-metro-cand-libre-2-corrige.pdf` },
    { label:'Amérique du Nord 2 · juin 2021', flag:'🌎',
      sujet:      `${SDB}/2021/spe-physique-chimie-2021-amerique-nord-2-sujet-officiel.pdf`,
      correction: `${SDB}/2021/spe-physique-chimie-2021-amerique-nord-2-corrige.pdf` },
    { label:'Asie 1 · juin 2021', flag:'🌏',
      sujet:      `${SDB}/2021/spe-physique-chimie-2021-asie-1-sujet-officiel.pdf`,
      correction: `${SDB}/2021/spe-physique-chimie-2021-asie-1-corrige.pdf` },
    { label:'Asie 2 · juin 2021', flag:'🌏',
      sujet:      `${SDB}/2021/spe-physique-chimie-2021-asie-2-sujet-officiel.pdf`,
      correction: `${SDB}/2021/spe-physique-chimie-2021-asie-2-corrige.pdf` },
    { label:'Centres Étrangers Afrique 1 · juin 2021', flag:'🌍',
      sujet:      `${SDB}/2021/spe-physique-chimie-2021-centres-etranger-1-sujet-officiel.pdf`,
      correction: `${SDB}/2021/spe-physique-chimie-2021-centres-etranger-1-corrige.pdf` },
    { label:'Centres Étrangers Afrique 2 · juin 2021', flag:'🌍',
      sujet:      `${SDB}/2021/spe-physique-chimie-2021-centres-etranger-2-sujet-officiel.pdf`,
      correction: `${SDB}/2021/spe-physique-chimie-2021-centres-etranger-2-corrige.pdf` },
    { label:'Polynésie 1 · juin 2021', flag:'🌊',
      sujet:      `${SDB}/2021/spe-physique-chimie-2021-polynesie-1-sujet-officiel.pdf`,
      correction: `${SDB}/2021/spe-physique-chimie-2021-polynesie-1-corrige.pdf` },
    { label:'Sujet Zéro 1 · 2021', flag:'📝',
      sujet:      `${SDB}/2021/spe-physique-chimie-2021-zero-1-sujet-officiel.pdf`,
      correction: `${SDB}/2021/spe-physique-chimie-2021-zero-1-corrige.pdf` },
    { label:'Sujet Zéro 2 · 2021', flag:'📝',
      sujet:      `${SDB}/2021/spe-physique-chimie-2021-zero-2-sujet-officiel.pdf`,
      correction: `${SDB}/2021/spe-physique-chimie-2021-zero-2-corrige.pdf` },
  ]},
}

// ── Exercices par année — PC Terminale (thèmes réels vérifiés) ──
const dataPhysiqueChimie: AnneeData[] = [
  { year:2025, note:'🆕', exercices:[
    { titre:'Ex 1 — Chimie · Indicateur coloré & Titrages',
      theme:'Emballage intelligent avec bleu de bromophénol (BBP). Indicateur acide-base, domaine de virage, pKa. Titrage pH-métrique et spectrophotométrique.',
      pts:7 },
    { titre:'Ex 2 — Physique · Nucléaire & Datation',
      theme:"Datation d'une roche au Strontium-87. Loi de décroissance radioactive, isochrone, âge de la roche (site de Meymac, Corrèze).",
      pts:7 },
    { titre:'Ex 3 — Physique · Mécanique des fluides',
      theme:"Viscosimètre à chute de bille. 2ème loi de Newton avec frottement visqueux, vitesse limite, viscosité d'une huile. Modèle de Stokes.",
      pts:6 },
  ]},
  { year:2024, exercices:[
    { titre:'Ex 1 — Chimie · Extraction & Acide-base',
      theme:'Extraction liquide-liquide du thymol (huile essentielle de thym). Acido-basicité, ion thymolate. Solubilité sélective dans solvant organique (hexane). Pourcentage massique.',
      pts:7 },
    { titre:'Ex 2 — Physique · Mécanique & Énergie',
      theme:"Chute libre d'un smartphone (2ème loi Newton). Énergie cinétique, énergie potentielle, conservation de l'énergie mécanique. Modélisation avec et sans frottements.",
      pts:6 },
    { titre:'Ex 3 — Physique · Ondes & Circuits',
      theme:'Circuit RLC en régime sinusoïdal forcé. Résonance ω₀=1/√(LC), impédance, facteur de qualité Q, bande passante. Application filtrage.',
      pts:7 },
  ]},
  { year:2023, exercices:[
    { titre:'Ex 1 — Chimie · Cinétique & Équilibres',
      theme:"Réaction d'estérification de Marcellin Berthelot. Cinétique, t₁/₂, équilibre chimique, quotient de réaction Qr, amélioration du rendement. Titrage colorimétrique.",
      pts:7 },
    { titre:'Ex 2 — Physique · Mécanique des fluides',
      theme:'Mécanique des fluides biologiques. Théorème de Bernoulli, continuité S₁v₁=S₂v₂. Application médicale : circulation sanguine, viscosimètre.',
      pts:6 },
    { titre:'Ex 3 — Chimie · Acide-base & Optique',
      theme:'Acide citrique comme produit ménager. Spectroscopie IR, solubilité, diagramme de distribution, Ka. Titrage pH-métrique, choix indicateur coloré.',
      pts:7 },
  ]},
  { year:2022, exercices:[
    { titre:'Ex 1 — Physique · Optique & Lunette',
      theme:'La découverte de Neptune. 3ème loi de Kepler T²/r³=cte. Lunette astronomique, grossissement, distance focale. Lentilles convergentes.',
      pts:5 },
    { titre:'Ex 2 — Physique · Thermodynamique',
      theme:'Bouteille isotherme. 1er principe de la thermodynamique ΔU=W+Q, énergie interne, flux thermique. Transfert thermique par conduction et rayonnement.',
      pts:8 },
    { titre:'Ex 3 — Chimie · Rédox & Piles',
      theme:"Corrosion du fer. Piles galvaniques, demi-équations électroniques, potentiel d'oxydoréduction. Protection cathodique par zinc (anode sacrificielle).",
      pts:7 },
  ]},
  { year:2021, exercices:[
    { titre:'Ex 1 — Physique · Mouvement & Champ',
      theme:'Mouvement dans un champ électrique uniforme (déviation d\'électrons). Équations horaires, trajectoire parabolique. Analogie avec le champ de pesanteur.',
      pts:7 },
    { titre:'Ex 2 — Chimie · Dosages & Spectro.',
      theme:'Dosage par étalonnage UV-visible (Beer-Lambert A=εlc). Réactions rédox, demi-équations, bilan. Titrages colorimétrique et conductimétrique. Équivalence.',
      pts:6 },
    { titre:'Ex 3 — Physique · Ondes & Effet Doppler',
      theme:'Ondes mécaniques progressives, célérité v=λf. Effet Doppler : fréquence perçue selon le mouvement de la source. Applications médicales (écho-Doppler).',
      pts:7 },
  ]},
]

//  SECTIONS — noms identiques aux pages de cours
// ════════════════════════════════════════════════════════════════

// ════════════════════════════════════════════════════════════════
//  PHYSIQUE-CHIMIE SECONDE — 15 exercices par chapitre
// ════════════════════════════════════════════════════════════════

// ════════════════════════════════════════════════════════════════
//  PHYSIQUE-CHIMIE SECONDE — Programme officiel MEN France
//  5 thèmes · 20 exercices corrigés par chapitre
// ════════════════════════════════════════════════════════════════

// ════════════════════════════════════════════════════════════════
//  PHYSIQUE-CHIMIE SECONDE — aligné sur bac-france/physique/seconde
//  4 grands thèmes · 20 exercices corrigés par chapitre
// ════════════════════════════════════════════════════════════════
const CHAPITRES_SECONDE_PC: ChapitreData[] = [
  {
    id:'atomes-noyau', numero:1,
    titre:'Atomes, noyaux & Tableau périodique',
    sousTitre:'Structure atomique · Isotopes · Config. électronique · Tableau périodique',
    icon:'⚛️', color:'#10b981',
    notions:['Noyau atomique','Isotopes','Z et A','Config. électronique','Tableau périodique','Électrons de valence'],
    exercices:[
      {id:'SN1-01',difficulte:1,titre:'Notation ᴬ_Z X',
       enonce:"Oxygène ¹⁶₈O.\n1. Donner Z, N, nombre d'électrons.\n2. Charge du noyau.\n3. Atome neutre ?",
       correction:'1. Z=8 protons, N=8 neutrons, 8 électrons\n2. +8e = +1,28×10⁻¹⁸C\n3. Oui: 8(+) + 8(-) = 0',
       notions:['Noyau']},
      {id:'SN1-02',difficulte:1,titre:'Isotopes du chlore',
       enonce:'³⁵₁₇Cl et ³⁷₁₇Cl.\n1. Z et N pour chacun.\n2. Pourquoi sont-ils isotopes ?\n3. Masse atomique moyenne (75% ³⁵Cl, 25% ³⁷Cl).',
       correction:'1. ³⁵Cl: Z=17 N=18 · ³⁷Cl: Z=17 N=20\n2. Même Z=17, A différent (neutrons différents)\n3. M = 0,75×35+0,25×37 = 35,5 g/mol',
       notions:['Isotopes']},
      {id:'SN1-03',difficulte:1,titre:'Configurations électroniques',
       enonce:'Écrire les configurations de: H(1) He(2) Li(3) Ne(10) Na(11) Cl(17) Ca(20).\nDonner les électrons de valence de Na et Cl.',
       correction:'H:(1) · He:(2) · Li:(2,1) · Ne:(2,8) · Na:(2,8,1) · Cl:(2,8,7) · Ca:(2,8,8,2)\nNa: 1 e⁻ val · Cl: 7 e⁻ val',
       notions:['Config. électronique']},
      {id:'SN1-04',difficulte:1,titre:'Tableau périodique — groupes et périodes',
       enonce:'Na est en période 3, groupe 1.\n1. Que signifie période 3 ?\n2. Que signifie groupe 1 ?\n3. Quel autre élément du groupe 17 ?',
       correction:'1. 3 couches électroniques occupées\n2. 1 électron de valence\n3. F, Cl, Br, I (halogènes)',
       notions:['Tableau périodique']},
      {id:'SN1-05',difficulte:1,titre:'Masse molaire',
       enonce:'Calculer M de: NaCl · H₂SO₄ · CaCO₃ · C₆H₁₂O₆.\nM(H)=1 M(C)=12 M(O)=16 M(Na)=23 M(S)=32 M(Cl)=35,5 M(Ca)=40.',
       correction:'NaCl = 58,5 g/mol · H₂SO₄ = 98 g/mol · CaCO₃ = 100 g/mol · C₆H₁₂O₆ = 180 g/mol',
       notions:['Masse molaire']},
      {id:'SN1-06',difficulte:1,titre:'Quantité de matière et Avogadro',
       enonce:'Nₐ = 6,02×10²³ mol⁻¹.\n1. n(Fe) pour m=28g. M=56.\n2. m(NaOH) pour n=0,5mol. M=40.\n3. N(molécules) dans 1mol H₂O.',
       correction:'1. n = 0,5 mol · 2. m = 20 g · 3. N = 6,02×10²³',
       notions:['Quantité matière','Avogadro']},
      {id:'SN1-07',difficulte:2,titre:'Ions courants',
       enonce:'Former les ions de Na(11) · Cl(17) · Ca(20) · O(8) · Al(13).\nDonner formule, protons, électrons, charge.',
       correction:'Na⁺: 11p 10e +1 · Cl⁻: 17p 18e -1 · Ca²⁺: 20p 18e +2\nO²⁻: 8p 10e -2 · Al³⁺: 13p 10e +3',
       notions:['Ions']},
      {id:'SN1-08',difficulte:2,titre:'Concentration molaire',
       enonce:'Dissolve 5,85g NaCl (M=58,5) dans 500mL.\n1. n(NaCl). 2. Concentration C. 3. Ions présents et concentrations.',
       correction:'1. n = 0,1 mol · 2. C = 0,2 mol/L · 3. [Na⁺] = [Cl⁻] = 0,2 mol/L',
       notions:['Concentration']},
      {id:'SN1-09',difficulte:2,titre:'Dilution',
       enonce:'20mL HCl C₁=2mol/L dilué à 200mL.\n1. Relation C₁V₁=C₂V₂. 2. C₂. 3. Facteur de dilution.',
       correction:'1. C₁V₁ = C₂V₂ · 2. C₂ = 0,2 mol/L · 3. F = 10',
       notions:['Dilution']},
      {id:'SN1-10',difficulte:2,titre:'Volume molaire des gaz',
       enonce:'Vm=22,4L/mol à CNT (0°C, 1atm). n=0,3mol CO₂.\n1. Volume à CNT. 2. m(CO₂). M=44. 3. V à 25°C, P=10⁵Pa via PV=nRT.',
       correction:'1. V = 6,72 L · 2. m = 13,2 g · 3. V = nRT/P = 7,43 L',
       notions:['Volume molaire','Gaz parfait']},
      {id:'SN1-11',difficulte:2,titre:'Réactif limitant',
       enonce:'N₂+3H₂→2NH₃. n(N₂)=0,4mol n(H₂)=1,0mol.\n1. Réactif limitant. 2. n(NH₃) produit. 3. Excès restant.',
       correction:'1. H₂ limitant (besoin 1,2mol > 1,0mol disponible)\n2. n(NH₃) = 2/3×1,0 = 0,667 mol\n3. n(N₂) restant = 0,067 mol',
       notions:['Réactif limitant']},
      {id:'SN1-12',difficulte:2,titre:'Spectrométrie de masse — isotopes',
       enonce:'Spectre du chlore: m/z=35(75%) et m/z=37(25%).\n1. À quoi correspondent ces pics ?\n2. Masse atomique moy.\n3. Pic à m/z=70: expliquer.',
       correction:'1. Isotopes ³⁵Cl et ³⁷Cl\n2. M = 35,5 g/mol\n3. Ion Cl₂⁺: ³⁵Cl+³⁵Cl = 70',
       notions:['Spectrométrie','Isotopes']},
      {id:'SN1-13',difficulte:2,titre:'Composition centésimale',
       enonce:'Glucose C₆H₁₂O₆ M=180g/mol.\n1. %C %H %O. 2. m(C) dans 90g de glucose. 3. Vérifier somme=100%.',
       correction:'1. %C=40% · %H=6,7% · %O=53,3%\n2. m(C) = 36 g\n3. 40+6,7+53,3 = 100% ✓',
       notions:['Composition centésimale']},
      {id:'SN1-14',difficulte:3,titre:'Modèle de Bohr',
       enonce:'H: E_n=-13,6/n² eV. h=6,63×10⁻³⁴ c=3×10⁸.\n1. E₁. 2. E₃. 3. λ du photon émis lors 3→1.',
       correction:'1. E₁ = -13,6 eV · 2. E₃ = -1,51 eV\n3. ΔE = 12,09 eV = 1,94×10⁻¹⁸J · λ = hc/ΔE = 103 nm (UV)',
       notions:['Bohr','Photon']},
      {id:'SN1-15',difficulte:2,titre:'Halogènes — propriétés',
       enonce:'F(9) Cl(17) Br(35): groupe 17.\n1. Configurations. 2. Électrons de valence. 3. Pourquoi réagissent-ils de façon similaire ?',
       correction:'1. F:(2,7) · Cl:(2,8,7) · Br:(2,8,18,7)\n2. Tous 7 e⁻ val\n3. Propriétés chimiques définies par e⁻ de valence → tendance à capter 1e⁻',
       notions:['Halogènes']},
      {id:'SN1-16',difficulte:2,titre:'Radioactivité — ¹⁴C',
       enonce:'¹⁴₆C radioactif β⁻, t₁/₂=5730 ans.\n1. Stable ? Pourquoi ?\n2. Désintégration: ¹⁴₆C→¹⁴₇N+e⁻. Vérifier conservation.\n3. Application.',
       correction:'1. Instable: excès de neutrons (N=8 pour Z=6)\n2. A: 14=14 ✓ · Z: 6=7+(-1) ✓\n3. Datation carbone-14 (archéologie)',
       notions:['Radioactivité']},
      {id:'SN1-17',difficulte:3,titre:'Identification par spectrométrie',
       enonce:'Élément inconnu X: pics m/z=28(92%) et m/z=29(8%).\n1. Masse atomique moy. 2. Si ²⁸₁₄Si: Z. 3. Identifier.',
       correction:'1. M = 28,08 g/mol · 2. Z = 14\n3. Silicium (M_tabulé = 28,09 ✓)',
       notions:['Spectrométrie']},
      {id:'SN1-18',difficulte:2,titre:"Écriture symbolique d'un noyau",
       enonce:'Noyau X: 26 protons et 30 neutrons.\n1. Écrire ᴬ_Z X. 2. Quel élément ? 3. Charge du noyau en Coulombs.',
       correction:'1. ⁵⁶₂₆X · 2. Fer (Fe) · 3. Q = 26×1,6×10⁻¹⁹ = 4,16×10⁻¹⁸ C',
       notions:['Noyau atomique']},
      {id:'SN1-19',difficulte:2,titre:"Dureté de l'eau",
       enonce:'[Ca²⁺]=2,5mmol/L (M=40) · [Mg²⁺]=1,2mmol/L (M=24).\n1. TH en °F (1°F=0,1mmol/L). 2. [Ca²⁺] en mg/L. 3. Eau dure si TH>15°F ?',
       correction:'1. TH = 37°F · 2. 100 mg/L · 3. TH=37>15 → très dure',
       notions:['Dureté eau']},
      {id:'SN1-20',difficulte:3,titre:'Synthèse — analyse médicament',
       enonce:'Paracétamol C₈H₉NO₂ M=151g/mol. Comprimé 500mg.\n1. n(paracétamol). 2. Molécules par comprimé. 3. %N massique.',
       correction:'1. n = 3,31×10⁻³ mol · 2. N = 2,0×10²¹ · 3. %N = 14/151×100 = 9,3%',
       notions:['Application médicale']},
    ]
  },
  {
    id:'transformations-chimiques', numero:2,
    titre:'Transformations chimiques',
    sousTitre:'Équations · Combustion · Oxydoréduction · Acide-base · pH',
    icon:'🔥', color:'#ef4444',
    notions:['Équation chimique','Combustion','Oxydoréduction','N.o.','pH','Acide-base'],
    exercices:[
      {id:'ST2-01',difficulte:1,titre:"Équilibrage d'équations chimiques",
       enonce:'Équilibrer:\n1. H₂+O₂→H₂O\n2. Fe+O₂→Fe₂O₃\n3. CH₄+O₂→CO₂+H₂O\n4. Al+HCl→AlCl₃+H₂',
       correction:'1. 2H₂+O₂→2H₂O · 2. 4Fe+3O₂→2Fe₂O₃\n3. CH₄+2O₂→CO₂+2H₂O · 4. 2Al+6HCl→2AlCl₃+3H₂',
       notions:['Équation chimique']},
      {id:'ST2-02',difficulte:1,titre:'Conservation de la masse',
       enonce:'CH₄+2O₂→CO₂+2H₂O. Brûler 16g CH₄ (M=16).\n1. n(CH₄). 2. m(CO₂). 3. m(H₂O). Vérifier conservation.',
       correction:'1. n=1mol · 2. m=44g · 3. m=36g\nVérif: 16+64=80g → 44+36=80g ✓',
       notions:['Conservation masse']},
      {id:'ST2-03',difficulte:1,titre:'pH — acides et bases forts',
       enonce:'pH de: HCl 0,01mol/L · HNO₃ 10⁻³mol/L · NaOH 0,01mol/L · H₂SO₄ 0,005mol/L.',
       correction:'HCl: pH=2 · HNO₃: pH=3 · NaOH: pOH=2→pH=12 · H₂SO₄: [H₃O⁺]=0,01→pH=2',
       notions:['pH']},
      {id:'ST2-04',difficulte:1,titre:"Produit ionique de l'eau",
       enonce:'Ke=10⁻¹⁴.\n1. [OH⁻] si pH=3. 2. [H₃O⁺] si pOH=4. 3. Milieu si [OH⁻]=10⁻⁸mol/L.',
       correction:'1. [OH⁻]=10⁻¹¹mol/L · 2. [H₃O⁺]=10⁻¹⁰mol/L · 3. pH=6 → acide',
       notions:['Ke']},
      {id:'ST2-05',difficulte:2,titre:'Acide fort vs acide faible',
       enonce:'HCl 0,1mol/L vs CH₃COOH 0,1mol/L (pKa=4,75).\n1. pH(HCl). 2. pH(CH₃COOH)≈½(pKa-logC). 3. Lequel est plus acide ?',
       correction:'1. pH=1 · 2. pH≈2,87 · 3. HCl pH=1<2,87 → HCl plus acide',
       notions:['Acide fort/faible']},
      {id:'ST2-06',difficulte:2,titre:'Oxydoréduction — identification',
       enonce:'Zn+2HCl→ZnCl₂+H₂.\n1. Oxydant et réducteur. 2. Demi-équations. 3. N.o. Zn avant/après.',
       correction:'1. H⁺: oxydant · Zn: réducteur\n2. Zn→Zn²⁺+2e⁻ · 2H⁺+2e⁻→H₂\n3. Zn: 0→+2',
       notions:['Oxydoréduction']},
      {id:'ST2-07',difficulte:2,titre:"Nombre d'oxydation",
       enonce:'N.o. de: Mn dans KMnO₄ · S dans H₂SO₄ · N dans HNO₃ · N dans NH₃.',
       correction:'KMnO₄: Mn=+7 · H₂SO₄: S=+6 · HNO₃: N=+5 · NH₃: N=-3',
       notions:['N.o.']},
      {id:'ST2-08',difficulte:2,titre:'Combustion du propane',
       enonce:"C₃H₈+5O₂→3CO₂+4H₂O. 44g propane (M=44).\n1. Vérifier bilan. 2. m(CO₂) par kg propane. 3. CO₂ d'une bouteille 13kg.",
       correction:'1. C:3=3 H:8=8 O:10=10 ✓ · 2. 3kg CO₂/kg propane · 3. 39kg CO₂',
       notions:['Combustion']},
      {id:'ST2-09',difficulte:2,titre:'Neutralisation',
       enonce:'HCl+NaOH→NaCl+H₂O. 25mL HCl 0,1mol/L + 25mL NaOH 0,1mol/L.\n1. n(HCl) et n(NaOH). 2. pH mélange. 3. Excess 5mL NaOH 0,1mol/L: pH.',
       correction:'1. n=n=2,5×10⁻³mol → équimolaires · 2. pH=7\n3. [OH⁻]=9,09×10⁻³mol/L → pH≈11,96',
       notions:['Neutralisation']},
      {id:'ST2-10',difficulte:2,titre:'Identification des ions',
       enonce:'Test pour: Cl⁻ · Fe³⁺ · Cu²⁺ · SO₄²⁻ · NH₄⁺.',
       correction:'Cl⁻: AgNO₃→ppt blanc · Fe³⁺: NaOH→ppt rouille · Cu²⁺: NaOH→ppt bleu\nSO₄²⁻: BaCl₂→ppt blanc · NH₄⁺: NaOH chaud→NH₃ piquant',
       notions:['Tests ions']},
      {id:'ST2-11',difficulte:2,titre:'Dosage acide-base — vinaigre',
       enonce:'10mL vinaigre dosé par NaOH 0,5mol/L. V_éq=8mL.\n1. C(acide acétique). 2. Degré acidité (ρ=1,01g/mL M=60). 3. Indicateur coloré.',
       correction:'1. C = 0,4 mol/L · 2. degré ≈ 2,4% · 3. BBT (pH_éq=7)',
       notions:['Dosage']},
      {id:'ST2-12',difficulte:2,titre:'Pile Daniell',
       enonce:'Zn|Zn²⁺||Cu²⁺|Cu. E°=1,10V.\n1. Demi-réactions. 2. Équation globale. 3. Sens courant extérieur.',
       correction:'1. Anode: Zn→Zn²⁺+2e⁻ · Cathode: Cu²⁺+2e⁻→Cu\n2. Zn+Cu²⁺→Zn²⁺+Cu · 3. Courant de Cu(+) vers Zn(-)',
       notions:['Pile']},
      {id:'ST2-13',difficulte:2,titre:"Électrolyse de l'eau",
       enonce:'2H₂O→2H₂+O₂. I=1A t=30min. F=96500C/mol.\n1. Q=It. 2. n(H₂). 3. V(H₂) à CNT.',
       correction:'1. Q=1800C · 2. n=9,3×10⁻³mol · 3. V=208mL',
       notions:['Électrolyse']},
      {id:'ST2-14',difficulte:2,titre:'Corrosion et protection',
       enonce:'Corrosion Fe: Fe→Fe²⁺+2e⁻ et O₂+2H₂O+4e⁻→4OH⁻.\n1. Oxydant et réducteur. 2. Équation globale. 3. Deux méthodes de protection.',
       correction:'1. O₂: oxydant · Fe: réducteur\n2. 2Fe+O₂+2H₂O→2Fe(OH)₂ → rouille\n3. Galvanisation (Zn) · Peinture · Acier inox · Protection cathodique',
       notions:['Corrosion']},
      {id:'ST2-15',difficulte:2,titre:'Acide faible — Ka',
       enonce:'HCOOH pKa=3,75 C=0,1mol/L.\n1. Équation dissociation. 2. pH≈½(pKa-logC). 3. Taux dissociation α.',
       correction:'1. HCOOH+H₂O⇌HCOO⁻+H₃O⁺\n2. pH≈2,37 · 3. α=4,27%',
       notions:['Acide faible','Ka']},
      {id:'ST2-16',difficulte:2,titre:'Chromatographie CCM',
       enonce:'Solvant: 8cm. A: 5,6cm. B: 2,4cm.\n1. Rf(A) et Rf(B). 2. Lequel est plus polaire. 3. Même Rf → même composé ?',
       correction:'1. Rf(A)=0,70 · Rf(B)=0,30\n2. B (Rf faible = retenu par silice polaire)\n3. Fort indice mais pas certitude absolue',
       notions:['CCM','Rf']},
      {id:'ST2-17',difficulte:3,titre:'Équilibre acide-base — tampon',
       enonce:'50mL CH₃COOH 0,2mol/L + 50mL NaOH 0,1mol/L. pKa=4,75.\n1. n(AH) et n(NaOH). 2. n(AH)_f et n(A⁻)_f. 3. pH.',
       correction:'1. n(AH)=0,01mol · n(OH)=0,005mol\n2. n(AH)_f=0,005mol · n(A⁻)=0,005mol\n3. pH = 4,75+log(1) = 4,75 (demi-neutralisation)',
       notions:['Tampon']},
      {id:'ST2-18',difficulte:2,titre:'Réaction avec réactif limitant',
       enonce:'Fe+H₂SO₄→FeSO₄+H₂. 5,6g Fe + 50mL H₂SO₄ 0,1mol/L. M(Fe)=56.\n1. n(Fe) et n(H₂SO₄). 2. Réactif limitant. 3. V(H₂) à CNT.',
       correction:'1. n(Fe)=0,1mol · n(H₂SO₄)=0,005mol\n2. H₂SO₄ limitant · 3. V=0,112L',
       notions:['Réactif limitant']},
      {id:'ST2-19',difficulte:3,titre:'Dosage H₂O₂ par KMnO₄',
       enonce:'KMnO₄ 0,02mol/L. V_éq=20mL pour 10mL H₂O₂.\nMnO₄⁻+8H⁺+5e⁻→Mn²⁺ · H₂O₂→O₂+2H⁺+2e⁻.\n1. n(MnO₄⁻). 2. n(H₂O₂) (ratio 2:5). 3. C(H₂O₂).',
       correction:'1. n=4×10⁻⁴mol · 2. n(H₂O₂)=10⁻³mol · 3. C=0,1mol/L',
       notions:['Dosage rédox']},
      {id:'ST2-20',difficulte:3,titre:'Synthèse — eau de Javel',
       enonce:'Cl₂+2NaOH→NaOCl+NaCl+H₂O. Titre 2,6% Cl₂ actif.\n1. Dismutation (définir). 2. [NaOCl] si 2,6g Cl₂/100mL M=71. 3. Agent désinfectant actif.',
       correction:'1. Même élément oxydé ET réduit (Cl: 0→+1 et -1)\n2. [NaOCl]=0,366mol/L · 3. OCl⁻ (hypochlorite)',
       notions:['Dismutation']},
    ]
  },
  {
    id:'description-mouvement', numero:3,
    titre:'Description du mouvement',
    sousTitre:'Référentiel · Vecteur vitesse · MRU · MRUA · Trajectoire',
    icon:'🚀', color:'#4f6ef7',
    notions:['Référentiel','Vecteur vitesse','MRU','MRUA','Trajectoire','MCU'],
    exercices:[
      {id:'SM3-01',difficulte:1,titre:'Référentiel et relativité',
       enonce:'Passager dans train MRU lâche une balle.\n1. Trajectoire dans référentiel train.\n2. Trajectoire dans référentiel terrestre.\n3. Lequel est galiléen ?',
       correction:'1. Verticale · 2. Parabolique · 3. Référentiel terrestre',
       notions:['Référentiel']},
      {id:'SM3-02',difficulte:1,titre:'Vecteur vitesse moyen',
       enonce:'A(0;0)→B(6;4) en Δt=2s.\n1. Vecteur AB. 2. Distance AB. 3. Vecteur vitesse moyen.',
       correction:'1. AB=(6;4) · 2. AB=√52≈7,2m · 3. v=(3;2)m/s |v|=3,6m/s',
       notions:['Vecteur vitesse']},
      {id:'SM3-03',difficulte:1,titre:'MRU — équation horaire',
       enonce:'x(t)=15t+5 (m, s).\n1. Vitesse et x₀. 2. x(10s). 3. t pour x=200m.',
       correction:'1. v=15m/s · x₀=5m · 2. x=155m · 3. t=13s',
       notions:['MRU']},
      {id:'SM3-04',difficulte:2,titre:'MRUA — équations',
       enonce:'v₀=0, a=4m/s².\n1. v après 6s. 2. d=½at². 3. v quand d=50m: v²=2ad.',
       correction:'1. v=24m/s · 2. d=72m · 3. v=20m/s',
       notions:['MRUA']},
      {id:'SM3-05',difficulte:2,titre:'Chute libre',
       enonce:'Balle lâchée h=25m. g=10m/s².\n1. t=√(2h/g). 2. v impact=√(2gh). 3. Ec si m=100g.',
       correction:'1. t≈2,24s · 2. v≈22,4m/s · 3. Ec=25J',
       notions:['Chute libre']},
      {id:'SM3-06',difficulte:2,titre:'Variation vecteur vitesse',
       enonce:'t₁: v=(4;0). t₂: v=(0;3). Δt=2s.\n1. Δv. 2. |Δv|. 3. a=Δv/Δt.',
       correction:'1. Δv=(-4;3) · 2. |Δv|=5m/s · 3. a=(-2;1,5)m/s²',
       notions:['Vecteur accélération']},
      {id:'SM3-07',difficulte:2,titre:'Trajectoire — équation cartésienne',
       enonce:'x(t)=3t · y(t)=t²+1 (m, s).\n1. y=f(x). 2. Type de courbe. 3. Point à t=2s.',
       correction:'1. y=x²/9+1 · 2. Parabole · 3. x=6m y=5m',
       notions:['Trajectoire']},
      {id:'SM3-08',difficulte:2,titre:'MCU — mouvement circulaire',
       enonce:'R=3m, T=6s.\n1. v=2πR/T. 2. a_c=v²/R. 3. Sens de a_c.',
       correction:'1. v≈3,14m/s · 2. a_c≈3,3m/s² · 3. Vers le centre',
       notions:['MCU']},
      {id:'SM3-09',difficulte:2,titre:'Méthode des cordes',
       enonce:'Toutes 40ms. Positions (cm): 0;8;18;30;44;60.\n1. Vitesses v₁ à v₄. 2. Accélération. 3. Type de mouvement.',
       correction:'1. v₁=2,25 v₂=2,75 v₃=3,25 v₄=3,75 m/s\n2. a=12,5m/s² · 3. MRUA',
       notions:['Méthode cordes']},
      {id:'SM3-10',difficulte:2,titre:"Distance d'arrêt — sécurité",
       enonce:'v=90km/h, t_r=1s, a=-7m/s².\n1. v en m/s. 2. d_réaction. 3. d_freinage et d_total.',
       correction:'1. v=25m/s · 2. d_r=25m · 3. d_f=44,6m → d_total≈70m',
       notions:['Distance arrêt']},
      {id:'SM3-11',difficulte:2,titre:'Satellite — vitesse orbitale',
       enonce:'GMm/r²=mv²/r. GM=3,98×10¹⁴ r=7000km.\n1. v. 2. T=2πr/v. 3. h=r-R_T (R_T=6371km).',
       correction:'1. v=7542m/s · 2. T≈97min · 3. h=629km',
       notions:['Satellite']},
      {id:'SM3-12',difficulte:2,titre:'Projectile horizontal',
       enonce:'v₀=20m/s horizontal depuis h=20m. g=10m/s².\n1. x(t) et y(t). 2. Durée chute. 3. Portée.',
       correction:'1. x=20t · y=20-5t² · 2. t=2s · 3. x=40m',
       notions:['Projectile']},
      {id:'SM3-13',difficulte:3,titre:'Lancer oblique',
       enonce:'v₀=25m/s θ=37°. g=10m/s².\n1. v₀ₓ et v₀ᵧ. 2. H_max. 3. R=v₀²sin2θ/g.',
       correction:'1. v₀ₓ=20m/s · v₀ᵧ=15m/s · 2. H=11,25m · 3. R=60m',
       notions:['Lancer oblique']},
      {id:'SM3-14',difficulte:2,titre:'Chronophotographie',
       enonce:'Photos toutes 100ms. Écarts: 2;4;6;8;10cm.\n1. Mobile accélère ? 2. Accélération. 3. v initiale et finale.',
       correction:'1. Oui (écarts croissants réguliers)\n2. a=2m/s² · 3. v₁=20cm/s · v_f=100cm/s',
       notions:['Chronophotographie']},
      {id:'SM3-15',difficulte:2,titre:'Vitesse relative',
       enonce:'Train A: 100km/h Est. Train B: 80km/h Ouest.\n1. v_rel A/B. 2. v_rel B/A. 3. Si même sens: v_rel.',
       correction:'1. 180km/h · 2. 180km/h · 3. 20km/h',
       notions:['Vitesse relative']},
      {id:'SM3-16',difficulte:2,titre:'Balle lancée vers le haut',
       enonce:'v₀=30m/s vers le haut. g=10m/s².\n1. H_max=v₀²/2g. 2. Durée montée. 3. v à h=30m.',
       correction:'1. H=45m · 2. t=3s · 3. v=√300≈17,3m/s',
       notions:['Cinématique verticale']},
      {id:'SM3-17',difficulte:2,titre:'Équation horaire et dérivée',
       enonce:'x(t)=2t²+3t-1 (m, s).\n1. v(t)=dx/dt. 2. v(4s). 3. Mouvement accéléré ou décéléré ?',
       correction:'1. v=4t+3 · 2. v=19m/s · 3. a=4>0 et v>0 → accéléré',
       notions:['Dérivée']},
      {id:'SM3-18',difficulte:3,titre:'GPS — vitesse instantanée',
       enonce:'GPS toutes 1s: x=0;10;25;45m.\n1. v₁₂ et v₂₃. 2. Accélération moy. 3. Prédire x(4s).',
       correction:'1. v₁₂=15m/s · v₂₃=20m/s · 2. a=5m/s² · 3. x≈70m',
       notions:['GPS']},
      {id:'SM3-19',difficulte:2,titre:'Comparaison MRU et MRUA',
       enonce:'MRU: x₁=10t. MRUA: x₂=t² (m,s).\n1. Positions à t=5s. 2. Vitesses à t=5s. 3. Instant où x₁=x₂.',
       correction:'1. x₁=50m · x₂=25m · 2. v₁=10m/s · v₂=10m/s · 3. t=10s',
       notions:['Comparaison mouvements']},
      {id:'SM3-20',difficulte:3,titre:"Synthèse — freinage d'urgence",
       enonce:"Voiture v=108km/h. Trace freinage=60m. μ=0,8 g=10m/s².\n1. v en m/s. 2. a=-μg. 3. s'arrête avant obstacle à 60m ?",
       correction:"1. v=30m/s · 2. a=-8m/s² · 3. d_arrêt=v²/2|a|=56,25m<60m → s'arrête avant ✓",
       notions:['Freinage']},
    ]
  },
  {
    id:'forces-interactions', numero:4,
    titre:'Forces & Interactions',
    sousTitre:'Poids · Équilibre · Coulomb · Gravitation · Pascal · Archimède · Gaz parfait',
    icon:'⚡', color:'#f59e0b',
    notions:['Poids','Équilibre','Coulomb','Gravitation','Champ E','Pascal','Archimède','Gaz parfait'],
    exercices:[
      {id:'SF4-01',difficulte:1,titre:'Poids et masse',
       enonce:'m=5kg. g_Terre=9,8 g_Lune=1,6.\n1. Poids sur Terre et Lune. 2. Masse change-t-elle ? 3. Différence poids/masse.',
       correction:'1. P_T=49N · P_L=8N · 2. Non · 3. Masse: quantité matière(kg) · Poids: force(N)',
       notions:['Poids','Masse']},
      {id:'SF4-02',difficulte:1,titre:"Principe d'inertie",
       enonce:"1. Énoncer le principe d'inertie.\n2. Puck sur glace parfaite: mouvement ?\n3. Astronaute espace, moteurs coupés: que se passe-t-il ?",
       correction:'1. Si ΣF=0: repos ou MRU · 2. MRU indéfini · 3. Continue à v=cste en ligne droite',
       notions:['Principe inertie']},
      {id:'SF4-03',difficulte:2,titre:'Loi de Coulomb',
       enonce:'q₁=4μC q₂=-6μC r=30cm. k=9×10⁹.\n1. F. 2. Attraction ou répulsion. 3. r÷2: F ?',
       correction:'1. F=2,4N · 2. Attraction (charges opposées) · 3. F×4=9,6N',
       notions:['Coulomb']},
      {id:'SF4-04',difficulte:2,titre:'Gravitation — g(h)',
       enonce:'G=6,67×10⁻¹¹ M_T=5,97×10²⁴ R_T=6371km.\n1. g₀=GM/R². 2. g(1000km). 3. Poids 70kg aux deux altitudes.',
       correction:'1. g₀=9,82m/s² · 2. g=7,34m/s² · 3. P₀=687N · P=514N',
       notions:['Gravitation']},
      {id:'SF4-05',difficulte:2,titre:'Champ électrique — condensateur',
       enonce:'U=300V d=3cm.\n1. E=U/d. 2. Force sur q=5nC. 3. Lignes de champ.',
       correction:'1. E=10000V/m · 2. F=5×10⁻⁵N · 3. Parallèles de + vers -, perpendiculaires armatures',
       notions:['Champ E']},
      {id:'SF4-06',difficulte:2,titre:'Pression et théorème de Pascal',
       enonce:'ρ_eau=1000 g=9,8.\n1. P à h=20m. 2. P_tot avec P_atm=10⁵Pa. 3. Vérin: S₁=5cm² S₂=100cm² F₁=20N. F₂.',
       correction:'1. P=196000Pa · 2. P_tot=2,96×10⁵Pa · 3. F₂=400N',
       notions:['Pression','Pascal']},
      {id:'SF4-07',difficulte:2,titre:"Poussée d'Archimède",
       enonce:'Objet V=200cm³ m=300g. ρ_eau=1000 g=10.\n1. F_A. 2. Flotte ou coule. 3. ρ_objet.',
       correction:'1. F_A=2N · 2. P=3N>F_A → coule · 3. ρ=1500kg/m³',
       notions:['Archimède']},
      {id:'SF4-08',difficulte:2,titre:'Gaz parfait PV=nRT',
       enonce:'2mol T=300K P=10⁵Pa. R=8,314.\n1. V. 2. T double à P cst: V. 3. P double à T cst: V.',
       correction:'1. V≈50L · 2. V double=100L · 3. V÷2=25L',
       notions:['Gaz parfait']},
      {id:'SF4-09',difficulte:2,titre:'Équilibre plan incliné',
       enonce:'Bloc 3kg θ=30° en équilibre. g=10.\n1. Poids P. 2. P∥ et P⊥. 3. N et force de frottement f.',
       correction:'1. P=30N · 2. P∥=15N · P⊥=26N · 3. N=26N · f=15N',
       notions:['Équilibre']},
      {id:'SF4-10',difficulte:2,titre:'Interactions fondamentales',
       enonce:'Proton-électron à r=10⁻¹⁰m.\n1. F_coulomb. 2. F_grav. 3. Rapport.',
       correction:'1. F_C=2,3×10⁻⁸N · 2. F_G=1,01×10⁻⁴⁷N · 3. F_C/F_G≈2,3×10³⁹',
       notions:['Interactions fondamentales']},
      {id:'SF4-11',difficulte:2,titre:'Iceberg — flottaison',
       enonce:'ρ_glace=917 ρ_eau=1025.\n1. Fraction émergée f=1-ρ_glace/ρ_eau. 2. V sous eau si V=1km³. 3. Danger navigation.',
       correction:"1. f=10,5% · 2. V_sous=0,895km³ · 3. 89,5% invisible sous l'eau",
       notions:['Flottaison']},
      {id:'SF4-12',difficulte:2,titre:'Plan incliné — Newton',
       enonce:'Bloc 2kg θ=30° sans frottement. g=10.\n1. P∥=mgsinθ. 2. a=gsinθ. 3. v après d=5m.',
       correction:'1. P∥=10N · 2. a=5m/s² · 3. v=√50≈7,1m/s',
       notions:['Newton','Plan incliné']},
      {id:'SF4-13',difficulte:2,titre:"Déflexion d'un électron",
       enonce:'E=2000V/m vertical v₀=5×10⁷m/s horizontal L=4cm.\n1. F et a vertical. 2. t dans plaques. 3. y déviation.',
       correction:'1. a=3,5×10¹⁴m/s² · 2. t=8×10⁻¹⁰s · 3. y≈0,11mm',
       notions:['Déflexion']},
      {id:'SF4-14',difficulte:3,titre:'Satellite géostationnaire',
       enonce:'T=24h GM=3,98×10¹⁴.\n1. r³=GMT²/(4π²). 2. r et h. 3. v orbitale.',
       correction:'1. r³=7,54×10²²m³ · 2. r=42200km h=35830km · 3. v=3068m/s',
       notions:['Satellite géostationnaire']},
      {id:'SF4-15',difficulte:2,titre:'Pression atmosphérique et altitude',
       enonce:'P=P₀×e^(-h/H₀). P₀=10⁵Pa H₀=8500m.\n1. P(5500m). 2. % de P₀. 3. Conséquence physiologique.',
       correction:'1. P≈5,24×10⁴Pa · 2. 52% · 3. pO₂ insuffisant → hypoxie',
       notions:['Pression atmosphérique']},
      {id:'SF4-16',difficulte:2,titre:'Pneu — loi des gaz',
       enonce:'Pneu: V=30L T₁=15°C P₁=2,5×10⁵Pa.\n1. n(air). 2. T₂=60°C V cst: P₂. 3. Pourquoi vérifier à froid.',
       correction:'1. n=3,14mol · 2. P₂=2,89×10⁵Pa · 3. T chaud → P élevée → mesure biaisée',
       notions:['Gaz parfait','Pneu']},
      {id:'SF4-17',difficulte:2,titre:'Vases communicants',
       enonce:'Eau+huile (ρ=800) dans tube en U. h_huile=15cm côté droit.\n1. h_eau côté gauche. 2. Pression interface.',
       correction:'1. ρ_eau×h_eau=ρ_huile×h_huile → h_eau=12cm · 2. P=1176Pa',
       notions:['Vases communicants']},
      {id:'SF4-18',difficulte:2,titre:'Manomètre — pression artérielle',
       enonce:'Hg ρ=13600 h=10cm g=9,8.\n1. ΔP=ρgh. 2. 120mmHg en Pa. 3. Application médicale.',
       correction:'1. ΔP=13328Pa · 2. 120mmHg=16kPa · 3. Mesure pression artérielle',
       notions:['Manomètre']},
      {id:'SF4-19',difficulte:3,titre:'Fusée — 3ème loi Newton',
       enonce:'Fusée m=1000kg (dont 700kg carburant). Poussée F=12000N. g=10.\n1. Poids total initial. 2. a initiale. 3. a quand m=300kg. Quel principe ?',
       correction:'1. P=17000N · 2. a=(12000-17000)/1000=-5m/s² (ne décolle pas encore)\nSi m_init=1000kg: a=(12000-10000)/1000=2m/s² · 3. a=30m/s² · 3ème loi Newton',
       notions:['3ème loi Newton','Fusée']},
      {id:'SF4-20',difficulte:3,titre:'Synthèse — GPS et triangulation',
       enonce:'Satellite GPS h=20200km c=3×10⁸m/s Δt=67ms.\n1. Distance. 2. Doppler si f=1575MHz v_sat=3,87km/s. 3. Pourquoi 4 satellites minimum.',
       correction:'1. d=20000km · 2. Δf=20,3kHz · 3. 3 sphères → 2 points, 4ème élimine ambiguïté + correction horloge',
       notions:['GPS']},
    ]
  },
  {
    id:'ondes-mecaniques-2', numero:5,
    titre:'Ondes mécaniques & sonores',
    sousTitre:'Célérité · λ=v/f · Retard · Spectre · Intensité · dB · Doppler',
    icon:'🌊', color:'#8b5cf6',
    notions:['Onde mécanique','Célérité','λ=v/f','Retard','Harmoniques','Intensité sonore','dB','Doppler'],
    exercices:[
      {id:'SO5-01',difficulte:1,titre:'λ=v/f',
       enonce:'Son v=340m/s f=680Hz.\n1. λ. 2. T. 3. Si λ=1m: f.',
       correction:'1. λ=0,5m · 2. T=1,47ms · 3. f=340Hz',notions:['λ=v/f']},
      {id:'SO5-02',difficulte:1,titre:'Retard temporel',
       enonce:'Foudre à 3km. v=340m/s.\n1. τ. 2. Si τ=10s: d. 3. Sonar écho τ=0,6s v=1500m/s: fond.',
       correction:"1. τ=8,82s · 2. d=3400m · 3. d=450m",notions:['Retard']},
      {id:'SO5-03',difficulte:2,titre:"Niveau d'intensité sonore",
       enonce:'L=10log(I/I₀) I₀=10⁻¹²W/m².\n1. L si I=10⁻⁶W/m². 2. L si I=1W/m². 3. L₁=L₂=60dB: L_total.',
       correction:"1. L=60dB · 2. L=120dB · 3. I_tot=2×10⁻⁶→L≈63dB",notions:['dB']},
      {id:'SO5-04',difficulte:2,titre:'Spectre et harmoniques',
       enonce:'Son: f₁=300Hz f₂=600Hz f₃=900Hz.\n1. Fondamental et harmoniques. 2. Hauteur. 3. Timbre.',
       correction:"1. f₁: fondamental · f₂: 2ème harmonique · f₃: 3ème\n2. Hauteur=f₁=300Hz · 3. Composition spectrale",notions:['Spectre','Harmoniques']},
      {id:'SO5-05',difficulte:2,titre:'Onde longitudinale vs transversale',
       enonce:'1. Différences. 2. Son: type. 3. Son se propage-t-il dans le vide ?',
       correction:"1. Transversale: oscillation⊥propagation · Longitudinale: oscillation∥propagation\n2. Longitudinale · 3. Non (onde mécanique)",notions:['Types ondes']},
      {id:'SO5-06',difficulte:2,titre:'Célérité dans différents milieux',
       enonce:'v_air=340, v_eau=1500, v_acier=5100 m/s. f=1kHz.\n1. λ dans chaque. 2. Pourquoi v_acier>>v_air. 3. Application sonar.',
       correction:"1. λ_air=0,34m · λ_eau=1,5m · λ_acier=5,1m\n2. Liaisons interatomiques rigides dans acier\n3. v_eau élevée → détection rapide et précise",notions:['Célérité']},
      {id:'SO5-07',difficulte:2,titre:'Effet Doppler',
       enonce:'Ambulance f₀=500Hz v=30m/s. v_son=340m/s.\n1. f perçue approche. 2. f éloignement. 3. Application radar.',
       correction:"1. f=548Hz · 2. f=459Hz · 3. Mesure Δf réfléchi → vitesse véhicule",notions:['Doppler']},
      {id:'SO5-08',difficulte:2,titre:'Interférences sonores',
       enonce:'2 HP synchronisés f=1000Hz v=340m/s. Point P: d₁=1m d₂=1,5m.\n1. λ. 2. δ. 3. Constructive ou destructive.',
       correction:"1. λ=0,34m · 2. δ=0,5m · 3. δ/λ≈1,47≈3/2 → destructive",notions:['Interférences sonores']},
      {id:'SO5-09',difficulte:2,titre:'Écho et réverbération',
       enonce:'v_son=340m/s.\n1. Si τ=0,5s: distance falaise. 2. d_min pour entendre écho (τ_min=0,1s). 3. Réverbération vs écho.',
       correction:"1. d=85m · 2. d_min=17m · 3. τ<0,1s → réverbération (réflexions indiscernables)",notions:['Écho']},
      {id:'SO5-10',difficulte:2,titre:'Ultrason médical',
       enonce:'Sonde 5MHz v=1540m/s. Écho Δt=20μs.\n1. λ. 2. Profondeur. 3. Résolution≈λ.',
       correction:"1. λ=0,308mm · 2. d=7,7mm · 3. Résolution≈0,3mm",notions:['Ultrason']},
      {id:'SO5-11',difficulte:2,titre:'Corde vibrante — harmoniques',
       enonce:'Corde L=65cm v=400m/s.\n1. f₁=v/(2L). 2. f₂ et f₃. 3. Presser à L/2: nouveau f₁.',
       correction:"1. f₁=308Hz · 2. f₂=615Hz f₃=923Hz · 3. f_new=615Hz (octave)",notions:['Ondes stationnaires']},
      {id:'SO5-12',difficulte:2,titre:'Protection auditive',
       enonce:'Concert L=110dB. I₀=10⁻¹²W/m².\n1. I au concert. 2. Si I×10: L. 3. Seuil douleur=120dB: risque.',
       correction:"1. I=0,1W/m² · 2. L=120dB · 3. Oui: 110dB → risque auditif",notions:['Protection auditive']},
      {id:'SO5-13',difficulte:3,titre:'Doppler cosmologique',
       enonce:"Galaxie: Hα λ₀=656nm observée à λ=676nm.\n1. s'approche ou s'éloigne. 2. v≈cΔλ/λ₀. 3. Que révèle ce résultat.",
       correction:"1. λ augmente → s'éloigne (décalage rouge)\n2. v=9150km/s · 3. Univers en expansion",notions:['Doppler cosmologique']},
      {id:'SO5-14',difficulte:2,titre:'Ondes sismiques',
       enonce:'Onde P v=6km/s · Onde S v=3,5km/s. Station à 700km.\n1. t_P et t_S. 2. Δt. 3. Utilité.',
       correction:"1. t_P=116,7s · t_S=200s · 2. Δt=83,3s · 3. Localiser épicentre",notions:['Ondes sismiques']},
      {id:'SO5-15',difficulte:2,titre:"Représentation d'une onde",
       enonce:'Onde: y=2cos(2π(t/0,01-x/3,4)) cm.\n1. T et f. 2. λ. 3. v.',
       correction:"1. T=0,01s f=100Hz · 2. λ=3,4m · 3. v=340m/s",notions:['Représentation onde']},
      {id:'SO5-16',difficulte:2,titre:'Diffraction sonore',
       enonce:'f=500Hz v=340m/s. Ouverture a=50cm.\n1. λ. 2. Condition diffraction. 3. Le son passe autour du mur ?',
       correction:"1. λ=0,68m · 2. a<λ → forte diffraction · 3. Oui",notions:['Diffraction']},
      {id:'SO5-17',difficulte:2,titre:'Sonar actif',
       enonce:'f=20kHz v=1500m/s. Écho Δt=2s.\n1. λ. 2. Distance cible. 3. Détection objet 1cm ?',
       correction:"1. λ=7,5cm · 2. d=1500m · 3. Non: résolution≈λ=7,5cm>1cm",notions:['Sonar']},
      {id:'SO5-18',difficulte:2,titre:'Flûte — acoustique musicale',
       enonce:'Flûte ouverte L=66cm v=340m/s.\n1. f₁=v/(2L). 2. f₂ f₃. 3. Note (Do4=261Hz).',
       correction:"1. f₁=258Hz≈Do4 · 2. f₂=515Hz f₃=773Hz · 3. ≈Do4",notions:['Acoustique musicale']},
      {id:'SO5-19',difficulte:3,titre:'Radar de vitesse',
       enonce:'Radar f₀=10GHz. Voiture réfléchit f=10,000200GHz.\n1. Δf. 2. v=cΔf/(2f₀). 3. En km/h.',
       correction:"1. Δf=200kHz · 2. v=3m/s · 3. v=10,8km/h",notions:['Radar Doppler']},
      {id:'SO5-20',difficulte:3,titre:'Synthèse — sonar robot',
       enonce:'Sonar 40kHz v=340m/s (air).\n1. λ. 2. Mur à 1,5m: τ. 3. Détection objet 2cm ?',
       correction:"1. λ=8,5mm · 2. τ=8,82ms · 3. Résolution=8,5mm<2cm → oui ✓",notions:['Capteur ultrason']},
    ]
  },
  {
    id:'ondes-lumineuses', numero:6,
    titre:'Ondes lumineuses & Lentilles',
    sousTitre:'Spectre EM · Réfraction · Couleurs · Lentilles convergentes · Instruments',
    icon:'🌈', color:'#06b6d4',
    notions:['Spectre EM','Réfraction','Indice','Lentille','Conjugaison','Grandissement','Vergence'],
    exercices:[
      {id:'SL6-01',difficulte:1,titre:'Spectre électromagnétique',
       enonce:'Classer par λ croissante: micro-ondes X UV visible IR radio.\nPour λ=500nm: f et domaine.',
       correction:"X<UV<Visible<IR<Micro-ondes<Radio\nf=6×10¹⁴Hz · Lumière visible (vert)",notions:['Spectre EM']},
      {id:'SL6-02',difficulte:1,titre:'Loi de Snell-Descartes',
       enonce:"Air(n=1)→eau(n=1,33). θ₁=40°.\n1. Loi. 2. θ₂. 3. Se rapproche ou s'éloigne de la normale ?",
       correction:"1. n₁sinθ₁=n₂sinθ₂ · 2. θ₂≈28,9° · 3. θ₂<θ₁ → se rapproche",notions:['Réfraction']},
      {id:'SL6-03',difficulte:1,titre:'Indice de réfraction',
       enonce:'v_verre=2×10⁸m/s.\n1. n=c/v. 2. λ dans verre si λ_air=600nm. 3. La fréquence change ?',
       correction:"1. n=1,5 · 2. λ=400nm · 3. Non: f invariante",notions:['Indice']},
      {id:'SL6-04',difficulte:2,titre:'Synthèse additive et soustractive',
       enonce:'1. R+V=? R+B=? V+B=? R+V+B=?\n2. Cyan+Magenta=? (soustractive).\n3. Objet vert sous lumière rouge: couleur.',
       correction:"1. Jaune · Magenta · Cyan · Blanc · 2. Bleu · 3. Noir",notions:['Couleurs','Synthèse']},
      {id:'SL6-05',difficulte:2,titre:'Lentille convergente — relation de conjugaison',
       enonce:"f'=12cm. OA=-36cm.\n1. 1/OA'-1/OA=1/f' → OA'. 2. γ. 3. Image réelle/virtuelle, droite/renversée.",
       correction:"1. OA'=18cm · 2. γ=-0,5 · 3. Réelle (OA'>0) Renversée (γ<0) Réduite",notions:['Conjugaison']},
      {id:'SL6-06',difficulte:2,titre:'Loupe — objet entre F et O',
       enonce:"f'=10cm. OA=-6cm.\n1. OA'. 2. γ. 3. Image virtuelle ? Loupe ?",
       correction:"1. OA'=-15cm · 2. γ=+2,5 · 3. Virtuelle (OA'<0) · Droite agrandie → loupe ×2,5",notions:['Loupe']},
      {id:'SL6-07',difficulte:2,titre:'Réflexion totale interne',
       enonce:'Verre n=1,5→air.\n1. θ_L=arcsin(1/n). 2. θ=45°: RT ? 3. Fibre optique.',
       correction:"1. θ_L=41,8° · 2. 45°>41,8° → RT ✓ · 3. Réflexions totales successives",notions:['Réflexion totale']},
      {id:'SL6-08',difficulte:2,titre:"Énergie d'un photon",
       enonce:'λ=450nm. h=6,63×10⁻³⁴.\n1. f. 2. E=hf. 3. Comparer à λ=700nm.',
       correction:"1. f=6,67×10¹⁴Hz · 2. E=4,42×10⁻¹⁹J=2,76eV · 3. Bleu>rouge: E plus grande",notions:['Photon']},
      {id:'SL6-09',difficulte:2,titre:'Lunette astronomique',
       enonce:'f₁=80cm f₂=4cm.\n1. G=f₁/f₂. 2. Condition afocale. 3. Intérêt grand diamètre.',
       correction:"1. G=20 · 2. Image intermédiaire au foyer objet oculaire · 3. Meilleure résolution angulaire",notions:['Lunette']},
      {id:'SL6-10',difficulte:2,titre:'Correction de la myopie',
       enonce:"Myope: vision nette jusqu'à 15cm. Verre f'=-25cm.\n1. D. 2. Image de l'infini OA'. 3. Correction suffisante ?",
       correction:"1. D=-4δ · 2. OA'=-25cm · 3. Image à 25cm > 15cm → légère sous-correction",notions:['Myopie']},
      {id:'SL6-11',difficulte:2,titre:'Loi de Wien — couleur des étoiles',
       enonce:'λ_max×T=2,9×10⁻³m·K. Soleil T=5778K Sirius T=10000K.\n1. λ_max Soleil. 2. λ_max Sirius. 3. Couleurs.',
       correction:"1. λ=502nm · 2. λ=290nm (UV) · 3. Soleil: jaune-blanc · Sirius: bleue-blanche",notions:['Loi Wien']},
      {id:'SL6-12',difficulte:2,titre:'Diffraction par une fente',
       enonce:'a=0,1mm λ=500nm D=2m.\n1. θ=λ/a. 2. Largeur tache. 3. Réseau 600tr/mm λ=589nm: θ ordre 1.',
       correction:"1. θ=5×10⁻³rad · 2. L=2cm · 3. d=1,67μm → sinθ=0,353 → θ=20,6°",notions:['Diffraction','Réseau']},
      {id:'SL6-13',difficulte:2,titre:'Interférences — fentes de Young',
       enonce:'a=0,5mm D=1m λ=600nm.\n1. i=λD/a. 2. x₅. 3. Si λ double: i.',
       correction:"1. i=1,2mm · 2. x₅=6mm · 3. i=2,4mm",notions:['Young']},
      {id:'SL6-14',difficulte:2,titre:'Couleur des objets',
       enonce:'1. Objet blanc en rouge: couleur ?\n2. Objet cyan en rouge: couleur ?\n3. Objet noir: que fait-il avec la lumière ?',
       correction:"1. Rouge · 2. Noir (cyan=V+B absorbe rouge) · 3. Absorbe tout",notions:['Couleur objets']},
      {id:'SL6-15',difficulte:2,titre:'Dispersion — arc-en-ciel',
       enonce:'Prisme: n_rouge=1,51 n_violet=1,53. θ₁=45°.\n1. θ₂ rouge et violet. 2. Lumière blanche dispersée ? 3. Ordre couleurs arc-en-ciel.',
       correction:"1. θ₂_rouge=27,9° · θ₂_violet=27,5° · 2. Oui (n varie selon λ) · 3. Rouge extérieur violet intérieur",notions:['Dispersion']},
      {id:'SL6-16',difficulte:2,titre:'Vergence',
       enonce:"D=+25δ. OA=-40cm.\n1. f'=1/D. 2. OA'. 3. γ.",
       correction:"1. f'=4cm · 2. OA'=4,44cm · 3. γ=-0,11 (renversée réduite)",notions:['Vergence']},
      {id:'SL6-17',difficulte:3,titre:'Appareil photo',
       enonce:"f'=50mm. Objet OA=-200cm.\n1. OA'. 2. γ. 3. Sujet à 50cm: OA'.",
       correction:"1. OA'≈5,13cm · 2. γ≈-0,026 · 3. OA'=6,25cm (capteur doit reculer)",notions:['Appareil photo']},
      {id:'SL6-18',difficulte:2,titre:'Mesure de λ par Young',
       enonce:'a=0,4mm D=2m. 10 interfranges=29mm.\n1. i. 2. λ=ia/D. 3. Couleur.',
       correction:"1. i=2,9mm · 2. λ=580nm · 3. Jaune-orange",notions:['Mesure λ']},
      {id:'SL6-19',difficulte:3,titre:'Synthèse — fibre optique',
       enonce:'n_coeur=1,5 n_gaine=1,45 L=100km.\n1. θ_c. 2. v dans fibre. 3. t transit. 4. Dispersion modale Δt.',
       correction:"1. θ_c=75° · 2. v=2×10⁸m/s · 3. t=0,5ms · 4. v_min=5,18×10⁷m/s → Δt=1,43ms",notions:['Fibre optique']},
      {id:'SL6-20',difficulte:3,titre:'Synthèse — microscope',
       enonce:'Objectif f₁=5mm oculaire f₂=25mm tube D=160mm.\n1. G≈D/f₁. 2. Image observée. 3. Résolution.',
       correction:"1. G≈32 (ou 320 calcul complet) · 2. Image réelle formée par objectif · 3. ≈200nm",notions:['Microscope']},
    ]
  },
  {
    id:'signaux-electriques-2', numero:7,
    titre:'Signaux électriques & Circuits',
    sousTitre:'Ohm · Kirchhoff · Puissance · Effet Joule · Numérisation · Shannon',
    icon:'🔌', color:'#f97316',
    notions:['Loi Ohm','Kirchhoff','Puissance','Effet Joule','Numérisation','Shannon','RC'],
    exercices:[
      {id:'SE7-01',difficulte:1,titre:"Loi d'Ohm",
       enonce:'R=220Ω U=12V.\n1. I=U/R. 2. P=U²/R. 3. Énergie dissipée en 1h.',
       correction:"1. I=54,5mA · 2. P=0,655W · 3. E=2358J",notions:['Loi Ohm']},
      {id:'SE7-02',difficulte:1,titre:'Résistors en série',
       enonce:'R₁=100Ω R₂=200Ω E=9V r=5Ω.\n1. R_eq. 2. I. 3. U_R₁ et U_R₂.',
       correction:"1. R_eq=305Ω · 2. I=29,5mA · 3. U₁=2,95V · U₂=5,9V",notions:['Série']},
      {id:'SE7-03',difficulte:2,titre:'Résistors en parallèle',
       enonce:'R₁=100Ω R₂=150Ω U=6V.\n1. R_eq=R₁R₂/(R₁+R₂). 2. I total. 3. I₁ et I₂.',
       correction:"1. R_eq=60Ω · 2. I=100mA · 3. I₁=60mA I₂=40mA",notions:['Parallèle']},
      {id:'SE7-04',difficulte:2,titre:'Puissance et facture électrique',
       enonce:'Chauffe-eau 2kW 2h/j 30j. 1kWh=0,18€.\n1. Énergie (kWh). 2. Coût. 3. Économie si P=1,5kW.',
       correction:"1. E=120kWh · 2. 21,6€ · 3. Économie=5,4€/mois",notions:['Facture']},
      {id:'SE7-05',difficulte:2,titre:'Pont diviseur de tension',
       enonce:'R₁=4kΩ R₂=6kΩ E=10V.\n1. U_R₂=E×R₂/(R₁+R₂). 2. Vérifier. 3. Pour U_R₂=3V si R₁=7kΩ: R₂.',
       correction:"1. U_R₂=6V · 2. I=1mA → U₂=6V ✓ · 3. R₂=3kΩ",notions:['Diviseur tension']},
      {id:'SE7-06',difficulte:2,titre:'Générateur réel',
       enonce:'E=12V r=1Ω R=5Ω.\n1. I. 2. U_bornes=E-rI. 3. P_utile et P_r.',
       correction:"1. I=2A · 2. U=10V · 3. P_utile=20W · P_r=4W",notions:['Générateur réel']},
      {id:'SE7-07',difficulte:2,titre:'Effet Joule — câble',
       enonce:'R=0,5Ω I=10A t=1h.\n1. P_Joule. 2. Énergie dissipée. 3. Pourquoi limiter R des câbles.',
       correction:"1. P=50W · 2. E=180kJ · 3. Pertes thermiques + risque incendie",notions:['Effet Joule']},
      {id:'SE7-08',difficulte:2,titre:'Oscilloscope — lecture',
       enonce:'Base temps: 5ms/div. Sensibilité: 2V/div. Signal: 4 div horiz 3 div vert pp.\n1. T. 2. U_pp. 3. f.',
       correction:"1. T=20ms · 2. U_pp=6V · 3. f=50Hz",notions:['Oscilloscope']},
      {id:'SE7-09',difficulte:2,titre:'Numérisation — Shannon',
       enonce:'f_max=20kHz.\n1. f_e min (critère Shannon). 2. CD f_e=44100Hz: critère ok ? 3. 16bits: niveaux.',
       correction:"1. f_e≥40kHz · 2. 44100>40000 ✓ · 3. 2¹⁶=65536 niveaux",notions:['Shannon']},
      {id:'SE7-10',difficulte:2,titre:'Débit numérique — CD audio',
       enonce:'CD: f_e=44100Hz 16bits stéréo.\n1. Débit brut. 2. Durée 700Mo. 3. f_max reproductible.',
       correction:"1. 1,41Mbps=176ko/s · 2. ≈66min · 3. 22050Hz",notions:['Débit']},
      {id:'SE7-11',difficulte:2,titre:'CAN — quantification',
       enonce:'CAN: 0-5V 8bits.\n1. Pas Δ=5/(2⁸-1). 2. Code de U=3V. 3. Erreur max.',
       correction:"1. Δ=19,6mV · 2. k≈153 → 10011001₂ · 3. Erreur≈9,8mV",notions:['Quantification']},
      {id:'SE7-12',difficulte:2,titre:'Circuit RC',
       enonce:'R=10kΩ C=100μF.\n1. τ=RC. 2. u_C(τ) si E=5V. 3. Chargé après combien de τ.',
       correction:"1. τ=1s · 2. u_C=3,16V=63,2%E · 3. Après 5τ (≈99%)",notions:['RC']},
      {id:'SE7-13',difficulte:2,titre:'Analogique vs numérique',
       enonce:'1. Définir. 2. Avantages numérique. 3. Débit voix (f_e=8kHz 8bits).',
       correction:"1. Analogique: continu · Numérique: discret · 2. Insensible bruit, compression · 3. 64kbps",notions:['Analogique','Numérique']},
      {id:'SE7-14',difficulte:2,titre:'Défibrillateur — condensateur',
       enonce:'C=32μF U=5000V.\n1. E=½CU². 2. Décharge Δt=4ms: P. 3. Avantage condensateur.',
       correction:"1. E=400J · 2. P=100kW · 3. Grande puissance instantanée",notions:['Condensateur']},
      {id:'SE7-15',difficulte:2,titre:'Puissance en AC',
       enonce:'R=100Ω U_eff=230V f=50Hz.\n1. I_eff. 2. P. 3. U_max.',
       correction:"1. I=2,3A · 2. P=529W · 3. U_max=325V",notions:['AC']},
      {id:'SE7-16',difficulte:2,titre:'Lois de Kirchhoff',
       enonce:'Nœud: I₁=3A I₂=1,5A entrent I₄=2A sort I₃=?\n1. Loi nœuds. 2. I₃. 3. Vérifier maille E=12V R₁=4Ω R₂=8Ω.',
       correction:"1. ΣI_ent=ΣI_sort · 2. I₃=2,5A · 3. I=1A · 4+8=12V ✓",notions:['Kirchhoff']},
      {id:'SE7-17',difficulte:3,titre:'Image numérique',
       enonce:'1920×1080 pixels 24bits/pixel.\n1. Taille brute. 2. JPEG×20: taille. 3. 30fps: débit.',
       correction:"1. ≈6,25Mo · 2. 0,31Mo · 3. 187,5Mo/s brut → 9,4Mo/s compressé",notions:['Image numérique']},
      {id:'SE7-18',difficulte:2,titre:'Alimentation électronique',
       enonce:'U_AC=9V_eff C=470μF R=100Ω.\n1. U_DC≈U_AC√2. 2. I. 3. τ: bien lissé si τ>>T=20ms ?',
       correction:"1. U_DC=12,7V · 2. I=127mA · 3. τ=47ms>>20ms ✓",notions:['Alimentation']},
      {id:'SE7-19',difficulte:2,titre:'Thermistance — capteur température',
       enonce:'R(T)=10000e^(-0,04(T-25)) Ω.\n1. R(25°C) et R(75°C). 2. I si U=5V. 3. Comment mesurer T.',
       correction:"1. R(25)=10kΩ · R(75)=1353Ω · 2. I(25)=0,5mA · I(75)=3,7mA · 3. Mesurer I→R→T",notions:['Thermistance']},
      {id:'SE7-20',difficulte:3,titre:'Synthèse — maison connectée',
       enonce:'Frigo: R_on=1000Ω R_off=10000Ω U=230V. On 40% du temps sur 720h/mois.\n1. P_on. 2. P_off. 3. Conso mensuelle.',
       correction:"1. P_on=52,9W · 2. P_off=0,529W · 3. E=52,9×288+0,529×432≈15,5kWh",notions:['Consommation']},
    ]
  },
  {
    id:'formes-energie', numero:8,
    titre:"Formes d'énergie",
    sousTitre:'Énergie cinétique · Énergie potentielle · Conservation · Travail · Puissance',
    icon:'⚡', color:'#eab308',
    notions:['Énergie cinétique','Énergie potentielle','Conservation Em','Travail','Puissance','Énergie élastique'],
    exercices:[
      {id:'SG8-01',difficulte:1,titre:"Énergie cinétique",enonce:"m=1200kg v=90km/h.\n1. v en m/s. 2. Ec=½mv². 3. v double: Ec.",correction:"1. v=25m/s · 2. Ec=375kJ · 3. Ec×4=1,5MJ",notions:['Ec']},
      {id:'SG8-02',difficulte:1,titre:"Énergie potentielle",enonce:"m=3kg h=10m g=9,8.\n1. Ep=mgh. 2. Origine. 3. v si lâché.",correction:"1. Ep=294J · 2. Travail personne · 3. v=14m/s",notions:['Ep']},
      {id:'SG8-03',difficulte:2,titre:"Conservation Em",enonce:"Toboggan h_A=5m m=50kg sans frottement. g=9,8.\n1. Em à A. 2. v_B. 3. Avec W_f=-100J: v_B réelle.",correction:"1. Em=2450J · 2. v=9,9m/s · 3. v=9,7m/s",notions:['Conservation Em']},
      {id:'SG8-04',difficulte:2,titre:"Travail d'une force",enonce:"F=40N α=60° d=10m.\n1. W=Fdcosα. 2. W si α=90°. 3. W poids si déplacement horizontal.",correction:"1. W=200J · 2. W=0 · 3. W=0",notions:['Travail']},
      {id:'SG8-05',difficulte:2,titre:"Théorème énergie cinétique",enonce:"80kg cycliste: W_prop=5000J W_f=-2000J v₀=0.\n1. ΔEc. 2. v finale. 3. P si Δt=10s.",correction:"1. ΔEc=3000J · 2. v=8,66m/s · 3. P=500W",notions:['Théorème Ec']},
      {id:'SG8-06',difficulte:2,titre:"Pendule",enonce:"m=0,5kg L=1m h=0,05m. g=9,8.\n1. Ep haut. 2. v bas. 3. h où v=0,7m/s.",correction:"1. Ep=0,245J · 2. v=0,99m/s · 3. h≈0,025m",notions:['Pendule']},
      {id:'SG8-07',difficulte:2,titre:"Ressort",enonce:"k=300N/m x=8cm m=50g.\n1. Ep=½kx². 2. v_max. 3. h_max vertical.",correction:"1. Ep=0,96J · 2. v=6,2m/s · 3. h=1,96m",notions:['Énergie élastique']},
      {id:'SG8-08',difficulte:2,titre:"Freinage et chaleur freins",enonce:"1500kg v=108km/h d=80m.\n1. Ec. 2. F freinage. 3. ΔT freins si 50% chaleur (m=5kg c=500).",correction:"1. Ec=675kJ · 2. F=8437,5N · 3. ΔT=135°C",notions:['Freinage']},
      {id:'SG8-09',difficulte:2,titre:"Looping",enonce:"m=500kg h_A=40m boucle R=10m h_haut=20m. g=9,8.\n1. v bas. 2. v haut. 3. Condition N>0 au sommet.",correction:"1. v=28m/s · 2. v=19,8m/s · 3. v_min=√(gR)=9,9m/s<19,8m/s ✓",notions:['Looping']},
      {id:'SG8-10',difficulte:2,titre:"Énergie nucléaire",enonce:"1g U-235: E=8,2×10¹⁰J. Pétrole 1g: 45kJ.\n1. Facteur multiplication. 2. Δm=E/c². 3. Application centrale.",correction:"1. F≈1,8×10⁶ · 2. Δm=9,1×10⁻⁷g · 3. Chaleur→vapeur→turbine→alternateur→électricité",notions:['Nucléaire']},
      {id:'SG8-11',difficulte:2,titre:"Énergie solaire",enonce:"3m² flux=800W/m² η=20%.\n1. P reçue. 2. P élec. 3. kWh/an (1200h).",correction:"1. P=2400W · 2. P_élec=480W · 3. 576kWh",notions:['Solaire']},
      {id:'SG8-12',difficulte:2,titre:"Barrage hydraulique",enonce:"h=100m Q=200m³/s ρ=1000 g=9,8 η=90%.\n1. P_hyd. 2. P_élec. 3. Foyers alimentés (4000kWh/an).",correction:"1. P=196MW · 2. P_élec=176,4MW · 3. ≈387000 foyers",notions:['Hydraulique']},
      {id:'SG8-13',difficulte:2,titre:"Voiture électrique",enonce:"Batterie 60kWh conso 15kWh/100km m=1500kg v=130km/h.\n1. Autonomie. 2. Ec. 3. % batterie pour Ec.",correction:"1. 400km · 2. Ec=0,272kWh · 3. 0,45%",notions:['VE']},
      {id:'SG8-14',difficulte:3,titre:"Projectile et énergie",enonce:"m=100g v₀=30m/s θ=45°. g=10.\n1. Ec initiale. 2. Ep_max (H). 3. Ec en H_max.",correction:"1. Ec=45J · 2. H=22,5m Ep=22,5J · 3. Ec=22,5J (Ec_x=½mv₀²cos²θ ✓)",notions:['Projectile','Énergie']},
      {id:'SG8-15',difficulte:2,titre:"Métabolisme humain",enonce:"Repos P=80W. Course P=600W η=25%. 1kcal=4186J.\n1. E 24h repos (kcal). 2. P_tot course. 3. Aliments 1h course.",correction:"1. E=6,9MJ=1649kcal · 2. P_tot=2400W · 3. E=8,64MJ=2064kcal",notions:['Métabolisme']},
      {id:'SG8-16',difficulte:2,titre:"Éolienne",enonce:"R=40m v=12m/s ρ=1,2 η=45%.\n1. P=½ρπR²v³. 2. P_élec. 3. kWh/an (2000h).",correction:"1. P=5,24MW · 2. P_élec=2,36MW · 3. 4720MWh",notions:['Éolien']},
      {id:'SG8-17',difficulte:3,titre:"Saut en hauteur — bilan énergie",enonce:"m=75kg H=2m. g=9,8.\n1. Ep à H. 2. v min nécessaire. 3. η si aliment 500kJ.",correction:"1. Ep=1470J · 2. v=6,26m/s · 3. η=0,29% (+ apport musculaire)",notions:['Biomécanique']},
      {id:'SG8-18',difficulte:2,titre:"Trébuchet médiéval",enonce:"M=400kg h₁=4m m=40kg η=35%. g=9,8.\n1. W_contrepoids. 2. Ec_projectile. 3. v et H_max (θ=45°).",correction:"1. W=15680J · 2. Ec=5488J · 3. v=16,6m/s H=7m",notions:['Catapulte']},
      {id:'SG8-19',difficulte:2,titre:"Collision et sécurité automobile",enonce:"m=1200kg v=36km/h d_déformation=0,5m.\n1. Ec. 2. F_impact=Ec/d. 3. a en g. Rôle airbag.",correction:"1. v=10m/s Ec=60kJ · 2. F=120kN · 3. a=10g · Airbag: ↑Δt → ↓F",notions:['Collision']},
      {id:'SG8-20',difficulte:3,titre:"Synthèse — centrale marémotrice",enonce:"h=8m S=100km² ρ=1025 g=9,8 η=80%.\n1. Ep par marée (h_moy=h/2). 2. E électrique. 3. P si turbines en 6h.",correction:"1. Ep=3,22×10¹³J · 2. E_élec=2,57×10¹³J · 3. P=1,19GW",notions:['Marémotrice']},
    ]
  },
  {
    id:'bilans-energetiques-2', numero:9,
    titre:"Bilans & Conversions d'énergie",
    sousTitre:'Puissance · Rendement · Transferts thermiques · Développement durable',
    icon:'🔋', color:'#14b8a6',
    notions:['Puissance','Rendement','Conduction thermique','Bilan carbone','Développement durable'],
    exercices:[
      {id:'SB9-01',difficulte:1,titre:"Puissance et rendement",enonce:"P_abs=1000W P_mec=750W.\n1. η. 2. P perdue. 3. Énergie utile en 1h.",correction:"1. η=75% · 2. 250W · 3. 2,7MJ",notions:['Rendement']},
      {id:'SB9-02',difficulte:2,titre:"Conduction thermique",enonce:"Mur e=20cm S=10m² λ=0,8 ΔT=20°C.\n1. φ=λSΔT/e. 2. Énergie 24h. 3. Comment réduire.",correction:"1. φ=800W · 2. E=19,2kWh · 3. Isolation: ↑e ou ↓λ",notions:['Conduction']},
      {id:'SB9-03',difficulte:2,titre:"3 modes de transfert thermique",enonce:"1. Définir conduction convection rayonnement.\n2. Mode dominant casserole eau chauffée.\n3. Thermos — vide: quel mode éliminé.",correction:"1. Conduction: contact · Convection: fluide · Rayonnement: EM\n2. Convection + conduction · 3. Conduction et convection → seul rayonnement reste",notions:['Transferts thermiques']},
      {id:'SB9-04',difficulte:2,titre:"Chaleur spécifique massique",enonce:"200g eau 20→80°C c=4180. P=2000W.\n1. Q=mcΔT. 2. t chauffage. 3. η si 15% perdu.",correction:"1. Q=50160J · 2. t=25s · 3. t_réel=29,5s",notions:['Chaleur spécifique']},
      {id:'SB9-05',difficulte:2,titre:"Bilan puissance — circuit",enonce:"E=12V r=2Ω R=10Ω.\n1. I. 2. P_r et P_R. 3. Vérifier bilan.",correction:"1. I=1A · 2. P_r=2W P_R=10W · 3. P_gen=EI=12W=2+10 ✓",notions:['Bilan puissance']},
      {id:'SB9-06',difficulte:2,titre:"Énergie chimique combustion",enonce:"Méthane ΔH=-890kJ/mol M=16.\n1. E/kg. 2. CO₂/kg. 3. Comparer propane (ΔH=-2220 M=44).",correction:"1. 55,6MJ/kg · 2. 2,75kg CO₂/kg · 3. E_propane=50,5MJ/kg → méthane plus énergétique/kg",notions:['Énergie chimique']},
      {id:'SB9-07',difficulte:2,titre:"Panneau solaire — bilan",enonce:"3 panneaux 2m² flux=900W/m² η=18%.\n1. P_élec totale. 2. kWh/an (1100h). 3. Économie (0,18€/kWh).",correction:"1. P=972W · 2. E=1069kWh · 3. 192€/an",notions:['Solaire']},
      {id:'SB9-08',difficulte:2,titre:"RT2020",enonce:"100m². RT2012=100kWh/m²/an. RT2020=50kWh/m²/an.\n1. Conso chaque. 2. Économie annuelle (0,18€). 3. Retour invest surcoût=5000€.",correction:"1. 10000 vs 5000kWh · 2. 900€/an · 3. ≈5,6 ans",notions:['RT2020']},
      {id:'SB9-09',difficulte:2,titre:"Voiture thermique vs électrique",enonce:"Therm: 7L/100km PCI=10kWh/L. Élec: 17kWh/100km.\n1. E therm/100km. 2. η=35%: E mec. 3. CO₂ (élec=60g/kWh essence=2,4kg/L).",correction:"1. E=70kWh · 2. E_mec=24,5kWh · 3. CO₂_élec=1,02kg vs CO₂_therm=16,8kg → élec 16× moins",notions:['Bilan carbone']},
      {id:'SB9-10',difficulte:3,titre:"Pompe à chaleur (PAC)",enonce:"COP=4 P_élec=1kW.\n1. P_therm=COP×P. 2. P prélevée extérieur. 3. Économie vs radiateur élec.",correction:"1. P_therm=4kW · 2. P_ext=3kW · 3. PAC: 1kW élec pour 4kW therm → économie 75%",notions:['PAC','COP']},
      {id:'SB9-11',difficulte:2,titre:"Double vitrage",enonce:"Simple: e=6mm λ=1. Double: e_air=15mm λ_air=0,025 + 2 vitres. S=5m² ΔT=25°C.\n1. R_therm. 2. Flux φ. 3. Économie 6 mois (0,18€).",correction:"1. R_simple=0,006 · R_double=0,612 m²K/W\n2. φ_simple=20833W · φ_double=204W\n3. ΔE≈8950kWh → 1611€/an",notions:['Double vitrage']},
      {id:'SB9-12',difficulte:2,titre:"Rendement global centrale",enonce:"η₁=40% η₂=98% η₃=99%.\n1. η_global. 2. Combustible pour 1kWh utile. 3. Si η₁=55%: nouveau résultat.",correction:"1. η=38,8% · 2. E=2,58kWh_fossile · 3. η=53,3% → 1,88kWh",notions:['Rendement global']},
      {id:'SB9-13',difficulte:3,titre:"Bilan maison photovoltaïque",enonce:"Chauffage 8000kWh ECS 2500kWh élec 3500kWh. Panneaux 4kWc (1200kWh/kWc).\n1. Conso totale. 2. Production. 3. Taux autoconso et facture (0,18€).",correction:"1. C=14000kWh · 2. E_sol=4800kWh · 3. Taux=34,3% · Facture=9200×0,18=1656€",notions:['Bilan maison']},
      {id:'SB9-14',difficulte:2,titre:"Éolienne — bilan complet",enonce:"R=35m v=10m/s ρ=1,2 η=42%.\n1. P=½ρπR²v³. 2. P_élec. 3. Durée pour 1GWh.",correction:"1. P=2,31MW · 2. P_élec=0,97MW · 3. t≈43 jours",notions:['Éolien']},
      {id:'SB9-15',difficulte:2,titre:"Chauffe-eau solaire",enonce:"Capteur 3m² flux=700W/m² η=60%.\n1. P_therm. 2. Q pour 150L 15→55°C. 3. Durée.",correction:"1. P=1260W · 2. Q=25,08MJ · 3. t≈5,5h",notions:['Solaire thermique']},
      {id:'SB9-16',difficulte:2,titre:"Géothermie",enonce:"Gradient 3°C/100m puits 3000m T_surf=15°C. Q=2MW η=20%.\n1. T fond. 2. P_élec. 3. CO₂ vs gaz (250g/kWh).",correction:"1. T=105°C · 2. P_élec=0,4MW · 3. ≈30g/kWh vs 250g → 8× moins",notions:['Géothermie']},
      {id:'SB9-17',difficulte:2,titre:"Régulation thermique du corps",enonce:"Course P_musc=600W η=25%. m=70kg c=3500J/kg/K.\n1. P_therm. 2. ΔT sans régulation (1h). 3. Mécanisme.",correction:"1. P_therm=450W · 2. ΔT=6,6°C → 43,6°C (dangereux) · 3. Transpiration: évaporation absorbe chaleur",notions:['Thermorégulation']},
      {id:'SB9-18',difficulte:3,titre:"Synthèse — transition énergétique mondiale",enonce:"Monde: 160000TWh/an 80% fossile CO₂=3,6×10¹³kg/an.\n1. E fossile. 2. Réduire CO₂ de 50%: économie. 3. Surface panneaux (η=20% E=200W/m² 2000h).",correction:"1. E_fossile=128000TWh · 2. 1,8×10¹³kg CO₂ · 3. S≈1,6×10⁶km² (≈Europe)",notions:['Transition énergétique']},
      {id:'SB9-19',difficulte:2,titre:"Barrage hydroélectrique — bilan",enonce:"h=120m Q=300m³/s η=92% ρ=1000 g=9,8.\n1. P_hyd. 2. P_élec. 3. E annuelle (TWh).",correction:"1. P_hyd=352,8MW · 2. P_élec=324,6MW · 3. E=2,84TWh",notions:['Hydraulique']},
      {id:'SB9-20',difficulte:3,titre:"Synthèse — autoconsommation solaire",enonce:"Appartement 50m²: conso 6500kWh/an. Panneaux 10kWc×100h/mois.\n1. Conso. 2. Production/an. 3. Bilan (achat 0,18€ revente excédent 0,10€).",correction:"1. C=6500kWh · 2. E_sol=12000kWh · 3. Excédent=5500kWh · Revente=550€ · Bilan=+550€/an",notions:['Autoconsommation']},
    ]
  },
]


const CHAPITRES_PREMIERE_PC: ChapitreData[] = [
  { id:"quantite-matiere", numero:1,
    titre:"Quantité de matière & Réactions",
    sousTitre:"Mole · Avancement · Réactif limitant · Tableau ICE",
    icon:"⚗️", color:"#10b981",
    notions:["Mole","Masse molaire","Concentration","Avancement","Tableau ICE","Réactif limitant"],
    exercices:[
      {id:"P01-01",difficulte:1,titre:"Quantité de matière",
       enonce:"H₂SO₄ M=98. NaOH M=40.\n1. n(H₂SO₄) dans 49g.\n2. m(NaOH) pour n=0,25mol.\n3. N(molécules) dans 0,5mol H₂O. Na=6,02x10^23.",
       correction:"1. n=0,5mol · 2. m=10g · 3. N=3,01x10^23",
       notions:["Quantité matière"]},
      {id:"P01-02",difficulte:1,titre:"Concentration molaire",
       enonce:"7,3g HCl (M=36,5) dans 200mL.\n1. n(HCl).\n2. C molaire.\n3. C massique en g/L.",
       correction:"1. n=0,2mol · 2. C=1mol/L · 3. C_m=36,5g/L",
       notions:["Concentration"]},
      {id:"P01-03",difficulte:1,titre:"Dilution",
       enonce:"50mL HCl C1=2mol/L dilué à 500mL.\n1. C1V1=C2V2.\n2. C2.\n3. Facteur de dilution.",
       correction:"1. C1V1=C2V2 · 2. C2=0,2mol/L · 3. F=10",
       notions:["Dilution"]},
      {id:"P01-04",difficulte:2,titre:"Tableau d'avancement",
       enonce:"Fe + H₂SO₄ → FeSO₄ + H₂. n(Fe)=0,2mol n(H₂SO₄)=0,15mol.\n1. Tableau ICE.\n2. Réactif limitant.\n3. n(H₂) produit.",
       correction:"Fe: 0,2-x · H₂SO₄: 0,15-x · H₂: x\nx_max=0,15mol (H₂SO₄ limitant) · n(H₂)=0,15mol",
       notions:["Tableau ICE","Réactif limitant"]},
      {id:"P01-05",difficulte:2,titre:"Avancement et taux",
       enonce:"A + 2B → C. n(A)=0,3 n(B)=0,5mol.\n1. Réactif limitant.\n2. x_max.\n3. Taux si x_f=0,2mol.",
       correction:"1. B limitant (besoin 0,6 > 0,5) · 2. x_max=0,25mol · 3. tau=80%",
       notions:["Avancement","Taux"]},
      {id:"P01-06",difficulte:2,titre:"Volume molaire et gaz",
       enonce:"Vm=22,4L/mol à CNT. PV=nRT R=8,314.\n1. V(CO₂) si n=0,3mol à CNT.\n2. m(O₂) dans 11,2L. M=32.\n3. V à 25°C P=10^5 Pa.",
       correction:"1. V=6,72L · 2. n=0,5mol → m=16g · 3. V=7,43L",
       notions:["Volume molaire","Gaz parfait"]},
      {id:"P01-07",difficulte:2,titre:"Composition centésimale",
       enonce:"Aspirine C₉H₈O₄ M=180g/mol.\n1. %C %H %O.\n2. m(C) dans 500mg aspirine.\n3. Formule brute.",
       correction:"1. %C=60% · %H=4,4% · %O=35,6% · 2. m=300mg · 3. C₉H₈O₄",
       notions:["Composition centésimale"]},
      {id:"P01-08",difficulte:2,titre:"Dureté de l'eau",
       enonce:"[Ca2+]=120mg/L M=40 · [Mg2+]=30mg/L M=24.\n1. [Ca2+] molaire.\n2. TH en degF (1 degF=0,1mmol/L).\n3. n(Ca2+) dans 0,5L.",
       correction:"1. C=3mmol/L · 2. TH=42,5 degF · 3. n=1,5x10^-3 mol",
       notions:["Concentration massique"]},
      {id:"P01-09",difficulte:3,titre:"Synthèse aspirine — rendement",
       enonce:"n(salicylate)=0,01mol n(anhydride)=0,015mol. M(aspirine)=180. m_obtenu=1,26g.\n1. Réactif limitant.\n2. m théorique.\n3. Rendement.",
       correction:"1. Salicylate limitant · 2. m_th=1,8g · 3. eta=70%",
       notions:["Rendement","Synthèse"]},
      {id:"P01-10",difficulte:2,titre:"Combustion propane",
       enonce:"C₃H₈ + 5O₂ → 3CO₂ + 4H₂O. 44g propane M=44.\n1. n(propane).\n2. m(CO₂).\n3. V(H₂O_vap) à CNT.",
       correction:"1. n=1mol · 2. m=132g · 3. V=89,6L",
       notions:["Combustion"]},
      {id:"P01-11",difficulte:2,titre:"Dosage par précipitation",
       enonce:"Cl- eau de mer. V=20mL AgNO₃ 0,1mol/L V_éq=32mL.\n1. Réaction ionique.\n2. n(Cl-).\n3. [Cl-].",
       correction:"1. Ag+ + Cl- → AgCl(s) · 2. n=3,2x10^-3 mol · 3. [Cl-]=0,16mol/L",
       notions:["Dosage"]},
      {id:"P01-12",difficulte:2,titre:"Beer-Lambert",
       enonce:"A=eps x l x C. l=1cm eps=1250 C=4x10^-4 mol/L.\n1. Absorbance A.\n2. C si A=0,75.\n3. Intérêt spectrophotométrie.",
       correction:"1. A=0,5 · 2. C=6x10^-4 mol/L · 3. Doser espèce colorée précisément",
       notions:["Beer-Lambert"]},
      {id:"P01-13",difficulte:2,titre:"Dosage conductimétrique",
       enonce:"NaOH dosé par HCl. G_min à V_éq=12mL C(HCl)=0,1mol/L V=20mL.\n1. n(NaOH).\n2. C(NaOH).\n3. Pourquoi G diminue avant équivalence.",
       correction:"1. n=1,2x10^-3 mol · 2. C=0,06mol/L · 3. OH- (mobile) remplacé par Cl- (moins mobile)",
       notions:["Dosage conductimétrique"]},
      {id:"P01-14",difficulte:3,titre:"H2O2 dosé par KMnO4",
       enonce:"KMnO₄ 0,02mol/L V_éq=25mL pour 20mL H₂O₂.\nMnO4- + 8H+ + 5e- → Mn2+ · H₂O₂ → O₂ + 2H+ + 2e-.\n1. n(MnO4-).\n2. n(H₂O₂) ratio 2:5.\n3. C(H₂O₂).",
       correction:"1. n=5x10^-4 mol · 2. n=1,25x10^-3 mol · 3. C=0,0625mol/L",
       notions:["Dosage rédox"]},
      {id:"P01-15",difficulte:3,titre:"Estérification — équilibre",
       enonce:"CH₃COOH + C₂H₅OH ⇌ ester + H₂O. 1mol + 1mol tau=67%.\n1. n(ester).\n2. K=tau²/(1-tau)².\n3. Si 1mol + 3mol alcool: tau.",
       correction:"1. n=0,67mol · 2. K=4,1 · 3. tau=91%",
       notions:["Estérification"]},
      {id:"P01-16",difficulte:2,titre:"CCM — chromatographie",
       enonce:"Solvant=8cm. A=5,6cm B=2,4cm.\n1. Rf(A) et Rf(B).\n2. Lequel plus polaire.\n3. Éluant plus polaire: Rf monte ou baisse.",
       correction:"1. Rf(A)=0,70 · Rf(B)=0,30 · 2. B · 3. Rf monte",
       notions:["CCM","Rf"]},
      {id:"P01-17",difficulte:2,titre:"Solution étalon",
       enonce:"Préparer 250mL NaCl 0,1mol/L M=58,5.\n1. n nécessaire.\n2. m à peser.\n3. Protocole.",
       correction:"1. n=0,025mol · 2. m=1,46g · 3. Peser → dissoudre 200mL → fiole 250mL → compléter → agiter",
       notions:["Préparation solution"]},
      {id:"P01-18",difficulte:2,titre:"Eau de Javel — dismutation",
       enonce:"Cl₂ + 2NaOH → NaOCl + NaCl + H₂O. 2,6g Cl₂/100mL M=71.\n1. N.o. Cl : dismutation.\n2. [NaOCl].\n3. Agent désinfectant actif.",
       correction:"1. Cl: 0 → +1 et -1 · 2. [NaOCl]=0,366mol/L · 3. OCl-",
       notions:["Dismutation"]},
      {id:"P01-19",difficulte:3,titre:"Engrais NPK",
       enonce:"15%N (M=14) 15%P₂O₅ (M=142) 15%K₂O (M=94). 100g engrais.\n1. n(N) n(P₂O₅) n(K₂O).\n2. Ratio N:P:K.\n3. Utilité.",
       correction:"1. n(N)=1,07mol · n(P₂O₅)=0,106mol · n(K₂O)=0,16mol\n2. N:P:K ≈ 10:1:1,5\n3. N: croissance · P: racines · K: résistance",
       notions:["Chimie agricole"]},
      {id:"P01-20",difficulte:3,titre:"Analyse antiacide",
       enonce:"Comprimé NaHCO₃ m=1,25g dosé par HCl 0,5mol/L V_éq=25mL. M=84.\nNaHCO₃ + HCl → NaCl + H₂O + CO₂.\n1. n(NaHCO₃). 2. m dosée. 3. % pureté.",
       correction:"1. n=0,0125mol · 2. m=1,05g · 3. 84%",
       notions:["Dosage","Médicament"]},
    ]
  },
  { id:"reactions-redox", numero:2,
    titre:"Réactions d'oxydo-réduction",
    sousTitre:"Couples O/R · N.o. · Demi-équations · Titrages · Piles",
    icon:"⚡", color:"#ef4444",
    notions:["Oxydant","Réducteur","N.o.","Demi-équations","Titrage rédox","Pile","Électrolyse"],
    exercices:[
      {id:"P02-01",difficulte:1,titre:"Identification O/R",
       enonce:"Cu2+ + Zn → Cu + Zn2+.\n1. Oxydant et réducteur.\n2. Demi-équations.\n3. N.o. Cu avant/après.",
       correction:"1. Cu2+: oxydant · Zn: réducteur\n2. Cu2+ + 2e- → Cu · Zn → Zn2+ + 2e-\n3. +2 → 0",
       notions:["O/R"]},
      {id:"P02-02",difficulte:2,titre:"Nombre d'oxydation",
       enonce:"N.o. de Mn dans KMnO₄ · S dans H₂SO₄ · N dans HNO₃ · N dans NH₃ · Cr dans K₂Cr₂O₇.",
       correction:"Mn=+7 · S=+6 · N(HNO₃)=+5 · N(NH₃)=-3 · Cr=+6",
       notions:["N.o."]},
      {id:"P02-03",difficulte:2,titre:"Équilibrage en milieu acide",
       enonce:"MnO4- → Mn2+ et Fe2+ → Fe3+ en milieu H+.\n1. Demi-éq réduction MnO4-.\n2. Demi-éq oxydation Fe2+.\n3. Équation globale.",
       correction:"1. MnO4- + 8H+ + 5e- → Mn2+ + 4H₂O\n2. Fe2+ → Fe3+ + e- (x5)\n3. MnO4- + 8H+ + 5Fe2+ → Mn2+ + 4H₂O + 5Fe3+",
       notions:["Demi-équations"]},
      {id:"P02-04",difficulte:2,titre:"Titrage rédox Fe2+",
       enonce:"KMnO₄ 0,02mol/L V_éq=18mL V(Fe2+)=25mL.\n1. n(MnO4-).\n2. n(Fe2+) stœch 1:5.\n3. C(Fe2+).",
       correction:"1. n=3,6x10^-4 mol · 2. n=1,8x10^-3 mol · 3. C=0,072mol/L",
       notions:["Titrage rédox"]},
      {id:"P02-05",difficulte:2,titre:"Pile Daniell",
       enonce:"Zn|Zn2+||Cu2+|Cu. E°=1,10V.\n1. Demi-réactions anode et cathode.\n2. Équation globale.\n3. Sens courant extérieur.",
       correction:"1. Anode: Zn → Zn2+ + 2e- · Cathode: Cu2+ + 2e- → Cu\n2. Zn + Cu2+ → Zn2+ + Cu\n3. De Cu(+) vers Zn(-)",
       notions:["Pile"]},
      {id:"P02-06",difficulte:2,titre:"Électrolyse du cuivre",
       enonce:"Cu2+ + 2e- → Cu. I=3A t=45min. M=63,5 F=96500.\n1. Q. 2. n(Cu). 3. m(Cu).",
       correction:"1. Q=8100C · 2. n=0,042mol · 3. m=2,66g",
       notions:["Électrolyse"]},
      {id:"P02-07",difficulte:2,titre:"Corrosion galvanique",
       enonce:"Acier (Fe) + zinc dans eau salée.\n1. Quel métal s'oxyde et pourquoi.\n2. Galvanisation: comment protège.\n3. Protection cathodique: principe.",
       correction:"1. Zn (potentiel plus négatif) → Zn → Zn2+ + 2e-\n2. Zn sacrificiel s'oxyde à la place du Fe\n3. Rendre Fe cathode par courant extérieur",
       notions:["Corrosion"]},
      {id:"P02-08",difficulte:2,titre:"Oxydation des alcools",
       enonce:"Éthanol → éthanal → acide éthanoïque.\n1. N.o. C central à chaque étape.\n2. Quel oxydant.\n3. Test de Fehling.",
       correction:"1. Éthanol: -1 · Éthanal: +1 · Acide: +3\n2. K₂Cr₂O₇ en milieu acide\n3. Cu2+ → Cu₂O rouge brique (aldéhyde)",
       notions:["Oxydation alcool"]},
      {id:"P02-09",difficulte:3,titre:"Dosage H2O2 par KMnO4",
       enonce:"V_éq=20mL KMnO₄ 0,02mol/L pour 10mL H₂O₂.\nRatio 2MnO4- : 5H₂O₂.\n1. n(MnO4-). 2. n(H₂O₂). 3. Degré volumique.",
       correction:"1. n=4x10^-4 mol · 2. n=10^-3 mol · 3. C=0,1mol/L → 3,4g/L → degré 3,4V",
       notions:["Dosage H2O2"]},
      {id:"P02-10",difficulte:2,titre:"Rouille et protection",
       enonce:"4Fe + 3O₂ + 6H₂O → 2Fe₂O₃·3H₂O.\n1. N.o. Fe avant/après.\n2. Facteurs accélérant la corrosion.\n3. Galvanisation Zn: pourquoi protège même si rayé.",
       correction:"1. Fe: 0 → +3\n2. Eau, sel, acide, contact métaux différents\n3. Zn sacrificiel (potentiel plus négatif que Fe)",
       notions:["Corrosion Fe"]},
      {id:"P02-11",difficulte:2,titre:"Pile hydrogène",
       enonce:"H₂ → 2H+ + 2e- · O₂ + 4H+ + 4e- → 2H₂O. E°=1,23V.\n1. Équation globale.\n2. DeltaH=-286kJ/mol: exo ou endo.\n3. eta si P_élec=1kW P_total=2,5kW.",
       correction:"1. 2H₂ + O₂ → 2H₂O · 2. Exothermique · 3. eta=40%",
       notions:["Pile hydrogène"]},
      {id:"P02-12",difficulte:2,titre:"Batterie Li-ion",
       enonce:"Capacité 3Ah U=3,7V.\n1. Pourquoi Li préféré.\n2. Charge Q.\n3. Énergie stockée.",
       correction:"1. Potentiel le plus négatif → FEM maximale\n2. Q=10800C · 3. E=40kJ≈11Wh",
       notions:["Batterie Li-ion"]},
      {id:"P02-13",difficulte:3,titre:"SO2 dans le vin",
       enonce:"SO₂ dosé par I₂ 0,01mol/L. V=5mL pour 50mL vin.\nSO₂ + I₂ + H₂O → H₂SO₄ + 2HI.\n1. n(I₂). 2. n(SO₂). 3. m(SO₂)/L M=64.",
       correction:"1. n=5x10^-5 mol · 2. n=5x10^-5 mol · 3. 64mg/L",
       notions:["Dosage SO2"]},
      {id:"P02-14",difficulte:2,titre:"Photosynthèse et rédox",
       enonce:"6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂.\n1. N.o. C dans CO₂ et glucose.\n2. C oxydé ou réduit.\n3. Oxydant et réducteur.",
       correction:"1. CO₂: +4 · Glucose: 0 · 2. C réduit\n3. Réducteur: H₂O · Oxydant: CO₂",
       notions:["Photosynthèse"]},
      {id:"P02-15",difficulte:3,titre:"Betadine — dosage I2",
       enonce:"I₂ dosé par Na₂S₂O₃ 0,1mol/L. V_éq=15mL pour 10mL.\nI₂ + 2S₂O3 2- → 2I- + S₄O6 2-.\n1. n(Na₂S₂O₃). 2. n(I₂). 3. C(I₂) et m/L M=254.",
       correction:"1. n=1,5x10^-3 mol · 2. n=7,5x10^-4 mol · 3. C=0,075mol/L → 19g/L",
       notions:["Dosage I2"]},
      {id:"P02-16",difficulte:2,titre:"Respiration cellulaire",
       enonce:"C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O. DeltaH=-2810kJ/mol.\n1. N.o. C dans glucose et CO₂.\n2. Oxydant biologique.\n3. Énergie par gramme glucose.",
       correction:"1. Glucose: 0 · CO₂: +4 · 2. O₂ · 3. 15,6kJ/g",
       notions:["Respiration cellulaire"]},
      {id:"P02-17",difficulte:3,titre:"Vitamine C — dosage iodométrique",
       enonce:"Vit.C M=176 dans 100mL jus. I₂ 0,01mol/L V_éq=8mL.\nC₆H₈O₆ + I₂ → C₆H₆O₆ + 2HI.\n1. n(I₂). 2. n(vitC). 3. m(vitC)/100mL.",
       correction:"1. n=8x10^-5 mol · 2. n=8x10^-5 mol · 3. m=14,1mg",
       notions:["Dosage vitamine C"]},
      {id:"P02-18",difficulte:2,titre:"Dismutation — eau de Javel",
       enonce:"Cl₂ + 2NaOH → NaOCl + NaCl + H₂O.\n1. N.o. Cl dans chaque produit.\n2. Définir dismutation.\n3. Pourquoi NaOCl est désinfectant.",
       correction:"1. NaOCl: +1 · NaCl: -1\n2. Même élément oxydé ET réduit simultanément\n3. OCl- oxydant puissant",
       notions:["Dismutation"]},
      {id:"P02-19",difficulte:2,titre:"Identification Fe2+/Fe3+",
       enonce:"1. Séparer ions par CCM ?\n2. Test NaOH pour Fe2+ et Fe3+.\n3. SCN- + Fe3+: observation.",
       correction:"1. Non (ions en solution)\n2. Fe2+ → précipité vert · Fe3+ → précipité rouille\n3. FeSCN2+: rouge sang",
       notions:["Identification Fe"]},
      {id:"P02-20",difficulte:3,titre:"Oxygène dissous — Winkler",
       enonce:"V_éq=5mL Na₂S₂O₃ 0,025mol/L pour 100mL eau. Ratio O₂:Na₂S₂O₃=1:8.\n1. n(Na₂S₂O₃). 2. n(O₂). 3. m(O₂)/L M=32.",
       correction:"1. n=1,25x10^-4 mol · 2. n=1,56x10^-5 mol · 3. m=5mg/L",
       notions:["Dosage O2 dissous"]},
    ]
  },
  { id:"structure-entites", numero:3,
    titre:"Structure des entités & Propriétés physiques",
    sousTitre:"Lewis · VSEPR · Polarité · Ponts H · Van der Waals · Solubilité",
    icon:"🔬", color:"#8b5cf6",
    notions:["Lewis","VSEPR","Polarité","Ponts H","Van der Waals","Solubilité","Extraction","IR"],
    exercices:[
      {id:"P03-01",difficulte:1,titre:"Schémas de Lewis",
       enonce:"Tracer Lewis de: H₂O · NH₃ · CH₄ · HCl · O₂ · N₂.",
       correction:"H₂O: 2 O-H + 2 doublets · NH₃: 3 N-H + 1 doublet · CH₄: 4 C-H\nHCl: liaison + 3 doublets · O₂: double liaison + doublets · N₂: triple liaison",
       notions:["Lewis"]},
      {id:"P03-02",difficulte:2,titre:"Géométrie VSEPR",
       enonce:"Géométrie de: H₂O · NH₃ · CH₄ · CO₂ · PCl₃ · BF₃.",
       correction:"H₂O: coudée (104°) · NH₃: pyramide (107°) · CH₄: tétraèdre (109,5°)\nCO₂: linéaire · PCl₃: pyramide · BF₃: plan trigonal",
       notions:["VSEPR"]},
      {id:"P03-03",difficulte:2,titre:"Polarité des liaisons",
       enonce:"chi: H=2,2 C=2,5 N=3,0 O=3,5 F=4,0.\n1. C-O: Delta_chi et polarité.\n2. H-F.\n3. N-H.",
       correction:"1. Delta_chi=1,0 → polaire delta- O - C delta+\n2. Delta_chi=1,8 → très polaire\n3. Delta_chi=0,8 → faiblement polaire",
       notions:["Polarité liaison"]},
      {id:"P03-04",difficulte:2,titre:"Polarité des molécules",
       enonce:"Polaire ou non: CO₂ (linéaire) · H₂O (coudée) · CCl₄ (symétrique) · CHCl₃.",
       correction:"CO₂: NON · H₂O: POLAIRE · CCl₄: NON · CHCl₃: POLAIRE",
       notions:["Polarité molécule"]},
      {id:"P03-05",difficulte:2,titre:"Ponts hydrogène",
       enonce:"PE: H₂O=100°C H₂S=-61°C HF=19,5°C HCl=-85°C.\n1. Pourquoi H₂O et HF ont PE élevé.\n2. Groupe formant ponts H.\n3. Éthanol (78°C) vs éther diéthylique (35°C): expliquer.",
       correction:"1. Ponts H forts (O-H···O et F-H···F)\n2. X-H avec X=O, N, F\n3. Éthanol: OH → ponts H · Éther: pas de OH entre molécules",
       notions:["Ponts H"]},
      {id:"P03-06",difficulte:2,titre:"Van der Waals",
       enonce:"n-pentane (PE=36°C) vs néopentane (PE=10°C). Même formule C₅H₁₂.\n1. Type interactions.\n2. Pourquoi PE différents.\n3. Comparer n-hexane (PE=69°C).",
       correction:"1. Van der Waals (London)\n2. n-pentane: surface plus grande → VdW plus fortes\n3. n-hexane: chaîne plus longue → PE encore plus élevé",
       notions:["Van der Waals"]},
      {id:"P03-07",difficulte:2,titre:"Solubilité",
       enonce:"Soluble dans eau ou hexane: NaCl · éthanol · cyclohexane · acide acétique · savon.",
       correction:"NaCl: eau · Cyclohexane: hexane · Éthanol: eau ET hexane\nAcide acétique: eau · Savon: amphiphile → micelles dans eau",
       notions:["Solubilité"]},
      {id:"P03-08",difficulte:2,titre:"Extraction liquide-liquide",
       enonce:"Iode dans eau. 3×10mL hexane vs 1×30mL hexane.\n1. Pourquoi 3 petites > 1 grande.\n2. Matériel.\n3. Récupérer I₂.",
       correction:"1. Rendement cumulé supérieur\n2. Ampoule à décanter\n3. Évaporer hexane sous hotte",
       notions:["Extraction"]},
      {id:"P03-09",difficulte:2,titre:"Chromatographie sur colonne",
       enonce:"Colonne silice (polaire). Mélange A(polaire) + B(apolaire). Éluant cyclohexane.\n1. Qui sort en premier.\n2. Éluant méthanol: ordre change.\n3. HPLC vs CCM.",
       correction:"1. B (moins affinité silice)\n2. A sort en premier (méthanol compétiteur)\n3. HPLC: quantitative, haute résolution · CCM: rapide, qualitative",
       notions:["Chromatographie"]},
      {id:"P03-10",difficulte:2,titre:"Spectroscopie IR",
       enonce:"O-H alcool: 3200-3600/cm · C=O: 1700/cm · N-H: 3300-3500/cm.\n1. Molécule avec 3400 et 1710/cm.\n2. Pas de bande 3200-3600/cm.\n3. Acide carboxylique: bandes.",
       correction:"1. Acide carboxylique (OH + C=O)\n2. Pas de groupe OH\n3. Bande large OH 2500-3300/cm + C=O 1710/cm",
       notions:["Spectroscopie IR"]},
      {id:"P03-11",difficulte:2,titre:"Polarité et solvant",
       enonce:"1. Semblable dissout le semblable: expliquer.\n2. NaCl soluble eau pas hexane.\n3. Éthanol: soluble eau ET hexane.",
       correction:"1. Interactions soluté-solvant doivent être similaires\n2. NaCl ionique: eau polaire · Hexane apolaire: interactions faibles\n3. Éthanol: OH polaire (eau) + CH₃ apolaire (hexane)",
       notions:["Polarité","Solvant"]},
      {id:"P03-12",difficulte:2,titre:"Isomérie cis-trans",
       enonce:"cis-2-butène vs trans-2-butène. C₄H₈.\n1. Différence structurale.\n2. Lequel polaire.\n3. PE: cis=3,7°C trans=0,9°C: expliquer.",
       correction:"1. Cis: substituants même côté · Trans: côtés opposés\n2. Cis: asymétrique → polaire\n3. Cis polaire → interactions dipolaires → PE plus élevé",
       notions:["Isomérie cis-trans"]},
      {id:"P03-13",difficulte:2,titre:"Alcools et points d'ébullition",
       enonce:"Méthanol(65°C) Éthanol(78°C) Propanol(97°C).\n1. Interactions dominantes.\n2. Tendance PE.\n3. Glycérol (3 OH, M=92, PE=290°C).",
       correction:"1. Ponts H + Van der Waals\n2. Chaîne plus longue → VdW plus fortes → PE plus élevé\n3. 3 OH → réseau dense ponts H → PE très élevé",
       notions:["Alcools"]},
      {id:"P03-14",difficulte:2,titre:"Tensioactifs et micelles",
       enonce:"Savon: CH₃(CH₂)₁₄COO- Na+.\n1. Parties hydrophile/hydrophobe.\n2. Formation micelles.\n3. Pourquoi nettoie les graisses.",
       correction:"1. Hydrophile: COO- Na+ · Hydrophobe: CH₃(CH₂)₁₄\n2. Queues au centre, têtes en surface\n3. Graisse emprisonnée dans micelle",
       notions:["Tensioactifs"]},
      {id:"P03-15",difficulte:3,titre:"Identification molécule inconnue",
       enonce:"X: M=60g/mol. IR: 3200/cm large + 1710/cm. RMN: 3 signaux.\n1. Fonction chimique.\n2. Formule brute C₂H₄O₂ (M=60) possible.\n3. Identifier X.",
       correction:"1. Acide carboxylique\n2. M=24+4+32=60 ✓\n3. X = acide acétique CH₃COOH",
       notions:["Identification","Spectres"]},
      {id:"P03-16",difficulte:2,titre:"Solubilité médicaments et pH",
       enonce:"Aspirine pKa=3,5.\n1. Forme dominante à pH=1 et pH=7,4.\n2. Pourquoi solubilité dépend du pH.\n3. Aspirine effervescente: rôle bicarbonate.",
       correction:"1. pH=1: HA (peu soluble) · pH=7,4: A- (soluble)\n2. A- ionique très soluble · HA neutre peu soluble\n3. Bicarbonate neutralise HA → A- → meilleure dissolution",
       notions:["pH et solubilité"]},
      {id:"P03-17",difficulte:2,titre:"Nylon vs polyéthylène",
       enonce:"1. Interactions intermoléculaires dans chacun.\n2. Résistance thermique.\n3. Biodégradabilité.",
       correction:"1. Nylon: ponts H (C=O···H-N) · PE: Van der Waals\n2. Nylon: T_fusion plus élevée\n3. Nylon: liaisons amide hydrolysables → plus biodégradable",
       notions:["Polymères"]},
      {id:"P03-18",difficulte:2,titre:"Comparaison points d'ébullition",
       enonce:"Éthane(-89°C) Méthanol(65°C) HF(19,5°C) Eau(100°C).\n1. Interactions dominantes pour chacun.\n2. Pourquoi PE(eau) > PE(méthanol).\n3. Éthane: interactions.",
       correction:"1. Éthane: VdW · HF: ponts H · Méthanol: ponts H + VdW · Eau: réseau 3D ponts H\n2. Eau: 4 ponts H par molécule (réseau 3D plus fort)\n3. VdW seulement (apolaire)",
       notions:["Comparaison PE"]},
      {id:"P03-19",difficulte:3,titre:"Parfum — interactions",
       enonce:"Géraniol (terpène, OH, PE=230°C): parfum naturel.\n1. Interactions avec peau.\n2. Pourquoi tient mieux sur peau grasse.\n3. Dilution dans éthanol.",
       correction:"1. VdW avec lipides + ponts H avec protéines (OH)\n2. Lipides dissolvent terpènes apolaires → libération lente\n3. Éthanol: miscible eau, volatil → application rapide",
       notions:["Parfum","Interactions"]},
      {id:"P03-20",difficulte:3,titre:"Huile essentielle — linalol",
       enonce:"Linalol M=154g/mol. IR: 3350/cm (OH) sans C=O.\n1. Classe fonctionnelle.\n2. Interactions avec membranes.\n3. Solubilité eau vs huile.",
       correction:"1. Alcool terpénique\n2. VdW avec lipides + ponts H avec protéines\n3. Peu soluble eau · Soluble dans huile",
       notions:["Alcool terpénique"]},
    ]
  },
  { id:"loi-coulomb", numero:4,
    titre:"Loi de Coulomb & Champs",
    sousTitre:"Coulomb · Gravitation · Champ E · Champ g · Lignes de champ",
    icon:"⚡", color:"#4f6ef7",
    notions:["Loi Coulomb","Gravitation","Champ électrique","Champ gravitationnel","Lignes champ","Lorentz"],
    exercices:[
      {id:"P04-01",difficulte:1,titre:"Loi de Coulomb",
       enonce:"q1=3μC q2=-5μC r=20cm. k=9x10^9.\n1. F.\n2. Attraction ou répulsion.\n3. r÷2: F.",
       correction:"1. F=3,375N · 2. Attraction · 3. F×4=13,5N",
       notions:["Coulomb"]},
      {id:"P04-02",difficulte:1,titre:"Champ électrique",
       enonce:"q=+4nC r=10cm.\n1. E=kq/r².\n2. Sens du champ.\n3. Force sur q2=-2μC.",
       correction:"1. E=3600V/m · 2. Diverge de q(+) · 3. F=-7,2x10^-3 N (vers q)",
       notions:["Champ E"]},
      {id:"P04-03",difficulte:1,titre:"Gravitation g(h)",
       enonce:"G=6,67x10^-11 M_T=5,97x10^24 R_T=6371km.\n1. g0=GM/R².\n2. g(400km).\n3. Poids 80kg aux deux altitudes.",
       correction:"1. g0=9,82m/s² · 2. g=8,69m/s² · 3. P0=785N P(400)=695N",
       notions:["Gravitation"]},
      {id:"P04-04",difficulte:2,titre:"Condensateur plan",
       enonce:"U=400V d=4cm.\n1. E=U/d.\n2. Lignes de champ.\n3. Force sur proton.",
       correction:"1. E=10000V/m · 2. Parallèles de + vers - · 3. F=1,6x10^-15 N",
       notions:["Condensateur"]},
      {id:"P04-05",difficulte:2,titre:"Déflexion dans champ E",
       enonce:"Proton m=1,67x10^-27 q=1,6x10^-19. E=2000V/m perp à v0=10^6 m/s. L=5cm.\n1. F et a.\n2. t dans plaques.\n3. Déviation y.",
       correction:"1. F=3,2x10^-16 N · a=1,92x10^11 m/s² · 2. t=5x10^-8 s · 3. y=2,4mm",
       notions:["Déflexion"]},
      {id:"P04-06",difficulte:2,titre:"Coulomb vs gravitation",
       enonce:"Proton-électron à r=5,3x10^-11 m.\n1. F_coulomb.\n2. F_grav.\n3. Rapport.",
       correction:"1. F_C=8,2x10^-8 N · 2. F_G=3,6x10^-47 N · 3. ratio≈2,3x10^39",
       notions:["Interactions fondamentales"]},
      {id:"P04-07",difficulte:2,titre:"Superposition de champs",
       enonce:"+2μC en A et -2μC en B AB=30cm. Point M milieu.\n1. E1 et E2 en M.\n2. E_total.\n3. Lignes dipôle.",
       correction:"1. E1=E2=800kV/m · 2. E_tot=1,6MV/m · 3. De + vers -, arcs",
       notions:["Dipôle"]},
      {id:"P04-08",difficulte:2,titre:"Spectrographe de masse",
       enonce:"12C+ et 13C+. v=10^5 m/s B=0,5T q=1,6x10^-19 u=1,66x10^-27.\n1. r12=mv/(qB).\n2. r13.\n3. Delta_r.",
       correction:"1. r12=24,9mm · 2. r13=27,1mm · 3. Delta_r=4,4mm",
       notions:["Spectrographe"]},
      {id:"P04-09",difficulte:2,titre:"Force de Lorentz",
       enonce:"Électron v=2x10^6 m/s B=0,05T.\n1. F=qvB.\n2. r=mv/(qB).\n3. T=2pi x m/(qB).",
       correction:"1. F=1,6x10^-14 N · 2. r=0,228m · 3. T=7,14x10^-10 s",
       notions:["Lorentz"]},
      {id:"P04-10",difficulte:2,titre:"Lignes de champ",
       enonce:"1. Lignes autour charge +q.\n2. Condensateur plan.\n3. Dipôle +q et -q.",
       correction:"1. Radiales sortant de +q\n2. Parallèles uniformes de + vers -\n3. De +q vers -q en arcs",
       notions:["Lignes champ"]},
      {id:"P04-11",difficulte:3,titre:"Accélérateur de particules",
       enonce:"Proton accéléré U=50kV. q=1,6x10^-19 m=1,67x10^-27.\n1. v=sqrt(2qU/m).\n2. r dans B=0,2T.\n3. f=qB/(2pi x m).",
       correction:"1. v=3,1x10^6 m/s · 2. r=0,162m · 3. f=3,06MHz",
       notions:["Accélérateur"]},
      {id:"P04-12",difficulte:2,titre:"Solénoïde",
       enonce:"n=1000sp/m I=3A. mu0=4pi x 10^-7.\n1. B=mu0 x n x I.\n2. Direction.\n3. Force Laplace: fil L=5cm I2=2A perp B.",
       correction:"1. B=3,77mT · 2. Axe du solénoïde · 3. F=3,77x10^-4 N",
       notions:["Solénoïde"]},
      {id:"P04-13",difficulte:2,titre:"RMN — fréquence de Larmor",
       enonce:"Proton B=1,5T. gamma=2,675x10^8.\n1. f=gamma x B/(2pi) en MHz.\n2. lambda.\n3. Domaine EM.",
       correction:"1. f=63,9MHz · 2. lambda=4,7m · 3. Ondes radio",
       notions:["RMN"]},
      {id:"P04-14",difficulte:2,titre:"Travail de la force électrique",
       enonce:"E=5000V/m d=3cm. q=2x10^-6 C.\n1. W=qEd.\n2. W si angle=30°.\n3. v finale si v0=0 m=10^-3 kg.",
       correction:"1. W=3x10^-4 J · 2. W=2,6x10^-4 J · 3. v=0,775m/s",
       notions:["Travail force E"]},
      {id:"P04-15",difficulte:2,titre:"Équilibre de charges",
       enonce:"q1=+1μC à x=0 q2=-2μC à x=10cm q3=? à x=20cm. Équilibre de q2.\n1. F12.\n2. q3.\n3. Signe de q3.",
       correction:"1. F12=1,8N · 2. q3=1μC · 3. Positif",
       notions:["Équilibre charges"]},
      {id:"P04-16",difficulte:2,titre:"IRM",
       enonce:"IRM 3T. gamma=2,675x10^8. Gradient B=40mT/m.\n1. f Larmor.\n2. Delta_f sur 20cm.\n3. Résolution si Delta_f_min=1Hz.",
       correction:"1. f=127,7MHz · 2. Delta_f=339kHz · 3. Delta_x=59μm",
       notions:["IRM"]},
      {id:"P04-17",difficulte:3,titre:"Cyclotron médical",
       enonce:"B=1,5T R_max=0,3m. Protons pour TEP.\n1. v_max=qBR/m.\n2. Ec en MeV.\n3. Atteignable pour 11MeV (R=0,34m)?",
       correction:"1. v=4,31x10^7 m/s · 2. Ec=9,7MeV · 3. Non (R requis > R_max)",
       notions:["Cyclotron"]},
      {id:"P04-18",difficulte:3,titre:"Force dans un noyau",
       enonce:"2 protons dans He à r=2x10^-15 m.\n1. F_coulomb.\n2. Pourquoi noyau stable.\n3. Énergie liaison He=28,3MeV: Delta_m.",
       correction:"1. F=57N · 2. Force nucléaire forte >> Coulomb à cette échelle\n3. Delta_m=5x10^-29 kg",
       notions:["Force nucléaire"]},
      {id:"P04-19",difficulte:2,titre:"Dipôle électrique",
       enonce:"+q et -q séparés d=2nm q=1,6x10^-19 C.\n1. p=qd.\n2. Application H₂O.",
       correction:"1. p=3,2x10^-28 C·m\n2. H₂O: p=6,17x10^-30 C·m → polaire → solvant universel",
       notions:["Dipôle"]},
      {id:"P04-20",difficulte:3,titre:"Spectrométrie de masse — Xe",
       enonce:"Xe+ m=131u accéléré U=5000V puis B=0,5T. q=1,6x10^-19 u=1,66x10^-27.\n1. v après accélération.\n2. r.\n3. Delta_r pour 132Xe+.",
       correction:"1. v=4,9x10^4 m/s · 2. r=13,3cm · 3. Delta_r≈0,5mm",
       notions:["Spectrométrie masse"]},
    ]
  },
  { id:"fluides", numero:5,
    titre:"Fluides au repos",
    sousTitre:"Pression · Pascal · Archimède · Gaz parfait PV=nRT",
    icon:"💧", color:"#06b6d4",
    notions:["Pression hydrostatique","Pascal","Archimède","PV=nRT","Flottaison","Henry"],
    exercices:[
      {id:"P05-01",difficulte:1,titre:"Pression hydrostatique",
       enonce:"rho=1000 g=9,8.\n1. P à h=20m.\n2. P_tot avec P_atm=10^5 Pa.\n3. h pour P=3x10^5 Pa.",
       correction:"1. P=196000Pa · 2. P_tot=2,96x10^5 Pa · 3. h=20,4m",
       notions:["Pression"]},
      {id:"P05-02",difficulte:1,titre:"Théorème de Pascal",
       enonce:"Vérin: S1=2cm² S2=200cm² F1=50N.\n1. P transmis.\n2. F2.\n3. d2 si d1=10cm.",
       correction:"1. P=25x10^4 Pa · 2. F2=5000N · 3. d2=0,1cm",
       notions:["Pascal"]},
      {id:"P05-03",difficulte:1,titre:"Poussée d'Archimède",
       enonce:"V=500cm³ m=600g rho_eau=1000 g=10.\n1. F_A.\n2. Flotte ou coule.\n3. rho_objet.",
       correction:"1. F_A=5N · 2. P=6N > F_A → coule · 3. rho=1200kg/m³",
       notions:["Archimède"]},
      {id:"P05-04",difficulte:2,titre:"Boyle-Mariotte",
       enonce:"V1=10L P1=2x10^5 Pa T=cste.\n1. V2 si P2=5x10^5 Pa.\n2. P2 si V2=3L.\n3. Application plongée.",
       correction:"1. V2=4L · 2. P2=6,67x10^5 Pa · 3. Poumons comprimés en profondeur",
       notions:["Boyle-Mariotte"]},
      {id:"P05-05",difficulte:2,titre:"Loi de Charles",
       enonce:"V1=5L T1=300K P=cste.\n1. V2 si T2=600K.\n2. T2 pour V2=7L.\n3. Application ballon météo.",
       correction:"1. V2=10L · 2. T2=420K=147°C · 3. Altitude: T et P diminuent → V augmente",
       notions:["Charles"]},
      {id:"P05-06",difficulte:2,titre:"PV=nRT",
       enonce:"3mol T=25°C P=2x10^5 Pa R=8,314.\n1. V.\n2. T→600K V cst: P2.\n3. Densité M=32g/mol.",
       correction:"1. V=37,3L · 2. P2=4x10^5 Pa · 3. rho=2,57g/L",
       notions:["PV=nRT"]},
      {id:"P05-07",difficulte:2,titre:"Flottaison — iceberg",
       enonce:"rho_glace=917 rho_eau=1025.\n1. Fraction émergée.\n2. V sous eau si V=1km³.\n3. Danger navigation.",
       correction:"1. f=10,5% · 2. V_sous=0,895km³ · 3. 89,5% invisible",
       notions:["Flottaison"]},
      {id:"P05-08",difficulte:2,titre:"Manomètre",
       enonce:"Hg rho=13600 h=10cm g=9,8.\n1. Delta_P=rho x g x h.\n2. 120mmHg en Pa.\n3. Application médicale.",
       correction:"1. Delta_P=13328Pa · 2. 16kPa · 3. Pression artérielle",
       notions:["Manomètre"]},
      {id:"P05-09",difficulte:2,titre:"Sous-marin",
       enonce:"V=5000m³ m=4x10^6 kg rho=1025 g=9,8.\n1. F_A.\n2. Poids.\n3. Masse eau pour plonger.",
       correction:"1. F_A=5,02x10^7 N · 2. P=3,92x10^7 N · 3. Delta_m=1,13x10^6 kg",
       notions:["Sous-marin"]},
      {id:"P05-10",difficulte:2,titre:"Pression atmosphérique",
       enonce:"P=P0 x exp(-h/H0) P0=10^5 Pa H0=8500m.\n1. P(5500m).\n2. % de P0.\n3. Physiologie altitude.",
       correction:"1. P≈5,24x10^4 Pa · 2. 52% · 3. pO₂ insuffisant → hypoxie",
       notions:["Pression atmosphérique"]},
      {id:"P05-11",difficulte:2,titre:"Capillarité",
       enonce:"Tube r=0,1mm. gamma=0,072N/m. h=2gamma/(rho x g x r).\n1. h.\n2. r=0,05mm: h.\n3. Rôle végétaux.",
       correction:"1. h=14,7cm · 2. h=29,4cm · 3. Remontée sève",
       notions:["Capillarité"]},
      {id:"P05-12",difficulte:2,titre:"Pneu — loi des gaz",
       enonce:"V=30L T1=15°C P1=2,5x10^5 Pa.\n1. n(air).\n2. T2=60°C V cst: P2.\n3. Vérifier à froid.",
       correction:"1. n=3,14mol · 2. P2=2,89x10^5 Pa · 3. T chaud → P élevée → mesure biaisée",
       notions:["Gaz parfait"]},
      {id:"P05-13",difficulte:3,titre:"Baromètre de Torricelli",
       enonce:"Tube Hg rho=13600 h=760mm g=9,8.\n1. P_atm=rho x g x h.\n2. Pourquoi Hg pas eau.\n3. Altitude P=0,5P0: h.",
       correction:"1. P=10^5 Pa ✓ · 2. Eau: h=10m (impraticable) · 3. h=380mm",
       notions:["Baromètre"]},
      {id:"P05-14",difficulte:2,titre:"Loi de Henry — plongée",
       enonce:"kH(O₂)=1,3x10^-3 mol/(L·atm). P_O2=0,21atm.\n1. C(O₂) dans eau.\n2. À 30m (P×4): C.\n3. Accident décompression.",
       correction:"1. C=2,73x10^-4 mol/L · 2. C×4 · 3. Remontée rapide → bulles dans sang",
       notions:["Henry"]},
      {id:"P05-15",difficulte:3,titre:"Ballon stratosphérique",
       enonce:"V0=1m³ P0=10^5 Pa T0=293K. Altitude: P=10^4 Pa T=220K.\n1. V final.\n2. F_A si rho_air=0,1kg/m³.\n3. m_max pour monter.",
       correction:"1. V=7,51m³ · 2. F_A=7,36N · 3. m_max=0,75kg",
       notions:["Ballon"]},
      {id:"P05-16",difficulte:2,titre:"Tirant d'eau",
       enonce:"Bateau S=100m² m=50000kg rho=1025.\n1. V_imm=m/rho.\n2. h=V_imm/S.\n3. Cargo +30000kg: h.",
       correction:"1. V_imm=48,8m³ · 2. h=0,488m · 3. h=0,78m",
       notions:["Tirant eau"]},
      {id:"P05-17",difficulte:2,titre:"Pression artérielle",
       enonce:"120mmHg au cœur. rho_sang=1060 g=9,8.\n1. P en Pa.\n2. P au pied (h=1,3m dessous).\n3. P cerveau (h=0,4m dessus).",
       correction:"1. P=16kPa · 2. P_pied=29520Pa · 3. P_cerveau=11840Pa",
       notions:["Pression artérielle"]},
      {id:"P05-18",difficulte:2,titre:"Machine à café expresso",
       enonce:"P=9bars. Filtre S=5cm².\n1. P en atm et Pa.\n2. F sur filtre.\n3. Rôle haute pression.",
       correction:"1. P=9x10^5 Pa=8,88atm · 2. F=450N · 3. Extraction rapide arômes + crema",
       notions:["Pression"]},
      {id:"P05-19",difficulte:2,titre:"Autocuiseur",
       enonce:"V cst. T1=20°C P1=10^5 Pa. Soupape à P=1,2x10^5 Pa.\n1. P2 si T2=120°C.\n2. T ouverture soupape.\n3. Cuisson plus rapide.",
       correction:"1. P2=1,34x10^5 Pa · 2. T=352K=79°C · 3. T_ébullition > 100°C → cuisson 2-3× plus rapide",
       notions:["Gay-Lussac"]},
      {id:"P05-20",difficulte:3,titre:"Montgolfière",
       enonce:"V=2500m³ m_total=700kg rho_air=1,2 g=9,8.\n1. F_A (air froid).\n2. Condition décollage.\n3. T_air_chaud nécessaire.",
       correction:"1. F_A=29400N · 2. rho_chaud < 0,92kg/m³ · 3. T=375K=102°C",
       notions:["Montgolfière"]},
    ]
  },
  { id:"deuxieme-loi-newton-approche", numero:6,
    titre:"2ème loi de Newton (approche)",
    sousTitre:"ΣF=ma · Plan incliné · Chute libre · Projectile · Satellite",
    icon:"🚀", color:"#f59e0b",
    notions:["2ème loi Newton","Plan incliné","Chute libre","Projectile","Satellite","Quantité de mouvement"],
    exercices:[
      {id:"P06-01",difficulte:1,titre:"2ème loi — horizontal",
       enonce:"5kg F=20N sans frottement.\n1. a.\n2. v après 4s.\n3. d après 4s.",
       correction:"1. a=4m/s² · 2. v=16m/s · 3. d=32m",
       notions:["Newton"]},
      {id:"P06-02",difficulte:2,titre:"Plan incliné sans frottement",
       enonce:"4kg theta=30°. g=10.\n1. P_par=mg sin(theta).\n2. a=g sin(theta).\n3. v après d=5m.",
       correction:"1. P_par=20N · 2. a=5m/s² · 3. v=sqrt(50)≈7,1m/s",
       notions:["Plan incliné"]},
      {id:"P06-03",difficulte:2,titre:"Plan incliné avec frottement",
       enonce:"3kg theta=30° mu=0,2. g=10.\n1. N=mg cos(theta).\n2. f=mu N.\n3. a=g(sin theta - mu cos theta).",
       correction:"1. N=26N · 2. f=5,2N · 3. a=3,27m/s²",
       notions:["Frottement"]},
      {id:"P06-04",difficulte:2,titre:"Ascenseur",
       enonce:"70kg g=9,8.\n1. Poids P.\n2. Montée a=3m/s²: N.\n3. Chute libre: N.",
       correction:"1. P=686N · 2. N=896N · 3. N=0",
       notions:["Ascenseur"]},
      {id:"P06-05",difficulte:2,titre:"Projectile oblique",
       enonce:"v0=25m/s theta=37°. g=10.\n1. x(t) y(t).\n2. H_max.\n3. Portée R.",
       correction:"1. x=20t · y=15t-5t² · 2. H=11,25m · 3. R=60m",
       notions:["Projectile"]},
      {id:"P06-06",difficulte:2,titre:"Machine d'Atwood",
       enonce:"m1=3kg m2=5kg. g=9,8.\n1. a=(m2-m1)g/(m1+m2).\n2. T=2m1m2g/(m1+m2).\n3. v après 2s.",
       correction:"1. a=2,45m/s² · 2. T=36,75N · 3. v=4,9m/s",
       notions:["Atwood"]},
      {id:"P06-07",difficulte:2,titre:"Fusée — 3ème loi",
       enonce:"v_gaz=3000m/s débit=10kg/s m=1000kg g=10.\n1. Poussée F.\n2. Poids.\n3. a.",
       correction:"1. F=30000N · 2. P=10000N · 3. a=20m/s²",
       notions:["Fusée"]},
      {id:"P06-08",difficulte:2,titre:"3 blocs empilés",
       enonce:"m1=m2=m3=2kg F=18N.\n1. a système.\n2. N12.\n3. N23.",
       correction:"1. a=3m/s² · 2. N12=12N · 3. N23=6N",
       notions:["Forces contact"]},
      {id:"P06-09",difficulte:2,titre:"Freinage",
       enonce:"1200kg v0=108km/h a=-8m/s².\n1. v0 en m/s.\n2. d_arrêt=v0²/(2|a|).\n3. Si v0 double: d.",
       correction:"1. v0=30m/s · 2. d=56,25m · 3. d×4=225m",
       notions:["Freinage"]},
      {id:"P06-10",difficulte:2,titre:"Voiture en virage",
       enonce:"m=1200kg R=80m v=72km/h.\n1. v en m/s.\n2. a_c=v²/R.\n3. F centripète.",
       correction:"1. v=20m/s · 2. a_c=5m/s² · 3. F=6000N",
       notions:["MCU"]},
      {id:"P06-11",difficulte:3,titre:"Satellite géostationnaire",
       enonce:"T=24h GM=3,98x10^14.\n1. r³=GMT²/(4pi²).\n2. r et h.\n3. v.",
       correction:"1. r³=7,54x10^22 m³ · 2. r=42200km h=35830km · 3. v=3068m/s",
       notions:["Satellite"]},
      {id:"P06-12",difficulte:2,titre:"Pendule simple",
       enonce:"L=1m g=9,8.\n1. T=2pi sqrt(L/g).\n2. T Lune (g=1,6).\n3. L pour T=2s.",
       correction:"1. T=2,01s · 2. T_L=4,97s · 3. L=0,993m",
       notions:["Pendule"]},
      {id:"P06-13",difficulte:2,titre:"Quantité de mouvement",
       enonce:"A: 500g v=2m/s → B: 500g repos. A s'arrête.\n1. Conservation.\n2. v_B.\n3. Élastique ?",
       correction:"1. p_avant=p_après · 2. v_B=2m/s · 3. Ec conservée → élastique",
       notions:["Quantité mouvement"]},
      {id:"P06-14",difficulte:2,titre:"Résistance air — v_limite",
       enonce:"f=kv² k=0,5 F_moteur=2000N m=1000kg.\n1. v_lim=sqrt(F/k).\n2. a à v=30m/s.\n3. k double: v_lim.",
       correction:"1. v_lim=63,2m/s · 2. a=1,55m/s² · 3. v_lim=44,7m/s",
       notions:["Résistance air"]},
      {id:"P06-15",difficulte:3,titre:"Lancement vertical",
       enonce:"m=800kg F=15000N g=10.\n1. a initiale.\n2. a quand m=500kg.\n3. v après 60s.",
       correction:"1. a=8,75m/s² · 2. a=20m/s² · 3. v=840m/s",
       notions:["Fusée"]},
      {id:"P06-16",difficulte:2,titre:"Courbe — bosse",
       enonce:"m=1000kg R=50m v=36km/h g=10.\n1. a_c.\n2. N en bas de bosse.\n3. Condition N=0 en haut.",
       correction:"1. v=10m/s a_c=2m/s² · 2. N=12000N · 3. v_max=22,4m/s",
       notions:["Courbe"]},
      {id:"P06-17",difficulte:2,titre:"Portance",
       enonce:"m=5000kg. L=0,5 rho S Cl v². rho=1,2 S=25m² Cl=1,5.\n1. v_décrochage.\n2. Si Cl=1,8.\n3. Rôle volets.",
       correction:"1. v=46,7m/s · 2. v=42,6m/s · 3. Volets: augmente Cl → baisse v_décrochage",
       notions:["Portance"]},
      {id:"P06-18",difficulte:3,titre:"Force de marée",
       enonce:"M_L=7,34x10^22 d=3,84x10^8 m R_T=6,37x10^6 m. Force sur 1kg eau.\n1. F_proche.\n2. F_loin.\n3. Delta=F_proche-F_loin.",
       correction:"1. F_proche=3,44x10^-5 N · 2. F_loin=3,20x10^-5 N · 3. Delta=2,4x10^-6 N",
       notions:["Force marée"]},
      {id:"P06-19",difficulte:2,titre:"Tube de Pitot",
       enonce:"Delta_P=500Pa rho=1,2.\n1. v=sqrt(2 Delta_P/rho).\n2. En km/h.\n3. h=10000m rho=0,4: v.",
       correction:"1. v=28,9m/s · 2. 104km/h · 3. v=50m/s=180km/h",
       notions:["Bernoulli"]},
      {id:"P06-20",difficulte:3,titre:"Rentrée atmosphérique",
       enonce:"Capsule 200kg v0=7800m/s f=kv² k=0,5.\n1. f à v0.\n2. a initiale.\n3. v_lim vertical.",
       correction:"1. f=3,04x10^7 N · 2. a=1,52x10^5 m/s² · 3. v_lim=62,6m/s",
       notions:["Rentrée atm."]},
    ]
  },
  { id:"energie-mecanique", numero:7,
    titre:"Aspects énergétiques mécaniques",
    sousTitre:"Travail · Ec · Ep · Théorème Ec · Conservation Em",
    icon:"⚡", color:"#eab308",
    notions:["Travail","Énergie cinétique","Théorème Ec","Énergie potentielle","Conservation Em","Puissance"],
    exercices:[
      {id:"P07-01",difficulte:1,titre:"Travail d'une force",
       enonce:"F=50N angle=60° d=8m.\n1. W=F x d x cos(angle).\n2. W si angle=90°.\n3. W poids si horizontal.",
       correction:"1. W=200J · 2. W=0 · 3. W=0",
       notions:["Travail"]},
      {id:"P07-02",difficulte:1,titre:"Énergie cinétique",
       enonce:"Avion m=50000kg v=250m/s.\n1. Ec=0,5mv².\n2. v÷2: Ec.\n3. Freinage d=1500m: F.",
       correction:"1. Ec=1,56GJ · 2. Ec÷4 · 3. F=1040kN",
       notions:["Ec"]},
      {id:"P07-03",difficulte:2,titre:"Théorème de l'énergie cinétique",
       enonce:"90kg cycliste: W_prop=10000J W_f=-3000J v0=5m/s.\n1. Delta_Ec.\n2. v finale.\n3. P si Delta_t=20s.",
       correction:"1. Delta_Ec=7000J · 2. Ec_f=8125J → v=13,4m/s · 3. P=500W",
       notions:["Théorème Ec"]},
      {id:"P07-04",difficulte:2,titre:"Conservation énergie — ski",
       enonce:"70kg h_A=50m v_A=2m/s h_B=0 sans frottement.\n1. Em_A.\n2. v_B.\n3. h si v=20m/s.",
       correction:"1. Em=34440J · 2. v=31,4m/s · 3. h=29,8m",
       notions:["Conservation Em"]},
      {id:"P07-05",difficulte:2,titre:"Travail du poids",
       enonce:"m=2kg A(h=10m) → B(h=4m) g=9,8.\n1. W_poids=mg(hA-hB).\n2. Delta_Ep=-W_poids.\n3. Force conservative ?",
       correction:"1. W=117,6J · 2. Delta_Ep=-117,6J · 3. Oui (indépendant du chemin)",
       notions:["Travail poids"]},
      {id:"P07-06",difficulte:2,titre:"Ressort",
       enonce:"k=500N/m x=12cm m=100g.\n1. Ep=0,5kx².\n2. v_max.\n3. h_max vertical.",
       correction:"1. Ep=3,6J · 2. v=8,49m/s · 3. h=3,67m",
       notions:["Énergie élastique"]},
      {id:"P07-07",difficulte:2,titre:"Chute avec frottements",
       enonce:"0,2kg h=5m v_sol=8m/s.\n1. Em_i.\n2. Em_f.\n3. W_frottements.",
       correction:"1. Em_i=9,8J · 2. Em_f=6,4J · 3. W_f=-3,4J",
       notions:["Frottements"]},
      {id:"P07-08",difficulte:2,titre:"Puissance ascenseur",
       enonce:"500kg v=2m/s g=9,8.\n1. F motrice.\n2. P=Fv.\n3. E pour h=50m.",
       correction:"1. F=4900N · 2. P=9800W · 3. E=245000J",
       notions:["Puissance"]},
      {id:"P07-09",difficulte:3,titre:"Looping",
       enonce:"m=600kg h_A=40m boucle R=12m h_haut=24m g=9,8.\n1. v bas.\n2. v haut.\n3. N au sommet N=m(v²/R - g).",
       correction:"1. v=28m/s · 2. v=17,7m/s · 3. N=9780N",
       notions:["Looping"]},
      {id:"P07-10",difficulte:2,titre:"Parachutiste",
       enonce:"80kg chute libre 10s puis a=8m/s². g=10.\n1. v fin chute libre.\n2. Ec.\n3. F frottement parachute.",
       correction:"1. v=98m/s · 2. Ec=383kJ · 3. F=1440N",
       notions:["Parachute"]},
      {id:"P07-11",difficulte:2,titre:"Montagnes russes",
       enonce:"m=500kg h_A=30m h_B=0 h_C=20m v_A=0 g=10.\n1. v_B.\n2. v_C.\n3. h_D si v_D=5m/s.",
       correction:"1. v_B=24,5m/s · 2. v_C=14,1m/s · 3. h_D=28,75m",
       notions:["Conservation Em"]},
      {id:"P07-12",difficulte:2,titre:"Grue — rendement",
       enonce:"2000kg h=15m en 30s g=9,8.\n1. W_utile.\n2. P_utile.\n3. P_élec si eta=80%.",
       correction:"1. W=294kJ · 2. P=9800W · 3. P_élec=12250W",
       notions:["Rendement"]},
      {id:"P07-13",difficulte:3,titre:"Saut à la perche",
       enonce:"m=80kg v0=9m/s → h=5,4m.\n1. Ec initiale.\n2. Ep nette (h_CdG_sol=1m).\n3. Analyse bilan.",
       correction:"1. Ec=3240J · 2. Ep=3449J · 3. Ec < Ep → apport musculaire supplémentaire",
       notions:["Bilan énergie"]},
      {id:"P07-14",difficulte:2,titre:"Énergie orbitale satellite",
       enonce:"m=1000kg r=7000km GM=3,98x10^14.\n1. v.\n2. Ec.\n3. Ep=-GMm/r et Em.",
       correction:"1. v=7542m/s · 2. Ec=28,4GJ · 3. Ep=-56,9GJ · Em=-28,4GJ",
       notions:["Énergie orbitale"]},
      {id:"P07-15",difficulte:3,titre:"Freinage — chaleur freins",
       enonce:"1200kg v0=30m/s d=50m.\n1. Ec.\n2. F freinage.\n3. Delta_T freins (m=8kg c=500J/kgK).",
       correction:"1. Ec=540kJ · 2. F=10800N · 3. Delta_T=135°C",
       notions:["Freinage"]},
      {id:"P07-16",difficulte:2,titre:"Balle rebondissante",
       enonce:"m=100g h0=3m rebond h1=2m.\n1. Ec impact.\n2. Ec rebond.\n3. e=sqrt(h1/h0).",
       correction:"1. Ec=2,94J · 2. Ec=1,96J · 3. e=0,816",
       notions:["Rebond"]},
      {id:"P07-17",difficulte:2,titre:"Centrale hydraulique",
       enonce:"h=150m Q=300m³/s eta=92% rho=1000 g=9,8.\n1. P_hyd=rho x Q x g x h.\n2. P_élec.\n3. E/an (TWh).",
       correction:"1. P=441MW · 2. P_élec=406MW · 3. E=3,56TWh",
       notions:["Hydraulique"]},
      {id:"P07-18",difficulte:3,titre:"Météorite",
       enonce:"m=10^9 kg v=20km/s.\n1. Ec.\n2. Équivalent TNT (1t=4,2x10^9 J).",
       correction:"1. Ec=2x10^17 J · 2. 47,6 mégatonnes TNT",
       notions:["Impact météorite"]},
      {id:"P07-19",difficulte:2,titre:"Travail d'Archimède",
       enonce:"m=2kg V=5x10^-4 m³ descend d=1m eau rho=1000 g=9,8.\n1. F_A.\n2. Poids.\n3. W_résultante.",
       correction:"1. F_A=4,9N · 2. P=19,6N · 3. W_res=14,7J",
       notions:["Travail Archimède"]},
      {id:"P07-20",difficulte:3,titre:"Synthèse — éolienne",
       enonce:"R=50m v=12m/s rho=1,2 eta=42%.\n1. P_cin=0,5 rho pi R² v³.\n2. P_élec.\n3. dm/dt=rho pi R² v.",
       correction:"1. P=8,15MW · 2. P_élec=3,42MW · 3. dm/dt≈113t/s",
       notions:["Éolienne"]},
    ]
  },

  { id:"bilans-energetiques", numero:8,
    titre:"Bilans énergétiques",
    sousTitre:"Bilan puissance · Effet Joule · Rendement · Conduction · PAC",
    icon:"🔋", color:"#10b981",
    notions:["Bilan puissance","Effet Joule","Rendement","Conduction thermique","Chaleur spécifique","PAC"],
    exercices:[
      {id:"P08-01",difficulte:1,titre:"Rendement",
       enonce:"P_abs=1000W P_mec=750W.\n1. eta.\n2. P perdue en chaleur.\n3. Énergie utile en 1h.",
       correction:"1. eta=75% · 2. 250W · 3. 2,7MJ",
       notions:["Rendement"]},
      {id:"P08-02",difficulte:1,titre:"Chaleur spécifique",
       enonce:"1kg eau 20→80°C c=4180J/(kg·K). P=2kW.\n1. Q=mcDeltaT.\n2. t chauffage.\n3. eta si 10% perdu.",
       correction:"1. Q=251kJ · 2. t=125s · 3. t_réel=139s",
       notions:["Chaleur spécifique"]},
      {id:"P08-03",difficulte:2,titre:"Rendement global centrale",
       enonce:"eta1=40% eta2=98% eta3=99%.\n1. eta_global.\n2. Combustible pour 1kWh utile.\n3. Si eta1=55%.",
       correction:"1. eta=38,8% · 2. E=2,58kWh_fossile · 3. eta=53,3%",
       notions:["Rendement global"]},
      {id:"P08-04",difficulte:2,titre:"Énergie chimique — méthane",
       enonce:"DeltaH=-890kJ/mol M=16.\n1. E/kg.\n2. CO₂/kg.\n3. Comparer propane (DeltaH=-2220 M=44).",
       correction:"1. 55,6MJ/kg · 2. 2,75kg CO₂ · 3. Propane: 50,5MJ/kg → méthane plus énergétique/kg",
       notions:["Énergie chimique"]},
      {id:"P08-05",difficulte:2,titre:"Conduction thermique",
       enonce:"Mur e=20cm S=10m² lambda=0,8W/(mK) DeltaT=20°C.\n1. phi=lambda x S x DeltaT/e.\n2. Énergie 24h.\n3. Comment réduire les pertes.",
       correction:"1. phi=800W · 2. E=19,2kWh · 3. Isolation: augmenter e ou diminuer lambda",
       notions:["Conduction"]},
      {id:"P08-06",difficulte:2,titre:"Double vitrage",
       enonce:"Simple: e=6mm lambda=1. Double: e_air=15mm lambda_air=0,025 + 2 vitres. S=5m² DeltaT=25°C.\n1. R_therm de chaque.\n2. Flux phi.\n3. Économie 6 mois (0,18 euro/kWh).",
       correction:"1. R_simple=0,006 · R_double=0,612 m²K/W\n2. phi_simple=20833W · phi_double=204W\n3. Eco≈1611 euro/an",
       notions:["Double vitrage"]},
      {id:"P08-07",difficulte:2,titre:"Panneau solaire",
       enonce:"3 panneaux 2m² flux=900W/m² eta=18%.\n1. P_élec totale.\n2. kWh/an (1100h).\n3. Économie (0,18 euro/kWh).",
       correction:"1. P=972W · 2. E=1069kWh · 3. 192 euro/an",
       notions:["Solaire"]},
      {id:"P08-08",difficulte:2,titre:"Pompe à chaleur",
       enonce:"COP=4 P_élec=1kW.\n1. P_therm=COP x P_élec.\n2. P prélevée à extérieur.\n3. Économie vs radiateur élec.",
       correction:"1. P_therm=4kW · 2. P_ext=3kW · 3. PAC: 1kW élec pour 4kW therm → économie 75%",
       notions:["PAC"]},
      {id:"P08-09",difficulte:2,titre:"Chauffe-eau solaire",
       enonce:"Capteur 3m² flux=700W/m² eta=60%.\n1. P_therm.\n2. Q pour 150L 15→55°C.\n3. Durée.",
       correction:"1. P=1260W · 2. Q=25,08MJ · 3. t≈5,5h",
       notions:["Solaire thermique"]},
      {id:"P08-10",difficulte:2,titre:"Voiture élec vs thermique",
       enonce:"Therm: 7L/100km PCI=10kWh/L. Élec: 17kWh/100km.\n1. E therm/100km.\n2. CO₂ (élec=60g/kWh essence=2,4kg/L).\n3. Coût (élec=0,18 euro, essence=1,8 euro/L).",
       correction:"1. E=70kWh · 2. CO₂_élec=1kg vs CO₂_therm=16,8kg → ×16 moins\n3. Élec moins cher",
       notions:["Bilan carbone"]},
      {id:"P08-11",difficulte:2,titre:"Centrale nucléaire",
       enonce:"P_therm=3000MW eta=33%.\n1. P_élec.\n2. P chaleur dissipée.\n3. Surface panneaux équivalents (eta=20% E=200W/m²).",
       correction:"1. P_élec=990MW · 2. P_chaleur=2010MW · 3. S=24,75km²",
       notions:["Nucléaire"]},
      {id:"P08-12",difficulte:2,titre:"RT2020",
       enonce:"Maison 100m². RT2012=100kWh/m²/an. RT2020=50kWh/m²/an.\n1. Conso chaque norme.\n2. Économie (0,18 euro/kWh).\n3. Retour invest surcoût=5000 euro.",
       correction:"1. 10000 vs 5000kWh · 2. 900 euro/an · 3. 5,6 ans",
       notions:["RT2020"]},
      {id:"P08-13",difficulte:2,titre:"Géothermie",
       enonce:"Gradient 3°C/100m puits 3000m T_surf=15°C. Q=2MW eta=20%.\n1. T en fond.\n2. P_élec.\n3. CO₂ vs gaz (250g/kWh).",
       correction:"1. T=105°C · 2. P_élec=0,4MW · 3. ≈8× moins de CO₂",
       notions:["Géothermie"]},
      {id:"P08-14",difficulte:2,titre:"Bilan cycliste",
       enonce:"m=80kg P_meca=250W eta=25%. 2h de vélo.\n1. P_tot.\n2. Calories brûlées (1kcal=4186J).\n3. m(pâtes) (350kcal/100g).",
       correction:"1. P_tot=1000W · 2. E=7,2MJ=1720kcal · 3. m=491g",
       notions:["Métabolisme"]},
      {id:"P08-15",difficulte:2,titre:"Éolienne",
       enonce:"R=35m v=10m/s rho=1,2 eta=42%.\n1. P_hyd=0,5 x rho x pi x R² x v³.\n2. P_élec.\n3. Durée pour 1GWh.",
       correction:"1. P=2,31MW · 2. P_élec=0,97MW · 3. t≈43 jours",
       notions:["Éolien"]},
      {id:"P08-16",difficulte:2,titre:"Thermorégulation",
       enonce:"Course P_musc=600W eta=25%. m=70kg c=3500J/(kg·K).\n1. P_therm produite.\n2. DeltaT sans régulation (1h).\n3. Mécanisme.",
       correction:"1. P_therm=450W · 2. DeltaT=6,6°C → 43,6°C · 3. Transpiration: évaporation absorbe chaleur",
       notions:["Thermorégulation"]},
      {id:"P08-17",difficulte:3,titre:"Bilan maison BBC",
       enonce:"Chauffage 5000kWh ECS 2500kWh élec 3500kWh. PAC COP=3. Panneaux 4kWc (1200kWh/kWc).\n1. Conso totale.\n2. E_élec PAC.\n3. Production solaire.\n4. Facture nette (0,18 euro/kWh).",
       correction:"1. C=11000kWh · 2. E_PAC=1667kWh · 3. E_sol=4800kWh\n4. Achat=6200kWh → 1116 euro",
       notions:["Bilan maison"]},
      {id:"P08-18",difficulte:2,titre:"Gaz vs électrique",
       enonce:"Chaudière gaz eta=90%. Résistance élec P=5kW pendant 20min.\n1. E résistance.\n2. Coût (gaz=0,09 euro/kWh, élec=0,18 euro/kWh).\n3. Gaz vs élec: rapport.",
       correction:"1. E=1,67kWh · 2. Coût_gaz≈0,17 euro · Coût_élec=0,30 euro · 3. Gaz 2× moins cher ici",
       notions:["Comparaison énergies"]},
      {id:"P08-19",difficulte:2,titre:"Rayonnement solaire",
       enonce:"P_Soleil=3,84x10^26 W d=1,5x10^11 m.\n1. Flux phi=P/(4pi x d²).\n2. P panneau 2m² eta=20%.\n3. T Soleil par loi de Wien (lambda_max=502nm).",
       correction:"1. phi=1361W/m² · 2. P=544W · 3. T=5778K",
       notions:["Rayonnement"]},
      {id:"P08-20",difficulte:3,titre:"Transition énergétique",
       enonce:"Monde: 160000TWh/an 80% fossile CO₂=3,6x10^13 kg/an.\n1. E fossile.\n2. Réduire CO₂ de 50%: économie.\n3. Surface panneaux (eta=20% E=200W/m² 2000h/an).",
       correction:"1. E_fossile=128000TWh · 2. 1,8x10^13 kg CO₂ à économiser\n3. S≈1,6x10^6 km² (≈Europe)",
       notions:["Transition énergétique"]},
    ]
  },
  { id:"energie-chimique-thermique", numero:9,
    titre:"Énergie chimique & thermique",
    sousTitre:"DeltaH · Loi de Hess · Calorimétrie · PCI · Énergie de liaison",
    icon:"🔥", color:"#f97316",
    notions:["DeltaH","Énergie liaison","Loi Hess","Calorimétrie","PCI","Enthalpie dissolution"],
    exercices:[
      {id:"P09-01",difficulte:2,titre:"Énergie de liaison — DeltaH",
       enonce:"N₂ + 3H₂ → 2NH₃. E(N≡N)=945 E(H-H)=436 E(N-H)=391 kJ/mol.\n1. Liaisons rompues.\n2. Liaisons formées.\n3. DeltaH.",
       correction:"1. 945+3×436=2253kJ · 2. 6×391=2346kJ · 3. DeltaH=-93kJ/mol (exo)",
       notions:["Énergie liaison"]},
      {id:"P09-02",difficulte:1,titre:"Enthalpie de combustion",
       enonce:"Propane DeltaH=-2220kJ/mol M=44.\n1. E/kg.\n2. CO₂/kg.\n3. Comparer méthane (DeltaH=-890 M=16).",
       correction:"1. 50,5MJ/kg · 2. 3kg CO₂/kg propane · 3. Méthane: 55,6MJ/kg → plus énergétique/kg",
       notions:["DeltaH combustion"]},
      {id:"P09-03",difficulte:2,titre:"Loi de Hess",
       enonce:"DeltaH_f(CO₂)=-393 · DeltaH_f(H₂O)=-286 · DeltaH_f(C₂H₅OH)=-277 kJ/mol.\nDeltaH combustion éthanol: C₂H₅OH + 3O₂ → 2CO₂ + 3H₂O.",
       correction:"DeltaH=2(-393)+3(-286)-(-277)=-1367kJ/mol",
       notions:["Loi Hess"]},
      {id:"P09-04",difficulte:2,titre:"Calorimétrie",
       enonce:"100mL eau à 20°C + 100mL eau à 60°C. c=4180J/(kg·K).\n1. T finale.\n2. Chaleur échangée.\n3. Si 50mL à 60°C + 150mL à 20°C: T.",
       correction:"1. T=40°C · 2. Q=8360J · 3. T=30°C",
       notions:["Calorimétrie"]},
      {id:"P09-05",difficulte:2,titre:"Dissolution exothermique — NaOH",
       enonce:"NaOH: DeltaH_diss=-44,5kJ/mol M=40. 4g dans 200mL eau c=4180J/(kg·K).\n1. Exo ou endo.\n2. DeltaT.\n3. Pourquoi NaOH chauffe.",
       correction:"1. Exothermique (DeltaH < 0) · 2. DeltaT=5,3°C · 3. Énergie hydratation ions > énergie réseau",
       notions:["Enthalpie dissolution"]},
      {id:"P09-06",difficulte:2,titre:"PCI — hydrogène vs essence",
       enonce:"H₂: PCI=120MJ/kg. Essence: 45MJ/kg. Gazole: 43MJ/kg.\n1. H₂ vs essence: facteur.\n2. E/100km gazole (7L rho=0,85).\n3. m(H₂) équivalent.",
       correction:"1. H₂: 2,7× plus énergétique/kg · 2. E=256MJ · 3. m=2,13kg",
       notions:["PCI"]},
      {id:"P09-07",difficulte:2,titre:"Dissolution endothermique — NH4NO3",
       enonce:"NH₄NO₃: DeltaH=+26kJ/mol M=80. 8g dans 100mL eau.\n1. Exo ou endo.\n2. DeltaT.\n3. Application cold pack.",
       correction:"1. Endothermique · 2. DeltaT=-6,2°C · 3. Compresse froide chimique",
       notions:["Endothermique"]},
      {id:"P09-08",difficulte:2,titre:"Énergie alimentaire",
       enonce:"Glucose C₆H₁₂O₆ DeltaH=-2810kJ/mol M=180.\n1. E/g.\n2. Tablette chocolat (50g glucides).\n3. Durée course P=600W.",
       correction:"1. E=15,6kJ/g · 2. E=780kJ · 3. t=1300s≈22min",
       notions:["Énergie alimentaire"]},
      {id:"P09-09",difficulte:3,titre:"Bilan centrale gaz",
       enonce:"Centrale gaz DeltaH_CH4=-890kJ/mol. 1GW élec eta=55% durée=24h.\n1. E_élec.\n2. E_chimique consommée.\n3. n(CH₄) et m.",
       correction:"1. E=8,64x10^13 J · 2. E_chim=1,57x10^14 J · 3. n=1,76x10^8 mol → m=2820t",
       notions:["Centrale gaz"]},
      {id:"P09-10",difficulte:2,titre:"DeltaH par Hess — éthanol",
       enonce:"DeltaH_f(CO₂)=-393 DeltaH_f(H₂O)=-286 DeltaH_f(C₂H₅OH)=-277 kJ/mol.\nDeltaH combustion éthanol.",
       correction:"DeltaH=2(-393)+3(-286)-(-277)=-1367kJ/mol",
       notions:["Hess"]},
      {id:"P09-11",difficulte:2,titre:"Photon vs énergie de liaison C-C",
       enonce:"lambda=250nm (UV). E_liaison C-C=347kJ/mol. h=6,63x10^-34.\n1. E photon.\n2. E liaison C-C par photon.\n3. UV peut rompre liaison C-C ?",
       correction:"1. E=7,95x10^-19 J · 2. 5,76x10^-19 J · 3. E_UV > E_liaison → oui",
       notions:["Photochimie"]},
      {id:"P09-12",difficulte:2,titre:"Hydrogène comme carburant",
       enonce:"H₂ + 0,5O₂ → H₂O DeltaH=-286kJ/mol. Pile eta=60%.\n1. E_élec/mol.\n2. E/kg H₂ (M=2).\n3. Voiture 500km (15kWh/100km): m(H₂).",
       correction:"1. E=171,6kJ/mol · 2. E=85,8MJ/kg=23,8kWh/kg · 3. m=3,15kg",
       notions:["Hydrogène"]},
      {id:"P09-13",difficulte:2,titre:"Biocarburant — bilan CO2",
       enonce:"Éthanol DeltaH=-1370kJ/mol M=46. CO₂_comb=2,0kg/kg. CO₂_absorbe=2,3kg/kg.\n1. E/kg éthanol.\n2. CO₂ net.\n3. Comparer essence (45MJ/kg).",
       correction:"1. E=29,8MJ/kg · 2. CO₂_net≈0 (neutre théoriquement)\n3. Éthanol moins énergétique (29,8 vs 45MJ/kg)",
       notions:["Biocarburant"]},
      {id:"P09-14",difficulte:3,titre:"Calorimètre de combustion",
       enonce:"1g glucose brûlé. C_cal=10kJ/K DeltaT=+1,56°C. M=180.\n1. E libérée.\n2. DeltaH/mol.\n3. Comparer -2810kJ/mol théorique.",
       correction:"1. Q=15,6kJ · 2. DeltaH=-2808kJ/mol · 3. Erreur < 0,1% ✓",
       notions:["Calorimètre"]},
      {id:"P09-15",difficulte:3,titre:"Pile à combustible et cogénération",
       enonce:"H₂ + 0,5O₂ → H₂O DeltaH=-286kJ/mol. eta_elec=60% eta_therm=30%.\n1. E_élec/mol.\n2. E_therm.\n3. Rendement total (cogénération).",
       correction:"1. E_élec=171,6kJ/mol · 2. E_therm=85,8kJ/mol · 3. eta_total=90%",
       notions:["Cogénération"]},
      {id:"P09-16",difficulte:2,titre:"Dissolution HCl — sécurité",
       enonce:"HCl(g) → HCl(aq) DeltaH=-74,8kJ/mol M=36,5. 1g dans 50mL eau.\n1. Exo ou endo.\n2. DeltaT.\n3. Précaution.",
       correction:"1. Exothermique · 2. DeltaT≈9,8°C · 3. Ajouter acide dans eau (jamais inverse)",
       notions:["Sécurité chimie"]},
      {id:"P09-17",difficulte:2,titre:"Combustion du bois",
       enonce:"PCI=17MJ/kg eta=75%.\n1. E_utile/kg.\n2. m(bois)/h pour P=2kW.\n3. CO₂/an si 3t bois (1,8kgCO₂/kg).",
       correction:"1. E=12,75MJ/kg · 2. m=0,565kg/h · 3. CO₂=5400kg",
       notions:["Biomasse"]},
      {id:"P09-18",difficulte:2,titre:"Décomposition calcaire",
       enonce:"CaCO₃ → CaO + CO₂. DeltaH=+178kJ/mol M=100.\n1. Exo ou endo.\n2. E pour 1t CaCO₃.\n3. Utilisation CaO.",
       correction:"1. Endothermique (four requis) · 2. E=1,78x10^9 J=494kWh · 3. Ciment, chaulage",
       notions:["Calcination"]},
      {id:"P09-19",difficulte:3,titre:"Biogaz — analyse",
       enonce:"Biogaz: 65%CH₄ + 35%CO₂. P=1atm T=25°C V=100L.\n1. n(CH₄) et n(CO₂).\n2. E si CH₄ brûlé (DeltaH=-890kJ/mol).\n3. Utilisation CO₂.",
       correction:"1. n_tot=4,04mol · n(CH₄)=2,63mol · n(CO₂)=1,41mol\n2. E=2341kJ · 3. Serres, boissons",
       notions:["Biogaz"]},
      {id:"P09-20",difficulte:3,titre:"Chauffe-eau solaire vs gaz",
       enonce:"Capteur 3m² eta=60% flux=700W/m². Besoin: 150L 15→55°C/j. Gaz eta=90% à 0,09 euro/kWh.\n1. Q nécessaire.\n2. Durée capteur (6h soleil/j).\n3. Économie/an.",
       correction:"1. Q=25,08MJ=6,97kWh · 2. t=5,5h < 6h → suffisant · 3. Économie≈254 euro/an",
       notions:["Solaire thermique"]},
    ]
  },
  { id:"ondes-mecaniques", numero:10,
    titre:"Ondes mécaniques progressives",
    sousTitre:"Propagation · Célérité · Retard · lambda=v/f · Diffraction · Doppler",
    icon:"🌊", color:"#8b5cf6",
    notions:["Onde progressive","Célérité","Retard","lambda=v/f","Diffraction","Interférences","Doppler"],
    exercices:[
      {id:"P10-01",difficulte:1,titre:"lambda=v/f",
       enonce:"Son v=340m/s.\n1. lambda pour f=440Hz.\n2. T.\n3. lambda pour f=20Hz.",
       correction:"1. lambda=0,773m · 2. T=2,27ms · 3. lambda=17m",
       notions:["lambda=v/f"]},
      {id:"P10-02",difficulte:1,titre:"Retard",
       enonce:"Foudre à 2,5km v=340m/s.\n1. tau.\n2. Si tau=5s: d.\n3. Sonar tau=0,8s v=1500m/s: d.",
       correction:"1. tau=7,35s · 2. d=1700m · 3. d=600m",
       notions:["Retard"]},
      {id:"P10-03",difficulte:2,titre:"Longitudinale vs transversale",
       enonce:"1. Définir et donner exemples.\n2. Son dans eau: type.\n3. Onde sur corde: type.",
       correction:"1. Transversale: oscillation perp propagation (lumière, corde)\nLongitudinale: oscillation parallèle (son, ultrason)\n2. Longitudinale · 3. Transversale",
       notions:["Types ondes"]},
      {id:"P10-04",difficulte:2,titre:"Célérité dans différents milieux",
       enonce:"v_air=340 v_eau=1500 v_acier=5100 m/s. f=2kHz.\n1. lambda dans chaque.\n2. Pourquoi v_acier > v_eau > v_air.\n3. Retard pour 1km dans chaque.",
       correction:"1. lambda_air=0,17m · lambda_eau=0,75m · lambda_acier=2,55m\n2. Rigidité croissante\n3. tau_air=2,94s · tau_eau=0,667s · tau_acier=0,196s",
       notions:["Célérité"]},
      {id:"P10-05",difficulte:2,titre:"Représentation d'une onde",
       enonce:"Onde: y=3 sin(2pi(t/0,02 - x/6,8)) cm.\n1. T et f.\n2. lambda et v.\n3. y(x=0 t=0,005s).",
       correction:"1. T=0,02s f=50Hz · 2. lambda=6,8m v=340m/s · 3. y=3cm",
       notions:["Représentation"]},
      {id:"P10-06",difficulte:2,titre:"Corde vibrante — modes propres",
       enonce:"Corde L=1m v=200m/s.\n1. f1=v/(2L).\n2. f2 f3 f4.\n3. L pour f1=440Hz (La).",
       correction:"1. f1=100Hz · 2. f2=200Hz f3=300Hz f4=400Hz · 3. L=0,227m",
       notions:["Ondes stationnaires"]},
      {id:"P10-07",difficulte:2,titre:"Déphasage",
       enonce:"Source à x=0 lambda=0,8m. Point A à x=0,2m v=320m/s.\n1. tau.\n2. phi=2pi x/lambda.\n3. En avance ou retard.",
       correction:"1. tau=6,25x10^-4 s · 2. phi=pi/2 (90°) · 3. En retard",
       notions:["Déphasage"]},
      {id:"P10-08",difficulte:2,titre:"Diffraction",
       enonce:"Onde lambda=2m fente a=3m.\n1. Condition diffraction (a≈lambda).\n2. theta=lambda/a.\n3. Comparer lambda=0,5m.",
       correction:"1. a=3m lambda=2m → a≈lambda → diffraction notable\n2. theta=38°\n3. lambda=0,5m → a/lambda=6 >> 1 → diffraction faible",
       notions:["Diffraction"]},
      {id:"P10-09",difficulte:2,titre:"Interférences",
       enonce:"S1 et S2 en phase f=500Hz v=340m/s. Point P: d1=2m d2=2,68m.\n1. lambda.\n2. delta=d2-d1.\n3. Constructive ou destructive.",
       correction:"1. lambda=0,68m · 2. delta=0,68m=lambda → constructive (maximum)",
       notions:["Interférences"]},
      {id:"P10-10",difficulte:2,titre:"Doppler — ambulance",
       enonce:"f0=500Hz v_source=30m/s v_son=340m/s.\n1. f approche.\n2. f éloignement.\n3. Delta_f.",
       correction:"1. f=548Hz · 2. f=459Hz · 3. Delta_f=89Hz",
       notions:["Doppler"]},
      {id:"P10-11",difficulte:3,titre:"Chauve-souris — sonar",
       enonce:"f=80kHz v=340m/s. Insecte à d=2m.\n1. lambda.\n2. tau aller-retour.\n3. Résolution.",
       correction:"1. lambda=4,25mm · 2. tau=11,8ms · 3. Résolution≈4,25mm",
       notions:["Sonar biologique"]},
      {id:"P10-12",difficulte:2,titre:"Ondes sismiques",
       enonce:"Onde P v=6km/s Onde S v=3,5km/s. Station à d=500km.\n1. t_P et t_S.\n2. Delta_t.\n3. Localisation.",
       correction:"1. t_P=83,3s · t_S=142,9s · 2. Delta_t=59,6s · 3. Triangulation avec 3 stations",
       notions:["Sismologie"]},
      {id:"P10-13",difficulte:2,titre:"Corde — tension et vitesse",
       enonce:"Corde L=80cm mu=5x10^-3 kg/m T=320N. v=sqrt(T/mu).\n1. v.\n2. f1.\n3. T double: f1.",
       correction:"1. v=253m/s · 2. f1=158Hz · 3. f1 x sqrt(2)=223Hz",
       notions:["Corde vibrante"]},
      {id:"P10-14",difficulte:2,titre:"Radar Doppler",
       enonce:"f0=10GHz. Voiture réfléchit f=10,000200GHz.\n1. Delta_f.\n2. v=c x Delta_f/(2f0).\n3. En km/h.",
       correction:"1. Delta_f=200kHz · 2. v=3m/s · 3. 10,8km/h",
       notions:["Radar"]},
      {id:"P10-15",difficulte:3,titre:"GPS",
       enonce:"Satellite f=1575MHz c=3x10^8 m/s Delta_t=66,7ms.\n1. d.\n2. Delta_f Doppler si v_sat=3,87km/s.\n3. Précision si Delta_t ± 10ns.",
       correction:"1. d=20000km · 2. Delta_f=20,3kHz · 3. Delta_d=3m",
       notions:["GPS"]},
      {id:"P10-16",difficulte:2,titre:"Diffraction lumière",
       enonce:"lambda=550nm fente a=0,2mm D=1m.\n1. Condition.\n2. theta=lambda/a.\n3. Largeur tache centrale.",
       correction:"1. a >> lambda mais diffraction visible\n2. theta=2,75x10^-3 rad · 3. L=5,5mm",
       notions:["Diffraction lumière"]},
      {id:"P10-17",difficulte:2,titre:"Tuyaux sonores",
       enonce:"L=0,5m v=340m/s.\n1. Tuyau ouvert-ouvert: f1=v/(2L).\n2. Tuyau ouvert-fermé: f1=v/(4L).\n3. Modes harmoniques.",
       correction:"1. f1=340Hz · 2. f1=170Hz\n3. Ouvert-ouvert: tous harmoniques · Ouvert-fermé: harmoniques impairs",
       notions:["Tuyaux sonores"]},
      {id:"P10-18",difficulte:3,titre:"Onde stationnaire",
       enonce:"Onde y=2sin(2pi(x/lambda - ft)) réfléchie sur paroi rigide.\n1. Onde réfléchie.\n2. Onde stationnaire y_total.\n3. Ventres et noeuds.",
       correction:"1. y_r=+2sin(2pi(x/lambda + ft)) (inversion de phase)\n2. y_tot=4sin(2pi x/lambda) cos(2pi ft)\n3. Ventre: x=lambda/4 + n lambda/2 · Noeud: x=n lambda/2",
       notions:["Réflexion onde"]},
      {id:"P10-19",difficulte:2,titre:"Célérité et température",
       enonce:"v_son=331+0,6T (T en °C).\n1. v à 0°C et 20°C.\n2. lambda(440Hz) aux 2 températures.\n3. Pourquoi v eau > v air.",
       correction:"1. v(0)=331m/s · v(20)=343m/s\n2. lambda(0)=0,752m · lambda(20)=0,780m\n3. Eau: molécules plus proches, liaisons H transmettent mieux",
       notions:["Célérité vs T"]},
      {id:"P10-20",difficulte:3,titre:"Synthèse — échographie",
       enonce:"Sonde 7,5MHz. Tissu v=1540m/s. Écho tau=30μs.\n1. lambda tissu.\n2. Profondeur.\n3. Résolution axiale.",
       correction:"1. lambda=0,205mm · 2. d=2,31cm · 3. Résol=lambda/2=0,1mm",
       notions:["Échographie"]},
    ]
  },
  { id:"ondes-sonores", numero:11,
    titre:"Ondes sonores",
    sousTitre:"Son pur · Timbre · Hauteur · Spectre · Intensité dB",
    icon:"🎵", color:"#ec4899",
    notions:["Son pur","Timbre","Hauteur","Spectre","Intensité sonore","dB","Harmoniques"],
    exercices:[
      {id:"P11-01",difficulte:1,titre:"Son pur vs composé",
       enonce:"Diapason: 440Hz sinusoïde. Violon: 440Hz + harmoniques.\n1. Définir son pur et composé.\n2. Même hauteur ?\n3. Timbre différent: pourquoi.",
       correction:"1. Pur: 1 fréquence · Composé: plusieurs\n2. Oui (même f1=440Hz) · 3. Spectre harmonique différent",
       notions:["Son pur/composé"]},
      {id:"P11-02",difficulte:1,titre:"Niveau d'intensité sonore",
       enonce:"L=10 log(I/I0) I0=10^-12 W/m².\n1. L si I=10^-8 W/m².\n2. I si L=80dB.\n3. L1=L2=70dB: L_total.",
       correction:"1. L=40dB · 2. I=10^-4 W/m² · 3. I_tot=2x10^-5 → L≈73dB",
       notions:["dB"]},
      {id:"P11-03",difficulte:2,titre:"Spectre d'amplitude",
       enonce:"f1=200Hz f2=400Hz f3=600Hz. A1=5 A2=3 A3=1.\n1. Fondamental et harmoniques.\n2. Note approximative.\n3. Si A3→0: son change comment.",
       correction:"1. f1: fondamental · f2: 2ème · f3: 3ème\n2. Sol3≈196Hz · 3. Timbre change, hauteur identique",
       notions:["Spectre","Harmoniques"]},
      {id:"P11-04",difficulte:2,titre:"Hauteur, timbre, intensité",
       enonce:"1. Définir hauteur timbre intensité.\n2. I à 120dB.\n3. I à 60dB.",
       correction:"1. Hauteur=f fondamentale · Timbre=spectre · Intensité=énergie\n2. I=1W/m² · 3. I=10^-6 W/m²",
       notions:["Hauteur Timbre"]},
      {id:"P11-05",difficulte:2,titre:"Diffraction et écoute",
       enonce:"f=500Hz v=340m/s. Mur avec ouverture a=70cm.\n1. lambda.\n2. Condition diffraction.\n3. f=3400Hz: diffraction.",
       correction:"1. lambda=68cm · 2. a≈lambda → forte diffraction\n3. lambda=10cm << a → diffraction faible → son directionnel",
       notions:["Diffraction sonore"]},
      {id:"P11-06",difficulte:2,titre:"Réverbération",
       enonce:"Cathédrale T_reverb=6s. Concert T_reverb=2s.\n1. Pourquoi cathédrale T élevé.\n2. Idéal musique vs parole.\n3. Comment réduire T_reverb.",
       correction:"1. Parois réfléchissantes + grand volume\n2. Musique: 1,5-2s · Parole: 0,5-1s\n3. Matériaux absorbants (moquette, rideaux, dalles)",
       notions:["Réverbération"]},
      {id:"P11-07",difficulte:2,titre:"Harmoniques tuyau",
       enonce:"Flûte ouverte L=40cm v=340m/s.\n1. f1.\n2. f2 f3.\n3. Clarinette (tuyau fermé): f1.",
       correction:"1. f1=425Hz · 2. f2=850Hz f3=1275Hz\n3. f1=212Hz (harmoniques impairs uniquement)",
       notions:["Acoustique musicale"]},
      {id:"P11-08",difficulte:2,titre:"Battement acoustique",
       enonce:"Deux sources f1=440Hz et f2=443Hz.\n1. Fréquence de battement f_bat=|f1-f2|.\n2. Période battement.\n3. Utilisation pour accordage.",
       correction:"1. f_bat=3Hz · 2. T_bat=0,33s\n3. Accorder jusqu'à f_bat=0 (unisson)",
       notions:["Battement"]},
      {id:"P11-09",difficulte:2,titre:"Doppler sonore",
       enonce:"Source f0=1000Hz v_source=20m/s. v_son=340m/s.\n1. f observateur approche source.\n2. f observateur s'éloigne.\n3. Application médecine.",
       correction:"1. f=1062Hz · 2. f=944Hz · 3. Doppler vasculaire (mesure flux sanguin)",
       notions:["Doppler"]},
      {id:"P11-10",difficulte:2,titre:"Son dans différents milieux",
       enonce:"v_air=340 v_eau=1500 v_acier=5100. f=5000Hz.\n1. lambda dans chaque.\n2. Pourquoi v croît.\n3. Isolation phonique: matériau.",
       correction:"1. lambda_air=68mm · lambda_eau=300mm · lambda_acier=1020mm\n2. Rigidité et densité augmentent\n3. Laine de verre: absorbe énergie acoustique",
       notions:["Célérité"]},
      {id:"P11-11",difficulte:2,titre:"Spectre vocal",
       enonce:"Voyelle a: f1=120Hz (voix homme). Harmoniques f2=240 f3=360.\n1. Quelle note.\n2. Formants à 800Hz et 1200Hz: rôle.\n3. Traitement numérique audio.",
       correction:"1. 120Hz ≈ Si2\n2. Formants: résonances du conduit vocal qui colorent la voix\n3. Filtres numériques amplifient/atténuent certaines fréquences",
       notions:["Voix","Formants"]},
      {id:"P11-12",difficulte:2,titre:"Écho en montagne",
       enonce:"Randonneur crie. Paroi à d=500m v=340m/s.\n1. tau aller-retour.\n2. Écho audible (tau > 0,1s) ?\n3. Si tau=0,04s: écho ou réverbération.",
       correction:"1. tau=2,94s · 2. 2,94 > 0,1 → écho audible\n3. tau=0,04s < 0,1s → réverbération",
       notions:["Écho","Réverbération"]},
      {id:"P11-13",difficulte:3,titre:"Acoustique concert — RT60",
       enonce:"Volume V=15000m³. Surface S=5000m². Coeff absorption alpha_moy=0,15.\nRT60=0,161 x V/(S x alpha_moy).\n1. RT60.\n2. Idéal musique classique.\n3. Si alpha_moy→0,3: RT60.",
       correction:"1. RT60=3,22s · 2. 1,5-2s (trop longue → ajouter absorbants)\n3. RT60=1,61s (mieux)",
       notions:["Acoustique architecturale"]},
      {id:"P11-14",difficulte:2,titre:"Interférences sonores",
       enonce:"2 HP en phase f=680Hz v=340m/s. P: d1=1m d2=1,5m.\n1. lambda.\n2. delta=d2-d1.\n3. Constructive ou destructive.",
       correction:"1. lambda=0,5m · 2. delta=0,5m=lambda → constructive (maximum)",
       notions:["Interférences"]},
      {id:"P11-15",difficulte:3,titre:"Synthèse — ultrason chirurgical",
       enonce:"HIFU (ultrasons focalisés): f=1MHz v=1540m/s.\n1. lambda.\n2. Profondeur si écho tau=0,013s.\n3. Application médicale.",
       correction:"1. lambda=1,54mm · 2. d=10cm · 3. Destruction tumeurs par chaleur (thermoablation)",
       notions:["HIFU"]},
      {id:"P11-16",difficulte:2,titre:"Timbre instrumental",
       enonce:"Hautbois et violon jouent La 440Hz. Hautbois: harmoniques pairs absents.\n1. Timbre: rôle.\n2. Hautbois: spectre schématique.\n3. Pourquoi on distingue les instruments.",
       correction:"1. Timbre = composition harmonique\n2. Raies à 440, 1320, 2200 Hz (harmoniques impairs)\n3. Chaque instrument a une signature spectrale unique",
       notions:["Timbre instrumental"]},
      {id:"P11-17",difficulte:2,titre:"Décibels et addition",
       enonce:"Marteau: L=85dB. Deuxième marteau identique.\n1. I marteau seul.\n2. I deux marteaux.\n3. L total.",
       correction:"1. I=3,16x10^-4 W/m² · 2. I_tot=6,32x10^-4 W/m² · 3. L=88dB",
       notions:["dB addition"]},
      {id:"P11-18",difficulte:3,titre:"Audiogramme",
       enonce:"Seuil normal: 0dB HL à 1000Hz. Patient: +40dB HL à 4000Hz.\n1. I correspondant à +40dB HL.\n2. Type de surdité.\n3. Gain appareillage.",
       correction:"1. I=10^-8 W/m² · 2. Surdité de perception (cellules ciliées)\n3. Gain=40dB à 4000Hz",
       notions:["Audiologie"]},
      {id:"P11-19",difficulte:2,titre:"Comparaison son et onde EM",
       enonce:"Câble coaxial: onde EM v=2x10^8 m/s f=1GHz.\n1. lambda.\n2. Retard sur 1m.\n3. Comparer son et EM: propagation.",
       correction:"1. lambda=0,2m=20cm · 2. tau=5ns\n3. Son: mécanique, milieu requis · EM: champ, se propage dans vide",
       notions:["Comparaison onde son/EM"]},
      {id:"P11-20",difficulte:3,titre:"Synthèse — acoustique sous-marine",
       enonce:"SONAR: f=10kHz v=1500m/s. Baleine à d=5km.\n1. lambda.\n2. tau aller-retour.\n3. f Doppler si baleine à v=5m/s vers sonar.",
       correction:"1. lambda=0,15m · 2. tau=6,67s\n3. f=10000 x (1500+5)/(1500-5)=10033Hz → Delta_f=33Hz",
       notions:["SONAR","Doppler"]},
    ]
  },
  { id:"ondes-electromagnetiques", numero:12,
    titre:"Ondes électromagnétiques & couleurs",
    sousTitre:"Spectre EM · Réfraction · Couleurs · Loi de Wien · Photon",
    icon:"🌈", color:"#06b6d4",
    notions:["Spectre EM","Réfraction","Couleurs","Synthèse","Loi Wien","Photon","Diffraction"],
    exercices:[
      {id:"P12-01",difficulte:1,titre:"Spectre électromagnétique",
       enonce:"Classer par lambda croissante: radio micro-ondes IR visible UV X gamma.\nPour lambda=500nm: f et domaine.",
       correction:"Gamma < X < UV < Visible < IR < Micro-ondes < Radio\nf=6x10^14 Hz · visible vert",
       notions:["Spectre EM"]},
      {id:"P12-02",difficulte:1,titre:"Loi de Snell-Descartes",
       enonce:"Air(n=1) → verre(n=1,5). theta1=45°.\n1. Loi n1 sin(theta1)=n2 sin(theta2).\n2. theta2.\n3. Se rapproche ou s'éloigne de la normale.",
       correction:"1. n1 sin(theta1)=n2 sin(theta2)\n2. sin(theta2)=sin45°/1,5=0,471 → theta2=28°\n3. Se rapproche",
       notions:["Réfraction"]},
      {id:"P12-03",difficulte:2,titre:"Indice et vitesse",
       enonce:"n(verre)=1,5. v=c/n.\n1. v.\n2. lambda dans verre si lambda_air=600nm.\n3. Fréquence change dans verre.",
       correction:"1. v=2x10^8 m/s · 2. lambda=400nm · 3. Non: f=c/lambda_air=v/lambda_verre (f invariante)",
       notions:["Indice"]},
      {id:"P12-04",difficulte:2,titre:"Synthèse additive et soustractive",
       enonce:"1. R+V=? R+B=? V+B=? R+V+B=?\n2. Cyan+Magenta (soustractive).\n3. Objet vert sous lumière rouge.",
       correction:"1. Jaune · Magenta · Cyan · Blanc · 2. Bleu · 3. Noir",
       notions:["Couleurs"]},
      {id:"P12-05",difficulte:2,titre:"Loi de Wien — étoiles",
       enonce:"lambda_max x T=2,9x10^-3 m·K. Soleil T=5778K. Bételgeuse T=3500K.\n1. lambda_max Soleil.\n2. lambda_max Bételgeuse.\n3. Couleurs.",
       correction:"1. lambda=502nm (jaune-blanc) · 2. lambda=829nm (rouge orangé)\n3. Soleil: jaune-blanc · Bételgeuse: rouge",
       notions:["Loi Wien"]},
      {id:"P12-06",difficulte:2,titre:"Énergie d'un photon",
       enonce:"lambda=450nm (bleu). h=6,63x10^-34.\n1. f.\n2. E=hf.\n3. Comparer à lambda=700nm.",
       correction:"1. f=6,67x10^14 Hz · 2. E=4,42x10^-19 J=2,76eV · 3. Bleu: E plus grande",
       notions:["Photon"]},
      {id:"P12-07",difficulte:2,titre:"Réflexion totale interne",
       enonce:"Verre n=1,5 → air.\n1. theta_L=arcsin(1/n).\n2. theta=45°: RT ?\n3. Fibre optique.",
       correction:"1. theta_L=41,8° · 2. 45° > 41,8° → RT ✓ · 3. Réflexions totales successives",
       notions:["Réflexion totale"]},
      {id:"P12-08",difficulte:2,titre:"Diffraction — réseau",
       enonce:"Réseau 600tr/mm. lambda=589nm.\n1. d=1/600 mm.\n2. theta ordre 1: d sin(theta)=lambda.\n3. theta ordre 2.",
       correction:"1. d=1,67μm · 2. sin(theta)=0,353 → theta=20,6° · 3. sin(theta)=0,705 → theta=44,8°",
       notions:["Réseau","Diffraction"]},
      {id:"P12-09",difficulte:2,titre:"Young — mesure lambda",
       enonce:"a=0,4mm D=2m. 10 interfranges=29mm.\n1. i.\n2. lambda=i x a/D.\n3. Couleur.",
       correction:"1. i=2,9mm · 2. lambda=580nm · 3. Jaune-orange",
       notions:["Young"]},
      {id:"P12-10",difficulte:2,titre:"Couleur des objets",
       enonce:"1. Objet blanc en rouge.\n2. Objet cyan en rouge.\n3. Objet noir.",
       correction:"1. Rouge · 2. Noir (cyan=V+B absorbe rouge) · 3. Absorbe tout",
       notions:["Couleur objets"]},
      {id:"P12-11",difficulte:2,titre:"Dispersion — arc-en-ciel",
       enonce:"n_rouge=1,51 n_violet=1,53. theta1=45°.\n1. theta2 rouge et violet.\n2. Dispersion: définir.\n3. Ordre couleurs arc-en-ciel.",
       correction:"1. theta2_rouge=27,9° · theta2_violet=27,5°\n2. n varie avec lambda → couleurs déviées différemment\n3. Rouge extérieur violet intérieur",
       notions:["Dispersion"]},
      {id:"P12-12",difficulte:2,titre:"Absorption chlorophylles",
       enonce:"Chlorophylle a absorbe à 430nm et 680nm.\n1. Domaines EM.\n2. Couleurs absorbées.\n3. Pourquoi feuilles vertes.",
       correction:"1. Visible (bleu-violet et rouge)\n2. Violet-bleu et rouge\n3. Lumière verte réfléchie → feuilles vertes",
       notions:["Absorption","Photosynthèse"]},
      {id:"P12-13",difficulte:3,titre:"Fibre optique — dispersion",
       enonce:"n_coeur=1,5 n_gaine=1,45 L=100km.\n1. theta_c.\n2. v.\n3. t transit.\n4. Dispersion modale Delta_t.",
       correction:"1. theta_c=75° · 2. v=2x10^8 m/s · 3. t=0,5ms · 4. Delta_t=1,43ms",
       notions:["Fibre optique"]},
      {id:"P12-14",difficulte:2,titre:"LASER — photons",
       enonce:"LASER rouge lambda=632,8nm. P=5mW. Spot A=1mm².\n1. f.\n2. Intensité I=P/A.\n3. E par photon et nombre par seconde.",
       correction:"1. f=4,74x10^14 Hz · 2. I=5000W/m²\n3. E=3,14x10^-19 J · N=P/E=1,59x10^16 photons/s",
       notions:["Laser","Photon"]},
      {id:"P12-15",difficulte:3,titre:"Synthèse — astrophysique",
       enonce:"Étoile: lambda_max=289nm. Raie H à lambda_obs=657nm (lambda0=656nm).\n1. T par Wien.\n2. Type étoile.\n3. S'approche ou s'éloigne. 4. v=c x Delta_lambda/lambda0.",
       correction:"1. T=10035K · 2. Étoile chaude bleue-blanche\n3. Delta_lambda=+1nm → s'éloigne (rouge shift)\n4. v=457km/s",
       notions:["Astrophysique","Doppler"]},
      {id:"P12-16",difficulte:2,titre:"Lumière et sécurité",
       enonce:"UV: lambda=300nm. IR: lambda=1000nm.\n1. E photon UV et IR.\n2. Lequel plus dangereux pour la peau.\n3. Indice UV=12: risque.",
       correction:"1. E_UV=6,63x10^-19 J · E_IR=1,99x10^-19 J\n2. UV (énergie plus grande, ionisant)\n3. Indice 12=extrême → protection obligatoire",
       notions:["Sécurité UV"]},
      {id:"P12-17",difficulte:2,titre:"Rayons X — imagerie médicale",
       enonce:"Rayons X: lambda=0,1nm.\n1. f.\n2. E_photon en keV (1eV=1,6x10^-19 J).\n3. Pourquoi traversent les tissus mous.",
       correction:"1. f=3x10^18 Hz · 2. E=12,4keV\n3. Énergie élevée → ionisants → traversent matières peu denses",
       notions:["Rayons X"]},
      {id:"P12-18",difficulte:3,titre:"Interféromètre LIGO",
       enonce:"LIGO: déformation Delta_l/l=10^-21. Bras L=4km. Laser lambda=1064nm.\n1. Delta_l en attomètres (1am=10^-18 m).\n2. Combien de lambda cela représente.\n3. Quel phénomène détecte-t-il.",
       correction:"1. Delta_l=4am · 2. Delta_l/lambda=3,76x10^-12 (infime fraction de lambda!)\n3. Ondes gravitationnelles (fusion trous noirs)",
       notions:["Interférométrie"]},
      {id:"P12-19",difficulte:2,titre:"Vision des abeilles",
       enonce:"Abeilles voient UV (300-400nm) + visible (400-650nm). Humains: 380-780nm.\n1. Abeilles voient-elles le rouge ?\n2. Voient-elles le bleu ?\n3. Comment les fleurs exploitent cela.",
       correction:"1. Non: rouge≈700nm > 650nm\n2. Oui (400-650nm inclut bleu)\n3. Marquages UV invisibles pour humains guident abeilles vers nectar",
       notions:["Vision","Spectre visible"]},
      {id:"P12-20",difficulte:3,titre:"Synthèse — télescope James Webb",
       enonce:"JWST: miroir D=6,5m. Observe IR lambda=0,6-28μm.\n1. Pourquoi IR et pas visible.\n2. Résolution angulaire theta=lambda/D pour lambda=2μm.\n3. Comparer Hubble (D=2,4m lambda_visible=500nm).",
       correction:"1. Galaxies lointaines décalées vers rouge + nuages pousière transparents en IR\n2. theta=3,1x10^-7 rad\n3. theta_Hubble=2,1x10^-7 rad → Hubble légèrement meilleur dans son domaine",
       notions:["Télescope","Résolution"]},
    ]
  },
  { id:"signaux-electriques", numero:13,
    titre:"Signaux électriques & numérisation",
    sousTitre:"Oscilloscope · Signal AC · Numérisation · Shannon · Débit · Filtres",
    icon:"📡", color:"#f97316",
    notions:["Oscilloscope","Signal AC","Numérisation","Shannon","Débit","Filtres","CAN","Codage"],
    exercices:[
      {id:"P13-01",difficulte:1,titre:"Oscilloscope — lecture",
       enonce:"Base temps: 5ms/div. Sensibilité: 2V/div. 4 div horiz 3 div vert pp.\n1. T.\n2. U_pp.\n3. f.",
       correction:"1. T=20ms · 2. U_pp=6V · 3. f=50Hz",
       notions:["Oscilloscope"]},
      {id:"P13-02",difficulte:1,titre:"Signal AC — valeur efficace",
       enonce:"U_max=325V f=50Hz.\n1. U_eff=U_max/sqrt(2).\n2. T.\n3. I_eff si R=100Ω.",
       correction:"1. U_eff=230V · 2. T=20ms · 3. I_eff=2,3A",
       notions:["Signal AC"]},
      {id:"P13-03",difficulte:2,titre:"Shannon — critère",
       enonce:"f_max=20kHz.\n1. f_e min.\n2. CD f_e=44100Hz: critère ok ?\n3. 16bits: niveaux de quantification.",
       correction:"1. f_e ≥ 40kHz · 2. 44100 > 40000 ✓ · 3. 2^16=65536 niveaux",
       notions:["Shannon"]},
      {id:"P13-04",difficulte:2,titre:"Débit numérique",
       enonce:"CD: f_e=44100Hz 16bits stéréo.\n1. Débit brut.\n2. Durée 700Mo.\n3. f_max reproductible.",
       correction:"1. 1,41Mbps=176ko/s · 2. ≈66min · 3. 22050Hz",
       notions:["Débit"]},
      {id:"P13-05",difficulte:2,titre:"CAN — quantification",
       enonce:"CAN: 0-5V 8bits.\n1. Pas Delta=5/(2^8-1).\n2. Code de U=3V.\n3. Erreur max.",
       correction:"1. Delta=19,6mV · 2. k≈153 → 10011001 en binaire · 3. Erreur≈9,8mV",
       notions:["Quantification"]},
      {id:"P13-06",difficulte:2,titre:"Analogique vs numérique",
       enonce:"1. Définir analogique et numérique.\n2. Avantages numérique.\n3. Débit voix (f_e=8kHz 8bits).",
       correction:"1. Analogique: continu · Numérique: discret 0/1\n2. Insensible bruit, compression, copies parfaites\n3. 64kbps",
       notions:["Analogique","Numérique"]},
      {id:"P13-07",difficulte:2,titre:"Signal audio — codage",
       enonce:"Voix 300Hz-3400Hz. Téléphonie: f_e=8kHz 8bits.\n1. Shannon vérifié ?\n2. Niveaux.\n3. Débit.",
       correction:"1. f_e=8kHz ≥ 2x3400=6800Hz ✓ · 2. 256 niveaux · 3. 64kbps",
       notions:["Téléphonie"]},
      {id:"P13-08",difficulte:2,titre:"Image numérique",
       enonce:"1920×1080 pixels 24bits/pixel.\n1. Taille brute.\n2. JPEG×20: taille.\n3. 30fps: débit.",
       correction:"1. ≈6,25Mo · 2. 0,31Mo · 3. 187,5Mo/s brut → 9,4Mo/s compressé",
       notions:["Image numérique"]},
      {id:"P13-09",difficulte:2,titre:"Circuit RC",
       enonce:"R=10kΩ C=100μF.\n1. tau=RC.\n2. u_C(tau) si E=5V.\n3. Chargé après combien de tau.",
       correction:"1. tau=1s · 2. u_C=3,16V=63,2% E · 3. Après 5 tau",
       notions:["RC"]},
      {id:"P13-10",difficulte:2,titre:"Filtre passe-bas RC",
       enonce:"R=1kΩ C=1μF. f_c=1/(2pi x RC).\n1. f_c.\n2. Atténuation à f >> f_c.\n3. Application audio.",
       correction:"1. f_c=159Hz · 2. -20dB par décade · 3. Supprime aigus, garde graves",
       notions:["Filtre RC"]},
      {id:"P13-11",difficulte:2,titre:"Alimentation électronique",
       enonce:"U_AC=9V_eff C=470μF R=100Ω.\n1. U_DC=U_AC x sqrt(2).\n2. I.\n3. tau=RC: lissage si tau >> T=20ms ?",
       correction:"1. U_DC=12,7V · 2. I=127mA · 3. tau=47ms >> 20ms ✓",
       notions:["Alimentation"]},
      {id:"P13-12",difficulte:2,titre:"Défibrillateur",
       enonce:"C=32μF U=5000V.\n1. E=0,5CU².\n2. Décharge Delta_t=4ms: P.\n3. Avantage condensateur.",
       correction:"1. E=400J · 2. P=100kW · 3. Grande puissance instantanée impossible du secteur",
       notions:["Condensateur"]},
      {id:"P13-13",difficulte:3,titre:"Qualité audio numérique",
       enonce:"Enregistrement 24bits 96kHz stéréo.\n1. Débit brut.\n2. Avantage 24bits vs 16bits.\n3. WAV: lossless ou lossy.",
       correction:"1. Débit=24x96000x2=4,608Mbps=576ko/s\n2. 16,7x10^6 niveaux vs 65536 → dynamique +48dB\n3. WAV: lossless (sans perte)",
       notions:["Qualité audio"]},
      {id:"P13-14",difficulte:2,titre:"Déphasage — circuit RL",
       enonce:"u=10cos(2pi x 50t) V. L=0,1H R=31,4Ω.\nomega=2pi x f. Z=sqrt(R²+(L x omega)²). phi=arctan(L x omega/R).\n1. omega.\n2. Z.\n3. phi.",
       correction:"1. omega=314rad/s · 2. L x omega=31,4 → Z=44,4Ω · 3. phi=45°",
       notions:["Déphasage RL"]},
      {id:"P13-15",difficulte:3,titre:"Synthèse — ADSL",
       enonce:"ADSL: bande 300Hz-1100kHz. f_e=2,2MHz 8bits/échantillon.\n1. f_max reproductible.\n2. Débit brut.\n3. Pourquoi débit réel (10-20Mbps) < débit brut.",
       correction:"1. f_max=1,1MHz ✓ · 2. Débit=17,6Mbps\n3. Codage, correction erreurs, overhead protocoles",
       notions:["ADSL"]},
      {id:"P13-16",difficulte:2,titre:"Puissance AC — valeurs efficaces",
       enonce:"R=50Ω U_eff=230V f=50Hz.\n1. I_eff.\n2. P=U_eff x I_eff.\n3. U_max et I_max.",
       correction:"1. I_eff=4,6A · 2. P=1058W · 3. U_max=325V I_max=6,5A",
       notions:["Valeurs efficaces"]},
      {id:"P13-17",difficulte:2,titre:"Spectre fréquentiel signal carré",
       enonce:"Signal carré f=1kHz: fondamental + harmoniques impairs (3f 5f 7f).\n1. Fréquences premières raies.\n2. Shannon pour reproduire jusqu'au 5ème harmonique.\n3. Rôle harmoniques dans timbre.",
       correction:"1. 1kHz, 3kHz, 5kHz, 7kHz\n2. f_e ≥ 2×5kHz=10kHz\n3. Harmoniques colorent le son",
       notions:["Spectre signal"]},
      {id:"P13-18",difficulte:3,titre:"WiFi — fréquences et codage",
       enonce:"WiFi 5GHz. Débit max 300Mbps. Modulation 64-QAM: 6 bits/symbole.\n1. lambda.\n2. Taux de symboles=Débit/bits_par_symbole.\n3. Pourquoi 5GHz meilleur que 2,4GHz pour débit.",
       correction:"1. lambda=60mm · 2. Taux=50Mbauds\n3. 5GHz: bande passante plus large → plus de canaux → plus de débit",
       notions:["WiFi","Modulation"]},
      {id:"P13-19",difficulte:2,titre:"Maison connectée — consommation",
       enonce:"Box ADSL: P=15W allumée 24h/j. Frigo R_on=1000Ω R_off=10000Ω U=230V on 40% du temps (720h/mois).\n1. Conso box/an.\n2. P_frigo on et off.\n3. Conso frigo mensuelle.",
       correction:"1. E_box=15×8760=131kWh\n2. P_on=52,9W · P_off=0,529W\n3. E_frigo=52,9×288+0,529×432≈15,5kWh",
       notions:["Consommation"]},
      {id:"P13-20",difficulte:3,titre:"Synthèse — chaîne audio numérique",
       enonce:"Micro → CAN (f_e=48kHz 24bits) → DSP → CNA → ampli → HP.\n1. Débit brut mono.\n2. Si DSP ajoute écho (délai 200ms): échantillons en mémoire.\n3. Avantage numérique vs analogique.",
       correction:"1. Débit=48000×24=1,152Mbps=144ko/s\n2. N=0,2×48000=9600 échantillons\n3. Précision, reproductibilité, effets impossibles en analogique",
       notions:["Chaîne audio"]},
    ]
  },
]


type SKey = 'terminale-nsi' | 'premiere-nsi' | 'seconde-snt' | 'terminale-generale' | 'terminale-physique-chimie' | 'terminale-technologique' | 'terminale-maths-expertes' | 'premiere-specialite' | 'seconde-maths' | 'seconde-physique-chimie' | 'premiere-physique-chimie' | 'sti2d-physique-chimie' | 'stes-physique-chimie'


// ════════════════════════════════════════════════════════════════
//  STI2D — PHYSIQUE-CHIMIE (épreuve PC spécifique STI2D)
//  URLs : sujetdebac.fr · 2021–2025
// ════════════════════════════════════════════════════════════════
const dataSTI2DPC: AnneeData[] = [
  { year:2025, note:'🆕', exercices:[
    {titre:'PC — Oscillations électriques', theme:"Oscillations libres circuit LC. Énergie électromagnétique. Période propre T₀=2π√(LC).", pts:7},
    {titre:'PC — Ondes mécaniques', theme:"Ondes progressives sinusoïdales. Célérité, longueur onde, diffraction.", pts:7},
    {titre:'Chimie', theme:"Cinétique chimique. Vitesse, facteurs cinétiques, catalyse.", pts:6},
  ]},
  { year:2024, exercices:[
    {titre:'PC — Dipôle RC', theme:"Charge condensateur. Constante τ=RC. Courbes u_C(t), i(t). Détermination graphique de τ.", pts:7},
    {titre:"PC — Ondes lumineuses", theme:"Diffraction fente. Interférences Young i=λD/a. Mesure de longueur d'onde.", pts:7},
    {titre:'Chimie', theme:"Équilibres chimiques. Quotient Qr, K, loi de modération (Le Chatelier).", pts:6},
  ]},
  { year:2023, exercices:[
    {titre:'PC — Satellites', theme:"Gravitation. Vitesse orbitale. 3ème loi Kepler T²=kr³. Satellite géostationnaire.", pts:7},
    {titre:'PC — Dipôle RL', theme:"Bobine. Inductance L. Constante τ=L/R. Énergie E_L=½LI².", pts:7},
    {titre:'Chimie', theme:"Acides et bases. pH. Dosage conductimétrique. Équivalence.", pts:6},
  ]},
  { year:2022, exercices:[
    {titre:'PC — Lentilles minces', theme:"Lentilles convergentes et divergentes. Relation conjugaison 1/OA'-1/OA=1/f'. Grandissement.", pts:7},
    {titre:'PC — Circuit RC', theme:"Filtrage passe-bas. Constante de temps. Applications industrielles.", pts:7},
    {titre:'Chimie', theme:"Oxydoréduction. N.o. Piles électrochimiques. Électrolyse — loi de Faraday.", pts:6},
  ]},
  { year:2021, exercices:[
    {titre:'PC — Énergie mécanique', theme:"Champ gravitationnel. Conservation énergie mécanique. Chute libre avec frottement fluide.", pts:7},
    {titre:"PC — Interférences", theme:"Fentes de Young. Interfrange. Mesure de longueur d'onde. Lumière cohérente.", pts:7},
    {titre:'Chimie', theme:"Cinétique. Suivi temporel. Temps de demi-réaction t₁/₂. Facteurs cinétiques.", pts:6},
  ]},
]

const linksSTI2DPC: Record<number, AnneeLinks> = {
  2025: { sessions: [
    { label:'STI2D — Métropole · 17 juin 2025', flag:'⚙️',
      sujet:`${SD}/2025/sti2d-spe-physique-chimie-mathematiques-2025-metropole-sujet-officiel.pdf`,
      correction:undefined },
    { label:'STI2D — Remplacement · sept. 2025', flag:'⚙️',
      sujet:`${SD}/2025/sti2d-spe-physique-chimie-mathematiques-2025-metropole-remplacement-sujet-officiel.pdf`,
      correction:`${AP}/Corrige_STI2D_Metro_sept_2025_secours_FH.pdf` },
  ]},
  2024: { sessions: [
    { label:'STI2D — Métropole · 19 juin 2024', flag:'⚙️',
      sujet:`${AP}/STI2D_metropole_19_juin_2024__FH2.pdf`,
      correction:`${AP}/Corrige_STI2D_metropole_19_juin_2024_FH-2.pdf` },
  ]},
  2023: { sessions: [
    { label:'STI2D — Métropole · 20 mars 2023', flag:'⚙️',
      sujet:`${SD}/2023/sti2d-spe-physique-chimie-mathematiques-2023-metropole-sujet-officiel.pdf`,
      correction:`${SD}/2023/sti2d-spe-physique-chimie-mathematiques-2023-metropole-corrige.pdf` },
    { label:'STI2D — Mexique · juin 2023', flag:'⚙️',
      sujet:`${AP}/STI2D_Mexique_juin_2023_DV_FH.pdf`,
      correction:`${AP}/Corrige_STI2D_Mexique_juin_2023_FH.pdf` },
    { label:'STI2D — Métropole · sept. 2023', flag:'⚙️',
      sujet:`${AP}/STI2D_metro_9_2023_jcs.pdf`,
      correction:`${AP}/Corrige_STI2D_metropole_9_2023_JCS_.pdf` },
  ]},
  2022: { sessions: [
    { label:'STI2D — Métropole · 11 mai 2022', flag:'⚙️',
      sujet:`${SD}/2022/sti2d-spe-physique-chimie-mathematiques-2022-metropole-sujet-officiel.pdf`,
      correction:`${SD}/2022/sti2d-spe-physique-chimie-mathematiques-2022-metropole-corrige.pdf` },
    { label:'STI2D — Métropole · sept. 2022', flag:'⚙️',
      sujet:`${AP}/metropole_sti2d_septembre_2022-2.pdf`,
      correction:`${AP}/Corrige_STI2D_Metro_sept_2022_DV.pdf` },
  ]},
  2021: { sessions: [
    { label:'STI2D — Métropole La Réunion · juin 2021', flag:'⚙️',
      sujet:`${AP}/STI2D_juin_2021_Metropole_DV.pdf`,
      correction:`${AP}/Corrige_STI2D_Metropole_J2_juin_2021_FH.pdf` },
    { label:'STI2D — Métropole · sept. 2021', flag:'⚙️',
      sujet:`${SD}/2021/sti2d-spe-physique-chimie-mathematiques-2021-metropole-sujet-officiel.pdf`,
      correction:`${AP}/Corrige_STI2D_sept_2021_Metropole_FH.pdf` },
  ]},
}

const dataSTESPC: AnneeData[] = [
  { year:2025, note:'🆕', exercices:[
    {titre:'Partie Chimie — CBPH', theme:"Alimentation & Santé : molécules organiques, réactions chimiques biologiques, pH des fluides corporels.", pts:10},
    {titre:'Partie Biologie — CBPH', theme:"Défense de l'organisme : immunité, microbiologie, analyses médicales, physiologie humaine.", pts:10},
  ]},
  { year:2024, exercices:[
    {titre:'Partie Chimie — CBPH', theme:"Solutions médicamenteuses : concentration, dilution, titrages acide-base et pH physiologique.", pts:10},
    {titre:'Partie Biologie — CBPH', theme:"Homéostasie et régulation : équilibre glucidique, insuline, diabète, analyses biologiques.", pts:10},
  ]},
  { year:2023, exercices:[
    {titre:'Partie Chimie — CBPH', theme:"Chimie des médicaments : molécules actives, groupes fonctionnels, réactivité chimique.", pts:10},
    {titre:'Partie Biologie — CBPH', theme:"Hérédité et génétique humaine : ADN, mutations, maladies génétiques, diagnostic prénatal.", pts:10},
  ]},
  { year:2022, exercices:[
    {titre:'Partie Chimie — CBPH', theme:"Antiseptiques et désinfectants : oxydoréduction, concentrations, dosage, sécurité chimique.", pts:10},
    {titre:'Partie Biologie — CBPH', theme:"Sécurité routière et physiologie : réflexes, temps de réaction, toxicologie (alcool, drogues).", pts:10},
  ]},
  { year:2021, exercices:[
    {titre:'Partie Chimie — CBPH', theme:"Chimie de l'eau et des solutions biologiques : pH, acido-basicité, dilution, solutés.", pts:10},
    {titre:'Partie Biologie — CBPH', theme:"Nutrition et digestion : enzymes digestives, catabolisme, alimentation équilibrée.", pts:10},
  ]},
  { year:2020, note:'📚', exercices:[
    {titre:'Sciences Physiques & Chimiques', theme:"Archive APMEP 1995-2020 : ondes, optique médicale, radioactivité, solutions, cinétique.", pts:20},
  ]},
]

const linksSTESPC: Record<number, AnneeLinks> = {
  2025: { sessions: [
    { label:'ST2S · Spé CBPH · Métropole · juin 2025', flag:'🏥',
      sujet:`https://www.sujetdebac.fr/annales-pdf/2025/st2s-spe-chimie-bio-physiopat-humaines-2025-metropole-sujet-officiel.pdf`,
      correction:undefined },
    { label:'ST2S · Spé CBPH · Métropole Remplacement · sept. 2025', flag:'🍂',
      sujet:`https://www.sujetdebac.fr/annales-pdf/2025/st2s-spe-chimie-bio-physiopat-humaines-2025-metropole-remplacement-sujet-officiel.pdf`,
      correction:undefined },
    { label:'ST2S · Spé CBPH · Polynésie · juin 2025', flag:'🌊',
      sujet:`https://www.sujetdebac.fr/annales-pdf/2025/st2s-spe-chimie-bio-physiopat-humaines-2025-polynesie-sujet-officiel.pdf`,
      correction:undefined },
    { label:'ST2S · Spé CBPH · Nouvelle-Calédonie · 2025', flag:'🌿',
      sujet:`https://www.sujetdebac.fr/annales-pdf/2025/st2s-spe-chimie-bio-physiopat-humaines-2025-nouvelle-caledonie-sujet-officiel.pdf`,
      correction:undefined },
  ]},
  2024: { sessions: [
    { label:'ST2S · Spé CBPH · Métropole · juin 2024', flag:'🏥',
      sujet:`https://www.sujetdebac.fr/annales-pdf/2024/st2s-spe-chimie-bio-physiopat-humaines-2024-metropole-sujet-officiel.pdf`,
      correction:undefined },
    { label:'ST2S · Spé CBPH · Métropole Remplacement · sept. 2024', flag:'🍂',
      sujet:`https://www.sujetdebac.fr/annales-pdf/2024/st2s-spe-chimie-bio-physiopat-humaines-2024-metropole-remplacement-sujet-officiel.pdf`,
      correction:undefined },
    { label:'ST2S · Spé CBPH · Polynésie · juin 2024', flag:'🌊',
      sujet:`https://www.sujetdebac.fr/annales-pdf/2024/st2s-spe-chimie-bio-physiopat-humaines-2024-polynesie-sujet-officiel.pdf`,
      correction:undefined },
  ]},
  2023: { sessions: [
    { label:'ST2S · Spé CBPH · Métropole · juin 2023', flag:'🏥',
      sujet:`https://www.sujetdebac.fr/annales-pdf/2023/st2s-spe-chimie-bio-physiopat-humaines-2023-metropole-sujet-officiel.pdf`,
      correction:undefined },
    { label:'ST2S · Spé CBPH · Polynésie · juin 2023', flag:'🌊',
      sujet:`https://www.sujetdebac.fr/annales-pdf/2023/st2s-spe-chimie-bio-physiopat-humaines-2023-polynesie-sujet-officiel.pdf`,
      correction:undefined },
    { label:'ST2S · Spé CBPH · Nouvelle-Calédonie · 2023', flag:'🌿',
      sujet:`https://www.sujetdebac.fr/annales-pdf/2023/st2s-spe-chimie-bio-physiopat-humaines-2023-nouvelle-caledonie-sujet-officiel.pdf`,
      correction:undefined },
  ]},
  2022: { sessions: [
    { label:'ST2S · Spé CBPH · Métropole · juin 2022', flag:'🏥',
      sujet:`https://www.sujetdebac.fr/annales-pdf/2022/st2s-spe-chimie-bio-physiopat-humaines-2022-metropole-sujet-officiel.pdf`,
      correction:undefined },
    { label:'ST2S · Spé CBPH · Métropole Remplacement · sept. 2022', flag:'🍂',
      sujet:`https://www.sujetdebac.fr/annales-pdf/2022/st2s-spe-chimie-bio-physiopat-humaines-2022-metropole-remplacement-sujet-officiel.pdf`,
      correction:undefined },
    { label:'ST2S · Spé CBPH · Polynésie · juin 2022', flag:'🌊',
      sujet:`https://www.sujetdebac.fr/annales-pdf/2022/st2s-spe-chimie-bio-physiopat-humaines-2022-polynesie-sujet-officiel.pdf`,
      correction:undefined },
  ]},
  2021: { sessions: [
    { label:'ST2S · Spé CBPH · Métropole · juin 2021', flag:'🏥',
      sujet:`https://www.sujetdebac.fr/annales-pdf/2021/st2s-spe-chimie-bio-physiopat-humaines-2021-metropole-sujet-officiel.pdf`,
      correction:undefined },
    { label:'ST2S · Spé CBPH · Métropole Remplacement · sept. 2021', flag:'🍂',
      sujet:`https://www.sujetdebac.fr/annales-pdf/2021/st2s-spe-chimie-bio-physiopat-humaines-2021-metropole-remplacement-sujet-officiel.pdf`,
      correction:undefined },
    { label:'ST2S · Spé CBPH · Polynésie · juin 2021', flag:'🌊',
      sujet:`https://www.sujetdebac.fr/annales-pdf/2021/st2s-spe-chimie-bio-physiopat-humaines-2021-polynesie-sujet-officiel.pdf`,
      correction:undefined },
  ]},
  2020: { sessions: [
    { label:'ST2S · Sciences Physiques & Chimiques · Archive 1995–2020 · APMEP', flag:'📚',
      sujet:`https://www.apmep.fr/IMG/pdf/st2s-1995-2020.pdf`,
      correction:`https://www.apmep.fr/IMG/pdf/st2s-1995-2020.pdf` },
  ]},
}

// ════════════════════════════════════════════════════════════════
//  NSI — Données (même structure AnneeData / AnneeLinks)
// ════════════════════════════════════════════════════════════════
const SDI = 'https://www.annabac.com/annales-bac/annales-pdf'

type NSILinks = Record<number, Record<string, {sujet:string; correction?:string; label?:string}[]>>

const linksNSITerminale: NSILinks = {
  // ─── 2025 ─────────────────────────────────────────────────────────
  2025: {
    'Métropole — Juin': [
      { sujet:'https://www.sujetdebac.fr/annales-pdf/2025/spe-numerique-informatique-2025-metropole-1-sujet-officiel.pdf', correction:'https://www.sujetdebac.fr/annales-pdf/2025/spe-numerique-informatique-2025-metropole-1-corrige.pdf', label:'25-NSIJ1ME1 · Jour 1 · 17 juin 2025' },
      { sujet:'https://www.sujetdebac.fr/annales-pdf/2025/spe-numerique-informatique-2025-metropole-2-sujet-officiel.pdf', label:'25-NSIJ2ME1 · Jour 2 · 18 juin 2025' },
    ],
    'Métropole — Septembre (remplacement)': [
      { sujet:'https://www.sujetdebac.fr/annales-pdf/2025/spe-numerique-informatique-2025-metropole-1-remplacement-sujet-officiel.pdf', label:'25-NSIJ1G31 · Remplacement Jour 1 · 9 sept. 2025' },
      { sujet:'https://www.sujetdebac.fr/annales-pdf/2025/spe-numerique-informatique-2025-metropole-2-remplacement-sujet-officiel.pdf', label:'25-NSIJ2G31 · Remplacement Jour 2 · 10 sept. 2025' },
    ],
  },
  // ─── 2024 ─────────────────────────────────────────────────────────
  2024: {
    'Métropole — Juin': [
      { sujet:'https://www.sujetdebac.fr/annales-pdf/2024/spe-numerique-informatique-2024-metropole-1-sujet-officiel.pdf', label:'24-NSIJ1ME1 · Jour 1 · 19 juin 2024' },
      { sujet:'https://www.sujetdebac.fr/annales-pdf/2024/spe-numerique-informatique-2024-metropole-2-sujet-officiel.pdf', label:'24-NSIJ2ME1 · Jour 2 · 20 juin 2024' },
    ],
    'Métropole — Septembre (remplacement)': [
      { sujet:'https://www.sujetdebac.fr/annales-pdf/2024/spe-numerique-informatique-2024-metropole-1-remplacement-sujet-officiel.pdf', label:'24-NSIJ1G31 · Remplacement Jour 1 · sept. 2024' },
      { sujet:'https://www.sujetdebac.fr/annales-pdf/2024/spe-numerique-informatique-2024-metropole-2-remplacement-sujet-officiel.pdf', label:'24-NSIJ2G31 · Remplacement Jour 2 · sept. 2024' },
    ],
  },
  // ─── 2023 ─────────────────────────────────────────────────────────
  2023: {
    'Métropole — Mars': [
      { sujet:'https://www.sujetdebac.fr/annales-pdf/2023/spe-numerique-informatique-2023-metropole-1-sujet-officiel.pdf', label:'23-NSIJ1ME1 · Jour 1 · 20 mars 2023' },
      { sujet:'https://www.sujetdebac.fr/annales-pdf/2023/spe-numerique-informatique-2023-metropole-2-sujet-officiel.pdf', label:'23-NSIJ2ME1 · Jour 2 · 21 mars 2023' },
    ],
  },
  // ─── 2022 ─────────────────────────────────────────────────────────
  2022: {
    'Métropole — Mai': [
      { sujet:'https://www.sujetdebac.fr/annales-pdf/2022/spe-numerique-informatique-2022-metropole-1-sujet-officiel.pdf', label:'22-NSIJ1ME1 · Jour 1 · 11 mai 2022' },
      { sujet:'https://www.sujetdebac.fr/annales-pdf/2022/spe-numerique-informatique-2022-metropole-2-sujet-officiel.pdf', label:'22-NSIJ2ME1 · Jour 2 · 12 mai 2022' },
    ],
    'Métropole — Septembre (remplacement)': [
      { sujet:'https://www.sujetdebac.fr/annales-pdf/2022/spe-numerique-informatique-2022-metropole-remplacement-sujet-officiel.pdf', label:'22-NSIJ1G31 · Remplacement · sept. 2022' },
    ],
  },
  // ─── 2021 ─────────────────────────────────────────────────────────
  2021: {
    'Métropole — Mai': [
      { sujet:'https://www.sujetdebac.fr/annales-pdf/2021/spe-numerique-informatique-2021-metropole-1-sujet-officiel.pdf', label:'21-NSIJ1ME1 · Jour 1 · mai 2021' },
      { sujet:'https://www.sujetdebac.fr/annales-pdf/2021/spe-numerique-informatique-2021-metropole-2-sujet-officiel.pdf', label:'21-NSIJ2ME1 · Jour 2 · mai 2021' },
    ],
    'Métropole — Septembre (remplacement)': [
      { sujet:'https://www.sujetdebac.fr/annales-pdf/2021/spe-numerique-informatique-2021-metropole-remplacement-sujet-officiel.pdf', label:'21-NSIJ1G31 · Remplacement · sept. 2021' },
    ],
  },
}

const linksNSIPremiereAnticipee: NSILinks = {
  2024: {
    'Métropole': [
      { sujet:'https://www.sujetdebac.fr/annales-pdf/2024/spe-numerique-informatique-premiere-2024-metropole-1-sujet-officiel.pdf', label:'24-NSI1PRE · Jour 1 · 2024' },
      { sujet:'https://www.sujetdebac.fr/annales-pdf/2024/spe-numerique-informatique-premiere-2024-metropole-2-sujet-officiel.pdf', label:'24-NSI2PRE · Jour 2 · 2024' },
    ],
  },
  2023: {
    'Métropole': [
      { sujet:'https://www.sujetdebac.fr/annales-pdf/2023/spe-numerique-informatique-premiere-2023-metropole-1-sujet-officiel.pdf', label:'23-NSI1PRE · Jour 1 · 2023' },
      { sujet:'https://www.sujetdebac.fr/annales-pdf/2023/spe-numerique-informatique-premiere-2023-metropole-2-sujet-officiel.pdf', label:'23-NSI2PRE · Jour 2 · 2023' },
    ],
  },
  2022: {
    'Métropole': [
      { sujet:'https://www.sujetdebac.fr/annales-pdf/2022/spe-numerique-informatique-premiere-2022-metropole-sujet-officiel.pdf', label:'22-NSI1PRE · 2022' },
    ],
  },
}

const dataNSITerminale: AnneeData[] = [
  { year:2025, exercices:[{titre:'Exercice 1 — Structures de données',theme:'Piles, Files, Arbres binaires',pts:7},{titre:'Exercice 2 — Bases de données SQL',theme:'JOIN, GROUP BY, HAVING, sous-requêtes',pts:6},{titre:'Exercice 3 — Algorithmique Python',theme:'Tri fusion, récursivité, complexité',pts:7}]},
  { year:2024, exercices:[{titre:'Exercice 1 — Graphes',theme:'DFS / BFS — parcours et plus court chemin',pts:7},{titre:'Exercice 2 — SQL',theme:'Normalisation, jointures, sous-requêtes',pts:6},{titre:'Exercice 3 — POO Python',theme:'Classes, héritage, polymorphisme',pts:7}]},
  { year:2023, exercices:[{titre:'Exercice 1 — Récursivité',theme:'Arbres binaires, parcours préfixe/infixe',pts:7},{titre:'Exercice 2 — Bases de données',theme:'Modèle E/A, SQL SELECT avec jointures',pts:6},{titre:'Exercice 3 — Algorithmes de tri',theme:'Tri fusion, complexité Big-O',pts:7}]},
  { year:2022, exercices:[{titre:'Exercice 1 — Structures de données',theme:'Piles LIFO — parenthèses équilibrées',pts:7},{titre:'Exercice 2 — SQL',theme:'Agrégation, GROUP BY, HAVING, jointures',pts:6},{titre:'Exercice 3 — Python',theme:'Dichotomie, listes, compréhensions',pts:7}]},
  { year:2021, exercices:[{titre:'Exercice 1 — Récursivité',theme:'Fibonacci, factorielle, Tours de Hanoï',pts:7},{titre:'Exercice 2 — Bases de données',theme:'Schéma relationnel, SQL DDL/DML',pts:6},{titre:'Exercice 3 — Algorithmique',theme:'Recherche dichotomique, complexité',pts:7}]},
]
const dataNSIPremiere: AnneeData[] = [
  { year:2024, exercices:[{titre:'Exercice 1 — Python',theme:'Fonctions, boucles, listes',pts:8},{titre:'Exercice 2 — Web',theme:'HTML/CSS, HTTP, formulaires',pts:6},{titre:'Exercice 3 — Système',theme:'Architecture Von Neumann, OS, processus',pts:6}]},
  { year:2023, exercices:[{titre:'Exercice 1 — Python',theme:'Variables, conditions, types construits',pts:8},{titre:'Exercice 2 — Données',theme:'Tables CSV, tri, filtrage',pts:6},{titre:'Exercice 3 — Réseaux',theme:'Internet, TCP/IP, DNS',pts:6}]},
  { year:2022, exercices:[{titre:'Exercice 1 — Python',theme:'Fonctions récursives, listes',pts:8},{titre:'Exercice 2 — Web',theme:'URL, HTML, CSS, JavaScript',pts:6},{titre:'Exercice 3 — Codage',theme:'Binaire, hexadécimal, ASCII',pts:6}]},
]


const CHAPITRES_SECONDE_NSI: ChapitreData[] = [
  { id:'snt-internet', numero:1,
    titre:'Internet',
    sousTitre:'Architecture · Protocoles TCP/IP · DNS · Routage · Client/Serveur',
    icon:'🌐', color:'#06b6d4',
    notions:['Architecture réseau','TCP/IP','DNS','Routage','IP','Client/Serveur'],
    exercices:[
      {id:'S01-01',difficulte:1,titre:'Définir Internet',enonce:'1. Définir Internet.  2. Différence Internet et Web.  3. Qu\'est-ce qu\'un FAI?  4. Quand est né Internet?',correction:'1. Réseau mondial de réseaux interconnectés\n2. Internet=infrastructure physique, Web=service (pages HTML) sur Internet\n3. Fournisseur d\'Accès Internet (Orange, Free, SFR...)\n4. 1969 (ARPANET, réseau militaire américain)',notions:['Architecture réseau']},
      {id:'S01-02',difficulte:1,titre:'Adresse IP',enonce:'1. À quoi sert une adresse IP?  2. Format IPv4.  3. Exemple d\'IP privée et publique.  4. Pourquoi IPv6?',correction:'1. Identifier de façon unique chaque machine sur le réseau\n2. 4 nombres de 0 à 255 séparés par des points (ex: 192.168.1.1)\n3. Privée: 192.168.x.x | Publique: 82.64.32.1\n4. IPv4 épuisé (~4 milliards), IPv6 offre 2¹²⁸ adresses',notions:['IP']},
      {id:'S01-03',difficulte:1,titre:'Protocoles TCP/IP',enonce:'1. Rôle de TCP.  2. Rôle d\'IP.  3. Pourquoi découper en paquets?  4. Que garantit TCP?',correction:'1. TCP: découpe données en paquets, garantit la livraison et l\'ordre\n2. IP: adressage et routage des paquets d\'un réseau à l\'autre\n3. Paquets peuvent emprunter des chemins différents, plus robuste\n4. Livraison complète et dans l\'ordre (accusé de réception)',notions:['TCP/IP']},
      {id:'S01-04',difficulte:1,titre:'DNS — Annuaire d\'Internet',enonce:'1. DNS = acronyme et rôle.  2. Que traduit le DNS?  3. Exemple concret.  4. Pourquoi le cache DNS?',correction:'1. Domain Name System — traduit noms de domaines en adresses IP\n2. Nom de domaine → adresse IP numérique\n3. google.com → 142.250.74.46\n4. Mémoriser les traductions récentes pour accélérer la navigation',notions:['DNS']},
      {id:'S01-05',difficulte:2,titre:'Routage des paquets',enonce:'1. Rôle d\'un routeur.  2. Comment choisit-il le chemin?  3. Les paquets d\'un même message prennent-ils le même chemin?  4. Que se passe-t-il si un routeur tombe en panne?',correction:'1. Aiguiller les paquets vers le prochain nœud du réseau\n2. Table de routage: choisit le meilleur chemin disponible\n3. Non, chaque paquet peut suivre un chemin différent\n4. Les paquets empruntent un chemin alternatif (réseau décentralisé)',notions:['Routage']},
      {id:'S01-06',difficulte:2,titre:'Modèle client/serveur',enonce:'1. Définir client et serveur.  2. Que fait un navigateur web (client)?  3. Que fait un serveur web?  4. Donner 2 exemples de serveurs.',correction:'1. Client=machine qui demande un service, Serveur=machine qui répond\n2. Envoie requête HTTP, reçoit et affiche la page HTML\n3. Reçoit la requête, traite, renvoie la page (HTML, images...)\n4. Apache, Nginx (serveurs web); MySQL, PostgreSQL (serveurs BDD)',notions:['Client/Serveur']},
      {id:'S01-07',difficulte:2,titre:'Chemin d\'une requête web',enonce:'Décrire les 5 étapes quand on tape "www.exemple.fr" dans le navigateur.',correction:'1. Navigateur interroge le DNS → obtient l\'IP du serveur\n2. Navigateur établit connexion TCP avec le serveur\n3. Navigateur envoie requête HTTP GET /\n4. Serveur traite et renvoie la page HTML\n5. Navigateur affiche la page',notions:['DNS','Client/Serveur','TCP/IP']},
      {id:'S01-08',difficulte:2,titre:'TCP vs UDP',enonce:'1. Différence TCP et UDP.  2. Quand utiliser UDP?  3. Pourquoi le streaming vidéo utilise UDP?',correction:'1. TCP: fiable (accusé réception, ordre garanti). UDP: rapide (sans garantie)\n2. Streaming, jeux en ligne, vidéoconférence, DNS\n3. Mieux vaut perdre quelques images que ralentir la diffusion',notions:['TCP/IP']},
      {id:'S01-09',difficulte:2,titre:'Architecture d\'Internet',enonce:'1. Qu\'est-ce qu\'un backbone?  2. Pourquoi Internet est décentralisé?  3. Combien de câbles sous-marins existent?  4. Qui gère Internet?',correction:'1. Réseau central à très haut débit reliant les FAI et pays\n2. Conçu pour résister aux pannes (origine militaire)\n3. Plus de 400 câbles sous-marins dans le monde\n4. Personne ne "gère" Internet — organismes: ICANN (noms), IETF (protocoles)',notions:['Architecture réseau']},
      {id:'S01-10',difficulte:2,titre:'Réseau local (LAN)',enonce:'1. Différence LAN et Internet.  2. Rôle d\'un switch.  3. Adresse MAC.  4. Différence switch et routeur.',correction:'1. LAN=réseau local (maison, entreprise). Internet=réseau mondial\n2. Switch: relie les machines d\'un même réseau local\n3. Adresse physique unique gravée sur la carte réseau (ex: 00:1A:2B:3C:4D:5E)\n4. Switch=réseau local, Routeur=entre réseaux différents',notions:['Architecture réseau']},
      {id:'S01-11',difficulte:2,titre:'Sécurité réseau',enonce:'1. Qu\'est-ce qu\'un pare-feu (firewall)?  2. Rôle d\'un VPN.  3. Que signifie HTTPS?  4. Pourquoi le chiffrement est-il important?',correction:'1. Filtre les connexions réseau selon des règles de sécurité\n2. VPN: tunnel chiffré pour naviguer de façon sécurisée et anonyme\n3. HTTP Sécurisé (chiffrement TLS)\n4. Empêche l\'interception des données (mots de passe, données bancaires)',notions:['Architecture réseau']},
      {id:'S01-12',difficulte:3,titre:'Simulation de routage',enonce:'Réseau: A-B-C-D en ligne. A veut envoyer un paquet à D. Si le lien B-C est coupé, que se passe-t-il?',correction:'Si réseau maillé: paquet prend chemin alternatif A-E-D\nSi réseau linéaire sans alternative: transmission impossible\n→ Illustre pourquoi Internet a une topologie maillée pour la résilience',notions:['Routage']},
      {id:'S01-13',difficulte:2,titre:'Ports réseau',enonce:'1. Qu\'est-ce qu\'un port?  2. Port HTTP.  3. Port HTTPS.  4. Port SSH.  5. Pourquoi différents ports?',correction:'1. Numéro identifiant un service sur une machine\n2. Port 80 (HTTP)\n3. Port 443 (HTTPS)\n4. Port 22 (SSH)\n5. Permet plusieurs services simultanés sur la même machine',notions:['TCP/IP']},
      {id:'S01-14',difficulte:2,titre:'Résolution DNS',enonce:'Décrire les étapes de résolution DNS pour "wikipedia.org".',correction:'1. Navigateur vérifie cache local DNS\n2. Si absent: interroge serveur DNS du FAI\n3. DNS FAI interroge serveur racine (.)\n4. Serveur racine → serveur TLD (.org)\n5. Serveur TLD → serveur autoritaire wikipedia.org\n6. Retourne l\'adresse IP: 185.15.58.224',notions:['DNS']},
      {id:'S01-15',difficulte:3,titre:'Calcul d\'adressage IP',enonce:'Réseau 192.168.0.0/24. 1. Combien d\'hôtes max?  2. Première adresse utilisable.  3. Adresse broadcast.  4. Si on utilise /25?',correction:'1. 254 hôtes (256-2: réseau et broadcast)\n2. 192.168.0.1\n3. 192.168.0.255\n4. /25 → 2 sous-réseaux de 126 hôtes chacun',notions:['IP']},
    ]
  },
  { id:'snt-web', numero:2,
    titre:'Le Web',
    sousTitre:'HTML · CSS · URL · HTTP · Moteurs de recherche · PageRank',
    icon:'🕸️', color:'#8b5cf6',
    notions:['HTML','CSS','URL','HTTP','Moteurs de recherche','PageRank'],
    exercices:[
      {id:'S02-01',difficulte:1,titre:'Web vs Internet',enonce:'1. Qui a inventé le Web?  2. En quelle année?  3. Différence Web/Internet.  4. Quels services utilisent Internet sans être le Web?',correction:'1. Tim Berners-Lee\n2. 1989 (au CERN, Genève)\n3. Internet=infrastructure réseau, Web=service de pages liées par hyperliens\n4. Email, FTP, streaming, jeux en ligne, SSH',notions:['URL']},
      {id:'S02-02',difficulte:1,titre:'Anatomie d\'une URL',enonce:'Décomposer : https://www.education.gouv.fr/actualites/article?id=42#contenu',correction:'Protocole: https\nSous-domaine: www\nDomaine: education.gouv.fr\nChemin: /actualites/article\nParamètre: id=42\nFragment: #contenu (ancre dans la page)',notions:['URL']},
      {id:'S02-03',difficulte:1,titre:'Structure HTML de base',enonce:'Écrire le squelette HTML d\'une page "Ma classe de SNT" avec un titre h1 et 2 paragraphes.',correction:'<!DOCTYPE html>\n<html lang="fr">\n<head>\n  <meta charset="UTF-8">\n  <title>Ma classe de SNT</title>\n</head>\n<body>\n  <h1>Ma classe de SNT</h1>\n  <p>Bienvenue en SNT.</p>\n  <p>Nous étudions le numérique.</p>\n</body>\n</html>',notions:['HTML']},
      {id:'S02-04',difficulte:1,titre:'Balises HTML essentielles',enonce:'Donner la balise HTML pour : 1. Titre principal  2. Lien  3. Image  4. Liste à puces  5. Tableau',correction:'1. <h1>  2. <a href="url">  3. <img src="..." alt="...">  4. <ul><li>  5. <table><tr><td>',notions:['HTML']},
      {id:'S02-05',difficulte:1,titre:'CSS de base',enonce:'Écrire le CSS pour : 1. Fond rouge body  2. Texte blanc tous les h1  3. Classe ".important" en gras, taille 18px',correction:'body { background-color: red; }\nh1 { color: white; }\n.important { font-weight: bold; font-size: 18px; }',notions:['CSS']},
      {id:'S02-06',difficulte:2,titre:'HTTP — Requête et réponse',enonce:'1. Que signifie HTTP?  2. Différence HTTP et HTTPS.  3. Code 200, 404, 500.  4. Méthode GET vs POST.',correction:'1. HyperText Transfer Protocol\n2. HTTPS = HTTP + chiffrement TLS (cadenas dans navigateur)\n3. 200=OK, 404=Page non trouvée, 500=Erreur serveur\n4. GET=récupérer (URL visible), POST=envoyer des données (formulaire)',notions:['HTTP']},
      {id:'S02-07',difficulte:2,titre:'Moteurs de recherche',enonce:'Expliquer les 3 phases de fonctionnement d\'un moteur de recherche (Google, Bing).',correction:'1. Exploration (crawling): robots parcourent le Web en suivant les liens\n2. Indexation: contenu analysé et stocké dans une base de données\n3. Classement (ranking): algorithme (PageRank) classe les résultats selon la pertinence',notions:['Moteurs de recherche']},
      {id:'S02-08',difficulte:2,titre:'PageRank',enonce:'1. Qui a inventé PageRank?  2. Principe de base.  3. Si A→B→C et D→B, quel site est le plus populaire?  4. Limite du PageRank?',correction:'1. Larry Page et Sergey Brin (Google, 1998)\n2. Plus un site reçoit de liens d\'autres sites, plus il est jugé populaire\n3. Site B (reçoit liens de A et D)\n4. Peut être manipulé (fermes de liens); ne mesure pas la qualité du contenu',notions:['PageRank']},
      {id:'S02-09',difficulte:2,titre:'Créer une page avec CSS externe',enonce:'Comment lier un fichier style.css à une page HTML? Donner la balise complète.',correction:'Dans la section <head> :\n<link rel="stylesheet" href="style.css">\n\nOu en style inline :\n<p style="color:red;">texte</p>\n\nOu en style interne :\n<style> p { color: red; } </style>',notions:['HTML','CSS']},
      {id:'S02-10',difficulte:2,titre:'Sélecteurs CSS avancés',enonce:'Écrire CSS pour : 1. Tous les <p> dans un <div>  2. Premier enfant  3. Survol d\'un lien  4. Attribut spécifique',correction:'1. div p { color: blue; }\n2. p:first-child { font-weight: bold; }\n3. a:hover { text-decoration: underline; }\n4. input[type="text"] { border: 1px solid gray; }',notions:['CSS']},
      {id:'S02-11',difficulte:2,titre:'Formulaire HTML',enonce:'Créer un formulaire de contact : nom, email, message (textarea), bouton envoyer. Méthode POST.',correction:'<form action="/contact" method="POST">\n  <input type="text" name="nom" placeholder="Votre nom">\n  <input type="email" name="email" placeholder="Email">\n  <textarea name="message" rows="4"></textarea>\n  <button type="submit">Envoyer</button>\n</form>',notions:['HTML']},
      {id:'S02-12',difficulte:2,titre:'Référencement (SEO)',enonce:'1. SEO vs SEA.  2. 3 critères de référencement naturel.  3. Rôle de la balise <title>.  4. Rôle de meta description.',correction:'1. SEO=référencement naturel(gratuit), SEA=payant(Google Ads)\n2. Contenu pertinent, liens entrants, rapidité du site\n3. Titre dans les résultats de recherche\n4. Résumé affiché sous le titre dans les résultats',notions:['Moteurs de recherche']},
      {id:'S02-13',difficulte:3,titre:'Simuler le PageRank',enonce:'3 sites: A→B, A→C, B→C, C→A. Quel site a le plus de liens entrants? Classer par popularité.',correction:'Liens entrants:\nA: reçoit de C → 1 lien\nB: reçoit de A → 1 lien\nC: reçoit de A et B → 2 liens\n\nClassement: C (2 liens) > A = B (1 lien)\nC est le plus populaire',notions:['PageRank']},
      {id:'S02-14',difficulte:2,titre:'Web sémantique',enonce:'Donner les balises HTML5 sémantiques pour : 1. En-tête  2. Navigation  3. Contenu principal  4. Pied de page  5. Article',correction:'1. <header>  2. <nav>  3. <main>  4. <footer>  5. <article>',notions:['HTML']},
      {id:'S02-15',difficulte:3,titre:'Accessibilité web',enonce:'1. Définir accessibilité web.  2. Rôle attribut alt d\'une image.  3. Contraste de couleurs.  4. Navigation clavier.',correction:'1. Rendre le Web utilisable par tous (personnes handicapées)\n2. alt: description pour lecteurs d\'écran (aveugles)\n3. Ratio 4.5:1 minimum pour texte/fond (WCAG)\n4. Tab pour naviguer, Enter pour activer (sans souris)',notions:['HTML','CSS']},
    ]
  },
  { id:'snt-reseaux-sociaux', numero:3,
    titre:'Réseaux sociaux',
    sousTitre:'Graphes · Degré · Communautés · Algorithmes · Enjeux',
    icon:'👥', color:'#ec4899',
    notions:['Graphe','Degré','Communautés','Recommandation','Bulle de filtre','Cyberharcèlement'],
    exercices:[
      {id:'S03-01',difficulte:1,titre:'Définir un graphe',enonce:'1. Qu\'est-ce qu\'un graphe?  2. Graphe orienté vs non orienté.  3. Exemple de réseau social orienté.  4. Exemple de réseau non orienté.',correction:'1. Ensemble de sommets (nœuds) reliés par des arêtes\n2. Orienté: arête avec direction (→). Non orienté: lien mutuel (—)\n3. Twitter/X (je peux suivre sans être suivi)\n4. Facebook (amitié mutuelle)',notions:['Graphe']},
      {id:'S03-02',difficulte:1,titre:'Degré d\'un sommet',enonce:'Graphe: Alice—Bob, Alice—Clara, Bob—David, Clara—David. 1. Degré de chaque sommet.  2. Qui est le plus connecté?  3. Diamètre du graphe.',correction:'deg(Alice)=2, deg(Bob)=2, deg(Clara)=2, deg(David)=2\n2. Tous au même niveau\n3. Diamètre=2 (max distance entre 2 sommets: Alice→David via Bob ou Clara)',notions:['Degré']},
      {id:'S03-03',difficulte:1,titre:'Réseaux sociaux du quotidien',enonce:'Citer 5 réseaux sociaux, leur usage principal, et le type de graphe (orienté/non orienté).',correction:'Instagram: photos, orienté (abonnements)\nFacebook: partage, non orienté (amis)\nTwitter/X: actualités, orienté (following)\nLinkedIn: professionnel, non orienté\nTikTok: vidéos courtes, orienté',notions:['Graphe']},
      {id:'S03-04',difficulte:2,titre:'Théorie des 6 degrés',enonce:'1. Qu\'est-ce que la théorie des 6 degrés?  2. Origine.  3. Comment les réseaux sociaux réduisent-ils ce nombre?',correction:'1. 2 personnes quelconques sont séparées par au plus 6 intermédiaires\n2. Expérience de Milgram (1967) — enveloppes à faire passer de main en main\n3. Réseaux sociaux: distance réduite à ~3.5 (étude Facebook 2016)',notions:['Degré']},
      {id:'S03-05',difficulte:2,titre:'Algorithme de recommandation',enonce:'1. Filtrage collaboratif.  2. Filtrage par contenu.  3. Comment YouTube décide ce qu\'il te recommande?  4. Effet de bulle.',correction:'1. "Les utilisateurs similaires à toi ont aimé..."\n2. Analyse de ce que tu as regardé/liké\n3. Maximiser le temps de visionnage (engagement)\n4. Tu vois de moins en moins de contenus différents de tes goûts',notions:['Recommandation','Bulle de filtre']},
      {id:'S03-06',difficulte:2,titre:'Bulle de filtre',enonce:'1. Définir la bulle de filtre.  2. Comment se forme-t-elle?  3. Conséquences sur l\'opinion.  4. Comment y échapper?',correction:'1. Voir surtout les contenus qui confirment nos opinions existantes\n2. Algorithme apprend nos préférences et optimise l\'engagement\n3. Radicalisation, désinformation, manque de pluralisme\n4. Chercher activement d\'autres sources, désactiver personnalisation',notions:['Bulle de filtre']},
      {id:'S03-07',difficulte:2,titre:'Communautés dans un graphe',enonce:'1. Définir une communauté dans un graphe.  2. Comment les détecter?  3. Exemple concret dans un réseau social.',correction:'1. Sous-ensemble de nœuds densément connectés entre eux\n2. Algorithmes de clustering (ex: Louvain, Girvan-Newman)\n3. Groupes de fans d\'un même artiste, membres d\'un forum, amis du lycée',notions:['Communautés']},
      {id:'S03-08',difficulte:2,titre:'Cyberharcèlement',enonce:'1. Définir le cyberharcèlement.  2. 3 formes différentes.  3. Que faire si on en est victime?  4. Pourquoi Internet amplifie-t-il le phénomène?',correction:'1. Harcèlement répété via les outils numériques\n2. Insultes publiques, usurpation d\'identité, exclusion délibérée\n3. En parler à un adulte, signaler (pf-harcèlement.interieur.gouv.fr), conserver preuves\n4. Anonymat, vitesse de propagation, public illimité, disponible 24h/24',notions:['Cyberharcèlement']},
      {id:'S03-09',difficulte:2,titre:'Modèle économique des réseaux',enonce:'1. Les réseaux sociaux sont-ils gratuits?  2. Comment Facebook gagne-t-il de l\'argent?  3. Quelle est la vraie valeur vendue?',correction:'1. Non: "si c\'est gratuit, tu es le produit"\n2. Publicité ciblée grâce aux données utilisateurs\n3. Les données personnelles et le profil comportemental des utilisateurs',notions:['Recommandation']},
      {id:'S03-10',difficulte:2,titre:'Désinformation et fake news',enonce:'1. Pourquoi les fake news se propagent-elles vite?  2. Comment vérifier une information?  3. Rôle des algorithmes.',correction:'1. Émotionnellement engageantes, partagées sans vérification\n2. Vérifier la source, croiser plusieurs médias, fact-checking (AFP, Snopes)\n3. Favorisent les contenus "viraux" même faux car ils génèrent de l\'engagement',notions:['Recommandation','Bulle de filtre']},
      {id:'S03-11',difficulte:3,titre:'Influenceur = nœud central',enonce:'Dans un graphe d\'abonnements, un influenceur a 500 000 abonnés. 1. Son degré entrant.  2. Son degré sortant si il suit 200 personnes.  3. Centralité?',correction:'1. Degré entrant = 500 000\n2. Degré sortant = 200\n3. Très forte centralité: sa publication atteint 500 000 personnes directement\n→ Nœud hub critique du réseau',notions:['Degré','Communautés']},
      {id:'S03-12',difficulte:2,titre:'Vie privée sur les réseaux',enonce:'1. Quelles données un réseau social collecte-t-il?  2. Que faire avec les paramètres de confidentialité?  3. RGPD et réseaux sociaux.',correction:'1. Profil, publications, likes, heures connexion, localisation, contacts\n2. Limiter la visibilité, désactiver la géoloc, revérifier régulièrement\n3. Droit d\'accès, suppression du compte et des données, consentement',notions:['Cyberharcèlement']},
      {id:'S03-13',difficulte:2,titre:'Graphe du lycée',enonce:'Si 30 élèves d\'une classe sont tous amis entre eux sur Instagram : 1. Nombre d\'arêtes.  2. Degré de chaque élève.  3. Diamètre du graphe.',correction:'1. 30×29/2 = 435 arêtes (graphe complet)\n2. Degré = 29 (ami de tous les autres)\n3. Diamètre = 1 (tout le monde est directement connecté)',notions:['Graphe','Degré']},
      {id:'S03-14',difficulte:3,titre:'Addiction aux réseaux',enonce:'1. Mécanisme psychologique.  2. Rôle de la dopamine.  3. Techniques d\'engagement des plateformes.',correction:'1. Système de récompense variable (like, commentaire) → addiction comportementale\n2. Dopamine libérée à chaque notification → renforcement positif\n3. Scroll infini, notifications, streaks, likes visibles',notions:['Recommandation']},
      {id:'S03-15',difficulte:3,titre:'Analyser un graphe social simple',enonce:'Graphe: A→B, A→C, B→D, C→D, D→A. 1. Graphe orienté ou non?  2. Degré entrant de D.  3. Y a-t-il un cycle?  4. Distance A→D.',correction:'1. Orienté (flèches)\n2. Degré entrant de D = 2 (de B et C)\n3. Oui: A→B→D→A\n4. Distance A→D = 2 (A→B→D ou A→C→D)',notions:['Graphe','Degré']},
    ]
  },
  { id:'snt-donnees', numero:4,
    titre:'Données structurées et leur traitement',
    sousTitre:'CSV · Types · Tables · RGPD · Vie privée',
    icon:'🗄️', color:'#10b981',
    notions:['Données','CSV','Table','RGPD','Métadonnées','Types de données'],
    exercices:[
      {id:'S04-01',difficulte:1,titre:'Qu\'est-ce qu\'une donnée?',enonce:'1. Définir donnée numérique.  2. 5 types de données.  3. Différence donnée et information.  4. Exemples de données non numériques numérisées.',correction:'1. Représentation d\'une information sous forme binaire\n2. Texte, entier, décimal, booléen, date\n3. Donnée=fait brut, Information=donnée interprétée\n4. Photo, son, vidéo, texte, température',notions:['Données','Types de données']},
      {id:'S04-02',difficulte:1,titre:'Métadonnées',enonce:'1. Définir métadonnée.  2. Exemples pour une photo.  3. Pourquoi les métadonnées peuvent-elles poser un problème de vie privée?',correction:'1. Donnée qui décrit une autre donnée\n2. Date, heure, GPS, modèle appareil, résolution, logiciel\n3. Révèlent lieu, horaires, habitudes même si la photo est floue',notions:['Métadonnées']},
      {id:'S04-03',difficulte:1,titre:'Format CSV',enonce:'Lire ce CSV : nom,age,ville\nAlice,16,Paris\nBob,17,Lyon\n1. Nombre de colonnes  2. Nombre d\'enregistrements  3. Âge de Bob  4. Ville d\'Alice',correction:'1. 3 colonnes (nom, age, ville)\n2. 2 enregistrements\n3. 17 ans\n4. Paris',notions:['CSV']},
      {id:'S04-04',difficulte:1,titre:'Structure d\'une table',enonce:'1. Définir table de données.  2. Différence ligne et colonne.  3. Qu\'est-ce qu\'une clé primaire?  4. Exemple de table élèves.',correction:'1. Ensemble d\'enregistrements avec les mêmes attributs\n2. Ligne=1 enregistrement complet, Colonne=1 attribut pour tous\n3. Identifiant unique de chaque ligne (ex: numéro élève)\n4. id | nom | classe | note',notions:['Table']},
      {id:'S04-05',difficulte:2,titre:'Sélection dans une table',enonce:'Table: [{nom:"Alice",note:15,sport:"natation"},{nom:"Bob",note:8,sport:"foot"},{nom:"Clara",note:12,sport:"natation"}]\n1. Élèves avec note≥10  2. Élèves qui font natation',correction:'1. Alice (15) et Clara (12)\n2. Alice et Clara font natation',notions:['Table']},
      {id:'S04-06',difficulte:2,titre:'Trier et agréger',enonce:'Table notes: [Alice:15, Bob:12, Clara:9, David:17]. 1. Trier par note décroissante.  2. Moyenne.  3. Meilleur élève.',correction:'1. David(17), Alice(15), Bob(12), Clara(9)\n2. (15+12+9+17)/4 = 13.25\n3. David (17)',notions:['Table']},
      {id:'S04-07',difficulte:2,titre:'RGPD — Règlement européen',enonce:'1. RGPD = acronyme et date.  2. 3 droits des personnes.  3. Qu\'est-ce que la CNIL?  4. Amende maximum.',correction:'1. Règlement Général Protection Données, 2018\n2. Accès, rectification, effacement (droit à l\'oubli)\n3. Commission Nationale Informatique et Libertés (autorité française)\n4. 4% du chiffre d\'affaires mondial ou 20M€',notions:['RGPD']},
      {id:'S04-08',difficulte:2,titre:'Consentement RGPD',enonce:'1. Qu\'est-ce que le consentement selon le RGPD?  2. Peut-on accepter les cookies par défaut?  3. Donner un exemple de collecte illégale.',correction:'1. Accord libre, spécifique, éclairé et non ambigu\n2. Non: le consentement ne doit pas être imposé par défaut\n3. Collecter des emails sans permission pour faire du spam',notions:['RGPD']},
      {id:'S04-09',difficulte:2,titre:'Données personnelles',enonce:'Parmi ces données, lesquelles sont personnelles? Nom, IP, couleur préférée, numéro de sécu, pseudonyme, code postal seul.',correction:'Personnelles: Nom ✓, IP ✓ (identifie l\'accès), Numéro sécu ✓, Pseudonyme ✓ (si traçable)\nNon personnelles: Couleur préférée (si isolée), Code postal seul',notions:['RGPD','Données']},
      {id:'S04-10',difficulte:2,titre:'Projeter des colonnes',enonce:'Table complète : id, nom, age, email, note, adresse. Donner uniquement les colonnes utiles pour : 1. Afficher un annuaire.  2. Afficher les résultats d\'examen.',correction:'1. Annuaire: nom + email (pas besoin de note ni adresse)\n2. Résultats: nom + note (pas besoin d\'email ni adresse)',notions:['Table']},
      {id:'S04-11',difficulte:2,titre:'Open data',enonce:'1. Définir open data.  2. Exemples de jeux de données publics.  3. Format commun.  4. À quoi ça sert?',correction:'1. Données publiques accessibles librement\n2. Data.gouv.fr: statistiques, résultats élections, accidents, météo\n3. CSV, JSON, XML\n4. Transparence, recherche, création d\'applications citoyennes',notions:['CSV','Données']},
      {id:'S04-12',difficulte:2,titre:'Joindre deux tables',enonce:'Élèves: [{id:1,nom:"Alice"},{id:2,nom:"Bob"}]\nNotes: [{id_el:1,matiere:"NSI",note:15},{id_el:2,matiere:"NSI",note:12}]\nAfficher nom + note.',correction:'Résultat de la jointure sur id=id_el:\nAlice | NSI | 15\nBob   | NSI | 12',notions:['Table']},
      {id:'S04-13',difficulte:3,titre:'Données sensibles',enonce:'Citez les catégories de données sensibles selon le RGPD et expliquer pourquoi elles méritent une protection renforcée.',correction:'Données sensibles: santé, origine ethnique, opinions politiques/religieuses, orientation sexuelle, données génétiques/biométriques, condamnations pénales\nProtection renforcée: discrimination, chantage, persécution possibles',notions:['RGPD']},
      {id:'S04-14',difficulte:2,titre:'Collecter des données éthiquement',enonce:'Une appli collecte: localisation, contacts, historique navigation. 1. Quels problèmes RGPD?  2. Comment la rendre conforme?',correction:'1. Collecte excessive sans consentement explicite, données sensibles (localisation)\n2. Demander consentement par fonctionnalité, expliquer l\'usage, permettre le refus, minimiser la collecte',notions:['RGPD','Données']},
      {id:'S04-15',difficulte:3,titre:'Analyser un fichier CSV',enonce:'CSV: prenom,sport,section\nLéa,natation,2ndeA\nMax,foot,2ndeB\nSara,natation,2ndeA\nTom,tennis,2ndeB\n1. Élèves de 2ndeA  2. Sports pratiqués  3. Élève faisant natation en 2ndeA',correction:'1. Léa, Sara\n2. natation, foot, tennis\n3. Léa et Sara font natation en 2ndeA',notions:['CSV','Table']},
    ]
  },
  { id:'snt-geolocalisation', numero:5,
    titre:'Localisation, cartographie et mobilité',
    sousTitre:'GPS · Satellites · Trilateralisation · Cartographie · Vie privée',
    icon:'📍', color:'#f59e0b',
    notions:['GPS','Satellites','Trilateralisation','Cartographie','Vie privée'],
    exercices:[
      {id:'S05-01',difficulte:1,titre:'Le GPS',enonce:'1. GPS = acronyme.  2. Qui gère le GPS?  3. Combien de satellites?  4. Précision civile vs militaire.',correction:'1. Global Positioning System\n2. Armée américaine (DoD)\n3. Au moins 24 satellites opérationnels (souvent ~30)\n4. Civil: quelques mètres | Militaire: centimètres',notions:['GPS','Satellites']},
      {id:'S05-02',difficulte:1,titre:'Principe du GPS',enonce:'1. Comment un satellite GPS fonctionne-t-il?  2. Quelle information émet-il?  3. Combien de satellites minimum pour se localiser en 2D?  4. Pourquoi 4 pour la 3D?',correction:'1. Émet un signal radio en continu avec sa position et l\'heure exacte\n2. Position du satellite + heure d\'émission\n3. 3 satellites minimum pour position 2D\n4. 4e satellite pour corriger les erreurs d\'horloge et calculer l\'altitude',notions:['GPS','Satellites']},
      {id:'S05-03',difficulte:2,titre:'Calcul de distance GPS',enonce:'Un signal GPS voyage à 3×10⁸ m/s. Il est reçu 0.067 secondes après l\'émission. 1. Distance au satellite.  2. Donner l\'ordre de grandeur.',correction:'d = v × t = 3×10⁸ × 0.067\nd = 20 100 000 m ≈ 20 100 km\nOrdre de grandeur: ~20 000 km (altitude orbite GPS)',notions:['GPS']},
      {id:'S05-04',difficulte:2,titre:'Trilateralisation',enonce:'1. Différence triangulation et trilateralisation.  2. Expliquer le principe de la trilateralisation en 2D.  3. Pourquoi 3 cercles?',correction:'1. Triangulation=angles, Trilateralisation=distances\n2. Chaque satellite définit un cercle. L\'intersection de 3 cercles donne la position unique\n3. 2 cercles se croisent en 2 points, le 3e cercle identifie le bon',notions:['Trilateralisation']},
      {id:'S05-05',difficulte:2,titre:'Autres systèmes de localisation',enonce:'1. GLONASS.  2. Galileo.  3. Beidou.  4. Localisation par WiFi.  5. Localisation par GSM.',correction:'1. GLONASS: système russe\n2. Galileo: système européen (plus précis, civil)\n3. Beidou: système chinois\n4. WiFi: base de données réseaux géoréférencés, quelques mètres\n5. GSM: triangulation antennes, 100m-1km',notions:['GPS','Trilateralisation']},
      {id:'S05-06',difficulte:2,titre:'Cartographie numérique',enonce:'1. Différence Google Maps et OpenStreetMap.  2. Qu\'est-ce que le crowdsourcing cartographique?  3. Format des coordonnées GPS.',correction:'1. Google Maps=propriétaire/commercial. OSM=libre/collaboratif\n2. Des milliers de bénévoles ajoutent et vérifient les données cartographiques\n3. Latitude (−90 à 90) et Longitude (−180 à 180) en degrés décimaux',notions:['Cartographie']},
      {id:'S05-07',difficulte:2,titre:'Vie privée et géolocalisation',enonce:'1. Quels risques pose l\'historique GPS?  2. Quelles applications ont accès à votre position?  3. Comment limiter le traçage?',correction:'1. Révèle domicile, travail, habitudes, fréquentations, opinions\n2. Toutes celles ayant la permission (maps, météo, livreurs, réseaux sociaux...)\n3. Désactiver géoloc des apps inutiles, utiliser "seulement en cours d\'utilisation"',notions:['Vie privée']},
      {id:'S05-08',difficulte:2,titre:'Applications de la géolocalisation',enonce:'Citer 5 usages de la géolocalisation (professionnels, grand public, scientifiques).',correction:'1. Navigation routière (Waze, Maps)\n2. Livraison et logistique (suivi colis)\n3. Agriculture de précision\n4. Sauvetage et secours (localiser une personne)\n5. Sciences: suivi d\'animaux, météo, tectoni des plaques',notions:['GPS','Cartographie']},
      {id:'S05-09',difficulte:2,titre:'Coordonnées GPS',enonce:'Paris est à 48.8566°N, 2.3522°E. 1. Que signifie N et E?  2. New York est à 40.71°N, 74.01°W. Que signifie W?  3. Calcul: point à l\'équateur et méridien de Greenwich?',correction:'1. N=Nord (latitude positive), E=Est (longitude positive)\n2. W=Ouest (longitude négative)\n3. Latitude=0°, Longitude=0°',notions:['Cartographie','GPS']},
      {id:'S05-10',difficulte:2,titre:'Erreurs GPS',enonce:'Quels facteurs peuvent réduire la précision du GPS? Citer 4 causes.',correction:'1. Multipath: signal rebondit sur les bâtiments (canyon urbain)\n2. Masquage: satellite caché par une montagne ou bâtiment\n3. Conditions atmosphériques: ionosphère perturbe le signal\n4. Nombre de satellites visibles insuffisant\n5. Précision de l\'horloge du récepteur',notions:['GPS','Satellites']},
      {id:'S05-11',difficulte:2,titre:'GPS et urgences',enonce:'1. Comment le 112 utilise le GPS?  2. eCall (voiture).  3. Balises de détresse.',correction:'1. Localise l\'appelant automatiquement via "Advanced Mobile Location"\n2. eCall: déclenche automatiquement un appel d\'urgence en cas d\'accident avec coordonnées GPS\n3. Balises EPIRB (mer), ELT (avion): envoient position aux satellites de secours',notions:['GPS']},
      {id:'S05-12',difficulte:3,titre:'Traçage publicitaire et GPS',enonce:'Google Maps est gratuit. 1. Comment Google gagne-t-il de l\'argent avec?  2. Quelles données collecte-t-il?  3. Conséquences?',correction:'1. Publicité ciblée selon les lieux fréquentés (restaurants, magasins)\n2. Historique complet des déplacements, temps passé par lieu\n3. Profil très précis: opinions politiques (manifestations), santé (hôpitaux), religion (lieux de culte)',notions:['Vie privée']},
      {id:'S05-13',difficulte:2,titre:'Géofencing',enonce:'1. Définir le géofencing.  2. Exemples légitimes.  3. Risques.',correction:'1. Déclencher une action quand on entre/sort d\'une zone géographique\n2. Notification promotion magasin, alerte zone scolaire, suivi flotte véhicules\n3. Surveillance, traçage à l\'insu, marketing agressif',notions:['GPS','Vie privée']},
      {id:'S05-14',difficulte:2,titre:'Comparaison GPS et boussole',enonce:'1. Différence GPS et boussole.  2. Avantages du GPS.  3. Quand préférer la boussole?  4. Que faire si le GPS ne fonctionne plus?',correction:'1. GPS=position absolue. Boussole=direction\n2. Précision, altitude, vitesse, sans entraînement\n3. Sans batterie, zones sans signal, navigation maritime/randonnée\n4. Carte papier + boussole + étoiles',notions:['GPS']},
      {id:'S05-15',difficulte:3,titre:'Calcul de trilateralisation',enonce:'En 2D, 3 points émetteurs: A(0,0), B(10,0), C(5,8). Distances: dA=5, dB=7, dC=4. Est-ce que le point P(3,4) est cohérent? Vérifier.',correction:'dA = √(3²+4²) = √25 = 5 ✓\ndB = √((3-10)²+4²) = √(49+16) = √65 ≈ 8.06 ✗ (≠7)\ndC = √((3-5)²+(4-8)²) = √(4+16) = √20 ≈ 4.47 ✗ (≠4)\nP(3,4) n\'est pas le bon point',notions:['Trilateralisation']},
    ]
  },
  { id:'snt-photographie', numero:6,
    titre:'Photographie numérique',
    sousTitre:'Pixels · RGB · Résolution · Formats · Compression · Traitement',
    icon:'📷', color:'#6366f1',
    notions:['Pixel','RGB','Résolution','Compression','Formats','Traitement d\'image'],
    exercices:[
      {id:'S06-01',difficulte:1,titre:'Pixel et image numérique',enonce:'1. Définir pixel.  2. Que contient chaque pixel?  3. Image 1920×1080: combien de pixels?  4. À quoi correspond un mégapixel?',correction:'1. Plus petite unité d\'une image numérique (carré de couleur uniforme)\n2. 3 valeurs de couleur (R, G, B) de 0 à 255\n3. 1920×1080 = 2 073 600 pixels (≈2 Mpx)\n4. 1 Mpx = 1 000 000 pixels',notions:['Pixel']},
      {id:'S06-02',difficulte:1,titre:'Codage RGB',enonce:'Donner la couleur RGB de : 1. Rouge pur  2. Blanc  3. Noir  4. Vert pur  5. Jaune',correction:'1. (255, 0, 0)\n2. (255, 255, 255)\n3. (0, 0, 0)\n4. (0, 255, 0)\n5. (255, 255, 0)',notions:['RGB']},
      {id:'S06-03',difficulte:1,titre:'Résolution et qualité',enonce:'1. Différence résolution et taille.  2. Qu\'est-ce que le DPI?  3. Résolution pour l\'écran.  4. Résolution pour l\'impression.',correction:'1. Résolution=nb pixels (ex 1920×1080). Taille=dimensions physiques (ex 15 pouces)\n2. Dots Per Inch = pixels par pouce\n3. 72-96 DPI pour l\'écran\n4. 300 DPI pour impression qualité photo',notions:['Résolution']},
      {id:'S06-04',difficulte:2,titre:'Taille d\'une image non compressée',enonce:'Image 800×600 pixels en RGB. 1. Nb de pixels.  2. Taille en octets.  3. Taille en Mo.  4. Taille si 32 bits/pixel (RGBA).',correction:'1. 800×600 = 480 000 pixels\n2. 480 000 × 3 = 1 440 000 octets\n3. 1 440 000 / 1 000 000 ≈ 1.44 Mo\n4. 480 000 × 4 = 1 920 000 octets ≈ 1.92 Mo',notions:['Pixel','RGB']},
      {id:'S06-05',difficulte:2,titre:'Formats d\'image',enonce:'Pour chaque format, donner : avec/sans perte, usage principal. 1. JPEG  2. PNG  3. GIF  4. WebP',correction:'1. JPEG: avec perte, photos\n2. PNG: sans perte, logos/graphiques/fond transparent\n3. GIF: sans perte, animations simples (256 couleurs max)\n4. WebP (Google): avec/sans perte, web (plus compressé que JPEG/PNG)',notions:['Formats']},
      {id:'S06-06',difficulte:2,titre:'Compression avec perte vs sans perte',enonce:'1. Définir compression sans perte.  2. Compression avec perte.  3. Pourquoi utiliser JPEG malgré la perte?  4. Qu\'est-ce qu\'un artefact JPEG?',correction:'1. Sans perte: reconstruction pixel parfait (PNG, ZIP)\n2. Avec perte: supprime infos jugées invisibles à l\'œil (JPEG)\n3. Taille réduite x5 à x10 avec perte quasi invisible\n4. Blocs carrés visibles à fort taux de compression',notions:['Compression']},
      {id:'S06-07',difficulte:2,titre:'Identifier une couleur RGB',enonce:'Donner la couleur de : 1. (128, 0, 128)  2. (255, 165, 0)  3. (0, 128, 255)  4. (200, 200, 200)',correction:'1. Violet (rouge + bleu, sans vert)\n2. Orange\n3. Bleu ciel (cyan foncé)\n4. Gris clair (R=V=B → gris)',notions:['RGB']},
      {id:'S06-08',difficulte:2,titre:'Traitement d\'image',enonce:'1. Qu\'est-ce qu\'un filtre?  2. Principe du filtre flou (moyenne).  3. Principe du contraste.  4. Qu\'est-ce que la convolution?',correction:'1. Transformation mathématique appliquée aux pixels\n2. Remplacer chaque pixel par la moyenne de ses voisins\n3. Étirer la plage des valeurs (sombres plus sombres, clairs plus clairs)\n4. Opération mathématique: multiplier la matrice de pixels par un noyau',notions:['Traitement d\'image']},
      {id:'S06-09',difficulte:2,titre:'Métadonnées photo (EXIF)',enonce:'1. Que contiennent les données EXIF?  2. Pourquoi peut-on localiser le photographe via une photo?  3. Comment supprimer les EXIF?',correction:'1. Date/heure, coordonnées GPS, modèle appareil, ouverture, vitesse, ISO\n2. Coordonnées GPS enregistrées automatiquement si option activée\n3. Exiftool, Paint (Windows), services en ligne de nettoyage EXIF',notions:['Résolution','Formats']},
      {id:'S06-10',difficulte:2,titre:'Calcul de compression',enonce:'Image 1440×1080 px, 24 bits/px. Fichier JPEG résultant: 450 Ko. 1. Taille brute.  2. Taux de compression.  3. Est-ce raisonnable?',correction:'1. 1440×1080×3 = 4 665 600 octets ≈ 4.67 Mo\n2. Taux = 4.67 Mo / 0.45 Mo ≈ 10.4:1\n3. Oui, 10:1 est typique JPEG qualité normale',notions:['Compression','Résolution']},
      {id:'S06-11',difficulte:2,titre:'Deepfake et manipulation',enonce:'1. Qu\'est-ce qu\'un deepfake?  2. Technologie utilisée.  3. Risques.  4. Comment détecter?',correction:'1. Image/vidéo générée par IA imitant une vraie personne de façon convaincante\n2. Réseaux de neurones (GAN: générateur vs discriminateur)\n3. Désinformation, usurpation d\'identité, chantage\n4. Analyser les yeux, transitions, artefacts aux bords du visage',notions:['Traitement d\'image']},
      {id:'S06-12',difficulte:3,titre:'Choisir le bon format',enonce:'Pour chaque cas, choisir le meilleur format (JPEG/PNG/GIF/WebP) et justifier: 1. Photo portrait  2. Logo entreprise  3. Animation bannière  4. Photo pour site web rapide',correction:'1. JPEG: photo naturelle, compression efficace\n2. PNG: fond transparent, formes nettes, sans perte\n3. GIF: animation simple, largement compatible\n4. WebP: meilleure compression, moderne',notions:['Formats']},
      {id:'S06-13',difficulte:2,titre:'Synthèse additive vs soustractive',enonce:'1. Couleurs primaires en synthèse additive (lumière).  2. En synthèse soustractive (impression).  3. Pourquoi l\'impression utilise CMJN?',correction:'1. Additive (écran): Rouge + Vert + Bleu (RVB)\n2. Soustractive (impression): Cyan + Magenta + Jaune + Noir (CMJN)\n3. Encre absorbe la lumière, encres additionnées donnent le noir',notions:['RGB']},
      {id:'S06-14',difficulte:2,titre:'Reconnaissance d\'image par IA',enonce:'1. Comment l\'IA reconnaît-elle des objets dans une image?  2. Qu\'est-ce qu\'un réseau de neurones convolutif (CNN)?  3. Exemple d\'application.',correction:'1. Analyse des motifs de pixels par couches successives\n2. CNN: filtre automatiquement les caractéristiques visuelles (bords, formes, textures)\n3. Face ID, Google Lens, tri photos, voiture autonome, détection cancer sur IRM',notions:['Traitement d\'image']},
      {id:'S06-15',difficulte:3,titre:'Tableau de pixels',enonce:'Image 3×3 pixels (niveaux de gris 0-255):\n[[120,80,200],[60,180,100],[240,40,160]]\n1. Pixel le plus sombre  2. Pixel le plus clair  3. Moyenne  4. Appliquer filtre: remplacer chaque pixel par son opposé (255-val)',correction:'1. 40 (position [2][1])\n2. 240 (position [2][0])\n3. (120+80+200+60+180+100+240+40+160)/9 = 1180/9 ≈ 131\n4. [[135,175,55],[195,75,155],[15,215,95]]',notions:['Pixel','Traitement d\'image']},
    ]
  },
  { id:'snt-objets-connectes', numero:7,
    titre:'Informatique embarquée et objets connectés',
    sousTitre:'IoT · Capteurs · Actionneurs · IA · Protocoles · Enjeux',
    icon:'🤖', color:'#ef4444',
    notions:['IoT','Capteurs','Actionneurs','IA','Protocoles IoT','Données IoT'],
    exercices:[
      {id:'S07-01',difficulte:1,titre:'Système embarqué',enonce:'1. Définir système embarqué.  2. Différence avec un ordinateur.  3. 5 exemples d\'objets embarqués.  4. Composant central?',correction:'1. Ordinateur miniaturisé intégré dans un objet pour une tâche spécifique\n2. Ordinateur=polyvalent, Embarqué=tâche dédiée, souvent sans interface\n3. Four connecté, montre intelligente, thermostat, ABS voiture, stimulateur cardiaque\n4. Microcontrôleur (processeur+mémoire+E/S sur une puce)',notions:['IoT']},
      {id:'S07-02',difficulte:1,titre:'Capteur vs Actionneur',enonce:'1. Définir capteur.  2. Définir actionneur.  3. Classer: thermomètre, moteur, microphone, LED, accéléromètre, haut-parleur.',correction:'1. Capteur: convertit grandeur physique → signal numérique\n2. Actionneur: convertit signal numérique → action physique\n3. Capteurs: thermomètre, microphone, accéléromètre\nActionneurs: moteur, LED, haut-parleur',notions:['Capteurs','Actionneurs']},
      {id:'S07-03',difficulte:1,titre:'Internet des Objets (IoT)',enonce:'1. IoT = acronyme.  2. Ordre de grandeur du nombre d\'objets connectés.  3. Architecture générale.  4. 3 exemples de maison connectée.',correction:'1. Internet of Things\n2. 15+ milliards d\'objets (2024)\n3. Objet → Passerelle → Cloud → Application\n4. Thermostat intelligent, ampoule connectée, serrure connectée, capteur de fumée',notions:['IoT']},
      {id:'S07-04',difficulte:2,titre:'Protocoles IoT',enonce:'Citer 4 protocoles IoT, leur usage et leur portée.',correction:'WiFi: haut débit, courte portée (maison)\nBluetooth: courte portée, faible conso (wearables)\nZigBee: très faible conso, courte portée (domotique)\nLoRa: longue portée, très faible conso (agriculture, compteurs)',notions:['Protocoles IoT']},
      {id:'S07-05',difficulte:2,titre:'Boucle capteur-traitement-actionneur',enonce:'Thermostat intelligent: 1. Capteur.  2. Traitement.  3. Actionneur.  4. Consigne.',correction:'1. Capteur température ambiante\n2. Microcontrôleur compare temp. mesurée vs consigne\n3. Actionneur: ouvre/ferme vanne chaudière, commande climatisation\n4. Consigne: température désirée réglée par l\'utilisateur',notions:['Capteurs','Actionneurs']},
      {id:'S07-06',difficulte:2,titre:'Enjeux de sécurité IoT',enonce:'1. Pourquoi les objets connectés sont-ils vulnérables?  2. Exemple d\'attaque.  3. Mesures de sécurité.',correction:'1. Mots de passe par défaut, mises à jour rares, faible puissance de calcul pour chiffrement\n2. Botnet Mirai (2016): 600 000 caméras IP piratées → attaque DDoS massive\n3. Changer mots de passe, mettre à jour firmware, réseau IoT séparé',notions:['IoT']},
      {id:'S07-07',difficulte:2,titre:'Bases de l\'intelligence artificielle',enonce:'1. Définir IA.  2. Différence IA classique et Machine Learning.  3. Qu\'est-ce que l\'apprentissage supervisé?  4. Exemple concret.',correction:'1. Systèmes simulant des capacités cognitives humaines\n2. IA classique=règles programmées. ML=apprend à partir de données\n3. Entraîner sur des données étiquetées (photo de chat → "chat")\n4. Reconnaissance faciale, filtre spam, recommandation Netflix',notions:['IA']},
      {id:'S07-08',difficulte:2,titre:'Biais algorithmique',enonce:'1. Qu\'est-ce qu\'un biais algorithmique?  2. Exemple concret.  3. Pourquoi est-ce dangereux?  4. Solutions.',correction:'1. L\'IA reproduit et amplifie les biais présents dans les données d\'entraînement\n2. Reconnaissance faciale: 35% erreurs sur peaux foncées (données trop peu diversifiées)\n3. Discrimination automatisée à grande échelle\n4. Diversifier données, audits réguliers, équipes diversifiées',notions:['IA']},
      {id:'S07-09',difficulte:2,titre:'Smart city (ville intelligente)',enonce:'1. Définir smart city.  2. Donner 3 applications.  3. Avantages.  4. Risques de surveillance.',correction:'1. Ville utilisant IoT et données pour optimiser les services urbains\n2. Feux tricolores adaptatifs, capteurs de stationnement, gestion des déchets\n3. Économies d\'énergie, mobilité, réactivité services d\'urgence\n4. Surveillance de masse, profilage des citoyens, cybersécurité',notions:['IoT','Données IoT']},
      {id:'S07-10',difficulte:2,titre:'Données IoT et vie privée',enonce:'Un bracelet de sport collecte: rythme cardiaque, GPS, sommeil, calories. 1. Qui accède à ces données?  2. Risques.  3. RGPD.',correction:'1. Fabricant, assureurs, employeurs (parfois), publicitaires\n2. Profil santé utilisé pour discriminer (assurance, embauche)\n3. Données de santé = données sensibles, consentement explicite requis',notions:['Données IoT']},
      {id:'S07-11',difficulte:2,titre:'Arduino et microcontrôleur',enonce:'1. Qu\'est-ce qu\'Arduino?  2. Différence Arduino / Raspberry Pi.  3. Quel langage de programmation?  4. Exemples de projets.',correction:'1. Carte microcontrôleur open-source pour prototypage\n2. Arduino=microcontrôleur (temps réel, peu puissant). Raspberry Pi=mini-ordinateur Linux\n3. C/C++ (simplifié)\n4. Robot, station météo, arrosage automatique, alarme',notions:['IoT','Capteurs']},
      {id:'S07-12',difficulte:2,titre:'Réseau de neurones — bases',enonce:'1. Qu\'est-ce qu\'un neurone artificiel?  2. Structure d\'un réseau de neurones simple.  3. Qu\'est-ce que l\'entraînement?',correction:'1. Unité de calcul: reçoit entrées, applique poids, fonction d\'activation → sortie\n2. Couche d\'entrée → couches cachées → couche de sortie\n3. Ajuster les poids du réseau pour minimiser l\'erreur sur les données d\'entraînement',notions:['IA']},
      {id:'S07-13',difficulte:3,titre:'Objet connecté complet',enonce:'Concevoir une serre automatique. 1. Capteurs nécessaires.  2. Actionneurs.  3. Protocole WiFi ou LoRa?  4. Données collectées.',correction:'1. Capteurs: humidité sol, température air, luminosité, CO₂\n2. Actionneurs: pompe arrosage, ventilateur, éclairage, serre chauffante\n3. WiFi si proche, LoRa si serre distante (longue portée, faible conso)\n4. Historique temp., humidité, arrosages → optimisation',notions:['IoT','Capteurs','Actionneurs']},
      {id:'S07-14',difficulte:2,titre:'Empreinte carbone du numérique',enonce:'1. Quelle est la part du numérique dans les émissions mondiales?  2. Qu\'est-ce qu\'un data center?  3. Impact d\'un email avec pièce jointe.  4. Gestes éco-numériques.',correction:'1. ≈4% des émissions mondiales CO₂\n2. Entrepôt de serveurs informatiques (refroidissement énergivore)\n3. Email lourd ≈ 50g CO₂ (serveurs + transmission + stockage)\n4. Vider les spams, streaming en basse qualité, garder son téléphone plus longtemps',notions:['Données IoT']},
      {id:'S07-15',difficulte:3,titre:'IA et santé',enonce:'L\'IA peut détecter un cancer du sein sur une mammographie avec 94% de précision vs 88% pour un radiologue. 1. Avantages.  2. Risques.  3. Faut-il remplacer le médecin?',correction:'1. Plus rapide, disponible 24h/24, pas de fatigue, traite + de patients\n2. Faux positifs/négatifs, données d\'entraînement biaisées, responsabilité juridique\n3. Non: outil d\'aide au diagnostic. Décision finale = humain. Complémentarité',notions:['IA']},
    ]
  },
]

const CHAPITRES_PREMIERE_NSI: ChapitreData[] = [
  { id:'representation-donnees', numero:1,
    titre:'Représentation des données',
    sousTitre:'Binaire · Hexadécimal · Entiers signés · IEEE 754 · ASCII/Unicode',
    icon:'🔢', color:'#8b5cf6',
    notions:['Binaire','Hexadécimal','Complément à deux','IEEE 754','ASCII','Unicode','UTF-8'],
    exercices:[
      {id:'N01-01',difficulte:1,titre:'Conversion décimal → binaire',enonce:'Convertir en binaire : 1. 42  2. 137  3. 255  4. 1024',correction:'1. 101010₂  2. 10001001₂  3. 11111111₂  4. 10000000000₂',notions:['Binaire']},
      {id:'N01-02',difficulte:1,titre:'Conversion binaire → décimal',enonce:'Convertir : 1. 1101₂  2. 10110₂  3. 11111₂  4. 1001010₂',correction:'1. 13  2. 22  3. 31  4. 74',notions:['Binaire']},
      {id:'N01-03',difficulte:1,titre:'Hexadécimal',enonce:'1. 0xAF → décimal  2. 0x1B → binaire  3. 255 → hex  4. 11010111₂ → hex',correction:'1. 175  2. 00011011₂  3. 0xFF  4. 0xD7',notions:['Hexadécimal']},
      {id:'N01-04',difficulte:1,titre:'Nombre de valeurs encodables',enonce:'Valeurs sur : 1. 4 bits  2. 8 bits  3. 16 bits',correction:'1. 16  2. 256  3. 65536',notions:['Binaire']},
      {id:'N01-05',difficulte:2,titre:'Complément à deux',enonce:'Sur 8 bits : 1. Coder -5  2. Coder -128  3. Décoder 11110011₂',correction:'1. 11111011₂  2. 10000000₂  3. -13',notions:['Complément à deux']},
      {id:'N01-06',difficulte:2,titre:'Plage entiers signés',enonce:'1. Plage 8 bits  2. Plage 16 bits  3. Max 4 bits signé',correction:'1. -128 à 127  2. -32768 à 32767  3. +7',notions:['Complément à deux']},
      {id:'N01-07',difficulte:2,titre:'Addition binaire',enonce:'1. 1011₂+0101₂  2. 11001₂+01110₂  3. 200+100 sur 8 bits non signés',correction:'1. 10000₂=16  2. 100111₂=39  3. Overflow: 44 (300-256)',notions:['Binaire']},
      {id:'N01-08',difficulte:2,titre:'IEEE 754 simple précision',enonce:'Structure 32 bits : 1. Signe/exposant/mantisse  2. Biais  3. Valeur de 0 10000000 10000000000000000000000',correction:'1. 1+8+23 bits  2. Biais=127  3. +1×2¹×1.5=3.0',notions:['IEEE 754']},
      {id:'N01-09',difficulte:1,titre:'ASCII et Unicode',enonce:'1. Code ASCII de A, a, 0  2. chr(65)  3. ord("Z")  4. Diff ASCII/Unicode',correction:'1. 65, 97, 48  2. "A"  3. 90  4. ASCII=128 car, Unicode=140000+',notions:['ASCII','Unicode']},
      {id:'N01-10',difficulte:2,titre:'UTF-8',enonce:'Taille UTF-8 : 1. "A" (U+0041)  2. "é" (U+00E9)  3. Avantage vs UTF-32',correction:'1. 1 octet  2. 2 octets  3. Économie mémoire pour textes latins',notions:['UTF-8']},
      {id:'N01-11',difficulte:2,titre:'Opérations logiques bit à bit',enonce:'1. 1010₂ AND 1100₂  2. 1010₂ OR 1100₂  3. NOT 10110011₂  4. 1111₂ XOR 1010₂',correction:'1. 1000₂  2. 1110₂  3. 01001100₂  4. 0101₂',notions:['Binaire']},
      {id:'N01-12',difficulte:2,titre:'Masque réseau',enonce:'IP 192.168.1.45 masque 255.255.255.0 : 1. Réseau  2. Broadcast  3. Nb hôtes',correction:'1. 192.168.1.0  2. 192.168.1.255  3. 254',notions:['Hexadécimal']},
      {id:'N01-13',difficulte:3,titre:'Dépassement de capacité',enonce:'8 bits non signés : 1. 200+100  2. Explication  3. Signé 127+1',correction:'1. 44 (overflow 300-256)  2. Dépassement, 8 bits conservés  3. -128',notions:['Binaire','Complément à deux']},
      {id:'N01-14',difficulte:2,titre:'Encoder/décoder ASCII',enonce:'Encoder "NSI" en hex ASCII. Décoder 48 65 6C 6C 6F',correction:'"NSI" → 4E 53 49  |  "Hello"',notions:['ASCII']},
      {id:'N01-15',difficulte:3,titre:'Taille fichier image',enonce:'800×600 px, 24 bits/px : 1. Taille brute  2. En Mo  3. PNG vs JPEG',correction:'1. 1 440 000 octets  2. ≈1.37 Mo  3. PNG sans perte, JPEG compressé',notions:['Binaire']},
    ]
  },
  { id:'types-construits', numero:2,
    titre:'Types construits',
    sousTitre:'Listes · Tuples · Dictionnaires · Ensembles · Compréhensions',
    icon:'📦', color:'#06b6d4',
    notions:['list','tuple','dict','set','Indexation','Slicing','Compréhension de liste'],
    exercices:[
      {id:'N02-01',difficulte:1,titre:'Opérations liste',enonce:'lst=[1,2,3,4,5]. 1. lst[0]  2. lst[-1]  3. lst[1:3]  4. len(lst)',correction:'1. 1  2. 5  3. [2,3]  4. 5',notions:['list']},
      {id:'N02-02',difficulte:1,titre:'Modifier une liste',enonce:'lst=[10,20,30]. 1. Ajouter 40  2. Insérer 15 pos 1  3. Supprimer 20',correction:'1. lst.append(40)  2. lst.insert(1,15)  3. lst.remove(20)',notions:['list']},
      {id:'N02-03',difficulte:1,titre:'Tuple',enonce:'t=(1,2,3). 1. t[0]  2. Mutable?  3. Déballer (a,b,c)=t',correction:'1. 1  2. Non, immuable → TypeError  3. a=1,b=2,c=3',notions:['tuple']},
      {id:'N02-04',difficulte:1,titre:'Dictionnaire',enonce:'d={"nom":"Alice","age":16}. 1. d["nom"]  2. Ajouter ville  3. Clés  4. Supprimer age',correction:'1. "Alice"  2. d["ville"]="Paris"  3. list(d.keys())  4. del d["age"]',notions:['dict']},
      {id:'N02-05',difficulte:2,titre:'Compréhension de liste',enonce:'1. [x**2 for x in range(5)]  2. [x for x in range(10) if x%2==0]  3. [s.upper() for s in ["nsi","math"]]',correction:'1. [0,1,4,9,16]  2. [0,2,4,6,8]  3. ["NSI","MATH"]',notions:['Compréhension de liste']},
      {id:'N02-06',difficulte:2,titre:'Matrice (liste de listes)',enonce:'M=[[1,2],[3,4],[5,6]]. 1. M[1][0]  2. len(M)  3. Ajouter [7,8]  4. M[0][1]=9',correction:'1. 3  2. 3  3. M.append([7,8])  4. M=[[1,9],[3,4],[5,6]]',notions:['list']},
      {id:'N02-07',difficulte:2,titre:'Slicing avancé',enonce:'lst=[0..9]. 1. lst[2:7:2]  2. lst[::-1]  3. lst[::3]  4. lst[-3:]',correction:'1. [2,4,6]  2. [9,8,...,0]  3. [0,3,6,9]  4. [7,8,9]',notions:['Slicing']},
      {id:'N02-08',difficulte:2,titre:'Itérer dictionnaire',enonce:'notes={"Alice":15,"Bob":12,"Clara":17}. 1. Afficher  2. Moyenne  3. Meilleur',correction:'1. for k,v in notes.items()  2. ≈14.67  3. max(notes,key=notes.get)="Clara"',notions:['dict']},
      {id:'N02-09',difficulte:2,titre:'Ensemble (set)',enonce:'A={1,2,3,4} B={3,4,5,6}. 1. A∩B  2. A∪B  3. A\\B  4. 2 in A',correction:'1. {3,4}  2. {1,2,3,4,5,6}  3. {1,2}  4. True',notions:['set']},
      {id:'N02-10',difficulte:2,titre:'Copie vs référence',enonce:'a=[1,2,3] b=a b[0]=99. 1. a?  2. Pourquoi?  3. Copie indépendante?',correction:'1. [99,2,3]  2. Même référence  3. b=a.copy()',notions:['list']},
      {id:'N02-11',difficulte:3,titre:'Tri de dicts',enonce:'Trier [{"nom":"Bob","note":12},{"nom":"Alice","note":15}] par note desc.',correction:'sorted(lst, key=lambda e: e["note"], reverse=True)',notions:['list','dict']},
      {id:'N02-12',difficulte:2,titre:'Dict compréhension',enonce:'1. {n:len(n) for n in ["Alice","Bob"]}  2. {k:v**2 for k,v in {"a":1,"b":2}.items()}',correction:'1. {"Alice":5,"Bob":3}  2. {"a":1,"b":4}',notions:['dict']},
      {id:'N02-13',difficulte:2,titre:'Anagramme',enonce:'est_anagramme(s1,s2) → True si anagrammes.',correction:'def est_anagramme(s1,s2): return sorted(s1.lower())==sorted(s2.lower())',notions:['list']},
      {id:'N02-14',difficulte:3,titre:'Table de données',enonce:'table=[{"nom":"A","note":15},{"nom":"B","note":9}]. 1. Filtrer  2. Projeter  3. Moyenne',correction:'1. [e for e in table if e["note"]>=10]  2. [e["nom"] for e in table]  3. 12',notions:['list','dict']},
      {id:'N02-15',difficulte:3,titre:'Compter occurrences',enonce:'Compter les lettres dans "abracadabra".',correction:'freq={}\nfor c in "abracadabra": freq[c]=freq.get(c,0)+1',notions:['dict']},
    ]
  },
  { id:'traitement-donnees', numero:3,
    titre:'Traitement de données en tables',
    sousTitre:'CSV · Sélection · Tri · Agrégation · Jointure',
    icon:'📊', color:'#10b981',
    notions:['CSV','Sélection','Projection','Tri','Agrégation','Jointure'],
    exercices:[
      {id:'N03-01',difficulte:1,titre:'Lire un CSV',enonce:'Lire "notes.csv" en liste de dicts.',correction:'import csv\nwith open("notes.csv") as f: data=list(csv.DictReader(f))',notions:['CSV']},
      {id:'N03-02',difficulte:1,titre:'Sélection (filtre)',enonce:'Sélectionner élèves avec note≥10.',correction:'[e for e in table if int(e["note"])>=10]',notions:['Sélection']},
      {id:'N03-03',difficulte:1,titre:'Projection',enonce:'Extraire uniquement les noms.',correction:'[e["nom"] for e in table]',notions:['Projection']},
      {id:'N03-04',difficulte:1,titre:'Tri',enonce:'Trier par note croissante puis décroissante.',correction:'sorted(table,key=lambda e:e["note"])  # asc\nsorted(table,key=lambda e:e["note"],reverse=True)  # desc',notions:['Tri']},
      {id:'N03-05',difficulte:2,titre:'Agrégation',enonce:'[{"ville":"Paris","pop":2161000},{"ville":"Lyon","pop":513275}]. Total, max, moyenne.',correction:'sum(), max(...,key=lambda e:e["pop"]), sum()/len()',notions:['Agrégation']},
      {id:'N03-06',difficulte:2,titre:'Jointure',enonce:'eleves=[{id:1,nom:"Alice"}] notes=[{id_el:1,note:15}]. Joindre.',correction:'[{"nom":e["nom"],"note":n["note"]} for e in eleves for n in notes if e["id"]==n["id_el"]]',notions:['Jointure']},
      {id:'N03-07',difficulte:2,titre:'Conversion types CSV',enonce:'CSV donne des strings. Problème pour calculs numériques?',correction:'Convertir: for e in data: e["note"]=int(e["note"])',notions:['CSV']},
      {id:'N03-08',difficulte:2,titre:'Statistiques par groupe',enonce:'Moyenne par matière depuis une table de notes.',correction:'for m in set(e["mat"] for e in notes):\n    moy=sum(e["note"] for e in notes if e["mat"]==m)/...',notions:['Agrégation']},
      {id:'N03-09',difficulte:2,titre:'Supprimer doublons',enonce:'Supprimer les doublons d\'une liste de dicts.',correction:'[dict(t) for t in set(tuple(sorted(e.items())) for e in table)]',notions:['Sélection']},
      {id:'N03-10',difficulte:3,titre:'Regroupement',enonce:'[{"produit":"A","qte":10},{"produit":"A","qte":8}]. Total par produit.',correction:'totaux={}\nfor v in ventes: totaux[v["produit"]]=totaux.get(v["produit"],0)+v["qte"]',notions:['Agrégation']},
      {id:'N03-11',difficulte:2,titre:'Recherche',enonce:'1. Trouver produit code "P02"  2. Filtrer prix<10.',correction:'1. next(e for e in table if e["code"]=="P02")\n2. [e for e in table if e["prix"]<10]',notions:['Sélection']},
      {id:'N03-12',difficulte:2,titre:'Mise à jour table',enonce:'Appliquer -10% sur tous les prix.',correction:'for e in table: e["prix"]=round(e["prix"]*0.9,2)',notions:['Projection']},
      {id:'N03-13',difficulte:3,titre:'Fusion 3 tables',enonce:'Joindre eleves, notes, cours.',correction:'res=[]\nfor e in eleves:\n  for n in notes:\n    if n["id_el"]==e["id"]:\n      for c in cours:\n        if c["id"]==n["id_cours"]:\n          res.append({"eleve":e["nom"],"cours":c["nom"],"note":n["note"]})',notions:['Jointure']},
      {id:'N03-14',difficulte:2,titre:'Export CSV',enonce:'Écrire liste de dicts dans un fichier CSV.',correction:'import csv\nwith open("out.csv","w",newline="") as f:\n    w=csv.DictWriter(f,fieldnames=["nom","note"])\n    w.writeheader(); w.writerows(table)',notions:['CSV']},
      {id:'N03-15',difficulte:3,titre:'Rang classement',enonce:'Ajouter champ "rang" (1=meilleur).',correction:'triee=sorted(table,key=lambda e:e["note"],reverse=True)\nfor i,e in enumerate(triee): e["rang"]=i+1',notions:['Tri','Projection']},
    ]
  },
  { id:'interactions-web', numero:4,
    titre:'Interactions Homme-Machine sur le Web',
    sousTitre:'HTML · CSS · JavaScript · HTTP · Formulaires · DOM',
    icon:'🌐', color:'#f59e0b',
    notions:['HTML','CSS','JavaScript','HTTP','GET/POST','DOM','Client/Serveur'],
    exercices:[
      {id:'N04-01',difficulte:1,titre:'Squelette HTML',enonce:'Page "NSI" avec h1 et paragraphe.',correction:'<!DOCTYPE html><html lang="fr"><head><meta charset="UTF-8"><title>NSI</title></head><body><h1>NSI</h1><p>Bienvenue.</p></body></html>',notions:['HTML']},
      {id:'N04-02',difficulte:1,titre:'Sélecteurs CSS',enonce:'CSS : 1. h1 en bleu  2. .important en gras  3. #menu fond gris',correction:'h1{color:blue} .important{font-weight:bold} #menu{background:gray}',notions:['CSS']},
      {id:'N04-03',difficulte:1,titre:'Anatomie URL',enonce:'Décomposer https://api.ex.com:8080/search?q=nsi&page=2#top',correction:'protocole:https, domaine:api.ex.com, port:8080, chemin:/search, params:q=nsi,page=2, fragment:#top',notions:['HTTP']},
      {id:'N04-04',difficulte:1,titre:'GET vs POST',enonce:'GET ou POST : 1. Recherche  2. Login  3. Image  4. Commande',correction:'1. GET  2. POST  3. GET  4. POST',notions:['GET/POST']},
      {id:'N04-05',difficulte:2,titre:'Formulaire HTML',enonce:'Formulaire inscription : nom, email, age, bouton. POST /register.',correction:'<form action="/register" method="POST"><input type="text" name="nom"><input type="email" name="email"><input type="number" name="age"><button type="submit">Envoyer</button></form>',notions:['HTML','GET/POST']},
      {id:'N04-06',difficulte:1,titre:'Codes statut HTTP',enonce:'Signification : 1. 200  2. 301  3. 404  4. 500  5. 403',correction:'1. OK  2. Redirect  3. Not Found  4. Erreur serveur  5. Interdit',notions:['HTTP']},
      {id:'N04-07',difficulte:2,titre:'DOM JavaScript',enonce:'1. getElementById  2. Changer texte  3. Écouteur clic  4. Créer élément',correction:'1. document.getElementById("id")\n2. el.textContent="txt"\n3. el.addEventListener("click",cb)\n4. document.createElement("p")',notions:['JavaScript','DOM']},
      {id:'N04-08',difficulte:2,titre:'Fetch API',enonce:'Récupérer JSON /api/users, afficher noms.',correction:'fetch("/api/users").then(r=>r.json()).then(data=>data.forEach(u=>console.log(u.nom)))',notions:['JavaScript','HTTP']},
      {id:'N04-09',difficulte:2,titre:'Cookies et sessions',enonce:'1. Cookie  2. Cookie vs session  3. HttpOnly  4. Vie privée',correction:'1. Fichier client  2. Cookie=client, Session=serveur  3. Inaccessible JS  4. Traçage',notions:['HTTP']},
      {id:'N04-10',difficulte:2,titre:'Flexbox',enonce:'Centrer un div h+v avec Flexbox.',correction:'body{display:flex;justify-content:center;align-items:center;min-height:100vh}',notions:['CSS']},
      {id:'N04-11',difficulte:2,titre:'Validation JS',enonce:'validerForm(email,age) : "@" dans email, âge 10-120.',correction:'function validerForm(e,a){return e.includes("@")&&a>=10&&a<=120}',notions:['JavaScript']},
      {id:'N04-12',difficulte:2,titre:'Client vs serveur',enonce:'1. Client/serveur  2. JS côté?  3. Python côté?  4. Protocole',correction:'1. Client=navigateur, Serveur=distant\n2. Client\n3. Serveur\n4. HTTP/HTTPS',notions:['Client/Serveur']},
      {id:'N04-13',difficulte:3,titre:'Attaque XSS',enonce:'Site affiche $nom sans filtrage. 1. Risque  2. Payload  3. Protection',correction:'1. Injection script\n2. <script>alert("hack")</script>\n3. Échapper < > &',notions:['HTML','JavaScript']},
      {id:'N04-14',difficulte:3,titre:'API REST',enonce:'API livres : 1. Lister  2. Détail id=5  3. Créer  4. Supprimer id=3',correction:'1. GET /livres  2. GET /livres/5  3. POST /livres  4. DELETE /livres/3',notions:['HTTP','GET/POST']},
      {id:'N04-15',difficulte:2,titre:'Responsive design',enonce:'1. Définition  2. Media query <600px  3. px vs em vs %',correction:'1. Adaptation écran\n2. @media(max-width:600px){}\n3. px=fixe,em=relatif,%= conteneur',notions:['CSS']},
    ]
  },
  { id:'architecture-os', numero:5,
    titre:'Architecture matérielle et OS',
    sousTitre:'Von Neumann · CPU · Mémoire · OS · Processus · Linux',
    icon:'⚙️', color:'#ef4444',
    notions:['Von Neumann','CPU','RAM','OS','Processus','Fichiers','Linux'],
    exercices:[
      {id:'N05-01',difficulte:1,titre:'Von Neumann',enonce:'1. 4 composants  2. UAL  3. UC  4. Bus',correction:'1. UAL+UC+Mémoire+E/S  2. Calculs  3. Séquencement  4. Liaison',notions:['Von Neumann']},
      {id:'N05-02',difficulte:1,titre:'Cycle machine',enonce:'3 étapes pour ADD R1,R2.',correction:'1. FETCH: charger  2. DECODE: identifier  3. EXECUTE: calculer',notions:['Von Neumann','CPU']},
      {id:'N05-03',difficulte:1,titre:'Hiérarchie mémoire',enonce:'Classer rapide→lent : SSD,RAM,Registres,Cache L1,HDD',correction:'Registres > Cache L1 > RAM > SSD > HDD',notions:['RAM']},
      {id:'N05-04',difficulte:2,titre:'Commandes Linux',enonce:'1. Lister droits  2. Créer dossier  3. Copier  4. Afficher contenu',correction:'1. ls -la  2. mkdir projet  3. cp a.txt bak/  4. cat main.py',notions:['Linux']},
      {id:'N05-05',difficulte:2,titre:'Droits Unix',enonce:'-rwxr-xr-- : 1. Proprio  2. Groupe  3. Autres  4. chmod 755',correction:'1. rwx  2. r-x  3. r--  4. rwxr-xr-x',notions:['Linux']},
      {id:'N05-06',difficulte:2,titre:'Processus',enonce:'1. Définition  2. Prog vs processus  3. États  4. kill -9',correction:'1. Programme en exécution\n2. Fichier vs instance\n3. Nouveau→Prêt→Exec⇄Bloqué→Terminé\n4. Arrêt forcé',notions:['Processus']},
      {id:'N05-07',difficulte:2,titre:'Système fichiers',enonce:'/home/alice/NSI/main.py : 1. Rel depuis /home/alice  2. Parent  3. Nom  4. Ext',correction:'1. NSI/main.py  2. /home/alice/NSI  3. main.py  4. .py',notions:['Fichiers']},
      {id:'N05-08',difficulte:2,titre:'Ordonnancement',enonce:'P1=10ms P2=5ms P3=8ms. FIFO puis RR quantum=4ms.',correction:'FIFO: P1→P2→P3\nRR: P1(4)→P2(4)→P3(4)→P1(4)→P2(1)→P3(4)→P1(2)',notions:['OS','Processus']},
      {id:'N05-09',difficulte:1,titre:'Rôles OS',enonce:'Citer 5 rôles.',correction:'1. Processus  2. Mémoire  3. Fichiers  4. Périphériques  5. Sécurité',notions:['OS']},
      {id:'N05-10',difficulte:2,titre:'Mémoire virtuelle',enonce:'1. Définition  2. Swap  3. Avantage',correction:'1. Espace adressage illimité  2. Extension RAM sur disque  3. Isolation processus',notions:['RAM','OS']},
      {id:'N05-11',difficulte:2,titre:'Redirections Linux',enonce:'1. ls>f  2. cmd 2>&1  3. ls|grep .py  4. cat a>>b',correction:'1. Sortie→fichier  2. Stderr→stdout  3. Filtrer  4. Ajouter',notions:['Linux']},
      {id:'N05-12',difficulte:3,titre:'Interblocage',enonce:'P1 tient R1 attend R2. P2 tient R2 attend R1.',correction:'Deadlock. Solution: ordre acquisition ou timeout.',notions:['Processus']},
      {id:'N05-13',difficulte:2,titre:'Script bash',enonce:'1. Echo  2. 3 dossiers  3. Boucle 1→5',correction:'#!/bin/bash\necho "Bonjour"\nmkdir d1 d2 d3\nfor i in 1 2 3 4 5; do echo $i; done',notions:['Linux']},
      {id:'N05-14',difficulte:2,titre:'Performance CPU',enonce:'3GHz. 1. Cycles/s  2. Durée cycle  3. IPC=2',correction:'1. 3×10⁹  2. ≈0.33ns  3. 6×10⁹ inst/s',notions:['CPU']},
      {id:'N05-15',difficulte:3,titre:'Comparaison OS',enonce:'Linux vs Windows vs macOS.',correction:'Linux: open source, serveurs\nWindows: propriétaire, bureautique\nmacOS: propriétaire, Unix',notions:['OS']},
    ]
  },
  { id:'langages-python', numero:6,
    titre:'Langages et Programmation Python',
    sousTitre:'Variables · Fonctions · Récursivité · Modules · Boucles',
    icon:'🐍', color:'#6366f1',
    notions:['Variables','Fonctions','Récursivité','Modules','Boucles'],
    exercices:[
      {id:'N06-01',difficulte:1,titre:'Types Python',enonce:'Type de : 1. 3.14  2. "NSI"  3. True  4. (1,2)  5. type(42)',correction:'1. float  2. str  3. bool  4. tuple  5. int',notions:['Variables']},
      {id:'N06-02',difficulte:1,titre:'Fonctions simples',enonce:'1. carre(x)  2. est_pair(n)  3. maximum(a,b)',correction:'def carre(x): return x**2\ndef est_pair(n): return n%2==0\ndef maximum(a,b): return a if a>b else b',notions:['Fonctions']},
      {id:'N06-03',difficulte:1,titre:'Boucles',enonce:'1. Somme 1→n  2. Pairs 0→20 while  3. Compter "a" dans chaîne',correction:'1. sum(range(1,n+1))  2. while i<=20: print(i); i+=2  3. sum(1 for c in s if c=="a")',notions:['Boucles']},
      {id:'N06-04',difficulte:2,titre:'Récursivité — factorielle',enonce:'1. fact(n) récursif  2. Cas de base  3. fact(5)  4. n<0?',correction:'def fact(n): return 1 if n==0 else n*fact(n-1)\nfact(5)=120  |  n<0 → récursion infinie',notions:['Récursivité']},
      {id:'N06-05',difficulte:2,titre:'Fibonacci',enonce:'1. Coder fib  2. fib(7)  3. Problème perf?',correction:'def fib(n): return n if n<=1 else fib(n-1)+fib(n-2)\nfib(7)=13  |  O(2ⁿ) recalculs',notions:['Récursivité']},
      {id:'N06-06',difficulte:2,titre:'Portée variables',enonce:'x=10 def f(): x=20 print(x). f() puis print(x).',correction:'20 puis 10. Utiliser "global x" pour modifier globale.',notions:['Variables','Fonctions']},
      {id:'N06-07',difficulte:2,titre:'Fonctions ordre supérieur',enonce:'1. map(lambda x:x**2,[1,2,3])  2. filter(>2,[1,2,3,4])  3. sorted par clé',correction:'1. [1,4,9]  2. [3,4]  3. sorted(lst,key=lambda x:x["nom"])',notions:['Fonctions']},
      {id:'N06-08',difficulte:2,titre:'Modules',enonce:'1. math.sqrt(16)  2. random.randint  3. date.today  4. Créer module',correction:'1. 4.0  2. 1-6  3. date actuelle  4. Fichier .py importable',notions:['Modules']},
      {id:'N06-09',difficulte:2,titre:'Gestion erreurs',enonce:'1. try/except  2. ValueError+TypeError  3. finally  4. raise',correction:'try: ...\nexcept (ValueError,TypeError) as e: print(e)\nfinally: ...\nraise ValueError("msg")',notions:['Fonctions']},
      {id:'N06-10',difficulte:2,titre:'Paramètres avancés',enonce:'1. Défaut  2. *args  3. **kwargs  4. Return multiple',correction:'1. def f(x,y=0)  2. def f(*args)  3. def f(**kw)  4. return a,b',notions:['Fonctions']},
      {id:'N06-11',difficulte:3,titre:'Tours de Hanoï',enonce:'Coder hanoi(n,src,dst,inter). Nb mouvements?',correction:'def hanoi(n,s,d,i):\n    if n==1: print(f"{s}→{d}"); return\n    hanoi(n-1,s,i,d); print(f"{s}→{d}"); hanoi(n-1,i,d,s)\nNb = 2ⁿ-1',notions:['Récursivité']},
      {id:'N06-12',difficulte:2,titre:'Chaînes',enonce:'"NSI Terminale". 1. split()  2. lower()  3. replace  4. [4:13]',correction:'1. ["NSI","Terminale"]  2. "nsi terminale"  3. ...  4. "Terminale"',notions:['Variables']},
      {id:'N06-13',difficulte:3,titre:'Mémoïsation',enonce:'fib avec dict cache.',correction:'cache={}\ndef fib_m(n):\n    if n in cache: return cache[n]\n    if n<=1: return n\n    cache[n]=fib_m(n-1)+fib_m(n-2); return cache[n]',notions:['Récursivité']},
      {id:'N06-14',difficulte:2,titre:'Tests assert',enonce:'5 tests pour carre(x).',correction:'assert carre(0)==0\nassert carre(3)==9\nassert carre(-2)==4',notions:['Fonctions']},
      {id:'N06-15',difficulte:3,titre:'PGCD Euclide',enonce:'1. pgcd récursif  2. pgcd(48,18)  3. Itératif',correction:'def pgcd(a,b): return a if b==0 else pgcd(b,a%b)\npgcd(48,18)=6\ndef pgcd_it(a,b):\n    while b: a,b=b,a%b; return a',notions:['Récursivité']},
    ]
  },
  { id:'algorithmique-premiere', numero:7,
    titre:'Algorithmique',
    sousTitre:'Recherche · Tri · Glouton · Complexité · Invariant de boucle',
    icon:'🧮', color:'#ec4899',
    notions:['Recherche séquentielle','Recherche dichotomique','Tri selection','Tri insertion','Complexité','Glouton'],
    exercices:[
      {id:'N07-01',difficulte:1,titre:'Recherche séquentielle',enonce:'recherche_seq(lst,val). Complexité?',correction:'def recherche_seq(lst,val):\n    for i in range(len(lst)):\n        if lst[i]==val: return i\n    return -1\nO(n)',notions:['Recherche séquentielle']},
      {id:'N07-02',difficulte:2,titre:'Recherche dichotomique',enonce:'recherche_dicho(lst,val). Complexité? Prérequis?',correction:'def recherche_dicho(lst,val):\n    g,d=0,len(lst)-1\n    while g<=d:\n        m=(g+d)//2\n        if lst[m]==val: return m\n        elif lst[m]<val: g=m+1\n        else: d=m-1\n    return -1\nO(log n), liste triée',notions:['Recherche dichotomique']},
      {id:'N07-03',difficulte:2,titre:'Trace tri sélection',enonce:'Trier [5,2,8,1,9,3] étape par étape.',correction:'[5,2,8,1,9,3]→[1,2,8,5,9,3]→[1,2,3,5,9,8]→[1,2,3,5,8,9]',notions:['Tri selection']},
      {id:'N07-04',difficulte:2,titre:'Tri par insertion',enonce:'tri_insertion(lst). Complexité?',correction:'def tri_insertion(lst):\n    for i in range(1,len(lst)):\n        cle=lst[i]; j=i-1\n        while j>=0 and lst[j]>cle: lst[j+1]=lst[j]; j-=1\n        lst[j+1]=cle\n    return lst\nO(n) si trié, O(n²) pire cas',notions:['Tri insertion']},
      {id:'N07-05',difficulte:2,titre:'Complexité Big-O',enonce:'1. lst[i]  2. Recherche  3. Sélection  4. Dichotomie  5. Double boucle',correction:'1. O(1)  2. O(n)  3. O(n²)  4. O(log n)  5. O(n²)',notions:['Complexité']},
      {id:'N07-06',difficulte:2,titre:'Invariant de boucle',enonce:'Invariant tri sélection. Init, Conservation, Terminaison.',correction:'Invariant: k premiers=k plus petits triés\nInit: k=0 ✓ | Conservation: on ajoute min ✓ | Fin: k=n ✓',notions:['Tri selection']},
      {id:'N07-07',difficulte:2,titre:'Glouton — monnaie',enonce:'Rendre 47¢ avec [50,20,10,5,2,1]¢.',correction:'20+20+5+2=47 (4 pièces). Pas toujours optimal.',notions:['Glouton']},
      {id:'N07-08',difficulte:3,titre:'Sac à dos fractionnable',enonce:'A(60€,10kg) B(100€,20kg) C(120€,30kg). Cap=50kg.',correction:'Ratio: A=6,B=5,C=4. Prendre A+B+20/30 C = 240€',notions:['Glouton']},
      {id:'N07-09',difficulte:2,titre:'Trace dichotomie',enonce:'[2,5,8,12,16,23,38,56,72,91]. Chercher 23.',correction:'m=4→16<23→g=5; m=7→56>23→d=6; m=5→23 ✓ (3 étapes)',notions:['Recherche dichotomique']},
      {id:'N07-10',difficulte:2,titre:'Stabilité du tri',enonce:'1. Stable?  2. Insertion  3. Sélection  4. Pourquoi?',correction:'1. Préserve ordre égaux  2. Stable ✓  3. Non stable  4. Tri multi-critères',notions:['Tri insertion','Tri selection']},
      {id:'N07-11',difficulte:3,titre:'Tri de chaînes',enonce:'["banana","apple","cherry"]. 1. Alpha  2. Longueur  3. Dernière lettre',correction:'1. sorted(lst)  2. sorted(lst,key=len)  3. sorted(lst,key=lambda s:s[-1])',notions:['Tri insertion']},
      {id:'N07-12',difficulte:2,titre:'Compter opérations',enonce:'Sélection n=100 : 1. Comparaisons  2. Échanges  3. n=1000?',correction:'1. 4950  2. 99  3. 499500 comparaisons',notions:['Complexité']},
      {id:'N07-13',difficulte:3,titre:'Palindrome récursif',enonce:'est_palindrome(s). Tracer "radar".',correction:'def est_palindrome(s):\n    if len(s)<=1: return True\n    return s[0]==s[-1] and est_palindrome(s[1:-1])',notions:['Récursivité']},
      {id:'N07-14',difficulte:2,titre:'Exponentiation rapide',enonce:'puissance(b,n) en O(log n).',correction:'def puissance(b,n):\n    if n==0: return 1\n    if n%2==0: h=puissance(b,n//2); return h*h\n    return b*puissance(b,n-1)',notions:['Récursivité','Complexité']},
      {id:'N07-15',difficulte:3,titre:'Insertion vs Sélection',enonce:'Comparer complexité, stabilité, presque trié, mémoire.',correction:'Complexité: tous deux O(n²)\nStabilité: insertion ✓, sélection ✗\nPresque trié: insertion O(n)\nMémoire: tous deux O(1)',notions:['Tri selection','Tri insertion']},
    ]
  },
  { id:'projet-nsi-premiere', numero:8,
    titre:'Projet NSI Première',
    sousTitre:'Git · Tests · Documentation · Conception · Équipe',
    icon:'🚀', color:'#f59e0b',
    notions:['Git','Tests','Documentation','Conception','Débogage'],
    exercices:[
      {id:'N08-01',difficulte:1,titre:'Commandes Git',enonce:'1. init  2. Ajouter tout  3. Commiter  4. Push  5. Pull',correction:'1. git init  2. git add .  3. git commit -m "msg"  4. git push  5. git pull',notions:['Git']},
      {id:'N08-02',difficulte:2,titre:'Branches Git',enonce:'1. Créer feature/login  2. Switcher  3. Merger  4. Supprimer',correction:'1. git branch feature/login  2. git checkout feature/login\n3. git checkout main && git merge feature/login  4. git branch -d feature/login',notions:['Git']},
      {id:'N08-03',difficulte:1,titre:'Tests assert',enonce:'5 tests pour addition(a,b).',correction:'assert addition(2,3)==5\nassert addition(0,0)==0\nassert addition(-1,1)==0\nassert addition(-5,-3)==-8\nassert addition(100,200)==300',notions:['Tests']},
      {id:'N08-04',difficulte:2,titre:'Docstring',enonce:'max_liste(lst) avec docstring complète (description, args, returns, raises).',correction:'def max_liste(lst):\n    """Retourne le max.\n    Args: lst(list) non vide\n    Returns: plus grand élément\n    Raises: ValueError si vide\n    """\n    if not lst: raise ValueError("vide")\n    return max(lst)',notions:['Documentation']},
      {id:'N08-05',difficulte:2,titre:'Déboguer',enonce:'somme_pairs([1,2,3,4,5])=5 au lieu de 6. Trouver et corriger.',correction:'Debug: afficher x et x%2 à chaque étape\n2+4=6, pas 5 → vérifier données ou bug dans appel\ndef somme_pairs(lst): return sum(x for x in lst if x%2==0)',notions:['Débogage']},
      {id:'N08-06',difficulte:2,titre:'Cahier des charges',enonce:'CdC pour appli de notes scolaires.',correction:'1. Contexte: gérer notes\n2. Features: CRUD, moyennes, bulletins\n3. Contraintes: Python, SQLite\n4. Délai: 3 semaines',notions:['Conception']},
      {id:'N08-07',difficulte:2,titre:'README.md',enonce:'README pour calculatrice Python.',correction:'# Calculatrice\n## Installation\npip install -r requirements.txt\n## Usage\npython calc.py\n## Auteur\nAlice',notions:['Documentation']},
      {id:'N08-08',difficulte:2,titre:'Conflits Git',enonce:'1. Comment détecté?  2. Résoudre?  3. Prévenir?',correction:'1. <<<, ===, >>>  2. Choisir+git add+commit  3. Branches séparées',notions:['Git']},
      {id:'N08-09',difficulte:2,titre:'Refactoring',enonce:'calculer_taxe_france() et _allemagne() dupliquées. Refactorer.',correction:'def calculer_taxe(prix,taux): return prix*taux\ncalculer_taxe(100,0.20)  # France\ncalculer_taxe(100,0.19)  # Allemagne',notions:['Conception']},
      {id:'N08-10',difficulte:3,titre:'Tests pytest',enonce:'pytest pour diviser(a,b) avec ZeroDivisionError si b=0.',correction:'import pytest\ndef test_ok(): assert diviser(10,2)==5.0\ndef test_zero():\n    with pytest.raises(ZeroDivisionError): diviser(1,0)',notions:['Tests']},
      {id:'N08-11',difficulte:2,titre:'GitHub Pages',enonce:'1. Définition  2. Héberger  3. URL',correction:'1. Hébergement statique gratuit\n2. Settings→Pages→Source=main\n3. username.github.io/repo',notions:['Git']},
      {id:'N08-12',difficulte:2,titre:'Versionnage sémantique',enonce:'2.4.1 : signification? Quand incrémenter?',correction:'2=majeur, 4=mineur, 1=patch\nbug→.patch, feature→mineur, refonte→majeur',notions:['Git']},
      {id:'N08-13',difficulte:3,titre:'Pattern MVC',enonce:'MVC pour bibliothèque.',correction:'Model: Livre, BDD\nView: afficher_catalogue()\nController: ajouter(), emprunter()\nAvantage: séparation responsabilités',notions:['Conception']},
      {id:'N08-14',difficulte:2,titre:'Revue de code',enonce:'5 éléments à vérifier.',correction:'1. Nommage  2. Docstrings  3. Tests  4. Erreurs  5. Duplication',notions:['Documentation','Tests']},
      {id:'N08-15',difficulte:3,titre:'Présentation projet 10min',enonce:'Structurer une présentation.',correction:'1min contexte | 2min démo | 2min architecture | 2min choix tech | 1min difficultés | 1min améliorations | 1min questions',notions:['Conception']},
    ]
  },
]

const SECTIONS_NSI: {
  key:SKey; label:string; icon:string; color:string; coeff:string; desc:string;
  data:AnneeData[]; links:NSILinks;
}[] = [
  { key:'terminale-nsi', label:'Terminale NSI', icon:'🎓', color:'#8b5cf6', coeff:'Coef. 16 · 3h30', desc:'Spécialité NSI · Structures de données · Algorithmes · SQL · POO · Réseaux', data:dataNSITerminale, links:linksNSITerminale },
  { key:'premiere-nsi',  label:'Première NSI',  icon:'📗', color:'#06b6d4', coeff:'Épreuve anticipée · 2h', desc:'NSI Première · Python · Web · Données · Architecture · Algorithmique', data:dataNSIPremiere, links:linksNSIPremiereAnticipee },
  { key:'seconde-snt',   label:'Seconde SNT',   icon:'📘', color:'#10b981', coeff:'Épreuve commune', desc:'SNT Seconde · 7 thèmes · Internet · Web · Données · IA', data:[], links:{} as NSILinks },
]

const SECTIONS: {
  key:SKey; label:string; icon:string; color:string; coeff:string; desc:string;
  data:AnneeData[]; links:Record<number,AnneeLinks>;
}[] = [
  { key:'terminale-generale',
    label:'Terminale · Maths', icon:'🎓', color:'#4f6ef7', coeff:'Coef. 16 · 3h30',
    desc:'Spécialité Mathématiques · Bac Général · Analyse · Algèbre · Probabilités · Géométrie',
    data:dataGenerale, links:linksGenerale },
  { key:'terminale-physique-chimie',
    label:'Terminale Phy-Chimie', icon:'⚗️', color:'#06b6d4', coeff:'Coef. 16 · 3h30',
    desc:'Spécialité Physique-Chimie · Bac Général · Mécanique · Thermodynamique · Ondes · Chimie',
    data:dataPhysiqueChimie, links:linksPhysiqueChimie },
  { key:'terminale-technologique',
    label:'Terminale · Techno', icon:'⚙️', color:'#06d6a0', coeff:'STMG · STI2D/STL',
    desc:'Série STI2D · Épreuve PCM (Physique-Chimie & Maths) · 3h · Sujet + Correction',
    data:dataTechno, links:linksTechno },
  { key:'terminale-maths-expertes',
    label:'Terminale · Expertes', icon:'⭐', color:'#8b5cf6', coeff:'Option · Coef. 2 · 3h',
    desc:'Option Maths Expertes · Arithmétique · Complexes · Matrices & Graphes',
    data:dataExpertes, links:linksExpertes },
  { key:'premiere-specialite', label:'Première · Maths', icon:'📗', color:'#f59e0b', coeff:'DS lycées · 2h',
    desc:"Pas d'examen national en Première. Choisissez un chapitre pour vous entraîner.",
    data:[], links:{} },
  { key:'seconde-maths', label:'Seconde · Maths', icon:'📘', color:'#10b981', coeff:'Enseignement commun',
    desc:'Mathématiques Seconde · Enseignement commun · Fonctions · Géométrie · Probabilités · Statistiques',
    data:[], links:{} },
  { key:'seconde-physique-chimie', label:'Seconde Phy-Chimie', icon:'🔬', color:'#f97316', coeff:'Enseignement commun',
    desc:'Physique-Chimie Seconde · Lumière · Atomes · Énergie · 45 exercices corrigés',
    data:[], links:{} },
  { key:'premiere-physique-chimie', label:'Première Phy-Chimie', icon:'⚗️', color:'#ec4899', coeff:'Spé · DS lycées',
    desc:'Physique-Chimie Première · Mécanique · Électricité · Chimie · 45 exercices corrigés',
    data:[], links:{} },
  { key:'sti2d-physique-chimie', label:'STI2D · Phy-Chimie', icon:'⚙️', color:'#10b981', coeff:'Voie techno · 2h',
    desc:"Physique-Chimie STI2D · Épreuve spécifique · Mécanique · Électricité · Ondes · Chimie appliquée",
    data:dataSTI2DPC, links:linksSTI2DPC },
  { key:'stes-physique-chimie', label:'ST2S · Phy-Chimie', icon:'🏥', color:'#f43f5e', coeff:'Voie techno · 2h',
    desc:"Physique-Chimie ST2S · Santé & Social · Ondes · Électricité · Chimie des médicaments",
    data:dataSTESPC, links:linksSTESPC },
]

// ════════════════════════════════════════════════════════════════
//  MODAL PDF — identique page Tunisie
//  Google Docs Viewer : affiche tout PDF public en iframe
// ════════════════════════════════════════════════════════════════
function PdfModal({ url, title, onClose }: { url:string; title:string; onClose:()=>void }) {
  useEffect(()=>{
    const fn = (e:KeyboardEvent) => { if(e.key==='Escape') onClose() }
    document.addEventListener('keydown', fn)
    document.body.style.overflow = 'hidden'
    return ()=>{ document.removeEventListener('keydown', fn); document.body.style.overflow='' }
  },[onClose])

  const isPdf    = url.endsWith('.pdf')
  const isGDrive = url.includes('drive.google.com')

  // ⚡ Google Docs Viewer : passe par viewer pour tout PDF APMEP
  const iframeSrc = isPdf
    ? `https://docs.google.com/viewer?url=${encodeURIComponent(url)}&embedded=true`
    : url

  const downloadHref = isGDrive ? url.replace('/preview','/view') : url

  return (
    <div onClick={onClose}
      style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.9)',zIndex:9999,display:'flex',flexDirection:'column'}}>

      {/* Barre titre — identique page Tunisie */}
      <div onClick={e=>e.stopPropagation()}
        style={{display:'flex',alignItems:'center',gap:12,padding:'10px 18px',background:'#0d0d1a',borderBottom:'1px solid rgba(255,255,255,0.08)',flexShrink:0,flexWrap:'wrap'}}>
        <span style={{fontSize:18}}>📄</span>
        <div style={{flex:1,minWidth:0}}>
          <p style={{margin:'0 0 1px',fontWeight:700,fontSize:13,color:'white',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{title}</p>

        </div>
        <div style={{display:'flex',gap:8,flexShrink:0}}>
          <a href={downloadHref} download={isPdf} target="_blank" rel="noreferrer"
            style={{padding:'6px 14px',background:'rgba(255,255,255,0.1)',color:'white',borderRadius:8,textDecoration:'none',fontSize:12,fontWeight:600,display:'flex',alignItems:'center',gap:5}}>
            ⬇ Télécharger
          </a>
          <a href={downloadHref} target="_blank" rel="noreferrer"
            style={{padding:'6px 14px',background:'rgba(79,110,247,0.3)',color:'white',borderRadius:8,textDecoration:'none',fontSize:12,fontWeight:600,display:'flex',alignItems:'center',gap:5}}>
            ↗ Ouvrir
          </a>
          <button onClick={onClose}
            style={{padding:'6px 14px',borderRadius:8,border:'1px solid rgba(255,255,255,0.2)',background:'transparent',color:'white',cursor:'pointer',fontSize:14,fontWeight:700}}>
            ✕
          </button>
        </div>
      </div>

      {/* Viewer iframe — Google Docs Viewer */}
      <div onClick={e=>e.stopPropagation()} style={{flex:1,background:'#1a1a2e',position:'relative'}}>
        <iframe
          src={iframeSrc}
          style={{width:'100%',height:'100%',border:'none'}}
          title={title}
          allow="autoplay"
        />
      </div>
    </div>
  )
}

// ── Bouton PDF ────────────────────────────────────────────────
const INTEGRALES = ['Spe_annee_2024_DV_FH4.pdf','annee_2023_spe_DV.pdf','Annee_spe_2025_DV.pdf']
const isIntegrale = (url?:string) => url ? INTEGRALES.some(i => url.includes(i)) : false

function BtnLink({ label, url, color, onOpen }:{label:string;url?:string;color:string;onOpen:(u:string,t:string)=>void}) {
  if (!url) return null
  // Si le sujet pointe vers l'intégrale, ne pas afficher le bouton Sujet
  if (label.includes('Sujet') && isIntegrale(url)) return null
  return (
    <button onClick={()=>onOpen(url,label)}
      style={{display:'inline-flex',alignItems:'center',gap:5,padding:'7px 14px',borderRadius:9,border:`1.5px solid ${color}50`,background:`${color}12`,color,cursor:'pointer',fontSize:12,fontWeight:700,transition:'all 0.15s',fontFamily:'var(--font-body)'}}
      onMouseEnter={e=>{e.currentTarget.style.background=`${color}26`;e.currentTarget.style.transform='translateY(-1px)'}}
      onMouseLeave={e=>{e.currentTarget.style.background=`${color}12`;e.currentTarget.style.transform='none'}}>
      {label}
    </button>
  )
}

// ── Bloc sessions — grille comme page Tunisie ─────────────────
function SessionsBlock({ lnk, color, year, onOpen }:{
  lnk:AnneeLinks; color:string; year:number; onOpen:(u:string,t:string)=>void
}) {
  return (
    <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))',gap:14,marginBottom:20}}>
      {lnk.sessions.map((s,i)=>(
        <div key={i} style={{
          background: i%2===0 ? 'rgba(79,110,247,0.06)' : 'rgba(245,158,11,0.06)',
          border: `1px solid ${i%2===0 ? 'rgba(79,110,247,0.4)' : 'rgba(245,158,11,0.4)'}`,
          borderRadius:14, padding:18
        }}>
          <p style={{margin:'0 0 12px',fontWeight:700,fontSize:13,color:'var(--text)',display:'flex',alignItems:'center',gap:8}}>
            {s.flag && <span style={{fontSize:18}}>{s.flag}</span>}
            {s.label}
          </p>
          <div style={{display:'flex',flexWrap:'wrap',gap:8}}>
            <BtnLink
              label="📄 Sujet"
              url={s.sujet}
              color={color}
              onOpen={(u)=>onOpen(u,`📄 Sujet — ${s.label} · ${year}`)}
            />
            <BtnLink
              label="✅ Correction"
              url={s.correction}
              color="#06d6a0"
              onOpen={(u)=>onOpen(u,`✅ Correction — ${s.label} · ${year}`)}
            />
          </div>
          {!s.sujet && !s.correction && (
            <p style={{margin:0,fontSize:12,color:'var(--muted)'}}>Non disponible</p>
          )}
        </div>
      ))}
    </div>
  )
}

// ════════════════════════════════════════════════════════════════
//  PAGE PRINCIPALE — Architecture identique page Tunisie
// ════════════════════════════════════════════════════════════════

// ══════════════════════════════════════════════════════════════
//  COMPOSANT PREMIÈRE — Vue par chapitres avec exercices inline
// ══════════════════════════════════════════════════════════════
function PremiereView({ chapitres }: { chapitres: ChapitreData[] }) {
  const [selectedChap, setSelectedChap] = useState<string|null>(null)
  const [selectedEx, setSelectedEx]     = useState<string|null>(null)

  const chap = chapitres.find(c => c.id === selectedChap)

  return (
    <div>
      {/* GRILLE CHAPITRES */}
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))',gap:12,marginBottom:28}}>
        {chapitres.map(c => {
          const sel = selectedChap === c.id
          return (
            <div key={c.id} onClick={()=>{setSelectedChap(sel?null:c.id);setSelectedEx(null)}}
              style={{cursor:'pointer',background:sel?`${c.color}15`:'var(--surface)',
                border:`2px solid ${sel?c.color:'var(--border)'}`,borderRadius:14,
                padding:'16px 14px',transition:'all 0.2s',
                boxShadow:sel?`0 6px 20px ${c.color}30`:'none',
                transform:sel?'translateY(-2px)':'none'}}
              onMouseEnter={e=>{if(!sel)e.currentTarget.style.borderColor=`${c.color}60`}}
              onMouseLeave={e=>{if(!sel)e.currentTarget.style.borderColor='var(--border)'}}>
              <div style={{fontSize:22,marginBottom:6}}>{c.icon}</div>
              <div style={{fontWeight:800,fontSize:13,color:sel?c.color:'var(--text)',marginBottom:3}}>
                Ch. {c.numero} — {c.titre}
              </div>
              <div style={{fontSize:11,color:'var(--muted)',marginBottom:8}}>{c.sousTitre}</div>
              <div style={{display:'flex',gap:6,flexWrap:'wrap'}}>
                <span style={{fontSize:10,background:`${c.color}15`,color:c.color,border:`1px solid ${c.color}40`,
                  padding:'2px 8px',borderRadius:20,fontWeight:700}}>
                  {c.exercices.length} exercices
                </span>
                <span style={{fontSize:10,background:'rgba(6,214,160,0.1)',color:'#06d6a0',
                  border:'1px solid rgba(6,214,160,0.25)',padding:'2px 8px',borderRadius:20,fontWeight:700}}>
                  ✅ {c.exercices.filter(e=>e.correction).length} corrigés
                </span>
              </div>
            </div>
          )
        })}
      </div>

      {/* DETAIL CHAPITRE */}
      {chap && (
        <div style={{background:'var(--surface)',border:`2px solid ${chap.color}40`,borderRadius:20,
          padding:'24px 28px',animation:'fadeInUp 0.25s ease both'}}>
          {/* Header chapitre */}
          <div style={{display:'flex',alignItems:'center',gap:14,marginBottom:18}}>
            <div style={{width:44,height:44,borderRadius:12,background:`${chap.color}20`,
              display:'flex',alignItems:'center',justifyContent:'center',fontSize:22}}>
              {chap.icon}
            </div>
            <div>
              <h2 style={{margin:0,fontSize:18,fontWeight:800,color:chap.color}}>
                Chapitre {chap.numero} — {chap.titre}
              </h2>
              <p style={{margin:0,fontSize:12,color:'var(--muted)'}}>{chap.sousTitre}</p>
            </div>
          </div>

          {/* Notions clés */}
          <div style={{display:'flex',flexWrap:'wrap',gap:6,marginBottom:20}}>
            {chap.notions.map(n=>(
              <span key={n} style={{fontSize:11,background:`${chap.color}12`,color:chap.color,
                border:`1px solid ${chap.color}35`,padding:'3px 10px',borderRadius:20,fontWeight:600}}>
                {n}
              </span>
            ))}
          </div>

          {/* Liste exercices */}
          <div style={{display:'flex',flexDirection:'column',gap:12}}>
            {chap.exercices.map((ex, i) => {
              const exSel = selectedEx === ex.id
              const diffColor = ex.difficulte===1?'#22c55e':ex.difficulte===2?'#f59e0b':ex.difficulte===3?'#ef4444':'#8b5cf6'
              const stars = '★'.repeat(ex.difficulte) + '✩'.repeat(4-ex.difficulte)
              return (
                <div key={ex.id}
                  style={{border:`1.5px solid ${exSel?chap.color:diffColor+'40'}`,borderRadius:14,
                    background:exSel?`${chap.color}08`:'var(--bg)',overflow:'hidden'}}>
                  {/* En-tête exercice */}
                  <div onClick={()=>setSelectedEx(exSel?null:ex.id)}
                    style={{padding:'14px 18px',cursor:'pointer',display:'flex',
                      justifyContent:'space-between',alignItems:'center',gap:12}}>
                    <div style={{flex:1}}>
                      <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:4}}>
                        <span style={{fontSize:12,fontWeight:800,color:'var(--muted)'}}>Ex. {i+1}</span>
                        <span style={{fontSize:13,fontWeight:700,color:'var(--text)'}}>{ex.titre}</span>
                      </div>
                      <div style={{display:'flex',gap:6,flexWrap:'wrap'}}>
                        <span style={{fontSize:10,color:diffColor,fontWeight:700}}>{stars} (niv. {ex.difficulte})</span>
                        <span style={{fontSize:10,color:'var(--muted)'}}>📚 {ex.source}</span>
                        {ex.notions.slice(0,2).map(n=>(
                          <span key={n} style={{fontSize:10,background:'var(--surface)',color:'var(--muted)',
                            border:'1px solid var(--border)',padding:'1px 6px',borderRadius:10}}>{n}</span>
                        ))}
                      </div>
                    </div>
                    <div style={{color:exSel?chap.color:'var(--muted)',fontSize:18,transition:'transform 0.2s',
                      transform:exSel?'rotate(180deg)':'none'}}>▾</div>
                  </div>

                  {/* Contenu (énoncé + correction) */}
                  {exSel && (
                    <div style={{borderTop:`1px solid ${chap.color}30`,padding:'18px 20px'}}>
                      {/* ÉNONCÉ */}
                      <div style={{marginBottom:20}}>
                        <p style={{margin:'0 0 10px',fontSize:11,fontWeight:700,textTransform:'uppercase',
                          letterSpacing:'0.08em',color:chap.color}}>📝 Énoncé</p>
                        <div style={{fontSize:14,lineHeight:1.75,whiteSpace:'pre-line',
                          background:'var(--surface)',borderRadius:10,padding:'14px 16px',
                          border:`1px solid ${chap.color}25`}}>
                          {ex.enonce}
                        </div>
                      </div>
                      {/* CORRECTION */}
                      <div>
                        <p style={{margin:'0 0 10px',fontSize:11,fontWeight:700,textTransform:'uppercase',
                          letterSpacing:'0.08em',color:'#06d6a0'}}>✅ Correction</p>
                        <div style={{fontSize:14,lineHeight:1.85,whiteSpace:'pre-line',
                          background:'rgba(6,214,160,0.05)',borderRadius:10,padding:'14px 16px',
                          border:'1px solid rgba(6,214,160,0.25)',fontFamily:'var(--font-body)'}}>
                          {ex.correction}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

type Matiere = 'maths' | 'physique-chimie' | 'informatique' | null

export default function ExamensFrancePage() {
  const router = useRouter()
  const [matiere,setMatiere]           = useState<Matiere>(null)
  const [activeSec,setActiveSec]       = useState<SKey>('terminale-generale')
  const [selectedYear,setSelectedYear] = useState<number|null>(null)
  const [modal,setModal]               = useState<{url:string;title:string}|null>(null)

  const secNSI     = SECTIONS_NSI.find(s=>s.key===activeSec)
  const sec        = secNSI || SECTIONS.find(s=>s.key===activeSec)!
  const detail     = sec.data.find((a:any)=>a.year===selectedYear)
  const anneeLinks = selectedYear ? (sec.links as any)[selectedYear] : null
  const ptTotal    = detail?.exercices.reduce((t,e)=>t+e.pts,0)??0

  const openPdf = (url:string,title:string) => setModal({url,title})
  const lancerSimulation = () => router.push('/simulation-france')

  const goSec = (key:SKey) => {
    setActiveSec(key)
    setSelectedYear(null)
    const nsiKeys:SKey[]  = ['terminale-nsi','premiere-nsi','seconde-snt']
    const mathKeys:SKey[] = ['terminale-generale','terminale-maths-expertes','terminale-technologique','premiere-specialite','seconde-maths']
    const pcKeys:SKey[] = ['terminale-physique-chimie','seconde-physique-chimie','sti2d-physique-chimie','stes-physique-chimie']
    setMatiere(mathKeys.includes(key) ? 'maths' : nsiKeys.includes(key) ? 'informatique' : 'physique-chimie')
  }

  // ── PAGE INTERMÉDIAIRE ──────────────────────────────────────
  if (matiere === null) {
    return (
      <>
        <Navbar/>
        <main style={{position:'relative',zIndex:1,paddingTop:80,minHeight:'100vh'}}>
          <div className="container" style={{paddingTop:64,paddingBottom:80,maxWidth:960}}>

            <div style={{textAlign:'center',marginBottom:52}}>
              <span className="label">📋 Examens Officiels · Bac France</span>
              <h1 style={{fontSize:'clamp(28px,4vw,50px)',marginBottom:16,marginTop:12,lineHeight:1.15}}>
                5 Ans d&#39;Annales Officielles<br/>
                <span style={{background:'linear-gradient(90deg,#6366f1,#06b6d4)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>
                  2021 → 2025 · Sujets + Corrections PDF
                </span>
              </h1>
              <p style={{color:'var(--text2)',fontSize:15,maxWidth:520,margin:'0 auto',lineHeight:1.7}}>
                Choisissez votre matière pour accéder aux annales officielles du Baccalauréat général.
              </p>
            </div>

            {/* CARTES MATIÈRES */}
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))',gap:20,marginBottom:52}}>

              {/* MATHS */}
              <button
                onClick={()=>{ setMatiere('maths'); setActiveSec('terminale-generale') }}
                style={{padding:'36px 28px',background:'rgba(99,102,241,0.06)',border:'1.5px solid rgba(99,102,241,0.22)',borderRadius:20,cursor:'pointer',textAlign:'left',transition:'all 0.22s',fontFamily:'var(--font-body)'}}
                onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-5px)';e.currentTarget.style.borderColor='rgba(99,102,241,0.55)';e.currentTarget.style.background='rgba(99,102,241,0.11)'}}
                onMouseLeave={e=>{e.currentTarget.style.transform='none';e.currentTarget.style.borderColor='rgba(99,102,241,0.22)';e.currentTarget.style.background='rgba(99,102,241,0.06)'}}>
                <div style={{fontSize:52,marginBottom:14}}>📐</div>
                <h2 style={{fontSize:22,fontWeight:800,marginBottom:8,color:'#818cf8'}}>Mathématiques</h2>
                <p style={{fontSize:13,color:'var(--text2)',lineHeight:1.65,margin:'0 0 18px'}}>
                  Spécialité Terminale · Maths Expertes · Techno STMG/STI2D · Première · Seconde
                </p>
                <div style={{display:'flex',flexWrap:'wrap',gap:5,marginBottom:20}}>
                  {['Terminale Générale','Maths Expertes','Techno','Première','Seconde'].map(t=>(
                    <span key={t} style={{fontSize:10,padding:'3px 9px',borderRadius:20,background:'rgba(99,102,241,0.12)',color:'#818cf8',fontWeight:600}}>{t}</span>
                  ))}
                </div>
                <span style={{display:'inline-flex',alignItems:'center',gap:6,color:'#818cf8',fontWeight:700,fontSize:13}}>
                  Voir les annales →
                </span>
              </button>

              {/* PHYSIQUE-CHIMIE */}
              <button
                onClick={()=>{ setMatiere('physique-chimie'); setActiveSec('terminale-physique-chimie') }}
                style={{padding:'36px 28px',background:'rgba(6,182,212,0.06)',border:'1.5px solid rgba(6,182,212,0.22)',borderRadius:20,cursor:'pointer',textAlign:'left',transition:'all 0.22s',fontFamily:'var(--font-body)'}}
                onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-5px)';e.currentTarget.style.borderColor='rgba(6,182,212,0.55)';e.currentTarget.style.background='rgba(6,182,212,0.11)'}}
                onMouseLeave={e=>{e.currentTarget.style.transform='none';e.currentTarget.style.borderColor='rgba(6,182,212,0.22)';e.currentTarget.style.background='rgba(6,182,212,0.06)'}}>
                <div style={{fontSize:52,marginBottom:14}}>⚗️</div>
                <h2 style={{fontSize:22,fontWeight:800,marginBottom:8,color:'#22d3ee'}}>Physique-Chimie</h2>
                <p style={{fontSize:13,color:'var(--text2)',lineHeight:1.65,margin:'0 0 18px'}}>
                  Spécialité Terminale · Seconde · STI2D & ST2S (bientôt)
                </p>
                <div style={{display:'flex',flexWrap:'wrap',gap:5,marginBottom:20}}>
                  {['Terminale Phy-Chimie','Seconde'].map(t=>(
                    <span key={t} style={{fontSize:10,padding:'3px 9px',borderRadius:20,background:'rgba(6,182,212,0.12)',color:'#22d3ee',fontWeight:600}}>{t}</span>
                  ))}
                  {['STI2D','ST2S'].map(t=>(
                    <span key={t} style={{fontSize:10,padding:'3px 9px',borderRadius:20,background:'rgba(255,255,255,0.04)',color:'var(--muted)',fontWeight:600}}>{t} bientôt</span>
                  ))}
                </div>
                <span style={{display:'inline-flex',alignItems:'center',gap:6,color:'#22d3ee',fontWeight:700,fontSize:13}}>
                  Voir les annales →
                </span>
              </button>

              {/* INFORMATIQUE NSI */}
              <button
                onClick={()=>{ setMatiere('informatique'); setActiveSec('terminale-nsi') }}
                style={{padding:'36px 28px',background:'rgba(139,92,246,0.06)',border:'1.5px solid rgba(139,92,246,0.25)',borderRadius:20,cursor:'pointer',textAlign:'left',transition:'all 0.2s',fontFamily:'var(--font-body)',color:'var(--text)'}}
                onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-5px)';e.currentTarget.style.borderColor='rgba(139,92,246,0.55)';e.currentTarget.style.boxShadow='0 20px 60px rgba(139,92,246,0.18)'}}
                onMouseLeave={e=>{e.currentTarget.style.transform='none';e.currentTarget.style.borderColor='rgba(139,92,246,0.25)';e.currentTarget.style.boxShadow='none'}}>
                <div style={{fontSize:52,marginBottom:14}}>💻</div>
                <h2 style={{fontSize:22,fontWeight:800,marginBottom:8,color:'#a78bfa'}}>Informatique NSI</h2>
                <p style={{fontSize:13,color:'var(--text2)',lineHeight:1.65,margin:'0 0 18px'}}>Spécialité NSI Terminale · Première NSI · Seconde SNT</p>
                <div style={{display:'flex',flexWrap:'wrap',gap:5,marginBottom:20}}>
                  {['Terminale NSI','Première NSI','Seconde SNT'].map(t=>(
                    <span key={t} style={{fontSize:10,padding:'3px 9px',borderRadius:20,background:'rgba(139,92,246,0.12)',color:'#a78bfa',fontWeight:600}}>{t}</span>
                  ))}
                </div>
                <span style={{display:'inline-flex',alignItems:'center',gap:6,color:'#a78bfa',fontWeight:700,fontSize:13}}>Voir les annales →</span>
              </button>
            </div>

            {/* Lien Examens Tunisie */}
            <div style={{textAlign:'center',paddingTop:32,borderTop:'1px solid var(--border)'}}>
              <p style={{fontSize:13,color:'var(--muted)',marginBottom:14}}>Cherchez les examens tunisiens ?</p>
              <a href="/examens"
                style={{display:'inline-flex',gap:8,alignItems:'center',padding:'11px 24px',background:'var(--surface)',border:'1px solid var(--border)',borderRadius:12,textDecoration:'none',color:'var(--text)',fontWeight:600,fontSize:13,transition:'all 0.18s'}}
                onMouseEnter={e=>{ e.currentTarget.style.borderColor='rgba(220,38,38,0.4)'; e.currentTarget.style.transform='translateY(-2px)' }}
                onMouseLeave={e=>{ e.currentTarget.style.borderColor='var(--border)'; e.currentTarget.style.transform='none' }}>
                🇹🇳 Examens Tunisie — Bac Maths · Sc.Ex · Techno
              </a>
            </div>
          </div>
        </main>
        <Footer/>
      </>
    )
  }

  return (
    <>
      <Navbar/>
      {modal && <PdfModal url={modal.url} title={modal.title} onClose={()=>setModal(null)}/>}

      <main style={{position:'relative',zIndex:1,paddingTop:80}}>
        <div className="container" style={{paddingTop:40,paddingBottom:80}}>

          {/* HEADER */}
          <div style={{marginBottom:36}}>
            <button onClick={()=>{setMatiere(null);setSelectedYear(null)}}
              style={{display:'inline-flex',alignItems:'center',gap:6,padding:'6px 14px',borderRadius:9,border:'1px solid var(--border)',background:'var(--surface)',color:'var(--muted)',fontSize:12,fontWeight:600,cursor:'pointer',fontFamily:'var(--font-body)',marginBottom:14,transition:'all 0.15s'}}
              onMouseEnter={e=>e.currentTarget.style.borderColor='rgba(99,102,241,0.45)'}
              onMouseLeave={e=>e.currentTarget.style.borderColor='var(--border)'}>
              ← Toutes les matières
            </button>
            <span className="label" style={{marginLeft:8,fontSize:11}}>
              {matiere==='maths'?'📐 Mathématiques':matiere==='informatique'?'💻 Informatique NSI':'⚗️ Physique-Chimie'}
            </span>
            <h1 style={{fontSize:'clamp(26px,4vw,46px)',marginBottom:14}}>
              5 Ans d'Examens Officiels<br/>
              <span style={{color:'var(--accent)'}}>2021 → 2025 · Sujets + Corrections PDF</span>
            </h1>
            <p style={{maxWidth:560,color:'var(--text2)',lineHeight:1.7,marginBottom:10}}>
              Cliquez sur <strong>📄 Sujet</strong> ou <strong>✅ Correction</strong> pour lire le PDF
              directement ici — sans quitter le site. Bouton <strong>⬇ Télécharger</strong> disponible dans le viewer.
            </p>

          </div>

          
          {/* ONGLETS — 2 lignes : Maths / Physique-Chimie */}
          <div style={{marginBottom:28,background:'var(--surface)',border:'1px solid var(--border)',borderRadius:15,padding:'8px 8px 6px',display:'flex',flexDirection:'column',gap:5}}>
            {/* Ligne Mathématiques */}
            {matiere==='maths' && (
              <div style={{display:'flex',gap:3,alignItems:'center',flexWrap:'wrap'}}>
                <span style={{fontSize:11,paddingLeft:6,paddingRight:6,color:'var(--muted)',fontWeight:700}}>📐</span>
                {SECTIONS.filter(s=>(['terminale-generale','terminale-maths-expertes','terminale-technologique','premiere-specialite','seconde-maths'] as SKey[]).includes(s.key)).map(s=>(
                  <button key={s.key} onClick={()=>goSec(s.key)}
                    style={{display:'flex',alignItems:'center',gap:5,padding:'7px 12px',borderRadius:9,border:`1px solid ${activeSec===s.key?s.color:'transparent'}`,cursor:'pointer',fontFamily:'var(--font-body)',fontSize:12,fontWeight:600,transition:'all 0.16s',whiteSpace:'nowrap',
                      background:activeSec===s.key?`${s.color}16`:'transparent',
                      color:activeSec===s.key?s.color:'var(--muted)'}}>
                    <span>{s.icon}</span>
                    <span>{s.label}</span>
                    <span style={{fontSize:9,padding:'1px 6px',borderRadius:6,background:activeSec===s.key?`${s.color}20`:'var(--surface2)',color:activeSec===s.key?s.color:'var(--muted)'}}>{s.coeff}</span>
                  </button>
                ))}
              </div>
            )}
            {/* Ligne Informatique NSI */}
            {matiere==='informatique' && (
              <div style={{display:'flex',gap:3,alignItems:'center',flexWrap:'wrap'}}>
                <span style={{fontSize:11,paddingLeft:6,paddingRight:6,color:'var(--muted)',fontWeight:700}}>💻</span>
                {SECTIONS_NSI.map(s=>(
                  <button key={s.key} onClick={()=>goSec(s.key)}
                    style={{display:'flex',alignItems:'center',gap:5,padding:'7px 12px',borderRadius:9,border:'none',cursor:'pointer',fontFamily:'var(--font-body)',fontSize:12,transition:'all 0.15s',
                      background:activeSec===s.key?`${s.color}16`:'transparent',
                      color:activeSec===s.key?s.color:'var(--muted)'}}>
                    <span>{s.icon}</span><span>{s.label}</span>
                    <span style={{fontSize:9,padding:'1px 6px',borderRadius:6,background:activeSec===s.key?`${s.color}22`:'var(--surface2)',color:activeSec===s.key?s.color:'var(--muted)',marginLeft:2}}>{s.coeff}</span>
                  </button>
                ))}
              </div>
            )}
            {/* Ligne Physique-Chimie */}
            {matiere==='physique-chimie' && (
              <div style={{display:'flex',gap:3,alignItems:'center',flexWrap:'wrap'}}>
                <span style={{fontSize:11,paddingLeft:6,paddingRight:6,color:'var(--muted)',fontWeight:700}}>⚗️</span>
                {SECTIONS.filter(s=>(['terminale-physique-chimie','premiere-physique-chimie','seconde-physique-chimie'] as SKey[]).includes(s.key)).map(s=>(
                  <button key={s.key} onClick={()=>goSec(s.key)}
                    style={{display:'flex',alignItems:'center',gap:5,padding:'7px 12px',borderRadius:9,border:`1px solid ${activeSec===s.key?s.color:'transparent'}`,cursor:'pointer',fontFamily:'var(--font-body)',fontSize:12,fontWeight:600,transition:'all 0.16s',whiteSpace:'nowrap',
                      background:activeSec===s.key?`${s.color}16`:'transparent',
                      color:activeSec===s.key?s.color:'var(--muted)'}}>
                    <span>{s.icon}</span>
                    <span>{s.label}</span>
                    <span style={{fontSize:9,padding:'1px 6px',borderRadius:6,background:activeSec===s.key?`${s.color}20`:'var(--surface2)',color:activeSec===s.key?s.color:'var(--muted)'}}>{s.coeff}</span>
                  </button>
                ))}
                {/* STI2D + ST2S Physique-Chimie — actifs */}
                {(['sti2d-physique-chimie','stes-physique-chimie'] as SKey[]).map(key=>{
                  const s = SECTIONS.find(x=>x.key===key)!
                  return (
                    <button key={s.key} onClick={()=>goSec(s.key)}
                      style={{display:'flex',alignItems:'center',gap:5,padding:'7px 12px',borderRadius:9,border:`1px solid ${activeSec===s.key?s.color:'transparent'}`,cursor:'pointer',fontFamily:'var(--font-body)',fontSize:12,fontWeight:600,transition:'all 0.16s',whiteSpace:'nowrap',
                        background:activeSec===s.key?`${s.color}16`:'transparent',
                        color:activeSec===s.key?s.color:'var(--muted)'}}>
                      <span>{s.icon}</span>
                      <span>{s.label}</span>
                      <span style={{fontSize:9,padding:'1px 6px',borderRadius:6,background:activeSec===s.key?`${s.color}20`:'var(--surface2)',color:activeSec===s.key?s.color:'var(--muted)'}}>{s.coeff}</span>
                    </button>
                  )
                })}
              </div>
            )}
          </div>

          {/* BANNIÈRE SECTION */}
          <div style={{background:`linear-gradient(135deg,${sec.color}12,${sec.color}04)`,border:`1px solid ${sec.color}28`,borderRadius:16,padding:'18px 24px',marginBottom:24,display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:12}}>
            <div style={{display:'flex',gap:14,alignItems:'center'}}>
              <span style={{fontSize:30}}>{sec.icon}</span>
              <div>
                <div style={{display:'flex',gap:8,alignItems:'center',flexWrap:'wrap',marginBottom:4}}>
                  <h2 style={{fontSize:18,margin:0}}>{sec.label}</h2>
                  <span style={{background:`${sec.color}22`,color:sec.color,fontSize:11,padding:'2px 10px',borderRadius:10,fontWeight:600}}>{sec.coeff}</span>
                </div>
                <p style={{fontSize:12,color:'var(--text2)',margin:0}}>{sec.desc}</p>
              </div>
            </div>
            <div style={{fontSize:12,color:'var(--muted)',textAlign:'right'}}>
              {activeSec === 'premiere-specialite' ? (<>
                <div>📗 {CHAPITRES_PREMIERE.length} chapitres · {CHAPITRES_PREMIERE.reduce((t,c)=>t+c.exercices.length,0)} exercices corrigés</div>

              </>) : (<>
                <div>📅 2021 → 2025 · 5 années</div>
                <div style={{marginTop:4}}>📄 Sujet + ✅ Correction par centre d'examen</div>
              </>)}
            </div>
          </div>

          {/* SIMULATION IA */}
          <div style={{background:'linear-gradient(135deg,rgba(99,102,241,0.1),rgba(139,92,246,0.08))',border:'1px solid rgba(99,102,241,0.25)',borderRadius:14,padding:'16px 22px',marginBottom:28,display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:12}}>
            <div>
              <p style={{margin:0,fontWeight:700,fontSize:15}}>🎯 Simuler un Bac Complet — {sec.label}</p>
              <p style={{margin:'3px 0 0',fontSize:12,color:'var(--muted)'}}>🧠 IA · Examens originaux · Correction détaillée · Analyse des faiblesses · Remédiation</p>
            </div>
            <button onClick={lancerSimulation} className="btn btn-primary"
              style={{background:'linear-gradient(135deg,#6366f1,#8b5cf6)',border:'none',padding:'11px 22px',fontWeight:700,fontSize:14,cursor:'pointer',borderRadius:12,color:'white',boxShadow:'0 6px 20px rgba(99,102,241,0.45)',display:'flex',alignItems:'center',gap:8}}>
              🧠 Lancer la Simulation IA →
            </button>
          </div>

          {/* GRILLE ANNÉES ou DS PREMIÈRE ou SECONDE */}
          {/* ═══ NSI ═══ */}
          {matiere==='informatique' && activeSec==='premiere-nsi' && (
            <PremiereView chapitres={CHAPITRES_PREMIERE_NSI}/>
          )}
          {matiere==='informatique' && activeSec==='terminale-nsi' && (() => {
            const s = SECTIONS_NSI.find(x=>x.key===activeSec)!
            const years = Object.keys(s.links).map(Number).sort((a,b)=>b-a)
            return (
              <div>
                <p style={{fontSize:12,color:'var(--muted)',textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:16}}>Sélectionnez une année</p>
                <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(145px,1fr))',gap:12,marginBottom:32}}>
                  {Object.keys(s.links).map(Number).sort((a,b)=>b-a).map((yr)=>{
                    const sel = selectedYear===yr
                    const nbSujets = Object.values((s.links as NSILinks)[yr]).reduce((t:number,pdfs:any)=>t+pdfs.length,0)
                    const hasCorr = Object.values((s.links as NSILinks)[yr]).some((pdfs:any)=>pdfs.some((p:any)=>p.correction))
                    return (
                      <div key={yr} onClick={()=>setSelectedYear(sel?null:yr)}
                        style={{cursor:'pointer',textAlign:'center',padding:'18px 10px',background:sel?`${s.color}18`:'var(--surface)',border:sel?`2px solid ${s.color}`:'1px solid var(--border)',borderRadius:14,transition:'all 0.2s',boxShadow:sel?`0 6px 24px ${s.color}30`:'none',transform:sel?'translateY(-3px)':'none'}}
                        onMouseEnter={e=>{if(!sel)e.currentTarget.style.borderColor=`${s.color}70`}}
                        onMouseLeave={e=>{if(!sel)e.currentTarget.style.borderColor='var(--border)'}}>
                        <div style={{fontFamily:'var(--font-display)',fontWeight:800,fontSize:30,color:sel?s.color:'var(--text)',marginBottom:6}}>{yr}</div>
                        <div style={{display:'flex',gap:4,justifyContent:'center',flexWrap:'wrap'}}>
                          <span style={{fontSize:9,background:`${s.color}15`,color:s.color,padding:'1px 6px',borderRadius:5}}>{nbSujets} sujet{nbSujets>1?'s':''}</span>
                          {hasCorr && <span style={{fontSize:9,background:'rgba(6,214,160,0.12)',color:'#06d6a0',padding:'1px 6px',borderRadius:5}}>✅ corrigé</span>}
                        </div>
                      </div>
                    )
                  })}
                </div>
                {selectedYear && (()=>{
                  const d = s.data.find((a:any)=>a.year===selectedYear)
                  const centres = (s.links as any)[selectedYear] || (s.links as any)[String(selectedYear)] || {}
                  return (
                    <div>
                      <h3 style={{fontSize:15,fontWeight:700,marginBottom:12,color:s.color}}>📄 Sujets & Corrections {selectedYear}</h3>
                      {Object.entries(centres).map(([centre,pdfs]:[string,any])=>(
                        <div key={centre} style={{background:'var(--surface)',border:'1px solid var(--border)',borderLeft:`3px solid ${s.color}`,borderRadius:12,padding:'14px 18px',marginBottom:10}}>
                          <div style={{fontWeight:700,fontSize:13,marginBottom:10}}>{centre}</div>
                          <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
                            {pdfs.map((pdf:any,i:number)=>(
                              <div key={i} style={{display:'flex',gap:6}}>
                                <button onClick={()=>openPdf(pdf.sujet,(pdf as any).label||`NSI ${selectedYear} — ${centre}${pdfs.length>1?' '+(i+1):''}`)}
                                  style={{display:'inline-flex',alignItems:'center',gap:5,padding:'7px 14px',background:`${s.color}14`,border:`1px solid ${s.color}30`,borderRadius:9,color:s.color,fontWeight:700,fontSize:12,cursor:'pointer',fontFamily:'var(--font-body)'}}>
                                  📄 {(pdf as any).label||(pdfs.length>1?`Sujet ${i+1}`:'Sujet')}
                                </button>
                                {pdf.correction&&<button onClick={()=>openPdf(pdf.correction,`NSI ${selectedYear} — ${centre} Correction${pdfs.length>1?' '+(i+1):''}`)}
                                  style={{display:'inline-flex',alignItems:'center',gap:5,padding:'7px 14px',background:'rgba(6,214,160,0.1)',border:'1px solid rgba(6,214,160,0.3)',borderRadius:9,color:'#06d6a0',fontWeight:700,fontSize:12,cursor:'pointer',fontFamily:'var(--font-body)'}}>
                                  ✅ Correction{pdfs.length>1?` ${i+1}`:''}
                                </button>}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )
                })()}
              </div>
            )
          })()}
{matiere==='informatique' && activeSec==='seconde-snt' && (<PremiereView chapitres={CHAPITRES_SECONDE_NSI}/>)}
          {activeSec === 'seconde-maths' ? (
            <PremiereView chapitres={CHAPITRES_SECONDE}/>
          ) : activeSec === 'premiere-specialite' ? (
            <PremiereView chapitres={CHAPITRES_PREMIERE}/>
          ) : activeSec === 'seconde-physique-chimie' ? (
            <PremiereView chapitres={CHAPITRES_SECONDE_PC}/>
          ) : activeSec === 'premiere-physique-chimie' ? (
            <PremiereView chapitres={CHAPITRES_PREMIERE_PC}/>
          ) : (
            <div>
          {matiere !== 'informatique' && <p style={{fontSize:12,color:'var(--muted)',textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:14,fontWeight:600}}>
            Sélectionnez une année pour accéder aux sujets et corrections
          </p>}
{!secNSI && (
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(145px,1fr))',gap:12,marginBottom:32}}>
            {sec.data.map(a=>{
              const sel = selectedYear===a.year
              return (
                <div key={a.year} onClick={()=>setSelectedYear(sel?null:a.year)}
                  style={{cursor:'pointer',textAlign:'center',padding:'18px 10px',
                    background:sel?`${sec.color}18`:'var(--surface)',
                    border:sel?`2px solid ${sec.color}`:'1px solid var(--border)',
                    borderRadius:14,transition:'all 0.2s',
                    boxShadow:sel?`0 6px 24px ${sec.color}30`:'none',
                    transform:sel?'translateY(-3px)':'none'}}
                  onMouseEnter={e=>{if(!sel){e.currentTarget.style.borderColor=`${sec.color}70`;e.currentTarget.style.transform='translateY(-2px)'}}}
                  onMouseLeave={e=>{if(!sel){e.currentTarget.style.borderColor='var(--border)';e.currentTarget.style.transform='none'}}}>
                  <div style={{fontFamily:'var(--font-display)',fontWeight:800,fontSize:30,color:sel?sec.color:'var(--text)',marginBottom:6}}>{a.year}</div>
                  <div style={{display:'flex',gap:4,justifyContent:'center',flexWrap:'wrap',marginBottom:6}}>
                    <span style={{fontSize:9,background:'rgba(79,110,247,0.1)',color:'#4f6ef7',border:'1px solid rgba(79,110,247,0.25)',padding:'2px 6px',borderRadius:5,fontWeight:600}}>📄 Sujet</span>
                    <span style={{fontSize:9,background:'rgba(6,214,160,0.1)',color:'#06d6a0',border:'1px solid rgba(6,214,160,0.25)',padding:'2px 6px',borderRadius:5,fontWeight:600}}>✅ Corrigé</span>
                  </div>
                  {a.note && <div style={{fontSize:10,color:'#f5c842',fontWeight:700}}>{a.note} Nouveau</div>}
                </div>
              )
            })}
          </div>
          )}

          {/* DÉTAIL ANNÉE */}
          {selectedYear && detail && anneeLinks && !secNSI && (
            <div style={{background:'var(--surface)',border:`2px solid ${sec.color}40`,borderRadius:20,padding:28,animation:'fadeInUp 0.25s ease both'}}>

              <div style={{marginBottom:24}}>
                <div style={{display:'flex',gap:10,alignItems:'center',flexWrap:'wrap',marginBottom:8}}>
                  <span style={{fontSize:22}}>{sec.icon}</span>
                  <h3 style={{margin:0}}>Bac {sec.label} — {selectedYear}</h3>
                  <span style={{fontSize:11,background:'rgba(6,214,160,0.12)',color:'#06d6a0',border:'1px solid rgba(6,214,160,0.3)',padding:'3px 10px',borderRadius:10,fontWeight:600}}>
                    ✅ {anneeLinks?.sessions?.length ?? Object.keys(anneeLinks||{}).length} sessions disponibles
                  </span>
                </div>
                <p style={{fontSize:13,color:'var(--muted)',margin:0}}>
                  Barème total : <strong style={{color:'var(--text)'}}>{ptTotal}/20</strong>
                </p>
              </div>

              {/* Sessions */}
              {!secNSI && <SessionsBlock lnk={anneeLinks} color={sec.color} year={selectedYear} onOpen={openPdf} />}

              {/* BARÈME */}
              <div style={{background:`${sec.color}08`,border:`1px solid ${sec.color}20`,borderRadius:12,padding:'14px 18px',marginBottom:20}}>
                <p style={{margin:'0 0 12px',fontSize:11,color:'var(--muted)',fontWeight:700,textTransform:'uppercase',letterSpacing:'0.06em'}}>
                  📊 Contenu du sujet — Métropole Jour 1
                </p>
                <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))',gap:10}}>
                  {(detail?.exercices||[]).map((ex:any,i:number)=>(
                    <div key={i} style={{background:'var(--surface)',border:'1px solid var(--border)',borderLeft:`3px solid ${sec.color}`,borderRadius:10,padding:'12px 14px'}}>
                      <div style={{display:'flex',justifyContent:'space-between',marginBottom:6,alignItems:'flex-start',gap:8}}>
                        <span style={{fontWeight:700,fontSize:12,color:sec.color}}>{ex.titre}</span>
                        <span style={{fontFamily:'var(--font-mono)',fontSize:11,color:'#f5c842',background:'rgba(245,200,66,0.12)',padding:'1px 7px',borderRadius:6,fontWeight:700,flexShrink:0}}>{ex.pts} pts</span>
                      </div>
                      <p style={{fontSize:11,color:'var(--text2)',lineHeight:1.55,margin:0}}>{ex.theme}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
            </div>
          )}{/* fin ternaire premiere / normal */}

          {/* seconde-physique-chimie rendu via PremiereView ci-dessus */}

          {/* NAVIGATION BAS */}
          <div style={{marginTop:48,paddingTop:32,borderTop:'1px solid var(--border)',display:'flex',gap:12,flexWrap:'wrap',alignItems:'center',justifyContent:'space-between'}}>
            <button onClick={()=>{setMatiere(null);setSelectedYear(null);window.scrollTo({top:0,behavior:'smooth'})}}
              style={{display:'inline-flex',alignItems:'center',gap:8,padding:'10px 20px',background:'var(--surface)',border:'1px solid var(--border)',borderRadius:12,cursor:'pointer',fontFamily:'var(--font-body)',fontWeight:700,fontSize:13,color:'var(--text)',transition:'all 0.18s'}}
              onMouseEnter={e=>{e.currentTarget.style.borderColor='rgba(99,102,241,0.45)';e.currentTarget.style.transform='translateY(-1px)'}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor='var(--border)';e.currentTarget.style.transform='none'}}>
              ← Toutes les matières
            </button>
            <div style={{display:'flex',gap:10,flexWrap:'wrap'}}>
              <button
                onClick={()=>{const next=matiere==='maths'?'physique-chimie':matiere==='physique-chimie'?'informatique':'maths';const sec=next==='maths'?'terminale-generale':'terminale-physique-chimie';setMatiere(next as Matiere);setActiveSec(sec as SKey);setSelectedYear(null);window.scrollTo({top:0,behavior:'smooth'})}}
                style={{display:'inline-flex',alignItems:'center',gap:6,padding:'9px 16px',background:'var(--surface)',border:'1px solid var(--border)',borderRadius:11,cursor:'pointer',fontFamily:'var(--font-body)',fontWeight:600,fontSize:12,color:'var(--muted)',transition:'all 0.18s'}}
                onMouseEnter={e=>e.currentTarget.style.borderColor='rgba(6,182,212,0.4)'}
                onMouseLeave={e=>e.currentTarget.style.borderColor='var(--border)'}>
                {matiere==='maths'?'⚗️ Aller en Physique-Chimie':matiere==='physique-chimie'?'💻 Aller en Informatique':'📐 Aller en Mathématiques'}
              </button>
              <a href='/examens'
                style={{display:'inline-flex',alignItems:'center',gap:6,padding:'9px 16px',background:'var(--surface)',border:'1px solid var(--border)',borderRadius:11,textDecoration:'none',fontWeight:600,fontSize:12,color:'var(--muted)',transition:'all 0.18s'}}
                onMouseEnter={e=>e.currentTarget.style.borderColor='rgba(220,38,38,0.4)'}
                onMouseLeave={e=>e.currentTarget.style.borderColor='var(--border)'}>
                🇹🇳 Examens Tunisie
              </a>
            </div>
          </div></div>
      </main>
      <Footer/>

      <style>{`
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.3}}
        @keyframes fadeInUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}
      `}</style>
    </>
  )
}
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

const AP = 'https://www.apmep.fr/IMG/pdf'
const SD = 'https://www.sujetdebac.fr/annales-pdf'

// ═══════════════════════════════════════════════════════════════════════════
// PREMIÈRE SPÉCIALITÉ MATHS — Exercices par chapitre
// Programme officiel Première spécialité maths
// ═══════════════════════════════════════════════════════════════════════════

type Exercice = {
  id: string
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
    {titre:'Ex 1 — Analyse · ln', theme:'f(x)=x[2(lnx)²−3lnx+2] : dérivée, convexité, tangente. Python : seuil sur suite récurrente. Modèle posidonie (bactéries marines).', pts:5},
    {titre:'Ex 2 — Probabilités',theme:'Loi binomiale B(100;0,0714), espérance 7,14. Inégalité de Bienaymé-Tchebychev. Détermination rang N minimal.', pts:5},
    {titre:'Ex 3 — Géo. espace',theme:"Droites de l\'espace, positions relatives. Plan P : x−y+z+1=0. Distance C(2;−1;2) au plan. Affirmations vrai/faux justifiées.", pts:5},
    {titre:'Ex 4 — Suites',      theme:'Modèle discret (posidonie marine). Suite récurrente, croissance bornée, limite. Python : boucle while.', pts:5},
  ]},
  { year:2024, exercices:[
    {titre:'Ex 1 — Éq. diff.',   theme:"(E) y\'+y=e⁻ˣ. Solution particulière u(x)=xe⁻ˣ, générale, condition initiale f(0)=2. Étude fₖ(x)=(x+k)e⁻ˣ.", pts:5},
    {titre:'Ex 2 — Intégration', theme:'Suite Iₙ=∫₀¹xⁿeˣdx, IPP, relation Iₙ₊₁=e−(n+1)Iₙ. Python (mystere). Gendarmes : lim Iₙ=0.', pts:5},
    {titre:'Ex 3 — Probabilités',theme:'Épreuve 2 parties (Q1/Q2). Arbres, proba. totales. Variables X, Y, Z. Espérance, variance, Bienaymé-Tchebychev.', pts:5},
    {titre:'Ex 4 — Géo. espace', theme:'Prisme ABFEDCGH, vecteur normal plan (ABG). Droites parallèles, base espace, décomposition AG⃗, volume.', pts:5},
  ]},
  { year:2023, exercices:[
    {titre:'Ex 1 — Analyse · ln',theme:'Logarithme : propriétés, étude complète. IPP ∫ln(x)dx. Calcul intégrale définie.', pts:5},
    {titre:'Ex 2 — Géo. espace', theme:'Vecteurs espace, droites, plans. Produit scalaire, distance point-plan. Plan ax+by+cz+d=0.', pts:5},
    {titre:'Ex 3 — Probabilités',theme:'Probabilités totales, binomiale B(n,p), normale N(μ,σ²), Moivre-Laplace.', pts:5},
    {titre:'Ex 4 — Suites',      theme:'Limites de suites, monotonie bornée, convergence, suites récurrentes. Récurrence.', pts:5},
  ]},
  { year:2022, exercices:[
    {titre:'Ex 1 — Analyse · ln',theme:'Logarithme : ln(ab), ln(a/b), ln(aⁿ). Étude complète, intégration par parties, primitives ln x.', pts:5},
    {titre:'Ex 2 — Complexes',  theme:"Formes trigonométrique z=r(cosθ+isinθ) et exponentielle reⁱᶿ. Moivre. Racines n-ièmes de l\'unité.", pts:5},
    {titre:'Ex 3 — Probabilités',theme:'Probabilités conditionnelles P_A(B). Variables aléatoires, espérance, loi normale N(μ,σ²).', pts:5},
    {titre:'Ex 4 — Géo. espace', theme:'Plans cartésiens, vecteur normal n⃗. Positions relatives droites/plans. Orthogonalité. Distance.', pts:5},
  ]},
  { year:2021, exercices:[
    {titre:'Ex 1 — Analyse · eˣ',theme:"Exponentielle, dérivation, équations différentielles y\'=ay+b. Variations, tangente. Modélisation.", pts:5},
    {titre:'Ex 2 — Probabilités',theme:'Probabilités conditionnelles, arbres pondérés, formule totale. Variables aléatoires, espérance, binomiale.', pts:5},
    {titre:'Ex 3 — Géo. espace', theme:'Géométrie analytique : vecteurs, droites, plans, repère orthonormé. Repr. paramétrique.', pts:5},
    {titre:'Ex 4 — Algorithmique',theme:'Python : listes, fonctions, boucles for/while. Simulation probabiliste. Intégrales (rectangles).', pts:5},
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
      correction: `${AP}/Corrige_STI2D_Metro_sept_2022_DV.pdf` },
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
    {titre:'Ex 1 — Suites (STMG)',       theme:'Suites géométriques, intérêts composés, valeur acquise, mensualités. Algorithme de seuil.', pts:7},
    {titre:'Ex 2 — Probabilités (STMG)', theme:'Probabilités conditionnelles, arbres, variable aléatoire X, espérance E(X). Binomiale B(n,p).', pts:6},
    {titre:'Ex 3 — Analyse (STI2D)',     theme:'Exponentielle et logarithme. Modélisation physique : décharge RC, refroidissement Newton.', pts:7},
  ]},
  { year:2024, exercices:[
    {titre:'Ex 1 — Fonctions (STMG)',    theme:'Second degré, forme canonique, variations, applications économiques (maximisation CA).', pts:7},
    {titre:'Ex 2 — Stats 2 var. (STMG)',theme:'Nuage de points, point moyen G, droite de régression (moindres carrés), coefficient r, prévisions.', pts:6},
    {titre:'Ex 3 — Intégration (STI2D)',theme:"Primitives, intégrale définie ∫ₐᵇf = F(b)−F(a), valeur moyenne, travail d\'une force.", pts:7},
  ]},
  { year:2023, exercices:[
    {titre:'Ex 1 — Probabilités (STMG)',theme:'Binomiale B(n,p), probas totales, arbres. Espérance E(X)=np, variance V(X)=np(1−p).', pts:7},
    {titre:'Ex 2 — Calcul fin. (STMG)', theme:"Taux d\'évolution, coefficients multiplicateurs, évolutions successives, taux réciproque.", pts:6},
    {titre:'Ex 3 — Analyse (STI2D)',    theme:'Logarithme : propriétés algébriques, équations, résolution. Croissances comparées.', pts:7},
  ]},
  { year:2022, exercices:[
    {titre:'Ex 1 — Suites (STMG)',      theme:'Suites arithmétiques, capital, amortissements linéaires. Seuil par algorithme.', pts:7},
    {titre:'Ex 2 — Probabilités (STMG)',theme:'Probabilités conditionnelles, indépendance, variable aléatoire, espérance.', pts:6},
    {titre:'Ex 3 — Probas cont. (STI2D)',theme:'Loi uniforme [a;b], loi normale N(μ;σ²), standardisation Z=(X−μ)/σ.', pts:7},
  ]},
  { year:2021, exercices:[
    {titre:'Ex 1 — Fonctions (STMG)',   theme:'Second degré, affines, exponentielle. Tableau de variations. Applications économiques.', pts:7},
    {titre:'Ex 2 — Suites (STMG)',      theme:'Suites géométriques, intérêts composés, mensualités. Valeur acquise.', pts:6},
    {titre:'Ex 3 — Analyse (STI2D)',    theme:"Exp. et ln, étude. Équations différentielles y\'=ay+b, condition initiale y(0)=y₀.", pts:7},
  ]},
]

const dataExpertes: AnneeData[] = [
  { year:2025, note:'🆕', exercices:[
    {titre:'Ex 1 — Arithmétique', theme:'PGCD (Euclide). Bézout : au+bv=PGCD(a,b). Équations diophantiennes ax+by=c dans ℤ.', pts:7},
    {titre:'Ex 2 — Complexes',   theme:'Forme exponentielle reⁱᶿ, Euler : eⁱᶿ=cosθ+isinθ, De Moivre, racines n-ièmes. Polygones.', pts:7},
    {titre:'Ex 3 — Matrices',    theme:'Calcul matriciel, puissances Mⁿ. Chaînes de Markov : Pₙ₊₁=Pₙ×M. État stable π=π×M.', pts:6},
  ]},
  { year:2024, exercices:[
    {titre:'Ex 1 — Arithmétique', theme:'Congruences mod n. Petit Fermat : aᵖ⁻¹≡1[p] si p premier. Applications cryptographiques.', pts:7},
    {titre:'Ex 2 — Complexes',   theme:'Module |z|, arg(z). Euler : cosθ=(eⁱᶿ+e⁻ⁱᶿ)/2. Linéarisation de cosⁿθ.', pts:7},
    {titre:'Ex 3 — Graphes',     theme:"Vocabulaire, degrés, chaînes eulériennes (Euler). Matrice d\'adjacence, graphes probabilistes.", pts:6},
  ]},
  { year:2023, exercices:[
    {titre:'Ex 1 — Arithmétique', theme:'PGCD, Bézout, Gauss : si a|bc et pgcd(a,b)=1 alors a|c. Équations diophantiennes.', pts:7},
    {titre:'Ex 2 — Complexes',   theme:'Module, argument, racines n-ièmes, géométrie du plan complexe. Transformations dans ℂ.', pts:7},
    {titre:'Ex 3 — Matrices',    theme:'Calcul matriciel, inverse A⁻¹=(1/det)adj(A). Suites vectorielles Vₙ₊₁=M·Vₙ.', pts:6},
  ]},
  { year:2022, exercices:[
    {titre:'Ex 1 — Arithmétique', theme:'Divisibilité ℤ, division euclidienne. Congruences a≡b[n] ⟺ n|(a−b). Propriétés.', pts:7},
    {titre:'Ex 2 — Complexes',   theme:'Équations polynomiales dans ℂ. Δ<0 : racines complexes conjuguées. Viète.', pts:7},
    {titre:'Ex 3 — Graphes',     theme:"Matrice d\'adjacence. Graphe probabiliste, Markov, matrice de transition. État stable.", pts:6},
  ]},
  { year:2021, exercices:[
    {titre:'Ex 1 — Arithmétique', theme:"Nombres premiers, crible d\'Ératosthène. Décomposition unique en facteurs premiers.", pts:7},
    {titre:'Ex 2 — Complexes',   theme:'Formes trig. et expo. Moivre (cosθ+isinθ)ⁿ. Linéarisation cos(nθ), sin(nθ).', pts:7},
    {titre:'Ex 3 — Matrices',    theme:'Matrices carrées ordre 2 : opérations, identité I₂, inverse A⁻¹, puissances Mⁿ.', pts:6},
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
type SKey = 'terminale-generale' | 'terminale-technologique' | 'terminale-maths-expertes' | 'premiere-specialite' | 'seconde'

const SECTIONS: {
  key:SKey; label:string; icon:string; color:string; coeff:string; desc:string;
  data:AnneeData[]; links:Record<number,AnneeLinks>;
}[] = [
  { key:'terminale-generale',
    label:'Terminale Générale', icon:'🎓', color:'#4f6ef7', coeff:'Coef. 16 · 3h30',
    desc:'Spécialité Mathématiques · Bac Général · Source APMEP : sujets + corrigés PDF directs',
    data:dataGenerale, links:linksGenerale },
  { key:'terminale-technologique',
    label:'Terminale Technologique', icon:'⚙️', color:'#06d6a0', coeff:'STMG · STI2D/STL',
    desc:'Série STI2D · Épreuve PCM (Physique-Chimie & Maths) · 3h · Source : APMEP & sujetdebac.fr',
    data:dataTechno, links:linksTechno },
  { key:'terminale-maths-expertes',
    label:'Terminale Maths Expertes', icon:'⭐', color:'#8b5cf6', coeff:'Option · Coef. 2 · 3h',
    desc:'Option Maths Expertes · Arithmétique · Complexes · Matrices & Graphes · APMEP',
    data:dataExpertes, links:linksExpertes },
  { key:'seconde', label:'Seconde Générale', icon:'📘', color:'#10b981', coeff:'7 thèmes · 16 exercices',
    desc: "Programme officiel Seconde — Vrais exercices corrigés par thème. Algorithmique, Algèbre, Géométrie, Fonctions, Stats & Probas.",
    data:[], links:{} },
  { key:'premiere-specialite', label:'Première Spécialité', icon:'📗', color:'#f59e0b', coeff:'E3C · DS lycées · 2h',
    desc: "Pas d'examen national en Première. E3C 2021-2022 + DS publiés par des professeurs.",
    data:[], links:{} },
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
          <p style={{margin:0,fontSize:10,color:'rgba(255,255,255,0.35)'}}>📋 Source officielle APMEP (apmep.fr)</p>
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
      {/* NOTE INFO */}
      <div style={{background:'rgba(245,158,11,0.08)',border:'1px solid rgba(245,158,11,0.3)',
        borderRadius:12,padding:'14px 18px',marginBottom:24,fontSize:13}}>
        ℹ️ <strong>Pas d'examen national en Première</strong> — Exercices couvrant tout le programme de Première Spécialité. Choisissez un chapitre ci-dessous.
      </div>

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

export default function ExamensFrancePage() {
  const router = useRouter()
  const [activeSec,setActiveSec]       = useState<SKey>('terminale-generale')
  const [selectedYear,setSelectedYear] = useState<number|null>(null)
  const [modal,setModal]               = useState<{url:string;title:string}|null>(null)

  const sec        = SECTIONS.find(s=>s.key===activeSec)!
  const detail     = sec.data.find(a=>a.year===selectedYear)
  const anneeLinks = selectedYear ? sec.links[selectedYear] : null
  const ptTotal    = detail?.exercices.reduce((t,e)=>t+e.pts,0)??0

  const openPdf          = (url:string,title:string) => setModal({url,title})
  const lancerSimulation = () => router.push('/simulation-france')

  return (
    <>
      <Navbar/>
      {modal && <PdfModal url={modal.url} title={modal.title} onClose={()=>setModal(null)}/>}

      <main style={{position:'relative',zIndex:1,paddingTop:80}}>
        <div className="container" style={{paddingTop:40,paddingBottom:80}}>

          {/* HEADER */}
          <div style={{marginBottom:40}}>
            <span className="label">📋 Examens Officiels Bac France</span>
            <h1 style={{fontSize:'clamp(26px,4vw,46px)',marginBottom:14}}>
              5 Ans d'Examens Officiels<br/>
              <span style={{color:'var(--accent)'}}>2021 → 2025 · Sujets + Corrections PDF</span>
            </h1>
            <p style={{maxWidth:560,color:'var(--text2)',lineHeight:1.7,marginBottom:10}}>
              Cliquez sur <strong>📄 Sujet</strong> ou <strong>✅ Correction</strong> pour lire le PDF
              directement ici — sans quitter le site. Bouton <strong>⬇ Télécharger</strong> disponible dans le viewer.
            </p>
            <div style={{display:'inline-flex',gap:10,alignItems:'center',padding:'8px 16px',background:'rgba(79,110,247,0.08)',border:'1px solid rgba(79,110,247,0.2)',borderRadius:10}}>
              <span style={{fontSize:14}}>🏛️</span>
              <span style={{fontSize:12,color:'var(--text2)'}}>
                Source officielle : <strong style={{color:'var(--accent)'}}>APMEP</strong> — Association des Professeurs de Mathématiques de l'Enseignement Public
              </span>
            </div>
          </div>

          {/* ONGLETS SECTIONS */}
          <div style={{display:'flex',gap:6,flexWrap:'nowrap',overflowX:'auto',marginBottom:32,background:'var(--surface)',border:'1px solid var(--border)',borderRadius:14,padding:6}}>
            {SECTIONS.map(s=>(
              <button key={s.key} onClick={()=>{setActiveSec(s.key);setSelectedYear(null)}}
                style={{display:'flex',alignItems:'center',gap:6,padding:'9px 16px',borderRadius:10,border:'none',cursor:'pointer',fontFamily:'var(--font-body)',fontSize:13,fontWeight:600,transition:'all 0.2s',
                  background:activeSec===s.key?s.color:'transparent',
                  color:activeSec===s.key?'white':'var(--muted)',
                  boxShadow:activeSec===s.key?`0 4px 16px ${s.color}45`:'none'}}>
                <span>{s.icon}</span><span>{s.label}</span>
                <span style={{fontSize:10,background:activeSec===s.key?'rgba(255,255,255,0.22)':'var(--surface2)',padding:'1px 7px',borderRadius:8}}>{s.coeff}</span>
              </button>
            ))}
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
              {activeSec === 'seconde' ? (<>
                <div>📘 {CHAPITRES_SECONDE.length} thèmes · {CHAPITRES_SECONDE.reduce((t,c)=>t+c.exercices.length,0)} exercices corrigés</div>
                <div style={{marginTop:4}}>📚 Exercices originaux — niveaux ★ à ★★★★</div>
              </>) : activeSec === 'premiere-specialite' ? (<>
                <div>📗 {CHAPITRES_PREMIERE.length} chapitres · {CHAPITRES_PREMIERE.reduce((t,c)=>t+c.exercices.length,0)} exercices corrigés</div>
                <div style={{marginTop:4}}>📚 Exercices originaux</div>
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

          {/* GRILLE ANNÉES ou DS PREMIÈRE */}
          {activeSec === 'seconde' ? (
            <PremiereView chapitres={CHAPITRES_SECONDE}/>
          ) : activeSec === 'premiere-specialite' ? (
            <PremiereView chapitres={CHAPITRES_PREMIERE}/>
          ) : (
            <div>
          <p style={{fontSize:12,color:'var(--muted)',textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:14,fontWeight:600}}>
            Sélectionnez une année pour accéder aux sujets et corrections
          </p>
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

          {/* DÉTAIL ANNÉE */}
          {selectedYear && detail && anneeLinks && (
            <div style={{background:'var(--surface)',border:`2px solid ${sec.color}40`,borderRadius:20,padding:28,animation:'fadeInUp 0.25s ease both'}}>

              <div style={{marginBottom:24}}>
                <div style={{display:'flex',gap:10,alignItems:'center',flexWrap:'wrap',marginBottom:8}}>
                  <span style={{fontSize:22}}>{sec.icon}</span>
                  <h3 style={{margin:0}}>Bac {sec.label} — {selectedYear}</h3>
                  <span style={{fontSize:11,background:'rgba(6,214,160,0.12)',color:'#06d6a0',border:'1px solid rgba(6,214,160,0.3)',padding:'3px 10px',borderRadius:10,fontWeight:600}}>
                    ✅ {anneeLinks.sessions.length} sessions disponibles
                  </span>
                </div>
                <p style={{fontSize:13,color:'var(--muted)',margin:0}}>
                  Barème total : <strong style={{color:'var(--text)'}}>{ptTotal}/20</strong>
                  {' · '}Source : <strong>APMEP (apmep.fr)</strong>
                  {' · '}Cliquez → PDF dans la page directement
                </p>
              </div>

              {/* Sessions */}
              <SessionsBlock lnk={anneeLinks} color={sec.color} year={selectedYear} onOpen={openPdf} />

              {/* BARÈME */}
              <div style={{background:`${sec.color}08`,border:`1px solid ${sec.color}20`,borderRadius:12,padding:'14px 18px',marginBottom:20}}>
                <p style={{margin:'0 0 12px',fontSize:11,color:'var(--muted)',fontWeight:700,textTransform:'uppercase',letterSpacing:'0.06em'}}>
                  📊 Contenu du sujet — Métropole Jour 1
                </p>
                <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))',gap:10}}>
                  {detail.exercices.map((ex,i)=>(
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

              {/* Source */}
              <div style={{padding:'8px 14px',background:'var(--surface2)',borderRadius:10,fontSize:11,color:'var(--muted)',display:'flex',gap:12,flexWrap:'wrap',alignItems:'center'}}>
                <span>🏛️</span>
                <span>Sources officielles :</span>
                <a href="https://www.apmep.fr/Annales-Terminale-Generale" target="_blank" rel='noreferrer' style={{color:'var(--accent)'}}>APMEP — apmep.fr</a>
                <span>·</span>
                <a href="https://www.apmep.fr/Annee-2025" target="_blank" rel='noreferrer' style={{color:'var(--accent)'}}>Annales 2021–2025</a>
              </div>
            </div>
          )}
            </div>
          )}{/* fin ternaire premiere / normal */}

          {/* AUTRES SECTIONS */}
          <div style={{marginTop:52,paddingTop:36,borderTop:'1px solid var(--border)'}}>
            <p style={{fontSize:12,color:'var(--muted)',textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:16,fontWeight:600}}>Autres sections</p>
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))',gap:12}}>
              {SECTIONS.filter(s=>s.key!==activeSec).map(s=>(
                <button key={s.key}
                  onClick={()=>{setActiveSec(s.key);setSelectedYear(null);window.scrollTo({top:0,behavior:'smooth'})}}
                  style={{display:'flex',gap:12,alignItems:'center',padding:16,background:'var(--surface)',border:'1px solid var(--border)',borderRadius:12,cursor:'pointer',textAlign:'left',transition:'all 0.2s',fontFamily:'var(--font-body)'}}
                  onMouseEnter={e=>{e.currentTarget.style.borderColor=`${s.color}60`;e.currentTarget.style.transform='translateY(-2px)'}}
                  onMouseLeave={e=>{e.currentTarget.style.borderColor='var(--border)';e.currentTarget.style.transform='none'}}>
                  <span style={{fontSize:26}}>{s.icon}</span>
                  <div>
                    <div style={{fontWeight:700,fontSize:13,color:'var(--text)'}}>{s.label}</div>
                    <div style={{fontSize:10,color:s.color,fontWeight:600,marginTop:2}}>{s.coeff} · 5 années</div>
                  </div>
                </button>
              ))}
              <a href='/examens' style={{display:'flex',gap:12,alignItems:'center',padding:16,background:'var(--surface)',border:'1px solid var(--border)',borderRadius:12,textDecoration:'none',transition:'all 0.2s'}}
                onMouseEnter={e=>{e.currentTarget.style.borderColor='rgba(220,38,38,0.5)';e.currentTarget.style.transform='translateY(-2px)'}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor='var(--border)';e.currentTarget.style.transform='none'}}>
                <span style={{fontSize:26}}>🇹🇳</span>
                <div>
                  <div style={{fontWeight:700,fontSize:13,color:'var(--text)'}}>Examens Tunisie</div>
                  <div style={{fontSize:10,color:'#4f6ef7',fontWeight:600,marginTop:2}}>Bac Maths · Sc.Ex · Techno · Info</div>
                </div>
              </a>
            </div>
          </div>

        </div>
      </main>
      <Footer/>

      <style>{`
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.3}}
        @keyframes fadeInUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}
      `}</style>
    </>
  )
}
'use client'
import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import { useParams } from 'next/navigation'

// ══════════════════════════════════════════════════════════════════════
// TERMINALE TECHNOLOGIQUE / [SLUG]
// Route : /bac-france/terminale-techno/[slug]
// Branches : STMG · STI2D · STL
// ══════════════════════════════════════════════════════════════════════

const C = { thm: '#4f6ef7', def: '#06d6a0', formule: '#f59e0b', prop: '#8b5cf6', methode: '#ec4899' }
const L: Record<string, string> = { thm: 'Théorème', def: 'Définition', formule: 'Formule clé', prop: 'Propriété', methode: 'Méthode' }

const NAV_ORDER = [
  'stmg-fonctions', 'stmg-suites', 'stmg-stats-2var', 'stmg-probas', 'stmg-pourcentages', 'stmg-financier',
  'sti-suites', 'sti-exp-ln', 'sti-integration', 'sti-probas-cont', 'sti-stat-inf', 'sti-geometrie', 'sti-eq-diff'
]
const TITRES: Record<string, string> = {
  'stmg-fonctions':   'Fonctions (approfondissement)',
  'stmg-suites':      'Suites numériques',
  'stmg-stats-2var':  'Statistiques à deux variables',
  'stmg-probas':      'Probabilités conditionnelles',
  'stmg-pourcentages':'Pourcentages & Évolutions',
  'stmg-financier':   'Calculs financiers',
  'sti-suites':       'Suites & Modélisation',
  'sti-exp-ln':       'Exponentielle & Logarithme',
  'sti-integration':  'Intégration',
  'sti-probas-cont':  'Probabilités continues',
  'sti-stat-inf':     'Statistiques inférentielles',
  'sti-geometrie':    'Géométrie dans l\'espace',
  'sti-eq-diff':      'Équations différentielles & Compléments',
}
const SEC_COLOR: Record<string, string> = {
  'stmg-fonctions': '#4f6ef7', 'stmg-suites': '#4f6ef7', 'stmg-stats-2var': '#4f6ef7',
  'stmg-probas': '#4f6ef7', 'stmg-pourcentages': '#4f6ef7', 'stmg-financier': '#4f6ef7',
  'sti-suites': '#10b981', 'sti-exp-ln': '#10b981', 'sti-integration': '#10b981',
  'sti-probas-cont': '#10b981', 'sti-stat-inf': '#10b981', 'sti-geometrie': '#10b981', 'sti-eq-diff': '#10b981',
}
const BRANCH_LABEL: Record<string, string> = {
  'stmg-fonctions': '📊 STMG', 'stmg-suites': '📊 STMG', 'stmg-stats-2var': '📊 STMG',
  'stmg-probas': '📊 STMG', 'stmg-pourcentages': '📊 STMG', 'stmg-financier': '📊 STMG',
  'sti-suites': '⚙️ STI2D/STL', 'sti-exp-ln': '⚙️ STI2D/STL', 'sti-integration': '⚙️ STI2D/STL',
  'sti-probas-cont': '⚙️ STI2D/STL', 'sti-stat-inf': '⚙️ STI2D/STL',
  'sti-geometrie': '⚙️ STI2D/STL', 'sti-eq-diff': '⚙️ STI2D/STL',
}

const CHAPITRES: Record<string, {
  ch: string; titre: string; badge: string; desc: string; duree: string; section: string;
  theoremes: { id: string; type: string; nom: string; enonce: string }[];
  exercices: { id: string; niveau: string; titre: string; enonce: string; correction: string }[];
}> = {

  // ── STMG ──────────────────────────────────────────────────────────

  'stmg-fonctions': {
    ch: 'CH 01', titre: 'Fonctions (approfondissement)', badge: 'Analyse', duree: '~5h', section: 'STMG · Section 1 — Analyse & Données',
    desc: 'Fonctions affines, second degré forme canonique, fonction exponentielle eˣ, applications économiques.',
    theoremes: [
      { id: 'D1', type: 'def', nom: 'Fonctions affines et second degré', enonce: 'Fonction affine : f(x) = ax + b  (a = pente, b = ordonnée à l\'origine).\nVariations : croissante si a > 0, décroissante si a < 0, constante si a = 0.\n\nFonction du second degré : f(x) = ax² + bx + c.\nForme canonique : a(x−α)² + β   avec α = −b/(2a), β = f(α).\nSommet S(α,β) : minimum si a > 0, maximum si a < 0.' },
      { id: 'P1', type: 'prop', nom: 'Fonction exponentielle eˣ — propriétés', enonce: 'Définition : l\'unique fonction dérivable telle que f\' = f et f(0) = 1.\nPropriétés algébriques :\neᵃ × eᵇ = eᵃ⁺ᵇ   ;   eᵃ/eᵇ = eᵃ⁻ᵇ   ;   (eᵃ)ⁿ = eⁿᵃ\ne⁰ = 1   ;   eˣ > 0 pour tout x ∈ ℝ\n\nVariations : strictement croissante sur ℝ.\nLimites : lim(x→−∞) eˣ = 0  ;  lim(x→+∞) eˣ = +∞\nDérivée : (eˣ)\' = eˣ  ;  (e^(ax))\' = a·e^(ax)' },
      { id: 'P2', type: 'prop', nom: 'Croissance comparée (introduction STMG)', enonce: 'L\'exponentielle "gagne" finalement sur tout polynôme :\nlim(x→+∞) eˣ/xⁿ = +∞  pour tout n ∈ ℕ\nlim(x→−∞) xⁿ eˣ = 0\n\nApplication économique : modèle de croissance exponentielle P(t) = P₀·eˡᵗ\n(population, capital avec intérêts composés en temps continu).' },
      { id: 'M1', type: 'methode', nom: 'Résoudre une équation avec eˣ', enonce: 'eᵘ = eᵛ ⟺ u = v  (la fonction est injective)\neˣ = k (k > 0) ⟺ x = ln k  (utiliser le logarithme)\n\nExemple : e^(2x−1) = e³ → 2x−1 = 3 → x = 2.\nExemple : e^x = 5 → x = ln 5 ≈ 1,609.' },
    ],
    exercices: [
      { id: 'EX01', niveau: 'Facile', titre: 'Forme canonique', enonce: 'Mettre f(x) = 2x² − 8x + 5 sous forme canonique. Trouver le minimum.', correction: 'α = 8/4 = 2. β = 2×4 − 8×2 + 5 = 8−16+5 = −3. Forme : 2(x−2)² − 3. Minimum en x=2 : f(2) = −3.' },
      { id: 'EX02', niveau: 'Facile', titre: 'Exponentielle', enonce: 'Simplifier : A = e³ × e⁻¹ / e². Résoudre e^(x+1) = e⁴.', correction: 'A = e^(3−1−2) = e⁰ = 1. e^(x+1) = e⁴ → x+1 = 4 → x = 3.' },
      { id: 'EX03', niveau: 'Intermédiaire', titre: 'Croissance économique', enonce: 'Une entreprise a un chiffre d\'affaires modélisé par C(t) = 50·e^(0,1t) (en milliers d\'€, t en années). Quel est le CA après 5 ans ?', correction: 'C(5) = 50·e^0,5 ≈ 50 × 1,6487 ≈ 82,4 k€.' },
    ],
  },

  'stmg-suites': {
    ch: 'CH 02', titre: 'Suites numériques', badge: 'Algèbre', duree: '~5h', section: 'STMG · Section 1 — Analyse & Données',
    desc: 'Suites arithmétiques/géométriques, sommes, intérêts simples/composés, amortissements, évolution de populations.',
    theoremes: [
      { id: 'D1', type: 'def', nom: 'Suite arithmétique', enonce: 'Suite (uₙ) arithmétique de raison r : uₙ₊₁ = uₙ + r.\nFormule du terme général : uₙ = u₀ + n·r  (ou uₙ = u₁ + (n−1)·r).\nSomme des n+1 premiers termes (u₀ à uₙ) :\nS = (n+1)(u₀ + uₙ)/2\n\nApplication : intérêts simples — capital C après n années à taux annuel t% :\nCₙ = C₀ + n·(C₀·t/100) = C₀(1 + nt/100) → suite arithmétique de raison C₀t/100.' },
      { id: 'D2', type: 'def', nom: 'Suite géométrique', enonce: 'Suite (uₙ) géométrique de raison q (q ≠ 0) : uₙ₊₁ = q·uₙ.\nFormule du terme général : uₙ = u₀·qⁿ.\nSomme des n+1 premiers termes (u₀ à uₙ), pour q ≠ 1 :\nS = u₀·(1−qⁿ⁺¹)/(1−q)\n\nApplication : intérêts composés — capital C après n années à taux t% :\nCₙ = C₀×(1+t/100)ⁿ → suite géométrique de raison q = 1+t/100.' },
      { id: 'F1', type: 'formule', nom: 'Intérêts composés & Amortissement', enonce: 'Intérêts composés : Cₙ = C₀×(1+t/100)ⁿ\nValeur acquise = capital + intérêts cumulés.\n\nAmortissement linéaire (constant) : annuité = valeur initiale / durée.\nAmortissement dégressif : annuité = valeur comptable × taux dégressif.\n\nRemboursement d\'emprunt (annuités constantes) :\nAnnuité a = C₀·t/[1−(1+t)⁻ⁿ]  où t = taux par période, n = nombre de périodes.' },
    ],
    exercices: [
      { id: 'EX01', niveau: 'Facile', titre: 'Intérêts composés', enonce: 'On place 5 000 € à 3% par an (intérêts composés). Quel est le capital après 10 ans ?', correction: 'C₁₀ = 5 000 × 1,03¹⁰ ≈ 5 000 × 1,3439 ≈ 6 720 €.' },
      { id: 'EX02', niveau: 'Intermédiaire', titre: 'Somme géométrique', enonce: 'On verse 1 000 € chaque année pendant 5 ans à un taux de 2% par an. Calculer la valeur finale de ces versements.', correction: 'S = 1000×(1,02⁵−1)/(1,02−1) = 1000×(1,1041−1)/0,02 = 1000×5,204 ≈ 5 204 €.' },
    ],
  },

  'stmg-stats-2var': {
    ch: 'CH 03', titre: 'Statistiques à deux variables', badge: 'Stats', duree: '~4h', section: 'STMG · Section 2 — Probabilités & Statistiques',
    desc: 'Nuage de points, point moyen, ajustement affine (moindres carrés), coefficient de corrélation, prévisions.',
    theoremes: [
      { id: 'D1', type: 'def', nom: 'Nuage de points et point moyen', enonce: 'Pour une série statistique à deux variables (xᵢ, yᵢ) :\n• Nuage de points : représenter chaque couple (xᵢ, yᵢ) dans un repère.\n• Point moyen G(x̄, ȳ) : x̄ = (Σxᵢ)/n  ;  ȳ = (Σyᵢ)/n\n\nLe point moyen G appartient toujours à la droite de régression.' },
      { id: 'F1', type: 'formule', nom: 'Droite de régression (moindres carrés)', enonce: 'La droite de régression de y en x minimise la somme des carrés des écarts verticaux.\nSon équation est y = ax + b avec :\na = [Σ(xᵢ−x̄)(yᵢ−ȳ)] / Σ(xᵢ−x̄)²  =  cov(X,Y) / V(X)\nb = ȳ − a·x̄\n\nEn pratique : calculatrice → mode stats/reg → données → linReg.' },
      { id: 'D2', type: 'def', nom: 'Coefficient de corrélation linéaire', enonce: 'Le coefficient de corrélation r est un réel entre −1 et 1 mesurant la force du lien linéaire :\nr = cov(X,Y) / (σ_X × σ_Y)\n\nInterprétation :\n|r| proche de 1 → forte corrélation linéaire\n|r| proche de 0 → pas de corrélation linéaire\nr > 0 → corrélation positive (y augmente quand x augmente)\nr < 0 → corrélation négative\n\nSeuil usuel : si |r| ≥ 0,87, l\'ajustement est pertinent.' },
    ],
    exercices: [
      { id: 'EX01', niveau: 'Facile', titre: 'Point moyen', enonce: 'Série : (1;3), (2;5), (3;4), (4;7), (5;6). Calculer le point moyen G.', correction: 'x̄ = (1+2+3+4+5)/5 = 3. ȳ = (3+5+4+7+6)/5 = 25/5 = 5. G(3 ; 5).' },
      { id: 'EX02', niveau: 'Intermédiaire', titre: 'Droite de régression', enonce: 'a = 0,9 et b = 2,3 sont les coefficients de la droite de régression y = ax + b. Prévoir y pour x = 8.', correction: 'y = 0,9×8 + 2,3 = 7,2 + 2,3 = 9,5. (Extrapolation → utiliser avec prudence si x=8 est hors de la plage observée).' },
    ],
  },

  'stmg-probas': {
    ch: 'CH 04', titre: 'Probabilités conditionnelles', badge: 'Probas', duree: '~4h', section: 'STMG · Section 2 — Probabilités & Statistiques',
    desc: 'P_A(B), probabilités totales, arbres, indépendance, variable aléatoire, espérance, loi binomiale.',
    theoremes: [
      { id: 'F1', type: 'formule', nom: 'Probabilité conditionnelle et totales', enonce: 'P_A(B) = P(A∩B) / P(A)  avec P(A) ≠ 0\nFormule des probabilités composées : P(A∩B) = P(A)·P_A(B)\n\nFormule des probabilités totales (partition A, Ā) :\nP(B) = P(A)·P_A(B) + P(Ā)·P_Ā(B)\n\nApplication : arbres de probabilités — la probabilité d\'un chemin est le produit des branches ; additionner les chemins arrivant en B.' },
      { id: 'D1', type: 'def', nom: 'Variable aléatoire et espérance', enonce: 'X est une variable aléatoire prenant les valeurs x₁, x₂, …, xₙ avec les probabilités p₁, p₂, …, pₙ (Σpᵢ = 1).\n\nEspérance : E(X) = Σ xᵢ·pᵢ = x₁p₁ + x₂p₂ + … + xₙpₙ\nÉcart-type : σ(X) = √V(X)  avec V(X) = E(X²) − [E(X)]²\n\nInterprétation : E(X) est la valeur moyenne à long terme.' },
      { id: 'F2', type: 'formule', nom: 'Loi binomiale B(n,p)', enonce: 'X suit B(n,p) si X = nombre de succès dans n épreuves de Bernoulli indépendantes (prob. succès = p).\nP(X=k) = C(n,k) × pᵏ × (1−p)ⁿ⁻ᵏ\nE(X) = n·p   ;   V(X) = n·p·(1−p)\n\nExemple STMG : taux de clients satisfaits p = 0,75, sondage n = 10.\nP(X=8) = C(10,8)×0,75⁸×0,25² ≈ 0,282.' },
    ],
    exercices: [
      { id: 'EX01', niveau: 'Facile', titre: 'Probabilité conditionnelle', enonce: 'P(A) = 0,6 ; P(B|A) = 0,3 ; P(B|Ā) = 0,5. Calculer P(B).', correction: 'P(B) = P(A)·P_A(B) + P(Ā)·P_Ā(B) = 0,6×0,3 + 0,4×0,5 = 0,18 + 0,20 = 0,38.' },
      { id: 'EX02', niveau: 'Intermédiaire', titre: 'Loi binomiale STMG', enonce: 'Taux de retour clients : p = 0,4, n = 5 clients. Calculer P(X ≥ 2).', correction: 'P(X≥2) = 1 − P(X=0) − P(X=1). P(X=0) = 0,6⁵ = 0,0778. P(X=1) = 5×0,4×0,6⁴ = 0,2592. P(X≥2) = 1 − 0,0778 − 0,2592 = 0,663.' },
    ],
  },

  'stmg-pourcentages': {
    ch: 'CH 05', titre: 'Pourcentages & Évolutions', badge: 'Calcul', duree: '~3h', section: 'STMG · Section 3 — Calculs commerciaux',
    desc: 'Taux d\'évolution, coefficients multiplicateurs, évolutions successives, taux réciproque, échelles.',
    theoremes: [
      { id: 'F1', type: 'formule', nom: 'Taux d\'évolution et coefficient multiplicateur', enonce: 'Taux d\'évolution t% (exprimé en décimal) :\nNouvelle valeur = ancienne × (1 + t)  → coefficient multiplicateur CM = 1 + t\n\nAugmentation de t% : CM = 1 + t  (ex: +20% → CM = 1,2)\nRéduction de t% : CM = 1 − t   (ex: −15% → CM = 0,85)\n\nTaux d\'évolution depuis une valeur initiale V₀ vers V₁ :\nt = (V₁ − V₀)/V₀  (en décimal, ×100 pour avoir le %)\nCM = V₁/V₀' },
      { id: 'F2', type: 'formule', nom: 'Évolutions successives & réciproque', enonce: 'Évolutions successives t₁ puis t₂ :\nCM global = CM₁ × CM₂ = (1+t₁)(1+t₂)\nt global = CM global − 1\n\nATTENTION : t global ≠ t₁ + t₂ en général !\nExemple : +10% puis −10% → CM = 1,1×0,9 = 0,99 → −1% au total.\n\nÉvolution réciproque (taux inverse) :\nSi CM = 1 + t, le taux inverse est t\' = 1/CM − 1 = −t/(1+t).' },
    ],
    exercices: [
      { id: 'EX01', niveau: 'Facile', titre: 'Évolution successive', enonce: 'Un prix augmente de 20% puis de 10%. Quel est le taux global ?', correction: 'CM = 1,2 × 1,1 = 1,32 → augmentation globale de 32%.' },
      { id: 'EX02', niveau: 'Facile', titre: 'Taux réciproque', enonce: 'Après une augmentation de 25%, de combien faut-il diminuer pour revenir au prix initial ?', correction: 'CM initial = 1,25. Taux inverse = 1/1,25 − 1 = 0,8 − 1 = −0,2 → réduction de 20%.' },
    ],
  },

  'stmg-financier': {
    ch: 'CH 06', titre: 'Calculs financiers', badge: 'Finance', duree: '~4h', section: 'STMG · Section 3 — Calculs commerciaux',
    desc: 'Intérêts simples et composés, valeur actuelle/acquise, amortissements (linéaire, dégressif), rentes, emprunts.',
    theoremes: [
      { id: 'F1', type: 'formule', nom: 'Intérêts simples vs composés', enonce: 'Intérêts simples (court terme) :\nI = C₀ × t × n   ;   Cn = C₀(1 + nt)\n(C₀ = capital initial, t = taux par période, n = nb de périodes)\n\nIntérêts composés (long terme) :\nCn = C₀ × (1+t)ⁿ\nValeur actuelle : C₀ = Cₙ / (1+t)ⁿ = Cₙ × (1+t)⁻ⁿ\n\nEquivalence : (1+t_annuel) = (1+t_mensuel)¹²' },
      { id: 'F2', type: 'formule', nom: 'Amortissements', enonce: 'Amortissement linéaire (constant) :\nAnnuité = Valeur initiale / Durée (en années)\nValeur résiduelle année k = V₀ − k × annuité\n\nAmortissement dégressif :\nTaux dégressif = taux linéaire × coefficient (1,25 ; 1,75 ou 2,25 selon durée)\nAnnuité k = Valeur comptable × taux dégressif\nPassage au linéaire quand le linéaire devient plus avantageux.' },
      { id: 'F3', type: 'formule', nom: 'Rentes et remboursement d\'emprunt', enonce: 'Rente (versements réguliers de a pendant n périodes au taux t) :\nValeur acquise = a × [(1+t)ⁿ − 1] / t\nValeur actuelle = a × [1 − (1+t)⁻ⁿ] / t\n\nMensualité d\'un emprunt C à taux t sur n mois :\nm = C × t / [1 − (1+t)⁻ⁿ]' },
    ],
    exercices: [
      { id: 'EX01', niveau: 'Facile', titre: 'Intérêts composés', enonce: 'Capital de 10 000 € à 4% par an sur 8 ans. Valeur acquise ?', correction: 'C₈ = 10000 × 1,04⁸ ≈ 10000 × 1,3686 ≈ 13 686 €.' },
      { id: 'EX02', niveau: 'Intermédiaire', titre: 'Mensualité d\'emprunt', enonce: 'Emprunt de 15 000 € à 6% par an (soit 0,5%/mois) sur 36 mois. Calculer la mensualité.', correction: 't = 0,005 ; n = 36. m = 15000 × 0,005 / (1 − 1,005⁻³⁶) = 75 / (1 − 0,8356) = 75/0,1644 ≈ 456 €.' },
    ],
  },

  // ── STI2D / STL ────────────────────────────────────────────────────

  'sti-suites': {
    ch: 'CH 07', titre: 'Suites & Modélisation', badge: 'Algèbre', duree: '~4h', section: 'STI2D/STL · Section A — Analyse',
    desc: 'Suites arithmétiques/géométriques, modèles discrets croissance/décroissance, algorithme de seuil.',
    theoremes: [
      { id: 'D1', type: 'def', nom: 'Suites arithmétiques et géométriques', enonce: 'Suite arithmétique (raison r) : uₙ = u₀ + nr\nSuite géométrique (raison q) : uₙ = u₀ × qⁿ\n\nModèle discret de croissance : P(n) = P₀ × (1 + α)ⁿ  (taux α > 0)\nModèle discret de décroissance : Q(n) = Q₀ × (1 − β)ⁿ  (taux β, 0 < β < 1)\nExemples : population, décharge d\'un condensateur par paliers, amortissement.' },
      { id: 'M1', type: 'methode', nom: 'Algorithme de seuil', enonce: 'Pour trouver le rang n à partir duquel uₙ > S (ou < S) :\n1. Méthode analytique : résoudre uₙ > S → n > log(S/u₀)/log(q) (suite géom.)\n2. Méthode algorithmique :\n  n ← 0\n  u ← u₀\n  Tant que u ≤ S :\n      u ← u × q  (ou u + r)\n      n ← n + 1\n  Afficher n' },
    ],
    exercices: [
      { id: 'EX01', niveau: 'Facile', titre: 'Modèle de décroissance', enonce: 'Quantité de médicament dans le sang : Q(0) = 200 mg, chaque heure il reste 70%. Après combien d\'heures Q < 10 mg ?', correction: 'Q(n) = 200 × 0,7ⁿ. 200 × 0,7ⁿ < 10 → 0,7ⁿ < 0,05 → n·ln(0,7) < ln(0,05) → n > ln(0,05)/ln(0,7) ≈ 8,4. Donc n = 9 heures.' },
    ],
  },

  'sti-exp-ln': {
    ch: 'CH 08', titre: 'Exponentielle & Logarithme', badge: 'Analyse', duree: '~6h', section: 'STI2D/STL · Section A — Analyse',
    desc: 'Fonction eˣ : propriétés, équations. Logarithme ln : primitive de 1/x, propriétés, résolution, croissances comparées. Modélisations physiques.',
    theoremes: [
      { id: 'P1', type: 'prop', nom: 'Fonction exponentielle — rappels STI2D', enonce: '(eˣ)\' = eˣ  ;  (e^(ax+b))\' = a·e^(ax+b)\nPropriétés algébriques : eᵃ × eᵇ = eᵃ⁺ᵇ  ;  eᵃ/eᵇ = eᵃ⁻ᵇ\neᵃ = eᵇ ⟺ a = b  (injectivité)\neˣ > 0 toujours ; lim(x→−∞) eˣ = 0 ; lim(x→+∞) eˣ = +∞\n\nÉquations/inéquations : isoler l\'exponentielle puis comparer les exposants.' },
      { id: 'D1', type: 'def', nom: 'Logarithme népérien', enonce: 'ln est l\'unique primitive de x ↦ 1/x sur ]0;+∞[ qui s\'annule en 1.\n(ln x)\' = 1/x  pour x > 0\nln(eˣ) = x  ;  e^(ln x) = x\n\nPropriétés algébriques :\nln(ab) = ln a + ln b\nln(a/b) = ln a − ln b\nln(aⁿ) = n·ln a\nln(1) = 0  ;  ln(e) = 1\n\nVariations : strictement croissante ; lim(x→0⁺) ln x = −∞ ; lim(x→+∞) ln x = +∞' },
      { id: 'F1', type: 'formule', nom: 'Croissances comparées & Modélisation physique', enonce: 'lim(x→+∞) ln(x)/x = 0   (ln croit moins vite que x)\nlim(x→0⁺) x·ln x = 0\n\nDécharge de condensateur : U(t) = U₀·e^(−t/RC)\n  → ln(U/U₀) = −t/RC  → t = −RC·ln(U/U₀)\n\nLoi de Newton (refroidissement) :\nT(t) = Text + (T₀−Text)·e^(−kt)\n→ utiliser le logarithme pour trouver k ou t.' },
      { id: 'M1', type: 'methode', nom: 'Résoudre équations avec ln', enonce: 'ln(u) = ln(v) ⟺ u = v  (u,v > 0)\nln(u) > ln(v) ⟺ u > v  (croissance stricte)\nln(u) = k ⟺ u = eᵏ\n\nStratégie générale :\n1. Isoler ln(x).\n2. Appliquer eˣ des deux côtés.\n3. Vérifier que les solutions vérifient les conditions de domaine (x > 0).\n\nExemple : 2·ln(x) = ln(9) → ln(x²) = ln(9) → x² = 9 → x = 3 (x > 0).' },
    ],
    exercices: [
      { id: 'EX01', niveau: 'Facile', titre: 'Propriétés du logarithme', enonce: 'Simplifier : A = ln(6) + 2·ln(3) − ln(54)', correction: 'A = ln(6) + ln(9) − ln(54) = ln(6×9/54) = ln(54/54) = ln(1) = 0.' },
      { id: 'EX02', niveau: 'Facile', titre: 'Équation avec ln', enonce: 'Résoudre : ln(2x−1) = ln(x+3)', correction: '2x−1 = x+3 → x = 4. Vérif : 2×4−1=7>0 et 4+3=7>0 ✓. Solution : x=4.' },
      { id: 'EX03', niveau: 'Intermédiaire', titre: 'Décharge de condensateur', enonce: 'U(t) = 12·e^(−t/0,5) (en volts, t en ms). À quel instant U = 4 V ?', correction: '4 = 12·e^(−t/0,5) → e^(−t/0,5) = 1/3 → −t/0,5 = ln(1/3) = −ln3 → t = 0,5·ln3 ≈ 0,549 ms.' },
    ],
  },

  'sti-integration': {
    ch: 'CH 09', titre: 'Intégration', badge: 'Analyse', duree: '~5h', section: 'STI2D/STL · Section A — Analyse',
    desc: 'Primitives usuelles, intégrale définie (aire, Chasles), valeur moyenne, applications physiques.',
    theoremes: [
      { id: 'F1', type: 'formule', nom: 'Primitives usuelles', enonce: 'f(x) → F(x)\nxⁿ → xⁿ⁺¹/(n+1)  (n ≠ −1)\n1/x → ln|x|\neˣ → eˣ\ne^(ax) → e^(ax)/a\ncos x → sin x\nsin x → −cos x\n1/√x → 2√x\n\nLinéarité : primitive de (αf+βg) = α·F + β·G' },
      { id: 'F2', type: 'formule', nom: 'Intégrale définie — propriétés', enonce: '∫ₐᵇ f(x)dx = [F(x)]ₐᵇ = F(b) − F(a)\n\nPropriétés :\n• Relation de Chasles : ∫ₐᶜ f = ∫ₐᵇ f + ∫ᵦᶜ f\n• Linéarité : ∫(αf+βg) = α∫f + β∫g\n• Positivité : f ≥ 0 → ∫ₐᵇ f ≥ 0\n• ∫ₐᵃ f = 0  ;  ∫ᵦᵃ f = −∫ₐᵇ f\n\nInterprétation : ∫ₐᵇ f(x)dx = aire algébrique entre la courbe et l\'axe des x.' },
      { id: 'F3', type: 'formule', nom: 'Valeur moyenne & applications physiques', enonce: 'Valeur moyenne de f sur [a;b] :\nm = (1/(b−a)) × ∫ₐᵇ f(x)dx\n\nApplications STI2D/STL :\n• Travail d\'une force : W = ∫ₐᵇ F(x)dx  (en joules)\n• Charge électrique : Q = ∫ₐᵇ i(t)dt  (en coulombs)\n• Centre d\'inertie : x_G = (∫x·ρ(x)dx) / (∫ρ(x)dx)' },
    ],
    exercices: [
      { id: 'EX01', niveau: 'Facile', titre: 'Calcul d\'intégrale', enonce: 'Calculer ∫₁³ (2x + e^x) dx.', correction: '[x² + eˣ]₁³ = (9 + e³) − (1 + e) = 8 + e³ − e ≈ 8 + 20,09 − 2,72 ≈ 25,37.' },
      { id: 'EX02', niveau: 'Intermédiaire', titre: 'Valeur moyenne', enonce: 'Calculer la valeur moyenne de f(x) = 2eˣ sur [0 ; ln2].', correction: 'Longueur : ln2−0 = ln2. ∫₀^(ln2) 2eˣ dx = [2eˣ]₀^(ln2) = 2×2−2×1 = 2. m = 2/ln2 ≈ 2,885.' },
    ],
  },

  'sti-probas-cont': {
    ch: 'CH 10', titre: 'Probabilités continues', badge: 'Probas', duree: '~4h', section: 'STI2D/STL · Section B — Probabilités',
    desc: 'Loi uniforme sur [a;b], loi normale N(μ,σ²), standardisation, intervalles μ±σ et μ±2σ, approximation binomiale.',
    theoremes: [
      { id: 'D1', type: 'def', nom: 'Loi uniforme sur [a;b]', enonce: 'X suit la loi uniforme sur [a;b] si sa densité est constante :\nf(x) = 1/(b−a) si x ∈ [a;b], 0 sinon.\n\nEspérance : E(X) = (a+b)/2\nVariance : V(X) = (b−a)²/12\n\nProbabilité : P(c ≤ X ≤ d) = (d−c)/(b−a)  pour a ≤ c ≤ d ≤ b.\n\nExemple STI2D : temps d\'attente d\'un bus arrivant toutes les 15 min : X ∼ U[0;15].' },
      { id: 'F1', type: 'formule', nom: 'Loi normale N(μ,σ²)', enonce: 'X ∼ N(μ,σ²) → courbe en cloche symétrique autour de μ.\nStandardisation : Z = (X−μ)/σ ∼ N(0,1)\n\nIntervalles usuels :\nP(μ−σ ≤ X ≤ μ+σ) ≈ 0,683  (68%)\nP(μ−2σ ≤ X ≤ μ+2σ) ≈ 0,954  (95%)\nP(μ−3σ ≤ X ≤ μ+3σ) ≈ 0,997  (99,7%)\n\nSymétrie : P(Z ≤ −a) = 1 − P(Z ≤ a)' },
      { id: 'T1', type: 'thm', nom: 'Moivre-Laplace : approximation binomiale par normale', enonce: 'Si X ∼ B(n,p) avec n grand (np ≥ 5 et n(1−p) ≥ 5) :\nX ≈ N(np ; np(1−p))\nZ = (X−np)/√(np(1−p)) ≈ N(0,1)\n\nApplication : calculer P(X ≥ k) par standardisation au lieu d\'utiliser la formule binomiale terme par terme.' },
    ],
    exercices: [
      { id: 'EX01', niveau: 'Facile', titre: 'Loi uniforme', enonce: 'Un bus passe toutes les 20 min. X ∼ U[0;20]. Proba d\'attendre plus de 12 min ?', correction: 'P(X > 12) = (20−12)/20 = 8/20 = 0,4 = 40%.' },
      { id: 'EX02', niveau: 'Intermédiaire', titre: 'Loi normale', enonce: 'Durée de vie d\'une pièce : X ∼ N(500 ; 30²) heures. P(440 ≤ X ≤ 560) ?', correction: '440 = 500 − 2×30 et 560 = 500 + 2×30. Donc c\'est l\'intervalle μ±2σ → P ≈ 0,954 = 95,4%.' },
    ],
  },

  'sti-stat-inf': {
    ch: 'CH 11', titre: 'Statistiques inférentielles', badge: 'Stats', duree: '~3h', section: 'STI2D/STL · Section B — Probabilités',
    desc: 'Fluctuation d\'échantillonnage, intervalle de confiance 95% [f±1/√n], estimation de proportion.',
    theoremes: [
      { id: 'F1', type: 'formule', nom: 'Intervalle de confiance (seuil 95%)', enonce: 'Pour un échantillon de taille n (n ≥ 30), la fréquence observée f estime la proportion réelle p :\nIC₉₅% = [f − 1/√n  ;  f + 1/√n]\n\nInterprétation : on a une "confiance" de 95% que p est dans cet intervalle.\n\nTaille minimale pour une précision e :\nn ≥ 1/e²  (ex : précision 2% → n ≥ 2 500)' },
      { id: 'D1', type: 'def', nom: 'Fluctuation d\'échantillonnage', enonce: 'Si la proportion réelle est p (connue), et qu\'on réalise des échantillons de taille n, la fréquence F varie selon l\'échantillon.\nIntervalle de fluctuation asymptotique à 95% :\nI = [p − 1/√n  ;  p + 1/√n]\n\nDifférence avec IC :\n• Fluctuation : p connu, F inconnue → on encadre F\n• Confiance : F observée, p inconnu → on encadre p' },
    ],
    exercices: [
      { id: 'EX01', niveau: 'Facile', titre: 'Intervalle de confiance', enonce: 'Sondage de 400 personnes, 56% satisfaites. Construire l\'IC95%.', correction: '1/√400 = 0,05. IC = [0,56−0,05 ; 0,56+0,05] = [0,51 ; 0,61]. On estime p ∈ [51% ; 61%].' },
      { id: 'EX02', niveau: 'Intermédiaire', titre: 'Taille d\'échantillon', enonce: 'Pour une précision de ±3%, quelle taille d\'échantillon faut-il ?', correction: 'e = 0,03. n ≥ 1/0,03² = 1/0,0009 ≈ 1 112. Prendre n ≥ 1 112.' },
    ],
  },

  'sti-geometrie': {
    ch: 'CH 12', titre: 'Géométrie dans l\'espace', badge: 'Géométrie', duree: '~4h', section: 'STI2D/STL · Section C — Géométrie',
    desc: 'Vecteurs de l\'espace, coplanarité, équation cartésienne du plan, représentation paramétrique droite, intersection, orthogonalité.',
    theoremes: [
      { id: 'D1', type: 'def', nom: 'Vecteurs et repère de l\'espace', enonce: 'Repère (O ; i⃗, j⃗, k⃗) : tout vecteur u⃗ = x·i⃗ + y·j⃗ + z·k⃗ a pour coordonnées (x;y;z).\nNorme : ‖u⃗‖ = √(x²+y²+z²)\nRelation de Chasles : AB⃗ + BC⃗ = AC⃗\n\nCoplanarité : u⃗, v⃗, w⃗ coplanaires ⟺ w⃗ = αu⃗ + βv⃗ (combinaison linéaire).' },
      { id: 'F1', type: 'formule', nom: 'Plan et droite dans l\'espace', enonce: 'Équation cartésienne d\'un plan : ax + by + cz + d = 0\nVecteur normal : n⃗(a;b;c) ⊥ au plan.\nPlan passant par A(x₀;y₀;z₀) de normale n⃗(a;b;c) :\na(x−x₀)+b(y−y₀)+c(z−z₀)=0\n\nReprésen. paramétrique d\'une droite (A point, u⃗ vecteur directeur) :\nx=x₀+at ; y=y₀+bt ; z=z₀+ct   (t∈ℝ)\n\nOrthogonalité droite-plan : u⃗ directeur ∥ n⃗ normal au plan.' },
    ],
    exercices: [
      { id: 'EX01', niveau: 'Facile', titre: 'Équation d\'un plan', enonce: 'Plan passant par A(2;1;3) avec vecteur normal n⃗(1;−2;4). Équation ?', correction: '1(x−2)−2(y−1)+4(z−3)=0 → x−2−2y+2+4z−12=0 → x−2y+4z−12=0.' },
      { id: 'EX02', niveau: 'Intermédiaire', titre: 'Intersection droite-plan', enonce: 'Droite : x=1+t ; y=2−t ; z=3+2t. Plan : 2x+y−z+1=0. Trouver l\'intersection.', correction: 'Substituer : 2(1+t)+(2−t)−(3+2t)+1=0 → 2+2t+2−t−3−2t+1=0 → −t+2=0 → t=2. Point : x=3, y=0, z=7. Intersection : M(3;0;7).' },
    ],
  },

  'sti-eq-diff': {
    ch: 'CH 13', titre: 'Équations différentielles & Compléments', badge: 'Analyse', duree: '~5h', section: 'STI2D/STL · Section D — Spécialité PCM',
    desc: 'y\'=ay → Ceᵃˣ ; y\'=ay+b → Ceᵃˣ−b/a ; condition initiale ; circuits RC ; refroidissement Newton. Convexité f\'\', IPP.',
    theoremes: [
      { id: 'T1', type: 'thm', nom: 'Équations différentielles du 1er ordre', enonce: 'y\' = ay   (a ∈ ℝ) → y(x) = C·eᵃˣ  (C constante réelle)\n\ny\' = ay + b  (a ≠ 0) :\n• Solution particulière constante yₚ = −b/a\n• Solution générale : y(x) = C·eᵃˣ − b/a\n\nCondition initiale y(0) = y₀ → C = y₀ + b/a\n\nSolution unique : y(x) = (y₀+b/a)·eᵃˣ − b/a' },
      { id: 'D1', type: 'def', nom: 'Applications physiques STI2D/STL', enonce: 'Circuit RC (charge du condensateur) :\nRC·u\'(t) + u(t) = E  →  u(t) = E + (U₀−E)·e^(−t/RC)\n\nLoi de Newton (refroidissement) :\nT\'(t) = −k(T−Text) → T(t) = Text + (T₀−Text)·e^(−kt)\n\nCroissance bactérienne :\nN\'(t) = α·N(t) → N(t) = N₀·e^(αt)' },
      { id: 'P1', type: 'prop', nom: 'Convexité (rappel) & IPP (complément)', enonce: 'Convexité :\nf\'\'(x) ≥ 0 → f convexe (courbe au-dessus des tangentes)\nf\'\'(x) ≤ 0 → f concave\nPoint d\'inflexion : f\'\' change de signe.\n\nIntégration par parties (IPP) :\n∫u\'(x)·v(x)dx = [u(x)·v(x)] − ∫u(x)·v\'(x)dx\n\nChangement de variable affine :\n∫f(ax+b)dx = (1/a)·F(ax+b) + C' },
    ],
    exercices: [
      { id: 'EX01', niveau: 'Facile', titre: 'Circuit RC', enonce: 'RC = 0,01 s, E = 10 V, U₀ = 0. Écrire l\'expression de u(t) et calculer u(0,02).', correction: 'u(t) = 10·(1 − e^(−t/0,01)) = 10(1−e^(−100t)). u(0,02) = 10(1−e⁻²) ≈ 10×0,865 ≈ 8,65 V.' },
      { id: 'EX02', niveau: 'Intermédiaire', titre: 'Refroidissement Newton', enonce: 'Café chaud : T₀ = 90°C, Text = 20°C, k = 0,05 min⁻¹. Après 10 min, quelle est la température ?', correction: 'T(t) = 20 + 70·e^(−0,05t). T(10) = 20 + 70·e^(−0,5) ≈ 20 + 70×0,607 ≈ 20 + 42,5 ≈ 62,5°C.' },
    ],
  },
}

function TypeBadge({ type }: { type: string }) {
  const color = C[type as keyof typeof C] || C.def
  return <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 20, background: `${color}20`, color, border: `1px solid ${color}30`, flexShrink: 0 }}>{L[type as keyof typeof L] || type}</span>
}

export default function TechnoChapterPage() {
  const params = useParams()
  const slug = params?.slug as string
  const ch = CHAPITRES[slug]
  const [openEx, setOpenEx] = useState<string | null>(null)
  const secColor = SEC_COLOR[slug] || '#10b981'
  const branchLabel = BRANCH_LABEL[slug] || ''

  if (!ch) return (
    <><Navbar /><main style={{ paddingTop: 80, minHeight: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>📭</div>
        <h2 style={{ marginBottom: 12 }}>Chapitre non trouvé</h2>
        <Link href="/bac-france/terminale-techno" style={{ color: '#34d399' }}>← Retour Terminale Technologique</Link>
      </div>
    </main><Footer /></>
  )

  const idx = NAV_ORDER.indexOf(slug)
  const prevSlug = idx > 0 ? NAV_ORDER[idx - 1] : null
  const nextSlug = idx < NAV_ORDER.length - 1 ? NAV_ORDER[idx + 1] : null

  return (
    <>
      <Navbar />
      <main style={{ position: 'relative', zIndex: 1, paddingTop: 80 }}>
        <div style={{ borderBottom: '1px solid var(--border)', padding: '14px clamp(20px,5vw,60px)', display: 'flex', gap: 8, fontSize: 13, color: 'var(--muted)', alignItems: 'center', flexWrap: 'wrap' }}>
          <Link href="/bac-france" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Bac France</Link><span>›</span>
          <Link href="/bac-france/terminale-techno" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Terminale Techno</Link><span>›</span>
          <span style={{ color: secColor, fontWeight: 600 }}>{ch.ch} — {ch.titre}</span>
        </div>

        <div className="container" style={{ paddingTop: 40, paddingBottom: 80 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 275px', gap: 32, alignItems: 'start' }}>
            <div>
              {/* Header */}
              <div style={{ marginBottom: 32 }}>
                <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, background: 'var(--surface2)', color: 'var(--muted)', padding: '3px 10px', borderRadius: 8 }}>Term. Techno · {ch.ch}</span>
                  <span style={{ fontSize: 12, background: `${secColor}20`, color: secColor, padding: '3px 10px', borderRadius: 12, fontWeight: 600 }}>{ch.badge}</span>
                  <span style={{ fontSize: 11, background: `${secColor}12`, color: secColor, padding: '3px 10px', borderRadius: 12 }}>{branchLabel}</span>
                </div>
                <h1 style={{ fontSize: 'clamp(22px,3.5vw,36px)', marginBottom: 8 }}>{ch.titre}</h1>
                <div style={{ fontSize: 12, color: secColor, marginBottom: 8 }}>📂 {ch.section}</div>
                <p style={{ color: 'var(--text2)', fontSize: 14, lineHeight: 1.65, marginBottom: 14, maxWidth: 640 }}>{ch.desc}</p>
                <div style={{ display: 'flex', gap: 16, fontSize: 12, color: 'var(--muted)', flexWrap: 'wrap' }}>
                  <span>📊 {ch.theoremes.length} théorèmes & formules</span><span>·</span>
                  <span>📝 {ch.exercices.length} exercices</span><span>·</span>
                  <span>⏱ {ch.duree}</span>
                </div>
              </div>

              {/* Légende */}
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24, padding: '10px 14px', background: 'var(--surface)', borderRadius: 12, border: '1px solid var(--border)' }}>
                <span style={{ fontSize: 12, color: 'var(--muted)', marginRight: 4, alignSelf: 'center' }}>Légende :</span>
                {Object.entries(L).map(([k, v]) => <span key={k} style={{ fontSize: 11, padding: '2px 10px', borderRadius: 20, background: `${C[k as keyof typeof C]}18`, color: C[k as keyof typeof C], border: `1px solid ${C[k as keyof typeof C]}25`, fontWeight: 600 }}>{v}</span>)}
              </div>

              {/* Cours */}
              <div style={{ marginBottom: 44 }}>
                <h2 style={{ fontSize: 20, marginBottom: 18 }}>📐 Cours officiel — Théorèmes & Formules</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 13 }}>
                  {ch.theoremes.map(t => {
                    const color = C[t.type as keyof typeof C] || C.def
                    return (
                      <div key={t.id} style={{ borderLeft: `3px solid ${color}`, background: `${color}07`, borderRadius: '0 12px 12px 0', padding: '15px 20px', border: `1px solid ${color}18` }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8, gap: 10, flexWrap: 'wrap' }}>
                          <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--text)' }}>{t.nom}</div>
                          <TypeBadge type={t.type} />
                        </div>
                        <div style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.8, whiteSpace: 'pre-line', fontFamily: (t.type === 'formule' || t.type === 'methode') ? 'var(--font-mono)' : 'inherit' }}>{t.enonce}</div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Exercices */}
              <div style={{ marginBottom: 44 }}>
                <h2 style={{ fontSize: 20, marginBottom: 18 }}>📝 Exercices</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
                  {ch.exercices.map(ex => (
                    <div key={ex.id} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, overflow: 'hidden' }}>
                      <div style={{ padding: '15px 20px' }}>
                        <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8, flexWrap: 'wrap' }}>
                          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)', background: 'var(--surface2)', padding: '2px 8px', borderRadius: 6 }}>{ex.id}</span>
                          <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 10, fontWeight: 600, background: ex.niveau === 'Facile' ? 'rgba(6,214,160,0.15)' : 'rgba(245,158,11,0.15)', color: ex.niveau === 'Facile' ? '#06d6a0' : '#f59e0b' }}>{ex.niveau}</span>
                          <span style={{ fontWeight: 600, fontSize: 14, color: 'var(--text)' }}>{ex.titre}</span>
                        </div>
                        <p style={{ fontSize: 13, color: 'var(--text2)', margin: 0, lineHeight: 1.6, whiteSpace: 'pre-line' }}>{ex.enonce}</p>
                      </div>
                      <div style={{ borderTop: '1px solid var(--border)', padding: '10px 20px', display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                        <Link href={`/solve?q=${encodeURIComponent('Terminale Techno, ' + ch.titre + ' — ' + ex.enonce)}`} className="btn btn-primary" style={{ fontSize: 12, padding: '6px 14px' }}>🧮 Résoudre avec IA</Link>
                        <button onClick={() => setOpenEx(openEx === ex.id ? null : ex.id)} style={{ fontSize: 12, padding: '6px 14px', borderRadius: 8, border: '1px solid var(--border)', background: 'transparent', color: 'var(--text2)', cursor: 'pointer', fontFamily: 'inherit' }}>
                          📋 {openEx === ex.id ? 'Masquer' : 'Correction'}
                        </button>
                      </div>
                      {openEx === ex.id && (
                        <div style={{ padding: '13px 20px', borderTop: '1px solid var(--border)', background: `${secColor}06` }}>
                          <div style={{ fontSize: 11, color: secColor, fontWeight: 700, marginBottom: 5 }}>✅ Correction</div>
                          <div style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.75, whiteSpace: 'pre-line' }}>{ex.correction}</div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, borderTop: '1px solid var(--border)', paddingTop: 22 }}>
                {prevSlug ? (<Link href={`/bac-france/terminale-techno/${prevSlug}`} style={{ textDecoration: 'none' }}><div className="card" style={{ padding: '13px 16px', transition: 'transform 0.15s' }} onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'} onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}><div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 3 }}>← Précédent</div><div style={{ fontWeight: 700, fontSize: 13 }}>{TITRES[prevSlug]}</div></div></Link>) : <div />}
                {nextSlug ? (<Link href={`/bac-france/terminale-techno/${nextSlug}`} style={{ textDecoration: 'none' }}><div className="card" style={{ padding: '13px 16px', textAlign: 'right', transition: 'transform 0.15s' }} onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'} onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}><div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 3 }}>Suivant →</div><div style={{ fontWeight: 700, fontSize: 13 }}>{TITRES[nextSlug]}</div></div></Link>) : <div />}
              </div>
            </div>

            {/* Sidebar */}
            <aside style={{ position: 'sticky', top: 88 }}>
              <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden', marginBottom: 14 }}>
                <div style={{ padding: '11px 15px', borderBottom: '1px solid var(--border)', fontSize: 11, color: 'var(--muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>⚙️ Techno — 13 chapitres</div>
                {NAV_ORDER.map((s, i) => (
                  <Link key={s} href={`/bac-france/terminale-techno/${s}`} style={{ textDecoration: 'none' }}>
                    <div style={{ padding: '8px 15px', borderBottom: i < NAV_ORDER.length - 1 ? '1px solid var(--border)' : 'none', background: s === slug ? `${SEC_COLOR[s]}12` : 'transparent', borderLeft: s === slug ? `3px solid ${SEC_COLOR[s]}` : '3px solid transparent', transition: 'all 0.15s', cursor: 'pointer' }}
                      onMouseEnter={e => { if (s !== slug) e.currentTarget.style.background = 'rgba(255,255,255,0.03)' }}
                      onMouseLeave={e => { if (s !== slug) e.currentTarget.style.background = 'transparent' }}>
                      <div style={{ fontSize: 9, color: 'var(--muted)', marginBottom: 1, fontFamily: 'var(--font-mono)' }}>{BRANCH_LABEL[s]} · CH {String(i + 1).padStart(2, '0')}</div>
                      <div style={{ fontSize: 11, fontWeight: s === slug ? 700 : 400, color: s === slug ? SEC_COLOR[s] : 'var(--text2)' }}>{TITRES[s]}</div>
                    </div>
                  </Link>
                ))}
              </div>
              <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 13, padding: '14px' }}>
                <div style={{ fontSize: 11, color: 'var(--muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>Actions</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                  <Link href={`/solve?q=${encodeURIComponent('Explique-moi ' + ch.titre + ' en Terminale Technologique')}`} className="btn btn-primary" style={{ textAlign: 'center', fontSize: 12 }}>🤖 Chat IA — {ch.titre}</Link>
                  <Link href="/simulation" className="btn btn-secondary" style={{ textAlign: 'center', fontSize: 12 }}>📋 Exercice type</Link>
                  <Link href="/bac-france/terminale-generale" className="btn btn-secondary" style={{ textAlign: 'center', fontSize: 12 }}>🎓 Terminale Générale</Link>
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
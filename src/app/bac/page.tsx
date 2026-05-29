'use client'
import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

// ═══════════════════════════════════════════════════════════════
//  PAGE BAC TUNISIE — Page intermédiaire Maths / Physique-Chimie / SVT
//  Programme officiel CNP Tunisie — 4ème année secondaire
// ═══════════════════════════════════════════════════════════════

type Matiere = 'maths' | 'physique-chimie' | 'informatique' | 'anglais' | 'svt' | null

// ──────────────────────────────────────────────────────────────
//  DONNÉES MATHÉMATIQUES — Programme officiel CNP mis à jour
// ──────────────────────────────────────────────────────────────

const SECTIONS_MATHS = [
  {
    slug: 'maths',
    icon: '📐',
    titre: 'Section Mathématiques',
    coeff: 'Coefficient 4',
    couleur: '#4f6ef7',
    gradient: 'linear-gradient(135deg,rgba(79,110,247,0.15),rgba(124,58,237,0.08))',
    border: 'rgba(79,110,247,0.25)',
    tomes: [
      {
        label: 'Partie 1 — Analyse (8 chapitres)',
        chapitres: [
          'Limites et continuité (limites en un point et à l\'infini, formes indéterminées, TVI, prolongement par continuité)',
          'Dérivabilité et étude de fonctions (Rolle, accroissements finis, L\'Hôpital, asymptotes H/V/O, concavité, inflexion)',
          'Fonctions réciproques (bijection, arcsin, arccos, arctan : définition, propriétés, dérivées)',
          'Fonction logarithme népérien (définition intégrale, propriétés, dérivée (ln u)\'=u\'/u, limites en 0 et +∞)',
          'Fonction exponentielle (réciproque de ln, (eᵘ)\'=u\'·eᵘ, fonctions aˣ et logₐ(x), croissances comparées)',
          'Suites réelles (monotonie, bornitude, convergence, suites adjacentes, récurrence uₙ₊₁=f(uₙ), point fixe)',
          'Calcul intégral (primitives, intégrale de Riemann, TFA, IPP, changement de variable, aires, volumes de révolution)',
          'Équations différentielles (y\'=ay, y\'=ay+b, y\'\'+ay\'+by=0 — équation caractéristique Δ>0, Δ=0, Δ<0)',
        ],
      },
      {
        label: 'Partie 2 — Algèbre (2 chapitres)',
        chapitres: [
          'Nombres complexes (formes algébrique z=a+ib, trigonométrique r(cosθ+isinθ), exponentielle reⁱᴱ ; Moivre ; Euler ; racines n-ièmes ; applications géométriques)',
          'Arithmétique dans ℤ (divisibilité, PGCD, Euclide, Bézout au+bv=PGCD(a,b), Gauss, nombres premiers, congruences, équations diophantine ax+by=c)',
        ],
      },
      {
        label: 'Partie 3 — Probabilités et Statistiques (4 chapitres)',
        chapitres: [
          'Probabilité discrète (conditionnelle P(A|B), indépendance, probabilités totales, Bayes, espérance E(X), variance V(X))',
          'Loi binomiale B(n,p) : P(X=k)=Cₙᵎ pᵎ(1-p)ⁿ⁻ᵎ, E(X)=np, V(X)=np(1-p)',
          'Loi de Poisson P(λ) : P(X=k)=e⁻ᴬ λᵎ/k!, E(X)=V(X)=λ — approximation de B(n,p) quand n grand et p petit',
          'Probabilité continue (densité, loi uniforme [a,b], loi exponentielle ε(λ) f(x)=λe⁻ᴬx sans mémoire, loi normale N(μ,σ²) standardisation)',
        ],
      },
      {
        label: 'Partie 4 — Géométrie (4 chapitres)',
        chapitres: [
          'Géométrie dans l\'espace (produit scalaire et vectoriel u⃗∧v⃗, équations de plan et droite, sphère, distances point-plan, point-droite, entre droites)',
          'Isométries du plan (directes : translations, rotations ; indirectes : réflexions, retournements ; expression complexe f(z)=az+b ou f(z)=az̄+b)',
          'Similitudes du plan (directes et indirectes, rapport, angle, point fixe, classification)',
          'Coniques (parabole y²=2px foyer/directrice ; ellipse x²/a²+y²/b²=1, e<1 ; hyperbole x²/a²-y²/b²=1, asymptotes, e>1)',
        ],
      },
    ],
    nbCh: 18,
    nbThm: 185,
    nbEx: 150,
  },
  {
    
slug: 'sciences-exp',
    icon: '🔬',
    titre: 'Section Sciences Expérimentales',
    coeff: 'Coefficient 3',
    couleur: '#06d6a0',
    gradient: 'linear-gradient(135deg,rgba(6,214,160,0.12),rgba(5,154,114,0.06))',
    border: 'rgba(6,214,160,0.25)',
    tomes: [
      {
        label: 'Partie 1 — Analyse',
        chapitres: [
          'Fonctions — Généralités (domaine, parité, opérations, √f)',
          'Limites et continuité (TVI, asymptotes, branches infinies)',
          'Dérivation (dérivées usuelles, tangente, extrema)',
          'Étude de fonctions (polynômes, rationnelles, irrationnelles, circulaires)',
          'Suites numériques (arithmétiques, géométriques, récurrentes, limite)',
        ],
      },
      {
        label: 'Partie 2 — Fonctions usuelles & Intégrales',
        chapitres: [
          'Fonctions réciproques (bijection, représentation graphique, dérivée de la réciproque)',
          'Logarithme népérien (ln x, propriétés algébriques, dérivée (ln u)\'=u\'/u, équations)',
          'Fonction exponentielle (définition, (eᵘ)\'=u\'eᵘ, équations exponentielles, étude)',
          'Primitives et intégrales (∫ₐᵇ f(x)dx, aire sous une courbe, théorème fondamental)',
          'Équations différentielles y\'=ay+b (solution générale, condition initiale)',
        ],
      },
      {
        label: 'Partie 3 — Algèbre',
        chapitres: [
          'Nombres complexes (forme algébrique z=a+ib, trigonométrique, exponentielle, Moivre, équations dans ℂ)',
        ],
      },
      {
        label: 'Partie 4 — Géométrie',
        chapitres: [
          'Vecteurs de l\'espace, produit scalaire et vectoriel (définition, orthogonalité, angles)',
          'Droites, plans et sphère (équations cartésiennes, positions relatives, distances)',
        ],
      },
      {
        label: 'Partie 5 — Probabilités & Statistiques',
        chapitres: [
          'Probabilités (conditionnelle P(A|B), indépendance, probabilités totales, arbre pondéré)',
          'Variables aléatoires discrètes (loi, espérance E(X), variance V(X), écart-type)',
          'Loi binomiale B(n,p) : P(X=k)=Cₙᵏ pᵏ(1-p)ⁿ⁻ᵏ, E(X)=np, V(X)=np(1-p)',
          'Statistiques (moyenne, variance, écart-type, histogrammes, diagrammes)',
        ],
      },
    ],
    nbCh: 17,
    nbThm: 128,
    nbEx: 98,
  },
  {
    slug: 'sciences-tech',
    icon: '⚙️',
    titre: 'Section Sciences Techniques',
    coeff: 'Coefficient 3',
    couleur: '#f59e0b',
    gradient: 'linear-gradient(135deg,rgba(245,158,11,0.12),rgba(217,119,6,0.06))',
    border: 'rgba(245,158,11,0.25)',
    tomes: [
      {
        label: 'Partie 1 — Analyse',
        chapitres: [
          'Fonctions — Généralités (domaine, parité, périodicité, valeur absolue)',
          'Limites et continuité (TVI, théorème de la bijection, asymptotes)',
          'Dérivation (dérivées usuelles, tangente, extrema)',
          'Étude de fonctions (polynômes, rationnelles, irrationnelles, circulaires)',
          'Logarithme népérien (définition, propriétés, dérivée, étude complète)',
          'Fonction exponentielle (définition, propriétés, dérivée, étude complète)',
          'Suites numériques (arithmétiques, géométriques, récurrentes, limite, récurrence)',
        ],
      },
      {
        label: 'Partie 2 — Géométrie',
        chapitres: [
          'Géométrie plane (vecteurs, droites, cercles, coniques : ellipse, hyperbole, parabole)',
          'Géométrie dans l\'espace (produit scalaire, vectoriel, droites, plans, distances)',
        ],
      },
      {
        label: 'Partie 3 — Équations différentielles & Complexes',
        chapitres: [
          'Équations différentielles y\'=ay+b (solution générale, condition initiale, applications techniques)',
          'Nombres complexes (z=a+ib, module, argument, forme trigonométrique et exponentielle, Moivre, équations)',
        ],
      },
      {
        label: 'Partie 4 — Probabilités & Statistiques',
        chapitres: [
          'Probabilités (conditionnelle P(A|B), indépendance, probabilités totales, arbre pondéré)',
          'Variables aléatoires discrètes (loi, espérance, variance, écart-type)',
          'Loi binomiale B(n,p) : P(X=k)=Cₙᵏ pᵏ(1-p)ⁿ⁻ᵏ, E(X)=np',
          'Statistiques (moyenne, variance, écart-type, nuage de points, régression affine, coefficient r)',
        ],
      },
    ],
    nbCh: 16,
    nbThm: 108,
    nbEx: 90,
    note: '★ Coniques (ellipse, hyperbole, parabole) — spécifique Sciences Techniques',
  },
  {
    slug: 'eco-gestion',
    icon: '💹',
    titre: 'Section Économie & Gestion',
    coeff: 'Coefficient 2',
    couleur: '#10b981',
    gradient: 'linear-gradient(135deg,rgba(16,185,129,0.12),rgba(5,154,114,0.06))',
    border: 'rgba(16,185,129,0.25)',
    tomes: [
      {
        label: 'Partie 1 — Analyse',
        chapitres: [
          'Fonctions — Généralités (domaine, parité, valeur absolue, restriction)',
          'Limites et continuité (TVI, théorème de la bijection, asymptotes)',
          'Dérivation (dérivées usuelles, tangente, extrema)',
          'Étude de fonctions (polynômes, rationnelles, irrationnelles, circulaires)',
          'Logarithme népérien (définition, propriétés, dérivée, étude complète)',
          'Fonction exponentielle (définition, propriétés, dérivée, étude complète)',
          'Suites numériques (arithmétiques, géométriques, récurrentes, limite)',
        ],
      },
      {
        label: 'Partie 2 — Mathématiques financières',
        chapitres: [
          'Intérêts simples et composés (Cₙ=C₀(1+i)ⁿ, valeur acquise, valeur actuelle)',
          'Annuités simples (suite géométrique, valeur actuelle et future, remboursement)',
        ],
      },
      {
        label: 'Partie 3 — Matrices & Systèmes',
        chapitres: [
          'Matrices (définition, opérations, produit AB, matrices carrées, identité)',
          'Déterminants (ordre 2 et 3, inverse A⁻¹, conditions d\'inversibilité)',
          'Systèmes linéaires (méthode matricielle AX=b, applications économiques)',
        ],
      },
      {
        label: 'Partie 4 — Probabilités & Statistiques',
        chapitres: [
          'Probabilités (conditionnelle P(A|B), indépendance, probabilités totales, arbre pondéré)',
          'Variables aléatoires discrètes (loi, espérance, variance, écart-type)',
          'Loi binomiale B(n,p) — applications économiques et statistiques',
          'Statistiques (médiane, ajustement statistique, régression affine, droite d\'ajustement)',
        ],
      },
    ],
    nbCh: 16,
    nbThm: 106,
    nbEx: 86,
    note: '★ Programme spécifique EG — sans coniques ni graphes',
  },
  {
    slug: 'informatique',
    icon: '💻',
    titre: 'Section Sciences Informatiques',
    coeff: 'Coefficient 3',
    couleur: '#6366f1',
    gradient: 'linear-gradient(135deg,rgba(99,102,241,0.14),rgba(124,58,237,0.07))',
    border: 'rgba(99,102,241,0.3)',
    isNew: true,
    tomes: [
      {
        label: 'Partie 1 — Analyse',
        chapitres: [
          'Fonctions — Généralités (domaine, parité, composée, √f)',
          'Limites et continuité (TVI, asymptotes, formes indéterminées)',
          'Dérivation (dérivées usuelles, tangente, extrema)',
          'Étude de fonctions (polynômes, rationnelles, irrationnelles, circulaires)',
          'Logarithme népérien (définition, dérivée, étude complète)',
          'Fonction exponentielle (définition, dérivée, étude complète)',
          'Suites numériques (arithmétiques, géométriques, récurrentes, récurrence)',
        ],
      },
      {
        label: 'Partie 2 — Équations différentielles & Algèbre',
        chapitres: [
          'Équations différentielles y\'=ay+b (solution générale, condition initiale)',
          'Nombres complexes (z=a+ib, module, argument, forme trigonométrique et exponentielle, Moivre, équations dans ℂ)',
          'Systèmes linéaires (substitution, élimination, méthode matricielle, modélisation informatique)',
          'Arithmétique dans ℤ (divisibilité, PGCD, PPCM, congruences, applications cryptographiques)',
        ],
      },
      {
        label: 'Partie 3 — Probabilités & Statistiques',
        chapitres: [
          'Probabilités (conditionnelle P(A|B), indépendance, probabilités totales, arbre pondéré)',
          'Variables aléatoires discrètes (loi, espérance, variance, écart-type)',
          'Loi binomiale B(n,p) : P(X=k)=Cₙᵏ pᵏ(1-p)ⁿ⁻ᵏ',
          'Statistiques (moyenne, variance, écart-type, histogrammes, diagrammes)',
        ],
      },
    ],
    nbCh: 16,
    nbThm: 95,
    nbEx: 78,
    note: 'Programme officiel CNP — source : tadris.tn & bac.org.tn',
  },
]

// ──────────────────────────────────────────────────────────────
//  DONNÉES PHYSIQUE-CHIMIE — Programme officiel CNP
// ──────────────────────────────────────────────────────────────

const SECTIONS_PC = [
  {
    slug: 'maths',
    icon: '📐',
    titre: 'Section Mathématiques',
    coeff: 'Coefficient 3',
    couleur: '#4f6ef7',
    gradient: 'linear-gradient(135deg,rgba(79,110,247,0.15),rgba(124,58,237,0.08))',
    border: 'rgba(79,110,247,0.25)',
    physique: {
      label: '⚡ Physique — 10 chapitres',
      chapitres: [
        { titre: 'Mécanique', sous: 'Cinématique · Dynamique (Newton) · Satellites & Kepler' },
        { titre: 'Électricité & Électromagnétisme', sous: 'Champ électrique · Champ magnétique · Induction' },
        { titre: 'Optique', sous: 'Lentilles minces · Ondes lumineuses · Diffraction & Interférences' },
        { titre: 'Dipôle RC', sous: 'Condensateur, charge/décharge, uC(t)=E(1-e^{-t/τ}), τ=RC' },
        { titre: 'Dipôle RL', sous: 'Bobine, auto-induction, i(t)=(E/R)(1-e^{-t/τ}), τ=L/R' },
        { titre: 'Oscillations électriques libres', sous: 'Circuit RLC, régime pseudo-périodique, T₀=2π√(LC)' },
        { titre: 'Oscillations forcées — RLC', sous: 'Résonance, bande passante, facteur de qualité Q' },
        { titre: 'Filtres électriques', sous: 'Passe-bas, passe-haut, passe-bande, fréquence de coupure fc' },
        { titre: 'Ondes mécaniques progressives', sous: 'Célérité, retard temporel, v=λf, double périodicité' },
        { titre: 'Ondes lumineuses (section Maths)', sous: 'Diffraction, interférences (Young), i=λD/a' },
      ],
    },
    chimie: {
      label: '🧪 Chimie — 2 thèmes · 7 chapitres',
      chapitres: [
        { titre: 'Transformation de la matière', sous: 'Rédox & piles · Acide-base & pH · Cinétique · Équilibre chimique (Le Chatelier)' },
        { titre: 'Chimie organique', sous: 'Structure des molécules · Réactions organiques · Polymères' },
      ],
    },
    nbCh: 15,
    coeff_phys: 3,
    coeff_chim: 2,
  },
  {
    slug: 'sciences-exp',
    icon: '🔬',
    titre: 'Section Sciences Expérimentales',
    coeff: 'Coefficient 4',
    couleur: '#06d6a0',
    gradient: 'linear-gradient(135deg,rgba(6,214,160,0.12),rgba(5,154,114,0.06))',
    border: 'rgba(6,214,160,0.25)',
    physique: {
      label: '⚡ Physique — 9 chapitres',
      chapitres: [
        { titre: 'Dipôle RC', sous: 'Condensateur, charge/décharge, τ = RC' },
        { titre: 'Dipôle RL', sous: 'Bobine, induction, τ = L/R' },
        { titre: 'Oscillations électriques libres', sous: 'Circuit LC, T₀ = 2π√(LC)' },
        { titre: 'Oscillations mécaniques libres', sous: 'Pendule, masse-ressort, énergie mécanique' },
        { titre: 'Ondes mécaniques progressives', sous: 'Célérité, λ = vT, propagation' },
        { titre: 'Ondes lumineuses', sous: 'Diffraction, interférences (Young), spectres' },
        { titre: 'Réactions nucléaires', sous: 'Radioactivité αβγ, fission, fusion' },
        { titre: 'Oscillations mécaniques forcées', sous: 'Résonance mécanique, x(t)=Xm sin(ωt+φ), bande passante' },
        { titre: 'Interaction onde-matière', sous: 'Effet photoélectrique E=hf, dualité onde-corpuscule, quantification' },
      ],
    },
    chimie: {
      label: '🧪 Chimie — 5 chapitres',
      chapitres: [
        { titre: 'Cinétique chimique', sous: 'Vitesse de réaction, catalyse, suivi temporel' },
        { titre: 'Équilibres chimiques', sous: "Taux d\'avancement, Qr, K, loi de modération" },
        { titre: 'Acides et bases', sous: 'pH, Ka, pKa, dosage acide-base' },
        { titre: 'Électrochimie', sous: 'Rédox, piles, électrolyse' },
        { titre: 'Chimie organique', sous: 'Composés carbonylés, estérification, polymères' },
      ],
    },
    nbCh: 14,
    coeff_phys: 4,
    coeff_chim: 3,
  },
  {
    slug: 'sciences-tech',
    icon: '⚙️',
    titre: 'Section Sciences Techniques',
    coeff: 'Coefficient 3',
    couleur: '#f59e0b',
    gradient: 'linear-gradient(135deg,rgba(245,158,11,0.12),rgba(217,119,6,0.06))',
    border: 'rgba(245,158,11,0.25)',
    physique: {
      label: '⚡ Physique — 10 chapitres',
      chapitres: [
        { titre: 'Dipôle RC', sous: 'Condensateur E=½CU², τ=RC, filtrage, temporisation' },
        { titre: 'Dipôle RL', sous: 'Bobine E=½LI², τ=L/R, lissage, protection' },
        { titre: 'Oscillations électriques libres', sous: 'Circuit LC, oscillateur, circuit accordé' },
        { titre: 'Oscillations mécaniques libres', sous: 'Pendule T=2π√(l/g), amortisseur, suspension' },
        { titre: 'Ondes mécaniques progressives', sous: 'Célérité, λ=vT, réflexion, réfraction' },
        { titre: 'Ondes lumineuses', sous: 'Diffraction, Young, laser, fibre optique' },
        { titre: 'Réactions nucléaires', sous: 'N=N₀e^(-λt), fission, fusion, centrale nucléaire' },
        { titre: 'Oscillations électriques forcées', sous: 'Résonance, i(t)=Im sin(ωt+φ), facteur de qualité Q' },
        { titre: 'Électronique', sous: 'Diodes (redressement), transistors (amplification, commutation)' },
        { titre: 'Interaction onde-matière', sous: 'Effet photoélectrique, quantification E=hf, spectres atomiques' },
      ],
    },
    chimie: {
      label: '🧪 Chimie — 5 chapitres',
      chapitres: [
        { titre: 'Cinétique chimique', sous: 'Vitesse, catalyse, industrie chimique' },
        { titre: 'Équilibres chimiques', sous: "Taux d\'avancement, K, synthèse Haber/Contact" },
        { titre: 'Acides et bases', sous: 'pH, Ka, dosage, contrôle qualité' },
        { titre: 'Électrochimie', sous: 'Rédox, piles, électrolyse, corrosion, batterie' },
        { titre: 'Chimie organique', sous: 'Estérification, polymères, biocarburants' },
      ],
    },
    nbCh: 15,
    coeff_phys: 3,
    coeff_chim: 2,
  },
  {
    slug: 'informatique',
    icon: '💻',
    titre: "Section Informatique",
    coeff: 'Coefficient 3',
    couleur: '#8b5cf6',
    gradient: 'linear-gradient(135deg,rgba(139,92,246,0.12),rgba(109,40,217,0.06))',
    border: 'rgba(139,92,246,0.25)',
    physique: {
      label: "⚡ Physique — 10 chapitres",
      chapitres: [
        { titre: "Condensateur", sous: "Charge, décharge, capacité, énergie électrostatique E=½CU²" },
        { titre: "Dipôle RC", sous: "Équation différentielle, constante de temps τ=RC, intensité du courant" },
        { titre: "Bobine & Dipôle RL", sous: "Courant induit, loi de Lenz, auto-induction, τ=L/R, rupture du courant" },
        { titre: "Oscillations électriques libres", sous: "RLC amorties, LC non amorties, T₀=2π√(LC), équation différentielle" },
        { titre: "Ondes mécaniques progressives", sous: "Célérité v, retard temporel, λ=vT, types d'ondes" },
        { titre: "Ondes et optique", sous: "Diffraction, dispersion, spectres atomiques" },
        { titre: "Physique nucléaire", sous: "Noyau, radioactivité αβγ, fission, fusion, N(t)=N₀e^(-λt)" },
        { titre: "Oscillations électriques forcées", sous: "Résonance, courbe de résonance, facteur de qualité Q" },
        { titre: "Filtres électriques", sous: "Passe-bas, passe-haut, passe-bande, diagrammes de Bode, traitement du signal" },
        { titre: "Multivibrateurs & Électronique", sous: "Multivibrateur astable, signal carré, transistors, horloge électronique" },
      ],
    },
    chimie: {
      label: "🧪 Chimie — 6 chapitres",
      chapitres: [
        { titre: "Acides-bases", sous: "Couples acide/base, dosages, titrages, pH, Ka, pKa" },
        { titre: "Cinétique chimique", sous: "Vitesse de réaction, facteurs influents, suivi temporel" },
        { titre: "Transformations chimiques", sous: "Estérification, formation d'amides, réversibilité" },
        { titre: "Équilibre chimique", sous: "Loi de Le Chatelier, constantes d'équilibre Kéq" },
        { titre: "Électrochimie", sous: "Piles électrochimiques, électrolyse, applications industrielles" },
        { titre: "Tableau d'avancement", sous: "Avancement x, taux de conversion τ, état final, rendement" },
      ],
    },
    nbCh: 16,
    coeff_phys: 3,
    coeff_chim: 2,
  },
]

// ──────────────────────────────────────────────────────────────
//  DONNÉES SVT — Programme officiel CNP Tunisie
//  2 sections uniquement : Sciences Expérimentales & Mathématiques
// ──────────────────────────────────────────────────────────────

const SECTIONS_SVT = [
  {
    slug: 'sciences-exp',
    icon: '🔬',
    titre: 'Section Sciences Expérimentales',
    coeff: 'Coefficient 5',
    couleur: '#22c55e',
    gradient: 'linear-gradient(135deg,rgba(34,197,94,0.13),rgba(16,185,129,0.07))',
    border: 'rgba(34,197,94,0.28)',
    tomes: [
      {
        label: 'THÈME I — Génétique & Reproduction (4 chapitres)',
        chapitres: [
          'Le brassage de l\'information génétique (méiose · brassage interchromosomique · crossing-over · diversité)',
          'La transmission de l\'information génétique (lois de Mendel · monohybridisme · dihybridisme · hérédité liée au sexe · risque consanguinité · diagnostic prénatal)',
          'Les mutations (mutations géniques · chromosomiques · conséquences biologiques)',
          'Génétique des populations (fréquences alléliques · équilibre Hardy-Weinberg · dérive génétique)',
        ],
      },
      {
        label: 'THÈME II — Milieu intérieur & Neurophysiologie (5 chapitres)',
        chapitres: [
          'La constance du milieu intérieur (compartiments liquidiens · plasma · liquide interstitiel · constantes biologiques)',
          'La régulation de la glycémie (rôle du foie · insuline & glucagon · rétrocontrôle négatif · diabète type 1 & 2)',
          'Le système nerveux et la régulation (neurone · potentiel de repos · potentiel d\'action · transmission synaptique · réflexe myotatique · PPSE & PPSI)',
          'Défense de l\'organisme (immunité non spécifique · phagocytose · immunité spécifique humorale & cellulaire · mémoire · vaccination · sérothérapie)',
          'Hygiène du système nerveux (drogues · effets sur le SN · stress · mesures de protection)',
        ],
      },
      {
        label: 'THÈME III — Reproduction humaine & Santé (3 chapitres)',
        chapitres: [
          'La fonction reproductrice chez l\'homme (spermatogenèse · structure spermatozoïde · testostérone · complexe hypothalamo-hypophysaire)',
          'La fonction reproductrice chez la femme (folliculogenèse · ovogenèse · cycle ovarien & utérin · régulation hormonale · GnRH)',
          'La fécondation et la procréation (capacitation · étapes fécondation · contraception · FIVETE · hygiène procréation)',
        ],
      },
      {
        label: 'THÈME IV — Nutrition & Environnement (2 chapitres)',
        chapitres: [
          'Nutrition animale (digestion glucides/protides/lipides · enzymes digestives · absorption · respiration cellulaire · cycle de Krebs · ATP)',
          'Nutrition végétale (absorption eau & sels minéraux · transpiration · photosynthèse · chlorophylle · photolyse de l\'eau · facteurs environnementaux · amélioration production)',
        ],
      },
    ],
    nbCh: 14,
    nbThm: 120,
    nbEx: 95,
    note: '★ Coefficient 5 — matière principale en Sciences Expérimentales',
  },
  {
    slug: 'mathematique',
    icon: '📐',
    titre: 'Section Mathématiques',
    coeff: 'Coefficient 2',
    couleur: '#a78bfa',
    gradient: 'linear-gradient(135deg,rgba(167,139,250,0.13),rgba(139,92,246,0.07))',
    border: 'rgba(167,139,250,0.28)',
    tomes: [
      {
        label: 'THÈME I — Génétique (2 chapitres)',
        chapitres: [
          'Le brassage de l\'information génétique (méiose · brassage interchromosomique & intrachromosomique · crossing-over · diversité génétique)',
          'Transmission & hérédité (lois de Mendel · dihybridisme · hérédité liée au sexe · risque consanguinité · diagnostic prénatal · sonde moléculaire)',
        ],
      },
      {
        label: 'THÈME II — Milieu intérieur & Neurophysiologie (5 chapitres)',
        chapitres: [
          'La constance du milieu intérieur (compartiments liquidiens · constantes biologiques · troubles liés aux variations)',
          'La régulation de la glycémie (rôle du foie · insuline & glucagon · rétrocontrôle négatif · diabète type 1 & 2)',
          'Le système nerveux et la régulation (neurone · potentiel de repos · potentiel d\'action ionique · synapse · réflexe myotatique · muscles antagonistes)',
          'Défense de l\'organisme (immunité non spécifique · phagocytose · immunité spécifique · vaccination · sérothérapie)',
          'Hygiène du système nerveux (drogues — cocaïne · effets nocifs sur le SN · stress · mesures de protection)',
        ],
      },
      {
        label: 'THÈME III — Reproduction humaine & Santé (3 chapitres)',
        chapitres: [
          'La fonction reproductrice chez l\'homme (structure spermatozoïde · spermatogenèse · méiose · testostérone · régulation)',
          'La fonction reproductrice chez la femme (folliculogenèse · ovogenèse · structure ovocyte · cycle sexuel · régulation hypothalamo-hypophysaire)',
          'La fécondation et la procréation (conditions fécondation · étapes · contraception · FIVETE · hygiène procréation)',
        ],
      },
      {
        label: 'THÈME IV — Nutrition & Environnement (2 chapitres)',
        chapitres: [
          'Nutrition animale (digestion enzymatique · absorption des nutriments · respiration cellulaire · cycle de Krebs simplifié · bilan ATP)',
          'Nutrition végétale (absorption eau · sels minéraux N/P/K/Mg/Fe · photosynthèse · photolyse eau · intensité photosynthétique · amélioration production)',
        ],
      },
      {
        label: 'THÈME V — Géologie & Évolution (1 chapitre)',
        chapitres: [
          'Évolution biologique & Géologie (théories évolution · sélection naturelle · preuves fossiles & ADN · spéciation · tectonique des plaques · séismes · volcanisme)',
        ],
      },
    ],
    nbCh: 13,
    nbThm: 88,
    nbEx: 70,
    note: '★ Coefficient 2 — programme allégé par rapport à Sciences Expérimentales',
  },
]

// ──────────────────────────────────────────────────────────────
//  COMPOSANT CARTE SVT
// ──────────────────────────────────────────────────────────────
function CarteSVT({ sec }: { sec: typeof SECTIONS_SVT[0] }) {
  return (
    <div style={{
      background: sec.gradient,
      border: `1.5px solid ${sec.border}`,
      borderRadius: 20,
      padding: '28px 32px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* En-tête */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 20 }}>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <div style={{ fontSize: 38 }}>{sec.icon}</div>
          <div>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 4, flexWrap: 'wrap' }}>
              <h2 style={{ fontSize: 'clamp(17px,2.5vw,22px)', margin: 0 }}>{sec.titre}</h2>
              <span style={{ background: `${sec.couleur}25`, color: sec.couleur, fontSize: 11, fontFamily: 'var(--font-mono)', padding: '3px 10px', borderRadius: 20 }}>{sec.coeff}</span>
            </div>
            {(sec as any).note && (
              <div style={{ fontSize: 11, color: 'var(--muted)', fontStyle: 'italic', marginTop: 2 }}>{(sec as any).note}</div>
            )}
          </div>
        </div>
        <div style={{ display: 'flex', gap: 12, fontSize: 12, color: 'var(--muted)', flexWrap: 'wrap' }}>
          <span>📚 {sec.nbCh} chapitres</span>
          <span>·</span>
          <span>🔬 {sec.nbThm}+ concepts</span>
          <span>·</span>
          <span>📝 {sec.nbEx}+ exercices</span>
        </div>
      </div>

      {/* Thèmes */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))', gap: 14, marginBottom: 20 }}>
        {sec.tomes.map((tome, ti) => (
          <div key={ti} style={{ background: 'rgba(0,0,0,0.15)', borderRadius: 14, padding: '14px 16px' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 12, color: sec.couleur, marginBottom: 8 }}>
              {tome.label}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {tome.chapitres.map((ch, ci) => (
                <div key={ci} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', fontSize: 11, color: 'var(--text2)', lineHeight: 1.5 }}>
                  <span style={{ color: sec.couleur, fontSize: 9, marginTop: 3, flexShrink: 0 }}>▸</span>
                  <span>{ch}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Bouton */}
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        <Link
          href={`/bac/svt/${sec.slug}`}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            background: `linear-gradient(135deg,${sec.couleur},${sec.couleur}cc)`, color: 'white',
            padding: '9px 20px', borderRadius: 11,
            fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 12,
            textDecoration: 'none', transition: 'opacity 0.2s',
          }}
          onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
          onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
        >
          📚 Cours complets →
        </Link>
      </div>
    </div>
  )
}

// ──────────────────────────────────────────────────────────────
//  COMPOSANT CARTE SECTION MATHS
// ──────────────────────────────────────────────────────────────
function CarteMaths({ sec }: { sec: typeof SECTIONS_MATHS[0] }) {
  return (
    <div style={{
      background: sec.gradient,
      border: `1.5px solid ${sec.border}`,
      borderRadius: 20,
      padding: '28px 32px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {(sec as any).isNew && (
        <div style={{ position: 'absolute', top: 20, right: 20, background: 'linear-gradient(135deg,#6366f1,#a78bfa)', color: 'white', fontSize: 10, fontWeight: 800, padding: '3px 12px', borderRadius: 20, letterSpacing: '0.08em' }}>
          NOUVEAU
        </div>
      )}

      {/* En-tête */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 20 }}>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <div style={{ fontSize: 38 }}>{sec.icon}</div>
          <div>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 4, flexWrap: 'wrap' }}>
              <h2 style={{ fontSize: 'clamp(17px,2.5vw,22px)', margin: 0 }}>{sec.titre}</h2>
              <span style={{ background: `${sec.couleur}25`, color: sec.couleur, fontSize: 11, fontFamily: 'var(--font-mono)', padding: '3px 10px', borderRadius: 20 }}>{sec.coeff}</span>
            </div>
            {(sec as any).note && (
              <div style={{ fontSize: 11, color: 'var(--muted)', fontStyle: 'italic', marginTop: 2 }}>{(sec as any).note}</div>
            )}
          </div>
        </div>
        <div style={{ display: 'flex', gap: 12, fontSize: 12, color: 'var(--muted)', flexWrap: 'wrap' }}>
          <span>📚 {sec.nbCh} chapitres</span>
          <span>·</span>
          <span>📐 {sec.nbThm}+ concepts</span>
          <span>·</span>
          <span>📝 {sec.nbEx}+ exercices</span>
        </div>
      </div>

      {/* Tomes */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))', gap: 14, marginBottom: 20 }}>
        {sec.tomes.map((tome, ti) => (
          <div key={ti} style={{ background: 'rgba(0,0,0,0.15)', borderRadius: 14, padding: '14px 16px' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 12, color: sec.couleur, marginBottom: 8 }}>
              {tome.label}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {tome.chapitres.map((ch, ci) => (
                <div key={ci} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', fontSize: 11, color: 'var(--text2)', lineHeight: 1.5 }}>
                  <span style={{ color: sec.couleur, fontSize: 9, marginTop: 3, flexShrink: 0 }}>▸</span>
                  <span>{ch}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Bouton */}
      <Link
        href={`/bac/${sec.slug}`}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: sec.couleur, color: 'white',
          padding: '10px 22px', borderRadius: 12,
          fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 13,
          textDecoration: 'none', transition: 'opacity 0.2s',
        }}
        onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
        onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
      >
        Voir tous les chapitres →
      </Link>
    </div>
  )
}

// ──────────────────────────────────────────────────────────────
//  COMPOSANT CARTE SECTION PHYSIQUE-CHIMIE
// ──────────────────────────────────────────────────────────────
function CartePC({ sec }: { sec: typeof SECTIONS_PC[0] }) {
  return (
    <div style={{
      background: sec.gradient,
      border: `1.5px solid ${sec.border}`,
      borderRadius: 20,
      padding: '28px 32px',
      position: 'relative',
    }}>
      {/* En-tête */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 22 }}>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <div style={{ fontSize: 38 }}>{sec.icon}</div>
          <div>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 4, flexWrap: 'wrap' }}>
              <h2 style={{ fontSize: 'clamp(17px,2.5vw,22px)', margin: 0 }}>{sec.titre}</h2>
              <span style={{ background: `${sec.couleur}25`, color: sec.couleur, fontSize: 11, fontFamily: 'var(--font-mono)', padding: '3px 10px', borderRadius: 20 }}>
                Phys. Coeff. {sec.coeff_phys} · Chim. Coeff. {sec.coeff_chim}
              </span>
            </div>
          </div>
        </div>
        <div style={{ fontSize: 12, color: 'var(--muted)' }}>
          ⚗️ {sec.physique.chapitres.length} ch. Physique · 🧪 {sec.chimie.chapitres.length} ch. Chimie
        </div>
      </div>

      {/* Physique + Chimie */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 20 }}>
        {/* Physique */}
        <div style={{ background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.2)', borderRadius: 14, padding: '14px 16px' }}>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 12, color: '#818cf8', marginBottom: 10 }}>
            {sec.physique.label}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {sec.physique.chapitres.map((ch, i) => (
              <Link key={i} href={`/bac/physique/${sec.slug}/${ch.titre.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'')}`}
                style={{ textDecoration:'none', display:'block' }}>
                <div style={{ fontSize: 11, padding:'3px 6px', borderRadius:6, cursor:'pointer', transition:'background 0.15s' }}
                  onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.background='rgba(99,102,241,0.1)'}}
                  onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.background='transparent'}}>
                  <span style={{ color: '#818cf8', fontWeight: 600 }}>{ch.titre} →</span>
                  <span style={{ color: 'var(--muted)', display: 'block', fontSize: 10, marginTop: 1, lineHeight: 1.4 }}>{ch.sous}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
        {/* Chimie */}
        <div style={{ background: 'rgba(6,214,160,0.06)', border: '1px solid rgba(6,214,160,0.2)', borderRadius: 14, padding: '14px 16px' }}>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 12, color: '#06d6a0', marginBottom: 10 }}>
            {sec.chimie.label}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {sec.chimie.chapitres.map((ch, i) => (
              <div key={i} style={{ fontSize: 11 }}>
                <span style={{ color: '#06d6a0', fontWeight: 600 }}>{ch.titre}</span>
                <span style={{ color: 'var(--muted)', display: 'block', fontSize: 10, marginTop: 1, lineHeight: 1.4 }}>{ch.sous}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bouton */}
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        <Link
          href={`/bac/physique/${sec.slug}`}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            background: 'linear-gradient(135deg,#ef4444,#dc2626)', color: 'white',
            padding: '9px 20px', borderRadius: 11,
            fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 12,
            textDecoration: 'none', transition: 'opacity 0.2s',
          }}
          onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
          onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
        >
          📚 Cours complets →
        </Link>
      </div>
    </div>
  )
}

// ──────────────────────────────────────────────────────────────
//  PAGE PRINCIPALE
// ──────────────────────────────────────────────────────────────
export default function BacTunisiePage() {
  const [matiere, setMatiere] = useState<Matiere>(null)

  // ── PAGE INTERMÉDIAIRE ──────────────────────────────────────
  if (matiere === null) {
    return (
      <>
        <Navbar />
        <main style={{ position: 'relative', zIndex: 1, paddingTop: 80, minHeight: '100vh' }}>
          <div className="container" style={{ paddingTop: 64, paddingBottom: 80, maxWidth: 960 }}>

            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: 56 }}>
              <span className="label" style={{ marginBottom: 12, display: 'inline-block' }}>
                🇹🇳 Programme officiel CNP Tunisie
              </span>
              <h1 style={{ fontSize: 'clamp(28px,4vw,50px)', marginBottom: 16, lineHeight: 1.15 }}>
                Bac Tunisie — 4ème Année<br />
                <span style={{ background: 'linear-gradient(90deg,#4f6ef7,#06d6a0)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  Choisissez votre matière
                </span>
              </h1>
              <p style={{ color: 'var(--text2)', fontSize: 15, maxWidth: 520, margin: '0 auto', lineHeight: 1.7 }}>
                Tous les chapitres du programme officiel CNP, théorèmes, définitions, formules et exercices type Bac.
              </p>
            </div>

            {/* Cartes matières */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 20, marginBottom: 52 }}>

              {/* MATHÉMATIQUES */}
              <button
                onClick={() => setMatiere('maths')}
                style={{ padding: '36px 28px', background: 'rgba(79,110,247,0.06)', border: '1.5px solid rgba(79,110,247,0.22)', borderRadius: 20, cursor: 'pointer', textAlign: 'left', transition: 'all 0.22s', fontFamily: 'var(--font-body)' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.borderColor = 'rgba(79,110,247,0.55)'; e.currentTarget.style.background = 'rgba(79,110,247,0.11)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.borderColor = 'rgba(79,110,247,0.22)'; e.currentTarget.style.background = 'rgba(79,110,247,0.06)' }}
              >
                <div style={{ fontSize: 52, marginBottom: 14 }}>📐</div>
                <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 8, color: '#818cf8' }}>Mathématiques</h2>
                <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.65, margin: '0 0 18px' }}>
                  Analyse · Algèbre · Géométrie · Probabilités<br />
                  5 sections : Maths · Sc.Exp · Sc.Tech · EG · Info
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 20 }}>
                  {['Sc. Maths', 'Sc. Exp', 'Sc. Tech', 'Éco-Gestion', 'Informatique'].map(t => (
                    <span key={t} style={{ fontSize: 10, padding: '3px 9px', borderRadius: 20, background: 'rgba(79,110,247,0.12)', color: '#818cf8', fontWeight: 600 }}>{t}</span>
                  ))}
                </div>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: '#818cf8', fontWeight: 700, fontSize: 13 }}>
                  Voir les programmes →
                </span>
              </button>

              {/* PHYSIQUE-CHIMIE */}
              <button
                onClick={() => setMatiere('physique-chimie')}
                style={{ padding: '36px 28px', background: 'rgba(6,214,160,0.06)', border: '1.5px solid rgba(6,214,160,0.22)', borderRadius: 20, cursor: 'pointer', textAlign: 'left', transition: 'all 0.22s', fontFamily: 'var(--font-body)' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.borderColor = 'rgba(6,214,160,0.55)'; e.currentTarget.style.background = 'rgba(6,214,160,0.11)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.borderColor = 'rgba(6,214,160,0.22)'; e.currentTarget.style.background = 'rgba(6,214,160,0.06)' }}
              >
                <div style={{ fontSize: 52, marginBottom: 14 }}>⚗️</div>
                <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 8, color: '#06d6a0' }}>Physique-Chimie</h2>
                <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.65, margin: '0 0 18px' }}>
                  Physique · Chimie — Programme complet<br />
                  4 sections : Maths · Sc.Exp · Sc.Tech · EG
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 20 }}>
                  {['Sc. Maths', 'Sc. Exp', 'Sc. Tech', 'Éco-Gestion'].map(t => (
                    <span key={t} style={{ fontSize: 10, padding: '3px 9px', borderRadius: 20, background: 'rgba(6,214,160,0.12)', color: '#06d6a0', fontWeight: 600 }}>{t}</span>
                  ))}
                </div>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: '#06d6a0', fontWeight: 700, fontSize: 13 }}>
                  Voir les programmes →
                </span>
              </button>

              {/* INFORMATIQUE */}
              <button
                onClick={() => setMatiere('informatique')}
                style={{ padding: '36px 28px', background: 'rgba(99,102,241,0.06)', border: '1.5px solid rgba(99,102,241,0.25)', borderRadius: 20, cursor: 'pointer', textAlign: 'left', transition: 'all 0.22s', fontFamily: 'var(--font-body)', position: 'relative' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.borderColor = 'rgba(99,102,241,0.55)'; e.currentTarget.style.background = 'rgba(99,102,241,0.11)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.borderColor = 'rgba(99,102,241,0.25)'; e.currentTarget.style.background = 'rgba(99,102,241,0.06)' }}
              >
                <div style={{ position: 'absolute', top: 16, right: 16, background: 'linear-gradient(135deg,#6366f1,#a78bfa)', color: 'white', fontSize: 9, fontWeight: 800, padding: '2px 10px', borderRadius: 20, letterSpacing: '0.08em' }}>NOUVEAU</div>
                <div style={{ fontSize: 52, marginBottom: 14 }}>💻</div>
                <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 8, color: '#818cf8' }}>Informatique</h2>
                <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.65, margin: '0 0 18px' }}>
                  Algorithmique · Bases de données · TIC<br />
                  Section Info + TIC commun toutes sections
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 20 }}>
                  {['Sc. Informatiques', 'Autres sections (TIC)'].map(t => (
                    <span key={t} style={{ fontSize: 10, padding: '3px 9px', borderRadius: 20, background: 'rgba(99,102,241,0.12)', color: '#818cf8', fontWeight: 600 }}>{t}</span>
                  ))}
                </div>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: '#818cf8', fontWeight: 700, fontSize: 13 }}>
                  Voir les programmes →
                </span>
              </button>

              {/* ANGLAIS */}
              <button
                onClick={() => setMatiere('anglais')}
                style={{ padding: '36px 28px', background: 'rgba(245,158,11,0.06)', border: '1.5px solid rgba(245,158,11,0.22)', borderRadius: 20, cursor: 'pointer', textAlign: 'left', transition: 'all 0.22s', fontFamily: 'var(--font-body)', position: 'relative' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.borderColor = 'rgba(245,158,11,0.55)'; e.currentTarget.style.background = 'rgba(245,158,11,0.11)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.borderColor = 'rgba(245,158,11,0.22)'; e.currentTarget.style.background = 'rgba(245,158,11,0.06)' }}
              >
                <div style={{ position: 'absolute', top: 16, right: 16, background: 'linear-gradient(135deg,#f59e0b,#d97706)', color: 'white', fontSize: 9, fontWeight: 800, padding: '2px 10px', borderRadius: 20, letterSpacing: '0.08em' }}>NOUVEAU</div>
                <div style={{ fontSize: 52, marginBottom: 14 }}>🇬🇧</div>
                <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 8, color: '#fbbf24' }}>Anglais</h2>
                <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.65, margin: '0 0 18px' }}>
                  4 Units · Reading · Writing · Grammar<br />
                  Programme unique — toutes sections
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 20 }}>
                  {['🔬 Sciences', '📊 Éco-Gestion', '📚 Lettres'].map(t => (
                    <span key={t} style={{ fontSize: 10, padding: '3px 9px', borderRadius: 20, background: 'rgba(245,158,11,0.12)', color: '#fbbf24', fontWeight: 600 }}>{t}</span>
                  ))}
                </div>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: '#fbbf24', fontWeight: 700, fontSize: 13 }}>
                  Voir les Units →
                </span>
              </button>

              {/* SVT */}
              <button
                onClick={() => setMatiere('svt')}
                style={{ padding: '36px 28px', background: 'rgba(34,197,94,0.06)', border: '1.5px solid rgba(34,197,94,0.22)', borderRadius: 20, cursor: 'pointer', textAlign: 'left', transition: 'all 0.22s', fontFamily: 'var(--font-body)', position: 'relative' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.borderColor = 'rgba(34,197,94,0.55)'; e.currentTarget.style.background = 'rgba(34,197,94,0.11)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.borderColor = 'rgba(34,197,94,0.22)'; e.currentTarget.style.background = 'rgba(34,197,94,0.06)' }}
              >
                <div style={{ position: 'absolute', top: 16, right: 16, background: 'linear-gradient(135deg,#22c55e,#16a34a)', color: 'white', fontSize: 9, fontWeight: 800, padding: '2px 10px', borderRadius: 20, letterSpacing: '0.08em' }}>NOUVEAU</div>
                <div style={{ fontSize: 52, marginBottom: 14 }}>🌱</div>
                <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 8, color: '#4ade80' }}>SVT</h2>
                <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.65, margin: '0 0 18px' }}>
                  Sciences de la Vie et de la Terre<br />
                  2 sections : Sc.Exp · Mathématiques
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 20 }}>
                  <span style={{ fontSize: 10, padding: '3px 9px', borderRadius: 20, background: 'rgba(34,197,94,0.12)', color: '#22c55e', fontWeight: 600 }}>Sc. Expérimentales</span>
                  <span style={{ fontSize: 10, padding: '3px 9px', borderRadius: 20, background: 'rgba(167,139,250,0.12)', color: '#a78bfa', fontWeight: 600 }}>Mathématiques</span>
                </div>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: '#4ade80', fontWeight: 700, fontSize: 13 }}>
                  Voir les programmes →
                </span>
              </button>
            </div>

            {/* Stats globales */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, marginBottom: 40 }}>
              {[
                { num: '6', label: 'Matières', icon: '📚' },
                { num: '57+', label: 'Chapitres Maths', icon: '📐' },
                { num: '45+', label: 'Chapitres PC', icon: '⚗️' },
                { num: '27+', label: 'Chapitres SVT', icon: '🌱' },
              ].map(s => (
                <div key={s.label} className="card" style={{ textAlign: 'center', padding: '16px 10px' }}>
                  <div style={{ fontSize: 20, marginBottom: 6 }}>{s.icon}</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 22, color: 'var(--accent)' }}>{s.num}</div>
                  <div style={{ fontSize: 11, color: 'var(--muted)' }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Lien vers examens */}
            <div style={{ textAlign: 'center', paddingTop: 28, borderTop: '1px solid var(--border)' }}>
              <p style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 14 }}>Prêt pour le Bac ?</p>
              <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link href="/examens" className="btn btn-primary" style={{ textDecoration: 'none' }}>
                  📋 Examens Bac Tunisie →
                </Link>
                <Link href="/chat" className="btn btn-ghost" style={{ textDecoration: 'none' }}>
                  🤖 Chat IA →
                </Link>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  // ── PAGE MATHÉMATIQUES ──────────────────────────────────────
  if (matiere === 'maths') {
    return (
      <>
        <Navbar />
        <main style={{ position: 'relative', zIndex: 1, paddingTop: 80 }}>
          <div className="container" style={{ paddingTop: 40, paddingBottom: 80 }}>

            {/* Header avec retour */}
            <div style={{ marginBottom: 40 }}>
              <button
                onClick={() => setMatiere(null)}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 14px', borderRadius: 9, border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--muted)', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-body)', marginBottom: 16, transition: 'all 0.15s' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(79,110,247,0.45)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
              >
                ← Toutes les matières
              </button>
              <span className="label" style={{ marginBottom: 12, display: 'block' }}>
                🇹🇳 Programme officiel CNP Tunisie — 📐 Mathématiques
              </span>
              <h1 style={{ fontSize: 'clamp(26px,4vw,44px)', marginBottom: 12 }}>
                Mathématiques — Toutes Sections<br />
                <span style={{ color: 'var(--accent)' }}>Bac 4ème Année Secondaire</span>
              </h1>
              <p style={{ maxWidth: 580, color: 'var(--text2)', marginBottom: 20 }}>
                Programme officiel CNP mis à jour — Analyse · Algèbre · Géométrie · Probabilités · Graphes.
                Théorèmes, définitions, formules et exercices type Bac.
              </p>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <Link href="/examens" className="btn btn-secondary" style={{ textDecoration: 'none' }}>📋 Examens Bac</Link>
                <Link href="/chat" className="btn btn-ghost" style={{ textDecoration: 'none' }}>🤖 Chat IA →</Link>
              </div>
            </div>

            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14, marginBottom: 48 }}>
              {[
                { num: '5', label: 'Sections', icon: '🎓' },
                { num: '57+', label: 'Chapitres', icon: '📚' },
                { num: '547+', label: 'Concepts', icon: '📐' },
                { num: '442+', label: 'Exercices', icon: '📝' },
              ].map(s => (
                <div key={s.label} className="card" style={{ textAlign: 'center', padding: 20 }}>
                  <div style={{ fontSize: 22, marginBottom: 8 }}>{s.icon}</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 26, color: 'var(--accent)' }}>{s.num}</div>
                  <div style={{ fontSize: 12, color: 'var(--muted)' }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Sections Maths */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
              {SECTIONS_MATHS.map(sec => (
                <CarteMaths key={sec.slug} sec={sec} />
              ))}
            </div>

            {/* CTA bas */}
            <div style={{ marginTop: 52, background: 'linear-gradient(135deg,rgba(79,110,247,0.1),rgba(124,58,237,0.1))', border: '1px solid rgba(79,110,247,0.2)', borderRadius: 20, padding: 40, textAlign: 'center' }}>
              <h3 style={{ marginBottom: 12 }}>Prêt pour la simulation Bac ? 🎓</h3>
              <p style={{ marginBottom: 24, maxWidth: 400, margin: '0 auto 24px', color: 'var(--text2)' }}>
                Teste-toi avec un vrai sujet de Bac — chrono, correction automatique et note estimée.
              </p>
              <Link href="/examens" className="btn btn-primary btn-lg" style={{ textDecoration: 'none' }}>Passer une simulation →</Link>
            </div>

            {/* Switcher vers PC */}
            <div style={{ marginTop: 32, textAlign: 'center' }}>
              <button
                onClick={() => setMatiere('physique-chimie')}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 20px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, cursor: 'pointer', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 13, color: 'var(--muted)', transition: 'all 0.18s' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(6,214,160,0.4)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
              >
                ⚗️ Voir Physique-Chimie →
              </button>
            </div>
          </div>
        </main>
        <Footer />
        <style>{`
          @media(max-width:700px){
            div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
            div[style*="repeat(4,1fr)"] { grid-template-columns: repeat(2,1fr) !important; }
          }
        `}</style>
      </>
    )
  }

  // ── PAGE PHYSIQUE-CHIMIE ────────────────────────────────────
  if (matiere === 'physique-chimie') {
  return (
    <>
      <Navbar />
      <main style={{ position: 'relative', zIndex: 1, paddingTop: 80 }}>
        <div className="container" style={{ paddingTop: 40, paddingBottom: 80 }}>

          {/* Header avec retour */}
          <div style={{ marginBottom: 40 }}>
            <button
              onClick={() => setMatiere(null)}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 14px', borderRadius: 9, border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--muted)', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-body)', marginBottom: 16, transition: 'all 0.15s' }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(6,214,160,0.45)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
            >
              ← Toutes les matières
            </button>
            <span className="label" style={{ marginBottom: 12, display: 'block' }}>
              🇹🇳 Programme officiel CNP Tunisie — ⚗️ Physique-Chimie
            </span>
            <h1 style={{ fontSize: 'clamp(26px,4vw,44px)', marginBottom: 12 }}>
              Physique-Chimie — Toutes Sections<br />
              <span style={{ color: '#06d6a0' }}>Bac 4ème Année Secondaire</span>
            </h1>
            <p style={{ maxWidth: 620, color: 'var(--text2)', marginBottom: 20 }}>
              Programme officiel CNP — Physique (Mécanique · Électromagnétisme · Optique · Oscillations · Ondes · Nucléaire)
              et Chimie (Cinétique · Équilibres · Acides-bases · Électrochimie · Organique).
            </p>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <Link href="/examens" className="btn btn-secondary" style={{ textDecoration: 'none' }}>📋 Examens Bac</Link>
              <Link href="/chat" className="btn btn-ghost" style={{ textDecoration: 'none' }}>🤖 Chat IA →</Link>
            </div>
          </div>

          {/* Légende coefficients */}
          <div style={{ background: 'rgba(6,214,160,0.06)', border: '1px solid rgba(6,214,160,0.2)', borderRadius: 14, padding: '14px 20px', marginBottom: 36, display: 'flex', gap: 20, flexWrap: 'wrap', fontSize: 12, color: 'var(--text2)' }}>
            <div><span style={{ color: '#818cf8', fontWeight: 700 }}>⚡ Physique</span> — coefficients selon la section</div>
            <div><span style={{ color: '#06d6a0', fontWeight: 700 }}>🧪 Chimie</span> — coefficients selon la section</div>
            <div style={{ color: 'var(--muted)', fontSize: 11 }}>Section Sc.Exp = plus fort coefficient global en PC</div>
          </div>

          {/* Sections PC */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
            {SECTIONS_PC.map(sec => (
              <CartePC key={sec.slug} sec={sec} />
            ))}
          </div>

          {/* Note programme */}
          <div style={{ marginTop: 40, background: 'rgba(6,214,160,0.05)', border: '1px solid rgba(6,214,160,0.18)', borderRadius: 14, padding: '16px 22px' }}>
            <p style={{ margin: 0, fontSize: 12, color: 'var(--text2)', lineHeight: 1.7 }}>
              <strong style={{ color: '#06d6a0' }}>ℹ️ Programme officiel CNP</strong> — Toutes les sections partagent un tronc commun en Physique
              (Dipôle RC/RL, oscillations, ondes, nucléaire) et en Chimie (cinétique, équilibres, acides-bases, électrochimie, organique).
              La section Mathématiques ajoute la Mécanique, l'Électromagnétisme et l'Optique géométrique.
            </p>
          </div>

          {/* Switcher vers Maths */}
          <div style={{ marginTop: 32, textAlign: 'center' }}>
            <button
              onClick={() => setMatiere('maths')}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 20px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, cursor: 'pointer', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 13, color: 'var(--muted)', transition: 'all 0.18s' }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(79,110,247,0.4)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
            >
              📐 Voir Mathématiques →
            </button>
          </div>
        </div>
      </main>
      <Footer />
      <style>{`
        @media(max-width:700px){
          div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
          div[style*="repeat(4,1fr)"] { grid-template-columns: repeat(2,1fr) !important; }
        }
      `}</style>
    </>
  )

  // ── PAGE INFORMATIQUE ────────────────────────────────────────────
  }

  if (matiere === 'informatique') {
    return (
      <>
        <Navbar />
        <main style={{ position: 'relative', zIndex: 1, paddingTop: 80 }}>
          <div className="container" style={{ paddingTop: 40, paddingBottom: 80 }}>
            <div style={{ marginBottom: 40 }}>
              <button
                onClick={() => setMatiere(null)}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 14px', borderRadius: 9, border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--muted)', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-body)', marginBottom: 16 }}
              >← Toutes les matières</button>
              <h1 style={{ fontSize: 'clamp(26px,4vw,44px)', marginBottom: 12 }}>
                💻 Informatique<br />
                <span style={{ color: '#818cf8' }}>Bac 4ème Année Secondaire</span>
              </h1>
              <p style={{ maxWidth: 640, color: 'var(--text2)', marginBottom: 20, lineHeight: 1.7 }}>
                Programme complet pour la <strong style={{ color: '#818cf8' }}>Section Sc. Informatiques</strong> (Algo + BD + TIC)
                et TIC commun pour les <strong style={{ color: '#f59e0b' }}>autres sections</strong>.
              </p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 20, marginBottom: 48 }}>
              <Link href="/bac/info/informatique" style={{ textDecoration: 'none' }}>
                <div style={{ background: 'rgba(99,102,241,0.08)', border: '1.5px solid rgba(99,102,241,0.3)', borderRadius: 20, padding: '28px 24px', transition: 'transform 0.2s' }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'}>
                  <span style={{ fontSize: 38 }}>💻</span>
                  <div style={{ fontWeight: 800, fontSize: 18, color: '#818cf8', margin: '12px 0 4px' }}>Section Sc. Informatiques</div>
                  <span style={{ fontSize: 11, background: 'rgba(99,102,241,0.15)', color: '#818cf8', padding: '2px 10px', borderRadius: 20 }}>Coefficient 4 · 16 chapitres</span>
                  <div style={{ margin: '14px 0 18px', display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {['🧮 Bloc 1 — Algorithmique & Programmation (6 ch.)','🗄️ Bloc 2 — Bases de données (6 ch.)','🌐 Bloc 3 — TIC (4 ch.)'].map(b => (
                      <div key={b} style={{ fontSize: 12, color: 'var(--text2)' }}>{b}</div>
                    ))}
                  </div>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'linear-gradient(135deg,#6366f1,#a78bfa)', color: 'white', padding: '9px 20px', borderRadius: 11, fontWeight: 700, fontSize: 13 }}>
                    📚 Voir les 16 chapitres →
                  </span>
                </div>
              </Link>
              <Link href="/bac/info/autres-sections" style={{ textDecoration: 'none' }}>
                <div style={{ background: 'rgba(245,158,11,0.08)', border: '1.5px solid rgba(245,158,11,0.25)', borderRadius: 20, padding: '28px 24px', transition: 'transform 0.2s' }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'}>
                  <span style={{ fontSize: 38 }}>🎓</span>
                  <div style={{ fontWeight: 800, fontSize: 18, color: '#f59e0b', margin: '12px 0 4px' }}>Autres Sections (TIC Commun)</div>
                  <span style={{ fontSize: 11, background: 'rgba(245,158,11,0.15)', color: '#f59e0b', padding: '2px 10px', borderRadius: 20 }}>Maths · Sc.Exp · Sc.Tech · Éco-Gestion</span>
                  <div style={{ margin: '14px 0 18px', display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {['🌐 Internet & Réseaux','💡 Web — HTML/CSS/JS','🖥️ Systèmes informatiques','🔒 Sécurité informatique'].map(t => (
                      <div key={t} style={{ fontSize: 12, color: 'var(--text2)' }}>{t}</div>
                    ))}
                  </div>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'linear-gradient(135deg,#f59e0b,#d97706)', color: 'white', padding: '9px 20px', borderRadius: 11, fontWeight: 700, fontSize: 13 }}>
                    🌐 Voir les 4 thèmes →
                  </span>
                </div>
              </Link>
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              <Link href="/examens" className="btn btn-secondary" style={{ textDecoration: 'none' }}>📋 Examens Bac →</Link>
              <Link href="/chat" className="btn btn-ghost" style={{ textDecoration: 'none' }}>🤖 Chat IA →</Link>
            </div>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  // ── PAGE ANGLAIS ──────────────────────────────────────────────
  if (matiere === 'anglais') {
    return (
      <>
        <Navbar />
        <main style={{ position: 'relative', zIndex: 1, paddingTop: 80 }}>
          <div className="container" style={{ paddingTop: 40, paddingBottom: 80 }}>

            {/* Retour */}
            <button
              onClick={() => setMatiere(null)}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 14px', borderRadius: 9, border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--muted)', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-body)', marginBottom: 16 }}
            >← Toutes les matières</button>

            <span className="label" style={{ marginBottom: 12, display: 'block' }}>
              🇹🇳 Programme officiel CNP Tunisie — 🇬🇧 Anglais
            </span>
            <h1 style={{ fontSize: 'clamp(26px,4vw,44px)', marginBottom: 12 }}>
              🇬🇧 Anglais — Toutes Sections<br />
              <span style={{ color: '#fbbf24' }}>Bac 4ème Année Secondaire</span>
            </h1>
            <p style={{ maxWidth: 620, color: 'var(--text2)', marginBottom: 24, lineHeight: 1.7 }}>
              Programme <strong style={{ color: '#fbbf24' }}>unique commun</strong> à toutes sections.
              4 Units · Reading · Writing · Grammar · Spécificités Sciences / Éco / Lettres.
            </p>

            {/* 2 cartes : Units + Spécificités */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 20, marginBottom: 48 }}>

              {/* Carte : 4 Units */}
              <Link href="/bac/anglais/toutes-sections" style={{ textDecoration: 'none' }}>
                <div style={{ background: 'rgba(245,158,11,0.08)', border: '1.5px solid rgba(245,158,11,0.28)', borderRadius: 20, padding: '28px 24px', transition: 'transform 0.2s', cursor: 'pointer' }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'}>
                  <span style={{ fontSize: 38 }}>📖</span>
                  <div style={{ fontWeight: 800, fontSize: 18, color: '#fbbf24', margin: '12px 0 4px' }}>
                    Programme complet — 4 Units
                  </div>
                  <span style={{ fontSize: 11, background: 'rgba(245,158,11,0.15)', color: '#fbbf24', padding: '2px 10px', borderRadius: 20 }}>
                    Toutes sections · 17 chapitres
                  </span>
                  <div style={{ margin: '14px 0 18px', display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {[
                      '🎨 Unit 1 — Art Shows & Holidaying',
                      '📚 Unit 2 — Education Matters',
                      '💡 Unit 3 — Creative & Inventive Minds',
                      '🌍 Unit 4 — Life Issues',
                    ].map(u => (
                      <div key={u} style={{ fontSize: 12, color: 'var(--text2)' }}>{u}</div>
                    ))}
                  </div>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'linear-gradient(135deg,#f59e0b,#d97706)', color: 'white', padding: '9px 20px', borderRadius: 11, fontWeight: 700, fontSize: 13 }}>
                    📚 Voir les 4 Units →
                  </span>
                </div>
              </Link>

              {/* Carte : Spécificités */}
              <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 20, padding: '28px 24px' }}>
                <span style={{ fontSize: 38 }}>✨</span>
                <div style={{ fontWeight: 800, fontSize: 18, color: 'var(--text)', margin: '12px 0 4px' }}>
                  Spécificités par section
                </div>
                <div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 14 }}>
                  Chaque chapitre contient un bloc adapté à votre section
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {[
                    { icon: '🔬', label: 'Sciences / Math / Info / Tech', desc: 'Logique · IA · Technologie · Vocab scientifique', color: '#6366f1' },
                    { icon: '📊', label: 'Éco-Gestion', desc: 'Économie · Business · Impact économique · Marché', color: '#10b981' },
                    { icon: '📚', label: 'Lettres', desc: 'Expression · Narration · Culture · Philosophie', color: '#ec4899' },
                  ].map(s => (
                    <div key={s.label} style={{ display: 'flex', gap: 10, padding: '10px 14px', borderRadius: 10, background: `${s.color}08`, border: `1px solid ${s.color}20` }}>
                      <span style={{ fontSize: 18, flexShrink: 0 }}>{s.icon}</span>
                      <div>
                        <div style={{ fontSize: 12, fontWeight: 700, color: s.color, marginBottom: 2 }}>{s.label}</div>
                        <div style={{ fontSize: 11, color: 'var(--muted)' }}>{s.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Accès direct aux Units */}
            <div style={{ marginBottom: 36 }}>
              <div style={{ fontSize: 12, color: 'var(--muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 14 }}>
                Accès direct aux chapitres
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(240px,1fr))', gap: 10 }}>
                {[
                  { slug: 'unit1-art-shows-holidaying',    label: '🎨 Unit 1 — Art Shows & Holidaying',     color: '#f59e0b' },
                  { slug: 'unit2-education-matters',       label: '📚 Unit 2 — Education Matters',          color: '#6366f1' },
                  { slug: 'unit3-creative-inventive-minds',label: '💡 Unit 3 — Creative & Inventive Minds', color: '#06d6a0' },
                  { slug: 'unit4-life-issues',             label: '🌍 Unit 4 — Life Issues',               color: '#ec4899' },
                ].map(u => (
                  <Link key={u.slug} href={`/bac/anglais/toutes-sections/${u.slug}`} style={{ textDecoration: 'none' }}>
                    <div style={{ padding: '12px 16px', borderRadius: 12, background: `${u.color}08`, border: `1px solid ${u.color}22`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', transition: 'transform 0.15s', cursor: 'pointer' }}
                      onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'}
                      onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'}>
                      <span style={{ fontSize: 13, fontWeight: 700, color: u.color }}>{u.label}</span>
                      <span style={{ color: u.color, fontWeight: 700 }}>→</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <Link href="/bac/anglais" className="btn btn-primary" style={{ textDecoration: 'none' }}>🇬🇧 Page Anglais complète →</Link>
              <Link href="/examens" className="btn btn-secondary" style={{ textDecoration: 'none' }}>📋 Examens Bac</Link>
              <Link href="/chat" className="btn btn-ghost" style={{ textDecoration: 'none' }}>🤖 Chat IA →</Link>
            </div>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  // ── PAGE SVT ──────────────────────────────────────────────────
  if (matiere === 'svt') {
    return (
      <>
        <Navbar />
        <main style={{ position: 'relative', zIndex: 1, paddingTop: 80 }}>
          <div className="container" style={{ paddingTop: 40, paddingBottom: 80 }}>

            {/* Retour */}
            <div style={{ marginBottom: 40 }}>
              <button
                onClick={() => setMatiere(null)}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 14px', borderRadius: 9, border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--muted)', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-body)', marginBottom: 16, transition: 'all 0.15s' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(34,197,94,0.45)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
              >
                ← Toutes les matières
              </button>
              <span className="label" style={{ marginBottom: 12, display: 'block' }}>
                🇹🇳 Programme officiel CNP Tunisie — 🌱 Sciences de la Vie et de la Terre
              </span>
              <h1 style={{ fontSize: 'clamp(26px,4vw,44px)', marginBottom: 12 }}>
                SVT — Sciences Expérimentales & Maths<br />
                <span style={{ color: '#4ade80' }}>Bac 4ème Année Secondaire</span>
              </h1>
              <p style={{ maxWidth: 620, color: 'var(--text2)', marginBottom: 20, lineHeight: 1.7 }}>
                Programme officiel CNP — Génétique · Neurophysiologie · Milieu intérieur · Reproduction humaine · Nutrition · Écologie.
                Disponible pour la <strong style={{ color: '#22c55e' }}>section Sciences Expérimentales</strong> (coeff. 5) et la <strong style={{ color: '#a78bfa' }}>section Mathématiques</strong> (coeff. 2).
              </p>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <Link href="/examens" className="btn btn-secondary" style={{ textDecoration: 'none' }}>📋 Examens Bac</Link>
                <Link href="/chat" className="btn btn-ghost" style={{ textDecoration: 'none' }}>🤖 Chat IA →</Link>
              </div>
            </div>

            {/* Stats SVT */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14, marginBottom: 48 }}>
              {[
                { num: '2', label: 'Sections', icon: '🎓' },
                { num: '27+', label: 'Chapitres', icon: '📚' },
                { num: '208+', label: 'Concepts', icon: '🔬' },
                { num: '165+', label: 'Exercices', icon: '📝' },
              ].map(s => (
                <div key={s.label} className="card" style={{ textAlign: 'center', padding: 20 }}>
                  <div style={{ fontSize: 20, marginBottom: 6 }}>{s.icon}</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 22, color: '#22c55e' }}>{s.num}</div>
                  <div style={{ fontSize: 11, color: 'var(--muted)' }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Note programme */}
            <div style={{ background: 'rgba(34,197,94,0.06)', border: '1px solid rgba(34,197,94,0.2)', borderRadius: 14, padding: '14px 20px', marginBottom: 36, display: 'flex', gap: 20, flexWrap: 'wrap', fontSize: 12, color: 'var(--text2)' }}>
              <div><span style={{ color: '#22c55e', fontWeight: 700 }}>🔬 Sc. Expérimentales</span> — Programme complet 4 thèmes · Coeff. 5</div>
              <div><span style={{ color: '#a78bfa', fontWeight: 700 }}>📐 Section Maths</span> — Programme allégé 5 thèmes · Coeff. 2</div>
              <div style={{ color: 'var(--muted)', fontSize: 11 }}>Thèmes II, III, IV identiques dans les deux sections</div>
            </div>

            {/* Cartes SVT */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
              {SECTIONS_SVT.map(sec => (
                <CarteSVT key={sec.slug} sec={sec} />
              ))}
            </div>

            {/* Switcher */}
            <div style={{ marginTop: 32, display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                onClick={() => setMatiere('maths')}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 20px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, cursor: 'pointer', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 13, color: 'var(--muted)', transition: 'all 0.18s' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(79,110,247,0.4)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
              >
                📐 Voir Mathématiques →
              </button>
              <button
                onClick={() => setMatiere('physique-chimie')}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 20px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, cursor: 'pointer', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 13, color: 'var(--muted)', transition: 'all 0.18s' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(6,214,160,0.4)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
              >
                ⚗️ Voir Physique-Chimie →
              </button>
            </div>

          </div>
        </main>
        <Footer />
        <style>{`
          @media(max-width:700px){
            div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
            div[style*="repeat(4,1fr)"] { grid-template-columns: repeat(2,1fr) !important; }
          }
        `}</style>
      </>
    )
  }

}
'use client'

import { useState, useRef } from 'react'

// ═══════════════════════════════════════════════════════
// DONNÉES — Programme CNP 4ème Mathématiques Tunisie
// Sources: Manuel CNP 222445 (T1) + 222446 (T2)
//          bac-done.com · sigmaths.net · devoirat.net · devoir.tn
// Structure confirmée par devoirat.net chapitres CNP officiels
// ═══════════════════════════════════════════════════════

const TOME1_CHAPTERS = [
  {
    id: 'ch1', num: 'CH 01', titre: 'Continuité et Limites', tome: 1,
    color: '#6366f1', icon: '∞',
    description: 'Limites, TVI, asymptotes, prolongement, croissances comparées',
    sections: [
      {
        titre: 'I. Limites de fonctions',
        theoremes: [
          { type: 'Définition', label: 'Limite en un point', enonce: 'Soit f définie sur un voisinage épointé de a. On dit que f admet pour limite ℓ en a si :\n∀ε > 0, ∃η > 0 tel que 0 < |x − a| < η ⟹ |f(x) − ℓ| < ε\nNotation : lim(x→a) f(x) = ℓ', remarque: 'La valeur f(a) est sans importance pour la limite.' },
          { type: 'Théorème', label: 'Unicité de la limite', enonce: 'Si lim(x→a) f(x) = ℓ et lim(x→a) f(x) = ℓ\', alors ℓ = ℓ\'.\nUne limite, si elle existe, est unique.' },
          { type: 'Théorème', label: 'Opérations sur les limites', enonce: 'Si lim f = ℓ et lim g = m (en a) :\n• lim(f+g) = ℓ+m\n• lim(f·g) = ℓ·m\n• lim(f/g) = ℓ/m  si m ≠ 0\n• lim f(g(x)) = f(m) si f continue en m', remarque: 'Formes indéterminées : ∞−∞, 0/0, ∞/∞, 0·∞ → lever l\'indétermination.' },
          { type: 'Théorème', label: 'Théorème des Gendarmes', enonce: 'Si g(x) ≤ f(x) ≤ h(x) au voisinage de a, et lim g = lim h = ℓ, alors lim f = ℓ.\nCas particulier : si |f(x)| ≤ h(x) et lim h = 0, alors lim f = 0.' },
          { type: 'Propriété', label: 'Croissances comparées', enonce: 'Quand x → +∞ :\n• eˣ/xⁿ → +∞  pour tout n ∈ ℕ\n• xⁿ/ln(x) → +∞  pour tout n > 0\n• ln(x)/xᵅ → 0  pour tout α > 0\nQuand x → 0⁺ :\n• xᵅ·|ln x| → 0  pour tout α > 0\nLimites fondamentales :\n• lim(x→0) sin(x)/x = 1\n• lim(x→0) (eˣ−1)/x = 1\n• lim(x→0) ln(1+x)/x = 1' }
        ]
      },
      {
        titre: 'II. Continuité',
        theoremes: [
          { type: 'Définition', label: 'Continuité en un point', enonce: 'f est continue en a si :\n1. f est définie en a\n2. lim(x→a) f(x) = f(a)\nf est continue sur I si elle est continue en tout point de I.' },
          { type: 'Théorème', label: 'Théorème des Valeurs Intermédiaires (TVI)', enonce: 'Si f est continue sur [a, b] et k est un réel entre f(a) et f(b),\nalors il existe c ∈ [a, b] tel que f(c) = k.', remarque: 'Corollaire (unicité) : Si de plus f est STRICTEMENT MONOTONE, alors c est unique.\nApplication : existence et unicité d\'une racine dans un intervalle.' },
          { type: 'Propriété', label: 'Prolongement par continuité', enonce: 'Si f est définie sur I \\ {a} et lim(x→a) f(x) = ℓ ∈ ℝ,\non prolonge f par continuité en posant f̃(a) = ℓ.\nExemple : f(x) = sin(x)/x → f̃(0) = 1' }
        ]
      },
      {
        titre: 'III. Branches infinies — Asymptotes',
        theoremes: [
          { type: 'Définition', label: 'Asymptote verticale', enonce: 'x = a est asymptote verticale ⟺ lim(x→a) |f(x)| = +∞\n(au moins d\'un côté).' },
          { type: 'Définition', label: 'Asymptote horizontale', enonce: 'y = ℓ est asymptote horizontale en +∞ ⟺ lim(x→+∞) f(x) = ℓ.\n(Idem en −∞).' },
          { type: 'Définition', label: 'Asymptote oblique', enonce: 'y = ax + b est asymptote oblique en +∞ ⟺ lim(x→+∞) [f(x) − (ax+b)] = 0.\nMéthode :\n• a = lim(x→+∞) f(x)/x\n• b = lim(x→+∞) [f(x) − ax]', remarque: 'Si lim f(x)/x = ∞, il y a une branche parabolique.' }
        ]
      }
    ]
  },
  {
    id: 'ch2', num: 'CH 02', titre: 'Suites Réelles', tome: 1,
    color: '#8b5cf6', icon: 'Σ',
    description: 'Suites arithmétiques, géométriques, convergence, suites adjacentes, récurrentes',
    sections: [
      {
        titre: 'I. Rappels — Suites arithmétiques et géométriques',
        theoremes: [
          { type: 'Définition', label: 'Suite arithmétique', enonce: '(uₙ) est arithmétique de raison r si uₙ₊₁ = uₙ + r.\n• Terme général : uₙ = u₀ + nr  ou  uₙ = u₁ + (n−1)r\n• Somme des n premiers termes :\n  S = n·(u₁ + uₙ)/2 = n·u₁ + n(n-1)r/2' },
          { type: 'Définition', label: 'Suite géométrique', enonce: '(uₙ) est géométrique de raison q ≠ 0 si uₙ₊₁ = q·uₙ.\n• Terme général : uₙ = u₀·qⁿ\n• Somme des n premiers termes :\n  Sₙ = u₁·(1−qⁿ)/(1−q)  si q ≠ 1\n  Sₙ = n·u₁  si q = 1', remarque: 'Si |q| < 1 : lim qⁿ = 0 ; si |q| > 1 : lim |qⁿ| = +∞' }
        ]
      },
      {
        titre: 'II. Convergence — Limites',
        theoremes: [
          { type: 'Définition', label: 'Suite convergente', enonce: '(uₙ) converge vers ℓ ∈ ℝ si :\n∀ε > 0, ∃N ∈ ℕ,  n ≥ N ⟹ |uₙ − ℓ| < ε\nNotation : lim(n→+∞) uₙ = ℓ\nSi aucune limite finie n\'existe, la suite est divergente.' },
          { type: 'Théorème', label: 'Opérations sur les limites', enonce: 'Si lim uₙ = ℓ et lim vₙ = m :\n• lim(uₙ+vₙ) = ℓ+m\n• lim(uₙ·vₙ) = ℓ·m\n• lim(uₙ/vₙ) = ℓ/m  (m ≠ 0)\nTableaux des formes indéterminées pour guider le calcul.' },
          { type: 'Théorème', label: 'Théorème des gendarmes pour suites', enonce: 'Si vₙ ≤ uₙ ≤ wₙ à partir d\'un certain rang,\net lim vₙ = lim wₙ = ℓ, alors lim uₙ = ℓ.' },
          { type: 'Théorème', label: 'Convergence des suites monotones bornées', enonce: '• Suite CROISSANTE et MAJORÉE → convergente\n• Suite DÉCROISSANTE et MINORÉE → convergente\n• Suite croissante non majorée → diverge vers +∞\n• Suite décroissante non minorée → diverge vers −∞', remarque: 'Ce théorème assure l\'existence de la limite sans la calculer explicitement.' },
          { type: 'Théorème', label: 'Suites adjacentes', enonce: '(uₙ) et (vₙ) sont ADJACENTES si :\n1. (uₙ) croissante\n2. (vₙ) décroissante\n3. lim(vₙ − uₙ) = 0\nAlors : elles convergent vers la même limite ℓ\net  uₙ ≤ ℓ ≤ vₙ  pour tout n.', remarque: 'Application typique : encadrement de π, de e, de √2...' }
        ]
      },
      {
        titre: 'III. Suites récurrentes uₙ₊₁ = f(uₙ)',
        theoremes: [
          { type: 'Théorème', label: 'Suites et fonctions', enonce: 'Si uₙ = f(n) où f est une fonction,\net lim(x→+∞) f(x) = ℓ, alors lim uₙ = ℓ.' },
          { type: 'Théorème', label: 'Point fixe d\'une suite récurrente', enonce: 'Si (uₙ) définie par uₙ₊₁ = f(uₙ) converge vers ℓ,\net si f est continue en ℓ, alors f(ℓ) = ℓ.\n(ℓ est un point fixe de f)', remarque: 'Méthode d\'étude :\n1. Étudier la monotonie et le bornage\n2. Conclure à la convergence\n3. Identifier la limite comme point fixe de f' },
          { type: 'Théorème', label: 'Image d\'une suite par une fonction continue', enonce: 'Si (uₙ) → ℓ et f est continue en ℓ, alors f(uₙ) → f(ℓ).' }
        ]
      }
    ]
  },
  {
    id: 'ch3', num: 'CH 03', titre: 'Dérivabilité', tome: 1,
    color: '#a855f7', icon: "f'",
    description: 'Dérivées, TAF, Rolle, L\'Hôpital, convexité, étude de fonctions',
    sections: [
      {
        titre: 'I. Définition et règles de dérivation',
        theoremes: [
          { type: 'Définition', label: 'Nombre dérivé', enonce: 'f est dérivable en a si la limite suivante est finie :\nf\'(a) = lim(h→0) [f(a+h) − f(a)] / h\nInterprétation géométrique : f\'(a) = pente de la tangente en (a, f(a)).\nÉquation de la tangente en a : y = f\'(a)(x−a) + f(a)', remarque: 'Dérivabilité à droite : lim(h→0⁺) [f(a+h)−f(a)]/h\nDérivabilité à gauche : lim(h→0⁻) [f(a+h)−f(a)]/h' },
          { type: 'Théorème', label: 'Dérivabilité implique continuité', enonce: 'f dérivable en a ⟹ f continue en a.\nRéciproque FAUSSE : f(x) = |x| continue en 0, non dérivable en 0.' },
          { type: 'Propriété', label: 'Dérivées usuelles', enonce: '• (xⁿ)\' = nxⁿ⁻¹         • (√x)\' = 1/(2√x)\n• (1/xⁿ)\' = −n/xⁿ⁺¹     • (eˣ)\' = eˣ\n• (aˣ)\' = aˣ ln a         • (ln x)\' = 1/x\n• (sin x)\' = cos x        • (cos x)\' = −sin x\n• (tan x)\' = 1/cos²x      • (arcsin x)\' = 1/√(1−x²)\n• (arccos x)\' = −1/√(1−x²) • (arctan x)\' = 1/(1+x²)' },
          { type: 'Propriété', label: 'Règles de dérivation', enonce: '• (u+v)\' = u\'+v\'  (linéarité)\n• (ku)\' = ku\'\n• (uv)\' = u\'v + uv\'  (Leibniz)\n• (u/v)\' = (u\'v − uv\') / v²\n• (f∘g)\' = (f\'∘g)·g\'  (composée)\n• (f⁻¹)\'(b) = 1/f\'(f⁻¹(b))  (réciproque)' }
        ]
      },
      {
        titre: 'II. Théorèmes fondamentaux',
        theoremes: [
          { type: 'Théorème', label: 'Théorème de Rolle', enonce: 'Hypothèses :\n• f continue sur [a, b]\n• f dérivable sur ]a, b[\n• f(a) = f(b)\nConclusion : ∃c ∈ ]a, b[ tel que f\'(c) = 0' },
          { type: 'Théorème', label: 'Théorème des Accroissements Finis (TAF)', enonce: 'Hypothèses :\n• f continue sur [a, b]\n• f dérivable sur ]a, b[\nConclusion : ∃c ∈ ]a, b[ tel que f(b)−f(a) = f\'(c)·(b−a)', remarque: 'Corollaires importants :\n• f\'(x) = 0 sur ]a,b[ ⟹ f constante\n• f\'(x) > 0 sur ]a,b[ ⟹ f strictement croissante\n• |f\'| ≤ M ⟹ |f(b)−f(a)| ≤ M·|b−a|  (inégalité des accroissements finis)' },
          { type: 'Théorème', label: 'Règle de L\'Hôpital', enonce: 'Si lim f(x) = lim g(x) = 0 (ou ±∞) en a,\net si lim f\'(x)/g\'(x) = ℓ en a,\nalors lim f(x)/g(x) = ℓ.\nS\'applique aux formes : 0/0 et ∞/∞', remarque: 'Peut s\'appliquer plusieurs fois si la forme reste indéterminée.' }
        ]
      },
      {
        titre: 'III. Convexité et étude de fonctions',
        theoremes: [
          { type: 'Définition', label: 'Convexité — Concavité', enonce: 'f est CONVEXE sur I ⟺ f\'\' ≥ 0 sur I\n→ courbe au-dessus de toutes ses tangentes\nf est CONCAVE sur I ⟺ f\'\' ≤ 0 sur I\n→ courbe en-dessous de toutes ses tangentes\nPoint d\'inflexion : f\'\' s\'annule ET change de signe.' },
          { type: 'Propriété', label: 'Plan d\'étude d\'une fonction', enonce: '1. Domaine de définition\n2. Parité, périodicité\n3. Limites aux bords du domaine + asymptotes\n4. Dérivée f\'(x) → tableau de signe → variations\n5. f\'\'(x) → convexité → points d\'inflexion\n6. Tableau de variation complet\n7. Tracé de la courbe' }
        ]
      }
    ]
  },
  {
    id: 'ch4', num: 'CH 04', titre: 'Fonctions Réciproques', tome: 1,
    color: '#ec4899', icon: 'f⁻¹',
    description: 'arcsin, arccos, arctan — définitions, dérivées, formules, équations',
    sections: [
      {
        titre: 'I. Théorie des fonctions réciproques',
        theoremes: [
          { type: 'Théorème', label: 'Existence de la fonction réciproque', enonce: 'Si f est continue et STRICTEMENT MONOTONE sur I,\nalors f réalise une bijection de I sur J = f(I),\net il existe une unique f⁻¹ : J → I telle que f⁻¹(f(x)) = x.', remarque: 'Graphiquement : courbe de f⁻¹ = symétrique de courbe de f par rapport à y = x.' },
          { type: 'Théorème', label: 'Dérivée de la réciproque', enonce: 'Si f est dérivable en a avec f\'(a) ≠ 0, alors f⁻¹ est dérivable en b = f(a) et :\n(f⁻¹)\'(b) = 1 / f\'(f⁻¹(b))\nOu : (f⁻¹)\'(f(a)) = 1 / f\'(a)' }
        ]
      },
      {
        titre: 'II. Fonctions trigonométriques inverses',
        theoremes: [
          { type: 'Définition', label: 'arcsin — Sinus inverse', enonce: 'arcsin : [−1, 1] → [−π/2, π/2]\narcsin(x) = y ⟺ sin(y) = x et y ∈ [−π/2, π/2]\n• Dérivée : (arcsin x)\' = 1/√(1−x²)  sur ]−1, 1[\n• Impaire : arcsin(−x) = −arcsin(x)\n• arcsin(sin x) = x pour x ∈ [−π/2, π/2]' },
          { type: 'Définition', label: 'arccos — Cosinus inverse', enonce: 'arccos : [−1, 1] → [0, π]\narccos(x) = y ⟺ cos(y) = x et y ∈ [0, π]\n• Dérivée : (arccos x)\' = −1/√(1−x²)  sur ]−1, 1[\n• arccos(−x) = π − arccos(x)\n• Relation : arcsin(x) + arccos(x) = π/2' },
          { type: 'Définition', label: 'arctan — Tangente inverse', enonce: 'arctan : ℝ → ]−π/2, π/2[\narctan(x) = y ⟺ tan(y) = x et y ∈ ]−π/2, π/2[\n• Dérivée : (arctan x)\' = 1/(1+x²)  sur ℝ\n• Impaire : arctan(−x) = −arctan(x)\n• lim(x→+∞) arctan x = π/2 ; lim(x→−∞) arctan x = −π/2' },
          { type: 'Propriété', label: 'Valeurs remarquables', enonce: 'arcsin(0) = 0          arccos(0) = π/2       arctan(0) = 0\narcsin(1/2) = π/6      arccos(1/2) = π/3     arctan(1) = π/4\narcsin(√2/2) = π/4    arccos(√2/2) = π/4    arctan(√3) = π/3\narcsin(√3/2) = π/3    arccos(√3/2) = π/6    arctan(1/√3) = π/6\narcsin(1) = π/2        arccos(1) = 0' }
        ]
      }
    ]
  },
  {
    id: 'ch5', num: 'CH 05', titre: 'Primitives et Intégrales', tome: 1,
    color: '#06b6d4', icon: '∫',
    description: 'Primitives usuelles, IPP, changement de variable, calcul d\'aires',
    sections: [
      {
        titre: 'I. Primitives',
        theoremes: [
          { type: 'Définition', label: 'Primitive d\'une fonction', enonce: 'F est une primitive de f sur I si F\'(x) = f(x) pour tout x ∈ I.\nL\'ensemble des primitives de f est {F + C, C ∈ ℝ}.' },
          { type: 'Propriété', label: 'Table des primitives usuelles', enonce: '• ∫ xⁿ dx = xⁿ⁺¹/(n+1) + C  (n ≠ −1)\n• ∫ 1/x dx = ln|x| + C\n• ∫ eˣ dx = eˣ + C\n• ∫ sin x dx = −cos x + C\n• ∫ cos x dx = sin x + C\n• ∫ 1/cos²x dx = tan x + C\n• ∫ 1/sin²x dx = −cotan x + C\n• ∫ 1/√(1−x²) dx = arcsin x + C\n• ∫ 1/(1+x²) dx = arctan x + C\n• ∫ sh x dx = ch x + C\n• ∫ ch x dx = sh x + C' },
          { type: 'Propriété', label: 'Primitives de formes composées u\'f(u)', enonce: '• ∫ u\'eᵘ dx = eᵘ + C\n• ∫ u\'/u dx = ln|u| + C  (u ≠ 0)\n• ∫ u\'uⁿ dx = uⁿ⁺¹/(n+1) + C  (n ≠ −1)\n• ∫ u\'sin u dx = −cos u + C\n• ∫ u\'cos u dx = sin u + C\n• ∫ u\'/√u dx = 2√u + C\n• ∫ u\'/√(1−u²) dx = arcsin u + C\n• ∫ u\'/(1+u²) dx = arctan u + C' },
          { type: 'Théorème', label: 'Intégration Par Parties (IPP)', enonce: '∫ u\'v dx = [uv] − ∫ uv\' dx\nSur [a,b] : ∫ᵃᵇ u\'v dx = [uv]ᵃᵇ − ∫ᵃᵇ uv\' dx', remarque: 'Stratégie : v\' doit être facilement intégrable.\nTypiquement : ln, arcsin, arccos, arctan → placer en v (jamais en v\').\nExemple : ∫ ln x dx → u\' = 1, v = ln x' }
        ]
      },
      {
        titre: 'II. Calcul intégral',
        theoremes: [
          { type: 'Théorème', label: 'Théorème Fondamental de l\'Analyse', enonce: 'Si f est continue sur [a, b], alors :\nF(x) = ∫ₐˣ f(t) dt est dérivable sur [a,b] et F\'(x) = f(x).\nDe plus :  ∫ᵃᵇ f(x) dx = F(b) − F(a) = [F(x)]ᵃᵇ' },
          { type: 'Propriété', label: 'Propriétés des intégrales définies', enonce: '• Linéarité : ∫(αf+βg) = α∫f + β∫g\n• Chasles : ∫ᵃᶜ f = ∫ᵃᵇ f + ∫ᵇᶜ f\n• Positivité : f ≥ 0 sur [a,b] ⟹ ∫ᵃᵇ f ≥ 0\n• Inégalité : f ≤ g ⟹ ∫ᵃᵇ f ≤ ∫ᵃᵇ g\n• |∫ᵃᵇ f| ≤ ∫ᵃᵇ |f|\n• Valeur moyenne : m = 1/(b−a) · ∫ᵃᵇ f(x) dx' },
          { type: 'Propriété', label: 'Calcul d\'aires et volumes', enonce: 'Aire entre courbe de f et l\'axe Ox :\nA = ∫ᵃᵇ |f(x)| dx\nAire entre deux courbes (f ≥ g sur [a,b]) :\nA = ∫ᵃᵇ [f(x) − g(x)] dx\nVolume de révolution autour de Ox :\nV = π · ∫ᵃᵇ [f(x)]² dx\nLongueur d\'arc :\nL = ∫ᵃᵇ √(1 + [f\'(x)]²) dx' }
        ]
      }
    ]
  }
]

const TOME2_CHAPTERS = [
  {
    id: 'ch6', num: 'CH 01', titre: 'Nombres Complexes', tome: 2,
    color: '#7c3aed', icon: 'ℂ',
    description: 'Algébrique, trigonométrique, Euler, Moivre, racines, transformations complexes',
    sections: [
      {
        titre: 'I. Forme algébrique',
        theoremes: [
          { type: 'Définition', label: 'Nombre complexe', enonce: 'z = a + ib  (a, b ∈ ℝ, i² = −1)\n• Re(z) = a : partie réelle\n• Im(z) = b : partie imaginaire\n• z̄ = a − ib : conjugué\n• |z| = √(a²+b²) : module\n• arg(z) : argument' },
          { type: 'Propriété', label: 'Conjugué et module', enonce: '• z·z̄ = |z|²  ⟹  1/z = z̄/|z|² (z ≠ 0)\n• z+z̄ = 2Re(z) ;  z−z̄ = 2i·Im(z)\n• |z₁z₂| = |z₁|·|z₂| ;  |z₁/z₂| = |z₁|/|z₂|\n• |z₁+z₂| ≤ |z₁|+|z₂|  (inégalité triangulaire)\n• z réel ⟺ z = z̄\n• z pur imaginaire ⟺ z+z̄ = 0' }
        ]
      },
      {
        titre: 'II. Forme trigonométrique — Euler — De Moivre',
        theoremes: [
          { type: 'Définition', label: 'Forme trigonométrique et exponentielle', enonce: 'z = r(cos θ + i sin θ) = r·e^(iθ)\n• r = |z| : module\n• θ = arg(z) : argument (modulo 2π)\nFormule d\'Euler : e^(iθ) = cos θ + i sin θ\nConséquences :\n• cos θ = (e^(iθ) + e^(−iθ))/2\n• sin θ = (e^(iθ) − e^(−iθ))/(2i)\ne^(iπ) = −1  (identité remarquable)' },
          { type: 'Théorème', label: 'Formule de De Moivre', enonce: '(cos θ + i sin θ)ⁿ = cos(nθ) + i sin(nθ)\nOu :  (e^(iθ))ⁿ = e^(inθ)\nApplications :\n• Développer cos(nθ), sin(nθ) en puissances de cos θ, sin θ\n• Linéariser cosⁿθ, sinⁿθ en sommes de cos(kθ), sin(kθ)' },
          { type: 'Propriété', label: 'Multiplication — Division', enonce: 'Si z₁ = r₁e^(iθ₁) et z₂ = r₂e^(iθ₂) :\n• z₁z₂ = r₁r₂·e^(i(θ₁+θ₂))\n  → |z₁z₂| = |z₁||z₂|,  arg(z₁z₂) = arg(z₁)+arg(z₂)\n• z₁/z₂ = (r₁/r₂)·e^(i(θ₁−θ₂))  (z₂ ≠ 0)\n• zⁿ = rⁿe^(inθ)\n• z̄ = re^(−iθ)' }
        ]
      },
      {
        titre: 'III. Racines — Équations — Géométrie',
        theoremes: [
          { type: 'Théorème', label: 'Racines n-ièmes', enonce: 'Les n racines n-ièmes de z₀ = ρe^(iφ) sont :\nzₖ = ρ^(1/n) · e^(i(φ+2kπ)/n),  k = 0, ..., n−1\nElles forment les sommets d\'un polygone régulier à n côtés\ninscrit dans un cercle de rayon ρ^(1/n).' },
          { type: 'Théorème', label: 'Équations dans ℂ', enonce: 'az²+bz+c = 0 (a≠0) : Δ = b²−4ac\n• Δ = 0 : racine double z = −b/(2a)\n• Δ = δ² ∈ ℂ* : z₁ = (−b+δ)/(2a), z₂ = (−b−δ)/(2a)\nThéorème fondamental de l\'algèbre :\nTout polynôme de degré n ≥ 1 admet exactement n racines dans ℂ.' },
          { type: 'Propriété', label: 'Transformations du plan complexe', enonce: 'Si M a pour affixe z et M\' a pour affixe z\' :\n• Translation de vecteur u⃗(a+ib) : z\' = z + (a+ib)\n• Rotation de centre O, angle θ : z\' = e^(iθ)·z\n• Homothétie de centre O, rapport k : z\' = kz\n• Rotation de centre Ω(ω), angle θ : z\'−ω = e^(iθ)(z−ω)\n• Symétrie par rapport à l\'axe Ox : z\' = z̄\nDistance : |z_A − z_B| = AB' }
        ]
      }
    ]
  },
  {
    id: 'ch7', num: 'CH 02', titre: 'Isométries du Plan', tome: 2,
    color: '#059669', icon: '↔',
    description: 'Réflexions, rotations, translations — isométries directes et indirectes',
    sections: [
      {
        titre: 'I. Généralités sur les isométries',
        theoremes: [
          { type: 'Définition', label: 'Isométrie du plan', enonce: 'Une isométrie est une transformation f du plan telle que :\nPour tous points A, B : f(A)f(B) = AB  (conservation des distances)\nLes isométries conservent aussi les angles, les droites, les cercles.' },
          { type: 'Théorème', label: 'Classification des isométries', enonce: 'Toute isométrie est :\n• Soit une ISOMÉTRIE DIRECTE (conserve l\'orientation) :\n  → Translation, Rotation\n• Soit une ISOMÉTRIE INDIRECTE (renverse l\'orientation) :\n  → Réflexion (symétrie axiale), Symétrie glissante' }
        ]
      },
      {
        titre: 'II. Isométries directes',
        theoremes: [
          { type: 'Définition', label: 'Translation', enonce: 'La translation de vecteur u⃗ est l\'application :\nT : M ↦ M\' tel que MM\' = u⃗\nEn complexe : z\' = z + a  (a = affixe du vecteur)\nLa composée de deux translations est une translation :  Tu⃗ ∘ Tv⃗ = Tu⃗+v⃗' },
          { type: 'Définition', label: 'Rotation', enonce: 'La rotation de centre Ω et d\'angle θ :\nR_{Ω,θ} : M ↦ M\' avec ΩM\' = ΩM et (ΩM, ΩM\') = θ\nEn complexe (Ω d\'affixe ω) : z\'−ω = e^(iθ)(z−ω)\nPropriétés :\n• Unique point fixe : le centre Ω (si θ ≠ 0 [2π])\n• R_{Ω,θ} ∘ R_{Ω,φ} = R_{Ω,θ+φ}', remarque: 'Composition de deux rotations de centres différents :\n• Si θ+φ ≠ 0 [2π] → rotation\n• Si θ+φ = 0 [2π] → translation' }
        ]
      },
      {
        titre: 'III. Isométries indirectes',
        theoremes: [
          { type: 'Définition', label: 'Réflexion (symétrie axiale)', enonce: 'La réflexion d\'axe D est l\'application :\nS_D : M ↦ M\' tel que le milieu de MM\' ∈ D et MM\' ⊥ D\nEn complexe (axe Ox) : z\' = z̄\nPropriétés :\n• Points fixes : les points de l\'axe D\n• S_D ∘ S_D = identité  (involution)\n• S_D est une isométrie indirecte' },
          { type: 'Théorème', label: 'Composée de deux réflexions', enonce: 'Soit S₁ = réflexion d\'axe D₁ et S₂ = réflexion d\'axe D₂ :\n• Si D₁ ∥ D₂ : S₂ ∘ S₁ = translation de vecteur 2·D₁D₂⃗\n• Si D₁ ∩ D₂ = {Ω} et angle(D₁,D₂) = α :\n  S₂ ∘ S₁ = rotation de centre Ω et d\'angle 2α' }
        ]
      }
    ]
  },
  {
    id: 'ch8', num: 'CH 03', titre: 'Déplacements et Antidéplacements', tome: 2,
    color: '#f59e0b', icon: '⟳',
    description: 'Déplacements du plan, antidéplacements, produits d\'isométries',
    sections: [
      {
        titre: 'I. Déplacements',
        theoremes: [
          { type: 'Définition', label: 'Déplacement du plan', enonce: 'Un déplacement est une isométrie DIRECTE.\nTout déplacement est une translation ou une rotation.\nForme complexe générale d\'un déplacement : z\' = e^(iθ)z + b  (b ∈ ℂ)\n• Si θ = 0 [2π] : translation (z\' = z + b)\n• Si θ ≠ 0 [2π] : rotation de centre z₀ = b/(1−e^(iθ))' },
          { type: 'Théorème', label: 'Composée de déplacements', enonce: 'La composée de deux déplacements est un déplacement.\nSi f : z\' = e^(iα)z + a et g : z\' = e^(iβ)z + b alors :\ng∘f : z\' = e^(i(α+β))z + e^(iβ)a + b', remarque: 'L\'ensemble des déplacements du plan forme un GROUPE pour la composition.' }
        ]
      },
      {
        titre: 'II. Antidéplacements',
        theoremes: [
          { type: 'Définition', label: 'Antidéplacement', enonce: 'Un antidéplacement est une isométrie INDIRECTE.\nTout antidéplacement est une réflexion ou une symétrie glissante.\nForme complexe : z\' = e^(iθ)z̄ + b  (b ∈ ℂ)\n• Réflexion : possède une droite de points fixes\n• Symétrie glissante : composée d\'une réflexion et d\'une translation parallèle à l\'axe' },
          { type: 'Théorème', label: 'Points fixes d\'un antidéplacement', enonce: 'Un antidéplacement d\'écriture z\' = e^(iθ)z̄ + b a pour points fixes les solutions de :\ne^(iθ)z̄ + b = z\nSi l\'antidéplacement a des points fixes, c\'est une réflexion.' }
        ]
      }
    ]
  },
  {
    id: 'ch9', num: 'CH 04', titre: 'Similitudes', tome: 2,
    color: '#ef4444', icon: '⊗',
    description: 'Similitudes directes et indirectes, homothéties, écriture complexe',
    sections: [
      {
        titre: 'I. Similitudes directes',
        theoremes: [
          { type: 'Définition', label: 'Similitude directe', enonce: 'Une similitude directe f est une transformation telle que :\nf(A)f(B) = k · AB  pour tout A, B  (k > 0 : rapport)\net f conserve l\'orientation.\nÉcriture complexe : z\' = az + b  (a ≠ 0, a, b ∈ ℂ)\n• Rapport : k = |a|\n• Angle : θ = arg(a)', remarque: 'Si a = k (réel positif) : homothétie de centre fixe et rapport k.' },
          { type: 'Théorème', label: 'Centre d\'une similitude directe', enonce: 'Si a ≠ 1, la similitude z\' = az + b admet un unique point fixe :\nω = b / (1 − a)  (centre de la similitude)\nSi a = 1 : translation (aucun point fixe si b ≠ 0).' },
          { type: 'Définition', label: 'Homothétie', enonce: 'Homothétie de centre Ω(ω) et rapport k ∈ ℝ* :\nz\' = k(z − ω) + ω = kz + ω(1−k)\n• k > 0 : homothétie directe (même sens que Ω→M)\n• k < 0 : homothétie indirecte (sens opposé)\n• k = −1 : symétrie centrale de centre Ω\nRapport de l\'homothétie = |k|' }
        ]
      },
      {
        titre: 'II. Similitudes indirectes',
        theoremes: [
          { type: 'Définition', label: 'Similitude indirecte', enonce: 'Écriture complexe : z\' = az̄ + b  (a ≠ 0)\n• Rapport : k = |a|\n• C\'est la composée d\'une similitude directe et d\'une réflexion.' },
          { type: 'Propriété', label: 'Composées de similitudes', enonce: 'La composée de deux similitudes directes est une similitude directe.\nSi f : z\' = az+b et g : z\' = cz+d alors :\ng∘f : z\' = caz + (cb+d)\n• Rapport de g∘f = |ca| = |c|·|a|\n• Angle de g∘f = arg(ca) = arg(c)+arg(a)' }
        ]
      }
    ]
  },
  {
    id: 'ch10', num: 'CH 05', titre: 'Coniques', tome: 2,
    color: '#06b6d4', icon: '○',
    description: 'Ellipse, hyperbole, parabole — définitions, équations, éléments caractéristiques',
    sections: [
      {
        titre: 'I. Définitions focales',
        theoremes: [
          { type: 'Définition', label: 'Conique — Définition bifocale / foyer-directrice', enonce: 'Une conique est le lieu des points M du plan vérifiant :\n|MF₁| + |MF₂| = 2a  (ellipse, a > c = |OF₁|)\n||MF₁| − |MF₂|| = 2a  (hyperbole)\n|MF| = d(M, D)  (parabole, F foyer, D directrice)\n\nDéfinition unifiée (excentricité e) :\nd(M, F) / d(M, D) = e\n• e < 1 : ellipse\n• e = 1 : parabole\n• e > 1 : hyperbole\n• e = 0 : cercle (cas dégénéré)' }
        ]
      },
      {
        titre: 'II. Ellipse',
        theoremes: [
          { type: 'Définition', label: 'Ellipse — équation réduite', enonce: 'Ellipse de foyers F₁(−c, 0), F₂(c, 0) et demi-grand axe a :\nx²/a² + y²/b² = 1  avec b² = a² − c²  (b > 0)\n• Demi-grand axe : a  (selon Ox)\n• Demi-petit axe : b  (selon Oy)\n• Distance focale : c = √(a²−b²)\n• Excentricité : e = c/a < 1\n• Sommets : (±a, 0) et (0, ±b)\n• Directrices : x = ±a/e = ±a²/c' }
        ]
      },
      {
        titre: 'III. Hyperbole',
        theoremes: [
          { type: 'Définition', label: 'Hyperbole — équation réduite', enonce: 'Hyperbole de foyers F₁(−c, 0), F₂(c, 0) :\nx²/a² − y²/b² = 1  avec b² = c² − a²\n• Distance focale : c = √(a²+b²)\n• Excentricité : e = c/a > 1\n• Asymptotes : y = ±(b/a)x\n• Sommets : (±a, 0)\n• Hyperbole équilatère : a = b, asymptotes perpendiculaires' }
        ]
      },
      {
        titre: 'IV. Parabole',
        theoremes: [
          { type: 'Définition', label: 'Parabole — équation réduite', enonce: 'Parabole de foyer F(p/2, 0) et directrice x = −p/2 :\ny² = 2px  (p > 0 : parabole vers la droite)\nÉléments :\n• Foyer : F(p/2, 0)\n• Directrice : x = −p/2\n• Sommet : O(0, 0)\n• Axe de symétrie : Ox\n• Excentricité : e = 1' }
        ]
      }
    ]
  },
  {
    id: 'ch11', num: 'CH 06', titre: 'Arithmétique', tome: 2,
    color: '#10b981', icon: 'ℤ',
    description: 'Divisibilité, PGCD, Bézout, Euclide, congruences, RSA',
    sections: [
      {
        titre: 'I. Divisibilité dans ℤ',
        theoremes: [
          { type: 'Définition', label: 'Divisibilité', enonce: 'a divise b (noté a|b) si ∃k ∈ ℤ tel que b = ka.\nPropriétés :\n• a|b et b|c ⟹ a|c  (transitivité)\n• a|b et a|c ⟹ a|(ub+vc)  pour u,v ∈ ℤ\n• a|b et b|a ⟹ a = ±b\n• Tout entier divise 0 ; 1 divise tout entier' },
          { type: 'Théorème', label: 'Division euclidienne', enonce: 'Pour a ∈ ℤ et b ∈ ℤ* (b ≠ 0), il existe un unique couple (q, r) ∈ ℤ² tel que :\na = bq + r  avec  0 ≤ r < |b|\n• q : quotient\n• r : reste\na est divisible par b ⟺ r = 0' }
        ]
      },
      {
        titre: 'II. PGCD — Algorithme d\'Euclide',
        theoremes: [
          { type: 'Définition', label: 'PGCD', enonce: 'Le PGCD de a et b (a,b ∈ ℤ, pas tous nuls) est le plus grand diviseur commun positif.\nNotation : pgcd(a, b) ou (a, b).\nPropriétés :\n• pgcd(a, b) = pgcd(b, r)  où r = reste de la division de a par b\n• pgcd(a, 0) = |a|\n• pgcd(a, b) = pgcd(a, b+ka)  pour k ∈ ℤ' },
          { type: 'Théorème', label: 'Algorithme d\'Euclide', enonce: 'Pour calculer pgcd(a, b) avec a ≥ b > 0 :\na = b·q₁ + r₁\nb = r₁·q₂ + r₂\nr₁ = r₂·q₃ + r₃\n...\nrₙ₋₁ = rₙ·qₙ₊₁ + 0\nAlors pgcd(a, b) = rₙ (dernier reste non nul).' },
          { type: 'Théorème', label: 'Identité de Bézout', enonce: 'a et b sont premiers entre eux (pgcd = 1) si et seulement si :\n∃u, v ∈ ℤ tels que au + bv = 1\nPlus généralement : pgcd(a,b) = d ⟺ ∃u,v ∈ ℤ, au+bv = d\n(Identité de Bachet-Bézout)', remarque: 'Les coefficients u, v se trouvent par l\'algorithme d\'Euclide étendu (remontée).' },
          { type: 'Théorème', label: 'Théorème de Gauss', enonce: 'Si a|bc et pgcd(a,b) = 1, alors a|c.\nCorollaire : si p premier et p|ab, alors p|a ou p|b.' }
        ]
      },
      {
        titre: 'III. Congruences',
        theoremes: [
          { type: 'Définition', label: 'Congruence modulo n', enonce: 'a ≡ b (mod n)  ⟺  n|(a−b)  ⟺  a et b ont le même reste dans la division par n.\nPropriétés :\n• Réflexive : a ≡ a (mod n)\n• Symétrique : a ≡ b ⟹ b ≡ a\n• Transitive : a ≡ b et b ≡ c ⟹ a ≡ c\n• Compatible : a ≡ b ⟹ a+c ≡ b+c et ac ≡ bc (mod n)' },
          { type: 'Théorème', label: 'Petit théorème de Fermat', enonce: 'Si p est un nombre premier et pgcd(a, p) = 1, alors :\naᵖ⁻¹ ≡ 1 (mod p)\nOu encore : aᵖ ≡ a (mod p) pour tout a.\nApplication : calcul de puissances modulo un premier (cryptographie RSA).' }
        ]
      }
    ]
  },
  {
    id: 'ch12', num: 'CH 07', titre: 'Probabilités et Statistiques', tome: 2,
    color: '#d97706', icon: 'P()',
    description: 'Probabilités conditionnelles, Bayes, variables aléatoires, lois usuelles',
    sections: [
      {
        titre: 'I. Probabilités conditionnelles',
        theoremes: [
          { type: 'Définition', label: 'Probabilité conditionnelle', enonce: 'P(A|B) = P(A∩B) / P(B)  si P(B) > 0\nFormule de multiplication : P(A∩B) = P(B)·P(A|B)' },
          { type: 'Théorème', label: 'Formule des Probabilités Totales', enonce: 'Si (B₁,...,Bₙ) est une partition de Ω :\nP(A) = Σᵢ P(Bᵢ)·P(A|Bᵢ)' },
          { type: 'Théorème', label: 'Formule de Bayes', enonce: 'P(Bₖ|A) = P(Bₖ)·P(A|Bₖ) / Σᵢ P(Bᵢ)·P(A|Bᵢ)' },
          { type: 'Définition', label: 'Indépendance', enonce: 'A et B indépendants ⟺ P(A∩B) = P(A)·P(B)' }
        ]
      },
      {
        titre: 'II. Variables aléatoires',
        theoremes: [
          { type: 'Définition', label: 'Espérance et Variance', enonce: '• E(X) = Σ xᵢpᵢ\n• V(X) = E(X²) − [E(X)]²\n• σ(X) = √V(X)\n• E(aX+b) = aE(X)+b ;  V(aX+b) = a²V(X)' },
          { type: 'Théorème', label: 'Loi Binomiale B(n, p)', enonce: 'P(X=k) = C(n,k)·pᵏ·(1−p)ⁿ⁻ᵏ\n• E(X) = np\n• V(X) = np(1−p)' },
          { type: 'Théorème', label: 'Loi de Poisson P(λ)', enonce: 'P(X=k) = e⁻λ·λᵏ/k!  (k ∈ ℕ, λ > 0)\n• E(X) = λ\n• V(X) = λ\nApproximation de la loi binomiale pour n grand et p petit.' },
          { type: 'Théorème', label: 'Loi Normale N(μ, σ²)', enonce: 'Densité : f(x) = (1/(σ√(2π))) · e^(−(x−μ)²/(2σ²))\n• E(X) = μ,  V(X) = σ²\n• Loi centrée réduite N(0,1) : Z = (X−μ)/σ\n• P(μ−σ < X < μ+σ) ≈ 68%\n• P(μ−2σ < X < μ+2σ) ≈ 95%\n• P(μ−3σ < X < μ+3σ) ≈ 99,7%', remarque: 'Théorème central limite : la somme de n VA indépendantes de même loi → N(nμ, nσ²) quand n → ∞.' },
          { type: 'Théorème', label: 'Inégalité de Bienaymé-Tchebychev', enonce: 'Pour tout ε > 0 : P(|X−E(X)| ≥ ε) ≤ V(X)/ε²\nOu : P(|X−μ| ≥ kσ) ≤ 1/k²' }
        ]
      },
      {
        titre: 'III. Statistiques',
        theoremes: [
          { type: 'Définition', label: 'Série à deux variables', enonce: 'Pour (xᵢ, yᵢ), i=1..n :\n• Moyennes : x̄, ȳ\n• Variances : V(x), V(y)\n• Covariance : cov(x,y) = (1/n)Σxᵢyᵢ − x̄ȳ\n• Coefficient de corrélation : r = cov(x,y)/(σₓσᵧ)  (r ∈ [−1,1])' },
          { type: 'Propriété', label: 'Droite de régression', enonce: 'Droite des moindres carrés de y en x :\ny − ȳ = [cov(x,y)/V(x)]·(x − x̄)\nElle passe par G(x̄, ȳ).' }
        ]
      }
    ]
  }
]

const ALL_CHAPTERS = [...TOME1_CHAPTERS, ...TOME2_CHAPTERS]

const typeColors: Record<string, string> = {
  'Définition': 'bg-blue-500/20 text-blue-300 border-blue-500/40',
  'Théorème': 'bg-purple-500/20 text-purple-300 border-purple-500/40',
  'Propriété': 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
  'Corollaire': 'bg-amber-500/20 text-amber-300 border-amber-500/40',
}

function TheoremCard({ theoreme, chapterColor }: { theoreme: any, chapterColor: string }) {
  const [expanded, setExpanded] = useState(false)
  const badge = typeColors[theoreme.type] || 'bg-gray-500/20 text-gray-300 border-gray-500/40'
  return (
    <div className="relative border border-white/10 rounded-xl overflow-hidden transition-all duration-200 hover:border-white/20"
      style={{ background: 'rgba(255,255,255,0.03)' }}>
      <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-xl" style={{ backgroundColor: chapterColor }} />
      <div className="pl-4 pr-4 py-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap mb-2">
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${badge}`}>{theoreme.type}</span>
              <span className="text-sm font-semibold text-white/90">{theoreme.label}</span>
            </div>
            <pre className={`text-sm text-white/70 whitespace-pre-wrap leading-relaxed transition-all ${expanded ? '' : 'line-clamp-4'}`}
              style={{ fontFamily: 'ui-monospace, "Fira Code", monospace', fontSize: '13px' }}>
              {theoreme.enonce}
            </pre>
            {theoreme.remarque && expanded && (
              <div className="mt-3 pl-3 border-l-2 border-amber-400/50 text-xs text-amber-200/70 italic">⚡ {theoreme.remarque}</div>
            )}
          </div>
          <button onClick={() => setExpanded(!expanded)}
            className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-white/40 hover:text-white/80 hover:bg-white/10 transition-all text-xl font-light">
            {expanded ? '−' : '+'}
          </button>
        </div>
      </div>
    </div>
  )
}

function ChapterCard({ chapter, isActive, onClick }: { chapter: any, isActive: boolean, onClick: () => void }) {
  const total = chapter.sections.reduce((a: number, s: any) => a + s.theoremes.length, 0)
  return (
    <button onClick={onClick}
      className={`w-full text-left p-3 rounded-xl border transition-all duration-200 group ${isActive ? 'border-white/30 bg-white/10' : 'border-white/8 hover:border-white/18 hover:bg-white/5'}`}>
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg flex items-center justify-center font-bold text-sm flex-shrink-0"
          style={{ backgroundColor: chapter.color + '25', color: chapter.color }}>{chapter.icon}</div>
        <div className="flex-1 min-w-0">
          <div className="text-xs text-white/30 font-mono mb-0.5">{chapter.num}</div>
          <div className="text-sm font-semibold text-white/85 truncate">{chapter.titre}</div>
          <div className="text-xs text-white/30">{total} théorèmes</div>
        </div>
        {isActive && <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: chapter.color }} />}
      </div>
    </button>
  )
}

export default function MathsPage() {
  const [activeTome, setActiveTome] = useState<1 | 2>(1)
  const [activeChapterId, setActiveChapterId] = useState<string>('ch1')
  const [searchQuery, setSearchQuery] = useState('')

  const currentChapter = ALL_CHAPTERS.find(c => c.id === activeChapterId)
  const filteredChapters = ALL_CHAPTERS.filter(c => c.tome === activeTome)

  const searchResults = searchQuery.length > 2
    ? ALL_CHAPTERS.flatMap(ch => ch.sections.flatMap(s =>
        s.theoremes.filter(t =>
          t.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.enonce.toLowerCase().includes(searchQuery.toLowerCase())
        ).map(t => ({ chapter: ch, theoreme: t }))
      ))
    : []

  const totalT = ALL_CHAPTERS.reduce((acc, ch) =>
    acc + ch.sections.reduce((a, s) => a + s.theoremes.length, 0), 0)

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #06061a 0%, #0b0b28 50%, #08131e 100%)' }}>
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-16 left-8 w-80 h-80 rounded-full opacity-4" style={{ background: 'radial-gradient(circle, #7c3aed, transparent)' }} />
        <div className="absolute bottom-16 right-8 w-72 h-72 rounded-full opacity-4" style={{ background: 'radial-gradient(circle, #6366f1, transparent)' }} />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 py-8">

        {/* HEADER */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4 text-xs">
            <a href="/bac" className="text-white/30 hover:text-white/60 transition-colors">Bac Tunisie</a>
            <span className="text-white/15">›</span>
            <span className="text-white/50">Mathématiques</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
                style={{ background: 'linear-gradient(135deg, #7c3aed 0%, #6366f1 100%)' }}>🧮</div>
              <div>
                <h1 className="text-2xl md:text-3xl font-black text-white leading-tight">
                  Mathématiques <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(90deg, #a78bfa, #818cf8)' }}>Section Maths</span>
                </h1>
                <p className="text-white/40 text-sm mt-0.5">4ème année — Programme CNP officiel · Bac Tunisie 2026</p>
              </div>
            </div>
            <div className="flex gap-3">
              {[['12', 'Chapitres'], [totalT.toString(), 'Théorèmes'], ['2', 'Tomes']].map(([v, l]) => (
                <div key={l} className="text-center px-4 py-2 rounded-xl border border-white/10 bg-white/5 min-w-[70px]">
                  <div className="text-xl font-black text-white">{v}</div>
                  <div className="text-xs text-white/30">{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Différences vs Sc.Exp */}
          <div className="mb-5 p-3 rounded-xl border border-amber-500/20 bg-amber-500/5 text-xs text-amber-200/70 max-w-2xl">
            ⭐ <strong>Spécifique à la section Maths :</strong> Coniques · Arithmétique (Bézout, Euclide, RSA) · Isométries · Déplacements · Similitudes · Loi Normale · Loi de Poisson
          </div>

          <div className="relative max-w-md">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25 text-sm">🔍</span>
            <input type="text" placeholder="Rechercher un théorème..." value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/12 rounded-xl px-4 py-2.5 pl-10 text-sm text-white placeholder-white/25 focus:outline-none focus:border-violet-500/50 transition-all" />
            {searchQuery && <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/60 text-lg">×</button>}
          </div>

          {searchResults.length > 0 && (
            <div className="mt-2 border border-white/12 rounded-xl overflow-hidden bg-black/50 max-w-md">
              <div className="px-4 py-2 border-b border-white/8 text-xs text-white/30">{searchResults.length} résultat(s)</div>
              <div className="max-h-64 overflow-y-auto">
                {searchResults.map((r, i) => (
                  <button key={i} onClick={() => { setSearchQuery(''); setActiveTome(r.chapter.tome as 1|2); setActiveChapterId(r.chapter.id) }}
                    className="w-full text-left px-4 py-3 hover:bg-white/5 border-b border-white/5 last:border-0 transition-colors">
                    <div className="text-xs text-white/30 mb-0.5">{r.chapter.num} · {r.chapter.titre}</div>
                    <div className="text-sm text-white/75">{r.theoreme.label}</div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* TOME TABS */}
        <div className="flex gap-2 mb-5">
          {[1, 2].map(t => (
            <button key={t} onClick={() => { setActiveTome(t as 1|2); const f = ALL_CHAPTERS.find(c => c.tome === t); if(f) setActiveChapterId(f.id) }}
              className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 ${activeTome === t ? 'bg-violet-700 text-white shadow-lg shadow-violet-500/25' : 'bg-white/5 border border-white/12 text-white/50 hover:bg-white/8 hover:text-white/70'}`}>
              Tome {t} · {t === 1 ? 'Analyse (5 ch.)' : 'Algèbre & Géo (7 ch.)'}
            </button>
          ))}
        </div>

        {/* LAYOUT */}
        <div className="flex flex-col lg:flex-row gap-5">
          <div className="lg:w-64 xl:w-72 flex-shrink-0">
            <div className="sticky top-4 space-y-1.5">
              {filteredChapters.map(ch => (
                <ChapterCard key={ch.id} chapter={ch} isActive={activeChapterId === ch.id}
                  onClick={() => setActiveChapterId(ch.id)} />
              ))}
            </div>
          </div>

          <div className="flex-1 min-w-0">
            {currentChapter && (
              <div>
                <div className="mb-7 p-5 rounded-2xl border border-white/10 relative overflow-hidden"
                  style={{ background: `linear-gradient(135deg, ${currentChapter.color}12, ${currentChapter.color}04)` }}>
                  <div className="absolute right-5 top-4 text-7xl opacity-8 font-black select-none" style={{ color: currentChapter.color }}>{currentChapter.icon}</div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-mono text-white/35 border border-white/15 px-2 py-0.5 rounded">{currentChapter.num}</span>
                    <span className="text-xs text-white/30">Tome {currentChapter.tome}</span>
                    <span className="text-xs text-white/25">·</span>
                    <span className="text-xs text-white/30">{currentChapter.sections.reduce((a,s)=>a+s.theoremes.length,0)} théorèmes</span>
                  </div>
                  <h2 className="text-xl font-black text-white mb-1">{currentChapter.titre}</h2>
                  <p className="text-white/45 text-sm">{currentChapter.description}</p>
                </div>

                {currentChapter.sections.map((section, si) => (
                  <div key={si} className="mb-7">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-px flex-1 bg-white/8" />
                      <h3 className="text-xs font-bold text-white/50 uppercase tracking-[0.15em] whitespace-nowrap px-2">{section.titre}</h3>
                      <div className="h-px flex-1 bg-white/8" />
                    </div>
                    <div className="space-y-2.5">
                      {section.theoremes.map((th, ti) => (
                        <TheoremCard key={ti} theoreme={th} chapterColor={currentChapter.color} />
                      ))}
                    </div>
                  </div>
                ))}

                <div className="flex items-center justify-between pt-5 mt-6 border-t border-white/8">
                  {(() => {
                    const idx = filteredChapters.findIndex(c => c.id === activeChapterId)
                    const prev = filteredChapters[idx - 1]
                    const next = filteredChapters[idx + 1]
                    return (<>
                      <div>{prev && <button onClick={() => setActiveChapterId(prev.id)} className="flex items-center gap-2 text-sm text-white/40 hover:text-white/70 transition-colors group"><span className="group-hover:-translate-x-1 transition-transform">←</span><span>{prev.titre}</span></button>}</div>
                      <div>{next && <button onClick={() => setActiveChapterId(next.id)} className="flex items-center gap-2 text-sm text-white/40 hover:text-white/70 transition-colors group"><span>{next.titre}</span><span className="group-hover:translate-x-1 transition-transform">→</span></button>}</div>
                    </>)
                  })()}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/8 text-center space-y-1">
          <p className="text-xs text-white/20">Programme officiel CNP · Manuels 222445 (Tome I) & 222446 (Tome II) · Bac Tunisie 2026</p>
          <p className="text-xs text-white/12">Sources : bac-done.com · sigmaths.net · devoirat.net · devoir.tn</p>
        </div>
      </div>
    </div>
  )
}
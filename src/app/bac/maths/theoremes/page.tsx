'use client'

import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

// ═══════════════════════════════════════════════════════
// DONNÉES — Programme CNP 4ème Mathématiques Tunisie
// Sources: Manuel CNP 222445 (T1) + 222446 (T2)
//          bac-done.com · sigmaths.net · devoirat.net · devoir.tn
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
          { type: 'Théorème', label: 'Convergence des suites monotones bornées', enonce: '• Suite CROISSANTE et MAJORÉE → convergente\n• Suite DÉCROISSANTE et MINORÉE → convergente\n• Suite croissante non majorée → diverge vers +∞\n• Suite décroissante non minorée → diverge vers −∞', remarque: 'Ce théorème assure l\'existence de la limite sans la calculer explicitement.' },
          { type: 'Théorème', label: 'Suites adjacentes', enonce: '(uₙ) et (vₙ) sont ADJACENTES si :\n1. (uₙ) croissante\n2. (vₙ) décroissante\n3. lim(vₙ − uₙ) = 0\nAlors : elles convergent vers la même limite ℓ\net  uₙ ≤ ℓ ≤ vₙ  pour tout n.', remarque: 'Application typique : encadrement de π, de e, de √2...' },
          { type: 'Théorème', label: 'Point fixe d\'une suite récurrente', enonce: 'Si (uₙ) définie par uₙ₊₁ = f(uₙ) converge vers ℓ,\net si f est continue en ℓ, alors f(ℓ) = ℓ.\n(ℓ est un point fixe de f)', remarque: 'Méthode : 1. Étudier monotonie et bornage → convergence → identifier la limite comme point fixe de f' }
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
          { type: 'Définition', label: 'Nombre dérivé', enonce: 'f est dérivable en a si la limite suivante est finie :\nf\'(a) = lim(h→0) [f(a+h) − f(a)] / h\nInterprétation géométrique : f\'(a) = pente de la tangente en (a, f(a)).\nÉquation de la tangente en a : y = f\'(a)(x−a) + f(a)' },
          { type: 'Propriété', label: 'Dérivées usuelles', enonce: '• (xⁿ)\' = nxⁿ⁻¹         • (√x)\' = 1/(2√x)\n• (eˣ)\' = eˣ              • (ln x)\' = 1/x\n• (sin x)\' = cos x        • (cos x)\' = −sin x\n• (tan x)\' = 1/cos²x      • (arcsin x)\' = 1/√(1−x²)\n• (arccos x)\' = −1/√(1−x²) • (arctan x)\' = 1/(1+x²)' },
          { type: 'Propriété', label: 'Règles de dérivation', enonce: '• (u+v)\' = u\'+v\'  (linéarité)\n• (uv)\' = u\'v + uv\'  (Leibniz)\n• (u/v)\' = (u\'v − uv\') / v²\n• (f∘g)\' = (f\'∘g)·g\'  (composée)\n• (f⁻¹)\'(b) = 1/f\'(f⁻¹(b))  (réciproque)' }
        ]
      },
      {
        titre: 'II. Théorèmes fondamentaux',
        theoremes: [
          { type: 'Théorème', label: 'Théorème de Rolle', enonce: 'Hypothèses :\n• f continue sur [a, b]\n• f dérivable sur ]a, b[\n• f(a) = f(b)\nConclusion : ∃c ∈ ]a, b[ tel que f\'(c) = 0' },
          { type: 'Théorème', label: 'Théorème des Accroissements Finis (TAF)', enonce: 'Hypothèses :\n• f continue sur [a, b]\n• f dérivable sur ]a, b[\nConclusion : ∃c ∈ ]a, b[ tel que f(b)−f(a) = f\'(c)·(b−a)', remarque: 'Corollaires :\n• f\'= 0 sur ]a,b[ ⟹ f constante\n• f\' > 0 sur ]a,b[ ⟹ f strictement croissante\n• |f\'| ≤ M ⟹ |f(b)−f(a)| ≤ M·|b−a|' },
          { type: 'Théorème', label: 'Règle de L\'Hôpital', enonce: 'Si lim f(x) = lim g(x) = 0 (ou ±∞) en a,\net si lim f\'(x)/g\'(x) = ℓ en a,\nalors lim f(x)/g(x) = ℓ.\nS\'applique aux formes : 0/0 et ∞/∞', remarque: 'Peut s\'appliquer plusieurs fois si la forme reste indéterminée.' }
        ]
      },
      {
        titre: 'III. Convexité',
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
          { type: 'Théorème', label: 'Dérivée de la réciproque', enonce: 'Si f est dérivable en a avec f\'(a) ≠ 0, alors f⁻¹ est dérivable en b = f(a) et :\n(f⁻¹)\'(b) = 1 / f\'(f⁻¹(b))' }
        ]
      },
      {
        titre: 'II. Fonctions trigonométriques inverses',
        theoremes: [
          { type: 'Définition', label: 'arcsin — Sinus inverse', enonce: 'arcsin : [−1, 1] → [−π/2, π/2]\narcsin(x) = y ⟺ sin(y) = x et y ∈ [−π/2, π/2]\n• Dérivée : (arcsin x)\' = 1/√(1−x²)  sur ]−1, 1[\n• Impaire : arcsin(−x) = −arcsin(x)\n• arcsin(sin x) = x pour x ∈ [−π/2, π/2]' },
          { type: 'Définition', label: 'arccos — Cosinus inverse', enonce: 'arccos : [−1, 1] → [0, π]\narccos(x) = y ⟺ cos(y) = x et y ∈ [0, π]\n• Dérivée : (arccos x)\' = −1/√(1−x²)  sur ]−1, 1[\n• arccos(−x) = π − arccos(x)\n• Relation : arcsin(x) + arccos(x) = π/2' },
          { type: 'Définition', label: 'arctan — Tangente inverse', enonce: 'arctan : ℝ → ]−π/2, π/2[\narctan(x) = y ⟺ tan(y) = x et y ∈ ]−π/2, π/2[\n• Dérivée : (arctan x)\' = 1/(1+x²)  sur ℝ\n• Impaire : arctan(−x) = −arctan(x)\n• lim(x→+∞) arctan x = π/2 ; lim(x→−∞) arctan x = −π/2' },
          { type: 'Propriété', label: 'Valeurs remarquables', enonce: 'arcsin(0)=0   arccos(0)=π/2   arctan(0)=0\narcsin(1/2)=π/6   arccos(1/2)=π/3   arctan(1)=π/4\narcsin(√2/2)=π/4  arccos(√2/2)=π/4  arctan(√3)=π/3\narcsin(√3/2)=π/3  arccos(√3/2)=π/6  arctan(1/√3)=π/6\narcsin(1)=π/2   arccos(1)=0' }
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
          { type: 'Propriété', label: 'Table des primitives usuelles', enonce: '• ∫ xⁿ dx = xⁿ⁺¹/(n+1) + C  (n ≠ −1)\n• ∫ 1/x dx = ln|x| + C\n• ∫ eˣ dx = eˣ + C\n• ∫ sin x dx = −cos x + C\n• ∫ cos x dx = sin x + C\n• ∫ 1/cos²x dx = tan x + C\n• ∫ 1/√(1−x²) dx = arcsin x + C\n• ∫ 1/(1+x²) dx = arctan x + C' },
          { type: 'Propriété', label: 'Primitives de formes composées u\'f(u)', enonce: '• ∫ u\'eᵘ dx = eᵘ + C\n• ∫ u\'/u dx = ln|u| + C  (u ≠ 0)\n• ∫ u\'uⁿ dx = uⁿ⁺¹/(n+1) + C  (n ≠ −1)\n• ∫ u\'sin u dx = −cos u + C\n• ∫ u\'cos u dx = sin u + C\n• ∫ u\'/√(1−u²) dx = arcsin u + C\n• ∫ u\'/(1+u²) dx = arctan u + C' },
          { type: 'Théorème', label: 'Intégration Par Parties (IPP)', enonce: '∫ u\'v dx = [uv] − ∫ uv\' dx\nSur [a,b] : ∫ᵃᵇ u\'v dx = [uv]ᵃᵇ − ∫ᵃᵇ uv\' dx', remarque: 'Stratégie : ln, arcsin, arccos, arctan → placer en v (jamais en u\')\nExemple : ∫ ln x dx → u\' = 1, v = ln x' }
        ]
      },
      {
        titre: 'II. Calcul intégral',
        theoremes: [
          { type: 'Théorème', label: 'Théorème Fondamental de l\'Analyse', enonce: 'Si f est continue sur [a, b], alors :\nF(x) = ∫ₐˣ f(t) dt est dérivable sur [a,b] et F\'(x) = f(x).\nDe plus :  ∫ᵃᵇ f(x) dx = F(b) − F(a) = [F(x)]ᵃᵇ' },
          { type: 'Propriété', label: 'Propriétés des intégrales définies', enonce: '• Linéarité : ∫(αf+βg) = α∫f + β∫g\n• Chasles : ∫ᵃᶜ f = ∫ᵃᵇ f + ∫ᵇᶜ f\n• Positivité : f ≥ 0 sur [a,b] ⟹ ∫ᵃᵇ f ≥ 0\n• |∫ᵃᵇ f| ≤ ∫ᵃᵇ |f|\n• Valeur moyenne : m = 1/(b−a) · ∫ᵃᵇ f(x) dx' },
          { type: 'Propriété', label: 'Calcul d\'aires et volumes', enonce: 'Aire entre courbe de f et l\'axe Ox :\nA = ∫ᵃᵇ |f(x)| dx\nAire entre deux courbes (f ≥ g sur [a,b]) :\nA = ∫ᵃᵇ [f(x) − g(x)] dx\nVolume de révolution autour de Ox :\nV = π · ∫ᵃᵇ [f(x)]² dx' }
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
          { type: 'Définition', label: 'Nombre complexe', enonce: 'z = a + ib  (a, b ∈ ℝ, i² = −1)\n• Re(z) = a : partie réelle\n• Im(z) = b : partie imaginaire\n• z̄ = a − ib : conjugué\n• |z| = √(a²+b²) : module' },
          { type: 'Propriété', label: 'Conjugué et module', enonce: '• z·z̄ = |z|²\n• z+z̄ = 2Re(z) ;  z−z̄ = 2i·Im(z)\n• |z₁z₂| = |z₁|·|z₂|\n• |z₁+z₂| ≤ |z₁|+|z₂|  (inégalité triangulaire)\n• z réel ⟺ z = z̄\n• z pur imaginaire ⟺ z+z̄ = 0' }
        ]
      },
      {
        titre: 'II. Forme trigonométrique — Euler — De Moivre',
        theoremes: [
          { type: 'Définition', label: 'Forme trigonométrique et exponentielle', enonce: 'z = r(cos θ + i sin θ) = r·e^(iθ)\n• r = |z| : module\n• θ = arg(z) : argument (modulo 2π)\nFormule d\'Euler : e^(iθ) = cos θ + i sin θ\nConséquences :\n• cos θ = (e^(iθ) + e^(−iθ))/2\n• sin θ = (e^(iθ) − e^(−iθ))/(2i)\ne^(iπ) = −1  (identité remarquable)' },
          { type: 'Théorème', label: 'Formule de De Moivre', enonce: '(cos θ + i sin θ)ⁿ = cos(nθ) + i sin(nθ)\nOu :  (e^(iθ))ⁿ = e^(inθ)\nApplications :\n• Développer cos(nθ), sin(nθ) en puissances de cos θ, sin θ\n• Linéariser cosⁿθ, sinⁿθ en sommes de cos(kθ), sin(kθ)' },
          { type: 'Propriété', label: 'Multiplication — Division', enonce: 'Si z₁ = r₁e^(iθ₁) et z₂ = r₂e^(iθ₂) :\n• z₁z₂ = r₁r₂·e^(i(θ₁+θ₂))\n• z₁/z₂ = (r₁/r₂)·e^(i(θ₁−θ₂))  (z₂ ≠ 0)\n• zⁿ = rⁿe^(inθ)\n• z̄ = re^(−iθ)' }
        ]
      },
      {
        titre: 'III. Racines — Équations — Géométrie',
        theoremes: [
          { type: 'Théorème', label: 'Racines n-ièmes', enonce: 'Les n racines n-ièmes de z₀ = ρe^(iφ) sont :\nzₖ = ρ^(1/n) · e^(i(φ+2kπ)/n),  k = 0, ..., n−1\nElles forment les sommets d\'un polygone régulier à n côtés\ninscrit dans un cercle de rayon ρ^(1/n).' },
          { type: 'Propriété', label: 'Transformations du plan complexe', enonce: 'Si M a pour affixe z et M\' a pour affixe z\' :\n• Translation de vecteur a+ib : z\' = z + (a+ib)\n• Rotation de centre O, angle θ : z\' = e^(iθ)·z\n• Homothétie de centre O, rapport k : z\' = kz\n• Rotation de centre Ω(ω), angle θ : z\'−ω = e^(iθ)(z−ω)\n• Distance : |z_A − z_B| = AB' }
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
        titre: 'I. Généralités',
        theoremes: [
          { type: 'Définition', label: 'Isométrie du plan', enonce: 'Une isométrie est une transformation f du plan telle que :\nPour tous points A, B : f(A)f(B) = AB  (conservation des distances)\nLes isométries conservent aussi les angles, les droites, les cercles.' },
          { type: 'Théorème', label: 'Classification des isométries', enonce: 'Isométries DIRECTES (conservent l\'orientation) :\n• Translations\n• Rotations\nIsométries INDIRECTES (renversent l\'orientation) :\n• Réflexions (symétries axiales)\n• Symétries glissantes' }
        ]
      },
      {
        titre: 'II. Isométries directes',
        theoremes: [
          { type: 'Définition', label: 'Translation', enonce: 'Translation de vecteur u⃗ : T_u⃗(M) = M\' tel que M̄M\' = u⃗\nEn complexe : z\' = z + b  (b ∈ ℂ)\n• Aucun point fixe (si u⃗ ≠ 0⃗)\n• Composée de deux réflexions d\'axes parallèles' },
          { type: 'Définition', label: 'Rotation', enonce: 'Rotation de centre Ω et angle θ : R_{Ω,θ}(M) = M\' tel que ΩM\' = ΩM et (ΩM, ΩM\') = θ\nEn complexe : z\' − ω = e^(iθ)(z − ω)\n• Point fixe unique : Ω\n• Composée de deux réflexions d\'axes concourants' }
        ]
      },
      {
        titre: 'III. Isométries indirectes',
        theoremes: [
          { type: 'Définition', label: 'Réflexion (symétrie axiale)', enonce: 'La réflexion d\'axe D est l\'application :\nS_D : M ↦ M\' tel que le milieu de MM\' ∈ D et MM\' ⊥ D\nEn complexe (axe Ox) : z\' = z̄\n• Points fixes : les points de D\n• S_D ∘ S_D = identité  (involution)' },
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
          { type: 'Définition', label: 'Déplacement du plan', enonce: 'Un déplacement est une isométrie DIRECTE.\nTout déplacement est une translation ou une rotation.\nForme complexe : z\' = e^(iθ)z + b  (b ∈ ℂ)\n• Si θ = 0 [2π] : translation\n• Si θ ≠ 0 [2π] : rotation de centre ω = b/(1−e^(iθ))' },
          { type: 'Théorème', label: 'Composée de déplacements', enonce: 'La composée de deux déplacements est un déplacement.\nSi f : z\' = e^(iα)z + a et g : z\' = e^(iβ)z + b alors :\ng∘f : z\' = e^(i(α+β))z + e^(iβ)a + b', remarque: 'L\'ensemble des déplacements forme un GROUPE pour la composition.' }
        ]
      },
      {
        titre: 'II. Antidéplacements',
        theoremes: [
          { type: 'Définition', label: 'Antidéplacement', enonce: 'Un antidéplacement est une isométrie INDIRECTE.\nTout antidéplacement est une réflexion ou une symétrie glissante.\nForme complexe : z\' = e^(iθ)z̄ + b  (b ∈ ℂ)\n• Réflexion : possède une droite de points fixes\n• Symétrie glissante : composée d\'une réflexion et d\'une translation parallèle à l\'axe' },
          { type: 'Théorème', label: 'Points fixes d\'un antidéplacement', enonce: 'Un antidéplacement z\' = e^(iθ)z̄ + b a pour points fixes les solutions de :\ne^(iθ)z̄ + b = z\nSi l\'antidéplacement a des points fixes, c\'est une réflexion.' }
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
          { type: 'Définition', label: 'Similitude directe', enonce: 'Une similitude directe f : z\' = az + b  (a ≠ 0, a, b ∈ ℂ)\n• Rapport : k = |a|\n• Angle : θ = arg(a)\nSi a = k (réel positif) : homothétie de rapport k.' },
          { type: 'Théorème', label: 'Centre d\'une similitude directe', enonce: 'Si a ≠ 1, la similitude z\' = az + b admet un unique point fixe :\nω = b / (1 − a)  (centre de la similitude)\nSi a = 1 : translation.' },
          { type: 'Définition', label: 'Homothétie', enonce: 'Homothétie de centre Ω(ω) et rapport k ∈ ℝ* :\nz\' = k(z − ω) + ω = kz + ω(1−k)\n• k > 0 : homothétie directe\n• k < 0 : homothétie indirecte\n• k = −1 : symétrie centrale de centre Ω' }
        ]
      },
      {
        titre: 'II. Similitudes indirectes',
        theoremes: [
          { type: 'Définition', label: 'Similitude indirecte', enonce: 'Écriture complexe : z\' = az̄ + b  (a ≠ 0)\n• Rapport : k = |a|\n• C\'est la composée d\'une similitude directe et d\'une réflexion.' },
          { type: 'Propriété', label: 'Composées de similitudes', enonce: 'La composée de deux similitudes directes est une similitude directe.\nSi f : z\' = az+b et g : z\' = cz+d alors :\ng∘f : z\' = caz + (cb+d)\n• Rapport = |ca| = |c|·|a|\n• Angle = arg(ca) = arg(c)+arg(a)' }
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
        titre: 'I. Définition unifiée',
        theoremes: [
          { type: 'Définition', label: 'Conique — excentricité', enonce: 'Une conique est le lieu des points M vérifiant d(M,F)/d(M,D) = e\n• e < 1 : ellipse\n• e = 1 : parabole\n• e > 1 : hyperbole\n• e = 0 : cercle (cas particulier)' }
        ]
      },
      {
        titre: 'II. Ellipse',
        theoremes: [
          { type: 'Définition', label: 'Ellipse — équation réduite', enonce: 'x²/a² + y²/b² = 1  avec b² = a² − c²  (b > 0)\n• Foyers : F₁(−c, 0), F₂(c, 0)\n• Demi-grand axe : a  (selon Ox)\n• Demi-petit axe : b  (selon Oy)\n• Excentricité : e = c/a < 1\n• Sommets : (±a, 0) et (0, ±b)\n• Directrices : x = ±a²/c' }
        ]
      },
      {
        titre: 'III. Hyperbole',
        theoremes: [
          { type: 'Définition', label: 'Hyperbole — équation réduite', enonce: 'x²/a² − y²/b² = 1  avec b² = c² − a²\n• Excentricité : e = c/a > 1\n• Asymptotes : y = ±(b/a)x\n• Sommets : (±a, 0)\n• Hyperbole équilatère : a = b' }
        ]
      },
      {
        titre: 'IV. Parabole',
        theoremes: [
          { type: 'Définition', label: 'Parabole — équation réduite', enonce: 'y² = 2px  (p > 0 : parabole vers la droite)\n• Foyer : F(p/2, 0)\n• Directrice : x = −p/2\n• Sommet : O(0, 0)\n• Excentricité : e = 1' }
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
        titre: 'I. Divisibilité — PGCD',
        theoremes: [
          { type: 'Définition', label: 'Divisibilité', enonce: 'a divise b (noté a|b) si ∃k ∈ ℤ tel que b = ka.\nPropriétés :\n• a|b et b|c ⟹ a|c  (transitivité)\n• a|b et a|c ⟹ a|(ub+vc)  pour u,v ∈ ℤ' },
          { type: 'Théorème', label: 'Division euclidienne', enonce: 'Pour a ∈ ℤ et b ∈ ℤ* (b ≠ 0), il existe un unique couple (q, r) ∈ ℤ² tel que :\na = bq + r  avec  0 ≤ r < |b|' },
          { type: 'Théorème', label: 'Algorithme d\'Euclide', enonce: 'Pour calculer pgcd(a, b) avec a ≥ b > 0 :\na = b·q₁ + r₁\nb = r₁·q₂ + r₂\n...\nrₙ₋₁ = rₙ·qₙ₊₁ + 0\nAlors pgcd(a, b) = rₙ (dernier reste non nul).' },
          { type: 'Théorème', label: 'Identité de Bézout', enonce: 'pgcd(a,b) = 1 (premiers entre eux) ⟺\n∃u, v ∈ ℤ tels que au + bv = 1', remarque: 'Les coefficients u, v se trouvent par l\'algorithme d\'Euclide étendu (remontée).' },
          { type: 'Théorème', label: 'Théorème de Gauss', enonce: 'Si a|bc et pgcd(a,b) = 1, alors a|c.\nCorollaire : si p premier et p|ab, alors p|a ou p|b.' }
        ]
      },
      {
        titre: 'II. Congruences',
        theoremes: [
          { type: 'Définition', label: 'Congruence modulo n', enonce: 'a ≡ b (mod n)  ⟺  n|(a−b)\nPropriétés :\n• Réflexive, symétrique, transitive\n• Compatible : a ≡ b ⟹ a+c ≡ b+c et ac ≡ bc (mod n)' },
          { type: 'Théorème', label: 'Petit théorème de Fermat', enonce: 'Si p est premier et pgcd(a, p) = 1, alors :\naᵖ⁻¹ ≡ 1 (mod p)\nApplication : calcul de puissances modulo un premier (cryptographie RSA).' }
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
        titre: 'II. Variables aléatoires — Lois usuelles',
        theoremes: [
          { type: 'Définition', label: 'Espérance et Variance', enonce: '• E(X) = Σ xᵢpᵢ\n• V(X) = E(X²) − [E(X)]²\n• σ(X) = √V(X)\n• E(aX+b) = aE(X)+b ;  V(aX+b) = a²V(X)' },
          { type: 'Théorème', label: 'Loi Binomiale B(n, p)', enonce: 'P(X=k) = C(n,k)·pᵏ·(1−p)ⁿ⁻ᵏ\n• E(X) = np\n• V(X) = np(1−p)' },
          { type: 'Théorème', label: 'Loi de Poisson P(λ)', enonce: 'P(X=k) = e⁻λ·λᵏ/k!  (k ∈ ℕ, λ > 0)\n• E(X) = λ\n• V(X) = λ\nApproximation de la loi binomiale pour n grand et p petit.' },
          { type: 'Théorème', label: 'Loi Normale N(μ, σ²)', enonce: 'Densité : f(x) = (1/(σ√(2π))) · e^(−(x−μ)²/(2σ²))\n• E(X) = μ,  V(X) = σ²\n• Loi centrée réduite N(0,1) : Z = (X−μ)/σ\n• P(μ−σ < X < μ+σ) ≈ 68%\n• P(μ−2σ < X < μ+2σ) ≈ 95%\n• P(μ−3σ < X < μ+3σ) ≈ 99,7%' },
          { type: 'Théorème', label: 'Inégalité de Bienaymé-Tchebychev', enonce: 'Pour tout ε > 0 : P(|X−E(X)| ≥ ε) ≤ V(X)/ε²' }
        ]
      },
      {
        titre: 'III. Statistiques',
        theoremes: [
          { type: 'Définition', label: 'Série à deux variables', enonce: 'Pour (xᵢ, yᵢ), i=1..n :\n• Moyennes : x̄, ȳ\n• Covariance : cov(x,y) = (1/n)Σxᵢyᵢ − x̄ȳ\n• Coefficient de corrélation : r = cov(x,y)/(σₓσᵧ)  (r ∈ [−1,1])' },
          { type: 'Propriété', label: 'Droite de régression', enonce: 'Droite des moindres carrés de y en x :\ny − ȳ = [cov(x,y)/V(x)]·(x − x̄)\nElle passe par G(x̄, ȳ).' }
        ]
      }
    ]
  }
]

const ALL_CHAPTERS = [...TOME1_CHAPTERS, ...TOME2_CHAPTERS]

const TYPE_COLORS: Record<string, { bg: string; color: string; border: string }> = {
  'Définition': { bg: 'rgba(79,110,247,0.15)', color: '#7b9ef7', border: 'rgba(79,110,247,0.3)' },
  'Théorème':   { bg: 'rgba(139,92,246,0.15)', color: '#a78bfa', border: 'rgba(139,92,246,0.3)' },
  'Propriété':  { bg: 'rgba(6,214,160,0.12)',  color: '#06d6a0', border: 'rgba(6,214,160,0.25)' },
  'Corollaire': { bg: 'rgba(245,158,11,0.12)', color: '#fbbf24', border: 'rgba(245,158,11,0.25)' },
}

function TheoremCard({ theoreme, chapterColor }: { theoreme: any; chapterColor: string }) {
  const [expanded, setExpanded] = useState(false)
  const tc = TYPE_COLORS[theoreme.type] || { bg: 'rgba(255,255,255,0.06)', color: '#9ca3af', border: 'rgba(255,255,255,0.15)' }
  return (
    <div style={{ position: 'relative', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: 12, overflow: 'hidden', transition: 'border-color 0.2s' }}
      onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)')}
      onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.09)')}>
      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 3, background: chapterColor, borderRadius: '12px 0 0 12px' }} />
      <div style={{ padding: '14px 14px 14px 18px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap', marginBottom: 8 }}>
              <span style={{ fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 20, background: tc.bg, color: tc.color, border: `1px solid ${tc.border}` }}>{theoreme.type}</span>
              <span style={{ fontSize: 14, fontWeight: 600, color: 'rgba(255,255,255,0.88)' }}>{theoreme.label}</span>
            </div>
            <pre style={{ fontSize: 13, color: 'rgba(255,255,255,0.68)', whiteSpace: 'pre-wrap', lineHeight: 1.7, fontFamily: '"Fira Code", ui-monospace, monospace', margin: 0, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: expanded ? 'unset' : 4, WebkitBoxOrient: 'vertical' }}>
              {theoreme.enonce}
            </pre>
            {theoreme.remarque && expanded && (
              <div style={{ marginTop: 10, paddingLeft: 12, borderLeft: '2px solid rgba(251,191,36,0.5)', fontSize: 12, color: 'rgba(251,191,36,0.7)', fontStyle: 'italic', lineHeight: 1.6 }}>⚡ {theoreme.remarque}</div>
            )}
          </div>
          <button onClick={() => setExpanded(!expanded)}
            style={{ flexShrink: 0, width: 28, height: 28, borderRadius: 8, border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.5)', cursor: 'pointer', fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.15s' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; e.currentTarget.style.color = '#fff' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = 'rgba(255,255,255,0.5)' }}>
            {expanded ? '−' : '+'}
          </button>
        </div>
      </div>
    </div>
  )
}

function ChapterBtn({ chapter, isActive, onClick }: { chapter: any; isActive: boolean; onClick: () => void }) {
  const total = chapter.sections.reduce((a: number, s: any) => a + s.theoremes.length, 0)
  return (
    <button onClick={onClick} style={{ width: '100%', textAlign: 'left', padding: '10px 12px', borderRadius: 12, border: `1px solid ${isActive ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.08)'}`, background: isActive ? 'rgba(255,255,255,0.08)' : 'transparent', cursor: 'pointer', transition: 'all 0.15s', display: 'flex', alignItems: 'center', gap: 10 }}
      onMouseEnter={e => { if (!isActive) { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)' }}}
      onMouseLeave={e => { if (!isActive) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)' }}}>
      <div style={{ width: 36, height: 36, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 14, flexShrink: 0, background: chapter.color + '22', color: chapter.color }}>{chapter.icon}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-mono)', marginBottom: 2 }}>{chapter.num}</div>
        <div style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.85)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{chapter.titre}</div>
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)' }}>{total} théorèmes</div>
      </div>
      {isActive && <div style={{ width: 6, height: 6, borderRadius: '50%', flexShrink: 0, background: chapter.color }} />}
    </button>
  )
}

export default function MathsTheorèmesPage() {
  const [activeTome, setActiveTome] = useState<1 | 2>(1)
  const [activeChapterId, setActiveChapterId] = useState<string>('ch1')
  const [searchQuery, setSearchQuery] = useState('')

  const currentChapter = ALL_CHAPTERS.find(c => c.id === activeChapterId)
  const filteredChapters = ALL_CHAPTERS.filter(c => c.tome === activeTome)
  const totalThm = ALL_CHAPTERS.reduce((acc, ch) => acc + ch.sections.reduce((a, s) => a + s.theoremes.length, 0), 0)

  const searchResults = searchQuery.length > 2
    ? ALL_CHAPTERS.flatMap(ch => ch.sections.flatMap(s =>
        s.theoremes.filter(t =>
          t.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.enonce.toLowerCase().includes(searchQuery.toLowerCase())
        ).map(t => ({ chapter: ch, theoreme: t }))
      ))
    : []

  return (
    <>
      <Navbar />
      <main style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #06061a 0%, #0b0b28 50%, #08131e 100%)', paddingTop: 80 }}>
        {/* Fixed bg glows */}
        <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
          <div style={{ position: 'absolute', top: 64, left: 32, width: 320, height: 320, borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,58,237,0.06), transparent)' }} />
          <div style={{ position: 'absolute', bottom: 64, right: 32, width: 288, height: 288, borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.06), transparent)' }} />
        </div>

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 1400, margin: '0 auto', padding: '0 16px 80px' }}>

          {/* BREADCRUMB */}
          <div style={{ padding: '16px 0', display: 'flex', gap: 8, fontSize: 12, color: 'rgba(255,255,255,0.3)', alignItems: 'center' }}>
            <Link href="/bac" style={{ color: 'rgba(255,255,255,0.3)', textDecoration: 'none' }}>Bac Tunisie</Link>
            <span>›</span>
            <Link href="/bac/maths" style={{ color: 'rgba(255,255,255,0.3)', textDecoration: 'none' }}>Section Maths</Link>
            <span>›</span>
            <span style={{ color: 'rgba(255,255,255,0.6)' }}>Théorèmes & Définitions</span>
          </div>

          {/* HEADER */}
          <div style={{ marginBottom: 32 }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 20, marginBottom: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{ width: 56, height: 56, borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, background: 'linear-gradient(135deg, #7c3aed, #6366f1)', flexShrink: 0 }}>🧮</div>
                <div>
                  <h1 style={{ fontSize: 'clamp(22px,3.5vw,32px)', fontWeight: 900, color: '#fff', marginBottom: 4, lineHeight: 1.15 }}>
                    Mathématiques — <span style={{ background: 'linear-gradient(90deg, #a78bfa, #818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Théorèmes</span>
                  </h1>
                  <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>4ème année — Programme CNP officiel · Bac Tunisie</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 12 }}>
                {[['12', 'Chapitres'], [String(totalThm), 'Théorèmes'], ['2', 'Tomes']].map(([v, l]) => (
                  <div key={l} style={{ textAlign: 'center', padding: '8px 16px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.04)', minWidth: 70 }}>
                    <div style={{ fontSize: 22, fontWeight: 900, color: '#fff' }}>{v}</div>
                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)' }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Note spécifique Maths */}
            <div style={{ marginBottom: 20, padding: '10px 16px', borderRadius: 12, border: '1px solid rgba(251,191,36,0.2)', background: 'rgba(251,191,36,0.05)', fontSize: 12, color: 'rgba(251,191,36,0.7)', maxWidth: 720 }}>
              ⭐ <strong>Spécifique à la section Maths :</strong> Coniques · Arithmétique (Bézout, Euclide, RSA) · Isométries · Déplacements · Similitudes · Loi Normale · Loi de Poisson
            </div>

            {/* SEARCH */}
            <div style={{ position: 'relative', maxWidth: 440 }}>
              <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.25)', fontSize: 14, pointerEvents: 'none' }}>🔍</span>
              <input type="text" placeholder="Rechercher un théorème, définition..." value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 12, padding: '10px 14px 10px 40px', fontSize: 13, color: '#fff', outline: 'none', boxSizing: 'border-box' }} />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')}
                  style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'rgba(255,255,255,0.3)', cursor: 'pointer', fontSize: 18 }}>×</button>
              )}
            </div>
            {searchResults.length > 0 && (
              <div style={{ marginTop: 6, border: '1px solid rgba(255,255,255,0.12)', borderRadius: 12, overflow: 'hidden', background: 'rgba(0,0,0,0.6)', maxWidth: 440 }}>
                <div style={{ padding: '6px 14px', borderBottom: '1px solid rgba(255,255,255,0.08)', fontSize: 11, color: 'rgba(255,255,255,0.3)' }}>{searchResults.length} résultat(s)</div>
                <div style={{ maxHeight: 240, overflowY: 'auto' }}>
                  {searchResults.map((r, i) => (
                    <button key={i} onClick={() => { setSearchQuery(''); setActiveTome(r.chapter.tome as 1|2); setActiveChapterId(r.chapter.id) }}
                      style={{ width: '100%', textAlign: 'left', padding: '10px 14px', border: 'none', borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'transparent', cursor: 'pointer', color: '#fff', transition: 'background 0.15s' }}
                      onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.05)')}
                      onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                      <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', marginBottom: 2 }}>{r.chapter.num} · {r.chapter.titre}</div>
                      <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)' }}>{r.theoreme.label}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* TOME TABS */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
            {[1, 2].map(t => (
              <button key={t} onClick={() => { setActiveTome(t as 1|2); const f = ALL_CHAPTERS.find(c => c.tome === t); if (f) setActiveChapterId(f.id) }}
                style={{ padding: '10px 20px', borderRadius: 12, fontWeight: 700, fontSize: 13, cursor: 'pointer', transition: 'all 0.2s', border: 'none', background: activeTome === t ? '#6d28d9' : 'rgba(255,255,255,0.05)', color: activeTome === t ? '#fff' : 'rgba(255,255,255,0.45)', boxShadow: activeTome === t ? '0 4px 20px rgba(109,40,217,0.35)' : 'none' }}>
                Tome {t} · {t === 1 ? 'Analyse (5 ch.)' : 'Algèbre & Géo (7 ch.)'}
              </button>
            ))}
          </div>

          {/* LAYOUT SPLIT */}
          <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
            {/* SIDEBAR chapitres */}
            <div style={{ width: 260, flexShrink: 0, minWidth: 200 }}>
              <div style={{ position: 'sticky', top: 16, display: 'flex', flexDirection: 'column', gap: 6 }}>
                {filteredChapters.map(ch => (
                  <ChapterBtn key={ch.id} chapter={ch} isActive={activeChapterId === ch.id} onClick={() => setActiveChapterId(ch.id)} />
                ))}
              </div>
            </div>

            {/* MAIN contenu */}
            <div style={{ flex: 1, minWidth: 0 }}>
              {currentChapter && (
                <div>
                  {/* Chapter header */}
                  <div style={{ marginBottom: 28, padding: '18px 20px', borderRadius: 16, border: '1px solid rgba(255,255,255,0.1)', background: `linear-gradient(135deg, ${currentChapter.color}10, ${currentChapter.color}04)`, position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', right: 20, top: 12, fontSize: 64, opacity: 0.08, fontWeight: 900, color: currentChapter.color, userSelect: 'none' }}>{currentChapter.icon}</div>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 6 }}>
                      <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.35)', border: '1px solid rgba(255,255,255,0.15)', padding: '2px 8px', borderRadius: 6 }}>{currentChapter.num}</span>
                      <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)' }}>Tome {currentChapter.tome}</span>
                      <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)' }}>·</span>
                      <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)' }}>{currentChapter.sections.reduce((a, s) => a + s.theoremes.length, 0)} théorèmes</span>
                    </div>
                    <h2 style={{ fontSize: 20, fontWeight: 900, color: '#fff', marginBottom: 4 }}>{currentChapter.titre}</h2>
                    <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)' }}>{currentChapter.description}</p>
                  </div>

                  {/* Sections et théorèmes */}
                  {currentChapter.sections.map((section, si) => (
                    <div key={si} style={{ marginBottom: 28 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                        <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.08)' }} />
                        <h3 style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase', letterSpacing: '0.12em', whiteSpace: 'nowrap', padding: '0 8px' }}>{section.titre}</h3>
                        <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.08)' }} />
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                        {section.theoremes.map((th, ti) => (
                          <TheoremCard key={ti} theoreme={th} chapterColor={currentChapter.color} />
                        ))}
                      </div>
                    </div>
                  ))}

                  {/* Navigation prev/next */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 20, marginTop: 20, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                    {(() => {
                      const idx = filteredChapters.findIndex(c => c.id === activeChapterId)
                      const prev = filteredChapters[idx - 1]
                      const next = filteredChapters[idx + 1]
                      return (
                        <>
                          <div>{prev && <button onClick={() => setActiveChapterId(prev.id)} style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer', fontSize: 13 }}>← {prev.titre}</button>}</div>
                          <div>{next && <button onClick={() => setActiveChapterId(next.id)} style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer', fontSize: 13 }}>{next.titre} →</button>}</div>
                        </>
                      )
                    })()}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Footer info */}
          <div style={{ marginTop: 60, paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.08)', textAlign: 'center' }}>
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.2)' }}>Programme officiel CNP · Manuels 222445 (Tome I) & 222446 (Tome II) · Bac Tunisie</p>
            <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.12)', marginTop: 4 }}>Sources : bac-done.com · sigmaths.net · devoirat.net · devoir.tn</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

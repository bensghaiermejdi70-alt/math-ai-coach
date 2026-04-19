'use client'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

const CHAPITRES = [
  {
    id: 'python-algorithmique',
    num: '1',
    titre: 'Algorithmique & Python',
    couleur: '#06d6a0',
    icone: '🐍',
    tag: 'Informatique',
    souschap: [
      {
        titre: '1.1 Variables et affectation',
        notions: ['Variables numériques, chaînes, booléens','Affectation : a = 5','Opérateurs arithmétiques +, −, ×, ÷, %','Fonctions print(), input(), type()'],
      },
      {
        titre: '1.2 Instructions conditionnelles',
        notions: ['if, else, elif','Comparaisons : ==, !=, <, >, <=, >=','Opérateurs logiques : and, or, not','Blocs d\'indentation'],
      },
      {
        titre: '1.3 Fonctions',
        notions: ['Définition : def nom(paramètres):','Instruction return','Paramètres et arguments','Portée des variables'],
      },
      {
        titre: '1.4 Boucles',
        notions: ['Boucle bornée : for i in range(n):','Boucle conditionnelle : while condition:','Accumulation de résultats','break et continue'],
      },
    ],
  },
  {
    id: 'nombres-calculs',
    num: '2',
    titre: 'Nombres & Calculs',
    couleur: '#4f6ef7',
    icone: '🔢',
    tag: 'Algèbre',
    souschap: [
      {
        titre: '2.1 Puissances entières relatives',
        notions: ['aⁿ avec n entier relatif','a⁻ⁿ = 1/aⁿ','aᵐ × aⁿ = aᵐ⁺ⁿ','(aᵐ)ⁿ = aᵐⁿ','aᵐ / aⁿ = aᵐ⁻ⁿ'],
        formules: [
          { f: 'aᵐ × aⁿ = aᵐ⁺ⁿ', desc: 'Produit de puissances' },
          { f: '(aᵐ)ⁿ = aᵐⁿ', desc: 'Puissance d\'une puissance' },
          { f: 'a⁻ⁿ = 1/aⁿ', desc: 'Puissance négative' },
        ],
      },
      {
        titre: '2.2 Racine carrée',
        notions: ['√a définie pour a ≥ 0','√(a²) = |a|','√(a×b) = √a × √b','√(a/b) = √a / √b','Simplification et rationalisation'],
        formules: [
          { f: '(√a)² = a', desc: 'Définition' },
          { f: '√(ab) = √a·√b', desc: 'Produit sous racine' },
        ],
      },
      {
        titre: '2.3 Multiples, diviseurs & nombres premiers',
        notions: ['Divisibilité : a divise b si b = k×a','PGCD et algorithme d\'Euclide','PPCM : PPCM(a,b) = a×b / PGCD(a,b)','Décomposition en facteurs premiers','Critères de divisibilité (2, 3, 5, 9)'],
        formules: [
          { f: 'PGCD × PPCM = a × b', desc: 'Relation PGCD/PPCM' },
        ],
      },
      {
        titre: '2.4 Ensembles de nombres',
        notions: ['ℕ ⊂ ℤ ⊂ D ⊂ ℚ ⊂ ℝ','Irrationnels : √2, π, e…','Écriture décimale finie ou infinie périodique','Densité de ℚ dans ℝ'],
      },
    ],
  },
  {
    id: 'intervalles-inequations',
    num: '3',
    titre: 'Intervalles, Inégalités & Inéquations',
    couleur: '#f59e0b',
    icone: '↔️',
    tag: 'Algèbre',
    souschap: [
      {
        titre: '3.1 Intervalles',
        notions: ['[a ; b], ]a ; b[, [a ; +∞[, ]−∞ ; b]','Union A∪B et intersection A∩B','Notation ensembliste','Complémentaire d\'un intervalle'],
        formules: [
          { f: '[a;b] = {x ∈ ℝ | a ≤ x ≤ b}', desc: 'Intervalle fermé' },
        ],
      },
      {
        titre: '3.2 Inégalités et inéquations',
        notions: ['Propriétés des inégalités','Addition/soustraction : conserve le sens','Multiplication par un réel positif : conserve le sens','Multiplication par un réel négatif : inverse le sens','Résolution d\'inéquations du 1er degré'],
        formules: [
          { f: 'Si a < b et c < 0 → ac > bc', desc: 'Inversion du sens' },
        ],
      },
      {
        titre: '3.3 Valeur absolue',
        notions: ['|x| = x si x ≥ 0, |x| = −x si x < 0','|x| = distance de x à 0 sur la droite réelle','|x − a| = distance de x à a','|x| < r ⟺ −r < x < r','|x| > r ⟺ x < −r ou x > r'],
        formules: [
          { f: '|x−a| < r ⟺ a−r < x < a+r', desc: 'Inéquation valeur absolue' },
          { f: '|a·b| = |a|·|b|', desc: 'Produit' },
        ],
      },
    ],
  },
  {
    id: 'calcul-litteral',
    num: '4',
    titre: 'Calcul Littéral',
    couleur: '#8b5cf6',
    icone: '✏️',
    tag: 'Algèbre',
    souschap: [
      {
        titre: '4.1 Distributivité & Identités remarquables',
        notions: ['Développement : k(a+b) = ka + kb','(a+b)² = a² + 2ab + b²','(a−b)² = a² − 2ab + b²','(a+b)(a−b) = a² − b²','Factorisation : reconnaître les identités'],
        formules: [
          { f: '(a+b)² = a²+2ab+b²', desc: 'Carré d\'une somme' },
          { f: '(a−b)² = a²−2ab+b²', desc: 'Carré d\'une différence' },
          { f: '(a+b)(a−b) = a²−b²', desc: 'Produit de conjugués' },
        ],
      },
      {
        titre: '4.2 Équation produit nul',
        notions: ['A × B = 0 ⟺ A = 0 ou B = 0','Factorisation avant résolution','Équations de la forme (ax+b)(cx+d) = 0','Vérification des solutions'],
        formules: [
          { f: 'A·B = 0 ⟺ A=0 ou B=0', desc: 'Propriété du produit nul' },
        ],
      },
      {
        titre: '4.3 Fractions algébriques',
        notions: ['Simplification de fractions','Conditions d\'existence (dénominateur ≠ 0)','Opérations sur les fractions algébriques','Mise au même dénominateur'],
      },
      {
        titre: '4.4 Équation quotient',
        notions: ['A/B = 0 ⟺ A = 0 et B ≠ 0','Résolution d\'inéquations avec fraction','Tableau de signes d\'un quotient'],
        formules: [
          { f: 'A/B = 0 ⟺ A=0 et B≠0', desc: 'Équation quotient' },
        ],
      },
    ],
  },
  {
    id: 'geometrie-non-reperee',
    num: '5',
    titre: 'Géométrie non Repérée & Vecteurs',
    couleur: '#ec4899',
    icone: '📐',
    tag: 'Géométrie',
    souschap: [
      {
        titre: '5.1 Rappels géométrie',
        notions: ['Triangles : angles, côtés, Pythagore, trigonométrie','Quadrilatères : parallélogramme, rectangle, losange, carré','Cercles : rayon, diamètre, arc, angle inscrit','Théorème de Thalès et réciproque'],
        formules: [
          { f: 'a² = b² + c² (angle droit en A)', desc: 'Pythagore' },
          { f: 'cos α = adj/hyp, sin α = opp/hyp', desc: 'Trigonométrie' },
        ],
      },
      {
        titre: '5.2 Translations et vecteurs',
        notions: ['Vecteur AB⃗ : direction, sens, norme','Égalité de vecteurs : AB⃗ = CD⃗','Translation de vecteur u⃗','Vecteur nul 0⃗'],
        formules: [
          { f: '‖AB⃗‖ = AB (distance)', desc: 'Norme d\'un vecteur' },
        ],
      },
      {
        titre: '5.3 Opérations sur les vecteurs',
        notions: ['Addition : u⃗ + v⃗ (règle du parallélogramme)','Relation de Chasles : AC⃗ = AB⃗ + BC⃗','Vecteur opposé : −u⃗','Multiplication par un scalaire : ku⃗'],
        formules: [
          { f: 'AC⃗ = AB⃗ + BC⃗', desc: 'Relation de Chasles' },
          { f: 'AA⃗ = 0⃗', desc: 'Vecteur nul' },
        ],
      },
      {
        titre: '5.4 Colinéarité',
        notions: ['u⃗ et v⃗ colinéaires ⟺ u⃗ = k·v⃗','Condition de colinéarité ⟺ droites parallèles ou confondues','Application : alignement de trois points'],
        formules: [
          { f: 'u⃗ = k·v⃗ ⟺ colinéaires', desc: 'Colinéarité' },
        ],
      },
    ],
  },
  {
    id: 'vecteurs-repere',
    num: '6',
    titre: 'Vecteurs & Repère',
    couleur: '#06b6d4',
    icone: '🗺️',
    tag: 'Géométrie',
    souschap: [
      {
        titre: '6.1 Base et repère',
        notions: ['Repère (O ; i⃗, j⃗) : origine + base','Coordonnées d\'un point M(x ; y)','Coordonnées d\'un vecteur u⃗(a ; b) = (x_B−x_A ; y_B−y_A)','Opérations en coordonnées'],
        formules: [
          { f: 'AB⃗(x_B−x_A ; y_B−y_A)', desc: 'Coordonnées d\'un vecteur' },
          { f: 'u⃗+v⃗ = (a+a\' ; b+b\')', desc: 'Addition en coordonnées' },
        ],
      },
      {
        titre: '6.2 Milieu et distance',
        notions: ['Milieu I de [AB] : coordonnées = moyennes','Distance AB = norme de AB⃗','Norme : ‖u⃗‖ = √(a²+b²)'],
        formules: [
          { f: 'I = ((xA+xB)/2 ; (yA+yB)/2)', desc: 'Milieu' },
          { f: 'AB = √((xB−xA)²+(yB−yA)²)', desc: 'Distance' },
          { f: '‖u⃗‖ = √(a²+b²)', desc: 'Norme' },
        ],
      },
      {
        titre: '6.3 Condition de colinéarité',
        notions: ['u⃗(a;b) et v⃗(a\';b\') colinéaires ⟺ ab\'−a\'b = 0','Déterminant = ab\'−a\'b','Application : trois points alignés','Application : deux droites parallèles'],
        formules: [
          { f: 'det(u⃗,v⃗) = ab\'−a\'b = 0', desc: 'Colinéarité en coordonnées' },
        ],
      },
    ],
  },
  {
    id: 'droites-systemes',
    num: '7',
    titre: 'Droites du Plan & Systèmes',
    couleur: '#f97316',
    icone: '📏',
    tag: 'Géométrie',
    souschap: [
      {
        titre: '7.1 Équations de droite',
        notions: ['Équation cartésienne : ax + by + c = 0','Équation réduite : y = mx + p','m = coefficient directeur (pente)','p = ordonnée à l\'origine','Vecteur directeur d⃗ compatible avec (a;b)'],
        formules: [
          { f: 'y = mx + p', desc: 'Équation réduite' },
          { f: 'm = (yB−yA)/(xB−xA)', desc: 'Coefficient directeur' },
        ],
      },
      {
        titre: '7.2 Positions relatives de deux droites',
        notions: ['Droites parallèles : même coefficient directeur (m)','Droites confondues : même équation','Droites sécantes : m ≠ m\'','Droites perpendiculaires : m × m\' = −1'],
        formules: [
          { f: 'd₁ ∥ d₂ ⟺ m₁ = m₂', desc: 'Droites parallèles' },
          { f: 'd₁ ⊥ d₂ ⟺ m₁·m₂ = −1', desc: 'Droites perpendiculaires' },
        ],
      },
      {
        titre: '7.3 Systèmes d\'équations',
        notions: ['Système de 2 équations à 2 inconnues','Méthode par substitution','Méthode par combinaison linéaire','Point d\'intersection = solution du système','Interprétation graphique'],
        formules: [
          { f: '{ax+by=e | cx+dy=f', desc: 'Forme générale' },
        ],
      },
    ],
  },
  {
    id: 'fonctions-generalites',
    num: '8',
    titre: 'Fonctions — Généralités',
    couleur: '#10b981',
    icone: '📈',
    tag: 'Fonctions',
    souschap: [
      {
        titre: '8.1 Notion de fonction',
        notions: ['Fonction f : D → ℝ','Ensemble de définition D','Image : f(x) = y (y = image de x par f)','Antécédent : x est antécédent de y si f(x) = y','Notation f(x), courbe représentative C_f'],
      },
      {
        titre: '8.2 Fonctions de référence',
        notions: ['f(x) = x² (parabole, paire)','f(x) = x³ (cubique, impaire)','f(x) = 1/x (hyperbole, impaire, x ≠ 0)','f(x) = √x (racine carrée, x ≥ 0)','Tableaux de variations et courbes à connaître'],
        formules: [
          { f: 'f(x) = x² : D = ℝ, décroissante sur ]−∞;0], croissante sur [0;+∞[', desc: 'Carré' },
          { f: 'f(x) = 1/x : D = ℝ\\ {0}, décroissante sur ]−∞;0[ et ]0;+∞[', desc: 'Inverse' },
        ],
      },
      {
        titre: '8.3 Parité',
        notions: ['Fonction paire : f(−x) = f(x) ∀x ∈ D — symétrie axe Oy','Fonction impaire : f(−x) = −f(x) ∀x ∈ D — symétrie par rapport à O','Lecture graphique de la parité'],
        formules: [
          { f: 'f paire ⟺ f(−x) = f(x)', desc: 'Parité' },
          { f: 'f impaire ⟺ f(−x) = −f(x)', desc: 'Imparité' },
        ],
      },
      {
        titre: '8.4 Résolutions graphiques',
        notions: ['f(x) = k : abscisses des intersections avec y = k','f(x) = g(x) : abscisses des intersections des courbes','f(x) > k : x pour lesquels la courbe est AU-DESSUS de y = k'],
      },
    ],
  },
  {
    id: 'variations-extremums',
    num: '9',
    titre: 'Variations & Extremums',
    couleur: '#4f6ef7',
    icone: '📊',
    tag: 'Fonctions',
    souschap: [
      {
        titre: '9.1 Variations d\'une fonction',
        notions: ['Croissante sur I : a < b ⟹ f(a) < f(b)','Décroissante sur I : a < b ⟹ f(a) > f(b)','Constante sur I : f(a) = f(b) ∀a,b ∈ I','Tableau de variations : synthèse des variations'],
      },
      {
        titre: '9.2 Fonctions affines',
        notions: ['f(x) = mx + p','m > 0 : croissante sur ℝ','m < 0 : décroissante sur ℝ','m = 0 : constante (f(x) = p)'],
        formules: [
          { f: 'm > 0 → croissante, m < 0 → décroissante', desc: 'Variations affine' },
        ],
      },
      {
        titre: '9.3 Maximum et minimum',
        notions: ['Maximum global : f(a) ≥ f(x) pour tout x ∈ D','Minimum global : f(a) ≤ f(x) pour tout x ∈ D','Extremum local : maximum ou minimum sur un intervalle','Lecture graphique des extremums'],
      },
    ],
  },
  {
    id: 'signe-fonction',
    num: '10',
    titre: 'Signe d\'une Fonction',
    couleur: '#8b5cf6',
    icone: '±',
    tag: 'Fonctions',
    souschap: [
      {
        titre: '10.1 Tableau de signes',
        notions: ['Signe de f(x) selon les valeurs de x','Zéro d\'une fonction : f(x₀) = 0','Le signe change au passage par un zéro (si la fonction change de signe)','Signe d\'une fonction affine ax + b','Racine : x₀ = −b/a'],
        formules: [
          { f: 'ax+b > 0 ⟺ x > −b/a (si a>0)', desc: 'Signe affine' },
        ],
      },
      {
        titre: '10.2 Signe d\'un produit ou quotient',
        notions: ['Règle des signes : (+)(+)=+, (+)(−)=−, (−)(−)=+','Tableau de signes d\'un produit ou d\'un quotient','Factoriser avant de dresser le tableau','Attention : quotient nul ⟺ numérateur nul ET dénominateur ≠ 0'],
        formules: [
          { f: 'sgn(A·B) = sgn(A)·sgn(B)', desc: 'Règle des signes produit' },
          { f: 'sgn(A/B) = sgn(A)·sgn(B) avec B≠0', desc: 'Règle des signes quotient' },
        ],
      },
      {
        titre: '10.3 Inéquations',
        notions: ['f(x) ≥ 0 : chercher les x où f est positive ou nulle','f(x) ≤ g(x) ⟺ f(x)−g(x) ≤ 0','Positions relatives de courbes','Utiliser le tableau de signes pour conclure'],
      },
    ],
  },
  {
    id: 'proportions-evolutions',
    num: '11',
    titre: 'Proportions & Évolutions',
    couleur: '#06b6d4',
    icone: '📉',
    tag: 'Stats',
    souschap: [
      {
        titre: '11.1 Proportion et proportion de proportion',
        notions: ['Proportion : p = (partie / total) × 100%','Proportion de proportion : p₁ × p₂','Exemple : 30% de 40% d\'une population = 12%'],
        formules: [
          { f: 'p = (n_A / n_total) × 100', desc: 'Proportion en %' },
          { f: 'p(A∩B) = p(A) × p(B/A)', desc: 'Proportion de proportion' },
        ],
      },
      {
        titre: '11.2 Évolutions et coefficient multiplicateur',
        notions: ['Taux d\'évolution t = (V_finale − V_initiale) / V_initiale','Coefficient multiplicateur : CM = 1 + t (si t en décimal)','Hausse de 20% → CM = 1,20','Baisse de 15% → CM = 0,85','Évolution en pourcentage ⟺ multiplication par CM'],
        formules: [
          { f: 'CM = 1 + t', desc: 'CM à partir du taux' },
          { f: 't = CM − 1', desc: 'Taux à partir du CM' },
          { f: 'V_f = V_i × CM', desc: 'Valeur finale' },
        ],
      },
      {
        titre: '11.3 Évolutions successives et réciproques',
        notions: ['Évolutions successives : CM_total = CM₁ × CM₂','Évolution réciproque (inverse) : CM\' = 1/CM','Exemple : +20% puis −20% ≠ 0% (CM = 1,20 × 0,80 = 0,96 → −4%)'],
        formules: [
          { f: 'CM_total = CM₁ × CM₂', desc: 'Évolutions successives' },
          { f: 'CM_inverse = 1/CM', desc: 'Évolution réciproque' },
        ],
      },
    ],
  },
  {
    id: 'statistiques-descriptives',
    num: '12',
    titre: 'Statistiques Descriptives',
    couleur: '#f59e0b',
    icone: '📋',
    tag: 'Stats',
    souschap: [
      {
        titre: '12.1 Moyenne',
        notions: ['Moyenne simple : x̄ = (Σxᵢ)/n','Moyenne pondérée : x̄ = (Σnᵢxᵢ)/(Σnᵢ)','Linéarité : ȳ = ax̄ + b si y = ax + b'],
        formules: [
          { f: 'x̄ = (x₁+x₂+…+xₙ)/n', desc: 'Moyenne simple' },
          { f: 'x̄_pond = Σ(nᵢxᵢ)/Σnᵢ', desc: 'Moyenne pondérée' },
          { f: 'ȳ = aẋ+b si y = ax+b', desc: 'Linéarité de la moyenne' },
        ],
      },
      {
        titre: '12.2 Écart-type',
        notions: ['Variance : V = (1/n)Σ(xᵢ−x̄)²','Écart-type : σ = √V','σ mesure la dispersion autour de la moyenne','σ = 0 : toutes les valeurs sont égales à x̄'],
        formules: [
          { f: 'V = (1/n)Σ(xᵢ−x̄)²', desc: 'Variance' },
          { f: 'σ = √V', desc: 'Écart-type' },
        ],
      },
      {
        titre: '12.3 Quartiles et médiane',
        notions: ['Médiane Me : 50% des données de chaque côté','Quartile Q₁ : 25% des données en dessous','Quartile Q₃ : 75% des données en dessous','Écart interquartile : EI = Q₃ − Q₁','Boîte à moustaches'],
        formules: [
          { f: 'EI = Q₃ − Q₁', desc: 'Écart interquartile' },
        ],
      },
    ],
  },
  {
    id: 'probabilites-echantillonnage',
    num: '13',
    titre: 'Probabilités & Échantillonnage',
    couleur: '#ec4899',
    icone: '🎲',
    tag: 'Probabilités',
    souschap: [
      {
        titre: '13.1 Loi de probabilité',
        notions: ['Univers Ω : ensemble de tous les résultats possibles','Événement : sous-ensemble de Ω','Probabilité P : 0 ≤ P(A) ≤ 1 et P(Ω) = 1','Équiprobabilité : P(A) = card(A)/card(Ω)'],
        formules: [
          { f: 'P(A) = card(A)/card(Ω)', desc: 'Équiprobabilité' },
          { f: '0 ≤ P(A) ≤ 1', desc: 'Encadrement' },
        ],
      },
      {
        titre: '13.2 Opérations sur les événements',
        notions: ['Événement contraire : Ā, P(Ā) = 1 − P(A)','Événements incompatibles : A∩B = ∅','Événements indépendants : P(A∩B) = P(A)×P(B)','Formule de la réunion : P(A∪B) = P(A)+P(B)−P(A∩B)'],
        formules: [
          { f: 'P(Ā) = 1 − P(A)', desc: 'Événement contraire' },
          { f: 'P(A∪B) = P(A)+P(B)−P(A∩B)', desc: 'Réunion' },
          { f: 'P(A∩B) = P(A)·P(B) (indépendants)', desc: 'Indépendance' },
        ],
      },
      {
        titre: '13.3 Échantillonnage et fluctuation',
        notions: ['Échantillon de taille n d\'une population de proportion p','Fréquence observée f dans l\'échantillon','Fluctuation d\'échantillonnage : f varie autour de p','Intervalle de fluctuation au seuil 95% :','[p − 1/√n ; p + 1/√n]'],
        formules: [
          { f: '[p−1/√n ; p+1/√n]', desc: 'Intervalle de fluctuation 95%' },
        ],
      },
    ],
  },
]

export default function MathsSecondePage() {
  const TAGS: Record<string, string> = {
    'Informatique': '#06d6a0', 'Algèbre': '#4f6ef7', 'Géométrie': '#ec4899',
    'Fonctions': '#10b981', 'Stats': '#f59e0b', 'Probabilités': '#8b5cf6',
  }

  return (
    <>
      <Navbar />
      <main style={{ minHeight:'100vh', background:'var(--bg)', color:'var(--text)' }}>

        {/* Hero */}
        <section style={{ padding:'90px clamp(20px,5vw,60px) 40px', position:'relative', textAlign:'center' }}>
          <div style={{ position:'absolute', top:0, left:'50%', transform:'translateX(-50%)', width:700, height:320, background:'radial-gradient(circle, rgba(16,185,129,0.1) 0%, transparent 70%)', pointerEvents:'none' }} />
          <div style={{ display:'flex', alignItems:'center', gap:10, justifyContent:'center', marginBottom:16 }}>
            <Link href="/bac-france/maths" style={{ fontSize:13, color:'var(--muted)', textDecoration:'none' }}>← Mathématiques France</Link>
            <span style={{ color:'var(--border)' }}>›</span>
            <span style={{ fontSize:13, color:'var(--text2)' }}>Seconde</span>
          </div>
          <div style={{ display:'inline-flex', alignItems:'center', gap:6, background:'rgba(16,185,129,0.1)', border:'1px solid rgba(16,185,129,0.3)', borderRadius:100, padding:'5px 16px', fontSize:12, color:'#10b981', marginBottom:16, fontWeight:700 }}>
            📐 Mathématiques · Classe de Seconde Générale
          </div>
          <h1 style={{ fontFamily:'var(--font-display)', fontWeight:800, fontSize:'clamp(28px,4vw,52px)', lineHeight:1.1, marginBottom:12 }}>
            Programme Maths{' '}
            <span style={{ background:'linear-gradient(90deg,#10b981,#06b6d4)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>Seconde</span>
          </h1>
          <p style={{ fontSize:15, color:'var(--text2)', maxWidth:560, margin:'0 auto 8px' }}>
            13 chapitres · Programme officiel Éducation Nationale · Cours complets avec définitions, théorèmes et exercices
          </p>
          <p style={{ fontSize:12, color:'var(--muted)' }}>
            Algorithmique · Algèbre · Géométrie · Fonctions · Statistiques & Probabilités
          </p>
        </section>

        <div className="container" style={{ maxWidth:1100, paddingBottom:80 }}>

          {/* Progression */}
          <div style={{ background:'rgba(255,255,255,0.03)', border:'1px solid var(--border)', borderRadius:14, padding:'16px 24px', marginBottom:36 }}>
            <div style={{ fontSize:12, color:'var(--muted)', marginBottom:10, fontWeight:600 }}>📅 PROGRESSION PÉDAGOGIQUE</div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16, fontSize:12 }}>
              <div>
                <div style={{ color:'var(--accent)', fontWeight:700, marginBottom:6 }}>Semestre 1</div>
                <div style={{ color:'var(--text2)', lineHeight:2 }}>
                  Ch.1 Python · Ch.2 Nombres · Ch.3 Intervalles<br/>
                  Ch.4 Calcul littéral · Ch.5 Géométrie · Ch.6 Vecteurs · Ch.7 Droites
                </div>
              </div>
              <div style={{ borderLeft:'1px solid var(--border)', paddingLeft:16 }}>
                <div style={{ color:'#10b981', fontWeight:700, marginBottom:6 }}>Semestre 2</div>
                <div style={{ color:'var(--text2)', lineHeight:2 }}>
                  Ch.8 Fonctions · Ch.9 Variations · Ch.10 Signes<br/>
                  Ch.11 Évolutions · Ch.12 Statistiques · Ch.13 Probabilités
                </div>
              </div>
            </div>
          </div>

          {/* Grille chapitres */}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(320px, 1fr))', gap:20 }}>
            {CHAPITRES.map(ch => (
              <div key={ch.id} className="card" style={{ padding:24, position:'relative', borderLeft:`3px solid ${ch.couleur}` }}>

                {/* Header */}
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:14 }}>
                  <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                    <div style={{ width:40, height:40, background:`${ch.couleur}18`, border:`1px solid ${ch.couleur}40`, borderRadius:10, display:'flex', alignItems:'center', justifyContent:'center', fontSize:20 }}>
                      {ch.icone}
                    </div>
                    <div>
                      <div style={{ fontSize:10, color:'var(--muted)', fontFamily:'var(--font-mono)', fontWeight:700 }}>CHAPITRE {ch.num}</div>
                      <div style={{ fontFamily:'var(--font-display)', fontWeight:800, fontSize:15, lineHeight:1.2, color:'var(--text)' }}>{ch.titre}</div>
                    </div>
                  </div>
                  <span style={{ fontSize:10, fontWeight:700, padding:'3px 8px', borderRadius:20, background:`${TAGS[ch.tag] || ch.couleur}18`, color: TAGS[ch.tag] || ch.couleur, border:`1px solid ${TAGS[ch.tag] || ch.couleur}30`, flexShrink:0 }}>
                    {ch.tag}
                  </span>
                </div>

                {/* Sous-chapitres */}
                <div style={{ display:'flex', flexDirection:'column', gap:6, marginBottom:16 }}>
                  {ch.souschap.slice(0, 3).map((s, i) => (
                    <div key={i} style={{ fontSize:11, color:'var(--text2)', display:'flex', alignItems:'flex-start', gap:6 }}>
                      <span style={{ color: ch.couleur, fontWeight:700, flexShrink:0, marginTop:1 }}>›</span>
                      <span>{s.titre}</span>
                    </div>
                  ))}
                  {ch.souschap.length > 3 && (
                    <div style={{ fontSize:11, color:'var(--muted)' }}>+ {ch.souschap.length - 3} autre(s) partie(s)</div>
                  )}
                </div>

                {/* Formules clés aperçu */}
                {(ch.souschap[0] as any).formules?.length > 0 && (
                  <div style={{ background:'rgba(255,255,255,0.03)', borderRadius:8, padding:'8px 10px', marginBottom:14, fontSize:11 }}>
                    <div style={{ color:'var(--muted)', marginBottom:4 }}>Formule clé :</div>
                    <div style={{ fontFamily:'var(--font-mono)', color: ch.couleur, fontWeight:700 }}>
                      {(ch.souschap[0] as any).formules[0].f}
                    </div>
                  </div>
                )}

                <Link href={`/bac-france/maths/seconde/${ch.id}`}
                  style={{ display:'flex', alignItems:'center', gap:6, fontSize:12, color: ch.couleur, textDecoration:'none', fontWeight:700 }}>
                  📖 Voir le cours complet →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
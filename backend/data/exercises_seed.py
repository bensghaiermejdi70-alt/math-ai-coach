"""
Données initiales — Exercices Bac Tunisie 4ème Maths
Couvre les 11 chapitres du programme officiel.
"""

EXERCISES = [
    # ── LIMITES & CONTINUITÉ ──────────────────────────────────────
    {
        "title": "Limite en l'infini",
        "question": "Calculer : lim(x→+∞) (2x² - 3x + 1) / (x² + 5)",
        "solution": "2",
        "difficulty": "facile",
        "chapter": "limites",
        "level": "bac",
        "points": 10,
        "steps": [
            {"label": "Forme indéterminée", "math": "∞/∞ — factoriser par x²"},
            {"label": "Factorisation", "math": "(2x² - 3x + 1) / (x² + 5) = x²(2 - 3/x + 1/x²) / x²(1 + 5/x²)"},
            {"label": "Simplification", "math": "= (2 - 3/x + 1/x²) / (1 + 5/x²)"},
            {"label": "Passage à la limite", "math": "quand x→+∞ : 1/x → 0,  1/x² → 0"},
            {"label": "Résultat", "math": "lim = (2 - 0 + 0) / (1 + 0) = 2"},
        ]
    },
    {
        "title": "Limite en 0 — forme indéterminée",
        "question": "Calculer : lim(x→0) sin(3x) / x",
        "solution": "3",
        "difficulty": "moyen",
        "chapter": "limites",
        "level": "bac",
        "points": 15,
        "steps": [
            {"label": "Forme indéterminée 0/0", "math": "sin(3x)/x quand x→0"},
            {"label": "Réécriture", "math": "sin(3x)/x = 3 × sin(3x)/(3x)"},
            {"label": "Limite classique", "math": "lim(u→0) sin(u)/u = 1"},
            {"label": "Résultat", "math": "lim = 3 × 1 = 3"},
        ]
    },
    {
        "title": "Continuité et prolongement",
        "question": "f(x) = (x² - 4)/(x - 2) pour x ≠ 2. Peut-on prolonger f par continuité en x=2 ?",
        "solution": "Oui, f̃(2) = 4",
        "difficulty": "moyen",
        "chapter": "limites",
        "level": "bac",
        "points": 15,
        "steps": [
            {"label": "Calcul de la limite", "math": "lim(x→2) (x² - 4)/(x - 2)"},
            {"label": "Factorisation", "math": "x² - 4 = (x-2)(x+2)"},
            {"label": "Simplification", "math": "(x-2)(x+2)/(x-2) = x+2 pour x≠2"},
            {"label": "Limite", "math": "lim(x→2) (x+2) = 4"},
            {"label": "Prolongement", "math": "On pose f̃(2) = 4 → f̃ continue en 2"},
        ]
    },

    # ── NOMBRES COMPLEXES ─────────────────────────────────────────
    {
        "title": "Module et argument",
        "question": "Soit z = 1 + i√3. Calculer le module et l'argument de z.",
        "solution": "|z| = 2, arg(z) = π/3",
        "difficulty": "facile",
        "chapter": "complexes",
        "level": "bac",
        "points": 10,
        "steps": [
            {"label": "Module", "math": "|z| = √(1² + (√3)²) = √(1 + 3) = √4 = 2"},
            {"label": "Forme trigonométrique", "math": "z = 2(1/2 + i√3/2)"},
            {"label": "Identification", "math": "cos(θ) = 1/2 et sin(θ) = √3/2"},
            {"label": "Argument", "math": "θ = π/3"},
            {"label": "Résultat", "math": "z = 2(cos(π/3) + i·sin(π/3)) = 2e^(iπ/3)"},
        ]
    },
    {
        "title": "Équation dans ℂ",
        "question": "Résoudre dans ℂ : z² + 2z + 5 = 0",
        "solution": "z₁ = -1 + 2i,  z₂ = -1 - 2i",
        "difficulty": "moyen",
        "chapter": "complexes",
        "level": "bac",
        "points": 15,
        "steps": [
            {"label": "Discriminant", "math": "Δ = 4 - 20 = -16 < 0"},
            {"label": "Δ < 0 → solutions complexes", "math": "√Δ = √(-16) = 4i"},
            {"label": "Solutions", "math": "z = (-2 ± 4i) / 2"},
            {"label": "Résultat", "math": "z₁ = -1 + 2i  et  z₂ = -1 - 2i"},
        ]
    },

    # ── SUITES ───────────────────────────────────────────────────
    {
        "title": "Suite arithmétique",
        "question": "Soit (uₙ) une suite arithmétique avec u₀ = 3 et r = 5. Calculer u₁₀ et S₁₀ = Σ uₖ (k=0 à 10).",
        "solution": "u₁₀ = 53,  S₁₀ = 308",
        "difficulty": "facile",
        "chapter": "suites",
        "level": "bac",
        "points": 10,
        "steps": [
            {"label": "Terme général", "math": "uₙ = u₀ + n·r = 3 + 5n"},
            {"label": "u₁₀", "math": "u₁₀ = 3 + 5×10 = 53"},
            {"label": "Somme arithmétique", "math": "S = (n+1)(u₀ + uₙ)/2"},
            {"label": "S₁₀", "math": "S₁₀ = 11 × (3 + 53)/2 = 11 × 28 = 308"},
        ]
    },
    {
        "title": "Suite géométrique",
        "question": "Soit (vₙ) définie par v₀ = 2 et vₙ₊₁ = 3vₙ. Calculer v₅ et Σ vₖ (k=0 à 5).",
        "solution": "v₅ = 486,  S = 728",
        "difficulty": "facile",
        "chapter": "suites",
        "level": "bac",
        "points": 10,
        "steps": [
            {"label": "Terme général", "math": "vₙ = v₀ × qⁿ = 2 × 3ⁿ"},
            {"label": "v₅", "math": "v₅ = 2 × 3⁵ = 2 × 243 = 486"},
            {"label": "Somme géométrique", "math": "S = v₀ × (q^(n+1) - 1)/(q - 1)"},
            {"label": "S₅", "math": "S = 2 × (3⁶ - 1)/(3-1) = 2 × 728/2 = 728"},
        ]
    },

    # ── DÉRIVÉES ──────────────────────────────────────────────────
    {
        "title": "Dérivée d'un produit",
        "question": "Calculer la dérivée de f(x) = (2x + 1)·e^x",
        "solution": "f'(x) = (2x + 3)·eˣ",
        "difficulty": "facile",
        "chapter": "derivees",
        "level": "bac",
        "points": 10,
        "steps": [
            {"label": "Règle du produit", "math": "(uv)' = u'v + uv'"},
            {"label": "Identification", "math": "u = 2x+1 → u' = 2  |  v = eˣ → v' = eˣ"},
            {"label": "Application", "math": "f'(x) = 2·eˣ + (2x+1)·eˣ"},
            {"label": "Factorisation", "math": "f'(x) = eˣ(2 + 2x + 1) = (2x+3)eˣ"},
        ]
    },
    {
        "title": "Étude de fonction",
        "question": "Soit f(x) = x³ - 3x + 2. Étudier les variations de f sur ℝ.",
        "solution": "Max local en x=-1 : f(-1)=4, Min local en x=1 : f(1)=0",
        "difficulty": "moyen",
        "chapter": "derivees",
        "level": "bac",
        "points": 20,
        "steps": [
            {"label": "Dérivée", "math": "f'(x) = 3x² - 3 = 3(x² - 1) = 3(x-1)(x+1)"},
            {"label": "Signe de f'", "math": "f'(x) > 0 si x ∈ ]-∞,-1[ ∪ ]1,+∞["},
            {"label": "f'(x) = 0", "math": "x = -1 (max local)  ou  x = 1 (min local)"},
            {"label": "Valeurs", "math": "f(-1) = -1+3+2 = 4  |  f(1) = 1-3+2 = 0"},
        ]
    },

    # ── LOGARITHME ────────────────────────────────────────────────
    {
        "title": "Équation logarithmique",
        "question": "Résoudre : ln(x + 1) + ln(x - 1) = ln(3)",
        "solution": "x = √5",
        "difficulty": "moyen",
        "chapter": "logarithme",
        "level": "bac",
        "points": 15,
        "steps": [
            {"label": "Conditions d'existence", "math": "x > 1  (pour avoir x+1>0 et x-1>0)"},
            {"label": "Propriété ln(a)+ln(b)=ln(ab)", "math": "ln((x+1)(x-1)) = ln(3)"},
            {"label": "Simplification", "math": "ln(x² - 1) = ln(3)"},
            {"label": "x² - 1 = 3", "math": "x² = 4  →  x = ±2"},
            {"label": "Vérification", "math": "x = 2 vérifie x > 1  ✓  (x = -2 rejeté)"},
        ]
    },

    # ── EXPONENTIELLE ─────────────────────────────────────────────
    {
        "title": "Équation exponentielle",
        "question": "Résoudre dans ℝ : e^(2x) - 3e^x + 2 = 0",
        "solution": "x = 0 ou x = ln(2)",
        "difficulty": "moyen",
        "chapter": "exponentielle",
        "level": "bac",
        "points": 15,
        "steps": [
            {"label": "Changement de variable", "math": "Poser X = eˣ  (X > 0)"},
            {"label": "Équation en X", "math": "X² - 3X + 2 = 0"},
            {"label": "Discriminant", "math": "Δ = 9 - 8 = 1  →  X = 1 ou X = 2"},
            {"label": "Retour en x", "math": "eˣ = 1 → x = 0  |  eˣ = 2 → x = ln(2)"},
        ]
    },

    # ── INTÉGRALES ────────────────────────────────────────────────
    {
        "title": "Intégrale par parties",
        "question": "Calculer : ∫₀¹ x·eˣ dx",
        "solution": "1",
        "difficulty": "difficile",
        "chapter": "integrales",
        "level": "bac",
        "points": 20,
        "steps": [
            {"label": "Intégration par parties : ∫u dv = uv - ∫v du", "math": "u = x → du = dx  |  dv = eˣdx → v = eˣ"},
            {"label": "Application", "math": "∫x·eˣ dx = x·eˣ - ∫eˣ dx = x·eˣ - eˣ + C"},
            {"label": "Primitive", "math": "F(x) = (x-1)eˣ"},
            {"label": "Calcul sur [0,1]", "math": "F(1) - F(0) = (1-1)e¹ - (0-1)e⁰ = 0 + 1 = 1"},
        ]
    },

    # ── PROBABILITÉS ──────────────────────────────────────────────
    {
        "title": "Loi binomiale",
        "question": "On lance un dé 4 fois. Calculer P(obtenir exactement 2 fois le chiffre 6).",
        "solution": "P = 25/216 ≈ 0.116",
        "difficulty": "moyen",
        "chapter": "probabilites",
        "level": "bac",
        "points": 15,
        "steps": [
            {"label": "Loi binomiale B(n,p)", "math": "n = 4 lancers,  p = 1/6 (prob d'un 6),  k = 2"},
            {"label": "Formule", "math": "P(X=k) = C(n,k) × pᵏ × (1-p)^(n-k)"},
            {"label": "Calcul", "math": "P(X=2) = C(4,2) × (1/6)² × (5/6)²"},
            {"label": "C(4,2) = 6", "math": "P = 6 × 1/36 × 25/36 = 150/1296 = 25/216"},
        ]
    },
    {
        "title": "Probabilités conditionnelles",
        "question": "P(A) = 0.4, P(B) = 0.5, P(A∩B) = 0.2. Calculer P(A|B) et vérifier si A et B sont indépendants.",
        "solution": "P(A|B) = 0.4, A et B sont indépendants",
        "difficulty": "moyen",
        "chapter": "probabilites",
        "level": "bac",
        "points": 15,
        "steps": [
            {"label": "Probabilité conditionnelle", "math": "P(A|B) = P(A∩B) / P(B) = 0.2 / 0.5 = 0.4"},
            {"label": "Test d'indépendance", "math": "A et B indépendants ⟺ P(A|B) = P(A)"},
            {"label": "Vérification", "math": "P(A|B) = 0.4 = P(A)  ✓"},
            {"label": "Conclusion", "math": "A et B sont indépendants"},
        ]
    },

    # ── ÉQUATIONS DIFFÉRENTIELLES ─────────────────────────────────
    {
        "title": "Équation différentielle du 1er ordre",
        "question": "Résoudre : y' - 2y = 0 avec y(0) = 3",
        "solution": "y(x) = 3e^(2x)",
        "difficulty": "moyen",
        "chapter": "equations-diff",
        "level": "bac",
        "points": 15,
        "steps": [
            {"label": "Équation homogène", "math": "y' = 2y  →  dy/y = 2dx"},
            {"label": "Intégration", "math": "ln|y| = 2x + C"},
            {"label": "Solution générale", "math": "y = A·e^(2x)  (A constante)"},
            {"label": "Condition initiale y(0)=3", "math": "y(0) = A·e⁰ = A = 3"},
            {"label": "Solution particulière", "math": "y(x) = 3e^(2x)"},
        ]
    },

    # ── GÉOMÉTRIE ESPACE ──────────────────────────────────────────
    {
        "title": "Produit scalaire dans l'espace",
        "question": "Soit A(1,0,0), B(0,1,0), C(0,0,1). Calculer AB⃗·AC⃗ et cos(∠BAC).",
        "solution": "AB⃗·AC⃗ = -1, cos(∠BAC) = -1/2, ∠BAC = 2π/3",
        "difficulty": "moyen",
        "chapter": "geometrie-espace",
        "level": "bac",
        "points": 15,
        "steps": [
            {"label": "Vecteurs", "math": "AB⃗ = (-1,1,0)  |  AC⃗ = (-1,0,1)"},
            {"label": "Produit scalaire", "math": "AB⃗·AC⃗ = (-1)(-1) + (1)(0) + (0)(1) = 1"},
            {"label": "Modules", "math": "|AB⃗| = √2  |  |AC⃗| = √2"},
            {"label": "cos(∠BAC)", "math": "cos(θ) = 1/(√2·√2) = 1/2"},
            {"label": "Angle", "math": "∠BAC = π/3"},
        ]
    },
]


def get_seed_data():
    """Retourne les données d'initialisation."""
    return EXERCISES

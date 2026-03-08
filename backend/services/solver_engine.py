"""
Moteur de résolution mathématique avec SymPy.
Détecte le type d'expression, résout et génère les étapes pédagogiques.
"""
import sympy as sp
from sympy import (
    symbols, solve, diff, integrate, limit, simplify,
    factor, expand, latex, sympify, sqrt, oo, E, I,
    cos, sin, tan, ln, exp, Matrix, det, Symbol,
    Rational, pi, zoo, nan
)
from sympy.parsing.sympy_parser import (
    parse_expr, standard_transformations,
    implicit_multiplication_application, convert_xor
)
import re
from typing import List, Dict, Any, Tuple


x, y, z, t, n = symbols('x y z t n')

TRANSFORMATIONS = standard_transformations + (
    implicit_multiplication_application,
    convert_xor,
)


def clean_expression(expr: str) -> str:
    """Nettoie et normalise l'expression."""
    expr = expr.strip()
    expr = expr.replace('²', '**2').replace('³', '**3')
    expr = expr.replace('√', 'sqrt')
    expr = expr.replace('×', '*').replace('÷', '/')
    expr = expr.replace('π', 'pi').replace('∞', 'oo')
    expr = expr.replace('≤', '<=').replace('≥', '>=')
    expr = expr.replace('ˣ', '**x').replace('^', '**')
    expr = re.sub(r'e\^', 'exp(1)**', expr)
    expr = re.sub(r'ln\(', 'log(', expr)
    return expr


def detect_type(expr: str) -> str:
    """Détecte le type d'expression."""
    e = expr.lower()
    if '∫' in expr or 'integrate' in e or 'integral' in e:
        return 'integral'
    if "f'(" in expr or "f'(x)" in expr or 'derive' in e or "f'=" in expr:
        return 'derivative'
    if 'lim' in e or 'limit' in e or '→' in expr or '->' in expr:
        return 'limit'
    if 'det(' in e or 'matrix' in e:
        return 'matrix'
    if 'i' in expr and ('z' in expr or 'complexe' in e):
        return 'complex'
    if ',' in expr and ('=' in expr) and ('system' in e or expr.count('=') >= 2):
        return 'system'
    if '=' in expr:
        return 'equation'
    if any(op in expr for op in ['d/dx', "'"]):
        return 'derivative'
    return 'expression'


def solve_equation(expr_str: str) -> Tuple[Any, List[Dict], str]:
    """Résout une équation."""
    steps = []
    # Séparer membre gauche et droit
    if '=' in expr_str:
        left, right = expr_str.split('=', 1)
        left_expr = parse_expr(clean_expression(left), transformations=TRANSFORMATIONS)
        right_expr = parse_expr(clean_expression(right), transformations=TRANSFORMATIONS)
        equation = left_expr - right_expr
    else:
        equation = parse_expr(clean_expression(expr_str), transformations=TRANSFORMATIONS)

    steps.append({
        "label": "Mise en forme",
        "math": f"f(x) = {sp.pretty(equation)} = 0"
    })

    # Degré
    degree = sp.degree(equation, x)
    if degree == 1:
        method = "Équation du 1er degré"
        steps.append({"label": "Type détecté", "math": "Équation linéaire : ax + b = 0"})
        a = equation.coeff(x, 1)
        b = equation.coeff(x, 0)
        steps.append({"label": "Coefficients", "math": f"a = {a},  b = {b}"})
        solution = solve(equation, x)
        steps.append({"label": "Solution", "math": f"x = -b/a = {solution[0]}"})

    elif degree == 2:
        method = "Équation du 2ème degré"
        steps.append({"label": "Type détecté", "math": "Équation du 2ème degré : ax² + bx + c = 0"})
        a = equation.coeff(x, 2)
        b_coef = equation.coeff(x, 1)
        c = equation.coeff(x, 0)
        steps.append({"label": "Coefficients", "math": f"a = {a},  b = {b_coef},  c = {c}"})
        delta = b_coef**2 - 4*a*c
        delta_simplified = simplify(delta)
        steps.append({"label": "Discriminant", "math": f"Δ = b² - 4ac = ({b_coef})² - 4×({a})×({c}) = {delta_simplified}"})
        solution = solve(equation, x)
        if delta_simplified > 0:
            steps.append({"label": "Δ > 0 → deux solutions réelles", "math": f"x = (-b ± √Δ) / 2a"})
        elif delta_simplified == 0:
            steps.append({"label": "Δ = 0 → solution double", "math": f"x₀ = -b / 2a"})
        else:
            steps.append({"label": "Δ < 0 → solutions complexes", "math": f"z = (-b ± i√|Δ|) / 2a"})
        steps.append({"label": "Solutions", "math": "  ·  ".join([f"x = {s}" for s in solution])})

    else:
        method = f"Équation de degré {degree}"
        solution = solve(equation, x)
        steps.append({"label": f"Résolution (degré {degree})", "math": str(equation) + " = 0"})
        steps.append({"label": "Solutions", "math": "  ·  ".join([str(s) for s in solution])})

    if not solution:
        result = "Aucune solution réelle"
    elif len(solution) == 1:
        result = f"x = {solution[0]}"
    else:
        result = "S = { " + "  ;  ".join([str(s) for s in solution]) + " }"

    return result, steps, method


def solve_derivative(expr_str: str) -> Tuple[Any, List[Dict], str]:
    """Calcule une dérivée."""
    steps = []
    # Extraire la fonction
    cleaned = clean_expression(expr_str)
    cleaned = re.sub(r"f'?\s*\(x\)\s*=\s*", "", cleaned)
    cleaned = re.sub(r"d/dx\s*", "", cleaned)

    expr = parse_expr(cleaned, transformations=TRANSFORMATIONS, local_dict={'x': x})
    steps.append({"label": "Fonction à dériver", "math": f"f(x) = {expr}"})

    # Décomposition pour l'explication
    derivative = diff(expr, x)
    simplified = simplify(derivative)

    steps.append({"label": "Application des règles de dérivation", "math": "Règles : (uv)' = u'v + uv', (u/v)' = (u'v - uv')/v², (f∘g)' = f'(g)·g'"})
    steps.append({"label": "Calcul", "math": f"f'(x) = {derivative}"})

    if simplified != derivative:
        steps.append({"label": "Simplification", "math": f"f'(x) = {simplified}"})

    return f"f'(x) = {simplified}", steps, "Dérivation"


def solve_integral(expr_str: str) -> Tuple[Any, List[Dict], str]:
    """Calcule une intégrale."""
    steps = []
    cleaned = clean_expression(expr_str)
    # Supprimer ∫ et dx
    cleaned = re.sub(r'[∫]', '', cleaned)
    cleaned = re.sub(r'd[xyzt]$', '', cleaned.strip())
    cleaned = cleaned.strip()

    # Intégrale définie avec bornes
    bounds_match = re.search(r'_\{?([^}^]+)\}?\^\{?([^}]+)\}?', expr_str)

    try:
        expr = parse_expr(cleaned, transformations=TRANSFORMATIONS, local_dict={'x': x})
        steps.append({"label": "Intégrale à calculer", "math": f"∫ {expr} dx"})

        primitive = integrate(expr, x)
        steps.append({"label": "Recherche de la primitive", "math": f"F(x) = {primitive} + C"})

        if bounds_match:
            a_bound = float(bounds_match.group(1))
            b_bound = float(bounds_match.group(2))
            result_val = integrate(expr, (x, a_bound, b_bound))
            steps.append({"label": "Application des bornes", "math": f"[F(x)]_{a_bound}^{b_bound} = F({b_bound}) - F({a_bound})"})
            steps.append({"label": "Résultat", "math": f"= {simplify(result_val)}"})
            return f"= {simplify(result_val)}", steps, "Intégration définie"

        return f"F(x) = {primitive} + C", steps, "Intégration indéfinie"

    except Exception as e:
        steps.append({"label": "Méthode", "math": "Intégration par parties ou substitution nécessaire"})
        return "Calcul complexe — voir détails", steps, "Intégration"


def solve_limit(expr_str: str) -> Tuple[Any, List[Dict], str]:
    """Calcule une limite."""
    steps = []
    cleaned = clean_expression(expr_str)

    # Parser "lim x→a f(x)"
    match = re.search(r'lim\s*[x(]?\s*[→->]+\s*([^\s,)]+)', expr_str, re.IGNORECASE)
    point_str = match.group(1) if match else '0'
    point_str = point_str.replace('∞', 'oo').replace('inf', 'oo')

    try:
        point = parse_expr(point_str)
    except:
        point = sp.Integer(0)

    # Extraire l'expression
    func_str = re.sub(r'lim\s*\(?\s*x\s*[→->]+\s*[^\s,)]+\s*\)?', '', expr_str, flags=re.IGNORECASE).strip()
    func_str = clean_expression(func_str) if func_str else cleaned

    try:
        expr = parse_expr(func_str, transformations=TRANSFORMATIONS, local_dict={'x': x})
        steps.append({"label": "Expression", "math": f"lim(x→{point_str}) {expr}"})

        # Essai substitution directe
        try:
            direct = expr.subs(x, point)
            if direct not in [sp.nan, zoo, sp.oo, -sp.oo] and not direct.has(sp.nan):
                steps.append({"label": "Substitution directe", "math": f"f({point_str}) = {direct}"})
                result = limit(expr, x, point)
                return f"= {result}", steps, "Limite par substitution"
        except:
            pass

        steps.append({"label": "Forme indéterminée", "math": "Utilisation de la règle de L'Hôpital ou factorisation"})
        result = limit(expr, x, point)
        steps.append({"label": "Résultat", "math": f"lim = {result}"})
        return f"= {result}", steps, "Calcul de limite"

    except Exception as e:
        return "Limite non calculable automatiquement", steps, "Limite"


def solve_system(expr_str: str) -> Tuple[Any, List[Dict], str]:
    """Résout un système d'équations."""
    steps = []
    equations_raw = [e.strip() for e in expr_str.split(',')]
    equations = []

    for eq_raw in equations_raw:
        if '=' in eq_raw:
            left, right = eq_raw.split('=', 1)
            l = parse_expr(clean_expression(left), transformations=TRANSFORMATIONS)
            r = parse_expr(clean_expression(right), transformations=TRANSFORMATIONS)
            equations.append(l - r)

    steps.append({"label": "Système d'équations", "math": "\n".join([f"({i+1}) {eq} = 0" for i, eq in enumerate(equations)])})
    steps.append({"label": "Méthode", "math": "Substitution ou méthode de Gauss"})

    free_symbols = set()
    for eq in equations:
        free_symbols |= eq.free_symbols

    solution = solve(equations, list(free_symbols))
    if solution:
        if isinstance(solution, dict):
            result_parts = [f"{k} = {v}" for k, v in solution.items()]
        else:
            result_parts = [str(s) for s in solution]
        result_str = ",  ".join(result_parts)
        steps.append({"label": "Solution", "math": result_str})
        return result_str, steps, "Système d'équations"
    else:
        steps.append({"label": "Résultat", "math": "Aucune solution ou infinité de solutions"})
        return "Pas de solution unique", steps, "Système"


def resolve(expression: str) -> Dict[str, Any]:
    """
    Point d'entrée principal — détecte le type et résout.
    Retourne { result, steps, method, type }
    """
    expr_type = detect_type(expression)

    try:
        if expr_type == 'equation':
            result, steps, method = solve_equation(expression)
        elif expr_type == 'derivative':
            result, steps, method = solve_derivative(expression)
        elif expr_type == 'integral':
            result, steps, method = solve_integral(expression)
        elif expr_type == 'limit':
            result, steps, method = solve_limit(expression)
        elif expr_type == 'system':
            result, steps, method = solve_system(expression)
        else:
            # Expression simple — simplifier
            cleaned = clean_expression(expression)
            expr = parse_expr(cleaned, transformations=TRANSFORMATIONS)
            simplified = simplify(expr)
            steps = [
                {"label": "Expression originale", "math": str(expr)},
                {"label": "Simplification", "math": str(simplified)},
            ]
            result = str(simplified)
            method = "Simplification"

        return {
            "result": str(result),
            "steps": steps,
            "method": method,
            "type": expr_type,
            "error": None,
        }

    except Exception as e:
        return {
            "result": "",
            "steps": [],
            "method": "",
            "type": expr_type,
            "error": f"Impossible de résoudre : {str(e)}. Vérifiez la syntaxe de l'expression.",
        }

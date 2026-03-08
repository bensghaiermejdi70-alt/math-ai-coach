from fastapi import APIRouter

router = APIRouter()

# TODO: Connecter à la DB utilisateur avec auth JWT

@router.get("/progress")
def get_progress():
    return {
        "overall": 72,
        "streak": 12,
        "totalSolved": 247,
        "rank": 34,
        "byChapter": [
            {"chapter": "Complexes",      "score": 82, "total": 32, "completed": 26},
            {"chapter": "Limites",         "score": 68, "total": 24, "completed": 16},
            {"chapter": "Suites",          "score": 75, "total": 20, "completed": 15},
            {"chapter": "Dérivées",        "score": 90, "total": 36, "completed": 32},
            {"chapter": "Logarithme",      "score": 55, "total": 18, "completed": 10},
            {"chapter": "Exponentielle",   "score": 70, "total": 18, "completed": 13},
            {"chapter": "Intégrales",      "score": 42, "total": 30, "completed": 13},
            {"chapter": "Probabilités",    "score": 78, "total": 26, "completed": 20},
            {"chapter": "Éq. Diff.",       "score": 60, "total": 16, "completed": 10},
            {"chapter": "Géom. Espace",    "score": 65, "total": 22, "completed": 14},
            {"chapter": "Isométries",      "score": 50, "total": 14, "completed": 7},
        ],
        "weak":   ["Intégrales", "Logarithme", "Isométries"],
        "strong": ["Dérivées", "Complexes", "Probabilités"],
    }

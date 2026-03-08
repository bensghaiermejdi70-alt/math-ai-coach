from fastapi import APIRouter
from datetime import datetime

router = APIRouter()

# TODO: Connecter à l'auth JWT dans la prochaine version
# Pour l'instant retourne un profil de démonstration

@router.get("/profile")
def get_profile():
    return {
        "id": "demo-user-001",
        "name": "Étudiant Démo",
        "email": "demo@mathai.tn",
        "level": "bac",
        "country": "tunisie",
        "joinedAt": "2025-09-01T00:00:00Z",
        "stats": {
            "solved": 47,
            "streak": 12,
            "score": 78,
            "rank": 34,
        }
    }

from fastapi import APIRouter, Query
from typing import Optional

router = APIRouter()

# Données statiques — examens Bac Tunisie (liens PDF Ministère de l'Éducation)
EXAMS_DATA = [
    {"id": "bac-2024-tn-p", "year": 2024, "country": "tunisie", "level": "bac", "session": "principale",
     "title": "Bac 2024 — Session Principale", "pdf_url": "/exams/bac2024_principale.pdf", "solution_url": "/exams/bac2024_principale_correction.pdf"},
    {"id": "bac-2024-tn-c", "year": 2024, "country": "tunisie", "level": "bac", "session": "controle",
     "title": "Bac 2024 — Session Contrôle", "pdf_url": "/exams/bac2024_controle.pdf", "solution_url": ""},
    {"id": "bac-2023-tn-p", "year": 2023, "country": "tunisie", "level": "bac", "session": "principale",
     "title": "Bac 2023 — Session Principale", "pdf_url": "/exams/bac2023_principale.pdf", "solution_url": "/exams/bac2023_principale_correction.pdf"},
    {"id": "bac-2023-tn-c", "year": 2023, "country": "tunisie", "level": "bac", "session": "controle",
     "title": "Bac 2023 — Session Contrôle", "pdf_url": "/exams/bac2023_controle.pdf", "solution_url": ""},
    {"id": "bac-2022-tn-p", "year": 2022, "country": "tunisie", "level": "bac", "session": "principale",
     "title": "Bac 2022 — Session Principale", "pdf_url": "/exams/bac2022_principale.pdf", "solution_url": "/exams/bac2022_principale_correction.pdf"},
    {"id": "bac-2022-tn-c", "year": 2022, "country": "tunisie", "level": "bac", "session": "controle",
     "title": "Bac 2022 — Session Contrôle", "pdf_url": "/exams/bac2022_controle.pdf", "solution_url": ""},
    {"id": "bac-2021-tn-p", "year": 2021, "country": "tunisie", "level": "bac", "session": "principale",
     "title": "Bac 2021 — Session Principale", "pdf_url": "/exams/bac2021_principale.pdf", "solution_url": "/exams/bac2021_principale_correction.pdf"},
    {"id": "bac-2020-tn-p", "year": 2020, "country": "tunisie", "level": "bac", "session": "principale",
     "title": "Bac 2020 — Session Principale", "pdf_url": "/exams/bac2020_principale.pdf", "solution_url": "/exams/bac2020_principale_correction.pdf"},
    {"id": "bac-2019-tn-p", "year": 2019, "country": "tunisie", "level": "bac", "session": "principale",
     "title": "Bac 2019 — Session Principale", "pdf_url": "/exams/bac2019_principale.pdf", "solution_url": "/exams/bac2019_principale_correction.pdf"},
    {"id": "bac-2018-tn-p", "year": 2018, "country": "tunisie", "level": "bac", "session": "principale",
     "title": "Bac 2018 — Session Principale", "pdf_url": "/exams/bac2018_principale.pdf", "solution_url": "/exams/bac2018_principale_correction.pdf"},
]


@router.get("/exams")
def get_exams(
    country: Optional[str] = Query("tunisie"),
    year: Optional[int] = Query(None),
    level: Optional[str] = Query(None),
    session: Optional[str] = Query(None),
):
    filtered = EXAMS_DATA

    if country:
        filtered = [e for e in filtered if e["country"] == country]
    if year:
        filtered = [e for e in filtered if e["year"] == year]
    if level:
        filtered = [e for e in filtered if e["level"] == level]
    if session:
        filtered = [e for e in filtered if e["session"] == session]

    return {"exams": filtered, "total": len(filtered)}

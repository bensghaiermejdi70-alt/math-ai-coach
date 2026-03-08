# MathAI Coach — Backend FastAPI

## Prérequis
- Python 3.11+
- PostgreSQL 14+
- Clé API Anthropic

## Installation

```bash
cd backend

# 1. Créer l'environnement virtuel
python -m venv venv
venv\Scripts\activate        # Windows
# source venv/bin/activate   # Linux/Mac

# 2. Installer les dépendances
pip install -r requirements.txt

# 3. Configurer les variables d'environnement
# Copier .env et remplir les valeurs :
ANTHROPIC_API_KEY=sk-ant-...
DATABASE_URL=postgresql://user:password@localhost:5432/mathai_coach

# 4. Créer la base de données PostgreSQL
# Dans psql :
CREATE DATABASE mathai_coach;
CREATE USER mathai WITH PASSWORD 'votre_mot_de_passe';
GRANT ALL PRIVILEGES ON DATABASE mathai_coach TO mathai;

# 5. Lancer le serveur
uvicorn main:app --reload --port 8000
```

## Endpoints disponibles

| Méthode | URL | Description |
|---------|-----|-------------|
| POST | /api/solve | Résoudre une expression mathématique |
| POST | /api/chat | Chat avec le professeur IA |
| GET | /api/exercises | Liste des exercices (filtres: chapter, difficulty, level) |
| POST | /api/exercises/check | Vérifier la réponse d'un étudiant |
| POST | /api/exercises/generate | Générer un exercice avec l'IA |
| GET | /api/exams | Liste des examens Bac |
| GET | /api/profile | Profil utilisateur |
| GET | /api/progress | Progression par chapitre |

## Documentation interactive
Après démarrage : http://localhost:8000/docs

## Structure
```
backend/
├── main.py              # App FastAPI + CORS
├── requirements.txt
├── .env                 # Variables d'environnement (NE PAS commiter)
├── routers/
│   ├── solver.py        # POST /api/solve
│   ├── chat.py          # POST /api/chat
│   ├── exercises.py     # GET+POST /api/exercises
│   ├── exams.py         # GET /api/exams
│   ├── profile.py       # GET /api/profile
│   └── progress.py      # GET /api/progress
├── services/
│   ├── solver_engine.py # SymPy — résolution + étapes pédagogiques
│   └── claude_service.py # Claude API — chat + vérification
├── models/
│   ├── database.py      # SQLAlchemy + PostgreSQL
│   ├── user.py
│   ├── exercise.py
│   ├── progress.py
│   └── exam.py
└── data/
    └── exercises_seed.py # 15 exercices Bac Tunisie
```

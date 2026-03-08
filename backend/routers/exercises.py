from fastapi import APIRouter, Depends, HTTPException, Query
from pydantic import BaseModel
from sqlalchemy.orm import Session
from typing import Optional
from models.database import get_db
from models.exercise import Exercise
from services.claude_service import check_answer, generate_exercise
from data.exercises_seed import EXERCISES
import uuid

router = APIRouter()


def seed_if_empty(db: Session):
    """Initialise la DB avec les exercices de base si vide."""
    count = db.query(Exercise).count()
    if count == 0:
        for ex in EXERCISES:
            db_ex = Exercise(
                id=str(uuid.uuid4()),
                title=ex["title"],
                question=ex["question"],
                solution=ex.get("solution", ""),
                steps=ex.get("steps", []),
                difficulty=ex["difficulty"],
                chapter=ex["chapter"],
                level=ex.get("level", "bac"),
                points=ex.get("points", 10),
            )
            db.add(db_ex)
        db.commit()


@router.get("/exercises")
def get_exercises(
    chapter: Optional[str] = Query(None),
    difficulty: Optional[str] = Query(None),
    level: Optional[str] = Query(None),
    limit: int = Query(20, le=50),
    db: Session = Depends(get_db),
):
    seed_if_empty(db)

    query = db.query(Exercise)
    if chapter:
        query = query.filter(Exercise.chapter == chapter)
    if difficulty:
        query = query.filter(Exercise.difficulty == difficulty)
    if level:
        query = query.filter(Exercise.level == level)

    exercises = query.limit(limit).all()

    return {
        "exercises": [
            {
                "id": ex.id,
                "title": ex.title,
                "question": ex.question,
                "difficulty": ex.difficulty,
                "chapter": ex.chapter,
                "level": ex.level,
                "points": ex.points,
                "solution": ex.solution,
                "steps": ex.steps or [],
            }
            for ex in exercises
        ]
    }


class CheckRequest(BaseModel):
    exerciseId: str
    answer: str

@router.post("/exercises/check")
def check_exercise(req: CheckRequest, db: Session = Depends(get_db)):
    ex = db.query(Exercise).filter(Exercise.id == req.exerciseId).first()
    if not ex:
        raise HTTPException(status_code=404, detail="Exercice introuvable")

    try:
        result = check_answer(
            question=ex.question,
            student_answer=req.answer,
            correct_solution=ex.solution or "",
            steps=ex.steps or [],
        )
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


class GenerateRequest(BaseModel):
    chapter: str
    difficulty: str = "moyen"
    level: str = "bac"

@router.post("/exercises/generate")
def generate(req: GenerateRequest, db: Session = Depends(get_db)):
    """Génère un exercice inédit avec l'IA et le sauvegarde."""
    try:
        data = generate_exercise(req.chapter, req.difficulty, req.level)
        ex = Exercise(
            id=str(uuid.uuid4()),
            title=data.get("title", f"Exercice {req.chapter}"),
            question=data.get("question", ""),
            solution=data.get("solution", ""),
            steps=data.get("steps", []),
            difficulty=req.difficulty,
            chapter=req.chapter,
            level=req.level,
            points=data.get("points", 10),
        )
        db.add(ex)
        db.commit()
        db.refresh(ex)

        return {
            "id": ex.id,
            "title": ex.title,
            "question": ex.question,
            "difficulty": ex.difficulty,
            "chapter": ex.chapter,
            "level": ex.level,
            "points": ex.points,
            "solution": ex.solution,
            "steps": ex.steps or [],
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

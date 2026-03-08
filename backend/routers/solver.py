from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from services.solver_engine import resolve

router = APIRouter()

class SolveRequest(BaseModel):
    expression: str

@router.post("/solve")
def solve(req: SolveRequest):
    if not req.expression.strip():
        raise HTTPException(status_code=400, detail="Expression vide")
    if len(req.expression) > 500:
        raise HTTPException(status_code=400, detail="Expression trop longue")

    result = resolve(req.expression)
    return result

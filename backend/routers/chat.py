from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Dict
from services.claude_service import chat as claude_chat

router = APIRouter()

class ChatRequest(BaseModel):
    message: str
    history: List[Dict] = []

@router.post("/chat")
def chat(req: ChatRequest):
    if not req.message.strip():
        raise HTTPException(status_code=400, detail="Message vide")
    if len(req.message) > 2000:
        raise HTTPException(status_code=400, detail="Message trop long (max 2000 caractères)")

    try:
        response = claude_chat(req.message, req.history)
        return {"response": response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erreur IA : {str(e)}")

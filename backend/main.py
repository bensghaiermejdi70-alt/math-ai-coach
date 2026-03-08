from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

load_dotenv()

from routers import solver, chat, exercises, exams, profile, progress
from models.database import engine, Base

# Créer les tables au démarrage
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="MathAI Coach API",
    description="Backend pour la plateforme d'apprentissage des mathématiques",
    version="1.0.0",
)

# CORS — autoriser le frontend Next.js
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        os.getenv("FRONTEND_URL", "http://localhost:3000"),
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers
app.include_router(solver.router,    prefix="/api", tags=["Solver"])
app.include_router(chat.router,      prefix="/api", tags=["Chat"])
app.include_router(exercises.router, prefix="/api", tags=["Exercises"])
app.include_router(exams.router,     prefix="/api", tags=["Exams"])
app.include_router(profile.router,   prefix="/api", tags=["Profile"])
app.include_router(progress.router,  prefix="/api", tags=["Progress"])

@app.get("/")
def root():
    return {
        "app": "MathAI Coach API",
        "version": "1.0.0",
        "status": "running",
        "docs": "/docs",
    }

@app.get("/health")
def health():
    return {"status": "ok"}

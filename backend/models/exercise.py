from sqlalchemy import Column, String, Integer, Text, Enum, JSON
from datetime import datetime
import uuid
from .database import Base

class Exercise(Base):
    __tablename__ = "exercises"

    id         = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    title      = Column(String, nullable=False)
    question   = Column(Text, nullable=False)
    solution   = Column(Text)
    steps      = Column(JSON)          # Liste d'étapes [{label, math}]
    difficulty = Column(Enum("facile", "moyen", "difficile", "bac", name="diff_enum"), default="moyen")
    chapter    = Column(String, nullable=False, index=True)
    level      = Column(Enum("bac", "universite", name="exlevel_enum"), default="bac")
    country    = Column(String, default="tunisie")
    points     = Column(Integer, default=10)
    created_at = Column(String, default=lambda: datetime.utcnow().isoformat())

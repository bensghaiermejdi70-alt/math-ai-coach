from sqlalchemy import Column, String, Integer, Text
import uuid
from .database import Base

class Exam(Base):
    __tablename__ = "exams"

    id           = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    year         = Column(Integer, nullable=False, index=True)
    country      = Column(String, default="tunisie")
    level        = Column(String, default="bac")          # bac | universite
    session      = Column(String, default="principale")   # principale | controle
    title        = Column(String)
    pdf_url      = Column(String)
    solution_url = Column(String)
    chapters     = Column(String)                         # JSON liste chapitres couverts

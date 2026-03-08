from sqlalchemy import Column, String, Integer, Float, ForeignKey, DateTime, JSON
from sqlalchemy.orm import relationship
from datetime import datetime
import uuid
from .database import Base

class Progress(Base):
    __tablename__ = "progress"

    id          = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id     = Column(String, ForeignKey("users.id"), nullable=False, index=True)
    chapter     = Column(String, nullable=False)
    score       = Column(Float, default=0)
    total       = Column(Integer, default=0)
    completed   = Column(Integer, default=0)
    updated_at  = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    user = relationship("User", back_populates="progresses")


class SolveHistory(Base):
    __tablename__ = "solve_history"

    id         = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id    = Column(String, ForeignKey("users.id"), nullable=True)
    expression = Column(String, nullable=False)
    result     = Column(String)
    expr_type  = Column(String)
    method     = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)

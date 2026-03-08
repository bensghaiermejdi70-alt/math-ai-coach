from sqlalchemy import Column, String, Integer, DateTime, Enum
from sqlalchemy.orm import relationship
from datetime import datetime
import uuid
from .database import Base

class User(Base):
    __tablename__ = "users"

    id         = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    name       = Column(String, nullable=False)
    email      = Column(String, unique=True, nullable=False, index=True)
    password   = Column(String, nullable=False)
    level      = Column(Enum("bac", "universite", name="level_enum"), default="bac")
    country    = Column(Enum("tunisie", "maroc", "france", name="country_enum"), default="tunisie")
    created_at = Column(DateTime, default=datetime.utcnow)

    progresses = relationship("Progress", back_populates="user", cascade="all, delete")

from sqlalchemy import Column, Integer, String, Boolean, Text, JSON
from sqlalchemy.orm import relationship # Import relationship
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    full_name = Column(String, nullable=True)
    is_active = Column(Boolean, default=True)
    bio = Column(Text, nullable=True)
    interests = Column(JSON, nullable=True)
    growth_goals = Column(JSON, nullable=True)

    todos = relationship("Todo", back_populates="owner", cascade="all, delete-orphan")
    journal_entries = relationship("JournalEntry", back_populates="owner", cascade="all, delete-orphan")
    notes = relationship("Note", back_populates="owner", cascade="all, delete-orphan")
    ai_feedbacks = relationship("AIFeedback", back_populates="owner", cascade="all, delete-orphan")

from sqlalchemy import Column, Integer, String, Text, Date, ForeignKey
from sqlalchemy.orm import relationship
from ..database import Base # Assuming Base is defined in database.py
import datetime

class JournalEntry(Base):
    __tablename__ = "journal_entries"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True, nullable=True)
    content = Column(Text, nullable=False) # Content should not be nullable
    date = Column(Date, nullable=False, default=datetime.date.today) # Date of the journal entry
    
    mood = Column(String, nullable=True)
    energy_level = Column(Integer, nullable=True) # e.g., 1-5 scale
    satisfaction_level = Column(Integer, nullable=True) # e.g., 1-5 scale
    
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    owner = relationship("User", back_populates="journal_entries")

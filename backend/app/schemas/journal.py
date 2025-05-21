from pydantic import BaseModel
from typing import Optional
import datetime

class JournalEntryBase(BaseModel):
    title: Optional[str] = None
    content: str
    date: datetime.date
    mood: Optional[str] = None
    energy_level: Optional[int] = None
    satisfaction_level: Optional[int] = None

class JournalEntryCreate(JournalEntryBase):
    pass

class JournalEntryUpdate(BaseModel): # All fields optional for partial updates
    title: Optional[str] = None
    content: Optional[str] = None
    date: Optional[datetime.date] = None
    mood: Optional[str] = None
    energy_level: Optional[int] = None
    satisfaction_level: Optional[int] = None

class JournalEntryRead(JournalEntryBase):
    id: int
    user_id: int

    class Config:
        orm_mode = True

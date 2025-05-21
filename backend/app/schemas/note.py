from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class NoteBase(BaseModel):
    title: Optional[str] = None
    content: str
    tags: Optional[List[str]] = []

class NoteCreate(NoteBase):
    pass

class NoteUpdate(BaseModel): # All fields optional for partial updates
    title: Optional[str] = None
    content: Optional[str] = None
    tags: Optional[List[str]] = None

class NoteRead(NoteBase):
    id: int
    user_id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True

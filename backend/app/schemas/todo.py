from pydantic import BaseModel
from typing import Optional
import datetime

class TodoBase(BaseModel):
    title: str
    description: Optional[str] = None
    due_date: Optional[datetime.datetime] = None
    is_completed: bool = False
    priority: Optional[int] = None
    category: Optional[str] = None

class TodoCreate(TodoBase):
    pass

class TodoUpdate(BaseModel): # All fields optional for partial updates
    title: Optional[str] = None
    description: Optional[str] = None
    due_date: Optional[datetime.datetime] = None
    is_completed: Optional[bool] = None
    priority: Optional[int] = None
    category: Optional[str] = None

class TodoRead(TodoBase):
    id: int
    user_id: int

    class Config:
        orm_mode = True

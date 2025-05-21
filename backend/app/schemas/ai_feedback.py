from pydantic import BaseModel
from typing import Optional, Dict, Any
from datetime import datetime

class AIFeedbackBase(BaseModel):
    feedback_type: str
    content: str
    meta_data: Optional[Dict[str, Any]] = None

class AIFeedbackCreate(AIFeedbackBase):
    pass

class AIFeedbackRead(AIFeedbackBase):
    id: int
    user_id: int
    created_at: datetime

    class Config:
        orm_mode = True

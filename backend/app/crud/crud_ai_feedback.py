from sqlalchemy.orm import Session
from typing import Optional
from .. import models, schemas

def create_ai_feedback(db: Session, feedback: schemas.ai_feedback.AIFeedbackCreate, user_id: int) -> models.ai_feedback.AIFeedback:
    db_feedback = models.ai_feedback.AIFeedback(
        **feedback.model_dump(), 
        user_id=user_id
    )
    db.add(db_feedback)
    db.commit()
    db.refresh(db_feedback)
    return db_feedback

def get_latest_feedback_by_type(db: Session, user_id: int, feedback_type: str) -> Optional[models.ai_feedback.AIFeedback]:
    return db.query(models.ai_feedback.AIFeedback)\
        .filter(models.ai_feedback.AIFeedback.user_id == user_id, models.ai_feedback.AIFeedback.feedback_type == feedback_type)\
        .order_by(models.ai_feedback.AIFeedback.created_at.desc())\
        .first()

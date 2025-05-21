from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import Optional, Dict, Any
from datetime import date # For date filtering

from .. import crud, models, schemas
from ..database import get_db
from ..core.dependencies import get_current_active_user
from ..services import llm_service

router = APIRouter(
    prefix="/api/v1/ai", 
    tags=["ai_coaching"], 
    dependencies=[Depends(get_current_active_user)]
)

@router.post("/feedback/request-daily-summary", response_model=schemas.ai_feedback.AIFeedbackRead)
async def request_daily_summary_feedback(
    *,
    db: Session = Depends(get_db),
    current_user: models.user.User = Depends(get_current_active_user)
):
    """
    Request and generate a daily summary feedback for the current user.
    """
    # Simplified data collection as per task requirements
    user_data = {
        "name": current_user.full_name or current_user.email,
        "completed_todos_count": 0, # Placeholder value
        "journal_entry_count": 0    # Placeholder value
    }
    # TODO: 실제 사용자 활동 데이터 수집 로직 개선 필요

    feedback_content = await llm_service.generate_daily_summary(user_data)
    
    feedback_create = schemas.ai_feedback.AIFeedbackCreate(
        feedback_type="daily_summary", 
        content=feedback_content, 
        meta_data=user_data
    )
    
    return crud.crud_ai_feedback.create_ai_feedback(db=db, feedback=feedback_create, user_id=current_user.id)

@router.get("/feedback/latest-daily-summary", response_model=Optional[schemas.ai_feedback.AIFeedbackRead])
async def get_latest_daily_summary_feedback(
    *,
    db: Session = Depends(get_db),
    current_user: models.user.User = Depends(get_current_active_user)
):
    """
    Retrieve the latest daily summary feedback for the current user.
    """
    return crud.crud_ai_feedback.get_latest_feedback_by_type(
        db=db, 
        user_id=current_user.id, 
        feedback_type="daily_summary"
    )

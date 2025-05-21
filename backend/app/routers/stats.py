from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import Optional
from datetime import date, timedelta

from ..services import stats_service
from ..schemas import stats as stats_schemas
from ..core.dependencies import get_current_active_user
from ..models import user as user_model # Renamed to avoid conflict with user variable
from ..database import get_db

router = APIRouter(
    prefix="/api/v1/stats", 
    tags=["statistics"], 
    dependencies=[Depends(get_current_active_user)]
)

@router.get("/weekly-summary", response_model=stats_schemas.WeeklyUserStats)
def get_weekly_summary(
    start_date_query: Optional[str] = Query(None, alias="startDate", description="주의 시작일 (YYYY-MM-DD). 없으면 이번 주 월요일."),
    db: Session = Depends(get_db),
    current_user: user_model.User = Depends(get_current_active_user) # Use the renamed import
):
    if start_date_query:
        try:
            current_week_start_date = date.fromisoformat(start_date_query)
        except ValueError:
            # Handle invalid date format if necessary, or let FastAPI handle validation
            # For simplicity, we'll assume valid format if provided, or rely on Pydantic/FastAPI validation
            pass 
    else:
        today = date.today()
        current_week_start_date = today - timedelta(days=today.weekday()) # Monday of the current week

    todo_stats = stats_service.calculate_weekly_todo_completion_rate(
        db, user_id=current_user.id, week_start_date=current_week_start_date
    )
    journal_stats = stats_service.calculate_weekly_journal_frequency(
        db, user_id=current_user.id, week_start_date=current_week_start_date
    )
    
    week_end_date = current_week_start_date + timedelta(days=6)
    
    return stats_schemas.WeeklyUserStats(
        week_start_date=current_week_start_date,
        week_end_date=week_end_date,
        todo_stats=todo_stats,
        journal_stats=journal_stats
    )

from datetime import date, timedelta
from sqlalchemy.orm import Session
from ..crud import crud_todo, crud_journal # Adjusted import path
from ..schemas import stats as stats_schemas # Adjusted import path

def calculate_weekly_todo_completion_rate(db: Session, user_id: int, week_start_date: date) -> stats_schemas.TodoCompletionRate:
    week_end_date = week_start_date + timedelta(days=6)
    due_todos = crud_todo.get_todos_by_user_for_stats(db, user_id=user_id, start_date=week_start_date, end_date=week_end_date)
    total_due_todos = len(due_todos)
    completed_todos = sum(1 for todo in due_todos if todo.is_completed)
    completion_rate = (completed_todos / total_due_todos) * 100 if total_due_todos > 0 else 0.0 # Rate as percentage
    return stats_schemas.TodoCompletionRate(
        total_due_todos=total_due_todos,
        completed_todos=completed_todos,
        completion_rate=completion_rate
    )

def calculate_weekly_journal_frequency(db: Session, user_id: int, week_start_date: date) -> stats_schemas.JournalFrequency:
    week_end_date = week_start_date + timedelta(days=6)
    entries = crud_journal.get_journal_entries_by_user_for_stats(db, user_id=user_id, start_date=week_start_date, end_date=week_end_date)
    total_entries = len(entries)
    return stats_schemas.JournalFrequency(total_entries=total_entries)

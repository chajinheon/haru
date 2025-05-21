from datetime import date
from pydantic import BaseModel

class TodoCompletionRate(BaseModel):
    total_due_todos: int
    completed_todos: int
    completion_rate: float

class JournalFrequency(BaseModel):
    total_entries: int

class WeeklyUserStats(BaseModel):
    week_start_date: date
    week_end_date: date
    todo_stats: TodoCompletionRate
    journal_stats: JournalFrequency

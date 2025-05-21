from sqlalchemy.orm import Session
from .. import models, schemas
from typing import List

def create_todo(db: Session, todo: schemas.todo.TodoCreate, user_id: int) -> models.todo.Todo:
    db_todo = models.todo.Todo(**todo.model_dump(), user_id=user_id)
    db.add(db_todo)
    db.commit()
    db.refresh(db_todo)
    return db_todo

def get_todos_by_user(db: Session, user_id: int, skip: int = 0, limit: int = 100) -> List[models.todo.Todo]:
    return db.query(models.todo.Todo).filter(models.todo.Todo.user_id == user_id).offset(skip).limit(limit).all()

def get_todo_by_id(db: Session, todo_id: int, user_id: int) -> Optional[models.todo.Todo]:
    return db.query(models.todo.Todo).filter(models.todo.Todo.id == todo_id, models.todo.Todo.user_id == user_id).first()

def update_todo(db: Session, db_todo: models.todo.Todo, todo_in: schemas.todo.TodoUpdate) -> models.todo.Todo:
    update_data = todo_in.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_todo, field, value)
    db.add(db_todo)
    db.commit()
    db.refresh(db_todo)
    return db_todo

def delete_todo(db: Session, db_todo: models.todo.Todo) -> None:
    db.delete(db_todo)
    db.commit()

def get_todos_by_user_for_stats(db: Session, user_id: int, start_date: date, end_date: date) -> List[models.todo.Todo]:
    return db.query(models.todo.Todo)\
        .filter(
            models.todo.Todo.user_id == user_id,
            models.todo.Todo.due_date >= start_date,
            models.todo.Todo.due_date <= end_date
        ).all()

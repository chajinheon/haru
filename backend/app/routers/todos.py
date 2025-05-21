from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from .. import crud, models, schemas
from ..database import get_db
from ..core.dependencies import get_current_active_user

router = APIRouter(prefix="/api/v1/todos", tags=["todos"])

@router.post("/", response_model=schemas.todo.TodoRead, status_code=status.HTTP_201_CREATED)
def create_new_todo(
    *,
    db: Session = Depends(get_db),
    todo_in: schemas.todo.TodoCreate,
    current_user: models.user.User = Depends(get_current_active_user)
):
    """
    Create new todo item for the current user.
    """
    todo = crud.crud_todo.create_todo(db=db, todo=todo_in, user_id=current_user.id)
    return todo

@router.get("/", response_model=List[schemas.todo.TodoRead])
def read_todos_for_user(
    db: Session = Depends(get_db),
    skip: int = 0,
    limit: int = 100,
    current_user: models.user.User = Depends(get_current_active_user)
):
    """
    Retrieve todo items for the current user.
    """
    todos = crud.crud_todo.get_todos_by_user(db=db, user_id=current_user.id, skip=skip, limit=limit)
    return todos

@router.get("/{todo_id}", response_model=schemas.todo.TodoRead)
def read_single_todo(
    todo_id: int,
    db: Session = Depends(get_db),
    current_user: models.user.User = Depends(get_current_active_user)
):
    """
    Retrieve a specific todo item by ID for the current user.
    """
    db_todo = crud.crud_todo.get_todo_by_id(db=db, todo_id=todo_id, user_id=current_user.id)
    if db_todo is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Todo not found")
    return db_todo

@router.put("/{todo_id}", response_model=schemas.todo.TodoRead)
def update_existing_todo(
    todo_id: int,
    todo_in: schemas.todo.TodoUpdate,
    db: Session = Depends(get_db),
    current_user: models.user.User = Depends(get_current_active_user)
):
    """
    Update a specific todo item by ID for the current user.
    """
    db_todo = crud.crud_todo.get_todo_by_id(db=db, todo_id=todo_id, user_id=current_user.id)
    if db_todo is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Todo not found")
    todo = crud.crud_todo.update_todo(db=db, db_todo=db_todo, todo_in=todo_in)
    return todo

@router.delete("/{todo_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_existing_todo(
    todo_id: int,
    db: Session = Depends(get_db),
    current_user: models.user.User = Depends(get_current_active_user)
):
    """
    Delete a specific todo item by ID for the current user.
    """
    db_todo = crud.crud_todo.get_todo_by_id(db=db, todo_id=todo_id, user_id=current_user.id)
    if db_todo is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Todo not found")
    crud.crud_todo.delete_todo(db=db, db_todo=db_todo)
    return # No content to return, FastAPI handles 204 status code response.

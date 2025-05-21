from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from .. import crud, models, schemas
from ..database import get_db
from ..core.dependencies import get_current_active_user

router = APIRouter(
    prefix="/api/v1/notes", 
    tags=["notes"], 
    dependencies=[Depends(get_current_active_user)] # Apply dependency at router level
)

@router.post("/", response_model=schemas.note.NoteRead, status_code=status.HTTP_201_CREATED)
def create_new_note(
    *,
    db: Session = Depends(get_db),
    note_in: schemas.note.NoteCreate,
    current_user: models.user.User = Depends(get_current_active_user) # Still need to get user for user_id
):
    """
    Create new note for the current user.
    """
    note = crud.crud_note.create_note(db=db, note=note_in, user_id=current_user.id)
    return note

@router.get("/", response_model=List[schemas.note.NoteRead])
def read_notes_for_user(
    db: Session = Depends(get_db),
    skip: int = 0,
    limit: int = 100,
    current_user: models.user.User = Depends(get_current_active_user)
):
    """
    Retrieve notes for the current user.
    """
    notes = crud.crud_note.get_notes_by_user(db=db, user_id=current_user.id, skip=skip, limit=limit)
    return notes

@router.get("/{note_id}", response_model=schemas.note.NoteRead)
def read_single_note(
    note_id: int,
    db: Session = Depends(get_db),
    current_user: models.user.User = Depends(get_current_active_user)
):
    """
    Retrieve a specific note by ID for the current user.
    """
    db_note = crud.crud_note.get_note_by_id(db=db, note_id=note_id, user_id=current_user.id)
    if db_note is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Note not found")
    return db_note

@router.put("/{note_id}", response_model=schemas.note.NoteRead)
def update_existing_note(
    note_id: int,
    note_in: schemas.note.NoteUpdate,
    db: Session = Depends(get_db),
    current_user: models.user.User = Depends(get_current_active_user)
):
    """
    Update a specific note by ID for the current user.
    """
    db_note = crud.crud_note.get_note_by_id(db=db, note_id=note_id, user_id=current_user.id)
    if db_note is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Note not found")
    note = crud.crud_note.update_note(db=db, db_note=db_note, note_in=note_in)
    return note

@router.delete("/{note_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_existing_note(
    note_id: int,
    db: Session = Depends(get_db),
    current_user: models.user.User = Depends(get_current_active_user)
):
    """
    Delete a specific note by ID for the current user.
    """
    db_note = crud.crud_note.get_note_by_id(db=db, note_id=note_id, user_id=current_user.id)
    if db_note is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Note not found")
    crud.crud_note.delete_note(db=db, db_note=db_note)
    return # No content to return, FastAPI handles 204 status code response.

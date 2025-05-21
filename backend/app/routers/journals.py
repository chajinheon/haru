from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from .. import crud, models, schemas
from ..database import get_db
from ..core.dependencies import get_current_active_user

router = APIRouter(prefix="/api/v1/journals", tags=["journals"])

@router.post("/", response_model=schemas.journal.JournalEntryRead, status_code=status.HTTP_201_CREATED)
def create_new_journal_entry(
    *,
    db: Session = Depends(get_db),
    entry_in: schemas.journal.JournalEntryCreate,
    current_user: models.user.User = Depends(get_current_active_user)
):
    """
    Create new journal entry for the current user.
    """
    entry = crud.crud_journal.create_journal_entry(db=db, entry=entry_in, user_id=current_user.id)
    return entry

@router.get("/", response_model=List[schemas.journal.JournalEntryRead])
def read_journal_entries_for_user(
    db: Session = Depends(get_db),
    skip: int = 0,
    limit: int = 100,
    current_user: models.user.User = Depends(get_current_active_user)
):
    """
    Retrieve journal entries for the current user.
    """
    entries = crud.crud_journal.get_journal_entries_by_user(db=db, user_id=current_user.id, skip=skip, limit=limit)
    return entries

@router.get("/{entry_id}", response_model=schemas.journal.JournalEntryRead)
def read_single_journal_entry(
    entry_id: int,
    db: Session = Depends(get_db),
    current_user: models.user.User = Depends(get_current_active_user)
):
    """
    Retrieve a specific journal entry by ID for the current user.
    """
    db_entry = crud.crud_journal.get_journal_entry_by_id(db=db, entry_id=entry_id, user_id=current_user.id)
    if db_entry is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Journal entry not found")
    return db_entry

@router.put("/{entry_id}", response_model=schemas.journal.JournalEntryRead)
def update_existing_journal_entry(
    entry_id: int,
    entry_in: schemas.journal.JournalEntryUpdate,
    db: Session = Depends(get_db),
    current_user: models.user.User = Depends(get_current_active_user)
):
    """
    Update a specific journal entry by ID for the current user.
    """
    db_entry = crud.crud_journal.get_journal_entry_by_id(db=db, entry_id=entry_id, user_id=current_user.id)
    if db_entry is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Journal entry not found")
    entry = crud.crud_journal.update_journal_entry(db=db, db_entry=db_entry, entry_in=entry_in)
    return entry

@router.delete("/{entry_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_existing_journal_entry(
    entry_id: int,
    db: Session = Depends(get_db),
    current_user: models.user.User = Depends(get_current_active_user)
):
    """
    Delete a specific journal entry by ID for the current user.
    """
    db_entry = crud.crud_journal.get_journal_entry_by_id(db=db, entry_id=entry_id, user_id=current_user.id)
    if db_entry is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Journal entry not found")
    crud.crud_journal.delete_journal_entry(db=db, db_entry=db_entry)
    return # No content to return, FastAPI handles 204 status code response.

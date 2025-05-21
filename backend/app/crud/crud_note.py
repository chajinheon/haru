from sqlalchemy.orm import Session
from .. import models, schemas
from typing import List, Optional

def create_note(db: Session, note: schemas.note.NoteCreate, user_id: int) -> models.note.Note:
    db_note = models.note.Note(**note.model_dump(), user_id=user_id) # Use model_dump() for Pydantic v2+
    db.add(db_note)
    db.commit()
    db.refresh(db_note)
    return db_note

def get_notes_by_user(db: Session, user_id: int, skip: int = 0, limit: int = 100) -> List[models.note.Note]:
    return db.query(models.note.Note).filter(models.note.Note.user_id == user_id).order_by(models.note.Note.updated_at.desc()).offset(skip).limit(limit).all()

def get_note_by_id(db: Session, note_id: int, user_id: int) -> Optional[models.note.Note]:
    return db.query(models.note.Note).filter(models.note.Note.id == note_id, models.note.Note.user_id == user_id).first()

def update_note(db: Session, db_note: models.note.Note, note_in: schemas.note.NoteUpdate) -> models.note.Note:
    update_data = note_in.model_dump(exclude_unset=True) # Use model_dump() for Pydantic v2+
    for field, value in update_data.items():
        if value is not None or (field == 'tags' and value == []): # Allow clearing tags with empty list
             setattr(db_note, field, value)
    db.add(db_note)
    db.commit()
    db.refresh(db_note)
    return db_note

def delete_note(db: Session, db_note: models.note.Note) -> None:
    db.delete(db_note)
    db.commit()

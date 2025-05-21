from sqlalchemy.orm import Session
from .. import models, schemas
from typing import List, Optional

def create_journal_entry(db: Session, entry: schemas.journal.JournalEntryCreate, user_id: int) -> models.journal.JournalEntry:
    db_entry = models.journal.JournalEntry(**entry.model_dump(), user_id=user_id)
    db.add(db_entry)
    db.commit()
    db.refresh(db_entry)
    return db_entry

def get_journal_entries_by_user(db: Session, user_id: int, skip: int = 0, limit: int = 100) -> List[models.journal.JournalEntry]:
    return db.query(models.journal.JournalEntry).filter(models.journal.JournalEntry.user_id == user_id).order_by(models.journal.JournalEntry.date.desc()).offset(skip).limit(limit).all()

def get_journal_entry_by_id(db: Session, entry_id: int, user_id: int) -> Optional[models.journal.JournalEntry]:
    return db.query(models.journal.JournalEntry).filter(models.journal.JournalEntry.id == entry_id, models.journal.JournalEntry.user_id == user_id).first()

def update_journal_entry(db: Session, db_entry: models.journal.JournalEntry, entry_in: schemas.journal.JournalEntryUpdate) -> models.journal.JournalEntry:
    update_data = entry_in.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_entry, field, value)
    db.add(db_entry)
    db.commit()
    db.refresh(db_entry)
    return db_entry

def delete_journal_entry(db: Session, db_entry: models.journal.JournalEntry) -> None:
    db.delete(db_entry)
    db.commit()

def get_journal_entries_by_user_for_stats(db: Session, user_id: int, start_date: date, end_date: date) -> List[models.journal.JournalEntry]:
    return db.query(models.journal.JournalEntry)\
        .filter(
            models.journal.JournalEntry.user_id == user_id,
            models.journal.JournalEntry.date >= start_date,
            models.journal.JournalEntry.date <= end_date
        ).all()

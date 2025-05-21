from sqlalchemy.orm import Session

from .. import models, schemas
from ..core.security import get_password_hash

def get_user_by_email(db: Session, email: str):
    return db.query(models.user.User).filter(models.user.User.email == email).first()

def create_user(db: Session, user: schemas.user.UserCreate):
    hashed_password = get_password_hash(user.password)
    db_user = models.user.User(
        email=user.email,
        hashed_password=hashed_password,
        full_name=user.full_name
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def update_user_profile(db: Session, db_user: models.user.User, user_in: schemas.user.UserUpdateProfile):
    update_data = user_in.model_dump(exclude_unset=True) # Use model_dump for Pydantic v2+
    for field, value in update_data.items():
        if value is not None: # Ensure we only update fields that are actually provided
            setattr(db_user, field, value)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

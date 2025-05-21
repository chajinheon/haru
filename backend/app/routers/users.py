from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from .. import crud, models, schemas
from ..database import get_db
from ..core.dependencies import get_current_active_user
from ..core.security import verify_password, get_password_hash # Import security functions

router = APIRouter(prefix="/api/v1/users", tags=["users"])

@router.get("/me", response_model=schemas.user.UserRead)
async def read_users_me(current_user: models.user.User = Depends(get_current_active_user)):
    """
    Get current logged-in user's profile.
    """
    return current_user

@router.put("/me", response_model=schemas.user.UserRead)
async def update_users_me(
    *,
    db: Session = Depends(get_db),
    user_in: schemas.user.UserUpdateProfile,
    current_user: models.user.User = Depends(get_current_active_user)
):
    """
    Update current logged-in user's profile.
    """
    user = crud.crud_user.update_user_profile(db=db, db_user=current_user, user_in=user_in)
    return user

@router.put("/me/password", status_code=status.HTTP_204_NO_CONTENT)
async def update_user_password(
    *,
    db: Session = Depends(get_db),
    password_data: schemas.user.UserUpdatePassword,
    current_user: models.user.User = Depends(get_current_active_user)
):
    """
    Update current logged-in user's password.
    """
    if not verify_password(password_data.current_password, current_user.hashed_password):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Incorrect current password")
    
    current_user.hashed_password = get_password_hash(password_data.new_password)
    db.add(current_user)
    db.commit()

@router.delete("/me", status_code=status.HTTP_204_NO_CONTENT)
async def delete_user_me(
    *,
    db: Session = Depends(get_db),
    current_user: models.user.User = Depends(get_current_active_user)
):
    """
    Delete current logged-in user's account.
    """
    db.delete(current_user)
    db.commit()

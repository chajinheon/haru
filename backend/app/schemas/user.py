from pydantic import BaseModel, EmailStr
from typing import Optional, List

class UserBase(BaseModel):
    email: EmailStr
    full_name: Optional[str] = None

class UserCreate(UserBase):
    password: str

class UserRead(UserBase):
    id: int
    is_active: bool
    bio: Optional[str] = None
    interests: Optional[List[str]] = None
    growth_goals: Optional[List[str]] = None

    class Config:
        orm_mode = True

class UserUpdateProfile(BaseModel):
    bio: Optional[str] = None
    interests: Optional[List[str]] = None
    growth_goals: Optional[List[str]] = None

class UserUpdatePassword(BaseModel):
    current_password: str
    new_password: str

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None

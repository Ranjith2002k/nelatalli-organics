from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import get_db
from models import User
from schemas import UserOut, UserUpdate
from auth import get_current_user

router = APIRouter(prefix="/api/users", tags=["Users"])


@router.get("/me", response_model=UserOut)
def get_profile(current_user: User = Depends(get_current_user)):
    return current_user


@router.put("/me", response_model=UserOut)
def update_profile(
    data: UserUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    if data.name is not None:
        current_user.name = data.name
    if data.phone is not None:
        current_user.phone = data.phone
    if data.address is not None:
        current_user.address = data.address
    if data.avatar is not None:
        current_user.avatar = data.avatar

    db.commit()
    db.refresh(current_user)
    return current_user

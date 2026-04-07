from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import datetime, timezone

from database import get_db
from models import User
from schemas import UserRegister, UserLogin, TokenOut, UserOut
from auth import hash_password, verify_password, create_access_token

router = APIRouter(prefix="/api/auth", tags=["Auth"])


@router.post("/register", response_model=TokenOut)
def register(data: UserRegister, db: Session = Depends(get_db)):
    existing = db.query(User).filter(User.email == data.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")

    now = datetime.now(timezone.utc)
    user = User(
        name=data.name,
        email=data.email,
        password_hash=hash_password(data.password),
        phone=data.phone,
        address=data.address,
        avatar=f"https://picsum.photos/seed/{data.email}/200/200",
        member_since=now.strftime("%B %Y"),
    )
    db.add(user)
    db.commit()
    db.refresh(user)

    token = create_access_token({"sub": user.id})
    return TokenOut(
        access_token=token,
        user=UserOut.model_validate(user),
    )


@router.post("/login", response_model=TokenOut)
def login(data: UserLogin, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == data.email).first()
    if not user or not verify_password(data.password, user.password_hash):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    token = create_access_token({"sub": user.id})
    return TokenOut(
        access_token=token,
        user=UserOut.model_validate(user),
    )

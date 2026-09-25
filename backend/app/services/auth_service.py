from typing import Optional
from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from app.models.user import User
from app.schemas.user import UserRegister, UserLogin, UserUpdate
from app.core.security import get_password_hash, verify_password, create_access_token


class AuthService:
    @staticmethod
    def register_user(db: Session, user_in: UserRegister) -> User:
        existing = db.query(User).filter(User.email == user_in.email.lower()).first()
        if existing:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="An account with this email address already exists."
            )
        
        user = User(
            email=user_in.email.lower(),
            password_hash=get_password_hash(user_in.password),
            full_name=user_in.full_name,
            phone=user_in.phone,
            role="customer",
            is_active=True
        )
        db.add(user)
        db.commit()
        db.refresh(user)
        return user

    @staticmethod
    def authenticate_user(db: Session, login_in: UserLogin) -> User:
        user = db.query(User).filter(User.email == login_in.email.lower()).first()
        if not user or not verify_password(login_in.password, user.password_hash):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Incorrect email address or password."
            )
        if not user.is_active:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="This account has been deactivated."
            )
        return user

    @staticmethod
    def update_profile(db: Session, user: User, update_in: UserUpdate) -> User:
        if update_in.full_name is not None:
            user.full_name = update_in.full_name
        if update_in.phone is not None:
            user.phone = update_in.phone
        if update_in.avatar_url is not None:
            user.avatar_url = update_in.avatar_url
        if update_in.password:
            user.password_hash = get_password_hash(update_in.password)

        db.commit()
        db.refresh(user)
        return user

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas.user import UserRegister, UserLogin, UserResponse, Token, UserUpdate
from app.services.auth_service import AuthService
from app.core.security import create_access_token
from app.core.deps import get_current_user
from app.models.user import User

router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.post("/register", response_model=Token, status_code=status.HTTP_201_CREATED)
def register(user_in: UserRegister, db: Session = Depends(get_db)):
    """Register a new customer account."""
    user = AuthService.register_user(db, user_in)
    access_token = create_access_token(subject=user.id, role=user.role)
    return Token(
        access_token=access_token,
        token_type="bearer",
        user=UserResponse.model_validate(user)
    )


@router.post("/login", response_model=Token)
def login_json(login_in: UserLogin, db: Session = Depends(get_db)):
    """JSON-based Login endpoint for web frontend."""
    user = AuthService.authenticate_user(db, login_in)
    access_token = create_access_token(subject=user.id, role=user.role)
    return Token(
        access_token=access_token,
        token_type="bearer",
        user=UserResponse.model_validate(user)
    )


@router.post("/login/token", response_model=Token)
def login_form(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    """Standard OAuth2 form-data login endpoint for Swagger UI & API clients."""
    login_in = UserLogin(email=form_data.username, password=form_data.password)
    user = AuthService.authenticate_user(db, login_in)
    access_token = create_access_token(subject=user.id, role=user.role)
    return Token(
        access_token=access_token,
        token_type="bearer",
        user=UserResponse.model_validate(user)
    )


@router.get("/me", response_model=UserResponse)
def get_current_profile(current_user: User = Depends(get_current_user)):
    """Get profile details of the authenticated user."""
    return current_user


@router.put("/me", response_model=UserResponse)
def update_profile(
    update_in: UserUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Update current user profile information."""
    updated = AuthService.update_profile(db, current_user, update_in)
    return updated

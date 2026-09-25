from typing import Optional
from fastapi import APIRouter, Depends, Header, Query, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas.cart import (
    CartResponse,
    CartItemCreate,
    CartItemUpdate,
    CartItemResponse,
    CartSyncRequest
)
from app.services.cart_service import CartService
from app.core.deps import get_optional_user
from app.models.user import User

router = APIRouter(prefix="/cart", tags=["Cart"])


@router.get("", response_model=CartResponse)
def get_cart(
    x_session_id: Optional[str] = Header(None, alias="X-Session-ID"),
    discount_rate: float = Query(0.0, ge=0.0, le=1.0),
    db: Session = Depends(get_db),
    current_user: Optional[User] = Depends(get_optional_user)
):
    """Retrieve the current user or guest session cart with totals."""
    user_id = current_user.id if current_user else None
    cart = CartService.get_or_create_cart(db, user_id=user_id, session_id=x_session_id)
    return CartService.calculate_cart_details(db, cart, discount_rate=discount_rate)


@router.post("/items", response_model=CartResponse, status_code=status.HTTP_201_CREATED)
def add_cart_item(
    item_in: CartItemCreate,
    x_session_id: Optional[str] = Header(None, alias="X-Session-ID"),
    discount_rate: float = Query(0.0, ge=0.0, le=1.0),
    db: Session = Depends(get_db),
    current_user: Optional[User] = Depends(get_optional_user)
):
    """Add a product with quantity and color to cart."""
    user_id = current_user.id if current_user else None
    cart = CartService.get_or_create_cart(db, user_id=user_id, session_id=x_session_id)
    CartService.add_item_to_cart(db, cart, item_in)
    return CartService.calculate_cart_details(db, cart, discount_rate=discount_rate)


@router.put("/items/{item_id}", response_model=CartResponse)
def update_cart_item(
    item_id: str,
    update_in: CartItemUpdate,
    x_session_id: Optional[str] = Header(None, alias="X-Session-ID"),
    discount_rate: float = Query(0.0, ge=0.0, le=1.0),
    db: Session = Depends(get_db),
    current_user: Optional[User] = Depends(get_optional_user)
):
    """Update quantity or options of an existing cart item."""
    user_id = current_user.id if current_user else None
    cart = CartService.get_or_create_cart(db, user_id=user_id, session_id=x_session_id)
    CartService.update_item_quantity(db, cart, item_id, update_in)
    return CartService.calculate_cart_details(db, cart, discount_rate=discount_rate)


@router.delete("/items/{item_id}", response_model=CartResponse)
def delete_cart_item(
    item_id: str,
    x_session_id: Optional[str] = Header(None, alias="X-Session-ID"),
    discount_rate: float = Query(0.0, ge=0.0, le=1.0),
    db: Session = Depends(get_db),
    current_user: Optional[User] = Depends(get_optional_user)
):
    """Remove an item from the cart."""
    user_id = current_user.id if current_user else None
    cart = CartService.get_or_create_cart(db, user_id=user_id, session_id=x_session_id)
    CartService.remove_item(db, cart, item_id)
    return CartService.calculate_cart_details(db, cart, discount_rate=discount_rate)


@router.delete("/clear", response_model=CartResponse)
def clear_cart(
    x_session_id: Optional[str] = Header(None, alias="X-Session-ID"),
    db: Session = Depends(get_db),
    current_user: Optional[User] = Depends(get_optional_user)
):
    """Clear all items in cart."""
    user_id = current_user.id if current_user else None
    cart = CartService.get_or_create_cart(db, user_id=user_id, session_id=x_session_id)
    CartService.clear_cart(db, cart)
    return CartService.calculate_cart_details(db, cart)


@router.post("/sync", response_model=CartResponse)
def sync_cart(
    sync_in: CartSyncRequest,
    x_session_id: Optional[str] = Header(None, alias="X-Session-ID"),
    db: Session = Depends(get_db),
    current_user: Optional[User] = Depends(get_optional_user)
):
    """Sync guest items to user cart upon login."""
    user_id = current_user.id if current_user else None
    cart = CartService.get_or_create_cart(db, user_id=user_id, session_id=x_session_id)
    for item in sync_in.items:
        try:
            CartService.add_item_to_cart(db, cart, CartItemCreate(
                product_id=item.product_id,
                quantity=item.quantity,
                color=item.color
            ))
        except Exception:
            continue
    return CartService.calculate_cart_details(db, cart)

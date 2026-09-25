from typing import Optional, List
from fastapi import APIRouter, Depends, Header, Query, HTTPException, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.order import Order
from app.schemas.order import OrderCreate, OrderResponse, OrderListResponse
from app.services.order_service import OrderService
from app.services.cart_service import CartService
from app.core.deps import get_current_user, get_optional_user
from app.models.user import User

router = APIRouter(prefix="/orders", tags=["Orders"])


@router.post("", response_model=OrderResponse, status_code=status.HTTP_201_CREATED)
def create_order(
    order_in: OrderCreate,
    x_session_id: Optional[str] = Header(None, alias="X-Session-ID"),
    db: Session = Depends(get_db),
    current_user: Optional[User] = Depends(get_optional_user)
):
    """Place a new order directly from the current cart with backend price & stock validation."""
    user_id = current_user.id if current_user else None
    cart = CartService.get_or_create_cart(db, user_id=user_id, session_id=x_session_id)
    order = OrderService.create_order_from_cart(db, cart, order_in, user=current_user)
    return OrderResponse.model_validate(order)


@router.get("", response_model=OrderListResponse)
def get_my_orders(
    page: int = Query(1, ge=1),
    size: int = Query(10, ge=1, le=50),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get authenticated user's order history."""
    orders, total = OrderService.get_user_orders(db, current_user, page=page, page_size=size)
    pages = (total + size - 1) // size if total > 0 else 1
    return OrderListResponse(
        items=[OrderResponse.model_validate(o) for o in orders],
        total=total,
        page=page,
        size=size,
        pages=pages
    )


@router.get("/{order_id}", response_model=OrderResponse)
def get_order_by_id(
    order_id: str,
    db: Session = Depends(get_db),
    current_user: Optional[User] = Depends(get_optional_user)
):
    """Get single order details by ID."""
    order = OrderService.get_order_by_id(db, order_id, user=current_user)
    return OrderResponse.model_validate(order)


@router.get("/track/{order_number}", response_model=OrderResponse)
def track_order(
    order_number: str,
    db: Session = Depends(get_db)
):
    """Public tracking endpoint for orders by order number e.g. NEX-123456."""
    order = db.query(Order).filter(Order.order_number.ilike(order_number.strip())).first()
    if not order:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Order '{order_number}' was not found."
        )
    return OrderResponse.model_validate(order)

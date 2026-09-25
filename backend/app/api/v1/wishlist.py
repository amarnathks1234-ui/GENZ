from typing import Optional
from fastapi import APIRouter, Depends, Header, HTTPException, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.wishlist import Wishlist, WishlistItem
from app.models.product import Product
from app.schemas.wishlist import (
    WishlistResponse,
    WishlistItemCreate,
    WishlistItemResponse
)
from app.schemas.product import ProductResponse
from app.core.deps import get_optional_user
from app.models.user import User

router = APIRouter(prefix="/wishlist", tags=["Wishlist"])


def _get_or_create_wishlist(db: Session, user_id: Optional[str] = None, session_id: Optional[str] = None) -> Wishlist:
    if user_id:
        wl = db.query(Wishlist).filter(Wishlist.user_id == user_id).first()
        if not wl:
            wl = Wishlist(user_id=user_id)
            db.add(wl)
            db.commit()
            db.refresh(wl)
        return wl
    elif session_id:
        wl = db.query(Wishlist).filter(Wishlist.session_id == session_id).first()
        if not wl:
            wl = Wishlist(session_id=session_id)
            db.add(wl)
            db.commit()
            db.refresh(wl)
        return wl
    else:
        wl = Wishlist()
        db.add(wl)
        db.commit()
        db.refresh(wl)
        return wl


def _build_wishlist_response(db: Session, wishlist: Wishlist) -> WishlistResponse:
    items = db.query(WishlistItem).filter(WishlistItem.wishlist_id == wishlist.id).all()
    resp_items = []
    for it in items:
        if it.product:
            resp_items.append(
                WishlistItemResponse(
                    id=it.id,
                    product_id=it.product_id,
                    product=ProductResponse.model_validate(it.product),
                    created_at=it.created_at
                )
            )
    return WishlistResponse(
        id=wishlist.id,
        items=resp_items,
        item_count=len(resp_items)
    )


@router.get("", response_model=WishlistResponse)
def get_wishlist(
    x_session_id: Optional[str] = Header(None, alias="X-Session-ID"),
    db: Session = Depends(get_db),
    current_user: Optional[User] = Depends(get_optional_user)
):
    """Retrieve saved wishlist items."""
    user_id = current_user.id if current_user else None
    wishlist = _get_or_create_wishlist(db, user_id=user_id, session_id=x_session_id)
    return _build_wishlist_response(db, wishlist)


@router.post("/items", response_model=WishlistResponse, status_code=status.HTTP_201_CREATED)
def toggle_wishlist_item(
    item_in: WishlistItemCreate,
    x_session_id: Optional[str] = Header(None, alias="X-Session-ID"),
    db: Session = Depends(get_db),
    current_user: Optional[User] = Depends(get_optional_user)
):
    """Add or toggle an item in the wishlist."""
    product = db.query(Product).filter(Product.id == item_in.product_id).first()
    if not product:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product not found.")

    user_id = current_user.id if current_user else None
    wishlist = _get_or_create_wishlist(db, user_id=user_id, session_id=x_session_id)

    existing = db.query(WishlistItem).filter(
        WishlistItem.wishlist_id == wishlist.id,
        WishlistItem.product_id == item_in.product_id
    ).first()

    if existing:
        db.delete(existing)
        db.commit()
    else:
        new_item = WishlistItem(wishlist_id=wishlist.id, product_id=item_in.product_id)
        db.add(new_item)
        db.commit()

    return _build_wishlist_response(db, wishlist)


@router.delete("/items/{product_id}", response_model=WishlistResponse)
def remove_from_wishlist(
    product_id: str,
    x_session_id: Optional[str] = Header(None, alias="X-Session-ID"),
    db: Session = Depends(get_db),
    current_user: Optional[User] = Depends(get_optional_user)
):
    """Remove a product from the wishlist."""
    user_id = current_user.id if current_user else None
    wishlist = _get_or_create_wishlist(db, user_id=user_id, session_id=x_session_id)

    item = db.query(WishlistItem).filter(
        WishlistItem.wishlist_id == wishlist.id,
        WishlistItem.product_id == product_id
    ).first()

    if item:
        db.delete(item)
        db.commit()

    return _build_wishlist_response(db, wishlist)


@router.delete("/clear", response_model=WishlistResponse)
def clear_wishlist(
    x_session_id: Optional[str] = Header(None, alias="X-Session-ID"),
    db: Session = Depends(get_db),
    current_user: Optional[User] = Depends(get_optional_user)
):
    """Clear all wishlist items."""
    user_id = current_user.id if current_user else None
    wishlist = _get_or_create_wishlist(db, user_id=user_id, session_id=x_session_id)
    db.query(WishlistItem).filter(WishlistItem.wishlist_id == wishlist.id).delete()
    db.commit()
    return _build_wishlist_response(db, wishlist)

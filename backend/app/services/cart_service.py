from typing import Optional, List, Dict, Any
from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from app.models.cart import Cart, CartItem
from app.models.product import Product
from app.schemas.cart import CartItemCreate, CartItemUpdate, CartSyncRequest, CartResponse, CartItemResponse
from app.schemas.product import ProductResponse


class CartService:
    @staticmethod
    def get_or_create_cart(db: Session, user_id: Optional[str] = None, session_id: Optional[str] = None) -> Cart:
        cart = None
        if user_id:
            cart = db.query(Cart).filter(Cart.user_id == user_id).first()
            if not cart:
                cart = Cart(user_id=user_id)
                db.add(cart)
                db.commit()
                db.refresh(cart)
        elif session_id:
            cart = db.query(Cart).filter(Cart.session_id == session_id).first()
            if not cart:
                cart = Cart(session_id=session_id)
                db.add(cart)
                db.commit()
                db.refresh(cart)
        else:
            cart = Cart()
            db.add(cart)
            db.commit()
            db.refresh(cart)
        return cart

    @staticmethod
    def add_item_to_cart(
        db: Session,
        cart: Cart,
        item_in: CartItemCreate
    ) -> CartItem:
        product = db.query(Product).filter(Product.id == item_in.product_id).first()
        if not product or not product.is_active:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Product is currently unavailable."
            )
        if not product.in_stock or product.stock_quantity < item_in.quantity:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Only {product.stock_quantity} unit(s) available in stock."
            )

        # Check existing item in cart
        existing = db.query(CartItem).filter(
            CartItem.cart_id == cart.id,
            CartItem.product_id == item_in.product_id,
            CartItem.color == item_in.color
        ).first()

        if existing:
            new_qty = existing.quantity + item_in.quantity
            if new_qty > product.stock_quantity:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail=f"Cannot add {item_in.quantity} more. Stock limit of {product.stock_quantity} reached."
                )
            existing.quantity = new_qty
            db.commit()
            db.refresh(existing)
            return existing
        else:
            new_item = CartItem(
                cart_id=cart.id,
                product_id=item_in.product_id,
                quantity=item_in.quantity,
                color=item_in.color
            )
            db.add(new_item)
            db.commit()
            db.refresh(new_item)
            return new_item

    @staticmethod
    def update_item_quantity(
        db: Session,
        cart: Cart,
        item_id: str,
        update_in: CartItemUpdate
    ) -> Optional[CartItem]:
        item = db.query(CartItem).filter(
            CartItem.id == item_id,
            CartItem.cart_id == cart.id
        ).first()

        if not item:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Cart item not found."
            )

        product = db.query(Product).filter(Product.id == item.product_id).first()
        if not product or update_in.quantity > product.stock_quantity:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Requested quantity exceeds available stock ({product.stock_quantity if product else 0})."
            )

        item.quantity = update_in.quantity
        if update_in.color:
            item.color = update_in.color

        db.commit()
        db.refresh(item)
        return item

    @staticmethod
    def remove_item(db: Session, cart: Cart, item_id: str) -> None:
        item = db.query(CartItem).filter(
            CartItem.id == item_id,
            CartItem.cart_id == cart.id
        ).first()
        if item:
            db.delete(item)
            db.commit()

    @staticmethod
    def clear_cart(db: Session, cart: Cart) -> None:
        db.query(CartItem).filter(CartItem.cart_id == cart.id).delete()
        db.commit()

    @staticmethod
    def calculate_cart_details(db: Session, cart: Cart, discount_rate: float = 0.0) -> CartResponse:
        items = db.query(CartItem).filter(CartItem.cart_id == cart.id).all()
        item_responses: List[CartItemResponse] = []
        subtotal = 0.0
        item_count = 0

        for it in items:
            product = it.product
            if product:
                line_total = round(product.price * it.quantity, 2)
                subtotal += line_total
                item_count += it.quantity
                prod_resp = ProductResponse.model_validate(product)
                item_responses.append(
                    CartItemResponse(
                        id=it.id,
                        product_id=it.product_id,
                        quantity=it.quantity,
                        color=it.color,
                        product=prod_resp,
                        item_total=line_total
                    )
                )

        subtotal = round(subtotal, 2)
        discount_amount = round(subtotal * discount_rate, 2)
        shipping_fee = 0.0  # Free over $50
        tax_amount = 18.0 if subtotal > 0 else 0.0
        total = round(max(0.0, subtotal - discount_amount + tax_amount), 2)
        free_shipping = subtotal >= 50.0

        return CartResponse(
            id=cart.id,
            items=item_responses,
            subtotal=subtotal,
            discount_amount=discount_amount,
            tax_amount=tax_amount,
            shipping_fee=shipping_fee,
            total=total,
            item_count=item_count,
            free_shipping_qualified=free_shipping,
            free_shipping_threshold=50.0
        )

import random
import string
from typing import Optional, List, Tuple
from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from app.models.order import Order, OrderItem
from app.models.product import Product, Coupon
from app.models.cart import Cart, CartItem
from app.models.payment import Payment
from app.models.user import User, Address
from app.schemas.order import OrderCreate, OrderStatusUpdate


def generate_order_number() -> str:
    digits = ''.join(random.choices(string.digits, k=6))
    return f"NEX-{digits}"


class OrderService:
    @staticmethod
    def create_order_from_cart(
        db: Session,
        cart: Cart,
        order_in: OrderCreate,
        user: Optional[User] = None
    ) -> Order:
        cart_items = db.query(CartItem).filter(CartItem.cart_id == cart.id).all()
        if not cart_items:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Cannot checkout with an empty cart."
            )

        # 1. Address resolution
        shipping_snapshot = {}
        if order_in.shipping_address:
            shipping_snapshot = order_in.shipping_address.model_dump()
        elif order_in.shipping_address_id and user:
            addr = db.query(Address).filter(
                Address.id == order_in.shipping_address_id,
                Address.user_id == user.id
            ).first()
            if addr:
                shipping_snapshot = {
                    "full_name": addr.full_name,
                    "phone": addr.phone,
                    "street_address": addr.street_address,
                    "city": addr.city,
                    "state": addr.state,
                    "postal_code": addr.postal_code,
                    "country": addr.country
                }
        
        if not shipping_snapshot:
            # Fallback mock address if guest
            shipping_snapshot = {
                "full_name": user.full_name if user else "Guest Shopper",
                "phone": "+1 555-0199",
                "street_address": "742 Evergreen Terrace",
                "city": "Beverly Hills",
                "state": "CA",
                "postal_code": "90210",
                "country": "United States"
            }

        # 2. Validate live stock and calculate verified subtotal from DB prices
        subtotal = 0.0
        order_items_to_create = []

        for item in cart_items:
            product = db.query(Product).filter(Product.id == item.product_id).with_for_update().first()
            if not product or not product.is_active:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail=f"Product '{item.product_id}' is no longer available."
                )
            if product.stock_quantity < item.quantity:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail=f"Insufficient stock for '{product.title}'. Only {product.stock_quantity} available."
                )

            line_total = round(product.price * item.quantity, 2)
            subtotal += line_total

            # Deduct stock
            product.stock_quantity -= item.quantity
            if product.stock_quantity <= 0:
                product.in_stock = False

            order_items_to_create.append({
                "product_id": product.id,
                "product_title": product.title,
                "product_image": product.image,
                "unit_price": product.price,
                "quantity": item.quantity,
                "total_price": line_total,
                "color": item.color
            })

        subtotal = round(subtotal, 2)

        # 3. Server-side Coupon & Discount Calculation
        discount_rate = 0.0
        coupon_code = None
        if order_in.coupon_code:
            coupon = db.query(Coupon).filter(
                Coupon.code.ilike(order_in.coupon_code.strip()),
                Coupon.is_active == True
            ).first()
            if coupon and subtotal >= coupon.min_purchase:
                discount_rate = coupon.discount_rate
                coupon_code = coupon.code
                coupon.current_uses += 1

        discount_amount = round(subtotal * discount_rate, 2)
        tax_amount = 18.00 if subtotal > 0 else 0.00
        total_amount = round(max(0.0, subtotal - discount_amount + tax_amount), 2)

        # 4. Generate Order Record
        order_number = generate_order_number()
        order = Order(
            order_number=order_number,
            user_id=user.id if user else None,
            status="pending",
            subtotal=subtotal,
            discount_amount=discount_amount,
            tax_amount=tax_amount,
            total_amount=total_amount,
            coupon_code=coupon_code,
            shipping_address_id=order_in.shipping_address_id,
            shipping_address=shipping_snapshot,
            customer_notes=order_in.customer_notes
        )
        db.add(order)
        db.flush()

        # 5. Add Order Items
        for o_item in order_items_to_create:
            order_item = OrderItem(
                order_id=order.id,
                product_id=o_item["product_id"],
                product_title=o_item["product_title"],
                product_image=o_item["product_image"],
                unit_price=o_item["unit_price"],
                quantity=o_item["quantity"],
                total_price=o_item["total_price"],
                color=o_item["color"]
            )
            db.add(order_item)

        # 6. Initialize Payment Record
        payment = Payment(
            order_id=order.id,
            user_id=user.id if user else None,
            payment_method=order_in.payment_method,
            payment_status="completed" if order_in.payment_method in ["card", "paypal", "cod"] else "pending",
            transaction_id=f"TXN-{random.randint(10000000, 99999999)}",
            amount=total_amount,
            currency="USD"
        )
        if payment.payment_status == "completed":
            order.status = "paid"
        db.add(payment)

        # 7. Clear Cart
        db.query(CartItem).filter(CartItem.cart_id == cart.id).delete()

        db.commit()
        db.refresh(order)
        return order

    @staticmethod
    def get_order_by_id(db: Session, order_id: str, user: Optional[User] = None) -> Order:
        query = db.query(Order).filter(Order.id == order_id)
        if user and user.role != "admin":
            query = query.filter(Order.user_id == user.id)
        order = query.first()
        if not order:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Order not found or unauthorized access."
            )
        return order

    @staticmethod
    def get_user_orders(db: Session, user: User, page: int = 1, page_size: int = 10) -> Tuple[List[Order], int]:
        query = db.query(Order).filter(Order.user_id == user.id).order_by(Order.created_at.desc())
        total = query.count()
        orders = query.offset((page - 1) * page_size).limit(page_size).all()
        return orders, total

    @staticmethod
    def update_order_status(db: Session, order_id: str, status_in: OrderStatusUpdate) -> Order:
        order = db.query(Order).filter(Order.id == order_id).first()
        if not order:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Order not found.")
        order.status = status_in.status
        if status_in.tracking_number:
            order.tracking_number = status_in.tracking_number
        db.commit()
        db.refresh(order)
        return order

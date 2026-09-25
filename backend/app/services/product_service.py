import math
from typing import Optional, List, Tuple
from sqlalchemy.orm import Session
from sqlalchemy import or_, desc, asc
from fastapi import HTTPException, status
from app.models.product import Product, Category, Coupon
from app.schemas.product import ProductCreate, ProductUpdate, CouponResponse


class ProductService:
    @staticmethod
    def get_products(
        db: Session,
        category: Optional[str] = None,
        search: Optional[str] = None,
        min_price: Optional[float] = None,
        max_price: Optional[float] = None,
        sort_by: Optional[str] = "default",
        page: int = 1,
        page_size: int = 20,
        only_active: bool = True
    ) -> Tuple[List[Product], int, int]:
        query = db.query(Product)

        if only_active:
            query = query.filter(Product.is_active == True)

        if category and category.lower() != "all":
            query = query.filter(Product.category.ilike(f"%{category}%"))

        if search:
            search_pattern = f"%{search}%"
            query = query.filter(
                or_(
                    Product.title.ilike(search_pattern),
                    Product.description.ilike(search_pattern),
                    Product.category.ilike(search_pattern)
                )
            )

        if min_price is not None:
            query = query.filter(Product.price >= min_price)
        if max_price is not None:
            query = query.filter(Product.price <= max_price)

        # Sorting
        if sort_by == "low":
            query = query.order_by(asc(Product.price))
        elif sort_by == "high":
            query = query.order_by(desc(Product.price))
        elif sort_by == "new":
            query = query.order_by(desc(Product.created_at))
        elif sort_by == "rating":
            query = query.order_by(desc(Product.rating))
        else:
            query = query.order_by(asc(Product.id))

        total = query.count()
        pages = math.ceil(total / page_size) if total > 0 else 1
        items = query.offset((page - 1) * page_size).limit(page_size).all()

        return items, total, pages

    @staticmethod
    def get_product_by_id(db: Session, product_id: str) -> Product:
        product = db.query(Product).filter(Product.id == product_id).first()
        if not product:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Product with ID '{product_id}' was not found."
            )
        return product

    @staticmethod
    def search_live(db: Session, query_str: str, limit: int = 8) -> List[Product]:
        if not query_str:
            return []
        pattern = f"%{query_str}%"
        return db.query(Product).filter(
            Product.is_active == True,
            or_(
                Product.title.ilike(pattern),
                Product.description.ilike(pattern),
                Product.category.ilike(pattern)
            )
        ).limit(limit).all()

    @staticmethod
    def validate_coupon(db: Session, code: str, subtotal: float) -> CouponResponse:
        coupon = db.query(Coupon).filter(
            Coupon.code.ilike(code.strip()),
            Coupon.is_active == True
        ).first()

        if not coupon:
            return CouponResponse(
                code=code,
                discount_rate=0.0,
                discount_amount=0.0,
                is_valid=False,
                message="Invalid coupon code."
            )

        if subtotal < coupon.min_purchase:
            return CouponResponse(
                code=code,
                discount_rate=coupon.discount_rate,
                discount_amount=0.0,
                is_valid=False,
                message=f"Minimum purchase amount of ${coupon.min_purchase:.2f} required for this coupon."
            )

        discount_amount = round(subtotal * coupon.discount_rate, 2)
        return CouponResponse(
            code=coupon.code,
            discount_rate=coupon.discount_rate,
            discount_amount=discount_amount,
            is_valid=True,
            message=f"Coupon '{coupon.code}' applied ({int(coupon.discount_rate * 100)}% discount)!"
        )

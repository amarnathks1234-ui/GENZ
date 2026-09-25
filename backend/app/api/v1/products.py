from typing import Optional, List
from fastapi import APIRouter, Depends, Query, HTTPException, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.product import Category, Product
from app.schemas.product import (
    ProductResponse,
    ProductListResponse,
    CategoryResponse,
    CouponValidateRequest,
    CouponResponse
)
from app.services.product_service import ProductService

router = APIRouter(tags=["Products & Catalog"])


@router.get("/products", response_model=ProductListResponse)
def list_products(
    category: Optional[str] = Query(None, description="Category filter e.g. electronics, accessories"),
    search: Optional[str] = Query(None, description="Keyword search query"),
    min_price: Optional[float] = Query(None, ge=0),
    max_price: Optional[float] = Query(None, ge=0),
    sort: Optional[str] = Query("default", description="low, high, new, rating, default"),
    page: int = Query(1, ge=1),
    size: int = Query(20, ge=1, le=100),
    db: Session = Depends(get_db)
):
    """Retrieve catalog products with comprehensive filtering, sorting, and pagination."""
    items, total, pages = ProductService.get_products(
        db=db,
        category=category,
        search=search,
        min_price=min_price,
        max_price=max_price,
        sort_by=sort,
        page=page,
        page_size=size
    )
    return ProductListResponse(
        items=[ProductResponse.model_validate(p) for p in items],
        total=total,
        page=page,
        size=size,
        pages=pages
    )


@router.get("/products/search", response_model=List[ProductResponse])
def search_products_autocomplete(
    q: str = Query(..., min_length=1, description="Search query"),
    limit: int = Query(8, ge=1, le=20),
    db: Session = Depends(get_db)
):
    """Instant live search suggestions endpoint for the header search modal."""
    matches = ProductService.search_live(db, query_str=q, limit=limit)
    return [ProductResponse.model_validate(p) for p in matches]


@router.get("/products/{product_id}", response_model=ProductResponse)
def get_product_details(product_id: str, db: Session = Depends(get_db)):
    """Retrieve single product by ID."""
    product = ProductService.get_product_by_id(db, product_id)
    return ProductResponse.model_validate(product)


@router.get("/categories", response_model=List[CategoryResponse])
def list_categories(db: Session = Depends(get_db)):
    """Retrieve all product categories."""
    cats = db.query(Category).all()
    return [CategoryResponse.model_validate(c) for c in cats]


@router.post("/coupons/validate", response_model=CouponResponse)
def validate_coupon(coupon_in: CouponValidateRequest, db: Session = Depends(get_db)):
    """Validate a promo coupon code and calculate verified discount amount."""
    return ProductService.validate_coupon(db, code=coupon_in.code, subtotal=coupon_in.subtotal)

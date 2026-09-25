from typing import List, Optional
from fastapi import APIRouter, Depends, Query, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy import desc

from app.database import get_db
from app.models.user import User
from app.models.order import Order
from app.models.product import Product, Category
from app.schemas.admin import DashboardStats, StockUpdate
from app.schemas.product import ProductCreate, ProductUpdate, ProductResponse, ProductListResponse
from app.schemas.order import OrderResponse, OrderStatusUpdate, OrderListResponse
from app.schemas.user import UserResponse
from app.services.admin_service import AdminService
from app.services.order_service import OrderService
from app.core.deps import get_current_admin

router = APIRouter(prefix="/admin", tags=["Admin Portal"])


@router.get("/stats", response_model=DashboardStats)
def get_admin_dashboard_metrics(
    db: Session = Depends(get_db),
    admin: User = Depends(get_current_admin)
):
    """Retrieve overall business statistics, revenue, order totals, and sales trends."""
    return AdminService.get_dashboard_stats(db)


# Product Management
@router.get("/products", response_model=ProductListResponse)
def admin_list_products(
    page: int = Query(1, ge=1),
    size: int = Query(50, ge=1, le=100),
    category: Optional[str] = None,
    db: Session = Depends(get_db),
    admin: User = Depends(get_current_admin)
):
    """List all products (including inactive) for inventory management."""
    query = db.query(Product)
    if category and category != "all":
        query = query.filter(Product.category.ilike(f"%{category}%"))
    total = query.count()
    items = query.order_by(desc(Product.created_at)).offset((page - 1) * size).limit(size).all()
    pages = (total + size - 1) // size if total > 0 else 1
    return ProductListResponse(
        items=[ProductResponse.model_validate(p) for p in items],
        total=total,
        page=page,
        size=size,
        pages=pages
    )


@router.post("/products", response_model=ProductResponse, status_code=status.HTTP_201_CREATED)
def admin_create_product(
    product_in: ProductCreate,
    db: Session = Depends(get_db),
    admin: User = Depends(get_current_admin)
):
    """Add a new product to the catalog."""
    product = AdminService.create_product(db, product_in)
    return ProductResponse.model_validate(product)


@router.put("/products/{product_id}", response_model=ProductResponse)
def admin_update_product(
    product_id: str,
    product_in: ProductUpdate,
    db: Session = Depends(get_db),
    admin: User = Depends(get_current_admin)
):
    """Update product information."""
    try:
        product = AdminService.update_product(db, product_id, product_in)
        return ProductResponse.model_validate(product)
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(e))


@router.delete("/products/{product_id}", status_code=status.HTTP_204_NO_CONTENT)
def admin_delete_product(
    product_id: str,
    db: Session = Depends(get_db),
    admin: User = Depends(get_current_admin)
):
    """Soft delete product from active catalog."""
    AdminService.delete_product(db, product_id)
    return None


@router.put("/products/{product_id}/stock", response_model=ProductResponse)
def admin_update_stock(
    product_id: str,
    stock_in: StockUpdate,
    db: Session = Depends(get_db),
    admin: User = Depends(get_current_admin)
):
    """Quick stock adjustment."""
    try:
        product = AdminService.update_stock(db, product_id, stock_in)
        return ProductResponse.model_validate(product)
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(e))


# Order Management
@router.get("/orders", response_model=OrderListResponse)
def admin_list_orders(
    status_filter: Optional[str] = None,
    page: int = Query(1, ge=1),
    size: int = Query(20, ge=1, le=100),
    db: Session = Depends(get_db),
    admin: User = Depends(get_current_admin)
):
    """Retrieve all store orders with status filtering."""
    query = db.query(Order)
    if status_filter and status_filter != "all":
        query = query.filter(Order.status == status_filter)
    total = query.count()
    orders = query.order_by(desc(Order.created_at)).offset((page - 1) * size).limit(size).all()
    pages = (total + size - 1) // size if total > 0 else 1
    return OrderListResponse(
        items=[OrderResponse.model_validate(o) for o in orders],
        total=total,
        page=page,
        size=size,
        pages=pages
    )


@router.put("/orders/{order_id}/status", response_model=OrderResponse)
def admin_update_order_status(
    order_id: str,
    status_in: OrderStatusUpdate,
    db: Session = Depends(get_db),
    admin: User = Depends(get_current_admin)
):
    """Update order fulfillment status e.g. pending -> processing -> shipped -> delivered."""
    order = OrderService.update_order_status(db, order_id, status_in)
    return OrderResponse.model_validate(order)


# Customer Management
@router.get("/users", response_model=List[UserResponse])
def admin_list_users(
    db: Session = Depends(get_db),
    admin: User = Depends(get_current_admin)
):
    """List registered users and customers."""
    users = db.query(User).order_by(desc(User.created_at)).all()
    return [UserResponse.model_validate(u) for u in users]

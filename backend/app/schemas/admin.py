from typing import List, Dict, Any
from pydantic import BaseModel
from app.schemas.order import OrderResponse
from app.schemas.product import ProductResponse
from app.schemas.user import UserResponse


class DashboardStats(BaseModel):
    total_revenue: float
    total_orders: int
    pending_orders: int
    total_products: int
    low_stock_products: int
    total_customers: int
    recent_orders: List[OrderResponse]
    sales_by_category: Dict[str, float]
    monthly_sales: List[Dict[str, Any]]


class StockUpdate(BaseModel):
    stock_quantity: int
    in_stock: bool

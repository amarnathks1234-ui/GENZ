from typing import Optional, List, Dict, Any
from datetime import datetime
from pydantic import BaseModel, Field
from app.schemas.user import AddressCreate, AddressResponse


class OrderItemResponse(BaseModel):
    id: str
    product_id: Optional[str] = None
    product_title: str
    product_image: Optional[str] = None
    unit_price: float
    quantity: int
    total_price: float
    color: Optional[str] = None

    class Config:
        from_attributes = True


class OrderCreate(BaseModel):
    shipping_address_id: Optional[str] = None
    shipping_address: Optional[AddressCreate] = None
    coupon_code: Optional[str] = None
    payment_method: str = Field(default="card", description="card, paypal, cod, stripe")
    customer_notes: Optional[str] = None


class OrderStatusUpdate(BaseModel):
    status: str = Field(..., description="pending, paid, processing, shipped, delivered, cancelled")
    tracking_number: Optional[str] = None


class OrderResponse(BaseModel):
    id: str
    order_number: str
    user_id: Optional[str] = None
    status: str
    subtotal: float
    discount_amount: float
    tax_amount: float
    total_amount: float
    coupon_code: Optional[str] = None
    shipping_address: Dict[str, Any]
    tracking_number: Optional[str] = None
    customer_notes: Optional[str] = None
    items: List[OrderItemResponse]
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class OrderListResponse(BaseModel):
    items: List[OrderResponse]
    total: int
    page: int
    size: int
    pages: int

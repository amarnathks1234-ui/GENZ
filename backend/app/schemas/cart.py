from typing import Optional, List
from datetime import datetime
from pydantic import BaseModel, Field
from app.schemas.product import ProductResponse


class CartItemBase(BaseModel):
    product_id: str
    quantity: int = Field(default=1, gt=0)
    color: Optional[str] = None


class CartItemCreate(CartItemBase):
    pass


class CartItemUpdate(BaseModel):
    quantity: int = Field(..., gt=0)
    color: Optional[str] = None


class CartItemResponse(BaseModel):
    id: str
    product_id: str
    quantity: int
    color: Optional[str] = None
    product: ProductResponse
    item_total: float

    class Config:
        from_attributes = True


class CartResponse(BaseModel):
    id: str
    items: List[CartItemResponse]
    subtotal: float
    discount_amount: float = 0.0
    tax_amount: float = 0.0
    shipping_fee: float = 0.0
    total: float
    item_count: int
    free_shipping_qualified: bool
    free_shipping_threshold: float = 50.0

    class Config:
        from_attributes = True


class CartSyncItem(BaseModel):
    product_id: str
    quantity: int = 1
    color: Optional[str] = None


class CartSyncRequest(BaseModel):
    items: List[CartSyncItem]

from typing import List
from datetime import datetime
from pydantic import BaseModel
from app.schemas.product import ProductResponse


class WishlistItemCreate(BaseModel):
    product_id: str


class WishlistItemResponse(BaseModel):
    id: str
    product_id: str
    product: ProductResponse
    created_at: datetime

    class Config:
        from_attributes = True


class WishlistResponse(BaseModel):
    id: str
    items: List[WishlistItemResponse]
    item_count: int

    class Config:
        from_attributes = True

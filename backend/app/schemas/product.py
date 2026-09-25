from typing import Optional, List, Any
from datetime import datetime
from pydantic import BaseModel, Field


class CategoryBase(BaseModel):
    name: str
    slug: str
    description: Optional[str] = None
    image_url: Optional[str] = None


class CategoryCreate(CategoryBase):
    pass


class CategoryResponse(CategoryBase):
    id: str
    created_at: datetime

    class Config:
        from_attributes = True


class ProductBase(BaseModel):
    title: str
    slug: Optional[str] = None
    price: float = Field(..., gt=0)
    original_price: Optional[float] = None
    image: str
    category: str
    category_id: Optional[str] = None
    badge: Optional[str] = None
    rating: float = 5.0
    reviews: int = 0
    in_stock: bool = True
    stock_quantity: int = Field(default=100, ge=0)
    description: str
    specs: Optional[List[str]] = None
    colors: Optional[List[str]] = None
    is_active: bool = True


class ProductCreate(ProductBase):
    pass


class ProductUpdate(BaseModel):
    title: Optional[str] = None
    slug: Optional[str] = None
    price: Optional[float] = Field(None, gt=0)
    original_price: Optional[float] = None
    image: Optional[str] = None
    category: Optional[str] = None
    category_id: Optional[str] = None
    badge: Optional[str] = None
    rating: Optional[float] = None
    reviews: Optional[int] = None
    in_stock: Optional[bool] = None
    stock_quantity: Optional[int] = Field(None, ge=0)
    description: Optional[str] = None
    specs: Optional[List[str]] = None
    colors: Optional[List[str]] = None
    is_active: Optional[bool] = None


class ProductResponse(ProductBase):
    id: str
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class ProductListResponse(BaseModel):
    items: List[ProductResponse]
    total: int
    page: int
    size: int
    pages: int


class CouponValidateRequest(BaseModel):
    code: str
    subtotal: float


class CouponResponse(BaseModel):
    code: str
    discount_rate: float
    discount_amount: float
    is_valid: bool
    message: str

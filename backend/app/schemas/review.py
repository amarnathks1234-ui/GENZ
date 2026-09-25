from typing import Optional, List
from datetime import datetime
from pydantic import BaseModel, Field


class ReviewCreate(BaseModel):
    product_id: str
    rating: int = Field(..., ge=1, le=5)
    title: Optional[str] = None
    comment: str = Field(..., min_length=5)


class ReviewResponse(BaseModel):
    id: str
    product_id: str
    user_id: str
    user_name: str
    rating: int
    title: Optional[str] = None
    comment: str
    is_verified_purchase: bool
    status: str
    created_at: datetime

    class Config:
        from_attributes = True


class ProductReviewSummary(BaseModel):
    product_id: str
    average_rating: float
    total_reviews: int
    rating_breakdown: dict
    reviews: List[ReviewResponse]

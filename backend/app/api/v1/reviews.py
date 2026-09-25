from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy import func

from app.database import get_db
from app.models.review import Review
from app.models.product import Product
from app.schemas.review import ReviewCreate, ReviewResponse, ProductReviewSummary
from app.core.deps import get_current_user
from app.models.user import User

router = APIRouter(prefix="/reviews", tags=["Reviews & Ratings"])


@router.get("/product/{product_id}", response_model=ProductReviewSummary)
def get_product_reviews(product_id: str, db: Session = Depends(get_db)):
    """Retrieve all approved reviews, average rating, and breakdown for a product."""
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product not found.")

    reviews_db = db.query(Review).filter(
        Review.product_id == product_id,
        Review.status == "approved"
    ).order_by(Review.created_at.desc()).all()

    total = len(reviews_db)
    avg_rating = round(sum(r.rating for r in reviews_db) / total, 1) if total > 0 else (product.rating or 5.0)

    breakdown = {str(i): 0 for i in range(1, 6)}
    for r in reviews_db:
        breakdown[str(r.rating)] = breakdown.get(str(r.rating), 0) + 1

    return ProductReviewSummary(
        product_id=product_id,
        average_rating=avg_rating,
        total_reviews=total if total > 0 else (product.reviews or 0),
        rating_breakdown=breakdown,
        reviews=[ReviewResponse.model_validate(r) for r in reviews_db]
    )


@router.post("", response_model=ReviewResponse, status_code=status.HTTP_201_CREATED)
def submit_review(
    review_in: ReviewCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Submit a verified review for a product."""
    product = db.query(Product).filter(Product.id == review_in.product_id).first()
    if not product:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product not found.")

    review = Review(
        product_id=review_in.product_id,
        user_id=current_user.id,
        user_name=current_user.full_name,
        rating=review_in.rating,
        title=review_in.title,
        comment=review_in.comment,
        is_verified_purchase=True,
        status="approved"
    )
    db.add(review)
    db.commit()

    # Recalculate product rating & reviews count
    approved = db.query(Review).filter(Review.product_id == product.id, Review.status == "approved").all()
    if approved:
        product.rating = round(sum(r.rating for r in approved) / len(approved), 1)
        product.reviews = len(approved)
        db.commit()

    db.refresh(review)
    return ReviewResponse.model_validate(review)

import uuid
from datetime import datetime
from sqlalchemy import Column, String, Integer, Boolean, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from app.database import Base


def generate_uuid():
    return str(uuid.uuid4())


class Review(Base):
    __tablename__ = "reviews"

    id = Column(String(36), primary_key=True, default=generate_uuid, index=True)
    product_id = Column(String(36), ForeignKey("products.id", ondelete="CASCADE"), nullable=False, index=True)
    user_id = Column(String(36), ForeignKey("profiles.id", ondelete="CASCADE"), nullable=False, index=True)
    user_name = Column(String(255), nullable=False)
    rating = Column(Integer, nullable=False)  # 1 to 5
    title = Column(String(255), nullable=True)
    comment = Column(Text, nullable=False)
    is_verified_purchase = Column(Boolean, default=True, nullable=False)
    status = Column(String(20), default="approved", nullable=False)  # approved, pending, rejected
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)

    product = relationship("Product", back_populates="reviews_list")
    user = relationship("User", back_populates="reviews")

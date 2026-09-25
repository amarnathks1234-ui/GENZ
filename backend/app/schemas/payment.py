from typing import Optional, Dict, Any
from datetime import datetime
from pydantic import BaseModel, Field


class PaymentInitRequest(BaseModel):
    order_id: str
    payment_method: str = "card"


class PaymentVerifyRequest(BaseModel):
    order_id: str
    payment_id: Optional[str] = None
    transaction_id: str
    payment_method: str = "card"
    provider_signature: Optional[str] = None


class PaymentResponse(BaseModel):
    id: str
    order_id: str
    user_id: Optional[str] = None
    payment_method: str
    payment_status: str
    transaction_id: Optional[str] = None
    amount: float
    currency: str
    created_at: datetime

    class Config:
        from_attributes = True

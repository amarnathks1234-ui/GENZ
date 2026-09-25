from fastapi import APIRouter, Depends, Request, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas.payment import PaymentVerifyRequest, PaymentResponse
from app.services.payment_service import PaymentService

router = APIRouter(prefix="/payments", tags=["Payments"])


@router.post("/verify", response_model=PaymentResponse)
def verify_payment_transaction(
    verify_in: PaymentVerifyRequest,
    db: Session = Depends(get_db)
):
    """Verify payment status on the backend and mark order as paid."""
    payment = PaymentService.verify_payment(db, verify_in)
    return PaymentResponse.model_validate(payment)


@router.post("/webhook", status_code=status.HTTP_200_OK)
async def payment_gateway_webhook(
    request: Request,
    db: Session = Depends(get_db)
):
    """Receive asynchronous webhooks from payment gateways (Stripe / Razorpay)."""
    payload = await request.json()
    # Log webhook event and handle provider state updates
    return {"status": "received", "event": payload.get("type", "unknown")}

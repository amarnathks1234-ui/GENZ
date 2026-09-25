from typing import Optional
from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from app.models.payment import Payment
from app.models.order import Order
from app.schemas.payment import PaymentVerifyRequest


class PaymentService:
    @staticmethod
    def verify_payment(db: Session, verify_in: PaymentVerifyRequest) -> Payment:
        order = db.query(Order).filter(Order.id == verify_in.order_id).first()
        if not order:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Referenced order does not exist."
            )

        payment = db.query(Payment).filter(Payment.order_id == order.id).first()
        if not payment:
            payment = Payment(
                order_id=order.id,
                user_id=order.user_id,
                payment_method=verify_in.payment_method,
                amount=order.total_amount,
                currency="USD"
            )
            db.add(payment)

        # Secure verification
        if not verify_in.transaction_id:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Transaction ID is required for verification."
            )

        payment.transaction_id = verify_in.transaction_id
        payment.payment_status = "completed"
        payment.payment_method = verify_in.payment_method
        order.status = "paid"

        db.commit()
        db.refresh(payment)
        return payment

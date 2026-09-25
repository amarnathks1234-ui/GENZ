from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.user import User, Address
from app.schemas.user import AddressCreate, AddressUpdate, AddressResponse
from app.core.deps import get_current_user

router = APIRouter(prefix="/users", tags=["Users & Addresses"])


@router.get("/addresses", response_model=List[AddressResponse])
def get_user_addresses(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Retrieve all shipping addresses for current user."""
    return db.query(Address).filter(Address.user_id == current_user.id).order_by(Address.is_default.desc()).all()


@router.post("/addresses", response_model=AddressResponse, status_code=status.HTTP_201_CREATED)
def create_address(
    address_in: AddressCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Add a new shipping address."""
    # If set as default, unset previous default
    if address_in.is_default:
        db.query(Address).filter(Address.user_id == current_user.id).update({"is_default": False})

    # If first address, auto make default
    existing_count = db.query(Address).filter(Address.user_id == current_user.id).count()
    is_def = address_in.is_default or (existing_count == 0)

    address = Address(
        user_id=current_user.id,
        full_name=address_in.full_name,
        phone=address_in.phone,
        street_address=address_in.street_address,
        city=address_in.city,
        state=address_in.state,
        postal_code=address_in.postal_code,
        country=address_in.country,
        is_default=is_def
    )
    db.add(address)
    db.commit()
    db.refresh(address)
    return address


@router.put("/addresses/{address_id}", response_model=AddressResponse)
def update_address(
    address_id: str,
    update_in: AddressUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Update an existing shipping address."""
    address = db.query(Address).filter(
        Address.id == address_id,
        Address.user_id == current_user.id
    ).first()

    if not address:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Address not found.")

    if update_in.is_default:
        db.query(Address).filter(Address.user_id == current_user.id).update({"is_default": False})

    data = update_in.model_dump(exclude_unset=True)
    for k, v in data.items():
        setattr(address, k, v)

    db.commit()
    db.refresh(address)
    return address


@router.delete("/addresses/{address_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_address(
    address_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Delete a shipping address."""
    address = db.query(Address).filter(
        Address.id == address_id,
        Address.user_id == current_user.id
    ).first()

    if not address:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Address not found.")

    db.delete(address)
    db.commit()
    return None

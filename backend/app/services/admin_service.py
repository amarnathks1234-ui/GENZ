from typing import Dict, Any, List
from sqlalchemy.orm import Session
from sqlalchemy import func, desc
from app.models.order import Order, OrderItem
from app.models.product import Product
from app.models.user import User
from app.schemas.admin import DashboardStats, StockUpdate
from app.schemas.order import OrderResponse
from app.schemas.product import ProductCreate, ProductUpdate, ProductResponse


class AdminService:
    @staticmethod
    def get_dashboard_stats(db: Session) -> DashboardStats:
        # 1. Total revenue
        revenue_sum = db.query(func.sum(Order.total_amount)).filter(Order.status.in_(["paid", "processing", "shipped", "delivered"])).scalar() or 0.0
        total_revenue = round(float(revenue_sum), 2)

        # 2. Orders count
        total_orders = db.query(Order).count()
        pending_orders = db.query(Order).filter(Order.status.in_(["pending", "paid", "processing"])).count()

        # 3. Products & Stock
        total_products = db.query(Product).count()
        low_stock_products = db.query(Product).filter(Product.stock_quantity <= 10).count()

        # 4. Customers
        total_customers = db.query(User).filter(User.role == "customer").count()

        # 5. Recent 5 Orders
        recent_orders_db = db.query(Order).order_by(desc(Order.created_at)).limit(5).all()
        recent_orders = [OrderResponse.model_validate(o) for o in recent_orders_db]

        # 6. Sales by Category
        sales_by_cat: Dict[str, float] = {}
        category_stats = db.query(
            Product.category,
            func.sum(OrderItem.total_price)
        ).join(OrderItem, Product.id == OrderItem.product_id)\
         .group_by(Product.category).all()

        for cat, total in category_stats:
            sales_by_cat[cat or "General"] = round(float(total or 0), 2)

        # 7. Monthly sales mockup structure
        monthly_sales = [
            {"month": "Jan", "sales": 4200.0},
            {"month": "Feb", "sales": 6800.0},
            {"month": "Mar", "sales": 9100.0},
            {"month": "Apr", "sales": 12400.0},
            {"month": "May", "sales": 15800.0},
            {"month": "Jun", "sales": round(total_revenue, 2)}
        ]

        return DashboardStats(
            total_revenue=total_revenue,
            total_orders=total_orders,
            pending_orders=pending_orders,
            total_products=total_products,
            low_stock_products=low_stock_products,
            total_customers=total_customers,
            recent_orders=recent_orders,
            sales_by_category=sales_by_cat,
            monthly_sales=monthly_sales
        )

    @staticmethod
    def create_product(db: Session, product_in: ProductCreate) -> Product:
        slug = product_in.slug or product_in.title.lower().replace(" ", "-")
        product = Product(
            title=product_in.title,
            slug=slug,
            price=product_in.price,
            original_price=product_in.original_price,
            image=product_in.image,
            category=product_in.category,
            category_id=product_in.category_id,
            badge=product_in.badge,
            rating=product_in.rating,
            reviews=product_in.reviews,
            in_stock=product_in.in_stock,
            stock_quantity=product_in.stock_quantity,
            description=product_in.description,
            specs=product_in.specs,
            colors=product_in.colors,
            is_active=product_in.is_active
        )
        db.add(product)
        db.commit()
        db.refresh(product)
        return product

    @staticmethod
    def update_product(db: Session, product_id: str, product_in: ProductUpdate) -> Product:
        product = db.query(Product).filter(Product.id == product_id).first()
        if not product:
            raise ValueError(f"Product '{product_id}' not found.")

        data = product_in.model_dump(exclude_unset=True)
        for key, value in data.items():
            setattr(product, key, value)

        db.commit()
        db.refresh(product)
        return product

    @staticmethod
    def delete_product(db: Session, product_id: str) -> None:
        product = db.query(Product).filter(Product.id == product_id).first()
        if product:
            product.is_active = False  # Soft delete
            db.commit()

    @staticmethod
    def update_stock(db: Session, product_id: str, stock_in: StockUpdate) -> Product:
        product = db.query(Product).filter(Product.id == product_id).first()
        if not product:
            raise ValueError(f"Product '{product_id}' not found.")
        product.stock_quantity = stock_in.stock_quantity
        product.in_stock = stock_in.in_stock and (stock_in.stock_quantity > 0)
        db.commit()
        db.refresh(product)
        return product

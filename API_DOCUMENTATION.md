# NEXORA REST API Documentation

The NEXORA backend is built with **Python**, **FastAPI**, **Pydantic v2**, and **SQLAlchemy 2.0**, backed by **PostgreSQL / Supabase**.

- **Base URL**: `http://127.0.0.1:8000/api/v1`
- **Interactive Swagger Docs**: `http://127.0.0.1:8000/docs`
- **Interactive ReDoc**: `http://127.0.0.1:8000/redoc`

---

## 1. Authentication Endpoints (`/api/v1/auth`)

### `POST /auth/register`
Register a new customer account.
- **Request Body**:
  ```json
  {
    "email": "customer@nexora.com",
    "password": "customerpassword123",
    "full_name": "Alex Morgan",
    "phone": "+1 555-0199"
  }
  ```
- **Response (201 Created)**:
  ```json
  {
    "access_token": "eyJhbGciOi...",
    "token_type": "bearer",
    "user": {
      "id": "uuid",
      "email": "customer@nexora.com",
      "full_name": "Alex Morgan",
      "role": "customer",
      "phone": "+1 555-0199",
      "avatar_url": null,
      "is_active": true,
      "created_at": "2026-08-18T00:00:00Z"
    }
  }
  ```

### `POST /auth/login`
Authenticate with email and password to receive a JWT access token.
- **Request Body**:
  ```json
  {
    "email": "customer@nexora.com",
    "password": "customerpassword123"
  }
  ```

### `GET /auth/me` *(Protected: Bearer Token)*
Retrieve the currently authenticated user profile.

---

## 2. Product Catalog (`/api/v1/products` & `/api/v1/categories`)

### `GET /products`
Retrieve catalog products with filtering, sorting, and pagination.
- **Query Parameters**:
  - `category` (optional, e.g. `electronics`, `accessories`, `bags`, `footwear`, `fashion`, `beauty`, `home`)
  - `search` (optional keyword)
  - `min_price`, `max_price` (optional numeric bounds)
  - `sort` (`low`, `high`, `new`, `rating`, `default`)
  - `page` (default 1), `size` (default 20)
- **Response (200 OK)**:
  ```json
  {
    "items": [
      {
        "id": "1",
        "title": "Premium Classic Chrono Watch",
        "slug": "premium-classic-chrono-watch",
        "price": 129.0,
        "original_price": 179.0,
        "image": "Images/Watch.png",
        "category": "accessories",
        "badge": "NEW",
        "rating": 4.9,
        "reviews": 148,
        "in_stock": true,
        "stock_quantity": 45,
        "description": "...",
        "specs": ["..."],
        "colors": ["#111827", "#1d4ed8"],
        "is_active": true
      }
    ],
    "total": 21,
    "page": 1,
    "size": 20,
    "pages": 2
  }
  ```

### `GET /products/search?q={query}&limit=8`
Instant live search autocomplete for search modal.

### `GET /products/{id}`
Retrieve single product details by ID or slug.

### `POST /coupons/validate`
Validate promo codes (`NEXORA20`, `WELCOME10`, `SUMMER15`) and compute verified discount amounts.

---

## 3. Shopping Cart (`/api/v1/cart`)

- Supports both authenticated users (via `Authorization: Bearer <token>`) and guest sessions (via `X-Session-ID: <session_id>`).

### `GET /cart?discount_rate=0.0`
Retrieve active cart items, verified subtotals, taxes, shipping progress, and total.

### `POST /cart/items`
Add item to cart with backend stock verification.
- **Request Body**:
  ```json
  {
    "product_id": "1",
    "quantity": 2,
    "color": "Midnight Black"
  }
  ```

### `PUT /cart/items/{item_id}`
Update item quantity.

### `DELETE /cart/items/{item_id}`
Remove specific item.

### `DELETE /cart/clear`
Clear cart completely.

### `POST /cart/sync`
Sync guest cart items to user account on login.

---

## 4. Wishlist (`/api/v1/wishlist`)

- `GET /wishlist`: Retrieve saved wishlist items.
- `POST /wishlist/items`: Toggle saving a product to wishlist.
- `DELETE /wishlist/items/{product_id}`: Remove specific item.
- `DELETE /wishlist/clear`: Empty wishlist.

---

## 5. Orders & Checkout (`/api/v1/orders`)

### `POST /orders`
Create an immutable verified order directly from the current cart with atomic stock deduction.
- **Request Body**:
  ```json
  {
    "shipping_address": {
      "full_name": "Alex Morgan",
      "phone": "+1 555-0101",
      "street_address": "742 Evergreen Terrace",
      "city": "Beverly Hills",
      "state": "CA",
      "postal_code": "90210",
      "country": "United States"
    },
    "coupon_code": "NEXORA20",
    "payment_method": "card",
    "customer_notes": "Leave at front porch."
  }
  ```
- **Response (201 Created)**:
  ```json
  {
    "id": "uuid",
    "order_number": "NEX-849201",
    "status": "paid",
    "subtotal": 129.0,
    "discount_amount": 25.8,
    "tax_amount": 18.0,
    "total_amount": 121.2,
    "shipping_address": { ... },
    "items": [
      {
        "product_id": "1",
        "product_title": "Premium Classic Chrono Watch",
        "unit_price": 129.0,
        "quantity": 1,
        "total_price": 129.0
      }
    ],
    "created_at": "2026-08-18T00:00:00Z"
  }
  ```

### `GET /orders` *(Protected)*
Customer order history with status timeline.

### `GET /orders/track/{order_number}`
Public lookup endpoint for package tracking.

---

## 6. Admin Portal (`/api/v1/admin`) *(Requires Role: admin)*

- `GET /admin/stats`: Business KPIs (Revenue, total orders, low stock count, customer count).
- `GET /admin/products`: Full inventory with stock levels.
- `POST /admin/products`: Add new luxury item.
- `PUT /admin/products/{id}`: Edit product data.
- `PUT /admin/products/{id}/stock`: Adjust live stock quantity.
- `DELETE /admin/products/{id}`: Soft delete product.
- `GET /admin/orders`: List all customer orders with status filter.
- `PUT /admin/orders/{id}/status`: Advance status (`pending` -> `paid` -> `processing` -> `shipped` -> `delivered`) and assign tracking numbers.
- `GET /admin/users`: Customer directory list.

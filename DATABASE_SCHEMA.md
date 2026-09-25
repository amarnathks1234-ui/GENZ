# NEXORA PostgreSQL & Supabase Database Schema

The database is designed with standard relational normalization, foreign key cascade constraints, indexing, and Row Level Security (RLS).

```
 +------------------+           +--------------------+
 |    categories    | 1       * |      products      |
 +------------------+ <-------- +--------------------+
 | id (PK, UUID)    |           | id (PK, UUID)      |
 | name (UNIQUE)    |           | category_id (FK)   |
 | slug (UNIQUE)    |           | price, stock_qty   |
 +------------------+           +--------------------+
                                      | 1
                                      | *
 +------------------+           +--------------------+
 |     profiles     | 1       * |    order_items     |
 +------------------+ <-------- +--------------------+
 | id (PK, UUID)    |           | id (PK, UUID)      |
 | email (UNIQUE)   |           | order_id (FK)      |
 | password_hash    |           | product_id (FK)    |
 | role (cust/admin)|           | unit_price, qty    |
 +------------------+           +--------------------+
        | 1                            | *
        | *                            | 1
 +------------------+           +--------------------+
 |     addresses    |           |       orders       |
 +------------------+           +--------------------+
 | id (PK, UUID)    |           | id (PK, UUID)      |
 | user_id (FK)     |           | order_number (UNQ) |
 | street, city     |           | user_id (FK)       |
 +------------------+           | status, total      |
                                +--------------------+
```

---

## Tables Overview

### 1. `categories`
| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | UUID | PRIMARY KEY | Unique Category ID |
| `name` | VARCHAR(100) | UNIQUE, NOT NULL | Display name |
| `slug` | VARCHAR(100) | UNIQUE, NOT NULL | URL-friendly slug |
| `description` | TEXT | NULLABLE | Category description |
| `image_url` | VARCHAR(500)| NULLABLE | Category cover image |
| `created_at` | TIMESTAMPTZ | DEFAULT NOW() | Timestamp |

### 2. `products`
| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | UUID | PRIMARY KEY | Unique Product ID |
| `title` | VARCHAR(255) | NOT NULL | Product Title |
| `slug` | VARCHAR(255) | UNIQUE, NOT NULL | Unique URL slug |
| `price` | NUMERIC(10,2)| CHECK (price > 0) | Live Selling Price |
| `original_price`| NUMERIC(10,2)| NULLABLE | Strikethrough price |
| `image` | VARCHAR(500) | NOT NULL | Main image path |
| `category_id` | UUID | FK -> categories.id | Category foreign key |
| `category` | VARCHAR(100) | NOT NULL, INDEXED | Category name |
| `badge` | VARCHAR(50) | NULLABLE | NEW, HOT, BEST, SALE |
| `rating` | NUMERIC(3,2) | DEFAULT 5.0 | Aggregated rating |
| `reviews` | INTEGER | DEFAULT 0 | Reviews count |
| `in_stock` | BOOLEAN | DEFAULT TRUE | Availability flag |
| `stock_quantity`| INTEGER | CHECK (>= 0) | Real inventory count |
| `description` | TEXT | NOT NULL | Craftsmanship description |
| `specs` | JSONB | NULLABLE | Specifications array |
| `colors` | JSONB | NULLABLE | Available color hex codes |
| `is_active` | BOOLEAN | DEFAULT TRUE | Soft delete flag |
| `created_at` | TIMESTAMPTZ | DEFAULT NOW() | Creation date |
| `updated_at` | TIMESTAMPTZ | DEFAULT NOW() | Update timestamp |

### 3. `profiles`
| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | UUID | PRIMARY KEY | User Identifier |
| `email` | VARCHAR(255) | UNIQUE, NOT NULL | User email |
| `password_hash`| VARCHAR(255) | NOT NULL | Bcrypt hash |
| `full_name` | VARCHAR(255) | NOT NULL | Full name |
| `role` | VARCHAR(20) | CHECK ('customer','admin')| RBAC Role |
| `phone` | VARCHAR(50) | NULLABLE | Contact number |
| `is_active` | BOOLEAN | DEFAULT TRUE | Active status |

### 4. `orders` & `order_items`
- `orders`: Tracks `order_number` (`NEX-XXXXXX`), `status` (`pending`, `paid`, `processing`, `shipped`, `delivered`, `cancelled`), `subtotal`, `discount_amount`, `tax_amount`, `total_amount`, and immutable `shipping_address` JSONB snapshot.
- `order_items`: Line items linking `order_id` and `product_id` with unit prices frozen at the time of purchase.

### 5. `carts`, `wishlists`, `payments`, `reviews`, `coupons`
- Standard relational tables enforcing referential integrity (`ON DELETE CASCADE` or `ON DELETE SET NULL`).

---

## Indexing Strategy
- `CREATE INDEX idx_products_category ON products(category);`
- `CREATE INDEX idx_products_price ON products(price);`
- `CREATE INDEX idx_orders_user_id ON orders(user_id);`
- `CREATE INDEX idx_orders_created_at ON orders(created_at DESC);`
- `CREATE INDEX idx_reviews_product_id ON reviews(product_id);`

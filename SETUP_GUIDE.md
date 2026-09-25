# NEXORA Full-Stack Setup & Deployment Guide

This guide walks through setting up NEXORA locally, running automated tests, connecting to Supabase PostgreSQL, and deploying to production.

---

## 1. Prerequisites
- **Python 3.10+** (Install from [python.org](https://www.python.org/downloads/) or via Windows `winget install Python.Python.3.12`)
- **Web Browser** (Chrome, Firefox, Edge, Safari)
- **Supabase Account** (Free tier available at [supabase.com](https://supabase.com)) - *Optional for local testing as SQLite works out-of-the-box!*

---

## 2. Quick Local Start (5 Minutes)

### Step 1: Clone or Open the Project
Open terminal in the NEXORA project root directory:
```bash
cd c:\Users\PC\Desktop\NEXORA
```

### Step 2: Install Backend Dependencies
Create and activate a virtual environment (recommended):
```bash
# Windows PowerShell:
python -m venv venv
.\venv\Scripts\Activate.ps1

# Install requirements:
pip install -r backend/requirements.txt
```

### Step 3: Run Backend Server
```bash
cd backend
python run.py
```
> The server will start at `http://127.0.0.1:8000`.
> Interactive API documentation is available at `http://127.0.0.1:8000/docs`.
> The database and 21 luxury items will be automatically seeded on first launch!

### Step 4: Open Frontend
Simply open `index.html` in your browser (or use VS Code Live Server / Python HTTP server):
```bash
# From the root directory:
python -m http.server 5500
```
Visit `http://127.0.0.1:5500/index.html` in your browser.

---

## 3. Demo Accounts & Credentials

| Role | Email | Password | Access |
|---|---|---|---|
| **Administrator** | `admin@nexora.com` | `admin123` | Full Admin Command Center (`admin.html`) & Storefront |
| **Customer** | `customer@nexora.com` | `customer123` | Member Dashboard, Order History, Verified Reviews |

### Active Demo Promo Coupons:
- `NEXORA20` &rarr; 20% OFF Entire Cart
- `WELCOME10` &rarr; 10% OFF Welcome Bonus
- `SUMMER15` &rarr; 15% OFF Summer Special

---

## 4. Connecting to Supabase PostgreSQL

1. Log in to [Supabase](https://supabase.com) and create a new project.
2. Navigate to **Project Settings &rarr; Database** and copy the **Connection string (URI)**.
3. Open `backend/.env` and update `DATABASE_URL`:
   ```env
   DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres"
   ```
4. Run the schema script located at `backend/sql/schema.sql` in the Supabase SQL Editor.
5. Restart the FastAPI server.

---

## 5. Running Automated Tests

Run the full Pytest test suite:
```bash
pytest backend/tests -v
```

Tests cover:
- Authentication & JWT issuance (`test_auth.py`)
- Products catalog, search & coupon validation (`test_products.py`)
- Cart operations & calculations (`test_cart.py`)
- Order creation & inventory deduction (`test_orders.py`)
- Admin metrics & RBAC permission checks (`test_admin.py`)

---

## 6. Postman API Testing

1. Open **Postman**.
2. Click **Import** and select `nexora_postman_collection.json`.
3. Set the `baseUrl` variable to `http://127.0.0.1:8000/api/v1`.
4. Execute the requests sequentially.

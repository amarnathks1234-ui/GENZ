# GENZ — Editorial Fashion & Luxury E-Commerce Platform

![GENZ Hero Background](Images/hero-bg.jpg)

GENZ is a production-ready, high-end lifestyle and editorial streetwear e-commerce application combining an ultra-refined HTML/CSS/JavaScript storefront with a robust Python FastAPI backend and Supabase PostgreSQL relational database.

---

## 🌟 Features & Architecture

```
Frontend (HTML5, Vanilla CSS, Modern JavaScript)
         ↓  HTTPS / JWT Bearer Tokens
FastAPI REST API (Python 3.10+, Pydantic v2, SQLAlchemy 2.0)
         ↓  Connection Pool & RLS
Supabase PostgreSQL Database
```

### 🛍️ Storefront & User Experience
- **Curated 21-Product Luxury Catalog**: Watches, Audio, Bags, Footwear, Fashion, Beauty, and Home Essentials with specifications, color swatches, badges, and verified ratings.
- **Dynamic Live Search**: Debounced instant search modal with autocomplete suggestions.
- **Multi-Factor Filtering & Sorting**: Category chips, price range brackets, and sorting by popularity, price, rating, or newest.
- **Shopping Cart & Wishlist Engine**: Live calculation of taxes, free express shipping progress bar, promo coupon verification (`NEXORA20`, `WELCOME10`, `SUMMER15`).
- **AI Shopping Concierge Chatbot**: Floating 24/7 shopping assistant answering product inquiries, policy questions, and coupon prompts.
- **Verified Reviews & Ratings**: Product rating aggregates and verified customer review submissions.

### 🔐 Security & Backend Integrity
- **Stateless JWT Authentication & RBAC**: Role-based access control distinguishing `customer` and `admin` roles.
- **Server-Side Stock Validation**: Prevents overselling with database locks during order placement.
- **Server-Side Price Verification**: Front-end price manipulation is impossible; totals and taxes are calculated directly on the backend.
- **Payment Verification**: Payments are securely verified before orders advance to `paid` status.

### ⚙️ Admin Command Center (`admin.html`)
- **Executive KPI Dashboard**: Total revenue metrics, total orders, low stock warnings, customer count.
- **Product & Inventory Management**: Live inline stock adjustments, product creation modal, edit and soft-delete capabilities.
- **Order Fulfillment Pipeline**: Advance order lifecycle states (`pending` &rarr; `paid` &rarr; `processing` &rarr; `shipped` &rarr; `delivered`) and assign live tracking numbers.
- **Customer Directory**: View registered members and contact information.

---

## Quick Access link: https://amarnathks1234-ui.github.io/NEXORA./

## 🚀 Quick Start

### 1. Backend Server Setup
```bash
# Navigate to project root
cd c:\Users\PC\Desktop\NEXORA

# Install dependencies
pip install -r backend/requirements.txt

# Run FastAPI Server (auto-seeds 21 products on first launch)
cd backend
python run.py
```
- API Endpoint: `http://127.0.0.1:8000`
- Interactive OpenAPI Docs: `http://127.0.0.1:8000/docs`

### 2. Launch Storefront
Open `index.html` in your browser or run a simple local web server:
```bash
# From project root
python -m http.server 5500
```
Visit `http://127.0.0.1:5500/index.html`.

---

## 🔑 Demo Accounts

| Role | Email | Password | Access |
|---|---|---|---|
| **Admin** | `admin@nexora.com` | `admin123` | Storefront & Admin Portal (`admin.html`) |
| **Customer** | `customer@nexora.com` | `customer123` | Customer Experience & Orders |

---

## 🧪 Testing & Verification

Run automated backend tests:
```bash
pytest backend/tests -v
```

Import `nexora_postman_collection.json` into Postman to test all endpoints.

---

## 📚 Documentation Index
- [Setup & Deployment Guide](SETUP_GUIDE.md)
- [REST API Reference](API_DOCUMENTATION.md)
- [Database Schema & ERD](DATABASE_SCHEMA.md)
- [Postman Collection](nexora_postman_collection.json)

---

&copy; 2026 NEXORA Inc. Engineered for luxury living.

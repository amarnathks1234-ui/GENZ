def test_admin_dashboard_and_product_crud(client, admin_token, customer_token):
    admin_headers = {"Authorization": f"Bearer {admin_token}"}
    customer_headers = {"Authorization": f"Bearer {customer_token}"}

    # 1. Customer cannot access admin endpoints (403 Forbidden)
    forbidden_res = client.get("/api/v1/admin/stats", headers=customer_headers)
    assert forbidden_res.status_code == 403

    # 2. Admin gets dashboard stats
    stats_res = client.get("/api/v1/admin/stats", headers=admin_headers)
    assert stats_res.status_code == 200
    stats = stats_res.json()
    assert "total_revenue" in stats
    assert "total_products" in stats

    # 3. Admin creates a new product
    new_prod_payload = {
        "title": "Quantum Precision Tourbillon",
        "slug": "quantum-precision-tourbillon",
        "price": 499.00,
        "original_price": 699.00,
        "image": "Images/Watch.png",
        "category": "accessories",
        "badge": "LIMITED",
        "rating": 5.0,
        "reviews": 12,
        "in_stock": True,
        "stock_quantity": 15,
        "description": "Hand-assembled limited edition skeleton tourbillon with titanium chassis.",
        "specs": ["Chassis: Grade 5 Titanium", "Power Reserve: 72 Hours"],
        "colors": ["#111827", "#f59e0b"]
    }
    create_res = client.post("/api/v1/admin/products", json=new_prod_payload, headers=admin_headers)
    assert create_res.status_code == 201
    created_prod = create_res.json()
    assert created_prod["title"] == "Quantum Precision Tourbillon"

    # 4. Admin updates stock
    stock_res = client.put(f"/api/v1/admin/products/{created_prod['id']}/stock", json={
        "stock_quantity": 25,
        "in_stock": True
    }, headers=admin_headers)
    assert stock_res.status_code == 200
    assert stock_res.json()["stock_quantity"] == 25

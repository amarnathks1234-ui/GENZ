def test_list_products_and_categories(client):
    # 1. Get categories
    cat_res = client.get("/api/v1/categories")
    assert cat_res.status_code == 200
    categories = cat_res.json()
    assert len(categories) >= 7

    # 2. Get all products
    prod_res = client.get("/api/v1/products")
    assert prod_res.status_code == 200
    data = prod_res.json()
    assert data["total"] >= 21
    assert len(data["items"]) >= 20

    # 3. Filter by category
    filter_res = client.get("/api/v1/products?category=electronics")
    assert filter_res.status_code == 200
    for p in filter_res.json()["items"]:
        assert p["category"].lower() == "electronics"

    # 4. Live search suggestions
    search_res = client.get("/api/v1/products/search?q=watch")
    assert search_res.status_code == 200
    assert len(search_res.json()) >= 1


def test_coupon_validation(client):
    res = client.post("/api/v1/coupons/validate", json={
        "code": "NEXORA20",
        "subtotal": 100.0
    })
    assert res.status_code == 200
    data = res.json()
    assert data["is_valid"] is True
    assert data["discount_rate"] == 0.20
    assert data["discount_amount"] == 20.0

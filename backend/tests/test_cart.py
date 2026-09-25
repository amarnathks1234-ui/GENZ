def test_cart_operations(client, customer_token):
    auth_headers = {"Authorization": f"Bearer {customer_token}"}

    # 1. Clear cart
    client.delete("/api/v1/cart/clear", headers=auth_headers)

    # 2. Add product 1 to cart
    add_res = client.post("/api/v1/cart/items", json={
        "product_id": "1",
        "quantity": 2,
        "color": "#111827"
    }, headers=auth_headers)
    assert add_res.status_code == 201
    cart = add_res.json()
    assert cart["item_count"] == 2
    assert len(cart["items"]) == 1
    assert cart["subtotal"] == 258.0  # 129.0 * 2

    # 3. Add product 2 to cart
    client.post("/api/v1/cart/items", json={
        "product_id": "2",
        "quantity": 1,
        "color": "Obsidian"
    }, headers=auth_headers)

    # 4. Get Cart details with 20% discount
    get_cart_res = client.get("/api/v1/cart?discount_rate=0.20", headers=auth_headers)
    assert get_cart_res.status_code == 200
    cart_data = get_cart_res.json()
    assert cart_data["item_count"] == 3
    assert cart_data["discount_amount"] > 0

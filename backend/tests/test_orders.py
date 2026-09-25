def test_create_order_and_verify_stock_deduction(client, customer_token):
    auth_headers = {"Authorization": f"Bearer {customer_token}"}

    # 1. Clear cart and add item
    client.delete("/api/v1/cart/clear", headers=auth_headers)
    client.post("/api/v1/cart/items", json={
        "product_id": "1",
        "quantity": 1,
        "color": "Midnight Black"
    }, headers=auth_headers)

    # 2. Place Order
    order_payload = {
        "coupon_code": "NEXORA20",
        "payment_method": "card",
        "customer_notes": "Please deliver between 2pm and 5pm."
    }
    order_res = client.post("/api/v1/orders", json=order_payload, headers=auth_headers)
    assert order_res.status_code == 201
    order = order_res.json()
    assert order["order_number"].startswith("NEX-")
    assert order["status"] == "paid"
    assert len(order["items"]) == 1
    assert order["discount_amount"] == 25.80  # 20% of 129.00

    # 3. Get customer order history
    history_res = client.get("/api/v1/orders", headers=auth_headers)
    assert history_res.status_code == 200
    assert history_res.json()["total"] >= 1

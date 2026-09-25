def test_register_and_login_flow(client):
    # 1. Register new user
    register_payload = {
        "email": "sarah.connor@nexora.com",
        "password": "securepassword123",
        "full_name": "Sarah Connor",
        "phone": "+1 555-8822"
    }
    response = client.post("/api/v1/auth/register", json=register_payload)
    assert response.status_code == 201
    data = response.json()
    assert "access_token" in data
    assert data["user"]["email"] == "sarah.connor@nexora.com"
    assert data["user"]["role"] == "customer"

    # 2. Login with registered user
    login_response = client.post("/api/v1/auth/login", json={
        "email": "sarah.connor@nexora.com",
        "password": "securepassword123"
    })
    assert login_response.status_code == 200
    token = login_response.json()["access_token"]

    # 3. Access /auth/me with bearer token
    me_response = client.get("/api/v1/auth/me", headers={"Authorization": f"Bearer {token}"})
    assert me_response.status_code == 200
    assert me_response.json()["full_name"] == "Sarah Connor"


def test_invalid_login_credentials(client):
    response = client.post("/api/v1/auth/login", json={
        "email": "nonexistent@nexora.com",
        "password": "wrongpassword"
    })
    assert response.status_code == 401
    assert "detail" in response.json()

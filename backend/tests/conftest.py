import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.main import app
from app.database import Base, get_db
from seeds.seed_data import seed_database

# Use in-memory SQLite database for isolated test execution
SQLALCHEMY_TEST_DATABASE_URL = "sqlite:///./test_nexora.db"

engine_test = create_engine(
    SQLALCHEMY_TEST_DATABASE_URL,
    connect_args={"check_same_thread": False}
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine_test)


@pytest.fixture(scope="session", autouse=True)
def setup_test_db():
    Base.metadata.drop_all(bind=engine_test)
    Base.metadata.create_all(bind=engine_test)
    db = TestingSessionLocal()
    seed_database(db)
    db.close()
    yield
    Base.metadata.drop_all(bind=engine_test)


@pytest.fixture()
def db_session():
    session = TestingSessionLocal()
    try:
        yield session
    finally:
        session.close()


@pytest.fixture()
def client(db_session):
    def override_get_db():
        try:
            yield db_session
        finally:
            pass

    app.dependency_overrides[get_db] = override_get_db
    with TestClient(app) as test_client:
        yield test_client
    app.dependency_overrides.clear()


@pytest.fixture()
def customer_token(client):
    response = client.post("/api/v1/auth/login", json={
        "email": "customer@nexora.com",
        "password": "customer123"
    })
    return response.json()["access_token"]


@pytest.fixture()
def admin_token(client):
    response = client.post("/api/v1/auth/login", json={
        "email": "admin@nexora.com",
        "password": "admin123"
    })
    return response.json()["access_token"]

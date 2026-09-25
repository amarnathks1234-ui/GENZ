/*==================================================
  GENZ Enterprise REST API Client
  Version: 1.0.0
==================================================*/

const GENZ_API_CONFIG = {
    BASE_URL: window.GENZ_API_URL || 'http://127.0.0.1:8000/api/v1',
    STORAGE_KEY_TOKEN: 'genz_access_token',
    STORAGE_KEY_USER: 'genz_user_profile',
    STORAGE_KEY_SESSION: 'genz_session_id'
};

// Generate persistent anonymous session ID for guest carts
function getSessionId() {
    let sid = localStorage.getItem(GENZ_API_CONFIG.STORAGE_KEY_SESSION);
    if (!sid) {
        sid = 'guest_' + Math.random().toString(36).substring(2, 15) + Date.now().toString(36);
        localStorage.setItem(GENZ_API_CONFIG.STORAGE_KEY_SESSION, sid);
    }
    return sid;
}

// Core HTTP Request Helper
async function apiRequest(endpoint, options = {}) {
    const url = `${GENZ_API_CONFIG.BASE_URL}${endpoint}`;
    const token = localStorage.getItem(GENZ_API_CONFIG.STORAGE_KEY_TOKEN);
    const sessionId = getSessionId();

    const headers = {
        'Content-Type': 'application/json',
        'X-Session-ID': sessionId,
        ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
        ...(options.headers || {})
    };

    try {
        const response = await fetch(url, {
            ...options,
            headers
        });

        if (response.status === 204) {
            return null;
        }

        const data = await response.json().catch(() => ({}));

        if (!response.ok) {
            const error = new Error(data.detail || `Request failed with status ${response.status}`);
            error.status = response.status;
            error.data = data;
            throw error;
        }

        return data;
    } catch (err) {
        // Log & rethrow for UI handling
        console.warn(`[GENZ API] Request to ${endpoint} failed:`, err.message);
        throw err;
    }
}

// API Methods
const GenzAPI = {
    // Auth & Profile
    auth: {
        async register(email, password, fullName, phone) {
            const data = await apiRequest('/auth/register', {
                method: 'POST',
                body: JSON.stringify({ email, password, full_name: fullName, phone })
            });
            if (data.access_token) {
                localStorage.setItem(GENZ_API_CONFIG.STORAGE_KEY_TOKEN, data.access_token);
                localStorage.setItem(GENZ_API_CONFIG.STORAGE_KEY_USER, JSON.stringify(data.user));
            }
            return data;
        },

        async login(email, password) {
            const data = await apiRequest('/auth/login', {
                method: 'POST',
                body: JSON.stringify({ email, password })
            });
            if (data.access_token) {
                localStorage.setItem(GENZ_API_CONFIG.STORAGE_KEY_TOKEN, data.access_token);
                localStorage.setItem(GENZ_API_CONFIG.STORAGE_KEY_USER, JSON.stringify(data.user));
            }
            return data;
        },

        async getMe() {
            return await apiRequest('/auth/me');
        },

        async updateProfile(profileData) {
            const data = await apiRequest('/auth/me', {
                method: 'PUT',
                body: JSON.stringify(profileData)
            });
            localStorage.setItem(GENZ_API_CONFIG.STORAGE_KEY_USER, JSON.stringify(data));
            return data;
        },

        logout() {
            localStorage.removeItem(GENZ_API_CONFIG.STORAGE_KEY_TOKEN);
            localStorage.removeItem(GENZ_API_CONFIG.STORAGE_KEY_USER);
            window.location.reload();
        },

        getCurrentUser() {
            try {
                const stored = localStorage.getItem(GENZ_API_CONFIG.STORAGE_KEY_USER);
                return stored ? JSON.parse(stored) : null;
            } catch (e) {
                return null;
            }
        },

        isAuthenticated() {
            return !!localStorage.getItem(GENZ_API_CONFIG.STORAGE_KEY_TOKEN);
        },

        isAdmin() {
            const u = this.getCurrentUser();
            return u && u.role === 'admin';
        }
    },

    // User Addresses
    addresses: {
        async list() {
            return await apiRequest('/users/addresses');
        },
        async create(addressData) {
            return await apiRequest('/users/addresses', {
                method: 'POST',
                body: JSON.stringify(addressData)
            });
        },
        async update(id, addressData) {
            return await apiRequest(`/users/addresses/${id}`, {
                method: 'PUT',
                body: JSON.stringify(addressData)
            });
        },
        async delete(id) {
            return await apiRequest(`/users/addresses/${id}`, {
                method: 'DELETE'
            });
        }
    },

    // Catalog & Products
    products: {
        async getProducts(params = {}) {
            const query = new URLSearchParams();
            if (params.category && params.category !== 'all') query.set('category', params.category);
            if (params.search) query.set('search', params.search);
            if (params.minPrice) query.set('min_price', params.minPrice);
            if (params.maxPrice) query.set('max_price', params.maxPrice);
            if (params.sort) query.set('sort', params.sort);
            if (params.page) query.set('page', params.page);
            if (params.size) query.set('size', params.size);

            const queryString = query.toString() ? `?${query.toString()}` : '';
            return await apiRequest(`/products${queryString}`);
        },

        async getProduct(id) {
            return await apiRequest(`/products/${id}`);
        },

        async searchLive(q, limit = 8) {
            return await apiRequest(`/products/search?q=${encodeURIComponent(q)}&limit=${limit}`);
        },

        async getCategories() {
            return await apiRequest('/categories');
        },

        async validateCoupon(code, subtotal) {
            return await apiRequest('/coupons/validate', {
                method: 'POST',
                body: JSON.stringify({ code, subtotal })
            });
        }
    },

    // Cart
    cart: {
        async getCart(discountRate = 0.0) {
            return await apiRequest(`/cart?discount_rate=${discountRate}`);
        },

        async addItem(productId, quantity = 1, color = null) {
            return await apiRequest('/cart/items', {
                method: 'POST',
                body: JSON.stringify({ product_id: productId, quantity, color })
            });
        },

        async updateItem(itemId, quantity, color = null) {
            return await apiRequest(`/cart/items/${itemId}`, {
                method: 'PUT',
                body: JSON.stringify({ quantity, color })
            });
        },

        async removeItem(itemId) {
            return await apiRequest(`/cart/items/${itemId}`, {
                method: 'DELETE'
            });
        },

        async clear() {
            return await apiRequest('/cart/clear', {
                method: 'DELETE'
            });
        },

        async sync(items) {
            return await apiRequest('/cart/sync', {
                method: 'POST',
                body: JSON.stringify({ items })
            });
        }
    },

    // Wishlist
    wishlist: {
        async getWishlist() {
            return await apiRequest('/wishlist');
        },

        async toggleItem(productId) {
            return await apiRequest('/wishlist/items', {
                method: 'POST',
                body: JSON.stringify({ product_id: productId })
            });
        },

        async removeItem(productId) {
            return await apiRequest(`/wishlist/items/${productId}`, {
                method: 'DELETE'
            });
        },

        async clear() {
            return await apiRequest('/wishlist/clear', {
                method: 'DELETE'
            });
        }
    },

    // Orders & Checkout
    orders: {
        async createOrder(orderData) {
            return await apiRequest('/orders', {
                method: 'POST',
                body: JSON.stringify(orderData)
            });
        },

        async getMyOrders(page = 1, size = 10) {
            return await apiRequest(`/orders?page=${page}&size=${size}`);
        },

        async getOrder(id) {
            return await apiRequest(`/orders/${id}`);
        },

        async trackOrder(orderNumber) {
            return await apiRequest(`/orders/track/${encodeURIComponent(orderNumber)}`);
        }
    },

    // Payments
    payments: {
        async verify(orderId, transactionId, paymentMethod = 'card') {
            return await apiRequest('/payments/verify', {
                method: 'POST',
                body: JSON.stringify({
                    order_id: orderId,
                    transaction_id: transactionId,
                    payment_method: paymentMethod
                })
            });
        }
    },

    // Reviews
    reviews: {
        async getProductReviews(productId) {
            return await apiRequest(`/reviews/product/${productId}`);
        },

        async submitReview(productId, rating, title, comment) {
            return await apiRequest('/reviews', {
                method: 'POST',
                body: JSON.stringify({
                    product_id: productId,
                    rating,
                    title,
                    comment
                })
            });
        }
    },

    // Admin
    admin: {
        async getStats() {
            return await apiRequest('/admin/stats');
        },

        async getProducts(page = 1, size = 50, category = null) {
            const catQuery = category ? `&category=${encodeURIComponent(category)}` : '';
            return await apiRequest(`/admin/products?page=${page}&size=${size}${catQuery}`);
        },

        async createProduct(productData) {
            return await apiRequest('/admin/products', {
                method: 'POST',
                body: JSON.stringify(productData)
            });
        },

        async updateProduct(id, productData) {
            return await apiRequest(`/admin/products/${id}`, {
                method: 'PUT',
                body: JSON.stringify(productData)
            });
        },

        async updateStock(id, stockQuantity, inStock = true) {
            return await apiRequest(`/admin/products/${id}/stock`, {
                method: 'PUT',
                body: JSON.stringify({ stock_quantity: stockQuantity, in_stock: inStock })
            });
        },

        async deleteProduct(id) {
            return await apiRequest(`/admin/products/${id}`, {
                method: 'DELETE'
            });
        },

        async getOrders(status = null, page = 1, size = 20) {
            const statusQuery = status ? `&status_filter=${encodeURIComponent(status)}` : '';
            return await apiRequest(`/admin/orders?page=${page}&size=${size}${statusQuery}`);
        },

        async updateOrderStatus(id, status, trackingNumber = null) {
            return await apiRequest(`/admin/orders/${id}/status`, {
                method: 'PUT',
                body: JSON.stringify({ status, tracking_number: trackingNumber })
            });
        },

        async getUsers() {
            return await apiRequest('/admin/users');
        }
    }
};

window.GenzAPI = GenzAPI; window.NexoraAPI = GenzAPI; window.GENZAPI = GenzAPI;

window.HeyGenzAPI = GenzAPI;
/*==================================================
  GENZ Admin Command Center Engine
==================================================*/

document.addEventListener('DOMContentLoaded', async () => {
    // 1. Guard check: Must be authenticated and have admin role
    const user = GenzAPI.auth.getCurrentUser();
    if (!GenzAPI.auth.isAuthenticated() || !user || user.role !== 'admin') {
        // Auto-login prompt or quick admin login
        const shouldLogin = confirm('Admin privileges required. Would you like to sign in as Demo Admin (admin@genz.com / admin123)?');
        if (shouldLogin) {
            try {
                await GenzAPI.auth.login('admin@genz.com', 'admin123');
                window.location.reload();
                return;
            } catch (err) {
                alert('Admin login failed: ' + err.message);
                window.location.href = 'login.html';
                return;
            }
        } else {
            window.location.href = 'login.html';
            return;
        }
    }

    // Populate Sidebar
    document.getElementById('sidebarName').textContent = user.full_name || 'Administrator';
    document.getElementById('sidebarEmail').textContent = user.email || 'admin@genz.com';
    document.getElementById('sidebarAvatar').textContent = (user.full_name || 'A')[0].toUpperCase();

    // Initial Load
    loadDashboardStats();
    loadAdminProducts();
    loadAdminOrders();
    loadAdminUsers();
});

// Tab Switcher
function switchAdminTab(tabKey, clickedEl) {
    document.querySelectorAll('.admin-nav-item').forEach(el => el.classList.remove('active'));
    if (clickedEl) clickedEl.classList.add('active');

    document.querySelectorAll('.admin-tab-pane').forEach(p => p.style.display = 'none');
    const target = document.getElementById(`tab-${tabKey}`);
    if (target) target.style.display = 'block';

    const heading = document.getElementById('tabHeading');
    const sub = document.getElementById('tabSubHeading');

    if (tabKey === 'overview') {
        heading.textContent = 'Overview & Live Analytics';
        sub.textContent = 'Monitor real-time revenue, order fulfillment, and stock movements.';
        loadDashboardStats();
    } else if (tabKey === 'products') {
        heading.textContent = 'Inventory & Product Catalog';
        sub.textContent = 'Add new items, adjust stock levels, and manage pricing.';
        loadAdminProducts();
    } else if (tabKey === 'orders') {
        heading.textContent = 'Orders & Customer Fulfillment';
        sub.textContent = 'Review order details, advance shipment statuses, and assign tracking numbers.';
        loadAdminOrders();
    } else if (tabKey === 'customers') {
        heading.textContent = 'Customer Directory';
        sub.textContent = 'View registered members, contact information, and account status.';
        loadAdminUsers();
    }
}

// 1. Dashboard Overview Stats
async function loadDashboardStats() {
    try {
        const stats = await GenzAPI.admin.getStats();
        document.getElementById('statRevenue').textContent = `$${stats.total_revenue.toFixed(2)}`;
        document.getElementById('statOrders').textContent = stats.total_orders;
        document.getElementById('statPendingOrders').textContent = `${stats.pending_orders} Pending Fulfillment`;
        document.getElementById('statProducts').textContent = stats.total_products;
        document.getElementById('statLowStock').textContent = `${stats.low_stock_products} Low Stock Items`;
        document.getElementById('statCustomers').textContent = stats.total_customers;

        // Render Recent Orders Table
        const tbody = document.getElementById('overviewRecentOrdersTable');
        if (tbody && stats.recent_orders) {
            if (stats.recent_orders.length === 0) {
                tbody.innerHTML = '<tr><td colspan="7" style="text-align:center; padding:30px; color:var(--admin-text-muted);">No orders recorded yet.</td></tr>';
                return;
            }
            tbody.innerHTML = stats.recent_orders.map(o => `
                <tr>
                    <td><strong style="color:#60a5fa;">${o.order_number}</strong></td>
                    <td style="color:var(--admin-text-muted); font-size:13px;">${new Date(o.created_at).toLocaleDateString()}</td>
                    <td>
                        <strong>${o.shipping_address?.full_name || 'Customer'}</strong><br>
                        <small style="color:var(--admin-text-muted);">${o.shipping_address?.city || ''}, ${o.shipping_address?.country || ''}</small>
                    </td>
                    <td>${o.items?.length || 1} item(s)</td>
                    <td><strong>$${o.total_amount.toFixed(2)}</strong></td>
                    <td><span class="status-pill ${o.status.toLowerCase()}">${o.status}</span></td>
                    <td>
                        <button class="btn-admin btn-admin-secondary" style="padding:4px 10px; font-size:12px;" onclick="switchAdminTab('orders')">
                            Manage
                        </button>
                    </td>
                </tr>
            `).join('');
        }
    } catch (err) {
        console.error('Failed to load admin stats:', err);
    }
}

// 2. Product Management
let adminProductsCache = [];

async function loadAdminProducts() {
    const tbody = document.getElementById('adminProductsTable');
    if (!tbody) return;
    const cat = document.getElementById('productCategoryFilter')?.value || 'all';

    try {
        const data = await GenzAPI.admin.getProducts(1, 100, cat);
        adminProductsCache = data.items;

        if (adminProductsCache.length === 0) {
            tbody.innerHTML = '<tr><td colspan="7" style="text-align:center; padding:30px; color:var(--admin-text-muted);">No products found.</td></tr>';
            return;
        }

        tbody.innerHTML = adminProductsCache.map(p => `
            <tr>
                <td>
                    <div style="display:flex; align-items:center; gap:12px;">
                        <img src="${p.image}" alt="${p.title}" style="width:44px; height:44px; object-fit:contain; background:#fff; border-radius:8px; padding:4px;">
                        <div>
                            <strong style="display:block; color:#fff;">${p.title}</strong>
                            <small style="color:var(--admin-text-muted); font-size:11px;">ID: ${p.id}</small>
                        </div>
                    </div>
                </td>
                <td><span style="color:#60a5fa; font-weight:700; text-transform:uppercase; font-size:12px;">${p.category}</span></td>
                <td><strong>$${p.price.toFixed(2)}</strong></td>
                <td>
                    <div style="display:inline-flex; align-items:center; gap:8px;">
                        <input type="number" value="${p.stock_quantity}" min="0" style="width:60px;" class="admin-input" onchange="quickUpdateStock('${p.id}', this.value)">
                        ${p.stock_quantity <= 10 ? '<span style="color:var(--admin-danger); font-size:11px; font-weight:700;">LOW</span>' : ''}
                    </div>
                </td>
                <td>
                    <span class="status-pill ${p.in_stock ? 'delivered' : 'cancelled'}">
                        ${p.in_stock ? 'In Stock' : 'Out of Stock'}
                    </span>
                </td>
                <td style="color:#f59e0b;">★ ${p.rating || 5.0}</td>
                <td>
                    <div style="display:flex; gap:6px;">
                        <button class="btn-admin btn-admin-secondary" style="padding:6px 10px;" onclick="openEditProductModal('${p.id}')" title="Edit">
                            <i class="fa-solid fa-pen"></i>
                        </button>
                        <button class="btn-admin btn-admin-danger" style="padding:6px 10px;" onclick="deleteProduct('${p.id}')" title="Delete">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');
    } catch (err) {
        tbody.innerHTML = `<tr><td colspan="7" style="color:var(--admin-danger); text-align:center; padding:20px;">Error loading products: ${err.message}</td></tr>`;
    }
}

async function quickUpdateStock(productId, newQty) {
    try {
        const qty = parseInt(newQty);
        await GenzAPI.admin.updateStock(productId, qty, qty > 0);
        loadDashboardStats();
    } catch (err) {
        alert('Stock update failed: ' + err.message);
    }
}

function openNewProductModal() {
    document.getElementById('productModalTitle').textContent = 'Add New Luxury Product';
    document.getElementById('modalProductId').value = '';
    document.getElementById('modalTitle').value = '';
    document.getElementById('modalPrice').value = '';
    document.getElementById('modalOrigPrice').value = '';
    document.getElementById('modalCategory').value = 'accessories';
    document.getElementById('modalStock').value = '50';
    document.getElementById('modalImage').value = 'Images/Watch.png';
    document.getElementById('modalDesc').value = '';
    document.getElementById('productModal').classList.add('active');
}

function openEditProductModal(productId) {
    const product = adminProductsCache.find(p => String(p.id) === String(productId));
    if (!product) return;

    document.getElementById('productModalTitle').textContent = 'Edit Product Details';
    document.getElementById('modalProductId').value = product.id;
    document.getElementById('modalTitle').value = product.title;
    document.getElementById('modalPrice').value = product.price;
    document.getElementById('modalOrigPrice').value = product.original_price || '';
    document.getElementById('modalCategory').value = product.category.toLowerCase();
    document.getElementById('modalStock').value = product.stock_quantity;
    document.getElementById('modalImage').value = product.image;
    document.getElementById('modalDesc').value = product.description;
    document.getElementById('productModal').classList.add('active');
}

function closeProductModal() {
    document.getElementById('productModal').classList.remove('active');
}

async function handleProductSubmit(e) {
    e.preventDefault();
    const id = document.getElementById('modalProductId').value;
    const payload = {
        title: document.getElementById('modalTitle').value.trim(),
        price: parseFloat(document.getElementById('modalPrice').value),
        original_price: document.getElementById('modalOrigPrice').value ? parseFloat(document.getElementById('modalOrigPrice').value) : null,
        category: document.getElementById('modalCategory').value,
        stock_quantity: parseInt(document.getElementById('modalStock').value),
        image: document.getElementById('modalImage').value.trim(),
        description: document.getElementById('modalDesc').value.trim(),
        in_stock: parseInt(document.getElementById('modalStock').value) > 0,
        badge: 'FEATURED'
    };

    try {
        if (id) {
            await GenzAPI.admin.updateProduct(id, payload);
        } else {
            await GenzAPI.admin.createProduct(payload);
        }
        closeProductModal();
        loadAdminProducts();
        loadDashboardStats();
    } catch (err) {
        alert('Save product failed: ' + err.message);
    }
}

async function deleteProduct(productId) {
    if (!confirm('Are you sure you want to deactivate this product from the catalog?')) return;
    try {
        await GenzAPI.admin.deleteProduct(productId);
        loadAdminProducts();
        loadDashboardStats();
    } catch (err) {
        alert('Delete failed: ' + err.message);
    }
}

// 3. Order Management
async function loadAdminOrders() {
    const tbody = document.getElementById('adminOrdersTable');
    if (!tbody) return;
    const statusFilter = document.getElementById('orderStatusFilter')?.value || 'all';

    try {
        const data = await GenzAPI.admin.getOrders(statusFilter, 1, 50);
        if (data.items.length === 0) {
            tbody.innerHTML = '<tr><td colspan="7" style="text-align:center; padding:30px; color:var(--admin-text-muted);">No orders matching filter.</td></tr>';
            return;
        }

        tbody.innerHTML = data.items.map(o => `
            <tr>
                <td><strong style="color:#60a5fa;">${o.order_number}</strong></td>
                <td style="color:var(--admin-text-muted); font-size:13px;">${new Date(o.created_at).toLocaleString()}</td>
                <td>
                    <strong>${o.shipping_address?.full_name || 'Customer'}</strong><br>
                    <small style="color:var(--admin-text-muted);">${o.shipping_address?.phone || ''} | ${o.shipping_address?.city || ''}</small>
                </td>
                <td><strong>$${o.total_amount.toFixed(2)}</strong></td>
                <td><span class="status-pill ${o.status.toLowerCase()}">${o.status}</span></td>
                <td>
                    <input type="text" class="admin-input" placeholder="Tracking #" value="${o.tracking_number || ''}" style="width:110px;" onchange="updateOrderTracking('${o.id}', this.value, '${o.status}')">
                </td>
                <td>
                    <select class="admin-select" onchange="updateOrderStatusAction('${o.id}', this.value, '${o.tracking_number || ''}')">
                        <option value="pending" ${o.status === 'pending' ? 'selected' : ''}>Pending</option>
                        <option value="paid" ${o.status === 'paid' ? 'selected' : ''}>Paid</option>
                        <option value="processing" ${o.status === 'processing' ? 'selected' : ''}>Processing</option>
                        <option value="shipped" ${o.status === 'shipped' ? 'selected' : ''}>Shipped</option>
                        <option value="delivered" ${o.status === 'delivered' ? 'selected' : ''}>Delivered</option>
                        <option value="cancelled" ${o.status === 'cancelled' ? 'selected' : ''}>Cancelled</option>
                    </select>
                </td>
            </tr>
        `).join('');
    } catch (err) {
        tbody.innerHTML = `<tr><td colspan="7" style="color:var(--admin-danger); text-align:center; padding:20px;">Error loading orders: ${err.message}</td></tr>`;
    }
}

async function updateOrderStatusAction(orderId, newStatus, trackingNumber) {
    try {
        await GenzAPI.admin.updateOrderStatus(orderId, newStatus, trackingNumber);
        loadAdminOrders();
        loadDashboardStats();
    } catch (err) {
        alert('Order status update failed: ' + err.message);
    }
}

async function updateOrderTracking(orderId, trackingNumber, currentStatus) {
    try {
        await GenzAPI.admin.updateOrderStatus(orderId, currentStatus, trackingNumber);
    } catch (err) {
        alert('Tracking update failed: ' + err.message);
    }
}

// 4. Customer Directory
async function loadAdminUsers() {
    const tbody = document.getElementById('adminUsersTable');
    if (!tbody) return;

    try {
        const users = await GenzAPI.admin.getUsers();
        if (users.length === 0) {
            tbody.innerHTML = '<tr><td colspan="5" style="text-align:center; padding:30px; color:var(--admin-text-muted);">No users found.</td></tr>';
            return;
        }

        tbody.innerHTML = users.map(u => `
            <tr>
                <td>
                    <div style="display:flex; align-items:center; gap:10px;">
                        <div class="admin-avatar" style="width:30px; height:30px; font-size:12px;">${(u.full_name || 'U')[0].toUpperCase()}</div>
                        <strong>${u.full_name}</strong>
                    </div>
                </td>
                <td style="color:#60a5fa;">${u.email}</td>
                <td style="color:var(--admin-text-muted);">${u.phone || 'N/A'}</td>
                <td><span class="status-pill ${u.role === 'admin' ? 'paid' : 'delivered'}">${u.role}</span></td>
                <td style="color:var(--admin-text-muted); font-size:13px;">${new Date(u.created_at).toLocaleDateString()}</td>
            </tr>
        `).join('');
    } catch (err) {
        tbody.innerHTML = `<tr><td colspan="5" style="color:var(--admin-danger); text-align:center; padding:20px;">Error loading customers: ${err.message}</td></tr>`;
    }
}

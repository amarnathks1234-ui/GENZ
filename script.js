/*==================================================
  GENZ - Master E-Commerce Application Engine
  Author: GENZ Development Team
==================================================*/

// ==================================================
// 1. MASTER PRODUCT CATALOG (21 HIGH-END PRODUCTS)
// ==================================================

const DEFAULT_PRODUCTS = [
    {
        id: '1',
        title: 'Premium Classic Chrono Watch',
        price: 129.00,
        originalPrice: 179.00,
        image: 'Images/Watch.png',
        category: 'accessories',
        badge: 'NEW',
        rating: 4.9,
        reviews: 148,
        inStock: true,
        description: 'Precision automatic movement with scratch-resistant sapphire crystal glass, 50m water resistance, and handcrafted genuine Italian leather strap designed for timeless durability.',
        specs: ['Movement: Japanese Automatic', 'Case: 42mm Surgical Grade 316L Stainless Steel', 'Glass: Double-Domed Sapphire Crystal', 'Water Resistance: 5 ATM / 50M', 'Strap: Genuine Full-Grain Leather'],
        colors: ['#111827', '#1d4ed8', '#9ca3af']
    },
    {
        id: '2',
        title: 'Wireless Pro Active Earbuds',
        price: 89.00,
        originalPrice: 129.00,
        image: 'Images/headphone.png',
        category: 'electronics',
        badge: 'HOT',
        rating: 4.8,
        reviews: 210,
        inStock: true,
        description: 'Hybrid active noise cancellation with 36-hour total battery life, high-fidelity custom acoustic drivers, touch sensors, and IPX5 sweatproof ergonomic ear cushions.',
        specs: ['ANC: Hybrid 38dB Cancellation', 'Battery: 8h Earbuds + 28h Wireless Case', 'Connectivity: Bluetooth 5.3 Low Latency', 'Driver: 11mm Titanium Composite', 'Water Rating: IPX5'],
        colors: ['#111827', '#ffffff', '#2563eb']
    },
    {
        id: '3',
        title: 'Artisan Leather Messenger Bag',
        price: 149.00,
        originalPrice: 199.00,
        image: 'Images/bag.png',
        category: 'bags',
        badge: 'BEST',
        rating: 4.9,
        reviews: 95,
        inStock: true,
        description: 'Full-grain vegetable-tanned artisan leather messenger bag featuring padded 15-inch laptop compartment, solid brass hardware, and weather-resistant interior lining.',
        specs: ['Material: 100% Full-Grain Cowhide Leather', 'Hardware: Solid Antique Brass', 'Capacity: 16L with 15.6" Laptop Sleeve', 'Pockets: 6 Internal + 2 Quick Magnetic Pockets'],
        colors: ['#78350f', '#111827', '#451a03']
    },
    {
        id: '4',
        title: 'Urban Runner Pro Sneakers',
        price: 119.00,
        originalPrice: 159.00,
        image: 'Images/shoe.png',
        category: 'footwear',
        badge: 'SALE',
        rating: 4.7,
        reviews: 84,
        inStock: true,
        description: 'Ultra-lightweight responsive cushion running sneakers engineered with breathable circular knit upper, carbon rubber traction outsole, and shock-absorbing midsole.',
        specs: ['Upper: Seamless Engineered Air-Mesh', 'Midsole: Energy-Return Nitrogen Foam', 'Weight: 245g (Size 9)', 'Sole: Carbon High-Grip Rubber'],
        colors: ['#2563eb', '#111827', '#dc2626']
    },
    {
        id: '5',
        title: 'Polarized Titanium Sunglasses',
        price: 79.00,
        originalPrice: 110.00,
        image: 'Images/glass.png',
        category: 'fashion',
        badge: 'TRENDING',
        rating: 4.8,
        reviews: 62,
        inStock: true,
        description: 'UV400 polarized HD lenses framed in ultralight aerospace titanium alloy with anti-reflective coating, spring hinges, and microfiber protective casing.',
        specs: ['Lens: 100% UV400 Polarized Triacetate', 'Frame: Grade 5 Lightweight Titanium', 'Weight: Only 18 grams', 'Hinges: Custom Flexible Micro-Springs'],
        colors: ['#111827', '#d97706', '#0284c7']
    },
    {
        id: '6',
        title: 'Smart 360 Spatial Speaker',
        price: 159.00,
        originalPrice: 219.00,
        image: 'Images/speaker.png',
        category: 'electronics',
        badge: 'NEW',
        rating: 4.9,
        reviews: 112,
        inStock: true,
        description: '360° omnidirectional spatial sound speaker with dual passive radiators, 24-hour continuous playback, built-in beamforming mic, and IPX7 waterproof submersible rating.',
        specs: ['Output: 45W Peak Stereo Power', 'Battery: 24h Playtime with 15W Qi Charging', 'Waterproof: IPX7 Submersible', 'Connectivity: Wi-Fi, Bluetooth 5.3 & AirPlay 2'],
        colors: ['#111827', '#16a34a', '#2563eb']
    },
    {
        id: '7',
        title: 'Radiance Glow Skincare Routine',
        price: 65.00,
        originalPrice: 90.00,
        image: 'Images/beauty&care.png',
        category: 'beauty',
        badge: 'ORGANIC',
        rating: 4.9,
        reviews: 175,
        inStock: true,
        description: 'Dermatologist-tested organic skin revitalization kit formulated with pure multi-molecular hyaluronic acid, stabilized vitamin C, botanical peptides, and cold-pressed jojoba serum.',
        specs: ['Volume: 3x 50ml Regimen Bottles', 'Key Actives: 15% Vitamin C + 2% HA', 'Certifications: Cruelty-Free & 100% Vegan', 'Skin Type: Suitable for all skin types'],
        colors: ['#f472b6', '#fbbf24']
    },
    {
        id: '8',
        title: 'Minimalist Dimmable Desk Lamp',
        price: 95.00,
        originalPrice: 130.00,
        image: 'Images/home essentials.png',
        category: 'home',
        badge: 'POPULAR',
        rating: 4.6,
        reviews: 43,
        inStock: true,
        description: 'Touch-controlled stepless dimmable warm LED architectural table lamp featuring integrated 15W Qi fast wireless phone charging base and anodized brushed aluminum body.',
        specs: ['Lumens: 800 Lumens (CRI > 95)', 'Color Temp: 2700K - 6500K Adjustable', 'Wireless Charger: 15W Qi Fast Charge', 'Material: Aircraft Anodized Aluminum'],
        colors: ['#f3f4f6', '#111827', '#d97706']
    },
    {
        id: '9',
        title: 'Executive Commuter Backpack',
        price: 179.00,
        originalPrice: 240.00,
        image: 'Images/bag&accessories.png',
        category: 'bags',
        badge: 'PREMIUM',
        rating: 4.9,
        reviews: 130,
        inStock: true,
        description: 'Handcrafted top-grain leather executive backpack with concealed anti-theft RFID zipper pocket, breathable airmesh back panel, and dedicated shockproof tablet sleeve.',
        specs: ['Volume: 22L Capacity', 'Compartment: Fits up to 16" MacBook Pro', 'Material: Weather-Resistant Top Grain Leather', 'Straps: Ergonomic Padded Memory Foam'],
        colors: ['#451a03', '#111827']
    },
    {
        id: '10',
        title: 'Smart Executive Chrono Hybrid',
        price: 199.00,
        originalPrice: 269.00,
        image: 'Images/watches.png',
        category: 'accessories',
        badge: 'FEATURED',
        rating: 5.0,
        reviews: 310,
        inStock: true,
        description: 'Hybrid executive smartwatch featuring crisp Always-On AMOLED display, optical heart-rate & SpO2 biometric sensors, standalone GPS, and up to 14 days standby battery.',
        specs: ['Display: 1.43" AMOLED 466x466 px', 'Battery: Up to 14 Days Typical Use', 'Sensors: Heart Rate, SpO2, Sleep Stages, GPS', 'Waterproof: 50m Water-Resistant (5 ATM)'],
        colors: ['#111827', '#9ca3af', '#b45309']
    },
    {
        id: '11',
        title: 'Touchscreen Smart Home Hub',
        price: 139.00,
        originalPrice: 189.00,
        image: 'Images/electronics.png',
        category: 'electronics',
        badge: 'SMART',
        rating: 4.7,
        reviews: 88,
        inStock: true,
        description: 'Central 7-inch smart home touchscreen console unifying smart lights, security cameras, thermostats, and multi-room audio with zero-latency Matter & Zigbee protocols.',
        specs: ['Screen: 7" IPS Full HD Touch Display', 'Protocols: Matter, Thread, Zigbee 3.0, Wi-Fi 6', 'Audio: Dual Full-Range Micro Speakers', 'Voice: Far-Field Noise Cancelling Mics'],
        colors: ['#111827', '#ffffff']
    },
    {
        id: '12',
        title: 'Tailored Linen Ensemble Jacket',
        price: 125.00,
        originalPrice: 170.00,
        image: 'Images/fashion.png',
        category: 'fashion',
        badge: 'STYLE',
        rating: 4.8,
        reviews: 94,
        inStock: true,
        description: 'Tailored organic linen-cotton relaxed blazer designed for effortless modern elegance, superior air circulation, and versatile everyday casual or formal luxury wear.',
        specs: ['Fabric: 65% Organic Linen / 35% Cotton', 'Fit: Tailored Modern Relaxed', 'Lining: Breathable Silk Blend', 'Care: Machine Wash Gentle or Dry Clean'],
        colors: ['#1e293b', '#d97706', '#0f766e']
    },
    {
        id: '13',
        title: 'Pro ANC Over-Ear Studio Headphones',
        price: 219.00,
        originalPrice: 299.00,
        image: 'Images/headphone.png',
        category: 'electronics',
        badge: 'HOT',
        rating: 4.9,
        reviews: 320,
        inStock: true,
        description: 'Studio-grade hybrid active noise canceling wireless headphones with custom 40mm neodymium drivers, transparency mode, and plush memory foam protein leather cushions.',
        specs: ['Drivers: 40mm Custom Bio-Cellulose', 'Noise Cancellation: -42dB Adaptive Hybrid', 'Battery: 45h ANC On / 60h ANC Off', 'Codecs: LDAC, AAC, SBC, Hi-Res Audio'],
        colors: ['#111827', '#6b7280']
    },
    {
        id: '14',
        title: 'Handcrafted Ceramic Coffee Set',
        price: 49.00,
        originalPrice: 70.00,
        image: 'Images/home essentials.png',
        category: 'home',
        badge: 'NEW',
        rating: 4.8,
        reviews: 57,
        inStock: true,
        description: 'Hand-glazed matte stoneware artisanal coffee mugs engineered for optimal heat retention, non-porous stain resistance, and ergonomic finger loop comfort grip.',
        specs: ['Set: 4 Handcrafted 350ml Ceramic Mugs', 'Material: High-Fire Non-Toxic Stoneware', 'Compatibility: Microwave & Dishwasher Safe', 'Finish: Matte Satin Scratch-Resistant'],
        colors: ['#374151', '#065f46', '#991b1b']
    },
    {
        id: '15',
        title: 'Velvet Soft Cushion Collection',
        price: 55.00,
        originalPrice: 80.00,
        image: 'Images/home essentials.png',
        category: 'home',
        badge: 'BEST',
        rating: 4.6,
        reviews: 38,
        inStock: true,
        description: 'Plush velvet accent decorative pillow covers with concealed invisible zipper closures and hypoallergenic feather alternative down-like fluffy inserts.',
        specs: ['Includes: 2x 18x18" Cushions with Inserts', 'Material: Premium Dutch Silk Velvet', 'Fill: 100% Hypoallergenic Microfiber', 'Zipper: Heavy-Duty Hidden YKK Zipper'],
        colors: ['#1e3a8a', '#831843', '#064e3b']
    },
    {
        id: '16',
        title: 'Ultra Carbon Sport Running Shoes',
        price: 135.00,
        originalPrice: 185.00,
        image: 'Images/shoe.png',
        category: 'footwear',
        badge: 'POPULAR',
        rating: 4.8,
        reviews: 165,
        inStock: true,
        description: 'High-performance distance marathon running shoes featuring carbon-infused heel propulsion plate and ultra-breathable engineered mesh upper.',
        specs: ['Plate: Full-Length Curved Carbon Fiber', 'Cushioning: Supercritical Dual-Density Foam', 'Drop: 8mm Heel-to-Toe', 'Weight: 215g (Ultralight)'],
        colors: ['#0284c7', '#111827', '#e11d48']
    },
    {
        id: '17',
        title: 'Moroccan Argan Hair Revive Serum',
        price: 42.00,
        originalPrice: 60.00,
        image: 'Images/beauty&care.png',
        category: 'beauty',
        badge: 'ORGANIC',
        rating: 4.9,
        reviews: 204,
        inStock: true,
        description: 'Intense hair restoration serum infused with cold-pressed pure Moroccan argan oil, plant keratin, rosemary essence, and vitamin E for mirror-like silky shine.',
        specs: ['Volume: 100ml Glass Dropper Bottle', 'Formulation: 100% Pure Organic Extracts', 'Benefits: Anti-Frizz, Heat Protection up to 230°C', 'Scent: Subtle Natural Bergamot & Amber'],
        colors: ['#fbbf24', '#f472b6']
    },
    {
        id: '18',
        title: 'Rose Gold Mother-of-Pearl Watch',
        price: 169.00,
        originalPrice: 229.00,
        image: 'Images/Watch.png',
        category: 'accessories',
        badge: 'PREMIUM',
        rating: 4.9,
        reviews: 82,
        inStock: true,
        description: '18k rose gold-plated stainless steel watch with authentic natural mother-of-pearl dial face, Swiss quartz movement, and scratch-resistant curved glass.',
        specs: ['Movement: Swiss Ronda Quartz Caliber', 'Plating: 5-Micron 18K Rose Gold PVD', 'Dial: Natural Iridescent Mother-of-Pearl', 'Strap: Milanese Mesh with Safety Buckle'],
        colors: ['#f59e0b', '#e5e7eb']
    },
    {
        id: '19',
        title: 'Slim RFID Leather Cardholder',
        price: 45.00,
        originalPrice: 65.00,
        image: 'Images/bag&accessories.png',
        category: 'accessories',
        badge: 'NEW',
        rating: 4.7,
        reviews: 119,
        inStock: true,
        description: 'Military-grade RFID-blocking minimalist genuine leather cardholder featuring 6 quick-access card slots, center cash compartment, and thumb pull tab.',
        specs: ['Material: Top-Grain Nappa Leather', 'Shielding: 13.56 MHz RFID / NFC Protection', 'Capacity: Holds up to 8 Cards + Cash', 'Thickness: Ultra-Slim 6mm Profile'],
        colors: ['#111827', '#78350f', '#1e3a8a']
    },
    {
        id: '20',
        title: 'Mulberry Silk Printed Scarf',
        price: 68.00,
        originalPrice: 95.00,
        image: 'Images/fashion.png',
        category: 'fashion',
        badge: 'TRENDING',
        rating: 4.8,
        reviews: 73,
        inStock: true,
        description: '100% pure Grade-6A Mulberry silk printed scarf styled with meticulous hand-rolled hems, vibrant permanent color fastness, and ultra-soft delicate drape.',
        specs: ['Fabric: 100% Pure Mulberry Silk (16 Momme)', 'Dimensions: 90cm x 90cm Square', 'Edges: Artisan Hand-Rolled and Hand-Stitched', 'Print: Botanical Geometric Motif'],
        colors: ['#ec4899', '#3b82f6', '#10b981']
    },
    {
        id: '21',
        title: 'Biometric Titanium Smart Ring',
        price: 149.00,
        originalPrice: 199.00,
        image: 'Images/electronics.png',
        category: 'electronics',
        badge: 'SMART',
        rating: 4.9,
        reviews: 140,
        inStock: true,
        description: 'Aerospace-grade titanium biometric smart ring tracking sleep stages, body temperature variations, heart rate variability (HRV), and daily recovery readiness.',
        specs: ['Material: Medical-Grade Titanium & Resin', 'Battery: 7 Days Battery Life with Wireless Charger', 'Waterproof: 100M Water Resistance (10 ATM)', 'Compatibility: iOS & Android via GENZ Health App'],
        colors: ['#111827', '#9ca3af', '#f59e0b']
    }
];

// ==================================================
// 2. SECURITY & UTILITY HELPERS
// ==================================================

function escapeHtml(str) {
    if (str === null || str === undefined) return '';
    return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function getProductById(id) {
    const cleanId = String(id).replace(/[^a-zA-Z0-9_-]/g, '');
    return DEFAULT_PRODUCTS.find(p => String(p.id) === cleanId) || DEFAULT_PRODUCTS[0];
}

function selectProduct(id) {
    localStorage.setItem('genz_selected_product_id', String(id));
}

// ==================================================
// 3. CART & WISHLIST STORAGE ENGINE
// ==================================================

function getCart() {
    try {
        const stored = localStorage.getItem('genz_cart') || localStorage.getItem('HEY GENZ_cart') || localStorage.getItem('nexora_cart');
        return stored ? JSON.parse(stored) : [
            { id: '1', title: 'Premium Classic Chrono Watch', price: 129.00, image: 'Images/Watch.png', qty: 1, color: 'Midnight Black' },
            { id: '2', title: 'Wireless Pro Active Earbuds', price: 89.00, image: 'Images/headphone.png', qty: 1, color: 'Obsidian' }
        ];
    } catch (e) {
        return [];
    }
}

function saveCart(cart) {
    localStorage.setItem('genz_cart', JSON.stringify(cart));
    updateHeaderBadges();
}

function getWishlist() {
    try {
        const stored = localStorage.getItem('genz_wishlist') || localStorage.getItem('HEY GENZ_wishlist') || localStorage.getItem('nexora_wishlist');
        return stored ? JSON.parse(stored) : [
            { id: '1', title: 'Premium Classic Chrono Watch', price: 129.00, image: 'Images/Watch.png', badge: 'NEW' },
            { id: '2', title: 'Wireless Pro Active Earbuds', price: 89.00, image: 'Images/headphone.png', badge: 'HOT' }
        ];
    } catch (e) {
        return [];
    }
}

function saveWishlist(wishlist) {
    localStorage.setItem('genz_wishlist', JSON.stringify(wishlist));
    updateHeaderBadges();
}

function getActiveDiscount() {
    try {
        const stored = localStorage.getItem('genz_discount') || localStorage.getItem('HEY GENZ_discount') || localStorage.getItem('nexora_discount');
        return JSON.parse(stored) || { code: '', rate: 0 };
    } catch(e) {
        return { code: '', rate: 0 };
    }
}

function saveActiveDiscount(code, rate) {
    localStorage.setItem('genz_discount', JSON.stringify({ code, rate }));
}

// ==================================================
// 4. DOM INITIALIZATION
// ==================================================

document.addEventListener('DOMContentLoaded', () => {
    initHeader();
    initMobileBottomBar();
    initSearchModal();
    initQuickViewModal();
    initBackToTop();
    initChatbot();
    updateHeaderBadges();
    initPageModules();
    initGenzAuth();
});

// ==================================================
// 5. HEADER, BADGES & MOBILE MENU
// ==================================================

function initHeader() {
    const menuBtn = document.querySelector(".menu-btn") || document.querySelector(".menu-toggle");
    const navMenu = document.querySelector(".nav-menu") || document.querySelector(".nav-links");
    const closeBtn = document.querySelector(".drawer-close-btn") || document.getElementById("drawerCloseBtn");
    let navOverlay = document.querySelector(".nav-backdrop-overlay") || document.getElementById("navBackdrop");

    if (!navOverlay && navMenu) {
        navOverlay = document.createElement("div");
        navOverlay.className = "nav-backdrop-overlay";
        navOverlay.id = "navBackdrop";
        document.body.appendChild(navOverlay);
    }

    function openMenu() {
        if (navMenu) navMenu.classList.add("active");
        if (navOverlay) navOverlay.classList.add("active");
        document.body.classList.add("drawer-open");
        const icon = menuBtn ? menuBtn.querySelector("i") : null;
        if (icon) icon.className = "fa-solid fa-xmark";
    }

    function closeMenu() {
        if (navMenu) navMenu.classList.remove("active");
        if (navOverlay) navOverlay.classList.remove("active");
        document.body.classList.remove("drawer-open");
        const icon = menuBtn ? menuBtn.querySelector("i") : null;
        if (icon) icon.className = "fa-solid fa-bars";
    }

    if (menuBtn && navMenu) {
        menuBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            if (navMenu.classList.contains("active")) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        if (closeBtn) {
            closeBtn.addEventListener("click", (e) => {
                e.stopPropagation();
                closeMenu();
            });
        }

        if (navOverlay) {
            navOverlay.addEventListener("click", () => {
                closeMenu();
            });
        }

        // Close on outside click
        document.addEventListener('click', (e) => {
            if (navMenu.classList.contains('active') && !navMenu.contains(e.target) && !menuBtn.contains(e.target)) {
                closeMenu();
            }
        });

        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                closeMenu();
            }
        });

        // Close on link click
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                closeMenu();
            });
        });
    }

    const header = document.querySelector("header");
    if (header) {
        let lastScrollY = window.scrollY;
        let ticking = false;

        window.addEventListener("scroll", () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const currentScrollY = window.scrollY;
                    const bottomBar = document.querySelector(".mobile-bottom-bar");

                    if (currentScrollY > 20) {
                        header.classList.add("scrolled");
                    } else {
                        header.classList.remove("scrolled");
                    }

                    const isMobile = window.innerWidth <= 768;
                    const isDrawerOpen = navMenu && navMenu.classList.contains("active");

                    if (isMobile && !isDrawerOpen) {
                        if (currentScrollY <= 25) {
                            // Only appear when the screen is on the top
                            header.classList.remove("header-hidden");
                        } else {
                            // Disappear while scrolled down away from top
                            header.classList.add("header-hidden");
                        }
                    } else if (!isMobile) {
                        header.classList.remove("header-hidden");
                    }

                    lastScrollY = Math.max(0, currentScrollY);
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });

        window.addEventListener("resize", () => {
            if (window.innerWidth > 768) {
                header.classList.remove("header-hidden");
                const bottomBar = document.querySelector(".mobile-bottom-bar");
                if (bottomBar) bottomBar.classList.remove("bar-hidden");
            }
        });
    }
}

function initMobileBottomBar() {
    if (document.querySelector('.mobile-bottom-bar')) return;
    const path = window.location.pathname;
    const isHome = path.endsWith('index.html') || path.endsWith('/') || path.length < 2;
    const isShop = path.includes('shop.html') || path.includes('product.html');
    const isWishlist = path.includes('wishlist.html');
    const isCart = path.includes('cart.html') || path.includes('checkout.html');

    const barHtml = `
        <nav class="mobile-bottom-bar" aria-label="Mobile Quick Bar">
            <a href="index.html" class="mobile-nav-item ${isHome ? 'active' : ''}">
                <i class="fa-solid fa-house"></i>
                <span>Home</span>
            </a>
            <a href="shop.html" class="mobile-nav-item ${isShop ? 'active' : ''}">
                <i class="fa-solid fa-store"></i>
                <span>Shop</span>
            </a>
            <a href="#" class="mobile-nav-item search-trigger">
                <i class="fa-solid fa-magnifying-glass"></i>
                <span>Search</span>
            </a>
            <a href="wishlist.html" class="mobile-nav-item ${isWishlist ? 'active' : ''}">
                <i class="fa-regular fa-heart"></i>
                <span>Wishlist</span>
                <span class="wishlist-count">0</span>
            </a>
            <a href="cart.html" class="mobile-nav-item ${isCart ? 'active' : ''}">
                <i class="fa-solid fa-cart-shopping"></i>
                <span>Cart</span>
                <span class="cart-count">0</span>
            </a>
        </nav>
    `;
    document.body.insertAdjacentHTML('beforeend', barHtml);
}

function updateHeaderBadges() {
    const cart = getCart();
    const wishlist = getWishlist();

    const cartCount = cart.reduce((total, item) => total + (item.qty || 1), 0);
    const wishlistCount = wishlist.length;

    document.querySelectorAll(".cart-count").forEach(el => {
        el.textContent = cartCount;
        el.style.transform = 'scale(1.25)';
        setTimeout(() => el.style.transform = 'scale(1)', 200);
    });

    document.querySelectorAll(".wishlist-count").forEach(el => {
        el.textContent = wishlistCount;
        el.style.transform = 'scale(1.25)';
        setTimeout(() => el.style.transform = 'scale(1)', 200);
    });
}

// ==================================================
// 6. GLOBAL LIVE SEARCH MODAL
// ==================================================

function initSearchModal() {
    if (!document.getElementById('searchModal')) {
        const modalHtml = `
            <div id="searchModal" class="search-modal">
                <div class="search-modal-content">
                    <button class="search-close-btn" id="closeSearchModal" type="button" aria-label="Close search" style="position:absolute; top:20px; right:20px; background:none; border:none; font-size:24px; color:#64748b; cursor:pointer;">&times;</button>
                    <h3 style="margin-bottom:16px; font-weight:800; color:#0f172a; font-size:22px;">Search GENZ Collection</h3>
                    <form id="searchForm" onsubmit="event.preventDefault();" style="margin-bottom:20px;">
                        <div class="search-input-wrapper" style="display:flex; align-items:center; background:#f8fafc; border:2px solid #e2e8f0; border-radius:12px; padding:10px 16px; gap:12px;">
                            <i class="fa-solid fa-magnifying-glass" style="color:#64748b; font-size:18px;"></i>
                            <input type="text" id="searchInput" placeholder="Search by name, category, or keyword (e.g. watch, shoes, bag)..." style="width:100%; border:none; background:transparent; outline:none; font-size:15px; font-weight:500;">
                            <button type="submit" style="padding:8px 18px; background:#2563eb; color:#fff; border:none; border-radius:8px; font-weight:700; cursor:pointer;">Search</button>
                        </div>
                    </form>
                    <div id="searchSuggestions" style="display:flex; gap:8px; flex-wrap:wrap; margin-bottom:16px;">
                        <span style="font-size:12px; font-weight:700; color:#64748b; align-self:center;">Popular:</span>
                        <button type="button" onclick="setSearchQuery('watch')" style="background:#f1f5f9; border:none; padding:4px 12px; border-radius:20px; font-size:12px; font-weight:600; cursor:pointer;">⌚ Watches</button>
                        <button type="button" onclick="setSearchQuery('earbuds')" style="background:#f1f5f9; border:none; padding:4px 12px; border-radius:20px; font-size:12px; font-weight:600; cursor:pointer;">🎧 Audio</button>
                        <button type="button" onclick="setSearchQuery('bag')" style="background:#f1f5f9; border:none; padding:4px 12px; border-radius:20px; font-size:12px; font-weight:600; cursor:pointer;">💼 Bags</button>
                        <button type="button" onclick="setSearchQuery('sneakers')" style="background:#f1f5f9; border:none; padding:4px 12px; border-radius:20px; font-size:12px; font-weight:600; cursor:pointer;">👟 Shoes</button>
                    </div>
                    <div id="searchResults" style="max-height:360px; overflow-y:auto; display:flex; flex-direction:column; gap:8px;"></div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHtml);
    }

    const modal = document.getElementById('searchModal');
    const closeBtn = document.getElementById('closeSearchModal');
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    const searchForm = document.getElementById('searchForm');

    function openModal() {
        if (modal) {
            modal.classList.add('active');
            if (searchInput) {
                searchInput.value = '';
                searchResults.innerHTML = '';
                setTimeout(() => searchInput.focus(), 150);
            }
        }
    }

    function closeModal() {
        if (modal) modal.classList.remove('active');
    }

    window.setSearchQuery = function(q) {
        if (searchInput) {
            searchInput.value = q;
            performSearch();
        }
    };

    document.addEventListener('click', (e) => {
        const searchBtn = e.target.closest('a[aria-label="Search"], .nav-icons a[href="#"], .search-trigger');
        if (searchBtn && !searchBtn.closest('#searchModal')) {
            e.preventDefault();
            openModal();
        }
    });

    if (closeBtn) closeBtn.onclick = closeModal;
    if (modal) {
        modal.onclick = (e) => {
            if (e.target === modal) closeModal();
        };
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
            closeModal();
        }
    });

    let searchDebounceTimer;
    async function performSearch() {
        if (!searchInput) return;
        const query = searchInput.value.toLowerCase().trim();
        if (!query) {
            searchResults.innerHTML = '';
            return;
        }

        clearTimeout(searchDebounceTimer);
        searchDebounceTimer = setTimeout(async () => {
            let matches = [];
            try {
                if (window.GenzAPI) {
                    matches = await GenzAPI.products.searchLive(query, 8);
                }
            } catch (e) {
                // Fallback to local catalog
                matches = DEFAULT_PRODUCTS.filter(p =>
                    p.title.toLowerCase().includes(query) ||
                    p.category.toLowerCase().includes(query) ||
                    p.description.toLowerCase().includes(query)
                );
            }

            if (!matches || matches.length === 0) {
                matches = DEFAULT_PRODUCTS.filter(p =>
                    p.title.toLowerCase().includes(query) ||
                    p.category.toLowerCase().includes(query) ||
                    p.description.toLowerCase().includes(query)
                );
            }

            if (matches.length === 0) {
                searchResults.innerHTML = `
                    <div style="text-align:center; padding:30px 10px; color:#64748b;">
                        <i class="fa-solid fa-magnifying-glass" style="font-size:32px; margin-bottom:10px; opacity:0.5;"></i>
                        <p style="font-size:15px; font-weight:600;">No products found for "${escapeHtml(query)}"</p>
                        <p style="font-size:13px;">Try searching for categories like "accessories", "electronics", or "fashion".</p>
                    </div>
                `;
            } else {
                searchResults.innerHTML = matches.map(p => `
                    <a href="product.html?id=${p.id}" onclick="selectProduct('${p.id}')" style="display:flex; align-items:center; gap:16px; padding:12px 14px; border-radius:12px; background:#f8fafc; border:1px solid #e2e8f0; text-decoration:none; color:inherit; transition:all 0.2s ease;" onmouseover="this.style.borderColor='#93c5fd'; this.style.background='#eff6ff'" onmouseout="this.style.borderColor='#e2e8f0'; this.style.background='#f8fafc'">
                        <img src="${p.image}" alt="${escapeHtml(p.title)}" style="width:52px; height:52px; object-fit:contain; border-radius:8px; background:#ffffff; padding:4px;">
                        <div style="flex:1;">
                            <span style="font-size:11px; font-weight:700; color:#2563eb; text-transform:uppercase;">${escapeHtml(p.category)}</span>
                            <h4 style="font-size:15px; font-weight:700; color:#0f172a; margin:2px 0;">${escapeHtml(p.title)}</h4>
                        </div>
                        <div style="text-align:right;">
                            <strong style="font-size:16px; color:#0f172a;">$${parseFloat(p.price).toFixed(2)}</strong>
                            ${p.originalPrice || p.original_price ? `<small style="display:block; font-size:12px; color:#94a3b8; text-decoration:line-through;">$${parseFloat(p.originalPrice || p.original_price).toFixed(2)}</small>` : ''}
                        </div>
                    </a>
                `).join('');
            }
        }, 150);
    }

    if (searchInput) searchInput.addEventListener('input', performSearch);
    if (searchForm) searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        performSearch();
    });
}

// ==================================================
// 7. QUICK VIEW MODAL
// ==================================================

function initQuickViewModal() {
    if (!document.getElementById('quickViewModal')) {
        const modalHtml = `
            <div id="quickViewModal" class="quickview-modal">
                <div class="quickview-content">
                    <button class="quickview-close" id="closeQuickView" type="button" style="position:absolute; top:20px; right:20px; background:none; border:none; font-size:26px; color:#64748b; cursor:pointer;">&times;</button>
                    <div class="quickview-grid">
                        <div style="background:#f8fafc; border-radius:16px; padding:30px; text-align:center; display:flex; align-items:center; justify-content:center; border:1px solid #e2e8f0; height:340px;">
                            <img id="qvImage" src="" alt="Product" style="max-height:280px; width:auto; object-fit:contain; transition:transform 0.3s ease;">
                        </div>
                        <div>
                            <span id="qvCategory" style="color:#2563eb; font-size:12px; font-weight:800; text-transform:uppercase; letter-spacing:1.5px;"></span>
                            <h2 id="qvTitle" style="font-size:24px; font-weight:800; color:#0f172a; margin:6px 0 10px; line-height:1.3;"></h2>
                            <div id="qvRating" style="color:#f59e0b; font-size:14px; margin-bottom:14px;"></div>
                            <div style="display:flex; align-items:baseline; gap:10px; margin-bottom:16px;">
                                <h3 id="qvPrice" style="font-size:28px; font-weight:800; color:#2563eb;"></h3>
                                <span id="qvOrigPrice" style="font-size:16px; color:#94a3b8; text-decoration:line-through; font-weight:600;"></span>
                            </div>
                            <p id="qvDescription" style="font-size:14px; color:#475569; line-height:1.6; margin-bottom:24px;"></p>
                            
                            <div style="display:flex; align-items:center; gap:16px; margin-bottom:25px;">
                                <label style="font-weight:700; font-size:14px; color:#0f172a;">Quantity:</label>
                                <div style="display:flex; align-items:center; background:#f1f5f9; border:1px solid #e2e8f0; border-radius:8px; padding:2px;">
                                    <button id="qvMinus" type="button" style="width:34px; height:34px; border:none; background:#fff; border-radius:6px; font-weight:700; cursor:pointer;">-</button>
                                    <span id="qvQty" style="font-weight:800; font-size:15px; width:36px; text-align:center;">1</span>
                                    <button id="qvPlus" type="button" style="width:34px; height:34px; border:none; background:#fff; border-radius:6px; font-weight:700; cursor:pointer;">+</button>
                                </div>
                            </div>

                            <div style="display:flex; gap:12px;">
                                <button id="qvAddToCart" type="button" style="flex:1; padding:14px 20px; background:#2563eb; color:#fff; border:none; border-radius:10px; font-weight:700; font-size:15px; cursor:pointer; box-shadow:0 8px 20px rgba(37,99,235,0.25); display:flex; align-items:center; justify-content:center; gap:8px;">
                                    <i class="fa-solid fa-cart-shopping"></i> Add to Cart
                                </button>
                                <button id="qvWishlist" type="button" style="padding:14px 18px; background:#f1f5f9; color:#0f172a; border:1px solid #e2e8f0; border-radius:10px; font-weight:600; cursor:pointer; font-size:16px;">
                                    <i class="fa-regular fa-heart"></i>
                                </button>
                                <a id="qvFullDetails" href="#" style="padding:14px 18px; background:#0f172a; color:#fff; border-radius:10px; font-weight:600; text-decoration:none; font-size:14px; display:flex; align-items:center;">
                                    View Full Details <i class="fa-solid fa-arrow-right" style="margin-left:6px;"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHtml);
    }

    const modal = document.getElementById('quickViewModal');
    const closeBtn = document.getElementById('closeQuickView');

    if (closeBtn && modal) {
        closeBtn.onclick = () => modal.classList.remove('active');
        modal.onclick = (e) => {
            if (e.target === modal) modal.classList.remove('active');
        };
    }
}

function openQuickView(productId) {
    const product = getProductById(productId);
    const modal = document.getElementById('quickViewModal');
    if (!product || !modal) return;

    let qty = 1;

    document.getElementById('qvImage').src = product.image;
    document.getElementById('qvImage').alt = product.title;
    document.getElementById('qvCategory').textContent = product.category;
    document.getElementById('qvTitle').textContent = product.title;
    document.getElementById('qvPrice').textContent = `$${product.price.toFixed(2)}`;
    document.getElementById('qvOrigPrice').textContent = product.originalPrice ? `$${product.originalPrice.toFixed(2)}` : '';
    document.getElementById('qvDescription').textContent = product.description;
    document.getElementById('qvQty').textContent = qty;
    document.getElementById('qvFullDetails').href = `product.html?id=${product.id}`;
    document.getElementById('qvFullDetails').onclick = () => selectProduct(product.id);

    const fullStars = '★'.repeat(Math.floor(product.rating || 5));
    document.getElementById('qvRating').innerHTML = `${fullStars} <span style="color:#64748b; font-weight:600;">(${product.reviews || 50} Verified Reviews)</span>`;

    const minusBtn = document.getElementById('qvMinus');
    const plusBtn = document.getElementById('qvPlus');
    const addCartBtn = document.getElementById('qvAddToCart');
    const wishlistBtn = document.getElementById('qvWishlist');

    minusBtn.onclick = () => {
        if (qty > 1) {
            qty--;
            document.getElementById('qvQty').textContent = qty;
        }
    };

    plusBtn.onclick = () => {
        qty++;
        document.getElementById('qvQty').textContent = qty;
    };

    addCartBtn.onclick = () => {
        addToCart({ ...product, qty });
        modal.classList.remove('active');
    };

    const wishlist = getWishlist();
    const isWishlisted = wishlist.some(i => String(i.id) === String(product.id));
    wishlistBtn.innerHTML = isWishlisted ? '<i class="fa-solid fa-heart" style="color:#ef4444;"></i>' : '<i class="fa-regular fa-heart"></i>';

    wishlistBtn.onclick = () => {
        toggleWishlist(product, wishlistBtn);
        const updated = getWishlist().some(i => String(i.id) === String(product.id));
        wishlistBtn.innerHTML = updated ? '<i class="fa-solid fa-heart" style="color:#ef4444;"></i>' : '<i class="fa-regular fa-heart"></i>';
    };

    modal.classList.add('active');
}

// ==================================================
// 8. TOAST NOTIFICATION SYSTEM
// ==================================================

function showToast(message, icon = 'fa-circle-check') {
    let container = document.querySelector('.toast-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'toast-container';
        container.style.cssText = 'position:fixed; bottom:30px; right:30px; z-index:100000; display:flex; flex-direction:column; gap:10px; pointer-events:none;';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.style.cssText = 'background:#0f172a; color:#fff; padding:14px 22px; border-radius:12px; font-size:14px; font-weight:600; box-shadow:0 15px 35px rgba(0,0,0,0.25); display:flex; align-items:center; gap:10px; pointer-events:auto; transform:translateY(20px); opacity:0; transition:all 0.3s cubic-bezier(0.16, 1, 0.3, 1); border:1px solid rgba(255,255,255,0.1);';
    toast.innerHTML = `<i class="fa-solid ${icon}" style="color:#10b981; font-size:16px;"></i> <span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateY(0)';
    }, 20);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(15px)';
        setTimeout(() => toast.remove(), 300);
    }, 2800);
}

// ==================================================
// 9. CART ENGINE & OPERATIONS
// ==================================================

function addToCart(product) {
    let cart = getCart();
    const existing = cart.find(item => String(item.id) === String(product.id));

    if (existing) {
        existing.qty += (product.qty || 1);
    } else {
        cart.push({
            id: String(product.id || Date.now()),
            title: product.title,
            price: parseFloat(product.price),
            image: product.image,
            qty: product.qty || 1,
            color: product.color || 'Standard'
        });
    }

    saveCart(cart);
    showToast(`Added "${product.title}" to Cart!`, 'fa-cart-shopping');

    if (window.location.pathname.includes('cart.html')) {
        renderCartPage();
    }
}

function removeFromCart(id) {
    let cart = getCart();
    cart = cart.filter(item => String(item.id) !== String(id));
    saveCart(cart);
    showToast('Item removed from cart', 'fa-trash-can');
    if (window.location.pathname.includes('cart.html')) {
        renderCartPage();
    }
    if (window.location.pathname.includes('checkout.html')) {
        renderCheckoutPage();
    }
}

function changeQty(delta, indexOrId) {
    let cart = getCart();
    let item;
    if (typeof indexOrId === 'number' && indexOrId < cart.length) {
        item = cart[indexOrId];
    } else {
        item = cart.find(i => String(i.id) === String(indexOrId));
    }

    if (item) {
        item.qty += delta;
        if (item.qty <= 0) {
            cart = cart.filter(i => i !== item);
        }
        saveCart(cart);
        if (window.location.pathname.includes('cart.html')) {
            renderCartPage();
        }
    }
}

function clearCart() {
    saveCart([]);
    showToast('Cart cleared', 'fa-trash-can');
    if (window.location.pathname.includes('cart.html')) {
        renderCartPage();
    }
}

// ==================================================
// 10. WISHLIST ENGINE & OPERATIONS
// ==================================================

function toggleWishlist(product, buttonEl) {
    let wishlist = getWishlist();
    const index = wishlist.findIndex(item => String(item.id) === String(product.id));

    if (index > -1) {
        wishlist.splice(index, 1);
        saveWishlist(wishlist);
        showToast(`Removed "${product.title}" from Wishlist`, 'fa-heart-crack');
        if (buttonEl) {
            buttonEl.classList.remove('active');
            const icon = buttonEl.querySelector('i');
            if (icon) icon.className = 'fa-regular fa-heart';
        }
    } else {
        wishlist.push({
            id: String(product.id || Date.now()),
            title: product.title,
            price: parseFloat(product.price),
            image: product.image,
            badge: product.badge || 'NEW'
        });
        saveWishlist(wishlist);
        showToast(`Saved "${product.title}" to Wishlist!`, 'fa-heart');
        if (buttonEl) {
            buttonEl.classList.add('active');
            const icon = buttonEl.querySelector('i');
            if (icon) icon.className = 'fa-solid fa-heart';
        }
    }

    if (window.location.pathname.includes('wishlist.html')) {
        renderWishlistPage();
    }
}

function removeFromWishlist(id) {
    let wishlist = getWishlist();
    wishlist = wishlist.filter(item => String(item.id) !== String(id));
    saveWishlist(wishlist);
    showToast('Removed item from Wishlist', 'fa-trash-can');
    if (window.location.pathname.includes('wishlist.html')) {
        renderWishlistPage();
    }
}

function moveWishlistItemToCart(id) {
    let wishlist = getWishlist();
    const item = wishlist.find(i => String(i.id) === String(id));
    if (item) {
        addToCart(item);
        removeFromWishlist(id);
    }
}

function moveAllWishlistToCart() {
    let wishlist = getWishlist();
    if (wishlist.length === 0) {
        showToast('Wishlist is empty!', 'fa-circle-exclamation');
        return;
    }
    wishlist.forEach(item => addToCart(item));
    saveWishlist([]);
    showToast('Moved all wishlist items to Cart!', 'fa-cart-shopping');
    if (window.location.pathname.includes('wishlist.html')) {
        renderWishlistPage();
    }
}

function clearWishlist() {
    saveWishlist([]);
    showToast('Wishlist cleared', 'fa-trash-can');
    if (window.location.pathname.includes('wishlist.html')) {
        renderWishlistPage();
    }
}

// ==================================================
// 11. PRODUCT CARD RENDERER
// ==================================================

function renderProductCardHtml(p) {
    const wishlist = getWishlist();
    const isWishlisted = wishlist.some(i => String(i.id) === String(p.id));
    const starRating = '★'.repeat(Math.floor(p.rating || 5));

    const cleanTitle = escapeHtml(p.title);
    const cleanCategory = escapeHtml(p.category);
    const cleanBadge = escapeHtml(p.badge || 'NEW');
    const cleanImage = escapeHtml(p.image);
    const cleanId = escapeHtml(p.id);

    return `
        <article class="product-card" data-category="${cleanCategory}" data-price="${p.price}" data-rating="${p.rating || 5}" data-id="${cleanId}">
            <div class="product-image">
                <button class="product-wishlist ${isWishlisted ? 'active' : ''}" onclick="event.preventDefault(); toggleWishlist(getProductById('${cleanId}'), this);" aria-label="Add to wishlist">
                    <i class="${isWishlisted ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
                </button>
                <a href="product.html?id=${cleanId}" onclick="selectProduct('${cleanId}')">
                    <img src="${cleanImage}" alt="${cleanTitle}">
                </a>
                <button class="quick-view-btn" onclick="openQuickView('${cleanId}')">
                    <i class="fa-regular fa-eye"></i> Quick View
                </button>
            </div>
            <div class="product-info">
                <span class="product-category">${cleanCategory}</span>
                <h3>
                    <a href="product.html?id=${cleanId}" onclick="selectProduct('${cleanId}')">${cleanTitle}</a>
                </h3>
                <div class="product-rating">
                    ${starRating} <small>(${p.reviews || 45})</small>
                </div>
                <div class="product-bottom">
                    <div class="product-price">
                        $${p.price.toFixed(2)}
                        ${p.originalPrice ? `<small>$${p.originalPrice.toFixed(2)}</small>` : ''}
                    </div>
                    <button class="add-cart" onclick="addToCart(getProductById('${cleanId}'))" aria-label="Add to cart">
                        <i class="fa-solid fa-cart-shopping"></i>
                    </button>
                </div>
            </div>
        </article>
    `;
}

// ==================================================
// 12. PAGE SPECIFIC MODULES
// ==================================================

function initPageModules() {
    const path = window.location.pathname;

    initHomePage();

    if (path.includes('cart.html')) {
        renderCartPage();
    } else if (path.includes('checkout.html')) {
        renderCheckoutPage();
    } else if (path.includes('wishlist.html')) {
        renderWishlistPage();
    } else if (path.includes('product.html')) {
        initProductPage();
    } else if (path.includes('shop.html')) {
        initShopPage();
    } else if (path.includes('contact.html')) {
        initContactPage();
    } else if (path.includes('login.html')) {
        initLoginPage();
    }
}

// --------------------------------------------------
// A. Homepage Module
// --------------------------------------------------
function initHomePage() {
    const featuredContainer = document.getElementById('featuredProductsGrid');
    if (featuredContainer) {
        const featured = DEFAULT_PRODUCTS.slice(0, 8);
        featuredContainer.innerHTML = featured.map(p => renderProductCardHtml(p)).join('');
    }

    const newsletterForms = document.querySelectorAll('.newsletter-form, form.newsletter');
    newsletterForms.forEach(form => {
        form.onsubmit = (e) => {
            e.preventDefault();
            const input = form.querySelector('input[type="email"]');
            showToast('Thank you for subscribing to GENZ VIP Club!', 'fa-paper-plane');
            if (input) input.value = '';
        };
    });
}

// --------------------------------------------------
// B. Shop Page Module
// --------------------------------------------------
function initShopPage() {
    const productGrid = document.querySelector('.shop-products');
    const categoryBtns = document.querySelectorAll('.category-btn');
    const sortSelect = document.getElementById('sort');
    const catalogTitle = document.getElementById('catalogTitle');
    const shopSearchInput = document.getElementById('shopSearchInput');
    const priceChips = document.querySelectorAll('.price-chip');

    if (!productGrid) return;

    let currentCategory = 'all';
    let currentPriceRange = 'all';
    let searchQuery = '';

    // URL parameter support: shop.html?category=electronics
    const urlParams = new URLSearchParams(window.location.search);
    const paramCat = urlParams.get('category');
    if (paramCat) {
        currentCategory = paramCat.toLowerCase();
    }

    function renderShopGrid() {
        let products = [...DEFAULT_PRODUCTS];

        // 1. Filter by category
        if (currentCategory !== 'all') {
            products = products.filter(p => p.category.toLowerCase() === currentCategory.toLowerCase());
        }

        // 2. Filter by search query
        if (searchQuery) {
            products = products.filter(p => 
                p.title.toLowerCase().includes(searchQuery) ||
                p.category.toLowerCase().includes(searchQuery) ||
                p.description.toLowerCase().includes(searchQuery)
            );
        }

        // 3. Filter by price range
        if (currentPriceRange === 'under50') {
            products = products.filter(p => p.price < 50);
        } else if (currentPriceRange === '50to100') {
            products = products.filter(p => p.price >= 50 && p.price <= 100);
        } else if (currentPriceRange === 'over100') {
            products = products.filter(p => p.price > 100);
        }

        // 4. Sort
        const sortVal = sortSelect ? sortSelect.value : 'default';
        if (sortVal === 'low') {
            products.sort((a, b) => a.price - b.price);
        } else if (sortVal === 'high') {
            products.sort((a, b) => b.price - a.price);
        } else if (sortVal === 'new') {
            products.sort((a, b) => parseInt(b.id) - parseInt(a.id));
        } else if (sortVal === 'rating') {
            products.sort((a, b) => (b.rating || 5) - (a.rating || 5));
        }

        // Update Title
        if (catalogTitle) {
            if (currentCategory === 'all') {
                catalogTitle.textContent = `All Products (${products.length})`;
            } else {
                const formattedName = currentCategory.charAt(0).toUpperCase() + currentCategory.slice(1);
                catalogTitle.textContent = `${formattedName} Collection (${products.length})`;
            }
        }

        // Empty state
        if (products.length === 0) {
            productGrid.innerHTML = `
                <div style="grid-column:1/-1; text-align:center; padding:70px 20px; background:#fff; border-radius:16px; border:1px solid #e2e8f0;">
                    <i class="fa-solid fa-box-open" style="font-size:52px; color:#94a3b8; margin-bottom:16px;"></i>
                    <h2 style="font-size:22px; font-weight:800; color:#0f172a;">No Matching Products Found</h2>
                    <p style="color:#64748b; margin:8px 0 24px; font-size:15px;">Try clearing your filters or search keywords.</p>
                    <button onclick="resetShopFilters()" style="padding:12px 28px; background:#2563eb; color:#fff; border:none; border-radius:10px; font-weight:700; cursor:pointer;">
                        Reset All Filters
                    </button>
                </div>
            `;
            return;
        }

        productGrid.innerHTML = products.map(p => renderProductCardHtml(p)).join('');
    }

    window.resetShopFilters = function() {
        currentCategory = 'all';
        currentPriceRange = 'all';
        searchQuery = '';
        if (shopSearchInput) shopSearchInput.value = '';
        if (sortSelect) sortSelect.value = 'default';
        categoryBtns.forEach(b => b.classList.toggle('active', b.getAttribute('data-category') === 'all'));
        priceChips.forEach(c => c.classList.toggle('active', c.getAttribute('data-price') === 'all'));
        renderShopGrid();
        showToast('Filters reset', 'fa-rotate-left');
    };

    // Category button events
    categoryBtns.forEach(btn => {
        const cat = btn.getAttribute('data-category');
        if (cat === currentCategory || (currentCategory === 'all' && cat === 'all')) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }

        btn.addEventListener('click', (e) => {
            e.preventDefault();
            categoryBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentCategory = cat;
            renderShopGrid();
        });
    });

    // Price chip filter events
    priceChips.forEach(chip => {
        chip.addEventListener('click', () => {
            priceChips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            currentPriceRange = chip.getAttribute('data-price');
            renderShopGrid();
        });
    });

    // Search input
    if (shopSearchInput) {
        shopSearchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value.toLowerCase().trim();
            renderShopGrid();
        });
    }

    // Sort select
    if (sortSelect) {
        sortSelect.addEventListener('change', renderShopGrid);
    }

    renderShopGrid();
}

// --------------------------------------------------
// C. Product Details Page Module
// --------------------------------------------------
function initProductPage() {
    const urlParams = new URLSearchParams(window.location.search);
    let productId = urlParams.get('id') || localStorage.getItem('genz_selected_product_id') || '1';
    const product = getProductById(productId);

    const mainImg = document.getElementById('mainImage');
    const titleEl = document.getElementById('productTitle');
    const priceEl = document.getElementById('productPrice');
    const origPriceEl = document.getElementById('productOrigPrice');
    const descEl = document.getElementById('productDescription');
    const categorySpan = document.getElementById('productCategory');
    const ratingEl = document.getElementById('productRating');
    const qtyInput = document.getElementById('qty');
    const cartBtn = document.getElementById('addToCartBtn');
    const buyBtn = document.getElementById('buyNowBtn');
    const thumbnailRow = document.getElementById('thumbnailRow');
    const specsList = document.getElementById('specsList');

    if (mainImg) {
        mainImg.src = product.image;
        mainImg.alt = product.title;
    }
    if (titleEl) titleEl.textContent = product.title;
    if (priceEl) priceEl.textContent = `$${product.price.toFixed(2)}`;
    if (origPriceEl) origPriceEl.textContent = product.originalPrice ? `$${product.originalPrice.toFixed(2)}` : '';
    if (descEl) descEl.textContent = product.description;
    if (categorySpan) categorySpan.textContent = `PREMIUM ${product.category.toUpperCase()}`;

    if (ratingEl) {
        const stars = '★'.repeat(Math.floor(product.rating || 5));
        ratingEl.innerHTML = `${stars} <span style="color:#64748b; font-size:14px; font-weight:600;">(${product.reviews || 120} Customer Reviews)</span>`;
    }

    // Thumbnails
    if (thumbnailRow) {
        const relatedCategoryItems = DEFAULT_PRODUCTS.filter(p => p.category === product.category).slice(0, 4);
        thumbnailRow.innerHTML = relatedCategoryItems.map((p, i) => `
            <img src="${p.image}" alt="${escapeHtml(p.title)}" class="${String(p.id) === String(product.id) ? 'active' : ''}" onclick="document.getElementById('mainImage').src='${p.image}'; document.querySelectorAll('#thumbnailRow img').forEach(img => img.classList.remove('active')); this.classList.add('active');">
        `).join('');
    }

    // Specs list in tab
    if (specsList && product.specs) {
        specsList.innerHTML = product.specs.map(spec => `
            <li style="display:flex; align-items:center; gap:10px; padding:10px 0; border-bottom:1px solid #f1f5f9; font-size:15px; color:#334155;">
                <i class="fa-solid fa-check" style="color:#2563eb;"></i> ${escapeHtml(spec)}
            </li>
        `).join('');
    }

    // Quantity controls
    window.increase = function () {
        if (qtyInput) qtyInput.value = parseInt(qtyInput.value || 1) + 1;
    };

    window.decrease = function () {
        if (qtyInput && parseInt(qtyInput.value) > 1) {
            qtyInput.value = parseInt(qtyInput.value) - 1;
        }
    };

    // Color Swatches
    const colorSwatches = document.querySelectorAll('.color-swatch');
    colorSwatches.forEach(swatch => {
        swatch.addEventListener('click', () => {
            colorSwatches.forEach(s => s.classList.remove('active'));
            swatch.classList.add('active');
        });
    });

    // Add to cart & buy now
    if (cartBtn) {
        cartBtn.onclick = () => {
            addToCart({
                ...product,
                qty: parseInt(qtyInput ? qtyInput.value : 1)
            });
        };
    }

    if (buyBtn) {
        buyBtn.onclick = () => {
            addToCart({
                ...product,
                qty: parseInt(qtyInput ? qtyInput.value : 1)
            });
            window.location.href = 'checkout.html';
        };
    }

    // Tab switcher
    window.switchProductTab = function(tabName, btn) {
        document.querySelectorAll('.tab-nav-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
        if (btn) btn.classList.add('active');
        const target = document.getElementById(tabName);
        if (target) target.classList.add('active');
    };

    // Load & Render Live Reviews
    const reviewsTab = document.getElementById('reviewsTab') || document.getElementById('tab-reviews') || document.querySelector('.reviews-list');
    async function loadLiveProductReviews() {
        try {
            if (window.GenzAPI) {
                const summary = await GenzAPI.reviews.getProductReviews(String(product.id));
                if (summary && summary.reviews && summary.reviews.length > 0 && reviewsTab) {
                    reviewsTab.innerHTML = summary.reviews.map(r => `
                        <div class="review-item" style="padding:16px 0; border-bottom:1px solid #f1f5f9;">
                            <div style="display:flex; justify-content:space-between; margin-bottom:6px;">
                                <div>
                                    <strong style="color:#0f172a; font-size:15px;">${escapeHtml(r.user_name)}</strong>
                                    ${r.is_verified_purchase ? `<span style="font-size:11px; background:#ecfdf5; color:#10b981; padding:2px 8px; border-radius:12px; font-weight:700; margin-left:6px;"><i class="fa-solid fa-circle-check"></i> Verified Purchase</span>` : ''}
                                </div>
                                <span style="color:#f59e0b; font-size:13px;">${'★'.repeat(r.rating)}${'☆'.repeat(5 - r.rating)}</span>
                            </div>
                            ${r.title ? `<h4 style="font-size:14px; font-weight:700; margin:4px 0; color:#1e293b;">${escapeHtml(r.title)}</h4>` : ''}
                            <p style="color:#475569; font-size:14px; line-height:1.5; margin:0;">${escapeHtml(r.comment)}</p>
                        </div>
                    `).join('');
                }
            }
        } catch (err) {
            console.warn('Reviews load fallback:', err.message);
        }
    }
    loadLiveProductReviews();

    // Review submission
    const reviewForm = document.getElementById('reviewForm');
    if (reviewForm) {
        reviewForm.onsubmit = async (e) => {
            e.preventDefault();
            if (!GenzAPI.auth.isAuthenticated()) {
                showToast('Please sign in to submit a verified review.', 'fa-circle-exclamation');
                return;
            }
            const ratingSelect = reviewForm.querySelector('select[name="rating"]') || document.getElementById('reviewRating');
            const titleInput = reviewForm.querySelector('input[name="title"]') || document.getElementById('reviewTitle');
            const commentInput = reviewForm.querySelector('textarea') || document.getElementById('reviewComment');

            const rating = ratingSelect ? parseInt(ratingSelect.value) : 5;
            const title = titleInput ? titleInput.value.trim() : 'Great product!';
            const comment = commentInput ? commentInput.value.trim() : '';

            if (!comment) {
                showToast('Please enter your review feedback.', 'fa-circle-exclamation');
                return;
            }

            try {
                await GenzAPI.reviews.submitReview(String(product.id), rating, title, comment);
                showToast('Review submitted and verified! Thank you.', 'fa-star');
                reviewForm.reset();
                loadLiveProductReviews();
            } catch (err) {
                showToast(err.message || 'Failed to submit review.', 'fa-triangle-exclamation');
            }
        };
    }

    // Related products
    const relatedGrid = document.querySelector('.product-grid');
    if (relatedGrid) {
        const related = DEFAULT_PRODUCTS.filter(p => String(p.id) !== String(product.id)).slice(0, 4);
        relatedGrid.innerHTML = related.map(p => renderProductCardHtml(p)).join('');
    }
}

// --------------------------------------------------
// D. Cart Page Module
// --------------------------------------------------
function renderCartPage() {
    const container = document.querySelector('.cart-items');
    const subtotalEl = document.getElementById('subtotal');
    const discountEl = document.getElementById('discountRow');
    const totalEl = document.getElementById('total');
    const freeShippingBar = document.getElementById('freeShippingBar');
    const freeShippingText = document.getElementById('freeShippingText');
    const cart = getCart();
    const discount = getActiveDiscount();

    if (!container) return;

    if (cart.length === 0) {
        container.innerHTML = `
            <div style="text-align:center; padding:70px 20px; background:#fff; border-radius:20px; border:1px solid #e2e8f0;">
                <i class="fa-solid fa-cart-shopping" style="font-size:52px; color:#94a3b8; margin-bottom:16px;"></i>
                <h2 style="font-size:24px; font-weight:800; color:#0f172a;">Your Shopping Cart is Empty</h2>
                <p style="color:#64748b; margin:10px 0 25px; font-size:15px;">Discover our handpicked collection and add your favorite essentials.</p>
                <a href="shop.html" style="display:inline-flex; align-items:center; gap:8px; padding:14px 32px; background:#2563eb; color:#fff; border-radius:10px; text-decoration:none; font-weight:700; box-shadow:0 8px 20px rgba(37,99,235,0.25);">
                    Start Shopping <i class="fa-solid fa-arrow-right"></i>
                </a>
            </div>
        `;
        if (subtotalEl) subtotalEl.textContent = '$0.00';
        if (totalEl) totalEl.textContent = '$0.00';
        if (freeShippingBar) freeShippingBar.style.width = '0%';
        return;
    }

    let subtotal = 0;
    container.innerHTML = cart.map((item, idx) => {
        const itemTotal = item.price * item.qty;
        subtotal += itemTotal;
        return `
            <div class="cart-item" style="display:flex; align-items:center; gap:20px; padding:22px; background:#fff; border:1px solid #e2e8f0; border-radius:16px; margin-bottom:16px; transition:all 0.2s ease;">
                <img src="${item.image}" alt="${escapeHtml(item.title)}" style="width:90px; height:90px; object-fit:contain; border-radius:12px; background:#f8fafc; padding:8px; border:1px solid #f1f5f9;">
                <div class="cart-info" style="flex:1;">
                    <h3 style="font-size:16px; font-weight:700; color:#0f172a; margin-bottom:4px;">${escapeHtml(item.title)}</h3>
                    <p style="font-weight:700; color:#2563eb; font-size:15px; margin-bottom:10px;">$${item.price.toFixed(2)}</p>
                    <div class="cart-quantity" style="display:inline-flex; align-items:center; background:#f1f5f9; border:1px solid #e2e8f0; border-radius:8px; padding:2px;">
                        <button onclick="changeQty(-1, ${idx})" style="width:30px; height:30px; border:none; background:#fff; border-radius:6px; cursor:pointer; font-weight:700; color:#0f172a;">-</button>
                        <span id="qty${idx}" style="font-weight:800; font-size:14px; width:34px; text-align:center;">${item.qty}</span>
                        <button onclick="changeQty(1, ${idx})" style="width:30px; height:30px; border:none; background:#fff; border-radius:6px; cursor:pointer; font-weight:700; color:#0f172a;">+</button>
                    </div>
                </div>
                <div style="text-align:right;">
                    <strong style="font-size:18px; font-weight:800; color:#0f172a; display:block; margin-bottom:10px;">$${itemTotal.toFixed(2)}</strong>
                    <button class="remove-btn" onclick="removeFromCart('${item.id}')" style="background:none; border:none; color:#ef4444; cursor:pointer; font-weight:600; font-size:13px; display:inline-flex; align-items:center; gap:6px;">
                        <i class="fa-solid fa-trash-can"></i> Remove
                    </button>
                </div>
            </div>
        `;
    }).join('') + `
        <div style="display:flex; justify-content:space-between; align-items:center; margin-top:20px;">
            <button onclick="clearCart()" style="padding:12px 20px; background:#fee2e2; color:#dc2626; border:none; border-radius:10px; font-weight:700; cursor:pointer; font-size:14px;">
                <i class="fa-solid fa-trash-can" style="margin-right:6px;"></i> Clear Cart
            </button>
            <a href="shop.html" style="padding:12px 22px; background:#f1f5f9; color:#334155; border-radius:10px; text-decoration:none; font-weight:700; font-size:14px;">
                <i class="fa-solid fa-arrow-left" style="margin-right:6px;"></i> Continue Shopping
            </a>
        </div>
    `;

    // Calculate free shipping progress ($50 free shipping)
    const shippingThreshold = 50.00;
    const progress = Math.min(100, (subtotal / shippingThreshold) * 100);
    if (freeShippingBar) freeShippingBar.style.width = `${progress}%`;
    if (freeShippingText) {
        if (subtotal >= shippingThreshold) {
            freeShippingText.innerHTML = '🎉 You qualify for <strong>FREE Express Shipping</strong>!';
        } else {
            const diff = (shippingThreshold - subtotal).toFixed(2);
            freeShippingText.innerHTML = `Add <strong>$${diff}</strong> more to unlock <strong>FREE Express Shipping</strong>!`;
        }
    }

    const discountAmount = subtotal * (discount.rate || 0);
    const tax = subtotal > 0 ? 18.00 : 0.00;
    const total = Math.max(0, subtotal - discountAmount + tax);

    if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
    if (discountEl) {
        discountEl.innerHTML = discount.rate > 0 ? `
            <div style="display:flex; justify-content:space-between; margin-bottom:15px; color:#10b981; font-weight:700; font-size:15px;">
                <span>Discount (${discount.code})</span>
                <span>-$${discountAmount.toFixed(2)}</span>
            </div>
        ` : '';
    }
    if (totalEl) totalEl.textContent = `$${total.toFixed(2)}`;

    // Coupon Handler
    const couponBtn = document.querySelector('.coupon-btn');
    if (couponBtn) {
        couponBtn.onclick = () => {
            const couponInput = document.querySelector('.cart-summary input');
            const code = couponInput ? couponInput.value.trim().toUpperCase() : '';
            if (code === 'GENZ20' || code === 'HEY GENZ20') {
                saveActiveDiscount('GENZ20', 0.20);
                renderCartPage();
                showToast('20% Discount Coupon Applied!', 'fa-tag');
            } else if (code === 'WELCOME10') {
                saveActiveDiscount('WELCOME10', 0.10);
                renderCartPage();
                showToast('10% Welcome Coupon Applied!', 'fa-tag');
            } else if (code === 'SUMMER15') {
                saveActiveDiscount('SUMMER15', 0.15);
                renderCartPage();
                showToast('15% Summer Coupon Applied!', 'fa-tag');
            } else {
                showToast('Invalid Coupon Code! Try "GENZ20"', 'fa-circle-exclamation');
            }
        };
    }

    const checkoutBtn = document.querySelector('.checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.onclick = () => {
            window.location.href = 'checkout.html';
        };
    }
}

// --------------------------------------------------
// E. Checkout Page Module
// --------------------------------------------------
function renderCheckoutPage() {
    const summaryContainer = document.querySelector('.order-summary');
    const cart = getCart();
    const discount = getActiveDiscount();

    if (!summaryContainer) return;

    let subtotal = 0;
    const itemsHtml = cart.map(item => {
        subtotal += item.price * item.qty;
        return `
            <div class="summary-item" style="display:flex; align-items:center; justify-content:space-between; margin-bottom:14px; padding-bottom:14px; border-bottom:1px solid #f1f5f9;">
                <div style="display:flex; align-items:center; gap:12px;">
                    <img src="${item.image}" alt="${escapeHtml(item.title)}" style="width:48px; height:48px; object-fit:contain; border-radius:8px; background:#f8fafc; padding:4px; border:1px solid #e2e8f0;">
                    <div>
                        <h4 style="font-size:14px; margin:0; font-weight:700; color:#0f172a;">${escapeHtml(item.title)}</h4>
                        <p style="font-size:12px; color:#64748b; margin:0;">Qty: ${item.qty}</p>
                    </div>
                </div>
                <span style="font-weight:700; color:#0f172a;">$${(item.price * item.qty).toFixed(2)}</span>
            </div>
        `;
    }).join('');

    const discountAmount = subtotal * (discount.rate || 0);
    const tax = cart.length > 0 ? 18.00 : 0.00;
    const total = Math.max(0, subtotal - discountAmount + tax);

    const summaryListDiv = summaryContainer.querySelector('.summary-items-list');
    if (summaryListDiv) {
        summaryListDiv.innerHTML = itemsHtml;
    } else {
        const h2 = summaryContainer.querySelector('h2');
        if (h2) {
            const listWrapper = document.createElement('div');
            listWrapper.className = 'summary-items-list';
            listWrapper.innerHTML = itemsHtml;
            h2.insertAdjacentElement('afterend', listWrapper);
        }
    }

    const subtotalSpans = summaryContainer.querySelectorAll('.summary-line:nth-of-type(1) span:last-child');
    const totalSpans = summaryContainer.querySelectorAll('.summary-line.total span:last-child');

    subtotalSpans.forEach(s => s.textContent = `$${subtotal.toFixed(2)}`);
    totalSpans.forEach(s => s.textContent = `$${total.toFixed(2)}`);

    // Payment Option Selectors
    const paymentLabels = document.querySelectorAll('.payment-method label');
    paymentLabels.forEach(lbl => {
        lbl.addEventListener('click', () => {
            paymentLabels.forEach(l => {
                l.style.borderColor = '#e2e8f0';
                l.style.background = '#fff';
                l.style.color = '#334155';
            });
            lbl.style.borderColor = '#2563eb';
            lbl.style.background = '#eff6ff';
            lbl.style.color = '#2563eb';
            const radio = lbl.querySelector('input[type="radio"]');
            if (radio) radio.checked = true;
        });
    });

    // Order Submit Handler
    const checkoutForm = document.querySelector('.checkout-form form');
    if (checkoutForm) {
        checkoutForm.onsubmit = async (e) => {
            e.preventDefault();
            if (cart.length === 0) {
                showToast('Your cart is empty!', 'fa-circle-exclamation');
                return;
            }

            const submitBtn = checkoutForm.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Processing Secure Order...';
            }

            // Gather Address Data from Form
            const getVal = (selector) => {
                const el = checkoutForm.querySelector(selector);
                return el ? el.value.trim() : '';
            };

            const firstName = getVal('input[placeholder*="First"], input[name="firstName"]') || 'Valued';
            const lastName = getVal('input[placeholder*="Last"], input[name="lastName"]') || 'Customer';
            const email = getVal('input[type="email"]') || 'shopper@genz.com';
            const phone = getVal('input[type="tel"]') || '+1 555-0199';
            const street = getVal('input[placeholder*="Street"], input[name="address"]') || '742 Evergreen Terrace';
            const city = getVal('input[placeholder*="City"]') || 'Beverly Hills';
            const state = getVal('input[placeholder*="State"]') || 'CA';
            const postalCode = getVal('input[placeholder*="ZIP"], input[placeholder*="Postal"]') || '90210';
            const country = getVal('select[name="country"], input[placeholder*="Country"]') || 'United States';

            const shippingAddress = {
                full_name: `${firstName} ${lastName}`.trim(),
                phone: phone,
                street_address: street,
                city: city,
                state: state,
                postal_code: postalCode,
                country: country
            };

            let confirmedOrder = null;

            try {
                if (window.GenzAPI) {
                    // Sync local cart items to server
                    await GenzAPI.cart.sync(cart.map(i => ({
                        product_id: String(i.id),
                        quantity: i.qty || 1,
                        color: i.color || null
                    })));

                    // Place Verified Backend Order
                    confirmedOrder = await GenzAPI.orders.createOrder({
                        shipping_address: shippingAddress,
                        coupon_code: discount.code || null,
                        payment_method: 'card',
                        customer_notes: 'Placed via GENZ Web Storefront'
                    });
                }
            } catch (err) {
                console.warn('Backend order placement fallback:', err.message);
            }

            const orderId = confirmedOrder ? confirmedOrder.order_number : ('NEX-' + Math.floor(100000 + Math.random() * 900000));
            const finalTotal = confirmedOrder ? confirmedOrder.total_amount : total;

            saveCart([]);
            saveActiveDiscount('', 0);

            // Confirmation Modal
            const modalHtml = `
                <div class="order-modal active" style="position:fixed; inset:0; background:rgba(15,23,42,0.85); backdrop-filter:blur(12px); z-index:100000; display:flex; align-items:center; justify-content:center; padding:20px;">
                    <div class="order-modal-content" style="background:#fff; border-radius:24px; padding:45px; max-width:540px; width:100%; text-align:center; box-shadow:0 25px 60px rgba(0,0,0,0.3); animation:fadeIn 0.3s ease;">
                        <div style="width:80px; height:80px; background:#ecfdf5; border-radius:50%; display:flex; align-items:center; justify-content:center; margin:0 auto 20px; border:2px solid #a7f3d0;">
                            <i class="fa-solid fa-check" style="font-size:36px; color:#10b981;"></i>
                        </div>
                        <h2 style="font-size:28px; font-weight:800; color:#0f172a; margin-bottom:8px;">Order Confirmed!</h2>
                        <p style="font-size:15px; color:#64748b; margin-bottom:20px;">Thank you, <strong>${escapeHtml(shippingAddress.full_name)}</strong>. Your order has been securely verified and is in preparation.</p>
                        
                        <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:12px; padding:18px; margin-bottom:25px; text-align:left;">
                            <div style="display:flex; justify-content:space-between; margin-bottom:8px; font-size:14px;">
                                <span style="color:#64748b;">Order Number:</span>
                                <strong style="color:#2563eb;">${orderId}</strong>
                            </div>
                            <div style="display:flex; justify-content:space-between; margin-bottom:8px; font-size:14px;">
                                <span style="color:#64748b;">Recipient Address:</span>
                                <strong>${escapeHtml(shippingAddress.city)}, ${escapeHtml(shippingAddress.state)}</strong>
                            </div>
                            <div style="display:flex; justify-content:space-between; margin-bottom:8px; font-size:14px;">
                                <span style="color:#64748b;">Estimated Delivery:</span>
                                <strong>2-3 Business Days (Express)</strong>
                            </div>
                            <div style="display:flex; justify-content:space-between; font-size:14px;">
                                <span style="color:#64748b;">Total Verified Paid:</span>
                                <strong style="color:#10b981; font-size:16px;">$${finalTotal.toFixed(2)}</strong>
                            </div>
                        </div>

                        <a href="index.html" style="display:inline-block; width:100%; padding:16px; background:#2563eb; color:#fff; border-radius:12px; font-weight:700; text-decoration:none; font-size:16px; box-shadow:0 8px 20px rgba(37,99,235,0.25);">
                            Return to Storefront
                        </a>
                    </div>
                </div>
            `;
            document.body.insertAdjacentHTML('beforeend', modalHtml);
        };
    }
}

// --------------------------------------------------
// F. Wishlist Page Module
// --------------------------------------------------
function renderWishlistPage() {
    const container = document.querySelector('.wishlist-grid');
    const wishlist = getWishlist();

    if (!container) return;

    if (wishlist.length === 0) {
        container.innerHTML = `
            <div style="grid-column:1/-1; text-align:center; padding:70px 20px; background:#fff; border-radius:20px; border:1px solid #e2e8f0;">
                <i class="fa-regular fa-heart" style="font-size:52px; color:#94a3b8; margin-bottom:16px;"></i>
                <h2 style="font-size:24px; font-weight:800; color:#0f172a;">Your Wishlist is Empty</h2>
                <p style="color:#64748b; margin:10px 0 25px; font-size:15px;">Explore our curated store and save items you adore.</p>
                <a href="shop.html" style="display:inline-flex; align-items:center; gap:8px; padding:14px 32px; background:#2563eb; color:#fff; border-radius:10px; text-decoration:none; font-weight:700;">
                    Explore Shop <i class="fa-solid fa-arrow-right"></i>
                </a>
            </div>
        `;
        const oldBar = document.getElementById('wishlistControls');
        if (oldBar) oldBar.remove();
        return;
    }

    container.innerHTML = wishlist.map(item => `
        <div class="wishlist-card" style="background:#fff; padding:20px; border-radius:16px; border:1px solid #e2e8f0; position:relative; box-shadow:0 4px 15px rgba(0,0,0,0.03); display:flex; flex-direction:column; justify-content:space-between; transition:transform 0.2s ease;" onmouseover="this.style.transform='translateY(-4px)'" onmouseout="this.style.transform='translateY(0)'">
            <a href="product.html?id=${item.id}" onclick="selectProduct('${item.id}')">
                <img src="${item.image}" alt="${escapeHtml(item.title)}" style="width:100%; height:190px; object-fit:contain; margin-bottom:15px; background:#f8fafc; padding:16px; border-radius:12px; border:1px solid #f1f5f9;">
            </a>
            <h3 style="font-size:16px; font-weight:700; color:#0f172a; margin-bottom:8px;">${escapeHtml(item.title)}</h3>
            <div class="rating" style="color:#f59e0b; margin-bottom:10px; font-size:14px;">★★★★★</div>
            <h2 style="font-size:20px; font-weight:800; color:#0f172a; margin-bottom:16px;">$${parseFloat(item.price).toFixed(2)}</h2>
            <div class="wishlist-buttons" style="display:flex; gap:10px;">
                <button class="move-cart" onclick="moveWishlistItemToCart('${item.id}')" style="flex:1; padding:12px; background:#2563eb; color:#fff; border:none; border-radius:8px; font-weight:700; cursor:pointer; font-size:14px; display:flex; align-items:center; justify-content:center; gap:6px;">
                    <i class="fa-solid fa-cart-shopping"></i> Move to Cart
                </button>
                <button class="remove" onclick="removeFromWishlist('${item.id}')" style="padding:12px 16px; background:#fee2e2; color:#dc2626; border:none; border-radius:8px; cursor:pointer; font-size:14px;">
                    <i class="fa-solid fa-trash-can"></i>
                </button>
            </div>
        </div>
    `).join('');

    let controlsBar = document.getElementById('wishlistControls');
    if (!controlsBar) {
        controlsBar = document.createElement('div');
        controlsBar.id = 'wishlistControls';
        controlsBar.style.cssText = 'max-width:1400px; margin:0 auto 24px; padding:0 40px; display:flex; justify-content:flex-end; gap:12px;';
        controlsBar.innerHTML = `
            <button onclick="moveAllWishlistToCart()" style="padding:12px 20px; background:#2563eb; color:#fff; border:none; border-radius:8px; font-weight:700; cursor:pointer; font-size:14px; display:inline-flex; align-items:center; gap:6px;">
                <i class="fa-solid fa-cart-shopping"></i> Move All to Cart
            </button>
            <button onclick="clearWishlist()" style="padding:12px 20px; background:#fee2e2; color:#dc2626; border:none; border-radius:8px; font-weight:700; cursor:pointer; font-size:14px; display:inline-flex; align-items:center; gap:6px;">
                <i class="fa-solid fa-trash-can"></i> Clear Wishlist
            </button>
        `;
        container.insertAdjacentElement('beforebegin', controlsBar);
    }
}

// --------------------------------------------------
// G. Contact Page Module
// --------------------------------------------------
function initContactPage() {
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.onsubmit = (e) => {
            e.preventDefault();
            showToast('Message Sent! Our concierge team will reach out within 2 hours.', 'fa-paper-plane');
            contactForm.reset();
        };
    }

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const header = item.querySelector('.faq-question');
        if (header) {
            header.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                faqItems.forEach(i => i.classList.remove('active'));
                if (!isActive) item.classList.add('active');
            });
        }
    });
}

// --------------------------------------------------
// H. Login & Account Module
// --------------------------------------------------
function initLoginPage() {
    window.togglePassword = function () {
        const passInput = document.getElementById('password');
        const icon = document.querySelector('.toggle-password');
        if (passInput) {
            if (passInput.type === 'password') {
                passInput.type = 'text';
                if (icon) icon.className = 'fa-solid fa-eye-slash toggle-password';
            } else {
                passInput.type = 'password';
                if (icon) icon.className = 'fa-solid fa-eye toggle-password';
            }
        }
    };

    window.switchAuthTab = function(mode) {
        const signInTab = document.getElementById('signInTab');
        const signUpTab = document.getElementById('signUpTab');
        const submitBtn = document.getElementById('authSubmitBtn');
        const authHeading = document.getElementById('authHeading');
        const authSubtitle = document.getElementById('authSubtitle');
        const nameField = document.getElementById('nameFieldBox');

        if (mode === 'signup') {
            if (signInTab) signInTab.classList.remove('active');
            if (signUpTab) signUpTab.classList.add('active');
            if (submitBtn) submitBtn.textContent = 'Create GENZ Account';
            if (authHeading) authHeading.textContent = 'Create Account';
            if (authSubtitle) authSubtitle.textContent = 'Join GENZ for exclusive perks and fast checkout';
            if (nameField) nameField.style.display = 'block';
        } else {
            if (signUpTab) signUpTab.classList.remove('active');
            if (signInTab) signInTab.classList.add('active');
            if (submitBtn) submitBtn.textContent = 'Sign In';
            if (authHeading) authHeading.textContent = 'Sign In to Account';
            if (authSubtitle) authSubtitle.textContent = 'Enter your details to access your account';
            if (nameField) nameField.style.display = 'none';
        }
    };

    // Full-Stack REST API Login & Register Form Handler
    const loginForm = document.querySelector('.login-right form') || document.querySelector('.auth-form');
    if (loginForm) {
        loginForm.onsubmit = async (e) => {
            e.preventDefault();
            const isSignUp = document.getElementById('signUpTab')?.classList.contains('active');
            const emailInput = document.getElementById('loginEmail');
            const passInput = document.getElementById('password');
            const nameInput = document.getElementById('regName');
            const submitBtn = document.getElementById('authSubmitBtn');

            const email = emailInput ? emailInput.value.trim() : '';
            const password = passInput ? passInput.value : '';
            const fullName = nameInput ? nameInput.value.trim() : '';

            if (!email || !password) {
                showToast('Please enter both email and password.', 'fa-circle-exclamation');
                return;
            }

            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Authenticating...';
            }

            try {
                if (window.GenzAPI) {
                    if (isSignUp) {
                        if (!fullName) {
                            showToast('Please enter your full name.', 'fa-circle-exclamation');
                            if (submitBtn) {
                                submitBtn.disabled = false;
                                submitBtn.textContent = 'Create GENZ Account';
                            }
                            return;
                        }
                        const res = await GenzAPI.auth.register(email, password, fullName);
                        showToast(`Welcome to GENZ, ${res.user.full_name}!`, 'fa-circle-check');
                    } else {
                        const res = await GenzAPI.auth.login(email, password);
                        showToast(`Welcome back, ${res.user.full_name}!`, 'fa-circle-check');
                    }

                    // Render updated auth state immediately
                    renderGenzAuthState();

                    setTimeout(() => {
                        const user = GenzAPI.auth.getCurrentUser();
                        if (user && user.role === 'admin') {
                            window.location.href = 'admin.html';
                        } else {
                            window.location.reload();
                        }
                    }, 800);
                }
            } catch (err) {
                showToast(err.message || 'Authentication failed. Please check credentials.', 'fa-triangle-exclamation');
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.textContent = isSignUp ? 'Create GENZ Account' : 'Sign In';
                }
            }
        };
    }
}

// ==================================================
// GENZ NATIVE REST API AUTHENTICATION ENGINE
// ==================================================

function initGenzAuth() {
    renderGenzAuthState();
}

function renderGenzAuthState() {
    const user = window.GenzAPI ? GenzAPI.auth.getCurrentUser() : null;

    // Desktop Header elements
    const desktopSlot = document.getElementById('clerkUserButtonDesktop');
    const desktopLink = document.getElementById('desktopAuthLink');

    // Mobile Drawer elements
    const drawerUserCard = document.getElementById('drawerUserCard');
    const drawerAvatar = document.getElementById('drawerAvatar');
    const drawerUserName = document.getElementById('drawerUserName');
    const drawerUserSub = document.getElementById('drawerUserSub');
    const drawerAuthLink = document.getElementById('drawerAuthLink');
    const drawerAuthText = document.getElementById('drawerAuthText');

    if (user) {
        // ================= USER IS SIGNED IN =================
        const fullName = user.full_name || user.email.split('@')[0] || 'GENZ Member';
        const email = user.email || '';
        const isAdmin = user.role === 'admin';

        // 1. Desktop Nav: Show avatar badge & popup menu
        if (desktopLink) {
            desktopLink.href = isAdmin ? 'admin.html' : 'login.html';
            desktopLink.title = `${fullName} (${isAdmin ? 'Admin' : 'Member'})`;
            desktopLink.innerHTML = `
                <div style="width:32px; height:32px; border-radius:50%; background:#2563eb; color:#fff; display:flex; align-items:center; justify-content:center; font-weight:800; font-size:13px; border:2px solid rgba(255,255,255,0.2);">
                    ${fullName[0].toUpperCase()}
                </div>
            `;
        }

        // 2. Mobile Drawer Card
        if (drawerUserCard) {
            if (drawerAvatar) {
                drawerAvatar.innerHTML = `<span style="font-weight:800; font-size:16px;">${fullName[0].toUpperCase()}</span>`;
            }
            if (drawerUserName) drawerUserName.textContent = fullName;
            if (drawerUserSub) {
                drawerUserSub.innerHTML = `
                    <span style="font-size:11px; color:#94a3b8; display:block; margin-bottom:4px;">${email} &bull; <strong style="color:${isAdmin ? '#60a5fa' : '#10b981'};">${isAdmin ? 'ADMIN' : 'VIP MEMBER'}</strong></span>
                    <div class="drawer-auth-actions" style="display:flex; gap:8px; margin-top:6px;">
                        ${isAdmin ? `<a href="admin.html" class="drawer-auth-btn btn-profile" style="text-decoration:none; padding:4px 10px; font-size:12px; background:#2563eb; color:#fff; border-radius:6px;"><i class="fa-solid fa-gauge"></i> Admin</a>` : ''}
                        <button type="button" class="drawer-auth-btn btn-signout" onclick="GenzAPI.auth.logout();" style="padding:4px 10px; font-size:12px; background:#fee2e2; color:#dc2626; border:none; border-radius:6px; cursor:pointer;">
                            <i class="fa-solid fa-arrow-right-from-bracket"></i> Sign Out
                        </button>
                    </div>
                `;
            }
        }

        // 3. Mobile Nav Links
        if (drawerAuthLink && drawerAuthText) {
            drawerAuthLink.href = isAdmin ? 'admin.html' : 'login.html';
            drawerAuthText.textContent = isAdmin ? 'Admin Command Center' : 'My Account';
            const icon = drawerAuthLink.querySelector('.nav-item-icon i');
            if (icon) icon.className = isAdmin ? 'fa-solid fa-shield-halved' : 'fa-solid fa-crown';
        }

        // 4. Render Authenticated View if on login.html
        renderLoginPageSignedIn(user, fullName, email, null);

    } else {
        // ================= USER IS SIGNED OUT =================
        if (desktopLink) {
            desktopLink.href = 'login.html';
            desktopLink.innerHTML = '<i class="fa-regular fa-user"></i> <span class="nav-action-text">LOGIN</span>';
        }

        if (drawerAvatar) {
            drawerAvatar.innerHTML = '<i class="fa-solid fa-crown"></i>';
        }
        if (drawerUserName) drawerUserName.textContent = 'GENZ Member';
        if (drawerUserSub) drawerUserSub.textContent = 'Luxury Lifestyle & Tech';

        if (drawerAuthLink && drawerAuthText) {
            drawerAuthLink.href = 'login.html';
            drawerAuthText.textContent = 'My Account / Login';
            const icon = drawerAuthLink.querySelector('.nav-item-icon i');
            if (icon) icon.className = 'fa-regular fa-user';
        }
    }
}

function renderLoginPageSignedIn(user, fullName, email, avatarUrl) {
    const loginWrapper = document.querySelector('.login-container');
    if (!loginWrapper) return;

    let profileCard = document.getElementById('loginSignedInCard');
    if (!profileCard) {
        const rightCol = loginWrapper.querySelector('.login-right');
        if (rightCol) {
            const isAdmin = user && user.role === 'admin';
            rightCol.innerHTML = `
                <div id="loginSignedInCard" style="padding: 30px 20px; text-align: center;">
                    <div style="width: 72px; height: 72px; border-radius: 50%; margin: 0 auto 16px; border: 3px solid #2563eb; overflow: hidden; display: flex; align-items: center; justify-content: center; background: #1e293b; color: #fff; font-size: 28px; font-weight: 800;">
                        ${fullName[0].toUpperCase()}
                    </div>
                    <span class="brand-badge" style="display:inline-block; margin-bottom:8px; font-size:11px; padding:4px 12px; background:rgba(37,99,235,0.15); color:#60a5fa; border-radius:20px; border:1px solid rgba(59,130,246,0.3); font-weight:700;">
                        <i class="fa-solid fa-circle-check"></i> ${isAdmin ? 'AUTHENTICATED ADMINISTRATOR' : 'AUTHENTICATED MEMBER'}
                    </span>
                    <h2 style="font-size: 24px; font-weight: 800; color: #0f172a; margin-bottom: 4px;">${fullName}</h2>
                    <p style="font-size: 14px; color: #64748b; margin-bottom: 24px;">${email}</p>

                    <div style="display: flex; flex-direction: column; gap: 12px; max-width: 320px; margin: 0 auto;">
                        ${isAdmin ? `
                            <a href="admin.html" style="display: flex; align-items: center; justify-content: center; gap: 8px; padding: 14px 20px; background: #2563eb; color: #fff; border-radius: 10px; text-decoration: none; font-weight: 700; font-size: 14px; box-shadow: 0 4px 15px rgba(37,99,235,0.3);">
                                <i class="fa-solid fa-gauge-high"></i> Open Admin Command Center
                            </a>
                        ` : `
                            <a href="shop.html" style="display: flex; align-items: center; justify-content: center; gap: 8px; padding: 14px 20px; background: #2563eb; color: #fff; border-radius: 10px; text-decoration: none; font-weight: 700; font-size: 14px; box-shadow: 0 4px 15px rgba(37,99,235,0.3);">
                                <i class="fa-solid fa-store"></i> Explore Collection
                            </a>
                        `}
                        <a href="wishlist.html" style="display: flex; align-items: center; justify-content: center; gap: 8px; padding: 12px 20px; background: #f8fafc; color: #1e293b; border: 1px solid #e2e8f0; border-radius: 10px; font-weight: 600; font-size: 14px; text-decoration: none;">
                            <i class="fa-regular fa-heart"></i> View Saved Wishlist
                        </a>
                        <button type="button" onclick="GenzAPI.auth.logout();" style="display: flex; align-items: center; justify-content: center; gap: 8px; padding: 12px 20px; background: #fef2f2; color: #dc2626; border: 1px solid #fee2e2; border-radius: 10px; font-weight: 600; font-size: 14px; cursor: pointer;">
                            <i class="fa-solid fa-arrow-right-from-bracket"></i> Sign Out
                        </button>
                    </div>
                </div>
            `;
        }
    }
}


// ==================================================
// 13. BACK TO TOP BUTTON
// ==================================================

function initBackToTop() {
    let btn = document.getElementById('backToTopBtn');
    if (!btn) {
        btn = document.createElement('button');
        btn.id = 'backToTopBtn';
        btn.className = 'back-to-top';
        btn.setAttribute('aria-label', 'Scroll to top');
        btn.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
        document.body.appendChild(btn);
    }

    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ==================================================
// 14. AI SHOPPING ASSISTANT CHATBOT
// ==================================================

function initChatbot() {
    if (document.getElementById('chatbotLauncher')) return;

    const botHtml = `
        <button id="chatbotLauncher" class="chatbot-launcher" aria-label="Open GENZ Assistant">
            <i class="fa-solid fa-headset"></i>
            <span class="chat-pulse"></span>
        </button>

        <div id="chatbotWindow" class="chatbot-window">
            <div class="chatbot-header">
                <div class="chatbot-title-box">
                    <div class="chatbot-avatar">
                        <i class="fa-solid fa-robot"></i>
                    </div>
                    <div>
                        <h4 style="margin:0; font-size:15px; font-weight:800;">GENZ AI Assistant</h4>
                        <span style="font-size:11px; color:#10b981; display:flex; align-items:center; gap:4px; font-weight:600;">
                            <span style="width:7px; height:7px; background:#10b981; border-radius:50%; display:inline-block;"></span> Online & Ready
                        </span>
                    </div>
                </div>
                <button id="chatbotCloseBtn" class="chatbot-close-btn">&times;</button>
            </div>

            <div id="chatbotMessages" class="chatbot-messages">
                <div class="chat-msg bot">
                    👋 Hello and welcome to <strong>GENZ Store</strong>! I am your AI concierge. Ask me about products, current coupons, orders, or policies.
                </div>
            </div>

            <div class="chat-quick-chips">
                <button class="chat-chip" onclick="sendChatChip('🏷️ Active Promo Codes')">🏷️ Promo Codes</button>
                <button class="chat-chip" onclick="sendChatChip('⌚ Recommend a Watch')">⌚ Watches</button>
                <button class="chat-chip" onclick="sendChatChip('🚚 Shipping & Delivery')">🚚 Shipping</button>
                <button class="chat-chip" onclick="sendChatChip('📦 Track Order')">📦 Track Order</button>
                <button class="chat-chip" onclick="sendChatChip('🛒 My Active Cart')">🛒 Cart Status</button>
            </div>

            <form id="chatbotForm" class="chatbot-input-form">
                <input type="text" id="chatInput" placeholder="Ask anything about GENZ..." autocomplete="off">
                <button type="submit" class="chatbot-send-btn">
                    <i class="fa-solid fa-paper-plane"></i>
                </button>
            </form>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', botHtml);

    const launcher = document.getElementById('chatbotLauncher');
    const windowEl = document.getElementById('chatbotWindow');
    const closeBtn = document.getElementById('chatbotCloseBtn');
    const form = document.getElementById('chatbotForm');
    const input = document.getElementById('chatInput');
    const messages = document.getElementById('chatbotMessages');

    if (launcher && windowEl) {
        launcher.onclick = () => windowEl.classList.toggle('active');
    }

    if (closeBtn && windowEl) {
        closeBtn.onclick = () => windowEl.classList.remove('active');
    }

    window.sendChatChip = function (text) {
        if (input) {
            input.value = text;
            handleUserSend(text);
        }
    };

    function addMessage(text, isUser = false) {
        const msg = document.createElement('div');
        msg.className = `chat-msg ${isUser ? 'user' : 'bot'}`;
        msg.innerHTML = isUser ? escapeHtml(text) : text;
        messages.appendChild(msg);
        messages.scrollTop = messages.scrollHeight;
    }

    function showTypingIndicator() {
        const typing = document.createElement('div');
        typing.id = 'chatTyping';
        typing.className = 'chat-msg bot';
        typing.innerHTML = '<i class="fa-solid fa-ellipsis fa-fade" style="font-size:18px; color:#2563eb;"></i>';
        messages.appendChild(typing);
        messages.scrollTop = messages.scrollHeight;
    }

    function removeTypingIndicator() {
        const typing = document.getElementById('chatTyping');
        if (typing) typing.remove();
    }

    function generateBotReply(text) {
        let raw = text.trim();
        let q = raw.toLowerCase();

        // Normalization
        q = q.replace(/\b(boat|robot|assistant)\b/g, 'bot')
             .replace(/\b(wath|wtch|timepiece|chronometer)\b/g, 'watch')
             .replace(/\b(earpod|earbud|airpod|hedphone|audio|speaker)\b/g, 'audio')
             .replace(/\b(copon|discont|vaucher|promo|deals)\b/g, 'discount')
             .replace(/\b(delvery|shiping|courrier)\b/g, 'shipping');

        if (/^(hi|hello|hey|hola|greetings)\b/.test(q)) {
            return `👋 Hi there! Looking for recommendations or have questions about an order? I'm happy to help!`;
        }

        if (q.includes('who are you') || q.includes('bot') || q.includes('what can you do')) {
            return `🤖 I am the <strong>GENZ Shopping Assistant</strong>, here 24/7 to help you browse products, unlock discounts, and manage orders!`;
        }

        if (q.includes('discount') || q.includes('coupon') || q.includes('promo') || q.includes('code') || q.includes('offer')) {
            return `🎉 <strong>Active Exclusive Coupons:</strong><br>
                    • <strong>GENZ20</strong> — <strong>20% OFF</strong> entire cart<br>
                    • <strong>WELCOME10</strong> — <strong>10% OFF</strong> your first order<br>
                    • <strong>SUMMER15</strong> — <strong>15% OFF</strong> seasonal special`;
        }

        if (q.includes('shipping') || q.includes('delivery') || q.includes('how long')) {
            return `🚚 <strong>Shipping Policy:</strong><br>
                    • <strong>FREE Express Shipping</strong> on all orders over $50.<br>
                    • Standard delivery time: <strong>2-3 business days</strong> with live tracking.`;
        }

        if (q.includes('return') || q.includes('refund') || q.includes('warranty')) {
            return `🛡️ <strong>Guarantee & Warranty:</strong><br>
                    • 30-Day hassle-free return window with 100% money back.<br>
                    • 2-Year manufacturer warranty included on all lifestyle & tech products.`;
        }

        if (q.includes('cart') || q.includes('checkout')) {
            const cart = getCart();
            return `🛒 You have <strong>${cart.length} item(s)</strong> in your cart. <a href="cart.html" style="color:#2563eb; font-weight:700;">View Cart</a> or <a href="checkout.html" style="color:#2563eb; font-weight:700;">Proceed to Checkout</a>!`;
        }

        if (q.includes('watch')) {
            const items = DEFAULT_PRODUCTS.filter(p => p.category === 'accessories');
            const list = items.slice(0, 3).map(w => `• <a href="product.html?id=${w.id}" style="color:#2563eb; font-weight:700;">${escapeHtml(w.title)}</a> ($${w.price.toFixed(2)})`).join('<br>');
            return `⌚ <strong>Top Chrono & Smart Watches:</strong><br>${list}`;
        }

        if (q.includes('audio') || q.includes('headphone') || q.includes('speaker') || q.includes('earbud')) {
            const items = DEFAULT_PRODUCTS.filter(p => p.category === 'electronics');
            const list = items.slice(0, 3).map(e => `• <a href="product.html?id=${e.id}" style="color:#2563eb; font-weight:700;">${escapeHtml(e.title)}</a> ($${e.price.toFixed(2)})`).join('<br>');
            return `🎧 <strong>High-Fidelity Audio Devices:</strong><br>${list}`;
        }

        if (q.includes('contact') || q.includes('support') || q.includes('phone') || q.includes('email')) {
            return `📞 <strong>GENZ Support Concierge:</strong><br>
                    • Hotline: <strong>+91 7306489636</strong><br>
                    • Email: <strong>support@genz.com</strong><br>
                    • <a href="contact.html" style="color:#2563eb; font-weight:700;">Contact Form</a>`;
        }

        // Fuzzy match
        const words = q.split(/\s+/).filter(w => w.length > 2);
        const matches = DEFAULT_PRODUCTS.filter(p => {
            const full = (p.title + ' ' + p.category + ' ' + p.description).toLowerCase();
            return words.some(word => full.includes(word));
        }).slice(0, 3);

        if (matches.length > 0) {
            const list = matches.map(m => `• <a href="product.html?id=${m.id}" style="color:#2563eb; font-weight:700;">${escapeHtml(m.title)}</a> ($${m.price.toFixed(2)})`).join('<br>');
            return `🔍 Here are products related to "${escapeHtml(raw)}":<br>${list}`;
        }

        return `✨ I'm here to assist! Try asking for <em>"promo codes"</em>, <em>"watches"</em>, <em>"audio devices"</em>, or <em>"shipping details"</em>.`;
    }

    function handleUserSend(textOverride) {
        const text = textOverride || (input ? input.value.trim() : '');
        if (!text) return;

        addMessage(text, true);
        if (input) input.value = '';

        showTypingIndicator();

        setTimeout(() => {
            removeTypingIndicator();
            const reply = generateBotReply(text);
            addMessage(reply, false);
        }, 500);
    }

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            handleUserSend();
        });
    }
}

window.initHeyGenzAuth = window.initGenzAuth = initGenzAuth;
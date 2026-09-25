import os
import sys

# Ensure backend directory is in sys.path when executed directly
current_dir = os.path.dirname(os.path.abspath(__file__))
backend_dir = os.path.abspath(os.path.join(current_dir, ".."))
if backend_dir not in sys.path:
    sys.path.insert(0, backend_dir)

from sqlalchemy.orm import Session
from app.models.user import User, Address
from app.models.product import Category, Product, Coupon
from app.models.review import Review
from app.core.security import get_password_hash


def seed_database(db: Session):
    # 1. Seed Categories if empty
    if db.query(Category).count() == 0:
        categories_data = [
            {"name": "Accessories", "slug": "accessories", "description": "Luxury watches, jewelry & lifestyle accessories", "image_url": "Images/Watch.png"},
            {"name": "Electronics", "slug": "electronics", "description": "High-fidelity audio, smart devices & wearables", "image_url": "Images/headphone.png"},
            {"name": "Bags", "slug": "bags", "description": "Artisan full-grain leather bags & backpacks", "image_url": "Images/bag.png"},
            {"name": "Footwear", "slug": "footwear", "description": "Ergonomic running shoes & carbon marathon sneakers", "image_url": "Images/shoe.png"},
            {"name": "Fashion", "slug": "fashion", "description": "Tailored apparel, jackets & luxury silk essentials", "image_url": "Images/fashion.png"},
            {"name": "Beauty & Care", "slug": "beauty", "description": "Organic dermatologist-tested serums & skincare", "image_url": "Images/beauty&care.png"},
            {"name": "Home Essentials", "slug": "home", "description": "Minimalist artisanal home decor & smart lamps", "image_url": "Images/home essentials.png"},
        ]
        for cat in categories_data:
            db.add(Category(**cat))
        db.commit()

    # 2. Seed Demo Admin & Customer
    if db.query(User).count() == 0:
        admin_user = User(
            id="admin-user-001",
            email="admin@nexora.com",
            password_hash=get_password_hash("admin123"),
            full_name="NEXORA Administrator",
            role="admin",
            phone="+1 555-0100",
            is_active=True
        )
        customer_user = User(
            id="customer-user-001",
            email="customer@nexora.com",
            password_hash=get_password_hash("customer123"),
            full_name="Alex Morgan",
            role="customer",
            phone="+1 555-0101",
            is_active=True
        )
        db.add(admin_user)
        db.add(customer_user)
        db.commit()

        # Seed sample address
        addr = Address(
            user_id=customer_user.id,
            full_name="Alex Morgan",
            phone="+1 555-0101",
            street_address="742 Evergreen Terrace",
            city="Beverly Hills",
            state="CA",
            postal_code="90210",
            country="United States",
            is_default=True
        )
        db.add(addr)
        db.commit()

    # 3. Seed 21 Products if empty
    if db.query(Product).count() == 0:
        products_data = [
            {
                "id": "1",
                "title": "Premium Classic Chrono Watch",
                "slug": "premium-classic-chrono-watch",
                "price": 129.00,
                "original_price": 179.00,
                "image": "Images/Watch.png",
                "category": "accessories",
                "badge": "NEW",
                "rating": 4.9,
                "reviews": 148,
                "in_stock": True,
                "stock_quantity": 45,
                "description": "Precision automatic movement with scratch-resistant sapphire crystal glass, 50m water resistance, and handcrafted genuine Italian leather strap designed for timeless durability.",
                "specs": ["Movement: Japanese Automatic", "Case: 42mm Surgical Grade 316L Stainless Steel", "Glass: Double-Domed Sapphire Crystal", "Water Resistance: 5 ATM / 50M", "Strap: Genuine Full-Grain Leather"],
                "colors": ["#111827", "#1d4ed8", "#9ca3af"]
            },
            {
                "id": "2",
                "title": "Wireless Pro Active Earbuds",
                "slug": "wireless-pro-active-earbuds",
                "price": 89.00,
                "original_price": 129.00,
                "image": "Images/headphone.png",
                "category": "electronics",
                "badge": "HOT",
                "rating": 4.8,
                "reviews": 210,
                "in_stock": True,
                "stock_quantity": 60,
                "description": "Hybrid active noise cancellation with 36-hour total battery life, high-fidelity custom acoustic drivers, touch sensors, and IPX5 sweatproof ergonomic ear cushions.",
                "specs": ["ANC: Hybrid 38dB Cancellation", "Battery: 8h Earbuds + 28h Wireless Case", "Connectivity: Bluetooth 5.3 Low Latency", "Driver: 11mm Titanium Composite", "Water Rating: IPX5"],
                "colors": ["#111827", "#ffffff", "#2563eb"]
            },
            {
                "id": "3",
                "title": "Artisan Leather Messenger Bag",
                "slug": "artisan-leather-messenger-bag",
                "price": 149.00,
                "original_price": 199.00,
                "image": "Images/bag.png",
                "category": "bags",
                "badge": "BEST",
                "rating": 4.9,
                "reviews": 95,
                "in_stock": True,
                "stock_quantity": 30,
                "description": "Full-grain vegetable-tanned artisan leather messenger bag featuring padded 15-inch laptop compartment, solid brass hardware, and weather-resistant interior lining.",
                "specs": ["Material: 100% Full-Grain Cowhide Leather", "Hardware: Solid Antique Brass", "Capacity: 16L with 15.6\" Laptop Sleeve", "Pockets: 6 Internal + 2 Quick Magnetic Pockets"],
                "colors": ["#78350f", "#111827", "#451a03"]
            },
            {
                "id": "4",
                "title": "Urban Runner Pro Sneakers",
                "slug": "urban-runner-pro-sneakers",
                "price": 119.00,
                "original_price": 159.00,
                "image": "Images/shoe.png",
                "category": "footwear",
                "badge": "SALE",
                "rating": 4.7,
                "reviews": 84,
                "in_stock": True,
                "stock_quantity": 55,
                "description": "Ultra-lightweight responsive cushion running sneakers engineered with breathable circular knit upper, carbon rubber traction outsole, and shock-absorbing midsole.",
                "specs": ["Upper: Seamless Engineered Air-Mesh", "Midsole: Energy-Return Nitrogen Foam", "Weight: 245g (Size 9)", "Sole: Carbon High-Grip Rubber"],
                "colors": ["#2563eb", "#111827", "#dc2626"]
            },
            {
                "id": "5",
                "title": "Polarized Titanium Sunglasses",
                "slug": "polarized-titanium-sunglasses",
                "price": 79.00,
                "original_price": 110.00,
                "image": "Images/glass.png",
                "category": "fashion",
                "badge": "TRENDING",
                "rating": 4.8,
                "reviews": 62,
                "in_stock": True,
                "stock_quantity": 40,
                "description": "UV400 polarized HD lenses framed in ultralight aerospace titanium alloy with anti-reflective coating, spring hinges, and microfiber protective casing.",
                "specs": ["Lens: 100% UV400 Polarized Triacetate", "Frame: Grade 5 Lightweight Titanium", "Weight: Only 18 grams", "Hinges: Custom Flexible Micro-Springs"],
                "colors": ["#111827", "#d97706", "#0284c7"]
            },
            {
                "id": "6",
                "title": "Smart 360 Spatial Speaker",
                "slug": "smart-360-spatial-speaker",
                "price": 159.00,
                "original_price": 219.00,
                "image": "Images/speaker.png",
                "category": "electronics",
                "badge": "NEW",
                "rating": 4.9,
                "reviews": 112,
                "in_stock": True,
                "stock_quantity": 35,
                "description": "360° omnidirectional spatial sound speaker with dual passive radiators, 24-hour continuous playback, built-in beamforming mic, and IPX7 waterproof submersible rating.",
                "specs": ["Output: 45W Peak Stereo Power", "Battery: 24h Playtime with 15W Qi Charging", "Waterproof: IPX7 Submersible", "Connectivity: Wi-Fi, Bluetooth 5.3 & AirPlay 2"],
                "colors": ["#111827", "#16a34a", "#2563eb"]
            },
            {
                "id": "7",
                "title": "Radiance Glow Skincare Routine",
                "slug": "radiance-glow-skincare-routine",
                "price": 65.00,
                "original_price": 90.00,
                "image": "Images/beauty&care.png",
                "category": "beauty",
                "badge": "ORGANIC",
                "rating": 4.9,
                "reviews": 175,
                "in_stock": True,
                "stock_quantity": 70,
                "description": "Dermatologist-tested organic skin revitalization kit formulated with pure multi-molecular hyaluronic acid, stabilized vitamin C, botanical peptides, and cold-pressed jojoba serum.",
                "specs": ["Volume: 3x 50ml Regimen Bottles", "Key Actives: 15% Vitamin C + 2% HA", "Certifications: Cruelty-Free & 100% Vegan", "Skin Type: Suitable for all skin types"],
                "colors": ["#f472b6", "#fbbf24"]
            },
            {
                "id": "8",
                "title": "Minimalist Dimmable Desk Lamp",
                "slug": "minimalist-dimmable-desk-lamp",
                "price": 95.00,
                "original_price": 130.00,
                "image": "Images/home essentials.png",
                "category": "home",
                "badge": "POPULAR",
                "rating": 4.6,
                "reviews": 43,
                "in_stock": True,
                "stock_quantity": 25,
                "description": "Touch-controlled stepless dimmable warm LED architectural table lamp featuring integrated 15W Qi fast wireless phone charging base and anodized brushed aluminum body.",
                "specs": ["Lumens: 800 Lumens (CRI > 95)", "Color Temp: 2700K - 6500K Adjustable", "Wireless Charger: 15W Qi Fast Charge", "Material: Aircraft Anodized Aluminum"],
                "colors": ["#f3f4f6", "#111827", "#d97706"]
            },
            {
                "id": "9",
                "title": "Executive Commuter Backpack",
                "slug": "executive-commuter-backpack",
                "price": 179.00,
                "original_price": 240.00,
                "image": "Images/bag&accessories.png",
                "category": "bags",
                "badge": "PREMIUM",
                "rating": 4.9,
                "reviews": 130,
                "in_stock": True,
                "stock_quantity": 28,
                "description": "Handcrafted top-grain leather executive backpack with concealed anti-theft RFID zipper pocket, breathable airmesh back panel, and dedicated shockproof tablet sleeve.",
                "specs": ["Volume: 22L Capacity", "Compartment: Fits up to 16\" MacBook Pro", "Material: Weather-Resistant Top Grain Leather", "Straps: Ergonomic Padded Memory Foam"],
                "colors": ["#451a03", "#111827"]
            },
            {
                "id": "10",
                "title": "Smart Executive Chrono Hybrid",
                "slug": "smart-executive-chrono-hybrid",
                "price": 199.00,
                "original_price": 269.00,
                "image": "Images/watches.png",
                "category": "accessories",
                "badge": "FEATURED",
                "rating": 5.0,
                "reviews": 310,
                "in_stock": True,
                "stock_quantity": 50,
                "description": "Hybrid executive smartwatch featuring crisp Always-On AMOLED display, optical heart-rate & SpO2 biometric sensors, standalone GPS, and up to 14 days standby battery.",
                "specs": ["Display: 1.43\" AMOLED 466x466 px", "Battery: Up to 14 Days Typical Use", "Sensors: Heart Rate, SpO2, Sleep Stages, GPS", "Waterproof: 50m Water-Resistant (5 ATM)"],
                "colors": ["#111827", "#9ca3af", "#b45309"]
            },
            {
                "id": "11",
                "title": "Touchscreen Smart Home Hub",
                "slug": "touchscreen-smart-home-hub",
                "price": 139.00,
                "original_price": 189.00,
                "image": "Images/electronics.png",
                "category": "electronics",
                "badge": "SMART",
                "rating": 4.7,
                "reviews": 88,
                "in_stock": True,
                "stock_quantity": 30,
                "description": "Central 7-inch smart home touchscreen console unifying smart lights, security cameras, thermostats, and multi-room audio with zero-latency Matter & Zigbee protocols.",
                "specs": ["Screen: 7\" IPS Full HD Touch Display", "Protocols: Matter, Thread, Zigbee 3.0, Wi-Fi 6", "Audio: Dual Full-Range Micro Speakers", "Voice: Far-Field Noise Cancelling Mics"],
                "colors": ["#111827", "#ffffff"]
            },
            {
                "id": "12",
                "title": "Tailored Linen Ensemble Jacket",
                "slug": "tailored-linen-ensemble-jacket",
                "price": 125.00,
                "original_price": 170.00,
                "image": "Images/fashion.png",
                "category": "fashion",
                "badge": "STYLE",
                "rating": 4.8,
                "reviews": 94,
                "in_stock": True,
                "stock_quantity": 35,
                "description": "Tailored organic linen-cotton relaxed blazer designed for effortless modern elegance, superior air circulation, and versatile everyday casual or formal luxury wear.",
                "specs": ["Fabric: 65% Organic Linen / 35% Cotton", "Fit: Tailored Modern Relaxed", "Lining: Breathable Silk Blend", "Care: Machine Wash Gentle or Dry Clean"],
                "colors": ["#1e293b", "#d97706", "#0f766e"]
            },
            {
                "id": "13",
                "title": "Pro ANC Over-Ear Studio Headphones",
                "slug": "pro-anc-over-ear-studio-headphones",
                "price": 219.00,
                "original_price": 299.00,
                "image": "Images/headphone.png",
                "category": "electronics",
                "badge": "HOT",
                "rating": 4.9,
                "reviews": 320,
                "in_stock": True,
                "stock_quantity": 40,
                "description": "Studio-grade hybrid active noise canceling wireless headphones with custom 40mm neodymium drivers, transparency mode, and plush memory foam protein leather cushions.",
                "specs": ["Drivers: 40mm Custom Bio-Cellulose", "Noise Cancellation: -42dB Adaptive Hybrid", "Battery: 45h ANC On / 60h ANC Off", "Codecs: LDAC, AAC, SBC, Hi-Res Audio"],
                "colors": ["#111827", "#6b7280"]
            },
            {
                "id": "14",
                "title": "Handcrafted Ceramic Coffee Set",
                "slug": "handcrafted-ceramic-coffee-set",
                "price": 49.00,
                "original_price": 70.00,
                "image": "Images/home essentials.png",
                "category": "home",
                "badge": "NEW",
                "rating": 4.8,
                "reviews": 57,
                "in_stock": True,
                "stock_quantity": 50,
                "description": "Hand-glazed matte stoneware artisanal coffee mugs engineered for optimal heat retention, non-porous stain resistance, and ergonomic finger loop comfort grip.",
                "specs": ["Set: 4 Handcrafted 350ml Ceramic Mugs", "Material: High-Fire Non-Toxic Stoneware", "Compatibility: Microwave & Dishwasher Safe", "Finish: Matte Satin Scratch-Resistant"],
                "colors": ["#374151", "#065f46", "#991b1b"]
            },
            {
                "id": "15",
                "title": "Velvet Soft Cushion Collection",
                "slug": "velvet-soft-cushion-collection",
                "price": 55.00,
                "original_price": 80.00,
                "image": "Images/home essentials.png",
                "category": "home",
                "badge": "BEST",
                "rating": 4.6,
                "reviews": 38,
                "in_stock": True,
                "stock_quantity": 45,
                "description": "Plush velvet accent decorative pillow covers with concealed invisible zipper closures and hypoallergenic feather alternative down-like fluffy inserts.",
                "specs": ["Includes: 2x 18x18\" Cushions with Inserts", "Material: Premium Dutch Silk Velvet", "Fill: 100% Hypoallergenic Microfiber", "Zipper: Heavy-Duty Hidden YKK Zipper"],
                "colors": ["#1e3a8a", "#831843", "#064e3b"]
            },
            {
                "id": "16",
                "title": "Ultra Carbon Sport Running Shoes",
                "slug": "ultra-carbon-sport-running-shoes",
                "price": 135.00,
                "original_price": 185.00,
                "image": "Images/shoe.png",
                "category": "footwear",
                "badge": "POPULAR",
                "rating": 4.8,
                "reviews": 165,
                "in_stock": True,
                "stock_quantity": 38,
                "description": "High-performance distance marathon running shoes featuring carbon-infused heel propulsion plate and ultra-breathable engineered mesh upper.",
                "specs": ["Plate: Full-Length Curved Carbon Fiber", "Cushioning: Supercritical Dual-Density Foam", "Drop: 8mm Heel-to-Toe", "Weight: 215g (Ultralight)"],
                "colors": ["#0284c7", "#111827", "#e11d48"]
            },
            {
                "id": "17",
                "title": "Moroccan Argan Hair Revive Serum",
                "slug": "moroccan-argan-hair-revive-serum",
                "price": 42.00,
                "original_price": 60.00,
                "image": "Images/beauty&care.png",
                "category": "beauty",
                "badge": "ORGANIC",
                "rating": 4.9,
                "reviews": 204,
                "in_stock": True,
                "stock_quantity": 60,
                "description": "Intense hair restoration serum infused with cold-pressed pure Moroccan argan oil, plant keratin, rosemary essence, and vitamin E for mirror-like silky shine.",
                "specs": ["Volume: 100ml Glass Dropper Bottle", "Formulation: 100% Pure Organic Extracts", "Benefits: Anti-Frizz, Heat Protection up to 230°C", "Scent: Subtle Natural Bergamot & Amber"],
                "colors": ["#fbbf24", "#f472b6"]
            },
            {
                "id": "18",
                "title": "Rose Gold Mother-of-Pearl Watch",
                "slug": "rose-gold-mother-of-pearl-watch",
                "price": 169.00,
                "original_price": 229.00,
                "image": "Images/Watch.png",
                "category": "accessories",
                "badge": "PREMIUM",
                "rating": 4.9,
                "reviews": 82,
                "in_stock": True,
                "stock_quantity": 25,
                "description": "18k rose gold-plated stainless steel watch with authentic natural mother-of-pearl dial face, Swiss quartz movement, and scratch-resistant curved glass.",
                "specs": ["Movement: Swiss Ronda Quartz Caliber", "Plating: 5-Micron 18K Rose Gold PVD", "Dial: Natural Iridescent Mother-of-Pearl", "Strap: Milanese Mesh with Safety Buckle"],
                "colors": ["#f59e0b", "#e5e7eb"]
            },
            {
                "id": "19",
                "title": "Slim RFID Leather Cardholder",
                "slug": "slim-rfid-leather-cardholder",
                "price": 45.00,
                "original_price": 65.00,
                "image": "Images/bag&accessories.png",
                "category": "accessories",
                "badge": "NEW",
                "rating": 4.7,
                "reviews": 119,
                "in_stock": True,
                "stock_quantity": 80,
                "description": "Military-grade RFID-blocking minimalist genuine leather cardholder featuring 6 quick-access card slots, center cash compartment, and thumb pull tab.",
                "specs": ["Material: Top-Grain Nappa Leather", "Shielding: 13.56 MHz RFID / NFC Protection", "Capacity: Holds up to 8 Cards + Cash", "Thickness: Ultra-Slim 6mm Profile"],
                "colors": ["#111827", "#78350f", "#1e3a8a"]
            },
            {
                "id": "20",
                "title": "Mulberry Silk Printed Scarf",
                "slug": "mulberry-silk-printed-scarf",
                "price": 68.00,
                "original_price": 95.00,
                "image": "Images/fashion.png",
                "category": "fashion",
                "badge": "TRENDING",
                "rating": 4.8,
                "reviews": 73,
                "in_stock": True,
                "stock_quantity": 40,
                "description": "100% pure Grade-6A Mulberry silk printed scarf styled with meticulous hand-rolled hems, vibrant permanent color fastness, and ultra-soft delicate drape.",
                "specs": ["Fabric: 100% Pure Mulberry Silk (16 Momme)", "Dimensions: 90cm x 90cm Square", "Edges: Artisan Hand-Rolled and Hand-Stitched", "Print: Botanical Geometric Motif"],
                "colors": ["#ec4899", "#3b82f6", "#10b981"]
            },
            {
                "id": "21",
                "title": "Biometric Titanium Smart Ring",
                "slug": "biometric-titanium-smart-ring",
                "price": 149.00,
                "original_price": 199.00,
                "image": "Images/electronics.png",
                "category": "electronics",
                "badge": "SMART",
                "rating": 4.9,
                "reviews": 140,
                "in_stock": True,
                "stock_quantity": 30,
                "description": "Aerospace-grade titanium biometric smart ring tracking sleep stages, body temperature variations, heart rate variability (HRV), and daily recovery readiness.",
                "specs": ["Material: Medical-Grade Titanium & Resin", "Battery: 7 Days Battery Life with Wireless Charger", "Waterproof: 100M Water Resistance (10 ATM)", "Compatibility: iOS & Android via Nexora Health App"],
                "colors": ["#111827", "#9ca3af", "#f59e0b"]
            }
        ]

        for p_data in products_data:
            product = Product(**p_data)
            db.add(product)
        db.commit()

    # 4. Seed Coupons if empty
    if db.query(Coupon).count() == 0:
        coupons = [
            {"code": "NEXORA20", "discount_rate": 0.20, "min_purchase": 0.0, "max_uses": 5000, "is_active": True},
            {"code": "WELCOME10", "discount_rate": 0.10, "min_purchase": 0.0, "max_uses": 5000, "is_active": True},
            {"code": "SUMMER15", "discount_rate": 0.15, "min_purchase": 30.0, "max_uses": 5000, "is_active": True},
        ]
        for cp in coupons:
            db.add(Coupon(**cp))
        db.commit()

    # 5. Seed Reviews for Product 1
    if db.query(Review).count() == 0:
        sample_reviews = [
            {
                "product_id": "1",
                "user_id": "customer-user-001",
                "user_name": "Marcus Vance",
                "rating": 5,
                "title": "Unrivaled craftmanship and precision",
                "comment": "The sapphire crystal glass and leather strap have exceeded my highest expectations. Truly luxurious finish.",
                "is_verified_purchase": True,
                "status": "approved"
            },
            {
                "product_id": "1",
                "user_id": "customer-user-001",
                "user_name": "Elena Rostova",
                "rating": 5,
                "title": "Stunning everyday timepiece",
                "comment": "Accurate automatic movement with exceptional weight on the wrist. Packaging was top tier!",
                "is_verified_purchase": True,
                "status": "approved"
            },
            {
                "product_id": "2",
                "user_id": "customer-user-001",
                "user_name": "David Sterling",
                "rating": 5,
                "title": "Outstanding active noise cancellation",
                "comment": "Silences city traffic completely. Audio profile is rich and punchy without distortion.",
                "is_verified_purchase": True,
                "status": "approved"
            }
        ]
        for r_data in sample_reviews:
            db.add(Review(**r_data))
        db.commit()

// Global variables
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let filteredProducts = [...products];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
    initializePage();
    setupEventListeners();
});

// Initialize page-specific content
function initializePage() {
    const currentPage = getCurrentPage();
    
    switch(currentPage) {
        case 'home':
            loadFeaturedProducts();
            break;
        case 'products':
            loadAllProducts();
            setupFilters();
            break;
        case 'product-detail':
            loadProductDetail();
            break;
        case 'cart':
            loadCartPage();
            break;
    }
}

// Get current page
function getCurrentPage() {
    const path = window.location.pathname;
    if (path.includes('products.html')) return 'products';
    if (path.includes('product-detail.html')) return 'product-detail';
    if (path.includes('cart.html')) return 'cart';
    return 'home';
}

// Setup event listeners
function setupEventListeners() {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (navMenu && navMenu.classList.contains('active') && 
            !hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
        }
    });
}

// Load featured products for home page
function loadFeaturedProducts() {
    const container = document.getElementById('featured-products');
    if (!container) return;
    
    const featuredProducts = products.filter(product => product.featured);
    container.innerHTML = featuredProducts.map(product => createProductCard(product)).join('');
}

// Load all products for products page
function loadAllProducts() {
    const container = document.getElementById('products-grid');
    if (!container) return;
    
    container.innerHTML = filteredProducts.map(product => createProductCard(product)).join('');
}

// Create product card HTML
function createProductCard(product) {
    return `
        <div class="product-card" onclick="viewProduct(${product.id})">
            <div class="product-image">${product.image}</div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <div class="product-price">$${product.price.toFixed(2)}</div>
                <button class="add-to-cart-btn" onclick="addToCart(event, ${product.id})">
                    Add to Cart
                </button>
            </div>
        </div>
    `;
}

// View product details
function viewProduct(productId) {
    window.location.href = `product-detail.html?id=${productId}`;
}

// Load product detail page
function loadProductDetail() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));
    const product = products.find(p => p.id === productId);
    
    if (!product) {
        window.location.href = 'products.html';
        return;
    }
    
    // Update breadcrumb
    const breadcrumb = document.getElementById('product-name-breadcrumb');
    if (breadcrumb) {
        breadcrumb.textContent = product.name;
    }
    
    // Load product details
    const container = document.getElementById('product-detail');
    if (container) {
        container.innerHTML = createProductDetailHTML(product);
        setupProductDetailEvents(product);
    }
}

// Create product detail HTML
function createProductDetailHTML(product) {
    const specsHTML = Object.entries(product.specs)
        .map(([key, value]) => `
            <div class="spec-item">
                <span><strong>${key}:</strong></span>
                <span>${value}</span>
            </div>
        `).join('');
    
    return `
        <div class="product-detail-image">
            <div class="product-image">${product.image}</div>
        </div>
        <div class="product-detail-info">
            <h1>${product.name}</h1>
            <div class="product-detail-price">$${product.price.toFixed(2)}</div>
            <div class="product-description">
                <p>${product.fullDescription}</p>
            </div>
            <div class="product-specs">
                <h3>Specifications</h3>
                ${specsHTML}
            </div>
            <div class="quantity-selector">
                <label>Quantity:</label>
                <div class="quantity-controls">
                    <button class="quantity-btn" onclick="changeQuantity(-1)">-</button>
                    <input type="number" class="quantity-input" id="quantity" value="1" min="1" max="10">
                    <button class="quantity-btn" onclick="changeQuantity(1)">+</button>
                </div>
            </div>
            <button class="add-to-cart-detail" onclick="addToCartDetail(${product.id})">
                Add to Cart
            </button>
        </div>
    `;
}

// Setup product detail page events
function setupProductDetailEvents(product) {
    const quantityInput = document.getElementById('quantity');
    if (quantityInput) {
        quantityInput.addEventListener('change', function() {
            let value = parseInt(this.value);
            if (value < 1) this.value = 1;
            if (value > 10) this.value = 10;
        });
    }
}

// Change quantity
function changeQuantity(change) {
    const quantityInput = document.getElementById('quantity');
    if (quantityInput) {
        let currentValue = parseInt(quantityInput.value);
        let newValue = currentValue + change;
        if (newValue >= 1 && newValue <= 10) {
            quantityInput.value = newValue;
        }
    }
}

// Add to cart from product detail page
function addToCartDetail(productId) {
    const quantityInput = document.getElementById('quantity');
    const quantity = quantityInput ? parseInt(quantityInput.value) : 1;
    addToCart(null, productId, quantity);
}

// Add to cart function
function addToCart(event, productId, quantity = 1) {
    if (event) {
        event.stopPropagation();
    }
    
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            ...product,
            quantity: quantity
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    showToast(`${product.name} added to cart!`);
}

// Remove from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    loadCartPage();
    showToast('Item removed from cart', 'error');
}

// Update cart item quantity
function updateCartQuantity(productId, quantity) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        if (quantity <= 0) {
            removeFromCart(productId);
        } else {
            item.quantity = quantity;
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
            updateCartSummary();
        }
    }
}

// Update cart count in navigation
function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
    }
}

// Load cart page
function loadCartPage() {
    const container = document.getElementById('cart-items');
    if (!container) return;
    
    if (cart.length === 0) {
        container.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <h3>Your cart is empty</h3>
                <p>Add some products to get started!</p>
                <a href="products.html" class="continue-shopping">Continue Shopping</a>
            </div>
        `;
        updateCartSummary();
        return;
    }
    
    container.innerHTML = cart.map(item => createCartItemHTML(item)).join('');
    updateCartSummary();
}

// Create cart item HTML
function createCartItemHTML(item) {
    return `
        <div class="cart-item">
            <div class="cart-item-image">${item.image}</div>
            <div class="cart-item-info">
                <h3>${item.name}</h3>
                <div class="cart-item-price">$${item.price.toFixed(2)}</div>
            </div>
            <div class="cart-item-controls">
                <div class="quantity-controls">
                    <button class="quantity-btn" onclick="updateCartQuantity(${item.id}, ${item.quantity - 1})">-</button>
                    <input type="number" value="${item.quantity}" min="1" max="10" 
                           onchange="updateCartQuantity(${item.id}, parseInt(this.value))">
                    <button class="quantity-btn" onclick="updateCartQuantity(${item.id}, ${item.quantity + 1})">+</button>
                </div>
            </div>
            <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button>
        </div>
    `;
}

// Update cart summary
function updateCartSummary() {
    const subtotalElement = document.getElementById('cart-subtotal');
    const totalElement = document.getElementById('cart-total');
    
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    if (subtotalElement) {
        subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
    }
    
    if (totalElement) {
        totalElement.textContent = `$${subtotal.toFixed(2)}`;
    }
}

// Setup filters for products page
function setupFilters() {
    const categoryFilter = document.getElementById('category-filter');
    const sortFilter = document.getElementById('sort-filter');
    
    if (categoryFilter) {
        categoryFilter.addEventListener('change', applyFilters);
    }
    
    if (sortFilter) {
        sortFilter.addEventListener('change', applyFilters);
    }
}

// Apply filters
function applyFilters() {
    const categoryFilter = document.getElementById('category-filter');
    const sortFilter = document.getElementById('sort-filter');
    
    const selectedCategory = categoryFilter ? categoryFilter.value : 'all';
    const selectedSort = sortFilter ? sortFilter.value : 'default';
    
    // Filter by category
    if (selectedCategory === 'all') {
        filteredProducts = [...products];
    } else {
        filteredProducts = products.filter(product => product.category === selectedCategory);
    }
    
    // Sort products
    switch (selectedSort) {
        case 'price-low':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case 'name':
            filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
    }
    
    loadAllProducts();
}

// Filter by category from home page
function filterByCategory(category) {
    localStorage.setItem('selectedCategory', category);
    window.location.href = 'products.html';
}

// Check for selected category on products page load
document.addEventListener('DOMContentLoaded', function() {
    if (getCurrentPage() === 'products') {
        const selectedCategory = localStorage.getItem('selectedCategory');
        if (selectedCategory) {
            const categoryFilter = document.getElementById('category-filter');
            if (categoryFilter) {
                categoryFilter.value = selectedCategory;
                applyFilters();
            }
            localStorage.removeItem('selectedCategory');
        }
    }
});

// Checkout function
function checkout() {
    if (cart.length === 0) {
        showToast('Your cart is empty!', 'error');
        return;
    }
    
    // Simulate checkout process
    showToast('Thank you for your order! (This is a demo)', 'success');
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 2000);
}

// Show toast notification
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}
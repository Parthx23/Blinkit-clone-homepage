// Sample product data
const products = [
    { id: 1, name: "Fresh Tomatoes", price: "₹40", category: "vegetables", emoji: "🍅", image: "public/tomato-and-kidney-stone-everyday-life-23.png", description: "Fresh red tomatoes, perfect for cooking and salads." },
    { id: 2, name: "Amul Lassi", price: "₹60", category: "dairy", emoji: "🥛", image: "public/amul-lassi-free-s-11538683806ik1qjkgrdb.png", description: "Fresh full cream lassi, rich in calcium and protein." },
    { id: 3, name: "Potato Chips", price: "₹20", category: "snacks", emoji: "🍟", image: "public/chips.png", description: "Crispy and delicious potato chips, perfect for snacking." },
    { id: 4, name: "Mixed Juice", price: "₹80", category: "beverages", emoji: "🍊", image: "public/juice.png", description: "Fresh mixed juice, packed with vitamins." },
    { id: 5, name: "Maggi Noodles", price: "₹15", category: "instant", emoji: "🍜", image: "public/maggi-115386109038vq2x0qmmm.png", description: "Quick and tasty Maggi noodles, ready in 2 minutes." },
    { id: 6, name: "Green Tea", price: "₹120", category: "tea", emoji: "🍵", image: "public/green-tea-darjeeling-tea-lipton-tea-bag-png-favpng-3pJziHf8UfY1XkzU537Pctcym.jpg", description: "Premium green tea leaves, rich in antioxidants." },
    { id: 7, name: "Fresh Bananas", price: "₹30", category: "vegetables", emoji: "🍌", image: "public/pngtree-fresh-banana-png-file-png-image_14618549.png", description: "Sweet and ripe bananas, great source of potassium." },
    { id: 8, name: "Yogurt", price: "₹25", category: "dairy", emoji: "🥄", image: "public/Yogurt-PNG-HD-Quality.png", description: "Creamy yogurt, perfect for breakfast or snacks." },
    { id: 9, name: "Chocolate Bar", price: "₹35", category: "snacks", emoji: "🍫", image: "public/chocolate.jpg", description: "Rich and creamy chocolate bar for sweet cravings." },
    { id: 10, name: "Apple Juice", price: "₹70", category: "beverages", emoji: "🍎", image: "public/Tropicana® Apple Juice - 10oz..png", description: "Pure apple juice, naturally sweet and refreshing." },
    { id: 11, name: "Frozen Pizza", price: "₹180", category: "instant", emoji: "🍕", image: "public/pizza-margherita-pizza-cheese-frozen-food-png-favpng-yiezgL7Jb4hNQfJkBVLBJqiBZ.jpg", description: "Delicious frozen pizza, ready to bake and enjoy." },
    { id: 12, name: "Coffee Beans", price: "₹250", category: "tea", emoji: "☕", image: "public/nescafe-coffee-beans-1-kg-pack.png", description: "Premium coffee beans for the perfect morning brew." }
];

let currentFilter = 'all';
let filteredProducts = [...products];

// DOM elements
const productGrid = document.getElementById('productGrid');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const categoryCards = document.querySelectorAll('.category-card');
const filterBtns = document.querySelectorAll('.filter-btn');
const modal = document.getElementById('productModal');
const closeModal = document.querySelector('.close');
const sectionTitle = document.getElementById('sectionTitle');

// Initialize the app
function init() {
    renderProducts(products);
    setupEventListeners();
}

// Setup event listeners
function setupEventListeners() {
    // Search functionality
    searchInput.addEventListener('input', handleSearch);
    searchBtn.addEventListener('click', handleSearch);
    
    // Category navigation
    categoryCards.forEach(card => {
        card.addEventListener('click', () => {
            const category = card.dataset.category;
            filterProducts(category);
            updateSectionTitle(category);
        });
    });
    
    // Filter buttons
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.textContent.toLowerCase();
            filterProducts(filter);
            updateSectionTitle(filter);
        });
    });
    
    // Modal functionality
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });
    
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// Render products
function renderProducts(productsToRender) {
    productGrid.innerHTML = '';
    
    if (productsToRender.length === 0) {
        productGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #666; padding: 40px;">No products found</p>';
        return;
    }
    
    productsToRender.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image-container">
                <img src="${product.image}" alt="${product.name}">
                <div class="product-emoji">${product.emoji}</div>
            </div>
            <h3>${product.name}</h3>
            <div class="price">${product.price}</div>
            <button class="add-btn" onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        
        productCard.addEventListener('click', (e) => {
            if (!e.target.classList.contains('add-btn')) {
                showProductDetail(product);
            }
        });
        
        productGrid.appendChild(productCard);
    });
}

// Filter products
function filterProducts(category) {
    currentFilter = category;
    
    if (category === 'all') {
        filteredProducts = [...products];
    } else {
        filteredProducts = products.filter(product => product.category === category);
    }
    
    renderProducts(filteredProducts);
    
    // Clear search input when filtering
    searchInput.value = '';
}

// Handle search
function handleSearch() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    
    if (searchTerm === '') {
        renderProducts(filteredProducts);
        return;
    }
    
    const searchResults = filteredProducts.filter(product =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm)
    );
    
    renderProducts(searchResults);
    updateSectionTitle('search', searchTerm);
}

// Update section title
function updateSectionTitle(type, searchTerm = '') {
    const titles = {
        'all': 'All Products',
        'vegetables': 'Vegetables & Fruits',
        'dairy': 'Dairy & Breakfast',
        'snacks': 'Snacks & Munchies',
        'beverages': 'Cold Drinks & Juices',
        'instant': 'Instant & Frozen Food',
        'tea': 'Tea, Coffee & Health Drink',
        'search': `Search Results for "${searchTerm}"`
    };
    
    sectionTitle.textContent = titles[type] || 'Products';
}

// Show product detail modal
function showProductDetail(product) {
    const productDetail = document.getElementById('productDetail');
    productDetail.innerHTML = `
        <div class="product-image-container-large">
            <img src="${product.image}" alt="${product.name}">
            <div class="product-emoji-large">${product.emoji}</div>
        </div>
        <h2>${product.name}</h2>
        <div class="price">${product.price}</div>
        <div class="description">${product.description}</div>
        <button class="add-to-cart" onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    
    modal.style.display = 'block';
}

// Add to cart functionality
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    alert(`${product.name} added to cart!`);
    
    // Close modal if open
    if (modal.style.display === 'block') {
        modal.style.display = 'none';
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', init);
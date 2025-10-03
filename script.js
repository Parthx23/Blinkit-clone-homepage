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

let filteredProducts = [...products];

const productGrid = document.getElementById('productGrid');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const filterBtns = document.querySelectorAll('.filter-btn');
const sectionTitle = document.getElementById('sectionTitle');

function init() {
    renderProducts(products);
    setupEventListeners();
}

function setupEventListeners() {
    searchInput.addEventListener('input', handleSearch);
    searchBtn.addEventListener('click', handleSearch);
    
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    });
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.textContent.toLowerCase();
            filterProducts(filter);
            updateSectionTitle(filter);
        });
    });
    
    setupSwipeGestures();
}

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
        
        productGrid.appendChild(productCard);
    });
}

function filterProducts(category) {
    if (category === 'all') {
        filteredProducts = [...products];
    } else {
        filteredProducts = products.filter(product => product.category === category);
    }
    
    renderProducts(filteredProducts);
    searchInput.value = '';
}

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

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    
    if (window.innerWidth <= 768) {
        showMobileNotification(`${product.name} added to cart!`);
    } else {
        alert(`${product.name} added to cart!`);
    }
}

function showMobileNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: #0c831f;
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        z-index: 1000;
        font-size: 14px;
        animation: slideUp 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 2000);
}

function setupSwipeGestures() {
    const categoryGrid = document.querySelector('.MultiImage__Grid-sc-o0ozdb-2');
    if (!categoryGrid) return;
    
    let startX = 0;
    let scrollLeft = 0;
    
    categoryGrid.addEventListener('touchstart', (e) => {
        startX = e.touches[0].pageX - categoryGrid.offsetLeft;
        scrollLeft = categoryGrid.scrollLeft;
    });
    
    categoryGrid.addEventListener('touchmove', (e) => {
        if (!startX) return;
        e.preventDefault();
        const x = e.touches[0].pageX - categoryGrid.offsetLeft;
        const walk = (x - startX) * 2;
        categoryGrid.scrollLeft = scrollLeft - walk;
    });
    
    categoryGrid.addEventListener('touchend', () => {
        startX = 0;
    });
}

function toggleMobileMenu() {
    const menu = document.getElementById('mobileMenu');
    menu.classList.toggle('active');
}

document.addEventListener('click', (e) => {
    const menu = document.getElementById('mobileMenu');
    const toggle = document.querySelector('.mobile-menu-toggle');
    
    if (menu && toggle && !menu.contains(e.target) && !toggle.contains(e.target)) {
        menu.classList.remove('active');
    }
});

window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

const style = document.createElement('style');
style.textContent = `
    @keyframes slideUp {
        from {
            transform: translateX(-50%) translateY(100%);
            opacity: 0;
        }
        to {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

document.addEventListener('DOMContentLoaded', init);
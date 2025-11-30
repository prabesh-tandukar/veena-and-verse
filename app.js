// Book Data
const books = [
    {
        id: 1,
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        category: "classic",
        price: 12.99,
        description: "A classic American novel set in the Jazz Age, exploring themes of wealth, love, and the American Dream through the eyes of narrator Nick Carraway.",
        icon: "📚"
    },
    {
        id: 2,
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        category: "classic",
        price: 14.99,
        description: "A gripping tale of racial injustice and childhood innocence in the American South during the 1930s, told through the eyes of young Scout Finch.",
        icon: "🦅"
    },
    {
        id: 3,
        title: "1984",
        author: "George Orwell",
        category: "fiction",
        price: 13.99,
        description: "A dystopian masterpiece depicting a totalitarian future where Big Brother watches everything and individual freedom is crushed under oppressive state control.",
        icon: "👁️"
    },
    {
        id: 4,
        title: "Pride and Prejudice",
        author: "Jane Austen",
        category: "classic",
        price: 11.99,
        description: "A witty romance exploring manners, marriage, and morality in Georgian England, following the spirited Elizabeth Bennet and the proud Mr. Darcy.",
        icon: "💝"
    },
    {
        id: 5,
        title: "The Catcher in the Rye",
        author: "J.D. Salinger",
        category: "fiction",
        price: 13.49,
        description: "A controversial coming-of-age story following teenager Holden Caulfield through New York City as he grapples with alienation and identity.",
        icon: "🎭"
    },
    {
        id: 6,
        title: "Sapiens",
        author: "Yuval Noah Harari",
        category: "non-fiction",
        price: 18.99,
        description: "A brief history of humankind, exploring how Homo sapiens came to dominate the world through cognitive, agricultural, and scientific revolutions.",
        icon: "🌍"
    },
    {
        id: 7,
        title: "Educated",
        author: "Tara Westover",
        category: "non-fiction",
        price: 16.99,
        description: "A powerful memoir about a young woman who grows up in a survivalist family and eventually escapes to learn about the wider world through education.",
        icon: "🎓"
    },
    {
        id: 8,
        title: "The Odyssey",
        author: "Homer",
        category: "classic",
        price: 15.99,
        description: "An ancient Greek epic poem chronicling the hero Odysseus's perilous ten-year journey home after the Trojan War.",
        icon: "⚓"
    },
    {
        id: 9,
        title: "Atomic Habits",
        author: "James Clear",
        category: "non-fiction",
        price: 17.99,
        description: "A practical guide to building good habits and breaking bad ones, revealing how tiny changes can lead to remarkable results.",
        icon: "⚡"
    },
    {
        id: 10,
        title: "The Road Not Taken and Other Poems",
        author: "Robert Frost",
        category: "poetry",
        price: 9.99,
        description: "A collection of beloved poems exploring nature, rural life, and life's choices through accessible and profound verse.",
        icon: "🍂"
    },
    {
        id: 11,
        title: "Leaves of Grass",
        author: "Walt Whitman",
        category: "poetry",
        price: 12.99,
        description: "A groundbreaking collection of poems celebrating democracy, nature, love, and the human spirit in free verse.",
        icon: "🌿"
    },
    {
        id: 12,
        title: "The Hobbit",
        author: "J.R.R. Tolkien",
        category: "fiction",
        price: 14.99,
        description: "A fantasy adventure following Bilbo Baggins on an unexpected journey with dwarves to reclaim their mountain home from a dragon.",
        icon: "🐉"
    },
    {
        id: 13,
        title: "Thinking, Fast and Slow",
        author: "Daniel Kahneman",
        category: "non-fiction",
        price: 19.99,
        description: "A Nobel Prize winner's exploration of the two systems that drive human thinking: one fast and intuitive, the other slow and deliberate.",
        icon: "🧠"
    },
    {
        id: 14,
        title: "The Sun and Her Flowers",
        author: "Rupi Kaur",
        category: "poetry",
        price: 13.99,
        description: "A collection of poetry divided into five chapters, exploring themes of growth, healing, ancestry, and honoring one's roots.",
        icon: "🌻"
    },
    {
        id: 15,
        title: "Brave New World",
        author: "Aldous Huxley",
        category: "fiction",
        price: 13.99,
        description: "A dystopian novel depicting a futuristic society where humans are genetically modified and conditioned for predetermined roles.",
        icon: "🔬"
    },
    {
        id: 16,
        title: "The Alchemist",
        author: "Paulo Coelho",
        category: "fiction",
        price: 14.49,
        description: "A philosophical tale about a young shepherd's journey to Egypt in search of treasure, discovering his personal legend along the way.",
        icon: "✨"
    },
    {
        id: 17,
        title: "Becoming",
        author: "Michelle Obama",
        category: "non-fiction",
        price: 19.99,
        description: "An intimate memoir by the former First Lady of the United States, sharing her journey from Chicago's South Side to the White House.",
        icon: "👑"
    },
    {
        id: 18,
        title: "The Waste Land",
        author: "T.S. Eliot",
        category: "poetry",
        price: 10.99,
        description: "A modernist masterpiece exploring post-WWI disillusionment through fragmented imagery and multiple voices.",
        icon: "🏛️"
    }
];

// Shopping Cart
let cart = [];

// DOM Elements
const booksGrid = document.getElementById('booksGrid');
const cartIcon = document.getElementById('cartIcon');
const cartCount = document.getElementById('cartCount');
const cartModal = document.getElementById('cartModal');
const bookModal = document.getElementById('bookModal');
const closeCart = document.getElementById('closeCart');
const closeBook = document.getElementById('closeBook');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const navLinks = document.querySelectorAll('.nav-link');

// Initialize the app
function init() {
    renderBooks(books);
    updateCartCount();
    attachEventListeners();
    loadCartFromStorage();
}

// Render books to the grid
function renderBooks(booksToRender) {
    booksGrid.innerHTML = '';

    if (booksToRender.length === 0) {
        booksGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #999; padding: 2rem;">No books found matching your search.</p>';
        return;
    }

    booksToRender.forEach(book => {
        const bookCard = createBookCard(book);
        booksGrid.appendChild(bookCard);
    });
}

// Create a book card element
function createBookCard(book) {
    const card = document.createElement('div');
    card.className = 'book-card';
    card.innerHTML = `
        <div class="book-cover">${book.icon}</div>
        <h3 class="book-title">${book.title}</h3>
        <p class="book-author">by ${book.author}</p>
        <span class="book-category">${book.category}</span>
        <p class="book-description">${book.description.substring(0, 100)}...</p>
        <div class="book-footer">
            <span class="book-price">$${book.price.toFixed(2)}</span>
            <button class="add-to-cart-btn" data-id="${book.id}">Add to Cart</button>
        </div>
    `;

    // View book details on card click (except button)
    card.addEventListener('click', (e) => {
        if (!e.target.classList.contains('add-to-cart-btn')) {
            showBookDetails(book);
        }
    });

    // Add to cart button
    const addBtn = card.querySelector('.add-to-cart-btn');
    addBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        addToCart(book.id);
    });

    return card;
}

// Show book details modal
function showBookDetails(book) {
    const detailContent = document.getElementById('bookDetailContent');
    detailContent.innerHTML = `
        <div class="book-detail-header">
            <div class="book-detail-cover">${book.icon}</div>
            <div class="book-detail-info">
                <h2>${book.title}</h2>
                <h3>by ${book.author}</h3>
                <span class="book-category">${book.category}</span>
                <div class="book-detail-price">$${book.price.toFixed(2)}</div>
                <button class="add-to-cart-btn" data-id="${book.id}">Add to Cart</button>
            </div>
        </div>
        <div class="book-detail-description">
            <h3>About this book</h3>
            <p>${book.description}</p>
        </div>
    `;

    // Add to cart from detail modal
    const addBtn = detailContent.querySelector('.add-to-cart-btn');
    addBtn.addEventListener('click', () => {
        addToCart(book.id);
    });

    bookModal.classList.add('active');
}

// Add book to cart
function addToCart(bookId) {
    const book = books.find(b => b.id === bookId);
    if (book) {
        const existingItem = cart.find(item => item.id === bookId);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ ...book, quantity: 1 });
        }
        updateCartCount();
        saveCartToStorage();
        showNotification(`"${book.title}" added to cart!`);
    }
}

// Remove book from cart
function removeFromCart(bookId) {
    cart = cart.filter(item => item.id !== bookId);
    updateCartCount();
    renderCart();
    saveCartToStorage();
}

// Update cart count badge
function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
}

// Render cart items
function renderCart() {
    if (cart.length === 0) {
        cartItems.innerHTML = '<div class="empty-cart">Your cart is empty</div>';
        cartTotal.textContent = '$0.00';
        return;
    }

    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-info">
                <div class="cart-item-title">${item.title}</div>
                <div class="cart-item-author">${item.author}</div>
                <div>Quantity: ${item.quantity}</div>
            </div>
            <span class="cart-item-price">$${itemTotal.toFixed(2)}</span>
            <button class="remove-btn" data-id="${item.id}">Remove</button>
        `;

        const removeBtn = cartItem.querySelector('.remove-btn');
        removeBtn.addEventListener('click', () => {
            removeFromCart(item.id);
        });

        cartItems.appendChild(cartItem);
    });

    cartTotal.textContent = `$${total.toFixed(2)}`;
}

// Filter books by category
function filterByCategory(category) {
    if (category === 'all') {
        renderBooks(books);
    } else {
        const filtered = books.filter(book => book.category === category);
        renderBooks(filtered);
    }
}

// Search books
function searchBooks(query) {
    const searchTerm = query.toLowerCase().trim();
    if (searchTerm === '') {
        renderBooks(books);
        return;
    }

    const filtered = books.filter(book =>
        book.title.toLowerCase().includes(searchTerm) ||
        book.author.toLowerCase().includes(searchTerm) ||
        book.category.toLowerCase().includes(searchTerm) ||
        book.description.toLowerCase().includes(searchTerm)
    );

    renderBooks(filtered);
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background-color: #27ae60;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 5px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        z-index: 2000;
        animation: slideIn 0.3s ease-out;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 2000);
}

// Save cart to localStorage
function saveCartToStorage() {
    localStorage.setItem('veenaVerseCart', JSON.stringify(cart));
}

// Load cart from localStorage
function loadCartFromStorage() {
    const savedCart = localStorage.getItem('veenaVerseCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartCount();
    }
}

// Attach event listeners
function attachEventListeners() {
    // Cart icon click
    cartIcon.addEventListener('click', () => {
        renderCart();
        cartModal.classList.add('active');
    });

    // Close modals
    closeCart.addEventListener('click', () => {
        cartModal.classList.remove('active');
    });

    closeBook.addEventListener('click', () => {
        bookModal.classList.remove('active');
    });

    // Close modal on background click
    cartModal.addEventListener('click', (e) => {
        if (e.target === cartModal) {
            cartModal.classList.remove('active');
        }
    });

    bookModal.addEventListener('click', (e) => {
        if (e.target === bookModal) {
            bookModal.classList.remove('active');
        }
    });

    // Search functionality
    searchBtn.addEventListener('click', () => {
        searchBooks(searchInput.value);
    });

    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchBooks(searchInput.value);
        }
    });

    // Category filtering
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            // Update active state
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            // Filter books
            const category = link.getAttribute('data-category');
            filterByCategory(category);

            // Clear search
            searchInput.value = '';
        });
    });

    // Checkout button
    document.querySelector('.checkout-btn').addEventListener('click', () => {
        if (cart.length > 0) {
            alert('Thank you for your order! This is a demo, so no actual purchase will be made.');
            cart = [];
            updateCartCount();
            renderCart();
            saveCartToStorage();
        }
    });
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', init);

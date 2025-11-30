# Veena & Verse Bookshop

A modern, interactive online bookshop application built with vanilla HTML, CSS, and JavaScript.

## Features

- **Book Catalog**: Browse through a curated collection of 18 books across multiple categories
- **Category Filtering**: Filter books by Fiction, Non-Fiction, Poetry, and Classics
- **Search Functionality**: Search books by title, author, category, or description
- **Shopping Cart**: Add books to cart with persistent storage using localStorage
- **Book Details**: Click on any book to view detailed information
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Modern UI**: Clean, professional interface with smooth animations

## Book Categories

- **Fiction**: Contemporary and classic novels
- **Non-Fiction**: Memoirs, self-help, and educational books
- **Poetry**: Classic and modern poetry collections
- **Classics**: Timeless literary masterpieces

## Getting Started

### Option 1: Open Directly
Simply open `index.html` in your web browser.

### Option 2: Using a Local Server
1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

3. Open your browser and navigate to `http://localhost:8080`

## How to Use

1. **Browse Books**: Scroll through the featured books on the homepage
2. **Filter by Category**: Click on category links in the navigation bar
3. **Search**: Use the search bar to find specific books, authors, or topics
4. **View Details**: Click on any book card to see full details
5. **Add to Cart**: Click the "Add to Cart" button on any book
6. **View Cart**: Click the cart icon in the top right corner
7. **Checkout**: Review your cart and proceed to checkout

## Technologies Used

- HTML5
- CSS3 (with CSS Grid and Flexbox)
- Vanilla JavaScript (ES6+)
- LocalStorage API for cart persistence

## Project Structure

```
veena-and-verse/
├── index.html          # Main HTML file
├── styles.css          # All styling
├── app.js              # JavaScript functionality
├── package.json        # Project configuration
└── README.md           # This file
```

## Features in Detail

### Shopping Cart
- Persistent cart using localStorage
- Add/remove items
- Quantity tracking
- Real-time total calculation
- Cart badge showing item count

### Book Management
- 18 pre-loaded books with detailed information
- Book cover icons for visual appeal
- Price display and management
- Category-based organization

### User Experience
- Smooth modal transitions
- Toast notifications for cart actions
- Hover effects and animations
- Mobile-responsive layout
- Intuitive navigation

## Future Enhancements

Potential features for future versions:
- User authentication
- Wishlist functionality
- Book reviews and ratings
- Advanced filtering (price range, author, etc.)
- Sorting options (price, title, author)
- Payment integration
- Order history
- Book recommendations

## Browser Support

This application works on all modern browsers including:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT License - Feel free to use this project for learning or personal use.

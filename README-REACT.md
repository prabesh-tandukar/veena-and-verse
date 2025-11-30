# Veena & Verse - Online Bookshop 📚

A modern, full-featured online bookshop application built with React and Supabase. Perfect for small bookshops to showcase their catalog and receive customer orders via WhatsApp.

![Tech Stack](https://img.shields.io/badge/React-18.3-blue)
![Supabase](https://img.shields.io/badge/Supabase-Backend-green)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-Styling-purple)
![License](https://img.shields.io/badge/License-MIT-yellow)

---

## ✨ Features

### Customer Features
- 📖 **Book Catalog** - Browse books in a beautiful grid layout
- 🔍 **Search & Filter** - Find books by title, author, genre, or ISBN
- 📊 **Sort Options** - Sort by title, author, price, or newest
- 📱 **WhatsApp Integration** - Order books directly via WhatsApp
- 📝 **Book Requests** - Request books not in the catalog
- 📖 **Book Details** - View complete book information with cover art
- 💰 **Pricing** - Clear display of book prices in Nepali Rupees
- 📦 **Stock Status** - See availability (In Stock, Out of Stock, Coming Soon)

### Admin Features
- 🔐 **Secure Authentication** - Admin-only access with Supabase Auth
- 📊 **Dashboard** - Overview of books, stock, and requests
- ➕ **Book Management** - Add, edit, and delete books
- 🖼️ **Image Upload** - Upload and manage book cover images
- 📬 **Request Management** - View and manage customer requests
- 📈 **Statistics** - Track total books, stock status, pending requests

---

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Fast build tool and dev server
- **React Router** - Client-side routing
- **TanStack Query (React Query)** - Data fetching and caching
- **TailwindCSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icons

### Backend
- **Supabase** - Backend-as-a-Service
  - PostgreSQL database
  - Authentication
  - Storage (for book covers)
  - Row Level Security (RLS)

### Deployment
- **Vercel** - Free hosting with automatic deployments
- **GitHub** - Version control

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- Supabase account
- Git installed

### 1. Clone & Install

```bash
# Clone repository
git clone https://github.com/YOUR_USERNAME/veena-and-verse.git
cd veena-and-verse

# Install dependencies
npm install
```

### 2. Setup Supabase

Follow the detailed guide in [SUPABASE_SETUP.md](SUPABASE_SETUP.md)

**Quick Summary:**
1. Create Supabase project
2. Run SQL queries to create tables
3. Set up storage bucket for book covers
4. Create admin user
5. Get API keys

### 3. Configure Environment

Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
VITE_WHATSAPP_NUMBER=977XXXXXXXXXX
```

### 4. Run Development Server

```bash
npm run dev
```

Open http://localhost:5173 in your browser.

### 5. Build for Production

```bash
npm run build
npm run preview  # Preview production build locally
```

---

## 📁 Project Structure

```
veena-and-verse/
├── src/
│   ├── components/          # Reusable components
│   │   ├── BookCard.jsx     # Individual book card
│   │   ├── SearchBar.jsx    # Search input
│   │   ├── FilterPanel.jsx  # Filters and sorting
│   │   ├── Navbar.jsx       # Navigation bar
│   │   └── ProtectedRoute.jsx # Auth guard
│   │
│   ├── pages/               # Page components
│   │   ├── Home.jsx         # Main catalog page
│   │   ├── BookDetailPage.jsx  # Book details
│   │   ├── RequestBook.jsx  # Request form
│   │   └── Admin/           # Admin pages
│   │       ├── Login.jsx
│   │       ├── Dashboard.jsx
│   │       ├── ManageBooks.jsx
│   │       └── ManageRequests.jsx
│   │
│   ├── lib/
│   │   └── supabase.js      # Supabase client
│   │
│   ├── App.jsx              # Main app component
│   ├── main.jsx             # Entry point
│   └── index.css            # Global styles
│
├── public/                  # Static assets
├── index-react.html         # HTML template
├── vite.config.js           # Vite configuration
├── tailwind.config.js       # Tailwind configuration
├── .env                     # Environment variables (not in git)
├── .env.example             # Environment template
├── SUPABASE_SETUP.md        # Supabase setup guide
├── DEPLOYMENT.md            # Deployment guide
└── README-REACT.md          # This file
```

---

## 🗄️ Database Schema

### Books Table
```sql
- id (UUID, Primary Key)
- title (TEXT, NOT NULL)
- author (TEXT, NOT NULL)
- genre (TEXT, NOT NULL)
- description (TEXT)
- price (DECIMAL)
- isbn (TEXT)
- cover_image_url (TEXT)
- stock_status (TEXT) -- in_stock, out_of_stock, coming_soon
- quantity (INTEGER)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

### Book Requests Table
```sql
- id (UUID, Primary Key)
- book_title (TEXT, NOT NULL)
- author (TEXT)
- customer_name (TEXT, NOT NULL)
- customer_email (TEXT)
- customer_phone (TEXT, NOT NULL)
- additional_notes (TEXT)
- status (TEXT) -- pending, fulfilled, cancelled
- created_at (TIMESTAMP)
```

---

## 🎨 Key Features Explained

### WhatsApp Integration

When customers click "Order via WhatsApp", it opens WhatsApp with a pre-filled message:

```
Hi! I'm interested in ordering:

Title: [Book Title]
Author: [Author Name]
Price: Rs. [Price]

Please let me know the availability and payment options.
```

Configure your WhatsApp number in `.env`:
```
VITE_WHATSAPP_NUMBER=977XXXXXXXXXX
```

### Search & Filter

- **Search**: Matches title, author, genre, ISBN, and description
- **Filter**: By genre (dynamically generated from available books)
- **Sort**: By title, author, price (asc/desc), or newest first

### Image Upload

Admin can upload book cover images:
- Stored in Supabase Storage
- Automatic CDN delivery
- Public access for customer viewing
- Authenticated upload for security

### Row Level Security (RLS)

- **Books**: Anyone can read, only admins can write
- **Requests**: Anyone can submit, only admins can view
- **Storage**: Public read, authenticated write

---

## 📱 Usage Guide

### For Customers

1. **Browse Books**: Visit homepage to see all books
2. **Search**: Use search bar to find specific books
3. **Filter**: Click genre filters or use sort dropdown
4. **View Details**: Click any book card to see full details
5. **Order**: Click "Order via WhatsApp" button
6. **Request**: Can't find a book? Use the "Request Book" form

### For Admin

1. **Login**: Go to `/admin/login` and sign in
2. **Dashboard**: View statistics and recent requests
3. **Add Books**:
   - Click "Manage Books"
   - Click "Add New Book"
   - Fill in details and upload cover
   - Click "Add Book"
4. **Edit Books**: Click edit icon in book list
5. **Manage Requests**:
   - View all customer requests
   - Filter by status (pending/fulfilled/cancelled)
   - Change status or delete requests
   - Contact customers via phone/email

---

## 🚢 Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for complete deployment guide.

**Quick Deploy to Vercel:**

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Follow prompts and add environment variables
```

Or deploy via Vercel Dashboard (easier):
1. Push code to GitHub
2. Import repository in Vercel
3. Add environment variables
4. Deploy!

**Cost: $0/month** (using free tiers)

---

## 🔧 Development

### Available Scripts

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

### Adding New Features

1. **Create new component** in `src/components/`
2. **Create new page** in `src/pages/`
3. **Add route** in `src/App.jsx`
4. **Update database** via Supabase SQL Editor (if needed)

### Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_SUPABASE_URL` | Supabase project URL | `https://xxx.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | Supabase anon/public key | `eyJ...` |
| `VITE_WHATSAPP_NUMBER` | WhatsApp business number | `977XXXXXXXXXX` |

---

## 🐛 Troubleshooting

### Books not loading
- Check Supabase connection
- Verify RLS policies are set
- Check browser console for errors

### Admin can't login
- Verify user exists in Supabase Authentication
- Check credentials
- Ensure Supabase URL and key are correct

### Images not uploading
- Verify storage bucket `book-covers` exists
- Check storage policies
- Ensure bucket is public

### WhatsApp button not working
- Check `VITE_WHATSAPP_NUMBER` format
- Must be: country code + number (no spaces, no +)
- Example: `9779812345678`

---

## 📈 Future Enhancements

- [ ] Customer reviews and ratings
- [ ] Wishlist functionality
- [ ] Email notifications for new books
- [ ] Advanced analytics dashboard
- [ ] Discount codes and promotions
- [ ] Multi-language support
- [ ] Mobile app (React Native)
- [ ] Payment gateway integration
- [ ] Inventory management
- [ ] Order tracking

---

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

MIT License - feel free to use this project for your bookshop!

---

## 💬 Support

Need help?

1. Read [SUPABASE_SETUP.md](SUPABASE_SETUP.md) for backend setup
2. Read [DEPLOYMENT.md](DEPLOYMENT.md) for deployment help
3. Check browser console and Vercel logs for errors
4. Review Supabase dashboard for database issues

---

## 🎉 Acknowledgments

- Built with React and Supabase
- Styled with TailwindCSS
- Icons by Lucide
- Deployed on Vercel

---

## 📞 Contact

For questions or support, create an issue on GitHub.

---

**Made with ❤️ for Veena & Verse Bookshop**

# Supabase Setup Guide for Veena & Verse

## Step 1: Create Database Tables

Go to your Supabase project → SQL Editor → New Query, and run these queries:

### 1. Create Books Table

```sql
-- Books table
CREATE TABLE books (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  author TEXT NOT NULL,
  genre TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10, 2),
  isbn TEXT UNIQUE,
  cover_image_url TEXT,
  stock_status TEXT DEFAULT 'in_stock', -- in_stock, out_of_stock, coming_soon
  quantity INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_books_genre ON books(genre);
CREATE INDEX idx_books_author ON books(author);
CREATE INDEX idx_books_title ON books(title);
CREATE INDEX idx_books_stock_status ON books(stock_status);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_books_updated_at BEFORE UPDATE ON books
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

### 2. Create Book Requests Table

```sql
-- Book requests table
CREATE TABLE book_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  book_title TEXT NOT NULL,
  author TEXT,
  customer_name TEXT NOT NULL,
  customer_email TEXT,
  customer_phone TEXT NOT NULL,
  additional_notes TEXT,
  status TEXT DEFAULT 'pending', -- pending, fulfilled, cancelled
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_book_requests_status ON book_requests(status);
CREATE INDEX idx_book_requests_created_at ON book_requests(created_at DESC);
```

### 3. Set Up Row Level Security (RLS)

```sql
-- Enable RLS
ALTER TABLE books ENABLE ROW LEVEL SECURITY;
ALTER TABLE book_requests ENABLE ROW LEVEL SECURITY;

-- Books policies - anyone can read, only authenticated users (admin) can modify
CREATE POLICY "Books are viewable by everyone"
ON books FOR SELECT
USING (true);

CREATE POLICY "Only authenticated users can insert books"
ON books FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Only authenticated users can update books"
ON books FOR UPDATE
TO authenticated
USING (true);

CREATE POLICY "Only authenticated users can delete books"
ON books FOR DELETE
TO authenticated
USING (true);

-- Book requests policies - anyone can submit, only authenticated can view/manage
CREATE POLICY "Anyone can submit book requests"
ON book_requests FOR INSERT
WITH CHECK (true);

CREATE POLICY "Only authenticated users can view requests"
ON book_requests FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Only authenticated users can update requests"
ON book_requests FOR UPDATE
TO authenticated
USING (true);

CREATE POLICY "Only authenticated users can delete requests"
ON book_requests FOR DELETE
TO authenticated
USING (true);
```

## Step 2: Set Up Storage for Book Covers

1. Go to **Storage** in your Supabase dashboard
2. Click **New Bucket**
3. Name it: `book-covers`
4. Make it **Public** (so images can be viewed without authentication)
5. Click **Create Bucket**

### Set Storage Policies

Go to the `book-covers` bucket → Policies → New Policy:

**Policy for public read:**
```sql
CREATE POLICY "Public can view book covers"
ON storage.objects FOR SELECT
USING (bucket_id = 'book-covers');
```

**Policy for authenticated upload:**
```sql
CREATE POLICY "Authenticated users can upload book covers"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'book-covers');
```

**Policy for authenticated update:**
```sql
CREATE POLICY "Authenticated users can update book covers"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'book-covers');
```

**Policy for authenticated delete:**
```sql
CREATE POLICY "Authenticated users can delete book covers"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'book-covers');
```

## Step 3: Create Admin User

1. Go to **Authentication** → **Users**
2. Click **Add User** → **Create new user**
3. Enter email and password for admin
4. Click **Create User**

**Save these credentials** - you'll use them to log into the admin panel!

## Step 4: Get API Keys

1. Go to **Settings** → **API**
2. Copy these values:
   - **Project URL** (looks like: https://xxxxx.supabase.co)
   - **anon/public key** (long string starting with eyJ...)

## Step 5: Configure Environment Variables

Create a file `.env` in the project root:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
VITE_WHATSAPP_NUMBER=977XXXXXXXXXX
```

Replace:
- `your-project.supabase.co` with your Project URL
- `your_anon_key_here` with your anon key
- `977XXXXXXXXXX` with your WhatsApp number (country code + number, no spaces or +)

## Step 6: (Optional) Add Sample Books

Run this query to add some sample books for testing:

```sql
INSERT INTO books (title, author, genre, description, price, isbn, stock_status, quantity) VALUES
('The Great Gatsby', 'F. Scott Fitzgerald', 'Classic Fiction', 'A classic American novel set in the Jazz Age, exploring themes of wealth, love, and the American Dream.', 450.00, '978-0-7432-7356-5', 'in_stock', 5),
('To Kill a Mockingbird', 'Harper Lee', 'Classic Fiction', 'A gripping tale of racial injustice and childhood innocence in the American South.', 500.00, '978-0-06-112008-4', 'in_stock', 3),
('1984', 'George Orwell', 'Science Fiction', 'A dystopian masterpiece depicting a totalitarian future.', 400.00, '978-0-452-28423-4', 'in_stock', 7),
('Pride and Prejudice', 'Jane Austen', 'Romance', 'A witty romance exploring manners, marriage, and morality in Georgian England.', 350.00, '978-0-14-143951-8', 'in_stock', 4),
('Sapiens', 'Yuval Noah Harari', 'Non-Fiction', 'A brief history of humankind, exploring how Homo sapiens came to dominate the world.', 750.00, '978-0-06-231609-7', 'in_stock', 6),
('Educated', 'Tara Westover', 'Biography', 'A powerful memoir about a young woman who escapes her survivalist family through education.', 650.00, '978-0-399-59050-4', 'in_stock', 2),
('The Alchemist', 'Paulo Coelho', 'Fiction', 'A philosophical tale about following your dreams and finding your personal legend.', 450.00, '978-0-06-112241-5', 'in_stock', 8),
('Atomic Habits', 'James Clear', 'Self-Help', 'A practical guide to building good habits and breaking bad ones.', 700.00, '978-0-7352-1129-2', 'in_stock', 10);
```

## ✅ Setup Complete!

Your Supabase backend is now ready! You can now:
1. Run the React app: `npm run dev`
2. Log in to admin panel with the credentials you created
3. Start adding/managing books
4. Customers can browse and request books

## Troubleshooting

**Problem: Can't log in as admin**
- Check that you created the user in Supabase Authentication
- Verify email and password are correct

**Problem: Books not showing**
- Check RLS policies are created
- Verify sample data was inserted

**Problem: Can't upload images**
- Check storage bucket is created and public
- Verify storage policies are set

**Problem: Environment variables not working**
- Restart the dev server after creating .env file
- Check file is named exactly `.env` (not .env.txt)

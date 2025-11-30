# 🚀 Quick Start Guide - Veena & Verse

Get your bookshop online in **30 minutes**!

---

## ⚡ Super Quick Setup

### 1. Install Dependencies (2 minutes)

```bash
# Make sure you have Node.js installed
# Check with: node --version (should be 18+)

# Rename package-react.json to package.json
# Then install
npm install
```

### 2. Setup Supabase (10 minutes)

1. **Go to [supabase.com](https://supabase.com)** and create account
2. **Click "New Project"**:
   - Name: `veena-verse`
   - Database Password: (create a strong password, save it!)
   - Region: Choose closest to Nepal (Singapore or Mumbai)
3. **Wait 2 minutes** for project to initialize
4. **Run SQL queries**:
   - Click "SQL Editor" in sidebar
   - Copy ALL SQL from [SUPABASE_SETUP.md](SUPABASE_SETUP.md) sections 1, 2, and 3
   - Click "Run"
5. **Create storage bucket**:
   - Click "Storage" in sidebar
   - Click "New Bucket"
   - Name: `book-covers`
   - Make it **Public**
   - Click "Create"
   - Go to bucket policies and run the storage SQL from [SUPABASE_SETUP.md](SUPABASE_SETUP.md)
6. **Create admin user**:
   - Click "Authentication" → "Users"
   - Click "Add user" → "Create new user"
   - Email: `your-email@example.com`
   - Password: (create strong password, save it!)
   - Click "Create User"

### 3. Get API Keys (1 minute)

1. Click "Settings" → "API" in Supabase
2. Copy these two values:
   - **URL**: `https://xxxxx.supabase.co`
   - **anon public key**: `eyJ...` (long string)

### 4. Configure Environment (1 minute)

Create a file named `.env` in the project root:

```env
VITE_SUPABASE_URL=paste_your_url_here
VITE_SUPABASE_ANON_KEY=paste_your_anon_key_here
VITE_WHATSAPP_NUMBER=977XXXXXXXXXX
```

Replace with your actual values!

### 5. Start Development Server (1 minute)

```bash
npm run dev
```

Open http://localhost:5173 in your browser!

### 6. Add Sample Books (5 minutes)

1. Go to http://localhost:5173/admin/login
2. Login with the email and password you created
3. Click "Manage Books"
4. Click "Add New Book"
5. Fill in details:
   - Title: "The Alchemist"
   - Author: "Paulo Coelho"
   - Genre: "Fiction"
   - Price: 450
   - Description: "A philosophical tale..."
   - Stock Status: In Stock
   - Quantity: 5
6. (Optional) Upload a book cover image
7. Click "Add Book"
8. Repeat for more books!

Or, add sample data via SQL:
- Go to Supabase SQL Editor
- Copy the sample INSERT query from [SUPABASE_SETUP.md](SUPABASE_SETUP.md) section 6
- Run it

---

## ✅ Testing Checklist

### Customer Features
- [ ] Visit http://localhost:5173
- [ ] See books displayed in grid
- [ ] Try searching for a book
- [ ] Click a book to view details
- [ ] Click "Order via WhatsApp" (should open WhatsApp)
- [ ] Go to "Request Book" and submit a request

### Admin Features
- [ ] Login at http://localhost:5173/admin/login
- [ ] View dashboard statistics
- [ ] Add a new book
- [ ] Edit an existing book
- [ ] Upload a book cover image
- [ ] View book requests
- [ ] Change request status

---

## 🚀 Deploy to Production (10 minutes)

See [DEPLOYMENT.md](DEPLOYMENT.md) for full guide.

**Quick Deploy:**

1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   # Create repo on GitHub first, then:
   git remote add origin https://github.com/YOUR_USERNAME/veena-and-verse.git
   git push -u origin main
   ```

2. **Deploy to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub
   - Click "Import Project"
   - Select your repository
   - Add the same environment variables from your `.env` file
   - Click "Deploy"
   - Wait 2 minutes
   - Done! Your site is live!

---

## 🎯 Next Steps

After setup:

1. **Customize branding**:
   - Update colors in `tailwind.config.js`
   - Change logo text in `Navbar.jsx`

2. **Add your books**:
   - Use admin panel to add real book data
   - Upload actual book cover images

3. **Test WhatsApp**:
   - Make sure your WhatsApp number is correct
   - Test ordering a book

4. **Share with customers**:
   - Share your Vercel link
   - Post on social media
   - Print QR code for your shop

---

## 🆘 Common Issues

### "Cannot find module" errors
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### "Invalid Supabase credentials"
- Double-check your `.env` file
- Make sure there are no extra spaces
- Restart dev server after changing .env

### Books not showing
- Check Supabase SQL Editor → run queries again
- Verify RLS policies are created
- Check browser console for errors (F12)

### Admin login not working
- Make sure you created the user in Supabase
- Check email and password are correct
- Clear browser cache

---

## 📚 Documentation

- **Full README**: [README-REACT.md](README-REACT.md)
- **Supabase Setup**: [SUPABASE_SETUP.md](SUPABASE_SETUP.md)
- **Deployment**: [DEPLOYMENT.md](DEPLOYMENT.md)
- **Project Plan**: [PROJECT_PLAN.md](PROJECT_PLAN.md)

---

## 💡 Tips

1. **Start small**: Add 10-20 books first, then expand
2. **Use good images**: Book covers make a big difference
3. **Test thoroughly**: Try all features before sharing with customers
4. **Monitor usage**: Check Supabase dashboard regularly
5. **Backup data**: Export books data periodically

---

## 🎉 You're Ready!

Your bookshop is now:
- ✅ Running locally
- ✅ Connected to Supabase
- ✅ Ready to add books
- ✅ Ready to deploy

**Time to go live!** Follow the deployment steps above.

Questions? Check the troubleshooting section or review the detailed guides.

---

**Happy selling! 📚**

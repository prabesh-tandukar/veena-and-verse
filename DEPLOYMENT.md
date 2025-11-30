# Deployment Guide - Veena & Verse

Complete guide to deploy your bookshop application for **FREE**.

---

## Prerequisites

✅ Supabase account (with database set up - see [SUPABASE_SETUP.md](SUPABASE_SETUP.md))
✅ GitHub account
✅ Vercel account (free - sign up at vercel.com)

---

## Step 1: Push Code to GitHub

1. **Initialize Git** (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Veena & Verse bookshop"
   ```

2. **Create GitHub Repository**:
   - Go to https://github.com/new
   - Name it: `veena-and-verse`
   - Make it Private or Public (your choice)
   - Click "Create repository"

3. **Push to GitHub**:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/veena-and-verse.git
   git branch -M main
   git push -u origin main
   ```

---

## Step 2: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard (Easiest)

1. **Go to Vercel**:
   - Visit https://vercel.com
   - Click "Sign Up" and choose "Continue with GitHub"

2. **Import Project**:
   - Click "Add New" → "Project"
   - Import your `veena-and-verse` repository
   - Click "Import"

3. **Configure Build Settings**:
   Vercel should auto-detect Vite, but verify:
   - **Framework Preset**: Vite
   - **Root Directory**: `./`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

4. **Add Environment Variables**:
   Click "Environment Variables" and add:

   ```
   VITE_SUPABASE_URL = https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY = your_anon_key_here
   VITE_WHATSAPP_NUMBER = 977XXXXXXXXXX
   ```

   ⚠️ **Important**: Get these from Supabase → Settings → API

5. **Deploy**:
   - Click "Deploy"
   - Wait 1-2 minutes
   - Your site will be live at `your-project.vercel.app`

### Option B: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel

# Follow prompts, set environment variables when asked
```

---

## Step 3: Configure Custom Domain (Optional)

### Using Vercel's Free Subdomain
Your app is already live at: `your-project.vercel.app`

### Using Your Own Domain

1. **Buy a Domain** (if you don't have one):
   - Namecheap, GoDaddy, or any domain registrar
   - Cost: ~$10-15/year

2. **Add Domain in Vercel**:
   - Go to your project in Vercel
   - Click "Settings" → "Domains"
   - Add your domain (e.g., `veenaverse.com`)

3. **Update DNS**:
   - Go to your domain registrar's DNS settings
   - Add the records Vercel provides:
     ```
     Type: A
     Name: @
     Value: 76.76.21.21

     Type: CNAME
     Name: www
     Value: cname.vercel-dns.com
     ```

4. **Wait for DNS propagation** (can take up to 24 hours)

---

## Step 4: Test Your Deployment

### 1. Visit Your Site
Open: `https://your-project.vercel.app`

### 2. Test Customer Features
- ✅ Browse books
- ✅ Search functionality
- ✅ Filter by genre
- ✅ View book details
- ✅ WhatsApp order button
- ✅ Submit book request

### 3. Test Admin Features
- ✅ Login at `/admin/login`
- ✅ View dashboard
- ✅ Add/edit/delete books
- ✅ Upload book covers
- ✅ Manage requests

---

## Step 5: Ongoing Management

### Adding Books
1. Go to `your-site.com/admin/login`
2. Login with your Supabase admin credentials
3. Navigate to "Manage Books"
4. Click "Add New Book"
5. Fill in details and upload cover image
6. Click "Add Book"

### Managing Requests
1. Go to Admin Dashboard
2. Click "View Requests"
3. Change status (Pending → Fulfilled/Cancelled)
4. Contact customers via phone/email

### Updating Content
1. Make changes to code locally
2. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Description of changes"
   git push
   ```
3. Vercel automatically redeploys (takes 1-2 minutes)

---

## Troubleshooting

### Issue: "Books not loading"
**Solution**:
- Check environment variables in Vercel
- Verify Supabase RLS policies are set correctly
- Check browser console for errors

### Issue: "Can't upload images"
**Solution**:
- Verify storage bucket `book-covers` exists in Supabase
- Check storage policies allow authenticated uploads
- Ensure bucket is set to public

### Issue: "Admin login not working"
**Solution**:
- Verify admin user exists in Supabase Authentication
- Check Supabase URL and anon key in environment variables
- Try resetting password in Supabase dashboard

### Issue: "WhatsApp button not working"
**Solution**:
- Check `VITE_WHATSAPP_NUMBER` environment variable
- Format: `977XXXXXXXXXX` (no spaces, no +)
- Redeploy after adding environment variable

---

## Updating Environment Variables

If you need to change environment variables after deployment:

1. Go to Vercel Dashboard
2. Select your project
3. Go to "Settings" → "Environment Variables"
4. Edit the variable
5. Click "Save"
6. Redeploy (click "Deployments" → "..." → "Redeploy")

---

## Monitoring & Analytics

### Vercel Analytics (Free)
- Automatically tracks page views
- See in Vercel Dashboard → "Analytics"

### Supabase Monitoring
- Database usage: Supabase Dashboard → "Database"
- Storage usage: Supabase Dashboard → "Storage"
- API requests: Supabase Dashboard → "API"

---

## Cost Summary

✅ **Supabase Free Tier**:
- 500 MB database
- 1 GB storage
- 2 GB bandwidth/month
- Good for: ~100-500 books, moderate traffic

✅ **Vercel Free Tier**:
- Unlimited deployments
- 100 GB bandwidth/month
- Automatic HTTPS
- Custom domain support

**Total Monthly Cost: $0**

### When to Upgrade?

**Supabase ($25/month)**:
- More than 500 MB data
- More than 1 GB images
- High traffic (>2 GB/month)

**Vercel ($20/month)**:
- Only if you exceed 100 GB bandwidth (very unlikely for small bookshop)

---

## Backup & Data Safety

### Automatic Backups
Supabase automatically backs up your database daily (retained for 7 days on free tier)

### Manual Backup
1. Go to Supabase Dashboard
2. Click "Database" → "Backups"
3. Click "Download backup"

### Export Books Data
Run this SQL in Supabase SQL Editor:
```sql
SELECT * FROM books ORDER BY created_at DESC;
```
Download as CSV for backup.

---

## Support

If you encounter issues:

1. **Check Vercel Logs**:
   - Vercel Dashboard → "Deployments" → Click deployment → "Logs"

2. **Check Supabase Logs**:
   - Supabase Dashboard → "Logs" → "Postgres Logs"

3. **Browser Console**:
   - Open DevTools (F12) → "Console" tab
   - Check for errors

---

## Next Steps

🎉 **Congratulations! Your bookshop is live!**

### Share Your Site
- Share link with customers
- Post on social media
- Add to Google Business Profile

### Marketing Ideas
- WhatsApp Status updates about new books
- Facebook/Instagram posts
- Create QR code linking to your site
- Print business cards with website URL

### Future Enhancements
- Add more book categories
- Create featured/bestseller sections
- Add customer reviews
- Implement discount codes
- Send email notifications for new books

---

## Quick Reference

| Task | URL |
|------|-----|
| Customer Site | `https://your-project.vercel.app` |
| Admin Login | `https://your-project.vercel.app/admin/login` |
| Supabase Dashboard | `https://app.supabase.com` |
| Vercel Dashboard | `https://vercel.com/dashboard` |
| GitHub Repo | `https://github.com/YOUR_USERNAME/veena-and-verse` |

---

**Need Help?** Re-read the troubleshooting section or check the logs in Vercel/Supabase dashboards.

# Netlify Deployment Guide for GIG Insurance Agency

## Overview
This guide will help you deploy your GIG Insurance Agency website to Netlify with full backend functionality including email notifications.

---

## Prerequisites

1. **Netlify Account**: Sign up at [netlify.com](https://www.netlify.com) (free tier works)
2. **GitHub Account**: For version control (recommended)
3. **Email Service**: Gmail account with App Password (or other email service)

---

## Part 1: Email Configuration Setup

### Step 1: Set Up Gmail App Password

1. Go to your Google Account: https://myaccount.google.com
2. Enable **2-Factor Authentication** (if not already enabled)
3. Go to **Security** → **2-Step Verification** → **App Passwords**
4. Generate a new App Password for "Mail"
5. Copy the 16-character password (you'll need this)

### Step 2: Create .env File Locally

Create a `.env` file in your project root:

```env
PORT=3000
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-16-character-app-password
ADMIN_EMAIL=your-email@gmail.com
```

**Important**: Replace `your-email@gmail.com` with your actual Gmail address and `your-16-character-app-password` with the App Password you generated.

---

## Part 2: Netlify Deployment Strategy

### Option A: Netlify Functions (Recommended for Serverless)

Netlify Functions allow you to run serverless functions. We'll convert the Express routes to Netlify Functions.

### Option B: Netlify + External Database

Since SQLite doesn't work well on Netlify, we'll need to use:
- **Netlify Functions** for API endpoints
- **External database** (Supabase, MongoDB Atlas, or PlanetScale) for storing contacts
- **Netlify Environment Variables** for email configuration

---

## Part 3: Detailed Deployment Steps

### Step 1: Prepare Your Project

1. **Create `netlify.toml` configuration file** (we'll create this)
2. **Convert Express routes to Netlify Functions** (we'll create these)
3. **Set up database** (choose one):
   - **Option 1**: Supabase (PostgreSQL, free tier)
   - **Option 2**: MongoDB Atlas (free tier)
   - **Option 3**: PlanetScale (MySQL, free tier)

### Step 2: Convert Backend to Netlify Functions

We need to create:
- `netlify/functions/contact.js` - Handle contact form submissions
- `netlify/functions/contacts.js` - Get all contacts (admin)
- `netlify/functions/health.js` - Health check

### Step 3: Set Up Database

**Recommended: Supabase (Free PostgreSQL)**

1. Sign up at [supabase.com](https://supabase.com)
2. Create a new project
3. Create a table:
   ```sql
   CREATE TABLE contacts (
     id SERIAL PRIMARY KEY,
     name TEXT NOT NULL,
     email TEXT NOT NULL,
     phone TEXT NOT NULL,
     service TEXT NOT NULL,
     message TEXT,
     created_at TIMESTAMP DEFAULT NOW()
   );
   ```
4. Get your project URL and API key

### Step 4: Configure Netlify

1. **Push your code to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin your-github-repo-url
   git push -u origin main
   ```

2. **Connect to Netlify**:
   - Go to [app.netlify.com](https://app.netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect to GitHub
   - Select your repository

3. **Set Build Settings**:
   - Build command: `npm install` (or leave empty if using Netlify Functions)
   - Publish directory: `/` (root)

4. **Set Environment Variables** in Netlify Dashboard:
   - Go to Site settings → Environment variables
   - Add:
     ```
     EMAIL_SERVICE=gmail
     EMAIL_USER=your-email@gmail.com
     EMAIL_PASS=your-app-password
     ADMIN_EMAIL=your-email@gmail.com
     SUPABASE_URL=your-supabase-url
     SUPABASE_KEY=your-supabase-key
     ```

### Step 5: Update Frontend API Calls

Update `script.js` to use Netlify Functions endpoints:
- Change `/api/contact` to `/.netlify/functions/contact`
- Change `/api/contacts` to `/.netlify/functions/contacts`
- Change `/api/health` to `/.netlify/functions/health`

---

## Part 4: File Structure After Conversion

```
GIG-agency/
├── index.html
├── styles.css
├── script.js
├── netlify.toml
├── netlify/
│   └── functions/
│       ├── contact.js
│       ├── contacts.js
│       └── health.js
├── package.json
├── .env (local only, not committed)
├── .gitignore
└── README.md
```

---

## Part 5: Testing After Deployment

1. **Test Contact Form**: Submit a test form
2. **Check Email**: Verify you receive notification emails
3. **Check Database**: Verify data is saved
4. **Test API Endpoints**: Use Postman or browser to test functions

---

## Part 6: Post-Deployment Checklist

- [ ] Contact form submits successfully
- [ ] Email notifications are received
- [ ] Customer confirmation emails are sent
- [ ] Data is saved to database
- [ ] Website loads correctly
- [ ] All links work
- [ ] Mobile responsive design works
- [ ] SSL certificate is active (automatic with Netlify)

---

## Troubleshooting

### Email Not Sending
- Check environment variables in Netlify dashboard
- Verify Gmail App Password is correct
- Check Netlify Function logs

### Database Connection Issues
- Verify Supabase credentials
- Check network connectivity
- Review function logs in Netlify dashboard

### Functions Not Working
- Check `netlify.toml` configuration
- Verify function file paths
- Review Netlify build logs

---

## Cost Estimate

- **Netlify**: Free tier (100GB bandwidth, 300 build minutes/month)
- **Supabase**: Free tier (500MB database, 2GB bandwidth)
- **Email**: Free (Gmail)
- **Total**: $0/month (for small to medium traffic)

---

## Next Steps

After deployment:
1. Set up custom domain (optional)
2. Configure form spam protection (Netlify Forms or reCAPTCHA)
3. Set up analytics (Netlify Analytics or Google Analytics)
4. Configure CDN settings
5. Set up backup strategy for database

---

## Support Resources

- Netlify Docs: https://docs.netlify.com
- Supabase Docs: https://supabase.com/docs
- Netlify Functions: https://docs.netlify.com/functions/overview/


# Step-by-Step Netlify Deployment Guide

## Prerequisites Checklist
- [ ] Netlify account (free at netlify.com)
- [ ] GitHub account (free at github.com)
- [ ] Gmail account with App Password set up
- [ ] Code ready in your project folder

---

## Phase 1: Email Setup (Do This First!)

### Step 1.1: Get Gmail App Password
1. Go to https://myaccount.google.com
2. Security → 2-Step Verification → Enable it
3. Security → App Passwords → Generate for "Mail"
4. Copy the 16-character password

### Step 1.2: Create .env File
Create `.env` file in project root:
```env
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password-here
ADMIN_EMAIL=your-email@gmail.com
```

### Step 1.3: Test Email Locally
```bash
npm start
# Submit contact form and check email
```

---

## Phase 2: Prepare for Netlify

### Step 2.1: Initialize Git (if not done)
```bash
git init
git add .
git commit -m "Initial commit"
```

### Step 2.2: Create GitHub Repository
1. Go to github.com → New repository
2. Name it: `gig-insurance-agency`
3. Don't initialize with README
4. Copy the repository URL

### Step 2.3: Push to GitHub
```bash
git remote add origin https://github.com/yourusername/gig-insurance-agency.git
git branch -M main
git push -u origin main
```

---

## Phase 3: Deploy to Netlify

### Step 3.1: Connect Netlify to GitHub
1. Go to https://app.netlify.com
2. Click "Add new site" → "Import an existing project"
3. Click "GitHub" → Authorize Netlify
4. Select your repository: `gig-insurance-agency`

### Step 3.2: Configure Build Settings
- **Build command**: Leave empty (or `npm install`)
- **Publish directory**: `.` (root)
- Click "Show advanced" → Add environment variables:
  ```
  EMAIL_SERVICE = gmail
  EMAIL_USER = your-email@gmail.com
  EMAIL_PASS = your-app-password
  ADMIN_EMAIL = your-email@gmail.com
  ```

### Step 3.3: Deploy
1. Click "Deploy site"
2. Wait for deployment (2-3 minutes)
3. Your site will be live at: `https://random-name-123.netlify.app`

---

## Phase 4: Test Deployment

### Step 4.1: Test Website
- [ ] Website loads correctly
- [ ] All sections display properly
- [ ] Navigation works
- [ ] Mobile responsive

### Step 4.2: Test Contact Form
- [ ] Submit test form
- [ ] Check email for admin notification
- [ ] Check test email for customer confirmation
- [ ] Verify form shows success message

### Step 4.3: Test API Endpoints
Visit these URLs:
- `https://your-site.netlify.app/.netlify/functions/health`
- Should return: `{"success":true,"message":"Server is running"}`

---

## Phase 5: Custom Domain (Optional)

### Step 5.1: Add Domain in Netlify
1. Site settings → Domain management
2. Add custom domain
3. Follow DNS configuration instructions

### Step 5.2: SSL Certificate
- Netlify automatically provides SSL
- HTTPS will be enabled automatically

---

## Post-Deployment Checklist

- [ ] Website is live and accessible
- [ ] Contact form works
- [ ] Email notifications are received
- [ ] Customer confirmation emails are sent
- [ ] All links work correctly
- [ ] Mobile version works
- [ ] SSL certificate is active (HTTPS)
- [ ] Site loads quickly

---

## Troubleshooting

### Email Not Working on Netlify?
1. Check Environment Variables in Netlify dashboard
2. Verify App Password is correct
3. Check Function logs: Site → Functions → View logs
4. Test locally first to ensure email works

### Functions Not Working?
1. Check `netlify.toml` exists
2. Verify function files are in `netlify/functions/`
3. Check build logs in Netlify dashboard
4. Ensure Node.js version is 18+ in netlify.toml

### Site Not Loading?
1. Check build logs
2. Verify `netlify.toml` configuration
3. Ensure all files are committed to Git
4. Check publish directory is correct

---

## Quick Reference

**Netlify Dashboard**: https://app.netlify.com
**Function Logs**: Site → Functions → View logs
**Environment Variables**: Site settings → Environment variables
**Deploy Logs**: Deploys → Click on deploy → View logs

---

## Support

- Netlify Docs: https://docs.netlify.com
- Netlify Functions: https://docs.netlify.com/functions/overview/
- Email Setup: See EMAIL_SETUP.md


# Quick Start Guide - Email & Netlify Deployment

## 🚀 Quick Setup (5 Minutes)

### 1. Enable Email Notifications (2 minutes)

**Get Gmail App Password:**
1. Go to: https://myaccount.google.com/apppasswords
2. Generate App Password for "Mail"
3. Copy the 16-character password

**Create .env file:**
```bash
# Create .env file in project root
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-16-char-app-password
ADMIN_EMAIL=your-email@gmail.com
```

**Test locally:**
```bash
npm start
# Submit contact form → Check your email!
```

---

### 2. Deploy to Netlify (3 minutes)

**Step 1: Push to GitHub**
```bash
git init
git add .
git commit -m "Ready for Netlify"
git remote add origin https://github.com/yourusername/repo-name.git
git push -u origin main
```

**Step 2: Connect to Netlify**
1. Go to: https://app.netlify.com
2. "Add new site" → "Import from Git" → Select GitHub repo
3. Build settings: Leave defaults
4. Add Environment Variables:
   - `EMAIL_SERVICE` = `gmail`
   - `EMAIL_USER` = `your-email@gmail.com`
   - `EMAIL_PASS` = `your-app-password`
   - `ADMIN_EMAIL` = `your-email@gmail.com`
5. Click "Deploy site"

**Step 3: Test**
- Visit your Netlify URL
- Submit contact form
- Check email for notifications!

---

## 📋 Files Created for Netlify

✅ `netlify.toml` - Netlify configuration
✅ `netlify/functions/contact.js` - Contact form handler
✅ `netlify/functions/health.js` - Health check endpoint
✅ `netlify/functions/contacts.js` - Contacts API (for future DB)

---

## ✅ What Works Now

- ✅ Email notifications to admin
- ✅ Customer confirmation emails
- ✅ Contact form saves submissions
- ✅ Works locally AND on Netlify
- ✅ Automatic HTTPS on Netlify
- ✅ Free hosting forever!

---

## 📚 Detailed Guides

- **Full Deployment**: See `DEPLOYMENT_STEPS.md`
- **Email Setup**: See `EMAIL_SETUP.md`
- **Netlify Details**: See `NETLIFY_DEPLOYMENT.md`

---

## 🆘 Need Help?

1. **Email not working?** Check `EMAIL_SETUP.md`
2. **Deployment issues?** Check `DEPLOYMENT_STEPS.md`
3. **Functions not working?** Check Netlify Function logs

---

## 🎉 You're All Set!

Your website is now ready for:
- ✅ Local development with email
- ✅ Production deployment on Netlify
- ✅ Professional email notifications
- ✅ Free hosting forever!


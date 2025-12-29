# Email Configuration Guide

## Quick Setup for Email Notifications

### Step 1: Get Gmail App Password

1. **Go to Google Account**: https://myaccount.google.com
2. **Enable 2-Factor Authentication** (if not already enabled):
   - Go to Security → 2-Step Verification
   - Follow the setup process
3. **Generate App Password**:
   - Go to Security → 2-Step Verification → App Passwords
   - Select "Mail" as the app
   - Select "Other" as device, type "GIG Insurance"
   - Click "Generate"
   - **Copy the 16-character password** (you'll need this)

### Step 2: Create .env File

Create a `.env` file in your project root with:

```env
EMAIL_SERVICE=gmail
EMAIL_USER=your-actual-email@gmail.com
EMAIL_PASS=your-16-character-app-password-here
ADMIN_EMAIL=your-actual-email@gmail.com
```

**Replace**:
- `your-actual-email@gmail.com` with your Gmail address
- `your-16-character-app-password-here` with the App Password you generated

### Step 3: Test Email Locally

1. Make sure `.env` file is created
2. Restart your server: `npm start`
3. Submit the contact form
4. Check your email inbox for notifications

### Step 4: Configure for Netlify

When deploying to Netlify, add these as **Environment Variables** in Netlify Dashboard:

1. Go to your site → Site settings → Environment variables
2. Add each variable:
   - `EMAIL_SERVICE` = `gmail`
   - `EMAIL_USER` = `your-email@gmail.com`
   - `EMAIL_PASS` = `your-app-password`
   - `ADMIN_EMAIL` = `your-email@gmail.com`

### Email Features Enabled

✅ **Admin Notifications**: You'll receive an email when someone submits the contact form
✅ **Customer Confirmations**: Customers receive a confirmation email after submitting
✅ **Professional Templates**: Both emails use professional HTML templates

### Troubleshooting

**Email not sending?**
- Verify App Password is correct (16 characters, no spaces)
- Check that 2FA is enabled
- Verify `.env` file is in project root
- Check server console for error messages
- Make sure you're using App Password, not regular password

**For other email services:**
- Outlook: Use `EMAIL_SERVICE=outlook`
- Yahoo: Use `EMAIL_SERVICE=yahoo`
- Custom SMTP: Modify `createTransporter()` function in server.js


# Setup Guide - GIG Insurance Agency Backend

## Quick Start

### 1. Prerequisites
- Node.js (v14 or higher) - [Download here](https://nodejs.org/)
- npm (comes with Node.js)

### 2. Installation Steps

```bash
# 1. Install dependencies
npm install

# 2. Create environment file
cp env.example .env

# 3. Edit .env file with your email settings (optional)
# If you skip email setup, form submissions will still be saved to database

# 4. Start the server
npm start
```

### 3. Email Configuration (Optional)

The backend can send email notifications when someone submits the contact form. This is optional - if you don't configure email, submissions will still be saved to the database.

#### For Gmail:

1. Go to your Google Account settings
2. Enable 2-Factor Authentication
3. Go to [App Passwords](https://myaccount.google.com/apppasswords)
4. Generate a new App Password for "Mail"
5. Copy the 16-character password
6. Add to `.env`:
   ```
   EMAIL_SERVICE=gmail
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-16-char-app-password
   ADMIN_EMAIL=your-email@gmail.com
   ```

#### For Other Email Services:

Update `EMAIL_SERVICE` in `.env`:
- `outlook` for Outlook/Hotmail
- `yahoo` for Yahoo Mail
- Or modify `server.js` to use custom SMTP settings

### 4. Testing the Backend

1. Start the server: `npm start`
2. Open browser: `http://localhost:3000`
3. Fill out the contact form
4. Check the console for confirmation
5. Check your email (if configured)
6. Database file `contacts.db` will be created automatically

### 5. Viewing Submissions

#### Option 1: Using the API
```bash
# Get all contacts
curl http://localhost:3000/api/contacts

# Get specific contact
curl http://localhost:3000/api/contacts/1
```

#### Option 2: Using SQLite
```bash
# Install SQLite CLI (if not installed)
# Then run:
sqlite3 contacts.db "SELECT * FROM contacts;"
```

#### Option 3: Using a SQLite Browser
- Download [DB Browser for SQLite](https://sqlitebrowser.org/)
- Open `contacts.db` file
- Browse the `contacts` table

## Production Deployment

### Environment Variables
Make sure to set all environment variables in your production environment:
- `PORT` - Server port (default: 3000)
- `EMAIL_USER` - Email for sending notifications
- `EMAIL_PASS` - Email password/app password
- `ADMIN_EMAIL` - Where to send notification emails

### Security Recommendations

1. **Add Authentication**: The `/api/contacts` endpoint is currently open. Add authentication for production:
   ```javascript
   // Add to server.js
   const authenticate = (req, res, next) => {
     const token = req.headers.authorization;
     if (token === process.env.ADMIN_TOKEN) {
       next();
     } else {
       res.status(401).json({ success: false, message: 'Unauthorized' });
     }
   };
   
   app.get('/api/contacts', authenticate, (req, res) => {
     // ... existing code
   });
   ```

2. **Use HTTPS**: Always use HTTPS in production

3. **Rate Limiting**: Add rate limiting to prevent spam:
   ```bash
   npm install express-rate-limit
   ```

4. **Input Sanitization**: Consider adding input sanitization libraries

5. **Database Backups**: Regularly backup `contacts.db`

## Troubleshooting

### Port Already in Use
```bash
# Change PORT in .env or use:
PORT=3001 npm start
```

### Email Not Sending
- Check that 2FA is enabled (for Gmail)
- Verify App Password is correct
- Check spam folder
- Review server console for error messages

### Database Errors
- Delete `contacts.db` and restart server (will recreate)
- Check file permissions
- Ensure SQLite3 is properly installed

### CORS Issues
- CORS is enabled for all origins (development)
- For production, restrict to your domain in `server.js`

## Development Mode

Use nodemon for auto-reload during development:
```bash
npm run dev
```

This will automatically restart the server when you make changes to `server.js`.


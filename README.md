# GIG Insurance Agency Website

A modern, responsive website for GIG Insurance Agency - a Kenya-based insurance powerhouse serving the Gig Economy, SMEs, and individuals.

## Features

- **Fully Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- **Modern UI/UX** - Clean, professional design with smooth animations
- **Interactive Contact Form** - With real-time validation and success feedback
- **SEO Optimized** - Includes meta tags for better search engine visibility
- **Smooth Scrolling** - Enhanced navigation experience
- **Mobile-Friendly Navigation** - Hamburger menu for mobile devices
- **Animated Sections** - Fade-in animations on scroll for better engagement

## File Structure

```
GIG-agency/
├── index.html          # Main HTML file
├── styles.css          # All styling and responsive design
├── script.js           # Interactive functionality
├── server.js           # Backend server (Node.js/Express)
├── package.json        # Node.js dependencies
├── .env.example        # Environment variables template
├── .gitignore          # Git ignore file
├── contacts.db         # SQLite database (auto-created)
└── README.md           # This file
```

## Getting Started

### Frontend Only (Static)

1. **Open the website**: Simply open `index.html` in any modern web browser
2. **For local development**: You can use any local server:
   - Python: `python -m http.server 8000`
   - Node.js: `npx serve`
   - VS Code: Use the "Live Server" extension

### With Backend (Full Stack)

1. **Install Node.js** (if not already installed): Download from [nodejs.org](https://nodejs.org/)

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   - Copy `.env.example` to `.env`
   - Edit `.env` and add your email configuration:
     ```env
     PORT=3000
     EMAIL_SERVICE=gmail
     EMAIL_USER=your-email@gmail.com
     EMAIL_PASS=your-app-password
     ADMIN_EMAIL=your-email@gmail.com
     ```

4. **Configure Email** (Optional but recommended):
   - For Gmail: Enable 2-factor authentication and create an [App Password](https://myaccount.google.com/apppasswords)
   - Use the App Password (not your regular password) in `.env`
   - If email is not configured, form submissions will still be saved to the database

5. **Start the server**:
   ```bash
   npm start
   ```
   Or for development with auto-reload:
   ```bash
   npm run dev
   ```

6. **Open your browser**: Navigate to `http://localhost:3000`

The server will:
- Serve your website
- Handle contact form submissions
- Save submissions to SQLite database
- Send email notifications (if configured)
- Send confirmation emails to customers (if configured)

## Customization

### Colors
Edit the CSS variables in `styles.css`:
```css
:root {
    --primary-color: #0066cc;
    --secondary-color: #00a86b;
    --accent-color: #ff6b35;
    /* ... */
}
```

### Backend API Endpoints

- `POST /api/contact` - Submit contact form
  - Body: `{ name, email, phone, service, message }`
  - Returns: `{ success, message, contactId }`

- `GET /api/contacts` - Get all contacts (for admin)
  - Returns: `{ success, contacts: [...] }`

- `GET /api/contacts/:id` - Get contact by ID
  - Returns: `{ success, contact: {...} }`

- `GET /api/health` - Health check
  - Returns: `{ success, message, timestamp }`

### Database

The backend uses SQLite to store contact form submissions. The database file (`contacts.db`) is automatically created when the server starts.

To view contacts:
- Use a SQLite browser tool
- Or use the API endpoint: `GET /api/contacts`
- Or query directly: `sqlite3 contacts.db "SELECT * FROM contacts;"`

## Sections

1. **Hero** - Main landing section with call-to-action
2. **About Us** - Company introduction and mission
3. **What We Offer** - Services and value-added offerings
4. **Why GIG Insurance Agency** - Key differentiators
5. **Our Promise & Challenge** - Company commitments
6. **Our Partners** - Insurance partners and strategic alliances
7. **Contact Us** - Contact information and consultation form
8. **Call to Action** - Final conversion section
9. **Footer** - Additional links and information

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Backend Features

✅ **Contact Form API** - Handles form submissions with validation
✅ **Database Storage** - SQLite database for storing contacts
✅ **Email Notifications** - Sends notifications to admin and confirmation to customers
✅ **Error Handling** - Comprehensive error handling and validation
✅ **CORS Enabled** - Ready for cross-origin requests
✅ **Health Check** - API endpoint for monitoring

## Future Enhancements

- [ ] Admin dashboard for viewing contacts
- [ ] Authentication for admin endpoints
- [ ] Blog section for insurance tips
- [ ] Online quote calculator
- [ ] Client portal/login
- [ ] Live chat integration
- [ ] Multi-language support
- [ ] Dark mode toggle

## Contact Information

- **Office**: Katani Road, Syokimau
- **Phone**: +254 724 280585
- **Email**: giginsuranceagency@gmail.com

## License

© 2024 GIG Insurance Agency. All rights reserved.


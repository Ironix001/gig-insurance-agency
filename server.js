const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('.')); // Serve static files (HTML, CSS, JS)

// Initialize SQLite Database
const db = new sqlite3.Database('./contacts.db', (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to SQLite database.');
        // Create contacts table if it doesn't exist
        db.run(`CREATE TABLE IF NOT EXISTS contacts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            phone TEXT NOT NULL,
            service TEXT NOT NULL,
            message TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`, (err) => {
            if (err) {
                console.error('Error creating table:', err.message);
            } else {
                console.log('Contacts table ready.');
            }
        });
    }
});

// Email Configuration
const createTransporter = () => {
    // For Gmail, you'll need to use an App Password
    // For other services, adjust accordingly
    return nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE || 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });
};

// Contact Form Endpoint
app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, phone, service, message } = req.body;

        // Validation
        if (!name || !email || !phone || !service) {
            return res.status(400).json({
                success: false,
                message: 'Please fill in all required fields.'
            });
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: 'Please enter a valid email address.'
            });
        }

        // Save to database
        db.run(
            `INSERT INTO contacts (name, email, phone, service, message) 
             VALUES (?, ?, ?, ?, ?)`,
            [name, email, phone, service, message || ''],
            function(err) {
                if (err) {
                    console.error('Database error:', err);
                    return res.status(500).json({
                        success: false,
                        message: 'Error saving contact. Please try again.'
                    });
                }

                const contactId = this.lastID;
                console.log(`Contact saved with ID: ${contactId}`);

                // Send email notification (if email is configured)
                if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
                    sendEmailNotification({ name, email, phone, service, message, contactId })
                        .then(() => {
                            console.log('Email notification sent');
                        })
                        .catch((err) => {
                            console.error('Email error:', err);
                            // Don't fail the request if email fails
                        });
                }

                // Send confirmation email to customer (optional)
                if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
                    sendConfirmationEmail(email, name)
                        .catch((err) => {
                            console.error('Confirmation email error:', err);
                        });
                }

                res.json({
                    success: true,
                    message: 'Thank you! Your consultation request has been received. We\'ll contact you soon.',
                    contactId: contactId
                });
            }
        );
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({
            success: false,
            message: 'An error occurred. Please try again later.'
        });
    }
});

// Send email notification to admin
async function sendEmailNotification(contact) {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        return Promise.resolve(); // Skip if email not configured
    }

    const transporter = createTransporter();
    const adminEmail = process.env.ADMIN_EMAIL || process.env.EMAIL_USER;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: adminEmail,
        subject: `New Consultation Request from ${contact.name}`,
        html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${contact.name}</p>
            <p><strong>Email:</strong> ${contact.email}</p>
            <p><strong>Phone:</strong> ${contact.phone}</p>
            <p><strong>Service Interest:</strong> ${contact.service}</p>
            <p><strong>Message:</strong></p>
            <p>${contact.message || 'No message provided'}</p>
            <hr>
            <p><small>Contact ID: ${contact.contactId}</small></p>
            <p><small>Submitted: ${new Date().toLocaleString()}</small></p>
        `
    };

    return transporter.sendMail(mailOptions);
}

// Send confirmation email to customer
async function sendConfirmationEmail(customerEmail, customerName) {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        return Promise.resolve(); // Skip if email not configured
    }

    const transporter = createTransporter();

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: customerEmail,
        subject: 'Thank You for Contacting GIG Insurance Agency',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #0066cc;">Thank You, ${customerName}!</h2>
                <p>We've received your consultation request and one of our team members will contact you soon.</p>
                <p>In the meantime, feel free to reach out to us directly:</p>
                <ul>
                    <li><strong>Phone:</strong> +254 724 280585</li>
                    <li><strong>Email:</strong> info@giginsuranceagency.net</li>
                    <li><strong>Office:</strong> Katani Road, Syokimau</li>
                </ul>
                <hr>
                <p style="color: #666; font-size: 12px;">
                    GIG Insurance Agency - Protecting What Matters Most<br>
                    <a href="mailto:info@giginsuranceagency.net">info@giginsuranceagency.net</a>
                </p>
            </div>
        `
    };

    return transporter.sendMail(mailOptions);
}

// Get all contacts (for admin panel - add authentication in production)
app.get('/api/contacts', (req, res) => {
    db.all('SELECT * FROM contacts ORDER BY created_at DESC', [], (err, rows) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: 'Error fetching contacts.'
            });
        }
        res.json({
            success: true,
            contacts: rows
        });
    });
});

// Get contact by ID
app.get('/api/contacts/:id', (req, res) => {
    const id = req.params.id;
    db.get('SELECT * FROM contacts WHERE id = ?', [id], (err, row) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: 'Error fetching contact.'
            });
        }
        if (!row) {
            return res.status(404).json({
                success: false,
                message: 'Contact not found.'
            });
        }
        res.json({
            success: true,
            contact: row
        });
    });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        success: true,
        message: 'Server is running',
        timestamp: new Date().toISOString()
    });
});

// Serve the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
    console.log(`📧 Email notifications: ${process.env.EMAIL_USER ? 'Enabled' : 'Disabled (configure EMAIL_USER and EMAIL_PASS)'}`);
});

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('\nShutting down server...');
    db.close((err) => {
        if (err) {
            console.error('Error closing database:', err.message);
        } else {
            console.log('Database connection closed.');
        }
        process.exit(0);
    });
});


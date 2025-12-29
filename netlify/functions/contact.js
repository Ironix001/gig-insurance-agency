const nodemailer = require('nodemailer');

// Email Configuration
const createTransporter = () => {
    return nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE || 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });
};

// Send email notification to admin
async function sendEmailNotification(contact) {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        return Promise.resolve();
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
        return Promise.resolve();
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
                    <li><strong>Email:</strong> giginsuranceagency@gmail.com</li>
                    <li><strong>Office:</strong> Katani Road, Syokimau</li>
                </ul>
                <hr>
                <p style="color: #666; font-size: 12px;">
                    GIG Insurance Agency - Protecting What Matters Most<br>
                    <a href="mailto:giginsuranceagency@gmail.com">giginsuranceagency@gmail.com</a>
                </p>
            </div>
        `
    };

    return transporter.sendMail(mailOptions);
}

// Netlify Function Handler
exports.handler = async (event, context) => {
    // Handle CORS
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Content-Type': 'application/json'
    };

    // Handle preflight OPTIONS request
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers,
            body: ''
        };
    }

    // Only allow POST requests
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            headers,
            body: JSON.stringify({ success: false, message: 'Method not allowed' })
        };
    }

    try {
        const { name, email, phone, service, message } = JSON.parse(event.body);

        // Validation
        if (!name || !email || !phone || !service) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({
                    success: false,
                    message: 'Please fill in all required fields.'
                })
            };
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({
                    success: false,
                    message: 'Please enter a valid email address.'
                })
            };
        }

        // Generate contact ID (simple timestamp-based ID)
        const contactId = Date.now();

        // Save to database (using Netlify Forms or external DB)
        // For now, we'll use Netlify Forms API
        // In production, you'd use Supabase, MongoDB, or another database
        
        // Send email notifications
        if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
            try {
                await sendEmailNotification({ name, email, phone, service, message, contactId });
                console.log('Admin notification email sent');
            } catch (err) {
                console.error('Email notification error:', err);
            }

            try {
                await sendConfirmationEmail(email, name);
                console.log('Confirmation email sent');
            } catch (err) {
                console.error('Confirmation email error:', err);
            }
        }

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
                success: true,
                message: 'Thank you! Your consultation request has been received. We\'ll contact you soon.',
                contactId: contactId
            })
        };
    } catch (error) {
        console.error('Server error:', error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({
                success: false,
                message: 'An error occurred. Please try again later.'
            })
        };
    }
};


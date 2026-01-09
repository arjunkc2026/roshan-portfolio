// API endpoint for contact form
// This is a Node.js serverless function example (works with Vercel, Netlify, etc.)

module.exports = async (req, res) => {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle preflight request
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { name, email, subject, message } = req.body;

        // Validate required fields
        if (!name || !email || !subject || !message) {
            return res.status(400).json({ 
                error: 'Please fill in all required fields' 
            });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ 
                error: 'Please provide a valid email address' 
            });
        }

        // Here you would typically:
        // 1. Send email using a service like SendGrid, Mailgun, or Nodemailer
        // 2. Save to database
        // 3. Send notification

        // Example using Nodemailer (you need to install it: npm install nodemailer)
        /*
        const nodemailer = require('nodemailer');
        
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: email,
            to: 'roshan@prodizytech.com',
            subject: `Portfolio Contact: ${subject}`,
            html: `
                <h3>New Contact Form Submission</h3>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Subject:</strong> ${subject}</p>
                <p><strong>Message:</strong></p>
                <p>${message}</p>
            `
        };

        await transporter.sendMail(mailOptions);
        */

        // For demonstration, we'll just log and return success
        console.log('Contact form submission:', { name, email, subject, message });

        return res.status(200).json({ 
            message: 'Thank you for your message! I will get back to you soon.',
            success: true 
        });

    } catch (error) {
        console.error('Error processing contact form:', error);
        return res.status(500).json({ 
            error: 'An error occurred while sending your message. Please try again later.' 
        });
    }
};

// Alternative: Express.js endpoint version
/*
const express = require('express');
const router = express.Router();

router.post('/contact', async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        // Validation
        if (!name || !email || !subject || !message) {
            return res.status(400).json({ 
                error: 'Please fill in all required fields' 
            });
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ 
                error: 'Please provide a valid email address' 
            });
        }

        // Process the contact form (send email, save to DB, etc.)
        console.log('Contact form submission:', { name, email, subject, message });

        res.status(200).json({ 
            message: 'Thank you for your message! I will get back to you soon.',
            success: true 
        });

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ 
            error: 'An error occurred. Please try again later.' 
        });
    }
});

module.exports = router;
*/
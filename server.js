require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');

const app = express();
app.use(express.json());

let transporter = nodemailer.createTransport({
    host: 'smtp.mail.me.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.ICLOUD_EMAIL,
      pass: process.env.ICLOUD_APP_PASSWORD
    },
});

async function sendEmail(subject, text, html) {
    try {
        let info = await transporter.sendMail({
            from: '"Francis Galan" <galanfaa@icloud.com>',
            to: 'enquiries@galanacci-verse.com',
            subject: subject,
            text: text,
            html: html
        });
        console.log('Message sent:', info.messageId);
        return info;
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
}

app.post('/send-enquiry', async (req, res) => {
    const { name, email, message } = req.body;
    const subject = 'New Enquiry from G/VERSE Website';
    const text = `Name: ${name}\nEmail: ${email}\nMessage: ${message}`;
    const html = `<p><strong>Name:</strong> ${name}</p>
                  <p><strong>Email:</strong> ${email}</p>
                  <p><strong>Message:</strong> ${message}</p>`;
    
    try {
        await sendEmail(subject, text, html);
        res.json({ success: true });
    } catch (error) {
        console.error('Error sending enquiry:', error);
        res.status(500).json({ success: false, error: 'Failed to send enquiry' });
    }
});

// Add this at the end of the file to start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
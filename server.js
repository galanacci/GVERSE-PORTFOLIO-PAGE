require('dotenv').config();
const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    host: 'smtp.mail.me.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.ICLOUD_EMAIL,
      pass: process.env.ICLOUD_APP_PASSWORD
    },
  });

// Function to send email
async function sendEmail(to, subject, text, html) {
    try {
        let info = await transporter.sendMail({
            from: '"Francis Galan" <galanfaa@icloud.com>',
            to: to,
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
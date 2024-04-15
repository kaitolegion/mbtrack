const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config({ path: './.env' });
const sendMail = async (option) => {
    const transporter = nodemailer.createTransport({
        host: process.env.smtpHost,
        port: process.env.smtpPort,
        auth: {
            user: process.env.smtpUsername,
            pass: process.env.smtpPassword
        },
        tls: {
            rejectUnauthorized: false
        }
    })
    const emailOptions = {
        from: 'Minibustrack Support<p33tp00t@gmail.com>',
        to: option.email,
        subject: option.subject,
        html: option.body
    }
    await transporter.sendMail(emailOptions);
}
module.exports = sendMail;
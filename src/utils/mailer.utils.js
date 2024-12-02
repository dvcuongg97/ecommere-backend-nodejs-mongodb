'use strict'

const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const sendVerificationEmail = async (email, token) => {
    const link = `http://localhost:${process.env.PORT}/verify/${token}`;
    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Xác minh email",
        html: `<p>Vui lòng nhấp vào liên kết sau để xác minh email của bạn:</p><a href="${link}">${link}</a>`,
    });
};

module.exports = {
    transporter,
    sendVerificationEmail
}
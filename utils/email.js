const nodemailer = require('nodemailer');

const sendEmail = async options => {
    const { EMAIL_USER, EMAIL_PASSWORD, EMAIL_HOST, EMAIL_PORT } = process.env;
    transporter = nodemailer.createTransport({
        host: EMAIL_HOST,
        port: EMAIL_PORT,
        auth: {
            user: EMAIL_USER,
            pass: EMAIL_PASSWORD,
        },
    });
    const emailOptions = {
        from: 'Noam Boni <nobo1m@yahoo.com>',
        to: options.email,
        subject: options.subject,
        text: options.message
    }

    await transporter.sendMail(emailOptions);
};

module.exports = sendEmail;

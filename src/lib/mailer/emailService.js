const nodemailer = require('nodemailer');
const MESSAGES = require('../../utils/messages');
const RESET_PASSWORD_URL = 'http://localhost:3000/reset';

function sendEmail(email, resetToken) {
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: 'valentina.smitham43@ethereal.email',
      pass: 'Rg62Mh6sHJ5unfWvFQ'
    }
  });

  const mailOptions = {
    from: 'rtirtha97@gmail.com',
    to: email,
    subject: 'Password Reset Request',
    text: `Click on the following link to reset your password: ${RESET_PASSWORD_URL}/${resetToken}`,
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        reject(MESSAGES.EMAIL_ERROR);
      } else {
        console.log('Email sent:', info.response);
        resolve(MESSAGES.RESET_EMAIL_SENT);
      }
    });
  });
}

module.exports = sendEmail;
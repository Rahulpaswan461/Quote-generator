const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
    auth:{
        user: process.env.SENDER_EMAIL,
        pass: process.env.PASSWORD
    }
})

// Function to send email
const sendEmail = (to, subject, text) => {
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to,
      subject,
      text,
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log('Email sent: ' + info.response);
    });
  };
  
  module.exports = sendEmail;


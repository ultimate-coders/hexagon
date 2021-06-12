'use strict';

const nodemailer = require('nodemailer');

async function sendEmail(mailInfo) {
  const { to, subject, text, html } = mailInfo;

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: ' smtp.gmail.com',
    port: 587,
    secure: true,
    auth: {
      user: process.env.GOOGLE_EMAIL,
      pass: process.env.GOOGLE_PASSWORD,
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: `"Hexagon Social Media" <hexagon@herokuapp.com>`, // sender address
    to, // list of receivers comma separated
    subject, // Subject line
    text, // plain text body
    html, // html body
  });

  console.log('Message sent: %s', info.messageId);
}

module.exports = sendEmail;


// const mailInfo = {
//     to: 'mr0virus@gmail.com',
//     subject: 'this is a subject',
//     text: 'this is the text',
//     html: 'this is the html part',
//   };
  
//   await sendEmail(mailInfo);
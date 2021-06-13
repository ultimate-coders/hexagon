'use strict';

require('dotenv').config();

const nodemailer = require('nodemailer');
// const {getToken} = require ('./helpers');
// const {createToken} = require ('./jwt');

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
    clientId: process.env.OAUTH_CLIENTID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    refreshToken: process.env.OAUTH_REFRESH_TOKEN,
  },
});
const mailOptions = {
  from: 'amjad.mesmar@gmail.com',
  to: 'amjad.mesmar@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!',
};
  
function sendVerificationMail (){

  transporter.sendMail(mailOptions, function(error, info){
    console.log('mail', mailOptions);
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

module.exports = sendVerificationMail;
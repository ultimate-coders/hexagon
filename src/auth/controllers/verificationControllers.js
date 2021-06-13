'use strict';

const { randomGenerator, updateUserVerification } = require('../models/user');
const sendEmail = require('../../utils/mailer');

const usersVerifications = {}; // {userId: {exp; '342343232', code: '6654654sdfds64'}, ...}

const verifyUserHandler = async (req, res, next) => {
  console.log(usersVerifications);
  try {
    const code = req.body.code;
    if (!code) {
      res.status(403).json({
        status: 403,
        error: 'The code is required!',
      });
      return;
    }
    // if account is already verified
    if (req.user.verified) {
      res.status(200).json({
        status: 200,
        message: 'Already verified',
      });
      return;
      // Check if we have sent a code to the user
    } else if (
      usersVerifications[req.user.id] &&
      usersVerifications[req.user.id].code
    ) {
      // Found the code!, Check if it's expired
      if (
        usersVerifications[req.user.id].exp < Date.now() &&
        code === usersVerifications[req.user.id].code
      ) {
        // Verify the user and remove the code from the usersVerifications
        await updateUserVerification(req.user.id);

        res.status(200).json({
          status: 200,
          message: 'Successfully verified',
        });
        delete usersVerifications[req.user.id];
        return;
      }
    } else {
      delete usersVerifications[req.user.id];
    }
    // No verify request
    res.status(403).json({
      status: 403,
      error: 'The verification code not correct or has expired!',
    });
  } catch (e) {
    next(e);
  }
};

const sendVerificationCodeHandler = async (req, res, next) => {
  try {
    if (req.user.verified) {
      res.status(403).json({
        status: 403,
        error: 'Already verified',
      });
      // Not verified!
    } else {
      // If we sent the code before, just delete it
      if (usersVerifications[req.user.id])
        delete usersVerifications[req.user.id];
      // create a code and save it in the usersVerifications
      const code = randomGenerator(10);
      usersVerifications[req.user.id] = {
        code: code,
        exp: Date.now() + 60 * 10, // 10 min
      };
      await sendEmail(
        getVerificationEmailTemplate(req.user.email, req.user.first_name, code)
      );
      // Remove the code after 10 min
      setTimeout(() => {
        if (usersVerifications[req.user.id])
          delete usersVerifications[req.user.id];
      }, 600000); // After 10 min delete the code (expired)
      res.status(200).json({
        status: 200,
        message:
          'The code sent successfully to your email, which registered in our website, please check it',
      });
    }
  } catch (e) {
    next(e);
  }
};

const getVerificationEmailTemplate = (to, first_name, code) => {
  const subject = 'Verification Code for the account';
  const text = '';
  const html = `
    Hello <b>${first_name}</b>, you are trying to verify your account, just copy the code and past it in the appropriate field</b>
    <h3>Code</h3>: <h3>${code}</h3> 
    `;

  return { to, subject, text, html };
};

module.exports = {
  verifyUserHandler,
  sendVerificationCodeHandler,
};

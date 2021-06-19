'use strict';

const {
  updateUserPassword,
  randomGenerator,
  getUserByEmail,
} = require('../models/user');
const { validatePassword } = require('./helpers');
const sendEmail = require('../../utils/mailer');

const usersPasswordVerification = {}; // {userId: {exp; '342343232', code: '6654654sdfds64'}, ...}

const resetPasswordHandler = async (req, res, next) => {
  try {
    const email = req.body.email;
    const code = req.body.code;
    const password = req.body.password;

    if (!validatePassword(password)) {
      res.status(403).json({
        status: 403,
        error: 'Please insert a valid password',
      });
      return;
    }
    const user = await getUserByEmail(email);

    if (!code) {
      res.status(403).json({
        status: 403,
        error: 'The code is required!',
      });
      return;
    }

    // Check if we have sent a code to the user
    if (
      usersPasswordVerification[user.id] &&
      usersPasswordVerification[user.id].code
    ) {
      // Found the code!, Check if it's expired
      if (
        usersPasswordVerification[user.id].exp < Date.now() &&
        code === usersPasswordVerification[user.id].code
      ) {
        // Change the user's password and remove the code from the usersPasswordVerification
        await updateUserPassword(user.id, password);

        res.status(200).json({
          status: 200,
          message: 'Password successfully changed',
        });
        delete usersPasswordVerification[user.id];
        return;
      }
    } else {
      delete usersPasswordVerification[user.id];
    }
    // No verify request
    res.status(403).json({
      status: 403,
      error: 'The code is not correct or has expired!',
    });
  } catch (e) {
    next(e);
  }
};

const sendPasswordCodeHandler = async (req, res, next) => {
  try {
    const email = req.body.email;
    const user = await getUserByEmail(email);
    if (user) {
      // If we sent the code before, just delete it
      if (usersPasswordVerification[user.id])
        delete usersPasswordVerification[user.id];
      // create a code and save it in the usersPasswordVerification
      const code = randomGenerator(10);
      usersPasswordVerification[user.id] = {
        code: code,
        exp: Date.now() + 60 * 10, // 10 min
      };
      await sendEmail(
        getResetPasswordEmailTemplate(user.email, user.user_name, code)
      );
      // Remove the code after 10 min
      setTimeout(() => {
        if (usersPasswordVerification[user.id])
          delete usersPasswordVerification[user.id];
      }, 600000); // After 10 min delete the code (expired)
    }
    res.status(200).json({
      status: 200,
      message:
        'If this email is registered on our site, an email with a code has been sent to it, check it please for further instructions',
    });
  } catch (e) {
    next(e);
  }
};

const getResetPasswordEmailTemplate = (to, name, code) => {
  const subject = 'Verification Code for the account';
  const text = '';
  const html = `
      Hello <b>${
        name || 'there'
      }</b>, someone is trying to reset your account and we send this email with the code to reset verify that its you, if its not you, you can just ignore this email, and if it you who are trying to reset the password just  just copy the code and past it in the appropriate field</b>
      <h3>Code</h3>: <h3>${code}</h3> 
      `;

  return { to, subject, text, html };
};

module.exports = {
  resetPasswordHandler,
  sendPasswordCodeHandler,
};

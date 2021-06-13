'use strict';

const { createToken } = require('../models/jwt');
const { createUser, getUserByEmail } = require('../models/user');
const { createProfile } = require('../../models/userProfile');
const { validateEmail, validatePassword } = require('./helpers');

const signUpHandler = async (req, res, next) => {
  try {
    let email = req.body.email;
    let password = req.body.password;
    
    if (!validateEmail(email)) {
      res.status(403).json({ message: 'Please insert a valid email' });
      return;
    }
    
    if (!validatePassword(password)) {
      res.status(403).json({ message: 'Please insert a valid password' });
      return;
    }

    let user = await getUserByEmail(req.body.email);

    if (!user) {
      user = await createUser(req.body);
      // Create user profile
      let profileObj = {
        user_id: user.id,
        first_name: user.user_name,
        last_name: '',
        caption: '',
      };
      await createProfile(profileObj);
      let userId = user.id;
      let userTokens = await createToken(userId);
      delete userTokens.id;
      delete userTokens.user_id;
      res.status(200).json(userTokens);
    } else {
      res.status(403).json({ message: 'User already exist!' });
    }
  } catch (e) {
    next(e.message);
  }
};

const signInHandler = (req, res, next) => {
  try {
    res.status(200).json({
      userTokens: req.tokens,
    });
  } catch (e) {
    next(e.message);
  }
};

module.exports = {
  signUpHandler,
  signInHandler,
};

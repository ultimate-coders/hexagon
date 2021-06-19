'use strict';

const { createToken, deleteToken, getTokenRecord } = require('../models/jwt');
const {
  createUser,
  getUserByEmail,
  getUserById,
  updateUserPassword,
} = require('../models/user');
const { createProfile } = require('../../models/userProfile');
const { authenticateWithToken } = require('../models/helpers');
const { validateEmail, validatePassword, checkPassword } = require('./helpers');

const signUpHandler = async (req, res, next) => {
  try {
    let email = req.body.email;
    let password = req.body.password;
    let username = req.body.user_name;

    if(username.includes(' ')){
      res.status(403).json({ message: 'Username should not have spaces' });
      return;
    }

    if (!validateEmail(email)) {
      res.status(403).json({ message: 'Please insert a valid email' });
      return;
    }

    if (!validatePassword(password)) {
      res.status(403).json({ message: 'Please insert a valid password' });
      return;
    }

    let user = await getUserByEmail(req.body.email, req.body.user_name);

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
      delete userTokens.created_at;
      res.status(200).json(userTokens);
    } else {
      res.status(403).json({ message: 'User already exist!' });
    }
  } catch (e) {
    next(e);
  }
};

const updateUserPasswordHandler = async (req, res, next) => {
  try {
    const oldPassword = req.body.old_password;
    const newPassword = req.body.new_password;
    if (!validatePassword(newPassword)) {
      res.status(403).json({
        status: 403,
        error: 'Please insert a valid password',
      });
      return;
    }

    let user = await getUserById(req.user.id);
    const valid = await checkPassword(oldPassword, user.hashed_password);
    if (valid) {
      user = await updateUserPassword(user.id, newPassword);
      const response = {
        status: 200,
        message: 'Password updated successfully',
      };
      res.status(200).json(response);
    } else {
      res.status(403).json({
        status: 403,
        message: 'Invalid password',
      });
    }
  } catch (e) {
    next(e);
  }
};

const signInHandler = async (req, res, next) => {
  try {
    delete req.tokens.created_at;
    res.status(200).json(req.tokens);
  } catch (e) {
    next(e);
  }
};

const logoutHandler = async (req, res, next) => {
  try {
    await deleteToken(req.user.id);
    res.status(200).json({
      status: 200,
      message: 'successfully logged out',
    });
  } catch (e) {
    next(e);
  }
};

const refreshHandler = async (req, res, next) => {
  try {
    const user = await authenticateWithToken(req.body.refresh_token, 'refresh');
    if (user) {
      await deleteToken(user.id);
      const newTokens = await createToken(user.id);
      delete newTokens.id;
      delete newTokens.user_id;
      res.status(200).json(newTokens);
    } else {
      throw new Error('Invalid token');
    }
  } catch (e) {
    next(e);
  }
};

module.exports = {
  signUpHandler,
  signInHandler,
  logoutHandler,
  refreshHandler,
  updateUserPasswordHandler,
};

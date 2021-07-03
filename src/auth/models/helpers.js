'use strict';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { getUserById, getUserByEmail } = require('./user');

// BASIC AUTH
async function authenticateBasic(email, password) {
  try {
    let user = await getUserByEmail(email);

    const valid = await bcrypt.compare(password, user.hashed_password);
    if (valid) {
      return user;
    }
    const error = new Error('Invalid User');
    error.statusCode = 403;
    throw error;
  } catch (e) {
    throw new Error(e);
  }
}

// BEARER AUTH
async function authenticateWithToken(token, type = 'access') {
  try {
    const parsedToken = jwt.verify(token, process.env.SECRET); //verify token

    if (parsedToken.token_type !== type) throw new Error('Invalid Token');

    const user = await getUserById(parsedToken.userId); // get user data from user table

    if (user) {
      return user;
    }
    const error = new Error('Invalid Token');
    error.statusCode = 403;
    throw error;
  } catch (e) {
    throw new Error(e);
  }
}

function getToken(userId, tokenType = 'access') {
  try {
    let payload = {
      userId,
      token_type: tokenType,
    };
    let expireDate = 300 * 20; // five minutes in seconds

    if (tokenType === 'refresh') {
      expireDate = 86400; // one day in seconds
    }

    return jwt.sign(payload, process.env.SECRET, { expiresIn: expireDate });
  } catch (e) {
    throw new Error(e);
  }
}

module.exports = {
  authenticateBasic,
  authenticateWithToken,
  getToken,
};

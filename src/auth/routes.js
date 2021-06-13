'use strict';

const express = require('express');
const authRouter = express.Router();

const authenticateBasic = require('./middleware/basic');
const authenticateBearer = require('./middleware/bearer');
const googleAuth = require('./oauth/google-oauth');
const { signUpHandler, signInHandler } = require('./controllers/authControllers');

authRouter.use(googleAuth); // calling google oauth

authRouter.post('/signup', signUpHandler);

authRouter.post('/signin', authenticateBasic, signInHandler);

authRouter.get('/test', authenticateBearer, (req, res, next) => {
  try {
    res.json(req.user);
  } catch (e) {
    next(e.message);
  }
});

module.exports = authRouter;

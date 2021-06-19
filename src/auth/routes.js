'use strict';

const express = require('express');
const authRouter = express.Router();

const authenticateBasic = require('./middleware/basic');
const authenticateBearer = require('./middleware/bearer');
const googleAuth = require('./oauth/google-oauth');
const { signUpHandler, signInHandler, logoutHandler, refreshHandler, updateUserPasswordHandler } = require('./controllers/authControllers');
const { verifyUserHandler, sendVerificationCodeHandler } = require('./controllers/verificationControllers');
const { sendPasswordCodeHandler, resetPasswordHandler } = require('./controllers/resetPasswordControllers');

authRouter.use(googleAuth); // calling google oauth

// Routes
authRouter.post('/signup', signUpHandler);
authRouter.post('/signin', authenticateBasic, signInHandler);
authRouter.get('/logout',authenticateBearer, logoutHandler);
authRouter.post('/refresh', refreshHandler);
authRouter.put('/user/password',authenticateBearer, updateUserPasswordHandler);

authRouter.post('/user/password/code', sendPasswordCodeHandler);
authRouter.post('/user/password/reset', resetPasswordHandler);

authRouter.post('/user/verify',authenticateBearer, verifyUserHandler);
authRouter.post('/user/verification',authenticateBearer, sendVerificationCodeHandler);


authRouter.get('/test', authenticateBearer, (req, res, next) => {
  try {
    res.json(req.user);
  } catch (e) {
    next(e.message);
  }
});

module.exports = authRouter;

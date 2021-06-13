'use strict';

const express = require('express');
const client = require('../models/db');
const authRouter = express.Router();

const authenticateBasic = require('./middleware/basic');
const authenticateBearer = require('./middleware/bearer');
const { createToken } = require('./models/jwt');
const {createUser,getEmail} = require('./models/user');
// const sendVerificationMail = require('./models/verification-sender');
const googleAuth = require('./oauth/google-oauth');


authRouter.use(googleAuth);   // calling google oauth

authRouter.post('/signup',async (req, res, next) => {

  try {
    let email = req.body.email;
    let password = req.body.password;
    if(!validateEmail(email)){
      res.status(403).json({message:'Please insert a valid email'});
      // throw new Error('Please insert a valid email');
      return;
    }
    if(!validatePassword(password)){
      res.status(403).json({message:'Please insert a valid password'});
      return;
      // throw new Error('Please insert a valid password');
    }

    console.log('req',req.body);
    let user = await getEmail(req.body.email);

    console.log('user data', user);
    if(!user) {
      user = await createUser(req.body);
      let userId = user.rows[0].id;
      console.log('id',userId);
      let userTokens = await createToken(userId);
      res.status(200).json(userTokens);
    }

    else {
      res.status(403).json({message: 'User already exist!'});
    }
  } catch (e) {
    console.log('error',e);
    next(e.message);
  }
});

authRouter.post('/signin', authenticateBasic, (req, res, next) => {
  try{
    // sendVerificationMail();
    res.status(200).json({
      userTokens: req.tokens,

    });
  
  }
  catch (e) {
    next(e.message);
  }

});

authRouter.get('/test', authenticateBearer, (req, res, next) => {
  try{
  
    res.json(req.user);

  
  }
  catch (e) {
    next(e.message);
  }

});


function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
function validatePassword(password) {
  const regularExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
  return regularExpression.test(password);
}

module.exports = authRouter;

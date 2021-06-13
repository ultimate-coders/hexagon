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
    // console.log('req',req.body);
    let user = await getEmail(req.body.email);
    console.log('email', user);
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

authRouter.get ('/client', async(req, res, next) => {
  try{
    let SQL =`select * from client;`;
    let data = await client.query(SQL);

    res.json(data.rows);

  }
  catch (e) {
    next(e.message);
  }

});

authRouter.get ('/jwt', async(req, res, next) => {
  try{
    let SQL =`select * from jwt;`;
    let data = await client.query(SQL);

    res.json(data.rows);

  }
  catch (e) {
    next(e.message);
  }

});

module.exports = authRouter;

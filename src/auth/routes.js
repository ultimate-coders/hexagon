'use strict';

const express = require('express');
const authRouter = express.Router();

// const User = require('./models/users.js');
const authenticateBasic = require('./middleware/basic');
const authenticateBearer = require('./middleware/bearer');
const { createToken } = require('./models/jwt');
// const client = require('../models/db.js');
const {createUser,getUser} = require('./models/user');

authRouter.post('/signup',async (req, res, next) => {

  try {
    console.log('req',req.body);
    let user = await getUser(req.body.user_name);
    console.log('user data', user);
    if(!user) {
      user = await createUser(req.body);
      let userTokens = await createToken(user.id);
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

module.exports = authRouter;

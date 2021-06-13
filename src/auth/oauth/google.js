'use strict';

const passportSetup = require('./passport-setup');

let googleFailed =(req, res, next) => {
  try{
    res.status(403).json({message: 'Sorry, something went wrong.'});
  }catch(e){
    throw new Error(e.message);
  }
};
  
let googleAuthCall =(passportSetup.authenticate('google', { scope: ['profile','email'] }));
  

module.exports = {googleAuthCall,googleFailed};
  
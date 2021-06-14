'use strict';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const{getUserById,getEmail} = require('./user');

// BASIC AUTH
async function authenticateBasic (email, password) {

  try{

    let user = await getEmail(email);

    const valid = await bcrypt.compare(password, user.hashed_password);
    if (valid) { return user; }
    throw new Error('Invalid User');

  }catch (e) {
    throw new Error (e);
  }
}
  
// BEARER AUTH
async function authenticateWithToken (token) {

  try {
    console.log('in authe function');
    const parsedToken = jwt.verify(token, process.env.SECRET);  //verify token
    const user = await getUserById(parsedToken.userId);   // get user data from user table

    if (user) { return user; }
    throw new Error('User Not Found');

  } catch (e) {
    throw new Error(e.message);
  }
}

function getToken(userId,tokenType = 'access'){

  try {

    let expireDate = 300;   // five minutes in seconds
  
    if(tokenType === 'refresh')
    
    {
      expireDate = 60*15;  // one day in seconds
    }
  
    return jwt.sign({userId}, process.env.SECRET,{ expiresIn: expireDate} );
  } catch (e) {
    throw new Error(e.message);
  }
 
}

module.exports = {authenticateBasic,authenticateWithToken,getToken};
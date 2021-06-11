'use strict';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const{getUser,getUserById} = require('./user');

// BASIC AUTH
async function authenticateBasic (username, password) {

  try{

    let user = await getUser(username);

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
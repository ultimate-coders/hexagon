'use strict';
const {updateToken} = require('../models/jwt');
// const base64 = require('base-64');
const {authenticateBasic} = require('../models/helpers');

module.exports = async (req, res, next) => {

  if (!req.headers.authorization) { return _authError(); }

  // let basic = req.headers.authorization.split(' ').pop();
  // let [pass] = base64.decode(basic).split(':');
  let password = req.body.password;  
  let email = req.body.email;
  // console.log('user password: ',password);
  // console.log('user email: ',email);

  try {

    let userData = await authenticateBasic(email, password);
    const userTokens = await updateToken(userData.id);
    req.user = userData;
    req.tokens = userTokens;
    next();

  } catch (e) {
    _authError();
  }

  function _authError() {
    res.status(403).send('Invalid Login');
  }

};

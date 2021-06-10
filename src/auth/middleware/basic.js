'use strict';
const {createToken} = require('../models/jwt');
const base64 = require('base-64');
const {authenticateBasic} = require('../models/helpers');
module.exports = async (req, res, next) => {

  if (!req.headers.authorization) { return _authError(); }

  let basic = req.headers.authorization.split(' ').pop();
  let [user, pass] = base64.decode(basic).split(':');

  try {

    let userData = await authenticateBasic(user, pass);
    const userTokens = await createToken(userData.id);
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

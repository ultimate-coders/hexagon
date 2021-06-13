'use strict';

const {authenticateWithToken} = require('../models/helpers');

module.exports = async (req, res, next) => {

  try {
    console.log('in bearer');

    if (!req.headers.authorization) { _authError(); }

    const token = req.headers.authorization.split(' ').pop();
    const validUser = await authenticateWithToken(token);
    console.log('validUser ----------',validUser);
    req.user = validUser;
    next();

  } catch (e) {
    _authError();
  }

  function _authError() {
    next('Invalid Login');
  }
};


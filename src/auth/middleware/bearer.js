'use strict';

const {authenticateWithToken} = require('../models/helpers');

module.exports = async (req, res, next) => {

  try {

    if (!req.headers.authorization) { _authError(); }

    const token = req.headers.authorization.split(' ').pop();
    const validUser = await authenticateWithToken(token);

    req.user = validUser;
    next();

  } catch (e) {
    _authError();
  }

  function _authError() {
    next('Invalid Login');
  }
};


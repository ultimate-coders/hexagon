'use strict';

const { authenticateWithToken } = require('../models/helpers');
const { getProfileByUserId } = require('../../models/userProfile');

module.exports = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      _authError();
    }

    const token = req.headers.authorization.split(' ').pop();
    const validUser = await authenticateWithToken(token);
    const userProfile = await getProfileByUserId(validUser.id);

    req.user = validUser;
    req.user.profile_id = userProfile.id;
    next();
  } catch (e) {
    _authError();
  }

  function _authError() {
    next('Invalid Login');
  }
};

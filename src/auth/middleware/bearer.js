'use strict';

const { authenticateWithToken } = require('../models/helpers');
const { getProfileByUserId } = require('../../models/userProfile');
const { getTokenRecord } = require('../models/jwt');
const { updateUserLastLogin } = require('../models/user');

module.exports = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      _authError();
    }

    const token = req.headers.authorization.split(' ').pop();

    const tokenRecord = await getTokenRecord(token, 'access');
    if(!tokenRecord) throw new Error('Invalid Login');

    const validUser = await authenticateWithToken(token);
    await updateUserLastLogin(validUser.id);
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

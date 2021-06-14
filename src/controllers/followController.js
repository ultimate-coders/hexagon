'use strict';

const { followModelHandler } = require('../models/follow');

const followHandler = async (req, res, next) => {
  try {
    req.body.follower = req.user.profile_id;
    let result = await followModelHandler(req.body);
    res.status(200).json({
      status: 200,
      message: 'Successfully updated',
    });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  followHandler,
};

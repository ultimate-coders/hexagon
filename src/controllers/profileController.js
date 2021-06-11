'use strict';

const { getAllProfiles } = require('../models/userProfile');

const getAllProfilesHandler = async (req, res, next) => {
  try {
    const keyword = req.query.keyword || '';
    const page = req.query.page || '1';

    const response = await getAllProfiles(keyword, page);
    res.status(200).json(response);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getAllProfilesHandler,
};

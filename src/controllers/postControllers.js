'use strict';

const { getAllPosts } = require('../models/post');

const getAllPostsHandler = async (req, res, next) => {
  try {
    const keyword = req.query.keyword || '';
    const page = req.query.page || '1';

    const response = await getAllPosts(keyword, page);
    res.status(200).json(response);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getAllPostsHandler,
};

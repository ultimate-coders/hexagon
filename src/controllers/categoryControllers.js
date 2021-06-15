'use strict';

const { getCategories } = require('../models/category');

const getCategoriesHandler = async (req, res, next) => {
  try {
    const categories = await getCategories();
    res.status(200).json(categories);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getCategoriesHandler,
};

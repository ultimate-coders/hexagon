'use strict';

const client = require('./db');

async function getCategories() {
  try {
    let sqlQuery = 'SELECT * FROM category;';
    let categoriesData = await client.query(sqlQuery);
    return categoriesData;
  } catch (e) {
    throw new Error(e);
  }
}

module.exports = {
  getCategories,
};

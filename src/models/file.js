'use strict';

const Client = require('./db');

async function saveFile(fileUrl) {
  try {
    let sqlQuery = 'INSERT INTO file (file) VALUES ($1) RETURNING *;';
    let safeValues = [fileUrl];
    let fileData = await Client.query(sqlQuery, safeValues);
    return fileData[0];
  } catch (e) {
    throw new Error(e);
  }
}

module.exports = {
  saveFile,
};

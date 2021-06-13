'use strict';

const Client = require('./db');

function File(fileObj) {
  this.id = fileObj.id;
  this.file = fileObj.file;
}

async function saveFile(files) {
  try {
    if (files.length > 0) {
      let sqlQuery = 'INSERT INTO user_file (file) VALUES ';
      let safeValues = [];
      files.forEach((file, i) => {
        if (i > 0) sqlQuery += ',';
        sqlQuery += `($${i + 1})`;
        safeValues.push(file.location);
      });
      sqlQuery += ' RETURNING *;';
      let fileData = await Client.query(sqlQuery, safeValues);
      let results = fileData.rows.map((file) => new File(file));
      return results;
    } else {
      return [];
    }
  } catch (e) {
    throw new Error(e);
  }
}

module.exports = {
  saveFile,
};

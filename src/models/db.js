const { Client } = require('pg');

const DATABASE_URL = process.env.TEST_MODE ? process.env.DATABASE_URL_TEST : process.env.DATABASE_URL;

//init pg client
const client = new Client({
  connectionString: DATABASE_URL,
  ssl: process.env.DEV_MODE ? false : { rejectUnauthorized: false },
});


module.exports = client;
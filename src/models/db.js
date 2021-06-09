const { Client } = require('pg');

//init pg clinet
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DEV_MODE ? false : { rejectUnauthorized: false },
});


module.exports = client;
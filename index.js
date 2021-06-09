'use strict';

require('dotenv').config();
const server = require('./src/server');
const pgClient = require('./src/models/db');


/* --------- Application start the server --------- */

pgClient
  .connect()
  .then(() => {
    server.start(process.env.PORT || 3000);
  })
  .catch((e) => console.log(e));
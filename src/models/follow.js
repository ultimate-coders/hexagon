'use strict';
const client = require('./db');
const { uuid } = require('uuid').v4;

// follow request
//follower : the person who want to follow someone
//following : the person that follower want to follow him

async function followModelHandler(data) {
  try {
    let SQL = `select * from follow where follower = $1 and following=$2;`;
    let safeValues = [data.follower, data.following];
    let query = await client.query(SQL, safeValues);
    if (query.rows.length === 0) {
      let id = uuid();
      let SQL = `INSERT INTO follow (id,follower,following) VALUES ($1,$2) returning * ;`;
      let safeValues = [id,data.follower, data.following];
      let result = await client.query(SQL, safeValues);
      return result.rows;
    } else {
      let SQL = `delete from follow where follower=$1 AND following=$2 returning *;`;
      let safeValues = [data.follower, data.following];
      let result = await client.query(SQL, safeValues);
      return result.rows;
    }
  } catch (e) {
    throw new Error(e);
  }
}

module.exports = {
  followModelHandler,
};

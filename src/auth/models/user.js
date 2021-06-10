'use strict';

const client = require('../../models/db');
const bcrypt = require('bcrypt');

async function createUser (data){
  
  try{

    let  SQL = `INSERT INTO client (user_name,hashed_password,email) VALUES ($1,$2,$3) RETURNING *;`;
    data.password = await bcrypt.hash(data.password, 10);

    let safeValues = [data.user_name,data.password,data.email];
    let usernameQuery = await client.query(SQL,safeValues);

    return usernameQuery;
  } catch (e) {
    throw new Error(e.message);
  }

}

async function getUser (username){

  try {

    let SQL = `SELECT * FROM client WHERE user_name=$1`;
    let checkUsername = [username];
    let usernameQuery = await client.query(SQL,checkUsername);

    return usernameQuery.rows[0];
  } catch (e) {
    throw new Error(e.message);
  }


}
async function getUserById (id){

  try {

    let SQL = `SELECT * FROM client WHERE id=$1`;
    let checkId = [id];
    let usernameQuery = await client.query(SQL,checkId);
        
    return usernameQuery.rows[0];
  } catch (e) {
    throw new Error(e.message);
  }

}

module.exports = {createUser,getUser,getUserById};
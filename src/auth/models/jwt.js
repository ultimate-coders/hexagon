/* eslint-disable no-unused-vars */
'use strict';

const client = require('../../models/db');
const { getToken } = require('../models/helpers');


async function createToken(user_id) {
  try {
    const accessToken = getToken(user_id);
    const refreshToken = getToken(user_id, 'refresh');
    let SQL = `INSERT INTO jwt (access_token,refresh_token,user_id) VALUES ($1,$2,$3) RETURNING *;`;
    let tokenValues = [accessToken, refreshToken, user_id];
    let tokenQuery = await client.query(SQL, tokenValues);
    return tokenQuery.rows[0];
  } catch (e) {
    throw new Error(e);
  }
}

// async function updateToken(user_id) {
//   try {
//     const accessToken = getToken(user_id);
//     const refreshToken = getToken(user_id, 'refresh');
//     let SQL = `UPDATE jwt SET access_token=$1,refresh_token=$2 WHERE user_id=$3;`;
//     let tokenValues = [accessToken, refreshToken, user_id];
//     let tokenQuery = await client.query(SQL, tokenValues);
//     return { accessToken, refreshToken };
//   } catch (e) {
//     throw new Error(e);
//   }
// }

async function deleteToken(user_id) {
  try {
    let SQL = `DELETE from jwt WHERE user_id=$1;`;
    let removeToken = [user_id];
    let tokenQuery = await client.query(SQL, removeToken);
    return tokenQuery;
  } catch (e) {
    throw new Error(e);
  }
}

async function getTokenByUserId(user_id) {
  try {
    let SQL = `SELECT access_token,refresh_token from jwt WHERE user_id=$1;`;
    let getToken = [user_id];
    let tokenQuery = await client.query(SQL, getToken);
    return tokenQuery.rows[0];
  } catch (e) {
    throw new Error(e);
  }
}

async function getTokenRecord(token, type='access') {
  try {
    let SQL = `SELECT * from jwt WHERE access_token=$1;`;
    if(type === 'refresh') SQL = `SELECT * from jwt WHERE refresh_token=$1;`;

    let getToken = [token];
    let tokenQuery = await client.query(SQL, getToken);
    return tokenQuery.rows[0];
  } catch (e) {
    throw new Error(e);
  }
}

module.exports = { createToken, deleteToken, getTokenByUserId, getTokenRecord };

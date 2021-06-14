'use strict';

const client = require('../../models/db');

const bcrypt = require('bcrypt');

async function createUser(data) {
  try {
    let usernameQuery;
    if (data.provider === 'google') {
      let googleUser = data.name.givenName;
      let googleEmail = data._json.email;
      let googleId = data.id;
      let userPassword = randomGenerator(10);

      let SQL = `INSERT INTO client (user_name,hashed_password,email,google_id, verified) VALUES ($1,$2,$3,$4, true) RETURNING *;`;
      userPassword = await bcrypt.hash(userPassword, 10);

      let safeValues = [googleUser, userPassword, googleEmail, googleId];
      usernameQuery = await client.query(SQL, safeValues);
    } else {
      let SQL = `INSERT INTO client (user_name,hashed_password,email) VALUES ($1,$2,$3) RETURNING *;`;
      data.password = await bcrypt.hash(data.password, 10);
      let user = data.user_name.toLowerCase().trim(); // make user_name a lower case.
      let email = data.email.toLowerCase().trim(); // make email a lower case.

      let safeValues = [user, data.password, email];
      usernameQuery = await client.query(SQL, safeValues);
    }
    return usernameQuery.rows[0];
  } catch (e) {
    throw new Error(e.message);
  }
}

async function updateUserPassword(user_id, user_password) {
  try {
    const hashed_password = await bcrypt.hash(user_password, 10);
    const SQL = `UPDATE client SET hashed_password = $1 WHERE id = $2 RETURNING *;`;

    const safeValues = [hashed_password, user_id];
    const result = await client.query(SQL, safeValues);
    return result.rows[0];
  } catch (e) {
    throw new Error(e.message);
  }
}

async function updateUserVerification(user_id) {
  try {
    const SQL = `UPDATE client SET verified = true WHERE id = $1 RETURNING *;`;

    const safeValues = [user_id];
    const result = await client.query(SQL, safeValues);
    return result.rows[0];
  } catch (e) {
    throw new Error(e.message);
  }
}

async function getUser(username) {
  try {
    let SQL = `SELECT * FROM client WHERE user_name=$1`;
    let checkUsername = [username];
    let usernameQuery = await client.query(SQL, checkUsername);
    return usernameQuery.rows[0];
  } catch (e) {
    throw new Error(e.message);
  }
}

async function getUserByEmail(email) {
  try {
    let SQL = `SELECT * FROM client WHERE email=$1;`;
    let emailCheck = [email];
    let userEmailQuery = await client.query(SQL, emailCheck);

    return userEmailQuery.rows[0];
  } catch (e) {
    throw new Error(e.message);
  }
}

async function getUserById(id, idType = 'primary') {
  try {
    let usernameQuery;

    if (idType === 'google') {
      let SQL = `SELECT * FROM client WHERE google_id=$1`;
      let checkId = [id];
      usernameQuery = await client.query(SQL, checkId);
    } else {
      let SQL = `SELECT * FROM client WHERE id=$1`;
      let checkId = [id];
      usernameQuery = await client.query(SQL, checkId);
    }

    return usernameQuery.rows[0];
  } catch (e) {
    throw new Error(e.message);
  }
}

function randomGenerator(length) {
  var result = '';
  var characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

module.exports = { createUser, getUser, getUserById, getUserByEmail, updateUserPassword, updateUserVerification, randomGenerator };

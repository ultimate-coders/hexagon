'use strict';

const client = require('./db');
const { PAGE_SIZE } = require('../configurations');

// Constructors (data formatters)
// For creating a profile record
function UserProfile(profileObj) {
  this.user_id = profileObj.user_id;
  this.first_name = profileObj.first_name || '';
  this.last_name = profileObj.last_name || '';
  this.caption = profileObj.caption || '';
  this.profile_picture = profileObj.profile_picture || null;
}

// To format the response
function Profile(profile) {
  this.id = profile.profile_id;
  this.first_name = profile.first_name || '';
  this.last_name = profile.last_name || '';
  this.caption = profile.caption || '';
  this.profile_picture = {
    id: profile.file_id || '',
    link: profile.profile_picture || 'Link to default profile picture',
  };
  this.user = {
    id: profile.user_id,
    username : profile.user_name,
    email: profile.email,
  };
}

// Get all profiles
async function getAllProfiles(keyword = '', pageNumber = 1) {
  try {
    let sqlQuery = `
    SELECT profile.id AS profile_id, client.id AS user_id, user_file.id as file_id, first_name, last_name, caption, file as profile_picture, user_name, email FROM profile JOIN client ON profile.user_id = client.id JOIN user_file ON profile.profile_picture = user_file.id ORDER BY profile.id DESC LIMIT $1 OFFSET $2;
    `;
    let startFrom = (pageNumber - 1) * PAGE_SIZE;
    let safeValues = [PAGE_SIZE + 1, startFrom];
    // Filtering
    if(keyword && keyword !== ''){
      keyword = `%${keyword}%`;
      sqlQuery = `
      SELECT profile.id AS profile_id, client.id AS user_id, user_file.id as file_id, first_name, last_name, caption, file as profile_picture, user_name, email FROM profile JOIN client ON profile.user_id = client.id JOIN user_file ON profile.profile_picture = user_file.id WHERE UPPER(first_name) LIKE UPPER($1) OR UPPER(last_name) LIKE UPPER($1) OR UPPER(user_name) LIKE UPPER($1) OR UPPER(email) LIKE UPPER($1) ORDER BY profile.id DESC LIMIT $2 OFFSET $3;
      `;
      safeValues = [keyword, PAGE_SIZE + 1, startFrom];
    }
    // Query the database
    const profilesData = await client.query(sqlQuery, safeValues);
    const hasNext = profilesData.rowCount > PAGE_SIZE;
    let results = profilesData.rows.map(profile => new Profile(profile));
    if(hasNext)  results = results.slice(0, -1);
    const response = {
      count: profilesData.rowCount - 1,
      hasNext: hasNext,
      results: results,
    };
    return response;   
  } catch (e) {
    throw new Error(e);
  }
}

// Get one profile
async function getSingleProfile(id) {
  try {
    let sqlQuery = `
    SELECT profile.id AS profile_id, client.id AS user_id, user_file.id as file_id, first_name, last_name, caption, file as profile_picture, user_name, email FROM profile JOIN client ON profile.user_id = client.id JOIN user_file ON profile.profile_picture = user_file.id WHERE profile.id = $1;
    `;
    let safeValues = [id];
    // Query the database
    const profileData = await client.query(sqlQuery, safeValues);
    const response = new Profile(profileData.rows[0]);
    return response;
  } catch (e) {
    throw new Error(e);
  }
}

// Get profile by user id
async function getProfileByUserId(id) {
  try {
    let sqlQuery = `
    SELECT profile.id AS profile_id, client.id AS user_id, user_file.id as file_id, first_name, last_name, caption, file as profile_picture, user_name, email FROM profile JOIN client ON profile.user_id = client.id JOIN user_file ON profile.profile_picture = user_file.id WHERE client.id = $1;
    `;
    let safeValues = [id];
    // Query the database
    const profileData = await client.query(sqlQuery, safeValues);
    const response = new Profile(profileData.rows[0]);
    return response;
  } catch (e) {
    throw new Error(e);
  }
}

// Create user profile (Need to be enhanced the response like the get all)
async function createProfile(profileObj) {
  try {
    let sqlQuery = 'INSERT INTO profile (user_id, first_name, last_name, caption, profile_picture) VALUES ($1, $2, $3, $4 , $5) RETURNING *;';
    let profile = new UserProfile(profileObj);
    let safeValues = [profile.user_id, profile.first_name, profile.last_name, profile.caption, profile.profile_picture];
    // Query the database
    let profileData = await client.query(sqlQuery, safeValues);
    if(profileData.rowCount>0){
      sqlQuery = `
      SELECT profile.id AS profile_id, client.id AS user_id, user_file.id as file_id, first_name, last_name, caption, file as profile_picture, user_name, email FROM profile JOIN client ON profile.user_id = client.id JOIN user_file ON profile.profile_picture = user_file.id WHERE profile.id = $1;
      `;
      safeValues = [profileData.rows[0].id];
      profileData = await client.query(sqlQuery, safeValues);
      profile = new Profile(profileData.rows[0]);
      return profile;
    }
    throw new Error('Something went wrong!');
  } catch (e) {
    throw new Error(e);
  }
}

// Update user profile (Need to be enhanced the response like the get all)
async function updateProfile(id, profileObj) {
  try {
    let sqlQuery = 'UPDATE profile SET first_name = $1, last_name = $2, caption = $3, profile_picture = $4 WHERE id = $5 RETURNING *;';
    let profile = new UserProfile(profileObj);
    let safeValues = [profile.first_name, profile.last_name, profile.caption, profile.profile_picture, id];
    // Query the database
    let profileData = await client.query(sqlQuery, safeValues);
    if(profileData.rowCount>0){
      sqlQuery = `
      SELECT profile.id AS profile_id, client.id AS user_id, user_file.id as file_id, first_name, last_name, caption, file as profile_picture, user_name, email FROM profile JOIN client ON profile.user_id = client.id JOIN user_file ON profile.profile_picture = user_file.id WHERE profile.id = $1;
      `;
      safeValues = [profileData.rows[0].id];
      profileData = await client.query(sqlQuery, safeValues);
      profile = new Profile(profileData.rows[0]);
      return profile;
    }
    throw new Error('Something went wrong!');
  } catch (e) {
    throw new Error(e);
  }
}

module.exports = {
  getAllProfiles,
  getSingleProfile,
  getProfileByUserId,
  createProfile,
  updateProfile,
};

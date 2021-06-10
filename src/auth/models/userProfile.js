'use strict';

const client = require('../../models/db');
const PAGE_SIZE = require('../../configrations');

// Constructors (data formatters)
// For creating a profile record
function UserProfile(profileObj) {
  this.user_id = profileObj.user_id;
  this.first_name = profileObj.first_name || '';
  this.last_name = profileObj.last_name || '';
  this.caption = profileObj.caption || '';
  this.profile_picture_id = profileObj.profile_picture_id || '';
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
    let safeValues = [PAGE_SIZE, startFrom];
    // Filtering
    if(keyword && keyword !== ''){
      keyword = `%${keyword}%`;
      sqlQuery = `
      SELECT profile.id AS profile_id, client.id AS user_id, user_file.id as file_id, first_name, last_name, caption, file as profile_picture, user_name, email FROM profile JOIN client ON profile.user_id = client.id JOIN user_file ON profile.profile_picture = user_file.id WHERE UPPER(first_name) LIKE UPPER($1) OR UPPER(last_name) LIKE UPPER($1) OR UPPER(user_name) LIKE UPPER($1) OR UPPER(email) LIKE UPPER($1) ORDER BY profile.id DESC LIMIT $1 OFFSET $2;
      `;
      safeValues = [keyword, PAGE_SIZE, pageNumber];
    }
    const hasNext = parseInt(profilesData.rowCount) > startFrom + PAGE_SIZE;
    // Query the database
    const profilesData = await client.query(sqlQuery, safeValues);
    const response = {
      results: profilesData.rows.map(profile => new Profile(profile)),
      count: profilesData.rowCount,
      hasNext: hasNext,
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
    SELCET user_profile.id AS user_profile_id, user.id AS user_id, files.id as file_id, first_name, last_name, caption, file, username, email, FROM user_profile JOIN user ON user_profile.user_id = user.id JOIN files ON user_profile.profile_picture_id = files.id WHERE user_profile.id = $1;
    `;
    let safeValues = [id];
    // Query the database
    const profileData = await client.query(sqlQuery, safeValues);
    const response = new Profile(profileData[0]);
    return response;
  } catch (e) {
    throw new Error(e);
  }
}

// Create user profile (Need to be enchanded the response like the get all)
async function createProfile(profileObj) {
  try {
    let sqlQuery = 'INSERT INTO user_profile (user_id, first_name, last_name, caption, profile_picture_id) VALUES ($1, $2, $3, $4 , $5);';
    let profile = new UserProfile(profileObj);
    let safeValues = [profile.user_id, profile.first_name, profile.last_name, profile.caption, profile.profile_picture_id];
    // Query the database
    const profileData = await client.query(sqlQuery, safeValues);
    const response = new UserProfile(profileData[0]);
    return response;
  } catch (e) {
    throw new Error(e);
  }
}

// Update user profile (Need to be enchanded the response like the get all)
async function updateProfile(id, profileObj) {
  try {
    let sqlQuery = 'UPDATE user_profile SET user_id = $1, first_name = $2, last_name = $3, caption = $4, profile_picture_id = $5 RETURNING id;';
    let profile = new UserProfile(profileObj);
    let safeValues = [profile.user_id, profile.first_name, profile.last_name, profile.caption, profile.profile_picture_id];
    // Query the database
    const profileData = await client.query(sqlQuery, safeValues);
    return profile;
  } catch (e) {
    throw new Error(e);
  }
}

module.exports = {
  getAllProfiles,
  getSingleProfile,
  createProfile,
  updateProfile,
};

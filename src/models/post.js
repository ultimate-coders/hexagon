'use strict';

const client = require('./db');
const PAGE_SIZE = require('../configrations');

// Constructors (data formatters)
// For creating a profile record
function UserPost(postObj) {
  this.category_id = postObj.category_id;
  this.user_id = postObj.user_id;
  this.text = postObj.text;
  this.attachment_id = postObj.attachment_id;
}

// To format the response
function Post(post) {
  this.text = post.text;
  this.category = {
    id: post.category_id,
    name: post.category_name,
  };
  this.profile = {
    id: post.profile_id,
    first_name: post.first_name,
    last_name: post.last_name,
    caption: post.caption,
    profile_picture : {
      id: post.file_id || '',
      link: post.profile_picture || 'Link to default profile picture',
    },
    user: {
      id: post.user_id,
      username: post.user_name,
      email: post.email,
    },
  };
  this.images = [];
}

// Get all posts
async function getAllPosts(categoryId = '', pageNumber = 1) {
  try {
    let sqlQuery = `
    SELECT post.id AS post_id, profile.id AS profile_id, user_file.id AS file_id, file AS profile_picture, client.id AS user_id, catigory.id AS category_id, name AS category_name, text, first_name, last_name, caption, file as profile_picture, user_name, email FROM post JOIN profile ON post.profile_id = profile.id JOIN client ON client.id = profile.user_id JOIN catigory ON post.catigory_id = catigory.id JOIN user_file ON profile.profile_picture = user_file.id ORDER BY post.id DESC LIMIT $1 OFFSET $2;
    `;
    let safeValues = [PAGE_SIZE, pageNumber];
    // Filtering
    if(keyword && keyword !== ''){
      keyword = `%${keyword}%`;
      sqlQuery = 'SELCET user_profile.id AS user_profile_id, user.id AS user_id, files.id AS file_id, first_name, last_name, caption, files.file as profile_image, username, email, FROM user_profile JOIN user ON user_profile.user_id = user.id JOIN files ON user_profile.profile_picture_id = files.id WHERE UPPER(first_name) LIKE UPPER($1) OR UPPER(last_name) LIKE UPPER($1) OR UPPER(username) LIKE UPPER($1) OR UPPER(email) LIKE UPPER($1) ORDER BY user_profile.id DESC LIMIT $1 OFFSET $2;';
      safeValues = [keyword, PAGE_SIZE, pageNumber];
    }
    // Query the database
    const profilesData = await client.query(sqlQuery, safeValues);
    const response = {
      results: profilesData.rows.map(profile => new Profile(profile)),
      count: profilesData.rowCount,
      has_next: parseInt(profilesData.rowCount) > pageNumber + PAGE_SIZE,
    };
    return response;   
  } catch (e) {
    throw new Error(e);
  }
}
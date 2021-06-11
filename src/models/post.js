'use strict';

const client = require('./db');
const { PAGE_SIZE } = require('../configurations');

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
async function getAllPosts(categoryName = '', pageNumber = 1) {
  try {
    let sqlQuery = `
    SELECT post.id AS post_id, profile.id AS profile_id, user_file.id AS file_id, file AS profile_picture, client.id AS user_id, category.id AS category_id, name AS category_name, text, first_name, last_name, caption, file as profile_picture, user_name, email FROM post JOIN profile ON post.profile_id = profile.id JOIN client ON client.id = profile.user_id JOIN category ON post.category_id = category.id JOIN user_file ON profile.profile_picture = user_file.id ORDER BY post.id DESC LIMIT $1 OFFSET $2;
    `;
    let startFrom = (pageNumber - 1) * PAGE_SIZE;
    let safeValues = [PAGE_SIZE, startFrom];
    // Filtering
    if(categoryName && categoryName !== ''){
      sqlQuery = `
      SELECT post.id AS post_id, profile.id AS profile_id, user_file.id AS file_id, file AS profile_picture, client.id AS user_id, category.id AS category_id, name AS category_name, text, first_name, last_name, caption, file as profile_picture, user_name, email FROM post JOIN profile ON post.profile_id = profile.id JOIN client ON client.id = profile.user_id JOIN category ON post.category_id = category.id JOIN user_file ON profile.profile_picture = user_file.id WHERE category_name = $1 ORDER BY post.id DESC LIMIT $2 OFFSET $3;
      `;
      startFrom = (pageNumber - 1) * PAGE_SIZE;
      safeValues = [categoryName, PAGE_SIZE, startFrom];
    }
    // Query the database
    const postsData = await client.query(sqlQuery, safeValues);
    console.log(postsData.rows);
    const hasNext = parseInt(postsData.rowCount) > startFrom + PAGE_SIZE;
    const response = {
      results: postsData.rows.map(post => new Post(post)),
      count: postsData.rowCount,
      hasNext,
    };
    return response;   
  } catch (e) {
    throw new Error(e);
  }
}

// Get single post
async function getSinglePost(id, pageNumber = 1) {
  try {
    let sqlQuery = `
    SELECT post.id AS post_id, profile.id AS profile_id, user_file.id AS file_id, file AS profile_picture, client.id AS user_id, category.id AS category_id, name AS category_name, text, first_name, last_name, caption, file as profile_picture, user_name, email FROM post JOIN profile ON post.profile_id = profile.id JOIN client ON client.id = profile.user_id JOIN category ON post.category_id = category.id JOIN user_file ON profile.profile_picture = user_file.id WHERE post.id = $1;
    `;
    // Filtering
    let safeValues = [id];
    // Query the database
    const postsData = await client.query(sqlQuery, safeValues);
    const post = new UserPost(postsData.rows[0]);
    return post;   
  } catch (e) {
    throw new Error(e);
  }
}

// Create post
async function createPost(postObj) {
  try {
    let sqlQuery = `
    INSERT INTO post (profile_id, text, category_id) VALUES ($1, $2, $3);
    `;
    let post = new UserPost(postObj);
    let safeValues = [post.profile_id, post.text, post.category_id];
    // Query the database
    const postsData = await client.query(sqlQuery, safeValues);
    return post;   
  } catch (e) {
    throw new Error(e);
  }
}

// Create post
async function updatePost(id, postObj) {
  try {
    let sqlQuery = `
    UPDATE post SET text = $1, category_id = $2 WHERE id = $3 RETURNING *;
    `;
    let post = new UserPost(postObj);
    let safeValues = [post.text, post.category_id];
    // Query the database
    const postsData = await client.query(sqlQuery, safeValues);
    return post;   
  } catch (e) {
    throw new Error(e);
  }
}


module.exports = {
  getAllPosts,
  getSinglePost,
  createPost,
  updatePost,
};
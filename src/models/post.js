'use strict';

const client = require('./db');
const { PAGE_SIZE } = require('../configurations');

// Constructors (data formatters)
// For creating a profile record
function UserPost(postObj) {
  this.category_id = postObj.category_id;
  this.profile_id = postObj.profile_id;
  this.text = postObj.text;
}

// For formatting the image file response
function Image(imageObj) {
  this.id = imageObj.file_id;
  this.link = imageObj.link;
}

// To format the response
function Post(post,likes) {
  this.id = post.post_id;
  this.text = post.text;
  this.created_at = post.created_at;
  this.am_like = post.am_like ? true : false;
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
      last_login: post.last_login,
    },
  };
  this.likes = parseInt(likes);
  this.images = [{
    id: post.image_id,
    link: post.image_link,
  }];
}

// Get all posts
async function getAllPosts(loggedInUserProfileId, categoryName, pageNumber = 1) {
  try {
    let sqlQuery = `
    SELECT post.id AS post_id, post.created_at, profile.id AS profile_id, profile_image.id AS file_id, profile_image.file AS profile_picture, client.id AS user_id, client.last_login as last_login, category.id AS category_id, name AS category_name, text, first_name, last_name, caption, user_name, email, post_image.id AS image_id, post_image.file AS image_link ,likes, am_like.like as am_like FROM post JOIN profile ON post.profile_id = profile.id JOIN client ON client.id = profile.user_id JOIN category ON post.category_id = category.id LEFT JOIN user_file AS profile_image ON profile.profile_picture = profile_image.id LEFT JOIN attachment ON attachment.post_id = post.id LEFT JOIN user_file AS post_image ON attachment.file_id = post_image.id left join (select post_id, count(*) from interaction  group by post_id) as likes on likes.post_id = post.id left join (select post_id, count(*) as like from interaction where profile_id=$1 group by post_id ) as am_like on am_like.post_id = post.id ORDER BY post.created_at DESC LIMIT $2 OFFSET $3;
    `;
    let startFrom = (parseInt(pageNumber) - 1) * PAGE_SIZE;
    let safeValues = [loggedInUserProfileId, PAGE_SIZE + 1, startFrom];
    // Filtering
    if(categoryName && categoryName !== ''){
      sqlQuery = `
      SELECT post.id AS post_id, post.created_at, profile.id AS profile_id, profile_image.id AS file_id, profile_image.file AS profile_picture, client.id AS user_id, client.last_login as last_login, category.id AS category_id, name AS category_name, text, first_name, last_name, caption, user_name, email, post_image.id AS image_id, post_image.file AS image_link ,likes, am_like.like as am_like FROM post JOIN profile ON post.profile_id = profile.id JOIN client ON client.id = profile.user_id JOIN category ON post.category_id = category.id LEFT JOIN user_file AS profile_image ON profile.profile_picture = profile_image.id LEFT JOIN attachment ON attachment.post_id = post.id LEFT JOIN user_file AS post_image ON attachment.file_id = post_image.id left join (select post_id, count(*) from interaction  group by post_id) as likes on likes.post_id = post.id left join (select post_id, count(*) as like from interaction where profile_id=$1 group by post_id ) as am_like on am_like.post_id = post.id WHERE category.name = $2 ORDER BY post.created_at DESC LIMIT $3 OFFSET $4;
      `;
      startFrom = (parseInt(pageNumber) - 1) * PAGE_SIZE;
      safeValues = [loggedInUserProfileId, categoryName, PAGE_SIZE + 1, startFrom];
    }
    // Query the database
    const postsData = await client.query(sqlQuery, safeValues);
    const hasNext = postsData.rowCount > PAGE_SIZE;
    let results = postsData.rows.map(post => {
      let likes = post.likes? post.likes.split(',')[1].split(')')[0]:0;
      return new Post(post,likes);
    });
    if(hasNext)  results = results.slice(0, -1);
    const response = {
      page: pageNumber,
      hasNext: hasNext,
      results: results,
    };
    return response; 
  } catch (e) {
    throw new Error(e);
  }
}

// Get all posts by profile
async function getTimelinePosts(loggedInUserProfileId, pageNumber = 1) {
  try {
    let sqlQuery = `
    SELECT post.id AS post_id, post.created_at, profile.id AS profile_id, profile_image.id AS file_id, profile_image.file AS profile_picture, client.id AS user_id, client.last_login as last_login, category.id AS category_id, name AS category_name, text, first_name, last_name, caption, user_name, email, post_image.id AS image_id, post_image.file AS image_link ,likes, am_like.like as am_like FROM post JOIN profile ON post.profile_id = profile.id JOIN client ON client.id = profile.user_id JOIN category ON post.category_id = category.id LEFT JOIN user_file AS profile_image ON profile.profile_picture = profile_image.id LEFT JOIN attachment ON attachment.post_id = post.id LEFT JOIN user_file AS post_image ON attachment.file_id = post_image.id left join (select post_id, count(*) from interaction  group by post_id) as likes on likes.post_id = post.id left join (select post_id, count(*) as like from interaction where profile_id=$1 group by post_id ) as am_like on am_like.post_id = post.id WHERE post.profile_id in (SELECT following FROM follow WHERE follower = $1 OR following = $1) ORDER BY post.created_at DESC LIMIT $2 OFFSET $3;
    `;
    let startFrom = (parseInt(pageNumber) - 1) * PAGE_SIZE;
    let safeValues = [loggedInUserProfileId, PAGE_SIZE + 1, startFrom];
    // Query the database
    const postsData = await client.query(sqlQuery, safeValues);
    const hasNext = postsData.rowCount > PAGE_SIZE;
    let results = postsData.rows.map(post => {
      let likes=post.likes? post.likes.split(',')[1].split(')')[0]:0;
      return new Post(post,likes);
    });

    if(hasNext)  results = results.slice(0, -1);
    const response = {
      page: pageNumber,
      hasNext: hasNext,
      results: results,
    };
    return response; 
  } catch (e) {
    throw new Error(e);
  }
}

// Get all posts for specific profile
async function getProfilePosts(requesterId, profileId, pageNumber = 1) {
  try {
    let sqlQuery = `
    SELECT post.id AS post_id, post.created_at, profile.id AS profile_id, profile_image.id AS file_id, profile_image.file AS profile_picture, client.id AS user_id, client.last_login as last_login, category.id AS category_id, name AS category_name, text, first_name, last_name, caption, user_name, email, post_image.id AS image_id, post_image.file AS image_link ,likes, am_like.like as am_like FROM post JOIN profile ON post.profile_id = profile.id JOIN client ON client.id = profile.user_id JOIN category ON post.category_id = category.id LEFT JOIN user_file AS profile_image ON profile.profile_picture = profile_image.id LEFT JOIN attachment ON attachment.post_id = post.id LEFT JOIN user_file AS post_image ON attachment.file_id = post_image.id left join (select post_id, count(*) from interaction  group by post_id) as likes on likes.post_id = post.id left join (select post_id, count(*) as like from interaction where profile_id=$1 group by post_id ) as am_like on am_like.post_id = post.id WHERE post.profile_id = $2  ORDER BY post.created_at DESC LIMIT $3 OFFSET $4;
    `;
    let startFrom = (parseInt(pageNumber) - 1) * PAGE_SIZE;
    let safeValues = [requesterId, profileId, PAGE_SIZE + 1, startFrom];
    // Query the database
    const postsData = await client.query(sqlQuery, safeValues);
    const hasNext = postsData.rowCount > PAGE_SIZE;
    let results = postsData.rows.map(post => {
      let likes=post.likes? post.likes.split(',')[1].split(')')[0]:0;
      return new Post(post,likes);
    });

    if(hasNext)  results = results.slice(0, -1);
    const response = {
      page: pageNumber,
      hasNext: hasNext,
      results: results,
    };
    return response; 
  } catch (e) {
    throw new Error(e);
  }
}

// Get single post
async function getSinglePost(loggedInUserProfileId, id) {
  try {
    let sqlQuery = `
    SELECT post.id AS post_id, post.created_at, profile.id AS profile_id, user_file.id AS file_id, file AS profile_picture, client.id AS user_id, client.last_login as last_login, category.id AS category_id, name AS category_name, text, first_name, last_name, caption, file as profile_picture, user_name, email ,likes, am_like.like as am_like FROM (select count(*) from interaction where post_id=$2) as likes,post JOIN profile ON post.profile_id = profile.id JOIN client ON client.id = profile.user_id JOIN category ON post.category_id = category.id LEFT JOIN user_file ON profile.profile_picture = user_file.id left join (select post_id, count(*) as like from interaction where profile_id=$1 group by post_id ) as am_like on am_like.post_id = post.id WHERE post.id = $2;
    `;
    // Filtering
    let safeValues = [loggedInUserProfileId, id];
    // Query the database
    const postsData = await client.query(sqlQuery, safeValues);

    let likes=postsData.rows[0].likes? postsData.rows[0].likes.split('(')[1].split(')')[0]:0;

    const post = new Post(postsData.rows[0],likes);

    let imageSqlQuery = `
    SELECT user_file.id AS file_id, file AS link FROM attachment LEFT JOIN user_file ON attachment.file_id = user_file.id WHERE attachment.post_id = $1;
    `;
    safeValues = [id];
    let attachments = await client.query(imageSqlQuery, safeValues);
    post['images'] = attachments.rows.map(image => new Image(image));
    return post;   
  } catch (e) {
    throw new Error(e);
  }
}

// Create post
async function createPost(loggedInUserProfileId, postObj) {
  try {
    let sqlQuery = `
    INSERT INTO post (profile_id, text, category_id) VALUES ($1, $2, $3) RETURNING *;
    `;
    let post = new UserPost(postObj);
    let safeValues = [post.profile_id, post.text, post.category_id];
    // Query the database
    const postsData = await client.query(sqlQuery, safeValues);
    let attachmentsSqlQuery = 'INSERT INTO attachment (post_id, file_id) VALUES ';
    safeValues = [postsData.rows[0].id];
    let attachmentData;

    if(postObj.images && postObj.images.length > 0){
      postObj.images.forEach((image_id, i) => {
        if(i > 0) attachmentsSqlQuery += ',';
        attachmentsSqlQuery += `($1, $${i+2}) `;
        safeValues.push(image_id);
      });
      attachmentsSqlQuery += 'RETURNING post_id;';
      attachmentData = await client.query(attachmentsSqlQuery, safeValues);
    }
    const result = await getSinglePost(loggedInUserProfileId, postsData.rows[0].id);
    return result;   
  } catch (e) {
    throw new Error(e);
  }
}

// Update post
async function updatePost(loggedInUserProfileId, id, postObj) {
  try {
    let sqlQuery = `
    UPDATE post SET text = $1, category_id = $2 WHERE id=$3 RETURNING id;
    `;

    // console.log(postObj)
    let post = new UserPost(postObj);
    
    let safeValues = [post.text, post.category_id, id];
    // Query the database
    const postsData = await client.query(sqlQuery, safeValues);
    let attachmentsSqlQuery = 'INSERT INTO attachment (post_id, file_id) VALUES ';
    safeValues = [postsData.rows[0].id];

    if(postObj.images && postObj.images.length > 0){
      let deleteAttachmentQuery = `
      DELETE FROM attachment WHERE id = $1;
      `;
      await client.query(deleteAttachmentQuery, [postsData.rows[0].id]);

      postObj.images.forEach((image_id, i) => {
        if(i > 0) attachmentsSqlQuery += ',';
        attachmentsSqlQuery += `($1, $${i+2}) `;
        safeValues.push(image_id);
      });
      attachmentsSqlQuery += ';';
      let attachmentData = await client.query(attachmentsSqlQuery, safeValues);
    }
    const result = await getSinglePost(loggedInUserProfileId, postsData.rows[0].id);
    return result;    

  } catch (e) {
    throw new Error(e);
  }
}


// Update post
async function deletePost(id) {
  try {
    let sqlQuery = `
    DELETE FROM post WHERE id = $1;
    `;
    let safeValues = [id];

    let response = await client.query(sqlQuery, safeValues);
    return response.rows;
  } catch (e) {
    throw new Error(e);
  }
}


module.exports = {
  getAllPosts,
  getSinglePost,
  createPost,
  updatePost,
  deletePost,
  getTimelinePosts,
  getProfilePosts,
};
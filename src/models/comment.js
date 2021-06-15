'use strict';

const client = require('./db');
const {PAGE_SIZE} = require('../configurations');

function PostComment(commentObj) {
  this.id = commentObj.comment_id;
  this.comment = commentObj.comment;
  this.post_owner = commentObj.post_owner || null;
  this.profile = {
    id: commentObj.profile_id,
    first_name: commentObj.first_name,
    last_name: commentObj.last_name,
    profile_picture: commentObj.profile_picture || 'https://hexagon-sm.s3.eu-central-1.amazonaws.com/male.jpg',
  };
}

async function getPostComments(postId, pageNumber = 1) {
  try {
    let SQL = `select comment.id AS comment_id, comment, comment.profile_id, first_name, last_name, file AS profile_picture  from comment join profile on comment.profile_id = profile.id left join user_file on profile.profile_picture = user_file.id where post_id = $1 ORDER BY comment.created_at DESC LIMIT $2 OFFSET $3 ;`;
    let startFrom = (parseInt(pageNumber) - 1) * PAGE_SIZE;
    let safeValue = [postId, PAGE_SIZE + 1, startFrom];

    let query = await client.query(SQL, safeValue);
    const hasNext = query.rowCount > PAGE_SIZE;
    let results = query.rows.map(comment => new PostComment(comment));
    if(hasNext) results = results.slice(0, -1);
    const response = {
      count: results.length,
      hasNext: hasNext,
      results: results,
    };
    return response; 
  } catch (e) {
    throw new Error(e);
  }
}

async function createComment(data) {
  try {
    let SQL = `INSERT INTO comment (comment,profile_id,post_id) VALUES ($1,$2,$3) returning id;`;
    let safeValues = [
      data.body.comment,
      data.user.profile_id,
      data.body.post_id,
    ];
    let result = await client.query(SQL, safeValues);
    
    SQL = `select comment.id AS comment_id, comment, comment.profile_id, first_name, last_name, file AS profile_picture, post.profile_id AS post_owner from comment join profile on comment.profile_id = profile.id join post on comment.post_id = post.id left join user_file on profile.profile_picture = user_file.id where comment.id = $1 ;`;
    let query = await client.query(SQL, [result.rows[0].id]);

    return new PostComment(query.rows[0]);
  } catch (e) {
    throw new Error(e);
  }
}

async function updateComment(data) {
  try {
    let SQL = `UPDATE comment SET comment =$1 WHERE id=$2 returning id;`;
    let safeValues = [data.body.comment, data.params.id];
    let result = await client.query(SQL, safeValues);

    SQL = `select comment.id AS comment_id, comment, comment.profile_id, first_name, last_name, file AS profile_picture  from comment join profile on comment.profile_id = profile.id left join user_file on profile.profile_picture = user_file.id where comment.id = $1 ;`;
    let query = await client.query(SQL, [result.rows[0].id]);

    return new PostComment(query.rows[0]);
  } catch (e) {
    throw new Error(e);
  }
}

async function deleteComment(id) {
  try {
    let SQL = `delete from comment where id=$1;`;
    let safeValue = [id];
    let result = await client.query(SQL, safeValue);
    return result.rows;
  } catch (e) {
    throw new Error(e);
  }
}

module.exports = {
  getPostComments,
  createComment,
  updateComment,
  deleteComment,
};

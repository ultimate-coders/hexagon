'use strict';
const Client = require('./db');

async function getPostComments(postId){
  try{

    let SQL=`select * from comment where post_id = $1 ;`;
    let safeValue=[postId];
    let query= await Client.query(SQL, safeValue);
    return query.rows;
  }catch(e){
    throw new Error(e);
  }
}

async function createComment(data){
  try{
  
    let SQL=`INSERT INTO comment (comment,profile_id,post_id) VALUES ($1,$2,$3) returning *;`;
    let safeValues=[data.body.comment,data.user.id,data.body.post_id];
    let result = await Client.query(SQL, safeValues);
    return result.rows;
  }catch(e){
    throw new Error(e);
  }
}

async function updateComment(data){
  try{
    let SQL=`UPDATE comment SET comment =$1 WHERE id=$2 returning *;`;
    let safeValues=[data.comment,data.id];
    let result = await Client.query(SQL, safeValues);
    return result;
  }catch(e){
    throw new Error(e);
  }
}

async function deleteComment(id){
  try{
    let SQL=`delete from comment where id=$1 returning *;`;
    let safeValue=[id];
    let result = await Client.query(SQL, safeValue);
    return result.rows;
  }catch(e){
    throw new Error(e);
  }
}

module.exports={getPostComments,createComment,updateComment,deleteComment};

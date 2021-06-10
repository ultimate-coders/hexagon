'use strict';
const Client = require('./db');

async function getPostComments(postId){
  try{

    let SQL=`select * from comment where post_id = $1 ;`;
    let safeValue=[postId];
    let query= await Client.query(SQL, safeValue);
    return query;
  }catch(e){
    throw new Error(e);
  }
}

async function createComment(data){
  try{
  
    let SQL=`INSERT INTO comment (comment,rate,number_like,post_id) VALUES ($1,$2,$3,$4);`;
    let safeValues=[data.comment,data.rate,data.number_like,data.post_id];
    await Client.query(SQL, safeValues);
  }catch(e){
    throw new Error(e);
  }
}

async function updateComment(data){
  try{
    
    let SQL=`UPDATE comment SET comment =$1 WHERE id=$2;`;
    let safeValues=[data.comment,data.id];
    await Client.query(SQL, safeValues);
  }catch(e){
    throw new Error(e);
  }
}

async function deleteComment(id){
  try{
    
    let SQL=`delete from comment where id=$1;`;
    let safeValue=[id];
    await Client.query(SQL, safeValue);
  }catch(e){
    throw new Error(e);
  }
}
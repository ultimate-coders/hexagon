'use strict';
const Client = require('../../models/db');

async function commentCheck(req,res,next){
  try {
    let SQL=`select user_id from profile where id in (select profile_id from comment
      where id =$1) ;`;
    let safeValue=[req.body.id];
    let query = await Client.query(SQL, safeValue);
    if(req.user.id === query.rows[0].user_id) next();
  } catch (error) {
    throw new Error(error);
  }
  
}

async function messageCheck(data){
  try {
    let SQL=`select user_id from profile where id in (select sender_id from message where id =$1) ;`;
    let safeValue=[data.comment_id];
    let query =  await Client.query(SQL, safeValue);
    if(data.user_id === query.rows[0].user_id) return true;
    else return false;
  } catch (error) {
    throw new Error(error);
  }
  
}

module.exports = {commentCheck,messageCheck};
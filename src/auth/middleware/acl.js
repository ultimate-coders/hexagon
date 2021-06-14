'use strict';
const client = require('../../models/db');

///change query from user id to profile id??

async function commentCheck(req, res, next) {
  try {
    if(req.method.toLowerCase() === 'get' || req.method.toLowerCase() === 'post') {
      next();
      return;
    }

    let SQL = `select comment.profile_id AS comment_owner, post.profile_id AS post_owner from comment JOIN post ON comment.post_id = post.id where comment.id =$1 ;`;
    let safeValue = [req.params.id];
    let query = await client.query(SQL, safeValue);
    if (req.user.profile_id === query.rows[0].comment_owner) {
      next();
    } else if (req.user.profile_id === query.rows[0].post_owner && req.method.toLowerCase() === 'delete') {
      next();
    } else {
      throw new Error('Unauthorized!');
    }
  } catch (e) {
    next(e);
  }
}

async function messageCheck(req, res, next) {
  try {
    if(req.method.toLowerCase() === 'get' || req.method.toLowerCase() === 'post') {
      next();
      return;
    }

    let SQL = `select sender_id from message where id =$1;`;
    let safeValue = [req.params.id];
    let query = await client.query(SQL, safeValue);
    if (req.user.profile_id === query.rows[0].sender_id) {
      next();
    } else {
      throw new Error('Unauthorized!');
    }
  } catch (e) {
    next(e);
  }
}

async function profileCheck(req, res, next) {
  try {
    if(req.method.toLowerCase() === 'get' || req.method.toLowerCase() === 'post') {
      next();
      return;
    }

    let SQL = `select user_id from profile where id = $1;`;
    let safeValue = [req.body.id];
    let query = await client.query(SQL, safeValue);
    if (req.user.id === query.rows[0].user_id){
      next();
    } else {
      throw new Error('Unauthorized!');
    }
  } catch (e) {
    next(e);
  }
}

async function followCheck(req, res, next) {
  try {
    if(req.method.toLowerCase() === 'get' || req.method.toLowerCase() === 'post') {
      next();
      return;
    }

    let SQL = `select user_id from profile where id in (select follower from follow where id =$1) ;`;
    let safeValue = [req.body.id];
    let query = await client.query(SQL, safeValue);
    if (req.user.profile_id === query.rows[0].user_id) next();
  } catch (error) {
    throw new Error(error);
  }
}

async function postCheck(req, res, next) {
  try {
    if(req.method.toLowerCase() === 'get' || req.method.toLowerCase() === 'post') {
      next();
      return;
    }

    let SQL = `select id from profile where id in (select profile_id from post where id =$1) ;`;
    let safeValue = [req.params.id];
    let query = await client.query(SQL, safeValue);
    if (req.user.profile_id === query.rows[0].id) {
      next();
    } else {
      throw new Error('Unauthorized!');
    }
  } catch (e) {
    next(e);
  }
}

async function interactionCheck(req, res, next) {
  try {
    if(req.method.toLowerCase() === 'get' || req.method.toLowerCase() === 'post') {
      next();
      return;
    }

    let SQL = `select user_id from profile where id in (select profile_id from notification where id =$1) ;`;
    let safeValue = [req.body.id];
    let query = await client.query(SQL, safeValue);
    if (req.user.profile_id === query.rows[0].user_id) next();
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = { commentCheck, messageCheck, postCheck, profileCheck };

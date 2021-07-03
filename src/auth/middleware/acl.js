'use strict';
const client = require('../../models/db');

///change query from user id to profile id??

async function commentCheck(req, res, next) {
  try {
    if (
      req.method.toLowerCase() === 'get' ||
      req.method.toLowerCase() === 'post'
    ) {
      next();
      return;
    }

    let SQL = `select comment.profile_id AS comment_owner, post.profile_id AS post_owner from comment LEFT JOIN post ON comment.post_id = post.id where comment.id =$1 ;`;
    let safeValue = [req.params.id];
    let query = await client.query(SQL, safeValue);
    if (req.user.profile_id === query.rows[0].comment_owner) {
      next();
    } else if (
      req.user.profile_id === query.rows[0].post_owner &&
      req.method.toLowerCase() === 'delete'
    ) {
      next();
    } else {
      const error = new Error('Unauthorized!');
      error.statusCode = 403;
      throw error;
    }
  } catch (e) {
    next(e);
  }
}

async function messageCheck(req, res, next) {
  try {
    if (
      req.method.toLowerCase() === 'get' ||
      req.method.toLowerCase() === 'post'
    ) {
      next();
      return;
    }

    let SQL = `select sender_id from message where id =$1;`;
    let safeValue = [req.params.id];
    let query = await client.query(SQL, safeValue);
    if (req.user.profile_id === query.rows[0].sender_id) {
      next();
    } else {
      const error = new Error('Unauthorized!');
      error.statusCode = 403;
      throw error;
    }
  } catch (e) {
    next(e);
  }
}

async function profileCheck(req, res, next) {
  try {
    if (
      req.method.toLowerCase() === 'get' ||
      req.method.toLowerCase() === 'post'
    ) {
      next();
      return;
    }

    let SQL = `select user_id from profile where id = $1;`;
    let safeValue = [req.body.id];
    let query = await client.query(SQL, safeValue);
    if (req.user.id === query.rows[0].user_id) {
      next();
    } else {
      const error = new Error('Unauthorized!');
      error.statusCode = 403;
      throw error;
    }
  } catch (e) {
    next(e);
  }
}

async function followCheck(req, res, next) {
  try {
    if (
      req.method.toLowerCase() === 'get' ||
      req.method.toLowerCase() === 'post'
    ) {
      next();
      return;
    }

    let SQL = `select user_id from profile where id in (select follower from follow where id =$1) ;`;
    let safeValue = [req.body.id];
    let query = await client.query(SQL, safeValue);
    if (req.user.profile_id === query.rows[0].user_id) next();
  } catch (e) {
    const error = new Error('Unauthorized!');
    error.statusCode = 403;
    throw error;
  }
}

async function notificationCheck(req, res, next) {
  try {
    if (
      req.method.toLowerCase() === 'get' ||
      req.method.toLowerCase() === 'post'
    ) {
      next();
      return;
    }

    let SQL = `select * from notification where receiver_id = $1;`;
    let safeValue = [req.user.profile_id];
    let query = await client.query(SQL, safeValue);
    if (req.user.profile_id === query.rows[0].receiver_id) {
      next();
    } else {
      const error = new Error('Unauthorized!');
      error.statusCode = 403;
      throw error;
    }
  } catch (e) {
    next(e);
  }
}

async function postCheck(req, res, next) {
  try {
    if (
      req.method.toLowerCase() === 'get' ||
      req.method.toLowerCase() === 'post'
    ) {
      next();
      return;
    }

    let SQL = `select id from profile where id in (select profile_id from post where id =$1) ;`;
    let safeValue = [req.params.id];
    let query = await client.query(SQL, safeValue);
    if (req.user.profile_id === query.rows[0].id) {
      next();
    } else {
      const error = new Error('Unauthorized!');
      error.statusCode = 403;
      throw error;
    }
  } catch (e) {
    next(e);
  }
}

// async function interactionCheck(req, res, next) {
//   try {
//     if(req.method.toLowerCase() === 'get' || req.method.toLowerCase() === 'post') {
//       next();
//       return;
//     }

//     let SQL = `select id from profile where id in (select profile_id from notification where id =$1) ;`;
//     let safeValue = [req.body.post_id];
//     let query = await client.query(SQL, safeValue);
//     if (req.user.profile_id === query.rows[0].id) {
//       next();
//     } else {
//       throw new Error('Unauthorized!');
//     }
//   } catch (e) {
//     throw new Error(e);
//   }
// }

function verifyCheck(req, res, next) {
  if (req.user.verified) {
    next();
  } else {
    const error = new Error('Account not verified!');
    error.statusCode = 403;
    throw error;
  }
}

module.exports = {
  commentCheck,
  messageCheck,
  postCheck,
  profileCheck,
  notificationCheck,
  verifyCheck,
};

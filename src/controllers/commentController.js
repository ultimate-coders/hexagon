'use strict';
const { getPostComments, createComment, updateComment, deleteComment } = require('../models/comment');

async function getPostCommentsHandler(req, res, next) {
  try {
    let result = await getPostComments(req.params.postId);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
}

async function createCommentHandler(req, res, next) {
  try {
    let done = await createComment(req);
    console.log('done -----------',done);
    res.status(201).json({ done });
  } catch (error) {
    next(error);
  }
}

async function updateCommentHandler(req, res, next) {
  try {
    console.log('update');
    let result = await updateComment(req.body);
    console.log('done -----------',result);

    res.status(201).json(result.rows);
  } catch (error) {
    next(error);
  }
}

async function deleteCommentHandler(req, res, next) {
  try {
    let result = await deleteComment(req.body.id);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
}

module.exports = { getPostCommentsHandler, createCommentHandler, updateCommentHandler, deleteCommentHandler };
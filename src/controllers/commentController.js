'use strict';
const {
  getPostComments,
  createComment,
  updateComment,
  deleteComment,
} = require('../models/comment');

async function getPostCommentsHandler(req, res, next) {
  try {
    const page = req.query.page || '1';

    let result = await getPostComments(req.params.postId, page);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
}

async function createCommentHandler(req, res, next) {
  try {
    req.body.profile_id = req.user.profile_id;
    let result = await createComment(req);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
}

async function updateCommentHandler(req, res, next) {
  try {
    let result = await updateComment(req);

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
}

async function deleteCommentHandler(req, res, next) {
  try {
    let result = await deleteComment(req.params.id);
    res.status(200).json({
      status: 200,
      message: 'Successfully deleted',
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getPostCommentsHandler,
  createCommentHandler,
  updateCommentHandler,
  deleteCommentHandler,
};

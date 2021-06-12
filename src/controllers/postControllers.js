'use strict';

const {
  getAllPosts,
  getSinglePost,
  createPost,
  updatePost,
  deletePost,
} = require('../models/post');

const { saveFile } = require('../models/file');

const getAllPostsHandler = async (req, res, next) => {
  try {
    const keyword = req.query.category || '';
    const page = req.query.page || '1';

    const response = await getAllPosts(keyword, page);
    res.status(200).json(response);
  } catch (e) {
    next(e);
  }
};

const getSinglePostsHandler = async (req, res, next) => {
  try {
    const id = req.params.id;

    const response = await getSinglePost(id);
    res.status(200).json(response);
  } catch (e) {
    next(e);
  }
};

const createPostsHandler = async (req, res, next) => {
  try {
    // Upload the files and return the results
    let fileUploadResponse = await saveFile(req.files);
    req.body['images'] = fileUploadResponse.map((file) => file.id);
    const response = await createPost(req.body);
    res.status(201).json({
      message: 'successfully created',
    });
  } catch (e) {
    next(e);
  }
};

const updatePostsHandler = async (req, res, next) => {
  try {
    const id = req.params.id;
    const response = await updatePost(id, req.body);
    res.status(200).json({
      message: 'successfully updated',
    });
  } catch (e) {
    next(e);
  }
};

const deletePostsHandler = async (req, res, next) => {
  try {
    const id = req.params.id;
    const response = await deletePost(id);
    res.status(200).json({
      message: 'successfully deleted',
    });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getAllPostsHandler,
  getSinglePostsHandler,
  createPostsHandler,
  updatePostsHandler,
  deletePostsHandler,
};

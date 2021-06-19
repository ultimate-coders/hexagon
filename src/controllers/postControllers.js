'use strict';

const {
  getAllPosts,
  getSinglePost,
  createPost,
  updatePost,
  deletePost,
  getTimelinePosts,
  getProfilePosts,
} = require('../models/post');

const { saveFile, deleteFile } = require('../models/file');
const { deleteRemoteFile } = require('../middleware/uploader');

const getTimelineHandler = async (req, res, next) => {
  try {
    const page = req.query.page || '1';

    const response = await getTimelinePosts(req.user.profile_id, page);
    res.status(200).json(response);
  } catch (e) {
    next(e);
  }
};

const getProfilePostsHandler = async (req, res, next) => {
  try {
    const page = req.query.page || '1';
    const profileId = req.params.id;

    const response = await getProfilePosts(profileId, page);
    res.status(200).json(response);
  } catch (e) {
    next(e);
  }
};

const getAllPostsHandler = async (req, res, next) => {
  try {
    
    const category = req.params.category;
    const page = req.query.page || '1';

    const response = await getAllPosts(category, page);
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
    req.body['profile_id'] = req.user.profile_id;
    const post = await createPost(req.body);
    res.status(201).json(post);
  } catch (e) {
    next(e);
  }
};

const updatePostsHandler = async (req, res, next) => {
  try {
    const id = req.params.id;
    const post = await updatePost(id, req.body);
    res.status(201).json(post);
  } catch (e) {
    next(e);
  }
};

const deletePostsHandler = async (req, res, next) => {
  try {
    const id = req.params.id;
    const post = await getSinglePost(id);
    post['images'].forEach(async image => {
      await deleteRemoteFile(image.link);
      await deleteFile(image.link);
    });
   
    const response = await deletePost(id);
    res.status(200).json({
      status: 200,
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
  getTimelineHandler,
  getProfilePostsHandler,
};

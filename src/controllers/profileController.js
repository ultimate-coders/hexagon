'use strict';

const { getAllProfiles, getSingleProfile, getProfileByUserId, createProfile, updateProfile } = require('../models/userProfile');

const getAllProfilesHandler = async (req, res, next) => {
  try {
    const keyword = req.query.keyword || '';
    const page = req.query.page || '1';

    const response = await getAllProfiles(keyword, page);
    res.status(200).json(response);
  } catch (e) {
    next(e);
  }
};

const getProfileHandler = async (req, res, next) => {
  try {
    const id = req.params.id;
    const response = await getSingleProfile(id, req.user.profile_id);
    res.status(200).json(response);
  } catch (e) {
    next(e);
  }
};

const meHandler = async (req, res, next) => {
  try {
    const id =  req.user.id;
    const response = await getProfileByUserId(id);
    res.status(200).json(response);
  } catch (e) {
    next(e);
  }
};

const createProfileHandler = async (req, res, next) => {
  try {
    req.body['user_id'] = req.user.id;
    const response = await createProfile(req.body);
    res.status(201).json(response);
  } catch (e) {
    next(e);
  }
};

const updateProfileHandler = async (req, res, next) => {
  try {
    const profile_id = req.user.profile_id;
    const response = await updateProfile(profile_id, req.body);
    res.status(200).json(response);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getAllProfilesHandler,
  getProfileHandler,
  meHandler,
  createProfileHandler,
  updateProfileHandler,
};

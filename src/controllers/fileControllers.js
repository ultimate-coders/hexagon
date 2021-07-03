'use strict';

const { saveFile } = require('../models/file');

const fileUploadHandler = async (req, res, next) => {
  try {
    if (req.files.length < 1) {
      const error = new Error('File is missed');
      error.statusCode = 403;
      throw error;
    }
    
    let response = await saveFile(req.files);
    res.status(200).json(response);
  } catch (e) {
    next(e);
    
  }
};

module.exports = {
  fileUploadHandler,
};

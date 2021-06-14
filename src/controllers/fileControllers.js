'use strict';

const { saveFile } = require('../models/file');

const fileUploadHandler = async (req, res, next) => {
  try {
    if (req.files.length < 1) {
      throw new Error('File missed');
    }
    let response = await saveFile(req.files);
    res.status(200).json(response);
  } catch (e) {
    console.log(e);
    next(e);
    
  }
};

module.exports = {
  fileUploadHandler,
};

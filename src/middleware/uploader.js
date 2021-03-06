'use strict';
const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');

// AWS S3 instance
const s3 = new aws.S3();

aws.config.update({
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  region: process.env.AWS_REGION,
});

// Filter the uploaded files to be just images and the size should not exceed 500 KB
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  }  else {
    cb(new Error('Invalid file type, only JPEG and PNG is allowed!'), false);
  }
};

const uploadS3 = multer({
  fileFilter,
  limits: {
    files: 5,
    fileSize: 500000,
  },
  storage: multerS3({
    acl: 'public-read',
    s3,
    bucket: process.env.S3_BUCKET_NAME,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString() + '-' + file.originalname);
    },
  }),
});

async function deleteRemoteFile(fileUrl) {
  try {
    const key = fileUrl.split('/')[3];
    await s3.deleteObject({
      Bucket: process.env.S3_BUCKET_NAME,
      Key: key,
    }).promise();
    return 'successfully deleted';
  } catch (e) {
    throw new Error(e);
  }
}
module.exports = {
  uploadS3,
  deleteRemoteFile,
};

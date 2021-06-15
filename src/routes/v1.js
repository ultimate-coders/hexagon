'use strict';

const express = require('express');
const router = express.Router();
const uploadS3 = require('../middleware/uploader');

const {createMessageHandler, getMessageHandler, deleteMessageHandler,updateMessageHandler} = require('../controllers/messageControllers');
const {createNotificationHandler, getNotificationHandler, updateNotificationHandler} = require('../controllers/notificationController');
const {getPostCommentsHandler,createCommentHandler,updateCommentHandler,deleteCommentHandler}=require('../controllers/commentController');
const { followHandler } = require('../controllers/followController');
const {getAllProfilesHandler, getProfileHandler, meHandler, createProfileHandler, updateProfileHandler} = require('../controllers/profileController');
const {getAllPostsHandler, getSinglePostsHandler, createPostsHandler, updatePostsHandler, deletePostsHandler} = require('../controllers/postControllers');
const bearer = require('../auth/middleware/bearer');
const {commentCheck,messageCheck, postCheck, notificationCheck, verifyCheck}=require('../auth/middleware/acl');
const {fileUploadHandler} = require('../controllers/fileControllers');
const {interactionHndler}= require('../controllers/interactionControllers');
const {getCategoriesHandler} = require('../controllers/categoryControllers');


// Global middleware
router.use(bearer);
router.use(verifyCheck);

// Profile routes
router.get('/profile', getAllProfilesHandler);
router.get('/profile/:id', getProfileHandler);
router.get('/me-profile', meHandler);
router.post('/profile', createProfileHandler);
router.put('/profile/', updateProfileHandler);

// Following routes
router.post('/follow',followHandler);

// Categories routes
router.get('/category', getCategoriesHandler);

// Posts routes
router.get('/posts', postCheck, getAllPostsHandler);
router.get('/posts/:id', postCheck, getSinglePostsHandler);
router.post('/posts', postCheck, uploadS3.array('image'), createPostsHandler);
router.put('/posts/:id', postCheck, uploadS3.array('image'), updatePostsHandler);
router.delete('/posts/:id', postCheck, deletePostsHandler);

// Comments routes
router.get('/comment/:postId', commentCheck, getPostCommentsHandler);
router.post('/comment', commentCheck, createCommentHandler);
router.put('/comment/:id',commentCheck,updateCommentHandler);
router.delete('/comment/:id',commentCheck,deleteCommentHandler);

// Interactions routes
router.post('/interaction', interactionHndler);

// Notifications routes
router.post('/notifications', notificationCheck, createNotificationHandler);
router.get('/notifications', notificationCheck, getNotificationHandler);
router.put('/notifications/:id',notificationCheck, updateNotificationHandler);

// Messages routes
router.post('/messages', messageCheck, createMessageHandler);
router.get('/messages', messageCheck, getMessageHandler);
router.delete('/messages/:id',messageCheck, deleteMessageHandler);
router.put('/messages/:id',messageCheck, updateMessageHandler);

// Upload files routes
router.post('/file-upload', uploadS3.array('file'), fileUploadHandler);

// Test route
router.get('/test', (req,res)=>{
  res.send('working well');
});



module.exports = router;
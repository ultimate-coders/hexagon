const express = require('express');
const router = express.Router();
const {createMessageHandler, getMessageHandler, deleteMessageHandler,updateMessageHandler} = require('../controllers/messageControllers');
const {createNotificationHandler, getNotificationHandler, updateNotificationHandler} = require('../controllers/notificationController');
const {getPostCommentsHandler,createCommentHandler,updateCommentHandler,deleteCommentHandler}=require('../controllers/commentController');
const followHndler=require('../controllers/followController');
const {getAllProfilesHandler, getProfileHandler, meHandler, createProfileHandler, updateProfileHandler} = require('../controllers/profileController');
const {getAllPostsHandler, getSinglePostsHandler, createPostsHandler, updatePostsHandler, deletePostsHandler} = require('../controllers/postControllers');
const bearer = require('../auth/middleware/bearer');
const {commentCheck,messageCheck}=require('../auth/middleware/acl');

// router.use(bearer)
router.post('/messages', createMessageHandler);
router.get('/messages', getMessageHandler);
router.delete('/messages/:id',messageCheck, deleteMessageHandler);
router.put('/messages/:id',messageCheck, updateMessageHandler);

router.post('/notifications', createNotificationHandler);
router.get('/notifications', getNotificationHandler);
router.put('/notifications/:id', updateNotificationHandler);

router.get('/comment/:postId',getPostCommentsHandler);
router.post('/comment',bearer,createCommentHandler);
router.put('/comment',bearer,commentCheck,updateCommentHandler);
router.delete('/comment',bearer,commentCheck,deleteCommentHandler);

router.post('/follow',followHndler);

router.get('/profile', getAllProfilesHandler);
router.get('/profile/:id', getProfileHandler);
router.get('/me-profile/', meHandler);
router.post('/profile/', createProfileHandler);
router.put('/profile/:id', updateProfileHandler);

router.get('/posts', getAllPostsHandler);
router.get('/posts/:id', getSinglePostsHandler);
router.post('/posts/', createPostsHandler);
router.put('/posts/:id', updatePostsHandler);
router.delete('/posts/:id', deletePostsHandler);

router.get('/test', (req,res)=>{
  res.send('working well');
});



module.exports = router;
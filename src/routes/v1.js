const express = require('express');
const router = express.Router();
const {createMessageHandler, getMessageHandler, deleteMessageHandler,updateMessageHandler} = require('../controllers/messageControllers');
const {createNotificationHandler, getNotificationHandler, updateNotificationHandler} = require('../controllers/notificationController');
const {getPostCommentsHandler,createCommentHandler,updateCommentHandler,deleteCommentHandler}=require('../controllers/commentController');
const followHndler=require('../controllers/followController');

router.post('/messages', createMessageHandler);
router.get('/messages', getMessageHandler);
router.delete('/messages/:id', deleteMessageHandler);
router.put('/messages/:id', updateMessageHandler);

router.post('/notifications', createNotificationHandler);
router.get('/notifications', getNotificationHandler);
router.put('/notifications/:id', updateNotificationHandler);

router.get('/comment/:postId',getPostCommentsHandler);
router.post('/comment',createCommentHandler);
router.put('/comment',updateCommentHandler);
router.delete('/comment/:id',deleteCommentHandler);

router.post('/follow',followHndler);

router.get('/test', (req,res)=>{
  res.send('working well');
});



module.exports = router;
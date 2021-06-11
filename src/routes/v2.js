const express = require('express');
const router = express.Router();

const {getPostCommentsHandler,createCommentHandler,updateCommentHandler,deleteCommentHandler}=require('../controllers/commentController');
const followHndler=require('../controllers/followController');

router.get('/comment/:postId',getPostCommentsHandler);
router.post('/comment',createCommentHandler);
router.put('/comment',updateCommentHandler);
router.delete('/comment/:id',deleteCommentHandler);

router.post('/follow',followHndler);

module.exports = router;
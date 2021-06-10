const express = require('express');
const router = express.Router();
const {createMessageHandler, getMessageHandler, deleteMessageHandler,updateMessageHandler} = require('../controllers/messageControllers');
const {createNotificationHandler, getNotificationHandler, updateNotificationHandler} = require('../controllers/notificationController');

router.post('/messages', createMessageHandler);
router.get('/messages', getMessageHandler);
router.delete('/messages/:id', deleteMessageHandler);
router.put('/messages/:id', updateMessageHandler);

router.post('/notifications', createNotificationHandler);
router.get('/notifications', getNotificationHandler);
router.put('/notifications/:id', updateNotificationHandler);



router.get('/test', (req,res)=>{
  res.send('working well');
});



module.exports = router;
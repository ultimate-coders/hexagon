const express = require('express');
const router = express.Router();
const {createMessageHandler, getMessageHandler, deleteMessageHandler,updateMessageHandler} = require('../controllers/messageControllers');
const {createNotificationHandler, getNotificationHandler, updateNotificationHandler} = require('../controllers/notificationController');
const {getAllProfilesHandler, getProfileHandler, meHandler, createProfileHandler, updateProfileHandler} = require('../controllers/profileController');

router.post('/messages', createMessageHandler);
router.get('/messages', getMessageHandler);
router.delete('/messages/:id', deleteMessageHandler);
router.put('/messages/:id', updateMessageHandler);

router.post('/notifications', createNotificationHandler);
router.get('/notifications', getNotificationHandler);
router.put('/notifications/:id', updateNotificationHandler);

router.get('/profile', getAllProfilesHandler);
router.get('/profile/:id', getProfileHandler);
router.get('/me-profile/', meHandler);
router.post('/profile/', createProfileHandler);
router.put('/profile/:id', updateProfileHandler);

router.get('/test', (req,res)=>{
  res.send('working well');
});



module.exports = router;
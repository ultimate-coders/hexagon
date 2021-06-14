const {createNotification, getNotification, updateNotification} = require('../models/notification');

// No need for this controller and its route handler
let createNotificationHandler = async (req,res,next) =>{
  try {

    let {message, receiver_id, post_id} = req.body;
    let result = await createNotification(message, receiver_id, post_id);
    res.status(201).json(result.message);
  } catch (error) {
    next(error);
  }
};

let getNotificationHandler = async (req,res,next)=>{
  try {
    const page = req.query.page || '1';

    let result = await getNotification(req.user.profile_id, page);
    res.status(200).json(result);
  } catch (e) {
    next(e);
  }
};

let updateNotificationHandler = async (req,res,next) =>{
  try {
    await updateNotification(req.params.id);
    res.status(200).json({
      status: 200,
      message: 'Successfully updated',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {createNotificationHandler, getNotificationHandler, updateNotificationHandler};
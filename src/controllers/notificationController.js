const {createNotification, getNotification, updateNotification} = require('../models/notification');


let createNotificationHandler = async (req,res,next) =>{
  try {
    let {message, receiverId, postId} = req.body;
    let result = await createNotification(message, receiverId, postId);
    res.status(201).json(result[0].message);
  } catch (error) {
    next(error);
  }
};

let getNotificationHandler = async (req,res,next)=>{
  try {
    let result = await getNotification(req.body.receiverId);
    res.status(200).json({result});
  } catch (error) {
    next(error);
  }
};

let updateNotificationHandler = async (req,res,next) =>{
  try {
    await updateNotification(req.params.id);
    res.status(200).json({status:'successful'});
  } catch (error) {
    next(error);
  }
};

module.exports = {createNotificationHandler, getNotificationHandler, updateNotificationHandler};
const {createNotification, getNotification, updateNotification} = require('../models/notification');


let createNotificationHandler = async (req,res,next) =>{
  try {
    let {message, receiver_id, post_Id} = req.body;
    let result = await createNotification(message, receiver_id, post_Id);
    res.status(201).json(result[0].message);
  } catch (error) {
    next(error);
  }
};

let getNotificationHandler = async (req,res,next)=>{
  try {
    const page = req.query.page || '1';

    let result = await getNotification(req.body.receiver_id, page);
    res.status(200).json(result);
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
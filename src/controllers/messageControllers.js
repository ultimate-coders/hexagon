const { createMessage, getMessage, deleteMessage,  updateMessage } = require('../models/message');

let createMessageHandler = async (req,res,next) =>{
  try {
    let {message , sender_id, receiver_id} = req.body;
    let result = await createMessage(message , sender_id, receiver_id);        
    res.status(201).json({status: 'successful', message: result.rows[0].message});
  } catch (error) {
    next(error);
  }
};

let getMessageHandler = async (req,res,next) =>{
  try {
    const page = req.query.page || '1';

    let {sender_id , receiver_id} = req.body;
    let result = await getMessage(sender_id,receiver_id, page);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

let deleteMessageHandler = async (req,res,next)=>{
  try {
    await deleteMessage(req.params.id);
    res.status(200).json({status:'successful'});
  } catch (error) {
    next(error);
  }
};

let updateMessageHandler = async (req,res,next) =>{
  try {
    await updateMessage(req.body.message, req.params.id);
    res.status(200).json({status:'successful'});
  } catch (error) {
    next(error);
  }
};

module.exports = {createMessageHandler, getMessageHandler, deleteMessageHandler,updateMessageHandler};
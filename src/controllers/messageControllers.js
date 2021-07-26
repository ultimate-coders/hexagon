const {
  getMessage,
  deleteMessage,
  updateMessage,
} = require('../models/message');
const events = require('../socket/event');
const { sendMessage } = require('../utils/helpers');

let createMessageHandler = async (req, res, next) => {
  try {
    let { message, receiver_id } = req.body;
    const result = await sendMessage(message, req.user.profile_id, receiver_id);
    let obj = {
      id: result[0].id,
      status: 201,
      message: 'message successfully sent',
    };
    
    res.status(201).json(obj);
  } catch (e) {
    next(e);
  }
};

let getMessageHandler = async (req, res, next) => {
  try {
    const page = req.query.page || '1';

    let receiver_id = req.params.receiver_id;
    if(!receiver_id){
      const error = new Error('missing receiver_id!');
      error.statusCode = 403;
      throw error;
    }
    let result = await getMessage(receiver_id, req.user.profile_id, page);
    res.status(200).json(result);
  } catch (e) {
    next(e);
  }
};

let deleteMessageHandler = async (req, res, next) => {
  try {
    await deleteMessage(req.params.id);
    res.status(200).json({
      status: 200,
      message: 'successfully deleted',
    });
  } catch (e) {
    next(e);
  }
};

let updateMessageHandler = async (req, res, next) => {
  try {
    const message = await updateMessage(req.params.id);
    events.emit('message', message);
    res.status(200).json({
      status: 200,
      message: 'successfully updated',
    });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  createMessageHandler,
  getMessageHandler,
  deleteMessageHandler,
  updateMessageHandler,
};

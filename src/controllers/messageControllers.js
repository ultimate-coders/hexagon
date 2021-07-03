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
  } catch (error) {
    next(error);
  }
};

let getMessageHandler = async (req, res, next) => {
  try {
    const page = req.query.page || '1';

    let { receiver_id } = req.body;
    console.log(receiver_id);
    if(!receiver_id) next('missing receiver_id!');
    let result = await getMessage(receiver_id, req.user.profile_id, page);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

let deleteMessageHandler = async (req, res, next) => {
  try {
    await deleteMessage(req.params.id);
    res.status(200).json({
      status: 200,
      message: 'successfully deleted',
    });
  } catch (error) {
    next(error);
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
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createMessageHandler,
  getMessageHandler,
  deleteMessageHandler,
  updateMessageHandler,
};

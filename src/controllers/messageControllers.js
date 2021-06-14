const {
  getMessage,
  deleteMessage,
  updateMessage,
} = require('../models/message');
const { sendMessage } = require('../utils/helpers');

let createMessageHandler = async (req, res, next) => {
  try {
    let { message, receiver_id } = req.body;
    const result = await sendMessage(message, req.user.profile_id, receiver_id);
    res.status(201).json({
      status: 201,
      message: 'message successfully sent',
    });
  } catch (error) {
    next(error);
  }
};

let getMessageHandler = async (req, res, next) => {
  try {
    const page = req.query.page || '1';

    let { receiver_id } = req.body;
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
    await updateMessage(req.params.id);
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

'use strict';
const { createNotification } = require('../models/notification');
const { createMessage } = require('../models/message');
const events = require('../socket/event');

const sendNotification = async (message, receiver_id, post_id) => {
  try {
    const result = await createNotification(message, receiver_id, post_id);
    events.emit('notification', { message, receiver_id, post_id });
  } catch (e) {
    throw new Error(e);
  }
};

const sendMessage = async (message , sender_id, receiver_id) => {
  try {
    const result = await createMessage(message , sender_id, receiver_id);
    events.emit('message', {message , sender_id, receiver_id});
  } catch (e) {
    throw new Error(e);
  }
};


module.exports = {
  sendNotification,
  sendMessage,
};

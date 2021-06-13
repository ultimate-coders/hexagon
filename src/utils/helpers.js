'use strict';
const { createNotification } = require('../models/notification');
const events = require('../socket/event');

const sendNotification = async (message, receiver_id, post_id) => {
  try {
    const result = await createNotification(message, receiver_id, post_id);
    events.emit('notification', { message, receiver_id, post_id });
  } catch (e) {
    throw new Error(e);
  }
};

module.exports = {
  sendNotification,
};

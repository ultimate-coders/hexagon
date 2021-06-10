'use strict';

const { notifications } = require('../server');
const events = require('./event');

events.on('notification', (payload) => {
  notifications.to(payload.user_id, payload);
});


notifications.on('connection', (socket) => {
  // events go here
});

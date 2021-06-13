'use strict';

const { notifications } = require('../server');
// const events = require('./event');

// events.on('notification', (payload) => {
//   console.log('Notification has been triggered',payload);
//   notifications.to(payload.receiver_id, payload);
// });

notifications.on('connection', (socket) => {
  // events go here
});

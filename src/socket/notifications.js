'use strict';

const { notifications } = require('../server');
// const events = require('./event');

// events.on('notification', (payload) => {
//   console.log('Notification has been triggered',payload);
//   notifications.to(payload.receiver_id, payload);
// });

notifications.on('connection', (socket) => {
  socket.on('join', payload => {
    socket.join(payload.user_id);
  });
});


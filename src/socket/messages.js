'use strict';

const { messages } = require('../server');
// const events = require('./event');

// events.on('message', (payload) => {
//   messages.to(payload.receiver_id, payload);
// });


messages.on('connection', (socket) => {
  socket.on('join', payload => {
    socket.join(payload.user_id);
  });
});

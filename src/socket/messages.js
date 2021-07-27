'use strict';

const { messages } = require('../server');
// const events = require('./event');

// events.on('message', (payload) => {
//   messages.to(payload.receiver_id, payload);
// });


messages.on('connection', (socket) => {
  console.log('a user Connected to messages service :', socket.id);
  socket.on('join', payload => {
    socket.join(payload.user_id);
  });
});

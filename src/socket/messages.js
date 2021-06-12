'use strict';

const { messages } = require('../server');
// const events = require('./event');

// events.on('message', (payload) => {
//   messages.to(payload.receiver_id, payload);
// });


messages.on('connection', (socket) => {
  // events go here
});

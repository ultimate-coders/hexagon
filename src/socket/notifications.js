'use strict';

const { messages } = require('../server');
const events = require('./event');

events.on('message', (payload) => {
  messages.to(payload.user_id, payload);
});

messages.on('connection', (socket) => {
  // events go here
});

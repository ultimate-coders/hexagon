'use strict';

// 3rd Party Resources
const path = require('path');
const express = require('express');
const cors = require('cors');
const http = require('http');
const socketServer = require('socket.io');
const morgan = require('morgan');

// Setup the server and the socket
const app = express();
const httpServer = http.createServer(app);
const io = socketServer(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});
io.listen(httpServer);

// Events instance
const events = require('./socket/event');

// Esoteric Resources
const errorHandler = require('./error-handlers/500.js');
const notFound = require('./error-handlers/404.js');
const v1Router = require('./routes/v1');
const authRouter = require('./auth/routes');



// App Level MW
app.use(cors());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, './public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// sockets namespaces
const notifications = io.of('/notifications');
const messages = io.of('/messages');

notifications.on('connection', () => {
  require('./socket/notifications');
});

messages.on('connection', () => {
  require('./socket/messages');
});


// send notifications

events.on('notification', (payload) => {
  console.log('Notification has been triggered',payload);
  notifications.to(payload.receiver_id, payload);
});

// send messages
events.on('message', (payload) => {
  console.log('Message has been triggered',payload);
  messages.to(payload.receiver_id, payload);
  messages.to(payload.sender_id, payload);
});

// Use Routes
app.get('/test', (req, res) => {
  res.send('Hello Word');
});
app.use('/auth',authRouter);
app.use('/api/v1',v1Router);

// Catchalls
app.use(notFound);
app.use(errorHandler);

module.exports = {
  app: app,
  start: (port) => {
    httpServer.listen(port, () => {
      console.log(`Server Up on ${port}`);
    });
  },
  io,
  notifications,
  messages,
};

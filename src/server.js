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
const io = socketServer(http, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});
io.listen(httpServer);


// Esoteric Resources
const errorHandler = require('./error-handlers/500.js');
const notFound = require('./error-handlers/404.js');
const v1Router = require('./routes/v1');
const v2Router = require('./routes/v2');

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

// Use Routes
app.get('/test', (req, res) => {
  res.send('Hello Word');
});
app.use('/auth',authRouter);
app.use('/api/v1',v1Router);
app.use('/api/v2',v2Router);

// Catchalls
app.use(notFound);
app.use(errorHandler);

module.exports = {
  server: app,
  start: (port) => {
    app.listen(port, () => {
      console.log(`Server Up on ${port}`);
    });
  },
  io,
  notifications,
  messages,
};

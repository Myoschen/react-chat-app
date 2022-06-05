const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

const app = express();

app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  }
});

let lastServer = '';

io.on('connection', (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on('join', (data) => {
    if (lastServer !== '') {
      socket.leave(lastServer);
      console.log(`User with ID: ${socket.id} left server: ${data}`);
    } else {
      lastServer = data;
    }
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined server: ${data}`);
  });

  socket.on('send_message', (data) => {
    socket.to(data.server).emit('receive_message', data);
  });

  socket.on('disconnect', () => {
    console.log(`User Disconnected: ${socket.id}`);
  });
});

server.listen(3001, () => {
  console.log('Server is running...');
});
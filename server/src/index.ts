import express from 'express';
import http from 'http';
import cors from 'cors';
import { Server } from 'socket.io';
import { onlineUsers, joinServer, leaveServer } from './users';

const app = express();

app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  maxHttpBufferSize: 1e7,
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  }
});

let lastServer = '';

// When user connected socket server
io.on('connection', (socket) => {
  console.log(`[CONNECTION] User connected: ${socket.id}`);

  // When user join a server
  socket.on('join_server', (data: JoinEvent) => {
    // Before joining server, user must leave the previous server
    if (lastServer !== '') {
      leaveServer(data.username);
      socket.leave(lastServer);
      console.log(`[LEAVE] User with ID: ${socket.id} left server: ${lastServer}`);
    }

    lastServer = data.server;
    joinServer({
      id: socket.id,
      username: data.username,
      server: data.server
    });
    socket.join(data.server);
    io.emit('online_user_list', onlineUsers);
    console.log(`[JOIN] User with ID: ${socket.id} joined server: ${data.server}`);
  });

  // When user send message
  socket.on('send_message', (data: Message) => {
    console.log(`[MESSAGE] Message from client: ${data.username}`);
    socket.to(data.server).emit('receive_message', data);
  });

  // When user disconnected socket server
  socket.on('disconnect', () => {
    console.log(`[CONNECTION] User disconnected: ${socket.id}`);
  });
});

server.listen(3001, () => {
  console.log('Server is running...');
})
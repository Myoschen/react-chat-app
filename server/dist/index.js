"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const socket_io_1 = require("socket.io");
const users_1 = require("./users");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
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
    socket.on('join_server', (data) => {
        // Before joining server, user must leave the previous server
        if (lastServer !== '') {
            (0, users_1.leaveServer)(data.username);
            socket.leave(lastServer);
            console.log(`[LEAVE] User with ID: ${socket.id} left server: ${lastServer}`);
        }
        lastServer = data.server;
        (0, users_1.joinServer)({
            id: socket.id,
            username: data.username,
            server: data.server
        });
        socket.join(data.server);
        io.emit('online_user_list', users_1.onlineUsers);
        console.log(`[JOIN] User with ID: ${socket.id} joined server: ${data.server}`);
    });
    // When user send message
    socket.on('send_message', (data) => {
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
});

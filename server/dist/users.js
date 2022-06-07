"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.leaveServer = exports.joinServer = exports.onlineUsers = void 0;
const onlineUsers = [];
exports.onlineUsers = onlineUsers;
function joinServer(user) {
    onlineUsers.push(user);
}
exports.joinServer = joinServer;
function leaveServer(username) {
    const index = onlineUsers.findIndex(user => user.username === username);
    if (index !== -1) {
        onlineUsers.splice(index, 1)[0];
    }
}
exports.leaveServer = leaveServer;

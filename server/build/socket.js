"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Events = void 0;
const logger_1 = __importDefault(require("./utils/logger"));
exports.Events = {
    CONNECTION: 'connection',
    JOIN_CHANNEL: 'join_channel',
    SEND_MESSAGE: 'send_message',
};
function socketListener(io) {
    logger_1.default.info('✅ Socket enabled...');
    io.on(exports.Events.CONNECTION, (socket) => {
        logger_1.default.info(`User connected ${socket.id}`);
        /**
         * Client send a message to channel or other user
         */
        socket.on(exports.Events.SEND_MESSAGE, (msg) => {
            logger_1.default.info(`Message from client: ${msg.from} says ${msg.data}`);
            socket.to(msg.to).emit('receive_message', msg);
        });
        /**
         *  Join a channel
         */
        socket.on(exports.Events.JOIN_CHANNEL, (channel) => {
            socket.join(channel);
        });
    });
}
exports.default = socketListener;

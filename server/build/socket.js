"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Events = void 0;
const mongoose_1 = require("mongoose");
const message_model_1 = __importDefault(require("./models/message.model"));
const loggerUtil_1 = __importDefault(require("./utils/loggerUtil"));
exports.Events = {
    CONNECTION: 'connection',
    JOIN_CHANNEL: 'join_channel',
    SEND_MESSAGE: 'send_message',
};
;
function socketListener(io) {
    loggerUtil_1.default.info('✅ Socket enabled...');
    io.on(exports.Events.CONNECTION, (socket) => {
        loggerUtil_1.default.info(`User connected ${socket.id}`);
        /**
         * Client send a message to channel or other user
         */
        socket.on(exports.Events.SEND_MESSAGE, (message) => __awaiter(this, void 0, void 0, function* () {
            loggerUtil_1.default.info(`Message from client: ${message.from} says ${message.data}`);
            const newMessage = new message_model_1.default({
                from: new mongoose_1.Types.ObjectId(message.from),
                to: new mongoose_1.Types.ObjectId(message.to),
                toType: message.toType,
                data: message.data,
                dataType: message.dataType,
                time: message.time
            });
            try {
                yield newMessage.save();
                socket.to(message.to).emit('receive_message', message);
            }
            catch (error) {
                loggerUtil_1.default.error(`Save message failed`);
            }
        }));
        /**
         *  Join a channel
         */
        socket.on(exports.Events.JOIN_CHANNEL, (channel) => {
            socket.join(channel);
        });
    });
}
exports.default = socketListener;

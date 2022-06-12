import { Server, Socket } from "socket.io";
import { Types } from "mongoose";
import Message from './models/message.model';
import logger from "./utils/loggerUtil";

export const Events = {
  CONNECTION: 'connection',
  JOIN_CHANNEL: 'join_channel',
  SEND_MESSAGE: 'send_message',
};

export interface SocketMessage {
  from: string;
  to: string;
  toType: string;
  data: string;
  dataType: string,
  time: string;
};

function socketListener(io: Server) {
  logger.info('✅ Socket enabled...');

  io.on(Events.CONNECTION, (socket: Socket) => {
    logger.info(`User connected ${socket.id}`);

    /**
     * Client send a message to channel or other user
     */
    socket.on(Events.SEND_MESSAGE, async (message: SocketMessage) => {
      logger.info(`Message from client: ${message.from} says ${message.data}`);
      const newMessage = new Message({
        from: new Types.ObjectId(message.from),
        to: new Types.ObjectId(message.to),
        toType: message.toType,
        data: message.data,
        dataType: message.dataType,
        time: message.time
      });
      try {
        await newMessage.save();
        socket.to(message.to).emit('receive_message', message);
      } catch(error) {
        logger.error(`Save message failed`);
      }
    });

    /**
     *  Join a channel 
     */
    socket.on(Events.JOIN_CHANNEL, (channel: string) => {
      socket.join(channel);
    });
  });
}

export default socketListener;
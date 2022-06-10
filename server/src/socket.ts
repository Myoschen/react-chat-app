import { Server, Socket } from "socket.io";
import { Message } from './models/message.model';
import logger from "./utils/logger";

export const Events = {
  CONNECTION: 'connection',
  JOIN_CHANNEL: 'join_channel',
  SEND_MESSAGE: 'send_message',
};

function socketListener(io: Server) {
  logger.info('✅ Socket enabled...');

  io.on(Events.CONNECTION, (socket: Socket) => {
    logger.info(`User connected ${socket.id}`);

    /**
     * Client send a message to channel or other user
     */
    socket.on(Events.SEND_MESSAGE, (msg: Message) => {
      logger.info(`Message from client: ${msg.from} says ${msg.data}`);
      socket.to(msg.to).emit('receive_message', msg);
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
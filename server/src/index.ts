import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import morgan from 'morgan';
import socketListener from './socket';
import logger from './utils/loggerUtil';
import cors from 'cors';
import db from './utils/dbUtil';
import cookieParser from 'cookie-parser';
import config from './config';
import userRouter from './routes/user.route';
import serverRouter from './routes/server.route';
import channelRouter from './routes/channel.route';
import messageRouter from './routes/message.route';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: config.corsOrigin,
    methods: ["GET", "POST"]
  }
});

// Connect to database
db.init()
  .then(runServer);

// Middleware
app.use(cookieParser());
app.use(cors({
  origin: config.corsOrigin,
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Router
app.use('/api/user', userRouter);
app.use('/api/server', serverRouter);
app.use('/api/channel', channelRouter);
app.use('/api/message', messageRouter);

// Index
app.get('/', (req, res) => {
  res.send('Hello World!');
});

/**
 * Only run server if database
 */
function runServer() {
  httpServer.listen(config.port, () => {
    logger.info(`🚀 Server is listening on http://${config.host}:${config.port}`);
    
    // Initialize after the server listens
    socketListener(io);
  });
}
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import 'dotenv/config';
import morgan from 'morgan';
import socketListener from './socket';
import logger from './utils/logger';

// Models
import { initDB } from './models';
import User from './models/user.model';

// Routes
import userRouter from './routes/user.route';
import serverRouter from './routes/server.route';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.CORS_ORIGIN,
  }
});

// Middleware
app.use(morgan('dev'));
app.use('/user', userRouter);
app.use('/server', serverRouter);

// Index
app.get('/', (req, res) => {
  res.send('Hello World!');
});

httpServer.listen(process.env.PORT, () => {
  logger.info(`🚀 Server is listening on http://${process.env.HOST}:${process.env.PORT}`);
  socketListener(io);
  initDB();
});
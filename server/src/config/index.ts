import 'dotenv/config';

export default {
  host: process.env.HOST ?? 'localhost',
  port: process.env.PORT ?? 3001,
  corsOrigin: process.env.CORS_ORIGIN ?? 'http://localhost:3000',
  databaseUri: process.env.DATABASE_URI ?? 'mongodb://127.0.0.1:27017/chat-app',
  jwtSecret: process.env.JWT_SECRET_KEY ?? 'REACTCHATAPP0530',
  jwtExp: process.env.JWT_EXPIRE_TIME ?? 86400,
};
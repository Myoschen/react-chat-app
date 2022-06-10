import { connect, connection } from "mongoose";
import logger from "../utils/logger";

function initDB() {
  connect(process.env.DATABASE_URI!);
  
  // When connecting to the database for the first time
  connection.once('open', () => {
    logger.info('✅ Successfully connected to the database');
  });

  connection.on('error', (error) => {
    logger.error(`❎ Database error: ${error}`);
  })
}

export { initDB };
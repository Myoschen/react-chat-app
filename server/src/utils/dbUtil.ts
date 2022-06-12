import { connect } from "mongoose";
import config from "../config";
import logger from "./loggerUtil";

/**
 * Initialize database connection
 */
async function init() {
  try {
    await connect(config.databaseUri);
    logger.info('✅ Successfully connected to the database');
  } catch (error) {
    logger.error(`❎ Database error: ${error}`);
  }
}

export default { init };
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initDB = void 0;
const mongoose_1 = require("mongoose");
const logger_1 = __importDefault(require("../utils/logger"));
function initDB() {
    (0, mongoose_1.connect)(process.env.DATABASE_URI);
    // When connecting to the database for the first time
    mongoose_1.connection.once('open', () => {
        logger_1.default.info('✅ Successfully connected to the database');
    });
    mongoose_1.connection.on('error', (error) => {
        logger_1.default.error(`❎ Database error: ${error}`);
    });
}
exports.initDB = initDB;

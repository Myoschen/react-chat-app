"use strict";
var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
exports.default = {
    host: (_a = process.env.HOST) !== null && _a !== void 0 ? _a : 'localhost',
    port: (_b = process.env.PORT) !== null && _b !== void 0 ? _b : 3001,
    corsOrigin: (_c = process.env.CORS_ORIGIN) !== null && _c !== void 0 ? _c : 'http://localhost:3000',
    databaseUri: (_d = process.env.DATABASE_URI) !== null && _d !== void 0 ? _d : 'mongodb://127.0.0.1:27017/chat-app',
    jwtSecret: (_e = process.env.JWT_SECRET_KEY) !== null && _e !== void 0 ? _e : 'REACTCHATAPP0530',
    jwtExp: (_f = process.env.JWT_EXPIRE_TIME) !== null && _f !== void 0 ? _f : 86400,
};

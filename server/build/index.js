"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
require("dotenv/config");
const morgan_1 = __importDefault(require("morgan"));
const socket_1 = __importDefault(require("./socket"));
const logger_1 = __importDefault(require("./utils/logger"));
// Models
const models_1 = require("./models");
// Routes
const user_route_1 = __importDefault(require("./routes/user.route"));
const server_route_1 = __importDefault(require("./routes/server.route"));
const app = (0, express_1.default)();
const httpServer = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: process.env.CORS_ORIGIN,
    }
});
// Middleware
app.use((0, morgan_1.default)('dev'));
app.use('/user', user_route_1.default);
app.use('/server', server_route_1.default);
// Index
app.get('/', (req, res) => {
    res.send('Hello World!');
});
httpServer.listen(process.env.PORT, () => {
    logger_1.default.info(`🚀 Server is listening on http://${process.env.HOST}:${process.env.PORT}`);
    (0, socket_1.default)(io);
    (0, models_1.initDB)();
});

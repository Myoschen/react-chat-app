"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const morgan_1 = __importDefault(require("morgan"));
const socket_1 = __importDefault(require("./socket"));
const loggerUtil_1 = __importDefault(require("./utils/loggerUtil"));
const cors_1 = __importDefault(require("cors"));
const dbUtil_1 = __importDefault(require("./utils/dbUtil"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const config_1 = __importDefault(require("./config"));
const user_route_1 = __importDefault(require("./routes/user.route"));
const server_route_1 = __importDefault(require("./routes/server.route"));
const channel_route_1 = __importDefault(require("./routes/channel.route"));
const message_route_1 = __importDefault(require("./routes/message.route"));
const app = (0, express_1.default)();
const httpServer = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: config_1.default.corsOrigin,
        methods: ["GET", "POST"]
    }
});
// Connect to database
dbUtil_1.default.init()
    .then(runServer);
// Middleware
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: config_1.default.corsOrigin,
}));
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Router
app.use('/api/user', user_route_1.default);
app.use('/api/server', server_route_1.default);
app.use('/api/channel', channel_route_1.default);
app.use('/api/message', message_route_1.default);
// Index
app.get('/', (req, res) => {
    res.send('Hello World!');
});
/**
 * Only run server if database
 */
function runServer() {
    httpServer.listen(config_1.default.port, () => {
        loggerUtil_1.default.info(`🚀 Server is listening on http://${config_1.default.host}:${config_1.default.port}`);
        // Initialize after the server listens
        (0, socket_1.default)(io);
    });
}

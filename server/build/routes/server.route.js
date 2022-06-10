"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const serverRouter = (0, express_1.Router)();
serverRouter.route('/')
    .get((req, res) => {
    res.send('Server Route');
});
exports.default = serverRouter;

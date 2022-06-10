"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userRouter = (0, express_1.Router)();
userRouter.route('/')
    .get((req, res) => {
    res.send('User Route');
});
exports.default = userRouter;

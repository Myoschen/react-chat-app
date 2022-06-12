"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const server_controller_1 = __importDefault(require("../controllers/server.controller"));
const router = (0, express_1.Router)();
router.route('/')
    .post(server_controller_1.default.createServer);
router.route('/:serverId')
    .get(server_controller_1.default.findServer);
exports.default = router;

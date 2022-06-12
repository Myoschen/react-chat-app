"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const createToken = (id) => {
    const token = jsonwebtoken_1.default.sign({ id }, config_1.default.jwtSecret, { expiresIn: config_1.default.jwtExp });
    return token;
};
exports.default = { createToken };

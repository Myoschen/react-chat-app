"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const responseUtil_1 = __importDefault(require("../utils/responseUtil"));
const server_model_1 = __importDefault(require("../models/server.model"));
/**
 * Create a new server
 * @param req
 * @param res
 * @param next
 */
const createServer = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, serverName } = req.body;
    const server = new server_model_1.default({ name: serverName, owner: new mongoose_1.Types.ObjectId(userId) });
    try {
        yield server.save();
        res.status(201).json(responseUtil_1.default.success(true, 'User create successfully', server));
    }
    catch (error) {
        res.status(500).json(responseUtil_1.default.failure(false, 'User create failed', error, 500));
    }
});
const findServer = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.serverId;
    try {
        const server = yield server_model_1.default.findById(id).populate('channels').exec();
        if (!server) {
            res.status(404).json(responseUtil_1.default.failure(false, 'Not found server', null, 404));
        }
        res.status(200).json(responseUtil_1.default.success(true, 'Find server successfully', server));
    }
    catch (error) {
        res.status(500).json(responseUtil_1.default.failure(false, 'Not found server', null, 500));
    }
});
exports.default = { createServer, findServer };

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
const responseUtil_1 = __importDefault(require("../utils/responseUtil"));
const channel_model_1 = __importDefault(require("../models/channel.model"));
const server_model_1 = __importDefault(require("../models/server.model"));
/**
 * Create a new channel
 * @param req
 * @param res
 * @param next
 */
const createChannel = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { serverId, channelName } = req.body;
    const channel = new channel_model_1.default({ name: channelName });
    try {
        yield channel.save();
        yield server_model_1.default.updateOne({ _id: serverId }, { $push: { "channels": channel._id } });
        res.status(201).json(responseUtil_1.default.success(true, 'Channel create successfully', channel));
    }
    catch (error) {
        res.status(500).json(responseUtil_1.default.failure(false, 'Channel create failed', error, 500));
    }
});
exports.default = { createChannel };

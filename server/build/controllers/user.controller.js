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
const user_model_1 = __importDefault(require("../models/user.model"));
const jwtUtil_1 = __importDefault(require("../utils/jwtUtil"));
/**
 * Create a new user
 * @param req
 * @param res
 * @param next
 */
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, email } = req.body;
    const user = new user_model_1.default({ username, password, email });
    try {
        yield user.save();
        res.status(201).json(responseUtil_1.default.success(true, 'User create successfully', user));
    }
    catch (error) {
        res.status(500).json(responseUtil_1.default.failure(false, 'User create failed', error, 500));
    }
});
/**
 * Find user by user id
 * @param req
 * @param res
 * @param next
 */
const findUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.userId;
    try {
        const user = yield user_model_1.default.findById(id).exec();
        if (!user) {
            res.status(404).json(responseUtil_1.default.failure(false, 'Not found user', null, 404));
        }
        res.status(200).json(responseUtil_1.default.success(true, 'Find user successfully', user));
    }
    catch (error) {
        res.status(500).json(responseUtil_1.default.failure(false, 'Not found user', error, 500));
    }
});
/**
 * User login
 * @param req
 * @param res
 * @param next
 */
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield user_model_1.default.login(email, password);
        const token = jwtUtil_1.default.createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: 86400 * 1000 });
        res.status(201).json(responseUtil_1.default.success(true, 'Login successfully', null));
    }
    catch (error) {
        res.status(400).json(responseUtil_1.default.failure(false, 'Login failed', null, 400));
    }
});
exports.default = { createUser, findUser, login };

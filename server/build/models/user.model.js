"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 16,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 20,
    },
    email: {
        type: String,
    }
});
const User = (0, mongoose_1.model)('User', userSchema);
exports.default = User;
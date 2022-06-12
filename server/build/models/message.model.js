"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
;
;
const MessageSchema = new mongoose_1.Schema({
    from: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    to: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        refPath: 'toType',
    },
    toType: {
        type: String,
        required: true,
        enum: ['User', 'Channel'],
    },
    data: {
        type: String,
        required: true,
    },
    dataType: {
        type: String,
        required: true,
        enum: ['TEXT', 'IMAGE'],
    },
    time: {
        type: String,
        required: true,
    }
});
exports.default = (0, mongoose_1.model)('Message', MessageSchema);

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
;
;
const ServerSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, 'Please enter a server name!'],
    },
    owner: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User'
    },
    channels: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Channel' }]
});
exports.default = (0, mongoose_1.model)('Server', ServerSchema);

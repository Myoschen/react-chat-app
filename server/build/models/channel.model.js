"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
;
;
const ChannelSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, 'Please enter a server name!'],
    },
});
exports.default = (0, mongoose_1.model)('Channel', ChannelSchema);

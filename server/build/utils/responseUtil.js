"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const success = (success, message, data) => {
    return {
        'success': success,
        'message': message,
        'data': data
    };
};
const failure = (success, message, data, errorCode) => {
    return {
        'success': success,
        'message': message,
        'data': data,
        'error_code': errorCode
    };
};
exports.default = { success, failure };

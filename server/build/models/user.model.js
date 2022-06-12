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
const bcrypt_1 = __importDefault(require("bcrypt"));
const validator_1 = __importDefault(require("validator"));
;
;
const UserSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: [true, 'Please enter a name!'],
    },
    password: {
        type: String,
        required: true,
        minlength: [6, 'The password should be at least 6 characters long!'],
    },
    email: {
        type: String,
        required: [true, 'Please enter a email!'],
        unique: true,
        lowercase: true,
        validate: [validator_1.default.isEmail, 'Please enter a valid email address!']
    }
});
// Hash password with bcrypt
UserSchema.pre('save', function (next) {
    let user = this;
    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password'))
        return next();
    const encrypted = bcrypt_1.default.hashSync(this.password, 10);
    // Replace the password with the hash
    this.password = encrypted;
    return next();
});
// Compare password
UserSchema.methods.comparePassword = function (password) {
    return bcrypt_1.default.compareSync(password, this.password);
};
// Login
UserSchema.statics.login = function (email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield this.findOne({ email });
        if (user) {
            const isAuthenticated = yield user.comparePassword(password);
            if (isAuthenticated) {
                return user;
            }
            else {
                throw Error('Incorrect password');
            }
        }
        else {
            throw Error('Incorrect email');
        }
    });
};
exports.default = (0, mongoose_1.model)('User', UserSchema);

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
exports.UserModel = exports.StaticUser = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../../config"));
const fullNameSchema = new mongoose_1.Schema({
    firstName: String,
    lastName: String,
});
const addressSchema = new mongoose_1.Schema({
    street: String,
    city: String,
    country: String,
});
const orderSchema = new mongoose_1.Schema({
    productName: String,
    price: Number,
    quantity: Number,
});
const userSchema = new mongoose_1.Schema({
    userId: { type: Number, unique: true },
    username: { type: String, unique: true },
    password: String,
    fullName: fullNameSchema,
    age: Number,
    email: String,
    isActive: Boolean,
    hobbies: (Array),
    address: addressSchema,
    orders: orderSchema,
});
userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const hashed = yield bcrypt_1.default.hash(this.password, Number(config_1.default.saltRounds));
        this.password = hashed;
        next();
    });
});
userSchema.post('save', function () {
    return __awaiter(this, void 0, void 0, function* () {
        this.password = '*****';
    });
});
// static method
userSchema.statics.checkExists = function (userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const checkExists = yield exports.StaticUser.findOne({ userId });
            return checkExists;
        }
        catch (error) {
            throw new Error("Can't check exists");
        }
    });
};
exports.StaticUser = (0, mongoose_1.model)('User', userSchema);
// built in method
exports.UserModel = (0, mongoose_1.model)('User', userSchema);

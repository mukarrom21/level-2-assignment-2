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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServices = void 0;
const user_model_1 = require("./user.model");
const createUserService = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const user = new user_model_1.UserModel(userData);
    const result = yield user.save();
    return result;
});
const getAllUserService = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.UserModel.find();
    return result;
});
const getSingleUserByUserIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.StaticUser.findOne({ userId: id }, { password: 0 });
    return result;
});
const updateUserService = (userId, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.StaticUser.findOneAndUpdate({ userId: userId }, updateData, { new: true });
    return result;
});
const deleteUserService = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(userId);
    const result = yield user_model_1.StaticUser.findOneAndDelete({ userId: userId });
    console.log(result);
    return result;
});
const addNewProductService = (userId, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.StaticUser.findOneAndUpdate({ userId: userId }, updateData, { new: true });
    return result;
});
const getAllProductsService = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.StaticUser.findOne({ userId: userId }, { orders: 1 });
    return result;
});
exports.UserServices = {
    createUserService,
    getAllUserService,
    getSingleUserByUserIdService,
    updateUserService,
    deleteUserService,
    addNewProductService,
    getAllProductsService,
};

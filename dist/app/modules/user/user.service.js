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
// Service to create a new user
const createUserService = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    // Create a new user document using the UserModel
    const user = new user_model_1.UserModel(userData);
    // Save the new user document to the database
    const result = yield user.save();
    // Return the result of the save operation
    return result;
});
// Service to retrieve all users
const getAllUserService = () => __awaiter(void 0, void 0, void 0, function* () {
    // Find all user documents in the UserModel
    const result = yield user_model_1.UserModel.find({}, { _id: 0, username: 1, fullName: 1, age: 1, email: 1, address: 1 });
    return result;
});
// Service to retrieve a single user by userId
const getSingleUserByUserIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // Find a user document by userId in the StaticUser model, excluding the password field
    const result = yield user_model_1.StaticUser.findOne({ userId: id }, { password: 0 });
    return result;
});
// Service to update a user by userId
const updateUserService = (userId, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    // Find and update a user document by userId in the StaticUser model
    const result = yield user_model_1.StaticUser.findOneAndUpdate({ userId: userId }, updateData, { new: true });
    return result;
});
// Service to delete a user by userId
const deleteUserService = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    // Find and delete a user document by userId in the StaticUser model
    const result = yield user_model_1.StaticUser.findOneAndDelete({ userId: userId });
    return result;
});
const addNewProductService = (userId, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.StaticUser.findOneAndUpdate({ userId: userId }, updateData, { new: true });
    return result;
});
// Service to retrieve all products (orders) of a user
const getAllProductsService = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    // Find a user document by userId in the StaticUser model, including only the 'orders' field
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

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
exports.UserControllers = void 0;
const user_validation_1 = __importDefault(require("./user.validation"));
const user_service_1 = require("./user.service");
const user_model_1 = require("./user.model");
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const zodParsedData = user_validation_1.default.parse(req.body);
        const result = yield user_service_1.UserServices.createUserService(zodParsedData);
        res.status(201).json({
            success: true,
            message: 'User created successfully!',
            data: result,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: 'Failed to create the user',
            error: error,
        });
    }
});
const getAllUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_service_1.UserServices.getAllUserService();
        res.status(201).json({
            success: true,
            message: `Successfully retrieved ${result.length} data`,
            data: result,
        });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: 'Failed to retrieved data',
            error: error,
        });
    }
});
const getSingleUserByUserIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const a = yield user_model_1.StaticUser.checkExists(userId);
        if (!a) {
            res.status(404).json({
                success: false,
                message: 'User not found',
                error: {
                    code: 404,
                    description: 'User not found!',
                },
            });
        }
        else {
            const result = yield user_service_1.UserServices.getSingleUserByUserIdService(userId);
            res.status(201).json({
                success: true,
                message: 'User retrieved successfully!',
                data: result,
            });
        }
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: 'User not found',
            error: {
                code: 404,
                description: 'User not found!',
            },
        });
    }
});
const updateUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const body = req.body;
        const a = yield user_model_1.StaticUser.checkExists(userId);
        if (!a) {
            res.status(404).json({
                success: false,
                message: 'User not found',
                error: {
                    code: 404,
                    description: 'User not found!',
                },
            });
        }
        else {
            const result = yield user_service_1.UserServices.updateUserService(userId, body);
            const sanitizedUser = Object.assign({}, result === null || result === void 0 ? void 0 : result.toObject());
            delete sanitizedUser.password;
            res.status(201).json({
                success: true,
                message: 'User updated successfully!',
                data: sanitizedUser,
            });
        }
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: 'Failed to update data',
            error: error,
        });
    }
});
const deleteUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const a = yield user_model_1.StaticUser.checkExists(userId);
        if (!a) {
            res.status(404).json({
                success: false,
                message: 'User not found',
                error: {
                    code: 404,
                    description: 'User not found!',
                },
            });
        }
        else {
            const result = yield user_service_1.UserServices.deleteUserService(userId);
            res.status(201).json({
                success: true,
                message: 'User deleted successfully!',
                data: result,
            });
        }
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: 'Failed to update data',
            error: error,
        });
    }
});
exports.UserControllers = {
    createUser,
    getAllUserController,
    getSingleUserByUserIdController,
    updateUserController,
    deleteUserController,
};

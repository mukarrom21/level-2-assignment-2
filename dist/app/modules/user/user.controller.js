"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.UserControllers = void 0;
const user_validation_1 = __importStar(require("./user.validation"));
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
        const isUserExists = yield user_model_1.StaticUser.checkExists(userId);
        if (!isUserExists) {
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
            message: 'User retrieved failed!',
            error: error,
        });
    }
});
// update a user controller
const updateUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const updateData = req.body;
        // validate with zod validation for user data
        const zodParsedData = user_validation_1.default.parse(updateData);
        const isUserExists = yield user_model_1.StaticUser.checkExists(userId);
        if (!isUserExists) {
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
            const result = yield user_service_1.UserServices.updateUserService(userId, zodParsedData);
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
        const isUserExists = yield user_model_1.StaticUser.checkExists(userId);
        if (!isUserExists) {
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
            yield user_service_1.UserServices.deleteUserService(userId);
            res.status(201).json({
                success: true,
                message: 'User deleted successfully!',
                data: null,
            });
        }
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: 'Failed to deleted data',
            error: error,
        });
    }
});
// add new order in user data controller
const addNewProductController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        // validate with zod validation for user data
        const zodParsedOrderData = user_validation_1.orderValidation.parse(req.body);
        const isUserExists = yield user_model_1.StaticUser.checkExists(userId);
        if (!isUserExists) {
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
            // console.log(isUserExists)
            if (!isUserExists.orders) {
                isUserExists.orders = [];
            }
            isUserExists.orders.push(zodParsedOrderData);
            yield user_service_1.UserServices.addNewProductService(userId, isUserExists);
            res.status(200).json({
                success: true,
                message: 'Order created successfully!',
                data: null,
            });
        }
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: 'Failed to add order data',
            error: error,
        });
    }
});
// Retrieve all orders of the user controller
const getAllOrdersController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { userId } = req.params;
        const isUserExists = yield user_model_1.StaticUser.checkExists(userId);
        if (!isUserExists) {
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
            if (!isUserExists.orders || ((_a = isUserExists.orders) === null || _a === void 0 ? void 0 : _a.length) === 0) {
                res.status(200).json({
                    success: true,
                    message: 'This user has no order!',
                    data: null,
                });
            }
            else {
                res.status(200).json({
                    success: true,
                    message: 'Order fetched successfully!',
                    data: isUserExists.orders,
                });
            }
        }
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: 'Failed to add order data',
            error: error,
        });
    }
});
// calculate total price of all orders controller
const totalPriceOfOrdersController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const { userId } = req.params;
        const isUserExists = yield user_model_1.StaticUser.checkExists(userId);
        if (!isUserExists) {
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
            // console.log(isUserExists)
            if (!isUserExists.orders || ((_b = isUserExists.orders) === null || _b === void 0 ? void 0 : _b.length) === 0) {
                res.status(200).json({
                    success: true,
                    message: 'This user has no order!',
                    data: null,
                });
            }
            else {
                const totalPrice = isUserExists.orders.reduce((total, order) => total + order.price * order.quantity, 0);
                res.status(200).json({
                    success: true,
                    message: 'Total price calculated successfully!',
                    data: totalPrice,
                });
            }
        }
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: 'Failed to calculate orders total price',
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
    addNewProductController,
    getAllProductsController: getAllOrdersController,
    totalPriceOfOrdersController,
};

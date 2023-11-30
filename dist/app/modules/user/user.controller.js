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
// Controller for creating a new user
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // validate user input using ZOD validation
        const zodParsedData = user_validation_1.default.parse(req.body);
        // Call the user service to create a new user
        const result = yield user_service_1.UserServices.createUserService(zodParsedData);
        // Respond with success message and created user data
        res.status(201).json({
            success: true,
            message: 'User created successfully!',
            data: result,
        });
    }
    catch (error) {
        // Handle errors during user creation
        res.status(400).json({
            success: false,
            message: 'Failed to create the user',
            error: error,
        });
    }
});
// Controller for retrieving all users
const getAllUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Call the user service to retrieve all users
        const result = yield user_service_1.UserServices.getAllUserService();
        res.status(201).json({
            success: true,
            message: `Successfully retrieved ${result.length} data`,
            data: result,
        });
    }
    catch (error) {
        // Handle errors during user retrieval
        res.status(400).json({
            success: false,
            message: 'Failed to retrieved data',
            error: error,
        });
    }
});
// Controller for retrieving a single user by userId
const getSingleUserByUserIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        // Check if the user exists
        const isUserExists = yield user_model_1.StaticUser.checkExists(userId);
        if (!isUserExists) {
            // Response if the user is not found
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
            // Call the user service to retrieve a single user by userId
            const result = yield user_service_1.UserServices.getSingleUserByUserIdService(userId);
            // Response with success message and retrieved user data
            res.status(201).json({
                success: true,
                message: 'User retrieved successfully!',
                data: result,
            });
        }
    }
    catch (error) {
        // Handle errors during user retrieval
        res.status(404).json({
            success: false,
            message: 'User retrieved failed!',
            error: error,
        });
    }
});
// Controller for updating single user
const updateUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const updateData = req.body;
        // validate with zod validation for user input
        const zodParsedData = user_validation_1.default.parse(updateData);
        // check if user not exists
        const isUserExists = yield user_model_1.StaticUser.checkExists(userId);
        if (!isUserExists) {
            // Response 404 if user not found
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
            // call user service for updating user
            const result = yield user_service_1.UserServices.updateUserService(userId, zodParsedData);
            // Remove the password from the response data for security reasons
            const sanitizedUser = Object.assign({}, result === null || result === void 0 ? void 0 : result.toObject());
            delete sanitizedUser.password;
            //  Response with success message and updated user data
            res.status(201).json({
                success: true,
                message: 'User updated successfully!',
                data: sanitizedUser,
            });
        }
    }
    catch (error) {
        // Handle errors during user update
        res.status(400).json({
            success: false,
            message: 'Failed to update data',
            error: error,
        });
    }
});
// Controller for deleting a user
const deleteUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        // Check if the user exists
        const isUserExists = yield user_model_1.StaticUser.checkExists(userId);
        if (!isUserExists) {
            // Respond  404 error if user is not found
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
            // Call the user service to delete the user
            yield user_service_1.UserServices.deleteUserService(userId);
            // Respond with success message for user deletion
            res.status(201).json({
                success: true,
                message: 'User deleted successfully!',
                data: null,
            });
        }
    }
    catch (error) {
        // Handle errors during user deletion
        res.status(400).json({
            success: false,
            message: 'Failed to deleted data',
            error: error,
        });
    }
});
// Controller for adding a new order to a user
const addNewOrderController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        // Validate order input using Zod validation
        const zodParsedOrderData = user_validation_1.orderValidation.parse(req.body);
        // Check if the user exists
        const isUserExists = yield user_model_1.StaticUser.checkExists(userId);
        if (!isUserExists) {
            // Respond with a 404 error if the user is not found
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
            // Check if the user has an existing 'orders' array; if not, create it
            if (!isUserExists.orders) {
                isUserExists.orders = [];
            }
            // Add the new order to the 'orders' array and call the service to update the user
            isUserExists.orders.push(zodParsedOrderData);
            yield user_service_1.UserServices.addNewProductService(userId, isUserExists);
            // Respond with success message for order creation
            res.status(200).json({
                success: true,
                message: 'Order created successfully!',
                data: null,
            });
        }
    }
    catch (error) {
        // Handle errors during order addition
        res.status(400).json({
            success: false,
            message: 'Failed to add order data',
            error: error,
        });
    }
});
// Controller for retrieving all orders of a user
const getAllOrdersController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { userId } = req.params;
        // Check if the user exists
        const isUserExists = yield user_model_1.StaticUser.checkExists(userId);
        if (!isUserExists) {
            // Respond with a 404 error if the user is not found
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
            // check if the user has not order property or empty array
            if (!isUserExists.orders || ((_a = isUserExists.orders) === null || _a === void 0 ? void 0 : _a.length) === 0) {
                res.status(200).json({
                    success: true,
                    message: 'This user has no order!',
                    data: null,
                });
            }
            else {
                // Respond with success message and the list of orders
                res.status(200).json({
                    success: true,
                    message: 'Order fetched successfully!',
                    data: isUserExists.orders,
                });
            }
        }
    }
    catch (error) {
        // Handle errors during order retrieval
        res.status(400).json({
            success: false,
            message: 'Failed to add order data',
            error: error,
        });
    }
});
// Controller for calculating the total price of all orders for a user
const totalPriceOfOrdersController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const { userId } = req.params;
        // check if the user exists
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
            // check if the user has not order property or empty array
            if (!isUserExists.orders || ((_b = isUserExists.orders) === null || _b === void 0 ? void 0 : _b.length) === 0) {
                res.status(200).json({
                    success: true,
                    message: 'This user has no order!',
                    data: null,
                });
            }
            else {
                // Calculate the total price of all orders
                const totalPrice = isUserExists.orders.reduce((total, order) => total + order.price * order.quantity, 0);
                // Calculate the total price of all orders
                res.status(200).json({
                    success: true,
                    message: 'Total price calculated successfully!',
                    data: totalPrice,
                });
            }
        }
    }
    catch (error) {
        // Handle errors during total price calculation
        res.status(400).json({
            success: false,
            message: 'Failed to calculate orders total price',
            error: error,
        });
    }
});
// Export all user controller
exports.UserControllers = {
    createUser,
    getAllUserController,
    getSingleUserByUserIdController,
    updateUserController,
    deleteUserController,
    addNewOrderController,
    getAllOrdersController,
    totalPriceOfOrdersController,
};

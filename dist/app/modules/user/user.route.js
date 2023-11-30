"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
// Express router instance
const router = express_1.default.Router();
// Define a route to get all users
router.get('/', user_controller_1.UserControllers.getAllUserController);
// Define a route to create a new user
router.post('/', user_controller_1.UserControllers.createUser);
// Define a route to get a single user by userId
router.get('/:userId', user_controller_1.UserControllers.getSingleUserByUserIdController);
// Define a route to update a user by userId
router.put('/:userId', user_controller_1.UserControllers.updateUserController);
// Define a route to delete a user by userId
router.delete('/:userId', user_controller_1.UserControllers.deleteUserController);
// Define a route to add a new order to a user by userId
router.put('/:userId/orders', user_controller_1.UserControllers.addNewOrderController);
// Define a route to get all orders of a user by userId
router.get('/:userId/orders', user_controller_1.UserControllers.getAllOrdersController);
// Define a route to get the total price of all orders for a user by userId
router.get('/:userId/orders/total-price', user_controller_1.UserControllers.totalPriceOfOrdersController);
// Export the router for use in other files
exports.UserRoutes = router;

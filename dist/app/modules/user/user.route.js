"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const router = express_1.default.Router();
router.get('/', user_controller_1.UserControllers.getAllUserController);
router.post('/', user_controller_1.UserControllers.createUser);
router.get('/:userId', user_controller_1.UserControllers.getSingleUserByUserIdController);
router.put('/:userId', user_controller_1.UserControllers.updateUserController);
router.delete('/:userId', user_controller_1.UserControllers.updateUserController);
exports.UserRoutes = router;

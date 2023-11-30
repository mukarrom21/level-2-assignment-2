"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const user_route_1 = require("./app/modules/user/user.route");
// Create an Express application instance
const app = (0, express_1.default)();
// Middleware setup: Parse incoming JSON requests and enable CORS
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// api routes
app.use('/api/users', user_route_1.UserRoutes);
// simple root route with welcome message
app.get('/', (req, res) => {
    res.send('Welcome to my express.ts server app');
});
exports.default = app;

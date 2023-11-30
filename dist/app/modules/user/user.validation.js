"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidation = exports.orderValidation = exports.addressValidation = exports.fullNameValidation = void 0;
const zod_1 = require("zod");
// Validation schema for full name
exports.fullNameValidation = zod_1.z.object({
    firstName: zod_1.z.string().min(1, { message: 'First name is required' }),
    lastName: zod_1.z.string().min(1, { message: 'Last name is required' }),
});
// Validation schema for address
exports.addressValidation = zod_1.z.object({
    street: zod_1.z.string().min(1, { message: 'street is required' }),
    city: zod_1.z.string().min(1, { message: 'city is required' }),
    country: zod_1.z.string().min(1, { message: 'country is required' }),
});
// Validation schema for an order
exports.orderValidation = zod_1.z.object({
    productName: zod_1.z.string().min(1, { message: 'product name is required' }),
    price: zod_1.z.number().min(1, { message: 'price is required' }),
    quantity: zod_1.z.number().min(1, { message: 'quantity is required' }),
});
// Validation schema for a user
exports.userValidation = zod_1.z.object({
    userId: zod_1.z.number({
        required_error: 'User id is required',
        invalid_type_error: 'User id must be a number',
    }),
    username: zod_1.z
        .string()
        .min(1, { message: 'username is required' })
        .trim()
        .toLowerCase(),
    password: zod_1.z.string(),
    fullName: exports.fullNameValidation.required(),
    age: zod_1.z.number().lt(200),
    email: zod_1.z
        .string()
        .min(1, { message: 'Email is required' })
        .email({ message: 'Invalid email address' }),
    isActive: zod_1.z.boolean().default(true),
    hobbies: zod_1.z.array(zod_1.z.string()),
    address: exports.addressValidation,
    orders: zod_1.z.array(exports.orderValidation).optional(),
});
// Export the user validation schema
exports.default = exports.userValidation;

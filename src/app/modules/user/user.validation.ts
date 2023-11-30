import { z } from 'zod'

// Validation schema for full name
export const fullNameValidation = z.object({
  firstName: z.string().min(1, { message: 'First name is required' }),
  lastName: z.string().min(1, { message: 'Last name is required' }),
})

// Validation schema for address
export const addressValidation = z.object({
  street: z.string().min(1, { message: 'street is required' }),
  city: z.string().min(1, { message: 'city is required' }),
  country: z.string().min(1, { message: 'country is required' }),
})

// Validation schema for an order
export const orderValidation = z.object({
  productName: z.string().min(1, { message: 'product name is required' }),
  price: z.number().min(1, { message: 'price is required' }),
  quantity: z.number().min(1, { message: 'quantity is required' }),
})

// Validation schema for a user
export const userValidation = z.object({
  userId: z.number({
    required_error: 'User id is required',
    invalid_type_error: 'User id must be a number',
  }),
  username: z
    .string()
    .min(1, { message: 'username is required' })
    .trim()
    .toLowerCase(),
  password: z.string(),
  fullName: fullNameValidation.required(),
  age: z.number().lt(200),
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Invalid email address' }),
  isActive: z.boolean().default(true),
  hobbies: z.array(z.string()),
  address: addressValidation,
  orders: z.array(orderValidation).optional(),
})

// Export the user validation schema
export default userValidation

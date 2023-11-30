import express from 'express'
import { UserControllers } from './user.controller'

// Express router instance
const router = express.Router()

// Define a route to get all users
router.get('/', UserControllers.getAllUserController)

// Define a route to create a new user
router.post('/', UserControllers.createUser)

// Define a route to get a single user by userId
router.get('/:userId', UserControllers.getSingleUserByUserIdController)

// Define a route to update a user by userId
router.put('/:userId', UserControllers.updateUserController)

// Define a route to delete a user by userId
router.delete('/:userId', UserControllers.deleteUserController)

// Define a route to add a new order to a user by userId
router.put('/:userId/orders', UserControllers.addNewOrderController)

// Define a route to get all orders of a user by userId
router.get('/:userId/orders', UserControllers.getAllOrdersController)

// Define a route to get the total price of all orders for a user by userId
router.get(
  '/:userId/orders/total-price',
  UserControllers.totalPriceOfOrdersController,
)

// Export the router for use in other files
export const UserRoutes = router

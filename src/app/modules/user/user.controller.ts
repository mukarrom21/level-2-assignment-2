import { Request, Response } from 'express'
import userValidation, { orderValidation } from './user.validation'
import { UserServices } from './user.service'
import { StaticUser } from './user.model'

// Controller for creating a new user
const createUser = async (req: Request, res: Response) => {
  try {
    // validate user input using ZOD validation
    const zodParsedData = userValidation.parse(req.body)
    // Call the user service to create a new user
    const result = await UserServices.createUserService(zodParsedData)
    // Respond with success message and created user data
    res.status(201).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    })
  } catch (error) {
    // Handle errors during user creation
    res.status(400).json({
      success: false,
      message: 'Failed to create the user',
      error: error,
    })
  }
}

// Controller for retrieving all users
const getAllUserController = async (req: Request, res: Response) => {
  try {
    // Call the user service to retrieve all users
    const result = await UserServices.getAllUserService()

    res.status(201).json({
      success: true,
      message: `Successfully retrieved ${result.length} data`,
      data: result,
    })
  } catch (error) {
    // Handle errors during user retrieval
    res.status(400).json({
      success: false,
      message: 'Failed to retrieved data',
      error: error,
    })
  }
}
// Controller for retrieving a single user by userId
const getSingleUserByUserIdController = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params
    // Check if the user exists
    const isUserExists = await StaticUser.checkExists(userId)

    if (!isUserExists) {
      // Response if the user is not found
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      })
    } else {
      // Call the user service to retrieve a single user by userId
      const result = await UserServices.getSingleUserByUserIdService(userId)

      // Response with success message and retrieved user data
      res.status(201).json({
        success: true,
        message: 'User retrieved successfully!',
        data: result,
      })
    }
  } catch (error) {
    // Handle errors during user retrieval
    res.status(404).json({
      success: false,
      message: 'User retrieved failed!',
      error: error,
    })
  }
}

// Controller for updating single user
const updateUserController = async (req: Request, res: Response) => {
  try {
    const userId: string = req.params.userId
    const updateData = req.body

    // validate with zod validation for user input
    const zodParsedData = userValidation.parse(updateData)

    // check if user not exists
    const isUserExists = await StaticUser.checkExists(userId)

    if (!isUserExists) {
      // Response 404 if user not found
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      })
    } else {
      // call user service for updating user
      const result = await UserServices.updateUserService(userId, zodParsedData)

      // Remove the password from the response data for security reasons
      const sanitizedUser = { ...result?.toObject() }
      delete sanitizedUser.password

      //  Response with success message and updated user data
      res.status(201).json({
        success: true,
        message: 'User updated successfully!',
        data: sanitizedUser,
      })
    }
  } catch (error) {
    // Handle errors during user update
    res.status(400).json({
      success: false,
      message: 'Failed to update data',
      error: error,
    })
  }
}

// Controller for deleting a user
const deleteUserController = async (req: Request, res: Response) => {
  try {
    const userId: string = req.params.userId

    // Check if the user exists
    const isUserExists = await StaticUser.checkExists(userId)
    if (!isUserExists) {
      // Respond  404 error if user is not found
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      })
    } else {
      // Call the user service to delete the user
      await UserServices.deleteUserService(userId)

      // Respond with success message for user deletion
      res.status(201).json({
        success: true,
        message: 'User deleted successfully!',
        data: null,
      })
    }
  } catch (error) {
    // Handle errors during user deletion
    res.status(400).json({
      success: false,
      message: 'Failed to deleted data',
      error: error,
    })
  }
}

// Controller for adding a new order to a user
const addNewOrderController = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params

    // Validate order input using Zod validation
    const zodParsedOrderData = orderValidation.parse(req.body)

    // Check if the user exists
    const isUserExists = await StaticUser.checkExists(userId)
    if (!isUserExists) {
      // Respond with a 404 error if the user is not found
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      })
    } else {
      // Check if the user has an existing 'orders' array; if not, create it
      if (!isUserExists.orders) {
        isUserExists.orders = []
      }

      // Add the new order to the 'orders' array and call the service to update the user
      isUserExists.orders.push(zodParsedOrderData)
      await UserServices.addNewProductService(userId, isUserExists)

      // Respond with success message for order creation
      res.status(200).json({
        success: true,
        message: 'Order created successfully!',
        data: null,
      })
    }
  } catch (error) {
    // Handle errors during order addition
    res.status(400).json({
      success: false,
      message: 'Failed to add order data',
      error: error,
    })
  }
}

// Controller for retrieving all orders of a user
const getAllOrdersController = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params

    // Check if the user exists
    const isUserExists = await StaticUser.checkExists(userId)

    if (!isUserExists) {
      // Respond with a 404 error if the user is not found
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      })
    } else {
      // check if the user has not order property or empty array
      if (!isUserExists.orders || isUserExists.orders?.length === 0) {
        res.status(200).json({
          success: true,
          message: 'This user has no order!',
          data: null,
        })
      } else {
        // Respond with success message and the list of orders
        res.status(200).json({
          success: true,
          message: 'Order fetched successfully!',
          data: isUserExists.orders,
        })
      }
    }
  } catch (error) {
    // Handle errors during order retrieval
    res.status(400).json({
      success: false,
      message: 'Failed to add order data',
      error: error,
    })
  }
}

// Controller for calculating the total price of all orders for a user
const totalPriceOfOrdersController = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params

    // check if the user exists
    const isUserExists = await StaticUser.checkExists(userId)
    if (!isUserExists) {
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      })
    } else {
      // check if the user has not order property or empty array
      if (!isUserExists.orders || isUserExists.orders?.length === 0) {
        res.status(200).json({
          success: true,
          message: 'This user has no order!',
          data: null,
        })
      } else {
        // Calculate the total price of all orders
        const totalPrice = isUserExists.orders.reduce(
          (total, order) => total + order.price * order.quantity,
          0,
        )

        // Calculate the total price of all orders
        res.status(200).json({
          success: true,
          message: 'Total price calculated successfully!',
          data: totalPrice,
        })
      }
    }
  } catch (error) {
    // Handle errors during total price calculation
    res.status(400).json({
      success: false,
      message: 'Failed to calculate orders total price',
      error: error,
    })
  }
}

// Export all user controller
export const UserControllers = {
  createUser,
  getAllUserController,
  getSingleUserByUserIdController,
  updateUserController,
  deleteUserController,
  addNewOrderController,
  getAllOrdersController,
  totalPriceOfOrdersController,
}

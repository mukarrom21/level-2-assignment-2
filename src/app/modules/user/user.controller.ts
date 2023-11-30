import { Request, Response } from 'express'
import userValidation, { orderValidation } from './user.validation'
import { UserServices } from './user.service'
import { StaticUser } from './user.model'
import { IOrder } from './user.interface'

const createUser = async (req: Request, res: Response) => {
  try {
    const zodParsedData = userValidation.parse(req.body)
    const result = await UserServices.createUserService(zodParsedData)
    res.status(201).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to create the user',
      error: error,
    })
  }
}

const getAllUserController = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getAllUserService()
    res.status(201).json({
      success: true,
      message: `Successfully retrieved ${result.length} data`,
      data: result,
    })
  } catch (error) {
    console.log(error)
    res.status(400).json({
      success: false,
      message: 'Failed to retrieved data',
      error: error,
    })
  }
}

const getSingleUserByUserIdController = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params
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
      const result = await UserServices.getSingleUserByUserIdService(userId)
      res.status(201).json({
        success: true,
        message: 'User retrieved successfully!',
        data: result,
      })
    }
  } catch (error) {
    res.status(404).json({
      success: false,
      message: 'User retrieved failed!',
      error: error,
    })
  }
}

// update a user controller
const updateUserController = async (req: Request, res: Response) => {
  try {
    const userId: string = req.params.userId
    const updateData = req.body

    // validate with zod validation for user data
    const zodParsedData = userValidation.parse(updateData)

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
      const result = await UserServices.updateUserService(userId, zodParsedData)
      const sanitizedUser = { ...result?.toObject() }
      delete sanitizedUser.password
      res.status(201).json({
        success: true,
        message: 'User updated successfully!',
        data: sanitizedUser,
      })
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to update data',
      error: error,
    })
  }
}

const deleteUserController = async (req: Request, res: Response) => {
  try {
    const userId: string = req.params.userId
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
      await UserServices.deleteUserService(userId)
      res.status(201).json({
        success: true,
        message: 'User deleted successfully!',
        data: null,
      })
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to deleted data',
      error: error,
    })
  }
}

// add new order in user data controller
const addNewProductController = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params
    // validate with zod validation for user data
    const zodParsedOrderData = orderValidation.parse(req.body)
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
      // console.log(isUserExists)
      if (!isUserExists.orders) {
        isUserExists.orders = []
      }
      isUserExists.orders.push(zodParsedOrderData)
      await UserServices.addNewProductService(userId, isUserExists)
      res.status(200).json({
        success: true,
        message: 'Order created successfully!',
        data: null,
      })
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to add order data',
      error: error,
    })
  }
}

// Retrieve all orders of the user controller
const getAllOrdersController = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params
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
      if (!isUserExists.orders || isUserExists.orders?.length === 0) {
        res.status(200).json({
          success: true,
          message: 'This user has no order!',
          data: null,
        })
      } else {
        res.status(200).json({
          success: true,
          message: 'Order fetched successfully!',
          data: isUserExists.orders,
        })
      }
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to add order data',
      error: error,
    })
  }
}

// calculate total price of all orders controller
const totalPriceOfOrdersController = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params
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
      // console.log(isUserExists)
      if (!isUserExists.orders || isUserExists.orders?.length === 0) {
        res.status(200).json({
          success: true,
          message: 'This user has no order!',
          data: null,
        })
      } else {
        const totalPrice = isUserExists.orders.reduce(
          (total, order) => total + order.price * order.quantity,
          0,
        )
        res.status(200).json({
          success: true,
          message: 'Total price calculated successfully!',
          data: totalPrice,
        })
      }
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to calculate orders total price',
      error: error,
    })
  }
}

export const UserControllers = {
  createUser,
  getAllUserController,
  getSingleUserByUserIdController,
  updateUserController,
  deleteUserController,
  addNewProductController,
  getAllProductsController: getAllOrdersController,
  totalPriceOfOrdersController,
}

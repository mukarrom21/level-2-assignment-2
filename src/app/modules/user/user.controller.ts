import { Request, Response } from 'express'
import userValidation from './user.validation'
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

const updateUserController = async (req: Request, res: Response) => {
  try {
    const userId: string = req.params.userId
    const body = req.body
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
      const result = await UserServices.updateUserService(userId, body)
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

const addNewProductController = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params
    const order: IOrder = req.body
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
      isUserExists.orders.push(order)
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

export const UserControllers = {
  createUser,
  getAllUserController,
  getSingleUserByUserIdController,
  updateUserController,
  deleteUserController,
  addNewProductController,
}

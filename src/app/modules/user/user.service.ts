import { IUser } from './user.interface'
import { StaticUser, UserModel } from './user.model'

// Service to create a new user
const createUserService = async (userData: IUser) => {
  // Create a new user document using the UserModel
  const user = new UserModel(userData)

  // Save the new user document to the database
  const result = await user.save()

  // Return the result of the save operation
  return result
}

// Service to retrieve all users
const getAllUserService = async () => {
  // Find all user documents in the UserModel
  const result = await UserModel.find(
    {},
    { _id: 0, username: 1, fullName: 1, age: 1, email: 1, address: 1 },
  )

  return result
}

// Service to retrieve a single user by userId
const getSingleUserByUserIdService = async (id: string) => {
  // Find a user document by userId in the StaticUser model, excluding the password field
  const result = await StaticUser.findOne({ userId: id }, { password: 0 })

  return result
}

// Service to update a user by userId
const updateUserService = async (userId: string, updateData: IUser) => {
  // Find and update a user document by userId in the StaticUser model
  const result = await StaticUser.findOneAndUpdate(
    { userId: userId },
    updateData,
    { new: true },
  )
  return result
}

// Service to delete a user by userId
const deleteUserService = async (userId: string) => {
  // Find and delete a user document by userId in the StaticUser model
  const result = await StaticUser.findOneAndDelete({ userId: userId })

  return result
}

const addNewProductService = async (userId: string, updateData: IUser) => {
  const result = await StaticUser.findOneAndUpdate(
    { userId: userId },
    updateData,
    { new: true },
  )
  return result
}

// Service to retrieve all products (orders) of a user
const getAllProductsService = async (userId: string) => {
  // Find a user document by userId in the StaticUser model, including only the 'orders' field
  const result = await StaticUser.findOne({ userId: userId }, { orders: 1 })

  return result
}

export const UserServices = {
  createUserService,
  getAllUserService,
  getSingleUserByUserIdService,
  updateUserService,
  deleteUserService,
  addNewProductService,
  getAllProductsService,
}

import { IUser } from './user.interface'
import { StaticUser, UserModel } from './user.model'

const createUserService = async (userData: IUser) => {
  const user = new UserModel(userData)
  const result = await user.save()
  return result
}

const getAllUserService = async () => {
  const result = await UserModel.find()
  return result
}

const getSingleUserByUserIdService = async (id: string) => {
  const result = await StaticUser.findOne({ userId: id }, { password: 0 })
  return result
}

const updateUserService = async (userId: string, updateData: IUser) => {
  const result = await StaticUser.findOneAndUpdate(
    { userId: userId },
    updateData,
    { new: true },
  )
  return result
}

const deleteUserService = async (userId: string) => {
  console.log(userId)
  const result = await StaticUser.findOneAndDelete({ userId: userId })
  console.log(result)
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

const getAllProductsService = async (userId: string) => {
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

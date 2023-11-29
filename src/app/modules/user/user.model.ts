import { Schema, model } from 'mongoose'
import {
  IAddress,
  IFullName,
  IOrders,
  IUser,
  UserStaticModel,
  // IUserMethods,
} from './user.interface'
import bcrypt from 'bcrypt'
import config from '../../config'

const fullNameSchema = new Schema<IFullName>({
  firstName: String,
  lastName: String,
})

const addressSchema = new Schema<IAddress>({
  street: String,
  city: String,
  country: String,
})

const orderSchema = new Schema<IOrders>({
  productName: String,
  price: Number,
  quantity: Number,
})

const userSchema = new Schema<IUser, UserStaticModel>({
  userId: { type: Number, unique: true },
  username: { type: String, unique: true },
  password: String,
  fullName: fullNameSchema,
  age: Number,
  email: String,
  isActive: Boolean,
  hobbies: Array<string>,
  address: addressSchema,
  orders: orderSchema,
})

userSchema.pre('save', async function (next) {
  const hashed = await bcrypt.hash(this.password, Number(config.saltRounds))
  this.password = hashed
  next()
})

userSchema.post('save', async function () {
  this.password = '*****'
})

// static method
userSchema.statics.checkExists = async function (userId: string) {
  try {
    const checkExists = await StaticUser.findOne({ userId })
    return checkExists
  } catch (error) {
    throw new Error("Can't check exists")
  }
}
export const StaticUser = model<IUser, UserStaticModel>('User', userSchema)

// built in method
export const UserModel = model<IUser>('User', userSchema)

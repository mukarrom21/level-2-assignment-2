import { Model } from 'mongoose'

// Full name type
export type IFullName = {
  firstName: string
  lastName: string
}

// Address type
export type IAddress = {
  street: string
  city: string
  country: string
}

// Order type
export type IOrder = {
  productName: string
  price: number
  quantity: number
}

// user type
export type IUser = {
  userId: number
  username: string
  password: string
  fullName: IFullName
  age: number
  email: string
  isActive: boolean
  hobbies: Array<string>
  address: IAddress
  orders?: Array<IOrder>
}

// interface for the UserStaticModel that extends the mongoose Model
export interface UserStaticModel extends Model<IUser> {
  checkExists(userId: string): Promise<IUser | null>
}

// export interface IUserMethods {
//   isUserExists(): string
// }

// export type UserModel = Model<IUser, Record<string, never>, IUserMethods>

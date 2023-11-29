import { Model } from 'mongoose'

export type IFullName = {
  firstName: string
  lastName: string
}

export type IAddress = {
  street: string
  city: string
  country: string
}

export type IOrders = {
  productName: string
  price: number
  quantity: number
}

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
  orders?: IOrders
}

export interface UserStaticModel extends Model<IUser> {
  checkExists(userId: string): Promise<IUser | null>
}

// export interface IUserMethods {
//   isUserExists(): string
// }

// export type UserModel = Model<IUser, Record<string, never>, IUserMethods>

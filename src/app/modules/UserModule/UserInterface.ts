/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';
import { User_role } from './UserContants';

export interface IUser {
  username: string;
  email: string;
  password: string;
  role: 'seller' | 'buyer';
}

export interface UserModel extends Model<IUser> {
  isUserExists(username: string): Promise<IUser>;
  isPasswordCorrect(
    plaintextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
  isCreatedBy(username: string): Promise<string>;
}

export type TUserRole = keyof typeof User_role;

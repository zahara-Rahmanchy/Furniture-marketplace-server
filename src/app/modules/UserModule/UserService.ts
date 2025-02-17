/* eslint-disable no-unused-vars */
import { IUser } from './UserInterface';
import { User } from './UserModel';

const createUserInDB = async (user: IUser) => {
  const result = await User.create(user);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  return result;
};

export const UserService = {
  createUserInDB,
};

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import httpStatus, { UNAUTHORIZED } from 'http-status';
import AppError from '../../middlewares/AppError';
import { User } from '../UserModule/UserModel';
import { ILoginUser } from './AuthInterface';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../config';

import bcrypt from 'bcrypt';
import { Types } from 'mongoose';
const LoginUserToDB = async (payload: ILoginUser) => {
  console.log(payload);
  const userData = await User.isUserExists(payload.username);
  // const { username, email, password, role, ...rest } = userData;
  // console.log('rest: ', rest);
  console.log('userData: ', userData);
  // const { createdAt,updatedAt,...rest} = userData
  if (!userData) {
    throw new AppError(httpStatus.NOT_FOUND, 'User is not found!');
  }

  // checking the password with the db password

  if (!(await User.isPasswordCorrect(payload?.password, userData?.password))) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched');
  }

  // creating jwt token, giving username and role in payload

  const jwtPayload = {
    username: userData?.username,
    role: userData?.role,
  };

  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: '15d',
  });
  console.log(accessToken);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  return {
    user: userData,
    accessToken,
  };
};

// const changePassword = async (
//   jwtData: JwtPayload,
//   payload: { currentPassword: string; newPassword: string },
// ) => {
//   console.log(payload);
//   console.log(jwtData);
//   const userData = await User.isUserExists(jwtData.username);
//   if (!userData) {
//     throw new AppError(httpStatus.NOT_FOUND, 'User is not found!');
//   }
//   if (
//     !(await User.isPasswordCorrect(payload.currentPassword, userData?.password))
//   )
//     throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched');

//   const newhashedPassword = await bcrypt.hash(
//     payload.newPassword,
//     Number(config.bcrypt_salt_rounds),
//   );
//   const historyData = {
//     username: userData?.username,
//     password: userData.password,
//     time: new Date(),
//   };
//   //  $position: 0,
//   // $slice: 2,
//   const result = await User.findOneAndUpdate(
//     { username: jwtData.username, role: jwtData.role },
//     {
//       $set: { password: newhashedPassword },

//       $push: {
//         passwordHistory: { $each: [historyData], $positon: -1, $slice: -2 },
//       },
//     },
//     {
//       projection: { passwordHistory: 0 },
//       new: true,
//     },
//   );
//   return result;
// };
export const AuthService = {
  LoginUserToDB,
  // changePassword,
};

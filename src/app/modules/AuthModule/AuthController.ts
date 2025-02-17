/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AuthService } from './AuthService';
import {
  LoginValidationSchema,
  changePasswordValidationSchema,
} from './AuthValidation';

const LoginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cate = req.body;
    //   console.log(user);
    const { error, value } = LoginValidationSchema.validate(cate);

    if (error) {
      return next(error);
    }
    console.log(value);
    const result = await AuthService.LoginUserToDB(value);

    return res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'User login successful!',
      data: result,
    }); // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error) {
    next(error);
  }
};

export const AuthController = {
  LoginUser,
  // changePassword,
};

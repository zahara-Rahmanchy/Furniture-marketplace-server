/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from 'express';

import sendResponse from '../../utils/sendResponse';
import { UserService } from './UserService';
import { UserValidationSchema } from './UserValidation';

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const { error, value } = UserValidationSchema.validate(req.body);
  if (error) {
    return next(error);
  }
  try {
    const result = await UserService.createUserInDB(value);

    sendResponse(res, {
      success: true,
      statusCode: 201,
      message: 'User registered successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
export const UserController = {
  createUser,
};

/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
// import AppError from './AppError';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { TUserRole } from '../modules/UserModule/UserInterface';
import UNAUTHORIZEDError from './UnauthorizedError';

const auth = (...roles: TUserRole[]) => {
  // eslint-disable-next-line no-unused-vars
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    // check if the token is not available
    if (!token) {
      throw new UNAUTHORIZEDError(
        httpStatus.UNAUTHORIZED,
        'Unauthorized Access',
        'You do not have the necessary permissions to access this resource.',
        '',
        '',
      );
    }

    // checking the token validation
    let decoded;
    try {
      decoded = jwt.verify(
        token,
        config.jwt_access_secret as string,
      ) as JwtPayload;
    } catch (error) {
      throw new UNAUTHORIZEDError(
        httpStatus.UNAUTHORIZED,
        'Unauthorized Access',
        'You do not have the necessary permissions to access this resource.',

        '',
        '',
      );
    }
    // eslint-disable-next-line no-unused-vars
    const { username, iat, exp } = decoded;
    console.log(username, iat);

    if (Math.floor(Date.now() / 1000) >= Number(decoded?.exp)) {
      throw new UNAUTHORIZEDError(
        httpStatus.UNAUTHORIZED,
        'Unauthorized Access',
        'You do not have the necessary permissions to access this resource.',

        '',
        '',
      );
    }

    if (roles && !roles.includes(decoded?.role)) {
      throw new UNAUTHORIZEDError(
        httpStatus.UNAUTHORIZED,
        'Unauthorized Access',
        'You do not have the necessary permissions to access this resource.',

        '',
        '',
      );
    }
    req.user = decoded;
    next();
  });
};

export default auth;

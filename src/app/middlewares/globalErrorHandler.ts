/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
/* eslint-disable no-unused-vars */
import { ErrorRequestHandler } from 'express';
import Joi, { ValidationError } from 'joi';
import mongoose, { Mongoose } from 'mongoose';
import AppError from './AppError';
import UNAUTHORIZEDError from './UnauthorizedError';

type ErrorResponse = {
  success: boolean;
  message: string;
  errorMessage: string;
  errorDetails: any;
};

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  // console.log(err.name, err.isJoi);
  let statusCode = 500;
  const errorResponse: ErrorResponse = {
    success: false,
    message: '',
    errorMessage: err.message,
    errorDetails: err,
  };

  if (err.isJoi) {
    // Handle Joi validation errors
    console.log('err.details:', err.details);
    statusCode = 400;
    errorResponse.success = false;
    errorResponse.message = err.name;
    errorResponse.errorMessage = err.details
      .map((detail: { message: any }) => detail.message)
      .join('');
    errorResponse.errorDetails = err.details;
  } else if (
    err?.name === 'ValidationError' &&
    err instanceof mongoose.Error.ValidationError
  ) {
    statusCode = 400;
    errorResponse.message = err.name;
    errorResponse.errorDetails = err.errors;
  } else if (err?.name === 'CastError') {
    statusCode = 400;
    errorResponse.message = err.name;
    errorResponse.errorDetails = err;
  } else if (err?.code === 11000) {
    const match = err.message.match(/"([^"]*)"/);
    const errorMessage = match && match[1];
    errorResponse.message = 'Duplicate key error';
    errorResponse.errorMessage = `${errorMessage} Username already exists!`;
  } else if (err instanceof AppError) {
    errorResponse.message = err.name;
    statusCode = err.statusCode;
    errorResponse.errorMessage = err.message;
    errorResponse.errorDetails = err;
  } else if (err instanceof UNAUTHORIZEDError) {
    errorResponse.message = 'Unauthorized Access';
    errorResponse.errorMessage = err.errorMessage as string;
    errorResponse.errorDetails = null;
  } else if (err.message === 'jwt malformed') {
    errorResponse.message = 'Unauthorized Access';
    errorResponse.errorMessage =
      'You do not have the necessary permissions to access this resource.' as string;
    errorResponse.errorDetails = null;
  }
  return res.status(statusCode).json({
    // success: false,
    ...errorResponse,
    stack: err.stack,
  });
};
export default globalErrorHandler;

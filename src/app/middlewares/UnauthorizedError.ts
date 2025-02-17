/* eslint-disable @typescript-eslint/no-explicit-any */
class UNAUTHORIZEDError extends Error {
  public statusCode: number | undefined;
  public errorMessage: string | undefined;
  public errorDetails: any;

  constructor(
    statusCode: number,
    message: string,
    errorMessage: string,
    errorDetails: any,
    stack = '',
  ) {
    super(message);
    this.statusCode = statusCode;
    this.errorMessage = errorMessage;
    this.errorDetails = errorDetails;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default UNAUTHORIZEDError;

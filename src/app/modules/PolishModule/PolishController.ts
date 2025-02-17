import { NextFunction, Request, Response } from 'express';
import { PolishServices } from './PolishService';

// create polish
const createPolish = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const polish = req.body;
    const user = req.user;
    console.log('req in controller: ', req.user);

    // console.log(value);
    const result = await PolishServices.createPolishRequestInDB(polish, user);

    console.log('result: ', result);
    res.status(201).json({
      success: true,
      statusCode: 201,
      message: 'Polish request created successfully',
      data: result,
    }); // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log('error:', error, '\n', 'prop', error.properties);
    next(error);
  }
};

// get list of polish requests for specific buyer
const getPolish = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // const query = req.query;
    const result = await PolishServices.getPolishRequestsFromDB(
      req.user.username,
    );
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Polish requests retrieved successfully',

      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    next(error);
  }
};

const getAllPolish = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // const query = req.query;
    const result = await PolishServices.getAllPolishRequestsFromDB();
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Polish requests retrieved successfully',

      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    next(error);
  }
};

const updatePolish = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const status = req.body.status;
    // console.log('status: ', req.body, '\n', status);
    const result = await PolishServices.updatePolishRequestsFromDB(
      req.body._id,
      status,
    );

    console.log('result: ', result);
    res.status(201).json({
      success: true,
      statusCode: 201,
      message: 'Status updated successfully',
      data: result,
    }); // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log('error:', error, '\n', 'prop', error.properties);
    next(error);
  }
};
export const PolishControllers = {
  createPolish,
  getPolish,
  updatePolish,
  getAllPolish,
};

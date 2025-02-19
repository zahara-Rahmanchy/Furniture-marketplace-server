import { NextFunction, Request, Response } from 'express';
import { OrderServices } from './OrderService';
import { IReqUser } from '../AuthModule/AuthInterface';

const placeOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await OrderServices.placeOrderInDB(
      req.user as IReqUser,
      req.body,
    );
    res.status(201).json({
      success: true,
      statusCode: 201,
      message: 'Order placed successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// get orders based on roles
const getOrders = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await OrderServices.getOrdersDataFromDB(
      req.user as IReqUser,
    );
    res.status(201).json({
      success: true,
      statusCode: 201,
      message: 'Orders retrieved successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
export const OrderController = {
  placeOrder,
  getOrders,
};

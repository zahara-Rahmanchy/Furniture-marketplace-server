import { NextFunction, Request, Response } from 'express';
import { CartServices } from './CartService';
import { IReqUser } from '../AuthModule/AuthInterface';

const addToCart = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log('cart: ', req.body);
    const result = CartServices.addCartItemToDB(req.body, req.user as IReqUser);

    console.log('result controller: ', result);
    res.status(201).json({
      success: true,
      statusCode: 201,
      message: 'Furniture added to cart successfully!',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getCartItems = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await CartServices.getCartItemsFromDb(req.user as IReqUser);
    console.log('result: ', result);
    res.status(201).json({
      success: true,
      statusCode: 201,
      message: 'Furniture added to cart successfully!',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const CartController = {
  addToCart,
  getCartItems,
};

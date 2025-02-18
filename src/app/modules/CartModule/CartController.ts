import { NextFunction, Request, Response } from 'express';
import { CartServices } from './CartService';

const addToCart = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = CartServices.addCartItemToDB(req.body, req.user);

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

const getCartItems = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await CartServices.getCartItemsFromDb(req.user);
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

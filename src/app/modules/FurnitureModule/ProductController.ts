import { NextFunction, Request, Response } from 'express';
import { ProductSchemaValidation } from './Product.validators';
import { ProductServices } from './ProductService';

// create product
const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const product = req.body;
    const user = req.user;
    console.log('req in controller: ', req.user);
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    const { error, value } = ProductSchemaValidation.validate(product);

    if (error) {
      return next(error);
    }
    // console.log(value);
    const result = await ProductServices.createProductintoDB(value, user);

    console.log('result: ', result);
    res.status(201).json({
      success: true,
      statusCode: 201,
      message: 'Product created successfully',
      data: result,
    }); // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log('error:', error, '\n', 'prop', error.properties);
    next(error);
  }
};

// update product
const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const product = req.body;
    // const user = req.user;
    console.log('req in controller: ', product);
    console.log('req in controller param: ', req.params);
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    // const { error, value } = ProductSchemaValidation.validate(product);

    // if (error) {
    //   return next(error);
    // }
    // console.log(value);
    const result = await ProductServices.updateProductintoDB(
      req.params.Id,
      product,
    );

    console.log('result: ', result);
    res.status(201).json({
      success: true,
      statusCode: 201,
      message: 'Product updated successfully',
      data: result,
    }); // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log('error:', error, '\n', 'prop', error.properties);
    next(error);
  }
};
// get Product by filters
const getProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // const query = req.query;
    const result = await ProductServices.getProductFromDB(req.query);
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Products retrieved successfully',

      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    next(error);
  }
};
// get only seller's inventory
const getSellerProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = req.user;
    console.log('suer: ', user);
    const result = await ProductServices.getSellerProductFromDB(user);
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Products retrieved successfully',

      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    next(error);
  }
};
// verify product
const verifyProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // const query = req.query;
    console.log('req.params: ', req.params);
    const result = await ProductServices.verifyProductFromDB(
      req.params.productId,
    );
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Verified successfully',

      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    next(error);
  }
};

// delete Product using id
const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await ProductServices.deleteProductFromDb(
      String(req.params.Id),
    );
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Product deleted successfully!',
      data: result,
    }); // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    next(error);
  }
};

// delete bulk Product
const deleteBulkProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log('req.body.productIds: ', req.body.productIds);

  try {
    console.log(req.body);
    const result = await ProductServices.deleteSelectedProductsFromDb(req.body);
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Products deleted successfully!',
      data: result,
    }); // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    next(error);
  }
};
export const ProductControllers = {
  createProduct,
  getSellerProduct,
  updateProduct,
  getProduct,
  deleteProduct,
  deleteBulkProduct,
  verifyProduct,
};

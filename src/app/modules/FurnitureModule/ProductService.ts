/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
import { ProductModel } from './Productmodel';
import { Product } from './ProductInterface';
import mongoose, { Types } from 'mongoose';

import httpStatus from 'http-status';
import AppError from '../../middlewares/AppError';
import { User } from '../UserModule/UserModel';
// import { User } from '../UserModule/UserModel';

// create product
const createProductintoDB = async (product: Product, user: any) => {
  // console.log('user: ', user);
  const createdBy = await User.isCreatedBy(user.username);
  console.log('createdBy in course', createdBy);
  const sendData = {
    ...product,
    createdBy,
  };
  // console.log('sendData: ', sendData);
  const result = await ProductModel.create(sendData);

  return result;
};
// get seller inventory by id

const getSellerProductFromDB = async (user: any) => {
  console.log('user');
  const createdBy = await User.isCreatedBy(user.username);
  const result = await ProductModel.find({
    createdBy: createdBy,
  });
  return result;
};
// update single product by id
const updateProductintoDB = async (id: string, product: Product) => {
  console.log(' product id: ', id, 'product in servie: ', product);
  const result = await ProductModel.findByIdAndUpdate(
    { _id: id },
    {
      ...product,
    },
    { new: true, runValidators: true },
  );

  return result;
};
const getProductFromDB = async (query: Record<string, unknown>) => {
  console.log(query);

  const { name, minPrice, maxPrice, type, category, color, material } = query;
  console.log(maxPrice);
  const filter: Record<string, unknown> = {};

  if (minPrice && maxPrice) {
    console.log(minPrice, maxPrice);
    const min = minPrice.toString();
    const max = maxPrice.toString();
    filter.price = { $gte: parseFloat(min), $lte: parseFloat(max) };
    console.log(filter);
  }

  if (name) {
    filter.name = { $regex: new RegExp(name as string, 'i') };
    console.log(name);
  }
  if (type) {
    filter.type = { $regex: new RegExp(type as string, 'i') };
    console.log(type);
  }
  if (category) {
    filter.category = { $regex: new RegExp(category as string, 'i') };
    console.log(category);
  }

  // if (size) {
  //   filter.size = Number(size);
  //   console.log(size);
  // }

  if (color) {
    filter.color = color;
    console.log(color);
  }
  if (material) {
    filter.material = material;
    console.log(material);
  }
  if (type) {
    filter.type = type;
    console.log(type);
  }

  const result = await ProductModel.find(filter).sort({ createdAt: -1 });

  // console.log(result);
  // const total = await ProductModel.countDocuments(filter);

  return result;
};
// verify product

const verifyProductFromDB = async (productId: string) => {
  const result = await ProductModel.find({ productId });
  console.log(result);
  return result;
};

// deleteProduct
const deleteProductFromDb = async (id: string) => {
  const ProductExist = await ProductModel.isProductExists(id);
  if (!ProductExist) {
    throw new Error(
      JSON.stringify({
        success: false,
        message: 'Product not found',
        error: {
          code: 404,
          description: 'Product not found!',
        },
      }),
    );
  }
  const result = await ProductModel.deleteOne({ _id: id });

  return result;
};

// delete selected Product:bulk delete
const deleteSelectedProductsFromDb = async (product: string[]) => {
  console.log('product: ', product);
  const result = await ProductModel.deleteMany({ _id: { $in: product } });

  return result;
};
export const ProductServices = {
  createProductintoDB,
  getSellerProductFromDB,
  updateProductintoDB,
  getProductFromDB,
  deleteProductFromDb,
  deleteSelectedProductsFromDb,
  verifyProductFromDB,
};

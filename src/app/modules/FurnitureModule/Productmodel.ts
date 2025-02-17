import { Schema, model } from 'mongoose';

import { Product, IProductModel } from './ProductInterface';

export const ProductSchema = new Schema<Product, IProductModel>(
  {
    name: {
      type: String,
      required: true,
      message: 'Name is required',
    },
    productId: {
      type: String,
      required: true,
      message: 'Product Id is required',
    },

    quantity: { type: Number, required: true, message: 'Quantity is required' },
    price: { type: Number, required: true, message: 'Price is required' },

    image: {
      type: String,
      required: true,
      message: 'Furniture Image is required',
    },

    material: {
      type: String,
      required: true,
      message: 'Material is required',
    },
    // size: {
    //   type: String,
    //   required: true,
    //   message: 'Size is required',
    // },
    color: { type: String, required: true, message: 'Color is required' },
    dimensions: {
      type: String,
      required: true,
      message: 'Dimensions are required',
    },

    category: {
      type: String,
      required: true,
      message: 'Category is required',
    },
    warranty: {
      type: String,
      required: true,
      message: 'Warranty is required',
    },
    type: {
      type: String,
      required: true,
      message: 'Type is required',
    },
    description: {
      type: String,
      required: true,
      message: 'Description is required',
    },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true },
);

ProductSchema.statics.isProductExists = async function (id: string) {
  return await ProductModel.findById({ _id: id }).select({
    _id: 1,
    username: 1,
    password: 1,
    email: 1,
  });
};

export const ProductModel = model<Product, IProductModel>(
  'Furnitures',
  ProductSchema,
);

import { Schema, model } from 'mongoose';

import { ISalesData } from './SalesInterface';
import { ProductSchema } from '../FurnitureModule/Productmodel';

const SaleSchema = new Schema<ISalesData>(
  {
    buyerName: {
      type: String,
      required: true,
      message: 'Name is required',
    },

    quantity: { type: Number, required: true, message: 'Quantity is required' },

    dateOfSale: {
      type: String,
      required: true,
      message: 'Date is of sale required',
    },
    furnitureData: ProductSchema,
  },
  { timestamps: true },
);

export const SalesModel = model<ISalesData>('SalesHistory', SaleSchema);

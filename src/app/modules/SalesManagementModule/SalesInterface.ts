// import { Model } from 'mongoose';

import { Product } from '../FurnitureModule/ProductInterface';

export interface ISalesData {
  buyerName: string;
  quantity: number;
  dateOfSale: string;
  furnitureData: Product;
}

// import { Model } from 'mongoose';

import { Model, Types } from 'mongoose';

export interface Product {
  name: string;
  productId: string;
  quantity: number;
  price: number;
  type: string;
  dimensions: string;
  image: string;
  category: string;
  warranty: string;
  description: string;
  // size: string;
  color: string;
  material: string;
  createdBy: Types.ObjectId;
}

export interface IProductModel extends Model<Product> {
  // eslint-disable-next-line no-unused-vars
  isProductExists(id: string): Promise<Product>;
}

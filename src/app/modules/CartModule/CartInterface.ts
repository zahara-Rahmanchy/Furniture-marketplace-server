import { Types } from 'mongoose';

interface IItem {
  product: Types.ObjectId;
  seller: Types.ObjectId;
  quantity: number;
}

export interface ICART {
  buyer: Types.ObjectId;
  items: IItem[];
}

// Interface for fetched product details after population
export interface ICartProduct {
  _id: Types.ObjectId;
  name: string;
  price: number;
}

// Interface for fetched seller details after population
export interface ICartSeller {
  _id: Types.ObjectId;
  username: string;
  email: string;
}

// Interface for cart items after population
export interface IItems {
  product: ICartProduct;
  seller: ICartSeller;
  quantity: number;
}

// Interface for fetched cart data
export interface IFetchedCartData {
  _id: Types.ObjectId;
  buyer: Types.ObjectId;
  items: IItems[];
}

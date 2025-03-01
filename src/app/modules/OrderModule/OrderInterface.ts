// import { Types } from 'mongoose';
import { ICART } from '../CartModule/CartInterface';

// export interface IOrderItem {
//   product: Types.ObjectId;
//   seller: Types.ObjectId;
//   quantity: number;
//   price: number; // Storing product price at the time of purchase
// }

export interface IOrder extends ICART {
  instructions?: string;
  totalAmount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: string;
  paymentMethod: string;
  billingAddress: string;
}

export interface IOrderPostData {
  instructions?: string;
  shippingAddress: string;
  paymentMethod: string;
  billingAddress: string;
}

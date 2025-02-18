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

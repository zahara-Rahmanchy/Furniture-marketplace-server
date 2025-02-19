import { model, Schema } from 'mongoose';
import { ICART } from './CartInterface';

const cartSchema = new Schema<ICART>(
  {
    buyer: { type: Schema.Types.ObjectId, ref: 'User' },
    items: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: 'Furnitures',
          required: true,
        },
        seller: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        quantity: { type: Number, required: true, default: 1 },
      },
    ],
  },
  { timestamps: true },
);

export const CartModel = model<ICART>('Cart', cartSchema);

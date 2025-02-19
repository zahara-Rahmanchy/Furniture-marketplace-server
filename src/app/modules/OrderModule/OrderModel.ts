/* eslint-disable @typescript-eslint/no-explicit-any */
import { Schema, model } from 'mongoose';
import { IOrder } from './OrderInterface';

const OrderSchema = new Schema<IOrder>(
  {
    buyer: { type: Schema.Types.ObjectId, ref: 'User' },
    items: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: 'Furnitures',
          required: true,
        },
        instructions: {
          type: String,
        },
        seller: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        quantity: { type: Number, required: true, default: 1 },
        // Storing price at the time of purchase
      },
    ],
    totalAmount: { type: Number, required: true },
    status: {
      type: String,
      enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
      default: 'pending',
    },
    shippingAddress: {
      type: String,
      required: true,
    },
    billingAddress: {
      type: String,
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }, // Automatically adds createdAt & updatedAt
);

OrderSchema.pre('validate', async function (next) {
  try {
    await this.populate('items.product', 'price');
    this.totalAmount = this.items.reduce((accumulator, currentItem) => {
      if (currentItem.product && 'price' in currentItem.product) {
        return (
          accumulator +
          (currentItem.product.price as number) * currentItem.quantity
        );
      }
      return accumulator; // If price is missing, return previous accumulator
    }, 0);

    next();
  } catch (error: any) {
    next(error);
  }
});

export const OrderModel = model<IOrder>('Order', OrderSchema);

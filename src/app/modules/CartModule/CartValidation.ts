import Joi from 'joi';
import { Types } from 'mongoose';

export const CartValidationSchema = Joi.object({
  //   buyer: Joi.string().custom((value, helper) => {
  //     if (!Types.ObjectId.isValid(value)) return helper.error('Invalid buyer');
  //     return value;
  //   }),
  items: Joi.array()
    .items(
      Joi.object({
        product: Joi.string().custom((value, helper) => {
          if (!Types.ObjectId.isValid(value))
            return helper.error('Invalid product!');
        }),
        seller: Joi.string().custom((value, helper) => {
          if (!Types.ObjectId.isValid(value))
            return helper.error('Invalid seller!');
        }),
        quantity: Joi.number().min(1).required().messages({
          'number.min': 'Quantity must be at least 1.',
          'any.required': 'Quantity is required.',
        }),
      }),
    )
    .min(1) // Ensure there's at least one item in the cart
    .required()
    .messages({
      'array.min': 'At least one item is required in the cart.',
      'any.required': 'Items field is required.',
    }),
});

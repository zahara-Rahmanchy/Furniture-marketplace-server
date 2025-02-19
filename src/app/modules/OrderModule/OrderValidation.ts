import Joi from 'joi';

export const OrderValidationSchema = Joi.object({
  shippingAddress: Joi.string().required().messages({
    'string.empty': 'Shipping address is required!',
    'any.required': 'Shipping address is required!',
  }),

  paymentMethod: Joi.string().required().messages({
    'string.empty': 'Payment method is required!',
    'any.required': 'Payment method is required!',
  }),

  billingAddress: Joi.string().required().messages({
    'string.empty': 'Billing address is required!',
    'any.required': 'Billing address is required!',
  }),
});

export const statusUpdateSchema = Joi.object({
  status: Joi.string()
    .valid('pending', 'cancelled', 'processing', 'shipped', 'delivered')
    .required(),
});

export const cancelOrderSchema = Joi.object({
  status: Joi.string().valid('cancelled').required(),
});

import Joi from 'joi';

export const ProductSchemaValidation = Joi.object({
  name: Joi.string().required(),
  productId: Joi.string().required(),
  price: Joi.number().required(),
  quantity: Joi.number().required(),
  image: Joi.string().required(),
  dimensions: Joi.string().required(),
  color: Joi.string().required(),
  material: Joi.string().required(),
  category: Joi.string().required(),
  warranty: Joi.string().required(),
  type: Joi.string().required(),
  description: Joi.string().required(),
});

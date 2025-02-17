import Joi from 'joi';

export const UserValidationSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string()
    .required()
    .min(6)
    .max(20)
    .message(
      'Password length must be greater than or equal to 6 and less than 20',
    ),
  role: Joi.string().valid('seller', 'buyer').required(),
  email: Joi.string().required().email(),
});

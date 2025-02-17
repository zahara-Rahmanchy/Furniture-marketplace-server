import Joi from 'joi';

export const LoginValidationSchema = Joi.object({
  username: Joi.string().required().messages({
    'any.only': 'Username is required',
  }),
  password: Joi.string().required().messages({
    'any.only': 'Password is required',
  }),
});

export const changePasswordValidationSchema = Joi.object({
  currentPassword: Joi.string().required().messages({
    'any.only': 'Current password is required',
  }),
  newPassword: Joi.string().required().messages({
    'any.only': 'Password is required',
  }),
});

import express from 'express';
import auth from '../../middlewares/auth';

import validateRequest from '../../middlewares/validateRequest';
import { User_role } from '../UserModule/UserContants';
import { CartController } from './CartController';
import { CartValidationSchema } from './CartValidation';

// const router = express.Router();
const router = express.Router();
router.post(
  '/addToCart',
  auth(User_role.buyer),
  validateRequest(CartValidationSchema),
  CartController.addToCart,
);

router.put(
  '/update-quantity',
  auth(User_role.buyer),
  // validateRequest(cartUpdateValidation),
  CartController.updateQuantity,
);
router.get(
  '/get-cart-items',
  auth(User_role.buyer),
  CartController.getCartItems,
);
export const CartRoutes = router;

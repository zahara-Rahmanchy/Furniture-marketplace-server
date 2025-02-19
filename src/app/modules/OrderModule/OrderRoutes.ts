import express from 'express';
import auth from '../../middlewares/auth';
import { User_role } from '../UserModule/UserContants';
import validateRequest from '../../middlewares/validateRequest';
import { OrderValidationSchema } from './OrderValidation';
import { OrderController } from './OrderController';

const router = express.Router();

router.post(
  '/place-order',
  auth(User_role.buyer),
  validateRequest(OrderValidationSchema),
  OrderController.placeOrder,
);
router.get(
  '/get-orders',
  auth(User_role.buyer, User_role.seller),

  OrderController.getOrders,
);

router.put(
  '/update-orders-status',
  auth(User_role.seller),

  OrderController.updateOrderStatusBySeller,
);

router.get(
  '/cancel-orders',
  auth(User_role.buyer),

  OrderController.cancelOrdersByBuyer,
);

export const OrderRoutes = router;

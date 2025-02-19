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

export const OrderRoutes = router;

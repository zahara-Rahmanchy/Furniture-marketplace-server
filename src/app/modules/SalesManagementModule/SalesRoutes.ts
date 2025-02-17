import express from 'express';

import auth from '../../middlewares/auth';
import { SalesControllers } from './SalesController';

import { User_role } from '../UserModule/UserContants';
const router = express.Router();

router.post(
  '/addSalesData/:Id',
  auth(User_role.seller),
  SalesControllers.addSalesHistory,
);
router.get(
  '/salesHistory',
  auth(User_role.seller),
  SalesControllers.getSalesHistory,
);
export const SalesRoutes = router;

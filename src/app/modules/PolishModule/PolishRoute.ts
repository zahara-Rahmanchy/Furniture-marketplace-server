import express from 'express';
import { User_role } from '../UserModule/UserContants';
import auth from '../../middlewares/auth';
import { PolishControllers } from './PolishController';
const router = express.Router();

router.post(
  '/polish-request',
  auth(User_role.seller, User_role.buyer),
  PolishControllers.createPolish,
);

// only buyer specific requests
router.get(
  '/buyer-polish-requests',
  auth(User_role.buyer),
  PolishControllers.getPolish,
);
// all requests for seller to accept
router.get(
  '/all-polish-requests',
  auth(User_role.seller),
  PolishControllers.getAllPolish,
);
// polish status
router.put(
  '/polish-request-status',
  auth(User_role.seller),
  PolishControllers.updatePolish,
);

export const PolishRoutes = router;

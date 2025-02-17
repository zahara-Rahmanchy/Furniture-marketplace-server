import express from 'express';

import { AuthController } from './AuthController';
// import auth from '../../middlewares/auth';
// import { User_role } from '../UserModule/UserContants';

const router = express.Router();

// post route to create and store user
router.post('/auth/login', AuthController.LoginUser);

// router.post(
//   '/auth/change-password',
//   auth(User_role.admin),
//   AuthController.changePassword,
// );
export const AuthRoute = router;

import { Router } from 'express';

import { UserRoute } from '../modules/UserModule/UserRoute';
import { AuthRoute } from '../modules/AuthModule/AuthRoute';
import { ProductRoutes } from '../modules/FurnitureModule/ProductRoutes';
import { SalesRoutes } from '../modules/SalesManagementModule/SalesRoutes';
import { PolishRoutes } from '../modules/PolishModule/PolishRoute';

import { OrderRoutes } from '../modules/OrderModule/OrderRoutes';
import { CartRoutes } from '../modules/CartModule/CartRoutes';

const router = Router();
// user routes
router.use('/', UserRoute);
router.use('/', AuthRoute);

// product sales routes
router.use('/', ProductRoutes);
router.use('/', SalesRoutes);

router.use('/', PolishRoutes);

router.use('/', CartRoutes);
router.use('/', OrderRoutes);
export default router;

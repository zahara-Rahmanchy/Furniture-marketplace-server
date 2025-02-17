import express from 'express';
import { ProductControllers } from './ProductController';
import auth from '../../middlewares/auth';
import { User_role } from '../UserModule/UserContants';

// import { User_role } from '../UserModule/UserContants';
const router = express.Router();

// post route to create and store product
router.post(
  '/product',
  auth(User_role.seller),
  ProductControllers.createProduct,
);

// to get all product from database or based on query
router.get(
  '/products',
  // auth(User_role.seller, User_role.buyer),
  ProductControllers.getProduct,
);

router.get(
  '/sellerproducts',
  auth(User_role.seller),
  ProductControllers.getSellerProduct,
);
// verify product

router.get(
  `/verify-products/:productId`,
  auth(User_role.buyer),
  ProductControllers.verifyProduct,
);

// update product information
router.put(
  '/updateproduct/:Id',
  auth(User_role.seller),
  ProductControllers.updateProduct,
);

// delete route to delete  product data using  product id
router.delete(
  '/product/:Id',
  auth(User_role.seller),
  ProductControllers.deleteProduct,
);

// delete route to bulk delete  products
router.delete(
  '/products/bulk-delete',
  auth(User_role.seller),
  ProductControllers.deleteBulkProduct,
);

export const ProductRoutes = router;

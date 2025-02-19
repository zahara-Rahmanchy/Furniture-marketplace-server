import { IReqUser } from '../AuthModule/AuthInterface';
import { IFetchedCartData } from '../CartModule/CartInterface';
import { CartModel } from '../CartModule/CartModel';
import { User } from '../UserModule/UserModel';
import { IOrderPostData } from './OrderInterface';
import { OrderModel } from './OrderModel';

const placeOrderInDB = async (user: IReqUser, order: IOrderPostData) => {
  const buyerId = await User.isCreatedBy(user.username);

  const cartItems: IFetchedCartData | null = await CartModel.findOne({
    buyer: buyerId,
  });

  console.log('cartitems: ', cartItems);

  const result = await OrderModel.create({
    buyer: buyerId,
    items: cartItems?.items,
    // totalAmount,
    ...order,
  });
  return result;
};

export const OrderServices = {
  placeOrderInDB,
};

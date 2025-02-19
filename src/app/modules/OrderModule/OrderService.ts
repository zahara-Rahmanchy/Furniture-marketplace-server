import { IReqUser } from '../AuthModule/AuthInterface';
import { IFetchedCartData } from '../CartModule/CartInterface';
import { CartModel } from '../CartModule/CartModel';
import { User_role } from '../UserModule/UserContants';
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

// get order based on role
const getOrdersDataFromDB = async (user: IReqUser) => {
  const user_id = await User.isCreatedBy(user.username);

  if (user.role === User_role.seller) {
    const result = await OrderModel.find({ 'items.seller': user_id })
      .populate({
        path: 'items.product',
        select: 'name productId price type image instructions material color',
      })
      .populate({
        path: 'buyer',
        select: 'username email',
      });
    return result;
  }
  if (user.role === User_role.buyer) {
    const result = await OrderModel.find({ buyer: user_id })
      .populate({
        path: 'items.product',
        select: 'name productId price type image instructions material color',
      })
      .populate({
        path: 'items.seller',
        select: 'username email',
      });

    return result;
  }
};

export const OrderServices = {
  placeOrderInDB,
  getOrdersDataFromDB,
};

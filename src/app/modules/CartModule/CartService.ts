import { Types } from 'mongoose';
import { IReqUser } from '../AuthModule/AuthInterface';
import { User } from '../UserModule/UserModel';
import { ICART } from './CartInterface';
import { CartModel } from './CartModel';
// TODO: USer type
const addCartItemToDB = async (cart: ICART, user: IReqUser) => {
  console.log('user: ', user);
  const buyer = await User.isCreatedBy(user.username);
  if (!buyer) {
    throw new Error('User not found!');
  }
  const { items } = cart;
  console.log('items: ', items);
  // const result = await CartModel.create({
  //   ...cart,
  //   buyer,
  // });

  // const result = await CartModel.findOneAndUpdate(
  //   { buyer: new Types.ObjectId(buyer) },
  //   {
  //     $each: {
  //       $addToSet: {
  //         items: items,
  //       },
  //     },
  //   },
  //   { new: true, upsert: true },
  // );
  const result = await CartModel.findOneAndUpdate(
    { buyer: new Types.ObjectId(buyer) },
    {
      $addToSet: {
        items: {
          $each: items,
        },
      },
    },
    { new: true, upsert: true },
  );
  

  console.log('result: ', result);
  return result;
};

// getting cart items to show to the buyer

const getCartItemsFromDb = async (user: IReqUser) => {
  const buyer = await User.isCreatedBy(user.username);
  const result = await CartModel.findOne({ buyer })
    .populate({
      path: 'items.product',
      select:
        'name price image type category material color warranty description',
    })
    .populate({
      path: 'items.seller',
      select: 'name email',
    });
  const itemCount = result?.items?.length || 0;
  return { result, TotalCartItems: itemCount };
};

// update quantity of a cart item

const updateQuantityOfItem = async (
  user: IReqUser,
  productId: string,
  sellerName: string,
  quantity: number,
) => {
  const buyer = await User.isCreatedBy(user.username);
  const sellerId = await User.isCreatedBy(sellerName);
  if (!buyer || !sellerId) {
    throw new Error('User not found!');
  }

  // const result = await CartModel.findOneAndUpdate(
  //   {
  //     buyer: buyer,
  //     'items.product': productId,
  //     'items.seller': sellerId,
  //   },
  //   { 'items.quantity': quantity },
  // );
  const result = await CartModel.findOneAndUpdate(
    {
      buyer: buyer,
      'items.product': productId,
      'items.seller': sellerId,
    },
    {
      $set: { 'items.$.quantity': quantity },
    },
    { new: true },
  );

  return result;
};

export const CartServices = {
  addCartItemToDB,
  getCartItemsFromDb,
  updateQuantityOfItem,
};

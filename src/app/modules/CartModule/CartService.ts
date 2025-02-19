import { IReqUser } from '../AuthModule/AuthInterface';
import { User } from '../UserModule/UserModel';
import { ICART } from './CartInterface';
import { CartModel } from './CartModel';
// TODO: USer type
const addCartItemToDB = async (cart: ICART, user: IReqUser) => {
  console.log('user: ', user);
  const buyer = await User.isCreatedBy(user.username);
  const result = await CartModel.create({
    ...cart,
    buyer,
  });

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
  return result;
};
export const CartServices = {
  addCartItemToDB,
  getCartItemsFromDb,
};

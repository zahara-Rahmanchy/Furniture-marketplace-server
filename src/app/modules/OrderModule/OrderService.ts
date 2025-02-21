import { IReqUser } from '../AuthModule/AuthInterface';
import { IFetchedCartData } from '../CartModule/CartInterface';
import { CartModel } from '../CartModule/CartModel';
import { ProductModel } from '../FurnitureModule/Productmodel';
// import { SalesModel } from '../SalesManagementModule/SalesModel';
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
        select: 'username email -_id',
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
        select: 'username email -_id',
      });

    return result;
  }
};

// const updateOrderStatusInDB = async (
//   user: IReqUser,
//   status: string,
//   orderId: string,
// ) => {
//   const sellerId = await User.isCreatedBy(user.username);
//   if (!sellerId) {
//     throw new Error('Invalid seller!');
//   }
//   const result = await OrderModel.findByIdAndUpdate(
//     {
//       _id: orderId,
//       'items.seller': sellerId,
//     },
//     {
//       $set: {
//         status: status,
//       },
//     },
//     { new: true },
//   );
//   return result;
// };
const updateOrderStatusInDB = async (
  user: IReqUser,
  status: string,
  orderId: string,
) => {
  const sellerId = await User.isCreatedBy(user.username);
  if (!sellerId) {
    throw new Error('Invalid seller!');
  }

  // Find the order
  const order = await OrderModel.findOne({
    _id: orderId,
    'items.seller': sellerId,
  });

  if (!order) {
    throw new Error('Order not found!');
  }

  // If status is "shipped", update product quantities
  if (status === 'shipped') {
    const bulkUpdates = order.items.map((item) => ({
      updateOne: {
        filter: { _id: item.product._id },
        update: { $inc: { quantity: -item.quantity } }, // Reduce stock
      },
    }));

    await ProductModel.bulkWrite(bulkUpdates); // Perform batch update
  }

  if (status === 'delivered') {
    console.log('ordered items: ', order);
  }

  // Update order status in a single step
  const updatedOrder = await OrderModel.findByIdAndUpdate(
    orderId,
    { $set: { status } },
    { new: true },
  );

  return updatedOrder;
};

// TODO remove specific product from the order
const cancelOrderByBuyer = async (
  user: IReqUser,
  status: string,
  orderId: string,
  //   productId: string,
) => {
  const buyerId = await User.isCreatedBy(user.username);
  if (!buyerId) {
    throw new Error('Invalid buyer!');
  }
  const result = await OrderModel.findByIdAndUpdate(
    {
      _id: orderId,
      buyer: buyerId,
    },
    {
      $set: {
        status: status,
      },
    },
    { new: true },
  );

  return result;
};
export const OrderServices = {
  placeOrderInDB,
  getOrdersDataFromDB,
  updateOrderStatusInDB,
  cancelOrderByBuyer,
};

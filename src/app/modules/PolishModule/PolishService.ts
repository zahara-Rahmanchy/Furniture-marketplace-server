/* eslint-disable @typescript-eslint/no-explicit-any */
import { User } from '../UserModule/UserModel';
import { IPolishData } from './PolishInterface';
import { PolishModel } from './PolishModel';

// create polish request data
const createPolishRequestInDB = async (polish: IPolishData, user: any) => {
  // console.log('user: ', user);
  const createdBy = await User.isCreatedBy(user.username);
  console.log('createdBy in course', createdBy);
  const sendData = {
    ...polish,
    buyerName: user.username,
    createdBy,
  };

  const result = await PolishModel.create(sendData);

  return result;
};
// for buyers specific requests
const getPolishRequestsFromDB = async (username: string) => {
  const result = await PolishModel.find({ buyerName: username });
  return result;
};
const getAllPolishRequestsFromDB = async () => {
  const result = await PolishModel.find();
  console.log(result);
  return result;
};

const updatePolishRequestsFromDB = async (id: string, status: string) => {
  const result = await PolishModel.findByIdAndUpdate(
    { _id: id },
    { $set: { status: status } },
    { new: true },
  );

  return result;
};
export const PolishServices = {
  createPolishRequestInDB,
  updatePolishRequestsFromDB,
  getPolishRequestsFromDB,
  getAllPolishRequestsFromDB,
};

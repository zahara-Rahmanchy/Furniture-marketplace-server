import { Schema, model } from 'mongoose';

import {
  finishTypes,
  IPolishData,
  PolishTypes,
  StatusType,
} from './PolishInterface';

const PolishSchema = new Schema<IPolishData>(
  {
    buyerName: {
      type: String,
      required: true,
      message: 'Buyer name is required!',
    },
    furnitureName: {
      type: String,
      required: true,
      message: 'Furniture name is required',
    },
    status: {
      type: String,
      enum: Object.values(StatusType),
      required: true,
      default: StatusType.Pending,
      message: 'Furniture name is required',
    },
    polishType: {
      type: String,
      enum: Object.values(PolishTypes),
      required: true,
      message: 'Polish type is requied!',
    },
    finishType: {
      type: String,
      enum: Object.values(finishTypes),
      required: true,
      message: 'Finish type is requied!',
    },
    color: {
      type: String,
      required: true,
      message: 'Color is required',
    },
    instructions: {
      type: String,
      required: true,
      message: 'Instructions are required',
    },
    woodType: {
      type: String,
      required: true,
      message: 'Wood type are required',
    },
    createdBy: {
      type: Schema.Types.ObjectId,

      ref: 'User',
      required: true,
    },
  },
  { timestamps: true },
);
// const PolishSchema = new Schema<IPolishData>({
//   buyerName: {
//     type: String,
//     required: true,
//     message: 'Name is required',
//   },

//   shoeName: {
//     type: String,
//     required: true,
//     message: 'Shoe name is required',
//   },
//   status: {
//     type: String,
//     required: true,
//     message: 'Status is required',
//     default: 'pending',
//   },
//   polishType: {
//     type: String,
//     required: true,
//     message: 'Type of polish is required',
//   },
//   shineLevel: {
//     type: String,
//     required: true,
//     message: 'Level of shine is required',
//   },
//   instructions: {
//     type: String,
//     required: true,
//     message: 'Instructions are required',
//   },
//   color: {
//     type: String,
//     required: true,
//     message: 'Color is required',
//   },
//   createdBy: {
//     type: Schema.Types.ObjectId,

//     ref: 'User',
//   },
// });

export const PolishModel = model<IPolishData>('PolishData', PolishSchema);

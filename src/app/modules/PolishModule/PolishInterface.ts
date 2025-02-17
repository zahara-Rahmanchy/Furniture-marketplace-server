/* eslint-disable no-unused-vars */
import { Types } from 'mongoose';

export enum StatusType {
  Pending = 'Pending',
  InProgress = 'In-Progress',
  Completed = 'Completed',
  Cancelled = 'Cancelled',
}

export enum PolishTypes {
  WaxBased = 'Wax-Based',
  OilBased = 'Oil-Based',
  WaterBased = 'Water-Based',
  Lacquer = 'Lacquer',
}

export enum finishTypes {
  Matte = 'Matte',
  Glossy = 'Glossy',
  Satin = 'Satin',
}
export interface IPolishData {
  buyerName: string;
  furnitureName: string;
  polishType: PolishTypes;
  finishType: finishTypes;
  woodType: string;
  color: string;
  status: StatusType;
  instructions: string;
  createdBy: Types.ObjectId;
}

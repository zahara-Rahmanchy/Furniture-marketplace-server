import { ProductModel } from '../FurnitureModule/Productmodel';
import { ISalesData } from './SalesInterface';
import { SalesModel } from './SalesModel';

// adding sales information to db
const addSalesHistoryIntoDB = async (salesData: ISalesData, id: string) => {
  console.log('salesData: ', salesData);
  const ProductInfo = await ProductModel.findById({ _id: id });
  console.log('ProductInfo: ', ProductInfo);

  const productQuantity = Number(ProductInfo?.quantity) - salesData.quantity;
  if (productQuantity > 0) {
    await ProductModel.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          quantity: productQuantity,
        },
      },
      { new: true },
    );
  }
  if (productQuantity === 0) {
    await ProductModel.deleteOne({ _id: id });
  }
  const result = await SalesModel.create(salesData);

  return result;
};

// query: Record<string, unknown>
const getSalesHistoryFromDB = async (query: Record<string, unknown>) => {
  console.log('query: ', query);
  const filter: Record<string, unknown> = {};

  if (query.date) {
    filter.dateOfSale = query.date;
    // console.log(dateOfSale);
  }

  if (query.week) {
    const endDate = new Date(query.week as string);
    const startDate = new Date(endDate);
    startDate.setDate(startDate.getDate() - 6);
    console.log('startDate: ', startDate);
    filter.dateOfSale = {
      $lte: endDate.toISOString().split('T')[0],
      $gte: startDate.toISOString().split('T')[0],
    };
  }

  if (query.month) {
    filter.dateOfSale = { $regex: new RegExp('^' + query.month) };
  }
  if (query.year) {
    filter.dateOfSale = { $regex: new RegExp('^^' + query.year) };
  }

  // console.log('filter: ', filter);

  const result = await SalesModel.find(filter);

  return result;
};
export const SalesService = {
  addSalesHistoryIntoDB,
  getSalesHistoryFromDB,
};

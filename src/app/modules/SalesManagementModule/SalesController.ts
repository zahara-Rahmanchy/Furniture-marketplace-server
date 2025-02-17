import { NextFunction, Request, Response } from 'express';
import { SalesService } from './SalesService';

const addSalesHistory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // const { salesInfo } = req.body;
    console.log('salesInfo: ', req.body);
    const result = await SalesService.addSalesHistoryIntoDB(
      req.body,
      String(req.params.Id),
    );

    console.log('result: ', result);
    res.status(201).json({
      success: true,
      statusCode: 201,
      message: 'Added to Sales History successfully',
      data: result,
    }); // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log('error:', error, '\n', 'prop', error.properties);
    next(error);
  }
};

// get sales data
const getSalesHistory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // const query = req.query;
    const result = await SalesService.getSalesHistoryFromDB(req.query);
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Sales history retrieved successfully',

      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    next(error);
  }
};
export const SalesControllers = {
  addSalesHistory,
  getSalesHistory,
};

import { Request, Response } from 'express';
import * as productService from '../services/productService';;
import { sendErrorResponse, sendSuccessResponse } from '../helpers/http';

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await productService.getProducts();

    sendSuccessResponse(res, products);
  } catch (error) {
    sendErrorResponse(res, error as Error);
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await productService.getProductById(req.params.id);

    sendSuccessResponse(res, product);
  } catch (error) {
    sendErrorResponse(res, error as Error);
  }
};
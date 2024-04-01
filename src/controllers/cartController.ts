import { Request, Response } from 'express';
import * as cartService from '../services/cartService';
import { getUserId, sendErrorResponse, sendSuccessResponse } from '../helpers/http';
import Joi from 'joi';
import { cartSchema } from '../schemas/cart.schema';
import { ERRORS_MESSAGES } from '../constants/errors';

export const getCart = async (req: Request, res: Response) => {
  const userId = getUserId(req);

  try {
    const cart = await cartService.getCart(userId);

    sendSuccessResponse(res, cart);
  } catch (error) {
    sendErrorResponse(res, error as Error);
  }
};

export const updateCart = async (req: Request, res: Response) => {
  const userId = getUserId(req);

  try {
    Joi.assert(req.body, cartSchema, new Error(ERRORS_MESSAGES.PRODUCTS_INVALID));

    const updatedCart = await cartService.updateCart(userId, req.body);
    sendSuccessResponse(res, updatedCart);
  } catch (error) {
    sendErrorResponse(res, error as Error);
  }
};

export const emptyCart = async (req: Request, res: Response) => {
  const userId = getUserId(req);

  try {
    const deleted = await cartService.emptyCart(userId);

    sendSuccessResponse(res, { success: deleted });
  } catch (error) {
    sendErrorResponse(res, error as Error);
  }
};

export const createOrder = async (req: Request, res: Response) => {
  const userId = getUserId(req);

  try {
    const newOrder = await cartService.createOrder(userId);

    sendSuccessResponse(res, newOrder, 201);
  } catch (error) {
    sendErrorResponse(res, error as Error);
  }
};

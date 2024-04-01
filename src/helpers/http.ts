import { Request, Response } from 'express';
import { ERRORS_MAPPING, ERRORS_MESSAGES } from '../constants/errors';

export const getUserId = (req: Request) => req.headers['x-user-id'] as string || '';

export const sendSuccessResponse = (res: Response, data: Object, status = 200): void => {
  res.status(status);
  res.json({ 
    data,
    error: null
  });
}

export const sendErrorResponse = (res: Response, error: Error): void => {
  const { message } = error; 
  const status = ERRORS_MAPPING.get(message) || 500;
  const errorMessage = status === 500 ? ERRORS_MESSAGES.INTERNAL_SERVER_ERROR : message;

  res.status(status).send({ 
    data: null,
    error: errorMessage,
  });
}
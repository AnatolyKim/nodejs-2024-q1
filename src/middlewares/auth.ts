import { Request, Response, NextFunction } from 'express';
import { USERS } from '../constants/db-mock';
import { ERRORS_MESSAGES } from '../constants/errors';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const userId = req.headers['x-user-id'];

  if (!userId) {
    return res.status(401).send({
      data: null,
      error: ERRORS_MESSAGES.USER_NOT_AUTHORIZED 
    });
  }

  const userExists = USERS.some(user => user.id === userId);

  if (!userExists) {
    return res.status(403).send({
      data: null,
      error: ERRORS_MESSAGES.USER_NOT_FOUND 
    });
  }

  next();
};
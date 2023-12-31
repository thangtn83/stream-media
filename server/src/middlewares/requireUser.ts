import { NextFunction, Request, Response } from 'express';
import AppError from '../utils/appError';

export const requireUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = res.locals.user;
    console.log('user required', user);
    if (!user) {
      return next(new AppError('Invalid token or session has expired', 401));
    }
    next();
  } catch (err) {
    next(err);
  }
};

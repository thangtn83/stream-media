import { findAllUsers } from '../services/user.service';
import { NextFunction, Request, Response } from 'express';

export const read = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = res.locals.user;
    console.log('user read', user);
    res.status(200).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const list = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await findAllUsers();
    res.status(200).json({
      status: 'success',
      data: {
        users,
      },
    });
  } catch (err) {
    next(err);
  }
};

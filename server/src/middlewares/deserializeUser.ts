import { NextFunction, Request, Response } from 'express';
import AppError from '../utils/appError';
import { verifyJwt } from '../utils/jwt';
import redisClient from '../utils/connectRedis';
import { findUserById } from '../services/user.service';

export const deserializeUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const access_token = req.cookies.access_token;

    if (!access_token) {
      return next(new AppError('You are not loged in', 401));
    }

    const decoded = verifyJwt<{ sub: string }>(access_token as string, 'accessTokenPublicKey');
    if (!decoded) {
      return next(new AppError(`Invalid token or user doesn't exist`, 401));
    }

    const session = await redisClient.get(decoded.sub);

    if (!session) {
      return next(new AppError(`User session has expired`, 401));
    }

    const user = await findUserById(JSON.parse(session)._id);
    if (!user) {
      return next(new AppError('User with that token no longer exist', 401));
    }

    res.locals.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

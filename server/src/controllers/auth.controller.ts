import { CookieOptions, NextFunction, Request, Response } from 'express';
import config from 'config';
import { createUser, findUser, findUserById, signToken } from '../services/user.service';
import { CreateUserInput, LoginUserInput } from '../schemas/user.schema';
import AppError from '../utils/appError';
import { signJwt, verifyJwt } from '../utils/jwt';
import redisClient from '../utils/connectRedis';

export const excludedFields = ['password'];

const accessTokenCookieOptions: CookieOptions = {
  expires: new Date(Date.now() + config.get<number>('accessTokenExpiresIn') * 60 * 1000),
  maxAge: config.get<number>('accessTokenExpiresIn') * 60 * 1000,
  httpOnly: true,
  sameSite: 'lax',
  secure: !(process.env.NODE_ENV !== 'development'),
};

const refreshTokenCookieOptions: CookieOptions = {
  expires: new Date(Date.now() + config.get<number>('refreshTokenExpiresIn') * 60 * 1000),
  maxAge: config.get<number>('refreshTokenExpiresIn') * 60 * 1000,
  httpOnly: true,
  sameSite: 'lax',
  secure: !(process.env.NODE_ENV !== 'development'),
};

export const registerHandler = async (req: Request<object, object, CreateUserInput>, res: Response, next: NextFunction) => {
  try {
    const user = await createUser(req.body);
    return res.status(201).json({
      status: 'success',
      data: { user },
    });
  } catch (err: any) {
    if (err.code === 11000) {
      return res.status(409).json({
        status: 'fail',
        message: 'Email already exist',
      });
    }
    next(err);
  }
};

export const loginHandler = async (req: Request<object, object, LoginUserInput>, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  try {
    const user = await findUser({ email: email });
    if (!user) {
      return next(new AppError('User not found', 404));
    }

    if (!(await user.comparePassword(user.password, password))) {
      return next(new AppError('User or password invalid', 401));
    }
    const { accessToken, refreshToken } = await signToken(user);
    res.cookie('accessToken', accessToken, accessTokenCookieOptions);
    res.cookie('refreshToken', refreshToken, refreshTokenCookieOptions);
    res.cookie('logged_in', true, {
      ...accessTokenCookieOptions,
      httpOnly: false,
    });

    res.status(200).json({
      status: 'success',
      accessToken,
    });
  } catch (err: any) {
    next(err);
  }
};

const logout = (res: Response) => {
  res.cookie('access_token', '', { maxAge: 1 });
  res.cookie('refresh_token', '', { maxAge: 1 });
  res.cookie('logged_in', '', {
    maxAge: 1,
  });
};

export const logoutHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = res.locals.user;
    await redisClient.del(user._id);
    logout(res);
    return res.status(200).json({
      status: 'success',
    });
  } catch (err) {
    next(err);
  }
};

export const refreshTokenHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const refresh_token = req.cookies.refresh_token;
    const decoded = verifyJwt<{ sub: string }>(refresh_token, 'refreshTokenPublicKey');

    const message = 'Could not refresh access token';

    if (!decoded) {
      return next(new AppError(message, 403));
    }

    const session = await redisClient.get(decoded.sub);
    if (!session) {
      return next(new AppError(message, 403));
    }

    const user = await findUserById(JSON.parse(session)._id);
    if (!user) {
      return next(new AppError(message, 403));
    }

    const access_token = signJwt({ sub: user._id }, 'accessTokenPrivateKey', {
      expiresIn: `${config.get('accessTokenExpiresIn')}m`,
    });

    res.cookie('access_token', access_token);
    res.cookie('loged_in', true, {
      ...accessTokenCookieOptions,
      httpOnly: false,
    });

    res.status(200).json({
      status: 'success',
      access_token,
    });
  } catch (err) {
    next(err);
  }
};

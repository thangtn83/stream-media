import { omit } from 'lodash';
import userModel, { User } from '../models/user.model';
import { FilterQuery, QueryOptions } from 'mongoose';
import { signJwt } from '../utils/jwt';
import { DocumentType } from '@typegoose/typegoose';
import config from 'config';
import redisClient from '../utils/connectRedis';
import { excludedFields } from '../controllers/auth.controller';

export const createUser = async (data: Partial<User>) => {
  const user = await userModel.create(data);
  return omit(user, excludedFields);
};

export const findUserById = async (userId: string) => {
  const user = await userModel.findById(userId).lean();
  return omit(user, excludedFields);
};

export const findAllUsers = async () => {
  return userModel.find();
};

export const findUser = async (query: FilterQuery<User>, options: QueryOptions = {}) => {
  return userModel.findOne(query, {}, options).select('+password');
};

export const signToken = async (user: DocumentType<User>) => {
  const accessToken = signJwt({ sub: user._id }, 'accessTokenPrivateKey', {
    expiresIn: `${config.get<number>('accessTokenExpiresIn')}m`,
  });

  const refreshToken = signJwt({ sub: user._id }, 'refreshTokenPrivateKey', {
    expiresIn: `${config.get<number>('refreshTokenExpiresIn')}m`,
  });

  redisClient.set(user._id.toString(), JSON.stringify(user), {
    EX: 60,
  });

  return {
    accessToken,
    refreshToken,
  };
};

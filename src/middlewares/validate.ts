import { NextFunction, Request, Response } from 'express';
import { AnyZodObject, ZodError } from 'zod';

export const validate = (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {
  console.log('req.body', req.body);
  try {
    schema.parse({
      params: req.params,
      query: req.query,
      body: req.body,
    });
    next();
  } catch (err) {
    if (err instanceof ZodError) {
      return res.status(400).json({
        status: 'failed',
        message: err.errors,
      });
    }
    next(err);
  }
};

import { object, string, TypeOf } from 'zod';

export const createUserSchema = object({
  body: object({
    name: string({
      required_error: 'Name is required',
    }),
    email: string({
      required_error: 'Email is required',
    }).email('Invalid email'),
    password: string({
      required_error: 'Password is requiredd',
    })
      .min(6, 'Password must be more than 6 character')
      .max(32, 'Password must be less than 32 character'),
    passwordConfirm: string({ required_error: 'Please confirm your password' }).refine((data: any) => data.password === data.passwordConfirm, {
      path: ['passwordConfirm'],
      message: 'Password do not match',
    }),
  }),
});

export const loginUserSchema = object({
  body: object({
    email: string({ required_error: 'Email is required' }).email('Invalid email or password'),
    password: string({ required_error: 'Password is required' }),
  }),
});

export type CreateUserInput = TypeOf<typeof createUserSchema>['body'];
export type LoginUserInput = TypeOf<typeof loginUserSchema>['body'];

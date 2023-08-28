import { TypeOf, object, string } from 'zod';

export const createMediaSchema = object({
  body: object({
    name: string({
      required_error: 'Name is required',
    }),
    description: string({
      required_error: 'Description is required',
    }),
  }),
});

export type CreateMedia = TypeOf<typeof createMediaSchema>['body'];

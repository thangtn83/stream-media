import { NextFunction, Request, Response } from 'express';
import { createMedia, uploadMedia, uploadThumbnail } from '../services/media.service';
import { CreateMedia } from '../schemas/media.schema';
import formidable, { Fields } from 'formidable';
import { extend } from 'lodash';

export const create = async (req: Request<CreateMedia>, res: Response, next: NextFunction) => {
  const form = formidable();
  form.parse(req, async (err, fields, files) => {
    if (err) {
      next(err);
    }
    try {
      let mediaInfo: Record<keyof Fields, string> = {};
      Object.keys(fields).forEach((key) => {
        mediaInfo[key] = fields[key][0];
      });
      mediaInfo = extend(mediaInfo, { postedBy: res.locals.user });
      const media = await createMedia(mediaInfo);
      if (files.thumbnail && files.thumbnail[0]) {
        media.thumbnail = uploadThumbnail(files.thumbnail[0]);
      }
      await uploadMedia(files.video[0], media._id.toString());
      res.status(200).json({
        data: {
          media,
        },
      });
    } catch (err) {
      next(err);
    }
  });
};

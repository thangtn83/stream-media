import { NextFunction, Request, Response } from 'express';
import { createMedia, downloadMedia, getListMedia, getMediaBuffer, getMediaInfo, uploadMedia, uploadThumbnail } from '../services/media.service';
import { CreateMedia } from '../schemas/media.schema';
import formidable, { Fields } from 'formidable';
import { extend, omit } from 'lodash';
import AppError from '../utils/appError';
import { GridFSFile } from 'mongodb';
import { Media } from '../models/media.model';

export interface MediaRequest extends Omit<Request, 'file' | 'media'> {
  file?: GridFSFile;
  media?: Media;
}

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
      mediaInfo = extend(mediaInfo, { postedBy: res.locals.user, thumbnail: uploadThumbnail(files.thumbnail[0]) });

      const media = await createMedia(mediaInfo);
      await uploadMedia(files.video[0], media._id.toString());
      res.status(200).json({
        data: {
          ...omit(media, 'thumbnail'),
        },
      });
    } catch (err) {
      next(err);
    }
  });
};

export const list = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const medias = await getListMedia();
    res.status(200).json({
      data: {
        medias,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const mediaById = async (req: MediaRequest, res: Response, next: NextFunction, id: string) => {
  try {
    const mediaInfo = await getMediaInfo(id);
    if (!mediaInfo) {
      return next(new AppError('Media not found', 404));
    }
    req.media = mediaInfo;
    const files = await getMediaBuffer(id);
    if (!files[0]) {
      return next(new AppError('No video found', 404));
    }
    req.file = files[0];
    next();
  } catch (err) {
    next(err);
  }
};

export const video = async (req: MediaRequest, res: Response, next: NextFunction) => {
  if (!req.file) return next(new AppError('File not found', 404));
  const range = req.headers['range'];
  if (range && typeof range === 'string') {
    const parts = range.replace(/bytes=/, '').split('-');
    const partialStart = parts[0];
    const partialEnd = parts[1];

    const start = parseInt(partialStart, 10);
    const end = partialEnd ? parseInt(partialEnd, 10) : req.file?.length - 1;
    const chunkSize = end - start + 1;

    res.writeHead(206, {
      'Accept-Ranges': 'bytes',
      'Content-Length': chunkSize,
      'Content-Range': 'bytes ' + start + '-' + end + '/' + req.file?.length,
      'Content-Type': req.file?.contentType,
    });

    const downloadStream = await downloadMedia(req.file?._id, {
      start,
      end: end + 1,
    });
    downloadStream.pipe(res);
    downloadStream.on('error', (error: any) => {
      next(new AppError(error, 404));
    });
    downloadStream.on('end', () => {
      res.end();
    });
  } else {
    res.header('Content-Length', req.file?.length.toString());
    res.header('Content-Type', req.file?.contentType);

    const downloadStream = await downloadMedia(req.file._id);
    downloadStream.pipe(res);
    downloadStream.on('error', (error: any) => {
      next(new AppError(error, 404));
    });
    downloadStream.on('end', () => {
      res.end();
    });
  }
};

export const thumbnail = async (req: Request, res: Response, next: NextFunction) => {};

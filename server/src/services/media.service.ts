import mongoose from 'mongoose';
import fs from 'fs';
import mediaModel, { Media } from '../models/media.model';
import formidable from 'formidable';

let gridfs: mongoose.mongo.GridFSBucket;

mongoose.connection.on('connected', () => {
  gridfs = new mongoose.mongo.GridFSBucket(mongoose.connection.db);
});

export const createMedia = async (metadata: Partial<Media>) => {
  const media = await mediaModel.create(metadata);
  return media;
};

export const uploadMedia = async (file: formidable.File, mediaId: string) => {
  const writeStream = gridfs.openUploadStream(mediaId, {
    contentType: file.mimetype || 'binary/octet-stream',
  });
  fs.createReadStream(file.filepath).pipe(writeStream);
};

export const uploadThumbnail = (file: formidable.File) => {
  return {
    data: fs.readFileSync(file.filepath),
    contentType: file?.mimetype || 'image/*',
  };
};

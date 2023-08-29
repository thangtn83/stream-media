import mongoose, { ObjectId } from 'mongoose';
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

export const getListMedia = async () => {
  return mediaModel.find().select('-thumnail');
};

export const getMediaInfo = async (mediaId: string) => {
  return mediaModel.findById(mediaId).populate('postedBy', '_id name').exec();
};

export const getMediaBuffer = async (mediaId: string) => {
  return gridfs.find({ filename: mediaId }).toArray();
};

export const downloadMedia = async (fileId: mongoose.mongo.BSON.ObjectId, option?: { start: number; end: number }) => {
  return gridfs.openDownloadStream(fileId, { ...option });
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

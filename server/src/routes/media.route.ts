import express from 'express';
import { deserializeUser } from '../middlewares/deserializeUser';
import { requireUser } from '../middlewares/requireUser';
import { create, list, mediaById, video } from '../controllers/media.controller';

const router = express.Router();

router.get('/', list);
router.post('/upload', deserializeUser, requireUser, create);
router.get('/video/:mediaId', video);
router.param('mediaId', mediaById);

export default router;

import express from 'express';
import { deserializeUser } from '../middlewares/deserializeUser';
import { requireUser } from '../middlewares/requireUser';
import { create } from '../controllers/media.controller';

const router = express.Router();

router.use(deserializeUser, requireUser);
router.post('/upload', create);

export default router;

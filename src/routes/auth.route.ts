import express from 'express';
import { loginHandler, logoutHandler, refreshTokenHandler, registerHandler } from '../controllers/auth.controller';
import { validate } from '../middlewares/validate';
import { createUserSchema, loginUserSchema } from '../schemas/user.schema';
import { deserializeUser } from '../middlewares/deserializeUser';
import { requireUser } from '../middlewares/requireUser';

const router = express.Router();

// Register user route
router.post('/register', validate(createUserSchema), registerHandler);

// Login user route
router.post('/login', validate(loginUserSchema), loginHandler);
router.get('/refresh', refreshTokenHandler);
router.use(deserializeUser, requireUser);
router.get('/logout', logoutHandler);

export default router;

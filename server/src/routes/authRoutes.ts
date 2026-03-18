import { Router } from 'express';
import { z } from 'zod';
import { authController } from '../controllers/authController.js';
import { requireAuth } from '../middlewares/authMiddleware.js';
import { validate } from '../middlewares/validate.js';

const router = Router();

router.post(
  '/register',
  validate(
    z.object({
      name: z.string().min(2),
      email: z.string().email(),
      password: z.string().min(6)
    })
  ),
  authController.register
);

router.post(
  '/login',
  validate(
    z.object({
      email: z.string().email(),
      password: z.string().min(6)
    })
  ),
  authController.login
);

router.get('/me', requireAuth, authController.me);

export default router;

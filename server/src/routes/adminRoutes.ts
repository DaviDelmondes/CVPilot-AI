import { Router } from 'express';
import { z } from 'zod';
import { adminController } from '../controllers/adminController.js';
import { requireAdmin, requireAuth } from '../middlewares/authMiddleware.js';
import { validate } from '../middlewares/validate.js';

const router = Router();

router.use(requireAuth, requireAdmin);
router.get('/users', adminController.getUsers);
router.get('/stats', adminController.getStats);
router.patch(
  '/users/:id/plan',
  validate(
    z.object({
      planId: z.string().min(1)
    })
  ),
  adminController.updatePlan
);

export default router;

import { Router } from 'express';
import { planController } from '../controllers/planController.js';
import { requireAdmin, requireAuth } from '../middlewares/authMiddleware.js';

const router = Router();

router.get('/', requireAuth, requireAdmin, planController.list);

export default router;

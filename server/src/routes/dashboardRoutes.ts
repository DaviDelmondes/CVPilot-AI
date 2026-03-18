import { Router } from 'express';
import { dashboardController } from '../controllers/dashboardController.js';
import { requireAuth } from '../middlewares/authMiddleware.js';

const router = Router();

router.get('/', requireAuth, dashboardController.getMetrics);

export default router;

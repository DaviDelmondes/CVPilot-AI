import { Router } from 'express';
import adminRoutes from './adminRoutes.js';
import authRoutes from './authRoutes.js';
import dashboardRoutes from './dashboardRoutes.js';
import generationRoutes from './generationRoutes.js';
import planRoutes from './planRoutes.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/generations', generationRoutes);
router.use('/admin', adminRoutes);
router.use('/plans', planRoutes);

export default router;

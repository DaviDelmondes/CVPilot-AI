import { Router } from 'express';
import { z } from 'zod';
import { generationController } from '../controllers/generationController.js';
import { requireAuth } from '../middlewares/authMiddleware.js';
import { validate } from '../middlewares/validate.js';

const router = Router();

router.use(requireAuth);

router.post(
  '/',
  validate(
    z.object({
      type: z.enum(['PROFESSIONAL_SUMMARY', 'LINKEDIN_HEADLINE', 'COVER_LETTER', 'TEXT_IMPROVEMENT', 'SHORT_BIO']),
      area: z.string().min(2),
      experienceLevel: z.string().min(2),
      skills: z.array(z.string().min(1)).min(1),
      goal: z.string().min(3),
      tone: z.enum(['formal', 'confident', 'objective', 'modern']),
      baseText: z.string().optional()
    })
  ),
  generationController.create
);

router.get('/', generationController.list);
router.get('/:id', generationController.getById);
router.delete('/:id', generationController.remove);

export default router;

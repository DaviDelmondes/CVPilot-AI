import type { Request, Response } from 'express';
import { planService } from '../services/planService.js';

export const planController = {
  async list(_req: Request, res: Response) {
    return res.json(await planService.listPlans());
  }
};

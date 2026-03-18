import type { Request, Response } from 'express';
import { dashboardService } from '../services/dashboardService.js';

export const dashboardController = {
  async getMetrics(req: Request, res: Response) {
    const data = await dashboardService.getMetrics(req.user!.id);
    return res.json(data);
  }
};

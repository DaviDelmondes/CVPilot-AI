import type { Request, Response } from 'express';
import { adminService } from '../services/adminService.js';

export const adminController = {
  async getUsers(_req: Request, res: Response) {
    return res.json(await adminService.listUsers());
  },

  async getStats(_req: Request, res: Response) {
    return res.json(await adminService.getStats());
  },

  async updatePlan(req: Request, res: Response) {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const planId = Array.isArray(req.body.planId) ? req.body.planId[0] : req.body.planId;
    return res.json(await adminService.updateUserPlan(id, planId));
  }
};

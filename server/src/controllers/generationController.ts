import type { Request, Response } from 'express';
import type { GenerationType } from '@prisma/client';
import { generationService } from '../services/generationService.js';

export const generationController = {
  async create(req: Request, res: Response) {
    const generation = await generationService.create(req.user!.id, req.body);
    return res.status(201).json(generation);
  },

  async list(req: Request, res: Response) {
    const type = Array.isArray(req.query.type) ? req.query.type[0] : req.query.type;
    const items = await generationService.list(req.user!.id, type as GenerationType | undefined);
    return res.json(items);
  },

  async getById(req: Request, res: Response) {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const item = await generationService.getById(req.user!.id, id);
    return res.json(item);
  },

  async remove(req: Request, res: Response) {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    await generationService.remove(req.user!.id, id);
    return res.status(204).send();
  }
};

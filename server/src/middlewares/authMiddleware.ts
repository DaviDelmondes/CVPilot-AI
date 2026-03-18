import type { NextFunction, Request, Response } from 'express';
import { AppError } from '../utils/AppError.js';
import { verifyToken } from '../utils/jwt.js';

export function requireAuth(req: Request, _res: Response, next: NextFunction) {
  const authorization = req.headers.authorization;

  if (!authorization?.startsWith('Bearer ')) {
    throw new AppError('Unauthorized', 401);
  }

  const token = authorization.replace('Bearer ', '');
  const payload = verifyToken(token);

  req.user = {
    id: String(payload.sub),
    role: payload.role as 'USER' | 'ADMIN'
  };

  next();
}

export function requireAdmin(req: Request, _res: Response, next: NextFunction) {
  if (!req.user || req.user.role !== 'ADMIN') {
    throw new AppError('Forbidden', 403);
  }

  next();
}

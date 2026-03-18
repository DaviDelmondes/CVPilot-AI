import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

export function signToken(payload: { userId: string; role: string }) {
  return jwt.sign({ role: payload.role }, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN as jwt.SignOptions['expiresIn'],
    subject: payload.userId
  });
}

export function verifyToken(token: string) {
  return jwt.verify(token, env.JWT_SECRET) as jwt.JwtPayload;
}

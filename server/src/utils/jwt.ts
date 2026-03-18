import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

export function signToken(payload: { sub: string; role: string }) {
  return jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN as jwt.SignOptions['expiresIn'],
    subject: payload.sub
  });
}

export function verifyToken(token: string) {
  return jwt.verify(token, env.JWT_SECRET) as jwt.JwtPayload;
}

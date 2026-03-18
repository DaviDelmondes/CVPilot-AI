import bcrypt from 'bcrypt';
import { prisma } from '../config/prisma.js';
import { AppError } from '../utils/AppError.js';
import { signToken } from '../utils/jwt.js';

async function formatUser(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      plan: true,
      _count: {
        select: {
          generations: true
        }
      }
    }
  });

  if (!user) {
    throw new AppError('User not found', 404);
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    currentPlan: {
      id: user.plan.id,
      name: user.plan.name,
      generationLimit: user.plan.generationLimit
    },
    generationCount: user._count.generations
  };
}

export const authService = {
  async register(payload: { name: string; email: string; password: string }) {
    const existingUser = await prisma.user.findUnique({ where: { email: payload.email } });

    if (existingUser) {
      throw new AppError('Email already in use', 409);
    }

    const freePlan = await prisma.plan.findUnique({ where: { name: 'Free' } });

    if (!freePlan) {
      throw new AppError('Default plan not configured', 500);
    }

    const passwordHash = await bcrypt.hash(payload.password, 10);

    const user = await prisma.user.create({
      data: {
        name: payload.name,
        email: payload.email,
        passwordHash,
        planId: freePlan.id
      }
    });

    return {
      token: signToken({ sub: user.id, role: user.role }),
      user: await formatUser(user.id)
    };
  },

  async login(payload: { email: string; password: string }) {
    const user = await prisma.user.findUnique({
      where: { email: payload.email }
    });

    if (!user) {
      throw new AppError('Invalid credentials', 401);
    }

    const isValidPassword = await bcrypt.compare(payload.password, user.passwordHash);

    if (!isValidPassword) {
      throw new AppError('Invalid credentials', 401);
    }

    return {
      token: signToken({ sub: user.id, role: user.role }),
      user: await formatUser(user.id)
    };
  },

  async me(userId: string) {
    return formatUser(userId);
  }
};

import { prisma } from '../config/prisma.js';
import { AppError } from '../utils/AppError.js';

export const dashboardService = {
  async getMetrics(userId: string) {
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

    const recentHistory = await prisma.generation.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 5
    });

    return {
      plan: {
        name: user.plan.name,
        generationLimit: user.plan.generationLimit
      },
      generationCount: user._count.generations,
      remainingGenerations:
        user.plan.generationLimit === null
          ? null
          : Math.max(user.plan.generationLimit - user._count.generations, 0),
      recentHistory
    };
  }
};

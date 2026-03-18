import { prisma } from '../config/prisma.js';
import { AppError } from '../utils/AppError.js';

export const adminService = {
  async listUsers() {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        plan: true,
        _count: {
          select: {
            generations: true
          }
        }
      }
    });

    return users.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      generationCount: user._count.generations,
      currentPlan: {
        id: user.plan.id,
        name: user.plan.name
      },
      createdAt: user.createdAt
    }));
  },

  async getStats() {
    const [totalUsers, totalGenerations, premiumPlan, freePlan] = await Promise.all([
      prisma.user.count(),
      prisma.generation.count(),
      prisma.plan.findUnique({ where: { name: 'Premium' } }),
      prisma.plan.findUnique({ where: { name: 'Free' } })
    ]);

    const [premiumUsers, freeUsers] = await Promise.all([
      premiumPlan ? prisma.user.count({ where: { planId: premiumPlan.id } }) : Promise.resolve(0),
      freePlan ? prisma.user.count({ where: { planId: freePlan.id } }) : Promise.resolve(0)
    ]);

    return {
      totalUsers,
      totalGenerations,
      premiumUsers,
      freeUsers
    };
  },

  async updateUserPlan(userId: string, planId: string) {
    const plan = await prisma.plan.findUnique({ where: { id: planId } });

    if (!plan) {
      throw new AppError('Plan not found', 404);
    }

    const user = await prisma.user.update({
      where: { id: userId },
      data: { planId },
      include: {
        plan: true,
        _count: {
          select: {
            generations: true
          }
        }
      }
    });

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      generationCount: user._count.generations,
      currentPlan: {
        id: user.plan.id,
        name: user.plan.name
      },
      createdAt: user.createdAt
    };
  }
};

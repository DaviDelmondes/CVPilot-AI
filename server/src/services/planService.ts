import { prisma } from '../config/prisma.js';

export const planService = {
  async listPlans() {
    return prisma.plan.findMany({
      orderBy: { priceMonthly: 'asc' },
      select: {
        id: true,
        name: true,
        generationLimit: true,
        priceMonthly: true
      }
    });
  }
};

import bcrypt from 'bcrypt';
import { PrismaClient, UserRole } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const freePlan = await prisma.plan.upsert({
    where: { name: 'Free' },
    update: {
      description: 'Plano inicial com limite mensal de gerações.',
      generationLimit: 10,
      priceMonthly: 0
    },
    create: {
      name: 'Free',
      description: 'Plano inicial com limite mensal de gerações.',
      generationLimit: 10,
      priceMonthly: 0
    }
  });

  await prisma.plan.upsert({
    where: { name: 'Premium' },
    update: {
      description: 'Plano avançado com volume elevado de gerações.',
      generationLimit: null,
      priceMonthly: 49.9
    },
    create: {
      name: 'Premium',
      description: 'Plano avançado com volume elevado de gerações.',
      generationLimit: null,
      priceMonthly: 49.9
    }
  });

  const passwordHash = await bcrypt.hash('Admin@123', 10);

  await prisma.user.upsert({
    where: { email: 'admin@cvpilot.ai' },
    update: {
      name: 'CVPilot Admin',
      passwordHash,
      role: UserRole.ADMIN,
      planId: freePlan.id
    },
    create: {
      name: 'CVPilot Admin',
      email: 'admin@cvpilot.ai',
      passwordHash,
      role: UserRole.ADMIN,
      planId: freePlan.id
    }
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });

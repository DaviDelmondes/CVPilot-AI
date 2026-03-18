import type { GenerationType } from '@prisma/client';
import { prisma } from '../config/prisma.js';
import { AppError } from '../utils/AppError.js';
import { aiService } from './aiService.js';
import { promptBuilderService } from './promptBuilderService.js';

type CreateGenerationPayload = {
  type: GenerationType;
  area: string;
  experienceLevel: string;
  skills: string[];
  goal: string;
  tone: string;
  baseText?: string;
};

async function ensureUsageAllowed(userId: string) {
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

  if (user.plan.generationLimit !== null && user._count.generations >= user.plan.generationLimit) {
    throw new AppError('Generation limit reached for current plan', 403);
  }
}

export const generationService = {
  async create(userId: string, payload: CreateGenerationPayload) {
    await ensureUsageAllowed(userId);

    const prompt = promptBuilderService.buildPrompt(payload);
    const output = await aiService.generate(prompt);

    const generation = await prisma.generation.create({
      data: {
        userId,
        type: payload.type,
        area: payload.area,
        experienceLevel: payload.experienceLevel,
        skills: payload.skills,
        goal: payload.goal,
        tone: payload.tone,
        baseText: payload.baseText,
        prompt,
        output
      }
    });

    await prisma.usageHistory.create({
      data: {
        userId,
        generationId: generation.id,
        action: 'GENERATION_CREATED',
        metadata: {
          type: generation.type,
          tone: generation.tone
        }
      }
    });

    return generation;
  },

  async list(userId: string, type?: GenerationType) {
    return prisma.generation.findMany({
      where: {
        userId,
        ...(type ? { type } : {})
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
  },

  async getById(userId: string, id: string) {
    const generation = await prisma.generation.findFirst({
      where: { id, userId }
    });

    if (!generation) {
      throw new AppError('Generation not found', 404);
    }

    return generation;
  },

  async remove(userId: string, id: string) {
    const generation = await prisma.generation.findFirst({
      where: { id, userId }
    });

    if (!generation) {
      throw new AppError('Generation not found', 404);
    }

    await prisma.generation.delete({ where: { id } });
  }
};

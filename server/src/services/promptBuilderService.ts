import type { GenerationType } from '@prisma/client';

const typeLabels: Record<GenerationType, string> = {
  PROFESSIONAL_SUMMARY: 'resumo profissional para curriculo',
  LINKEDIN_HEADLINE: 'headline para LinkedIn',
  COVER_LETTER: 'carta de apresentacao',
  TEXT_IMPROVEMENT: 'melhoria de texto profissional',
  SHORT_BIO: 'bio profissional curta'
};

export const promptBuilderService = {
  buildPrompt(payload: {
    type: GenerationType;
    area: string;
    experienceLevel: string;
    skills: string[];
    goal: string;
    tone: string;
    baseText?: string;
  }) {
    const baseText = payload.baseText?.trim()
      ? `Texto base para considerar:\n${payload.baseText.trim()}\n`
      : 'Nao existe texto base. Crie o material do zero.\n';

    return [
      'Voce e um especialista em posicionamento profissional e escrita executiva.',
      `Gere um ${typeLabels[payload.type]} em portugues do Brasil.`,
      `Area profissional: ${payload.area}.`,
      `Nivel de experiencia: ${payload.experienceLevel}.`,
      `Habilidades-chave: ${payload.skills.join(', ')}.`,
      `Objetivo profissional: ${payload.goal}.`,
      `Tom desejado: ${payload.tone}.`,
      baseText,
      'O texto deve soar humano, estrategico, direto, premium e sem cliches.'
    ].join('\n');
  }
};

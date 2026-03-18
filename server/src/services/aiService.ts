import { env } from '../config/env.js';
import type { AIProvider } from './aiProvider.js';
import { FallbackAIProvider } from './fallbackAIProvider.js';
import { OpenAIProvider } from './openaiProvider.js';

function resolveProvider(): AIProvider {
  if (env.AI_PROVIDER === 'openai') {
    if (!env.OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY is required when AI_PROVIDER is openai');
    }

    return new OpenAIProvider();
  }

  return new FallbackAIProvider();
}

const provider = resolveProvider();

export const aiService = {
  async generate(prompt: string) {
    return provider.generateText({ prompt });
  }
};

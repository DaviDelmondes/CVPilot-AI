import { env } from '../config/env.js';
import type { AIProvider } from './aiProvider.js';
import { FallbackAIProvider } from './fallbackAIProvider.js';
import { OpenAIProvider } from './openaiProvider.js';

function resolveProvider(): AIProvider {
  if (env.AI_PROVIDER === 'openai' && env.OPENAI_API_KEY) {
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

import OpenAI from 'openai';
import { env } from '../config/env.js';
import type { AIProvider, GenerateTextInput } from './aiProvider.js';

export class OpenAIProvider implements AIProvider {
  private client: OpenAI;

  constructor() {
    this.client = new OpenAI({ apiKey: env.OPENAI_API_KEY });
  }

  async generateText({ prompt }: GenerateTextInput): Promise<string> {
    const response = await this.client.responses.create({
      model: env.OPENAI_MODEL,
      input: prompt
    });

    return response.output_text;
  }
}

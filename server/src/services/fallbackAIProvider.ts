import type { AIProvider, GenerateTextInput } from './aiProvider.js';

export class FallbackAIProvider implements AIProvider {
  async generateText({ prompt }: GenerateTextInput): Promise<string> {
    return `Conteúdo gerado em modo local.\n\nBase da solicitação:\n${prompt}`;
  }
}

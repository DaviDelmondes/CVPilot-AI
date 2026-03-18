import { useState } from 'react';
import { z } from 'zod';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { PageHeader } from '../components/PageHeader';
import { Select } from '../components/Select';
import { Textarea } from '../components/Textarea';
import { AppShell } from '../layouts/AppShell';
import { generationService } from '../services/generationService';
import type { Generation } from '../types/generation';

const schema = z.object({
  type: z.enum(['PROFESSIONAL_SUMMARY', 'LINKEDIN_HEADLINE', 'COVER_LETTER', 'TEXT_IMPROVEMENT', 'SHORT_BIO']),
  area: z.string().min(2, 'Informe a área profissional'),
  experienceLevel: z.string().min(2, 'Informe o nível de experiência'),
  skills: z.string().min(2, 'Informe pelo menos uma habilidade'),
  goal: z.string().min(3, 'Informe o objetivo profissional'),
  tone: z.enum(['formal', 'confident', 'objective', 'modern']),
  baseText: z.string().optional()
});

export function NewGenerationPage() {
  const [values, setValues] = useState({
    type: 'PROFESSIONAL_SUMMARY',
    area: '',
    experienceLevel: '',
    skills: '',
    goal: '',
    baseText: '',
    tone: 'formal'
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Generation | null>(null);
  const [serverError, setServerError] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const parsed = schema.safeParse(values);

    if (!parsed.success) {
      setErrors(Object.fromEntries(parsed.error.errors.map((item) => [String(item.path[0]), item.message])));
      return;
    }

    setErrors({});
    setLoading(true);
    setServerError('');

    try {
      const response = await generationService.create({
        ...parsed.data,
        skills: parsed.data.skills.split(',').map((skill) => skill.trim()).filter(Boolean)
      });
      setResult(response);
    } catch {
      setServerError('Não foi possível gerar o conteúdo agora.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppShell>
      <div className="glass-card p-8">
        <PageHeader eyebrow="AI Studio" title="Nova geração" description="Monte o contexto com clareza e gere uma saída profissional ajustada ao seu objetivo de carreira." />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_0.95fr]">
        <form className="glass-card space-y-5 p-6" onSubmit={handleSubmit}>
          <Select label="Tipo de conteúdo" value={values.type} error={errors.type} onChange={(event) => setValues((state) => ({ ...state, type: event.target.value }))}>
            <option value="PROFESSIONAL_SUMMARY">Resumo profissional</option>
            <option value="LINKEDIN_HEADLINE">Headline para LinkedIn</option>
            <option value="COVER_LETTER">Carta de apresentação</option>
            <option value="TEXT_IMPROVEMENT">Melhoria de texto</option>
            <option value="SHORT_BIO">Bio profissional</option>
          </Select>
          <Input label="Área profissional" value={values.area} error={errors.area} onChange={(event) => setValues((state) => ({ ...state, area: event.target.value }))} />
          <Input label="Nível de experiência" value={values.experienceLevel} error={errors.experienceLevel} onChange={(event) => setValues((state) => ({ ...state, experienceLevel: event.target.value }))} />
          <Input label="Habilidades principais" placeholder="Ex.: Liderança, SQL, React, estratégia de produto" value={values.skills} error={errors.skills} onChange={(event) => setValues((state) => ({ ...state, skills: event.target.value }))} />
          <Input label="Objetivo profissional" value={values.goal} error={errors.goal} onChange={(event) => setValues((state) => ({ ...state, goal: event.target.value }))} />
          <Select label="Tom desejado" value={values.tone} error={errors.tone} onChange={(event) => setValues((state) => ({ ...state, tone: event.target.value }))}>
            <option value="formal">Formal</option>
            <option value="confident">Confiante</option>
            <option value="objective">Objetivo</option>
            <option value="modern">Moderno</option>
          </Select>
          <Textarea label="Texto base opcional" value={values.baseText} error={errors.baseText} onChange={(event) => setValues((state) => ({ ...state, baseText: event.target.value }))} />
          {serverError ? <p className="text-sm text-rose-600">{serverError}</p> : null}
          <Button type="submit" disabled={loading}>{loading ? 'Gerando...' : 'Gerar conteúdo'}</Button>
        </form>

        <section className="glass-card p-6">
          <div className="mb-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">Resultado</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-950">Saída da IA</h2>
          </div>
          {result ? (
            <div className="space-y-4">
              <div className="rounded-3xl bg-slate-950 p-5 text-slate-100">
                <p className="whitespace-pre-wrap text-sm leading-7">{result.output}</p>
              </div>
              <Button variant="ghost" onClick={() => navigator.clipboard.writeText(result.output)}>Copiar conteúdo</Button>
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-slate-200 bg-slate-50 p-8 text-sm text-slate-500">
              Preencha o formulário para gerar um conteúdo profissional.
            </div>
          )}
        </section>
      </div>
    </AppShell>
  );
}

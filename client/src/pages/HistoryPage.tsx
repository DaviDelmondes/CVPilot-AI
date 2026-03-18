import { useEffect, useState } from 'react';
import { Button } from '../components/Button';
import { PageHeader } from '../components/PageHeader';
import { AppShell } from '../layouts/AppShell';
import { generationService } from '../services/generationService';
import type { Generation, GenerationType } from '../types/generation';

const filters: { label: string; value: GenerationType | 'ALL' }[] = [
  { label: 'Todos', value: 'ALL' },
  { label: 'Resumo', value: 'PROFESSIONAL_SUMMARY' },
  { label: 'Headline', value: 'LINKEDIN_HEADLINE' },
  { label: 'Carta', value: 'COVER_LETTER' },
  { label: 'Melhoria', value: 'TEXT_IMPROVEMENT' },
  { label: 'Bio', value: 'SHORT_BIO' }
];

export function HistoryPage() {
  const [items, setItems] = useState<Generation[]>([]);
  const [selectedType, setSelectedType] = useState<GenerationType | 'ALL'>('ALL');
  const [selected, setSelected] = useState<Generation | null>(null);

  const loadItems = async (filter = selectedType) => {
    const response = await generationService.list(filter);
    setItems(response);
    setSelected((current) => response.find((item) => item.id === current?.id) ?? response[0] ?? null);
  };

  useEffect(() => {
    void loadItems();
  }, []);

  return (
    <AppShell>
      <div className="glass-card p-8">
        <PageHeader eyebrow="Library" title="Histórico de gerações" description="Filtre, visualize e gerencie todos os conteúdos gerados pela plataforma." />
      </div>

      <div className="flex flex-wrap gap-3">
        {filters.map((filter) => (
          <button
            key={filter.value}
            type="button"
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              selectedType === filter.value ? 'bg-brand-600 text-white' : 'bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50'
            }`}
            onClick={async () => {
              setSelectedType(filter.value);
              await loadItems(filter.value);
            }}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <section className="glass-card space-y-4 p-4">
          {items.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`w-full rounded-3xl border p-5 text-left transition ${
                selected?.id === item.id ? 'border-brand-200 bg-brand-50' : 'border-transparent bg-slate-50/80 hover:border-slate-200'
              }`}
              onClick={() => setSelected(item)}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">{item.type}</p>
              <h3 className="mt-2 text-lg font-semibold text-slate-900">{item.area}</h3>
              <p className="mt-2 line-clamp-2 text-sm text-slate-500">{item.output}</p>
            </button>
          ))}
          {!items.length ? <p className="p-4 text-sm text-slate-500">Nenhuma geração encontrada.</p> : null}
        </section>

        <section className="glass-card p-6">
          {selected ? (
            <div className="space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">{selected.type}</p>
                  <h2 className="mt-2 text-2xl font-semibold text-slate-950">{selected.area}</h2>
                </div>
                <span className="text-sm text-slate-400">{new Date(selected.createdAt).toLocaleDateString('pt-BR')}</span>
              </div>
              <div className="rounded-3xl bg-slate-950 p-6 text-slate-100">
                <p className="whitespace-pre-wrap text-sm leading-7">{selected.output}</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button variant="ghost" onClick={() => navigator.clipboard.writeText(selected.output)}>Copiar</Button>
                <Button
                  variant="danger"
                  onClick={async () => {
                    await generationService.remove(selected.id);
                    await loadItems();
                  }}
                >
                  Excluir
                </Button>
              </div>
            </div>
          ) : (
            <p className="text-sm text-slate-500">Selecione uma geração para ver os detalhes.</p>
          )}
        </section>
      </div>
    </AppShell>
  );
}

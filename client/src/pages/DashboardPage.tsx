import { useEffect, useState } from 'react';
import { BarChart3, History, Sparkles } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { StatCard } from '../components/StatCard';
import { useAuth } from '../hooks/useAuth';
import { AppShell } from '../layouts/AppShell';
import { dashboardService } from '../services/dashboardService';
import type { DashboardMetrics } from '../types/generation';

export function DashboardPage() {
  const { user } = useAuth();
  const [data, setData] = useState<DashboardMetrics | null>(null);

  useEffect(() => {
    void dashboardService.getMetrics().then(setData);
  }, []);

  return (
    <AppShell>
      <div className="glass-card overflow-hidden p-8">
        <PageHeader
          eyebrow="Dashboard"
          title={`Bem-vindo, ${user?.name ?? 'profissional'}`}
          description="Acompanhe seu consumo, veja o histórico recente e gere novos materiais para acelerar sua presença profissional."
        />
      </div>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        <StatCard title="Plano" value={data?.plan.name ?? '--'} description="Estrutura pronta para upgrades e monetização." icon={<Sparkles className="h-5 w-5" />} />
        <StatCard title="Gerações" value={String(data?.generationCount ?? 0)} description="Volume total de conteúdos criados na sua conta." icon={<BarChart3 className="h-5 w-5" />} />
        <StatCard title="Saldo" value={data?.remainingGenerations === null ? 'Ilimitado' : String(data?.remainingGenerations ?? '--')} description="Quantidade disponível dentro do plano atual." icon={<History className="h-5 w-5" />} />
      </section>

      <section className="glass-card p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-slate-950">Histórico recente</h2>
          <p className="text-sm text-slate-500">Últimas gerações salvas no seu workspace.</p>
        </div>

        <div className="space-y-4">
          {data?.recentHistory.length ? (
            data.recentHistory.map((item) => (
              <div key={item.id} className="rounded-3xl border border-slate-100 bg-slate-50/70 p-5">
                <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">{item.type}</p>
                    <h3 className="mt-2 text-lg font-semibold text-slate-900">{item.area}</h3>
                    <p className="mt-1 line-clamp-2 text-sm text-slate-500">{item.output}</p>
                  </div>
                  <span className="text-sm text-slate-400">{new Date(item.createdAt).toLocaleDateString('pt-BR')}</span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-slate-500">Nenhuma geração encontrada até o momento.</p>
          )}
        </div>
      </section>
    </AppShell>
  );
}

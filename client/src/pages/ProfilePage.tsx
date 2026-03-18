import { PageHeader } from '../components/PageHeader';
import { useAuth } from '../hooks/useAuth';
import { AppShell } from '../layouts/AppShell';

export function ProfilePage() {
  const { user } = useAuth();

  return (
    <AppShell>
      <div className="glass-card p-8">
        <PageHeader eyebrow="Perfil" title="Dados da conta" description="Visualize informações da sua assinatura e o status atual da sua conta." />
      </div>

      <section className="grid gap-6 md:grid-cols-2">
        <div className="glass-card p-6">
          <p className="text-sm text-slate-500">Nome</p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-950">{user?.name}</h2>
          <p className="mt-6 text-sm text-slate-500">E-mail</p>
          <p className="mt-2 text-base font-medium text-slate-900">{user?.email}</p>
        </div>
        <div className="glass-card p-6">
          <p className="text-sm text-slate-500">Plano</p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-950">{user?.currentPlan.name}</h2>
          <p className="mt-6 text-sm text-slate-500">Gerações realizadas</p>
          <p className="mt-2 text-base font-medium text-slate-900">{user?.generationCount}</p>
          <p className="mt-6 text-sm text-slate-500">Nível de acesso</p>
          <p className="mt-2 text-base font-medium text-slate-900">{user?.role}</p>
        </div>
      </section>
    </AppShell>
  );
}

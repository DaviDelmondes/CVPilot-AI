import { useEffect, useState } from 'react';
import { PageHeader } from '../components/PageHeader';
import { Select } from '../components/Select';
import { AppShell } from '../layouts/AppShell';
import { adminService } from '../services/adminService';
import type { AdminStats, AdminUser } from '../types/admin';

export function AdminPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [plans, setPlans] = useState<{ id: string; name: string }[]>([]);

  const load = async () => {
    const [usersResponse, statsResponse, plansResponse] = await Promise.all([
      adminService.getUsers(),
      adminService.getStats(),
      adminService.getPlans()
    ]);
    setUsers(usersResponse);
    setStats(statsResponse);
    setPlans(plansResponse);
  };

  useEffect(() => {
    void load();
  }, []);

  return (
    <AppShell>
      <div className="glass-card p-8">
        <PageHeader eyebrow="Admin" title="Gestão da plataforma" description="Acompanhe métricas básicas, usuários e distribuição de planos da operação." />
      </div>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <div className="glass-card p-6"><p className="text-sm text-slate-500">Usuários</p><h3 className="mt-2 text-3xl font-bold text-slate-950">{stats?.totalUsers ?? 0}</h3></div>
        <div className="glass-card p-6"><p className="text-sm text-slate-500">Gerações</p><h3 className="mt-2 text-3xl font-bold text-slate-950">{stats?.totalGenerations ?? 0}</h3></div>
        <div className="glass-card p-6"><p className="text-sm text-slate-500">Premium</p><h3 className="mt-2 text-3xl font-bold text-slate-950">{stats?.premiumUsers ?? 0}</h3></div>
        <div className="glass-card p-6"><p className="text-sm text-slate-500">Free</p><h3 className="mt-2 text-3xl font-bold text-slate-950">{stats?.freeUsers ?? 0}</h3></div>
      </section>

      <section className="glass-card overflow-hidden p-6">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-100">
            <thead>
              <tr className="text-left text-sm text-slate-500">
                <th className="pb-4 font-medium">Usuário</th>
                <th className="pb-4 font-medium">Role</th>
                <th className="pb-4 font-medium">Gerações</th>
                <th className="pb-4 font-medium">Plano</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="py-4"><p className="font-semibold text-slate-900">{user.name}</p><p className="text-sm text-slate-500">{user.email}</p></td>
                  <td className="py-4 text-sm text-slate-600">{user.role}</td>
                  <td className="py-4 text-sm text-slate-600">{user.generationCount}</td>
                  <td className="py-4">
                    <Select
                      label=""
                      value={user.currentPlan.id}
                      onChange={async (event) => {
                        await adminService.updatePlan(user.id, event.target.value);
                        await load();
                      }}
                    >
                      {plans.map((plan) => (
                        <option key={plan.id} value={plan.id}>{plan.name}</option>
                      ))}
                    </Select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </AppShell>
  );
}

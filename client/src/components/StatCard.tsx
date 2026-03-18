import type { ReactNode } from 'react';

export function StatCard({
  title,
  value,
  description,
  icon
}: {
  title: string;
  value: string;
  description: string;
  icon: ReactNode;
}) {
  return (
    <div className="glass-card p-6">
      <div className="mb-4 inline-flex rounded-2xl bg-brand-50 p-3 text-brand-600">{icon}</div>
      <p className="text-sm text-slate-500">{title}</p>
      <h3 className="mt-2 text-3xl font-bold text-slate-950">{value}</h3>
      <p className="mt-2 text-sm text-slate-500">{description}</p>
    </div>
  );
}

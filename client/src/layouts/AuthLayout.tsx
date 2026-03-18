import type { PropsWithChildren } from 'react';

export function AuthLayout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen bg-mesh">
      <div className="mx-auto grid min-h-screen max-w-7xl items-center gap-8 px-6 py-10 lg:grid-cols-[1.15fr_0.85fr]">
        <section className="hidden rounded-[2rem] bg-slate-950 p-10 text-white shadow-soft lg:block">
          <div className="max-w-lg space-y-6">
            <span className="inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-sky-200">
              CVPilot AI
            </span>
            <h1 className="text-5xl font-bold leading-tight">
              Geração profissional com aparência de produto SaaS real.
            </h1>
            <p className="text-base text-slate-300">
              Crie resumos, headlines, cartas e bios com uma arquitetura pronta para IA, histórico, planos e administração.
            </p>
          </div>
        </section>
        <section>{children}</section>
      </div>
    </div>
  );
}

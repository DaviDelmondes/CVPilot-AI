import type { PropsWithChildren } from 'react';
import { History, LayoutDashboard, LogOut, ShieldCheck, User, WandSparkles } from 'lucide-react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { cn } from '../lib/cn';

const baseNavigation = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/generations/new', label: 'Nova geração', icon: WandSparkles },
  { to: '/history', label: 'Histórico', icon: History },
  { to: '/profile', label: 'Perfil', icon: User }
];

export function AppShell({ children }: PropsWithChildren) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const navigation =
    user?.role === 'ADMIN' ? [...baseNavigation, { to: '/admin', label: 'Admin', icon: ShieldCheck }] : baseNavigation;

  return (
    <div className="min-h-screen bg-mesh">
      <div className="mx-auto flex min-h-screen max-w-7xl gap-6 px-4 py-4 md:px-6 lg:px-8">
        <aside className="hidden w-72 flex-col rounded-[2rem] bg-slate-950 p-6 text-white shadow-soft lg:flex">
          <Link to="/dashboard" className="mb-10 flex items-center gap-3">
            <div className="rounded-2xl bg-brand-600 p-3">
              <WandSparkles className="h-5 w-5" />
            </div>
            <div>
              <p className="text-lg font-bold">CVPilot AI</p>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Career content studio</p>
            </div>
          </Link>

          <nav className="space-y-2">
            {navigation.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/10 hover:text-white',
                    isActive && 'bg-white text-slate-950'
                  )
                }
              >
                <Icon className="h-4 w-4" />
                {label}
              </NavLink>
            ))}
          </nav>

          <div className="mt-auto rounded-3xl border border-white/10 bg-white/5 p-5">
            <p className="text-sm text-slate-400">Plano atual</p>
            <p className="mt-1 text-xl font-semibold">{user?.currentPlan.name}</p>
            <p className="mt-2 text-sm text-slate-400">{user?.generationCount} gerações realizadas</p>
            <button
              type="button"
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-sky-300"
              onClick={() => {
                logout();
                navigate('/login');
              }}
            >
              <LogOut className="h-4 w-4" />
              Sair
            </button>
          </div>
        </aside>

        <main className="flex-1">
          <div className="mb-4 flex items-center justify-between rounded-[2rem] bg-white/70 px-5 py-4 shadow-soft backdrop-blur-xl lg:hidden">
            <div>
              <p className="text-lg font-bold text-slate-950">CVPilot AI</p>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{user?.currentPlan.name}</p>
            </div>
            <button
              type="button"
              className="rounded-2xl bg-slate-950 px-4 py-2 text-sm font-semibold text-white"
              onClick={() => {
                logout();
                navigate('/login');
              }}
            >
              Sair
            </button>
          </div>
          <div className="space-y-6">{children}</div>
        </main>
      </div>
    </div>
  );
}

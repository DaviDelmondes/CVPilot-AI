import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import { cn } from '../lib/cn';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  fullWidth?: boolean;
}

export function Button({
  children,
  variant = 'primary',
  fullWidth,
  className,
  ...props
}: PropsWithChildren<ButtonProps>) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-2xl px-4 py-3 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60',
        variant === 'primary' && 'bg-brand-600 text-white hover:bg-brand-700',
        variant === 'secondary' && 'bg-slate-900 text-white hover:bg-slate-800',
        variant === 'ghost' && 'bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50',
        variant === 'danger' && 'bg-rose-600 text-white hover:bg-rose-700',
        fullWidth && 'w-full',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

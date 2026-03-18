import type { SelectHTMLAttributes } from 'react';
import { cn } from '../lib/cn';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
}

export function Select({ label, error, className, children, ...props }: SelectProps) {
  return (
    <label className="block space-y-2">
      {label ? <span className="text-sm font-medium text-slate-700">{label}</span> : null}
      <select
        className={cn(
          'w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-brand-500 focus:ring-4 focus:ring-brand-100',
          error && 'border-rose-400 focus:border-rose-400 focus:ring-rose-100',
          className
        )}
        {...props}
      >
        {children}
      </select>
      {error ? <span className="text-sm text-rose-600">{error}</span> : null}
    </label>
  );
}

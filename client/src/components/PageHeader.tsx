export function PageHeader({
  eyebrow,
  title,
  description
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="space-y-2">
      <span className="inline-flex rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">
        {eyebrow}
      </span>
      <h1 className="text-3xl font-bold text-slate-950 md:text-4xl">{title}</h1>
      <p className="max-w-2xl text-sm text-slate-500 md:text-base">{description}</p>
    </div>
  );
}

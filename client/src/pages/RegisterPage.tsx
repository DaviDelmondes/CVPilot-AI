import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { useAuth } from '../hooks/useAuth';
import { AuthLayout } from '../layouts/AuthLayout';

const schema = z.object({
  name: z.string().min(2, 'Informe seu nome'),
  email: z.string().email('Informe um e-mail válido'),
  password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres')
});

export function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [values, setValues] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const result = schema.safeParse(values);

    if (!result.success) {
      setErrors(Object.fromEntries(result.error.errors.map((item) => [String(item.path[0]), item.message])));
      return;
    }

    setErrors({});
    setLoading(true);
    setServerError('');

    try {
      await register(values.name, values.email, values.password);
      navigate('/dashboard');
    } catch {
      setServerError('Não foi possível criar a conta.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="mx-auto max-w-xl rounded-[2rem] bg-white p-8 shadow-soft md:p-10">
        <div className="space-y-3">
          <span className="inline-flex rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">
            Cadastro
          </span>
          <h2 className="text-3xl font-bold text-slate-950">Crie sua conta profissional</h2>
        </div>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <Input label="Nome" value={values.name} error={errors.name} onChange={(event) => setValues((state) => ({ ...state, name: event.target.value }))} />
          <Input label="E-mail" type="email" value={values.email} error={errors.email} onChange={(event) => setValues((state) => ({ ...state, email: event.target.value }))} />
          <Input label="Senha" type="password" value={values.password} error={errors.password} onChange={(event) => setValues((state) => ({ ...state, password: event.target.value }))} />
          {serverError ? <p className="text-sm text-rose-600">{serverError}</p> : null}
          <Button type="submit" fullWidth disabled={loading}>{loading ? 'Criando conta...' : 'Criar conta'}</Button>
        </form>

        <p className="mt-6 text-sm text-slate-500">
          Já possui conta? <Link to="/login" className="font-semibold text-brand-700">Entrar</Link>
        </p>
      </div>
    </AuthLayout>
  );
}

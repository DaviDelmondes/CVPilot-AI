import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { useAuth } from '../hooks/useAuth';
import { AuthLayout } from '../layouts/AuthLayout';

const schema = z.object({
  email: z.string().email('Informe um e-mail válido'),
  password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres')
});

export function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [values, setValues] = useState({ email: '', password: '' });
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
      await login(values.email, values.password);
      navigate('/dashboard');
    } catch {
      setServerError('Falha no login. Verifique suas credenciais.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="mx-auto max-w-xl rounded-[2rem] bg-white p-8 shadow-soft md:p-10">
        <div className="space-y-3">
          <span className="inline-flex rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">
            Entrar
          </span>
          <h2 className="text-3xl font-bold text-slate-950">Acesse sua central de geração</h2>
        </div>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <Input label="E-mail" type="email" value={values.email} error={errors.email} onChange={(event) => setValues((state) => ({ ...state, email: event.target.value }))} />
          <Input label="Senha" type="password" value={values.password} error={errors.password} onChange={(event) => setValues((state) => ({ ...state, password: event.target.value }))} />
          {serverError ? <p className="text-sm text-rose-600">{serverError}</p> : null}
          <Button type="submit" fullWidth disabled={loading}>{loading ? 'Entrando...' : 'Entrar'}</Button>
        </form>

        <p className="mt-6 text-sm text-slate-500">
          Ainda não tem conta? <Link to="/register" className="font-semibold text-brand-700">Criar conta</Link>
        </p>
      </div>
    </AuthLayout>
  );
}

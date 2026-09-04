import React, { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Button, Card, Field, Input } from '../components/ui/Primitives';
import { useAtlas } from '../contexts/AtlasContext';

export function AuthPage() {
  const { authUser, login, register } = useAtlas();
  const navigate = useNavigate();
  const location = useLocation();
  const [isRegistering, setIsRegistering] = useState(location.pathname === '/register');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (authUser) return <Navigate to="/dashboard" replace />;

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    try {
      if (isRegistering) await register(name, email, password);
      else await login(email, password);
      navigate('/dashboard', { replace: true });
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Authentication failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-md py-12">
      <Card className="p-6 sm:p-8">
        <h1 className="font-display text-3xl font-bold text-ink">{isRegistering ? 'Create your ATLAS account' : 'Welcome back'}</h1>
        <p className="mt-2 text-sm text-muted">Your trips and saved places stay synced across sessions.</p>
        <form className="mt-6 space-y-4" onSubmit={submit}>
          {isRegistering && <Field label="Name" htmlFor="auth-name"><Input id="auth-name" required value={name} onChange={(event) => setName(event.target.value)} /></Field>}
          <Field label="Email" htmlFor="auth-email"><Input id="auth-email" required type="email" value={email} onChange={(event) => setEmail(event.target.value)} /></Field>
          <Field label="Password" htmlFor="auth-password"><Input id="auth-password" required minLength={8} type="password" value={password} onChange={(event) => setPassword(event.target.value)} /></Field>
          {error && <p className="text-sm text-danger" role="alert">{error}</p>}
          <Button type="submit" loading={loading} className="w-full">{isRegistering ? 'Register' : 'Log in'}</Button>
        </form>
        <button className="mt-5 text-sm font-semibold text-brand" onClick={() => setIsRegistering((value) => !value)}>
          {isRegistering ? 'Already have an account? Log in' : 'Need an account? Register'}
        </button>
      </Card>
    </div>
  );
}

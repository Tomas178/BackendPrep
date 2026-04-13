'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import { ROUTES } from '@/constants/routes';
import OAuthButtons from '@/components/OAuthButtons';

export default function SignUp() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { error } = await authClient.signUp.email({
      name,
      email,
      password,
      callbackURL: ROUTES.PRACTICE.path,
    });

    if (error) {
      setError(error.message ?? 'Sign up failed');
      setLoading(false);
    } else {
      router.push(ROUTES.PRACTICE.path);
    }
  }

  return (
    <div className="bg-surface-alt flex flex-1 items-center justify-center font-sans">
      <div className="border-border bg-surface w-full max-w-sm rounded-xl border p-8 shadow-sm">
        <h1 className="text-primary text-center text-2xl font-bold tracking-tight">
          Sign Up
        </h1>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label
              htmlFor="name"
              className="text-secondary block text-sm font-medium"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border-border bg-surface text-primary focus:ring-accent mt-1 block w-full rounded-lg border px-3 py-2 text-sm focus:ring-2 focus:outline-none"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="text-secondary block text-sm font-medium"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-border bg-surface text-primary focus:ring-accent mt-1 block w-full rounded-lg border px-3 py-2 text-sm focus:ring-2 focus:outline-none"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="text-secondary block text-sm font-medium"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-border bg-surface text-primary focus:ring-accent mt-1 block w-full rounded-lg border px-3 py-2 text-sm focus:ring-2 focus:outline-none"
            />
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="bg-accent text-accent-foreground w-full rounded-lg px-4 py-2 text-sm font-medium transition-colors hover:opacity-90 disabled:opacity-50"
          >
            {loading ? 'Creating account...' : 'Sign Up'}
          </button>
        </form>
        <div className="my-4 flex items-center gap-3">
          <div className="bg-border h-px flex-1" />
          <span className="text-muted text-xs">or</span>
          <div className="bg-border h-px flex-1" />
        </div>
        <OAuthButtons />
        <p className="text-muted mt-4 text-center text-sm">
          Already have an account?{' '}
          <Link
            href={ROUTES.SIGN_IN.path}
            className="text-primary font-medium underline"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import { ROUTES } from '@/constants/routes';
import OAuthButtons from '@/components/OAuthButtons';
import { Eye, EyeOff } from 'lucide-react';

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { error } = await authClient.signIn.email({
      email,
      password,
      callbackURL: ROUTES.PRACTICE.path,
    });

    if (error) {
      if (error.status === 403) {
        setError('Please verify your email address before signing in.');
      } else {
        setError(error.message ?? 'Sign in failed');
      }
      setLoading(false);
    } else {
      router.push(ROUTES.PRACTICE.path);
    }
  }

  return (
    <div className="bg-surface-alt flex flex-1 items-center justify-center font-sans">
      <div className="border-border bg-surface w-full max-w-sm rounded-xl border p-8 shadow-sm">
        <h1 className="text-primary text-center text-2xl font-bold tracking-tight">
          Sign In
        </h1>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
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
            <div className="relative mt-1">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-border bg-surface text-primary focus:ring-accent block w-full rounded-lg border px-3 py-2 pr-10 text-sm focus:ring-2 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-muted hover:text-secondary absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="bg-accent text-accent-foreground w-full cursor-pointer rounded-lg px-4 py-2 text-sm font-medium transition-colors hover:opacity-90 disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        <div className="my-4 flex items-center gap-3">
          <div className="bg-border h-px flex-1" />
          <span className="text-muted text-xs">or</span>
          <div className="bg-border h-px flex-1" />
        </div>
        <OAuthButtons />
        <p className="text-muted mt-4 text-center text-sm">
          Don&apos;t have an account?{' '}
          <Link
            href={ROUTES.SIGN_UP.path}
            className="text-primary cursor-pointer font-medium underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

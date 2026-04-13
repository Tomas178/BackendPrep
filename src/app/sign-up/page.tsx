'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Eye, EyeOff } from 'lucide-react';
import { authClient } from '@/lib/auth-client';
import { ROUTES } from '@/constants/routes';
import OAuthButtons from '@/components/OAuthButtons';

export default function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

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
      setEmailSent(true);
      setLoading(false);
    }
  }

  if (emailSent) {
    return (
      <div className="bg-surface-alt flex flex-1 items-center justify-center font-sans">
        <div className="border-border bg-surface w-full max-w-sm rounded-xl border p-8 text-center shadow-sm">
          <h1 className="text-primary text-2xl font-bold tracking-tight">
            Check your email
          </h1>
          <p className="text-secondary mt-3 text-sm">
            We sent a verification link to <strong>{email}</strong>. Click the
            link to verify your account.
          </p>
          <Link
            href={ROUTES.SIGN_IN.path}
            className="text-primary mt-4 inline-block text-sm font-medium underline"
          >
            Back to Sign In
          </Link>
        </div>
      </div>
    );
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
          <div>
            <label
              htmlFor="confirmPassword"
              className="text-secondary block text-sm font-medium"
            >
              Repeat Password
            </label>
            <div className="relative mt-1">
              <input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                required
                minLength={8}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="border-border bg-surface text-primary focus:ring-accent block w-full rounded-lg border px-3 py-2 pr-10 text-sm focus:ring-2 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="text-muted hover:text-secondary absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3"
              >
                {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="bg-accent text-accent-foreground w-full cursor-pointer rounded-lg px-4 py-2 text-sm font-medium transition-colors hover:opacity-90 disabled:opacity-50"
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
            className="text-primary cursor-pointer font-medium underline"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}

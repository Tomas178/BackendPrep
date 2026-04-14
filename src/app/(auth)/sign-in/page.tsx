'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import { ROUTES } from '@/constants/routes';
import AuthCard from '@/components/Auth/AuthCard';
import FormField from '@/components/Auth/FormField';
import PasswordField from '@/components/Auth/PasswordField';
import SubmitButton from '@/components/Auth/SubmitButton';
import AuthDivider from '@/components/Auth/AuthDivider';
import OAuthButtons from '@/components/OAuthButtons';

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    setError('');
    setLoading(true);

    const { error } = await authClient.signIn.email({
      email,
      password,
      callbackURL: ROUTES.PRACTICE.PATH,
    });

    if (error) {
      if (error.status === 403) {
        setError('Please verify your email address before signing in.');
      } else {
        setError(error.message ?? 'Sign in failed');
      }
      setLoading(false);
    } else {
      router.push(ROUTES.PRACTICE.PATH);
    }
  }

  return (
    <AuthCard title="Sign In">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          void handleSubmit();
        }}
        className="mt-6 space-y-4"
      >
        <FormField
          id="email"
          label="Email"
          type="email"
          required
          value={email}
          onChange={setEmail}
        />
        <PasswordField
          id="password"
          label="Password"
          required
          minLength={8}
          value={password}
          onChange={setPassword}
        />
        {error && <p className="text-sm text-red-500">{error}</p>}
        <SubmitButton
          loading={loading}
          text="Sign In"
          loadingText="Signing in..."
        />
      </form>
      <AuthDivider />
      <OAuthButtons />
      <p className="text-muted mt-4 text-center text-sm">
        Don&apos;t have an account?{' '}
        <Link
          href={ROUTES.SIGN_UP.PATH}
          className="text-primary cursor-pointer font-medium underline"
        >
          Sign Up
        </Link>
      </p>
    </AuthCard>
  );
}

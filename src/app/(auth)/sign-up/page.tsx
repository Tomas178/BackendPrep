'use client';

import { useState } from 'react';
import Link from 'next/link';
import { authClient } from '@/lib/auth-client';
import { ROUTES } from '@/constants/routes';
import AuthCard from '@/components/Auth/AuthCard';
import FormField from '@/components/Auth/FormField';
import PasswordField from '@/components/Auth/PasswordField';
import SubmitButton from '@/components/Auth/SubmitButton';
import AuthDivider from '@/components/Auth/AuthDivider';
import OAuthButtons from '@/components/OAuthButtons';

export default function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  async function handleSubmit() {
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
      callbackURL: ROUTES.PRACTICE.PATH,
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
      <AuthCard title="Check your email">
        <p className="text-secondary mt-3 text-center text-sm">
          We sent a verification link to <strong>{email}</strong>. Click the
          link to verify your account.
        </p>
        <Link
          href={ROUTES.SIGN_IN.PATH}
          className="text-primary mt-4 block text-center text-sm font-medium underline"
        >
          Back to Sign In
        </Link>
      </AuthCard>
    );
  }

  return (
    <AuthCard title="Sign Up">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          void handleSubmit();
        }}
        className="mt-6 space-y-4"
      >
        <FormField
          id="name"
          label="Name"
          required
          value={name}
          onChange={setName}
        />
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
        <PasswordField
          id="confirmPassword"
          label="Repeat Password"
          required
          minLength={8}
          value={confirmPassword}
          onChange={setConfirmPassword}
        />
        {error && <p className="text-sm text-red-500">{error}</p>}
        <SubmitButton
          loading={loading}
          text="Sign Up"
          loadingText="Creating account..."
        />
      </form>
      <AuthDivider />
      <OAuthButtons />
      <p className="text-muted mt-4 text-center text-sm">
        Already have an account?{' '}
        <Link
          href={ROUTES.SIGN_IN.PATH}
          className="text-primary cursor-pointer font-medium underline"
        >
          Sign In
        </Link>
      </p>
    </AuthCard>
  );
}

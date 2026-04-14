'use client';

import Image from 'next/image';
import { authClient } from '@/lib/auth-client';
import { ROUTES } from '@/constants/routes';
import SingleOAuthButton from './SingleOAuthButton';
import {
  SUPPORTED_OAUTH_PROVIDERS,
  type SupportedOAuthProviders,
} from '@/constants/supportedOAuthProviders';

export default function OAuthButtons() {
  function handleOAuth(provider: SupportedOAuthProviders) {
    authClient.signIn.social({
      provider,
      callbackURL: ROUTES.PRACTICE.path,
    });
  }

  return (
    <div className="space-y-2">
      <SingleOAuthButton
        title="Continue with Google"
        onClick={() => handleOAuth(SUPPORTED_OAUTH_PROVIDERS.GOOGLE)}
      >
        <Image
          src="/social-logins/Google.png"
          alt="Google"
          width={16}
          height={16}
        />
      </SingleOAuthButton>
      <SingleOAuthButton
        title="Continue with GitHub"
        onClick={() => handleOAuth(SUPPORTED_OAUTH_PROVIDERS.GITHUB)}
      >
        <Image
          src="/social-logins/GitHub.png"
          alt="GitHub"
          width={16}
          height={16}
        />
      </SingleOAuthButton>
    </div>
  );
}

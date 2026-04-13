'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ROUTES } from '@/constants/routes';
import { authClient } from '@/lib/auth-client';

const navItems = [ROUTES.HOME, ROUTES.PRACTICE];

export default function Nav() {
  const pathname = usePathname() ?? ROUTES.HOME.path;
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  return (
    <nav aria-label="Main navigation">
      <ul className="flex items-center gap-1 sm:gap-2">
        {navItems.map((item) => {
          const isActive =
            item.path === ROUTES.HOME.path
              ? pathname === ROUTES.HOME.path
              : pathname.startsWith(item.path);

          return (
            <li key={item.path}>
              <Link
                href={item.path}
                aria-current={isActive ? 'page' : undefined}
                className={`rounded-full px-3 py-2 text-sm font-medium transition-colors sm:px-4 ${
                  isActive
                    ? 'bg-accent text-accent-foreground'
                    : 'text-secondary hover:bg-hover'
                }`}
              >
                {item.name}
              </Link>
            </li>
          );
        })}
        {!isPending && (
          <li>
            {session ? (
              <button
                type="button"
                onClick={async () => {
                  await authClient.signOut();
                  router.push(ROUTES.HOME.path);
                }}
                className="text-secondary hover:bg-hover cursor-pointer rounded-full px-3 py-2 text-sm font-medium transition-colors sm:px-4"
              >
                Sign Out
              </button>
            ) : (
              <Link
                href={ROUTES.SIGN_IN.path}
                className={`rounded-full px-3 py-2 text-sm font-medium transition-colors sm:px-4 ${
                  pathname.startsWith(ROUTES.SIGN_IN.path)
                    ? 'bg-accent text-accent-foreground'
                    : 'text-secondary hover:bg-hover'
                }`}
              >
                Sign In
              </Link>
            )}
          </li>
        )}
      </ul>
    </nav>
  );
}

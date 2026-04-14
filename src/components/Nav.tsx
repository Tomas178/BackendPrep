'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ROUTES } from '@/constants/routes';
import { authClient } from '@/lib/auth-client';
import ThemeToggle from './ThemeToggle';

const navItems = [ROUTES.HOME, ROUTES.PRACTICE];

export default function Nav() {
  const pathname = usePathname() ?? ROUTES.HOME.PATH;
  const router = useRouter();
  const { data: session } = authClient.useSession();

  return (
    <nav aria-label="Main navigation">
      <ul className="flex items-center gap-1 sm:gap-2">
        {navItems.map((item) => {
          const isActive =
            item.PATH === ROUTES.HOME.PATH
              ? pathname === ROUTES.HOME.PATH
              : pathname.startsWith(item.PATH);

          return (
            <li key={item.PATH}>
              <Link
                href={item.PATH}
                aria-current={isActive ? 'page' : undefined}
                className={`rounded-full px-3 py-2 text-sm font-medium transition-colors sm:px-4 ${
                  isActive
                    ? 'bg-accent text-accent-foreground'
                    : 'text-secondary hover:bg-hover'
                }`}
              >
                {item.NAME}
              </Link>
            </li>
          );
        })}
        <li>
          {session ? (
            <button
              type="button"
              onClick={async () => {
                await authClient.signOut();
                router.push(ROUTES.HOME.PATH);
              }}
              className="text-secondary hover:bg-hover cursor-pointer rounded-full px-3 py-2 text-sm font-medium transition-colors sm:px-4"
            >
              Sign Out
            </button>
          ) : (
            <Link
              href={ROUTES.SIGN_IN.PATH}
              className={`rounded-full px-3 py-2 text-sm font-medium transition-colors sm:px-4 ${
                pathname.startsWith(ROUTES.SIGN_IN.PATH)
                  ? 'bg-accent text-accent-foreground'
                  : 'text-secondary hover:bg-hover'
              }`}
            >
              Sign In
            </Link>
          )}
        </li>
        <li>
          <ThemeToggle />
        </li>
      </ul>
    </nav>
  );
}

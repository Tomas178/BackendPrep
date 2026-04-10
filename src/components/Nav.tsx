'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ROUTES } from '@/constants/routes';

const navItems = [ROUTES.HOME, ROUTES.PRACTICE];

export default function Nav() {
  const pathname = usePathname() ?? ROUTES.HOME.path;

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
                    ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900'
                    : 'text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800'
                }`}
              >
                {item.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

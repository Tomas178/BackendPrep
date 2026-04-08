import Link from 'next/link';
import { WEBSITE_TITLE } from '@/constants/website';
import { ROUTES } from '@/constants/routes';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-black/8 bg-white dark:border-white/[.145] dark:bg-black">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-4 py-6 text-sm text-zinc-600 sm:flex-row sm:px-6 dark:text-zinc-400">
        <p>
          © {year} {WEBSITE_TITLE}. All rights reserved.
        </p>
        <ul className="flex items-center gap-4">
          <li>
            <Link
              href={ROUTES.PRIVACY.path}
              className="transition-colors hover:text-zinc-900 dark:hover:text-zinc-50"
            >
              {ROUTES.PRIVACY.name}
            </Link>
          </li>
          <li>
            <Link
              href={ROUTES.TERMS.path}
              className="transition-colors hover:text-zinc-900 dark:hover:text-zinc-50"
            >
              {ROUTES.TERMS.name}
            </Link>
          </li>
          <li>
            <Link
              href={ROUTES.CONTACT.path}
              className="transition-colors hover:text-zinc-900 dark:hover:text-zinc-50"
            >
              {ROUTES.CONTACT.name}
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}

import Image from 'next/image';
import Link from 'next/link';
import Nav from './Nav';
import { WEBSITE_TITLE } from '@/constants/website';
import { ROUTES } from '@/constants/routes';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-black/8 bg-white/80 backdrop-blur dark:border-white/[.145] dark:bg-black/80">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link
          href={ROUTES.HOME.path}
          className="flex items-center gap-2 text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
        >
          <Image
            src="/logo.svg"
            alt={`${WEBSITE_TITLE} logo`}
            width={32}
            height={32}
            priority
            className="rounded-full"
          />
          {WEBSITE_TITLE}
        </Link>
        <Nav />
      </div>
    </header>
  );
}

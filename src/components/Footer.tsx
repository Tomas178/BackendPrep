import { WEBSITE_TITLE } from '@/constants/website';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-black/8 bg-white dark:border-white/[.145] dark:bg-black">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-center gap-4 px-4 py-6 text-sm text-zinc-600 sm:flex-row sm:px-6 dark:text-zinc-400">
        <p>
          © {year} {WEBSITE_TITLE}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

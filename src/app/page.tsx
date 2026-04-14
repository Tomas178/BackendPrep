import Link from 'next/link';
import { WEBSITE_TITLE } from '@/constants/website';
import { ROUTES } from '@/constants/routes';

export default function Home() {
  return (
    <div className="bg-surface-alt flex flex-1 flex-col items-center justify-center font-sans">
      <main className="mx-auto max-w-2xl px-4 text-center">
        <h1 className="text-primary text-4xl font-bold tracking-tight">
          Welcome to {WEBSITE_TITLE}
        </h1>
        <p className="text-secondary mt-4 text-lg">
          Prepare for backend engineering interviews — from internships to
          junior roles. Sharpen your skills and get ready to stand out.
        </p>
        <Link
          href={ROUTES.PRACTICE.PATH}
          className="bg-accent text-accent-foreground mt-8 inline-block rounded-full px-6 py-3 text-sm font-medium transition-colors hover:opacity-90"
        >
          Practice
        </Link>
      </main>
    </div>
  );
}

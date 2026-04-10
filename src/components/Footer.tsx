import { WEBSITE_TITLE } from '@/constants/website';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-border bg-surface border-t">
      <div className="text-muted mx-auto flex w-full max-w-6xl flex-col items-center justify-center gap-4 px-4 py-6 text-sm sm:flex-row sm:px-6">
        <p>
          © {year} {WEBSITE_TITLE}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

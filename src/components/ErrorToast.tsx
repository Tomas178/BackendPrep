type ErrorToastProps = {
  message: string;
  onDismiss: () => void;
};

export default function ErrorToast({ message, onDismiss }: ErrorToastProps) {
  return (
    <div
      role="alert"
      className="fixed top-4 right-4 z-50 flex max-w-sm items-start gap-3 rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-700 shadow-lg backdrop-blur dark:text-red-300"
    >
      <span className="flex-1">{message}</span>
      <button
        type="button"
        onClick={onDismiss}
        className="cursor-pointer text-red-700/70 hover:scale-105 hover:text-red-700 dark:text-red-300/70 dark:hover:text-red-300"
        aria-label="Dismiss"
      >
        ×
      </button>
    </div>
  );
}

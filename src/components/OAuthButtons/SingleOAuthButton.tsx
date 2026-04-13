type SingleOAuthButtonProps = {
  title: string;
  onClick: () => void;
  children: React.ReactNode;
};

export default function SingleOAuthButton({
  title,
  onClick,
  children,
}: SingleOAuthButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="border-border hover:bg-hover flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-colors"
    >
      {children}
      {title}
    </button>
  );
}

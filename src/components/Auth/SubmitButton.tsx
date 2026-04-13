type SubmitButtonProps = {
  loading: boolean;
  text: string;
  loadingText: string;
};

export default function SubmitButton({
  loading,
  text,
  loadingText,
}: SubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="bg-accent text-accent-foreground w-full cursor-pointer rounded-lg px-4 py-2 text-sm font-medium transition-colors hover:opacity-90 disabled:opacity-50"
    >
      {loading ? loadingText : text}
    </button>
  );
}

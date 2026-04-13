type AuthCardProps = {
  title: string;
  children: React.ReactNode;
};

export default function AuthCard({ title, children }: AuthCardProps) {
  return (
    <div className="bg-surface-alt flex flex-1 items-center justify-center font-sans">
      <div className="border-border bg-surface w-full max-w-sm rounded-xl border p-8 shadow-sm">
        <h1 className="text-primary text-center text-2xl font-bold tracking-tight">
          {title}
        </h1>
        {children}
      </div>
    </div>
  );
}

type FormFieldProps = {
  id: string;
  label: string;
  type?: string;
  required?: boolean;
  minLength?: number;
  value: string;
  onChange: (value: string) => void;
};

export default function FormField({
  id,
  label,
  type = 'text',
  required,
  minLength,
  value,
  onChange,
}: FormFieldProps) {
  return (
    <div>
      <label htmlFor={id} className="text-secondary block text-sm font-medium">
        {label}
      </label>
      <input
        id={id}
        type={type}
        required={required}
        minLength={minLength}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border-border bg-surface text-primary focus:ring-accent mt-1 block w-full rounded-lg border px-3 py-2 text-sm focus:ring-2 focus:outline-none"
      />
    </div>
  );
}

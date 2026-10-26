export default function FormField({ label, error, className, children }) {
  return (
    <label className={className}>
      {label}
      {children}
      {error && <span className="field-error">{error}</span>}
    </label>
  );
}

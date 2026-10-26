export default function DetailItem({ label, children, className }) {
  return (
    <div className={className}>
      <span className="detail-label">{label}</span>
      {children}
    </div>
  );
}
